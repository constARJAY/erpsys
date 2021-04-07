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
					{ targets: 5, width: 150 },
					{ targets: 6, width: 80 },
					{ targets: 7, width: 80 },
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
					{ targets: 5, width: 150 },
					{ targets: 6, width: 80 },
					{ targets: 7, width: 80 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_on_timein_timeout_tbl", "approversID")) {
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
			`hris_on_timein_timeout_tbl AS notime
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`notime.no_Timein_timeoutID, notime.no_Timein_timeoutCode, notime.employeeID,notime.no_Timein_timeoutDate, notime.no_Timein_timeoutTimeIn,
			notime.no_Timein_timeoutTimeOut,notime.no_Timein_timeoutReason,notime.approversID,notime.approversStatus,notime.approversDate,notime.no_Timein_timeoutStatus,
			notime.no_Timein_timeoutRemarks,notime.submittedAt,notime.createdBy,notime.updatedBy,notime.createdAt,notime.updatedAt,
			hris_employee_list_tbl.employeeFirstname, hris_employee_list_tbl.employeeLastname`,
			`notime.employeeID != ${sessionID} AND no_Timein_timeoutStatus != 0 AND no_Timein_timeoutStatus != 4`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			if(item.no_Timein_timeoutStatus=="0"){
				var submitat = "";
			}else{
				var submitat = moment(item.submittedAt).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.no_Timein_timeoutID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.no_Timein_timeoutStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
				html += `
				<tr>
					<td>${item.no_Timein_timeoutCode}</td>
					<td>${item.employeeFirstname + ' ' +item.employeeLastname}</td>
					<td>${submitat}</td>
					<td>${moment(item.no_Timein_timeoutDate).format("MMMM DD, YYYY")}</td>
					<td>${item.no_Timein_timeoutTimeIn} - ${item.no_Timein_timeoutTimeOut}</td>
					<td>${item.no_Timein_timeoutReason}</td>
					<td class="text-center">${getStatusStyle(item.no_Timein_timeoutStatus)}</td>
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
			`hris_on_timein_timeout_tbl AS notime
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`notime.no_Timein_timeoutID, notime.no_Timein_timeoutCode, notime.employeeID,notime.no_Timein_timeoutDate, notime.no_Timein_timeoutTimeIn,
			notime.no_Timein_timeoutTimeOut,notime.no_Timein_timeoutReason,notime.approversID,notime.approversStatus,notime.approversDate,notime.no_Timein_timeoutStatus,
			notime.no_Timein_timeoutRemarks,notime.submittedAt,notime.createdBy,notime.updatedBy,notime.createdAt,notime.updatedAt,
			hris_employee_list_tbl.employeeFirstname, hris_employee_list_tbl.employeeLastname`,
			`employeeID = ${sessionID}`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			if(item.no_Timein_timeoutStatus=="0"){
				var submitat = "";
			}else{
				var submitat = moment(item.submittedAt).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let unique = {
				id: item.no_Timein_timeoutID,
				no_Timein_timeoutDate: moment(item.no_Timein_timeoutDate).format("MMMM DD, YYYY")
			};
			uniqueData.push(unique);
			let button =
				item.no_Timein_timeoutStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${item.no_Timein_timeoutID}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.no_Timein_timeoutID}" 
                code="${item.no_Timein_timeoutCode}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${item.no_Timein_timeoutCode}</td>
                <td>${item.employeeFirstname + ' ' +item.employeeLastname}</td>
				<td>${submitat}</td>
                <td>${moment(item.no_Timein_timeoutDate).format("MMMM DD, YYYY")}</td>
                <td>${item.no_Timein_timeoutTimeIn} - ${item.no_Timein_timeoutTimeOut}</td>
                <td>${item.no_Timein_timeoutReason}</td>
                <td class="text-center">${getStatusStyle(item.no_Timein_timeoutStatus)}</td>
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
				no_Timein_timeoutID     = "",
				no_Timein_timeoutCode   = "",
				no_Timein_timeoutStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (no_Timein_timeoutStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						no_Timein_timeoutID="${no_Timein_timeoutID}"
						no_Timein_timeoutCode="${no_Timein_timeoutCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						no_Timein_timeoutID="${no_Timein_timeoutID}"
						no_Timein_timeoutCode="${no_Timein_timeoutCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (no_Timein_timeoutStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							no_Timein_timeoutID="${no_Timein_timeoutID}"
							no_Timein_timeoutCode="${no_Timein_timeoutCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} 
			} else {
				if (no_Timein_timeoutStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							no_Timein_timeoutID="${no_Timein_timeoutID}"
							no_Timein_timeoutCode="${no_Timein_timeoutCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							no_Timein_timeoutID="${no_Timein_timeoutID}"
							no_Timein_timeoutCode="${no_Timein_timeoutCode}"><i class="fas fa-ban"></i> 
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
			no_Timein_timeoutID      = "",
			no_Timein_timeoutCode    = "",
			employeeID            	 = "",
			no_Timein_timeoutDate    = "",
			no_Timein_timeoutTimeIn  = "",
			no_Timein_timeoutTimeOut = "",
			no_Timein_timeoutReason  = "",
			no_Timein_timeoutRemarks = "",
			approversID          	 = "",
			approversStatus       = "",
			approversDate         = "",
			no_Timein_timeoutStatus  = false,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}

		$("#btnBack").attr("no_Timein_timeoutID", no_Timein_timeoutID);
		$("#btnBack").attr("no_Timein_timeoutCode", no_Timein_timeoutCode);
		$("#btnBack").attr("status", no_Timein_timeoutStatus);

		let disabled = readOnly && "disabled";
		let button   = formButtons(data);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${no_Timein_timeoutCode ? no_Timein_timeoutCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${no_Timein_timeoutStatus ? getStatusStyle(no_Timein_timeoutStatus) : "---"}</h6>      
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
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(no_Timein_timeoutStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${no_Timein_timeoutRemarks ? no_Timein_timeoutRemarks : "---"}</h6>      
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
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="no_Timein_timeoutDate"
                        name="no_Timein_timeoutDate"
                        value="${no_Timein_timeoutDate && moment(no_Timein_timeoutDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${no_Timein_timeoutID}"
						title="Date"
						>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="no_Timein_timeoutTimeIn" 
                        name="no_Timein_timeoutTimeIn" 
                        required
                        value="${no_Timein_timeoutTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-no_Timein_timeoutTimeIn"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="no_Timein_timeoutTimeOut" 
                        name="no_Timein_timeoutTimeOut" 
                        required
                        value="${no_Timein_timeoutTimeOut}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-no_Timein_timeoutTimeOut"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="no_Timein_timeoutReason"
                        name="no_Timein_timeoutReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${no_Timein_timeoutReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-no_Timein_timeoutReason"></div>
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

			headerButton(true, "Add No Time-in / Time-out");
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
			const fromValue = $("#no_Timein_timeoutTimeIn").val()+":00";
			const validated = $(this).hasClass("validated");
			const toValue = $(this).val()+":00";

			const timeIn = moment(`2021-01-01 ${fromValue}`);
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
			data["tableData[no_Timein_timeoutStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"] 	= feedback;
			data["method"] 		= method;
			data["tableName"] = "hris_on_timein_timeout_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[no_Timein_timeoutCode]"] = generateCode(
					"SCH",
					false,
					"hris_on_timein_timeout_tbl",
					"no_Timein_timeoutCode",
				);
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday;

				const approversID = getModuleApprover(57);
				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]     = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"]   = dateToday;
					data["tableData[no_Timein_timeoutStatus]"] = 2;
				}
				// if (approversID) {
				// 	data["tableData[approversID]"] = approversID;
				// } else {
				// 	data["tableData[approversID]"] = sessionID;
				// 	data["tableData[approversStatus]"] = 2;
				// 	data["tableData[approversDate]"] = dateToday;
				// 	data["tableData[no_Timein_timeoutStatus]"] = 2;
				// }

			} else {
				data["whereFilter"] = "no_Timein_timeoutID=" + id;
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
		const id       = $(this).attr("no_Timein_timeoutID");
		const status   = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			const feedback = $(this).attr("no_Timein_timeoutCode")
			? $(this).attr("no_Timein_timeoutCode")
			: generateCode(
					"SCH",
					false,
					"hris_on_timein_timeout_tbl",
					"no_Timein_timeoutCode",
			  );

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			cancelForm(
				"save",
				action,
				"NO TIME-IN / TIME-OUT",
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
			"hris_on_timein_timeout_tbl",
			"*",
			"no_Timein_timeoutID=" + id,
			""
		);

		pageContent(true, tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id        = $(this).attr("id");
		const tableData = getTableData(
			"hris_on_timein_timeout_tbl",
			"*",
			"no_Timein_timeoutID=" + id,
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
				"hris_on_timein_timeout_tbl",
				"no_Timein_timeoutCode"
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"NO TIME-IN / TIME-OUT",
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
		const id = $(this).attr("no_Timein_timeoutID");

		const validate = validateForm("form_change_schedule");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("no_Timein_timeoutCode")
			? $(this).attr("no_Timein_timeoutCode")
			: generateCode(
					"SCH",
					false,
					"hris_on_timein_timeout_tbl",
					"no_Timein_timeoutCode",
					`employeeID = ${sessionID}`
			  );
			  
			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);
			
			let notificationData = {
				moduleID:                58,
				notificationTitle:       "No Time-in/ Time-out",
				notificationDescription: `${sessionID} asked for your approval.`,
				notificationType:        2,
				employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			};
			formConfirmation(
				"submit",
				action,
				"NO TIME-IN / TIME-OUT",
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
		const id = $(this).attr("no_Timein_timeoutID");
		const feedback = $(this).attr("no_Timein_timeoutCode");

		// const validate = validateForm("form_change_schedule");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {
			// const action = "update";

			// const data = getData(action, 4, "cancelform", feedback, id);
			const action = "update";
			const data   = getData(action, 4, "cancelform", feedback, id);
			formConfirmation(
				"cancelform",
				action,
				"NO TIME-IN / TIME-OUT",
				"",
				"form_change_schedule",
				data,
				true,
				pageContent
			);
		// }
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id = $(this).attr("no_Timein_timeoutID");
		const feedback = $(this).attr("no_Timein_timeoutCode")
			? $(this).attr("no_Timein_timeoutCode")
			: generateCode(
					"SCH",
					false,
					"hris_on_timein_timeout_tbl",
					"no_Timein_timeoutCode",
					`employeeID = ${sessionID}`
			  );

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"NO TIME-IN / TIME-OUT",
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
		const id       = $(this).attr("no_Timein_timeoutID");
		const feedback = $(this).attr("no_Timein_timeoutCode");
		let tableData = getTableData("hris_on_timein_timeout_tbl", "", "no_Timein_timeoutID = "+ id);
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
					moduleID:                58,
					notificationTitle:       "No Time-in / Time-out",
					notificationDescription: `${tableData[0].no_Timein_timeoutCode}: Your request has been approved.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                58,
					notificationTitle:       "No Time-in / Time-out",
					notificationDescription: `${employeeID} asked for your approval.`,
					notificationType:        2,
					employeeID:              getNotificationEmployeeID(approversID, approversDate),
				};
			}
			data["tableData[no_Timein_timeoutStatus]"] = status;

			formConfirmation(
				"approve",
				"update",
				"NO TIME-IN / TIME-OUT",
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
		const id       = $(this).attr("no_Timein_timeoutID");
		const feedback = $(this).attr("no_Timein_timeoutCode");

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY NO TIME-IN / TIME-OUT DOCUMENT");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
					minlength="2"
					maxlength="250"
					id="no_Timein_timeoutRemarks"
					name="no_Timein_timeoutRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-no_Timein_timeoutRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			no_Timein_timeoutID="${id}"
			no_Timein_timeoutCode="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	})


	$(document).on("click", "#btnRejectConfirmation", function() {
		const id       = $(this).attr("no_Timein_timeoutID");
		const feedback = $(this).attr("no_Timein_timeoutCode");

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_on_timein_timeout_tbl", "", "no_Timein_timeoutID = "+ id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
	
				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[no_Timein_timeoutRemarks]"] = $("[name=no_Timein_timeoutRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]   = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                58,
					notificationTitle:       "No Time-in / Time-out",
					notificationDescription: `${tableData[0].no_Timein_timeoutCode}: Your request has been denied.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
	
				formConfirmation(
					"reject",
					"update",
					"NO TIME-IN / TIME-OUT",
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
