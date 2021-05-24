$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

const allowedUpdate = isUpdateAllowed(18);
if(!allowedUpdate){
    $("#modal_ims_uom_content").find("input, select, textarea").each(function(){
        $(this).attr("disabled",true);
    });
    $("#btnUpdate").hide();
}

//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

// ----- DATATABLES -----
function initDataTables() {
    if ($.fn.DataTable.isDataTable('#tableIMSuom')){
        $('#tableIMSuom').DataTable().destroy();
    }
    
    var table = $("#tableIMSuom").css({"min-width": "100%"}).removeAttr('width').DataTable({
        proccessing:    false,
        serverSide:     false,
        scrollX:        true,
        scrollCollapse: true,
        columnDefs: [
            { targets: 0, width: "10%" },
            // { targets: 1, width: "80%" },
            { targets: 2, width: 80 },
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
    //  const data = getTableData("hris_department_tbl", 
    //  "*, CONCAT('DEP-',SUBSTR(datecreated,3,2),'-',LPAD(departmentID, 5, '0')) AS departmentCode", "", "");


    $.ajax({
        url:      `${base_url}operations/getTableData`,
        method:   'POST',
        async:    false,
        dataType: 'json',
        data:     {tableName: "ims_uom_tbl"},
        beforeSend: function() {
            $("#table_content").html(preloader);
            // $("#inv_headerID").text("List of Inventory Item");
        },
        success: function(data) {
            console.log(data);
            let html = `
            <table class="table table-bordered table-striped table-hover nowrap" id="tableIMSuom">
                <thead>
                <tr class="text-left">
                    <th>UoM Code</th>
                    <th>Unit of Measurement Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>`;

            data.map((item, index, array) => {
                // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                let unique = {
                    id:       item.uomID, // Required
                    uomName: item.uomName,
                    email:    item.email,
                }
                uniqueData.push(unique);
                // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                if(item.uomStatus == 1){
                    var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                 }   
                 if(item.uomStatus == 0){
                    var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                 }

                html += `
                <tr 
                class="btnEdit" 
                id="${item.uomID}"
                feedback="${item.uomName}">
                    <td>${item.uomCode}</td>
                    <td>${item.uomName}</td>
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
    let uomID             = data ? (data[0].uomID            ? data[0].uomID        : "") : "",
    uomName               = data ? (data[0].uomName          ? data[0].uomName      : "") : "",
    uomStatus             = data ? (data[0].uomStatus        ? data[0].uomStatus    : "") : "";
      
    let button = uomID ? `
    <button 
        class="btn btn-update px-5 p-2" 
        id="btnUpdate" 
        rowID="${uomID}">
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
                    <label>Unit of Measurement Name <span class="text-danger font-weight-bold">*</span></label>
                    <input 
                        type="text" 
                        class="form-control validate" 
                        name="uomName" 
                        id="input_uomName" 
                        data-allowcharacters="[A-Z][a-z]" 
                        minlength="2" 
                        maxlength="25" 
                        required 
                        unique="${uomID}"  
                        value="${uomName}"
                        autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-input_uomName"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Status <span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_uomStatus" 
                        name="uomStatus"
                        autocomplete="off"
                        getuomid = "${uomID}"
                        >
                        <option 
                            value="1" 
                            ${data && uomStatus == "1" && "selected"}>Active</option>
                        <option 
                            value="0" 
                            ${data && uomStatus == "0" && "selected"}>Inactive</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-input_uomStatus"></div>
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
$(document).on("change","#input_uomStatus",function(){
    var tempCategoryStatus = $(this).find("option:selected").val()
    var getuomID = $(this).attr("getuomid") ;
    var itemData = getTableData("ims_inventory_item_tbl INNER JOIN ims_uom_tbl ON ims_inventory_item_tbl.unitOfMeasurementID = ims_uom_tbl.uomID", 
    "uomStatus", "uomStatus = 1 AND uomID ="+getuomID, "");

  

    if(itemData.length != 0 ){
        if(tempCategoryStatus == 0 ){
            setTimeout(function(){
                $("#input_uomStatus").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_uomStatus").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_uomStatus").text('There is active item in this unit of measurement! ');        
            },200)
            
                  
        }
        else{
            $("#input_uomStatus").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_uomStatus").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_uomStatus").text('');
        }
    }

});
// ------ END CHECK INVENTORY ITEM STATUS -------

// ----- OPEN ADD MODAL -----
$(document).on("click", "#btnAdd", function() {
    $("#ims_uom_modalheader").text("ADD UNIT OF MEASUREMENT");
    $("#modal_ims_uom").modal("show");
    $("#modal_ims_uom_content").html(preloader);
    const content = modalContent();
    $("#modal_ims_uom_content").html(content);
    initAll();
});
// ----- END OPEN ADD MODAL -----


// ----- SAVE MODAL -----
$(document).on("click", "#btnSave", function() {
const validate = validateForm("modal_ims_uom");
if (validate) {

    let data = getFormData("modal_ims_uom", true);
    data["tableData[uomCode]"] = generateCode("UOM", false, "ims_uom_tbl", "uomCode");
    data["tableData[createdBy]"] = sessionID;
    data["tableData[updatedBy]"] = sessionID;
    data["tableName"]            = "ims_uom_tbl";
    data["feedback"]             = $("[name=uomName]").val();

    sweetAlertConfirmation("add", "Unit of Measurement", "modal_ims_uom", null, data, true, tableContent);
    }
});
// ----- END SAVE MODAL -----

// ----- OPEN EDIT MODAL -----
$(document).on("click", ".btnEdit", function() {
    const id       = $(this).attr("id");
    const feedback = $(this).attr("feedback");
    $("#ims_uom_modalheader").text("EDIT UNIT OF MEASUREMENT");
    $("#modal_ims_uom").modal("show");

    // Display preloader while waiting for the completion of getting the data
    $("#modal_ims_uom_content").html(preloader); 

    const tableData = getTableData("ims_uom_tbl", "*", "uomID="+id, "");
    if (tableData) {
        const content = modalContent(tableData);
        setTimeout(() => {
            $("#modal_ims_uom_content").html(content);
            $("#btnSaveConfirmationEdit").attr("rowID", id);
            $("#btnSaveConfirmationEdit").attr("feedback", feedback);
            initAll();
        }, 500);
    }
});
// ----- END OPEN EDIT MODAL -----

// ----- UPDATE MODAL -----
$(document).on("click", "#btnUpdate", function() {
        let condition = $("#input_uomStatus").hasClass("is-invalid");
    
        const rowID = $(this).attr("rowID");
        if(!condition){
            const validate = validateForm("modal_ims_uom");
            if (validate) {

                let data = getFormData("modal_ims_uom", true);
                data["tableData[updatedBy]"] = sessionID;
                data["tableName"]            = "ims_uom_tbl";
                data["whereFilter"]          ="uomID="+rowID;
                data["feedback"]             = $("[name=uomName]").val();
    
                sweetAlertConfirmation(
                    "update",
                    "Unit of Measurement",
                    "modal_ims_uom",
                    "",
                    data,
                    true,
                    tableContent
                );
                }
            
        }else{
            $("#input_uomStatus").select2('focus');
        }
    });
    // ----- END UPDATE MODAL -----

// ------- CANCEl MODAL-------- 
$(document).on("click", ".btnCancel", function () {
    let formEmpty = isFormEmpty("modal_ims_uom");
    if (!formEmpty) {
        sweetAlertConfirmation(
            "cancel",
            "Unit of Measurement",
            "modal_ims_uom"
        );
    } else {
        $("#modal_ims_uom").modal("hide");
    }
});
// -------- END CANCEL MODAL-----------


});