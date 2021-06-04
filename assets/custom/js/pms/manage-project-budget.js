$(document).ready(function() {

    // ----- VIEW DOCUMENT -----
    function viewDocument(view_id = false, readOnly = false) {
        const loadData = (id) => {
            // const tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID=" + id);

            const tableData = [
                {
                    timelineID:             1,
                    employeeID:             1,
                    projectID:              1,
                    projectCreatedAt:       moment(new Date).add(-31, 'days').format("MMMM DD, YYYY"),
                    projectName:            "Project Name",
                    projectCategory:        "Project Category",
                    clientID:               1,
                    clientCreatedAt:        moment(new Date).add(-31, 'days').format("MMMM DD, YYYY"),
                    clientAddress:          "1701 Antel Bldg, Pasig City",
                    startDate:              moment(new Date).format("MMMM DD, YYYY"),
                    endDate:                moment(new Date).add(31, 'days').format("MMMM DD, YYYYY"),
                    timelineDesign:         "",
                    timelineProposedBudget: 150000,
                    timelineBudgetStatus:   0,
                    timelineReason:         "Sample Reason",
                    timelineRemarks:        "",
                    timelineStatus:         1,
                    approversID:            "1|2|3",
                    approversDate:          "2021-01-01 10:11:11|2021-01-01 10:11:11|2021-01-01 10:11:11",
                    approversStatus:        2,
                    createdBy:              1,
                    submittedAt:            moment(new Date).format("MMMM DD, YYYY"),
                    createdAt:              moment(new Date).add(-5, 'days').format("MMMM DD, YYYY"),
                    tasks: [
                        {
                            phase: "Phase 1",
                            milestone: [
                                {
                                    milestoneName:   "Milestone 1",
                                    taskName:        "Task name",
                                    allotedHours:    150,
                                    startDate:       moment(new Date).format("MMMM DD, YYYY"),
                                    endDate:         moment(new Date).add(31, 'days').format("MMMM DD, YYYYY"),
                                    milestoneStatus: 0 
                                }
                            ]
                        },
                        {
                            phase: "Phase 2",
                            milestone: [
                                {
                                    milestoneName:   "Milestone 2",
                                    taskName:        "Task name 2",
                                    allotedHours:    160,
                                    startDate:       moment(new Date).format("MMMM DD, YYYY"),
                                    endDate:         moment(new Date).add(31, 'days').format("MMMM DD, YYYYY"),
                                    milestoneStatus: 0 
                                }
                            ]
                        },
                    ]
                }
            ]

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


    // ----- TIMELINE DATA -----
    const timelineData = [
        {
            timelineID:      1,
            projectID:       1,
            projectName:     "ERP System",
            projectCode:     "PRJ-21-00001",
            projectCategory: "Sample Category",
            projectManager:  "Arjay Diangzon",
            departmentName:  "Admin Department",
            designationName: "IT Admin",
            budgetStatus:    0 // 0 - For Proposal, 1 - For Assessment
        },
        {
            timelineID:      2,
            projectID:       1,
            projectName:     "TACS",
            projectCode:     "PRJ-21-00001",
            projectCategory: "Sample Category 1",
            projectManager:  "Mark Nieto",
            departmentName:  "Finance",
            designationName: "Human Resource",
            budgetStatus:    0 // 0 - For Proposal, 1 - For Assessment
        },
        {
            timelineID:      3,
            projectID:       1,
            projectName:     "Point of Sale",
            projectCode:     "PRJ-21-00003",
            projectCategory: "Sample Category 2",
            projectManager:  "Wilson Parajas",
            departmentName:  "Operations",
            designationName: "Developer",
            budgetStatus:    0 // 0 - For Proposal, 1 - For Assessment
        },
    ];
    // ----- END TIMELINE DATA -----


    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableTimeline")) {
			$("#tableTimeline").DataTable().destroy();
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
					{ targets: 0, width: 250 },
					{ targets: 1, width: 250 },
					{ targets: 2, width: 250 },
					{ targets: 3, width: 250 },
					{ targets: 4, width: 180 },
				],
			});
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(60)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- TIMELINE CONTENT ------
    function timelineContent() {
        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimeline">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Category</th>
                        <th>Project Manager</th>
                        <th>Designation</th>
                        <th>Budget Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                timelineID      = 0,
                projectName     = "",
                projectCode     = "",
                projectCategory = "",
                projectManager  = "",
                departmentName  = "",
                designationName = "",
                budgetStatus    = 0
            } = timeline;

            const statusStyle = budgetStatus == 0 ? 
                `<span class="badge badge-outline-info w-100">For Proposal</span>` :
                `<span class="badge badge-outline-primary w-100">For Assessment</span>`;

            html += `
            <tr class="btnView" id="${encryptString(timelineID.toString())}">
                <td>
                    <div>${projectName}</div>
                    <small style="color:#848482;">${projectCode}</small>
                </td>
                <td>${projectCategory}</td>
                <td>${projectManager}</td>
                <td>
                    <div>${designationName}</div>
                    <small style="color:#848482;">${departmentName}</small>
                </td>
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


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        $("#page_content").html(preloader);

        let html = `
        <div class="card-body">
            <div class="row px-2">
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Control No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                            MPB-21-00001
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Status</small>
                            <h6 class="mt-0 font-weight-bold">
                                <span class="badge badge-outline-info w-100">For Approval</span>
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
                                        ---
                                    </h6>      
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                            <div class="card">
                                <div class="body">
                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                    <h6 class="mt-0 font-weight-bold">
                                        ---
                                    </h6>      
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                            <div class="card">
                                <div class="body">
                                    <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                    <h6 class="mt-0 font-weight-bold">
                                        ---
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
                                ---
                            </h6>      
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Code</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="HMS-21-00001">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="Hotel Management System">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Category</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="Software">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Client Name</label>
                        <input type="text" class="form-control" data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][@][_][ ]" disabled minlength="2" maxlength="150"  value="Hotel Mercante">
                    </div>
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Client Address</label>
                        <input type="text" class="form-control" disabled value="Bonifacio corner Plaridel Street, Barangay I, Vigan, Ilocos Sur">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Executive Name</label>
                        <input type="text" class="form-control" disabled value="Kay-Cee Allen Y. Tangalin">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" class="form-control" disabled value="Executives">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Designation</label>
                        <input type="text" class="form-control" disabled value="Chief Finance Officer">
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                    <label>Remarks</label>
                        <div class="remarks">
                            <textarea rows="4" style="resize: none" class="form-control" name="remarks" id="remarks"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Budget (Proposed)</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" class="form-control proposedBudget" min="0.1" max="999999" minlength="1" maxlength="20" name="proposedBudget" id="proposedBudget" value="0" project="true" style="text-align: right;" disabled>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-proposedBudget"></div> 
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="file">
                        <label>Budget</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" class="form-control approvedBudget" min="0.1" max="999999" minlength="1" maxlength="20" name="approvedBudget" id="approvedBudget" value="0" project="true" style="text-align: right;">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-approvedBudget"></div> 
                    </div>
                </div>
            </div>    
            <hr class="pb-1">
            <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Project Tasks</div>
            <table class="table table-striped" id="projectTimeline">
                <thead>
                    <tr style="white-space: nowrap">
                        <th class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxall" project="true">
                            </div>
                        </th>
                        <th>Phase & Milestone</th>
                        <th>Tasks Name</th>
                        <th>Total Hour/s Alotted</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody class="itemProjectTableBody" project="true">
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <select class="form-control validate select2"
                                    name="phaseMilestone"
                                    id="input_phaseMilestone"
                                    style="width: 100%"
                                    required
                                    disabled>
                                    <option selected disabled>Select Phase & Milestone</option>             
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <input type="text" class="form-control" disabled min="" max="" minlength="1" maxlength="250" name="milestoneName" id="milestoneName" value="">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <input type="text" class="form-control" disabled min="" max="" minlength="1" maxlength="250" name="milestoneName" id="milestoneName" value="">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <input type="date" class="form-control" disabled min="" max="" minlength="1" maxlength="250" name="milestoneName" id="milestoneName" value="">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <input type="date" class="form-control" disabled min="" max="" minlength="1" maxlength="250" name="milestoneName" id="milestoneName" value="">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mt-2">
                                <select class="form-control validate select2"
                                    name="project5"
                                    id="input_phaseMilestone"
                                    style="width: 100%"
                                    required
                                    disabled>
                                    <option selected disabled>To Do</option>             
                                </select>
                            </div>    
                        </td>
                        <td>
                            <div class="remarks">
                                <textarea rows="2" style="resize: none" class="form-control" name="remarks" id="remarks" disabled></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="w-100 d-flex justify-content-between align-items-center py-2 addReq">
            </div>
            <div class="col-md-12 text-right mt-3 mb-3 addReq">
                <button class="btn btn-submit px-5 p-2" id="btnSubmit"><i class="fas fa-paper-plane"></i>Approve
                </button>
                <button class="btn btn-cancel px-5 p-2" id="btnCancel"><i class="fas fa-ban"></i> 
                    Deny
                </button>
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 500);
    }
    // ----- END FORM CONTENT -----
    

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        $("#page_content").html(preloader);
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
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const timelineID = decryptString($(this).attr("id"));
        viewDocument(timelineID);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- CLICK BUTTON BACK -----
	$(document).on("click", "#btnBack", function () {
		pageContent();
	});
	// ----- END CLICK BUTTON BACK -----

})