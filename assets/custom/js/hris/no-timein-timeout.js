$(document).ready(function () {

	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(57);
	// ----- END MODULE APPROVER -----


	// ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
			let { employeeID, fullname, designation, department } = data && data[0];
			return { employeeID, fullname, designation, department };
		}
		return {};
	}
	const employeeFullname = (id) => {
		if (id != "-") {
			let data = employeeData(id);
			return data.fullname || "-";
		}
		return "-";
	}
	// ---- END GET EMPLOYEE DATA -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false) {
		const loadData = (id) => {
			const tableData = getTableData("hris_no_timein_timeout_tbl", "", "noTimeinTimeoutID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					noTimeinTimeoutStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (noTimeinTimeoutStatus == 0 || noTimeinTimeoutStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (noTimeinTimeoutStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					pageContent(true, tableData, isReadOnly);
					updateURL(encryptString(id));
				} else {
					pageContent();
					updateURL();
				}
				
			} else {
				pageContent();
				updateURL();
			}
		}

		if (view_id) {
			let id = decryptString(view_id);
				id && isFinite(id) && loadData(id);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				pageContent(true);
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/no_timein_timeout?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}hris/no_timein_timeout?add`);
		} else {
			window.history.pushState("", "", `${base_url}hris/no_timein_timeout`);
		}
	}
	// ----- END VIEW DOCUMENT -----


	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


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
				scrollX: true,
				scrollCollapse: true,
				sorting: [],
				columnDefs: [
					{ targets: 0, width: 100 },
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
				scrollCollapse: true,
				sorting: [],
				columnDefs: [
					{ targets: 0, width: 100 },
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
			if (isImModuleApprover("hris_no_timein_timeout_tbl", "approversID")) {
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
			if (isCreateAllowed(57)) {
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

		let noTimeinTimeoutData = getTableData(
			`hris_no_timein_timeout_tbl AS notime
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`notime.noTimeinTimeoutID, 
			notime.employeeID,
			notime.noTimeinTimeoutDate, 
			notime.noTimeinTimeoutTimeIn,
			notime.noTimeinTimeoutTimeOut,
			notime.noTimeinTimeoutReason,
			notime.approversID,
			notime.approversStatus,
			notime.approversDate,
			notime.noTimeinTimeoutStatus,
			notime.noTimeinTimeoutRemarks,
			notime.submittedAt,
			notime.createdBy,
			notime.updatedBy,
			notime.createdAt,
			notime.updatedAt,
			hris_employee_list_tbl.employeeFirstname, 
			hris_employee_list_tbl.employeeLastname`,
			`notime.employeeID != ${sessionID} AND noTimeinTimeoutStatus != 0 AND noTimeinTimeoutStatus != 4`,
			`FIELD(noTimeinTimeoutStatus, 0, 1, 3, 2, 4), COALESCE(notime.submittedAt, notime.createdAt)`
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

		noTimeinTimeoutData.map((item) => {

			let {
				noTimeinTimeoutID,
				approversID,
				approversDate,
				noTimeinTimeoutStatus,
				noTimeinTimeoutRemarks,
				submittedAt,
				createdAt,
				employeeFirstname,
				employeeLastname
			} = item;

			let remarks       = noTimeinTimeoutRemarks ? noTimeinTimeoutRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = noTimeinTimeoutStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${encryptString(noTimeinTimeoutID)}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(approversID, approversDate, noTimeinTimeoutStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("NTI", createdAt, noTimeinTimeoutID)}</td>
					<td>${employeeFirstname + ' ' +employeeLastname}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, noTimeinTimeoutStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">${getStatusStyle(noTimeinTimeoutStatus)}</td>
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
			return html;
		}, 500);
	}
	// ----- END FOR APPROVAL CONTENT -----


	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let noTimeinTimeoutData = getTableData(
			`hris_no_timein_timeout_tbl AS notime
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`notime.noTimeinTimeoutID, 
			notime.employeeID,
			notime.noTimeinTimeoutDate, 
			notime.noTimeinTimeoutTimeIn,
			notime.noTimeinTimeoutTimeOut,
			notime.noTimeinTimeoutReason,
			notime.approversID,
			notime.approversStatus,
			notime.approversDate,
			notime.noTimeinTimeoutStatus,
			notime.noTimeinTimeoutRemarks,
			notime.submittedAt,
			notime.createdBy,
			notime.updatedBy,
			notime.createdAt,
			notime.updatedAt,
			hris_employee_list_tbl.employeeFirstname, 
			hris_employee_list_tbl.employeeLastname`,
			`employeeID = ${sessionID}`,
			`FIELD(noTimeinTimeoutStatus, 0, 1, 3, 2, 4), COALESCE(notime.submittedAt, notime.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
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

		noTimeinTimeoutData.map((item) => {

			let {
				noTimeinTimeoutID,
				noTimeinTimeoutDate,
				approversID,
				approversDate,
				noTimeinTimeoutStatus,
				noTimeinTimeoutRemarks,
				submittedAt,
				createdAt,
				employeeFirstname,
				employeeLastname
			} = item;

			let remarks       = noTimeinTimeoutRemarks ? noTimeinTimeoutRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = noTimeinTimeoutStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id: 				 noTimeinTimeoutID,
				noTimeinTimeoutDate: moment(noTimeinTimeoutDate).format("MMMM DD, YYYY")
			};
			(noTimeinTimeoutStatus == 1 || noTimeinTimeoutStatus == 2) && uniqueData.push(unique);

			let button =
				noTimeinTimeoutStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(noTimeinTimeoutID)}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(noTimeinTimeoutID)}" 
                code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${getFormCode("NTI", createdAt, noTimeinTimeoutID)}</td>
                <td>${employeeFirstname + ' ' +employeeLastname}</td>
				<td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, noTimeinTimeoutStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">${getStatusStyle(noTimeinTimeoutStatus)}</td>
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
				noTimeinTimeoutID     = "",
				noTimeinTimeoutStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (noTimeinTimeoutStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						noTimeinTimeoutID="${noTimeinTimeoutID}"
						code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						noTimeinTimeoutID="${noTimeinTimeoutID}"
						code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (noTimeinTimeoutStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							noTimeinTimeoutID="${noTimeinTimeoutID}"
							code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} 
			} else {
				if (noTimeinTimeoutStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							noTimeinTimeoutID="${noTimeinTimeoutID}"
							code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							noTimeinTimeoutID="${noTimeinTimeoutID}"
							code="${getFormCode("NTI", createdAt, noTimeinTimeoutID)}"><i class="fas fa-ban"></i> 
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
			noTimeinTimeoutID         = "",
			employeeID            	  = "",
			noTimeinTimeoutNegligence ="",
			noTimeinTimeoutDate       = "",
			noTimeinTimeoutTimeIn     = "",
			noTimeinTimeoutTimeOut    = "",
			noTimeinTimeoutReason     = "",
			noTimeinTimeoutRemarks    = "",
			approversID          	  = "",
			approversStatus           = "",
			approversDate             = "",
			noTimeinTimeoutStatus     = false,
			submittedAt               = false,
			createdAt                 = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("noTimeinTimeoutID", noTimeinTimeoutID);
		$("#btnBack").attr("status", noTimeinTimeoutStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data);

		let timeInNegligence  = "disabled", 
			timeOutNegligence = "disabled";

		if (readOnly) {
			timeInNegligence = "disabled";
			timeOutNegligence = "disabled";
		} else {
			if (noTimeinTimeoutNegligence == "1") {
				timeInNegligence = "";
				timeOutNegligence = "disabled";
			} else if (noTimeinTimeoutNegligence == "2") {
				timeInNegligence = "disabled";
				timeOutNegligence = "";
			} else if (noTimeinTimeoutNegligence == "3") {
				timeInNegligence  = "";
				timeOutNegligence = "";
			} else {
				timeInNegligence  = "disabled";
				timeOutNegligence = "disabled";
			}
		}

		let html = `
        <div class="row px-2">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${noTimeinTimeoutID ? getFormCode("NTI", createdAt, noTimeinTimeoutID) : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${noTimeinTimeoutStatus ? getStatusStyle(noTimeinTimeoutStatus) : "---"}</h6>      
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
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(noTimeinTimeoutStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${noTimeinTimeoutRemarks ? noTimeinTimeoutRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_no_timein_timeout">
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
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="noTimeinTimeoutDate"
                        name="noTimeinTimeoutDate"
                        value="${noTimeinTimeoutDate && moment(noTimeinTimeoutDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${noTimeinTimeoutID}"
						title="Date"
						>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                </div>
            </div>
			<div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Negligence ${!disabled ? "<code>*</code>" : ""}</label>
					<select 
					class="form-control validate select2" 
					id="negligence"
					noTimeinTimeoutTimeIn="noTimeinTimeoutTimeIn"
					${disabled}
					required
					name="noTimeinTimeoutNegligence">
					<option disabled selected>Select Negligence</option>
					<option value="1"  ${data && noTimeinTimeoutNegligence == "1" && "selected"}>No Time In</option>
					<option value="2"  ${data && noTimeinTimeoutNegligence == "2" && "selected"}>No Time out</option>
					<option value="3"  ${data && noTimeinTimeoutNegligence == "3" && "selected"}>Both</option>
				  </select>
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!timeInNegligence ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="noTimeinTimeoutTimeIn" 
                        name="noTimeinTimeoutTimeIn" 
                        value="${noTimeinTimeoutTimeIn}"
						${timeInNegligence}>
                    <div class="d-block invalid-feedback" id="invalid-noTimeinTimeoutTimeIn"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!timeOutNegligence ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="noTimeinTimeoutTimeOut" 
                        name="noTimeinTimeoutTimeOut" 
                        value="${noTimeinTimeoutTimeOut}"
						${timeOutNegligence}>
                    <div class="d-block invalid-feedback" id="invalid-noTimeinTimeoutTimeOut"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="noTimeinTimeoutReason"
                        name="noTimeinTimeoutReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${noTimeinTimeoutReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-noTimeinTimeoutReason"></div>
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
			if(data){
				initInputmaskTime(false);
				$("#noTimeinTimeoutDate").data("daterangepicker").startDate = moment(noTimeinTimeoutDate, "YYYY-MM-DD");
				$("#noTimeinTimeoutDate").data("daterangepicker").endDate   = moment(noTimeinTimeoutDate, "YYYY-MM-DD");
			}else{
				initInputmaskTime();
				$("#noTimeinTimeoutDate").val(moment(new Date).format("MMMM DD, YYYY"));
			}
			
			$("#noTimeinTimeoutDate").data("daterangepicker").maxDate = moment();
			return html;
		}, 300);
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
			// forApprovalContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false);
			headerTabContent(false);
			formContent(data, readOnly);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
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
			const fromValue = $("#noTimeinTimeoutTimeIn").val()+":00";
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
		let data = getFormData("form_no_timein_timeout", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[noTimeinTimeoutStatus]"] = status;
			data["tableData[updatedBy]"] 			 = sessionID;
			data["feedback"] 					  	 = feedback;
			data["method"] 							 = method;
			data["tableName"]						 = "hris_no_timein_timeout_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]           = sessionID;
					data["tableData[approversStatus]"]       = 2;
					data["tableData[approversDate]"]         = dateToday();
					data["tableData[noTimeinTimeoutStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]          = sessionID;
						data["tableData[approversStatus]"]      = 2;
						data["tableData[approversDate]"]        = dateToday();
						data["tableData[changeScheduleStatus]"] = 2;
					}
				}
				data["whereFilter"] = "noTimeinTimeoutID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----


	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeOut", function () {
		// checkTimeRange($(this).attr("id"));
		//console.log($(this).attr("id"));
	});
	// ----- END CHANGE TIME TO -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("noTimeinTimeoutID");
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}
		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getData(action, 0, "save", feedback, id);

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"NO TIME-IN / TIME-OUT",
					"",
					"form_no_timein_timeout",
					data,
					true,
					pageContent
				);
			}, 300);
		}
		
	});
	// ----- END CLOSE FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		var getNegligenceValue = $("#negligence option:selected").val();
		var boolean = false;
		if(getNegligenceValue == "2"){
			if($("#noTimeinTimeoutTimeOut").val() != "00:00" ){
			
				boolean = true;
			}else{
				$("#noTimeinTimeoutTimeOut").focus();
				$("#noTimeinTimeoutTimeOut").addClass("is-invalid")
				$("#invalid-noTimeinTimeoutTimeOut").addClass("is-invalid")
				$("#invalid-noTimeinTimeoutTimeOut").text("Invalid time range")
			}
		}

		if(getNegligenceValue == "1"){
			if($("#noTimeinTimeoutTimeIn").val() != "00:00"){
				boolean = true;
			}else{
				$("#noTimeinTimeoutTimeIn").focus();
				$("#noTimeinTimeoutTimeIn").addClass("is-invalid")
				$("#invalid-noTimeinTimeoutTimeIn").addClass("is-invalid")
				$("#invalid-noTimeinTimeoutTimeIn").text("Invalid time range")
			}
		}

		if(getNegligenceValue == "3"){
			if($("#noTimeinTimeoutTimeIn").val() != "00:00" && $("#noTimeinTimeoutTimeOut").val() != "00:00" ){
				
				boolean = true;
			}else{
				if($("#noTimeinTimeoutTimeIn").val() == "00:00"){
					$("#noTimeinTimeoutTimeIn").focus();
					$("#noTimeinTimeoutTimeIn").addClass("is-invalid")
					$("#invalid-noTimeinTimeoutTimeIn").addClass("is-invalid")
					$("#invalid-noTimeinTimeoutTimeIn").text("Invalid time range")
				}

				if($("#noTimeinTimeoutTimeOut").val() == "00:00"){
					$("#noTimeinTimeoutTimeOut").focus();
					$("#noTimeinTimeoutTimeOut").addClass("is-invalid")
					$("#invalid-noTimeinTimeoutTimeOut").addClass("is-invalid")
					$("#invalid-noTimeinTimeoutTimeOut").text("Invalid time range")
				}
			}
		}

		if(boolean == true){
			const action   = "insert"; // CHANGE
			const feedback = getFormCode("SCH", dateToday()); 
			const data     = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"NO TIME-IN / TIME-OUT",
				"",
				"form_no_timein_timeout",
				data,
				true,
				myFormsContent
			);
		}
		
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id       = $(this).attr("noTimeinTimeoutID");
		const validate = validateForm("form_no_timein_timeout");

		if (validate) {
			const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 1, "submit", feedback, id);

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);
			
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                57,
					// tableID:                 1, // AUTO FILL
					notificationTitle:       "No Time-in/Time-out",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"NO TIME-IN / TIME-OUT",
					"",
					"form_no_timein_timeout",
					data,
					true,
					pageContent,
					notificationData
				);
			}, 300);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = $(this).attr("noTimeinTimeoutID");
		const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"NO TIME-IN / TIME-OUT",
			"",
			"form_no_timein_timeout",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id	   = $(this).attr("noTimeinTimeoutID");
		const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);
		const action   = id && feedback ? "update" : "insert";
		const data     = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"NO TIME-IN / TIME-OUT",
			"",
			"form_no_timein_timeout",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function() {
		const id       = decryptString($(this).attr("noTimeinTimeoutID"));
		const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);
		let tableData  = getTableData("hris_no_timein_timeout_tbl", "", "noTimeinTimeoutID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["tableData[approversDate]"]   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                57,
					tableID:                 id,
					notificationTitle:       "No Time-in/Time-out",
					notificationDescription: `${getFormCode("NTI", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                57,
					notificationTitle:       "No Time-in/Time-out",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:        2,
					employeeID:              getNotificationEmployeeID(approversID, approversDate),
				};
			}
			data["tableData[noTimeinTimeoutStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"NO TIME-IN / TIME-OUT",
					"",
					"form_no_timein_timeout",
					data,
					true,
					pageContent,
					notificationData
				);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}, 300);
		}
	})
	// ----- END APPROVE DOCUMENT -----
	

	// ----- CONDITION FOR NEGLIGENCE -----
	$(document).on("change", "#negligence", function() {
		var negligenceValue = $("#negligence option:selected").val();
		if(negligenceValue == "2"){
			$("#noTimeinTimeoutTimeIn").prop("disabled",true);
			$("#noTimeinTimeoutTimeIn").removeAttr("required");
			$("#noTimeinTimeoutTimeIn").val("00:00");
			$("#noTimeinTimeoutTimeIn").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#invalid-noTimeinTimeoutTimeIn").text("").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");


			$("#noTimeinTimeoutTimeOut").prop("disabled",false);
			$("#noTimeinTimeoutTimeOut").attr("required","");
			$("#noTimeinTimeoutTimeOut").val("00:00");
		}
		if(negligenceValue == "1"){
			$("#noTimeinTimeoutTimeOut").prop("disabled",true);
			$("#noTimeinTimeoutTimeOut").removeAttr("required");
			$("#noTimeinTimeoutTimeOut").val("00:00");
			$("#noTimeinTimeoutTimeOut").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#invalid-noTimeinTimeoutTimeOut").text("").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");

			$("#noTimeinTimeoutTimeIn").prop("disabled",false);
			$("#noTimeinTimeoutTimeIn").attr("required","");
			$("#noTimeinTimeoutTimeIn").val("00:00");
			
		}
		if(negligenceValue == "3"){
			$("#noTimeinTimeoutTimeIn").val("00:00");
			$("#noTimeinTimeoutTimeIn").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#invalid-noTimeinTimeoutTimeIn").text("").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#noTimeinTimeoutTimeIn").prop("disabled",false);
			$("#noTimeinTimeoutTimeIn").attr("required","");


			$("#noTimeinTimeoutTimeOut").val("00:00");
			$("#noTimeinTimeoutTimeOut").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#invalid-noTimeinTimeoutTimeOut").text("").removeClass("is-invalid").removeClass("is-valid").removeClass("validated");
			$("#noTimeinTimeoutTimeOut").prop("disabled",false);
			$("#noTimeinTimeoutTimeOut").attr("required","");



		}
	});
	// ----- END CONDITION FOR NEGLIGENCE -----



	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function() {
		const id       = $(this).attr("noTimeinTimeoutID");
		const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY NO TIME-IN / TIME-OUT DOCUMENT");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="noTimeinTimeoutRemarks"
					name="noTimeinTimeoutRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-noTimeinTimeoutRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			noTimeinTimeoutID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	})


	$(document).on("click", "#btnRejectConfirmation", function() {
		const id       = $(this).attr("noTimeinTimeoutID");
		const feedback = $(this).attr("code") || getFormCode("NTI", dateToday(), id);

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_no_timein_timeout_tbl", "", "noTimeinTimeoutID = "+ id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;
	
				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[noTimeinTimeoutRemarks]"] = $("[name=noTimeinTimeoutRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]   = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                57,
					tableID: 				 id,
					notificationTitle:       "No Time-in / Time-out",
					notificationDescription: `${getFormCode("NTI", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};
	
				setTimeout(() => {
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
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}, 300);
			}
		}
	})
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


	// ----- APPROVER STATUS -----
	function getApproversStatus(approversID, approversStatus, approversDate) {
		let html = "";
		if (approversID) {
			let idArr = approversID.split("|");
			let statusArr = approversStatus ? approversStatus.split("|") : [];
			let dateArr = approversDate ? approversDate.split("|") : [];
			html += `<div class="row mt-4">`;
	
			idArr && idArr.map((item, index) => {
				let date   = dateArr[index] ? moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A") : "";
				let status = statusArr[index] ? statusArr[index] : "";
				let statusBadge = "";
				if (date && status) {
					if (status == 2) {
						statusBadge = `<span class="badge badge-info">Approved - ${date}</span>`;
					} else if (status == 3) {
						statusBadge = `<span class="badge badge-danger">Denied - ${date}</span>`;
					}
				}
	
				html += `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12">
					<div class="d-flex justify-content-start align-items-center">
						<span class="font-weight-bold">
							${employeeFullname(item)}
						</span>
						<small>&nbsp;- Level ${index + 1} Approver</small>
					</div>
					${statusBadge}
				</div>`;
			});
			html += `</div>`;
		}
		return html;
	}
	// ----- END APPROVER STATUS -----

});

