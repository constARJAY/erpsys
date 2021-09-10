$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(47);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase order");
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
				"ims_purchase_order_tbl", 
				"revisePurchaseOrderID", 
				"revisePurchaseOrderID IS NOT NULL AND purchaseOrderStatus != 4");

			return revisedDocumentsID.map(item => item.revisePurchaseOrderID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData(
				`ims_purchase_order_tbl AS ipot
					LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)`, 
				`ipot.*, iprt.timelineBuilderID, iprt.referenceCode, iprt.purchaseRequestReason, iprt.createdAt AS iprtCreatedAt`, 
				"purchaseOrderID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					purchaseOrderStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (purchaseOrderStatus == 0 || purchaseOrderStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (purchaseOrderStatus == 0) {
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
					const isAllowed = isCreateAllowed(46);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/purchase_order?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/purchase_order?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/purchase_order?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/purchase_order`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const chartAccountList = getTableData(
		`fms_chart_of_accounts_tbl`,
		`chartOfAccountID, accountName`,
		`accountStatus = 1`
	);
	// END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
		const activateDatatable = (elementID = null, options = {}) => {
			if ($.fn.DataTable.isDataTable(`#${elementID}`)) {
				$(`#${elementID}`).DataTable().destroy();
			}

			var table = $(`#${elementID}`)
				.css({ "min-width": "100%" })
				.removeAttr("width")
				.DataTable(options);
		}

		const headerOptions = {
			proccessing: false,
			serverSide: false,
			scrollX: true,
			sorting: [],
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 100 },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 100 },
				{ targets: 3,  width: 150 },
				{ targets: 4,  width: 260 },
				{ targets: 5,  width: 300 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 250 },
				{ targets: 8,  width: 80  },
				{ targets: 9,  width: 180 },
			],
		};

		const bodyOptions = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 50  },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 150 },
				{ targets: 4,  width: 50  },
				{ targets: 5,  width: 100 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 150 },
				{ targets: 8,  width: 180 },
				{ targets: 9,  width: 200 },
			],
		};

		const bodyOptionsWithoutCheckbox = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 150 },
				{ targets: 3,  width: 50  },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 180 },
				{ targets: 8,  width: 200 },
			],
		};

		const bodyOptionsWithoutClassificationAndCheckbox = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 50  },
				{ targets: 3,  width: 100 },
				{ targets: 4,  width: 150 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 180 },
				{ targets: 7,  width: 200 },
			],
		};

		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));
		$(`.requestItemTable`).each(function() {
			const elementID = $(this).attr("id");
			const readOnly  = $(this).attr("isReadOnly") == "true";
			const materialEquipment = $(this).attr("isMaterialEquipment") == "true";
			let options = bodyOptions;
			if (materialEquipment) {
				options = readOnly ? bodyOptionsWithoutClassificationAndCheckbox : bodyOptionsWithoutCheckbox;
			} else {
				options = readOnly ? bodyOptionsWithoutCheckbox : bodyOptions;
			}

			activateDatatable(elementID, options);
		})	
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_purchase_order_tbl", "approversID")) {
				let count = getCountForApproval("ims_purchase_order_tbl", "purchaseOrderStatus");
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


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(47)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let purchaseOrderData = getTableData(
			`ims_purchase_order_tbl AS ipot 
				LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)
				LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)
				LEFT JOIN hris_employee_list_tbl AS helt ON ipot.employeeID = helt.employeeID`,
			`ipot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ipot.createdAt AS dateCreated, ibrt.bidRecapID, ibrt.createdAt AS ibrtCreatedAt, iprt.createdAt AS iprtCreatedAt`,
			`ipot.employeeID != ${sessionID} AND ipot.purchaseOrderStatus != 0 AND ipot.purchaseOrderStatus != 4`,
			`FIELD(purchaseOrderStatus, 0, 1, 3, 2, 4, 5), COALESCE(ipot.submittedAt, ipot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Reference No.</th>
                    <th>Purchase Request Code</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

			purchaseOrderData.map((item) => {
			let {
				fullname,
				purchaseOrderID,
				bidRecapID,
				ibrtCreatedAt,
				purchaseRequestID,
				iprtCreatedAt,
                timelineBuilderID,
				projectCode,
				projectName,
                referenceCode,
				approversID,
				approversDate,
				purchaseOrderStatus,
				purchaseOrderRemarks,
				purchaseOrderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = purchaseOrderRemarks ? purchaseOrderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseOrderStatus == 2 || purchaseOrderStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseOrderStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, purchaseOrderStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(purchaseOrderID )}">
					<td>${getFormCode("PO", createdAt, purchaseOrderID )}</td>
					<td>${fullname}</td>
					<td>${bidRecapID ? getFormCode("BRF", ibrtCreatedAt, bidRecapID) : "-"}</td>
					<td>${purchaseRequestID ? getFormCode("PR", iprtCreatedAt, purchaseRequestID) : "-"}</td>
					<td>
						<div>
							${projectCode || '-'}
						</div>
						<small style="color:#848482;">${purchaseOrderReason || '-'}</small>
					</td>
					<td>${projectName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseOrderStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(purchaseOrderStatus)}
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
			return html;
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let purchaseOrderData = getTableData(
			`ims_purchase_order_tbl AS ipot 
				LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)
				LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)
				LEFT JOIN hris_employee_list_tbl AS helt ON ipot.employeeID = helt.employeeID`,
			`ipot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ipot.createdAt AS dateCreated, ibrt.bidRecapID, ibrt.createdAt AS ibrtCreatedAt, iprt.createdAt AS iprtCreatedAt`,
			`ipot.employeeID = ${sessionID}`,
			`FIELD(purchaseOrderStatus, 0, 1, 3, 2, 4, 5), COALESCE(ipot.submittedAt, ipot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Reference No.</th>
                    <th>Purchase Request Code</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

			purchaseOrderData.map((item) => {
			let {
				fullname,
				purchaseOrderID,
				bidRecapID,
				ibrtCreatedAt,
				purchaseRequestID,
				iprtCreatedAt,
                timelineBuilderID,
                projectCode,
                projectName,
                referenceCode,
				approversID,
				approversDate,
				purchaseOrderStatus,
				purchaseOrderRemarks,
				purchaseOrderReason,
				submittedAt,
				createdAt,
			} = item;
			
			let remarks       = purchaseOrderRemarks ? purchaseOrderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseOrderStatus == 2 || purchaseOrderStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseOrderStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseOrderID )}">
                <td>${getFormCode("PO", createdAt, purchaseOrderID )}</td>
                <td>${fullname}</td>
				<td>${bidRecapID ? getFormCode("BRF", ibrtCreatedAt, bidRecapID) : "-"}</td>
				<td>${purchaseRequestID ? getFormCode("PR", iprtCreatedAt, purchaseRequestID) : "-"}</td>
				<td>
					<div>
						${projectCode || '-'}
					</div>
					<small style="color:#848482;">${purchaseOrderReason || '-'}</small>
				</td>
				<td>${projectName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseOrderStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseOrderStatus)}
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
				purchaseOrderID     = "",
				purchaseOrderStatus = "",
				employeeID          = "",
				approversID         = "",
				approversDate       = "",
				createdAt           = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (purchaseOrderStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						purchaseOrderID="${encryptString(purchaseOrderID)}"
						code="${getFormCode("P0", createdAt, purchaseOrderID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}"
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (purchaseOrderStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							status="${purchaseOrderStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (purchaseOrderStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						purchaseOrderID="${encryptString(purchaseOrderID)}"
						code="${getFormCode("P0", createdAt, purchaseOrderID)}"
						status="${purchaseOrderStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (purchaseOrderStatus == 3) {
					// DENIED - FOR REVISE
					const data = getTableData(
						`ims_purchase_order_tbl`,
						`bidRecapID, inventoryVendorID`,
						`purchaseOrderID = ${purchaseOrderID}`,
					);
					const { bidRecapID, inventoryVendorID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_purchase_order_tbl`,
						`purchaseOrderID`,
						`bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID} AND purchaseOrderStatus <> 3 AND purchaseOrderStatus <> 4`
					);

					if (!isDocumentRevised(purchaseOrderID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							status="${purchaseOrderStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (purchaseOrderStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_purchase_order_tbl`,
						`bidRecapID, inventoryVendorID`,
						`purchaseOrderID = ${purchaseOrderID}`,
					);
					const { bidRecapID, inventoryVendorID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_purchase_order_tbl`,
						`purchaseOrderID`,
						`bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID} AND purchaseOrderStatus <> 3 AND purchaseOrderStatus <> 4`
					);

					if (!isDocumentRevised(purchaseOrderID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							status="${purchaseOrderStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (purchaseOrderStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							purchaseOrderID="${encryptString(purchaseOrderID)}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET CHART ACCOUNT LIST -----
	function getChartAccountList(argAhartOfAccountID = 0, argAccountName = "", status = 0) {
		let html = "";
		if (status != "2" && status != "5") {
			chartAccountList.map(account => {
				const { chartOfAccountID, accountName } = account;
				html += `
				<option value="${chartOfAccountID}"
					accountName="${accountName}"
					${chartOfAccountID == argAhartOfAccountID ? "selected" : ""}>
					${accountName}
				</option>`;
			})
		} else {
			html = `<option selected>${argAccountName ?? "-"}</option>`;
		}
		return html;
	}
	// ----- END GET CHART ACCOUNT LIST -----


	// ----- GET BID RECAP LIST -----
	function getBidRecapList(id = 0, status = 0, display = true) {
		const createdBRList = [];

		const pendingBidRecap = getTableData(
			`ims_bid_po_tbl AS ibpt 
				LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)`,
			`ibpt.bidRecapID, 
			ibpt.inventoryVendorID, 
			ibpt.categoryType, 
			ibrt.createdAt, 
			ibrt.timelineBuilderID, 
			ibrt.purchaseRequestID, 
			ibrt.bidRecapReason,
			ibrt.projectCode,
			ibrt.projectName,
			ibrt.projectCategory,
			ibrt.clientName,
			ibrt.clientAddress`,
			`ibrt.bidRecapStatus = 2 AND 
			(ibpt.bidPoStatus = 0 ${status == 0 || status == "false" || !status ? "" : "AND ibpt.bidPoStatus = 1"}) OR
			ibpt.bidRecapID = ${id}
			GROUP BY ibpt.bidRecapID`
		);

		let html = ``;
		if (!status || status == 0) {
			html += pendingBidRecap.filter(br => createdBRList.indexOf(br.bidRecapID) == -1 || br.bidRecapID == id).map(br => {
				return `
				<option 
					value     = "${br.bidRecapID}" 
					timelineBuilderID = "${br.timelineBuilderID}"
					purchaseRequestID = "${br.purchaseRequestID}"
					projectCode       = "${br.projectCode}"
					projectName       = "${br.projectName}"
					projectCategory   = "${br.projectCategory}"
					clientName        = "${br.clientName}"
					clientAddress     = "${br.clientAddress}"
					${br.bidRecapID == id && "selected"}>
				${getFormCode("BRF", br.createdAt, br.bidRecapID)}
				</option>`;
			})
		} else {
			html += pendingBidRecap.map(br => {
				return `
				<option 
					value     = "${br.bidRecapID}" 
					timelineBuilderID = "${br.timelineBuilderID}"
					purchaseRequestID = "${br.purchaseRequestID}"
					projectCode       = "${br.projectCode}"
					projectName       = "${br.projectName}"
					projectCategory   = "${br.projectCategory}"
					clientName        = "${br.clientName}"
					clientAddress     = "${br.clientAddress}"
					${br.bidRecapID == id && "selected"}>
					${getFormCode("BRF", br.createdAt, br.bidRecapID)}
				</option>`;
			})
		}
        return display ? html : pendingBidRecap;

	}
	// ----- END GET BID RECAP LIST -----


	// ----- GET INVENTORY VENDOR ON BID RECAP -----
	function getInventoryVendorOnBidRecap(bidRecapID = null, invVendorID = null) {
		let html = `
		<option selected disabled>Select Vendor Code</option>`;
		if (bidRecapID) {
			let vendorTable = getTableData(
				`ims_bid_po_tbl AS ibpt
					LEFT JOIN ims_inventory_vendor_tbl AS iivt USING(inventoryVendorID)
				WHERE 
					ibpt.bidRecapID = ${bidRecapID} AND 
					ibpt.bidPoStatus = 0 OR 
					ibpt.inventoryVendorID = ${invVendorID}
				GROUP BY ibpt.inventoryVendorID`,
				`iivt.*`
			)
			if (vendorTable.length > 0) {
				vendorTable.map(vendor => {
					const { 
						inventoryVendorID,
						inventoryVendorName, 
						inventoryVendorVAT = 0, 
						inventoryVendorProvince,
						inventoryVendorCity,
						inventoryVendorBarangay,
						inventoryVendorUnit,
						inventoryVendorBuilding,
						inventoryVendorCountry,
						inventoryVendorZipCode,
						inventoryVendorPerson,
						inventoryVendorMobile,
						inventoryVendorTelephone,
						createdAt 
					} = vendor;

					if (inventoryVendorID && inventoryVendorID != "null") {
						let address = `${inventoryVendorUnit && titleCase(inventoryVendorUnit)+" "}${inventoryVendorBuilding && inventoryVendorBuilding +" "}${inventoryVendorBarangay && titleCase(inventoryVendorBarangay)+", "}${inventoryVendorCity && titleCase(inventoryVendorCity)+", "}${inventoryVendorProvince && titleCase(inventoryVendorProvince)+", "}${inventoryVendorCountry && titleCase(inventoryVendorCountry)+", "}${inventoryVendorZipCode && titleCase(inventoryVendorZipCode)}`;
						let vendorContactDetails = `${inventoryVendorMobile} / ${inventoryVendorTelephone}`;

						html += `
						<option 
							value                = "${inventoryVendorID}"
							vendorName           = "${inventoryVendorName || "-"}"
							vendorAddress        = "${address || "-"}"
							vendorContactPerson  = "${inventoryVendorPerson || "-"}"
							vendorContactDetails = "${vendorContactDetails}"
							vatable="${inventoryVendorVAT == 1 ? true : false}"
							${inventoryVendorID == invVendorID ? "selected" : ""}>
							${getFormCode("VEN", createdAt, inventoryVendorID)}
						</option>`
					}
				})
			}
		}
		return html;
	}
	// ----- END GET INVENTORY VENDOR ON BID RECAP -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(".itemTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			})

			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("id", `requestitem${i}`);
				$(this).attr("data-select2-id", `requestitem${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity .invalid-feedback", this).attr("id", `invalid-quantity${i}`);
			
			// CLASSIFICATION
			$("td .classification", this).attr("id", `classification${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost", this).attr("id", `unitcost${i}`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);

			// FILE
			$("td .file [name=files]", this).attr("id", `filesCompany${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
			$("td .remarks .invalid-feedback", this).attr("id", `invalid-remarks${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- GET REQUEST ITEMS -----
	function getRequestItems(bidRecapID, purchaseOrderID, inventoryVendorID) {
		let result = {};
		$.ajax({
			method: "POST",
			url: "purchase_order/getRequestItems",
			data: { bidRecapID, purchaseOrderID, inventoryVendorID },
			async: false,
			dataType: "json",
			success: function(data) {
				result = data;
			}
		})
		return result;
	}
	// ----- END GET REQUEST ITEMS -----


	// ----- GET PROJECT MATERIAL REQUEST ITEMS -----
	function getProjectMaterialRequestItems(isMaterialEquipment = false, item = false) {
		let html = "";
		if (item) {
			const {
				requestItemID      = "",
				itemCode           = "-",
				itemName           = "-",
				itemClassification = "-",
				brandName 		   = "",
				quantity           = 0,
				forPurchase        = 0,
				itemUom            = "",
				unitCost           = 0,
				totalCost          = 0,
				files              = "",
				remarks            = "-",
			} = item;

			let tdClassification = !isMaterialEquipment ? `
			<td>${itemClassification}</td>` : "";
			let fileHTML = files ? `
			<a href="${base_url}assets/upload-files/request-items/${files}"
				target="_blank"
				title="${files}"
				alt="${files}">${files}</a>` : "-"

			let total = unitCost * forPurchase;

			html += `
			<tr class="itemTableRow"
				requestItemID="${requestItemID}">
				<td>${itemCode}</td>
				<td>
					${itemName}
					${brandName ? `<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name">${brandName}</div>` : "-"}
				</td>
				${tdClassification}
				<td class="text-center">
					<div class="forPurchase">${forPurchase}</div>
				</td>
				<td>${itemUom}</td>
				<td class="text-right">
					<div class="unitCost">${formatAmount(unitCost, true)}</div>
				</td>
				<td class="text-right">
					<div class="totalCost">${formatAmount(total, true)}</div>
				</td>
				<td>${fileHTML}</td>
				<td>
					<div class="remarks">${remarks || "-"}</div>
				</td>
			</tr>`;
		}
		return html;
	}
	// ----- END GET PROJECT MATERIAL REQUEST ITEMS -----


	// ----- GET PROJECT PHASE REQUEST TABLE -----
	function getProjectPhaseRequestTable(item = false, index = 0) {
		let html = "";
		if (item) {
			const {
				phaseDescription = "",
				milestones       = []
			} = item;

			let milestoneHTML = "";
			milestones.map((milestone, index2) => {
				const { name = "", items = [] } = milestone;

				let requestItemsHTML = "";
				items.map((item) => {
					requestItemsHTML += getProjectMaterialRequestItems(false, item);
				})

				milestoneHTML += requestItemsHTML ? `
				<div class="milestoneContent pt-1 pb-2">
					<div class="titleName"
						style="color: rgb(104 158 46);
							font-size: 1.05rem;
							font-weight: 700;">${name}</div>
					<table class="table table-striped requestItemTable" title="${name}" isMaterialEquipment="false" isReadOnly="true" id="${(phaseDescription+index+name+index2)?.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")?.replaceAll(" ", "")?.toLowerCase()}">
						<thead>
							<tr style="white-space: nowrap">
								<th>Item Code</th>
								<th>Item Name</th>
								<th>Item Classification</th>
								<th>Quantity</th>
								<th>UOM</th>
								<th>Unit Cost</th>
								<th>Total Cost</th>
								<th>File</th>
								<th>Remarks</th>
							</tr>
						</thead>
						<tbody class="itemTableBody">
							${requestItemsHTML}
						</tbody>
					</table>
				</div>` : "";
			})

			html = `
			<div class="phaseContent pt-1 pb-2">
				<div class="phaseName"
					style="font-weight: bold;
						font-size: 1.4rem;
						color: rgb(0 176 80);">${phaseDescription}</div>
				${milestoneHTML}
			</div>`;
		}
		return html;
	}
	// ----- END GET PROJECT PHASE REQUEST TABLE -----


	// ----- GET MATERIAL EQUIPMENT REQUEST TABLE -----
	function getMaterialEquipmentRequestTable(item = false, index = 0) {
		let html = "";
		if (item) {
			const {
				name  = "",
				items = []
			} = item;

			let requestItemsHTML = "";
			items.map(item => {
				requestItemsHTML += getProjectMaterialRequestItems(true, item);
			});

			let classificationHTML = `
			<table class="table table-striped requestItemTable" isMaterialEquipment="true" isReadOnly="true" id="${(name+index)?.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")?.replaceAll(" ", "")?.toLowerCase()}" title="${name}">
				<thead>
					<tr style="white-space: nowrap">
						<th>Item Code</th>
						<th>Item Name</th>
						<th>Quantity</th>
						<th>UOM</th>
						<th>Unit Cost</th>
						<th>Total Cost</th>
						<th>File</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody class="itemTableBody">
					${requestItemsHTML}
				</tbody>
			</table>`;

			html = requestItemsHTML ? `
			<div class="classificationContent pt-1 pb-2">
				<div class="titleName"
					style="color: rgb(104 158 46);
						font-size: 1.05rem;
						font-weight: 700;">${name}</div>
				${classificationHTML}
			</div>` : "";
		}
		return html;
	}
	// ----- END GET MATERIAL EQUIPMENT REQUEST TABLE -----


	// ----- GET REQUEST ITEMS DISPLAY -----
	function getRequestItemsDisplay(bidRecapID = 0, purchaseOrderID = 0, inventoryVendorID = 0) {
		let requestItems = getRequestItems(bidRecapID, purchaseOrderID, inventoryVendorID);

		let projectPhaseItems = "", materialsEquipmentItems = "";
		requestItems.phases.map((item, index) => {
			projectPhaseItems += getProjectPhaseRequestTable(item, index);
		})
		requestItems.materialsEquipment.map((item, index) => {
			materialsEquipmentItems += getMaterialEquipmentRequestTable(item, index);
		})

		let projectPhaseHTML = projectPhaseItems ? `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Phase</div>
			${projectPhaseItems}
		</div>` : "";
		let materialsEquipmentHTML = materialsEquipmentItems ? `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Materials and Equipment</div>
			${materialsEquipmentItems}
		</div>` : "";

		return projectPhaseHTML+materialsEquipmentHTML;
	}
	// ----- END GET REQUEST ITEMS DISPLAY -----


	// ----- GET CATEGORY TYPE TABLE -----
	function getMaterialsEquipment(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		let {
			purchaseOrderID   = 0,
			bidRecapID        = 0,
			inventoryVendorID = 0,
		} = data && data[0];

		let html = getRequestItemsDisplay(bidRecapID, purchaseOrderID, inventoryVendorID);
		return html;
	}
	// ----- END GET CATEGORY TYPE TABLE -----


	// ----- SELECT REFERENCE NO. -----
	$(document).on("change", `[name="bidRecapID"]`, function() {
		const bidRecapID = $(this).val();
		const timelineBuilderID = $("option:selected", this).attr("timelineBuilderID");
		let projectCode = $("option:selected", this).attr("projectCode");
			projectCode = projectCode && projectCode != "null" ? projectCode : "-";
		let projectName = $("option:selected", this).attr("projectName");
			projectName = projectName && projectName != "null" ? projectName : "-";
		let projectCategory = $("option:selected", this).attr("projectCategory");
			projectCategory = projectCategory && projectCategory != "null" ? projectCategory : "-";
		let clientName  = $("option:selected", this).attr("clientName");
			clientName  = clientName && clientName != "null" ? clientName : "-";
		let clientAddress = $("option:selected", this).attr("clientAddress");
			clientAddress = clientAddress && clientAddress != "null" ? clientAddress : "-";
		const status = $(this).attr("status");

		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectName"]`).val(projectName);
		$(`[name="projectCategory"]`).val(projectCategory);
		$(`[name="clientName"]`).val(clientName);
		$(`[name="clientAddress"]`).val(clientAddress);
		
		if (bidRecapID != null || status == "false") {
			const vendors = getInventoryVendorOnBidRecap(bidRecapID);
			$(`[name="inventoryVendorID"]`).html(vendors);
			$(`[name="vendorName"]`).val("-");
			$(`[name="vendorContactDetails"]`).val("-");
			$(`[name="vendorContactPerson"]`).val("-");
			$(`[name="vendorAddress"]`).val("-");
		}
	})
	// ----- END SELECT REFERENCE NO. -----


	// ----- SELECT VENDOR CODE -----
	$(document).on("change", `[name="inventoryVendorID"]`, function() {
		const inventoryVendorID    = $(this).val();
		const bidRecapID           = $(`[name="bidRecapID"]`).val();
		const vendorName           = $(`option:selected`, this).attr("vendorName");
		const vendorAddress        = $(`option:selected`, this).attr("vendorAddress");
		const vendorContactPerson  = $(`option:selected`, this).attr("vendorContactPerson");
		const vendorContactDetails = $(`option:selected`, this).attr("vendorContactDetails");

		$(`[name="vendorName"]`).val(vendorName);
		$(`[name="vendorAddress"]`).val(vendorAddress);
		$(`[name="vendorContactPerson"]`).val(vendorContactPerson);
		$(`[name="vendorContactDetails"]`).val(vendorContactDetails);

		$(`#tableRequestItemContent`).html(preloader);
		setTimeout(() => {
			const display = getRequestItemsDisplay(bidRecapID, 0, inventoryVendorID);
			$(`#tableRequestItemContent`).html(display);
			initDataTables();
			updateTableItems();

			const totalCost = getTotalCost(true, false);
			$("#total").text(formatAmount(totalCost, true));
			$(`[name="discount"]`).attr("maxlength", formatAmount(totalCost, true).length);
			$(`[name="discount"]`).attr("max", totalCost);
			$(`[name="discount"]`).trigger("keyup");
		}, 200);
	})
	// ----- END SELECT VENDOR CODE -----


	// ----- REMOVE FILE -----
	$(document).on("click", ".btnRemoveFile", function() {
		$(this).parent().parent().parent().find("[name=files]").first().val("");
		$(this).closest(".displayfile").empty();
	})
	// ----- END REMOVE FILE -----


	// ----- SELECT DISCOUNT TYPE -----
	$(document).on("change", `[name="discountType"]`, function() {
		const discountType = $(this).val();
		const totalAmount  = getNonFormattedAmount($(`#total`).text());
		$(`[name="discount"]`).val("0").trigger("keyup");
		if (discountType == "percent") {
			$(`[name="discount"]`).attr("max", "100");
			$(`[name="discount"]`).attr("maxlength", "6");
		} else {
			$(`[name="discount"]`).attr("max", totalAmount);
			$(`[name="discount"]`).attr("maxlength", formatAmount(totalAmount).length);
		}
		initAmount("#discount");
	})
	// ----- END SELECT DISCOUNT TYPE -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		let total = 0;
		$(".itemTableRow").each(function() {
			const quantity  = +getNonFormattedAmount($(`[name="forPurchase"]`, this).val()) || 0;
			const unitCost  = +getNonFormattedAmount($(`.unitcost`, this).text());
			const tempTotal = quantity * unitCost;
			total += tempTotal;
		})

		$(`#total`).text(formatAmount(total, true));

		const discount    = getNonFormattedAmount($("#discount").val());
		let totalAmount = total - discount;
		const discountType = $(`[name="discountType"]`).val();
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}

		$("#totalAmount").html(formatAmount(totalAmount, true));

		const vat      = getNonFormattedAmount($("[name=vat]").val())
		const vatSales = totalAmount - vat;
		$("#vatSales").html(formatAmount(vatSales, true));

		const totalVat = totalAmount;
		$("#totalVat").html(formatAmount(totalVat, true));

		const lessEwt          = getNonFormattedAmount($("[name=lessEwt]").val());
		const grandTotalAmount = totalVat - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}
	// ----- END GET AMOUNT -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", `[name="forPurchase"]`, function() {
		const index     = $(this).closest("tr").first().attr("index");
		const quantity = +getNonFormattedAmount($(this).val());
		const unitCost = +getNonFormattedAmount($(this).closest("tr").find(".unitcost").text());
		const totalCost = quantity * unitCost;
		$(this).closest("tr").find(".totalcost").text(formatAmount(totalCost, true));

		updateTotalAmount();
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=discount]", function() {
		const discount = getNonFormattedAmount($(this).val());
		const total    = getNonFormattedAmount($("#total").text());
		
		let totalAmount = total - discount;
		const discountType = $(`[name="discountType"]`).val();
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}
		$("#totalAmount").html(formatAmount(totalAmount, true));

		const isVatable = $(`[name="inventoryVendorID"]`).length > 0 ? 
			$(`[name="inventoryVendorID"] option:selected`).attr("vatable") == "true" : false;
		let vat = 0, vatSales = 0;
		if (isVatable) {
			vatSales = totalAmount / 1.12;
			vat      = totalAmount - vatSales;
		}

		$("#vatSales").html(formatAmount(vatSales, true));
		$(`[name="vat"]`).val(vat);

		const totalVat = totalAmount;
		$("#totalVat").html(formatAmount(totalVat, true));

		const lessEwt          = getNonFormattedAmount($("[name=lessEwt]").val());
		const grandTotalAmount = totalVat - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=vat]", function() {
		const vat         = getNonFormattedAmount($(this).val());
		const totalAmount = getNonFormattedAmount($("#totalAmount").text());

		const vatSales = totalAmount - vat;
		$("#vatSales").html(formatAmount(vatSales, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=lessEwt]", function() {
		const lessEwt     = getNonFormattedAmount($(this).val());
		const totalAmount = getNonFormattedAmount($("#totalAmount").text());

		const grandTotalAmount = totalAmount - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- UPLOAD CONTRACT -----
	$(document).on("click", "[id=btnUploadContract]", function() {
		$(`[type=file][name=contractFile]`).trigger("click");
	})

	$(document).on("change", "[name=contractFile]", function(e) {
		const purchaseOrderID = decryptString($(this).attr("purchaseOrderID"));
		const files        = this.files || false;
		if (files) {
			const filesize    = files[0].size/1024/1024;
			const filenameArr = files[0].name.split(".");
			const filename    = filenameArr[0];
			const extension   = filenameArr[1];
			const filetypeArr = files[0].type.split("/");
			const filetype    = filetypeArr[0];
			if (filesize > 10) {
				showNotification("danger", `${filenameArr.join(".")} size must be less than or equal to 10mb`);
			} else {
				let formData = new FormData();
				formData.append("purchaseOrderID", purchaseOrderID);
				formData.append("files", files[0]);
				savePurchaseOrderContract(formData, filenameArr.join("."));
			}
		}
	})
	// ----- END UPLOAD CONTRACT -----


	// ----- GET PURCHASE ORDER DATA -----
	function getPurchaseOrderData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isRevise = false) {
		/**
		 * ----- ACTION ---------
		 *    > insert
		 *    > update
		 * ----- END ACTION -----
		 * 
		 * ----- STATUS ---------
		 *    0. Draft
		 *    1. For Approval
		 *    2. Approved
		 *    3. Denied
		 *    4. Cancelled
		 * ----- END STATUS -----
		 * 
		 * ----- METHOD ---------
		 *    > submit
		 *    > save
		 *    > deny
		 *    > approve
		 * ----- END METHOD -----
		 */

		 let data = { items: [] };
		 const approversID = method != "approve" && moduleApprover;
 
		 if (id) {
			data["purchaseOrderID"] = id;

			if (status != "2") {
				data["purchaseOrderStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3" || (currentStatus == "4" && isRevise)) && method != "approve") {

			data["employeeID"]        = sessionID;
			data["bidRecapID"]        = $("[name=bidRecapID]").val();
			data["purchaseRequestID"] = $(`[name="bidRecapID"] option:selected`).attr("purchaseRequestID");
			data["timelineBuilderID"] = $(`[name="bidRecapID"] option:selected`).attr("timelineBuilderID");
			data["inventoryVendorID"] = $("[name=inventoryVendorID]").val();
			
			data["projectCode"]          = $("[name=projectCode]").val();
			data["projectName"]          = $("[name=projectName]").val();
			data["projectCategory"]      = $("[name=projectCategory]").val();
			data["clientName"]           = $("[name=clientName]").val();
			data["clientAddress"]        = $("[name=clientAddress]").val();
			data["vendorName"]           = $("[name=vendorName]").val();
			data["vendorContactDetails"] = $("[name=vendorContactDetails]").val();
			data["vendorContactPerson"]  = $("[name=vendorContactPerson]").val();
			data["vendorAddress"]        = $("[name=vendorAddress]").val();

			data["chartOfAccountID"] = $(`[name="chartOfAccountID"]`).val();
			data["accountName"]      = $(`[name="chartOfAccountID"] option:selected`).attr("accountName");

			data["paymentTerms"]     = $("[name=paymentTerms]").val()?.trim();
			data["deliveryTerm"]     = $("[name=deliveryTerm]").val();
			data["discountType"]     = $("[name=discountType]").val();
			data["purchaseOrderReason"] = $("[name=purchaseOrderReason]").val()?.trim();
			data["deliveryDate"]     = moment($("[name=deliveryDate]").val()).format("YYYY-MM-DD");
			data["total"]            = getNonFormattedAmount($("#total").text());
			data["discount"]         = getNonFormattedAmount($("#discount").val());
			data["totalAmount"]      = getNonFormattedAmount($("#totalAmount").text());
			data["vatSales"]         = getNonFormattedAmount($("#vatSales").text());
			data["vat"]              = getNonFormattedAmount($("#vat").val());
			data["totalVat"]         = getNonFormattedAmount($("#totalVat").text());
			data["lessEwt"]          = getNonFormattedAmount($("#lessEwt").val());
			data["grandTotalAmount"] = getNonFormattedAmount($("#grandTotalAmount").text());

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["purchaseOrderID"]  = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]         = approversID;
					data["purchaseOrderStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]         = sessionID;
					data["approversStatus"]     = 2;
					data["approversDate"]       = dateToday();
					data["purchaseOrderStatus"] = 2;
				}
			}

			// if (isRevise) {
				$(".itemTableRow").each(function(i, obj) {

					const requestItemID = $(this).attr("requestItemID");
					let forPurchase = $("td [name=forPurchase]", this).val() || $("td .forPurchase", this).text();
						forPurchase = getNonFormattedAmount(forPurchase);	
					let unitCost  = $("td .unitCost", this).text() ?? 0;
						unitCost  = getNonFormattedAmount(unitCost);
					let totalCost = $("td .totalCost", this).text() ?? 0;
						totalCost = getNonFormattedAmount(totalCost);
					const remarks = $("td [name=remarks]", this).val()?.trim() || $("td .remarks", this).text()?.trim();	
	
					let temp = {
						requestItemID,
						forPurchase, 
						unitCost, 
						totalCost: totalCost.toFixed(2),
						remarks, 
						createdBy: sessionID, 
						updatedBy: sessionID
					};
					data["items"].push(temp);
				});
			// }
		} 

		return data;
	} 
	// ----- END GET PURCHASE ORDER DATA -----


	// ----- DISPLAY CONTRACT -----
	function displayContract(filename = null, link = false) {
		let result = "";
		if (filename) {
			if (link) {
				result = `<a 
					href="${base_url}assets/upload-files/contracts/${filename}"
					class="pr-3"
					target="_blank"
					id="displayContract">${filename}</a>`;
			} else {
				result = `<div class="pr-3">${filename}<div>`
			}
		} 
		return result;
	}
	// ----- END DISPLAY CONTRACT -----


	// ----- GET COST SUMMARY DISPLAY -----
	function getCostSummaryDisplay(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {

		readOnly = isRevise ? false : readOnly;
		let disabled = readOnly ? "disabled" : "";

		let {
			purchaseOrderID       = "",
			discountType          = "amount",
			total                 = 0,
			discount              = 0,
			totalAmount           = 0,
			vatSales              = 0,
			vat                   = 0,
			totalVat              = 0,
			lessEwt               = 0,
			grandTotalAmount      = 0,
			purchaseOrderStatus   = false,
		} = data && data[0];

		let html = "", discountDisplay = "";
		if (purchaseOrderStatus && purchaseOrderStatus != "0" && purchaseOrderStatus != "4") {
			discountDisplay = discountType == "percent" ? `
			<div class="py-0 text-dark border-bottom">${formatAmount(discount)} %</div>` :
			`<div class="py-0 text-dark border-bottom">${formatAmount(discount, true)}</div>`;
		} else {
			if (purchaseOrderStatus == "4" && !isFromCancelledDocument) {
				discountDisplay = discountType == "percent" ? `
				<div class="py-0 text-dark border-bottom">${formatAmount(discount)} %</div>` :
				`<div class="py-0 text-dark border-bottom">${formatAmount(discount, true)}</div>`;
			} else {
				discountDisplay = `
				<div class="input-group">
					<div class="input-group-prepend">
						<select class="select2"
							name="discountType"
							id="discountType"
							style="width: 52px !important;">
							<option value="amount" ${discountType == "amount" ? "selected" : ""}>₱</option>
							<option value="percent" ${discountType == "percent" ? "selected" : ""}>%</option>
						</select>
					</div>
					<input 
						type="text" 
						class="form-control-plaintext amount py-0 text-dark border-bottom"
						min="0" 
						max="${discountType == "percent" ? "100" : total}"
						minlength="1"
						maxlength="${formatAmount(discountType == "percent" ? "100" : total).length}" 
						name="discount" 
						id="discount" 
						style="font-size: 1.02em;"
						value="${discount}"
						${disabled}>
				</div>`;
			}
		}

		html = `
		<div class="row py-2">
			<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pb-2 pt-3">
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Total :</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						style="font-size: 1.05em"
						id="total">
						${formatAmount(total, true)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left align-self-center">Discount :</div>
					<div class="col-6 col-lg-5 text-right text-dark align-self-center">
						${discountDisplay}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Total Amount:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						id="totalAmount"
						style="font-size: 1.05em">
						${formatAmount(totalAmount, true)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Vatable Sales:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						id="vatSales"
						style="font-size: 1.05em">
						${formatAmount(vatSales, true)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Vat 12%:</div>
					<div class="col-6 col-lg-5 text-right text-dark">
						<input 
							type="text" 
							class="form-control-plaintext amount py-0 text-dark border-bottom"
							min="0" 
							max="9999999999"
							minlength="1"
							maxlength="20" 
							name="vat" 
							id="vat" 
							style="font-size: 1.02em;"
							value="${vat}"
							readonly>
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Total:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						id="totalVat"
						style="font-size: 1.05em">
						${formatAmount(totalVat, true)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Less EWT:</div>
					<div class="col-6 col-lg-5 text-right text-dark">
						<input 
							type="text" 
							class="form-control-plaintext amount py-0 text-dark border-bottom"
							min="0" 
							max="9999999999"
							minlength="1"
							maxlength="20" 
							name="lessEwt" 
							id="lessEwt" 
							style="font-size: 1.02em;"
							value="${lessEwt}"
							${disabled}>
					</div>
				</div>
				<div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
					<div class="col-6 col-lg-7 text-left font-weight-bolder">Grand Total:</div>
					<div class="col-6 col-lg-5 text-right text-danger font-weight-bolder"
						id="grandTotalAmount"
						style="font-size: 1.3em">
						${formatAmount(grandTotalAmount, true)}
					</div>
				</div>
			</div>
		</div>`;

		return html;
	}
	// ----- END GET COST SUMMARY DISPLAY -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			purchaseOrderID       = "",
			revisePurchaseOrderID = "",
			employeeID            = "",
			purchaseRequestID     = "",
			iprtCreatedAt         = "",
			timelineBuilderID     = "",
			projectCode           = "",
			projectName           = "",
			projectCategory       = "",
			clientName            = "",
			clientAddress         = "",
			bidRecapID            = 0,
			inventoryVendorID     = "",
			vendorName            = "",
			vendorAddress         = "",
			vendorContactDetails  = "",
			vendorContactPerson   = "",
			chartOfAccountID      = "",
			accountName           = "",
			paymentTerms          = "",
			deliveryTerm          = "",
			deliveryDate          = "",
			purchaseOrderReason   = "",
			total                 = 0,
			discount              = 0,
			totalAmount           = 0,
			vatSales              = 0,
			vat                   = 0,
			totalVat              = 0,
			lessEwt               = 0,
			grandTotalAmount      = 0,
			categoryType          = "",
			purchaseOrderRemarks  = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			contractFile		  = "",
			purchaseOrderStatus   = false,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];

		

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		let disabled = readOnly ? "disabled" : "";
		let disabledReference    = bidRecapID && bidRecapID != "0" ? "disabled" : disabled;
		let disabledVendorCode   = inventoryVendorID && inventoryVendorID != "0" ? "disabled" : disabled;

		$("#btnBack").attr("purchaseOrderID", encryptString(purchaseOrderID));
		$("#btnBack").attr("status", purchaseOrderStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let button = formButtons(data, isRevise, isFromCancelledDocument);

		// ----- PRINT BUTTON -----
		let approvedButton = '';
		if (purchaseOrderStatus == 2) {
			approvedButton += `<div class="w-100 text-right pb-4">`;
			if (grandTotalAmount > 150000) {
				const file = contractFile || "";
				approvedButton += `
				<span id="displayContractParent">
					${displayContract(file, file ? true : false)}
				</span>`;

				if (employeeID == sessionID) {
					approvedButton += `
					<input type="file"
						id="contractFile"
						name="contractFile"
						purchaseOrderID="${encryptString(purchaseOrderID)}"
						class="d-none"
						accept="image/*, .pdf, .docx, .doc">
					<button 
						class="btn btn-secondary py-2" 
						purchaseOrderID="${encryptString(purchaseOrderID)}"
						id="btnUploadContract">
						<i class="fas fa-file-upload"></i> Upload Contract
					</button>`;
				}
			}

			if (isPrintAllowed(47)) {
				approvedButton += `
					<button 
						class="btn btn-info px-5 py-2" 
						purchaseOrderID="${encryptString(purchaseOrderID)}"
						id="btnExcel">
						<i class="fas fa-file-excel"></i> Excel
					</button>
				</div>`;
			}
		}
		// ----- END PRINT BUTTON -----

		let reviseDocumentNo    = isRevise ? purchaseOrderID : revisePurchaseOrderID;
		let documentHeaderClass = isRevise || revisePurchaseOrderID ? "col-lg-3 col-md-3 col-sm-12 px-1" : "col-lg-4 col-md-4 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePurchaseOrderID ? "col-md-12 col-sm-12 px-0" : "col-12 px-1";
		let documentReviseNo    = isRevise || revisePurchaseOrderID ? `
		<div class="col-lg-3 col-md-3 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PO", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let html = `
		${approvedButton}
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${purchaseOrderID && !isRevise ? getFormCode("PO", createdAt, purchaseOrderID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Purchase Request Code</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${purchaseRequestID && !isRevise ? getFormCode("PR", iprtCreatedAt, purchaseRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${purchaseOrderStatus && !isRevise ? getStatusStyle(purchaseOrderStatus) : "---"}
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
								${getDateApproved(purchaseOrderStatus, approversID, approversDate)}
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
							${purchaseOrderRemarks && !isRevise ? purchaseOrderRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_order">

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Reference No. ${!disabledReference ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="bidRecapID"
						id="bidRecapID"
						style="width: 100%"
						isReadOnly="${readOnly}"
						status="${purchaseOrderStatus}"
						required
						${disabledReference}>
						<option selected disabled>Select Reference No.</option>
						${getBidRecapList(bidRecapID, purchaseOrderStatus)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-bidRecapID"></div>
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						disabled 
						value="${projectCode || "-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
					<input type="text"
						class="form-control"
						name="projectName"
						disabled
						value="${projectName || "-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Category</label>
					<input type="text"
						class="form-control"
						name="projectCategory"
						disabled
						value="${projectCategory || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" 
						class="form-control" 
						name="clientName" 
						disabled 
						value="${clientName || "-"}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" 
						class="form-control" 
						name="clientAddress" 
						disabled 
						value="${clientAddress || "-"}">
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Vendor Code ${!disabledVendorCode ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="inventoryVendorID"
						id="inventoryVendorID"
						style="width: 100%"
						required
						${disabledVendorCode}>
						${getInventoryVendorOnBidRecap(bidRecapID, inventoryVendorID)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-inventoryVendorID"></div>
				</div>
			</div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" 
						class="form-control" 
						name="vendorName" 
						disabled 
						value="${vendorName || "-"}">
                </div>
            </div>
			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Details</label>
                    <input type="text" 
						class="form-control" 
						name="vendorContactDetails" 
						disabled 
						value="${vendorContactDetails || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Person</label>
                    <input type="text" 
						class="form-control" 
						name="vendorContactPerson" 
						disabled 
						value="${vendorContactPerson || "-"}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Company Address</label>
                    <input type="text" 
						class="form-control" 
						name="vendorAddress" 
						disabled 
						value="${vendorAddress || "-"}">
                </div>
            </div>
            
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Account Name ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="chartOfAccountID"
						id="chartOfAccountID"
						required
						${disabled}>
						<option selected disabled>Select Account Name</option>
						${getChartAccountList(chartOfAccountID, accountName, purchaseOrderStatus)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-chartOfAccountID"></div>
                </div>
            </div>
            
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Payment Terms ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
						class="form-control validate" 
						name="paymentTerms" 
						id="paymentTerms"
						data-allowcharacters="[0-9][%][ ][a-z][A-Z][-][_][.][,][']"
						minlength="2"
						maxlength="50"
						required
						autocomplete="off"
						value="${paymentTerms || ""}"
						${disabled}>
					<div class="d-block invalid-feedback" id="invalid-paymentTerms"></div>
                </div>
            </div>
			<div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Delivery Term ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 validate"
						name="deliveryTerm"
						id="deliveryTerm"
						style="width: 100%"
						required
						${disabled}>
						<option selected disabled>${!disabled ? "Select Delivery Term" : "-"}</option>
						<option value="Meet-up" ${deliveryTerm == "Meet-up" ? "selected" : ""}>Meet-up</option>
						<option value="Delivery" ${deliveryTerm == "Delivery" ? "selected" : ""}>Delivery</option>
					</select>
					<div class="d-block invalid-feedback" id="invalid-deliveryTerm"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Delivery Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
						class="form-control validate daterange text-left" 
						name="deliveryDate" 
						id="deliveryDate"
						required
						value="${moment(deliveryDate || dateToday()).format("MMMM DD, YYYY")}"
						${disabled}>
					<div class="d-block invalid-feedback" id="invalid-deliveryDate"></div>
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
                        id="purchaseOrderReason"
                        name="purchaseOrderReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${purchaseOrderReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseOrderReason"></div>
                </div>
            </div>
			<div class="col-sm-12" id="tableRequestItemContent">
				${getMaterialsEquipment(data, readOnly, isRevise, isFromCancelledDocument)}
			</div>

			<div class="col-12" id="costSummaryDisplay">${getCostSummaryDisplay(data, readOnly, isRevise, isFromCancelledDocument)}</div>

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
			updateTableItems();
			initAll();
			initAmount("#discount", false);
			initAmount("#lessEwt", true);
			initAmount("#vat", true);

			const disablePreviousDateOptions = {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				minDate: moment(new Date).format("MMMM DD, YYYY"),
				startDate: moment(deliveryDate || new Date),
			}
			initDateRangePicker("#deliveryDate", disablePreviousDateOptions);

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

			return html;
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

			headerButton(true, "Add Purchase Order");
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


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("purchaseOrderID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("purchaseOrderID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PO", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !fromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPurchaseOrderData(action, "save", "0", id, status, revise);
				if (!fromCancelledDocument) {
					delete data["purchaseOrderID"];
					data["revisePurchaseOrderID"] = id;
				} else {
					delete data["action"];
					data["purchaseOrderStatus"] = 0;
					data["action"]              = "update";
				}
	
				savePurchaseOrder(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPurchaseOrderData(action, "save", "0", id, status, revise);
			data["purchaseOrderStatus"] = 0;

			savePurchaseOrder(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("purchaseOrderID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PO", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPurchaseOrderData(action, "save", "0", id, "0", revise);
		data["purchaseOrderStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				delete data["purchaseOrderID"];
				data["revisePurchaseOrderID"] = id;
			} else {
				delete data["action"];
				data["purchaseOrderStatus"] = 0;
				data["action"]              = "update";
			}
		}

		savePurchaseOrder(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- CHECK TABLE MATERIALS AND EQUIPMENT -----
	function checkTableMaterialsEquipment() {
		let flag = 0;
		$(".itemTableRow").each(function(i) {
			flag++;
		})
		if (flag == 0) {
			// showNotification("danger", "Please select correct reference number.");
		}
		return flag != 0;
	}
	// ----- END CHECK TABLE MATERIALS AND EQUIPMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- GET TOTAL COST -----
	function getTotalCost(isOnCreation = false) {
		let totalCost = 0;
		if (isOnCreation) {
			$(`.requestItemTable`).each(function() {
				$(`tr`, this).each(function() {
					const tempTotalCost = getNonFormattedAmount($(`td .totalCost`, this).text());
					totalCost += tempTotalCost;
				})
			})
		}
		return totalCost;
	}
	// ----- END GET TOTAL COST -----


	// ----- CHECK COST SUMMARY -----
	function checkCostSummary() {
		const total       = getNonFormattedAmount($(`#total`).text());
		const discount    = getNonFormattedAmount($(`[name="discount"]`).val());
		const lessEwt     = getNonFormattedAmount($(`[name="lessEwt"]`).val());
		const discountType = $(`[name="discountType"]`).val();
		let totalAmount = total - discount;
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}

		if (totalAmount < 0) {
			showNotification("danger", "Invalid discount value.");
			$(`[name="discount"]`).focus();
			return false;
		} else if (lessEwt > totalAmount) {
			showNotification("danger", "Invalid less ewt value.");
			$(`[name="lessEwt"]`).focus();
			return false;
		}
		return true;
	}
	// ----- END CHECK COST SUMMARY -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id       = decryptString($(this).attr("purchaseOrderID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const validate = validateForm("form_purchase_order");
		const isValid  = checkTableMaterialsEquipment();
		removeIsValid("#tableProjectOrderItems0");
		removeIsValid("#tableCompanyOrderItems0");
		const costSummary = checkCostSummary();

		if (validate && isValid && costSummary) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getPurchaseOrderData(action, "submit", "1", id, "0", revise);

			if (revise) {
				if (!isFromCancelledDocument) {
					delete data["purchaseOrderID"];
					data["revisePurchaseOrderID"] = id;
				}
			}

			const employeeID = getNotificationEmployeeID(data["approversID"], data["approversDate"], true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                47,
					notificationTitle:       "Purchase Order",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePurchaseOrder(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("purchaseOrderID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseOrderData(action, "cancelform", "4", id, status);

		savePurchaseOrder(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("purchaseOrderID"));
		const feedback = $(this).attr("code") || getFormCode("PO", dateToday(), id);
		let tableData  = getTableData("ims_purchase_order_tbl", "", "purchaseOrderID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPurchaseOrderData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                47,
					tableID:                 id,
					notificationTitle:       "Purchase Order",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                47,
					tableID:                 id,
					notificationTitle:       "Purchase Order",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["purchaseOrderStatus"] = status;

			savePurchaseOrder(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("purchaseOrderID"));
		const feedback = $(this).attr("code") || getFormCode("PO", dateToday(), id);

		$("#modal_purchase_order_content").html(preloader);
		$("#modal_purchase_order .page-title").text("DENY PURCHASE ORDER");
		$("#modal_purchase_order").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="purchaseOrderRemarks"
					name="purchaseOrderRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-purchaseOrderRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			purchaseOrderID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_order_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("purchaseOrderID"));
		const feedback = $(this).attr("code") || getFormCode("PO", dateToday(), id);

		const validate = validateForm("modal_purchase_order");
		if (validate) {
			let tableData = getTableData("ims_purchase_order_tbl", "", "purchaseOrderID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {
					action:               "update",
					method:               "deny",
					purchaseOrderID:      id,
					approversStatus:      updateApproveStatus(approversStatus, 3),
					approversDate:        updateApproveDate(approversDate),
					purchaseOrderRemarks: $("[name=purchaseOrderRemarks]").val()?.trim(),
					updatedBy:            sessionID
				};

				let notificationData = {
					moduleID:                47,
					tableID: 				 id,
					notificationTitle:       "Purchase Order",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePurchaseOrder(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const purchaseOrderID = decryptString($(this).attr("purchaseOrderID"));
		const feedback          = $(this).attr("code") || getFormCode("PO", dateToday(), id);

		const id = decryptString($(this).attr("purchaseOrderID"));
		let data = {};
		data["purchaseOrderID"] = purchaseOrderID;
		data["action"] = "update";
		data["method"] = "drop";
		data["updatedBy"] = sessionID;

		savePurchaseOrder(data, "drop", null, pageContent);
	})
	// ----- END DROP DOCUMENT -----


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
	// ----- END APPROVER STATUS --


	// ----- DOWNLOAD EXCEL -----
	$(document).on("click", "#btnExcel", function() {
		const purchaseOrderID = decryptString($(this).attr("purchaseOrderID"));
		const url = `${base_url}ims/purchase_order/downloadExcel?id=${purchaseOrderID}`;
		window.location.replace(url); 
	})
	// ----- END DOWNLOAD EXCEL -----


	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Purchase Order";
		let swalText, swalImg;

		$("#modal_purchase_order").text().length > 0 && $("#modal_purchase_order").modal("hide");

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
			case "uploadcontract":
				swalTitle = `UPLOAD CONTRACT`;
				swalText  = "Are you sure to upload this contract?";
				swalImg   = `${base_url}assets/modal/add.svg`;
				break;
			default:
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure that you want to cancel this process?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
		}
		return Swal.fire({
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
			confirmButtonText:  "Yes"
		})
	}

	function savePurchaseOrder(data = null, method = "submit", notificationData = null, callback = null) {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `purchase_order/savePurchaseOrder`,
						data,
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
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} submitted successfully!`;
							} else if (method == "save") {
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} saved successfully!`;
							} else if (method == "cancelform") {
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} cancelled successfully!`;
							} else if (method == "approve") {
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} approved successfully!`;
							} else if (method == "deny") {
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} denied successfully!`;
							} else if (method == "drop") {
								swalTitle = `${getFormCode("PO", dateCreated, insertedID)} dropped successfully!`;
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
									});
									callback && callback();

									if (method == "approve" || method == "deny") {
										$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
									}
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
				} else {
					if (res.dismiss == "cancel" && method != "submit") {
						if (method != "deny") {
							if (method != "cancelform") {
								callback && callback();
							}
						} else {
							$("#modal_purchase_order").text().length > 0 && $("#modal_purchase_order").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_purchase_order").text().length > 0 && $("#modal_purchase_order").modal("show");
						}
					}
				}
			});
		}
		return false;
	}

	function savePurchaseOrderContract(data = null, filename = null) {
		if (data) {
			const confirmation = getConfirmation("uploadcontract");
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `purchase_order/savePurchaseOrderContract`,
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
			
							if (isSuccess == "true") {
								setTimeout(() => {
									$("#loader").hide();
									closeModals();
									Swal.fire({
										icon:              "success",
										title:             "CONTRACT UPLOADED SUCCESSFULLY!",
										showConfirmButton: false,
										timer:             2000,
									});
									$("#displayContractParent").html(displayContract(message, true));
								}, 500);
							} else {
								setTimeout(() => {
									$("#loader").hide();
									Swal.fire({
										icon:              "danger",
										title:             "CONTRACT FAILED TO UPLOAD",
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
							$("[type=file][name=contractFile]").val("");
						}, 500);
					})
				} else {
					$("[type=file][name=contractFile]").val("");
				}
			});
		}
		return false;
	}

	// --------------- END DATABASE RELATION ---------------

})