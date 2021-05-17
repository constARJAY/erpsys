$(document).ready(function() {
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
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
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


	const projectList = getTableData(
		`ims_purchase_order_tbl as ipot
		LEFT JOIN ims_purchase_request_tbl as iprt ON iprt.purchaseRequestID = ipot.purchaseRequestID
		LEFT JOIN ims_request_items_tbl as irit ON irit.purchaseRequestID = iprt.purchaseRequestID AND irit.purchaseOrderID = ipot.purchaseOrderID AND ipot.categoryType = irit.categoryType`, 
        "ipot.purchaseOrderID, vendorName,ipot.createdAt",
        "purchaseOrderStatus = 2 AND purchaseRequestStatus =2 AND (orderedPending !=0 OR orderedPending IS NULL)");
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
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 80  },
					{ targets: 8, width: 250 },
					{ targets: 9, width: 80  },
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
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 80  },
					{ targets: 8, width: 250 },
					{ targets: 9, width: 80  },
				],
			});

        var table = $("#tableServiceRequisitionItems")
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
					{ targets: 0,  width: 100   },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 200  },
					{ targets: 3,  width: 200  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 50  },
					{ targets: 7,  width: 300  },
				],
			});

			var table = $("#tableServiceRequisitionItems0")
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
                    { targets: 0,  width: 100   },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 200  },
					{ targets: 3,  width: 200  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 50  },
					{ targets: 7,  width: 300  },
				],
			});

	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_inventory_receiving_tbl", "approversID")) {
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
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
		let serviceRequisitionData = getTableData(
			`ims_inventory_receiving_tbl AS isrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN ims_purchase_order_tbl AS pct ON isrt.purchaseOrderID = pct.purchaseOrderID`,
			"isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,isrt.inventoryReceivingID ,isrt.createdAt AS dateCreatedIR, pct.purchaseOrderID, pct.createdAt AS dateCreatedPO",
			`isrt.employeeID != ${sessionID} AND inventoryReceivingStatus != 0 AND inventoryReceivingStatus != 4`,
			`FIELD(inventoryReceivingStatus, 0, 1, 3, 2, 4), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Purchase Order No.</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		serviceRequisitionData.map((item) => {
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
				submittedAt,
				
			} = item;

			let remarks       = inventoryReceivingRemarks ? inventoryReceivingRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryReceivingStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = inventoryReceivingStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(inventoryReceivingID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(inventoryReceivingID)}" 
				code="${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, inventoryReceivingStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("INRR", createdAt, inventoryReceivingID)}</td>
					<td>${fullname}</td>
					<td>${getFormCode("PO", dateCreatedPO, purchaseOrderID)}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryReceivingStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(inventoryReceivingStatus)}
					</td>
					<td>${remarks}</td>
					<td class="text-center">
						${button}
					</td>
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
		let serviceRequisitionData = getTableData(
            `ims_inventory_receiving_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN ims_purchase_order_tbl AS pct ON isrt.purchaseOrderID = pct.purchaseOrderID`,
            "isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,isrt.inventoryReceivingID ,isrt.createdAt AS dateCreatedIR, pct.purchaseOrderID, pct.createdAt AS dateCreatedPO",
			`isrt.employeeID = ${sessionID}`,
			`FIELD(inventoryReceivingStatus, 0, 1, 3, 2, 4), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Purchase Order No.</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		serviceRequisitionData.map((item) => {
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
				submittedAt,
			} = item;

			let remarks       = inventoryReceivingRemarks ? inventoryReceivingRemarks : "-";
			let dateCreated   = moment(dateCreatedIR).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryReceivingStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = inventoryReceivingStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(inventoryReceivingID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(inventoryReceivingID)}" 
                code="${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("INRR", dateCreatedIR, inventoryReceivingID)}</td>
                <td>${fullname}</td>
                <td>${getFormCode("PO", dateCreatedPO, purchaseOrderID)}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryReceivingStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(inventoryReceivingStatus)}
                </td>
				<td>${remarks}</td>
                <td class="text-center">
                    ${button}
                </td>
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
						class="btn btn-submit" 
						id="btnSubmit" 
						inventoryReceivingID="${inventoryReceivingID}"
						code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel" 
							id="btnCancel"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel"
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
							class="btn btn-cancel"
							id="btnCancelForm" 
							inventoryReceivingID="${inventoryReceivingID}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							status="${inventoryReceivingStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (inventoryReceivingStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(inventoryReceivingID)) {
						button = `
						<button
							class="btn btn-cancel"
							id="btnRevise" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"
							status="${inventoryReceivingStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (inventoryReceivingStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("INRR", createdAt, inventoryReceivingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
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
				class="btn btn-submit" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----

    // ----- GET PROJECT LIST -----
    function getProjectList(id = null, clientID = 0, display = true) {
		let html ='';
        html += projectList.map(project => {
            
            return `
            <option 
                value       = "${project.purchaseOrderID}" 
                vendorname = "${project.vendorName}"
                ${project.purchaseOrderID == id && "selected"}>
                ${getFormCode("PO",moment(project.createdAt),project.purchaseOrderID)}
            </option>`;
        })
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----


    // ----- GET SERVICE ITEM -----
    // function getServiceItem(id = null, display = true) {
    //     let html   = `<option selected disabled>Select Service Name</option>`;

	// 	let serviceIDArr = []; // 0 IS THE DEFAULT VALUE
	// 	$(`[name=serviceID]`).each(function(i, obj) {
	// 		serviceIDArr.push($(this).val());
	// 	}) 
	// 	let serviceList = [...serviceItemList];

	// 	html += serviceList.filter(item => !serviceIDArr.includes(item.serviceID) || item.serviceID == id).map(item => {
    //         let serviceCode = item.serviceID != "0" ? 
    //             `${getFormCode("SVC", item.createdAt, item.serviceID)}` : "-"
    //         return `
    //         <option 
    //             value       = "${item.serviceID}" 
    //             serviceCode = "${serviceCode}"
    //             serviceUom  = "${item.serviceUom}"
    //             ${item.serviceID == id && "selected"}>
    //             ${item.serviceName}
    //         </option>`;
    //     })
		
    //     return display ? html : serviceItemList;
    // }
    // ----- END GET SERVICE ITEM -----


	// ----- GET SERVICE SCOPE -----
	function getServiceScope(scope = {}, readOnly = false) {
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
							<div class="input-group-prepend">
								<button class="btn btn-sm btn-danger btnDeleteScope">
									<i class="fas fa-minus"></i>
								</button>
							</div>
							<input type="text"
								class="form-control"
								name="serialNumber"
								id="serialNumber"
								data-allowcharacters="[A-Z][a-z][0-9][-]"
								minlength="2"
								maxlength="75"
								value="${serialNumber}"
								autocomplete="off"
								>
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
						${serialNumber}
					</div>
				</td>
			</tr>`;
		}

		
		return html;
	}
	// ----- END GET SERVICE SCOPE -----


	// ----- UPDATE SERVICE SCOPE -----
	function updateServiceScope() {
		$(`[name="serialNumber"]`).each(function(i) {
			$(this).attr("id", `serialNumber${i}`);
			$(this).parent().find(".invalid-feedback").attr("id", `invalid-serialNumber${i}`);
		})
	}
	// ----- END UPDATE SERVICE SCOPE -----


	// ----- GET SERVICE ROW -----
    function getServiceRow(id, readOnly = false,inventoryReceivingID = "") {
        let html = "";
		
		if(inventoryReceivingID != ""){
			id = `${id} AND iirt.inventoryReceivingID = ${inventoryReceivingID}`;
		}


        let requestServicesData = getTableData(
            `ims_purchase_order_tbl as ipot
            LEFT JOIN ims_purchase_request_tbl as iprt ON ipot.purchaseRequestID = iprt.purchaseRequestID 
            LEFT JOIN ims_request_items_tbl as irit ON irit.purchaseRequestID = iprt.purchaseRequestID  
            LEFT JOIN ims_inventory_item_tbl as itm ON itm.itemID = irit.itemID
            LEFT JOIN ims_inventory_receiving_tbl as iirt ON iirt.purchaseOrderID = ipot.purchaseOrderID
            LEFT JOIN ims_inventory_receiving_details_tbl as iirdt ON iirdt.inventoryReceivingID = iirt.inventoryReceivingID AND irit.itemID = iirdt.itemID `,
            `iirdt.inventoryReceivingDetailsID, itm.itemID,itm.createdAt,irit.itemName,irit.brandName,irit.itemUom,irit.forPurchase,irit.orderedPending,iirdt.received,iirdt.remarks`,
            `purchaseRequestStatus =2 AND purchaseOrderStatus =2 AND ipot.purchaseOrderID = ${id}`,
			``,`irit.itemID`
        )
        requestServicesData.map(item => {
       
            let {
                inventoryReceivingDetailsID = 0,
                itemID      ="",
                itemName      ="",
                brandName = "",
                forPurchase ="",
				orderedPending ="",
                received = "",
                itemUom = "",
                remarks     = "",
                createdAt   = ""
            } = item;

            const buttonAddRow = !readOnly ? `
		<button class="btn btn-md btn-primary float-left ml-2 my-1 btnAddScope">
			<i class="fas fa-plus"></i>
		</button>` : ""
			
		const scopeData = getTableData(
			`ims_receiving_serial_number_tbl`,
			``,
			`inventoryReceivingDetailsID = ${inventoryReceivingDetailsID}`
		);

		
		let serviceScopes = `
		<div class="table-responsive">
			<table class="table table-bordered">
			
				<tbody class="tableScopeBody">
				`;
		if (scopeData.length > 0 && inventoryReceivingID !="") {
			serviceScopes += scopeData.map(scope => {
				return getServiceScope(scope, readOnly);
			}).join("");
		} else {
			serviceScopes += getServiceScope();
		}
		serviceScopes += `
				</tbody>
			</table>
			${buttonAddRow}
		</div>`;

	
		if (readOnly) {
           
			html += `
			<tr class="itemTableRow">
				<td>
                    <div class="itemcode" >${getFormCode("ITM",moment(createdAt),itemID)}</div>
                </td>

                <td>
                    <div class="itemname">${itemName || "-"}</div>
                </td>

                <td>
                    <div class="brandname">${brandName || "-"}</div>
                </td>
                
                <td>
                        ${serviceScopes}
                </td>

                <td class="text-center">
                    <div class="ordered">${orderedPending ? orderedPending : forPurchase}</div>
                </td>

                <td>
                    <div class="received">${received || "-"}</div>
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
			<tr class="itemTableRow">
				
				<td>
                    <div class="itemcode" name="itemcode" requestitem="${itemID}">${getFormCode("ITM",moment(createdAt), itemID)}</div>
                </td>

				<td>
                    <div class="itemname">${itemName || ""}</div>
                </td>

                <td>
                    <div class="brandname">${brandName || ""}</div>
                </td>

                <td>
					${serviceScopes}
				</td>
                
                <td class="text-center">
                    <div class="ordered" name="ordered" >${orderedPending ? orderedPending : forPurchase}</div>
                </td>
                
                <td>
                <div class="received">
                    <input 
                            type="text" 
                            class="form-control number text-center"
                            data-allowcharacters="[0-9]" 
                            max="99999" 
                            id="received" 
                            name="received" 
                            value="${inventoryReceivingID ? received : ""}" 
                            minlength="1" 
                            maxlength="20" 
                            >
                        <div class="invalid-feedback d-block" id="invalid-received"></div>
                </div>
                </td>

                <td>
                    <div class="uom">${itemUom || ""}</div>
                </td>

				<td>
					<div class="remarks">
						<textarea 
							rows="2" 
							style="resize: none" 
							class="form-control" 
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
        return html;

		

		
    }
    // ----- END GET SERVICE ROW -----


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=purchaseOrderID]", function() {
        const vendorname = $('option:selected', this).attr("vendorname");
        const id 					= $(this).val();
        const inventoryreceivingid 	= $(this).attr("inventoryreceivingid");
		var readOnly			= $(this).attr("disabled");
		if(readOnly =="disabled"){
			readOnly = true;
		}else{
			readOnly = false;
		}

        $("[name=vendorName]").val(vendorname);

        $(".itemServiceTableBody").html('<tr><td colspan="8">'+preloader+'</td></tr>');

        let itemServiceTableBody = getServiceRow(id,readOnly,inventoryreceivingid);
      

        setTimeout(() => {
			$(".itemServiceTableBody").html(itemServiceTableBody);

			// initDataTables();
			// initAll();
		}, 300);
    })
    // ----- END SELECT PROJECT LIST -----

	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("change", "[name=received],.tableScopeBody", function() {

		const received = parseFloat($(this).closest("tr").find('[name=received]').val().replaceAll(",","")) || 0;
		const ordered = parseFloat($(this).closest("tr").find('[name=ordered]').text().replaceAll(",",""));
		const serialNoLength = parseFloat($(this).closest("tr").find('.tableScopeBody tr').length) || 0;
		flag = false;
		for(var loop1 = 0; loop1<serialNoLength; loop1++){
			var findVal = $(this).closest("tr").find('.tableScopeBody tr').find("[name=serialNumber]").eq(loop1).val();
			if(findVal !="" || findVal !=0){
				flag = true;
			}
		}
	
			if(flag){

				if(serialNoLength < ordered || serialNoLength == ordered ){
					$(this).closest("tr").find('.tableScopeBody tr [name=serialNumber]').removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find(".tableScopeBody tr #invalid-serialNumber").removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find(" .tableScopeBody tr td div .invalid-feedback").text('');
					removeIsValid("#tableServiceRequisitionItems");

					// CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE
		
						if(received != serialNoLength){

							$(this).closest("tr").find('.tableScopeBody tr [name=serialNumber]').removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find(" .tableScopeBody tr  #invalid-serialNumber").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find(".tableScopeBody tr td div .invalid-feedback").text('Serial number not equal on received items!')
							
							$(this).closest("tr").find("#received").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-received").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-received").text('Received items not equal on serial number!');
						}
					
					// END CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE

				}else{
					$(this).closest("tr").find('.tableScopeBody tr [name=serialNumber]').removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find(" .tableScopeBody tr  #invalid-serialNumber").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find(".tableScopeBody tr td div .invalid-feedback").text('Exceed Serial Number of Items!')
				}
			
				if( received < ordered || received == ordered ){
					$(this).closest("tr").find("#received").removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find("#invalid-received").removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find("#invalid-received").text('');
					removeIsValid("#tableServiceRequisitionItems");

						// CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE
			
						if(received != serialNoLength){

							$(this).closest("tr").find('.tableScopeBody tr [name=serialNumber]').removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find(" .tableScopeBody tr  #invalid-serialNumber").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find(".tableScopeBody tr td div .invalid-feedback").text('Serial number not equal on received items!')
							
							$(this).closest("tr").find("#received").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-received").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-received").text('Received items not equal on serial number!');
						}
					
						// END CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE

				}else{
					$(this).closest("tr").find("#received").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-received").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-received").text('Exceed Items!');
				}

			}else{
				if( received < ordered || received == ordered ){
					$(this).closest("tr").find("#received").removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find("#invalid-received").removeClass("is-invalid").addClass("is-valid");
					$(this).closest("tr").find("#invalid-received").text('');
					removeIsValid("#tableServiceRequisitionItems");

				}else{
					$(this).closest("tr").find("#received").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-received").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-received").text('Exceed Items!');
				}

			}
			
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- ADD SCOPE -----
	$(document).on("click", ".btnAddScope", function() {
		let newScope = getServiceScope();
		$(this).parent().find("table tbody").append(newScope);
		$(this).parent().find("[name=serialNumber]").last().focus();
		// initAmount(".amount");
		updateServiceScope();


	})
	// ----- END ADD SCOPE -----


	// ----- DELETE SCOPE -----
	$(document).on("click", ".btnDeleteScope", function() {
		const isCanDelete = $(this).closest(".tableScopeBody").find("tr").length > 1;
		
		if (isCanDelete) {
			const scopeElement = $(this).closest("tr");

			const received = parseFloat($(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").val().replaceAll(",","")) || 0;
			const ordered = parseFloat($(this).closest(".itemServiceTableBody > tr").find("td > [name='ordered']").text());
			const serialNoLength = parseFloat($(this).closest(".tableScopeBody").find("tr").length -1) || 0;

			flag = false;
			for(var loop1 = 0; loop1<serialNoLength; loop1++){
				var findVal = $(this).closest("tr").find('.tableScopeBody tr').find("[name=serialNumber]").eq(loop1).val();
				if(findVal !="" || findVal !=0){
					flag = true;
				}
			}


			if(flag){

				if(serialNoLength < ordered || serialNoLength == ordered ){
					$(this).closest(".tableScopeBody").find("tr [name=serialNumber]").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".tableScopeBody").find("tr .invalid-feedback").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".tableScopeBody").find("tr .invalid-feedback").text('');
					removeIsValid("#tableServiceRequisitionItems");

					// CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE
					
						if(received != serialNoLength){

							$(this).closest(".tableScopeBody").find("tr [name=serialNumber]").removeClass("is-valid").addClass("is-invalid");
							$(this).closest(".tableScopeBody").find("tr .invalid-feedback").removeClass("is-valid").addClass("is-invalid");
							$(this).closest(".tableScopeBody").find("tr .invalid-feedback").text('Serial number not equal on received items!');
							
							$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").addClass("is-invalid");
							$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").addClass("is-invalid");
							$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('Received items not equal on serial number!');
						}
					
					// END CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE
				}else{
					$(this).closest(".tableScopeBody").find("tr [name=serialNumber]").removeClass("is-valid").addClass("is-invalid");
					$(this).closest(".tableScopeBody").find("tr .invalid-feedback").removeClass("is-valid").addClass("is-invalid");
					$(this).closest(".tableScopeBody").find("tr .invalid-feedback").text('Exceed Serial Number of Items!');
				}
				console.log(received +" < "+ ordered +" | "+ received +" ==  "+ordered )
				if( received < ordered || received == ordered ){
					$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('');
					removeIsValid("#tableServiceRequisitionItems");

					// CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE
					
						if(received != serialNoLength){

							$(this).closest(".tableScopeBody").find("tr [name=serialNumber]").removeClass("is-valid").addClass("is-invalid");
							$(this).closest(".tableScopeBody").find("tr .invalid-feedback").removeClass("is-valid").addClass("is-invalid");
							$(this).closest(".tableScopeBody").find("tr .invalid-feedback").text('Serial number not equal on received items!');
							
							$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").addClass("is-invalid");
							$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").addClass("is-invalid");
							$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('Received items not equal on serial number!');
						}
					
					// END CHECK IF THE SERIAL NUMBER AND RECEIVED ORDER HAS THE SAME VALUE

				}else{
					$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").addClass("is-invalid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").addClass("is-invalid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('Exceed Items!');
				}

			}else{
				if( received < ordered || received == ordered ){
					$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").removeClass("is-invalid").addClass("is-valid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('');
					removeIsValid("#tableServiceRequisitionItems");

				}else{
					$(this).closest(".itemServiceTableBody > tr").find("td > div ").find("[name='received']").addClass("is-invalid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").addClass("is-invalid");
					$(this).closest(".itemServiceTableBody > tr").find("td > div").find("[name='received']").closest("div").find(".invalid-feedback").text('Exceed Items!');
				}
			}

			scopeElement.fadeOut(500, function() {
				$(this).closest("tr").remove();
			})
		} else {
			showNotification("danger", "You must have atleast one scope of work.");
		}
	})
	// ----- END DELETE SCOPE -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			inventoryReceivingID        = "",
			reviseinventoryReceivingID  = "",
			employeeID              = "",
			purchaseOrderID               = "",
			dateReceived               = "",
			inventoryReceivingRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			inventoryReceivingStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		let requestServiceItems = "";
		if (inventoryReceivingID) {
			
				requestServiceItems = getServiceRow(purchaseOrderID, readOnly,inventoryReceivingID);
		
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

		let disabled = readOnly ? "disabled" : "";

		let tableServiceRequisitionItems = !disabled ? "tableServiceRequisitionItems" : "tableServiceRequisitionItems0";

		let button = formButtons(data, isRevise);

		let reviseDocumentNo    = isRevise ? inventoryReceivingID  : reviseinventoryReceivingID ;
		let documentHeaderClass = isRevise || reviseinventoryReceivingID  ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseinventoryReceivingID  ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseinventoryReceivingID  ? `
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

        <div class="row" id="form_service_requisition">

           
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Purchase Order No. ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="purchaseOrderID"
                        id="purchaseOrderID"
                        style="width: 100%"
                        required
						inventoryreceivingid ="${inventoryReceivingID}"
						readonly="${disabled}"
						${disabled}>
                        <option selected disabled>Select Purchase Order No.</option>
                        ${getProjectList(purchaseOrderID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-purchaseOrderID"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Vendor Name</label>
                    <input type="text" class="form-control" name="vendorName" disabled value="-">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
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

            <div class="col-sm-12">

                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Receiving Item/s: </div>
                    <table class="table table-striped" id="${tableServiceRequisitionItems}">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th>Serial No.</th>
                                <th>Ordered</th>
                                <th>Received</th>
                                <th>UOM</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="itemServiceTableBody">
                            ${requestServiceItems}
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
			// updateTableItems();
			initAll();
			updateServiceScope();
			// updateServiceOptions();
			purchaseOrderID && purchaseOrderID != 0 && $("[name=purchaseOrderID]").trigger("change");
            !purchaseOrderID && purchaseOrderID == 0 && $("#dateReceived").val(moment(new Date).format("MMMM DD, YYYY"));
			$("#dateReceived").data("daterangepicker").maxDate = moment();
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

			headerButton(true, "Add Inventory Receiving");
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


	// ----- GET PURCHASE REQUEST DATA -----
	function getServiceRequisitionData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

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
			data["inventoryReceivingID"] = id;

			if (status != "2") {
				data["inventoryReceivingStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if (currentStatus == "0" && method != "approve") {
			
			data["employeeID"] = sessionID;
			data["purchaseOrderID"]  = $("[name=purchaseOrderID]").val() || null;
			data["dateReceived"]  =  moment($("[name=dateReceived]").val()?.trim()).format("YYYY-MM-DD");
			data["inventoryReceivingReason"] = $("[name=inventoryReceivingReason]").val()?.trim();

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["inventoryReceivingID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"] = approversID;
					data["inventoryReceivingStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["inventoryReceivingStatus"] = 2;
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const itemID   = $("td [name=itemcode]", this).attr("requestitem");	
				const received   = $("td [name=received]", this).val();	
				const remarks   = $("td [name=remarks]", this).val()?.trim();	
               
				let temp = {
					itemID, 
                    received,
					remarks,
					scopes: []
				};

				$(`td .tableScopeBody tr`, this).each(function() {
					let scope = {
						serialNumber: $('[name="serialNumber"]', this).val()?.trim(),
						itemID: itemID,
					}
					temp["scopes"].push(scope);
				})

				data["items"].push(temp);
			});
		} 

		

		return data;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


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
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getServiceRequisitionData(action, "save", "0", id);
				data["inventoryReceivingStatus"]   = 0;
				data["reviseInventoryReceivingID"] = id;
				delete data["inventoryReceivingID"];
	
				saveServiceRequisition(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getServiceRequisitionData(action, "save", "0", id);
			data["inventoryReceivingStatus"] = 0;

			saveServiceRequisition(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		let receivedCondition = $("[name=received]").hasClass("is-invalid");
		let serialNumberCondition = $("[name=serialNumber]").hasClass("is-invalid");

		if(!receivedCondition && !serialNumberCondition){

			const id       = $(this).attr("inventoryReceivingID");
			const revise   = $(this).attr("revise") == "true";
			const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
			const action   = revise && "insert" || (id && feedback ? "update" : "insert");
			const data     = getServiceRequisitionData(action, "save", "0", id);
			data["inventoryReceivingStatus"] = 0;
	
			if (revise) {
				data["reviseInventoryReceivingID"] = id;
				delete data["inventoryReceivingID"];
			}
	
			saveServiceRequisition(data, "save", null, pageContent);
		}else{
			$("[name=received]").focus();
			$("[name=serialNumber]").focus();
		}

		
	});
	// ----- END SAVE DOCUMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {

		let receivedCondition = $("[name=received]").hasClass("is-invalid");
		let serialNumberCondition = $("[name=serialNumber]").hasClass("is-invalid");

		if(!receivedCondition && !serialNumberCondition){
			const id           = $(this).attr("inventoryReceivingID");
			const revise       = $(this).attr("revise") == "true";
			const validate     = validateForm("form_service_requisition");
			removeIsValid("#tableServiceRequisitionItems");

			if (validate) {
				
				const action = revise && "insert" || (id ? "update" : "insert");
				const data   = getServiceRequisitionData(action, "submit", "1", id);

				if (revise) {
					data["reviseInventoryReceivingID"] = id;
					delete data["inventoryReceivingID"];
				}

				let approversID   = data["approversID"], 
					approversDate = data["approversDate"];

				const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
				let notificationData = false;
				if (employeeID != sessionID) {
					notificationData = {
						moduleID:                49,
						notificationTitle:       "Inventory  Receiving",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}

				saveServiceRequisition(data, "submit", notificationData, pageContent);
			}

		}else{
			$("[name=received]").focus();
			$("[name=serialNumber]").focus();
		}	
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("inventoryReceivingID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getServiceRequisitionData(action, "cancelform", "4", id, status);

		saveServiceRequisition(data, "cancelform", null, pageContent);
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

			let data = getServiceRequisitionData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData,lastApproveCondition = false;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                49,
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
					moduleID:                49,
					tableID:                 id,
					notificationTitle:       "Inventory  Receiving",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["inventoryReceivingStatus"] = status;

			saveServiceRequisition(data, "approve", notificationData, pageContent,lastApproveCondition);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("inventoryReceivingID");
		const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);

		$("#modal_service_requisition_content").html(preloader);
		$("#modal_service_requisition .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_service_requisition").modal("show");
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
			<button class="btn btn-danger" id="btnRejectConfirmation"
			inventoryReceivingID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_service_requisition_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("inventoryReceivingID"));
		const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);

		const validate = validateForm("modal_service_requisition");
		if (validate) {
			let tableData = getTableData("ims_inventory_receiving_tbl", "", "inventoryReceivingID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"] = "update";
				data["method"] = "deny";
				data["inventoryReceivingID"] = id;
				data["approversStatus"] = updateApproveStatus(approversStatus, 3);
				data["approversDate"]   = updateApproveDate(approversDate);
				data["inventoryReceivingRemarks"] = $("[name=inventoryReceivingRemarks]").val()?.trim();
				data["updatedBy"] = sessionID;

				let notificationData = {
					moduleID:                49,
					tableID: 				 id,
					notificationTitle:       "Inventory  Receiving",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveServiceRequisition(data, "deny", notificationData, pageContent);
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
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Inventory  Receiving";
	let swalText, swalImg;

	$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("hide");

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
			swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
			swalText  = "Are you sure to cancel this document?";
			swalImg   = `${base_url}assets/modal/cancel.svg`;
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

function saveServiceRequisition(data = null, method = "submit", notificationData = null, callback = null,lastApproveCondition =false) {

	data.lastApproveCondition = lastApproveCondition; // inserting object in data object parameter

	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `inventory_receiving/saveInventoryReceiving`,
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
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("INRR", dateCreated, insertedID)} denied successfully!`;
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
				if (res.dismiss === "cancel") {
					if (method != "deny") {
						callback && callback();
					} else {
						$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------