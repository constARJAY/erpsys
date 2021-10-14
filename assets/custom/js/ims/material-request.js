$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(137);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("material request");
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
				"ims_material_request_tbl", 
				"reviseMaterialRequestID", 
				"reviseMaterialRequestID IS NOT NULL AND materialRequestStatus != 4");
			return revisedDocumentsID.map(item => item.reviseMaterialRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_material_request_tbl", "", "materialRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					materialRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (materialRequestStatus == 0 || materialRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (materialRequestStatus == 0) {
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
					const isAllowed = isCreateAllowed(137);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/material_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/material_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/material_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/material_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // ----- GLOBAL VARIABLE - REUSABLE ----- 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

	const inventoryItemList = getTableData(`ims_inventory_item_tbl 
											LEFT JOIN ims_inventory_category_tbl USING(categoryID)
											LEFT JOIN ims_inventory_classification_tbl ON (ims_inventory_item_tbl.classificationID = ims_inventory_classification_tbl.classificationID)`, 
											`itemID, itemCode, itemName, itemDescription, brandName, categoryName, classificationName, itemImage ,unitOfMeasurementID, ims_inventory_item_tbl.createdAt`,
											"itemStatus = 1");

	// UPDATING SELECT FOR THE ASSETS AND ITEMS
	function updateSelect(){
		let itemValueArr 	= [];
		let itemElementID 	= [];
		
		$(`[name=itemID]`).each(function(i,obj){
			itemValueArr.push($(this).val());
			itemElementID.push(this.id);
		});

		itemElementID.map((item, index)=>{
			$(`#${item}`).html("");
			let html = getInventoryItemList(itemValueArr[index], itemValueArr);
			$(`#${item}`).html(html);
		});

		let assetValueArr	= [];
		let assetElementID	= [];

		$(`[name=assetID]`).each(function(i, obj){
			assetValueArr.push($(this).val());
			assetElementID.push(this.id);
		});

		assetElementID.map((asset,index)=>{
			$(`#${asset}`).html("");
			let html = getInventoryAssetList(assetValueArr[index], assetValueArr);
			$(`#${asset}`).html(html);
		});
	}
	// END UPDATING SELECT FOR THE ASSETS AND ITEMS
	
	function getInventoryItemList(itemID = null, arrayData = false){
		let itemIDArr 	= [];
		let option 		= `<option ${!itemID && "selected"} disabled>Select Item Name</option>`;
		if(!arrayData){
			itemIDArr 	= [];
			$(`[name=itemID]`).each(function(i,obj){
				if($(this).val()){
					itemIDArr.push($(this).val());
				}
			});
		}else{
			itemIDArr = arrayData;
		}
		
			option += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == itemID).map(item=>{
					return  `
								<option
									value 				= "${item.itemID}"
									itemCode			= "${item.itemCode}"
									itemBrandName		= "${item.brandName}"
									itemName 			= "${item.itemName}"
									itemClassification	= "${item.classificationName}"
									itemCategory		= "${item.categoryName}"
									itemUom				= "${item.unitOfMeasurementID}"
									itemDescription		= "${item.itemDescription}"
									files				= "${item.itemImage}"
									${item.itemID == itemID ? "selected" :  ""}
								>
								${item.itemName}
								</option>
							`;
			}).join();
		return option;
	}

	$(document).on("change", "[name=itemID]", function(){
		let itemID  				= 	$(`option:selected`, this).val();
		let itemCode				= 	$(`option:selected`, this).attr("itemCode");
		let itemBrandName			= 	$(`option:selected`, this).attr("itemBrandName");
		let itemName 				= 	$(`option:selected`, this).attr("itemName");
		let itemClassification		= 	$(`option:selected`, this).attr("itemClassification");
		let itemCategory			= 	$(`option:selected`, this).attr("itemCategory");
		let itemUom					= 	$(`option:selected`, this).attr("itemUom");
		let files					= 	$(`option:selected`, this).attr("files");

		$(this).closest(`.table-row-request-item`).find(".item-code").text(itemCode);
		$(this).closest(`.table-row-request-item`).find(".item-brandName").text(itemBrandName);
		$(this).closest(`.table-row-request-item`).find(".item-classification").text(itemClassification);
		$(this).closest(`.table-row-request-item`).find(".item-category").text(itemCategory);
		$(this).closest(`.table-row-request-item`).find(".item-uom").text(itemUom);

		// UPDATING ATTRIBUTE
		$(this).closest(`.table-row-request-item`).find("[name=itemQuantity]").prop("required", true);
		$(this).closest(`.table-row-request-item`).find("[name=itemQuantity]").prop("min", "0.01");
		$(this).closest(`.table-row-request-item`).find("[name=itemQuantity]").prop("minlength", "1");
		$(this).closest(`.table-row-request-item`).find("[name=itemQuantity]").prop("maxlength", "20");
		updateSelect();
	});

	const inventoryAssetList = getTableData(`ims_inventory_asset_tbl 
												LEFT JOIN ims_inventory_category_tbl USING(categoryID)
												LEFT JOIN ims_inventory_classification_tbl ON (ims_inventory_asset_tbl.classificationID = ims_inventory_classification_tbl.classificationID)`,
												`assetID, assetCode, assetName, assetDescription, brandName, categoryName, classificationName, assetImage, unitOfMeasurementID, assetImage ,ims_inventory_asset_tbl.createdAt`,
												`assetStatus = 1`);
				
	function getInventoryAssetList(assetID = null, arrayData = false){
		let assetIDArr 	= [];
		let option 		= `<option ${!assetID && "selected"} disabled>Select Asset Name</option>`;

		if(!arrayData){
			assetIDArr 	= [];
			$(`[name=assetID]`).each(function(i, obj){
				if($(this).val()){
					assetIDArr.push($(this).val());
				}
			});
		}else{
			assetIDArr 	= arrayData;
		}
		
		option += inventoryAssetList.filter(asset => !assetIDArr.includes(asset.assetID) || asset.assetID == assetID).map(asset=>{
			return  `
						<option
							value 				= "${asset.assetID}"
							assetCode			= "${asset.assetCode}"
							assetBrandName		= "${asset.brandName}"
							assetName 			= "${asset.assetName}"
							assetClassification	= "${asset.classificationName}"
							assetCategory		= "${asset.categoryName}"
							assetUom			= "${asset.unitOfMeasurementID}"
							files				= "${asset.assetImage}"
							${asset.assetID == assetID ? "selected" :  ""}
							>
						${asset.assetName}
						</option>
					`;
		}).join();

		return option;

	}

	$(document).on("change", "[name=assetID]", function(){
		let assetID  				= 	$(`option:selected`, this).val();
		let assetCode				= 	$(`option:selected`, this).attr("assetCode");
		let assetBrandName			= 	$(`option:selected`, this).attr("assetBrandName");
		let assetName 				= 	$(`option:selected`, this).attr("assetName");
		let assetClassification		= 	$(`option:selected`, this).attr("assetClassification");
		let assetCategory			= 	$(`option:selected`, this).attr("assetCategory");
		let assetUom				= 	$(`option:selected`, this).attr("assetUom");
		let files					= 	$(`option:selected`, this).attr("files");

		$(this).closest(`.table-row-request-asset`).find(".asset-code").text(assetCode);
		$(this).closest(`.table-row-request-asset`).find(".asset-brandName").text(assetBrandName);
		$(this).closest(`.table-row-request-asset`).find(".asset-classification").text(assetClassification);
		$(this).closest(`.table-row-request-asset`).find(".asset-category").text(assetCategory);
		$(this).closest(`.table-row-request-asset`).find(".asset-uom").text(assetUom);


		// UPDATING ATTRIBUTE
		$(this).closest(`.table-row-request-asset`).find("[name=assetQuantity]").prop("required", true);
		$(this).closest(`.table-row-request-asset`).find("[name=assetQuantity]").prop("min", "0.01");
		$(this).closest(`.table-row-request-asset`).find("[name=assetQuantity]").prop("minlength", "1");
		$(this).closest(`.table-row-request-asset`).find("[name=assetQuantity]").prop("maxlength", "20");

		$(this).closest(`.table-row-request-asset`).find("[name=assetManhours]").prop("required", true);
		$(this).closest(`.table-row-request-asset`).find("[name=assetManhours]").prop("min", "0.01");
		$(this).closest(`.table-row-request-asset`).find("[name=assetManhours]").prop("minlength", "1");
		$(this).closest(`.table-row-request-asset`).find("[name=assetManhours]").prop("maxlength", "20");
		updateSelect();
	});
	// ----- END GLOBAL VARIABLE - REUSABLE ----- 


    // ----- DATATABLES -----
	function initDataTables() {
		
		const activateDatatable = (elementID = null, options = {}) => {
			if ($.fn.DataTable.isDataTable(`#${elementID}`)) {
				$(`#${elementID}`).DataTable().destroy();
			}
			var table = $(`#${elementID}`)
				.css({ "min-width": "100%" })
				.removeAttr("width")
				.DataTable(options);
		}

		const headerOptions = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        [],
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 100 },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 100 },
				{ targets: 3,  width: 350 },
				{ targets: 4,  width: 260 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 280 },
				{ targets: 7,  width: 80  },
				{ targets: 8,  width: 250 },
			],
		};

		const bodyOptions = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 50  },
				{ targets: 1,  width: 150 },
				{ targets: 2,  width: 180 },
				{ targets: 3,  width: 150 },
				{ targets: 4,  width: 50  },
				{ targets: 5,  width: 100 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 150 },
			],
		};

		const bodyOptionsWithoutCheckbox = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 150 },
				{ targets: 3,  width: 50  },
				{ targets: 4,  width: 100 },
				{ targets: 5,  width: 150 },
				{ targets: 6,  width: 150 },
				{ targets: 7,  width: 150 },
				{ targets: 8,  width: 150 },
			],
		};

		const bodyOptionsWithoutClassificationAndCheckbox = {
			proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0,  width: 150 },
				{ targets: 1,  width: 180 },
				{ targets: 2,  width: 50  },
				{ targets: 3,  width: 100 },
				{ targets: 4,  width: 150 },
				{ targets: 5,  width: 150 },
			],
		};

		const bodyOptionItem = (isReadOnly = false) => {
			let option = {
						proccessing:    false,
						serverSide:     false,
						scrollX:        true,
						sorting:        false,
						searching:      false,
						paging:         false,
						ordering:       false,
						info:           false,
						scrollCollapse: true,
						columnDefs: []
					}
			let column = !isReadOnly ?  [
											{ targets: 0,  width: 50 },
											{ targets: 1,  width: 180 },
											{ targets: 2,  width: 200 },
											{ targets: 3,  width: 180 },
											{ targets: 4,  width: 100 },
											{ targets: 5,  width: 150 },
											{ targets: 6,  width: 200 }
									 	] 
									 		:
										[
											{ targets: 0,  width: 180 },
											{ targets: 1,  width: 200 },
											{ targets: 2,  width: 180 },
											{ targets: 3,  width: 100 },
											{ targets: 4,  width: 150 },
											{ targets: 5,  width: 200 }
									 	];
			
			option["columnDefs"] = column;
			return option;
		};

		const bodyOptionAsset = (isReadOnly = false) => {
			let option = {
						proccessing:    false,
						serverSide:     false,
						scrollX:        true,
						sorting:        false,
						searching:      false,
						paging:         false,
						ordering:       false,
						info:           false,
						scrollCollapse: true,
						columnDefs: []
					}
			let column = !isReadOnly ?  [
											{ targets: 0,  width: 50 },
											{ targets: 1,  width: 180 },
											{ targets: 2,  width: 200 },
											{ targets: 3,  width: 180 },
											{ targets: 4,  width: 100 },
											{ targets: 5,  width: 150 },
											{ targets: 6,  width: 150 },
											{ targets: 7,  width: 200 }
									 	] 
									 		:
										[
											{ targets: 0,  width: 180 },
											{ targets: 1,  width: 200 },
											{ targets: 2,  width: 180 },
											{ targets: 3,  width: 100 },
											{ targets: 4,  width: 150 },
											{ targets: 5,  width: 150 },
											{ targets: 6,  width: 180 }
									 	];
			
			option["columnDefs"] = column;
			return option;
		};


		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));

		$(`.inventory-request`).each(function() {
			const elementID = $(this).attr("id");
			const readOnly  = $(this).attr("isReadOnly") == "true";
			activateDatatable(elementID, elementID == "tableRequestItems" ? 
													option = bodyOptionItem(readOnly) : option = bodyOptionAsset(readOnly) );
		});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_material_request_tbl", "approversID")) {
				let count = getCountForApproval("ims_material_request_tbl", "materialRequestStatus");
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
			if (isCreateAllowed(137)) {
				html = `
				<button type="button" 
					class="btn btn-default btn-add" 
					id="btnAdd">
					<i class="icon-plus"></i> ${text}
				</button>`;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack" 
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}">
				<i class="fas fa-arrow-left"></i> Back
			</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let materialRequestData = getTableData(
			`ims_material_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated",
			`imrt.employeeID != ${sessionID} AND materialRequestStatus != 0 AND materialRequestStatus != 4`,
			`FIELD(materialRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		materialRequestData.map((data) => {
			let {
				fullname,
				materialRequestID,
                reviseMaterialRequestID,
                costEstimateID,
                costEstimateCode,
                billMaterialID,
                billMaterialCode,
                employeeID,
                timelineBuilderID,
                projectCode,
                projectName,
                projectCategory,
                clientCode,
                clientName,
                clientAddress,
                approversID,
                approversStatus,
                approversDate,
                materialRequestStatus,
                materialRequestReason,
                materialRequestRemarks,
                submittedAt,
                createdBy,
                updatedBy,
                createdAt,
                updatedAt
			} = data;

			let remarks       = materialRequestRemarks ? materialRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = materialRequestStatus == 2 || materialRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

            let projectDescription = projectCode ? `<div>
                                                        ${projectCode || '-'}
                                                    </div>
                                                    <small style="color:#848482;">${projectName || '-'}</small>` : "-";
            let clientDescription = clientCode ? `  <div>
                                                        ${clientCode || '-'}
                                                    </div>
                                                    <small style="color:#848482;">${clientName || '-'}</small>
													`: "-";
													
			let btnClass = materialRequestStatus != 0 ? "btnView" : "btnEdit";

			if (isImCurrentApprover(approversID, approversDate, materialRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(materialRequestID)}">
					<td>${getFormCode("IRF", createdAt, materialRequestID )}</td>
					<td>${fullname}</td>
					<td>${costEstimateCode || '-'}</td>
					<td>
						${projectDescription}
					</td>
					<td>
						${clientDescription}
                    </td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, materialRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(materialRequestStatus, true)}
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
		let materialRequestData = getTableData(
			`ims_material_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_bill_material_tbl AS pcet USING(billMaterialID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, pcet.createdAt AS ceCreatedAt",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(materialRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		materialRequestData.map((item) => {
			let {
				fullname,
				materialRequestID,
                reviseMaterialRequestID,
                costEstimateID,
                costEstimateCode,
                billMaterialID,
                billMaterialCode,
                employeeID,
                timelineBuilderID,
                projectCode,
                projectName,
				projectCategory,
				clientCode,
                clientName,
                clientAddress,
                approversID,
                approversStatus,
                approversDate,
                materialRequestStatus,
                materialRequestReason,
                materialRequestRemarks,
                submittedAt,
                createdBy,
                updatedBy,
                createdAt,
                updatedAt
			} = item;

			let remarks       = materialRequestRemarks ? materialRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = materialRequestStatus != "0" ? (submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "") : "";
			let dateApproved  = materialRequestStatus == 2 || materialRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let projectDescription = projectCode ? `<div>
                                                        ${projectCode || '-'}
                                                    </div>
                                                    <small style="color:#848482;">${projectName || '-'}</small>` : "-";
            let clientDescription = clientCode ? `  <div>
                                                        ${clientCode || '-'}
                                                    </div>
                                                    <small style="color:#848482;">${clientName || '-'}</small>
													`: "-";
													
			let btnClass = materialRequestStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(materialRequestID )}">
                	<td>${getFormCode("IRF", createdAt, materialRequestID )}</td>
					<td>${fullname}</td>
					<td>${costEstimateCode || '-'}</td>
					<td>
						${projectDescription}
					</td>
					<td>
                        ${clientDescription}
                    </td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, materialRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(materialRequestStatus, true)}
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
				materialRequestID     = "",
				materialRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (materialRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						materialRequestID="${encryptString(materialRequestID)}"
						code="${getFormCode("IRF", createdAt, materialRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (materialRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"
							status="${materialRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (materialRequestStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						materialRequestID="${encryptString(materialRequestID)}"
						code="${getFormCode("IRF", createdAt, materialRequestID)}"
						status="${materialRequestStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (materialRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(materialRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"
							status="${materialRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (materialRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`ims_material_request_tbl`,
						`billMaterialID`,
						`materialRequestID = ${materialRequestID}`,
					);
					const { billMaterialID } = data && data[0];
					const isAllowedForRevise = getTableDataLength(
						`ims_material_request_tbl`,
						`materialRequestID`,
						`materialRequestStatus <> 3 AND materialRequestStatus <> 4 AND billMaterialID = ${billMaterialID}`
					);

					if (!isDocumentRevised(materialRequestID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"
							status="${materialRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (materialRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							materialRequestID="${encryptString(materialRequestID)}"
							code="${getFormCode("IRF", createdAt, materialRequestID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET BILL MATERIAL LIST -----
	function getBillMaterialList(id = null, status = 0, display = true) {
		const createdBOMList = getTableData("ims_material_request_tbl", "billMaterialID", "materialRequestStatus <> 3 AND materialRequestStatus <> 4").map(bom => bom.billMaterialID);
		let html = `
		<option 
			value     = "0"
			timelineBuilderID = "0"
			projectCode     = "-"
			projectName     = "-"
			projectCategory = "-"
			clientName      = "-"
			clientAddress   = "-"
			${id == "0" && "selected"}>Internal</option>`;
		if (!status || status == 0) {
			html += billMaterialList.filter(bom => createdBOMList.indexOf(bom.billMaterialID) == -1 || bom.billMaterialID == id).map(bom => {
				return `
				<option 
					value     = "${bom.billMaterialID}" 
					timelineBuilderID = "${bom.timelineBuilderID}"
					projectCode     = "${bom.projectCode}"
					projectName     = "${bom.projectName}"
					projectCategory = "${bom.projectCategory}"
					clientName      = "${bom.clientName}"
					clientAddress   = "${bom.clientAddress}"
				${bom.billMaterialID == id && "selected"}>
				${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}
				</option>`;
			})
		} else {
			html += billMaterialList.map(bom => {
				return `
				<option 
					value     = "${bom.billMaterialID}" 
					timelineBuilderID = "${bom.timelineBuilderID}"
					projectCode     = "${bom.projectCode}"
					projectName     = "${bom.projectName}"
					projectCategory = "${bom.projectCategory}"
					clientName      = "${bom.clientName}"
					clientAddress   = "${bom.clientAddress}"
					${bom.billMaterialID == id && "selected"}>
					${getFormCode("PBR", bom.createdAt, bom.billMaterialID)}
				</option>`;
			})
		}
        return display ? html : billMaterialList;
	}
	// ----- END GET BILL MATERIAL LIST -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(`.table-row-request-item`).each(function(i,obj){
			// ROW ID 
			$(this).attr("id", `tableRowItem${i}`);
			$(this).attr("itemIndex", `${i}`);

			// CHECKBOX
			$(`td .checkboxrow-item`, this).attr("id",`checkboxrowItem${i}`);

			// SELECT
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			});

			$(this).find("select").each(function(j) {
				$(this).attr("index", `${i}`);
				$(this).attr("id", `selectItemID${i}`);
				$(this).attr("data-select2-id", `selectItemID${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$(`td [name=itemQuantity]`, this).attr("id", `quantityItemID${i}`);
			$(`td [name=itemQuantity]`, this).next().attr("id", `invalid-quantityItemID${i}`);

			// REMARKS
			$(`td [name=itemRemarks]`, this).attr("id", `invalid-remarksItemID${i}`);
			$(`td [name=itemRemarks]`, this).next().attr("id", `invalid-remarksItemID${i}`);
		});

		$(`.table-row-request-asset`).each(function(i,obj){
			// ROW ID 
			$(this).attr("id", `tableRowItem${i}`);
			$(this).attr("assetIndex", `${i}`);

			// CHECKBOX
			$(this).find(`.checkboxrow-asset`).attr("id", `checkboxrowAsset${i}`);
			
			// SELECT
			$(this).find(`[name=assetID]`).attr("id", `selectAssetID${i}`);
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			});
			
			$(this).find("select").each(function(j) {
				$(this).attr("index", `${i}`);
				$(this).attr("id", `selectAssetID${i}`);
				$(this).attr("data-select2-id", `selectAssetID${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$(this).find(`.input-asset-quantity`).attr("id",`quantityAssetID${i}`);
			$(this).find(`.input-asset-quantity`).next().attr("id",`invalid-quantityAssetID${i}`);
			
			// MANHOURS
			$(this).find(`.input-asset-manhours`).attr("id",`manhourAssetID${i}`);
			$(this).find(`.input-asset-manhours`).next().attr("id",`invalid-manhourAssetID${i}`);
			
			// REMARKS
			$(`td [name=assetRemarks]`, this).attr("id", `invalid-remarksAssetID${i}`);
			$(`td [name=assetRemarks]`, this).next().attr("id", `invalid-remarksAssetID${i}`);
		});
		

		// $(".itemTableBody tr").each(function(i) {
		// 	// ROW ID
		// 	$(this).attr("id", `tableRow${i}`);
		// 	$(this).attr("index", `${i}`);

		// 	// CHECKBOX
		// 	$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

		// 	// ITEMCODE
		// 	$("td .itemcode", this).attr("id", `itemcode${i}`);

		// 	// ITEMNAME
		// 	$(this).find("select").each(function(x) {
		// 		if ($(this).hasClass("select2-hidden-accessible")) {
		// 			$(this).select2("destroy");
		// 		}
		// 	})

		// 	$(this).find("select").each(function(j) {
		// 		const itemID = $(this).val();
		// 		$(this).attr("index", `${i}`);
		// 		$(this).attr("id", `requestitem${i}`);
		// 		$(this).attr("data-select2-id", `requestitem${i}`);
		// 		if (!$(this).hasClass("select2-hidden-accessible")) {
		// 			$(this).select2({ theme: "bootstrap" });
		// 		}
		// 	});

		// 	// QUANTITY
		// 	$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
		// 	$("td .quantity .invalid-feedback", this).attr("id", `invalid-quantity${i}`);
			
		// 	// CLASSIFICATION
		// 	$("td .classification", this).attr("id", `classification${i}`);

		// 	// UOM
		// 	$("td .uom", this).attr("id", `uom${i}`);

		// 	// UNIT COST
		// 	$("td .unitcost", this).attr("id", `unitcost${i}`);

		// 	// TOTAL COST
		// 	$("td .totalcost", this).attr("id", `totalcost${i}`);

		// 	// FILE
		// 	$("td .file [name=files]", this).attr("id", `filesCompany${i}`);

		// 	// REMARKS
		// 	$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		// 	$("td .remarks .invalid-feedback", this).attr("id", `invalid-remarks${i}`);
		// })
	}
	// ----- END UPDATE TABLE ITEMS -----




  
	// DELETE ROW FUNCTION 
		$(document).on("change", ".checkboxall", function(){
			let isChecked		=	$(this).prop("checked");
			let invCategory 	=	$(this).attr("invcategory");
			$(`.checkboxrow-${invCategory}`).each(function(i, obj){
					$(this).prop("checked", isChecked);
			});
			updateDeleteButton(invCategory);
		});
		
		$(document).on("change", ".checkboxrow", function(){
			let invCategory 	=	$(this).attr("invcategory");
			updateDeleteButton(invCategory);
		});


		// ----- CLICK DELETE ROW -----
		$(document).on("click", ".btnDeleteRow", function(){
			let invCategory = $(this).attr("invcategory");
			deleteTableRow(invCategory);
		})
		// ----- END CLICK DELETE ROW -----

		// ----- UPDATE DELETE BUTTON -----
		function updateDeleteButton(isItem = "item") {
			let flag = 0;
			let invCategory = isItem == "item" ? "item" : "asset";
			$(`.checkboxrow-${invCategory}`).each(function() {
				this.checked && flag++;
			});
			$(`.btnDeleteRow-${invCategory}`).attr("disabled", flag == 0);
		}
		// ----- END UPDATE DELETE BUTTON -----

		// ----- DELETE TABLE ROW -----
		function deleteTableRow(isItem = "item") {
			let invCategory = isItem == "item" ? "item" : "asset";

			if ($(`.checkboxrow-${invCategory}:checked`).length != $(`.checkboxrow-${invCategory}`).length) {
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
						$(`.checkboxrow-${invCategory}:checked`).each(function(i, obj) {
							var tableRow = $(this).closest('tr');
							tableRow.fadeOut(500, function (){
								$(this).closest("tr").remove();
								updateTableItems();
								updateDeleteButton(invCategory);
								updateSelect();
							});
						})
					}
				});
				
			} else {
				showNotification("danger", "You must have atleast one or more items.");
			}
		}
		// ----- END DELETE TABLE ROW -----
	// END DELETE ROW FUNCTION 

	
	// ----- ADD NEW ROW OF INVENTORY REQUEST -----
	$(document).on("click",".btnAddRow", function(){
		let isItem 		= $(this).attr("invCategory") == "item";
		let tableBody 	= isItem ? "item" : "asset";
		let html		= isItem ? requestItemsRow() : requestAssetsRow();
		$(`.table-body-inventory-request-${tableBody}`).append(html);
		setTimeout(() => {
			updateTableItems();
			initAll();
			updateSelect();
		}, 50);
	});
	// ----- END ADD NEW ROW OF INVENTORY REQUEST -----


	function getInventoryRequestData(materialRequestID = null, billMaterialID = null){
		let result = {};
		$.ajax({
			method:  "POST",
			url:     `material_request/getInventoryRequestData`,
			data:	 {materialRequestID, billMaterialID},
			async:   false,
			dataType:    "json",
			beforeSend: function() {
				$("#loader").show();
			},
			success: function(data) {
				result = data;
			},
			error: function() {
				setTimeout(() => {
					$("#loader").hide();
					showNotification("danger", "System error: Please contact the system administrator for assistance!");
				}, 500);
			}
		});
		return result;
	}	

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			fullname,
			materialRequestID,
			reviseMaterialRequestID,
			materialRequestCode,
			reviseMaterialRequestCode,
			costEstimateID,
			costEstimateCode,
			billMaterialID,
			billMaterialCode,
			employeeID,
			timelineBuilderID,
			projectCode,
			projectName,
			projectCategory,
			clientCode,
			clientName,
			clientAddress,
			approversID,
			approversStatus,
			approversDate,
			materialRequestStatus,
			materialRequestReason,
			materialRequestRemarks,
			submittedAt,
			createdBy,
			updatedBy,
			createdAt,
			updatedAt
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("materialRequestID", encryptString(materialRequestID));
		$("#btnBack").attr("status", materialRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);
		let requestItemsData 		= []; 
		let requestAssetsData		= [];
		if(materialRequestID){
			let inventoryRequestData	= getInventoryRequestData(materialRequestID, billMaterialID);
			requestItemsData 		= inventoryRequestData["items"]; 
			requestAssetsData		= inventoryRequestData["assets"];
		}
		let reviseDocumentNo    = isRevise ? materialRequestID : reviseMaterialRequestID;
		let documentHeaderClass = isRevise || reviseMaterialRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseMaterialRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseMaterialRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("IRF", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let dateNeededArray = !readOnly ? {
											singleDatePicker: true,
											showDropdowns: true,
											autoApply: true,
											minDate: moment().add("days", 7),
											startDate: moment().add("days", 7),
											locale: {
												format: 'MMMM DD, YYYY'
											}
										} : 
											{
												singleDatePicker: true,
												showDropdowns: true,
												autoApply: true,
												startDate: moment().add("days", 7),
												locale: {
													format: 'MMMM DD, YYYY'
												}
											}

		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${materialRequestID && !isRevise ? getFormCode("IRF", createdAt, materialRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${materialRequestStatus && !isRevise ? getStatusStyle(materialRequestStatus, true) : "---"}
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
								${getDateApproved(materialRequestStatus, approversID, approversDate)}
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
							${materialRequestRemarks && !isRevise ? materialRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_material_request">

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
					<input type="text" 
						class="form-control" 
						name="referenceInput"
						costEstimateID 				= "${costEstimateID || "-"}"
						costEstimateCode 			= "${costEstimateCode || "-"}"
						reviseMaterialRequestID 	= "${reviseMaterialRequestID || "-"}"
						reviseMaterialRequestCode 	= "${reviseMaterialRequestCode || "-"}"
						billMaterialID 				= "${billMaterialID || "-"}"
						billMaterialCode 			= "${billMaterialCode || "-"}"
						disabled 
						value="${costEstimateCode || "-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						timelineBuilderID = "${ timelineBuilderID || "-" }"
						disabled 
						value="${projectCode || "-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" 
						class="form-control" 
						name="projectName" 
						disabled 
						value="${projectName || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectName"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Category</label>
                    <input type="text" 
						class="form-control" 
						name="projectCategory" 
						disabled 
						value="${projectCategory || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectCategory"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" 
						class="form-control" 
						name="clientName" 
						disabled 
						value="${clientName || "-"}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" 
						class="form-control" 
						name="clientAddress" 
						disabled 
						value="${clientAddress || "-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDesignation}">
                </div>
            </div>
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Date Needed ${!disabled ? "<code>*</code>" : ""}</label>
					<input
						type="button"
						class = "form-control daterange text-left"
						name = "dateNeeded"
						id="dateNeeded"  
						value = "${moment().format("MMMM DD, YYYY")}"
						${readOnly ? "disabled" : ``} 
						${billMaterialID ? "disabled" : ``} 
						required>
					<div class="invalid-feedback d-block" id="invalid-dateNeeded"></div>
				</div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][()][%][&][*][ ]" 
                        minlength="1"
                        maxlength="200"
                        id="materialRequestReason"
                        name="materialRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}
						${billMaterialID ? "disabled" : ``} 
						>${materialRequestReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-materialRequestReason"></div>
                </div>
            </div>

            <div class="col-sm-12" id="request-items-table-content">
					${requestItemsContent(requestItemsData,materialRequestID, billMaterialID, readOnly)}
            </div>

			<div class="col-sm-12" id="request-assets-table-content">
					${requestAssetsContent(requestAssetsData,materialRequestID, billMaterialID, readOnly)}
            </div>

			<div class="col-12" id="costSummary"></div>

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			$("#loader").hide();
			initDataTables();
			updateTableItems();
			initAll();
			$(`#dateNeeded`).daterangepicker(dateNeededArray);
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
		}, 500);
	}
	// ----- END FORM CONTENT -----

	// ----- GET REQUEST ITEMS CONTENT -----
	function requestItemsContent(data = false, materialRequestID = null, billMaterialID = null, readOnly = false){

		let tableBodyData = readOnly ? `` :  requestItemsRow(data, readOnly, billMaterialID);
		
		if(data){
			if(data.length > 0){
				tableBodyData = "";
				data.map(items=>{
					tableBodyData +=  requestItemsRow(items, readOnly, billMaterialID);
				});
			}
		}
		let disabled 		= billMaterialID ? "disabled" : "";
		let checkboxHeader	= !readOnly ? `<th class="text-center">
											<input type="checkbox" class="checkboxall"  invcategory="item" ${disabled}>
										</th>`: ``;

		let actionButton 	= !readOnly ? `<div class="d-flex flex-column justify-content-start text-left mt-2">
												<div>
													<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" invcategory="item"><i class="fas fa-plus-circle"></i> Add Row</button>
													<button type="button" class="btn btn-danger btnDeleteRow btnDeleteRow-item" id="btnDeleteRow" invcategory="item"  disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
												</div>
											</div>` : ``;
		let html = `
					<div class="card">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">ITEM/S (FOR REQUEST)</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover inventory-request" id="tableRequestItems"  isReadOnly="${readOnly}">
									<thead>
										<tr>
											${checkboxHeader}
											<th>Item Code</th>
											<th>Item Name</th>
											<th>Item Classification</th>
											<th>UOM</th>
											<th>Quantity</th>
											<th>Remarks</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-item">
										${tableBodyData}
									</tbody>
								</table>
								${ billMaterialID ? `` : actionButton}
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>

					</div>
					`;
		return html;
	}
	// ----- END GET REQUEST ITEMS CONTENT -----

	// ----- GET REQUEST ASSETS CONTENT -----
	function requestAssetsContent(data = false, materialRequestID = null, billMaterialID = null, readOnly = false){

		let tableBodyData = readOnly ? `` :  requestAssetsRow(data, readOnly, billMaterialID);

		if(data){
			if(data.length > 0){
				tableBodyData = "";
				data.map(asset=>{
					tableBodyData +=  requestAssetsRow(asset, readOnly, billMaterialID);
				});
			}
		}
		let disabled		= billMaterialID ? "disabled" : "";
		let checkboxHeader 	= !readOnly ? `	<th class="text-center">
												<input type="checkbox" class="checkboxall" invcategory="asset" ${disabled}>
											</th>` : ``;
		let actionButton  	= !readOnly ? `	<div class="d-flex flex-column justify-content-start text-left mt-2">
												<div>
													<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" invcategory="asset"><i class="fas fa-plus-circle"></i> Add Row</button>
													<button type="button" class="btn btn-danger btnDeleteRow btnDeleteRow-asset" id="btnDeleteRow" invcategory="asset"  disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
												</div>
											</div>` : ``;
		let html = `
					<div class="card">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">ASSET/S (FOR REQUEST)</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover inventory-request" id="tableRequestAsset" isReadOnly="${readOnly}">
									<thead>
										<tr>
											${checkboxHeader}
											<th>Asset Code</th>
											<th>Asset Name</th>
											<th>Asset Classification</th>
											<th>UOM</th>
											<th>Quantity</th>
											<th>Man Hours</th>
											<th>Remarks</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-asset">
										${tableBodyData}
									</tbody>
								</table>
								${billMaterialID ? "" : actionButton}
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>

					</div>
					`;
		return html;
	}
	// ----- GET REQUEST ASSETS CONTENT -----

	function requestItemsRow(data = {}, readOnly = false, billMaterialID = null){
		let html = "";

		let {
			requestItemID			=	"",
            costEstimateID			=	"",
            materialRequestID		=   "",
            inventoryValidationID	=	"",
            bidRecapID				=   "",
            purchaseOrderID			=	"",
            changeRequestID			=	"",
            inventoryReceivingID	= 	"",
            inventoryVendorID		=	"",
            inventoryVendorCode		= 	"",
            inventoryVendorName		=  	"",
            finalQuoteRemarks		=	"",
            milestoneBuilderID		=	"",
            phaseDescription		=	"",
            milestoneListID			=	"",
            projectMilestoneID		=	"",
            projectMilestoneName	= 	"",
            itemID					=   "",
            itemCode				=   "",
            itemBrandName			=	"",
            itemName				=   "",
            itemClassification		=	"",
            itemCategory			= 	"",
            itemUom					=   "",
            itemDescription			=	"",
            files					=   "",
            remarks					=   "",
            requestQuantity			=	"",
            reservedItem			= 	"",
            forPurchase				=  	"",
            unitCost				=   "",
            totalCost				=   "",
            createdBy				=   "",
            updatedBy				=   "",
            createdAt				=   "",
            updatedAt				=   "",
			sumRequestQuantity 		=	""
		}  = data;
		
		let disabled 	 	= readOnly ? "disabled" : "";
		let requiredAttr 	= !readOnly && materialRequestID ? `required min="0.01" minlength="1" maxlength="20"` : ``;
		let checkboxRow		= !readOnly ? `<td class="text-center">
												<input type="checkbox" class="checkboxrow checkboxrow-item" invcategory="item" ${billMaterialID ? "disabled" : ""}>
											</td>` : ``;		

		html = `	<tr class="table-row-request-item">
						${checkboxRow}
						<td>
							<div class="item-code" requestitemid="${requestItemID}">${itemCode || "-" }</div>
						</td>

						<td>
							<div class="form-group mb-0">
								${!readOnly ? `<select class="form-control validate select2 w-100" ${billMaterialID ? "disabled" : ""}
													name="itemID">
													${getInventoryItemList(itemID)}
												</select>` : itemName}
							</div>	
							<small class="item-brandName" style="color:#848482;">${itemBrandName || "-" }</small>
						</td>

						<td>
							<div class="item-classification">${itemClassification || "-"}</div>
							<small class="item-category" style="color:#848482;">${itemCategory || "-"}</small>
						</td>

						<td><div class="item-uom">${itemUom || "-"}</div></td>

						<td>
							<div class="text-center item-quantity">
								${!readOnly ? `<input 
								type="text" 
								class="form-control input-quantity input-item-quantity text-center"
								data-allowcharacters="[0-9]" 
								max="999999999"
								name="itemQuantity" 
								autocomplete="off"
								${billMaterialID ? "disabled" : ""}
								${requiredAttr}
								value="${sumRequestQuantity || "0.00"}">` : sumRequestQuantity}
								<div class="text-left invalid-feedback d-block" id="invalid-quantityItemID"></div>
							</div>
						</td>
						<td>
							<div class="form-group mb-0">
								${!readOnly ? `<textarea 
								rows="2" 
								style="resize: none" 
								class="form-control validate" 
								data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:]['][''][-][_][()][%][&][*][ ]"
								minlength="1"
								maxlength="100"
								${billMaterialID ? "disabled" : ""}
								name="itemRemarks">${remarks || ""}</textarea>` : remarks}
								<div class="d-block invalid-feedback" id="invalid-remarksItemID"></div>
							</div>
						</td>
					</tr>`;

		return html;
	}

	function requestAssetsRow(data = {}, readOnly = false, billMaterialID = null){
		let html = "";

		let {
			requestAssetID				=	"",
			costEstimateID				=	"",
			materialRequestID			=	"",
			inventoryValidationID		=	"",
			bidRecapID					=	"",
			purchaseOrderID				=	"",
			changeRequestID				=	"",
			inventoryReceivingID		=	"",
			inventoryVendorID			=	"",
			inventoryVendorCode			=	"",
			inventoryVendorName			=	"",
			finalQuoteRemarks			=	"",
			milestoneBuilderID			=	"",
			phaseDescription			=	"",
			milestoneListID				=	"",
			projectMilestoneID			=	"",
			projectMilestoneName		=	"",
			assetID						=	"",
			assetCode					=	"",
			assetBrandName				=	"",
			assetName					=	"",
			assetClassification			=	"",
			assetCategory				=	"",
			assetUom					=	"",
			assetDescription			=	"",
			files						=	"",
			remarks						=	"",
			requestQuantity				=	"",
			reservedAsset				=	"",
			requestManHours				=	"",
			dateNeeded					=	"",
			dateReturn					=	"",
			actualDateReturn			=	"",
			hourlyRate					=	"",
			totalCost					=	"",
			createdBy					=	"",
			updatedBy					=	"",
			createdAt					=	"",
			updatedAt					=	"",
			sumRequestManHours 			=	"",
			sumRequestQuantity 			=	""
			
		}  = data;
		let disabled 	 = readOnly ? "disabled" : "";
		let requiredAttr = !readOnly && materialRequestID ? `required min="0.01" minlength="1" maxlength="20"` : ``;
		let checkboxRow 	=	!readOnly ? `<td class="text-center">
												<input type="checkbox" class="checkboxrow checkboxrow-asset" invcategory="asset" ${billMaterialID ? "disabled" : ""}>
											</td>` : ``;
		html = `	<tr class="table-row-request-asset">
						${checkboxRow}
						<td><div class="asset-code" requestassetid="${requestAssetID}">${assetCode || "-"}</div></td>
						<td>
							<div class="form-group mb-0">
								${!readOnly ? `	<select class="form-control validate select2 w-100" ${billMaterialID ? "disabled" : ""}
													name="assetID">
													${getInventoryAssetList(assetID)}
												</select>` : assetName}
								
							</div>
							<small class="asset-brandName" style="color:#848482;">${assetBrandName || "-"}</small>
						</td>
						<td>
							<div class="asset-classification">${assetClassification || "-"}</div>
							<small class="asset-category" style="color:#848482;">${assetCategory || "-"}</small>
						</td>
						<td><div class="asset-uom">${assetUom || "-"}</div></td>
						<td>
							<div class="text-center asset-quantity">
								${!readOnly ? `<input 
								type="text" 
								class="form-control input-quantity input-asset-quantity text-center"
								data-allowcharacters="[0-9]" 
								name="assetQuantity"
								autocomplete="off"
								${billMaterialID ? "disabled" : ""}
								${requiredAttr}
								value="${sumRequestQuantity || "0.00"}">` : sumRequestQuantity}
								<div class="invalid-feedback d-block" id="invalid"></div>
							</div>
						</td>
						<td>
							<div class="asset-manhours text-center" ${readOnly ? `style="font-size:95%;"`: ""}>
								${!readOnly ? `<input 
								type="text" 
								class="form-control input-quantity input-asset-manhours text-center"
								data-allowcharacters="[0-9]" 
								name="assetManhours"
								autocomplete="off"
								${billMaterialID ? "disabled" : ""}
								${requiredAttr}
								value="${sumRequestQuantity || "0.00"}">` : sumRequestManHours}
								<div class="invalid-feedback d-block" id="invalid"></div>
							</div>
						</td>
						<td>
							<div class="form-group mb-0 asset-remarks">
								${!readOnly ? `<textarea 
								rows="2" 
								style="resize: none" 
								class="form-control validate"
								name="assetRemarks"
								data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:]['][''][-][_][()][%][&][*][ ]"
								minlength="1"  ${billMaterialID ? "disabled" : ""}
								maxlength="100" >${remarks}</textarea>` : remarks}
								<div class="d-block invalid-feedback"></div>
							</div>
						</td>
					</tr>`;
		
		return html;

	}

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

			headerButton(true, "Add Inventory Request");
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


	// ----- GET INVENTORY REQUEST DATA -----
	function getMaterialRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			formData.append("materialRequestID", id);

			if (status != "2") {
				formData.append("materialRequestStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			const costEstimateID 				= $("[name=referenceInput]").attr("costEstimateID");
			const costEstimateCode 				= $("[name=referenceInput]").attr("costEstimateCode");
			const reviseMaterialRequestID 		= $("[name=referenceInput]").attr("reviseMaterialRequestID");
			const reviseMaterialRequestCode 	= $("[name=referenceInput]").attr("reviseMaterialRequestCode");
			const billMaterialID 				= $("[name=referenceInput]").attr("billMaterialID");
			const billMaterialCode 				= $("[name=referenceInput]").attr("billMaterialCode");
			const timelineBuilderID 			= $("[name=projectCode]").attr("timelineBuilderID");
			const projectCode   				= $(`[name="projectCode"]`).val();
			const projectName   				= $(`[name="projectName"]`).val();
			const projectCategory 				= $(`[name="projectCategory"]`).val();
			const clientName    				= $(`[name="clientName"]`).val();
			const clientAddress 				= $(`[name="clientAddress"]`).val();
			const dateNeeded 					= $(`[name="dateNeeded"]`).val();
			const materialRequestReason 		= $(`[name="materialRequestReason"]`).val();


			formData.append("employeeID", sessionID);
			formData.append("costEstimateID", costEstimateID	== "-" ?  null : costEstimateID );
			formData.append("costEstimateCode", costEstimateCode	=="-" ?  null : costEstimateCode);
			formData.append("reviseMaterialRequestID", reviseMaterialRequestID 	=="-"?  null : reviseMaterialRequestID);
			formData.append("reviseMaterialRequestCode", reviseMaterialRequestCode 	=="-"?  null : reviseMaterialRequestCode);
			formData.append("billMaterialID", billMaterialID 	=="-"?  null : billMaterialID);
			formData.append("billMaterialCode", billMaterialCode 	=="-"?  null : billMaterialCode);
			formData.append("timelineBuilderID", timelineBuilderID 	=="-"?  null : timelineBuilderID);
			formData.append("projectCode", projectCode 	=="-"?  null : projectCode);
			formData.append("projectName", projectName 	=="-"?  null : projectName);
			formData.append("projectCategory", projectCategory 	=="-" ?  null : projectCategory);
			formData.append("clientName", clientName 	=="-"?  null : clientName);
			formData.append("clientAddress", clientAddress 	=="-"?  null : clientAddress);
			formData.append("dateNeeded", moment(dateNeeded).format("YYYY-MM-DD"));
			formData.append("materialRequestReason", materialRequestReason);			

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("materialRequestID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("materialRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("materialRequestStatus", 2);
				}
			}

			$(".table-row-request-item").each(function(i, obj){
				let requestItemID 			= 	$(this).find(".item-code").attr("requestitemid");
				let itemID  				= 	$(this).find("[name=itemID]").val();
				let itemQuantity 			= 	$(this).find("[name=itemQuantity]").val();
				let itemRemarks 			= 	$(this).find("[name=itemRemarks]").val();
				if(itemID){
					formData.append(`items[${i}][requestItemID]`, requestItemID);
					formData.append(`items[${i}][itemID]`, itemID);
					formData.append(`items[${i}][itemQuantity]`, itemQuantity);
					formData.append(`items[${i}][itemRemarks]`, itemRemarks);
				}
			});

			$(".table-row-request-asset").each(function(i, obj){
				let requestAssetID 			= 	$(this).find(".asset-code").attr("requestassetid");
				let assetID  				= 	$(this).find("[name=assetID]").val();
				let assetQuantity 			= 	$(this).find("[name=assetQuantity]").val();
				let assetManhours 			= 	$(this).find("[name=assetManhours]").val();
				let assetRemarks 			= 	$(this).find("[name=assetRemarks]").val();
				if(assetID){
					formData.append(`assets[${i}][requestAssetID]`, requestAssetID);
					formData.append(`assets[${i}][assetID]`, assetID);
					formData.append(`assets[${i}][assetQuantity]`, assetQuantity);
					formData.append(`assets[${i}][assetManhours]`, assetManhours);
					formData.append(`assets[${i}][assetRemarks]`, assetRemarks);
				}
			});

		}

		return isObject ? data : formData;
	}
	// ----- END GET INVENTORY REQUEST DATA -----


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
		const id                    = decryptString($(this).attr("materialRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("materialRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise     				= $(this).attr("revise") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("IRF", dateToday(), id);
		const status     				= $(this).attr("status");

		if (status != "false" && status != 0 && id) {
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getMaterialRequestData(action, "save", "0", id);
				data.append("materialRequestStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseMaterialRequestID", id);
					data.delete("materialRequestID");
				} else {
					data.append("materialRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}
				saveMaterialRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getMaterialRequestData(action, "save", "0", id);
			data.append("materialRequestStatus", 0);

			saveMaterialRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("materialRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("IRF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getMaterialRequestData(action, "save", "0", id);
		data.append("materialRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseMaterialRequestID", id);
				data.delete("materialRequestID");
			} else {
				data.append("materialRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		validateItemPrice();
		saveMaterialRequest(data, "save", null, pageContent);
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
		if ($(`.itemProjectTableBody tr`).length == 1 && $(`.itemTableBody tr`).length == 1) {
			const projectItemID = $(`[name="itemID"][project="true"]`).val();
			const companyItemID = $(`[name="itemID"][]`).val();
			flag = !(projectItemID == "0" && companyItemID == "0");
			// flag = !(projectItemID == companyItemID);
		}

		if (!flag) {
			showNotification("warning2", "Cannot submit form, kindly input valid items.");
		}
		return flag;
	}
	// ----- END VALIDATE TABLE -----

	function removeValidTableRow(elementID = null){
		if(elementID){
			$(elementID).find(".validated, .is-valid, .no-error").removeClass("validated")
			.removeClass("is-valid").removeClass("no-error");	
			
		}
	}

	function validateInventoryRequestForm(){
		let returnData 	= true;
		let flagItems 	= 0;
		let flagAssets	= 0
		$(".table-row-request-item").each(function(i, obj){
			let itemID  = 	$(this).find("[name=itemID]").val();
			if(!itemID){
				flagItems ++;
			}
		});

		$(".table-row-request-asset").each(function(i, obj){
			let assetID  = 	$(this).find("[name=assetID]").val();
			if(!assetID){
				flagAssets ++;
			}
		});

		if(flagItems > 0 && flagAssets > 0){
			showNotification("warning2", "Form cannot be submitted, input a value on one of the sectoins.");
			returnData = false;
		}

		return returnData;
		
	}
	
    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            			= decryptString($(this).attr("materialRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise        			= $(this).attr("revise") == "true";
		const validate      			= validateForm("form_material_request");
		removeValidTableRow(`#tableRequestItems`);
		removeValidTableRow(`#tableRequestAsset`);

		const validateTables 			= validateInventoryRequestForm();
		if(validateTables){
			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getMaterialRequestData(action, "submit", "1", id);

				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("reviseMaterialRequestID", id);
						data.delete("materialRequestID");
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
						moduleID:                137,
						notificationTitle:       "Inventory Requisition",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}

				saveMaterialRequest(data, "submit", notificationData, pageContent);
			}
		}
			


	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("materialRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getMaterialRequestData(action, "cancelform", "4", id, status);

		saveMaterialRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----

	// function insertToIVR(materialRequestID = null){
	// 	if(materialRequestID){
	// 		$.ajax({
	// 			method:  "POST",
	// 			url:     `material_request/insertToIVR`,
	// 			data:	{materialRequestID},
	// 			async:   false,
	// 			dataType:    "json",
	// 			beforeSend: function() {
	// 				$("#loader").show();
	// 			},
	// 			success: function(data) {
	// 				result = data;
	// 			},
	// 			error: function() {
	// 				setTimeout(() => {
	// 					$("#loader").hide();
	// 					showNotification("danger", "System error: Please contact the system administrator for assistance!");
	// 				}, 500);
	// 			}
	// 		});
	// 	}
	// }

    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("materialRequestID"));
		const feedback = $(this).attr("code") || getFormCode("IRF", dateToday(), id);
		let tableData  = getTableData("ims_material_request_tbl", "", "materialRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getMaterialRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                137,
					tableID:                 id,
					notificationTitle:       "Inventory Requisition",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                137,
					tableID:                 id,
					notificationTitle:       "Inventory Requisition",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("materialRequestStatus", status);

			saveMaterialRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("materialRequestID"));
		const feedback = $(this).attr("code") || getFormCode("IRF", dateToday(), id);

		$("#modal_material_request_content").html(preloader);
		$("#modal_material_request .page-title").text("DENY INVENTORY REQUISITION");
		$("#modal_material_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:]['][''][-][_][()][%][&][*][ ]"
					minlength="2"
					maxlength="250"
					id="materialRequestRemarks"
					name="materialRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-materialRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			materialRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_material_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("materialRequestID"));
		const feedback = $(this).attr("code") || getFormCode("IRF", dateToday(), id);

		const validate = validateForm("modal_material_request");
		if (validate) {
			let tableData = getTableData("ims_material_request_tbl", "", "materialRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("materialRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("materialRequestRemarks", $("[name=materialRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                137,
					tableID: 				 id,
					notificationTitle:       "Inventory Requisition",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveMaterialRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("materialRequestID"));
		let data = new FormData;
		data.append("materialRequestID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveMaterialRequest(data, "drop", null, pageContent);
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
	const title = "INVENTORY REQUISITION";
	let swalText, swalImg;

	$("#modal_material_request").text().length > 0 && $("#modal_material_request").modal("hide");

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

function saveMaterialRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `material_request/saveMaterialRequest`,
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
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("IRF", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_material_request").text().length > 0 && $("#modal_material_request").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_material_request").text().length > 0 && $("#modal_material_request").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------