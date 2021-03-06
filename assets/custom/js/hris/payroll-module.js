$(document).ready(function() {

	const MODULE_ID     = 110;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing    = false;


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(MODULE_ID);
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
				"hris_payroll_tbl", 
				"revisePayrollID", 
				"revisePayrollID IS NOT NULL AND payrollStatus != 4");
			return revisedDocumentsID.map(item => item.revisePayrollID).includes(id);
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

	function decimalToHours(decimal = 0.00) {
        if (decimal) {
            const num     = decimal * 60;
            const hours   = Math.floor(num / 60);  
            const minutes = Math.floor(num % 60);
            if (isFinite(hours) && isFinite(minutes)) {
                let hoursDisplay   = hours.toString().length > 1 ? hours : `0${hours}`;
                let minutesDisplay = minutes.toString().length > 1 ? minutes : `0${minutes}`;
                let display = `${hoursDisplay}:${minutesDisplay}`;
                return display;  
            }
        }
        return "00:00";
    }

	const taxTable = getTableData(`hris_tax_table_tbl`);
	function getWithHoldingTax(grossPay = 0, nonTaxable = 0) {
		let percentage     = 0;
		let additionalTax  = 0;
		let compenstation  = 0;
		let withHoldingTax = 0;

		if (grossPay > 0 && taxTable.length > 0) {
			taxTable.filter(tx => (grossPay >= tx.taxMinimumRange && grossPay <= tx.taxMaximumRange))
				.map(tax => {
					const { taxMinimumRange, taxPercentage, taxAdditionalTax } = tax;

					additionalTax = (+taxAdditionalTax);
					percentage    = (+taxPercentage) / 100;
					compenstation = (+taxMinimumRange);

					let taxable = grossPay - nonTaxable;
					let excess  = taxable - compenstation;

					let totalExcess = excess * percentage;
					withHoldingTax = totalExcess + additionalTax;
				})
		}
		return { percentage, additionalTax, compenstation, withHoldingTax };
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

                if (elementID == "#tablePayroll") {
					const isReadOnly = $("#tablePayroll").attr("isReadOnly") == "true";

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
                            leftColumns:  isReadOnly ? 1 : 2,
                            rightColumns: 1,
                        }
                    }
                }

                var table = $(elementID)
                    .css({ "min-width": "100%" })
                    .removeAttr("width")
                    .DataTable(datatableOption);
            }
        }

        ["#tableForViewing", "#tableForApproval", "#tableMyForms", "#tablePayroll"].map(elementID => {
            manipulateDataTables(elementID);
        })
	}
	// ----- END DATATABLES -----


    // ----- GET PAYROLL DATA -----
    function getAllPayrollData(payrollID = 0) {
        let result = null;
        if (payrollID) {
            $.ajax({
                method: "POST",
                url: "payroll_module/getAllPayrollData",
                data: { payrollID },
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
			const tableData = getAllPayrollData(id);

			if (tableData && tableData?.header && tableData?.body) {
				let {
					employeeID,
					payrollStatus
				} = tableData?.header;

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (payrollStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (payrollStatus == 0 || payrollStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (payrollStatus == 0) {
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
			window.history.pushState("", "", `${base_url}hris/payroll_module?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/payroll_module?add=${view_id}`);
			} else {
				// window.history.pushState("", "", `${base_url}hris/payroll_module?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/payroll_module`);
		}
	}
	// ----- END VIEW DOCUMENT -----

    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(MODULE_ID)) {
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
			if (isImModuleApprover("hris_payroll_tbl", "approversID") || allowedShow) {
				let count = getCountForApproval("hris_payroll_tbl", "payrollStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = `
				<div class="bh_divider appendHeader"></div>
				<div class="row clearfix appendHeader">
					<div class="col-12">
						<ul class="nav nav-tabs">
							${allowedShow ? `<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forViewingTab" redirect="forViewingTab">For Viewing</a></li>` : ""}  
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


	// ----- FOR VIEWING CONTENT -----
	function forViewingContent() {
		$("#tableForViewingParent .loader").length == 0 && $("#tableForViewingParent").html(preloader);
		let payrollData = getTableData(
			`hris_payroll_tbl AS hpt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"hpt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hpt.createdAt AS dateCreated",
			`hpt.employeeID <> ${sessionID} AND payrollStatus <> 0 AND payrollStatus <> 4 AND payrollStatus = 2`,
			`FIELD(payrollStatus, 0, 1, 3, 2, 4, 5), payrollStartDate DESC, COALESCE(hpt.submittedAt, hpt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForViewing">
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

		payrollData.map((item) => {
			let {
				payrollID,
				payrollCode,
                revisePayrollID,
				timekeepingCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollReason,
                approversID,
                approversStatus,
                approversDate,
                payrollStatus,
                payrollRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRemarks ? payrollRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollStatus == 2 || payrollStatus == 5 ? approversDate.split("|") : "-";
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
			<tr class="btnView" id="${encryptString(payrollID)}" isForViewing="true">
				<td>${payrollCode}</td>
				<td>${timekeepingCode || "-"}</td>
				<td>${fullname || "-"}</td>
				<td>${payrollDate}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, payrollStatus, true))}
				</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">
					${getStatusStyle(payrollStatus, employeeID != 0)}
				</td>
				<td>${remarks}</td>
			</tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForViewingParent").html(html);
			initDataTables();
		}, 300);
	}
	// ----- END FOR VIEWING CONTENT -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent .loader").length == 0 && $("#tableForApprovalParent").html(preloader);
		let payrollData = getTableData(
			`hris_payroll_tbl AS hpt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"hpt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hpt.createdAt AS dateCreated",
			`hpt.employeeID <> ${sessionID} AND payrollStatus <> 0 AND payrollStatus <> 4`,
			`FIELD(payrollStatus, 0, 1, 3, 2, 4, 5), payrollStartDate DESC, COALESCE(hpt.submittedAt, hpt.createdAt)`
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

		payrollData.map((item) => {
			let {
				payrollID,
				payrollCode,
                revisePayrollID,
				timekeepingCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollReason,
                approversID,
                approversStatus,
                approversDate,
                payrollStatus,
                payrollRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRemarks ? payrollRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollStatus == 2 || payrollStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let payrollDate = "-";
            if (payrollStartDate && payrollEndDate) {
                payrollStartDate = moment(payrollStartDate).format("MMMM DD, YYYY");
                payrollEndDate   = moment(payrollEndDate).format("MMMM DD, YYYY");
                payrollDate      = `${payrollStartDate} - ${payrollEndDate}`;
            }

			if (isImCurrentApprover(approversID, approversDate, payrollStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView" id="${encryptString(payrollID)}">
					<td>${payrollCode}</td>
					<td>${timekeepingCode || "-"}</td>
					<td>${fullname || "-"}</td>
					<td>${payrollDate}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, payrollStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(payrollStatus, employeeID != 0)}
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
		let payrollData = getTableData(
			`hris_payroll_tbl AS hpt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"hpt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hpt.createdAt AS dateCreated",
			`hpt.employeeID = 0 OR hpt.employeeID IS NULL OR hpt.employeeID = ${sessionID}`,
			`FIELD(payrollStatus, 0, 1, 3, 2, 4, 5), payrollStartDate DESC, COALESCE(hpt.submittedAt, hpt.createdAt)`
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

		payrollData.map((item) => {
			let {
				payrollID,
				payrollCode,
                revisePayrollID,
				timekeepingCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollReason,
                approversID,
                approversStatus,
                approversDate,
                payrollStatus,
                payrollRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRemarks ? payrollRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollStatus == 2 || payrollStatus == 5 ? approversDate.split("|") : "-";
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
			<tr class="btnView" id="${encryptString(payrollID )}">
                <td>${payrollCode}</td>
				<td>${timekeepingCode || "-"}</td>
                <td>${fullname || "-"}</td>
                <td>${payrollDate}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, payrollStatus, true))}
                </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(payrollStatus, employeeID != 0)}
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
				payrollID       = "",
				revisePayrollID = "",
				payrollStatus   = "",
				employeeID      = "",
				approversID     = "",
				approversDate   = "",
				createdAt       = new Date
			} = data && data?.header;

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null || employeeID === sessionID) {
				if (payrollStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						payrollID="${encryptString(payrollID)}"
						code="${getFormCode("PRL", createdAt, payrollID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2" 
							id="btnBack"
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"
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
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"
							status="${payrollStatus}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (payrollStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"
							status="${payrollStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (payrollStatus == 2) {
					// DROP
					/* 
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						payrollID="${encryptString(payrollID)}"
						code="${getFormCode("PRL", createdAt, payrollID)}"
						status="${payrollStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
					*/
				} else if (payrollStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(payrollID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"
							status="${payrollStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (payrollStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`hris_payroll_tbl`,
						`revisePayrollID`,
						`revisePayrollID = ${revisePayrollID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { revisePayrollID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`hris_payroll_tbl`,
							`revisePayrollID`,
							`payrollStatus <> 3 AND payrollStatus <> 4 AND revisePayrollID = ${reviseID}`
						);
					}

					if (!isDocumentRevised(payrollID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"
							status="${payrollStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (payrollStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							payrollID="${encryptString(payrollID)}"
							code="${getFormCode("PRL", createdAt, payrollID)}"><i class="fas fa-ban"></i> 
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


    // ----- GET PAYROLL ITEM TABLE -----
    function getPayrollItems(payrollID = 0) {
        let result = null;
        $.ajax({
            method: "POST",
            url: "payroll_module/getPayrollItems",
            data: { payrollID },
            dataType: "json",
            async: false,
            success: function(data) {
                result = data;
            },
            error: function() {
                showNotification("danger", "There was an error fetching the data.<br>Please try again..");
            }
        })
        return result;
    }

    function payrollTable(payrollID = 0, payrollStatus = 0, adjustmentFlag = 0, adjustmentStatus = 0, readOnly = false) {
        let payrollItemsHTML = "", header = "";

        if (payrollID) {
            let payrollItems = getPayrollItems(payrollID);
            if (payrollItems && payrollItems.header && payrollItems.items.length > 0) {
                header = payrollItems?.header ?? ""; 
                let items = payrollItems?.items ?? [];
                if (items && items.length > 0) {
                    items.map(item => {

                        let {
							employeeCode,
                            fullname,
                            profile,
							payrollItemID,
							payrollID,
							timekeepingID,
							employeeID,
							hourlyRate,
							holdSalary,
							deductMandates,
							deductLoan,
							startDate,
							endDate,
							workingDays,
							holidays,
							lwopDays,
							paidLeaveDays,
							restDays,
							scheduleHours,
							basicHours,
							overtimeHours,
							nightDifferentialHours,
							lateUndertimeHours,
							lwopHours,
							basicSalary,
							basicPay,
							holidayPay,
							holidayAdjustment = 0,
							overtimePay,
							overtimeAdjustment = 0,
							nightDifferentialPay,
							nightDifferentialAdjustment = 0,
							allowance,
							allowanceAdjustment = 0,
							leavePay,
							lateUndertimeDeduction,
							lateUndertimeAdjustment = 0,
							lwopDeduction,
							lwopAdjustment = 0,
							prevGrossPay = 0,
							grossPay,
							sssBasis,
							sssDeduction,
							sssAdjustment = 0,
							sssEmployer,
							sssTotal,
							phicBasis,
							phicDeduction,
							phicAdjustment = 0,
							phicEmployer,
							phicTotal,
							hdmfBasis,
							hdmfAdjustment = 0,
							hdmfDeduction,
							hdmfEmployer,
							hdmfTotal,
							withHoldingBasis,
							withHoldingDeduction,
							withHoldingAdjustment = 0,
							totalDeduction,
							loanBasis,
							loanAdjustment = 0,
							loanDeduction,
							ammortizationID,
							otherAdjustment = 0,
							netPay,
							salaryReleaseAmount = 0,
                        } = item;

						if (!readOnly) {
							payrollItemsHTML += `
							<tr payrollItemID       = "${payrollItemID}"
								sssAdjustment       = "${sssAdjustment || 0}"
								phicAdjustment      = "${phicAdjustment || 0}"
								hdmfAdjustment      = "${hdmfAdjustment || 0}"
								loanAdjustment      = "${loanAdjustment || 0}"
								sssDeduction        = "${sssDeduction || 0}"
								phicDeduction       = "${phicDeduction || 0}"
								hdmfDeduction       = "${hdmfDeduction || 0}"
								allowance           = "${allowance || 0}"
								allowanceAdjustment = "${allowanceAdjustment || 0}"
								prevGrossPay        = "${prevGrossPay || 0}"
								grossPay            = "${grossPay || 0}"
								otherAdjustment     = "${otherAdjustment || 0}"
								employeeID          = "${employeeID}">
								<td style="z-index: 2;">
									<div class="d-flex justify-content-start align-items-center">
										<img class="rounded-circle" 
											src="${base_url}assets/upload-files/profile-images/${profile}"
											alt="${fullname}"
											style="width: 50px; height: 50px;">
										<div class="ml-3 align-self-center">
											<div>${fullname}</div>
											<small>${employeeCode}</small>
										</div>
									</div>
								</td>
								<td class="text-center"
									style="z-index: 2;">
									<input type="checkbox" 
										name="holdSalary" 
										${holdSalary == 1 ? "checked" : ""}>
								</td>
								<td class="text-right">${formatAmount(basicSalary, true)}</td>
								<td class="text-right">${formatAmount(holidayPay, true)}</td>
								<td class="text-right
									${holidayAdjustment && holidayAdjustment != 0 ? holidayAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(holidayAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(overtimePay, true)}</td>
								<td class="text-right
									${overtimeAdjustment && overtimeAdjustment != 0 ? overtimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(overtimeAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(nightDifferentialPay, true)}</td>
								<td class="text-right
									${nightDifferentialAdjustment && nightDifferentialAdjustment != 0 ? nightDifferentialAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(nightDifferentialAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(leavePay, true)}</td>
								<td class="text-right">${formatAmount(allowance, true)}</td>
								<td class="text-right
									${allowanceAdjustment && allowanceAdjustment != 0 ? allowanceAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(allowanceAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(lateUndertimeDeduction, true)}</td>
								<td class="text-right
									${lateUndertimeAdjustment && lateUndertimeAdjustment != 0 ? lateUndertimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(lateUndertimeAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(lwopDeduction, true)}</td>
								<td class="text-right
									${lwopAdjustment && lwopAdjustment != 0 ? lwopAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(lwopAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(grossPay, true)}</td>
								<td style="z-index: 1;">
                                    ${formatAmount(sssDeduction, true)}
								</td>
								<td class="text-right sssAdjustment
									${sssAdjustment && sssAdjustment != 0 ? sssAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(sssAdjustment, true)}
								</td>
								<td style="z-index: 1;">
                                    ${formatAmount(phicDeduction, true)}
								</td>
								<td class="text-right phicAdjustment
									${phicAdjustment && phicAdjustment != 0 ? phicAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(phicAdjustment, true)}
								</td>
								<td style="z-index: 1;">
                                    ${formatAmount(hdmfDeduction, true)}
								</td>
								<td class="text-right hdmfAdjustment
									${hdmfAdjustment && hdmfAdjustment != 0 ? hdmfAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(hdmfAdjustment, true)}
								</td>
								<td style="z-index: 1;">
                                    ${formatAmount(withHoldingDeduction, true)}
								</td>
								<td class="text-right withHoldingAdjustment
									${withHoldingAdjustment && withHoldingAdjustment != 0 ? withHoldingAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(withHoldingAdjustment, true)}
								</td>
								<td style="z-index: 1;">
									<div class="input-group">
										<div class="input-group-prepend">
											<span class="input-group-text">
												<input type="checkbox" 
													name="deductLoan" 
													loanBasis="${loanBasis}"
													${loanDeduction > 0 ? "checked" : ""}
													${grossPay > 0 ? "" : "disabled"}>
											</span>
										</div>
										<input type="text" 
											class="form-control text-right" 
											name="loanDeduction"
											value="${formatAmount(loanDeduction, true)}"
											disabled>
									</div>
								</td>
								<td class="text-right">
									${formatAmount(loanAdjustment, true)}
								</td>
								<td class="text-right
									${otherAdjustment && otherAdjustment != 0 ? otherAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(otherAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(salaryReleaseAmount, true)}</td>
								<td class="text-right netPay">${formatAmount(netPay, true)}</td>
							</tr>`;
						} else {
							let onHold = holdSalary == 1 ? `<span class="badge badge-warning">ON HOLD</span>` : "";

							payrollItemsHTML += `
							<tr payrollItemID = "${payrollItemID}"
								loanBasis     = "${loanBasis}"
								grossPay      = "${grossPay}">
								<td style="z-index: 2;">
									<div class="d-flex justify-content-start align-items-center">
										<img class="rounded-circle" 
											src="${base_url}assets/upload-files/profile-images/${profile}"
											alt="${fullname}"
											style="width: 50px; height: 50px;">
										<div class="ml-3 align-self-center">
											<div>${fullname}</div>
											<small>${employeeCode}</small>
											${onHold}
										</div>
									</div>
								</td>
								<td class="text-right">${formatAmount(basicSalary, true)}</td>
								<td class="text-right">${formatAmount(holidayPay, true)}</td>
								<td class="text-right
									${holidayAdjustment && holidayAdjustment != 0 ? holidayAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(holidayAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(overtimePay, true)}</td>
								<td class="text-right
									${overtimeAdjustment && overtimeAdjustment != 0 ? overtimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(overtimeAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(nightDifferentialPay, true)}</td>
								<td class="text-right
									${nightDifferentialAdjustment && nightDifferentialAdjustment != 0 ? nightDifferentialAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(nightDifferentialAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(leavePay, true)}</td>
								<td class="text-right">${formatAmount(allowance, true)}</td>
								<td class="text-right
									${allowanceAdjustment && allowanceAdjustment != 0 ? allowanceAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(allowanceAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(lateUndertimeDeduction, true)}</td>
								<td class="text-right
									${lateUndertimeAdjustment && lateUndertimeAdjustment != 0 ? lateUndertimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(lateUndertimeAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(lwopDeduction, true)}</td>
								<td class="text-right
									${lwopAdjustment && lwopAdjustment != 0 ? lwopAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(lwopAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(grossPay, true)}</td>
								<td class="text-right" style="z-index: 1;">
									${formatAmount(sssDeduction, true)}
								</td>
								<td class="text-right
									${sssAdjustment && sssAdjustment != 0 ? sssAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(sssAdjustment, true)}
								</td>
								<td class="text-right" style="z-index: 1;">
									${formatAmount(phicDeduction, true)}
								</td>
								<td class="text-right
									${phicAdjustment && phicAdjustment != 0 ? phicAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(phicAdjustment, true)}
								</td>
								<td class="text-right" style="z-index: 1;">
									${formatAmount(hdmfDeduction, true)}
								</td>
								<td class="text-right
									${hdmfAdjustment && hdmfAdjustment != 0 ? hdmfAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(hdmfAdjustment, true)}
								</td>
								<td class="text-right" style="z-index: 1;">
									${formatAmount(withHoldingDeduction, true)}
								</td>
								<td class="text-right
									${withHoldingAdjustment && withHoldingAdjustment != 0 ? withHoldingAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(withHoldingAdjustment, true)}
								</td>
								<td class="text-right" style="z-index: 1;">
									${formatAmount(loanDeduction, true)}
								</td>
								<td class="text-right
									${loanAdjustment && loanAdjustment != 0 ? loanAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(loanAdjustment, true)}
								</td>
								<td class="text-right
									${otherAdjustment && otherAdjustment != 0 ? otherAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
									${formatAmount(otherAdjustment, true)}
								</td>
								<td class="text-right">${formatAmount(salaryReleaseAmount, true)}</td>
								<td class="text-right netPay">${formatAmount(netPay, true)}</td>
							</tr>`;
						}
                    })
                }
            }
        }

		let adjustmentDisplay = "";
		if (adjustmentFlag != 2 && payrollStatus == 0) {
			adjustmentDisplay = adjustmentFlag == 0  ? `
			<div class="text-right">
				<button class="btn btn-danger" id="btnPayrollAdjustment"
					payrollID="${payrollID}">
					<i class="fas fa-plus"></i> Create Payroll Adjustment
				</button>
			</div>` : `
			<div class="d-flex">
				<h5 class="font-weight-bold text-warning">NOTE:</h5>
				<span class="text-dark ml-2">The payroll adjustment must still undergo an approval before the payroll process to continue. Current Status: ${getStatusStyle(adjustmentStatus, true, false)}</span>
			</div>`;
		}

		let createAdjustmentHTML = payrollStatus != 2 ? `
		<div class="card-footer" id="createAdjustmentDisplay">
			${adjustmentDisplay}
		</div>` : "";

		let theadHTML = "";
		if (!readOnly) {
			theadHTML = `
			<tr class="theadlabel">
				<th style="z-index: 2;">Employee Name</th>
				<th class="thPay2"
					style="z-index: 2;">
					<input type="checkbox" name="checkAllHoldSalary">
					<span class="ml-1">Hold Salary</span>
				</th>
				<th class="thPay">Basic Pay</th>
				<th class="thPay">Holiday Pay</th>
				<th class="thAdjust">Holiday Adjustment</th>
				<th class="thPay">Overtime</th>
				<th class="thAdjust2">Overtime Adjustment</th>
				<th class="thAdjust3">Night Differrential</th>
				<th class="thAdjust4">Night Differrential Adjustment</th>
				<th class="thPay">Leave Pay</th>
				<th class="thPay">Allowance</th>
				<th class="thAdjust3">Allowance Adjustment</th>
				<th class="thPay">Late/Undertime</th>
				<th class="thAdjust4">Late/Undertime Adjustment</th>
				<th class="thPay">LWOP</th>
				<th class="thAdjust">Leave Adjustment</th>
				<th class="thPay">GROSS PAY</th>
				<th class="thMandate">SSS</th>
				<th class="thAdjust">SSS Adjustment</th>
				<th class="thMandate">PHIC</th>
				<th class="thAdjust">PHIC Adjustment</th>
				<th class="thMandate">HDMF</th>
				<th class="thAdjust">HDMF Adjustment</th>
				<th class="thAdjust">Withholding Tax</th>
				<th class="thAdjust3">Withholding Tax Adjustment</th>
				<th class="thMandate">Loan</th>
				<th class="thAdjust">Loan Adjustment</th>
				<th class="thAdjust">Other Adjustment</th>
                <th class="thAdjust">Salary Release</th>
				<th>NET PAY</th>
			</tr>`;
		} else {
			theadHTML = `
			<tr class="theadlabel">
				<th style="z-index: 2;">Employee Name</th>
				<th class="thPay">Basic Pay</th>
				<th class="thPay">Holiday Pay</th>
				<th class="thAdjust">Holiday Adjustment</th>
				<th class="thPay">Overtime</th>
				<th class="thAdjust">Overtime Adjustment</th>
				<th class="thAdjust2">Night Differrential</th>
				<th class="thAdjust4">Night Differrential Adjustment</th>
				<th class="thPay">Leave Pay</th>
				<th class="thPay">Allowance</th>
				<th class="thAdjust2">Allowance Adjustment</th>
				<th class="thPay">Late/Undertime</th>
				<th class="thAdjust4">Late/Undertime Adjustment</th>
				<th class="thPay">LWOP</th>
				<th class="thAdjust">Leave Adjustment</th>
				<th class="thPay">GROSS PAY</th>
				<th class="thMandate">
					<div>SSS</div>
				</th>
				<th class="thAdjust">SSS Adjustment</th>
				<th class="thMandate">
					<div>PHIC</div>
				</th>
				<th class="thAdjust">PHIC Adjustment</th>
				<th class="thMandate">
					<div>HDMF</div>
				</th>
				<th class="thAdjust">HDMF Adjustment</th>
				<th class="thAdjust">
					<div>Withholding Tax</div>
				</th>
				<th class="thAdjust3">Withholding Tax Adjustment</th>
				<th class="thMandate">
					<div>Loan</div>
				</th>
				<th class="thAdjust">Loan Adjustment</th>
				<th class="thAdjust">Other Adjustment</th>
				<th class="thAdjust">Salary Release</th>
				<th>NET PAY</th>
			</tr>`;
		}

        let html = `
		<div class="card">
			<div class="card-header bg-primary text-white text-center">
				<h6 class="font-weight-bold">${header}</h6>
			</div>
			<div class="card-body" style="font-size: .9rem;">
				<table class="table table-bordered table-striped table-nowrap position-relative" id="tablePayroll" isReadOnly="${readOnly}">
					<thead>
						${theadHTML}
					</thead>
					<tbody>
						${payrollItemsHTML}
					</tbody>
				</table>
			</div>
			${createAdjustmentHTML}
		</div>`;

        return html;
    }
    // ----- END GET PAYROLL ITEM TABLE -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			payrollID         = "",
			payrollCode       = "",
			revisePayrollID   = "",
			revisePayrollCode = "",
			employeeID        = "",
            payrollStartDate  = "",
			payrollEndDate    = "",
			payrollReason     = "",
			payrollRemarks    = "",
			approversID       = "",
			approversStatus   = "",
			approversDate     = "",
			payrollStatus     = 0,
            timekeepingID     = "",
            httApproversID    = "",
            httApproversDate  = "",
            httCreatedAt      = "",
			submittedAt       = false,
			createdAt         = false,
		} = data && data?.header;

		let adjustment = data?.adjustment;
		let adjustmentFlag   = adjustment?.flag || 0;
		let adjustmentStatus = adjustment?.status || 0;

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("payrollID", encryptString(payrollID));
		$("#btnBack").attr("status", payrollStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);
		$("#btnBack").attr("code", payrollCode);

		let disabled = readOnly ? "disabled" : "";
		let button = adjustment != 1 ? formButtons(data, isRevise, isFromCancelledDocument) : "";

        let timekeepingCode = getFormCode("TKM", httCreatedAt, timekeepingID);
        let timekeepingApproved = getDateApproved(2, httApproversID, httApproversDate);

		let startDate   = moment(payrollStartDate).format("MMMM DD, YYYY");
		let endDate     = moment(payrollEndDate).format("MMMM DD, YYYY");
        let payrollDate = `${startDate} - ${endDate}`;

		let reviseDocumentNo    = isRevise ? payrollID : revisePayrollID;
		let documentHeaderClass = isRevise || revisePayrollID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePayrollID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePayrollID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PRL", createdAt, reviseDocumentNo)}
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
							${payrollID && !isRevise ? payrollCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${payrollStatus && !isRevise ? getStatusStyle(payrollStatus, employeeID != 0) : "---"}
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
								${getDateApproved(payrollStatus, approversID, approversDate)}
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
							${payrollRemarks && !isRevise ? payrollRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_payroll">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
                    <input type="text" class="form-control" disabled value="${timekeepingCode}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>
						Date Approved
						<i class="fal fa-info-circle" 
							style="color:#007bff;" 
							data-toggle="tooltip" 
							title="Timekeeping Date Approved" 
							data-original-title="Timekeeping Date Approved"></i>
                    </label>
                    <input type="text" class="form-control" disabled value="${timekeepingApproved}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
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
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                        minlength="1"
                        maxlength="325"
                        id="payrollReason"
                        name="payrollReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${payrollReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-payrollReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-3">
                <div class="w-100" id="tablePayrollParent">
					${payrollTable(payrollID, payrollStatus, adjustmentFlag, adjustmentStatus, readOnly)}
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
                <div role="tabpanel" class="tab-pane" id="forViewingTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForViewingParent">
                    </div>
                </div>
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


    // ----- VIEW/EDIT DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		isForViewing = $(this).attr("isForViewing") == "true";
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
	});
	// ----- END VIEW/EDIT DOCUMENT -----


	// ----- CREATE PAYROLL ADJUSTMENT -----
	$(document).on("click", "#btnPayrollAdjustment", function() {
		const payrollID = $(this).attr("payrollID");

		Swal.fire({
			title:              "CREATE PAYROLL ADJUSTMENT",
			html:               `Are you sure you want to create payroll adjustment?`,
			imageUrl:           `${base_url}assets/modal/add.svg`,
			imageWidth:         200,
			imageHeight:        200,
			imageAlt:           "Custom image",
			showCancelButton:   true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor:  "#1a1a1a",
			cancelButtonText:   "No",
			confirmButtonText:  "Yes"
		}).then(function(res) {
			if (res.isConfirmed) {
				$("#loader").show();

				setTimeout(() => {
					$.ajax({
						method:   "POST",
						url:      "payroll_module/createPayrollAdjustment",
						data:     { payrollID },
						async:    false,
						dataType: "json",
						success: function(data) {
							let result = data.split("|");

							let isSuccess   = result[0];
							let message     = result[1];
							let insertedID  = result[2];
							let dateCreated = result[3];

							let code = getFormCode("PRA", dateCreated, insertedID);

							if (isSuccess == "true") {
								$("#loader").hide();
								Swal.fire({
									icon:              "success",
									title:             `${code} successfully created!`,
									showConfirmButton: false,
									timer:             2000,
								}).then(() => {
									viewDocument(payrollID);
									window.open(`${base_url}hris/payroll_adjustment?view_id=${encryptString(insertedID)}`, '_blank');
								})
							} else {
								$("#loader").hide();
								Swal.fire({
									icon:              "danger",
									title:             `There's an error creating payroll adjustment.`,
									showConfirmButton: false,
									timer:             2000,
								})
							}
						},
						error: function() {
							$("#loader").hide();
							Swal.fire({
								icon:              "danger",
								title:             `There's an error creating payroll adjustment.`,
								showConfirmButton: false,
								timer:             2000,
							})
						}
					})
				}, 100);
			}
		})
	})
	// ----- END CREATE PAYROLL ADJUSTMENT -----


	// ----- GET NON-TAXABLE -----
	function getNonTaxableAmount($parent = '') {
		let nonTaxable = 0;
		if ($parent) {
			let sssDeduction    = $parent.attr("sssDeduction");
				sssDeduction    = getNonFormattedAmount(sssDeduction);
			let phicDeduction   = $parent.attr("phicDeduction");
				phicDeduction   = getNonFormattedAmount(phicDeduction);
			let hdmfDeduction   = $parent.attr("hdmfDeduction");
				hdmfDeduction   = getNonFormattedAmount(hdmfDeduction);
			let sssAdjustment   = $parent.attr("sssAdjustment");
				sssAdjustment   = getNonFormattedAmount(sssAdjustment);
			let phicAdjustment  = $parent.attr("phicAdjustment");
				phicAdjustment  = getNonFormattedAmount(phicAdjustment);
			let hdmfAdjustment  = $parent.attr("hdmfAdjustment");
				hdmfAdjustment  = getNonFormattedAmount(hdmfAdjustment);

			nonTaxable = sssDeduction + phicDeduction + hdmfDeduction + sssAdjustment + phicAdjustment + hdmfAdjustment;
		}
		return nonTaxable;
	}
	// ----- END GET NON-TAXABLE -----


	// ----- UPDATE WITH-HOLDING TAX -----
	function updateWithHoldingTax($parent = '') {
		if ($parent) {
			let prevGrossPay = +$parent.attr("prevGrossPay") ?? 0;
			let grossPay     = +$parent.attr("grossPay") ?? 0;
			let totalGrossPay = prevGrossPay + grossPay;
			let withHoldingTax = 0;
	
			const isChecked = $parent.find(`[name="deductWithHolding"]`).prop("checked");
			if (isChecked) {
				let nonTaxable = getNonTaxableAmount($parent);
				let tax = getWithHoldingTax(totalGrossPay, nonTaxable);
				withHoldingTax = tax.withHoldingTax;
			}
	
			withHoldingTax = formatAmount(withHoldingTax, true);
			$parent.find(`[name="withHoldingDeduction"]`).val(withHoldingTax);
		}
	}
	// ----- END UPDATE WITH-HOLDING TAX -----


	// ----- GET ALL DEDUCTION -----
	function getAllDeduction($parent = '') {
		let deduction = 0;
		if ($parent) {
			let nonTaxable     = getNonTaxableAmount($parent);
			let withHolding    = $parent.attr("withHoldingDeduction");
				withHolding    = getNonFormattedAmount(withHolding);
			let loanDeduction  = $parent.find(`[name="loanDeduction"]`).val();
				loanDeduction  = getNonFormattedAmount(loanDeduction);
			let loanAdjustment = $parent.attr("loanAdjustment");
				loanAdjustment = getNonFormattedAmount(loanAdjustment);
			deduction = nonTaxable + withHolding + loanDeduction + loanAdjustment;
		}
		return deduction;
	}
	// ----- END GET ALL DEDUCTION -----


	// ----- UPDATE NET PAY -----
	function updateNetPay($parent = '') {
		if ($parent) {
			let grossPay            = +$parent.attr("grossPay") ?? 0;
			let allowance           = +$parent.attr("allowance") ?? 0;
			let allowanceAdjustment = +$parent.attr("allowanceAdjustment") ?? 0;
			let otherAdjustment     = +$parent.attr("otherAdjustment") ?? 0;
			let totalAllowance      = allowance + allowanceAdjustment;
			let allDeduction = getAllDeduction($parent);
			let netPay = ((grossPay - allDeduction) + otherAdjustment) + totalAllowance;
				netPay = formatAmount(netPay, true);
			$parent.find(`td.netPay`).text(netPay);
		}
	}
	// ----- END UPDATE NET PAY -----


	// ----- GET PAYROLL DATA -----
	function getPayrollData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

		// ----- RESET SEARCH IN DATATABLE -----
		$(`[aria-controls="tablePayroll"]`).val("");
		$('#tablePayroll').DataTable().search("").draw();
		// ----- RESET SEARCH IN DATATABLE -----

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["payrollID"] = id;

			if (status != "2") {
				data["payrollStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"]       = sessionID;
			data["payrollReason"]    = $("[name=payrollReason]").val()?.trim();
			data["payrollStartDate"] = $(`[name="payrollPeriod"]`).attr("start");
			data["payrollEndDate"]   = $(`[name="payrollPeriod"]`).attr("end");

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["payrollID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]   = approversID;
					data["payrollStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["payrollStatus"]   = 2;
				}
			}

			$("#tablePayroll tbody tr").each(function() {
				const payrollItemID = $(this).attr("payrollItemID");
				const employeeID    = $(this).attr("employeeID");

				const holdSalary  = $(`[name="holdSalary"]`, this).prop("checked") ? 1 : 0;
				let loanDeduction = $(`[name="loanDeduction"]`, this).val();
					loanDeduction = getNonFormattedAmount(loanDeduction);
				let netPay        = $(`.netPay`, this).text();
					netPay        = getNonFormattedAmount(netPay);

				let item = {
					payrollItemID,
					employeeID,
					holdSalary,
					loanDeduction,
					netPay,
				};

				data["items"].push(item);
			})
		} 

		return data;
	}
	// ----- END GET PAYROLL DATA -----


	// ----- CHECK DEDUCT LOAN -----
	$(document).on("change", `[name="deductLoan"]`, function() {
		$parent = $(this).closest(`tr`);

		const checked = $(this).prop("checked");

		let deduction = $(this).attr("loanBasis") ?? 0;
			deduction = checked ? deduction : 0;
			deduction = formatAmount(deduction, true);

		$parent.find(`[name="loanDeduction"]`).val(deduction);
	})
	// ----- END CHECK DEDUCT LOAN -----


	// ----- CHECK HOLD SALARY -----
	$(document).on("change", `[name="holdSalary"]`, function() {
		const holdSalaryLength  = $(`[name="holdSalary"]`).length;
		const holdSalaryChecked = $(`[name="holdSalary"]:checked`).length;

		let isChecked = holdSalaryLength == holdSalaryChecked;
		$(`[name="checkAllHoldSalary"]`).prop("checked", isChecked);
	})
	// ----- END CHECK HOLD SALARY -----


	// ----- CHECK ALL -----
	$(document).on("change", `[name="checkAllHoldSalary"]`, function() { // HOLD SALARY
		const isChecked = $(this).prop("checked");
		$(`[name="holdSalary"]:not([disabled])`).prop("checked", isChecked).trigger("change");
	})

	$(document).on("change", `[name="checkAllDeductLoan"]`, function() { // LOAN
		const isChecked = $(this).prop("checked");
		$(`[name="deductLoan"]:not([disabled])`).prop("checked", isChecked).trigger("change");
	})
	// ----- END CHECK ALL -----


	// ----- CHECKBOX UPDATE NET PAY ----- 
	$(document).on("change", `[type="checkbox"]`, function() {
		$parent = $(this).closest(`tr`);
		updateNetPay($parent);
	})
	// ----- END CHECKBOX UPDATE NET PAY ----- 


	// ----- BUTTON BACK -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("payrollID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PRL", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPayrollData(action, "save", "0", id);
				data["payrollStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["revisePayrollID"] = id;
					delete data["payrollID"];
				} else {
					data["payrollID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
	
				savePayroll(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);

				setTimeout(() => {
					pageContent();
		
					if (employeeID != sessionID) {
						$("[redirect=forApprovalTab]").length && (isForViewing ? $("[redirect=forViewingTab]").trigger("click") : $("[redirect=forApprovalTab]").trigger("click"));
					}
				}, 10);
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPayrollData(action, "save", "0", id);
			data["payrollStatus"] = 0;

			savePayroll(data, "save", null, pageContent);
		}
	});
	// ----- END BUTTON BACK -----


	// ----- BUTTON CANCEL -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("payrollID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPayrollData(action, "cancelform", "4", id, status);

		savePayroll(data, "cancelform", null, pageContent);
	});
	// ----- END BUTTON CANCEL -----


	// ----- BUTTON REVISE -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("payrollID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END BUTTON REVISE -----


	// ----- BUTTON SAVE/CANCEL -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("payrollID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PRL", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPayrollData(action, "save", "0", id);
		data["payrollStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data["revisePayrollID"] = id;
				delete data["payrollID"];
			} else {
				data["payrollID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}

		savePayroll(data, "save", null, pageContent);
	});
	// ----- END BUTTON SAVE/CANCEL -----


	// ----- BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("payrollID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_payroll");
		
		if (validate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getPayrollData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data["revisePayrollID"] = id;
					delete data["payrollID"];
				}
			}

			let approversID   = data["approversID"], 
				approversDate = data["approversDate"];

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                110,
					notificationTitle:       "Payroll Process",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePayroll(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END BUTTON SUBMIT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("payrollID"));
		const feedback = $(this).attr("code") || getFormCode("PRL", dateToday(), id);
		let tableData  = getTableData("hris_payroll_tbl", "", "payrollID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPayrollData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Payroll Process",
					notificationDescription: `${feedback}: Your request has been approved. You may now proceed to the next step of the process (Payroll Register)`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Payroll Process",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["payrollStatus"] = status;

			savePayroll(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("payrollID"));
		const feedback = $(this).attr("code") || getFormCode("PRL", dateToday(), id);

		$("#modal_payroll_module_content").html(preloader);
		$("#modal_payroll_module .page-title").text("DENY PAYROLL");
		$("#modal_payroll_module").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="payrollRemarks"
					name="payrollRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-payrollRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			payrollID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_payroll_module_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("payrollID"));
		const feedback = $(this).attr("code") || getFormCode("PRL", dateToday(), id);

		const validate = validateForm("modal_payroll_module");
		if (validate) {
			let tableData = getTableData("hris_payroll_tbl", "", "payrollID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"]               = "update";
				data["method"]               = "deny";
				data["payrollID"]            = id;
				data["approversStatus"]      = updateApproveStatus(approversStatus, 3);
				data["approversDate"]        = updateApproveDate(approversDate);
				data["payrollRemarks"]       = $("[name=payrollRemarks]").val()?.trim();
				data["updatedBy"]            = sessionID;

				let notificationData = {
					moduleID:                MODULE_ID,
					tableID: 				 id,
					notificationTitle:       "Payroll",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePayroll(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forViewingTab") {
			forViewingContent();
		}
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END NAV LINK -----


	// ----- BADGE STATUS -----
	function getStatusStyle(status = 1, hasPreparedBy = false, width = true) {
		switch (status) {
			case "1":
				return `<span class="badge badge-outline-info ${width ? 'w-100' : ''}">For Approval</span>`;
			case "2":
				return `<span class="badge badge-info ${width ? 'w-100' : ''}">Approved</span>`;
			case "3":
				return `<span class="badge badge-danger ${width ? 'w-100' : ''}">Denied</span>`;
			case "4":
				return `<span class="badge badge-primary ${width ? 'w-100' : ''}">Cancelled</span>`;
			case "5":
				return `<span class="badge badge-secondary ${width ? 'w-100' : ''}">Dropped</span>`;
			case "6":
				return `<span class="badge badge-outline-info ${width ? 'w-100' : ''}">For Proposal</span>`;
			case "7":
				return `<span class="badge badge-outline-info ${width ? 'w-100' : ''}">Reassessment</span>`;
			case "8":
				return `<span class="badge badge-outline-success ${width ? 'w-100' : ''}" style="width: 100% !important">Assessed</span>`;
			case "9":
				return `<span class="badge badge-outline-success ${width ? 'w-100' : ''}" style="width: 100% !important">Completed</span>`;
			case "0":
			default:
				let text = hasPreparedBy ? "Draft" : "Pending";
				return `<span class="badge badge-warning ${width ? 'w-100' : ''}">${text}</span>`;
		}
	}
	// ----- END BADGE STATUS -----


	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Payroll Process";
		let swalText, swalImg;

		$("#modal_payroll_module").text().length > 0 && $("#modal_payroll_module").modal("hide");

		switch (method) {
			case "save":
				swalTitle = `SAVE ${title.toUpperCase()}`;
				swalText  = "Do you want to save your changes for this payroll process?";
				swalImg   = `${base_url}assets/modal/draft.svg`;
				break;
			case "submit":
				swalText  = "Are you sure to submit this payroll process?";
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalImg   = `${base_url}assets/modal/add.svg`;
				break;
			case "approve":
				swalTitle = `APPROVE ${title.toUpperCase()}`;
				swalText  = "Are you sure to approve this payroll process?";
				swalImg   = `${base_url}assets/modal/approve.svg`;
				break;
			case "deny":
				swalTitle = `DENY ${title.toUpperCase()}`;
				swalText  = "Are you sure to deny this payroll process?";
				swalImg   = `${base_url}assets/modal/reject.svg`;
				break;
			case "cancelform":
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure to cancel this payroll process?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
			case "drop":
				swalTitle = `DROP ${title.toUpperCase()}`;
				swalText  = "Are you sure to drop this payroll process?";
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

	function savePayroll(data = null, method = "submit", notificationData = null, callback = null) {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$("#loader").show();

					setTimeout(() => {
						$.ajax({
							method:      "POST",
							url:         `payroll_module/savePayroll`,
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
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} submitted successfully!`;
								} else if (method == "save") {
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} saved successfully!`;
								} else if (method == "cancelform") {
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} cancelled successfully!`;
								} else if (method == "approve") {
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} approved successfully!`;
								} else if (method == "deny") {
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} denied successfully!`;
								} else if (method == "drop") {
									swalTitle = `${getFormCode("PRL", dateCreated, insertedID)} dropped successfully!`;
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
							$("#modal_payroll_module").text().length > 0 && $("#modal_payroll_module").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_payroll_module").text().length > 0 && $("#modal_payroll_module").modal("show");
						}
					}
				}
			});

			
		}
		return false;
	}
	// --------------- END DATABASE RELATION ---------------

})


