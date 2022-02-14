$(document).ready(function() {

	const MODULE_ID     = 132;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing    = false;

	let oldReceiptFilename = [], newReceiptFilename = [], newReceiptFiles = [];


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("liquidation");
	// ----- END MODULE APPROVER -----


	// ----- GLOBAL VARIABLES -----
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// ----- END GLOBAL VARIABLES -----


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
						{ targets: 2,  width: 100 },
						{ targets: 3,  width: 250 },
						{ targets: 4,  width: 150 },
						{ targets: 5,  width: 300 },
						{ targets: 6,  width: 80  },
						{ targets: 7,  width: 300 },
					],
				});
		})
		
		if ($.fn.DataTable.isDataTable("#tableLiquidation")) {
			$("#tableLiquidation").DataTable().destroy();
		}

		let isReadOnly = $("#tableLiquidation").attr("isReadOnly") == "true";
		let columnDefs = isReadOnly ? [
			{ targets: 0,  width: 200 },
			{ targets: 1,  width: 150 },
			{ targets: 2,  width: 150 },
			{ targets: 3,  width: 150 },
			{ targets: 4,  width: 150 },
			{ targets: 5,  width: 150 },
			{ targets: 6,  width: 150 },
			{ targets: 7,  width: 150 },
		] : [
			{ targets: 0,  width: 50  },
			{ targets: 1,  width: 200 },
			{ targets: 2,  width: 150 },
			{ targets: 3,  width: 150 },
			{ targets: 4,  width: 150 },
			{ targets: 5,  width: 150 },
			{ targets: 6,  width: 150 },
			{ targets: 7,  width: 150 },
			{ targets: 8,  width: 150 },
		];

		var table = $("#tableLiquidation")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
				scrollCollapse: true,
				columnDefs
			});
	}
	// ----- END DATATABLES -----


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"fms_liquidation_tbl", 
				"reviseLiquidationID", 
				"reviseLiquidationID IS NOT NULL AND liquidationStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLiquidationID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("fms_liquidation_tbl", "", "liquidationID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					liquidationStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (liquidationStatus == 0 || liquidationStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (liquidationStatus == 0) {
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
			window.history.pushState("", "", `${base_url}fms/liquidation?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/liquidation?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/liquidation?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/liquidation`);
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


	// ----- FOR VIEWING CONTENT -----
	function forViewingContent() {
		$("#tableForViewingParent").html(preloader);

		let liquidation = getTableData(
			`fms_liquidation_tbl AS flt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`flt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`flt.employeeID <> ${sessionID} AND liquidationStatus <> 0 AND liquidationStatus <> 4 AND liquidationStatus = 2`,
			`FIELD(liquidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(flt.submittedAt, flt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForViewing">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
					<th>Purpose</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		liquidation.map((item) => {
			let {
				fullname,
				liquidationID,
				liquidationCode,
				reviseLiquidationID,
				pettyCashRequestID,
				pettyCashRequestCode,
				employeeID,
				voucherID,
				chartOfAccountID,
				liquidationReferenceNumber,
				liquidationAmount,
				liquidationVatAmount,
				liquidationExpenses,
				liquidationBudget,
				liquidationExcessOrShortage,
				liquidationDispositionofExcessOrShortage,
				approversID,
				approversStatus,
				approversDate,
				liquidationPurpose,
				liquidationStatus,
				liquidationRemarks,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
				updatedAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = liquidationStatus == 2 || liquidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = liquidationStatus != 0 ? "btnView" : "btnEdit";
			html += `
			<tr class="${btnClass}" id="${encryptString(liquidationID)}" isForViewing="true">
				<td>${liquidationCode}</td>
				<td>${fullname}</td>
				<td>${pettyCashRequestCode}</td>
				<td>${liquidationPurpose}</td>
				<td>${employeeFullname(getCurrentApprover(approversID, approversDate, liquidationStatus, true))}</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td>${getStatusStyle(liquidationStatus, createdAt == updatedAt)}</td>
				<td>${liquidationRemarks || "-"}</td>
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

		let liquidation = getTableData(
			`fms_liquidation_tbl AS flt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`flt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`flt.employeeID <> ${sessionID} AND liquidationStatus <> 0 AND liquidationStatus <> 4`,
			`FIELD(liquidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(flt.submittedAt, flt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
					<th>Purpose</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		liquidation.map((item) => {
			let {
				fullname,
				liquidationID,
				liquidationCode,
				reviseLiquidationID,
				pettyCashRequestID,
				pettyCashRequestCode,
				employeeID,
				voucherID,
				chartOfAccountID,
				liquidationReferenceNumber,
				liquidationAmount,
				liquidationVatAmount,
				liquidationExpenses,
				liquidationBudget,
				liquidationExcessOrShortage,
				liquidationDispositionofExcessOrShortage,
				approversID,
				approversStatus,
				approversDate,
				liquidationPurpose,
				liquidationStatus,
				liquidationRemarks,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
				updatedAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = liquidationStatus == 2 || liquidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = liquidationStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, liquidationStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(liquidationID)}">
					<td>${liquidationCode}</td>
					<td>${fullname}</td>
					<td>${pettyCashRequestCode}</td>
					<td>${liquidationPurpose}</td>
					<td>${employeeFullname(getCurrentApprover(approversID, approversDate, liquidationStatus, true))}</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td>${getStatusStyle(liquidationStatus, createdAt == updatedAt)}</td>
					<td>${liquidationRemarks || "-"}</td>
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

		let liquidation = getTableData(
			`fms_liquidation_tbl AS flt
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`flt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`,
			`flt.employeeID = ${sessionID}`,
			`FIELD(liquidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(flt.submittedAt, flt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
					<th>Purpose</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		liquidation.map((item) => {
			let {
				fullname,
				liquidationID,
				liquidationCode,
				reviseLiquidationID,
				pettyCashRequestID,
				pettyCashRequestCode,
				employeeID,
				voucherID,
				chartOfAccountID,
				liquidationReferenceNumber,
				liquidationAmount,
				liquidationVatAmount,
				liquidationExpenses,
				liquidationBudget,
				liquidationExcessOrShortage,
				liquidationDispositionofExcessOrShortage,
				approversID,
				approversStatus,
				approversDate,
				liquidationPurpose,
				liquidationStatus,
				liquidationRemarks,
				submittedAt,
				createdBy,
				updatedBy,
				createdAt,
				updatedAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = liquidationStatus == 2 || liquidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = liquidationStatus != 0 ? "btnView" : "btnEdit";

			html += `
			<tr class="${btnClass}" id="${encryptString(liquidationID)}">
				<td>${liquidationCode}</td>
				<td>${fullname}</td>
				<td>${pettyCashRequestCode}</td>
				<td>${liquidationPurpose}</td>
				<td>${employeeFullname(getCurrentApprover(approversID, approversDate, liquidationStatus, true))}</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td>${getStatusStyle(liquidationStatus, createdAt == updatedAt)}</td>
				<td>${liquidationRemarks || "-"}</td>
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


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("fms_liquidation_tbl", "approversID") || allowedShow) {
				let count = getCountForApproval("fms_liquidation_tbl", "liquidationStatus");
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


	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = ``;

		if (data) {
			let {
				liquidationID     = "",
				liquidationStatus = "",
				employeeID        = "",
				approversID       = "",
				approversDate     = "",
				createdAt         = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (liquidationStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						liquidationID="${encryptString(liquidationID)}"
						code="${getFormCode("LF", createdAt, liquidationID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (liquidationStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"
							status="${liquidationStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (liquidationStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	liquidationID="${encryptString(liquidationID)}"
					// 	code="${getFormCode("LF", createdAt, liquidationID)}"
					// 	status="${liquidationStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (liquidationStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(liquidationID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"
							status="${liquidationStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (liquidationStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(liquidationID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"
							status="${liquidationStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (liquidationStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("LF", createdAt, liquidationID)}"><i class="fas fa-ban"></i> 
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
	function getItemRow(item = false, readOnly = false) {
		let {
			liquidationItemID,
			liquidationID,
			description,
			vatSales,
			vat,
			amount,
			client,
			supplier,
			invoice,
			remarks,
		} = item;

		let html = ``;
		if (readOnly) {
			html = `
			<tr>
				<td>${description || ""}</td>
				<td class="text-right">${formatAmount(amount, true)}</td>
				<td class="text-right">${formatAmount(vatSales, true)}</td>
				<td class="text-right">${formatAmount(vat, true)}</td>
				<td>${client || "-"}</td>
				<td>${supplier || "-"}</td>
				<td>${invoice || "-"}</td>
				<td>${remarks || "-"}</td>
			</tr>`;
		} else {
			html = `
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
							value="${description || ""}"
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
								name="amount"
								value="${amount}"
								required>
						</div>
						<div class="d-block invalid-feedback"></div>
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
								min="0" 
								max="999999" 
								minlength="1" 
								maxlength="20"
								value="${vatSales}"
								name="vatSales"
								disabled>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<div class="input-group">
							<div class="input-group-prepend">
								<!-- <span class="input-group-text">₱</span> -->
								<div class="input-group-text">
									<input type="checkbox" name="hasVat" ${+vat ? "checked" : ""}>
								</div>
							</div>
							<input 
								type="text" 
								class="form-control amount text-right"
								min="0" 
								max="999999" 
								minlength="1" 
								maxlength="20"
								value="${vat}"
								name="vat"
								disabled>
						</div>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<input type="text"
							class="form-control validate"
							name="client"
							data-allowcharacters="[A-Z][a-z][0-9][ ][-][(][)]['][''][.][,][_]"
							minlength="1"
							maxlength="250"
							value="${client || ""}">
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<input type="text"
							class="form-control validate"
							name="supplier"
							data-allowcharacters="[A-Z][a-z][0-9][ ][-][(][)]['][''][.][,][_]"
							minlength="1"
							maxlength="250"
							value="${supplier || ""}">
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<input type="text"
							class="form-control validate"
							name="invoice"
							data-allowcharacters="[A-Z][a-z][0-9][ ][-][(][)]['][''][.][,][_]"
							minlength="1"
							maxlength="250"
							value="${invoice || ""}">
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<input type="text"
							class="form-control validate"
							name="remarks"
							data-allowcharacters="[A-Z][a-z][0-9][ ][-][(][)]['][''][.][,][_]"
							minlength="1"
							maxlength="250"
							value="${remarks || ""}">
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
			</tr>`;
		}

		return html;
	}
	// ----- END ITEM ROW -----


	// ----- LIQUIDATION TABLE -----
	function getLiquidationTable(data = false, readOnly = false) {
		let {
			liquidationID,
			liquidationCode,
			reviseLiquidationID,
			reviseLiquidationCode,
			pettyCashRequestID,
			pettyCashRequestCode,
			employeeID,
			liquidationTotalExpense,
			liquidationVatSales,
			liquidationVat,
			liquidationBudget,
			liquidationExcessShortage,
			liquidationDispositionExcessShortage,
			liquidationReceipt,
			approversID,
			approversStatus,
			approversDate,
			liquidationPurpose,
			liquidationStatus,
			liquidationRemarks,
			submittedAt,
			createdBy,
			updatedBy,
			createdAt,
		} = data && data[0];

		let tbodyHTML = '';
		if (data) {
			let items = getTableData(`fms_liquidation_items_tbl WHERE liquidationID = ${liquidationID}`);
			if (items && items.length) {
				items.map(item => {
					tbodyHTML += getItemRow(item, readOnly);
				})
			} else {
				tbodyHTML = getItemRow();
			}
		} else {
			tbodyHTML = getItemRow();
		}

		let tableCheckbox = !readOnly ? `<th class="text-center"><input type="checkbox" class="checkboxall"></th>` : "";
		let tfootHTML = !readOnly ? `
		<tfoot>
			<tr>
				<td colspan="${readOnly ? 8 : 9}">
					<button class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
					<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
				</td>
			</tr>
		</tfoot>` : "";

		let html = `
		<div class="card my-3">
			<div class="card-header bg-dark text-white">
				<h5 class="font-weight-bold mb-0">Liquidation</h5>
			</div>
			<div class="card-body">
				<table class="table table-bordered table-striped table-hover" id="tableLiquidation" isReadOnly="${readOnly}">
					<thead>
						<tr>
							${tableCheckbox}
							<th>Description ${!readOnly ? "<code>*</code>" : ""}</th>
							<th>Amount ${!readOnly ? "<code>*</code>" : ""}</th>
							<th>VAT Sales</th>
							<th>VAT</th>
							<th>Client</th>
							<th>Supplier</th>
							<th>Invoice No.</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody id="tableLiquidationTbody">
						${tbodyHTML}
					</tbody>
					${tfootHTML}
				</table>

				<div class="row mt-2">
					<div class="offset-md-8 col-md-4 col-sm-12">
						<div class="d-flex justify-content-between align-items-center">
							<div>Total Expenses</div>
							<div class="font-weight-bold" id="liquidationTotalExpense">${formatAmount(liquidationTotalExpense, true)}</div>
						</div>
					</div>
					<div class="offset-md-8 col-md-4 col-sm-12">
						<div class="d-flex justify-content-between align-items-center">
							<div>VAT Sales</div>
							<div class="font-weight-bold" id="liquidationVatSales">${formatAmount(liquidationVatSales, true)}</div>
						</div>
					</div>
					<div class="offset-md-8 col-md-4 col-sm-12">
						<div class="d-flex justify-content-between align-items-center">
							<div>VAT</div>
							<div class="font-weight-bold" id="liquidationVat">${formatAmount(liquidationVat, true)}</div>
						</div>
					</div>
					<div class="offset-md-8 col-md-4 col-sm-12">
						<div class="d-flex justify-content-between align-items-center">
							<div>Budget</div>
							<div class="font-weight-bold" id="liquidationBudget">${formatAmount(liquidationBudget, true)}</div>
						</div>
					</div>
					<div class="offset-md-8 col-md-4 col-sm-12">
						<div class="d-flex justify-content-between align-items-center">
							<div>Excess/Shortage</div>
							<div class="font-weight-bold" id="liquidationExcessShortage">${formatAmount(liquidationExcessShortage, true)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;

		return html;
	}
	// ----- END LIQUIDATION TABLE -----


	// ----- PETTY CASH VOUCHER -----
	function getPettyCashVoucher(data = false) {
		let { pettyCashVoucherID } = data && data[0];

		let pettyCashVoucher = getTableData(`fms_petty_cash_voucher_tbl WHERE pettyCashVoucherID = ${pettyCashVoucherID}`);
		let {
			pettyCashVoucherCode,
			requestedAmount,
			totalAmount,
			remainingBalance,
			pettyCashVoucherReason,
		} = pettyCashVoucher && pettyCashVoucher[0];

		let html = `
		<div class="card my-3">
			<div class="card-header bg-dark text-white">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="font-weight-bold mb-0">Petty Cash Voucher</h5>
					<div class="font-weight-bold" style="letter-spacing: 1.2px;">${pettyCashVoucherCode || "-"}</div>
				</div>
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Description</label>
							<textarea class="form-control"
								name="pettyCashVoucherReason"
								style="resize: none;"
								disabled>${pettyCashVoucherReason || "-"}</textarea>
						</div>
					</div>
					<div class="col-md-4 col-sm-12">
						<div class="form-group">
							<label>Requested Amount</label>
							<input type="text"
								class="form-control text-right"
								name="requestedAmount"
								value="${requestedAmount ? formatAmount(requestedAmount, true) : "-"}"
								disabled>
						</div>
					</div>
					<div class="col-md-4 col-sm-12">
						<div class="form-group">
							<label>Total Amount</label>
							<input type="text"
								class="form-control text-right"
								name="totalAmount"
								value="${totalAmount ? formatAmount(totalAmount, true) : "-"}"
								disabled>
						</div>
					</div>
					<div class="col-md-4 col-sm-12">
						<div class="form-group">
							<label>Balance</label>
							<input type="text"
								class="form-control text-right"
								name="remainingBalance"
								value="${remainingBalance ? formatAmount(remainingBalance, true) : "-"}"
								disabled>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		return html;
	}
	// ----- END PETTY CASH VOUCHER -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		oldReceiptFilename = [], newReceiptFilename = [], newReceiptFiles = [];

		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		
		let {
			liquidationID,
			liquidationCode,
			reviseLiquidationID,
			reviseLiquidationCode,
			pettyCashRequestID,
			pettyCashRequestCode,
			employeeID,
			liquidationTotalExpense,
			liquidationVatSales,
			liquidationVat,
			liquidationBudget,
			liquidationExcessShortage,
			liquidationDispositionExcessShortage,
			liquidationReceipt,
			approversID,
			approversStatus,
			approversDate,
			liquidationPurpose,
			liquidationStatus,
			liquidationRemarks,
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

		$("#btnBack").attr("liquidationID", encryptString(liquidationID));
		$("#btnBack").attr("code", getFormCode("LF", moment(createdAt), liquidationID));
		$("#btnBack").attr("status", liquidationStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";

		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? liquidationID : reviseLiquidationID;
		let documentHeaderClass = isRevise || reviseLiquidationID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseLiquidationID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseLiquidationID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("LF", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let inputReceipt = !disabled ? `
		<input type="file"
			name="liquidationReceipt"
			id="liquidationReceipt"
			class="form-control"
			accept="image/*, .pdf, .docx, .doc"
			multiple="multiple"
			filename="${liquidationReceipt}">` : "";

		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${liquidationID && !isRevise ? getFormCode("LF", createdAt, liquidationID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${liquidationStatus && !isRevise ? getStatusStyle(liquidationStatus, createdAt == updatedAt) : "---"}
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
								${getDateApproved(liquidationStatus, approversID, approversDate)}
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
							${liquidationRemarks && !isRevise ? liquidationRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

		<div class="row" id="form_liquidation">
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Reference No.</label>
					<input type="text" class="form-control" disabled value="${pettyCashRequestCode || "-"}">
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Requestor</label>
					<input type="text" class="form-control" disabled value="${employeeFullname}">
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Position</label>
					<input type="text" class="form-control" disabled value="${employeeDesignation}">
				</div>
			</div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Department</label>
					<input type="text" class="form-control" disabled value="${employeeDepartment}">
				</div>
			</div>
			<div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="liquidationPurpose"
                        name="liquidationPurpose"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${liquidationPurpose || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-liquidationPurpose"></div>
                </div>
            </div>
			<div class="col-12">
				<div class="form-group">
					<label>Upload Receipt ${!disabled ? "<code>*</code>" : ""}</label>
					${inputReceipt}
					<div class="d-block invalid-feedback" id="invalid-liquidationReceipt"></div>
					<div class="row display-image-parent" id="displayFile">
						${displayFile(liquidationReceipt, readOnly)}
					</div>
				</div>
			</div>

			<div class="col-12">${getLiquidationTable(data, readOnly)}</div>

			<div class="col-12">
				<div class="form-group">
					<label>Disposition of Excess/Shortage</label>
					<textarea class="form-control validate"
						name="liquidationDispositionExcessShortage"
						data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][''][-][_][(][)][%][&][*][ ]"
						minlength="0"
						maxlength="255"
						style="resize: none;"
						id="liquidationDispositionExcessShortage"
						${disabled}>${liquidationDispositionExcessShortage || ""}</textarea>
					<div class="d-block invalid-feedback" id="invalid-liquidationDispositionExcessShortage"></div>
				</div>
			</div>

			<div class="col-12">${getPettyCashVoucher(data)}</div>

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
			initDataTables();
			updateTableInputs();

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

			headerButton(true, "Add Liquidation");
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


	// ----- UPDATE TABLE INPUTS -----
	function updateTableInputs() {
		$("#tableLiquidation").find(`input, select, textarea`).each(function(i) {
			$parent  = $(this).closest(".form-group");
			$invalid = $parent.find(".invalid-feedback");

			let name = $(this).attr("name");
			$(this).attr("id", name+i);
			$parent.attr("id", `invalid-${name+i}`);
		})
	}
	// ----- END UPDATE TABLE INPUTS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let count = 0;
		$(".checkboxrow").each(function() {
			this.checked && count++;
		})
		$(".btnDeleteRow").attr("disabled", count == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow() {
		if ($(`.checkboxrow:checked`).length != $(`.checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE ROWS",
				text:               "Are you sure to delete these rows?",
				imageUrl:           `${base_url}assets/modal/delete.svg`,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes"
			}).then((result) => {
				if (result.isConfirmed) {
					$(`.checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableInputs();
							updateDeleteButton();
							updateCostSummary();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----


	// ----- UPDATE COST SUMMARY -----
	function updateCostSummary() {
		let totalVatSales = [...$(`[name="vatSales"]`).map((i, x) => +x.value.replaceAll(",", ""))].reduce((a,b) => a+b, 0);
		let totalVat      = [...$(`[name="vat"]`).map((i, x) => +x.value.replaceAll(",", ""))].reduce((a,b) => a+b, 0);
		let totalAmount   = [...$(`[name="amount"]`).map((i, x) => +x.value.replaceAll(",", ""))].reduce((a,b) => a+b, 0);
		let totalBudget   = +$("#liquidationBudget").text().trim().replaceAll(",", "").replaceAll("₱", "");
		let totalExcessShortage = totalBudget - totalAmount;

		$("#liquidationTotalExpense").text(formatAmount(totalAmount, true));
		$("#liquidationVatSales").text(formatAmount(totalVatSales, true));
		$("#liquidationVat").text(formatAmount(totalVat, true));
		$("#liquidationExcessShortage").text(formatAmount(totalExcessShortage, true));
	}
	// ----- END UPDATE COST SUMMARY -----


	// ----- DISPLAY FILE -----
    function displayFile(file = null, readOnly = false, blob = "", link = true, oldFiles = true) {
        let html = ``;
        if (file && file != null && file != "null") {
			let fileArr = file.split("|");
			fileArr.forEach(receiptFile => {
				if (oldFiles) oldReceiptFilename.push(receiptFile);
				
				let fileType = receiptFile.split(".");
					fileType = fileType[fileType.length-1].toLowerCase();
				let imageExtensions = ["jpg", "png", "jpeg", "gif"];
				let isFileImage = imageExtensions.includes(fileType);
				let targetAttr = isFileImage ? `display="true" blob="${blob}"` : (oldFiles ? `target="_blank"` : "");

				let otherAttr = link ? `href="${base_url+"assets/upload-files/liquidation/"+receiptFile}"` : `href="javascript:void(0)"`;
				let buttonRemove = !readOnly ? `
				<span class="btnRemoveFile pr-2 display-image-remove"
					filename="${receiptFile}">
					<i class="fas fa-close"></i>
				</span>` : "";

				html += `
				<div class="col-md-4 col-sm-12 display-image-content">
					<div class="display-image">
						<div class="d-flex justify-content-start align-items-center p-0">
							${buttonRemove}
							<a class="filename display-image-filename"
								title="${receiptFile}"
								${otherAttr}
								${targetAttr}>
								${receiptFile}
							</a>
						</div>
					</div>
				</div>`;
			})
        }
        return html;
    }
    // ----- END DISPLAY FILE -----


	// ----- GET LIQUIDATION DATA -----
	function getLiquidationData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

		let data = new FormData();
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data.append("liquidationID", id);

			if (status != "2") {
				data.append("liquidationStatus", status);
			}
		}

		data.append("action", action);
		data.append("method", method);
		data.append("updatedBy", sessionID);

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data.append("employeeID", sessionID);
			data.append("liquidationPurpose", $(`[name="liquidationPurpose"]`).val()?.trim());
			data.append("liquidationDispositionExcessShortage", $(`[name="liquidationDispositionExcessShortage"]`).val()?.trim());
			data.append("liquidationTotalExpense", $(`#liquidationTotalExpense`).text()?.trim().replaceAll(",", "").replaceAll("₱", ""));
			data.append("liquidationVatSales", $(`#liquidationVatSales`).text()?.trim().replaceAll(",", "").replaceAll("₱", ""));
			data.append("liquidationVat", $(`#liquidationVat`).text()?.trim().replaceAll(",", "").replaceAll("₱", ""));
			data.append("liquidationBudget", $(`#liquidationBudget`).text()?.trim().replaceAll(",", "").replaceAll("₱", ""));
			data.append("liquidationExcessShortage", $(`#liquidationExcessShortage`).text()?.trim().replaceAll(",", "").replaceAll("₱", ""));

			if (action == "insert") {
				data.append("createdBy", sessionID);
				data.append("createdAt", dateToday());
			} else if (action == "update") {
				data.append("liquidationID", id);
			}

			if (method == "submit") {
				data.append("submittedAt", dateToday());
				if (approversID) {
					data.append("approversID", approversID);
					data.append("liquidationStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data.append("approversID", sessionID);
					data.append("approversStatus", 2);
					data.append("approversDate", dateToday());
					data.append("liquidationStatus", 2);
				}
			}

			$("#tableLiquidation tbody tr").each(function(i) {
				let description = $(`[name="description"]`, this).val()?.trim();
				let vatSales    = $(`[name="vatSales"]`, this).val()?.trim().replaceAll(",", "").replaceAll("₱", "");
				let vat         = $(`[name="vat"]`, this).val()?.trim().replaceAll(",", "").replaceAll("₱", "");
				let amount      = $(`[name="amount"]`, this).val()?.trim().replaceAll(",", "").replaceAll("₱", "");
				let client      = $(`[name="client"]`, this).val()?.trim();
				let supplier    = $(`[name="supplier"]`, this).val()?.trim();
				let invoice     = $(`[name="invoice"]`, this).val()?.trim();
				let remarks     = $(`[name="remarks"]`, this).val()?.trim();

				data.append(`items[${i}][description]`, description);
				data.append(`items[${i}][vatSales]`, vatSales);
				data.append(`items[${i}][vat]`, vat);
				data.append(`items[${i}][amount]`, amount);
				data.append(`items[${i}][client]`, client);
				data.append(`items[${i}][supplier]`, supplier);
				data.append(`items[${i}][invoice]`, invoice);
				data.append(`items[${i}][remarks]`, remarks);
			})
		} 

		// ----- FILES -----
		data.append("uploadFileFolder", "liquidation");
		data.append("uploadFileColumnName[0]", "liquidationReceipt");
		data.append("uploadFileNewFilename[0]", newReceiptFilename.join("|"));
		data.append("uploadFileOldFilename[0]", oldReceiptFilename.join("|"));
		newReceiptFiles.map((file, index) => {
			data.append(`uploadFiles[0][${index}]`, file);
		})
		// ----- FILES -----

		return data;
	}
	// ----- END GET LIQUIDATION DATA -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated").removeClass("is-valid").removeClass("no-error");
		$(`[name="liquidationReceipt"]`).removeClass("validated").removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


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


	// ----- BUTTON ADD ROW -----
    $(document).on("click", ".btnAddRow", function() {
        let row = getItemRow();
		updateTableInputs();
		$("#tableLiquidation tbody").append(row);
		updateTableInputs();
		initAmount();
    })
    // ----- END BUTTON ADD ROW -----


	// ----- CHECKBOX -----
	$(document).on("click", "[type=checkbox]", function() {
		updateDeleteButton();
	})
	// ----- END CHECKBOX -----


	// ----- CHECK ALL -----
	$(document).on("change", ".checkboxall", function() {
		const isChecked = $(this).prop("checked");
		$(".checkboxrow").each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


	// ----- BUTTON DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
	})
	// ----- END BUTTON DELETE ROW -----


	// ----- KEYUP AMOUNT -----
	function updateVatAmount($parent = '') {
		let amount = +$parent.find(`[name="amount"]`).val()?.replaceAll(",", "");
		let hasVat = $parent.find(`[name="hasVat"]`).prop("checked");
		let vatAmount = hasVat ? (amount * 0.12) : 0;
		let vatSales  = hasVat ? (amount - vatAmount) : amount;
		$parent.find(`[name="vat"]`).val(formatAmount(vatAmount));
		$parent.find(`[name="vatSales"]`).val(formatAmount(vatSales));
		updateCostSummary();
	}

	$(document).on("change", `[name="hasVat"]`, function() {
		$parent = $(this).closest("tr");
		updateVatAmount($parent);
	})

	$(document).on("keyup", `[name="amount"], [name="vatSales"], [name="vat"]`, function() {
		$parent = $(this).closest("tr");
		updateVatAmount($parent);
		updateCostSummary();
	})
	// ----- END KEYUP AMOUNT -----


	// ----- UPLOAD RECEIPT -----
	$(document).on("change", `[name="liquidationReceipt"]`, function() {
		let countFiles = oldReceiptFilename.length + newReceiptFilename.length;
		if (this.files && this.files[0]) {
			let files = this.files;
			let filesLength = this.files.length;
			for (var i=0; i<filesLength; i++) {
				countFiles++;

				const filesize = files[i].size/1024/1024; // Size in MB
				const filetype = files[i].type;
				const filename = files[i].name;
				const fileArr  = filename.split(".");
				const name     = fileArr?.[0];
				const type     = fileArr?.[fileArr.length-1]?.toLowerCase();
				const displayName = `${name}${countFiles}.${type}`;
				if (filesize > 10) {
					showNotification("danger", `${filename} - File size must be less than or equal to <b>10mb</b>`);
				} else if (!["png", "jpg", "jpeg", "doc", "docx", "pdf"].includes(type)) {
					showNotification("danger", `${filename} - <b>Invalid file type</b>`);
				} else {
					newReceiptFilename.push(displayName);
					newReceiptFiles.push(files[i]);
					let blob = URL.createObjectURL(files[i]);
					$(`#displayFile`).append(displayFile(displayName, false, blob, true, false));
				}
			}
			$(this).val("");
        }
	})
	// ----- END UPLOAD RECEIPT -----


	// ----- MODAL IMAGE -----
	$(document).on("click", `.display-image-filename`, function(e) {
		let display = $(this).attr("display") == "true";
		let source  = $(this).attr("blob") || $(this).attr("href");
		if (display) {
			e.preventDefault();
			$("#display-image-preview").attr("src", source);
			$("#display-image-modal").modal("show");
		}
	})
	// ----- END MODAL IMAGE -----


	// ----- REMOVE FILE -----
	$(document).on("click", `.btnRemoveFile`, function() {
		const filename     = $(this).attr("filename");
		const newFileIndex = newReceiptFilename.indexOf(filename);
		const oldFileIndex = oldReceiptFilename.indexOf(filename);

		newFileIndex != -1 && newReceiptFilename.splice(newFileIndex, 1);
		newFileIndex != -1 && newReceiptFiles.splice(newFileIndex, 1);
		oldFileIndex != -1 && oldReceiptFilename.splice(oldFileIndex, 1);

		$display = $(this).closest(".display-image-content");
		$display.fadeOut(500, function() {
			$display.remove();
		})
    })
    // ----- END REMOVE FILE -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("liquidationID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("LF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getLiquidationData(action, "save", "0", id);
				data.append("liquidationStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseLiquidationID", id);
					data.delete("liquidationID");
				} else {
					data.append("liquidationID", id);
					data.delete("action");
					data.append("action", "update");
				}
	
				saveLiquidation(data, "save", null, pageContent);
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
			const data   = getLiquidationData(action, "save", "0", id);
			data.append("liquidationStatus", 0);

			saveLiquidation(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("LF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getLiquidationData(action, "save", "0", id);
		data["liquidationStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseLiquidationID", id);
				data.delete("liquidationID");
			} else {
				data.append("liquidationID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		saveLiquidation(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_liquidation");
		let countFiles = oldReceiptFilename.length + newReceiptFilename.length;
		removeIsValid();
		
		if (countFiles) {
			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getLiquidationData(action, "submit", "1", id);
	
				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("reviseLiquidationID", id);
						data.delete("liquidationID");
					}
				}
	
				let approversID = "", approversDate = "";
				for (var i of data) {
					if (i[0] == "approversID")   approversID   = i[1];
					if (i[0] == "approversDate") approversDate = i[1];
				}
	
				const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
				let notificationData = false;
				if (employeeID != sessionID) {
					notificationData = {
						moduleID:                MODULE_ID,
						notificationTitle:       "Liquidation",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
	
				saveLiquidation(data, "submit", notificationData, pageContent);	
			}
		} else {
			showNotification("danger", "Please upload a receipts.");
			$(`[name="liquidationReceipt"]`).focus();
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("liquidationID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getLiquidationData(action, "cancelform", "4", id, status);

		saveLiquidation(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("LF", dateToday(), id);
		let tableData  = getTableData("fms_liquidation_tbl", "", "liquidationID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getLiquidationData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate);
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("liquidationStatus", status);

			saveLiquidation(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("LF", dateToday(), id);

		$("#modal_liquidation_content").html(preloader);
		$("#modal_liquidation .page-title").text("DENY LIQUIDATION");
		$("#modal_liquidation").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
					minlength="2"
					maxlength="250"
					id="liquidationRemarks"
					name="liquidationRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-liquidationRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			liquidationID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_liquidation_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("LF", dateToday(), id);

		const validate = validateForm("modal_liquidation");
		if (validate) {
			let tableData = getTableData("fms_liquidation_tbl", "", "liquidationID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData();
				data.append("action", "update");
				data.append("method", "deny");
				data.append("liquidationID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("liquidationRemarks", $("[name=liquidationRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                MODULE_ID,
					tableID: 				 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveLiquidation(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("liquidationID"));
		let data = new FormData();
		data.append("liquidationID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveLiquidation(data, "drop", null, pageContent);
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





	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Liquidation";
		let swalText, swalImg;

		$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("hide");

		switch (method) {
			case "save":
				swalTitle = `SAVE ${title.toUpperCase()}`;
				swalText  = "Are you sure to save this document?";
				swalImg   = `${base_url}assets/modal/draft.svg`;
				break;
			case "submit":
				swalText  = "Are you sure to submit this liquidation?";
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

	function saveLiquidation(data = null, method = "submit", notificationData = null, callback = null) {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$("#loader").show();

					setTimeout(() => {
						$.ajax({
							method:      "POST",
							url:         `liquidation/saveLiquidation`,
							data,
							processData: false,
							contentType: false,
							global:      false,
							cache:       false,
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
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} submitted successfully!`;
								} else if (method == "save") {
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} saved successfully!`;
								} else if (method == "cancelform") {
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} cancelled successfully!`;
								} else if (method == "approve") {
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} approved successfully!`;
								} else if (method == "deny") {
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} denied successfully!`;
								} else if (method == "drop") {
									swalTitle = `${getFormCode("LF", dateCreated, insertedID)} dropped successfully!`;
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
							$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("show");
						}
					}
				}
			});

			
		}
		return false;
	}
	// --------------- END DATABASE RELATION ---------------

})