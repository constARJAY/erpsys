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
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9][-][()]['][/]" 
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
                                                <button class="btn btn-primary btn-save" id="btnSave"><i class="fas fa-save"></i>&nbsp;SAVE</button>
                                                <button class="btn btn-danger btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;CANCEL</button>
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
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9][-][()]['][/]" minlength="2" maxlength="75" unique="${tableData[0]["codeConductCategoryID"]}" value="${tableData[0]["codeConductCategoryName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="codeConductCategoryStatus" id="inputcodeConductCategoryStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary btn-save" data-codeConductCategoryID="${tableData[0]["codeConductCategoryID"]}" id="btnSave"><i class="fas fa-save"></i>&nbsp;UPDATE</button>
                                                <button class="btn btn-danger btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;CANCEL</button>
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
    let condition           = validateForm("modal_codeConductCategory_form");
    let codeConductCategoryID           = $(this).data("codeconductcategoryid");
    if(condition == true){
        let data = getFormData("modal_codeConductCategory_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "codeConductCategoryID="+codeConductCategoryID;
        data["tableName"]                =  "hris_code_conduct_category_tbl";
        data["feedback"]                 =  $("#inputcodeConductCategoryName").val();
        sweetAlertConfirmation("update", "Code of Conduct Category","modal_codeConductCategory", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_codeConductCategory_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Code of Conduct Category Masterfile","modal_codeConductCategory");
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
                    { targets: 0, width: "5%" },
                    { targets: 1, width: "25%" },
                    { targets: 2, width: "5%" },
                    { targets: 3, width: "5%" }
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
                                <th>Code of Conduct Category No.</th>
                                <th>Code of Conduct Category Name</th>
                                <th>Status</th>
                                <th>Action</th>
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
                        <tr>
                            <td>${item["codeConductCategoryID"]}</td>
                            <td>${item["codeConductCategoryName"]}</td>
                            <td>${item["codeConductCategoryStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editCodeConductCategory" data-codeConductCategoryID="${item["codeConductCategoryID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
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

