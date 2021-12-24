$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(55);


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

	// ----- REUSABLE FUNCTIONS -----
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

	const getOvertimeDateList = getTableData(
		"hris_overtime_request_tbl", 
		"overtimeRequestDate",
		`overtimeRequestDate = 2 AND employeeID = ${sessionID}`);

		const getApproveLeave = getTableData(
			"hris_leave_request_tbl", 
			"leaveRequestDateFrom",
			`leaveRequestStatus = 2 AND employeeID = ${sessionID}`);
	// ----- END REUSABLE FUNCTIONS -----


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
				id && isFinite(id) && loadData(id, isRevise, isFromCancelledDocument);
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
					const isAllowed = isCreateAllowed(55);
					pageContent(isAllowed);
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
			if (isCreateAllowed(55)) {
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

		let leaveRequestData = getTableData(
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

		leaveRequestData.map((schedule) => {
			let {
				fullname,
				leaveID,
				leaveName,
				leaveRequestDate,
				leaveRequestID,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				submittedAt,
				createdAt,
			} = schedule;
			let leaveDate 	  = leaveRequestDate ? moment(leaveRequestDate).format("MMMM DD, YYYY") : "-";
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
					<td>${leaveName || "-" }</td>
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
	function myFormsData(leaveRequestID = 0) {
		uniqueData = [];
		let leaveRequestData = getTableData(
			"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_leave_request_tbl.createdAt AS dateCreated",
			`hris_leave_request_tbl.employeeID = ${sessionID} AND leaveRequestID <> ${leaveRequestID}`,
			`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
		);
		leaveRequestData.map(leave => {
			let {
				leaveRequestID,
				leaveRequestDateFrom,
				leaveRequestDateTo,
				leaveRequestStatus
			} = leave;
			let unique = {
				id: leaveRequestID,
				leaveRequestDateFrom,
				leaveRequestDateTo,
			};
			(leaveRequestStatus == 1 || leaveRequestStatus == 2) && uniqueData.push(unique);
		})
		return leaveRequestData;
	}

	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let leaveRequestData = myFormsData();

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

		leaveRequestData.map((item) => {
			let {
				fullname,
				leaveID,
				leaveName,
				leaveRequestDate,
				leaveRequestID,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let leaveDate 	  = leaveRequestDate ?  moment(leaveRequestDate).format("MMMM DD, YYYY") : "-"
			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = leaveRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:               leaveRequestID,
				leaveRequestDate: leaveRequestDate,
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
				<td>${leaveName || "-" }</td>
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
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				leaveRequestID     = "",
				leaveRequestStatus = "",
				employeeID         = "",
				approversID        = "",
				approversDate      = "",
				createdAt          = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (leaveRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 py-2" 
						id="btnSubmit" 
						leaveRequestID="${encryptString(leaveRequestID)}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
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
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (leaveRequestStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						leaveRequestID="${encryptString(leaveRequestID)}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"
						status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (leaveRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(leaveRequestID)) {
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


	// ----- GET LEAVE CREDIT -----
	function getLeaveCredit(employeeID = 0, leaveID = 0) {
		let data = getTableData(
			`hris_employee_leave_tbl`,
			`*`,
			`employeeID=${employeeID} AND leaveID=${leaveID}`
		);
		let {
			leaveCredit      = 0,
			leaveAccumulated = 0
		} = data && data[0];
		// console.log(leaveCredit, leaveAccumulated);
		return Math.floor((+leaveCredit) + (+leaveAccumulated));
	}
	// ----- END GET LEAVE CREDIT -----


	// ----- SELECT LEAVE NAME -----
	$(document).on("change", `[name="leaveID"]`, function() {
		const leaveID = $(this).val();
		const leaveCredit = getLeaveCredit(sessionID, leaveID);
		$(`[name="leaveRequestRemainingLeave"]`).val(leaveCredit);
		$("#leaveRequestDate").trigger("change");
	})
	// ----- END SELECT LEAVE NAME -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			leaveRequestID 				= "",
			reviseLeaveRequestID        = "",
			leaveRequestCode 			= "",
			employeeID 					= "",
			leaveRequestDate 			= "",
			leaveRequestDateFrom 		= new Date,
			leaveRequestDateTo 			= new Date,
			leaveRequestNumberOfDate 	= "1",
			leaveID 					= "",
			leaveRequestRemainingLeave 	= "0",
			leaveRequestReason 			= "",
			leaveRequestRemarks			= "",
			approversID 				= "",
			approversStatus 			= "",
			approversDate 				= "",
			leaveWorkingDay				= "",
			leaveStatus   				= "",
			leaveRequestStatus 			= false,
			timeIn						="",
			timeOut					="",
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

		$("#btnBack").attr("leaveRequestID", leaveRequestID ? encryptString(leaveRequestID) : "");
		$("#btnBack").attr("code", getFormCode("LRF", moment(createdAt), leaveRequestID));
		$("#btnBack").attr("status", leaveRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		const approverList = approversID ? approversID.split("|" ) : 0;
		const lastApproverID = approversID ?  approverList[approverList.length - 1]  : 0;
		let paiddisabled = leaveRequestStatus == 1 && lastApproverID == sessionID ? "" : "disabled";
		let workDayDisabled = leaveWorkingDay == 1 ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

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
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label for="">Leave Type ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2" id="leaveID" name="leaveID" ${disabled} required>
                    ${getLeaveOptions(leaveID)}
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-leaveID"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label for="">Leave Credit/s</label>
                    <input type="text" class="form-control" disabled name="leaveRequestRemainingLeave" id="leaveRequestRemainingLeave" required value="${leaveRequestRemainingLeave}">
                    <div class="invalid-feedback d-block" id="invalid-leaveRequestRemainingLeave"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Status</label>
                      <select class="form-control select2" id="leaveStatus" name="leaveStatus" ${paiddisabled} required>
                        <option value="0" ${data && leaveStatus == "0" && "selected"}>Unpaid</option>
 						<option value="1" ${data && leaveStatus == "1" && "selected"}>Paid</option>
 						</select>
                    <div class="d-block invalid-feedback" id="invalid-leaveStatus"></div>
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
                    <label>Working Day ${!disabled ? "<code>*</code>" : ""}</label>
                      <select class="form-control select2" id="leaveWorkingDay" name="leaveWorkingDay" ${disabled} required>
                        <option selected value="" disabled>Select Working Day</option>
                        <option value="0" ${data && leaveWorkingDay == "0" && "selected"}>Half-day</option>
 						<option value="1" ${data && leaveWorkingDay == "1" && "selected"}>Whole-day</option>
 						</select>
                    <div class="d-block invalid-feedback" id="invalid-leaveWorkingDay"></div>
                </div>
            </div>
			<div class="col-md-2 col-sm-12">
                <div class="form-group">
				<label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
				<input type="time" class="form-control text-center" name="timeIn" id="timeIn"  ${disabled} ${workDayDisabled} value="${timeIn}">
                    <div class="d-block invalid-feedback" id="invalid-timeIn"></div>
                </div>
            </div>
			<div class="col-md-2 col-sm-12">
                <div class="form-group">
				<label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
				<input type="time" class="form-control text-center" name="timeOut" id="timeOut"  ${disabled} ${workDayDisabled}  value="${timeOut}">
                    <div class="d-block invalid-feedback" id="invalid-timeOut"></div>
                </div>
            </div>
            
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label for="">Number of Day/s</label>
                    <input 
                        type="text" 
                        class="form-control"
                        disabled 
                        name="leaveRequestNumberOfDate" 
                        id="leaveRequestNumberOfDate"
                        value="${leaveWorkingDay == "0" ? leaveRequestNumberOfDate - (leaveRequestNumberOfDate*.5) : leaveRequestNumberOfDate || "-"}">
                    <div class="invalid-feedback d-block" id="invalid-leaveRequestNumberOfDate"></div>
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
			let leaveRequestData = getTableData(
				"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
				"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_leave_request_tbl.createdAt AS dateCreated",
				`hris_leave_request_tbl.employeeID = ${sessionID}`,
				`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
			);
			leaveRequestData.map(leave => {
				let {
					leaveRequestID,
					leaveRequestDate,
					leaveRequestStatus
				} = leave;
				let unique = {
					id: leaveRequestID,
					leaveRequestDate,
				};
				(leaveRequestStatus == 1 || leaveRequestStatus == 2) && uniqueData.push(unique);
			})
			$("#page_content").html(html);

			initAll();
			initDataTables();
            leaveRequestDateRange(leaveRequestDateFrom, leaveRequestDateTo, employeeSchedule, holidayData);

			let getLeaveCredits = getTableData(
				"hris_employee_leave_tbl",
				`IFNULL(leaveCredit,0)AS creditLeft`,
				`leaveID = ${leaveID || 0} AND  employeeID = ${employeeID || sessionID}`
			);

			leaveRequestStatus == 1 ? $("#leaveRequestRemainingLeave").val(getLeaveCredits[0].creditLeft) : "";

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
			// ----- END NOT ALLOWED FOR UPDATE -----

			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----


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

	$(document).on("change", "#leaveWorkingDay", function() {
		var workDay = $("#leaveWorkingDay option:selected").val();
		var numberOfDays = $("#leaveRequestNumberOfDate").attr("numberofdays");
		
		if(workDay =="0"){
			var countnumber = (parseInt(numberOfDays) - 0.5);
			$("#leaveRequestNumberOfDate").val(countnumber);

			$("#timeIn").prop("disabled",false);
			$("#timeOut").prop("disabled",false);

	

		}else{
			$("#leaveRequestNumberOfDate").val(numberOfDays);

			$("#timeIn").prop("disabled",true);
			$("#timeIn").val(0);

			$("#timeOut").prop("disabled",true);
			$("#timeOut").val(0);



		}
	});	

	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_leave_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[leaveRequestStatus]"] = status;
			data["tableData[leaveName]"]          = $(`[name="leaveID"] option:selected`).text();
			data["tableData[leaveRequestDateFrom]"] = $("#leaveRequestDate").attr("start");
			data["tableData[leaveRequestDateTo]"] = $("#leaveRequestDate").attr("end");
			data["tableData[updatedBy]"]          = sessionID;
			data["feedback"]                      = feedback;
			data["method"]                        = method;
			data["tableName"]                     = "hris_leave_request_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]        = sessionID;
					data["tableData[approversStatus]"]    = 2;
					data["tableData[approversDate]"]      = dateToday();
					data["tableData[leaveRequestStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]        = sessionID;
						data["tableData[approversStatus]"]    = 2;
						data["tableData[approversDate]"]      = dateToday();
						data["tableData[leaveRequestStatus]"] = 2;
					}
				}
				data["whereFilter"] = "leaveRequestID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----

	
	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {

			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getData(action, 0, "save", feedback, id);
				data["leaveRequestStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["reviseLeaveRequestID"] = id;
					data[`feedback`] = getFormCode("LRF", new Date);
					delete data["leaveRequestID"];
				} else {
					delete data["action"];
					data["leaveRequestID"] = id;
					data["action"] = "update";
				}

				setTimeout(() => {
					cancelForm(
						"save", 
						action,
						"LEAVE REQUEST",
						"",
						"form_leave_request",
						data,
						true,
						pageContent
					);
				}, 0);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}
		} else {
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 0, "save", feedback, id);
			data["leaveRequestStatus"] = 0;

			setTimeout(() => {
				cancelForm(
					"save", 
					action,
					"LEAVE REQUEST",
					"",
					"form_leave_request",
					data,
					true,
					pageContent
				);
			}, 0);
		}
	});
	// ----- END CLOSE FORM -----


	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("leaveRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		formButtonHTML(this);
		const id           				= decryptString($(this).attr("leaveRequestID"));
		const leaveID           		= $("#leaveID option:selected").val();
		const leaveCredit           	= $("#leaveRequestNumberOfDate").val();
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_leave_request");

		if (validate) {
			const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);
			const leaveStatus = data[`tableData[leaveStatus]`] ;
			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[reviseLeaveRequestID]`] = id;
					delete data[`tableData[leaveRequestID]`];
					data["feedback"] = getFormCode("SCH", new Date);
				} else {
					data[`whereFilter`] = `leaveRequestID = ${id}`;
				}
			}

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);

			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                55,
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
					this,
					data[`tableData[leaveRequestStatus]`] == 2 ? updateEmployeeLeave : false,
					data[`tableData[leaveRequestStatus]`] == 2 ?  [employeeID, leaveID, leaveCredit,id,leaveStatus] : [],
				);
			
			}, 300);

			
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
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
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[leaveRequestStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("LRF", new Date);
				data[`tableData[reviseLeaveRequestID]`] = id;
				data[`whereFilter`] = `leaveRequestID = ${id}`;
				delete data[`tableData[leaveRequestID]`];
			} else {
				data[`tableData[leaveRequestID]`] = id;
				data[`whereFilter`] = `leaveRequestID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		formConfirmation(
			"save",
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


	// ----- UPDATE EMPLOYEE LEAVE -----
	function updateEmployeeLeave(employeeID = 0, leaveID = 0, leaveCredit = 0,leaveRequestID = 0,leaveStatus = 0) {
		const data = { employeeID, leaveID, leaveCredit };

	

		if(leaveStatus == 1){
			$.ajax({
				method: "POST",
				url: `leave_request/updateEmployeeLeave`,
				data,
				dataType: "json",
				success: function(data) {}
			}).done(function() {

			})
		}
		generateProductionReport(employeeID,2,leaveRequestID);
	

	}
	// ----- END UPDATE EMPLOYEE LEAVE -----


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
			let createdAt       = tableData[0].createdAt;
			let employeeID      = tableData[0].employeeID;
			let leaveID         = tableData[0].leaveID;
			let leaveCredit     = tableData[0].leaveRequestNumberOfDate;
			let leaveStatus     = tableData[0].leaveStatus;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["tableData[approversDate]"]   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                55,
					tableID:                 id,
					notificationTitle:       "Leave Request Form",
					notificationDescription: `${getFormCode("LRF", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};

				

			} else {
				status = 1;
				notificationData = {
					moduleID:                55,
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
					this,
					status == 2 ? updateEmployeeLeave : false,
					status == 2 ? [employeeID, leaveID, leaveCredit,id,leaveStatus] : []
				);
				// updateEmployeeLeave(employeeID, leaveID, leaveCredit);
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----

	// ---- FUNCTION FOR GENERATE PRODUCTION REPORT WHEN APPROVED ---//
	function generateProductionReport(employeeID = 0,status = 0,leaveRequestID = 0){

		let getDateRange = getTableData("hris_leave_request_tbl","*",`leaveRequestID =${leaveRequestID}`);

		let requestDate = getDateRange[0].leaveRequestDate;
		let leaveRequstCreatedAt = getDateRange[0].createdAt;
		let getDateFrom = moment(requestDate).format("YYYY-MM-DD");
		let getDateTo = moment(requestDate).format("YYYY-MM-DD");

		let leaveRequestCode = getFormCode("LRF", leaveRequstCreatedAt, leaveRequestID);
		let paidStatus = getDateRange[0].leaveStatus;
		let leaveType = getDateRange[0].leaveID;
		let workType = getDateRange[0].leaveWorkingDay;
		let timeIn =getDateRange[0].timeIn;
		let timeOut =getDateRange[0].timeOut;
		let reason =getDateRange[0].leaveRequestReason;
		$.ajax({
            method:   "POST",
            url:      "leave_request/generateProduction",
            data:     { employeeID 	: employeeID,
						leaveRequestID 	:	leaveRequestID,
						leaveRequestCode	:leaveRequestCode,
						leaveStatus	: status,
						dateFrom	: getDateFrom,
						dateTo 		: getDateTo,
						paidStatus	: paidStatus,
						leaveType	: leaveType,
						workType	: workType,
						timeIn		: timeIn,
						timeOut		: timeOut,
						reason	 	: reason},
            async:    false,
            dataType: "json",
			beforeSend: function() {
				// $("#loader").show();
			},
			success: function(data) {
			},
			error: function() {
				setTimeout(() => {
					// $("#loader").hide();
					showNotification("danger", "System error: Please contact the system administrator for assistance!");
				}, 500);
			}
		})
	}
	// ---- FUNCTION FOR GENERATE PRODUCTION REPORT WHEN APPROVED ---//


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
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
			leaveRequestID="${encryptString(id)}"
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
					moduleID:                55,
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

	function getLeaveOptions(leaveID  = 0) {
		let getLeave = getTableData("hris_leave_tbl", "*", "leaveStatus = 1");
		let leaveOptions = `<option selected value="0" disabled>Select Leave Type</option>`;
		getLeave.map(item => {
			leaveOptions += `<option value="${item.leaveID}" ${item.leaveID == leaveID && "selected"}>${item.leaveName}</option>`;
		})
		return leaveOptions;
	}
	
	function leaveRequestDateRange(iStartDate = new Date, iEndDate = new Date, employeeSchedule, holidayData){
		$("#leaveRequestDate").attr("start", moment(iStartDate).format("YYYY-MM-DD"));
		$("#leaveRequestDate").attr("end", moment(iEndDate).format("YYYY-MM-DD"));
		// console.log(iStartDate);
	
		$('#leaveRequestDate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			// minDate: moment(),
			minDate: moment().subtract(7, "days"),
			startDate: moment(iStartDate),
			endDate:   moment(iEndDate),
			autoApply: true,
			locale: {
			  format: 'MMMM DD, YYYY'
			},
			isInvalidDate: function(date) {
						let optionDay  = moment(date).day();
	
						let isActive = '1';
						employeeSchedule.map(schedule => {
								 if (optionDay == 0) isActive = schedule.sunday ?? '1';
							else if (optionDay == 1) isActive = schedule.monday ?? '1';
							else if (optionDay == 2) isActive = schedule.tuesday ?? '1';
							else if (optionDay == 3) isActive = schedule.wednesday ?? '1';
							else if (optionDay == 4) isActive = schedule.thursday ?? '1';
							else if (optionDay == 5) isActive = schedule.friday ?? '1';
							else if (optionDay == 6) isActive = schedule.saturday ?? '1';
						});
	
						let optionDate = moment(date).format("YYYY-MM-DD");
						return holidayData.includes(optionDate) || isActive == '0';
					},
			isInvalidDate: function(date) {
				let listDate =[];
	
				getOvertimeDateList.map((overtime)=>{
					let {overtimeRequestDate} = overtime;
	
					listDate.push(overtimeRequestDate);		
				});

				getApproveLeave.map((leave)=>{
					let {leaveRequestDateFrom} = leave;

					listDate.push(leaveRequestDateFrom);		
				});
	
				if (listDate.includes(date.format('YYYY-MM-DD')) && date.format('YYYY-MM-DD') != iStartDate) {
					return true; 
				}
			},
		}, function(start, end) {
			$("#leaveRequestDate").attr("start", moment(start).format("YYYY-MM-DD"));
			$("#leaveRequestDate").attr("end", moment(end).format("YYYY-MM-DD"));
		});
	}
	
	$(document).on("change","#leaveRequestDate", function(){
		let thisValue           = $(this).val();
		let splitingValue       = thisValue.split("-");
		let fromDate            = new Date(splitingValue[0]); 	
		let toDate              = new Date(splitingValue[1]);
		let numberOfDays        =  1;
		var leaveWorkingDay 	= $("#leaveWorkingDay option:selected").val() || 0;
		var leaveType 	= $("#leaveID option:selected").val() || 0;
		var remaining_of_days   = parseFloat($("#leaveRequestRemainingLeave").val()) || 0;
		var computeNumOfDays = 0;
	
		if(leaveWorkingDay === "0"){
			let countDeductDays  = parseFloat(numberOfDays * .5);
			computeNumOfDays = parseFloat(numberOfDays) - countDeductDays;
	
		}else{
			computeNumOfDays = parseFloat(numberOfDays);
	
		}
	
		// console.log(computeNumOfDays)
		$("#leaveRequestNumberOfDate").val(computeNumOfDays);
		$("#leaveRequestNumberOfDate").attr("numberOfDays",computeNumOfDays);
	
	if(leaveType !=0 ){
		if(numberOfDays > remaining_of_days){
			$("#leaveRequestNumberOfDate").addClass("is-invalid");
			$("#invalid-leaveRequestNumberOfDate").addClass("is-invalid");
			$("#invalid-leaveRequestNumberOfDate").text("Not enough number of leave!");
		}else{
			$("#leaveRequestNumberOfDate").removeClass("is-invalid");
			$("#invalid-leaveRequestNumberOfDate").removeClass("is-invalid");
			$("#invalid-leaveRequestNumberOfDate").text("");
		}
	}
		
	});
	
});


