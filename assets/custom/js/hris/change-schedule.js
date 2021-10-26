$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(60);


	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("change schedule");
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
	// ----- END REUSABLE FUNCTIONS -----


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"hris_change_schedule_tbl", 
				"reviseChangeScheduleID", 
				"reviseChangeScheduleID IS NOT NULL AND changeScheduleID != 4");
			return revisedDocumentsID.map(item => item.reviseChangeScheduleID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					changeScheduleStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (changeScheduleStatus == 0 || changeScheduleStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (changeScheduleStatus == 0) {
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
					const isAllowed = isCreateAllowed(46);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) { 
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/change_schedule?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/change_schedule?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/change_schedule?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/change_schedule`);
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
					{ targets: 1, width: 150 },
					{ targets: 2, width: 350 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 300 },
					{ targets: 5, width: 80  },
					{ targets: 6, width: 200 },
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
					{ targets: 1, width: 150 },
					{ targets: 2, width: 350 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 300 },
					{ targets: 5, width: 80  },
					{ targets: 6, width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_change_schedule_tbl", "approversID")) {
				let count = getCountForApproval("hris_change_schedule_tbl", "changeScheduleStatus");
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
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(60)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);

		let scheduleData = getTableData(
			`hris_change_schedule_tbl 
				LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			"hris_change_schedule_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND changeScheduleStatus != 0 AND changeScheduleStatus != 4`,
			`FIELD(changeScheduleStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_change_schedule_tbl.submittedAt, hris_change_schedule_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Description</th>
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
				changeScheduleID,
				changeScheduleDate,
				changeScheduleTimeIn,
				changeScheduleTimeOut,
				approversID,
				approversDate,
				changeScheduleStatus,
				changeScheduleReason,
				changeScheduleRemarks,
				submittedAt,
				createdAt,
			} = schedule;

			let remarks       = changeScheduleRemarks ? changeScheduleRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = changeScheduleStatus == 2 || changeScheduleStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let description = `
				<div>${moment(changeScheduleDate).format("MMMM DD, YYYY")} | ${changeScheduleTimeIn} - ${changeScheduleTimeOut}</div>
				<small>${changeScheduleReason || "-"}</small>`;

			let btnClass = changeScheduleStatus != 0 ? "btnView" : "btnEdit";

			if (isImCurrentApprover(approversID, approversDate, changeScheduleStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(changeScheduleID)}">
					<td>${getFormCode("SCH", createdAt, changeScheduleID)}</td>
					<td>${fullname}</td>
					<td>${description}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, changeScheduleStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(changeScheduleStatus)}
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
		uniqueData = [];

		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
			"hris_change_schedule_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_change_schedule_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_change_schedule_tbl.createdAt AS dateCreated",
			`hris_change_schedule_tbl.employeeID = ${sessionID}`,
			`FIELD(changeScheduleStatus, 0, 1, 3, 2, 4, 5), COALESCE(hris_change_schedule_tbl.submittedAt, hris_change_schedule_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Description</th>
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
				changeScheduleID,
				changeScheduleDate,
				changeScheduleTimeIn,
				changeScheduleTimeOut,
				approversID,
				approversDate,
				changeScheduleReason,
				changeScheduleStatus,
				changeScheduleRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = changeScheduleRemarks ? changeScheduleRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = changeScheduleStatus == 2 || changeScheduleStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:                 changeScheduleID,
				changeScheduleDate: moment(changeScheduleDate).format("MMMM DD, YYYY"),
			};
			(changeScheduleStatus == 1 || changeScheduleStatus == 2) && uniqueData.push(unique);

			let description = `
				<div>${moment(changeScheduleDate).format("MMMM DD, YYYY")} | ${changeScheduleTimeIn} - ${changeScheduleTimeOut}</div>
				<small>${changeScheduleReason || "-"}</small>`;

			let btnClass = changeScheduleStatus != 0 ? "btnView" : "btnEdit";

			html += `
            <tr class="${btnClass}" id="${encryptString(changeScheduleID)}">
                <td>${getFormCode("SCH", createdAt, changeScheduleID)}</td>
                <td>${fullname}</td>
				<td>${description}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, changeScheduleStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(changeScheduleStatus)}
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
				changeScheduleID     = "",
				changeScheduleStatus = "",
				employeeID           = "",
				approversID          = "",
				approversDate        = "",
				createdAt            = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (changeScheduleStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						changeScheduleID="${encryptString(changeScheduleID)}"
						code="${getFormCode("SCH", createdAt, changeScheduleID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancel" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

				} else if (changeScheduleStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"
							status="${changeScheduleStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (changeScheduleStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						changeScheduleID="${encryptString(changeScheduleID)}"
						code="${getFormCode("SCH", createdAt, changeScheduleID)}"
						status="${changeScheduleStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (changeScheduleStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(changeScheduleID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"
							status="${changeScheduleStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (changeScheduleStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(changeScheduleID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"
							status="${changeScheduleStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (changeScheduleStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							changeScheduleID="${encryptString(changeScheduleID)}"
							code="${getFormCode("SCH", createdAt, changeScheduleID)}"><i class="fas fa-ban"></i> 
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
				class="btn btn-cancel btnCancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			changeScheduleID      = "",
			reviseChangeScheduleID = "",
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
			createdAt             = new Date,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("changeScheduleID", encryptString(changeScheduleID));
		$("#btnBack").attr("code", getFormCode("SCH", moment(createdAt), changeScheduleID));
		$("#btnBack").attr("status", changeScheduleStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? changeScheduleID : reviseChangeScheduleID;
		let documentHeaderClass = isRevise || reviseChangeScheduleID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseChangeScheduleID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseChangeScheduleID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("SCH", createdAt, reviseDocumentNo)}
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
							${changeScheduleID && !isRevise ? getFormCode("SCH", createdAt, changeScheduleID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${changeScheduleStatus && !isRevise ? getStatusStyle(changeScheduleStatus) : "---"}
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
								${submittedAt && !isRevise && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(changeScheduleStatus, approversID, approversDate)}
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
							${changeScheduleRemarks && !isRevise ? changeScheduleRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_change_schedule">
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
                        id="changeScheduleDate"
                        name="changeScheduleDate"
                        value="${changeScheduleDate && moment(changeScheduleDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${encryptString(changeScheduleID)}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-changeScheduleDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
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
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
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
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
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
			${!isRevise ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			initInputmaskTime(data ? true : false);
			// if (data) {
			// 	$("#changeScheduleDate").data("daterangepicker").startDate = moment(changeScheduleDate, "YYYY-MM-DD");
			// 	$("#changeScheduleDate").data("daterangepicker").endDate   = moment(changeScheduleDate, "YYYY-MM-DD");
			// } else {
			// 	initInputmaskTime();
			// 	$("#changeScheduleDate").val(moment(new Date).format("MMMM DD, YYYY"));
			// }
			// $("#changeScheduleDate").data("daterangepicker").minDate = moment();


			$("#changeScheduleDate").val(moment(new Date).format("MMMM DD, YYYY"));
			$("#changeScheduleDate").daterangepicker({
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				startDate: moment(changeScheduleDate || new Date).format("YYYY-MM-DD"),
				minDate: moment(),
				// maxDate: moment().add(80, 'days'),
				locale: {
					format: "MMMM DD, YYYY",
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
			}, function(data) {
				$("#changeScheduleDate").val(moment(data).format("MMMM DD, YYYY"));
			})

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

			headerButton(true, "Add Change Schedule");
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
			const fromValue = $("#changeScheduleTimeIn").val() + ":00";
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
		let data = getFormData("form_change_schedule", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[changeScheduleStatus]"] = status;
			data["tableData[updatedBy]"]            = sessionID;
			data["feedback"]                        = feedback;
			data["method"]                          = method;
			data["tableName"]                       = "hris_change_schedule_tbl";

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
					data["tableData[changeScheduleStatus]"] = 2;
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
				data["whereFilter"] = "changeScheduleID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----


	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeOut", function () {
		// checkTimeRange(decryptString($(this).attr("id")));
	});
	// ----- END CHANGE TIME TO -----

	
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


	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("changeScheduleID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("changeScheduleID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {

			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getData(action, 0, "save", feedback, id);
				data[`tableData[changeScheduleStatus]`] = 0;
				if (!isFromCancelledDocument) {
					delete data[`changeScheduleID`];
					data[`feedback`] = getFormCode("SCH", new Date);
					data[`tableData[reviseChangeScheduleID]`] = id;
				} else {
					delete data[`action`];
					data[`tableData[changeScheduleID]`] = id;
					data[`action`] = "update";
				}

				setTimeout(() => {
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
				}, 300);
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
			data[`tableData[changeScheduleStatus]`] = 0;

			setTimeout(() => {
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
			}, 300);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("changeScheduleID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[changeScheduleStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("SCH", new Date);
				data[`tableData[reviseChangeScheduleID]`] = id;
				data[`whereFilter`] = `changeScheduleID = ${id}`;
				delete data[`tableData[changeScheduleID]`];
			} else {
				data[`tableData[changeScheduleID]`] = id;
				data[`whereFilter`] = `changeScheduleID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		formConfirmation(
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
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("changeScheduleID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_change_schedule");

		const changeScheduleDate = moment($("#changeScheduleDate").val());
		let duration = moment.duration(moment(changeScheduleDate).diff(moment())).asDays() + 1;
		let flag = true;
		if (duration < 0) {
			flag = false;
			$("#changeScheduleDate").removeClass("is-valid").addClass("is-invalid");
			$("#invalid-changeScheduleDate").text("Invalid date")
		}

		if (validate && flag) {
			const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[reviseChangeScheduleID]`] = id;
					delete data[`tableData[changeScheduleID]`];
					data["feedback"] = getFormCode("SCH", new Date);
				} else {
					data[`whereFilter`] = `changeScheduleID = ${id}`;
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
					moduleID:                60,
					notificationTitle:       "Change Schedule",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
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
			}, 300);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("changeScheduleID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

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


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("changeScheduleID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  = getTableData("hris_change_schedule_tbl", "", "changeScheduleID = " + id);

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
					notificationTitle:       "Change Schedule",
					notificationDescription: `${getFormCode("SCH", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Change Schedule",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[changeScheduleStatus]"] = status;

			setTimeout(() => {
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
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("changeScheduleID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY CHANGE SCHEDULE");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
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
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			changeScheduleID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("changeScheduleID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_change_schedule_tbl", "", "changeScheduleID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[changeScheduleRemarks]"] = $("[name=changeScheduleRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                60,
					tableID: 				 id,
					notificationTitle:       "Change Schedule",
					notificationDescription: `${getFormCode("SCH", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
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
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}, 300);
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const changeScheduleID = decryptString($(this).attr("changeScheduleID"));
		const feedback         = $(this).attr("code") || getFormCode("SCH", dateToday(), id);

		const id = decryptString($(this).attr("changeScheduleID"));
		let data = {};
		data["tableName"]                       = "hris_change_schedule_tbl";
		data["whereFilter"]                     = `changeScheduleID = ${changeScheduleID}`;
		data["tableData[changeScheduleStatus]"] = 5;
		data["action"]                          = "update";
		data["method"]                          = "drop";
		data["feedback"]                        = feedback;
		data["tableData[updatedBy]"]            = sessionID;

		setTimeout(() => {
			formConfirmation(
				"drop",
				"update",
				"CHANGE SCHEDULE",
				"",
				"form_change_schedule",
				data,
				true,
				pageContent
			);
		}, 300);
	})
	// ----- END DROP DOCUMENT -----


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