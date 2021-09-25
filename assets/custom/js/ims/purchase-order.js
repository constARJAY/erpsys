$(document).ready(function() {
    const allowedUpdate = isUpdateAllowed(46);

    
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase order");
	// ----- END MODULE APPROVER -----


    // ----- GLOBAL VARIABLES/FUNCTIONS -----
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

    const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

    function getStatusStyle(status = 1, isInventory = false) {
        switch (status) {
            case "2":
                return `<span class="badge badge-info w-100">Signed</span>`;
            case "4":
                return `<span class="badge badge-primary w-100">Cancelled</span>`;
            case "0":
            default:
                let text = isInventory ? "Unsign" : "Draft";
                return `<span class="badge badge-warning w-100">${text}</span>`;
        }
    }

	function getDocumentDates(createdAt = null, submittedAt = null, approvedAt = null) {
		submittedAt = submittedAt != "-" ? submittedAt : null;
		approvedAt  = approvedAt  != "-" ? approvedAt  : null;
	
		let dateDisplay = "";
		if (createdAt) {
			dateDisplay = `
			<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
				<b>Created: </b><span style="color:#000;">${createdAt}</span>
			</div>`;
			if (!submittedAt && !approvedAt) {
				// DISREGARD
			} else if (!submittedAt && approvedAt) {
				dateDisplay += `
				<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
					<b>Approved: </b><span style="color:#000;">${approvedAt}</span>
				</div>`;
			} else if (submittedAt && !approvedAt) {
				dateDisplay += `
				<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
					<b>Signed: </b><span style="color:#000;">${submittedAt}</span>
				</div>`;
			} else if (submittedAt && approvedAt) {
				dateDisplay += `
				<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
					<b>Signed: </b><span style="color:#000;">${submittedAt}</span>
				</div>
				<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
					<b>Approved: </b><span style="color:#000;">${approvedAt}</span>
				</div>`;
			}
		}
		return dateDisplay;
	}
    // ----- END GLOBAL VARIABLES/FUNCTIONS -----


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
				{ targets: 6,  width: 300 },
				{ targets: 7,  width: 150 },
			],
		};

		const isReadOnly = $("#tableOrderItems").attr("isReadOnly") == "true";
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
		activateDatatable("tableOrderItems", bodyOptions);
	}
	// ----- END DATATABLES -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_purchase_order_tbl", "", "purchaseOrderID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					purchaseOrderStatus
				} = tableData[0];

                let isReadOnly = purchaseOrderStatus == 2 || purchaseOrderStatus == 3;
                pageContent(true, tableData, isReadOnly);
                updateURL(encryptString(id));
				
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


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html = "";
		if (isAdd) {
			// DISREGARD
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


    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		// DISREGARD
	}
	// ----- END HEADER CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let purchaseOrderData = getTableData(
			`ims_purchase_order_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated",
			``,
			`FIELD(purchaseOrderStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		/*
		 ----- ***** STATUS ***** -----
			0 - UNSIGN
			1 - SIGNED
			2 - CANCELLED
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
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>`;

		purchaseOrderData.map((item) => {
			let {
				purchaseOrderID,
				purchaseOrderCode,
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
				purchaseOrderReason,
				purchaseOrderStatus,
				purchaseOrderRemarks,
				submittedAt,
				createdAt
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";

			let btnClass = purchaseOrderStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseOrderID)}">
                <td>${purchaseOrderCode}</td>
                <td>${fullname}</td>
				<td>
					<div>
						${purchaseRequestCode || '-'}
					</div>
					<small style="color:#848482;">${purchaseOrderReason || ''}</small>
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
				<td>${getDocumentDates(dateCreated, dateSubmitted)}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseOrderStatus, true)}
                </td>
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


    // ----- GET TABLE ROW -----
	function getTableRow(classification = "", item = {}) {

		let html = "";
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

			let itemNameDisplay     = itemName || "-";
			let itemQuantityDisplay = forPurchase || "-";
			let itemRemarksDisplay  = remarks || "-";

			html = `
			<tr requestItemID="${requestItemID}">
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
				<td class="text-right itemUnitcost">
                    ${unitCost ? formatAmount(unitCost, true) : "-"}
                </td>
				<td class="text-right itemTotalcost">
                    ${totalCost ? formatAmount(totalCost, true) : "-"}
                </td>
				<td class="itemRemarks">
					<div class="form-group mb-0">
						${itemRemarksDisplay}
					</div>
				</td>
			</tr>`;

		} else if (classification == "Assets") {

			let {
				requestItemID,
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

			let assetNameDisplay     = assetName || "-";
			let assetQuantityDisplay = forPurchase || "-";
			let assetRemarksDisplay  = remarks || "-";

			html = `
			<tr requestItemID="${requestItemID}">
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
				<td class="text-right itemUnitcost">
                    ${unitCost ? formatAmount(unitCost, true) : "-"}
                </td>
				<td class="text-right itemTotalcost">
                    ${totalCost ? formatAmount(totalCost, true) : "-"}
                </td>
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


    // ----- GET TABLE ORDER ITEMS -----
	function getTableOrderItems(classification = "", data = false) {

		let {
            purchaseRequestID,
			purchaseOrderID,
			purchaseOrderClassification
		} = data && data[0];

		let requestItems = [];
		if (purchaseOrderID) {
			if (classification == "Items") {
                requestItems = getTableData(
                    `ims_request_items_tbl
                    WHERE purchaseRequestID = ${purchaseRequestID}
                    AND purchaseOrderID = ${purchaseOrderID}
                    AND inventoryReceivingID IS NULL`
                );
			} else if (classification == "Assets") {
                requestItems = getTableData(
                    `ims_request_assets_tbl
                    WHERE purchaseRequestID = ${purchaseRequestID}
                    AND purchaseOrderID = ${purchaseOrderID}
                    AND inventoryReceivingID IS NULL`
                );
			}
		}

		let tableRequestItemsHTML = "";
		if (requestItems.length > 0) {
			requestItems.map(item => {
				tableRequestItemsHTML += `${getTableRow(classification, item)}`;
			})
		} else {
			tableRequestItemsHTML = `${getTableRow(classification)}`;
		}

        let html = "";
        if (classification == "Items") { 
            html = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 text-left align-self-center">
                            <h5 style="font-weight: bold;
                                letter-spacing: 0.05rem;">ITEMS (FOR PURCHASE)</h5>
                        </div>
                        <div class="col-md-6 col-sm-12 text-right">
                            <button class="btn btn-danger">
                                <i class="fas fa-file-pdf"></i> PDF
                            </button>
                            <button class="btn btn-info">
                                <i class="fas fa-file-excel"></i> EXCEL
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="w-100">
                        <table class="table table-hover" 
                            id="tableOrderItems" 
                            isReadOnly="true">
                            <thead>
                                <tr>
                                    <th>Item Code</th>
                                    <th>Item Name</th>
                                    <th>Item Classification</th>
                                    <th>UOM</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
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
        } else if (classification == "Assets") {
            html = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <div class="row">
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
                            <b class="text-warning">NOTE: </b>
                            <span>All available items are based on the item price list's preferred vendor.</span>
                        </div>

                        <table class="table table-hover" 
                            id="tableOrderItems" 
                            isReadOnly="true">
                            <thead>
                                <tr>
                                    <th>Asset Code</th>
                                    <th>Asset Name</th>
                                    <th>Asset Classification</th>
                                    <th>UOM</th>
                                    <th>Quantity</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
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
        }

		return html;
	}
	// ----- END GET TABLE ORDER ITEMS -----


    // ----- GET COST SUMMARY DISPLAY -----
	function getCostSummaryDisplay(data = false) {

		let {
			discountType          = "amount",
			total                 = 0,
			discount              = 0,
			totalAmount           = 0,
			vatSales              = 0,
			vat                   = 0,
			totalVat              = 0,
			lessEwt               = 0,
			grandTotalAmount      = 0,
		} = data && data[0];

		let html = "";
        let discountDisplay = discountType == "percent" ? `
			<div class="py-0 text-dark border-bottom d-flex justify-content-between">
				<div>(</div>
				<div>${formatAmount(discount)} %)</div>
			</div>` :
			`<div class="py-0 text-dark border-bottom d-flex justify-content-between">
				<div>(</div>
				<div>${formatAmount(discount)})</div>
			</div>`;

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
					<div class="col-6 col-lg-5 text-right text-dark align-self-center" 
                        style="padding-left: 4.5rem;">
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
						<div class="border-bottom">${formatAmount(vat)}</div>
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
                    <div class="col-6 col-lg-5 text-right text-dark align-self-center" 
                        style="padding-left: 4.5rem;">
                        <div class="py-0 text-dark d-flex justify-content-between">
                            <div>(</div>
                            <div>${formatAmount(lessEwt)})</div>
                        </div>
                    </div>
				</div>
				<div class="row pt-1" 
                    style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
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
			purchaseOrderID,
			purchaseOrderCode,
			purchaseRequestCode,
			employeeID,
			projectCode,
			projectName,
			projectCategory,
			clientCode,
			clientName,
			clientAddress,
			vendorCode,
			vendorName,
			vendorContactPerson,
			vendorContactDetails,
			vendorAddress,
			purchaseOrderClassification,
			paymentTerms,
			shippingTerm,
			shippingDate,
			purchaseOrderReason,
            purchaseOrderSignedPO,
			purchaseOrderStatus,
			purchaseOrderRemarks,
			submittedAt,
			createdAt
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

        const buttonChangeRequest = purchaseOrderStatus == "0" ? `
            <button type="button" 
                class="btn btn-cancel btnCancel px-5 p-2">
                <i class="fas fa-ban"></i> Change Request
            </button>` : "";
        const displaySignedPO = purchaseOrderStatus == "2" && purchaseOrderSignedPO ? `
            <div class="pr-3">
                <a href="${base_url}assets/upload-files/purchase-order/${purchaseOrderSignedPO}"
                    class="pr-3"
                    target="_blank">${purchaseOrderSignedPO}</a>
            </div>` : "";
		const displayButtonSigned = purchaseOrderStatus == "0" ? `
			<input type="file"
				id="fileSignedPO"
				name="fileSignedPO"
				purchaseOrderID="${encryptString(purchaseOrderID)}"
				purchaseOrderCode="${purchaseOrderCode}"
				class="d-none"
				accept="image/*, .pdf, .docx, .doc">
			<button class="btn btn-success px-3 py-2"
				id="btnUploadFile">
				<i class="fas fa-file-upload"></i> Upload Signed P.O.
			</button>` : "";

		$("#btnBack").attr("purchaseOrderID", encryptString(purchaseOrderID));
		$("#btnBack").attr("status", purchaseOrderStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let html = `
        <div class="row px-2">
            <div class="col-12 mb-3 text-right d-flex align-items-center justify-content-end">
                <div id="displaySignedPO">${displaySignedPO}</div>
                ${displayButtonSigned}
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${purchaseOrderCode || "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${getStatusStyle(purchaseOrderStatus, true) || "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Date Created</small>
                        <h6 class="mt-0 font-weight-bold">
                            ${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Date Signed</small>
                        <h6 class="mt-0 font-weight-bold">
                            ${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                        </h6>      
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
                    <label>Reference No.</label>
					<input type="text"
						name="purchaseRequestID"
						class="form-control validate"
						disabled
						value="${purchaseRequestCode || "-"}">
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

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
					<label>Classification Type</label>
                    <input type="text" 
						class="form-control" 
						name="purchaseOrderClassification" 
						disabled 
						value="${purchaseOrderClassification || "-"}">
                </div>
            </div>

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
					<label>Payment Terms</label>
                    <input type="text" 
						class="form-control" 
						name="paymentTerms" 
						disabled 
						value="${paymentTerms || "-"}">
                </div>
            </div>

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
					<label>Shipping Term</label>
                    <input type="text" 
						class="form-control" 
						name="shippingTerm" 
						disabled 
						value="${shippingTerm || "-"}">
                </div>
            </div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Shipping Date</label>
                    <input type="text" 
						class="form-control" 
						name="shippingTerm" 
						disabled 
						value="${moment(shippingDate || dateToday()).format("MMMM DD, YYYY")}">
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

            <div class="col-sm-12 mt-4" id="tableOrderItemsParent">
                ${getTableOrderItems(purchaseOrderClassification, data)}
            </div>

			<div class="col-12" id="costSummaryDisplay">
                ${getCostSummaryDisplay(data)}
			</div>

            <div class="col-md-12 text-right mt-3">
                ${buttonChangeRequest}
            </div>
        </div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();

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

			headerButton(true);
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


    // ----- GET PURCHASE ORDER DATA -----
	function getPurchaseOrderData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {
		let formData = new FormData;
        return formData;
	}
	// ----- END GET PURCHASE ORDER DATA -----


    // ----- UPLOAD SIGNED PO -----
    $(document).on("change", "[name=fileSignedPO]", function(e) {
		const purchaseOrderID = decryptString($(this).attr("purchaseOrderID"));
		const files = this.files || false;
		if (files) {
			const filesize    = files[0].size/1024/1024;
			const filenameArr = files[0].name.split(".");
			const filename    = filenameArr[0];
			const extension   = filenameArr[1];
			const filetypeArr = files[0].type.split("/");
			const filetype    = filetypeArr[0];
			const acceptArr   = ["png", "jpg", "jpeg", "doc", "docx", "pdf"];
			console.log(extension);
			if (filesize > 10) {
				showNotification("danger", `${filenameArr.join(".")} size must be less than or equal to 10mb`);
				$(this).val("");
			} else if (!acceptArr.includes(extension)) {
				showNotification("danger", "Invalid file type");
				$(this).val("");
			} else {
				let formData = new FormData();
				formData.append("purchaseOrderID", purchaseOrderID);
				formData.append("purchaseOrderStatus", "2");
				formData.append("files", files[0]);
				saveSignedPurchaseOrder(formData, purchaseOrderID);
			}
		}
	})

    $(document).on("click", "[id=btnUploadFile]", function() {
		$(`[type=file][name=fileSignedPO]`).trigger("click");
	})
    // ----- END UPLOAD SIGNED PO -----


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


    // ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
        pageContent();
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- GET CONFIRMATION -----
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
            case "signedpo":
                swalTitle = `UPLOAD SIGNED PURCHASE ORDER`;
                swalText  = "Are you sure to upload signed purchase order in this document?";
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
    // ----- END GET CONFIRMATION -----


    // ----- SAVE PURCHASE ORDER -----
    function savePurchaseOrder(data = null, method = "submit", notificationData = null, callback = null, feedback = "") {
        if (data) {
            const confirmation = getConfirmation(method);
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $.ajax({
                        method:      "POST",
                        url:         `purchase_order/savePurchaseOrder`,
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
                            let code        = result[1] || (feedback || "Purchase order");
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
    // ----- END SAVE PURCHASE ORDER -----


    // ----- SAVE SIGNED PURCHASE ORDER -----
    function saveSignedPurchaseOrder(data, purchaseOrderID = 0) {
        if (data) {
            const confirmation = getConfirmation("signedpo");
            confirmation.then(res => {
                if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `purchase_order/saveSignedPurchaseOrder`,
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
									Swal.fire({
										icon:              "success",
										title:             `SIGNED PURCHASE ORDER UPLOADED SUCCESSFULLY!`,
										showConfirmButton: false,
										timer:             2000,
									}).then(function() {
                                        viewDocument(purchaseOrderID);
                                    });
								}, 500);
							} else {
								setTimeout(() => {
									$("#loader").hide();
									Swal.fire({
										icon:              "danger",
										title:             "FAILED TO UPLOAD SIGNED PURCHASE ORDER",
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
							$(`[name="fileSignedPO"]`).val("");
						}, 500);
					})
				} else {
					$(`[name="fileSignedPO"]`).val("");
				}
            });

        }
        return false
    }
    // ----- END SAVE SIGNED PURCHASE ORDER -----


})