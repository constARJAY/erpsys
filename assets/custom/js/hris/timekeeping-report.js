$(document).ready(function() {

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable("#tableTimekeeping")) {
			$("#tableTimekeeping").DataTable().destroy();
		}

        var table = $("#tableTimekeeping")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollY: 500,
				sorting: [],
				scrollCollapse: true,
				paging: false,
                sorting: false,
                info: false,
				// autoWidth: false,
				bSort: false, 
				lengthMenu: [
					[50, 100, 150, 200, -1   ],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [
					{ targets: "thPay",          width: "10px"  },
					{ targets: "thEmployeeName", width: "250px" },
					{ targets: "thDay",          width: "10px"  },
					{ targets: -1,               width: "100px" },	
					{ targets: -2,               width: "100px" },	
					{ targets: -3,               width: "120px" },	
					{ targets: -4,               width: "100px" },	
					{ targets: -5,               width: "100px" },	
				],
				fixedColumns: {
					leftColumns: 2
				}
			});
    }
    // ----- END DATATABLES -----


    // ----- REUSABLE -----
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
    // ----- END REUSABLE -----


    // ----- FILTER DISPLAY -----
    let GLOBAL_FILTERING = getFilterDisplayData();
    function getFilterDisplayData() {
        let result = null;
        $.ajax({
            method: "POST",
            url: "timekeeping_report/getFilterDisplayData",
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }

    function getDepartmentOption() {
        let html = `<option value="0">All</option>`;
        if (GLOBAL_FILTERING && GLOBAL_FILTERING?.department.length) {
            GLOBAL_FILTERING?.department.map(item => {
                let { departmentID, departmentName } = item;
                html += `<option value="${departmentID}">${departmentName}</option>`;
            })
        }
        return html;
    }

    function getDesignationOption(departmentID = 0) {
        let html = `<option value="0">All</option>`;
        if (GLOBAL_FILTERING && GLOBAL_FILTERING?.department.length) {
            GLOBAL_FILTERING?.department
                .filter(item => item.departmentID == departmentID)?.[0]?.designation
                ?.map(item => {
                    let {
                        designationID,
                        designationName
                    } = item;
                    html += `<option value="${designationID}">${designationName}</option>`;
                })
        }
        return html;
    }

    function getFilterDisplay() {
        let html = '';
        if (GLOBAL_FILTERING) {
            let minDate   = GLOBAL_FILTERING?.startDate || moment().format("YYYY-MM-DD");
            let maxDate   = GLOBAL_FILTERING?.endDate || moment().format("YYYY-MM-DD");
            let startDate = moment().format("YYYY-MM-DD");
            let endDate   = moment(maxDate).format("YYYY-MM-DD");
            let display   = `${moment(endDate).format("MMMM DD, YYYY")} - ${moment(endDate).format("MMMM DD, YYYY")}`;

            html = `
            <div class="row">
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Department</label>
                        <select class="form-control select2 w-100"
                            name="departmentID">
                            ${getDepartmentOption()}   
                        </select>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Designation</label>
                        <select class="form-control select2 w-100"
                            name="designationID">
                            ${getDesignationOption()}
                        </select>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Date Range</label>
                        <input type="button"
                            class="form-control"
                            name="dateRange"
                            minDate="${minDate}"
                            maxDate="${maxDate}"
                            startDate="${maxDate}"
                            endDate="${maxDate}"
                            value="${display}">
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>&nbsp;</label>
                        <button class="btn btn-primary w-100"
                            id="btnSearch">
                            <i class="fas fa-search"></i> Search    
                        </button>
                    </div>
                </div>
            </div>`;
        }
        return html;
    }
    // ----- END FILTER DISPLAY -----


    // ----- TABLE DISPLAY -----
    function getTableDisplayData(departmentID = 0, designationID = 0, startDate = '', endDate = '') {
        let result = [];
        $.ajax({
            method: "POST",
            url: "timekeeping_report/getTableDisplayData",
            data: { departmentID, designationID, startDate, endDate },
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }

    function getTableDisplay(data = false) {
        let html = `
        <div class="w-100 d-flex justify-content-center align-items-center flex-column py-5">
            <img src="${base_url}assets/modal/please-select.gif" width="300" height="300">
            <h4>Please select department, designation and date range to filter report.</h4>
        </div>`;
        
        let tbodyHTML = '', columnHTML = '';
        if (data && data.employees.length && data.columns.length && data.items.length) {

            data.columns.map(col => {
                const { month, day, date, number } = col;
				columnHTML += `
				<th class="thDay text-center">
					<small>${month}</small>
					<div>${number}</div>
					<small>${day}</small>
				</th>`;
            })

            data.employees.map(item => {
                let {
                    employeeID,
                    fullname,
                    employeeCode,
                } = item;

                let grandBasicHours    = 0;
                let grandOvertimeHours = 0;
                let grandTotalHours    = 0;
                let grandRestDays      = 0;
                let grandWorkingDays   = 0;

                let attendanceHTML = '';
                data.columns.map(col => {
                    let { date } = col;
                    data.items
                        .filter(item => item.scheduleDate == date && item.employeeID == employeeID)
                        .map(item => {
                            let {
                                timekeepingItemStatus,
                                basicHours,
                                overtimeHours,
                                totalHours
                            } = item;

                            if (['NO_SCHEDULE', 'REST_DAY'].includes(timekeepingItemStatus)) {
                                attendanceHTML += `<td class="text-center">RD</td>`;
                                grandRestDays  += 1;
                            } else {
                                attendanceHTML     += `<td class="text-center">${decimalToHours(totalHours)}</td>`;
                                grandBasicHours    += (+basicHours);
                                grandOvertimeHours += (+overtimeHours);
                                grandTotalHours    += (+totalHours);
                                grandWorkingDays   += 1;
                            }

                        })
                })

                

                tbodyHTML += `
                <tr employeeID="${employeeID}">
                    <td class="text-center">
                        <input type="checkbox"
                            name="checkRow"
                            employeeID="${employeeID}">
                    </td>
                    <td>
                        <div>${fullname}</div>
                        <small>${employeeCode}</small>
                    </td>
                    ${attendanceHTML}
                    <td class="text-center">${decimalToHours(grandTotalHours)}</td>
                    <td class="text-center">${decimalToHours(grandBasicHours)}</td>
                    <td class="text-center">${decimalToHours(grandOvertimeHours)}</td>
                    <td class="text-center">${grandRestDays}</td>
                    <td class="text-center">${grandWorkingDays}</td>
                </tr>`;
            })

            html = `
            <div class="card mt-4">
                <div class="card-header bg-primary text-white text-center">
                    <h6 class="font-weight-bold">${data.display || '-'}</h6>
                </div>
                <div class="card-body position-relative" style="font-size: .9rem;">
                    <div class="position-absolute" style="z-index: 9">
                        <button class="btn btn-info"
                            id="btnExcel"
                            disabled><i class="fas fa-file-excel"></i> EXCEL</button>
                        <!-- <button class="btn btn-primary"
                            id="btnPdf"
                            disabled><i class="fas fa-file-pdf"></i> PDF</button> -->
                    </div>
                    <table class="table table-bordered table-striped table-nowrap" id="tableTimekeeping">
                        <thead>
                            <tr class="theadlabel">
                                <th class="text-center thPay">
                                    <input type="checkbox" name="checkAll">
                                </th>
                                <th class="thEmployeeName">Employee Name</th>
                                ${columnHTML}
                                <th class="thSummary">Total Hours</th>
                                <th class="thSummary">Basic Hours</th>
                                <th class="thSummary">Overtime Hours</th>
                                <th class="thSummary">Rest Day</th>
                                <th class="thSummary">No. of Working Days</th>
                            </tr>
                        </thead>
                        <tbody id="tableTimekeepingTbody">
                            ${tbodyHTML}
                        </tbody>
                    </table>
                </div>
            </div>`;
        } else {
            html = `
            <div class="w-100 d-flex justify-content-center align-items-center flex-column py-5">
                <img src="${base_url}assets/modal/no-data.gif" width="300" height="300">
                <h4>No data found</h4>
            </div>`;
        }


        return html;
    }
    // ----- END TABLE DISPLAY -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        !$('#preloader').text().trim().length && $('#page_content').html(preloader);

        let html = '';

        if (GLOBAL_FILTERING) {
            html = `
            <div class="row">
                <div class="col-12">${getFilterDisplay()}</div>
                <div class="col-12" id="table_content">${getTableDisplay()}</div>
            </div>`;
        } else {
            html = `
            <div class="w-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/please-select.gif" width="300" height="300">
                <h4>There's no approved timekeeping process yet.</h4>
            </div>`;
        }

        setTimeout(() => {
            $('#page_content').html(html);
            initAll();
            initDataTables();

            let tkMin   = $(`[name="dateRange"]`).attr("minDate");
            let tkMax   = $(`[name="dateRange"]`).attr("maxDate");
            let tkStart = $(`[name="dateRange"]`).attr("startDate");
            let tkEnd   = $(`[name="dateRange"]`).attr("endDate");
            $(`[name="dateRange"]`).daterangepicker({
				autoUpdateInput: false,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
                minDate:   moment(tkMin),
                maxDate:   moment(tkMax),
                startDate: moment(tkStart),
                endDate:   moment(tkEnd),
		    }, function(start, end) {
                let startDate = start ? moment(start).format("YYYY-MM-DD") : tkStart;
                let endDate   = end ? moment(end).format("YYYY-MM-DD") : tkEnd;
                let display   = `${moment(startDate).format("MMMM DD, YYYY")} - ${moment(endDate).format("MMMM DD, YYYY")}`;
                $(`[name="dateRange"]`).val(display);
                $(`[name="dateRange"]`).attr('startDate', startDate);
                $(`[name="dateRange"]`).attr('endDate', endDate);
            })

            $(`#btnSearch`).trigger("click");
        }, 100);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- UPDATE BUTTON -----
    function updateButton() {
        let hasChecked = $(`[name="checkRow"]:checked`).length > 0;
        if (hasChecked) {
            $("#btnExcel").attr("disabled", false);
        } else {
            $("#btnExcel").attr("disabled", true);
        }
    }
    // ----- END UPDATE BUTTON -----


    // ----- SELECT DEPARTMENT -----
    $(document).on("change", `[name="departmentID"]`, function() {
        const departmentID = $(this).val();
        let designationOption = getDesignationOption(departmentID);
        $(`[name="designationID"]`).html(designationOption);
    })
    // ----- END SELECT DEPARTMENT -----


    // ----- BUTTON SEARCH -----
    $(document).on("click", "#btnSearch", function() {
        let departmentID  = $(`[name="departmentID"]`).val();
        let designationID = $(`[name="designationID"]`).val();
        let startDate     = $(`[name="dateRange"]`).attr('startDate');
        let endDate       = $(`[name="dateRange"]`).attr('endDate');

        $('#table_content').html(preloader);
        setTimeout(() => {
            let data = getTableDisplayData(departmentID, designationID, startDate, endDate);
            let html = getTableDisplay(data);
            $('#table_content').html(html);
            initDataTables();
        }, 100);
    })
    // ----- END BUTTON SEARCH -----


    // ----- CHECK ROW -----
    $(document).on("change", `[type="checkbox"]`, function() {
        let isChecked = this.checked;
        if (this.name == "checkAll") {
            $(`[name="checkRow"]`).prop("checked", isChecked);
        }

        updateButton();
    })
    // ----- END CHECK ROW -----


    // ----- BUTTON EXCEL -----
    $(document).on("click", `#btnExcel`, function() {
        let employeeIDArr = [];
        $(`[name="checkRow"]:checked`).each(function() {
            let employeeID = $(this).attr("employeeID");
            employeeIDArr.push(employeeID);
        })
        let employeeIDStr = employeeIDArr.join(',');
        let startDate     = $(`[name="dateRange"]`).attr("startDate");
        let endDate       = $(`[name="dateRange"]`).attr("endDate");

        let url = `${base_url}hris/timekeeping_report/downloadExcel?startDate=${startDate}&endDate=${endDate}&employeeID=${employeeIDStr}`;
        window.open(url, '_blank');
    })
    // ----- END BUTTON EXCEL -----
    

})