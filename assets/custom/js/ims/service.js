$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

const allowedUpdate = isUpdateAllowed(18);
if(!allowedUpdate){
    $("#modal_ims_service_content").find("input, select, textarea").each(function(){
        $(this).attr("disabled",true);
    });
    $("#btnUpdate").hide();
}

//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

// ----- DATATABLES -----
function initDataTables() {
    if ($.fn.DataTable.isDataTable('#tableIMSService')){
        $('#tableIMSService').DataTable().destroy();
    }
    
    var table = $("#tableIMSService").css({"min-width": "100%"}).removeAttr('width').DataTable({
        proccessing:    false,
        serverSide:     false,
        scrollX:        true,
        scrollCollapse: true,
        columnDefs: [
            { targets: 0, width: "10%" },
            // { targets: 1, width: "80%" },
            { targets: 2, width: 1000 },
            { targets: 3, width: 80 },
        ],
    });
}
initDataTables();
// ----- END DATATABLES -----

// ----- TABLE CONTENT -----
function tableContent() {
    // Reset the unique datas
    uniqueData = [];
     // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    //  const data = getTableData("ims_services_tbl", 
    //  "*, CONCAT('DEP-',SUBSTR(datecreated,3,2),'-',LPAD(serviceID, 5, '0')) AS serviceCode", "", "");


    $.ajax({
        url:      `${base_url}operations/getTableData`,
        method:   'POST',
        async:    false,
        dataType: 'json',
        data:     {tableName: "ims_services_tbl"},
        beforeSend: function() {
            $("#table_content").html(preloader);
            // $("#inv_headerID").text("List of Inventory Item");
        },
        success: function(data) {
            console.log(data);
            let html = `
            <table class="table table-bordered table-striped table-hover nowrap" id="tableIMSService">
                <thead>
                <tr class="text-left">
                    <th>Service Code</th>
                    <th>Service Name</th>
                    <th>Service Description</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>`;

            data.map((item, index, array) => {
                // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                let unique = {
                    id:       item.serviceID, // Required
                    serviceName: item.serviceName,
                    serviceDescription: item.serviceDescription,
                    email:    item.email,
                }
                uniqueData.push(unique);
                // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                if(item.serviceStatus == 1){
                    var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                 }   
                 if(item.serviceStatus == 0){
                    var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                 }

                html += `
                <tr 
                class="btnEdit" 
                id="${item.serviceID}"
                feedback="${item.serviceName}">
                    <td>${item.serviceCode}</td>
                    <td>${item.serviceName}</td>
                    <td>${item.serviceDescription}</td>
                    <td class="text-center">${status}</td>
                </tr>`;
            })
            html += `</tbody>
            </table>`;

            setTimeout(() => {
                $("#table_content").html(html);
                initDataTables();
            }, 500);
        },
        error: function() {
            let html = `
                <div class="w-100 h5 text-center text-danger>
                    There was an error fetching data.
                </div>`;
            $("#table_content").html(html);
        }
    })
}
tableContent();
// ----- END TABLE CONTENT -----

 // ----- MODAL CONTENT -----
 function modalContent(data = false) {
    let serviceID              = data ? (data[0].serviceID            ? data[0].serviceID        : "") : "",
    serviceName                = data ? (data[0].serviceName          ? data[0].serviceName      : "") : "",
    serviceDescription                = data ? (data[0].serviceDescription          ? data[0].serviceDescription      : "") : "",
    serviceStatus      = data ? (data[0].serviceStatus? data[0].serviceStatus         : "") : "";
      
    let button = serviceID ? `
    <button 
        class="btn btn-update px-5 p-2" 
        id="btnUpdate" 
        rowID="${serviceID}">
        <i class="fas fa-save"></i>
        Update
    </button>` : `
    <button 
        class="btn btn-save px-5 p-2" 
        id="btnSave"><i class="fas fa-save"></i>
        Save
    </button>`;

    let html = `
    <div class="modal-body">
        
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Service Name <span class="text-danger font-weight-bold">*</span></label>
                    <input 
                        type="text" 
                        class="form-control validate" 
                        name="serviceName" 
                        id="input_serviceName" 
                        data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-]['][/]" 
                        minlength="2" 
                        maxlength="75" 
                        required 
                        unique="${serviceID}"  
                        value="${serviceName}"
                        autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-input_serviceName"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Service Description <span class="text-danger font-weight-bold">*</span></label>
                    <input 
                        type="text" 
                        class="form-control validate" 
                        name="serviceDescription" 
                        id="input_serviceDescription" 
                        data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-]['][/]" 
                        minlength="2" 
                        maxlength="75" 
                        required 
                        value="${serviceDescription}"
                        autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-input_serviceDescription"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Status <span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_serviceStatus" 
                        name="serviceStatus"
                        autocomplete="off"
                        getserviceid = "${serviceID}"
                        >
                        <option 
                            value="1" 
                            ${data && serviceStatus == "1" && "selected"}>Active</option>
                        <option 
                            value="0" 
                            ${data && serviceStatus == "0" && "selected"}>Inactive</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-input_serviceStatus"></div>
                </div>
            </div>
        </div>

    </div>
    <div class="modal-footer">
        ${button}
        <button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> Cancel</button>
    </div>`;
return html;
} 
// ----- END MODAL CONTENT -----


// ------ CHECK INVENTORY ITEM STATUS -------
$(document).on("change","#input_serviceStatus",function(){
    var tempCategoryStatus = $(this).find("option:selected").val()
    var getserviceID = $(this).attr("getserviceid") ;
    var itemData = getTableData("ims_service_scope_tbl INNER JOIN ims_services_tbl ON ims_service_scope_tbl.requestServiceID = ims_services_tbl.serviceID", 
    "serviceStatus", "serviceStatus = 1 AND serviceID ="+getserviceID, "");

    if(itemData.length != 0){
        if(tempCategoryStatus == 0 ){
            setTimeout(function(){
                $(this).removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_serviceStatus").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_serviceStatus").text('This record is currently in use!');
                document.getElementById("btnUpdate").disabled = true;
                
            },200)
                    
                        
        }
        else{
            $(this).removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_serviceStatus").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_serviceStatus").text('');
            document.getElementById("btnUpdate").disabled = false;
        }
    }

});
// ------ END CHECK INVENTORY ITEM STATUS -------

// ----- OPEN ADD MODAL -----
$(document).on("click", "#btnAdd", function() {
    $("#ims_service_modalheader").text("ADD SERVICE");
    $("#modal_ims_service").modal("show");
    $("#modal_ims_service_content").html(preloader);
    const content = modalContent();
    $("#modal_ims_service_content").html(content);
    initAll();
});
// ----- END OPEN ADD MODAL -----


// ----- SAVE MODAL -----
$(document).on("click", "#btnSave", function() {
const validate = validateForm("modal_ims_service");
if (validate) {

    let data = getFormData("modal_ims_service", true);
    data["tableData[serviceCode]"] = generateCode("SVC", false, "ims_services_tbl", "serviceCode");
    data["tableData[createdBy]"] = sessionID;
    data["tableData[updatedBy]"] = sessionID;
    data["tableName"]            = "ims_services_tbl";
    data["feedback"]             = $("[name=serviceName]").val();

    sweetAlertConfirmation("add", "Service", "modal_ims_service", null, data, true, tableContent);
    }
});
// ----- END SAVE MODAL -----

// ----- OPEN EDIT MODAL -----
$(document).on("click", ".btnEdit", function() {
    const id       = $(this).attr("id");
    const feedback = $(this).attr("feedback");
    $("#ims_service_modalheader").text("EDIT SERVICE");
    $("#modal_ims_service").modal("show");

    // Display preloader while waiting for the completion of getting the data
    $("#modal_ims_service_content").html(preloader); 

    const tableData = getTableData("ims_services_tbl", "*", "serviceID="+id, "");
    if (tableData) {
        const content = modalContent(tableData);
        setTimeout(() => {
            $("#modal_ims_service_content").html(content);
            $("#btnSaveConfirmationEdit").attr("rowID", id);
            $("#btnSaveConfirmationEdit").attr("feedback", feedback);
            initAll();
        }, 500);
    }
});
// ----- END OPEN EDIT MODAL -----

// ----- UPDATE MODAL -----
$(document).on("click", "#btnUpdate", function() {
        let condition = $("#input_serviceStatus").hasClass("is-invalid");
    
        const rowID = $(this).attr("rowID");
        if(!condition){
            const validate = validateForm("modal_ims_service");
            if (validate) {

                let data = getFormData("modal_ims_service", true);
                data["tableData[updatedBy]"] = sessionID;
                data["tableName"]            = "ims_services_tbl";
                data["whereFilter"]          ="serviceID="+rowID;
                data["feedback"]             = $("[name=serviceName]").val();
    
                sweetAlertConfirmation(
                    "update",
                    "Service",
                    "modal_ims_service",
                    "",
                    data,
                    true,
                    tableContent
                );
                }
            
        }else{
            $("#input_serviceStatus").select2('focus');
        }
    });
    // ----- END UPDATE MODAL -----

// ------- CANCEl MODAL-------- 
$(document).on("click", ".btnCancel", function () {
    let formEmpty = isFormEmpty("modal_ims_service");
    if (!formEmpty) {
        sweetAlertConfirmation(
            "cancel",
            "Service",
            "modal_ims_service"
        );
    } else {
        $("#modal_ims_service").modal("hide");
    }
});
// -------- END CANCEL MODAL-----------


});