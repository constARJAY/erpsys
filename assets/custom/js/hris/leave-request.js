$(document).ready(function () {

	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("leave request");
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
			const tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					leaveRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (leaveRequestStatus == 0 || leaveRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (leaveRequestStatus == 0) {
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
			window.history.pushState("", "", `${base_url}hris/leave_request?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}hris/leave_request?add`);
		} else {
			window.history.pushState("", "", `${base_url}hris/leave_request`);
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
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 100 },
					{ targets: 1, width: 180 },
					{ targets: 2, width: 180 },
					{ targets: 3, width: 200 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 300 },
					{ targets: 6, width: 80  },
					{ targets: 7, width: 200 },
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
					{ targets: 0, width: 100 },
					{ targets: 1, width: 180 },
					{ targets: 2, width: 180 },
					{ targets: 3, width: 200 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 300 },
					{ targets: 6, width: 80  },
					{ targets: 7, width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_leave_request_tbl", "approversID")) {
				let count = getCountForApproval("hris_leave_request_tbl", "leaveRequestStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = `
				<div class="bh_divider appendHeader"></div>
				<div class="row clearfix appendHeader">
					<div class="col-12">
						<ul class="nav nav-tabs">
							<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval ${displayCount}</a></li>
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

		let scheduleData = getTableData(
			"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND leaveRequestStatus != 0 AND leaveRequestStatus != 4`,
			`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Leave Type</th>
					<th>Leave Date/s</th>
					<th>Current Approver</th>
					<th>Date</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((schedule) => {
			let {
				fullname,
				leaveID,
				leaveRequestDate,
				leaveRequestID,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				submittedAt,
				createdAt,
			} = schedule;
			let leaveDateSplit= leaveRequestDate.split(" - ");
			let leaveDate 	  = leaveDateSplit[0] == leaveDateSplit[1] ? leaveDateSplit[0] : leaveDateSplit[0]+" - "+leaveDateSplit[1];
			let leaveType  	  = getTableData("hris_leave_tbl","leaveName","leaveID="+leaveID);
			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = leaveRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${encryptString(leaveRequestID)}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(approversID, approversDate, leaveRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView btnEdit" id="${encryptString(leaveRequestID)}">
					<td>${getFormCode("LRF", dateCreated, leaveRequestID)}</td>
					<td>${fullname}</td>
					<td>${leaveID != 0 ? leaveType[0].leaveName : "-" }</td>
					<td>${leaveDate}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(leaveRequestStatus)}
					</td>
					<td>${remarks}</td>
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
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
			"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_leave_request_tbl.createdAt AS dateCreated",
			`hris_leave_request_tbl.employeeID = ${sessionID}`,
			`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Leave Type</th>
					<th>Leave Date/s</th>
                    <th>Current Approver</th>
					<th>Date</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			let {
				fullname,
				leaveID,
				leaveRequestDate,
				leaveRequestID,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let leaveDateSplit= leaveRequestDate.split(" - ");
			let leaveDate 	  = leaveDateSplit[0] == leaveDateSplit[1] ? leaveDateSplit[0] : leaveDateSplit[0]+" - "+leaveDateSplit[1];
			let leaveType  	  = getTableData("hris_leave_tbl","leaveName","leaveID="+leaveID);
			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = leaveRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:                 leaveRequestID,
				leaveRequestDate: moment(leaveRequestDate).format("MMMM DD, YYYY"),
			};
			(leaveRequestStatus == 1 || leaveRequestStatus == 2) && uniqueData.push(unique);

			let button =
				leaveRequestStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(leaveRequestID)}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(leaveRequestID)}" 
                code="${getFormCode("LRF", dateCreated, leaveRequestID)}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr class="btnView btnEdit" id="${encryptString(leaveRequestID)}" >
                <td>${getFormCode("LRF", dateCreated, leaveRequestID)}</td>
                <td>${fullname}</td>
				<td>${leaveID != 0 ? leaveType[0].leaveName : "-" }</td>
				<td>${leaveDate}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(leaveRequestStatus)}
                </td>
				<td>${remarks}</td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			return html;
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----


	// ----- FORM BUTTONS -----
	function formButtons(data = false) {
		let button = "";
		if (data) {
			let {
				leaveRequestID     = "",
				leaveRequestStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
				createdAt            = new Date
			} = data && data[0];

			let isOngoing = approversDate
				? approversDate.split("|").length > 0
					? true
					: false
				: false;
			if (employeeID === sessionID) {
				if (leaveRequestStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 py-2" 
						id="btnSubmit" 
						leaveRequestID="${leaveRequestID}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel px-5 py-2"
						id="btnCancelForm" 
						leaveRequestID="${leaveRequestID}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (leaveRequestStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 py-2"
							id="btnCancelForm" 
							leaveRequestID="${leaveRequestID}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (leaveRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 py-2" 
							id="btnApprove" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 py-2"
							id="btnReject" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit px-5 py-2" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel px-5 py-2" 
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
			    leaveRequestID 				= "",
				leaveRequestCode 			= "",
				employeeID 					= "",
				leaveRequestDate 			= "",
				leaveRequestDateFrom 		= moment(new Date).format("YYYY-MM-DD"),
				leaveRequestDateTo 			= moment(new Date).format("YYYY-MM-DD"),
				leaveRequestNumberOfDate 	= "1",
				leaveID 					="",
				leaveRequestRemainingLeave 	= "",
				leaveRequestReason 			= "",
				leaveRequestRemarks			= "",
				approversID 				= "",
				approversStatus 			= "",
				approversDate 				= "",
				leaveRequestStatus 			= false,
				submittedAt 				= false,
				createdAt 					= false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("leaveRequestID", leaveRequestID);
		$("#btnBack").attr("status", leaveRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data);

		let html = `
        <div class="row px-2">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${leaveRequestID ? getFormCode("LRF", createdAt, leaveRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${leaveRequestStatus ? getStatusStyle(leaveRequestStatus) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(leaveRequestStatus, approversID, approversDate)}
							</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">
							${leaveRequestRemarks ? leaveRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_leave_request">
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
                        id="leaveRequestDate"
                        name="leaveRequestDate"
                        value="${leaveRequestDate && moment(leaveRequestDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${leaveRequestID}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-leaveRequestDate"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label for="">Number of Day/s</label>
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
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label for="">Leave Type ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2" id="leaveID" name="leaveID" ${disabled} required>
                    ${getLeaveOptions(leaveID)}
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-leaveID"></div>
                </div>
            </div>

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label for="">Leave Credit/s</label>
                    <input type="text" class="form-control" disabled name="leaveRequestRemainingLeave" id="leaveRequestRemainingLeave" required value="3">
                    <div class="invalid-feedback d-block" id="invalid-leaveRequestRemainingLeave"></div>
                </div>
            </div>


            <div class="col-md-12 col-sm-12">
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
            leaveRequestDateRange();

			if (data) {
				initInputmaskTime(false);
				$("#leaveRequestDate").data("daterangepicker").startDate = moment(leaveRequestDate, "YYYY-MM-DD");
				$("#leaveRequestDate").data("daterangepicker").endDate   = moment(leaveRequestDate, "YYYY-MM-DD");
			} else {
				initInputmaskTime();
				
			}
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

			headerButton(true, "Add Leave Request");
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
	// ----- END CUSTOM INPUTMASK ------


	// ----- CHECK TIME RANGE -----
	function checkTimeRange(elementID = false, isReturnable = false) {
		let element = elementID ? `#${elementID}` : ".timeOut";
		let flag = 0;
		$(element).each(function () {
			const fromValue = $("#leaveRequestTimeIn").val() + ":00";
			const validated = $(this).hasClass("validated");
			const toValue   = $(this).val() + ":00";

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
		let data = getFormData("form_leave_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[leaveRequestStatus]"] = status;
			data["tableData[updatedBy]"]            = sessionID;
			data["feedback"]                        = feedback;
			data["method"]                          = method;
			data["tableName"]                       = "hris_leave_request_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"]         = sessionID;
				data["tableData[createdBy]"]          = sessionID;
				data["tableData[createdAt]"]          = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]          = sessionID;
					data["tableData[approversStatus]"]      = 2;
					data["tableData[approversDate]"]        = dateToday();
					data["tableData[leaveRequestStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]          = sessionID;
						data["tableData[approversStatus]"]      = 2;
						data["tableData[approversDate]"]        = dateToday();
						data["tableData[leaveRequestStatus]"] = 2;
					}
				}
				data["whereFilter"] = "leaveRequestID=" + id;
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
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("leaveRequestID");
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}
		} else {
			formButtonHTML(this);
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 0, "save", feedback, id);

			setTimeout(() => {
				cancelForm("save", action,
					"LEAVE REQUEST",
					"",
					"form_leave_request",
					data,
					true,
					pageContent,
					this
				);
			}, 0);
		}
	});
	// ----- END CLOSE FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		// const tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID=" + id);
		// pageContent(true, tableData);
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		// const tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID=" + id);
		// pageContent(true, tableData, true);
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		/**
		 * 
		 * 	I THINK IF IT'S A DRAFT DOCUMENT, NO NEED TO VALIDATE...
		 * 
		 */
		// const validate     = validateForm("form_leave_request");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {
		// 	const action   = "insert"; 
		// 	const feedback = getFormCode("LRF", dateToday()); // SCH-20-00000

		// 	const data = getData(action, 0, "save", feedback);

		// 	formConfirmation(
		// 		"save",
		// 		"insert",
		// 		"LEAVE REQUEST",
		// 		"",
		// 		"form_leave_request",
		// 		data,
		// 		true,
		// 		myFormsContent
		// 	);
		// }

		const action   = "insert"; 
		const feedback = getFormCode("LRF", dateToday()); 
		const data     = getData(action, 0, "save", feedback);

		formConfirmation(
			"save",
			"insert",
			"LEAVE REQUEST",
			"",
			"form_leave_request",
			data,
			true,
			myFormsContent
		);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		formButtonHTML(this);
		const id           = $(this).attr("leaveRequestID");
		const validate     = validateForm("form_leave_request");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
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
					moduleID:                60,
					// tableID:                 1, // AUTO FILL
					notificationTitle:       "Leave Request Form",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"LEAVE REQUEST",
					"",
					"form_leave_request",
					data,
					true,
					pageContent,
					notificationData,
					this
				);
			}, 300);
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"LEAVE REQUEST",
			"",
			"form_leave_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		formButtonHTML(this);
		const id       = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const action   = id && feedback ? "update" : "insert";
		const data     = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"LEAVE REQUEST",
			"",
			"form_leave_request",
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
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateCreated, id);
		let tableData  = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);

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
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Leave Request Form",
					notificationDescription: `${getFormCode("LRF", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Leave Request Form",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[leaveRequestStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"LEAVE REQUEST",
					"",
					"form_leave_request",
					data,
					true,
					pageContent,
					notificationData,
					this
				);
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("leaveRequestID");
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		$("#modal_leave_request_content").html(preloader);
		$("#modal_leave_request .page-title").text(
			"DENY LEAVE REQUEST DOCUMENT"
		);
		$("#modal_leave_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
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
			<button class="btn btn-danger px-5 py-2" id="btnRejectConfirmation"
			leaveRequestID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 py-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_leave_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		formButtonHTML(this);
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		const validate = validateForm("modal_leave_request");
		if (validate) {
			let tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[leaveRequestRemarks]"] = $("[name=leaveRequestRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                60,
					tableID: 				 id,
					notificationTitle:       "Leave Request Form",
					notificationDescription: `${getFormCode("LRF", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"LEAVE REQUEST",
						"modal_leave_request",
						"",
						data,
						true,
						pageContent,
						notificationData,
						this
					);
					$(`[redirect=forApprovalTab]`).trigger("click");
				}, 300);
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


function getLeaveOptions(leaveID  = 0) {
    let getLeave = getTableData("hris_leave_tbl", "*", "leaveStatus = 1");
    let leaveOptions = `<option selected value="0" disabled>Select Leave Type</option>`;
    getLeave.map(item => {
        leaveOptions += `<option value="${item.leaveID}" ${item.leaveID == leaveID && "selected"}>${item.leaveName}</option>`;
    })
    return leaveOptions;
}

function leaveRequestDateRange(){
    $('#leaveRequestDate').daterangepicker({
        "showDropdowns": true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        autoApply: true,
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

$(document).on("change","#leaveRequestDate", function(){
    let thisValue           = $(this).val();
    let splitingValue       = thisValue.split("-");
    let fromDate            = new Date(splitingValue[0]); 	
    let toDate              = new Date(splitingValue[1]);
    let numberOfDays        = Math.round((toDate-fromDate)/(1000*60*60*24)) + 1;
    var remaining_of_days   = $("#leaveRequestRemainingLeave").val();

    $("#leaveRequestNumberOfDate").val(numberOfDays);
    if(numberOfDays > remaining_of_days){
        $("#leaveRequestNumberOfDate").addClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").addClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").text("Not enough number of leave!");
    }else{
        $("#leaveRequestNumberOfDate").removeClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").removeClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").text("");
    }
});