$(document).ready(function() {
    
    // ----- GLOBAL VARIABLE -----
    const allowedUpdate = isUpdateAllowed(91);

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
    // ----- END GLOBAL VARIABLE -----


    // ----- VIEW DOCUMENT -----
    const getTimelineContent = async (timelineBuilderID) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "manage_project_budget/getTimelineContent",
            data:     { timelineBuilderID },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
            }
        })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false) {
        const loadData = (id) => {
            const data = getTimelineContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            timelineStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            if (timelineStatus == 0 || timelineStatus == 4) {
                                isAllowed = false;
                            }
                        } else if (employeeID == sessionID) {
                            if (timelineStatus == 0) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (employeeID == sessionID) {
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
                } else {
                    showNotification("danger", "There was an error fetching the data.");
                    pageContent();
                    updateURL();
                }
            });
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
                    const isAllowed = isCreateAllowed(91);
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
                window.history.pushState("", "", `${base_url}pms/manage_project_budget?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}pms/manage_project_budget?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/manage_project_budget`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // ----- TIMELINE DATA -----
    const getTimelineData = () => {
        const data = getTableData(
            `pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
            LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
            LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.employeeID = helt.employeeID
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID`,

            `ptbt.timelineBuilderID,
            ptbt.createdAt,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            pplt.projectListName AS projectName,
            ptbt.projectCode AS projectCode,
            pct.categoryName AS projectCategory,    
            ptbt.timelineProposedBudget AS proposedBudget,
            ptbt.timelineAllocatedBudget AS allocatedBudget,
            hdt.departmentName,
            hdt2.designationName,
            ptbt.timelineProjectManager AS timelineProjectManager,
            ptbt.timelineTeamMember AS timelineTeamMember,
            ptbt.timelineTeamLeader AS timelineTeamLeader,
            ptbt.timelineDesign AS timelineDesign,
            ptbt.timelineBudgetStatus AS budgetStatus`,

            `ptbt.timelineBuilderStatus <> 0 AND ptbt.timelineBuilderStatus <> 4`,

            `FIELD(ptbt.timelineBuilderStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(ptbt.submittedAt, ptbt.createdAt)`
            );
        return data;
    }
    // ----- END TIMELINE DATA -----

    const employeeList = getTableData("hris_employee_list_tbl LEFT JOIN hris_designation_tbl USING (designationID)", 
										`employeeLastname, employeeFirstname, employeeMiddlename, employeeID, employeeRanking, hris_designation_tbl.designationName AS designationName, employeeRankingCredit,
											CASE employeeLastname WHEN "" THEN employeeFirstname
											ELSE CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) 
											END  "employeeFullname" `,
										`employeeStatus != 0 AND employeeStatus != 3 AND employeeStatus != 4 AND employeeStatus != 5 AND employeeStatus != 6`);

    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableTimeline")) {
			$("#tableTimeline").DataTable().destroy();
		}

        if ($.fn.DataTable.isDataTable("#projectTimeline")) {
			$("#projectTimeline").DataTable().destroy();
		}

        var table = $("#tableTimeline")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 100 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 350 }, // Project Code & Description Combo
                    { targets: 3, width: 350 }, // Project Name
					{ targets: 4, width: 150 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 150 },
				],
			});

        var table = $("#projectTimeline")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
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
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 500 }
				],
			});
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(91)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- TIMELINE CONTENT ------
    function timelineContent() {
        const timelineData = getTimelineData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimeline">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Project Code</th>
                        <th>Project Name</th>
                        <th>Project Category</th>
                        <th>Proposed Budget</th>
                        <th>Allocated Budget</th>
                        <th>Budget Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                timelineBuilderID = 0,
                createdAt,
                preparedBy,
                projectName       = "",
                projectCode       = "",
                projectCategory   = "",
                proposedBudget,
                allocatedBudget,
                budgetStatus = 0
            } = timeline;

            const statusStyle = budgetStatus == 0 ? 
                `<span class="badge badge-outline-info w-100">For Proposal</span>` :
                `<span class="badge badge-outline-success w-100" style="width: 100% !important">Allocated</span>`;

            html += `
            <tr class="btnView" id="${encryptString(timelineBuilderID)}">
                <td>${getFormCode("PTB", createdAt, timelineBuilderID)}</td>
                <td>${preparedBy}</td>
                <td>
                    <div>${projectCode}</div>
                    <small style="color:#848482;"></small>
                </td>
                <td>${projectName}</td>
                <td>${projectCategory}</td>
                <td class="text-right">${proposedBudget && formatAmount(proposedBudget, true) || "-"}</td>
                <td class="text-right">${allocatedBudget && formatAmount(allocatedBudget, true) || "-"}</td>
                <td>${statusStyle}</td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END TIMELINE CONTENT ------


    // ----- GET PROJECT TASK DISPLAY -----
    function getProjectTaskDisplay(phases = []) {
        let html = "";
        if (phases && phases.length > 0) {
            phases.map(phase => {

                const {
                    phaseName  = "",
                    milestones = [],
                    tasks      = []
                } = phase;

                let milestoneList = `<ol class="pl-3">`;
                milestones.map(milestone => {
                    const { milestoneName = "" } = milestone;
                    milestoneList += `<li>${milestoneName}</li>`;
                })
                milestoneList += `</ol>`;

                let tasksList = "";  
                tasks.map(task => {
                    const {
                        taskName      = "",
                        allottedHours = "",
                        taskRemarks   = "",
                        taskStartDate,
                        taskEndDate
                    } = task;

                    tasksList += `
                    <tr>
                        <td>${taskName}</td>
                        <td class="text-center">${formatAmount(allottedHours)}</td>
                        <td class="text-center">${moment(taskStartDate).format("MMMM DD, YYYY")} - ${moment(taskEndDate).format("MMMM DD, YYYY")}</td>
                        <td>${taskRemarks || "-"}</td>
                    </tr>`;
                })

                html += `
                <tr>
                    <td>${phaseName}</td>
                    <td>${milestoneList}</td>
                    <td>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width:150px;">Task Name</th>
                                    <th style="width:100px;">Alotted Hours</th>
                                    <th style="width:300px;">Date</th>
                                    <th style="width:150px;">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tasksList}
                            </tbody>
                        </table>
                    </td>
                </tr>`
            })
        }
        return html;
    }
    // ----- END GET PROJECT TASK DISPLAY -----


        // ----- GET EMPLOYEE LIST -----
	function getEmployeeList(id = null , typeEmployee = "NonOrganic"){
		// TYPE EMPLOYEE ;
			// PROJECT MANAGER 			= PM; 
			// TEAM LEADER 				= TL
			// TEAM MEMBERS Oranic 		= ORG
			// TEAM MEMBERS Non Organic	= NORG
		let html = ``, members = [];
		// let projectManager 	= $("[name=timelineProjectManager]").val(); 
		// let teamLeader 		= $("[name=timelineTeamLeader]").val();

		switch(typeEmployee) {
			case "PM":	html += `<option disabled ${!id?"selected":''}>Please select a project manager</option>`;
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
			case "TL": html += `<option disabled ${!id?"selected":''}>Please select a team leader</option>`;
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
			// html += `<option disabled ${!id?"selected":''}>Please select a team </option>`;
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

    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        $("#page_content").html(preloader);
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            timelineBuilderID,
            budgetStatus,
            createdAt,
            submittedAt,
            approversID,
            approversDate,
            approversStatus,
            timelineBuilderStatus,
            timelineBuilderRemarks,
            preparedBy,
            departmentName,
            designationName,
            timelineDescription,
            projectCode,
            projectName,
            projectCategory,
            clientName,
            clientAddress,
            timelineDate,
            timelinePriority,
            timelineIssued,
            projectManager,
            teamLeader,
            teamMember,
            proposedBudget,
            allocatedBudget,
            phases = []
        } = data && data[0];

        $("#btnBack").attr("status", budgetStatus);

        const disabled = budgetStatus == 1 ? "disabled" : "";
        const budgetStatusDisplay = budgetStatus == 1 ? `
        <span class="badge badge-outline-success w-100" style="width: 100% !important">Allocated</span>` : `
        <span class="badge badge-outline-info w-100">For Proposal</span>`;
        const buttonDisplay = !disabled ? `
        <button class="btn btn-submit px-5 p-2" 
            id="btnSubmit"
            timelineBuilderID="${timelineBuilderID}">
            <i class="fas fa-paper-plane"></i> Submit
        </button>
        <button class="btn btn-cancel px-5 p-2" 
            id="btnCancel"
            status="${budgetStatus}">
            <i class="fas fa-ban"></i> Cancel
        </button>` : "";
        let tableData = getTimelineData().filter(timeline=> timeline.timelineBuilderID == timelineBuilderID);
        let {
            timelineProjectManager  =   "",
            timelineTeamLeader      =   "",
            timelineTeamMember      =   "",
            timelineDesign          =   ""

        } = tableData[0];
        let html = `
        <div class="">
            <div class="row px-2">
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${getFormCode("PTB", createdAt, timelineBuilderID)}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Budget Status</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${budgetStatusDisplay}
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
                                        ${createdAt}
                                    </h6>      
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                            <div class="card">
                                <div class="body">
                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                    <h6 class="mt-0 font-weight-bold">
                                        ${submittedAt || "---"}
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
                                ${timelineBuilderRemarks || "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Prepared By</label>
                        <input type="text" class="form-control" disabled value="${preparedBy}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" class="form-control" disabled value="${departmentName}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Position</label>
                        <input type="text" class="form-control" disabled value="${designationName}">
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea rows="4" 
                            class="form-control validate"
                            data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
                            minlength="0"
                            maxlength="250"
                            style="resize: none" 
                            name="remarks" 
                            id="remarks"
                            disabled>${timelineDescription}</textarea>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Code</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="${projectCode}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="${projectName}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Category</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="${projectCategory}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Client Name</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="${clientName}">
                    </div>
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Client Address</label>
                        <input type="text" class="form-control" disabled value="${clientAddress}">
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Project Manager ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
                            name="timelineProjectManager"
                            id="timelineProjectManager"
                            style="width: 100%"
                            required disabled>
                            ${getEmployeeList(timelineProjectManager, "PM")}
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-timelineProjectManager"></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Team Leader ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
                            name="timelineTeamLeader"
                            id="timelineTeamLeader"
                            style="width: 100%"
                            required disabled}
                            ${getEmployeeList(timelineTeamLeader, "TL")}
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-timelineTeamLeader"></div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Start Date & End Date ${!disabled ? "<code>*</code>" : ""}</label>
                        <input type="text" class="form-control" disabled name="timelineDate" value="${timelineDate}">
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Design </label>
                        ${ timelineDesign ? `<div class="w-100 ripple"> <a href="${base_url+"assets/upload-files/project-designs/"+timelineDesign}" class="ripple" target="_blank">${timelineDesign}</a></div>` 
                            : `<input type="text" class="form-control" disabled name="timelineDate" value="-">` }
                    </div>
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Team Members (Organic)</label>
                                <select class="form-control validate select2"  multiple="multiple"
                                    name="timelineTeamMember"
                                    id="timelineTeamMemberOrganic"
                                    style="width: 100%"
                                    required disabled>
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
                                    style="width: 100%" disabled>
                                    ${getEmployeeList(timelineTeamMember)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-timelineTeamMemberNonOrganic"></div>
                            </div>
                        </div>
                    </div>
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
                    <div class="w-100">
                        <table class="table table-striped" id="projectTimeline" style="font-size: 90%;">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Phase</th>
                                    <th>Milestone</th>
                                    <th>Task/s</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${getProjectTaskDisplay(phases)}
                            </tbody>
                        </table>
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


            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Proposed Budget</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control text-right amount" 
                                min="0.1" 
                                max="999999" 
                                minlength="1" 
                                maxlength="99" 
                                name="proposedBudget" 
                                id="proposedBudget" 
                                value="${proposedBudget}"
                                disabled>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-proposedBudget"></div> 
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Allocated Budget ${!disabled ? "<code>*</code>" : ""}</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control amount text-right" 
                                min="0.01" 
                                max="9999999999" 
                                minlength="1" 
                                maxlength="99" 
                                name="allocatedBudget" 
                                id="allocatedBudget" 
                                value="${allocatedBudget}"
                                ${disabled}>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-allocatedBudget"></div> 
                    </div>
                </div>
                
            </div>

            <div class="col-md-12 text-right mt-3 mb-3">
                ${buttonDisplay}
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            initAll();

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

        }, 500);
    }
    // ----- END FORM CONTENT -----
    

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        if ($(`#page_content .loader`).text().length == 0) {
            $("#page_content").html(preloader);
        }
        if (!isForm) {
            preventRefresh(false);
            headerButton(true, "");
            timelineContent();
            updateURL();
        } else {
            headerButton(false, "");
            formContent(data, readOnly);
        }
    }
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const timelineBuilderID = decryptString($(this).attr("id"));
        viewDocument(timelineBuilderID);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const validateInputs    = validateForm("page_content");
        if (validateInputs) {
            saveProjectBudget("submit", timelineBuilderID, pageContent);
        }

        // formButtonHTML(this);
		// const id = decryptString($(this).attr("timelineBuilderID"));

        // setTimeout(() => {
        //     validateInputs().then(res => {
        //         if (res) {
        //             saveProjectBoard("submit", pageContent);
        //         }
        //         formButtonHTML(this, false);
        //     });
        // }, 10);
    });


    // ----- CLICK BUTTON CANCEL OR BACK -----
    $(document).on("click", "#btnCancel, #btnBack", function() {
        const status = $(this).attr("status");
        if (status == 0) {
            saveProjectBudget("cancel", null, pageContent);
        } else {
            pageContent();
        }
    })
    // ----- END CLICK BUTTON CANCEL OR BACK -----


    // ----- CONFIRMATION -----
    const getConfirmation = method => {
        const title = "Project Budget";
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
            case "uploadcontract":
                swalTitle = `UPLOAD CONTRACT`;
                swalText  = "Are you sure to upload this contract?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()}`;
                swalText  = "Are you sure to discard this process?";
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
    // ----- END CONFIRMATION -----


    // ----- SAVE PROJECT BUDGET -----
    function saveProjectBudget(method = "submit", id = null, callback = null) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    callback && callback();
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    });
                } else {

                    const data = {
                        timelineBuilderID: id,
                        allocatedBudget:   getNonFormattedAmount($(`[name="allocatedBudget"]`).val()),
                        proposedBudget:   getNonFormattedAmount($(`[name="proposedBudget"]`).val())
                    };

                    $.ajax({
                        method:      "POST",
                        url:         `manage_project_budget/saveProjectBudget`,
                        data,
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
                                swalTitle = `Project Budget submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} dropped successfully!`;
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    callback && callback();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
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
                }
            } else {
                if (res.dismiss == "cancel" && method != "submit") {
                    if (method != "deny") {
                        if (method != "cancelform") {
                            // callback && callback();
                        }
                    } else {
                        
                    }
                } else if (res.isDismissed) {
                    if (method == "deny") {
                        
                    }
                }
            }
        });
    }
    // ----- END SAVE PROJECT BUDGET -----

})