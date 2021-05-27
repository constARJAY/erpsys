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
                                                                <label for="">Code of Conduct Category Name <strong class="text-danger">*</strong></label>
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
                                                <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i>&nbsp;Save</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_codeConductCategory_content").html(modal_codeConductCategory_content);
        initAll();
    },500); 
});

$(document).on("click",".editCodeConductCategory", function(){
    const allowedUpdate = isUpdateAllowed(23);
    $(".modal_codeConductCategory_header").text("EDIT CODE OF CONDUCT CATEGORY");
    let codeConductCategoryID       =   $(this).data("codeconductcategoryid");
    let tableData       =   getTableData("hris_code_conduct_category_tbl","","codeConductCategoryID="+codeConductCategoryID);
    let asterisk      =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
    $("#modal_codeConductCategory").modal("show");
    $("#modal_codeConductCategory_content").html(preloader);
    let statusOption        = tableData[0]["codeConductCategoryStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_codeConductCategory_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_codeConductCategory_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Category Name ${asterisk}</label>
                                                                <input type="text" class="form-control validate" name="codeConductCategoryName" id="inputcodeConductCategoryName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["codeConductCategoryID"]}" value="${tableData[0]["codeConductCategoryName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status ${asterisk}</label>
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
                                                <button class="btn btn-update px-5 p-2" data-codeconductcategoryid="${tableData[0]["codeConductCategoryID"]}" id="btnUpdate"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_codeConductCategory_content").html(modal_codeConductCategory_content);
        initAll();
        if (!allowedUpdate) {
            $("#modal_codeConductCategory_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            })
            $("#btnUpdate").hide();
        }
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
        sweetAlertConfirmation("add", "Category","modal_codeConductCategory", null, data, true, tableContent);
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
            sweetAlertConfirmation("update", "Category","modal_codeConductCategory", null , data, true, tableContent);
        }
    }else{
        $("#inputcodeConductCategoryStatus").select2('focus');
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_codeConductCategory_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Category","modal_codeConductCategory");
    }else{
        $("#modal_codeConductCategory").modal("hide");
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
                    { targets: 0, width: 100 },
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

$(document).on("change", "[name=codeConductCategoryStatus]", function(){
    if($(this).data("codeconductcategoryid")){
        let thisID      =   $(this).data("codeconductcategoryid");
        let thisValue   =   $(this).val();
        let tableData   =   getTableData("hris_code_conduct_section_tbl","","codeConductCategoryID="+thisID);
        let attrID      =   $(this).attr("id");
        if(tableData.length > 0 && thisValue == 0){
            setTimeout(function(){
                $("#"+attrID).removeClass("is-valid").removeClass("validated").addClass("is-invalid");
                $(".select2-selection").removeClass("no-error").addClass("has-error");
                $("#invalid-inputcodeConductCategoryStatus").text(`This record is currently in use!`);
                $("#btnUpdate").prop("disabled", true);
            },180);
        }else{
            $("#btnUpdate").prop("disabled", false);
            $('#'+attrID).removeClass("is-invalid");
            $(".select2-selection").addClass("no-error").removeClass("has-error");
        }
    }
});