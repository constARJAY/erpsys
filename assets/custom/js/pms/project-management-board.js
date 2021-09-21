$(document).ready(function() {

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
    const allowedUpdate = isUpdateAllowed(92);

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}

    const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
    // ----- END REUSABLE VARIABLE/FUNCTIONS -----


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
    // ----- END VIEW DOCUMENT -----


    // ----- TIMELINE DATA -----
    const getTimelineData = () => {
        const data = getTableData(
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
        return data;
    }
    // ----- END TIMELINE DATA -----
    

    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableTimeline")) {
			$("#tableTimeline").DataTable().destroy();
		}

        if ($.fn.DataTable.isDataTable("#tableManHours")) {
			$("#tableManHours").DataTable().destroy();
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
					{ targets: 1, width: 250 },
					{ targets: 2, width: 100 },
					{ targets: 3, width: 100 },
					{ targets: 4, width: 100 },
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
                        { targets: 0, width: 480 },
                        { targets: 1, width: 90  },
                        { targets: 2, width: 400 },
                    ],
                });
        }

        $("#tableManHours").DataTable().columns.adjust().draw();
    }
    // ----- END DATATABLES -----


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

        const timelineData = getTimelineData();

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

        return html;
    }
    // ----- END TIMELINE CONTENT ------


    // ----- CLICK TASK NAME OR CARET -----
    $(document).on("click", ".btnCaret", function() {
        $parent  = $(this).closest("tr");
        const taskID   = $(this).attr("taskID");
        const phase    = $(this).attr("phase");
        const display  = $(this).attr("display") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
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


    // ----- DISPLAY ASSIGNED EMPLOYEE -----
    const displayAssignedEmployee = (employees = [], phase = null, taskID = null, isDisabled = false) => {
        const isReadOnly = isDisabled ? "true" : "false";
        let html = "";
        if (employees.length > 0 && phase && taskID) {
            employees.map((employee, index) => {
                const { id, fullname, image } = employee;
                // if (index <= 5) {
                    html += `
                    <img src="${image}" 
                        class="rounded rounded-circle employeeProfile" 
                        style="width: 50px; height: 50px; cursor: pointer;"
                        title="${fullname}"
                        phase="${phase}"
                        taskID="${taskID}"
                        employeeID="${id}"
                        isReadOnly="${isReadOnly}">`;
            })
        } else {
            html += `<span>No data available yet.</span>`;
        }
        $(`.assignedMembers[phase="${phase}"][taskID="${taskID}"]`).html(html);
    }
    // ----- END DISPLAY ASSIGNED EMPLOYEE -----


    // ----- CLICK EMPLOYEE PROFILE -----
    function getTaskMilestone(phase = null, taskID = null, employeeData = {}, isReadOnly = false) {
        const {
            employeeID = "",
            fullname   = "",
            image      = ""
        } = employeeData;

        let milestones = [];
        $(`[name="milestoneName"][taskID="${taskID}"]`).each(function() {
            const index = $(this).attr("index");
            const projectMilestoneID = $(this).attr("projectMilestoneID");
            const milestoneName = $(this).val()?.trim();
            let assignedEmployee = $(`#manHours${index}`).attr("employees");
                assignedEmployee = assignedEmployee ? assignedEmployee.split("|") : [];
            let assignedManHours = $(`#manHours${index}`).attr("manHours");
                assignedManHours = assignedManHours ? assignedManHours.split("|") : [];
            let assignedStart    = $(`#manHours${index}`).attr("startDate");
                assignedStart    = assignedStart ? assignedStart.split("|") : [];
            let assignedEnd      = $(`#manHours${index}`).attr("endDate");
                assignedEnd      = assignedEnd ? assignedEnd.split("|") : [];
            let assignedDuration = $(`#manHours${index}`).attr("days");
                assignedDuration = assignedDuration ? assignedDuration.split("|") : [];
            let assignedRegularHours  = $(`#manHours${index}`).attr("days");
                assignedRegularHours  = assignedRegularHours ? assignedRegularHours.split("|") : [];
            let assignedOvertimeHours = $(`#manHours${index}`).attr("days");
                assignedOvertimeHours = assignedOvertimeHours ? assignedOvertimeHours.split("|") : [];
            const employeeIndex = assignedEmployee.indexOf(employeeID);
            const manHours  = assignedManHours[employeeIndex];
            const startDate = assignedStart[employeeIndex];
            const endDate   = assignedEnd[employeeIndex];
            const duration  = assignedDuration[employeeIndex];
            const regularHours  = assignedRegularHours[employeeIndex];
            const overtimeHours = assignedOvertimeHours[employeeIndex];

            assignedEmployee.includes(employeeID) && milestones.push({index, milestoneName, manHours, projectMilestoneID, startDate, endDate, duration, regularHours, overtimeHours});
        });

        let tbodyHTML = "";
        milestones.map(milestone => {
            const { 
                index, 
                milestoneName, 
                manHours = 0, 
                projectMilestoneID, 
                startDate = moment(new Date).format("YYYY-MM-DD"), 
                endDate   = moment(new Date).format("YYYY-MM-DD"),
                duration  = 1,
                regularHours  = "0",
                overtimeHours = "0"
            } = milestone;

            tbodyHTML += `
            <tr manhoursid="${index}">
                <td>${milestoneName}</td>
                <td>
                    <div class="form-group my-1">
                        <input type="button"
                            class="form-control validate employeeDateRange"
                            name="employeeDateRange"
                            startDate="${startDate}"
                            endDate="${endDate}"
                            days="${duration}"
                            required
                            ${isReadOnly ? "disabled" : ""}>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group my-1">
                        <input class="form-control input-hours text-center employeeManHours"
                            value="${manHours}"
                            name="employeeManHours"
                            min="0.00"
                            max="${(duration * 24)}"
                            minlength="1"
                            maxlength="10"
                            phase="${phase}"
                            taskID="${taskID}"
                            projectMilestoneID="${projectMilestoneID}"
                            employeeID="${employeeID}"
                            startDate="${startDate}"
                            endDate="${endDate}"
                            days="${duration}"
                            index="${index}"
                            regularHours="${regularHours}"
                            overtimeHours="${overtimeHours}"
                            ${isReadOnly ? "disabled" : ""}
                            required>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="regularHours"
                        disabled>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="overtimeHours"
                        disabled>
                </td>
            </tr>`;
        })

        let footerHTML = !isReadOnly ? `
        <div class="modal-footer">
            <div class="w-100 text-right">
                <button class="btn btn-save px-5 py-2" 
                    id="btnSaveManHours"
                    employeeID="${employeeID}"
                    phase="${phase}"
                    taskID="${taskID}">
                    <i class="fas fa-save"></i> Save
                </button>
                <button class="btn btn-cancel px-5 py-2" 
                    data-dismiss="modal">
                    <i class="fas fa-ban"></i> Cancel
                </button>
            </div>
        </div>` : "";

        let html = `
        <div class="row p-3">
            <div class="col-12">
                <div class="d-flex justify-content-start align-items-center mb-3 px-2">
                    <img src="${image}"
                        class="rounded-circle"
                        style="width: 50px; height: 50px;"
                        alt="${fullname}">
                    <span class="font-weight-bold ml-2 h5">${fullname}</span>
                </div>
            </div>
            <div class="col-12">
                <table class="table table-striped" id="tableManHours">
                    <thead>
                        <tr>
                            <th>Milestones</th>
                            <th>Date Range ${!isReadOnly ? "<code>*</code>" : ""}</th>
                            <th>Man Hours ${!isReadOnly ? "<code>*</code>" : ""}</th>
                            <th>Regular Hours</th>
                            <th>Overtime Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tbodyHTML}
                    </tbody>
                </table>
            </div>
        </div>
        ${footerHTML}`;

        return html;
    }


    // ----- KEYUP MANHOURS -----
    $(document).on("keyup", `[name="employeeManHours"]`, function() {
        $parent = $(this).closest("tr");
        const days = $(this).attr("days");
        const regularHours = days * 8;
        const manHours = getNonFormattedAmount($(this).val());

        let inRegularHours  = manHours; 
        let inOvertimeHours = 0;
        if (manHours > regularHours) {
            inOvertimeHours = manHours - regularHours;
            inRegularHours  = manHours - inOvertimeHours;
        }

        $parent.find(`[name="regularHours"]`).val(formatAmount(inRegularHours));
        $parent.find(`[name="overtimeHours"]`).val(formatAmount(inOvertimeHours));
    })
    // ----- END KEYUP MANHOURS -----


    $(document).on("click", "#btnSaveManHours", function() {
        const employeeID = $(this).attr("employeeID");
        const phase      = $(this).attr("phase");
        const taskID     = $(this).attr("taskID");

        let milestones = [];
        $(`[name="employeeManHours"]`).each(function() {
            $parent = $(this).closest("tr");
            const manHours = getNonFormattedAmount($(this).val()) || 0;
            const index = $parent.attr("manhoursid");
            const projectMilestoneID = $(this).attr("projectMilestoneID");

            const startDate = $(this).attr("startDate");
            const endDate   = $(this).attr("endDate");
            const duration  = $(this).attr("days");
            const regularHours = (+duration) * 8;
            let inRegularHours  = manHours; 
            let inOvertimeHours = 0;
            if (manHours > regularHours) {
                inOvertimeHours = manHours - regularHours;
                inRegularHours  = manHours - inOvertimeHours;
            }

            let temp = {
                index, 
                projectMilestoneID, 
                manHours, 
                startDate, 
                endDate, 
                duration, 
                regularHours: inRegularHours, 
                overtimeHours: inOvertimeHours
            };
            milestones.push(temp);
        })
        
        milestones.map(milestone => {
            const { index, projectMilestoneID, manHours, startDate, endDate, duration, regularHours, overtimeHours } = milestone;
            const selector = `[name="manHours"][phase="${phase}"][taskID="${taskID}"][index="${index}"]`;
            const assignedEmployee = $(selector).attr("employees").split("|");
            const employeeIndex    = assignedEmployee.indexOf(employeeID);
            let manHoursArr = $(selector).attr("manHours")?.split("|");
            manHoursArr[employeeIndex] = manHours;
            let totalManHours = manHoursArr.reduce((a,b) => (+a)+(+b),0);
            $(selector).attr("manHours", manHoursArr.join("|"));

            let startDateArr = $(selector).attr("startDate")?.split("|");
            startDateArr[employeeIndex] = startDate;
            $(selector).attr("startDate", startDateArr.join("|"));

            let endDateArr = $(selector).attr("endDate")?.split("|");
            endDateArr[employeeIndex] = endDate;
            $(selector).attr("endDate", endDateArr.join("|"));

            let durationArr = $(selector).attr("days")?.split("|");
            durationArr[employeeIndex] = duration;
            $(selector).attr("days", durationArr.join("|"));

            let regularArr = $(selector).attr("regularHours")?.split("|");
            regularArr[employeeIndex] = regularHours;
            $(selector).attr("regularHours", regularArr.join("|"));

            let overtimeArr = $(selector).attr("overtimeHours")?.split("|");
            overtimeArr[employeeIndex] = overtimeHours;
            $(selector).attr("overtimeHours", overtimeArr.join("|"));
            
            $(selector).val(totalManHours.toString()).trigger("keyup");
        })

        $(`#modal_project_management_board`).modal("hide");
    })

    function dateRange(input) {
        const elementID = input ? `#${input.id}` : "[name=employeeDateRange]";
        
        const employeeDateRangeFrom = $(elementID).attr("startDate") || moment(new Date).format("YYYY-MM-DD");
        const employeeDateRangeTo   = $(elementID).attr("endDate") || moment(new Date).format("YYYY-MM-DD");
        let duration = moment.duration(moment(employeeDateRangeTo, "YYYY-MM-DD").diff(moment(employeeDateRangeFrom, "YYYY-MM-DD"))).asDays() + 1;

        const options = {
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            startDate: moment(employeeDateRangeFrom),
            endDate:   moment(employeeDateRangeTo),
        }
        const displayDate = `${moment(employeeDateRangeFrom).format("MMMM DD, YYYY")} - ${moment(employeeDateRangeTo).format("MMMM DD, YYYY")}`;
        $(elementID).attr("startDate", employeeDateRangeFrom);
        $(elementID).attr("endDate", employeeDateRangeTo);
        $(elementID).attr("max", (duration * 24));
        $(elementID).attr("days", duration);
        $(elementID).val(displayDate);

        $parent = $(elementID).closest("tr");
        const index = $parent.attr("index");
        $(`#employeeManHours${index}`).attr("startDate", employeeDateRangeFrom);
        $(`#employeeManHours${index}`).attr("endDate", employeeDateRangeTo);
        $(`#employeeManHours${index}`).attr("max", (duration * 24));
        $(`#employeeManHours${index}`).attr("days", duration);
        $(`#employeeManHours${index}`).trigger("keyup");
        
        $(elementID).daterangepicker(options, function (start, end) {
            if (start && end) {
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
                const displayDate = `${moment(start).format("MMMM DD, YYYY")} - ${moment(end).format("MMMM DD, YYYY")}`;

                let formatStart = moment(start).format("YYYY-MM-DD");
                let formatEnd   = moment(end).format("YYYY-MM-DD");
                let duration = moment.duration(moment(formatEnd, "YYYY-MM-DD").diff(moment(formatStart, "YYYY-MM-DD"))).asDays() + 1;

                console.log(`#employeeManHours${index}`);
                $(elementID).attr("startDate", formatStart);
                $(elementID).attr("endDate", formatEnd);
                $(elementID).attr("max", (duration * 24));
                $(elementID).attr("days", duration);
                $(elementID).val(displayDate);

                $(`#employeeManHours${index}`).attr("startDate", formatStart);
                $(`#employeeManHours${index}`).attr("endDate", formatEnd);
                $(`#employeeManHours${index}`).attr("max", (duration * 24));
                $(`#employeeManHours${index}`).attr("days", duration);
                $(`#employeeManHours${index}`).trigger("keyup");
            }
        });
    }

    $(document).on("click", `.employeeProfile`, function() {
        const isReadOnly = $(this).attr("isReadOnly") == "true";
        const phase   = $(this).attr("phase");
        const taskID  = $(this).attr("taskID");
        const employeeID = $(this).attr("employeeID");
        const fullname   = $(this).attr("title");
        const image      = $(this).attr("src");
        let content = getTaskMilestone(phase, taskID, {employeeID, fullname, image}, isReadOnly);
        let title = isReadOnly ? "ASSIGNED MAN HOURS" : "ASSIGN MAN HOURS";
        $(`#modal_project_management_board .page-title`).text(title);
        $(`#modal_project_management_board_content`).html(content);
        $(`#modal_project_management_board`).modal("show");
        initHours();
        initDatatables();
        
        updateTables();
        $(`.employeeDateRange`).each(function(i) {
            $parent = $(this).closest("tr");
            $(this).attr("id", `employeeDateRange${i}`);
            $parent.attr("index", i);

            $parent.find(`[name="employeeManHours"]`, this).attr("id", `employeeManHours${i}`);
            $parent.find(`[name="employeeManHours"]`, this).attr("index", `${i}`);

            dateRange(this);
            !isReadOnly && $parent.find(`[name="employeeManHours"]`, this).trigger("keyup");
        })
    })

    $(document).on('shown.bs.modal', '#modal_project_management_board', function () {
        $("#tableManHours").DataTable().columns.adjust().draw();
    });
    // ----- END CLICK EMPLOYEE PROFILE -----


    // ----- SELECT ASSIGNED EMPLOYEE -----
    const getAssignedEmployee = (phase = null, taskID = null) => {
        let employees = [];
        if (phase && taskID) {
            $(`[name="assignEmployee"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
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

    function getDifferentEmployeeID(oldEmployeeArr = [], newEmployeeArr = []) {
        let oldArrCount = oldEmployeeArr.length;
        let newArrCount = newEmployeeArr.length;
        let first  = oldArrCount > newArrCount ? oldEmployeeArr : newEmployeeArr;
        let second = oldArrCount > newArrCount ? newEmployeeArr : oldEmployeeArr;

        let index = first.filter(x => second.indexOf(x) === -1);
        return index ? index[0] : 0;
    }

    function updateManHoursValue(index = 0) {
        let manHours = $(`#manHours${index}`).attr("manHours");
            manHours = manHours ? manHours.split("|") : [];
        let totalManHours = manHours.reduce((a,b) => (+a)+(+b), 0);
        $(`#manHours${index}`).val(totalManHours).trigger("keyup");
    }

    $(document).on("change", `[name="assignEmployee"]`, function() {
        const index   = $(this).attr("index");
        const phase   = $(this).attr("phase");
        const taskID  = $(this).attr("taskID");
        const employees  = getAssignedEmployee(phase, taskID);
        const employeeID = $(this).val() || [];
        const isDisabled = $(this).attr("disabled");
        displayAssignedEmployee(employees, phase, taskID, isDisabled);

        const selector = `[phase="${phase}"][taskID="${taskID}"][name="manHours"][index="${index}"]`;

        const executeonce = $(this).attr("executeonce") == "true";
        if (!executeonce) {
            const oldEmployees    = $(selector).attr("employees") || false;
            const oldEmployeesArr = oldEmployees ? oldEmployees.split("|") : [];
            const isOnAdd = employeeID.length > oldEmployeesArr.length;
            const diffEmployeeID = getDifferentEmployeeID(oldEmployeesArr, employeeID);
            const oldManHours = $(selector).attr("manHours") || "";

            // ----- SET NEW MAN HOURS -----
            let newManHoursArr = oldManHours ? oldManHours.split("|") : [];
            let tempArr        = isOnAdd ? employeeID : oldEmployeesArr;
            let employeeIndex  = tempArr.indexOf(diffEmployeeID);
                employeeIndex  = employeeIndex != -1 ? employeeIndex : 0;

            if (employeeIndex >= 0 && !isOnAdd) {
                newManHoursArr.splice(employeeIndex, 1);
            } else {
                if (isOnAdd) {
                    newManHoursArr.splice(employeeIndex, 0, "0");
                }
                else {
                    newManHoursArr.splice(employeeIndex, 1, "0");
                }
            }
            newManHoursArr = newManHoursArr.join("|");

            $(selector).attr("manHours", newManHoursArr);
            // ----- END SET NEW MAN HOURS -----

            $(selector).attr("employees", employeeID.join("|"));

            $(this).attr("assignedemployee", employeeID.join("|"));
            $(this).attr("assignedManHours", newManHoursArr);

            updateManHoursValue(index);
            
            $parent = $(this).closest(".form-group");
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
    // ----- END SELECT ASSIGNED EMPLOYEE -----


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


    // ----- DISPLAY PHASE -----
    function displayPhase(teamMembers = {}, phase = {}, index = 0, disabled) {
        const {
            phaseDescription,
            phaseCode,
            milestones = [],
            tasks      = []
        } = phase;

        const getTaskContent = (taskID = null, taskName = null, milestoneTask = []) => {
            let taskNameContent     = ""; 
            let taskManHoursContent = ""; 
            let taskAssigneeContent = "";

            const taskData = (milestoneID = null) => {
                let data = milestoneTask.filter(mt => mt.milestoneID == milestoneID);
                let manHours              = "0", 
                    assignedEmployee      = "", 
                    assignedDesignation   = "", 
                    assignedManHours      = "",
                    assignedStartDate     = "", 
                    assignedEndDate       = "", 
                    assignedDays          = "1";
                    assignedRegularHours  = "0";
                    assignedOvertimeHours = "0";
                if (data && data.length > 0) {
                    manHours              = data[0]?.manHours;
                    assignedEmployee      = data[0]?.assignedEmployee;
                    assignedDesignation   = data[0]?.assignedDesignation;
                    assignedManHours      = data[0]?.assignedManHours;
                    assignedStartDate     = data[0]?.assignedStartDate;
                    assignedEndDate       = data[0]?.assignedEndDate;
                    assignedDays          = data[0]?.assignedDays;
                    assignedRegularHours  = data[0]?.assignedRegularHours;
                    assignedOvertimeHours = data[0]?.assignedOvertimeHours;
                }
                return {manHours, assignedEmployee, assignedDesignation, assignedManHours, assignedStartDate, assignedEndDate, assignedDays, assignedRegularHours, assignedOvertimeHours};
            };

            milestones.map(milestone => {
                const { milestoneID, milestoneName } = milestone;
                const { manHours, assignedEmployee, assignedManHours, assignedStartDate, assignedEndDate, assignedDays = "1", assignedRegularHours = "0", assignedOvertimeHours = "0" } = taskData(milestoneID);

                taskNameContent += `
                <div class="form-group my-1">
                    <input class="form-control"
                        name="milestoneName"
                        taskID="${taskID}"
                        projectMilestoneID="${milestoneID}"
                        value="&emsp;&emsp;${milestoneName}"
                        disabled>
                </div>`;
    
                taskManHoursContent += `
                <div class="form-group my-1">
                    <input class="form-control custom-input-hours text-center"
                        value="${manHours}"
                        name="manHours"
                        min="0.00"
                        max="9999999999"
                        minlength="1"
                        maxlength="10"
                        taskID="${taskID}"
                        phase="${phaseCode}"
                        readonly
                        employees="${assignedEmployee}"
                        manHours="${assignedManHours}"
                        startDate="${assignedStartDate || moment(new Date).format("YYYY-MM-DD")}"
                        endDate="${assignedEndDate || moment(new Date).format("YYYY-MM-DD")}"
                        days="${assignedDays}"
                        regularHours="${assignedRegularHours}"
                        overtimeHours="${assignedOvertimeHours}"
                        required>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
    
                const teamMemberOptions = teamMembers.map(member => {
                    const { id, fullname, image, designation } = member;
                    
                    return `
                    <option 
                        value    = "${id}"
                        fullname = "${fullname}"
                        image    = "${image}"
                        designation = "${designation}">${fullname}</option>`;
                }).join("");

                taskAssigneeContent += `
                <div class="form-group my-1">
                    <select class="form-control validate select2"
                        name="assignEmployee"
                        multiple="multiple"
                        phase="${phaseCode}"
                        taskID="${taskID}"
                        assignedEmployee="${assignedEmployee}"
                        executeonce="true"
                        ${disabled}>
                        <option disabled>${!disabled ? "Select Employee" : "-"}</option>
                        ${teamMemberOptions}
                    </select>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
            })

            return [taskNameContent, taskManHoursContent, taskAssigneeContent];
        }

        let taskHTML = "";
        tasks.map(task => {
            const { taskID, taskName, manHours, milestoneTask = [] } = task;

            const taskContent = getTaskContent(taskID, taskName, milestoneTask);

            taskHTML += `
            <tr>   
                <td style="position: relative;">    
                    <div class="d-flex align-items-center justify-content-between btnCaret" 
                        phase    = "${phaseCode}"
                        taskID="${taskID}"
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
                        taskID="${taskID}"
                        style    = "margin-top: 70px;">
                        ${taskContent[0]}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center" 
                        phase    = "${phaseCode}"
                        taskID="${taskID}"
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
                            taskID="${taskID}"
                            disabled>
                    </div>
                    <div class="d-none taskContent" 
                        phase    = "${phaseCode}"
                        taskID="${taskID}"
                        style    = "margin-top: 70px;">
                        ${taskContent[1]}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-start" 
                        phase    = "${phaseCode}"
                        taskID="${taskID}"
                        style="
                            min-height: 70px;
                            height: auto;
                            max-height: 70px;
                            padding: 1rem;
                            top: 0">
                        <div class="assignedMembers" 
                            taskID="${taskID}" 
                            phase="${phaseCode}"
                            style="position: absolute;
                                top: 0;
                                margin-top: 10px;">
                            <span>No data available yet.</span>
                        </div>
                    </div>
                    
                    <div class="d-none taskContent" 
                        phase    = "${phaseCode}"
                        taskID="${taskID}">
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
    // ----- END DISPLAY PHASE -----


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


    // ----- KEYUP MAN HOURS -----
    $(document).on("keyup", `[name="manHours"]`, function() {
        const phase     = $(this).attr("phase");
        const taskID    = $(this).attr("taskID");
        const elementID = "#"+$(this).attr("id");

        validateManHours(phase, taskID, elementID);
    })
    // ----- END KEYUP MAN HOURS -----


    // ----- FORM BUTTON -----
    function formButtons(data = false) {
        let button = "";
        if (data) {
            const {
                timelineBuilderID     = "",
                timelineManagementStatus = false,
                employeeID            = "",
                approversID           = "",
                approversDate         = "",
                createdAt              = new Date
            } = data && data[0];

            if (timelineManagementStatus == 0 || timelineManagementStatus == 1) { // DRAFT OR FOR ASSESSMENT
                button = `
                <button 
                    class="btn btn-submit px-5 p-2"  
                    id="btnSubmit" 
                    timelineBuilderID="${encryptString(timelineBuilderID)}"
                    code="${getFormCode("TL", createdAt, timelineBuilderID)}"
                    status="${timelineManagementStatus}">
                    <i class="fas fa-paper-plane"></i> Submit
                </button>
                <button 
                    class="btn btn-cancel px-5 p-2"
                    id="btnCancel" 
                    timelineBuilderID="${encryptString(timelineBuilderID)}"
                    code="${getFormCode("TL", createdAt, timelineBuilderID)}"
                    status="${timelineManagementStatus}">
                    <i class="fas fa-ban"></i> Cancel
                </button>`;

            } 
        }

        return button;
    }
    // ----- END FORM BUTTON -----


    // ----- INPUTMASK HOURS -----
    function inputmaskHours() {
        $(".custom-input-hours").inputmask({
            alias: "currency",
            prefix: "",
            allowMinus: false,
            allowPlus:  false,
        });
    }
    // ----- END INPUTMASK HOURS -----


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
            `employeeID, designationID, employeeFirstname, employeeLastname, employeeProfile`,
            `FIND_IN_SET(employeeID, "${membersID}")`
        ).map(member => {
            const { 
                employeeID, 
                designationID,
                employeeFirstname, 
                employeeLastname, 
                employeeProfile = "default.jpg"
            } = member;
            return {
                id:          employeeID,
                fullname:    `${employeeFirstname} ${employeeLastname}`,
                designation: designationID,
                image:       `${base_url}/assets/upload-files/profile-images/${employeeProfile}`
            }
        });

        $("#btnBack").attr("timelineBuilderID", encryptString(timelineBuilderID));
		$("#btnBack").attr("status", timelineManagementStatus);

        const disabled = readOnly ? "disabled" : "";

        let button = !disabled ? formButtons(data) : "";

        let phaseHTML = "";
        phases.map((phase, index) => {
            phaseHTML += displayPhase(teamMembers, phase, index, disabled);
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
            inputmaskHours();

            $(`[name="assignEmployee"]`).each(function() {
                $assignedEmployee = $(this).attr("assignedEmployee");
                const assignedEmployeeArr = $assignedEmployee?.split("|");
                $assignedEmployee && $(this).val(assignedEmployeeArr).trigger("change");
            })
            $(`[name="assignEmployee"]`).attr("executeonce", "false");  

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
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const timelineBuilderID = decryptString($(this).attr("id"));
        setTimeout(() => {
            viewDocument(timelineBuilderID);
        }, 50);
    })
    // ----- END CLICK TIMELINE ROW -----


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


    // ----- VALIDATE MAN HOURS -----
    function validateManHours(phase = "", taskID = "", elementID = null) {
        const checkManHours = (phase, taskID, elementID, all = false) => {
            const $parent = $(elementID).closest(".form-group");
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
                const id       = "#"+$(this).attr("id");
                const phase    = $(this).attr("phase");
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
            });
        }, 10);
	});
	// ----- END CLICK BUTTON SUBMIT -----


    // ----- CLICK BUTTON CANCEL -----
    // $(document).on("click", "#btnCancel", function() {
    //     saveProjectBoard("cancel", null, pageContent);
    // })
    // ----- END CLICK BUTTON CANCEL -----


    // ----- GET PROJECT BOARD DATA -----
    const getProjectBoardData = (timelineBuilderID = 0, method = "save") => {
        let data = {
            timelineBuilderID,
            timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
            tasks: []
        };

        $(`[name="milestoneName"]`).each(function(i) {
            const index = $(this).attr("index");

            const taskID = $(`[name="milestoneName"][index="${index}"]`).attr("taskID");
            const projectMilestoneID = $(`[name="milestoneName"][index="${index}"]`).attr("projectMilestoneID");
            const manHours       = getNonFormattedAmount($(`[name="manHours"][index="${index}"]`).val());
            let assignEmployee = $(`[name="assignEmployee"][index="${index}"]`).val();
            let assignDesignation = [];
            assignEmployee.map((_, i) => {
                const designationID = $(`[name="assignEmployee"][index="${index}"] option:selected`).eq(i).attr("designation") || "";
                assignDesignation.push(designationID);
            })
            assignEmployee          = assignEmployee.join("|");
            assignDesignation       = assignDesignation.join("|");
            let assignManHours      = $(`#manHours${index}`).attr("manHours") || "";
            let assignStartDate     = $(`#manHours${index}`).attr("startDate") || "";
            let assignEndDate       = $(`#manHours${index}`).attr("endDate") || "";
            let assignDays          = $(`#manHours${index}`).attr("days") || "";
            let assingRegularHours  = $(`#manHours${index}`).attr("regularHours") || "";
            let assingOvertimeHours = $(`#manHours${index}`).attr("overtimeHours") || "";


            const temp = {
                taskID, projectMilestoneID, manHours, assignEmployee, assignDesignation, assignManHours, assignStartDate, assignEndDate, assignDays, assingRegularHours, assingOvertimeHours
            };
            data.tasks.push(temp);
        })
        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- DATABASE RELATION -----
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

    function saveProjectBoard(method = "submit", id = 0, callback = null) {
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
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("PO", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("PO", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("PO", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("PO", dateCreated, insertedID)} dropped successfully!`;
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
                            callback && callback();
                            Swal.fire({
                                icon:              'success',
                                title:             "Process successfully discarded!",
                                showConfirmButton: false,
                                timer:             2000
                            });
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
    // ----- END DATABASE RELATION -----

})