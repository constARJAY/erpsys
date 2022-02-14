$(document).ready(function() {

	const MODULE_ID     = 53;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing    = false;


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(MODULE_ID);
	// ----- END MODULE APPROVER -----


	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


	// ----- DATATABLES -----
	function initDataTables() {
		["#tableMyForms", "#tableForApproval", "#tableForViewing"].map(elementID => {
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
						{ targets: 1,  width: 150 },
						{ targets: 2,  width: 150 },
						{ targets: 3,  width: 150 },
						{ targets: 4,  width: 250 },
						{ targets: 5,  width: 80  },
						{ targets: 6,  width: 300 },
					],
				});
		})
		
		if ($.fn.DataTable.isDataTable("#tablePettyCashRequest")) {
			$("#tablePettyCashRequest").DataTable().destroy();
		}

		var table = $("#tablePettyCashRequest")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: false,
                searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 50  },
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 100 },
					{ targets: 4,  width: 150 },
				],
			});
	}
	// ----- END DATATABLES -----


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
				"fms_petty_cash_request_tbl", 
				"revisePettyCashRequestID", 
				"revisePettyCashRequestID IS NOT NULL AND pettyCashRequestStatus != 4");
			return revisedDocumentsID.map(item => item.revisePettyCashRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					pettyCashRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (pettyCashRequestStatus == 0 || pettyCashRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (pettyCashRequestStatus == 0) {
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
					const isAllowed = isCreateAllowed(MODULE_ID);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}fms/petty_cash_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/petty_cash_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/petty_cash_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/petty_cash_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(MODULE_ID)) {
				html = `<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
			if (isImModuleApprover("fms_petty_cash_request_tbl", "approversID") || allowedShow) {
				let count = getCountForApproval("fms_petty_cash_request_tbl", "pettyCashRequestStatus");
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
		$("#tableForViewingParent").html(preloader);

		let pettyCashRequest = getTableData(
			`fms_petty_cash_request_tbl AS fpcrt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`fpcrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`fpcrt.employeeID != ${sessionID} AND pettyCashRequestStatus != 0 AND pettyCashRequestStatus != 4 AND pettyCashRequestStatus = 2`,
			`FIELD(pettyCashRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(fpcrt.submittedAt, fpcrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForViewing">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Amount</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				pettyCashRequestID,
				pettyCashRequestCode,
				revisePettyCashRequestID,
				revisePettyCashRequestCode,
				employeeID,
				pettyCashRequestDate,
				pettyCashRequestAmount,
				approversID,
				approversStatus,
				approversDate,
				pettyCashRequestStatus,
				pettyCashRequestRemarks,
				pettyCashLiquidationStatus,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyCashRequestStatus == 2 || pettyCashRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyCashRequestStatus != 0 ? "btnView" : "btnEdit";

			html += `
			<tr class="${btnClass}" id="${encryptString(pettyCashRequestID)}" isForViewing="true">
				<td>${getFormCode("PCR", createdAt, pettyCashRequestID)}</td>
				<td>${fullname}</td>
				<td class="text-right">${formatAmount(pettyCashRequestAmount, true)}</td>
				<td>${employeeFullname(getCurrentApprover(approversID, approversDate, pettyCashRequestStatus, true))}</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td>${getStatusStyle(pettyCashRequestStatus)}</td>
				<td>${pettyCashRequestRemarks || "-"}</td>
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

		let pettyCashRequest = getTableData(
			`fms_petty_cash_request_tbl AS fpcrt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`fpcrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`fpcrt.employeeID != ${sessionID} AND pettyCashRequestStatus != 0 AND pettyCashRequestStatus != 4`,
			`FIELD(pettyCashRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(fpcrt.submittedAt, fpcrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Amount</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				pettyCashRequestID,
				pettyCashRequestCode,
				revisePettyCashRequestID,
				revisePettyCashRequestCode,
				employeeID,
				pettyCashRequestDate,
				pettyCashRequestAmount,
				approversID,
				approversStatus,
				approversDate,
				pettyCashRequestStatus,
				pettyCashRequestRemarks,
				pettyCashLiquidationStatus,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyCashRequestStatus == 2 || pettyCashRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyCashRequestStatus != 0 ? "btnView" : "btnEdit";

			if (isImCurrentApprover(approversID, approversDate, pettyCashRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(pettyCashRequestID)}">
					<td>${getFormCode("PCR", createdAt, pettyCashRequestID)}</td>
					<td>${fullname}</td>
					<td class="text-right">${formatAmount(pettyCashRequestAmount, true)}</td>
					<td>${employeeFullname(getCurrentApprover(approversID, approversDate, pettyCashRequestStatus, true))}</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td>${getStatusStyle(pettyCashRequestStatus)}</td>
					<td>${pettyCashRequestRemarks || "-"}</td>
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

		let pettyCashRequest = getTableData(
			`fms_petty_cash_request_tbl AS fpcrt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`fpcrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`fpcrt.employeeID = ${sessionID}`,
			`FIELD(pettyCashRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(fpcrt.submittedAt, fpcrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Amount</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				pettyCashRequestID,
				pettyCashRequestCode,
				revisePettyCashRequestID,
				revisePettyCashRequestCode,
				employeeID,
				pettyCashRequestDate,
				pettyCashRequestAmount,
				approversID,
				approversStatus,
				approversDate,
				pettyCashRequestStatus,
				pettyCashRequestRemarks,
				pettyCashLiquidationStatus,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyCashRequestStatus == 2 || pettyCashRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyCashRequestStatus != 0 ? "btnView" : "btnEdit";

			html += `
			<tr class="${btnClass}" id="${encryptString(pettyCashRequestID)}">
				<td>${getFormCode("PCR", createdAt, pettyCashRequestID)}</td>
				<td>${fullname}</td>
				<td class="text-right">${formatAmount(pettyCashRequestAmount, true)}</td>
				<td>${employeeFullname(getCurrentApprover(approversID, approversDate, pettyCashRequestStatus, true))}</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td>${getStatusStyle(pettyCashRequestStatus)}</td>
				<td>${pettyCashRequestRemarks || "-"}</td>
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
				pettyCashRequestID     = "",
				pettyCashRequestStatus = "",
				employeeID             = "",
				approversID            = "",
				approversDate          = "",
				createdAt              = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (pettyCashRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						pettyCashRequestID="${encryptString(pettyCashRequestID)}"
						code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (pettyCashRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (pettyCashRequestStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	pettyCashRequestID="${encryptString(pettyCashRequestID)}"
					// 	code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
					// 	status="${pettyCashRequestStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (pettyCashRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(pettyCashRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (pettyCashRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(pettyCashRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (pettyCashRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button type="button" 
				class="btn btn-submit px-5 p-2"  
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- ITEM ROW -----
	function getItemRow() {
		let html = `
		<tr>
			<td class="text-center">
				<input type="checkbox" class="checkboxrow">
			</td>
			<td>
				<div class="form-group mb-0">
					<input type="text"
						class="form-control validate"
						name="description"
						data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][''][-][_][(][)][%][&][*][ ]"
						minlength="1"
						maxlength="250"
						required>
					<div class="invalid-feedback d-block"></div>
				</div>
			</td>
			<td>
				<div class="form-group mb-0">
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input 
							type="text" 
							class="form-control amount text-right"
							min="0.01" 
							max="999999" 
							minlength="1" 
							maxlength="20"
							name="amount">
					</div>
					<div class="d-block invalid-feedback"></div>
				</div>
			</td>
			<td>
				<div class="form-group mb-0">
					<input type="text" 
						class="form-control input-quantity text-center"
						min="0.01" 
						max="999999999" 
						data-allowcharacters="[0-9]"
						name="quantity" 
						minlength="1" 
						maxlength="20">
					<div class="d-block invalid-feedback"></div>
				</div>
			</td>
			<td class="text-right">
				<div class="totalAmount">${formatAmount(0, true)}</div>
			</td>
		</tr>`;

		return html;
	}
	// ----- END ITEM ROW -----


	// ----- UPDATE TABLE INPUTS -----
	function updateTableInputs() {
		$("#tablePettyCashRequest").find(`input, select, textarea`).each(function(i) {
			$parent  = $(this).closest(".form-group");
			$invalid = $parent.find(".invalid-feedback");

			let name = $(this).attr("name");
			$(this).attr("id", name+i);
			$parent.attr("id", `invalid-${name+i}`);
		})
	}
	// ----- END UPDATE TABLE INPUTS -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		// ! REQUESTED AMOUNT MUST BE BASED ON SYSTEM SETTINGS

		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			pettyCashRequestID,
			revisePettyCashRequestID,
			employeeID,
			pettyCashRequestAmount,
			pettyCashRequestReason,
			approversID,
			approversStatus,
			approversDate,
			pettyCashRequestStatus = false,
			pettyCashRequestRemarks,
			pettyCashLiquidationStatus,
			submittedAt,
			createdBy,
			updatedBy,
			createdAt,
			updatedAt,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("pettyCashRequestID", encryptString(pettyCashRequestID));
		$("#btnBack").attr("code", getFormCode("PCR", moment(createdAt), pettyCashRequestID));
		$("#btnBack").attr("status", pettyCashRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";

		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? pettyCashRequestID : revisePettyCashRequestID;
		let documentHeaderClass = isRevise || revisePettyCashRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePettyCashRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePettyCashRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PCR", createdAt, reviseDocumentNo)}
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
							${pettyCashRequestID && !isRevise ? getFormCode("PCR", createdAt, pettyCashRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${pettyCashRequestStatus && !isRevise ? getStatusStyle(pettyCashRequestStatus) : "---"}
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
								${getDateApproved(pettyCashRequestStatus, approversID, approversDate)}
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
							${pettyCashRequestRemarks && !isRevise ? pettyCashRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

		<div class="row" id="form_petty_cash_request">
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Requestor</label>
					<input type="text" class="form-control" disabled value="${employeeFullname}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Position</label>
					<input type="text" class="form-control" disabled value="${employeeDesignation}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Department</label>
					<input type="text" class="form-control" disabled value="${employeeDepartment}">
				</div>
			</div>
			<div class="col-md-9 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="pettyCashRequestReason"
                        name="pettyCashRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${pettyCashRequestReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-pettyCashRequestReason"></div>
                </div>
            </div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Requested Amount ${!disabled ? "<code>*</code>" : ""}</label>
					<div class="input-group">
						<div class="input-group-prepend">
							<span class="input-group-text">₱</span>
						</div>
						<input 
							type="text" 
							class="form-control amount text-right"
							min="0.01" 
							max="1000" 
							minlength="1" 
							maxlength="20"
							name="pettyCashRequestAmount"
							id="pettyCashRequestAmount"
							value="${pettyCashRequestAmount}"
							${disabled}>
					</div>
					<div class="d-block invalid-feedback" id="invalid-pettyCashRequestAmount"></div>
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

			headerButton(true, "Add Petty Cash Request");
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


	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_petty_cash_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[pettyCashRequestStatus]"] = status;
			data["tableData[updatedBy]"]              = sessionID;
			data["feedback"]                          = feedback;
			data["method"]                            = method;
			data["tableName"]                         = "fms_petty_cash_request_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"]         = sessionID;
				data["tableData[createdBy]"]          = sessionID;
				data["tableData[createdAt]"]          = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]            = sessionID;
					data["tableData[approversStatus]"]        = 2;
					data["tableData[approversDate]"]          = dateToday();
					data["tableData[pettyCashRequestStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]            = sessionID;
						data["tableData[approversStatus]"]        = 2;
						data["tableData[approversDate]"]          = dateToday();
						data["tableData[pettyCashRequestStatus]"] = 2;
					}
				}
				data["whereFilter"] = "pettyCashRequestID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		isForViewing = $(this).attr("isForViewing") == "true";
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("pettyCashRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {

			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getData(action, 0, "save", feedback, id);
				data[`tableData[pettyCashRequestStatus]`] = 0;
				if (!isFromCancelledDocument) {
					delete data[`pettyCashRequestID`];
					data[`feedback`] = getFormCode("PCR", new Date);
					data[`tableData[revisePettyCashRequestID]`] = id;
				} else {
					delete data[`action`];
					data[`tableData[pettyCashRequestID]`] = id;
					data[`action`] = "update";
				}

				setTimeout(() => {
					customCancelForm(
						"save",
						action,
						"PETTY CASH REQUEST",
						"",
						"form_petty_cash_request",
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
			data[`tableData[pettyCashRequestStatus]`] = 0;

			setTimeout(() => {
				customCancelForm(
					"save",
					action,
					"PETTY CASH REQUEST",
					"",
					"form_petty_cash_request",
					data,
					true,
					pageContent
				);
			}, 300);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[pettyCashRequestStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("PCR", new Date);
				data[`tableData[revisePettyCashRequestID]`] = id;
				data[`whereFilter`] = `pettyCashRequestID = ${id}`;
				delete data[`tableData[pettyCashRequestID]`];
			} else {
				data[`tableData[pettyCashRequestID]`] = id;
				data[`whereFilter`] = `pettyCashRequestID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		customFormConfirmation(
			"save",
			action,
			"PETTY CASH REQUEST",
			"",
			"form_petty_cash_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_petty_cash_request");


		if (validate) {
			const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[revisePettyCashRequestID]`] = id;
					delete data[`tableData[pettyCashRequestID]`];
					data["feedback"] = getFormCode("PCR", new Date);
				} else {
					data[`whereFilter`] = `pettyCashRequestID = ${id}`;
				}
			}

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);

			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                MODULE_ID,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
				customFormConfirmation(
					"submit",
					action,
					"PETTY CASH REQUEST",
					"",
					"form_petty_cash_request",
					data,
					true,
					pageContent,
					notificationData
				);
			}, 100);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		customFormConfirmation(
			"cancelform",
			action,
			"PETTY CASH REQUEST",
			"",
			"form_petty_cash_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		let tableData  = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

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
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${getFormCode("PCR", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[pettyCashRequestStatus]"] = status;

			setTimeout(() => {
				customFormConfirmation(
					"approve",
					"update",
					"PETTY CASH REQUEST",
					"",
					"form_petty_cash_request",
					data,
					true,
					pageContent,
					notificationData
				);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		$("#modal_petty_cash_request_content").html(preloader);
		$("#modal_petty_cash_request .page-title").text("DENY PETTY CASH REQUEST");
		$("#modal_petty_cash_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="pettyCashRequestRemarks"
					name="pettyCashRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-pettyCashRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			pettyCashRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_petty_cash_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		const validate = validateForm("modal_petty_cash_request");
		if (validate) {
			let tableData = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[pettyCashRequestRemarks]"] = $("[name=pettyCashRequestRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                MODULE_ID,
					tableID: 				 id,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${getFormCode("PCR", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					customFormConfirmation(
						"reject",
						"update",
						"PETTY CASH REQUEST",
						"modal_petty_cash_request",
						"",
						data,
						true,
						pageContent,
						notificationData
					);
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}, 300);
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const pettyCashRequestID = decryptString($(this).attr("pettyCashRequestID"));
		const feedback         = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		const id = decryptString($(this).attr("pettyCashRequestID"));
		let data = {};
		data["tableName"]                       = "fms_petty_cash_request_tbl";
		data["whereFilter"]                     = `pettyCashRequestID = ${pettyCashRequestID}`;
		data["tableData[pettyCashRequestStatus]"] = 5;
		data["action"]                          = "update";
		data["method"]                          = "drop";
		data["feedback"]                        = feedback;
		data["tableData[updatedBy]"]            = sessionID;

		setTimeout(() => {
			customFormConfirmation(
				"drop",
				"update",
				"PETTY CASH REQUEST",
				"",
				"form_petty_cash_request",
				data,
				true,
				pageContent
			);
		}, 300);
	})
	// ----- END DROP DOCUMENT -----


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




	// ----- INSERT LIQUIDATION -----
	function insertLiquidation(pettyCashRequestID = 0) {
		$.ajax({
			method: "POST",
			url: base_url+"fms/petty_cash_request/insertLiquidation",
			data: { pettyCashRequestID },
			async: true,
			success: function() {}
		})
	}
	// ----- END INSERT LIQUIDATION -----


	// ----- FORM/DOCUMENT CONFIRMATION -----
	function customFormConfirmation(
		method           = "", // save|cancelform|approve|reject|submit|cancel|drop
		action           = "",
		title            = "",
		modalID          = "",
		containerID      = "",
		data             = null,
		isObject         = true,
		callback         = false,
		notificationData = false,
		buttonElement    = null,
		aFunctions       = false,
		aArguments       = []
	) {
		buttonElement && formButtonHTML(buttonElement, false);

		if (method && action && title && (modalID || containerID)) {
			method = method.toLowerCase();
			action = action.toLowerCase() == "update" ? "update" : "insert";

			modalID && $("#" + modalID).modal("hide");

			let swalText, swalImg;
			switch (method) {
				case "save":
					swalTitle = `SAVE ${title.toUpperCase()}`;
					swalText  = "Are you sure to save this document?";
					swalImg   = `${base_url}assets/modal/draft.svg`;
					break;
				case "submit":
					swalTitle = `SUBMIT ${title.toUpperCase()}`;
					swalText  = "Are you sure to submit this document?";
					swalImg   = `${base_url}assets/modal/add.svg`;
					break;
				case "approve":
					swalTitle = `APPROVE ${title.toUpperCase()}`;
					swalText  = "Are you sure to approve this document?";
					swalImg   = `${base_url}assets/modal/approve.svg`;
					break;
				case "reject":
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
			Swal.fire({
				title:              swalTitle,
				text:               swalText,
				imageUrl:           swalImg,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes",
				// allowOutsideClick:  false,
			}).then((result) => {
				if (result.isConfirmed) {
					if (method != "cancel") {

						const feedback = data["feedback"].split("-");
						const overrideSuccessConfirmation = feedback[2] == "00000" && `${feedback[0]}-${feedback[1]}`;

						let saveData = saveFormData(
							action,
							method,
							data,
							isObject,
							swalTitle,
							overrideSuccessConfirmation
						);
						saveData.then((res) => {
							if (res) {
								callback && callback();
								if (aFunctions) {
									aFunctions(...aArguments);
								}

								if (method == "approve" || method == "reject") {
									$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
								}

								if (notificationData) {
									if (Object.keys(notificationData).includes("tableID")) {
										insertNotificationData(notificationData);
									} else {
										const insertedID = res.split("|")[2];
										notificationData["tableID"] = insertedID;
										insertNotificationData(notificationData);
									}
								}

								let id     = res.split("|")[2] ?? data["tableData[pettyCashRequestID]"] ?? 0;
								let status = data["tableData[pettyCashRequestStatus]"] ?? 0;
								if (id && status == 2) {
									insertLiquidation(id);
								}

							} else {
								Swal.fire({
									icon:             "danger",
									title:            "Failed!",
									text:              res[1],
									showConfirmButton: false,
									timer:             2000,
								});
							}
						});
					} else {
						Swal.fire({
							icon:              "success",
							title:             swalTitle,
							showConfirmButton: false,
							timer:             2000,
						});
					}
				} else {
					containerID && $("#" + containerID).show();
					modalID && $("#" + modalID).modal("show");
					if (method == "save" && result.dismiss == "cancel") {
						callback && callback();
					}
				}
			});
		} else {
			showNotification("danger", "Invalid arguments!");
		}
	}
	// ----- END FORM/DOCUMENT CONFIRMATION -----


	// ----- CANCEL FORM -----
	function customCancelForm(
		method        = "",
		action        = "",
		title         = "",
		modalID       = "",
		containerID   = "",
		data          = null,
		isObject      = true,
		callback      = false,
		buttonElement = null
	) {
		buttonElement && formButtonHTML(buttonElement, false);

		if (method && action && title && (modalID || containerID)) {
			modalID && $("#" + modalID).modal("hide");

			Swal.fire({
				title:              `SAVE AS DRAFT`,
				text:               `Do you want to save your changes for filing this ${title.toLowerCase()}?`,
				imageUrl:           `${base_url}assets/modal/add.svg`,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes",
				// allowOutsideClick: false,
			}).then((result) => {
				if (result.isConfirmed) {
					const feedback = data["feedback"].split("-");
					const overrideSuccessConfirmation = feedback[2] == "00000" && `${feedback[0]}-${feedback[1]}`;

					let saveData = saveFormData(
						action,
						method,
						data,
						isObject,
						`SAVE ${title.toUpperCase()}`,
						overrideSuccessConfirmation
					);
					saveData.then((res) => {
						if (res) {
							callback && callback();
						} else {
							Swal.fire({
								icon:             "danger",
								title:            "Failed!",
								text:              res[1],
								showConfirmButton: false,
								timer:             2000,
							});
						}
					});

				} else {
					if (result.dismiss === "cancel") {
						modalID && $("#" + modalID).modal("hide");
						containerID && $("#" + containerID).hide();
						callback && callback();
					}
				}
			});
		} else {
			showNotification("danger", "Invalid arguments");
		}
	}
	// ----- END CANCEL FORM -----
	

})