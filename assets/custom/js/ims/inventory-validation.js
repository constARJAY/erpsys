$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(126);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(126);
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
				"ims_inventory_validation_tbl", 
				"reviseInventoryValidationID", 
				"reviseInventoryValidationID IS NOT NULL AND inventoryValidationStatus != 4");
			return revisedDocumentsID.map(item => item.reviseInventoryValidationID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_inventory_validation_tbl", "", "inventoryValidationID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					inventoryValidationStatus,
					createdBy
				} = tableData[0];

				employeeID = employeeID == "0" ? createdBy : employeeID;
				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (inventoryValidationStatus == 0 || inventoryValidationStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (inventoryValidationStatus == 0) {
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
					const isAllowed = isCreateAllowed(126);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/inventory_validation?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/inventory_validation?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/inventory_validation?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/inventory_validation`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // ----- GLOBAL VARIABLE - REUSABLE ----- 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

	// ----- END GLOBAL VARIABLE - REUSABLE ----- 


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
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        [],
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 100 },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 100 },
				{ targets: 3,  width: 350 },
				{ targets: 4,  width: 260 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 250 },

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
				{ targets: 5,  width: 180 },
				{ targets: 6,  width: 200 },
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
				// options = readOnly ? bodyOptionsWithoutCheckbox : bodyOptions;
				options = bodyOptionsWithoutCheckbox;
			}
			activateDatatable(elementID, options);
		})

		var table = $(`.phasing-table`)
				.css({ "min-width": "100%" })
				.removeAttr("width")
				.DataTable(bodyOptionsWithoutCheckbox);
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_inventory_validation_tbl", "approversID")) {
				let count = getCountForApproval("ims_inventory_validation_tbl", "inventoryValidationStatus");
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
			html =``;
			// if (isCreateAllowed(126)) {
			// 	html = `
			// 	<button type="button" 
			// 		class="btn btn-default btn-add" 
			// 		id="btnAdd">
			// 		<i class="icon-plus"></i> ${text}
			// 	</button>`;
			// }
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack" 
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}">
				<i class="fas fa-arrow-left"></i> Back
			</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let inventoryValidationData = getTableData(
			`ims_inventory_validation_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated,  imrt.materialRequestCode",
			`imrt.employeeID != ${sessionID} AND inventoryValidationStatus != 0 AND inventoryValidationStatus != 4`,
			`FIELD(inventoryValidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		inventoryValidationData.map((item) => {
			let {
				fullname,
				inventoryValidationID,
				timelineBuilderID,
				projectCode,
				projectName,
				materialRequestCode,
				approversID,
				approversDate,
				inventoryValidationStatus,
				inventoryValidationRemarks,
				inventoryValidationReason,
				submittedAt,
				createdAt
			} = item;

			let remarks       = inventoryValidationRemarks ? inventoryValidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") ;
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryValidationStatus == 2 || inventoryValidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = dateApproved[dateApproved.length - 1] ? moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			}


			let btnClass = inventoryValidationStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, inventoryValidationStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(inventoryValidationID)}">
					<td>${getFormCode("IVR", createdAt, inventoryValidationID)}</td>
					<td>${fullname}</td>
					<td>${materialRequestCode ? materialRequestCode : '-'}</td>
					<td>
						<div>
							${projectCode || '-'}
						</div>
						<small style="color:#848482;">${projectName || '-'}</small>
					</td>
					<td>${projectName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryValidationStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(inventoryValidationStatus,true)}
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
		let inventoryValidationData = getTableData(
			`ims_inventory_validation_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, imrt.materialRequestCode",
			`IF(imrt.employeeID = 0 ,imrt.createdBy = ${sessionID},imrt.employeeID = ${sessionID})`,
			`FIELD(inventoryValidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		inventoryValidationData.map((item) => {
			let {
				fullname,
				inventoryValidationID,
                timelineBuilderID,
				materialRequestCode,
                projectCode,
                projectName,
				approversID,
				approversDate,
				inventoryValidationStatus,
				inventoryValidationRemarks,
				inventoryValidationReason,
				submittedAt,
				createdAt
			} = item;

			console.log(createdAt)

			let remarks       = inventoryValidationRemarks ? inventoryValidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryValidationStatus == 2 || inventoryValidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = dateApproved[dateApproved.length - 1] ? moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			}

			let btnClass = inventoryValidationStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(inventoryValidationID)}">
                <td>${getFormCode("IVR", createdAt, inventoryValidationID)}</td>
                <td>${fullname != null ? fullname : "-"}</td>
				<td>${ materialRequestCode ? materialRequestCode : '-'}</td>
				<td>
					<div>
						${projectCode || '-'}
					</div>
					<small style="color:#848482;">${projectName || '-'}</small>
				</td>
				<td>${projectName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryValidationStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(inventoryValidationStatus,true)}
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
				inventoryValidationID     = "",
				inventoryValidationStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date,
				createdBy=""
			} = data && data[0];

			employeeID = employeeID == "0" ? createdBy : employeeID;

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (inventoryValidationStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						inventoryValidationID="${encryptString(inventoryValidationID)}"
						code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (inventoryValidationStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							status="${inventoryValidationStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
				//  else if (inventoryValidationStatus == 2) {
				// 	// DROP
				// 	button = `
				// 	<button type="button" 
				// 		class="btn btn-cancel px-5 p-2"
				// 		id="btnDrop" 
				// 		inventoryValidationID="${encryptString(inventoryValidationID)}"
				// 		code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
				// 		status="${inventoryValidationStatus}"><i class="fas fa-ban"></i> 
				// 		Drop
				// 	</button>`;
				// } 
				else if (inventoryValidationStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(inventoryValidationID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							status="${inventoryValidationStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (inventoryValidationStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_inventory_validation_tbl`,
						`inventoryValidationID`,
						`inventoryValidationID = ${inventoryValidationID}`,
					);
					const { inventoryValidationID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_inventory_validation_tbl`,
						`inventoryValidationID`,
						`inventoryValidationStatus <> 3 AND inventoryValidationStatus <> 4 AND inventoryValidationID = ${inventoryValidationID}`
					);

					if (!isDocumentRevised(inventoryValidationID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							status="${inventoryValidationStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (inventoryValidationStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						// button = `
						// <button type="button" 
						// 	class="btn btn-submit px-5 p-2"  
						// 	id="btnApprove" 
						// 	inventoryValidationID="${encryptString(inventoryValidationID)}"
						// 	code="${getFormCode("IVR", createdAt, inventoryValidationID)}"><i class="fas fa-paper-plane"></i>
						// 	Approve
						// </button>
						// <button type="button" 
						// 	class="btn btn-cancel  px-5 p-2"
						// 	id="btnReject" 
						// 	inventoryValidationID="${encryptString(inventoryValidationID)}"
						// 	code="${getFormCode("IVR", createdAt, inventoryValidationID)}"><i class="fas fa-ban"></i> 
						// 	Deny
						// </button>`;

						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"><i class="fas fa-paper-plane"></i>
							Approve
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


	// ----- GET ITEM ROW -----
    function getItemRow(inventoryValidationID = false ,item = {}, readOnly = false) {
		let html = "";
	
		const {
			requestItemID       = "",
			// materialRequestID 	="",
			itemID             	= 0,
			itemCode           	= "-",
			itemName           	= "-",
			itemBrandName    	= "-",
			itemClassification 	= "-",
			itemCategory 		= "-",
			itemUom            	= "-",
			requestQuantity     = 0,
			availableStocks 	= 0,
			forPurchase          = 0,
		} = item;

		if (readOnly) {

				if(itemID !=0){
					html += `
					<tr class="table-row-request-item itemTableRow"
						requestItemID="${requestItemID}" inventoryValidationID="${inventoryValidationID}">
						<td>
							<div class="itemcode">${itemCode || "-"}</div>
						</td>

						<td>
							<div class="itemname">
								${itemName || '-'}
							</div>
							<small style="color:#848482;" class="itembrandname">${itemBrandName || '-'}</small>
						</td>

						<td>
							<div class="itemclassification">
								${itemClassification || '-'}
							</div>
							<small style="color:#848482;" class="itemcategory">${itemCategory || '-'}</small>
						</td>
					
						<td>
							<div class="itemuom">${itemUom || "-"}</div>
						</td>
						
						<td class="text-right">
							<div class="requestquantity">
								${formatAmount(requestQuantity)}
							</div>
						</td>

						<td class="text-right">
							<div class="availablestocks">
								${formatAmount(availableStocks)}
							</div>
						</td>

						<td class="text-right">
							<div class="forpurchase">
								${formatAmount(forPurchase)}
							</div>
						</td>
					
					</tr>`;
				}

			

		} 
		else {

			if(itemID !=0){
				html += `
				<tr class="table-row-request-item itemTableRow"
					requestItemID="${requestItemID}" inventoryValidationID="${inventoryValidationID}">
					<td>
						<div class="itemcode">${itemCode || "-"}</div>
					</td>

					<td>
						<div class="itemname">
							${itemName || '-'}
						</div>
						<small style="color:#848482;" class="itembrandname">${itemBrandName || '-'}</small>
					</td>

					<td>
						<div class="itemclassification">
							${itemClassification || '-'}
						</div>
						<small style="color:#848482;" class="itemcategory">${itemCategory || '-'}</small>
					</td>
				
					<td>
						<div class="itemuom">${itemUom || "-"}</div>
					</td>
					
					<td class="text-right">
						<div class="requestquantity">
							${formatAmount(requestQuantity)}
						</div>
					</td>

					<td class="text-right">
						<div class="availablestocks">
							${formatAmount(availableStocks)}
						</div>
					</td>

					<td class="text-right">
						<div class="forpurchase">
							${formatAmount(forPurchase)}
						</div>
					</td>
				
				</tr>`;
			}
		}

        return html;
    }
    // ----- END GET ITEM ROW -----

	// ----- GET ASSET ROW -----
    function getAssetRow(inventoryValidationID = false ,asset = {}, readOnly = false) {
		let html = "";
	
		const {
			requestAssetID       = "",
			// materialRequestID 	="",
			assetID             	= 0,
			assetCode           	= "-",
			assetName           	= "-",
			assetBrandName    	= "-",
			assetClassification 	= "-",
			assetCategory 		= "-",
			assetUom            	= "-",
			requestQuantity     = 0,
			availableStocks 	= 0,
			forPurchase          = 0,
		} = asset;

		if (readOnly) {
			if(assetID !=0){
				html += `
			<tr class="table-row-request-item assetTableRow"
				requestAssetID="${requestAssetID}" inventoryValidationID="${inventoryValidationID}">
				<td>
					<div class="assetcode">${assetCode || "-"}</div>
				</td>

				<td>
					<div class="assetame">
						${assetName || '-'}
					</div>
					<small style="color:#848482;" class="assetbrandname">${assetBrandName || '-'}</small>
				</td>

				<td>
					<div class="assetclassification">
						${assetClassification || '-'}
					</div>
					<small style="color:#848482;" class="assetcategory">${assetCategory || '-'}</small>
				</td>
			
				<td>
					<div class="assetuom">${assetUom || "-"}</div>
				</td>
				
				<td class="text-right">
					<div class="requestquantity">
						${formatAmount(requestQuantity)}
					</div>
				</td>

				<td class="text-right">
					<div class="availablestocks">
						${formatAmount(availableStocks)}
					</div>
				</td>

				<td class="text-right">
					<div class="forpurchase">
						${formatAmount(forPurchase)}
					</div>
				</td>
			
			</tr>`;
			}

			

		}
		 else {

			if(asset !=0){
				html += `
				<tr class="table-row-request-item assetTableRow"
					requestAssetID="${requestAssetID}" inventoryValidationID="${inventoryValidationID}">
					<td>
						<div class="assetcode">${assetCode || "-"}</div>
					</td>
	
					<td>
						<div class="assetame">
							${assetName || '-'}
						</div>
						<small style="color:#848482;" class="assetbrandname">${assetBrandName || '-'}</small>
					</td>
	
					<td>
						<div class="assetclassification">
							${assetClassification || '-'}
						</div>
						<small style="color:#848482;" class="assetcategory">${assetCategory || '-'}</small>
					</td>
				
					<td>
						<div class="assetuom">${assetUom || "-"}</div>
					</td>
					
					<td class="text-right">
						<div class="requestquantity">
							${formatAmount(requestQuantity)}
						</div>
					</td>
	
					<td class="text-right">
						<div class="availablestocks">
							${formatAmount(availableStocks)}
						</div>
					</td>
	
					<td class="text-right">
						<div class="forpurchase">
							${formatAmount(forPurchase)}
						</div>
					</td>
				
				</tr>`;
			}
		
		}

        return html;
    }
    // ----- END GET ASSET ROW -----


	// ----- GET REQUEST ITEMS CONTENT -----
	function requestItemsContent(data = false, readOnly = false){

		let html = "";
		if (data) {

			const {
				inventoryValidationID       = "",
				materialRequestID          = "",
				inventoryValidationStatus = 0,
			} = data && data[0];

			let requestItemsData = [], requestItemHTML = "";
		
				if (inventoryValidationID) {

					if(inventoryValidationStatus == 0 || inventoryValidationStatus == 1 ){
						
						requestItemsData = getTableData(
							`ims_request_items_tbl as reqItems`, 
							`	reqItems.requestItemID,
								reqItems.materialRequestID,
								reqItems.itemID,
								reqItems.itemCode,
								reqItems.itemName,
								reqItems.itemBrandName,
								reqItems.itemClassification,
								reqItems.itemCategory,
								reqItems.itemUom,
								reqItems.requestQuantity,
									( SELECT 
										CASE 
										WHEN ((IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID)) < 0 
											THEN  0
										WHEN  ((IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID)) > 0 
											THEN (IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID))
										END as availableStocks
									FROM ims_stock_in_item_tbl AS itmStock 
									LEFT JOIN ims_inventory_item_tbl AS itm ON itm.itemID = itmStock.itemID
									WHERE itmStock.stockOutDate IS NUll 
									AND itmStock.stockInDate IS NOT NULL 
									AND itmStock.itemID = reqItems.itemID) as availableStocks,
	
									(SELECT 
										CASE 
										WHEN ((IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID)) < reqItems.requestQuantity
										THEN IF( ( (IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID) ) <0, 
												reqItems.requestQuantity ,
												reqItems.requestQuantity  - ((IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID)))
											
										WHEN  ((IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedItem),0) FROM ims_request_items_tbl WHERE itemID = reqItems.itemID) ) >  reqItems.requestQuantity
											THEN 0
										END as forPurchase
																	
									FROM ims_stock_in_item_tbl  AS itmStock 
									LEFT JOIN ims_inventory_item_tbl AS itm ON itm.itemID = itmStock.itemID
									WHERE itmStock.stockOutDate IS NUll 
									AND itmStock.stockInDate IS NOT NULL 
									AND itmStock.itemID = reqItems.itemID) as forPurchase
																	
							`, 
							`materialRequestID = ${materialRequestID} AND inventoryValidationID IS NULL AND bidRecapID IS NULL`);
					}else{
						
						requestItemsData = getTableData(
							`ims_request_items_tbl as reqItems`, 
							`	reqItems.requestItemID,
								reqItems.materialRequestID,
								reqItems.itemID,
								reqItems.itemCode,
								reqItems.itemName,
								reqItems.itemBrandName,
								reqItems.itemClassification,
								reqItems.itemCategory,
								reqItems.itemUom,
								reqItems.requestQuantity,
								reqItems.availableStocks,
								reqItems.forPurchase
							`, 
							`inventoryValidationID = ${inventoryValidationID}
							AND bidRecapID IS NULL`);
					}
				}
				// else{

				// 	requestItemsData = getTableData(
				// 		`ims_request_items_tbl as reqItems`, 
				// 		`	reqItems.requestItemID,
				// 			reqItems.materialRequestID,
				// 			reqItems.itemID,
				// 			reqItems.itemCode,
				// 			reqItems.itemName,
				// 			reqItems.itemBrandName,
				// 			reqItems.itemClassification,
				// 			reqItems.itemCategory,
				// 			reqItems.itemUom,
				// 			reqItems.requestQuantity,
				// 				(SELECT SUM(quantity) 
				// 				FROM ims_stock_in_item_tbl 
				// 				WHERE stockOutDate IS NUll 
				// 				AND stockInDate IS NOT NULL 
				// 				AND itemID = reqItems.itemID) as availableStocks,

				// 				reqItems.requestQuantity,
				// 				(SELECT 
				// 				CASE 
				// 					WHEN SUM(quantity)> reqItems.requestQuantity
				// 					THEN 0
				// 					WHEN SUM(quantity)< reqItems.requestQuantity
				// 					THEN
				// 					reqItems.requestQuantity - SUM(quantity)
				// 					END AS forPurchase
				// 				FROM ims_stock_in_item_tbl 
				// 				WHERE stockOutDate IS NUll 
				// 				AND stockInDate IS NOT NULL 
				// 				AND itemID = reqItems.itemID) as forPurchase
				// 		`, 
				// 		`materialRequestID = ${materialRequestID}`);

				// }

				console.log(requestItemsData)

				if (requestItemsData.length > 0) {
					requestItemsData.map(item => {
						requestItemHTML += getItemRow(inventoryValidationID,item, readOnly);
					})
				} else {
					requestItemHTML = getItemRow(false,false, readOnly);
				}
					html = `
					<div class="card">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">Item/s Request</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover inventory-request" id="tableRequestItems"  isReadOnly="${readOnly}">
									<thead>
										<tr>
										<th>Item Code</th>
										<th>Item Name/Brand</th>
										<th>Item Classification/Category</th>
										<th>UOM</th>
										<th>Request Quantity</th>
										<th>Available Stocks</th>
										<th>For Purchase</th>
										</tr>
									</thead>
									<tbody class="itemTableBody">
									${requestItemHTML}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>

					</div>
					`;

					// html = `
					// <div class="w-100">
					// 	<hr class="pb-1">
					// 	<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Item/s Request</div>
					// 	<table class="table table-striped requestItemTable" isReadOnly="${readOnly}" id="tableRequestItems">
					// 		<thead>
					// 			<tr style="white-space: nowrap">
					// 				<th>Item Code</th>
					// 				<th>Item Name/Brand</th>
					// 				<th>Item Classification/Category</th>
					// 				<th>UOM</th>
					// 				<th>Request Quantity</th>
					// 				<th>Available Stocks</th>
					// 				<th>For Purchase</th>
					// 			</tr>
					// 		</thead>
					// 		<tbody class="itemTableBody">
					// 			${requestItemHTML}
					// 		</tbody>
					// 	</table>
						
					// </div>`;

			
		} else {
			html = `
			<div class="w-100 text-center mb-5">
				<img src="${base_url}assets/modal/please-select.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="No Item Records Found.">
				<div class="h4">No Item Records Found.</div>
			</div>`
		}
		return html;
	}
	// ----- END GET REQUEST ITEMS CONTENT -----

	// ----- GET REQUEST ASSETS CONTENT -----
	function requestAssetsContent(data = false, readOnly = false){

		let html = "";
		if (data) {

			const {
				inventoryValidationID       = "",
				materialRequestID          = "",
				inventoryValidationStatus = 0,
			} = data && data[0];

			let requestAssetData = [], requestAssetHTML = "";
		
				if (inventoryValidationID) {

					if(inventoryValidationStatus == 0 || inventoryValidationStatus == 1 ){
						
						requestAssetData = getTableData(
							`ims_request_assets_tbl as reqAsset`, 
							`	reqAsset.requestAssetID,
								reqAsset.materialRequestID,
								reqAsset.assetID,
								reqAsset.assetCode,
								reqAsset.assetName,
								reqAsset.assetBrandName,
								reqAsset.assetClassification,
								reqAsset.assetCategory,
								reqAsset.assetUom,
								reqAsset.requestQuantity,
									
	
									( SELECT 
										CASE 
										WHEN ((IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID)) < 0 
											THEN  0
										WHEN  ((IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID)) > 0 
											THEN (IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID))
										END as availableStocks
									FROM ims_stock_in_assets_tbl AS astStock 
									LEFT JOIN ims_inventory_asset_tbl AS ast ON ast.assetID = astStock.stockInAssetID
									WHERE astStock.stockOutDate IS NUll 
									AND astStock.stockInDate IS NOT NULL 
									AND astStock.stockInAssetID = reqAsset.assetID) as availableStocks,

									(SELECT 
										CASE 
										WHEN ((IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID)) < reqAsset.requestQuantity
										THEN IF( ( (IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID) ) <0, 
												reqAsset.requestQuantity ,
												reqAsset.requestQuantity  - ((IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID)))
											
										WHEN  ((IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)) - (SELECT IFNULL(SUM(reservedAsset),0) FROM ims_request_assets_tbl WHERE assetID = reqAsset.assetID) ) >  reqAsset.requestQuantity
											THEN 0
										END as forPurchase
																
									FROM ims_stock_in_assets_tbl  AS astStock 
									LEFT JOIN ims_inventory_asset_tbl AS ast ON ast.assetID = astStock.stockInAssetID
									WHERE astStock.stockOutDate IS NUll 
									AND astStock.stockInDate IS NOT NULL 
									AND astStock.stockInAssetID = reqAsset.assetID) as forPurchase
							`, 
							`materialRequestID = ${materialRequestID} AND inventoryValidationID IS NULL AND bidRecapID IS NULL`);
					}else{
						
						requestAssetData = getTableData(
							`ims_request_assets_tbl as reqAsset`, 
							`	reqAsset.requestAssetID,
								reqAsset.materialRequestID,
								reqAsset.assetID,
								reqAsset.assetCode,
								reqAsset.assetName,
								reqAsset.assetBrandName,
								reqAsset.assetClassification,
								reqAsset.assetCategory,
								reqAsset.assetUom,
								reqAsset.requestQuantity,
								reqAsset.availableStocks,
								reqAsset.forPurchase
							`, 
							`inventoryValidationID = ${inventoryValidationID}
							 AND bidRecapID IS NULL`);
					}
				}
				// else{

				// 	requestAssetData = getTableData(
				// 		`ims_request_assets_tbl as reqAsset`, 
				// 		`	reqAsset.requestAssetID,
				// 			reqAsset.materialRequestID,
				// 			reqAsset.assetID,
				// 			reqAsset.assetCode,
				// 			reqAsset.assetName,
				// 			reqAsset.assetBrandName,
				// 			reqAsset.assetClassification,
				// 			reqAsset.assetCategory,
				// 			reqAsset.assetUom,
				// 			reqAsset.requestQuantity,
				// 				(SELECT SUM(quantity) 
				// 				FROM ims_stock_in_assets_tbl 
				// 				WHERE stockOutDate IS NUll 
				// 				AND stockInDate IS NOT NULL 
				// 				AND assetID = reqAsset.assetID) as availableStocks,

				// 				reqAsset.requestQuantity,
				// 				(SELECT 
				// 				CASE 
				// 					WHEN SUM(quantity)> reqAsset.requestQuantity
				// 					THEN 0
				// 					WHEN SUM(quantity)< reqAsset.requestQuantity
				// 					THEN
				// 					reqAsset.requestQuantity - SUM(quantity)
				// 					END AS forPurchase
				// 				FROM ims_stock_in_assets_tbl 
				// 				WHERE stockOutDate IS NUll 
				// 				AND stockInDate IS NOT NULL 
				// 				AND assetID = reqAsset.assetID) as forPurchase
				// 		`, 
				// 		`materialRequestID = ${materialRequestID}`);
				// }

		
				if (requestAssetData.length > 0) {
					requestAssetData.map(item => {
						requestAssetHTML += getAssetRow(inventoryValidationID,item, readOnly);
					})
				} else {
					requestAssetHTML = getAssetRow(false,false, readOnly);
				}
					html = `
					<div class="card">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">Asset Request</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover inventory-request" id="tableRequestAsset"  isReadOnly="${readOnly}">
									<thead>
										<tr>
										<th>Asset Code</th>
										<th>Asset Name/Brand</th>
										<th>Asset Classification/Category</th>
										<th>UOM</th>
										<th>Requested Quantity</th>
										<th>Available Stocks</th>
										<th>For Purchase</th>
										</tr>
									</thead>
									<tbody class="assetTableBody">
									${requestAssetHTML}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>

					</div>
					`;

					// html = `
					// <div class="w-100">
					// 	<hr class="pb-1">
					// 	<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Item/s Request</div>
					// 	<table class="table table-striped requestItemTable" isReadOnly="${readOnly}" id="tableRequestItems">
					// 		<thead>
					// 			<tr style="white-space: nowrap">
					// 				<th>Item Code</th>
					// 				<th>Item Name/Brand</th>
					// 				<th>Item Classification/Category</th>
					// 				<th>UOM</th>
					// 				<th>Request Quantity</th>
					// 				<th>Available Stocks</th>
					// 				<th>For Purchase</th>
					// 			</tr>
					// 		</thead>
					// 		<tbody class="itemTableBody">
					// 			${requestItemHTML}
					// 		</tbody>
					// 	</table>
						
					// </div>`;

			
		} else {
			html = `
			<div class="w-100 text-center mb-5">
				<img src="${base_url}assets/modal/please-select.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="No Asset Records Found.">
				<div class="h4">No Asset Records Found.</div>
			</div>`
		}
		return html;
	}
	// ----- END GET REQUEST ASSETS CONTENT -----

	


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			inventoryValidationID       = "",
			reviseInventoryValidationID = "",
			employeeID              = "",
			materialRequestID          = "",
			projectCode             = "",
			projectName             = "",
			projectCategory         = "",
			clientName              = "",
			clientAddress           = "",
			inventoryValidationReason   = "",
			inventoryValidationRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			dateNeeded				=  "",
			inventoryValidationStatus   = false,
			submittedAt             = false,
			createdAt               = false,
			createdBy 				= ""
		} = data && data[0];

	
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? (employeeID == "0" ? createdBy : employeeID) : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		// readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("inventoryValidationID", encryptString(inventoryValidationID));
		$("#btnBack").attr("status", inventoryValidationStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? inventoryValidationID : reviseInventoryValidationID;
		let documentHeaderClass = isRevise || reviseInventoryValidationID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseInventoryValidationID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseInventoryValidationID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("IVR", createdAt, reviseDocumentNo)}
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
							${inventoryValidationID && !isRevise ? getFormCode("IVR", createdAt, inventoryValidationID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${inventoryValidationStatus && !isRevise ? getStatusStyle(inventoryValidationStatus,true) : "---"}
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
								${getDateApproved(inventoryValidationStatus, approversID, approversDate)}
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
							${inventoryValidationRemarks && !isRevise ? inventoryValidationRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_inventory_validation">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						disabled 
						value="${projectCode || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" 
						class="form-control" 
						name="projectName" 
						disabled 
						value="${projectName || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectName"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Category</label>
                    <input type="text" 
						class="form-control" 
						name="projectCategory" 
						disabled 
						value="${projectCategory || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectCategory"></div>
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
            <div class="col-md-4 col-sm-12">
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
                    <label>Date Needed</label>
                    <input type="text" 
						class="form-control" 
						name="dateNeeded" 
						disabled 
						value="${moment(dateNeeded).format("MMMM DD, YYYY") || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDesignation}">
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="inventoryValidationReason"
                        name="inventoryValidationReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled>${inventoryValidationReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-inventoryValidationReason"></div>
                </div>
            </div>


			<div class="col-sm-12" id="request-items-table-content">
					${requestItemsContent(data, readOnly)}
            </div>

			<div class="col-sm-12" id="request-assets-table-content">
					${requestAssetsContent(data, readOnly)}
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


	// ----- GET PURCHASE REQUEST DATA -----
	function getInventoryValidationData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			formData.append("inventoryValidationID", id);

			if (status != "2") {
				formData.append("inventoryValidationStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
		

			formData.append("employeeID", sessionID);

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("inventoryValidationID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("inventoryValidationStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.delete("inventoryValidationStatus");
					formData.append("inventoryValidationStatus", 2);
				}
			}

			// if(status == "2"){
				
			// }
		}
		
		
		return isObject ? data : formData;
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


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("inventoryValidationID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("IVR", dateToday(), id);
		const status     = $(this).attr("status");

		// if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getInventoryValidationData(action, "save", "0", id);
				data.append("inventoryValidationStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseInventoryValidationID", id);
					data.delete("inventoryValidationID");
				} else {
					data.append("inventoryValidationID", id);
					data.delete("action");
					data.append("action", "update");
				}

				
				saveInventoryValidation(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		// } else {
		// 	const action = id && feedback ? "update" : "insert";
		// 	const data   = getInventoryValidationData(action, "save", "0", id);
		// 	data.append("inventoryValidationStatus", 0);

	
		// 	saveInventoryValidation(data, "save", null, pageContent);
		// }
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("IVR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getInventoryValidationData(action, "save", "0", id);
		data.append("inventoryValidationStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseInventoryValidationID", id);
				data.delete("inventoryValidationID");
			} else {
				data.append("inventoryValidationID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}


		saveInventoryValidation(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----



    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";

		
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getInventoryValidationData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.append("reviseInventoryValidationID", id);
					data.delete("inventoryValidationID");
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
					moduleID:                126,
					notificationTitle:       "Inventory Validation",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveInventoryValidation(data, "submit", notificationData, pageContent);
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("inventoryValidationID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getInventoryValidationData(action, "cancelform", "4", id, status);

		saveInventoryValidation(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("inventoryValidationID"));
		const feedback = $(this).attr("code") || getFormCode("IVR", dateToday(), id);
		let tableData  = getTableData("ims_inventory_validation_tbl", "", "inventoryValidationID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;
			let createdBy       = tableData[0].createdBy;

			let materialWithdrawalCode = generateCode("MWF", false, "ims_material_withdrawal_tbl", "materialWithdrawalCode");
			let stockOutCode = generateCode("STO", false, "ims_stock_out_tbl", "stockOutCode");
			let equipmentBorrowingCode = generateCode("EBF", false, "ims_equipment_borrowing_tbl", "materialWithdrawalCode");
			let inventoryValidationID = tableData[0].inventoryValidationID;
			let inventoryValidationCode = tableData[0].inventoryValidationCode;
			let materialRequestID = tableData[0].materialRequestID;
			let materialRequestCode = tableData[0].materialRequestCode;
			let costEstimateID = tableData[0].costEstimateID;
			let costEstimateCode = tableData[0].costEstimateCode;
			let billMaterialID = tableData[0].billMaterialID;
			let billMaterialCode = tableData[0].billMaterialCode;
			let timelineBuilderID = tableData[0].timelineBuilderID;
			let projectCode = tableData[0].projectCode;
			let projectName = tableData[0].projectName;
			let projectCategory = tableData[0].projectCategory;
			let clientCode = tableData[0].clientCode;
			let clientName = tableData[0].clientName;
			let clientAddress = tableData[0].clientAddress;
			let dateNeeded = tableData[0].dateNeeded;
			
			let inventoryItemStatus = 0;
			let inventoryAssetStatus = 0;
			let materialWithdrawalStatus = 0;

			let data = getInventoryValidationData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                126,
					tableID:                 id,
					notificationTitle:       "Inventory Validation",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				
				data.append(`materialWithdrawalCode`, materialWithdrawalCode);
				data.append(`stockOutCode`, stockOutCode);
				data.append(`equipmentBorrowingCode`, equipmentBorrowingCode);
				data.append(`inventoryValidationID`, inventoryValidationID);
				data.append(`inventoryValidationCode`, inventoryValidationCode);
				data.append(`materialRequestID`, materialRequestID);
				data.append(`materialRequestCode`, materialRequestCode);
				data.append(`costEstimateID`, costEstimateID);
				data.append(`costEstimateCode`, costEstimateCode);
				data.append(`billMaterialID`, billMaterialID);
				data.append(`billMaterialCode`, billMaterialCode);
				data.append(`timelineBuilderID`, timelineBuilderID);
				data.append(`projectCode`, projectCode);
				data.append(`projectName`, projectName);
				data.append(`projectCategory`, projectCategory);
				data.append(`clientCode`, clientCode);
				data.append(`clientName`, clientName);
				data.append(`clientAddress`, clientAddress);
				data.append(`dateNeeded`, dateNeeded);
				data.append(`employeeID`, employeeID);
				data.append(`createdBy`, createdBy);
				
				data.append(`inventoryItemStatus`, inventoryItemStatus);
				data.append(`inventoryAssetStatus`, inventoryAssetStatus);
				data.append(`materialWithdrawalStatus`, materialWithdrawalStatus);


				$(".itemTableRow").each(function(i, obj){
					let requestItemID 			= $(this).attr("requestitemid");
					let inventoryValidationID 	= $(this).attr("inventoryValidationID");

					let forPurchase 			= $(this).find(".forpurchase").text().replaceAll(",","") || $(this).find(".forpurchase").text();
					let availableStocks 		= $(this).find(".availablestocks").text().replaceAll(",","") || $(this).find(".availablestocks").text();

					data.append(`items[${i}][requestItemID]`, requestItemID);
					data.append(`items[${i}][inventoryValidationID]`, inventoryValidationID);
					data.append(`items[${i}][forPurchase]`, forPurchase);
					data.append(`items[${i}][availableStocks]`, availableStocks);
					
					
				});

				$(".itemTableRow").each(function(i, obj){
					let requestItemID 			= $(this).attr("requestitemid");
					let inventoryValidationID 	= $(this).attr("inventoryValidationID");
					let requestItemData			= getTableData("ims_request_items_tbl", "", `requestItemID = '${requestItemID}'`);
					let tableData 				= requestItemData[0];
					let getForPurchase = +$(this).find(".forpurchase").text().replaceAll(",","") || $(this).find(".forpurchase").text();
					let getAvailableStocks = +$(this).find(".availablestocks").text().replaceAll(",","") || $(this).find(".availablestocks").text();

					if(requestItemData.length !=0){
						let costEstimateID = tableData.costEstimateID;
					let billMaterialID = tableData.billMaterialID;
					let materialRequestID = tableData.materialRequestID;
					let bidRecapID = tableData.bidRecapID;
					let purchaseRequestID = tableData.purchaseRequestID;
					let purchaseOrderID = tableData.purchaseOrderID;
					let changeRequestID = tableData.changeRequestID;
					let inventoryReceivingID = tableData.inventoryReceivingID;
					let inventoryVendorID = tableData.inventoryVendorID;
					let inventoryVendorCode = tableData.inventoryVendorCode;
					let inventoryVendorName = tableData.inventoryVendorName;
					let finalQuoteRemarks = tableData.finalQuoteRemarks;
					let milestoneBuilderID = tableData.milestoneBuilderID;
					let phaseDescription = tableData.phaseDescription;
					let milestoneListID = tableData.milestoneListID;
					let projectMilestoneID = tableData.projectMilestoneID;
					let projectMilestoneName = tableData.projectMilestoneName;
					let itemID = tableData.itemID;
					let itemCode = tableData.itemCode;
					let itemBrandName = tableData.itemBrandName;
					let itemName = tableData.itemName;
					let itemClassification = tableData.itemClassification;
					let itemCategory = tableData.itemCategory;
					let itemUom = tableData.itemUom;
					let itemDescription = tableData.itemDescription;
					let files = tableData.files;
					let remarks = tableData.remarks;
					let requestQuantity = tableData.requestQuantity;

					let computeReservedItem  = "";
					
					if(getForPurchase == 0 ){
						if( getAvailableStocks ==0){
							computeReservedItem = 0;

						}else{
							computeReservedItem =  requestQuantity;

						}
					}else{
						 computeReservedItem = Math.abs(getForPurchase - requestQuantity);

					}
					let reservedItem =  computeReservedItem || tableData.reservedItem;
					let forPurchase 	= getForPurchase;				
					let availableStocks = getAvailableStocks;				
					let unitCost = tableData.unitCost;
					let totalCost = tableData.totalCost;


					data.append(`items[${i}][costEstimateID]` , costEstimateID);
					data.append(`items[${i}][billMaterialID]` , billMaterialID);
					data.append(`items[${i}][materialRequestID]` , materialRequestID);
					data.append(`items[${i}][inventoryValidationID]` , inventoryValidationID);
					data.append(`items[${i}][bidRecapID]` , bidRecapID);
					data.append(`items[${i}][purchaseRequestID]` , purchaseRequestID);
					data.append(`items[${i}][purchaseOrderID]` , purchaseOrderID);
					data.append(`items[${i}][changeRequestID]` , changeRequestID);
					data.append(`items[${i}][inventoryReceivingID]` , inventoryReceivingID);
					data.append(`items[${i}][inventoryVendorID]` , inventoryVendorID);
					data.append(`items[${i}][inventoryVendorCode]` , inventoryVendorCode);
					data.append(`items[${i}][inventoryVendorName]` , inventoryVendorName);
					data.append(`items[${i}][finalQuoteRemarks]` , finalQuoteRemarks);
					data.append(`items[${i}][milestoneBuilderID]` , milestoneBuilderID);
					data.append(`items[${i}][phaseDescription]` , phaseDescription);
					data.append(`items[${i}][milestoneListID]` , milestoneListID);
					data.append(`items[${i}][projectMilestoneID]` , projectMilestoneID);
					data.append(`items[${i}][projectMilestoneName]` , projectMilestoneName);
					data.append(`items[${i}][itemID]` , itemID);
					data.append(`items[${i}][itemCode]` , itemCode);
					data.append(`items[${i}][itemBrandName]` , itemBrandName);
					data.append(`items[${i}][itemName]` , itemName);
					data.append(`items[${i}][itemClassification]` , itemClassification);
					data.append(`items[${i}][itemCategory]` , itemCategory);
					data.append(`items[${i}][itemUom]` , itemUom);
					data.append(`items[${i}][itemDescription]` , itemDescription);
					data.append(`items[${i}][files]` , files);
					data.append(`items[${i}][remarks]`  , remarks);
					data.append(`items[${i}][requestQuantity]` , requestQuantity);
					data.append(`items[${i}][reservedItem]` , reservedItem);
					data.append(`items[${i}][forPurchase]` , forPurchase);
					data.append(`items[${i}][availableStocks]` , availableStocks );
					data.append(`items[${i}][unitCost]` , unitCost);
					data.append(`items[${i}][totalCost]` , totalCost);
					}

					
				});


				$(".assetTableRow").each(function(i, obj){
					let requestAssetID 			= $(this).attr("requestassetid");
					let inventoryValidationID 	= $(this).attr("inventoryValidationID");

					let forPurchase 			= $(this).find(".forpurchase").text().replaceAll(",","") || $(this).find(".forpurchase").text();
					let availableStocks 		= $(this).find(".availablestocks").text().replaceAll(",","") || $(this).find(".availablestocks").text();

					data.append(`assets[${i}][requestAssetID]`, requestAssetID);
					data.append(`assets[${i}][inventoryValidationID]`, inventoryValidationID);
					data.append(`assets[${i}][forPurchase]`, forPurchase);
					data.append(`assets[${i}][availableStocks]`, availableStocks);
					
					
				});

				$(".assetTableRow").each(function(i, obj){
					let requestAseetID 			= $(this).attr("requestassetid");
					let inventoryValidationID 	= $(this).attr("inventoryValidationID");
					let requestAssetData			= getTableData("ims_request_assets_tbl", "", `requestAssetID = '${requestAseetID}'`);
					let tableData 				= requestAssetData[0];
					let getForPurchase = +$(this).find(".forpurchase").text().replaceAll(",","") || $(this).find(".forpurchase").text();
					let getAvailableStocks = +$(this).find(".availablestocks").text().replaceAll(",","") || $(this).find(".availablestocks").text();

					if(requestAssetData.length !=0){
						let costEstimateID = tableData.costEstimateID;
						let billMaterialID = tableData.billMaterialID;
						let materialRequestID = tableData.materialRequestID;
						let bidRecapID = tableData.bidRecapID;
						let purchaseRequestID = tableData.purchaseRequestID;
						let purchaseOrderID = tableData.purchaseOrderID;
						let changeRequestID = tableData.changeRequestID;
						let inventoryReceivingID = tableData.inventoryReceivingID;
						let inventoryVendorID = tableData.inventoryVendorID;
						let inventoryVendorCode = tableData.inventoryVendorCode;
						let inventoryVendorName = tableData.inventoryVendorName;
						let finalQuoteRemarks = tableData.finalQuoteRemarks;
						let milestoneBuilderID = tableData.milestoneBuilderID;
						let phaseDescription = tableData.phaseDescription;
						let milestoneListID = tableData.milestoneListID;
						let projectMilestoneID = tableData.projectMilestoneID;
						let projectMilestoneName = tableData.projectMilestoneName;
						let assetID = tableData.assetID;
						let assetCode = tableData.assetCode;
						let assetBrandName = tableData.assetBrandName;
						let assetName = tableData.assetName;
						let assetClassification = tableData.assetClassification;
						let assetCategory = tableData.assetCategory;
						let assetUom = tableData.assetUom;
						let assetDescription = tableData.assetDescription;
						let files = tableData.files;
						let remarks = tableData.remarks;
						let requestQuantity = tableData.requestQuantity;
	
						let computeReservedAsset  = "";
	
						if(getForPurchase == 0 ){
							if( getAvailableStocks ==0){
								computeReservedAsset = 0;
	
							}else{
								computeReservedAsset =  requestQuantity;
	
							}
						}else{
							 computeReservedAsset = Math.abs(getForPurchase - requestQuantity);
	
						}
						
						let reservedAsset = computeReservedAsset || tableData.reservedAsset;
						let	requestManHours = tableData.requestManHours;
						let	dateNeeded = tableData.dateNeeded;
						let	dateReturn = tableData.dateReturn;
						let	actualDateReturn = tableData.actualDateReturn;
						let forPurchase 			= getForPurchase;
						let availableStocks 		= getAvailableStocks;
						let totalCost = tableData.totalCost;
	
	
						data.append(`assets[${i}][costEstimateID]` , costEstimateID);
						data.append(`assets[${i}][billMaterialID]` , billMaterialID);
						data.append(`assets[${i}][materialRequestID]` , materialRequestID);
						data.append(`assets[${i}][inventoryValidationID]` , inventoryValidationID);
						data.append(`assets[${i}][bidRecapID]` , bidRecapID);
						data.append(`assets[${i}][purchaseRequestID]` , purchaseRequestID);
						data.append(`assets[${i}][purchaseOrderID]` , purchaseOrderID);
						data.append(`assets[${i}][changeRequestID]` , changeRequestID);
						data.append(`assets[${i}][inventoryReceivingID]` , inventoryReceivingID);
						data.append(`assets[${i}][inventoryVendorID]` , inventoryVendorID);
						data.append(`assets[${i}][inventoryVendorCode]` , inventoryVendorCode);
						data.append(`assets[${i}][inventoryVendorName]` , inventoryVendorName);
						data.append(`assets[${i}][finalQuoteRemarks]` , finalQuoteRemarks);
						data.append(`assets[${i}][milestoneBuilderID]` , milestoneBuilderID);
						data.append(`assets[${i}][phaseDescription]` , phaseDescription);
						data.append(`assets[${i}][milestoneListID]` , milestoneListID);
						data.append(`assets[${i}][projectMilestoneID]` , projectMilestoneID);
						data.append(`assets[${i}][projectMilestoneName]` , projectMilestoneName);
						data.append(`assets[${i}][assetID]` , assetID);
						data.append(`assets[${i}][assetCode]` ,assetCode);
						data.append(`assets[${i}][assetBrandName]` , assetBrandName);
						data.append(`assets[${i}][assetName]` , assetName);
						data.append(`assets[${i}][assetClassification]` , assetClassification);
						data.append(`assets[${i}][assetCategory]` , assetCategory);
						data.append(`assets[${i}][assetUom]` , assetUom);
						data.append(`assets[${i}][assetDescription]` , assetDescription);
						data.append(`assets[${i}][files]` , files);
						data.append(`assets[${i}][remarks]`  , remarks);
						data.append(`assets[${i}][requestQuantity]` , requestQuantity);
						data.append(`assets[${i}][reservedAsset]` , reservedAsset);
						data.append(`assets[${i}][forPurchase]` , forPurchase);
						data.append(`assets[${i}][availableStocks]` , availableStocks );
						data.append(`assets[${i}][requestManHours]` , requestManHours );
						data.append(`assets[${i}][dateNeeded]` , dateNeeded );
						data.append(`assets[${i}][dateReturn]` , dateReturn );
						data.append(`assets[${i}][actualDateReturn]` , actualDateReturn );
						data.append(`assets[${i}][totalCost]` , totalCost);
					}

				
				});

			} else {
				status = 1;
				notificationData = {
					moduleID:                126,
					tableID:                 id,
					notificationTitle:       "Inventory Validation",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("inventoryValidationStatus", status);

			saveInventoryValidation(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("inventoryValidationID"));
		const feedback = $(this).attr("code") || getFormCode("IVR", dateToday(), id);

		$("#modal_inventory_validation_content").html(preloader);
		$("#modal_inventory_validation .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_inventory_validation").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="inventoryValidationRemarks"
					name="inventoryValidationRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-inventoryValidationRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			inventoryValidationID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_inventory_validation_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("inventoryValidationID"));
		const feedback = $(this).attr("code") || getFormCode("IVR", dateToday(), id);

		const validate = validateForm("modal_inventory_validation");
		if (validate) {
			let tableData = getTableData("ims_inventory_validation_tbl", "", "inventoryValidationID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("inventoryValidationID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("inventoryValidationRemarks", $("[name=inventoryValidationRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                126,
					tableID: 				 id,
					notificationTitle:       "Inventory Validation",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveInventoryValidation(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// // ----- DROP DOCUMENT -----
	// $(document).on("click", "#btnDrop", function() {
	// 	const id = decryptString($(this).attr("inventoryValidationID"));
	// 	let data = new FormData;
	// 	data.append("inventoryValidationID", id);
	// 	data.append("action", "update");
	// 	data.append("method", "drop");
	// 	data.append("updatedBy", sessionID);

	// 	saveInventoryValidation(data, "drop", null, pageContent);
	// })
	// // ----- END DROP DOCUMENT -----


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
	const title = "Inventory Validation";
	let swalText, swalImg;

	$("#modal_inventory_validation").text().length > 0 && $("#modal_inventory_validation").modal("hide");

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
		// case "drop":
		// 	swalTitle = `DROP ${title.toUpperCase()}`;
		// 	swalText  = "Are you sure to drop this document?";
		// 	swalImg   = `${base_url}assets/modal/drop.svg`;
		// 	break;
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

function saveInventoryValidation(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `inventory_validation/saveInventoryValidation`,
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
							swalTitle = `${getFormCode("", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} denied successfully!`;
						} //else if (method == "drop") {
							//swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} dropped successfully!`;
						// }	
		
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
						$("#modal_inventory_validation").text().length > 0 && $("#modal_inventory_validation").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_inventory_validation").text().length > 0 && $("#modal_inventory_validation").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------