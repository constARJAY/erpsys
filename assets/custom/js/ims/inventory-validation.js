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
					inventoryValidationStatus
				} = tableData[0];

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
					pageContent(true);
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


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "ims_inventory_item_tbl.itemID AS itemID, itemCode, itemName, itemDescription ,categoryName, unitOfMeasurementID, brandName",
		"itemStatus = 1");

	const designationList = getTableData("hris_designation_tbl JOIN hris_employee_list_tbl USING(designationID)","designationID, designationName, MAX(employeeHourlyRate) as designationRate", "designationStatus=1","","designationName");
    
	
         
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
					{ targets: 4,  width: 260 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80  },
					{ targets: 8,  width: 250 },
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
					{ targets: 4,  width: 260 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80  },
					{ targets: 8,  width: 250 },
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
					{ targets: 0,  width: 80  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 80 },
                    { targets: 7,  width: 150 }
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
					{ targets: 0,  width: 80  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 80 },
                    { targets: 7,  width: 150 }
				],
			});

			var table = $("#tableCompanyRequestItems")
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
					{ targets: 0,  width: 80  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 80 },
                    { targets: 7,  width: 150 }
				],
			});

			var table = $("#tableCompanyRequestItems0")
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
					{ targets: 0,  width: 80  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 80 },
                    { targets: 7,  width: 150 }
				],
			});

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
			if(isCreateAllowed(126)){
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;	
			}
        } else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" 
			revise="${isRevise}" cancel="${isFromCancelledDocument}">
			<i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let inventoryValidationData = getTableData(
			"ims_inventory_validation_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID != ${sessionID} AND inventoryValidationStatus != 0 AND inventoryValidationStatus != 4`,
			`FIELD(inventoryValidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Description</th>
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
				projectListCode,
				projectListName,
				purchaseRequestID,
				approversID,
				approversDate,
				inventoryValidationStatus,
				inventoryValidationRemarks,
				inventoryValidationReason,
				submittedAt,
				createdAt,
			} = item;
			let referenceNumber = getFormCode("PR",moment(createdAt),purchaseRequestID);
			
			let remarks       = inventoryValidationRemarks ? inventoryValidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryValidationStatus == 2 || inventoryValidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = inventoryValidationStatus != 0 ? "btnView" : "btnEdit";

			let button = inventoryValidationStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(inventoryValidationID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(inventoryValidationID )}" 
				code="${getFormCode("IVR", createdAt, inventoryValidationID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, inventoryValidationStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(inventoryValidationID )}">
					<td>${getFormCode("IVR", createdAt, inventoryValidationID )}</td>
					<td>${fullname}</td>
					<td>${referenceNumber}</td>
					<td>
						<div>
							${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectListCode || '-'}</small>
					</td>
					<td>${inventoryValidationReason || "-"}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryValidationStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(inventoryValidationStatus)}
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
			"ims_inventory_validation_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(inventoryValidationStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Description</th>
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
                projectListCode,
                projectListName,
				purchaseRequestID,
				approversID,
				approversDate,
				inventoryValidationStatus,
				inventoryValidationRemarks,
				inventoryValidationReason,
				submittedAt,
				createdAt,
			} = item;
			let referenceNumber = getFormCode("PR",moment(createdAt),purchaseRequestID);
			let remarks       = inventoryValidationRemarks ? inventoryValidationRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = inventoryValidationStatus == 2 || inventoryValidationStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = inventoryValidationStatus != 0 ? "btnView" : "btnEdit";

			let button = inventoryValidationStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(inventoryValidationID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(inventoryValidationID )}" 
                code="${getFormCode("IVR", createdAt, inventoryValidationID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(inventoryValidationID )}">
                <td>${getFormCode("IVR", createdAt, inventoryValidationID )}</td>
                <td>${fullname}</td>
				<td>${referenceNumber}</td>
				<td>
					<div>
						${projectListName || '-'}
					</div>
					<small style="color:#848482;">${projectListCode || '-'}</small>
				</td>
				<td>${inventoryValidationReason || "-"}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, inventoryValidationStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(inventoryValidationStatus)}
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
				purchaseRequestID 		  = "",
				inventoryValidationStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (inventoryValidationStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						inventoryValidationID="${encryptString(inventoryValidationID)}"
						code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
						revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (inventoryValidationStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
							status="${inventoryValidationStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(inventoryValidationStatus == 2){
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						inventoryValidationID="${encryptString(inventoryValidationID)}"
						code="${getFormCode("IVR", createdAt, inventoryValidationID)}"
						status="${inventoryValidationStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (inventoryValidationStatus == 3) {
					// DENIED - FOR REVISE
						if(!isDocumentRevised(inventoryValidationID)){
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
					if (!isDocumentRevised(inventoryValidationID)) {
						if(!isRevised(purchaseRequestID)){
							button = `
							<button
								class="btn btn-cancel px-5 p-2"
								id="btnRevise" 
								inventoryValidationID="${encryptString(inventoryValidationID)}"
								code="${getFormCode("CEF", createdAt, inventoryValidationID)}"
								status="${inventoryValidationStatus}"
								cancel="true"><i class="fas fa-clone"></i>
								Revise
							</button>`;
						}
					}
				}
			} else {
				if (inventoryValidationStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							inventoryValidationID="${encryptString(inventoryValidationID)}"
							code="${getFormCode("IVR", createdAt, inventoryValidationID)}"><i class="fas fa-ban"></i> 
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
				class="btn btn-cancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


    // ----- GET PROJECT LIST -----
    function getReferenceList(id = null, display = false) {
		var inventoryValidationData = getTableData("ims_inventory_validation_tbl");
		let html    = ``;
		let existPR = [];
		
		inventoryValidationData.filter(items => (items.inventoryValidationStatus == 2 || items.inventoryValidationStatus == 1 || items.inventoryValidationStatus == 0) ).map(items=>{
			var temp = id == items.purchaseRequestID ? "" : items.purchaseRequestID;
			existPR.push(temp);
		});
		let purchaseRequestData        = getTableData("ims_purchase_request_tbl","","purchaseRequestStatus='2'");
		
	   purchaseRequestData.map(purchaseRequestItems=>{
		let data = [];
		   if(!existPR.includes(purchaseRequestItems.purchaseRequestID)){
				let projectList   = getTableData(
					"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
					"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
					"projectListStatus = 1 && projectListID ="+purchaseRequestItems.projectID);
				let requestorName = getTableData(`hris_employee_list_tbl JOIN hris_designation_tbl USING(designationID) LEFT JOIN hris_department_tbl ON hris_employee_list_tbl.departmentID = hris_department_tbl.departmentID`, 
											"CONCAT(employeeFirstname,' ',employeeLastname) as employeeFullname, designationName, departmentName", "employeeID="+purchaseRequestItems.employeeID);
					if(projectList.length > 0){
						data["projectid"]			= projectList[0].projectListID;
						data["projectcode"]			= getFormCode("PRO",moment(projectList[0].createdAt),projectList[0].projectListID);
						data["projectname"]			= projectList[0].projectListName;
						data["clientcode"]			= projectList[0].clientCode;
						data["clientname"]			= projectList[0].clientName;
						data["address"] 			= `${projectList[0].clientUnitNumber && titleCase(projectList[0].clientUnitNumber)+", "}${projectList[0].clientHouseNumber && projectList[0].clientHouseNumber +", "}${projectList[0].clientBarangay && titleCase(projectList[0].clientBarangay)+", "}${projectList[0].clientCity && titleCase(projectList[0].clientCity)+", "}${projectList[0].clientProvince && titleCase(projectList[0].clientProvince)+", "}${projectList[0].clientCountry && titleCase(projectList[0].clientCountry)+", "}${projectList[0].clientPostalCode && titleCase(projectList[0].clientPostalCode)}`;
					}
					
				let {
					projectid				=	"0",
					projectcode				=	"-",
					projectname				=	"-",
					clientcode				=	"-",
					clientname				=	"-",
					address					=	"-",
				} = projectList.length > 0 && data;

					html +=  `<option 
									value                = "${purchaseRequestItems.purchaseRequestID}" 
									projectid 			 = "${projectid}"
									projectcode          = "${projectcode}"
									projectname          = "${projectname}"
									clientcode           = "${clientcode}"
									clientname           = "${clientname}"
									address              = "${address}"
									requestorname        = "${requestorName[0].employeeFullname}"
									requestordesignation = "${requestorName[0].designationName}"
									requestordepartment  = "${requestorName[0].departmentName}"
									${purchaseRequestItems.purchaseRequestID == id ? "selected":""}>
									${getFormCode("PR",moment(purchaseRequestItems.createdAt),purchaseRequestItems.purchaseRequestID)}
							</option>`;
			}
		});
		return html;
		
	}
    // ----- END GET PROJECT LIST -----

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		$("[name=itemID][company=true]").each(function(i, obj) {
			companyItemIDArr.push($(this).val());
			companyElementID.push(`#${this.id}[company=true]`);
			$(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			html += `<option value="-">None</option>`;
			html += inventoryItemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});

		companyElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			html += `<option value="-">None</option>`;
			html += inventoryItemList.filter(item => !companyItemIDArr.includes(item.itemID) || item.itemID == companyItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == companyItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, param, display = true) {
        let html		= "";
		let itemIDArr 	= []; // 0 IS THE DEFAULT VALUE
		// const attr = isProject ? "[project=true]" : "[company=true]";
		let attr;
		switch(param){	
			case "project":
					attr = "[project=true]";
					html += `<option selected disabled>Select Item Name</option>`;
					html += `<option value="-" ${id == "-" ? "selected":""}>None</option>`;
					 // 0 IS THE DEFAULT VALUE
					$(`[name=itemID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 

					html += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
						return `
						<option 
							value        = "${item.itemID}" 
							itemCode     = "${item.itemCode}"
							categoryName = "${item.categoryName}"
							uom          = "${item.unitOfMeasurementID}"
							${item.itemID == id && "selected"}>
							${item.itemName}
						</option>`;
					});
				break;
			case "company":
					attr = "[company=true]"
					html += `<option selected disabled>Select Item Name</option>`;
					html += `<option value="-" ${id == "-" && "selected"}>None</option>`;
					$(`[name=itemID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 
					html += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
						return `
						<option 
							value        = "${item.itemID}" 
							itemCode     = "${item.itemCode}"
							categoryName = "${item.categoryName}"
							uom          = "${item.unitOfMeasurementID}"
							${item.itemID == id && "selected"}>
							${item.itemName}
						</option>`;
					});
				break;
			case "personnel":
					attr = "[personnel=true]";
					html += `<option selected disabled>Select Designation</option>`;
					html += `<option value="-" ${id == 0 && "selected"}>None</option>`;
					$(`[name=designationID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 
					html += designationList.filter(item => !itemIDArr.includes(item.designationID) || item.designationID == id).map(item => {
						return `
						<option 
							value        	= "${item.designationID}" 
							designationCode	= "${getFormCode("DSN",moment(),item.designationID)}"
							hourlyRate 		= "${item.designationRate}"
							${item.designationID == id && "selected"}>
							${item.designationName}
						</option>`;
					});

				break;
			default:
					attr = "[travel=true]";
		}

		
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
    function getItemRow(param, item = {}, readOnly = false) {
		let html = param == "project" ? getProjectRow(item, readOnly) : getCompanyRow(item, readOnly);
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

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `projectitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `projectQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// FILE
			$("td .file [name=files]", this).attr("id", `projectFiles${i}`);
		})

		$(".itemCompanyTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("company", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("company", `true`);
				$(this).attr("id", `companycompanyitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `companyQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("company", `true`);
			
			// UOM
			$("td .uom", this).attr("id", `uom${i}`);
			
			// FILE
			$("td .file [name=files]", this).attr("id", `companyFiles${i}`);
		})

		$(".personnelTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("personnel", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("personnel", `true`);
				$(this).attr("id", `personnelid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `personnelQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("personnel", `true`);
			$("td .quantity [name=quantity]", this).next().attr("id", `personnelQuantity${i}`);
			
			// TOTAL HOURS
			$("td .totalhours [name=employeeTotalHours]", this).attr("id", `employeeTotalHours${i}`);
			$("td .totalhours [name=employeeTotalHours]", this).attr("personnel", `true`);
			$("td .totalhours [name=employeeTotalHours]", this).next().attr("id", `employeeTotalHours${i}`);
		})

		$(".travelTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("travel", `true`);

			// DESCRIPTION
			$("td .description [name=description]", this).attr("id", `description${i}`);
			$("td .description [name=description]", this).attr("travel", `true`);
			$("td .description [name=description]", this).next().attr("id", `invalid-description${i}`);
			
			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `travelQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("travel", `true`);
			$("td .quantity [name=quantity]", this).next().attr("id", `invalid-travelQuantity${i}`);
			
			// UOM
			// ITEMNAME
			$(this).find("select").each(function(j) {
				// const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("travel", `true`);
				$(this).attr("id", `travelUom${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});
			// $("td .uom [name=travelUom]", this).attr("id", `travelUom${i}`);
			$("td .uom [name=travelUom]", this).next().attr("id", `invalid-travelUom${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let thisArray = ["[project=true]|projectCount","[company=true]|companyCount",
						 "[personnel=true]|personnelCount","[travel=true]|travelCount"	
						];
		thisArray.map(items=>{
			var splitItems = items.split("|");
			 splitItems[1] = 0;
			$(".checkboxrow"+splitItems[0]).each(function() {
				this.checked && splitItems[1]++;
			})
			$(".btnDeleteRow"+splitItems[0]).attr("disabled", splitItems[1] == 0);
		});
	}
	// ----- END UPDATE DELETE BUTTON -----

	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=documentID]", function() {
		const id 					= $(this).val();
		const projectid 			= $('option:selected',this).attr("projectid");
        const projectcode           = $('option:selected', this).attr("projectcode");
        const projectname           = $('option:selected', this).attr("projectname");
        const clientcode            = $('option:selected', this).attr("clientcode");
        const clientname            = $('option:selected', this).attr("clientname");
        const address               = $('option:selected', this).attr("address");
        const requestorname         = $('option:selected', this).attr("requestorname");
        const requestordepartment   = $('option:selected', this).attr("requestordepartment");
        const requestordesignation  = $('option:selected', this).attr("requestordesignation");
		$("[name=projectCode]").attr("projectid",projectid);
        $("[name=projectCode]").val(projectcode);
        $("[name=projectName]").val(projectname);
        $("[name=clientCode]").val(clientcode);
        $("[name=clientName]").val(clientname);
        $("[name=clientAddress]").val(address);
        $("[name=requestorName]").val(requestorname);
        $("[name=requestorDepartment]").val(requestordepartment);
        $("[name=requestorPosition]").val(requestordesignation);

        $(".itemProjectTableBody").html('<tr><td colspan="7">'+preloader+'</td></tr>');
        $(".itemCompanyTableBody").html('<tr><td colspan="7">'+preloader+'</td></tr>');
        let itemProjectTableBody = requestItemData(id, "project");
		let itemCompanyTableBody = requestItemData(id, "company");


        setTimeout(() => {
			$(".itemProjectTableBody").html(itemProjectTableBody);
            $(".itemCompanyTableBody").html(itemCompanyTableBody);
			initAmount();
			// initDataTables();
			// initAll();
		}, 300);




    })
    // ----- END SELECT PROJECT LIST -----

    // ----- SELECT ITEM NAME -----
    $(document).on("keyup", "[name=stocks]", function() {
		let thisID 				= $(this).attr("id");
		let thisValue 			= $(this).val().replaceAll(",","");
		let quantityRequested 	= $(this).closest("tr").find(".qtyrequested").first().text().replaceAll(",","");
		let difference 			= parseFloat(quantityRequested) - parseFloat(thisValue || 0);
		let forPurchase 		= parseFloat(difference < 0.01 ? "0" : (difference||"-")).toFixed(2);
		$(this).closest("tr").find(".forpurchase").first().text(forPurchase);
		if(parseFloat(thisValue || 0) > parseFloat(quantityRequested) ){
			setTimeout(() => {
				$("#"+thisID).addClass("is-invalid").removeClass("is-valid");
				$("#"+thisID).next().text("Too much quantity to be issued!");
			}, 150);
		}
    })
    // ----- END SELECT ITEM NAME -----

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
				<span class="filename">${filename}</span>
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
		let attr;
		if($(this).attr("project") == "true"){
			attr = "project";
		}else if($(this).attr("company") == "true"){
			attr = "company";
		}else if($(this).attr("personnel") == "true"){
			attr = "personnel";
		}else{
			attr = "travel";
		}
		deleteTableRow(attr);
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
		// const isProject = $(this).attr("project") == "true";
		let attr;

		if($(this).attr("project") == "true"){
			attr = "[project=true]";
		}else if($(this).attr("company") == "true"){
			attr = "[company=true]";
		}else if($(this).attr("personnel") == "true"){
			attr = "[personnel=true]";
		}else{
			attr = "[travel=true]";
		}
		$(".checkboxrow"+attr).each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----

	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=quantity]${attr}`).map(element => element.value || "0");
		const unitCostArr = $.find(`[name=unitCost]${attr}`).map(element => element.value.replaceAll(",", "") || "0");
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
			inventoryValidationID       = "",
			reviseInventoryValidationID = "",
			employeeID           		= "",
			projectID            		= "",
            purchaseRequestID 	 		= "",
			inventoryValidationReason   = "",
			inventoryValidationRemarks  = "",
			approversID          		= "",
			approversStatus      		= "",
			approversDate        		= "",
			inventoryValidationStatus   = false,
			submittedAt          		= false,
			createdAt            		= false,
		} = data && data[0];

		let requestProjectItems = "", requestCompanyItems = "";
		if (inventoryValidationID) {
            requestProjectItems = requestItemData(purchaseRequestID, "project", readOnly, `inventoryValidationID = '${inventoryValidationID}'`);
            requestCompanyItems = requestItemData(purchaseRequestID, "company", readOnly, `inventoryValidationID = '${inventoryValidationID}'`);
		}
		let projectCode="",projectName="",clientCode="",clientName="",clientAddress="";
		var requestorname="",requestordepartment="",requestorposition="";
		if(purchaseRequestID){
			var purchaseRequestitems = [];
			let purchaseRequestData     = getTableData("ims_purchase_request_tbl","","purchaseRequestStatus='2' AND purchaseRequestID="+purchaseRequestID);
			purchaseRequestData.map(purchaseRequestItems=>{
					let projectList   = getTableData(
						"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
						"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
						"projectListStatus = 1 && projectListID ="+purchaseRequestItems.projectID);
					
					var requestorData = getTableData(`hris_employee_list_tbl JOIN hris_designation_tbl USING(designationID) LEFT JOIN hris_department_tbl ON hris_employee_list_tbl.departmentID = hris_department_tbl.departmentID`, 
												"CONCAT(employeeFirstname,' ',employeeLastname) as employeeFullname, designationName, departmentName", "employeeID="+purchaseRequestItems.employeeID);

					if(projectList.length > 0){
						purchaseRequestitems["projectid"]			= projectList[0].projectListID;
						purchaseRequestitems["projectcode"]			= getFormCode("PRO",moment(projectList[0].createdAt),projectList[0].projectListID);
						purchaseRequestitems["projectname"]			= projectList[0].projectListName;
						purchaseRequestitems["clientcode"]			= projectList[0].clientCode;
						purchaseRequestitems["clientname"]			= projectList[0].clientName;
						purchaseRequestitems["address"] 			= `${projectList[0].clientUnitNumber && titleCase(projectList[0].clientUnitNumber)+" "}${projectList[0].clientHouseNumber && projectList[0].clientHouseNumber +" "}${projectList[0].clientBarangay && titleCase(projectList[0].clientBarangay)+", "}${projectList[0].clientCity && titleCase(projectList[0].clientCity)+", "}${projectList[0].clientProvince && titleCase(projectList[0].clientProvince)+", "}${projectList[0].clientCountry && titleCase(projectList[0].clientCountry)+", "}${projectList[0].clientPostalCode && titleCase(projectList[0].clientPostalCode)}`;
					}

					var {	
						projectid			="0",
						projectcode			="-",
						projectname			="-",
						clientcode			="-",
						clientname			="-",
						address 			="-"
					}	= projectList.length > 0 && purchaseRequestitems;
					
					
						if(purchaseRequestItems.purchaseRequestID	== purchaseRequestID){
							projectID 			= projectid;
							projectCode			= projectcode;
							projectName			= projectname;
							clientCode			= clientcode;
							clientName			= clientname;
							clientAddress		= address;
							requestorname		= requestorData[0].employeeFullname;
							requestordepartment	= requestorData[0].designationName;
							requestorposition	= requestorData[0].departmentName;
						}
				});
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("inventoryValidationID", encryptString(inventoryValidationID));
		$("#btnBack").attr("status", inventoryValidationStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		

		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let tableCompanyRequestItemsName = !disabled ? "tableCompanyRequestItems" : "tableCompanyRequestItems0";

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
							${inventoryValidationStatus && !isRevise ? getStatusStyle(inventoryValidationStatus) : "---"}
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
                    <label>Prepared By</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="${employeeDesignation||"-"}">
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
                        ${disabled}>${inventoryValidationReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-inventoryValidationReason"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="documentID"
                        id="documentID"
                        style="width: 100%"
                        required
						${inventoryValidationID == "" ? ``: `disabled`}>
                        <option selected disabled>Select Reference No.</option>
                        ${getReferenceList(purchaseRequestID,readOnly)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-documentID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" projectid="${projectID||""}" disabled value="${projectCode||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name </label>
                    <input type="text" class="form-control" name="projectName" disabled value="${projectName||"-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="${clientCode||"-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="${clientName||"-"}">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="${clientAddress||"-"}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Requestor Name</label>
                    <input type="text" class="form-control" disabled name="requestorName" value="${requestorname||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled name="requestorDepartment" value="${requestordepartment||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled name="requestorPosition" value="${requestorposition||"-"}">
                </div>
            </div>
            <div class="col-sm-12">
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Materials and Equipment</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>UOM</th>
                                <th>Quantity Requested</th>
								<th>Available Stocks</th>
                                <th>No. of Issuance ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>For Purchase</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
							${requestProjectItems}
						</tbody>
                    </table>
                </div>
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Company Materials and Equipment</div>
                    <table class="table table-striped" id="${tableCompanyRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								<th>Item Code</th>
                                <th>Item Name</th>
                                <th>UOM</th>
                                <th>Quantity Requested</th>
								<th>Available Stocks</th>
                                <th>No. of Issuance ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>For Purchase</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody class="itemCompanyTableBody" company="true">
							${requestCompanyItems}
						</tbody>
                    </table>
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
			initAmount();
			updateInventoryItemOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
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

			headerButton(true, "Add Inventory Validation");
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


	// ----- GET Inventory Validation DATA -----
	function getinventoryValidationData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["inventoryValidationID"] = id;

			if (status != "2") {
				data["inventoryValidationStatus"] = status;
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		if (currentStatus == "0" && method != "approve") {
			
			data["employeeID"]            = sessionID;
			data["projectID"]             = $("[name=projectCode]").attr("projectid") || null;
			data["documentID"] 			  = $("[name=documentID]").val() || null;
			data["inventoryValidationReason"] 	  = $("[name=inventoryValidationReason]").val()?.trim();
			
		

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();
			} else if (action == "update") {
				data["inventoryValidationID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]           = approversID;
					data["inventoryValidationStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["inventoryValidationStatus"] = 2;
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				var itemID 			= $(this).find(".itemcode").attr("itemid");
				var requestItemID 	= $(this).find(".itemcode").attr("requestitem");
				var tableData 		= inventoryItemList.filter(items=> items.itemID == itemID);
				var requestItemData = getTableData(`ims_request_items_tbl`,"","requestItemID="+requestItemID);
				var temp = {
					requestItemID:	$(this).find(".itemcode").attr("requestitem"),
					costEstimateID: $(this).find(".itemcode").attr("costestimateid"),
					category:		$(this).attr("category"),
					itemID:			itemID,
					itemname:		tableData[0].itemName,
					itemUom:		tableData[0].unitOfMeasurementID,
					brandName: 		tableData[0].brandName,
					itemDescription:tableData[0].itemDescription,
					quantity:		$(this).find(".qtyrequested").text(),
					stocks:			$(this).find("[name=stocks]").val(),
					files: 			requestItemData[0].files,
					forPurchase:	$(this).find(".forpurchase").text() == "-"? "0": $(this).find(".forpurchase").text(),
					updatedBy:		sessionID
				};
				data[`items`].push(temp);
			});
		} 

		

		return data;
	}
	// ----- END GET Inventory Validation DATA -----


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
		const id = decryptString($(this).attr("inventoryValidationID"));
		const fromCancelledDocument = $(this).attr("cancel")== "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise     				= $(this).attr("revise") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("IVR", dateToday(), id);
		const status     				= $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data   = getinventoryValidationData(action, "save", "0", id);
				data["inventoryValidationStatus"] 	=	0;
				if(!isFromCancelledDocument){
					data["reviseInventoryValidationID"] = id;
					delete data["inventoryValidationID"]; 
				}else{
					data["inventoryValidationID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
				
	
				saveinventoryValidation(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getinventoryValidationData(action, "save", "0", id);
			data["inventoryValidationStatus"] 	=	0;
			
			saveinventoryValidation(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("IVR", dateToday(), id);
		const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     					= getinventoryValidationData(action, "save", "0", id);
		data["inventoryValidationStatus"] 	=	0;
		if (revise) {
			if(!isFromCancelledDocument){
				data["reviseInventoryValidationID"] = id;
				delete data["inventoryValidationID"]; 
			}else{
				data["inventoryValidationID"] = id;
				delete data["action"];
				data["action"] = "update";
			}	
		}	
		saveinventoryValidation(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           				= decryptString($(this).attr("inventoryValidationID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_inventory_validation");
		const validateIssuance			= validateIssuanceQty();
		removeIsValid("#tableProjectRequestItems");
		removeIsValid("#tableCompanyRequestItems");
		
		if (validate && validateIssuance) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getinventoryValidationData(action, "submit", "1", id);

			if (revise) {
				if(!isFromCancelledDocument){
					data["reviseInventoryValidationID"] = id;
					delete data["inventoryValidationID"];  
				}
			}

			let approversID = "", approversDate = "";
			for (var i of Object.keys(data)) {
				if (i == "approversID")   approversID   = data[i];
				if (i == "approversDate") approversDate = data[i];
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
			saveinventoryValidation(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("inventoryValidationID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getinventoryValidationData(action, "cancelform", "4", id, status);

		saveinventoryValidation(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("inventoryValidationID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("ims_inventory_validation_tbl", "", "inventoryValidationID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let inventoryValidationID  = tableData[0].inventoryValidationID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getinventoryValidationData("update", "approve", "2", id);
			data["approversStatus"]	= updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"]	= dateApproved;

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
				thisCondition = true;
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

			data["inventoryValidationStatus"]	= status;
			saveinventoryValidation(data, "approve", notificationData, pageContent, inventoryValidationID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("inventoryValidationID"));
		const feedback = $(this).attr("code") || getFormCode("IVR", dateToday(), id);

		$("#modal_inventory_validation_content").html(preloader);
		$("#modal_inventory_validation .page-title").text("DENY INVENTORY VALIDATION");
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
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			inventoryValidationID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
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

				let data = {};
				data["action"]						= "update";
				data["method"]						= "deny";
				data["inventoryValidationID"]		= id;
				data["approversStatus"]				= updateApproveStatus(approversStatus, 3);
				data["approversDate"]				= updateApproveDate(approversDate);
				data["inventoryValidationRemarks"]	= $("[name=inventoryValidationRemarks]").val()?.trim();
				data["updatedBy"]					= sessionID;

				let notificationData = {
					moduleID:                126,
					tableID: 				 id,
					notificationTitle:       "Inventory Validation",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveinventoryValidation(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const inventoryValidationID = decryptString($(this).attr("inventoryValidationID"));
		const feedback       		= $(this).attr("code") || getFormCode("IVR", dateToday(), id);

		const id = decryptString($(this).attr("inventoryValidationID"));
		let data = {
			inventoryValidationID, action:"update", method:  "drop", updatedBy: sessionID
		};

		saveinventoryValidation(data, "drop", null, pageContent);
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

    // GETTING REQUEST ITEMS 
        function requestItemData(id, type, readOnly = false, requestID = null){
			// console.log(id+" | "+type+" | "+readOnly+" | "+requestID);
			let html = "";
			let condition = requestID ? requestID : `purchaseRequestID='${id}' AND inventoryValidationID IS NULL`;
            let tableData = getTableData("ims_request_items_tbl JOIN ims_inventory_item_tbl USING(itemID)",
                                        `requestItemID, costEstimateID , inventoryValidationID, ims_inventory_item_tbl.itemID AS itemID,
										 categoryType ,ims_inventory_item_tbl.createdAt AS createdAt ,ims_request_items_tbl.itemName as itemName, 
										 ims_request_items_tbl.itemDescription as itemDescription,itemUom,quantity,stocks,forPurchase,files,
										 (SELECT SUM(ims_stock_in_total_tbl.quantity) FROM ims_stock_in_total_tbl WHERE itemID = ims_inventory_item_tbl.itemID) AS availableStocks`,
                                        `${condition} AND categoryType='${type}' AND purchaseOrderID IS NULL AND bidRecapID IS NULL`);
				tableData.map((items,index)=>{
					let files = items.files? `<a class="filename" href="${base_url+"assets/upload-files/request-items/"+items.files}" 
													target="_blank">${items.files}
											  </a>`:"-";
                                        if (readOnly) {
                                            html += `
                                            <tr class="itemTableRow" category="${type}">
                                                <td>
                                                    <div class="itemcode" requestitem="${items.requestItemID}" itemid="${items.itemID}" costEstimateID="${items.costEstimateID}">
														${getFormCode("ITM",moment(items.createdAt), items.itemID)}
													</div>
                                                </td>
                                                <td>
                                                    <div class="itemname">${items.itemName}</div>
                                                </td>
												<td>
                                                    <div class="uom">${items.itemUom}</div>
                                                </td>
												<td class="text-center">
                                                    <div class="qtyrequested">${items.quantity}</div>
                                                </td>
												<td class="text-center">
                                                    <div class="availablestocks">${items.availableStocks ? formatAmount(items.availableStocks, true).replaceAll("₱","") : "0"}</div>
                                                </td>
                                                <td class="text-center">
                                                    <div class="stocks">${items.stocks}</div>
                                                </td>
                                                <td class="text-center">
                                                    <div class="forpurchase">${items.forPurchase}</div>
                                                </td>
                                                <td>
                                                    <div class="file">${files}</div>
                                                </td>
                                            </tr>`;
                                        } else {
                                            html += `
                                            <tr class="itemTableRow" category="${type}">
                                                <td>
                                                    <div class="itemcode" requestitem="${items.requestItemID}" itemid="${items.itemID}" costEstimateID="${items.costEstimateID}">${getFormCode("ITM",moment(items.createdAt), items.itemID)}</div>
                                                </td>
                                                <td>
                                                    <div class="itemname">${items.itemName}</div>
                                                </td>
												<td>
                                                    <div class="uom">${items.itemUom}</div>
                                                </td>
												<td class="text-center">
                                                    <div class="qtyrequested">${items.quantity}</div>
                                                </td>
												<td class="text-center">
                                                    <div class="availablestocks">${items.availableStocks ? formatAmount(items.availableStocks, true).replaceAll("₱","") : "0"}</div>
                                                </td>
                                                <td class="text-center">
                                                    <div class="stocks">
                                                        <input 
                                                            type="text" 
                                                            class="form-control amount text-center"
                                                            data-allowcharacters="[0-9][.]" 
                                                            max="99999" 
                                                            id="${type}stocks${index}" 
                                                            name="stocks" 
                                                            value="${items.stocks?items.stocks:""}" 
                                                            minlength="1" 
                                                            maxlength="20" 
                                                            required>
                                                        <div class="invalid-feedback d-block" id="invalid-${type}stocks${index}"></div>
                                                    </div>
                                                </td>
                                                <td class="text-center">
                                                    <div class="forpurchase">${items.forPurchase || items.quantity}</div>
                                                </td>
                                                <td>
                                                    <div class="file">
                                                        ${files}
                                                    </div>
                                                </td>
                                            </tr>`;
                                        }
				});
            return html;
        }
    // END GETTING REQUEST ITEMS



	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("ims_inventory_validation_tbl","purchaseRequestID",`purchaseRequestID='${id}' AND inventoryValidationStatus != '4'`);
		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED

	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----

	// ----- FOR NO. ISSUANCE VALIDATION

	
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

function saveinventoryValidation(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					url:	base_url+`ims/inventory_validation/save_inventory_validation`,
					method: "POST",
					async:  false,
					dataType:    "json",
					data,
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
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("IVR", dateCreated, insertedID)} dropped successfully!`;
						}
		
						if (isSuccess == "true") {
							setTimeout(() => {
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
					error: function(xhr) {
						setTimeout(() => {
							$("#loader").hide();
							console.log(xhr.responseText);
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
	return thisReturnData;
}

// --------------- END DATABASE RELATION ---------------


function validateIssuanceQty(){
	let returnData = 0;
	$(`[name=stocks]`).each(function(i){
		var thisID	 	=	this.id;
		var thisValue 	=	this.value.replaceAll(",","");
		var	requestedQty =  $(this).closest("tr").find(".qtyrequested").first().text().replaceAll(",","");
			if( parseFloat(thisValue) > parseFloat(requestedQty) ){
					$("#"+thisID).addClass("is-invalid").removeClass("is-valid");
					$("#"+thisID).next().text("Too much quantity to be issued!");
				returnData += 1;
			}
	});
	return returnData > 0 ? false : true;
}
// ----- END FOR NO. ISSUANCE VALIDATION