$(document).ready(function() {

	let GLOBAL_ADJUSTMENT_ITEMS = [];

    const allowedUpdate = isUpdateAllowed(111);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("payroll adjustment");
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
				"hris_payroll_adjustment_tbl", 
				"revisePayrollAdjustmentID", 
				"revisePayrollAdjustmentID IS NOT NULL AND payrollAdjustmentStatus != 4");
			return revisedDocumentsID.map(item => item.revisePayrollAdjustmentID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // GLOBAL VARIABLE - REUSABLE 
	function dateToday() {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	function getNonFormattedAmount(amount = "₱0.00") {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

	function initCustomAmount(element = null, displayPrefix = false) {
		let elem = getElement(element, ".amount");
		$(elem).inputmask({
			alias: "currency",
			prefix: displayPrefix ? "₱ " : "",
			allowMinus: true,
			allowPlus:  false,
		});
	};

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
                        { targets: 4,  width: 300 },
                    ],
                };

				if (elementID == "#tablePending") {
					datatableOption = {
						proccessing:    false,
						serverSide:     false,
						scrollX:        true,
						sorting:        [],
						scrollCollapse: true,
						columnDefs: [
							{ targets: 0,  width: 100 },
							{ targets: 1,  width: 100 },
							{ targets: 2,  width: 100 },
							{ targets: 3,  width: 300 },
							{ targets: 4,  width: 150 },
							{ targets: 5,  width: 200 },	
						],
					};
				}

                if (elementID == "#tablePayrollAdjustment") {
					const isReadOnly = $("#tablePayroll").attr("isReadOnly") == "true";

                    datatableOption = {
                        proccessing:    false,
                        serverSide:     false,
                        scrollX:        true,
                        sorting:        [],
                        scrollCollapse: true,
                        paging:         false,
						searching:      false,
                        sorting:        false,
                        info:           false,
                        bSort:          false,
                        columnDefs: [
                            { targets: "thCheckbox", width: "50px"  },
                            { targets: "thEmployee", width: "250px" },
                            { targets: "thPay",      width: "100px" },
                            { targets: "thAdjust",   width: "200px" },	
                            { targets: "thAdjust2",  width: "200px" },	
                            { targets: -1,           width: "150px" },		
                        ],
                    }
                }

                var table = $(elementID)
                    .css({ "min-width": "100%" })
                    .removeAttr("width")
                    .DataTable(datatableOption);
            }
        }

        ["#tableForApproval", "#tableMyForms", "#tablePending", "#tablePayrollAdjustment"].map(elementID => {
            manipulateDataTables(elementID);
        })
	}
	// ----- END DATATABLES -----


    // ----- GET PAYROLL DATA -----
    function getAllPayrollAdjustmentData(payrollAdjustmentID = 0) {
        let result = null;
        if (payrollAdjustmentID) {
            $.ajax({
                method: "POST",
                url: "payroll_adjustment/getAllPayrollAdjustmentData",
                data: { payrollAdjustmentID },
                dataType: "json",
                async: false,
                success: function(data) {
                    result = data;
                },
                error: function() {
                    showNotification("danger", "There was an error fetching the data.");
                }
            })
        }
        return result;
    }
    // ----- END GET PAYROLL DATA -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getAllPayrollAdjustmentData(id);

			if (tableData && tableData?.header && tableData?.body) {
				let {
					employeeID,
					payrollAdjustmentStatus
				} = tableData?.header;

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (payrollAdjustmentStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (payrollAdjustmentStatus == 0 || payrollAdjustmentStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (payrollAdjustmentStatus == 0) {
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
			window.history.pushState("", "", `${base_url}hris/payroll_adjustment_report?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/payroll_adjustment_report?add=${view_id}`);
			} else {
				// window.history.pushState("", "", `${base_url}hris/payroll_adjustment_report?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/payroll_adjustment_report`);
		}
	}
	// ----- END VIEW DOCUMENT -----

    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(111)) {
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
			let html = ``;
			$("#headerContainer").append(html);
		} else {
			$("#headerContainer").find(".appendHeader").remove();
		}
	}
	// ----- END HEADER CONTENT -----


	// ----- PENDING CONTENT -----
	function getPendingContentData() {
		let result = [];
        $.ajax({
            method:   "POST",
            url:      "payroll_adjustment/getPendingContentData",
			data: true,
            dataType: "json",
            async:    false,
            success: function(data) {
                result = data;
            },
            error: function() {
                showNotification("danger", "There was an error fetching the data.");
            }
        })
        return result;
	}

	function pendingContent() {
		$("#tablePendingParent .loader").length == 0 && $("#tablePendingParent").html(preloader);

		let tbodyHTML = "";

		let pendingData = getPendingContentData();
		pendingData.map(pending => {
			let {
				payrollAdjustmentPendingID,
				employeeID,
				employeeCode,
				fullname,
				tableName,
				tablePrimaryID,
				tablePrimaryCode,
				adjustmentType,
				controller,
				adjustmentAmount,
				adjustmentRemarks,
				payrollAdjustmentID,
				assignTo = []
			} = pending;

			let assignToOptionHTML = "";
			if (assignTo && Array.isArray(assignTo) && assignTo.length > 0) {
				assignTo.map(assign => {
					let {
						payrollID,
						payrollAdjustmentID,
						payrollAdjustmentCode,
					} = assign;

					assignToOptionHTML += `
					<option value="${payrollAdjustmentID}"
						payrollID="${payrollID}">
						${payrollAdjustmentCode}
					</option>`;
				})
			}

			tbodyHTML += `
			<tr>
				<td>
					<div>${fullname}</div>
					<small>${employeeCode}</small>
				</td>
				<td>${tablePrimaryCode || "-"}</td>
				<td>${titleCase(adjustmentType)}</td>
				<td>${adjustmentRemarks}</td>
				<td class="text-right">${formatAmount(adjustmentAmount, true)}</td>
				<td>
					<div class="form-group mb-0">
						<div class="input-group">
							<select class="form-control select2" 
								name="assignTo"
								style="width: 80%;">
								<option selected disabled>Select assign to</option>
								${assignToOptionHTML}
							</select>
							<div class="input-group-append">
								<button class="btn btn-primary btn-sm px-3 btnAssignTo"
									employeeID="${employeeID}"
									payrollAdjustmentPendingID="${payrollAdjustmentPendingID}">
									<i class="fas fa-paper-plane"></i>
								</button>
							</div>
						</div>
						<div class="d-block invalid-feedback invalid-assignTo"></div>
					</div>
				</td>
			</tr>`
		})

		let html = `
		<table class="table table-bordered table-striped table-hover" 
			id="tablePending" 
			style="font-size: .8rem;">
			<thead>
				<tr>
					<th>Full Name</th>
					<th>Reference No.</th>
					<th>Adjustment Type</th>
					<th>Description</th>
					<th>Amount</th>
					<th>Assign To</th>
				</tr>
			</thead>
			<tbody>
				${tbodyHTML}
			</tbody>
		</table>`;

		setTimeout(() => {
			$("#tablePendingParent").html(html);
			initAll();
			initDataTables();
		}, 100);
	}
	// ----- END PENDING CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		uniqueData = [];
		$("#tableMyFormsParent").html(preloader);

		let payrollData = getTableData(
			`hris_payroll_adjustment_tbl AS hpat 
				LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)
				LEFT JOIN hris_employee_list_tbl AS helt ON hpat.employeeID = helt.employeeID`,
			`hpat.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hpat.createdAt AS dateCreated,
			payrollStartDate, payrollEndDate`,
			`hpat.payrollAdjustmentStatus = 2`,
			`FIELD(payrollAdjustmentStatus, 0, 1, 3, 2, 4, 5), COALESCE(hpat.submittedAt, hpat.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Reference No.</th>
                    <th>Prepared By</th>
                    <th>Payroll Period</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>`;

		payrollData.map((item) => {
			let {
				payrollAdjustmentID,
				payrollAdjustmentCode,
                revisePayrollAdjustmentID,
				payrollCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollReason,
                approversID,
                approversStatus,
                approversDate,
                payrollAdjustmentStatus,
                payrollAdjustmentRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollAdjustmentRemarks ? payrollAdjustmentRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollAdjustmentStatus == 2 || payrollAdjustmentStatus == 5 ? approversDate.split("|") : "-";
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
			<tr class="btnView" id="${encryptString(payrollAdjustmentID)}">
                <td>${payrollAdjustmentCode || "-"}</td>
                <td>${payrollCode || "-"}</td>
                <td>${fullname || "-"}</td>
                <td>${payrollDate}</td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
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


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);

		let payrollData = getTableData(
			`hris_payroll_adjustment_tbl AS hpat 
				LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)
				LEFT JOIN hris_employee_list_tbl AS helt ON hpat.employeeID = helt.employeeID`,
			`hpat.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hpat.createdAt AS dateCreated,
			payrollStartDate, payrollEndDate`,
			`hpat.employeeID != ${sessionID} AND payrollAdjustmentStatus != 0 AND payrollAdjustmentStatus != 4`,
			`FIELD(payrollAdjustmentStatus, 0, 1, 3, 2, 4, 5), COALESCE(hpat.submittedAt, hpat.createdAt)`
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
				payrollAdjustmentID,
				payrollAdjustmentCode,
                revisePayrollAdjustmentID,
				payrollCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollReason,
                approversID,
                approversStatus,
                approversDate,
                payrollAdjustmentStatus,
                payrollAdjustmentRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollAdjustmentRemarks ? payrollAdjustmentRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollAdjustmentStatus == 2 || payrollAdjustmentStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let payrollDate = "-";
            if (payrollStartDate && payrollEndDate) {
                payrollStartDate = moment(payrollStartDate).format("MMMM DD, YYYY");
                payrollEndDate   = moment(payrollEndDate).format("MMMM DD, YYYY");
                payrollDate      = `${payrollStartDate} - ${payrollEndDate}`;
            }

			let btnClass = payrollAdjustmentStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, payrollAdjustmentStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(payrollAdjustmentID)}">
					<td>${payrollAdjustmentCode || "-"}</td>
					<td>${payrollCode || "-"}</td>
					<td>${fullname || "-"}</td>
					<td>${payrollDate}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, payrollAdjustmentStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(payrollAdjustmentStatus)}
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


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				payrollAdjustmentID       = "",
				revisePayrollAdjustmentID = "",
				payrollAdjustmentStatus   = "",
				payrollID                 = "",
				employeeID                = "",
				approversID               = "",
				approversDate             = "",
				createdAt                 = new Date
			} = data && data?.header;

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (payrollAdjustmentStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
						code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (payrollAdjustmentStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
							status="${payrollAdjustmentStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (payrollAdjustmentStatus == 2) {
					// DROP
					/*
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
						code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
						status="${payrollAdjustmentStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;

					*/
				} else if (payrollAdjustmentStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(payrollAdjustmentID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
							status="${payrollAdjustmentStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (payrollAdjustmentStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`hris_payroll_adjustment_tbl`,
						`revisePayrollAdjustmentID`,
						`revisePayrollAdjustmentID = ${revisePayrollAdjustmentID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { revisePayrollAdjustmentID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`hris_payroll_adjustment_tbl`,
							`revisePayrollAdjustmentID`,
							`payrollAdjustmentStatus <> 3 AND payrollAdjustmentStatus <> 4 AND revisePayrollAdjustmentID = ${reviseID}`
						);
					} else {
						isAllowedForRevise = getTableDataLength(
							`hris_payroll_adjustment_tbl`,
							`revisePayrollAdjustmentID`,
							`payrollAdjustmentStatus <> 3 AND payrollAdjustmentStatus <> 4 AND payrollID = ${payrollID}`
						);
					}

					if (!isDocumentRevised(payrollAdjustmentID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"
							status="${payrollAdjustmentStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (payrollAdjustmentStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							payrollAdjustmentID="${encryptString(payrollAdjustmentID)}"
							code="${getFormCode("PRA", createdAt, payrollAdjustmentID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET EMPLOYEE LIST OPTIONS -----
	function getEmployeeListOptions(inEmployeeID = 0) {
		let html = "";

		GLOBAL_ADJUSTMENT_ITEMS.map(item => {
			let {
				employeeID,
				employeeCode,
				fullname,
				payrollAdjustmentItemID,
				holidayPay           = 0,
				overtimePay          = 0,
				nightDifferentialPay = 0,
				allowancePay         = 0,
				lateUndertimePay     = 0,
				lwopPay              = 0,
				sssPay               = 0,
				phicPay              = 0,
				hdmfPay              = 0,
				withHoldingPay       = 0,
				loanPay              = 0,
				otherPay             = 0,
			} = item;

			html += `
			<option value="${employeeID}"
				employeeCode="${employeeCode}"
				payrollAdjustmentItemID="${payrollAdjustmentItemID}"
				holidayPay           = "${holidayPay}",
				overtimePay          = "${overtimePay}",
				nightDifferentialPay = "${nightDifferentialPay}",
				allowancePay         = "${allowancePay || 0}",
				lateUndertimePay     = "${lateUndertimePay}",
				lwopPay              = "${lwopPay}",
				sssPay               = "${sssPay}",
				phicPay              = "${phicPay}",
				hdmfPay              = "${hdmfPay}",
				withHoldingPay       = "${withHoldingPay}",
				loanPay              = "${loanPay}",
				otherPay             = "${otherPay}",
				${inEmployeeID == employeeID ? "selected" : ""}>
				${fullname}
			</option>`;
		});

		return html;
	}
	// ----- END GET EMPLOYEE LIST OPTIONS -----


	// ----- GET PAYROLL ADJUSTMENT ROW -----
	function getPayrollAdjustmentRow(data = false, readOnly = false) {
		let html = "";

		let {
			employeeCode                = "",
			fullname                    = "",
			profile                     = "",
			employeeID                  = "",
			
			payrollAdjustmentItemID     = 0,
			payrollAdjustmentID         = 0,
			payrollItemID               = 0,
			applyAdjustment             = 0,
			basicAdjustment             = 0,
			holidayPay                  = 0,
			overtimePay                 = 0,
			nightDifferentialPay        = 0,
			allowancePay                = 0,
			lateUndertimePay            = 0,
			lwopPay                     = 0,
			sssPay                      = 0,
			phicPay                     = 0,
			hdmfPay                     = 0,
			withHoldingPay              = 0,
			loanPay                     = 0,
			otherPay                    = 0,
			holidayAdjustment           = 0,
			overtimeAdjustment          = 0,
			nightDifferentialAdjustment = 0,
			allowanceAdjustment         = 0,
			lateUndertimeAdjustment     = 0,
			lwopAdjustment              = 0,
			sssAdjustment               = 0,
			phicAdjustment              = 0,
			hdmfAdjustment              = 0,
			withHoldingAdjustment       = 0,
			loanAdjustment              = 0,
			otherAdjustment             = 0,
			basicRemarks                = "",
			holidayRemarks              = "",
			overtimeRemarks             = "",
			nightDifferentialRemarks    = "",
			allowanceRemarks            = "",
			lateUndertimeRemarks        = "",
			lwopRemarks                 = "",
			sssRemarks                  = "",
			phicRemarks                 = "",
			hdmfRemarks                 = "",
			withHoldingRemarks          = "",
			loanRemarks                 = "",
			otherRemarks                = "",
		} = data;

		if (!readOnly) {
			html += `
			<tr payrollItemID = "${payrollItemID}">
				<td style="z-index: 2;" class="text-center">
					<input type="checkbox" class="checkboxrow">
				</td>
				<td style="z-index: 2;">
					<div class="form-group mb-0">
						<select class="form-control validate select2"
							name="employeeID"
							required>
							<option selected disabled>Select employee</option>
							${getEmployeeListOptions(employeeID)}
						</select>
						<small class="employeeCode"></small>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="holidayPay"
							value="${formatAmount(holidayPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Pay" 
									data-original-title="Pay"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="holidayAdjustment"
								value="${formatAmount(holidayAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="holidayRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${holidayRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="overtimePay"
							value="${formatAmount(overtimePay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Pay" 
									data-original-title="Pay"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="overtimeAdjustment"
								value="${formatAmount(overtimeAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="overtimeRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${overtimeRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="nightDifferentialPay"
							value="${formatAmount(nightDifferentialPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Pay" 
									data-original-title="Pay"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="nightDifferentialAdjustment"
								value="${formatAmount(nightDifferentialAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="nightDifferentialRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${nightDifferentialRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="allowancePay"
							value="${formatAmount(allowancePay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Pay" 
									data-original-title="Pay"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="allowanceAdjustment"
								value="${formatAmount(allowanceAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="allowanceRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${allowanceRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="lateUndertimePay"
							value="${formatAmount(lateUndertimePay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="lateUndertimeAdjustment"
								value="${formatAmount(lateUndertimeAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="lateUndertimeRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${lateUndertimeRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="lwopPay"
							value="${formatAmount(lwopPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="lwopAdjustment"
								value="${formatAmount(lwopAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="lwopRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${lwopRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="sssPay"
							value="${formatAmount(sssPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="sssAdjustment"
								value="${formatAmount(sssAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="sssRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${sssRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="phicPay"
							value="${formatAmount(phicPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="phicAdjustment"
								value="${formatAmount(phicAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="phicRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${phicRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="hdmfPay"
							value="${formatAmount(hdmfPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="hdmfAdjustment"
								value="${formatAmount(hdmfAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="hdmfRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${hdmfRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="withHoldingPay"
							value="${formatAmount(withHoldingPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="withHoldingAdjustment"
								value="${formatAmount(withHoldingAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="withHoldingRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${withHoldingRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input type="text" 
							class="form-control text-right" 
							name="loanPay"
							value="${formatAmount(loanPay)}"
							disabled>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fal fa-info-circle" 
									style="color:#007bff;" 
									data-toggle="tooltip" 
									title="Deduction" 
									data-original-title="Deduction"></i>
							</span>
						</div>
					</div>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="loanAdjustment"
								value="${formatAmount(loanAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="loanRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${loanRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td style="z-index: 1;">
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" 
								class="form-control text-right amount"
								allow-minus="true"
								min="-99000"
								max="99000" 
								name="otherAdjustment"
								value="${formatAmount(otherAdjustment)}">
							<div class="input-group-append">
								<span class="input-group-text">
									<i class="fal fa-info-circle" 
										style="color:#007bff;" 
										data-toggle="tooltip" 
										title="Adjustment" 
										data-original-title="Adjustment"></i>
								</span>
							</div>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
					<div class="form-group mb-0">
						<textarea class="form-control validate"
							minlength="2"
							maxlength="725"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							name="otherRemarks"
							rows="3"
							placeholder="Notes..."
							style="resize: none;">${otherRemarks || ""}</textarea>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
			</tr>`;
		} else {
			if (data) {
				html += `
				<tr>
					<td style="z-index: 2;" class="text-center">
						<input type="checkbox" name="checkRow" employeeID="${employeeID}">
					</td>
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
					<td class="text-right">
						<div>
							${formatAmount(holidayPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Pay" 
								data-original-title="Pay"></i>
						</div>
						<div class="${holidayAdjustment != 0 ? holidayAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(holidayAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${holidayRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(overtimePay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Pay" 
								data-original-title="Pay"></i>
						</div>
						<div class="${overtimeAdjustment != 0 ? overtimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(overtimeAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${overtimeRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(nightDifferentialPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Pay" 
								data-original-title="Pay"></i>
						</div>
						<div class="${nightDifferentialAdjustment != 0 ? nightDifferentialAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(nightDifferentialAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${nightDifferentialRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(allowancePay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Pay" 
								data-original-title="Pay"></i>
						</div>
						<div class="${allowanceAdjustment != 0 ? allowanceAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(allowanceAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${allowanceRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(lateUndertimePay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${lateUndertimeAdjustment != 0 ? lateUndertimeAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(lateUndertimeAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${lateUndertimeRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(lwopPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${lwopAdjustment != 0 ? lwopAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(lwopAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${lwopRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(sssPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${sssAdjustment != 0 ? sssAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(sssAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${sssRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(phicPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${phicAdjustment != 0 ? phicAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(phicAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${phicRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(hdmfPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${hdmfAdjustment != 0 ? hdmfAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(hdmfAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${hdmfRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(withHoldingPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${withHoldingAdjustment != 0 ? withHoldingAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(withHoldingAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${withHoldingRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div>
							${formatAmount(loanPay, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Deduction" 
								data-original-title="Deduction"></i>
						</div>
						<div class="${loanAdjustment != 0 ? loanAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(loanAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${loanRemarks || "-"}</small>
					</td>
					<td class="text-right">
						<div class="${otherAdjustment != 0 ? otherAdjustment.indexOf('-') != -1 ? 'text-danger' : 'text-success' : ''}">
							${formatAmount(otherAdjustment, true)}
							<i class="fal fa-info-circle" 
								style="color:#007bff;" 
								data-toggle="tooltip" 
								title="Adjustment" 
								data-original-title="Adjustment"></i>
						</div>
						<small>${otherRemarks || "-"}</small>
					</td>
				</tr>`;
			}
		}

		return html;
	}
	// ----- END GET PAYROLL ADJUSTMENT ROW -----


	// ----- TABLE PAYROLL ADJUSTMENT -----
	function tablePayrollAdjustment(payrollAdjustmentID = 0, payrollAdjustmentCode = '', header = "", items = [], readOnly = false) {

		let theadHTML = "";
		let tbodyHTML = "";
		let buttonAddDeleteRowHTML = "";
		if (!readOnly) {
			theadHTML = `
			<tr class="theadlabel">
				<th class="thCheckbox text-center"
					style="z-index: 2;">
					<input type="checkbox" name="checkAll">
				</th>
				<th class="thEmployee" 
					style="z-index: 2;">
					Employee Name
				</th>
				<th class="thAdjust">Holiday</th>
				<th class="thAdjust">Overtime</th>
				<th class="thAdjust">Night Differential</th>
				<th class="thAdjust">Allowance</th>
				<th class="thAdjust">Late/Undertime</th>
				<th class="thAdjust">LWOP</th>
				<th class="thAdjust">SSS</th>
				<th class="thAdjust">PHIC</th>
				<th class="thAdjust">HDMF</th>
				<th class="thAdjust">Withholding Tax</th>
				<th class="thAdjust">Loan</th>
				<th class="thAdjust">Others</th>
			</tr>`;

			buttonAddDeleteRowHTML = `
			<button type="button" 
				class="btn btn-primary btnAddRow" 
				id="btnAddRow">
				<i class="fas fa-plus-circle"></i> Add Row
			</button>
			<button type="button" 
				class="btn btn-danger btnDeleteRow" 
				id="btnDeleteRow"  
				disabled>
				<i class="fas fa-minus-circle"></i> Delete Row/s
			</button>`;
		} else {
			theadHTML = `
			<tr class="theadlabel">
				<th class="thCheckbox text-center"
					style="z-index: 2;">
					<input type="checkbox" name="checkAll">
				</th>
				<th class="thEmployee" 
					style="z-index: 2;">
					Employee Name
				</th>
				<th class="thAdjust">Holiday</th>
				<th class="thAdjust">Overtime</th>
				<th class="thAdjust">Night Differential</th>
				<th class="thAdjust">Allowance</th>
				<th class="thAdjust">Late/Undertime</th>
				<th class="thAdjust">LWOP</th>
				<th class="thAdjust">SSS</th>
				<th class="thAdjust">PHIC</th>
				<th class="thAdjust">HDMF</th>
				<th class="thAdjust">Withholding Tax</th>
				<th class="thAdjust">Loan</th>
				<th class="thAdjust">Others</th>
			</tr>`;
		}
		
		if (items && Array.isArray(items) && items.length > 0) {
			if (items.filter(item => item.applyAdjustment == 1).length > 0) {
				items.map(item => {
					if (item.applyAdjustment == 1) {
						tbodyHTML += getPayrollAdjustmentRow(item, readOnly);
					}
				})
			} else {
				tbodyHTML = getPayrollAdjustmentRow(false, readOnly);
			}
		} else {
			if (!readOnly) {
				tbodyHTML = getPayrollAdjustmentRow();
			}
		}

		

		let html = `
		<div class="card">
			<div class="card-header bg-primary text-white text-center">
				<h6 class="font-weight-bold">${header}</h6>
			</div>
			<div class="card-body" style="font-size: .9rem;">
                <button class="btn btn-info mb-2"
                    id="btnPrint"
                    payrollAdjustmentID="${payrollAdjustmentID}"
                    payrollAdjustmentCode="${payrollAdjustmentCode}"
					disabled><i class="fas fa-print"></i> PRINT</button>
				<table class="table table-bordered table-striped table-nowrap position-relative" id="tablePayrollAdjustment" isReadOnly="${readOnly}">
					<thead>
						${theadHTML}
					</thead>
					<tbody>
						${tbodyHTML}
					</tbody>
				</table>

				<div class="text-left my-2">
					${buttonAddDeleteRowHTML}
				</div>
			</div>
		</div>`;
		
		return html;
	}
	// ----- END TABLE PAYROLL ADJUSTMENT -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		GLOBAL_ADJUSTMENT_ITEMS = [];

		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			payrollAdjustmentID       = "",
			payrollAdjustmentCode     = "",
			revisePayrollAdjustmentID = "",
			employeeID                = "",
			payrollCode               = "",
            payrollStartDate          = "",
			payrollEndDate            = "",
			payrollAdjustmentReason   = "",
			payrollAdjustmentRemarks  = "",
			approversID               = "",
			approversStatus           = "",
			approversDate             = "",
			payrollAdjustmentStatus   = 0,
            timekeepingID             = "",
            httApproversID            = "",
            httApproversDate          = "",
            httCreatedAt              = "",
			submittedAt               = false,
			createdAt                 = false,
		} = data && data?.header;

		let {
			header,
			items,
		} = data && data?.body;

		GLOBAL_ADJUSTMENT_ITEMS = items;

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("payrollAdjustmentID", encryptString(payrollAdjustmentID));
		$("#btnBack").attr("status", payrollAdjustmentStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);
		$("#btnBack").attr("code", payrollAdjustmentCode);

		let disabled = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let startDate   = moment(payrollStartDate).format("MMMM DD, YYYY");
		let endDate     = moment(payrollEndDate).format("MMMM DD, YYYY");
        let payrollDate = `${startDate} - ${endDate}`;

		let reviseDocumentNo    = isRevise ? payrollAdjustmentID : revisePayrollAdjustmentID;
		let documentHeaderClass = isRevise || revisePayrollAdjustmentID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePayrollAdjustmentID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePayrollAdjustmentID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PRA", createdAt, reviseDocumentNo)}
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
							${payrollAdjustmentID && !isRevise ? payrollAdjustmentCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${payrollAdjustmentStatus && !isRevise ? getStatusStyle(payrollAdjustmentStatus) : "---"}
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
								${getDateApproved(payrollAdjustmentStatus, approversID, approversDate)}
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
							${payrollAdjustmentRemarks && !isRevise ? payrollAdjustmentRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_payroll_adjustment">

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
                    <label>Reference No.</label>
                    <input type="text" class="form-control" disabled value="${payrollCode}">
                </div>
			</div>
			<div class="col-md-8 col-sm-12">
				<div class="form-group">
                    <label>Payroll Period</label>
                    <input type="text" class="form-control" disabled value="${payrollDate}">
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
                        minlength="2"
                        maxlength="325"
                        id="payrollAdjustmentReason"
                        name="payrollAdjustmentReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${payrollAdjustmentReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-payrollAdjustmentReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-3">
                <div class="w-100" id="tablePayrollAdjustmentParent">
					${tablePayrollAdjustment(payrollAdjustmentID, payrollAdjustmentCode, header, items, readOnly)}
				</div>
            </div>

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			updateTableAdjustment();
			initAll();
			updateEmployeeOptions();
			initCustomAmount();

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
                <div role="tabpanel" class="tab-pane" id="pendingTab" aria-expanded="false">
                    <div class="w-100" id="tablePendingParent">
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


	// ----- GET PAYROLL ADJUSTMENT DATA -----
	function getPayrollAdjustmentData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["payrollAdjustmentID"] = id;

			if (status != "2") {
				data["payrollStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"]              = sessionID;
			data["payrollAdjustmentReason"] = $("[name=payrollAdjustmentReason]").val()?.trim();

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["payrollAdjustmentID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]   = approversID;
					data["payrollAdjustmentStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["payrollAdjustmentStatus"]   = 2;
				}
			}

			$("#tablePayrollAdjustment tbody tr").each(function() {
				const payrollItemID = $(this).attr("payrollItemID");

				let payrollAdjustmentID     = id;
				let employeeID              = $(`[name="employeeID"]`, this).val();
				let payrollAdjustmentItemID = $(`[name="employeeID"] option:selected`, this).attr("payrollAdjustmentItemID");

				if (employeeID && payrollAdjustmentItemID) {
					let holidayAdjustment           = $(`[name="holidayAdjustment"]`, this).val();
						holidayAdjustment           = getNonFormattedAmount(holidayAdjustment);
					let overtimeAdjustment          = $(`[name="overtimeAdjustment"]`, this).val();
						overtimeAdjustment          = getNonFormattedAmount(overtimeAdjustment);
					let nightDifferentialAdjustment = $(`[name="nightDifferentialAdjustment"]`, this).val();
						nightDifferentialAdjustment = getNonFormattedAmount(nightDifferentialAdjustment);
					let allowanceAdjustment         = $(`[name="allowanceAdjustment"]`, this).val();
						allowanceAdjustment         = getNonFormattedAmount(allowanceAdjustment);
					let lateUndertimeAdjustment     = $(`[name="lateUndertimeAdjustment"]`, this).val();
						lateUndertimeAdjustment     = getNonFormattedAmount(lateUndertimeAdjustment);
					let lwopAdjustment              = $(`[name="lwopAdjustment"]`, this).val();
						lwopAdjustment              = getNonFormattedAmount(lwopAdjustment);
					let sssAdjustment               = $(`[name="sssAdjustment"]`, this).val();
						sssAdjustment               = getNonFormattedAmount(sssAdjustment);
					let phicAdjustment              = $(`[name="phicAdjustment"]`, this).val();
						phicAdjustment              = getNonFormattedAmount(phicAdjustment);
					let hdmfAdjustment              = $(`[name="hdmfAdjustment"]`, this).val();
						hdmfAdjustment              = getNonFormattedAmount(hdmfAdjustment);
					let withHoldingAdjustment       = $(`[name="withHoldingAdjustment"]`, this).val();
						withHoldingAdjustment       = getNonFormattedAmount(withHoldingAdjustment);
					let loanAdjustment              = $(`[name="loanAdjustment"]`, this).val();
						loanAdjustment              = getNonFormattedAmount(loanAdjustment);
					let otherAdjustment             = $(`[name="otherAdjustment"]`, this).val();
						otherAdjustment             = getNonFormattedAmount(otherAdjustment);
	
					let holidayRemarks           = $(`[name="holidayRemarks"]`, this).val().trim();
					let overtimeRemarks          = $(`[name="overtimeRemarks"]`, this).val().trim();
					let nightDifferentialRemarks = $(`[name="nightDifferentialRemarks"]`, this).val().trim();
					let allowanceRemarks         = $(`[name="allowanceRemarks"]`, this).val().trim();
					let lateUndertimeRemarks     = $(`[name="lateUndertimeRemarks"]`, this).val().trim();
					let lwopRemarks              = $(`[name="lwopRemarks"]`, this).val().trim();
					let sssRemarks               = $(`[name="sssRemarks"]`, this).val().trim();
					let phicRemarks              = $(`[name="phicRemarks"]`, this).val().trim();
					let hdmfRemarks              = $(`[name="hdmfRemarks"]`, this).val().trim();
					let withHoldingRemarks       = $(`[name="withHoldingRemarks"]`, this).val().trim();
					let loanRemarks              = $(`[name="loanRemarks"]`, this).val().trim();
					let otherRemarks             = $(`[name="otherRemarks"]`, this).val().trim();
	
					let item = {
						payrollAdjustmentItemID,
						payrollItemID,
						payrollAdjustmentID,
						employeeID,
						holidayAdjustment,
						overtimeAdjustment,
						nightDifferentialAdjustment,
						allowanceAdjustment,
						lateUndertimeAdjustment,
						lwopAdjustment,
						sssAdjustment,
						phicAdjustment,
						hdmfAdjustment,
						withHoldingAdjustment,
						loanAdjustment,
						otherAdjustment,
						holidayRemarks,
						overtimeRemarks,
						nightDifferentialRemarks,
						allowanceRemarks,
						lateUndertimeRemarks,
						lwopRemarks,
						sssRemarks,
						phicRemarks,
						hdmfRemarks,
						withHoldingRemarks,
						loanRemarks,
						otherRemarks,
					};
	
					data["items"].push(item);
				}

			})
		} 

		return data;
	}
	// ----- END GET PAYROLL ADJUSTMENT DATA -----


	// ----- UPDATE TABLE ADJUSTMENT -----
	function updateTableAdjustment() {
		$(`#tablePayrollAdjustment tbody tr`).each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", i);

			$(`input, textarea, select`, this).each(function(j) {
				const name = $(this).attr("name") || "";
				$(this).attr("id", `${name}${i}`);

				if ($(this).is("select")) {
					if ($(this).hasClass("select2-hidden-accessible")) {
						$(this).select2("destroy");
					}
					$(this).select2({ theme: "bootstrap" });
				}

				$parent = $(this).parent();
				$parent.find(".invalid-feedback").attr("id", `invalid-${name}${i}`);
			})
		})
	}
	// ----- END UPDATE TABLE ADJUSTMENT -----


	// ----- UPDATE EMPLOYEE OPTIONS -----
	function updateEmployeeOptions() {
		let employeeIDArr = [], elementID = [];

		$("[name=employeeID]").each(function() {
			const employeeID = $(this).val();
			employeeIDArr.push(employeeID);
			elementID.push(`#${this.id}`);
			if (employeeID && employeeID != null) {
				$(this).attr("update", "true");
				$(this).trigger("change");
			}
		});

		elementID.map((element, index) => {
			let html = `<option selected disabled>Select employee</option>`;
			
			GLOBAL_ADJUSTMENT_ITEMS
				.filter(item => !employeeIDArr.includes(item.employeeID) || item.employeeID == employeeIDArr[index])
				.map(item => {
					let {
						employeeID,
						employeeCode,
						fullname,
						payrollAdjustmentItemID,
						holidayPay           = 0,
						overtimePay          = 0,
						nightDifferentialPay = 0,
						allowancePay         = 0,
						lateUndertimePay     = 0,
						lwopPay              = 0,
						sssPay               = 0,
						phicPay              = 0,
						hdmfPay              = 0,
						withHoldingPay       = 0,
						loanPay              = 0,
						otherPay             = 0,
					} = item;

					html += `
					<option value="${employeeID}"
						employeeCode="${employeeCode}"
						payrollAdjustmentItemID = "${payrollAdjustmentItemID}"
						holidayPay           = "${holidayPay}"
						overtimePay          = "${overtimePay}"
						nightDifferentialPay = "${nightDifferentialPay}"
						allowancePay         = "${allowancePay || 0}"
						lateUndertimePay     = "${lateUndertimePay}"
						lwopPay              = "${lwopPay}"
						sssPay               = "${sssPay}"
						phicPay              = "${phicPay}"
						hdmfPay              = "${hdmfPay}"
						withHoldingPay       = "${withHoldingPay}"
						loanPay              = "${loanPay}"
						otherPay             = "${otherPay}"
						${employeeIDArr[index] == employeeID ? "selected" : ""}>
						${fullname}
					</option>`;
				})
			$(element).html(html);
		});
	}
	// ----- END UPDATE EMPLOYEE OPTIONS -----


	// ----- UPDATE PRINT BUTTON -----
    function updatePrintButton() {
        let hasChecked = $(`[name="checkRow"]:checked`).length > 0;
        if (hasChecked) {
            $("#btnPrint").attr("disabled", false);
        } else {
            $("#btnPrint").attr("disabled", true);
        }
    }
    // ----- END UPDATE PRINT BUTTON -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
		if (tab == "#pendingTab") {
			pendingContent();
		}
	});
	// ----- END NAV LINK -----


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
		const id         = decryptString($(this).attr("payrollAdjustmentID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PRA", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPayrollAdjustmentData(action, "save", "0", id);
				data["payrollAdjustmentStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["revisePayrollID"] = id;
					delete data["payrollAdjustmentID"];
				} else {
					data["payrollAdjustmentID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
				savePayrollAdjustment(data, "save", null, pageContent);
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
			const data   = getPayrollAdjustmentData(action, "save", "0", id);
			data["payrollAdjustmentStatus"] = 0;
			savePayrollAdjustment(data, "save", null, pageContent);
		}
	});
	// ----- END BUTTON BACK -----


	// ----- BUTTON CANCEL -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("payrollAdjustmentID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPayrollAdjustmentData(action, "cancelform", "4", id, status);

		savePayrollAdjustment(data, "cancelform", null, pageContent);
	});
	// ----- END BUTTON CANCEL -----


	// ----- BUTTON REVISE -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("payrollAdjustmentID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END BUTTON REVISE -----


	// ----- CHECK ROW -----
    $(document).on("change", `[type="checkbox"]`, function() {
        let isChecked = this.checked;
        if (this.name == "checkAll") {
            $(`[name="checkRow"]`).prop("checked", isChecked);
        }

        updatePrintButton();
    })
    // ----- END CHECK ROW -----


	// ----- BUTTON PRINT -----
    $(document).on("click", "#btnPrint", function() {
        let payrollAdjustmentID   = $(this).attr("payrollAdjustmentID");
        let payrollAdjustmentCode = $(this).attr("payrollAdjustmentCode");
        let employeeIDArr = [];
        $(`[name="checkRow"]:checked`).each(function() {
            employeeIDArr.push($(this).attr("employeeID"));
        });
        let employeeIDStr = employeeIDArr.join(", ");
        
        $.ajax({
            method: "POST",
			url: `payroll_adjustment_report/printReport`,
			data: {
				payrollAdjustmentID,
				payrollAdjustmentCode,
                employeeIDStr,
			},
			success: function (data) {
				let left = ($(window).width() / 2) - (900 / 2),
					top  = ($(window).height() / 2) - (600 / 2),
					mywindow = window.open("", "PRINT", "width=900, height=600, top=" + top + ", left=" + left);

				mywindow.document.write(data);

				mywindow.document.close();
				mywindow.focus();
			}
		});
    })
    // ----- END BUTTON PRINT -----
	
})


