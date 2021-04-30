$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableFinanceBank')){
            $('#tableFinanceBank').DataTable().destroy();
        }
        
        var table = $("#tableFinanceBank").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%" },
                { targets: 2, width: "10%" },
                { targets: 3, width: 80 },
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
        //   const data = getTableData("fms_bank_tbl","*", "", ""); 

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "fms_bank_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableFinanceBank">
                    <thead>
                    <tr>
                        <th>Bank Code</th>
                        <th>Bank Name</th>
                        <th>Account Number Format</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.bankID, // Required
                        bankName: item.bankName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    if(item.bankStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.bankStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.bankID}"
                    feedback="${item.username}">
                        <td>${item.bankCode}</td>
                        <td>${item.bankName}</td>
                        <td>${item.bankNumber}</td>
                        <td class="text-center">${status}</td>
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

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let bankID              = data ? (data[0].bankID            ? data[0].bankID        : "") : "",
        bankName                = data ? (data[0].bankName          ? data[0].bankName      : "") : "",
        bankNumber      = data ? (data[0].bankNumber? data[0].bankNumber         : "") : "";
        bankStatus      = data ? (data[0].bankStatus? data[0].bankStatus         : "") : "";
          
        let button = bankID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${bankID}">
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
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Bank Name <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="bankName" 
                            id="input_bankName" 
                            data-allowcharacters="[A-Z][a-z][0-9][-][ ]" 
                            minlength="2" 
                            maxlength="20" 
                            required
                            unique="${bankID}"  
                            value="${bankName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_bankName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Account Number Format <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="bankNumber" 
                            id="input_bankNumber" 
                            data-allowcharacters="[0-9]" 
                            minlength="8" 
                            maxlength="16" 
                            required 
                            value="${bankNumber}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_bankNumber"></div>
                    </div>
                </div>
            </div>
            <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Status <span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_bankStatus" 
                        name="bankStatus"
                        autocomplete="off"
                        >
                        <option 
                            value="1" 
                            ${data && bankStatus == "1" && "selected"} >Active</option>
                        <option 
                            value="0" 
                            ${data && bankStatus == "0" && "selected"}>Inactive</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-input_bankStatus"></div>
                </div>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel px-5 p-2 btnCancel"> <i class="fas fa-ban"></i> Cancel</button>
        </div>`;
    return html;
} 
    // ----- END MODAL CONTENT -----

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#finance_bank_modalheader").text("ADD BANK");
        $("#modal_finance_bank").modal("show");
        $("#modal_finance_bank_content").html(preloader);
        const content = modalContent();
        $("#modal_finance_bank_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_finance_bank");
    if (validate) {

        let data = getFormData("modal_finance_bank", true);
        data["tableData[bankCode]"] = generateCode("BNK", false, "fms_bank_tbl", "bankCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "fms_bank_tbl";
        data["feedback"]             = $("[name=bankName]").val();

        sweetAlertConfirmation("add", "Bank", "modal_finance_bank", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#finance_bank_modalheader").text("EDIT BANK");
        $("#modal_finance_bank").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_finance_bank_content").html(preloader); 

        const tableData = getTableData("fms_bank_tbl", "*", "bankID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_finance_bank_content").html(content);
                // $("#btnSaveConfirmationEdit").attr("rowID", id);
                // $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_finance_bank");
        const rowID = $(this).attr("rowID");
        if (validate) {

            let data = getFormData("modal_finance_bank", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "fms_bank_tbl";
			data["whereFilter"]          = "bankID=" + rowID;
			data["feedback"]             = $("[name=bankName]").val();

			sweetAlertConfirmation(
				"update",
				"Bank",
				"modal_finance_bank",
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
		let formEmpty = isFormEmpty("modal_finance_bank");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Bank",
				"modal_finance_bank"
			);
		} else {
			$("#modal_finance_bank").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------
      
});