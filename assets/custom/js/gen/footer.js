// ----- ON DEVELOPMENT -----
function sweetAlertConfirmation(
        condition   = "add",            // add|update|cancel
        moduleName  = "Another Data",   // Title
        modalID     = null,             // Modal ID 
        containerID = null,             // ContainerID - if not modal
        data        = null,             // data - object or formData
        isObject    = true,             // if the data is object or not
        callback    = false             // Function to be called after execution
    ) {

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
            title 					+=  "CANCEL " + upperCase;
            text 					+=  "Are you sure that you want to cancel this process?"
            success_title        	+=  "Cancel "+ capitalCase + "!";
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
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
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
                            callback ? callback() : tableContent();
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
                    Swal.fire({
                        icon:  'success',
                        title: swalTitle,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                containerID ? $("#"+containerID).show() : "";
                $("#"+modalID).modal("show");
            }
        });
}
// ----- ON DEVELOPMENT -----


$(document).ready(function() {
			
    function getAllModules(data) {
        let html = "";
        data.map(item => {
            html += `<option>${item.moduleName}</option>`;
        })
        $("#moduleList").html(html);
    }
    const moduleTableData = getTableData("gen_module_list_tbl", "", "moduleStatus = 1");
    const moduleData = moduleTableData.map(item => item.moduleName);
    getAllModules(moduleTableData);

    $(document).on("keypress", "#searchModule", function(e) {
        const moduleName = $(this).val();
        if (e.which == 13) {
            if (moduleData.includes(moduleName)) {
                const getController = getTableData("gen_module_list_tbl", "moduleController", "moduleName = BINARY '"+moduleName+"'");
                const controllerName = getController[0]["moduleController"].toLowerCase();
                window.location.href = base_url+controllerName;
            } else {
                showNotification("danger", `${moduleName} module not found.`)
            }
        }
    })

    // ----- VIEW NOTIFICATION -----
    $(document).on("click", ".btnViewNotification", function(e) {
        e.preventDefault();
        const notifID    = $(this).attr("id");
        const controller = $(this).attr("controller");

        $.ajax({
            method: "POST",
            url: base_url+"system_notification/updateNotification",
            data: {notifID},
            success: function(data) {
                if (data) {
                    window.location.href = base_url+controller;
                }
            }
        })
    })
    // ----- END VIEW NOTIFICATION -----

})