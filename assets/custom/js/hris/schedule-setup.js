$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(101);


	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#scheduleTable")) {
			$("#scheduleTable").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#scheduleFormTable")) {
			$("#scheduleFormTable").DataTable().destroy();
		}

		var table = $("#scheduleTable")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				lengthMenu: [
					[50, 100, 150, 200, -1],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [
					{ targets: 0, width: 10 },
					{ targets: 1, width: 120 },
					{ targets: 2, width: 130 },
					{ targets: 3, width: 130 },
					{ targets: 4, width: 130 },
					{ targets: 5, width: 130 },
					{ targets: 6, width: 130 },
					{ targets: 7, width: 130 },
					{ targets: 8, width: 130 },
					{ targets: 9, width: 80 },
				],
			});

		var table = $("#scheduleFormTable")
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
					{ targets: 0, width: 50  },
					{ targets: 1, width: 100 },
					{ targets: 2, width: 120 },
					{ targets: 3, width: 120 },
					{ targets: 4, width: 150 },
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
			url: `${base_url}operations/getTableData`,
			method: "POST",
			async: false,
			dataType: "json",
			data: { tableName: "hris_schedule_setup_tbl" },
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="scheduleTable">
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

					let status =
						item.scheduleStatus == 1
							? `
                    <span class="badge badge-outline-success w-100">Active</span>`
							: `<span class="badge badge-outline-danger w-100">Inactive</span>`;

					const monday =
						item.mondayStatus == 1
							? `${moment("2021-04-09 " + item.mondayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.mondayTo).format("hh:mmA")}`
							: "-";
					const tuesday =
						item.tuesdayStatus == 1
							? `${moment("2021-04-09 " + item.tuesdayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.tuesdayTo).format("hh:mmA")}`
							: "-";
					const wednesday =
						item.wednesdayStatus == 1
							? `${moment("2021-04-09 " + item.wednesdayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.wednesdayTo).format(
									"hh:mmA"
							  )}`
							: "-";
					const thursday =
						item.thursdayStatus == 1
							? `${moment("2021-04-09 " + item.thursdayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.thursdayTo).format(
									"hh:mmA"
							  )}`
							: "-";
					const friday =
						item.fridayStatus == 1
							? `${moment("2021-04-09 " + item.fridayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.fridayTo).format("hh:mmA")}`
							: "-";
					const saturday =
						item.saturdayStatus == 1
							? `${moment("2021-04-09 " + item.saturdayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.saturdayTo).format(
									"hh:mmA"
							  )}`
							: "-";
					const sunday =
						item.sundayStatus == 1
							? `${moment("2021-04-09 " + item.sundayFrom).format(
									"hh:mmA"
							  )} - ${moment("2021-04-09 " + item.sundayTo).format("hh:mmA")}`
							: "-";

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
				});
				html += `</tbody>
                </table>`;

				setTimeout(() => {
					$("#table_content").html(html);
					initDataTables();
				}, 500);
			},
			error: function () {
				let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
				$("#table_content").html(html);
			},
		});
	}
	tableContent();
	// ----- END TABLE CONTENT -----

	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let {
			scheduleID      = "",
			scheduleName    = "",
			scheduleStatus  = "1",
			mondayFrom      = "",
			mondayTo        = "",
			mondayBreakDuration = "0",
			mondayStatus    = "",
			tuesdayFrom     = "",
			tuesdayTo       = "",
			tuesdayBreakDuration = "0",
			tuesdayStatus   = "",
			wednesdayFrom   = "",
			wednesdayTo     = "",
			wednesdayBreakDuration = "0",
			wednesdayStatus = "",
			thursdayFrom    = "",
			thursdayTo      = "",
			thursdayBreakDuration = "0",
			thursdayStatus  = "",
			fridayFrom      = "",
			fridayTo        = "",
			fridayBreakDuration = "0",
			fridayStatus    = "",
			saturdayFrom    = "",
			saturdayTo      = "",
			saturdayBreakDuration = "0",
			saturdayStatus  = "",
			sundayFrom      = "",
			sundayTo        = "",
			sundayBreakDuration = "0",
			sundayStatus    = "",
		} = data && data[0];

		let button = scheduleID
			? `
        <button 
            class="btn btn-update px-5 p-2"
            id="btnUpdate"
            scheduleID="${scheduleID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button 
            class="btn btn-save px-5 p-2"
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
					<div class="table-responsive">
                    <table class="table text-center" id="scheduleFormTable">
                        <thead>
                            <tr>
                                <th>Enabled</th>
                                <th>Day</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Break Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="mondayStatus" 
										name="mondayStatus" 
										${mondayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Monday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_mondayFrom" 
										name="mondayFrom" 
										required 
										value="${mondayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_mondayTo" 
										name="mondayTo" 
										required 
										value="${mondayTo}" 
										from="mondayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="mondayBreakDuration"
										name="mondayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${mondayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="tuesdayStatus" 
										name="tuesdayStatus" 
										${tuesdayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Tuesday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_tuesdayFrom" 
										name="tuesdayFrom" 
										required 
										value="${tuesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_tuesdayTo" 
										name="tuesdayTo" 
										required 
										value="${tuesdayTo}" 
										from="tuesdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="tuesdayBreakDuration"
										name="tuesdayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${tuesdayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="wednesdayStatus" 
										name="wednesdayStatus" 
										${wednesdayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Wednesday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_wednesdayFrom" 
										name="wednesdayFrom" 
										required 
										value="${wednesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_wednesdayTo" 
										name="wednesdayTo" 
										required 
										value="${wednesdayTo}" 
										from="wednesdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="wednesdayBreakDuration"
										name="wednesdayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${wednesdayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="thursdayStatus"  
										name="thursdayStatus" 
										${thursdayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Thursday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_thursdayFrom" 
										name="thursdayFrom" 
										required 
										value="${thursdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_thursdayTo" 
										name="thursdayTo" 
										required 
										value="${thursdayTo}" 
										from="thursdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="thursdayBreakDuration"
										name="thursdayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${thursdayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="fridayStatus"
										name="fridayStatus" 
										${fridayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Friday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_fridayFrom" 
										name="fridayFrom" 
										required 
										value="${fridayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 	
										class="form-control timeTo text-center" 
										id="input_fridayTo" 
										name="fridayTo" 
										required 
										value="${fridayTo}" 
										from="fridayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="fridayBreakDuration"
										name="fridayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${fridayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="saturdayStatus" 
										name="saturdayStatus" 
										${saturdayStatus == 1 && "selected"}>
								</td>
                                <td class="text-left">Saturday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_saturdayFrom" 
										name="saturdayFrom" 
										required 
										value="${saturdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_saturdayTo" 
										name="saturdayTo" 
										required 
										value="${saturdayTo}" 
										from="saturdayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="saturdayBreakDuration"
										name="saturdayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${saturdayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                            <tr>
                                <td>
									<input type="checkbox" 
										id="sundayStatus" 
										name="sundayStatus" 
										${sundayStatus == 1 && "checked"}>
								</td>
                                <td class="text-left">Sunday</td>
                                <td>
                                    <input type="text" 
										class="form-control timeFrom text-center" 
										id="input_sundayFrom" 
										name="sundayFrom" 
										required 
										value="${sundayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" 
										class="form-control timeTo text-center" 
										id="input_sundayTo" 
										name="sundayTo" 
										required 
										value="${sundayTo}" 
										from="sundayFrom">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayTo"></div>
                                </td>
								<td>
									<input type="text"
										class="form-control input-hours text-center"
										id="sundayBreakDuration"
										name="sundayBreakDuration"
										minlength="0"
										maxlength="5"
										min="0"
										max="2"
										value="${sundayBreakDuration}"
										required>
									<div class="d-block invalid-feedback"></div>
								</td>
                            </tr>
                        </tbody>
                    </table>
					</div>
                </div>
                <div class="col-12 mt-3">
                    <div class="form-group">
                        <label>Status <code>*</code></label>
                        <select class="form-control select2" 
							id="scheduleStatus" 
							name="scheduleStatus" 
							scheduleID="${scheduleID}">
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
            <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i> Cancel</button>
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
			mask: "h:s",
			placeholder: "08:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
		$(".timeTo").inputmask({
			mask: "h:s",
			placeholder: "17:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
	}
	// ----- END CUSTOM INPUTMASK -----

	// ----- CHECK TIME RANGE -----
	function checkTimeRange(elementID = false, isReturnable = false) {
		let element = elementID ? `#${elementID}` : ".timeTo";
		let flag = 0;
		$(element).each(function () {
			const from = $(this).attr("from");
			const validated = $(this).hasClass("validated");
			const fromValue = $(`[name=${from}]`).val() + ":00";
			const toValue = $(this).val() + ":00";

			const timeFrom = moment(`2021-01-01 ${fromValue}`);
			const timeTo = moment(`2021-01-01 ${toValue}`);

			let diff = moment.duration(timeTo.diff(timeFrom));
			diff = diff.asSeconds();

			const invalidFeedback = $(this).parent().find(".invalid-feedback");

			if (diff <= 0) {
				$(this).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("Invalid time range");
				flag++;
			} else {
				isReturnable || validated
					? $(this).removeClass("is-invalid").addClass("is-valid")
					: $(this).removeClass("is-invalid").removeClass("is-valid");
				invalidFeedback.text("");
			}
		});
		if (isReturnable) {
			$(".modal").find(".is-invalid").first().focus();
			return flag > 0 ? false : true;
		}
	}
	// ----- END CHECK TIME RANGE -----

	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeTo", function () {
		// checkTimeRange($(this).attr("id"));
	});
	// ----- END CHANGE TIME TO -----

	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		preventRefresh(true);

		$("#modal_schedule_setup").modal("show");
		$("#modal_schedule_setup .page-title").text("ADD SCHEDULE");
		$("#modal_schedule_setup_content").html(preloader);
		const content = modalContent();
		setTimeout(() => {
			$("#modal_schedule_setup_content").html(content);
			initAll();
			initDataTables();
			initInputmaskTime();
		}, 200);
	});
	// ----- END OPEN ADD MODAL -----

	// ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_schedule_setup");

		if (validate) {
			let data = getFormData("modal_schedule_setup", true);
			data["tableName"] = "hris_schedule_setup_tbl";
			data["feedback"] = $("[name=scheduleName]").val();

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
	$(document).on("click", ".btnEdit", function () {
		preventRefresh(true);

		const id = $(this).attr("id");
		$("#modal_schedule_setup").modal("show");
		$("#modal_schedule_setup .page-title").text("EDIT SCHEDULE");
		$("#modal_schedule_setup_content").html(preloader);

		const tableData = getTableData(
			"hris_schedule_setup_tbl",
			"*",
			"scheduleID=" + id,
			""
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_schedule_setup_content").html(content);
				initAll();
				initDataTables();
				initInputmaskTime(false);

				if (!allowedUpdate) {
					$("#modal_schedule_setup_content").find("input, select, textarea").each(function() {
						$(this).attr("disabled", true);
					})
					$("#btnUpdate").hide();
				}
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
			data["tableName"] = "hris_schedule_setup_tbl";
			data["whereFilter"] = "scheduleID=" + id;
			data["feedback"] = $("[name=scheduleName]").val();

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
			sweetAlertConfirmation("cancel", "Schedule", "modal_schedule_setup");
		} else {
			preventRefresh(false);
			$("#modal_schedule_setup").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------


	// ------ CHECK SCHEDULE SETUP STATUS -------
	$(document).on("change", "#scheduleStatus", function(){
		const status     = $(this).val();
		const scheduleID = $(this).attr("scheduleID");

		if (scheduleID) {
			const data = getTableData(
				`hris_employee_list_tbl`,
				`scheduleID`,
				`employeeStatus = 1 AND scheduleID = ${scheduleID}`
			);
			if (data && data.length > 0 && status == 0) {
				setTimeout(() => {
					$(this).removeClass("is-valid").addClass("is-invalid");
					// $(this).parent().find(".selection").children().removeClass("no-error").addClass("has-error");
					$(this).parent().find(".invalid-feedback").text("This record is currently in use!");
					document.getElementById("btnUpdate").disabled = true;
				}, 10);
			} else {
				setTimeout(() => {
					$(this).removeClass("is-invalid").addClass("is-valid");
					// $(this).parent().find(".selection").children().removeClass("has-error").addClass("no-error");
					$(this).parent().find(".invalid-feedback").text("");
					document.getElementById("btnUpdate").disabled = false;
				}, 10);
			}
		}
    });
    // ------ END CHECK SCHEDULE SETUP STATUS -------
});
