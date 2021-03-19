$(document).ready(function() {
    
    // ----- LIST OF APPROVER -----
    const moduleApprover = getModuleApprover(123456); 
    // ----- END LIST OF APPROVER -----


    // ----- DATATABLES -----
    function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

        if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableForApprroval")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				// scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 80 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 80 },
					{ targets: 6,  width: 80 },
				],
			});

        var table = $("#tableMyForms")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				// scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 80 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 80 },
					{ targets: 6,  width: 80 },
				],
			});
	}
    // ----- END DATATABLES -----


    // ----- HEADER CONTENT -----
    function headerContent() {
        if (isImApprover(moduleApprover)) {
            let html = `
            <div class="bh_divider"></div>
            <div class="row clearfix">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab">For Approval</a></li>
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab">My Forms</a></li>
                    </ul>
                </div>
            </div>`;
            $("#headerContainer").append(html);
        } 
    }
    // ----- END HEADER CONTENT -----


    // ----- FOR APPROVAL CONTENT -----
    function forApprovalContent() {
        $("#tableForApprovalParent").html(preloader);
        let buttonOptions;
        let scheduleData = getTableData("hris_change_schedule_tbl", "", `employeeID != ${sessionID} AND changeScheduleStatus != 0`);
        buttonOptions = `
        <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
            <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="javascript:void(0);"id="approve"name="approve">Approve</a></li>
                <li><a href="javascript:void(0);"id="deny"name="deny">Deny</a></li>
            </ul>
        </div>`;

        let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;
        
        scheduleData.map(item => {
            html += `
            <tr>
                <td>${item.changeScheduleCode}</td>
                <td>${item.employeeID}</td>
                <td>${moment(item.changeScheduleDate).format("MMMM DD, YYYY")}</td>
                <td>${item.changeScheduleTimeIn} - ${item.changeScheduleTimeOut}</td>
                <td>${item.changeScheduleReason}</td>
                <td class="text-center">${getStatusStyle(item.changeScheduleStatus)}</td>
                <td class="text-center">
                    ${buttonOptions}
                </td>
            </tr>`;
        })   

        html += `
            </tbody>
        </table>`;

        setTimeout(() => {
            $("#tableForApprovalParent").html(html);
            initDataTables();
            return html;
        }, 500);
    }
    // ----- END FOR APPROVAL CONTENT -----


    // ----- FOR APPROVAL CONTENT -----
    function myFormsContent() {
        $("#tableMyFormsParent").html(preloader);
        let scheduleData = getTableData("hris_change_schedule_tbl", "", `employeeID = ${sessionID}`);

        let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;
        
        scheduleData.map(item => {
            let button = item.changeScheduleStatus != 0 ? `
            <button class="btn btn-view w-100 btnView"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.changeScheduleID}" 
                code="${item.changeScheduleCode}"><i class="fas fa-edit"></i> Edit</button>`;
            html += `
            <tr>
                <td>${item.changeScheduleCode}</td>
                <td>${item.employeeID}</td>
                <td>${moment(item.changeScheduleDate).format("MMMM DD, YYYY")}</td>
                <td>${item.changeScheduleTimeIn} - ${item.changeScheduleTimeOut}</td>
                <td>${item.changeScheduleReason}</td>
                <td class="text-center">${getStatusStyle(item.changeScheduleStatus)}</td>
                <td class="text-center">
                    ${button}
                </td>
            </tr>`;
        })   

        html += `
            </tbody>
        </table>`;

        setTimeout(() => {
            $("#tableMyFormsParent").html(html);
            initDataTables();
            return html;
        }, 500);
    }
    // ----- END FOR APPROVAL CONTENT -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        headerContent(moduleApprover);
        forApprovalContent();
        myFormsContent();
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {
        let { 
            changeScheduleID      = "",
            changeScheduleCode    = "",
            employeeID            = "",
            changeScheduleDate    = "",
            changeScheduleTimeIn  = "",
            changeScheduleTimeOut = "",
            changeScheduleReason  = "",
            approversID           = "",
            approversDate         = "",
            changeScheduleStatus  = "",
        } = data && data[0];

		let button = data
			? `
        <button 
            class="btn btn-submit" 
            id="btnSubmit" 
            changeScheduleID="${changeScheduleID}"
            changeScheduleCode="${changeScheduleCode}"><i class="fas fa-paper-plane"></i>
            Submit
        </button>
        <button 
            class="btn btn-cancel"
            id="btnCancelForm" 
            changeScheduleID="${changeScheduleID}"
            changeScheduleCode="${changeScheduleCode}"><i class="fas fa-ban"></i> 
            Cancel
        </button>`
			: `
        <button class="btn btn-submit" id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit</button>
        <button class="btn btn-cancel" id="btnCancel"><i class="fas fa-ban"></i> Cancel</button>`;

		let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Employee Name</label>
                        <input type="text" class="form-control" disabled value="Arjay Diangzon">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Department</label>
                        <input type="text" class="form-control" disabled value="Operations">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Position</label>
                        <input type="text" class="form-control" disabled value="Junior Developer I">
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group"
                        <label>Date <code>*</code></label>
                        <input type="button" 
                            class="form-control validate daterange text-left"
                            required
                            id="changeScheduleDate"
                            name="changeScheduleDate"
                            value="${changeScheduleDate && moment(changeScheduleDate).format("MMMM DD, YYYY")}">
                        <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Time In <code>*</code></label>
                        <input type="text" 
                            class="form-control timeIn" 
                            id="changeScheduleTimeIn" 
                            name="changeScheduleTimeIn" 
                            required
                            value="${changeScheduleTimeIn}">
                        <div class="d-block invalid-feedback" id="invalid-changeScheduleTimeIn"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Time Out <code>*</code></label>
                        <input type="text" 
                            class="form-control timeOut" 
                            id="changeScheduleTimeOut" 
                            name="changeScheduleTimeOut" 
                            required
                            value="${changeScheduleTimeOut}">
                        <div class="d-block invalid-feedback" id="invalid-changeScheduleTimeOut"></div>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Reason <code>*</code></label>
                        <textarea class="form-control validate"
                            data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                            minlength="1"
                            maxlength="200"
                            id="changeScheduleReason"
                            name="changeScheduleReason"
                            required
                            rows="4"
                            style="resize:none;">${changeScheduleReason}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-changeScheduleReason"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            ${button}
        </div>`;
		return html;
    }
    // ----- END MODAL CONTETN -----


    // ----- CUSTOM INPUTMASK -----
    function initInputmaskTime(isMethodAdd = true) {
        if (isMethodAdd) {
            $(".timeIn").val("08:00:00");
            $(".timeOut").val("17:00:00");
        }

        $(".timeIn").inputmask({
            mask:            "h:s:s",
            placeholder:     "08:00:00",
            insertMode:      false,
            hourFormat:      "24", 
            clearMaskOnLostFocus: false,
            floatLabelType: 'Always',
            focus: function(args) {
                args.selectionEnd= args.selectionStart;
            }
        })
        $(".timeOut").inputmask({
            mask:            "h:s:s",
            placeholder:     "17:00:00",
            insertMode:      false,
            hourFormat:      "24", 
            clearMaskOnLostFocus: false,
            floatLabelType: 'Always',
            focus: function(args) {
                args.selectionEnd= args.selectionStart;
            }
        })
    }    
    // ----- END CUSTOM INPUTMASK -----


    // ----- CHECK TIME RANGE -----
    function checkTimeRange(elementID = false, isReturnable = false) {
        let element = elementID ?  `#${elementID}` : ".timeOut";
        let flag = 0;
        $(element).each(function() {
            const fromValue = $("#changeScheduleTimeIn").val();
            const validated = $(this).hasClass("validated");
            const toValue   = $(this).val();

            const timeIn = moment(`2021-01-01 ${fromValue}`);
            const timeOut   = moment(`2021-01-01 ${toValue}`);

            let diff = moment.duration(timeOut.diff(timeIn));
                diff = diff.asSeconds();

            const invalidFeedback = $(this).parent().find(".invalid-feedback");

            if (diff <= 0) {
                $(this).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("Invalid time range");
                flag++;
            } else {
                isReturnable || validated ? $(this).removeClass("is-invalid").addClass("is-valid") :  $(this).removeClass("is-invalid").removeClass("is-valid");
                invalidFeedback.text("");
            }
        })
        if (isReturnable) {
            $(".modal").find(".is-invalid").first().focus();
            return flag > 0 ? false : true;
        }
    }
    // ----- END CHECK TIME RANGE -----


    // ----- GET DATA -----
    function getData(action = "insert", status, method, feedback, id = null) {
        let data = getFormData("modal_change_schedule", true);

        if (action && method != "" && feedback != "") {

            data["tableData[changeScheduleStatus]"] = status;
            data["tableData[updatedBy]"]            = sessionID;
            data["feedback"]                        = feedback;
            data["method"]                          = method;
            data["tableName"]                       = "hris_change_schedule_tbl";

            if (action == "insert") {

                data["tableData[changeScheduleCode]"]  = generateCode("SCH", false, "hris_change_schedule_tbl", "changeScheduleCode");
                data["tableData[employeeID]"]  = sessionID;
                data["tableData[approversID]"] = getModuleApprover(123412);
                data["tableData[createdBy]"]   = sessionID;
    
            } else {

                data["whereFilter"] = "changeScheduleID=" + id;

            }
        }
        return data;
        
    }
    // ----- END GET DATA -----


    // ----- CHANGE TIME TO -----
    $(document).on("keyup", ".timeOut", function() {
        checkTimeRange($(this).attr("id"));
    })
    // ----- END CHANGE TIME TO -----


    // ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_change_schedule .page-title").text("ADD CHANGE SCHEDULE");
		$("#modal_change_schedule").modal("show");
		$("#modal_change_schedule_content").html(preloader);
		const content = modalContent();
		$("#modal_change_schedule_content").html(content);
		initAll();
        initInputmaskTime();
	});
	// ----- END OPEN ADD MODAL -----


    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id   = $(this).attr("id");
        const code = $(this).attr("code");

        $("#btnCancel").attr("changeScheduleID", id);
        $("#btnCancel").attr("changeScheduleCode", code);

        $("#modal_change_schedule").modal("show");
        $("#modal_change_schedule .page-title").text("EDIT CHANGE SCHEDULE");
        $("#modal_change_schedule_content").html(preloader); 

        const tableData = getTableData("hris_change_schedule_tbl", "*", "changeScheduleID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_change_schedule_content").html(content);
                initAll();
                initInputmaskTime(false);
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate     = validateForm("modal_change_schedule");
		const validateTime = checkTimeRange(false, true);
		if (validate && validateTime) {
            const action   = "insert"; // CHANGE
            const feedback = generateCode("SCH", false, "hris_change_schedule_tbl", "changeScheduleCode");

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
                "insert",
				"CHANGE SCHEDULE",
				"modal_change_schedule",
				"",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode") ? $(this).attr("changeScheduleCode") : generateCode("SCH", false, "hris_change_schedule_tbl", "changeScheduleCode");

		const validate     = validateForm("modal_change_schedule");
        const validateTime = checkTimeRange(false, true); 

		if (validate && validateTime) {
            const action = id && feedback ? "update" : "insert";

            const data = getData(action, 1, "submit", feedback, id);

			formConfirmation(
				"submit",
                action,
				"CHANGE SCHEDULE",
				"modal_change_schedule",
				"",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode");

		const validate     = validateForm("modal_change_schedule");
        const validateTime = checkTimeRange(false, true); 

		if (validate && validateTime) {
            const action = "update";

            const data = getData(action, 4, "cancelform", feedback, id);

			formConfirmation(
				"cancelform",
                action,
				"CHANGE SCHEDULE",
				"modal_change_schedule",
				"",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode") ? $(this).attr("changeScheduleCode") : generateCode("SCH", false, "hris_change_schedule_tbl", "changeScheduleCode");

        const action = id && feedback ? "update" : "insert";

        const data = getData(action, 0, "save", feedback, id);

        cancelForm(
            "save",
            action,
            "CHANGE SCHEDULE",
            "modal_change_schedule",
            "",
            data,
            true,
            myFormsContent
        );
	});
	// ----- END CANCEL DOCUMENT -----


})