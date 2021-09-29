$(document).ready(function() {
    const allowedUpdate = isUpdateAllowed(138);

    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("change request");
	// ----- END MODULE APPROVER -----


    // ----- GLOBAL VARIABLE - REUSABLE ----- 
    const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
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
				"ims_change_request_tbl", 
				"reviseChangeRequestID", 
				"reviseChangeRequestID IS NOT NULL AND changeRequestStatus != 4");
			return revisedDocumentsID.map(item => item.reviseChangeRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_change_request_tbl", "", "changeRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					changeRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (changeRequestStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (changeRequestStatus == 0 || changeRequestStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (changeRequestStatus == 0) {
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
					const isAllowed = isCreateAllowed(138);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/change_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/change_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/change_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/change_request`);
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
			if (isImModuleApprover("ims_change_request_tbl", "approversID")) {
				let count = getCountForApproval("ims_change_request_tbl", "changeRequestStatus");
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
			if (isCreateAllowed(138)) {
				html = ``;
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
		let changeRequestData = getTableData(
			`ims_change_request_tbl AS iprt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
                "iprt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, iprt.createdAt AS dateCreated",
                `iprt.employeeID != ${sessionID} AND changeRequestStatus != 0 AND changeRequestStatus != 4`,
			`FIELD(changeRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(iprt.submittedAt, iprt.createdAt)`
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
            
            changeRequestData.map((item) => {
			let {
				changeRequestID,
                changeRequestCode,
                purchaseOrderCode,
                projectCode,
                projectName,
                clientCode,
                clientName,
                employeeID,
                fullname,
                vendorCode,
                vendorName,
                changeRequestReason,
                approversID,
                approversDate,
                changeRequestStatus,
                changeRequestRemarks,
                submittedAt,
                createdAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = changeRequestStatus == 2 || changeRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = changeRequestStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, changeRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(changeRequestID)}">
					<td>${changeRequestCode}</td>
					<td>${fullname || "-"}</td>
					<td>
						<div>
							${purchaseOrderCode || '-'}
						</div>
						<small style="color:#848482;">${changeRequestReason || ''}</small>
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
						${employeeFullname(getCurrentApprover(approversID, approversDate, changeRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(changeRequestStatus, true)}
					</td>
					<td>${changeRequestRemarks || "-"}</td>
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
			`ims_change_request_tbl AS icrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"icrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, icrt.createdAt AS dateCreated",
			`icrt.employeeID = 0 OR icrt.employeeID IS NULL OR icrt.employeeID = ${sessionID}`,
			`FIELD(changeRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(icrt.submittedAt, icrt.createdAt)`
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
				changeRequestID,
                changeRequestCode,
                purchaseOrderCode,
                projectCode,
                projectName,
                clientCode,
                clientName,
                employeeID,
                fullname,
                vendorCode,
                vendorName,
                changeRequestReason,
                approversID,
                approversDate,
                changeRequestStatus,
                changeRequestRemarks,
                submittedAt,
                createdAt,
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = changeRequestStatus == 2 || changeRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = changeRequestStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(changeRequestID)}">
                <td>${changeRequestCode}</td>
                <td>${fullname || "-"}</td>
				<td>
					<div>
						${purchaseOrderCode || '-'}
					</div>
					<small style="color:#848482;">${changeRequestReason || ''}</small>
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
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, changeRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(changeRequestStatus, true)}
                </td>
				<td>${changeRequestRemarks || "-"}</td>
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
				reviseChangeRequestID,
				changeRequestID     = "",
				changeRequestCode   = "",
				changeRequestStatus = "",
				employeeID          = "",
				approversID         = "",
				approversDate       = "",
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null || employeeID === sessionID) {
				if (changeRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						changeRequestID="${encryptString(changeRequestID)}"
						changeRequestCode="${changeRequestCode}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2" 
							id="btnBack"
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2"
							id="btnBack" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}"
							status="${changeRequestStatus}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}					
				} else if (changeRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}"
							status="${changeRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (changeRequestStatus == 2) {
					// DROP
				} else if (changeRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(changeRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}"
							status="${changeRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (changeRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_change_request_tbl`,
						`reviseChangeRequestID`,
						`reviseChangeRequestID = ${reviseChangeRequestID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { reviseChangeRequestID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`ims_change_request_tbl`,
							`reviseChangeRequestID`,
							`changeRequestStatus <> 3 AND changeRequestStatus <> 4 AND reviseChangeRequestID = ${reviseID}`
						);
					}

					if (!isDocumentRevised(changeRequestID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}"
							status="${changeRequestStatus}"
							cancel="true">
							<i class="fas fa-clone"></i> Revise
						</button>`;
					}
				}
			} else {
				if (changeRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}">
							<i class="fas fa-paper-plane"></i> Approve
						</button>
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							changeRequestID="${encryptString(changeRequestID)}"
							changeRequestCode="${changeRequestCode}">
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


    // ----- GET TABLE ROW -----
    function getTableRow(classification = "", data = false) {
        let html = "";
        if (classification && data) {
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
                } = data;
    
                html = `
                <tr requestItemAssetID="${requestItemID}">
                    <td class="itemCode">${itemCode || "-"}</td>
                    <td class="itemName">
                        <div class="form-group mb-0" style="width: 180px;">
                            ${itemName}
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
                            ${formatAmount(forPurchase)}
                        </div>
                    </td>
                    <td class="text-right itemUnitcost">
                        ${unitCost ? formatAmount(unitCost, true) : "-"}
                    </td>
                    <td class="text-right itemTotalcost">
                        ${totalCost ? formatAmount(totalCost, true) : "-"}
                    </td>
                    <td class="itemRemarks">
                        <div class="form-group mb-0">
                            ${remarks || "-"}
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
                } = data;
    
                html = `
                <tr requestItemAssetID="${requestAssetID}">
                    <td class="itemCode">${assetCode || "-"}</td>
                    <td class="itemName">
                        <div class="form-group mb-0" style="width: 180px;">
                            ${assetName}
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
                            ${formatAmount(forPurchase)}
                        </div>
                    </td>
                    <td class="text-right itemUnitcost">
                        ${unitCost ? formatAmount(unitCost, true) : "-"}
                    </td>
                    <td class="text-right itemTotalcost">
                        ${totalCost ? formatAmount(totalCost, true) : "-"}
                    </td>
                    <td class="itemRemarks">
                        <div class="form-group mb-0">
                            ${remarks || "-"}
                        </div>
                    </td>
                </tr>`;
            }
        }
        return html;
    }
    // ----- END GET TABLE ROW -----


    // ----- GET TABLE REQUEST ITEM ASSETS -----
    function getTableRequestItemAssets(data = false) {
        let {
			changeRequestID,
            changeRequestCode,
			reviseChangeRequestID,
            reviseChangeRequestCode,
            costEstimateID,
            costEstimateCode,
            billMaterialID,
            billMaterialCode,
            materialRequestID,
            materialRequestCode,
            inventoryValidationID,
            inventoryValidationCode,
            bidRecapID,
            bidRecapCode,
            purchaseRequestID,
            purchaseRequestCode,
            purchaseOrderID,
            purchaseOrderCode,
            timelineBuilderID,
            projectCode,
            projectName,
            projectCategory,
            clientCode,
            clientName,
            clientAddress,
            employeeID,
            inventoryVendorID,
            vendorCode,
            vendorName,
            vendorContactPerson,
            vendorContactDetails,
            vendorAddress,
            changeRequestClassification,
            purchaseOrderReason,
            changeRequestReason,
            approversID,
            approversDate,
            approversStatus,
            changeRequestStatus,
            changeRequestRemarks,
            submittedAt,
            createdBy,
            updatedBy,
            createdAt,
            updatedAt,
		} = data && data[0];

        let html = "";

        if (changeRequestClassification == "Items") {
            let requestItems = getTableData(
                `ims_request_items_tbl`,
                `*`,
                `changeRequestID = ${changeRequestID}
                AND bidRecapID IS NULL`);

            let tableRequestItemsHTML = "";
            requestItems.map(item => {
                tableRequestItemsHTML += getTableRow("Items", item);
            })

            html = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <div class="row align-selft-center">
                        <div class="col-md-6 col-sm-12 text-left">
                            <h5 style="font-weight: bold;
                                letter-spacing: 0.05rem;">ITEMS</h5>
                        </div>
                        <div class="col-md-6 col-sm-12 text-right"></div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="w-100">
                        <table class="table table-hover" 
                            id="tableRequestItems" 
                            isReadOnly="true">
                            <thead>
                                <tr>
                                    <th>Item Code</th>
                                    <th>Item Name</th>
                                    <th>Item Classification</th>
                                    <th>UOM</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total Amount</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRequestItemsHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
        } else if (changeRequestClassification == "Assets") {
            let requestAssets = getTableData(
                `ims_request_assets_tbl`,
                `*`,
                `changeRequestID = ${changeRequestID}
                AND bidRecapID IS NULL`);

            let tableRequestAssetsHTML = "";
            requestAssets.map(asset => {
                tableRequestAssetsHTML += getTableRow("Assets", asset);
            })

            html = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <div class="row align-items-center">
                        <div class="col-md-6 col-sm-12 text-left">
                            <h5 style="font-weight: bold;
                                letter-spacing: 0.05rem;">ASSETS</h5>
                        </div>
                        <div class="col-md-6 col-sm-12 text-right"></div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="w-100">
                        <table class="table table-hover" 
                            id="tableRequestItems" 
                            isReadOnly="true">
                            <thead>
                                <tr>
                                    <th>Asset Code</th>
                                    <th>Asset Name</th>
                                    <th>Asset Classification</th>
                                    <th>UOM</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total Amount</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRequestAssetsHTML}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
        }
        return html;
    }
    // ----- END GET TABLE REQUEST ITEM ASSETS -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			changeRequestID,
            changeRequestCode,
			reviseChangeRequestID,
            reviseChangeRequestCode,
            costEstimateID,
            costEstimateCode,
            billMaterialID,
            billMaterialCode,
            materialRequestID,
            materialRequestCode,
            inventoryValidationID,
            inventoryValidationCode,
            bidRecapID,
            bidRecapCode,
            purchaseRequestID,
            purchaseRequestCode,
            purchaseOrderID,
            purchaseOrderCode,
            timelineBuilderID,
            projectCode,
            projectName,
            projectCategory,
            clientCode,
            clientName,
            clientAddress,
            employeeID,
            inventoryVendorID,
            vendorCode,
            vendorName,
            vendorContactPerson,
            vendorContactDetails,
            vendorAddress,
            changeRequestClassification,
            purchaseOrderReason,
            changeRequestReason,
            approversID,
            approversDate,
            approversStatus,
            changeRequestStatus,
            changeRequestRemarks,
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

		$(".btnBack").attr("changeRequestID", encryptString(changeRequestID));
		$(".btnBack").attr("status", changeRequestStatus);
		$(".btnBack").attr("employeeID", employeeID);
		$(".btnBack").attr("cancel", isFromCancelledDocument);
		$(".btnBack").attr("changeRequestCode", changeRequestCode);

		let disabled  = readOnly ? "disabled" : "";
		let button    = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? changeRequestID : reviseChangeRequestID;
		let documentHeaderClass = isRevise || reviseChangeRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseChangeRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseChangeRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${(reviseChangeRequestCode || (isRevise && changeRequestCode)) || "---"}
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
							${changeRequestID && !isRevise ? changeRequestCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${changeRequestStatus && !isRevise ? getStatusStyle(changeRequestStatus, true) : "---"}
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
								${getDateApproved(changeRequestStatus, approversID, approversDate)}
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
							${changeRequestRemarks && !isRevise ? changeRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_change_request">

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
					<input type="text"
						name="purchaseOrderID"
						class="form-control validate"
						disabled
						value="${purchaseOrderCode || "-"}">
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
                    <label>Vendor Name</label>
					<input type="text" 
						class="form-control" 
						name="vendorName" 
						disabled 
						value="${vendorName || "-"}">
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
                    <label>Description</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="purchaseOrderReason"
                        name="purchaseOrderReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled>${purchaseOrderReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseOrderReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-4" id="tableRequestItemsParent">
                ${getTableRequestItemAssets(data)}
            </div>

            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                        minlength="2"
                        maxlength="725"
                        id="changeRequestReason"
                        name="changeRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${changeRequestReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-changeRequestReason"></div>
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


    // ----- GET CHANGE REQUEST DATA -----
	function getChangeRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			formData.append("changeRequestID", id);

			if (status != "2") {
				formData.append("changeRequestStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("employeeID", sessionID);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {

			const changeRequestReason = $(`[name="changeRequestReason"]`).val()?.trim();

			formData.append("employeeID", sessionID);
			formData.append("changeRequestReason", changeRequestReason || "");

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("changeRequestID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("changeRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.delete("changeRequestStatus");
					formData.append("changeRequestStatus", 2);
				}
			}
		} 

		return formData;
	}
	// ----- END GET CHANGE REQUEST DATA -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		$("#page_content").html(preloader);
		setTimeout(function() {
			const id = decryptString($(this).attr("id"));
			viewDocument(id, true);
		}, 10)
	});
	// ----- END VIEW DOCUMENT -----


    // ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		$("#page_content").html(preloader);
		setTimeout(function() {
			const id = decryptString($(this).attr("id"));
			viewDocument(id);
		}, 10)
	});
	// ----- END OPEN EDIT FORM -----


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("changeRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


    // ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("changeRequestID"));
		const code       = $(this).attr("changeRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const status     = $(this).attr("status");

		if (status && status != 0) {
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getChangeRequestData(action, "save", "0", id);
				data.append("changeRequestStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseChangeRequestID", id);
					data.delete("changeRequestID");
				} else {
					data.append("changeRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}

				saveChangeRequest(data, "save", null, pageContent, code);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id ? "update" : "insert";
			const data   = getChangeRequestData(action, "save", "0", id);
			data.append("changeRequestStatus", 0);

			saveChangeRequest(data, "save", null, pageContent, code);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("changeRequestID"));
		const code     = $(this).attr("changeRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getChangeRequestData(action, "save", "0", id);
		data.append("changeRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseChangeRequestID", id);
				data.append("reviseChangeRequestCode", code);
				data.delete("changeRequestID");
			} else {
				data.append("changeRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		saveChangeRequest(data, "save", null, pageContent, code);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("changeRequestID"));
		const code   = $(this).attr("changeRequestCode");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getChangeRequestData(action, "cancelform", "4", id, status);

		saveChangeRequest(data, "cancelform", null, pageContent, code);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("changeRequestID"));
		const code          = $(this).attr("changeRequestCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_change_request");

		if (validate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getChangeRequestData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.append("reviseChangeRequestID", id);
					data.append("reviseChangeRequestCode", code);
					data.delete("changeRequestID");
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
					moduleID:                138,
					notificationTitle:       "Change Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveChangeRequest(data, "submit", notificationData, pageContent, code);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id   = decryptString($(this).attr("changeRequestID"));
		const code = $(this).attr("changeRequestCode");
		let tableData  = getTableData("ims_change_request_tbl", "", "changeRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getChangeRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                138,
					tableID:                 id,
					notificationTitle:       "Change Request",
					notificationDescription: `${code}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                138,
					tableID:                 id,
					notificationTitle:       "Change Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("changeRequestStatus", status);

			saveChangeRequest(data, "approve", notificationData, pageContent, code);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id   = decryptString($(this).attr("changeRequestID"));
		const code = $(this).attr("changeRequestCode");

		$("#modal_change_request_content").html(preloader);
		$("#modal_change_request .page-title").text("DENY CHANGE REQUEST");
		$("#modal_change_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="changeRequestRemarks"
					name="changeRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-changeRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" 
				class="btn btn-danger px-5 p-2" 
				id="btnRejectConfirmation"
				changeRequestID="${encryptString(id)}"
				changeRequestCode="${code}">
				<i class="far fa-times-circle"></i> Deny
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2"
				data-dismiss="modal">
				<i class="fas fa-ban"></i> Cancel
			</button>
		</div>`;
		$("#modal_change_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id   = decryptString($(this).attr("changeRequestID"));
		const code = $(this).attr("changeRequestCode");

		const validate = validateForm("modal_change_request");
		if (validate) {
			let tableData = getTableData("ims_change_request_tbl", "", "changeRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("changeRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("changeRequestRemarks", $("[name=changeRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                138,
					tableID: 				 id,
					notificationTitle:       "Change Request",
					notificationDescription: `${code}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveChangeRequest(data, "deny", notificationData, pageContent, code);
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


    // ----- GET CONFIRMATION -----
    function getConfirmation(method = "submit") {
        const title = "Change Request";
        let swalText, swalImg;
    
        $("#modal_change_request").text().length > 0 && $("#modal_change_request").modal("hide");
    
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
    // ----- END GET CONFIRMATION -----


    // ----- SAVE CHANGE REQUEST -----
    function saveChangeRequest(data = null, method = "submit", notificationData = null, callback = null, feedback = "") {
        if (data) {
            const confirmation = getConfirmation(method);
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $.ajax({
                        method:      "POST",
                        url:         `change_request/saveChangeRequest`,
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
                            let code        = result[1] || (feedback || "Change request");
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
                } else {
                    if (res.dismiss == "cancel" && method != "submit") {
                        if (method != "deny") {
                            if (method != "cancelform") {
                                callback && callback();
                            }
                        } else {
                            $("#modal_change_request").text().length > 0 && $("#modal_change_request").modal("show");
                        }
                    } else if (res.isDismissed) {
                        if (method == "deny") {
                            $("#modal_change_request").text().length > 0 && $("#modal_change_request").modal("show");
                        }
                    }
                }
            });
    
            
        }
        return false;
    }
    // ----- END SAVE CHANGE REQUEST -----


})