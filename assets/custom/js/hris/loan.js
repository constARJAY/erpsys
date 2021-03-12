$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addLoan", function(){
    $("#modal_loan").modal("show");
    $(".modal_loan_header").text("ADD LOAN");
    $("#modal_loan_content").html(preloader);
    let modal_loan_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_loan_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Loan Name <span class="text-danger">*</span></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="loanName" 
                                                                    id="inputloanName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="50" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Loan Status  <span class="text-danger">*</span></label>
                                                                <select class="form-control select2 validate" name="loanStatus" id="inputloanStatus" required>
                                                                    <option value="" dissabled>No selected</option>
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
                                                <button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_loan_content").html(modal_loan_content);
        initAll();
    },500); 
});

$(document).on("click",".editloan", function(){
    $(".modal_loan_header").text("EDIT LOAN");
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
                                                                <label for="">Loan Name</label>
                                                                <input type="text" class="form-control validate" name="loanName" id="inputloanName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" minlength="5" maxlength="20" unique="${tableData[0]["loanID"]}" value="${tableData[0]["loanName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Loan Status</label>
                                                                <select class="form-control select2 validate" name="loanStatus" id="inputloanStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputloanStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnUpdate" data-loanid="${tableData[0]["loanID"]}">UPDATE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_loan_content").html(modal_loan_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_loan_form");
    
    if(condition == true){
        let tableData           = getTableData("hris_loan_tbl","","","loanCode DESC");
        var currentDate         = new Date();
        let currentYear         = currentDate.getFullYear();
        let currentYearStr      = currentYear.toString();

        // Generate Number
        let tableDataCode       = tableData.length < 1 ? "" : parseInt(tableData[0]["loanCode"].slice(6)) + 1;

        let loanCode  = tableData.length < 1 ? "LON-"+currentYearStr.slice(2)+"-00001" : "LON-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

        let data = getFormData("modal_loan_form", true);
        data["tableData[loanCode]"]      = loanCode;
        data["tableData[createdBy]"]     = "1";
        data["tableData[updatedBy]"]     = "1";
        data["tableName"]                = "hris_loan_tbl";
        data["feedback"]                 = loanCode;
        sweetAlertConfirmation("add", "Loan Masterfile","modal_loan", null, data);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_loan_form");
    let loanID           = $(this).data("loanid");
    let loanCode         = getTableData("hris_loan_tbl","loanCode","loanID="+loanID,"loanCode DESC");
    if(condition == true){
        let data = getFormData("modal_loan_form", true);
        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "loanID="+loanID;
        data["tableName"]                =  "hris_loan_tbl";
        data["feedback"]                 =   loanCode[0]["loanCode"];
        sweetAlertConfirmation("update", "loan","modal_loan", null , data);
    }
    
});

$(document).on("click","#btnCancel", function(){
    let condition = emptyFormCondition("modal_loan_form");
    if(condition == true){
        sweetAlertConfirmation("", "Loan Masterfile","modal_loan");
    }else{
        $("#modal_loan").modal("hide");
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
                    { targets: 0, width: "15%" },
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
                data:     {tableName: "hris_loan_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableLoan">
                        <thead>
                            <tr class="text-left">
                                <th>Loan Code</th>
                                <th>Loan Name</th>
                                <th>Status</th>
                                <th>Action</th>
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
                        <tr>
                            <td>${item["loanCode"]}</td>
                            <td>${item["loanName"]}</td>
                            <td>${item["loanStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editloan" data-loanid="${item["loanID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
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
