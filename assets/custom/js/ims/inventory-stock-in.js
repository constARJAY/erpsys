$(document).ready(function () {

	// ----- MODULE APPROVER -----
	//const moduleApprover = getModuleApprover("inventory stock in");
	// ----- END MODULE APPROVER ----

	// ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		// if (id) {
		// 	let data = allEmployeeData.filter(employee => employee.employeeID == id);
		// 	let {
		// 		employeeID,
		// 		fullname,
		// 		designation,
		// 		department
		// 	} = data && data[0];
		// 	return {
		// 		employeeID,
		// 		fullname,
		// 		designation,
		// 		department
		// 	};
		// }
		// return {};
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
			const tableData	= getUnionTableData(`
					SELECT id,consolidateCode, employeeID,SUM(quantity) AS quantity, SUM(received) AS received,  createAt, '2' as dataStatus,recordID
					FROM
					( 
						SELECT '1' AS module,
							iri.returnItemID AS id,
							returnItemCode AS consolidateCode,
							employeeID,
							SUM(receivedQuantity) AS quantity,
							0 AS received,
							createAt,
							'1' AS recordID
						FROM ims_return_item_tbl AS iri
						LEFT JOIN ims_inventory_request_details_tbl AS ird ON iri.returnItemID = ird.returnItemID
						WHERE iri.returnItemCode ='${id}'
						UNION ALL
						SELECT 
							'2' AS module,
							muf.materialUsageID AS id,
							materialUsageCode AS consolidateCode,
							employeeID,
							SUM(unused) AS quantity,
							0 AS received,
							createAt,
							'0' AS recordID
						FROM ims_material_usage_tbl AS muf
						LEFT JOIN ims_inventory_request_details_tbl AS ird ON muf.materialUsageID = ird.materialUsageID
						WHERE muf.materialUsageCode ='${id}'
						UNION ALL
						SELECT 
							'3' AS module,
							innr.inventoryReceivingID AS id,
							inventoryReceivingCode AS consolidateCode,
							employeeID,
							SUM(receivedQuantity) AS quantity,
							0 AS received,
							createAt,
							innr.recordID
						FROM ims_inventory_receiving_tbl AS innr
						LEFT JOIN ims_inventory_request_details_tbl AS ird ON innr.inventoryReceivingID = ird.inventoryReceivingID
						WHERE innr.inventoryReceivingCode ='${id}'
						UNION ALL
						SELECT 
							'4' AS module,
							'' AS id,
							'' AS consolidateCode,
							'' AS employeeID,
							0 AS quantity,
							SUM(quantityForStockin) AS received,
							'' AS createAt,
							'' AS recordID
						FROM ims_stock_in_item_tbl 
						WHERE inventoryCode ='${id}'
						UNION ALL
						SELECT 
							'5' AS module,
							'' AS id,
							'' AS consolidateCode,
							'' AS employeeID,
							0 AS quantity,
							SUM(quantityForStockin) AS received,
							'' AS createAt,
							'' AS recordID
						FROM ims_stock_in_assets_tbl 
						WHERE inventoryCode ='${id}'
					)a WHERE consolidateCode IS NOT NULL `);
			if (tableData.length > 0) {	
				
				let {
					employeeID,
					dataStatus
				} = tableData[0]; 

				let isReadOnly = true,
					isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (dataStatus == 0 || dataStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (dataStatus == 0) {
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
			id  && loadData(id);
		} else {
			let url = window.document.URL;
			let arr = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
				id && loadData(id);
			} else if (isAdd != -1) {
				pageContent(true);
			}
		}

	}

	function updateURL(view_id = 0, isAdd = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/inventory_stock_in?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}ims/inventory_stock_in?add`);
		} else {
			window.history.pushState("", "", `${base_url}ims/inventory_stock_in`);
		}
	}
	// ----- END VIEW DOCUMENT -----

	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 

	// ----- DATATABLES -----
	function initDataTables() {

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}
		var table = $("#tableMyForms")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [{
						targets: 0,
						width: 200
					},
					{
						targets: 1,
						width: 100
					},
					{
						targets: 2,
						width: 150
					},
					{
						targets: 3,
						width: 150
					},
					{
						targets: 4,
						width: 150
					},
				],
			});

		var table = $("#tableListItems")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [{
						targets: 0,
						width: 200
					},
					{
						targets: 1,
						width: 150
					},
					{
						targets: 2,
						width: 150
					},
					{
						targets: 3,
						width: 150
					},
					{
						targets: 4,
						width: 100
					},
					{
						targets: 5,
						width: 150
					},
					{
						targets: 6,
						width: 120
					},
				],
			});
	}

	function initDataTables1() {

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}
		var table = $("#tableItems")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				sorting: false,
                searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [{
						targets: 0,
						width: 200
					},
					{
						targets: 1,
						width: 420
					},
					{
						targets: 2,
						width: 200
					},
					{
						targets: 3,
						width: 200
					},
					{
						targets: 4,
						width: 150
					},
					{
						targets: 5,
						width: 150
					},
					{
						targets: 6,
						width: 150
					},
					

				],
			});
	}
	// ----- END DATATABLES -----

	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			html = ``;
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----
	// ----- MY FORMS CONTENT -----
	function myFormsContent() { // FIRST FETCH DATA
		$("#tableMyFormsParent").html(preloader);
		let receivingReportData = getUnionTableData(`
													SELECT module,ID,referenceCode,purchaseID, fullname, SUM(quantity) AS  quantity, daterequest, inventoryStatus,IFNULL(SUM(RECORD),0) AS stockQuantity
													FROM (
													SELECT 
													'1' AS module, 
													iri.returnItemID as ID,
													'' AS purchaseID, 
													returnItemCode as referenceCode, 
													CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
													ird.receivedQuantity AS quantity,
													DATE_FORMAT(iri.createdAt,'%M% %d%, %Y') AS daterequest,
													returnItemStatus AS inventoryStatus,
													CASE WHEN sii.quantityForStockin IS NOT NULL  THEN IFNULL(SUM(sii.quantityForStockin),0)
													ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD
													FROM ims_return_item_tbl AS iri
													LEFT JOIN ims_inventory_request_details_tbl AS ird ON iri.returnItemID = ird.returnItemID
													LEFT JOIN hris_employee_list_tbl AS empl ON iri.employeeID = empl.employeeID
													LEFT JOIN ims_stock_in_item_tbl AS sii ON iri.returnItemID = sii.returnItemID AND ird.itemid = sii.itemID
													LEFT JOIN ims_stock_in_assets_tbl AS sia ON iri.returnItemID = sia.returnItemID AND ird.itemID = sia.assetID
													WHERE returnItemStatus = 2  GROUP BY iri.returnItemID,sii.returnItemID,sia.returnItemID,ird.itemID,sii.itemID,sia.assetID
													UNION ALL
													SELECT '2' AS module,
													muf.materialUsageID AS ID,
													'' AS purchaseID,
													materialUsageCode as referenceCode,
													CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
													unused AS quantity,
													DATE_FORMAT(muf.createdAt,'%M% %d%, %Y') AS daterequest,
													materialUsageStatus as inventoryStatus,
													CASE WHEN sii.quantityForStockin IS NOT NULL THEN IFNULL(SUM(sii.quantityForStockin),0)
													ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD  
													FROM ims_material_usage_tbl AS muf
													LEFT JOIN ims_inventory_request_details_tbl AS ird ON ird.materialUsageID = muf.materialUsageID
													LEFT JOIN hris_employee_list_tbl AS empl ON muf.employeeID = empl.employeeID
													LEFT JOIN ims_stock_in_item_tbl AS sii ON muf.materialUsageID = sii.materialUsageID AND ird.itemID = sii.itemID
													LEFT JOIN ims_stock_in_assets_tbl AS sia ON muf.materialUsageID = sia.materialUsageID AND ird.itemID = sia.assetID
													WHERE materialUsageStatus = 2 GROUP BY muf.materialUsageID,sii.materialUsageID, sia.materialUsageID,ird.itemID,sii.itemID,sia.assetID
													UNION ALL
													SELECT '3' AS module,
													iir.inventoryReceivingID AS ID,
													purchaseOrderCode AS purchaseID,
													inventoryReceivingCode as referenceCode, 
													CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
													receivedQuantity AS quantity,
													DATE_FORMAT(iir.createdAt,'%M% %d%, %Y') AS daterequest,
													inventoryReceivingStatus as inventoryStatus,
													CASE WHEN sii.quantityForStockin IS NOT NULL  THEN SUM(sii.quantityForStockin)
													ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD    
													FROM ims_inventory_receiving_tbl AS iir
													LEFT JOIN ims_inventory_request_details_tbl AS ird ON iir.inventoryReceivingID = ird.inventoryReceivingID
													LEFT JOIN hris_employee_list_tbl AS empl ON iir.employeeID = empl.employeeID
													LEFT JOIN ims_stock_in_item_tbl AS sii ON iir.inventoryReceivingID = sii.inventoryReceivingID AND ird.itemID = sii.itemID
													LEFT JOIN ims_stock_in_assets_tbl AS sia ON iir.inventoryReceivingID = sia.inventoryReceivingID AND ird.itemID = sia.assetID
													WHERE inventoryReceivingStatus = 2 GROUP BY iir.inventoryReceivingID,sia.inventoryReceivingID,sii.inventoryReceivingID,ird.itemID,sii.itemID,sia.assetID
													)a GROUP BY referenceCode`);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Reference No.</th>
					<th>Purchase Order No.</th>
                    <th>Preparer Name</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>`;
			receivingReportData.map((item) => {
				let {
					ID,
					purchaseID,
					referenceCode,
					fullname,
					quantity,
					daterequest,
					inventoryStatus,
					stockQuantity,
				} = item;
				let btnClass = inventoryStatus != 0 ? "btnView" : "btnEdit";
				let button =`
				<button class="btn btn-view w-100 btnView" id="${encryptString(referenceCode)}"><i class="fas fa-eye"></i> View</button>`;
				html += `
				<tr class="${btnClass}" id="${encryptString(referenceCode)}">
				<td>${referenceCode}</td>
				<td>${purchaseID}</td>
				<td>${fullname}</td>
				<td>${daterequest}</td>
				<td>`;
				if(quantity == stockQuantity) {
					html += `<span class="badge badge-success w-100">Completed</span>`;
				}else{
					html += `<span class="badge badge-outline-warning w-100">Pending</span>`;
				}
				html += `</td>
				</tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			//updateTableItems();
			return html;
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----

	// ----- FORM BUTTONS -----
	function formButtons(data = false) {
		let button = "";
		if (data) {
			let {
					consolidateCode = "",
					dataStatus = "",
					employeeID = "",
					approversID = "",
					approversDate = "",
					createdAt = new Date
			} = data && data[0];
			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (dataStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						inventoryCode="${consolidateCode}"
						code="${consolidateCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel px-5 p-2"
						id="btnCancelForm" 
						inventoryCode="${consolidateCode}"
						code="${consolidateCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (dataStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							inventoryCode="${consolidateCode}"
							code="${consolidateCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (dataStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							inventoryCode="${encryptString(consolidateCode)}"
							code="${consolidateCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							inventoryCode="${encryptString(consolidateCode)}"
							code="${consolidateCode}"><i class="fas fa-ban"></i> 
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
				class="btn btn-cancel px-5 p-2 px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----

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
			headerButton(true);
			myFormsContent();		
			updateURL();			
		} else {
			headerButton(false, "");	
			formContent(data, readOnly);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE

	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);
		storageContent();
		let {	


			consolidateCode,
			employeeID,
			quantity,
			received,
			createAt,
			recordID,
			approversID = "",
			approversDate = "",
			dataStatus	= "",
		} = data && data[0];
		
		var services = '';
		formatquantity = parseFloat(quantity) || 0;
		if(recordID =='0'){
			services = 'Item';
		}else{
			services = 'Asset';
		}
		//alert(formatquantity);
		//var formatquantity = parseFloat(quantity);
		//alert(formatquantity);
		var formatreceivingQuantity = parseFloat(received) || 0;
		//alert( formatquantity +" " +formatreceivingQuantity);
		let statusDisplay = "";
		if (formatquantity == formatreceivingQuantity) {
			statusDisplay = `<span class="badge badge-success w-100">Completed</span>`;
		} else {
			
			statusDisplay = `<span class="badge badge-outline-warning w-100">Pending</span>`;
			
		}


		// ----- GET EMPLOYEE DATA -----
		let {
			fullname: employeeFullname = "",
			department: employeeDepartment = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);
		//alert(fullname);

		$("#btnBack").attr("inventoryCode", consolidateCode);
		$("#btnBack").attr("status", 2);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";

		let button = formButtons(data);

		let html = `
        <div class="row px-2">
			<div class="col-lg-2 col-md-6 col-sm-12 px-1">
				<div class="card">
					<div class="body">
						<small class="text-small text-muted font-weight-bold">Reference No.</small>
						<h6 class="mt-0 text-danger font-weight-bold">
						${consolidateCode ? consolidateCode : "---"}
						</h6>      
					</div>
				</div>
			</div>
			<div class="col-lg-2 col-md-6 col-sm-12 px-1">
				<div class="card">
					<div class="body">
						<small class="text-small text-muted font-weight-bold">Inventory Classification</small>
						<h6 class="mt-0 text-danger font-weight-bold">
						${services ? services : "---"}
						</h6>      
					</div>
				</div>
			</div>
			<div class="col-lg-2 col-md-6 col-sm-12 px-1">
				<div class="card">
					<div class="body">
						<small class="text-small text-muted font-weight-bold">Status</small>
						<h6 class="mt-0 font-weight-bold">${statusDisplay}</h6>      
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-12 col-sm-12 px-1">
				<div class="row m-0">
					<div class="col-lg-5 col-md-4 col-sm-12 px-1">
						<div class="card">
							<div class="body">
								<small class="text-small text-muted font-weight-bold">Date Created</small>
								<h6 class="mt-0 font-weight-bold">${createAt ? moment(createAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-12 px-1">
						<div class="card">
							<div class="body">
								<small class="text-small text-muted font-weight-bold">Preparer Name</small>
								<h6 class="mt-0 font-weight-bold" id="preparedname">${employeeFullname}</h6>      
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-4 col-sm-12 px-1">
						<div class="card">
							<div class="body">
								<small class="text-small text-muted font-weight-bold">Position</small>
								<h6 class="mt-0 font-weight-bold">${employeeDesignation}</h6>      
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
        <div class="" id="form_purchase_request">
            <div class="col-sm-12 px-0">
                <div class="w-100">
                    <table class="table table-bordered table-striped table-hover" id="tableListItems">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Item Classification</th>
                                <th>Request</th>
								<th>Received</th>
                                <th>Remaining</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="">`;

		let ItemData	= getUnionTableData(`
											SELECT id, itemCode,recordCode AS referenceCode, recordID, employeeID, requestName, itemID, itemCode, name_Brand, IFNULL(classification_category,'') AS classification_category, quantity, SUM(remaining) AS remaining, Brand, itemName, classificationName, categoryName,uom
											FROM
											(
											SELECT
												ri.returnItemID as id, 
												ird.Brand,
												ird.itemName,
												ird.classificationName,
												ird.categoryName,
												ri.returnItemCode AS recordCode,
												ird.recordID,
												ri.employeeID,
												CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS requestName,
												itemID,
												itemCode, 
												CONCAT(itemName,' / ',brand) AS name_Brand,
												CONCAT(classificationName,' / ',categoryName) AS classification_category,
												sum(receivedQuantity) AS quantity,
												0 AS remaining,
												uom
											FROM ims_return_item_tbl AS ri
											LEFT JOIN ims_inventory_request_details_tbl AS ird ON ri.returnItemID = ird.returnItemID
											LEFT JOIN hris_employee_list_tbl AS empl ON ri.employeeID = empl.employeeID
											WHERE returnItemCode = '${consolidateCode}'
											GROUP BY itemID
											UNION ALL
											SELECT
												muf.materialUsageID AS id, 
												ird.Brand,
												ird.itemName,
												ird.classificationName,
												ird.categoryName,
												muf.materialUsageCode AS recordCode,
												ird.recordID,
												muf.employeeID,
												CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS requestName,
												itemID,
												itemCode, 
												CONCAT(itemName,' / ',brand) AS name_Brand,
												CONCAT(classificationName,' / ',categoryName) AS classification_category,
												sum(unused) AS quantity,
												0 AS remaining,
												uom
											FROM ims_material_usage_tbl AS muf
											LEFT JOIN ims_inventory_request_details_tbl AS ird ON muf.materialUsageID = ird.materialUsageID
											LEFT JOIN hris_employee_list_tbl AS empl ON muf.employeeID = empl.employeeID
											WHERE materialUsageCode = '${consolidateCode}'
											GROUP BY itemID
											UNION ALL
											SELECT
												inr.inventoryReceivingID AS id, 
												ird.Brand,
												ird.itemName,
												ird.classificationName,
												ird.categoryName,
												inr.inventoryReceivingCode AS recordCode,
												inr.recordID,
												inr.employeeID,
												CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS requestName,
												itemID,
												itemCode, 
												CONCAT(itemName,' / ',brand) AS name_Brand,
												CONCAT(classificationName,' / ',categoryName) AS classification_category,
												sum(receivedQuantity) AS quantity,
												0 AS remaining,
												uom
												FROM ims_inventory_receiving_tbl AS inr
												LEFT JOIN ims_inventory_request_details_tbl AS ird ON inr.inventoryReceivingID = ird.inventoryReceivingID
												LEFT JOIN hris_employee_list_tbl AS empl ON inr.employeeID = empl.employeeID
												WHERE inventoryReceivingCode = '${consolidateCode}'
												GROUP BY itemID
											UNION ALL
												SELECT
												NULL AS id, 
												NULL AS Brand,
												NULL AS itemName,
												NULL AS classificationName,
												NULL AS categoryName,
												inventoryCode AS recordCode,
												NULL AS recordID,
												NULL AS employeeID,
												NULL AS requestName,
												itemID AS itemID,
												NULL AS itemCode, 
												NULL AS name_Brand,
												NULL AS classification_category,
												0 AS quantity,
												sum(quantityForStockin) AS remaining,
												NULL AS uom
											FROM ims_stock_in_item_tbl 
											WHERE inventoryCode = '${consolidateCode}'
											GROUP BY itemID
											UNION ALL
											SELECT
												NULL AS id, 
												NULL AS Brand,
												NULL AS itemName,
												NULL AS classificationName,
												NULL AS categoryName,
												inventoryCode AS recordCode,
												NULL AS recordID,
												NULL AS employeeID,
												NULL AS requestName,
												assetID AS itemID,
												NULL AS itemCode, 
												NULL AS name_Brand,
												NULL AS classification_category,
												0 AS quantity,
												sum(quantityForStockin) AS remaining,
												NULL AS uom
											FROM ims_stock_in_assets_tbl 
											WHERE inventoryCode = '${consolidateCode}'
											GROUP BY itemID
											) a GROUP BY referenceCode,itemID`);	

		ItemData.map((item) => {	
					var totalremaining = (parseFloat(item.quantity)) - (parseFloat(item.remaining));
					//alert(totalremaining);
					var totalQuantity = parseFloat(item.quantity);
					var totalremaining = parseFloat(item.remaining);
					var totalRemainingwithdecimal = totalremaining.toFixed(2);
					//alert(totalRemainingwithdecimal);
					
			html += `<tr>
						<td>${item.itemCode}</td>
						<td>  
							<div>
							${item.itemName}
							</div>
							<small style="color:#848482;">${item.Brand}</small>
						</td>
						<td>
							<div>
							${item.classificationName}
							</div>
							<small style="color:#848482;">${item.categoryName}</small>
						</td>
						<td>${item.requestName}</td>
						<td class="text-center">${item.quantity}</td>
						<td class="text-center">${(parseFloat(item.quantity) - parseFloat(item.remaining)).toFixed(2)}</td>
						<td>`;
						html += `
								<select class="form-control select2 btn-barcode" name="barcode" id="barcode" referenceCode="${item.referenceCode}" itemID="${item.itemID}">
								<option value=""selected disabled>Select Print</option>
								<option value="0">QR Code</option>
								<option value="1">Barcode</option>
								</select>`;
						if(totalQuantity == totalremaining){
							// html += `<span class="badge badge-success w-100">Completed</span>`;
						}else{
							html += `<a class="btn btn-secondary btnRecord btn-sm btn-block mt-1" 
										href="javascript:void(0);" 
										inventoryid="${item.id}"
										referenceCode="${item.referenceCode}"
										itemID="${item.itemID}"
										itemCode="${item.itemCode}"
										itemNameBrand="${item.name_Brand}"
										classificationCategory="${item.classification_category}"
										quantityRequest="${item.quantity}"
										remaining="${parseFloat((item.quantity) - (item.remaining)).toFixed(2)}"
										UOM="${item.uom}">
										<i class="fas fa-pencil-alt"></i>Record
									</a>`; 
						}
						html += `</td>


						
					</tr>`;	

		})
		html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			//initDataTables();
			storageContent();
			// updateTableItems();
			datevalidated();
			initQuantity();
			// expirationdatevalue();
			initAll();
			return html;
		}, 300);


	}
	$(document).on("click", ".btnRecord", function () {
		var id = $(this).attr("inventoryid");
		var referenceCode = $(this).attr("referenceCode");
		var itemID = $(this).attr("itemID");
		var itemCode = $(this).attr("itemCode");
		var itemNameBrand = $(this).attr("itemNameBrand");
		var classificationCategory = $(this).attr("classificationCategory");
		var quantity = $(this).attr("quantityRequest");
		var remaining = $(this).attr("remaining");
		var uom =$(this).attr("UOM");

		$("#modal_product_record").modal("show");
		// Display preloader while waiting for the completion of getting the data
		$("#modal_product_record_content").html(preloader);
		
		const tableData = getUnionTableData(`
											SELECT moduleReturnItemID, moduleMaterialUsageID,moduleInventoryReceivingID,recordID, itemID, IFNULL(serialNumber,'') AS serialNumber, itemName, Brand, classificationName, categoryName   FROM
											(
												SELECT 
													iri.returnItemID AS moduleReturnItemID,
													'' AS moduleMaterialUsageID,
													'' AS moduleInventoryReceivingID,
													iri.recordID,
													ird.itemID,
													serialNumber,
													itemName,
													Brand,
													classificationName,
													categoryName
												FROM ims_return_item_tbl AS iri
												LEFT JOIN ims_inventory_request_details_tbl	AS ird ON iri.returnItemID = ird.returnItemID AND ird.itemID =${itemID}
												LEFT JOIN  ims_inventory_request_serial_tbl AS irs ON iri.returnItemID = irs.returnItemID AND irs.itemID =${itemID}
												WHERE returnItemCode ='${referenceCode}' AND ird.itemID =${itemID}
												GROUP BY inventoryRequestSerialID
												UNION ALL
												SELECT 
													'' AS moduleReturnItemID,
													muf.materialUsageID AS moduleMaterialUsageID,
													'' AS moduleInventoryReceivingID,
													muf.recordID,
													ird.itemID,
													serialNumber,
													itemName,
													Brand,
													classificationName,
													categoryName
												FROM ims_material_usage_tbl AS muf
												LEFT JOIN ims_inventory_request_details_tbl	AS ird ON muf.materialUsageID = ird.materialUsageID AND ird.itemID =${itemID}
												LEFT JOIN  ims_inventory_request_serial_tbl AS irs ON muf.materialUsageID = irs.materialUsageID AND irs.itemID =${itemID}
												WHERE materialUsageCode ='${referenceCode}' AND ird.itemID =${itemID}
												GROUP BY inventoryRequestSerialID
												UNION ALL
												SELECT 
												'' AS moduleReturnItemID,
												'' AS moduleMaterialUsageID,
												inr.inventoryReceivingID AS moduleInventoryReceivingID,
												inr.recordID,
												ird.itemID,
												serialNumber,
												itemName,
												Brand,
												classificationName,
												categoryName
												FROM ims_inventory_receiving_tbl AS inr
												LEFT JOIN ims_inventory_request_details_tbl	AS ird ON inr.inventoryReceivingID = ird.inventoryReceivingID AND ird.itemID =${itemID}
												LEFT JOIN  ims_inventory_request_serial_tbl AS irs ON inr.inventoryReceivingID = irs.inventoryReceivingID AND irs.itemID =${itemID}
												WHERE inventoryReceivingCode ='${referenceCode}' AND ird.itemID =${itemID}
												GROUP BY inventoryRequestSerialID
											)a WHERE itemID IS NOT NULL`);
			if (tableData) {
				
				const content = modalContent(tableData);
				setTimeout(() => {
					$("#modal_product_record_content").html(content);
					$("#itemCode").val(itemCode);
					$("#itemCode").attr("inventoryCode", referenceCode);
					$("#itemName").val(itemNameBrand);
					$("#itemClassification").val(classificationCategory);
					$("#quantity").val(quantity);
					$("#remaining").val(remaining);
					$("#uom").val(uom);
					initAll();
					initQuantity();
					storageContent();
					datevalidated();

				//initDataTables();
					initDataTables1();
					
				}, 500);	
				
			}	

		// const tableData = getTableData(
		// 	`ims_receiving_serial_number_tbl 				AS irsn
		// 	LEFT JOIN ims_inventory_receiving_details_tbl 	AS iird ON irsn.inventoryReceivingID =iird.inventoryReceivingID
		// 	LEFT JOIN ims_request_items_tbl 				AS iri ON iird.requestItemID=iri.requestItemID 
		// 	LEFT JOIN ims_inventory_item_tbl 				AS iii ON irsn.itemID = iii.itemID`,
		// 	`irsn.inventoryReceivingID,IFNULL(irsn.serialNumber,'') AS serialNumber,irsn.itemID,iri.itemName,iird.received AS quantity
		// 	,concat('ITM-',LEFT(iii.createdAt,2),'-',LPAD(iii.itemID,5,'0')) AS itemCode,iri.itemDescription,IFNULL(iri.brandNAme,'') AS brandName`, `irsn.inventoryReceivingID=${inventoryReceivingID} AND irsn.itemID =${itemID}`,
		// 	``, `irsn.serialnumberID,irsn.inventoryReceivingID`);
		// if (tableData) {
		// 	const content = modalContent(tableData);
		// 	setTimeout(() => {
		// 		$("#modal_product_record_content").html(content);
		// 		$("#received").val(orderquantity);
		// 		$("#receivedQuantitytotal").val(receivingquantity);
		// 		$("#brandName").val(brandName);
		// 		$("#remainingQuantity").val(totalreceiving);
		// 		initAll();
		// 		initQuantity();
		// 		storageContent();
		// 		datevalidated();

		// 		//initDataTables();
		// 		initDataTables1();

		// 		//getItemRow();

		// 	}, 500);

		// }
	});

	// ----- STORAGE CONTENT -----
	function storageContent(param = false) {

		// getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 

		const data = getTableData("ims_inventory_storage_tbl",
			`inventoryStorageID, inventoryStorageOfficeName, inventoryStorageCode,
			CASE 
			WHEN inventoryStorageRoom IS  NULL THEN 'R0'
			ELSE CONCAT('R',inventoryStorageRoom) END inventoryStorageRoomFormat,
			CASE 
			WHEN inventoryStorageFloor IS  NULL THEN 'F0'
			ELSE CONCAT('F',inventoryStorageFloor) END inventoryStorageFloorFormat,
			CASE 
			WHEN inventoryStorageBay IS  NULL THEN 'B0'
			ELSE CONCAT('B',inventoryStorageBay) END inventoryStorageBayFormat,
			CASE 
			WHEN inventoryStorageLevel IS  NULL THEN 'L0'
			ELSE CONCAT('L',inventoryStorageLevel) END inventoryStorageLevelFormat,
			CASE 
			WHEN inventoryStorageShelves IS  NULL THEN 'S0'
			ELSE CONCAT('S',inventoryStorageShelves) END inventoryStorageShelvesFormat`, "inventoryStorageStatus=1", "");

		let html = ` <option value="" disabled selected ${!param && "selected"}>Select Storage Name</option>`;
		data.map((item, index, array) => {
			html += `<option 
			inventoryStorageCode="${item.inventoryStorageCode}"
			inventoryStorageOfficeName="${item.inventoryStorageOfficeName}"
			inventoryStorageRoom="${item.inventoryStorageRoomFormat}"
			inventoryStorageFloor="${item.inventoryStorageFloorFormat}"
			inventoryStorageBay="${item.inventoryStorageBayFormat}"
			inventoryStorageLevel="${item.inventoryStorageLevelFormat}"
			inventoryStorageShelves="${item.inventoryStorageShelvesFormat}"
			value="${item.inventoryStorageID}" ${param && item.inventoryStorageID == param[0].inventoryStorageID && "selected"}>${item.inventoryStorageOfficeName}</option>`;
		})
		//$("#inventorydetail").val(inventoryStorageRoom+inventoryStorageFloor);
		$(".inventoryStorageID").html(html);

	}

	// ----- MODAL CONTENT -----
	function modalContent(data = true, readOnly = false) {
		console.log(data);
		initQuantity();
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		let {
			moduleReturnItemID 			= "",
			moduleMaterialUsageID		="",
			moduleInventoryReceivingID	="",
			recordID					= "",
			itemID						= "",
			serialNumber				= "",
			itemName					= "",
			Brand						= "",
			classificationName			= "",
			categoryName				= ""
		} = data && data[0];

		let button = `<button 
		 				class="btn btn-save px-5 p-2" 
		 				id="btnSave"><i class="fas fa-save"></i>
		 				Save
		 				</button>`;
		
		readOnly ? preventRefresh(false) : preventRefresh(true);
		let disabled = readOnly ? "disabled" : "";
		let checkboxProjectHeader = !disabled ? `
			<th class="text-center">
				<div class="action">
					<input type="checkbox" class="checkboxall" project="true">
				</div>
			</th>` : ``;
		let html = `
				<div class="modal-body">
					<div class="row">
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Item Code</label>
								<input 
									type="text" 
									class="form-control" 
									name="itemCode" 
									id="itemCode"
									value=""
									disabled>
									<input 
									type="hidden" 
									class="form-control" 
									name="itemID" 
									id="itemID"
									value=""
									disabled>
									<input 
									type="hidden" 
									class="form-control" 
									name="inventoryReceivingID" 
									id="inventoryReceivingID"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_itemCode"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Item Name</label>
								<input 
									type="text" 
									class="form-control" 
									name="invalid-input_itemName" 
									id="itemName"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_itemName"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Item Classification</label>
								<input 
									type="text" 
									class="form-control " 
									name="itemClassification" 
									id="itemClassification"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_itemClassification"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Quantity</label>
								<input 
									type="text" 
									class="form-control text-center" 
									name="quantity" 
									id="quantity"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_quantity"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Remaining</label>
								<input 
									type="text" 
									class="form-control text-center" 
									name="remaining" 
									id="remaining"
									value=""
									autocomplete="off"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_remaining"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>UOM</label>
								<input 
									type="text" 
									class="form-control validate" 
									name="uom" 
									id="uom"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-uom"></div>
							</div>
						</div>
					   
						<div class="col-sm-12 px-0">
							<div class="container-fluid">
								<table class="table table-bordered table-striped table-hover" id="tableItems">
									<thead>
										<tr style="white-space: nowrap"> 
											<th>Received Quantity</th>   
											<th>Barcode</th>
											<th>Serial No.</th>
											<th>Storage Name <code>*</code></th>
											<th>Storage Details</th>
											<th>Manufactured Date</th>
											<th>Expiration Date</th>
										</tr>
									</thead>
									
									<tbody class="tableRowItems">`;
					data.map((item, index) => {
									html +=`<tr>`;
								if(item.serialNumber==""){
									html +=`
										<td>
											<input type="text"
													class="form-control quantity text-center recievedQuantity1 input-quantity"
													id="quantity${index}"
													name="quantity"
													min="0.01"
													data-allowcharacters="[0-9]" 
													max="999999999" 
													minlength="1" 
													maxlength="20" 
													autocomplete="off">
											<div class="invalid-feedback d-block" id="invalid-input_recievedQuantity"></div>
										</td>`;
								}else{
								var quantityReceived = 1;
									html +=`
										<td>
											<input type="text"
													class="form-control quantity text-center input-quantity"
													id="quantity${index}"
													name="quantity"
													value="${quantityReceived}"
													min="0.01"
													data-allowcharacters="[0-9]" 
													max="999999999" 
													minlength="1" 
													maxlength="20" 
													autocomplete="off"
													disabled>
										</td>`;
								}
									html +=`
								
										<td>
											<input 
												type="text"
												class="form-control barcode" recordID="${item.recordID}"
												ReturnItemID="${moduleReturnItemID}"
												MaterialUsageID="${moduleMaterialUsageID}"
												InventoryReceivingID="${moduleInventoryReceivingID}"
												number="${index}"
												name="barcode"
												itemName="${itemName}"
												brand="${Brand}"
												classificationName="${classificationName}"
												categoryName="${categoryName}"
												recordID="${recordID}"
												id="barcode${index}"
												disabled>
										</td>
										<td>
											<input type="text"
													class="form-control serialnumber"
													id="serialnumber${index}"
													name="serialnumber"
													itemid="${item.itemID}"
													value="${item.serialNumber}"
													disabled>	
										</td>
										<td>
											<select style="width:100%;"
											class="form-control select2 validate inventoryStorageID"
											number="${index}"
											name="inventoryStorageID"
											id="inventoryStorageID${index}" 
											required
											recordID="${recordID}">
											</select>
											<div class="invalid-feedback d-block" id="invalid-input_inventoryStorageID"></div>
										</td>	
										<td>
											<input type="text"
											class="form-control inventorydetail"
											id="inventorydetail${index}"
											name="inventorydetail"
											disabled>
										</td>
										<td>
											<input 
											type="date" 
											class="form-control manufactureDate" 
											number="${index}"
											name="manufactureDate" 
											id="manufactureDate${index}">
										</td>
								<td>
								<input 
										type="date" 
										class="form-control expirationdate  validate expirationdateoncheck" 
										number="${index}"
										max="2040-04-30"
										name="expirationdate"
										value="${today}"
										id="expirationdate${index}">
								</td>
								</tr>`;
					});
						html += `
									</tbody>
								</table>
							</div>
						</div>
						
					</div>
				</div>
				
				<div class="modal-footer">
					${button}
					<button class="btn btn-cancel px-5 p-2 btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
					
				</div>`;
		return html;

	}
		// $(document).on("change", ".manufactureDate", function() {
		// 	const val = $(this).val();
		// 	const number = $(this).attr("number");
		// 	const todaydate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
		// 	var dateString = moment(todaydate).format('YYYY-MM-DD');
		// 	const inventoryStorageID = $(`#inventoryStorageID${number}`).val();
		// 	var inventoryStorageRoom 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageRoom");
		// 	var inventoryStorageFloor 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageFloor");
		// 	var inventoryStorageBay 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageBay");
		// 	var inventoryStorageLevel 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageLevel");
		// 	var inventoryStorageShelves 	= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageShelves");
		// 	var inventoryStorageCode 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageCode");
		// 	var consolidatevalue = 'W'+val+inventoryStorageRoom+inventoryStorageFloor+inventoryStorageBay+inventoryStorageLevel+inventoryStorageShelves;
		// 	var warehouse = '';
		// 	var storageCode = '';
		// 	if(inventoryStorageID =="" || inventoryStorageID === null){
		// 		warehouse ='0000000000';
		// 	}else{
		// 		warehouse = consolidatevalue;	
		// 	}
		// 	// start date today split //
		// 	const todaydateSplit = dateString.split("-");
		// 	const todaymyYear = todaydateSplit[0].substring(2);
		// 	const todaymyMonth = todaydateSplit[1].length < 2 ? "0"+todaydateSplit[1] : todaydateSplit[1];
		// 	const todaymyDate = todaydateSplit[2].length < 2 ? "0"+todaydateSplit[2] : todaydateSplit[2];
		// 	const mytodayDate = `${todaymyMonth}${todaymyDate}${todaymyYear}`;
		// 	// END DATE TODAY SPLIT //

		// 	// START EXPIRATION DATE //	
		// 	const expirationdate = $(`#expirationdate${number}`).val();
		// 	const dateSplit = expirationdate.split("-");
		// 	const myxYear = dateSplit[0].substring(2);
		// 	const myxMonth = dateSplit[1].length < 2 ? "0"+dateSplit[1] : dateSplit[1];
		// 	const myxDate = dateSplit[2].length < 2 ? "0"+dateSplit[2] : dateSplit[2];
		// 	const myExpDate = `${myxMonth}${myxDate}${myxYear}`;
		// 	// END EXPIRATION DATE//
		// 	// START FOR MANUFACTURE DATE //
		// 	const mdateSplit = val.split("-");
		// 	const mmyYear = mdateSplit[0].substring(2);
		// 	const mmyMonth = mdateSplit[1].length < 2 ? "0"+mdateSplit[1] : mdateSplit[1];
		// 	const mmyDate = mdateSplit[2].length < 2 ? "0"+mdateSplit[2] : mdateSplit[2];
		// 	const myManufactureDate = `${mmyMonth}${mmyDate}${mmyYear}`;
		// 	// END OF MANUFACTURE DATE //

		// 	const itemcodeSplit = $("#itemCode").val().split("-");
		// 	const myItemcode = itemcodeSplit[3];
		// 	var getlastthreedigititemcode = myItemcode.slice(-5);
		// 	const barcode = `${warehouse}-${myManufactureDate}-${myExpDate}-${mytodayDate}-${getlastthreedigititemcode}`;
		// 	$("#barcode" + number).val(barcode);
		// });	
		
		$(document).on("change", ".expirationdate", function() {
			const val = $(this).val();
			const number = $(this).attr("number");
			const todaydate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
			var dateString = moment(todaydate).format('YYYY-MM-DD');
			const inventoryStorageID = $(`#inventoryStorageID${number}`).val();
			var inventoryStorageRoom 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageRoom");
			var inventoryStorageFloor 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageFloor");
			var inventoryStorageBay 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageBay");
			var inventoryStorageLevel 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageLevel");
			var inventoryStorageShelves 	= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageShelves");
			var inventoryStorageCode 		= $('option:selected', `#inventoryStorageID${number}`).attr("inventoryStorageCode");
			var consolidatevalue = 'W'+inventoryStorageID+inventoryStorageRoom+inventoryStorageFloor+inventoryStorageBay+inventoryStorageLevel+inventoryStorageShelves;
			var warehouse = '';
			var storageCode = '';
			if(inventoryStorageID =="" || inventoryStorageID === null){
				warehouse ='0000000000';
				
			}else{
				warehouse = consolidatevalue;	
				
				
			}
			// start date today split //
			const todaydateSplit = dateString.split("-");
			const todaymyYear = todaydateSplit[0].substring(2);
			const todaymyMonth = todaydateSplit[1].length < 2 ? "0"+todaydateSplit[1] : todaydateSplit[1];
			const todaymyDate = todaydateSplit[2].length < 2 ? "0"+todaydateSplit[2] : todaydateSplit[2];
			const mytodayDate = `${todaymyMonth}${todaymyDate}${todaymyYear}`;
			// END DATE TODAY SPLIT //

			// START MANUFACTURE DATE SPLIT //
			// const manufactureDate = $(`#manufactureDate${number}`).val();
			// const mdatedateSplit = manufactureDate.split("-");
			// const mmyYear = mdatedateSplit[0].substring(2);
			// const mmyMonth = mdatedateSplit[1].length < 2 ? "0"+mdatedateSplit[1] : mdatedateSplit[1];
			// const mmyDate = mdatedateSplit[2].length < 2 ? "0"+mdatedateSplit[2] : mdatedateSplit[2];
			// const mmyMDate = `${mmyMonth}${mmyDate}${mmyYear}`;
		// END OF MANUFACTURE DATE SPLIT //

			// start date expiration date split //
			const dateSplit = val.split("-");
			const myYear = dateSplit[0].substring(2);
			const myMonth = dateSplit[1].length < 2 ? "0"+dateSplit[1] : dateSplit[1];
			const myDate = dateSplit[2].length < 2 ? "0"+dateSplit[2] : dateSplit[2];
			const myExpDate = `${myMonth}${myDate}${myYear}`;
			// END DATE TODAY SPLIT //

			const itemcodeSplit = $("#itemCode").val().split("-");
			const myItemcode = itemcodeSplit[3];
			var getlastthreedigititemcode = myItemcode.slice(-5);
			
		//const barcode = `${warehouse}-${myExpDate}-${getlastthreedigititemcode}`;
		const barcode = `${warehouse}-${myExpDate}-${getlastthreedigititemcode}-${mytodayDate}`;
		$("#barcode" + number).val(barcode);
	  });
	
	$(document).on("change", ".recievedQuantity1", function () {
		const val = $(this).val();
		var totalval = parseInt(val);
		const orderQuantity = $("#quantity").val();
		const receivedQuantity = $("#remaining").val();
		const serialnumber = $(".serialnumber").val();
		var formatvaluereceived = receivedQuantity ? receivedQuantity : 0;
		// const received = $("#received").val();
		// const receivedtotal = parseInt(received)
		var totalOrderQuantity = parseInt(totalval);
		var totalreceived = parseInt(formatvaluereceived);
		var totalquantity = parseInt(val) + parseInt(formatvaluereceived);
		
		if (serialnumber == "") {
			if (totalreceived < totalOrderQuantity) {
				$(this).removeClass("is-valid").addClass("is-invalid");
				$("#invalid-input_recievedQuantity").html("Incorrect quantity inserted");
				document.getElementById("btnSave").disabled = true;
			} else {
				$(this).removeClass("is-invalid").addClass("is-valid");
				$("#invalid-input_recievedQuantity").html("");
				document.getElementById("btnSave").disabled = false;
			}
		} else {}
	});
	
	$(document).on("change", ".inventoryStorageID", function () {
		const number = $(this).attr("number");
		const recordID = $(this).attr("recordID");
		if(recordID =="0"){
			const val = $(this).val();
		const todaydate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
		var dateString = moment(todaydate).format('YYYY-MM-DD');
		//let formatted_date = todaydate.getFullYear() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getDate();
		var inventoryStorageRoom 		= $('option:selected', this).attr("inventoryStorageRoom");
		var inventoryStorageFloor 		= $('option:selected', this).attr("inventoryStorageFloor");
		var inventoryStorageBay 		= $('option:selected', this).attr("inventoryStorageBay");
		var inventoryStorageLevel 		= $('option:selected', this).attr("inventoryStorageLevel");
		var inventoryStorageShelves 	= $('option:selected', this).attr("inventoryStorageShelves");
		var inventoryStorageCode 		= $('option:selected', this).attr("inventoryStorageCode");
		var consolidatevalue = 'W'+val+inventoryStorageRoom+inventoryStorageFloor+inventoryStorageBay+inventoryStorageLevel+inventoryStorageShelves;
		$(`#inventorydetail${number}`).val(consolidatevalue);
		var storageID = $(this).val();
		// START TODAY DATE SPLIT //
		const todaySplit = dateString.split("-");
		const todaymyYear = todaySplit[0].substring(2);
		const todaymyMonth = todaySplit[1].length < 2 ? "0"+todaySplit[1] : todaySplit[1];
		const todaymyDate = todaySplit[2].length < 2 ? "0"+todaySplit[2] : todaySplit[2];
		const todaymyMDate = `${todaymyMonth}${todaymyDate}${todaymyYear}`;
		// END TODAY DATE SPLIT //

		// START MANUFACTURE DATE SPLIT //
		// const manufactureDate = $(`#manufactureDate${number}`).val();
		// const mdatedateSplit = manufactureDate.split("-");
		// const mmyYear = mdatedateSplit[0].substring(2);
		// const mmyMonth = mdatedateSplit[1].length < 2 ? "0"+mdatedateSplit[1] : mdatedateSplit[1];
		// const mmyDate = mdatedateSplit[2].length < 2 ? "0"+mdatedateSplit[2] : mdatedateSplit[2];
		// const mmyMDate = `${mmyMonth}${mmyDate}${mmyYear}`;
		// END OF MANUFACTURE DATE SPLIT //
		// START EXPIRATION DATE SPLIT //
		// const expirationdate = $(`#expirationdate${number}`).val();
		// const dateSplit = expirationdate.split("-");
		// const myYear = dateSplit[0].substring(2);
		// const myMonth = dateSplit[1].length < 2 ? "0"+dateSplit[1] : dateSplit[1];
		// const myDate = dateSplit[2].length < 2 ? "0"+dateSplit[2] : dateSplit[2];
		// const myExpDate = `${myMonth}${myDate}${myYear}`;
		// END EXPIRATION DATE SPLIT //
		var inventoryStorageID = "";
		// const data = getTableData("ims_inventory_storage_tbl",
		// 	"inventoryStorageID  ,inventoryStorageOfficeName,inventoryStorageCode", `inventoryStorageStatus=1 AND inventoryStorageID =${storageID}`, "");
		// data.map((item) => {
		// 	inventoryStorageCode = item.inventoryStorageCode;
		// }); 
		const itemcodeSplit = $("#itemCode").val().split("-");
		const myItemcode = itemcodeSplit[3];
		var getlastthreedigititemcode = myItemcode.slice(-5);
		// const inventoryStorageCodeSplit = inventoryStorageCode.split("-");
		// const myInventorycode = inventoryStorageCodeSplit[2];
		// var getlastthreedigitinventorycode = myInventorycode.slice(-3);
		
		//const barcode = `${myItemcode}-${myInventorycode}-${serialnumberlastFive}`;
		const barcode = `${consolidatevalue}-${getlastthreedigititemcode}`;
		$("#barcode" + number).val(barcode);
		//$(".inventorystorageIDquantity"+storageID);
		}else{
			const val = $(this).val();
		const todaydate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
		var dateString = moment(todaydate).format('YYYY-MM-DD');
		//let formatted_date = todaydate.getFullYear() + "-" + (todaydate.getMonth() + 1) + "-" + todaydate.getDate();
		var inventoryStorageRoom 		= $('option:selected', this).attr("inventoryStorageRoom");
		var inventoryStorageFloor 		= $('option:selected', this).attr("inventoryStorageFloor");
		var inventoryStorageBay 		= $('option:selected', this).attr("inventoryStorageBay");
		var inventoryStorageLevel 		= $('option:selected', this).attr("inventoryStorageLevel");
		var inventoryStorageShelves 	= $('option:selected', this).attr("inventoryStorageShelves");
		var inventoryStorageCode 		= $('option:selected', this).attr("inventoryStorageCode");
		var consolidatevalue = 'W'+val+inventoryStorageRoom+inventoryStorageFloor+inventoryStorageBay+inventoryStorageLevel+inventoryStorageShelves;
		$(`#inventorydetail${number}`).val(consolidatevalue);
		var storageID = $(this).val();
		// START TODAY DATE SPLIT //
		const todaySplit = dateString.split("-");
		const todaymyYear = todaySplit[0].substring(2);
		const todaymyMonth = todaySplit[1].length < 2 ? "0"+todaySplit[1] : todaySplit[1];
		const todaymyDate = todaySplit[2].length < 2 ? "0"+todaySplit[2] : todaySplit[2];
		const todaymyMDate = `${todaymyMonth}${todaymyDate}${todaymyYear}`;
		// END TODAY DATE SPLIT //

		// START MANUFACTURE DATE SPLIT //
		// const manufactureDate = $(`#manufactureDate${number}`).val();
		// const mdatedateSplit = manufactureDate.split("-");
		// const mmyYear = mdatedateSplit[0].substring(2);
		// const mmyMonth = mdatedateSplit[1].length < 2 ? "0"+mdatedateSplit[1] : mdatedateSplit[1];
		// const mmyDate = mdatedateSplit[2].length < 2 ? "0"+mdatedateSplit[2] : mdatedateSplit[2];
		// const mmyMDate = `${mmyMonth}${mmyDate}${mmyYear}`;
		// END OF MANUFACTURE DATE SPLIT //
		// START EXPIRATION DATE SPLIT //
		const expirationdate = $(`#expirationdate${number}`).val();
		const dateSplit = expirationdate.split("-");
		const myYear = dateSplit[0].substring(2);
		const myMonth = dateSplit[1].length < 2 ? "0"+dateSplit[1] : dateSplit[1];
		const myDate = dateSplit[2].length < 2 ? "0"+dateSplit[2] : dateSplit[2];
		const myExpDate = `${myMonth}${myDate}${myYear}`;
		// END EXPIRATION DATE SPLIT //
		var inventoryStorageID = "";
		// const data = getTableData("ims_inventory_storage_tbl",
		// 	"inventoryStorageID  ,inventoryStorageOfficeName,inventoryStorageCode", `inventoryStorageStatus=1 AND inventoryStorageID =${storageID}`, "");
		// data.map((item) => {
		// 	inventoryStorageCode = item.inventoryStorageCode;
		// }); 
		const itemcodeSplit = $("#itemCode").val().split("-");
		const myItemcode = itemcodeSplit[3];
		var getlastthreedigititemcode = myItemcode.slice(-5);
		// const inventoryStorageCodeSplit = inventoryStorageCode.split("-");
		// const myInventorycode = inventoryStorageCodeSplit[2];
		// var getlastthreedigitinventorycode = myInventorycode.slice(-3);
		
		//const barcode = `${myItemcode}-${myInventorycode}-${serialnumberlastFive}`;
		const barcode = `${consolidatevalue}-${myExpDate}-${todaymyMDate}-${getlastthreedigititemcode}`;
		$("#barcode" + number).val(barcode);
		//$(".inventorystorageIDquantity"+storageID);
		}
		

	});
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_product_record");
		if (validate) {
			var itemCode = $("#itemCode").val();
			var inventoryCode = $("#itemCode").attr("inventoryCode");
			var itemID = [];
			var itemName = [];
			var brand = [];
			var classificationName = [];
			var categoryName = [];
			var barcode = [];
			var recievedQuantity = [];
			var serialnumber = [];
			var inventoryStorageID = [];
			var inventoryStorageCode =[];
			var inventoryStorageOfficeName = [];
			const manufactureDate = [];
			var expirationdate = [];
			var ReturnItemID = [];
			var MaterialUsageID = [];
			var InventoryReceivingID = [];
			var quantity = [];
			//var ForStockin = [];
			//var itemCode = $("#itemCode").val();
			var recordID = $(".barcode").attr("recordID");
			//alert(recordID);
			
			var uom		=  $("#uom").val();
			// $("[name=barcode]").each(function () {
			// 	recordID.push($(this).attr("recordID"));
			// });
			$(".barcode").each(function () {	
				barcode.push($(this).val());
			});
			$(".serialnumber").each(function () {
				itemID.push($(this).attr("itemid"));
			});
			$(".barcode").each(function () {
				itemName.push($(this).attr("itemName"));
			});
			$(".barcode").each(function () {
				brand.push($(this).attr("brand"));
			});
			$(".barcode").each(function () {
				classificationName.push($(this).attr("classificationName"));
			});
			$(".barcode").each(function () {
				categoryName.push($(this).attr("categoryName"));
			});
			$(".barcode").each(function () {
				ReturnItemID.push($(this).attr("ReturnItemID"));
			});
			$(".barcode").each(function () {
				MaterialUsageID.push($(this).attr("MaterialUsageID"));
			});
			$(".barcode").each(function () {
				InventoryReceivingID.push($(this).attr("InventoryReceivingID"));
			});
			$(".serialnumber").each(function () {
				serialnumber.push($(this).val());
			});
			// $("[name=serialnumber]").each(function () {
			// 	serialnumber.push($(this).val());
			// });

			$(".quantity").each(function () {
				quantity.push($(this).val());
			});
			// $(".quantity").each(function () {
			// 	ForStockin.push($(this).val());
			// });
			//console.log(ForStockin);
			$(".inventoryStorageID").each(function () {
				inventoryStorageID.push($(this).val());
			});
			
			
			$(".inventoryStorageID").each(function () {
				inventoryStorageOfficeName.push($('option:selected', this).attr("inventoryStorageOfficeName"));
			});
			$(".inventoryStorageID").each(function () {
				inventoryStorageCode.push($('option:selected', this).attr("inventoryStorageCode"));
			});
			// $(".manufactureDate").each(function () {
			// 	manufactureDate.push($(this).val());
			// 	alert(manufactureDate);
			// 	//manufactureDate = moment(manufactureDate1).format("YYYY-MM-DD HH:mm:ss");
			// });
			$(".manufactureDate").each(function () {
				manufactureDate.push($(this).val());
				//manufactureDate = moment(manufactureDate1).format("YYYY-MM-DD HH:mm:ss");
			});
			$(".expirationdate").each(function () {
				expirationdate.push($(this).val());
				//manufactureDate = moment(manufactureDate1).format("YYYY-MM-DD HH:mm:ss");
			});
		
			// $(".expirationdate").each(function () {
			// 	expirationdate.push(moment($(this).val()).format("YYYY-MM-DD"));
			// });
			//alert(expirationdate);
			Swal.fire({
				title: 'ADD INVENTORY STOCK IN',
				text: 'Are you sure that you want to add a new inventory stock in to the system?',
				imageUrl: `${base_url}assets/modal/add.svg`,
				imageWidth: 200,
				imageHeight: 200,
				imageAlt: 'Custom image',
				showCancelButton: true,
				confirmButtonColor: '#dc3545',
				cancelButtonColor: '#1a1a1a',
				cancelButtonText: 'No',
				confirmButtonText: 'Yes',
				allowOutsideClick: false
			}).then((result) => {

				if (result.isConfirmed) {
					preventRefresh(false);
					//let swalTitle = success_title.toUpperCase();
					$.ajax({
						url: `${base_url}ims/inventory_stock_in/insertbarcode`,
						method: "POST",
						data: {
							itemID: 				itemID, 				itemName: 					itemName, 					brand: 					brand,
							classificationName: 	classificationName,		categoryName: 				categoryName, 				barcode: 				barcode,
							recievedQuantity:		recievedQuantity, 		serialnumber:				serialnumber, 				inventoryStorageID: 	inventoryStorageID,
							inventoryStorageCode: 	inventoryStorageCode,	inventoryStorageOfficeName: inventoryStorageOfficeName, manufactureDate:		manufactureDate,
							expirationdate:			expirationdate, 		MaterialUsageID:			MaterialUsageID,			InventoryReceivingID: 	InventoryReceivingID,
							ReturnItemID:			ReturnItemID,			recordID:					recordID,					quantity: 				quantity,
							inventoryCode:			inventoryCode,			itemCode:					itemCode,					uom:					uom,
							// ForStockin:				ForStockin,
						},
						async: true,
						dataType: "json",
						beforeSend: function () {
							$("#loader").show();
						},
						success: function (data) {
							$("#loader").hide();
							$("#modal_product_record").hide();
							setTimeout(() => {
								let swalTitle = "Inventory stock in successfully saved!";
								Swal.fire({
									icon: "success",
									title: swalTitle,
									showConfirmButton: false,
									timer: 2000,
								}).then(() => {
									$("#loader").show();
									window.location.reload();
								})
								// 	setTimeout(() => {
								// }, 1000)

								// window.location.replace(`${base_url}ims/inventory_recieving_report`);
							}, 100);

						},
					});
				} else {
					preventRefresh(false);
					// containerID && $("#" + containerID).show();
					// $("#" + modalID).modal("show");
				}
			});
			//alert(recievedQuantity);

		}
	});

	$(document).on("change", ".btn-barcode", function () {
		var referenceCode = $(this).attr("referenceCode");
		var itemID = $(this).attr("itemID");
		var recordID = $(this).val();

	
		// console.log(data);
		$.ajax({
			url: `${base_url}ims/inventory_stock_in/printStockInBarcode`,
			method: "POST",
			data: {
				referenceCode: referenceCode,
				itemID: 	  itemID,
				recordID:	  recordID,

			},
			success: function (data) {
				var left = ($(window).width() / 2) - (900 / 2),
					top = ($(window).height() / 2) - (600 / 2),
					mywindow = window.open("", "PRINT", "width=900, height=600, top=" + top + ", left=" + left);

				mywindow.document.write(data);

				mywindow.document.close();
				mywindow.focus();
			}
		})

	});

	function datevalidated() {
		var dtToday = new Date();
		// var number  = $(this).attr(number);
		// alert(number);

		var month = dtToday.getMonth() + 1;
		var day = dtToday.getDate();
		var expirationDay = day;
		var year = dtToday.getFullYear();

		if (month < 10)
			month = '0' + month.toString();
		if (day < 10)
			day = '0' + day.toString();
		if (expirationDay < 10)
			expirationDay = '0' + expirationDay.toString();

		var today = year + '-' + month + '-' + day;
		//var expirationDate = year + '-' + month + '-' + expirationDay;

		$(".manufactureDate").each(function () {
			const id = $(this).attr("id");
			$(`#${id}`).attr('max', today);
			$(`#${id}`).val(today);
		
		});

		$(".expirationdate").each(function () {
			const id = $(this).attr("id");
			$(`#${id}`).attr('min', today);
			$(`#${id}`).val(today);
			
		});
	}	
		

	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		// const id = $(this).attr("inventoryReceivingID");
		// const employeeID = $(this).attr("employeeID");
		// const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
		const status = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}
		}

	});
	// ----- END CLOSE FORM -----


});
