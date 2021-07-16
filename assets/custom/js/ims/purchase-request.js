$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(46);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase request");
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
				"ims_purchase_request_tbl", 
				"revisePurchaseRequestID", 
				"revisePurchaseRequestID IS NOT NULL AND purchaseRequestStatus != 4");
			return revisedDocumentsID.map(item => item.revisePurchaseRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					purchaseRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (purchaseRequestStatus == 0 || purchaseRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (purchaseRequestStatus == 0) {
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
			window.history.pushState("", "", `${base_url}ims/purchase_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/purchase_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/purchase_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/purchase_request`);
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

	const inventoryItemList = getTableData(
		`ims_inventory_item_tbl 
			LEFT JOIN ims_inventory_category_tbl USING(categoryID)
			LEFT JOIN ims_inventory_classification_tbl ON (ims_inventory_item_tbl.classificationID = ims_inventory_classification_tbl.classificationID)`, 
		`itemID, itemCode, itemName, itemDescription, brandName, categoryName, classificationName, unitOfMeasurementID, ims_inventory_item_tbl.createdAt`,
		"itemStatus = 1");

	const inventoryPriceList = getTableData(
		`ims_inventory_price_list_tbl`,
		``,
		`preferred = 1`
	);

	const billMaterialList = getTableData(
		`pms_bill_material_tbl`,
		"",
		`billMaterialStatus = 2`
	);
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
				{ targets: 7,  width: 80  },
				{ targets: 8,  width: 250 },
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
			if (isImModuleApprover("ims_purchase_request_tbl", "approversID")) {
				let count = getCountForApproval("ims_purchase_request_tbl", "purchaseRequestStatus");
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
			if (isCreateAllowed(46)) {
				html = `
				<button type="button" 
					class="btn btn-default btn-add" 
					id="btnAdd">
					<i class="icon-plus"></i> ${text}
				</button>`;
			}
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
		let purchaseRequestData = getTableData(
			`ims_purchase_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID
				LEFT JOIN pms_bill_material_tbl AS pcet USING(billMaterialID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName, pcet.createdAt AS ceCreatedAt",
			`imrt.employeeID != ${sessionID} AND purchaseRequestStatus != 0 AND purchaseRequestStatus != 4`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
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

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
				projectID,
				projectListCode,
				projectListName,
				billMaterialID,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				purchaseRequestReason,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 || purchaseRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseRequestStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, purchaseRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(purchaseRequestID)}">
					<td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
					<td>${fullname}</td>
					<td>${billMaterialID && billMaterialID != 0 ? getFormCode("PBR", ceCreatedAt, billMaterialID) : '-'}</td>
					<td>
						<div>
							${projectListCode || '-'}
						</div>
						<small style="color:#848482;">${purchaseRequestReason || '-'}</small>
					</td>
					<td>${projectListName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(purchaseRequestStatus)}
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
		let purchaseRequestData = getTableData(
			`ims_purchase_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID
				LEFT JOIN pms_bill_material_tbl AS pcet USING(billMaterialID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName, pcet.createdAt AS ceCreatedAt",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
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

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
                projectID,
                projectListCode,
                projectListName,
                billMaterialID,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				purchaseRequestReason,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 || purchaseRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseRequestStatus != 0 ? "btnView" : "btnEdit";

			let button = purchaseRequestStatus != 0 ? `
            <button type="button" class="btn btn-view w-100 btnView" id="${encryptString(purchaseRequestID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button type="button" 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseRequestID )}" 
                code="${getFormCode("PR", createdAt, purchaseRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseRequestID )}">
                <td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
                <td>${fullname}</td>
				<td>${billMaterialID && billMaterialID != 0 ? getFormCode("PBR", ceCreatedAt, billMaterialID) : '-'}</td>
				<td>
					<div>
						${projectListCode || '-'}
					</div>
					<small style="color:#848482;">${purchaseRequestReason || '-'}</small>
				</td>
				<td>${projectListName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseRequestStatus)}
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
				purchaseRequestID     = "",
				purchaseRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (purchaseRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						purchaseRequestID="${encryptString(purchaseRequestID)}"
						code="${getFormCode("PR", createdAt, purchaseRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (purchaseRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							status="${purchaseRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (purchaseRequestStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						purchaseRequestID="${encryptString(purchaseRequestID)}"
						code="${getFormCode("PR", createdAt, purchaseRequestID)}"
						status="${purchaseRequestStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (purchaseRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(purchaseRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							status="${purchaseRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (purchaseRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_purchase_request_tbl`,
						`billMaterialID`,
						`purchaseRequestID = ${purchaseRequestID}`,
					);
					const { billMaterialID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_purchase_request_tbl`,
						`purchaseRequestID`,
						`purchaseRequestStatus <> 3 AND purchaseRequestStatus <> 4 AND billMaterialID = ${billMaterialID}`
					);

					if (!isDocumentRevised(purchaseRequestID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							status="${purchaseRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (purchaseRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET BILL MATERIAL LIST -----
	function getBillMaterialList(id = null, status = 0, display = true) {
		const createdBOMList = getTableData("ims_purchase_request_tbl", "billMaterialID", "purchaseRequestStatus <> 3 AND purchaseRequestStatus <> 4").map(bom => bom.billMaterialID);
		let html = `
		<option 
			value     = "0"
			bomCode   = "-"
			projectID = "0"
			${id == "0" && "selected"}>Internal</option>`;
		if (!status || status == 0) {
			html += billMaterialList.filter(bom => createdBOMList.indexOf(bom.billMaterialID) == -1 || bom.billMaterialID == id).map(bom => {
				return `
				<option 
				value     = "${bom.billMaterialID}" 
				bomCode    = "${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}"
				projectID = "${bom.projectID}"
				projectCode = "PRJ-21-00001"
				projectName = "Sample Project"
				clientName  = "BlackCoders"
				clientAddress = "Pasig City"
				${bom.billMaterialID == id && "selected"}>
				${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}
				</option>`;
			})
		} else {
			html += billMaterialList.map(bom => {
				return `
				<option 
					value     = "${bom.billMaterialID}" 
					bomCode    = "${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}"
					projectID = "${bom.projectID}"
					projectCode   = "PRJ-21-00001"
					projectName   = "Sample Project"
					clientName    = "BlackCoders"
					clientAddress = "Pasig City"
					${bom.billMaterialID == id && "selected"}>
					${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}
				</option>`;
			})
		}
        return display ? html : billMaterialList;
	}
	// ----- END GET BILL MATERIAL LIST -----


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


	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		let elementID = [];

		$("[name=itemID]").each(function() {
			const itemID = $(this).val();
			$parent = $(this).closest("tr");
			itemIDArr.push(itemID);
			elementID.push(`#${this.id}`);
			if (itemID && itemID != null) {
				$(this).trigger("change");
				// $parent.find(`[name="quantity"]`).trigger("keyup");
			}
		}) 

		elementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [...inventoryItemList];

			html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == itemIDArr[index]).map(item => {
				return `
				<option 
					value              = "${item.itemID}" 
					itemCode           = "${item.itemCode}"
					itemDescription    = "${item.itemDescription}"
					categoryName       = "${item.categoryName}"
					brandName          = "${item.brandName}"
					classificationName = "${item.classificationName}"
					uom                = "${item.unitOfMeasurementID}"
					createdAt          = "${item.createdAt}"
					${item.itemID == itemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


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


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, display = true) {
        let html  = `<option selected disabled>Select Item Name</option>`;

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let itemList = [...inventoryItemList];
		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
            return `
            <option 
                value              = "${item.itemID}" 
                itemCode           = "${item.itemCode}"
                itemDescription    = "${item.itemDescription}"
                categoryName       = "${item.categoryName}"
				brandName          = "${item.brandName}"
				classificationName = "${item.classificationName}"
                uom                = "${item.unitOfMeasurementID}"
				createdAt          = "${item.createdAt}"
                ${item.itemID == id && "selected"}>
                ${item.itemName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let flag = 0;
		$(".checkboxrow").each(function() {
			this.checked && flag++;
		})
		$(".btnDeleteRow").attr("disabled", flag == 0);
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
							updateTableItems();
							$(`[name="itemID"]`).each(function(i, obj) {
								let itemID = $(this).val();
								$(this).html(getInventoryItem(itemID));
							}) 
							updateDeleteButton();
							updateTotalAmount();
							updateInventoryItemOptions();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----


	// ----- GET ITEM ROW -----
    function getItemRow(item = {}, readOnly = false) {
		let disabled = readOnly ? "disabled" : "";
		let html = "";

		const {
			requestItemID      = "",
			itemID             = 0,
			itemCode           = "-",
			itemName           = "-",
			itemDescription    = "-",
			itemClassification = "-",
			itemUom            = "-",
			brandName          = "-",
			quantity           = 0,
			unitCost           = 0,
			totalCost          = 0,
			files              = "",
			remarks            = "",
		} = item;

		let itemFile = files ? `
		<div class="d-flex justify-content-between align-items-center py-2">
			<a class="filename"
				title="${files}"
				style="display: block;
					width: 150px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;"
				href="${base_url+"assets/upload-files/request-items/"+files}" 
				target="_blank">
				${files || ""}
			</a>
			<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
		</div>` : "";

		if (readOnly) {

		} else {
			html += `
			<tr class="itemTableRow"
				requestItemID="${requestItemID}">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow" ${disabled}>
					</div>
				</td>
				<td>
					<div class="itemcode">${itemCode || "-"}</div>
				</td>
				<td>
					<div class="itemname">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="itemID"
								style="width: 200px !important"
								required
								${disabled}>
								${getInventoryItem(itemID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-itemID"></div>
						</div>
					</div>
				</td>
				<td>
					<div class="classification">${itemClassification || "-"}</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control input-quantity text-center"
							min="0.01" 
							data-allowcharacters="[0-9]" 
							max="999999999"
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							autocomplete="off"
							required
							${disabled}>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">${itemUom}</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">${formatAmount(totalCost, true)}</div>
				</td>
				<td>
					<div class="file">
						<div class="displayfile">${itemFile}</div>
						<input type="file" 
							class="form-control" 
							name="files" 
							accept="image/*, .pdf, .doc, .docx">
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
							data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
							name="remarks" 
							id="remarks">${remarks || ""}</textarea>
					</div>
				</td>
			</tr>`;
		}

        return html;
    }
    // ----- END GET ITEM ROW -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name=quantity]`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`.unitcost`).map(element => getNonFormattedAmount(element.innerText) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount`).text(formatAmount(totalAmount, true));
		$("#purchaseRequestProjectTotal").text(formatAmount(totalAmount, true));

		const projectTotal = +getNonFormattedAmount($(`#purchaseRequestProjectTotal`).text()); 
		const companyTotal = +getNonFormattedAmount($(`#purchaseRequestCompanyTotal`).text()); 
		const grandTotal   = projectTotal + companyTotal;
		$("#purchaseRequestGrandTotal").text(formatAmount(grandTotal, true));

		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET COST ESTIMATE REQUEST ITEMS -----
	function getCostEstimateRequestItems(isMaterialEquipment = false, item = false) {
		let html = "";
		if (item) {
			const {
				requestItemID      = "",
				itemCode           = "-",
				itemName           = "-",
				itemClassification = "-",
				quantity           = 0,
				itemUom            = "",
				unitCost           = 0,
				totalCost          = 0,
				files              = "",
				remarks            = "-",
			} = item;

			let tdClassification = !isMaterialEquipment ? `
			<td>${itemClassification || "-"}</td>` : "";
			let fileHTML = files ? `
			<a href="${base_url}assets/upload-files/request-items/${files}"
				target="_blank"
				title="${files}"
				alt="${files}">${files}</a>` : "-"

			html += `
			<tr class="itemTableRow"
				requestItemID="${requestItemID}">
				<td>${itemCode || "-"}</td>
				<td>${itemName && itemName != "Select Item Name" ? itemName : "-"}</td>
				${tdClassification}
				<td class="text-center">${formatAmount(quantity)}</td>
				<td>${itemUom || "-"}</td>
				<td class="text-right">${formatAmount(unitCost, true)}</td>
				<td class="text-right totalcost">${formatAmount(totalCost, true)}</td>
				<td>${fileHTML}</td>
				<td>${remarks || "-"}</td>
			</tr>`;
		}
		return html;
	}
	// ----- END GET COST ESTIMATE REQUEST ITEMS -----


	// ----- GET COST ESTIMATE REQUEST TABLE -----
	function getCostEstimateRequestTable(item = false, index = 0) {
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
					requestItemsHTML += getCostEstimateRequestItems(false, item);
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
	// ----- END GET COST ESTIMATE REQUEST TABLE -----


	// ----- GET MATERIAL EQUIPMENT REQUEST TABLE -----
	function getMaterialEquipmentRequestTable(item = false, index = 0) {
		let html = "";
		if (item) {
			const {
				name  = "",
				items = []
			} = item;

			let requestItemsHTML = items.map(item => {
				return getCostEstimateRequestItems(true, item);
			}).join("");

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


	// ----- GET ITEM REQUEST -----
	function getRequestItems(purchaseRequestID = 0, billMaterialID = 0) {
		let result = {};
		$.ajax({
			method: "POST",
			url: "purchase_request/getCostEstimateRequest",
			data: { purchaseRequestID, billMaterialID },
			async: false,
			dataType: "json",
			success: function(data) {
				result = data;
			}
		})
		return result;
	}
	// ----- END GET ITEM REQUEST -----


	// ----- GET COST ESTIMATE REQUEST ITEMS -----
	function getCostEstimateRequest(billMaterialID = 0, purchaseRequestID = 0) {
		let requestItems = getRequestItems(purchaseRequestID, billMaterialID);

		let costEstimateRequestItemHTML = "", materialsEquipmentRequestItemHTML = "";
		requestItems.phases.map((item, index) => {
			costEstimateRequestItemHTML += getCostEstimateRequestTable(item, index);
		})
		requestItems.materialsEquipment.map((item, index) => {
			materialsEquipmentRequestItemHTML += getMaterialEquipmentRequestTable(item, index);
		})

		let projectPhaseHTML = costEstimateRequestItemHTML ? `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Phase</div>
			${costEstimateRequestItemHTML}
		</div>` : "";
		let materialsEquipmentHTML = materialsEquipmentRequestItemHTML ? `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Materials and Equipment</div>
			${materialsEquipmentRequestItemHTML}
		</div>` : "";

		return projectPhaseHTML+materialsEquipmentHTML;
	}
	// ----- END GET COST ESTIMATE REQUEST ITEMS -----


	// ----- GET MATERIALS EQUIPMENT REQUEST ITEMS -----
	function getMaterialEquipmentRequestItems(purchaseRequestID = 0) {
		let result = [];
		$.ajax({
			method: "POST",
			url: "purchase_request/getMaterialEquipmentRequestItems",
			data: { purchaseRequestID },
			async: false,
			dataType: "json",
			success: function(data) {
				result = data;
			}
		})
		return result;
	}
	// ----- END GET MATERIALS EQUIPMENT REQUEST ITEMS -----


	// ----- GET TABLE MATERIALS AND EQUIPMENT -----
	function getMaterialsEquipment(data = false, readOnly = false) {
		let html = "";
		if (data) {

			const {
				purchaseRequestID       = "",
				revisePurchaseRequestID = "",
				employeeID              = "",
				billMaterialID          = "",
				projectID               = "",
				purchaseRequestReason   = "",
				projectTotalAmount      = 0,
				companyTotalAmount      = 0,
				purchaseRequestRemarks  = "",
				approversID             = "",
				approversStatus         = "",
				approversDate           = "",
				purchaseRequestStatus   = false,
				submittedAt             = false,
				createdAt               = false,
			} = data && data[0];

			let disabled = readOnly ? "disabled" : "";

			let checkboxHeader = !disabled ? `
			<th class="text-center">
				<div class="action">
					<input type="checkbox" class="checkboxall">
				</div>
			</th>` : ``;

			let buttonAddDeleteRow = !disabled ? `
			<div class="d-flex flex-column justify-content-start text-left my-2">
				<div>
					<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
					<button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow"  disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
				</div>
			</div>` : "";

			let requestItemsData = [], requestItemHTML = "";
			if (readOnly) {
				if (billMaterialID) {
					html = getCostEstimateRequest(billMaterialID, purchaseRequestID);
				} else {
					requestItemsData = getMaterialEquipmentRequestItems(purchaseRequestID);
					html = `
					<div class="w-100">
						<hr class="pb-1">
						<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Materials and Equipment</div>`;

					if (requestItemsData.length > 0) {
						requestItemsData.map((item, index) => {
							html += getMaterialEquipmentRequestTable(item, index);
						})
					}

					html += `
					</div>`
				}
			} else {
				if (purchaseRequestID) {
					requestItemsData = getTableData(
						`ims_request_items_tbl`, 
						``, 
						`purchaseRequestID = ${purchaseRequestID} AND (billMaterialID IS NULL OR billMaterialID = 0) AND inventoryValidationID IS NULL`);
				}
				if (requestItemsData.length > 0) {
					requestItemsData.map(item => {
						requestItemHTML += getItemRow(item, readOnly);
					})
				} else {
					requestItemHTML = getItemRow(false, readOnly);
				}


				if (billMaterialID && billMaterialID != "0" && purchaseRequestID) {
					html = getCostEstimateRequest(billMaterialID, purchaseRequestID);
				} else {
					html = `
					<div class="w-100">
						<hr class="pb-1">
						<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Materials and Equipment Request</div>
						<table class="table table-striped requestItemTable" isReadOnly="${readOnly}" id="tableRequestItems">
							<thead>
								<tr style="white-space: nowrap">
									${checkboxHeader}
									<th>Item Code</th>
									<th>Item Name ${!disabled ? "<code>*</code>" : ""}</th>
									<th>Item Classification</th>
									<th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
									<th>UOM</th>
									<th>Unit Cost</th>
									<th>Total Cost</th>
									<th>File</th>
									<th>Remarks</th>
								</tr>
							</thead>
							<tbody class="itemTableBody">
								${requestItemHTML}
							</tbody>
						</table>
						
						<div class="w-100 d-flex justify-content-between align-items-center py-2">
							<div>${buttonAddDeleteRow}</div>
						</div>
					</div>`;
				}
			}
			
		} else {
			html = `
			<div class="w-100 text-center mb-5">
				<img src="${base_url}assets/modal/please-select.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="Please Select Reference No.">
				<div class="h4">Please Select Reference No.</div>
			</div>`
		}
		return html;
	}
	// ----- END GET TABLE MATERIALS AND EQUIPMENT -----


	// ----- SELECT INVENTORY VALIDATION -----
	$(document).on("change", `[name="billMaterialID"]`, function() {
		const billMaterialID = $(this).val();
		
		const projectID     = $(`option:selected`, this).attr("projectID") || "-";
		const projectCode   = $(`option:selected`, this).attr("projectCode") || "-";
		const projectName   = $(`option:selected`, this).attr("projectName") || "-";
		const clientName    = $(`option:selected`, this).attr("clientName") || "-";
		const clientAddress = $(`option:selected`, this).attr("clientAddress") || "-";

		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectName"]`).val(projectName);
		$(`[name="clientName"]`).val(clientName);
		$(`[name="clientAddress"]`).val(clientAddress);

		$("#tableRequestItemContent").html(preloader);
		if (billMaterialID == "0") {
			setTimeout(() => {
				let materialsEquipment = getMaterialsEquipment([{billMaterialID}]);
				$(`#tableRequestItemContent`).html(materialsEquipment);
				initDataTables();
				initAll();
				updateTableItems();
				$(`#costSummary`).html(getCostSummary(true));
			}, 200);
		} else {
			setTimeout(() => {
				let requestItems = getCostEstimateRequest(billMaterialID, 0);
				$(`#tableRequestItemContent`).html(requestItems);
				initDataTables();
				initAll();
				updateTableItems();
				$(`#costSummary`).html(getCostSummary());
			}, 200);
		}

	})
	// ----- END SELECT INVENTORY VALIDATION -----


    // ----- SELECT ITEM NAME -----
    $(document).on("change", "[name=itemID]", function() {
		const selectedItemID = $(this).val();
        const itemCode       = $('option:selected', this).attr("itemCode");
        const itemName       = $('option:selected', this).text();
        const uom            = $('option:selected', this).attr("uom");
        const categoryName   = $('option:selected', this).attr("categoryName");
        const brandName      = $('option:selected', this).attr("brandName");
        const classificationName = $('option:selected', this).attr("classificationName");
		const billMaterialID = $(`[name="billMaterialID"]`).val();

		if (selectedItemID != "0" && (!billMaterialID || billMaterialID == "0")) {
			$(`.btnAddRow`).removeAttr("disabled");
		} else {
			$(`.btnAddRow`).attr("disabled", true);
		}

		getInventoryPreferredPrice(selectedItemID, this);

		$(this).closest("tr").find(`.itemcode`).first().text(itemCode);
		$(this).closest("tr").find(`.category`).first().text(categoryName);
		$(this).closest("tr").find(`.classification`).first().text(classificationName);
		$(this).closest("tr").find(`.classification`).first().attr("name", classificationName);
		$(this).closest("tr").find(`.uom`).first().text(titleCase(uom));

		$(`[name=itemID]`).each(function(i, obj) {
			let itemID = $(this).val();
			if (itemID == "0") {
				$(this).closest("tr").find("[name=quantity]").removeAttr("required");
				$(this).closest("tr").find("[name=quantity]").val("0").removeClass("is-valid is-invalid has-error no-error");
				$(this).closest("tr").find(".unitcost").text(formatAmount("0.00", true));
				$(this).closest("tr").find(".totalcost").text(formatAmount("0.00", true));
				$(this).closest("tr").find("[name=files]").val("").removeClass("is-valid is-invalid has-error no-error");
				$(this).closest("tr").find(".displayfile").empty();
				$(this).closest("tr").find("[name=remarks]").val("").removeClass("is-valid is-invalid has-error no-error");
				$(this).closest("tr").find("[name=quantity], [name=files], [name=remarks]").attr("disabled", "true");
				$(this).closest("tr").find(".invalid-feedback").empty("");
			} else {
				let oldQty = $(this).closest("tr").find("[name=quantity]").val();
				oldQty = oldQty != 0 ? oldQty : 0;
				$(this).closest("tr").find("[name=quantity]").attr("required", true);
				$(this).closest("tr").find("[name=quantity]").val(oldQty);
				
				if ($(this).closest("tr").find("[name=quantity]").attr("ceID") == "true") {
					if (billMaterialID && billMaterialID != "0" && billMaterialID != "Select Reference No.") {
						$(this).closest("tr").find("[name=files], [name=remarks]").removeAttr("disabled");
					} else {
						$(this).closest("tr").find("[name=quantity], [name=files], [name=remarks]").removeAttr("disabled");
					}
				} else {
					$(this).closest("tr").find("[name=quantity], [name=files], [name=remarks]").removeAttr("disabled");
				}

				const unitCost  = getInventoryPreferredPrice(itemID, this, true) || 0;
				const quantity  = $(this).closest("tr").find("[name=quantity]").val();
				const totalCost = quantity * unitCost;
				$(this).closest("tr").find(`.unitcost`).text(formatAmount(unitCost, true));
				$(this).closest("tr").find(".totalcost").text(formatAmount(totalCost, true));

			}
			$(this).html(getInventoryItem(itemID));
		}) 
		updateTotalAmount();		
		$(`#costSummary`).html(getCostSummary(true));
    })
    // ----- END SELECT ITEM NAME -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity]", function() {
		const index     = $(this).closest("tr").first().attr("index");
		const quantity  = +getNonFormattedAmount($(`#quantity${index}`).val());
		const unitcost  = +getNonFormattedAmount($(`#unitcost${index}`).text());
		const totalcost = quantity * unitcost;
		$(`#totalcost${index}`).text(formatAmount(totalcost, true));
		updateTotalAmount();
		$(`#costSummary`).html(getCostSummary(true));
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


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
				<span class="filename"
					style="display: block;
						width: 180px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;">${filename}</span>
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
		deleteTableRow();
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
		$(".checkboxrow").each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


    // ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {
		let row = getItemRow();
		$(".itemTableBody").append(row);
		updateTableItems();
		updateInventoryItemOptions();
		initInputmask();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- GET COST SUMMARY -----
	function getCostSummary(isOnCreation = false, display = true) {
		let costSummary = [], items = [];
		if (isOnCreation) {
			$(`.itemTableRow .classification`).each(function() {
				$parent    = $(this).closest("tr");
				const name = $(this).attr("name");
				let totalCost = $parent.find(".totalcost").text() || "0";
					totalCost = getNonFormattedAmount(totalCost);
				let temp = { name, totalCost };
				name && name != "-" && items.push(temp);
			})
	
			const isExisting = (inName = "") => {
				let flag = false;
				costSummary.map(summary => {
					const { name } = summary;
					if (inName === name) {
						flag = true;
					}
				})
				return flag;
			}
	
			const getTotalCost = (inName = "") => {
				return items
					.filter(cls => cls.name == inName)
					.map(cls => cls.totalCost)
					.reduce((a, b) => a + b, 0);
			}
	
			items.map(cls => {
				const { name } = cls;
				if (!isExisting(name)) {
					let temp = {
						name,
						totalCost: getTotalCost(name)
					};
					costSummary.push(temp);
				}
			})
		} else {
			$(`table.requestItemTable .itemTableBody`).each(function() {
				$parent = $(this).closest(".requestItemTable");
				const name = $parent.attr("title");
				let totalCost = 0;
				$(`td.totalcost`, this).each(function() {
					const temp = getNonFormattedAmount($(this).text());
					totalCost += temp;
				})
				let temp = { name, totalCost };
				costSummary.push(temp);
			})
		}
		

		let html = `
		<div class="row py-2">
			<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pb-2 pt-3">`;
		let	grandTotal = 0;
		costSummary.map((summary, i) => {
			const bottom = costSummary.length == i ? "pb-2" : "";
			const { name = "-", totalCost = 0 } = summary;
			html += `
			<div class="row ${bottom}" style="font-size: 1.1rem;">
				<div class="col-6 col-lg-7 text-left">${name || "-"}</div>
				<div class="col-6 col-lg-5 text-right text-dark" style="font-size: 1.05em" class="costSummary" name="${name}">
					${formatAmount(totalCost, true)}
				</div>
			</div>`;
			grandTotal += totalCost;
		})

		let grandTotalHTML = costSummary.length > 0 ? `
		<div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
			<div class="col-6 col-lg-7 text-left font-weight-bolder">Grand Total:</div>
			<div class="col-6 col-lg-5 text-right text-danger font-weight-bolder" id="purchaseRequestGrandTotal" style="font-size: 1.05em">
				${formatAmount(grandTotal, true)}
			</div>
		</div>` : "";

		html += `
				${grandTotalHTML}
			</div>
		</div>`;

		return display ? html : grandTotal;
	}
	// ----- END GET COST SUMMARY -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			purchaseRequestID       = "",
			revisePurchaseRequestID = "",
			employeeID              = "",
			billMaterialID          = "",
			projectCode             = "",
			projectName             = "",
			clientName              = "",
			clientAddress           = "",
			purchaseRequestReason   = "",
			purchaseRequestRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			purchaseRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("purchaseRequestID", encryptString(purchaseRequestID));
		$("#btnBack").attr("status", purchaseRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
		let disabledReference = billMaterialID && billMaterialID != "0" ? "disabled" : disabled;
		
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? purchaseRequestID : revisePurchaseRequestID;
		let documentHeaderClass = isRevise || revisePurchaseRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePurchaseRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePurchaseRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PR", createdAt, reviseDocumentNo)}
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
							${purchaseRequestID && !isRevise ? getFormCode("PR", createdAt, purchaseRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${purchaseRequestStatus && !isRevise ? getStatusStyle(purchaseRequestStatus) : "---"}
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
								${getDateApproved(purchaseRequestStatus, approversID, approversDate)}
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
							${purchaseRequestRemarks && !isRevise ? purchaseRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
                        name="billMaterialID"
                        id="billMaterialID"
                        style="width: 100%"
                        required
						${disabled}>
                        <option selected disabled>Select Reference No.</option>
                        ${getBillMaterialList(billMaterialID, purchaseRequestStatus)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-billMaterialID"></div>
                </div>
            </div>
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
                        id="purchaseRequestReason"
                        name="purchaseRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${purchaseRequestReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseRequestReason"></div>
                </div>
            </div>

            <div class="col-sm-12" id="tableRequestItemContent">
                ${getMaterialsEquipment(data, readOnly)}
            </div>

			<div class="col-12" id="costSummary"></div>

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
			$("#costSummary").html(getCostSummary(!readOnly));

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

			headerButton(true, "Add Purchase Request");
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
	function getPurchaseRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			formData.append("purchaseRequestID", id);

			if (status != "2") {
				formData.append("purchaseRequestStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			const billMaterialID = $("[name=billMaterialID]").val() || null;
			const projectID     = $("[name=billMaterialID] option:selected").attr("projectID") || null;
			const projectCode   = $(`[name="projectCode"]`).val() || null;
			const projectName   = $(`[name="projectName"]`).val() || null;
			const clientName    = $(`[name="clientName"]`).val() || null;
			const clientAddress = $(`[name="clientAddress"]`).val() || null;

			formData.append("employeeID", sessionID);
			formData.append("billMaterialID", billMaterialID);
			formData.append("projectID", projectID);
			formData.append("projectCode", projectCode);
			formData.append("projectName", projectName);
			formData.append("clientName", clientName);
			formData.append("clientAddress", clientAddress);
			formData.append("purchaseRequestReason", $("[name=purchaseRequestReason]").val()?.trim());
			formData.append("purchaseRequestGrandTotal", getCostSummary(true, false));

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("purchaseRequestID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("purchaseRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("purchaseRequestStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = billMaterialID && billMaterialID != "0" ? "Project Phase" : "Materials and Equipment";

				const requestItemID = $(this).attr("requestItemID");
				const inventoryVendorID = $("td [name=itemID] option:selected", this).attr("inventoryVendorID");	
				const itemID          = $("td [name=itemID]", this).val();	
				const itemCode        = $("td [name=itemID] option:selected", this).attr("itemCode") || "";	
				const itemName        = $("td [name=itemID] option:selected", this).text() || "";	
				const itemUom         = $("td [name=itemID] option:selected", this).attr("uom") || "";	
				const itemDescription = $("td [name=itemID] option:selected", this).attr("itemDescription") || "";		
				const brandName       = $("td [name=itemID] option:selected", this).attr("brandName") || "";	
				const itemClassification = $("td [name=itemID] option:selected", this).attr("classificationName") || "";	

				const quantity  = +getNonFormattedAmount($("td [name=quantity]", this).val());	
				const unitcost  = +getNonFormattedAmount($("td .unitcost", this).text());	
				const totalcost = quantity * unitcost;
				const remarks   = $("td [name=remarks]", this).val()?.trim();	

				let fileID   = $("td [name=files]", this).attr("id") || "";
				let file     = fileID ? $(`#${fileID}`)?.[0]?.files?.[0] : "";
				let fileArr  = file?.name?.split(".");
				let filename = file ? file?.name : "";

				formData.append(`items[${i}][requestItemID]`, requestItemID);
				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemCode]`, itemCode);
				formData.append(`items[${i}][itemName]`, itemName?.trim());
				formData.append(`items[${i}][itemDescription]`, itemDescription);
				formData.append(`items[${i}][itemUom]`, itemUom);
				formData.append(`items[${i}][brandName]`, brandName);
				formData.append(`items[${i}][itemClassification]`, itemClassification);
				formData.append(`items[${i}][inventoryVendorID]`, inventoryVendorID);
				formData.append(`items[${i}][categoryType]`, categoryType);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][unitcost]`, unitcost);
				formData.append(`items[${i}][totalcost]`, totalcost);
				formData.append(`items[${i}][remarks]`, remarks);
				formData.append(`items[${i}][filename]`, filename);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);
				if (file) {
					formData.append(`items[${i}][file]`, file, `${i}.${fileArr[1]}`);
				} else {
					const isHadExistingFile = $("td .file .displayfile", this).text().trim().length > 0;
					if (isHadExistingFile) {
						const filename = $("td .file .displayfile .filename", this).text().trim();
						formData.append(`items[${i}][existingFile]`, filename);
					}
				}
			});
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


	// ----- VALIDATE INVENTORY ITEM PRICE LIST -----
	function validateItemPrice() {
		let flag = 0;
		$(`[name="itemID"]`).each(function(i) {
			const itemID = $(this).val();
			const price = getInventoryPreferredPrice(itemID, this);
			if (!price) {
				flag++;
			}
		})
		return flag > 0 ? false : true;
	}
	// ----- END VALIDATE INVENTORY ITEM PRICE LIST -----


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
		const id                    = decryptString($(this).attr("purchaseRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("purchaseRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "save", "0", id);
				data.append("purchaseRequestStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("revisePurchaseRequestID", id);
					data.delete("purchaseRequestID");
				} else {
					data.append("purchaseRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}

				validateItemPrice();
				savePurchaseRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPurchaseRequestData(action, "save", "0", id);
			data.append("purchaseRequestStatus", 0);

			validateItemPrice()
			savePurchaseRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPurchaseRequestData(action, "save", "0", id);
		data.append("purchaseRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("revisePurchaseRequestID", id);
				data.delete("purchaseRequestID");
			} else {
				data.append("purchaseRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		validateItemPrice();
		savePurchaseRequest(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----

	
	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- VALIDATE TABLE -----
	function validateTableItems() {
		let flag = true;
		if ($(`.itemProjectTableBody tr`).length == 1 && $(`.itemTableBody tr`).length == 1) {
			const projectItemID = $(`[name="itemID"][project="true"]`).val();
			const companyItemID = $(`[name="itemID"][]`).val();
			flag = !(projectItemID == "0" && companyItemID == "0");
			// flag = !(projectItemID == companyItemID);
		}

		if (!flag) {
			showNotification("warning2", "Cannot submit form, kindly input valid items.");
		}
		return flag;
	}
	// ----- END VALIDATE TABLE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("purchaseRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_purchase_request");
		const validatePrice = validateItemPrice();
		const validateItems = validateTableItems();
		removeIsValid("#tableRequestItems");

		if (validate && validatePrice && validateItems) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getPurchaseRequestData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.append("revisePurchaseRequestID", id);
					data.delete("purchaseRequestID");
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
					moduleID:                46,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePurchaseRequest(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("purchaseRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		let tableData  = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPurchaseRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                46,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                46,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("purchaseRequestStatus", status);

			savePurchaseRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		$("#modal_purchase_request_content").html(preloader);
		$("#modal_purchase_request .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_purchase_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="purchaseRequestRemarks"
					name="purchaseRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-purchaseRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			purchaseRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		const validate = validateForm("modal_purchase_request");
		if (validate) {
			let tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("purchaseRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("purchaseRequestRemarks", $("[name=purchaseRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                46,
					tableID: 				 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePurchaseRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("purchaseRequestID"));
		let data = new FormData;
		data.append("purchaseRequestID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		savePurchaseRequest(data, "drop", null, pageContent);
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
	const title = "Purchase Request";
	let swalText, swalImg;

	$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("hide");

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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `purchase_request/savePurchaseRequest`,
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
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------