$(document).ready(function() {

		//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
		const allowedUpdate = isUpdateAllowed(33);
		if(!allowedUpdate){
			$("#page_content").find("input, select, textarea").each(function(){
				$(this).attr("disabled",true);
			});
			$("#btnSubmit").hide();
		}
	
		//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("Inventory Receiving");
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
			const revisedDocumentsID = getTableData("ims_inventory_receiving_tbl", "reviseInventoryReceivingID", "reviseInventoryReceivingID IS NOT NULL");
			return revisedDocumentsID.map(item => item.reviseInventoryReceivingID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_inventory_receiving_tbl", "", "inventoryReceivingID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					inventoryReceivingStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (inventoryReceivingStatus == 0 || inventoryReceivingStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (inventoryReceivingStatus == 0) {
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
				arr = url.split("?add=");
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					pageContent(true);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/inventory_receiving?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/inventory_receiving?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/inventory_receiving?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/inventory_receiving`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	// const purchaseOrderList = getTableData(
	// 	`ims_purchase_order_tbl AS ipot
	// 		LEFT JOIN ims_request_items_tbl AS irit USING(purchaseOrderID)`,
	// 	"ipot.*",
	// 	`ipot.purchaseOrderStatus = 2 AND 
	// 	irit.orderedPending IS NULL OR irit.orderedPending <> 0
	// 	GROUP BY irit.purchaseOrderID`
	// )
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
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 300 },
					{ targets: 6,  width: 80  },
					{ targets: 7,  width: 250 },
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
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 300 },
					{ targets: 6,  width: 80  },
					{ targets: 7,  width: 250 },
				],
			});

        var table = $("#tableInventoryReceivingItems")
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
					{ targets: 0,  width: 120 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 200 },
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 80  },
					{ targets: 7,  width: 50  },
					{ targets: 8,  width: 300 },
				],
			});

			var table = $("#tableInventoryReceivingItems0")
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
                    { targets: 0,  width: 120 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 200 },
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 50  },
					{ targets: 7,  width: 50  },
					{ targets: 8,  width: 300 },
				],
			});

	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_inventory_receiving_tbl", "approversID")) {
				let count = getCountForApproval("ims_inventory_receiving_tbl", "inventoryReceivingStatus");
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
			if(isCreateAllowed(33)){
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


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let inventoryReceivingData = getTableData(
			`ims_inventory_receiving_tbl AS isrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN ims_purchase_order_tbl AS pct ON isrt.purchaseOrderID = pct.purchaseOrderID`,
			"isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,isrt.inventoryReceivingID ,isrt.createdAt AS dateCreatedIR, pct.purchaseOrderID, pct.createdAt AS dateCreatedPO",
			`isrt.employeeID != ${sessionID} AND inventoryReceivingStatus != 0 AND inventoryReceivingStatus != 4`,
			`FIELD(inventoryReceivingStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Reference No.</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		inventoryReceivingData.map((item) => {
			let {
				fullname,
				inventoryReceivingID,
				dateCreatedIR,
				purchaseOrderID,
				dateCreatedPO,
				approversID,
				approversDate,
				inventoryReceivingStatus,
				inventoryReceivingRemarks,
				inventoryReceivingReason,
				submittedAt,
				createdAt
			} = item;

			let remarks       = inventoryReceivingRemarks ? inventoryReceivingRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryReceivingStatus == 2 || inventoryReceivingStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = inventoryReceivingStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(inventoryReceivingID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(inventoryReceivingID)}" 
				code="${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			let btnClass =  inventoryReceivingStatus != 0 ? `btnView` : `btnEdit`;

			if (isImCurrentApprover(approversID, approversDate, inventoryReceivingStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(inventoryReceivingID)}">
					<td>${getFormCode("INRR", createdAt, inventoryReceivingID)}</td>
					<td>${fullname}</td>
					<td>${getFormCode("PO", dateCreatedPO, purchaseOrderID)}</td>
					<td>${inventoryReceivingReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryReceivingStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(inventoryReceivingStatus)}
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
		let inventoryReceivingData = getTableData(
            `ims_inventory_receiving_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN ims_purchase_order_tbl AS pct ON isrt.purchaseOrderID = pct.purchaseOrderID`,
            "isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,isrt.inventoryReceivingID ,isrt.createdAt AS dateCreatedIR, pct.purchaseOrderID, pct.createdAt AS dateCreatedPO",
			`isrt.employeeID = ${sessionID}`,
			`FIELD(inventoryReceivingStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Reference No.</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		inventoryReceivingData.map((item) => {
			let {
				fullname,
				inventoryReceivingID,
				dateCreatedIR,
				purchaseOrderID,
				dateCreatedPO,
				approversID,
				approversDate,
				inventoryReceivingStatus,
				inventoryReceivingRemarks,
				inventoryReceivingReason,
				submittedAt,
			} = item;

			let remarks       = inventoryReceivingRemarks ? inventoryReceivingRemarks : "-";
			let dateCreated   = moment(dateCreatedIR).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryReceivingStatus == 2 || inventoryReceivingStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = inventoryReceivingStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(inventoryReceivingID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(inventoryReceivingID)}" 
                code="${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			let btnClass =  inventoryReceivingStatus != 0 ? `btnView` : `btnEdit`;

			html += `
            <tr class="${btnClass}" id="${encryptString(inventoryReceivingID)}">
                <td>${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}</td>
                <td>${fullname}</td>
                <td>${getFormCode("PO", dateCreatedPO, purchaseOrderID)}</td>
				<td>${inventoryReceivingReason}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryReceivingStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(inventoryReceivingStatus)}
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
				inventoryReceivingID     = "",
				inventoryReceivingStatus = "",
				employeeID               = "",
				approversID              = "",
				approversDate            = "",
				createdAt                = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (inventoryReceivingStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						inventoryReceivingID="${inventoryReceivingID}"
						code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
						revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel  px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryReceivingID="${inventoryReceivingID}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (inventoryReceivingStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryReceivingID="${inventoryReceivingID}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							status="${inventoryReceivingStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (inventoryReceivingStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						inventoryReceivingID="${encryptString(inventoryReceivingID)}"
						code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
						status="${inventoryReceivingStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
					
				} else if (inventoryReceivingStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(inventoryReceivingID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							status="${inventoryReceivingStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (inventoryReceivingStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(inventoryReceivingID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							status="${inventoryReceivingStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (inventoryReceivingStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
					
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"><i class="fas fa-ban"></i> 
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
				class="btn btn-cancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


    // ----- GET PURCHASE ORDER LIST -----
    function getPurchaseOrderList(id = null, status = 0, display = true) {
		var exist = [];
		var condition  ="";
		const receivingList = getTableData(
			`ims_inventory_receiving_tbl`,
			"purchaseOrderID ",`inventoryReceivingStatus = 1`
		);
		receivingList.map(items=>{
			exist.push(items.purchaseOrderID);
		})

		if(status === false){
			
			 condition  =`(ipot.purchaseOrderStatus = 2 AND 
				((iir.inventoryReceivingStatus != 1 AND 
					iir.inventoryReceivingStatus != 0 AND 
					iir.inventoryReceivingStatus != 3 AND 
					iir.inventoryReceivingStatus != 4 AND 
					iir.inventoryReceivingStatus != 5) OR 
					(iir.inventoryReceivingStatus IS NULL))) AND 
					(irit.orderedPending IS NULL OR irit.orderedPending > 0) `;

			// condition  =`(ipot.purchaseOrderStatus = 2 AND 
			// 		((iir.inventoryReceivingStatus IS NULL))) AND 
			// 		(irit.orderedPending IS NULL OR (CASE WHEN iir.inventoryReceivingStatus != 1 AND 
			// 		iir.inventoryReceivingStatus != 0 AND 
			// 		iir.inventoryReceivingStatus != 3 AND 
			// 		iir.inventoryReceivingStatus != 4 AND 
			// 		iir.inventoryReceivingStatus != 5 THEN irit.orderedPending > 0 Else '' END) ) `;
		}
		else{
			
			condition  =`(ipot.purchaseOrderStatus = 2 AND iir.purchaseOrderID =${id} )`;
		}

		const purchaseOrderList = getTableData(
			`ims_purchase_order_tbl AS ipot
				LEFT JOIN ims_request_items_tbl AS irit USING(purchaseOrderID)
				LEFT JOIN ims_inventory_receiving_tbl AS iir ON iir.purchaseOrderID = ipot.purchaseOrderID`,
			"ipot.*",
			`${condition} GROUP BY irit.purchaseOrderID`
		)

		// const createdIRList = getTableData(
		// 	`ims_inventory_receiving_tbl AS iirt
		// 		LEFT JOIN ims_inventory_receiving_details_tbl AS iirdt USING(inventoryReceivingID)
		// 		LEFT JOIN ims_request_items_tbl AS irit USING(requestItemID)`, 
		// 	"iirt.purchaseOrderID", 
		// 	`iirt.inventoryReceivingStatus <> 3 AND 
		// 	iirt.inventoryReceivingStatus <> 4 AND 
		// 	(irit.orderedPending IS NOT NULL AND irit.orderedPending >= irit.forPurchase)`
		// ).map(po => po.purchaseOrderID);
		let html = '';
		if (!status || status == 0) {
			// html += purchaseOrderList.filter(po => createdIRList.indexOf(po.purchaseOrderID) == -1 || po.purchaseOrderID == id).map(po => {
			
			html += purchaseOrderList.filter(po => !exist.includes(po.purchaseOrderID) || po.purchaseOrderID == id).map(po => {
				return `
				<option 
					value      = "${po.purchaseOrderID}" 
					vendorname = "${po.vendorName}"
					timelineBuilderID = "${po.timelineBuilderID}"
					projectCode = "${po.projectCode}"
					projectName = "${po.projectName}"
					clientName = "${po.clientName}"
				${po.purchaseOrderID == id && "selected"}>
				${getFormCode("PO", po.createdAt, po.purchaseOrderID)}
				</option>`;
			})
		} else {
			html += purchaseOrderList.map(po => {
				return `
				<option 
					value      = "${po.purchaseOrderID}" 
					vendorname = "${po.vendorName}"
					timelineBuilderID = "${po.timelineBuilderID}"
					projectCode = "${po.projectCode}"
					projectName = "${po.projectName}"
					clientName = "${po.clientName}"
					${po.purchaseOrderID == id && "selected"}>
					${getFormCode("PO", po.createdAt, po.purchaseOrderID)}
				</option>`;
			})
		}
        return display ? html : purchaseOrderList;
    }
    // ----- END GET PURCHASE ORDER LIST -----


	// ----- GET SERIAL NUMBER -----
	function getSerialNumber(scope = {}, readOnly = false) {
		let {
			serialNumber = "",
		} = scope;

		let html = "";
		if (!readOnly) {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						<div class="input-group mb-0">
							<input type="text"
								class="form-control validate"
								name="serialNumber"
								id="serialNumber"
								data-allowcharacters="[A-Z][a-z][0-9][-]"
								minlength="17"
								maxlength="17"
								value="${serialNumber}"
								autocomplete="off"
								required>
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serialNumber"></div>
						</div>
					</div>
				</td>
			</tr>`;
		} else {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						${serialNumber || "-"}
					</div>
				</td>
			</tr>`;
		}

		
		return html;
	}
	// ----- END GET SERIAL NUMBER -----
	var serialArray =[];
	var serialLocationArray =[];

	function hasDuplicates(arr) {
		return new Set(arr).size !== arr.length;
	}

	function countDuplicates(original) {
		const uniqueItems = new Set();
		const duplicates = new Set();
		for (const value of original) {
		  if (uniqueItems.has(value)) {
			duplicates.add(value);
			uniqueItems.delete(value);
		  } else {
			uniqueItems.add(value);
		  }
		}
		return duplicates.size;
	  }

	
	
	$(document).on("keyup change","[name=serialNumber]",function(){
		const serialval   = $(this).val(); 
		const addressID = $(this).attr("id");
		var $parent = $(this);
		var flag = ["true"];

		if(serialval.length ==17){
			$(`[name="serialNumber"]`).each(function(i) {
				var tmp_Checkserial = $(this).val();
				var tmp_addressID = $(this).attr("id");
					if(addressID !=  tmp_addressID){
						if(tmp_Checkserial == serialval){
							$parent.removeClass("is-valid").addClass("is-invalid");
							$parent.closest("tr").find(".invalid-feedback").text('Data already exist!');
							flag[0]= false;
						}
					}
			})
	
			if(flag[0] == "true"){
	
			$(`[name="serialNumber"]`).each(function(i) {
				var tmp_Checkserial = $(this).val();
				var tmp_addressID = $(this).attr("id");
				// console.log(addressID +" != "+  tmp_addressID)
					if(addressID !=  tmp_addressID){
						if(tmp_Checkserial == serialval){
							$parent.removeClass("is-valid").addClass("is-invalid");
							$parent.closest("tr").find(".invalid-feedback").text('Data already exist!');
						
						}
					}
				
			})
			}
		}
	});


	// ----- UPDATE SERIAL NUMBER -----
	function updateSerialNumber() {
		$(`[name="serialNumber"]`).each(function(i) {
			$(this).attr("id", `serialNumber${i}`);
			$(this).parent().find(".invalid-feedback").attr("id", `invalid-serialNumber${i}`);
		})
		$(`[name="received"]`).each(function(i) {
			$(this).attr("id", `received${i}`);
			$(this).parent().find(".invalid-feedback").attr("id", `invalid-received${i}`);
		})
	}
	// ----- END UPDATE SERIAL NUMBER -----


	// ----- GET SERVICE ROW -----
    function getItemsRow(id, readOnly = false, inventoryReceivingID = "") {
        let html = "";
		let requestItemsData;	
		if (inventoryReceivingID) {
			requestItemsData = getTableData(
				`ims_inventory_receiving_details_tbl AS iirdt
				LEFT JOIN ims_request_items_tbl AS irit USING(requestItemID)`,
				`iirdt.*, 
				irit.itemName, 
				irit.forPurchase, 
				irit.brandName,
				irit.orderedPending,
				iirdt.received,
				irit.itemUom,
				iirdt.remarks,
				iirdt.createdAt`,
				`iirdt.inventoryReceivingID = ${inventoryReceivingID}`
			)
		} else {
			requestItemsData = getTableData(
				"ims_request_items_tbl", 
				"", 
				`purchaseOrderID = ${id} AND (orderedPending != 0 OR orderedPending IS NULL) `
			)
		}

		if (requestItemsData.length > 0) {
			requestItemsData.map(item => {
		   
				let {
					requestItemID               = "",
					inventoryReceivingDetailsID = 0,
					itemID                      = "",
					itemName                    = "",
					brandName                   = "",
					forPurchase                 = "",
					orderedPending              = "",
					received                    = "",
					itemUom                     = "",
					remarks                     = "",
					createdAt                   = ""
				} = item;

				let pending = orderedPending ? orderedPending : forPurchase;
	
				// const buttonAddRow = !readOnly ? `
				// <button class="btn btn-md btn-primary float-left ml-2 my-1 btnAddSerial">
				// 	<i class="fas fa-plus"></i> Add Serial
				// </button>
				// ` : ""

				const buttonAddRow = !readOnly ? `
					<div class="w-100 text-center">
						<input type="checkbox" class="form-check-label btnAddSerial" > Add Serial Number</input>
					</div>
				` : "";
					
				const scopeData = getTableData(
					`ims_receiving_serial_number_tbl`,
					``,
					`inventoryReceivingDetailsID = ${inventoryReceivingDetailsID} AND  itemID = ${itemID}`
				);
				
				
				let serialNumberData  		= 	scopeData.filter(x => x.serialNumber == "" || !x.serialNumber);
				let serialNumberDataLength 	= 	serialNumberData.length;

				let itemSerialNumbers = `
				<div class="table-responsive">
					<table class="table table-bordered">
					
						<tbody class="tableSerialBody">
						`;
					
						if (scopeData.length > 0 && inventoryReceivingID != "" && serialNumberDataLength > 0) {
							itemSerialNumbers += scopeData.map(scope => {
								return getSerialNumber(scope, readOnly);
							}).join("");
						} else {
							itemSerialNumbers += getSerialNumber({}, readOnly);
						}
					
				itemSerialNumbers += `
						</tbody>
					</table>
					
				</div>`;
				
				if(inventoryReceivingID){
					itemSerialNumbers = `
						<div class="table-responsive">
							<table class="table table-bordered serial-number-table">
							
								<tbody class="tableSerialBody">
								`;
							
								if (scopeData.length > 0 && inventoryReceivingID != "") {
									itemSerialNumbers += scopeData.map(scope => {
										return getSerialNumber(scope, readOnly);
									}).join("");
								} else {
									itemSerialNumbers += getSerialNumber({}, readOnly);
								}
							
							itemSerialNumbers += `
								</tbody>
							</table>
							
						</div>`;
				}else{
					itemSerialNumbers = `
				<div class="table-responsive">
					<table class="table table-bordered serial-number-table">

					</table>
				</div>`;
				}	

				if (readOnly) {
					html += `
					<tr class="itemTableRow" requestItemID="${requestItemID}">
						<td>
							<div class="itemcode" >${getFormCode("ITM",moment(createdAt),itemID)}</div>
						</td>
						<td>
							<div class="itemname">${itemName || "-"}</div>
						</td>
						<td>
							<div class="brandname">${brandName || "-"}</div>
						</td>
						<td class="table-data-serial-number">
							${itemSerialNumbers}
						</td>
						<td class="text-center">
							<div class="ordered">
								${forPurchase}
							</div>
						</td>
						
						<td class="text-center">
							<div class="received">${received || "-"}</div>
						</td>

						<td class="text-center">
							<div class="pending">${(pending < 1 ? "0.00" : pending ) || "-"}</div>
						</td>

						<td>
							<div class="uom">${itemUom || "-"}</div>
						</td>
						<td>
							<div class="remarks">${remarks || "-"}</div>
						</td>
					</tr>`;
				} else {
					html += `
					<tr class="itemTableRow" requestItemID="${requestItemID}">
						<td>
							<div class="itemcode" name="itemcode" requestitem="${itemID}">${getFormCode("ITM",moment(createdAt), itemID)}</div>
						</td>
						<td>
							<div class="itemname">${itemName || "-"}</div>
						</td>
						<td>
							<div class="brandname">${brandName || "-"}</div>
						</td>
						<td class="table-data-serial-number">
							${itemSerialNumbers}
							${buttonAddRow}
						</td>
						<td class="text-center">
							<div class="ordered" name="ordered">
								${forPurchase}
							</div>
						</td>
						<td>
						<div class="received">
							<input 
									type="text" 
									class="form-control input-quantity text-center"
									data-allowcharacters="[0-9]" 
									min="0"
									 
									id="received" 
									name="received" 
									value="${inventoryReceivingID ? received : ""}" 
									minlength="1" 
									maxlength="20" 
									>
								<div class="invalid-feedback d-block" id="invalid-received"></div>
						</div>
						</td>

						<td class="text-center">
							<div class="pending">${(pending < 1 ? "0.00" : pending ) || "-"}</div>
						</td>
						
						<td>
							<div class="uom">${itemUom || ""}</div>
						</td>
						<td>
							<div class="remarks">
								<textarea 
									rows="2" 
									style="resize: none" 
									class="form-control validate" 
									data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
									minlength="1"
									maxlength="100"
									name="remarks" 
									id="remarks">${inventoryReceivingID  ? remarks : "" }</textarea>
							</div>
						</td>
					</tr>`;
				}
			})
		} else {
			html += `
			<tr class="text-center">
				<td colspan="9">No data available in table</td>
			</tr>`
		}

        return html;
		
    }
    // ----- END GET SERVICE ROW -----


	// ----- SELECT PURCHASE ORDER -----
    $(document).on("change", "[name=purchaseOrderID]", function() {
        const vendorname 			= $('option:selected', this).attr("vendorname");
        const id 					= $(this).val();
        let inventoryreceivingid 	= $(this).attr("inventoryreceivingid");
		let timelineBuilderID 		= $('option:selected', this).attr("timelinebuilderid")
        let projectCode 			= $('option:selected', this).attr("projectcode");
        let projectName 			= $('option:selected', this).attr("projectname");
        let clientName 				= $('option:selected', this).attr("clientname");
        let executeonce 	        = $(this).attr("executeonce") == "true";
		var readOnly			    = $(this).attr("disabled") == "disabled";
		const status                = $(this).attr("status");
		inventoryreceivingid        = executeonce ? inventoryreceivingid : null;

        $("[name=vendorName]").val(vendorname);
        $("[name=projectCode]").val(projectCode);
        $("[name=projectName]").val(projectName);
        $("[name=clientName]").val(clientName);
        $(".purchaseOrderItemsBody").html('<tr><td colspan="8">'+preloader+'</td></tr>');

        let purchaseOrderItemsBody = getItemsRow(id, readOnly, inventoryreceivingid);
        setTimeout(() => {
			$(".purchaseOrderItemsBody").html(purchaseOrderItemsBody);
			initQuantity();
			updateSerialNumber();
			$(this).removeAttr("executeonce");
		}, 300);
    })
    // ----- END SELECT PURCHASE ORDER -----


	// ----- CHECK SERIAL ROW AND RECEIVED -----
	// function checkSerialRowReceived(parentTable = null) {
	// 	if (parentTable) {
	// 		const serialRow        = $(`.tableSerialBody tr`, parentTable).length;
	// 		const receivedQuantity = +$(`.received [name="received"]`, parentTable).val() || 0;
		
	// 		if (serialRow == receivedQuantity) {
	// 			$(`.received [name="received"]`, parentTable).removeClass("is-valid, no-error").removeClass("is-invalid");
	// 			$(`.received .invalid-feedback`, parentTable).text("");

	// 			$(`.tableSerialBody tr`, parentTable).each(function() {
	// 				if($(`.servicescope .invalid-feedback`, this).text() != "Data already exist!"){
	// 				$(`.servicescope [name="serialNumber"]`, this).removeClass("is-valid").removeClass("no-error").removeClass("is-invalid");
	// 				$(`.servicescope .invalid-feedback`, this).text("");
	// 				}
	// 			})
	// 		}
	// 	}
	// }
	// ----- END CHECK SERIAL ROW AND RECEIVED -----


	// ----- ADD SERIAL -----
	$(document).on("click", ".btnAddSerial", function() {
		let thisEvent 		= $(this);
		let thisCheck 		= thisEvent[0].checked;
		let thisTR 	  		= thisEvent.closest(".itemTableRow");
		let thisTableData	= thisEvent.closest(".table-data-serial-number");
		
		thisTableData.find("table").html(`<tbody><tr><td>${preloader}</td></tr></tbody>`);

					if(thisCheck){
						let thisReceived	= thisTR.find(".input-quantity").val();
						let arrayCount		= thisReceived ? parseInt(thisReceived) : 0;
						let subTable  		= thisTableData.find("table");
						if(arrayCount == 0){
							thisTableData.find("table").html(``);
						}else{
							thisTableData.find("table").html(`<tbody></tbody>`);
							for (let index = 0; index < arrayCount; index++) {
								let newSerial = getSerialNumber();
								subTable.find("tbody").append(newSerial);
								updateSerialNumber();
								// checkSerialRowReceived(thisTR);
							}
						}
					}else{
						thisTableData.find("table").html(``);
					}
		// let newSerial = getSerialNumber();
		// $(this).parent().find("table tbody").append(newSerial);
		// $(this).parent().find("[name=serialNumber]").last().focus();
		// updateSerialNumber();

		// const parentTable = $(this).closest("tr.itemTableRow");
		// checkSerialRowReceived(parentTable);
	})
	// ----- END ADD SERIAL -----


	// ----- DELETE SERIAL -----
	// $(document).on("click", ".btnDeleteSerial", function() {
	// 	const isCanDelete = $(this).closest(".tableSerialBody").find("tr").length > 1;
		
	// 	if (isCanDelete) {
	// 		const scopeElement = $(this).closest("tr");
	// 		scopeElement.fadeOut(500, function() {
	// 			const parentTable = $(this).closest("tr.itemTableRow");
	// 			$(this).closest("tr").remove();
	// 			checkSerialRowReceived(parentTable);
	// 		})
	// 	} else {
	// 		showNotification("danger", "You must have atleast one serial number.");
	// 	}
	// })
	// ----- END DELETE SERIAL -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			inventoryReceivingID        = "",
			reviseInventoryReceivingID  = "",
			timelineBuilderID 			= "",
			projectCode					= "",
			projectName					= "",
			clientName					= "",
			employeeID              	= "",
			purchaseOrderID             = "",
			receiptNo               	= "",
			dateReceived               	= "",
			inventoryReceivingReason 	= "",
			inventoryReceivingRemarks   = "",
			approversID             	= "",
			approversStatus         	= "",
			approversDate           	= "",
			inventoryReceivingStatus    = false,
			submittedAt             	= false,
			createdAt               	= false,
		} = data && data[0];


		let purchaseOrderItems = "";
		if (inventoryReceivingID) {
			purchaseOrderItems = getItemsRow(purchaseOrderID, readOnly, inventoryReceivingID);
		} 
    
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("inventoryReceivingID", inventoryReceivingID);
		$("#btnBack").attr("status", inventoryReceivingStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let disabledReference = purchaseOrderID && purchaseOrderID != "0" ? "disabled" : disabled;

		let tableInventoryReceivingItems = !disabled ? "tableInventoryReceivingItems" : "tableInventoryReceivingItems0";

		let button = formButtons(data, isRevise, isFromCancelledDocument);
		let reviseDocumentNo    = isRevise ? inventoryReceivingID  : reviseInventoryReceivingID ;
		let documentHeaderClass = isRevise || reviseInventoryReceivingID  ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseInventoryReceivingID  ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseInventoryReceivingID  ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("INRR", createdAt, reviseDocumentNo)}
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
							${inventoryReceivingID  && !isRevise ? getFormCode("INRR", createdAt, inventoryReceivingID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${inventoryReceivingStatus && !isRevise ? getStatusStyle(inventoryReceivingStatus) : "---"}
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
								${getDateApproved(inventoryReceivingStatus, approversID, approversDate)}
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
							${inventoryReceivingRemarks && !isRevise ? inventoryReceivingRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="form_inventory_receiving">
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="purchaseOrderID"
                        id="purchaseOrderID"
                        style="width: 100%"
                        required
						inventoryreceivingid ="${inventoryReceivingID}"
						readonly="${disabled}"
						status="${inventoryReceivingStatus}"
						executeonce="${inventoryReceivingStatus ? true : false}"
						${disabled}>
                        <option selected disabled>Select Reference No.</option>
                        ${getPurchaseOrderList(purchaseOrderID, inventoryReceivingStatus)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-purchaseOrderID"></div>
                </div>
            </div>
			<div class="col-md-3 col-sm-12">
					<div class="form-group">
						<div class="d-flex justify-content-between align-items-center">
								<label>Receipt No. ${!disabled ? "<code>*</code>" : ""}</label>
								<label>${!disabled ? (receiptNo ? `<a href="${base_url+"assets/upload-files/receiving-receipts/"+receiptNo}" target="_blank">${receiptNo}</a>` : ``) : ``}</label>
						</div>
						${ disabled ? (receiptNo ? `<a href="${base_url+"assets/upload-files/receiving-receipts/"+receiptNo}" target="_blank">${receiptNo}</a>` : `-` )
						: `<input  type="file" 
									class="form-control" 
									name="receiptNo" 
									id="receiptNo"
									required
									accept="image/*, .pdf, .doc, .docx" ${disabled}>`}
						<div class="d-block invalid-feedback" id="invalid-receiptNo"></div>	
					</div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Vendor Name</label>
                    <input type="text" class="form-control" name="vendorName" disabled value="-">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
				 <div class="form-group">
                    <label>Date Received ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="dateReceived"
                        name="dateReceived"
                        value="${dateReceived && moment(dateReceived).format("MMMM DD, YYYY")}"
						${disabled}
						>
                    <div class="d-block invalid-feedback" id="invalid-dateReceived"></div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" name="projectCode" id="projectCode" class="form-control" disabled timelinebuilderid="${timelineBuilderID || "-" }" value="${projectCode || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" name="projectName" id="projectName" class="form-control" disabled value="${projectName || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" name="clientName" id="clientName" class="form-control" disabled value="${clientName || "-"}">
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
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="inventoryReceivingReason"
                        name="inventoryReceivingReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${inventoryReceivingReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-inventoryReceivingReason"></div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Receiving Item/s: </div>
                    <table class="table table-striped" id="${tableInventoryReceivingItems}">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th>Serial No.</th>
                                <th>Ordered</th>
								<th>Received ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Remaining</th>
                                <th>UOM</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="purchaseOrderItemsBody">
                            ${purchaseOrderItems}
                        </tbody>
                    </table>
                    
					
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
			initAll();
			updateSerialNumber();
			purchaseOrderID && purchaseOrderID != 0 && $("[name=purchaseOrderID]").trigger("change");
            !purchaseOrderID && purchaseOrderID == 0 && $("#dateReceived").val(moment(new Date).format("MMMM DD, YYYY"));
			$("#dateReceived").data("daterangepicker").maxDate = moment();
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

			headerButton(true, "Add Inventory Receiving");
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


	// ----- GET INVENTORY RECEIVING DATA -----
	function getInventoryReceivingData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
		//  console.log("id "+ id)
		//  console.log("action "+ action)
		//  console.log("status "+ status)
		 let data 		= { items: [] };
		 let formData 	= new FormData;
		 const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["inventoryReceivingID"] = id;
			formData.append("inventoryReceivingID", id);


			if (status != "2") {
				data["inventoryReceivingStatus"] = status;
				formData.append("inventoryReceivingStatus", status);
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);
	
		if (currentStatus == "0" && method != "approve") {
			var file = document.getElementById("receiptNo").files[0];
			data["employeeID"] 				 = sessionID;
			data["purchaseOrderID"]  		 = $("[name=purchaseOrderID]").val() || null;
			data["timelineBuilderID"]  		 = $("[name=purchaseOrderID]").find(":selected").attr("timelineBuilderID") || null;
			data["projectCode"]  		 	 = $("[name=purchaseOrderID]").find(":selected").attr("projectCode") || null;
			data["projectName"]  		 	 = $("[name=purchaseOrderID]").find(":selected").attr("projectName") || null;
			data["clientName"]  		 	 = $("[name=purchaseOrderID]").find(":selected").attr("clientName") || null;
			// data["receiptNo"]  				 = $("[name=receiptNo]").val() || null;
			data["file"]  				 	 = file;
			data["dateReceived"]     		 =  moment($("[name=dateReceived]").val()?.trim()).format("YYYY-MM-DD");
			data["inventoryReceivingReason"] = $("[name=inventoryReceivingReason]").val()?.trim();

			formData.append("employeeID", sessionID);
			formData.append("purchaseOrderID", $("[name=purchaseOrderID]").val() || null);
			formData.append("timelineBuilderID", $("[name=purchaseOrderID] option:selected").attr("timelineBuilderID") || null);
			formData.append("projectCode", $("[name=purchaseOrderID] option:selected").attr("projectCode") || null);
			formData.append("projectName", $("[name=purchaseOrderID] option:selected").attr("projectName") || null);
			formData.append("clientName", $("[name=purchaseOrderID] option:selected").attr("clientName") || null);
			formData.append("file", file);
			formData.append("dateReceived", moment($("[name=dateReceived]").val() ?.trim()).format("YYYY-MM-DD"));
			formData.append("inventoryReceivingReason", $("[name=inventoryReceivingReason]").val()?.trim());
			
			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["inventoryReceivingID"] = id;
				formData.append("inventoryReceivingID", id);
			}


			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           		= approversID;
					data["inventoryReceivingStatus"] 	= 1;

					formData.append("approversID", approversID);
					formData.append("inventoryReceivingStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           		= sessionID;
					data["approversStatus"]       		= 2;
					data["approversDate"]         		= dateToday();
					data["inventoryReceivingStatus"] 	= 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("inventoryReceivingStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const requestItemID = $(this).attr("requestItemID");
				const itemID    = $("td [name=itemcode]", this).attr("requestitem");	
				const received  = $("td [name=received]", this).val().replaceAll(",","");	
				const remarks   = $("td [name=remarks]", this).val()?.trim();	
               
				let temp = {
					requestItemID,
					itemID, 
                    received,
					remarks,
					scopes: []
				};

				formData.append(`items[${i}][requestItemID]`, requestItemID);
				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][received]`, received);
				formData.append(`items[${i}][remarks]`, remarks);
				
				$(`td .serial-number-table tbody > tr`, this).each(function(index,obj) {
					const serialNumber = $('[name="serialNumber"]', this).val()?.trim();
					let scope = {
						serialNumber,
						itemID:       itemID
					};
					temp["scopes"].push(scope);

					formData.append(`items[${i}][scopes][${index}][serialNumber]`, serialNumber);
					formData.append(`items[${i}][scopes][${index}][itemID]`, itemID);
				})
				
			

				data["items"].push(temp);
				// console.log(data) /////////////////////////// ENDDDDDDDDDDDDDDDDDDD MODIFYYYYYYYYYYYYYYYYY
			});
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET INVENTORY RECEIVING DATA -----


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
		const id = $(this).attr("inventoryReceivingID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("inventoryReceivingID");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				// const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getInventoryReceivingData(action, "save", "0", id);
				
				data["inventoryReceivingStatus"]   = 0;
				data.append("inventoryReceivingStatus", 0);
				
				// data["reviseInventoryReceivingID"] = id;

				// delete data["inventoryReceivingID"];

				if (!isFromCancelledDocument) {
					data["reviseInventoryReceivingID"] = id;
					data.append("reviseInventoryReceivingID", id);

					delete data["inventoryReceivingID"];

					// data.append("reviseInventoryReceivingID", id);
					// data.delete("inventoryReceivingID");
				} else {
					// delete data["inventoryReceivingID"];

					data["inventoryReceivingID"] = id;
					delete data["action"];
					data["action"] = update;

					// data.append("inventoryReceivingID", id);
					// data.delete("action");
					// data.append("action", "update");
				}
	
				saveInventoryReceiving(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getInventoryReceivingData(action, "save", "0", id);
			data["inventoryReceivingStatus"] = 0;
			// data.append("inventoryReceivingStatus", 0);

			saveInventoryReceiving(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		let receivedCondition = $("[name=received]").hasClass("is-invalid");
		let serialNumberCondition = $("[name=serialNumber]").hasClass("is-invalid");
		if(!receivedCondition && !serialNumberCondition){

			const id       = $(this).attr("inventoryReceivingID");
			const isFromCancelledDocument = $(this).attr("cancel") == "true";
			const revise   = $(this).attr("revise") == "true";
			const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
			const action   = revise && "insert" || (id && feedback ? "update" : "insert");
			const data     = getInventoryReceivingData(action, "save", "0", id);
			data["inventoryReceivingStatus"] = 0;
			data.append("inventoryReceivingStatus", 0);
			
			if (revise) {
				// data["reviseInventoryReceivingID"] = id;
				// delete data["inventoryReceivingID"];

				if (!isFromCancelledDocument) {
					data["reviseInventoryReceivingID"] = id;
					delete data["inventoryReceivingID"];

					data.append("reviseInventoryReceivingID", id);
					data.delete("inventoryReceivingID");
				} else {
					// delete data["inventoryReceivingID"];

					data["inventoryReceivingID"] = id;
					delete data["action"];
					data["action"] = update;

					data.append("inventoryReceivingID", id);
					data.delete("action");
					data.append("action", "update");
				}
			}
	
			saveInventoryReceiving(data, "save", null, pageContent);
		}else{
			$("[name=received]").focus();
			$("[name=serialNumber]").focus();
		}
		
	});
	// ----- END SAVE DOCUMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated,.is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- CHECK IF THE SERIAL IS CONNECTED TO RECEIVED QUANTITY -----
	function checkSerialReceivedQuantity() {
		var flag = ['false'];
		if ($(`.purchaseOrderItemsBody tr.itemTableRow`).length > 0) {
			$(`.itemTableRow`).each(function() {

				const receivedQuantity = parseFloat($(`[name="received"]`, this).val()) || 0;
			
				if ($(`td .serial-number-table tbody > tr`, this).length >= 1) {
					let countSerial = $(`td .serial-number-table tbody > tr`, this).length;
					var tmpSerialStorage =[];
					var counter =0;
						$(`td .serial-number-table tbody > tr`, this).each(function() {
							var conSerail = $(this).find("[name=serialNumber]").val() || "";
							if(conSerail !=""){
								tmpSerialStorage[counter++] = $(this).find("[name=serialNumber]").val();
							}	
						})

							if(tmpSerialStorage.length == 0 && receivedQuantity !=0 ){
								$(`td .serial-number-table tbody > tr`, this).each(function() {
									if($(`.servicescope .invalid-feedback`, this).text() !="Data already exist!"){
										$(`.servicescope [name="serialNumber"]`, this).removeClass("is-invalid");
										$(`.servicescope .invalid-feedback`, this).text("");
									}
								
									
							})
								flag[0] = true;
							}
							if(tmpSerialStorage.length >= 1 && receivedQuantity !=0 && countSerial == receivedQuantity ){
								$(`td .serial-number-table tbody > tr`, this).each(function() {
									if($(`.servicescope .invalid-feedback`, this).text() !="Data already exist!"){
									$(`.servicescope [name="serialNumber"]`, this).removeClass("is-invalid");
									$(`.servicescope .invalid-feedback`, this).text("");
									}
									
							})
								flag[0] = true;
							}
							if(tmpSerialStorage.length !=0  && countSerial != receivedQuantity || receivedQuantity ==0 ){ // exisitng all value
								$(`.received [name="received"]`, this).removeClass("is-valid, no-error").addClass("is-invalid");
								$(`.received .invalid-feedback`, this).text("Serial number is not equal on received items!");

								$(`td .serial-number-table tbody > tr`, this).each(function() {

										$(`.servicescope [name="serialNumber"]`, this).removeClass("is-valid").addClass("is-invalid");
										$(`.servicescope .invalid-feedback`, this).text("Serial number is not equal on received items!");
											
								})
								
								flag[0] = false;
							}else{
								$(`.received [name="received"]`, this).removeClass("is-invalid");
								$(`.received .invalid-feedback`, this).text("");

								$(`td .serial-number-table tbody > tr`, this).each(function() {
									if($(`.servicescope .invalid-feedback`, this).text() !="Data already exist!"){
										$(`.servicescope [name="serialNumber"]`, this).removeClass("is-invalid");
										$(`.servicescope .invalid-feedback`, this).text("");
									}
										
								})
								flag[0] = true;
							}
				}
				else{
					flag[0] = true;
				}
			})
			return flag;
		}
		
	}
	// ----- END CHECK IF THE SERIAL IS CONNECTED TO RECEIVED QUANTITY -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {

		const validateDuplicateSerial  = $("[name=serialNumber]").hasClass("is-invalid") ;
		const validateSerialMessage  = $(".invalid-feedback").text() ;
		// console.log("validateDuplicateSerial: "+ validateDuplicateSerial)
		// if(!validateDuplicateSerial || validateSerialMessage != "Data already exist!"){
			if(!validateDuplicateSerial){
			const validateSerial = checkSerialReceivedQuantity();
			
			if (validateSerial != "false") {
				const validate       = validateForm("form_inventory_receiving");
				// console.log("validate: "+ validate)
				removeIsValid("#tableInventoryReceivingItems");
				if(validate){
					const id             = $(this).attr("inventoryReceivingID");
					const revise         = $(this).attr("revise") == "true";
					const action = revise && "insert" || (id ? "update" : "insert");
					const data   = getInventoryReceivingData(action, "submit", "1", id);
					// console.log(data["approversID"])
					if (revise) {
						data["reviseInventoryReceivingID"] = id;
						delete data["inventoryReceivingID"];

						data.append("reviseInventoryReceivingID", id);
						data.delete("inventoryReceivingID");
					}
		
					let approversID = "", approversDate = "";
					for (var i of data) {
						if (i[0] == "approversID")   approversID   = i[1];
						if (i[0] == "approversDate") approversDate = i[1];
					}

						approversID   = data["approversID"]; 
						approversDate = data["approversDate"];
	
		
					const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
				
					let notificationData = false;
					if (employeeID != sessionID) {
						notificationData = {
							moduleID:                33,
							notificationTitle:       "Inventory Receiving",
							notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
							notificationType:        2,
							employeeID,
						};
						// console.log(notificationData)
					}
		
					saveInventoryReceiving(data, "submit", notificationData, pageContent);
				}
				
			}
			else{
				
				$(".is-invalid").focus();
	
			}
		}
	
			
		else{
			$(".is-invalid").focus();

		}

	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("inventoryReceivingID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getInventoryReceivingData(action, "cancelform", "4", id, status);

		saveInventoryReceiving(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		
		const id       = decryptString($(this).attr("inventoryReceivingID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  = getTableData("ims_inventory_receiving_tbl", "", "inventoryReceivingID = " + id);
	
		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getInventoryReceivingData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;
			data.append("approversDate", dateApproved);
		
			let status, notificationData,lastApproveCondition = false;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                33,
					tableID:                 id,
					notificationTitle:       "Inventory  Receiving",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};

				lastApproveCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                33,
					tableID:                 id,
					notificationTitle:       "Inventory  Receiving",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["inventoryReceivingStatus"] = status;
			data.append("inventoryReceivingStatus", status);


			saveInventoryReceiving(data, "approve", notificationData, pageContent,lastApproveCondition);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		
		const id       = $(this).attr("inventoryReceivingID");
		const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);

		$("#modal_inventory_receiving_content").html(preloader);
		$("#modal_inventory_receiving .page-title").text("DENY INVENTORY RECEIVING");
		$("#modal_inventory_receiving").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="inventoryReceivingRemarks"
					name="inventoryReceivingRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-inventoryReceivingRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			inventoryReceivingID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_inventory_receiving_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("inventoryReceivingID"));
		const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);

		const validate = validateForm("modal_inventory_receiving");
		if (validate) {
			let tableData = getTableData("ims_inventory_receiving_tbl", "", "inventoryReceivingID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				// let data = {};
				// data["action"]               		= "update";
				// data["method"]               		= "deny";
				// data["serviceRequisitionID"] 		= id;
				// data["approversStatus"]      		= updateApproveStatus(approversStatus, 3);
				// data["approversDate"]        		= updateApproveDate(approversDate);
				// data["inventoryReceivingRemarks"] 	= $("[name=inventoryReceivingRemarks]").val()?.trim();
				// data["updatedBy"] 					= sessionID;

			
				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("inventoryReceivingID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("inventoryReceivingRemarks", $("[name=inventoryReceivingRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                33,
					tableID: 				 id,
					notificationTitle:       "Inventory  Receiving",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveInventoryReceiving(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const inventoryReceivingID = decryptString($(this).attr("inventoryReceivingID"));
		const feedback          = $(this).attr("code") || getFormCode("TR", dateToday(), id);

		const id = decryptString($(this).attr("inventoryReceivingID"));
		let data = new FormData;
		data.append("inventoryReceivingID", inventoryReceivingID);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		// let data = {};
		// data["inventoryReceivingID"] = id;
		// data["action"]               = "update";
		// data["method"]               = "drop";
		// data["updatedBy"]            = sessionID;

		saveInventoryReceiving(data, "drop", null, pageContent);
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
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Inventory Receiving";
	let swalText, swalImg;

	$("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("hide");

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

function saveInventoryReceiving(data = null, method = "submit", notificationData = null, callback = null,lastApproveCondition =false) {
	
	data.lastApproveCondition = lastApproveCondition; // inserting object in data object parameter

	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `inventory_receiving/saveInventoryReceiving`,
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
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} dropped successfully!`;
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
				if (res.dismiss === "cancel" && method != "submit") {
					if (method != "deny") {
						if (method != "cancelform") {
							callback && callback();
						}
					} else {
						$("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------