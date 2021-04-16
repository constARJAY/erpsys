$(document).ready(function() {
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase request");
	// ----- END MODULE APPROVER -----


	// ----- GET PHILIPPINE ADDRESSES -----
	const getPhAddresses = () => {
		let result = [];
		$.ajax({
			method: "GET",
			url: `${base_url}assets/json/ph-address.json`,
			async: false,
			dataType: "json",
			success: function (data) {
				result = data;
			},
		});
		return result;
	};
	const address = getPhAddresses();
	
	const phRegion = [
		{ key: "01",    name: "REGION I" },
		{ key: "02",    name: "REGION II" },
		{ key: "03",    name: "REGION III" },
		{ key: "4A",    name: "REGION IV-A" },
		{ key: "4B",    name: "REGION IV-B" },
		{ key: "05",    name: "REGION V" },
		{ key: "06",    name: "REGION VI" },
		{ key: "07",    name: "REGION VII" },
		{ key: "08",    name: "REGION VIII" },
		{ key: "09",    name: "REGION IX" },
		{ key: "10",    name: "REGION X" },
		{ key: "11",    name: "REGION XI" },
		{ key: "12",    name: "REGION XII" },
		{ key: "13",    name: "REGION XIII" },
		{ key: "BARMM", name: "BARMM" },
		{ key: "CAR",   name: "CAR" },
		{ key: "NCR",   name: "NCR" },
	];
	// ----- END GET PHILIPPINE ADDRESSES -----


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
	function viewDocument(view_id = false, readOnly = false) {
		const loadData = (id) => {
			const tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					purchaseRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (purchaseRequestStatus == 0 || purchaseRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (purchaseRequestStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					pageContent(true, tableData, isReadOnly);
					updateURL(encryptString(id));
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
				id && isFinite(id) && loadData(id);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				pageContent(true);
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/purchase_request?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}ims/purchase_request?add`);
		} else {
			window.history.pushState("", "", `${base_url}ims/purchase_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
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
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
					{ targets: 11, width: 80  },
				],
			});

        var table = $("#tableRequestItems")
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 150 },
					{ targets: 9,  width: 200 },
				],
			});

			var table = $("#tableRequestItems0")
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
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 50  },
					{ targets: 3,  width: 120 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_purchase_request_tbl", "approversID")) {
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
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableMyFormsParent").html(preloader);

		let purchaseRequestData = getTableData(
			"ims_purchase_request_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`employeeID != ${sessionID} AND purchaseRequestStatus != 0 AND purchaseRequestStatus != 4`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Reference Code</th>
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

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
                projectID,
                projectListCode,
                projectListName,
                referenceCode,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = purchaseRequestStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(purchaseRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseRequestID )}" 
                code="${getFormCode("PR", createdAt, purchaseRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
                <td>${fullname}</td>
                <td>${projectListCode}</td>
                <td>${projectListName}</td>
                <td>${referenceCode || "-"}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseRequestStatus)}
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
	// ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let purchaseRequestData = getTableData(
			"ims_purchase_request_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Reference Code</th>
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

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
                projectID,
                projectListCode,
                projectListName,
                referenceCode,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = purchaseRequestStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(purchaseRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseRequestID )}" 
                code="${getFormCode("PR", createdAt, purchaseRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
                <td>${fullname}</td>
                <td>${projectListCode || '-'}</td>
                <td>${projectListName || '-'}</td>
                <td>${referenceCode || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseRequestStatus)}
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
	function formButtons(data = false) {
		let button = "";
		if (data) {
			let {
				purchaseRequestID     = "",
				purchaseRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (purchaseRequestStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						purchaseRequestID="${purchaseRequestID}"
						code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						purchaseRequestID="${purchaseRequestID}"
						code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (purchaseRequestStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							purchaseRequestID="${purchaseRequestID}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (purchaseRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-ban"></i> 
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
        let html = projectList.map(project => {
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
		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		let elementID = [];
		$("[name=itemID]").each(function(i, obj) {
			itemIDArr.push($(this).val());
			elementID.push(this.id);
			$(this).val() && $(this).trigger("change");
		}) 

		elementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			html += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == itemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == itemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(`#${element}`).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, display = true) {
        let html = `<option selected disabled>Select Item Name</option>`;

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$("[name=itemID]").each(function(i, obj) {
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
        })
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
    function getItemRow(item = {}, readOnly = false) {

		let disabled     = readOnly ? "disabled" : "";
		let checkboxData = !disabled ? `
		<td class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxrow">
			</div>
		</td>` : ``;
		let {
			itemID    = null,
			quantity  = 1,
			unitCost  = 0,
			totalCost = 0,
			files     = "",
			remarks   = ""
		} = item;

        let html = `
        <tr class="itemTableRow">
            ${checkboxData}
            <td>
                <div class="itemcode">-</div>
            </td>
            <td>
                <div class="itemname">
					<div class="form-group">
						<select
							class="form-control validate select2"
							name="itemID"
							id="itemID"
							style="width: 100%"
							${disabled}
							required>
							${getInventoryItem(itemID)}
						</select>
						<div class="invalid-feedback d-block" id="invalid-itemID"></div>
					</div>
				</div>
            </td>
            <td class="text-center">
                <div class="quantity">
                    <input 
						type="text" 
						class="form-control validate number text-center"
						min="1" 
						data-allowcharacters="[0-9][.]" 
						max="999999999" 
						id="quantity" 
						name="quantity" 
						value="${quantity}" 
						minlength="1" 
						maxlength="20" 
						${disabled}
						requred>
                    <div class="invalid-feedback d-block" id="invalid-quantity"></div>
                </div>
            </td>
            <td>
                <div class="category">-</div>
            </td>
            <td>
                <div class="uom">-</div>
            </td>
            <td class="text-right">
                <div class="unitcost">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" >₱</span>
                        </div>
                        <input 
							type="text" 
							class="form-control amount"
							min="0" 
							max="9999999999"
							minlength="1"
							maxlength="20" 
							name="unitCost" 
							id="unitCost" 
							${disabled}
							value="${unitCost}">
                    </div>
                    <div class="invalid-feedback d-block" id="invalid-unitCost"></div>
                </div>
            </td>
            <td class="text-right">
                <div class="totalcost">${formatAmount(totalCost, true)}</div>
            </td>
            <td>
                <div class="file">
                    <input type="file" class="form-control" name="files" id="files">
                    <div class="invalid-feedback d-block" id="invalid-files"></div>
                </div>
            </td>
            <td>
                <div class="remarks">
                    <textarea 
						rows="2" 
						style="resize: none" 
						class="form-control" 
						name="remarks" 
						id="remarks"
						${disabled}>${remarks || ""}</textarea>
                </div>
            </td>
        </tr>`;
        return html;
    }
    // ----- END GET ITEM ROW -----


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
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("id", `itemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);

			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let count = 0;
		$(".checkboxrow").each(function() {
			this.checked && count++;
		})
		$("#btnDeleteRow").attr("disabled", count == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow() {
		if ($(".checkboxrow:checked").length != $(".checkboxrow").length) {
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
					$(".checkboxrow:checked").each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableItems();
							$("[name=itemID]").each(function(i, obj) {
								let itemID = $(this).val();
								$(`#itemid${i}`).html(getInventoryItem(itemID));
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
        const itemCode     = $('option:selected', this).attr("itemCode");
        const categoryName = $('option:selected', this).attr("categoryName");
        const uom          = $('option:selected', this).attr("uom");
		const index        = $(this).attr("index");

        $(`#itemcode${index}`).text(itemCode);
        $(`#category${index}`).text(categoryName);
        $(`#uom${index}`).text(uom);

		$("[name=itemID]").each(function(i, obj) {
			let itemID = $(this).val();
			$(`#itemid${i}`).html(getInventoryItem(itemID));
		}) 
    })
    // ----- END SELECT ITEM NAME -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity], [name=unitCost]", function() {
		const index     = $(this).closest("tr").first().attr("index");
		const quantity  = +$(`#quantity${index}`).val();
		const unitcost  = +$(`#unitcost${index}`).val().replace(",", "");
		const totalcost = quantity * unitcost;
		$(`#totalcost${index}`).text(formatAmount(totalcost, true));
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- CLICK DELETE ROW -----
	$(document).on("click", "#btnDeleteRow", function(){
		deleteTableRow();
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
		$(".checkboxrow").each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


    // ----- INSERT ROW ITEM -----
    $(document).on("click", "#btnAddRow", function() {
        let row = getItemRow();
        $(".itemTableBody").append(row);
		updateTableItems();
		initInputmask();
		initAmount();
    })
    // ----- END INSERT ROW ITEM -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);

		let {
			purchaseRequestID      = "",
			employeeID             = "",
			projectID              = "",
			purchaseRequestReason  = "",
			purchaseRequestRemarks = "",
			approversID            = "",
			approversStatus        = "",
			approversDate          = "",
			purchaseRequestStatus  = false,
			submittedAt            = false,
			createdAt              = false,
		} = data && data[0];

		let requestItems = "";
		if (purchaseRequestID) {
			let requestItemsData = getTableData("ims_request_items_tbl", "", `purchaseRequestID = ${purchaseRequestID}`);
			requestItemsData.map(item => {
				requestItems += getItemRow(item, readOnly);
			})
		} else {
			requestItems += getItemRow();
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("purchaseRequestID", purchaseRequestID);
		$("#btnBack").attr("status", purchaseRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		let checkboxHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall">
			</div>
		</th>` : ``;
		let tableRequestItemsName = !disabled ? "tableRequestItems" : "tableRequestItems0";
		let buttonAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		let button = formButtons(data);

		let html = `
        <div class="row px-2">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${purchaseRequestID ? getFormCode("PR", createdAt, purchaseRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${purchaseRequestStatus ? getStatusStyle(purchaseRequestStatus) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(purchaseRequestStatus, approversID, approversDate)}
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
							${purchaseRequestRemarks ? purchaseRequestRemarks : "---"}
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
                    <label>Project Name <code>*</code></label>
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
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="purchaseRequestReason"
                        name="purchaseRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${purchaseRequestReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseRequestReason"></div>
                </div>
            </div>

            <div class="col-sm-12">
                <div class="w-100">
					<hr>
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">List of Items</div>
                    <table class="table table-striped" id="${tableRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxHeader}
                                <th>Item Code</th>
                                <th>Item Name <code>*</code></th>
                                <th>Quantity <code>*</code></th>
                                <th>Category</th>
                                <th>UOM</th>
                                <th>Unit Cost <code>*</code></th>
                                <th>Total Cost</th>
                                <th>File</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="itemTableBody">
                            ${requestItems}
                        </tbody>
                    </table>
                    ${buttonAddDeleteRow}
                </div>
            </div>

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
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
	function pageContent(isForm = false, data = false, readOnly = false) {
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

			headerButton(true, "Add Purchase Request");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false);
			headerTabContent(false);
			formContent(data, readOnly);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- GET PURCHASE REQUEST DATA -----
	function getPurchaseRequestData(action = "insert", method = "submit", status = "1", id = null, isObject = false) {

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

		data["action"]                = action;
		data["employeeID"]            = sessionID;
		data["projectID"]             = $("[name=projectID]").val() || null;
		data["purchaseRequestStatus"] = status;
		data["purchaseRequestReason"] = $("[name=purchaseRequestReason]").val()?.trim();
		data["updatedBy"]             = sessionID;
		data["updatedAt"]             = dateToday();

		formData.append("action", action);
		formData.append("employeeID", sessionID);
		formData.append("projectID", $("[name=projectID]").val() || null);
		formData.append("purchaseRequestStatus", status);
		formData.append("purchaseRequestReason", $("[name=purchaseRequestReason]").val()?.trim());
		formData.append("updatedBy", sessionID);
		formData.append("updatedAt", dateToday());

		if (action == "insert") {
			data["createdBy"]   = sessionID;
			data["createdAt"]   = dateToday();

			formData.append("createdBy", sessionID);
			formData.append("createdAt", dateToday());

			if (method == "submit") {
				data["approversID"] = approversID;
				data["submittedAt"] = dateToday();

				formData.append("approversID", approversID);
				formData.append("submittedAt", dateToday());
			}
		} else if (action == "update") {
			data["purchaseRequestID"] = id;

			formData.append("purchaseRequestID", id);
		}

		$(".itemTableRow").each(function(i, obj) {
			const itemID    = $("td [name=itemID]", this).val();	
			const quantity  = +$("td [name=quantity]", this).val();	
			const unitcost  = +$("td [name=unitCost]", this).val().replace(",", "");	
			const totalcost = quantity * unitcost;
			const remarks   = $("td [name=remarks]", this).val()?.trim();	
			const fileID    = $("td [name=files]", this).attr("id");
			const file      = $(`#${fileID}`)[0].files[0];
			const fileArr   = file?.name.split(".");
			const filename  = file ? file?.name : "";

			let temp = {
				itemID, quantity, unitcost, totalcost: totalcost.toFixed(2),
				filename
			};
			data["items"].push(temp);

			formData.append(`items[${i}][itemID]`, itemID);
			formData.append(`items[${i}][quantity]`, quantity);
			formData.append(`items[${i}][unitcost]`, unitcost);
			formData.append(`items[${i}][totalcost]`, totalcost);
			formData.append(`items[${i}][remarks]`, remarks);
			formData.append(`items[${i}][filename]`, filename);
			formData.append(`items[${i}][createdBy]`, sessionID);
			formData.append(`items[${i}][updatedBy]`, sessionID);
			if (file) {
				formData.append(`items[${i}][file]`, file, `${i}.${fileArr[1]}`);
			}
		});

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


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("purchaseRequestID");
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}
		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPurchaseRequestData(action, "save", "0", id);

			savePurchaseRequest(data, action, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id       = $(this).attr("purchaseRequestID");
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const action   = id && feedback ? "update" : "insert";
		const data     = getPurchaseRequestData(action, "save", "4", id);

		savePurchaseRequest(data, action, "save", null, pageContent);
	});
	// ----- END SAVE CANCEL DOCUMENT -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const action   = "insert"; 
		const feedback = getFormCode("PR", dateToday()); 
		const data     = getData(action, 0, "save", feedback);

		formConfirmation(
			"save",
			"insert",
			"PURCHASE REQUEST",
			"",
			"form_purchase_request",
			data,
			true,
			myFormsContent
		);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = $(this).attr("purchaseRequestID");
		const validate     = validateForm("form_purchase_request");

		if (validate) {
			const action = id ? "update" : "insert";
			const data   = getPurchaseRequestData(action, "submit", "1", id);

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                46,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePurchaseRequest(data, action, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("purchaseRequestID");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id);

		savePurchaseRequest(data, action, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["tableData[approversDate]"]   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${getFormCode("PR", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[changeScheduleStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"PURCHASE REQUEST",
					"",
					"form_purchase_request",
					data,
					true,
					pageContent,
					notificationData
				);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("purchaseRequestID");
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		$("#modal_purchase_request_content").html(preloader);
		$("#modal_purchase_request .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_purchase_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="purchaseRequestRemarks"
					name="purchaseRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-purchaseRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			purchaseRequestID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		const validate = validateForm("modal_purchase_request");
		if (validate) {
			let tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[purchaseRequestRemarks]"] = $("[name=purchaseRequestRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                60,
					tableID: 				 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${getFormCode("PR", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"PURCHASE REQUEST",
						"modal_purchase_request",
						"",
						data,
						true,
						pageContent,
						notificationData
					);
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}, 300);
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
	const title = "Purchase Request";
	let swalText, swalImg;

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
		case "reject":
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

function savePurchaseRequest(data = null, action = "insert", method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `purchase_request/savePurchaseRequest`,
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
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} cancelled successfully!`;
						}
		
						if (isSuccess == "true") {
							setTimeout(() => {
								$("#loader").hide();
								Swal.fire({
									icon:              "success",
									title:             swalTitle,
									showConfirmButton: false,
									timer:             2000,
								});
								callback && callback();

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
					callback && callback();
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------