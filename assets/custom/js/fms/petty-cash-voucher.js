$(document).ready(function() {

    const MODULE_ID     = 93;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing    = false;


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(MODULE_ID);
	// ----- END MODULE APPROVER -----


    // ----- DATATABLES -----
	function initDataTables() {
		["#tablePettyCashVoucher"].map(elementID => {
			if ($.fn.DataTable.isDataTable(elementID)) {
				$(elementID).DataTable().destroy();
			}
	
			var table = $(elementID)
				.css({ "min-width": "100%" })
				.removeAttr("width")
				.DataTable({
					proccessing: false,
					serverSide: false,
					scrollX: true,
					sorting: [],
					scrollCollapse: true,
					columnDefs: [
						{ targets: 0,  width: 100 },
						{ targets: 1,  width: 200 },
						{ targets: 2,  width: 150 },
						{ targets: 3,  width: 300 },
						{ targets: 4,  width: 150 },
						{ targets: 5,  width: 150 },
						{ targets: 6,  width: 150 },
					],
				});
		})
	}
	// ----- END DATATABLES -----


	// ----- TABLE CONTENT -----
    function tableContent() {
        $("#page_content").html(preloader);

        setTimeout(function() {

            let settings = getTableData(`gen_system_setting_tbl WHERE systemSettingID = 1`, `pettyCashReplenishmentLimit`)?.[0];
            let pettyCashRemainingBalance = settings?.pettyCashReplenishmentLimit ?? 0;

            let tbodyHTML = '';
            let pettyCashRequestData = getTableData(
                `fms_petty_cash_voucher_tbl AS fpcvt
                    LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                    LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
                    LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID`,
                `fpcvt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hdt.departmentName, hdt2.designationName`);
            if (pettyCashRequestData && pettyCashRequestData.length) {
                pettyCashRequestData.map(item => {
                    let {
                        pettyCashVoucherID,
                        pettyCashVoucherCode,
                        pettyCashRequestID,
                        pettyCashRequestCode,
                        employeeID,
                        requestedAmount,
                        totalAmount,
                        remainingBalance,
                        pettyCashVoucherReason,
                        submittedAt,
                        isReplenished,
                        fullname,
                        departmentName,
                        designationName,
                    } = item;

                    tbodyHTML += `
                    <tr>
                        <td>${pettyCashVoucherCode}</td>
                        <td>
                            <div>${fullname}</div>
                            <small>${departmentName} | ${designationName}</small>
                        </td>
                        <td>
                            <div><a href="${base_url+"fms/petty_cash_request?view_id="+encryptString(pettyCashRequestID)}" target="_blank">${pettyCashRequestCode}</a></div>
                            <small>${moment(submittedAt).format("MMMM DD, YYYY")}</small>
                        </td>
                        <td>${pettyCashVoucherReason || "-"}</td>
                        <td class="text-right">${formatAmount(requestedAmount, true)}</td>
                        <td class="text-right">${formatAmount(totalAmount, true)}</td>
                        <td class="text-right">${formatAmount(remainingBalance, true)}</td>
                    </tr>`;
                })
            }

            let html = `
            <div class="table-responsive">
                <div class="text-right pb-4">
                    <h4 class="font-weight-bold">Remaining Balance: <span class="text-danger" style="font-size: 1.3em;">${formatAmount(pettyCashRemainingBalance, true)}</span></h4>
                </div>
                <table class="table table-bordered table-hover table-striped" id="tablePettyCashVoucher">
                    <thead>
                        <tr>
                            <th>Document No.</th>
                            <th>Requestor Name</th>
                            <th>Reference No.</th>
                            <th>Description</th>
                            <th>Requested Amount</th>
                            <th>Total Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tbodyHTML}
                    </tbody>
                </table>
            </div>`;

            $("#page_content").html(html);
            initAll();
            initDataTables();
        }, 100)
    }
    tableContent();
	// ----- END TABLE CONTENT -----

})