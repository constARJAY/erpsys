
let fileDangerLogs  = [];
let fileWarningLogs = [];
let fileSuccessLogs = [];

function writeToFile(messages = []) {
	let newWindow = window.open("about:blank", "", "_blank"); 
 
	let textBlock = "";
	if (messages && messages.length > 0) {
		messages.map((msg, indx) => {
			textBlock += `${(indx + 1)}. ${msg}<br>`;
		})
	}
	
	if (newWindow) { 
		newWindow.document.write(textBlock); 
	} 
}

$(document).ready(function() {

	let createdTimekeeping = [], approvedTimekeepingPeriod = [], disableDates = [];
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
					const isAllowed = isCreateAllowed(109);
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
		$("#tableForApprovalParent .loader").length == 0 && $("#tableForApprovalParent").html(preloader);

		let timekeepingData = getTableData(
			`hris_timekeeping_tbl AS htt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) `,
			"htt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, htt.createdAt AS dateCreated",
			`htt.employeeID <> ${sessionID} AND timekeepingStatus <> 0 AND timekeepingStatus <> 4`,
			`FIELD(timekeepingStatus, 0, 1, 3, 2, 4, 5), timekeepingStartDate DESC, COALESCE(htt.submittedAt, htt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Timekeeping Period</th>
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
                timekeepingEndDate   = moment(timekeepingEndDate).format("MMMM DD, YYYY");
                timekeepingDate      = `${timekeepingStartDate} - ${timekeepingEndDate}`;
            }
			let btnClass = timekeepingStatus != 0 ? "btnView" : "btnEdit";
            if (isImCurrentApprover(approversID, approversDate, timekeepingStatus) || isAlreadyApproved(approversID, approversDate)) {
                html += `
                <tr class="${btnClass}" id="${encryptString(timekeepingID )}">
                    <td>${getFormCode("TMK", createdAt, timekeepingID )}</td>
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
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		uniqueData = [];
		approvedTimekeepingPeriod = [];

		$("#tableMyFormsParent .loader").length == 0 && $("#tableMyFormsParent").html(preloader);
		let timekeepingData = getTableData(
			`hris_timekeeping_tbl AS htt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"htt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, htt.createdAt AS dateCreated",
			`htt.employeeID = ${sessionID}`,
			`FIELD(timekeepingStatus, 0, 1, 3, 2, 4, 5), timekeepingStartDate DESC, COALESCE(htt.submittedAt, htt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Timekeeping Period</th>
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
                timekeepingDate = `${moment(timekeepingStartDate).format("MMMM DD, YYYY")} - ${moment(timekeepingEndDate).format("MMMM DD, YYYY")}`;
            }
			let btnClass = timekeepingStatus != 0 ? "btnView" : "btnEdit";

			if (timekeepingStatus == 1 || timekeepingStatus == 2) {
				let timesheetDate = `${moment(timekeepingStartDate).format("MMMM DD, YYYY")} - ${moment(timekeepingEndDate).format("MMMM DD, YYYY")}`;
				let unique = {
					id: timekeepingID,
					timesheetDate,
				}
				uniqueData.push(unique);
				approvedTimekeepingPeriod.push({start: timekeepingStartDate, end: timekeepingEndDate});
			}

			html += `
			<tr class="${btnClass}" id="${encryptString(timekeepingID )}">
                <td>${getFormCode("TMK", createdAt, timekeepingID )}</td>
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


    // ----- DATERANGEPICKER -----
    function dateRangePicker(inStart = "", inEnd = "", approvedTimekeepingPeriod = []) {
		disableDates = [];
		const getDates = (start, end) => {
			let date = start;

			let dates = [date];
			if (start != end) {
				date = moment(date).add(1, 'days').format("YYYY-MM-DD");
				while (date != end) {
					!dates.includes(date) && dates.push(date);
					date = moment(date).add(1, 'days').format("YYYY-MM-DD");
				}
			}

			return dates;
		}

		approvedTimekeepingPeriod.map(period => {
			let { start, end } = period;
			
			let date = start;
			!disableDates.includes(date) && disableDates.push(date);
			while (date != end) {	
				let dateToday = moment().format("YYYY-MM-DD");
				if (date != dateToday) {
					!disableDates.includes(date) && disableDates.push(date);
				} 
				date = moment(date).add(1, 'days').format("YYYY-MM-DD");
			};
		})

        const options = {
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
			opens: "center",
            locale: {
                format: "MMMM DD, YYYY",
            },
            startDate: moment(inStart || new Date),
            endDate:   moment(inEnd || new Date),
			maxDate:   moment(),
			isInvalidDate: function(date) {
				let optionDate = moment(date).format("YYYY-MM-DD");
				return disableDates.includes(optionDate);
			},
        }

        $("#timesheetDate").daterangepicker(options, function(start, end) {
			let bStart = $("#btnSearch").attr("start");
			let bEnd   = $("#btnSearch").attr("end");

            let startDate = start.format("YYYY-MM-DD");
            let endDate   = end.format("YYYY-MM-DD");

			let tStart = new Date(startDate);
			let tEnd   = new Date(endDate);

			const isDisabledDate = (startDate, endDate) => {
				let flag = true;
				if (startDate && endDate) {
					let dates = [...getDates(startDate, endDate)];
					dates.map(date => {
						if (disableDates.includes(date)) flag = false;
					})
				}
				return flag;
			}

			let duration = (tEnd - tStart)/1000/60/60/24;
			if (duration >= 20) {
				dateRangePicker(bStart, bEnd, approvedTimekeepingPeriod);
				showNotification("danger", "Timekeeping coverage must not exceed up to 20 days.");
			} else if (duration < 10) {
				dateRangePicker(bStart, bEnd, approvedTimekeepingPeriod);
				showNotification("danger", "Timekeeping coverage must be atleast 10 days or more");
			} else if (!isDisabledDate(startDate, endDate)) {
				dateRangePicker(bStart, bEnd, approvedTimekeepingPeriod);
				showNotification("danger", "Invalid timekeeping period.");
			} else {
				let dateDisplay = `${start.format("MMMM DD, YYYY")} - ${end.format("MMMM DD, YYYY")}`;
				$("#timesheetDate").attr("start", startDate);
				$("#timesheetDate").attr("end", endDate);
				$("#timesheetDate").val(dateDisplay);
			}
        });

		if (inStart && inEnd) {
			let dateDisplay = `${moment(inStart).format("MMMM DD, YYYY")} - ${moment(inEnd).format("MMMM DD, YYYY")}`;
			$("#timesheetDate").attr("start", inStart);
            $("#timesheetDate").attr("end", inEnd);
            $("#timesheetDate").val(dateDisplay);
		}
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


	// ----- DISPLAY FILE UPLOAD NOTIFICATION -----
	function dipslayFileUploadNotification(errors = [], success = []) {
		let html = ``;

		fileDangerLogs  = [];
		fileWarningLogs = [];
		fileSuccessLogs = [];

		let countDanger  = 0;
		let countWarning = 0;
		let countSuccess = 0;

		if (errors && errors.length > 0) {
			errors.map(error => {
				let arr  = error.split("|");
				let type = arr[0];
				let msg  = arr[1];

				if (type == "danger") {
					countDanger++;
					fileDangerLogs.push(msg);
				} else {
					countWarning++;
					fileWarningLogs.push(msg);
				}
			})
		}

		if (success && success.length > 0) {
			success.map(msg => {
				countSuccess++;
				fileSuccessLogs.push(msg);
			})
		}

		if (countDanger > 0) {
			html += `
			<div class="alert alert-danger alert-dismissible fade show w-100 mb-1" role="alert">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="font-weight-bold text-danger pr-2"><i class="fas fa-times"></i> ERROR:</div>
                    <div>
                        <a href="#" type="danger" class="notif_feedback text-dark font-weight-bold">${countDanger} rows affected.</a> 
						A certain value on the following rows are either incomplete, incorrect or does not exist!
                    </div>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
		}
		if (countWarning > 0) {
			html += `
			<div class="alert alert-warning alert-dismissible fade show w-100 mb-1" role="alert">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="font-weight-bold text-warning pr-2"><i class="fas fa-exclamation"></i> NOTICE:</div>
                    <div>
                        <a href="#" type="warning" class="notif_feedback text-dark font-weight-bold">${countWarning} rows affected.</a> 
						The schedule date on the CSV file will be not reflected on the system as it is not selected on the timekeeping period.
                    </div>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
		}
		if (countSuccess > 0) {
			html += `
			<div class="alert alert-success alert-dismissible fade show w-100 mb-1" role="alert">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="font-weight-bold text-success pr-2"><i class="fas fa-check"></i> SUCCESS:</div>
                    <div>
                        <a href="#" type="success" class="notif_feedback text-dark font-weight-bold">${countSuccess} rows affected.</a> 
						A total of ${countSuccess} rows are successfully imported on the timekeeping record.
                    </div>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
		}

		let display = `<div class="mb-2 pb-2">${html}</div>`;
		return display;
	}

	$(document).on("click", ".notif_feedback", function(e) {
		e.preventDefault();
		const type = $(this).attr("type");
		if (type == "danger") {
			writeToFile(fileDangerLogs);
		} else if (type == "warning") {
			writeToFile(fileWarningLogs);
		} else if (type == "success") {
			writeToFile(fileSuccessLogs);
		}
	})
	// ----- END DISPLAY FILE UPLOAD NOTIFICATION -----


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
			let notificationDisplay = dipslayFileUploadNotification(errors, success);
	
			let columnDatesHTML = "";
			columns.map(col => {
				const { month, day, date, number } = col;
				columnDatesHTML += `
				<th class="thDay text-center">
					<small>${month}</small>
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
						dayType,
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
						nightDifferentialHours, 
						overtimeNightDifferentialHours, 
						totalHours,      
						status:scheduleStatus,           
					} = data;
	
					const NO_TIME_IN_OUT = `${base_url}/assets/images/attendance/no-time-in-out.svg`;
					const ABSENT         = `${base_url}/assets/images/attendance/absent.svg`;
					const ONGOING        = `${base_url}/assets/images/attendance/ongoing.svg`;
	
					// DISPLAY NG LEAVE WHILE HAVING PRODUCTION
					const elementAttr = `
						scheduleDate                   = "${scheduleDate}"
						scheduleIn                     = "${scheduleIn}"
						scheduleOut                    = "${scheduleOut}"
						scheduleBreakDuration          = "${scheduleBreakDuration}"
						scheduleDuration               = "${scheduleDuration}"
						dayType                        = "${dayType}"
						restDay				           = "${restDay}"
						finalCheckIn                   = "${finalCheckIn}"
						finalCheckOut                  = "${finalCheckOut}"
						checkIn                        = "${checkIn}"
						checkOut                       = "${checkOut}"
						noTimeIn                       = "${noTimeIn}"
						noTimeOut                      = "${noTimeOut}"
						noInOutID                      = "${noInOutID}"
						noInOutReference               = "${noInOutReference}"
						overtimeIn                     = "${overtimeIn}"
						overtimeOut                    = "${overtimeOut}"
						overtimeBreakDuration          = "${overtimeBreakDuration}"
						overtimeID                     = "${overtimeID}"
						overtimeReference              = "${overtimeReference}"
						leaveIn                        = "${leaveIn}"
						leaveOut                       = "${leaveOut}"
						leaveID                        = "${leaveID}"
						leaveReference                 = "${leaveReference}"
						leaveType                      = "${leaveType}"
						leaveWorkingDay                = "${leaveWorkingDay}"
						leaveDuration                  = "${leaveDuration}"
						checkDuration                  = "${checkDuration}"
						basicHours                     = "${basicHours}"
						overtimeHours                  = "${overtimeHours}"
						totalHours                     = "${totalHours}"
						nightDifferentialHours         = "${nightDifferentialHours}"
						overtimeNightDifferentialHours = "${overtimeNightDifferentialHours}"
						status                         = "${status}"`;
	
					if (status == "COMPLETE") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance text-success"
							${elementAttr}>${decimalToHours(totalHours)}</a>`;
					} else if (status == "REST_DAY" || status == "NO_SCHEDULE") {
						html = `
						<a href="javascript:void(0)"
							class="viewAttendance font-weight-bold text-dark"
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
							class="viewAttendance text-success"
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
										<div class="text-success" style="text-align: right; width: 40px;">00:00</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold =">Regular Hours</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px; color: #132eca">00:00</div>
										<div class="mx-2">-</div> 
										<div class="font-weight-bold">Leave/Overtime Hours</div>
									</div>
									<div class="d-flex justify-content-start align-items-center py-1">
										<div style="text-align: right; width: 40px;" class="text-dark">RD</div>
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
			${notificationDisplay}
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
								<th class="thSummary">Number of Working Days</th>
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


	// ----- CUT-OFF -----
	function getCutOff() {
		let result = [];
		$.ajax({
			method: "POST",
			url: `${base_url}hris/timekeeping_module/getCutOff`,
			async: false,
			dataType: 'json',
			success: function(data) {
				result = data;
			}
		})
		return result;
	}
	// ----- END CUT-OFF -----


	// ----- FILTER DISPLAY -----
	function filterDisplay(timekeepingID, startDate, endDate, payOut, timesheetDate, cutOff) {

		let firstCutOff = 0, secondCutOff = 0, thirdCutOff = 0, fourthCutOff = 0;

		let cutOffData = [];
		let cutoff = getCutOff();
		if (cutoff) {
			firstCutOff  = cutoff.firstCutOff ?? 0;
			secondCutOff = cutoff.secondCutOff ?? 0;
			thirdCutOff  = cutoff.thirdutOff ?? 0;
			fourthCutOff = cutoff.fourthutOff ?? 0;

			if (firstCutOff) {
				cutOffData.push({
					cutoffID:   1,
					cutoffName: "First Cut-Off",
					start:      cutoff.firstCutOffDateStart,
					end:        cutoff.firstCutOffDateEnd,
					deduction:  cutoff.firstCutOffDeduction ?? 0,
					payOut:     cutoff.firstCutOffPayOut,
				})
			}
			if (secondCutOff) {
				cutOffData.push({
					cutoffID:   2,
					cutoffName: "Second Cut-Off",
					start:      cutoff.secondCutOffDateStart,
					end:        cutoff.secondCutOffDateEnd,
					deduction:  cutoff.secondCutOffDeduction ?? 0,
					payOut:     cutoff.secondCutOffPayOut,
				})
			}
			if (thirdCutOff) {
				cutOffData.push({
					cutoffID:   3,
					cutoffName: "Third Cut-Off",
					start:      cutoff.thirdCutOffDateStart,
					end:        cutoff.thirdCutOffDateEnd,
					deduction:  cutoff.thirdCutOffDeduction ?? 0,
					payOut:     cutoff.thirdCutOffPayOut,
				})
			}
			if (fourthCutOff) {
				cutOffData.push({
					cutoffID:   4,
					cutoffName: "Fourth Cut-Off",
					start:      cutoff.fourthCutOffDateStart,
					end:        cutoff.fourthCutOffDateEnd,
					deduction:  cutoff.fourthCutOffDeduction ?? 0,
					payOut:     cutoff.fourthCutOffPayOut,
				})
			}
		}

		let cutoffHTML = '';
		cutOffData.map(cod => {
			let { cutoffID, cutoffName, start, end, deduction, payOut } = cod;

			cutoffHTML += `
			<option value="${cutoffID}"
				start="${start}"
				end="${end}"
				deduction="${deduction}"
				payOut="${payOut}"
				${cutoffID == cutOff ? "selected" : ""}>${cutoffName}</option>`;
		})

		let monthYear = moment(startDate || new Date).format("YYYY-MM");

		let html = `
		<div class="col-12">
				<div class="panel-group mt-2 mb-4">
					<div class="panel panel-danger">
						<div class="panel-heading">
							<h4 class="panel-title p-3 font-weight-bold" data-toggle="collapse" data-target="#panelBody" aria-expanded="true" style="cursor: pointer;">UPLOAD TIMESHEET</h4>
						</div>
						<div id="panelBody" class="panel-collapse collapse show">
							<div class="panel-body" style="background-color: #515151;">
								<div class="row">
									<div class="col-md-3 col-sm-12 align-self-center text-right">
										<i><a href="${base_url}hris/timekeeping_module/download"
											target="_blank"
											class="text-warning border-bottom pb-1"
											donwload="TimesheetFormat.csv">
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
											class="btn btn-danger">
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
				<div class="row" id="filterGenerate">
					<div class="col-md-3 col-sm-12">
						<div class="form-group">
							<label>Month & Year <code>*</code></label>
							<input type="month"
								class="form-control" 
								name="monthYear"
								id="monthYear"
								value="${monthYear}"
								required>
							<div class="d-block invalid-feedback" id="invalid-monthYear"></div>
						</div>
					</div>
					<div class="col-md-3 col-sm-12">
						<div class="form-group">
							<label>Cut-off <code>*</code></label>
							<select class="form-control select2 validate"
								id="cutoff"
								name="cutoff"
								style="width: 100%"
								required>
								<option value="" selected disabled>Select cut-off</option>
								${cutoffHTML}
							</select>
							<div class="d-block invalid-feedback" id="invalid-cutoff"></div>
						</div>
					</div>
					<div class="col-md-3 col-sm-12">
						<div class="form-group">
							<label>Timekeeping Period</label>
							<input type="text"
								name="timesheetDate"
								id="timesheetDate"
								class="form-control validate"
								start="${startDate}"
								end="${endDate}"
								payOut="${payOut}"
								value="${timesheetDate}"
								disabled>
							<div class="d-block invalid-feedback" id="invalid-timesheetDate"></div>
						</div>
					</div>
					<div class="col-md-3 col-sm-12 text-left">
						<div class="form-group">
							<label>&nbsp;</label>
							<button class="btn btn-primary w-100 py-2"
								id="btnSearch"
								timekeepingID="${timekeepingID}"
								start="${startDate}"
								end="${endDate}"
								payOut="${payOut}"><i class="fas fa-cloud-upload-alt"></i> Generate Timekeeping</button>
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

		createdTimekeeping = getTableData(
			`hris_timekeeping_tbl WHERE timekeepingStatus IN(1,2)`, 
			`timekeepingStartDate, timekeepingEndDate, CONCAT(DATE_FORMAT(timekeepingStartDate, '%M %d, %Y'), ' - ', DATE_FORMAT(timekeepingEndDate, '%M %d, %Y')) AS timesheetDate, timekeepingID`);

		let {
			timekeepingID         = "",
			timekeepingCode       = "",
			reviseTimekeepingID   = "",
			reviseTimekeepingCode = "",
			employeeID            = "",
            timekeepingStartDate  = "",
			timekeepingEndDate    = "",
			cutOff                = "",
			payOut                = "",
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

			<div class="col-12 row pr-0" id="filterDisplay">
				${timekeepingStatus == 0 || (['3','4'].includes(timekeepingStatus) && isRevise) ? filterDisplay(timekeepingID, startDate, endDate, payOut, timesheetDate, cutOff) : ""}
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
			if (timekeepingStatus == 0 || (timekeepingStatus == 4 && isRevise)) {
				dateRangePicker(startDate, endDate, approvedTimekeepingPeriod);
			}

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


		// ----- RESET SEARCH IN DATATABLE -----
		$(`[aria-controls="tableTimekeeping"]`).val("");
		$('#tableTimekeeping').DataTable().search("").draw();
		// ----- RESET SEARCH IN DATATABLE -----

		
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
			
			data["employeeID"]           = sessionID;
			data["cutOff"]               = $(`[name="cutoff"]`).val();
			data["deduction"]            = $(`[name="cutoff"] option:selected`).attr("deduction");
			data["timekeepingReason"]    = $("[name=timekeepingReason]").val()?.trim();
			data["timekeepingStartDate"] = $(`[name="timesheetDate"]`).attr("start");
			data["timekeepingEndDate"]   = $(`[name="timesheetDate"]`).attr("end");
			data["payOut"]               = $(`[name="timesheetDate"]`).attr("payOut");

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

			$("#tableTimekeeping tbody tr").each(function() {
				const employeeID  = decryptString($(this).attr("employeeID"));
				const workingDays = $(this).attr("workingDays");

				$("td a.viewAttendance", this).each(function() {
					const scheduleDate                   = $(this).attr("scheduleDate");
					const scheduleIn                     = $(this).attr("scheduleIn");
					const scheduleOut                    = $(this).attr("scheduleOut");
					const scheduleBreakDuration          = $(this).attr("scheduleBreakDuration");
					const scheduleDuration               = $(this).attr("scheduleDuration");
					const dayType                        = $(this).attr("dayType");
					const restDay                        = $(this).attr("restDay");
					const finalCheckIn                   = $(this).attr("finalCheckIn");
					const finalCheckOut                  = $(this).attr("finalCheckOut");
					const checkIn                        = $(this).attr("checkIn");
					const checkOut                       = $(this).attr("checkOut");
					const noTimeIn                       = $(this).attr("noTimeIn");
					const noTimeOut                      = $(this).attr("noTimeOut");
					const noInOutID                      = $(this).attr("noInOutID");
					const noInOutReference               = $(this).attr("noInOutReference");
					const overtimeIn                     = $(this).attr("overtimeIn");
					const overtimeOut                    = $(this).attr("overtimeOut");
					const overtimeBreakDuration          = $(this).attr("overtimeBreakDuration");
					const overtimeID                     = $(this).attr("overtimeID");
					const overtimeReference              = $(this).attr("overtimeReference");
					const leaveIn                        = $(this).attr("leaveIn");
					const leaveOut                       = $(this).attr("leaveOut");
					const leaveID                        = $(this).attr("leaveID");
					const leaveReference                 = $(this).attr("leaveReference");
					const leaveType                      = $(this).attr("leaveType");
					const leaveWorkingDay                = $(this).attr("leaveWorkingDay");
					const leaveDuration                  = $(this).attr("leaveDuration");
					const checkDuration                  = $(this).attr("checkDuration");
					const basicHours                     = $(this).attr("basicHours");
					const overtimeHours                  = $(this).attr("overtimeHours");
					const nightDifferentialHours         = $(this).attr("nightDifferentialHours");
					const overtimeNightDifferentialHours = $(this).attr("overtimeNightDifferentialHours");
					const totalHours                     = $(this).attr("totalHours");
					const status                         = $(this).attr("status");

					let temp = { 
						employeeID,
						workingDays,
						scheduleDate,    
						scheduleIn,      
						scheduleOut,     
						scheduleBreakDuration,
						scheduleDuration, 
						dayType,
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
						nightDifferentialHours, 
						overtimeNightDifferentialHours,
						totalHours,      
						status
					}

					data["items"].push(temp);
				})
			})
		} 

		

		return data;
	}
	// ----- END GET TIMEKEEPING DATA -----


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
		let nightDifferentialHours = +$(this).attr("nightDifferentialHours");    
		let overtimeNightDifferentialHours = +$(this).attr("overtimeNightDifferentialHours");    
		let totalHours        = $(this).attr("totalHours");    
		let status            = $(this).attr("status");    

		let getDateFormat = (date = null, substitute = null, id = null, reference = "", type = "") => {
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

		let getTimeFormat = (time = "0", substitute = null, id = null, reference = "", type = "ordinary") => {
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

		let totalNightDifferential = nightDifferentialHours + overtimeNightDifferentialHours;
		
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
						<div>${totalHours > 0 ? getTimeFormat(totalNightDifferential) : "----"}</div>
					</td>
				</tr>
			</tbody>
		</table>`;

		$("#modal_timekeeping_module .page-title").text("ATTENDANCE INFORMATION");
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

		$("#modal_timekeeping_module_content").html(html);
		$("#modal_timekeeping_module").modal("show");
	})
	// ----- END VIEW ATTENDANCE -----


	// ----- SEARCH TIMESHEET BY DATA RANGE -----
	$(document).on("click", "#btnSearch", function(e) {

		let validate = validateForm("filterGenerate");
		if (validate) {
			e.preventDefault();
			Swal.fire({
				title:              "GENERATE TIMEKEEPING",
				html:               `Are you sure that you want to generate timekeeping?<br><br><div><b class="text-danger">Note:</b> This action will override the current timesheet data.</div>`,
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
					const startDate = $("#btnSearch").attr("start");
					const endDate   = $("#btnSearch").attr("end");
					const payOut    = $("#btnSearch").attr("payOut");
					$(`[name="timesheetDate"]`).attr("start", startDate);
					$(`[name="timesheetDate"]`).attr("end", endDate);
					$(`[name="timesheetDate"]`).attr("payOut", payOut);
					$("#btnSearch").removeAttr("timekeepingID");
	
					$("#tableTimekeepingParent").html(preloader);
					setTimeout(() => {
						const data = searchTimesheet(0, startDate, endDate);
						const html = timekeepingTable(data);
						$("#tableTimekeepingParent").html(html);
						initDataTables();
					}, 200);
				} 
			})
		} 

	})
	// ----- END SEARCH TIMESHEET BY DATA RANGE -----


	// ----- UPLOAD CSV FILE -----
	function uploadTimesheet() {
		$files = $(`[name="timesheetFile"]`);
		if ($files.val()) {
			formButtonHTML(`[name="uploadTimesheet"]`, true);

			const startDate     = $("#btnSearch").attr("start");
			const endDate       = $("#btnSearch").attr("end");
			const timekeepingID = $("#btnSearch").attr("timekeepingID") ?? 0;

			let formData = new FormData;
			formData.append("files", $files[0].files[0]);
			formData.append("startDate", startDate);
			formData.append("endDate", endDate);
			formData.append("timekeepingID", timekeepingID);

			$("#tableTimekeepingParent").html(preloader);
			setTimeout(() => {
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
						const display = timekeepingTable(data);
						$("#tableTimekeepingParent").html(display);
						initDataTables();

						$("#timesheetFile").val("");
						$(`.custom-file-label`).text("Choose csv file...");
						formButtonHTML(`[name="uploadTimesheet"]`, false);
						showNotification("success", "Timesheet uploaded successfully!");
					},
					error: function(err) {
						const display = `
						<div class="w-100 text-center">
							<h5 class="text-danger">There's an error fetching the data.</h5>
							<p>Please try again...</p>
						</div>`;
						$("#tableTimekeepingParent").html(display);

						$("#timesheetFile").val("");
						$(`.custom-file-label`).text("Choose csv file...");
						formButtonHTML(`[name="uploadTimesheet"]`, false);
						showNotification("danger", "There is an error uploading timesheet.");
					}
				});
			}, 10);

		}
	}

	$(document).on("click", `[name="uploadTimesheet"]`, function() {
		const timesheetFile = $(`[name="timesheetFile"]`).val();
		if (timesheetFile) {
			Swal.fire({
				title:              "UPLOAD TIMESHEET",
				html:               `Are you sure that you want to upload this timesheet?<br><br><div><b class="text-danger">Note:</b> This action will override the system generated timesheet</div>`,
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
			showNotification("danger", "Kindly select a csv file first!");
		}
	})
	// ----- UPLOAD CSV FILE -----


	// ----- SELECT CSV FILE -----
	$(document).on("change", `[name="timesheetFile"]`, function() {
		if (this.files && this.files[0]) {
			const filename = this.files[0].name;
			let extension = filename.split(".");
				extension = extension[extension.length - 1];
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            if (filesize > 10) {
                $(this).val("");
				$(".custom-file-label").text("Choose csv file...");
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (extension != "csv") {
                $(this).val("");
				$(".custom-file-label").text("Choose csv file...");
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
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
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


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("TMK", dateToday(), id);
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


	// ----- SELECT CUTOFF -----
	$(document).on('change', `[name="cutoff"], [name="monthYear"]`, function() {
		let monthYear = $(`[name="monthYear"]`).val();
		let monthYearArr = monthYear.split('-');

		let cutOff       = $(`[name="cutoff"]`).val();
		let cutOffStart  = +$(`[name="cutoff"] option:selected`).attr("start");
		let cutOffEnd    = +$(`[name="cutoff"] option:selected`).attr("end");
		let cutOffPayOut = +$(`[name="cutoff"] option:selected`).attr("payOut");

		const transformDate = (num) => {
			let temp = num.toString();
			return temp.length == 1 ? `0${num}` : num;
		}

		let year   = +monthYearArr[0];
		let month  = +monthYearArr[1];

		let firstYear  = year;
		let secondYear = year;

		let firstMonth  = month;
		let secondMonth = cutOffStart > cutOffEnd ? (month == 12 ? 1 : month+1) : month;
		if (cutOff == 1) {
			if (cutOffStart > cutOffEnd) {
				firstMonth = firstMonth == 1 ? 12 : (month - 1);
				firstYear  = firstYear - 1;
			}
			secondMonth = month;
		}

		let start = `${firstYear}-${transformDate(firstMonth)}-${transformDate(cutOffStart)}`;
		let end   = `${secondYear}-${transformDate(secondMonth)}-${transformDate(cutOffEnd)}`;
		let payOut = `${year}-${transformDate(month)}-${transformDate(cutOffPayOut)}`;

		$(`[id="btnSearch"]`).attr("start", start);
		$(`[id="btnSearch"]`).attr("end", end);
		$(`[id="btnSearch"]`).attr("payOut", payOut);

		dateRangePicker(start, end);
	})
	// ----- END SELECT CUTOFF -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- UNIQUE TIMEKEEPING PERIOD -----
	function uniqueTimekeepingPeriod() {
		const timesheetDate = `${moment($("#btnSearch").attr("start")).format("MMMM DD, YYYY")} - ${moment($("#btnSearch").attr("end")).format("MMMM DD, YYYY")}`;
		const hasSome = createdTimekeeping.some(data => data.timesheetDate == timesheetDate);
		if (hasSome) {
			showNotification("danger", "Timekeeping period is already exists!");
		}
		return !hasSome;
	}
	// ----- END UNIQUE TIMEKEEPING PERIOD -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = decryptString($(this).attr("timekeepingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_timekeeping");
		const timekeepingPeriod = uniqueTimekeepingPeriod();
		const timekeepingTable  = $(`#tableTimekeepingTbody tr`).length;
		
		if (validate && timekeepingPeriod) {
			if (timekeepingTable) {
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
						moduleID:                109,
						notificationTitle:       "Timekeeping Process",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
	
				saveTimekeeping(data, "submit", notificationData, pageContent);
			} else {
				showNotification("danger", "Please select correct cut-off");
			}
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
		const feedback = $(this).attr("code") || getFormCode("TMK", dateToday(), id);
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
					moduleID:                109,
					tableID:                 id,
					notificationTitle:       "Timekeeping Process",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                109,
					tableID:                 id,
					notificationTitle:       "Timekeeping Process",
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
		const feedback = $(this).attr("code") || getFormCode("TMK", dateToday(), id);

		$("#modal_timekeeping_module_content").html(preloader);
		$("#modal_timekeeping_module .page-title").text("DENY TIMEKEEPING");
		$("#modal_timekeeping_module").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
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
		const feedback = $(this).attr("code") || getFormCode("TMK", dateToday(), id);

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
					moduleID:                109,
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
	// ----- END APPROVER STATUS -----


	// ----- CHECK TIMESHEET -----
	function hasNoPresentDay() {
		let proceed = true;
		$("#tableTimekeeping tbody tr").each(function() {
			let count = $("td a.viewAttendance", this).length;
			let temp  = 0;
			$("td a.viewAttendance", this).each(function() {
				const status = $(this).attr("status");
				if (status == "NO_SCHEDULE" || status == "ABSENT" || status == "REST_DAY") {
					temp += 1;
				}
			})
			if (count == temp) {
				proceed = false;
			}
		})
		return proceed;
	}

	function hasOngoing() {
		let proceed = true;
		$("#tableTimekeeping tbody tr").each(function() {
			let count = $("td a.viewAttendance", this).length;
			let temp  = 0;
			$("td a.viewAttendance", this).each(function() {
				const status = $(this).attr("status");
				if (status == "ONGOING") {
					temp += 1;
				}
			})
			if (count == temp) {
				proceed = false;
			}
		})
		return proceed;
	}
	// ----- END CHECK TIMESHEET -----


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
				const noPresentDay = hasNoPresentDay();
				const ongoing      = hasOngoing();
				if (noPresentDay && ongoing) {
					swalText  = "Are you sure to submit this timekeeping?";
				} else {
					if (!noPresentDay) {
						swalText = `Are you sure to submit this timekeeping?<br><br><b class="text-danger">Note: </b>There are still some employee/s that does not have a timekeeping record.`;
					} else {
						swalText = `Are you sure to submit this timekeeping?<br><br><b class="text-danger">Note: </b>There are still some employee/s that has an ongoing rendering time in the office.`;
					}
				}
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
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
			html:               swalText,
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
					$("#loader").show();

					setTimeout(() => {
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
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} submitted successfully!`;
								} else if (method == "save") {
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} saved successfully!`;
								} else if (method == "cancelform") {
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} cancelled successfully!`;
								} else if (method == "approve") {
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} approved successfully!`;
								} else if (method == "deny") {
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} denied successfully!`;
								} else if (method == "drop") {
									swalTitle = `${getFormCode("TMK", dateCreated, insertedID)} dropped successfully!`;
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
										}).then(function() {
											callback && callback();
		
											if (method == "approve" || method == "deny") {
												$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
											}
										});
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
					}, 10);					
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
})






