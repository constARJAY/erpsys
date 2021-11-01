let FILE_ARRAY 			= [];
let EXIST_FILE_ARRAY 	= [];
$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(90);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(90);
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
				"pms_timeline_builder_tbl", 
				"reviseTimelineBuilderID", 
				"reviseTimelineBuilderID IS NOT NULL AND timelineBuilderStatus != 4");
			return revisedDocumentsID.map(item => item.reviseTimelineBuilderID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----




    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("pms_timeline_builder_tbl", "", "timelineBuilderID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					timelineBuilderStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (timelineBuilderStatus == 0 || timelineBuilderStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (timelineBuilderStatus == 0) {
						isReadOnly = false;
					}else if(timelineBuilderStatus == 7){
						isReadOnly = false;
						isRevise = true;
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
			window.history.pushState("", "", `${base_url}pms/project_timeline_builder?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/project_timeline_builder?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/project_timeline_builder?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/project_timeline_builder`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const employeeList = getTableData("hris_employee_list_tbl LEFT JOIN hris_designation_tbl USING (designationID)", 
										`employeeLastname, employeeFirstname, employeeMiddlename, employeeID, employeeRanking, hris_designation_tbl.designationName AS designationName, employeeRankingCredit,
											CASE employeeLastname WHEN "" THEN employeeFirstname
											ELSE CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) 
											END  "employeeFullname" `,
										`employeeID != "1" AND employeeStatus != 0 AND employeeStatus != 3 AND employeeStatus != 4 AND employeeStatus != 5 AND employeeStatus != 6`);
		
	const projectList = getTableData("pms_project_list_tbl JOIN pms_category_tbl USING(categoryID) JOIN pms_milestone_builder_tbl USING(categoryID)", 
							"pms_project_list_tbl.*, pms_category_tbl.categoryName AS projectCategory ",
							"projectListStatus = 1","","projectListID");
	const milestoneList = getTableData("pms_milestone_list_tbl")
	const clientList = getTableData("pms_client_tbl", "*", "clientStatus = 1");

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
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 100 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 350 }, // Description
					{ targets: 8,  width: 100  },
					{ targets: 9,  width: 290  },
					{ targets: 10,  width: 150  },
					{ targets: 11,  width: 350  }
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
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 100 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 350 }, // Description
					{ targets: 8,  width: 100  },
					{ targets: 9,  width: 290  },
					{ targets: 10,  width: 150  },
					{ targets: 11,  width: 350  }
				],
			});

			var table = $("#tableProjectTask")
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
					{ targets: 0,  width: "5%"  	},
					{ targets: 1,  width: 250	 	},
					{ targets: 2,  width: 200 		},
					{ targets: 3,  width: 1000 		},
				],
			});

			var table = $("#tableProjectTask0")
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
					{ targets: 0,  width: 250 },
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 1000  }
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_timeline_builder_tbl", "approversID")) {
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
			if(isCreateAllowed(90)){
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
		let timelineBuilderData = getTableData(
			"pms_timeline_builder_tbl AS pptb LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = pptb.projectID",
			"pptb.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pptb.createdAt AS dateCreated, projectListCode, projectListName",
			`pptb.employeeID != ${sessionID} AND timelineBuilderStatus != 0 AND timelineBuilderStatus != 4`,
			`FIELD(timelineBuilderStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(pptb.submittedAt, pptb.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Project Name</th>
					<th>Project Category</th>
					<th>Proposed Budget</th>
					<th>Allocated Budget</th>
					<th>Budget Status</th>
					<th>Description</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		timelineBuilderData.map((item) => {
			let {
				fullname,
				timelineBuilderID,
				projectID,
				projectListCode,
				projectCode,
				projectListName,
				timelineProposedBudget,
				timelineAllocatedBudget,
				timelineBudgetStatus,
				approversID,
				approversDate,
				timelineBuilderStatus,
				timelineBuilderRemarks,
				timelineBuilderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = timelineBuilderRemarks ? timelineBuilderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = timelineBuilderStatus == 2 || timelineBuilderStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = timelineBuilderStatus != 0 ? "btnView" : "btnEdit";

			let button = timelineBuilderStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(timelineBuilderID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(timelineBuilderID)}" 
				code="${getFormCode("PBT", createdAt, timelineBuilderID )}"><i class="fas fa-edit"></i> Edit</button>`;
			let projectCategory = projectID && projectList.filter(items=> items.projectListID == projectID).map(items=>{return items.projectCategory});
			let budgetStatus = ``;

			if(timelineBuilderStatus != 6 && timelineBuilderStatus != 1 && timelineBuilderStatus != 2){
				 budgetStatus = `-`;
			}else{
				 budgetStatus = timelineBudgetStatus == 0 ? 
                `<span class="badge badge-outline-info w-100">For Proposal</span>` :
                `<span class="badge badge-outline-success w-100" style="width: 100% !important">Allocated</span>`;
			}
			if (isImCurrentApprover(approversID, approversDate, timelineBuilderStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(timelineBuilderID )}">
					<td>${getFormCode("PBT", createdAt, timelineBuilderID )}</td>
					<td>${fullname}</td>
					<td>
						<div>
						${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectCode || '-'}</small>
					</td>
					<td>${projectCategory}</td>
					<td class="text-right">${timelineProposedBudget ? formatAmount(timelineProposedBudget, true) : "-"}</td>
					<td class="text-right">${timelineAllocatedBudget ? formatAmount(timelineAllocatedBudget, true) : "-"}</td>
					<td>${budgetStatus}</td>
					<td>${timelineBuilderReason == "null" ? "-" :  timelineBuilderReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, timelineBuilderStatus, true))}
					</td>
					<td>
						${dateCreated ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Created: </b><span style="color:#000;">${dateCreated}</span>
										</div>` : ``}
						${dateSubmitted ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Submitted: </b><span style="color:#000;">${dateSubmitted}</span>
										</div>` : ``}
						${dateApproved ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Approved: </b><span style="color:#000;">${dateApproved}</span>
										</div>` : ``}
						
					</td>
					<td class="text-center">
						${getStatusStyle(timelineBuilderStatus)}
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
		let timelineBuilderData = getTableData(
			"pms_timeline_builder_tbl AS pptb LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = pptb.projectID",
			"pptb.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, pptb.createdAt AS dateCreated, projectListCode, projectListName",
			`pptb.employeeID = ${sessionID}`,
			`FIELD(timelineBuilderStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(pptb.submittedAt, pptb.createdAt)`
		);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Project Name</th>
					<th>Project Category</th>
					<th>Proposed Budget</th>
					<th>Allocated Budget</th>
					<th>Budget Status</th>
					<th>Description</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		timelineBuilderData.map((item) => {
			let {
				fullname,
				timelineBuilderID,
                projectID,
                projectListCode,
				projectCode,
                projectListName,
				timelineProposedBudget,
				timelineAllocatedBudget,
				timelineBudgetStatus,
				approversID,
				approversDate,
				timelineBuilderStatus,
				timelineBuilderRemarks,
				timelineBuilderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = timelineBuilderRemarks ? timelineBuilderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = timelineBuilderStatus == 2 || timelineBuilderStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = timelineBuilderStatus != 0 ? (timelineBudgetStatus ? "btnEdit" : "btnView") : "btnEdit";
			
			let button = timelineBuilderStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(timelineBuilderID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(timelineBuilderID )}" 
                code="${getFormCode("PBT", createdAt, timelineBuilderID )}"><i class="fas fa-edit"></i> Edit</button>`;
				
			let projectCategory = projectID && projectList.filter(items=> items.projectListID == projectID).map(items=>{return items.projectCategory});
			let budgetStatus = `-`;

			if(timelineBuilderStatus != 6 && timelineBuilderStatus != 1 && timelineBuilderStatus != 2){
				 budgetStatus = `-`;
				 let budgetCondition = parseFloat(timelineProposedBudget) > parseFloat(timelineAllocatedBudget);
					if(budgetCondition){
						budgetStatus =
						`<span class="badge badge-outline-danger w-100" style="width: 100% !important">Over the Budget</span>`;
					}else{
						budgetStatus = 
						`<span class="badge badge-outline-success w-100" style="width: 100% !important">Within the Budget</span>`;
					}

					if(timelineBuilderStatus == "0" || timelineBuilderStatus == "4"){
						budgetStatus = `-`;
					}
					
			}else{
				
				let budgetCondition = parseFloat(timelineProposedBudget) > parseFloat(timelineAllocatedBudget);
				if(budgetCondition){
					budgetStatus =
					`<span class="badge badge-outline-danger w-100" style="width: 100% !important">Over the Budget</span>`;
				}else{
					budgetStatus = 
					`<span class="badge badge-outline-success w-100" style="width: 100% !important">Within the Budget</span>`;
				}

				if(timelineBuilderStatus == "6" || timelineBuilderStatus == "4"){
					budgetStatus = `-`;
				}
			}
			
			html += `
			<tr class="${btnClass}" id="${encryptString(timelineBuilderID )}">
				<td>${getFormCode("PBT", createdAt, timelineBuilderID )}</td>
				<td>${fullname}</td>
				<td>
					<div>
					${projectListName || '-'}
					</div>
					<small style="color:#848482;">${projectCode || '-'}</small>
				</td>
				<td>${projectCategory}</td>
				<td class="text-right">${timelineProposedBudget ? formatAmount(timelineProposedBudget, true) : "-"}</td>
				<td class="text-right">${timelineAllocatedBudget ? formatAmount(timelineAllocatedBudget, true) : "-"}</td>
				<td>${budgetStatus}</td>
				<td>${timelineBuilderReason == "null" ? "-" :  timelineBuilderReason}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, timelineBuilderStatus, true))}
				</td>
				<td>
					${dateCreated ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Created: </b><span style="color:#000;">${dateCreated}</span>
										</div>` : ``}
						${dateSubmitted ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Submitted: </b><span style="color:#000;">${dateSubmitted}</span>
										</div>` : ``}
						${dateApproved ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Approved: </b><span style="color:#000;">${dateApproved}</span>
										</div>` : ``}
				</td>
				<td class="text-center">
					${getStatusStyle(timelineBuilderStatus)}
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
				timelineBuilderID     = "",
				timelineBuilderStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (timelineBuilderStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						timelineBuilderID="${encryptString(timelineBuilderID)}"
						code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT",createdAt, timelineBuilderID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (timelineBuilderStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
							status="${timelineBuilderStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(timelineBuilderStatus == 2){
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						timelineBuilderID="${encryptString(timelineBuilderID)}"
						code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
						status="${timelineBuilderStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (timelineBuilderStatus == 3) {
					// DENIED - FOR REVISE
					if(!isDocumentRevised(timelineBuilderID)){
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
							status="${timelineBuilderStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				} else if (timelineBuilderStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(timelineBuilderID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"
							status="${timelineBuilderStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (timelineBuilderStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							timelineBuilderID="${encryptString(timelineBuilderID)}"
							code="${getFormCode("PBT", createdAt, timelineBuilderID)}"><i class="fas fa-ban"></i> 
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


    // ----- GET PROJECT LIST -----
	function getProjectList(id = null) {
		let html = `<option disabled ${!id || id == "0" ?"selected":''}>Please select a project</option>`;

        html += projectList.map(project => {
            return `
            <option 
                value       		= "${project.projectListID}" 
                projectCode 		= "${project.projectListCode}"
				projectCategory 	= "${project.projectCategory}"
				projectCategoryID 	= "${project.categoryID}"
                ${project.projectListID == id && "selected"}>
                ${project.projectListName}
            </option>`;
        })
        return html;
    }
    // ----- END GET PROJECT LIST -----

	// ----- GET CLIENT LIST -----
    function getClientList(id = null) {
		let html = `<option disabled ${!id || id == "0"?"selected":''}>Please select a client</option>`;

        html += clientList.map(items => {
			let address = `${items.clientUnitNumber && titleCase(items.clientUnitNumber)+" "}${items.clientHouseNumber && items.clientHouseNumber +" "}${items.clientStreetName && titleCase(items.clientStreetName)+", "}${items.clientSubdivisionName && titleCase(items.clientSubdivisionName)+", "}${items.clientBarangay && titleCase(items.clientBarangay)+", "}${items.clientCity && titleCase(items.clientCity)+", "}${items.clientProvince && titleCase(items.clientProvince)+", "}${items.clientCountry && titleCase(items.clientCountry)+", "}${items.clientPostalCode && titleCase(items.clientPostalCode)}`;
            return `
            <option 
                value       = "${items.clientID}" 
                clientCode  = "${items.clientCode}"
                clientName  = "${items.clientName}"
				address     = "${address}"
                ${items.clientID == id && "selected"}>
                ${items.clientName}
            </option>`;
        })
        return html;
    }
    // ----- END GET CLIENT LIST -----

	// ----- GET EMPLOYEE LIST -----
	function getEmployeeList(id = null , typeEmployee = "NonOrganic"){
		// TYPE EMPLOYEE ;
			// PROJECT MANAGER 			= PM; 
			// TEAM LEADER 				= TL
			// TEAM MEMBERS Oranic 		= ORG
			// TEAM MEMBERS Non Organic	= NORG
		let html = ``, members = [];
		let projectManager 	= $("[name=timelineProjectManager]").val(); 
		let teamLeader 		= $("[name=timelineTeamLeader]").val();

		switch(typeEmployee) {
			case "PM":	html += `<option disabled ${!id || id == "0"?"selected":''}>Please select a project manager</option>`;
				employeeList.filter(emp => emp.employeeRanking == "Managerial").map((emp,index) =>{
					html += `			
						<option 
							value        = "${emp.employeeID}" 
							${emp.employeeID == id && "selected"}>
							${emp.employeeFullname}
						</option>
						`;
				});
				break;
			case "TL": html += `<option disabled ${!id || id == "0"?"selected":''}>Please select a team leader</option>`;
				employeeList.filter(emp => emp.employeeRanking == "Officer" || emp.employeeRanking == "Managerial").map((emp,index) =>{
					html += `			
						<option 
							value        = "${emp.employeeID}" 
							${emp.employeeID == id && "selected"}>
							${emp.employeeFullname}
						</option>
						`;
				});
				break;
			case "ORG": 
			// html += `<option disabled ${!id || id == "0"?"selected":''}>Please select a team </option>`;
				var employeeIDs = id.split("|");
				
				employeeList.filter(emp => emp.employeeRanking).map((emp,index) =>{
					html += `			
							<option 
								value  = "${emp.employeeID}" 
								${employeeIDs.includes(emp.employeeID) && "selected"}>
								${emp.employeeFullname} - ${emp.designationName}
							</option>
							`;
				});
			break;
			default: 
				var employeeIDs = id.split("|");

				employeeList.filter(emp => !emp.employeeRanking).map((emp,index) =>{
					html += `			
							<option 
								value  = "${emp.employeeID}" 
								${employeeIDs.includes(emp.employeeID) && "selected"}>
								${emp.employeeFullname} - ${emp.designationName}
							</option>
							`;
				});
		}
		return html;	

	}	
	// ----- END GET EMPLOYEE LIST -----

	// ----- UPDATE MILESTONE SELECT -----
	function milestoneSelect(projectID  = null, milestoneBuilderID = null, arrayData = false){
		
		let html = `<option disabled ${!milestoneBuilderID || milestoneBuilderID == "0" ? "selected":''}>Please select a phase</option>`;

		if(projectID){
			let categoryID 	= projectList.filter(project =>  project.projectListID == projectID ).map(project=>{ return project.categoryID });
			let tableData 	= getTableData("pms_milestone_builder_tbl",`*`,`categoryID = '${categoryID}'`);
			let phaseIDArr;
				if(!arrayData){
					phaseIDArr = [];
					$(`[name=phaseDescription]`).each(function(i,obj){
						if($(this).val()){
							phaseIDArr.push($(this).val());
						}
					});
				}else{
					phaseIDArr = arrayData;
				}

			tableData.filter(phase => !phaseIDArr.includes(phase.milestoneBuilderID) || phase.milestoneBuilderID == milestoneBuilderID).map((phase,index) =>{
				html += `			
					<option value = "${phase.milestoneBuilderID}"
					${phase.milestoneBuilderID == milestoneBuilderID && "selected"}>
						${phase.phaseDescription}
					</option>
					`;
			});
		}

		return html;
	}
	// ----- END UPDATE MILESTONE SELECT -----

	function updateSelect(){
		let projectID 	= $("#projectID").val();
		let valueArr 	= [];
		let elementID	= [];
		$(`[name=phaseDescription]`).each(function(i,obj){
			valueArr.push($(this).val());
			elementID.push(this.id);
		});

		elementID.map((x, index)=>{
			$(`#${x}`).html("");
			let html = milestoneSelect(projectID, valueArr[index], valueArr);
			$(`#${x}`).html(html);
		});

	}


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

	$(document).on("change","[name=projectID]", function(){
		var thisValue 	 		= $(this).val();
		var projectCode 		= $('option:selected', this).attr("projectCode");
		var projectCategoryID 	= $('option:selected', this).attr("projectCategoryID");
        var projectCategory  	= $('option:selected', this).attr("projectCategory");

        $("[name=projectCode]").val(projectCode);
        $("[name=projectCategory]").val(projectCategory);
		// if(!thisValue){
			var row = listOfProjectPhase("","",thisValue);
			$(".timelineBuilderTableBody").html(row);
		// }
		updateTableRows();
		updateTableTaskList()
		initHours();
	
	});

	$(document).on("change","[name=phaseDescription]", function(){	
		let milestoneBuilderID 	= $(this).val();
		let thisParent 			= $(this).parent().parent();
		thisParent.find(".milestone-list").html(preloader);
		let tableData = getTableData("pms_milestone_list_tbl","*",`milestoneBuilderID = '${milestoneBuilderID}'`);
		let html = ``, tableDataLength = tableData.length;
		if(tableDataLength > 0){
			var breakReference = parseInt(tableDataLength) - 1;
			tableData.map((items, index)=>{
				html += `<span class="text-left font-weight-bold">${items.projectMilestoneName}</span>`;
				if(breakReference > index){
					html += `<br>`;
				}
			});
		}
		setTimeout(() => {
			thisParent.find(".milestone-list").html(html);
			updateSelect();
		}, 120);
		
	});

	$(document).on("click", "#btnAddRow", function(){
		// var projectCategoryID = $('option:selected', $("#projectID")).attr("projectCategoryID");
	 	var projectID = $("#projectID").val();
		
		let row = listOfProjectPhase("","", projectID);
		$(".timelineBuilderTableBody").append(row);  
		updateTableRows();
		updateTableTaskList()
		initHours();
		updateDeleteButton();
		updateSelect();
	});

	$(document).on("click", "#btnSubAddRow", function(){
		var thisElement = $(this).parent().parent().find(`tbody`);
		let row = listOfProjectTask();
		$(thisElement).append(row);  
		
		updateTableTaskList()
		initHours();
		updateDeleteButton();
	});

	/** CHECKBOX */
		$(document).on("change", ".main_checkboxall", function() {
			const isChecked = $(this).prop("checked");
			$(".main_checkboxrow").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
			updateDeleteButton();
		});
	
		$(document).on("click", ".main_checkboxrow", function() {
			updateDeleteButton();
		});
	/** END OF CHECKBOX */

	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
		
	});

	$(document).on("click", ".btnSubDeleteRow", function(){
		let thisCondition = $(this).closest("table").find(".btnSubDeleteRow");
		if( thisCondition.length > 1 ){
			setTimeout(() => {
				$(this).closest("tr").remove();
			}, 120);
		}else{
			showNotification("danger", "You must have atleast one or more items.");
		}
	});

	$(document).on("change", "[name=taskStartDate]", function(){
		let date = $(this).val().split(" - ");
		let startDate 	= new Date(moment(date[0]).format("YYYY-MM-DD"));
		let endDate		= new Date(moment(date[1]).format("YYYY-MM-DD"));
		let plusOne 	= date[0] == date[1] ? 0 : 1;
		let oneDay 		= 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		let diffDays 	= (Math.round(Math.abs((startDate - endDate) / oneDay)) || 1) + plusOne;
		let maxValue 	= diffDays * 24;
		let allotedHour = $(this).closest(`tr`).find("[name=allottedHours]").val().replaceAll(",", "") || $(this).closest(`tr`).find("[name=allottedHours]").val();
		$(this).closest(`tr`).find("[name=allottedHours]").removeClass("is-invalid");
		$(this).closest(`tr`).find("[name=allottedHours]").next().text("");
		$(this).closest(`tr`).find("[name=allottedHours]").prop("max", maxValue);
		$(this).closest(`tr`).find("[name=allottedHours]").prop("min", "1");

		if( parseFloat(allotedHour) > parseFloat(maxValue) ){
			$(this).closest(`tr`).find("[name=allottedHours]").addClass("is-invalid");
			$(this).closest(`tr`).find("[name=allottedHours]").next().addClass("d-block");
			$(this).closest(`tr`).find("[name=allottedHours]").next().text(`Please input hour less than ${formatAmount(maxValue)}`);
		}

		var dates = [];
		$(".task-list-sub-row").each(function(){
			var dateSplit 		= $(this).find("[name=taskStartDate]").val().split(" - ");
			var startDateValue 	= dateSplit[0];
			var endDateValue 	= dateSplit[1];
			startDateValue ? dates.push(startDateValue) : ``; 
			endDateValue ? dates.push(endDateValue) : ``; 
		});	
		var dateSortOf = dates.sort(function(a,b){ return new Date(a) - new Date(b) });
		$("[name=timelineDate]").val(dateSortOf[0]+" - "+dateSortOf.pop());


	});


	
	$(document).on("change","[name=clientID]", function(){
		var clientAddress 		= $('option:selected', this).attr("address");
		$("[name=clientAddress]").val(clientAddress);
	});


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			timelineBuilderID       = "",
			reviseTimelineBuilderID = "",
			employeeID              = "",
			projectID               = "",
			projectCode 			= "",
			clientID 				= "",
			timelinePriorityLevel	= "",
			timelineProjectManager  = "",
			timelineTeamLeader 		= "",
			timelineTeamMember 		= "",
			timelineProposedBudget 	= "",
			timelineAllocatedBudget = "",
			timelineDesign 			= "",
			timelineBudgetStatus   	= "",
			timelineBuilderReason   = "",
			timelineStartDate 		= "",
			timelineEndDate 		= "",
			timelineIssued 			= "",
			timelineBuilderRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			timelineBuilderStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];
	
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----


		if(timelineDesign){
			let timelineDesignArr = timelineDesign.split("|");
			timelineDesignArr.map(file=>{
					EXIST_FILE_ARRAY.push(file);
			});
		}



		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("timelineBuilderID", encryptString(timelineBuilderID));
		$("#btnBack").attr("status", timelineBuilderStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : ``;
		let tableProjectTaskID = readOnly ? "tableProjectTask0" : "tableProjectTask";
		let checkboxProjectTaskHeader = !readOnly ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="main_checkboxall">
			</div>
		</th>` : ``;
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? timelineBuilderID : reviseTimelineBuilderID;
		let documentHeaderClass = isRevise || reviseTimelineBuilderID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseTimelineBuilderID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseTimelineBuilderID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PBT", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let timelineDate = !timelineStartDate ? "-" : moment(timelineStartDate).format("MMMM DD, YYYY")+" - "+moment(timelineEndDate).format("MMMM DD, YYYY");

		let clientAddress = clientID && clientList.filter(items=> items.clientID == clientID).map((items, index)=>{
			return `${items.clientUnitNumber && titleCase(items.clientUnitNumber)+" "}${items.clientHouseNumber && items.clientHouseNumber +" "}${items.clientBarangay && titleCase(items.clientBarangay)+", "} ${items.clientStreetName && titleCase(items.clientStreetName)+", "}${items.clientSubdivisionName && titleCase(items.clientSubdivisionName)+", "}${items.clientCity && titleCase(items.clientCity)+", "}${items.clientProvince && titleCase(items.clientProvince)+", "}${items.clientCountry && titleCase(items.clientCountry)+", "}${items.clientPostalCode && titleCase(items.clientPostalCode)}`
		});	

		let projectCategory = projectID && projectList.filter(items=> items.projectListID == projectID).map(items=>{return items.projectCategory});
		let proposedBudgetText = ``, proposedBudgetNote = ``;
		if(timelineAllocatedBudget){
			if(timelineProposedBudget > timelineAllocatedBudget ){
				proposedBudgetText = `Over the budget`;
			}else{
				proposedBudgetText = `Within the budget`;
			}
			proposedBudgetNote = `<strong>Status: </strong>  ${proposedBudgetText}`;
		}
		
		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${timelineBuilderID && !isRevise ? getFormCode("PBT", createdAt, timelineBuilderID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${timelineBuilderStatus && !isRevise ? getStatusStyle(timelineBuilderStatus) : "---"}
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
								${getDateApproved(timelineBuilderStatus, approversID, approversDate)}
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
							${timelineBuilderRemarks && !isRevise ? timelineBuilderRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_timeline_builder">
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
					<div class="remarks">
						<textarea rows="4" style="resize: none" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/]['][''][;][:][-][_][()][%][&][*][ ]" name="timelineBuilderReason" required id="remarks" ${disabled} >${timelineBuilderReason}</textarea>
					</div>
				</div>
			</div>
			
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Project Code ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="text" class="form-control" data-allowcharacters=" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" disabled minlength="2" maxlength="150"  value="${projectCode || "-"}">
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
                        ${getProjectList(projectID)}
                    </select>
					<div class="invalid-feedback d-block" id="invalid-projectID"></div>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Project Category ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150" name="projectCategory"  value="${projectCategory}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Client Name ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
                        name="clientID"
                        id="clientID"
                        style="width: 100%"
                        required
						${disabled}>
                        ${getClientList(clientID)}
                    </select>
					<div class="invalid-feedback d-block" id="invalid-clientID"></div>
				</div>
			</div>
			<div class="col-md-8 col-sm-12">
				<div class="form-group">
					<label>Client Address ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="text" class="form-control" disabled  name="clientAddress" value="${clientAddress}">
					
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Project Manager ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="timelineProjectManager"
						id="timelineProjectManager"
						style="width: 100%"
						required ${disabled}>
						${getEmployeeList(timelineProjectManager, "PM")}
					</select>
					<div class="invalid-feedback d-block" id="invalid-timelineProjectManager"></div>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Team Leader ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="timelineTeamLeader"
						id="timelineTeamLeader"
						style="width: 100%"
						required ${disabled}>
						${getEmployeeList(timelineTeamLeader, "TL")}
					</select>
					<div class="invalid-feedback d-block" id="invalid-timelineTeamLeader"></div>
				</div>
			</div>

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Start Date & End Date ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="text" class="form-control" disabled name="timelineDate" value="${timelineDate}">
				</div>
			</div>
			
			<div class="col-12">
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<div class="form-group">
							<label>Team Members (Organic) ${!disabled ? `<code>*</code> <small class="text-info"> ( Kindly include the project manager and team leader on the team member. )</small>` : ""}</label>
							<select class="form-control validate select2"  multiple="multiple"
								name="timelineTeamMember"
								id="timelineTeamMemberOrganic"
								style="width: 100%"
								required ${disabled}>
								${getEmployeeList(timelineTeamMember, "ORG")}
							</select>
							<div class="invalid-feedback d-block" id="invalid-timelineTeamMemberOrganic"></div>
						</div>
					</div>

					<div class="col-md-6 col-sm-12">
						<div class="form-group">
							<label>Team Members (Non-Organic) </label>
							<select class="form-control validate select2"  multiple="multiple"
								name="timelineTeamMember"
								id="timelineTeamMemberNonOrganic"
								style="width: 100%" ${disabled}>
								${getEmployeeList(timelineTeamMember)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-timelineTeamMemberNonOrganic"></div>
						</div>
					</div>



					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Design </label>
						 	<input  type="file" 
								class="form-control" 
								name="timelineDesign" 
								id="timelineDesign"
								accept="image/*, .pdf, .doc, .docx"  multiple ${disabled}>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12">
				<div class="row row-display-image">
					${displayImage(false , readOnly, "assets/upload-files/project-designs")}
				</div>
				
			</div>
			
			<div class="card mt-2">
				<div class="card-header bg-primary text-white">
					<div class="row">
						<div class="col-md-6 col-sm-12 text-left">
							<h5 style="font-weight: bold;
								letter-spacing: 0.05rem;">Project Tasks</h5>
						</div>
						<div class="col-md-6 col-sm-12 text-right"></div>
					</div>
				</div>
				<div class="card-body">
					<div class="w-100 request-items-content">
						<table class="table table-striped" id="${tableProjectTaskID}">
							<thead>
								<tr style="white-space: nowrap">
									${checkboxProjectTaskHeader}
									<th>Phase</th>
									<th>Milestone</th>
									<th>Task/s</th>
								</tr>
							</thead>
							<tbody class="timelineBuilderTableBody">
								${listOfProjectPhase(timelineBuilderID, readOnly)}
							</tbody>
						</table>
						<div class="w-100 text-left my-2" id="projectTaskButtons">
							
						</div>
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
			

			<div class="w-100 row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Proposed Budget ${!disabled ? "<code>*</code>" : ""}</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control text-right proposedBudget amount" 
								name="timelineProposedBudget"
								id="timelineProposedBudget"
                                min="1" timelineBudgetStatus="${timelineBudgetStatus}"
                                value="${timelineProposedBudget|| 0.00}" ${disabled}
								${timelineAllocatedBudget ? `max="${timelineAllocatedBudget}"` : ``}
								>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-proposedBudget"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Allocated Budget </label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control amount text-right allocatedBudget" 
								name="timelineAllocatedBudget"
								id="timelineAllocatedBudget"
                                min="1" 
                                max="999999" 
                                value="${timelineAllocatedBudget || '0'}" disabled>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-allocatedBudget"></div> 
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
			initDataTables();
			initAll();
			initHours();
			$("#awardSignatories").select2({ placeholder: "Please select a team members", theme: "bootstrap" });
			$("#timelineProposedBudget").prop("min", timelineBuilderStatus == "0" ? "1" : "1");
			$("#timelineProposedBudget").prop("max", timelineBuilderStatus == "0" ? "" : ( $("#timelineAllocatedBudget").val().replaceAll(",","") || $("#timelineAllocatedBudget").val() ) );
			
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
			updateTableRows();
			updateTableTaskList();
			readOnly || timelineBuilderStatus == 0 ? $("[name=taskStartDate]").change() : "";
			return html;
		}, 200);
	}
	// ----- END FORM CONTENT -----

	function listOfProjectPhase(id = null, readOnly = false, projectID = null){
		let html = ``, tableData = [], projectTaskButtons = false;
		if(id){
			 tableData = getTableData(`pms_timeline_task_list_tbl JOIN pms_timeline_builder_tbl USING(timelineBuilderID) `,
			 ``,`timelineBuilderID='${id}'`,``,`milestoneBuilderID`);
		}

		if(tableData.length > 0){
			tableData.map((items,index)=>{
				var milestoneListData = milestoneList.filter(milestoneList => milestoneList.milestoneBuilderID == items.milestoneBuilderID).map((items,index)=>{
					return items["projectMilestoneName"];
				}).join();
				html += `<tr class="task-list-row">
					${!readOnly ? 
						`<td class="text-center">
							<div class="action">
								<input type="checkbox" id="checkboxrow0" class="main_checkboxrow">
							</div>
						</td>` : ``}
						<td>
							<select class="form-control validate select2"
									name="phaseDescription"
									id="phaseDescription0"
									style="width: 100%"
									required
									${readOnly ? "disabled" : ``} required>
									${milestoneSelect(items.projectID, items.milestoneBuilderID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-phaseDescription0"></div>

						</td>
						<td class="milestone-list" projectmilestoneid="">
							${milestoneListData.replaceAll(",",`<br>`)}
						</td>

						<td class="task-list">
							<table class="table">
								<thead>
									<tr>
									${!readOnly ? 
										`<th class="text-center" style="width:10%;">
											<div class="action">
												
											</div>
										 </th>` : ``}
										<th style="width:150px;">Task Name</th>
										<th style="width:100px;">Alotted Hours</th>
										<th style="width:100px;">Date</th>
										<th style="width:150px;">Remarks</th>
									</tr>
								</thead>
								<tbody class="">
									${listOfProjectTask(items.timelineBuilderID, readOnly, items.milestoneBuilderID)}
								</tbody>
							</table>
							<div class="w-100 text-left my-2" id="taskListButtons">
							${!readOnly ? 
								`<button class="btn btn-primary btnSubAddRow" type="button" id="btnSubAddRow"><i class="fas fa-plus"></i></button>` : ``}
							</div>
						</td>
					</tr>`;
			});
			projectTaskButtons = readOnly ? false : true;
		}else{
			if(projectID){
				html += `<tr class="task-list-row">
					${!readOnly ? 
						`<td class="text-center">
							<div class="action">
								<input type="checkbox" id="checkboxrow0" class="main_checkboxrow">
							</div>
						</td>` : ``}
						<td>
							<select class="form-control validate select2"
									name="phaseDescription"
									id="phaseDescription0"
									style="width: 100%"
									required
									${readOnly ? "disabled" : ``} required>
									${milestoneSelect(projectID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-phaseDescription0"></div>

						</td>
						<td class="milestone-list" projectmilestoneid="">
							

						</td>

						<td class="task-list">
							<table class="table">
								<thead>
									<tr>
									${!readOnly ? 
										`<th class="text-center" style="width:10%;">
											<div class="action">
												
											</div>
										 </th>` : ``}
										<th style="width:350px;">Task Name</th>
										<th style="width:200px;">Alotted Hours</th>
										<th style="width:320px;">Date</th>
										<th style="width:250px;">Remarks</th>
									</tr>
								</thead>
								<tbody class="">
									${listOfProjectTask(id)}
								</tbody>
							</table>
							<div class="w-100 text-left my-2" id="taskListButtons">
								<button class="btn btn-primary btnSubAddRow" type="button" id="btnSubAddRow" style="margin-left: 30px;"><i class="fas fa-plus"></i></button>
							</div>
						</td>
					</tr>`;
				projectTaskButtons = true;
			} 
		}
		if(projectTaskButtons){
			setTimeout(() => {
				$("#projectTaskButtons").html(`	<button class="btn btn-primary btnAddRow" type="button" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
				<button class="btn btn-danger btnDeleteRow" type="button" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>`);
			}, 500);
		}

		return html;
	}
	
	function listOfProjectTask(timelineBuilderID = null, readOnly = false, milestoneBuilderID = null){
		let html = ``;
		if(timelineBuilderID){
			let tableData = getTableData("pms_timeline_task_list_tbl",``,`timelineBuilderID='${timelineBuilderID}' AND milestoneBuilderID = '${milestoneBuilderID}'`)
			tableData.map((items,index)=>{
				html += `<tr class="task-list-sub-row">
						${!readOnly ? 
						`<td class="text-center">
							<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow">
								<i class="fas fa-minus"></i>
							</button>	
						</td>` : ``}
						<td>
							<input type="text" 
								class = "form-control validate"
								data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" 
								name="taskName"
								id="taskName${index}"
								value = "${items.taskName}"
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-taskName${index}"></div>
						</td>
						<td>
							<input type="text" 
								class = "form-control input-hours text-center" 
								name="allottedHours"
								id="allottedHours${index}"
								value = "${items.allottedHours}"
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-allottedHours${index}"></div>
						</td>
						<td>
							<input
								type="button"
								class = "form-control daterange text-center"
								name = "taskStartDate"
								id="taskStartDate${index}" 
								value = "${ moment(items.taskStartDate || new Date() ).format("MMMM DD, YYYY")} - ${moment(items.taskEndDate || new Date() ).format("MMMM DD, YYYY")}"
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-taskStartDate${index}"></div>
						</td>
						<td>
							<input type="text" 
								class = "form-control validate" 
								name = "taskRemarks"
								id="taskRemarks${index}"  
								value = "${items.taskRemarks}"
								data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']"
								${readOnly ? "disabled" : ``}>
							<div class="invalid-feedback d-block" id="invalid-taskRemarks${index}"></div>
						</td>
				</tr>`;
			});
		}else{
			html = `<tr class="task-list-sub-row">
						${!readOnly ? 
						`<td class="text-center">
							<button class="btn btn-danger btnSubDeleteRow" type="button" id="btnSubDeleteRow"><i class="fas fa-minus"></i></button>	
						</td>` : ``}
						<td>
							<input type="text" 
								class = "form-control validate"
								data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']" 
								name="taskName"
								id="taskName0"
								value = ""
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-taskName0"></div>
						</td>
						<td>
							<input type="text " 
								class = "form-control input-hours text-center" 
								name="allottedHours"
								id="allottedHours0"
								value = ""
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-allottedHours0"></div>
						</td>
						<td>
							<input
								type="button"
								class = "form-control daterange text-center"
								name = "taskStartDate"
								id="taskStartDate0" 
								value = "${moment().format("MMMM DD, YYYY") - moment().format("MMMM DD, YYYY")}"
								${readOnly ? "disabled" : ``} required>
							<div class="invalid-feedback d-block" id="invalid-taskStartDate0"></div>
						</td>
						<td>
							<input type="text" 
								class = "form-control validate" 
								name = "taskRemarks"
								id="taskRemarks0"  
								value = ""
								data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][-][_][()][%][&][*][ ][']['']"
								${readOnly ? "disabled" : ``}>
							<div class="invalid-feedback d-block" id="invalid-taskRemarks0"></div>
						</td>
				</tr>`;
		}
		return html;
	}
	
	function updateTableRows(){
        $(".task-list-row").each(function(i){
            // CHECKBOX
			$("td .action .main_checkboxrow", this).attr("id", `main_checkboxrow${i}`);



            // INPUTS ID's
			$("td [name=phaseDescription]", this).attr("id", `phaseDescription${i}`);
			$("td [name=projectMilestoneName]", this).attr("id", `projectMilestoneName${i}`);
			

            // INPUTS ID's INVALID FEEDBACK
			$("td [name=phaseDescription]", this).next().attr("id", `invalid-phaseDescription${i}`);
			$("td [name=projectMilestoneName]", this).next().attr("id", `invalid-projectMilestoneName${i}`);
			
			// INITIALIZE SELECT 2
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			})

			$(this).find("select").each(function(j) {
				var thisValue = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("id", `phaseDescription${i}`);
				$(this).attr("data-select2-id", `phaseDescription${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});
				


        });
    }  



	function updateTableTaskList(){
		$(".task-list-row").each(function(i){
            // CHECKBOX
			var rowID 	=	$("td .action .main_checkboxrow", this).attr("id") ? $("td .action .main_checkboxrow", this).attr("id").replaceAll("main_checkboxrow","") : i;
				$(".task-list-sub-row").each(function(x){
					var newID 	= rowID+"_"+x;
					// CHECKBOX
					$("td .action .sub_checkboxrow", this).attr("id", `sub_checkboxrow0${newID}`);

					$("td [name=taskName]", this).attr("id", `taskName${newID}`);
					$("td [name=allottedHours]", this).attr("id", `allottedHours${newID}`);
					$("td [name=taskStartDate]", this).attr("id", `taskStartDate${newID}`);
					$("td [name=taskEndDate]", this).attr("id", `taskEndDate${newID}`);
					$("td [name=taskRemarks]", this).attr("id", `taskRemarks${newID}`);


					$("td [name=taskName]", this).next().attr("id", `invalid-taskName${newID}`);
					$("td [name=allottedHours]", this).next().attr("id", `invalid-allottedHours${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);
					$("td [name=taskEndDate]", this).next().attr("id", `invalid-taskEndDate${newID}`);
					$("td [name=taskRemarks]", this).next().attr("id", `invalid-taskRemarks${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);
					var date 			=	$(`#taskStartDate${newID}`).val();
					var conditionDate 	=	date != "NaN" ? date : moment().format("MMMM DD, YYYY")+" - "+moment().format("MMMM DD, YYYY");
					var dateSplit 		= 	conditionDate.split(" - ");
					var startDateValue 	=	dateSplit[0];
					var endDateValue	=	dateSplit[1];
					// var displayDate		=	startDataValue+" - "+endDateValue;
					// var dateRangePickerStartDate 	= startDateValue != moment() ? startDateValue : moment();
					// var dateRangePickerEndDate		= endDateValue 	!= moment() ? endDateValue : moment();

					// INIALIZE DATERANGE 
								$(`#taskStartDate${newID}`).daterangepicker({
									showDropdowns: true,
									autoApply: true,
									startDate: startDateValue,
									endDate: endDateValue,
									locale: {
										format: 'MMMM DD, YYYY'
									},
								});
				});
        });
	}

	function updateDeleteButton(){
        let count = 0;
        $(".main_checkboxrow").each(function() {
            $(this).prop("checked") && count++;
        });
        $(".btnDeleteRow").attr("disabled", count == 0);
    }

	function deleteTableRow(){
        if ($(`.main_checkboxrow:checked`).length != $(`.main_checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE PROJECT TASK",
				text:               "Are you sure to delete the selected project task?",
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
					$(`.main_checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						Swal.fire({
							icon:              "success",
							title:             "Project task deleted successfully!",
							showConfirmButton: false,
							timer:             2000,
						});
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableRows();
							updateTableTaskList();
							updateDeleteButton();
							updateSelect();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
    }

    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		FILE_ARRAY 		 = [];
		EXIST_FILE_ARRAY = [];
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

			headerButton(true, "Add Timeline");
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


	// ----- GET Project Timeline DATA -----
	function gettimelineBuilderData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { tasks: [], files: [], }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["timelineBuilderID"] = id;
			formData.append("timelineBuilderID", id);

			if (status != "2") {
				data["timelineBuilderStatus"] = status;
				formData.append("timelineBuilderStatus", status);
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			var timelineDate 					= $("[name=timelineDate]").val().split(" - ");
			var timelineBudgetStatus 			= $("[name=timelineProposedBudget]").attr("timelineBudgetStatus");
			var timelineAllocatedBudget 		= $("[name=timelineAllocatedBudget]").val().replaceAll(",","") || $("[name=timelineAllocatedBudget]").val() ;
			var timelineTeamMember 				= [];
			var timelineTeamMemberOrganic 		= $("#timelineTeamMemberOrganic").val() ?? null;
			var timelineTeamMemberNonOrganic 	= $("#timelineTeamMemberNonOrganic").val() ?? null;
			var existTimelineDesign 			= EXIST_FILE_ARRAY.join("|");
			for (let index = 0; index < timelineTeamMemberOrganic.length; index++) {
				timelineTeamMember.push(timelineTeamMemberOrganic[index]);
			}
			for (let index = 0; index < timelineTeamMemberNonOrganic.length; index++) {
				timelineTeamMember.push(timelineTeamMemberNonOrganic[index]);
			}
			

			data["employeeID"]            		= sessionID;
			data["projectID"]             		= $("[name=projectID]").val() || null;
			data["clientID"] 					= $("[name=clientID]").val() || null;
			data["timelineBuilderReason"]       = $("[name=timelineBuilderReason]").val() || null;
			data["timelineStartDate"]			= moment(timelineDate[0]).format("YYYY-MM-DD");
			data["timelineEndDate"]				= moment(timelineDate[1]).format("YYYY-MM-DD");
			data["timelinePriorityLevel"] 		= $("[name=timelinePriorityLevel]").val() ?? null;
			data["timelineIssued"] 				= $("[name=timelineIssued]").val() ?? null;
			data["timelineProjectManager"]		= $("[name=timelineProjectManager]").val() ?? null;
			data["timelineTeamLeader"] 			= $("[name=timelineTeamLeader]").val() ?? null;
			data["timelineTeamMember"] 			= timelineTeamMember.join("|") ?? null;
			data["timelineBuilderReason"] 	  	= $("[name=timelineBuilderReason]").val()?.trim() ?? null;
			data["timelineProposedBudget"] 		= $("[name=timelineProposedBudget]").val().replaceAll(",","") ?? null;
			data["existTimelineDesign"] 		= existTimelineDesign;
			data["timelineBudgetStatus"] 		= timelineBudgetStatus;
			data["timelineAllocatedBudget"] 	= timelineAllocatedBudget;



			formData.append("employeeID", sessionID);
			formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("clientID", $("[name=clientID]").val() || null);
			formData.append("timelineBuilderReason", $("[name=timelineBuilderReason]").val() || null);
			formData.append("timelineStartDate",moment(timelineDate[0]).format("YYYY-MM-DD"));
			formData.append("timelineEndDate", moment(timelineDate[1]).format("YYYY-MM-DD"));
			formData.append("timelinePriorityLevel",$("[name=timelinePriorityLevel]").val() ?? null);
			formData.append("timelineIssued",$("[name=timelineIssued]").val() ?? null);
			formData.append("timelineProjectManager",$("[name=timelineProjectManager]").val());
			formData.append("timelineTeamLeader",$("[name=timelineTeamLeader]").val() ??  null);
			formData.append("timelineTeamMember",timelineTeamMember.join("|") ?? null);
			formData.append("timelineBuilderReason", $("[name=timelineBuilderReason]").val()?.trim() ?? null );
			formData.append("timelineProposedBudget", $("[name=timelineProposedBudget]").val().replaceAll(",","") ?? null);
			formData.append("existTimelineDesign", existTimelineDesign);
			formData.append("timelineBudgetStatus", timelineBudgetStatus);
			formData.append("timelineAllocatedBudget", timelineAllocatedBudget);

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["timelineBuilderID"] = id;

				formData.append("timelineBuilderID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				var timelineBuilderStatus = timelineBudgetStatus != 0 ? true : false;
				if (approversID) {
					data["approversID"]           = timelineBuilderStatus ? approversID : ``;
					data["timelineBuilderStatus"] = timelineBuilderStatus ? data["timelineBuilderStatus"] : 6;

					formData.append("approversID", timelineBuilderStatus ? approversID : ``);
					formData.append("timelineBuilderStatus", timelineBuilderStatus ? data["timelineBuilderStatus"] : 6);
				} else {  // AUTO APPROVED - IF NO APPROVERS
				
					data["approversID"]           = timelineBuilderStatus ? sessionID : ``;
					data["approversStatus"]       = timelineBuilderStatus ? 2 : ``;
					data["approversDate"]         = timelineBuilderStatus ? dateToday() : ``;
					data["timelineBuilderStatus"] = timelineBuilderStatus ? 2 : 6;

					formData.append("approversID", timelineBuilderStatus ? sessionID : ``);
					formData.append("approversStatus", timelineBuilderStatus ? 2 : ``);
					formData.append("approversDate", timelineBuilderStatus ? dateToday() : ``);
					formData.append("timelineBuilderStatus", timelineBuilderStatus ? 2 : 6);
				}
			}


			$("[name=taskName]").each(function(i, obj) {
				var thisGrandParent = $(this).closest(".task-list-row");
				var thisParent 		= $(this).closest(".task-list-sub-row");

				var  milestoneBuilderID = thisGrandParent.find("[name=phaseDescription]").val();
				var milestoneListID;
				var taskName  			= $(this).val(); 	
				var allottedHours 		= thisParent.find("[name=allottedHours]").val().replaceAll(",","");
				var taskDateSplit 		= thisParent.find("[name=taskStartDate]").val().split(" - ");
				var taskStartDate		= moment(taskDateSplit[0]).format("YYYY-MM-DD");
				var taskEndDate			= moment(taskDateSplit[1]).format("YYYY-MM-DD");
				var taskRemarks			= thisParent.find("[name=taskRemarks]").val();

				let temp = {
					milestoneBuilderID,
					// milestoneListID    = , 
					taskName,	
					allottedHours,
					taskStartDate,
					taskEndDate,
					taskRemarks			
				};
				formData.append(`tasks[${i}][milestoneBuilderID]`, milestoneBuilderID);
				formData.append(`tasks[${i}][taskName]`, taskName);
				formData.append(`tasks[${i}][allottedHours]`, allottedHours);
				formData.append(`tasks[${i}][taskStartDate]`, taskStartDate);
				formData.append(`tasks[${i}][taskEndDate]`, taskEndDate);
				formData.append(`tasks[${i}][taskRemarks]`, taskRemarks);

				data["tasks"].push(temp);
			});



			for (let index = 0; index < FILE_ARRAY.length; index++){
				formData.append(`files[${index}]`, FILE_ARRAY[index]);
				data["files"].push(FILE_ARRAY[index]);
				
				formData.append(`files${index}`, FILE_ARRAY[index]);
			}
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET Project Timeline DATA -----


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
		const id 					= decryptString($(this).attr("timelineBuilderID"));
		const fromCancelledDocument = $(this).attr("cancel" ) == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----

	$("#timelineAllocatedBudget").val() ? $(this).attr("revise") == "true" : $(this).attr("revise") == "false" ;
	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("timelineBuilderID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("PBT", dateToday(), id);
		const status     				= $(this).attr("status");
		const revise     				= status != 0 ? $(this).attr("revise") == "true" : ( $("#timelineAllocatedBudget").val() != "0.00" ? $(this).attr("revise") == "false" : $(this).attr("revise") == "true")
		if (status != "false" && status != 0) {
			
			if (revise && status != "7") {
				const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data   = gettimelineBuilderData(action, "save", "0", id);
				data.append("timelineBuilderStatus", 0);
				if(!isFromCancelledDocument){
					data.append("reviseTimelineBuilderID", id);
					data.delete("timelineBuilderID");
				}else{
					data.append("timelineBuilderID", id);
					data.delete("action");
					data.append("action", "update");
				}
				
				savetimelineBuilder(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = gettimelineBuilderData(action, "save", "0", id);
			data.append("timelineBuilderStatus", 0);

			savetimelineBuilder(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("timelineBuilderID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("PBT", dateToday(), id);
		const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     					= gettimelineBuilderData(action, "save", "0", id);

		data.append("timelineBuilderStatus", 0);

		if (revise) {
			if(!isFromCancelledDocument){
				data.append("reviseTimelineBuilderID", id);
				data.delete("timelineBuilderID");
			}else{
				data.append("timelineBuilderID", id);
				data.delete("action");
				data.append("action", "update");
			}
		} 

		let btnBackCondition = $("#btnBack").attr("status");

		if(btnBackCondition != "7"){
			savetimelineBuilder(data, "save", null, pageContent);
		}else{
			$("#page_content").html(preloader);
			pageContent();
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
		const id           				= decryptString($(this).attr("timelineBuilderID"));
		const isFromCancelledDocument 	= $("[name=timelineProposedBudget]").attr("timelineBudgetStatus") ? $(this).attr("cancel") == "false" : $(this).attr("cancel") == "true";
		const timelineBudgetStatus 		= $("[name=timelineProposedBudget]").attr("timelinebudgetstatus") != 0 ? true : false; 
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_timeline_builder");
		const validateForms 			= validateNoneForm();
		const timelineAllocatedBudget 	= $("#timelineAllocatedBudget").val().replaceAll(",","") ||$("#timelineAllocatedBudget").val();
		const timelineProposedBudget 	= $("#timelineProposedBudget").val().replaceAll(",","") ||$("#timelineProposedBudget").val();
		const budgetStatus 				= timelineBudgetStatus ? (parseFloat(timelineAllocatedBudget) < parseFloat(timelineProposedBudget) ? false : true) : true;
		removeIsValid("#tableProjectTask");
		if(budgetStatus){
			if (validate) {
				if(validateForms){
					const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
					const data   = gettimelineBuilderData(action, "submit", "1", id);
		
					if (revise) {
						if(!isFromCancelledDocument){
							data.append("reviseTimelineBuilderID", id);
							data.delete("timelineBuilderID");
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
							moduleID:                90,
							notificationTitle:       "Project Timeline",
							notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
							notificationType:        2,
							employeeID,
						};
					}
					savetimelineBuilder(data, "submit", notificationData, pageContent);
				}else{
					showNotification("warning2","Cannot submit form, kindly input valid items")
				}
			}
		}else{
			$("#timelineProposedBudget").removeClass("is-valid").addClass("validated").addClass("is-invalid");
			$("#timelineProposedBudget").prop("max", timelineAllocatedBudget.replaceAll(",","") || timelineAllocatedBudget);
		}
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("timelineBuilderID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = gettimelineBuilderData(action, "cancelform", "4", id, status);

		savetimelineBuilder(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("timelineBuilderID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("pms_timeline_builder_tbl", "", "timelineBuilderID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let timelineBuilderID  = tableData[0].timelineBuilderID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = gettimelineBuilderData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                90,
					tableID:                 id,
					notificationTitle:       "Project Timeline",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				thisCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                90,
					tableID:                 id,
					notificationTitle:       "Project Timeline",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("timelineBuilderStatus", status);
			savetimelineBuilder(data, "approve", notificationData, pageContent, timelineBuilderID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("timelineBuilderID"));
		const feedback = $(this).attr("code") || getFormCode("PBT", dateToday(), id);

		$("#modal_cost_estimate_content").html(preloader);
		$("#modal_cost_estimate .page-title").text("DENY Project Timeline");
		$("#modal_cost_estimate").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="timelineBuilderRemarks"
					name="timelineBuilderRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-timelineBuilderRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			timelineBuilderID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_cost_estimate_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("timelineBuilderID"));
		const feedback = $(this).attr("code") || getFormCode("PBT", dateToday(), id);

		const validate = validateForm("modal_cost_estimate");
		if (validate) {
			let tableData = getTableData("pms_timeline_builder_tbl", "", "timelineBuilderID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("timelineBuilderID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("timelineBuilderRemarks", $("[name=timelineBuilderRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                90,
					tableID: 				 id,
					notificationTitle:       "Project Timeline",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savetimelineBuilder(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const timelineBuilderID = decryptString($(this).attr("timelineBuilderID"));
		const feedback       = $(this).attr("code") || getFormCode("PBT", dateToday(), id);

		const id = decryptString($(this).attr("timelineBuilderID"));
		let data = new FormData;
		data.append("timelineBuilderID", timelineBuilderID);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		savetimelineBuilder(data, "drop", null, pageContent);
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


	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("pms_timeline_builder_tbl","reviseTimelineBuilderID",`reviseTimelineBuilderID=`+id);
		// console.log(tableData);
		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED


})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Project Timeline";
	let swalText, swalImg;

	$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("hide");

	switch (method) {
		case "save":
			swalTitle = `SAVE DRAFT`;
			swalText  = "Are you sure to save this document?";
			swalImg   = `${base_url}assets/modal/draft.svg`;
			break;
		case "submit":
			var condition = $("[name=timelineProposedBudget]").attr("timelineBudgetStatus");
			console.log(condition);
			if(condition != 0){
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalText  = "Are you sure to submit this document?";
				swalImg   = `${base_url}assets/modal/add.svg`;
			}else{
				swalTitle = `PROPOSE ${title.toUpperCase()}`;
				swalText  = "Are you sure to submit the project timeline for proposal";
				swalImg   = `${base_url}assets/modal/add.svg`;
			}
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

function savetimelineBuilder(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `project_timeline_builder/savetimelineBuilder`,
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
							if($("[name=timelineProposedBudget]").attr("timelineBudgetStatus") !=  0 ){
								swalTitle = `${getFormCode("PBT", dateCreated, insertedID)} submitted successfully!`;
							}else{
								swalTitle = `Project Timeline submitted for proposal successfully!`;
							}
						} else if (method == "save") {
							swalTitle = `Project Timeline saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PBT", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PBT", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PBT", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PBT", dateCreated, insertedID)} dropped successfully!`;
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


function triggerItemQty(){
	$("[name=quantity]").each(function(i, obj) {
		$("#"+this.id).val($("#"+this.id).attr("value"));
	}) 
}


function validateNoneForm(){
	var thisArray = ["itemID|[project=true]",
					 "itemID|[company=true]",
				     "designationID|[personnel=true]",
					 "description|[travel=true]"];
	var returnData = 0;
	thisArray.map(items=>{
		var itemsSplit 	= items.split("|");
		var optionName 	= itemsSplit[0];
		var optionAttr 	= itemsSplit[1];
	    $(`[name=${optionName}]${optionAttr}`).each(function(){
			var unifiedValue = this.value.toLowerCase();
			if(unifiedValue== "none" || unifiedValue== "-" || unifiedValue == "n/a"){
				returnData += 1;
			}
		});
	});
	return returnData < 4 ? true : false;
}


function displayImage(fileList = false, readOnly = false, path = "assets/upload-files/project-designs"){
	let html 		= ``;
	
	let link 		= true;
	if(EXIST_FILE_ARRAY || fileList){
		let existFile 		= EXIST_FILE_ARRAY || [] ;
		let parameterArray 	= fileList ? fileList.split("|") : [];
		
		let array		= [...existFile, ...parameterArray];
		array.map(list =>{
			let otherAttr = link ? `
				href="${base_url+path+"/"+list}" 
				target="_blank"` : `href="javascript:void(0)"`;
			html += `	<div class="col-md-2 col-sm-2 image-column">
							<div class="form-group">
								<div class="d-flex justify-content align-items-center" style="font-size: 12px; border: 1px solid black; border-radius: 5px; color:black;background: #d1ffe0; padding: 2px 10px;">
										${!readOnly ? `<span class="btnRemoveImage pr-2" style="cursor: pointer" filename="${list}"><i class="fas fa-close"></i></span>` : ""}
										<a class="filename"
											title="${list}"
											style="display: block;
											color:black !important;
											width: 90%;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;"
											${readOnly ? otherAttr : ""}>
											${list}
										</a>
								</div>
							</div>
						</div>`;
		});
		$("#timelineDesign").val("");
	}
	setTimeout(() => {
		$(".row-display-image").html(html);
	}, 800);
}


    // // ----- REMOVE IMAGE -----
    $(document).on("click", `.btnRemoveImage`, function() {
		let thisDivision 	= $(this).closest(".image-column");
		let filename 		= $(this).attr("filename");
		// FOR INPUT VALUE
		let fileDataArray 	= FILE_ARRAY.filter(data => data.name != filename);
		let tempFileData 	= [];
		fileDataArray.map(x =>{
			tempFileData.push(x);
		});
		FILE_ARRAY = tempFileData;

		// FOR EXIST VALUE
		let existFileDataArray 	= EXIST_FILE_ARRAY.filter(data => data == filename);
		let tempExistFileData 	= [];
			if(existFileDataArray){
				EXIST_FILE_ARRAY.filter(data => data != filename).map(file=>{
					tempExistFileData.push(file);
				});
			}
			EXIST_FILE_ARRAY = tempExistFileData;
		// REMOVING DIVISION
        thisDivision.fadeOut(500, function(){
			thisDivision.remove();
		});

    })
    // ----- END REMOVE IMAGE -----


	    // ----- SELECT IMAGE -----
		$(document).on("change", "[id=timelineDesign]", function(e) {
			e.preventDefault();
			let filesArray = [];
			let data 	   = [];
			let thisArray  = this.files;

			for (let index = 0; index < thisArray.length; index++) {
				let filesize 		= this.files[index].size/1024/1024; // Size in MB
				let filename 		= this.files[index].name;
				let filenameSplit 	= filename.split(".");
				let filetype		= filenameSplit.pop();
				if (filesize > 10) {
					showNotification("danger", `${filename} <br> File size must be less than or equal to 10mb`);
				} else if (filetype	== "image" || filetype	== "jpeg" || filetype	== "jpg" || filetype	== "png" || filetype	== "docx") {
					FILE_ARRAY.push(this.files[index]);
				} else {
					showNotification("danger", `${filename} <br>  Invalid file type`);
				}	
			}

			FILE_ARRAY.map(files=>{
				let filename = files.name;
				filesArray.push(filename);
			});
			console.log(FILE_ARRAY);
			displayImage(filesArray.join("|"), false);
		})
		// ----- END SELECT IMAGE -----

