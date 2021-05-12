$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addBranch", function(){
    $("#modal_branch").modal("show");
    $(".modal_branch_header").text("ADD BRANCH");
    $("#modal_branch_content").html(preloader);
    let modal_branch_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_branch_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Branch Name <span class="text-danger">*</span></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="branchName" 
                                                                    id="inputbranchName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                    minlength="2" 
                                                                    maxlength="150" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputbranchName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="branchStatus" id="inputbranchStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputbranchStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i>&nbsp;Save</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;
                                                CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_branch_content").html(modal_branch_content);
        initAll();
    },500); 
});

$(document).on("click",".editBranch", function(){
    $(".modal_branch_header").text("EDIT BRANCH");
    let branchID       =   $(this).data("branchid");
    let tableData       =   getTableData("hris_branch_tbl","","branchID="+branchID);

    // console.log(rowContent);
    $("#modal_branch").modal("show");
    $("#modal_branch_content").html(preloader);
    let statusOption        = tableData[0]["branchStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_branch_content    =   `       <div class="modal-body">  
                                                <form id="modal_branch_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Branch Name <strong class="text-danger">*</strong></label>
                                                                <input type="text" class="form-control validate" name="branchName" id="inputbranchName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["branchID"]}" value="${tableData[0]["branchName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputbranchName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="branchStatus" id="inputbranchStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputbranchStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-branchid="${tableData[0]["branchID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_branch_content").html(modal_branch_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_branch_form");
    
    if(condition == true){
        let tableData       = getTableData("hris_loan_tbl");
        let codeCondition   = tableData.length < 1 ? "0" : "";
        let data = getFormData("modal_branch_form", true);
        data["tableData[branchCode]"]    = generateCode("BRC",codeCondition,"hris_branch_tbl","branchCode");;
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_branch_tbl";
        data["feedback"]                 = $("#inputbranchName").val();
        sweetAlertConfirmation("add", "Branch","modal_branch", null, data, true, tableContent);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_branch_form");
    let branchID            = $(this).data("branchid");
    if(condition == true){
        let data = getFormData("modal_branch_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "branchID="+branchID;
        data["tableName"]                =  "hris_branch_tbl";
        data["feedback"]                 =   $("#inputbranchName").val();
        sweetAlertConfirmation("update", "Branch","modal_branch", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_branch_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Branch","modal_branch");
    }else{
        $("#modal_branch").modal("hide");
    }
    
});

// FUNCTIONS

function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableLoan')){
                $('#tableLoan').DataTable().destroy();
            }
            
            var table = $("#tableLoan").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "10%"},
                    { targets: 2, width: 80}
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
                data:     {tableName: "hris_branch_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableLoan">
                        <thead>
                            <tr class="text-left">
                                <th>Branch Code</th>
                                <th>Branch Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.branchID, // Required
                            branchName:    item.branchName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr class="btnEdit editBranch" data-branchid="${item["branchID"]}">
                            <td>${item["branchCode"]}</td>
                            <td>${item["branchName"]}</td>
                            <td class="text-center">${item["branchStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100'>Active</span>"} </td>
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
