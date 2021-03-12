$(document).ready(function(){
    initDataTables();
    tableContent();
});

$(document).on("click",".addClassification", function(){
    $("#modal_classification").modal("show");

    $("#modal_classification_content").html(preloader);
    let modal_classification_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_classification_form"> 
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Classification Name</label>
                                                            <input type="text" class="form-control validate" name="classificationName" unique id="input_classificationName" 
                                                                    data-allowcharacters="[A-Z][a-z][ ][0-9]" minlength="5" maxlength="20" required>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationName"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Classification Status</label>
                                                            <select class="form-control select2 validate" name="classificationStatus" id="input_classificationStatus" required>
                                                                <option value="" dissabled selected>No selected data</option>
                                                                <option value="1">Active</option>
                                                                <option value="0">Inactive</option>
                                                            </select>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationStatus"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_classification_content").html(modal_classification_content);
        initAll();
    },500);
});

$(document).on("click",".editClassification", function(){
    let classificationID    =   $(this).data("classificationid");
    let tableData   = getTableData("ims_inventory_classification_tbl","","classificationID="+classificationID);

    $("#modal_classification").modal("show");
    $("#modal_classification_content").html(preloader);
    let statusOption = tableData[0]["classificationStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0">Inactive</option>` : `<option value="1">Active</option> <option value="0" selected>Inactive</option>`;
    let modal_classification_content    =   `   
                                            <div class="modal-body">  
                                                <form id="modal_classification_form"> 
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Classification Name</label>
                                                            <input 
                                                                type="text" 
                                                                class="form-control validate" 
                                                                name="classificationName" id="input_classificationName" 
                                                                data-allowcharacters="[A-Z][a-z][ ][0-9]" 
                                                                minlength="5" 
                                                                maxlength="20" 
                                                                required  unique="${tableData[0]["classificationID"]}"
                                                                value="${tableData[0]["classificationName"]}">
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationName"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Classification Status</label>
                                                            <select class="form-control select2 validate" name="classificationStatus" id="input_classificationStatus" required>
                                                                ${statusOption}
                                                            </select>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationName"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnUpdate" data-classificationid="${classificationID}">UPDATE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>  
                                            `;
    setTimeout(function(){
        $("#modal_classification_content").html(modal_classification_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_classification_form");
    
    if(condition == true){
        let tableData           = getTableData("ims_inventory_classification_tbl","","","classificationCode DESC");
        var currentDate         = new Date();
        let currentYear         = currentDate.getFullYear();
        let currentYearStr      = currentYear.toString();

        // Generate Number
        let tableDataCode       = parseInt(tableData[0]["classificationCode"].slice(6)) + 1;

        let classificationCode  = tableData.length < 1 ? "CFN-"+currentYearStr.slice(2)+"-00001" : "CFN-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

        let data = getFormData("modal_classification_form",true);
        data["tableData[classificationCode]"]      = classificationCode;
        data["tableData[createdBy]"]     = "1";
        data["tableData[updatedBy]"]     = "1";
        data["tableName"]                = "ims_inventory_classification_tbl";
        data["feedback"]                 = classificationCode;

        sweetAlertConfirmation("add", "Inventory Classification","modal_classification",null, data);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_classification_form");
    let classificationID    = $(this).data("classificationid");
    let classificationCode  = getTableData("ims_inventory_classification_tbl","classificationCode","classificationID="+classificationID,"classificationCode DESC");
    if(condition == true){
        let data = getFormData("modal_classification_form", true);

        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "classificationID="+classificationID;
        data["tableName"]                =  "ims_inventory_classification_tbl";
        data["feedback"]                 =   classificationCode[0]["classificationCode"];

        sweetAlertConfirmation("update", "Inventory Classification","modal_classification",null, data);
    }
    
});

$(document).on("click","#btnCancel", function(){
    let condition = emptyFormCondition("modal_classification_form");
    if(condition==true){
        sweetAlertConfirmation("", "Inventory Classification","modal_classification");
    }else{
        $("#modal_classification").modal("hide");
    }
});

// FUNCTIONS

function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableClassification')){
                $('#tableClassification').DataTable().destroy();
            }
            
            var table = $("#tableClassification").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "40%" },
                    { targets: 1, width: "40%" },
                    { targets: 2, width: "10%" },
                    { targets: 3, width: "10%" }
                ],
            });
}

function tableContent(){
        unique = [];

        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: "ims_inventory_classification_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableClassification">
                        <thead>
                            <tr class="text-center">
                                <th>Classification Code</th>
                                <th>Classification Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:                       item.classificationID, // Required
                            classificationName:       item.classificationName // Required
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr>
                            <td>${item["classificationCode"]}</td>
                            <td>${item["classificationName"]}</td>
                            <td>${item["classificationStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editClassification" data-classificationid="${item["classificationID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>`;
                    })
                    html += `</tbody>
                    </table>`;
                    initDataTables();
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