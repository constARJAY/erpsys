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
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
			const tableData = getTableData(
				`ims_purchase_order_tbl AS ipot
					LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)`, 
				`ipot.*, iprt.projectID, iprt.referenceCode, iprt.purchaseRequestReason`, 
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
						pageContent(true, tableData, isReadOnly, true);
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
				id && isFinite(id) && loadData(id, isRevise);
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

	const bidRecapList = getTableData(
		// `ims_bid_recap_tbl AS ibrt
		// 	LEFT JOIN pms_project_list_tbl AS pplt ON ibrt.projectID = pplt.projectListID`,
		// "ibrt.*, pplt.projectListClientID AS clientID",
		// `bidRecapStatus = 2`

		`ims_request_items_tbl AS irit
			LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)
			LEFT JOIN pms_project_list_tbl AS pplt ON ibrt.projectID = pplt.projectListID`,
		`irit.bidRecapID, 
		irit.inventoryVendorID, 
		irit.categoryType, 
		ibrt.createdAt, 
		pplt.projectListClientID AS clientID, 
		ibrt.projectID, 
		ibrt.purchaseRequestID, 
		ibrt.bidRecapReason`,
		`ibrt.bidRecapStatus = 2 AND irit.bidRecapID IS NOT NULL
		GROUP BY irit.bidRecapID, irit.inventoryVendorID, irit.categoryType`
	)

	const inventoryPriceList = getTableData(
		`ims_inventory_price_list_tbl`,
		``,
		`preferred = 1`
	);

	const inventoryVendorList = getTableData(
		`ims_inventory_vendor_tbl`,
	)

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, categoryName, unitOfMeasurementID",
		"itemStatus = 1");

	const projectList = getTableData(
		"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
		"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
		"projectListStatus = 1");
	// END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableForApprroval")
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 350 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80 },
					{ targets: 10,  width: 250  },
				],
			});

		var table = $("#tableMyForms")
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 350 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80 },
					{ targets: 10,  width: 250  },
				],
			});

        var table = $("#tableProjectOrderItems")
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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 150 },
					{ targets: 9,  width: 200 },
				],
			});

			var table = $("#tableProjectOrderItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                paging: false,
                info: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 50  },
					{ targets: 3,  width: 120 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 200 },
				],
			});

			var table = $("#tableCompanyOrderItems")
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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 150 },
					{ targets: 9,  width: 200 },
				],
			});

			var table = $("#tableCompanyOrderItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                paging: false,
                info: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 50  },
					{ targets: 3,  width: 120 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_purchase_order_tbl", "approversID")) {
				let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval</a></li>
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
	function headerButton(isAdd = true, text = "Add", isRevise = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(47)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
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
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = ibrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON ipot.employeeID = helt.employeeID`,
			`ipot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ipot.createdAt AS dateCreated, projectListCode, projectListName, ibrt.bidRecapID, ibrt.createdAt AS ibrtCreatedAt`,
			`ipot.employeeID != ${sessionID} AND ipot.purchaseOrderStatus != 0 AND ipot.purchaseOrderStatus != 4`,
			`FIELD(purchaseOrderStatus, 0, 1, 3, 2, 4), COALESCE(ipot.submittedAt, ipot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Reason</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
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
                projectID,
                projectListCode,
                projectListName,
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
			let dateApproved  = purchaseOrderStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseOrderStatus != 0 ? "btnView" : "btnEdit";

			let button = purchaseOrderStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(purchaseOrderID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseOrderID )}" 
                code="${getFormCode("PO", createdAt, purchaseOrderID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, purchaseOrderStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(purchaseOrderID )}">
					<td>${getFormCode("PO", createdAt, purchaseOrderID )}</td>
					<td>${fullname}</td>
					<td>${bidRecapID ? getFormCode("BRF", ibrtCreatedAt, bidRecapID) : "-"}</td>
					<td>
						<div>
							${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectListCode || '-'}</small>
					</td>
					<td>${purchaseOrderReason || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseOrderStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
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
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = ibrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON ipot.employeeID = helt.employeeID`,
			`ipot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ipot.createdAt AS dateCreated, projectListCode, projectListName, ibrt.bidRecapID, ibrt.createdAt AS ibrtCreatedAt`,
			`ipot.employeeID = ${sessionID}`,
			`FIELD(purchaseOrderStatus, 0, 1, 3, 2, 4), COALESCE(ipot.submittedAt, ipot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Reason</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
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
                projectID,
                projectListCode,
                projectListName,
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
			let dateApproved  = purchaseOrderStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseOrderStatus != 0 ? "btnView" : "btnEdit";

			let button = purchaseOrderStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(purchaseOrderID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseOrderID )}" 
                code="${getFormCode("PO", createdAt, purchaseOrderID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseOrderID )}">
                <td>${getFormCode("PO", createdAt, purchaseOrderID )}</td>
                <td>${fullname}</td>
				<td>${bidRecapID ? getFormCode("BRF", ibrtCreatedAt, bidRecapID) : "-"}</td>
				<td>
					<div>
						${projectListName || '-'}
					</div>
					<small style="color:#848482;">${projectListCode || '-'}</small>
				</td>
				<td>${purchaseOrderReason || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseOrderStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
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
	function formButtons(data = false, isRevise = false) {
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
						purchaseOrderID="${purchaseOrderID}"
						code="${getFormCode("P0", createdAt, purchaseOrderID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}"
							purchaseOrderID="${purchaseOrderID}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							purchaseOrderID="${purchaseOrderID}"
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
							purchaseOrderID="${purchaseOrderID}"
							code="${getFormCode("P0", createdAt, purchaseOrderID)}"
							status="${purchaseOrderStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (purchaseOrderStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(purchaseOrderID)) {
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


	// ----- GET BID RECAP LIST -----
	function getBidRecapList(id = 0, status = 0, display = true) {
		// const createdBRList = getTableData("ims_purchase_order_tbl", "bidRecapID", "purchaseOrderStatus <> 3 AND purchaseOrderStatus <> 4").map(br => br.bidRecapID);
		const createdBRList = [];

		const pendingBidRecap = getTableData(
			`ims_bid_po_tbl AS ibpt 
				LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)
				LEFT JOIN pms_project_list_tbl AS pplt ON ibrt.projectID = pplt.projectListID`,
			`ibpt.bidRecapID, 
			ibpt.inventoryVendorID, 
			ibpt.categoryType, 
			ibrt.createdAt, 
			pplt.projectListClientID AS clientID, 
			ibrt.projectID, 
			ibrt.purchaseRequestID, 
			ibrt.bidRecapReason`,
			`ibrt.bidRecapStatus = 2 AND 
			(ibpt.bidPoStatus = 0 ${status == 0 || status == "false" || !status ? "" : "AND ibpt.bidPoStatus = 1"}) OR
			ibpt.bidRecapID = ${id}
			GROUP BY ibpt.bidRecapID`
		);

		// const purchaseOrderList = getTableData(
		// 	`ims_purchase_order_tbl`,
		// 	`bidRecapID, inventoryVendorID, categoryType`,
		// 	`purchaseOrderStatus <> 3 AND purchaseOrderStatus <> 4`);

		// let tempBidRecapList = [], referenceNoList = [];
		// bidRecapList.map(bidRecap => {
		// 	const { bidRecapID, inventoryVendorID, categoryType } = bidRecap;
		// 	if (tempBidRecapList.length > 0) {
		// 		for(var i=0; i<tempBidRecapList.length; i++) {
		// 			const tBidRecapID        = tempBidRecapList[i].bidRecapID;
		// 			const tInventoryVendorID = tempBidRecapList[i].inventoryVendorID;
		// 			const tCategoryType      = tempBidRecapList[i].categoryType;
		// 			if (tBidRecapID != bidRecapID && tInventoryVendorID != inventoryVendorID && tCategoryType != categoryType) {
		// 				tempBidRecapList.push({bidRecapID, inventoryVendorID, categoryType});
		// 				referenceNoList.push(bidRecapID);
		// 				break;
		// 			}
		// 		}
		// 	} else {
		// 		tempBidRecapList.push({bidRecapID, inventoryVendorID, categoryType});
		// 		referenceNoList.push(bidRecap);
		// 	}
		// })

		let html = ``;
		if (!status || status == 0) {
			html += pendingBidRecap.filter(br => createdBRList.indexOf(br.bidRecapID) == -1 || br.bidRecapID == id).map(br => {
				return `
				<option 
				value     = "${br.bidRecapID}" 
				brCode    = "${getFormCode("BRF", br.createdAt, br.bidRecapID)}"
				clientID  = "${br.clientID}"
				projectID = "${br.projectID}"
				purchaseRequestID = "${br.purchaseRequestID}"
				reason    = "${br.bidRecapReason}"
				${br.bidRecapID == id && "selected"}>
				${getFormCode("BRF", br.createdAt, br.bidRecapID)}
				</option>`;
			})
		} else {
			html += pendingBidRecap.map(br => {
				return `
				<option 
					value     = "${br.bidRecapID}" 
					brCode    = "${getFormCode("BRF", br.createdAt, br.bidRecapID)}"
					clientID  = "${br.clientID}"
					projectID = "${br.projectID}"
					purchaseRequestID = "${br.purchaseRequestID}"
					reason    = "${br.bidRecapReason}"
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
		let html = `<option selected disabled>Select Vendor Code</option>`;
		if (bidRecapID) {
			// let vendorTable = getTableData(
			// 	`ims_request_items_tbl AS irit
			// 		LEFT JOIN ims_inventory_vendor_tbl AS iivt USING(inventoryVendorID)
			// 	WHERE
			// 		bidRecapID = ${bidRecapID}
			// 		GROUP BY irit.inventoryVendorID`,
			// 	`iivt.*`
			// );

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
						let address = `${inventoryVendorUnit && titleCase(inventoryVendorUnit)+", "}${inventoryVendorBuilding && inventoryVendorBuilding +", "}${inventoryVendorBarangay && titleCase(inventoryVendorBarangay)+", "}${inventoryVendorCity && titleCase(inventoryVendorCity)+", "}${inventoryVendorProvince && titleCase(inventoryVendorProvince)+", "}${inventoryVendorCountry && titleCase(inventoryVendorCountry)+", "}${inventoryVendorZipCode && titleCase(inventoryVendorZipCode)}`;
						let vendorContactDetails = `${inventoryVendorMobile} / ${inventoryVendorTelephone}`;

						html += `<option 
							value="${inventoryVendorID}"
							vendorName="${inventoryVendorName || "-"}"
							vendorAddress="${address || "-"}"
							vendorContactPerson="${inventoryVendorPerson || "-"}"
							vendorContactDetails="${vendorContactDetails}"
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


	// ----- GET CATEGORY TYPE -----
	function getCategoryType(bidRecapID = null, inventoryVendorID = null, catType = "") {
		let html = `<option selected disabled>Select Category Type</option>`;
		if (bidRecapID && inventoryVendorID) {
			// let requestItems = getTableData(
			// 	`ims_request_items_tbl
			// 	WHERE
			// 		bidRecapID = ${bidRecapID} AND
			// 		inventoryVendorID = ${inventoryVendorID} AND
			// 		(categoryType <> '' AND categoryType IS NOT NULL)
 			// 		GROUP BY categoryType`,
			// );

			let requestItems = getTableData(
				`ims_bid_po_tbl
				WHERE 
					bidRecapID = ${bidRecapID} AND 
					inventoryVendorID = ${inventoryVendorID} AND
					bidPoStatus = 0 OR
					categoryType = '${catType}'
				GROUP BY categoryType`
			);

			const purchaseOrderList = getTableData(
				`ims_purchase_order_tbl`,
				`bidRecapID, inventoryVendorID, categoryType`,
				`purchaseOrderStatus <> 3 AND purchaseOrderStatus <> 4`
			);

			let categoryTypeOptions = [];
			requestItems.map(item => {
				let flag = true;
				for (var i=0; i<purchaseOrderList.length; i++) {
					if (purchaseOrderList[i].bidRecapID == item.bidRecapID && purchaseOrderList[i].inventoryVendorID == item.inventoryVendorID && purchaseOrderList[i].categoryType == item.categoryType && item.categoryType != catType) {
						flag = false;
					}
				}
				flag && categoryTypeOptions.push(item.categoryType);
			})

			categoryTypeOptions.map(categoryType => {
				html += `<option value="${categoryType}" ${categoryType == catType ? "selected" : ""}>${titleCase(categoryType)}</option>`
			})
		}
		return html;
	}
	// ----- END GET CATEGORY TYPE -----


	// ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			clientCode  = "-"
			clientName  = "-"
			address     = "-"
			${id == "0" && "selected"}>N/A</option>`;
        html += projectList.map(project => {
			let address = `${project.clientUnitNumber && titleCase(project.clientUnitNumber)+", "}${project.clientHouseNumber && project.clientHouseNumber +", "}${project.clientBarangay && titleCase(project.clientBarangay)+", "}${project.clientCity && titleCase(project.clientCity)+", "}${project.clientProvince && titleCase(project.clientProvince)+", "}${project.clientCountry && titleCase(project.clientCountry)+", "}${project.clientPostalCode && titleCase(project.clientPostalCode)}`;

            return `
            <option 
                value       = "${project.projectListID}" 
                projectCode = "${project.projectListCode}"
                clientCode  = "${project.clientCode}"
                clientName  = "${project.clientName}"
				address     = "${address}"
                ${project.projectListID == id && "selected"}>
                ${project.projectListName}
            </option>`;
        })
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----


	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		let optionNone = {
			itemID:              "0",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A"
		};

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		$("[name=itemID][company=true]").each(function(i, obj) {
			companyItemIDArr.push($(this).val());
			companyElementID.push(`#${this.id}[company=true]`);
			$(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [optionNone, ...inventoryItemList];
			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});

		companyElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [optionNone, ...inventoryItemList];
			html += itemList.filter(item => !companyItemIDArr.includes(item.itemID) || item.itemID == companyItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == companyItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, isProject = true, display = true) {
        let html   = `<option selected disabled>Select Item Name</option>`;
		const attr = isProject ? "[project=true]" : "[company=true]";

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let optionNone = {
			itemID:              "0",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A"
		};
		let itemList = [optionNone, ...inventoryItemList];

		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
            return `
            <option 
                value        = "${item.itemID}" 
                itemCode     = "${item.itemCode}"
                categoryName = "${item.categoryName}"
                uom          = "${item.unitOfMeasurementID}"
                ${item.itemID == id && "selected"}>
                ${item.itemName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false) {
		const attr = isProject ? `project="true"` : `company="true"`;
		let {
			requestItemID = "",
			itemCode      = "",
			itemName      = "",
			itemID        = null,
			forPurchase   = 0,
			categoryName  = "",
			unitOfMeasurementID: uom = "",
			unitCost      = 0,
			totalCost     = 0,
			files         = "",
			remarks       = ""
		} = item;

		let html = "";
		if (readOnly) {
			const itemFIle = files ? `<a href="${base_url+"assets/upload-files/request-items/"+files}" target="_blank">${files}</a>` : `-`;
			html += `
			<tr class="itemTableRow"
				requestItemID="${requestItemID}">
				<td>
					<div class="itemcode">
						${itemCode || "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="forPurchase">
						${forPurchase}
					</div>
				</td>
				<td>
					<div class="category">
						${categoryName || "-"}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom || "-"}
					</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">
						${formatAmount(totalCost, true)}
					</div>
				</td>
				<td>
					<div class="file">
						${itemFIle}
					</div>
				</td>
				<td>
					<div class="remarks">
						${remarks || "-"}
					</div>
				</td>
			</tr>`;
		} else {
			unitCost = getInventoryPreferredPrice(itemID);

			const itemFile = files ? `
			<div class="d-flex justify-content-between align-items-center py-2">
				<a class="filename"
				   href="${base_url+"assets/upload-files/request-items/"+files}" 
				   target="_blank">
				   ${files}
				</a>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>` : "-";
			html += `
			<tr class="itemTableRow"
				requestItemID="${requestItemID}">
				<td>
					<div class="itemcode">
						${itemCode || "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName}
					</div>
				</td>
				<td class="text-center">
					<div class="forPurchase">
						<input 
							type="text" 
							class="form-control input-quantity text-center"
							min="0.01" 
							data-allowcharacters="[0-9]" 
							max="999999999" 
							id="forPurchase" 
							name="forPurchase" 
							value="${forPurchase}" 
							minlength="1" 
							maxlength="20" 
							requred>
						<div class="invalid-feedback d-block" id="invalid-forPurchase"></div>
					</div>
				</td>
				<td>
					<div class="category">
						${categoryName || "-"}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom || "-"}
					</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">${formatAmount((unitCost * forPurchase), true)}</div>
				</td>
				<td>
					<div class="file">
						<div class="displayfile">
							${itemFile}
						</div>
						<div class="invalid-feedback d-block" id="invalid-files"></div>
					</div>
				</td>
				<td>
					<div class="remarks">
						<textarea 
							class="form-control validate"
							minlength="0"
							maxlength="250"
							rows="2" 
							style="resize: none" 
							class="form-control" 
							name="remarks" 
							id="remarks">${remarks || ""}</textarea>
					</div>
				</td>
			</tr>`;
		}

        return html;
    }
    // ----- END GET ITEM ROW -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(".itemProjectTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("project", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `projectitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}`);
			$("td .unitcost [name=unitCost] ", this).attr("project", `true`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);
			$("td .totalcost", this).attr("project", `true`);

			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})

		$(".itemCompanyTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("company", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("company", `true`);
				$(this).attr("id", `companycompanyitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("company", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}`);
			$("td .unitcost [name=unitCost] ", this).attr("company", `true`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);
			$("td .totalcost", this).attr("company", `true`);

			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let projectCount = 0, companyCount = 0;
		$(".checkboxrow[project=true]").each(function() {
			this.checked && projectCount++;
		})
		$(".btnDeleteRow[project=true]").attr("disabled", projectCount == 0);
		$(".checkboxrow[company=true]").each(function() {
			this.checked && companyCount++;
		})
		$(".btnDeleteRow[company=true]").attr("disabled", companyCount == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow(isProject = true) {
		const attr = isProject ? "[project=true]" : "[company=true]";
		if ($(`.checkboxrow${attr}:checked`).length != $(`.checkboxrow${attr}`).length) {
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
					$(`.checkboxrow${attr}:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableItems();
							$(`[name=itemID]${attr}`).each(function(i, obj) {
								let itemID = $(this).val();
								$(this).html(getInventoryItem(itemID, isProject));
							}) 
							updateDeleteButton();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----


	// ----- GET CATEGORY TYPE TABLE -----
	function getCategoryTypeTable(data = false, readOnly = false, isRevise = false) {
		let {
			purchaseOrderID       = "",
			bidRecapID            = "",
			inventoryVendorID     = "",
			total                 = 0,
			discount              = 0,
			totalAmount           = 0,
			vatSales              = 0,
			vat                   = 0,
			totalVat              = 0,
			lessEwt               = 0,
			grandTotalAmount      = 0,
			categoryType          = "",
		} = data && data[0];
		let disabled = readOnly ? "disabled" : "";
		let requestProjectItems = "", requestCompanyItems = "";

		if (bidRecapID && inventoryVendorID) {
			if (purchaseOrderID) {
				// where = `purchaseOrderID = ${purchaseOrderID} AND bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID}`;
				where = `purchaseOrderID = ${purchaseOrderID} AND bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID} AND forPurchase <> 0`;
			} else {
				// where = `purchaseOrderID IS NULL AND bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID}`;
				where = `purchaseOrderID IS NULL AND bidRecapID = ${bidRecapID} AND inventoryVendorID = ${inventoryVendorID} AND forPurchase <> 0`;
			}
			let requestItemsData = getTableData(
				`ims_request_items_tbl 
					LEFT JOIN ims_inventory_item_tbl USING(itemID) 
					LEFT JOIN ims_inventory_category_tbl USING(categoryID)`, 
				`requestItemID, quantity, unitCost, totalCost, files, remarks, itemID, itemCode, ims_request_items_tbl.itemName, categoryName, itemUom AS unitOfMeasurementID, categoryType, forPurchase`, 
				`${where}`);
			let projectTotalCost = 0, companyTotalCost = 0;
			let reviseProjectTotalCost = 0, reviseCompanyTotalCost = 0;
			requestItemsData.filter(item => item.categoryType == "project").map(item => {
				requestProjectItems += getItemRow(true, item, !isRevise);
				// THIS IS FOR CREATION OF P.O.
				const totalCost = +item.totalCost || 0;
				projectTotalCost += totalCost;

				const unitCost    = getInventoryPreferredPrice(item.itemID);
				const forPurchase = +item.forPurchase;
				reviseProjectTotalCost += (unitCost * forPurchase);
			})
			requestItemsData.filter(item => item.categoryType == "company").map(item => {
				requestCompanyItems += getItemRow(false, item, !isRevise);
				// THIS IS FOR CREATION OF P.O.
				const totalCost = +item.totalCost || 0;
				companyTotalCost += totalCost;

				const unitCost    = getInventoryPreferredPrice(item.itemID);
				const forPurchase = +item.forPurchase;
				reviseCompanyTotalCost += (unitCost * forPurchase);
			})

			const vendorVat = inventoryVendorList
				.filter(vendor => vendor.inventoryVendorID == inventoryVendorID)
				.map(ven => ven.inventoryVendorVAT)?.[0] == 1;
			let isVatable = vendorVat;
			if ($(`[name="inventoryVendorID"]`).length > 0) {
				isVatable = $(`[name="inventoryVendorID"] option:selected`).attr("vatable") == "true";
			}
			
			if (total == 0 && !isRevise) {
				total       = categoryType == "project" ? projectTotalCost : companyTotalCost;
				discount    = 0;
				totalAmount = total - discount;
				vatSales = isVatable ? totalAmount / 1.12 : 0;
				vat      = isVatable ? totalAmount - vatSales : 0;
				totalVat = totalAmount;
				lessEwt  = vatSales != 0 ? vatSales * 0.01 : 0;
				grandTotalAmount = totalVat - lessEwt;
			} 
			// else if (total && isRevise) {
			// 	total       = categoryType == "project" ? reviseProjectTotalCost : reviseCompanyTotalCost;
			// 	discount    = 0;
			// 	totalAmount = total - discount;
			// 	vat      = isVatable ? totalAmount * 0.12 : 0;
			// 	vatSales = totalAmount - vat;
			// 	totalVat = vat + vatSales;
			// 	lessEwt  = totalVat * 0.01;
			// 	grandTotalAmount = totalVat - lessEwt;
			// }

		} else {
			requestProjectItems += getItemRow(true);
			requestCompanyItems += getItemRow(false);
		}

		let html = "";
		if (categoryType == "project") {
			html += `
			<div class="w-100">
				<hr class="pb-1">
				<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Materials and Equipment</div>
				<table class="table table-striped" id="tableProjectOrderItems0">
					<thead>
						<tr style="white-space: nowrap">
							<th>Item Code</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>UOM</th>
							<th>Unit Cost</th>
							<th>Total Cost</th>
							<th>File</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody class="itemProjectTableBody" project="true">
						${requestProjectItems}
					</tbody>
				</table>
				
				<div class="row py-2">
					<div class="offset-xl-8 offset-md-7 col-xl-4 col-md-5 col-sm-12 pt-3 pb-2">
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total :</div>
							<div class="col-6 text-right text-danger"
								project="true"
								style="font-size: 1.05em"
								id="total">
								${formatAmount(total, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Discount :</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
									min="0" 
									max="9999999999"
									minlength="1"
									maxlength="20" 
									name="discount" 
									id="discount" 
									style="font-size: 1.02em;"
									value="${discount}"
									${disabled}>
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total Amount:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="totalAmount"
								style="font-size: 1.05em">
								${formatAmount(totalAmount, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Vatable Sales:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="vatSales"
								style="font-size: 1.05em">
								${formatAmount(vatSales, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Vat 12%:</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
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
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="totalVat"
								style="font-size: 1.05em">
								${formatAmount(totalVat, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Less EWT:</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
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
						<div class="row" style="font-size: 1.3rem; font-weight:bold; border-bottom: 3px double black;">
							<div class="col-7 text-left">Grand Total:</div>
							<div class="col-5 text-right text-danger"
								project="true"
								id="grandTotalAmount"
								style="font-size: 1.3em">
								${formatAmount(grandTotalAmount, true)}
							</div>
						</div>
					</div>
				</div>
			</div>`;
		} else if (categoryType == "company") {
			html += `
			<div class="w-100">
				<hr class="pb-1">
				<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Company Materials and Equipment</div>
				<table class="table table-striped" id="tableCompanyOrderItems0">
					<thead>
						<tr style="white-space: nowrap">
							<th>Item Code</th>
							<th>Item Name</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>UOM</th>
							<th>Unit Cost</th>
							<th>Total Cost</th>
							<th>File</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody class="itemCompanyTableBody" company="true">
						${requestCompanyItems}
					</tbody>
				</table>
				
				<div class="row py-2">
					<div class="offset-md-8 col-md-4 col-sm-12 pt-3 pb-2">
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total :</div>
							<div class="col-6 text-right text-danger"
								project="true"
								style="font-size: 1.05em"
								id="total">
								${formatAmount(total, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Discount :</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
									min="0" 
									max="9999999999"
									minlength="1"
									maxlength="20" 
									name="discount" 
									id="discount" 
									style="font-size: 1.02em;"
									value="${discount}"
									${disabled}>
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total Amount:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="totalAmount"
								style="font-size: 1.05em">
								${formatAmount(totalAmount, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Vatable Sales:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="vatSales"
								style="font-size: 1.05em">
								${formatAmount(vatSales, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Vat 12%:</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
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
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Total:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="totalVat"
								style="font-size: 1.05em">
								${formatAmount(totalVat, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 text-left">Less EWT:</div>
							<div class="col-6 text-right"
								project="true">
								<input 
									type="text" 
									class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
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
						<div class="row" style="font-size: 1.3rem; font-weight:bold; border-bottom: 3px double black;">
							<div class="col-6 text-left">Grand Total:</div>
							<div class="col-6 text-right text-danger"
								project="true"
								id="grandTotalAmount"
								style="font-size: 1.05em">
								${formatAmount(grandTotalAmount, true)}
							</div>
						</div>
					</div>
				</div>
			</div>`;
		}
		return html;
	}
	// ----- END GET CATEGORY TYPE TABLE -----


	// ----- GET CATEGORY VALUE -----
	function getCategoryValue() {
		const bidRecapID        = $(`[name="bidRecapID"]`).val();
		const readOnly          = $(`[name="bidRecapID"]`).attr("isReadOnly") == "true";
		const status            = $(`[name="bidRecapID"]`).attr("status");
		const inventoryVendorID = $(`[name="inventoryVendorID"]`).val();
		const categoryType      = $(`[name="categoryType"]`).val();

		if (bidRecapID && inventoryVendorID) {
			let categoryTypeOptions = getCategoryType(bidRecapID, inventoryVendorID, categoryType);
			$(`[name="categoryType"]`).html(categoryTypeOptions);
		}

		if (!readOnly && (!status || status == "false")) {
			const purchaseOrderID = $("#btnBack").attr("purchaseOrderID");
			const data = purchaseOrderID ? 
				getTableData(
					`ims_purchase_order_tbl AS ipot
						LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)`, 
					`ipot.*, iprt.projectID, iprt.referenceCode, iprt.purchaseRequestReason`, 
					"purchaseOrderID=" + purchaseOrderID) : 
				[{bidRecapID, inventoryVendorID, categoryType}];
			const table = getCategoryTypeTable(data, readOnly);
			if (bidRecapID && inventoryVendorID && categoryType) {
				$("#tableRequestItems").html(preloader);
				setTimeout(() => {
					$("#tableRequestItems").html(table);
					initDataTables();
					updateTableItems();
					updateInventoryItemOptions();
					initAmount("#discount", true);
					initAmount("#lessEwt", true);
					initAmount("#vat", true);
				}, 500);
			}
		}
	}
	// ----- END GET CATEGORY VALUE -----


	// ----- GET INVENTORY PREFERRED PRICE -----
	function getInventoryPreferredPrice(id = null, input, executeOnce = false) {
		const errorMsg = `Please set item code <b>${getFormCode("ITM", dateToday(), id)}</b> into item price list module to proceed in this proccess`;
		if (id && id != "0") {
			const price = inventoryPriceList.filter(item => item.itemID == id).map(item => {
				input && $(input).attr("inventoryVendorID", item.inventoryVendorID);
				return item.vendorCurrentPrice;
			});
			if (price.length > 0) {
				return price?.[0];
			}
			input && $(input).removeAttr("inventoryVendorID");
			!executeOnce && showNotification("warning2", errorMsg);
			return false;
		}
		input && $(input).removeAttr("inventoryVendorID");
		id && id != "0" && !executeOnce && showNotification("warning2", errorMsg);
		return id == "0";
	}
	// ----- END GET INVENTORY PREFERRED PRICE -----


	// ----- SELECT REFERENCE NO. -----
	$(document).on("change", `[name="bidRecapID"]`, function() {
		const bidRecapID        = $(this).val();
		const inventoryVendorID = $(`[name="inventoryVendorID"]`).val();
		const projectID         = $("option:selected", this).attr("projectID");
		const status            = $(this).attr("status");
		projectID && $(`[name="projectID"]`).val(projectID).trigger("change");
		if (bidRecapID != null && inventoryVendorID && inventoryVendorID != 0 && inventoryVendorID != "null" || status == "false") {
			const vendors = getInventoryVendorOnBidRecap(bidRecapID, inventoryVendorID);
			$(`[name="inventoryVendorID"]`).html(vendors);
			getCategoryValue();
		}
	})
	// ----- END SELECT REFERENCE NO. -----


	// ----- SELECT VENDOR CODE -----
	$(document).on("change", `[name="inventoryVendorID"]`, function() {
		const vendorName           = $(`option:selected`, this).attr("vendorName");
		const vendorAddress        = $(`option:selected`, this).attr("vendorAddress");
		const vendorContactPerson  = $(`option:selected`, this).attr("vendorContactPerson");
		const vendorContactDetails = $(`option:selected`, this).attr("vendorContactDetails");

		$(`[name="vendorName"]`).val(vendorName);
		$(`[name="vendorAddress"]`).val(vendorAddress);
		$(`[name="vendorContactPerson"]`).val(vendorContactPerson);
		$(`[name="vendorContactDetails"]`).val(vendorContactDetails);
		getCategoryValue();
	})
	// ----- END SELECT VENDOR CODE -----


	// ----- SELECT CATEGORY TYPE -----
	$(document).on("change", `[name="categoryType"]`, function() {
		getCategoryValue();
	})
	// ----- END SELECT CATEGORY TYPE -----


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=projectID]", function() {
        const projectCode = $('option:selected', this).attr("projectCode");
        const clientCode  = $('option:selected', this).attr("clientCode");
        const clientName  = $('option:selected', this).attr("clientName");
        const address     = $('option:selected', this).attr("address");

        $("[name=projectCode]").val(projectCode);
        $("[name=clientCode]").val(clientCode);
        $("[name=clientName]").val(clientName);
        $("[name=clientAddress]").val(address);
    })
    // ----- END SELECT PROJECT LIST -----


    // ----- SELECT ITEM NAME -----
    $(document).on("change", "[name=itemID]", function() {
        const itemCode     = $('option:selected', this).attr("itemCode");
        const categoryName = $('option:selected', this).attr("categoryName");
        const uom          = $('option:selected', this).attr("uom");
		const isProject    = $(this).closest("tbody").attr("project") == "true";
		const attr         = isProject ? "[project=true]" : "[company=true]";

        $(this).closest("tr").find(`.itemcode`).first().text(itemCode);
        $(this).closest("tr").find(`.category`).first().text(categoryName);
        $(this).closest("tr").find(`.uom`).first().text(uom);

		$(`[name=itemID]${attr}`).each(function(i, obj) {
			let itemID = $(this).val();
			$(this).html(getInventoryItem(itemID, isProject));
		}) 
    })
    // ----- END SELECT ITEM NAME -----


	// ----- SELECT FILE -----
	$(document).on("change", "[name=files]", function(e) {
		const filename = this.files[0].name;
		const filesize = this.files[0].size/1024/1024; // Size in MB
		if (filesize > 10) {
			$(this).val("");
			$(this).parent().parent().find(".displayfile").empty();
			showNotification("danger", "File size must be less than or equal to 10mb");
		} else {
			let html = `
			<div class="d-flex justify-content-between align-items-center py-2">
				<span class="filename">${filename}</span>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>`;
			$(this).parent().find(".displayfile").first().html(html);
		}
	})
	// ----- END SELECT FILE -----


	// ----- REMOVE FILE -----
	$(document).on("click", ".btnRemoveFile", function() {
		$(this).parent().parent().parent().find("[name=files]").first().val("");
		$(this).closest(".displayfile").empty();
	})
	// ----- END REMOVE FILE -----


	// ----- CLICK DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		const isProject = $(this).attr("project") == "true";
		deleteTableRow(isProject);
	})
	// ----- END CLICK DELETE ROW -----


	// ----- CHECKBOX EVENT -----
	$(document).on("click", "[type=checkbox]", function() {
		updateDeleteButton();
	})
	// ----- END CHECKBOX EVENT -----


	// ----- CHECK ALL -----
	$(document).on("change", ".checkboxall", function() {
		const isChecked = $(this).prop("checked");
		const isProject = $(this).attr("project") == "true";
		if (isProject) {
			$(".checkboxrow[project=true]").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
		} else {
			$(".checkboxrow[company=true]").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
		}
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


    // ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {
		let isProject = $(this).attr("project") == "true";
        let row = getItemRow(isProject);
		if (isProject) {
			$(".itemProjectTableBody").append(row);
		} else {
			$(".itemCompanyTableBody").append(row);
		}
		updateTableItems();
		initInputmask();
		initAmount();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		// const attr        = isProject ? "[project=true]" : "[company=true]";
		// const quantityArr = $.find(`[name=quantity]${attr}`).map(element => element.value || "0");
		// const unitCostArr = $.find(`[name=unitCost]${attr}`).map(element => element.value.replaceAll(",", "") || "0");
		// const total = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);

		let total = 0;
		$(".itemTableRow").each(function() {
			const quantity = +getNonFormattedAmount($(`[name="forPurchase"]`, this).val()) || 0;
			const unitCost  = +getNonFormattedAmount($(`.unitcost`, this).text());
			const tempTotal = quantity * unitCost;
			total += tempTotal;
		})

		// $(`#total${attr}`).text(formatAmount(total, true));
		$(`#total`).text(formatAmount(total, true));

		const discount    = getNonFormattedAmount($("#discount").val());
		const totalAmount = total - discount;
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
		const isProject = $(this).closest("tbody").attr("project") == "true";
		const attr      = isProject ? "[project=true]" : "[company=true]";

		const quantity = +getNonFormattedAmount($(this).val());
		const unitCost = +getNonFormattedAmount($(this).closest("tr").find(".unitcost").text());
		const totalCost = quantity * unitCost;
		$(this).closest("tr").find(".totalcost").text(formatAmount(totalCost, true));

		// const quantity  = +$(`#quantity${index}${attr}`).val();
		// const unitcost  = +$(`#unitcost${index}${attr}`).val().replaceAll(",", "");
		// const totalcost = quantity * unitcost;
		// $(`#totalcost${index}${attr}`).text(formatAmount(totalcost, true));
		updateTotalAmount(isProject);
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=discount]", function() {
		const discount = getNonFormattedAmount($(this).val());
		const total    = getNonFormattedAmount($("#total").text());
		
		const totalAmount = total - discount;
		$("#totalAmount").html(formatAmount(totalAmount, true));

		const isVatable = $(`[name="inventoryVendorID"]`).length > 0 ? $(`[name="inventoryVendorID"] option:selected`).attr("vatable") == "true" : false;
		let vat = 0, vatSales = 0;
		if (isVatable) {
			vatSales = totalAmount / 1.12;
			vat      = totalAmount - vatSales;
		}

		// const vat      = getNonFormattedAmount($("[name=vat]").val())
		// const vatSales = totalAmount - vat;
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
		const purchaseOrderID = $(this).attr("purchaseOrderID");
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

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {

			data["employeeID"]        = sessionID;
			data["bidRecapID"]        = $("[name=bidRecapID]").val();
			data["purchaseRequestID"] = $(`[name="bidRecapID"] option:selected`).attr("purchaseRequestID");
			data["categoryType"]      = $("[name=categoryType]").val();
			data["inventoryVendorID"] = $("[name=inventoryVendorID]").val();
			
			data["vendorName"]           = $("[name=vendorName]").val();
			data["vendorContactDetails"] = $("[name=vendorContactDetails]").val();
			data["vendorContactPerson"]  = $("[name=vendorContactPerson]").val();
			data["vendorAddress"]        = $("[name=vendorAddress]").val();

			data["paymentTerms"]     = $("[name=paymentTerms]").val()?.trim();
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
					const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "company";

					const requestItemID = $(this).attr("requestItemID");
	
					const itemID      = $("td [name=itemID]", this).val();	
					const forPurchase = +$("td [name=forPurchase]", this).val() || +getNonFormattedAmount($("td .forPurchase", this).text());	
					
					// const unitcost  = +$("td [name=unitCost]", this).val().replaceAll(",", "");	
					const unitCost  = +getNonFormattedAmount($("td .unitcost", this).text());
					const totalCost = forPurchase * unitCost;
					const remarks   = $("td [name=remarks]", this).val()?.trim() || $("td .remarks", this).text()?.trim();	
	
					let temp = {
						requestItemID,
						itemID, 
						forPurchase, 
						unitCost, 
						totalCost: totalCost.toFixed(2),
						categoryType, 
						remarks, 
						createdBy: sessionID, 
						updatedBy: sessionID
					};
	
					const isHadExistingFile = $("td .file .displayfile", this).text().trim().length > 0;
					if (isHadExistingFile) {
						const filename = $("td .file .displayfile .filename", this).text().trim();
						temp["existingFile"] = filename;
						temp["filename"]     = filename;
					}
					data["items"].push(temp);
				});
			// }
		} 

		return data;
	} 
	// ----- END GET PURCHASE ORDER DATA -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			purchaseOrderID       = "",
			revisePurchaseOrderID = "",
			employeeID            = "",
			projectID             = "",
			bidRecapID            = 0,
			inventoryVendorID     = "",
			vendorName            = "",
			vendorAddress         = "",
			vendorContactDetails  = "",
			vendorContactPerson   = "",
			paymentTerms          = "",
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
		let disabledCategoryType = categoryType && categoryType != "" ? "disabled" : disabled;

		$("#btnBack").attr("purchaseOrderID", purchaseOrderID);
		$("#btnBack").attr("status", purchaseOrderStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let button = formButtons(data, isRevise);

		// ----- PRINT BUTTON -----
		let approvedButton = '';
		if (purchaseOrderStatus == 2) {
			approvedButton += `<div class="w-100 text-right pb-4">`;
			if (grandTotalAmount > 150000) {
				approvedButton += contractFile ? `
				<a href="${base_url}assets/upload-files/contracts/${contractFile}" 
					class="pr-3" 
					id="displayContract">${contractFile}</a>` : "";
				if (employeeID == sessionID) {
					approvedButton += `
					<input type="file"
						id="contractFile"
						name="contractFile"
						purchaseOrderID="${purchaseOrderID}"
						class="d-none"
						accept="image/*, .pdf, .docx, .doc">
					<button 
						class="btn btn-secondary py-2" 
						purchaseOrderID="${purchaseOrderID}"
						id="btnUploadContract">
						<i class="fas fa-file-upload"></i> Upload Contract
					</button>`;
				}
			}

			if (isPrintAllowed(47)) {
				approvedButton += `
					<button 
						class="btn btn-info py-2" 
						purchaseOrderID="${purchaseOrderID}"
						id="btnExcel">
						<i class="fas fa-file-excel"></i> Excel
					</button>
				</div>`;
			}
		}
		// ----- END PRINT BUTTON -----

		let reviseDocumentNo    = isRevise ? purchaseOrderID : revisePurchaseOrderID;
		let documentHeaderClass = isRevise || revisePurchaseOrderID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePurchaseOrderID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePurchaseOrderID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
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

			<div class="col-md-4 col-sm-12">
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
					<label>Category Type ${!disabledCategoryType ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="categoryType"
						id="categoryType"
						style="width: 100%"
						required
						${disabledCategoryType}>
						${getCategoryType(bidRecapID, inventoryVendorID, categoryType)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-categoryType"></div>
				</div>
			</div>


            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
                        required
						disabled>
                        <option selected disabled>-</option>
                        ${getProjectList(projectID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="-">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control" name="vendorName" disabled value="${vendorName || "-"}">
                </div>
            </div>
			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Details</label>
                    <input type="text" class="form-control" name="vendorContactDetails" disabled value="${vendorContactDetails || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Person</label>
                    <input type="text" class="form-control" name="vendorContactPerson" disabled value="${vendorContactPerson || "-"}">
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Company Address</label>
                    <input type="text" class="form-control" name="vendorAddress" disabled value="${vendorAddress || "-"}">
                </div>
            </div>
            
            <div class="col-md-6 col-sm-12">
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
            <div class="col-md-6 col-sm-12">
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
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
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
			<div class="col-sm-12" id="tableRequestItems">
				${getCategoryTypeTable(data, readOnly, isRevise)}
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
			updateTableItems();
			initAll();
			updateInventoryItemOptions();
			// projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			bidRecapID && bidRecapID != 0 && $(`[name="bidRecapID"]`).trigger("change");
			initAmount("#discount", true);
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
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
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
			headerButton(false, "", isRevise);
			headerTabContent(false);
			formContent(data, readOnly, isRevise);
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
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id = $(this).attr("purchaseOrderID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("purchaseOrderID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PO", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getPurchaseOrderData(action, "save", "0", id, status, revise);
				data["purchaseOrderStatus"]   = 0;
				data["revisePurchaseOrderID"] = id;
				delete data["purchaseOrderID"];
	
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
		const id       = $(this).attr("purchaseOrderID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PO", dateToday(), id);
		const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getPurchaseOrderData(action, "save", "0", id, "0", revise);
		data["purchaseOrderStatus"] = 0;

		if (revise) {
			data["revisePurchaseOrderID"] = id;
			delete data["purchaseOrderID"];
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
			showNotification("danger", "Please select correct reference number.");
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


	// ----- CHECK COST SUMMARY -----
	function checkCostSummary() {
		const total       = getNonFormattedAmount($(`#total`).text());
		const discount    = getNonFormattedAmount($(`[name="discount"]`).val());
		const totalAmount = total - discount;
		const lessEwt     = getNonFormattedAmount($(`[name="lessEwt"]`).val());

		if (discount > total) {
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
		const id       = $(this).attr("purchaseOrderID");
		const revise   = $(this).attr("revise") == "true";
		const validate = validateForm("form_purchase_order");
		const isValid  = checkTableMaterialsEquipment();
		removeIsValid("#tableProjectOrderItems0");
		removeIsValid("#tableCompanyOrderItems0");
		const costSummary = checkCostSummary();

		if (validate && isValid && costSummary) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getPurchaseOrderData(action, "submit", "1", id, "0", revise);

			if (revise) {
				data["revisePurchaseOrderID"] = id;
				delete data["purchaseOrderID"];
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
		const id     = $(this).attr("purchaseOrderID");
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
		const id       = $(this).attr("purchaseOrderID");
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
			purchaseOrderID="${id}"
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
		const purchaseOrderID = $(this).attr("purchaseorderid");
		const url = `${base_url}ims/purchase_order/downloadExcel?id=${purchaseOrderID}`;
		window.location.replace(url); 
	})
	// ----- END DOWNLOAD EXCEL -----


})



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
								$("#displayContract").text(filename);
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