$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(36);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("disposal");
	// ----- END MODULE APPROVER -----

	
	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"ims_inventory_disposal_tbl", 
				"reviseDisposalID", 
				"reviseDisposalID IS NOT NULL AND disposalStatus != 4");
			return revisedDocumentsID.map(item => item.reviseDisposalID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

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

    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
		//const loadData = (id, isRevise = false) => {
			const tableData = getTableData("ims_inventory_disposal_tbl", "", "disposalID=" + id);
			if (tableData.length > 0) {
				let {
					employeeID,
					disposalStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (disposalStatus == 0 || disposalStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (disposalStatus == 0) {
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
			//console.log(view_id);
			// let id = decryptString(view_id);
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
					const isAllowed = isCreateAllowed(36);
					pageContent(isAllowed);
				}
			}
		}
		
	}
	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/item_disposal?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/item_disposal?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/item_disposal?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/item_disposal`);
		}
	}


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, categoryName, unitOfMeasurementID",
		"itemStatus = 1");

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
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 200 },
					{ targets: 4,  width: 300 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 350 },
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
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 200 },
					{ targets: 4,  width: 300 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 350 },
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
					{ targets: 0,  width: 100  },
					{ targets: 1,  width: 300 },
					{ targets: 2,  width: 220 },
					{ targets: 3,  width: 250  },
					{ targets: 4,  width: 220 },
					{ targets: 5,  width: 120 },
                    { targets: 6,  width: 250 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 250 },
					{ targets: 10,  width: 200 }
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
					{ targets: 0,  width: 300  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 170  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 120 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 110 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 }
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_inventory_disposal_tbl", "approversID")) {
				let count = getCountForApproval("ims_inventory_disposal_tbl", "disposalStatus");
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
			if (isCreateAllowed(36)) {
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
		let transferRequestData = getTableData(
			`ims_inventory_disposal_tbl AS iid 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			`iid.disposalID,iid.reviseDisposalID,iid.employeeID,iid.projectID,iid.approversID,iid.approversStatus,iid.approversDate,iid.disposalStatus,iid.disposalReason,
			iid.disposalRemarks,iid.submittedAt,iid.createdBy,iid.updatedBy,iid.createdAt,iid.updatedAt,
			 CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, iid.createdAt AS dateCreated`,
			`iid.employeeID != ${sessionID} AND disposalStatus != 0 AND disposalStatus != 4`,
			`FIELD(disposalStatus, 0, 1, 3, 2, 4), COALESCE(iid.submittedAt, iid.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		transferRequestData.map((item) => {
			let {
				fullname,
				disposalID,
				disposalReason,
				approversID,
				approversDate,
				disposalStatus,
				disposalRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = disposalRemarks ? disposalRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = disposalStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = disposalStatus != 0 ? "btnView" : "btnEdit";

			let button = disposalStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(disposalID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(disposalID )}" 
				code="${getFormCode("ADF", createdAt, disposalID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, disposalStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(disposalID)}">
					<td>${getFormCode("ADF", createdAt, disposalID )}</td>
					<td>${fullname}</td>
					<td>${disposalReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, disposalStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(disposalStatus)}
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
		let transferRequestData = getTableData(
			`ims_inventory_disposal_tbl 		AS iid 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			`iid.disposalID,iid.reviseDisposalID,iid.employeeID,iid.projectID,iid.approversID,iid.approversStatus,iid.approversDate,iid.disposalStatus,iid.disposalReason,
			iid.disposalRemarks,iid.submittedAt,iid.createdBy,iid.updatedBy,iid.createdAt,iid.updatedAt,
			 CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, iid.createdAt AS dateCreated`,
			`iid.employeeID = ${sessionID}`,
			`FIELD(disposalStatus, 0, 1, 3, 2, 4), COALESCE(iid.submittedAt, iid.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		transferRequestData.map((item) => {
			let {
				fullname,
				disposalID, 
				approversID,
				disposalReason,
				approversDate,
				disposalStatus,
				disposalRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = disposalRemarks ? disposalRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = disposalStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = disposalStatus != 0 ? "btnView" : "btnEdit";

			let button = disposalStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(disposalID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(disposalID )}" 
                code="${getFormCode("ADF", createdAt, disposalID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(disposalID)}">
                <td>${getFormCode("ADF", createdAt, disposalID )}</td>
                <td>${fullname}</td>
				<td>${disposalReason}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, disposalStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(disposalStatus)}
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
				disposalID     		= "",
				disposalStatus 		= "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (disposalStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button"
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						disposalID="${encryptString(disposalID)}"
						code="${getFormCode("ADF", createdAt, disposalID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;
					if (isRevise) {
						button += `
						<button type="button"
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button"
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (disposalStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button"
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"
							status="${disposalStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (disposalStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	disposalID="${encryptString(disposalID)}"
					// 	code="${getFormCode("ADF", createdAt, disposalID)}"
					// 	status="${disposalStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				}else if (disposalStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(disposalID)) {
					button = `
					<button 
						class="btn btn-cancel px-5 p-2"
						id="btnRevise" 
						disposalID="${encryptString(disposalID)}"
						code="${getFormCode("ADF", createdAt, disposalID)}"
						status="${disposalStatus}"><i class="fas fa-clone"></i>
						Revise
					</button>`;
					}
				} else if (disposalStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(disposalID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"
							status="${disposalStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}	
			} else {
				if (disposalStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							disposalID="${encryptString(disposalID)}"
							code="${getFormCode("ADF", createdAt, disposalID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit px-5 p-2" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel btnCancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


    
    // ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			clientCode  = "-"
			clientName  = "-"
			address     = "-"
			${id == "0" && "selected"}>N/A</option>`;
        html += projectList.map(project => {
			let address = `${project.clientUnitNumber && titleCase(project.clientUnitNumber)+", "}${project.clientHouseNumber && project.clientHouseNumber +", "}${project.clientBarangay && titleCase(project.clientBarangay)+", "}${project.clientCity && titleCase(project.clientCity)+", "}${project.clientProvince && titleCase(project.clientProvince)+", "}${project.clientCountry && titleCase(project.clientCountry)+", "}${project.clientPostalCode && titleCase(project.clientPostalCode)}`;

            return `
            <option 
                value       = "${project.projectListID}" 
                projectCode = "${project.projectListCode}"
                clientCode  = "${project.clientCode}"
                clientName  = "${project.clientName}"
				address     = "${address}"
                ${project.projectListID == id && "selected"}>
                ${project.projectListName}
            </option>`;
        })
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		let optionNone = {
			itemID:              "0",
            itemremarks:              "-",
            location:              "-",
			itemCode:            "-",
            serial:              "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A",
		};

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [optionNone, ...inventoryItemList];
			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
                    serial        = ""
                    itemremarks        = ""
                    location        = ""
					categoryName = "${item.categoryName}"
					datereturn          = ""
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----

	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false,disposalStatus=0) {
		const attr = isProject ? `project="true"` : ``;
		let {
			disposalID     				= "",
            assetID      				= "",
			assetCode     				= "",
            assetName           		="",
            barcode      				= "",
			brand      					= "",
			assetClassification       	= "",
			assetCategory     			= "",
			serialnumber 				= "",
			quantity 					= "",
			inventoryStorageID			= "",
			inventoryStorageCode		= "",
			inventoryStorageOfficeName	= "",
			availableStock 				="",
			unitOfMeasurement			="",
			disposalDetailRemarks		="",

           

		} = item;

		// getRealTimeAvailableStocks = getTableData(`ims_stock_in_assets_tbl as stockAsset
		// 	LEFT JOIN ims_inventory_asset_tbl AS masterAsset
		// 	ON masterAsset.assetID = stockAsset.assetID`,
		// 	"SUM(quantity) - reOrderLevel  as availableStocks",
		// 	`stockOutDate IS NUll AND stockInDate IS NOT NULL AND stockAsset.assetID = ${assetID}`);
		
		var final_availableStocks = disposalStatus == 1 ? formatAmount(getFixAvailableStocks(assetID))  : availableStock;
		
		let html = "";
		if (readOnly) {

			html += `
			<tr class="itemTableRow">
				<td>
					<div class="barcode">
						${barcode || "-"}
					</div>
				</td>
                <td>
                <div class="itemCode">
					${assetCode || "-"}
                </div>
               </td> 
			   <td>
			  		 <div>
					   <div class="itemName">
					   ${assetName || "-"}
					   </div>
                    </div>
                    <small style="color:#848482;">${brand || '-'}</small>
					
				</td>
			   <td>
					<div>
					   <div class="assetClassification">
						${assetClassification || "-"}
						</div>
                    </div>
                    <small style="color:#848482;">${assetCategory || '-'}</small>
				</td>
				<td>
				<div class="unitofmeasurement" name="unitofmeasurement">
					${unitOfMeasurement}
				</div>
				</td>
				
				<td>
				<div class="serialnumber">
					${serialnumber || "-"}
				</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity || "-"}
					</div>
				</td>
				<td>
               	 <div class="availableStock text-center">
					${final_availableStocks}
                 </div>
            	</td>
				<td>
					<div class="inventoryStorage">
						${inventoryStorageOfficeName}
					</div>
				</td>
                <td>
					<div class="disposalDetailRemarks">
						${disposalDetailRemarks}
					</div>
				</td>	
			</tr>`;
		} else {
		
			html += `
			<tr class="itemTableRow">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
					</div>
				</td>
				<td>
					<div class="">
					<input 
						type="text" 
						class="form-control validate barcode text-left"
						id="barcode" 
						name="barcode" 
						minlength="18" 
						maxlength="64"  
						value="${barcode}"
						itemID="${assetID}"
						itemName="${assetName}"
						inventoryStorageID="${inventoryStorageID}"
						serialnumber="${serialnumber}"
						required>
					<div class="invalid-feedback d-block" id="invalid-barcode"></div>
				</div>
				</td>
				<td>
					<div class="assetCode" name="assetCode" assetID=${assetID}>
					${assetCode || "-"}
					</div>
				</td>
				<td>
					<div>
						<div class="assetName" name="assetName"brand="${brand}">
						${assetName || "-"}
						</div>
                    </div>
                    <small style="color:#848482;">${brand || '-'}</small>
				</td>
				<td>

					<div>
						<div class="assetClassification" name="assetClassification"	assetCategory="${assetCategory}">${assetClassification || "-"}</div>
                    </div>
                    <small style="color:#848482;">${assetCategory || '-'}</small>
				</td>
				<td>	
					<div class="unitofmeasurement" name="unitofmeasurement">${unitOfMeasurement || "-"}</div>
				</td>
				<td>
					<div class="serialnumber" name="serialnumber">${serialnumber || "-"}</div>
				</td>
                <td class="text-center">
					<div class="">
					<input 
						type="text" 
						class="form-control  quantity input-quantity text-center"
						min="0.01" 
						data-allowcharacters="[0-9]" 
						max="999999999" 
						id="quantity" 
						name="quantity"
						value="${quantity}"
						availableStock="${final_availableStocks}" 
						minlength="1" 
						maxlength="20" 
						required>
					<div class="invalid-feedback d-block" id="invalid-quantity"></div>
				</div>
            </td>
                 <td>
				 	<div class="availableStock text-center" name="availableStock">${final_availableStocks || "-"}
				 </div>
              	</td>
                  <td>
				  	<div class="inventoryStorageOfficeName" name="inventoryStorageOfficeName" inventoryStorageID="${inventoryStorageID}" inventoryStorageCode="${inventoryStorageCode}" >${inventoryStorageOfficeName || "-"}</div>
				</td>
				<td>
				<div class="">
					<input 
						type="text" 
						class="form-control validate disposalDetailRemarks"
						data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
						min="2"
						max="250" 
						id="disposalDetailRemarks" 
						name="disposalDetailRemarks" 
						value="${disposalDetailRemarks}"
						required>
					<div class="invalid-feedback d-block" id="invalid-disposalDetailRemarks"></div>
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

			$("td .barcode", this).attr("id", `barcode${i}`);

			$("td .assetCode", this).attr("id", `assetCode${i}`);
			$("td .assetName", this).attr("id", `assetName${i}`);
			$("td .unitofmeasurement", this).attr("id", `unitofmeasurement${i}`);
			$("td .serialnumber", this).attr("id", `serialnumber${i}`);
			$("td .quantity", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			$("td .availableStock", this).attr("id", `availableStock${i}`);
			$("td .unitofmeasurement", this).attr("id", `unitofmeasurement${i}`);
			$("td .inventoryStorageOfficeName", this).attr("id", `inventoryStorageOfficeName${i}`);
			$("td .disposalDetailRemarks", this).attr("id", `disposalDetailRemarks${i}`);
 
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
							$(`[name=itemID]${attr}`).each(function(i, obj) {
								let itemID = $(this).val();
								$(this).html(getInventoryItem(itemID, isProject));
							}) 
							updateDeleteButton();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----
		// ----- END UPDATE TABLE ITEMS -----
		var barcodeArray = [];
		var barcodeLocationArray = [];
		$(document).on("keyup", "[name=barcode]", function () {
			const barcode = $(this).val();
			const barcodeID = $(this).attr("id");


			if (barcode.length >= 18) {
				const data = getTableData(`ims_stock_in_assets_tbl`,
					`stockInAssetID, assetID, assetCode, assetName, brand,quantity, classificationName, categoryName, uom, serialNumber, barcode, inventoryStorageID, inventoryStorageCode, inventoryStorageOfficeName`, `barcode = '${barcode}'`, ``, `barcode`);
				if (data.length != 0) {
					data.map((item) => {
						let {
							stockInAssetID,
							assetID,
							quantity,
							assetName,
							assetCode,
							brand,
							classificationName,
							categoryName,
							uom,
							serialNumber,
							barcode,
							inventoryStorageID,
							inventoryStorageCode,
							inventoryStorageOfficeName,
						} = item;
						var stockInAsset_ID = stockInAssetID ? stockInAssetID : "";
						var asset_ID = assetID ? assetID : "";
						var asset_Name = assetName ? assetName : "";
						var asset_Code = assetCode ? assetCode : "";
						var available_Stock = quantity ? quantity : "";
						var brand_Name = brand ? brand : "";
						var classification_Name = classificationName ? classificationName : "";
						var category_Name = categoryName ? categoryName : "";
						var unitOfMeasurement = uom ? uom : "";
						var serial_Number = serialNumber ? serialNumber : "";
						var asset_Barcode = barcode ? barcode : "";
						var inventoryStorage_ID = inventoryStorageID ? inventoryStorageID : "";
						var inventoryStorage_Code = inventoryStorageCode ? inventoryStorageCode : "";
						var inventoryStorageOffice_Name = inventoryStorageOfficeName ? inventoryStorageOfficeName : "";
						let barcodeArrayLength = barcodeArray.length || 0;
						if (barcode.length <= 64) {


							if (assetName != null) {
								let counter = 1;
								if (barcodeArrayLength != 0) {
									for (var loop1 = 0; loop1 < barcodeArrayLength; loop1++) {

										if (barcodeArray[loop1] == barcode && barcodeLocationArray[loop1] != barcodeID) {
											// barcodeArray[loop1] = barcodeval;
											$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
											$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
											$(this).closest("tr").find("#invalid-barcode").text('Barcode ' + barcode + ' already declared!');
											return false;
										} else {

											if (counter == barcodeArrayLength) {
												barcodeArray[barcodeArrayLength - 1] = barcode;
												barcodeLocationArray[barcodeArrayLength - 1] = barcodeID;
											}

										}
										counter++;
									}
								} else {
									barcodeArray[0] = barcode;
									barcodeLocationArray[0] = barcodeID;
								}
								$(this).closest("tr").find(`.assetCode`).first().attr("assetID", asset_ID);
								$(this).closest("tr").find(`.assetCode`).first().text(asset_Code);
								$(this).closest("tr").find(`.assetName`).first().text(asset_Name);
								$(this).closest("tr").find(`.assetName`).first().attr("brand", brand_Name);
								$(this).closest("tr").find(`small`).first().text(brand_Name);
								$(this).closest("tr").find(`.assetClassification`).first().text(classification_Name);
								$(this).closest("tr").find(`.assetClassification`).first().attr("assetCategory", category_Name);
								$(this).closest("tr").find(`small`).last().text(category_Name);
								$(this).closest("tr").find(`.unitofmeasurement`).first().text(unitOfMeasurement);
								$(this).closest("tr").find(`.serialnumber`).first().text(serial_Number);
								$(this).closest("tr").find(`.availableStock`).first().text(available_Stock);
								$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().attr("inventoryStorageID", inventoryStorage_ID);
								$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().attr("inventoryStorageCode", inventoryStorage_Code);
								$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().text(inventoryStorageOffice_Name);
								$(this).closest("tr").find(`.quantity`).first().attr("availableStock", available_Stock);
								$(this).closest("tr").find("[name=barcode]").first().attr("stockInAssetID", stockInAsset_ID);
								$(this).closest("tr").find("[name=barcode]").removeClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").removeClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").text('');


							} else {
								$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").text('No item available!');
							}
						} else {
							$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-barcode").text('Please Input Less Than or Equal Characters!');
						}

					})
				} else if (data.length == 0) {
					$(this).closest("tr").find(`.assetCode`).first().text("-");
					$(this).closest("tr").find(`.assetCode`).first().attr("assetID", "-");
					$(this).closest("tr").find(`.assetName`).first().text("-");
					$(this).closest("tr").find(`.assetName`).first().attr("brand", "-");
					$(this).closest("tr").find(`small`).first().text("-");
					$(this).closest("tr").find(`.assetClassification`).first().text("-");
					$(this).closest("tr").find(`.assetClassification`).first().attr("assetCategory", "-");
					$(this).closest("tr").find(`small`).last().text("-");
					$(this).closest("tr").find(`.unitofmeasurement`).first().text("-");
					$(this).closest("tr").find(`.serialnumber`).first().text("-");
					$(this).closest("tr").find(`.availableStock`).first().text("-");
					$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().text("-");
					$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().attr("inventoryStorageID", "-");
					$(this).closest("tr").find(`.inventoryStorageOfficeName`).first().attr("inventoryStorageCode", "-");
					$(this).closest("tr").find(`.quantity`).first().attr("availableStock", "-");
					$(this).closest("tr").find("[name=barcode]").first().attr("stockInAssetID", "-");
					$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").text('No item available!');
				} else {
					$(this).closest("tr").find("[name=barcode]").removeClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").removeClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").text('');

				}
			}


		})
	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("change", "[name=quantity]", function() {
		const index     		= $(this).closest("tr").first().attr("index");
		const quantity  		= parseInt($(`#quantity${index}`).val());
        const barcodeval  		= $(this).closest("tr").find('[name=barcode]').val();
	
		const stockQuantity  	= parseInt($(`#quantity${index}`).attr("availableStock"));
		var stock = stockQuantity ? stockQuantity : "0";
				 if(barcodeval !==""){
						if(stock > quantity || stock == quantity ){
							$(`#quantity${index}`).removeClass("is-invalid").addClass("is-valid");
							$(this).closest("tr").find("#invalid-quantity").removeClass("is-invalid").addClass("is-valid");
							$(this).closest("tr").find("#invalid-quantity").text('');
							removeIsValid("#tableProjectRequestItems");
						}else{
							$(`#quantity${index}`).removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
							$(this).closest("tr").find("#invalid-quantity").text('Excessive amount of quantity!');
						}	
						
				}else{
					$(`#quantity${index}`).removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-quantity").text('No Item Selected');
				}
	  });	
	// ----- END KEYUP QUANTITY OR UNITCOST -----


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
		if (isProject) {
			$(".itemProjectTableBody").append(row);
		} else {
			$(".itemCompanyTableBody").append(row);
		}
		updateTableItems();
		initInputmask();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=quantity]${attr}`).map(element => element.value || "0");
		const unitCostArr = $.find(`#unitcost ${attr}`).map(element => element.value.replaceAll(",", "") || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount${attr}`).text(formatAmount(totalAmount, true));
		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			disposalID       		= "",
			reviseDisposalID 		= "",
			employeeID              = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			disposalStatus   		= false,
			disposalReason			= "",
			disposalRemarks   		= false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];
		
		let requestProjectItems = "";
		if (disposalID) {
			// CHARLES
			let disposalItemsData = getTableData(
				`ims_inventory_disposal_details_tbl`, 
				`*`, 
				`disposalID = ${disposalID}`,``,`assetID`);
				disposalItemsData.map(item => {
				requestProjectItems += getItemRow(true, item, readOnly,disposalStatus);
			})
			// requestProjectItems += getItemRow(true);
		} else {
			requestProjectItems += getItemRow(true);
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("disposalID", encryptString(disposalID));
		$("#btnBack").attr("status", disposalStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
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
	
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? disposalID : reviseDisposalID;
		let documentHeaderClass = isRevise || reviseDisposalID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseDisposalID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseDisposalID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("ADF", createdAt, reviseDocumentNo)}
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
							${disposalID && !isRevise ? getFormCode("ADF", createdAt, disposalID) : "---"}
							
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${disposalStatus && !isRevise ? getStatusStyle(disposalStatus) : "---"}
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
								${getDateApproved(disposalStatus, approversID, approversDate)}
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
							${disposalRemarks && !isRevise ? disposalRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="form_disposal">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
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
			<div class="col-md-12 col-sm-12">
			<div class="form-group">
				<label>Description ${!disabled ? "<code>*</code>" : ""}</label>
				<textarea class="form-control validate"
					data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
					minlength="1"
					maxlength="200"
					id="disposalReason"
					name="disposalReason"
					required
					rows="4"
					style="resize:none;"
					${disabled}>${disposalReason ?? ""}</textarea>
				<div class="d-block invalid-feedback" id="invalid-disposalReason"></div>
			</div>
		</div>


            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">DISPOSED ASSET/S</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxProjectHeader}
                                <th>Barcode ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Asset Code</th>
								<th>Asset Name </th>
								<th>Asset Classification </th>
								<th>UOM</th>
                                <th>Serial No. </th>
                                <th>Quantity Disposed ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Available Stocks </th>
                                <th>Storage Name</th>
								<th>Remarks ${!disabled ? "<code>*</code>" : ""}</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
                            ${requestProjectItems}
                        </tbody>
                    </table>
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonProjectAddDeleteRow}</div>
						<div>
						${button}
						</div>
					</div>
                </div>
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

			headerButton(true, "Add Asset Disposal");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise, isFromCancelledDocument);
			headerTabContent(false);
			formContent(data, readOnly, isRevise, isFromCancelledDocument);
			// headerButton(false, "", isRevise);
			// headerTabContent(false);
			// formContent(data, readOnly, isRevise);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- GET PURCHASE REQUEST DATA -----
	function getDisposalData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		if (id) {
			data["disposalID"] = id;
			formData.append("disposalID", id);

			if (status != "2") {
				data["disposalStatus"] = status;
				formData.append("disposalStatus", status);
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
			data["disposalReason"] = $("[name=disposalReason]").val()?.trim();
			// data["projectTotalAmount"]    = updateTotalAmount(true);
			// data["companyTotalAmount"]    = updateTotalAmount(false);
			
			formData.append("employeeID", sessionID);
			formData.append("disposalReason", $("[name=disposalReason]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["disposalID"] = id;

				formData.append("disposalID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["disposalStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("disposalStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["disposalStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("disposalStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "";

				const assetID 						= $("td [name=assetCode]", this).attr("assetID");
				const assetCode 					= $("td [name=assetCode]", this).text();
				const assetName 					= $("td [name=assetName]", this).text();
				const brand 						= $("td [name=assetName]", this).attr("brand");
				const assetClassification 			= $("td [name=assetClassification]", this).text();
				const assetCategory 				= $("td [name=assetClassification]", this).attr("assetCategory");
				const unitofmeasurement 			= $("td [name=unitofmeasurement]", this).text();
				const serialnumber 					= $("td [name=serialnumber]", this).text();
				const inventoryStorageOfficeName 	= $("td [name=inventoryStorageOfficeName]", this).text();
				const inventoryStorageID 			= $("td [name=inventoryStorageOfficeName]", this).attr("inventoryStorageID");
				const inventoryStorageCode 			= $("td [name=inventoryStorageOfficeName]", this).attr("inventoryStorageCode");
				const quantity 						= $("td [name=quantity]", this).val();
				const availableStock 				= $("td [name=quantity]", this).attr("availableStock");
				const barcode 						= $("td [name=barcode]", this).val();
				const stockInAssetID 			    = $("td [name=barcode]", this).attr("stockInAssetID");
				const disposalDetailRemarks 		= $("td [name=disposalDetailRemarks]", this).val();
				// const itemID    			= $("td [name=barcode]", this).attr("itemID");
				// const itemName    			= $("td [name=barcode]", this).attr("itemName");
				// const inventoryStorageID   	= $("td [name=barcode]", this).attr("inventoryStorageID");
				// const serialnumber   		= $("td [name=barcode]", this).attr("serialnumber");	
				// const barcode 				= $("td [name=barcode]", this).val();
				// const quantity 				= $("td [name=quantity]", this).val().replaceAll(",","");	
				// const unitofmeasurement 	= $("td [name=barcode]", this).attr("unitofmeasurement");
				// const disposalDetailRemarks = $("td [name=disposalDetailRemarks]", this).val();	
			

				// const itemID    = $("td [name=itemID]", this).val();
				// const quantity = +$("td [name=quantity]", this).val();	
				// const itemremarks = $("td [name=itemremarks]", this).val();	
				//const quantity = formatdate.format('YYYY-MM-DD');
			
				let temp = {
					assetID, assetCode, assetName, brand, assetClassification, assetCategory, unitofmeasurement, serialnumber, inventoryStorageOfficeName, inventoryStorageID,  inventoryStorageCode, quantity, availableStock, barcode, disposalDetailRemarks 
					
				};
				formData.append(`items[${i}][assetID]`, assetID);
				formData.append(`items[${i}][assetCode]`, assetCode);
				formData.append(`items[${i}][assetName]`, assetName);
				formData.append(`items[${i}][brand]`, brand);
				formData.append(`items[${i}][assetClassification]`, assetClassification);
				formData.append(`items[${i}][assetCategory]`, assetCategory);
				formData.append(`items[${i}][unitofmeasurement]`, unitofmeasurement);
				formData.append(`items[${i}][serialnumber]`, serialnumber);
				formData.append(`items[${i}][inventoryStorageOfficeName]`, inventoryStorageOfficeName);
				formData.append(`items[${i}][inventoryStorageID]`, inventoryStorageID);
				formData.append(`items[${i}][inventoryStorageCode]`, inventoryStorageCode);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][availableStock]`, availableStock);
				formData.append(`items[${i}][barcode]`, barcode);
				formData.append(`items[${i}][stockInAssetID]`, stockInAssetID);
				formData.append(`items[${i}][disposalDetailRemarks]`, disposalDetailRemarks);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);
			
				data["items"].push(temp);
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


    // ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("disposalID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		//const id = $(this).attr("disposalID");
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----
	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----

	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("disposalID"));
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getDisposalData(action, "save", "0", id);
				data.append("disposalStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseDisposalID", id);
					data.delete("disposalID");
				} else {
					data.append("disposalID", id);
					data.delete("action");
					data.append("action", "update");
				}
				saveDisposalItem(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getDisposalData(action, "save", "0", id);
			data.append("disposalStatus", 0);
			//data["disposalStatus"] = 0;
			//data.append("disposalStatus", 0);

			saveDisposalItem(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("disposalID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		//const id       = $(this).attr("disposalID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		//const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getDisposalData(action, "save", "0", id);
		//data.append("disposalStatus", 0);
		//data["disposalStatus"] = 0;
		data.append("disposalStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseDisposalID", id);
				data.delete("disposalID");
			// data["revisedisposalID"] = id;
			// delete data["disposalID"];
		} else {
			data.append("reviseDisposalID", id);
			data.delete("action");
			data.append("action", "update");
		}
			// data.append("revisedisposalID", id);
			// data.delete("disposalID");
		}

		saveDisposalItem(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {

		//let condition = $("[name=quantity]").hasClass("is-invalid");
		let condition2 = $("[name=quantity]").hasClass("is-invalid");
		if(!condition2){
		const id           = decryptString($(this).attr("disposalID"));
		const revise       = $(this).attr("revise") == "true";
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const validate     = validateForm("form_disposal");
		removeIsValid("#tableProjectRequestItems");
		if (validate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getDisposalData(action, "submit", "1", id);

			// const action = revise && "insert" || (id ? "update" : "insert");
			// const data   = getDisposalData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
				//const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				// data["reviseDisposalID"] = id;
				// delete data["disposalID"];
				data.append("reviseDisposalID", id);
				data.delete("disposalID");
				}
			}
			// let approversID   = data["approversID"], 
			// 	approversDate = data["approversDate"];
			let approversID = "", approversDate = "";
			for (var i of data) {
				if (i[0] == "approversID")   approversID   = i[1];
				if (i[0] == "approversDate") approversDate = i[1];
			}
			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                36,
					notificationTitle:       "Asset Disposal",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveDisposalItem(data, "submit", notificationData, pageContent);
		}
	}else{
		$("[name=quantity]").focus();
	}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("disposalID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getDisposalData(action, "cancelform", "4", id, status);

		saveDisposalItem(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("disposalID"));
		const feedback = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		let tableData  = getTableData("ims_inventory_disposal_tbl", "", "disposalID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getDisposalData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                36,
					tableID:                 id,
					notificationTitle:       "Disposal Item",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                36,
					tableID:                 id,
					notificationTitle:       "Disposal Item",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("disposalStatus", status);

			saveDisposalItem(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("disposalID"));
		const feedback = $(this).attr("code") || getFormCode("ADF", dateToday(), id);

		$("#modal_item_disposal_content").html(preloader);
		$("#modal_item_disposal .page-title").text("ASSET DISPOSAL");
		$("#modal_item_disposal").modal("show");
		let html = `
		
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="itemDisposalRemarks"
					name="itemDisposalRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-itemDisposalRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation" disposalID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_item_disposal_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("disposalID"));
		const feedback = $(this).attr("code") || getFormCode("ADF", dateToday(), id);

		const validate = validateForm("modal_item_disposal");
		if (validate) {
			let tableData = getTableData("ims_inventory_disposal_tbl", "", "disposalID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("disposalID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("disposalRemarks", $("[name=itemDisposalRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                36,
					tableID: 				 id,
					notificationTitle:       "Disposal Item",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveDisposalItem(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----
	

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const disposalID = decryptString($(this).attr("disposalID"));
		const feedback          = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		const id = decryptString($(this).attr("disposalID"));
		let data = new FormData;
		data.append("disposalID", disposalID);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveDisposalItem(data, "drop", null, pageContent);
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
	const title = "Disposal";
	let swalText, swalImg;

	$("#modal_item_disposal").text().length > 0 && $("#modal_item_disposal").modal("hide");

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

function saveDisposalItem(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `item_disposal/saveDisposalItem`,
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
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("ADF", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_item_disposal").text().length > 0 && $("#modal_item_disposal").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_item_disposal").text().length > 0 && $("#modal_item_disposal").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}


function getFixAvailableStocks(assetID = false){
	let availableStocks;
	if(assetID){
		$.ajax({
			method:      "POST",
			url:         `list_stocks/getliststocks`,
			data: 		 {classificationID:0,categoryID:0},
			async:       false,
			dataType:    "json",
			success: function(data) {
				let assetsArray = data["assets"].filter(x => x.assetID == assetID);
				let assetRow					= assetsArray[0];
				let stockIN						= assetRow.stockIN;
				let totalequipmentBorrowing		= assetRow.totalequipmentBorrowing;
				let materiaWithdrawalQuantity	= assetRow.materiaWithdrawalQuantity;
				let disposed					= assetRow.disposed;
				let reservedAsset				= assetRow.reservedAsset;
				let reOrderLevel				= assetRow.reOrderLevel;
				var assetTotalQty 	= parseFloat(stockIN) 		- (parseFloat(totalequipmentBorrowing) + parseFloat(materiaWithdrawalQuantity) + parseFloat(disposed) );
				availableStocks  	= parseFloat(assetTotalQty) - (parseFloat(reservedAsset) + parseFloat(reOrderLevel) );
			}
		});
	}
	return availableStocks;

}



// --------------- END DATABASE RELATION ---------------