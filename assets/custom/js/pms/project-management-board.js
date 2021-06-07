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
                    projectManagerID:       1,
                    teamLeaderID:           2,
                    teamMembersID:          "3|4|5|6",
                    phases: [
                        {
                            phaseDescription: "Phase Name 1",
                            phaseCode:        "sample code",
                            milestones: [
                                {
                                    milestoneName: "User Stories",
                                },
                                {
                                    milestoneName: "Development",
                                },
                                {
                                    milestoneName: "Bug Fixing",
                                },
                                {
                                    milestoneName: "Deployment",
                                }
                            ],
                            tasks: [
                                {
                                    taskName: "Bank Masterfile",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Load Masterfile",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Menu Item",
                                    manHours: 25,
                                },
                            ]
                        },
                        {
                            phaseDescription: "Phase Name 2",
                            phaseCode:        "sample code 2",
                            milestones: [
                                {
                                    milestoneName: "User Stories",
                                },
                                {
                                    milestoneName: "Development",
                                },
                                {
                                    milestoneName: "Bug Fixing",
                                },
                                {
                                    milestoneName: "Deployment",
                                }
                            ],
                            tasks: [
                                {
                                    taskName: "Task Name 1",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Change Scheudlee",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Purchase Request",
                                    manHours: 25,
                                },
                            ]
                        },
                        {
                            phaseDescription: "Phase Name 3",
                            phaseCode:        "sample code 3",
                            milestones: [
                                {
                                    milestoneName: "User Stories",
                                },
                                {
                                    milestoneName: "Development",
                                },
                                {
                                    milestoneName: "Bug Fixing",
                                },
                                {
                                    milestoneName: "Deployment",
                                }
                            ],
                            tasks: [
                                {
                                    taskName: "Purchase Order",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Service Requisition",
                                    manHours: 25,
                                },
                                {
                                    taskName: "Service Completion",
                                    manHours: 25,
                                },
                            ]
                        },
                    ],
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
            window.history.pushState("", "", `${base_url}pms/project_management_board?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}pms/project_management_board?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}pms/project_management_board?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/project_management_board`);
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


    // ----- REUSABLE VARIABLE/FUNCTIONS -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}
    // ----- END REUSABLE VARIABLE/FUNCTIONS -----
    

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

        const projectTimelineLength = $(`table.projectTimeline`).length;
        for(var i=0; i<projectTimelineLength; i++) {

            if ($.fn.DataTable.isDataTable(`#projectTimeline${i}`)) {
                $(`#projectTimeline${i}`).DataTable().destroy();
            }

            var table = $(`#projectTimeline${i}`)
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
                        { targets: 0, width: 500 },
                        { targets: 1, width: 100 },
                        { targets: 2, width: 400 },
                    ],
                });
        }
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
				id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
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
                        <th>Status</th>
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
                <td>${getStatusStyle(budgetStatus)}</td>
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


    // ----- CLICK TASK NAME OR CARET -----
    $(document).on("click", ".btnCaret", function() {
        const $parent  = $(this).closest("tr");
        const taskName = $(this).attr("taskName");
        const phase    = $(this).attr("phase");
        const display  = $(this).attr("display") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.taskContent[taskName="${taskName}"][phase="${phase}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.taskContent[taskName="${taskName}"][phase="${phase}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[caret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
    })
    // ----- END CLICK TASK NAME OR CARET -----


    // ----- DISPLAY ASSIGNED EMPLOYEE -----
    const displayAssignedEmployee = (employees = [], taskName = null) => {
        let html = "";
        if (employees.length > 0 && taskName) {
            employees.map((employee, index) => {
                const { id, fullname, image } = employee;
                if (index <= 5) {
                    html += `
                    <img src="${image}" 
                        class="rounded rounded-circle" 
                        style="width: 50px; height: 50px"
                        title="${fullname}">`;
                }
                if (index == 6) {
                    html += `
                    <span class="font-weight-bolder"
                        style="position: absolute;
                            top: 0;
                            margin-left: 7px;
                            margin-top: 25px;
                            font-size: 1.5rem;">+${members.length - 6}<span>`;
                }
            })
        } else {
            html += `<span>No data available yet.</span>`;
        }
        $(`.assignedMembers[taskName="${taskName}"]`).html(html);
    }
    // ----- END DISPLAY ASSIGNED EMPLOYEE -----


    // ----- SELECT ASSIGNED EMPLOYEE -----
    const getAssignedEmployee = (taskName = null) => {
        let employees = [];
        if (taskName) {
            $(`[name="assignEmployee"][taskName="${taskName}"]`).each(function() {
                const employeeID = $(this).val();
                if (employeeID && employeeID.length > 0) {
                    employeeID.map(tempID => {
                        const fullname = $(`option:selected[value="${tempID}"]`, this).attr("fullname");
                        const image    = $(`option:selected[value="${tempID}"]`, this).attr("image");
                        let temp = { id: tempID, fullname, image };
                        const id = employees.map(emp => emp.id);
                        if (!id.includes(tempID)) {
                            employees.push(temp);
                        }
                    })
                }
            })
        }
        return employees;
    }

    $(document).on("change", `[name="assignEmployee"]`, function() {
        const taskName  = $(this).attr("taskName");
        const employees = getAssignedEmployee(taskName);
        displayAssignedEmployee(employees, taskName);
    })
    // ----- END SELECT ASSIGNED EMPLOYEE -----


    // ----- SELECT2 MULTIPLE PLACEHOLDER -----
	function multipleSelect2Placeholder() {
		$(`.select2[name="assignEmployee"]`).select2({
			placeholder: "Select Team Members",
			theme:       "bootstrap",
			allowClear:  true,
			multiple:    true,
		});
		$(".select2-search__field").css("width", "100%");
	}
	// ----- END SELECT2 MULTIPLE PLACEHOLDER -----


    // ----- DISPLAY PHASE -----
    function displayPhase(teamMembers = {}, phase = {}, index = 0) {
        const {
            phaseDescription,
            phaseCode,
            milestones = [],
            tasks      = []
        } = phase;

        const getTaskContent = (taskName = null, manHours = 0) => {
            let taskNameContent     = ""; 
            let taskManHoursContent = ""; 
            let taskAssigneeContent = "";

            milestones.map(milestone => {
                const { milestoneName } = milestone;
    
                taskNameContent += `
                <div class="form-group my-1">
                    <input class="form-control"
                        value="&emsp;&emsp;${milestoneName}"
                        disabled>
                </div>`;
    
                taskManHoursContent += `
                <div class="form-group my-1">
                    <input class="form-control input-hours text-center"
                        value="0"
                        name="manHours"
                        min="0.01"
                        max="${manHours}"
                        minlength="1"
                        maxlength="10"
                        taskName="${taskName}"
                        phase="${phaseCode}"
                        required>
                    <div class="invalid-feedback"></div>
                </div>`;
    
                const teamMemberOptions = teamMembers.map(member => {
                    const { id, fullname, image } = member;
                    
                    return `
                    <option 
                        value    = "${id}"
                        fullname = "${fullname}"
                        image    = "${image}">${fullname}</option>`;
                }).join("");

                taskAssigneeContent += `
                <div class="form-group my-1">
                    <select class="form-control validate select2"
                        name="assignEmployee"
                        multiple="multiple"
                        phase="${phaseCode}"
                        taskName="${taskName}"
                        required>
                        <option disabled>Select Employee</option>
                        ${teamMemberOptions}
                    </select>
                    <div class="invalid-feedback"></div>
                </div>`;
            })

            return [taskNameContent, taskManHoursContent, taskAssigneeContent];
        }

        let taskHTML = "";
        tasks.map(task => {
            const { taskName, manHours } = task;

            const taskContent = getTaskContent(taskName, manHours);

            taskHTML += `
            <tr>   
                <td style="position: relative;">    
                    <div class="d-flex align-items-center justify-content-between btnCaret" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}"
                        display="false"
                        style="cursor: pointer;
                            min-height: 70px;
                            height: auto;
                            max-height: 70px;
                            width: 100%;
                            padding: 1rem;
                            position: absolute;
                            top: 0">
                        <span>${taskName}</span>
                        &nbsp;&nbsp;<i class="fad fa-caret-down mr-3" caret="true"></i>
                    </div>
                    <div class="d-none taskContent" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}"
                        style    = "margin-top: 70px;">
                        ${taskContent[0]}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}"
                        style="
                            min-height: 70px;
                            height: auto;
                            max-height: 70px;
                            padding: 1rem;
                            position: absolute;
                            top: 0">
                        <input type="text" 
                            class="form-control input-hours text-center" 
                            value="${manHours}" 
                            basis    = "true"
                            phase    = "${phaseCode}"
                            taskName = "${taskName}"
                            disabled>
                    </div>
                    <div class="d-none taskContent" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}"
                        style    = "margin-top: 70px;">
                        ${taskContent[1]}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-start" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}"
                        style="
                            min-height: 70px;
                            height: auto;
                            max-height: 70px;
                            padding: 1rem;
                            top: 0">
                        <div class="assignedMembers" 
                            taskName="${taskName}" 
                            phase="${phaseCode}"
                            style="position: absolute;
                                top: 0;
                                margin-top: 10px;">
                            <span>No data available yet.</span>
                        </div>
                    </div>
                    
                    <div class="d-none taskContent" 
                        phase    = "${phaseCode}"
                        taskName = "${taskName}">
                        ${taskContent[2]}
                    </div>
                </td>
            </tr>`;
        })

        let html = `
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                        ${phaseDescription}
                    </div>
                    <small><b>${phaseCode}</b></small>
                </div>

                <div class="w-100">
                    <table class="table projectTimeline" id="projectTimeline${index}">
                        <thead>
                            <tr class="bg-dark">
                                <th class="text-white">Tasks</th>
                                <th class="text-white">Man Hours</th>
                                <th class="text-white">Assignee</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${taskHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END DISPLAY PHASE -----


    // ----- UPDATE TABLE -----
    function updateTables() {
        $(`[name="manHours"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("id", `manHours${index}`);
            $parent.find(".invalid-feedback").attr("id", `invalid-manHours${index}`);
        })
    }
    // ----- END UPDATE TABLE -----


    // DITO NA AKOOOOOOOO
    // ----- VALIDATE MAN HOURS -----
    function validateManHours(phase = "", taskName = "", elementID = null) {
        if (phase && taskName) {
            const $parent = $(elementID).closest(".form-group");
            const basisManHours = getNonFormattedAmount($(`[phase="${phase}"][taskName="${taskName}"][basis="true"]`).val());

            let totalManHours = 0;
            $(`[name="manHours"][phase="${phase}"][taskName="${taskName}"]`).each(function() {
                const manHours = getNonFormattedAmount($(this).val()) || 0;
                totalManHours += manHours;
            })

            console.log(parent, elementID, totalManHours, basisManHours);
            if (totalManHours > basisManHours) {
                // $(`[name="manHours"][phase="${phase}"][taskName="${taskName}"]`).each(function() {
                //     const $parent = $(this).closest(".form-group");
                //     $(this).removeClass("is-valid").addClass("is-invalid");
                //     $parent.find(".invalid-feedback").text("Invalid man hours value!");
                // })
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                $parent.find(".invalid-feedback").text("Invalid man hours value!");
            } else {
                // $(`[name="manHours"][phase="${phase}"][taskName="${taskName}"]`).each(function() {
                //     const $parent = $(this).closest(".form-group");
                //     $(this).removeClass("is-invalid").removeClass("is-valid");
                //     $parent.find(".invalid-feedback").text("");
                // })
                $(elementID).removeClass("is-valid").removeClass("is-invalid");
                $parent.find(".invalid-feedback").text("");
            }
        }
    }
    // ----- END VALIDATE MAN HOURS -----


    // ----- KEYUP MAN HOURS -----
    $(document).on("keyup", `[name="manHours"]`, function() {
        const phase     = $(this).attr("phase");
        const taskName  = $(this).attr("taskName");
        const elementID = "#"+$(this).attr("id");

        validateManHours(phase, taskName, elementID);
    })
    // ----- END KEYUP MAN HOURS -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        console.log(data);
        $("#page_content").html(preloader);

        const {
            projectName,
            projectCreatedAt,
            teamMembersID,
            phases = []
        } = data && data[0];

        let membersID = teamMembersID ? teamMembersID.replaceAll("|", ",") : "0";
        const teamMembers = getTableData(
            `hris_employee_list_tbl`,
            `employeeID, employeeFirstname, employeeLastname, employeeProfile`,
            `FIND_IN_SET(employeeID, "${membersID}")`
        ).map(member => {
            const { 
                employeeID, 
                employeeFirstname, 
                employeeLastname, 
                employeeProfile 
            } = member;
            return {
                id:       employeeID,
                fullname: `${employeeFirstname} ${employeeLastname}`,
                image:    `${base_url}/assets/upload-files/profile-images/${employeeProfile}`
            }
        });

        let phaseHTML = "";
        phases.map((phase, index) => {
            phaseHTML += displayPhase(teamMembers, phase, index);
        })

        let html = `
        <div class="">
            <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">
                <span>Finance Management System</span>
                <span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">PRJ-21-00001</span>
            </div>
            ${phaseHTML}
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            updateTables();
            initAll();
            multipleSelect2Placeholder();
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