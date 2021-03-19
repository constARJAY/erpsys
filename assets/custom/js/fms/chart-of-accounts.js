$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableHRISChartOfAccounts')){
            $('#tableHRISChartOfAccounts').DataTable().destroy();
        }
        
        var table = $("#tableHRISChartOfAccounts").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 100 },
                { targets: 2, width: 100 },
                { targets: 3, width: 100 },
                { targets: 4, width: 100 },
                { targets: 5, width: 100 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 100 },
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
        // const data = getTableData("fms_chart_of_accounts_tbl INNER JOIN gen_ledger_classification_tbl USING(ledgerClassificationID)", "*,ledgerClassificationName", "", "");
        // console.log(data);
        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "fms_chart_of_accounts_tbl INNER JOIN gen_ledger_classification_tbl USING(ledgerClassificationID)"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableHRISChartOfAccounts">
                    <thead>
                    <tr class="text-center">
                        <th>Account Code</th>
                        <th>Account Name</th>
                        <th>Description</th>
                        <th>Account Level</th>
                        <th>Ledger Classification</th>
                        <th>Groupings</th>
                        <th>Financial Statement Presentation</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.chartOfAccountID, // Required
                        accountCode: item.accountCode,
                        accountName: item.accountName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    if(item.accountStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.accountStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr>
                        <td>${item.accountCode}</td>
                        <td>${item.accountName}</td>
                        <td>${item.accountDescription}</td>
                        <td>${item.accountLevel}</td>
                        <td>${item.ledgerClassificationName}</td>
                        <td>${item.accountGrouping}</td>
                        <td>${item.financialStatement}</td>
                        <td>${status}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.chartOfAccountID}"
                                feedback="${item.username}">
                                <i class="fas fa-edit"></i>
                                Edit
                            </button>
                        </td>
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

    // ----- LEDGERCLASSIFICATION CONTENT -----
    function ledgerclassificationContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("gen_ledger_classification_tbl", 
        "ledgerClassificationID ,ledgerClassificationName", "", "");
            console.log(data);
            let html = ` <option value="" disabled selected ${!param && "selected"}>No Selected</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.ledgerClassificationID}" ${param && item.ledgerClassificationID == param[0].ledgerClassificationID && "selected"}>${item.ledgerClassificationName}</option>`;
            })
            $("#input_ledgerClassificationID").html(html);
    }
    ledgerclassificationContent();
    // ----- END LEDGERCLASSIFICATION CONTENT -----

     // ----- BANK CONTENT -----
    function bankContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("fms_bank_tbl", 
        "bankID ,bankName,bankNumber", "", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>No Selected</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.bankID}" bank_number="${item.bankNumber}" ${param && item.bankID == param[0].bankID && "selected"}>${item.bankName}</option>`;
                if(param && item.bankID == param[0].bankID){
                    $("#input_bankNumber").val(item.bankNumber);
                }
            })
            $("#input_bankID").html(html);
    }
    bankContent();
    // ----- END BANK CONTENT -----

    // ----- CHANGE BANK NUMBER -----
     $(document).on("change", "#input_bankID", function() {
        var bank_number = $(this).find("option:selected").attr("bank_number");
        console.log(bank_number)
        $("#input_bankNumber").val(bank_number);
    });
    // ----- END CHANGE BANK NUMBER -----


     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let chartOfAccountID = data ? (data[0].chartOfAccountID ? data[0].chartOfAccountID : "") : "",
        accountCode = data ? (data[0].accountCode   ? data[0].accountCode  : "") : "",
        accountName  = data ? (data[0].accountName    ? data[0].accountName   : "") : "",
        accountDescription     = data ? (data[0].accountDescription       ? data[0].accountDescription      : "") : "",
        accountLevel    = data ? (data[0].accountLevel      ? data[0].accountLevel     : "") : "",
        accountLedgerClassification = data ? (data[0].accountLedgerClassification   ? data[0].accountLedgerClassification  : "") : "",
        accountGrouping   = data ? (data[0].accountGrouping     ? data[0].accountGrouping    : "") : "",
        financialStatement    = data ? (data[0].financialStatement      ? data[0].financialStatement     : "") : "",
        bankID      = data ? (data[0].bankID        ? data[0].bankID       : "") : "",
        accountStatus      = data ? (data[0].accountStatus        ? data[0].accountStatus       : "") : "";
          
        let button = chartOfAccountID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${chartOfAccountID}">
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
                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Account Code <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="accountCode" 
                            id="input_accountCode" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][-]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            unique="${chartOfAccountID}"  
                            value="${accountCode}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_accountCode"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Account Name <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="accountName" 
                            id="input_accountName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][-]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            unique="${chartOfAccountID}"  
                            value="${accountName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_accountName"></div>
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Description <span class="text-danger font-weight-bold">*</span></label>
                        <textarea rows="4" 
                        class="form-control validate no-resize" 
                        placeholder="Please type description..."
                        id="input_accountDescription"
                        name="accountDescription"
                        data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,]"
                        required
                        >${accountDescription}</textarea>
                        <div class="invalid-feedback d-block" id="invalid-input_accountDescription"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Account Level <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="accountLevel" 
                            id="input_accountLevel" 
                            data-allowcharacters="[A-Z][a-z][0-9]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value="${accountLevel}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_accountLevel"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group has-feedback">
                        <label>Ledger Classification <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_ledgerClassificationID" 
                            name="ledgerClassificationID"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>
                        </select>
                        <span class="fas fa-plus-square fa-lg form-control-feedback mt-2 pr-1" id="ledgerClassAdd" style="float:right"></span>
                        <div class="invalid-feedback d-block" id="invalid-input_ledgerClassificationID"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Grouping <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_accountGrouping" 
                            name="accountGrouping"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>

                            <option value="Current Asset" ${data && accountGrouping == "Current Asset" && "selected"}>Current Asset</option>
                            <option value="Non-current Asset" ${data && accountGrouping == "Non-current Asset" && "selected"}>Non-current Asset</option>
                            <option value="Contra Asset" ${data && accountGrouping == "Contra Asset" && "selected"}>Contra Asset</option>
                            <option value="Current Liability" ${data && accountGrouping == "Current Liability" && "selected"}>Current Liability</option>
                            <option value="Non-current Liability" ${data && accountGrouping == "Non-current Liability" && "selected"}>Non-current Liability</option>
                            <option value="Equity" ${data && accountGrouping == "Equity" && "selected"}>Equity</option>
                            <option value="Sales" ${data && accountGrouping == "Sales" && "selected"}>Sales</option>
                            <option value="Contra Sales" ${data && accountGrouping == "Contra Sales" && "selected"}>Contra Sales</option>
                            <option value="Cost of Sales" ${data && accountGrouping == "Cost of Sales" && "selected"}>Cost of Sales</option>
                            <option value="G&amp;A Expenses" ${data && accountGrouping == "G&amp;A Expenses" && "selected"}>G&amp;A Expenses</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_accountGrouping"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Financial Statement Presentation <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_financialStatement" 
                            name="financialStatement"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>
                            <option value="Asset" ${data && financialStatement == "Asset" && "selected"}>Asset</option>
                            <option value="Liability" ${data && financialStatement == "Liability" && "selected"}>Liability</option>
                            <option value="Equity" ${data && financialStatement == "Equity" && "selected"}>Equity</option>
                            <option value="Sales" ${data && financialStatement == "Sales" && "selected"}>Sales</option>
                            <option value="Cost of Sales" ${data && financialStatement == "Cost of Sales" && "selected"}>Cost of Sales</option>
                            <option value="G&amp;A Expenses" ${data && financialStatement == "G&amp;A Expenses" && "selected"}>G&amp;A Expenses</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_financialStatement"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Bank <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_bankID" 
                            name="bankID"
                            autocomplete="off"
                            required>
                        </select>
                        
                        <div class="invalid-feedback d-block" id="invalid-input_bankID"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-6">
                    <div class="form-group">
                        <label>Bank Account Number <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="bankNumber" 
                            id="input_bankNumber" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                           
                            readonly=""
                            autocomplete="off">
                       
                    </div>
                </div>

                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Status <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_accountStatus" 
                            name="accountStatus"
                            autocomplete="off"
                            required>
                            <option 
                                value="1" 
                                ${data && accountStatus == "1" && "selected"} >Active</option>
                            <option 
                                value="0" 
                                ${data && accountStatus == "0" && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_accountStatus"></div>
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



    // ----- OPEN ADD LEDGER MODAL -----
    $(document).on("click", "#ledgerClassAdd", function() {
        $("#modal_fms_ledgerClassification").modal("show");
        // $("#modal_fms_ledgerClassification_content").html(preloader);

        let html =`	<div class="modal-body" id="ledgerClassForm">
                     <div class="row">
                         <div class="col-md-12 mb-3">
                             <div class="form-group">
                                 <label>Ledger Classification<code>*</code> </label>
                                 <input type="text" class="form-control validate" name="ledgerClassificationName"
                                     id="ledgerClassificationName" data-allowcharacters="[A-Z][a-z][ ][.][,]" required autocomplete="off">
                                 <div class="invalid-feedback d-block" id="invalid-input_ledgerClassificationName"></div>
                             </div>
                         </div>
                     </div>
             
                     <div class="modal-footer justify-content-center">
                         <button class="btn btn-add px-5 p-2 btnSaveLedger">SAVE</button>
                     </div>
                 </div>`;

        $("#modal_fms_ledgerClassification_content").html(html);
        initAll();       
    });
    // ----- END OPEN ADD LEDGER MODAL -----

         // ----- SAVE LEDGER MODAL -----
         $(document).on("click", ".btnSaveLedger", function() {
            const validate = validateForm("ledgerClassForm");
            if (validate) {
                $("#modal_fms_chartofaccts").modal("hide");
                $("#modal_fms_ledgerClassification").modal("hide");
                // Swal.fire({
                //     title: 'Are you sure?',
                //     text: "You want to save this?",
                //     icon: 'warning',
                //     showCancelButton: true,
                //     confirmButtonColor: '#3085d6',
                //     cancelButtonColor: '#d33',
                //     confirmButtonText: 'Save'
                // }).
                
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to save this?",
                    imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#1A1A1A',
                    confirmButtonText: 'Save',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {
        
                    /**
                     * ----- FORM DATA -----
                     * tableData = {} -> Objects
                     */
                    let data = getFormData("ledgerClassForm");
                    data.append("tableName", "gen_ledger_classification_tbl");
                    data.append("feedback", "Your choice");
                    /**
                     * ----- DATA -----
                     * 1. tableName
                     * 2. tableData
                     * 3. feedback
                     */

                    var setNewName = '';
                    for(var i of data.entries()) {
                        if(i[1] !=""){
                            setNewName = i[1];
                            // console.log(i)
                        }
                    }
        
                    const saveData = insertTableData(data);
                    if (saveData) {
                        // tableContent();
                        let html =``;
                        const getNewLedgerData = getTableData("gen_ledger_classification_tbl", "*", "", "ledgerClassificationID DESC LIMIT 1");
                      console.log(getNewLedgerData);
                      getNewLedgerData.map((item, index, array) => {
                             html +=`<option value="${item.ledgerClassificationID }" selected>${item.ledgerClassificationName}</option>`;
                            })
                            $("#input_ledgerClassificationID").append(html);
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully saved!',
                        showConfirmButton: false,
                        timer: 2000
                      })

                      setTimeout(() => {
                        $("#modal_fms_chartofaccts").modal("show");
                    }, 500);
                   
                    }
                  
                    }else{
                        $("#modal_fms_chartofaccts").modal("show");
                    }
                });
                    
                }
            });
            // ----- END SAVE LEDGER MODAL -----

    // ------- CANCEl ADD LEDGER MODAL-------- 
    $(document).on("click",".btnCancelLedger",function(){
        $("#modal_fms_ledgerClassification").modal("hide");

        const data = getFormData("ledgerClassForm");

        var validate = false;
            for(var i of data.entries()) {
                const count =+i[1];
               validate[0] = i[1];
                if(i[1] !=""){
                    validate = true;
                    console.log(i)
                }
            }

            if(validate == true){

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    imageUrl: `${base_url}assets/custom/isometric_image/questions.png`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#1A1A1A',
                    confirmButtonText: 'Yes, discard!',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Changes successfully discard!',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }else{
                        $("#modal_fms_ledgerClassification").modal("show");
                        
                    }
                  });
            }else{
                $("#modal_fms_ledgerClassification").modal("hide");
            }
       
    });
    // -------- END CANCEL ADD LEDGER MODAL-----------

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#fms_chartofaccts_modalheader").text("ADD ACCOUNT");
        $("#modal_fms_chartofaccts").modal("show");
        $("#modal_fms_chartofaccts_content").html(preloader);
        const content = modalContent();
        $("#modal_fms_chartofaccts_content").html(content);
        bankContent();
        ledgerclassificationContent();
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_fms_chartofaccts");
    if (validate) {

        let data = getFormData("modal_fms_chartofaccts", true);
        delete data["tableData"].bankNumber;
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "fms_chart_of_accounts_tbl";
        data["feedback"]             = $("[name=accountCode]").val();

        sweetAlertConfirmation("add", "Chart of Accounts", "modal_fms_chartofaccts", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#fms_chartofaccts_modalheader").text("VIEW ACCOUNT");
        $("#modal_fms_chartofaccts").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_fms_chartofaccts_content").html(preloader); 

        const tableData = getTableData("fms_chart_of_accounts_tbl", "*", "chartOfAccountID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_fms_chartofaccts_content").html(content);
                ledgerclassificationContent(tableData);
                bankContent(tableData);
                $("#btnSaveConfirmationEdit").attr("rowID", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_fms_chartofaccts");
        const rowID = $(this).attr("rowID");
        if (validate) {

            let data = getFormData("modal_fms_chartofaccts", true);
            delete data["tableData"].bankNumber;
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "fms_chart_of_accounts_tbl";
			data["whereFilter"]          = "chartOfAccountID="+rowID;
			data["feedback"]             = $("[name=accountCode]").val();

			sweetAlertConfirmation(
				"update",
				"Chart pf Accounts",
				"modal_fms_chartofaccts",
				"",
				data,
				true,
				tableContent
            );
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 

    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_fms_chartofaccts");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Chart of Accounts",
				"modal_fms_chartofaccts"
			);
		} else {
			$("#modal_fms_chartofaccts").modal("hide");
		}
    });

    // -------- END CANCEL MODAL-----------
      
});