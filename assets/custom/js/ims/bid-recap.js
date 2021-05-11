$(document).ready(function() {
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(40);
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


    // GLOBAL VARIABLE - REUSABLE 
	const priceListValidation = [];

	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "ims_inventory_item_tbl.itemID AS itemID, itemCode, itemName, itemDescription ,categoryName, unitOfMeasurementID",
		"itemStatus = 1");
	const designationList = getTableData("hris_designation_tbl JOIN hris_employee_list_tbl USING(designationID)","designationID, designationName, MAX(employeeHourlyRate) AS designationRate", "designationStatus=1","","designationName");
	
	const itemPriceListData = getTableData("ims_inventory_price_list_tbl");
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
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
					{ targets: 11, width: 80  },
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
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
					{ targets: 11, width: 80  },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_bid_recap_tbl", "approversID")) {
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
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
		let bidRecapData = getTableData(
			"ims_bid_recap_tbl AS ibrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = ibrt.projectID",
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated, projectListCode, projectListName",
			`ibrt.employeeID != ${sessionID} AND bidRecapStatus != 0 AND bidRecapStatus != 4`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
					<th>Reference No.</th>
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

		bidRecapData.map((item) => {
			let {
				fullname,
				bidRecapID,
				projectListCode,
				projectListName,
				documentType,
				documentID,
				referenceCode,
				approversID,
				approversDate,
				bidRecapStatus,
				bidRecapRemarks,
				submittedAt,
				createdAt,
			} = item;
			let referenceNumber = getFormCode("IVR",moment(createdAt),referenceCode);
			
			let remarks       = bidRecapRemarks ? bidRecapRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = bidRecapStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = bidRecapStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(bidRecapID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(bidRecapID )}" 
				code="${getFormCode("BRF", createdAt, bidRecapID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, bidRecapStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("BRF", createdAt, bidRecapID )}</td>
					<td>${fullname}</td>
					<td>${projectListCode || '-'}</td>
					<td>${projectListName || '-'}</td>
					<td>${referenceNumber}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(bidRecapStatus)}
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
		let bidRecapData = getTableData(
			"ims_bid_recap_tbl AS ibrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = ibrt.projectID",
			"ibrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ibrt.createdAt AS dateCreated, projectListCode, projectListName",
			`ibrt.employeeID = ${sessionID}`,
			`FIELD(bidRecapStatus, 0, 1, 3, 2, 4), COALESCE(ibrt.submittedAt, ibrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
					<th>Reference No.</th>
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

		bidRecapData.map((item) => {
			let {
				fullname,
				bidRecapID,
                projectListCode,
                projectListName,
				documentType,
				documentID,
				referenceCode,
				approversID,
				approversDate,
				bidRecapStatus,
				bidRecapRemarks,
				submittedAt,
				createdAt,
			} = item;
			let referenceNumber = getFormCode("IVR",moment(createdAt),referenceCode);
			let remarks       = bidRecapRemarks ? bidRecapRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = bidRecapStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = bidRecapStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(bidRecapID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(bidRecapID )}" 
                code="${getFormCode("BRF", createdAt, bidRecapID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("BRF", createdAt, bidRecapID )}</td>
                <td>${fullname}</td>
                <td>${projectListCode || '-'}</td>
                <td>${projectListName || '-'}</td>
				<td>${referenceNumber}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, bidRecapStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(bidRecapStatus)}
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
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						bidRecapID="${bidRecapID}"
						code="${getFormCode("BRF", createdAt, bidRecapID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel" 
							bidRecapID="${bidRecapID}"
							id="btnCancel"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							bidRecapID="${bidRecapID}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (bidRecapStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							bidRecapID="${bidRecapID}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"
							status="${bidRecapStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (bidRecapStatus == 3) {
					// DENIED - FOR REVISE
						if(!isRevised(bidRecapID)){
							button = `
							<button
								class="btn btn-cancel"
								id="btnRevise" 
								bidRecapID="${encryptString(bidRecapID)}"
								code="${getFormCode("BRF", createdAt, bidRecapID)}"
								status="${bidRecapStatus}"><i class="fas fa-clone"></i>
								Revise
							</button>`;
						}
				}
			} else {
				if (bidRecapStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							bidRecapID="${encryptString(bidRecapID)}"
							code="${getFormCode("BRF", createdAt, bidRecapID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
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
    function getReferenceList(id = null, display = false) {
		let existIVR = [], html = ``;
		let invValidatrionData = getTableData("ims_inventory_validation_tbl", "","inventoryValidationStatus = '2' OR inventoryValidationStatus = '1'");
		let bidRecapData = getTableData("ims_bid_recap_tbl");
		bidRecapData.map(items=>{
			id ? "" : existIVR.push(items.referenceCode);
		});
		html += invValidatrionData.filter(items => !existIVR.includes(items.inventoryValidationID)).map(items=>{
			var projectList   = getTableData(
				"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
				"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
				"projectListStatus = 1 && projectListID ="+items.projectID);

			if (projectList.length > 0) {
				var address       = `${projectList[0].clientUnitNumber && titleCase(projectList[0].clientUnitNumber)+", "}${projectList[0].clientHouseNumber && projectList[0].clientHouseNumber +", "}${projectList[0].clientBarangay && titleCase(projectList[0].clientBarangay)+", "}${projectList[0].clientCity && titleCase(projectList[0].clientCity)+", "}${projectList[0].clientProvince && titleCase(projectList[0].clientProvince)+", "}${projectList[0].clientCountry && titleCase(projectList[0].clientCountry)+", "}${projectList[0].clientPostalCode && titleCase(projectList[0].clientPostalCode)}`;
				return `<option value            = "${items.inventoryValidationID }" 
							projectid 			 = "${projectList[0].projectListID}"
							projectcode          = "${getFormCode("PRO",moment(projectList[0].createdAt),projectList[0].projectListID)}"
							projectname          = "${projectList[0].projectListName}"
							clientcode           = "${projectList[0].clientCode}"
							clientname           = "${projectList[0].clientName}"
							address              = "${address}"
							${items.inventoryValidationID == id?"selected":""}>
							${getFormCode("IVR",moment(items.createdAt), items.inventoryValidationID)}
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
		const id 			= $(this).val();
		const projectid 	= $('option:selected',this).attr("projectid");
        const projectcode   = $('option:selected', this).attr("projectcode");
        const projectname   = $('option:selected', this).attr("projectname");
        const clientcode    = $('option:selected', this).attr("clientcode");
        const clientname    = $('option:selected', this).attr("clientname");
        const address       = $('option:selected', this).attr("address");
		$("[name=projectCode]").attr("projectid",projectid);
        $("[name=projectCode]").val(projectcode);
        $("[name=projectName]").val(projectname);
        $("[name=clientCode]").val(clientcode);
        $("[name=clientName]").val(clientname);
        $("[name=clientAddress]").val(address);

        $(".itemProjectTableBody").html('<tr><td colspan="7">'+preloader+'</td></tr>');
        $(".itemCompanyTableBody").html('<tr><td colspan="7">'+preloader+'</td></tr>');

        let itemProjectTableBody = requestItemData(id, "project");
		let itemCompanyTableBody = requestItemData(id, "company");
		let alertConfirmation 	 = ``;
		if(priceListValidation.length > 0){
			alertConfirmation 	 = `<div class="alert alert-warning py-1 text-center" role="alert">
											<small class="font-weight-bold"><i class="fa fa-exclamation-circle text-warning font-weight-bold"></i> Cannot process. Set a price for each item on the item price list first.</small>
										</div>`;
			let newSetPriceListValidation = [...new Set(priceListValidation)];
			newSetPriceListValidation.map(items=>{
				var itemsSplit = items.split("|");
				showNotification("warning2", 
				`Please set item code <strong>${getFormCode("ITM",moment(itemsSplit[0]), itemsSplit[1])}</strong> into Item price list module to proceed in this proccess`);
			});
		}
						


										
		$("#alert-confirmation").hide();
        setTimeout(() => {
			$("#alert-confirmation").html(alertConfirmation);
			$("#alert-confirmation").show(500);
			$(".itemProjectTableBody").html(itemProjectTableBody);
            $(".itemCompanyTableBody").html(itemCompanyTableBody);
			getGrandTotal();
			// initDataTables();
			// initAll();
		}, 300);
    })
    // ----- END SELECT PROJECT LIST -----


    // ----- SELECT ITEM NAME -----
    $(document).on("keyup", "[name=stocks]", function() {
		let thisValue 			= $(this).val();
		let quantityRequested 	= $(this).closest("tr").find(".qtyrequested").first().text();
		let difference 			= parseInt(quantityRequested) - parseInt(thisValue);
		let forPurchase 		= difference < 1 ? "0" : (difference||"-");
		$(this).closest("tr").find(".forpurchase").first().text(forPurchase);
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
	
	// GETTING THE GRAND TOTAL OF TWO CATEGORIES
		function getGrandTotal(){
			// itemTableRowTotal
			let grandTotal = 0, projectTotal=0, companyTotal=0;
			$(".itemTableRowTotal").each(function(i, obj) {
				let totalCost = $(this).find(".totalCost").text().replaceAll("₱","").replaceAll(",","");
				if($(this).find(".totalCost").attr("category") === "project"){
					projectTotal += parseFloat(totalCost);
				}else{
					companyTotal += parseFloat(totalCost);
				}
				grandTotal += parseFloat(totalCost);
			});

			$("#bidRecapProjectTotal").text(formatAmount(projectTotal,true));
			$("#bidRecapCompanyTotal").text(formatAmount(companyTotal,true));
			$("#bidRecapGrandTotal").text(formatAmount(grandTotal,true));
		}
	// END GETTING THE GRAND TOTAL OF TWO CATEGORIES

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			bidRecapID       	= "",
			reviseBidRecapID 	= "",
			employeeID          = "",
			projectID           = "",
			referenceCode 		= "",
            documentID          = "",
            documentType        = "",
			bidRecapReason   	= "",
			bidRecapRemarks  	= "",
			approversID         = "",
			approversStatus     = "",
			approversDate       = "",
			bidRecapGrandTotal	= null,
			bidRecapStatus   	= false,
			submittedAt         = false,
			createdAt           = false,
		} = data && data[0];

		let requestProjectItems = "", requestCompanyItems = "";
		
		if (bidRecapID) {
            requestProjectItems = requestItemData(referenceCode, "project", readOnly, `bidRecapID = '${bidRecapID}'`);
            requestCompanyItems = requestItemData(referenceCode, "company", readOnly, `bidRecapID = '${bidRecapID}'`);
		}

		if(documentType){
			var projectid="",projectCode="-",projectName="-",clientCode="-",clientName="-",clientAddress="-",requestorName="-",requestorDepartment="-",requestorPosition="-";
			let bidRecapData        = getTableData("ims_bid_recap_tbl","","bidRecapID="+bidRecapID);
			
			bidRecapData.map(bidRecapItems=>{
					let projectList   = getTableData(
						"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
						"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
						"projectListStatus = 1 && projectListID ="+bidRecapItems.projectID);
					let address       = `${projectList[0].clientUnitNumber && titleCase(projectList[0].clientUnitNumber)+", "}${projectList[0].clientHouseNumber && projectList[0].clientHouseNumber +", "}${projectList[0].clientBarangay && titleCase(projectList[0].clientBarangay)+", "}${projectList[0].clientCity && titleCase(projectList[0].clientCity)+", "}${projectList[0].clientProvince && titleCase(projectList[0].clientProvince)+", "}${projectList[0].clientCountry && titleCase(projectList[0].clientCountry)+", "}${projectList[0].clientPostalCode && titleCase(projectList[0].clientPostalCode)}`;
						if(bidRecapItems.bidRecapID	== bidRecapID){
							projectid 			= projectList[0].projectListID;
							projectCode			= getFormCode("PRO",moment(projectList[0].createdAt),projectList[0].projectListID);
							projectName			= projectList[0].projectListName;
							clientCode			= projectList[0].clientCode;
							clientName			= projectList[0].clientName;
							clientAddress		= address;
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

		$("#btnBack").attr("bidRecapID", bidRecapID);
		$("#btnBack").attr("status", bidRecapStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		

		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let tableCompanyRequestItemsName = !disabled ? "tableCompanyRequestItems" : "tableCompanyRequestItems0";

		let button = formButtons(data, isRevise);

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
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
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
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
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
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference Document No. ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="documentID"
                        id="documentID"
                        style="width: 100%"
                        required
						${bidRecapID == "" ? `` : `disabled`}
						>
                        <option selected disabled>Select Document No.</option>
                        ${getReferenceList(referenceCode,readOnly)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-documentID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" projectid="${projectid||""}" disabled value="${projectCode||"-"}">
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
            <div class="col-sm-12">
				<div id="alert-confirmation"></div>
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Materials and Equipment</div>
                    <table class="table table-striped table-bordered table-responsive-xl">
                        <thead>
							<tr style="white-space: nowrap">
								<th style="width:20%;">Vendor Name</th>
								<th style="width: 100px">Item Code</th>
                                <th style="width: 20%">Item Name</th>
                                <th style="width: 80px">UOM</th>
                                <th style="width: 80px" class="text-center">Requested</th>
                                <th style="width: 80px" class="text-center">Stocked</th>
                                <th style="width: 150px" class="text-center">For Purchase</th>
                                <th style="width: 80px">File</th>
								<th style="width: 50px" class="text-right">Unit Cost</th>
								<th style="width: 50px" class="text-right">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true"></tbody>
                    </table>
                </div>
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Company Materials and Equipment</div>
                    <table class="table table-striped table-bordered table-responsive-xl">
                        <thead>
							<tr style="white-space: nowrap">
								<th style="width:20%;">Vendor Name</th>
								<th style="width: 100px">Item Code</th>
                                <th style="width: 20%">Item Name</th>
                                <th style="width: 80px">UOM</th>
                                <th style="width: 80px" class="text-center">Requested</th>
                                <th style="width: 80px" class="text-center">Stocked</th>
                                <th style="width: 150px" class="text-center">For Purchase</th>
                                <th style="width: 80px">File</th>
								<th style="width: 50px" class="text-right">Unit Cost</th>
								<th style="width: 50px" class="text-right">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="itemCompanyTableBody" company="true"></tbody>
                    </table>
                </div>
            </div>
			<div class="col-sm-12 mt-3">
				<div class="w-100 text-right py-2">
					<div class="font-weight-bolder" style="font-size: 1rem;">
						<span>Project Total Cost: &nbsp;</span>
						<span class="text-danger" style="font-size: 1.2em" id="bidRecapProjectTotal"></span>
					</div>

					<div class="font-weight-bolder" style="font-size: 1rem;">
						<span>Company Total Cost: &nbsp;</span>
						<span class="text-danger" style="font-size: 1.2em" id="bidRecapCompanyTotal"></span>
					</div>

					<div class="font-weight-bolder" style="font-size: 1rem;">
						<span>Grand Total: &nbsp;</span>
						<span class="text-danger" style="font-size: 1.2em" id="bidRecapGrandTotal"></span>
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
			$(".itemProjectTableBody").append(requestProjectItems);
			$(".itemCompanyTableBody").append(requestCompanyItems);
			getGrandTotal();
			initDataTables();
			updateTableItems();
			initAll();
			updateInventoryItemOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
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

			headerButton(true, "Add Inventory Validation");
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


	// ----- GET Inventory Validation DATA -----
	function getbidRecapData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			data["bidRecapID"] = id;

			if (status != "2") {
				data["bidRecapStatus"] = status;
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		if (currentStatus == "0" && method != "approve") {
		    var referenceCode 			  = $("[name=documentID]").val() || null;
			var requestItemsData 		  = getTableData("ims_request_items_tbl","costEstimateID","	inventoryValidationID="+referenceCode); 
			var documentID 				  = requestItemsData.length > 0 ? requestItemsData[0].costEstimateID : null;			 
			data["employeeID"]            = sessionID;
			data["projectID"]             = $("[name=projectCode]").attr("projectid") || null;
			data["documentID"] 			  = documentID;
			data["referenceCode"] 		  = referenceCode;
			data["bidRecapReason"] 	  	  = $("[name=bidRecapReason]").val()?.trim();
			data["bidRecapProjectTotal"]  = $("#bidRecapProjectTotal").text().replaceAll("₱","").replaceAll(",","");;
			data["bidRecapCompanyTotal"]  = $("#bidRecapCompanyTotal").text().replaceAll("₱","").replaceAll(",","");;
			data["bidRecapGrandTotal"] 	  = $("#bidRecapGrandTotal").text().replaceAll("₱","").replaceAll(",","");
			
		

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();
			} else if (action == "update") {
				data["bidRecapID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]    = approversID;
					data["bidRecapStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]      = sessionID;
					data["approversStatus"]  = 2;
					data["approversDate"]    = dateToday();
					data["bidRecapStatus"] 	 = 2;
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				var requestItemID 			= $(this).find(".itemcode").attr("requestitem");
				var requestItemsData 		= getTableData("ims_request_items_tbl",
															`costEstimateID,inventoryValidationID,itemID,itemName,itemDescription,itemUom,quantity,files`,
															"requestItemID="+requestItemID); 
				var temp = {
					costEstimateID: 		requestItemsData[0].costEstimateID,
					inventoryValidationID:	requestItemsData[0].inventoryValidationID,
					category:				$(this).attr("category"),
					inventoryVendorID:		$(this).find(".itemcode").attr("vendorID"),
					inventoryVendorName:	$(this).find(".itemcode").attr("vendorName"),
					itemID:					requestItemsData[0].itemID,
					itemname:				requestItemsData[0].itemName,
					itemDescription:		requestItemsData[0].itemDescription,
					itemUom:				requestItemsData[0].itemUom,
					quantity:				requestItemsData[0].quantity,
					stocks:					$(this).find(".stocks").text(),
					forPurchase:			$(this).find(".forpurchase").text(),
					file:					requestItemsData[0].files,
					unitCost:				$(this).find(".unitCost").text().replaceAll("₱","").replaceAll(",",""),
					totalCost:				$(this).find(".totalCost").text().replaceAll("₱","").replaceAll(",",""),
					createdBy: 				sessionID,
					updatedBy:				sessionID
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
		const id = $(this).attr("bidRecapID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("bidRecapID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("BRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getbidRecapData(action, "save", "0", id);
				data["bidRecapStatus"] 	=	0;
				data["reviseBidRecapID"] = id;
				delete data["bidRecapID"]; 
	
				savebidRecapID(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getbidRecapData(action, "save", "0", id);
			data["bidRecapStatus"] 	=	0;
			
			savebidRecapID(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = $(this).attr("bidRecapID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);
		const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getbidRecapData(action, "save", "0", id);
		data["bidRecapStatus"] 	=	0;
		if (revise) {
			data["reviseBidRecapID"] = id;
			delete data["bidRecapID"];  
		}	
		savebidRecapID(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = $(this).attr("bidRecapID");
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_bid_recap");

		if (validate) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getbidRecapData(action, "submit", "1", id);

			if (revise) {
				data["reviseBidRecapID"] = id;
				delete data["bidRecapID"];  
				
				// data.append("reviseBidRecapID", id);
				// data.delete("bidRecapID");
			}

			let approversID = "", approversDate = "";
			for (var i of Object.keys(data)) {
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
		
			if(priceListValidation.length > 0){
				priceListValidation.map(items=>{
					var splitItems = items.split("|");
					showNotification("warning2",
					`Please set item code <strong>${getFormCode("ITM",moment(splitItems[0]), splitItems[1])}</strong> into Item price list module to proceed in this proccess`)
				});
			}else{
				savebidRecapID(data, "submit", notificationData, pageContent);
			}
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("bidRecapID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getbidRecapData(action, "cancelform", "4", id, status);

		savebidRecapID(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("bidRecapID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("ims_bid_recap_tbl", "", "bidRecapID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let bidRecapID  = tableData[0].bidRecapID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getbidRecapData("update", "approve", "2", id);
			data["approversStatus"]	= updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"]	= dateApproved;

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
				thisCondition = true;
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

			data["bidRecapStatus"]	= status;
			savebidRecapID(data, "approve", notificationData, pageContent, bidRecapID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("bidRecapID");
		const feedback = $(this).attr("code") || getFormCode("BRF", dateToday(), id);

		$("#modal_bid_recap_content").html(preloader);
		$("#modal_bid_recap .page-title").text("DENY Inventory Validation");
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
			<button class="btn btn-danger" id="btnRejectConfirmation"
			bidRecapID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
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

				let data = {};
				data["action"]						= "update";
				data["method"]						= "deny";
				data["bidRecapID"]		= id;
				data["approversStatus"]				= updateApproveStatus(approversStatus, 3);
				data["approversDate"]				= updateApproveDate(approversDate);
				data["bidRecapRemarks"]	= $("[name=bidRecapRemarks]").val()?.trim();
				data["updatedBy"]					= sessionID;

				let notificationData = {
					moduleID:                40,
					tableID: 				 id,
					notificationTitle:       "Bid Recap",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savebidRecapID(data, "deny", notificationData, pageContent);
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


    // GETTING REQUEST ITEMS 
        function requestItemData(id, type, readOnly = false, requestID = null){
			let html = "", totalRequestedQty=0, totalStocksQty=0, totalForPurchaseQty=0, totalUnitCost=0, grandTotalCost=0;
			let joinedTableData = [], vendorArr = [];
			let condition = requestID ? requestID : `inventoryValidationID='${id}' AND bidRecapID IS NULL`;
            let tableData = getTableData("ims_request_items_tbl JOIN ims_inventory_item_tbl USING(itemID)",
										`requestItemID, inventoryValidationID , bidRecapID, 
										ims_inventory_item_tbl.itemID AS itemID, categoryType ,ims_inventory_item_tbl.createdAt AS createdAt ,
										ims_request_items_tbl.itemName AS itemName, ims_request_items_tbl.itemDescription AS itemDescription,
										ims_request_items_tbl.inventoryVendorID AS inventoryVendorID, ims_request_items_tbl.inventoryVendorName AS inventoryVendorName,
										itemUom,quantity,stocks,forPurchase,files,unitCost,totalCost`,
										`${condition} AND categoryType='${type}'`);
				tableData.map(items=>{
					var tempData = items;
					var priceListArray;
						if(readOnly){
							priceListArray = tableData.filter(thisItems => thisItems.itemID == items.itemID);
						}else{
							priceListArray = itemPriceListData.filter(priceListItems => priceListItems.itemID == items.itemID  && priceListItems.preferred == 1);	
						}
					var priceListCondition          = priceListArray.length < 1;
					priceListCondition ? priceListValidation.push(tempData.createdAt+"|"+tempData.itemID) : ``;
					tempData["inventoryVendorID"] 	=  !priceListCondition ? priceListArray[0].inventoryVendorID 	: `-`;
					tempData["inventoryVendorName"] =  !priceListCondition ? priceListArray[0].inventoryVendorName 	: `-`;
					tempData["vendorCurrentPrice"] 	=  !priceListCondition ? (priceListArray[0].vendorCurrentPrice || priceListArray[0].unitCost) 	: `0`;
					!priceListCondition ? vendorArr.push(priceListArray[0].inventoryVendorID) : ``;
					joinedTableData.push(tempData);
				});
				let newSetVendorArr = [...new Set(vendorArr)];
				newSetVendorArr.map((items,index)=>{
					var vendorRequested=0, vendorStocks=0, vendorForPurchase=0, vendorUnitCost=0, vendorTotalCost=0;
					let vendorItemsArr 		= joinedTableData.filter(joinedItems => joinedItems.inventoryVendorID == items);
					let vendorItemsLength 	= vendorItemsArr.length;
					let vendorRowspanArr	= [];
					
						// MAPPING FOR THE ROWSPAN;
							vendorItemsArr.map((items,index)=>{
								var tempData = index == 0 ? `<td class="font-weight-bold" rowspan="${vendorItemsLength}">${items.inventoryVendorName}</td>`
											:``;
								vendorRowspanArr.push(tempData);
							});
						// END MAPPING FOR THE ROWSPAN;
						
						// MAPPING THE ITEMS OF TABLE DATA
							html += vendorItemsArr.map((joinedItems,joinedIndex)=>{
								var returnData 	= "";
								var unitCost 	= parseFloat(joinedItems.vendorCurrentPrice);
								var totalCost 	= parseFloat(joinedItems.forPurchase) * parseFloat(unitCost);
								var files = items.files ? `<a class="filename" href="${base_url+"assets/upload-files/request-items/"+joinedItems.files}" 
																	target="_blank">${joinedItems.files}
															</a>`:"-";
								
										returnData += `
												<tr class="itemTableRow" category="${type}">
													${vendorRowspanArr[joinedIndex]}
													<td>
														<div class="itemcode" 
														requestitem="${joinedItems.requestItemID}"
														vendorID="${joinedItems.inventoryVendorID}"
														vendorName="${joinedItems.inventoryVendorName}"
														itemid="${joinedItems.itemID}" 
														inventoryValidationID="${joinedItems.inventoryValidationID}">${getFormCode("ITM",moment(joinedItems.createdAt), joinedItems.itemID)}</div>
													</td>
													<td>
														<div class="itemname">${joinedItems.itemName}</div>
													</td>
													<td>
														<div class="uom">${joinedItems.itemUom}</div>
													</td>
													<td class="text-center">
														<div class="qtyrequested">${joinedItems.quantity}</div>
													</td>
													<td class="text-center">
														<div class="stocks">${joinedItems.stocks || "0"}</div>
													</td>
													<td class="text-center">
														<div class="forpurchase">${joinedItems.forPurchase || "0"}</div>
													</td>
													<td>
														<div class="file">
															${files}
														</div>
													</td>
													<td>
														<div class="unitCost text-right">${formatAmount(unitCost,true)}</div>
													</td>
													<td>
														<div class="totalCost text-right">${formatAmount(totalCost,true)}</div>
													</td>
												</tr>`;

								// ADD THE FOLLOWING;
									vendorRequested		+= parseFloat(joinedItems.quantity), 
									vendorStocks		+= parseFloat(joinedItems.stocks), 
									vendorForPurchase	+= parseFloat(joinedItems.forPurchase), 
									vendorUnitCost		+= parseFloat(unitCost), 
									vendorTotalCost		+= parseFloat(totalCost);
								return returnData;
							});
						// END  MAPPING THE ITEMS OF TABLE DATA

						// TABLE ROW FOR TOTALS
						html += `
								<tr class="itemTableRowTotal" category="${type}" style="background-color: #dc3450;">
									<td class="font-weight-bold text-light" colspan="4">SUBTOTAL</td>
									<td class="font-weight-bold text-light text-center">${vendorRequested}</td>
									<td class="font-weight-bold text-light text-center">${vendorStocks}</td>
									<td class="font-weight-bold text-light text-center">${vendorForPurchase}</td>
									<td class="font-weight-bold text-light">-</td>
									<td class="font-weight-bold text-light text-right">${formatAmount(vendorUnitCost,true)}</td>
									<td class="font-weight-bold text-light text-right"><span class="totalCost" category="${type}">${formatAmount(vendorTotalCost,true)}</span></td>
								</tr>`;
						// END TABLE ROW FOR TOTALS

				}) // END MAPPING OF "newSetVendorArr"



            return html;
        }
    // END GETTING REQUEST ITEMS


	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("ims_bid_recap_tbl","reviseBidRecapID",`reviseBidRecapID=`+id);
		revised = tableData.length > 0 ? true : false;
		console.log(tableData);
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Inventory Validation";
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

function savebidRecapID(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					url:	base_url+`ims/bid_recap/save_bid_recap`,
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
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("BRF", dateCreated, insertedID)} denied successfully!`;
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
				if (res.dismiss === "cancel") {
					if (method != "deny") {
						callback && callback();
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
	return thisReturnData;
}

// --------------- END DATABASE RELATION ---------------