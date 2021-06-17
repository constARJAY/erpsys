$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(132);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("liquidation");
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
				"fms_liquidation_tbl", 
				"reviseLiquidationID", 
				"reviseLiquidationID IS NOT NULL AND liquidationStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLiquidationID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			//alert(pettycashID);
			//alert(pettycashID);
			const tableData = getTableData("fms_liquidation_tbl", "", "liquidationID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					liquidationStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (liquidationStatus == 0 || liquidationStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (liquidationStatus == 0) {
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
			//let pettycashID = "";
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				arr = url.split("?add=");
				// let liquidationID = url.substring(url.lastIndexOf('=') + 1);				
				// let itemProjectTableBody = formContent('','','','',liquidationID);

				var url1 	= url.substring(url.lastIndexOf());
				var ids 	= url1.split('=');
				let liquidationDataID = ids[1];
				var pettycashCode = ids[2];
				var pettyCashDate = ids[3];
				var pettyCashAmount = ids[4];
				//alert(pettyCashDate);
				//alert(liquidationDataID);
				//alert(liquidationDataID);
				let itemProjectTableBody = formContent('','','','', liquidationDataID, pettycashCode, pettyCashDate, pettyCashAmount);
				// var idtwo = ids[2];
				
				// alert(liquidationID);
				// let liquidationID = decryptString(descrypliquidationID);

				//pettycashID = formContent('','','','',pettycashID);
				//iquidationID = getPettyCashRow(liquidationID,readOnly,'');
			
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					const isAllowed = isCreateAllowed(132);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}fms/liquidation?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/liquidation?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/liquidation?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/liquidation`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const ChartOfAccountList = getTableData(
		"fms_chart_of_accounts_tbl ", "chartOfAccountID , accountCode, accountName, accountDescription, createdAt",
		"accountStatus = 1");

	const clientList = getTableData(
		"pms_client_tbl", 
		"clientID , clientCode, clientName",
		"	clientStatus = 1");
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
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
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
					{ targets: 0,  width: 200 },
					{ targets: 1,  width: 180 },
					{ targets: 2,  width: 180  },
                    { targets: 3,  width: 180  },
					{ targets: 4,  width: 280  },
					{ targets: 5,  width: 150  },
					{ targets: 6,  width: 280  },
					{ targets: 7,  width: 150  },
					{ targets: 8,  width: 150  },
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
					{ targets: 0,  width: 200 },
					{ targets: 1,  width: 180 },
					{ targets: 2,  width: 180  },
                    { targets: 3,  width: 180  },
					{ targets: 4,  width: 280  },
					{ targets: 5,  width: 150  },
					{ targets: 6,  width: 180  },
					{ targets: 7,  width: 150  },
					{ targets: 8,  width: 150  },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("fms_liquidation_tbl", "approversID")) {
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
			if (isCreateAllowed(132)) {
				html = ``;
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
			`fms_liquidation_tbl AS ld 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			`ld.*, 
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
            ld.createdAt AS dateCreated`,
			`ld.employeeID != ${sessionID} AND liquidationStatus != 0 AND liquidationStatus != 4`,
			`FIELD(liquidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(ld.submittedAt, ld.createdAt)`
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
				liquidationID,
				approversID,
				approversDate,
				liquidationStatus,
				liquidationRemarks,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = 	liquidationRemarks ? 	liquidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = liquidationStatus == 2 || liquidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = liquidationStatus != 0 ? "btnView" : "btnEdit";

			let button = liquidationStatus != 0 ? `
			<button type="button" class="btn btn-view w-100 btnView" id="${encryptString(liquidationID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button type="button" 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(liquidationID )}" 
				code="${getFormCode("PCR", createdAt, liquidationID)}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, liquidationStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(liquidationID)}">
					<td>${getFormCode("PCR", createdAt, liquidationID)}</td>
					<td>${fullname}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, liquidationStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(liquidationStatus)}
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
			`fms_liquidation_tbl AS cfr 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			`cfr.*, 
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
            cfr.createdAt AS dateCreated`,
			`cfr.employeeID = ${sessionID}`,
			`FIELD(liquidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(cfr.submittedAt, cfr.createdAt)`
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
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				liquidationID,
				approversID,
				approversDate,
				liquidationStatus,
				liquidationRemarks,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = liquidationRemarks ? liquidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = liquidationStatus == 2 || liquidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = liquidationStatus != 0 ? "btnView" : "btnEdit";

			let button = liquidationStatus != 0 ? `
            <button type="button" class="btn btn-view w-100 btnView" id="${encryptString(liquidationID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button type="button" 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(liquidationID )}" 
                code="${getFormCode("PCR", createdAt, liquidationID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(liquidationID )}">
                <td>${getFormCode("PCR", createdAt, liquidationID )}</td>
                <td>${fullname}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, liquidationStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(liquidationStatus)}
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
				liquidationID     = "",
				liquidationStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (liquidationStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						liquidationID="${encryptString(liquidationID)}"
						code="${getFormCode("PCR", createdAt, liquidationID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (liquidationStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"
							status="${liquidationStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (liquidationStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						liquidationID="${encryptString(liquidationID)}"
						code="${getFormCode("PCR", createdAt, liquidationID)}"
						status="${liquidationStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (liquidationStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(liquidationID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"
							status="${liquidationStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (liquidationStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(liquidationID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"
							status="${liquidationStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (liquidationStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							liquidationID="${encryptString(liquidationID)}"
							code="${getFormCode("PCR", createdAt, liquidationID)}"><i class="fas fa-ban"></i> 
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
		let optionNone = {
			itemID:              "0",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A",

		};

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
    function getChartofAccount(id = null, isProject = true, display = true) {
        let html    = `<option selected disabled>Select Chart of Account</option>`;
		const attr  = isProject ? "[project=true]" : "[company=true]";
		const table = isProject ? $(`.itemProjectTableBody tr`).length > 1 : $(`.itemCompanyTableBody tr`).length > 1;

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=chartOfAccountID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let optionNone = {
			chartOfAccountID:       "0",
			accountName:            "N/A"
		};
		// let itemList = [optionNone, ...inventoryItemList];
		let itemList = !itemIDArr.includes("0") && table ? [...ChartOfAccountList] : [optionNone, ...ChartOfAccountList];

		html += itemList.filter(item => !itemIDArr.includes(item.chartOfAccountID) || item.chartOfAccountID == id).map(item => {
            return `
            <option 
                value           = "${item.chartOfAccountID}" 
                itemDescription = "${item.accountName}"
                ${item.chartOfAccountID == id && "selected"}>
                ${item.accountName}
            </option>`;
        })
		
        return display ? html : ChartOfAccountList;
    }
    // ----- END GET INVENTORY ITEM -----

	    // ----- GET INVENTORY ITEM -----
		function getClient(id = null, isProject = true, display = true) {
			console.log(id);
			let html    = `<option selected disabled>Select Client</option>`;
			const attr  = isProject ? "[project=true]" : "[company=true]";
			const table = isProject ? $(`.itemProjectTableBody tr`).length > 1 : $(`.itemCompanyTableBody tr`).length > 1;
	
			let itemIDArr = []; // 0 IS THE DEFAULT VALUE
			$(`[name=clientID]${attr}`).each(function(i, obj) {
				itemIDArr.push($(this).val());
			}) 
	
			let optionNone = {
				clientID:       "0",
				clientName:     "N/A"
			};
			// let itemList = [optionNone, ...inventoryItemList];
			let itemList = !itemIDArr.includes("0") && table ? [...clientList] : [optionNone, ...clientList];
	
			html += itemList.filter(item => !itemIDArr.includes(item.clientList) || item.clientList == id).map(item => {
				return `
				<option 
					value           = "${item.clientID}" 
					itemDescription = "${item.clientName}"
					${item.clientID == id && "selected"}>
					${item.clientName}
				</option>`;
			})
			
			return display ? html : clientList;
		}
		// ----- END GET INVENTORY ITEM -----


	// ----- GET NON FORMAT AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
	// ----- END GET NON FORMAT AMOUNT -----


	// ----- GET ITEM ROW -----
    function getItemRow(pettyCashID, isProject = true, item = {}, readOnly) {
		const attr = isProject ? `project="true"` : ``;
	
		let {
			liquidationID                    							= "",
			description                               					= "",
			amount                               						= "",
			vatSales                               						= "",
			vat                               							= "",
			clientID													="",
			srfNumber                               					= "",
			chartOfAccountID                          					= "",
			remark                               						= "",
			receiptNumber                              					= "",
			accountName													="",
			clientName													="",
		} = item;
		

		let html = "";
		if (readOnly) {
		
			html += `
			<td>
				<div class="description">
				${description || "-"}
				</div>
			</td>
			<td>
				<div class="text-right">
				${formatAmount(amount, true) || "-"}
				</div>
			</td>
			<td>
				<div class="vatSales text-right" >
				${formatAmount(vatSales, true) || "-"}
				</div>	
			</td>
			<td>
				<div class="vat text-right">
				${formatAmount(vat, true) || "-"}
				</div>
			</td>
			<td>
				<div class="client ">
				${clientName || "-"}
				</div>
			</td>
			<td>
				<div class="srfNumber">
				${srfNumber || "-"}
				</div>
			</td>
			<td>
				<div class="chartofaccount ">
				${accountName || "-"}
				</div>
			</td>	
			<td>	
				<div class="">
				${remark || "-"}
				</div>
			</td>
			<td>
				<div class="receiptNumber">
				${receiptNumber || "-"}
				</div>
			</td>
			
			
			</tr>`;
		}else{
			//let disabled = readOnly ? "disabled " : "";
			
			let disposalItemsData = getTableData(
				`fms_finance_request_details_tbl`,
					`financeRequestID,
					clientFundRequestID,
					pettyCashRequestID,	
					voucherID,
					description,
					quantity,
					amount,
					liquidationID,
					vatSales,
					vat,
					srfNumber,
					chartOfAccountID,
					remark,
					receiptNumber`,
				 	`pettyCashRequestID = ${pettyCashID}`);
				disposalItemsData.map((item, index) => {

					let {
						amount,
						financeRequestID,
						description
					} = item;
				//$("#totalAmount").val(pettyCashRequestAmount);
			html += `
			<tr class="itemTableRow">
                    <td>
					<div class="description" name="description" descriptionValue="${description}" financeRequestID="${financeRequestID}">
							${description || "-"}
					</div>
                   </td> 
                    <td>
					<div class="amount" name="amount" amountValue="${amount}">
							${amount || "-"}
					</div>
				</td>
				<td>
				<div class="quantity">
				<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">₱</span>
				</div>
					<input 
						type="text" 
						class="form-control input-quantity text-right vatSales"
						min="0.00" 
						data-allowcharacters="[0-9]" 
						max="999999999" 
						id="vatSales${index}" 
						name="vatSales" 
						minlength="1" 
						maxlength="20"
						value="${vatSales}" 
						autocomplete="off">
					<div class="invalid-feedback d-block" id="invalid-vatSales"></div>
				</div>
				</div>
			</td>
			<td>
				<div class="quantity">
				<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">₱</span>
				</div>
					<input 
						type="text" 
						class="form-control input-quantity text-right"
						min="0.00" 
						data-allowcharacters="[0-9]" 
						max="999999999" 
						id="vat${index}" 
						name="vat" 
						value="${vat}"
						minlength="1" 
						maxlength="20" 
						autocomplete="off"
						
					<div class="invalid-feedback d-block" id="invalid-vat"></div>
				</div>
				</div>
			</td>
			<td>
				<div class="clientID">
				<select
					class="form-control select2"
					data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:][''][-][_][(][)][%][&][*][ ]"
					name="clientID"
					id="clientID${index}">
					${getClient(clientID)}
				</select>
					<div class="invalid-feedback d-block" id="invalid-clientID"></div>
				</div>
			</td>
			<td>
				<div class="quantity">
					<input 
						type="text" 
						class="form-control text-right"
						min="0.00" 
						data-allowcharacters="[0-9]" 
						max="999999999" 
						id="srfNumber${index}" 
						name="srfNumber" 
						value="${srfNumber}"
						minlength="1" 
						maxlength="20" 
						autocomplete="off"
						>
					<div class="invalid-feedback d-block" id="invalid-srfNumber"></div>
				</div>
			</td>
			<td>
				<div class="chartOfAccountID">
				<select
				class="form-control select2"
				name="chartOfAccountID"
				id="chartOfAccountID${index}">
				${getChartofAccount(chartOfAccountID)}
			</select>
			<div class="invalid-feedback d-block" id="invalid-chartOfAccountID"></div>		
			</div>
			</td>
			<td>
				<div class="remark">
					<textarea 
						class="form-control"
						data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:][']["][-][_][(][)][%][&][*][ ]"
						minlength="0"
						maxlength="250"
						rows="2" 
						style="resize: none" 
						class="form-control" 
						data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
						id="remark${index}"
						name="remark">${remark}</textarea>
				</div>
				</td>
			<td>
			<div class="receiptNumber">
				<input type="text"
				data-allowcharacters="[0-9][a-z][A-Z][-]"
				class="form-control"
				id="receiptNumber" 
				name="receiptNumber"
				value="${receiptNumber}">
			</div>	
			</td>
			</tr>`;
			//$("#totalAmount").text("seds");
			//$(`#totalAmount`).text(formatAmount(pettyCashRequestAmount, true));
		})
		
		}

        return html;
    }

	
	$(document).on("keyup", ".liquidationBudget", function() {
		//console.log("44");
		var totalbudget = parseFloat($("#liquidationBudget").val().replace(/,/g, ''));
		var pettyCashAmountValue = parseFloat($("#liquidationBudget").attr("pettyCashAmountValue").replace(/,/g, ''));
		var munustotal =  pettyCashAmountValue - totalbudget;
		var totalamount = formatAmount(munustotal, true);
		$("#liquidationExcessOrShortage").text((totalamount));
	//alert(totalbudget1);

	})	
	// 	$(document).on("keyup change", "[name=vatSales]", function() {
	// 	//const index     		= $(this).closest("tr").first().attr("index");
	// 	var rowCount = $('.itemProjectTableBody tr').length;
		
	// 	var totalcost = 0;
	// 	for(var i=0; i<rowCount; i++) {
	// 	 totalcost += parseFloat($(`#vatSales${i}`).val().replace(/,/g, ''));
	// 	  if(isNaN(totalcost)){
	// 		 totalcost=0;
	// 	  }
 	// 	}       
	
	// 	//$("#totalAmount").css('background-color', '#FFFFFF');
	// 	$(`#totalAmount`).text(formatAmount(totalcost, true));
	// 	// document.getElementById("invalid-message").style.visibility = "hidden";
	// 	// document.getElementById('invalid-message').innerHTML = '';
	// 	// $("#totalAmount").attr("totalValue","1");
	// 	$("#totalAmount").attr("ClientFundRequestAmount",totalcost);
	// 	//totalCashAmount("1");
	// 	//return true;


	// });	


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

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false,liquidationDataID, pettycashCode, pettyCashDate, pettyCashAmount) {
		//alert(pettycashID);
		$("#page_content").html(preloader);
		let datewithrecord = moment(pettyCashDate).format("MMMM DD, YYYY");
		readOnly = isRevise ? false : readOnly;
		let pettyCashID = '';
		let {
			liquidationID      		= "",
			reviseLiquidationID 	= "",
			pettyCashRequestID		="",
			liquidationPurpose		="",
			employeeID              = "",
			projectTotalAmount      = "0",
			clientFundRequestDate	="",
			chartOfAccountID		="",
			companyTotalAmount      = "0",
			liquidationRemarks  	= "",
			approversID             = "",
            projectID               ="",
			ClientFundRequestAmount	= "0",
			liquidationReferenceNumber ="",
			liquidationExpenses			="",
			liquidationBudget			="",
			liquidationExcessOrShortage	="",
			liquidationDispositionofExcessOrShortage="",
			liquidationDate			="",
			approversStatus         = "",
			approversDate           = "",
			liquidationStatus   	= false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

			if(liquidationID){
				pettyCashID = liquidationID;
			}else{
				pettyCashID = liquidationDataID;
			}
			//alert(pettyCashID);
        let clientFundRequestItems = "";
		if (liquidationID) {
		let pettyCashRequestData = getTableData(
			`fms_finance_request_details_tbl 			AS frd
			LEFT JOIN fms_liquidation_tbl         	 	AS lt ON frd.liquidationID = lt.liquidationID
			LEFT JOIN fms_chart_of_accounts_tbl			AS fcoa ON frd.chartOfAccountID = fcoa.chartOfAccountID
			LEFT JOIN pms_client_tbl					AS pct ON  frd.clientID = pct.clientID`,
			`frd.liquidationID,
			frd.description,
			frd.amount,
			frd.vatSales,
			frd.vat,
			frd.clientID,
			frd.srfNumber,
			frd.chartOfAccountID,
			frd.remark,
			frd.receiptNumber,
			fcoa.accountName,
			pct.clientName`,
			`frd.liquidationID  = ${liquidationID}`);
			pettyCashRequestData.map(item => {
				clientFundRequestItems += getItemRow(pettyCashID, true, item, readOnly)
				//console.log(clientFundRequestItems);
		})    
		}else{
			
			clientFundRequestItems += getItemRow(pettyCashID, true, "", false);
	} 
		
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("liquidationID", encryptString(liquidationID));
		$("#btnBack").attr("status", liquidationStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
        
        let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
        

		//let disabledReference = billMaterialID && billMaterialID != "0" ? "disabled" : disabled;
		
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? liquidationID : reviseLiquidationID;
		let documentHeaderClass = isRevise || reviseLiquidationID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseLiquidationID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseLiquidationID ? `
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
							${liquidationID && !isRevise ? getFormCode("PCR", createdAt, liquidationID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${liquidationStatus && !isRevise ? getStatusStyle(liquidationStatus) : "---"}
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
								${getDateApproved(liquidationStatus, approversID, approversDate)}
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
							${liquidationRemarks && !isRevise ? liquidationRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>
            <div class="row" id="form_liquidation">
				<div class="col-md-4 col-sm-12">
					<div class="form-group">
						<label class="text-dark">Reference Number</label>
						<input type="text" class="form-control liquidationReferenceNumber" id="liquidationReferenceNumber" 
						name="liquidationReferenceNumber" value="${liquidationReferenceNumber || `${pettycashCode}`}" disabled>
					</div>
				</div>
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
				<div class="col-md-4 col-sm-12">
				<div class="form-group">
				   <label>Date</label>
				   <input type="button" 
					   class="form-control text-left"
					   required
					   id="liquidationDate"
					   name="liquidationDate"
					   value="${liquidationDate || `${datewithrecord}`}"
					   disabled>
			   </div>	
			</div>
				<div class="col-md-4 col-sm-12">
					<div class="form-group">
					<label>Purpose ${!disabled ? "<code>*</code>" : ""}</label>
					<textarea class="form-control validate liquidationPurpose"
						minlength="0"
						maxlength="250"
						rows="2" 
						style="resize: none" 
						class="form-control" 
						data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:]['][-][_][(][)][%][&][*][ ]"
						name="liquidationPurpose"
						required 
						id="liquidationPurpose"${disabled}>${liquidationPurpose ?? ""}
					</textarea>
					<div class="invalid-feedback d-block" id="invalid-liquidationPurpose"></div>
					</div>
				</div>
                <div class="w-100">
                <hr class="pb-1">
                <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Liquidation</div>
                <table class="table table-striped" id="${tableProjectRequestItemsName}">
                    <thead>
                        <tr style="white-space: nowrap">
                            <th>Description ${!disabled ? "<code>*</code>" : ""}</th>
                            <th>Amount</th>
							<th>VAT Sales</th>
							<th>VAT</th>
							<th>Client</th>
							<th>SRF Number</th>
							<th>Chart of Account</th>
							<th>Remarks</th>
							<th>Receipt Number</th>
                        </tr>
                    </thead>
                    <tbody class="itemProjectTableBody" project="true">
                        ${clientFundRequestItems}
                    </tbody>
                </table>
                
                <div class="w-100 d-flex justify-content-between align-items-center py-2">
                    <div>
                       
                    </div>
					<div class="col-12">
                    <div class="row py-2">
					<div class="offset-lg-7 col-lg-6 offset-md-3 col-md-9 col-sm-12 pt-3 pb-2">
						<div class="row pb-1" style="font-size: 1.1rem;">
							<div class="col-7 col-lg-5 text-left">Total Expenses:</div>
							<span class="col-7 col-lg-5 text-right text-dark" id="liquidationExpenses" name="liquidationExpenses" style="font-size: 1.05em">${formatAmount(liquidationExpenses || `${pettyCashAmount}`, true)} 
							</span>
						</div>
						<div class="row pb-1" style="font-size: 1.1rem;">
							<div class="col-7 col-lg-5 text-left">Budget:</div>
							<div class="col-7 col-lg-5 text-right text-dark">
							<input type="text" class="form-control-plaintext amount py-0 text-dark border-bottom liquidationBudget"  pettyCashAmountValue="${pettyCashAmount}"
							min="0" 
							max="9999999999"
							minlength="1"
							maxlength="20" 
							id="liquidationBudget" 
							name="liquidationBudget" 
							value="${formatAmount(liquidationBudget, true)}"
							style="font-size: 1.02em;">
							</div>
						</div>
						<div class="row pb-1" style="font-size: 1.1rem;">
							<div class="col-7 col-lg-5 text-left">Excess(Shortage):</div>
							<spn class="col-7 col-lg-5 text-right text-dark" id="liquidationExcessOrShortage" name="liquidationExcessOrShortage" style="font-size: 1.05em">
							${formatAmount(liquidationExcessOrShortage, true) ?? ""}
							</span>
						</div>
						<div class="row pb-1" style="font-size: 1.1rem;">
							<div class="col-7 col-lg-5 text-left ">Disposition of Excess/(Shortage):</div>
							<div class="col-7 col-lg-5 text-right text-danger" id="purchaseRequestGrandTotal">
								<input type="text"class="form-control-plaintext py-0 text-dark border-bottom" 
								id="liquidationDispositionofExcessOrShortage" 
								name="liquidationDispositionofExcessOrShortage"
								value="${liquidationDispositionofExcessOrShortage ?? ""}" 
								style="font-size: 1.02em;">
							</div>
						</div
							
							</div>
						</div>
					</div>
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
			initAll();
			updateInventoryItemOptions();
			//!liquidationID && liquidationID == 0 && $("#liquidationDate").val(moment(new Date).format("MMMM DD, YYYY"));
            projectID && projectID != 0 && $("[name=projectID]").trigger("change");
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
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm`).hide();
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
	function getLiquidationData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			data["liquidationID"] = id;
			formData.append("liquidationID", id);

			if (status != "2") {
				data["liquidationStatus"] = status;
				formData.append("liquidationStatus", status);
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
            data["projectID"]    	   											= $("[name=projectID]").val() || null;
			data['liquidationReferenceNumber']									= $("#liquidationReferenceNumber").val();
			data['liquidationDate']												= $("#liquidationDate").val();
			data["liquidationPurpose"] 											= $("[name=liquidationPurpose]").val()?.trim();
			data['liquidationAmount']											= getNonFormattedAmount($("#liquidationAmount").text());
			data['liquidationExpenses'] 										= getNonFormattedAmount($("#liquidationExpenses").text());
			data['liquidationBudget']											= $("#liquidationBudget").val();
			data['liquidationExcessOrShortage'] 								= getNonFormattedAmount($("#liquidationExcessOrShortage").text());
			data['liquidationDispositionofExcessOrShortage'] 					= $("#liquidationDispositionofExcessOrShortage").val();
			data["pettyCashRequestID"] 											= $(".description").attr("pettyCashRequestID");
			formData.append("employeeID", sessionID);
            formData.append("projectID", $("[name=projectID]").val() || null);
			//alert(getNonFormattedAmount($("#liquidationAmount").text()));
			formData.append("liquidationAmount", getNonFormattedAmount($("#liquidationAmount").text()));
			formData.append("liquidationExpenses", getNonFormattedAmount($("#liquidationExpenses").text()));
			formData.append("liquidationDate", $("#liquidationDate").val());
			formData.append("liquidationReferenceNumber", $("#liquidationReferenceNumber").val());
			formData.append("liquidationBudget", $("#liquidationBudget").val());
			formData.append("liquidationExcessOrShortage", getNonFormattedAmount($("#liquidationExcessOrShortage").text()));
			formData.append("liquidationDispositionofExcessOrShortage", $("#liquidationDispositionofExcessOrShortage").val());
			formData.append("liquidationPurpose", $("[name=liquidationPurpose]").val()?.trim());
			formData.append("pettyCashRequestID", $(".description").attr("pettyCashRequestid"));
			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["liquidationID"] = id;

				formData.append("liquidationID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["liquidationStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("liquidationStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["liquidationStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("liquidationStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const liquidationID = $(this).attr('liquidationID');
				const categoryType = 
				$(this).closest("tbody").attr("project") == "true" ? "project" : "company";
				const description    						= $("td [name=description]", this).attr("descriptionValue");	
				const amount   		 						= $("td [name=amount]", this).attr("amountValue");
				const vatSales 								= $("td [name=vatSales]", this).val();
				const vat 									= $("td [name=vat]", this).val();	
				const clientID 								= $("td [name=clientID]", this).val();
				const srfNumber 							= $("td [name=srfNumber]", this).val();
				const chartOfAccountID 						= $("td [name=chartOfAccountID]", this).val();
				const remark 								= $("td [name=remark]", this).val();
				const receiptNumber 						= $("td [name=receiptNumber]", this).val();
				
				

				let temp = {
					description, amount,vatSales,vat,
					clientID, srfNumber, chartOfAccountID, remark
				};

				//formData.append(`items[${i}][chartOfAccountID]`, chartOfAccountID);
				formData.append(`items[${i}][description]`, description);
				formData.append(`items[${i}][amount]`, amount);
				formData.append(`items[${i}][vatSales]`, vatSales);
				formData.append(`items[${i}][vat]`, vat);
				formData.append(`items[${i}][clientID]`, clientID);
				formData.append(`items[${i}][srfNumber]`, srfNumber);
				formData.append(`items[${i}][chartOfAccountID]`, chartOfAccountID);
				formData.append(`items[${i}][remark]`, remark);
				formData.append(`items[${i}][receiptNumber]`, receiptNumber);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);

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
		const id                    = decryptString($(this).attr("liquidationID"));
		//const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getLiquidationData(action, "save", "0", id);
				data.append("liquidationStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseLiquidationID", id);
					data.delete("liquidationID");
				} else {
					data.append("liquidationID", id);
					data.delete("action");
					data.append("action", "update");
				}

				//validateItemPrice();
				saveLiquidation(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getLiquidationData(action, "save", "0", id);
			data.append("liquidationStatus", 0);

			//validateItemPrice()
			saveLiquidation(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getLiquidationData(action, "save", "0", id);
		data.append("liquidationStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseLiquidationID", id);
				data.delete("liquidationID");
			} else {
				data.append("liquidationID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		//validateItemPrice();
		saveLiquidation(data, "save", null, pageContent);
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
		const id            = decryptString($(this).attr("liquidationID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_liquidation");
		//let validateamount = $("[name=totalAmount]").attr("totalvalue");
		//const validatePrice = validateItemPrice();
		//const validateItems = validateTableItems();
		removeIsValid("#tableProjectRequestItems");
		//removeIsValid("#tableCompanyRequestItems");
			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getLiquidationData(action, "submit", "1", id);
	
				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("reviseLiquidationID", id);
						data.delete("liquidationID");
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
						moduleID:                132,
						notificationTitle:       "Liquidation",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
	
				saveLiquidation(data, "submit", notificationData, pageContent);
			}
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("liquidationID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getLiquidationData(action, "cancelform", "4", id, status);

		saveLiquidation(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);
		let tableData  = getTableData("fms_liquidation_tbl", "", "liquidationID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getLiquidationData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                132,
					tableID:                 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                132,
					tableID:                 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("liquidationStatus", status);

			saveLiquidation(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		$("#modal_liquidation_content").html(preloader);
		$("#modal_liquidation .page-title").text("DENY CLIENT FUND REQUEST");
		$("#modal_liquidation").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="liquidationRemarks"
					name="liquidationRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-liquidationRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			liquidationID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_liquidation_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("liquidationID"));
		const feedback = $(this).attr("code") || getFormCode("PCR", dateToday(), id);

		const validate = validateForm("modal_liquidation_content");
		if (validate) {
			let tableData = getTableData("fms_liquidation_tbl", "", "liquidationID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("liquidationID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("liquidationRemarks", $("[name=liquidationRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                132,
					tableID: 				 id,
					notificationTitle:       "Liquidation",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveLiquidation(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("liquidationID"));
		let data = new FormData;
		data.append("liquidationID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveLiquidation(data, "drop", null, pageContent);
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
	const title = "Liquidation";
	let swalText, swalImg;

	$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("hide");

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

function saveLiquidation(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `liquidation/saveLiquidation`,
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
						$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_liquidation").text().length > 0 && $("#modal_liquidation").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------