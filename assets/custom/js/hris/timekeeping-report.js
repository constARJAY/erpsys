$(document).ready(function() {

	const allowedUpdate = isUpdateAllowed(79);


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
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_timekeeping_tbl", "", "timekeepingID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					timekeepingStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (timekeepingStatus == 0 || timekeepingStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (timekeepingStatus == 0) {
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
					const isAllowed = isCreateAllowed(79);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/timekeeping_report?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/timekeeping_report?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/timekeeping_report?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/timekeeping_report`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	function decimalToHours(decimal = 0.00) {
        if (decimal) {
            const num     = decimal * 60;
            const hours   = Math.floor(num / 60);  
            const minutes = Math.floor(num % 60);
            if (isFinite(hours) && isFinite(minutes)) {
                let hoursDisplay   = hours.toString().length > 1 ? hours : `0${hours}`;
                let minutesDisplay = minutes.toString().length > 1 ? minutes : `0${minutes}`;
                let display = `${hoursDisplay}:${minutesDisplay}`;
                return display;  
            }
        }
        return "00:00";
    }
	// END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
		$('[data-toggle="tooltip"]').tooltip();

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableTimekeeping")) {
			$("#tableTimekeeping").DataTable().destroy();
		}

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
					{ targets: 2,  width: 300 },
					{ targets: 3,  width: 300 }, 	
				],
			});

        var table = $("#tableTimekeeping")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollY: 500,
				sorting: [],
				scrollCollapse: true,
				paging: false,
                sorting: false,
                info: false,
				// autoWidth: false,
				bSort: false, 
				lengthMenu: [
					[50, 100, 150, 200, -1   ],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [
					{ targets: 0,       width: "250px" },
					{ targets: "thDay", width: "10px"  },
					{ targets: -1,      width: "100px" },	
					{ targets: -2,      width: "100px" },	
					{ targets: -3,      width: "120px" },	
					{ targets: -4,      width: "100px" },	
					{ targets: -5,      width: "100px" },	
				],
				fixedColumns: {
					leftColumns: 1
				}
			});

	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_timekeeping_tbl", "approversID")) {
				let count = getCountForApproval("hris_timekeeping_tbl", "timekeepingStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = ``;
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
			html = '';
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


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent .loader").length == 0 && $("#tableMyFormsParent").html(preloader);
		let timekeepingData = getTableData(
			`hris_timekeeping_tbl AS htt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"htt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, htt.createdAt AS dateCreated",
			`htt.timekeepingStatus = 2`,
			`FIELD(timekeepingStatus, 0, 1, 3, 2, 4, 5), COALESCE(htt.submittedAt, htt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Timekeeping Period</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>`;

		timekeepingData.map((item) => {
			let {
				timekeepingID,
                reviseTimekeepingID,
                employeeID,
                fullname,
                timekeepingStartDate, 
                timekeepingEndDate,
                timekeepingReason,
                approversID,
                approversStatus,
                approversDate,
                timekeepingStatus,
                timekeepingRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = timekeepingRemarks ? timekeepingRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = timekeepingStatus == 2 || timekeepingStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let timekeepingDate = "-";
            if (timekeepingStartDate && timekeepingEndDate) {
                timekeepingDate = `${moment(timekeepingStartDate).format("MMMM DD, YYYY")} - ${moment(timekeepingEndDate).format("MMMM DD, YYYY")}`;
            }
			let btnClass = timekeepingStatus != 0 ? "btnView" : "btnEdit";

			html += `
			<tr class="${btnClass}" id="${encryptString(timekeepingID )}">
                <td>${getFormCode("TMK", createdAt, timekeepingID )}</td>
                <td>${fullname}</td>
                <td>${timekeepingDate}</td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
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


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				timekeepingID     = "",
				timekeepingStatus = "",
				employeeID        = "",
				approversID       = "",
				approversDate     = "",
				createdAt         = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (timekeepingStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						timekeepingID="${encryptString(timekeepingID)}"
						code="${getFormCode("TMK", createdAt, timekeepingID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (timekeepingStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"
							status="${timekeepingStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (timekeepingStatus == 2) {
					// DROP
					/*
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						timekeepingID="${encryptString(timekeepingID)}"
						code="${getFormCode("TMK", createdAt, timekeepingID)}"
						status="${timekeepingStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
					*/
				} else if (timekeepingStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(timekeepingID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"
							status="${timekeepingStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (timekeepingStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(timekeepingID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"
							status="${timekeepingStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (timekeepingStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TMK", createdAt, timekeepingID)}"><i class="fas fa-ban"></i> 
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


	// ----- SEARCH TIMESHEET -----
	function searchTimesheet(timekeepingID = 0, startDate = "", endDate = "") {
		let result = [];
		if (startDate && endDate) {
			$.ajax({
				method: "POST",
				url: "timekeeping_report/searchTimesheet",
				data: { timekeepingID, startDate, endDate },
				async: false,
				dataType: "json",
				success: function(data) {
					result = data;
				}
			})
		}
		return result;
	}
	// ----- END SEARCH TIMESHEET -----


	// ----- TIMEKEEPING TABLE -----
	function timekeepingTable(data = false, timekeepingStatus = 0) {
		let {
			header     = "",
			columns    = [],
			attendance = [],
			errors     = [],
			success    = []
		} = data;

		let html = '';

		if (header && columns.length) {

			let columnDatesHTML = "";
			columns.map(col => {
				const { day, date, number } = col;
				columnDatesHTML += `
				<th class="thDay text-center">
					<div>${number}</div>
					<small>${day}</small>
				</th>`;
			});
	
			const displayData = (status = "", data) => {
				let html = "";
				if (data) {
					const { 
						scheduleDate,    
						scheduleIn,      
						scheduleOut,     
						scheduleBreakDuration, 
						scheduleDuration, 
						restDay,
						finalCheckIn,
						finalCheckOut,
						checkIn,          
						checkOut,         
						noTimeIn,        
						noTimeOut,        
						noInOutID,        
						noInOutReference, 
						overtimeIn,       
						overtimeOut,      
						overtimeBreakDuration, 
						overtimeID,      
						overtimeReference, 
						leaveIn,          
						leaveOut,        
						leaveID,          
						leaveReference,  
						leaveType, 
						leaveWorkingDay,
						leaveDuration,
						checkDuration,   
						basicHours,       
						overtimeHours,    
						nightDifferential, 
						totalHours,      
						status:scheduleStatus,           
					} = data;
	
					const NO_TIME_IN_OUT = `${base_url}/assets/images/attendance/no-time-in-out.svg`;
					const ABSENT  = `${base_url}/assets/images/attendance/absent.svg`;
					const ONGOING = `${base_url}/assets/images/attendance/ongoing.svg`;
	
					// DISPLAY NG LEAVE WHILE HAVING PRODUCTION
					const elementAttr = `
						scheduleDate          = "${scheduleDate}"
						scheduleIn            = "${scheduleIn}"
						scheduleOut           = "${scheduleOut}"
						scheduleBreakDuration = "${scheduleBreakDuration}"
						scheduleDuration      = "${scheduleDuration}"
						restDay				  = "${restDay}"
						finalCheckIn          = "${finalCheckIn}"
						finalCheckOut         = "${finalCheckOut}"
						checkIn               = "${checkIn}"
						checkOut              = "${checkOut}"
						noTimeIn              = "${noTimeIn}"
						noTimeOut             = "${noTimeOut}"
						noInOutID             = "${noInOutID}"
						noInOutReference      = "${noInOutReference}"
						overtimeIn            = "${overtimeIn}"
						overtimeOut           = "${overtimeOut}"
						overtimeBreakDuration = "${overtimeBreakDuration}"
						overtimeID            = "${overtimeID}"
						overtimeReference     = "${overtimeReference}"
						leaveIn               = "${leaveIn}"
						leaveOut              = "${leaveOut}"
						leaveID               = "${leaveID}"
						leaveReference        = "${leaveReference}"
						leaveType             = "${leaveType}"
						leaveWorkingDay       = "${leaveWorkingDay}"
						leaveDuration         = "${leaveDuration}"
						checkDuration         = "${checkDuration}"
						basicHours            = "${basicHours}"
						overtimeHours         = "${overtimeHours}"
						totalHours            = "${totalHours}"
						nightDifferential     = "${nightDifferential}"
						status                = "${status}"`;
	
					if (status == "COMPLETE") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}>${decimalToHours(totalHours)}</a>`;
					} else if (status == "REST_DAY" || status == "NO_SCHEDULE") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance font-weight-bold text-success"
							${elementAttr}>RD</a>`;
					} else if (status == "NO_TIME_IN" || status == "NO_TIME_OUT") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}>
							<img src="${NO_TIME_IN_OUT}" 
								class="img-rounded"
								alt="${status}"
								title="${status}"
								style="width: 40px; height: 40px;">
						</a>`;
					} else if (status == "ONGOING") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}>
							<img src="${ONGOING}" 
								class="img-rounded"
								alt="${status}"
								title="${status}"
								style="width: 40px; height: 40px;">
						</a>`;
					} else if (status == "ABSENT") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}>
							<img src="${ABSENT}" 
								class="img-rounded"
								alt="${status}"
								title="${status}"
								style="width: 30px; height: 30px;">
						</a>`;
					} else if (status == "COMPLETE_REST_DAY" || status == "COMPLETE_LEAVE") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}
							style="color: #132eca">${decimalToHours(totalHours)}</a>`;
					} else {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance"
							${elementAttr}
							style="color: #d8af32">${decimalToHours(totalHours)}</a>`;
					}
				}
				return html;
			}
	
			let attendanceHTML = "";
			attendance.map(att => {
				const { 
					employeeID, 
					code, 
					profile, 
					fullname, 
					totalBasicHours, 
					totalOvertimeHours,
					grandTotalHours,
					totalRestDay,
					totalNoDays,
					data = [], 
				} = att;
	
				let attendanceDurationHTML = "";
				columns.map(col => {
					const { date } = col;
					data.filter(dt => dt.scheduleDate == date).map(item => {
						const { status } = item;
	
						attendanceDurationHTML += `<td class="text-center">${displayData(status, item)}</td>`;
					})
				})
	
				attendanceHTML += `
				<tr employeeID="${encryptString(employeeID)}"
					fullname="${fullname}"
					code="${code}"
					workingDays="${totalNoDays}">
					<td>
						<div class="d-flex justify-content-start align-items-center">
							<img class="rounded-circle" 
								src="${base_url}assets/upload-files/profile-images/${profile}"
								alt="${fullname}"
								style="width: 50px; height: 50px;">
							<div class="ml-3 align-self-center">
								<div>
									<a href="${base_url}hris/employee_attendance?view_id=${encryptString(employeeID)}"
										target="_blank">${fullname}</a>
								</div>
								<small>${code}</small>
							</div>
						</div>
					</td>
					${attendanceDurationHTML}
					<td class="text-center">${decimalToHours(grandTotalHours)}</td>
					<td class="text-center">${decimalToHours(totalBasicHours)}</td>
					<td class="text-center">${decimalToHours(totalOvertimeHours)}</td>
					<td class="text-center">${totalRestDay}</td>
					<td class="text-center">${totalNoDays}</td>
				</tr>`;
			})
	
			let legendDisplay = `
			<div class="row" id="legend">
				<div class="col-md-5 col-sm-12">
					<div class="card">
						<div class="card-header font-weight-bold h5 bg-transparent">LEGEND</div>
						<div class="card-body p-2" style="background: rgb(242 242 242);">
							<div class="row">
								<div class="col-md-6 col-sm-12">
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #dc3450">00:00</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Regular Hours</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #132eca">00:00</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Leave/Overtime Hours</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #28a745">RD</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Rest Day</div>
									</div>
								</div>
								<div class="col-md-6 col-sm-12">
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #132eca">
											<img src="${base_url}assets/images/attendance/ongoing.svg" width="25" height="25">
										</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Ongoing</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #132eca">
											<img src="${base_url}assets/images/attendance/no-time-in-out.svg" width="25" height="25">
										</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">No Time-In/Time-Out</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #132eca">
											<img src="${base_url}assets/images/attendance/absent.svg" width="25" height="25">
										</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Absent</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`;
	
			html = `
			${legendDisplay}
			<div class="card">
				<div class="card-header bg-primary text-white text-center">
					<h6 class="font-weight-bold">${header}</h6>
				</div>
				<div class="card-body" style="font-size: .9rem;">
					<table class="table table-bordered table-striped table-nowrap" id="tableTimekeeping">
						<thead>
							<tr class="theadlabel">
								<th class="thEmployeeName">Employee Name</th>
								${columnDatesHTML}
								<th class="thSummary">Total Hours</th>
								<th class="thSummary">Basic Hours</th>
								<th class="thSummary">Overtime Hours</th>
								<th class="thSummary">Rest Day</th>
								<th class="thSummary">No. of Working Days</th>
							</tr>
						</thead>
						<tbody id="tableTimekeepingTbody">
							${attendanceHTML}
						</tbody>
					</table>
				</div>
			</div>`;
		} else {
			if (header) {
				html = `
				<div class="w-100 d-flex justify-content-center align-items-center flex-column">
					<img src="${base_url}assets/modal/no-data.gif" width="300" height="300">
					<h4>No data found</h4>
				</div>`;
			} else {
				html = `
				<div class="w-100 d-flex justify-content-center align-items-center flex-column">
					<img src="${base_url}assets/modal/please-select.gif" width="300" height="300">
					<h4>Please select cut-off</h4>
				</div>`;
			}
		}

		return html;
	}
	// ----- END TIMEKEEPING TABLE -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			timekeepingID         = "",
			timekeepingCode       = "",
			reviseTimekeepingID   = "",
			reviseTimekeepingCode = "",
			employeeID            = "",
            timekeepingStartDate  = "",
			timekeepingEndDate    = "",
			cutOff                = "",
			timekeepingReason     = "",
			timekeepingRemarks    = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			timekeepingStatus     = 0,
			submittedAt           = false,
			createdAt             = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("timekeepingID", encryptString(timekeepingID));
		$("#btnBack").attr("status", timekeepingStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let startDate = timekeepingStartDate;
		let endDate   = timekeepingEndDate;
		let timesheetDate = startDate && endDate ? `${moment(startDate).format("MMMM DD, YYYY")} - ${moment(endDate).format("MMMM DD, YYYY")}` : '-';

		let timesheetData = searchTimesheet(timekeepingID, startDate, endDate);

		let reviseDocumentNo    = isRevise ? timekeepingID : reviseTimekeepingID;
		let documentHeaderClass = isRevise || reviseTimekeepingID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseTimekeepingID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseTimekeepingID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("TMK", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let html = `
        <div class="row px-2">
            <div class="col-12 mb-2 text-right">
                <button class="btn btn-info"
                    id="btnPrint"
                    timekeepingID="${timekeepingID}"
                    timekeepingCode="${timekeepingCode}"
					startDate="${startDate}"
					endDate="${endDate}"><i class="fas fa-print"></i> PRINT</button>
            </div>
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${timekeepingID && !isRevise ? timekeepingCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${timekeepingStatus && !isRevise ? getStatusStyle(timekeepingStatus) : "---"}
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
								${getDateApproved(timekeepingStatus, approversID, approversDate)}
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
							${timekeepingRemarks && !isRevise ? timekeepingRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_timekeeping">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
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
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                        minlength="1"
                        maxlength="325"
                        id="timekeepingReason"
                        name="timekeepingReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${timekeepingReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-timekeepingReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-3">
                <div class="w-100" id="tableTimekeepingParent">
					${timekeepingTable(timesheetData, timekeepingStatus)}
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
		}, 300);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
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

			headerButton(true, "Add Timekeeping");
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


	// ----- VIEW ATTENDANCE -----
	$(document).on("click", ".viewAttendance", function() {

		$parentTR = $(this).closest("tr");
		let employeeFullname = $parentTR.attr("fullname");
		let employeeCode     = $parentTR.attr("code");

		let scheduleDate     = $(this).attr("scheduleDate");
		let scheduleIn       = $(this).attr("scheduleIn");
		let scheduleOut      = $(this).attr("scheduleOut");    
		let scheduleDuration = $(this).attr("scheduleDuration");    
		let checkIn          = $(this).attr("checkIn");    
		let checkOut         = $(this).attr("checkOut");    
		let noTimeIn         = $(this).attr("noTimeIn");    
		let noTimeOut        = $(this).attr("noTimeOut");    
		let noInOutID        = $(this).attr("noInOutID");    
		let noInOutReference = $(this).attr("noInOutReference");    
		let overtimeIn       = $(this).attr("overtimeIn");    
		let overtimeOut      = $(this).attr("overtimeOut");    
		let overtimeBreakDuration = $(this).attr("overtimeBreakDuration");    
		let overtimeID        = $(this).attr("overtimeID");    
		let overtimeReference = $(this).attr("overtimeReference");    
		let leaveIn           = $(this).attr("leaveIn");    
		let leaveOut          = $(this).attr("leaveOut");    
		let leaveID           = $(this).attr("leaveID");    
		let leaveReference    = $(this).attr("leaveReference");    
		let leaveType         = $(this).attr("leaveType");    
		let leaveDuration     = $(this).attr("leaveDuration");    
		let checkDuration     = $(this).attr("checkDuration");    
		let basicHours        = $(this).attr("basicHours");    
		let overtimeHours     = $(this).attr("overtimeHours");   
		let nightDifferential = $(this).attr("nightDifferential");    
		let totalHours        = $(this).attr("totalHours");    
		let status            = $(this).attr("status");    

		const getDateFormat = (date = null, substitute = null, id = null, reference = "", type = "") => {
			if (date && date != "null" && moment(date).isValid()) {
				if (type == "NO_TIME") {
					if (substitute && substitute != "null" && moment(substitute).isValid()) {
						let referHTML = id && reference ? `
						<small>
							<a href="${base_url}hris/no_timein_timeout?view_id=${encryptString(id)}"
								target="_blank">${reference}</a></small>` : "";
						let html = `
						<div class="d-flex justify-content-end align-items-end flex-column">
							${moment(substitute).format("MMMM DD, YYYY hh:mm A")}
							${referHTML}
						</div>`;
						
						return html;
					}
				}
				return moment(date).format("MMMM DD, YYYY hh:mm A");
			} else {
				if (type == "NO_TIME" && substitute && substitute != "null" && moment(substitute).isValid()) {
					let referHTML = id && reference ? `
					<small>
						<a href="${base_url}hris/no_timein_timeout?view_id=${encryptString(id)}"
							target="_blank">${reference}</a>
					</small>` : "";
					let html = `
					<div class="d-flex justify-content-end align-items-end flex-column">
						${moment(substitute).format("MMMM DD, YYYY hh:mm A")}
						${referHTML}
					</div>`;
					return html;
				}
			}
			return "----";
		}

		const getTimeFormat = (time = "0", substitute = null, id = null, reference = "", type = "ordinary") => {
			if (time && time != "false" && time != "null" && time != "0") {
				let html = "";
				time = decimalToHours(time);
				let arr = time.split(":");
				if (arr.length > 1) {
					let hour   = +arr[0];
					let minute = +arr[1];
					if (hour > 0 && minute > 0) {
						html = `${hour} hours and ${minute} minutes`;
					} else if (hour > 0 && minute <= 0) {
						html = `${hour} hours`;
					} else if (hour <= 0 && minute > 0) {
						html = `${minute} minutes`;
					} else {
						html = "----";
					}

					if (type == "leave") {
						let referHTML = id && reference ? `
						<small>
							<a href="${base_url}hris/leave_request?view_id=${encryptString(id)}"
								target="_blank">${reference}</a>
						</small>` : "";
						return `
						<div class="d-flex justify-content-end align-items-end flex-column">
							${html}
							${referHTML}
						</div>`;
					}
					return html;
				}
			} else {
				if (substitute && substitute != "false" && substitute != "null" && substitute != "0") {
					let hoursHTML = "";
					time = decimalToHours(substitute);
					let arr = time.split(":");

					if (arr.length > 1) {
						let hour   = +arr[0];
						let minute = +arr[1];
						if (hour > 0 && minute > 0) {
							hoursHTML = `${hour} hours and ${minute} minutes`;
						} else if (hour > 0 && minute <= 0) {
							hoursHTML = `${hour} hours`;
						} else if (hour <= 0 && minute > 0) {
							hoursHTML = `${minute} minutes`;
						} else {
							hoursHTML = "----";
						}
					}
					let link = type == "leave" ? "leave_request" : "overtime_request";

					let referHTML = id && reference ? `
					<small>
						<a href="${base_url}hris/${link}?view_id=${encryptString(id)}"
							target="_blank">${reference}</a>
					</small>` : "";
					let html = `
					<div class="d-flex justify-content-end align-items-end flex-column">
						${hoursHTML}
						${referHTML}
					</div>`;
					return html;
				}
			}
			return "----";
		}

		let scheduleTimeHTML = (scheduleIn, scheduleOut, scheduleDuration = 0) => {
			let scheduleBodyHTML = `
			<tr>
				<td colspan="2" class="text-center p-1 m-2">No Schedule</td>
			</tr>`;

			if (scheduleDuration > 0) {
				scheduleBodyHTML = `
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Time In: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						${getDateFormat(scheduleIn)}
					</td>
				</tr>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Time Out: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						${getDateFormat(scheduleOut)}
					</td>
				</tr>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Duration: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						${getTimeFormat(scheduleDuration)}
					</td>
				</tr>`;
			}

			let html = `
			<table class="table table-striped mt-2">
				<thead class="bg-primary">
					<tr><th colspan="2" class="text-center text-white py-2 bg-primary">SCHEDULE</th></tr>
				</thead>
				<tbody>
					${scheduleBodyHTML}
				</tbody>
			</table>`;
			return html;
		} 

		let scheduleDataTitle = "REGULAR DAY";
		if (status == "REST_DAY" || status == "NO_SCHEDULE" || status == "COMPLETE_REST_DAY" || status == "COMPLETE_LEAVE") {
			scheduleDataTitle = basicHours > 0 && leaveID && leaveType ? `ON ${leaveType.toUpperCase()}` : "REST DAY";
		}

		let subID        = noInOutID || leaveID;
		let subTimeIn    = noTimeIn || leaveIn;
		let subTimeOut   = noTimeOut || leaveOut;
		let subReference = noInOutReference || leaveReference;
		let subType = noInOutID ? "NO_TIME" : "LEAVE";

		
		
		let scheduleDataHTML = `
		<table class="table table-striped mt-2">
			<thead class="bg-primary">
				<tr><th colspan="2" class="text-center text-white py-2 bg-primary">${scheduleDataTitle}</th></tr>
			</thead>
			<tbody>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Time In: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						${getDateFormat(checkIn, subTimeIn, subID, subReference, subType)}
					</td>
				</tr>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Time Out: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						${getDateFormat(checkOut, subTimeOut, subID, subReference, subType)}
					</td>
				</tr>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Regular Hours: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						<div>${getTimeFormat(basicHours, leaveDuration, leaveID, leaveReference, "leave")}</div>
					</td>
				</tr>
				<tr>
					<td class="text-left text-primary  p-1 m-2 font-weight-bold">Overtime: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						<div>${getTimeFormat(false, overtimeHours, overtimeID, overtimeReference, "overtime")}</div>
					</td>
				</tr>
				<tr>
					<td class="text-left  p-1 m-2 font-weight-bold">Night Differential: </td>
					<td class="text-right p-1 m-2 " style="font-style: italic">
						<div>${totalHours > 0 ? getTimeFormat(nightDifferential) : "-----"}</div>
					</td>
				</tr>
			</tbody>
		</table>`;

		$("#modal_timekeeping_report .page-title").text("ATTENDANCE INFORMATION");
		let html = `
		<div class="row p-3">
			<div class="col-12">
				<div class="d-flex justify-content-between align-items-center mt-1 mb-2">
					<div class="d-flex align-items-start flex-column">
						<h5 class="font-weight-bold text-danger">${employeeFullname}</h5>
						<small>${employeeCode}</small>
					</div>
					<div class="align-self-end">
						<small>${moment(scheduleDate).format("dddd, Do MMMM YYYY")}</small>
					</div>
				</div>
			</div>
			<div class="col-12">
				${scheduleTimeHTML(scheduleIn, scheduleOut, scheduleDuration)}
			</div>
			<div class="col-12">
				${scheduleDataHTML}
			</div>
		</div>`;

		$("#modal_timekeeping_report_content").html(html);
		$("#modal_timekeeping_report").modal("show");
	})
	// ----- END VIEW ATTENDANCE -----


    // ----- VIEW/EDIT DOCUMENT -----
	$(document).on("click", ".btnView, .btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
	});
	// ----- END VIEW/EDIT DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("TMK", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getTimekeepingData(action, "save", "0", id);
				data["timekeepingStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["reviseTimekeepingID"] = id;
					delete data["timekeepingID"];
				} else {
					data["timekeepingID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
	
				saveTimekeeping(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);

				setTimeout(() => {
					pageContent();
		
					if (employeeID != sessionID) {
						$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
					}
				}, 10);
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getTimekeepingData(action, "save", "0", id);
			data["timekeepingStatus"] = 0;

			saveTimekeeping(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- BUTTON PRINT -----
	$(document).on('click', `#btnPrint`, function() {
		const timekeepingID   = $(this).attr("timekeepingID");
		const timekeepingCode = $(this).attr("timekeepingCode");
		const startDate       = $(this).attr("startDate");
		const endDate         = $(this).attr("endDate");

		$.ajax({
            method: "POST",
			url: `timekeeping_report/printReport`,
			data: { timekeepingID, timekeepingCode, startDate, endDate },
			success: function (data) {
				let left = ($(window).width() / 2) - (900 / 2),
					top  = ($(window).height() / 2) - (600 / 2),
					mywindow = window.open("", "PRINT", "width=900, height=600, top=" + top + ", left=" + left);

				mywindow.document.write(data);

				mywindow.document.close();
				mywindow.focus();
			}
		});
	})
	// ----- END BUTTON PRINT -----


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
})






