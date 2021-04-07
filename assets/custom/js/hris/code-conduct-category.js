$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addCodeConductCategory", function(){
    $("#modal_codeConductCategory").modal("show");
    $(".modal_codeConductCategory_header").text("ADD CODE OF CONDUCT CATEGORY");
    $("#modal_codeConductCategory_content").html(preloader);
    let modal_codeConductCategory_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_codeConductCategory_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Category Name <span class="text-danger">*</span></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="codeConductCategoryName" 
                                                                    id="inputcodeConductCategoryName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                    minlength="2" 
                                                                    maxlength="75" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="codeConductCategoryStatus" id="inputcodeConductCategoryStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryStatus"></div>
                                                            </div>
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
        $("#modal_codeConductCategory_content").html(modal_codeConductCategory_content);
        initAll();
    },500); 
});

$(document).on("click",".editCodeConductCategory", function(){
    $(".modal_codeConductCategory_header").text("EDIT CODE OF CONDUCT CATEGORY");
    let codeConductCategoryID       =   $(this).data("codeconductcategoryid");
    let tableData       =   getTableData("hris_code_conduct_category_tbl","","codeConductCategoryID="+codeConductCategoryID);

    // console.log(rowContent);
    $("#modal_codeConductCategory").modal("show");
    $("#modal_codeConductCategory_content").html(preloader);
    let statusOption        = tableData[0]["codeConductCategoryStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_codeConductCategory_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_codeConductCategory_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Category Name <strong class="text-danger">*</strong></label>
                                                                <input type="text" class="form-control validate" name="codeConductCategoryName" id="inputcodeConductCategoryName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["codeConductCategoryID"]}" value="${tableData[0]["codeConductCategoryName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="codeConductCategoryStatus" id="inputcodeConductCategoryStatus" data-codeconductcategoryid="${tableData[0]["codeConductCategoryID"]}">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update" data-codeconductcategoryid="${tableData[0]["codeConductCategoryID"]}" id="btnUpdate"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_codeConductCategory_content").html(modal_codeConductCategory_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_codeConductCategory_form");
    
    if(condition == true){
        let data = getFormData("modal_codeConductCategory_form", true);
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_code_conduct_category_tbl";
        data["feedback"]                 = $("#inputcodeConductCategoryName").val();
        sweetAlertConfirmation("add", "Code of Conduct Category","modal_codeConductCategory", null, data, true, tableContent);
    }
});

$(document).on("click", "#btnUpdate", function(){
    let codeConductCategoryID   = $(this).data("codeconductcategoryid");
    let condition               = $("#inputcodeConductCategoryStatus").hasClass("is-invalid");
    if(!condition){  
        let validation          = validateForm("modal_codeConductCategory_form");
        if(validation == true){
            let data = getFormData("modal_codeConductCategory_form", true);
            data["tableData"]["updatedBy"]   =  sessionID;
            data["whereFilter"]              =  "codeConductCategoryID="+codeConductCategoryID;
            data["tableName"]                =  "hris_code_conduct_category_tbl";
            data["feedback"]                 =  $("#inputcodeConductCategoryName").val();
            sweetAlertConfirmation("update", "Code of Conduct Category","modal_codeConductCategory", null , data, true, tableContent);
        }
    }else{$("#inputcodeConductCategoryStatus").select2('focus');}
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_codeConductCategory_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Code of Conduct Category Masterfile","modal_codeConductCategory");
    }else{
        $("#modal_codeConductCategory").modal("hide");
    }
    
});


$(document).on("change", "#inputcodeConductCategoryStatus", function(){
    if($(this).data("codeconductcategoryid")){
        let thisID      =   $(this).data("codeconductcategoryid");
        let thisValue   =   $(this).val();
        let tableData   =   getTableData("hris_code_conduct_section_tbl","","codeConductCategoryID="+thisID);
        tableData.length > 0 && thisValue == 0 ? $(this).addClass("is-invalid") : $(this).removeClass("is-invalid");
        let textAlert   =   tableData.length > 0 && thisValue == 0 ? "There is active code of conduct section in this category" : "";
        $("#invalid-inputcodeConductCategoryStatus").text(textAlert);
    }
});


// FUNCTIONS
function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableCodeConductCategory')){
                $('#tableCodeConductCategory').DataTable().destroy();
            }
            
            var table = $("#tableCodeConductCategory").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "5%" },
                    { targets: 1, width: "25%" },
                    { targets: 2, width: "5%" }
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
                data:     {tableName: "hris_code_conduct_category_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },

                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableCodeConductCategory">
                        <thead>
                            <tr class="text-left">
                                <th>Category No.</th>
                                <th>Code of Conduct Category Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.codeConductCategoryID, // Required
                            codeConductCategoryName:    item.codeConductCategoryName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr class="btnEdit editCodeConductCategory" data-codeConductCategoryID="${item["codeConductCategoryID"]}">
                            <td>${item["codeConductCategoryID"]}</td>
                            <td>${item["codeConductCategoryName"]}</td>
                            <td class="text-center">${item["codeConductCategoryStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 '>Inactive</span>" : "<span class='badge badge-outline-success w-100 '>Active</span>"} </td>
                         </tr>`;
                    });

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

