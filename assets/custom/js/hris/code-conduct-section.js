$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addCodeConductSection", function(){
    $("#modal_codeConductSection").modal("show");
    $(".modal_codeConductSection_header").text("ADD CODE OF CONDUCT SECTION");
    $("#modal_codeConductSection_content").html(preloader);
    let codeOfConductTable                  =   getTableData("hris_code_conduct_category_tbl","","codeConductCategoryStatus != 0");
    let codeOfConductCategory               =   `<option value="" dissabled>Select Code of Conduct Category</option>`;
    codeOfConductTable.map(items=>{
        codeOfConductCategory += `<option value="${items["codeConductCategoryID"]}">${items["codeConductCategoryName"]}</option>`;
    })
    let modal_codeConductSection_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_codeConductSection_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Category <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="codeConductCategoryID" id="inputcodeConductCategoryID" required>
                                                                    ${codeOfConductCategory}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryID"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Section Description <span class="text-danger">*</span></label>
                                                                <textarea class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][?][*][!][#][%][&][ ]"  style="resize:none" name="codeConductSectionDescription" id="inputcodeConductSectionDescription" minlength="5" maxlength="500" max required></textarea>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductSectionDescription"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="codeConductSectionStatus" id="inputcodeConductSectionStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductSectionStatus"></div>
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
        $("#modal_codeConductSection_content").html(modal_codeConductSection_content);
        initAll();
    },500); 
});

$(document).on("click",".editCodeConductSection", function(){
    const allowedUpdate = isUpdateAllowed(24);
    $(".modal_codeConductSection_header").text("EDIT CODE OF CONDUCT SECTION");
    let codeConductSectionID       =   $(this).data("codeconductsectionid");
    let tableData                  =   getTableData("hris_code_conduct_section_tbl","","codeConductSectionID="+codeConductSectionID);
    let codeConductCategoryID      =   tableData[0]["codeConductCategoryID"];
    let asterisk                   =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;

    $("#modal_codeConductSection").modal("show");
    $("#modal_codeConductSection_content").html(preloader);

    // Category Option
    let selectedCategory            =   getTableData("hris_code_conduct_category_tbl", "", "codeConductCategoryID ="+codeConductCategoryID);
    console.log(selectedCategory);
    let unmentionedCategory         =   getTableData("hris_code_conduct_category_tbl","","codeConductCategoryID !='"+codeConductCategoryID +"' AND codeConductCategoryStatus != 0" );
    let codeOfConductCategory       =   `<option value="">No Selected</option>
                                         <option value="${tableData[0]["codeConductCategoryID"]}" selected>${selectedCategory[0]["codeConductCategoryName"]}</option>`;
    unmentionedCategory.map(categoryItem =>{
        codeOfConductCategory += `<option value="${categoryItem["codeConductCategoryID"]}">${categoryItem["codeConductCategoryName"]}</option>`;
    });


    let statusOption            = tableData[0]["codeConductSectionStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_codeConductSection_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_codeConductSection_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Category ${asterisk}</label>
                                                                <select class="form-control select2 validate" name="codeConductCategoryID" id="inputcodeConductCategoryID" required>
                                                                    ${codeOfConductCategory}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductCategoryID"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Code of Conduct Description ${asterisk}</label>
                                                                <textarea class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][?][*][!][#][%][&][ ]" style="resize:none" name="codeConductSectionDescription" id="inputcodeConductSectionDescription" minlength="5" maxlength="500" required>${tableData[0]["codeConductSectionDescription"]}</textarea>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductSectionDescription"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status ${asterisk}</label>
                                                                <select class="form-control select2 validate" name="codeConductSectionStatus" id="inputcodeConductSectionStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputcodeConductSectionStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-codeconductsectionid="${tableData[0]["codeConductSectionID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                                `;
    setTimeout(function(){
        $("#modal_codeConductSection_content").html(modal_codeConductSection_content);
        initAll();
        if (!allowedUpdate) {
            $("#modal_codeConductSection_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            })
            $("#btnUpdate").hide();
        }
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_codeConductSection_form");
    if(condition == true){
        let categoryID          =   $("#inputcodeConductCategoryID").val();
        let tableData           =   getTableData("hris_code_conduct_section_tbl","COUNT(codeConductCategoryID) AS lastSection","codeConductCategoryID="+categoryID);
        let incrementSectionID  =   parseInt(tableData[0]["lastSection"]) + 1;
        let sectionID           =   categoryID +"."+incrementSectionID;
        let data = getFormData("modal_codeConductSection_form", true);
        data["tableData[codeConductSection]"]       = sectionID;
        data["tableData[createdBy]"]                = "1";
        data["tableData[updatedBy]"]                = "1";
        data["tableName"]                           = "hris_code_conduct_section_tbl";
        data["feedback"]                            = "Section "+ sectionID;
        sweetAlertConfirmation("add", "Section","modal_codeConductSection", null, data, true, tableContent);
    }
});

$(document).on("click", "#btnUpdate", function(){
    let validation                      = validateForm("modal_codeConductSection_form");
    let codeConductSectionID            = $(this).data("codeconductsectionid");
    let inputCategoryID                 = $("#inputcodeConductCategoryID").val();
    let tableData                       = getTableData("hris_code_conduct_section_tbl","","codeConductSectionID = "+codeConductSectionID);
    let codeConductSection              = "";
    if(inputCategoryID == tableData[0]["codeConductCategoryID"]){
        codeConductSection              = tableData[0]["codeConductSection"];
    }else{
        let tableDataCategory   = getTableData("hris_code_conduct_section_tbl","COUNT(codeConductCategoryID) AS lastSection","codeConductCategoryID="+inputCategoryID);
        let incrementSectionID  = parseInt(tableDataCategory[0]["lastSection"]) + 1;
        codeConductSection     = inputCategoryID +"."+incrementSectionID;
    }
    
    
    if(validation){
        let data = getFormData("modal_codeConductSection_form", true);
        data["tableData"]["codeConductSection"]     =  codeConductSection;    
        data["tableData"]["updatedBy"]              =  "2";
        data["whereFilter"]                         =  "codeConductSectionID="+codeConductSectionID;
        data["tableName"]                           =  "hris_code_conduct_section_tbl";
        data["feedback"]                            =  "Section "+ codeConductSection;
        sweetAlertConfirmation("update", "Section","modal_codeConductSection", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_codeConductSection_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Section","modal_codeConductSection");
    }else{
        $("#modal_codeConductSection").modal("hide");
    }
    
});



// FUNCTIONS
function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableCodeConductSection')){
                $('#tableCodeConductSection').DataTable().destroy();
            }
            
            var table = $("#tableCodeConductSection").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "10%" },
                    { targets: 4, width: 80 }
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
                data:     {tableName: "hris_code_conduct_section_tbl", orderBy:"codeConductSection ASC"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },

                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableCodeConductSection">
                        <thead>
                            <tr class="text-left">
                                <th>Section No.</th>
                                <th>Code of Conduct Category</th>
                                <th>Code of Conduct Section No.</th>
                                <th>Conduct of Conduct Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:                       item.codeConductCategoryID, // Required
                            codeConductSectionName:   item.codeConductSectionDescription
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let categoryName = getTableData("hris_code_conduct_category_tbl","codeConductCategoryName","codeConductCategoryID="+item["codeConductCategoryID"]);

                        html += `
                        <tr class="btnEdit editCodeConductSection" data-codeconductsectionid="${item["codeConductSectionID"]}">
                            <td>${index + 1}</td>
                            <td>${categoryName[0]["codeConductCategoryName"]}</td>
                            <td>${item["codeConductSection"]}</td>
                            <td>${item["codeConductSectionDescription"]}</td>
                            <td class="text-center">${item["codeConductSectionStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100'>Active</span>"} </td>
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

