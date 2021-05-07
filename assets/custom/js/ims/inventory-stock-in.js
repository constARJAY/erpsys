$(document).ready(function () {

    // ----- MODULE APPROVER -----
	//const moduleApprover = getModuleApprover("inventory stock in");
	// ----- END MODULE APPROVER ----

	// ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
			let {
				employeeID,
				fullname,
				designation,
				department
			} = data && data[0];
			return {
				employeeID,
				fullname,
				designation,
				department
			};
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
            const tableData = getTableData(`
			ims_inventory_receiving_details_tbl 		AS iird
			LEFT JOIN ims_inventory_receiving_tbl 		AS iir 	ON iird.inventoryReceivingID  = iir.inventoryReceivingID
			LEFT JOIN ims_purchase_order_tbl 			AS ipo 	ON iir.purchaseOrderID = ipo.purchaseOrderID
			LEFT JOIN ims_request_items_tbl 			AS iri 	ON  ipo.purchaseOrderID = iri.purchaseOrderID
			LEFT JOIN ims_inventory_item_tbl 			AS iii 	ON iird.itemID = iird.itemID
			LEFT JOIN ims_inventory_category_tbl 		AS iic 	ON iii.categoryID = iic.categoryID
			LEFT JOIN ims_inventory_classification_tbl  AS iict ON iii.classificationID = iict.classificationID 
			LEFT JOIN ims_stock_in_tbl 					AS isi	ON iird.inventoryReceivingID = isi.inventoryReceivingID`,
			`iird.inventoryReceivingID, iird.itemID,
			iri.itemName,iri.brandName,iic.categoryName,iict.classificationName,
			iird.received AS quantity,sum(stockInQuantity) AS receivingQuantity,iir.createdAt`, "iird.inventoryReceivingID=" + id);
			//const tableData = getTableData("ims_received_tbl","","receivedID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					receivedStatus
				} = tableData[0];

				let isReadOnly = true,
					isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (receivedStatus == 0 || receivedStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (receivedStatus == 0) {
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
			let url = window.document.URL;
			let arr = url.split("?view_id=");
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
				columnDefs: [
                    { targets: 0,  width: 100 },
		 			{ targets: 1,  width: 150 },
		 			{ targets: 2,  width: 150 },
		 			{ targets: 3,  width: 150 },
		 			{ targets: 4,  width: 100 },
		 			{ targets: 5,  width: 150 },
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
				sorting: false,
				searching: false,
				paging: true,
				ordering: false,
				info: false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 100 },
		 			{ targets: 1,  width: 150 },
		 			{ targets: 2,  width: 150 },
		 			{ targets: 3,  width: 150 },
		 			{ targets: 4,  width: 100 },
		 			{ targets: 5,  width: 150 },
		 			{ targets: 6,  width: 200 },
		 			{ targets: 7,  width: 100 },

				],
			});

			
			var table = $("#tableItems")
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
				],
			});


	}
	// ----- END DATATABLES -----
 
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
	// ----- MY FORMS CONTENT -----
	function myFormsContent() { // first load check first load kung sino ang mag view
		$("#tableMyFormsParent").html(preloader);
		let receivingReportData = getTableData(
			`ims_inventory_receiving_tbl AS r 
			LEFT JOIN hris_employee_list_tbl 	AS emp USING(employeeID)
			LEFT JOIN hris_designation_tbl 		AS dtn USING(designationID)`,
			`r.inventoryReceivingID,	r.inventoryReceivingStatus,	r.inventoryReceivingRemarks, 
			CONCAT(emp.employeeFirstname, ' ', emp.employeeLastname) AS fullname, 
            r.createdAt,dtn.designationName,approversDate,	r.submittedAt`,
			`inventoryReceivingStatus = 2`,
			`FIELD(r.approversStatus, 2), COALESCE(r.submittedAt, r.createdAt)`
		);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Preparer Name</th>
                    <th>Position</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		receivingReportData.map((item) => {
			let {
                inventoryReceivingID,
				fullname,
				approversID,
				approversDate,
				designationName,
				inventoryReceivingStatus,
				submittedAt,
				createdAt,
			} = item;

			// let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved = inventoryReceivingStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			// let button = receivedStatus != 0 ? `
			let button = 
            //officialBusinessStatus != 0 ?
				`
            <button class="btn btn-view w-100 btnView" id="${encryptString(inventoryReceivingID)}"><i class="fas fa-eye"></i> View</button>`;
		
			html += `
            <tr>
               
                <td>${getFormCode("IRR", dateCreated, inventoryReceivingID)}</td>
                <td>${fullname}</td>
                <td>${designationName}</td>
				<td>${dateSubmitted}</td>
                <td class="text-center">
                ${getStatusStyle(inventoryReceivingStatus)}
                </td>
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
					inventoryReceivingID = "",
					inventoryReceivingStatus = "",
					employeeID = "",
					approversID = "",
					approversDate = "",
					createdAt = new Date
			} = data && data[0];
			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (inventoryReceivingStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						inventoryReceivingID="${inventoryReceivingID}"
						code="${getFormCode("IRR", createdAt, inventoryReceivingID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						inventoryReceivingID="${inventoryReceivingID}"
						code="${getFormCode("IRR", createdAt, inventoryReceivingID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (inventoryReceivingStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							inventoryReceivingID="${inventoryReceivingID}"
							code="${getFormCode("IRR", createdAt, inventoryReceivingID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (inventoryReceivingStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("IRR", createdAt, inventoryReceivingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							inventoryReceivingID="${encryptString(inventoryReceivingID)}"
							code="${getFormCode("IRR", createdAt, inventoryReceivingID)}"><i class="fas fa-ban"></i> 
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
            headerButton(false);
			myFormsContent();
			updateURL();
		} else {
            headerButton(false);
			formContent(data, readOnly);

		}
	}
	viewDocument();
    $("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE

    	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
		// const tableData = getTableData(
		// 	"hris_official_business_tbl",
		// 	"*",
		// 	"receivedID=" + id,
		// 	""
		// );
		// pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);
		storageContent();
		let {
				inventoryReceivingID = "",
				employeeID = "",
                approversID = "",
                approversDate ="",
                designationName ="",
                fullname = "",
				inventoryReceivingStatus = false,
				submittedAt = false,
				createdAt = false,
		} = data && data[0];

		// let requestItems ="";
		// if(receivedID){
		// 	let requestItemsData = getTableData(
		// 		``,``,``);
		// }

		
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname: employeeFullname = "",
			department: employeeDepartment = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("inventoryReceivingID", inventoryReceivingID);
		$("#btnBack").attr("status", inventoryReceivingStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		
		let button = formButtons(data);

		let html = `
        <div class="row px-2">
        <div class="col-lg-2 col-md-6 col-sm-12 px-1">
            <div class="card">
                <div class="body">
                    <small class="text-small text-muted font-weight-bold">Document No.</small>
                    <h6 class="mt-0 text-danger font-weight-bold">
                    ${inventoryReceivingID ? getFormCode("IRR", createdAt, inventoryReceivingID) : "---"}
                    </h6>      
                </div>
            </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-12 px-1">
            <div class="card">
                <div class="body">
                    <small class="text-small text-muted font-weight-bold">Status</small>
                    <h6 class="mt-0 font-weight-bold">${inventoryReceivingStatus ? getStatusStyle(inventoryReceivingStatus) : "---"}</h6>      
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12 px-1">
            <div class="row m-0">
            <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Date Created</small>
                        <h6 class="mt-0 font-weight-bold">${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Preparer Name</small>
                        <h6 class="mt-0 font-weight-bold">${fullname}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Position</small>
                        <h6 class="mt-0 font-weight-bold">${designationName}</h6>      
                    </div>
                </div>
                </div>
                </div>
                </div>
                <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Reference	</small>
                        <h6 class="mt-0 font-weight-bold"></h6>      
                    </div>
                </div>
       </div>
        </div>
        <div class="row" id="form_purchase_request">
            <div class="col-sm-12">
                <div class="container-fluid">
                    <table class="table table-striped" id="tableListItems">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Item Classification</th>
                                <th>Item Category</th>
								<th>Brand</th>
                                <th>Ordered</th>
                                <th>Received</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="">`;

		let ItemData = getTableData(
			`ims_inventory_receiving_details_tbl 		AS iird
			LEFT JOIN ims_inventory_receiving_tbl 		AS iir 	ON iird.inventoryReceivingID  = iir.inventoryReceivingID
			LEFT JOIN ims_purchase_order_tbl 			AS ipo 	ON iir.purchaseOrderID = ipo.purchaseOrderID
			LEFT JOIN ims_request_items_tbl 			AS iri 	ON  ipo.purchaseOrderID = iri.purchaseOrderID AND iird.itemID = iri.itemID
			LEFT JOIN ims_inventory_item_tbl 			AS iii 	ON iird.itemID = iii.itemID
			LEFT JOIN ims_inventory_category_tbl 		AS iic 	ON iii.categoryID = iic.categoryID
			LEFT JOIN ims_inventory_classification_tbl  AS iict ON iii.classificationID = iict.classificationID 
			LEFT JOIN ims_stock_in_tbl 					AS isi	ON iird.inventoryReceivingID = isi.inventoryReceivingID AND iird.itemID = isi.itemID`,
			`iird.inventoryReceivingID, iird.itemID,
			iri.itemName,iri.brandName,iic.categoryName,iict.classificationName,
			iird.received AS quantity,sum(IFNULL(isi.stockInQuantity,'0')) AS receivingQuantity,iir.createdAt`,
			`iird.inventoryReceivingID = ${inventoryReceivingID}`,
            ``,
			"iird.inventoryReceivingID,iird.itemID"
		);
		var count = 0;
		//var received_quantity = "received_quantity";
		ItemData.map((item) => {
            var quantity = item.quantity;
			var receivingQuantity = item.receivingQuantity;
			//var receivedID = item.receivedID;
			//alert(item.receivedID);
			++count;
			html += `        
			<tr class="">
            <td>${getFormCode("IRR", item.createdAt, item.inventoryReceivingID)}</td>
            <td>${item.itemName}</td>
            <td>${item.classificationName}</td>
            <td>${item.categoryName}</td>
			<td>${item.brandName}</td>
            <td>${item.quantity}</td>
            <td>${item.receivingQuantity}</td>
            <td class="text-center">
            <input type="hidden" id="totalquantity1${count}">
            <div id="actionbutton"></div>
			<a class="btn btn-primary py-0 btn-barcode" 
			href="javascript:void(0);" 
			number="${count}" 
			data-inventoryReceivingID="${item.inventoryReceivingID}" 
			data-itemID="${item.itemID}" 
			style="min-width: 70px; max-width: 110px;">
            <i class="fas fa-barcode" style="font-size: .8rem"></i> Barcode
            </a>`;
			if (item.quantity < item.receivingQuantity || item.quantity == item.receivingQuantity) {
				html += `<a class="btn btn-success py-0"
					href="javascript:void(0);" 
					style="min-width: 80px; cursor: default;">
					<i class="fas fa-check" style="font-size: .8rem"></i> Settled
					</a>`;
			} else {
				html += `<a class="btn btn-secondary p-0 btnRecord" 
				href="javascript:void(0);" 
				data-inventoryReceivingID="${item.inventoryReceivingID}" 
				data-itemID="${item.itemID}"
				data-itemName="${item.itemName}"
				data-classificationName ="${item.classificationName}"
				data-categoryName="${item.categoryName}"
				data-brandName="${item.brandName}"
				data-orderQuantity="${item.quantity}"
				data-receivingQuantity="${item.receivingQuantity}"
				style="min-width: 80px">
					<i class="fas fa-pencil-alt" style="font-size: .8rem"></i>Record
				</a>`;
			}
			html += ` </td>
        </tr>`;

		});
		html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			//initDataTables();
			 storageContent();
			// updateTableItems();
			 datevalidated();
			// expirationdatevalue();
			initAll();
			return html;
		}, 300);


	}
	$(document).on("click", ".btnRecord", function () {
		
		var inventoryReceivingID = $(this).data("inventoryreceivingid");
		var itemID = $(this).data("itemid");
		var receivingquantity = $(this).data("receivingquantity");
		$("#modal_product_record").modal("show");
		// Display preloader while waiting for the completion of getting the data
		$("#modal_product_record_content").html(preloader);
	
		const tableData = getTableData(
			`ims_receiving_serial_number_tbl 				AS irsn
			LEFT JOIN ims_inventory_receiving_tbl 			AS iir 	ON irsn.inventoryReceivingID  = iir.inventoryReceivingID
			LEFT JOIN ims_inventory_receiving_details_tbl 	AS iird ON irsn.inventoryReceivingID = iird.inventoryReceivingID  AND iird.itemID = irsn.itemID
			LEFT JOIN ims_purchase_order_tbl 				AS ipo 	ON iir.purchaseOrderID = ipo.purchaseOrderID
			LEFT JOIN ims_request_items_tbl 				AS iri 	ON  ipo.purchaseOrderID = iir.purchaseOrderID AND irsn.itemID = iri.itemID
			LEFT JOIN ims_inventory_item_tbl 				AS iii 	ON irsn.itemID = iii.itemID
			LEFT JOIN ims_inventory_category_tbl 			AS iic 	ON iii.categoryID = iic.categoryID
			LEFT JOIN ims_inventory_classification_tbl  	AS iict ON iii.classificationID = iict.classificationID 
			LEFT JOIN ims_stock_in_tbl 						AS isi	ON irsn.inventoryReceivingID = isi.inventoryReceivingID AND irsn.itemID = isi.itemID`,
			`irsn.inventoryReceivingID, IFNULL(irsn.serialNumber,'') AS serialNumber,irsn.itemID,iii.itemCode,iri.itemName,iri.itemDescription,iri.brandName,iird.received`,`irsn.inventoryReceivingID=${inventoryReceivingID} AND irsn.itemID =${itemID}`,
			``,``);
			if (tableData) {
				const content = modalContent(tableData);
				setTimeout(() => {
					$("#modal_product_record_content").html(content);
					$("#receivedQuantity").val(receivingquantity);
					initAll();
					storageContent();
					datevalidated();
					
					//getItemRow();
	
				}, 500);
	
			}
	});
	
	// ----- STORAGE CONTENT -----
	function storageContent(param = false) {

		// getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 

		const data = getTableData("ims_inventory_storage_tbl",
			"inventoryStorageID  ,inventoryStorageOfficeName", "inventoryStorageStatus=1", "");

		let html = ` <option value="" disabled selected ${!param && "selected"}>Select Storage Code</option>`;
		data.map((item, index, array) => {
			html += `<option value="${item.inventoryStorageID}" ${param && item.inventoryStorageID == param[0].inventoryStorageID && "selected"}>${item.inventoryStorageOfficeName}</option>`;
		})
		$(".inventoryStorageID").html(html);

	}

		// ----- MODAL CONTENT -----
		function modalContent(data = false, readOnly = false) {
		

			let {	
					inventoryReceivingID 	="",
					itemID 					= "",
					itemCode 				="",
					itemDescription 		="",
					brandName				="",
					received 				="",
					serialNumber 			="",
					itemName				="",

			} = data && data[0];
			// classificationContent(data);
			let button = itemID ? `
			<button 
				class="btn btn-update px-5 p-2" 
				id="btnSave" 
				rowID="${itemID}"
				itemID="${encryptString(itemID)}"
				feedback="">
				<i class="fas fa-save"></i>
				Save
			</button>` : `
			<button 
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
									value="${itemCode}"
									disabled>
									<input 
									type="hidden" 
									class="form-control" 
									name="itemID" 
									id="itemID"
									value="${itemID}"
									disabled>
									<input 
									type="hidden" 
									class="form-control" 
									name="inventoryReceivingID" 
									id="inventoryReceivingID"
									value="${inventoryReceivingID}"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_itemCode"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Item Description</label>
								<input 
									type="text" 
									class="form-control" 
									name="invalid-input_itemName" 
									id="itemName"
									value="${itemName}"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_itemName"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Brand</label>
								<input 
									type="text" 
									class="form-control " 
									name="brandName" 
									id="brandName"
									value="${brandName}"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_brandName"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Order</label>
								<input 
									type="text" 
									class="form-control" 
									name="received" 
									id="received"
									value="${received}"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_orderQuantity"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Received</label>
								<input 
									type="text" 
									class="form-control" 
									name="receivedQuantity" 
									id="receivedQuantity"
									disabled>
								<div class="invalid-feedback d-block" id="invalid-input_receivedQuantity"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Remaining Quantity</label>
								<input 
									type="text" 
									class="form-control validate" 
									name="remainingQuantity" 
									id="remainingQuantity"
									value=""
									disabled>
								<div class="invalid-feedback d-block" id="invalid-remainingQuantity"></div>
							</div>
						</div>
					   
						<div class="col-sm-12">
							<div class="container-fluid">
								<table class="table table-striped" id="tableItems">
									<thead>
										<tr style="white-space: nowrap">    
											<th>Received Quantity</th>
											<th>Serial Number</th>
											<th>Storage</th>
											<th>Barcode</th>
											<th>Manufactured Date</th>
											<th>Expiration Date</th>
										</tr>
									</thead>
									
									<tbody class="tableRowItems">`;
									var count = 0;
									var totalquantity = 0;
									data.map((item) => {
										
									++count;
									html +=`<tr>`;
									if(!item.serialNumber){
									html +=`
									<td class="text-center"><input type="text"
										class="form-control validate number recievedQuantity text-center recievedQuantity1" 
										id="recievedQuantity${count}"
										min="1"
										data-allowcharacters="[0-9]"
										name="recievedQuantity"required>
										<div class="invalid-feedback d-block" id="invalid-input_recievedQuantity"></div>
									</td>`;
									}else{
										var quantity = 1;
										html +=`
									<td class="text-center"><input type="text"
										class="form-control validate number recievedQuantity text-center" 
										id="recievedQuantity${count}"
										min="1"
										data-allowcharacters="[0-9]"
										name="recievedQuantity"required
										value="${quantity}" disabled>
										<div class="invalid-feedback d-block" id="invalid-input_recievedQuantity"></div>
									</td>`;
									}
									html +=`
									<td>
									<input 
										type="text" 
										class="form-control serialnumber" 
										number="${count}"
										name="serialnumber" 
										id="serialnumber${count}"
										value="${item.serialNumber}"
										disabled>
									</td>
									<td>
										<select style="width:100%;"
										class="form-control select2 validate inventoryStorageID"
										number="${count}"
										name="inventoryStorageID"
										id="inventoryStorageID${count}" required>
										</select>
										<div class="invalid-feedback d-block" id="invalid-input_inventoryStorageID"></div>
									</td>
									<td>
										<input 
										type="text" 
										class="form-control barcode" 
										number="${count}"
										name="barcode" 
										id="barcode${count}"
										disabled>
									</td>
									<td> 
										<input 
										type="date" 
										class="form-control manufactureDate" 
										number="${count}"
										name="manufactureDate" 
										id="manufactureDate${count}">
									</td>
									<td>
										<input 
										type="date" 
										class="form-control expirationdate expirationdateoncheck" 
										number="${count}"
										name="expirationdate" 
										id="expirationdate${count}">
										
									</td>
									</tr>`;
									});
									html +=`
									</tbody>
								</table>
							</div>
						</div>
						
					</div>
				</div>
				
				<div class="modal-footer">
					${button}
					<button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> Cancel</button>
				</div>`;
			return html;
	
		}

	$(document).on("change", ".recievedQuantity1", function() {
		const val = $(this).val();
		const orderQuantity = $("#orderQuantity").val();
		const receivedQuantity = $("#receivedQuantity").val();
		var formatvaluereceived =  receivedQuantity ? receivedQuantity : 0;
		var totalquantity = parseInt(val) + parseInt(formatvaluereceived);
		if(orderQuantity > totalquantity || orderQuantity == totalquantity){
			$(this).removeClass("is-invalid").addClass("is-valid");
			$("#invalid-input_recievedQuantity").html("");
			
			document.getElementById("btnSave").disabled = false;
			
		}else{
			$(this).removeClass("is-valid").addClass("is-invalid");
			$("#invalid-input_recievedQuantity").html("Not Equal Order Quantity");
			document.getElementById("btnSave").disabled = true;
			//return false;
			//return false;
		}
	});	
	$(document).on("change", ".inventoryStorageID", function () {
		var storageID = $(this).val();
		const number = $(this).attr("number");
		var inventoryStorageID ="";
		const data = getTableData("ims_inventory_storage_tbl",
		"inventoryStorageID  ,inventoryStorageOfficeName,inventoryStorageCode", `inventoryStorageStatus=1 AND inventoryStorageID =${storageID}`, "");
		data.map((item) => {
			inventoryStorageCode = item.inventoryStorageCode;
		});
		const itemcodeSplit = $("#itemCode").val().split("-");
		const myItemcode = itemcodeSplit[2];
		const inventoryStorageCodeSplit = inventoryStorageCode.split("-");
		const myInventorycode = inventoryStorageCodeSplit[2];
		var serialnumberretrive  = $(`#serialnumber${number}`).val();
		var serialnumber ="000000000000";
		if(serialnumberretrive ==""){
			serialnumber ="000000000000";
		}else{
			serialnumber = serialnumberretrive;
		}
		var serialnumberlastFive = serialnumber.substr(serialnumber.length - 5); // => "Tabs1 lastfive"
		const barcode = `${myItemcode}-${myInventorycode}-${serialnumberlastFive}`;
		$("#barcode" + number).val(barcode);
	});		
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_product_record");
		if (validate) {
			var itemID 				=$("#itemID").val();
			var receivedID 			= $("#inventoryReceivingID").val();
			var barcode 			= [];
			var recievedQuantity 	= [];
			var serialnumber 		= [];
			var inventoryStorageID 	= [];
			var manufactureDate 	= [];
			var expirationdate 		= [];
			$(".recievedQuantity").each(function () {
				recievedQuantity.push($(this).val());
			});
			$(".serialnumber").each(function () {
				serialnumber.push($(this).val());
			});
			$(".inventoryStorageID").each(function () {
				inventoryStorageID.push($(this).val());
			});
			$(".barcode").each(function () {
				barcode.push($(this).val());
			});
			$(".manufactureDate").each(function () {
				manufactureDate.push($(this).val());
			});
			$(".manufactureDate").each(function () {
				manufactureDate.push($(this).val());
			});
			$(".expirationdate").each(function () {
				expirationdate.push($(this).val());
			});
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
						url: `${base_url}ims/Inventory_stock_In/insertbarcode`,
						method: "POST",
						data: {
							itemID: 			itemID, 			receivedID : 			receivedID,
							barcode: 			barcode,			recievedQuantity: 		recievedQuantity,
							serialnumber: 		serialnumber,		inventoryStorageID : 	inventoryStorageID,
							manufactureDate: 	manufactureDate, 	expirationdate : 		expirationdate
						},
						async: true,
						dataType: "json",
						beforeSend: function () {
							$("#loader").show();
						},
						success: function (data) {
							// window.location.replace(`${base_url}ims/inventory_recieving_report`);
							window.location.reload();
						},
					});
				} else {
					preventRefresh(false);
					containerID && $("#" + containerID).show();
					$("#" + modalID).modal("show");
				}
			});


	
			//alert(recievedQuantity);

		}
	});	
	
	$(document).on("click", ".btn-barcode", function () {
		var receivedID = $(this).data("inventoryreceivingid");
		// /alert(receivedID);
		var itemID = $(this).data("itemid");
		const data = {receivedID, itemID};
		// console.log(data);
		$.ajax({
			url: `${base_url}ims/Inventory_stock_In/printStockInBarcode`,
			method: "POST",
			data: {
				receivedID: receivedID, itemID: itemID
				
			},
			success: function(data) {
			  var left  = ($(window).width()/2)-(900/2),
				top   = ($(window).height()/2)-(600/2),
				mywindow = window.open ("", "PRINT", "width=900, height=600, top="+top+", left="+left);

			  mywindow.document.write(data);

			  mywindow.document.close(); 
			  mywindow.focus();
			}
		  })

	});	
			

	function datevalidated() {
		var dtToday = new Date();

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
		var expirationDate = year + '-' + month + '-' + expirationDay;
		$('.manufactureDate').attr('max', today);
		$('.expirationdateoncheck').attr('min', expirationDate);

	}

	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id 			= $(this).attr("inventoryReceivingID");
		const employeeID 	= $(this).attr("employeeID");
		const feedback   	= $(this).attr("code") || getFormCode("IRR", dateToday(), id);
		const status 		= $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}	
		} else {
			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"OFFICIAL BUSINESS",
					"",
					"form_official_business",
					data,
					true,
					pageContent
				);
			}, 300);
		}

	});
	// ----- END CLOSE FORM -----

    

    

	
});
