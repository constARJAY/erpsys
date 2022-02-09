let DATE_ARRAY = [];
let oldLRFilename = [], newLRFilename = [], newLRFiles = [];

$(document).ready(function() {

	const MODULE_ID = 55;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
    // ----- MODULE APPROVER -----


	const moduleApprover = getModuleApprover(MODULE_ID);
	// ----- END MODULE APPROVER -----


	// ----- REUSABLE FUNCTION ------
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	let holidayData = getTableData(
        "hris_holiday_tbl",
        `*`,
        `holidayStatus = 1`
    )?.map(holiday => holiday.holidayDate);

	let employeeSchedule = getTableData(
		`hris_employee_list_tbl as helt
			LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)`,
		`IF(mondayStatus = 1, 1, 0) AS monday,
		IF(tuesdayStatus = 1, 1, 0) AS tuesday,
		IF(wednesdayStatus = 1, 1, 0) AS wednesday,
		IF(thursdayStatus = 1, 1, 0) AS thursday,
		IF(fridayStatus = 1, 1, 0) AS friday,
		IF(saturdayStatus = 1, 1, 0) AS saturday,
		IF(sundayStatus = 1, 1, 0) AS sunday`,
		`employeeID = ${sessionID}`
	);

	let leaveType = getTableData(
		`hris_leave_tbl AS hlt WHERE leaveStatus = 1`,
		`hlt.*, (SELECT leaveCredit FROM hris_employee_leave_tbl WHERE leaveID = hlt.leaveID AND employeeID = 1) AS leaveCredit`);

	function getDateInRange(dateFrom = '', dateTo = '') {
		let result = [];
		if (dateFrom && dateTo) {
			let tempFrom = moment(dateFrom).format("YYYY-MM-DD");
			let tempTo   = moment(dateTo).format("YYYY-MM-DD");

			do {
				!result.includes(tempFrom) && result.push(tempFrom);
				tempFrom = moment(tempFrom).add(1, 'days').format("YYYY-MM-DD");
			} while (tempFrom != tempTo && moment.duration(moment(tempTo).diff(moment(tempFrom))).asDays() > 0);
		}
		return result;
	}

	function getApprovedLeave() {
		let approvedLeaves = getTableData(
			`hris_leave_request_tbl WHERE employeeID = ${sessionID} AND leaveRequestStatus IN(1,2)`,
			`leaveRequestDateFrom AS dateFrom, leaveRequestDateTo AS dateTo`
		);

		let result = [];
		if (approvedLeaves && approvedLeaves.length) {
			approvedLeaves.map(lv => {
				let { dateFrom, dateTo } = lv;

				if (moment(dateFrom).isValid() && moment(dateTo).isValid()) {
					result = [...result, ...getDateInRange(dateFrom, dateTo)];
				}
			})
		}
		return result.length ? result.filter((v, i, a) => a.indexOf(v) === i) : [];
	}
	// ----- END REUSABLE FUNCTION ------


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
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },	
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 300 },
					{ targets: 6,  width: 80  },
					{ targets: 7,  width: 200 }
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
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },	
					{ targets: 3,  width: 250 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 300 },
					{ targets: 6,  width: 80  },
					{ targets: 7,  width: 200 }
				],
			});
	}
	// ----- END DATATABLES -----


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


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"hris_leave_request_tbl", 
				"reviseLeaveRequestID", 
				"reviseLeaveRequestID IS NOT NULL AND leaveRequestStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLeaveRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
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
					}else if(leaveRequestStatus == 7){
						isReadOnly = false;
						isRevise = true;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly, true, isFromCancelledDocument);
						updateURL(encryptString(id), true, true);
					} else {
						pageContent(true, tableData, isReadOnly);
						updateURL(encryptString(id));
					}
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
			let id = view_id;
				id && isFinite(id) && loadData(id, isRevise,isFromCancelledDocument);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				arr = url.split("?add=");
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					pageContent(true);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/leave_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/leave_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/leave_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/leave_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if(isCreateAllowed(MODULE_ID)){
				html = `
           	 	<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" 
				id="btnBack" 
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}">
			<i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


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


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let leaveRequestData = getTableData(
			"hris_leave_request_tbl AS hlrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"hlrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hlrt.createdAt AS dateCreated",
			`hlrt.employeeID != ${sessionID} AND leaveRequestStatus != 0 AND leaveRequestStatus != 4`,
			`FIELD(leaveRequestStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(hlrt.submittedAt, hlrt.createdAt)`
		);

		let html = `
		<table class="table table-bordered table-striped table-hover" id="tableForApprroval">
			<thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Leave Type</th>
					<th>Reason</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
				</tr>
			</thead>
			<tbody>`;

		leaveRequestData.map((item) => {
			let {
				fullname,
				leaveRequestID,
				reviseLeaveRequestID,
				leaveRequestCode,
				leaveRequestDate,
				leaveRequestDateFrom,
				leaveRequestDateTo,
				leaveRequestNumberOfDate,
				leaveID,
				leaveName,
				leaveRequestRemainingLeave,
				leaveStatus,
				leaveWorkingDay,
				timeIn,
				timeOut,
				leaveDocuments,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				leaveRequestReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "";
			let dateApproved  = leaveRequestStatus == 2 || leaveRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = leaveRequestStatus != 0 ? "btnView" : "btnEdit";


			if (isImCurrentApprover(approversID, approversDate, leaveRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(leaveRequestID )}">
					<td>${getFormCode("LRF", createdAt, leaveRequestID )}</td>
					<td>${fullname}</td>
					<td>${leaveName || "-"}</td>
					<td>
						<div>${leaveRequestDate || "-"}</div>
						<small>${leaveRequestReason || ""}</small>
					</td>
					<td>${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">${getStatusStyle(leaveRequestStatus)}</td>
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
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let leaveRequestData = getTableData(
			"hris_leave_request_tbl AS hlrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"hlrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hlrt.createdAt AS dateCreated",
			`hlrt.employeeID = ${sessionID}`,
			`FIELD(leaveRequestStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(hlrt.submittedAt, hlrt.createdAt)`
		);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Leave Type</th>
					<th>Reason</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		leaveRequestData.map((data) => {
			let {
				fullname,
				leaveRequestID,
				reviseLeaveRequestID,
				leaveRequestCode,
				leaveRequestDate,
				leaveRequestDateFrom,
				leaveRequestDateTo,
				leaveRequestNumberOfDate,
				leaveID,
				leaveName,
				leaveRequestRemainingLeave,
				leaveStatus,
				leaveWorkingDay,
				timeIn,
				timeOut,
				leaveDocuments,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				leaveRequestReason,
				submittedAt,
				createdAt,
			} = data;

			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "";
			let dateApproved  = leaveRequestStatus == 2 || leaveRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = leaveRequestStatus != 0 ? "btnView" : "btnEdit";
		
				
			html += `
			<tr class="${btnClass}" id="${encryptString(leaveRequestID )}">
				<td>${getFormCode("LRF", createdAt, leaveRequestID )}</td>
				<td>${fullname}</td>
				<td>${leaveName || "-"}</td>
				<td>
					<div>${leaveRequestDate || ""}</div>
					<small>${leaveRequestReason || ""}</small>
				</td>
				<td>${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">${getStatusStyle(leaveRequestStatus)}</td>
				<td>${remarks}</td>
			</tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----


	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
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
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise, isFromCancelledDocument);
			headerTabContent(false);
			formContent(data, readOnly, isRevise, isFromCancelledDocument);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- GET LEAVE TYPE OPTION -----
	function getLeaveTypeOption(inLeaveID = null){
		let html = `<option value="" disabled selected>Select Leave Type</option>`;
		
		leaveType.map((value, index)=>{
			let {
				leaveID,
				leaveName,
				leaveCredit
			} = value;

			html += `
			<option value   = "${leaveID}"
				leavename   = "${leaveName}"
				leavecredit	= "${leaveCredit || 0}"
				${leaveID == inLeaveID ? "selected" : "" }>${leaveName}</option>`;
		});

		return html;
	}
	// ----- END GET LEAVE TYPE OPTION -----


	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				leaveRequestID     = "",
				leaveRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (leaveRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						leaveRequestID="${encryptString(leaveRequestID)}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF",createdAt, leaveRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (leaveRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(leaveRequestStatus == 2){
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	leaveRequestID="${encryptString(leaveRequestID)}"
					// 	code="${getFormCode("LRF", createdAt, leaveRequestID)}"
					// 	status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (leaveRequestStatus == 3) {
					// DENIED - FOR REVISE
					if(!isDocumentRevised(leaveRequestID)){
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				} else if (leaveRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(leaveRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (leaveRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
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
				class="btn btn-submit px-5 p-2" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- INIT DATERANGEPICKER -----
	function initDateRangePicker(inLeaveID = 0, dateFrom = '', dateTo = '') {

		/* ----- LEAVE ----
		1 - Sick Leave
		2 - Vacation Leave
		3... - etc.
		----- END LEAVE ---- */

		let leaveID        = inLeaveID ? $(`[name="leaveID"]`).val() : 0;
		let approvedLeaves = getApprovedLeave();
		DATE_ARRAY = [...holidayData, ...approvedLeaves];

		let isSickLeave = leaveID == 1;
		let minDate   = isSickLeave ? moment().subtract(10, "d").format("MMMM DD, YYYY") : moment();
		let maxDate   = isSickLeave ? moment() : false;
		let startDate = moment(dateFrom || minDate);
		let endDate   = moment(dateTo || minDate);

		$(`[name="leaveRequestDate"]`).daterangepicker({
			autoUpdateInput: false,
			showDropdowns:   true,
			autoApply:       true,
			startDate,
			endDate,
			minDate,
			maxDate,
			locale: {
				format: "MMMM DD, YYYY"
			},
			isInvalidDate: function(date) {
				let optionDay  = moment(date).day();

				let isActive = '1';
				employeeSchedule.map(schedule => {
						if (optionDay == 0)  isActive = schedule.sunday    ?? '1';
					else if (optionDay == 1) isActive = schedule.monday    ?? '1';
					else if (optionDay == 2) isActive = schedule.tuesday   ?? '1';
					else if (optionDay == 3) isActive = schedule.wednesday ?? '1';
					else if (optionDay == 4) isActive = schedule.thursday  ?? '1';
					else if (optionDay == 5) isActive = schedule.friday    ?? '1';
					else if (optionDay == 6) isActive = schedule.saturday  ?? '1';
				});

				let optionDate = moment(date).format("YYYY-MM-DD");

				isActive == '0' && !DATE_ARRAY.includes(optionDate) && DATE_ARRAY.push(optionDate);
				return holidayData.includes(optionDate) || approvedLeaves.includes(optionDate) || isActive == '0';
			}
		}, function(start, end) {
			let oldDateFrom =  moment($(`[name="leaveRequestDate"]`).attr("dateFrom") ?? new Date).format("YYYY-MM-DD");
			let oldDateTo   =  moment($(`[name="leaveRequestDate"]`).attr("dateTo") ?? new Date).format("YYYY-MM-DD");

			let dateFrom  = start.format("YYYY-MM-DD");
			let dateTo    = end.format("YYYY-MM-DD");
			let dateRange = getDateInRange(dateFrom, dateTo);

			$(`[name="leaveRequestDate"]`).val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
			$(`[name="leaveRequestDate"]`).attr("dateFrom", dateFrom);
			$(`[name="leaveRequestDate"]`).attr("dateTo", dateTo);

			let displayError = () => {
				/**
				 * ----- ERROR TYPE -----
				 * 'invalid'      - Invalid date
				 * 'insufficient' - Invalid credit
				 * ----- END ERROR TYPE -----
				 */

				showNotification("danger", "Invalid date range.");
	
				$(`[name="leaveRequestDate"]`).val(moment(oldDateFrom).format('MMMM DD, YYYY') + ' - ' + moment(oldDateTo).format('MMMM DD, YYYY'));
				$(`[name="leaveRequestDate"]`).attr("dateFrom", oldDateFrom);
				$(`[name="leaveRequestDate"]`).attr("dateTo", oldDateTo);

				$("#leaveRequestDate").data('daterangepicker').setStartDate(moment(oldDateFrom).format("MMMM DD, YYYY"));
				$("#leaveRequestDate").data('daterangepicker').setEndDate(moment(oldDateTo).format("MMMM DD, YYYY"));

				let dayCount = +moment.duration(moment(oldDateTo).diff(moment(oldDateFrom))).asDays() || 0;
					dayCount += 1;
				$(`[name="leaveRequestNumberOfDate"]`).val(dayCount);
				$(`[name="leaveRequestDate"]`).attr("dayCount", dayCount);
			}

			let flag = true;
			DATE_ARRAY.map(date => {
				if (dateRange.includes(date)) {
					if (flag) {
						displayError();
						flag = false;
					}
				}
			})

			if (flag) {
				let dayCount = +moment.duration(moment(dateTo).diff(moment(dateFrom))).asDays() || 0;
					dayCount += 1;
				let isDisabled = dayCount == 1;
				$(`[name="leaveWorkingDay"]`).val('1').trigger('change').attr("disabled", !isDisabled);
				$(`[name="leaveRequestNumberOfDate"]`).val(dayCount);
				$(`[name="leaveRequestDate"]`).attr("dayCount", dayCount);

				if (isSickLeave && dayCount >= 3) {
					$(`#supportDocument`).html(`Support Documents <code>*</code>`);
				} else {
					$(`#supportDocument`).html(`Support Documents`);
				}
			}

			$(`[name="leaveRequestDate"]`).removeClass("is-invalid").removeClass("is-valid");
			$(`#invalid-leaveRequestDate`).text("");
		});

		if (leaveID) {
			$(`[name="leaveRequestDate"]`).val(startDate.format('MMMM DD, YYYY') + ' - ' + endDate.format('MMMM DD, YYYY'));
			$(`[name="leaveRequestDate"]`).attr("dateFrom", moment(startDate).format("YYYY-MM-DD"));
			$(`[name="leaveRequestDate"]`).attr("dateTo", moment(endDate).format("YYYY-MM-DD"));

			let dayCount = +moment.duration(moment(endDate).diff(moment(startDate))).asDays() || 0;
				dayCount += 1;
			$(`[name="leaveRequestNumberOfDate"]`).val(dayCount);
			$(`[name="leaveRequestDate"]`).attr("dayCount", dayCount);
			$(`[name="leaveWorkingDay"]`).val('1').trigger("change").attr("disabled", false);
		}
	}
	// ----- END INIT DATERANGEPICKER -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		oldLRFilename = [], newLRFilename = [], newLRFiles = [];

		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			leaveRequestID       		= "",
			reviseLeaveRequestID 		= "",
			employeeID              	= "",
			leaveRequestCode			= "",
			leaveRequestDate			= "",
			leaveRequestDateFrom		= "",
			leaveRequestDateTo			= "",
			leaveRequestNumberOfDate	= 0,
			leaveID						= "",
			leaveName					= "",
			leaveRequestRemainingLeave	= "",
			leaveStatus					= "",
			leaveWorkingDay				= "",
			timeIn						= "",
			timeOut						= "",
			leaveDocument				= "",
			approversID					= "",
			approversStatus				= "",
			approversDate				= "",
			leaveRequestStatus			= "",
			leaveRequestRemarks			= "",
			leaveRequestReason			= "",
			submittedAt					= "",
			createdAt					= "",
		} = data && data[0];
	
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		let disabledFileLeave = "disabled";
		let isLastApprover = false;
		if(approversID && leaveRequestStatus == "1") {
			let approversArray  = approversID?.split("|");
			let lastlength 		= approversArray.length;
			let lastApproverID 	= approversArray[parseInt(lastlength) - 1];
			disabledFileLeave 	= lastApproverID == sessionID ? "" : "disabled";
			isLastApprover      = disabledFileLeave ? false : true;
		}

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("leaveRequestID", encryptString(leaveRequestID));
		$("#btnBack").attr("status", leaveRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);
		$("#btnBack").attr("lastApprover", isLastApprover);

		let disabled = readOnly ? "disabled" : ``;
		
		let button            = formButtons(data, isRevise, isFromCancelledDocument);
		let disabledTime      = !disabled && leaveWorkingDay != "0" ? "disabled" : disabled;
		let disableWorkingDay = !disabled && (leaveWorkingDay == "1" || parseFloat(leaveRequestNumberOfDate) > 1) ? "disabled" : disabled;


		let reviseDocumentNo    = isRevise ? leaveRequestID : reviseLeaveRequestID;
		let documentHeaderClass = isRevise || reviseLeaveRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseLeaveRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseLeaveRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("LRF", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";
		
		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${leaveRequestID && !isRevise ? getFormCode("LRF", createdAt, leaveRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${leaveRequestStatus && !isRevise ? getStatusStyle(leaveRequestStatus) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentDateClass}">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
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
							${leaveRequestRemarks && !isRevise ? leaveRequestRemarks : "---"}
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

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Leave Type ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2 w-100" name="leaveID" id="leaveID" required ${disabled}>
						${getLeaveTypeOption(leaveID)}
					</select>
					<div class="d-block invalid-feedback" id="invalid-leaveID"></div>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Leave Credit/s</label>
					<input type="text" class="form-control" name="leaveCredit" disabled value="${leaveRequestRemainingLeave}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Status</label>
					<select class="form-control validate select2 w-100" name="leaveStatus" style="width: 100%" ${disabledFileLeave}>
							<option value="0" ${leaveStatus == "0" ? "selected" : ""}>Unpaid</option>
							<option value="1" ${leaveStatus == "1" ? "selected" : ""}>Paid</option>
					</select>
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Date ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="button" class="form-control text-left validate" name="leaveRequestDate" id="leaveRequestDate" value="${leaveRequestDate || ""}" required ${disabled}>
					<div class="d-block invalid-feedback" id="invalid-leaveRequestDate"></div>
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Number of Day/s </label>
					<input type="text" class="form-control" name="leaveRequestNumberOfDate" disabled value="${leaveRequestNumberOfDate || "1" }">
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Working Day ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2 w-100" name="leaveWorkingDay" id="leaveWorkingDay" required ${disableWorkingDay}>
							<option value="1" ${leaveWorkingDay == "1" ? "selected" : ""}>Whole-day</option>
							<option value="0" ${leaveWorkingDay == "0" ? "selected" : ""}>Half-day</option>
					</select>
					<div class="d-block invalid-feedback" id="invalid-leaveWorkingDay"></div>
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="time" class="form-control validate" name="timeIn" id="timeIn" ${disabledTime} value="${timeIn}">
					<div class="d-block invalid-feedback" id="invalid-timeIn"></div>
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
					<input type="time" class="form-control validate" name="timeOut" id="timeOut" ${disabledTime} value="${timeOut}">
					<div class="d-block invalid-feedback" id="invalid-timeOut"></div>
				</div>
			</div>

			<div class="col-md-12 col-sm-12">
				<div class="form-group">
					<label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
					<div class="remarks">
						<textarea rows="4" style="resize: none" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/]['][''][;][:][-][_][()][%][&][*][ ]" name="leaveRequestReason" required id="remarks" ${disabled} >${leaveRequestReason}</textarea>
					</div>
				</div>
			</div>
			
			<div class="col-12">
				<div class="row">
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label id="supportDocument">Support Documents </label>
						 	<input  type="file" 
								class="form-control" 
								name="leaveDocuments" 
								id="leaveDocuments"
								accept="image/*, .pdf, .doc, .docx"  
								multiple="multiple"
								filename="${leaveDocument}"
								${disabled}>
							<div class="d-block invalid-feedback" id="invalid-leaveDocuments"></div>
							<div class="row display-image-parent" id="displayFile">
								${displayFile(leaveDocument)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12">
				<div class="row row-display-image">
				</div>
				
			</div>
		

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			initAll();
			!disabled && initDateRangePicker(leaveID, leaveRequestDateFrom, leaveRequestDateTo);

			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}

		}, 200);
	}
	// ----- END FORM CONTENT -----


	// ----- CHECK FILE LENGTH -----
	function checkFileLength() {
		let leaveID   = $(`[name="leaveID"]`).val();
		let leaveDays = +$(`[name="leaveRequestNumberOfDate"]`).val();
		let count     = oldLRFilename.length + newLRFilename.length;
		if (leaveID == 1 && leaveDays >= 3) { // SICK LEAVE
			if (!count) {
				showNotification("danger", "Please upload supporting documents.");
				return false;
			}
		}

		if (count > 10) {
			showNotification("danger", "Only 10 files are allowed to upload.");
			return false;
		}
		return true;
	}
	// ----- END CHECK FILE LENGTH -----


	// ----- DISPLAY FILE -----
    function displayFile(file = null, blob = "", link = true, oldFiles = true) {
        let html = ``;
        if (file && file != null && file != "null") {
			let fileArr = file.split("|");
			fileArr.forEach(rlFile => {
				if (oldFiles) oldLRFilename.push(rlFile);
				
				let fileType = rlFile.split(".");
					fileType = fileType[fileType.length-1].toLowerCase();
				let imageExtensions = ["jpg", "png", "jpeg", "gif"];
				let isFileImage = imageExtensions.includes(fileType);
				let targetAttr = isFileImage ? `display="true" blob="${blob}"` : 
					(oldFiles ? `target="_blank"` : "");

				let otherAttr = link ? `
				href="${base_url+"assets/upload-files/leave-documents/"+rlFile}"` : `href="javascript:void(0)"`;
				html += `
				<div class="col-md-4 col-sm-12 display-image-content">
					<div class="display-image">
						<div class="d-flex justify-content-start align-items-center p-0">
							<span class="btnRemoveFile pr-2 display-image-remove"
								filename="${rlFile}">
								<i class="fas fa-close"></i>
							</span>
							<a class="filename display-image-filename"
								title="${rlFile}"
								${otherAttr}
								${targetAttr}>
								${rlFile}
							</a>
						</div>
					</div>
				</div>`;
			})
        }
        return html;
    }
    // ----- END DISPLAY FILE -----


	// ----- GET LEAVE REQUEST DATA -----
	function getleaveRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

		/**
		 * ----- ACTION ---------
		 *    > insert
		 *    > update
		 * ----- END ACTION -----
		 * 
		 * ----- STATUS ---------
		 *    0. Draft
		 *    1. For Approval
		 *    2. Approved
		 *    3. Denied
		 *    4. Cancelled
		 * ----- END STATUS -----
		 * 
		 * ----- METHOD ---------
		 *    > submit
		 *    > save
		 *    > deny
		 *    > approve
		 * ----- END METHOD -----
		 */

		let data = { tasks: [], files: [], }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			formData.append("leaveRequestID", id);

			if (status != "2") {
				formData.append("leaveRequestStatus", status);
			}
		}

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			let leaveRequestCode		   = $(`[name=leaveRequestCode]`).val();
			let leaveRequestDate		   = $(`[name=leaveRequestDate]`).val();
			let leaveRequestDateFrom	   = $(`[name=leaveRequestDate]`).attr("dateFrom");
			let leaveRequestDateTo		   = $(`[name=leaveRequestDate]`).attr("dateTo");
			let leaveRequestNumberOfDate   = $(`[name=leaveRequestNumberOfDate]`).val();
			let leaveID					   = $(`[name=leaveID]`).val();
			let leaveName				   = $(`[name=leaveID] option:selected`).attr("leavename") || "";
			let leaveRequestRemainingLeave = $(`[name=leaveCredit]`).val();
			let leaveStatus				   = $(`[name=leaveStatus]`).val();
			let leaveWorkingDay			   = $(`[name=leaveWorkingDay]`).val();
			let timeIn					   = $(`[name=timeIn]`).val();
			let timeOut					   = $(`[name=timeOut]`).val();

			formData.append("leaveRequestCode", leaveRequestCode);
			formData.append("leaveRequestDate", leaveRequestDate);
			leaveRequestDateFrom && formData.append("leaveRequestDateFrom", leaveRequestDateFrom);
			leaveRequestDateTo && formData.append("leaveRequestDateTo", leaveRequestDateTo);
			formData.append("leaveRequestNumberOfDate", leaveRequestNumberOfDate);
			formData.append("leaveID", leaveID);
			formData.append("leaveName", leaveName);
			formData.append("leaveRequestRemainingLeave", leaveRequestRemainingLeave);
			formData.append("leaveStatus", leaveStatus);
			formData.append("leaveWorkingDay", leaveWorkingDay);
			formData.append("timeIn", timeIn);
			formData.append("timeOut", timeOut);

			formData.append("employeeID", sessionID);
			formData.append("leaveRequestReason", $("[name=leaveRequestReason]").val()?.trim() || "");
			
			if (action == "insert") {
				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				formData.append("leaveRequestID", id);
			}

			if (method == "submit") {
				formData.append("submittedAt", dateToday());
				if (approversID) {
					formData.append("approversID", approversID);
					formData.append("leaveRequestStatus",   	1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("leaveRequestStatus", 2);
				}
			}
		} 

		// ----- FILES -----
		formData.append("uploadFileFolder", "leave-documents");
		formData.append("uploadFileColumnName[0]", "leaveDocument");
		formData.append("uploadFileNewFilename[0]", newLRFilename.join("|"));
		formData.append("uploadFileOldFilename[0]", oldLRFilename.join("|"));
		newLRFiles.map((file, index) => {
			formData.append(`uploadFiles[0][${index}]`, file);
		})
		// ----- FILES -----

		return formData;
	}
	// ----- END GET LEAVE REQUEST DATA -----


	// ----- MODAL IMAGE -----
	$(document).on("click", `.display-image-filename`, function(e) {
		let display = $(this).attr("display") == "true";
		let source  = $(this).attr("blob") || $(this).attr("href");
		if (display) {
			e.preventDefault();
			$("#display-image-preview").attr("src", source);
			$("#display-image-modal").modal("show");
		}
	})
	// ----- END MODAL IMAGE -----


	// ----- SELECT FILE -----
	$(document).on("change", `[name="leaveDocuments"]`, function() {
		let countFiles = oldLRFilename.length + newLRFilename.length;
		if (this.files && this.files[0]) {
			let files = this.files;
			let filesLength = this.files.length;
			for (var i=0; i<filesLength; i++) {
				countFiles++;

				const filesize = files[i].size/1024/1024; // Size in MB
				const filetype = files[i].type;
				const filename = files[i].name;
				const fileArr  = filename.split(".");
				const name     = fileArr?.[0];
				const type     = fileArr?.[fileArr.length-1]?.toLowerCase();
				const displayName = `${name}${countFiles}.${type}`;
				if (filesize > 10) {
					showNotification("danger", `${filename} - File size must be less than or equal to <b>10mb</b>`);
				} else if (!["png", "jpg", "jpeg", "doc", "docx", "pdf"].includes(type)) {
					showNotification("danger", `${filename} - <b>Invalid file type</b>`);
				} else {
					newLRFilename.push(displayName);
					newLRFiles.push(files[i]);
					let blob = URL.createObjectURL(files[i]);
					$(`#displayFile`).append(displayFile(displayName, blob, true, false));
				}
			}
			$(this).val("");
        }
	})
	// ----- END SELECT FILE -----


	// ----- REMOVE FILE -----
	$(document).on("click", `.btnRemoveFile`, function() {
		const filename     = $(this).attr("filename");
		const newFileIndex = newLRFilename.indexOf(filename);
		const oldFileIndex = oldLRFilename.indexOf(filename);

		newFileIndex != -1 && newLRFilename.splice(newFileIndex, 1);
		newFileIndex != -1 && newLRFiles.splice(newFileIndex, 1);
		oldFileIndex != -1 && oldLRFilename.splice(oldFileIndex, 1);

		$display = $(this).closest(".display-image-content");
		$display.fadeOut(500, function() {
			$display.remove();
		})
    })
    // ----- END REMOVE FILE -----


	// ----- SELECT LEAVE TYPE -----
	$(document).on("change",`[name="leaveID"]`, function() {
		let leaveID     = $(this).val();
		let leaveCredit = +$(`option:selected`, this).attr("leaveCredit");
		leaveCredit = leaveCredit > 0 ? leaveCredit : 0;
		$(`[name="leaveCredit"]`).val(leaveCredit);
		initDateRangePicker(leaveID);
	});
	// ----- END SELECT LEAVE TYPE -----


	// ----- SELECT WORKING DAY -----
	$(document).on("change",`[name="leaveWorkingDay"]`, function(){
		let workingDay   = $(this).val();
		let dayCount     = +$(`[name="leaveRequestDate"]`).attr("dayCount") || 1;
		let numberOfDays = workingDay == "0" ? "0.5" : dayCount;

		let disabled = workingDay != "0" ? true : false;
		$(`[name=timeIn], [name=timeOut]`).prop("disabled", disabled);
		$(`[name=timeIn], [name=timeOut]`).prop("required", !disabled);
		$(`[name=timeIn], [name=timeOut]`).val("");
		$(`[name=leaveRequestNumberOfDate]`).val(numberOfDays);
	});
	// ----- END SELECT WORKING DAY -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id 					= decryptString($(this).attr("leaveRequestID"));
		const fromCancelledDocument = $(this).attr("cancel" ) == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const status     				= $(this).attr("status");
		const revise     				= $(this).attr("revise");

		if (status != "false" && status != 0) {
			
			if (revise != "false" && status != "7") {
				const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data   = getleaveRequestData(action, "save", "0", id);
				data.append("leaveRequestStatus", 0);
				if(!isFromCancelledDocument){
					data.append("reviseLeaveRequestID", id);
					data.delete("leaveRequestID");
				}else{
					data.append("leaveRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}
				
				saveleaveRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getleaveRequestData(action, "save", "0", id);
			data.append("leaveRequestStatus", 0);

			saveleaveRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     					= getleaveRequestData(action, "save", "0", id);

		data.append("leaveRequestStatus", 0);

		if (revise) {
			if(!isFromCancelledDocument){
				data.append("reviseLeaveRequestID", id);
				data.delete("leaveRequestID");
			}else{
				data.append("leaveRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		} 
		saveleaveRequest(data, "save", null, pageContent);

		
		// let btnBackCondition = $("#btnBack").attr("status");
		// if(btnBackCondition != "7"){
		// 	saveleaveRequest(data, "save", null, pageContent);
		// }else{ 
		// 	$("#page_content").html(preloader);
		// 	pageContent();
		// }
	});
	// ----- END SAVE DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("leaveRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getleaveRequestData(action, "cancelform", "4", id, status);

		saveleaveRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	function validateDate() {
		let dateFrom  = moment($(`[name="leaveRequestDate"]`).attr("dateFrom") || new Date).format("YYYY-MM-DD");
		let dateTo    = moment($(`[name="leaveRequestDate"]`).attr("dateTo") || new Date).format("YYYY-MM-DD");
		let dateRange = getDateInRange(dateFrom, dateTo);
		let flag = true;
		DATE_ARRAY.map(date => {
			if (dateRange.includes(date)) {
				if (flag) {
					showNotification("danger", "Please select valid date.");
					flag = false;
				}
			}
		})
		return flag;
	}

	$(document).on("click", "#btnSubmit", function () {
		const id           				= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_leave_request");

		if (validate && validateDate() && checkFileLength()) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getleaveRequestData(action, "submit", "1", id);

			if (revise) {
				if(!isFromCancelledDocument){
					data.append("reviseLeaveRequestID", id);
					data.delete("leaveRequestID");
				}
			}

			let approversID = "", approversDate = "";
			for (var i of data) {
				if (i[0] == "approversID")   approversID   = i[1];
				if (i[0] == "approversDate") approversDate = i[1];
			}

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                55,
					notificationTitle:       "Leave Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}
			saveleaveRequest(data, "submit", notificationData, pageContent);
		}
		
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("leaveRequestID"));
		const feedback 		= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		let isLastApprover  = $(`#btnBack`).attr("lastApprover") == "true";
		let leaveCredit     = +$(`[name="leaveCredit"]`).val();
		let dayCount        = +$(`[name="leaveRequestNumberOfDate"]`).val();
		let leaveStatus     = $(`[name="leaveStatus"]`).val();

		if (isLastApprover && leaveStatus == '1' && dayCount > leaveCredit) {
			showNotification("danger", "Insufficient leave credits.")
		} else {
			let tableData  		= getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
		
			let leaveRequestID  = tableData[0].leaveRequestID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;
			let leaveStatus 	= $(`[name=leaveStatus]`).val();
	
			let data = getleaveRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);
	
			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                MODULE_ID,
					tableID:                 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}
	
			data.append("leaveRequestStatus", status);
			data.append("leaveStatus", leaveStatus);
			saveleaveRequest(data, "approve", notificationData, pageContent, leaveRequestID);
		}

		
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		$("#modal_leave_request_content").html(preloader);
		$("#modal_leave_request .page-title").text("DENY LEAVE REQUEST");
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
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			leaveRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_leave_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		const validate = validateForm("modal_leave_request");
		if (validate) {
			let tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", 				"update");
				data.append("method", 				"deny");
				data.append("leaveRequestID", 		id);
				data.append("approversStatus", 		updateApproveStatus(approversStatus, 3));
				data.append("approversDate", 		updateApproveDate(approversDate));
				data.append("leaveRequestRemarks", 	$("[name=leaveRequestRemarks]").val()?.trim());
				data.append("updatedBy", 			sessionID);

				let notificationData = {
					moduleID:                55,
					tableID: 				 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveleaveRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
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


	

	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Leave Request";
		let swalText, swalImg;

		$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("hide");

		switch (method) {
			case "save":
				swalTitle = `SAVE DRAFT`;
				swalText  = "Are you sure to save this document?";
				swalImg   = `${base_url}assets/modal/draft.svg`;
				break;
			case "submit":
				var condition = $("[name=timelineProposedBudget]").attr("timelineBudgetStatus");
				if(condition != 0){
					swalTitle = `SUBMIT ${title.toUpperCase()}`;
					swalText  = "Are you sure to submit this document?";
					swalImg   = `${base_url}assets/modal/add.svg`;
				}else{
					swalTitle = `PROPOSE ${title.toUpperCase()}`;
					swalText  = "Are you sure to submit the project timeline for proposal";
					swalImg   = `${base_url}assets/modal/add.svg`;
				}
				break;
			case "approve":
				swalTitle = `APPROVE ${title.toUpperCase()}`;
				swalText  = "Are you sure to approve this document?";
				swalImg   = `${base_url}assets/modal/approve.svg`;
				break;
			case "deny":
				swalTitle = `DENY ${title.toUpperCase()}`;
				swalText  = "Are you sure to deny this document?";
				swalImg   = `${base_url}assets/modal/reject.svg`;
				break;
			case "cancelform":
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure to cancel this document?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
			case "drop":
				swalTitle = `DROP ${title.toUpperCase()}`;
				swalText  = "Are you sure to drop this document?";
				swalImg   = `${base_url}assets/modal/drop.svg`;
				break;
			default:
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText  = "Are you sure that you want to cancel this process?";
				swalImg   = `${base_url}assets/modal/cancel.svg`;
				break;
		}
		return Swal.fire({
			title:              swalTitle,
			text:               swalText,
			imageUrl:           swalImg,
			imageWidth:         200,
			imageHeight:        200,
			imageAlt:           "Custom image",
			showCancelButton:   true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor:  "#1a1a1a",
			cancelButtonText:   "No",
			confirmButtonText:  "Yes"
		})
	}

	function saveleaveRequest(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
		let thisReturnData = false;
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `leave_request/saveleaveRequest`,
						data,
						processData: false,
						contentType: false,
						global:      false,
						cache:       false,
						async:       false,
						dataType:    "json",
						beforeSend: function() {
							$("#loader").show();
						},
						success: function(data) {
							let result = data.split("|");
			
							let isSuccess   = result[0];
							let message     = result[1];
							let insertedID  = result[2];
							let dateCreated = result[3];

							let swalTitle;
							if (method == "submit") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} submitted successfully!`;
							} else if (method == "save") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} saved successfully!`;
							} else if (method == "cancelform") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} cancelled successfully!`;
							} else if (method == "approve") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} approved successfully!`;
							} else if (method == "deny") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} denied successfully!`;
							} else if (method == "drop") {
								swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} dropped successfully!`;
							}
			
							if (isSuccess == "true") {
								setTimeout(() => {
									$("#loader").hide();
									closeModals();
									Swal.fire({
										icon:              "success",
										title:             swalTitle,
										showConfirmButton: false,
										timer:             2000,
									}).then(function() {
										callback && callback();
									});
									
									if (method == "approve" || method == "deny") {
										$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
									}

									// ----- SAVE NOTIFICATION -----
									if (notificationData) {
										if (Object.keys(notificationData).includes("tableID")) {
											insertNotificationData(notificationData);
										} else {
											notificationData["tableID"] = insertedID;
											insertNotificationData(notificationData);
										}
									}
									// ----- END SAVE NOTIFICATION -----
								}, 500);
							} else {
								setTimeout(() => {
									$("#loader").hide();
									Swal.fire({
										icon:              "danger",
										title:             message,
										showConfirmButton: false,
										timer:             2000,
									});
								}, 500);
							}
						},
						error: function() {
							setTimeout(() => {
								$("#loader").hide();
								showNotification("danger", "System error: Please contact the system administrator for assistance!");
							}, 500);
						}
					}).done(function() {
						setTimeout(() => {
							$("#loader").hide();
						}, 500);
					})
				} else {
					if (res.dismiss === "cancel") {
						if(method != "submit"){
							if (method != "deny") {
								callback && callback();
							} else {
								$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("show");
							}
						}
								
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("show");
						}
					}
				}
			});
		}
		return thisReturnData;
	}

	// --------------- END DATABASE RELATION ---------------

})