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
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				// scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 150 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 80  },
					{ targets: 8, width: 80 },
				],
			});

		var table = $("#tableMyForms")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				// scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 150 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 80  },
					{ targets: 8, width: 80 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_leave_request_tbl", "approversID")) {
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
			`hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl
			USING(employeeID)`,
			"",
			`employeeID != ${sessionID} AND leaveRequestStatus != 0 AND leaveRequestStatus != 4 ORDER BY leaveRequestID DESC`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Remaining Leave</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {

			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.leaveRequestID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.leaveRequestStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
				html += `
				<tr>
					<td>${item.leaveRequestCode}</td>
					<td>${item.employeeFirstname + ' ' +item.employeeLastname}</td>
					<td>${moment(item.createdAt).format("MMMM DD, YYYY")}</td>
					<td>${moment(item.leaveRequestDateFrom).format("MMMM DD, YYYY")}</td>
                    <td>${moment(item.leaveRequestDateTo).format("MMMM DD, YYYY")}</td>
                    <td>${item.leaveRequestNumberOfDate}</td>
					<td>${item.leaveRequestReason}</td>
					<td class="text-center">${getStatusStyle(item.leaveRequestStatus)}</td>
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
			`hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl
			USING(employeeID)`,
			"",
			`employeeID = ${sessionID}  ORDER BY leaveRequestID DESC`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Remaining Leave</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			// let unique = {
			// 	id: item.leaveRequestID,
			// 	leaveRequestDate: moment(item.leaveRequestDate).format("MMMM DD, YYYY")
			// };
			// uniqueData.push(unique);
			let button =
				item.leaveRequestStatus != 0 ?
				`
            <button class="btn btn-view w-100 btnView" id="${item.leaveRequestID}"><i class="fas fa-eye"></i> View</button>` :
				`
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.leaveRequestID}" 
                code="${item.leaveRequestCode}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${item.leaveRequestCode}</td>
                <td>${item.employeeFirstname + ' ' + item.employeeLastname}</td>
				<td>${moment(item.createdAt).format("MMMM DD, YYYY")}</td>
                <td>${moment(item.leaveRequestDateFrom).format("MMMM DD, YYYY")}</td>
                <td>${moment(item.leaveRequestDateTo).format("MMMM DD, YYYY")}</td>
                <td>${item.leaveRequestNumberOfDate}</td>
                <td>${item.leaveRequestReason}</td>
                <td class="text-center">${getStatusStyle(item.leaveRequestStatus)}</td>
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
				leaveRequestID = "",
					leaveRequestCode = "",
					leaveRequestStatus = "",
					employeeID = "",
					approversID = "",
					approversDate = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (leaveRequestStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						leaveRequestID="${leaveRequestID}"
						leaveRequestCode="${leaveRequestCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						leaveRequestID="${leaveRequestID}"
						leaveRequestCode="${leaveRequestCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (leaveRequestStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							leaveRequestID="${leaveRequestID}"
							leaveRequestCode="${leaveRequestCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (leaveRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							leaveRequestID="${leaveRequestID}"
							leaveRequestCode="${leaveRequestCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							leaveRequestID="${leaveRequestID}"
							leaveRequestCode="${leaveRequestCode}"><i class="fas fa-ban"></i> 
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
			leaveRequestID = "",
				leaveRequestCode = "",
				employeeID = "",
				leaveRequestDate = "",
				leaveRequestDateFrom = "",
				leaveRequestDateTo = "",
				leaveRequestNumberOfDate = "",
				leaveRequestRemainingLeave = "",
				leaveRequestReason = "",
				leaveRequestRemarks = "",
				approversID = "",
				approversStatus = "",
				approversDate = "",
				leaveRequestStatus = false,
				submittedAt = false,
				createdAt = false,
		} = data && data[0];

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}
		$("#btnBack").attr("leaveRequestID", leaveRequestID);
		$("#btnBack").attr("leaveRequestCode", leaveRequestCode);
		$("#btnBack").attr("status", leaveRequestStatus);

		let disabled = readOnly && "disabled";
		let button = formButtons(data);



		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${leaveRequestCode ? leaveRequestCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${leaveRequestStatus ? getStatusStyle(leaveRequestStatus) : "---"}</h6>      
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
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(leaveRequestStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${leaveRequestRemarks ? leaveRequestRemarks : "---"}</h6>      
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
                <label>Date ${!disabled ? "<code>*</code>" : ""}</label>&nbsp;
				<input type="text" 
                        class="form-control leaveRequestDateFromdata" 
                        id="leaveRequestDate" 
                        name="leaveRequestDate" 
						required
						value="${leaveRequestDate}"
						${disabled}/>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                    <input 
                        type="hidden" 
                        class="form-control"
                        disabled 
                        name="leaveRequestDateFrom" 
                        id="leaveRequestDateFrom"
                        required 
                        value="${leaveRequestDateFrom}">
                        <input 
                        type="hidden" 
                        class="form-control"
                        disabled 
                        name="leaveRequestDateTo" 
                        id="leaveRequestDateTo"
                        value="${leaveRequestDateTo}"
                        required 
                       >
                </div>
            </div>    
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label for="">Number of Days</label>
                    <input 
                        type="text" 
                        class="form-control"
                        disabled 
                        name="leaveRequestNumberOfDate" 
                        id="leaveRequestNumberOfDate"
                        value="${leaveRequestNumberOfDate}">
                    <div class="invalid-feedback d-block" id="invalid-leaveRequestNumberOfDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
            <div class="form-group">
                <label for="">Number of leave</label>
                <input 
                    type="text" 
                    class="form-control"
                    disabled 
                    name="leaveRequestNumberOfDate" 
                    id="leaveRequestNumberOfDate"
                    required 
                    value="1">
                <div class="invalid-feedback d-block" id="invalid-leaveRequestNumberOfDate"></div>
            </div>
        </div>
            <div class="col-md-12 col-sm-12" >
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="leaveRequestReason"
                        name="leaveRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${leaveRequestReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-leaveRequestReason"></div>
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
			daterange();

			if (leaveRequestDate) {
				let dateArr = leaveRequestDate.split(" - ");
				let start = moment(dateArr[0]).format("MMMM D, YYYY"),
					end = moment(dateArr[1]).format("MMMM D, YYYY");
				cb(start, end);
			}
			return html;
		}, 500);
	}

	function dateDiffInDays(start, end) {
		return Math.round((end - start) / (1000 * 60 * 60 * 24));
	}

	function cb(start, end = "") {
		let from = moment(start).format('YYYY-MM-DD'),
			to = moment(end).format('YYYY-MM-DD');

		$("#leaveRequestDate").data('daterangepicker').setStartDate(start || from);
		$("#leaveRequestDate").data('daterangepicker').setEndDate(end || to);

		$("#leaveRequestDateFrom").val(from);
		$("#leaveRequestDateTo").val(to);


		var daysDiff = dateDiffInDays(new Date(start), new Date(end));
		$("#leaveRequestNumberOfDate").val(daysDiff);
	}

	function daterange() {
		$('#leaveRequestDate').daterangepicker({
			"showDropdowns": true,
			"locale": {
				format: "MMMM DD, YYYY",
			},
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}

		}, cb);
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

			headerButton(true, "Add Leave Request");
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
	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_change_schedule", true);
		//  data["tableData[leaveRequestDateFrom]"] = start;
		//  data["tableData[leaveRequestDateTo]"] = end;

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD hh:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD hh:mm:ss");
		if (action && method != "" && feedback != "") {
			data["tableData[leaveRequestStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"] = feedback;
			data["method"] = method;
			data["tableName"] = "hris_leave_request_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[leaveRequestCode]"] = generateCode(
					"SCH",
					false,
					"hris_leave_request_tbl",
					"leaveRequestCode",
				);

				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"] = sessionID;
				data["tableData[createdAt]"] = dateToday;

				const approversID = getModuleApprover("leave request");
				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"] = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"] = dateToday;
					data["tableData[leaveRequestStatus]"] = 2;
				}

				// const approversID = getModuleApprover("change request");
				// if (approversID) {
				// 	data["tableData[approversID]"] = approversID;
				// } else {
				// 	data["tableData[approversID]"] = sessionID;
				// 	data["tableData[approversStatus]"] = 2;
				// 	data["tableData[approversDate]"] = dateToday;
				// 	data["tableData[leaveRequestStatus]"] = 2;
				// }

			} else {
				data["whereFilter"] = "leaveRequestID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----



	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id = $(this).attr("leaveRequestID");
		const status = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			const feedback = $(this).attr("leaveRequestCode") ?
				$(this).attr("leaveRequestCode") :
				generateCode(
					"SCH",
					false,
					"hris_leave_request_tbl",
					"leaveRequestCode",
				);

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			cancelForm(
				"save",
				action,
				"LEAVE REQUEST",
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
		const id = $(this).attr("id");
		const code = $(this).attr("code");

		const tableData = getTableData(
			"hris_leave_request_tbl",
			"*",
			"leaveRequestID=" + id,
			""
		);

		pageContent(true, tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		const tableData = getTableData(
			"hris_leave_request_tbl",
			"*",
			"leaveRequestID=" + id,
			""
		);
		pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("form_change_schedule");
		if (validate) {
			const action = "insert"; // CHANGE
			const feedback = generateCode(
				"SCH",
				false,
				"hris_leave_request_tbl",
				"leaveRequestCode",
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"LEAVE REQUEST",
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
		const id = $(this).attr("leaveRequestID");

		const validate = validateForm("form_change_schedule");

		if (validate) {
			const feedback = $(this).attr("leaveRequestCode") ?
				$(this).attr("leaveRequestCode") :
				generateCode(
					"SCH",
					false,
					"hris_leave_request_tbl",
					"leaveRequestCode"
				);

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);

			let notificationData = {
				moduleID: 55,
				notificationTitle: "Leave Request",
				notificationDescription: `${sessionID} asked for your approval.`,
				notificationType: 2,
				employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			};

			formConfirmation(
				"submit",
				action,
				"LEAVE REQUEST",
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
		const id = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("leaveRequestCode");

		// const validate = validateForm("form_change_schedule");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {
		// const action = "update";

		// const data = getData(action, 4, "cancelform", feedback, id);
		const action = "update";
		const data = getData(action, 4, "cancelform", feedback, id);
		formConfirmation(
			"cancelform",
			action,
			"LEAVE REQUEST",
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
		const id = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("leaveRequestCode") ?
			$(this).attr("leaveRequestCode") :
			generateCode(
				"SCH",
				false,
				"hris_leave_request_tbl",
				"leaveRequestCode",
			);

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"LEAVE REQUEST",
			"",
			"form_change_schedule",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("leaveRequestCode");
		let tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
		if (tableData) {
			let approversID = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate = tableData[0].approversDate;
			let employeeID = tableData[0].employeeID;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			data["tableData[approversDate]"] = updateApproveDate(approversDate);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID: 55,
					notificationTitle: "Leave Request",
					notificationDescription: `${tableData[0].leaveRequestCode}: Your request has been approved.`,
					notificationType: 2,
					employeeID: employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID: 55,
					notificationTitle: "Leave Request",
					notificationDescription: `${employeeID} asked for your approval.`,
					notificationType: 2,
					employeeID: getNotificationEmployeeID(approversID, approversDate),
				};
			}
			data["tableData[leaveRequestStatus]"] = status;

			formConfirmation(
				"approve",
				"update",
				"LEAVE REQUEST",
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
	$(document).on("click", "#btnReject", function () {
		const id = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("leaveRequestCode");

		$("#modal_leave_request_content").html(preloader);
		$("#modal_leave_request .page-title").text("DENY LEAVE REQUEST DOCUMENT");
		$("#modal_leave_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
					minlength="2"
					maxlength="250"
					id="leaveRequestRemarks"
					name="leaveRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-leaveRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-primary" id="btnRejectConfirmation"
			leaveRequestID="${id}"
			leaveRequestCode="${feedback}">Deny</button>
			<button class="btn btn-danger" data-dismiss="modal">Cancel</button>
		</div>`;
		$("#modal_leave_request_content").html(html);
	})


	$(document).on("click", "#btnRejectConfirmation", function () {
		const id = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("leaveRequestCode");

		const validate = validateForm("modal_leave_request");
		if (validate) {
			let tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
			if (tableData) {
				let approversID = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate = tableData[0].approversDate;
				let employeeID = tableData[0].employeeID;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[leaveRequestRemarks]"] = $("[name=leaveRequestRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				// data["tableData[approversDate]"] = updateApproveDate(approversDate);
				data["tableData[approversDate]"] = updateApproveDate(approversDate);

				let notificationData = {
					moduleID: 55,
					notificationTitle: "Leave Request",
					notificationDescription: `${tableData[0].leaveRequestCode}: Your request has been denied.`,
					notificationType: 2,
					employeeID: employeeID,
				};

				formConfirmation(
					"reject",
					"update",
					"LEAVE REQUEST",
					"modal_leave_request",
					"",
					data,
					true,
					pageContent
				);
			}
		}
	})
	// ----- END REJECT DOCUMENT -----
});
