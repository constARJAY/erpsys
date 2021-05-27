$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addLoan", function(){
    $("#modal_loan").modal("show");
    $(".modal_loan_header").text("ADD LOAN TYPE");
    $("#modal_loan_content").html(preloader);
    let modal_loan_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_loan_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Loan Type Name <span class="text-danger">*</span></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="loanName" 
                                                                    id="inputloanName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                    minlength="2" 
                                                                    maxlength="50" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="loanStatus" id="inputloanStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanStatus"></div>
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
        $("#modal_loan_content").html(modal_loan_content);
        initAll();
    },500); 
});

$(document).on("click",".editloan", function(){
    const allowedUpdate = isUpdateAllowed(22);
    let asterisk    =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
    $(".modal_loan_header").text("EDIT LOAN TYPE");
    let loanID       =   $(this).data("loanid");
    let tableData       =   getTableData("hris_loan_tbl","","loanID="+loanID);

    // console.log(rowContent);
    $("#modal_loan").modal("show");
    $("#modal_loan_content").html(preloader);
    let statusOption        = tableData[0]["loanStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_loan_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_loan_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Loan Type Name ${asterisk}</label>
                                                                <input type="text" class="form-control validate" name="loanName" id="inputloanName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="50" unique="${tableData[0]["loanID"]}" value="${tableData[0]["loanName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status ${asterisk}</label>
                                                                <select class="form-control select2 validate" name="loanStatus" loanid="${loanID}" id="inputloanStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-loanid="${tableData[0]["loanID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_loan_content").html(modal_loan_content);
        initAll();
        if (!allowedUpdate) {
            $("#modal_loan_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            })
            $("#btnUpdate").hide();
        }
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_loan_form");
    
    if(condition == true){
        let tableData       = getTableData("hris_loan_tbl");
        let codeCondition   = tableData.length < 1 ? "0" : "";
        let data = getFormData("modal_loan_form", true);
        data["tableData[loanCode]"]      = generateCode("LON",codeCondition,"hris_loan_tbl","loanCode");
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_loan_tbl";
        data["feedback"]                 = $("#inputloanName").val();
        sweetAlertConfirmation("add", "Loan Type","modal_loan", null, data, true, tableContent);
    }

});

$(document).on("click", "#btnUpdate", function(){
    let condition        = validateForm("modal_loan_form");
    let loanID           = $(this).data("loanid");
    let loanCode         = getTableData("hris_loan_tbl","loanCode","loanID="+loanID,"loanCode DESC");
    if(condition == true){
        let data = getFormData("modal_loan_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "loanID="+loanID;
        data["tableName"]                =  "hris_loan_tbl";
        data["feedback"]                 =  $("#inputloanName").val();
        sweetAlertConfirmation("update", "Loan Type","modal_loan", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_loan_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Loan Type","modal_loan");
    }else{
        $("#modal_loan").modal("hide");
    }
});


$(document).on("change", "[name=loanStatus]", function(){
    if($(this).attr("loanid")){
        let loanID      = $(this).attr("loanid");
        let attrID      = $(this).attr("id");
        let thisValue   = $(this).val();
        let loanFormCondition = getTableData("hris_loan_form_tbl", "COUNT(loanFormID) as loanLength", "loanID="+loanID);
        if(loanFormCondition[0].loanLength > 0 && thisValue == 0){
            setTimeout(function(){
                $("#"+attrID).removeClass("is-valid").removeClass("validated").addClass("is-invalid");
                $(".select2-selection").removeClass("no-error").addClass("has-error");
                $("#invalid-inputloanStatus").text(`This record is currently in use!`);
            },180);
            $("#btnUpdate").prop("disabled", true);
        }else{
            $("#"+attrID).removeClass("is-invalid");
            $("#invalid-inputloanStatus").text(``);
            $("#btnUpdate").prop("disabled", false);
            $(".select2-selection").addClass("no-error").removeClass("has-error");
        }
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
                data:     {tableName: "hris_loan_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableLoan">
                        <thead>
                            <tr class="text-left">
                                <th>Loan Type Code</th>
                                <th>Loan Type Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.loanID, // Required
                            loanName:    item.loanName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr class="btnEdit editloan" data-loanid="${item["loanID"]}">
                            <td>${item["loanCode"]}</td>
                            <td>${item["loanName"]}</td>
                            <td class="text-center">${item["loanStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100 '>Active</span>"} </td>
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
