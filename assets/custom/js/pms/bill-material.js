$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(39);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("bill of material");
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
				"pms_bill_material_tbl", 
				"reviseBillMaterialID", 
				"reviseBillMaterialID IS NOT NULL AND billMaterialStatus != 4");
			return revisedDocumentsID.map(item => item.reviseBillMaterialID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("pms_bill_material_tbl", "", "billMaterialID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					billMaterialStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if ((employeeID == "0" ? sessionID : employeeID) != sessionID) {
					isReadOnly = true;
					if (billMaterialStatus == 0 || billMaterialStatus == 4) {
						isAllowed = false;
					}
				} else if ((employeeID == "0" ? sessionID : employeeID) == sessionID) {
					if (billMaterialStatus == 0) {
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
					const isAllowed = isCreateAllowed(39);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}pms/bill_material?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/bill_material?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/bill_material?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/bill_material`);
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

	const generatePhaseMilestoneID = (data = false) =>{
		if(data){
			let replaceData = data;
			// [.] [,] [?] [!] [/] [;] [:] ['] [-] [_] [(] [)] [%] [&] [*] [SPACE]
			// let specialCharArr = [".", ",","?","!","/",";",":","'","-","_","(",")","%","&","*"," ","0","1","2","3","4","5","6","7","8","9"];
			let specialCharArr = [".", ",","?","!","/",";",":","'","-","_","(",")","%","&","*"," "];
			for (let index = 0; index < specialCharArr.length; index++) {
				let tempStr = "";
				tempStr 	= replaceData.replaceAll(specialCharArr[index], "-") || replaceData;
				replaceData = tempStr;
			}
			return replaceData;
		}
	};

	// ----- END GLOBAL VARIABLE - REUSABLE ----- 
	let getPhaseData, getAssetData, getVehicleData, getOtherData;
	
	function getPhaseAndMilestoneData(timelineBuilderID = null, costEstimateID = null, billMaterialID = null){
			let result = {};
			getPhaseData = [], getAssetData = [], getVehicleData = [], getOtherData = [];
			$.ajax({
				method:  "POST",
				url:     `bill_material/getPhaseAndMilestoneData`,
				data:	 {timelineBuilderID, costEstimateID ,billMaterialID},
				async:   false,
				dataType:    "json",
				beforeSend: function() {
					// $("#loader").show();
				},
				success: function(data) {
					data["phase"].map(x=>{
						getPhaseData.push(x);
					});
					data["asset"].map(x=>{
						getAssetData.push(x);
					});
					data["vehicle"].map(x=>{
						getVehicleData.push(x);
					});
					data["other"].map(x=>{
						getOtherData.push(x);
					});
				},
				error: function() {
					setTimeout(() => {
						// $("#loader").hide();
						showNotification("danger", "System error: Please contact the system administrator for assistance!");
					}, 500);
				}
			});
			
	}
	
    // ----- DATATABLES -----
	function initDataTables() {
		
		const activateDatatable = (elementID = null, options = {}, param = "id") => {
			let thisElement = param == "id" ? `#${elementID}` : `.${elementID}`; 
			if ($.fn.DataTable.isDataTable(thisElement)) {
				$(thisElement).DataTable().destroy();
			}
			var table = $(thisElement)
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

		const bodyOptionItems = (isReadOnly = false) => {
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
			let column =  	[
								{ targets: 0,  width: 100 },
								{ targets: 1,  width: 150 },
								{ targets: 2,  width: 150 },
								{ targets: 3,  width: 100 },
								{ targets: 4,  width: 80 },
								{ targets: 5,  width: 180 },
								{ targets: 6,  width: 100 },
								{ targets: 7,  width: 100 }
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
			let column = [
							{ targets: 0,  width: 100 },
							{ targets: 1,  width: 200 },
							{ targets: 2,  width: 150 },
							{ targets: 3,  width: 100 },
							{ targets: 4,  width: 100 },
							{ targets: 5,  width: 100 },
							{ targets: 6,  width: 200 },
							{ targets: 7,  width: 150 },
							{ targets: 8,  width: 150 }
						];
			
			option["columnDefs"] = column;
			return option;
		};

		const bodyOptionVehicle = (isReadOnly = false) => {
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
			let column = [
											{ targets: 0,  width: 100 },
											{ targets: 1,  width: 120 },
											{ targets: 2,  width: 100 },
											{ targets: 3,  width: 100 },
											{ targets: 4,  width: 100 },
											{ targets: 5,  width: 200 },
											{ targets: 6,  width: 180 },
											{ targets: 7,  width: 110 },
											{ targets: 8,  width: 110 },
									 	];
			
			option["columnDefs"] = column;
			return option;
		};

		const bodyOptionOther = (isReadOnly = false) => {
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
			let column =  	[
								{ targets: 0,  width: 100 },
								{ targets: 1,  width: 900 },
								{ targets: 2,  width: 200}
							];
			option["columnDefs"] = column;
			return option;
		};

		const bodyOptionProjectMilestone = (isPersonnel = false) => {
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

			let column = !isPersonnel ? [
											{ targets: 0,  width: 200 },
											{ targets: 1,  width: 230 }
										]
											:
										[
											{ targets: 0,  width: 120 },
											{ targets: 1,  width: 120 },
											{ targets: 2,  width: 80 },
											{ targets: 3,  width: 100 },
											{ targets: 4,  width: 100 },
											{ targets: 5,  width: 100 },
											{ targets: 6,  width: 100 },
											{ targets: 7,  width: 150 },
											{ targets: 8,  width: 150 }
										];
			option["columnDefs"] = column;
			return option;
		};

		["tableForApproval", "tableMyForms"].map(id => activateDatatable(id, headerOptions));

		$(`.inventory-request`).each(function() {
			let elementID 	= $(this).attr("id");
			let readOnly  	= $(this).attr("isReadOnly") == "true";
			let option;
			switch (elementID) {
				case "tableRequestOther":
					option 	= bodyOptionOther(readOnly);
					break;
				case "tableRequestAsset":
					option 	= bodyOptionAsset(readOnly);
					break;
				case "tableRequestVehicle":
					option 	= bodyOptionVehicle(readOnly);
					break;
				default:
					option 	= bodyOptionItems(readOnly);
					break;
			}
			activateDatatable(elementID, option);
		});
		// // project-phase-milestone-table"
		// table-row-request-personnel
		activateDatatable("project-phase-milestone-table", bodyOptionProjectMilestone(), "class");
		activateDatatable("personnel-request", bodyOptionProjectMilestone(true), "class");
		
		
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_bill_material_tbl", "approversID")) {
				let count = getCountForApproval("pms_bill_material_tbl", "billMaterialStatus");
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
			if (isCreateAllowed(39)) {
				// html = `
				// <button type="button" 
				// 	class="btn btn-default btn-add" 
				// 	id="btnAdd">
				// 	<i class="icon-plus"></i> ${text}
				// </button>`;
				html = ``;
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
		let billMaterialData = getTableData(
			`pms_bill_material_tbl AS pcet 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"pcet.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pcet.createdAt AS dateCreated",
			`pcet.employeeID != ${sessionID} AND billMaterialStatus != 0 AND billMaterialStatus != 4`,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcet.submittedAt, pcet.createdAt)`
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

		billMaterialData.map((data) => {
			let {
				fullname,
				billMaterialID,
                reviseBillMaterialID,
                billMaterialCode,
				costEstimateCode,
                employeeID,
                timelineBuilderID,
				timelineDesign,
                projectCode,
                projectName,
                projectCategory,
                clientCode,
                clientName,
                clientAddress,
                approversID,
                approversStatus,
                approversDate,
                billMaterialStatus,
                billMaterialReason,
                billMaterialRemarks,
                submittedAt,
                createdBy,
                updatedBy,
                createdAt,
                updatedAt
			} = data;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
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
													
			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";

			if (isImCurrentApprover(approversID, approversDate, billMaterialStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(billMaterialID)}">
					<td>${getFormCode("BOM", createdAt, billMaterialID )}</td>
					<td>${fullname}</td>
					<td>${costEstimateCode || '-'}</td>
					<td>
						${projectDescription}
					</td>
					<td>
						${clientDescription}
                    </td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(billMaterialStatus, true)}
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
		let billMaterialData = getTableData(
			`pms_bill_material_tbl AS pcet 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"pcet.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pcet.createdAt AS dateCreated, pcet.createdAt AS ceCreatedAt",
			`pcet.employeeID = ${sessionID} OR pcet.employeeID = '0' `,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcet.submittedAt, pcet.createdAt)`
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

		billMaterialData.map((item) => {
			let {
				fullname,
				billMaterialID,
                reviseBillMaterialID,
                billMaterialCode,
                costEstimateID,
                costEstimateCode,
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
                billMaterialStatus,
                billMaterialReason,
                billMaterialRemarks,
                submittedAt,
                createdBy,
                updatedBy,
                createdAt,
                updatedAt
			} = item;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = billMaterialStatus != "0" ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
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
													
			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";
			html += `
            <tr class="${btnClass}" id="${encryptString(billMaterialID )}">
                	<td>${getFormCode("BOM", createdAt, billMaterialID )}</td>
					<td>${fullname || "-"}</td>
					<td>${costEstimateCode || '-'}</td>
					<td>
						${projectDescription}
					</td>
					<td>
                        ${clientDescription}
                    </td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(billMaterialStatus, true)}
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
				billMaterialID     = "",
				billMaterialStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];
			employeeID = employeeID == "0" ? sessionID : employeeID;
			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (billMaterialStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("BOM", createdAt, billMaterialID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (billMaterialStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (billMaterialStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("BOM", createdAt, billMaterialID)}"
						status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (billMaterialStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(billMaterialID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (billMaterialStatus == 4) {
					// CANCELLED - FOR REVISE
					// const data = getTableData(
					// 	`pms_bill_material_tbl`,
					// 	`billMaterialID`,
					// 	`billMaterialID = ${billMaterialID}`,
					// );
					// const { billMaterialID } = data && data[0];
					// const isAllowedForRevise = getTableDataLength(
					// 	`pms_bill_material_tbl`,
					// 	`billMaterialID`,
					// 	`billMaterialStatus <> 3 AND billMaterialStatus <> 4 AND billMaterialID = ${billMaterialID}`
					// );

					if (!isDocumentRevised(billMaterialID) ) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (billMaterialStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("BOM", createdAt, billMaterialID)}"><i class="fas fa-ban"></i> 
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
		const createdBOMList = getTableData("pms_bill_material_tbl", "billMaterialID", "billMaterialStatus <> 3 AND billMaterialStatus <> 4").map(bom => bom.billMaterialID);
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
	function updateTableAttr() {
		// UPDATING THE PROJECT TABLE
		
		$(".table-body-inventory-request-item").each(function(i,ob){
			let thisExtension 			= $(this).attr("invcategory");
			let milestoneBuilderID		= $(this).attr("milestonebuilderid"); 
			let phaseDescription		= $(this).attr("phasedescription");	
			let milestoneListID			= $(this).attr("milestonelistid");
			let projectMilestoneID		= $(this).attr("milestonelistid");
			let projectMilestoneName	= $(this).attr("projectmilestonename");
			let requestItemTR 			= $(this).find(`.table-row-request-${thisExtension}`);

			requestItemTR.each(function(i,obj){
				// ROW ID 
				$(this).attr("id", `tableRow${thisExtension}${i}`);
				$(this).attr("itemIndex", `${i}`);
	
				// CHECKBOX
				$(`td .checkboxrow-item`, this).attr("id",`checkboxrow${thisExtension}${i}`);
	
				// SELECT
				$(this).find("select").each(function(x) {
					if ($(this).hasClass("select2-hidden-accessible")) {
						$(this).select2("destroy");
					}
				});
	
				$(this).find("select").each(function(j) {
					$(this).attr("index", `${i}`);
					$(this).attr("id", `select${thisExtension}ID${i}`);
					$(this).attr("data-select2-id", `select${thisExtension}ID${i}`);
					if (!$(this).hasClass("select2-hidden-accessible")) {
						$(this).select2({ theme: "bootstrap" });
					}
				});
	
				// QUANTITY
				$(`td [name=itemQuantity]`, this).attr("id", `quantity${thisExtension}ID${i}`);
				$(`td [name=itemQuantity]`, this).next().attr("id", `invalid-quantity${thisExtension}}ID${i}`);
	
				// REMARKS
				$(`td [name=itemRemarks]`, this).attr("id", `invalid-remarks${thisExtension}ID${i}`);
				$(`td [name=itemRemarks]`, this).next().attr("id", `invalid-remarks${thisExtension}ID${i}`);
			});

		});

		// END UPDATING THE PROJECT TABLE
		// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// UPDATING THE ASSET TABLE
		$(`.table-row-request-asset`).each(function(i,obj){
			// ROW ID 
			$(this).attr("id", `tableRowAsset${i}`);
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
		// END UPDATING THE ASSET TABLE
		// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// UPDATING THE VEHICLE TABLE
		$(".table-row-request-vehicle").each(function(i){
			// ROW ID
			$(this).attr("id", `tableRowVehicle${i}`);
			$(this).attr(`vehicleIndex`, i);
			// CHECK BOX
			$(this).find(".checkboxrow-vehicle").attr("id", `checkboxrowVehicle${i}`);
			// SELECT
			$(this).find(`[name=vehicleID]`).attr("id", `selectVehicleID${i}`);
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			});
			$(this).find("select").each(function(j) {
				$(this).attr("index", `${i}`);
				$(this).attr("id", `selectVehicleID${i}`);
				$(this).attr("data-select2-id", `selectVehicleID${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});
			// QUANTITY
			$(this).find(`.input-vehicle-quantity`).attr("id",`quantityVehicleID${i}`);
			$(this).find(`.input-vehicle-quantity`).next().attr("id",`invalid-quantityVehicleID${i}`);

			// MANHOURS
			$(this).find(`.input-vehicle-manhours`).attr("id",`manhourVehicleID${i}`);
			$(this).find(`.input-vehicle-manhours`).next().attr("id",`invalid-manhourVehicleID${i}`);
			
			// DATE RANGE
			$(this).find("[name=vehicleDateToUse]").attr("id",`vehicleDateToUse${i}`);
			let vehicleDateToUse = $(`#vehicleDateToUse${i}`).val();
			if(vehicleDateToUse){
				let dateSplit 		 = vehicleDateToUse.split(" - ");
				let startDate 		 = moment(dateSplit[0]).format("MMMM DD, YYYY");
				let endDate 		 = moment(dateSplit[1]).format("MMMM DD, YYYY"); 	
					// INITIALIZE DATERANGE
						$(`#vehicleDateToUse${i}`).daterangepicker({
								singleDatePicker: false,
								showDropdowns: true,
								autoApply: true,
								startDate: startDate,
								endDate: endDate,
								locale: {
									format: 'MMMM DD, YYYY'
								},
						});
			}
		});
		// END UPDATING THE VEHICLE TABLE
		// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		$(`.table-row-request-other`).each(function(i,obj){
			// ROW ID 
			$(this).attr("id", `tableRowOther${i}`);
			$(this).attr("assetIndex", `${i}`);

			// CHECKBOX
			$(this).find(`.checkboxrow-other`).attr("id", `checkboxrowOther${i}`);
			
			// INPUT CATEGORY 
			$(`td [name=otherCategory]`, this).attr("id", `invalid-otherCategory${i}`);
			$(`td [name=otherCategory]`, this).next().attr("id", `invalid-otherCategory${i}`);
			// TEXTAREA
			$(`td [name=otherDescription]`, this).attr("id", `invalid-otherDescription${i}`);
			$(`td [name=otherDescription]`, this).next().attr("id", `invalid-otherDescription${i}`);
			
		

		
		
		});
	}
	// ----- END UPDATE TABLE ITEMS -----
	$(document).on("keyup", "[name=fuelRate]", function(){
		let thisTR 					= $(this).closest("tr");
		let fuelRateText 			= $(this).val();
		let replaceFuelRate			= fuelRateText.replaceAll(",","") || fuelRateText;
		let vehicleConsumptionText 	= thisTR.find(".vehicle-consumption").text().replaceAll(",","") || thisTR.find(".vehicle-consumption").text();
		let vehicleConsumption 		= vehicleConsumptionText.replace(" km/L","");
		let vehicleDistance 		= thisTR.find(".vehicle-distance").text().replaceAll(",","") || thisTR.find(".vehicle-distance").text(); 
		let vehicleManHours 		= thisTR.find(".vehicle-manhours").text().replaceAll(",","") || thisTR.find(".vehicle-manhours").text(); 
		let vehicleRate 			= thisTR.find(".vehicle-rate").attr("vehiclerate");
		
		// START THE FUCKING COMPUTATION
		let getLiterNeeded 		= parseFloat(vehicleDistance) / parseFloat(vehicleConsumption);
		let totalFuel 			= parseFloat(getLiterNeeded) * parseFloat(replaceFuelRate || 0);

		let vehicleTotalRate 	= parseFloat(vehicleManHours) * parseFloat(vehicleRate);

		let vehicleTotalCost 	= parseFloat(totalFuel) + parseFloat(vehicleTotalRate);
		console.log(totalFuel);
		
		thisTR.find(".vehicle-total-cost").text(formatAmount(vehicleTotalCost,true));
		// alert(vehicleTotalCost);
		updateCostSummary();

	});
	$(document).on("keyup", "[name=otherTotalCost]", function(){
		updateCostSummary();
	})

	// ----- UPDATE TABLE ITEMS -----
	function updateCostSummary(){
		let materialTotal = 0, laborTotal = 0, equipmentTotal = 0, travelTotal = 0;
		let grandTotal = 0;
		$(".table-body-inventory-request-item").each(function(i,ob){

			let thisCard 			= $(this).closest("table").closest(".card-body").closest(".card-project");
			let thisCardFooter 		= thisCard.find(".footer-total-project");
			let thisExtension 		= $(this).attr("invcategory");
			let requestItemTR 		= $(this).find(`.table-row-request-${thisExtension}`);
			let requestPersonnelTR 	= $(`.table-body-personnel-request-${thisExtension}`).find("tr");
			let thisFooterTotal 	= 0;

			requestItemTR.each(function(){
				let itemTotalCost 	= getNonFormattedAmount($(this).find(".item-total-cost").text());
				thisFooterTotal 	+= parseFloat(itemTotalCost || 0);
				materialTotal		+= parseFloat(itemTotalCost || 0);
			});

			requestPersonnelTR.each(function(){
				$(this).find(".designation-total-manhours").text();
				let personnelTotalCost 	= getNonFormattedAmount($(this).find(".designation-total-cost").text());
				thisFooterTotal 		+= parseFloat(personnelTotalCost || 0);
				laborTotal 				+= parseFloat(personnelTotalCost || 0);
			});

			thisCardFooter.text(formatAmount(thisFooterTotal,true));
			
		});

		//ASSET
		let cardAsset 		= $(".card-asset");
		let cardAssetFooter = cardAsset.find(".footer-total-asset");
		let cardAssetValue 	= 0;
		$(`.table-row-request-asset`).each(function(i,obj){
			let assetTotalCost = $(this).find(".asset-total-cost").text();
			cardAssetValue += parseFloat(getNonFormattedAmount(assetTotalCost || 0));
			equipmentTotal += parseFloat(getNonFormattedAmount(assetTotalCost || 0));
			
		});
		cardAssetFooter.text(formatAmount(cardAssetValue, true))
		
		// VEHICLE
		let cardVehicle 			= $(".card-vehicle");
		let cardVehicleFooter 		= cardVehicle.find(".footer-total-vehicle");
		let cardVehicleFooterValue	= 0;	

		$(".table-row-request-vehicle").each(function(i){
			let vehicleTotalCost	= $(this).find(".vehicle-total-cost").text() || 0;
			cardVehicleFooterValue 	+= parseFloat(getNonFormattedAmount(vehicleTotalCost));
			travelTotal 			+= parseFloat(getNonFormattedAmount(vehicleTotalCost)) || 0;
		});
		cardVehicleFooter.text(formatAmount(cardVehicleFooterValue, true));
		
		// OTHER
		let cardOther 			= $(".card-other");
		let cardOtherFooter 		= cardOther.find(".footer-total-other");
		let cardOtherFooterValue	= 0;
		$(`.table-row-request-other`).each(function(i,obj){
			let otherTotalCost 		= $(this).find("[name=otherTotalCost]").val();
			cardOtherFooterValue 	+= parseFloat(getNonFormattedAmount(otherTotalCost) || 0);
			travelTotal 			+= parseFloat(getNonFormattedAmount(otherTotalCost) || 0);
		});
		cardOtherFooter.text(formatAmount(cardOtherFooterValue||0, true));
		


		$("#materialTotal").text(formatAmount(materialTotal || 0, true));

		$("#laborTotal").text(formatAmount(laborTotal || 0));

		$("#equipmentTotal").text(formatAmount(equipmentTotal || 0));

		$("#travelTotal").text(formatAmount(travelTotal || 0));

		grandTotal = parseFloat(materialTotal) + parseFloat(laborTotal) + parseFloat(equipmentTotal) + parseFloat(travelTotal);
		$("#grandTotalAmount").text(formatAmount(grandTotal, true));

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
		function updateDeleteButton(invCategory) {
			let flag = 0;
			
			$(`.checkboxrow-${invCategory}`).each(function() {
				this.checked && flag++;
			});
			$(`.btnDeleteRow-${invCategory}`).attr("disabled", flag == 0);
		}
		// ----- END UPDATE DELETE BUTTON -----

		// ----- DELETE TABLE ROW -----
		function deleteTableRow(invCategory) {

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
								updateTableAttr();
								
								updateDeleteButton(invCategory);
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
		let tableBody, tableClass, html;
		let category = $(this).attr("invCategory");
	
		switch(category) {
			case "other":
				tableBody	=	"other";
				tableClass	=	"inventory-request-other";
				html 		=	requestOthersRow();
			  break;
			case "asset":
				tableBody	=	"asset";
				tableClass	=	"inventory-request-asset";
				html 		=	requestAssetsRow();
			  break;
			case "vehicle":
				tableBody	=	"vehicle";
				tableClass	=	"inventory-request-vehicle";
				html 		=	requestVehiclesRow();
			break;
			default:
				tableBody	=	category;
				html 		=	requestItemsRow({}, false, category);
		}

		$(`.table-body-inventory-request-${tableBody}`).append(html);
		setTimeout(() => {
			updateTableAttr();
			initAll();
		}, 50);
	});
	// ----- END ADD NEW ROW OF INVENTORY REQUEST -----

	// ----- ADD NEW ROW OF ITEMS -----
	$(document).on("click",".btnSubAddRow", function(){
		let thisTable 		= $(this).closest("table");
		let thisTableBody	= thisTable.find("tbody");
		let html			= requestProjectItemRow();
		thisTableBody.append(html);

		setTimeout(() => {
			updateTableAttr();
			initAll();
		}, 50);
	});
	// ----- END ADD NEW ROW OF ITEMS -----

	// ----- DELETE ROW OF ITEMS -----
	$(document).on("click", ".btnSubDeleteRow", function(){
		let thisTableBody 	= $(this).closest("tbody").find("tr");
		let thisTableRow 	=	$(this).closest("tr");
		if(thisTableBody.length != 1){
			thisTableRow.fadeOut(500, function (){
				$(this).closest("tr").remove();
			});
			setTimeout(() => {
				updateTableAttr();
				initAll();
			}, 50);
		}else{
			showNotification("danger", "You must have atleast one or more items.");
		}
	});
	// ----- END DELETE ROW OF ITEMS -----

	function isLastApprover(approverID = null){
		let result = false;
		if(approverID){
			let arr = approverID.split("|");
			if(arr.pop() == sessionID){
				result  = true;
			}
		}
		return result;
	}

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			fullname,
			billMaterialID,
			reviseBillMaterialID,
			billMaterialCode,
			reviseBillMaterialCode,
			costEstimateID,
			costEstimateCode,
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
			billMaterialStatus,
			billMaterialReason,
			billMaterialRemarks,
			submittedAt,
			dateNeeded,
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
		} = employeeData(data ? (employeeID == "0"? sessionID : employeeID) : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);
		
		// INITIALIZE THE PROJECT PHASE;
			getPhaseAndMilestoneData(timelineBuilderID, costEstimateID ,billMaterialID);
		// END INITIALIZE THE PROJECT PHASE;

		$("#btnBack").attr("billMaterialID", encryptString(billMaterialID));
		$("#btnBack").attr("status", billMaterialStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);
		let requestProjectData 		= []; 
		let requestAssetsData		= getAssetData;
		let requestVehiclesData		= getVehicleData;
		let requestOthersData		= getOtherData;
		
		let reviseDocumentNo    = isRevise ? billMaterialID : reviseBillMaterialID;
		let documentHeaderClass = isRevise || reviseBillMaterialID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBillMaterialID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBillMaterialID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("BOM", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";
		let generateCostSheet = "";
		if (isLastApprover(approversID) || employeeID == sessionID) {
			generateCostSheet = billMaterialStatus == "2" ? `<div class="w-100 text-right pb-4">
																<button class="btn btn-info px-4 py-2" pbrid="${encryptString(billMaterialID)}" ceid="${encryptString(costEstimateID)}" ptbid="${encryptString(timelineBuilderID)}"  id="btnExcel">
																	<i class="fas fa-file-excel"></i>  Download Excel
																</button>
															</div>` :``;
		}
		
		let html = `
        <div class="row px-2">
			${generateCostSheet}
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${billMaterialID && !isRevise ? getFormCode("BOM", createdAt, billMaterialID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${billMaterialStatus && !isRevise ? getStatusStyle(billMaterialStatus) : "---"}
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
								${getDateApproved(billMaterialStatus, approversID, approversDate)}
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
							${billMaterialRemarks && !isRevise ? billMaterialRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_bill_material">

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
					<input type="text" 
						class="form-control" 
						name="referenceInput"
						billMaterialID 				= "${billMaterialID || "-"}"
						billMaterialCode 			= "${billMaterialCode || "-"}"
						reviseBillMaterialID 		= "${reviseBillMaterialID || "-"}"
						reviseBillMaterialCode 		= "${reviseBillMaterialCode || "-"}"
						billMaterialID 				= "${billMaterialID || "-"}"
						billMaterialCode 			= "${billMaterialCode || "-"}"
						disabled 
						value="${timelineBuilderID ? getFormCode("PTB",createdAt, timelineBuilderID) : "-"}">
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
						clientCode="${clientCode||"-"}" 
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
						value = "${moment(dateNeeded).format("MMMM DD, YYYY")}"
						disabled>
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
                        id="billMaterialReason"
                        name="billMaterialReason"
                        rows="4" disabled
                        style="resize:none;"
						${disabled}>${billMaterialReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-billMaterialReason"></div>
                </div>
            </div>

            <div class="col-sm-12" id="request-items-table-content" style="font-size: 85%">
					${projectContent(getPhaseData, costEstimateID, billMaterialID, readOnly)}
            </div>

			<div class="col-sm-12" id="request-assets-table-content" style="font-size: 90%">
					${requestAssetContent(requestAssetsData,costEstimateID, billMaterialID, readOnly)}
            </div>

			<div class="col-sm-12" id="request-vehicle-table-content" style="font-size: 90%">
					${requestVehicleContent(requestVehiclesData,costEstimateID, billMaterialID, readOnly)}
            </div>

			<div class="col-sm-12" id="request-other-table-content" style="font-size: 90%">
					${requestOtherContent(requestOthersData,costEstimateID, billMaterialID, readOnly)}
            </div>

			<div class="col-12" id="costSummary">
				<div class="row py-2">
					<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pb-2 pt-3">
						<div class="row" style="font-size: 1.1rem">
							<div class="col-6 col-lg-7 text-left">Materials: </div>
							<div class="col-6 col-lg-5 text-right text-dark"
								style="font-size: 1.05em"
								id="materialTotal">
								${formatAmount(0, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem">
							<div class="col-6 col-lg-7 text-left">Labor: </div>
							<div class="col-6 col-lg-5 text-right text-dark"
								style="font-size: 1.05em"
								id="laborTotal">
								${formatAmount(0, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem">
							<div class="col-6 col-lg-7 text-left">Overhead:</div>
							<div class="col-6 col-lg-5 text-right text-dark"></div>
						</div>
						<div class="row" style="font-size: 1.1rem">
							<div class="col-1"></div>
							<div class="col-5 col-lg-6 text-left">Equipment: </div>
							<div class="col-6 col-lg-5 text-right text-dark"
								style="font-size: 1.05em"
								id="equipmentTotal">
								${formatAmount(0, true)}
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem">
							<div class="col-1"></div>
							<div class="col-5 col-lg-6 text-left">Travel: </div>
							<div class="col-6 col-lg-5 text-right text-dark"
								style="font-size: 1.05em"
								id="travelTotal">
								${formatAmount(0, true)}
							</div>
						</div>
						
						<div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
							<div class="col-6 col-lg-7 text-left font-weight-bolder">Grand Total:</div>
							<div class="col-6 col-lg-5 text-right text-danger font-weight-bolder"
								id="grandTotalAmount"
								style="font-size: 1.3em">
								${formatAmount(0, true)}
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
			// $("#loader").hide();
			initDataTables();
			updateTableAttr();
			initAll();
			updateCostSummary();
			// daterange-vehicle
			// singleDatePicker: true,
				// $(`.daterange-vehicle`).daterangepicker({
				// 	singleDatePicker: false,
				// 	showDropdowns: true,
				// 	autoApply: true,
				// 	locale: {
				// 		format: 'MMMM DD, YYYY'
				// 	},
				// });
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
		}, 800);
	}
	// ----- END FORM CONTENT -----


	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GETTING ALL PROJECT INFORMATIONS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		// ----- GET REQUEST PROJECT CONTENT -----
		function projectContent(data = false, costEstimateID = null, billMaterialID = null, readOnly = false){
			let html = ``;
			data.map(phase=>{
				let milestoneHtml = ``;
					phase["milestone"].map(milestone=>{
						milestoneHtml += getMilestoneData(milestone, billMaterialID, phase.phaseDescription, readOnly);
					});
				html += 	`
						<div class="card">
							<div class="card-header bg-primary text-white">
								<div class="row">
									<div class="col-md-6 col-sm-12 text-left">
										<h5 style="font-weight: bold;
											letter-spacing: 0.05rem;">${phase.phaseDescription}</h5>
									</div>
									<div class="col-md-6 col-sm-12 text-right"></div>
								</div>
							</div>
							<div class="card-body get-phase-data" 	
								phaseid="${phase.phaseID}" 
								phasedescription="${phase.phaseDescription}" 
								milestonelistid="${phase.phaseID}}">
								${milestoneHtml}
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
			});

			
			return html;
		}
		// ----- END GET REQUEST PROJECT CONTENT -----

		// ----- GET MILESTONE DATA -----
		function getMilestoneData(milestoneData = false, billMaterialID = null, phaseDescription = null, readOnly = false){
			let {
				milestoneBuilderID 		= "",
				milestoneListID 		= "",
				projectMilestoneName 	= "",
				items 					= false,
				personnel 				= false
			} = milestoneData
			let replacePhaseDescription 	= phaseDescription.replaceAll(" ","") || phaseDescription;
			let replaceProjectMilestoneName = projectMilestoneName.replaceAll(" ", "") || projectMilestoneName;
			let invCategory 				= generatePhaseMilestoneID(replacePhaseDescription).toLowerCase()+"-"+ generatePhaseMilestoneID(replaceProjectMilestoneName).toLowerCase();
			let html = `
						<div class="card card-project">
							<div class="card-header bg-primary text-white">
								<div class="row">
									<div class="col-md-6 col-sm-12 text-left">
										<h5 style="font-weight: bold; font-size:90%;
											letter-spacing: 0.05rem;">${projectMilestoneName}</h5>
									</div>
									<div class="col-md-6 col-sm-12 text-right"></div>
								</div>
							</div>
							<div class="card-body" style="font-size:90%">
								<table class="table project-phase-milestone-table">
									<thead>
										<tr>
											<th>ITEMS</th>
											<th>PERSONNEL</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-item" 
										invcategory="${invCategory}" milestonebuilderid="${milestoneBuilderID}" phasedescription="${phaseDescription}" milestonelistid="${milestoneListID}" projectmilestonename="${projectMilestoneName}"
									>
										<tr>
											<td style="height: 50px; vertical-align: top;" 
												projectMilestoneID=${milestoneListID}" projectMilestoneName="${projectMilestoneName}"
											>${requestItemsContent(items, billMaterialID, readOnly, invCategory)}</td>
											<td style="height: 50px; vertical-align: top;">${requestPersonnelContent(personnel, billMaterialID, readOnly, invCategory)}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="card-footer">
								<div class="row">
									<div class="col-md-6 col-sm-12 text-left">
										Total
									</div>
									<div class="col-md-6 col-sm-12 text-right text-danger font-weight-bold footer-total-project">
										${formatAmount(0, true)}
									</div>
								</div>
							</div>
	
						</div>
						`;
			return html;
		}
		// ----- END GET MILESTONE DATA -----

		// ----- GET REQUEST ITEMS CONTENT -----
		function requestItemsContent(data = false, billMaterialID = null, readOnly = false, paramAttr = null){
			let invCategory 	=  generatePhaseMilestoneID(paramAttr);
			let tableBodyData 	= readOnly ? `` :  requestItemsRow(data, readOnly, invCategory.toLowerCase());

			if(data){
				if(data.length > 0){
					tableBodyData = "";
					data.map(items=>{
						tableBodyData +=  requestItemsRow(items, readOnly, invCategory.toLowerCase());
					});
				}
			}
			let html = `
							<div class="w-100 request-items-content">
								<table class="table table-hover table-striped inventory-request" id="${invCategory.toLowerCase()}"  isReadOnly="${readOnly}">
									<thead>
										<tr>
											<th>Item Code</th>
											<th>Item Name</th>
											<th>Item Classification</th>
											<th>UOM</th>
											<th>Quantity</th>
											<th>Remarks</th>
											<th>Unit Cost</th>
											<th>Total Cost</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-${invCategory.toLowerCase()}"  >
										${tableBodyData}
									</tbody>
								</table>
							</div>
						`;
			return html;
		}
		// ----- END GET REQUEST ITEMS CONTENT -----
		
		// ----- GET REQUEST ITEM ROW -----
		function requestItemsRow(data = false, readOnly = false, paramAttr = null){
			let invCategory 	= paramAttr ? (paramAttr.replaceAll(" ","") || paramAttr) : ``;

			let html = "";
			let {
				requestItemID			=	"",
				billMaterialID			=	"",
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
			}  = data[0] || data;
		
			html = `	<tr class="table-row-request-${invCategory.toLowerCase()}" requestitemid="${requestItemID}" unitcost="${unitCost}">
							<td>
								<div class="item-code">${itemCode || "-" }</div>
							</td>

							<td>
								<div class="form-group mb-0 item-name" itemid="${itemID}">
									${itemName}
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
									${formatAmount(requestQuantity)}
									<div class="text-left invalid-feedback d-block" id="invalid-quantityItemID"></div>
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-left">
									${remarks}
									<div class="d-block invalid-feedback" id="invalid-remarksItemID"></div>
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-right">
									<div class="item-unit-cost">${formatAmount(unitCost, true)}</div>
									<div class="d-block invalid-feedback" id="invalid-remarksItemID"></div>
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-right">
									<div class="item-total-cost">${formatAmount((totalCost || parseFloat(requestQuantity) * parseFloat(unitCost)) || 0, true)}</div>
									<div class="d-block invalid-feedback" id="invalid-remarksItemID"></div>
								</div>
							</td>
						</tr>`;

			return html;
		}
		// ----- END GET REQUEST ITEM ROW -----

		// ----- GET REQUEST ITEMS CONTENT -----
		function requestPersonnelContent(data = false, billMaterialID = null, readOnly = false, paramAttr = null){
			let invCategory 	= paramAttr;
			let tableBodyData 	= requestPersonnelRow(data, readOnly, invCategory.toLowerCase()); 

			let html = `
							<div class="w-100 request-items-content">
								<table class="table table-hover table-striped personnel-request" id="${invCategory}"  isReadOnly="${readOnly}">
									<thead>
										<tr>
											<th>Designation Code</th>
											<th>Designation Name</th>
											<th>Quantity</th>
											<th>Hourly Rate</th>
											<th>Total Regular Hours</th>
											<th>Total Overtime Hours</th>
											<th>Total Regular Rate</th>
											<th>Total Overtime Rate</th>
											<th>Total Cost</th>
										</tr>
									</thead>
									<tbody class="table-body-personnel-request-${invCategory}">
										${tableBodyData}
									</tbody>
								</table>
								<div class="d-flex flex-column justify-content-start text-left">
									<div></div>
								</div>
							</div>
						`;
			return html;
		}
		// ----- END GET REQUEST ITEMS CONTENT -----
		
		// ----- GET REQUEST ITEM ROW -----
		function requestPersonnelRow(data = {}, readOnly = false, paramAttr = null){
			let invCategory 	= paramAttr;

			let html = "";
			data.map(designation=>{
				let {
				
					personnelRequestID			=	"",
					billMaterialID 				=	"",
					costEstimateID 				=	"",
					billMaterialCode 			=	"",
					costEstimateCode 			=	"",
					milestoneBuilderID			=	"",
					phaseDescription			=	"",			
					milestoneListID				=	"",
					projectMilestoneID			=	"",
					projectMilestoneName		=	"",
					designationID				=	"",
					designationCode 			=	"",
					designationName 			=	"",
					designationCategory 		=	"",
					designationQuantity 		=	"",
					designationTotalManHours	= 	"",
					designationTotalOvertime	= 	"",
					overtimeRate				= 	"",
					regularRate					= 	"",
					unitCost 					=	"",
					totalCost 					=	"",
					createdBy					=	"",
					updatedBy					=	"",
					createdAt 					=	"",
					updatedAt 					=	"" 
			}  = designation;
			html += `	<tr class="table-row-request-personnel-${invCategory}">
							<td>
								<div class="designation-code" designationid="${designationID}">${designationCode || "-" }</div>
							</td>
							<td>
								<div class="designation-name">${designationName || "-"}</div>
							</td>
							<td>
								<div class="text-center designation-quantity">
										${formatAmount(designationQuantity) || "-"}
								</div>
							</td>
							<td>
								<div class="text-right designation-hourly-rate">
										${formatAmount(unitCost,true) || "-"}
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-right designation-total-manhours">
									${formatAmount(designationTotalManHours) || "-"}
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-right designation-total-overtime">
									${formatAmount(designationTotalOvertime || "0.00")}
								</div>
							</td>

							<td>
								<div class="form-group mb-0 text-right designation-total-manhours-rate">
									${formatAmount(regularRate || "0.00", true)}
								</div>
							</td>

							<td>
								<div class="form-group mb-0 text-right designation-total-overtime-rate">
									${formatAmount(overtimeRate || "0.00", true)}
								</div>
							</td>

							<td>
								<div class="form-group mb-0 text-right designation-total-cost">
									${formatAmount(totalCost || "0.00", true)}
								</div>
							</td>
						</tr>`;
			});

			return html;
		}
		// ----- END GET REQUEST ITEM ROW -----

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++END GETTING ALL PROJECT INFORMATIONS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




	// ----- GET REQUEST ASSETS CONTENT -----
	function requestAssetContent(data = false, costEstimateID = null, billMaterialID = null, readOnly = false){

		let tableBodyData = readOnly ? `` :  requestAssetsRow(data, readOnly);
	
		if(data){
			if(data.length > 0){
				tableBodyData = "";
				data.map(asset=>{
					tableBodyData +=  requestAssetsRow(asset, readOnly);
				});
			}
		}

		let html = 	`
					<div class="card card-asset">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">ASSET AND EQUIPMENT</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover table-striped  inventory-request" id="tableRequestAsset" isReadOnly="${readOnly}">
									<thead>
										<tr>
											<th>Asset Code</th>
											<th>Asset Name</th>
											<th>Asset Classification</th>
											<th>UOM</th>
											<th>Quantity</th>
											<th>Man Hours</th>
											<th>Remarks</th>
											<th>Unit Cost</th>
											<th>Total Cost</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-asset">
										${tableBodyData}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									Total
								</div>
								<div class="col-md-6 col-sm-12 text-right text-danger font-weight-bold footer-total-asset">
									${formatAmount(0, true)}
								</div>
							</div>
						</div>

					</div>
					`;
		return html;
	}
	// ----- GET REQUEST ASSETS CONTENT -----

	// ----- GET REQUEST VEHICLE CONTENT -----
	function requestVehicleContent(data = false, costEstimateID = null, billMaterialID = null, readOnly = false){

		let tableBodyData = data.length < 1 ? `` : requestVehiclesRow(data, readOnly);

		if(data){
			if(data.length > 0){
				tableBodyData = "";
				data.map(asset=>{
					tableBodyData +=  requestVehiclesRow(asset, readOnly);
				});
			}
		}

		let html = `
					<div class="card card-vehicle">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">VEHICLE</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover table-striped  inventory-request" id="tableRequestVehicle" isReadOnly="${readOnly}">
									<thead>
										<tr>
											<th>Vehicle Code</th>
											<th>Vehicle Name</th>
											<th>Average Fuel Type</th>
											<th>Distance (in km)</th>
											<th>Man Hours</th>
											<th>Days to Use</th>
											<th>Fuel Volume x Fuel Rate</th>
											<th>Vehicle Rate</th>
											<th>Total Cost</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-vehicle">
										${tableBodyData}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									Total
								</div>
								<div class="col-md-6 col-sm-12 text-right text-danger font-weight-bold footer-total-vehicle">
									${formatAmount(0, true)}
								</div>
							</div>
						</div>

					</div>
					`;
		return html;
	}
	// ----- GET REQUEST VEHICLE CONTENT -----

	// ----- GET REQUEST VEHICLE CONTENT -----
	function requestOtherContent(data = false, costEstimateID = null, billMaterialID = null, readOnly = false){

		let tableBodyData = data.length < 1 ? `` : requestOthersRow(data, readOnly); 
		if(data){
			if(data.length > 0){
				tableBodyData = "";
				data.map(asset=>{
					tableBodyData +=  requestOthersRow(asset, readOnly);
				});
			}
		}
		
		// TABLE ROW

		let html = `
					<div class="card card-other">
						<div class="card-header bg-primary text-white">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									<h5 style="font-weight: bold;
										letter-spacing: 0.05rem;">OTHERS</h5>
								</div>
								<div class="col-md-6 col-sm-12 text-right"></div>
							</div>
						</div>
						<div class="card-body">
							<div class="w-100 request-items-content">
								<table class="table table-hover table-striped inventory-request" id="tableRequestOther" isReadOnly="${readOnly}">
									<thead>
										<tr>
											<th>Category</th>
											<th>Description</th>
											<th>Total Cost</th>
										</tr>
									</thead>
									<tbody class="table-body-inventory-request-other">
										${tableBodyData}
									</tbody>
								</table>
							</div>
						</div>
						<div class="card-footer">
							<div class="row">
								<div class="col-md-6 col-sm-12 text-left">
									Total
								</div>
								<div class="col-md-6 col-sm-12 text-right text-danger font-weight-bold footer-total-other">
									${formatAmount(0, true)}
								</div>
							</div>
						</div>

					</div>
					`;
		return html;
	}
	// ----- GET REQUEST VEHICLE CONTENT -----








	// ----- GET PROJECT TABLE ROW -----
	function requestProjectItemRow(data = {} , readOnly = false){
		let {
			phaseID 				=	"",
			phaseDescription 		=	"",

			billMaterialID			=	"",
			costEstimateID 			=  	"",
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

			requestItemID  			=	"",
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

		let disabled 	 = readOnly ? "disabled" : "";
		let requiredAttr = !readOnly && billMaterialID ? `required min="0.01" minlength="1" maxlength="20"` : ``;
			let html = `<tr class="table-row-request-item">
							<td>
								<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>
							</td>
							<td>
								<div class="item-code" requestitemid="${requestItemID}">${itemCode || "-" }</div>
							</td>

							<td>
								<div class="form-group mb-0">
									${!readOnly ? `<select class="form-control validate select2" style="width:300px !important"
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
									${disabled}
									${requiredAttr}
									value="${sumRequestQuantity || "0.00"}">` : sumRequestQuantity}
									<div class="text-left invalid-feedback d-block" id="invalid-quantityItemID"></div>
								</div>
							</td>
							<td>
								<div class="form-group mb-0 text-right">
									${!readOnly ? `<textarea 
									rows="2" 
									style="resize: none" 
									class="form-control validate" 
									data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
									minlength="1"
									maxlength="100"
									${disabled}
									name="itemRemarks">${remarks || ""}</textarea>` : remarks}
									<div class="d-block invalid-feedback" id="invalid-remarksItemID"></div>
								</div>
							</td>
						</tr>`;
			return html;

	}
	// ----- END GET PROJECT TABLE ROW -----

	// ----- GET ASSET TABLE ROW -----
	function requestAssetsRow(data = false, readOnly = false){
		let html = "";

		let {
			requestAssetID				=	"",
			billMaterialID				=	"",
			costEstimateID				=	"",
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
			
		}  = data[0] || data;
		let disabled 	 = readOnly ? "disabled" : "";
		html = `	<tr class="table-row-request-asset"  requestassetid="${requestAssetID}">
						
						<td><div class="asset-code">${assetCode || "-"}</div></td>
						<td>
							<div class="form-group mb-0 asset-name" assetid="${assetID}">
								${assetName}
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
								${requestQuantity}
								<div class="invalid-feedback d-block" id="invalid"></div>
							</div>
						</td>
						<td>
							<div class="asset-manhours text-center">
								${requestManHours}
								<div class="invalid-feedback d-block" id="invalid"></div>
							</div>
						</td>
						<td>
							<div class="form-group mb-0 text-right asset-remarks">
								${remarks}
								<div class="d-block invalid-feedback"></div>
							</div>
						</td>
						<td>
							<div class="form-group mb-0 text-right asset-remarks">
								<div class="asset-unitcost">${formatAmount(hourlyRate, true)}</div>
								<div class="d-block invalid-feedback"></div>
							</div>
						</td>
						<td>
							<div class="form-group mb-0 text-right asset-remarks">
								<div class="asset-total-cost">${formatAmount( ((parseFloat(requestManHours) * parseFloat(hourlyRate)) * parseFloat(requestQuantity)) || "0.00"  ,true)}</div>
								<div class="d-block invalid-feedback"></div>
							</div>
						</td>
					</tr>`;
		
		return html;

	}
	// ----- END GET ASSET TABLE ROW -----

	// ----- GET VEHICLE TABLE ROW -----
	function requestVehiclesRow(data = {}, readOnly = false){
		let {
				travelRequestID			=	"",
				billMaterialID			=	"",
				costEstimateID			=	"",
				billMaterialCode		=	"",
				costEstimateCode 		=	"",
				travelType				=	"",
				vehicleID				=	"",
				vehicleCode 			=	"",
				vehicleName 			=	"",
				vehiclePlateNumber 		=	"",
				vehicleFuelType 		= 	"",
				vehicleGasType 			=	"",
				vehicleDistance 		=	"",
				vehicleFuelConsumption 	=	"",
				vehicleManHours 		=	"",
				vehicleStartDate		=	"",
				vehicleEndDate			=	"",
				travelTypeDescription	=	"",
				vehicleLiters 			=	"",
				unitCost 				=	"",
				totalCost 				=	"",
				createdBy 				=	"",
				updatedBy 				=	"",
				createdAt 				=	"",
				updatedAt 				=	"" 
		} = data[0] || data;
		// TABLE ROW
		let html 	= ``;
		let disabled 	 	= readOnly ? "disabled" : "";
		let fuelNeeded 		= (parseFloat(vehicleDistance) / parseFloat(vehicleFuelConsumption));
		totalCost = !billMaterialID ? parseFloat(vehicleManHours) * parseFloat(unitCost) : totalCost;
		html = `	<tr class="table-row-request-vehicle" travelrequestid="${travelRequestID}">
								
								<td><div class="vehicle-code">${vehicleCode || "-"}</div></td>
								<td>
									<div class="form-group mb-0 vehicle-name" vehicleid="${vehicleID}">
										${vehicleName}
									</div>
									<small class="vehicle-platenumber" style="color:#848482;">${vehiclePlateNumber || "-"}</small>
								</td>
								<td>
									<div class="vehicle-consumption">${vehicleFuelConsumption} km/L</div>
									<small class="vehicle-fueltype" style="color:#848482;">${vehicleFuelType || "-"}</small>
								</td>
								<td>
									<div class="text-center vehicle-quantity">
										<div class="vehicle-distance">${vehicleDistance}</div>
										<div class="invalid-feedback d-block" id="invalid"></div>
									</div>
								</td>
								<td>
									<div class="vehicle-manhours text-center">
										<div class="vehicle-manhours">${vehicleManHours}</div>
										<div class="invalid-feedback d-block" id="invalid"></div>
									</div>
								</td>
								<td>
									<div class="form-group mb-0 text-center vehicle-days-to-use">
										${`<div style="font-size:90%;">${moment(vehicleStartDate).format("MMMM DD, YYYY")+" - "+moment(vehicleEndDate).format("MMMM DD, YYYY")}</div>` }
										<div class="invalid-feedback d-block" id="invalid-vehicleDateToUse0"></div>
									</div>
								</td>
								
								<td>
										<div class="d-flex justify-content align-items-center">
											<span class="mx-1">${formatAmount(fuelNeeded)}</span>
											<span class="mx-1"><strong>x</strong></span>
												
											<div class="form-group col-9 mb-0 text-right vehicle-days-to-use">
												<input 
												type="text" 
												class="form-control input-quantity input-fuel-rate text-right"
												data-allowcharacters="[0-9]" 
												max="999999999"
												name="fuelRate" 
												id="fuelRate${travelRequestID}"
												autocomplete="off"
												required
												value="${vehicleLiters || "0.00"}" ${!readOnly ? "" : "disabled"}>
												<div class="invalid-feedback d-block" id="invalid-fuelRate${travelRequestID}"></div>
											</div>
										</div>
								</td>
								<td>
									<div class="form-group mb-0 text-right vehicle-rate" vehiclerate="${unitCost}">
										${formatAmount(unitCost, true)}
									</div>
								</td>
								<td>
									<div class="form-group mb-0 text-right vehicle-total-cost">
										${formatAmount(totalCost, true)}
									</div>
								</td>
							</tr>`;
		// END TABLE ROW

		return html;
	}
	// ----- END GET VEHICLE TABLE ROW -----
	
	// ----- GET OTHER TABLE ROW -----
	function requestOthersRow(data = false, readOnly = false){
		let {
				travelRequestID			=	"",
				billMaterialID			=	"",
				costEstimateID			=	"",
				billMaterialCode		=	"",
				costEstimateCode 		=	"",
				travelType				=	"",
				vehicleID				=	"",
				vehicleCode 			=	"",
				vehicleName 			=	"",
				vehiclePlateNumber 		=	"",
				vehicleGasType 			=	"",
				vehicleDistance 		=	"",
				vehicleFuelConsumption 	=	"",
				vehicleManHours 		=	"",
				vehicleStartDate		=	"",
				vehicleEndDate			=	"",
				travelTypeDescription	=	"",
				vehicleLiters 			=	"",
				unitCost 				=	"",
				totalCost 				=	"",
				createdBy 				=	"",
				updatedBy 				=	"",
				createdAt 				=	"",
				updatedAt 				=	"" 
		} = data[0] || data;
		let html 	= ``;
		let disabled 	 	= readOnly ? "disabled" : "";
		let checkboxRow 	= !readOnly ? `	<td class="text-center">
												<input type="checkbox" class="checkboxrow checkboxrow-other" invcategory="other">
											</td>` : ``;

		html += `	<tr class="table-row-request-other" travelrequestid="${travelRequestID}">
								<td>
									<div class="form-group other-category" >
										${travelType}
									</div>
								</td>
								<td>
									<div class="form-group other-description">
										${ travelTypeDescription }
									</div>
								</td>
								<td>
									<div class="form-group other-total-cost">
											<input 
												type="text" 
												class="form-control input-quantity input-fuel-rate text-right"
												data-allowcharacters="[0-9]" 
												max="999999999"
												name="otherTotalCost" 
												required
												id="otherTotalCost${travelRequestID}"
												autocomplete="off" ${!readOnly ? "" : "disabled"}
												value="${totalCost || "0.00"}">
										<div class="invalid-feedback d-block" id="invalid-otherTotalCost${travelRequestID}"></div>
									</div>
								</td>
							</tr>`;
		// END TABLE ROW
		return html;
	}
	// ----- GET OTHER TABLE ROW -----







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

			headerButton(true, "Add Bill of Material");
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
	function getBillMaterialData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			formData.append("billMaterialID", id);

			if (status != "2") {
				formData.append("billMaterialStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			const billMaterialID 				= $("[name=referenceInput]").attr("billMaterialID");
			const billMaterialCode 				= $("[name=referenceInput]").attr("billMaterialCode");
			const reviseBillMaterialID 			= $("[name=referenceInput]").attr("reviseBillMaterialID");
			const reviseBillMaterialCode 		= $("[name=referenceInput]").attr("reviseBillMaterialCode");
			const costEstimateID 				= $("[name=referenceInput]").attr("costEstimateID");
			const costEstimateCode 				= $("[name=referenceInput]").attr("costEstimateCode");
			const timelineBuilderID 			= $("[name=projectCode]").attr("timelineBuilderID");
			const projectCode   				= $(`[name="projectCode"]`).val();
			const projectName   				= $(`[name="projectName"]`).val();
			const projectCategory 				= $(`[name="projectCategory"]`).val();
			const clientCode					= $(`[name="clientName"]`).attr("clientcode");
			const clientName    				= $(`[name="clientName"]`).val();
			const clientAddress 				= $(`[name="clientAddress"]`).val();
			const billMaterialGrandTotal 		= getNonFormattedAmount($("#grandTotalAmount").text() || 0);
			const dateNeeded 					= $(`[name="dateNeeded"]`).val();
			const billMaterialReason 			= $(`[name="billMaterialReason"]`).val();


			formData.append("employeeID", 				sessionID);
			formData.append("billMaterialID", 			billMaterialID	== "-" ?  null : billMaterialID );
			formData.append("costEstimateCode", 		costEstimateCode	=="-" ?  null : costEstimateCode);
			formData.append("reviseBillMaterialID", 	reviseBillMaterialID 	=="-"?  null : reviseBillMaterialID);
			formData.append("reviseBillMaterialCode", 	reviseBillMaterialCode 	=="-"?  null : reviseBillMaterialCode);
			formData.append("costEstimateID", 			costEstimateID 	=="-"?  null : costEstimateID);
			formData.append("billMaterialCode", 		billMaterialCode 	=="-"?  null : billMaterialCode);
			formData.append("timelineBuilderID", 		timelineBuilderID 	=="-"?  null : timelineBuilderID);
			formData.append("projectCode", 				projectCode 	=="-"?  null : projectCode);
			formData.append("projectName", 				projectName 	=="-"?  null : projectName);
			formData.append("projectCategory", 			projectCategory 	=="-" ?  null : projectCategory);
			formData.append("clientCode", 				clientCode 	=="-"?  null : clientCode);
			formData.append("clientName", 				clientName 	=="-"?  null : clientName);
			formData.append("clientAddress", 			clientAddress 	=="-"?  null : clientAddress);
			formData.append("billMaterialGrandTotal", 	billMaterialGrandTotal == "0"?  null : billMaterialGrandTotal);
			formData.append("dateNeeded", 				moment(dateNeeded).format("YYYY-MM-DD"));
			formData.append("billMaterialReason", 		billMaterialReason);			

			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("billMaterialID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("billMaterialStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("billMaterialStatus", 2);
				}
			}

			$(".table-body-inventory-request-item").each(function(i,ob){
				let thisExtension 			= $(this).attr("invcategory");
				let requestItemTR 			= $(this).find(`.table-row-request-${thisExtension}`);
	
				requestItemTR.each(function(j,obj){
					let requestItemID 			= 	$(this).attr("requestitemid");
					let unitCost 				= 	$(this).attr("unitcost");
					let totalCost 				= 	getNonFormattedAmount($(this).find(".item-total-cost").text());
						if(requestItemID){
							formData.append(`items[${i}][${j}][requestItemID]`, requestItemID);
							formData.append(`items[${i}][${j}][unitCost]`, 		unitCost);
							formData.append(`items[${i}][${j}][totalCost]`, 	totalCost);
						}
					
				});
			});

			$(".table-row-request-asset").each(function(i, obj){
				let requestAssetID 			= 	$(this).attr("requestassetid");
				let hourlyRate 				= 	getNonFormattedAmount($(this).find(".asset-unitcost").text());
				let unitCost 				= 	getNonFormattedAmount($(this).find(".item-unit-cost").text());
				let totalCost 				= 	getNonFormattedAmount($(this).find(".asset-total-cost").text());
					if(requestAssetID){
						formData.append(`assets[${i}][requestAssetID]`, requestAssetID);
						formData.append(`assets[${i}][unitCost]`, unitCost);
						formData.append(`assets[${i}][hourlyRate]`, hourlyRate);
						formData.append(`assets[${i}][totalCost]`, totalCost);	
					}
				
			});


			$(".table-row-request-vehicle").each(function(i){
				let travelRequestID 		= 	$(this).attr("travelrequestid");
				let vehicleLiters			=	$(this).find("[name=fuelRate]").val().replaceAll(",", "") || $(this).find("[name=fuelRate]").val();
				let unitCost				=	$(this).find(".vehicle-rate").attr("vehiclerate");
				let totalCost				=	getNonFormattedAmount($(this).find(".vehicle-total-cost").text());
				if(travelRequestID){
					formData.append(`vehicles[${i}][travelRequestID]`, 		travelRequestID);
					formData.append(`vehicles[${i}][vehicleLiters]`, 		vehicleLiters);
					formData.append(`vehicles[${i}][unitCost]`, 			unitCost);
					formData.append(`vehicles[${i}][totalCost]`, 			totalCost);
				}
				
			});

			$(".table-row-request-other").each(function(i,obj){
				let travelRequestID 		= 	$(this).attr("travelrequestid");
				let totalCost			=	$(this).find("[name=otherTotalCost]").val().replaceAll(",", "") || $(this).find("[name=otherTotalCost]").val();
				
				if(travelRequestID){
					formData.append(`others[${i}][travelRequestID]`, 	travelRequestID);
					formData.append(`others[${i}][totalCost]`, 			totalCost);
				}

			});


		}

		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----

	// ----- GENERATE COST SHEET -----
	$(document).on("click", "#btnExcel", function(){
		let billMaterialID 		= decryptString($(this).attr("pbrid"));
		let costEstimateID 		= decryptString($(this).attr("ceid"));
		let timelineBuilderID 	= decryptString($(this).attr("ptbid"));
		const url = `${base_url}pms/bill_material/downloadExcel?bomid=${billMaterialID}&ceid=${costEstimateID}&ptbid=${timelineBuilderID}`;
		window.open(url, "_blank");
	});
	// ----- END GENERATE COST SHEET -----
	

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
		const id                    = decryptString($(this).attr("billMaterialID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise     				= $(this).attr("revise") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("BOM", dateToday(), id);
		const status     				= $(this).attr("status");

		if (status != "false" && status != 0 && id) {
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getBillMaterialData(action, "save", "0", id);
				data.append("billMaterialStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("reviseBillMaterialID", id);
					data.delete("billMaterialID");
				} else {
					data.append("billMaterialID", id);
					data.delete("action");
					data.append("action", "update");
				}
				saveBillMaterial(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getBillMaterialData(action, "save", "0", id);
			data.append("billMaterialStatus", 0);

			saveBillMaterial(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("BOM", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getBillMaterialData(action, "save", "0", id);
		data.append("billMaterialStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseBillMaterialID", id);
				data.delete("billMaterialID");
			} else {
				data.append("billMaterialID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		validateItemPrice();
		saveBillMaterial(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


	function removeValidTableRow(elementID = null){
		if(elementID){
			$(elementID).find(".validated, .is-valid, .no-error").removeClass("validated")
			.removeClass("is-valid").removeClass("no-error");	
			
		}
	}

	function validateInventoryRequestForm(){
		let returnData 		= true;
		let flagArr 		= [];
		let flagAssets 		= 0; 
		let flagVehicles 	= 0; 
		let flagOthers 		= 0; 

		$(".table-body-inventory-request-item").each(function(i,ob){
			let thisExtension 			= $(this).attr("invcategory");
			let milestoneBuilderID		= $(this).attr("milestonebuilderid"); 
			let phaseDescription		= $(this).attr("phasedescription");	
			let milestoneListID			= $(this).attr("milestonelistid");
			let projectMilestoneID		= $(this).attr("milestonelistid");
			let projectMilestoneName	= $(this).attr("projectmilestonename");
			let requestItemTR 			= $(this).find(`.table-row-request-${thisExtension}`);
			let tempFlagCount			= 0;
			requestItemTR.each(function(i,obj){
				let itemID = $(this).find("[name=itemID]").val();
				if(!itemID){
					tempFlagCount ++;
				}
			});
			flagArr.push(tempFlagCount);
		});

		$(`.table-row-request-asset`).each(function(i,obj){
			let assetID  	= 	$(this).find("[name=assetID]").val();
			if(!assetID){
				flagAssets ++;
			}
		});
		flagArr.push(flagAssets);

		$(".table-row-request-vehicle").each(function(i){
			let vehicleID  	= 	$(this).find("[name=vehicleID]").val();
			
			if(!vehicleID){
				flagVehicles ++;
			}
			
		});
		flagArr.push(flagVehicles);

		$(`.table-row-request-other`).each(function(i,obj){
			let otherCategory  	= 	$(this).find("[name=otherCategory]").val();
			
			if(!otherCategory){
				flagOthers ++;
			}
			
		}); 
		flagArr.push(flagOthers);

		if(flagArr.filter(index => index == 0) == flagArr.length){
			showNotification("warning2", "Form cannot be submitted, input a value on one of the sectoins.");
			returnData = false;
		}

		return returnData;
	}
	
    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            			= decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise        			= $(this).attr("revise") == "true";
		// REMOVE VALIDATED ON THE TABLES
		const validate      			= validateForm("form_bill_material");
		removeValidTableRow(`.inventory-request`);
		removeValidTableRow(`.table-row-request-vehicle`);
		removeValidTableRow(`.table-row-request-other`);
		
		const validateTables 			= validateInventoryRequestForm();
		// Form cannot be submitted, input a value on one of the sections
		if(validateTables){
			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getBillMaterialData(action, "submit", "1", id);

				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("reviseBillMaterialID", id);
						data.delete("billMaterialID");
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
						moduleID:                39,
						notificationTitle:       "Bill of Material",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}

				saveBillMaterial(data, "submit", notificationData, pageContent);
			}
		}
			


	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("billMaterialID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getBillMaterialData(action, "cancelform", "4", id, status);

		saveBillMaterial(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----

    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const feedback = $(this).attr("code") || getFormCode("BOM", dateToday(), id);
		let tableData  = getTableData("pms_bill_material_tbl", "", "billMaterialID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getBillMaterialData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                39,
					tableID:                 id,
					notificationTitle:       "Bill of Material",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                39,
					tableID:                 id,
					notificationTitle:       "Bill of Material",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("billMaterialStatus", status);

			saveBillMaterial(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const feedback = $(this).attr("code") || getFormCode("BOM", dateToday(), id);

		$("#modal_bill_material_content").html(preloader);
		$("#modal_bill_material .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_bill_material").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="billMaterialRemarks"
					name="billMaterialRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-billMaterialRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			billMaterialID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_bill_material_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const feedback = $(this).attr("code") || getFormCode("BOM", dateToday(), id);

		const validate = validateForm("modal_bill_material");
		if (validate) {
			let tableData = getTableData("pms_bill_material_tbl", "", "billMaterialID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("billMaterialID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("billMaterialRemarks", $("[name=billMaterialRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                39,
					tableID: 				 id,
					notificationTitle:       "Bill of Material",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveBillMaterial(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("billMaterialID"));
		let data = new FormData;
		data.append("billMaterialID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveBillMaterial(data, "drop", null, pageContent);
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
	const title = "Bill of Material";
	let swalText, swalImg;

	$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("hide");

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

function saveBillMaterial(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `bill_material/saveBillMaterial`,
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
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("BOM", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------