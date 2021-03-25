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
					{ targets: 0, width: "10%"},
					{ targets: 5, width: "5%"},
					{ targets: 6, width: "5%"},
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
					{ targets: 0, width: "10%"},
					{ targets: 5, width: "5%"},
					{ targets: 6, width: "5%"},
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_loan_form_tbl", "approversID")) {
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
			"hris_loan_form_tbl",
			"",
			`employeeID != ${sessionID} AND loanFormStatus != 0 AND loanFormStatus != 4`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
                    <th>Loan Type</th>
                    <th>Loan Amount</th>
                    <th>Term of Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {

			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.loanFormID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.loanFormStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
				html += `
				<tr>
					<td>${item.loanFormCode}</td>
					<td>${item.employeeID}</td>
					<td>${moment(item.loanFormDateFrom).format("MMMM DD, YYYY")}</td>
					<td>${item.loanFormDateTo}</td>
					<td>${item.loanFormReason}</td>
					<td class="text-center">${getStatusStyle(item.loanFormStatus)}</td>
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
			"hris_loan_form_tbl",
			"",
			`employeeID = ${sessionID}`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Employee Name</th>
                    <th>Loan Type</th>
                    <th>Loan Amount</th>
                    <th>Term of Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			let unique = {
				id: item.loanFormID,
				loanFormDateFrom: moment(item.loanFormDateFrom).format("MMMM DD, YYYY")
			};
            let loanTypeTableData = getTableData("hris_loan_tbl", "","loanID="+item.loanID);
			uniqueData.push(unique);

			let button =
				item.loanFormStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${item.loanFormID}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.loanFormID}" 
                code="${item.loanFormCode}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${item.loanFormCode}</td>
                <td>${item.employeeID}</td>
                <td>${loanTypeTableData[0].loanName}</td>
                <td>${item.loanFormAmount}</td>
                <td>${item.	loanFormTermPayment == 0 ? "Payday" : "Monthly"}</td>
                <td class="text-center">${getStatusStyle(item.loanFormStatus)}</td>
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
				loanFormID     = "",
				loanFormCode   = "",
				loanFormStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (loanFormStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						loanFormID="${loanFormID}"
						loanFormCode="${loanFormCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						loanFormID="${loanFormID}"
						loanFormCode="${loanFormCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (loanFormStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							loanFormID="${loanFormID}"
							loanFormCode="${loanFormCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} 
			} else {
				if (loanFormStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							loanFormID="${loanFormID}"
							loanFormCode="${loanFormCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							loanFormID="${loanFormID}"
							loanFormCode="${loanFormCode}"><i class="fas fa-ban"></i> 
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
			loanFormID                  = "",
            loanFormCode                = "",
			employeeID                  = "",
            loanID                      = "",
            loanFormTermPayment         = "",
            loanFormDate                = "",
            loanFormNoOfDays            = "",
            loanFormAmount              = "",
            loanFormDeductionAmount     = "",
			loanFormRemarks             = "",
			approversID                 = "",
			approversStatus             = "",
			approversDate               = "",
			loanFormStatus              = false,
			submittedAt                 = false,
			createdAt                   = false,
		} = data && data[0];

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}

		$("#btnBack").attr("loanFormID", loanFormID);
		$("#btnBack").attr("loanFormCode", loanFormCode);
		$("#btnBack").attr("status", loanFormStatus);

		let disabled = readOnly && "disabled";
		let button   = formButtons(data);
        // let employeeInfo    =   getTableData("gen_user_account_tbl", "", "userAccountID="+sessionID);
        let employeeName    =   "Sample Name of Employee";
        let employeeRole    =   "Junior Developer I";
        let loanType        =   getTableData("hris_loan_tbl","","loanStatus != 0");
        let optionLoanType  =   `<option value="" disabled selected> No Selected</option>`;
        loanType.map((loanTypeItems, loanTypeIndex) =>{
            var isSelected = loanTypeItems["loanID"] == loanID ? "selected" : "";
            optionLoanType += `<option value="${loanTypeItems["loanID"]}" ${isSelected}>${loanTypeItems["loanName"]}</option>`;
        });
        // Payday = 0, Monthly = 1;
        let optionLoanFormTermPayment = data == false ? `<option value="" disabled selected>No Selected</option><option value="0">Payday</option><option value="1">Monthly</option>`: (loanFormTermPayment == "0" ? `<option value="" disabled>No Selected</option><option value="0" selected>Payday</option><option value="1">Monthly</option>` : `<option value="" disabled>No Selected</option><option value="0">Payday</option><option value="1" selected>Monthly</option>`);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${loanFormCode ? loanFormCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${loanFormStatus ? getStatusStyle(loanFormStatus) : "---"}</h6>      
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
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(loanFormStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${loanFormRemarks ? loanFormRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_loan_form">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" class="form-control" disabled value="${employeeName}">
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
                    <input type="text" class="form-control" disabled value="${employeeRole}">
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Loan Type <code>*</code></label>
                    <select class="form-control select2 text-left" required id="loanFormLoanID" name="loanID" ${disabled}>
                        ${optionLoanType}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-loanFormLoanID"></div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Term of Payment <code>*</code></label>
                    <select class="form-control select2 text-left" required id="loanFormTermPayment" name="loanFormTermPayment" ${disabled}>
                        ${optionLoanFormTermPayment}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-loanFormTermPayment"></div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Start Date - End Date <code>*</code></label>
                    <input type="button" class="form-control validate daterangeLoanForm text-left" required id="loanFormDate"
                            name="loanFormDate" value="${loanFormDate && moment(loanFormDate).format("MMMM DD, YYYY")}"
						    unique="${loanFormID}" title="Date" ${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-loanFormDate"></div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Number of Days <code>*</code></label>
                    <input type="text" class="form-control validate" name="loanFormNoOfDays" 
                        id="loanFormNoOfDays" data-allowcharacters="[A-Z][a-z][0-9][ ][@]" minlength="1" 
                        maxlength="50" required readOnly value="${loanFormNoOfDays}" autocomplete="off" >
                    <div class="invalid-feedback d-block" id="invalid-loanFormNoOfDays"></div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Loan Amount <code>*</code></label>
                    <input type="text" class="form-control amount" name="loanFormAmount" id="input_loanFormAmount" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" minlength="2" maxlength="50"  required value="${loanFormAmount}" autocomplete="off" ${disabled}>
                    <div class="invalid-feedback d-block" id="invalid-input_loanFormAmount"></div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Loan Deduction Amount <code>*</code></label>
                    <input type="text" class="form-control amount" name="loanFormDeductionAmount" id="input_loanFormDeductionAmount" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" minlength="2" maxlength="50"  required value="${loanFormDeductionAmount}" autocomplete="off" ${disabled}>
                    <div class="invalid-feedback d-block" id="invalid-input_loanFormDeductionAmount"></div>
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
            loanFormDateRange();
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

			headerButton(true, "Add Loan Form");
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
			const fromValue = $("#loanFormDateTo").val()+":00";
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
		let data = getFormData("form_loan_form", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD hh:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD hh:mm:ss");

		if (action && method != "" && feedback != "") {
			data["tableData[loanFormStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"]  = feedback;
			data["method"]    = method;
			data["tableName"] = "hris_loan_form_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[loanFormCode]"] = generateCode(
					"SCH",
					false,
					"hris_loan_form_tbl",
					"loanFormCode",
				);
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday;

				const approversID = getModuleApprover("loan");
				if (approversID) {
					data["tableData[approversID]"] = approversID;
				} else {
					data["tableData[approversID]"]     = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"]   = dateToday;
					data["tableData[loanFormStatus]"] = 2;
				}

			} else {
				data["whereFilter"] = "loanFormID=" + id;
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
		const id       = $(this).attr("loanFormID");
		const status   = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			const feedback = $(this).attr("loanFormCode")
			? $(this).attr("loanFormCode")
			: generateCode(
					"LNF",
					false,
					"hris_loan_form_tbl",
					"loanFormCode",
			  );

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			cancelForm(
				"save",
				action,
				"LOAN FORM",
				"",
				"form_loan_form",
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
			"hris_loan_form_tbl",
			"*",
			"loanFormID=" + id,
			""
		);

		pageContent(true, tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id        = $(this).attr("id");
		const tableData = getTableData(
			"hris_loan_form_tbl",
			"*",
			"loanFormID=" + id,
			""
		);
		pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("form_loan_form");
		const validateTime = checkTimeRange(false, true);
		if (validate && validateTime) {
			const action = "insert"; // CHANGE
			const feedback = generateCode(
				"SCH",
				false,
				"hris_loan_form_tbl",
				"loanFormCode",
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"LOAN FORM",
				"",
				"form_loan_form",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = $(this).attr("loanFormID");

		const validate = validateForm("form_loan_form");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("loanFormCode")
			? $(this).attr("loanFormCode")
			: generateCode(
					"LNF",
					false,
					"hris_loan_form_tbl",
					"loanFormCode",
			  );
			  
			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);

			
			let notificationData = {
				moduleID:                13,
				notificationTitle:       "Loan Form",
				notificationDescription: `${sessionID} asked for your approval.`,
				notificationType:        2,
				employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			};

			formConfirmation(
				"submit",
				action,
				"LOAN FORM",
				"",
				"form_loan_form",
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
		const id = $(this).attr("loanFormID");
		const feedback = $(this).attr("loanFormCode");

		const action = "update";
		const data   = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"LOAN FORM",
			"",
			"form_loan_form",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id = $(this).attr("loanFormID");
		const feedback = $(this).attr("loanFormCode")
			? $(this).attr("loanFormCode")
			: generateCode(
					"SCH",
					false,
					"hris_loan_form_tbl",
					"loanFormCode",
			  );

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"LOAN FORM",
			"",
			"form_loan_form",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function() {
		const id       = $(this).attr("loanFormID");
		const feedback = $(this).attr("loanFormCode");
		let tableData = getTableData("hris_loan_form_tbl", "", "loanFormID = "+ id);
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
					notificationTitle:       "Loan Schedule Form",
					notificationDescription: `${tableData[0].loanFormCode}: Your request has been approved.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                13,
					notificationTitle:       "Loan Schedule Form",
					notificationDescription: `${employeeID} asked for your approval.`,
					notificationType:        2,
					employeeID:              getNotificationEmployeeID(approversID, approversDate),
				};
			}

			data["tableData[loanFormStatus]"] = status;

			formConfirmation(
				"approve",
				"update",
				"LOAN FORM",
				"",
				"form_loan_form",
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
		const id       = $(this).attr("loanFormID");
		const feedback = $(this).attr("loanFormCode");

		$("#modal_loan_form_content").html(preloader);
		$("#modal_loan_form .page-title").text("DENY LOAN FORM DOCUMENT");
		$("#modal_loan_form").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
					minlength="2"
					maxlength="250"
					id="loanFormRemarks"
					name="loanFormRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-loanFormRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-primary" id="btnRejectConfirmation"
			loanFormID="${id}"
			loanFormCode="${feedback}">Deny</button>
			<button class="btn btn-danger" data-dismiss="modal">Cancel</button>
		</div>`;
		$("#modal_loan_form_content").html(html);
	})


	$(document).on("click", "#btnRejectConfirmation", function() {
		const id       = $(this).attr("loanFormID");
		const feedback = $(this).attr("loanFormCode");

		const validate = validateForm("modal_loan_form");
		if (validate) {
			let tableData = getTableData("hris_loan_form_tbl", "", "loanFormID = "+ id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
	
				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[loanFormRemarks]"] = $("[name=loanFormRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]   = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                13,
					notificationTitle:       "Loan Schedule Form",
					notificationDescription: `${tableData[0].loanFormCode}: Your request has been denied.`,
					notificationType:        2,
					employeeID:              employeeID,
				};
	
				formConfirmation(
					"reject",
					"update",
					"LOAN FORM",
					"modal_loan_form",
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







$(document).on("change", ".daterangeLoanForm" ,function(){
    let thisValue       =   $(this).val();
    let thisValueSplit  =   thisValue.split(" - ");

    // from = start.format('YYYY-MM-DD 00:00:00');
    //               to = end.format('YYYY-MM-DD 23:59:59');

    let fromDate        =  new Date(thisValueSplit[0]);
    let toDate          =  new Date(thisValueSplit[1]);
    let numberOfDays    =  Math.round((toDate-fromDate)/(1000*60*60*24));
    $("#loanFormNoOfDays").val(numberOfDays);
    // alert(thisValue);
})





function loanFormDateRange(){
    $('.daterangeLoanForm').daterangepicker({
        "showDropdowns": true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
          format: 'MMMM D, YYYY'
        },
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    });
}