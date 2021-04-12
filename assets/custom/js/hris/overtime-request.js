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
			.css({ "min-width": "100%"})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 180 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 200 },
					{ targets: 4, width: 200 },
					{ targets: 5, width: 200 },
					{ targets: 6, width: 80 },
					{ targets: 7, width: 250 },
					{ targets: 8, width: 80 },
				],
			});

		var table = $("#tableMyForms")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 180 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 200 },
					{ targets: 4, width: 200 },
					{ targets: 5, width: 200 },
					{ targets: 6, width: 80 },
					{ targets: 7, width: 250 },
					{ targets: 8, width: 80 },
				],
			});
	}
	// ----- END DATATABLES -----

	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_overtime_request_tbl", "approversID")) {
				let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval</a></li>
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Forms</a></li>
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
			if (isCreateAllowed(60)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
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

		let requestData = getTableData(
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_overtime_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND overtimeRequestStatus != 0 AND overtimeRequestStatus != 4`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), hris_overtime_request_tbl.createdAt DESC`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>

					<th>Current Approver</th>
					<th>Date Created</th>
					<th>Date Submitted</th>
					<th>Date Approved</th>

					<th>Status</th>
					<th>Remarks</th>
                    
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		requestData.map((item) => {
			let remarks = item.overtimeRequestRemarks
				? item.overtimeRequestRemarks
				: "-";
			let dateCreated = moment(item.dateCreated).format(
				"MMMM DD, YYYY HH:mm:ss"
			);
			let dateSubmitted = item.submittedAt
				? moment(item.dateSubmitted).format("MMMM DD, YYYY HH:mm:ss")
				: "-";
			let dateApproved =
				item.overtimeRequestStatus == 2 ? item.approversDate.split("|") : "-";
			if (dateApproved != "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format(
					"MMMM DD, YYYY HH:mm:ss"
				);
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.overtimeRequestID}"><i class="fas fa-eye"></i> View</button>`;

			if (
				isImCurrentApprover(
					item.approversID,
					item.approversDate,
					item.overtimeRequestStatus
				) ||
				isAlreadyApproved(item.approversID, item.approversDate)
			) {
				html += `
				<tr>
					<td>${item.overtimeRequestCode}</td>
					<td>${item.fullname}</td>
					
					<td>${getCurrentApprover(
						item.approversID,
						item.approversDate,
						item.overtimeRequestStatus
					)}</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>

					<td class="text-center">${getStatusStyle(item.overtimeRequestStatus)}</td>
					<td>${remarks}</td>
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
			viewNotification();
			return html;
		}, 500);
	}
	// ----- END FOR APPROVAL CONTENT -----

	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let requestData = getTableData(
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_overtime_request_tbl.createdAt AS dateCreated",
			`hris_overtime_request_tbl.employeeID = ${sessionID}`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), hris_overtime_request_tbl.createdAt ASC`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>

                    <th>Current Approver</th>
					<th>Date Created</th>
					<th>Date Submitted</th>
					<th>Date Approved</th>

					<th>Status</th>
					<th>Remarks</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		requestData.map((item) => {
			let unique = {
				id: item.overtimeRequestID,
				overtimeRequestDate: moment(item.overtimeRequestDate).format(
					"MMMM DD, YYYY"
				),
			};
			uniqueData.push(unique);

			let remarks = item.overtimeRequestRemarks
				? item.overtimeRequestRemarks
				: "-";
			let dateCreated = moment(item.dateCreated).format(
				"MMMM DD, YYYY HH:mm:ss"
			);
			let dateSubmitted = item.submittedAt
				? moment(item.dateSubmitted).format("MMMM DD, YYYY HH:mm:ss")
				: "-";
			let dateApproved =
				item.overtimeRequestStatus == 2 ? item.approversDate.split("|") : "-";
			if (dateApproved != "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format(
					"MMMM DD, YYYY"
				);
			}

			let button =
				item.overtimeRequestStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${item.overtimeRequestID}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.overtimeRequestID}" 
                code="${item.overtimeRequestCode}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${item.overtimeRequestCode}</td>
                <td>${item.fullname}</td>

                <td>${getCurrentApprover(
									item.approversID,
									item.approversDate,
									item.overtimeRequestStatus
								)}</td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
				
                <td class="text-center">${getStatusStyle(
									item.overtimeRequestStatus
								)}</td>
				<td>${remarks}</td>
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
				overtimeRequestID = "",
				overtimeRequestCode = "",
				overtimeRequestStatus = "",
				employeeID = "",
				approversID = "",
				approversDate = "",
			} = data && data[0];

			let isOngoing = approversDate
				? approversDate.split("|").length > 0
					? true
					: false
				: false;
			if (employeeID === sessionID) {
				if (overtimeRequestStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						overtimeRequestID="${overtimeRequestID}"
						overtimeRequestCode="${overtimeRequestCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						overtimeRequestID="${overtimeRequestID}"
						overtimeRequestCode="${overtimeRequestCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (overtimeRequestStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							overtimeRequestID="${overtimeRequestID}"
							overtimeRequestCode="${overtimeRequestCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (overtimeRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							overtimeRequestID="${overtimeRequestID}"
							overtimeRequestCode="${overtimeRequestCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							overtimeRequestID="${overtimeRequestID}"
							overtimeRequestCode="${overtimeRequestCode}"><i class="fas fa-ban"></i> 
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
			overtimeRequestID = "",
			overtimeRequestCode = "",
			employeeID = "",
			overtimeRequestDate = "",
			overtimeRequestTimeIn = "",
			overtimeRequestTimeOut = "",
			overtimeRequestReason = "",
			overtimeRequestRemarks = "",
			approversID = "",
			approversStatus = "",
			approversDate = "",
			overtimeRequestStatus = false,
			submittedAt = false,
			createdAt = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname: employeeFullname = "",
			departmentName: employeeDepartment = "",
			designationName: employeeDesignation = "",
		} = getEmployeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}

		$("#btnBack").attr("overtimeRequestID", overtimeRequestID);
		$("#btnBack").attr("overtimeRequestCode", overtimeRequestCode);
		$("#btnBack").attr("status", overtimeRequestStatus);

		let disabled = readOnly && "disabled";
		let button = formButtons(data);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${
													overtimeRequestCode ? overtimeRequestCode : "---"
												}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${
													overtimeRequestStatus
														? getStatusStyle(overtimeRequestStatus)
														: "---"
												}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">${
															createdAt
																? moment(createdAt).format(
																		"MMMM DD, YYYY hh:mm:ss A"
																  )
																: "---"
														}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">${
															submittedAt
																? moment(submittedAt).format(
																		"MMMM DD, YYYY hh:mm:ss A"
																  )
																: "---"
														}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(
															overtimeRequestStatus,
															approversID,
															approversDate
														)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${
													overtimeRequestRemarks ? overtimeRequestRemarks : "---"
												}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_overtime_request">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="${employeeDesignation}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="overtimeRequestDate"
                        name="overtimeRequestDate"
                        value="${
													overtimeRequestDate &&
													moment(overtimeRequestDate).format("MMMM DD, YYYY")
												}"
						${disabled}
						unique="${overtimeRequestID}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="overtimeRequestTimeIn" 
                        name="overtimeRequestTimeIn" 
                        required
                        value="${overtimeRequestTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestTimeIn"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="overtimeRequestTimeOut" 
                        name="overtimeRequestTimeOut" 
                        required
                        value="${overtimeRequestTimeOut}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestTimeOut"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="overtimeRequestReason"
                        name="overtimeRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${overtimeRequestReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestReason"></div>
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
			if (data) {
				initInputmaskTime(false);
				$("#overtimeRequestDate").data("daterangepicker").startDate = moment(
					overtimeRequestDate,
					"YYYY-MM-DD"
				);
				$("#overtimeRequestDate").data("daterangepicker").endDate = moment(overtimeRequestDate, "YYYY-MM-DD");
				// $("#overtimeRequestDate").data("daterangepicker").minDate = moment();

			} else {
				initInputmaskTime();
				$("#overtimeRequestDate").val(
					moment(new Date()).format("MMMM DD, YYYY")
				);
			}
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

			headerButton(true, "Add Overtime Request");
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
	viewNotification();
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
	// ----- END CUSTOM INPUTMASK ------

	// ----- CHECK TIME RANGE -----
	function checkTimeRange(elementID = false, isReturnable = false) {
		let element = elementID ? `#${elementID}` : ".timeOut";
		let flag = 0;
		$(element).each(function () {
			const fromValue = $("#overtimeRequestTimeIn").val() + ":00";
			const validated = $(this).hasClass("validated");
			const toValue = $(this).val() + ":00";

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
		let data = getFormData("form_overtime_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD HH:mm:ss");
		const approversID = getModuleApprover("overtime request");

		if (action && method != "" && feedback != "") {
			data["tableData[overtimeRequestStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"] = feedback;
			data["method"] = method;
			data["tableName"] = "hris_overtime_request_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[overtimeRequestCode]"] = generateCode(
					"OTR",
					false,
					"hris_overtime_request_tbl",
					"overtimeRequestCode"
				);
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"] = sessionID;
				data["tableData[createdAt]"] = dateToday;

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"] = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"] = dateToday;
					data["tableData[overtimeRequestStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;
				}
				data["whereFilter"] = "overtimeRequestID=" + id;
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
		const id = $(this).attr("overtimeRequestID");
		const status = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			formButtonHTML(this);
			const feedback = $(this).attr("overtimeRequestCode")
				? $(this).attr("overtimeRequestCode")
				: generateCode(
						"OTR",
						false,
						"hris_overtime_request_tbl",
						"overtimeRequestCode"
				  );

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"OVERTIME REQUEST",
					"",
					"form_overtime_request",
					data,
					true,
					pageContent,
					this
				);
			}, 1000);
		}
	});
	// ----- END CLOSE FORM -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		const code = $(this).attr("code");

		const tableData = getTableData(
			"hris_overtime_request_tbl",
			"*",
			"overtimeRequestID=" + id,
			""
		);

		pageContent(true, tableData);
	});
	// ----- END OPEN EDIT MODAL -----

	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		const tableData = getTableData(
			"hris_overtime_request_tbl",
			"*",
			"overtimeRequestID=" + id,
			""
		);
		pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("form_overtime_request");
		const validateTime = checkTimeRange(false, true);
		if (validate && validateTime) {
			const action = "insert"; // CHANGE
			const feedback = generateCode(
				"OTR",
				false,
				"hris_overtime_request_tbl",
				"overtimeRequestCode"
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"OVERTIME REQUEST",
				"",
				"form_overtime_request",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SAVE DOCUMENT -----

	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		formButtonHTML(this);
		const id = $(this).attr("overtimeRequestID");

		const validate = validateForm("form_overtime_request");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("overtimeRequestCode")
				? $(this).attr("overtimeRequestCode")
				: generateCode(
						"OTR",
						false,
						"hris_overtime_request_tbl",
						"overtimeRequestCode"
				  );

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);

			const tableData = getTableData(
				"hris_overtime_request_tbl",
				"overtimeRequestID",
				"",
				"createdAt DESC",
				"",
				"LIMIT 1"
			);
			const lastID =
				tableData.length > 0 ? +tableData[0].overtimeRequestID + 1 : 1;

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);
			let notificationData =
				employeeID != sessionID
					? {
							moduleID: 60,
							tableID: lastID,
							notificationTitle: "Overtime Request Form",
							notificationDescription: `${getEmployeeFullname(
								sessionID
							)} asked for your approval.`,
							notificationType: 2,
							employeeID,
					  }
					: false;

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"OVERTIME REQUEST",
					"",
					"form_overtime_request",
					data,
					true,
					pageContent,
					notificationData,
					this
				);
			}, 1000);
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END SUBMIT DOCUMENT -----

	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("overtimeRequestCode");

		const action = "update";
		const data = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"OVERTIME REQUEST",
			"",
			"form_overtime_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----

	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		formButtonHTML(this);
		const id = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("overtimeRequestCode")
			? $(this).attr("overtimeRequestCode")
			: generateCode(
					"OTR",
					false,
					"hris_overtime_request_tbl",
					"overtimeRequestCode"
			  );

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"OVERTIME REQUEST",
			"",
			"form_overtime_request",
			data,
			true,
			pageContent,
			this
		);
	});
	// ----- END CANCEL DOCUMENT -----

	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		formButtonHTML(this);
		const id = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("overtimeRequestCode");
		let tableData = getTableData(
			"hris_overtime_request_tbl",
			"",
			"overtimeRequestID = " + id
		);
		if (tableData) {
			let approversID = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate = tableData[0].approversDate;
			let employeeID = tableData[0].employeeID;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(
				approversStatus,
				2
			);
			data["tableData[approversDate]"] = updateApproveDate(approversDate);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID: 60,
					tableID: id,
					notificationTitle: "Overtime Request Form",
					notificationDescription: `${tableData[0].overtimeRequestCode}: Your request has been approved.`,
					notificationType: 2,
					employeeID: employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID: 60,
					tableID: id,
					notificationTitle: "Overtime Request Form",
					notificationDescription: `${getEmployeeFullname(
						employeeID
					)} asked for your approval.`,
					notificationType: 2,
					employeeID: getNotificationEmployeeID(approversID, approversDate),
				};
			}

			data["tableData[overtimeRequestStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"OVERTIME REQUEST",
					"",
					"form_overtime_request",
					data,
					true,
					pageContent,
					notificationData,
					this
				);
				$("[redirect=forApprovalTab]").trigger("click");
			}, 1000);
		}
	});
	// ----- END APPROVE DOCUMENT -----

	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("overtimeRequestCode");

		$("#modal_overtime_request_content").html(preloader);
		$("#modal_overtime_request .page-title").text(
			"DENY OVERTIME REQUEST DOCUMENT"
		);
		$("#modal_overtime_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="overtimeRequestRemarks"
					name="overtimeRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-overtimeRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			overtimeRequestID="${id}"
			overtimeRequestCode="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_overtime_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		formButtonHTML(this);
		const id = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("overtimeRequestCode");

		const validate = validateForm("modal_overtime_request");
		if (validate) {
			let tableData = getTableData(
				"hris_overtime_request_tbl",
				"",
				"overtimeRequestID = " + id
			);
			if (tableData) {
				let approversID = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate = tableData[0].approversDate;
				let employeeID = tableData[0].employeeID;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[overtimeRequestRemarks]"] = $("[name=overtimeRequestRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(
					approversStatus,
					3
				);
				data["tableData[approversDate]"] = updateApproveDate(approversDate);

				let notificationData = {
					moduleID: 60,
					notificationTitle: "Overtime Request Form",
					notificationDescription: `${tableData[0].overtimeRequestCode}: Your request has been denied.`,
					notificationType: 2,
					employeeID: employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"OVERTIME REQUEST",
						"modal_overtime_request",
						"",
						data,
						true,
						pageContent,
						notificationData,
						this
					);
					$(`[redirect=forApprovalTab]`).trigger("click");
				}, 1000);
			} else {
				formButtonHTML(this, false);
			}
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END REJECT DOCUMENT -----

	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END NAV LINK -----
});

// ----- VIEW NOTIFICATION -----
function viewNotification() {
	let url = window.document.URL;
	url = url.split("?view_id=");
	if (url.length > 1) {
		let id = url[1];
		$(`.btnView[id=${id}]`).trigger("click");
	}
}
// ----- END VIEW NOTIFICATION -----
