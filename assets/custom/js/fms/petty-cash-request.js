$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(53);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("petty cash request");
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
				"fms_petty_cash_request_tbl", 
				"revisePettyCashRequestID", 
				"revisePettyCashRequestID IS NOT NULL AND pettyCashRequestStatus != 4");
			return revisedDocumentsID.map(item => item.revisePettyCashRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					pettyCashRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (pettyCashRequestStatus == 0 || pettyCashRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (pettyCashRequestStatus == 0) {
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
					const isAllowed = isCreateAllowed(53);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}fms/petty_cash_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/petty_cash_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/petty_cash_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/petty_cash_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"fms_chart_of_accounts_tbl ", "chartOfAccountID , accountCode, accountName, accountDescription, createdAt",
		"accountStatus = 1");

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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 200 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 150 },
				],
			});

        var table = $("#tableProjectRequestItems")
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
					{ targets: 1,  width: 100 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 180 },
					{ targets: 4,  width: 100  },
				],
			});

		var table = $("#tableProjectRequestItems0")
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("fms_petty_cash_request_tbl", "approversID")) {
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
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(46)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack" 
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let pettyCashRequest = getTableData(
			`fms_petty_cash_request_tbl AS pcr 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			`pcr.*, 
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
            pcr.createdAt AS dateCreated`,
			`pcr.employeeID != ${sessionID} AND pettyCashRequestStatus != 0 AND pettyCashRequestStatus != 4`,
			`FIELD(pettyCashRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcr.submittedAt, pcr.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				pettyCashRequestID,
				approversID,
				approversDate,
				pettyCashRequestStatus,
					pettyCashRequestRemarks,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = 	pettyCashRequestRemarks ? 	pettyCashRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyCashRequestStatus == 2 || pettyCashRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyCashRequestStatus != 0 ? "btnView" : "btnEdit";

			let button = pettyCashRequestStatus != 0 ? `
			<button type="button" class="btn btn-view w-100 btnView" id="${encryptString(pettyCashRequestID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button type="button" 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(pettyCashRequestID )}" 
				code="${getFormCode("PCR", createdAt, pettyCashRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, pettyCashRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(pettyCashRequestID )}">
					<td>${getFormCode("PCR", createdAt, pettyCashRequestID )}</td>
					<td>${fullname}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, pettyCashRequestStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(pettyCashRequestStatus)}
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
		let pettyCashRequest = getTableData(
			`fms_petty_cash_request_tbl AS pcr 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			`pcr.*,
			DATE_FORMAT(pcr.pettyCashRequestDate,'%M %d, %Y') AS dateformat, 
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
			concat('PCR-',LEFT(pcr.createdAt,2),'-',LPAD(pcr.pettyCashRequestID,5,'0')) AS pettyCashCode,
            pcr.createdAt AS dateCreated`,
			`pcr.employeeID = ${sessionID}`,
			`FIELD(pettyCashRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcr.submittedAt, pcr.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
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

		pettyCashRequest.map((item) => {
			let {
				fullname,
				pettyCashRequestID,
				approversID,
				approversDate,
				pettyCashRequestStatus,
				pettyCashRequestRemarks,
				submittedAt,
				createdAt,
				createdBy,
				pettyCashLiquidationStatus,
				pettyCashCode,
				pettyCashRequestDate,
				dateformat,
				pettyCashRequestAmount
			} = item;

			let remarks       = pettyCashRequestRemarks ? pettyCashRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyCashRequestStatus == 2 || pettyCashRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			//let btnClass = pettyCashRequestStatus != 0 ? "btnView" : "btnEdit";

			let button = pettyCashRequestStatus != 0 ? `
            <button type="button" class="btn btn-view w-100 btnView" id="${encryptString(pettyCashRequestID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button type="button" 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(pettyCashRequestID )}" 
                code="${getFormCode("PCR", createdAt, pettyCashRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="" id="${encryptString(pettyCashRequestID )}">
                <td>${getFormCode("PCR", createdAt, pettyCashRequestID )}</td>
                <td>${fullname}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, pettyCashRequestStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(pettyCashRequestStatus)}
                </td>
				<td>${remarks}</td>
				<td> 
				${button}`;
				if(pettyCashRequestStatus ==2 && createdBy == `${sessionID}` && pettyCashLiquidationStatus ==0){
					html += ` <a href="${base_url}fms/liquidation?add=${pettyCashRequestID}=${pettyCashCode}=${pettyCashRequestDate}=${pettyCashRequestAmount}"><button type="button" class="btn btn-default w-100 btn-add"<i class="icon-plus"></i> Create Liquidation</button></a>`;
				
				}
				html +=`</td>
            </tr>`;
		});
		//target="_blank"

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
	// function openWin() {
	// 	myWindow = window.open("${base_url}fms/client_fund_request?add"target="_blank");   // Opens a new window
	//   }

    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				pettyCashRequestID     = "",
				pettyCashRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (pettyCashRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						pettyCashRequestID="${encryptString(pettyCashRequestID)}"
						code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (pettyCashRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (pettyCashRequestStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						pettyCashRequestID="${encryptString(pettyCashRequestID)}"
						code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
						status="${pettyCashRequestStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (pettyCashRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(pettyCashRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (pettyCashRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(pettyCashRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"
							status="${pettyCashRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (pettyCashRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							pettyCashRequestID="${encryptString(pettyCashRequestID)}"
							code="${getFormCode("PCR", createdAt, pettyCashRequestID)}"><i class="fas fa-ban"></i> 
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

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		// let optionNone = {
		// 	itemID:              "0",
		// 	categoryName:        "-",
		// 	unitOfMeasurementID: "-",
		// 	itemName:            "N/A",

		// };

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		// $("[name=itemID][company=true]").each(function(i, obj) {
		// 	companyItemIDArr.push($(this).val());
		// 	companyElementID.push(`#${this.id}[company=true]`);
		// 	$(this).val() && $(this).trigger("change");
		// }) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = !projectItemIDArr.includes("0") && $(`.itemProjectTableBody tr`).length > 1 ? [...inventoryItemList] : [optionNone, ...inventoryItemList];

			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value           = "${item.chartOfAccountID}" 
					itemDescription = "${item.accountName}"
					createdAt       = "${item.createdAt}"
					${item.chartOfAccountID == projectItemIDArr[index] && "selected"}>
					${item.accountName}
				</option>`;
			})
			$(element).html(html);
		});

		// companyElementID.map((element, index) => {
		// 	let html = `<option selected disabled>Select Item Name</option>`;
		// 	let itemList = !companyItemIDArr.includes("0") && $(`.itemCompanyTableBody tr`).length > 1 ? [...inventoryItemList] : [optionNone, ...inventoryItemList];
		// 	html += itemList.filter(item => !companyItemIDArr.includes(item.itemID) || item.itemID == companyItemIDArr[index]).map(item => {
		// 		return `
		// 		<option 
		// 			value           = "${item.chartOfAccountID}"
		// 			itemDescription = "${item.accountName}"
		// 			createdAt       = "${item.createdAt}"
		// 			${item.chartOfAccountID == companyItemIDArr[index] && "selected"}>
		// 			${item.accountName}
		// 		</option>`;
		// 	})
		// 	$(element).html(html);
		// });
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
    function getInventoryItem(id = null, isProject = true, display = true) {
        let html    = `<option selected disabled>Select Chart of Account</option>`;
		const attr  = isProject ? "[project=true]" : "[company=true]";
		const table = isProject ? $(`.itemProjectTableBody tr`).length > 1 : $(`.itemCompanyTableBody tr`).length > 1;

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=chartOfAccountID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		// let optionNone = {
		// 	chartOfAccountID:       "0",
		// 	accountName:            ""
		// };
		 let itemList = [...inventoryItemList];
		// let itemList = !itemIDArr.includes("0") && table ? [...inventoryItemList] : [optionNone, ...inventoryItemList];

		html += itemList.filter(item => !itemIDArr.includes(item.chartOfAccountID) || item.chartOfAccountID == id).map(item => {
            return `
            <option 
                value           = "${item.chartOfAccountID}" 
                itemDescription = "${item.accountName}"
                ${item.chartOfAccountID == id && "selected"}>
                ${item.accountName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET NON FORMAT AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
	// ----- END GET NON FORMAT AMOUNT -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false, ceID = null) {
		const attr = isProject ? `project="true"` : `company="true"`;
		let {
			requestItemID                       = "",
			chartOfAccountID                    = "",
			description  						= "",
			quantity  							= "",
			amount                              = "",
			files                               = ""
		} = item;


		let html = "";
		if (readOnly) {
			const itemFIle = files ? `<a href="${base_url+"assets/upload-files/petty-cash-request/"+files}" target="_blank">${files}</a>` : `-`;
			html += `
			<tr class="itemTableRow" requestItemID="${requestItemID}">
				
                <td>
					<div class="description">
						${description || "-"}
					</div>
				</td>
				<td>
					<div class="quantity text-center">
						${quantity || "-"}
					</div>
				</td>
				<td class="text-right">
                ${formatAmount(amount, true) || "-"}
				</td>
				<td>
					<div class="file">
						${itemFIle}
					</div>
				</td>
			</tr>`;
		} else {
			const disabled  = ceID && ceID != "0" ? "disabled" : "";
			const inputFile = ceID && ceID != "0" ? "" : `
			<input 
				type="file" 
				class="form-control" 
				name="files" 
				id="files"
				accept="image/*, .pdf, .doc, .docx">
			<div class="invalid-feedback d-block" id="invalid-files"></div>`;

			let itemFile  = "";
			if (ceID && ceID != "0") {
				if (files) {
					itemFile = `
					<a href="${base_url+"assets/upload-files/petty-cash-request/"+files}"
					class="filename"
					title="${files}" 
					style="display: block;
						width: 150px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;"
					target="_blank">${files}</a>`;
				} else {
					itemFile = "-";
				}
			} else {
				if (files) {
					itemFile = `
					<div class="d-flex justify-content-between align-items-center py-2">
						<a class="filename"
						title="${files}"
						style="display: block;
							width: 150px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;"
						href="${base_url+"assets/upload-files/petty-cash-request/"+files}" 
						target="_blank">
						${files}
						</a>
						<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
					</div>`;
				}
			}

			html += `
			<tr class="itemTableRow" requestItemID="${requestItemID}">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow" ${disabled}>
					</div>
				</td>
                    <td>
					<div>
						<textarea 
							class="form-control validate description"
							minlength="0"
							maxlength="250"
							rows="2" 
							style="resize: none" 
							class="form-control" 
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][''][-][_][(][)][%][&][*][ ]"
							name="description"
                            required 
                            value="${description}"
							id="description"
							ceID="${ceID ? true : false}"
							${disabled}></textarea>
                            <div class="invalid-feedback d-block" id="invalid-description"></div>
                        </div>
                   </td> 
				   <td>
				   		<div class="quantity">
						<input 
						type="text" 
						class="form-control input-quantity text-right "
						min="0.01" 
						max="999999999" 
						data-allowcharacters="[0-9]"
						id="quantity" 
						name="quantity" 
						value="${quantity}" 
						minlength="1" 
						maxlength="20" 
						autocomplete="off"
						ceID="${ceID ? true : false}"
						${disabled}>
					<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				   </td>
                    <td>
					<div class="amountvalue">
					<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text">₱</span>
					</div>
						<input 
							type="text" 
							class="form-control input-quantity text-right "
							min="0.00" 
							data-allowcharacters="[0-9]" 
							max="999999999" 
							id="amount" 
							name="amount" 
							value="${amount}" 
							minlength="1" 
							maxlength="20" 
							autocomplete="off"
							ceID="${ceID ? true : false}"
							${disabled}>
						<div class="invalid-feedback d-block" id="invalid-amount"></div>
					</div>
				</div>	
				</td>
				<td>
					<div class="file">
						<div class="displayfile">
							${itemFile}
						</div>
						${inputFile}
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


			// ITEMNAME
			// $(this).find("select").each(function(x) {
			// 	if ($(this).hasClass("select2-hidden-accessible")) {
			// 		$(this).select2("destroy");
			// 	}
			// })

			// $(this).find("select").each(function(j) {
			// 	const chartOfAccountID = $(this).val();
			// 	$(this).attr("index", `${i}`);
			// 	$(this).attr("project", `true`);
			// 	$(this).attr("id", `chartOfAccountID${i}`);
			// 	$(this).attr("data-select2-id", `chartOfAccountID${i}`);
			// 	if (!$(this).hasClass("select2-hidden-accessible")) {
			// 		$(this).select2({ theme: "bootstrap" });
			// 	}
			// });

			// QUANTITY
			$("td .amountvalue [name=amount]", this).attr("id", `amount${i}`);	
			
			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			// TOTAL COST
			$("td .description", this).attr("id", `description${i}`);
            $("td .description .invalid-feedback", this).attr("id", `invalid-description${i}`);
			$("td .description [name=description]", this).attr("company", `true`);

			// FILE
			$("td .file [name=files]", this).attr("id", `filesProject${i}`);

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
							// $(`[name=chartOfAccountID]${attr}`).each(function(i, obj) {
							// 	let chartOfAccountID = $(this).val();
							// 	$(this).html(getInventoryItem(chartOfAccountID, isProject));
							// }) 
							updateDeleteButton();
							updateTotalAmount(isProject);
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
	
	$(document).on("keyup change", "[name=amount]", function() {
		//const index     		= $(this).closest("tr").first().attr("index");
		var rowCount = $('.itemProjectTableBody tr').length;
		var totalcost = 0;
		for(var i=0; i<rowCount; i++) {
		 totalcost += parseFloat($(`#amount${i}`).val().replace(/,/g, ''));
		  if(isNaN(totalcost)){
			 totalcost=0;
		  }
 		}       
	 if(totalcost <= 2000){
		$("#totalAmount").css('background-color', '#FFFFFF');
		$(`#totalAmount`).text(formatAmount(totalcost, true));
		document.getElementById("invalid-message").style.visibility = "hidden";
		document.getElementById('invalid-message').innerHTML = '';
		$("#totalAmount").attr("totalValue","1");
		$("#totalAmount").attr("pettyCashRequestAmount",totalcost);
		//totalCashAmount("1");
		//return true;
	 }else{
		 $("#totalAmount").css('background-color', '#FF0000');
		$(`#totalAmount`).text(formatAmount(totalcost, true));
		document.getElementById('invalid-message').innerHTML = 'Invalid request! Can only request ₱ 2,000 and below.';
		document.getElementById("invalid-message").style.visibility = "visible";
		$("#totalAmount").attr("totalValue","");
		$("#totalAmount").attr("pettyCashRequestAmount",totalcost);
		//totalCashAmount("0");
		//return false;
	 }


	});	

	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=amount]${attr}`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`.unitcost${attr}`).map(element => getNonFormattedAmount(element.innerText) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		console.log(totalAmount);
		$(`#totalAmount${attr}`).text(formatAmount(totalAmount, true));
		if (isProject) {
			$("#purchaseRequestProjectTotal").text(formatAmount(totalAmount, true));
		} else {
			$("#purchaseRequestCompanyTotal").text(formatAmount(totalAmount, true));
		}

		const projectTotal = +getNonFormattedAmount($(`#purchaseRequestProjectTotal`).text()); 
		const companyTotal = +getNonFormattedAmount($(`#purchaseRequestCompanyTotal`).text()); 
		const grandTotal   = projectTotal + companyTotal;
		$("#purchaseRequestGrandTotal").text(formatAmount(grandTotal, true));

		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET TABLE MATERIALS AND EQUIPMENT -----
	function getTableMaterialsEquipment(ceID = null, data = false, readOnly = false) {
		let {
			pettyCashRequestID       = "",
			revisePettyCashRequestID = "",
			employeeID              = "",
			projectID               = "",
			purchaseRequestReason   = "",
			projectTotalAmount      = 0,
			companyTotalAmount      = 0,
				pettyCashRequestRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			pettyCashRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		let disabled = readOnly ? "disabled" : "";

		let requestItemsData;
		

		let checkboxProjectHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" project="true" >
			</div>
		</th>` : ``;
		let checkboxCompanyHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" company="true" >
			</div>
		</th>` : ``;
		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let buttonProjectAddDeleteRow = !disabled ? `
		<div class="d-flex flex-column justify-content-start text-left my-2">
			<div>
				<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" project="true" ><i class="fas fa-plus-circle"></i> Add Row</button>
				<button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
			</div>
		</div>` : "";
		let html = `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Petty Cash Request</div>
			<table class="table table-striped" id="${tableProjectRequestItemsName}">
				<thead>
					<tr style="white-space: nowrap">
						${checkboxProjectHeader}
						<th>Chart of Account ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Description ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Amount</th>
						<th>File</th>
					</tr>
				</thead>
				<tbody class="itemProjectTableBody" project="true">
					${requestProjectItems}
				</tbody>
			</table>
			
			<div class="w-100 d-flex justify-content-between align-items-center py-2">
				<div>
					${buttonProjectAddDeleteRow}
				</div>
				<div class="font-weight-bolder " style="font-size: 1rem;">
					<span>Total Amount: &nbsp;</span>
					<span class="text-dark TotalAmount"color="" style="font-size: 1.2em" id="totalAmount" name="totalAmount" project="true">${formatAmount(projectTotalAmount, true)}</span>
				</div>
				
			</div>
		</div>`;
		return  html;
	}
	// ----- END GET TABLE MATERIALS AND EQUIPMENT -----

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

	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity]", function() {
		const index     = $(this).closest("tr").first().attr("index");
		const isProject = $(this).closest("tbody").attr("project") == "true";
		const attr      = isProject ? "[project=true]" : "[company=true]";
		const table     = isProject ? "project" : "company";
		const quantity  = +getNonFormattedAmount($(`#quantity${index}${table}${attr}`).val());
		const unitcost  = +getNonFormattedAmount($(`#unitcost${index}${attr}`).text());
		const totalcost = quantity * unitcost;
		$(`#totalcost${index}${attr}`).text(formatAmount(totalcost, true));
		updateTotalAmount(isProject);
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
		updateTableItems();
		if (isProject) {
			$(".itemProjectTableBody").append(row);
		} else {
			$(".itemCompanyTableBody").append(row);
            
		}
		updateTableItems();
		updateInventoryItemOptions();
		initInputmask();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			pettyCashRequestID       = "",
			revisePettyCashRequestID = "",
			employeeID              = "",
			projectTotalAmount      = "0",
			pettyCashRequestDate	="",
			chartOfAccountID		="",
			companyTotalAmount      = "0",
			pettyCashRequestRemarks  = "",
			approversID             = "",
			pettyCashRequestAmount	= "0",
			approversStatus         = "",
			approversDate           = "",
			pettyCashRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

        let pettyCashRequestItems = "";
        if (pettyCashRequestID) {
            let pettyCashRequestData = getTableData(
                `fms_finance_request_details_tbl AS pcrd
                LEFT JOIN fms_petty_cash_request_tbl          AS pcr ON pcrd.pettyCashRequestID = pcr.pettyCashRequestID`,
                `pcrd.pettyCashRequestID,
                pcrd.description,
				pcrd.quantity,
                pcrd.amount,
                pcrd.files`,
                `pcrd.pettyCashRequestID = ${pettyCashRequestID}`,``,`pcrd.financeRequestID`);
                pettyCashRequestData.map(item => {
                    pettyCashRequestItems += getItemRow(true, item, readOnly)
            })    
        }else{
            pettyCashRequestItems += getItemRow(true);
        } 

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("pettyCashRequestID", encryptString(pettyCashRequestID));
		$("#btnBack").attr("status", pettyCashRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
        let checkboxProjectHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" project="true">
			</div>
		</th>` : ``;
        let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
        let buttonProjectAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";

		//let disabledReference = billMaterialID && billMaterialID != "0" ? "disabled" : disabled;
		
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? pettyCashRequestID : revisePettyCashRequestID;
		let documentHeaderClass = isRevise || revisePettyCashRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePettyCashRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePettyCashRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PCR", createdAt, reviseDocumentNo)}
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
							${pettyCashRequestID && !isRevise ? getFormCode("PCR", createdAt, pettyCashRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${pettyCashRequestStatus && !isRevise ? getStatusStyle(pettyCashRequestStatus) : "---"}
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
								${getDateApproved(pettyCashRequestStatus, approversID, approversDate)}
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
							${pettyCashRequestRemarks && !isRevise ? pettyCashRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>
            <div class="row" id="form_petty_cash_request">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="text-dark">Requestor</label>
                        <input type="text" class="form-control" disabled value="${employeeFullname}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="text-dark">Position</label>
                        <input type="text" class="form-control" disabled value="${employeeDesignation}">
                    </div>
                </div>
				<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Department</label>
					<input type="text" class="form-control" disabled value="${employeeDepartment}">
				</div>
				</div>
				<div class="col-md-6 col-sm-12">
				<div class="form-group">
				   <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
				   <input type="button" 
					   class="form-control validate daterange text-left"
					   required
					   id="pettyCashRequestDate"
					   name="pettyCashRequestDate"
					   value="${pettyCashRequestDate && moment(pettyCashRequestDate).format("MMMM DD, YYYY")}"
					   ${disabled}
					   >
				   <div class="d-block invalid-feedback" id="invalid-pettyCashRequestDate"></div>
			   </div>	
			</div>
				<div class="col-md-6 col-sm-12">
					<div class="form-group">
					<label>Chart of Account ${!disabled ? "<code>*</code>" : ""}</label>
						<select
							class="form-control validate select2"
							name="chartOfAccountID"
							id="chartOfAccountID"
							required
							${disabled}>
							${getInventoryItem(chartOfAccountID)}
						</select>
						<div class="invalid-feedback d-block" id="invalid-chartOfAccountID"></div>
					</div>
				</div>
                <div class="w-100">
                <hr class="pb-1">
                <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Petty Cash Request</div>
                <table class="table table-striped" id="${tableProjectRequestItemsName}">
                    <thead>
                        <tr style="white-space: nowrap">
                            ${checkboxProjectHeader}
                            <th>Description ${!disabled ? "<code>*</code>" : ""}</th>
							<th>Quantity</th>
                            <th>Amount</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody class="itemProjectTableBody" project="true">
                        ${pettyCashRequestItems}
                    </tbody>
                </table>
                
                <div class="w-100 d-flex justify-content-between align-items-center py-2">
                    <div>
                        ${buttonProjectAddDeleteRow}
                    </div>
                    <div class="font-weight-bolder align-self-start" style="font-size: 1rem;">
                        <span>Total Amount: &nbsp;</span>
                        <span class="text-dark" style="font-size: 1.2em" id="totalAmount" name="totalAmount" project="true">${formatAmount(pettyCashRequestAmount, true)}</span>
						<p class="text-danger" id="invalid-message" style="font-size:9px;color:red;"></p>
						</div>
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
			updateTableItems();
			initAll();
			updateInventoryItemOptions();
			!pettyCashRequestID && pettyCashRequestID == 0 && $("#pettyCashRequestDate").val(moment(new Date).format("MMMM DD, YYYY"));
			// if (billMaterialID || projectID) {
			// 	$("[name=projectID]").val(projectID).trigger("change");
			// }

			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, .btnAddRow, .btnDeleteRow`).hide();
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
			//alert("1");
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

			headerButton(true, "Add Petty Cash Request");
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
	function getPettyCashRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { items: [] }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		//const ceID = $(`[name="billMaterialID"]`).val();

		if (id) {
			data["pettyCashRequestID"] = id;
			formData.append("pettyCashRequestID", id);

			if (status != "2") {
				data["pettyCashRequestStatus"] = status;
				formData.append("pettyCashRequestStatus", status);
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			
			data["employeeID"]            = sessionID;
			data["pettyCashRequestAmount"]    =$("[name=totalAmount]").attr('pettyCashRequestAmount');
			data["pettyCashRequestDate"] = moment($("[name=pettyCashRequestDate]").val()?.trim()).format("YYYY-MM-DD");
			data["chartOfAccountID"] = $("[name=chartOfAccountID]").val()?.trim();


			formData.append("employeeID", sessionID);
			formData.append("pettyCashRequestAmount", $("[name=totalAmount]").attr('pettyCashRequestAmount'));
			formData.append("pettyCashRequestDate", moment($("[name=pettyCashRequestDate]").val()?.trim()).format("YYYY-MM-DD"));
			formData.append("chartOfAccountID", $("[name=chartOfAccountID]").val()?.trim());
			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["pettyCashRequestID"] = id;

				formData.append("pettyCashRequestID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["pettyCashRequestStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("pettyCashRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["pettyCashRequestStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("pettyCashRequestStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const requestItemID = $(this).attr('requestItemID');

				const categoryType = 
					$(this).closest("tbody").attr("project") == "true" ? "project" : "company";

				//const chartOfAccountID                              = $("td [name=chartOfAccountID]", this).val();
                const description          = $("td [name=description]", this).val();	
				const quantity 				= $("td [name=quantity]", this).val().replaceAll(",","");
				//const itemDescription = $("td [name=itemID] option:selected", this).attr("itemDescription");	

				//const amount  = +getNonFormattedAmount($("td [name=amount]", this).val());	
                const amount 				= $("td [name=amount]", this).val().replaceAll(",","");
				//const amount 				= $("td [name=amount]", this).val().replaceAll(",","");
				//const unitcost  = +getNonFormattedAmount($("td .unitcost", this).text());	
				//const totalcost = quantity * unitcost;

				let fileID   = $("td [name=files]", this).attr("id") || "";
				let file     = fileID ? $(`#${fileID}`)?.[0]?.files?.[0] : "";
				let fileArr  = file?.name?.split(".");
				let filename = file ? file?.name : "";

				let temp = {
						description, quantity, amount,
					filename
				};

				//formData.append(`items[${i}][chartOfAccountID]`, chartOfAccountID);
				formData.append(`items[${i}][description]`, description);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][amount]`, amount);
				formData.append(`items[${i}][filename]`, filename);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);
				if (file) {
					temp["file"] = file;
					formData.append(`items[${i}][file]`, file, `${i}.${fileArr[1]}`);
				} else {
					const isHadExistingFile = $("td .file .displayfile", this).text().trim().length > 0;
					if (isHadExistingFile) {
						const filename = $("td .file .displayfile .filename", this).text().trim();

						temp["existingFile"] = filename;
						formData.append(`items[${i}][existingFile]`, filename);
					}
				}

				data["items"].push(temp);
			});
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


	// ----- VALIDATE INVENTORY ITEM PRICE LIST -----
	function validateItemPrice() {
		// let flag = 0;
		// $(`[name="chartOfAccountID"]`).each(function(i) {
		// 	const chartOfAccountID = $(this).val();
		// 	const price = getInventoryPreferredPrice(chartOfAccountID, this);
		// 	if (!price) {
		// 		flag++;
		// 	}
		// })
		// return flag > 0 ? false : true;
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
		const id              = decryptString($(this).attr("pettyCashRequestID"));
		//const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPettyCashRequestData(action, "save", "0", id);
				data.append("pettyCashRequestStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("revisePettyCashRequestID", id);
					data.delete("pettyCashRequestID");
				} else {
					data.append("pettyCashRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}

				//validateItemPrice();
				savePettyCashRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPettyCashRequestData(action, "save", "0", id);
			data.append("pettyCashRequestStatus", 0);

			//validateItemPrice()
			savePettyCashRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPettyCashRequestData(action, "save", "0", id);
		data.append("pettyCashRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("revisePettyCashRequestID", id);
				data.delete("pettyCashRequestID");
			} else {
				data.append("pettyCashRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		//validateItemPrice();
		savePettyCashRequest(data, "save", null, pageContent);
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
		if ($(`.itemProjectTableBody tr`).length == 1 && $(`.itemCompanyTableBody tr`).length == 1) {
			const projectItemID = $(`[name="itemID"][project="true"]`).val();
			const companyItemID = $(`[name="itemID"][company="true"]`).val();
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
		const id            = decryptString($(this).attr("pettyCashRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_petty_cash_request");
		let validateamount = $("[name=totalAmount]").attr("totalvalue");
		const validatePrice = validateItemPrice();
		const validateItems = validateTableItems();
		removeIsValid("#tableProjectRequestItems");
		//removeIsValid("#tableCompanyRequestItems");
			if (validate && validateamount && validateItems) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPettyCashRequestData(action, "submit", "1", id);
	
				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("revisePettyCashRequestID", id);
						data.delete("pettyCashRequestID");
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
						moduleID:                53,
						notificationTitle:       "Petty Cash Request",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
	
				savePettyCashRequest(data, "submit", notificationData, pageContent);
			}
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("pettyCashRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPettyCashRequestData(action, "cancelform", "4", id, status);

		savePettyCashRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		let tableData  = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPettyCashRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                53,
					tableID:                 id,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                53,
					tableID:                 id,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("pettyCashRequestStatus", status);

			savePettyCashRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		$("#modal_petty_cash_request_content").html(preloader);
		$("#modal_petty_cash_request .page-title").text("DENY PETTY CASH REQUEST");
		$("#modal_petty_cash_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="pettyCashRequestRemarks"
					name="pettyCashRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-pettyCashRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			pettyCashRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_petty_cash_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("pettyCashRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		const validate = validateForm("modal_petty_cash_request_content");
		if (validate) {
			let tableData = getTableData("fms_petty_cash_request_tbl", "", "pettyCashRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("pettyCashRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("pettyCashRequestRemarks", $("[name=pettyCashRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                53,
					tableID: 				 id,
					notificationTitle:       "Petty Cash Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePettyCashRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("pettyCashRequestID"));
		let data = new FormData;
		data.append("pettyCashRequestID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		savePettyCashRequest(data, "drop", null, pageContent);
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
	const title = "Petty Cash Request";
	let swalText, swalImg;

	$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("hide");

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

function savePettyCashRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `petty_cash_request/savePettyCashRequest`,
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
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PCR", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------