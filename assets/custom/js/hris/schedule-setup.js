$(document).ready(function(){
        
    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableSssTable')){
            $('#tableSssTable').DataTable().destroy();
        }
        
        var table = $("#tableSssTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0,  width: 10 },
                { targets: 9,  width: 80 }
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----


    // ----- TABLE CONTENT -----
    function tableContent() {
        preventRefresh(false);

        // Reset the unique datas
        uniqueData = []; 

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "hris_schedule_setup_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableSssTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Schedule Name</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    let unique = {
                        id: item.scheduleID,
                        scheduleName: item.scheduleName,
                    };
                    uniqueData.push(unique);

                    let status = item.scheduleStatus == 1 ? `
                    <span class="badge badge-outline-success w-100">Active</span>` :
                    `<span class="badge badge-outline-danger w-100">Inactive</span>`;

                    const monday    = item.mondayStatus == 1 ? `${item.mondayFrom} - ${item.mondayTo}` : "-";
                    const tuesday   = item.tuesdayStatus == 1 ? `${item.tuesdayFrom} - ${item.tuesdayTo}` : "-";
                    const wednesday = item.wednesdayStatus == 1 ? `${item.wednesdayFrom} - ${item.wednesdayTo}` : "-";
                    const thursday  = item.thursdayStatus == 1 ? `${item.thursdayFrom} - ${item.thursdayTo}` : "-";
                    const friday    = item.fridayStatus == 1 ? `${item.fridayFrom} - ${item.fridayTo}` : "-";
                    const saturday  = item.saturdayStatus == 1 ? `${item.saturdayFrom} - ${item.saturdayTo}` : "-";
                    const sunday    = item.sundayStatus == 1 ? `${item.sundayFrom} - ${item.sundayTo}` : "-";

                    html += `
                    <tr class="btnEdit" id="${item.scheduleID}">
                        <td>${++index}</td>
                        <td>${item.scheduleName}</td>
                        <td>${monday}</td>
                        <td>${tuesday}</td>
                        <td>${wednesday}</td>
                        <td>${thursday}</td>
                        <td>${friday}</td>
                        <td>${saturday}</td>
                        <td>${sunday}</td>
                        <td>${status}</td>
                    </tr>`;
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    initDataTables();
                }, 500);
            },
            error: function() {
                let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
                $("#table_content").html(html);
            }
        })
    }
    tableContent();
    // ----- END TABLE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {

        let  {
            scheduleID      = "",
            scheduleName    = "",
            scheduleStatus  = "1",
            mondayFrom      = "",
            mondayTo        = "",
            mondayStatus    = "",
            tuesdayFrom     = "",
            tuesdayTo       = "",
            tuesdayStatus   = "",
            wednesdayFrom   = "",
            wednesdayTo     = "",
            wednesdayStatus = "",
            thursdayFrom    = "",
            thursdayTo      = "",
            thursdayStatus  = "",
            fridayFrom      = "",
            fridayTo        = "",
            fridayStatus    = "",
            saturdayFrom    = "",
            saturdayTo      = "",
            saturdayStatus  = "",
            sundayFrom      = "",
            sundayTo        = "",
            sundayStatus    = "",
        } = data && data[0];

        let button = scheduleID ? `
        <button 
            class="btn btn-update"
            id="btnUpdate"
            scheduleID="${scheduleID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button 
            class="btn btn-save"
            id="btnSave"><i class="fas fa-save"></i>
            Save
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Schedule Name <code>*</code></label>
                        <input class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]" minlength="1" maxlength="30" required unique="${scheduleID}" name="scheduleName" id="input_scheduleName" value="${scheduleName}" title="Schedule Name" autocomplete="off">
                        <div class="d-block invalid-feedback" id="invalid-input_scheduleName"></div>
                    </div>
                </div>
                <div class="col-12">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th>Enabled</th>
                                <th>Day</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" id="mondayStatus" name="mondayStatus" ${mondayStatus == 1 && "checked"}></td>
                                <td class="text-left">Monday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_mondayFrom" name="mondayFrom" required value="${mondayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_mondayTo" name="mondayTo" required value="${mondayTo}" from="mondayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="tuesdayStatus" name="tuesdayStatus" ${tuesdayStatus == 1 && "checked"}></td>
                                <td class="text-left">Tuesday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_tuesdayFrom" name="tuesdayFrom" required value="${tuesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_tuesdayTo" name="tuesdayTo" required value="${tuesdayTo}" from="tuesdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="wednesdayStatus" name="wednesdayStatus" ${wednesdayStatus == 1 && "checked"}></td>
                                <td class="text-left">Wednesday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_wednesdayFrom" name="wednesdayFrom" required value="${wednesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_wednesdayTo" name="wednesdayTo" required value="${wednesdayTo}" from="wednesdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="thursdayStatus"  name="thursdayStatus" ${thursdayStatus == 1 && "checked"}></td>
                                <td class="text-left">Thursday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_thursdayFrom" name="thursdayFrom" required value="${thursdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_thursdayTo" name="thursdayTo" required value="${thursdayTo}" from="thursdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="fridayStatus" name="fridayStatus" ${fridayStatus == 1 && "checked"}></td>
                                <td class="text-left">Friday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_fridayFrom" name="fridayFrom" required value="${fridayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_fridayTo" name="fridayTo" required value="${fridayTo}" from="fridayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="saturdayStatus" name="saturdayStatus" ${saturdayStatus == 1 && "selected"}></td>
                                <td class="text-left">Saturday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_saturdayFrom" name="saturdayFrom" required value="${saturdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_saturdayTo" name="saturdayTo" required value="${saturdayTo}" from="saturdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" id="sundayStatus" name="sundayStatus" ${sundayStatus == 1 && "checked"}></td>
                                <td class="text-left">Sunday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_sundayFrom" name="sundayFrom" required value="${sundayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_sundayTo" name="sundayTo" required value="${sundayTo}" from="sundayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayTo"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Status <code>*</code></label>
                        <select class="form-control select2" id="scheduleStatus" name="scheduleStatus">
                            <option value="1" ${scheduleStatus == 1 && "selected"}>Active</option>
                            <option value="0" ${scheduleStatus == 0 && "selected"}>Inactive</option>
                        </select>
                        <div class="d-block invalid-feedback" id="invalid-scheduleStatus"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT -----


    // ----- CUSTOM INPUTMASK -----
    function initInputmaskTime(isMethodAdd = true) {
        if (isMethodAdd) {
            $(".timeFrom").val("08:00");
            $(".timeTo").val("17:00");
        }

        $(".timeFrom").inputmask({
            mask:            "h:s",
            placeholder:     "08:00",
            insertMode:      false,
            hourFormat:      "24", 
            clearMaskOnLostFocus: false,
            floatLabelType: 'Always',
            focus: function(args) {
                args.selectionEnd= args.selectionStart;
            }
        })
        $(".timeTo").inputmask({
            mask:            "h:s",
            placeholder:     "17:00",
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
        let element = elementID ?  `#${elementID}` : ".timeTo";
        let flag = 0;
        $(element).each(function() {
            const from      = $(this).attr("from");
            const validated = $(this).hasClass("validated");
            const fromValue = $(`[name=${from}]`).val()+":00";
            const toValue   = $(this).val()+":00";

            const timeFrom = moment(`2021-01-01 ${fromValue}`);
            const timeTo   = moment(`2021-01-01 ${toValue}`);

            let diff = moment.duration(timeTo.diff(timeFrom));
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


    // ----- CHANGE TIME TO -----
    $(document).on("keyup", ".timeTo", function() {
        // checkTimeRange($(this).attr("id"));
    })
    // ----- END CHANGE TIME TO -----


    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        preventRefresh(true);

        $("#modal_schedule_setup").modal("show");
        $("#modal_schedule_setup .page-title").text("ADD SCHEDULE");
        $("#modal_schedule_setup_content").html(preloader);
        const content = modalContent();
        $("#modal_schedule_setup_content").html(content);
        initAll();
        initInputmaskTime();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_schedule_setup");

		if (validate) {
			let data = getFormData("modal_schedule_setup", true);
			data["tableName"] = "hris_schedule_setup_tbl";
			data["feedback"]  = $("[name=scheduleName]").val();

			sweetAlertConfirmation(
				"add",
				"Schedule",
				"modal_schedule_setup",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END SAVE MODAL -----

    
    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        preventRefresh(true);

        const id = $(this).attr("id");
        $("#modal_schedule_setup").modal("show");
        $("#modal_schedule_setup .page-title").text("EDIT SCHEDULE");
        $("#modal_schedule_setup_content").html(preloader); 

        const tableData = getTableData("hris_schedule_setup_tbl", "*", "scheduleID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_schedule_setup_content").html(content);
                initAll();
                initInputmaskTime(false);
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----


    // ----- UPDATE MODAL -----
	$(document).on("click", "#btnUpdate", function () {
		const id = $(this).attr("scheduleid");

		const validate = validateForm("modal_schedule_setup");

		if (validate) {
			let data = getFormData("modal_schedule_setup", true);
			data["tableName"]   = "hris_schedule_setup_tbl";
			data["whereFilter"] = "scheduleID=" + id;
			data["feedback"]    = $("[name=scheduleName]").val();

			sweetAlertConfirmation(
				"update",
				"Schedule",
				"modal_schedule_setup",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END UPDATE MODAL -----


    // ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_schedule_setup");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Schedule",
				"modal_schedule_setup"
			);
		} else {
            preventRefresh(false);
			$("#modal_schedule_setup").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------

});