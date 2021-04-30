$(document).ready(function() {

	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(42);
	if(!allowedUpdate){
		$("#page_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnSubmit").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("Material Withdrawal");
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
			const tableData = getTableData("ims_material_withdrawal_tbl", "", "materialWithdrawalID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					materialWithdrawaltStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (materialWithdrawaltStatus == 0 || materialWithdrawaltStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (materialWithdrawaltStatus == 0) {
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
			window.history.pushState("", "", `${base_url}ims/material_withdrawal?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/material_withdrawal?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/material_withdrawal?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/material_withdrawal`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

        const inventoryStorageList = getTableData(
            "ims_inventory_storage_tbl LEFT JOIN  ims_list_stocks_tbl USING(inventoryStorageID) LEFT JOIN ims_list_stocks_details_tbl USING(listStocksID) LEFT JOIN ims_inventory_item_tbl USING(itemID)",
			"inventoryStorageID,inventoryStorageCode,inventoryStorageOfficeName,itemID,receivingQuantity",
            "itemStatus = 1 AND inventoryStorageStatus =1");

        const inventoryItemList = getTableData(
            "ims_inventory_item_tbl", "itemID, itemCode, itemName, unitOfMeasurementID,itemDescription",
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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80  },
					{ targets: 9, width: 250 },
					{ targets: 10, width: 80  },
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
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80  },
					{ targets: 9, width: 250 },
					{ targets: 10, width: 80  },
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
					{ targets: 0,  width: 20  },
					{ targets: 1,  width: 80  },
					{ targets: 2,  width: 80  },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 80 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 10 },
					{ targets: 7,  width: 20 },
					{ targets: 8,  width: 250 }
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
					{ targets: 0,  width: 50  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 }
					// { targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_material_withdrawal_tbl", "approversID")) {
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
			if(isCreateAllowed(42)){
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
			"ims_material_withdrawal_tbl AS mwt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = mwt.projectID",
			"mwt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, mwt.createdAt AS dateCreated, projectListCode, projectListName",
			`mwt.employeeID != ${sessionID} AND materialWithdrawaltStatus != 0 AND materialWithdrawaltStatus != 4`,
			`FIELD(materialWithdrawaltStatus, 0, 1, 3, 2, 4), COALESCE(mwt.submittedAt, mwt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
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
				materialWithdrawalID,
				projectID,
				projectListCode,
				projectListName,
			
				approversID,
				approversDate,
				materialWithdrawaltStatus,
				materialWithdrawalRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = materialWithdrawalRemarks ? materialWithdrawalRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = materialWithdrawaltStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = materialWithdrawaltStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(materialWithdrawalID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(materialWithdrawalID)}" 
				code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, materialWithdrawaltStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("MWF", createdAt, materialWithdrawalID)}</td>
					<td>${fullname}</td>
					<td>${projectListCode || '-'}</td>
					<td>${projectListName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, materialWithdrawaltStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(materialWithdrawaltStatus)}
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
		let materialWithdrawalData = getTableData(
			"ims_material_withdrawal_tbl AS mwt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = mwt.projectID",
			"mwt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, mwt.createdAt AS dateCreated, projectListCode, projectListName",
			`mwt.employeeID = ${sessionID}`,
			`FIELD(materialWithdrawaltStatus, 0, 1, 3, 2, 4), COALESCE(mwt.submittedAt, mwt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
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

		materialWithdrawalData.map((item) => {
			let {
				fullname,
				materialWithdrawalID,
                projectID,
                projectListCode,
                projectListName,
               
				approversID,
				approversDate,
				materialWithdrawaltStatus,
				materialWithdrawalRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = materialWithdrawalRemarks ? materialWithdrawalRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = materialWithdrawaltStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = materialWithdrawaltStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(materialWithdrawalID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(materialWithdrawalID)}" 
                code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("MWF", createdAt, materialWithdrawalID)}</td>
                <td>${fullname}</td>
                <td>${projectListCode || '-'}</td>
                <td>${projectListName || '-'}</td>
               
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, materialWithdrawaltStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(materialWithdrawaltStatus)}
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
				materialWithdrawalID     = "",
				materialWithdrawaltStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (materialWithdrawaltStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						materialWithdrawalID="${materialWithdrawalID}"
						code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"
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
							materialWithdrawalID="${materialWithdrawalID}"
							code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (materialWithdrawaltStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							materialWithdrawalID="${materialWithdrawalID}"
							code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"
							status="${materialWithdrawaltStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (materialWithdrawaltStatus == 3) {
					// DENIED - FOR REVISE
					button = `
					<button
						class="btn btn-cancel"
						id="btnRevise" 
						materialWithdrawalID="${encryptString(materialWithdrawalID)}"
						code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"
						status="${materialWithdrawaltStatus}"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			} else {
				if (materialWithdrawaltStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							materialWithdrawalID="${encryptString(materialWithdrawalID)}"
							code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							materialWithdrawalID="${encryptString(materialWithdrawalID)}"
							code="${getFormCode("MWF", createdAt, materialWithdrawalID)}"><i class="fas fa-ban"></i> 
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
		let projectItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [];

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
					itemdescription  = "${item.itemDescription}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, isProject = true, display = true) {
        let html   = `<option selected disabled>Select Item Name</option>`;
		const attr = isProject ? "[project=true]" : "";

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let itemList = [...inventoryItemList];

		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
            return `
            <option 
                value        = "${item.itemID}" 
                itemCode     = "${item.itemCode}"
                categoryName = "${item.categoryName}"
                uom          = "${item.unitOfMeasurementID}"
                itemdescription          = "${item.itemDescription}"
                ${item.itemID == id && "selected"}>
                ${item.itemName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----

    // ----- UPDATE STORAGE NAME -----
	function updateInventoryStorageOptions() {
		let projectItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [];
     
		$("[name=inventoryStorageID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Storage Name</option>`;
			let itemList = [...inventoryStorageList];
			html += itemList.map(item => {
				return `
                <option 
                value        = "${item.inventoryStorageID}" 
                storageCode     = "${item.inventoryStorageCode}"
                liststocks = "${item.receivingQuantity}"
                ${item.inventoryStorageID == projectItemIDArr[index] && "selected"}>
                ${item.inventoryStorageOfficeName}
            </option>`;
                
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE STORAGE NAME -----


    // ----- GET STORAGE -----
    function getStorage(id = null, isProject = true, display = true, itemID = null) {
       
        let html   = `<option selected disabled>Select Storage Name</option>`;
		const attr = isProject ? "[project=true]" : "";

        let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=inventoryStorageID]${attr}`).each(function(i, obj) {
            itemIDArr.push($(this).val());
		}) 

        console.log(itemID)
		let storageList = [ ...inventoryStorageList];
		
            html += storageList.map(item => {
                
            if( itemID == null){
                return `
                <option 
                    value        = "${item.inventoryStorageID}" 
                    storageCode     = "${item.inventoryStorageCode}"
                    liststocks = "${item.receivingQuantity}"
                    ${item.inventoryStorageID == id && "selected"}>
                    ${item.inventoryStorageOfficeName}
                </option>`;
            }else{
                if(item.itemID == itemID ){
                    return `
                    <option 
                        value        = "${item.inventoryStorageID}" 
                        storageCode     = "${item.inventoryStorageCode}"
                        liststocks = "${item.receivingQuantity}"
                        ${item.inventoryStorageID == id && "selected"}>
                        ${item.inventoryStorageOfficeName}
                    </option>`;
                }
            }
               
            
        })
		
        return display ? html : inventoryStorageList;
    }
    // ----- END GET STORAGE -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false) {
		const attr = isProject ? `project="true"` : ``;
		let {
			
            inventoryStorageID          = null,
			itemCode                    = "",
			itemName                    = "",
			itemDescription             = "",
            inventoryStorageCode                 = "",
			inventoryStorageOfficeName                 = "",
			itemID                      = null,
			quantity                    = 1,
			unitOfMeasurementID: uom    = "",
			receivingQuantity       = ""

		} = item;

      
		let html = "";
		if (readOnly) {
		
			html += `
			<tr class="itemTableRow">
                <td>
					<div class="itemcode">
						${itemCode || "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName || "-"}
					</div>
				</td>

                <td>
					<div class="itemdescription">
						${itemDescription || "-"}
					</div>
				</td>

                <td>
					<div class="storagecode">
						${inventoryStorageCode || "-"}
					</div>
				</td>
				<td>
					<div class="storagename">
						${inventoryStorageOfficeName || "-"}
					</div>
				</td>
				
				<td class="text-center">
					<div class="quantity">
						${quantity}
					</div>
				</td>

                <td>
					<div class="uom">
						${uom || "-"}
					</div>
				</td>

                <td>
					<div class="liststocks">
						${receivingQuantity || "-"}
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
					<div class="itemcode">-</div>
				</td>
				<td>
					<div class="itemname">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="itemID"
								id="itemID"
								style="width: 100%"
								required
								${attr}>
								${getInventoryItem(itemID, isProject)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-itemID"></div>
						</div>
					</div>
				</td>
                <td>
					<div class="itemdescription">-</div>
				</td>

                 <td>
					<div class="storagecode">-</div>
				</td>
                <td>
					<div class="storagename">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="inventoryStorageID"
								id="inventoryStorageID"
								style="width: 100%"
								required
								disabled
								${attr}>
								${getStorage(inventoryStorageID, isProject,true,itemID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-inventoryStorageID"></div>
						</div>
					</div>
				</td>

				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control validate number text-center"
							min="1" 
							data-allowcharacters="[0-9]" 
							max="999999999" 
							id="quantity" 
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							requred>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">-</div>
				</td>
                <td>
                    <div class="liststocks">-</div>
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

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").eq(1).each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `projectitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

            // ITEMDESCRIPTION
			$("td .itemdescription", this).attr("id", `itemdescription${i}`);

            // STORAGECODE
			$("td .storagecode", this).attr("id", `storagecode${i}`);

			// STORAGENAME
			$(this).find("select").eq(0).each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `storagename${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

            // STOCKS
			$("td .liststocks", this).attr("id", `listStocks${i}`);
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
                            // $(this).find(`[name=inventoryStorageID]${attr}`).each(function(i, obj) {
							// 	let inventoryStorageID = $(this).val();
							// 	$(this).html(getStorage(inventoryStorageID,isProject,true,""));
							// }) 
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


    // ----- SELECT ITEM NAME -----
    $(document).on("change", "[name=itemID]", function() {
        const itemID     = $('option:selected', this).val();
        const itemCode     = $('option:selected', this).attr("itemCode");
        const categoryName = $('option:selected', this).attr("categoryName");
        const uom          = $('option:selected', this).attr("uom");
        const itemDescription          = $('option:selected', this).attr("itemdescription");
		const isProject    = $(this).closest("tbody").attr("project") == "true";
		const attr         = isProject ? "[project=true]" : "[company=true]";

        $(this).closest("tr").find(`.itemcode`).first().text(itemCode);
        $(this).closest("tr").find(`.category`).first().text(categoryName);
        $(this).closest("tr").find(`.uom`).first().text(uom);
        $(this).closest("tr").find(`.itemdescription`).first().text(itemDescription);

        // Storage Field
        $(this).closest("tr").find(`[name=quantity]`).first().val(1);
        $(this).closest("tr").find(`.storagecode`).first().text('-');
        $(this).closest("tr").find(`.liststocks`).first().text('-');



		$(`[name=itemID]${attr}`).each(function(i, obj) {
			let itemID = $(this).val();
			$(this).html(getInventoryItem(itemID, isProject));
		}) 

        $(this).closest("tr").find(`[name=inventoryStorageID]${attr}`).each(function(i, obj) {
			let inventoryStorageID = $(this).val();
			$(this).html(getStorage(inventoryStorageID,isProject,true,itemID));
			$(this).prop("disabled",false);
		}) 
	
    })
    // ----- END SELECT ITEM NAME -----

     // ----- SELECT STORAGE NAME -----
     $(document).on("change", "[name=inventoryStorageID]", function() {
        const itemID     = $('option:selected', this).val();
        const storagecode     = $('option:selected', this).attr("storagecode");
        const liststocks = $('option:selected', this).attr("liststocks");
		const isProject    = $(this).closest("tbody").attr("project") == "true";
		const attr         = isProject ? "[project=true]" : "[company=true]";

        $(this).closest("tr").find(`.storagecode`).first().text(storagecode);
        $(this).closest("tr").find(`.liststocks`).first().text(liststocks);

        // $(`[name=inventoryStorageID]${attr}`).each(function(i, obj) {
		// 	let inventoryStorageID = $(this).val();
		// 	$(this).html(getStorage(inventoryStorageID, isProject));
		// }) 
	
    })
    // ----- END SELECT STORAGE NAME -----

	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("change", "[name=quantity]", function() {
        const index     		= $(this).closest("tr").first().attr("index");
		const isProject 		= $(this).closest("tbody").attr("project") == "true";
		const attr      		= isProject ? "[project=true]" : "";
		const quantity  		= $(`#quantity${index}${attr}`).val();
        const selectedItemID  	= $(this).closest("tr").find('option:selected').val();

		const data = getTableData("ims_inventory_item_tbl as itm LEFT JOIN ims_list_stocks_details_tbl  as stcks USING(itemID) LEFT JOIN ims_list_stocks_tbl USING(listStocksID) LEFT JOIN ims_inventory_storage_tbl as isr USING(inventoryStorageID)", 
        "itemID,receivingQuantity", " itemID ="+ selectedItemID, "");

			if(data.length >0){

				data.map((item) => {
					let {
						itemID,
						receivingQuantity
					} = item;
		
					let item_ID       		= itemID ? itemID : "";
					let receiving_Quantity  = receivingQuantity ? receivingQuantity : "0";
		
				
						if(item_ID == selectedItemID ){
							if(receiving_Quantity > quantity || receiving_Quantity == quantity ){
								$(`#quantity${index}${attr}`).removeClass("is-invalid").addClass("is-valid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-invalid").addClass("is-valid");
								$(this).closest("tr").find("#invalid-quantity").text('');
							}else{
								$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").text('Not Enough Quantity!');
							}
						}else{
								$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").text('Not Enough Quantity Or No Stocks Available!');
						}
		
					})
			}else{
				$(`#quantity${index}${attr}`).removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-quantity").text('No Item Selected');
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
			materialWithdrawalID       = "",
			reviseMaterialWithdrawalID = "",
			employeeID              = "",
			projectID 		= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			materialWithdrawaltStatus   = false,
			materialWithdrawalRemarks   = false,
			materialWithdrawalPurpose   = "",
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		
		let requestProjectItems = "";
		if (materialWithdrawalID) {
			let requestItemsData = getTableData(
				`ims_material_withdrawal_details_tbl as imwd 
				LEFT JOIN ims_inventory_item_tbl as iiit USING(itemID) 
				LEFT JOIN ims_inventory_storage_tbl as iist ON imwd.inventoryStorageID =iist.inventoryStorageID
				LEFT JOIN ims_list_stocks_tbl as ilst ON imwd.inventoryStorageID= ilst.inventoryStorageID
                AND iist.inventoryStorageID = ilst.inventoryStorageID
				LEFT JOIN ims_list_stocks_details_tbl as ilsdt  ON imwd.itemID = ilsdt.itemID
                AND ilst.listStocksID = ilsdt.listStocksID`, 
				`iiit.itemID, itemCode, itemName, unitOfMeasurementID,itemDescription,imwd.inventoryStorageID,inventoryStorageCode,inventoryStorageOfficeName,receivingQuantity,quantity`, 
				`materialWithdrawalID= ${materialWithdrawalID}  GROUP BY materialWithdrawalDetailsID ASC`);
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

		$("#btnBack").attr("materialWithdrawalID", materialWithdrawalID);
		$("#btnBack").attr("status", materialWithdrawaltStatus);
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

		let reviseDocumentNo    = isRevise ? materialWithdrawalID: reviseMaterialWithdrawalID;
		let documentHeaderClass = isRevise || reviseMaterialWithdrawalID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseMaterialWithdrawalID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseMaterialWithdrawalID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("MWF", createdAt, reviseDocumentNo)}
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
							${materialWithdrawalID && !isRevise ? getFormCode("MWF", createdAt, materialWithdrawalID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${materialWithdrawaltStatus && !isRevise ? getStatusStyle(materialWithdrawaltStatus) : "---"}
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
								${getDateApproved(materialWithdrawaltStatus, approversID, approversDate)}
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
							${materialWithdrawalRemarks && !isRevise ? materialWithdrawalRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
                        required
						${disabled}>
                        <option selected disabled>Select Project Name</option>
                        ${getProjectList(projectID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="-">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
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
                    <label>Purpose ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="materialWithdrawalPurpose"
                        name="materialWithdrawalPurpose"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${materialWithdrawalPurpose ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-materialWithdrawalPurpose"></div>
                </div>
            </div>

            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Withdrawn Materials and Equipment</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxProjectHeader}
                                <th>Item Code </th>
                                <th>Item Name </th>
                                <th>Item Description</th>
                                <th>Storage Code </th>
                                <th>Storage Name </th>
                                <th>Quantity </th>
                                <th>UOM </th>
                                <th>Stocks </th>
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
			updateInventoryStorageOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			projectID && projectID != 0 && $("[name=itemID]").trigger("change");
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

			headerButton(true, "Add Material Withdrawal");
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
			data["materialWithdrawalID"] = id;
			formData.append("materialWithdrawalID", id);

			if (status != "2") {
				data["materialWithdrawaltStatus"] = status;
				formData.append("materialWithdrawaltStatus", status);
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
			data["projectID"]    = $("[name=projectID]").val() || null;
			data["materialWithdrawalReason"] = $("[name=materialWithdrawalReason]").val()?.trim();
			data["materialWithdrawalPurpose"] = $("[name=materialWithdrawalPurpose]").val()?.trim();
			data["projectTotalAmount"]    = updateTotalAmount(true);
			data["companyTotalAmount"]    = updateTotalAmount(false);
			
			formData.append("employeeID", sessionID);
			formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("materialWithdrawalReason", $("[name=materialWithdrawalReason]").val()?.trim());
			formData.append("materialWithdrawalPurpose", $("[name=materialWithdrawalPurpose]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["materialWithdrawalID"] = id;

				formData.append("materialWithdrawalID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["materialWithdrawaltStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("materialWithdrawaltStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["materialWithdrawaltStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("materialWithdrawaltStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "";

				const itemID    = $("td [name=itemID]", this).val();	
				const quantity  = +$("td [name=quantity]", this).val();	
				const inventoryStorageID  = +$("td [name=inventoryStorageID ]", this).val();	

				let temp = {
					itemID, quantity, inventoryStorageID
					
				};

				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][inventoryStorageID]`, inventoryStorageID);
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
		const id = $(this).attr("materialWithdrawalID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("materialWithdrawalID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("MWF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "save", "0", id);
				data.append("materialWithdrawaltStatus", 0);
				data.append("reviseMaterialWithdrawalID", id);
				data.delete("materialWithdrawalID");
	
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
			data.append("materialWithdrawaltStatus", 0);

			savePurchaseRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {

        let condition = $("[name=quantity]").hasClass("is-invalid");

		if(!condition){
        
            const id       = $(this).attr("materialWithdrawalID");
            const revise   = $(this).attr("revise") == "true";
            const feedback = $(this).attr("code") || getFormCode("MWF", dateToday(), id);
            const action   = revise && "insert" || (id && feedback ? "update" : "insert");
            const data     = getPurchaseRequestData(action, "save", "0", id);
            data.append("materialWithdrawaltStatus", 0);

            if (revise) {
                data.append("reviseMaterialWithdrawalID", id);
                data.delete("materialWithdrawalID");
            }

            savePurchaseRequest(data, "save", null, pageContent);

        }else{
			$("[name=quantity]").focus();
		}
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {

        let condition = $("[name=quantity]").hasClass("is-invalid");

		if(!condition){

            const id           = $(this).attr("materialWithdrawalID");
            const revise       = $(this).attr("revise") == "true";
            const validate     = validateForm("form_purchase_request");

            if (validate) {
                const action = revise && "insert" || (id ? "update" : "insert");
                const data   = getPurchaseRequestData(action, "submit", "1", id);

                if (revise) {
                    data.append("reviseMaterialWithdrawalID", id);
                    data.delete("materialWithdrawalID");
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
                        moduleID:                42,
                        notificationTitle:       "Material Withdrawal",
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
		const id     = $(this).attr("materialWithdrawalID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("materialWithdrawalID"));
		const feedback = $(this).attr("code") || getFormCode("MWF", dateToday(), id);
		let tableData  = getTableData("ims_material_withdrawal_tbl", "", "materialWithdrawalID = " + id);
		
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

			let status, notificationData, lastApproveCondition = false;
			if (isImLastApprover(approversID, approversDate)) {
				
				status = 2;
				notificationData = {
					moduleID:                42,
					tableID:                 id,
					notificationTitle:       "Material Withdrawal",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				lastApproveCondition = true;
			} else {
				
				status = 1;
				notificationData = {
					moduleID:                42,
					tableID:                 id,
					notificationTitle:       "Material Withdrawal",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("materialWithdrawaltStatus", status);

			savePurchaseRequest(data, "approve", notificationData, pageContent,lastApproveCondition,id);
			

		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("materialWithdrawalID");
		const feedback = $(this).attr("code") || getFormCode("MWF", dateToday(), id);

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
					id="materialWithdrawalRemarks"
					name="materialWithdrawalRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-materialWithdrawalRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			materialWithdrawalID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("materialWithdrawalID"));
		const feedback = $(this).attr("code") || getFormCode(" MWF", dateToday(), id);

		const validate = validateForm("modal_purchase_request");
		if (validate) {
			let tableData = getTableData("ims_material_withdrawal_tbl", "", "materialWithdrawalID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("materialWithdrawalID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("materialWithdrawalRemarks", $("[name=materialWithdrawalRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                42,
					tableID: 				 id,
					notificationTitle:       "Material Withdrawal",
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
	const title = "Material Withdrawal";
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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null, lastApprover = false, materialWithdrawalID = null) {
	// function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null, lastApprover = false, isTransferRequestID = null) {
	
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					
					$.ajax({
						method:      "POST",
						url:         `material_withdrawal/saveMaterialWithdrawal`,
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
										FunctionlastApproveCondition(materialWithdrawalID);
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


function FunctionlastApproveCondition(materialWithdrawalID = null){
	let ApprovedtableData  = getTableData("ims_material_withdrawal_details_tbl ", "", "materialWithdrawalID = " + materialWithdrawalID);

	let data = { items: [] }, formData = new FormData;


	ApprovedtableData.map((item, index) => {

		const inventoryStorageID    = item.inventoryStorageID;		
		const itemID    = item.itemID;	
		const quantity  = item.quantity;	

		let temp = {
			inventoryStorageID,itemID,quantity
			
		};

		formData.append(`items[${index}][inventoryStorageID]`, inventoryStorageID);
		formData.append(`items[${index}][itemID]`, itemID);
		formData.append(`items[${index}][quantity]`, quantity);

		data["items"].push(temp);

	});
	
	$.ajax({
		method:      "POST",
		url:         `material_withdrawal/updateStorage`,
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

	console.log(data)

}

// --------------- END DATABASE RELATION ---------------