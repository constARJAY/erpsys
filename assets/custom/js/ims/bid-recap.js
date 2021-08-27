$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(40);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("bid recap");
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
					if (bidRecapStatus == 0 || bidRecapStatus == 4) {
						isAllowed = false;
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
					const isAllowed = isCreateAllowed(40);
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

	const inventoryValidationList = getTableData(
		`ims_inventory_validation_tbl`,
		"",
		`inventoryValidationStatus = 2`
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
		
		if ($.fn.DataTable.isDataTable(".project-phase-tables")) {
			$(".project-phase-tables").DataTable().destroy();
		}
		
		var table = $(".project-phase-tables")
		.css({ "min-width": "100%" })
		.removeAttr("width")
		.DataTable(bodyOptionsWithoutCheckbox);

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

		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));
		$(`.requestItemTable`).each(function() {
			const elementID = $(this).attr("id");
			const readOnly  = $(this).attr("isReadOnly") == "true";
			const materialEquipment = $(this).attr("isMaterialEquipment") == "true";
			let options = bodyOptions;
			if (materialEquipment) {
				options = bodyOptionsWithoutClassificationAndCheckbox;
			} else {
				options =  bodyOptionsWithoutCheckbox;
			}

			activateDatatable(elementID, options);
		})
	}
	// ----- END DATATABLES -----
   

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


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(40)) {
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
		let bidRecapData = getTableData(
			`ims_bid_recap_tbl AS ibrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
				LEFT JOIN ims_inventory_validation_tbl AS ivrt USING(inventoryValidationID)`,
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated, ivrt.createdAt AS ivrCreatedAt",
			`ibrt.employeeID != ${sessionID} AND bidRecapStatus != 0 AND bidRecapStatus != 4`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4, 5), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
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

		bidRecapData.map((item) => {
			let {
				fullname,
				bidRecapID,
				timelineBuilderID,
				projectCode,
				projectName,
				inventoryValidationID,
				approversID,
				approversDate,
				bidRecapStatus,
				bidRecapRemarks,
				bidRecapReason,
				submittedAt,
				createdAt,
				ivrCreatedAt
			} = item;

			let remarks       = bidRecapRemarks ? bidRecapRemarks : "-";
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
					<td>${getFormCode("BRF", createdAt, bidRecapID )}</td>
					<td>${fullname}</td>
					<td>${inventoryValidationID && inventoryValidationID != 0 ? getFormCode("IVR", ivrCreatedAt, inventoryValidationID) : '-'}</td>
					<td>
						<div>
							${projectCode || '-'}
						</div>
						<small style="color:#848482;">${bidRecapReason || '-'}</small>
					</td>
					<td>${projectName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(bidRecapStatus)}
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
		let bidRecapData = getTableData(
			`ims_bid_recap_tbl AS ibrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN ims_inventory_validation_tbl AS ivrt USING(inventoryValidationID)`,
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated, ivrt.createdAt AS ivrCreatedAt",
			`ibrt.employeeID = ${sessionID}`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4, 5), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
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

		bidRecapData.map((item) => {
			let {
				fullname,
				bidRecapID,
                timelineBuilderID,
                projectCode,
                projectName,
                inventoryValidationID,
				approversID,
				approversDate,
				bidRecapStatus,
				bidRecapRemarks,
				bidRecapReason,
				submittedAt,
				createdAt,
				ivrCreatedAt
			} = item;

			let remarks       = bidRecapRemarks ? bidRecapRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = bidRecapStatus == 2 || bidRecapStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = bidRecapStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(bidRecapID )}">
                <td>${getFormCode("BRF", createdAt, bidRecapID )}</td>
                <td>${fullname}</td>
				<td>${inventoryValidationID && inventoryValidationID != 0 ? getFormCode("IVR", ivrCreatedAt, inventoryValidationID) : '-'}</td>
				<td>
					<div>
						${projectCode || '-'}
					</div>
					<small style="color:#848482;">${bidRecapReason || '-'}</small>
				</td>
				<td>${projectName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(bidRecapStatus)}
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
				bidRecapID     = "",
				bidRecapStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (bidRecapStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						bidRecapID="${encryptString(bidRecapID)}"
						code="${getFormCode("BRF", createdAt, bidRecapID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
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
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							status="${bidRecapStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (bidRecapStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						bidRecapID="${encryptString(bidRecapID)}"
						code="${getFormCode("BRF", createdAt, bidRecapID)}"
						status="${bidRecapStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (bidRecapStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(bidRecapID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							status="${bidRecapStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (bidRecapStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_bid_recap_tbl`,
						`inventoryValidationID`,
						`bidRecapID = ${bidRecapID}`,
					);
					const { inventoryValidationID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_bid_recap_tbl`,
						`bidRecapID`,
						`bidRecapStatus <> 3 AND bidRecapStatus <> 4 AND inventoryValidationID = ${inventoryValidationID}`
					);

					if (!isDocumentRevised(bidRecapID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							status="${bidRecapStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
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
							code="${getFormCode("BRF", createdAt, bidRecapID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET INVENTORY VALIDATION LIST -----
	function getInventoryValidationList(id = null, status = 0, display = true) {
		const createdBidRecap = getTableData("ims_bid_recap_tbl", "inventoryValidationID", "bidRecapStatus <> 3 AND bidRecapStatus <> 4").map(bidRecap => bidRecap.inventoryValidationID);
		let html = ``;
		if (!status || status == 0) {
			html += inventoryValidationList.filter(ivr => createdBidRecap.indexOf(ivr.inventoryValidationID) == -1 || ivr.inventoryValidationID == id).map(ivr => {
				return `
				<option 
					value     			= "${ivr.inventoryValidationID}" 
					timelineBuilderID 	= "${ivr.timelineBuilderID}"
					purchaseRequestID 	= "${ivr.purchaseRequestID}"
					projectCode     	= "${ivr.projectCode}"
					projectName     	= "${ivr.projectName}"
					projectCategory 	= "${ivr.projectCategory}"
					clientName      	= "${ivr.clientName}"
					clientAddress   	= "${ivr.clientAddress}"
				${ivr.inventoryValidationID == id && "selected"}>
				${getFormCode("IVR", ivr.createdAt, ivr.inventoryValidationID)}
				</option>`;
			})
		} else {
			html += inventoryValidationList.map(ivr => {
				return `
				<option 
					value     = "${ivr.inventoryValidationID}" 
					timelineBuilderID = "${ivr.timelineBuilderID}"
					purchaseRequestID =	"${ivr.purchaseRequestID}"
					projectCode     = "${ivr.projectCode}"
					projectName     = "${ivr.projectName}"
					projectCategory = "${ivr.projectCategory}"
					clientName      = "${ivr.clientName}"
					clientAddress   = "${ivr.clientAddress}"
					${ivr.inventoryValidationID == id && "selected"}>
					${getFormCode("IVR", ivr.createdAt, ivr.inventoryValidationID)}
				</option>`;
			})
		}
        return display ? html : inventoryValidationList;
	}
	// ----- END GET INVENTORY VALIDATION LIST -----


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


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name=quantity]`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`.unitcost`).map(element => getNonFormattedAmount(element.innerText) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount`).text(formatAmount(totalAmount, true));
		$("#bidRecapProjectTotal").text(formatAmount(totalAmount, true));

		const projectTotal = +getNonFormattedAmount($(`#bidRecapProjectTotal`).text()); 
		const companyTotal = +getNonFormattedAmount($(`#bidRecapCompanyTotal`).text()); 
		const grandTotal   = projectTotal + companyTotal;
		$("#bidRecapGrandTotal").text(formatAmount(grandTotal, true));

		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET COST ESTIMATE REQUEST ITEMS -----
	function getCostEstimateRequestItems(isMaterialEquipment = false, data = false) {
		let html = "";
		let vendorID		= data.vendorID;
		let rowspan 		= data.rowspan;
		let vendorName 		= data.vendorName;
		let vendorTotalCost = 0;
			

		if (data) {
			let tableRowCondition 	= data["items"].length;

			for (let index = 0; index < tableRowCondition; index++) {
				var {
					forPurchase        			  = 0,
					preferredInventoryVendorPrice = 0
				} = data["items"][index];
				var preferredTotalCost 	= parseFloat(forPurchase) * parseFloat(preferredInventoryVendorPrice);
				vendorTotalCost 		+= parseFloat(preferredTotalCost);
			}


			for (let index = 0; index < tableRowCondition; index++) {

				var {
					bidRecapID 					  = "",
					requestItemID      			  = "",
					itemCode           			  = "-",
					itemName           			  = "-",
					itemClassification 			  = "-",
					forPurchase        			  = 0,
					itemUom            			  = "",
					unitCost           			  = 0,
					totalCost          			  = 0,
					preferredInventoryVendorPrice = 0
				} = data["items"][index];

				var tdVendorName 		= index == 0 ? `<td rowspan="${rowspan}" >${vendorName}</td>` : ``;
				var tdVendorTotalCost 	= index == 0 ? `<td rowspan="${rowspan}" class="text-right">${formatAmount(vendorTotalCost, true)}</td>` : ``;
				var tdClassification 	= !isMaterialEquipment ? `<td class="table-row-classification">${itemClassification || "-"}</td>` : "";
				var preferredTotalCost 	= parseFloat(forPurchase) * parseFloat(preferredInventoryVendorPrice);

				html += `
				<tr class="itemTableRow" requestItemID="${requestItemID}" vendorid="${vendorID}" vendorname="${vendorName}">
					${tdVendorName}
					<td class="table-row-item-code">${itemCode || "-"}</td>
					<td class="table-row-item-name">${itemName && itemName != "Select Item Name" ? itemName : "-"}</td>
					${tdClassification}
					<td class="text-center table-row-item-for-purchase">${formatAmount(forPurchase)}</td>
					<td class="table-row-item-uom">${itemUom || "-"}</td>
					<td class="text-right item-unit-cost">${formatAmount(bidRecapID ? unitCost : preferredInventoryVendorPrice , true)}</td>
					<td class="text-right totalcost">${formatAmount(bidRecapID ? totalCost : preferredTotalCost , true) }</td>
					${tdVendorTotalCost}
				</tr>`;	
			}
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
				const tempVendor = [], vendorItemsArray = [];
				let requestItemsHTML = "";
				
				items.map((x, i)=>{
					let vendorName = x.preferredInventoryVendorName;
					tempVendor.includes(vendorName) ? "" : tempVendor.push(vendorName);
				});
				tempVendor.map(vendorName=>{
					let vendor		= vendorName;
					let vendorID 	= "";
					let vendorItems = items.filter(y => y.preferredInventoryVendorName == vendorName).map(y => { vendorID = y.preferredInventoryVendorID; return y; });
					let vendorItemsCount = vendorItems.length;
					let vendorItemsArrayTemp = {
						"vendorID" 	:   vendorID,
						"vendorName":	vendor, 
						"rowspan" 	:	vendorItemsCount, 
						"items" 	: 	vendorItems
					};
					vendorItemsArray.push(vendorItemsArrayTemp);
				});

				vendorItemsArray.map((item, index) => {
					requestItemsHTML += getCostEstimateRequestItems(false, vendorItemsArray[index]);
				});

				milestoneHTML += requestItemsHTML ? `
				<div class="milestoneContent pt-1 pb-2">
					<div class="titleName"
						style="color: rgb(104 158 46);
							font-size: 1.05rem;
							font-weight: 700;">${name}</div>
					<table class="table table-striped requestItemTable project-phase-tables" title="${name}" isMaterialEquipment="false" isReadOnly="true" id="${(phaseDescription+index+name+index2)?.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")?.replaceAll(" ", "")?.toLowerCase()}">
						<thead>
							<tr style="white-space: nowrap">
								<th>Vendor Name</th>
								<th>Item Code</th>
								<th>Item Name</th>
								<th>Item Classification</th>
								<th>Quantity</th>
								<th>UOM</th>
								<th>Unit Cost</th>
								<th>Total Cost</th>
								<th>Total</th>
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
			let requestItemsHTML = "";
			const tempVendor = [], vendorItemsArray = [];
			items.map((x, i)=>{
				let vendorName = x.preferredInventoryVendorName;
				tempVendor.includes(vendorName) ? "" : tempVendor.push(vendorName);
			});

			tempVendor.map(vendorName=>{
				let vendor		= vendorName;
				let vendorID 	= "";
				let vendorItems = items.filter(y => y.preferredInventoryVendorName == vendorName).map(y=>{ vendorID = y.preferredInventoryVendorID; return y});
				let vendorItemsCount = vendorItems.length;
				let vendorItemsArrayTemp = {
					"vendorID" 	:   vendorID,
					"vendorName":	vendor, 
					"rowspan" 	:	vendorItemsCount, 
					"items" 	: 	vendorItems
				};
				vendorItemsArray.push(vendorItemsArrayTemp);
			});

			vendorItemsArray.map((item,index) => {	
				requestItemsHTML += getCostEstimateRequestItems(true, vendorItemsArray[index]);
			});

			// let requestItemsHTML = items.map(item => {
			// 	return getCostEstimateRequestItems(true, item);
			// }).join("");

			let classificationHTML = `
			<table class="table table-striped requestItemTable" isMaterialEquipment="true" isReadOnly="true" id="${(name+index)?.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")?.replaceAll(" ", "")?.toLowerCase()}" title="${name}">
				<thead>
					<tr style="white-space: nowrap">
						<th>Vendor Name</th>
						<th>Item Code</th>
						<th>Item Name</th>
						<th>Quantity</th>
						<th>UOM</th>
						<th>Unit Cost</th>
						<th>Total Cost</th>
						<th>Total</th>
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
	function getRequestItems(bidRecapID = 0, inventoryValidationID = 0) {
		let result = {};
		$.ajax({
			method: "POST",
			url: "bid_recap/getCostEstimateRequest",
			data: { bidRecapID, inventoryValidationID },
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
	function getCostEstimateRequest(inventoryValidationID = 0, bidRecapID = 0) {
		let requestItems = getRequestItems(bidRecapID, inventoryValidationID);

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
	function getMaterialEquipmentRequestItems(bidRecapID = 0) {
		let result = [];
		$.ajax({
			method: "POST",
			url: "bid_recap/getMaterialEquipmentRequestItems",
			data: { bidRecapID },
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
	function getMaterialsEquipment(data = false, readOnly = true) {
		let html = "";
		if (data) {

			const {
				bidRecapID       = "",
				inventoryValidationID          = "",
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
				if (inventoryValidationID) {
					html = getCostEstimateRequest(inventoryValidationID, bidRecapID);
				} else {
					requestItemsData = getMaterialEquipmentRequestItems(bidRecapID);
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
				if (bidRecapID) {
					requestItemsData = getTableData(
						`ims_request_items_tbl`, 
						``, 
						`bidRecapID = ${bidRecapID} AND (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND inventoryValidationID IS NULL`);
				}
				if (requestItemsData.length > 0) {
					requestItemsData.map(item => {
						requestItemHTML += getItemRow(item, readOnly);
					})
				} else {
					requestItemHTML = getItemRow(false, readOnly);
				}


				if (inventoryValidationID && inventoryValidationID != "0" && bidRecapID) {
					html = getCostEstimateRequest(inventoryValidationID, bidRecapID);
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
	$(document).on("change", `[name="inventoryValidationID"]`, function() {
		const inventoryValidationID = $(this).val();
		
		const timelineBuilderID = $(`option:selected`, this).attr("timelineBuilderID") || "-";
		const projectCode     	= $(`option:selected`, this).attr("projectCode") || "-";
		const projectName     	= $(`option:selected`, this).attr("projectName") || "-";
		const projectCategory 	= $(`option:selected`, this).attr("projectCategory") || "-";
		const clientName      	= $(`option:selected`, this).attr("clientName") || "-";
		const clientAddress   	= $(`option:selected`, this).attr("clientAddress") || "-";

		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectName"]`).val(projectName);
		$(`[name="projectCategory"]`).val(projectCategory);
		$(`[name="clientName"]`).val(clientName);
		$(`[name="clientAddress"]`).val(clientAddress);

		$("#tableRequestItemContent").html(preloader);
		// if (inventoryValidationID == "0") {
		// 	setTimeout(() => {
		// 		let materialsEquipment = getMaterialsEquipment([{inventoryValidationID}]);
		// 		$(`#tableRequestItemContent`).html(materialsEquipment);
		// 		initDataTables();
		// 		initAll();
		// 		updateTableItems();
		// 		$(`#costSummary`).html(getCostSummary(true));
		// 	}, 200);
		// } else {
			setTimeout(() => {
				initDataTables();
				initAll();
				updateTableItems();
					setTimeout(()=>{
						let requestItems = getCostEstimateRequest(inventoryValidationID, 0);
						$(`#tableRequestItemContent`).html(requestItems);
						$(`#costSummary`).html(getCostSummary());
					}, 500);
			}, 200);
		// }

	})
	// ----- END SELECT INVENTORY VALIDATION -----


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
			<div class="col-6 col-lg-5 text-right text-danger font-weight-bolder" id="bidRecapGrandTotal" style="font-size: 1.05em">
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
			bidRecapID       		= "",
			reviseBidRecapID 		= "",
			employeeID              = "",
			inventoryValidationID   = "",
			projectCode             = "",
			projectName             = "",
			projectCategory         = "",
			clientName              = "",
			clientAddress           = "",
			bidRecapReason   		= "",
			bidRecapRemarks  		= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			bidRecapStatus   		= false,
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

		$("#btnBack").attr("bidRecapID", encryptString(bidRecapID));
		$("#btnBack").attr("status", bidRecapStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? bidRecapID : reviseBidRecapID;
		let documentHeaderClass = isRevise || reviseBidRecapID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBidRecapID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBidRecapID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("BRF", createdAt, reviseDocumentNo)}
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
							${bidRecapID && !isRevise ? getFormCode("BRF", createdAt, bidRecapID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${bidRecapStatus && !isRevise ? getStatusStyle(bidRecapStatus) : "---"}
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
                    <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
                        name="inventoryValidationID"
                        id="inventoryValidationID"
                        style="width: 100%"
                        required ${inventoryValidationID ? "disabled" : ""}
						>
                        <option selected disabled>Select Reference No.</option>
                        ${getInventoryValidationList(inventoryValidationID, bidRecapStatus)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-inventoryValidationID"></div>
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
                    <div class="d-block invalid-feedback" id="invalid-projectName"></div>
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
                        id="bidRecapReason"
                        name="bidRecapReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${bidRecapReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-bidRecapReason"></div>
                </div>
            </div>

            <div class="col-sm-12" id="tableRequestItemContent">
                ${inventoryValidationID ? getCostEstimateRequest(inventoryValidationID, bidRecapStatus < 3 ? bidRecapID : 0  ) : getMaterialsEquipment(data, readOnly)}
            </div>

			<div class="col-12" id="costSummary"></div>

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${!isRevise ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			updateTableItems();
			initAll();
			
			
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

			headerButton(true, "Add Bid Recap");
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
	function getBidRecapData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			formData.append("bidRecapID", id);

			if (status != "2") {
				formData.append("bidRecapStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			const inventoryValidationID = $("[name=inventoryValidationID]").val();
			const timelineBuilderID 	= $("[name=inventoryValidationID] option:selected").attr("timelineBuilderID");
			const purchaseRequestID 	= $("[name=inventoryValidationID] option:selected").attr("purchaseRequestID");
			const projectCode   		= $(`[name="projectCode"]`).val();
			const projectName   		= $(`[name="projectName"]`).val();
			const projectCategory 		= $(`[name="projectCategory"]`).val();
			const clientName    		= $(`[name="clientName"]`).val();
			const clientAddress 		= $(`[name="clientAddress"]`).val();
			const bidRecapGrandTotal 	= $("#bidRecapGrandTotal").text().replace("₱ ","").replaceAll(",","") || $("#bidRecapGrandTotal").text().replace("₱ ","");
			formData.append("employeeID", sessionID);
			formData.append("inventoryValidationID", inventoryValidationID);
			formData.append("timelineBuilderID", timelineBuilderID);
			formData.append("purchaseRequestID", purchaseRequestID);
			formData.append("projectCode", projectCode);
			formData.append("projectName", projectName);
			formData.append("projectCategory", projectCategory);
			formData.append("clientName", clientName);
			formData.append("clientAddress", clientAddress);
			formData.append("bidRecapReason", $("[name=bidRecapReason]").val()?.trim());
			formData.append("bidRecapGrandTotal", bidRecapGrandTotal );

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("bidRecapID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("bidRecapStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("bidRecapStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const requestItemID = $(this).attr("requestitemid");
				const categoryType 	= $(this).find(".table-row-classification") ? "Project Phase" : "Materials and Equipment";
				const vendorID 		= $(this).attr("vendorid");
				const vendorName 	= $(this).attr("vendorname");
				const unitCost		= $(this).find(".item-unit-cost").text().replace("₱ ","").replaceAll(",","") || $(this).find(".item-unit-cost").text().replace("₱ ","");
				const totalCost		= $(this).find(".totalcost").text().replace("₱ ","").replaceAll(",","") || $(this).find(".totalcost").text().replace("₱ ","");

				formData.append(`items[${i}][requestItemID]`, requestItemID);
				formData.append(`items[${i}][categoryType]`, categoryType);
				formData.append(`items[${i}][vendorID]`, vendorID);
				formData.append(`items[${i}][vendorName]`, vendorName);
				formData.append(`items[${i}][unitCost]`, unitCost);
				formData.append(`items[${i}][totalCost]`, totalCost);
			});
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
		const id                    = decryptString($(this).attr("bidRecapID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("bidRecapID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("BRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getBidRecapData(action, "save", "0", id);
				data.append("bidRecapStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseBidRecapID", id);
					data.delete("bidRecapID");
				} else {
					data.append("bidRecapID", id);
					data.delete("action");
					data.append("action", "update");
				}

				saveBidRecap(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getBidRecapData(action, "save", "0", id);
			data.append("bidRecapStatus", 0);

			saveBidRecap(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("bidRecapID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getBidRecapData(action, "save", "0", id);
		data.append("bidRecapStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseBidRecapID", id);
				data.delete("bidRecapID");
			} else {
				data.append("bidRecapID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		saveBidRecap(data, "save", null, pageContent);
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
		let flag = 0;
		$(".itemTableRow").each(function(){
			let unitcost = $(this).find(".item-unit-cost").text().replaceAll("₱ ");
			if(parseFloat(unitcost) < 1){
				flag += 1;
			}
		});

		if (flag > 0) {
			showNotification("warning2", `Please review the item price on <strong>Inventory Price List</strong>.`);
		}
		return flag > 0 ? false : true;
	}
	// ----- END VALIDATE TABLE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("bidRecapID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_bid_recap");
		const validateItems = validateTableItems();
		removeIsValid("#tableRequestItems");

		if (validate && validateItems) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getBidRecapData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.append("reviseBidRecapID", id);
					data.delete("bidRecapID");
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
					moduleID:                40,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveBidRecap(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("bidRecapID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getBidRecapData(action, "cancelform", "4", id, status);

		saveBidRecap(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("bidRecapID"));
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);
		let tableData  = getTableData("ims_bid_recap_tbl", "", "bidRecapID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getBidRecapData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                40,
					tableID:                 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${feedback}: Your request has been approved.`,
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

			data.append("bidRecapStatus", status);

			saveBidRecap(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("bidRecapID"));
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);

		$("#modal_bid_recap_content").html(preloader);
		$("#modal_bid_recap .page-title").text("DENY PURCHASE REQUEST");
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
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			bidRecapID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_bid_recap_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("bidRecapID"));
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);

		const validate = validateForm("modal_bid_recap");
		if (validate) {
			let tableData = getTableData("ims_bid_recap_tbl", "", "bidRecapID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("bidRecapID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("bidRecapRemarks", $("[name=bidRecapRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                40,
					tableID: 				 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveBidRecap(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("bidRecapID"));
		let data = new FormData;
		data.append("bidRecapID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveBidRecap(data, "drop", null, pageContent);
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

function saveBidRecap(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `bid_recap/saveBidRecap`,
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
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} dropped successfully!`;
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

// --------------- END DATABASE RELATION ---------------