$(document).ready(function() {

	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(37);
	if(!allowedUpdate){
		$("#page_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnSubmit").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("Transfer Request");
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


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
			const tableData = getTableData("ims_transfer_request_tbl", "", "transferRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					transferRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (transferRequestStatus == 0 || transferRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (transferRequestStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly, true);
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
			let id = decryptString(view_id);
				id && isFinite(id) && loadData(id, isRevise);
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
			window.history.pushState("", "", `${base_url}ims/transfer_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/transfer_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/transfer_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/transfer_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN  ims_list_stocks_details_tbl USING(itemID) LEFT JOIN  ims_list_stocks_tbl USING(listStocksID) LEFT JOIN ims_inventory_storage_tbl USING(inventoryStorageID)", "itemID, itemCode, itemName, unitOfMeasurementID,brandName,inventoryStorageID ",
		"itemStatus = 1  GROUP BY itemID");

	const projectList = getTableData(
		"ims_inventory_storage_tbl AS storage LEFT JOIN hris_department_tbl AS department ON storage.inventoryStorageDepartment = department.departmentID", 
		"departmentName,inventoryStorageID, inventoryStorageCode, inventoryStorageOfficeName,inventoryStorageOfficeName,inventoryStorageRoomType, inventoryStorageRegion, inventoryStorageProvince, inventoryStorageMunicipality, inventoryStorageBarangay, inventoryStorageUnitNumber, inventoryStorageHouseNumber, inventoryStorageCountry, inventoryStorageZipCode",
		"inventoryStorageStatus = 1");
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
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 180 },
					{ targets: 8,  width: 180 },
					{ targets: 9,  width: 180 },
					{ targets: 10,  width: 80  },
					{ targets: 11, width: 300 },
					{ targets: 12, width: 80  },
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
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 180 },
					{ targets: 8,  width: 180 },
					{ targets: 9,  width: 180 },
					{ targets: 10,  width: 80  },
					{ targets: 11, width: 300 },
					{ targets: 12, width: 80  },
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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 120 },
					{ targets: 3,  width: 140  },
					{ targets: 4,  width: 50 },
					{ targets: 5,  width: 100 },
					{ targets: 6,  width: 140 },
					{ targets: 7,  width: 50 }
					// { targets: 9,  width: 200 },
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
					{ targets: 0,  width: 150  },
					{ targets: 1,  width: 120 },
					{ targets: 2,  width: 200 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 50 },
					{ targets: 5,  width: 120 },
					{ targets: 6,  width: 50 }
					// { targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_transfer_request_tbl", "approversID")) {
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
	function headerButton(isAdd = true, text = "Add", isRevise = false) {
		let html;
		if (isAdd) {
			if(isCreateAllowed(37)){
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let transferRequestData = getTableData(
			"ims_transfer_request_tbl AS imtrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN ims_inventory_storage_tbl AS imsr ON imsr.inventoryStorageID  = imtrt.inventoryStorageIDSender LEFT JOIN ims_inventory_storage_tbl AS imsr2 ON imsr2.inventoryStorageID  = imtrt.inventoryStorageIDReceiver",
			"imtrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imtrt.createdAt AS dateCreated,imsr.inventoryStorageCode as inventoryStorageCode1 , imsr.inventoryStorageOfficeName as inventoryStorageOfficeName1 ,imsr2.inventoryStorageCode as inventoryStorageCode2, imsr2.inventoryStorageOfficeName as inventoryStorageOfficeName2",
			`imtrt.employeeID != ${sessionID} AND transferRequestStatus != 0 AND transferRequestStatus != 4`,
			`FIELD(transferRequestStatus, 0, 1, 3, 2, 4), COALESCE(imtrt.submittedAt, imtrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Storage Code</th>
                    <th>Storage Name(Sender)</th>
					<th>Storage Code</th>
                    <th>Storage Name(Receiver)</th>
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

		transferRequestData.map((item) => {
			let {
				fullname,
				transferRequestID,
				projectID,
				inventoryStorageCode1,
                inventoryStorageOfficeName1,
				inventoryStorageCode2,
                inventoryStorageOfficeName2,
			
				approversID,
				approversDate,
				transferRequestStatus,
				transferRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = transferRequestRemarks ? transferRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = transferRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = transferRequestStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(transferRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(transferRequestID )}" 
				code="${getFormCode("TR", createdAt, transferRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, transferRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("TR", createdAt, transferRequestID )}</td>
					<td>${fullname}</td>
					<td>${inventoryStorageCode1 || '-'}</td>
					<td>${inventoryStorageOfficeName1 || '-'}</td>
					<td>${inventoryStorageCode2 || '-'}</td>
					<td>${inventoryStorageOfficeName2 || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, transferRequestStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(transferRequestStatus)}
					</td>
					<td>${remarks}</td>
					<td class="text-center">
						${button}
					</td>
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
			"ims_transfer_request_tbl AS imtrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN ims_inventory_storage_tbl AS imsr ON imsr.inventoryStorageID  = imtrt.inventoryStorageIDSender LEFT JOIN ims_inventory_storage_tbl AS imsr2 ON imsr2.inventoryStorageID  = imtrt.inventoryStorageIDReceiver",
			"imtrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imtrt.createdAt AS dateCreated, imsr.inventoryStorageCode as inventoryStorageCode1 , imsr.inventoryStorageOfficeName as inventoryStorageOfficeName1 ,imsr2.inventoryStorageCode as inventoryStorageCode2, imsr2.inventoryStorageOfficeName as inventoryStorageOfficeName2",
			`imtrt.employeeID = ${sessionID}`,
			`FIELD(transferRequestStatus, 0, 1, 3, 2, 4), COALESCE(imtrt.submittedAt, imtrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Storage Code</th>
                    <th>Storage Name(Sender)</th>
					<th>Storage Code</th>
                    <th>Storage Name(Receiver)</th>
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

		transferRequestData.map((item) => {
			let {
				fullname,
				transferRequestID,
                projectID,
                inventoryStorageCode1,
                inventoryStorageOfficeName1,
				inventoryStorageCode2,
                inventoryStorageOfficeName2,
               
				approversID,
				approversDate,
				transferRequestStatus,
				transferRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = transferRequestRemarks ? transferRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = transferRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = transferRequestStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(transferRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(transferRequestID )}" 
                code="${getFormCode("TR", createdAt, transferRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("TR", createdAt, transferRequestID )}</td>
                <td>${fullname}</td>
                <td>${inventoryStorageCode1 || '-'}</td>
                <td>${inventoryStorageOfficeName1 || '-'}</td>
				<td>${inventoryStorageCode2 || '-'}</td>
                <td>${inventoryStorageOfficeName2 || '-'}</td>
               
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, transferRequestStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(transferRequestStatus)}
                </td>
				<td>${remarks}</td>
                <td class="text-center">
                    ${button}
                </td>
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
	function formButtons(data = false, isRevise = false) {
		let button = "";
		if (data) {
			let {
				transferRequestID     = "",
				transferRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (transferRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						transferRequestID="${transferRequestID}"
						code="${getFormCode("TR", createdAt, transferRequestID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel" 
							id="btnCancel"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							transferRequestID="${transferRequestID}"
							code="${getFormCode("TR", createdAt, transferRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (transferRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							transferRequestID="${transferRequestID}"
							code="${getFormCode("TR", createdAt, transferRequestID)}"
							status="${transferRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (transferRequestStatus == 3) {
					// DENIED - FOR REVISE
					button = `
					<button
						class="btn btn-cancel"
						id="btnRevise" 
						transferRequestID="${encryptString(transferRequestID)}"
						code="${getFormCode("TR", createdAt, transferRequestID)}"
						status="${transferRequestStatus}"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			} else {
				if (transferRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							transferRequestID="${encryptString(transferRequestID)}"
							code="${getFormCode("TR", createdAt, transferRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							transferRequestID="${encryptString(transferRequestID)}"
							code="${getFormCode("TR", createdAt, transferRequestID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


    // ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html ='';
		// let html = `
		// <option 
		// 	value       = "0"
		// 	inventoryStorageName = "-"
		// 	storageDepartment  = "-"
		// 	storageAddress     = "-"
		// 	officeName  = "-"
		// 	roomType    = "-"
		// 	${id == "0" && "selected"}>N/A</option>`;
        html += projectList.map(project => {
			let address = `${project.inventoryStorageUnitNumber && titleCase(project.inventoryStorageUnitNumber)+", "}${project.inventoryStorageHouseNumber && project.inventoryStorageHouseNumber +", "}${project.inventoryStorageBarangay && titleCase(project.inventoryStorageBarangay)+", "}${project.inventoryStorageMunicipality && titleCase(project.inventoryStorageMunicipality)+", "}${project.inventoryStorageProvince && titleCase(project.inventoryStorageProvince)+", "}${project.inventoryStorageCountry && titleCase(project.inventoryStorageCountry)+", "}${project.inventoryStorageZipCode && titleCase(project.inventoryStorageZipCode)}`;

            return `
            <option 
                value       = "${project.inventoryStorageID}" 
                inventoryStorageName = "${project.inventoryStorageOfficeName}"
                storageDepartment  = "${project.departmentName}"
				storageAddress     = "${address}"
				officeName  = "${project.inventoryStorageOfficeName}"
				roomType  = "${project.inventoryStorageRoomType}"
                ${project.inventoryStorageID  == id && "selected"}>
                ${project.inventoryStorageCode}
            </option>`;
        })
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		// let optionNone = {
		// 	itemID:              "0",
		// 	itemCode:            "-",
		// 	categoryName:        "-",
		// 	unitOfMeasurementID: "-",
		// 	itemName:            "N/A",
		// 	brand:            	 "-"
		// };

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [...inventoryItemList];
			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					brand          = "${item.brandName}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, isProject = true, display = true ,storageID = null) {
        let html   = `<option selected disabled>Select Item Name</option>`;
		const attr = isProject ? "[project=true]" : "";

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		// let optionNone = {
		// 	itemID:              "0",
		// 	itemCode:            "-",
		// 	categoryName:        "-",
		// 	unitOfMeasurementID: "-",
		// 	itemName:            "N/A",
		// 	brandName:        	 "-"

		// };
		let itemList = [...inventoryItemList];

		
		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
		
			// if( storageID != null && storageID == item.inventoryStorageID ){
			
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					brand          = "${item.brandName}"
					${item.itemID == id && "selected"}>
					${item.itemName}
				</option>`;
			
			// }
			// if(storageID == null){
		
			// 	return `
			// 	<option 
			// 		value        = "${item.itemID}" 
			// 		itemCode     = "${item.itemCode}"
			// 		categoryName = "${item.categoryName}"
			// 		uom          = "${item.unitOfMeasurementID}"
			// 		brand          = "${item.brandName}"
			// 		${item.itemID == id && "selected"}>
			// 		${item.itemName}
			// 	</option>`;
			// }
		})
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false) {
		const attr = isProject ? `project="true"` : ``;
		let {
			
			itemName     = "",
			itemID       = null,
			barcode      = "",
			stocks		 = "",
			quantity     = 1,
			unitOfMeasurement: uom = "",
			brandName = "",
			createdAt =""

		} = item;

		

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
					<div class="itemcode">
						${getFormCode("ITM",createdAt,itemID) || "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName || "-"}
					</div>
				</td>
				<td>
					<div class="stocks text-center">
						${stocks || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity}
					</div>
				</td>
				
				<td>
					<div class="brand">
						${brandName || "-"}
					</div>
				</td>

				<td>
					<div class="uom">
						${uom || "-"}
					</div>
				</td>
			</tr>`;
		} else {

			// <div class="form-group mb-0">
			// 				<select
			// 					class="form-control select2"
			// 					name="itemID"
			// 					id="itemID"
			// 					style="width: 100%"
			// 					required
			// 					${attr}>
			// 					${getInventoryItem(itemID, isProject)}
			// 				</select>
			// 				<div class="invalid-feedback d-block" id="invalid-itemID"></div>
			// 			</div>
		
			html += `
			<tr class="itemTableRow">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
					</div>
				</td>
				<td class="text-center">
					<div class="barcode">
						<input 
							type="text" 
							class="form-control number text-center"
							id="barcode" 
							name="barcode" 
							value="${barcode}" 
							data-allowcharacters="[0-9][a-z][A-Z]" 
							mask="99999-99999-99999" 
							minlength="17" 
							maxlength="17"
							required>
						<div class="invalid-feedback d-block" id="invalid-barcode"></div>
					</div>
				</td>
				<td>
					<div class="itemcode">-</div>
				</td>
				<td>
					<div class="itemname" name="itemname">-</div>
				</td>
				<td>
					<div class="stocks text-center" name="stocks">-</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control number text-center"
							min="1" 
							data-allowcharacters="[0-9]" 
							max="999999999" 
							id="quantity" 
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							required>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="brand" name="brand">-</div>
				</td>
				<td>
					<div class="uom" name="uom">-</div>
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

			// BARCODE
			$("td .barcode [name=barcode]", this).attr("id", `barcode${i}`);
			$("td .barcode [name=barcode]", this).attr("project", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$("td .itemname", this).attr("id", `itemname${i}`);

			// STOCKS
			$("td .stocks", this).attr("id", `stocks${i}`);

			// ITEMNAME
			// $(this).find("select").each(function(j) {
			// 	const itemID = $(this).val();
			// 	$(this).attr("index", `${i}`);
			// 	$(this).attr("project", `true`);
			// 	$(this).attr("id", `projectitemid${i}`)
			// 	if (!$(this).attr("data-select2-id")) {
			// 		$(this).select2({ theme: "bootstrap" });
			// 	}
			// });

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// Brand
			$("td .brand", this).attr("id", `brand${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);
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


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=inventoryStorageIDSender]", function() {
        const inventoryStorageIDSender = $('option:selected', this).val();
        const inventoryStorageName = $('option:selected', this).attr("inventoryStorageName");
        const storageDepartment  = $('option:selected', this).attr("storageDepartment");
        const officeName  = $('option:selected', this).attr("officeName");
        const storageAddress     = $('option:selected', this).attr("storageAddress");
        const roomType     = $('option:selected', this).attr("roomType");

        $("[name=inventoryStorageNameSender]").val(inventoryStorageName);
        $("[name=storageDepartmentSender]").val(storageDepartment);
        $("[name=storageAddressSender]").val(storageAddress);
        $("[name=officeNameSender]").val(officeName);
        $("[name=roomTypeSender]").val(roomType);

		// $(`[name=itemID]`).each(function(i, obj) {
		// 	// let itemID = $(this).val();
		// 	$(this).html(getInventoryItem(null, true, true,inventoryStorageIDSender));
		// }) 

		const coninventoryStorageIDSender = $('[name=inventoryStorageIDSender] option:selected').val();
		const inventoryStorageIDReceiver = $('[name=inventoryStorageIDReceiver] option:selected').val();

		if(coninventoryStorageIDSender == inventoryStorageIDReceiver && (inventoryStorageIDReceiver !=0 || coninventoryStorageIDSender !=0 ) ){
	
			$('[name=inventoryStorageIDSender]').val($('[name=inventoryStorageIDSender] option:first-child').val()).trigger('change');
			$("[name=inventoryStorageNameSender]").val("-");
			$("[name=storageDepartmentSender]").val("-");
			$("[name=storageAddressSender]").val("-");
			$("[name=officeNameSender]").val("-");
			$("[name=roomTypeSender]").val("-");
			$(".invalid-feedback").eq(0).text("Please choose other Storage!");
			$(".invalid-feedback").eq(1).text("Please choose other Storage!");
			$('[name=inventoryStorageIDReceiver]').addClass("is-invalid");
			
			// $("#invalid-inventoryStorageIDSender").hide();
			// $("#invalid-inventoryStorageIDSender").text("Please choose other Storage!");
			
		}
		
    })

	$(document).on("change", "[name=inventoryStorageIDReceiver]", function() {
        const inventoryStorageName = $('option:selected', this).attr("inventoryStorageName");
        const storageDepartment  = $('option:selected', this).attr("storageDepartment");
        const officeName  = $('option:selected', this).attr("officeName");
        const storageAddress     = $('option:selected', this).attr("storageAddress");
        const roomType     = $('option:selected', this).attr("roomType");

        $("[name=inventoryStorageNameReceiver]").val(inventoryStorageName);
        $("[name=storageDepartmentReceiver]").val(storageDepartment);
        $("[name=storageAddressReceiver]").val(storageAddress);
        $("[name=officeNameReceiver]").val(officeName);
        $("[name=roomTypeReceiver]").val(roomType);

		const inventoryStorageIDSender = $('[name=inventoryStorageIDSender] option:selected').val();
		const coninventoryStorageIDReceiver = $('[name=inventoryStorageIDReceiver] option:selected').val();

		if(inventoryStorageIDSender == coninventoryStorageIDReceiver && (coninventoryStorageIDReceiver !=0 || inventoryStorageIDSender !=0 ) ){
	
			$('[name=inventoryStorageIDReceiver]').val($('[name=inventoryStorageIDReceiver] option:first-child').val()).trigger('change');
			$("[name=inventoryStorageNameReceiver]").val("-");
			$("[name=storageDepartmentReceiver]").val("-");
			$("[name=storageAddressReceiver]").val("-");
			$("[name=officeNameReceiver]").val("-");
			$("[name=roomTypeReceiver]").val("-");
			$("#invalid-inventoryStorageIDReceiver").text("Please choose other Storage!");
			$(".invalid-feedback").eq(0).text("Please choose other Storage!");
			$(".invalid-feedback").eq(1).text("Please choose other Storage!");
			$('[name=inventoryStorageIDSender]').addClass("is-invalid");

		}
		
    })
    // ----- END SELECT PROJECT LIST -----


    // ----- SELECT ITEM NAME -----
	var barcodeArray =[];
	var barcodeLocationArray =[];
    $(document).on("keyup", "[name=barcode]", function() {
		const barcodeval   = $(this).val(); 
		const barcodeID   = $(this).attr("id"); 
		const StorageIDSender  = $("[name=inventoryStorageIDSender]").val();

		const data = getTableData(`ims_stock_in_total_tbl AS isit
		LEFT JOIN ims_inventory_item_tbl 				AS iii 	ON isit.itemID = iii.itemID
		LEFT JOIN ims_inventory_storage_tbl 			AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
		LEFT JOIN ims_transfer_request_tbl 			AS itr 	ON itr.inventoryStorageIDReceiver = iis.inventoryStorageID 	AND itr.transferRequestStatus = 2
		LEFT JOIN ims_transfer_request_details_tbl 	AS itrd ON itrd.transferRequestID = itr.transferRequestID 			AND itrd.itemID = iii.itemID 
		LEFT JOIN ims_material_withdrawal_details_tbl 	AS imwd ON imwd.inventoryStorageID = iis.inventoryStorageID 		AND imwd.itemID = iii.itemID
		LEFT JOIN ims_material_withdrawal_tbl 			AS imw  ON imw.materialWithdrawalID = imwd.materialWithdrawalID 	AND imw.materialWithdrawaltStatus = 2
		LEFT JOIN ims_inventory_incident_details_tbl 	AS iiid ON iiid.inventoryStorageID = iis.inventoryStorageID     	AND iiid.itemID = iii.itemID
		LEFT JOIN ims_inventory_incident_tbl 			AS iit  ON iit.incidentID = iiid.incidentID 						AND iit.incidentStatus = 2
		-- LEFT JOIN ims_borrowing_details_tbl 			AS ibd  ON ibd.inventoryStorageID = isit.inventoryStorageID 		AND ibd.itemID = iii.itemID
		-- LEFT JOIN ims_borrowing_tbl 					AS ibt  ON ibt.borrowingID = ibd.borrowingID 						AND ibt.borrowingStatus = 2
		-- LEFT JOIN ims_return_item_details_tbl 			AS iri  ON iri.inventoryStorageID = isit.inventoryStorageID 		AND iri.itemID = iii.itemID
		LEFT JOIN ims_stock_in_tbl 					AS isi 	ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID`, 
		`isit.itemID,
		 iii.itemCode,
		 iii.createdAt,
		 isit.itemName,
		 isi.itemBrandName,
		 isi.itemUom,
		 iis.inventoryStorageCode,
		 iis.inventoryStorageOfficeName,
		 isi.barcode,
		 isi.stockInSerialNumber,
		 (IFNULL(SUM(isit.quantity),0) - IFNULL(SUM(imwd.quantity),0) - IFNULL(SUM(iiid.quantity),0)) AS stocks`,
		 `isi.barcode = '${barcodeval}' AND isi.stockInLocationID = '${StorageIDSender}'`, // to be continued by adding the item ID 
		"");


			data.map((item) => {
				let {
					itemID ,
					itemName,
					brandName,
					itemUom,
					createdAt,
					stocks
				} = item;

				let item_ID       		= itemID ? itemID : "";
				let item_Name       		= itemName ? itemName : "";
				let brand_Name       	= brandName ? brandName : "";
				let item_Uom       		= itemUom ? itemUom : "";
				let created_At       	= createdAt ? createdAt : "";
				let stock       	= stocks ? stocks : "";
		
				let	barcodeArrayLength = barcodeArray.length || 0;
				if(barcodeval.length  ==17){

					
					if(itemName != null){

						
						let counter =1;
						if(barcodeArrayLength !=0){
							for(var loop1 =0;loop1<barcodeArrayLength; loop1++ ){
								

								if(barcodeArray[loop1] == barcodeval && barcodeLocationArray[loop1] != barcodeID){
								
									$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
									$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
									$(this).closest("tr").find("#invalid-barcode").text('Barcode '+barcodeval+' already declared!');
									return false;
								}else{

									if(counter == barcodeArrayLength){
										barcodeArray[barcodeArrayLength -1] = barcodeval;
										barcodeLocationArray[barcodeArrayLength -1] = barcodeID;
									}
									
								}
								counter++;
							}
						}else{
							barcodeArray[0] = barcodeval;
							barcodeLocationArray[0] = barcodeID;
						}

						$(this).closest("tr").find(`.itemcode`).first().text(getFormCode("ITM",created_At,item_ID));
						$(this).closest("tr").find(`[name=barcode]`).first().attr('itemid',item_ID);
						$(this).closest("tr").find(`.itemname`).first().text(item_Name);
						$(this).closest("tr").find(`.uom`).first().text(item_Uom);
						$(this).closest("tr").find(`.brand`).first().text(brand_Name);
						$(this).closest("tr").find(`.stocks`).first().text(stock);
						$(this).closest("tr").find(`[name=quantity]`).first().val(0);
		
						$(this).closest("tr").find("[name=barcode]").removeClass("is-invalid");
						$(this).closest("tr").find("#invalid-barcode").removeClass("is-invalid");
						$(this).closest("tr").find("#invalid-barcode").text('');
		
					}else{
						$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
						$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
						$(this).closest("tr").find("#invalid-barcode").text('No Item Available!');
					}

				}else{
					$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").text('Please Input exact 17 Characters!');
				}


				
				})

    })
    // ----- END SELECT ITEM NAME -----



	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("change", "[name=quantity]", function() {
		const index     		= $(this).closest("tr").first().attr("index");
		const isProject 		= $(this).closest("tbody").attr("project") == "true";
		const attr      		= isProject ? "[project=true]" : "";
		const quantity  		= parseFloat($(`#quantity${index}${attr}`).val()) || 0;
        const barcodeval  	= $(this).closest("tr").find('[name=barcode]').val();

		const StorageIDSender  = $("[name=inventoryStorageIDSender]").val();

		

		if(StorageIDSender != null ){

			const data = getTableData(`ims_stock_in_total_tbl AS isit
			LEFT JOIN ims_inventory_item_tbl 				AS iii 	ON isit.itemID = iii.itemID
			LEFT JOIN ims_inventory_storage_tbl 			AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
			-- LEFT JOIN ims_transfer_request_tbl 			AS itr 	ON itr.inventoryStorageIDReceiver = iis.inventoryStorageID 	AND itr.transferRequestStatus = 2
			-- LEFT JOIN ims_transfer_request_details_tbl 	AS itrd ON itrd.transferRequestID = itr.transferRequestID 			AND itrd.itemID = iii.itemID
			LEFT JOIN ims_material_withdrawal_details_tbl 	AS imwd ON imwd.inventoryStorageID = iis.inventoryStorageID 		AND imwd.itemID = iii.itemID
			LEFT JOIN ims_material_withdrawal_tbl 			AS imw  ON imw.materialWithdrawalID = imwd.materialWithdrawalID 	AND imw.materialWithdrawaltStatus = 2
			LEFT JOIN ims_inventory_incident_details_tbl 	AS iiid ON iiid.inventoryStorageID = iis.inventoryStorageID     	AND iiid.itemID = iii.itemID
			LEFT JOIN ims_inventory_incident_tbl 			AS iit  ON iit.incidentID = iiid.incidentID 						AND iit.incidentStatus = 2
			-- LEFT JOIN ims_borrowing_details_tbl 			AS ibd  ON ibd.inventoryStorageID = isit.inventoryStorageID 		AND ibd.itemID = iii.itemID
			-- LEFT JOIN ims_borrowing_tbl 					AS ibt  ON ibt.borrowingID = ibd.borrowingID 						AND ibt.borrowingStatus = 2
			-- LEFT JOIN ims_return_item_details_tbl 			AS iri  ON iri.inventoryStorageID = isit.inventoryStorageID 		AND iri.itemID = iii.itemID
			LEFT JOIN ims_stock_in_tbl 					AS isi 	ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID`, 
			`isit.itemID,
			 iii.itemCode,
			 iii.createdAt,
			 isit.itemName,
			 isi.itemBrandName,
			 isi.itemUom,
			 iis.inventoryStorageCode,
			 iis.inventoryStorageOfficeName,
			 isi.barcode,
			 isi.stockInSerialNumber,
			 (IFNULL(SUM(isit.quantity),0) - IFNULL(SUM(imwd.quantity),0) - IFNULL(SUM(iiid.quantity),0)) AS stocks`,
			 `isi.barcode = '${barcodeval}' AND isi.stockInLocationID = '${StorageIDSender}'`, // to be continued by adding the item ID 
			"");

			

			if(data[0].stocks !=""){

				data.map((item) => {
					let {
				
						stocks
					} = item;
				
					let stock  = stocks ? parseFloat(stocks) || 0 : "0";
					
							if(stock > quantity || stock == quantity ){
								$(`#quantity${index}${attr}`).removeClass("is-invalid").addClass("is-valid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-invalid").addClass("is-valid");
								$(this).closest("tr").find("#invalid-quantity").text('');
								removeIsValid("#tableProjectRequestItems");
							}else{
								$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").text('Not Enough Quantity!');
							}
					
					})
			}else{
				$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-quantity").text('Not Enough Quantity Or No Stocks Available!');
			}
        

		}else{
			$(`#quantity${index}${attr}`).val(1);
			$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
			$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
			$(this).closest("tr").find("#invalid-quantity").text('Please Select Storage first!');
		}
	})
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
	function formContent(data = false, readOnly = false, isRevise = false) {
		
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			transferRequestID       = "",
			reviseTransferRequestID = "",
			employeeID              = "",
			inventoryStorageIDSender 		= "",
			inventoryStorageIDReceiver 		= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			transferRequestStatus   = false,
			transferRequestRemarks   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];
		
		let requestProjectItems = "";
		if (transferRequestID) {
			let requestItemsData = getTableData(
				`ims_inventory_item_tbl AS iii
				LEFT JOIN ims_transfer_request_details_tbl 	AS itrd ON itrd.itemID = iii.itemID`, 
				`itrd.itemID,itrd.itemName,itrd.brandName,itrd.unitOfMeasurement,itrd.quantity,itrd.barcode,iii.createdAt,itrd.stocks`, 
				`transferRequestID = ${transferRequestID}`);
			requestItemsData.map(item => {
				requestProjectItems += getItemRow(true, item, readOnly);
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

		$("#btnBack").attr("transferRequestID", transferRequestID);
		$("#btnBack").attr("status", transferRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);

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
	
		let button = formButtons(data, isRevise);

		let reviseDocumentNo    = isRevise ? purchaseRequestID : reviseTransferRequestID;
		let documentHeaderClass = isRevise || reviseTransferRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseTransferRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseTransferRequestID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("TR", createdAt, reviseDocumentNo)}
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
							${transferRequestID && !isRevise ? getFormCode("TR", createdAt, transferRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${transferRequestStatus && !isRevise ? getStatusStyle(transferRequestStatus) : "---"}
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
								${getDateApproved(transferRequestStatus, approversID, approversDate)}
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
							${transferRequestRemarks && !isRevise ? transferRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">
			<hr class="w-100"> 
			<h6 class="font-weight-bold">Storage Sender</h6>
			<hr class="w-100"> 

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Storage Code ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="inventoryStorageIDSender"
						id="inventoryStorageIDSender"
						style="width: 100%"
						required
						${disabled}>
						<option selected disabled>Select Storage Code</option>
						${getProjectList(inventoryStorageIDSender)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-inventoryStorageIDSender"></div>
				</div>
			</div>

            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Storage Name</label>
                    <input type="text" class="form-control" name="inventoryStorageNameSender" disabled value="-">
                </div>
            </div>
            
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Storage Department</label>
                    <input type="text" class="form-control" name="storageDepartmentSender" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Storage Address</label>
                    <input type="text" class="form-control" name="storageAddressSender" disabled value="-">
                </div>
            </div>
             <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Room Type</label>
                    <input type="text" class="form-control" name="roomTypeSender" disabled value="-">
                </div>
            </div>

			<hr class="w-100"> 
			<h6 class="font-weight-bold">Storage Reciever</h6>
			<hr class="w-100"> 

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Storage Code ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="inventoryStorageIDReceiver"
						id="inventoryStorageIDReceiver"
						style="width: 100%"
						required
						${disabled}>
						<option selected disabled>Select Storage Code</option>
						${getProjectList(inventoryStorageIDReceiver)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-inventoryStorageIDReceiver"></div>
				</div>
			</div>

            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Storage Name</label>
                    <input type="text" class="form-control" name="inventoryStorageNameReceiver" disabled value="-">
                </div>
            </div>
            
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Storage Department</label>
                    <input type="text" class="form-control" name="storageDepartmentReceiver" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Storage Address</label>
                    <input type="text" class="form-control" name="storageAddressReceiver" disabled value="-">
                </div>
            </div>
             <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Room Type</label>
                    <input type="text" class="form-control" name="roomTypeReceiver" disabled value="-">
                </div>
            </div>

			<hr class="w-100">

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

            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Transfer Item/s</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxProjectHeader}
                                <th>Barcode</th>
                                <th>Item Code</th>
                                <th>Item Name </th>
                                <th>Stocks </th>
                                <th>Quantity </th>
                                <th>Brand </th>
                                <th>UOM</th>
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
			inventoryStorageIDSender && inventoryStorageIDSender != 0 && $("[name=inventoryStorageIDSender]").trigger("change");
			inventoryStorageIDReceiver && inventoryStorageIDReceiver != 0 && $("[name=inventoryStorageIDReceiver]").trigger("change");
			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
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

			headerButton(true, "Add Transfer Request");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise);
			headerTabContent(false);
			formContent(data, readOnly, isRevise);
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

		let data = { items: [] }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["transferRequestID"] = id;
			formData.append("transferRequestID", id);

			if (status != "2") {
				data["transferRequestStatus"] = status;
				formData.append("transferRequestStatus", status);
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
			data["inventoryStorageIDSender"]    = $("[name=inventoryStorageIDSender]").val() || null;
			data["inventoryStorageIDReceiver"]    = $("[name=inventoryStorageIDReceiver]").val() || null;
			data["transferRequestReason"] = $("[name=transferRequestReason]").val()?.trim();
			data["projectTotalAmount"]    = updateTotalAmount(true);
			data["companyTotalAmount"]    = updateTotalAmount(false);
			
			formData.append("employeeID", sessionID);
			formData.append("inventoryStorageIDSender", $("[name=inventoryStorageIDSender]").val() || null);
			formData.append("inventoryStorageIDReceiver", $("[name=inventoryStorageIDReceiver]").val() || null);
			formData.append("transferRequestReason", $("[name=transferRequestReason]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["transferRequestID"] = id;

				formData.append("transferRequestID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["transferRequestStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("transferRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["transferRequestStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("transferRequestStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "";

				const itemID    = $("td [name=barcode]", this).attr("itemid");	
				const itemName    = $("td [name=itemname]", this).text().trim();	
				const brandName    = $("td [name=brand]", this).text().trim();	
				const quantity  = +$("td [name=quantity]", this).val();	
				const uom  = $("td [name=uom]", this).text().trim();	
				const stocks  = $("td [name=stocks]", this).text().trim();	
				const barcode  = $("td [name=barcode]", this).val();	

				let temp = {
					itemID,itemName,brandName,quantity,uom,barcode,stocks
					
				};

				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemName]`, itemName);
				formData.append(`items[${i}][brandName]`, brandName);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][uom]`, uom);
				formData.append(`items[${i}][barcode]`, barcode);
				formData.append(`items[${i}][stocks]`, stocks);
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
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id = $(this).attr("transferRequestID");
		viewDocument(id, false, true);
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
		const id         = $(this).attr("transferRequestID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("TR", dateToday(), id);
		const status     = $(this).attr("status");
		

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "save", "0", id);
				data.append("transferRequestStatus", 0);
				data.append("reviseTransferRequestID", id);
				data.delete("transferRequestID");
	
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
			data.append("transferRequestStatus", 0);

			savePurchaseRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {

		let condition = $("[name=quantity]").hasClass("is-invalid");
		let condition2 = $("[name=barcode]").hasClass("is-invalid");

		if(!condition && !condition2){
			const id       = $(this).attr("transferRequestID");
			const revise   = $(this).attr("revise") == "true";
			const feedback = $(this).attr("code") || getFormCode("TR", dateToday(), id);
			const action   = revise && "insert" || (id && feedback ? "update" : "insert");
			const data     = getPurchaseRequestData(action, "save", "0", id);
			data.append("transferRequestStatus", 0);

			if (revise) {
				data.append("reviseTransferRequestID", id);
				data.delete("transferRequestID");
			}

			savePurchaseRequest(data, "save", null, pageContent);
		}else{
			$("[name=quantity]").focus();
		}
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
		

		let condition = $("[name=quantity]").hasClass("is-invalid");
		let condition2 = $("[name=barcode]").hasClass("is-invalid");
		console.log(condition +' '+ condition2)
		if(!condition && !condition2){

			const id           = $(this).attr("transferRequestID");
			const revise       = $(this).attr("revise") == "true";
			const validate     = validateForm("form_purchase_request");

			removeIsValid("#tableProjectRequestItems");

			if (validate) {
				const action = revise && "insert" || (id ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "submit", "1", id);

				if (revise) {
					data.append("reviseTransferRequestID", id);
					data.delete("transferRequestID");
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
						moduleID:                37,
						notificationTitle:       "Transfer Request",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}

				savePurchaseRequest(data, "submit", notificationData, pageContent);
			}
		}else{
			$("[name=quantity]").focus();
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("transferRequestID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("transferRequestID"));
		const feedback = $(this).attr("code") || getFormCode("TR", dateToday(), id);
		let tableData  = getTableData("ims_transfer_request_tbl", "", "transferRequestID = " + id);

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

			let status, notificationData,lastApproveCondition = false;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                37,
					tableID:                 id,
					notificationTitle:       "Transfer Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				lastApproveCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                37,
					tableID:                 id,
					notificationTitle:       "Transfer Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("transferRequestStatus", status);

			savePurchaseRequest(data, "approve", notificationData, pageContent,lastApproveCondition,id);

		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("transferRequestID");
		const feedback = $(this).attr("code") || getFormCode("TR", dateToday(), id);

		$("#modal_purchase_request_content").html(preloader);
		$("#modal_purchase_request .page-title").text("DENY TRNASFER REQUEST");
		$("#modal_purchase_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="transferRequestRemarks"
					name="transferRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-transferRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			transferRequestID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("transferRequestID"));
		const feedback = $(this).attr("code") || getFormCode(" TR", dateToday(), id);

		const validate = validateForm("modal_purchase_request");
		if (validate) {
			let tableData = getTableData("ims_transfer_request_tbl", "", "transferRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("transferRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("transferRequestRemarks", $("[name=transferRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                37,
					tableID: 				 id,
					notificationTitle:       "Transfer Request",
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
	const title = "Transfer Request";
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
			swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
			swalText  = "Are you sure to cancel this document?";
			swalImg   = `${base_url}assets/modal/cancel.svg`;
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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null, lastApprover = false, isTransferRequestID = null) {
	
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					
					$.ajax({
						method:      "POST",
						url:         `transfer_request/saveTransferRequest`,
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
								swalTitle = `${getFormCode("TR", dateCreated, insertedID)} submitted successfully!`;
							} else if (method == "save") {
								swalTitle = `${getFormCode("TR", dateCreated, insertedID)} saved successfully!`;
							} else if (method == "cancelform") {
								swalTitle = `${getFormCode("TR", dateCreated, insertedID)} cancelled successfully!`;
							} else if (method == "approve") {
								swalTitle = `${getFormCode("TR", dateCreated, insertedID)} approved successfully!`;
							} else if (method == "deny") {
								swalTitle = `${getFormCode("TR", dateCreated, insertedID)} denied successfully!`;
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

								//---------- Start Change the  quantity --------------------
							
									if(lastApprover){
										FunctionlastApproveCondition(isTransferRequestID);
									}
								//---------- End Change the  quantity --------------------

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
					if (res.dismiss === "cancel") {
						if (method != "deny") {
							callback && callback();
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

function FunctionlastApproveCondition(transferID = null){
	let ApprovedtableData  = getTableData("ims_transfer_request_tbl LEFT JOIN ims_transfer_request_details_tbl USING(transferRequestID)", "", "transferRequestID =" + transferID);

	let data = { items: [] }, formData = new FormData;


	ApprovedtableData.map((item, index) => {

		const inventoryStorageIDSender    = item.inventoryStorageIDSender;	
		const inventoryStorageIDReceiver    = item.inventoryStorageIDReceiver;	
		const itemID    = item.itemID;	
		const quantity  = item.quantity;	
		const barcode  = item.barcode;	

		let temp = {
			inventoryStorageIDSender,inventoryStorageIDReceiver,itemID,quantity,barcode
			
		};

		formData.append(`items[${index}][inventoryStorageIDSender]`, inventoryStorageIDSender);
		formData.append(`items[${index}][inventoryStorageIDReceiver]`, inventoryStorageIDReceiver);
		formData.append(`items[${index}][itemID]`, itemID);
		formData.append(`items[${index}][quantity]`, quantity);
		formData.append(`items[${index}][barcode]`, barcode);

		data["items"].push(temp);

	});
	
	$.ajax({
		method:      "POST",
		url:         `transfer_request/updateStorage`,
		data,
		// processData: false,
		// contentType: false,
		// global:      false,
		cache:       false,
		async:       false,
		dataType:    "json",
		// beforeSend: function() {
		// 	$("#loader").show();
		// },
		success: function(data) {
		
		},
		error: function() {
			setTimeout(() => {
				$("#loader").hide();
				showNotification("danger", "System error: Please contact the system administrator for assistance!");
			}, 500);
		}
	});



}

// --------------- END DATABASE RELATION ---------------