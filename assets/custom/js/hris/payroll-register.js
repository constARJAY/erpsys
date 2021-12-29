$(document).ready(function () {

    const allowedUpdate = isUpdateAllowed(113);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(113);
	// ----- END MODULE APPROVER -----


    // ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
            let empID = id == "0" ? sessionID : id;
			let data = allEmployeeData.filter(employee => employee.employeeID == empID);
			let { employeeID, fullname, designation, department } = data && data[0];
			return { employeeID, fullname, designation, department };
		}
		return {};
	}
	const employeeFullname = (id) => {
		if (id != "-") {
			let data = employeeData(id);
			return data.fullname || "-";
		}
		return "-";
	}
	// ---- END GET EMPLOYEE DATA -----


    // ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"hris_payroll_register_tbl", 
				"revisePayrollRegisterID", 
				"revisePayrollRegisterID IS NOT NULL AND payrollRegisterStatus != 4");
			return revisedDocumentsID.map(item => item.revisePayrollRegisterID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

	
    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
        return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
    
	const getNonFormattedAmount = (amount = "₱0.00") => {
        return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
    // END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
        $('[data-toggle="tooltip"]').tooltip();

        const manipulateDataTables = (elementID = "") => {
            if (elementID) {
                if ($.fn.DataTable.isDataTable(elementID)) {
                    $(elementID).DataTable().destroy();
                }

                let datatableOption = {
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        [],
                    scrollCollapse: true,
                    columnDefs: [
                        { targets: 0,  width: 100 },
                        { targets: 1,  width: 100 },
                        { targets: 2,  width: 150 },
                        { targets: 3,  width: 300 },
                        { targets: 4,  width: 150 },
                        { targets: 5,  width: 300 },
                        { targets: 6,  width: 80  },
                        { targets: 7,  width: 200 }, 	
                    ],
                };

                if (elementID == "#tablePayrollRegister") {
					const isReadOnly = $("#tablePayrollRegister").attr("isReadOnly") == "true";

                    datatableOption = {
                        proccessing:    false,
                        serverSide:     false,
                        scrollX:        true,
                        scrollY:        500,
                        sorting:        [],
                        scrollCollapse: true,
                        paging:         false,
                        sorting:        false,
                        info:           false,
                        bSort:          false,
                        columnDefs: [
                            { targets: 0,           width: "250px" },
                            { targets: "thPay",     width: "90px"  },
                            { targets: "thPay2",    width: "120px" },
                            { targets: "thMandate", width: "150px" },
                            { targets: "thAdjust",  width: "150px" },	
                            { targets: "thAdjust2", width: "180px" },	
                            { targets: "thAdjust3", width: "210px" },	
                            { targets: "thAdjust4", width: "250px" },	
                            { targets: -1,          width: "150px" },		
                        ],
                        fixedColumns: {
                            leftColumns:  1,
                            // rightColumns: 1,
                        }
                    }
                }

                var table = $(elementID)
                    .css({ "min-width": "100%" })
                    .removeAttr("width")
                    .DataTable(datatableOption);
            }
        }

        ["#tableForApproval", "#tableMyForms", "#tablePayrollRegister"].map(elementID => {
            manipulateDataTables(elementID);
        })
	}
	// ----- END DATATABLES -----


    // ----- GET PAYROLL DATA -----
    function getAllPayrollRegisterData(payrollRegisterID = 0) {
        let result = null;
        if (payrollRegisterID) {
            $.ajax({
                method: "POST",
                url: "payroll_register/getAllPayrollRegisterData",
                data: { payrollRegisterID },
                dataType: "json",
                async: false,
                success: function(data) {
                    result = data;
                },
                error: function() {
                    showNotification("danger", "There was an error fetching the data.<br>Please try again..");
                }
            })
        }
        return result;
    }
    // ----- END GET PAYROLL DATA -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getAllPayrollRegisterData(id);

			if (tableData && tableData?.header && tableData?.body) {
				let {
					employeeID,
					payrollRegisterStatus
				} = tableData?.header;

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (payrollRegisterStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (payrollRegisterStatus == 0 || payrollRegisterStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (payrollRegisterStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly, true, isFromCancelledDocument);
						updateURL(encryptString(id), true, true);
					} else {
						pageContent(true, tableData, isReadOnly);
						updateURL(encryptString(id));
					}
				} else {
					pageContent();
					updateURL();
				}
				
			} else {
				pageContent();
				updateURL();
			}
		}

		if (view_id) {
			let id = view_id;
				id && isFinite(id) && loadData(id, isRevise, isFromCancelledDocument);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				arr = url.split("?add=");
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					const isAllowed = isCreateAllowed(110);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/payroll_register?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/payroll_register?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/payroll_register?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/payroll_register`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(110)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack" 
				revise="${isRevise}"
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_payroll_register_tbl", "approversID")) {
				let count = getCountForApproval("hris_payroll_register_tbl", "payrollRegisterStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = `
				<div class="bh_divider appendHeader"></div>
				<div class="row clearfix appendHeader">
					<div class="col-12">
						<ul class="nav nav-tabs">
							<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval ${displayCount}</a></li>
							<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Forms</a></li>
						</ul>
					</div>
				</div>`;
				$("#headerContainer").append(html);
			}
		} else {
			$("#headerContainer").find(".appendHeader").remove();
		}
	}
	// ----- END HEADER CONTENT -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent .loader").length == 0 && $("#tableForApprovalParent").html(preloader);
		let payrollRegisterData = getTableData(
			`hris_payroll_register_tbl AS hprt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                LEFT JOIN hris_payroll_tbl AS hpt ON hprt.payrollID = hpt.payrollID`,
			`hprt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hprt.createdAt AS dateCreated,
            payrollStartDate, payrollEndDate`,
			`hprt.employeeID <> ${sessionID} AND payrollRegisterStatus <> 0 AND payrollRegisterStatus <> 4`,
			`FIELD(payrollRegisterStatus, 0, 1, 3, 2, 4, 5), hpt.payrollStartDate DESC, COALESCE(hprt.submittedAt, hprt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
					<th>Reference No.</th>
                    <th>Prepared By</th>
                    <th>Payroll Period</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		payrollRegisterData.map((item) => {
			let {
				payrollRegisterID,
				payrollRegisterCode,
				payrollCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollRegisterReason,
                approversID,
                approversStatus,
                approversDate,
                payrollRegisterStatus,
                payrollRegisterRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRegisterRemarks ? payrollRegisterRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollRegisterStatus == 2 || payrollRegisterStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let payrollDate = "-";
            if (payrollStartDate && payrollEndDate) {
                payrollStartDate = moment(payrollStartDate).format("MMMM DD, YYYY");
                payrollEndDate   = moment(payrollEndDate).format("MMMM DD, YYYY");
                payrollDate      = `${payrollStartDate} - ${payrollEndDate}`;
            }

			if (isImCurrentApprover(approversID, approversDate, payrollRegisterStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView" id="${encryptString(payrollRegisterID)}">
					<td>${payrollRegisterCode}</td>
					<td>${payrollCode || "-"}</td>
					<td>${fullname || "-"}</td>
					<td>${payrollDate}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, payrollRegisterStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(payrollRegisterStatus, employeeID != 0)}
					</td>
					<td>${remarks}</td>
				</tr>`;
			}
		});
		

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForApprovalParent").html(html);
			initDataTables();
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		uniqueData = [];

		$("#tableMyFormsParent .loader").length == 0 && $("#tableMyFormsParent").html(preloader);
		let payrollRegisterData = getTableData(
			`hris_payroll_register_tbl AS hprt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                LEFT JOIN hris_payroll_tbl AS hpt ON hprt.payrollID = hpt.payrollID`,
			`hprt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hprt.createdAt AS dateCreated,
            payrollStartDate, payrollEndDate`,
			`hprt.employeeID = 0 OR hprt.employeeID IS NULL OR hprt.employeeID = ${sessionID}`,
			`FIELD(payrollRegisterStatus, 0, 1, 3, 2, 4, 5), hpt.payrollStartDate DESC, COALESCE(hprt.submittedAt, hprt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
					<th>Reference No.</th>
                    <th>Prepared By</th>
                    <th>Payroll Period</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		payrollRegisterData.map((item) => {
			let {
				payrollRegisterID,
				payrollRegisterCode,
				payrollCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollRegisterReason,
                approversID,
                approversStatus,
                approversDate,
                payrollRegisterStatus,
                payrollRegisterRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRegisterRemarks ? payrollRegisterRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollRegisterStatus == 2 || payrollRegisterStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let payrollDate = "-";
            if (payrollStartDate && payrollEndDate) {
                payrollStartDate = moment(payrollStartDate).format("MMMM DD, YYYY");
                payrollEndDate   = moment(payrollEndDate).format("MMMM DD, YYYY");
                payrollDate      = `${payrollStartDate} - ${payrollEndDate}`;
            }

			html += `
			<tr class="btnView" id="${encryptString(payrollRegisterID)}">
                <td>${payrollRegisterCode}</td>
				<td>${payrollCode || "-"}</td>
                <td>${fullname || "-"}</td>
                <td>${payrollDate}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, payrollRegisterStatus, true))}
                </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(payrollRegisterStatus, employeeID != 0)}
                </td>
                <td>${remarks}</td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----


	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				payrollRegisterID       = "",
				revisePayrollRegisterID = "",
				payrollRegisterStatus   = "",
				employeeID              = "",
				approversID             = "",
				approversDate           = "",
				createdAt               = new Date
			} = data && data?.header;

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null || employeeID === sessionID) {
				if (payrollRegisterStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						payrollRegisterID="${encryptString(payrollRegisterID)}"
						code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2" 
							id="btnBack"
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2 btnBack"
							id="btnBack" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
							status="${payrollRegisterStatus}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (payrollRegisterStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
							status="${payrollRegisterStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (payrollRegisterStatus == 2) {
					// DROP
					/* 
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						payrollRegisterID="${encryptString(payrollRegisterID)}"
						code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
						status="${payrollRegisterStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
					*/
				} else if (payrollRegisterStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(payrollRegisterID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
							status="${payrollRegisterStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (payrollRegisterStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`hris_payroll_register_tbl`,
						`revisePayrollRegisterID`,
						`revisePayrollRegisterID = ${revisePayrollRegisterID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { revisePayrollRegisterID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`hris_payroll_register_tbl`,
							`revisePayrollRegisterID`,
							`payrollRegisterStatus <> 3 AND payrollRegisterStatus <> 4 AND revisePayrollRegisterID = ${reviseID}`
						);
					}

					if (!isDocumentRevised(payrollRegisterID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"
							status="${payrollRegisterStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (payrollRegisterStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							payrollRegisterID="${encryptString(payrollRegisterID)}"
							code="${getFormCode("PRR", createdAt, payrollRegisterID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit px-5 p-2"  
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel btnCancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- PAYROLL REGISTER TABLE -----
	function tablePayrollRegister(payrollRegister = false, payrollDate = "", readOnly = false) {


		let totalBasicSalary          = 0;
		let totalHoliday              = 0;
		let totalAllowance            = 0;
		let totalPaidLeave            = 0;
		let totalOvertime             = 0;
		let totalAdditionalAdjustment = 0;
		let totalNightDifferential    = 0;
		let totalSubtotal             = 0;
		let totalLateUndertime        = 0;
		let totalLwop                 = 0;
		let totalGrossPay             = 0;
		let totalSss                  = 0;
		let totalPhic                 = 0;
		let totalHdmf                 = 0;
		let totalVtax                 = 0;
		let totalLoan                 = 0;
		let totalMandate              = 0;
		let totalOtherDeduction       = 0;
		let totalNetPay               = 0;
		let totalSalaryWages          = 0;
		let totalSalaryOnBank         = 0;
		let totalOnHoldSalary         = 0;
		let totalSalaryOnCheck        = 0;

		let grandTotalOnHoldSalary  = 0;
		let grandTotalSalaryOnCheck = 0;
		let grandTotalSalaryOnBank  = 0;
		let grandTotalNetPayroll    = 0;
		let grandTotalPayroll       = 0;

		let tbodyHTML = '';
		if (payrollRegister && payrollRegister?.body?.items.length > 0) {
			let data = payrollRegister?.body?.items;
			data.map((item, index) => {

				let {
					fullname               = "",
					employeeCode           = "",
					profile                = "",
					payrollRegisterItemID  = 0,
					payrollRegisterID      = 0,
					payrollID              = 0,
					employeeID             = 0,
					totalDays              = 0,
					basicSalary            = 0,
					basicPay               = 0,
					holidayPay             = 0,
					leavePay               = 0,
					overtimePay            = 0,
					nightDifferentialPay   = 0,
					allowance              = 0,
					additionalAdjustment   = 0,
					lateUndertimeDeduction = 0,
					lwopDeduction          = 0,
					grossPay               = 0,
					sssDeduction           = 0,
					phicDeduction          = 0,
					hdmfDeduction          = 0,
					withHoldingDeduction   = 0,
					loanDeduction          = 0,
					totalMandates          = 0,
					otherDeductions        = 0,
					netPay                 = 0,
					salaryWages            = 0,
					salaryOnBank           = 0,
					salaryOnCheck          = 0,
					onHoldSalary           = 0,
					totalSalary            = 0,
				} = item;

				let subtotal = (+basicSalary) + (+holidayPay) + (+allowance) + (+leavePay) + (+overtimePay) + (+nightDifferentialPay) + (+additionalAdjustment);

				grandTotalOnHoldSalary  += (+onHoldSalary) ?? 0;
				grandTotalSalaryOnCheck += (+salaryOnCheck) ?? 0;
				grandTotalSalaryOnBank  += (+salaryOnBank) ?? 0;
				grandTotalNetPayroll    += (+netPay) ?? 0;
				grandTotalPayroll       += (+totalSalary) ?? 0;

				totalBasicSalary          += (+basicSalary);
				totalHoliday              += (+holidayPay);
				totalAllowance            += (+allowance);
				totalPaidLeave            += (+leavePay);
				totalOvertime             += (+overtimePay);
				totalAdditionalAdjustment += (+additionalAdjustment);
				totalNightDifferential    += (+nightDifferentialPay);
				totalSubtotal             += (+subtotal);
				totalLateUndertime        += (+lateUndertimeDeduction);
				totalLwop                 += (+lwopDeduction);
				totalGrossPay             += (+grossPay);
				totalSss                  += (+sssDeduction);
				totalPhic                 += (+phicDeduction);
				totalHdmf                 += (+hdmfDeduction);
				totalVtax                 += (+withHoldingDeduction);
				totalLoan                 += (+loanDeduction);
				totalMandate              += (+totalMandates);
				totalOtherDeduction       += (+otherDeductions);
				totalNetPay               += (+netPay);
				totalSalaryWages          += (+salaryWages);
				totalSalaryOnBank         += (+salaryOnBank);
				totalOnHoldSalary         += (+onHoldSalary);
				totalSalaryOnCheck        += (+salaryOnCheck);

				tbodyHTML += `
				<tr payrollRegisterItemID="${payrollRegisterItemID}"
					employeeID="${employeeID}">
					<td>
						<div class="d-flex justify-content-start align-items-center">
							<img class="rounded-circle" src="${base_url}assets/upload-files/profile-images/${profile}" alt="${fullname}" style="width: 50px; height: 50px;">
							<div class="ml-3 align-self-center">
								<div>${fullname}</div>
								<small>${employeeCode}</small>
							</div>
						</div>
					</td>
					<td class="text-right text-center">${totalDays}</td>
					<td class="text-right">${formatAmount(basicSalary, true)}</td>
					<td class="text-right">${formatAmount(holidayPay, true)}</td>
					<td class="text-right">${formatAmount(allowance, true)}</td>
					<td class="text-right">${formatAmount(leavePay, true)}</td>
					<td class="text-right">${formatAmount(overtimePay, true)}</td>
					<td class="text-right">${formatAmount(additionalAdjustment, true)}</td>
					<td class="text-right">${formatAmount(nightDifferentialPay, true)}</td>
					<td class="text-right">${formatAmount(subtotal, true)}</td>
					<td class="text-right">${formatAmount(lateUndertimeDeduction, true)}</td>
					<td class="text-right">${formatAmount(lwopDeduction, true)}</td>
					<td class="text-right grossPay">${formatAmount(grossPay, true)}</td>
					<td class="text-right">${formatAmount(sssDeduction, true)}</td>
					<td class="text-right">${formatAmount(phicDeduction, true)}</td>
					<td class="text-right">${formatAmount(hdmfDeduction, true)}</td>
					<td class="text-right">${formatAmount(withHoldingDeduction, true)}</td>
					<td class="text-right">${formatAmount(loanDeduction, true)}</td>
					<td class="text-right totalMandates">${formatAmount(totalMandates, true)}</td>
					<td class="text-right">${formatAmount(otherDeductions, true)}</td>
					<td class="text-right netPay">${formatAmount(netPay, true)}</td>
					<td class="text-right salaryWages">${formatAmount(salaryWages, true)}</td>
					<td class="text-right">${formatAmount(allowance, true)}</td>
					<td class="text-right salaryOnBank">${formatAmount(salaryOnBank, true)}</td>
					<td class="text-right onHoldSalary">${formatAmount(onHoldSalary, true)}</td>
					<td class="text-right salaryOnCheck">${formatAmount(salaryOnCheck, true)}</td>
				</tr>`;
			})
		}

		let html = `
		<div class="card">
			<div class="card-header bg-primary text-white text-center">
				<h6 class="font-weight-bold">${payrollDate}</h6>
			</div>
			<div class="card-body" style="font-size: .9rem;">
				<table class="table table-bordered table-striped table-nowrap position-relative" id="tablePayrollRegister" isReadOnly="${readOnly}">
					<thead>
						<tr>
							<th style="z-index: 2;">Employee Name</th>
							<th class="thPay">Total Days</th>
							<th class="thPay">Basic Salary</th>
							<th class="thPay">Holiday</th>
							<th class="thPay">Allowance</th>
							<th class="thPay">Paid Leave</th>
							<th class="thPay">Overtime</th>
							<th class="thAdjust2">Additional Adjustment</th>
							<th class="thAdjust">Night Differential</th>
							<th class="thPay">SUBTOTAL</th>
							<th class="thPay">Late/Undertime</th>
							<th class="thPay">LWOP</th>
							<th class="thPay">GROSS PAY</th>
							<th class="thPay">SSS</th>
							<th class="thPay">PHIC</th>
							<th class="thPay">HDMF</th>
							<th class="thPay">VTAX</th>
							<th class="thPay">LOANS</th>
							<th class="thAdjust">TOTAL MANDATES</th>
							<th class="thAdjust">Other Deductions</th>
							<th class="thPay">NET PAY</th>
							<th class="thAdjust">Salary and Wages</th>
							<th class="thAdjust">Allowance</th>
							<th class="thAdjust">Salary on Bank</th>
							<th class="thAdjust">On Hold Salary</th>
							<th class="thAdjust">Salary on Check</th>
						</tr>
					</thead>
					<tbody>${tbodyHTML}</tbody>
					<tfoot>
						<tr class="font-weight-bold">
							<th class="text-center" style="z-index: 2;">TOTAL</th>
							<td class="text-right">&nbsp;</td>
							<td class="text-right">${formatAmount(totalBasicSalary, true)}</td>
							<td class="text-right">${formatAmount(totalHoliday, true)}</td>
							<td class="text-right">${formatAmount(totalAllowance, true)}</td>
							<td class="text-right">${formatAmount(totalPaidLeave, true)}</td>
							<td class="text-right">${formatAmount(totalOvertime, true)}</td>
							<td class="text-right">${formatAmount(totalAdditionalAdjustment, true)}</td>
							<td class="text-right">${formatAmount(totalNightDifferential, true)}</td>
							<td class="text-right">${formatAmount(totalSubtotal, true)}</td>
							<td class="text-right">${formatAmount(totalLateUndertime, true)}</td>
							<td class="text-right">${formatAmount(totalLwop, true)}</td>
							<td class="text-right">${formatAmount(totalGrossPay, true)}</td>
							<td class="text-right">${formatAmount(totalSss, true)}</td>
							<td class="text-right">${formatAmount(totalPhic, true)}</td>
							<td class="text-right">${formatAmount(totalHdmf, true)}</td>
							<td class="text-right">${formatAmount(totalVtax, true)}</td>
							<td class="text-right">${formatAmount(totalLoan, true)}</td>
							<td class="text-right">${formatAmount(totalMandate, true)}</td>
							<td class="text-right">${formatAmount(totalOtherDeduction, true)}</td>
							<td class="text-right">${formatAmount(totalNetPay, true)}</td>
							<td class="text-right">${formatAmount(totalSalaryWages, true)}</td>
							<td class="text-right">${formatAmount(totalAllowance, true)}</td>
							<td class="text-right">${formatAmount(totalSalaryOnBank, true)}</td>
							<td class="text-right">${formatAmount(totalOnHoldSalary, true)}</td>
							<td class="text-right">${formatAmount(totalSalaryOnCheck, true)}</td>
						</tr>
					</tfoot>
				</table>

				<div class="row mt-4">
					<div class="offset-md-7 col-md-5 col-sm-12">
						<div class="row" style="font-size: 1.1rem;">
							<div class="col-6 text-left font-weight-bold">Total On Hold Salary</div>
							<div class="col-6 text-right font-weight-bold totalOnHoldSalary">${formatAmount(grandTotalOnHoldSalary, true)}</div>
							<div class="col-6 text-left font-weight-bold">Total Salary on Check</div>
							<div class="col-6 text-right font-weight-bold totalSalaryOnCheck">${formatAmount(grandTotalSalaryOnCheck, true)}</div>
							<div class="col-6 text-left font-weight-bold">Total Salary on Bank</div>
							<div class="col-6 text-right font-weight-bold totalSalaryOnBank">${formatAmount(grandTotalSalaryOnBank, true)}</div>
							<div class="col-6 text-left font-weight-bold">Net Payroll</div>
							<div class="col-6 text-right font-weight-bold totalNetPayroll">${formatAmount(grandTotalNetPayroll, true)}</div>
							<div class="col-6 text-left font-weight-bold">
								<div style="font-size: 1.4rem;">Total Payroll</div>
							</div>
							<div class="col-6 text-right font-weight-bold totalPayroll">
								<div style="font-size: 1.4rem;">${formatAmount(grandTotalPayroll, true)}</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>`;

		return html;
	}
	// ----- END PAYROLL REGISTER TABLE -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			payrollRegisterID         = "",
			payrollRegisterCode       = "",
			revisePayrollRegisterID   = "",
			revisePayrollRegisterCode = "",
			employeeID                = "",
			payrollID                 = "",
			payrollCode               = "",
            payrollStartDate          = "",
			payrollEndDate            = "",
			payrollRegisterReason     = "",
			payrollRegisterRemarks    = "",
			approversID               = "",
			approversStatus           = "",
			approversDate             = "",
			payrollRegisterStatus     = 0,
			submittedAt               = false,
			createdAt                 = false,
		} = data && data?.header;

		let adjustment = data?.adjustment;

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("payrollRegisterID", encryptString(payrollRegisterID));
		$("#btnBack").attr("status", payrollRegisterStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);
		$("#btnBack").attr("code", payrollRegisterCode);

		let disabled = readOnly ? "disabled" : "";
		let button = adjustment != 1 ? formButtons(data, isRevise, isFromCancelledDocument) : "";

		let startDate   = moment(payrollStartDate).format("MMMM DD, YYYY");
		let endDate     = moment(payrollEndDate).format("MMMM DD, YYYY");
        let payrollDate = `${startDate} - ${endDate}`;

		let reviseDocumentNo    = isRevise ? payrollRegisterID : revisePayrollRegisterID;
		let documentHeaderClass = isRevise || revisePayrollRegisterID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePayrollRegisterID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePayrollRegisterID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PRR", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${payrollRegisterID && !isRevise ? payrollRegisterCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${payrollRegisterStatus && !isRevise ? getStatusStyle(payrollRegisterStatus, employeeID != 0) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentDateClass}">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(payrollRegisterStatus, approversID, approversDate)}
							</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">
							${payrollRegisterRemarks && !isRevise ? payrollRegisterRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_payroll_register">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
                    <input type="text" class="form-control" disabled value="${payrollCode}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Payroll Period</label>
                    <input type="text" 
						class="form-control" 
						name="payrollPeriod"
						start="${payrollStartDate}"
						end="${payrollEndDate}"
						value="${payrollDate}"
						disabled>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="${employeeDesignation}">
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="payrollRegisterReason"
                        name="payrollRegisterReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${payrollRegisterReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-payrollRegisterReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-3">
                <div class="w-100" id="tablePayrollRegisterParent">
					${tablePayrollRegister(data, payrollDate, readOnly)}
				</div>
            </div>

            <div class="col-md-12 text-right mt-3" id="buttonDisplay">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			initAll();

			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			// ----- END NOT ALLOWED FOR UPDATE -----
		}, 100);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		if (!isForm) {
			preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForApprovalParent">
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="table-responsive" id="tableMyFormsParent">
                    </div>
                </div>
            </div>`;
			$("#page_content").html(html);

			headerButton(true, "");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise, isFromCancelledDocument);
			headerTabContent(false);
			formContent(data, readOnly, isRevise, isFromCancelledDocument);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- UPDATE EMPLOYEE SALARY -----
	function updateEmployeeSalary($parent = null) {
		if ($parent) {
			let otherDeduction = $parent.find(`[name="otherDeductions"]`).val();
				otherDeduction = getNonFormattedAmount(otherDeduction);
			let grossPay       = $parent.find(`.grossPay`).text();
				grossPay       = getNonFormattedAmount(grossPay);
			let totalMandates  = $parent.find(`.totalMandates`).text();
				totalMandates  = getNonFormattedAmount(totalMandates);
			let netPay         = $parent.find(`.netPay`).text();
				netPay         = getNonFormattedAmount(netPay);
			let salaryWages    = $parent.find(`.salaryWages`).text();
				salaryWages    = getNonFormattedAmount(salaryWages);
			let salaryOnBank   = $parent.find(`.salaryOnBank`).text();
				salaryOnBank   = getNonFormattedAmount(salaryOnBank);
			let onHoldSalary   = $parent.find(`.onHoldSalary`).text();
				onHoldSalary   = getNonFormattedAmount(onHoldSalary);
			let salaryOnCheck  = $parent.find(`.salaryOnCheck`).text();
				salaryOnCheck  = getNonFormattedAmount(salaryOnCheck);

			let totalDeduction = otherDeduction + totalMandates;
			let newNetPay = grossPay - totalDeduction;
			
			$parent.find(`.netPay`).text(formatAmount(newNetPay, true));
			if (salaryWages) $parent.find(`.salaryWages`).text(formatAmount(newNetPay, true));
			if (salaryOnBank) $parent.find(`.salaryOnBank`).text(formatAmount(newNetPay, true));
			if (onHoldSalary) $parent.find(`.onHoldSalary`).text(formatAmount(newNetPay, true));
			if (salaryOnCheck) $parent.find(`.salaryOnCheck`).text(formatAmount(newNetPay, true));
		}
	}
	// ----- END UPDATE EMPLOYEE SALARY -----


    // ----- VIEW/EDIT DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
	});
	// ----- END VIEW/EDIT DOCUMENT -----


	// ----- BUTTON BACK -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("payrollRegisterID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PRR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPayrollRegisterData(action, "save", "0", id);
				data["payrollRegisterStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["revisePayrollRegisterID"] = id;
					delete data["payrollRegisterID"];
				} else {
					data["payrollRegisterID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
	
				savePayrollRegister(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);

				setTimeout(() => {
					pageContent();
		
					if (employeeID != sessionID) {
						$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
					}
				}, 10);
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPayrollRegisterData(action, "save", "0", id);
			data["payrollRegisterStatus"] = 0;

			savePayrollRegister(data, "save", null, pageContent);
		}
	});
	// ----- END BUTTON BACK -----


	// ----- BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("payrollRegisterID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_payroll_register");
		
		if (validate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getPayrollRegisterData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data["revisePayrollRegisterID"] = id;
					delete data["payrollRegisterID"];
				}
			}

			let approversID   = data["approversID"], 
				approversDate = data["approversDate"];

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                111,
					notificationTitle:       "Payroll Register",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePayrollRegister(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END BUTTON SUBMIT -----


	// ----- BUTTON CANCEL -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("payrollRegisterID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPayrollRegisterData(action, "cancelform", "4", id, status);

		savePayrollRegister(data, "cancelform", null, pageContent);
	});
	// ----- END BUTTON CANCEL -----


	// ----- BUTTON REVISE -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("payrollRegisterID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END BUTTON REVISE -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("payrollRegisterID"));
		const feedback = $(this).attr("code") || getFormCode("PRR", dateToday(), id);

		$("#modal_payroll_register_content").html(preloader);
		$("#modal_payroll_register .page-title").text("DENY PAYROLL REGISTER");
		$("#modal_payroll_register").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="payrollRegisterRemarks"
					name="payrollRegisterRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-payrollRegisterRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			payrollRegisterID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_payroll_register_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("payrollRegisterID"));
		const feedback = $(this).attr("code") || getFormCode("PRR", dateToday(), id);

		const validate = validateForm("modal_payroll_register");
		if (validate) {
			let tableData = getTableData("hris_payroll_register_tbl", "", "payrollRegisterID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"]                 = "update";
				data["method"]                 = "deny";
				data["payrollRegisterID"]      = id;
				data["approversStatus"]        = updateApproveStatus(approversStatus, 3);
				data["approversDate"]          = updateApproveDate(approversDate);
				data["payrollRegisterRemarks"] = $("[name=payrollRegisterRemarks]").val()?.trim();
				data["updatedBy"]              = sessionID;

				let notificationData = {
					moduleID:                133,
					tableID: 				 id,
					notificationTitle:       "Payroll Register",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePayrollRegister(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("payrollRegisterID"));
		const feedback = $(this).attr("code") || getFormCode("PRR", dateToday(), id);
		let tableData  = getTableData("hris_payroll_register_tbl", "", "payrollRegisterID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;

			let data = getPayrollRegisterData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                113,
					tableID:                 id,
					notificationTitle:       "Payroll Register",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                113,
					tableID:                 id,
					notificationTitle:       "Payroll Register",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["payrollRegisterStatus"] = status;

			savePayrollRegister(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- OTHER DEDUCTION -----
	$(document).on("keyup", `[name="otherDeductions"]`, function() {
		$parent = $(this).closest("tr");
		updateEmployeeSalary($parent);
	})
	// ----- END OTHER DEDUCTION -----


	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END NAV LINK -----


	// ----- GET PAYROLL REGISTER DATA -----
	function getPayrollRegisterData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

		// ----- RESET SEARCH IN DATATABLE -----
		$(`[aria-controls="tablePayrollRegister"]`).val("");
		$('#tablePayrollRegister').DataTable().search("").draw();
		// ----- RESET SEARCH IN DATATABLE -----

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["payrollRegisterID"] = id;

			if (status != "2") {
				data["payrollRegisterStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"]            = sessionID;
			data["payrollRegisterReason"] = $("[name=payrollRegisterReason]").val()?.trim();
			data['totalOnHoldSalary']     = getNonFormattedAmount($(`.totalOnHoldSalary`).text());
			data['totalSalaryOnCheck']    = getNonFormattedAmount($(`.totalSalaryOnCheck`).text());
			data['totalSalaryOnBank']     = getNonFormattedAmount($(`.totalSalaryOnBank`).text());
			data['totalNetPay']           = getNonFormattedAmount($(`.totalNetPayroll`).text());
			data['totalPayroll']          = getNonFormattedAmount($(`.totalPayroll`).text());

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["payrollRegisterID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]   = approversID;
					data["payrollRegisterStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["payrollRegisterStatus"]   = 2;
				}
			}

			$("#tablePayrollRegister tbody tr").each(function() {
				const payrollRegisterItemID = $(this).attr("payrollRegisterItemID");
				const employeeID            = $(this).attr("employeeID");

				let otherDeductions = $(`[name="otherDeductions"]`, this).val();
					otherDeductions = getNonFormattedAmount(otherDeductions);
				let netPay          = $(`.netPay`, this).text();
					netPay          = getNonFormattedAmount(netPay);

				let item = {
					payrollRegisterItemID,
					employeeID,
					otherDeductions,
					netPay,
				};

				data["items"].push(item);
			})
		} 

		return data;
	}
	// ----- END GET PAYROLL REGISTER DATA -----


	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Payroll Register";
		let swalText, swalImg;

		$("#modal_payroll_register").text().length > 0 && $("#modal_payroll_register").modal("hide");

		switch (method) {
			case "save":
				swalTitle = `SAVE ${title.toUpperCase()}`;
				swalText  = "Are you sure to save this document?";
				swalImg   = `${base_url}assets/modal/draft.svg`;
				break;
			case "submit":
				swalText  = "Are you sure to submit this document?";
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalImg   = `${base_url}assets/modal/add.svg`;
				break;
			case "approve":
				swalTitle = `APPROVE ${title.toUpperCase()}`;
				swalText  = "Are you sure to approve this document?";
				swalImg   = `${base_url}assets/modal/approve.svg`;
				break;
			case "deny":
				swalTitle = `DENY ${title.toUpperCase()}`;
				swalText  = "Are you sure to deny this document?";
				swalImg   = `${base_url}assets/modal/reject.svg`;
				break;
			case "cancelform":
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure to cancel this document?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
			case "drop":
				swalTitle = `DROP ${title.toUpperCase()}`;
				swalText  = "Are you sure to drop this document?";
				swalImg   = `${base_url}assets/modal/drop.svg`;
				break;
			default:
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure that you want to cancel this process?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
		}
		return Swal.fire({
			title:              swalTitle,
			html:               swalText,
			imageUrl:           swalImg,
			imageWidth:         200,
			imageHeight:        200,
			imageAlt:           "Custom image",
			showCancelButton:   true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor:  "#1a1a1a",
			cancelButtonText:   "No",
			confirmButtonText:  "Yes"
		})
	}

	function savePayrollRegister(data = null, method = "submit", notificationData = null, callback = null) {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$("#loader").show();

					setTimeout(() => {
						$.ajax({
							method:      "POST",
							url:         `payroll_register/savePayrollRegister`,
							data,
							async:       false,
							dataType:    "json",
							beforeSend: function() {
								$("#loader").show();
							},
							success: function(data) {
								let result = data.split("|");
				
								let isSuccess   = result[0];
								let message     = result[1];
								let insertedID  = result[2];
								let dateCreated = result[3];
	
								let swalTitle;
								if (method == "submit") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} submitted successfully!`;
								} else if (method == "save") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} saved successfully!`;
								} else if (method == "cancelform") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} cancelled successfully!`;
								} else if (method == "approve") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} approved successfully!`;
								} else if (method == "deny") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} denied successfully!`;
								} else if (method == "drop") {
									swalTitle = `${getFormCode("PRR", dateCreated, insertedID)} dropped successfully!`;
								}	
				
								if (isSuccess == "true") {
									setTimeout(() => {
										// ----- SAVE NOTIFICATION -----
										if (notificationData) {
											if (Object.keys(notificationData).includes("tableID")) {
												insertNotificationData(notificationData);
											} else {
												notificationData["tableID"] = insertedID;
												insertNotificationData(notificationData);
											}
										}
										// ----- END SAVE NOTIFICATION -----
	
										$("#loader").hide();
										closeModals();
										Swal.fire({
											icon:              "success",
											title:             swalTitle,
											showConfirmButton: false,
											timer:             2000,
										}).then(function() {
											callback && callback();
		
											if (method == "approve" || method == "deny") {
												$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
											}
										});
									}, 500);
								} else {
									setTimeout(() => {
										$("#loader").hide();
										Swal.fire({
											icon:              "danger",
											title:             message,
											showConfirmButton: false,
											timer:             2000,
										});
									}, 500);
								}
							},
							error: function() {
								setTimeout(() => {
									$("#loader").hide();
									showNotification("danger", "System error: Please contact the system administrator for assistance!");
								}, 500);
							}
						}).done(function() {
							setTimeout(() => {
								$("#loader").hide();
							}, 500);
						})
					}, 10);					
				} else {
					if (res.dismiss === "cancel" && method != "submit") {
						if (method != "deny") {
							if (method != "cancelform") {
								callback && callback();
							}
						} else {
							$("#modal_payroll_register").text().length > 0 && $("#modal_payroll_register").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_payroll_register").text().length > 0 && $("#modal_payroll_register").modal("show");
						}
					}
				}
			});

			
		}
		return false;
	}
	// --------------- END DATABASE RELATION ---------------


    // ----- BADGE STATUS -----
	function getStatusStyle(status = 1, hasPreparedBy = false) {
		switch (status) {
			case "1":
				return `<span class="badge badge-outline-info w-100">For Approval</span>`;
			case "2":
				return `<span class="badge badge-info w-100">Approved</span>`;
			case "3":
				return `<span class="badge badge-danger w-100">Denied</span>`;
			case "4":
				return `<span class="badge badge-primary w-100">Cancelled</span>`;
			case "5":
				return `<span class="badge badge-secondary w-100">Dropped</span>`;
			case "6":
				return `<span class="badge badge-outline-info w-100">For Proposal</span>`;
			case "7":
				return `<span class="badge badge-outline-info w-100">Reassessment</span>`;
			case "8":
				return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Assessed</span>`;
			case "9":
				return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Completed</span>`;
			case "0":
			default:
				let text = hasPreparedBy ? "Draft" : "Pending";
				return `<span class="badge badge-warning w-100">${text}</span>`;
		}
	}
	// ----- END BADGE STATUS -----


});
