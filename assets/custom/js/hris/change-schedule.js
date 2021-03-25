$(document).ready(function () {

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
					{ targets: 0, width: 80 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 80 },
					{ targets: 6, width: 80 },
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
					{ targets: 0, width: 80 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 80 },
					{ targets: 6, width: 80 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_change_schedule_tbl", "approversID")) {
				let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab">For Approval</a></li>
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab">My Forms</a></li>
                        </ul>
                    </div>
                </div>`;
				$("#headerContainer").append(html);
			}
		} else {
			$("#headerContainer").find(".appendHeader").remove();
		}
	}
	// ----- END HEADER CONTENT -----


	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let scheduleData = getTableData(
			"hris_change_schedule_tbl",
			"",
			`employeeID != ${sessionID} AND changeScheduleStatus != 0 AND changeScheduleStatus != 4`
		);

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

		scheduleData.map((item) => {

			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.changeScheduleID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.changeScheduleStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
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
			}
			
		});

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


	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
			"hris_change_schedule_tbl",
			"",
			`employeeID = ${sessionID}`
		);

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

		scheduleData.map((item) => {
			let unique = {
				id: item.changeScheduleID,
				changeScheduleDate: moment(item.changeScheduleDate).format("MMMM DD, YYYY")
			};
			uniqueData.push(unique);

			let button =
				item.changeScheduleStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${item.changeScheduleID}"><i class="fas fa-eye"></i> View</button>`
					: `
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
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			return html;
		}, 500);
	}
	// ----- END MY FORMS CONTENT -----


	// ----- FORM BUTTONS -----
	function formButtons(data = false) {
		let button = "";
		if (data) {

			let {
				changeScheduleID     = "",
				changeScheduleCode   = "",
				changeScheduleStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (changeScheduleStatus == 0) {
					// DRAFT
					button = `
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
					</button>`;
				} else if (changeScheduleStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							changeScheduleID="${changeScheduleID}"
							changeScheduleCode="${changeScheduleCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} 
			} else {
				if (changeScheduleStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							changeScheduleID="${changeScheduleID}"
							changeScheduleCode="${changeScheduleCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							changeScheduleID="${changeScheduleID}"
							changeScheduleCode="${changeScheduleCode}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}

		} else {
			button = `
			<button 
				class="btn btn-submit" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);

		let {
			changeScheduleID      = "",
			changeScheduleCode    = "",
			employeeID            = "",
			changeScheduleDate    = "",
			changeScheduleTimeIn  = "",
			changeScheduleTimeOut = "",
			changeScheduleReason  = "",
			changeScheduleRemarks = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			changeScheduleStatus  = false,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}

		$("#btnBack").attr("changeScheduleID", changeScheduleID);
		$("#btnBack").attr("changeScheduleCode", changeScheduleCode);
		$("#btnBack").attr("status", changeScheduleStatus);

		let disabled = readOnly && "disabled";
		let button   = formButtons(data);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${changeScheduleCode ? changeScheduleCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${changeScheduleStatus ? getStatusStyle(changeScheduleStatus) : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(changeScheduleStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${changeScheduleRemarks ? changeScheduleRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_change_schedule">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" class="form-control" disabled value="Arjay Diangzon">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="Operations">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="Junior Developer I">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date <code>*</code></label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="changeScheduleDate"
                        name="changeScheduleDate"
                        value="${changeScheduleDate && moment(changeScheduleDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${changeScheduleID}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In <code>*</code></label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="changeScheduleTimeIn" 
                        name="changeScheduleTimeIn" 
                        required
                        value="${changeScheduleTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleTimeIn"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time Out <code>*</code></label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="changeScheduleTimeOut" 
                        name="changeScheduleTimeOut" 
                        required
                        value="${changeScheduleTimeOut}"
						${disabled}>
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
                        style="resize:none;"
						${disabled}>${changeScheduleReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleReason"></div>
                </div>
            </div>
            <div class="col-md-12 text-right">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			data ? initInputmaskTime(false) : initInputmaskTime();
			return html;
		}, 500);
	}
	// ----- END FORM CONTENT -----


	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false) {
		$("#page_content").html(preloader);
		if (!isForm) {
			preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForApprovalParent">
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="table-responsive" id="tableMyFormsParent">
                    </div>
                </div>
            </div>`;
			$("#page_content").html(html);

			headerButton(true, "Add Change Schedule");
			headerTabContent();
			forApprovalContent();
			myFormsContent();
		} else {
			headerButton(false);
			headerTabContent(false);
			formContent(data, readOnly);
		}
	}
	pageContent();
	// ----- END PAGE CONTENT -----


	// ----- CUSTOM INPUTMASK -----
	function initInputmaskTime(isMethodAdd = true) {
		if (isMethodAdd) {
			$(".timeIn").val("08:00");
			$(".timeOut").val("17:00");
		}

		$(".timeIn").inputmask({
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
		$(".timeOut").inputmask({
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
		let element = elementID ? `#${elementID}` : ".timeOut";
		let flag = 0;
		$(element).each(function () {
			const fromValue = $("#changeScheduleTimeIn").val()+":00";
			const validated = $(this).hasClass("validated");
			const toValue   = $(this).val()+":00";

			const timeIn  = moment(`2021-01-01 ${fromValue}`);
			const timeOut = moment(`2021-01-01 ${toValue}`);

			let diff = moment.duration(timeOut.diff(timeIn));
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


	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_change_schedule", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD hh:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD hh:mm:ss");

		if (action && method != "" && feedback != "") {
			data["tableData[changeScheduleStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"]  = feedback;
			data["method"]    = method;
			data["tableName"] = "hris_change_schedule_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[changeScheduleCode]"] = generateCode(
					"SCH",
					false,
					"hris_change_schedule_tbl",
					"changeScheduleCode",
				);
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday;

				const approversID = getModuleApprover("change request");
				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]     = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"]   = dateToday;
					data["tableData[changeScheduleStatus]"] = 2;
				}

			} else {
				data["whereFilter"] = "changeScheduleID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----


	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeOut", function () {
		checkTimeRange($(this).attr("id"));
	});
	// ----- END CHANGE TIME TO -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id       = $(this).attr("changeScheduleID");
		const status   = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			const feedback = $(this).attr("changeScheduleCode")
			? $(this).attr("changeScheduleCode")
			: generateCode(
					"SCH",
					false,
					"hris_change_schedule_tbl",
					"changeScheduleCode",
			  );

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			cancelForm(
				"save",
				action,
				"CHANGE SCHEDULE",
				"",
				"form_change_schedule",
				data,
				true,
				pageContent
			);
		}
		
	});
	// ----- END CLOSE FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id   = $(this).attr("id");
		const code = $(this).attr("code");

		const tableData = getTableData(
			"hris_change_schedule_tbl",
			"*",
			"changeScheduleID=" + id,
			""
		);

		pageContent(true, tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id        = $(this).attr("id");
		const tableData = getTableData(
			"hris_change_schedule_tbl",
			"*",
			"changeScheduleID=" + id,
			""
		);
		pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("form_change_schedule");
		const validateTime = checkTimeRange(false, true);
		if (validate && validateTime) {
			const action = "insert"; // CHANGE
			const feedback = generateCode(
				"SCH",
				false,
				"hris_change_schedule_tbl",
				"changeScheduleCode",
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"CHANGE SCHEDULE",
				"",
				"form_change_schedule",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = $(this).attr("changeScheduleID");

		const validate = validateForm("form_change_schedule");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("changeScheduleCode")
			? $(this).attr("changeScheduleCode")
			: generateCode(
					"SCH",
					false,
					"hris_change_schedule_tbl",
					"changeScheduleCode",
			  );
			  
			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);

			
			let notificationData = {
				moduleID:                13,
				notificationTitle:       "Change Schedule Form",
				notificationDescription: `${sessionID} asked for your approval.`,
				notificationType:        2,
				employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			};

			formConfirmation(
				"submit",
				action,
				"CHANGE SCHEDULE",
				"",
				"form_change_schedule",
				data,
				true,
				pageContent,
				notificationData
			);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode");

		const action = "update";
		const data   = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"CHANGE SCHEDULE",
			"",
			"form_change_schedule",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode")
			? $(this).attr("changeScheduleCode")
			: generateCode(
					"SCH",
					false,
					"hris_change_schedule_tbl",
					"changeScheduleCode",
			  );

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"CHANGE SCHEDULE",
			"",
			"form_change_schedule",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function() {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode");
		let tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID = "+ id);
		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID   ;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			data["tableData[approversDate]"]   = updateApproveDate(approversDate);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                13,
					notificationTitle:       "Change Schedule Form",
					notificationDescription: `${tableData[0].changeScheduleCode}: Your request has been approved.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                13,
					notificationTitle:       "Change Schedule Form",
					notificationDescription: `${employeeID} asked for your approval.`,
					notificationType:        2,
					employeeID:              getNotificationEmployeeID(approversID, approversDate),
				};
			}

			data["tableData[changeScheduleStatus]"] = status;

			formConfirmation(
				"approve",
				"update",
				"CHANGE SCHEDULE",
				"",
				"form_change_schedule",
				data,
				true,
				pageContent,
				notificationData
			);
		}
	})
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function() {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode");

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY CHANGE SCHEDULE DOCUMENT");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
					minlength="2"
					maxlength="250"
					id="changeScheduleRemarks"
					name="changeScheduleRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-changeScheduleRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-primary" id="btnRejectConfirmation"
			changeScheduleID="${id}"
			changeScheduleCode="${feedback}">Deny</button>
			<button class="btn btn-danger" data-dismiss="modal">Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	})


	$(document).on("click", "#btnRejectConfirmation", function() {
		const id       = $(this).attr("changeScheduleID");
		const feedback = $(this).attr("changeScheduleCode");

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID = "+ id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
	
				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[changeScheduleRemarks]"] = $("[name=changeScheduleRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]   = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                13,
					notificationTitle:       "Change Schedule Form",
					notificationDescription: `${tableData[0].changeScheduleCode}: Your request has been denied.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
	
				formConfirmation(
					"reject",
					"update",
					"CHANGE SCHEDULE",
					"modal_change_schedule",
					"",
					data,
					true,
					pageContent,
					notificationData
				);
			}
		}
	})
	// ----- END REJECT DOCUMENT -----
});
