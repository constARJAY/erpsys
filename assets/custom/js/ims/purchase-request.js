$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(46);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase request");
	// ----- END MODULE APPROVER -----


	// ----- GLOBAL VARIABLE - REUSABLE ----- 
	let GLOBAL_INVENTORY_VENDOR_ID = 0;
	let GLOBAL_CLASSIFICATION_TYPE = "";
	let GLOBAL_REQUEST_ITEM_LIST   = [];

	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

	const inventoryVendorList = getTableData(
		`ims_inventory_vendor_tbl`,
		``,
		`inventoryVendorStatus = 1`
	)

	function getInventoryRequestItemList(inventoryVendorID = 0) {
		let result = [];
		if (inventoryVendorID) {
			result = getTableData(
				`ims_inventory_price_list_tbl AS iiplt
					LEFT JOIN ims_inventory_item_tbl AS iitl USING(itemID)
					LEFT JOIN ims_inventory_category_tbl AS iict ON (iitl.categoryID = iict.categoryID)
					LEFT JOIN ims_inventory_classification_tbl AS iict2 ON (iitl.classificationID = iict2.classificationID)
				WHERE 
					iiplt.inventoryVendorID = ${inventoryVendorID}
					AND iiplt.preferred = 1 
					AND iitl.itemStatus = 1
				GROUP BY itemID`,
				`itemID, itemCode, itemName, itemDescription, brandName, categoryName, classificationName, unitOfMeasurementID, vendorCurrentPrice AS itemPrice, itemImage`);
		}
		return result;
	}

	function getInventoryAssetList(inventoryVendorID = 0) {
		let result = [];
		if (inventoryVendorID) {
			result = getTableData(
				`ims_inventory_price_list_tbl AS iiplt
					LEFT JOIN ims_inventory_asset_tbl AS iiat USING(assetID)
					LEFT JOIN ims_inventory_category_tbl AS iict ON (iiat.categoryID = iict.categoryID)
					LEFT JOIN ims_inventory_classification_tbl AS iict2 ON (iiat.classificationID = iict2.classificationID)
				WHERE 
					iiplt.inventoryVendorID = ${inventoryVendorID}
					AND iiplt.preferred = 1 
					AND iiat.assetStatus = 1
				GROUP BY assetID`,
				`assetID, assetCode, assetName, assetDescription, brandName, categoryName, classificationName, unitOfMeasurementID, vendorCurrentPrice AS assetPrice, assetImage`);
		}
		return result;
	}
	// ----- END GLOBAL VARIABLE - REUSABLE ----- 


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
					if (employeeID == null || employeeID == 0) {
						if (purchaseRequestStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (purchaseRequestStatus == 0 || purchaseRequestStatus == 4) {
							isAllowed = false;
						}
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
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 150 },
				{ targets: 4,  width: 150 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 300 },
				{ targets: 8,  width: 150 },
				{ targets: 9,  width: 150 },
			],
		};

		const isReadOnly = $("#tableRequestItems").attr("isReadOnly") == "true";
		let bodyColumnDefs = isReadOnly ? 
			[
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 100 },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 250 },
			] : 
			[
				{ targets: 0,  width: 50  },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 180 },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 100 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 150 },
				{ targets: 8,  width: 250 },
			];
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
			columnDefs:     bodyColumnDefs,
		};

		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));
		activateDatatable("tableRequestItems", bodyOptions);
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
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated",
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
					<th>Project</th>
					<th>Client</th>
					<th>Vendor</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		purchaseRequestData.map((item) => {
			let {
				purchaseRequestID,
				purchaseRequestCode,
				timelineBuilderID,
				bidRecapID,
				bidRecapCode,
				employeeID,
				fullname,
				projectCode,
				projectName,
				clientCode,
				clientName,
				vendorCode,
				vendorName,
				approversID,
				approversDate,
				approversStatus,
				purchaseRequestReason,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt
			} = item;

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
					<td>${purchaseRequestCode}</td>
					<td>${fullname || "-"}</td>
					<td>
						<div>
							${bidRecapCode || '-'}
						</div>
						<small style="color:#848482;">${purchaseRequestReason || ''}</small>
					</td>
					<td>
						<div>
							${projectCode || '-'}
						</div>
						<small style="color:#848482;">${projectName || ''}</small>
					</td>
					<td>
						<div>
							${clientCode || '-'}
						</div>
						<small style="color:#848482;">${clientName || ''}</small>
					</td>
					<td>
						<div>
							${vendorCode || '-'}
						</div>
						<small style="color:#848482;">${vendorName || ''}</small>
					</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(purchaseRequestStatus, true)}
					</td>
					<td>${purchaseRequestRemarks || "-"}</td>
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
		let purchaseRequestData = getTableData(
			`ims_purchase_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated",
			`imrt.employeeID = 0 OR imrt.employeeID IS NULL OR imrt.employeeID = ${sessionID}`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		/*
		 ----- ***** STATUS ***** -----
			0 - PENDING
			1 - FOR APPROVAL
			2 - APPROVED
			3 - REJECTED
			4 - CANCELLED
			5 - DROPPED [IF NEEDED]
		 ----- ***** END STATUS ***** -----
		*/

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
					<th>Project</th>
					<th>Client</th>
					<th>Vendor</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		purchaseRequestData.map((item) => {
			let {
				purchaseRequestID,
				purchaseRequestCode,
				timelineBuilderID,
				bidRecapID,
				bidRecapCode,
				employeeID,
				fullname,
				projectCode,
				projectName,
				clientCode,
				clientName,
				vendorCode,
				vendorName,
				approversID,
				approversDate,
				approversStatus,
				purchaseRequestReason,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 || purchaseRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseRequestStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseRequestID )}">
                <td>${purchaseRequestCode}</td>
                <td>${fullname || "-"}</td>
				<td>
					<div>
						${bidRecapCode || '-'}
					</div>
					<small style="color:#848482;">${purchaseRequestReason || ''}</small>
				</td>
				<td>
					<div>
						${projectCode || '-'}
					</div>
					<small style="color:#848482;">${projectName || ''}</small>
				</td>
				<td>
					<div>
						${clientCode || '-'}
					</div>
					<small style="color:#848482;">${clientName || ''}</small>
				</td>
				<td>
					<div>
						${vendorCode || '-'}
					</div>
					<small style="color:#848482;">${vendorName || ''}</small>
				</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseRequestStatus, true)}
                </td>
				<td>${purchaseRequestRemarks || "-"}</td>
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
				revisePurchaseRequestID,
				purchaseRequestID     = "",
				purchaseRequestCode   = "",
				purchaseRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null || employeeID === sessionID) {
				if (purchaseRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						purchaseRequestID="${encryptString(purchaseRequestID)}"
						purchaseRequestCode="${purchaseRequestCode}"
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
							purchaseRequestCode="${purchaseRequestCode}"
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
							purchaseRequestCode="${purchaseRequestCode}"
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
							purchaseRequestCode="${purchaseRequestCode}"
							status="${purchaseRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (purchaseRequestStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	purchaseRequestID="${encryptString(purchaseRequestID)}"
					// 	purchaseRequestCode="${purchaseRequestCode}"
					// 	status="${purchaseRequestStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (purchaseRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(purchaseRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							purchaseRequestCode="${purchaseRequestCode}"
							status="${purchaseRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (purchaseRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_purchase_request_tbl`,
						`revisePurchaseRequestID`,
						`revisePurchaseRequestID = ${revisePurchaseRequestID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { revisePurchaseRequestID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`ims_purchase_request_tbl`,
							`revisePurchaseRequestID`,
							`purchaseRequestStatus <> 3 AND purchaseRequestStatus <> 4 AND revisePurchaseRequestID = ${reviseID}`
						);
					}

					if (!isDocumentRevised(purchaseRequestID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							purchaseRequestCode="${purchaseRequestCode}"
							status="${purchaseRequestStatus}"
							cancel="true">
							<i class="fas fa-clone"></i> Revise
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
							purchaseRequestCode="${purchaseRequestCode}">
							<i class="fas fa-paper-plane"></i> Approve
						</button>
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							purchaseRequestCode="${purchaseRequestCode}">
							<i class="fas fa-ban"></i> Deny
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


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {

		$(`#tableRequestItems tbody tr`).each(function(i) {
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
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions(executeOnce = false) {
		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		let elementID = [];

		$("[name=inventoryItemID]").each(function() {
			const itemID = $(this).val();
			$parent = $(this).closest("tr");
			itemIDArr.push(itemID);
			elementID.push(`#${this.id}`);
			if (itemID && itemID != null && !executeOnce) {
				$(this).trigger("change");
			}
		}) 

		elementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [...GLOBAL_REQUEST_ITEM_LIST];
		
			if (GLOBAL_CLASSIFICATION_TYPE == "Items") {
				itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == itemIDArr[index]).map(item => {
					html += `
					<option 
						value              = "${item.itemID}" 
						itemCode           = "${item.itemCode}"
						itemDescription    = "${item.itemDescription}"
						itemCategory       = "${item.categoryName}"
						itemBrand          = "${item.brandName}"
						itemClassification = "${item.classificationName}"
						itemUom            = "${item.unitOfMeasurementID}"
						itemPrice          = "${item.itemPrice}"
						itemImage          = "${item.itemImage || ""}"
						${item.itemID == itemIDArr[index] && "selected"}>
						${item.itemName}
					</option>`;
				});
			} else if (GLOBAL_CLASSIFICATION_TYPE == "Assets") {
				itemList.filter(item => !itemIDArr.includes(item.assetID) || item.assetID == itemIDArr[index]).map(item => {
					html += `
					<option 
						value              = "${item.assetID}" 
						itemCode           = "${item.assetCode}"
						itemDescription    = "${item.assetDescription}"
						itemCategory       = "${item.categoryName}"
						itemBrand          = "${item.brandName}"
						itemClassification = "${item.classificationName}"
						itemUom            = "${item.unitOfMeasurementID}"
						itemPrice          = "${item.assetPrice}"
						itemImage          = "${item.assetImage || ""}"
						${item.assetID == itemIDArr[index] && "selected"}>
						${item.assetName}
					</option>`;
				});
			}
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryRequestItem(id = null, display = true) {
		let label = GLOBAL_CLASSIFICATION_TYPE == "Items" ? "Select Item Name" : "Select Asset Name";
        let html  = `<option selected disabled>${label}</option>`;

		let itemIDArr = [];
		$(`[name=inventoryItemID]`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		// let itemList = [...inventoryItemList];
		let itemList = [...GLOBAL_REQUEST_ITEM_LIST];
		itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {

			if (GLOBAL_CLASSIFICATION_TYPE == "Items") {
				html += `
				<option 
					value              = "${item.itemID}" 
					itemCode           = "${item.itemCode}"
					itemDescription    = "${item.itemDescription}"
					itemCategory       = "${item.categoryName}"
					itemBrand          = "${item.brandName}"
					itemClassification = "${item.classificationName}"
					itemUom            = "${item.unitOfMeasurementID}"
					itemPrice          = "${item.itemPrice}"
					itemImage          = "${item.itemImage || ""}"
					${item.itemID == id && "selected"}>
					${item.itemName}
				</option>`;
			} else if (GLOBAL_CLASSIFICATION_TYPE == "Assets") {
				html += `
				<option 
					value              = "${item.assetID}" 
					itemCode           = "${item.assetCode}"
					itemDescription    = "${item.assetDescription}"
					itemCategory       = "${item.categoryName}"
					itemBrand          = "${item.brandName}"
					itemClassification = "${item.classificationName}"
					itemUom            = "${item.unitOfMeasurementID}"
					itemPrice          = "${item.assetPrice}"
					itemImage          = "${item.assetImage || ""}"
					${item.assetID == id && "selected"}>
					${item.assetName}
				</option>`;
			}
        })
        return display ? html : itemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET INVENTORY VENDOR LIST -----
	function getInventoryVendorList(id = null, readOnly = false, vendorName = "") {
		let html = `
		<option 
			value                = ""
			vendorCode           = "-"
			vendorName           = "-"
			vendorContactDetails = "-"
			vendorContactPerson  = "-"
			vendorAddress        = "-"
			vendorVatable        = "0"
			selected 
			disabled>
			${readOnly ? (vendorName || "-") : "Select Vendor Name"}
		</option>`;
        html += inventoryVendorList.map(vendor => {
			const { 
				inventoryVendorID,
				inventoryVendorCode,
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
			} = vendor;

			let address        = `${inventoryVendorUnit && titleCase(inventoryVendorUnit)+", "}${inventoryVendorBuilding && inventoryVendorBuilding +", "}${inventoryVendorBarangay && titleCase(inventoryVendorBarangay)+", "}${inventoryVendorCity && titleCase(inventoryVendorCity)+", "}${inventoryVendorProvince && titleCase(inventoryVendorProvince)+", "}${inventoryVendorCountry && titleCase(inventoryVendorCountry)+", "}${inventoryVendorZipCode && titleCase(inventoryVendorZipCode)}`;
			let contactDetails = `${inventoryVendorMobile} / ${inventoryVendorTelephone}`;

            return `
            <option 
                value                = "${inventoryVendorID}" 
                vendorCode           = "${inventoryVendorCode}"
				vendorName           = "${inventoryVendorName}"
				vendorContactDetails = "${contactDetails}"
				vendorContactPerson  = "${inventoryVendorPerson}"
				vendorAddress        = "${address}"
				vendorVatable        = "${inventoryVendorVAT}"
                ${inventoryVendorID == id && "selected"}>
                ${inventoryVendorName}
            </option>`;
        }).join("")
        return html;
	}
	// ----- END GET INVENTORY VENDOR LIST -----


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
							$(`[name="inventoryItemID"]`).each(function(i, obj) {
								let inventoryItemID = $(this).val();
								$(this).html(getInventoryRequestItem(inventoryItemID));
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


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		$("#discountType").trigger("change");

		let total = getTotalAmount();

		$(`#total`).text(formatAmount(total, true));

		$("#discount").attr("max", total);
		const discount = getNonFormattedAmount($("#discount").val());
		let totalAmount = total - discount;
		const discountType = $(`[name="discountType"]`).val();
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
			$("#discount").attr("max", "100");
		}

		$("#totalAmount").html(formatAmount(totalAmount));

		const isVatable = $(`[name="inventoryVendorID"]`).length > 0 ? 
			$(`[name="inventoryVendorID"] option:selected`).attr("vendorVatable") == "1" : false;
		let vat = 0, vatSales = 0;
		if (isVatable) {
			vatSales = totalAmount / 1.12;
			vat      = totalAmount - vatSales;
		}

		$("#vatSales").html(formatAmount(vatSales));
		$(`[name="vat"]`).val(vat);

		const totalVat = totalAmount;
		$("#totalVat").html(formatAmount(totalVat));

		const lessEwt          = getNonFormattedAmount($("[name=lessEwt]").val());
		const grandTotalAmount = totalVat - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	}
	// ----- END UPDATE TOTAL AMOUNT -----


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


	// ----- SELECT INVENTORY VALIDATION -----
	$(document).on("change", `[name="billMaterialID"]`, function() {
		const billMaterialID = $(this).val();
		
		const timelineBuilderID = $(`option:selected`, this).attr("timelineBuilderID") || "-";
		const projectCode     = $(`option:selected`, this).attr("projectCode") || "-";
		const projectName     = $(`option:selected`, this).attr("projectName") || "-";
		const projectCategory = $(`option:selected`, this).attr("projectCategory") || "-";
		const clientName      = $(`option:selected`, this).attr("clientName") || "-";
		const clientAddress   = $(`option:selected`, this).attr("clientAddress") || "-";

		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectName"]`).val(projectName);
		$(`[name="projectCategory"]`).val(projectCategory);
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
    $(document).on("change", "[name=inventoryItemID]", function() {
		const inventoryItemID    = $(this).val();
        const itemCode           = $('option:selected', this).attr("itemCode");
        const itemName           = $('option:selected', this).text();
        const itemUom            = $('option:selected', this).attr("itemUom");
        const itemCategory       = $('option:selected', this).attr("itemCategory");
        const itemBrand          = $('option:selected', this).attr("itemBrand");
        const itemClassification = $('option:selected', this).attr("itemClassification");
        const itemPrice          = +$('option:selected', this).attr("itemPrice");

		$parent = $(this).closest("tr");

		const quantity  = $parent.find(`[name="itemQuantity"]`).val();
		const totalCost = itemPrice * quantity;

		$parent.find(`.itemCode`).text(itemCode);
		$parent.find(`.itemName .brandname`).text(itemBrand);
		$parent.find(`.itemClassification .classification`).text(itemClassification);
		$parent.find(`.itemClassification .category`).text(itemCategory);
		$parent.find(`.itemUom`).text(itemUom);
		$parent.find(`.itemUnitcost`).text(formatAmount(itemPrice, true));
		$parent.find(`.itemTotalcost`).text(formatAmount(totalCost, true));

		updateInventoryItemOptions(true);
    })
    // ----- END SELECT ITEM NAME -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", `[name="itemQuantity"]`, function() {
		$parent = $(this).closest("tr");
		const quantity  = getNonFormattedAmount($(this).val()) || 0;
		const unitCost  = getNonFormattedAmount($parent.find(`.itemUnitcost`).text()) || 0;
		const totalCost = unitCost * quantity;
		$parent.find(`.itemTotalcost`).text(formatAmount(totalCost, true));

		updateTotalAmount();
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=lessEwt]", function() {
		const lessEwt     = getNonFormattedAmount($(this).val());
		const totalAmount = getNonFormattedAmount($("#totalAmount").text());

		const grandTotalAmount = totalAmount - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----


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
		const classification = $(this).attr("classification");
		const row = getTableRow(classification);
		$(`#tableRequestItems tbody`).append(row);
		updateTableItems();
		updateInventoryItemOptions();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- GET COST SUMMARY DISPLAY -----
	function getCostSummaryDisplay(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {

		readOnly = isRevise ? false : readOnly;
		let disabled = readOnly ? "disabled" : "";

		let {
			bidRecapID            = "",
			purchaseRequestID     = "",
			discountType          = "amount",
			total                 = 0,
			discount              = 0,
			totalAmount           = 0,
			vatSales              = 0,
			vat                   = 0,
			totalVat              = 0,
			lessEwt               = 0,
			grandTotalAmount      = 0,
			purchaseRequestStatus = false,
		} = data && data[0];

		let html = "", discountDisplay = "";
		if (purchaseRequestStatus && purchaseRequestStatus != "0" && purchaseRequestStatus != "4" && !isRevise) {
			discountDisplay = discountType == "percent" ? `
			<div class="py-0 text-dark border-bottom d-flex justify-content-between">
				<div>(</div>
				<div>${formatAmount(discount)} %)</div>
			</div>` :
			`<div class="py-0 text-dark border-bottom d-flex justify-content-between">
				<div>(</div>
				<div>${formatAmount(discount)})</div>
			</div>`;
		} else {
			if (purchaseRequestStatus == "4" && !isFromCancelledDocument) {
				discountDisplay = discountType == "percent" ? `
				<div class="py-0 text-dark border-bottom d-flex justify-content-between">
					<div>(</div>
					<div>${formatAmount(discount)} %)</div>
				</div>` :
				`<div class="py-0 text-dark border-bottom d-flex justify-content-between">
					<div>(</div>
					<div>${formatAmount(discount)})</div>
				</div>`;
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
					<span class="d-flex align-items-center ml-2">(</span>
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
					<span class="d-flex align-items-center">)</span>
				</div>`;
			}
		}
		let discountStyle = readOnly ? `style="padding-left: 4.5rem;"` : "";

		html = `
		<div class="row py-2">
			<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pb-2 pt-3">
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Total: </div>
					<div class="col-6 col-lg-5 text-right text-dark"
						style="font-size: 1.05em"
						id="total">
						${formatAmount(total, true)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left align-self-center">Discount: </div>
					<div class="col-6 col-lg-5 text-right text-dark align-self-center" ${discountStyle}>
						${discountDisplay}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Total Amount:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						id="totalAmount"
						style="font-size: 1.05em">
						${formatAmount(totalAmount)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Vatable Sales:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						id="vatSales"
						style="font-size: 1.05em">
						${formatAmount(vatSales)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Vat 12%:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						style="padding-left: 5rem;">
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
						${formatAmount(totalVat)}
					</div>
				</div>
				<div class="row" style="font-size: 1.1rem">
					<div class="col-6 col-lg-7 text-left">Less EWT:</div>
					<div class="col-6 col-lg-5 text-right text-dark"
						style="padding-left: 4.5rem;">
						<div class="input-group">
							<span class="d-flex align-items-center ml-2">(</span>
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
							<span class="d-flex align-items-center">)</span>
						</div>
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


	// ----- SELECT DISCOUNT TYPE -----
	$(document).on("change", `[name="discountType"]`, function() {
		const discountType = $(this).val();
		const totalAmount  = getNonFormattedAmount($(`#total`).text()) || 0;
		$(`[name="discount"]`).val("0").trigger("keyup");
		if (discountType == "percent") {
			$(`[name="discount"]`).attr("max", "100");
			$(`[name="discount"]`).attr("maxlength", "6");
		} else {
			$(`[name="discount"]`).attr("max", totalAmount);
			$(`[name="discount"]`).attr("maxlength", formatAmount(totalAmount, true).length);
		}
		initAmount("#discount");
	})
	// ----- END SELECT DISCOUNT TYPE -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=discount]", function() {
		const discount = getNonFormattedAmount($(this).val()) || 0;
		const total    = getNonFormattedAmount($("#total").text()) || 0;
		
		let totalAmount = total - discount;
		const discountType = $(`[name="discountType"]`).val();
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}
		$("#totalAmount").html(formatAmount(totalAmount));

		const isVatable = $(`[name="inventoryVendorID"]`).length > 0 ? 
			$(`[name="inventoryVendorID"] option:selected`).attr("vendorVatable") == "1" : false;
		let vat = 0, vatSales = 0;
		if (isVatable) {
			vatSales = totalAmount / 1.12;
			vat      = totalAmount - vatSales;
		}

		$("#vatSales").html(formatAmount(vatSales));
		$(`[name="vat"]`).val(vat);

		const totalVat = totalAmount;
		$("#totalVat").html(formatAmount(totalVat));

		const lessEwt          = getNonFormattedAmount($("[name=lessEwt]").val());
		const grandTotalAmount = totalVat - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----



	// ----- GET TABLE ROW -----
	function getTableRow(classification = "", item = {}, readOnly = false) {
		let html = "";

		let checkBoxHeader = !readOnly ? `
		<td class="text-center">
			<input type="checkbox" class="checkboxrow">
		</td>` : "";

		if (classification == "Items") {

			let {
				requestItemID,
				itemID,
				itemCode,
				itemBrandName,
				itemName,
				itemClassification,
				itemCategory,
				itemUom,
				itemDescription,
				files,
				forPurchase,
				unitCost,
				totalCost,
				remarks,
			} = item;

			let itemNameDisplay = readOnly ? (itemName ? (itemName != 'Select Item Name' ? itemName : "-") : "-") : `
				<select class="form-control validate select2 w-100"
					name="inventoryItemID"         
					required>
					${getInventoryRequestItem(itemID)}
				</select>
				<div class="d-block invalid-feedback"></div>`;
			let itemQuantityDisplay = readOnly ? (forPurchase || "-") : `
				<input 
					type="text" 
					class="form-control input-quantity text-center"
					min="0.01" 
					data-allowcharacters="[0-9]" 
					max="999999999"
					name="itemQuantity" 
					minlength="1" 
					maxlength="20" 
					autocomplete="off"
					value="${forPurchase || "0"}"
					required>
				<div class="d-block invalid-feedback"></div>`;
			let itemRemarksDisplay = readOnly ? (remarks || "-") : `
				<textarea 
					rows="2" 
					style="resize: none" 
					class="form-control validate" 
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="1"
					maxlength="100"
					name="itemRemarks">${remarks || ""}</textarea>
				<div class="d-block invalid-feedback"></div>`;

			html = `
			<tr requestItemAssetID="${requestItemID}">
				${checkBoxHeader}
				<td class="itemCode">${itemCode || "-"}</td>
				<td class="itemName">
					<div class="form-group mb-0" style="width: 180px;">
						${itemNameDisplay}
					</div>
					<small class="brandname">${itemBrandName || ""}</small>
				</td>
				<td class="itemClassification">
					<div class="classification">${itemClassification || "-"}</div>
					<small class="category">${itemCategory || ""}</small>
				</td>
				<td class="itemUom">${itemUom || "-"}</td>
				<td class="text-center itemQuantity">
					<div class="form-group mb-0">
						${itemQuantityDisplay}
					</div>
				</td>
				<td class="text-right itemUnitcost">${unitCost ? formatAmount(unitCost, true) : "-"}</td>
				<td class="text-right itemTotalcost">${totalCost ? formatAmount(totalCost, true) : "-"}</td>
				<td class="itemRemarks">
					<div class="form-group mb-0">
						${itemRemarksDisplay}
					</div>
				</td>
			</tr>`;

		} else if (classification == "Assets") {

			let {
				requestAssetID,
				assetID,
				assetCode,
				assetBrandName,
				assetName,
				assetClassification,
				assetCategory,
				assetUom,
				assetDescription,
				files,
				forPurchase,
				unitCost,
				totalCost,
				remarks,
			} = item;

			let assetNameDisplay = readOnly ? (assetName ? (assetName != 'Select Item Name' ? assetName : "-") : "-") : `
				<select class="form-control validate select2 w-100"
					name="inventoryItemID"         
					required>
					${getInventoryRequestItem(assetID)}
				</select>
				<div class="d-block invalid-feedback"></div>`;
			let assetQuantityDisplay = readOnly ? (forPurchase || "-") : `
				<input 
					type="text" 
					class="form-control input-quantity text-center"
					min="0.01" 
					data-allowcharacters="[0-9]" 
					max="999999999"
					name="itemQuantity" 
					minlength="1" 
					maxlength="20" 
					autocomplete="off"
					value="${forPurchase || "0"}"
					required>
				<div class="d-block invalid-feedback"></div>`;
			let assetRemarksDisplay = readOnly ? (remarks || "-") : `
				<textarea 
					rows="2" 
					style="resize: none" 
					class="form-control validate" 
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="1"
					maxlength="100"
					name="itemRemarks">${remarks || ""}</textarea>
				<div class="d-block invalid-feedback"></div>`;

			html = `
			<tr requestItemAssetID="${requestAssetID}">
				${checkBoxHeader}
				<td class="itemCode">${assetCode || "-"}</td>
				<td class="itemName">
					<div class="form-group mb-0" style="width: 180px;">
						${assetNameDisplay}
					</div>
					<small class="brandname">${assetBrandName || ""}</small>
				</td>
				<td class="itemClassification">
					<div class="classification">${assetClassification || "-"}</div>
					<small class="category">${assetCategory || ""}</small>
				</td>
				<td class="itemUom">${assetUom || "-"}</td>
				<td class="text-center assetQuantity">
					<div class="form-group mb-0">
						${assetQuantityDisplay}
					</div>
				</td>
				<td class="text-right itemUnitcost">${unitCost ? formatAmount(unitCost, true) : "-"}</td>
				<td class="text-right itemTotalcost">${totalCost ? formatAmount(totalCost, true) : "-"}</td>
				<td class="itemRemarks">
					<div class="form-group mb-0">
						${assetRemarksDisplay}
					</div>
				</td>
			</tr>`;

		}
		
		return html;
	}
	// ----- END GET TABLE ROW -----


	// ----- GET TABLE REQUEST ITEMS -----
	function getTableRequestItems(inventoryVendorID = 0, classification = "", data = false, readOnly = false) {
		let html = "";

		if (classification == "Items") {
			GLOBAL_REQUEST_ITEM_LIST = getInventoryRequestItemList(inventoryVendorID);
		} else if (classification == "Assets") {
			GLOBAL_REQUEST_ITEM_LIST = getInventoryAssetList(inventoryVendorID);
		}

		let {
			purchaseRequestID,
			bidRecapID,
			purchaseRequestClassification
		} = data && data[0];
		readOnly = bidRecapID ? true : readOnly;

		let requestItems = [];
		if (purchaseRequestID) {
			if (classification == "Items") {
				if (bidRecapID) {
					// SUBJECT TO CHANGE
					requestItems = getTableData(
						`ims_request_items_tbl 
						WHERE purchaseRequestID = ${purchaseRequestID}
						AND bidRecapID = ${bidRecapID}
						AND purchaseOrderID IS NULL`); 
				} else {
					requestItems = getTableData(
						`ims_request_items_tbl 
						WHERE purchaseRequestID = ${purchaseRequestID}
						AND materialRequestID IS NULL
						AND inventoryValidationID IS NULL
						AND bidRecapID IS NULL
						AND purchaseOrderID IS NULL`);
				}
			} else if (classification == "Assets") {
				if (bidRecapID) {
					// SUBJECT TO CHANGE
					requestItems = getTableData(
						`ims_request_assets_tbl 
						WHERE purchaseRequestID = ${purchaseRequestID}
						AND bidRecapID = ${bidRecapID}
						AND purchaseOrderID IS NULL`); 
				} else {
					requestItems = getTableData(
						`ims_request_assets_tbl 
						WHERE purchaseRequestID = ${purchaseRequestID}
						AND materialRequestID IS NULL
						AND inventoryValidationID IS NULL
						AND bidRecapID IS NULL
						AND purchaseOrderID IS NULL`);
				}
			}
		}

		let noteItemDisplay = !bidRecapID ? `
		<b class="text-warning">NOTE: </b>
		<span>All available items are based on the item price list's preferred vendor.</span>` : "";
		let noteAssetDisplay = !bidRecapID ? `
		<b class="text-warning">NOTE: </b>
		<span>All available assets are based on the asset price list's preferred vendor.</span>` : "";

		let tableRequestItemsHTML = "";
		if (requestItems.length > 0) {
			console.log(readOnly);
			requestItems.map(item => {
				tableRequestItemsHTML += `${getTableRow(classification, item, readOnly)}`;
			})
		} else {
			tableRequestItemsHTML = `${getTableRow(classification)}`;
		}

		let checkBoxHeader = readOnly ? "" : `
			<th class="text-center">
				<input type="checkbox" class="checkboxall">
			</th>`;

		if (inventoryVendorID && classification) {

			let buttonRowDisplay = readOnly ? "" : `
				<div class="d-flex flex-column justify-content-start text-left my-2">
					<div>
						<button type="button" 
							class="btn btn-primary btnAddRow" 
							id="btnAddRow"
							classification="${classification}">
							<i class="fas fa-plus-circle"></i> Add Row
						</button>
						<button type="button" 
							class="btn btn-danger btnDeleteRow" 
							id="btnDeleteRow"  
							classification="${classification}"
							disabled>
							<i class="fas fa-minus-circle"></i> Delete Row/s
						</button>
					</div>
				</div>`;

			if (classification == "Items") { 
				html = `
				<div class="card">
					<div class="card-header bg-primary text-white">
						<div class="row align-selft-center">
							<div class="col-md-6 col-sm-12 text-left">
								<h5 style="font-weight: bold;
									letter-spacing: 0.05rem;">ITEMS (FOR PURCHASE)</h5>
							</div>
							<div class="col-md-6 col-sm-12 text-right"></div>
						</div>
					</div>
					<div class="card-body">
						<div class="w-100">
							<div class="text-left">
								${noteItemDisplay}
							</div>

							<table class="table table-hover" 
								id="tableRequestItems" 
								isReadOnly="${readOnly}">
								<thead>
									<tr>
										${checkBoxHeader}
										<th>Item Code</th>
										<th>Item Name ${!readOnly ? "<code>*</code>" : ""}</th>
										<th>Item Classification</th>
										<th>UOM</th>
										<th>Quantity ${!readOnly ? "<code>*</code>" : ""}</th>
										<th>Unit Cost</th>
										<th>Total Amount</th>
										<th>Remarks</th>
									</tr>
								</thead>
								<tbody>
									${tableRequestItemsHTML}
								</tbody>
							</table>
	
							${buttonRowDisplay}
						</div>
					</div>
				</div>`;
			} else if (classification == "Assets") {
				html = `
				<div class="card">
					<div class="card-header bg-primary text-white">
						<div class="row align-items-center">
							<div class="col-md-6 col-sm-12 text-left">
								<h5 style="font-weight: bold;
									letter-spacing: 0.05rem;">ASSETS (FOR PURCHASE)</h5>
							</div>
							<div class="col-md-6 col-sm-12 text-right"></div>
						</div>
					</div>
					<div class="card-body">
						<div class="w-100">
							<div class="text-left">
								${noteAssetDisplay}
							</div>

							<table class="table table-hover" 
								id="tableRequestItems" 
								isReadOnly="${readOnly}">
								<thead>
									<tr>
										${checkBoxHeader}
										<th>Asset Code</th>
										<th>Asset Name ${!readOnly ? "<code>*</code>" : ""}</th>
										<th>Asset Classification</th>
										<th>UOM</th>
										<th>Quantity ${!readOnly ? "<code>*</code>" : ""}</th>
										<th>Unit Cost</th>
										<th>Total Cost</th>
										<th>Remarks</th>
									</tr>
								</thead>
								<tbody>
									${tableRequestItemsHTML}
								</tbody>
							</table>
	
							${buttonRowDisplay}
						</div>
					</div>
				</div>`;
			}
		}

		return html;
	}
	// ----- END GET TABLE REQUEST ITEMS -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			purchaseRequestID,
			purchaseRequestCode,
			revisePurchaseRequestID,
			revisePurchaseRequestCode,
			timelineBuilderID,
			bidRecapID,
			bidRecapCode,
			employeeID,
			fullname,
			projectCode,
			projectName,
			projectCategory,
			clientCode,
			clientName,
			clientAddress,
			inventoryVendorID,
			vendorCode,
			vendorName,
			vendorContactPerson,
			vendorContactDetails,
			vendorAddress,
			approversID,
			approversDate,
			approversStatus,
			purchaseRequestClassification,
			paymentTerms,
			shippingTerm,
			shippingDate,
			purchaseRequestReason,
			purchaseRequestStatus,
			purchaseRequestRemarks,
			submittedAt,
			createdAt
		} = data && data[0];

		GLOBAL_INVENTORY_VENDOR_ID = inventoryVendorID;
		GLOBAL_CLASSIFICATION_TYPE = purchaseRequestClassification;

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
		$("#btnBack").attr("purchaseRequestCode", purchaseRequestCode);

		let disabled  = readOnly ? "disabled" : "";
		let disabled2 = bidRecapID ? "disabled" : "";
		let button    = formButtons(data, isRevise, isFromCancelledDocument);
		let tableReadOnly = disabled || disabled2 ? true : false;

		let reviseDocumentNo    = isRevise ? purchaseRequestID : revisePurchaseRequestID;
		let documentHeaderClass = isRevise || revisePurchaseRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePurchaseRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePurchaseRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${(revisePurchaseRequestCode || (isRevise && purchaseRequestCode)) || "---"}
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
							${purchaseRequestID && !isRevise ? purchaseRequestCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${purchaseRequestStatus && !isRevise ? getStatusStyle(purchaseRequestStatus, true) : "---"}
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

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
					<input type="text"
						name="bidRecapID"
						class="form-control validate"
						disabled
						value="${bidRecapCode || "-"}">
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

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" 
						class="form-control" 
						name="clientCode" 
						disabled 
						value="${clientCode || "-"}">
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" 
						class="form-control" 
						name="clientName" 
						disabled 
						value="${clientName || "-"}">
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
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
                    <label>Vendor Code</label>
                    <input type="text" 
						class="form-control" 
						name="vendorCode" 
						disabled 
						value="${vendorCode || "-"}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Vendor Name ${!disabled && !disabled2 ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="inventoryVendorID"
						id="inventoryVendorID"
						style="width: 100%"
						required
						${disabled || disabled2}>
						${getInventoryVendorList(inventoryVendorID, readOnly, vendorName)}
					</select>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Vendor Contact Person</label>
                    <input type="text" 
						class="form-control" 
						name="vendorContactPerson" 
						disabled 
						value="${vendorContactPerson || "-"}">
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Vendor Contact Details</label>
                    <input type="text" 
						class="form-control" 
						name="vendorContactDetails" 
						disabled 
						value="${vendorContactDetails || "-"}">
                </div>
            </div>

            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Vendor Address</label>
                    <input type="text" 
						class="form-control" 
						name="vendorAddress" 
						disabled 
						value="${vendorAddress || "-"}">
                </div>
            </div>

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
					<label>Classification Type ${!disabled && !disabled2 ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 validate"
						name="purchaseRequestClassification"
						id="purchaseRequestClassification"
						style="width: 100%"
						required
						${disabled || disabled2}>
						<option selected disabled>${!disabled || !disabled2 ? "Select Classification Type" : "-"}</option>
						<option value="Items" ${purchaseRequestClassification == "Items" ? "selected" : ""}>Items</option>
						<option value="Assets" ${purchaseRequestClassification == "Assets" ? "selected" : ""}>Assets</option>
					</select>
					<div class="d-block invalid-feedback" id="invalid-purchaseRequestClassification"></div>
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
					<label>Shipping Term ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 validate"
						name="shippingTerm"
						id="shippingTerm"
						style="width: 100%"
						required
						${disabled}>
						<option selected disabled>${!disabled ? "Select Shipping Term" : "-"}</option>
						<option value="Meet-up" ${shippingTerm == "Meet-up" ? "selected" : ""}>Meet-up</option>
						<option value="Delivery" ${shippingTerm == "Delivery" ? "selected" : ""}>Delivery</option>
					</select>
					<div class="d-block invalid-feedback" id="invalid-shippingTerm"></div>
                </div>
            </div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Shipping Date ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="button" 
						class="form-control validate daterange text-left" 
						name="shippingDate" 
						id="shippingDate"
						required
						value="${moment(shippingDate || dateToday()).format("MMMM DD, YYYY")}"
						${disabled}>
					<div class="d-block invalid-feedback" id="invalid-shippingDate"></div>
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
                    <label>Description ${!disabled && !disabled2 ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="purchaseRequestReason"
                        name="purchaseRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled || disabled2}>${purchaseRequestReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseRequestReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-4" id="tableRequestItemsParent">
                ${getTableRequestItems(inventoryVendorID, purchaseRequestClassification, data, tableReadOnly)}
            </div>

			<div class="col-12" id="costSummaryDisplay">
				${getCostSummaryDisplay(data, readOnly, isRevise, isFromCancelledDocument)}
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
			
			updateTableItems();
			updateInventoryItemOptions();

			initAmount("#discount");
			initAmount("#lessEwt");
			initAmount("#vat");

			$(`[name="discount" ]`).trigger("keyup");

			const disablePreviousDateOptions = {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				minDate: moment(new Date).format("MMMM DD, YYYY"),
				startDate: moment(shippingDate || new Date),
			}
			initDateRangePicker("#shippingDate", disablePreviousDateOptions);

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
		}, 300);
	}
	// ----- END FORM CONTENT -----


	// ----- GET TOTAL AMOUNT -----
	function getTotalAmount() {
		let total = 0;
		$(`.itemTotalcost`).each(function(i) {
			total += +getNonFormattedAmount($(this).text()) || 0;
		})
		return total;
	}
	// ----- END GET TOTAL AMOUNT -----


	// ----- DISPLAY TABLE REQUEST ITEMS -----
	function displayTableRequestItems() {
		if (GLOBAL_INVENTORY_VENDOR_ID && GLOBAL_CLASSIFICATION_TYPE) {
			$("#tableRequestItemsParent").html(preloader);
			setTimeout(() => {
				let html = getTableRequestItems(GLOBAL_INVENTORY_VENDOR_ID, GLOBAL_CLASSIFICATION_TYPE);
				$("#tableRequestItemsParent").html(html);
				initSelect2();
				initQuantity();
				initDataTables();
				updateTableItems();
				const totalCost = getTotalAmount();
				$("#total").text(formatAmount(totalCost, true));
				$(`[name="discount"]`).attr("maxlength", formatAmount(totalCost, true).length);
				$(`[name="discount"]`).attr("max", totalCost);
				$(`[name="discount"]`).val("0").trigger("keyup");
				$(`[name="lessEwt"]`).val("0").trigger("keyup");
			}, 100);
		}
	}
	// ----- END DISPLAY TABLE REQUEST ITEMS -----


	// ----- SELECT CLASSIFICATION TYPE -----
	$(document).on("change", `[name="purchaseRequestClassification"]`, function() {
		const classification = $(this).val();
		GLOBAL_CLASSIFICATION_TYPE = classification;
		displayTableRequestItems();
	})
	// ----- END SELECT CLASSIFICATION TYPE -----


	// ----- SELECT VENDOR NAME -----
	$(document).on("change", `[name="inventoryVendorID"]`, function() {
		const inventoryVendorID     = $(this).val();
		const vendorCode           = $(`option:selected`, this).attr("vendorCode");
		const vendorName           = $(`option:selected`, this).attr("vendorName");
		const vendorContactDetails = $(`option:selected`, this).attr("vendorContactDetails");
		const vendorContactPerson  = $(`option:selected`, this).attr("vendorContactPerson");
		const vendorAddress        = $(`option:selected`, this).attr("vendorAddress");
		const vendorVatable        = $(`option:selected`, this).attr("vendorVatable");

		$(`[name="vendorCode" ]`).val(vendorCode);
		$(`[name="vendorContactDetails" ]`).val(vendorContactDetails);
		$(`[name="vendorContactPerson" ]`).val(vendorContactPerson);
		$(`[name="vendorAddress" ]`).val(vendorAddress);

		GLOBAL_INVENTORY_VENDOR_ID = inventoryVendorID;
		displayTableRequestItems();
	})
	// ----- END SELECT VENDOR NAME -----


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
		formData.append("employeeID", sessionID);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {

			const inventoryVendorID     = $(`[name="inventoryVendorID"]`).val();
			const vendorCode            = $(`[name="inventoryVendorID"] option:selected`).attr("vendorCode");
			const vendorName            = $(`[name="inventoryVendorID"] option:selected`).attr("vendorName");
			const vendorContactPerson   = $(`[name="inventoryVendorID"] option:selected`).attr("vendorContactPerson");
			const vendorContactDetails  = $(`[name="inventoryVendorID"] option:selected`).attr("vendorContactDetails");
			const vendorAddress         = $(`[name="inventoryVendorID"] option:selected`).attr("vendorAddress");
			const paymentTerms          = $(`[name="paymentTerms"]`).val();
			const shippingTerm          = $(`[name="shippingTerm"]`).val();
			const shippingDate          = moment($(`[name="shippingDate"]`).val()).format("YYYY-MM-DD");
			const purchaseRequestReason = $(`[name="purchaseRequestReason"]`).val();
			const purchaseRequestClassification = $(`[name="purchaseRequestClassification"]`).val();

			const total        = getNonFormattedAmount($(`#total`).text()) || 0;
			const discountType = $(`[name="discountType"]`).val();
			const discount     = getNonFormattedAmount($(`[name="discount"]`).val()) || 0;
			const totalAmount  = getNonFormattedAmount($("#totalAmount").text()) || 0;
			const vatSales     = getNonFormattedAmount($("#vatSales").text()) || 0;
			const vat          = getNonFormattedAmount($(`[name="vat"]`).val()) || 0;
			const totalVat     = getNonFormattedAmount($("#totalVat").text()) || 0;
			const lessEwt      = getNonFormattedAmount($(`[name="lessEwt"]`).val()) || 0;
			const grandTotalAmount = getNonFormattedAmount($("#grandTotalAmount").text()) || 0;

			formData.append("employeeID", sessionID);
			formData.append("inventoryVendorID", inventoryVendorID || "");
			formData.append("vendorCode", vendorCode || "");
			formData.append("vendorName", vendorName || "");
			formData.append("vendorContactPerson", vendorContactPerson || "");
			formData.append("vendorContactDetails", vendorContactDetails || "");
			formData.append("vendorAddress", vendorAddress || "");
			formData.append("paymentTerms", paymentTerms || "");
			formData.append("shippingTerm", shippingTerm || "");
			formData.append("shippingDate", shippingDate || "");
			formData.append("purchaseRequestReason", purchaseRequestReason || "");
			formData.append("purchaseRequestClassification", purchaseRequestClassification || "");
			formData.append("total", total);
			formData.append("discountType", discountType);
			formData.append("discount", discount);
			formData.append("totalAmount", totalAmount);
			formData.append("vatSales", vatSales);
			formData.append("vat", vat);
			formData.append("totalVat", totalVat);
			formData.append("lessEwt", lessEwt);
			formData.append("grandTotalAmount", grandTotalAmount);

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
					formData.delete("purchaseRequestStatus");
					formData.append("purchaseRequestStatus", 2);
				}
			}

			$(`#tableRequestItems tbody tr`).each(function(i) {

				const requestItemAssetID = $(this).attr("requestItemAssetID");
				const inventoryItemID = $(`[name="inventoryItemID"]`, this).val();
				const itemName        = $(`[name="inventoryItemID"] option:selected`, this).text()?.trim().replaceAll("\n", "");
				const itemCode        = $(`[name="inventoryItemID"] option:selected`, this).attr("itemCode");
				const itemDescription = $(`[name="inventoryItemID"] option:selected`, this).attr("itemDescription");
				const itemClassification = $(`[name="inventoryItemID"] option:selected`, this).attr("itemClassification");
				const itemCategory    = $(`[name="inventoryItemID"] option:selected`, this).attr("itemCategory");
				const itemBrand       = $(`[name="inventoryItemID"] option:selected`, this).attr("itemBrand");
				const itemUom         = $(`[name="inventoryItemID"] option:selected`, this).attr("itemUom");
				const itemImage       = $(`[name="inventoryItemID"] option:selected`, this).attr("itemImage");
				const itemPrice       = +$(`[name="inventoryItemID"] option:selected`, this).attr("itemPrice") || 0;
				const itemQuantity    = +getNonFormattedAmount($(`[name="itemQuantity"]`, this).val()) || 0;
				const itemTotalcost   = itemPrice * itemQuantity;
				const itemRemarks     = $(`[name="itemRemarks"]`, this).val()?.trim();

				formData.append(`items[${i}][requestItemAssetID]`, requestItemAssetID || "");
				formData.append(`items[${i}][itemID]`, inventoryItemID || "");
				formData.append(`items[${i}][itemName]`, itemName || "");
				formData.append(`items[${i}][itemCode]`, itemCode || "");
				formData.append(`items[${i}][itemClassification]`, itemClassification || "");
				formData.append(`items[${i}][itemDescription]`, itemDescription || "");
				formData.append(`items[${i}][files]`, itemImage || "");
				formData.append(`items[${i}][itemCategory]`, itemCategory || "");
				formData.append(`items[${i}][itemBrandName]`, itemBrand || "");
				formData.append(`items[${i}][itemUom]`, itemUom || "");
				formData.append(`items[${i}][remarks]`, itemRemarks || "");
				formData.append(`items[${i}][forPurchase]`, itemQuantity || "");
				formData.append(`items[${i}][unitCost]`, itemPrice || "");
				formData.append(`items[${i}][totalCost]`, itemTotalcost || "");
			})
		} 

		return formData;
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
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id);
		}, 10);
	});
	// ----- END OPEN EDIT FORM -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
	});
	// ----- END VIEW DOCUMENT -----


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("purchaseRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, false, true, fromCancelledDocument);
		}, 10);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("purchaseRequestID"));
		const code       = $(this).attr("purchaseRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const status     = $(this).attr("status");

		if (status && status != 0) {
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

				savePurchaseRequest(data, "save", null, pageContent, code);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id ? "update" : "insert";
			const data   = getPurchaseRequestData(action, "save", "0", id);
			data.append("purchaseRequestStatus", 0);

			savePurchaseRequest(data, "save", null, pageContent, code);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const code     = $(this).attr("purchaseRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPurchaseRequestData(action, "save", "0", id);
		data.append("purchaseRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("revisePurchaseRequestID", id);
				data.append("revisePurchaseRequestCode", code);
				data.delete("purchaseRequestID");
			} else {
				data.append("purchaseRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		savePurchaseRequest(data, "save", null, pageContent, code);
	});
	// ----- END SAVE DOCUMENT -----

	
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
			showNotification("danger", "Invalid less EWT value.");
			$(`[name="lessEwt"]`).focus();
			return false;
		}
		return true;
	}
	// ----- END CHECK COST SUMMARY -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("purchaseRequestID"));
		const code          = $(this).attr("purchaseRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_purchase_request");
		removeIsValid("#tableRequestItems");
		const costSummary = checkCostSummary();

		if (validate && costSummary) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getPurchaseRequestData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.append("revisePurchaseRequestID", id);
					data.append("revisePurchaseRequestCode", code);
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

			savePurchaseRequest(data, "submit", notificationData, pageContent, code);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("purchaseRequestID"));
		const code   = $(this).attr("purchaseRequestCode");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent, code);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id   = decryptString($(this).attr("purchaseRequestID"));
		const code = $(this).attr("purchaseRequestCode");
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
					notificationDescription: `${code}: Your request has been approved.`,
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

			savePurchaseRequest(data, "approve", notificationData, pageContent, code);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id   = decryptString($(this).attr("purchaseRequestID"));
		const code = $(this).attr("purchaseRequestCode");

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
			<button type="button" 
				class="btn btn-danger px-5 p-2" 
				id="btnRejectConfirmation"
				purchaseRequestID="${encryptString(id)}"
				purchaseRequestCode="${code}">
				<i class="far fa-times-circle"></i> Deny
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2"
				data-dismiss="modal">
				<i class="fas fa-ban"></i> Cancel
			</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id   = decryptString($(this).attr("purchaseRequestID"));
		const code = $(this).attr("purchaseRequestCode");

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
					notificationDescription: `${code}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePurchaseRequest(data, "deny", notificationData, pageContent, code);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id   = decryptString($(this).attr("purchaseRequestID"));
		const code = $(this).attr("purchaseRequestCode");
		let data = new FormData;
		data.append("purchaseRequestID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		savePurchaseRequest(data, "drop", null, pageContent, code);
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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null, feedback = "") {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$("#loader").show();
				setTimeout(() => {
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
							let code        = result[1] || (feedback || "Purchase request");
							let insertedID  = result[2];
							let dateCreated = result[3];
	
							let swalTitle;
							if (method == "submit") {
								swalTitle = `${code} submitted successfully!`;
							} else if (method == "save") {
								swalTitle = `${code} saved successfully!`;
							} else if (method == "cancelform") {
								swalTitle = `${code} cancelled successfully!`;
							} else if (method == "approve") {
								swalTitle = `${code} approved successfully!`;
							} else if (method == "deny") {
								swalTitle = `${code} denied successfully!`;
							} else if (method == "drop") {
								swalTitle = `${code} dropped successfully!`;
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