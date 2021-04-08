$(document).ready(function(){
    initDataTables();
    tableContent();
});

$(document).on("click",".addClassification", function(){
    $(".modal_classification_header").text("ADD CLASSIFICATION");
    $("#modal_classification").modal("show");
    
    $("#modal_classification_content").html(preloader);
    let modal_classification_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_classification_form"> 
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Classification Name <strong class="text-danger">*</strong></label>
                                                            <input type="text" class="form-control validate" name="classificationName" unique id="input_classificationName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" required>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationName"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Status <strong class="text-danger">*</strong></label>
                                                            <select class="form-control select2 validate" name="classificationStatus" id="input_classificationStatus">
                                                                <option value="1">Active</option>
                                                                <option value="0">Inactive</option>
                                                            </select>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationStatus"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i>&nbsp;Save</button>
                                                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_classification_content").html(modal_classification_content);
        initAll();
    },500);
});

$(document).on("click",".editClassification", function(){
    $(".modal_classification_header").text("EDIT CLASSIFICATION");
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
                                                            <label for="">Classification Name <strong class="text-danger">*</strong></label>
                                                            <input 
                                                                type="text" 
                                                                class="form-control validate" 
                                                                name="classificationName" id="input_classificationName" 
                                                                data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                minlength="2" 
                                                                maxlength="150" 
                                                                required  unique="${tableData[0]["classificationID"]}"
                                                                value="${tableData[0]["classificationName"]}">
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationName"></div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12 col-sm-12">
                                                        <div class="form-group">
                                                            <label for="">Status <strong class="text-danger">*</strong></label>
                                                            <select class="form-control select2 validate" name="classificationStatus" id="input_classificationStatus" data-classificationid="${classificationID}">
                                                                ${statusOption}
                                                            </select>
                                                            <div class="invalid-feedback d-block" id="invalid-input_classificationStatus"></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update" id="btnUpdate" data-classificationid="${classificationID}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;Cancel</button>
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
        let tableData       = getTableData("ims_inventory_classification_tbl");
        let codeCondition   = tableData.length < 1 ? "0" : "";
        let data = getFormData("modal_classification_form",true);
        data["tableData[classificationCode]"]     = generateCode("CFN",codeCondition,"ims_inventory_classification_tbl","classificationCode");
        data["tableData[createdBy]"]              = sessionID;
        data["tableData[updatedBy]"]              = sessionID;
        data["tableName"]                         = "ims_inventory_classification_tbl";
        data["feedback"]                          = $("#input_classificationName").val();

        sweetAlertConfirmation("add", "Classification","modal_classification", null, data, true, tableContent);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let classificationID    = $(this).data("classificationid");
    // let classificationCode  = getTableData("ims_inventory_classification_tbl","classificationCode","classificationID="+classificationID,"classificationCode DESC");
    let condition           = $("#input_classificationStatus").hasClass("is-invalid");
    if(!condition){   
        let validation           = validateForm("modal_classification_form");
        if(validation == true){
            let data = getFormData("modal_classification_form", true);

            data["tableData[updatedBy]"]     =  sessionID;
            data["whereFilter"]              =  "classificationID="+classificationID;
            data["tableName"]                =  "ims_inventory_classification_tbl";
            data["feedback"]                 =  $("#input_classificationName").val();

            sweetAlertConfirmation("update", "Classification","modal_classification",null, data, true, tableContent);
        }
    }else{$("#input_classificationStatus").select2('focus');}
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_classification_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Classification","modal_classification");
    }else{
        $("#modal_classification").modal("hide");
    }
});

$(document).on("change", "#input_classificationStatus", function(){
    if($(this).data("classificationid")){
        let thisID      =   $(this).data("classificationid");
        let thisValue   =   $(this).val();
        let tableData   =   getTableData("ims_inventory_category_tbl","","classificationID="+thisID);
        tableData.length > 0 && thisValue == 0 ? $(this).addClass("is-invalid") : $(this).removeClass("is-invalid");
        let textAlert   =   tableData.length > 0 && thisValue == 0 ? "There is active inventory category in this classifications" : "";
        $("#invalid-input_classificationStatus").text(textAlert);
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
                    { targets: 0, width: "10%" },
                    { targets: 2, width: 80 }
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
                            <tr>
                                <th>Classification Code</th>
                                <th>Classification Name</th>
                                <th>Status</th>
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
                        <tr class="btnEdit editClassification" data-classificationid="${item["classificationID"]}">
                            <td>${item["classificationCode"]}</td>
                            <td>${item["classificationName"]}</td>
                            <td class="text-center">${item["classificationStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100'>Active</span>"} </td>
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