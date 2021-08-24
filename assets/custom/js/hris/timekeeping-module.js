$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(109);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("timekeeping module");
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


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"hris_timekeeping_tbl", 
				"reviseTimekeepingID", 
				"reviseTimekeepingID IS NOT NULL AND timekeepingStatus != 4");
			return revisedDocumentsID.map(item => item.reviseTimekeepingID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


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
					const isAllowed = isCreateAllowed(49);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/timekeeping_module?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/timekeeping_module?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/timekeeping_module?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/timekeeping_module`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	function decimalToHours(decimal = 0.00) {
        if (decimal) {
            return moment().startOf('day').add(decimal, 'hours').format('HH:mm');
        }
        return "00:00";
    }
	// END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableTimekeeping")) {
			$("#tableTimekeeping").DataTable().destroy();
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
					{ targets: 2,  width: 300 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 300 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 200 }, 	
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
					{ targets: 2,  width: 300 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 300 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 200 }, 	
				],
			});

        var table = $("#tableTimekeeping")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				// autoWidth: false,
				bSort: false, 
				lengthMenu: [
					[50, 100, 150, 200, -1   ],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [
					{ targets: 0,  width: "250px" },
					{ targets: "thDay", width: "10px" },
					{ targets: -1,  width: "100px" },	
					{ targets: -2,  width: "100px" },	
					{ targets: -3,  width: "100px" },	
					{ targets: -4,  width: "100px" },	
					{ targets: -5,  width: "100px" },	
				],
			});

	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_timekeeping_tbl", "approversID")) {
				let count = getCountForApproval("hris_timekeeping_tbl", "timekeepingStatus");
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
			if (isCreateAllowed(109)) {
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
		let timekeepingData = getTableData(
			`hris_timekeeping_tbl AS htt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			"htt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, htt.createdAt AS dateCreated",
			`htt.employeeID <> ${sessionID} AND timekeepingStatus <> 0 AND timekeepingStatus <> 4`,
			`FIELD(timekeepingStatus, 0, 1, 3, 2, 4, 5), COALESCE(htt.submittedAt, htt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Timekeeping Date</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
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
                timekeepingStartDate = moment(timekeepingStartDate).format("MMMM DD, YYYY");
                timekeepingEndDate  = moment(timekeepingEndDate).format("MMMM DD, YYYY");
                timekeepingDate = `${timekeepingStartDate} - ${timekeepingEndDate}`;
            }
			let btnClass = timekeepingStatus != 0 ? "btnView" : "btnEdit";
            if (isImCurrentApprover(approversID, approversDate, timekeepingStatus) || isAlreadyApproved(approversID, approversDate)) {
                html += `
                <tr class="${btnClass}" id="${encryptString(timekeepingID )}">
                    <td>${getFormCode("TK", createdAt, timekeepingID )}</td>
                    <td>${fullname}</td>
                    <td>${timekeepingDate}</td>
                    <td>
                        ${employeeFullname(getCurrentApprover(approversID, approversDate, timekeepingStatus, true))}
                    </td>
                    <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                    <td class="text-center">
                        ${getStatusStyle(timekeepingStatus)}
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
		let timekeepingData = getTableData(
			`hris_timekeeping_tbl AS htt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"htt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, htt.createdAt AS dateCreated",
			`htt.employeeID = ${sessionID}`,
			`FIELD(timekeepingStatus, 0, 1, 3, 2, 4, 5), COALESCE(htt.submittedAt, htt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Timekeeping Date</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
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
                timekeepingStartDate = moment(timekeepingStartDate).format("MMMM DD, YYYY");
                timekeepingEndDate  = moment(timekeepingEndDate).format("MMMM DD, YYYY");
                timekeepingDate = `${timekeepingStartDate} - ${timekeepingEndDate}`;
            }
			let btnClass = timekeepingStatus != 0 ? "btnView" : "btnEdit";

			html += `
			<tr class="${btnClass}" id="${encryptString(timekeepingID )}">
                <td>${getFormCode("TK", createdAt, timekeepingID )}</td>
                <td>${fullname}</td>
                <td>${timekeepingDate}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, timekeepingStatus, true))}
                </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(timekeepingStatus)}
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
				employeeID               = "",
				approversID              = "",
				approversDate            = "",
				createdAt                = new Date
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
						code="${getFormCode("TK", createdAt, timekeepingID)}"
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
							code="${getFormCode("TK", createdAt, timekeepingID)}"
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
							code="${getFormCode("TK", createdAt, timekeepingID)}"
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
							code="${getFormCode("TK", createdAt, timekeepingID)}"
							status="${timekeepingStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (timekeepingStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						timekeepingID="${encryptString(timekeepingID)}"
						code="${getFormCode("TK", createdAt, timekeepingID)}"
						status="${timekeepingStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (timekeepingStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(timekeepingID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TK", createdAt, timekeepingID)}"
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
							code="${getFormCode("TK", createdAt, timekeepingID)}"
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
							code="${getFormCode("TK", createdAt, timekeepingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							timekeepingID="${encryptString(timekeepingID)}"
							code="${getFormCode("TK", createdAt, timekeepingID)}"><i class="fas fa-ban"></i> 
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


    // ----- DATERANGEPICKER -----
    function dateRangePicker() {
        const options = {
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
			opens: "center",
            locale: {
                format: "MMMM DD, YYYY",
            },
            startDate: moment(),
            endDate:   moment(),
			maxDate:   moment(),
        }
        $("#timesheetDate").daterangepicker(options, function(start, end) {
            let startDate = start.format("YYYY-MM-DD");
            let endDate   = end.format("YYYY-MM-DD");
            let dateDisplay = `${start.format("MMMM DD, YYYY")} - ${end.format("MMMM DD, YYYY")}`
            $("#timesheetDate").attr("start", startDate);
            $("#timesheetDate").attr("end", endDate);
            $("#btnSearch").attr("start", startDate);
            $("#btnSearch").attr("end", endDate);
            $("#timesheetDate").val(dateDisplay);
        });
    }
    // ----- END DATERANGEPICKER -----


	// ----- SEARCH TIMESHEET -----
	function searchTimesheet(timekeepingID = 0, startDate = "", endDate = "") {
		let result = [];
		if (startDate && endDate) {
			$.ajax({
				method: "POST",
				url: "timekeeping_module/searchTimesheet",
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
	function timekeepingTable(data = false) {

		let {
			header     = "",
			columns    = [],
			attendance = []
		} = data;

		let columnDatesHTML = "";
		columns.map(col => {
			const { day, date, number } = col;
			columnDatesHTML += `
			<th class="thDay text-center">
				<div>${number}</div>
				<small>${day}</small>
			</th>`;
		});

		let attendanceHTML = "";
		attendance.map(att => {
			const { 
				basicHours, 
				data = [], 
				employeeID, 
				code, 
				fullname, 
				profile, 
				totalHours 
			} = att;

			let attendanceDurationHTML = "";
			columns.map(col => {
				const { date } = col;

				data.filter(dt => dt.date == date).map(item => {
					const { attendanceID, hours } = item;
					attendanceDurationHTML += `
					<td class="text-center">${decimalToHours(hours)}</td>`;
				})
			})

			attendanceHTML += `
			<tr employeeID="${employeeID}">
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
				<td class="text-center">${decimalToHours(totalHours)}</td>
				<td class="text-center">${decimalToHours(basicHours)}</td>
				<td class="text-center">-</td>
				<td class="text-center">-</td>
				<td class="text-center">-</td>
			</tr>`;
		})

		let html = `
		<table class="table table-bordered table-striped table-nowrap" id="tableTimekeeping">
			<thead>
				<tr class="theadheader bg-primary text-white">
					<th colspan="${columns.length + 6}" class="text-center text-uppercase">${header}</th>
				</tr>
				<tr class="theadlabel">
					<th class="thEmployeeName">Employee Name</th>
					${columnDatesHTML}
					<th class="thSummary">Total Hours</th>
					<th class="thSummary">Basic Hours</th>
					<th class="thSummary">Overtime Hours</th>
					<th class="thSummary">Rest Day</th>
					<th class="thSummary">No. of Days</th>
				</tr>
			</thead>
			<tbody>
				${attendanceHTML}
			</tbody>
		</table>`;
		return html;
	}
	// ----- END TIMEKEEPING TABLE -----


	// ----- FILTER DISPLAY -----
	function filterDisplay(startDate, endDate, timesheetDate) {
		let html = `
		<div class="col-12">
				<div class="panel-group mt-2 mb-4">
					<div class="panel panel-primary">
						<div class="panel-heading">
							<h4 class="panel-title p-3 font-weight-bold" data-toggle="collapse" data-target="#panelBody" style="cursor: pointer;">UPLOAD TIMESHEET</h4>
						</div>
						<div id="panelBody" class="panel-collapse collapse">
							<div class="panel-body" style="background-color: rgb(52 58 64 / 83%);">
								<div class="row">
									<div class="col-md-3 col-sm-12 align-self-center text-right">
										<i><a href="${base_url}assets/format/TimesheetFormat.csv"
											class="text-white border-bottom pb-1"
											target="_blank">
											TimesheetFormat.csv
										</a></i>
									</div>
									<div class="col-md-6 col-sm-12 px-0">
										<div class="custom-file">
											<input type="file" class="custom-file-input" name="timesheetFile" id="timesheetFile">
											<label class="custom-file-label">Choose csv file...</label>
										</div>
									</div>
									<div class="col-md-3 col-sm-12">
										<button
											name="uploadTimesheet" id="uploadTimesheet" 
											class="btn btn-info">
											<i class="fa fa-upload"></i> Upload Timekeeping
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

            <div class="col-md-12 col-sm-12">
				<div class="row">
					<div class="col-md-9 col-sm-12">
						<div class="form-group">
							<label>Date Range: <code>*</code></label>
							<input type="button"
								name="timesheetDate"
								id="timesheetDate"
								class="form-control"
								start="${startDate}"
								end="${endDate}"
								value="${timesheetDate}">
						</div>
					</div>
					<div class="col-md-3 col-sm-12 text-left align-self-end">
						<div class="form-group">
							<button class="btn btn-primary w-100 py-2"
								id="btnSearch"
								start="${startDate}"
								end="${endDate}"><i class="fas fa-search"></i> Search</button>
						</div>
					</div>
				</div>
            </div>`;
			return html;
	}
	// ----- END FILTER DISPLAY -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			timekeepingID        = "",
			reviseTimekeepingID  = "",
			employeeID           = "",
            timekeepingStartDate = "",
			timekeepingEndDate   = "",
			timekeepingReason    = "",
			timekeepingRemarks   = "",
			approversID          = "",
			approversStatus      = "",
			approversDate        = "",
			timekeepingStatus    = 0,
			submittedAt          = false,
			createdAt            = false,
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

		let startDate = timekeepingStartDate || moment().format("YYYY-MM-DD");
		let endDate   = timekeepingEndDate || moment().format("YYYY-MM-DD");
		let timesheetDate = `${moment(startDate).format("MMMM DD, YYYY")} - ${moment(endDate).format("MMMM DD, YYYY")}`;

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
						${getFormCode("TK", createdAt, reviseDocumentNo)}
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
							${timekeepingID && !isRevise ? getFormCode("TK", createdAt, timekeepingID) : "---"}
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
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="timekeepingReason"
                        name="timekeepingReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${timekeepingReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-timekeepingReason"></div>
                </div>
            </div>

			<div class="col-12 row" id="filterDisplay">
				${timekeepingStatus == 0 ? filterDisplay(startDate, endDate, timesheetDate) : ""}
			</div>

			

            <div class="col-sm-12 mt-3">
                <div class="table-responsive" id="tableTimekeepingParent">
					${timekeepingTable(timesheetData)}
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
            dateRangePicker();

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


	// ----- GET TIMEKEEPING DATA -----
	function getTimekeepingData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

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

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["timekeepingID"] = id;

			if (status != "2") {
				data["timekeepingStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"] = sessionID;
			data["timekeepingReason"] = $("[name=timekeepingReason]").val()?.trim();

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["timekeepingID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"] = approversID;
					data["timekeepingStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["timekeepingStatus"] = 2;
				}
			}
		} 

		

		return data;
	}
	// ----- END GET TIMEKEEPING DATA -----


	// ----- SEARCH TIMESHEET BY DATA RANGE -----
	$(document).on("click", "#btnSearch", function() {
		const startDate = $(`[name="timesheetDate"]`).attr("start");
		const endDate   = $(`[name="timesheetDate"]`).attr("end");
		$("#tableTimekeepingParent").html(preloader);
		const data = searchTimesheet(0, startDate, endDate);
		setTimeout(() => {
			const html = timekeepingTable(data);
			$("#tableTimekeepingParent").html(html);
			initDataTables();
		}, 200);
	})
	// ----- END SEARCH TIMESHEET BY DATA RANGE -----


	// ----- UPLOAD CSV FILE -----
	function uploadTimesheet() {
		$files = $(`[name="timesheetFile"]`);
		if ($files.val()) {
			formButtonHTML(`[name="uploadTimesheet"]`, true);
			let formData = new FormData;
			formData.append("files", $files[0].files[0]);
			$.ajax({
				method: "POST",
				url: "timekeeping_module/uploadTimesheet",
				data: formData,
				processData: false,
				contentType: false,
				global:      false,
				cache:       false,
				async:       false,
				dataType:    "json",
				success: function(data) {
					console.log(data);
				}
			}).done(function() {
				setTimeout(() => {
					formButtonHTML(`[name="uploadTimesheet"]`, false);
				}, 200);
			})
		}
	}

	$(document).on("click", `[name="uploadTimesheet"]`, function() {
		const timesheetFile = $(`[name="timesheetFile"]`).val();
		if (timesheetFile) {
			Swal.fire({
				title:              "UPLOAD TIMESHEET",
				html:               `Are you sure you want to upload this timesheet?<br><br><div><b class="text-danger">Note:</b> This action will override the system generated timesheet</div>`,
				imageUrl:           `${base_url}assets/modal/update.svg`,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes"
			}).then(res => {
				if (res.isConfirmed) {
					uploadTimesheet(this);
				}
			})
		} else {
			showNotification("danger", "Please choose csv file first!");
		}
	})
	// ----- UPLOAD CSV FILE -----


	// ----- SELECT CSV FILE -----
	$(document).on("change", `[name="timesheetFile"]`, function() {
		if (this.files && this.files[0]) {
			const filename = this.files[0].name;
			const extension = filename.split(".")[1];
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            if (filesize > 10) {
                $(this).val("");
				$(".custom-file-label").text("Choose csv or file...");
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (extension != "csv") {
                $(this).val("");
				$(".custom-file-label").text("Choose csv  orfile...");
                showNotification("danger", "Invalid file type");
            } else {
                $(".custom-file-label").text(filename);
            }
        }
	})
	// ----- END SELECT CSV FILE -----


    // ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


    // ----- VIEW/EDIT DOCUMENT -----
	$(document).on("click", ".btnView, .btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW/EDIT DOCUMENT -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("timekeepingID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("TK", dateToday(), id);
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
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getTimekeepingData(action, "save", "0", id);
			data["timekeepingStatus"] = 0;

			saveTimekeeping(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("TK", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getTimekeepingData(action, "save", "0", id);
		data["timekeepingStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data["reviseTimekeepingID"] = id;
				delete data["timekeepingID"];
			} else {
				data["timekeepingID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}

		saveTimekeeping(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_timekeeping");
		removeIsValid("#tableServiceRequisitionItems");

		if (validate) {
			
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getTimekeepingData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data["reviseTimekeepingID"] = id;
					delete data["timekeepingID"];
				}
			}

			let approversID   = data["approversID"], 
				approversDate = data["approversDate"];

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                49,
					notificationTitle:       "Timekeeping",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveTimekeeping(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("timekeepingID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getTimekeepingData(action, "cancelform", "4", id, status);

		saveTimekeeping(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("timekeepingID"));
		const feedback = $(this).attr("code") || getFormCode("TK", dateToday(), id);
		let tableData  = getTableData("hris_timekeeping_tbl", "", "timekeepingID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getTimekeepingData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                49,
					tableID:                 id,
					notificationTitle:       "Timekeeping",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                49,
					tableID:                 id,
					notificationTitle:       "Timekeeping",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["timekeepingStatus"] = status;

			saveTimekeeping(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("timekeepingID"));
		const feedback = $(this).attr("code") || getFormCode("TK", dateToday(), id);

		$("#modal_timekeeping_module_content").html(preloader);
		$("#modal_timekeeping_module .page-title").text("DENY TIMEKEEPING");
		$("#modal_timekeeping_module").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="timekeepingRemarks"
					name="timekeepingRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-timekeepingRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			timekeepingID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_timekeeping_module_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("timekeepingID"));
		const feedback = $(this).attr("code") || getFormCode("TK", dateToday(), id);

		const validate = validateForm("modal_timekeeping_module");
		if (validate) {
			let tableData = getTableData("hris_timekeeping_tbl", "", "timekeepingID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"]               = "update";
				data["method"]               = "deny";
				data["timekeepingID"] = id;
				data["approversStatus"]      = updateApproveStatus(approversStatus, 3);
				data["approversDate"]        = updateApproveDate(approversDate);
				data["timekeepingRemarks"] = $("[name=timekeepingRemarks]").val()?.trim();
				data["updatedBy"] = sessionID;

				let notificationData = {
					moduleID:                49,
					tableID: 				 id,
					notificationTitle:       "Timekeeping",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveTimekeeping(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("timekeepingID"));
		let data = {};
		data["timekeepingID"] = id;
		data["action"]               = "update";
		data["method"]               = "drop";
		data["updatedBy"]            = sessionID;

		saveTimekeeping(data, "drop", null, pageContent);
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
	// ----- END APPROVER STATUS --
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Timekeeping";
	let swalText, swalImg;

	$("#modal_timekeeping_module").text().length > 0 && $("#modal_timekeeping_module").modal("hide");

	switch (method) {
		case "save":
			swalTitle = `SAVE ${title.toUpperCase()}`;
			swalText  = "Are you sure to save this document?";
			swalImg   = `${base_url}assets/modal/draft.svg`;
			break;
		case "submit":
			swalTitle = `SUBMIT ${title.toUpperCase()}`;
			swalText  = "Are you sure to submit this document?";
			swalImg   = `${base_url}assets/modal/add.svg`;
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

function saveTimekeeping(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `timekeeping_module/saveTimekeeping`,
					data,
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
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("TK", dateCreated, insertedID)} dropped successfully!`;
						}	
		
						if (isSuccess == "true") {
							setTimeout(() => {
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

								$("#loader").hide();
								closeModals();
								Swal.fire({
									icon:              "success",
									title:             swalTitle,
									showConfirmButton: false,
									timer:             2000,
								});
								callback && callback();

								if (method == "approve" || method == "deny") {
									$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
								}
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
				if (res.dismiss === "cancel" && method != "submit") {
					if (method != "deny") {
						if (method != "cancelform") {
							callback && callback();
						}
					} else {
						$("#modal_timekeeping_module").text().length > 0 && $("#modal_timekeeping_module").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_timekeeping_module").text().length > 0 && $("#modal_timekeeping_module").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------