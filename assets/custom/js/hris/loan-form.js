$(document).ready(function () {
	const MODULE_ID = 59;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing = false;


	// REUSABLE GET TABLE DATA
	const getCutOff = getTableData(`gen_system_setting_tbl`,`firstCutOffPayOut,secondCutOffPayOut`); 
	// REUSABLE GET TABLE DATA

	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(MODULE_ID);
	// ----- END MODULE APPROVER -----


	// ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
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
				"hris_loan_form_tbl", 
				"reviseLoanFormID", 
				"reviseLoanFormID IS NOT NULL AND loanFormStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLoanFormID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_loan_form_tbl", "", "loanFormID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					loanFormStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (loanFormStatus == 0 || loanFormStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (loanFormStatus == 0) {
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
			let id = decryptString(view_id);
				id && isFinite(id) && loadData(id, isRevise, isFromCancelledDocument);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				pageContent(true);
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/loan_form?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/loan_form?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/loan_form?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/loan_form`);
		}
	}
	// ----- END VIEW DOCUMENT -----

	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


	// ----- DATATABLES -----
	function initDataTables() {
		["#tableMyForms", "#tableForApproval", "#tableForViewing"].map(element => {
            if ($.fn.DataTable.isDataTable(element)) {
                $(element).DataTable().destroy();
            }

			var table = $(element)
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 100 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 200 },
					{ targets: 4, width: 80  },
					{ targets: 5, width: 200 },
				],
			});
		});
		
		if ($.fn.DataTable.isDataTable("#tableAmmortization")) {
			$("#tableAmmortization").DataTable().destroy();
		}

		var table = $("#tableAmmortization")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 10 },
					{ targets: 1, width: 100 },
					{ targets: 2, width: 100 },
					{ targets: 3, width: 50 },
					
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_loan_form_tbl", "approversID") || allowedShow) {
				let count = getCountForApproval("hris_loan_form_tbl", "loanFormStatus");
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


	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(MODULE_ID)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
			<button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- FOR VIEWING CONTENT -----
	function forViewingContent() {
		$("#tableForViewingParent").html(preloader);

		let loanData = getTableData(
			"hris_loan_form_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_loan_form_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND loanFormStatus != 0 AND loanFormStatus != 4 AND loanFormStatus = 2`,
			`FIELD(loanFormStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_loan_form_tbl.submittedAt, hris_loan_form_tbl.createdAt)`
		);

		let html = `
		<table class="table  table-bordered table-striped table-hover" id="tableForViewing">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
				</tr>
			</thead>
			<tbody>`;

		loanData.map((schedule) => {
			let {
				fullname,
				loanFormID,
				approversID,
				approversDate,
				loanFormStatus,
				loanFormRemarks,
				submittedAt,
				createdAt,
			} = schedule;

			let remarks       = loanFormRemarks ? loanFormRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = loanFormStatus == 2 || loanFormStatus == 5  ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let button = loanFormStatus != 0 ? `btnView` : `btnEdit`

			html += `
			<tr class="${button}" id="${encryptString(loanFormID)}" isForViewing="true">
				<td>${getFormCode("LNF", dateCreated, loanFormID)}</td>
				<td>${fullname}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, loanFormStatus, true))}
				</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">
					${getStatusStyle(loanFormStatus)}
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
		$("#tableForApprovalParent").html(preloader);

		let loanData = getTableData(
			"hris_loan_form_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_loan_form_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND loanFormStatus != 0 AND loanFormStatus != 4`,
			`FIELD(loanFormStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_loan_form_tbl.submittedAt, hris_loan_form_tbl.createdAt)`
		);

		let html = `
		<table class="table  table-bordered table-striped table-hover" id="tableForApproval">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
				</tr>
			</thead>
			<tbody>`;

		loanData.map((schedule) => {
			let {
				fullname,
				loanFormID,
				approversID,
				approversDate,
				loanFormStatus,
				loanFormRemarks,
				submittedAt,
				createdAt,
			} = schedule;

			let remarks       = loanFormRemarks ? loanFormRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = loanFormStatus == 2 || loanFormStatus == 5  ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let button = loanFormStatus != 0 ? `btnView` : `btnEdit`

			if (isImCurrentApprover(approversID, approversDate, loanFormStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${button}" id="${encryptString(loanFormID)}">
					<td>${getFormCode("LNF", dateCreated, loanFormID)}</td>
					<td>${fullname}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, loanFormStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(loanFormStatus)}
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
		$("#tableMyFormsParent").html(preloader);
		let loanData = getTableData(
			"hris_loan_form_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_loan_form_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_loan_form_tbl.createdAt AS dateCreated",
			`hris_loan_form_tbl.employeeID = ${sessionID}`,
			`FIELD(loanFormStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_loan_form_tbl.submittedAt, hris_loan_form_tbl.createdAt)`
		);

		let html = `
		<table class="table table-bordered table-striped table-hover" id="tableMyForms">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
				</tr>
			</thead>
			<tbody>`;

		loanData.map((item) => {
			let {
				fullname,
				loanFormID,
				loanFormDate,
				approversID,
				approversDate,
				loanFormStatus,
				loanFormRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = loanFormRemarks ? loanFormRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = loanFormStatus == 2 || loanFormStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:           loanFormID,
				loanFormDate: loanFormDate,
			};
			(loanFormStatus == 1 || loanFormStatus == 2) && uniqueData.push(unique);

			let btnClass = loanFormStatus != 0 ? "btnView" : "btnEdit";

			let fullnameBtn =
				loanFormStatus == 2
					? ` <button class="ammortization_link text-danger btn btn-primary-outline p-0" id="${encryptString(loanFormID)}"><b>${fullname}</b></button>`
					: fullname;
			html += `
			<tr class="${btnClass}" id="${encryptString(loanFormID)}">
				<td>${getFormCode("LNF", dateCreated, loanFormID)}</td>
				<td>${fullnameBtn}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, loanFormStatus, true))}
				</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">
					${getStatusStyle(loanFormStatus)}
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
			return html;
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----


	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				loanFormID     = "",
				reviseLoanFormID     = "",
				loanFormStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
				createdAt            = new Date
			} = data && data[0];

			let isOngoing = approversDate
				? approversDate.split("|").length > 0
					? true
					: false
				: false;
			if (employeeID === sessionID) {
				if (loanFormStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						loanFormID="${encryptString(loanFormID)}"
						code="${getFormCode("LNF", createdAt, loanFormID)}" revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							loanFormID="${encryptString(loanFormID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}" revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (loanFormStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}  else if (loanFormStatus == 2) {
					
						// DROP
						button = `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnDrop" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"
							status="${loanFormStatus}"><i class="fas fa-ban"></i> 
							Drop
						</button>`;
				} else if (loanFormStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(loanFormID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"
							status="${loanFormStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (loanFormStatus == 4) {
					
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(loanFormID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"
							status="${loanFormStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
			}
			} else {
				if (loanFormStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							loanFormID="${encryptString(loanFormID)}"
							code="${getFormCode("LNF", createdAt, loanFormID)}"><i class="fas fa-ban"></i> 
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

	// function optionLoanFormTermPayment//

	const getTermPayment = getTableData(`gen_system_setting_tbl`,
	` *,
	IF(firstCutOffPayOut, '1', '0') AS firstCutOff,
	IF(secondCutOffPayOut, '1', '0') AS secondCutOff,
	IF(thirdCutOffPayOut, '1', '0') AS thirdCutOff,
	IF(fourthCutOffPayOut, '1', '0') AS fourthCutOff`);


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			loanFormID                  = "",
			reviseLoanFormID            = "",
			loanFormCode                = "",
			employeeID                  = "",
			loanID                      = "",
			loanFormTermPayment         = "",
			loanFormDate                = "",
			// loanFormNoOfDays            = "",
			loanFormInterest            = "",
			loanFormAmount              = "",
			loanFormDeductionAmount     = "",
			loanFormRemarks             = "",
			approversID                 = "",
			approversStatus             = "",
			approversDate               = "",
			loanFormStatus              = false,
			submittedAt                 = false,
			createdAt                   = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----
		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("loanFormID", loanFormID);
		$("#btnBack").attr("code", getFormCode("LNF", moment(createdAt), loanFormID));
		$("#btnBack").attr("status", loanFormStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let loanType        =   getTableData("hris_loan_tbl","","loanStatus =1");
		let optionLoanType  =   `<option value="" disabled selected>Select Loan Type</option>`;
		loanType.map((loanTypeItems, loanTypeIndex) =>{
			var isSelected = loanTypeItems["loanID"] == loanID ? "selected" : "";
			optionLoanType += `<option value="${loanTypeItems["loanID"]}" ${isSelected}>${loanTypeItems["loanName"]}</option>`;
		});
		// Payday = 0, Monthly = 1;
		let optionLoanFormTermPayment = data == false ? `<option value="" disabled selected>Select Term of Payment</option> 
		<option value="1">Monthly (First cutoff)</option>
		<option value="2">Monthly (Second cutoff)</option>
		<option value="0">Payday</option>`: (loanFormTermPayment == "1" ? `<option value="" disabled>Select Term of Payment</option>
		<option value="1" selected>Monthly (First cutoff)</option>
		<option value="2">Monthly (Second cutoff)</option>
		<option value="0">Payday</option>` : (loanFormTermPayment == "2" ?`<option value="" disabled>Select Term of Payment</option>
		<option value="1">Monthly (First cutoff)</option> 
		<option value="2" selected>Monthly (Second cutoff)</option> 
		<option value="0">Payday</option>`:`<option value="" disabled>Select Term of Payment</option>
		<option value="1">Monthly (First cutoff)</option> 
		<option value="2">Monthly (Second cutoff)</option> 
		<option value="0" selected>Payday</option>` ));

		let reviseDocumentNo    = isRevise ? loanFormID : reviseLoanFormID;
		let documentHeaderClass = isRevise || reviseLoanFormID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseLoanFormID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseLoanFormID ? `
			<div class="col-lg-4 col-md-4 col-sm-12 px-1">
				<div class="card">
					<div class="body">
						<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
						<h6 class="mt-0 text-danger font-weight-bold">
							${getFormCode("LNF", createdAt, reviseDocumentNo)}
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
							${loanFormID && !isRevise ? getFormCode("LNF", createdAt, loanFormID) : "---"}
						</h6>      
					</div>
				</div>
			</div>
			<div class="${documentHeaderClass}">
				<div class="card">
					<div class="body">
						<small class="text-small text-muted font-weight-bold">Status</small>
						<h6 class="mt-0 font-weight-bold">
							${loanFormStatus && !isRevise ? getStatusStyle(loanFormStatus) : "---"}
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
								${getDateApproved(loanFormStatus, approversID, approversDate)}
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
							${loanFormRemarks && !isRevise ? loanFormRemarks : "---"}
						</h6>      
					</div>
				</div>
			</div>
		</div>
		<div class="row" id="form_loan_form">
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Employee Name</label>
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
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Loan Type ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 text-left" required id="loanFormLoanID" name="loanID" ${disabled}>
						${optionLoanType}
					</select>
					<div class="d-block invalid-feedback" id="invalid-loanFormLoanID"></div>
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Term of Payment ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 text-left" required id="loanFormTermPayment" name="loanFormTermPayment" ${disabled}>
					${optionLoanFormTermPayment}
					</select>
					<div class="d-block invalid-feedback" id="invalid-loanFormTermPayment"></div>
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Start Date - End Date ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="button" class="form-control validate text-left" required id="loanFormDate"
							name="loanFormDate" value="${loanFormDate && loanFormDate}"
							title="Date" ${disabled}>
					<div class="d-block invalid-feedback" id="invalid-loanFormDate"></div>
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Interest (%) ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="text" class="form-control validate text-right" name="loanFormInterest" 
					id="loanFormInterest" data-allowcharacters="[0-9][.]" minlength="1" 
					maxlength="50" required  value="${loanFormInterest}" autocomplete="off"  ${disabled}>
					<div class="invalid-feedback d-block" id="invalid-loanFormInterest"></div>
				</div>
			</div>
			<div class="col-md-6 col-sm-12">
			<label>Loan Amount ${!disabled ? "<code>*</code>" : ""}</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text">₱</span>
					</div>
					<input type="text" class="form-control amount" name="loanFormAmount" id="input_loanFormAmount" min=".01" max="99999999"
					data-allowcharacters="[0-9]"  required   value="${loanFormAmount}" autocomplete="off" ${disabled}>
			<div class="invalid-feedback d-block" id="invalid-input_loanFormAmount"></div>
				</div>
			</div>
			<div class="col-md-6 col-sm-12">

			<label><i class="fal fa-info-circle" style="cursor:pointer;color:#007bff;" data-toggle="tooltip" title="
			LOAN FORM FORMULA:
			
			Loan Amount X Interest = Additional Fee
			Loan Amount + Additional Fee(Interest) = Total Loan
			
			TERM OF PAYMENT: Payday
			Total Loan / No. of months(start & end date)/ 2(payday) = Loan Deduction Amount  
			
			TERM OF PAYMENT: Monthly (First Cutoff & Second Cutoff)
			Total Loan / No. of months = Loan Deduction Amount

			"></i> Loan Deduction Amount ${!disabled ? "<code>*</code>" : ""}</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text">₱</span>
					</div>
					<input type="text" class="form-control amount" name="loanFormDeductionAmount" id="input_loanFormDeductionAmount" min=".01" max="99999999"
							data-allowcharacters="[0-9]"   disabled value="${loanFormDeductionAmount}" autocomplete="off" ${disabled}>
					<div class="invalid-feedback d-block" id="invalid-input_loanFormDeductionAmount"></div>
				</div>
			</div>
			<div class="col-md-12 text-right mt-4">
				${button}
			</div>
		</div>
		<div class="approvers">
			${!isRevise ? getApproversStatus(approversID, approversStatus, approversDate): ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			if (data) {
				initInputmaskTime(false);
				let loanFormDateSplit = loanFormDate.split(" - ");
				loanFormDateRange(moment(loanFormDateSplit[0], "'MMMM D, YYYY'"),moment(loanFormDateSplit[1], "'MMMM D, YYYY'"));
			} else {
				initInputmaskTime();
				loanFormDateRange();
			}
		}, 300);
	}
	// ----- END FORM CONTENT -----


	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
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

			headerButton(true, "Add Loan");
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


	// ----- CUSTOM INPUTMASK -----
	function initInputmaskTime(isMethodAdd = true) {
		if (isMethodAdd) {
			$(".timeIn").val("08:00");
			$(".timeOut").val("17:00");
		}

		$(".timeIn").inputmask({
			mask: "h:s",
			placeholder: "08:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
		$(".timeOut").inputmask({
			mask: "h:s",
			placeholder: "17:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
	}
	// ----- END CUSTOM INPUTMASK ------


	// ----- CHECK TIME RANGE -----
	function checkTimeRange(elementID = false, isReturnable = false) {
		let element = elementID ? `#${elementID}` : ".timeOut";
		let flag = 0;
		$(element).each(function () {
			const fromValue = $("#loanFormTimeIn").val() + ":00";
			const validated = $(this).hasClass("validated");
			const toValue   = $(this).val() + ":00";

			const timeIn  = moment(`2021-01-01 ${fromValue}`);
			const timeOut = moment(`2021-01-01 ${toValue}`);

			let diff = moment.duration(timeOut.diff(timeIn));
				diff = diff.asSeconds();

			const invalidFeedback = $(this).parent().find(".invalid-feedback");

			if (diff <= 0) {
				$(this).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("Invalid time range");
				flag++;
			} else {
				isReturnable || validated
					? $(this).removeClass("is-invalid").addClass("is-valid")
					: $(this).removeClass("is-invalid").removeClass("is-valid");
				invalidFeedback.text("");
			}
		});
		if (isReturnable) {
			$(".modal").find(".is-invalid").first().focus();
			return flag > 0 ? false : true;
		}
	}
	// ----- END CHECK TIME RANGE -----


	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_loan_form", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[loanFormStatus]"] = status;
			data["tableData[updatedBy]"]            = sessionID;
			data["feedback"]                        = feedback;
			data["method"]                          = method;
			data["tableName"]                       = "hris_loan_form_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"]         = sessionID;
				data["tableData[createdBy]"]          = sessionID;
				data["tableData[createdAt]"]          = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]          = sessionID;
					data["tableData[approversStatus]"]      = 2;
					data["tableData[approversDate]"]        = dateToday();
					data["tableData[loanFormStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]          = sessionID;
						data["tableData[approversStatus]"]      = 2;
						data["tableData[approversDate]"]        = dateToday();
						data["tableData[loanFormStatus]"] = 2;
					}
				}
				data["whereFilter"] = "loanFormID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----


	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeOut", function () {
		checkTimeRange($(this).attr("id"));
	});
	// ----- END CHANGE TIME TO -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("loanFormID");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("LNF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data     = getData(action, 0, "save", feedback, id);
				data[`tableData[loanFormStatus]`] = 0;
				if (!isFromCancelledDocument) {
					delete data["tableData"].loanFormID;
					data["tableData"]["reviseLoanFormID"] = id;
			
				} else {
					delete data[`action`];
					data[`tableData[loanFormID]`] = id;
					data[`action`] = "update";

				}

				// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
				let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
				let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

				data["tableData"]["loanFormAmount"] = loanFormAmount;
				data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

				// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

				setTimeout(() => {
					cancelForm(
						"save",
						action,
						"LOAN",
						"",
						"form_loan_form",
						data,
						true,
						pageContent
					);
				}, 300);
		
			} else {
				$("#page_content").html(preloader);
				pageContent();

				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length && (isForViewing ? $("[redirect=forViewingTab]").trigger("click") : $("[redirect=forApprovalTab]").trigger("click"));
				}
			}

			
		} else {
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 0, "save", feedback, id);

			// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
			let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
			let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

			data["tableData"]["loanFormAmount"] = loanFormAmount;
			data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

			// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"LOAN",
					"",
					"form_loan_form",
					data,
					true,
					pageContent
				);
			}, 300);
		}
	});
	// ----- END CLOSE FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function (e) {
		e.stopPropagation();
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function (e) {
		e.stopPropagation();
		const id = $(this).attr("id");
		isForViewing = $(this).attr("isForViewing") == "true";
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		
		const id                    = $(this).attr("loanFormID");
		const fromCancelledDocument = $(this).attr("cancel") == "true";

		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const id       = decryptString($(this).attr("loanFormID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const feedback = getFormCode("LNF", dateToday()); 
		const data     = getData(action, 0, "save", feedback);
		if (revise) {
			if (!isFromCancelledDocument) {
				data[`tableData[reviseLoanFormID]`] = id;
				data[`whereFilter`] = `loanFormID = ${id}`;
				delete data[`tableData[loanFormID]`];
			} else {
				data[`tableData[loanFormID]`] = id;
				data[`whereFilter`] = `loanFormID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
		let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
		let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

		data["tableData"]["loanFormAmount"] = loanFormAmount;
		data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

		formConfirmation(
			"save",
			"insert",
			"LOAN",
			"",
			"form_loan_form",
			data,
			true,
			myFormsContent
		);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("loanFormID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate     = validateForm("form_loan_form");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);
			const loanFormDate = data["tableData"]["loanFormDate"];

			if (revise) {
				if (!isFromCancelledDocument) {
					data["tableData"]["reviseLoanFormID"] = id;
					delete data["tableData"].loanFormID;

					data[`tableData[reviseLoanFormID]`] = id;
					delete data[`tableData[loanFormID]`];
					data["feedback"] = `LNF-${moment("YY")}-00000`;
				}else {
					data[`whereFilter`] = `loanFormID = ${id}`;
				}
			}

			// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
			let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
			let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");
			let loanFormTermPayment = data["tableData"]["loanFormTermPayment"].replaceAll(",","");

			data["tableData"]["loanFormAmount"] = loanFormAmount;
			data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

			// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
			// const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);

			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                MODULE_ID,
					// tableID:                 1, // AUTO FILL
					notificationTitle:       "Loan Form",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"LOAN",
					"",
					"form_loan_form",
					data,
					true,
					pageContent,
					notificationData,
					"",
					data[`tableData[loanFormStatus]`] == 2 ? updateEmployeeLoan : false,
					data[`tableData[loanFormStatus]`] == 2 ? [employeeID, loanFormTermPayment,loanFormDate,loanFormDeductionAmount,id] : []
				);
				// updateEmployeeLoan(employeeID, leaveID, leaveCredit);
			}, 300);
		}
	});
	// ----- END SUBMIT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id       = decryptString($(this).attr("loanFormID"));
		const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 5, "drop", feedback, id);

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
		let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
		let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

		data["tableData"]["loanFormAmount"] = loanFormAmount;
		data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

		
		formConfirmation(
			"drop",
			action,
			"LOAN",
			"",
			"form_loan_form",
			data,
			true,
			pageContent
		);
	})
	// ----- END DROP DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("loanFormID"));
		const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
		let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
		let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

		data["tableData"]["loanFormAmount"] = loanFormAmount;
		data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

		
		formConfirmation(
			"cancelform",
			action,
			"LOAN",
			"",
			"form_loan_form",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id       = decryptString($(this).attr("loanFormID"));
		const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");

		const data     = getData(action, 0, "save", feedback, id);
		// data.append("loanFormStatus", 0);
		data[`tableData[loanFormStatus]`] = 0;
		if (revise) {
			if (!isFromCancelledDocument) {
				// data.append("reviseLoanFormID", id);
				// data.delete("loanFormID");

				data[`tableData[reviseLoanFormID]`] = id;
				data[`whereFilter`] = `loanFormID = ${id}`;
				delete data[`tableData[loanFormID]`];
			} else {
				// data.append("loanFormID", id);
				// data.delete("action");
				// data.append("action", "update");

				data[`tableData[loanFormID]`] = id;
				data[`whereFilter`] = `loanFormID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}
		
		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------
		let loanFormAmount = data["tableData"]["loanFormAmount"].replaceAll(",","");
		let loanFormDeductionAmount = data["tableData"]["loanFormDeductionAmount"].replaceAll(",","");

		data["tableData"]["loanFormAmount"] = loanFormAmount;
		data["tableData"]["loanFormDeductionAmount"] = loanFormDeductionAmount;

		// ---------- CONVERT VALUE WITH COMMA BEFORE SENDING IN CONTROLLER --------------------

		cancelForm(
			"save",
			action,
			"LOAN",
			"",
			"form_loan_form",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----

	function dateRange(startDate, endDate,loanFormTermPayment) {
		var start      = startDate.split('-');
		var end        = endDate.split('-');
		var startYear  = parseInt(start[0]);
		var endYear    = parseInt(end[0]);
		var dates      = [];


	
		for(var i = startYear; i <= endYear; i++) {
		var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
		var startMon = i === startYear ? parseInt(start[1])-1 : 0;
		for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
			var month = j+1;
			var displayMonth = month < 10 ? '0'+month : month;
			
			

			if(loanFormTermPayment == 1){
				let day = getCutOff[0].firstCutOffPayOut;

				let tmpdate = moment(i+"-"+displayMonth+"-"+day);
				let flag = tmpdate.isValid();

					if(!flag){
						day = moment(month+"-01-"+ i).endOf('month').format("DD");
					}

					dates.push([i, displayMonth, day].join('-'));

			}else if(loanFormTermPayment ==2){
				
				let day = getCutOff[0].secondCutOffPayOut;

				let tmpdate = moment(i+"-"+displayMonth+"-"+day);
				let flag = tmpdate.isValid();

					if(!flag){
						day = moment(month+"-01-"+ i).endOf('month').format("DD");
					}

					dates.push([i, displayMonth, day].join('-'));
				
				
			}else{

				

				let firstCutOffDay = getCutOff[0].firstCutOffPayOut;
				let tmpfirstdate = moment(i+"-"+displayMonth+"-"+firstCutOffDay);
				let firstFlag = tmpfirstdate.isValid();

					if(!firstFlag){
						firstCutOffDay = moment(month+"-01-"+ i).endOf('month').format("DD");
					}

					dates.push([i, displayMonth, firstCutOffDay].join('-'));


				let secondCutOffDay = getCutOff[0].secondCutOffPayOut;
				let tmpseconddate = moment(i+"-"+displayMonth+"-"+secondCutOffDay);
				let secondFlag = tmpseconddate.isValid();

					if(!secondFlag){
						secondCutOffDay = moment(month+"-01-"+ i).endOf('month').format("DD");
					}

					dates.push([i, displayMonth, secondCutOffDay].join('-'));

			}
			
		}
		}
		return dates;
	}
	

	// ----- UPDATE EMPLOYEE LEAVE -----
	function updateEmployeeLoan(employeeID = 0, loanFormTermPayment = 0,loanFormDate ="",loanFormDeductionAmount= 0,loanFormID = 0) {

		const splitDateRange = loanFormDate.split("-");
		const dateFrom = moment(splitDateRange[0]).format("YYYY-MM-DD");
		const dateTo = moment(splitDateRange[1]).format("YYYY-MM-DD");
		
		const listDate =   dateRange(dateFrom, dateTo,loanFormTermPayment);

		let formData = new FormData();
		formData.append("employeeID", employeeID);
		formData.append("loanFormTermPayment", loanFormTermPayment);
		formData.append("loanFormDate", loanFormDate);
		formData.append("loanFormDeductionAmount", loanFormDeductionAmount);
		formData.append("loanFormID", loanFormID);
		formData.append("listDate", listDate);

			$.ajax({
				method:      "POST",
				url: `loan_form/generateAmmortization`,
				data:formData,
				processData: false,
				contentType: false,
				global:      false,
				cache:       false,
				async:       false,
				dataType:    "json",
				success: function(data) {}
			})

	}
	// ----- END UPDATE EMPLOYEE LEAVE -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("loanFormID"));
		const feedback = $(this).attr("code") || getFormCode("LNF", dateCreated, id);
		let tableData  = getTableData("hris_loan_form_tbl", "", "loanFormID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;
			let loanFormDate = tableData[0].loanFormDate;
			let loanFormDeductionAmount = tableData[0].loanFormDeductionAmount;
			let loanFormTermPayment = tableData[0].loanFormTermPayment;


			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["tableData[approversDate]"]   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Loan Form",
					notificationDescription: `${getFormCode("LNF", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Loan Form",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[loanFormStatus]"] = status;

			// setTimeout(() => {
			// 	formConfirmation(
			// 		"approve",
			// 		"update",
			// 		"LOAN",
			// 		"",
			// 		"form_loan_form",
			// 		data,
			// 		true,
			// 		pageContent,
			// 		notificationData
			// 	);
			// }, 300);

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"LOAN",
					"",
					"form_loan_form",
					data,
					true,
					pageContent,
					notificationData,
					this,
					status == 2 ? updateEmployeeLoan : false,
					status == 2 ? [employeeID, loanFormTermPayment,loanFormDate,loanFormDeductionAmount,id] : []
				);
				// updateEmployeeLoan(employeeID, leaveID, leaveCredit);
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("loanFormID");
		const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);

		$("#modal_loan_form_content").html(preloader);
		$("#modal_loan_form .page-title").text(
			"DENY LOAN"
		);
		$("#modal_loan_form").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="loanFormRemarks"
					name="loanFormRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-loanFormRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			loanFormID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_loan_form_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("loanFormID"));
		const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);

		const validate = validateForm("modal_loan_form");
		if (validate) {
			let tableData = getTableData("hris_loan_form_tbl", "", "loanFormID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[loanFormRemarks]"] = $("[name=loanFormRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                MODULE_ID,
					tableID: 				 id,
					notificationTitle:       "Loan Form",
					notificationDescription: `${getFormCode("LNF", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"LOAN",
						"modal_loan_form",
						"",
						data,
						true,
						pageContent,
						notificationData,
						this
					);
					$(`[redirect=forApprovalTab]`).trigger("click");
				}, 300);
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
		if (tab == "#forViewingTab") {
			forViewingContent();
		}
	});
	// ----- END NAV LINK -----


	// ----- APPROVER STATUS -----
	function getApproversStatus(approversID, approversStatus, approversDate) {
		let html = "";
		if (approversID) {
			let idArr = approversID.split("|");
			let statusArr = approversStatus ? approversStatus.split("|") : [];
			let dateArr = approversDate ? approversDate.split("|") : [];
			html += `<div class="row mt-4">`;

			idArr && idArr.map((item, index) => {
				let date   = dateArr[index] ? moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A") : "";
				let status = statusArr[index] ? statusArr[index] : "";
				let statusBadge = "";
				if (date && status) {
					if (status == 2) {
						statusBadge = `<span class="badge badge-info">Approved - ${date}</span>`;
					} else if (status == 3) {
						statusBadge = `<span class="badge badge-danger">Denied - ${date}</span>`;
					}
				}

				html += `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12">
					<div class="d-flex justify-content-start align-items-center">
						<span class="font-weight-bold">
							${employeeFullname(item)}
						</span>
						<small>&nbsp;- Level ${index + 1} Approver</small>
					</div>
					${statusBadge}
				</div>`;
			});
			html += `</div>`;
		}
		return html;
	}
	// ----- END APPROVER STATUS -----

	});

	$(document).on("change keyup", "#input_loanFormAmount ,#input_loanFormDeductionAmount, #loanFormDate, #loanFormInterest , #loanFormLoanID, #loanFormTermPayment" ,function(){

	var loanAmount = parseFloat($("#input_loanFormAmount").val().replaceAll(",",""));
	// var deductionAmount = parseFloat($("#input_loanFormDeductionAmount").val().replaceAll(",",""));

	var loanType = $("#loanFormLoanID").val();
	var loanTermPayment = +$("#loanFormTermPayment").val();
	// var loanNoOfDays = $("#loanFormNoOfDays").val();
	var loanInterest = $("#loanFormInterest").val() || 0;
	console.log(loanInterest)

		let thisValue       =   $("#loanFormDate").val();
		let thisValueSplit  =   thisValue.split(" - ");
		let fromDate        =  new Date(thisValueSplit[0]); 	
		let toDate          =  new Date(thisValueSplit[1]);
		let loanNoOfMonths    =  Math.round(moment(toDate).diff(moment(fromDate), 'months', true)) || 0;
		let terms ="";




	if(loanType == null || loanTermPayment == null || loanNoOfMonths == 0 || loanInterest == "" || isNaN(loanAmount) == true  ){
		
		$("#input_loanFormDeductionAmount").val(0);
	}else{

		if(loanTermPayment == 1 || loanTermPayment == 2){
			terms =1; 
		}else{
			terms =2; 
		}


		var computeDeductionAmount = ((loanAmount + (loanAmount*(loanInterest/100))) /loanNoOfMonths)/terms;

		$("#input_loanFormDeductionAmount").val(computeDeductionAmount);

		if(loanAmount < computeDeductionAmount){

			$("#input_loanFormAmount").removeClass("is-valid").addClass("is-invalid");
			// $("#input_loanFormDeductionAmount").removeClass("is-valid").addClass("is-invalid");

			$("#invalid-input_loanFormAmount").text("Deduction amount is greater than loan amount!");
			// $("#invalid-input_loanFormDeductionAmount").text("Deduction amount is greater than loan amount!");
			

		}else{
		
			$("#input_loanFormAmount").removeClass("is-invalid");
			// $("#input_loanFormDeductionAmount").removeClass("is-invalid").addClass("is-valid");

			$("#invalid-input_loanFormAmount").text("");
			// $("#invalid-input_loanFormDeductionAmount").text("");
		}

	}





	})

	// $(document).on("change", "#loanFormDate" ,function(){
	//     let thisValue       =   $(this).val();
	//     let thisValueSplit  =   thisValue.split(" - ");

	//     // from = start.format('YYYY-MM-DD 00:00:00');
	//     //               to = end.format('YYYY-MM-DD 23:MODULE_ID:MODULE_ID');

	//     let fromDate        =  new Date(thisValueSplit[0]); 	
	//     let toDate          =  new Date(thisValueSplit[1]);
	//     let numberOfDays    =  Math.round((toDate-fromDate)/(1000*60*60*24));
	//     $("#loanFormNoOfDays").val(numberOfDays);
	// })



	function loanFormDateRange(startDate=moment(), endDate=moment()){
	$('#loanFormDate').daterangepicker({
		"showDropdowns": true,
		minDate: moment(),
		autoApply: true,
		startDate:startDate,
		endDate: endDate,
		locale: {
		format: 'MMMM D, YYYY'
		},
		ranges: {
		//   'Today': [moment(), moment()],
		//   'Tommorow': [moment().add(1, 'days'), moment().add(1, 'days')],
		'Month': [moment(), moment().add(30, 'days')],
		'Quarter': [moment(), moment().add(3, 'months')],
		'Semiannual':[moment(), moment().add(6, 'months')],
		'Annual': [moment(), moment().add(1, 'years')]
		}
	});



	// ----- AMMORTIZATION MODAL -----
	$(document).on("click", ".ammortization_link", function (e) {
		e.stopImmediatePropagation();
		const id       = decryptString($(this).attr("id"));
		// const feedback = $(this).attr("code") || getFormCode("LNF", dateToday(), id);

		$("#modal_ammortization_content").html(preloader);
		$("#modal_ammortization .page-title").text(
			"Loan Amortization Schedule"
		);
		$("#modal_ammortization").modal("show");
		ammortizationContent(id);
	});

	// ----- MY FORMS CONTENT -----
	function ammortizationContent(id =0) {
		$("#modal_ammortization_content").html(preloader);
		let loanData = getTableData(`hris_loan_ammortization_tbl`,``,
		`loanFormID = ${id}`);

		let html = `
		<table class="table table-bordered table-striped table-hover pr-2 pl-2" id="tableAmmortization">
			<thead>
				<tr style="white-space: nowrap">
					<th class="text-center">#</th>
					<th>Due Date</th>
					<th>Loan Amount</th>
					<th>Received Date</th>
					<th>Paid Amount</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>`;

		let count =1;
		loanData.map((item) => {
			let {
				dueDate,
				loanAmount,
				recievedDate,
				payrollCode,
				payrollAmount,
				ammortizationStatus
			} = item;


		
			let targetDate   = dueDate ? moment(dueDate).format("MMMM DD, YYYY ") : "-";
			let recieveDate   = recievedDate ? moment(recievedDate).format("MMMM DD, YYYY ") : "-";
			
			let status ='';
			if(ammortizationStatus == 1){
				status =`<span class="badge badge-info w-100">Paid</span>` ;
			}else{
				status=`<span class="badge badge-danger w-100">Unpaid</span>`;
			}	

			html += `
			<tr>
				<td class="text-center">${count++}</td>
				<td>${targetDate}</td>
				<td class="text-right">${formatAmount(loanAmount || 0,true)}</td>
				<td>
					<div>
						${recieveDate}
					</div>
					<small>${payrollCode || "-"}</small>
				</td>
				<td class="text-right">${formatAmount(payrollAmount || 0,true)}</td>
				<td>${status}</td>
				
			</tr>`;
		});

		if(loanData.length == 0){
			html +=`<tr><td colspan="6" class="text-center">No Loan History</td></tr>`;
		}

		html += `
			</tbody>
		</table>`;

		setTimeout(() => {
			$("#modal_ammortization_content").html(html);
			// initDataTables();
			return html;
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----

	//  TOOLTIP //
	$('[data-toggle="tooltip"]').tooltip()
	// TOOLTIP //

}
