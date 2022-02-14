$(document).ready(function () {

	const MODULE_ID = 56;
	const allowedUpdate = isUpdateAllowed(MODULE_ID);
	const allowedShow   = isShowAllowed(MODULE_ID);
	let isForViewing = false;


	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("overtime request");
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
					"hris_overtime_request_tbl", 
					"reviseOvertimeRequestID", 
					"reviseOvertimeRequestID IS NOT NULL AND overtimeRequestStatus != 4");
				return revisedDocumentsID.map(item => item.reviseLeaveRequestID).includes(id);
			}
			return false;
		}
		// ----- END IS DOCUMENT REVISED -----

	// ----- REUSABLE FUNCTIONS -----	
	const getApproveLeave = getTableData(
		"hris_leave_request_tbl", 
		"leaveRequestDateFrom",
		`leaveRequestStatus = 2 AND employeeID = ${sessionID}`);

	const getOvertimeDateList = getTableData(
		"hris_overtime_request_tbl", 
		"overtimeRequestDate",
		`overtimeRequestStatus = 2 AND employeeID = ${sessionID}`);

	const projectList = getTableData(
		"pms_project_list_tbl AS project LEFT JOIN pms_timeline_builder_tbl AS timeline ON timeline.projectID = project.projectListID", 
		"projectListID,clientID,projectListName",
		"timelineBuilderStatus = 2");

	const clientList = getTableData(
		"pms_client_tbl", 
		"clientID,clientName",
		"clientStatus = 1");
	const employeeSchedule = getTableData(
			`hris_employee_list_tbl as helt
				LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)`,
			`IF(mondayStatus = 1, 1, 0) AS monday,
			IF(tuesdayStatus = 1, 1, 0) AS tuesday,
			IF(wednesdayStatus = 1, 1, 0) AS wednesday,
			IF(thursdayStatus = 1, 1, 0) AS thursday,
			IF(fridayStatus = 1, 1, 0) AS friday,
			IF(saturdayStatus = 1, 1, 0) AS saturday,
			IF(sundayStatus = 1, 1, 0) AS sunday,
			mondayTo,
			tuesdayTo,
			wednesdayTo,
			thursdayTo,
			fridayTo,
			saturdayTo,
			sundayTo`,
			`employeeID = ${sessionID}`
		);
		// ----- END REUSABLE FUNCTIONS -----

	// ----- UPDATE CLIENT -----
	function updateClientOptions() {
		let clientIDArr = []; // 0 IS THE DEFAULT VALUE
		let clientElementID = [];


		$("[name=overtimeRequestClientID]").each(function(i, obj) {
			clientIDArr.push($(this).val());
			clientElementID.push(`#${this.id}`);
			// $(this).val() && $(this).trigger("change");
		}) 
		

		clientElementID.map((element, index) => {
			let html = `<option selected disabled>Please select a client</option>`;
			// let tmpClientList = [clientList];
			html += clientList.filter(client => !clientIDArr.includes(client.clientID) || client.clientID == clientIDArr[index]).map(client => {
				return `
				<option 
					value        = "${client.clientID}"
					${client.clientID == clientIDArr[index] && "selected"}>
					${client.clientName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE CLIENT -----

	// ----- UPDATE PROJECT NAME -----
	function updateProjectOptions() {
		let projectIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [];
		
		$("[name=overtimeRequestProjectID]").each(function(i, obj) {
			projectIDArr.push($(this).val());
			projectElementID.push(`#${this.id}`);
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Please select a project</option>`;
			html += projectList.map(project => {
				return `
				<option 
				value        = "${project.projectListID}" 
				${project.projectListID == projectIDArr[index] && "selected"}>
				${project.projectListName}
			</option>`;
				
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE PROJECT NAME -----


	// ----- GET CLIENT LIST -----
	function getClientList(id = null, display = true) {
		let html ='';
			html = `
		<option 
			value       = "0"
			${id == "0" && "selected"}>Please select a client</option>`;
		html += clientList.map(client => {

			return `
			<option 
				value       = "${client.clientID}" 
				${client.clientID  == id && "selected"}>
				${client.clientName}
			</option>`;
		})
		return display ? html : clientList;
	}
	// ----- END GET CLIENT LIST -----

	// ---- GET PROJECT LIST ----//
	function getprojectList(id = null, display = true, clientID = null, projectName = null) {
	
		let html   = `<option value="" selected disabled>${projectName ?? "Please select a project"}</option>`;

		let projectIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=overtimeRequestProjectID]`).each(function(i, obj) {
			projectIDArr.push($(this).val());
		}) 

		
		html += projectList.map(project => {
				
			if( clientID == null){
				return `
				<option 
					value = "${project.projectListID}" 
					${project.projectListID == id && "selected"}>
					${project.projectListName}
				</option>`;
			}else{
				if(project.clientID == clientID ){
					return `
					<option 
						value = "${project.projectListID}" 
						${project.projectListID == id && "selected"}>
						${project.projectListName}
					</option>`;
				}
			}
				
			
		})
		
		return display ? html : inventoryStorageList;
	}
	// ----- END GET PROJECT LIST -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					overtimeRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (overtimeRequestStatus == 0 || overtimeRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (overtimeRequestStatus == 0) {
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
					const isAllowed = isCreateAllowed(MODULE_ID);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/overtime_request?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/overtime_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/overtime_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/overtime_request`);
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
		$('[data-toggle="tooltip"]').tooltip();

		["#tableForApproval", "#tableMyForms", "#tableForViewing"].map(element => {
			if ($.fn.DataTable.isDataTable(element)) {
				$(element).DataTable().destroy();
			}
			
			var table = $(element)
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
						{ targets: 2, width: 250 },
						{ targets: 3, width: 150 },
						{ targets: 4, width: 300 },
						{ targets: 5, width: 80  },
						{ targets: 6, width: 200 },
					],
				});
		});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_overtime_request_tbl", "approversID") || allowedShow) {
				let count = getCountForApproval("hris_overtime_request_tbl", "overtimeRequestStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = `
				<div class="bh_divider appendHeader"></div>
				<div class="row clearfix appendHeader">
					<div class="col-12">
						<ul class="nav nav-tabs">
							${allowedShow ? `<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forViewingTab" redirect="forViewingTab">For Viewing</a></li>` : ""}	
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
			if (isCreateAllowed(56)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" 
				id="btnBack"
				revise="${isRevise}" 
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- FOR VIEWING CONTENT -----
	function forViewingContent() {
		$("#tableForViewingParent").html(preloader);

		let overtimeRequestData = getTableData(
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_overtime_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND overtimeRequestStatus != 0 AND overtimeRequestStatus != 4 AND overtimeRequestStatus = 2`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_overtime_request_tbl.submittedAt, hris_overtime_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForViewing">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Reason</th>
					<th>Current Approver</th>
					<th>Date</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		overtimeRequestData.map((schedule) => {
			let {
				fullname,
				overtimeRequestID,
				approversID,
				approversDate,
				overtimeRequestDate,
				overtimeRequestReason,
				overtimeRequestStatus,
				overtimeRequestRemarks,
				submittedAt,
				createdAt,
			} = schedule;

			let remarks       = overtimeRequestRemarks ? overtimeRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = overtimeRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			html += `
			<tr class="btnView btnEdit" id="${encryptString(overtimeRequestID)}" isForViewing="true">
				<td>${getFormCode("OTR", dateCreated, overtimeRequestID)}</td>
				<td>${fullname}</td>
				<td>
					<div>${moment(overtimeRequestDate).isValid() ? moment(overtimeRequestDate).format("MMMM DD, YYYY") : "-"}</div>
					<small>${overtimeRequestReason || ""}</small>
				</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, overtimeRequestStatus, true))}
				</td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
				<td class="text-center">
					${getStatusStyle(overtimeRequestStatus)}
				</td>
				<td>${remarks}</td>
			</tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForViewingParent").html(html);
			initDataTables();
		}, 300);
	}
	// ----- END FOR VIEWING CONTENT -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);

		let overtimeRequestData = getTableData(
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_overtime_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND overtimeRequestStatus != 0 AND overtimeRequestStatus != 4`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_overtime_request_tbl.submittedAt, hris_overtime_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Reason</th>
					<th>Current Approver</th>
					<th>Date</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		overtimeRequestData.map((schedule) => {
			let {
				fullname,
				overtimeRequestID,
				approversID,
				approversDate,
				overtimeRequestDate,
				overtimeRequestReason,
				overtimeRequestStatus,
				overtimeRequestRemarks,
				submittedAt,
				createdAt,
			} = schedule;

			let remarks       = overtimeRequestRemarks ? overtimeRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = overtimeRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${encryptString(overtimeRequestID)}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(approversID, approversDate, overtimeRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView btnEdit" id="${encryptString(overtimeRequestID)}">
					<td>${getFormCode("OTR", dateCreated, overtimeRequestID)}</td>
					<td>${fullname}</td>
					<td>
						<div>${moment(overtimeRequestDate).isValid() ? moment(overtimeRequestDate).format("MMMM DD, YYYY") : "-"}</div>
						<small>${overtimeRequestReason || ""}</small>
					</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, overtimeRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(overtimeRequestStatus)}
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
		$("#tableMyFormsParent").html(preloader);
		let overtimeRequestData = getTableData(
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_overtime_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_overtime_request_tbl.createdAt AS dateCreated",
			`hris_overtime_request_tbl.employeeID = ${sessionID}`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_overtime_request_tbl.submittedAt, hris_overtime_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Reason</th>
                    <th>Current Approver</th>
					<th>Date</th>
                    <th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		overtimeRequestData.map((item) => {
			let {
				fullname,
				overtimeRequestID,
				approversID,
				approversDate,
				overtimeRequestDate,
				overtimeRequestReason,
				overtimeRequestStatus,
				overtimeRequestRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = overtimeRequestRemarks ? overtimeRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = overtimeRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				id:                 overtimeRequestID,
				overtimeRequestDate: moment(overtimeRequestDate).format("MMMM DD, YYYY"),
			};
			(overtimeRequestStatus == 1 || overtimeRequestStatus == 2) && uniqueData.push(unique);

			let button =
				overtimeRequestStatus != 0
					? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(overtimeRequestID)}"><i class="fas fa-eye"></i> View</button>`
					: `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(overtimeRequestID)}" 
                code="${getFormCode("OTR", dateCreated, overtimeRequestID)}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr class="btnEdit btnView" id="${encryptString(overtimeRequestID)}">
                <td>${getFormCode("OTR", dateCreated, overtimeRequestID)}</td>
                <td>${fullname}</td>
				<td>
					<div>${moment(overtimeRequestDate).isValid() ? moment(overtimeRequestDate).format("MMMM DD, YYYY") : "-"}</div>
					<small>${overtimeRequestReason || ""}</small>
				</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, overtimeRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(overtimeRequestStatus)}
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

	// ---- EVENT FOR CLIENT OPTION -----//
	$(document).on("change",`[name="overtimeRequestClientID"]`,function(){
		var clientID = $('option:selected', this).val();
		$(`[name=overtimeRequestClientID]`).each(function(i, obj) {
			let clientD = $(this).val();
			$(this).html(getClientList(clientD));
		}) 

		
        $(`[name=overtimeRequestProjectID]`).each(function(i, obj) {
			let projectID = $(this).val();
			$(this).html(getprojectList(projectID,true,clientID));
		}) 
	
	})


	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				overtimeRequestID     = "",
				overtimeRequestStatus = "",
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

				if (overtimeRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 py-2" 
						id="btnSubmit" 
						overtimeRequestID="${encryptString(overtimeRequestID)}"
						code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (overtimeRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
							status="${overtimeRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (overtimeRequestStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	overtimeRequestID="${encryptString(overtimeRequestID)}"
					// 	code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
					// 	status="${overtimeRequestStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (overtimeRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(overtimeRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
							status="${overtimeRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (overtimeRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(overtimeRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"
							status="${overtimeRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (overtimeRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 py-2" 
							id="btnApprove" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 py-2"
							id="btnReject" 
							overtimeRequestID="${encryptString(overtimeRequestID)}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"><i class="fas fa-ban"></i> 
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
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);

		readOnly = isRevise ? false : readOnly;

		let {
			overtimeRequestID            = "",
			reviseOvertimeRequestID      = "",
			employeeID                   = "",
			overtimeRequestDate          = "",
			overtimeRequestTimeIn        = "",
			overtimeRequestTimeOut       = "",
			overtimeRequestBreak	     ="",
			overtimeRequestReason        = "",
			overtimeRequestRemarks       = "",
			approversID                  = "",
			approversStatus              = "",
			approversDate                = "",
			overtimeRequestStatus        = false,
			submittedAt                  = false,
			createdAt                    = false,
			overtimeRequestLocation      = "",
			overtimeRequestClass	     = "",
			overtimeRequestClientID	     = "",
			overtimeRequestProjectID     = "",
			overtimeRequestProjectName   = "",
			overtimeRequestProjectStatus = ""

		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("overtimeRequestID", overtimeRequestID ? encryptString(overtimeRequestID) : "");
		$("#btnBack").attr("code", getFormCode("OTR", moment(createdAt), overtimeRequestID));
		$("#btnBack").attr("status", overtimeRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? overtimeRequestID : reviseOvertimeRequestID;
		let documentHeaderClass = isRevise || reviseOvertimeRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseOvertimeRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseOvertimeRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("OTR", createdAt, reviseDocumentNo)}
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
						${overtimeRequestID && !isRevise ? getFormCode("OTR", createdAt, overtimeRequestID) : "---"}
					</h6>      
				</div>
			</div>
		</div>
		<div class="${documentHeaderClass}">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Status</small>
					<h6 class="mt-0 font-weight-bold">
						${overtimeRequestStatus && !isRevise ? getStatusStyle(overtimeRequestStatus) : "---"}
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
							${getDateApproved(overtimeRequestStatus, approversID, approversDate)}
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
						${overtimeRequestRemarks ? overtimeRequestRemarks : "---"}
					</h6>      
				</div>
			</div>
		</div>
	</div>

    

        <div class="row" id="form_overtime_request">
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
                        id="overtimeRequestDate"
                        name="overtimeRequestDate"
						condition ="false"
                        value="${moment(moment(overtimeRequestDate).isValid() ? overtimeRequestDate : new Date).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${overtimeRequestID}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestDate"></div>
                </div>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="time" 
                        class="form-control timeIn" 
						condition ="false"
                        id="overtimeRequestTimeIn" 
                        name="overtimeRequestTimeIn" 
                        required
                        value="${overtimeRequestTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestTimeIn"></div>
                </div>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="time" 
                        class="form-control timeOut" 
                        id="overtimeRequestTimeOut" 
                        name="overtimeRequestTimeOut" 
                        required
                        value="${overtimeRequestTimeOut}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestTimeOut"></div>
                </div>
            </div>
            <div class="col-md-1 col-sm-12">
                <div class="form-group">
                    <label>
						Duration <i class="fal fa-info-circle" 
						style="color:#007bff;" 
						data-toggle="tooltip" 
						title="Overtime must be whole number" 
						data-original-title="Overtime must be whole number"></i>
					</label>
                    <input type="text" 
						class="form-control text-center"
						name="duration"
						value="0"
						disabled>
                </div>
            </div>

			<div class="col-md-1 col-sm-12">
                <div class="form-group">
                    <label>Break</label>
                    <input type="text" 
                        class="form-control input-hours text-center" 
                        id="overtimeRequestBreak" 
                        name="overtimeRequestBreak" 
						min="0"
                        value="${formatAmount(overtimeRequestBreak || 0)}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestBreak"></div>
                </div>
            </div>

			<div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Category ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2" name="overtimeRequestClass" id="overtimeRequestClass"  required ${disabled} style="width:100%;">
						<option disabled selected>Please select a category</option>
						<option value="Billable" ${overtimeRequestClass == "Billable" ? "selected" : ""}>
							Billable
						</option>
						<option value="Non-Billable" ${overtimeRequestClass == "Non-Billable" ? "selected" : ""}>
							Non-billable
						</option>
						<option value="Pro-Bono" ${overtimeRequestClass == "Pro-Bono" ? "selected" : ""}>
							Pro-bono
						</option>
					</select>

                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestClass"></div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Location ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control validate" 
                        id="overtimeRequestLocation" 
                        name="overtimeRequestLocation" 
						data-allowcharacters="[a-z][A-Z][0-9][-][(][)][ ][,][.][&][!]"
						minlength="1"
						maxlength="99"
                        required
                        value="${overtimeRequestLocation}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestLocation"></div>
                </div>
            </div>


			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2" name="overtimeRequestClientID" id="overtimeRequestClientID" ${disabled} required style="width:100%;">
						${getClientList(overtimeRequestClientID)}
					</select>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestClientID"></div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project</label>
					<select class="form-control validate select2" name="overtimeRequestProjectID" id="overtimeRequestProjectID" ${disabled} style="width:100%;">
						${getprojectList(overtimeRequestProjectID, true, overtimeRequestClientID)}
					</select>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestProjectID"></div>
                </div>
            </div>

			

            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>
						Reason ${!disabled ? "<code>*</code> <small class=''><span class='text-warning'>Note: </span><span>Kindly specify the work done once \"Internal\" is selected as a client.</span></small>" : ""}
					</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="1000"
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
			${disabled ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			updateClientOptions();
			!disabled && updateProjectOptions();
			updateDuration();
			
			if (data) {
				initInputmaskTime(false);
				disabled != "disabled" ? overtimeRequestDateRange(overtimeRequestDate) : "";
			} else {
				initInputmaskTime();
				disabled != "disabled" ? overtimeRequestDateRange(moment()) : "";
			}

			(!overtimeRequestID || overtimeRequestDate == "0000-00-00") && $("#overtimeRequestDate").val("");
			
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

	function overtimeRequestDateRange(overtimeRequestDate){
		overtimeRequestDate = moment(overtimeRequestDate).isValid() ? overtimeRequestDate : moment();
		
		$('#overtimeRequestDate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoApply: true,
			minDate:moment().subtract(10, 'days'),
			startDate:moment(overtimeRequestDate),
			endDate:moment(overtimeRequestDate),
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
				
				if (listDate.includes(date.format('YYYY-MM-DD')) && date.format('YYYY-MM-DD') != overtimeRequestDate) {
					return true; 
				}
				
			},
			locale: {
				format: 'MMMM DD, YYYY'
			  },
		});
	}


	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		if (!isForm) {
			preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forViewingTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForViewingParent">
                    </div>
                </div>
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

			headerButton(true, "Add Overtime Request");
			headerTabContent();
			// forApprovalContent();
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

	// VALIDATE OVERTIME DATE//
	function validateTimeInOvertime(){

		let getOvertimeDate = $("#overtimeRequestDate").val();
		let dayNow = moment(getOvertimeDate).format('dddd');
		let getThisTime = $("#overtimeRequestTimeIn").val();
		let getSchedTimeOut = getDateScheduled(dayNow) || "00:00";

		let formatgetSchedTimeOut = "00:00";
		if(getSchedTimeOut){
			formatgetSchedTimeOut = getSchedTimeOut.slice(0,-3);
		}
		


		if(formatgetSchedTimeOut <= getThisTime){
			$("#overtimeRequestTimeIn").removeClass("is-invalid");
			$("#invalid-overtimeRequestTimeIn").text("");
			return true;
		}else{
			$("#overtimeRequestTimeIn").addClass("is-invalid");
			$("#invalid-overtimeRequestTimeIn").text("must be above on the employee schdeduled(day)");
			return false;
		}
		
	}

	function getDateScheduled(dayNow = "")
	{
		let lowercaseDay = dayNow.toLowerCase();
		let timeOutLabel = lowercaseDay+"To";
		let dayStatus = employeeSchedule[0][lowercaseDay];
		let dayTimeOut = employeeSchedule[0][timeOutLabel];
		if(dayStatus == 1){
		
			return dayTimeOut;
		}else{
			dayTimeOut = "00:00:00";
		
			return dayTimeOut;
		}
	}

	// CHECK SCHEDULE OF EMPLOYEE IN THIS DOCUMENT//
	$(document).on("change",'#overtimeRequestDate, #overtimeRequestTimeIn',function(){

		let condition = $(this).attr("condition") || false;
		if(condition == "true"){
			validateTimeInOvertime();
		}else{
			$("#overtimeRequestDate").attr("condition","true");
			$("#overtimeRequestTimeIn").attr("condition","true");
		}
	});


	function updateDuration() {
		let duration = 0;
		let timeIn  = $("#overtimeRequestTimeIn").val();
		let timeOut = $("#overtimeRequestTimeOut").val();
		if (timeIn && timeOut) {
			duration = +moment.duration(moment("2021-01-01 "+timeOut).diff(moment("2021-01-01 "+timeIn))).asHours();
		}
		$(`[name="overtimeRequestBreak"]`).attr("max", duration);
		$(`[name="duration"]`).val(duration);
	}


	$(document).on("focusout", `#overtimeRequestTimeIn, #overtimeRequestTimeOut`, function() {
		let time    = $(this).val();
		let arr     = time?.split(":");
		let hours   = +arr[0];
			hours   = `${hours}`.length == 1 ? `0${hours}` : hours;
		let minutes = '00';
		time = `${hours}:${minutes}`;
		$(this).val(time).trigger("change");

		updateDuration();
	})


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
			const fromValue = $("#overtimeRequestTimeIn").val() + ":00";
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
		let data = getFormData("form_overtime_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[overtimeRequestStatus]"] = status;
			data["tableData[updatedBy]"]            = sessionID;
			data["tableData[overtimeRequestBreak]"] = $(`[name="overtimeRequestBreak"]`).val()?.replaceAll(",", "");
			data["feedback"]                        = feedback;
			data["method"]                          = method;
			data["tableName"]                       = "hris_overtime_request_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"]         = sessionID;
				data["tableData[createdBy]"]          = sessionID;
				data["tableData[createdAt]"]          = dateToday();
				data["tableData[overtimeRequestClientName]"]  = $("#overtimeRequestClientID option:selected").text()?.trim() || "";
				data["tableData[overtimeRequestProjectName]"]  = $("#overtimeRequestProjectID option:selected").text()?.trim() || "";

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]          = sessionID;
					data["tableData[approversStatus]"]      = 2;
					data["tableData[approversDate]"]        = dateToday();
					data["tableData[overtimeRequestStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]          = sessionID;
						data["tableData[approversStatus]"]      = 2;
						data["tableData[approversDate]"]        = dateToday();
						data["tableData[overtimeRequestStatus]"] = 2;
					}
				}
				data["whereFilter"] = "overtimeRequestID=" + id;
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
		const id         = decryptString($(this).attr("overtimeRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {

			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getData(action, 0, "save", feedback, id);
				data["overtimeRequestStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["reviseOvertimeRequestID"] = id;
					data[`feedback`] = getFormCode("OTR", new Date);
					delete data["overtimeRequestID"];
				} else {
					delete data["action"];
					data["overtimeRequestID"] = id;
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
					$("[redirect=forApprovalTab]").length && (isForViewing ? $("[redirect=forViewingTab]").trigger("click") : $("[redirect=forApprovalTab]").trigger("click"));
				}
			}
		} else {
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 0, "save", feedback, id);
			data["overtimeRequestStatus"] = 0;

			setTimeout(() => {
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
			}, 300);
		}
	});
	// ----- END CLOSE FORM -----

	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("overtimeRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		// const tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID=" + id);
		// pageContent(true, tableData);
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		isForViewing = $(this).attr("isForViewing") == "true";
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
		// const validate     = validateForm("form_overtime_request");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {
		// 	const action   = "insert"; 
		// 	const feedback = getFormCode("OTR", dateToday()); // OTR-20-00000

		// 	const data = getData(action, 0, "save", feedback);

		// 	formConfirmation(
		// 		"save",
		// 		"insert",
		// 		"OVERTIME REQUEST",
		// 		"",
		// 		"form_overtime_request",
		// 		data,
		// 		true,
		// 		myFormsContent
		// 	);
		// }

		const action   = "insert"; 
		const feedback = getFormCode("OTR", dateToday()); 
		const data     = getData(action, 0, "save", feedback);

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
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           				= decryptString($(this).attr("overtimeRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_overtime_request");
		const validateTime = checkTimeRange(false, true);
		const checkTimeOvertime = validateTimeInOvertime();

		if (validate && validateTime && checkTimeOvertime) {
			const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[reviseOvertimeRequestID]`] = id;
					delete data[`tableData[overtimeRequestID]`];
					data["feedback"] = getFormCode("OTR", new Date);
				} else {
					data[`whereFilter`] = `overtimeRequestID = ${id}`;
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
					moduleID:                56,
					// tableID:                 1, // AUTO FILL
					notificationTitle:       "Overtime Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			// setTimeout(() => {
			// 	formConfirmation(
			// 		"submit",
			// 		action,
			// 		"OVERTIME REQUEST",
			// 		"",
			// 		"form_overtime_request",
			// 		data,
			// 		true,
			// 		pageContent,
			// 		notificationData
			// 	);
			// }, 0);

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"OVERTIME REQUEST",
					"",
					"form_overtime_request",
					data,
					true,
					pageContent,
					notificationData,
					"",
					data["tableData[overtimeRequestStatus]"] == 2 ? generateProductionReport : false,
					data["tableData[overtimeRequestStatus]"] == 2 ? [employeeID,2,id] : []
				);
			}, 300);
		}
	});
	// ----- END SUBMIT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id       = decryptString($(this).attr("overtimeRequestID"));
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 5, "drop", feedback, id);

		
		formConfirmation(
			"drop",
			action,
			"OVERTIME REQUEST",
			"",
			"form_overtime_request",
			data,
			true,
			pageContent
		);
	})
	// ----- END DROP DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("overtimeRequestID"));
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

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
	});
	// ----- END CANCEL DOCUMENT -----



	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("overtimeRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[overtimeRequestStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("OTR", new Date);
				data[`tableData[reviseOvertimeRequestID]`] = id;
				data[`whereFilter`] = `overtimeRequestID = ${id}`;
				delete data[`tableData[overtimeRequestID]`];
			} else {
				data[`tableData[overtimeRequestID]`] = id;
				data[`whereFilter`] = `overtimeRequestID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		formConfirmation(
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

	// ----- UPDATE EMPLOYEE LEAVE -----
	function generateProductionReport(employeeID =0 ,status = 0,overtimeRequestID  = 0) {
		let getDateRange = getTableData(" hris_overtime_request_tbl","*",`overtimeRequestID  =${overtimeRequestID }`);


		let getDate = moment(getDateRange[0].overtimeRequestDate).format("YYYY-MM-DD");
		let overtimeRequestCreatedAt = getDateRange[0].createdAt;
		let overtimeRequestCode = getFormCode("OTR", overtimeRequestCreatedAt, overtimeRequestID);
		let timeIn = getDateRange[0].overtimeRequestTimeIn;
		let timeOut = getDateRange[0].overtimeRequestTimeOut;
		let breakDuration	= getDateRange[0].overtimeRequestBreak;
		let paidStatus = 1;
		let getLocation = getDateRange[0].overtimeRequestLocation;
		// let getStatus = getDateRange[0].overtimeRequestProjectStatus;
		let getStatus = 0;
		let getClass = getDateRange[0].overtimeRequestClass;
		let getClientID = getDateRange[0].overtimeRequestClientID;
		let getClientName = getDateRange[0].overtimeRequestClientName;
		let getProjectID = getDateRange[0].overtimeRequestProjectID;
		let getProjectName = getDateRange[0].overtimeRequestProjectName;
		let reason =getDateRange[0].overtimeRequestReason;
		$.ajax({
            method:   "POST",
            url:      "Overtime_request/generateProduction",
            data:     { employeeID 	: employeeID,
						overtimeRequestID	: overtimeRequestID,
						overtimeRequestCode: overtimeRequestCode,
						getDate		:	getDate,
						timeIn		:	timeIn,
						timeOut		:	timeOut,
						breakDuration	: 	breakDuration,
						paidStatus		:	paidStatus,
						getLocation		:	getLocation,
						getStatus		:	getStatus,
						getClass		:	getClass,
						getClientID		:	getClientID,
						getClientName		:	getClientName,
						getProjectID		: 	getProjectID,
						getProjectName		:	getProjectName,
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
	// ----- END UPDATE EMPLOYEE LEAVE -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("overtimeRequestID"));
		const feedback = $(this).attr("code") || getFormCode("OTR", dateCreated, id);
		let tableData  = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID = " + id);

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
					moduleID:                56,
					tableID:                 id,
					notificationTitle:       "Overtime Request",
					notificationDescription: `${getFormCode("OTR", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                56,
					tableID:                 id,
					notificationTitle:       "Overtime Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[overtimeRequestStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"OVERTIME REQUEST",
					"",
					"form_overtime_request",
					data,
					true,
					pageContent,
					notificationData,
					"",
					status == 2 ? generateProductionReport : false,
					status == 2 ? [employeeID,2,id] : []
				);
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);

		$("#modal_overtime_request_content").html(preloader);
		$("#modal_overtime_request .page-title").text(
			"DENY OVERTIME REQUEST DOCUMENT"
		);
		$("#modal_overtime_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
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
			<button class="btn btn-danger px-5 py-2" id="btnRejectConfirmation"
			overtimeRequestID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 py-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_overtime_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("overtimeRequestID"));
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);

		const validate = validateForm("modal_overtime_request");
		if (validate) {
			let tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[overtimeRequestRemarks]"] = $("[name=overtimeRequestRemarks]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                56,
					tableID: 				 id,
					notificationTitle:       "Overtime Request",
					notificationDescription: `${getFormCode("OTR", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"OVERTIME REQUEST",
						"modal_overtime_request",
						"",
						data,
						true,
						pageContent,
						notificationData,
						this
					);
					$(`[redirect=forApprovalTab]`).trigger("click");
				}, 300);
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
		if (tab == "#forViewingTab") {
			forViewingContent();
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
