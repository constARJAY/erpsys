$(document).ready(function () {

    // ----- GLOBAL VARIABLES ----- 
    let GLOBAL_FILTERING = null;
    // ----- END GLOBAL VARIABLES ----- 


	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableGeneratePayslip")) {
			$("#tableGeneratePayslip").DataTable().destroy();
		}

		var table = $("#tableGeneratePayslip")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollY:        500,
                sorting:        [],
                scrollCollapse: true,
                paging:         false,
                searching:      false,
                sorting:        false,
                info:           false,
                bSort:          false,
				columnDefs: [
					{ targets: 0, width: "50px"  },
					{ targets: 1, width: "50%"   },
					{ targets: 2, width: "50%"   },
					{ targets: 3, width: "200px" },
				],
			});
	}
	// ----- END DATATABLES -----


    // ----- FILTER DISPLAY -----
    function getFilterDisplayData() {
        let result = [];
        $.ajax({
            method: "POST",
            url: "generate_payslip/getFilterDisplayData",
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }
    GLOBAL_FILTERING = getFilterDisplayData();


    function getFilterDisplay() {
        let payrollNoOptions = '';
        if (GLOBAL_FILTERING && Array.isArray(GLOBAL_FILTERING) && GLOBAL_FILTERING.length > 0) {
            GLOBAL_FILTERING.map(item => {
                let {
                    payrollID,
                    payrollCode
                } = item;

                payrollNoOptions += `<option value="${payrollID}">${payrollCode}</option>`;
            })
        }

        let html = `
        <div class="row w-100">
            <div class="col-md-3 col-sm-6">
                <div class="form-group">
                    <label>Payroll No. <code>*</code></label>
                    <select class="form-control select2"
                        style="width: 100%"
                        name="payrollNo">
                        <option selected disabled>Select Payroll No.</option>    
                        ${payrollNoOptions}
                    </select>
                    <div class="d-block invalid-feedback"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="form-group">
                    <label>Department</label>
                    <select class="form-control select2"
                        style="width: 100%"
                        name="department">
                        <option selected disabled>Select Department</option>    
                    </select>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="form-group">
                    <label>Designation</label>
                    <select class="form-control select2"
                        style="width: 100%"
                        name="designation">
                        <option selected disabled>Select Designation</option>    
                    </select>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 text-left align-self-end">
                <div class="form-group">
                    <button class="btn btn-primary w-100 py-2"
                        id="btnSearch"><i class="fas fa-search"></i> Search</button>
                </div>
            </div>
        </div>`;

        return html;
    }
    // ----- END FILTER DISPLAY -----


    // ----- TABLE DISPLAY -----
    function getTableDisplayData(payrollID = 0, departmentID = 0, designationID = 0) {
        let result = [];
        $.ajax({
            method: "POST",
            url: "generate_payslip/getTableDisplayData",
            data: { payrollID, departmentID, designationID },
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }

    function getTableDisplay(payrollID = 0, departmentID = 0, designationID = 0) {
        let tableDisplayData = getTableDisplayData(payrollID, departmentID, designationID);

        let tbodyHTML = '';
        if (tableDisplayData && Array.isArray(tableDisplayData) && tableDisplayData.length > 0) {
            tableDisplayData.map(item => {
                let {
                    payrollItemID,
                    employeeID,
                    fullname,
                    employeeCode,
                    departmentName,
                    designationName,
                    printedPayslip
                } = item;

                tbodyHTML += `
                <tr>
                    <td class="text-center">
                        <input type="checkbox" name="checkRow" employeeID="${employeeID}" payrollItemID="${payrollItemID}">
                    </td>
                    <td>
                        <div>${fullname || "-"}</div>
                        <small>${employeeCode || "-"}</small>
                    </td>
                    <td>
                        <div>${departmentName || "-"}</div>
                        <small>${designationName || "-"}</small>
                    </td>
                    <td class="text-center">${getStatusStyle(printedPayslip)}</td>
                </tr>`;
            })
        }

        let html = `
        <div class="my-3">
            <button class="btn btn-info"
                id="btnPrint"
                payrollID="${payrollID}"
                disabled><i class="fas fa-print"></i> PRINT</button>
        </div>
        <table class="table table-bordered table-striped" id="tableGeneratePayslip">
            <thead>
                <tr>
                    <th class="text-center">
                        <input type="checkbox" name="checkAll">
                    </th>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${tbodyHTML}
            </tbody>
        </table>`;

        return html;
    }
    // ----- END TABLE DISPLAY -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        $("#page_content").html(preloader);

        let filterDisplay = getFilterDisplay();
        let tableDisplay  = getTableDisplay();

        let html = `
        <div class="row clearfix row-deck">
            <div class="col-12" id="filterDisplay">
                ${filterDisplay}
            </div>
            <div class="col-12">
                <div class="table-responsive" id="table_content">
                    ${tableDisplay}
                </div>
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initAll();
            initDataTables();
        }, 100);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- DEPARTMENT OPTIONS -----
    function getDepartmentOption(payrollID = 0) {
        let html  = `<option value="0">All</option>`;
        GLOBAL_FILTERING
            .filter(item => item.payrollID == payrollID)?.[0]?.department
            ?.map(item => {
                let {
                    departmentID,
                    departmentName
                } = item;

                html += `<option value="${departmentID}">${departmentName}</option>`;
            });
        return html;
    }
    // ----- END DEPARTMENT OPTIONS -----


    // ----- DESIGNATION OPTION -----
    function getDesignationOption(payrollID = 0, departmentID = 0) {
        let html  = `<option value="0">All</option>`;
        GLOBAL_FILTERING
            .filter(item => item.payrollID == payrollID)?.[0]?.department
            ?.filter(item => item.departmentID == departmentID)?.[0]?.designation
            ?.map(item => {
                let {
                    designationID,
                    designationName
                } = item;
                html += `<option value="${designationID}">${designationName}</option>`;
            });
        return html;
    }
    // ----- END DESIGNATION OPTION -----


    // ----- UPDATE PRINT BUTTON -----
    function updatePrintButton() {
        let hasChecked = $(`[name="checkRow"]:checked`).length > 0;
        if (hasChecked) {
            $("#btnPrint").attr("disabled", false);
        } else {
            $("#btnPrint").attr("disabled", true);
        }
    }
    // ----- END UPDATE PRINT BUTTON -----
    

    // ----- SELECT PAYROLL NO. -----
    $(document).on("change", `[name="payrollNo"]`, function() {
        let payrollID = $(this).val();

        $(this).closest(`.form-group`).find(`.selection`).children().removeClass("has-error").removeClass("no-error");
        $(this).closest(`.form-group`).find(`.invalid-feedback`).text("");

        let departmentOption  = getDepartmentOption(payrollID);
        let designationOption = getDesignationOption(payrollID);
        $(`[name="department"]`).html(departmentOption);
        $(`[name="designation"]`).html(designationOption);
    })
    // ----- END SELECT PAYROLL NO. -----
    

    // ----- SELECT PAYROLL NO. -----
    $(document).on("change", `[name="department"]`, function() {
        let payrollID    = $(`[name="payrollNo"]`).val();
        let departmentID = $(this).val();

        let designationOption = getDesignationOption(payrollID, departmentID);
        $(`[name="designation"]`).html(designationOption);
    })
    // ----- END SELECT PAYROLL NO. -----


    // ----- BUTTON SEARCH -----
    $(document).on("click", "#btnSearch", function() {
        let payrollID     = $(`[name="payrollNo"]`).val();
        let departmentID  = $(`[name="department"]`).val();
        let designationID = $(`[name="designation"]`).val();

        $inputElement   = $(`[name="payrollNo"]`).closest(`.form-group`).find(`.selection`).children();
        $invalidElement = $(`[name="payrollNo"]`).closest(`.form-group`).find(`.invalid-feedback`);

        if (payrollID) {
            $inputElement.removeClass("has-error").removeClass("no-error");
			$invalidElement.text("");

            $("#table_content").html(preloader);
            let display = getTableDisplay(payrollID, departmentID, designationID);
            setTimeout(() => {
                $("#table_content").html(display);
                initDataTables();
            }, 100);
        } else {
            $inputElement.removeClass("no-error").addClass("has-error");
			$invalidElement.text("Please select payroll no.");
        }
    })
    // ----- END BUTTON SEARCH -----


    // ----- CHECK ROW -----
    $(document).on("change", `[type="checkbox"]`, function() {
        let isChecked = this.checked;
        if (this.name == "checkAll") {
            $(`[name="checkRow"]`).prop("checked", isChecked);
        }

        updatePrintButton();
    })
    // ----- END CHECK ROW -----


    // ----- BUTTON PRINT -----
    $(document).on("click", "#btnPrint", function() {
        let payrollID = $(this).attr("payrollID");
        let employeeIDArr = [], payrollItemIDArr = [];
        $(`[name="checkRow"]:checked`).each(function() {
            employeeIDArr.push($(this).attr("employeeID"))
            payrollItemIDArr.push($(this).attr("payrollItemID"))
        });
        let employeeIDStr    = employeeIDArr.join(", ");
        let payrollItemIDStr = payrollItemIDArr.join(", ");
        
        $.ajax({
            method: "POST",
			url: `generate_payslip/printPaySlip`,
			data: {
				payrollID,
                idStr:      employeeIDStr,
                payrollStr: payrollItemIDStr
			},
			success: function (data) {
				let left = ($(window).width() / 2) - (900 / 2),
					top  = ($(window).height() / 2) - (600 / 2),
					mywindow = window.open("", "PRINT", "width=900, height=600, top=" + top + ", left=" + left);

				mywindow.document.write(data);

				mywindow.document.close();
				mywindow.focus();
			}
		})
    })
    // ----- END BUTTON PRINT -----




    // ----- BADGE STATUS -----
    function getStatusStyle(status = 0) {
        switch (status) {
            case "1":
                return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Generated</span>`;
            case "0":
            default:
                return `<span class="badge badge-warning w-100">Pending</span>`;
        }
    }
    // ----- END BADGE STATUS -----

	
});
