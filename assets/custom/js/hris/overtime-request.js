 $(document).ready(function() {
	pageContent();
});

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
    const id       = $(this).attr("overtimeRequestID");
    const status   = $(this).attr("status");

    if (status != "false" && status != 0) {
        $("#page_content").html(preloader);
        pageContent();
    } else {
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

        cancelForm("save",action,"OVERTIME REQUEST","","form_overtime_request",data,true,pageContent);
    }
    
});
// ----- END CLOSE FORM -----


// ----- OPEN EDIT MODAL -----
$(document).on("click", ".btnEdit", function () {
    const id   = $(this).attr("id");
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
    const id        = $(this).attr("id");
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

		formConfirmation(
			"submit",
			action,
			"OVERTIME REQUEST",
			"",
			"form_overtime_request",
			data,
			true,
			pageContent
		);
	}
});
// ----- END SUBMIT DOCUMENT -----

// ----- CANCEL DOCUMENT -----
$(document).on("click", "#btnCancelForm", function () {
	const id = $(this).attr("overtimeRequestID");
	const feedback = $(this).attr("overtimeRequestCode");

	// const validate = validateForm("form_overtime_request");
	// const validateTime = checkTimeRange(false, true);

	// if (validate && validateTime) {
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
	// }
});
// ----- END CANCEL DOCUMENT -----

// ----- CANCEL DOCUMENT -----
$(document).on("click", "#btnCancel", function () {
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
		pageContent
	);
});
// ----- END CANCEL DOCUMENT -----

// ----- APPROVE DOCUMENT -----
$(document).on("click", "#btnApprove", function() {
	const id       = $(this).attr("overtimeRequestID");
	const feedback = $(this).attr("overtimeRequestCode");
	let tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID = "+ id);
	if (tableData) {
		let approversID     = tableData[0].approversID;
		let approversStatus = tableData[0].approversStatus;
		let approversDate   = tableData[0].approversDate;

		let data = getData("update", 2, "approve", feedback, id);
		data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
		data["tableData[approversDate]"] = updateApproveDate(approversDate);

		let status = isImLastApprover(approversID, approversDate) ? 2 : 1;
		data["tableData[overtimeRequestStatus]"] = status;

		formConfirmation(
			"approve",
			"update",
			"OVERTIME REQUEST",
			"",
			"form_overtime_request",
			data,
			true,
			pageContent
		);
	}
})
// ----- END APPROVE DOCUMENT -----

// ----- REJECT DOCUMENT -----
$(document).on("click", "#btnReject", function() {
	const id       = $(this).attr("overtimeRequestID");
	const feedback = $(this).attr("overtimeRequestCode");

	$("#modal_overtime_request_content").html(preloader);
	$("#modal_overtime_request .page-title").text("REJECT OVERTIME REQUEST DOCUMENT");
	$("#modal_overtime_request").modal("show");
	let html = `
	<div class="modal-body">
		<div class="form-group">
			<label>Remarks <code>*</code></label>
			<textarea class="form-control validate"
				data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
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
		<button class="btn btn-primary" id="btnRejectConfirmation"
		overtimeRequestID="${id}"
		overtimeRequestCode="${feedback}">Reject</button>
		<button class="btn btn-danger" data-dismiss="modal">Cancel</button>
	</div>`;
	$("#modal_overtime_request_content").html(html);
})


$(document).on("click", "#btnRejectConfirmation", function() {
	const id       = $(this).attr("overtimeRequestID");
	const feedback = $(this).attr("overtimeRequestCode");

	const validate = validateForm("modal_overtime_request");
	if (validate) {
		let tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID = "+ id);
		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;

			let data = getData("update", 3, "reject", feedback, id);
			data["tableData[overtimeRequestRemarks]"] = $("[name=overtimeRequestRemarks]").val().trim();
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
			data["tableData[approversDate]"] = updateApproveDate(approversDate);

			formConfirmation(
				"reject",
				"update",
				"OVERTIME REQUEST",
				"modal_overtime_request",
				"",
				data,
				true,
				pageContent
			);
		}
	}
})
// ----- END REJECT DOCUMENT -----



























// FUNCTIONS


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
			if (isImModuleApprover("hris_overtime_request_tbl", "approversID")) {
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
		let scheduleData = getTableData("hris_overtime_request_tbl","",`employeeID != ${sessionID} AND overtimeRequestStatus != 0 AND overtimeRequestStatus != 4`);
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
			<button class="btn btn-view w-100 btnView" id="${item.overtimeRequestID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.overtimeRequestStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
				html += `
				<tr>
					<td>${item.overtimeRequestCode}</td>
					<td>${item.employeeID}</td>
					<td>${moment(item.overtimeRequestDate).format("MMMM DD, YYYY")}</td>
					<td>${item.overtimeRequestTimeIn} - ${item.overtimeRequestTimeOut}</td>
					<td>${item.overtimeRequestReason}</td>
					<td class="text-center">${getStatusStyle(item.overtimeRequestStatus)}</td>
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
			"hris_overtime_request_tbl",
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
                <td>${item.employeeID}</td>
                <td>${moment(item.overtimeRequestDate).format("MMMM DD, YYYY")}</td>
                <td>${item.overtimeRequestTimeIn} - ${item.overtimeRequestTimeOut}</td>
                <td>${item.overtimeRequestReason}</td>
                <td class="text-center">${getStatusStyle(item.overtimeRequestStatus)}</td>
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
				overtimeRequestID       = "",
				overtimeRequestCode     = "",
				overtimeRequestStatus   = "",
				employeeID              = "",
				approversID             = "",
				approversDate           = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
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
			overtimeRequestID      = "",
			overtimeRequestCode    = "",
			employeeID            = "",
			overtimeRequestDate    = "",
			overtimeRequestTimeIn  = "",
			overtimeRequestTimeOut = "",
			overtimeRequestReason  = "",
			overtimeRequestRemarks = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			overtimeRequestStatus  = false,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];

		$("#btnBack").attr("overtimeRequestID", overtimeRequestID);
		$("#btnBack").attr("overtimeRequestCode", overtimeRequestCode);
		$("#btnBack").attr("status", overtimeRequestStatus);

		let disabled = readOnly && "disabled";
		let button   = formButtons(data);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${overtimeRequestCode ? overtimeRequestCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${overtimeRequestStatus ? getStatusStyle(overtimeRequestStatus) : "---"}</h6>      
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
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(overtimeRequestStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${overtimeRequestRemarks ? overtimeRequestRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_overtime_request">
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
                        id="overtimeRequestDate"
                        name="overtimeRequestDate"
                        value="${overtimeRequestDate && moment(overtimeRequestDate).format("MMMM DD, YYYY")}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In <code>*</code></label>
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
                    <label>Time Out <code>*</code></label>
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
                    <label>Reason <code>*</code></label>
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
			data ? initInputmaskTime(false) : initInputmaskTime();
			return html;
		}, 500);
	}
	// ----- END FORM CONTENT -----

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        $("#page_content").html(preloader);
        if (!isForm) {
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
    
    // ----- END PAGE CONTENT -----

    // ----- CUSTOM INPUTMASK -----
	function initInputmaskTime(isMethodAdd = true) {
		if (isMethodAdd) {
			$(".timeIn").val("08:00:00");
			$(".timeOut").val("17:00:00");
		}

		$(".timeIn").inputmask({
			mask: "h:s:s",
			placeholder: "08:00:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
		$(".timeOut").inputmask({
			mask: "h:s:s",
			placeholder: "17:00:00",
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
			const fromValue = $("#overtimeRequestTimeIn").val();
			const validated = $(this).hasClass("validated");
			const toValue = $(this).val();

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
			(status == 1 && moment().format("YYYY-MM-DD hh:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD hh:mm:ss");

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
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday;

				const approversID = getModuleApprover();
				if (approversID) {
					data["tableData[approversID]"] = approversID;
				} else {
					data["tableData[approversID]"] = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"] = dateToday;
					data["tableData[overtimeRequestStatus]"] = 2;
				}

			} else {
				data["whereFilter"] = "overtimeRequestID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----













// FINDING IF I AM APPROVER ON THE MODULE
function isImModuleApprover(tableName = false, columnName = false) {
	if (tableName && columnName) {
		const dataLength = getTableDataLength(tableName, "", `FIND_IN_SET('${sessionID}', REPLACE(${columnName}, '|', ','))`);
		return dataLength > 0 ? true : false;
	}
	return false;
}


// ----- CURRENT APPROVER -----
// 1|2|3
// date1|date2|date3
// 1|2|3
function isImCurrentApprover(approversID = null, approversDate = null, status = null) {
	if (approversID && status != 3) {
		const index = approversDate ? approversDate.split("|").length + 1 : 1; // 0 + 1 = 1
		const approversIDArr = approversID.split("|"); // {1=> 1, 2=> 2, 3=> 3}
		const id = approversIDArr[index - 1]; // approversIDArr[1] = 1;
		return id === sessionID ? true : false;
	}
	return false;
}
// ----- END CURRENT APPROVER -----


// ----- IS DOCUMENT ALREADY APPROVED -----
// 1|2|3
// date1|date2|date3
// 1|2|3
function isAlreadyApproved(approversID = null, approversDate = null) {
	if (approversID) {
		const approversIDArr = approversID ? approversID.split("|") : [];
		const approversDateArr = approversDate ? approversDate.split("|") : [];
		const index = approversIDArr.indexOf(sessionID);
		return approversDateArr[index] ? true : false;
	}
	return false;
}
// ----- END IS DOCUMENT ALREADY APPROVED -----

// ----- DATE APPROVED -----
function getDateApproved(status, approversID = false, approversDate = false) {
	if (status && approversID && approversDate) {
		if (status == 2) {
			const dateArr = approversDate.split("|");
			const index = dateArr.length-1;
			return moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A");
		}
	}
	return "---";
}
// ----- END DATE APPROVED -----

function getApproversStatus(approversID, approversStatus, approversDate) {
	let html 		= "";
	if (approversID && approversStatus) {
		let idArr     = approversID.split("|");
		let statusArr = approversStatus.split("|");
		let dateArr   = approversDate.split("|");
		html += `<div class="row mt-4">`;
		statusArr && statusArr.map((item, index) => {
			let fullname	= getTableData("gen_user_account_tbl","CONCAT(`firstname`, ' ' ,`lastname`) as fullname", "userAccountID= "+idArr[index]);
			let date 		= moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A");

			let statusBadge = item == 2 ? `
			<span class="badge badge-outline-success">
				Approved - ${date}</span>` : `
			<span class="badge badge-outline-danger">
				Rejected - ${date}</span>`;

			html += `
			<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12"
				<span>Level ${index+1} - ${fullname[0]["fullname"]}</span><br>
				${statusBadge}
			</div>`;
		})
		html += `</div>`;
	}
	return html;
}




// ----- BADGE STATUS -----
function getStatusStyle(status = 1) {
	switch (status) {
		case "1":
			return `<span class="badge badge-outline-info w-100">For Approval</span>`;
		case "2":
			return `<span class="badge badge-info w-100">Approved</span>`;
		case "3":
			return `<span class="badge badge-danger w-100">Rejected</span>`;
		case "4":
			return `<span class="badge badge-primary w-100">Cancelled</span>`;
		case "0":
		default:
			return `<span class="badge badge-warning w-100">Draft</span>`;
	}
}
// ----- END BADGE STATUS -----


// ----- GET MODULE APPROVER -----
function getModuleApprover(moduleID = "24"){
	let returnData	= ""; 
	const getData 	= getTableData("gen_approval_setup_tbl", "","moduleID='"+moduleID+"' AND roleID='"+sessionRoleID+"'");
	let getDataArr 	= getData[0]["userAccountID"] == "0" ? false : getData[0]["userAccountID"].split("|");
	let tempArr 	= [];
	if(getDataArr != false){
			getDataArr.map((items, index) =>{
				if(items != "0"){
					tempArr.push(items);
				}
			});
			let approverID 	  = tempArr.join("|");
			let approverIDArr = approverID.split("|");
			let index 		  = approverIDArr.indexOf(sessionID);
			if (index === -1) {
				returnData = approverID;
			}else{
				returnData = approverIDArr.slice(index+1).join("|");
			}
	}else{returnData = false}
				
	return returnData;
}
// ----- GET MODULE APPROVER -----



// ----- SAVE FORM/DOCUMENT ----
async function saveFormData(action, method, data, isObject, swalTitle) {
	if (action && method && data && isObject) {
		let path =
			action == "insert"
				? `${base_url}operations/insertTableData`
				: `${base_url}operations/updateTableData`;
		return !isObject
			? await saveUpdateDeleteDatabaseFormData(data, path, false, swalTitle)
			: await saveUpdateDeleteDatabaseObject(data, path, false, swalTitle);
	} else {
		return "Failed to save document!";
	}
}
// ----- END SAVE FORM/DOCUMENT --

// ----- FORM/DOCUMENT CONFIRMATION -----
function formConfirmation(
	method = "", // save|cancelform|approve|reject|submit|cancel
	action = "",
	title = "",
	modalID = "",
	containerID = "",
	data = null,
	isObject = true,
	callback = false
) {
	if (method && action && title && (modalID || containerID)) {
		method = method.toLowerCase();
		action = action.toLowerCase() == "update" ? "update" : "insert";

		modalID && $("#" + modalID).modal("hide");

		let swalText, swalImg;
		switch (method) {
			case "save":
				swalTitle = `SAVE ${title.toUpperCase()}`;
				swalText = "Are you sure to save this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "submit":
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalText = "Are you sure to submit this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "approve":
				swalTitle = `APPROVE ${title.toUpperCase()}`;
				swalText = "Are you sure to approve this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "reject":
				swalTitle = `REJECT ${title.toUpperCase()}`;
				swalText = "Are you sure to reject this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "cancelform":
				swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
				swalText = "Are you sure to cancel this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			default:
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText = "Are you sure that you want to cancel this process?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
		}
		Swal.fire({
			title: swalTitle,
			text: swalText,
			imageUrl: swalImg,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: "Custom image",
			showCancelButton: true,
			confirmButtonColor: "#28a745",
			cancelButtonColor: "#1A1A1A",
			cancelButtonText: "No",
			confirmButtonText: "Yes",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				if (method != "cancel") {
					let saveData = saveFormData(
						action,
						method,
						data,
						isObject,
						swalTitle
					);
					saveData.then((res) => {
						if (res) {
							callback && callback();
						} else {
							Swal.fire({
								icon: "danger",
								title: "Failed!",
								text: result[1],
								showConfirmButton: false,
								timer: 2000,
							});
						}
					});
				} else {
					Swal.fire({
						icon: "success",
						title: swalTitle,
						showConfirmButton: false,
						timer: 2000,
					});
				}
			} else {
				containerID && $("#" + containerID).show();
				modalID && $("#" + modalID).modal("show");
			}
		});
	} else {
		showNotification("danger", "Invalid arguments!");
	}
}
// ----- END FORM/DOCUMENT CONFIRMATION -----


// ----- CANCEL FORM -----
function cancelForm(
	method = "",
	action = "",
	title = "",
	modalID = "",
	containerID = "",
	data = null,
	isObject = true,
	callback = false
) {
	if (method && action && title && (modalID || containerID)) {
		modalID && $("#" + modalID).modal("hide");

		Swal.fire({
			title: `SAVE AS DRAFT`,
			text: `Do you want to save your changes for filing this ${title.toLowerCase()}?`,
			imageUrl: `${base_url}assets/modal/add.svg`,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: "Custom image",
			showCancelButton: true,
			confirmButtonColor: "#28a745",
			cancelButtonColor: "#1A1A1A",
			cancelButtonText: "No",
			confirmButtonText: "Yes",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				const formID = modalID ? modalID : containerID;
				const validate = validateForm(formID);
				if (validate) {
					let saveData = saveFormData(
						action,
						method,
						data,
						isObject,
						`SAVE ${title.toUpperCase()}`
					);
					saveData.then((res) => {
						if (res) {
							callback && callback();
						} else {
							Swal.fire({
								icon: "danger",
								title: "Failed!",
								text: result[1],
								showConfirmButton: false,
								timer: 2000,
							});
						}
					});
				} else {
					modalID && $("#" + modalID).modal("show");
				}
			} else {
				modalID && $("#" + modalID).modal("hide");
				containerID && $("#" + containerID).hide();
				callback && callback();
			}
		});
	} else {
		showNotification("danger", "Invalid arguments");
	}
}
// ----- END CANCEL FORM -----


// ----- IS IM LAST APPROVER -----
function isImLastApprover(approversID = null, approversDate = null) {
	if (approversID) {
		let idArr = approversID.split("|");
		let idLength = idArr.length;
		let dateArr = approversDate ? approversDate.split("|") : [];
		let dateLength = dateArr.length+1;
		return idLength == dateLength;
	}
	return false;
}
// ----- END IS IM LAST APPROVER -----

// ----- FUNCTION UPDATE DATE -----
function updateApproveDate(date) {
	let dateToday = moment().format("YYYY-MM-DD hh:mm:ss");
	if (date) {
		let dateArr = date.split("|");
		dateArr.push(dateToday);
		return dateArr.join("|");
	}
	return dateToday;
}
// ----- END FUNCTION UPDATE DATE -----


// ----- UPDATE APPROVERS STATUS -----
function updateApproveStatus(approversStatus, status) {
	if (approversStatus) {
		let approversStatusArr = approversStatus.split("|");
		approversStatusArr.push(status);
		return approversStatusArr.join("|");
	}
	return status;
}
// ----- END UPDATE APPROVERS STATUS -----