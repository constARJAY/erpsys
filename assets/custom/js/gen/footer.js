function encryptString(str) {
    if (str) {
        const ciphertext = CryptoJS.AES.encrypt(str, "Bl@ckC0d3r$");
        return ciphertext.toString();
    }  
    return false;
}

function decryptString(str) {
    if (str) {
        const bytes     = CryptoJS.AES.decrypt(str.toString(), 'Bl@ckC0d3r$');
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext.toString();
    }
    return false;
}


// ----- ENCRYPT ID -----
$(".btnViewNotification").each(function() {
    const table = encryptString($(this).attr("table"));
    $(this).attr("table", table);
})

$(".btnDetails").each(function() {
    const table = encryptString($(this).attr("table"));
    $(this).attr("table", table);
})
// ----- END ENCRYPT ID -----


// ----- SWEET ALERT CONFIRMATION -----
const sweetAlertConfirmation = (
        condition   = "add",            // add|update|cancel
        moduleName  = "Another Data",   // Title
        modalID     = null,             // Modal ID 
        containerID = null,             // ContainerID - if not modal
        data        = null,             // data - object or formData
        isObject    = true,             // if the data is object or not
        callback    = false             // Function to be called after execution
    ) => {

    $("#"+modalID).modal("hide");

    let lowerCase 	= moduleName.toLowerCase();
    let upperCase	= moduleName.toUpperCase();
    let capitalCase = moduleName;
    let title 		      =  "";
    let text 		      =  ""
    let success_title     =  "";
    let swalImg           =  "";
    switch(condition) {
        case "add":
            title 					+=  "ADD " + upperCase;
            text 					+=  "Are you sure that you want to add a new "+ lowerCase +" to the system?"
            success_title        	+=  "Add new "+capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/add.svg`;
            break;
        case "update":
            title 					+=  "UPDATE " + upperCase;
            text 					+=  "Are you sure that you want to update the "+ lowerCase +" to the system?"
            success_title        	+=  "Update "+ capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/update.svg`;
            break;
        default:
            title 					+=  "DISCARD CHANGES";
            text 					+=  "Are you sure that you want to cancel this process?"
            success_title        	+=  "Process successfully discarded!";
            swalImg                 +=  `${base_url}assets/modal/cancel.svg`;
        }
        Swal.fire({
            title, 
            text,
            imageUrl: swalImg,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1a1a1a',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                let swalTitle = success_title.toUpperCase();

                if (condition != "cancel") {
                    let saveData = condition.toLowerCase() == "add" ? insertTableData(data, isObject, false, swalTitle) : updateTableData(data, isObject, false, swalTitle);
                    saveData.then(res => {  
                        if (res) {
                            
                            if (moduleName.toLowerCase() === "role") {
                                generateNewRolesPermission();
                            }   

                            callback && callback();

                        } else {
                            Swal.fire({
                                icon: 'danger',
                                title: "Failed!",
                                text: result[1],
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
                } else {
                    preventRefresh(false);
                    Swal.fire({
                        icon:  'success',
                        title: swalTitle,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                preventRefresh(false);
                containerID && $("#"+containerID).show();
                $("#"+modalID).modal("show");
            }
        });
}
// ----- END SWEET ALERT CONFIRMATION -----


// ----- PREVENT REFRESH -----
function preventRefresh(flag = false) {
    $("body").attr("refresh", flag);
}

window.addEventListener('beforeunload', function (e) {
    if ($("body").attr("refresh") == "true") {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = '';
    }
});
// ----- END PREVENT REFRESH -----


// ----- GENERATE NEW ROLE -----
const generateNewRolesPermission =() => {
    let roleID = getTableData("gen_user_role_tbl", "", "", "createdAt DESC", "", "LIMIT 1");    
        roleID = roleID[0]["roleID"];

    $.ajax({
        method: "POST",
        url: `${base_url}roles_permission/generateNewRolesPermission`,
        data: {roleID},
        dataType: "json",
        success: function(data) {}
    })
}
// ----- END GENERATE NEW ROLE -----


$(document).ready(function() {
			
    function getAllModules(data) {
        let html = "";
        data.map(item => {
            html += `<option>${item.moduleName}</option>`;
        })
        $("#moduleList").html(html);
    }
    const moduleTableData = getTableData("gen_roles_permission_tbl AS grpt LEFT JOIN gen_module_list_tbl AS gmlt USING(moduleID)", "gmlt.moduleName AS moduleName", `grpt.designationID = ${sessionDesignationID} AND gmlt.moduleStatus = 1`, "gmlt.moduleName ASC");
    const moduleData = moduleTableData.map(item => item.moduleName.toLowerCase());
    getAllModules(moduleTableData);

    $(document).on("keypress", "#searchModule", function(e) {
        let moduleName = $(this).val();
        if (moduleName.length > 0 && e.which == 13) {
            if (moduleData.includes(moduleName.toLowerCase())) {
                const getController = getTableData("gen_module_list_tbl", "moduleController", "moduleName LIKE '%"+moduleName+"%'");
                const controllerName = getController[0]["moduleController"].toLowerCase();
                window.location.href = base_url+controllerName;
            } else {
                showNotification("info", `${moduleName} module not found.`)
            }
        }
    })

    // ----- VIEW NOTIFICATION -----
    $(document).on("click", ".btnViewNotification", function(e) {
        e.preventDefault();
        const notifID    = $(this).attr("id");
        const table      = $(this).attr("table");
        const controller = $(this).attr("controller");

        $.ajax({
            method: "POST",
            url: base_url+"system_notification/updateNotification",
            data: {notifID},
            success: function(data) {
                if (data) {
                    window.location.href = base_url+controller+"?view_id="+table;
                    // window.location.href = base_url+controller;
                }
            }
        })
    })
    // ----- END VIEW NOTIFICATION -----

})


// ----- LIST UNIT OF MEASURE -----
function unitOfMeasurementOptions(value){
    let data = ["none","gallon","piece","gram","cup",
        "inch","pound","ounces","litre","bag",
        "bucket","bundle","box","case","pack",
        "rack","roll","sheet","yard","kilometer"];
    let returnData =  `<option value="" disabled selected>Select Unit of Measure</option>`;
    data.map(items=>{
        returnData +=  `<option value="${items}" ${value == items ? "selected" : ""}>${items.charAt(0).toUpperCase() + items.slice(1)}</option>`;
    });
    return returnData;
}
// ----- END LIST UNIT OF MEASURE -----