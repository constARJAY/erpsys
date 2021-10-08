$(document).ready(function() {

    const allowedUpdate = isUpdateAllowed(40);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("bid recap");
	// ----- END MODULE APPROVER -----


    // ----- GLOBAL VARIABLES/FUNCTIONS -----
	let inventorVendorPriceList = [];

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

    const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

    const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    function getItemPriceList(classification = "", itemAssetID = 0) {
        let result = [];
        if (classification == "Items") {
            result = getTableData(
                `ims_inventory_price_list_tbl
                LEFT JOIN ims_inventory_vendor_tbl USING(inventoryVendorID)`,
                `ims_inventory_vendor_tbl.inventoryVendorID,
                inventoryVendorCode,
                ims_inventory_vendor_tbl.inventoryVendorName,
                vendorCurrentPrice AS vendorPrice,
				preferred`,
                `itemID = ${itemAssetID}
                AND assetID IS NULL
                AND inventoryVendorStatus = 1`
            )
        } else if (classification == "Assets") {
            result = getTableData(
                `ims_inventory_price_list_tbl
                LEFT JOIN ims_inventory_vendor_tbl USING(inventoryVendorID)`,
                `ims_inventory_vendor_tbl.inventoryVendorID,
                inventoryVendorCode,
                ims_inventory_vendor_tbl.inventoryVendorName,
                vendorCurrentPrice AS vendorPrice,
				preferred`,
                `itemID IS NULL
                AND assetID = ${itemAssetID}
                AND inventoryVendorStatus = 1`
            )
        }
        return result;
    }
    // ----- END GLOBAL VARIABLES/FUNCTIONS -----


    // ----- DATATABLES -----
	function activateDatatable(elementID = null, options = {}) {
		if ($.fn.DataTable.isDataTable(`#${elementID || "table"}`)) {
			$(`#${elementID || "table"}`).DataTable().destroy();
		}

		var table = $(`#${elementID || "table"}`)
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable(options);
	}

	function initDataTables() {
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
			columnDefs:     [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 100 },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 450 },
				{ targets: 6,  width: 250 },
			],
		};
        
		const tableBodyOptions = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs:     [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 100 },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 250 },
			],
		};

		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));
		["tableRequestItems", "tableRequestAssets"].map(id => activateDatatable(id, bodyOptions));
		$(".tableFinalQuote").each(function() {
			activateDatatable(this.id, tableBodyOptions)
		})
	}
	// ----- END DATATABLES -----


    // ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"ims_bid_recap_tbl", 
				"reviseBidRecapID", 
				"reviseBidRecapID IS NOT NULL AND bidRecapStatus != 4");
			return revisedDocumentsID.map(item => item.reviseBidRecapID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_bid_recap_tbl", "", "bidRecapID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					bidRecapStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (bidRecapStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (bidRecapStatus == 0 || bidRecapStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (bidRecapStatus == 0) {
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
			window.history.pushState("", "", `${base_url}ims/bid_recap?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/bid_recap?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/bid_recap?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/bid_recap`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			html = "";
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light btnBack" 
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
		if (display) {
			if (isImModuleApprover("ims_bid_recap_tbl", "approversID")) {
				let count = getCountForApproval("ims_bid_recap_tbl", "bidRecapStatus");
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


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let bidRecapData = getTableData(
			`ims_bid_recap_tbl AS ibrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated",
			`ibrt.employeeID != ${sessionID} AND bidRecapStatus != 0 AND bidRecapStatus != 4`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4, 5), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
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
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
					<th>Project</th>
					<th>Client</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		bidRecapData.map((item) => {
			let {
				bidRecapID,
				bidRecapCode,
                inventoryValidationID,
                inventoryValidationCode,
				changeRequestID,
                changeRequestCode,
				timelineBuilderID,
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
				bidRecapReason,
				bidRecapStatus,
				bidRecapRemarks,
				submittedAt,
				createdAt
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = bidRecapStatus == 2 || bidRecapStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = bidRecapStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, bidRecapStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(bidRecapID)}">
					<td>${bidRecapCode}</td>
					<td>${fullname || "-"}</td>
					<td>
						<div>
							${(changeRequestCode || inventoryValidationCode) || '-'}
						</div>
						<small style="color:#848482;">${bidRecapReason || ''}</small>
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
						${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(bidRecapStatus, true)}
					</td>
					<td>${bidRecapRemarks || "-"}</td>
				</tr>`;
			}
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForApprovalParent").html(html);
			initDataTables();
		}, 100);
	}
	// ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let bidRecapData = getTableData(
			`ims_bid_recap_tbl AS ibrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated",
			`ibrt.employeeID = 0 OR ibrt.employeeID IS NULL OR ibrt.employeeID = ${sessionID}`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4, 5), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
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
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		bidRecapData.map((item) => {
			let {
				bidRecapID,
				bidRecapCode,
                inventoryValidationID,
                inventoryValidationCode,
                changeRequestID,
                changeRequestCode,
				timelineBuilderID,
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
				bidRecapReason,
				bidRecapStatus,
				bidRecapRemarks,
				submittedAt,
				createdAt
			} = item;

			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = bidRecapStatus == 2 || bidRecapStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = bidRecapStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(bidRecapID)}">
                <td>${bidRecapCode}</td>
                <td>${fullname || "-"}</td>
				<td>
					<div>
						${(changeRequestCode || inventoryValidationCode) || '-'}
					</div>
					<small style="color:#848482;">${bidRecapReason || ''}</small>
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
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(bidRecapStatus, true)}
                </td>
				<td>${bidRecapRemarks || "-"}</td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
		}, 100);
	}
	// ----- END MY FORMS CONTENT -----


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				bidRecapID     = "",
				bidRecapCode   = "",
				bidRecapStatus = "",
				employeeID     = "",
				approversID    = "",
				approversDate  = "",
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null || employeeID == sessionID) {
				if (bidRecapStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						bidRecapID="${encryptString(bidRecapID)}"
						bidRecapCode="${bidRecapCode}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2" 
							id="btnBack"
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2 btnBack"
							id="btnBack" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}"
							status="${bidRecapStatus}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (bidRecapStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}"
							status="${bidRecapStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (bidRecapStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	bidRecapID="${encryptString(bidRecapID)}"
					// 	bidRecapCode="${bidRecapCode}"
					// 	status="${bidRecapStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (bidRecapStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(bidRecapID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}"
							status="${bidRecapStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (bidRecapStatus == 4) {
					// CANCELLED - FOR REVISE
					// const data = getTableData(
					// 	`ims_bid_recap_tbl`,
					// 	`bidRecapID`,
					// 	`bidRecapID = ${bidRecapID}`,
					// );
					// const { bidRecapID } = data && data[0];
					// const isAllowedForRevise = getTableDataLength(
					// 	`ims_bid_recap_tbl`,
					// 	`bidRecapID`,
					// 	`bidRecapStatus <> 3 AND bidRecapStatus <> 4 AND bidRecapID = ${bidRecapID}`
					// );

					if (!isDocumentRevised(bidRecapID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}"
							status="${bidRecapStatus}"
							cancel="true">
							<i class="fas fa-clone"></i> Revise
						</button>`;
					}
				}
			} else {
				if (bidRecapStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}">
							<i class="fas fa-paper-plane"></i> Approve
						</button>
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							bidRecapID="${encryptString(bidRecapID)}"
							bidRecapCode="${bidRecapCode}">
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

		$(`.tableVendor tbody tr`).each(function(i) {
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
				$parent.find(".invalid-feedback").text("");
			})
		})

		$(`[name="reason"]`).each(function(i) {
			const name = $(this).attr("name") || "";
			$(this).attr("id", `${name}${i}`);
			$parent = $(this).parent();
			$parent.find(".invalid-feedback").attr("id", `invalid-${name}${i}`);
		})

	}
	// ----- END UPDATE TABLE ITEMS -----


    // ----- GET INVENTORY VENDOR OPTIONS -----
    function getInventoryVendorOptions(classification = "", itemAssetID = 0, vendorID = 0, vendorIndex = 0, readOnly = false) {
        let html = "";
		if (!readOnly) {

			if (!inventorVendorPriceList.some(data => data.classification == classification && data.itemAssetID == itemAssetID)) {
				let temp = {
					classification, itemAssetID, priceList: [...getItemPriceList(classification, itemAssetID)]
				}
				inventorVendorPriceList.push(temp);
			}

			let vendorList = inventorVendorPriceList.filter(data => data.classification == classification && data.itemAssetID == itemAssetID);
				vendorList = vendorList?.[0]?.priceList ?? [];

			let preferredVendorList = vendorList.filter(vendor => vendor.preferred == 1);
			let preferredVendorID   = preferredVendorList?.[vendorIndex]?.inventoryVendorID ?? 0;

			vendorList.map((vendor, index) => {
				let {
					inventoryVendorID,
					inventoryVendorCode,
					inventoryVendorName,
					vendorPrice,
					preferred = 0
				} = vendor;

				let otherOption = inventoryVendorID == preferredVendorID ? "selected" : "";

				html += `
				<option value="${inventoryVendorID}"
					vendorCode="${inventoryVendorCode}"
					vendorName="${inventoryVendorName}"
					vendorPrice="${vendorPrice}"
					${inventoryVendorID == vendorID ? "selected" : otherOption}>
					${inventoryVendorName}
				</option>`;
			})
		}
        return html;
    }
    // ----- END GET INVENTORY VENDOR OPTIONS -----


    // ---- GET TABLE ROW -----
    function getTableRow(classification = "", item = false, readOnly = false) {
        let html = "";

		const candidateDisplay = (classification = "", itemAssetID = 0, inventoryVendorID = 0, candidateVendorID = "", candidateSelectedVendor = "", candidateVendorName = "", candidateVendorPrice = "", readOnly = false) => {
			let vendorID1 = "0", vendorID2 = "0", vendorID3 = "0";
			if (candidateVendorID) {
				let vendorArr = candidateVendorID.split("|");
				vendorID1 = vendorArr[0] || "0";
				vendorID2 = vendorArr[1] || "0";
				vendorID3 = vendorArr[2] || "0";
			}

			let selectedVendor1 = "0", selectedVendor2 = "0", selectedVendor3 = "0";
			if (candidateSelectedVendor) {
				let selectedVendorArr = candidateSelectedVendor.split("|");
				selectedVendor1 = selectedVendorArr[0] || "0";
				selectedVendor2 = selectedVendorArr[1] || "0";
				selectedVendor3 = selectedVendorArr[2] || "0";
			}

			let vendorName1 = "-", vendorName2 = "-", vendorName3 = "-";
			if (candidateVendorName) {
				let vendorNameArr = candidateVendorName.split("|");
				vendorName1 = vendorNameArr[0] || "-";
				vendorName2 = vendorNameArr[1] || "-";
				vendorName3 = vendorNameArr[2] || "-";
			}

			let vendorPrice1 = "-", vendorPrice2 = "-", vendorPrice3 = "-";
			if (candidateVendorPrice) {
				let vendorPriceArr = candidateVendorPrice.split("|");
				vendorPrice1 = formatAmount(vendorPriceArr[0], true) || "-";
				vendorPrice2 = formatAmount(vendorPriceArr[1], true) || "-";
				vendorPrice3 = formatAmount(vendorPriceArr[2], true) || "-";
			}

			let checkedVendor1 = selectedVendor1 == "1" ? "checked" : "";
			let checkedVendor2 = selectedVendor2 == "1" ? "checked" : "";
			let checkedVendor3 = selectedVendor3 == "1" ? "checked" : "";

			let checkboxDisplay1 = `
				<input type="checkbox"
					name="selectedVendor"
					classification="${classification}"
					${checkedVendor1}>`;
			let checkboxDisplay2 = `
				<input type="checkbox"
					name="selectedVendor"
					classification="${classification}"
					${checkedVendor2}>`;
			let checkboxDisplay3 = `
				<input type="checkbox"
					name="selectedVendor"
					classification="${classification}"
					${checkedVendor3}>`;
			let vendorDisplay1 = `
				<div class="form-group mb-0" style="width: 300px;">
					<select class="form-control validate select2"
						name="inventoryVendorID"
						style="width: 300px;"
						itemAssetID="${itemAssetID}"
						classification="${classification}"
						required>
						<option selected disabled>Select Vendor Name</option>
						${getInventoryVendorOptions(classification, itemAssetID, vendorID1, 0, readOnly)}    
					</select>
					<div class="d-block invalid-feedback"></div>
				</div>`;
			let vendorDisplay2 = `
				<div class="form-group mb-0" style="width: 300px;">
					<select class="form-control validate select2"
						name="inventoryVendorID"
						style="width: 300px;"
						itemAssetID="${itemAssetID}"
						classification="${classification}"
						required>
						<option selected disabled>Select Vendor Name</option>
						${getInventoryVendorOptions(classification, itemAssetID, vendorID2, 1, readOnly)}    
					</select>
					<div class="d-block invalid-feedback"></div>
				</div>`;
			let vendorDisplay3 = `
				<div class="form-group mb-0" style="width: 300px;">
					<select class="form-control validate select2"
						name="inventoryVendorID"
						style="width: 300px;"
						itemAssetID="${itemAssetID}"
						classification="${classification}"
						required>
						<option selected disabled>Select Vendor Name</option>
						${getInventoryVendorOptions(classification, itemAssetID, vendorID3, 2, readOnly)}    
					</select>
					<div class="d-block invalid-feedback"></div>
				</div>`;

			if (readOnly) {
				checkboxDisplay1 = (checkedVendor1 && vendorID1 ==inventoryVendorID) ? `
					<i class="fas fa-check text-success"></i>` : `
					<i class="fas fa-times text-danger"></i>`;
				checkboxDisplay2 = (checkedVendor2 && vendorID2 ==inventoryVendorID) ? `
					<i class="fas fa-check text-success"></i>` : `
					<i class="fas fa-times text-danger"></i>`;
				checkboxDisplay3 = (checkedVendor3 && vendorID3 ==inventoryVendorID) ? `
					<i class="fas fa-check text-success"></i>` : `
					<i class="fas fa-times text-danger"></i>`;
				vendorDisplay1 = `<div>${vendorName1}</div>`;
				vendorDisplay2 = `<div>${vendorName2}</div>`;
				vendorDisplay3 = `<div>${vendorName3}</div>`;
			}

			let html = `
			<table class="table tableVendor">
				<tbody>
					<tr class="border-bottom">
						<td class="text-center">
							${checkboxDisplay1}
						</td>
						<td class="text-center">1</td>
						<td>
							${vendorDisplay1}
						</td>
						<td class="text-right vendorPrice">
							${vendorPrice1}
						</td>
					</tr>
					<tr class="border-bottom border-top">
						<td class="text-center">
							${checkboxDisplay2}
						</td>
						<td class="text-center">2</td>
						<td>
							${vendorDisplay2}
						</td>
						<td class="text-right vendorPrice">
							${vendorPrice2}
						</td>
					</tr>
					<tr class="border-top">
						<td class="text-center">
							${checkboxDisplay3}
						</td>
						<td class="text-center">3</td>
						<td>
							${vendorDisplay3}
						</td>
						<td class="text-right vendorPrice">
							${vendorPrice3}
						</td>
					</tr>
				</tbody>
			</table>`;
			return html;
		}

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
               remarks,
               forPurchase = 0,
			   candidateVendorID       = "0|0|0",
			   candidateSelectedVendor = "0|0|0",
			   candidateVendorName     = "-|-|-",
			   candidateVendorPrice    = "-|-|-",
               inventoryVendorID,
            } = item;

            if (forPurchase && forPurchase > 0) {
                html = `
                <tr requestItemAssetID="${requestItemID}"
					itemAssetID="${itemID}"
                    class="request">
                    <td>${itemCode || "-"}</td>
                    <td>
                        <div>${itemName || "-"}</div>
                        <small>${itemBrandName}</small>
                    </td>
                    <td>
                        <div>${itemClassification || "-"}</div>
                        <small>${itemCategory}</small>
                    </td>
                    <td class="text-center">${itemUom || "-"}</td>
                    <td class="text-center forPurchase">${formatAmount((forPurchase || "0"))}</td>
                    <td>
                        ${candidateDisplay(classification, itemID, inventoryVendorID, candidateVendorID, candidateSelectedVendor, candidateVendorName, candidateVendorPrice, readOnly)}
                    </td>
                    <td>${remarks || "-"}</td>
                </tr>`;
            }
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
				remarks,
				forPurchase = 0,
				candidateVendorID       = "0|0|0",
				candidateSelectedVendor = "0|0|0",
				candidateVendorName     = "-|-|-",
				candidateVendorPrice    = "-|-|-",
				inventoryVendorID,
			 } = item;
			 
			 if (forPurchase && forPurchase > 0) {
				 html = `
				 <tr requestItemAssetID="${requestAssetID}"
					 itemAssetID="${assetID}"
					 class="request">
					 <td>${assetCode || "-"}</td>
					 <td>
						 <div>${assetName || "-"}</div>
						 <small>${assetBrandName}</small>
					 </td>
					 <td>
						 <div>${assetClassification || "-"}</div>
						 <small>${assetCategory}</small>
					 </td>
					 <td class="text-center">${assetUom || "-"}</td>
					 <td class="text-center forPurchase">${formatAmount((forPurchase || "0"))}</td>
					 <td>
						${candidateDisplay(classification, assetID, inventoryVendorID, candidateVendorID, candidateSelectedVendor, candidateVendorName, candidateVendorPrice, readOnly)}
					 </td>
					 <td>${remarks || "-"}</td>
				 </tr>`;
			 }
        }
        return html;
    }
    // ---- END GET TABLE ROW -----


    // ----- GET REQUEST ASSETS DISPLAY -----
    function getRequestAssetsDisplay(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        let {
            bidRecapID,
			changeRequestID,
            inventoryValidationID,
            bidRecapStatus
        } = data && data[0];

        let requestAssets = [];
        if (bidRecapID) {
			if (changeRequestID) {
				requestAssets = getTableData(
					`ims_request_assets_tbl`,
					`*`,
					`bidRecapID = ${bidRecapID}
					AND changeRequestID = ${changeRequestID}
					AND purchaseRequestID IS NULL`
				);
			} else {
				requestAssets = getTableData(
					`ims_request_assets_tbl`,
					`*`,
					`bidRecapID = ${bidRecapID}
					AND inventoryValidationID = ${inventoryValidationID}
					AND purchaseRequestID IS NULL`
				);
			}
        }

        let tableRowHTML = "";
        requestAssets.map(item => {
            tableRowHTML += getTableRow("Assets", item, readOnly);
        })

		let buttonGenerateFinalQuoteDisplay = !readOnly ? `
			<button class="btn btn-info btnGenerateFinalQuote"
				bidRecapID="${bidRecapID}"
				classification="Assets"
				id="btnAssetFinalQuote"
				revise="${isRevise}"
				cancel="${isFromCancelledDocument}"
				disabled>
				<i class="fas fa-cloud-upload-alt"></i> Generate Final Quote
			</button>` : "";

        let html = `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <div class="row align-items-center">
                    <div class="col-md-6 col-sm-12 text-left">
                        <h5 style="font-weight: bold;
                            letter-spacing: 0.05rem;">ASSETS</h5>
                    </div>
                    <div class="col-md-6 col-sm-12 text-right">
						${buttonGenerateFinalQuoteDisplay}
					</div>
                </div>
            </div>
            <div class="card-body">
                <div class="w-100">
                    <table class="table table-hover" 
                        id="tableRequestAssets">
                        <thead>
                            <tr>
                                <th>Asset Code</th>
                                <th>Asset Name</th>
                                <th>Asset Classification</th>
                                <th>UOM</th>
                                <th>Quantity</th>
                                <th>Candidate Vendors ${!readOnly ? "<code>*</code>" : ""}</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END GET REQUEST ASSETS DISPLAY -----


    // ----- GET REQUEST ITEMS DISPLAY -----
    function getRequestItemsDisplay(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        let {
            bidRecapID,
			changeRequestID,
            inventoryValidationID,
            bidRecapStatus
        } = data && data[0];

        let requestItems = [];
        if (bidRecapID) {
			if (changeRequestID) {
				requestItems = getTableData(
					`ims_request_items_tbl`,
					`*`,
					`bidRecapID = ${bidRecapID}
					AND changeRequestID = ${changeRequestID}
					AND inventoryValidationID = ${inventoryValidationID}
					AND purchaseRequestID IS NULL`
				);
			} else {
				requestItems = getTableData(
					`ims_request_items_tbl`,
					`*`,
					`bidRecapID = ${bidRecapID}
					AND inventoryValidationID = ${inventoryValidationID}
					AND purchaseRequestID IS NULL`
				);
			}
        }

        let tableRowHTML = "";
        requestItems.map(item => {
            tableRowHTML += getTableRow("Items", item, readOnly);
        })

		let buttonGenerateFinalQuoteDisplay = !readOnly ? `
			<button class="btn btn-info btnGenerateFinalQuote"
				bidRecapID="${bidRecapID}"
				classification="Items"
				id="btnItemFinalQuote"
				revise="${isRevise}"
				cancel="${isFromCancelledDocument}"
				disabled>
				<i class="fas fa-cloud-upload-alt"></i> Generate Final Quote
			</button>` : "";

        let html = `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <div class="row align-items-center">
                    <div class="col-md-6 col-sm-12 text-left">
                        <h5 style="font-weight: bold;
                            letter-spacing: 0.05rem;">ITEMS</h5>
                    </div>
                    <div class="col-md-6 col-sm-12 text-right">
						${buttonGenerateFinalQuoteDisplay}
					</div>
                </div>
            </div>
            <div class="card-body">
                <div class="w-100">
                    <table class="table table-hover" 
                        id="tableRequestItems">
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Item Classification</th>
                                <th>UOM</th>
                                <th>Quantity</th>
                                <th>Candidate Vendors ${!readOnly ? "<code>*</code>" : ""}</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRowHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END GET REQUEST ITEMS DISPLAY -----


	// ----- GET FINAL QUOTE DATA -----
	function getFinalQuoteData(classification = "", bidRecapID = 0) {
		let result = [];
		$.ajax({
			method: "post",
			url: `bid_recap/getFinalQuote`,
			async: false,
			data: { classification, bidRecapID },
			dataType: "json",
			success: function(data) {
				result = data;
			}
		})
		return result;
	}
	// ----- END GET FINAL QUOTE DATA -----


	// ----- GET FINAL QUOTE TABLE ROW -----
	function getFinalQuoteTableRow(classification = "", data = false) {
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
               remarks,
               forPurchase = 0,
               unitCost,
               totalCost,
            } = data;

            if (forPurchase && forPurchase > 0) {
                html = `
                <tr requestItemAssetID="${requestItemID}"
					itemAssetID="${itemID}"
                    class="request-finalquote">
                    <td>${itemCode || "-"}</td>
                    <td>
                        <div>${itemName || "-"}</div>
                        <small>${itemBrandName}</small>
                    </td>
                    <td>
                        <div>${itemClassification || "-"}</div>
                        <small>${itemCategory}</small>
                    </td>
                    <td class="text-center">${itemUom || "-"}</td>
                    <td class="text-center">${formatAmount((forPurchase || "0"))}</td>
                    <td class="text-right">${formatAmount((unitCost || "0"), true)}</td>
                    <td class="text-right">${formatAmount((totalCost || "0"), true)}</td>
                    <td>${remarks || "-"}</td>
                </tr>`;
            }
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
				remarks,
				forPurchase = 0,
				unitCost,
				totalCost
			} = data;
 
			 if (forPurchase && forPurchase > 0) {
				html = `
				<tr requestItemAssetID="${requestAssetID}"
					itemAssetID="${assetID}"
					class="request-finalquote">
					<td>${assetCode || "-"}</td>
					<td>
						<div>${assetName || "-"}</div>
						<small>${assetBrandName}</small>
					</td>
					<td>
						<div>${assetClassification || "-"}</div>
						<small>${assetCategory}</small>
					</td>
					<td class="text-center">${assetUom || "-"}</td>
					<td class="text-center forPurchase">${formatAmount((forPurchase || "0"))}</td>
					<td class="text-right">${formatAmount((unitCost || "0"), true)}</td>
					<td class="text-right">${formatAmount((totalCost || "0"), true)}</td>
					<td>${remarks || "-"}</td>
				</tr>`;
			 }
        }
        return html;
	}
	// ----- END GET FINAL QUOTE TABLE ROW -----


	// ----- GET FINAL QUOTE DISPLAY -----
	function getFinalQuoteDisplay(classification = "", bidRecapID = 0, readOnly = false) {
		const finalQuoteData = getFinalQuoteData(classification, bidRecapID);

		let html = ``;
		finalQuoteData.map((finalQuote, i) => {

			const {
				bidRecapID,
				inventoryVendorID,   
				vendorName,          
				vendorCode,          
				vendorAddress,        
				vendorContactDetails,
				vendorContactPerson, 
				finalQuoteRemarks,
				finalQuoteTotal,
				data = [],
			} = finalQuote;

			let grandTotalCost = 0;
			let requestItemsHTML = "";
			data.map(item => {
				const { totalCost = 0 } = item;
				grandTotalCost += (+totalCost);
				requestItemsHTML += getFinalQuoteTableRow(classification, item);
			})

			if (data && data.length > 0) {
				if (classification == "Items") {
					html += `
					<div class="card finalQuoteVendors"
						classification="Items"
						inventoryVendorID="${inventoryVendorID}">
						<div class="card-header bg-primary text-white">
							<div class="row align-items-center">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">${vendorName} (${classification})</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right">
								</div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100">
	
								<div class="form-group">
									<label>Description ${!readOnly ? "<code>*</code>" : ""}</label>
									<textarea class="form-control validate"
										data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
										minlength="1"
										maxlength="200"
										name="reason"
										required
										rows="4"
										classification="${classification}"
										bidRecapID="${bidRecapID}"
										inventoryVendorID="${inventoryVendorID}"
										vendorName="${vendorName}"    
										vendorCode="${vendorCode}"    
										vendorAddress="${vendorAddress}"    
										vendorContactDetails="${vendorContactDetails}"    
										vendorContactPerson="${vendorContactPerson}" 
										style="resize:none;"
										${!readOnly ? "" : "disabled"}>${finalQuoteRemarks || ""}</textarea>
									<div class="d-block invalid-feedback"></div>
								</div>
	
								<table class="table table-hover tableFinalQuote" 
									id="tableFinalQuoteRequestItems${Math.random().toString().replaceAll(".", "")}">
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
										${requestItemsHTML}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer text-right">
							<h5 class="font-weight-bold">GRAND TOTAL: <span class="text-danger grandTotalCost" style="font-size: 1.1em">${formatAmount((finalQuoteTotal || grandTotalCost), true)}</span></h5>
						</div>
					</div>`;
				} else if (classification == "Assets") {
					html += `
					<div class="card finalQuoteVendors" 
						classification="Assets"
						inventoryVendorID="${inventoryVendorID}">
						<div class="card-header bg-primary text-white">
							<div class="row align-items-center">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">${vendorName} (${classification})</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right">
								</div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100">
	
								<div class="form-group">
									<label>Description ${!readOnly ? "<code>*</code>" : ""}</label>
									<textarea class="form-control validate"
										data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
										minlength="1"
										maxlength="200"
										name="reason"
										required
										rows="4"
										classification="${classification}"
										bidRecapID="${bidRecapID}"
										inventoryVendorID="${inventoryVendorID}"
										vendorName="${vendorName}"    
										vendorCode="${vendorCode}"    
										vendorAddress="${vendorAddress}"    
										vendorContactDetails="${vendorContactDetails}"    
										vendorContactPerson="${vendorContactPerson}" 
										style="resize:none;"
										${!readOnly ? "" : "disabled"}>${finalQuoteRemarks || ""}</textarea>
									<div class="d-block invalid-feedback"></div>
								</div>
	
								<table class="table table-hover tableFinalQuote" 
									id="tableFinalQuoteRequestAssets${Math.random().toString().replaceAll(".", "")}">
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
										${requestItemsHTML}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer text-right">
							<h5 class="font-weight-bold">GRAND TOTAL: <span class="text-danger grandTotalCost" style="font-size: 1.1em">${formatAmount((finalQuoteTotal || grandTotalCost), true)}</span></h5>
						</div>
					</div>`;
				}
			}
			
		})
		return html;
	}
	// ----- END GET FINAL QUOTE DISPLAY -----


	// ----- NO DATA AVAILABLE DISPLAY -----
	function noDataAvailableDisplay() {
		const hasDisplay = (elementID) => {
			return $(`#${elementID}`).text().replaceAll("\n", "").trim().length > 0;
		}
		const itemFinalQuote  = hasDisplay("itemFinalQuoteDisplay");
		const assetFinalQuote = hasDisplay("assetFinalQuoteDisplay");
		if (!itemFinalQuote && !assetFinalQuote) {
			let html = `
			<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/no-data.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="No data available.">
                <span class="font-weight-bold">No data available.</span>
            </div>`;
			$("#noDataAvailableDisplay").html(html);
		} else {
			$("#noDataAvailableDisplay").empty();
		}
	}
	// ----- END NO DATA AVAILABLE DISPLAY -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
            bidRecapID,
            bidRecapCode,
            reviseBidRecapID,
            reviseBidRecapCode,
            inventoryValidationID,
            inventoryValidationCode,
            changeRequestID,
            changeRequestCode,
            timelineBuilderID,
            projectCode,
            projectName,
            projectCategory,
            clientCode,
            clientName,
            clientAddress,
            employeeID,
            bidRecapReason,
            approversID,
            approversDate,
            approversStatus,
            bidRecapStatus,
            bidRecapRemarks,
			itemFinalQuoteStatus  = "0",
			assetFinalQuoteStatus = "0",
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

		$(".btnBack").attr("bidRecapID", encryptString(bidRecapID));
		$(".btnBack").attr("status", bidRecapStatus);
		$(".btnBack").attr("employeeID", employeeID);
		$(".btnBack").attr("cancel", isFromCancelledDocument);
		$(".btnBack").attr("bidRecapCode", bidRecapCode);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let finalQuoteTitle = itemFinalQuoteStatus == "0" || assetFinalQuoteStatus == "1" ? `
			<div class="pb-4">
				<h3 class="font-weight-bold">FINAL QUOTE </h3>
				<h5><b class="font-weight-bold text-warning">NOTE: </b><span>All final quote are based on the selected vendors in each and every items.</span></h5>
			</div>` : "";

		let reviseDocumentNo    = isRevise ? bidRecapID : reviseBidRecapID;
		let documentHeaderClass = isRevise || reviseBidRecapID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBidRecapID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBidRecapID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${(reviseBidRecapCode || (isRevise && bidRecapCode)) || "---"}
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
							${bidRecapID && !isRevise ? bidRecapCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${bidRecapStatus && !isRevise ? getStatusStyle(bidRecapStatus, true) : "---"}
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
								${getDateApproved(bidRecapStatus, approversID, approversDate)}
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
							${bidRecapRemarks && !isRevise ? bidRecapRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_bid_recap">

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
					<input type="text"
						name="bidRecapID"
						class="form-control validate"
						disabled
						value="${(changeRequestCode || inventoryValidationCode) || "-"}">
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
                    <label>Description </label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="bidRecapReason"
                        name="bidRecapReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled>${bidRecapReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-bidRecapReason"></div>
                </div>
            </div>

            <div class="col-12 mt-4">
                ${getRequestItemsDisplay(data, readOnly, isRevise, isFromCancelledDocument)}
                ${getRequestAssetsDisplay(data, readOnly, isRevise, isFromCancelledDocument)}
            </div>

			<div class="col-12 border-top pt-4" id="tableFinalQuoteParent">
				<div id="finalQuoteTitle">
					${finalQuoteTitle}
				</div>
				<div id="noDataAvailableDisplay"></div>
				<div id="itemFinalQuoteDisplay">
					${getFinalQuoteDisplay("Items", bidRecapID, readOnly)}
				</div>
				<div id="assetFinalQuoteDisplay">
					${getFinalQuoteDisplay("Assets", bidRecapID, readOnly)}
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
			
			updateTableItems();
			updateInvetoryVendorDisplay(readOnly);
			updateButtonGenerateFinalQuote();
			noDataAvailableDisplay();

			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('.btnBack').attr("status", "2");
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


    // ----- UPDATE INVENTORY VENDOR OPTIONS -----
    function updateInventoryVendorOptions(classification = "", itemAssetID = 0, executeOnce = false) {
        let vendorIDArr = [];
		let elementID   = [];

		$(`[classification="${classification}"][itemAssetID="${itemAssetID}"][name="inventoryVendorID"]`).each(function() {
			const vendorID = $(this).val();
			vendorIDArr.push(vendorID);
			elementID.push(`#${this.id}`);
			if (vendorID && vendorID != null && !executeOnce) {
				$(this).trigger("change");
			}
		}) 

		let vendorList = inventorVendorPriceList.filter(data => data.classification == classification && data.itemAssetID == itemAssetID);
			vendorList = vendorList?.[0]?.priceList ?? [];

		elementID.map((element, index) => {
			let html = `<option selected disabled>Select Vendor Name</option>`;

            vendorList
                .filter(item => !vendorIDArr.includes(item.inventoryVendorID) || item.inventoryVendorID == vendorIDArr[index])
                .map(vendor => {

                let {
                    inventoryVendorID,
                    inventoryVendorCode,
                    inventoryVendorName,
                    vendorPrice,
					preferred = 0
                } = vendor;

                html += `
                <option value="${inventoryVendorID}"
                    vendorCode="${inventoryVendorCode}"
                    vendorName="${inventoryVendorName}"
                    vendorPrice="${vendorPrice}"
                    ${inventoryVendorID == vendorIDArr[index] ? "selected" : ""}>
                    ${inventoryVendorName}
                </option>`;
            });

            $(element).html(html);
        })
    }
    // ----- END UPDATE INVENTORY VENDOR OPTIONS -----


	// ----- UPDATE INVENTORY VENDOR DISPLAY -----
	function updateInvetoryVendorDisplay(readOnly = false) {
		$(`#tableRequestItems tbody tr.request`).each(function() {
			const itemAssetID = $(this).attr("itemAssetID");
			!readOnly && updateInventoryVendorOptions("Items", itemAssetID);
		})
		$(`#tableRequestAssets tbody tr.request`).each(function() {
			const itemAssetID = $(this).attr("itemAssetID");
			!readOnly && updateInventoryVendorOptions("Assets", itemAssetID);
		})
	}
	// ----- END UPDATE INVENTORY VENDOR DISPLAY -----


	// ----- GET REQUEST ITEM ASSET DATA -----
	function getRequestItemAssetData(classification = "") {
		let data = [];
		if (classification == "Items") {
			$(`#tableRequestItems tbody tr.request`).each(function(i) {
				const requestItemAssetID = $(this).attr("requestItemAssetID");
	
				let vendorArr = []; 
				let selectedVendorArr = [];
				let vendorNameArr = [];
				let vendorPriceArr = [];
				$(`[name="selectedVendor"]`, this).each(function() {
					const selectedVendorID = $(this).prop("checked") ? 1 : 0;
					selectedVendorArr.push(selectedVendorID);
				})
				selectedVendorArr = selectedVendorArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const inventoryVendorID = $(this).val() || 0;
					vendorArr.push(inventoryVendorID);
				})
				vendorArr = vendorArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const vendorName = $(`option:selected`, this).attr("vendorName") || "";
					vendorNameArr.push(vendorName);
				})
				vendorNameArr = vendorNameArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const vendorPrice = $(`option:selected`, this).attr("vendorPrice") || "";
					vendorPriceArr.push(vendorPrice);
				})
				vendorPriceArr = vendorPriceArr.join("|");
	
				$vendorParent = $(`[name="selectedVendor"]:checked`, this).closest("tr");
				const vendorID    = $vendorParent.find(`[name="inventoryVendorID"]`).val() || 0;
				const vendorCode  = $vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorCode") || "";
				const vendorName  = $vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorName") || "";
				const vendorPrice = +$vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorPrice") || 0;
				const forPurchase = getNonFormattedAmount($(this).closest("tr").find(`td.forPurchase`).text()) || 0;
				const totalCost   = vendorPrice * forPurchase;                
	
	
				let temp = { 
					requestItemAssetID,
					candidateVendorID:       vendorArr,
					candidateSelectedVendor: selectedVendorArr,
					candidateVendorName:     vendorNameArr,
					candidateVendorPrice:    vendorPriceArr,
					inventoryVendorID:       vendorID,
					inventoryVendorCode:     vendorCode,
					inventoryVendorName:     vendorName,
					unitCost:                vendorPrice,
					totalCost,
					forPurchase
				};
				data.push(temp);
			})
		} else if (classification == "Assets") {
			$(`#tableRequestAssets tbody tr.request`).each(function(i) {
                const requestItemAssetID = $(this).attr("requestItemAssetID");

				let vendorArr         = []; 
				let selectedVendorArr = [];
				let vendorNameArr     = [];
				let vendorPriceArr    = [];
				$(`[name="selectedVendor"]`, this).each(function() {
					const selectedVendorID = $(this).prop("checked") ? 1 : 0;
					selectedVendorArr.push(selectedVendorID);
				})
				selectedVendorArr = selectedVendorArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const inventoryVendorID = $(this).val() || 0;
					vendorArr.push(inventoryVendorID);
				})
				vendorArr = vendorArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const vendorName = $(`option:selected`, this).attr("vendorName") || "";
					vendorNameArr.push(vendorName);
				})
				vendorNameArr = vendorNameArr.join("|");
				$(`[name="inventoryVendorID"]`, this).each(function() {
					const vendorPrice = $(`option:selected`, this).attr("vendorPrice") || "";
					vendorPriceArr.push(vendorPrice);
				})
				vendorPriceArr = vendorPriceArr.join("|");
	
				$vendorParent = $(`[name="selectedVendor"]:checked`, this).closest("tr");
				const vendorID    = $vendorParent.find(`[name="inventoryVendorID"]`).val() || 0;
				const vendorCode  = $vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorCode") || "";
				const vendorName  = $vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorName") || "";
				const vendorPrice = +$vendorParent.find(`[name="inventoryVendorID"] option:selected`).attr("vendorPrice") || 0;
				const forPurchase = getNonFormattedAmount($(this).closest("tr").find(`td.forPurchase`).text()) || 0;
				const totalCost   = vendorPrice * forPurchase;                 


                let temp = { 
                    requestItemAssetID,
					candidateVendorID:       vendorArr,
					candidateSelectedVendor: selectedVendorArr,
					candidateVendorName:     vendorNameArr,
					candidateVendorPrice:    vendorPriceArr,
                    inventoryVendorID:       vendorID,
                    inventoryVendorCode:     vendorCode,
                    inventoryVendorName:     vendorName,
                    unitCost:                vendorPrice,
                    totalCost,
                    forPurchase
                };
                data.push(temp);
			})
		}
		return data;
	}
	// ----- END GET REQUEST ITEM ASSET DATA -----


	// ----- GET REQUEST FINAL QUOTE DATA -----
	function getRequestFinalQuoteData() {
		let data = [];
		$(`[name="reason"]`).each(function() {
			const reason               = $(this).val()?.trim();
			const classification       = $(this).attr("classification");
			const bidRecapID           = $(this).attr("bidRecapID");
			const inventoryVendorID    = $(this).attr("inventoryVendorID");
			const vendorCode           = $(this).attr("vendorCode");
			const vendorName           = $(this).attr("vendorName");
			const vendorAddress        = $(this).attr("vendorAddress");
			const vendorContactDetails = $(this).attr("vendorContactDetails");
			const vendorContactPerson  = $(this).attr("vendorContactPerson");

			$parent = $(this).closest(".card");
			const grandTotalCost = getNonFormattedAmount($parent.find(`.grandTotalCost`).text() || "0");

			let temp = {
				bidRecapID,
				classification,
				inventoryVendorID,
				vendorCode,
				vendorName,
				vendorAddress,
				vendorContactDetails,
				vendorContactPerson,
				finalQuoteRemarks: reason,
				finalQuoteTotal:   grandTotalCost
			}
			data.push(temp);
		})
		return data;
	}
	// ----- END GET REQUEST FINAL QUOTE DATA -----


    // ----- GET BID RECAP DATA -----
	function getBidRecapData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

        let data = { 
			items:      getRequestItemAssetData("Items"), 
			assets:     getRequestItemAssetData("Assets"),
			finalquote: getRequestFinalQuoteData(),
			employeeID: sessionID
		};
        const approversID = method != "approve" && moduleApprover;

        if (id) {
            data.bidRecapID = id;

            if (status != "2") {
                data.bidRecapStatus = status;
            }
        }

		data.action    = action;
		data.method    = method;
		data.updatedBy = sessionID;

		if (currentStatus == "0" && method != "approve") {

			if (action == "insert") {
				data.createdBy = sessionID;
				data.createdAt = dateToday();
			} else if (action == "update") {
				data.bidRecapID = id;
			}

			if (method == "submit") {
				data.submittedAt = dateToday();
				if (approversID) {
					data.approversID = approversID;
					data.bidRecapStatus = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data.approversID = sessionID;
					data.approversStatus = 2;
					data.approversDate = dateToday();
					delete data["bidRecapStatus"];
					data.bidRecapStatus = 2;
				}
			}
		} 

		return data;
	}
	// ----- END GET BID RECAP DATA -----


    // ----- VALIDATE TABLE -----
    function validateTableRequest(classification = "") {
        let flag = 0;
		if (classification) {
			if (classification == "Items") {
				$(`#tableRequestItems tbody tr.request`).each(function() {
					let hasCheck = $(`[type="checkbox"]:checked`, this).length > 0;
					if (!hasCheck) flag++;
				})
			} else if (classification == "Assets") {
				$(`#tableRequestAssets tbody tr.request`).each(function() {
					let hasCheck = $(`[type="checkbox"]:checked`, this).length > 0;
					if (!hasCheck) flag++;
				})
			}
		} else {
			$(`#tableRequestItems tbody tr.request`).each(function() {
				let hasCheck = $(`[type="checkbox"]:checked`, this).length > 0;
				if (!hasCheck) flag++;
			})
			$(`#tableRequestAssets tbody tr.request`).each(function() {
				let hasCheck = $(`[type="checkbox"]:checked`, this).length > 0;
				if (!hasCheck) flag++;
			})
		}
        return flag == 0;
    }
    // ----- END VALIDATE TABLE -----


	// ----- VALIDATE FINAL QUOTE -----
	function validateFinalQuote() {
		const requestLength = $(`tr.request`).length;
		const finalQuoteRequestLength = $(`tr.request-finalquote`).length;
		return requestLength == finalQuoteRequestLength;
	}
	// ----- END VALIDATE FINAL QUOTE -----


    // ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- UPDATE BUTTON GENERATE FINAL QUOTE -----
	function updateButtonGenerateFinalQuote(classification = "") {
		const manipulate = (clss = "") => {
			const table = clss == "Items" ? "tableRequestItems" : "tableRequestAssets";
			const count = $(`#${table} tbody tr.request`).length;
	
			let temp = 0;
			$(`#${table} tbody tr.request`).each(function() {
				let hasVendor = $(`[type="checkbox"]:checked`, this).length > 0;
				hasVendor && temp++;
			})
		
			if (temp > 0 && temp == count) {
				$(`.btnGenerateFinalQuote[classification="${clss}"]`).removeAttr("disabled");
			} else {
				$(`.btnGenerateFinalQuote[classification="${clss}"]`).attr("disabled", true);
			}
		}

		if (classification) {
			manipulate(classification);
		} else {
			["Items", "Assets"].map(clss => manipulate(clss));
		}
	}
	// ----- END UPDATE BUTTON GENERATE FINAL QUOTE -----


	// ----- CHECK FINAL QUOTE VENDORS -----
	function checkFinalQuoteVendors() {
		let selectedItemVendorID = [], selectedAssetVendorID = [];
		let uniqueItemVendorID = [], uniqueAssetVendorID = [];

		let finalQuoteItemVendorID = [], finalQuoteAssetVendorID = [];
		let uniqueFinalQuoteItemVendorID = [], uniqueFinalQuoteAssetVendorID = [];

		$(`[name="selectedVendor"][classification="Items"]:checked`).each(function() {
			const inventoryVendorID = $(this).attr("inventoryVendorID");
			inventoryVendorID && selectedItemVendorID.push(inventoryVendorID);
		})
		uniqueItemVendorID = [...new Set(selectedItemVendorID)];

		$(`[name="selectedVendor"][classification="Assets"]:checked`).each(function() {
			const inventoryVendorID = $(this).attr("inventoryVendorID");
			inventoryVendorID && selectedAssetVendorID.push(inventoryVendorID);
		})
		uniqueAssetVendorID = [...new Set(selectedAssetVendorID)];

		$(`.finalQuoteVendors[classification="Items"]`).each(function() {
			const inventoryVendorID = $(this).attr("inventoryVendorID");
			inventoryVendorID && finalQuoteItemVendorID.push(inventoryVendorID);
		})
		uniqueFinalQuoteItemVendorID = [...new Set(finalQuoteItemVendorID)];

		$(`.finalQuoteVendors[classification="Assets"]`).each(function() {
			const inventoryVendorID = $(this).attr("inventoryVendorID");
			inventoryVendorID && finalQuoteAssetVendorID.push(inventoryVendorID);
		})
		uniqueFinalQuoteAssetVendorID = [...new Set(finalQuoteAssetVendorID)];

		let itemFlag = true, assetFlag = true;
		uniqueItemVendorID.map(vendorID => {
			if (!uniqueFinalQuoteItemVendorID.includes(vendorID)) {
				itemFlag = false;
			}
		})
		uniqueAssetVendorID.map(vendorID => {
			if (!uniqueFinalQuoteAssetVendorID.includes(vendorID)) {
				assetFlag = false;
			}
		})

		if (!itemFlag) {
			showNotification("danger", "Final quote for items doesn't match on selected vendors.<br> Please try to generate again.");
		}
		if (!assetFlag) {
			showNotification("danger", "Final quote for assets doesn't match on selected vendors.<br> Please try to generate again.");
		}

		return itemFlag && assetFlag;
	}
	// ----- END CHECK FINAL QUOTE VENDORS -----


    // ----- SELECT PREFERRED VENDOR -----
    $(document).on("change", `[name="selectedVendor"]`, function(e) {
		const classification    = $(this).attr("classification");
        const inventoryVendorID = $(this).closest("tr").find(`[name="inventoryVendorID"]`).val();
        if (inventoryVendorID && inventoryVendorID != "Select Vendor Name") {
            $parent = $(this).closest("tbody");
            $parent.find(`[name="selectedVendor"]`).not(this).prop('checked', false); 
        } else {
            $(this).prop("checked", false);
        }
		updateButtonGenerateFinalQuote(classification);
    })
    // ----- SELECT PREFERRED VENDOR -----


    // ----- SELECT VENDOR NAME -----
    $(document).on("change", `[name="inventoryVendorID"]`, function() {
		const inventoryVendorID = $(this).val();
        const classification    = $(this).attr("classification");
        const itemAssetID       = $(this).attr("itemAssetID");
        updateInventoryVendorOptions(classification, itemAssetID, true);

        const vendorPrice = $(`option:selected`, this).attr("vendorPrice");
        $parent = $(this).closest("tr");
        $parent.find(".vendorPrice").text(formatAmount(vendorPrice, true));
		$parent.find(`[name="selectedVendor"]`).attr("inventoryVendorID", inventoryVendorID);
    })
    // ----- EMD SELECT VENDOR NAME -----


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


	// ----- GENERATE FINAL QUOTE -----
	$(document).on("click", ".btnGenerateFinalQuote", function() {
		const bidRecapID     = $(this).attr("bidRecapID");
		const classification = $(this).attr("classification");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise         = $(this).attr("revise") == "true";
		if (classification) {
			const checkTableRequestItems = validateTableRequest(classification);
			if (checkTableRequestItems) {
				const tableID   = classification == "Items" ? "tableRequestItems" : "tableRequestAssets";
				const checkForm = validateForm(tableID);
				removeIsValid();
				if (checkForm) {
					const action = revise && !isFromCancelledDocument && "insert" || (bidRecapID ? "update" : "insert");
					generateFinalQuote(action, classification, bidRecapID);
				}
			} else {
				showNotification("danger", "Please select preferred vendor in each items.");
			}
		}
	})
	// ----- END GENERATE FINAL QUOTE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("bidRecapID"));
		const code          = $(this).attr("bidRecapCode");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const checkForm     = validateForm("form_bid_recap");
		const checkTable    = validateTableRequest();
		const checkFinalQuote = validateFinalQuote();
        removeIsValid();

		if (checkForm) {
            if (checkTable) {
				if (checkFinalQuote) {
					if (checkFinalQuoteVendors()) {
						const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
						const data = getBidRecapData(action, "submit", "1", id);
			
						if (revise) {
							if (!isFromCancelledDocument) {
								data.revisePurchaseRequestID   = id;
								data.reviseBidRecapCode = code;
								delete data["bidRecapID"];
							}
						}
			
						const employeeID = getNotificationEmployeeID(data["approversID"], data["approversDate"], true);
						let notificationData = false;
						if (employeeID != sessionID) {
							notificationData = {
								moduleID:                40,
								notificationTitle:       "Bid Recap",
								notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
								notificationType:        2,
								employeeID,
							};
						}
			
						saveBidRecap(data, "submit", notificationData, pageContent, code);
					}
				} else {
					showNotification("danger", "Invalid final quote!");
				}
            } else {
                showNotification("danger", "Please select preferred vendor in each items.");
            }
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("bidRecapID"));
		const status = $(this).attr("status");
		const code   = $(this).attr("bidRecapCode");
		const action = "update";
		const data   = getBidRecapData(action, "cancelform", "4", id, status);

		saveBidRecap(data, "cancelform", null, pageContent, code);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", ".btnBack", function () {
		const id         = decryptString($(this).attr("bidRecapID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const status     = $(this).attr("status");
		const code       = $(this).attr("bidRecapCode");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !fromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data = getBidRecapData(action, "save", "0", id, status);
				data["employeeID"] = employeeID;
				if (!fromCancelledDocument) {
					delete data["bidRecapID"];
					data["reviseBidRecapID"] = id;
				} else {
					delete data["action"];
					data["bidRecapStatus"] = 0;
					data["action"]         = "update";
				}
	
				saveBidRecap(data, "save", null, pageContent, code);
			} else {
				$("#page_content").html(preloader);
				setTimeout(() => {
					pageContent();
		
					if (employeeID != sessionID) {
						$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
					}
				}, 10);
			}

		} else {
			const action = "update";
			const data   = getBidRecapData(action, "save", "0", id, status);
			data["bidRecapStatus"] = 0;

			saveBidRecap(data, "save", null, pageContent, code);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id     = decryptString($(this).attr("bidRecapID"));
		const status = $(this).attr("status");
		const code    = $(this).attr("bidRecapCode");
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		if (status == "4") {
			$("#page_content").html(preloader);
			setTimeout(() => {
				viewDocument(id, false, true, fromCancelledDocument);
			}, 10);
		} else {
			const confirmation = getConfirmation("revise");
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `bid_recap/reviseBidRecap`,
						data:        { bidRecapID: id },
						cache:       false,
						async:       false,
						dataType:    "json",
						beforeSend: function() {
							$("#loader").show();
						},
						success: function(data) {
							let result = data.split("|");
							setTimeout(() => {
								$("#loader").hide();
								let isSuccess   = result[0];
								let feedback   = code || (result[1] || "Bid Recap");
								let insertedID  = result[2];
								let dateCreated = result[3];
				
								if (isSuccess == "true") {
									showNotification("success", `${feedback} revised successfully!`);
									viewDocument(insertedID);
								} else {
									Swal.fire({
										icon:              "danger",
										title:             "There's an error revising bid recap",
										showConfirmButton: false,
										timer:             2000,
									});
								}
							}, 500);
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
				}
			});
		}
	});
	// ----- END REVISE DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id   = decryptString($(this).attr("bidRecapID"));
		const code = $(this).attr("bidRecapCode");
		let tableData  = getTableData("ims_bid_recap_tbl", "", "bidRecapID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getBidRecapData("update", "approve", "2", id);
			delete data["items"];
			delete data["assets"];
			delete data["finalquote"];
			let dateApproved = updateApproveDate(approversDate)
			data.approversStatus = updateApproveStatus(approversStatus, 2);
			data.approversDate   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                40,
					tableID:                 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${code}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                40,
					tableID:                 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.bidRecapStatus = status;

			saveBidRecap(data, "approve", notificationData, pageContent, code);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id   = decryptString($(this).attr("bidRecapID"));
		const code = $(this).attr("bidRecapCode");

		$("#modal_bid_recap_content").html(preloader);
		$("#modal_bid_recap .page-title").text("DENY BID RECAP");
		$("#modal_bid_recap").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="bidRecapRemarks"
					name="bidRecapRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-bidRecapRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" 
				class="btn btn-danger px-5 p-2" 
				id="btnRejectConfirmation"
				bidRecapID="${encryptString(id)}"
				bidRecapCode="${code}">
				<i class="far fa-times-circle"></i> Deny
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2"
				data-dismiss="modal">
				<i class="fas fa-ban"></i> Cancel
			</button>
		</div>`;
		$("#modal_bid_recap_content").html(html);
		$(`[name="bidRecapRemarks"]`).focus();
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id   = decryptString($(this).attr("bidRecapID"));
		const code = $(this).attr("bidRecapCode");

		const validate = validateForm("modal_bid_recap");
		if (validate) {
			let tableData = getTableData("ims_bid_recap_tbl", "", "bidRecapID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {
					action:          "update",
					method:          "deny",
					bidRecapID:      id,
					approversStatus: updateApproveStatus(approversStatus, 3),
					approversDate:   updateApproveDate(approversDate),
					bidRecapRemarks: $(`[name="bidRecapRemarks"]`).val()?.trim(),
					updatedBy:       sessionID,
				}

				let notificationData = {
					moduleID:                40,
					tableID: 				 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${code}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveBidRecap(data, "deny", notificationData, pageContent, code);
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
		const title = "Bid Recap";
		let swalText, swalImg;

		$("#modal_bid_recap").text().length > 0 && $("#modal_bid_recap").modal("hide");

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
			case "finalquote":
				swalTitle = `GENERATE FINAL QUOTE`;
				swalText  = "Are you sure to generate final quote?";
				swalImg   = `${base_url}assets/modal/generate.svg`;
				break;
			case "revise":
				swalTitle = `REVISE ${title.toUpperCase()}`;
				swalText  = "Are you sure to revise this document?";
				swalImg   = `${base_url}assets/modal/revise.svg`;
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


    // ----- SAVE BID RECAP -----
    function saveBidRecap(data = null, method = "submit", notificationData = null, callback = null, feedback = "") {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `bid_recap/saveBidRecap`,
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
							let code        = result[1] || (feedback || "Bid Recap");
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
							$("#modal_bid_recap").text().length > 0 && $("#modal_bid_recap").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_bid_recap").text().length > 0 && $("#modal_bid_recap").modal("show");
						}
					}
				}
			});
		}
		return false;
	}
    // ----- END SAVE BID RECAP -----


	// ----- GENERATE FINAL QUOTE -----
	function generateFinalQuote(action = "", classification = "", bidRecapID = 0) {
		if (classification && bidRecapID) {
			const confirmation = getConfirmation("finalquote");
			confirmation.then(res => {
				if (res.isConfirmed) {
					const data = {
						items: getRequestItemAssetData(classification),
						classification,
						bidRecapID,
						action
					}

					$.ajax({
						method:      "POST",
						url:         `bid_recap/generateFinalQuote`,
						data,
						cache:       false,
						async:       false,
						dataType:    "json",
						beforeSend: function() {
							$("#loader p").text("Generating final quote...");
							$("#loader").show();
						},
						success: function(data) {
							if (data == true) {
								let elementID = classification == "Items" ? "itemFinalQuoteDisplay" : "assetFinalQuoteDisplay";
								$(`#${elementID}`).html(preloader);
								setTimeout(() => {
									$("#loader").hide();
									$("#loader p").text("Saving...");

									showNotification("success", "Final quote generated successfully!");

									let finalQuoteTitle = `
									<div class="pb-4">
										<h3 class="font-weight-bold">FINAL QUOTE: </h3>
										<h5><b class="font-weight-bold text-warning">NOTE: </b><span>All final quote are based on the selected vendors in each and every items.</span></small>
									</div>`;

									let html = getFinalQuoteDisplay(classification, bidRecapID)
									$(`#${elementID}`).html(html);
									updateTableItems();
									$(".tableFinalQuote").each(function() {
										const tableBodyOptions = {
											proccessing:    false,
											serverSide:     false,
											scrollX:        true,
											sorting:        false,
											searching:      false,
											paging:         false,
											ordering:       false,
											info:           false,
											scrollCollapse: true,
											columnDefs:     [
												{ targets: 0,  width: 150 },
												{ targets: 1,  width: 180 },
												{ targets: 2,  width: 180 },
												{ targets: 3,  width: 100 },
												{ targets: 4,  width: 100 },
												{ targets: 5,  width: 150 },
												{ targets: 6,  width: 150 },
												{ targets: 7,  width: 250 },
											],
										};
										activateDatatable(this.id, tableBodyOptions);
									})

									if ($("#finalQuoteTitle").text()?.replaceAll("\n", "")?.trim().length == 0) {
										$("#finalQuoteTitle").html(finalQuoteTitle);
									}
									noDataAvailableDisplay();
								}, 10);
							} else {
								showNotification("danger", "There's an error generating final quote. Please try again.");
							}
						},
						error: function() {
							setTimeout(() => {
								$("#loader").hide();
								$("#loader p").text("Saving...");
								showNotification("danger", "System error: Please contact the system administrator for assistance!");
							}, 500);
						}
					}).done(function() {
						setTimeout(() => {
							$("#loader").hide();
							$("#loader p").text("Saving...");
							noDataAvailableDisplay();
						}, 500);
					})
				}
			})
		}
	}
	// ----- END GENERATE FINAL QUOTE -----

})