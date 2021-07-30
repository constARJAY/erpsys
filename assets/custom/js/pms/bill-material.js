$(document).ready(function(){
	const allowedUpdate = isUpdateAllowed(39);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(39);

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

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (billMaterialStatus == 0 || billMaterialStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
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
			// let id = decryptString(view_id);
			let id = view_id;
				id && isFinite(id) && loadData(id, isRevise,isFromCancelledDocument);
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
			window.history.pushState("", "", `${base_url}pms/project_budget_rationale?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/project_budget_rationale?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/project_budget_rationale?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/project_budget_rationale`);
		}
	}
// ----- END VIEW DOCUMENT -----

// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID) LEFT JOIN ims_inventory_classification_tbl ON ims_inventory_item_tbl.classificationID = ims_inventory_classification_tbl.classificationID", 
		"itemID, itemCode, itemName, categoryName, itemDescription, unitOfMeasurementID, brandName, ims_inventory_classification_tbl.classificationID AS classificationID, classificationName",
		"itemStatus = 1");
	const designationList = getTableData("hris_designation_tbl JOIN hris_employee_list_tbl USING(designationID)",
											"designationID, designationName, MAX(employeeHourlyRate) as designationRate", "designationStatus=1","","designationName");
	const costEstimateTableData	= getTableData(`pms_cost_estimate_tbl`,"",`costEstimateStatus = '2'`);
	const vehicleList = getTableData("ims_inventory_vehicle_tbl","",`vehicleStatus = '1'`)
	
	const existCostEstimateData = [];
	const clientList  = getTableData("pms_client_tbl", "*", "clientStatus = 1");
	const listOfPhase = getTableData("pms_milestone_builder_tbl"), listOfMilestone = getTableData("pms_project_milestone_tbl"), listOfDesignation = [], listEmployeeList = [], listOfManpower = [];
	const projectPhaseItemsRequest = [], materialItemsRequest = [], designationRequest = [], travelRequest = [];
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
					{ targets: 3,  width: 100 },
					{ targets: 4,  width: 290 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80 },
					{ targets: 8,  width: 285 },
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
					{ targets: 3,  width: 100 },
					{ targets: 4,  width: 290 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80 },
					{ targets: 8,  width: 285 },
				],
			});


			if ($.fn.DataTable.isDataTable(".projectPhaseTable")) {
				$(".projectPhaseTable").DataTable().destroy();
			}
			
			var table = $(".projectPhaseTable")
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
					{ targets: 0,  width: "5%"  },
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 1500 },
					{ targets: 3,  width: 1000  }
				],
			});
			
			var table = $(".projectPhaseTableReadOnly")
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
					{ targets: 0,  width: 200 },
					{ targets: 1,  width: 1600 }
				],
			});

			
			var table = $(".materialEquipmentTable")
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
					{ targets: 0,  width: "5%" 	},
					{ targets: 1,  width: 150 	},
					{ targets: 2,  width: 150 	},
					{ targets: 3,  width: 150  },
					{ targets: 4,  width: 150  },
					{ targets: 5,  width: 150  }
				],
			});

			var table = $(".materialEquipmentTableReadOnly")
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
					{ targets: 0,  width: 150 	},
					{ targets: 1,  width: 150 	},
					{ targets: 2,  width: 150  },
					{ targets: 3,  width: 150  },
					{ targets: 4,  width: 150  }
				],
			});

			


			var table = $(".manpowerTable")
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
					{ targets: 0,  width: 150  },
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 100  },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 100  }
				],
			});

			var table = $(".travelTable")
			// .css({ "min-width": "100%" })	
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				// scrollX: true,
				sorting: false,
				searching: false,
				paging: false,
				ordering: false,
				info: false,
				scrollCollapse: true,
				// columnDefs: [
				// 	{ targets: 0,  width: "5%"  },
				// 	{ targets: 1,  width: 1 },
				// 	{ targets: 2,  width: 300 }
				// ],
			});
			
			var table = $(".travelTableReadOnly")
			// .css({ "min-width": "100%" })	
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
					{ targets: 1,  width: 1600},
					{ targets: 2,  width: 200}
				],
			});

	}
// ----- END DATATABLES -----

// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_bill_material_tbl", "approversID")) {
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
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if(isCreateAllowed(38)){
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
			<button type="button" class="btn btn-default btn-light" 
					id="btnBack" 
					revise="${isRevise}" cancel="${isFromCancelledDocument}">
				<i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
// ----- END HEADER BUTTON -----

// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let billMaterialData = getTableData(
			"pms_bill_material_tbl AS pbmt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			`pbmt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pbmt.createdAt AS dateCreated`,
			`pbmt.employeeID != ${sessionID} AND billMaterialStatus != 0 AND billMaterialStatus != 4`,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(pbmt.submittedAt, pbmt.createdAt)`
		);

		let html = `
		<table class="table table-bordered table-striped table-hover" id="tableForApprroval">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Reference No.</th>
					<th>Project Code</th>
					<th>Project Name</th>
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
				referenceCode,
				projectCode,
				projectName,
				clientName,
				clientAddress, 
				approversID,
				approversDate,
				billMaterialStatus,
				billMaterialRemarks,
				billMaterialReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";

			let button = billMaterialStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(billMaterialID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(billMaterialID )}" 
				code="${getFormCode("CEF", createdAt, billMaterialID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, billMaterialStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(billMaterialID )}">
					<td>${getFormCode("CEF", createdAt, billMaterialID )}</td>
					<td>${fullname}</td>
					<td>${referenceCode || "-"}</td>
					<td>
						<div>
						${projectCode || '-'}
						</div>
						<small style="color:#848482;">${billMaterialReason || '-'}</small>
					</td>
					<td>${projectName}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(billMaterialStatus)}
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
			"pms_bill_material_tbl AS pbmt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"pbmt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pbmt.createdAt AS dateCreated",
			`pbmt.employeeID = ${sessionID}`,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(pbmt.submittedAt, pbmt.createdAt)`
		);
		let html = `
		<table class="table table-bordered table-striped table-hover" id="tableMyForms">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Reference No.</th>
					<th>Project Code</th>
					<th>Project Name</th>
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
				costEstimateID,
				referenceCode,
				projectCode,
				projectName,
				projectCategory,
				clientName,
				clientAddress,
				approversID,
				approversDate,
				billMaterialStatus,
				billMaterialRemarks,
				billMaterialReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			// PUSHING EXIST TIMELINE BUILDER;
			costEstimateID ? existCostEstimateData.push(costEstimateID) : ``;
			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";

			let button = billMaterialStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(billMaterialID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(billMaterialID )}" 
				code="${getFormCode("CEF", createdAt, billMaterialID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
			<tr class="${btnClass}" id="${encryptString(billMaterialID )}">
				<td>${getFormCode("CEF", createdAt, billMaterialID )}</td>
				<td>${fullname}</td>
				<td>${referenceCode || "-"}</td>
				<td>
					<div>
					${projectCode || '-'}
					</div>
					<small style="color:#848482;">${billMaterialReason || '-'}</small>
				</td>
				<td>${projectName}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
				</td>

				
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">
					${getStatusStyle(billMaterialStatus)}
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

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (billMaterialStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("CEF", createdAt, billMaterialID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF",createdAt, billMaterialID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (billMaterialStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(billMaterialStatus == 2){
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("CEF", createdAt, billMaterialID)}"
						status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				}else if (billMaterialStatus == 3) {
					// DENIED - FOR REVISE
					if(!isDocumentRevised(billMaterialID)){
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				} else if (billMaterialStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(billMaterialID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"
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
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"><i class="fas fa-ban"></i> 
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

// ----- PROJECT PHASE -----
	function getProjectPhaseList(phaseID = null){
		var html =	listOfPhase.filter(items=>items.milestoneBuilderID == phaseID).map( items => {
				return `<div class="project-phase" phaseid="${items.milestoneBuilderID}">${items.phaseDescription}</div>`;
				});
		return html.join();
	}
// ----- END PROJECT PHASE -----
// ---123-123-123-12-312-3
	function getMilestoneList(phaseID = null, milestoneListID = null){
		var html = listOfMilestone.filter(items => items.projectMilestoneID == milestoneListID).map(items=>{
				return `<div class="project-phase-milestone" phaseid="${phaseID}" milestoneid="${milestoneListID}">${items.projectMilestoneName}<div>`
		});
		return html.join();
	}
// -123-123-123-12-3123-12-3

// ----- ITEM LIST -----
	function getItemList(itemID = null){
		let html = `<option disabled ${!itemID ? `selected` : ``}>Select Item Name</option>`;
		inventoryItemList.map(items=>{
			html += `<option value="${items.itemID}" itemcode="${items.itemCode}" classificationname="${items.classificationName}" classificationid="${items.classificationID}" uom="${items.unitOfMeasurementID}" itemname="${items.itemName}" ${items.itemID == itemID ? `selected` : ``}>${items.itemName}</option>`;
		});
		return html;
	}
// ----- END ITEM LIST -----


// ----- VEHICLE LIST -----
	function getVehicleList(vehicleID = null){
		let html = `<option disabled ${!vehicleID?"selected":``}>Please select a vehicle</option>`;
		vehicleList.map(vehicle=>{
			html +=`<option
					value="${vehicle.vehicleID}"
					vehiclecode="${getFormCode("VHL",vehicle.createdAt,vehicle.vehicleID)}"
					vehicleplatenumber="${vehicle.vehiclePlateNumber}"
					vehiclefuelconsumption="${vehicle.vehicleFuelConsumption}"
					vehiclegastype="${vehicle.vehicleGasType == 1 ? `Gasoline`: `Diesel`}"
					vehiclename="${vehicle.vehicleName}"
					${vehicle.vehicleID == vehicleID ?`selected`:``}
					>${vehicle.vehicleName}</option>` 
		});	
		return html;
	}
// ----- END VEHICLE LIST -----

// ----- UPDATE TABLE ITEMS -----
	// updateTableAttribute-PAST NAME
	function updateTableAttribute() {
		// PROJECT PHASE
		$(".table-row-project-phase").each(function(i){
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);
			// CHECKBOX
			$("td .checkboxrow", this).attr("id", `project_checkboxrow${i}`);
			$("td .checkboxrow", this).attr("projectphase", `true`);
			// PROJECT PHASE SELECT
			$("[name=projectPhase]", this).attr("id", `projectPhase${i}`);
			if (!$(`#projectPhase${i}`).attr("data-select2-id")) {
				$(`#projectPhase${i}`).select2({ theme: "bootstrap" });
			}
			var phaseID  		= $(`#projectPhase${i}`).val();
			var milestoneList 	= $(`#projectPhase${i}`).closest("tr").find("[name=projectMilestone]");
			// MILESTONE SELECTS
			milestoneList.each(function(j){
				var thisValue 	= $(this).val();
				var thisAttrID 	= `projectMilestone${i}_${j}`;
					$(this).attr("id", thisAttrID);
					$(`#${thisAttrID}`).empty();
					var option 			= `<option disabled ${ !thisValue ? `selected` : ``}>Please select a milestone</option>`;
											option += listOfMilestone.filter(items => items.phaseID == phaseID).map(items=>{
												return `<option value="${items.projectMilestoneID}" milestonename="${items.projectMilestoneName}" ${items.projectMilestoneID == thisValue ? `selected` : ``}>${items.projectMilestoneName}</option>`
										}).join();
					$(`#${thisAttrID}`).append(option);
					if (!$(`#${thisAttrID}`).attr("data-select2-id")) {
						$(`#${thisAttrID}`).select2({ theme: "bootstrap" });
					}
				var milestoneItemList = $(`#${thisAttrID}`).closest("tr").find("[name=milestoneItems]");
				milestoneItemList.each(function(k){
					var thisAttrID 	= `milestoneItemList${i}_${j}_${k}`;
					var thisValue 	= $(this).val();
					$(this).attr("id", thisAttrID);
					var option 		= getItemList(thisValue);
					$(`#${thisAttrID}`).append(option);
					if (!$(`#${thisAttrID}`).attr("data-select2-id")) {
						$(`#${thisAttrID}`).select2({ theme: "bootstrap" });
					}
				});	
			});
		});

		$(".table-row-material-equipment").each(function(i){
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);
			// CHECKBOX
			$("td .checkboxrow", this).attr("id", `material_checkboxrow${i}`);
			$("td .checkboxrow", this).attr("material", `true`);
			// PROJECT PHASE SELECT
			$("[name=materialItems]", this).attr("id", `materialItems${i}`);
			if (!$(`#materialItems${i}`).attr("data-select2-id")) {
				$(`#materialItems${i}`).select2({ theme: "bootstrap" });
			}
		});


		$(".table-row-travel").each(function(i){
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);
			// CHECKBOX
			$("td .checkboxrow", this).attr("id", `travel_checkboxrow${i}`);
			$("td .checkboxrow", this).attr("travel", `true`);
			// TRAVEL TYPE SELECT
			$("[name=travelType]", this).attr("id", `travelType${i}`);
			if (!$(`#travelType${i}`).attr("data-select2-id")) {
				$(`#travelType${i}`).select2({ theme: "bootstrap" });
			}
		});

		$(".table-row-travel").each(function(i){
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);
			// CHECKBOX
			$("td .checkboxrow", this).attr("id", `travel_checkboxrow${i}`);
			$("td .checkboxrow", this).attr("travel", `true`);
			// TRAVEL TYPE SELECT
			$("[name=travelType]", this).attr("id", `travelType${i}`);
			if (!$(`#travelType${i}`).attr("data-select2-id")) {
				$(`#travelType${i}`).select2({ theme: "bootstrap" });
			}

			// TRAVEL VEHICLE TYPE
			let travelTypeChild = $(`#travelType${i}`).closest("tr").find(".table-row-vehicle");
			if(travelTypeChild){
				travelTypeChild.each(function(j){
					$("[name=travelVehicle]", this).attr("id", `travelVehicle${i}_${j}`);
					if (!$(`#travelType${i}`).attr("data-select2-id")) {
						$(`#travelVehicle${i}_${j}`).select2({ theme: "bootstrap" });
					}
					$("[name=vehicleDistance]", this).attr("id", `vehicleDistance${i}_${j}`);
					$(`#vehicleDistance${i}_${j}`).next().attr("id",`invalid-vehicleDistance${i}_${j}`);
				});
			}
			$("[name=travelTypeOthers]", this).attr("id", `travelTypeOthers${i}`);
		});

	}
// ----- END UPDATE TABLE ITEMS -----

// ----- DELETE TABLE ROW -----
	function deleteTableRow(param) {
		// const attr = isProject ? "[project=true]" : "[company=true]";
		let attr;
		switch(param){	
			case "projectphase":
					attr = "[projectphase=true]";
					
				break;
			case "material":
					attr = "[material=true]";
				break;
			case "manpower":
					attr = "[manpower=true]";
				break;
			default:
					attr = "[travel=true]";
		}
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
							updateTableAttribute();
							$(`[name=itemID]${attr}`).each(function(i, obj) {
								let itemID = $(this).val();
								$(this).html(getInventoryItem(itemID, param));
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




$(document).on("keypress",  "[name=vehicle-unit-cost]", function(){
	updateTravelUnitCost("vehicle-unit-cost");
});

$(document).on("keypress",  "[name=row-unit-cost]", function(){
	updateTravelUnitCost("row-unit-cost");
});




// ------------------------------ ONCHANGE EVENTS ------------------------------
	$(document).on("change", "[name=costEstimateID]", function() {
		$("#formContentDivision").html(preloader);
		var thisValue 			= $(this).val();
		var costEstimateCode 	= $('option:selected', this).attr("documentno");
		var timelineBuilderID	= $('option:selected', this).attr("timelinebuilderid");
		var projectCode 		= $('option:selected', this).attr("projectcode");
		var projectName 		= $('option:selected', this).attr("projectname");
		var projectCategory 	= $('option:selected', this).attr("projectcategory");
		var clientName 			= $('option:selected', this).attr("clientname");
		var clientAddress 		= $('option:selected', this).attr("clientaddress");
		var costEstimateReason  = $('option:selected', this).attr("costestimatereason");
		var createdBy  			= $('option:selected', this).attr("createdby");
		let {
			fullname:    requestorFullname    = "",
			department:  requestorDepartment  = "",
			designation: requestorDesignation = "",
		} = employeeData(createdBy);
		$(`.requestor-name`).val(`${requestorFullname}`);
		$(`.requestor-department`).val(`${requestorDepartment}`);
		$(`.requestor-position`).val(`${requestorDesignation}`);
		$(`[name=projectCode]`).val(`${projectCode}`);
		$(`[name=projectCode]`).val(`${projectCode}`);
		$(`[name=projectCode]`).val(`${projectCode}`);
		$(`[name=projectCode]`).val(`${projectCode}`);
		$(`[name=projectName]`).val(`${projectName}`);
		$(`[name=clientAddress]`).val(`${clientAddress}`);
		$(`[name=clientName]`).val(`${clientName}`);
		$(`[name=projectCode]`).val(`${projectCode}`);
		$(`[name=costEstimateReason]`).val(`${costEstimateReason}`);
		formContentDivision(thisValue);
	});

	$(document).on("change","[name=milestoneItems]", function(){
		let thisParent 			= $(this).closest("tr");
		let thisValue 			= $(this).val();
		let itemCode 			= $('option:selected', this).attr("itemcode");
		let classificationID 	= $('option:selected', this).attr("classificationid");
		let classificationName  = $('option:selected', this).attr("classificationname");
		let unitOfMeasurement   = $('option:selected', this).attr("uom");
		

		thisParent.find(".milestone-item-code").text(itemCode);
		thisParent.find(".milestone-item-classification").text(classificationName);
		thisParent.find(".milestoneUom").text(unitOfMeasurement);
		
		// $(`[name=projectCategory]`).val(`${projectCategory}`);
	});

	$(document).on("change","[name=materialItems]", function(){
		let thisParent 			= $(this).closest("tr");
		let thisValue 			= $(this).val();
		let itemCode 			= $('option:selected', this).attr("itemcode");
		let classificationID 	= $('option:selected', this).attr("classificationid");
		let classificationName  = $('option:selected', this).attr("classificationname");
		let unitOfMeasurement   = $('option:selected', this).attr("uom");
		

		thisParent.find(".material-item-code").text(itemCode);
		thisParent.find(".material-item-classification").text(classificationName);
		thisParent.find(".materialUom").text(unitOfMeasurement);
		
		// $(`[name=projectCategory]`).val(`${projectCategory}`);
	});

	$(document).on("change","[name=travelVehicle]", function(){
		let thisParent 				= $(this).closest("tr");
		let thisValue 				= $(this).val();
		let vehicleCode 			= $('option:selected', this).attr("vehiclecode");
		let vehiclePlateNumber 		= $('option:selected', this).attr("vehicleplatenumber");
		let vehicleFuelConsumption  = $('option:selected', this).attr("vehiclefuelconsumption");
		let vehicleGasType   		= $('option:selected', this).attr("vehiclegastype");

		thisParent.find(".travel-vehicle-code").text(vehicleCode);
		thisParent.find(".travel-vehicle-plate-number").text(vehiclePlateNumber);
		thisParent.find(".travel-vehicle-consumption").text(vehicleFuelConsumption);
		thisParent.find(".travel-vehicle-gas").text(vehicleGasType);
	});

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

	$(document).on("change","[name=travelType]", function(){
		let thisTableRow 	= $(this).closest(".table-row-travel");
		let requestTravel 	= thisTableRow.find(".travelTypeRequest");
		requestTravel.html(preloader);	
		let row  		  = travelTransportationRequest($(this).val());
		setTimeout(() => {
			requestTravel.html(row);
			updateTableAttribute();
			initAll();
		}, 100);
	});
// ----- END ONCHANGE EVENTS -----

// ----- ONCLICK EVENTS -----
	// ----- REMOVE FILE -----
		$(document).on("click", ".btnRemoveFile", function() {
			$(this).parent().parent().parent().find("[name=files]").first().val("");
			$(this).closest(".displayfile").empty();
		});
	// ----- END REMOVE FILE -----

	// ----- CLICK DELETE ROW -----
		$(document).on("click", ".btnDeleteRow", function(){
			let attr;
			if($(this).attr("projectphase") == "true"){
				attr = "projectphase";
			}else if($(this).attr("material") == "true"){
				attr = "material";
			}else if($(this).attr("manpower") == "true"){
				attr = "manpower";
			}else{
				attr = "travel";
			}
			deleteTableRow(attr);
		});
	// ----- END CLICK DELETE ROW -----
	$(document).on("click",".deleteRow", function(){
		let tableRow 	= $(this).closest("tr");
		let tableBody 	= $(this).closest("tbody").find("tr")
		if(tableBody.length > 1){
			tableRow.fadeOut(500, function (){
				$(this).closest("tr").remove();
				updateTableAttribute();
				// updateDeleteButton();
			});
		}else{
			showNotification("danger", "You must have atleast one or more items.");
		}
		
	});

	$(document).on("click",".btnSubDeleteRow", function(){
		let tableRow 	= $(this).closest("tr");
		let tableBody 	= $(this).closest("tbody").find("tr")
		if(tableBody.length > 1){
			tableRow.fadeOut(500, function (){
				$(this).closest("tr").remove();
				updateTableAttribute();
				// updateDeleteButton();
			});
		}else{
			showNotification("danger", "You must have atleast one or more items.");
		}
		
	});

	// ----- CHECKBOX EVENT -----
		$(document).on("click", "[type=checkbox]", function() {
			updateDeleteButton();
		})
	// ----- END CHECKBOX EVENT -----

	// ----- CHECK ALL -----
		$(document).on("change", ".checkboxall", function() {
			const isChecked = $(this).prop("checked");
			let   condition = $(this).attr("project") == "true";
			let   attr =``;
		if($(this).attr("projectphase") == "true"){
			attr = "[projectPhase=true]";
		}else if($(this).attr("material") == "true"){
			attr = "[material=true]";
		}else {
			attr = "[travel=true]";
		}
		
			$(".checkboxrow"+attr).each(function(i, obj) {
				$(this).prop("checked", isChecked);
				// thisParent.find(this).prop("checked", isChecked);
			});
			updateDeleteButton();
		});
	// ----- END CHECK ALL -----

	$(document).on("click", ".btnAddRow", function() {
		// let param = $(this).attr("project");
		let row;
		if($(this).attr("projectphase") == "true"){
			row	= getRowData("projectphase");
			$(".projectPhaseTables").append(row);
			
		}else if($(this).attr("material") == "true"){
			row	= getRowData("material");
			$(".materialEquipmentTables").append(row);

		}else if($(this).attr("manpower") == "true"){
			row	= getRowData("manpower");
			$(".personnelTableBody").append(row);
		}else{
			row	= getRowData("travel");
			$(".travelTableBody").append(row);
		}

		
		setTimeout(() => {
			initAll();
			updateTableAttribute();
		}, 100);
	});

	$(document).on("click",".btnSubAddRow", function(){
		let parent = $(this).closest("table");
		let row = ``, tableBody =``;
		if( $(this).attr("milestone") == "true" ){
			row += getRowDataMilestone(true);
			tableBody = parent.find(".milestone-table-body");
		}else if ($(this).attr("milestoneitems") == "true"){
			row += getRowDataItems(true);
			tableBody = parent.find(".table-body-request-items");
		}else{
			// TRAVEL SUB
			row += travelTransportationRequestVehicle(false);
			tableBody = parent.find(".travel-vehicle-table-body");
		}
		tableBody.append(row);
		updateTableAttribute();
		initAll();
		// console.log(row);
		// parentTableBody.append(row);
	});
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
			const id 					= decryptString($(this).attr("billMaterialID"));
			const fromCancelledDocument = $(this).attr("cancel" ) == "true";
			viewDocument(id, false, true, fromCancelledDocument);
		});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
		$(document).on("click", "#btnBack", function () {
			const id         				= decryptString($(this).attr("billMaterialID"));
			const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
			const revise     				= $(this).attr("revise") == "true";
			const employeeID 				= $(this).attr("employeeID");
			const feedback   				= $(this).attr("code") || getFormCode("CEF", dateToday(), id);
			const status     				= $(this).attr("status");

			if (status != "false" && status != 0) {
				
				if (revise) {
					const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
					const data   = getbillMaterialData(action, "save", "0", id);
					data.append("billMaterialStatus", 0);
					if(!isFromCancelledDocument){
						data.append("reviseBillMaterialID", id);
						data.delete("billMaterialID");
					}else{
						data.append("billMaterialID", id);
						data.delete("action");
						data.append("action", "update");
					}
					
					savebillMaterial(data, "save", null, pageContent);
				} else {
					$("#page_content").html(preloader);
					pageContent();
		
					if (employeeID != sessionID) {
						$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
					}
				}

			} else {
				const action = id && feedback ? "update" : "insert";
				const data   = getbillMaterialData(action, "save", "0", id);
				data.append("billMaterialStatus", 0);

				savebillMaterial(data, "save", null, pageContent);
			}
		});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
		$(document).on("click", "#btnSave, #btnCancel", function () {
			const id       					= decryptString($(this).attr("billMaterialID"));
			const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
			const revise   					= $(this).attr("revise") == "true";
			const feedback 					= $(this).attr("code") || getFormCode("CEF", dateToday(), id);
			const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
			const data     					= getbillMaterialData(action, "save", "0", id);
			data.append("billMaterialStatus", 0);

			if (revise) {
				if(!isFromCancelledDocument){
					data.append("reviseBillMaterialID", id);
					data.delete("billMaterialID");
				}else{
					data.append("billMaterialID", id);
					data.delete("action");
					data.append("action", "update");
				}
				
			}

			savebillMaterial(data, "save", null, pageContent);
		});
	// ----- END SAVE DOCUMENT -----

	// ----- SUBMIT DOCUMENT -----
		$(document).on("click", "#btnSubmit", function () {
			const id           				= decryptString($(this).attr("billMaterialID"));
			const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
			const revise       				= $(this).attr("revise") == "true";
			const validate     				= validateForm("form_project_budget_rationale");
			// const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			// const data   = getbillMaterialData(action, "submit", "1", id,0,true);
			// console.log(data);
			removeIsValid("#tablePersonnelRequest");
			removeIsValid("#tableProjectRequestItems");
			removeIsValid("#tableCompanyRequestItems");
			removeIsValid("#tableTravelRequest");
			if (validate) {
					const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
					const data   = getbillMaterialData(action, "submit", "1", id);
					if (revise) {
						if(!isFromCancelledDocument){
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
							notificationTitle:       "Project Budget Rationale",
							notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
							notificationType:        2,
							employeeID,
						};
					}
					savebillMaterial(data, "submit", notificationData, pageContent);
			}
		});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
		$(document).on("click", "#btnCancelForm", function () {
			const id     = decryptString($(this).attr("billMaterialID"));
			const status = $(this).attr("status");
			const action = "update";
			const data   = getbillMaterialData(action, "cancelform", "4", id, status);

			savebillMaterial(data, "cancelform", null, pageContent);
		});
	// ----- END CANCEL DOCUMENT -----

	// ----- APPROVE DOCUMENT -----
		$(document).on("click", "#btnApprove", function () {
			const id       		= decryptString($(this).attr("billMaterialID"));
			const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
			let tableData  		= getTableData("pms_bill_material_tbl", "", "billMaterialID = " + id);
			let thisCondition 	= false;
			
				


			if (tableData) {
				let billMaterialID  = tableData[0].billMaterialID;
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getbillMaterialData("update", "approve", "2", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 2));
				let dateApproved = updateApproveDate(approversDate)
				data.append("approversDate", dateApproved);

				let status, notificationData;
				if (isImLastApprover(approversID, approversDate)) {
					status = 2;
					notificationData = {
						moduleID:                39,
						tableID:                 id,
						notificationTitle:       "Project Budget Rationale",
						notificationDescription: `${feedback}: Your request has been approved.`,
						notificationType:        7,
						employeeID,
					};
					thisCondition = true;
				} else {
					status = 1;
					notificationData = {
						moduleID:                39,
						tableID:                 id,
						notificationTitle:       "Project Budget Rationale",
						notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
						notificationType:         2,
						employeeID:               getNotificationEmployeeID(approversID, dateApproved),
					};
				}

				data.append("billMaterialStatus", status);
				savebillMaterial(data, "approve", notificationData, pageContent, billMaterialID);
			
			}
		});
	// ----- END APPROVE DOCUMENT -----

	// ----- REJECT DOCUMENT -----
		$(document).on("click", "#btnReject", function () {
			const id       = decryptString($(this).attr("billMaterialID"));
			const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

			$("#modal_project_budget_rationale_content").html(preloader);
			$("#modal_project_budget_rationale .page-title").text("DENY COST ESTIMATE");
			$("#modal_project_budget_rationale").modal("show");
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
				<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
				billMaterialID="${encryptString(id)}"
				code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
				<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
			</div>`;
			$("#modal_project_budget_rationale_content").html(html);
		});

		$(document).on("click", "#btnRejectConfirmation", function () {
			const id       = decryptString($(this).attr("billMaterialID"));
			const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

			const validate = validateForm("modal_project_budget_rationale");
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
						notificationTitle:       "Project Budget Rationale",
						notificationDescription: `${feedback}: Your request has been denied.`,
						notificationType:        1,
						employeeID,
					};

					savebillMaterial(data, "deny", notificationData, pageContent);
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				} 
			} 
		});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
		$(document).on("click", "#btnDrop", function() {
			const billMaterialID = decryptString($(this).attr("billMaterialID"));
			const feedback       = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

			const id = decryptString($(this).attr("billMaterialID"));
			let data = new FormData;
			data.append("billMaterialID", billMaterialID);
			data.append("action", "update");
			data.append("method", "drop");
			data.append("updatedBy", sessionID);

			savebillMaterial(data, "drop", null, pageContent);
		});
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

// ------------------------------ END ONCLICK EVENTS ------------------------------

// ------------------------------ FUNCTIONS ------------------------------

	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			billMaterialID        = "",
			reviseBillMaterialID  = "",
			employeeID            = "",
			costEstimateID 		  = "",
			costEstimateReason 	  = "",
			costEstimateRequestor = "",
			projectCode           = "",
			projectName           = "",
			projectCategory       = "",
			clientName            = "",
			clientAddress         = "",
			billMaterialReason    = "",
			billMaterialRemarks   = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			billMaterialStatus    = false,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];
		let requestProjectItems = "", requestCompanyItems = "", requestPersonnel="", requestTravel="";
		// ----- GET EMPLOYEE DATA -----
			let {
				fullname:    employeeFullname    = "",
				department:  employeeDepartment  = "",
				designation: employeeDesignation = "",
			} = employeeData(data ? employeeID : sessionID);

			let {
				fullname:    requestorFullname    = "",
				department:  requestorDepartment  = "",
				designation: requestorDesignation = "",
			} = employeeData(costEstimateID && costEstimateRequestor);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("billMaterialID", encryptString(billMaterialID));
		$("#btnBack").attr("status", billMaterialStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : ``;

		let timelineDate = "", timelineIssued = "", timelineDesign = "", timelinePriorityLevel = "";
		
		let costEstimateData  = `<option value="" ${costEstimateID ? ``: `selected`}>Select reference no.</option>`;
		costEstimateData 	  += costEstimateTableData.filter( items => costEstimateID ?  items.costEstimateID == costEstimateID : !existCostEstimateData.includes(costEstimateID)).map(items=>{
				return  `<option 
																value="${items.costEstimateID}"
																documentno="${getFormCode("CEF",items.createdAt,items.costEstimateID)}"
																
																timelinebuilderid="${items.timelineBuilderID}"
																projectcode="${items.projectCode}"
																projectname="${items.projectName}"
																projectcategory="${items.projectCategory}"
																clientname="${items.clientName}"
																clientaddress="${items.clientAddress}"
																costestimatereason="${items.costEstimateReason}"
																createdBy="${items.createdBy}"  ${items.costEstimateID == costEstimateID ? `selected` : ``}> 
																${getFormCode("CEF",items.createdAt,items.costEstimateID)}
															</option>`;
		});

		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? billMaterialID : reviseBillMaterialID;
		let documentHeaderClass = isRevise || reviseBillMaterialID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBillMaterialID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBillMaterialID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("CEF", createdAt, reviseDocumentNo)}
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
										${billMaterialID && !isRevise ? getFormCode("CEF", createdAt, billMaterialID) : "---"}
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

					<div class="row" id="form_project_budget_rationale">
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
									id="costEstimateReason"
									name="costEstimateReason"
									rows="4"
									style="resize:none;"
									disabled>${costEstimateReason||""}</textarea>
								<div class="d-block invalid-feedback" id="invalid-costEstimateReason"></div>
							</div>
						</div>

						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Reference No. ${!billMaterialID ? "<code>*</code>" : ""}</label>
								<select class="form-control validate select2"
									name="costEstimateID"
									id="costEstimateID"
									style="width: 100%"
									required
									${billMaterialID ? `disabled` : ``}>
									${costEstimateData}
								</select>
								<div class="invalid-feedback d-block" id="invalid-costEstimateID"></div>
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Project Code</label>
									<input type="text" class="form-control" name="projectCode" data-allowcharacters=" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" disabled minlength="2" maxlength="150"  value="${projectName || "-"}">
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Project Name</label>
									<input type="text" class="form-control" name="projectName" data-allowcharacters=" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" disabled minlength="2" maxlength="150"  value="${projectName || "-"}">
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Client Name</label>
								<input type="text" class="form-control" name="clientName" data-allowcharacters=" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" disabled minlength="2" maxlength="150"  value="${clientName || "-"}">
							</div>
						</div>
						<div class="col-md-8 col-sm-12">
							<div class="form-group">
								<label>Client Address</label>
								<input type="text" class="form-control" disabled  name="clientAddress" value="${clientAddress || "-"}">
								
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Requestor Name</label>
								<input type="text" class="form-control requestor-name" disabled value="${requestorFullname||"-"}">
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Department</label>
								<input type="text" class="form-control requestor-department" disabled value="${requestorDepartment||"-"}">
							</div>
						</div>
						<div class="col-md-4 col-sm-12">
							<div class="form-group">
								<label>Position</label>
								<input type="text" class="form-control requestor-position" disabled value="${requestorDesignation||"-"}">
							</div>
						</div>
						<div class="col-sm-12" id="formContentDivision">
							${billMaterialID ? formContentDivision(costEstimateID, billMaterialID, readOnly) : `<div class="alert alert-warning py-1 text-center" role="alert">
							<small class="font-weight-bold"><i class="fa fa-exclamation-circle text-warning font-weight-bold"></i> Please select reference no.</small>
					</div>`}
							
							
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
			updateTableAttribute();
			initAll();
			// projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			// if(isRevise){
			// 	changingOptions();
			// }
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
		}, 600);
	}


	// ----- FORM CONTENT DIVISION -----
		function formContentDivision(costEstimateID = null, billMaterialID = null, readOnly = false){
			// let projectPhaseItemsRequest = [], materialItemsRequest = [], designationRequest = [], travelRequest = [];
			let html = ``;
				$.ajax({
					method:      "POST",
					url:         `project_budget_rationale/getDataDivision`,
					data:{costEstimateID, billMaterialID},
					dataType:    "json",
					beforeSend: function() {
						$(`#formContentDivision`).html(preloader);
					},
					success: function(data) {
						// 1st DATA IS FOR PROJECT PHASE
						var tableBodyProjectPhase =  ``, tableMilestone  = ``;
							data[0].map(items=>{
							 var itemData = ``;
									items.milestone.map(milestoneList=>{
										 tableMilestone += `<tr class="table-row-milestone">
																<td>
																	${getMilestoneList(items.phaseID, milestoneList.milestoneID)}
																</td>
																<td>
																	<table class="table table-striped table-bordered table-responsive-xl" >
																		<thead>
																			<tr style="white-space: nowrap">
																				<th class="custom-th-md">Item Code</th>
																				<th class="custom-th-xl">Item Name</th>
																				<th class="custom-th-md">Item Classification</th>
																				<th class="custom-th-sm">Quantity</th>
																				<th class="custom-th-sm">UOM</th>
																				<th class="custom-th-sm">Unit Cost</th>
																				<th class="custom-th-sm">Total Cost</th>
																			</tr>
																		</thead>
																		<tbody class="table-body-request-items">`;
																			var itemTotalCost = 0;
																			milestoneList["items"].map(itemList=>{
																				itemTotalCost += parseFloat(itemList.itemTotalCost);
																				tableMilestone += `<tr style="white-space: nowrap">
																									<td>
																										<div class="milestone-item-code" itemid="${itemList.itemID}" brandname=${itemList.itemBrandName}>${itemList.itemCode}</div>
																									</td>
																									<td> 
																										<div class="milestone-item-name">${itemList.itemName}</div>
																									</td>
																									<td>
																										<div class="milestone-item-classification">${itemList.itemClassification}</div>
																									</td>
																									<td>
																										<div class="milestone-quantity">${itemList.itemQuantity}</div>
																									</td>
																									<td>
																										<div class="milestoneUom">${itemList.itemUom}</div>
																									</td>
																									<td class="text-right">
																										<div class="milestone-unit-cost">${formatAmount(itemList.itemUnitCost, true)}</div>
																									</td>
																									<td class="text-right">
																										<div class="milestone-total-cost">${formatAmount(itemList.itemTotalCost, true)}</div>
																									</td>
																								</tr>`;
																			});
													 tableMilestone +=	 	`</tbody>
																			<tfoot>
																				<tr style="background-color: var(--secondary-color);">
																					<td class="font-weight-bold text-light" colspan="6">Total Cost</td>
																					<td class="text-right font-weight-bold milestone-total-cost text-light">${formatAmount(itemTotalCost, true)}</td>
																				</tr>
																			</tfoot>
																	</table>
																</td>
															</tr>`;

									});
									
									tableBodyProjectPhase += `
																	<tr style="white-space: nowrap" class="table-row-project-phase">
																		<td>
																			${getProjectPhaseList(items.phaseID)}
																		</td>
																		<td class="requestItems" projectphaserow="">
																			<table class="table table-bordered table-striped" milestone="true">
																				<thead>
																					<th style="width:150px !important;">Milestone</th>
																					<th style="width:500px;">Request Item/s</th>
																				</thead>
																				<tbody class="milestone-table-body">
																					${tableMilestone}
																				</tbody>
																			</table>
																		</td>
																	</tr>`;
								
							});

							html += `	<div class="w-100">
													<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Phase</div>
													<hr class="pb-1">
													<table class="table table-striped table-bordered table-responsive-xl projectPhaseTableReadOnly">
														<thead>
															<tr style="white-space: nowrap">
																<th style="width: 300px">Project Phase</th>
																<th style="width: 300px">Milestone</th>
															</tr>
														</thead>
														<tbody class="projectPhaseTables">
															${tableBodyProjectPhase}
														</tbody>
													</table>
											</div>`;

						// 2nd DATA IS FOR MATERIAL AND EQUIPMENT
						var tableBodyMaterial = ``, materialTotalCost = 0;
						data[1].map(items=>{ 
							materialTotalCost += parseFloat(items.itemTotalCost);
							tableBodyMaterial += `	<tr style="white-space: nowrap" class="table-row-material-equipment" itemid="${items.itemID}">
														<td><div class="material-item-code" itemid="${items.itemID}" brandname="${items.itemBrandName}">${items.itemCode}</div></td>
														<td> 
															<div class="material-item-name">${items.itemName}</div>
														</td>
														<td>
															<div class="material-item-classification">${items.itemClassification}</div>
														</td>
														<td>
															<div class="material-quantity">${items.itemQuantity}</div>
														</td>
														<td><div class="materialUom">${items.itemUom}</div></td>
														<td class="text-right">
															<div class="material-unit-cost">${formatAmount(items.itemUnitCost, true)}</div>
														</td>
														<td class="text-right">
															<div class="material-total-cost">${formatAmount(items.itemTotalCost, true)}</div>
														</td>
													</tr>`;
						});

						html += `	
									<div class="w-100">
										<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Material Equipment</div>
										<hr class="pb-1">
										<table class="table table-striped table-bordered table-responsive-xl materialEquipmentTableReadOnly">
											<thead>
												<tr style="white-space: nowrap">
													<th class="custom-th-md">Item Code</th>
													<th class="custom-th-xl">Item Name</th>
													<th class="custom-th-md">Item Classification</th>
													<th class="custom-th-sm">Quantity</th>
													<th class="custom-th-sm">UOM</th>
													<th class="custom-th-sm">Unit Cost</th>
													<th class="custom-th-sm">Total Cost</th>
												</tr>
											</thead>
											<tbody class="materialEquipmentTables">
												${tableBodyMaterial}
											</tbody>
											<tfoot>
												<tr style="background-color: var(--secondary-color); color: var(--font-white);">
													<td class="text-light font-weight-bold" colspan="6">Total Cost</td>
													<td class="text-light text-right font-weight-bold material-total-cost">${formatAmount(materialTotalCost, true)}</td>
												</tr>
											</tfoot>
										</table>
									</div>`;

						// 3rd DATA IS FOR MANPOWER
						var manpowerTableBody = ``, manpowerTotalCost = 0;
						data[2].map(manpowerList=>{
							var totalCost, unitCost;
							if(billMaterialID && readOnly){
								unitCost 	= manpowerList.unitCost;;
								totalCost 	= manpowerList.totalCost;;
							}else{
								unitCost 		= manpowerList.hourlyRate;
								var subTotal 	= parseFloat(manpowerList.designationQuantity) * parseFloat(manpowerList.designationTotalManHours);
								totalCost 		= parseFloat(unitCost) * parseFloat(subTotal);
							}
							manpowerTotalCost += parseFloat(totalCost);
							manpowerTableBody +=   `	<tr class="manpowerRowData" designationid="${manpowerList.designationID}">
															<td>
																<div class="manpowerDesignationCode" designationid="${manpowerList.designationID}">
																	${manpowerList.designationCode}
																</div>
															</td>
															<td>
																<div class="manpowerDesignation">
																	${manpowerList.designation}
																</div>
															</td>
															<td>
																<div class="manpowerQuantity">${manpowerList.designationQuantity}</div>
															</td>
															<td>
																<div class="manpowerTotalManHours">${manpowerList.designationTotalManHours}</div>
															</td>
															<td class="text-right">
																<div class="manpowerUnitCost">${formatAmount(unitCost, true)}</div>
															</td>
															<td class="text-right">
																<div class="manpowerTotalCost">${formatAmount(totalCost, true)}</div>
															</td>
														</tr>`;
						});
						html += `	<div class="w-100">
										<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Manpower</div>
										<hr class="pb-1">
										<table class="table table-striped table-bordered table-responsive-xl manpowerTable">
											<thead>
												<tr style="white-space: nowrap">
													<th class="custom-th-md">Designation Code</th>
													<th class="custom-th-xl">Designation</th>
													<th class="custom-th-sm">Quantity</th>
													<th class="custom-th-sm">Total Hours</th>
													<th class="custom-th-sm">Unit Cost</th>
													<th class="custom-th-sm">Total Cost</th>
												</tr>
											</thead>
											<tbody class="manpowerTables">
												${manpowerTableBody}
											</tbody>
											<tfoot>
												<tr style="background-color: var(--secondary-color); color: var(--font-white);">
													<td text-light font-weight-bold" colspan="5">Total Cost</td>
													<td text-light text-right font-weight-bold manpower-total-cost">${formatAmount(manpowerTotalCost, true)}</td>
												</tr>
											</tfoot>
										</table>
									</div>`;

						// 4th DATA IS FOR TRAVEL AND TRANSPORTATION; 
						if(data[3].length > 0){
							var tableBodyTravel = ``, tableBodyTotalCost = 0;
							data[3].map((travelList, travelList_index)=>{
								if(travelList.vehicleCategoryType=="vehicle" || travelList.vehicleCategoryType == "Vehicle"){
									tableBodyTravel += `	<tr style="white-space: nowrap" class="table-row-travel">
																	<td>
																		<div class="travel-type">Vehicle</div>
																	</td>
																	<td class="travelTypeRequest">
																		<table class="table table-bordered table-striped" travel="true">
																			<thead>
																				<th class="custom-th-md">Vehicle Code</th>
																				<th style="width:700px;">Vehicle</th>
																				<th style="width:700px;">Plate Number/Conduction Number</th>
																				<th style="width:700px;">Average Fuel Consumption</th>
																				<th style="width:700px;">Fuel Type</th>
																				<th style="width:700px;">Distance (in km)</th>
																				<th style="width:700px;">Liters</th>
																				<th style="width:1500px;">Unit Cost</th>
																				<th style="width:700px;">Total Cost</th>
																			</thead>
																			<tbody class="travel-vehicle-table-body">`;
																		var detailsTotalCost = 0;
																		travelList["details"].map((detailList, detailList_index)=>{
																			detailsTotalCost += parseFloat(detailList.totalCost || 0);
																			tableBodyTravel += `	<tr class="table-row-vehicle" travelrequestid="${detailList.travelRequestID}">
																										<td>
																											<div class="travel-vehicle-code" vehicleid="${detailList.vehicleID}">${detailList.vehicleCode}</div>
																										</td>
																										<td>
																											<div class="travel-vehicle">${detailList.vehicleName}</div>
																										</td>
																										<td><div class="travel-vehicle-plate-number">${detailList.vehiclePlateNumber}</div></td>
																										<td><div class="travel-vehicle-consumption">${detailList.vehicleFuelConsumption} km/L</div></td>
																										<td><div class="travel-vehicle-gas">${detailList.vehicleGasType}</div></td>
																										<td>
																											<div class="travel-vehicle-distance">${detailList.vehicleDistance}</div>
																										</td>
																										<td><div class="travel-vehicle-liters">${detailList.vehicleLiters}/L</div></td>
																										<td>
																											<div class="travel-vehicle-unit-cost">
																													<div class="input-group">
																														<div class="input-group-prepend">
																															<span class="input-group-text">₱</span>
																														</div>
																														<input type="text" 
																															class="form-control text-right amount" 
																															name="vehicle-unit-cost"
																															value="${detailList.unitCost}"
																															${readOnly ? "disabled" : ""}
																															id="vehicleUnitCost${travelList_index}_${detailList_index}"
																															min="1">
																													</div>
																													<div class="invalid-feedback d-block" id="invalid-vehicleUnitCost${travelList_index}_${detailList_index}"></div>
																											</div>
																										</td>
																										<td class="text-right">
																											<div class="travel-vehicle-total-cost">${detailList.totalCost ? formatAmount(detailList.totalCost) : "-"}</div>
																										</td>
																									</tr>`;
																		});
																		tableBodyTotalCost += parseFloat(detailsTotalCost);
													tableBodyTravel +=		`</tbody>
																	</table>
																</td>
																<td class="text-right">
																	<div class="travel-row-unit-cost vehicle">${detailsTotalCost ? formatAmount(detailsTotalCost, true) :  "-"}</div>
																</td>
															</tr>`;
								}else{
									tableBodyTravel +=  `	<tr style="white-space: nowrap" class="table-row-travel">
																<td>
																	<div class="travel-type">${travelList.vehicleCategoryType == "toll"  || travelList.vehicleCategoryType == "Toll"  ? "Toll" : "Commute"}</div>
																</td>
																<td class="travelTypeRequest">
																	<div class="travel-description" travelrequestid="${travelList["details"][0].travelRequestID}">${travelList["details"][0].travelTypeDescription}</div>
																</td>
																<td>
																	<div class="travel-row-unit-cost">
																			<div class="input-group">
																				<div class="input-group-prepend">
																					<span class="input-group-text">₱</span>
																				</div>
																				<input type="text" 
																					class="form-control text-right amount" 
																					name="row-unit-cost"
																					value="${travelList["details"][0].unitCost}"
																					${readOnly ? "disabled" : ""}
																					id="rowUnitCost${travelList_index}"
																					min="1">
																			</div>
																			<div class="invalid-feedback d-block" id="invalid-rowUnitCost${travelList_index}"></div>
																	</div>
																</td>
															</tr>`;
									tableBodyTotalCost += parseFloat(travelList["details"][0].unitCost);
								}
							});
							html += `	<div class="w-100">
											<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Travel and Transportation</div>
											<hr class="pb-1">
											<table class="table table-striped table-bordered table-responsive-xl travelTableReadOnly">
												<thead>
													<tr style="white-space: nowrap">
														<th style="width:100px !important">Travel Type</th>
														<th style="width:600px !important">Request/s</th>
														<th style="width:200px !important">Total Cost/s</th>
														
													</tr>
												</thead>
												<tbody class="travelTableBody">
													${tableBodyTravel}
												</tbody>
												<tfoot>
													<tr style="background-color: var(--secondary-color); color: var(--font-white);">
														<td class="text-light font-weight-bold" colspan="2">Total Cost</td>
														<td class="text-light text-right font-weight-bold">
															<div class="travel-total-cost">${tableBodyTotalCost? formatAmount(tableBodyTotalCost,true): "-"}</div>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>`;
						}
						
						
					},
					error: function() {
						setTimeout(() => {
							showNotification("danger", "System error: Please contact the system administrator for assistance!");
						}, 500);
					}
				}).done(function() {

					setTimeout(() => {
						$("#formContentDivision").html(html);
						initAll();
						updateTableAttribute();
						initDataTables();
					}, 800);
				});
		}
	// ----- END FORM CONTENT DIVISION -----

	
	// ----- PROJECT PHASE DESIGNATION -----
		function projectPhaseDesignation(phaseID = null){
			let html =``;
			if(phaseID){
				var tempDesignation = [], designation = [];
				listEmployeeList.filter(items => items.phaseID == phaseID).map( items => {
					var temp = {
						designationID: items.designationID,
						designation: items.designation,
						phaseID: items.phaseID
					};
					if(!tempDesignation.some(data => data.designationID == items.designationID)){
						tempDesignation.push(temp);
					}
				});

				tempDesignation.map(items=>{
					var quantity = listEmployeeList.filter(list=> list.phaseID ==  items.phaseID && list.designationID == items.designationID);
					var totalManHours = 0;
					quantity.map(quantityManHours => {
					var add = 	quantityManHours["assignedManHours"] || 0 ;
					totalManHours += parseFloat(add);
					});
					var temp = {
						designationID: items.designationID,
						designation: items.designation,
						quantity: quantity.length,
						totalManHours: totalManHours
					};	
					designation.push(temp);
				});;
				designation.map(items=>{
					html += `
								<tr style="white-space: nowrap">
									<td>${getFormCode("DSN", moment(), items.designationID)}</td>
									<td>${items.designation}</td>
									<td>${items.quantity}</td>
									<td>${items.totalManHours}</td>
								</tr>
							`;
				});
				
				return html;
			}
		}
	// ----- END PROJECT PHASE DESIGNATION -----

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

				headerButton(true, "Add Project Budget Rationale");
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

	// ----- GET Project Budget Rationale DATA -----
		function getbillMaterialData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {
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

			let data = { projectPhaseData : [], materialData : [], manpowerData : [], travelData : []}, formData = new FormData;
			const approversID = method != "approve" && moduleApprover;
			if (id) {
				data["billMaterialID"] = id;
				formData.append("billMaterialID", id);

				if (status != "2") {
					data["billMaterialStatus"] = status;
					formData.append("billMaterialStatus", status);
				}
			}

			data["action"]                = action;
			data["method"]                = method;
			data["updatedBy"]             = sessionID;
			
			formData.append("action", action);
			formData.append("method", method);
			formData.append("updatedBy", sessionID);




			if (currentStatus == "0" && method != "approve") {
				
				data["employeeID"]          = sessionID;
				data["costEstimateID"]		= $("[name=costEstimateID]").val() || null;
				data["costEstimateCode"]    = $("[name=costEstimateID] option:selected").attr("documentno") || null;
				data["timelineBuilderID"] 	= $("[name=timelinebuilderid] option:selected").attr("documentno") || null;
				data["projectCode"]         = $("[name=costEstimateID] option:selected").attr("projectcode") || null;
				data["projectName"]         = $("[name=costEstimateID] option:selected").attr("projectname") || null;
				data["projectCategory"]     = $("[name=costEstimateID] option:selected").attr("projectcategory") || null;
				data["clientName"]          = $("[name=costEstimateID] option:selected").attr("clientname") || null;
				data["clientAddress"]       = $("[name=costEstimateID] option:selected").attr("clientaddress") || null;
				data["billMaterialReason"] 	= $("[name=costEstimateID] option:selected").attr("costestimatereason") || null;
				
				
				formData.append("employeeID", sessionID);
				formData.append("costEstimateID", $("[name=costEstimateID]").val() || null);
				formData.append("costEstimateCode", $("[name=costEstimateID] option:selected").attr("documentno") || null);
				formData.append("timelineBuilderID", $("[name=costEstimateID] option:selected").attr("timelinebuilderid") || null);
				formData.append("projectCode", $("[name=costEstimateID] option:selected").attr("projectcode") || null);
				formData.append("projectName", $("[name=costEstimateID] option:selected").attr("projectname") || null);
				formData.append("projectCategory", $("[name=costEstimateID] option:selected").attr("projectcategory") || null);
				formData.append("clientName", $("[name=costEstimateID] option:selected").attr("clientname") || null);
				formData.append("clientAddress", $("[name=costEstimateID] option:selected").attr("clientaddress") || null);
				formData.append("billMaterialReason", $("[name=costEstimateID] option:selected").attr("costestimatereason") || null);

				if (action == "insert") {
					data["createdBy"]   = sessionID;
					data["createdAt"]   = dateToday();

					formData.append("createdBy", sessionID);
					formData.append("createdAt", dateToday());
				} else if (action == "update") {
					data["billMaterialID"] = id;
					formData.append("billMaterialID", id);
				}
				
				if (method == "submit") {
					data["submittedAt"] = dateToday();
					formData.append("submittedAt", dateToday());
					if (approversID) {
						data["approversID"]           = approversID;
						data["billMaterialStatus"] = 1;

						formData.append("approversID", approversID);
						formData.append("billMaterialStatus", 1);
					} else {  // AUTO APPROVED - IF NO APPROVERS
						data["approversID"]           = sessionID;
						data["approversStatus"]       = 2;
						data["approversDate"]         = dateToday();
						data["billMaterialStatus"] 	  = 2;

						formData.append("approversID", sessionID);
						formData.append("approversStatus", 2);
						formData.append("approversDate", dateToday());
						formData.append("billMaterialStatus", 2);
					}
				}
				var projectPhaseCount = 0;
				$(".table-row-project-phase").each(function(i, obj){
					var thisChildren 			= $(this).find(".table-row-milestone");
					var projectPhaseID 			= $(this).find(".project-phase").attr("phaseid");
					var projectPhaseDescription = $(this).find(".project-phase").text();

					thisChildren.each(function(j){

						var milestoneID 	= $(this).find(`.project-phase-milestone`).attr("milestoneid"); 
						var milestoneName	= $(this).find(`.project-phase-milestone`).text(); 

						$(this).find(".table-body-request-items tr").each(function(k){

							var milestoneItemID 			= $(this).find(".milestone-item-code").attr("itemid");
							var milestoneItemCode 			= $(this).find(".milestone-item-code").text();
							var milestoneItemName 			= $(this).find(".milestone-item-name").text();
							var milestoneItemClassification = $(this).find(".milestone-item-classification").text().trim();
							var milestoneItemQuantity 		= $(this).find(".milestone-quantity").text();
							var milestoneItemUom 			= $(this).find(".milestoneUom").text();
							var milestoneItemBrandName		= $(this).find(".milestone-item-code").attr("brandname");
							var milestoneItemUnitCostData 	= $(this).find(".milestone-unit-cost").text().replace("₱ ","");
							var milestoneItemTotalCostData	= $(this).find(".milestone-total-cost").text().replace("₱ ","");
							var unitCostCondtion 			= milestoneItemUnitCostData.indexOf(",");
							var totalCostCondition 			= milestoneItemTotalCostData.indexOf(",");
							var milestoneItemUnitCost 		= unitCostCondtion ? milestoneItemUnitCostData.replaceAll(",","") : milestoneItemUnitCostData;
							var milestoneItemTotalCost		= totalCostCondition ? milestoneItemTotalCostData.replaceAll(",","") : milestoneItemTotalCostData;
							var temp = {
								projectPhaseID,projectPhaseDescription,milestoneID,milestoneName,milestoneItemID,milestoneItemCode,
								milestoneItemName,milestoneItemClassification,milestoneItemQuantity,milestoneItemUom,milestoneItemBrandName,
								milestoneItemUnitCost,milestoneItemTotalCost
							}
							data["projectPhaseData"].push(temp);

							formData.append(`projectPhaseData[${projectPhaseCount}][projectPhaseID]`, projectPhaseID);
							formData.append(`projectPhaseData[${projectPhaseCount}][projectPhaseDescription]`, projectPhaseDescription);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneID]`, milestoneID);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneName]`, milestoneName);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemID]`, milestoneItemID);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemCode]`, milestoneItemCode);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemName]`, milestoneItemName);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemClassification]`, milestoneItemClassification);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemQuantity]`, milestoneItemQuantity);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemUom]`, milestoneItemUom);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemBrandName]`, milestoneItemBrandName);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemUnitCost]`, milestoneItemUnitCost);
							formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemTotalCost]`, milestoneItemTotalCost);
							projectPhaseCount += 1;
						});
					});
				});

				$(".table-row-material-equipment").each(function(i,obj){
					var materialItemCode 			= $(this).find(".material-item-code").text();
					var materialItemID 				= $(this).find(".material-item-code").attr("itemid");
					var materialItemBrandName 		= $(this).find(".material-item-code").attr("brandname");
					var materialItemName 			= $(this).find(".material-item-name").text();
					var materialItemClassification	= $(this).find(".material-item-classification").text();
					var materialItemQuantity 		= $(this).find(".material-quantity").text();
					var materialItemUom 			= $(this).find(".materialUom").text();
					var materialItemUnitCostData 	= $(this).find(".material-unit-cost").text().replaceAll("₱ ","");
					var materialItemTotalCostData 	= $(this).find(".material-total-cost").text().replaceAll("₱ ","");
					var materialItemUnitCost 	    = materialItemUnitCostData.indexOf(",") ? materialItemUnitCostData.replaceAll(",","") : materialItemUnitCostData;
					var materialItemTotalCost  		= materialItemTotalCostData.indexOf(",")? materialItemTotalCostData.replaceAll(",","") : materialItemTotalCostData;

					var temp = {
						materialItemCode,materialItemID,materialItemBrandName,materialItemName,materialItemClassification,materialItemQuantity,
						materialItemUom,materialItemUnitCost,materialItemTotalCost
					}
					data["materialData"].push(temp);
					formData.append(`materialData[${i}][materialItemCode]`, materialItemCode);
					formData.append(`materialData[${i}][materialItemID]`, materialItemID);
					formData.append(`materialData[${i}][materialItemBrandName]`, materialItemBrandName);
					formData.append(`materialData[${i}][materialItemName]`, materialItemName);
					formData.append(`materialData[${i}][materialItemClassification]`, materialItemClassification);
					formData.append(`materialData[${i}][materialItemQuantity]`, materialItemQuantity);
					formData.append(`materialData[${i}][materialItemUom]`, materialItemUom);
					formData.append(`materialData[${i}][materialItemUnitCost]`, materialItemUnitCost);
					formData.append(`materialData[${i}][materialItemTotalCost]`, materialItemTotalCost);
				});

				$(".manpowerRowData").each(function(i,obj){
					var designationID 				= $(this).find(".manpowerDesignationCode").attr("designationid");
					var designationCode 			= $(this).find(".manpowerDesignationCode").text().trim();
					var designation 				= $(this).find(".manpowerDesignation").text().trim();
					var designationQuantity 		= $(this).find(".manpowerQuantity").text().trim();
					var designationTotalManHours 	= $(this).find(".manpowerTotalManHours").text().trim();
					var designationUnitCostData 	= $(this).find(".manpowerUnitCost").text().replaceAll("₱ ","");
					var designationTotalCostData 	= $(this).find(".manpowerTotalCost").text().replaceAll("₱ ","");
					var designationUnitCost 	 	= designationUnitCostData.indexOf(",") ? designationUnitCostData.replaceAll(",", "") : designationUnitCostData;
					var designationTotalCost 		= designationTotalCostData.indexOf(",") ? designationTotalCostData.replaceAll(",", "") : designationTotalCostData;
					var temp = {
						designationID,designationCode,designation,designationQuantity,designationTotalManHours,designationUnitCost,designationTotalCost
					};

					data["manpowerData"].push(temp);

					formData.append(`manpowerData[${i}][designationID]`, designationID);
					formData.append(`manpowerData[${i}][designationCode]`, designationCode);
					formData.append(`manpowerData[${i}][designation]`, designation);
					formData.append(`manpowerData[${i}][designationQuantity]`, designationQuantity);
					formData.append(`manpowerData[${i}][designationTotalManHours]`, designationTotalManHours);
					formData.append(`manpowerData[${i}][designationUnitCost]`, designationUnitCost);
					formData.append(`manpowerData[${i}][designationTotalCost]`, designationTotalCost);
				});

				var travelCount = 0;
				$(".table-row-travel").each(function(i,obj){
					
					var travelType		= $(this).find(".travel-type").text();
					// var condition 		= $(this).find(".travelTypeRequest.travel-description");
					
					if(travelType == "Vehicle" || travelType == "vehicle"){
						$(".table-row-vehicle").each(function(j,obj){
							var vehicleID 				= $(this).find(`.travel-vehicle-code`).attr("vehicleid");
							var vehicleCode 			= $(this).find(`.travel-vehicle-code`).text();
							var vehicleName 			= $(this).find(`.travel-vehicle`).text();
							var vehiclePlateNumber 		= $(this).find(`.travel-vehicle-plate-number`).text();
							var vehicleFuelConsumption 	= $(this).find(`.travel-vehicle-consumption`).text();
							var vehicleGasType 			= $(this).find(`.travel-vehicle-gas`).text();
							var vehicleDistance 		= $(this).find(`.travel-vehicle-distance`).text();
							var vehicleLitersData 	 	= $(this).find(`.travel-vehicle-liters`).text().replaceAll("/L","");
							var vehicleUnitCostData 	= $(this).find(`.travel-vehicle-unit-cost [name=vehicle-unit-cost]`).val();
							var vehicleTotalCostData 	= $(this).find(`.travel-vehicle-total-cost`).text();
							var vehicleLiters 			= vehicleLitersData ? (vehicleLitersData.indexOf(",") ? vehicleLitersData.replaceAll(",","") : vehicleLitersData) : vehicleLitersData; 
							var travelTypeUnitCost 		= vehicleUnitCostData ? (vehicleUnitCostData.indexOf(",") ? vehicleUnitCostData.replaceAll(",","") : vehicleUnitCostData) : vehicleUnitCostData;
							var travelTypeTotalCost  	= vehicleTotalCostData ? (vehicleTotalCostData.indexOf(",") ? vehicleTotalCostData.replaceAll(",","") : vehicleTotalCostData) : vehicleTotalCostData;

							var temp = {
								travelType, vehicleCode,vehicleID,vehicleName,vehiclePlateNumber,vehicleGasType,vehicleDistance,vehicleLiters,travelTypeUnitCost,travelTypeTotalCost
							}
							data["travelData"].push(temp);
							
							formData.append(`travelData[${travelCount}][travelType]`, travelType);
							formData.append(`travelData[${travelCount}][vehicleID]`, vehicleID);
							formData.append(`travelData[${travelCount}][vehicleCode]`, vehicleCode);
							formData.append(`travelData[${travelCount}][vehicleName]`, vehicleName);
							formData.append(`travelData[${travelCount}][vehiclePlateNumber]`, vehiclePlateNumber);
							formData.append(`travelData[${travelCount}][vehicleFuelConsumption]`, vehicleFuelConsumption);
							formData.append(`travelData[${travelCount}][vehicleGasType]`, vehicleGasType);
							formData.append(`travelData[${travelCount}][vehicleDistance]`, vehicleDistance);
							formData.append(`travelData[${travelCount}][vehicleLiters]`, vehicleLiters);
							formData.append(`travelData[${travelCount}][travelTypeUnitCost]`, travelTypeUnitCost);
							formData.append(`travelData[${travelCount}][travelTypeTotalCost]`, travelTypeTotalCost);
							travelCount += 1;

						});
						
						
					}else{
						var travelTypeDescription 		= $(this).find(".travel-description").text();
						var travelTypeTotalCostData 	= $(this).find("[name=row-unit-cost]").val() || 0;
						var travelTypeTotalCost 		= travelTypeTotalCostData ? (travelTypeTotalCostData.indexOf(",") ? travelTypeTotalCostData.replaceAll(",","") : travelTypeTotalCostData) : travelTypeTotalCostData;

						
						var temp = {
							travelType, travelTypeDescription, "travelTypeUnitCost":travelTypeTotalCost, travelTypeTotalCost
						}
						data["travelData"].push(temp);
						formData.append(`travelData[${travelCount}][travelType]`, travelType);
						formData.append(`travelData[${travelCount}][travelTypeDescription]`, travelTypeDescription);
						formData.append(`travelData[${travelCount}][travelTypeUnitCost]`, travelTypeTotalCost);
						formData.append(`travelData[${travelCount}][travelTypeTotalCost]`, travelTypeTotalCost);
						travelCount += 1;
					}

				});
			} 

			

			return isObject ? data : formData;
		}
	// ----- END GET Project Budget Rationale DATA -----

	// ----- UPDATE DELETE BUTTON -----
		function updateDeleteButton() {
			let thisArray = ["[projectPhase=true]|projectPhaseCount", "[material=true]|materialCount","[travel=true]|travelCount"];
			thisArray.map(items=>{
				var splitItems = items.split("|");
					splitItems[1] = 0;
				var existNone  = 0;
				
				$(".checkboxrow"+splitItems[0]).each(function() {
					this.checked && splitItems[1]++;
				});
				$(".btnDeleteRow"+splitItems[0]).attr("disabled", splitItems[1] == 0);
				var optionName = splitItems[0] == "[personnel=true]" ? "designationID" : "itemID";
				$(`[name=${optionName}]`+splitItems[0]).each(function(){
					this.value == "none" || this.value == "-" ? existNone += 1 : "";
				});
				$(".btnAddRow"+splitItems[0]).attr("disabled", existNone > 0);
			});
			setTimeout(() => {
				initAll();
			}, 300);
		}
	// ----- END UPDATE DELETE BUTTON -----

	// ----- UPDATE UNIT COST FOR TRAVEL -----
		function updateTravelUnitCost(attrName = nul){
			if(attrName){
				let travelTotalCost = 0, vehicleTotalCost = 0;
				// row-unit-cost	
				// vehicle-unit-cost
				// travel-row-unit-cost(div)
				
				// VEHICLE UNIT COST
				$(`[name=vehicle-unit-cost]`).each(function(){
					var thisValue = $(this).val() || 0;
					var tableRowLiters    = $(this).closest(".table-row-vehicle").find(".travel-vehicle-liters").text();
					var litersValue  	  = tableRowLiters.replaceAll(",","").replaceAll("/L", "") || tableRowLiters.replaceAll("/L", "");
					var totalCost  		  = parseFloat(thisValue) * parseFloat(litersValue);
					$(this).closest(".table-row-vehicle").find(".travel-vehicle-total-cost").text(totalCost? formatAmount(totalCost.toFixed(2), true) : "-");
					vehicleTotalCost += parseFloat(totalCost);
				});
					// EXECUTION FOR VEHICLE TOTAL COST
					$(".travel-vehicle-sub-total-cost").text(vehicleTotalCost ? formatAmount(vehicleTotalCost, true) :  "-" );
					if(attrName == "vehicle-unit-cost"){
						$(".travel-row-unit-cost.vehicle").text(vehicleTotalCost ? formatAmount(vehicleTotalCost, true) :  "-");
					}


				// TRAVEL ROW UNIT COST
				$(`[name=row-unit-cost]`).each(function(){
					var condition = $(this).val().indexOf(",");
					var thisValue = `` ;
						if(condition){
							thisValue = $(this).val().replaceAll(",","") || 0;
						}else{
							thisValue = $(this).val()|| 0;
						}
					travelTotalCost += parseFloat(thisValue);
				});	

				travelTotalCost += parseFloat(vehicleTotalCost || 0);

				$(".travel-total-cost").text(travelTotalCost ? formatAmount(travelTotalCost, true) : "-");
				
			}
		}
	// ----- END UPDATE UNIT COST FOR TRAVEL -----

	// ----- REMOVE IS-VALID IN TABLE -----
		function removeIsValid(element = "table") {
			$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
			.removeClass("is-valid").removeClass("no-error");
		}
	// ----- END REMOVE IS-VALID IN TABLE -----

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

	// CHECK IF THE DOCUMENT IS ALREADY REVISED
		function isRevised(id = null){
			let revised = false;
			var tableData = getTableData("pms_bill_material_tbl","reviseBillMaterialID",`reviseBillMaterialID=`+id);
			// console.log(tableData);
			revised = tableData.length > 0 ? true : false;
			return revised; 
		}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED
	// --------------- DATABASE RELATION ---------------
		function getConfirmation(method = "submit") {
			const title = "Project Budget Rationale";
			let swalText, swalImg;

			$("#modal_project_budget_rationale").text().length > 0 && $("#modal_project_budget_rationale").modal("hide");

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

		function savebillMaterial(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
			let thisReturnData = false;
			if (data) {
				const confirmation = getConfirmation(method);
				confirmation.then(res => {
					if (res.isConfirmed) {
						$.ajax({
							method:      "POST",
							url:         `project_budget_rationale/savebillMaterial`,
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
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} submitted successfully!`;
								} else if (method == "save") {
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} saved successfully!`;
								} else if (method == "cancelform") {
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} cancelled successfully!`;
								} else if (method == "approve") {
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} approved successfully!`;
								} else if (method == "deny") {
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} denied successfully!`;
								} else if (method == "drop") {
									swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} dropped successfully!`;
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
											// if(lastApproverID != 0){
											// 	$.ajax({
											// 		method: "POST",
											// 		url: `${base_url}pms/project_budget_rationale/saveCanvassingData`,
											// 		data:{"billMaterialID":lastApproverID},
											// 		dataType: "json",
											// 		async: false,
											// 		success: function (data) {
											// 			console.log("tangina mo ka");
											// 		},
											// 	});
											// }

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
							if(method != "submit"){
								if (method != "deny") {
									callback && callback();
								} else {
									$("#modal_project_budget_rationale").text().length > 0 && $("#modal_project_budget_rationale").modal("show");
								}
							}
									
						} else if (res.isDismissed) {
							if (method == "deny") {
								$("#modal_project_budget_rationale").text().length > 0 && $("#modal_project_budget_rationale").modal("show");
							}
						}
					}
				});
			}
			return thisReturnData;
		}
	// --------------- END DATABASE RELATION ---------------

	function thousands_separators(num){
		var num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	}

// ------------------------------ END FUNCTIONS ------------------------------




});