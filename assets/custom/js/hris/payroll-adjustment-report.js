$(document).ready(function() {

	// ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable("#tablePayrollAdjustment")) {
			$("#tablePayrollAdjustment").DataTable().destroy();
		}

        var table = $("#tablePayrollAdjustment")
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
                searching: false,
				// autoWidth: false,
				bSort: false, 
				lengthMenu: [
					[50, 100, 150, 200, -1   ],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [
					{ targets: "thPay",          width: "10px"  },
					{ targets: "thEmployeeName", width: "250px" },
					{ targets: "thReference",    width: "200px" },
					{ targets: "thAdjustment",   width: "150px" },	
					{ targets: "thAmount",       width: "100px" },	
					{ targets: "thNotes",        width: "250px" },	
				],
				fixedColumns: {
					leftColumns: 2
				}
			});

        $('#tablePayrollAdjustment').on('keyup', function() {
            table
                .columns([0,1])
                .search( this.value )
                .draw();
        });
    }
    // ----- END DATATABLES -----


	// ----- FILTER DISPLAY -----
	let GLOBAL_FILTERING = getFilterDisplayData();
    function getFilterDisplayData() {
        let result = null;
        $.ajax({
            method: "POST",
            url: "payroll_adjustment_report/getFilterDisplayData",
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }

    function getAdjustmentOption() {
        let html = '';
        if (GLOBAL_FILTERING && GLOBAL_FILTERING?.adjustment.length) {
            GLOBAL_FILTERING?.adjustment.map(item => {
                let { payrollAdjustmentID, payrollAdjustmentCode, dateRange } = item;
                html += `<option value="${payrollAdjustmentID}">${payrollAdjustmentCode} (${dateRange})</option>`;
            })
        }
        return html;
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

    function getEmployeeOption(departmentID = 0, designationID = 0) {
        let html = `<option value="0">All</option>`;
        if (GLOBAL_FILTERING && GLOBAL_FILTERING?.department.length) {
            GLOBAL_FILTERING?.department
                .filter(item => item.departmentID == departmentID)?.[0]?.designation
                ?.filter(item => item.designationID == designationID)?.[0]?.employees
                ?.map(item => {
                    let {
                        employeeID,
                        fullname
                    } = item;
                    html += `<option value="${employeeID}">${fullname}</option>`;
                })
        }
        return html;
    }

    function getFilterDisplay() {
        let html = '';
        if (GLOBAL_FILTERING) {
            html = `
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Payroll Adjustment No. <code>*</code></label>
                        <select class="form-control select2 w-100"
                            name="adjustmentNo"
                            multiple="multiple"> 
                            ${getAdjustmentOption()}
                        </select>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
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
                        <label>Employee Name</label>
                        <select class="form-control select2 w-100"
                            name="employeeID">
                            ${getEmployeeOption()}
                        </select>
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
    function getTableDisplayData(adjustmentNo = '', departmentID = 0, designationID = 0, employeeID = 0) {
        let result = [];
        $.ajax({
            method: "POST",
            url: "payroll_adjustment_report/getTableDisplayData",
            data: { adjustmentNo, departmentID, designationID, employeeID },
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
            <h4>Please select payroll adjustment no. to filter report</h4>
        </div>`;
        
        if (data) {
            if (data.length) {
                let tbodyHTML = '';

                data.map(item => {
                    let {
                        payrollAdjustmentItemID,
                        payrollAdjustmentCode,
                        payrollCode,
                        payrollPeriod,
                        rowCount,
                        employeeID,
                        employeeCode,
                        fullname,
                        adjustment,
                    } = item;

                    let displayFlag = true;
                    let employeeColumnHTML = `
                    <td rowspan="${rowCount}" class="text-center">
                        <input type="checkbox"
                            name="checkRow"
                            payrollAdjustmentItemID="${payrollAdjustmentItemID}">
                    </td>
                    <td rowspan="${rowCount}">
                        <div>${fullname}</div>
                        <small>${employeeCode}</small>
                    </td>
                    <td rowspan="${rowCount}">
                        <div>${payrollAdjustmentCode}</div>
                        <small>${payrollPeriod}</small>
                    </td>`;
                    let employeeColumnNone = `
                    <td style="display: none"></td>
                    <td style="display: none"></td>
                    <td style="display: none"></td>`;

                    if (adjustment && adjustment.length) {
                        adjustment.map(adj => {
                            let { title, amount, remarks } = adj;

                            tbodyHTML += `
                            <tr>
                                ${displayFlag ? employeeColumnHTML : employeeColumnNone}
                                <td>${title}</td>
                                <td class="text-right">${formatAmount(amount, true)}</td>
                                <td>${remarks}</td>
                            </tr>`;

                            displayFlag = false;
                        })
                    }
                })

                html = `
                <div class="card mt-4">
                    <div class="card-header bg-primary text-white text-center">
                        <h6 class="font-weight-bold">PAYROLL ADJUSTMENT REPORT</h6>
                    </div>
                    <div class="card-body position-relative" style="font-size: .9rem;">
                        <div class="" style="z-index: 9">
                            <button class="btn btn-info"
                                id="btnExcel"
                                disabled><i class="fas fa-file-excel"></i> EXCEL</button>
                            <!-- <button class="btn btn-primary"
                                id="btnPdf"
                                disabled><i class="fas fa-file-pdf"></i> PDF</button> -->
                        </div>
                        <table class="table table-bordered table-nowrap" id="tablePayrollAdjustment">
                            <thead>
                                <tr class="theadlabel">
                                    <th class="text-center thPay">
                                        <input type="checkbox" name="checkAll">
                                    </th>
                                    <th class="thReference">Employee Name</th>
                                    <th class="thReference">Reference</th>
                                    <th class="thAdjustment">Adjustment Type</th>
                                    <th class="thAmount">Amount</th>
                                    <th class="thReference">Notes</th>
                                </tr>
                            </thead>
                            <tbody id="tablePayrollAdjustmentTbody">
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

        let employeeOption = getEmployeeOption(departmentID, 0);
        $(`[name="employeeID"]`).html(employeeOption);
    })
    // ----- END SELECT DEPARTMENT -----


    // ----- SELECT DESIGNATION -----
    $(document).on("change", `[name="designationID"]`, function() {
        const departmentID  = $(`[name="departmentID"]`).val();
        const designationID = $(this).val();

        let employeeOption = getEmployeeOption(departmentID, designationID);
        $(`[name="employeeID"]`).html(employeeOption);
    })
    // ----- END SELECT DESIGNATION -----


    // ----- BUTTON SEARCH -----
    $(document).on("click", "#btnSearch", function() {
        let adjustmentNo  = $(`[name="adjustmentNo"]`).val();
        let departmentID  = $(`[name="departmentID"]`).val();
        let designationID = $(`[name="designationID"]`).val();
        let employeeID    = $(`[name="employeeID"]`).val();

        $parent = $(`[name="adjustmentNo"]`).closest('.form-group');

        if (adjustmentNo && adjustmentNo.length) {
            $parent.find(`.selection`).removeClass("has-error").addClass("no-error");
            $parent.find(`.invalid-feedback`).text("");

            $('#table_content').html(preloader);
            setTimeout(() => {
                adjustmentNo = adjustmentNo.join(",");

                let data = getTableDisplayData(adjustmentNo, departmentID, designationID, employeeID);
                let html = getTableDisplay(data);
                $('#table_content').html(html);
                initDataTables();
            }, 100);
        } else {
            $parent.find(`.selection`).removeClass("no-error").addClass("has-error");
            $parent.find(`.invalid-feedback`).text("Please select payroll adjustment no.");
        }

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
        let payrollAdjustmentItemIDArr = [];
        $(`[name="checkRow"]:checked`).each(function() {
            let payrollAdjustmentItemID = $(this).attr("payrollAdjustmentItemID");
            payrollAdjustmentItemIDArr.push(payrollAdjustmentItemID);
        })
        let payrollAdjustmentItemIDStr = payrollAdjustmentItemIDArr.join(',');

        let url = `${base_url}hris/payroll_adjustment_report/downloadExcel?payrollAdjustmentItemID=${payrollAdjustmentItemIDStr}`;
        window.open(url, '_blank');
    })
    // ----- END BUTTON EXCEL -----

})