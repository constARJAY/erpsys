$(document).ready(function() {

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
    const allowedUpdate = isUpdateAllowed(92);

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}

    const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    let holidayData = getTableData(
        "hris_holiday_tbl",
        `*`,
        `holidayStatus = 1`
    );

    let employeeSchedule = null;
    // ----- END REUSABLE VARIABLE/FUNCTIONS -----


    // ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let empID = id == "0" ? sessionID : id;
			let data = allEmployeeData.filter(employee => employee.employeeID == empID);
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


    // ----- DATATABLES -----
    function initDatatables() {
        if ($("#tableTimeline").text().trim().length > 0) {
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
					{ targets: 3, width: 150 },
					{ targets: 4, width: 80  },
				],
			});
        }

        if ($("#tableManHours").text().trim().length > 0) {
            if ($.fn.DataTable.isDataTable("#tableManHours")) {
                $("#tableManHours").DataTable().destroy();
            }

            var tableManHours = $("#tableManHours")
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
					{ targets: 0, width: 250 },
					{ targets: 1, width: 500 },
				],
			});

            $("#tableManHours").DataTable().columns.adjust().draw();
        }

        if ($(`table.projectTimeline`).text().trim().length > 0) {
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
                            { targets: 0, width: 480 },
                            { targets: 1, width: 90  },
                            { targets: 2, width: 400 },
                        ],
                    });
            }
        }
    }
    // ----- END DATATABLES -----


    // ----- VIEW DOCUMENT -----
    const getTimelineContent = async (timelineBuilderID) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "project_management_board/getTimelineContent",
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
                            timelineManagementBy,
                            timelineManagementStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (timelineManagementBy != sessionID) {
                            isReadOnly = true;
                            isAllowed = timelineManagementBy || timelineManagementBy == null ? true : false
                            if (timelineManagementStatus == 0 || timelineManagementStatus == 1) {
                                isReadOnly = false;
                            }
                        } else if (timelineManagementBy == sessionID) {
                            if (timelineManagementBy && timelineManagementStatus == 0 || timelineManagementStatus == 1) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (timelineManagementBy && timelineManagementBy == sessionID) {
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
                    const isAllowed = isCreateAllowed(92);
                    pageContent(isAllowed);
                }
            }
        }
        
    }
    // ----- END VIEW DOCUMENT -----


    // ----- UPDATE URL -----
    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}pms/project_management_board?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}pms/project_management_board?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}pms/project_management_board?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/project_management_board`);
        }
    }
    // ----- END UPDATE URL -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(92)) {
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

        /**
        ----- TIMELINE MANAGEMENT STATUS -----
        0. Draft
        1. For Assessment
        2. Assessed
        ----- END TIMELINE MANAGEMENT STATUS -----
        */

        const timelineData = getTableData(
            `pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
            LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
            LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.timelineProjectManager = helt.employeeID
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID`,
            `ptbt.timelineBuilderID,
            pplt.projectListName AS projectName,
            ptbt.projectCode AS projectCode,
            pct.categoryName AS projectCategory,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS projectManager,
            hdt.departmentName,
            hdt2.designationName,
            ptbt.timelineBudgetStatus AS budgetStatus,
            ptbt.timelineManagementStatus,
            ptbt.timelineBuilderStatus`,
            `(ptbt.timelineManagementStatus = 2 AND ptbt.timelineBuilderStatus = 2) OR
            (ptbt.timelineBuilderStatus = 2 AND ptbt.timelineManagementBy = ${sessionID}) OR 
            (ptbt.timelineBuilderStatus = 2 AND (ptbt.timelineManagementBy IS NULL OR ptbt.timelineManagementBy = ''))`);

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimeline">
                <thead>
                    <tr>
                        <th>Project Code</th>
                        <th>Project Name</th>
                        <th>Project Category</th>
                        <th>Project Manager</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                timelineBuilderID     = 0,
                projectName           = "",
                projectCode           = "",
                projectCategory       = "",
                projectManager        = "",
                departmentName        = "",
                designationName       = "",
                budgetStatus          = 0,
                timelineManagementStatus = 0
            } = timeline;

            const managementStatusDisplay = timelineManagementStatus == 0 ?
                `<span class="badge badge-warning w-100">Draft</span>` : (
                    timelineManagementStatus == 2 ? `<span class="badge badge-outline-success w-100" style="width: 100% !important">Assessed</span>` :
                    `<span class="badge badge-outline-info w-100">For Assessment</span>`
                );

            html += `
            <tr class="btnView" id="${encryptString(timelineBuilderID)}">
                <td>
                    <div>${projectCode}</div>
                    <!-- <small style="color:#848482;">put description here</small> -->
                </td>
                <td>${projectName}</td>
                <td>${projectCategory}</td>
                <td>${projectManager}</td>
                <td>${managementStatusDisplay}</td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 50);
    }
    // ----- END TIMELINE CONTENT ------


    // ----- UPDATE TABLE -----
    function updateTables() {
        $(`[name="milestoneName"]`).each(function(index) {
            $(this).attr("index", index);
            $(this).attr("id", `milestoneName${index}`);
        })

        $(`[name="manHours"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("index", index);
            $(this).attr("id", `manHours${index}`);
            $parent.find(".invalid-feedback").attr("id", `invalid-manHours${index}`);
        })

        $(`[name="assignEmployee"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("index", index);
            $(this).attr("id", `assignEmployee${index}`);
            $parent.find(".invalid-feedback").attr("id", `invalid-assignEmployee${index}`);
        })
    }
    // ----- END UPDATE TABLE -----


    // ----- FORM BUTTON -----
    function formButtons(data = false) {
        let button = "";
        if (data) {
            const {
                timelineBuilderID        = "",
                projectCode              = "",
                timelineManagementStatus = false,
                employeeID               = "",
                approversID              = "",
                approversDate            = "",
                createdAt                = new Date
            } = data && data[0];

            if (timelineManagementStatus == 0 || timelineManagementStatus == 1) { // DRAFT OR FOR ASSESSMENT
                button = `
                <button 
                    class="btn btn-submit px-5 p-2"  
                    id="btnSubmit" 
                    timelineBuilderID="${encryptString(timelineBuilderID)}"
                    code="${projectCode}"
                    status="${timelineManagementStatus}">
                    <i class="fas fa-paper-plane"></i> Submit
                </button>
                <button 
                    class="btn btn-cancel px-5 p-2"
                    id="btnCancel" 
                    timelineBuilderID="${encryptString(timelineBuilderID)}"
                    code="${projectCode}"
                    status="${timelineManagementStatus}">
                    <i class="fas fa-ban"></i> Cancel
                </button>`;

            } 
        }

        return button;
    }
    // ----- END FORM BUTTON -----


    // ----- SELECT2 MULTIPLE PLACEHOLDER -----
	function multipleSelect2Placeholder() {
        const isDisabled = $(`[name="assignEmployee"]`).attr("disabled");
		$(`.select2[name="assignEmployee"]`).select2({
			placeholder: !isDisabled ? "Select Team Members" : "-",
			theme:       "bootstrap",
			allowClear:  true,
			multiple:    true,
		});
		$(".select2-search__field").css("width", "100%");
	}
	// ----- END SELECT2 MULTIPLE PLACEHOLDER -----


    // ----- GET MILESTONE DISPLAY -----
    function getMilestoneDisplay(timelineBuilderID = 0, phaseCode = "", taskID = 0, milestones = [], milestoneTask = [], teamMembers = [], columnName = "", disabled = "") {
        let taskHTML = "", manHoursHTML = "", assigneeHTML = "";
        milestones.map(milestone => {
            const { milestoneID, milestoneName } = milestone;

            // ----- TASK/MILESTONE DISPLAY -----
            taskHTML += `
            <div class="form-group my-1">
                <input class    = "form-control"
                    name        = "milestoneName"
                    taskID      = "${taskID}"
                    milestoneID = "${milestoneID}"
                    value       = "&emsp;&emsp;${milestoneName}"
                    disabled>
            </div>`;
            // ----- END TASK/MILESTONE DISPLAY -----


            // ----- MAN HOURS DISPLAY -----
            const taskData = (milestoneID = null) => {
                let data = milestoneTask.filter(mt => mt.milestoneID == milestoneID);
                let manHours              = data[0]?.manHours ?? "";
                let taskStartDate         = data[0]?.taskStartDate ?? "";
                let taskEndDate           = data[0]?.taskEndDate ?? "";
                let assignedEmployee      = data[0]?.assignedEmployee ?? "";
                let assignedDesignation   = data[0]?.assignedDesignation ?? "";
                let assignedManHours      = data[0]?.assignedManHours ?? "";
                let assignedStartDate     = data[0]?.assignedStartDate ?? "";
                let assignedEndDate       = data[0]?.assignedEndDate ?? "";
                let assignedDays          = data[0]?.assignedDays ?? "";
                let assignedRegularHours  = data[0]?.assignedRegularHours ?? "";
                let assignedOvertimeHours = data[0]?.assignedOvertimeHours ?? "";

                return {
                    manHours, 
                    taskStartDate, 
                    taskEndDate, 
                    assignedEmployee, 
                    assignedDesignation, 
                    assignedManHours, 
                    assignedStartDate, 
                    assignedEndDate, 
                    assignedDays, 
                    assignedRegularHours, 
                    assignedOvertimeHours
                };
            }

            let {
                manHours              = "", 
                taskStartDate         = "", 
                taskEndDate           = "", 
                assignedEmployee      = "", 
                assignedDesignation   = "", 
                assignedManHours      = "", 
                assignedStartDate     = "", 
                assignedEndDate       = "", 
                assignedDays          = "", 
                assignedRegularHours  = "", 
                assignedOvertimeHours = "",
            } = taskData(milestoneID)

            manHoursHTML += `
            <div class="form-group my-1">
                <input class="form-control input-hours text-center"
                    readonly
                    timelineBuilderID = "${timelineBuilderID}"
                    value         = "${manHours || "0.00"}"
                    name          = "manHours"
                    min           = "0.00"
                    max           = "9999999999"
                    minlength     = "1"
                    maxlength     = "10"
                    taskID        = "${taskID}"
                    phase         = "${phaseCode}"
                    milestoneID   = "${milestoneID}"
                    dates         = "${assignedStartDate}"
                    employees     = "${assignedEmployee}"
                    designations  = "${assignedDesignation}"
                    manHours      = "${assignedManHours}"
                    regularHours  = "${assignedRegularHours}"
                    overtimeHours = "${assignedOvertimeHours}"
                    required>
                <div class="invalid-feedback d-block"></div>
            </div>`;
            // ----- END MAN HOURS DISPLAY -----


            // ----- ASSIGNEE DISPLAY -----
            const teamMemberOptions = teamMembers.map(member => {
                const { 
                    id, 
                    fullname, 
                    image, 
                    designation, 
                    designationName, 
                    departmentName, 
                    employeeCode 
                } = member;
                
                return `
                <option 
                    value             = "${id}"
                    fullname          = "${fullname}"
                    image             = "${image}"
                    designation       = "${designation}"
                    designationName   = "${designationName}"
                    departmentName    = "${departmentName}"
                    employeeCode      = "${employeeCode}"
                    >${fullname} - ${designationName}</option>`;
            }).join("");

            assigneeHTML += `
            <div class="form-group my-1">
                <select class="form-control validate select2"
                    timelineBuilderID   = "${timelineBuilderID}"
                    name                = "assignEmployee"
                    multiple            = "multiple"
                    phase               = "${phaseCode}"
                    taskID              = "${taskID}"
                    milestoneID         = "${milestoneID}"
                    assignedEmployee    = "${assignedEmployee}"
                    assignedDesignation = "${assignedDesignation}"
                    executeonce         = "true"
                    ${disabled}>
                    <option disabled>${!disabled ? "Select Employee" : "-"}</option>
                    ${teamMemberOptions}
                </select>
                <div class="invalid-feedback d-block"></div>
            </div>`;
            // ----- END ASSIGNEE DISPLAY -----
        })

        if (columnName == "task") {
            return taskHTML;
        } else if (columnName == "man hours") {
            return manHoursHTML;
        } else if (columnName == "assignee") {
            return assigneeHTML;
        } else {
            return "";
        }
    }
    // ----- END GET MILESTONE DISPLAY -----


    // ----- GET TASK DISPLAY -----
    function getTaskDisplay(timelineBuilderID = 0, phaseCode = "", milestones = [], task = {}, teamMembers = [], disabled = "") {
        let html = "";
        if (task) { 
            const { taskID, taskName, manHours, taskStartDate, taskEndDate, milestoneTask = [] } = task;

            let taskDisplay     = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "task", disabled);
            let manHoursDisplay = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "man hours", disabled);
            let assigneeDisplay = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "assignee", disabled);

            html += `
            <tr class="phase">
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-between btnCaret" 
                        phase   = "${phaseCode}"
                        taskID  = "${taskID}"
                        display = "false"
                        style="cursor: pointer;
                            min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            width:      100%;
                            padding:    1rem;
                            position:   absolute;
                            top:        0">
                        <span class="taskName" taskID="${taskID}">${taskName}</span>
                        &nbsp;&nbsp;<i class="fad fa-caret-down mr-3" caret="true"></i>
                    </div>
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "margin-top: 70px;">
                        ${taskDisplay}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            padding:    1rem;
                            position:   absolute;
                            top:        0">
                        <input type="text" 
                            class         = "form-control input-hours text-center" 
                            value         = "${manHours || "0.00"}" 
                            basis         = "true"
                            phase         = "${phaseCode}"
                            taskID        = "${taskID}"
                            remaining     = "${manHours || 0}"
                            taskStartDate = "${taskStartDate || ""}"
                            taskEndDate   = "${taskEndDate || ""}"
                            disabled>
                    </div>
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "margin-top: 70px;">
                        ${manHoursDisplay}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-start" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            padding:    1rem;
                            top:        0">
                        <div class="assignedMembers" 
                            taskID = "${taskID}" 
                            phase  = "${phaseCode}"
                            style = "position: absolute;
                                top: 0;
                                margin-top: 10px;">
                            <span>No data available yet.</span>
                        </div>
                    </div>
                    
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}">
                        ${assigneeDisplay}
                    </div>
                </td>
            </tr>`;
        }
        return html;
    }
    // ----- END GET TASK DISPLAY -----


    // ----- GET PHASE DISPLAY -----
    function getPhaseDisplay(timelineBuilderID = 0, teamMembers = [], phase = {}, index = 0, disabled = "") {
        const {
            phaseDescription,
            phaseCode,
            milestones = [],
            tasks      = []
        } = phase;

        let taskHTML = "";
        tasks.map(task => {
            taskHTML += getTaskDisplay(timelineBuilderID, phaseCode, milestones, task, teamMembers, disabled);
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
                                <th class="text-white">Assignees</th>
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
    // ----- END GET PHASE DISPLAY -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        $("#page_content").html(preloader);
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            timelineBuilderID,
            projectName,
            projectCode,
            teamMember,
            employeeID,
            projectCreatedAt,
            teamMembersID,
            timelineManagementStatus,
            phases
        } = data && data[0];

        let membersID = teamMember ? teamMember.replaceAll("|", ",") : "0";
        const teamMembers = getTableData(
            `hris_employee_list_tbl`,
            `employeeID, employeeCode, designationID, employeeFirstname, employeeLastname, employeeProfile, createdAt`,
            `FIND_IN_SET(employeeID, "${membersID}")`
        ).map(member => {
            const { 
                employeeID, 
                employeeCode,
                designationID,
                employeeFirstname, 
                employeeLastname, 
                employeeProfile = "default.jpg",
                createdAt
            } = member;

            const { designation:designationName, department:departmentName } = employeeData(employeeID);

            let profile = employeeProfile && employeeProfile != "null" ? employeeProfile : "default.jpg";

            return {
                id:          employeeID,
                fullname:    `${employeeFirstname} ${employeeLastname}`,
                designation: designationID,
                image:       `${base_url}/assets/upload-files/profile-images/${profile}`,
                designationName,
                departmentName,
                employeeCode
            }
        });

        $("#btnBack").attr("timelineBuilderID", encryptString(timelineBuilderID));
		$("#btnBack").attr("status", timelineManagementStatus);

        const disabled = readOnly ? "disabled" : "";

        let button = !disabled ? formButtons(data) : "";

        let phaseHTML = "";
        phases.map((phase, index) => {
            phaseHTML += getPhaseDisplay(timelineBuilderID, teamMembers, phase, index, disabled);
        })

        let html = `
        <div class="">
            <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">
                <span>${projectName}</span>
                <span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">${projectCode}</span>
            </div>
            <div>
                ${phaseHTML}
            </div>
            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            updateTables();
            initAll();
            multipleSelect2Placeholder();

            $(`[name="assignEmployee"]`).each(function() {
                $assignedEmployee = $(this).attr("assignedEmployee");
                const assignedEmployeeArr = $assignedEmployee?.split("|");
                $assignedEmployee && $(this).val(assignedEmployeeArr).trigger("change");
            })
            $(`[name="assignEmployee"]`).attr("executeonce", "false");  
            if (readOnly) {
                $(`.btnDismissModal`).attr("data-dismiss", "modal");
                $(`.btnDismissModal`).removeClass("btnDismissModal");
            }

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

        }, 50);
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
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- DISPLAY ASSIGNED EMPLOYEE -----
    function displayAssignedEmployee(timelineBuilderID = 0, employees = [], phase = null, taskID = null, isDisabled = false) {
        const isReadOnly = isDisabled ? "true" : "false";
        let html = "";
        if (employees.length > 0 && phase && taskID) {
            employees.map((employee, index) => {
                const { 
                    id, 
                    fullname, 
                    image, 
                    departmentName, 
                    designationName, 
                    employeeCode 
                } = employee;

                html += `
                <img src              = "${image}" 
                    timelineBuilderID = "${timelineBuilderID}"
                    class             = "rounded rounded-circle employeeProfile" 
                    style             = "width: 50px; height: 50px; cursor: pointer;"
                    title             = "${fullname}"
                    phase             = "${phase}"
                    taskID            = "${taskID}"
                    employeeID        = "${id}"
                    departmentName    = "${departmentName}"
                    designationName   = "${designationName}"
                    employeeCode      = "${employeeCode}"
                    isReadOnly        = "${isReadOnly}">`;
            })
        } else {
            html += `<span>No data available yet.</span>`;
        }
        $(`.assignedMembers[phase="${phase}"][taskID="${taskID}"]`).html(html);
    }
    // ----- END DISPLAY ASSIGNED EMPLOYEE -----


    // ----- GET ASSIGNED EMPLOYEE -----
    function getAssignedEmployee(phase = null, taskID = null) {
        let employees = [];
        if (phase && taskID) {
            $(`[name="assignEmployee"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                const employeeID = $(this).val();
                if (employeeID && employeeID.length > 0) {
                    employeeID.map(tempID => {
                        const fullname        = $(`option:selected[value="${tempID}"]`, this).attr("fullname");
                        const image           = $(`option:selected[value="${tempID}"]`, this).attr("image") || "default.jpg";
                        const designationName = $(`option:selected[value="${tempID}"]`, this).attr("designationName");
                        const departmentName  = $(`option:selected[value="${tempID}"]`, this).attr("departmentName");
                        const employeeCode    = $(`option:selected[value="${tempID}"]`, this).attr("employeeCode");
                        let temp = { id: tempID, fullname, image, designationName, departmentName, employeeCode };
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
    // ----- END GET ASSIGNED EMPLOYEE -----


    // ----- INIT DATE PICKER -----
    function manipulateDatePicker(elem = null, data = null) {
        if (elem && data) {
            const dateValue = moment(data).format("YYYY-MM-DD");

            $parent = $(elem).closest("tr");
            const manHours = $parent.find(`[name="employeeManHours"]`).val();
            let isOvertime = false;
            if (holidayData && holidayData.length > 0) {
                holidayData.map(holiday => {
                    let date = holiday.holidayDate;
                    if (date == dateValue) isOvertime = true;
                })
            }

            let duration = 0;
            if (!isOvertime && employeeSchedule && employeeSchedule.length > 0) {
                const dayName = moment(data, "YYYY-MM-DD").format("dddd").toLowerCase();
                
                const getDuration = (start = "", end = "", breakDuration = 0) => {
                    if (start && end) {
                        let startDate = moment(`2021-01-01 ${start}`);
                        let endDate   = moment(`2021-01-01 ${end}`);
                        breakDuration = +breakDuration;
                        let duration = moment.duration(endDate.diff(startDate));
                        let finalDuration = duration.asHours();
                        if (finalDuration < 0) {
                            // START DATE IS GREATER THAN END DATE
                            finalDuration = moment.duration(startDate.diff(endDate));
                        }

                        let result = 0;
                        if (finalDuration > 0) {
                            result = finalDuration - breakDuration;
                        }
                        return result;
                    }
                    return 0;
                }

                switch (dayName) {
                    case "monday":
                        if (employeeSchedule[0].mondayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].mondayFrom, employeeSchedule[0].mondayTo, employeeSchedule[0].mondayBreakDuration);
                        }
                        break;
                    case "tuesday":
                        if (employeeSchedule[0].tuesdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].tuesdayFrom, employeeSchedule[0].tuesdayTo, employeeSchedule[0].tuesdayBreakDuration);
                        }
                        break;
                    case "wednesday":
                        if (employeeSchedule[0].wednesdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].wednesdayFrom, employeeSchedule[0].wednesdayTo, employeeSchedule[0].wednesdayBreakDuration);
                        }
                        break;
                    case "thursday":
                        if (employeeSchedule[0].thursdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].thursdayFrom, employeeSchedule[0].thursdayTo, employeeSchedule[0].thursdayBreakDuration);
                        }
                        break;
                    case "friday":
                        if (employeeSchedule[0].fridayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].fridayFrom, employeeSchedule[0].fridayTo, employeeSchedule[0].fridayBreakDuration);
                        }
                        break;
                    case "saturday":
                        if (employeeSchedule[0].saturdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].saturdayFrom, employeeSchedule[0].saturdayTo, employeeSchedule[0].saturdayBreakDuration);
                        }
                        break;
                    case "sunday":
                    default:
                        if (employeeSchedule[0].sundayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].sundayFrom, employeeSchedule[0].sundayTo, employeeSchedule[0].sundayBreakDuration);
                        }
                        break;
                }
            }

            $parent.find(`[name="employeeManHours"]`).attr("isOvertime", isOvertime);
            $parent.find(`[name="employeeManHours"]`).attr("duration", duration);
            $parent.find(`[name="employeeManHours"]`).val(manHours);
            
            // ----- COMPUTE REGULAR AND OVERTIME HOURS -----
            let regularHours = 0, overtimeHours = 0;
            if (isOvertime) {
                overtimeHours = manHours;
            } else {
                if (manHours > duration) {
                    regularHours  = duration;
                    overtimeHours = manHours - regularHours;
                } else {
                    regularHours = manHours;
                }
            }
            $parent.find(`[name="regularHours"]`).val(formatAmount(regularHours || 0));
            $parent.find(`[name="overtimeHours"]`).val(formatAmount(overtimeHours || 0));
            // ----- END COMPUTE REGULAR AND OVERTIME HOURS -----

            $(elem).attr("dateValue", dateValue);
            $(elem).val(moment(data).format("MMMM DD, YYYY"));


            // ----- CHECK IF DATE EXISTS -----
            $table = $(elem).closest("table");
            $table.find(`[name="employeeDate"]`).each(function() {
                const dateValue = $(this).attr("dateValue");
                const elementID = "#"+this.id;
                
                const validated = $(elementID).hasClass("validated");
                let invalidFeedback =
                    $(elementID).parent().find(".invalid-feedback").length > 0
                        ? $(elementID).parent().find(".invalid-feedback")
                        : $(elementID).parent().parent().find(".invalid-feedback").length > 0
                        ? $(elementID).parent().parent().find(".invalid-feedback")
                        : $(elementID).parent().parent().parent().find(".invalid-feedback");
                validated
                    ? $(elementID).removeClass("is-invalid").addClass("is-valid")
                    : $(elementID).removeClass("is-invalid").removeClass("is-valid");
                invalidFeedback.text("");

                let uniqueDates = [];
                $table.find(`[name="employeeDate"]:not(${elementID})`).each(function() {
                    const date = $(this).attr("dateValue");
                    uniqueDates.push(date);
                })

                if (uniqueDates.includes(dateValue)) {
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Date already exists!");
                } else {
                    $(elementID).removeClass("is-valid").removeClass("is-invalid");
                    invalidFeedback.text("");
                }
            })
            // ----- END CHECK IF DATE EXISTS -----
        }
    }

    function initDatePicker(element = null, dateFrom = "", dateTo = "", dateValue = "") {
        
        let inMinDate   = dateFrom ? moment(dateFrom) : moment(new Date, "MMMM DD, YYYY").add(-365, "days");
        let inMaxDate   = dateTo ? moment(dateTo) : moment(new Date, "MMMM DD, YYYY").add(365, "days");
        let inStartDate = dateValue ? moment(dateValue) : moment(dateFrom ?? new Date);

        let elem = element ?? `[name="employeeDate"]`;
        $(elem).daterangepicker({
            autoUpdateInput:  false,
            singleDatePicker: true,
            showDropdowns:    true,
            autoApply:        true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            minDate:   inMinDate,
            maxDate:   inMaxDate,
            startDate: inStartDate
        }, function(data) {
            manipulateDatePicker(elem, data);
        })
    }
    // ----- END INIT DATE PICKER -----


    // ----- GET TABLE DATE ROW -----
    function getTableDateRow(data = false, remaining = 0, isReadOnly = false) {

        let date          = ""; 
        let manHours      = ""; 
        let regularHours  = ""; 
        let overtimeHours = "";
        if (data) {
            date          = data.date ?? "";
            manHours      = data.manHours ?? "";
            regularHours  = data.regularHours ?? "";
            overtimeHours = data.overtimeHours ?? "";
        }

        let html = "";
        if (isReadOnly) {
            html = `
            <tr class="dates">
                <td>
                    ${moment(date || new Date).format("MMMM DD, YYYY")}
                </td>
                <td class="text-center">
                    ${formatAmount(manHours || 0)}
                </td>
                <td class="text-center">
                    ${formatAmount(regularHours || 0)}
                </td>
                <td class="text-center">
                    ${formatAmount(overtimeHours || 0)}
                </td>
            </tr>`;
        } else {
            html = `
            <tr class="dates">
                <td>
                    <div class="input-group mb-0">
                        <div class="input-group-prepend">
                            <button class="btn btn-sm btn-danger btnDeleteDate">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input type="button"
                            class     = "form-control validate employeeDate"
                            name      = "employeeDate"
                            dateFrom  = ""
                            dateTo    = ""
                            dateValue = "${date || ""}"
                            value     = ""
                            required
                            ${isReadOnly ? "disabled" : ""}>
                        <div class="d-block invalid-feedback mt-0 mb-1"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group my-1">
                        <input class="form-control input-hours text-center employeeManHours"
                            name="employeeManHours"
                            minlength="1"
                            maxlength="5"
                            min="0"
                            max="24"
                            remaining="${remaining || 0}"
                            ${isReadOnly ? "disabled" : ""}
                            value="${manHours || "0.00"}">
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="regularHours"
                        value="${regularHours || "0.00"}"
                        disabled>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="overtimeHours"
                        value="${overtimeHours || "0.00"}"
                        disabled>
                </td>
            </tr>`;
        }
        
        return html;
    }
    // ----- END GET TABLE DATE ROW -----


    // ----- MODAL CONTENT -----
    function modalContent(timelineBuilderID = "", phase = "", taskID = "", taskStartDate = "", taskEndDate = "", employeeData = false, taskData = [], isReadOnly = false) {

        let html = "";
        if (employeeData && taskData && taskData.length > 0) {

            const remaining = $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("remaining") || 0;
            let employeeTotalManHours = 0;

            const {
                employeeID, fullname, image, employeeCode, departmentName, designationName
            } = employeeData;

            let tbodyHTML = "";
            taskData.map(task => {

                const { employeeID, timelineBuilderID, taskID, milestoneID } = task;

                employeeSchedule = getTableData(
                    `hris_employee_list_tbl as helt
                        LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)`,
                    `hsst.*`,
                    `employeeID = ${employeeID}`
                );

                let data = [];
                $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"][milestoneID="${milestoneID}"]`).each(function() {
                    const employeeArr = $(this).attr("employees")?.split("|") || [];
                    if (employeeArr.includes(employeeID)) {
                        const employeeIndex  = employeeArr.indexOf(employeeID);

                        const datesArr         = $(this).attr("dates")?.split("|") || [];
                        const manHoursArr      = $(this).attr("manHours")?.split("|") || [];
                        const regularHoursArr  = $(this).attr("regularHours")?.split("|") || [];
                        const overtimeHoursArr = $(this).attr("overtimeHours")?.split("|") || [];

                        const datesArr2         = datesArr[employeeIndex] ?? "";
                        const manHoursArr2      = manHoursArr[employeeIndex] ?? "";
                        const regularHoursArr2  = regularHoursArr[employeeIndex] ?? "";
                        const overtimeHoursArr2 = overtimeHoursArr[employeeIndex] ?? "";

                        const datesArr3         = datesArr2?.split("~") ?? [];
                        const manHoursArr3      = manHoursArr2?.split("~") ?? [];
                        const regularHoursArr3  = regularHoursArr2?.split("~") ?? [];
                        const overtimeHoursArr3 = overtimeHoursArr2?.split("~") ?? [];
                        datesArr3.map((arr, index) => {
                            const date          = datesArr3[index] ?? "";
                            const manHours      = manHoursArr3[index] ?? "";
                            const regularHours  = regularHoursArr3[index] ?? "";
                            const overtimeHours = overtimeHoursArr3[index] ?? "";

                            employeeTotalManHours += ((+manHours) || 0);

                            let temp = {
                                date, manHours, regularHours, overtimeHours
                            };
                            data.push(temp);
                        })

                    }
                });

                let remainingManHours = (+remaining) + (+employeeTotalManHours);
                remainingManHours = remainingManHours > 0 ? remainingManHours : 0;
                let tableDateRow = "";
                if (data && data.length > 0) {
                    data.map(item => {
                        tableDateRow += getTableDateRow(item, remainingManHours, isReadOnly);
                    })
                } else {
                    tableDateRow += getTableDateRow(null, remainingManHours, isReadOnly);
                }

                let milestoneName = $(`[name="milestoneName"][taskID="${taskID}"][milestoneID="${milestoneID}"]`).val()?.trim();

                let buttonAddDate = !isReadOnly ? `
                <button class="btn btn-md btn-primary float-left ml-2 my-1 btnAddDate"
                    taskStartDate = "${taskStartDate}"
                    taskEndDate   = "${taskEndDate}"
                    remaining     = "${remainingManHours}">
                    <i class="fas fa-plus"></i>
                </button>` : "";

                tbodyHTML += `
                <tr phase       = "${phase}"
                    taskID      = "${taskID}"
                    milestone   = "true"
                    milestoneID = "${milestoneID}">
                    <td>${milestoneName}</td>
                    <td>
                        <table class="table table-bordered tableDate">
                            <thead>
                                <tr>
                                    <th style="width: 40%">Date ${!isReadOnly ? "<code>*</code>" : ""}</th>
                                    <th style="width: 20%">Man Hours ${!isReadOnly ? "<code>*</code>" : ""}</th>
                                    <th style="width: 20%">Regular Hours</th>
                                    <th style="width: 20%">Overtime Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                               ${tableDateRow}
                            </tbody>
                        </table>
                        ${buttonAddDate}
                    </td>
                </tr>`;
            })

            let totalRemainingManHours = (+remaining) + (+employeeTotalManHours);

            html = `
            <div class="row p-3">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-3 px-2">
                        <div class="d-flex justify-content-start align-items-center">
                            <img src="${image}"
                                class="rounded-circle"
                                style="width: 50px; height: 50px;"
                                alt="${fullname}">
                            <div class="font-weight-bold ml-2">
                                <h5>${fullname}</h5>
                                <small>${employeeCode}</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end align-items-end flex-column">
                            <h5>${designationName}</h5>
                            <small>${departmentName}</small>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <table class="table table-striped" id="tableManHours">
                        <thead>
                            <tr>
                                <th>Milestones</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody id="remainingManHours" 
                            remainingManHours="${totalRemainingManHours}">
                            ${tbodyHTML}
                        </tbody>
                    </table>
                </div>
            </div>`;

            html += !isReadOnly ? `
            <div class="modal-footer">
                <div class="w-100 text-right">
                    <button class="btn btn-save px-5 py-2" 
                        id         = "btnSaveManHours"
                        employeeID = "${employeeID}"
                        phase      = "${phase}"
                        taskID     = "${taskID}">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button class="btn btn-cancel px-5 py-2 btnDismissModal">
                        <i class="fas fa-ban"></i> Cancel
                    </button>
                </div>
            </div>` : "";
        }
        return html;
    }
    // ----- END MODAL CONTENT -----


    // ----- UPDATE TABLE DATE ITEMS -----
    function updateTableDateItems() {
        $(`#modal_project_management_board_content`).find(`input, select, textarea`).each(function(index) {
            const name = this.name ?? "element";
            $(this).attr("id", `${name}${index}`);
        })
    }
    // ----- END UPDATE TABLE DATE ITEMS -----


    // ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


    // ----- CHECK REMAINING MAN HOURS -----
    function checkRemainingManHours($table = "", elementID = "", remaining = 0) {
        if ($table && elementID) {
            let totalManHours = 0;
            $table.find(`[name="employeeManHours"]`).each(function() {
                const manHours = getNonFormattedAmount($(this).val());
                totalManHours += manHours;
            })
            if (!$(elementID).hasClass("is-invalid")) {
                if (totalManHours > remaining) {
                    $table.find(`[name="employeeManHours"]`).removeClass("is-valid").addClass("is-invalid");
                    $table.find(`[name="employeeManHours"]`).closest(".form-group").find(`.invalid-feedback`).text("Excessive amount of hours");
                } else {
                    $table.find(`[name="employeeManHours"]`).removeClass("is-valid").removeClass("is-invalid");
                    $table.find(`[name="employeeManHours"]`).closest(".form-group").find(`.invalid-feedback`).text("");
                }
            }
        }
    }
    // ----- END CHECK REMAINING MAN HOURS -----


    // ----- GET MAN HOURS -----
    function getManHours(employeeID = 0) {
        let data = [];
        $(`#tableManHours tbody tr[milestone="true"]`).each(function() {
            const phase       = $(this).attr("phase");
            const milestoneID = $(this).attr("milestoneID");
            const taskID      = $(this).attr("taskID");
            
            let totalManHours = 0;
            let dateArr = [], manHoursArr = [], regularHoursArr = [], overtimeHoursArr = [];
            $(`tr.dates`, this).each(function() {
                const date          = $(`[name="employeeDate"]`, this).attr("dateValue");
                const manHours      = $(`[name="employeeManHours"]`, this).val() || "0";
                const regularHours  = $(`[name="regularHours"]`, this).val() || "0";
                const overtimeHours = $(`[name="overtimeHours"]`, this).val() || "0";

                dateArr.push(date);
                manHoursArr.push(manHours);
                regularHoursArr.push(regularHours);
                overtimeHoursArr.push(overtimeHours);

                totalManHours += (+manHours);
            })

            const dates         = dateArr.join("~");
            const manHours      = manHoursArr.join("~");
            const regularHours  = regularHoursArr.join("~");
            const overtimeHours = overtimeHoursArr.join("~");

            let temp = {
                employeeID, phase, milestoneID, taskID, dates, manHours, regularHours, overtimeHours, totalManHours
            }
            data.push(temp);
        });
        return data;
    }
    // ----- GET MAN HOURS -----


    // ----- UPDATE MAN HOURS VALUE -----
    function updateManHoursValue(index = 0, phase = "", taskID = "") {
        let manHours = $(`#manHours${index}`).attr("manHours");
        let manHoursArr = manHours ? manHours.split("|") : [];
        const newManHours = manHoursArr
            .join("|")
            .split(/~/i)
            .map(i => i.split("|"))
            .reduce((a, b) => [...a, ...b])
            .reduce((x, y) => (+x) + (+y), 0);
        $(`#manHours${index}`).val(newManHours);

        // ----- UPDATE REMAINING -----
        const manHoursBasis = getNonFormattedAmount($(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val());
        let totalManHours = 0;
        $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
            const manHours = getNonFormattedAmount($(this).val());
            totalManHours += manHours;
        })
        const newRemaining = manHoursBasis - totalManHours;
        $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("remaining", newRemaining);
        // ----- END UPDATE REMAINING -----
    }
    // ----- END UPDATE MAN HOURS VALUE -----


    // ----- VALIDATE MAN HOURS -----
    function validateManHours(phase = "", taskID = "", elementID = null) {
        const checkManHours = (phase, taskID, elementID, all = false) => {
            $parent = $(elementID).closest(".form-group");
            const basisManHours = getNonFormattedAmount($(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val());

            let totalManHours = 0;
            $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                const manHours = getNonFormattedAmount($(this).val()) || 0;
                totalManHours += manHours;
            })

            let condition = all ? 
                totalManHours != basisManHours : totalManHours > basisManHours;
            if (condition) {
                let msg = all ? "Insufficient amount of hours." : "Excessive amount of hours.";
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                $parent.find(".invalid-feedback").text(msg);
            } else {
                $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                    const $myParent = $(this).closest(".form-group");
                    const id = "#"+$(this).attr("id");
                    $(id).removeClass("is-valid").removeClass("is-invalid");
                    $myParent.find(".invalid-feedback").text("");
                });
            }
        }

        if (phase && taskID && elementID) {
            checkManHours(phase, taskID, elementID)
        } else {
            $(`[name="manHours"]`).each(function() {
                const id     = "#"+$(this).attr("id");
                const phase  = $(this).attr("phase");
                const taskID = $(this).attr("taskID");
                checkManHours(phase, taskID, id, true);
            })
        }
    }
    // ----- END VALIDATE MAN HOURS -----


    // ----- VALIDATE ASSIGNEE -----
    function validateAssignee() {
        $(`[name="assignEmployee"]`).each(function() {
            $parent = $(this).closest(".form-group");
            const index    = $(this).attr("index");
            const phase    = $(this).attr("phase");
            const taskID   = $(this).attr("taskID");
            const employeeIDArr = $(this).val();

            const manHours = getNonFormattedAmount($(`[name="manHours"][phase="${phase}"][taskID="${taskID}"][index="${index}"]`).val());
            if (manHours > 0 && employeeIDArr.length == 0) {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .addClass("has-error");
                    $parent.find(".invalid-feedback").text("This field is required!");
            } else {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .removeClass("has-error");
                    $parent.find(".invalid-feedback").text("");
            }
        })
    }
    // ----- VALIDATE ASSIGNEE -----


    // ----- FOCUS ON ERROR -----
    async function validateInputs() {
        const checkManHours = validateManHours();
        const checkAssignee = validateAssignee();
        
        $(`[name="manHours"]`).each(function() {
            $parent = $(this).closest("tr");
            const hasInvalid = $(this).hasClass("is-invalid");
            if (hasInvalid) {
                const displayed = $parent.find(".btnCaret").attr("display") == "true";
                if (!displayed) {
                    $parent.find(".btnCaret").trigger("click");
                }
            }
        })

        $(`[name="assignEmployee"]`).each(function() {
            $parent = $(this).closest("tr");
            const hasInvalid = $(this).parent().find(".selection").children().hasClass("has-error");
            if (hasInvalid) {
                const displayed = $parent.find(".btnCaret").attr("display") == "true";
                if (!displayed) {
                    $parent.find(".btnCaret").trigger("click");
                }
            }
        })

        if ($(`.is-invalid, .has-error`).length > 0) {
            $(`.is-invalid, .has-error`).first().focus();
            return false;
        }
        return true;
    }
    // ----- END FOCUS ON ERROR -----


    // ----- SAVE MAN WORDS -----
    $(document).on("click", "#btnSaveManHours", function() {
        const employeeID = $(this).attr("employeeID");
        const phase      = $(this).attr("phase");
        const taskID     = $(this).attr("taskID");

        if ($("#modal_project_management_board").find(".is-invalid").length > 0) {
            $("#modal_project_management_board").find(".is-invalid").first().focus();
        } else {
            const validate = validateForm("modal_project_management_board");
            removeIsValid("#modal_project_management_board");
            if (validate) {
                const manHoursData = getManHours(employeeID);

                manHoursData.map(data => {
                    const { 
                        phase, 
                        milestoneID, 
                        taskID, 
                        dates, 
                        manHours, 
                        regularHours,
                        overtimeHours
                    } = data;

                    const selector = `[name="manHours"][phase="${phase}"][taskID="${taskID}"][milestoneID="${milestoneID}"]`;

                    const assignEmployee = $(selector).attr("employees").split("|");
                    const employeeIndex  = assignEmployee.indexOf(employeeID);

                    let manHoursArr = $(selector).attr("manHours")?.split("|");
                    manHoursArr[employeeIndex]  = manHours;
                    $(selector).attr("manHours", manHoursArr.join("|"));

                    let datesArr = $(selector).attr("dates")?.split("|");
                    datesArr[employeeIndex] = dates;
                    $(selector).attr("dates", datesArr.join("|"));

                    let regularHoursArr = $(selector).attr("regularHours")?.split("|");
                    regularHoursArr[employeeIndex] = regularHours;
                    $(selector).attr("regularHours", regularHoursArr.join("|"));

                    let overtimeHoursArr = $(selector).attr("overtimeHours")?.split("|");
                    overtimeHoursArr[employeeIndex] = overtimeHours;
                    $(selector).attr("overtimeHours", overtimeHoursArr.join("|"));


                    const newManHours = manHoursArr
                        .join("|")
                        .split(/~/i)
                        .map(i => i.split("|"))
                        .reduce((a, b) => [...a, ...b])
                        .reduce((x, y) => (+x) + (+y), 0);
                    $(selector).val(newManHours);
                });

                // ----- UPDATE REMAINING -----
                const manHoursBasis = getNonFormattedAmount($(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val());
                let totalManHours = 0;
                $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                    const manHours = getNonFormattedAmount($(this).val());
                    totalManHours += manHours;
                })
                const newRemaining = manHoursBasis - totalManHours;
                $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("remaining", newRemaining);
                // ----- END UPDATE REMAINING -----

                $(`#modal_project_management_board`).modal("hide");
            }
        }
    })
    // ----- END SAVE MAN HOURS -----


    // ----- DISMISS MODAL -----
    $(document).on("click", ".btnDismissModal", function() {
        $(`#modal_project_management_board`).modal("hide");
        Swal.fire({
            title: "DISCARD CHANGES", 
            text: "Are you sure that you want to cancel this process?",
            imageUrl: `${base_url}assets/modal/cancel.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1a1a1a',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                $(`#modal_project_management_board`).modal("hide");
            } else {
                $(`#modal_project_management_board`).modal("show");
            }
        });
    })
    // ----- END DISMISS MODAL -----


    // ----- ADD TABLE ROW DATE -----
    $(document).on("click", `.btnAddDate`, function() {
        const taskStartDate = $(this).attr("taskStartDate");
        const taskEndDate   = $(this).attr("taskEndDate");
        const remaining     = $(this).attr("remaining") || 0;

        $table = $(this).closest("td");
        let row = getTableDateRow(null, remaining);
        $table.find(`tbody`).append(row);
        initHours();
        updateTableDateItems();

        $(`[name="employeeDate"]`).each(function() {
            const elementID = "#"+this.id;
            const dateValue = $(this).attr("dateValue") || taskStartDate;
            initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
            manipulateDatePicker(elementID, dateValue);
        });
    })
    // ----- END ADD TABLE ROW DATE -----


    // ----- DELETE TABLE ROW DATE -----
	$(document).on("click", ".btnDeleteDate", function() {
		const isCanDelete = $(this).closest("tbody").find("tr").length > 1;
		if (isCanDelete) {
			const dateElement  = $(this).closest("tr");
            const tableElement = $(this).closest("table");
			dateElement.fadeOut(500, function() {
				$(this).closest("tr").remove();
                updateTableDateItems();
                tableElement.find(`[name="employeeDate"]`).each(function() {
                    const elementID = "#"+this.id;
                    const dateValue = $(this).attr("dateValue");
                    manipulateDatePicker(elementID, dateValue);
                });
			})
		} else {
			showNotification("danger", "You must have atleast one working days.");
		}
	})
	// ----- END DELETE TABLE ROW DATE -----


    // ----- CLICK TASK NAME OR CARET -----
    $(document).on("click", ".btnCaret", function() {
        $parent = $(this).closest("tr");
        const taskID  = $(this).attr("taskID");
        const phase   = $(this).attr("phase");
        const display = $(this).attr("display") == "true";
        const myCaret = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.taskContent[taskID="${taskID}"][phase="${phase}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.taskContent[taskID="${taskID}"][phase="${phase}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[caret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
    })
    // ----- END CLICK TASK NAME OR CARET -----


    // ----- SELECT ASSIGN EMPLOYEE -----
    $(document).on("change", `[name="assignEmployee"]`, function() {
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const index      = $(this).attr("index");
        const phase      = $(this).attr("phase");
        const taskID     = $(this).attr("taskID");
        const employees  = getAssignedEmployee(phase, taskID);
        const employeeID = $(this).val() || [];
        const isDisabled = $(this).attr("disabled");
        const startDate  = $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskStartDate") || "";

        displayAssignedEmployee(timelineBuilderID, employees, phase, taskID, isDisabled);

        const selector = `[phase="${phase}"][taskID="${taskID}"][name="manHours"][index="${index}"]`;

        const getDifferentEmployeeID = (oldEmployeeArr = [], newEmployeeArr = []) => {
            let oldArrCount = oldEmployeeArr.length;
            let newArrCount = newEmployeeArr.length;
            let first  = oldArrCount > newArrCount ? oldEmployeeArr : newEmployeeArr;
            let second = oldArrCount > newArrCount ? newEmployeeArr : oldEmployeeArr;
    
            let index = first.filter(x => second.indexOf(x) === -1);
            return index ? index[0] : 0;
        }

        const executeonce = $(this).attr("executeonce") == "true";
        if (!executeonce) {
            const oldEmployees     = $(selector).attr("employees") || false;
            const oldEmployeesArr  = oldEmployees ? oldEmployees.split("|") : [];
            const isOnAdd          = employeeID.length > oldEmployeesArr.length;
            const diffEmployeeID   = getDifferentEmployeeID(oldEmployeesArr, employeeID);
            const oldManHours      = $(selector).attr("manHours") || "";
            const oldRegularHours  = $(selector).attr("regularHours") || "";
            const oldOvertimeHours = $(selector).attr("overtimeHours") || "";
            const oldDates         = $(selector).attr("dates") || "";

            // ----- SET NEW MAN HOURS -----
            let newManHoursArr      = oldManHours ? oldManHours.split("|") : [];
            let newRegularHoursArr  = oldRegularHours ? oldRegularHours.split("|") : [];
            let newOvertimeHoursArr = oldOvertimeHours ? oldOvertimeHours.split("|") : [];
            let newDates            = oldDates ? oldDates.split("|") : [];
            let tempArr        = isOnAdd ? employeeID : oldEmployeesArr;
            let employeeIndex  = tempArr.indexOf(diffEmployeeID);
                employeeIndex  = employeeIndex != -1 ? employeeIndex : 0;

            if (employeeIndex >= 0 && !isOnAdd) {
                newManHoursArr.splice(employeeIndex, 1);
                newRegularHoursArr.splice(employeeIndex, 1);
                newOvertimeHoursArr.splice(employeeIndex, 1);
                newDates.splice(employeeIndex, 1);
            } else {
                if (isOnAdd) {
                    newManHoursArr.splice(employeeIndex, 0, "0");
                    newRegularHoursArr.splice(employeeIndex, 0, "0");
                    newOvertimeHoursArr.splice(employeeIndex, 0, "0");
                    newDates.splice(employeeIndex, 0, startDate);
                }
                else {
                    newManHoursArr.splice(employeeIndex, 1, "0");
                    newRegularHoursArr.splice(employeeIndex, 1, "0");
                    newOvertimeHoursArr.splice(employeeIndex, 1, "0");
                    newDates.splice(employeeIndex, 1, startDate);
                }
            }
            newManHoursArr      = newManHoursArr.join("|");
            newRegularHoursArr  = newRegularHoursArr.join("|");
            newOvertimeHoursArr = newOvertimeHoursArr.join("|");
            newDates             = newDates.join("|");

            $(selector).attr("manHours", newManHoursArr);
            $(selector).attr("regularHours", newRegularHoursArr);
            $(selector).attr("overtimeHours", newOvertimeHoursArr);
            $(selector).attr("dates", newDates);
            // ----- END SET NEW MAN HOURS -----
        }

        updateManHoursValue(index, phase, taskID);

        let assignDesignation = [];
        employeeID.map((_, i) => {
            const designationID = $(`[name="assignEmployee"][index="${index}"] option:selected`).eq(i).attr("designation");
            assignDesignation.push(designationID);
        })

        $(selector).attr("employees", employeeID.join("|"));
        $(selector).attr("designations", assignDesignation.join("|"));

        $parent = $(this).closest(".form-group");
        $(this).parent()
            .find(".selection")
            .children()
            .removeClass("is-invalid")
            .removeClass("is-valid")
            .removeClass("no-error")
            .removeClass("has-error");
        $parent.find(".invalid-feedback").text("");   
    })
    // ----- END SELECT ASSIGN EMPLOYEE -----


    // ----- CLICK EMPLOYEE PROFILE -----
    $(document).on("click", `.employeeProfile`, function() {
        const isReadOnly        = $(this).attr("isReadOnly") == "true";
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const phase             = $(this).attr("phase");
        const taskID            = $(this).attr("taskID");
        const employeeID        = $(this).attr("employeeID");
        const fullname          = $(this).attr("title");
        const image             = $(this).attr("src");
        const employeeCode      = $(this).attr("employeeCode");
        const departmentName    = $(this).attr("departmentName");
        const designationName   = $(this).attr("designationName");
        let title = isReadOnly ? "ASSIGNED MAN HOURS" : "ASSIGN MAN HOURS";

        $parent = $(this).closest("tr");
        const taskStartDate = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskStartDate");
        const taskEndDate   = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskEndDate");
        $parent.find(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).removeClass("is-invalid").removeClass("is-valid");
        $parent.find(`.invalid-feedback`).text("");

        let employeeData = {
            employeeID, fullname, image, employeeCode, departmentName, designationName
        };

        let taskData = [];
        $(`[name="assignEmployee"][taskID="${taskID}"]`).each(function() {
            const milestoneID = $(this).attr("milestoneID");
            const employeeArr = $(this).val();
            if (employeeArr.includes(employeeID)) {
                taskData.push({
                    employeeID, timelineBuilderID, taskID, milestoneID
                })
            }
        })

        $(`#modal_project_management_board .page-title`).text(title);
        $(`#modal_project_management_board_content`).html(preloader);
        $(`#modal_project_management_board`).modal("show");
        setTimeout(() => {
            let content = modalContent(timelineBuilderID, phase, taskID, taskStartDate, taskEndDate, employeeData, taskData, isReadOnly);
            $(`#modal_project_management_board_content`).html(content);

            initHours();
            initDatatables();
            updateTables();
            updateTableDateItems();

            $(`[name="employeeDate"]`).each(function() {
                const elementID = "#"+this.id;
                const dateValue = $(this).attr("dateValue") || taskStartDate;
                initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
                manipulateDatePicker(elementID, dateValue);
            });

        }, 500);
    })

    $(document).on('shown.bs.modal', '#modal_project_management_board', function () {
        $("#tableManHours").DataTable().columns.adjust().draw();
    });
    // ----- END CLICK EMPLOYEE PROFILE -----


    // ----- EMPLOYEE MAN HOURS -----
    $(document).on("keyup", `[name="employeeManHours"]`, function() {
        const elementID = "#"+$(this).attr("id");
        const manHours  = getNonFormattedAmount($(this).val());

        let remainingManHours = $(this).closest(`tbody#remainingManHours`).attr("remainingManHours");
        const remaining = getNonFormattedAmount(remainingManHours);

        const isOvertime = $(this).attr("isOvertime") == "true";
        const duration   = +$(this).attr("duration");

        $parent = $(this).closest("tr");

        // ----- COMPUTE REGULAR AND OVERTIME HOURS -----
        let regularHours = 0, overtimeHours = 0;
        if (isOvertime) {
            overtimeHours = manHours;
        } else {
            if (manHours > duration) {
                regularHours  = duration;
                overtimeHours = manHours - regularHours;
            } else {
                regularHours = manHours;
            }
        }
        $parent.find(`[name="regularHours"]`).val(formatAmount(regularHours || 0));
        $parent.find(`[name="overtimeHours"]`).val(formatAmount(overtimeHours || 0));
        // ----- END COMPUTE REGULAR AND OVERTIME HOURS -----

        $table = $(this).closest("table#tableManHours");

        setTimeout(() => {
            checkRemainingManHours($table, elementID, remaining);
        }, 10);
    })
    // ----- END EMPLOYEE MAN HOURS -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const timelineBuilderID = decryptString($(this).attr("id"));
        setTimeout(() => {
            viewDocument(timelineBuilderID);
        }, 50);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
        formButtonHTML(this);
		const id = decryptString($(this).attr("timelineBuilderID"));
        setTimeout(() => {
            validateInputs().then(res => {
                if (res) {
                    saveProjectBoard("submit", id, pageContent);
                }
                formButtonHTML(this, false);
            })
        }, 10);
	});
	// ----- END CLICK BUTTON SUBMIT -----


    // ----- CLICK BUTTON BACK -----
	$(document).on("click", "#btnBack, #btnCancel", function () {
        const id     = decryptString($(this).attr("timelineBuilderID"));
		const status = $(this).attr("status");

		if (status != "false" && status != 0 && status != 1) {
            $("#page_content").html(preloader);
            setTimeout(() => {
                pageContent();
            }, 50);

		} else {
            saveProjectBoard("save", id, pageContent);
		}
	});
	// ----- END CLICK BUTTON BACK -----


    // ----- GET PROJECT BOARD DATA -----
    const getProjectBoardData = (timelineBuilderID = 0, method = "save") => {
        let data = {
            timelineBuilderID,
            timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
            tasks: []
        };

        $(`[name="manHours"]`).each(function() {
            const index = $(this).attr("index");

            const taskID              = $(this).attr("taskID") ?? "";
            const projectMilestoneID  = $(this).attr("milestoneID") ?? "";
            const assignEmployee      = $(this).attr("employees") ?? "";
            const assignDesignation   = $(this).attr("designations") ?? "";
            const assignManHours      = $(this).attr("manHours") ?? "";
            const assignStartDate     = $(this).attr("dates");
            const assignEndDate       = $(this).attr("dates");
            const assignRegularHours  = $(this).attr("regularHours");
            const assignOvertimeHours = $(this).attr("overtimeHours");


            const newManHours = assignManHours
                .split(/~/i)
                .map(i => i.split("|"))
                .reduce((a, b) => [...a, ...b])
                .reduce((x, y) => (+x) + (+y), 0);

            const temp = {
                taskID,
                projectMilestoneID,
                manHours:              newManHours,
                assignedEmployee:      assignEmployee,
                assignedManHours:      assignManHours,
                assignedDesignation:   assignDesignation,
                assignedStartDate:     assignStartDate,
                assignedEndDate:       assignEndDate,
                assignedRegularHours:  assignRegularHours,
                assignedOvertimeHours: assignOvertimeHours,
            };
            data.tasks.push(temp);
        })
        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- GET CONFIRMATION ------
    const getConfirmation = method => {
        const title = "Project Board";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit these tasks with man hours to the next phase?";
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
    // ----- END GET CONFIRMATION ------


    // ----- SAVE PROJECT BOARD -----
    function saveProjectBoard(method = "submit", id = 0, callback = null) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    }).then(function() {
                        callback && callback();
                    });
                } else {

                    const data = getProjectBoardData(id, method);
                    $.ajax({
                        method:      "POST",
                        url:         `project_management_board/saveProjectBoard`,
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
                                swalTitle = `Project Board submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `Project Board saved successfully!`;
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
                                    }).then(function() {
                                        preventRefresh(false);
                                        window.location.reload();
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
                            Swal.fire({
                                icon:              'success',
                                title:             "Process successfully discarded!",
                                showConfirmButton: false,
                                timer:             2000
                            }).then(function() {
                                callback && callback();
                            });
                        }
                    } 
                }
            }
        });
    }
    // ----- END SAVE PROJECT BOARD -----


})