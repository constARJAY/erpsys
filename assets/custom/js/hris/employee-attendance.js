$(document).ready(function() {

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableEmployeeAttendance')){
            $('#tableEmployeeAttendance').DataTable().destroy();
        }

        var table = $("#tableEmployeeAttendance").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            lengthMenu: [
                [50, 100, 150, 200, -1   ],
                [50, 100, 150, 200, "All"],
            ],
            columnDefs: [
                { targets: 0, width: 10  },
                { targets: 1, width: 150 },
                { targets: 2, width: 120 },
                { targets: 3, width: 120 },
                { targets: 4, width: 60  },
                { targets: 5, width: 60  },
                { targets: 6, width: 60  },
            ],
        });
    }
    // ----- END DATATABLES -----


    // ----- GET UPDATED TIMESHEET SERIES -----
    function getUpdatedTimesheetData(scheduleIn = "", scheduleDuration = 0, checkIn = "") {
        let seriesValue = 0, hours = 0;
        if (scheduleIn && scheduleDuration && checkIn) {
            let mScheduleIn = moment(scheduleIn);
            let mCheckIn    = moment(checkIn);
            let duration = moment.duration(mCheckIn.diff(mScheduleIn));
            hours = duration.asHours();
            hours = hours.toFixed(2);
            if (hours < 0) {
                hours       = 0;
                seriesValue = 0;
            } else {
                duration = moment.duration(moment().diff(mCheckIn));
                hours = duration.asHours();
                hours = hours.toFixed(2);
                seriesValue = hours/scheduleDuration*100;
                seriesValue = seriesValue.toFixed(2);
            }
            hours = scheduleDuration >= hours && hours <= scheduleDuration ? hours : scheduleDuration;
        }
        return { series: seriesValue, label: hours };
    }
    // ----- END GET UPDATED TIMESHEET SERIES -----


    // ----- TIMESHEET CHART -----
    function timesheetChart(scheduleIn = "", scheduleOut = "", scheduleDuration = "", checkIn = "", checkOut = "", checkDuration = "") {

        let seriesValue = 0;
        var options = {
            redrawOnParentResize: true,
            chart: {
                height: 250,
                type: 'radialBar',
            },
            colors: ['#1a1a1a'],
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "70%",
                    }
                },
            },
            series: [seriesValue],
            labels: ['00:00 hours'],
        }
        var chart = new ApexCharts(
            document.querySelector("#timesheetChart"),
            options
        );
    
        chart.render();
        if (scheduleIn && scheduleOut) {

            if (!checkIn && !checkOut) {
                // DISREGARD
            } else if (!checkIn && checkOut) {
                // DISREGARD
            } else if (checkIn && !checkOut) {
                setInterval(() => {
                    let data = getUpdatedTimesheetData(scheduleIn, scheduleDuration, checkIn);
                    let series = data.series;
                    let label  = decimalToHours(data.label);
                    chart.updateSeries([series]);
                    chart.updateOptions({labels: [`${label} hours`]});

                }, 2000);
            } else {
                let series = 0;
                if (parseFloat(scheduleDuration) > 0) {
                    series = (checkDuration/scheduleDuration)*100;
                }
                series = series.toFixed(2);
                let label  = decimalToHours(checkDuration);
                chart.updateSeries([series]);
                chart.updateOptions({labels: [`${label} hours`]});
            }

        }
    }
    // ----- END TIMESHEET CHART -----


    // ----- GET EMPLOYEE ATTENDANCE DATA -----
    function getEmployeeAttendanceModuleData() {
        let employeeID = sessionID;
        let url   = window.document.URL;
        let arr   = url.split("?view_id=");
        if (arr.length > 1) {
            let id = decryptString(arr[1]);
            if (id && isFinite(id)) {
                employeeID = id;
            }
        }

        let result = null;
        $.ajax({
            method: "POST",
            url: "employee_attendance/getEmployeeAttendanceModuleData",
            data: { employeeID },
            dataType: "json",
            async: false,
            success: function(data) {
                result = data;
            }
        })
        return result;
    }
    // ----- END GET EMPLOYEE ATTENDANCE DATA -----


    // ----- DECIMAL TO HOURS -----
    function decimalToHours(decimal = 0.00) {
        if (decimal) {
            const num     = decimal * 60;
            const hours   = Math.floor(num / 60);  
            const minutes = Math.floor(num % 60);
            if (isFinite(hours) && isFinite(minutes)) {
                let hoursDisplay   = hours.toString().length > 1 ? hours : `0${hours}`;
                let minutesDisplay = minutes.toString().length > 1 ? minutes : `0${minutes}`;
                let display = `${hoursDisplay}:${minutesDisplay}`;
                return display;  
            }
        }
        return "00:00";
    }
    // ----- END DECIMAL TO HOURS -----


    // ----- GET TIMESHEET DISPLAY -----
    function getTimesheetDisplay(data = false) {
        let {
            dateToday        = "",
            scheduleIn       = "",
            scheduleOut      = "",
            scheduleDuration = "",
            checkIn          = "",
            checkOut         = "",
            checkDuration    = "",
            checkInDate      = "",
            checkOutDate     = "",
            breakDuration    = "",
            overtimeDuration = "",
        } = data && data["timesheet"];

        let html = `
        <div class="card stats-box"
            style="min-height: 470px;
                height: auto;
                max-height: 550px;">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 style="font-weight: 600">Timesheet</h5>
                    <small class="pl-2 text-muted">${dateToday || "-"}</small>
                </div>
            </div>
            <div class="card-body"
                style="overflow-y: auto;">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="border bg-gray py-2">
                            <div class="d-flex justify-content-center align-items-center flex-column">
                                <h6 class="font-weight-bold">Check In at</h6>
                                <small class="text-muted">${checkInDate || "-"}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-4">
                    <div id="timesheetChart"></div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div class="border bg-gray py-2">
                            <div class="d-flex justify-content-center align-items-center flex-column">
                                <h6 class="font-weight-bold">Break</h6>
                                <small class="text-muted">${decimalToHours(breakDuration)} hours</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="border bg-gray py-2">
                            <div class="d-flex justify-content-center align-items-center flex-column">
                                <h6 class="font-weight-bold">Overtime</h6>
                                <small class="text-muted">${decimalToHours(overtimeDuration)} hours</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END GET TIMESHEET DISPLAY -----


    // ----- GET STATISTICS DISPLAY -----
    function getStatisticsDisplay(data = false) {

        let {
            today = false,
            week  = false,
            month = false,
            overtime = false
        } = data && data["statistics"];

        let {
            checkIn:todayCheckIn   = "",
            checkOut:todayCheckOut = "",
            duration:todayDuration = 0,
            schedule:todaySchedule = 0
        } = today;
        let todayPercentage = (todayDuration/todaySchedule)*100;

        let {
            startDate:weekStartDate = "",
            endDate:weekEndDate     = "",
            duration:weekDuration   = 0,
            schedule:weekSchedule   = 0
        } = week;
        let weekPercentage = (weekDuration/weekSchedule)*100;

        let {
            startDate:monthStartDate = "",
            endDate:monthEndDate     = "",
            duration:monthDuration   = 0,
            schedule:monthSchedule   = 0
        } = month;
        let monthPercentage = (monthDuration/monthSchedule)*100;

        let {
            startDate:overtimeStartDate = "",
            endDate:overtimeEndDate     = "",
            duration:overtimeDuration   = 0,
            schedule:overtimeSchedule   = 0
        } = overtime;
        let overtimePercentage = (overtimeDuration/overtimeSchedule)*100;



        let html = `
        <div class="card stats-box" 
            style="height: 470px;
                max-height: 475px;">
            <div class="card-header">
                <h5 style="font-weight: 600">Statistics</h5>
            </div>
            <div class="card-body"
                style="overflow-y: auto;">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <div class="border py-3">
                            <div class="d-flex flex-column py-2 px-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="font-weight-bold">Today</h6>
                                    <small class="text-muted"><span class="font-weight-bold" style="font-size: 1.03rem;">${todayDuration || "0"}</span> / ${todaySchedule}hrs</small>
                                </div>
                                <div class="progress-container">
                                    <div class="progress">
                                        <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="${todayPercentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${todayPercentage}%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 my-2">
                        <div class="border py-3">
                            <div class="d-flex flex-column py-2 px-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="font-weight-bold">This week</h6>
                                    <small class="text-muted"><span class="font-weight-bold" style="font-size: 1.03rem;">${weekDuration || "0"}</span> / ${weekSchedule.toFixed(2)}hrs</small>
                                </div>
                                <div class="progress-container">
                                    <div class="progress">
                                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${weekPercentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${weekPercentage}%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 my-2">
                        <div class="border py-3">
                            <div class="d-flex flex-column py-2 px-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="font-weight-bold">This month</h6>
                                    <small class="text-muted"><span class="font-weight-bold" style="font-size: 1.03rem;">${monthDuration || "0"}</span> / ${monthSchedule.toFixed(2)}hrs</small>
                                </div>
                                <div class="progress-container">
                                    <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="${monthPercentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${monthPercentage}%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 my-2">
                        <div class="border py-3">
                            <div class="d-flex flex-column py-2 px-3">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="font-weight-bold">Overtime this month</h6>
                                    <small class="text-muted"><span class="font-weight-bold" style="font-size: 1.03rem;">${overtimeDuration || "0"}</span>hrs</small>
                                </div>
                                <div class="progress-container">
                                    <div class="progress">
                                        <div class="progress-bar bg-info" role="progressbar" aria-valuenow="${overtimePercentage}" aria-valuemin="0" aria-valuemax="100" style="width: ${overtimePercentage}%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END GET STATISTICS DISPLAY -----


    // ----- GET TODAY ACTIVITY DISPLAY -----
    function getActivityDisplay(data = false) {
        let activities = data && data["activity"] || [];

        let activityHTML = "";
        if (activities && activities.length > 0) {
            activities.map(act => {
                const {
                    punchDate   = "",
                    punchStatus = "",
                    punchTime   = ""
                } = act;
    
                activityHTML += `
                <div class="timeline-item blue pb-1" date-is='${punchStatus || "-"}'>
                    <h6>${punchDate || "-"}</h6>
                    <small>${punchTime || "-"}</small>
                </div>`;
            })
        } else {
            activityHTML = `
            <div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/no-data.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="No activity yet.">
                <span class="font-weight-bold">No activity yet.</span>
            </div>`;
        }

        let html = `
        <div class="card stats-box" 
            style="height: 474px;
                max-height: 475px;
                overflow-y: auto;">
            <div class="card-header">
                <h5 style="font-weight: 600">Activities</h5>
            </div>
            <div class="card-body"
                style="height: 400px;
                    overflow-y: auto;">
                ${activityHTML}
            </div>
        </div>`;
        return html;
    }
    // ----- END GET TODAY ACTIVITY DISPLAY -----


    // ----- GET EMPLOYEE ATTENDANCE DATA -----
    function getEmployeeAttendanceData(startDate = "", endDate = "") {
        let employeeID = sessionID;
        let url = window.document.URL;
        let arr = url.split("?view_id=");
        if (arr.length > 1) {
            let id = decryptString(arr[1]);
            if (id && isFinite(id)) {
                employeeID = id;
            }
        }

        let result = null;
        $.ajax({
            method: "POST",
            url: "employee_attendance/getEmployeeAttendanceData",
            data: { employeeID, startDate, endDate },
            dataType: "json",
            async: false,
            success: function(data) {
                if (data) {
                    result = { attendance: data };
                }
            }
        })
        return result;
    }
    // ----- END GET EMPLOYEE ATTENDANCE DATA -----


    // ----- GET EMPLOYEE ACTIVITY DATA -----
    function getEmployeeActivityData(startDate = "", endDate = "") {
        let employeeID = sessionID;
        let url = window.document.URL;
        let arr = url.split("?view_id=");
        if (arr.length > 1) {
            let id = decryptString(arr[1]);
            if (id && isFinite(id)) {
                employeeID = id;
            }
        }

        let result = null;
        $.ajax({
            method: "POST",
            url: "employee_attendance/getEmployeeActivityData",
            data: { employeeID, startDate, endDate },
            dataType: "json",
            async: false,
            success: function(data) {
                if (data) {
                    result = { activity: data };
                }
            }
        })
        return result;
    }
    // ----- END GET EMPLOYEE ACTIVITY DATA -----


    // ----- GET EMPLOYEE ATTENDANCE DISPLAY -----
    function getEmployeeAttendanceDisplay(data = false) {
        let attendances = data && data["attendance"] || [];

        let attendanceHTML = "";
        attendances.map((att, index) => {
            let number = index + 1;
            let {
                scheduleDate     = "",
                scheduleDay      = "",
                scheduleTime     = "",
                checkIn          = "",
                checkOut         = "",
                checkReference   = "",
                checkReferenceID = "",
                checkDuration    = "",
                breakDuration    = "",
                overtimeDuration = "",
                overtimeReference   = "",
                overtimeReferenceID = ""
            } = att;
            scheduleDate  = scheduleDate ? moment(scheduleDate).format("MMMM DD, YYYY") : "-";
            checkIn       = checkIn ? moment(checkIn).format("MMMM DD, YYYY hh:mm A") : "-";
            checkOut      = checkOut ? moment(checkOut).format("MMMM DD, YYYY hh:mm A") : "-";

            let inReferenceHTML = checkReference && checkReferenceID && checkIn == "-" ? `
            <a href="${base_url}hris/no_timein_timeout?view_id=${encryptString(checkReferenceID)}"
                target="_blank">
                <small>${checkReference}</small>
            </a>` : "";
            let outReferenceHTML = checkReference && checkReferenceID && checkOut == "-" ? `
            <a href="${base_url}hris/no_timein_timeout?view_id=${encryptString(checkReferenceID)}"
                target="_blank">
                <small>${checkReference}</small>
            </a>` : "";
            let otReferenceHTML = overtimeReference && overtimeReferenceID ? `
            <a href="${base_url}hris/overtime_request?view_id=${encryptString(overtimeReferenceID)}"
                target="_blank">
                <small>${overtimeReference}</small>
            </a>` : "";

            attendanceHTML += `
            <tr>
                <td class="text-center">${number}</td>
                <td>
                    <div>
                        ${scheduleDate || '-'}
                    </div>
                    <small style="color:#848482;">${scheduleDay || "-"} | ${scheduleTime || "-"}</small>
                </td>
                <td>
                    <div>${checkIn}</div>
                    ${inReferenceHTML}
                </td>
                <td>
                    <div>${checkOut}</div>
                    ${outReferenceHTML}    
                </td>
                <td class="text-center">${decimalToHours(checkDuration)} hours</td>
                <td class="text-center">${decimalToHours(breakDuration)} hours</td>
                <td class="text-center">
                    <div>${decimalToHours(overtimeDuration)} hours</div>
                    ${otReferenceHTML}
                </td>
            </tr>`;
        })

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped" id="tableEmployeeAttendance">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Production</th>
                        <th>Break</th>
                        <th>Overtime</th>
                    </tr>
                </thead>
                <tbody>
                    ${attendanceHTML}
                </tbody>
            </table>
        </div>`;
        return html;
    }
    // ----- END GET EMPLOYEE ATTENDANCE DISPLAY -----


    // ----- DATERANGEPICKER -----
    function dateRangePicker() {
        const options = {
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            startDate: moment(),
            endDate:   moment(),
            maxDate:   moment()
        }
        $("#dateRange").daterangepicker(options, function(start, end) {
            let startDate = start.format("YYYY-MM-DD");
            let endDate   = end.format("YYYY-MM-DD");
            let dateDisplay = `${start.format("MMMM DD, YYYY")} - ${end.format("MMMM DD, YYYY")}`
            $("#dateRange").attr("start", startDate);
            $("#dateRange").attr("end", endDate);
            $("#dateRange").val(dateDisplay);
            $("#btnSearch").attr("start", startDate);
            $("#btnSearch").attr("end", endDate);
        });
    }
    // ----- END DATERANGEPICKER -----


    // ----- OVERBREAK DISPLAY -----
    function getOverbreakDisplay(employeeID = 0) {
        let html = '';
        $.ajax({
            method: "POST",
            url: `employee_attendance/getOverbreak`,
            data: { employeeID },
            async: false,
            dataType: "json",
            success: function(data) {
                if (data && data.length) {
                    let breakDuration = data[0].breakDuration ?? 0;
                    html = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Warning!</strong> You have exceeded the allowed break time hours for today. <b>${breakDuration} hours</b>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
                }
            }
        })
        return html;
    }
    // ----- END OVERBREAK DISPLAY -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        $(`#page_content`).html(preloader);

        let employeeID = sessionID;
        let url   = window.document.URL;
        let arr   = url.split("?view_id=");
        if (arr.length > 1) {
            let id = decryptString(arr[1]);
            if (id && isFinite(id)) {
                employeeID = id;
            }
        }
        let displayName = "";
        if (sessionID != employeeID) {
            let data = getTableData(`hris_employee_list_tbl WHERE employeeID = ${employeeID}`, `CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname`);
            if (data) {
                displayName = `<span class="h5 text-muted">(${data[0].fullname})</span>`;
            }
        }


        const employeeAttendance = getEmployeeAttendanceModuleData();
        let date        = moment(new Date).format("YYYY-MM-DD");
        let dateDisplay = moment(new Date).format("MMMM DD, YYYY");
        const dateRange = `${dateDisplay} - ${dateDisplay}`;

        let html = `
        <div class="row p-3">
            <div class="col-sm-12">
                <div id="overbreakNotification">
                    ${getOverbreakDisplay(employeeID)}
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12">
                        ${getTimesheetDisplay(employeeAttendance)}
                    </div>
                    <div class="col-md-4 col-sm-12">
                        ${getStatisticsDisplay(employeeAttendance)}
                    </div>
                    <div class="col-md-4 col-sm-12" id="employeeAcitivityDisplay">
                        ${getActivityDisplay(employeeAttendance)}
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-md-6 col-sm-12 align-self-end">
                        <h3 class="font-weight-bold pb-1">My Attendance ${displayName}</h3>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="row">
                            <div class="col-md-8 col-sm-12">
                                <div class="form-group">
                                    <label>Date Range</label>
                                    <input type="button"
                                        name="dateRange"
                                        id="dateRange"
                                        class="form-control"
                                        start="${date}"
                                        end="${date}"
                                        value="${dateRange}">
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-12 text-left align-self-end">
                                <div class="form-group">
                                    <button class="btn btn-primary w-100 py-2"
                                        id="btnSearch"
                                        start="${date}"
                                        end="${date}"><i class="fas fa-search"></i> Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12" id="employeeAttendanceDisplay">
                        ${getEmployeeAttendanceDisplay(employeeAttendance)}
                    </div>
                </div>
            </div>
        </div>`;
        setTimeout(() => {
            $(`#page_content`).html(html);

            let {
                scheduleIn       = "",
                scheduleOut      = "",
                scheduleDuration = "",
                checkIn          = "",
                checkOut         = "",
                checkDuration    = "",
            } = employeeAttendance && employeeAttendance["timesheet"];
            timesheetChart(scheduleIn, scheduleOut, scheduleDuration, checkIn, checkOut, checkDuration);
            
            dateRangePicker();
            initDataTables();
        }, 300);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- CLICK BUTTON SEARCH ATTENDANCE -----
    $(document).on("click", "#btnSearch", function() {
        let startDate = $(this).attr("start");
        let endDate   = $(this).attr("end");
        $("#employeeAttendanceDisplay").html(preloader);
        $("#employeeAcitivityDisplay").html(preloader);
        let attendanceData = getEmployeeAttendanceData(startDate, endDate);
        let activityData   = getEmployeeActivityData(startDate, endDate);

        setTimeout(() => {
            let attendanceDisplay = getEmployeeAttendanceDisplay(attendanceData);
            $("#employeeAttendanceDisplay").html(attendanceDisplay);

            let activityDisplay = getActivityDisplay(activityData);
            $("#employeeAcitivityDisplay").html(activityDisplay);

            initDataTables();
        }, 300);
    })
    // ----- END CLICK BUTTON SEARCH ATTENDANCE -----


})