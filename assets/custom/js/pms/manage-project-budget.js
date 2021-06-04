$(document).ready(function() {

    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false) {
		const loadData = (id) => {
			// const tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID=" + id);

            const tableData = [
                {
                    timelineID: 1,
                    employeeID: 1,
                    projectID: 1,
                    projectCreatedAt: moment(new Date).add(-31, 'days').format("MMMM DD, YYYY"),
                    projectName: "Project Name",
                    projectCategory: "Project Category",
                    clientID: 1,
                    clientCreatedAt: moment(new Date).add(-31, 'days').format("MMMM DD, YYYY"),
                    clientAddress: "1701 Antel Bldg, Pasig City",
                    startDate: moment(new Date).format("MMMM DD, YYYY"),
                    endDate: moment(new Date).add(31, 'days').format("MMMM DD, YYYYY"),
                    timelineDesign: "",
                    timelineProposedBudget: 150000,
                    timelineBudgetStatus: 0,
                    timelineReason: "Sample Reason",
                    timelineRemarks: "",
                    approversID: "1|2|3",
                    approversDate: "2021-01-01 10:11:11|2021-01-01 10:11:11|2021-01-01 10:11:11",
                    approversStatus: 2,
                    createdBy: 1,
                    submittedAt: moment(new Date).format("MMMM DD, YYYY"),
                    createdAt:  moment(new Date).add(-5, 'days').format("MMMM DD, YYYY"),
                    tasks: [
                        {
                            phase: "Phase 1",
                            milestone: [
                                {
                                    milestoneName: "Milestone 1",
                                    taskName: "Task name",
                                    allotedHours: 150,
                                    startDate: moment(new Date).format("MMMM DD, YYYY"),
                                    endDate: moment(new Date).add(31, 'days').format("MMMM DD, YYYYY"),
                                    milestoneStatus: 0 
                                }
                            ]
                        }
                    ]
                }
            ]

			if (tableData.length > 0) {
				let {
					employeeID,
					changeScheduleStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (changeScheduleStatus == 0 || changeScheduleStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (changeScheduleStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly);
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
				id && isFinite(id) && loadData(id);
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
						id && isFinite(id) && loadData(id);
				} else {
					const isAllowed = isCreateAllowed(46);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false) { 
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}pms/manage_project_budget?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id) {
				window.history.pushState("", "", `${base_url}pms/manage_project_budget?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/manage_project_budget?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/manage_project_budget`);
		}
	}
	// ----- END VIEW DOCUMENT -----


	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
            html = ``;
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		uniqueData = [];

		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
			"hris_change_schedule_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_change_schedule_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_change_schedule_tbl.createdAt AS dateCreated",
			`hris_change_schedule_tbl.employeeID = ${sessionID}`,
			`FIELD(changeScheduleStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_change_schedule_tbl.submittedAt, hris_change_schedule_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Description</th>
                    <th>Current Approver</th>
					<th>Date Created</th>
					<th>Date Submitted</th>
					<th>Date Approved</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			let {
				fullname,
				changeScheduleID,
				changeScheduleDate,
				approversID,
				approversDate,
				changeScheduleReason,
				changeScheduleStatus,
				changeScheduleRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = changeScheduleRemarks ? changeScheduleRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = changeScheduleStatus == 2 || changeScheduleStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:                 changeScheduleID,
				changeScheduleDate: moment(changeScheduleDate).format("MMMM DD, YYYY"),
			};
			(changeScheduleStatus == 1 || changeScheduleStatus == 2) && uniqueData.push(unique);

			let btnClass = changeScheduleStatus != 0 ? "btnView" : "btnEdit";

			let button =
				changeScheduleStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(changeScheduleID)}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(changeScheduleID)}" 
                code="${getFormCode("SCH", createdAt, changeScheduleID)}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr class="${btnClass}" id="${encryptString(changeScheduleID)}">
                <td>${getFormCode("SCH", createdAt, changeScheduleID)}</td>
                <td>${fullname}</td>
				<td>${changeScheduleReason || "-"}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, changeScheduleStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(changeScheduleStatus)}
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


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false) {
		$("#page_content").html(preloader);
		if (!isForm) {
			preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forApprov alTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForApprovalParent">
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="table-responsive" id="tableMyFormsParent">
                    </div>
                </div>
            </div>`;
			$("#page_content").html(html);

			headerButton(true, "");
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "");
			formContent(data, readOnly);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----

})