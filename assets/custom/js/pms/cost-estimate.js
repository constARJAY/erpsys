$(document).ready(function(){
		const allowedUpdate = isUpdateAllowed(38);
    // ----- MODULE APPROVER -----
		const moduleApprover = getModuleApprover(38);
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
					"pms_cost_estimate_tbl", 
					"reviseCostEstimateID", 
					"reviseCostEstimateID IS NOT NULL AND costEstimateStatus != 4");
				return revisedDocumentsID.map(item => item.reviseCostEstimateID).includes(id);
			}
			return false;
		}
	// ----- END IS DOCUMENT REVISED -----

	// ----- VIEW DOCUMENT -----
		function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
			const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
				const tableData = getTableData("pms_cost_estimate_tbl", "", "costEstimateID=" + id);

				if (tableData.length > 0) {
					let {
						employeeID,
						costEstimateStatus
					} = tableData[0];

					let isReadOnly = true, isAllowed = true;

					if (employeeID != sessionID) {
						isReadOnly = true;
						if (costEstimateStatus == 0 || costEstimateStatus == 4) {
							isAllowed = false;
						}
					} else if (employeeID == sessionID) {
						if (costEstimateStatus == 0) {
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
				window.history.pushState("", "", `${base_url}pms/cost_estimate?view_id=${view_id}`);
			} else if (isAdd) {
				if (view_id && isRevise) {
					window.history.pushState("", "", `${base_url}pms/cost_estimate?add=${view_id}`);
				} else {
					window.history.pushState("", "", `${base_url}pms/cost_estimate?add`);
				}
			} else {
				window.history.pushState("", "", `${base_url}pms/cost_estimate`);
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
		const projectTimelineTableData	= getTableData(`pms_timeline_builder_tbl AS pptb LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = pptb.projectID JOIN pms_category_tbl AS pct ON pct.categoryID = pplt.categoryID`,
														"pptb.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pptb.createdAt AS dateCreated, projectListCode, projectListName, categoryName, ( SELECT COUNT(timelineManagementID) FROM pms_timeline_management_tbl WHERE timelineBuilderID = pptb.timelineBuilderID) AS timelineManagementCount",
														`pptb.employeeID = '${sessionID}' AND timelineBuilderStatus = '2'`);
		const vehicleList = getTableData("ims_inventory_vehicle_tbl","",`vehicleStatus = '1'`)
		
		const existProjectTimelineTableData = [];
		const clientList  = getTableData("pms_client_tbl", "*", "clientStatus = 1");
		const listOfPhase = [], listOfMilestone = [], listOfDesignation = [], listEmployeeList = [], listOfManpower = [];
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
						{ targets: 3,  width: 290 },
						{ targets: 4,  width: 150 },
						{ targets: 5,  width: 250 },
						{ targets: 6,  width: 80 },
						{ targets: 7,  width: 285 },
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
						{ targets: 3,  width: 290 },
						{ targets: 4,  width: 150 },
						{ targets: 5,  width: 250 },
						{ targets: 6,  width: 80 },
						{ targets: 7,  width: 285 },
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
						{ targets: 1,  width: 1500 },
						{ targets: 2,  width: 1000  }
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
						{ targets: 3,  width: 100  }
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
					// scrollX: true,
					sorting: false,
					searching: false,
					paging: false,
					ordering: false,
					info: false,
					scrollCollapse: true,
					columnDefs: [
						{ targets: 0,  width: "10%" },
						{ targets: 1,  width: 600}
					],
				});

		}
	// ----- END DATATABLES -----
	
	// ----- HEADER CONTENT -----
		function headerTabContent(display = true) {
			if (display) {
				if (isImModuleApprover("pms_cost_estimate_tbl", "approversID")) {
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
			let costEstimateData = getTableData(
				"pms_cost_estimate_tbl AS pcet LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
				`pcet.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pcet.createdAt AS dateCreated`,
				`pcet.employeeID != ${sessionID} AND costEstimateStatus != 0 AND costEstimateStatus != 4`,
				`FIELD(costEstimateStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcet.submittedAt, pcet.createdAt)`
			);

			let html = `
			<table class="table table-bordered table-striped table-hover" id="tableForApprroval">
				<thead>
					<tr style="white-space: nowrap">
						<th>Document No.</th>
						<th>Prepared By</th>
						<th>Project Code</th>
						<th>Project Name</th>
						<th>Current Approver</th>
						<th>Date</th>
						<th>Status</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody>`;

			costEstimateData.map((item) => {
				let {
					fullname,
					costEstimateID,
					timelineBuilderID,
					projectCode,
					projectName,
					clientName,
					clientAddress, 
					approversID,
					approversDate,
					costEstimateStatus,
					costEstimateRemarks,
					costEstimateReason,
					submittedAt,
					createdAt,
				} = item;

				let remarks       = costEstimateRemarks ? costEstimateRemarks : "-";
				let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
				let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
				let dateApproved  = costEstimateStatus == 2 || costEstimateStatus == 5 ? approversDate.split("|") : "-";
				if (dateApproved !== "-") {
					dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
				}

				let btnClass = costEstimateStatus != 0 ? "btnView" : "btnEdit";

				let button = costEstimateStatus != 0 ? `
				<button class="btn btn-view w-100 btnView" id="${encryptString(costEstimateID )}"><i class="fas fa-eye"></i> View</button>` : `
				<button 
					class="btn btn-edit w-100 btnEdit" 
					id="${encryptString(costEstimateID )}" 
					code="${getFormCode("CEF", createdAt, costEstimateID )}"><i class="fas fa-edit"></i> Edit</button>`;

				if (isImCurrentApprover(approversID, approversDate, costEstimateStatus) || isAlreadyApproved(approversID, approversDate)) {
					html += `
					<tr class="${btnClass}" id="${encryptString(costEstimateID )}">
						<td>${getFormCode("CEF", createdAt, costEstimateID )}</td>
						<td>${fullname}</td>
						<td>
							<div>
							${projectCode || '-'}
							</div>
							<small style="color:#848482;">${costEstimateReason || '-'}</small>
						</td>
						<td>${projectName}</td>
						<td>
							${employeeFullname(getCurrentApprover(approversID, approversDate, costEstimateStatus, true))}
						</td>
						<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
						<td class="text-center">
							${getStatusStyle(costEstimateStatus)}
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
			let costEstimateData = getTableData(
				"pms_cost_estimate_tbl AS pcet LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
				"pcet.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pcet.createdAt AS dateCreated",
				`pcet.employeeID = ${sessionID}`,
				`FIELD(costEstimateStatus, 0, 1, 3, 2, 4, 5), COALESCE(pcet.submittedAt, pcet.createdAt)`
			);
			let html = `
			<table class="table table-bordered table-striped table-hover" id="tableMyForms">
				<thead>
					<tr style="white-space: nowrap">
						 <th>Document No.</th>
						<th>Prepared By</th>
						<th>Project Code</th>
						<th>Project Name</th>
						<th>Current Approver</th>
						<th>Date</th>
						<th>Status</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody>`;

			costEstimateData.map((item) => {
				let {
					fullname,
					costEstimateID,
					timelineBuilderID,
					projectCode,
					projectName,
					projectCategory,
					clientName,
					clientAddress,
					approversID,
					approversDate,
					costEstimateStatus,
					costEstimateRemarks,
					costEstimateReason,
					submittedAt,
					createdAt,
				} = item;

				let remarks       = costEstimateRemarks ? costEstimateRemarks : "-";
				let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
				let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
				let dateApproved  = costEstimateStatus == 2 || costEstimateStatus == 5 ? approversDate.split("|") : "-";
				if (dateApproved !== "-") {
					dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
				}

				// PUSHING EXIST TIMELINE BUILDER;
				timelineBuilderID ? existProjectTimelineTableData.push(timelineBuilderID) : ``;
				let btnClass = costEstimateStatus != 0 ? "btnView" : "btnEdit";

				let button = costEstimateStatus != 0 ? `
				<button class="btn btn-view w-100 btnView" id="${encryptString(costEstimateID )}"><i class="fas fa-eye"></i> View</button>` : `
				<button 
					class="btn btn-edit w-100 btnEdit" 
					id="${encryptString(costEstimateID )}" 
					code="${getFormCode("CEF", createdAt, costEstimateID )}"><i class="fas fa-edit"></i> Edit</button>`;

				html += `
				<tr class="${btnClass}" id="${encryptString(costEstimateID )}">
					<td>${getFormCode("CEF", createdAt, costEstimateID )}</td>
					<td>${fullname}</td>
					<td>
						<div>
						${projectCode || '-'}
						</div>
						<small style="color:#848482;">${costEstimateReason || '-'}</small>
					</td>
					<td>${projectName}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, costEstimateStatus, true))}
					</td>

					
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(costEstimateStatus)}
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
					costEstimateID     = "",
					costEstimateStatus = "",
					employeeID            = "",
					approversID           = "",
					approversDate         = "",
					createdAt             = new Date
				} = data && data[0];

				let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
				if (employeeID === sessionID) {
					if (costEstimateStatus == 0 || isRevise) {
						// DRAFT
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnSubmit" 
							costEstimateID="${encryptString(costEstimateID)}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
							Submit
						</button>`;

						if (isRevise) {
							button += `
							<button 
								class="btn btn-cancel px-5 p-2" 
								id="btnCancel"
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF",createdAt, costEstimateID)}"
								revise="${isRevise}"
								cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
								Cancel
							</button>`;
						} else {
							button += `
							<button 
								class="btn btn-cancel px-5 p-2"
								id="btnCancelForm" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"
								revise=${isRevise}><i class="fas fa-ban"></i> 
								Cancel
							</button>`;
						}

						
					} else if (costEstimateStatus == 1) {
						// FOR APPROVAL
						if (!isOngoing) {
							button = `
							<button 
								class="btn btn-cancel px-5 p-2"
								id="btnCancelForm" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"
								status="${costEstimateStatus}"><i class="fas fa-ban"></i> 
								Cancel
							</button>`;
						}
					} else if(costEstimateStatus == 2){
						// DROP
						button = `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnDrop" 
							costEstimateID="${encryptString(costEstimateID)}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"
							status="${costEstimateStatus}"><i class="fas fa-ban"></i> 
							Drop
						</button>`;
					}else if (costEstimateStatus == 3) {
						// DENIED - FOR REVISE
						if(!isDocumentRevised(costEstimateID)){
							button = `
							<button
								class="btn btn-cancel px-5 p-2"
								id="btnRevise" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"
								status="${costEstimateStatus}"><i class="fas fa-clone"></i>
								Revise
							</button>`;
						}
								
					} else if (costEstimateStatus == 4) {
						// CANCELLED - FOR REVISE
						if (!isDocumentRevised(costEstimateID)) {
							button = `
							<button
								class="btn btn-cancel px-5 p-2"
								id="btnRevise" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"
								status="${costEstimateStatus}"
								cancel="true"><i class="fas fa-clone"></i>
								Revise
							</button>`;
						}
					}
				} else {
					if (costEstimateStatus == 1) {
						if (isImCurrentApprover(approversID, approversDate)) {
							button = `
							<button 
								class="btn btn-submit px-5 p-2" 
								id="btnApprove" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"><i class="fas fa-paper-plane"></i>
								Approve
							</button>
							<button 
								class="btn btn-cancel px-5 p-2"
								id="btnReject" 
								costEstimateID="${encryptString(costEstimateID)}"
								code="${getFormCode("CEF", createdAt, costEstimateID)}"><i class="fas fa-ban"></i> 
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
			let html = `<option disabled ${!phaseID ? `selected` :``}>Please select a project phase</option>`;
			listOfPhase.map( items => {
					html +=	 `<option
								value 	= "${items.phaseID}"
								phaseid = "${items.phaseID}"
								phasedescription = "${items.phaseDescription}"
								${phaseID == items.phaseID ? `selected`: ``}
								>${items.phaseDescription}

							</option>`;
					});
			return html;
		}
	// ----- END PROJECT PHASE -----
	// ---123-123-123-12-312-3
		function getMilestoneList(phaseID = null, milestoneListID = null){
			var option 			= `<option disabled ${milestoneListID?``:`selected`} >Please select a milestone</option>`;
			option += listOfMilestone.filter(items => items.phaseID == phaseID).map(items=>{
					return `<option value="${items.projectMilestoneID}" ${items.projectMilestoneID == milestoneListID ? `selected`:``} milestonename="${items.projectMilestoneName}">${items.projectMilestoneName}</option>`
			}).join();
			return option;
		}
	// -123-123-123-12-3123-12-3

	// ----- ITEM LIST -----
		function getItemList(itemID = null){
			let html = `<option disabled ${!itemID ? `selected` : ``}>Select Item Name</option>`;
			inventoryItemList.map(items=>{
				html += `<option value="${items.itemID}" itemcode="${items.itemCode}" brandname="${items.brandName}" classificationname="${items.classificationName}" classificationid="${items.classificationID}" uom="${items.unitOfMeasurementID}" itemname="${items.itemName}" ${items.itemID == itemID ? `selected` : ``}>${items.itemName}</option>`;
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

	// ------------------------------ ONCHANGE EVENTS ------------------------------
		$(document).on("change", "[name=timelineBuilderID]", function() {
			var projectCode 		= $('option:selected', this).attr("projectcode");
			var projectName 		= $('option:selected', this).attr("projectname");
			var projectCategory 	= $('option:selected', this).attr("projectcategory");
			var clientName 			= $('option:selected', this).attr("clientname");
			var clientAddress 		= $('option:selected', this).attr("clientaddress");
			var timelineBuilderID 	= $('option:selected', this).attr("timelinebuilderid");
			var timelineStartDate 	= $('option:selected', this).attr("timelinestartdate");
			var timelineEndDate 	= $('option:selected', this).attr("timelineenddate");
			var priorityLevel 		= $('option:selected', this).attr("prioritylevel");
			var timelineIssued 		= $('option:selected', this).attr("issued");
			var timelineDesign 		= $('option:selected', this).attr("design");
			// let html  	 			= formContentDivision(timelineBuilderID);
			// $(`#formContentDivision`).html(preloader);
			formContentDivision(timelineBuilderID);
			$(`[name=projectName]`).val(`${projectName}`);
			$(`[name=projectCategory]`).val(`${projectCategory}`);
			$(`[name=clientName]`).val(`${clientName}`);
			$(`[name=clientAddress]`).val(`${clientAddress}`);
			$(`[name=timelineDate]`).val(`${timelineStartDate} - ${timelineEndDate}`);
			$(`[name=priorityLevel]`).val(`${priorityLevel}`);
			$(`[name=timelineIssued]`).val(`${timelineIssued}`);
			$(`[name=timelineDesign]`).val(`${timelineDesign}`);
		});

		$(document).on("change","[name=milestoneItems]", function(){
			let thisParent 			= $(this).closest("tr");
			let thisValue 			= $(this).val();
			let itemCode 			= $('option:selected', this).attr("itemcode");
			let brandName 			= $("option:selected", this).attr("brandname");
			let classificationID 	= $('option:selected', this).attr("classificationid");
			let classificationName  = $('option:selected', this).attr("classificationname");
			let unitOfMeasurement   = $('option:selected', this).attr("uom");
			
	
			thisParent.find(".milestone-item-code").text(itemCode);
			thisParent.find(".milestone-item-classification").text(classificationName);
			thisParent.find(".milestoneUom").text(unitOfMeasurement);
			thisParent.find(".item-brand-name").text(brandName);
			
			// $(`[name=projectCategory]`).val(`${projectCategory}`);
		});

		$(document).on("change","[name=materialItems]", function(){
			let thisParent 			= $(this).closest("tr");
			let thisValue 			= $(this).val();
			let itemCode 			= $('option:selected', this).attr("itemcode");
			let brandName 			= $("option:selected", this).attr("brandname");
			let classificationID 	= $('option:selected', this).attr("classificationid");
			let classificationName  = $('option:selected', this).attr("classificationname");
			let unitOfMeasurement   = $('option:selected', this).attr("uom");
			
	
			thisParent.find(".material-item-code").text(itemCode);
			thisParent.find(".material-item-classification").text(classificationName);
			thisParent.find(".materialUom").text(unitOfMeasurement);
			thisParent.find(".item-brand-name").text(brandName);
			
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

		$(document).on("change",  "[name=projectPhase]", function(){
			// let phaseID 		= $(this).val();
			// let thisTableRow	= $(this).closest("tr");
			// let milestoneSelect = thisTableRow.find("[name=projectMilestone]").attr("id");
			// let tableManPower   = thisTableRow.find(".tableBodyManpower");
			// tableManPower.html(preloader);
			// $(`#${milestoneSelect}`).empty();
			// let option 			= `<option disabled selected>Please select a milestone</option>`;
			// option += listOfMilestone.filter(items => items.phaseID == phaseID).map(items=>{
			// 		return `<option value="${items.projectMilestoneID}">${items.projectMilestoneName}</option>`
			// }).join();
			// $(`#${milestoneSelect}`).append(option);
			// setTimeout(() => {
			// 	tableManPower.html(projectPhaseDesignation(phaseID));
			// }, 500);
			
			let phaseID 		= $(this).val();
			let thisTableRow	= $(this).closest("tr");
			let tableManPower   = thisTableRow.find(".tableBodyManpower");
			tableManPower.html(preloader);
			thisTableRow.find("[name=projectMilestone]").each(function(){
				var milestoneSelectID = $(this).attr("id");
				
				$(`#${milestoneSelectID}`).empty();
				var option 			= `<option disabled selected>Please select a milestone</option>`;
										option += listOfMilestone.filter(items => items.phaseID == phaseID).map(items=>{
												return `<option value="${items.projectMilestoneID}" milestonename="${items.projectMilestoneName}">${items.projectMilestoneName}</option>`
										}).join();
				$(`#${milestoneSelectID}`).append(option);

			});
			setTimeout(() => {
				tableManPower.html(projectPhaseDesignation(phaseID));
			}, 500);


			// let milestoneSelect = thisTableRow.find("[name=projectMilestone]").attr("id");



			// let tableManPower   = thisTableRow.find(".tableBodyManpower");
			// tableManPower.html(preloader);
			// $(`#${milestoneSelect}`).empty();
			// let option 			= `<option disabled selected>Please select a milestone</option>`;
			// option += listOfMilestone.filter(items => items.phaseID == phaseID).map(items=>{
			// 		return `<option value="${items.projectMilestoneID}">${items.projectMilestoneName}</option>`
			// }).join();
			// $(`#${milestoneSelect}`).append(option);
			// setTimeout(() => {
			// 	tableManPower.html(projectPhaseDesignation(phaseID));
			// }, 500);

			
		});

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
				const id 					= decryptString($(this).attr("costEstimateID"));
				const fromCancelledDocument = $(this).attr("cancel" ) == "true";
				viewDocument(id, false, true, fromCancelledDocument);
			});
		// ----- END VIEW DOCUMENT -----


		// ----- SAVE CLOSE FORM -----
			$(document).on("click", "#btnBack", function () {
				const id         				= decryptString($(this).attr("costEstimateID"));
				const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
				const revise     				= $(this).attr("revise") == "true";
				const employeeID 				= $(this).attr("employeeID");
				const feedback   				= $(this).attr("code") || getFormCode("CEF", dateToday(), id);
				const status     				= $(this).attr("status");

				if (status != "false" && status != 0) {
					
					if (revise) {
						const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
						const data   = getcostEstimateData(action, "save", "0", id);
						data.append("costEstimateStatus", 0);
						if(!isFromCancelledDocument){
							data.append("reviseCostEstimateID", id);
							data.delete("costEstimateID");
						}else{
							data.append("costEstimateID", id);
							data.delete("action");
							data.append("action", "update");
						}
						
						savecostEstimate(data, "save", null, pageContent);
					} else {
						$("#page_content").html(preloader);
						pageContent();
			
						if (employeeID != sessionID) {
							$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
						}
					}

				} else {
					const action = id && feedback ? "update" : "insert";
					const data   = getcostEstimateData(action, "save", "0", id);
					data.append("costEstimateStatus", 0);

					savecostEstimate(data, "save", null, pageContent);
				}
			});
		// ----- END SAVE CLOSE FORM -----


		// ----- SAVE DOCUMENT -----
			$(document).on("click", "#btnSave, #btnCancel", function () {
				const id       					= decryptString($(this).attr("costEstimateID"));
				const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
				const revise   					= $(this).attr("revise") == "true";
				const feedback 					= $(this).attr("code") || getFormCode("CEF", dateToday(), id);
				const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data     					= getcostEstimateData(action, "save", "0", id);
				data.append("costEstimateStatus", 0);

				if (revise) {
					if(!isFromCancelledDocument){
						data.append("reviseCostEstimateID", id);
						data.delete("costEstimateID");
					}else{
						data.append("costEstimateID", id);
						data.delete("action");
						data.append("action", "update");
					}
					
				}

				savecostEstimate(data, "save", null, pageContent);
			});
		// ----- END SAVE DOCUMENT -----

		// ----- SUBMIT DOCUMENT -----
			$(document).on("click", "#btnSubmit", function () {
				const id           				= decryptString($(this).attr("costEstimateID"));
				const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
				const revise       				= $(this).attr("revise") == "true";
				const validate     				= validateForm("form_cost_estimate");
				// const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				// const data   = getcostEstimateData(action, "submit", "1", id,0,true);
				// console.log(data);
				removeIsValid("#tablePersonnelRequest");
				removeIsValid("#tableProjectRequestItems");
				removeIsValid("#tableCompanyRequestItems");
				removeIsValid("#tableTravelRequest");
				if (validate) {
						const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
						const data   = getcostEstimateData(action, "submit", "1", id);
						if (revise) {
							if(!isFromCancelledDocument){
								data.append("reviseCostEstimateID", id);
								data.delete("costEstimateID");
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
								moduleID:                38,
								notificationTitle:       "Cost Estimate",
								notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
								notificationType:        2,
								employeeID,
							};
						}
						savecostEstimate(data, "submit", notificationData, pageContent);
				}
			});
		// ----- END SUBMIT DOCUMENT -----


		// ----- CANCEL DOCUMENT -----
			$(document).on("click", "#btnCancelForm", function () {
				const id     = decryptString($(this).attr("costEstimateID"));
				const status = $(this).attr("status");
				const action = "update";
				const data   = getcostEstimateData(action, "cancelform", "4", id, status);

				savecostEstimate(data, "cancelform", null, pageContent);
			});
		// ----- END CANCEL DOCUMENT -----

		// ----- APPROVE DOCUMENT -----
			$(document).on("click", "#btnApprove", function () {
				const id       		= decryptString($(this).attr("costEstimateID"));
				const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
				let tableData  		= getTableData("pms_cost_estimate_tbl", "", "costEstimateID = " + id);
				let thisCondition 	= false;
				
					


				if (tableData) {
					let costEstimateID  = tableData[0].costEstimateID;
					let approversID     = tableData[0].approversID;
					let approversStatus = tableData[0].approversStatus;
					let approversDate   = tableData[0].approversDate;
					let employeeID      = tableData[0].employeeID;
					let createdAt       = tableData[0].createdAt;

					let data = getcostEstimateData("update", "approve", "2", id);
					data.append("approversStatus", updateApproveStatus(approversStatus, 2));
					let dateApproved = updateApproveDate(approversDate)
					data.append("approversDate", dateApproved);

					let status, notificationData;
					if (isImLastApprover(approversID, approversDate)) {
						status = 2;
						notificationData = {
							moduleID:                38,
							tableID:                 id,
							notificationTitle:       "Cost Estimate",
							notificationDescription: `${feedback}: Your request has been approved.`,
							notificationType:        7,
							employeeID,
						};
						thisCondition = true;
					} else {
						status = 1;
						notificationData = {
							moduleID:                38,
							tableID:                 id,
							notificationTitle:       "Cost Estimate",
							notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
							notificationType:         2,
							employeeID:               getNotificationEmployeeID(approversID, dateApproved),
						};
					}

					data.append("costEstimateStatus", status);
					savecostEstimate(data, "approve", notificationData, pageContent, costEstimateID);
				
				}
			});
		// ----- END APPROVE DOCUMENT -----

		// ----- REJECT DOCUMENT -----
			$(document).on("click", "#btnReject", function () {
				const id       = decryptString($(this).attr("costEstimateID"));
				const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

				$("#modal_cost_estimate_content").html(preloader);
				$("#modal_cost_estimate .page-title").text("DENY COST ESTIMATE");
				$("#modal_cost_estimate").modal("show");
				let html = `
				<div class="modal-body">
					<div class="form-group">
						<label>Remarks <code>*</code></label>
						<textarea class="form-control validate"
							data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
							minlength="2"
							maxlength="250"
							id="costEstimateRemarks"
							name="costEstimateRemarks"
							rows="4"
							style="resize: none"
							required></textarea>
						<div class="d-block invalid-feedback" id="invalid-costEstimateRemarks"></div>
					</div>
				</div>
				<div class="modal-footer text-right">
					<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
					costEstimateID="${encryptString(id)}"
					code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
					<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
				</div>`;
				$("#modal_cost_estimate_content").html(html);
			});

			$(document).on("click", "#btnRejectConfirmation", function () {
				const id       = decryptString($(this).attr("costEstimateID"));
				const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

				const validate = validateForm("modal_cost_estimate");
				if (validate) {
					let tableData = getTableData("pms_cost_estimate_tbl", "", "costEstimateID = " + id);
					if (tableData) {
						let approversStatus = tableData[0].approversStatus;
						let approversDate   = tableData[0].approversDate;
						let employeeID      = tableData[0].employeeID;

						let data = new FormData;
						data.append("action", "update");
						data.append("method", "deny");
						data.append("costEstimateID", id);
						data.append("approversStatus", updateApproveStatus(approversStatus, 3));
						data.append("approversDate", updateApproveDate(approversDate));
						data.append("costEstimateRemarks", $("[name=costEstimateRemarks]").val()?.trim());
						data.append("updatedBy", sessionID);

						let notificationData = {
							moduleID:                38,
							tableID: 				 id,
							notificationTitle:       "Cost Estimate",
							notificationDescription: `${feedback}: Your request has been denied.`,
							notificationType:        1,
							employeeID,
						};

						savecostEstimate(data, "deny", notificationData, pageContent);
						$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
					} 
				} 
			});
		// ----- END REJECT DOCUMENT -----

		// ----- DROP DOCUMENT -----
			$(document).on("click", "#btnDrop", function() {
				const costEstimateID = decryptString($(this).attr("costEstimateID"));
				const feedback       = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

				const id = decryptString($(this).attr("costEstimateID"));
				let data = new FormData;
				data.append("costEstimateID", costEstimateID);
				data.append("action", "update");
				data.append("method", "drop");
				data.append("updatedBy", sessionID);

				savecostEstimate(data, "drop", null, pageContent);
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
		function getRowData(param = null, data = false, readOnly = false){
			let html = ``;
			let disabled = readOnly? `disabled` : ``;
			switch(param){
				case `projectphase`:
					if(data){
						// console.log(data[0].length);
						let projectPhaseData = [], phaseIDArr = [], projectPhaseDataItems = [];
						data[0].map(items=>{
							if(phaseIDArr.length < 1){
								phaseIDArr.push(items.milestoneBuilderID);
							}else{
								!phaseIDArr.includes(items.milestoneBuilderID) ?  phaseIDArr.push(items.milestoneBuilderID) : ``;
							}
						});

						phaseIDArr.map(phaseList=>{
							var existMilestone = [];
							data[0].filter(items=> items.milestoneBuilderID == phaseList).map(items=>{
								if(existMilestone.length < 1){
									existMilestone.push(items.milestoneListID);
								}else{
									!existMilestone.includes(items.milestoneListID) ? existMilestone.push(items.milestoneListID) : ``;
								}
							});
							
							existMilestone.map(milestoneList=>{
								var temp = {
									phaseID: phaseList,
									milestoneID: milestoneList
								};
								projectPhaseData.push(temp);
							});
						});

						projectPhaseData.map(items=>{
							var itemList = [];
							console.log(data[0]);
							data[0].filter(list=> list.milestoneBuilderID == items.phaseID && list.milestoneListID == items.milestoneID).map(list=>{
								var temp = {
									itemID: list.itemID,
									itemCode: list.itemCode,
									itemName: list.itemName,
									itemClassification: list.itemClassification,
									itemUom: list.itemUom,
									brandName: list.brandName,
									quantity: list.quantity,
								}
								itemList.push(temp);
							});
							var projectPhasetemp = {	phaseID:  items.phaseID,
														milestoneID: items.milestoneID,
														items: itemList 
												   };
							projectPhaseDataItems.push(projectPhasetemp);
						});
						
						phaseIDArr.map(phaseID=>{
							var projectPhaseRow = ``;
							projectPhaseDataItems.filter(phaseList=> phaseList.phaseID == phaseID).map((phaseList, phaseListIndex)=>{
									projectPhaseRow += getRowDataMilestone(true, readOnly, phaseList);
							});
							html += 	`	<tr style="white-space: nowrap" class="table-row-project-phase" >
												${!readOnly ? `<td class="text-center">
																<input type="checkbox" class="checkboxrow" name="projectPhaseCheckBox" projectphase="true">
															</td>`:``}
												<td>
													<select class="form-control validate select2" name="projectPhase" id="" ${disabled}>
														${getProjectPhaseList(phaseID)}
													</select>
												</td>
												<td class="requestItems" projectphaserow="">
													<table class="table table-bordered table-striped table-hover" milestone="true">
														<thead>
															${!readOnly ? `<th style="width:3%;"></th>`: ``}
															<th style="width:150px !important;">Milestone</th>
															<th style="width:500px;">Request Item/s</th>
														</thead>
														<tbody class="milestone-table-body">
															${projectPhaseRow}
														</tbody>
														${!readOnly ? `	<tfoot>
																			<tr>
																				<td>
																					<button class="btn btn-primary btnSubAddRow" milestone="true" type="button"><i class="fas fa-plus"></i></button>
																				</td>
																				<td colspan="2"></td>
																			</tr>
																		</tfoot>` 
																	:``}
													</table>		
												</td>
												<td class="requestPersonnel">
													<table class="table table-striped table-bordered table-responsive-xl" >
														<thead>
															<tr style="white-space: nowrap">
																<th class="custom-th-md">Designation Code</th>
																<th class="custom-th-xl">Designation</th>
																<th class="custom-th-sm">Quantity</th>
																<th class="custom-th-sm">Total Hours</th>
															</tr>
														</thead>
														<tbody class="tableBodyManpower">
															${projectPhaseDesignation(phaseID)}
														</tbody>
													</table>
												</td>
											</tr>`;
								
								
						});

					}else{
						html = 	`
								<tr style="white-space: nowrap" class="table-row-project-phase" >
									${!readOnly ? `<td class="text-center">
													<input type="checkbox" class="checkboxrow" name="projectPhaseCheckBox" projectphase="true">
												</td>`:``}
									<td>
										<select class="form-control validate select2" name="projectPhase" id="" ${disabled}>
											${getProjectPhaseList()}
										</select>
									</td>
									<td class="requestItems" projectphaserow="">
										${getRowDataMilestone()}
									</td>
									<td class="requestPersonnel">
										<table class="table table-striped table-bordered table-responsive-xl" >
											<thead>
												<tr style="white-space: nowrap">
													<th class="custom-th-md">Designation Code</th>
													<th class="custom-th-xl">Designation</th>
													<th class="custom-th-sm">Quantity</th>
													<th class="custom-th-sm">Total Hours</th>
												</tr>
											</thead>
											<tbody class="tableBodyManpower">
												<tr style="white-space: nowrap">
													<td class="text-center" colspan="4">No data found!</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>`;
					}
						
				break;
				case `material`:
					if(data){
						data[0].map(items=>{
							html += `<tr style="white-space: nowrap" class="table-row-material-equipment">
									${!readOnly ? `<td class="text-center">
															<input type="checkbox" class="checkboxrow" name="materialCheckBox" material="true">
													</td>` : ``}
									<td><div class="material-item-code">${items.itemCode}</div></td>
									<td> 
										<div class="material-item-name">
											<select class="form-control validate select2" name="materialItems" id="" ${disabled}
												style="width: 100%" required>
												${getItemList(items.itemID)}
											</select>
											<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name">${items.brandName}</div>
										</div>
									</td>
									<td>
										<div class="material-item-classification">${items.itemClassification}</div>
									</td>
									<td>
										<div class="material-quantity">
											<input 
												type="text" 
												class="form-control text-center input-quantity"
												data-allowcharacters="[0-9][.]" 
												max="999999999" 
												id="materialQuantity" 
												name="quantity"
												value="${items.quantity}"
												min="0.01" 
												minlength="1" 
												maxlength="20" ${disabled}>
											<div class="invalid-feedback d-block" id="invalid-materialQuantity"></div>
										</div>
									</td>
									<td><div class="materialUom">${items.itemUom}</div></td>
								</tr>`;
						});
					}else{
						html = `<tr style="white-space: nowrap" class="table-row-material-equipment">
									${!readOnly ? `<td class="text-center">
															<input type="checkbox" class="checkboxrow" name="materialCheckBox" material="true">
													</td>` : ``}
									<td><div class="material-item-code">-</div></td>
									<td> 
										<div class="material-item-name">
											<select class="form-control validate select2" name="materialItems" id=""
												style="width: 100%" required>
												${getItemList()}
											</select>
											<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name"></div>
										</div>
									</td>
									<td>
										<div class="material-item-classification">
											-
										</div>
									</td>
									<td>
										<div class="material-quantity">
											<input 
												type="text" 
												class="form-control text-center input-quantity"
												data-allowcharacters="[0-9][.]" 
												max="999999999" 
												id="materialQuantity" 
												name="quantity"
												value=""
												min="0.01" 
												minlength="1" 
												maxlength="20" required>
											<div class="invalid-feedback d-block" id="invalid-materialQuantity"></div>
										</div>
									</td>
									<td><div class="materialUom">-</div></td>
								</tr>`;
					}
						
				break;
				case `manpower`:
				break;
				default: // TRAVEL
					if(data){
						let travelTypeArr = [];
						data[0].map(travelList=>{
							if(travelTypeArr.length < 1){
								travelTypeArr.push(travelList.travelType);
							}else{
								travelTypeArr.includes(travelList.travelType) ? `` : travelTypeArr.push(travelList.travelType);
							}
						});

						travelTypeArr.map(travelTypeList=>{
							var travelTypeRequestData = ``;
							var travelDataArr	 	= data[0].filter(list=> list.travelType == travelTypeList);
							travelTypeRequestData 	+= travelTransportationRequest(travelTypeList, readOnly, travelDataArr);
							html += `<tr style="white-space: nowrap" class="table-row-travel">
										${!readOnly ? `<td class="text-center">
																<input type="checkbox" class="checkboxrow" name="travelCheckBox" travel="true">
														</td>` : ``}
										<td>
											<select class="form-control validate select2" style="width:100% !important" name="travelType" id="" ${disabled}>
												<option disabled ${travelTypeList ? ``: `selected`}>Select travel type</option>
												<option value="vehicle" ${travelTypeList=="vehicle" ? `selected`:``}>Vehicle</option>
												<option value="toll" ${travelTypeList=="toll" ? `selected`:``}>Toll</option>
												<option value="commute"  ${travelTypeList=="commute" ? `selected`:``}>Others</option>
											</select>
										</td>
										<td class="travelTypeRequest"> 
											${travelTypeRequestData}
										</td>
									</tr>`;
						});
					}else{
						html = `	<tr style="white-space: nowrap" class="table-row-travel">
										${!readOnly ? `<td class="text-center">
																<input type="checkbox" class="checkboxrow" name="travelCheckBox" travel="true">
														</td>` : ``}
										<td>
											<select class="form-control validate select2" style="width:100% !important" name="travelType" id="" ${disabled}>
												<option disabled selected>Select travel type</option>
												<option value="vehicle">Vehicle</option>
												<option value="toll">Toll</option>
												<option value="commute">Others</option>
											</select>
										</td>
										<td class="travelTypeRequest"> 
											-
										</td>
									</tr>`;
					}	
				break;
			}
			return html;
		}

		function getRowDataMilestone(isAdd = false, readOnly = null, phaseData = null){
			let html = ``;
			let disabled = readOnly ? `disabled` : ``;
			if(isAdd){
				var option = ``, tableDataItem = ``;
				if(phaseData){
					option += getMilestoneList(phaseData.phaseID, phaseData.milestoneID);
					// console.log(phaseData["items"]);
					tableDataItemList = phaseData["items"].map(items=>{
						return `	<tr style="white-space: nowrap">
										${!readOnly ? `<td>
															<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>
														</td>` : ``}
										<td><div class="milestone-item-code">${items.itemCode}</div></td>
										<td> 
											<div class="milestone-item-name">
												<select class="form-control validate select2" name="milestoneItems" id="" ${disabled}
													style="width: 100%" required>
													${getItemList(items.itemID)}
												</select>
												<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name">${items.brandName}</div>
											</div>
										</td>
										<td>
											<div class="milestone-item-classification">${items.itemClassification}</div>
										</td>
										<td>
											<div class="milestone-quantity">
												<input 
													type="text" 
													class="form-control text-center input-quantity"
													data-allowcharacters="[0-9][.]" 
													max="999999999" 
													id="milestoneQuantity" 
													name="quantity"
													value="${items.quantity}"
													min="0.01" 
													minlength="1" 
													maxlength="20" ${disabled}>
												<div class="invalid-feedback d-block" id="invalid-milestoneQuantity"></div>
											</div>
										</td>
										<td><div class="milestoneUom">${items.itemUom}</div></td>
									</tr>`;
					}); 
					tableDataItem += `	<table class="table table-striped table-bordered table-responsive-xl" >
											<thead>
												<tr style="white-space: nowrap">
													${!readOnly ? `<th></th>` : ``}
													<th class="custom-th-md">Item Code</th>
													<th class="custom-th-xl">Item Name</th>
													<th class="custom-th-md">Item Classification</th>
													<th class="custom-th-sm">Quantity</th>
													<th class="custom-th-sm">UOM</th>
												</tr>
											</thead>
											<tbody class="table-body-request-items">
												${tableDataItemList.join()}
											</tbody>
											${!readOnly ? 
												`	<tfoot>
														<tr>
															<td class="tcenter">
																<button class="btn btn-primary btnSubAddRow" milestoneitems="true" type="button"><i class="fas fa-plus"></i></button>
															</td>
															<td colspan="6"> </td>
														</tr>
													</tfoot>` : ``}
											
										</table>`;
				}else{
					option += `<option disabled selected>Please select a project phase first</option>`;
					tableDataItem += getRowDataItems();
				}
				html +=  	`<tr class="table-row-milestone">
								${!readOnly ? `<td>
									<button class="btn btn-danger deleteRow" milestone="true" type="button"><i class="fas fa-minus"></i></button>
								</td>`: ``}
								<td>
								<select class="form-control validate select2" name="projectMilestone" id="" ${disabled}
									style="width: 100%" required>
										${option}
								</select>
								</td>
								<td>
									${tableDataItem}
								</td>
							</tr>`;
			}else{
				html += 	`
					<table class="table table-bordered table-striped table-hover" milestone="true">
						<thead>
							${!readOnly ? `<th style="width:3%;"></th>`: ``}
							<th style="width:150px !important;">Milestone</th>
							<th style="width:500px;">Request Item/s</th>
						</thead>
						<tbody class="milestone-table-body">
							<tr class="table-row-milestone">
								${!readOnly ? `<td>
													<button class="btn btn-danger deleteRow" milestone="true" type="button"><i class="fas fa-minus"></i></button>
												</td>`: ``}
								<td>
									<select class="form-control validate select2" name="projectMilestone" id=""
										style="width: 100%" required>
											<option disabled selected>Please select a project phase first</option>
									</select>
								</td>
								<td>
									${getRowDataItems()}
								</td>
							</tr>
						</tbody>
						${!readOnly ? `	<tfoot>
									   		<tr>
												<td>
													<button class="btn btn-primary btnSubAddRow" milestone="true" type="button"><i class="fas fa-plus"></i></button>
												</td>
												<td colspan="2"></td>
											</tr>
										</tfoot>` 
									:``}
					</table>
					`;
			}
			
			return html;
		}

		function getRowDataItems(isAdd = false, data = false, readOnly = false){
			let html = ``;
			let {
				sample = "",
			} = data && data[0];
			if(isAdd){
				html += `
						<tr style="white-space: nowrap">
							${!readOnly ? `<td>
												<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>
											</td>` : ``}
								
								<td><div class="milestone-item-code">-</div></td>
								<td> 
									<div class="milestone-item-name">
										<select class="form-control validate select2" name="milestoneItems" id=""
											style="width: 100%" required>
											${getItemList()}
										</select>
										<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name"></div>
									</div>
								</td>
								<td>
									<div class="milestone-item-classification">
										-
									</div>
								</td>
								<td>
									<div class="milestone-quantity">
										<input 
											type="text" 
											class="form-control text-center input-quantity"
											data-allowcharacters="[0-9][.]" 
											max="999999999" 
											id="milestoneQuantity" 
											name="quantity"
											value=""
											min="0.01" 
											minlength="1" 
											maxlength="20" required>
										<div class="invalid-feedback d-block" id="invalid-milestoneQuantity"></div>
									</div>
								</td>
								<td><div class="milestoneUom">-</div></td>
							</tr>
						`;
			}else{
				html +=	 `
						<table class="table table-striped table-bordered table-responsive-xl" >
							<thead>
								<tr style="white-space: nowrap">
									${!readOnly ? `<th></th>` : ``}
									<th class="custom-th-md">Item Code</th>
									<th class="custom-th-xl">Item Name</th>
									<th class="custom-th-md">Item Classification</th>
									<th class="custom-th-sm">Quantity</th>
									<th class="custom-th-sm">UOM</th>
								</tr>
							</thead>
							<tbody class="table-body-request-items">
								<tr style="white-space: nowrap">
								${!readOnly ? `<td>
													<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>
												</td>` : ``}
									
									<td><div class="milestone-item-code">-</div></td>
									<td> 
										<div class="milestone-item-name">
											<select class="form-control validate select2" name="milestoneItems" id=""
												style="width: 100%" required>
												${getItemList()}
											</select>
											<div style="font-size: 85%;" class="font-weight-bold py-2 item-brand-name"></div>
										</div>
									</td>
									<td>
										<div class="milestone-item-classification">
											-
										</div>
									</td>
									<td>
										<div class="milestone-quantity">
											<input 
												type="text" 
												class="form-control text-center input-quantity"
												data-allowcharacters="[0-9][.]" 
												max="999999999" 
												id="milestoneQuantity" 
												name="quantity"
												value=""
												min="0.01" 
												minlength="1" 
												maxlength="20" required>
											<div class="invalid-feedback d-block" id="invalid-milestoneQuantity"></div>
										</div>
									</td>
									<td><div class="milestoneUom">-</div></td>
								</tr>
							</tbody>
							${!readOnly ? 
								`	<tfoot>
										<tr>
											<td class="tcenter">
												<button class="btn btn-primary btnSubAddRow" milestoneitems="true" type="button"><i class="fas fa-plus"></i></button>
											</td>
											<td colspan="6"> </td>
										</tr>
									</tfoot>` : ``}
							
						</table>`;
			}
			
			return html;
		}

		function projectPhaseTableDivision(costEstimateID = null, readOnly = false){	
			// let timelineBuilderID = $("#timelineBuilderID").val();
			let html = ``;
			let disabled = readOnly ? `disabled` : ``;
			// Project Phase
			let projectPhaseTableID 	   = !readOnly ? `projectPhaseTable` : `projectPhaseTableReadOnly`;
			let projectPhaseCheckboxHeader = !readOnly ? `<th class="text-center">
															<div class="action">
																<input type="checkbox" class="checkboxall" projectphase="true">
															</div>
														</th>` : ``;
			let projectPhaseCheckboxData = !readOnly ? ` <td class="text-center">
																<input type="checkbox" class="checkboxrow" projectphase="true">
														</td>` : ``;
	
			let requestItemsCheckBoxData = !readOnly ? `<td>
															<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>
														</td>`: ``;
			if(costEstimateID){	
	
			}else{
				html += `
				<table class="table table-striped table-bordered table-responsive-xl ${projectPhaseTableID}">
					<thead>
						<tr style="white-space: nowrap">
							${projectPhaseCheckboxHeader}
							<th style="width: 300px">Project Phase</th>
							<th style="width: 300px">Milestone</th>
							<th >Request Item/s</th>
							<th >Personnel</th>
						</tr>
					</thead>
					<tbody class="projectPhaseTables">
						${getRowData()}
					</tbody>
				</table>`;
			}
			return html;
		}

		function travelTransportationRequest(travelType = null, readOnly = null, data = false){
			let html = ``;
			let disabled = readOnly? `disabled` : ``;
				if(travelType == "vehicle"){
					html += `	<table class="table table-bordered table-striped table-hover" travel="true">
									<thead>
										${!readOnly ? `<th style="width:3%;"></th>`: ``}
										<th class="custom-th-md">Vehicle Code</th>
										<th style="width:700px;">Vehicle</th>
										<th style="width:700px;">Plate Number/Conduction Number</th>
										<th style="width:700px;">Average Gas Consumption</th>
										<th style="width:700px;">Gas Type</th>
										<th style="width:700px;">Distance (in km)</th>
									</thead>
									<tbody class="travel-vehicle-table-body">
										${travelTransportationRequestVehicle(readOnly, data)}
									</tbody>
									${!readOnly ? `	<tfoot>
														<tr>
															<td>
																<button class="btn btn-primary btnSubAddRow" travel="true" type="button"><i class="fas fa-plus"></i></button>
															</td>
															<td colspan="6"></td>
														</tr>
													</tfoot>` 
												:``}
								</table>`;
				}else{
					html += `<textarea class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&amp;]" minlength="1" maxlength="200" id="travelTypeOthers" name="travelTypeOthers" rows="4" style="resize:none;" ${disabled}>${data ? data[0]["travelTypeDescription"] : ``}</textarea>`;
				}
			
			return html;
		}

		function travelTransportationRequestVehicle(readOnly = null, data = false){
			let html = ``;
			let disabled = readOnly? `disabled` : ``;
			if(data){
				data.map(travelList=>{
					html += `<tr class="table-row-vehicle">
							${!readOnly ? `<td>
												<button class="btn btn-danger deleteRow" travel="true" type="button"><i class="fas fa-minus"></i></button>
											</td>`: ``}
							<td><div class="travel-vehicle-code">${travelList["vehicleCode"] || "-"}</div></td>
							<td>
								<div class="travel-vehicle">
									<select class="form-control validate select2" name="travelVehicle" id="" style="width: 100%" ${disabled}>
										${getVehicleList(travelList["vehicleID"])}
									</select>
								</div>
							</td>
							<td><div class="travel-vehicle-plate-number">${travelList["vehiclePlateNumber"] || "-"}</div></td>
							<td><div class="travel-vehicle-consumption">${travelList["vehicleFuelConsumption"] || "-"}</div></td>
							<td><div class="travel-vehicle-gas">${travelList["vehicleGasType"] || "-"}</div></td>
							<td>
								<div class="travel-vehicle-distance">
									<input 
									type="text" 
									class="form-control text-center input-quantity"
									data-allowcharacters="[0-9][.]" 
									max="999999999" 
									id="vehicleDistance" 
									name="vehicleDistance"
									value="${travelList["vehicleDistance"] || ""}"
									min="0.01" 
									minlength="1" 
									maxlength="20" ${disabled}>
									<div class="invalid-feedback d-block" id="invalid-vehicleDistance"></div>
								</div>
							</td>
						</tr>`;
				});
			}else{
				 html = `<tr class="table-row-vehicle">
							${!readOnly ? `<td>
												<button class="btn btn-danger deleteRow" travel="true" type="button"><i class="fas fa-minus"></i></button>
											</td>`: ``}
							<td><div class="travel-vehicle-code">-</div></td>
							<td>
								<div class="travel-vehicle">
									<select class="form-control validate select2" name="travelVehicle" id="" style="width: 100%">
										${getVehicleList()}
									</select>
								</div>
							</td>
							<td><div class="travel-vehicle-plate-number">-</div></td>
							<td><div class="travel-vehicle-consumption">-</div></td>
							<td><div class="travel-vehicle-gas">-</div></td>
							<td>
								<div class="travel-vehicle-distance">
									<input 
									type="text" 
									class="form-control text-center input-quantity"
									data-allowcharacters="[0-9][.]" 
									max="999999999" 
									id="vehicleDistance" 
									name="vehicleDistance"
									value=""
									min="0.01" 
									minlength="1" 
									maxlength="20" required>
									<div class="invalid-feedback d-block" id="invalid-vehicleDistance"></div>
								</div>
							</td>
						</tr>`;
			}
			
			return html;
		}

		function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
			$("#page_content").html(preloader);
			readOnly = isRevise ? false : readOnly;
			let {
				costEstimateID       = "",
				reviseCostEstimateID = "",
				employeeID           = "",
				timelineBuilderID 	 = "",
				projectCode          = "",
				projectName          = "",
				projectCategory      = "",
				clientName           = "",
				clientAddress        = "",
				costEstimateReason   = "",
				costEstimateRemarks  = "",
				approversID          = "",
				approversStatus      = "",
				approversDate        = "",
				costEstimateStatus   = false,
				submittedAt          = false,
				createdAt            = false,
			} = data && data[0];
			let requestProjectItems = "", requestCompanyItems = "", requestPersonnel="", requestTravel="";
			// ----- GET EMPLOYEE DATA -----
				let {
					fullname:    employeeFullname    = "",
					department:  employeeDepartment  = "",
					designation: employeeDesignation = "",
				} = employeeData(data ? employeeID : sessionID);
			// ----- END GET EMPLOYEE DATA -----

			readOnly ? preventRefresh(false) : preventRefresh(true);

			$("#btnBack").attr("costEstimateID", encryptString(costEstimateID));
			$("#btnBack").attr("status", costEstimateStatus);
			$("#btnBack").attr("employeeID", employeeID);
			$("#btnBack").attr("cancel", isFromCancelledDocument);

			let disabled = readOnly ? "disabled" : ``;

			let timelineDate = "", timelineIssued = "", timelineDesign = "", timelinePriorityLevel = "";
			
			let timelineBuilderTableData  = `<option value="" disabled ${timelineBuilderID ? ``: `selected`}>Select project code</option>`;
			timelineBuilderTableData 	  += projectTimelineTableData.filter( items => timelineBuilderID ?items.timelineBuilderID == timelineBuilderID : !existProjectTimelineTableData.includes(items.timelineBuilderID)).map(items=>{
				var clientName 		= ``, priorityLevel = ``, issued = ``;
				var clientAddress 	= clientList.filter(clientItems => clientItems.clientID == items.clientID).map((clientItems, index)=>{
					clientName 		= clientItems.clientName;
					return `${clientItems.clientUnitNumber && titleCase(clientItems.clientUnitNumber)+" "}${clientItems.clientHouseNumber && clientItems.clientHouseNumber +" "}${clientItems.clientBarangay && titleCase(clientItems.clientBarangay)+", "}${clientItems.clientCity && titleCase(clientItems.clientCity)+", "}${clientItems.clientProvince && titleCase(clientItems.clientProvince)+", "}${clientItems.clientCountry && titleCase(clientItems.clientCountry)+", "}${clientItems.clientPostalCode && titleCase(clientItems.clientPostalCode)}`
				});	
					switch(items.timelinePriorityLevel) {
						case 0:
						priorityLevel = `LOW`;
						break;
						case 1:
						priorityLevel = `MEDIUM`;
						break;
						case 2:
						priorityLevel = `HIGH`;
						break;
						default:
						priorityLevel = `URGENT`;
					}

					switch(items.timelineIssued) {
						case "0":
						issued = `FOR DEVELOPMENT`;
						break;
						case "1":
						issued = `FOR PURCHASING`;
						break;
						default:
						issued = `FOR PURCHASE & DEVELOPMENT`;
					}
					if(timelineBuilderID){
						timelineDate 			= `${moment(items.timelineStartDate).format("MMMM DD, YYYY")} - ${moment(items.timelineEndDate).format("MMMM DD, YYYY")} `,
						timelineIssued 			= issued,
						timelineDesign 			= items.timelineDesign,
						timelinePriorityLevel 	= priorityLevel;
					}
					return items.timelineManagementCount > 0 ? `<option
							projectcode="${items.projectCode}"
							projectname="${items.projectListName}"
							projectcategory="${items.categoryName}"
							clientname="${clientName}"
							clientaddress="${clientAddress}"
							timelinebuilderid="${items.timelineBuilderID}"
							timelinestartdate="${moment(items.timelineStartDate).format("MMMM DD, YYYY")}"
							timelineenddate="${moment(items.timelineEndDate).format("MMMM DD, YYYY")}"
							prioritylevel="${priorityLevel}"
							issued="${issued}"
							design="${items.timelineDesign}"
							value="${items.timelineBuilderID}"
							${timelineBuilderID == items.timelineBuilderID ? `selected` : ``}> 
								${items.projectCode}
							</option>` : `` ;
			});

			let button = formButtons(data, isRevise, isFromCancelledDocument);

			let reviseDocumentNo    = isRevise ? costEstimateID : reviseCostEstimateID;
			let documentHeaderClass = isRevise || reviseCostEstimateID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
			let documentDateClass   = isRevise || reviseCostEstimateID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
			let documentReviseNo    = isRevise || reviseCostEstimateID ? `
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
											${costEstimateID && !isRevise ? getFormCode("CEF", createdAt, costEstimateID) : "---"}
										</h6>      
									</div>
								</div>
							</div>
							<div class="${documentHeaderClass}">
								<div class="card">
									<div class="body">
										<small class="text-small text-muted font-weight-bold">Status</small>
										<h6 class="mt-0 font-weight-bold">
											${costEstimateStatus && !isRevise ? getStatusStyle(costEstimateStatus) : "---"}
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
												${getDateApproved(costEstimateStatus, approversID, approversDate)}
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
											${costEstimateRemarks && !isRevise ? costEstimateRemarks : "---"}
										</h6>      
									</div>
								</div>
							</div>
						</div>

						<div class="row" id="form_cost_estimate">
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
										required
										rows="4"
										style="resize:none;"
										${disabled}>${costEstimateReason ?? ""}</textarea>
									<div class="d-block invalid-feedback" id="invalid-costEstimateReason"></div>
								</div>
							</div>

							<div class="col-md-4 col-sm-12">
								<div class="form-group">
									<label>Project Code ${!costEstimateID ? "<code>*</code>" : ""}</label>
									<select class="form-control validate select2"
										name="timelineBuilderID"
										id="timelineBuilderID"
										style="width: 100%"
										required
										${costEstimateID ? `disabled` : ``}>
										${timelineBuilderTableData}
									</select>
									<div class="invalid-feedback d-block" id="invalid-timelineBuilderID"></div>
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
									<label>Project Category</label>
									<input type="text" class="form-control" name="projectCategory" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150" name="projectCategory"  value="${projectCategory}">
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
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label>Start Date & End Date</label>
									<input type="text" class="form-control" disabled name="timelineDate" value="${timelineDate || "-"}">
								</div>
							</div>
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label>Priority Level</label>
									<input type="text" class="form-control" disabled  name="priorityLevel" value="${timelinePriorityLevel || "-"}">
								</div>
							</div>
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label>Issued</label>
									<input type="text" class="form-control" disabled  name="timelineIssued" value="${timelineIssued || "-"}">
								</div>
							</div>
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<div class="form-group">
										<label>Design</label>
										<input type="text" class="form-control" disabled  name="timelineDesign" value="${timelineDesign || "-"}">
									</div>
								</div>
							</div>
							<div class="col-sm-12" id="formContentDivision">
								${timelineBuilderID ? formContentDivision(timelineBuilderID, costEstimateID, readOnly) : `<div class="alert alert-warning py-1 text-center" role="alert">
															<small class="font-weight-bold"><i class="fa fa-exclamation-circle text-warning font-weight-bold"></i> Please select project code.</small>
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
			function formContentDivision(timelineBuilderID = null, costEstimateID = null, readOnly = false){
				// listOfPhase = [], listEmployeeList = [];
				// let projectPhaseItemsRequest = [], materialItemsRequest = [], designationRequest = [], travelRequest = [];
				let html = ``;
					while(listOfPhase.length > 0) {
						listOfPhase.pop();
					}
					while(listEmployeeList.length > 0) {
						listEmployeeList.pop();
					}
					while(listEmployeeList.length > 0) {
						listOfManpower.pop();
					}
					var designationData = [];
					$.ajax({
						method:      "POST",
						url:         `cost_estimate/getDataDivision`,
						data:{timelineBuilderID,costEstimateID},
						dataType:    "json",
						beforeSend: function() {
							$("#loader").show();
							$(`#formContentDivision`).html(preloader);
						},
						success: function(data) {
							$("#loader").hide();
	
							// 1st DATA IS FOR PROJECT PHASE
							data[1].map(items=>{
								var tempMilestone = {
														phaseID: items["milestoneBuilderID"],
														projectMilestoneID : items["projectMilestoneID"],
														projectMilestoneName : items["projectMilestoneName"]
													};
								listOfMilestone.push(tempMilestone);
							});
	
							data[0].map(items=>{
								var tempPhase = {
									phaseID: items["milestoneBuilderID"],
									phaseDescription: items["phaseDescription"],
								};
	
								var employeeTempData = items["phaseManpower"][0];
								employeeTempData.map(dataItems => {
									var temp;
									// console.log(dataItems["assignedEmployee"]);
									// var condition = dataItems["assignedEmployee"].split("|") ? true : false;
									var splitAssignedEmployee = dataItems["assignedEmployee"].split("|");
										splitAssignedEmployee.map(splitItems =>{
											allEmployeeData.filter(employeeDataItems => employeeDataItems.employeeID == splitItems).map(employeeDataItems=>{
												temp = {
													assignedEmployee : 	employeeDataItems.employeeID,
													designationID: 		employeeDataItems.designationID,
													designation:  		employeeDataItems.designation,
													assignedEmployee: 	dataItems.assignedEmployee,
													assignedManHours: 	dataItems.assignedManHours,
													phaseID: 			dataItems.milestoneBuilderID,
													projectMilestoneID: dataItems.projectMilestoneID
												};
												temp ? listEmployeeList.push(temp) : ``;
											});
										});
								});
								listOfPhase.push(tempPhase);
							});

				
							var designationListID = listEmployeeList.map(x => designationData.filter(a => a.designationID == x.designationID).length > 0 ? `` : designationData.push(x) );
							designationData.map(x =>{
								var quantity = listEmployeeList.filter(y => y.designationID == x.designationID);
								var totalManHours = 0;
								quantity.map(y => {
									totalManHours += parseFloat(y.assignedManHours);
								});
								var tempManpower = {
									designationID: x.designationID,
									designation: x.designation,
									quantity: quantity.length,
									totalManHours: totalManHours
								}
								listOfManpower.push(tempManpower);
							});

							if(costEstimateID){
								let conditionSqlItemRequest = `inventoryValidationID IS NULL AND billMaterialID IS NULL AND purchaseRequestID IS NULL AND bidRecapID IS NULL AND referencePurchaseOrderID IS NULL AND purchaseOrderID IS NULL AND inventoryReceivingID IS NULL`;
								let projectPhaseItemsRequestData = getTableData(`pms_cost_estimate_tbl LEFT JOIN ims_request_items_tbl USING(costEstimateID)`,
																		`requestItemID, milestoneBuilderID, phaseDescription, milestoneListID, projectMilestoneID, projectMilestoneName, itemID, itemCode, itemName, itemDescription,itemClassification, brandName, itemUom, quantity`,
																		 `${conditionSqlItemRequest} AND costEstimateID = '${costEstimateID}' AND categoryType = 'Project Phase'`
																		);
								let materialItemsRequestData = getTableData(`pms_cost_estimate_tbl LEFT JOIN ims_request_items_tbl USING(costEstimateID)`,
																		`milestoneBuilderID, phaseDescription, milestoneListID, projectMilestoneID, projectMilestoneName, itemID, itemCode, itemName, itemDescription,itemClassification, itemUom, brandName, quantity`,
																		 `${conditionSqlItemRequest} AND costEstimateID = '${costEstimateID}' AND categoryType = 'Materials and Equipment'`
																		);
								let designationRequestData = getTableData(`pms_cost_estimate_tbl LEFT JOIN hris_personnel_request_tbl USING(costEstimateID)`,
																		`personnelRequestID, designationID, designationCode, designation, designationQuantity, designationTotalManHours `,
																		 `billMaterialID IS NULL AND costEstimateID = '${costEstimateID}'`
																		);
								let travelRequestData = getTableData(`pms_cost_estimate_tbl LEFT JOIN ims_travel_request_tbl USING(costEstimateID)`,
															 `travelRequestID, travelType, vehicleID, vehicleCode, vehicleName, vehiclePlateNumber, vehicleGasType, travelTypeDescription, vehicleDistance,vehicleFuelConsumption`,
																		 `billMaterialID IS NULL AND costEstimateID = '${costEstimateID}'`
																		);
								projectPhaseItemsRequestData.length > 0 ? projectPhaseItemsRequest.push(projectPhaseItemsRequestData):``;
								materialItemsRequestData.length > 0 ? materialItemsRequest.push(materialItemsRequestData):``;
								designationRequestData.length > 0 ? designationRequest.push(designationRequestData):``;
								travelRequestData.length > 0 ? travelRequest.push(travelRequestData):``;


							}
							// 2nd DATA IS FOR MATERIAL AND EQUIPMENT
							// 3rd DATA IS FOR MANPOWER
							// 4th DATA IS FOR TRAVEL AND TRANSPORTATION; 
						},
						error: function() {
							setTimeout(() => {
								$("#loader").hide();
								showNotification("danger", "System error: Please contact the system administrator for assistance!");
							}, 500);
						}
					}).done(function() {
						// PROJECT PHASE 
						let projectPhaseTableID 	   = !readOnly ? `projectPhaseTable` : `projectPhaseTableReadOnly`;
						let projectPhaseCheckboxHeader = !readOnly ? `<th class="text-center">
																		<div class="action">
																			<input type="checkbox" class="checkboxall" projectphase="true">
																		</div>
																	</th>` : ``;
						let projectPhaseButtons			= !readOnly?`<div class="w-100 text-left my-2">
																		<button class="btn btn-primary btnAddRow" id="btnAddRow" projectphase="true"><i class="fas fa-plus-circle"></i> Add Row</button>
																		<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" projectphase="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
																	</div>` :``;
						
						// MATERIAL EQUIPMENT 
						let materialEquipmentTableID 	   	= !readOnly ? `materialEquipmentTable` : `materialEquipmentTableReadOnly`;
						let materialEquipmentCheckboxHeader = !readOnly ? `<th class="text-center">
																		<div class="action">
																			<input type="checkbox" class="checkboxall" material="true">
																		</div>
																	</th>` : ``;
						let materialEquipmentButtons		= !readOnly?`<div class="w-100 text-left my-2">
																		<button class="btn btn-primary btnAddRow" id="btnAddRow" material="true"><i class="fas fa-plus-circle"></i> Add Row</button>
																		<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" material="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
																	</div>` :``;
						// MANPOWER
						let manpowerTableID  				= "manpowerTable";

						// TRAVEL AND TRANSPORTATION
						let travelTableID 	   		= !readOnly ? `travelTable` : `travelTableReadOnly`;
						let travelCheckboxHeader 	= !readOnly ? `<th class="text-center" style="width:5% !important">
																		<div class="action">
																			<input type="checkbox" class="checkboxall" travel="true">
																		</div>
																	</th>` : ``;
						let travelButtons			= !readOnly?`<div class="w-100 text-left my-2">
																		<button class="btn btn-primary btnAddRow" id="btnAddRow" travel="true"><i class="fas fa-plus-circle"></i> Add Row</button>
																		<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" travel="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
																	</div>` :``;
						
						

						// PROJECT PHASE;
							var tableBodyProjectPhase = ``;
							if(costEstimateID){
								tableBodyProjectPhase = getRowData("projectphase",projectPhaseItemsRequest,readOnly);
							}else{
								tableBodyProjectPhase = getRowData("projectphase","",readOnly);
							}
							html += `	<div class="w-100">
											<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Phase</div>
											<hr class="pb-1">
											<table class="table table-striped table-bordered table-responsive-xl ${projectPhaseTableID}">
												<thead>
													<tr style="white-space: nowrap">
														${projectPhaseCheckboxHeader}
														<th style="width: 300px">Project Phase</th>
														<th style="width: 300px">Milestone</th>
														<th >Manpower</th>
													</tr>
												</thead>
												<tbody class="projectPhaseTables">
													${tableBodyProjectPhase}
												</tbody>
											</table>
											${projectPhaseButtons}
										</div>`;

						// MATERIAL EQUIPMENT 
							var tableBodyMaterial = ``;
							if(costEstimateID){
								tableBodyMaterial = getRowData("material",materialItemsRequest,readOnly);
							}else{
								tableBodyMaterial = getRowData("material","",readOnly);
							}
							html += `	<div class="w-100">
											<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Material Equipment</div>
											<hr class="pb-1">
											<table class="table table-striped table-bordered table-responsive-xl ${materialEquipmentTableID}">
												<thead>
													<tr style="white-space: nowrap">
														${materialEquipmentCheckboxHeader}
														<th class="custom-th-md">Item Code</th>
														<th class="custom-th-xl">Item Name</th>
														<th class="custom-th-md">Item Classification</th>
														<th class="custom-th-sm">Quantity</th>
														<th class="custom-th-sm">UOM</th>
													</tr>
												</thead>
												<tbody class="materialEquipmentTables">
													${tableBodyMaterial}
												</tbody>
												
											</table>
											${materialEquipmentButtons}
										</div>`;

							// MANPOWER  
								let manpowerTableBody = ``;
								var manpowerArrData = costEstimateID ? designationRequest[0] : listOfManpower;
								// console.log(designationRequest[0]);
								manpowerArrData.map(x=>{
									manpowerTableBody +=  `<tr class="manpowerRowData">
																<td>
																	<div class="manpowerDesignationCode" designationid="${x.designationID}">
																		${getFormCode("DSN", moment(), x.designationID )}
																	</div>
																</td>
																<td>
																	<div class="manpowerDesignation">
																		${x.designation}
																	</div>
																</td>
																<td>
																	<div class="manpowerQuantity">
																		${costEstimateID ? x.designationQuantity : x.quantity}
																	</div>
																</td>
																<td>
																	<div class="manpowerTotalManHours">
																		${costEstimateID ? x.designationTotalManHours : x.totalManHours}
																	</div>
																</td>
															</tr>`;
								});

								html += `	<div class="w-100">
												<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Manpower</div>
												<hr class="pb-1">
												<table class="table table-striped table-bordered table-responsive-xl ${manpowerTableID}">
													<thead>
														<tr style="white-space: nowrap">
															<th class="custom-th-md">Designation Code</th>
															<th class="custom-th-xl">Designation</th>
															<th class="custom-th-sm">Quantity</th>
															<th class="custom-th-sm">Total Hours</th>
														</tr>
													</thead>
													<tbody class="manpowerTables">
														${manpowerTableBody}
													</tbody>
												</table>
											</div>`;

							// TRAVEL AND TRANSPORTAION
								var tableBodyTravel = ``;
								if(costEstimateID){
									tableBodyTravel = getRowData("travel",travelRequest,readOnly);
								}else{
									tableBodyTravel = getRowData("travel","",readOnly);
								}
								html += `	<div class="w-100">
												<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Travel and Transportation</div>
												<hr class="pb-1">
												<table class="table table-striped table-bordered table-responsive-xl ${travelTableID}">
													<thead>
														<tr style="white-space: nowrap">
															${travelCheckboxHeader}
															<th style="width:100px !important">Travel Type</th>
															<th style="width:600px !important">Request/s</th>
														</tr>
													</thead>
													<tbody class="travelTableBody">
														${tableBodyTravel}
													</tbody>
												</table>
												${travelButtons}
											</div>`;
	
						setTimeout(() => {
							$("#formContentDivision").html(html);
							initAll();
							updateTableAttribute();
							initDataTables();
						}, 500);					
						
						// END PROJECT PHASE DIVISION;
						// console.log(listOfPhase);
						// console.log(listEmployeeList);
						
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

					headerButton(true, "Add Cost Estimate");
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

		// ----- GET Cost Estimate DATA -----
			function getcostEstimateData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {
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
					data["costEstimateID"] = id;
					formData.append("costEstimateID", id);

					if (status != "2") {
						data["costEstimateStatus"] = status;
						formData.append("costEstimateStatus", status);
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
					data["timelineBuilderID"]     = $("[name=timelineBuilderID] option:selected").attr("timelinebuilderid") || null;
					data["projectCode"]           = $("[name=timelineBuilderID] option:selected").attr("projectcode") || null;
					data["projectName"]           = $("[name=timelineBuilderID] option:selected").attr("projectname") || null;
					data["projectCategory"]       = $("[name=timelineBuilderID] option:selected").attr("projectcategory") || null;
					data["clientName"]            = $("[name=timelineBuilderID] option:selected").attr("clientname") || null;
					data["clientAddress"]         = $("[name=timelineBuilderID] option:selected").attr("clientaddress") || null;	
					data["costEstimateReason"] 	  = $("[name=costEstimateReason]").val()?.trim();
					
					
					formData.append("employeeID", sessionID);
					formData.append("timelineBuilderID", $("[name=timelineBuilderID] option:selected").attr("timelinebuilderid") || null);
					formData.append("projectCode", $("[name=timelineBuilderID] option:selected").attr("projectcode") || null);
					formData.append("projectName", $("[name=timelineBuilderID] option:selected").attr("projectname") || null);
					formData.append("projectCategory", $("[name=timelineBuilderID] option:selected").attr("projectcategory") || null);
					formData.append("clientName", $("[name=timelineBuilderID] option:selected").attr("clientname") || null);
					formData.append("clientAddress", $("[name=timelineBuilderID] option:selected").attr("clientaddress") || null);
					formData.append("costEstimateReason", $("[name=costEstimateReason]").val()?.trim());

					if (action == "insert") {
						data["createdBy"]   = sessionID;
						data["createdAt"]   = dateToday();

						formData.append("createdBy", sessionID);
						formData.append("createdAt", dateToday());
					} else if (action == "update") {
						data["costEstimateID"] = id;
						formData.append("costEstimateID", id);
					}
					
					if (method == "submit") {
						data["submittedAt"] = dateToday();
						formData.append("submittedAt", dateToday());
						if (approversID) {
							data["approversID"]           = approversID;
							data["costEstimateStatus"] = 1;

							formData.append("approversID", approversID);
							formData.append("costEstimateStatus", 1);
						} else {  // AUTO APPROVED - IF NO APPROVERS
							data["approversID"]           = sessionID;
							data["approversStatus"]       = 2;
							data["approversDate"]         = dateToday();
							data["costEstimateStatus"] 	  = 2;

							formData.append("approversID", sessionID);
							formData.append("approversStatus", 2);
							formData.append("approversDate", dateToday());
							formData.append("costEstimateStatus", 2);
						}
					}
					var projectPhaseCount = 0;
					$(".table-row-project-phase").each(function(i, obj){
						var thisChildren 			= $(this).find(".table-row-milestone");
						// var thisGrandChildren 	= thisChildren.find(".table-body-request-items");
						var projectPhaseID 			= $(this).find("[name=projectPhase]").val();
						var projectPhaseDescription = $(this).find("[name=projectPhase] option:selected").attr("phasedescription");
						thisChildren.each(function(j){

							var milestoneID 	= $(this).find(`[name=projectMilestone]`).val(); 
							var milestoneName	= $(this).find(`[name=projectMilestone] option:selected`).attr("milestonename");

							$(this).find(".table-body-request-items tr").each(function(k){

								var milestoneItemID 			= $(this).find("[name=milestoneItems]").val();
								var milestoneItemCode 			= $(this).find(".milestone-item-code").text();
								var milestoneItemName 			= $(this).find("[name=milestoneItems] option:selected").attr("itemname");
								var milestoneItemClassification = $(this).find(".milestone-item-classification").text().trim();
								var milestoneBranName 			= $(this).find("[name=milestoneItems] option:selected").attr("brandname");
								var milestoneItemQuantity 		= $(this).find(".milestone-quantity").find("[name=quantity]").val();
								var milestoneItemUom 			= $(this).find(".milestoneUom").text();
								var temp = {
									projectPhaseID,projectPhaseDescription,milestoneID,milestoneName,milestoneItemID,milestoneItemCode,
									milestoneItemName,milestoneItemClassification,milestoneItemQuantity,milestoneItemUom
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
								formData.append(`projectPhaseData[${projectPhaseCount}][milestoneBranName]`, milestoneBranName);
								formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemQuantity]`, milestoneItemQuantity);
								formData.append(`projectPhaseData[${projectPhaseCount}][milestoneItemUom]`, milestoneItemUom);
								projectPhaseCount += 1;
							});
						});
					});

					$(".table-row-material-equipment").each(function(i,obj){
						var materialItemCode 			= $(this).find(".material-item-code").text().replaceAll(" ", "");
						var materialItemID 				= $(this).find(`[name=materialItems]`).val();
						var materialItemName 			= $(this).find(`[name=materialItems] option:selected`).attr("itemname");
						var materialBrandName 			= $(this).find(`[name=materialItems] option:selected`).attr("brandname");
						var materialItemClassification	= $(this).find(".material-item-classification").text().replaceAll(" ", "");
						var materialItemQuantity 		= $(this).find(".material-quantity [name=quantity]").val();
						var materialItemUom 			= $(this).find(".materialUom").text().replaceAll(" ", "");
						var temp = {
							materialItemCode,materialItemID,materialItemName,materialItemClassification,materialItemQuantity,materialItemUom
						}
						data["materialData"].push(temp);
						formData.append(`materialData[${i}][materialItemCode]`, materialItemCode);
						formData.append(`materialData[${i}][materialItemID]`, materialItemID);
						formData.append(`materialData[${i}][materialItemName]`, materialItemName);
						formData.append(`materialData[${i}][materialItemClassification]`, materialItemClassification);
						formData.append(`materialData[${i}][materialBrandName]`, materialBrandName);
						formData.append(`materialData[${i}][materialItemQuantity]`, materialItemQuantity);
						formData.append(`materialData[${i}][materialItemUom]`, materialItemUom);
					});

					$(".manpowerRowData").each(function(i,obj){
						var designationID 				= $(this).find(".manpowerDesignationCode").attr("designationid");
						var designationCode 			= $(this).find(".manpowerDesignationCode").text().trim();
						var designation 				= $(this).find(".manpowerDesignation").text().trim();
						var designationQuantity 		= $(this).find(".manpowerQuantity").text().trim();
						var designationTotalManHours 	= $(this).find(".manpowerTotalManHours").text().trim();
						var temp = {
							designationID,designationCode,designation,designationQuantity,designationTotalManHours
						};

						data["manpowerData"].push(temp);

						formData.append(`manpowerData[${i}][designationID]`, designationID);
						formData.append(`manpowerData[${i}][designationCode]`, designationCode);
						formData.append(`manpowerData[${i}][designation]`, designation);
						formData.append(`manpowerData[${i}][designationQuantity]`, designationQuantity);
						formData.append(`manpowerData[${i}][designationTotalManHours]`, designationTotalManHours);
					});

					var travelCount = 0;
					$(".table-row-travel").each(function(i,obj){
						
						var travelType		= $(this).find("[name=travelType]").val();
						var condition = $(this).find(".travelTypeRequest [name=travelTypeOthers]").val();
						
						if(!condition){
							$(".table-row-vehicle").each(function(j,obj){
								var vehicleID 				= $(this).find(`[name=travelVehicle]`).val();
								var vehicleCode 			= $(this).find(`[name=travelVehicle] option:selected`).attr("vehiclecode");
								var vehicleName 			= $(this).find(`[name=travelVehicle] option:selected`).attr("vehiclename");
								var vehiclePlateNumber 		= $(this).find(`[name=travelVehicle] option:selected`).attr("vehicleplatenumber");
								var vehicleFuelConsumption 	= $(this).find(`[name=travelVehicle] option:selected`).attr("vehiclefuelconsumption");
								var vehicleGasType 			= $(this).find(`[name=travelVehicle] option:selected`).attr("vehiclegastype");
								var vehicleDistance 		= $(this).find(`[name=vehicleDistance]`).val().replaceAll(",","");
								var temp = {
									travelType, vehicleCode,vehicleID,vehicleName,vehiclePlateNumber,vehicleGasType,vehicleDistance
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
								travelCount += 1;
							});
							
							
						}else{
							var travelTypeDescription = $(this).find("[name=travelTypeOthers]").val();
							var temp = {
								travelType, travelTypeDescription
							}
							data["travelData"].push(temp);
							formData.append(`travelData[${travelCount}][travelType]`, travelType);
							formData.append(`travelData[${travelCount}][travelTypeDescription]`, travelTypeDescription);
							travelCount += 1;
						}

					});
				} 

				

				return isObject ? data : formData;
			}
		// ----- END GET Cost Estimate DATA -----

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
				var tableData = getTableData("pms_cost_estimate_tbl","reviseCostEstimateID",`reviseCostEstimateID=`+id);
				// console.log(tableData);
				revised = tableData.length > 0 ? true : false;
				return revised; 
			}
		// END CHECK IF THE DOCUMENT IS ALREADY REVISED
		// --------------- DATABASE RELATION ---------------
			function getConfirmation(method = "submit") {
				const title = "Cost Estimate";
				let swalText, swalImg;

				$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("hide");

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

			function savecostEstimate(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
				let thisReturnData = false;
				if (data) {
					const confirmation = getConfirmation(method);
					confirmation.then(res => {
						if (res.isConfirmed) {
							$.ajax({
								method:      "POST",
								url:         `cost_estimate/savecostEstimate`,
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
												// 		url: `${base_url}pms/cost_estimate/saveCanvassingData`,
												// 		data:{"costEstimateID":lastApproverID},
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
										$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("show");
									}
								}
										
							} else if (res.isDismissed) {
								if (method == "deny") {
									$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("show");
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