$(document).ready(function () {

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

	// ----- REUSABLE FUNCTIONS -----	
	const projectList = getTableData(
		"pms_project_list_tbl AS project LEFT JOIN pms_timeline_builder_tbl AS timeline ON timeline.projectID = project.projectListID", 
		"projectListID,clientID,projectListName",
		"timelineBuilderStatus = 2");

	const clientList = getTableData(
		"pms_client_tbl", 
		"clientID,clientName",
		"clientStatus = 1");

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
			let html = `<option selected disabled>Select Client</option>`;
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
			// $(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Project</option>`;
			// let itemList = [...inventoryStorageList];
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
			${id == "0" && "selected"}>Select Client</option>`;
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
	function getprojectList(id = null, display = true, clientID = null) {
	
		let html   = `<option selected disabled>Select Project</option>`;

		let projectIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=overtimeRequestProjectID]`).each(function(i, obj) {
			projectIDArr.push($(this).val());
		}) 

		
		html += projectList.map(project => {
				
			if( clientID == null){
				return `
				<option 
					value        = "${project.projectListID}" 
					${project.projectListID == id && "selected"}>
					${project.projectListName}
				</option>`;
			}else{
				if(project.clientID == clientID ){
					return `
					<option 
						value        = "${project.projectListID}" 
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
	function viewDocument(view_id = false, readOnly = false) {
		const loadData = (id) => {
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
			window.history.pushState("", "", `${base_url}hris/overtime_request?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}hris/overtime_request?add`);
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
					{ targets: 2, width: 150 },
					{ targets: 3, width: 300 },
					{ targets: 4, width: 80  },
					{ targets: 5, width: 200 },
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
					{ targets: 2, width: 150 },
					{ targets: 3, width: 300 },
					{ targets: 4, width: 80  },
					{ targets: 5, width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_overtime_request_tbl", "approversID")) {
				let count = getCountForApproval("hris_overtime_request_tbl", "overtimeRequestStatus");
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
			"hris_overtime_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_overtime_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeID != ${sessionID} AND overtimeRequestStatus != 0 AND overtimeRequestStatus != 4`,
			`FIELD(overtimeRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_overtime_request_tbl.submittedAt, hris_overtime_request_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
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
				overtimeRequestID,
				approversID,
				approversDate,
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
			return html;
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
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
				overtimeRequestID,
				overtimeRequestDate,
				approversID,
				approversDate,
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
	function formButtons(data = false) {
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
				if (overtimeRequestStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 py-2" 
						id="btnSubmit" 
						overtimeRequestID="${overtimeRequestID}"
						code="${getFormCode("OTR", createdAt, overtimeRequestID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel px-5 py-2"
						id="btnCancelForm" 
						overtimeRequestID="${overtimeRequestID}"
						code="${getFormCode("OTR", createdAt, overtimeRequestID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (overtimeRequestStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 py-2"
							id="btnCancelForm" 
							overtimeRequestID="${overtimeRequestID}"
							code="${getFormCode("OTR", createdAt, overtimeRequestID)}"><i class="fas fa-ban"></i> 
							Cancel
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
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);

		let {
			overtimeRequestID      = "",
			employeeID            = "",
			overtimeRequestDate    = "",
			overtimeRequestTimeIn  = "",
			overtimeRequestTimeOut = "",
			overtimeRequestBreak	="",
			overtimeRequestReason  = "",
			overtimeRequestRemarks = "",
			approversID           = "",
			approversStatus       = "",
			approversDate         = "",
			overtimeRequestStatus  = false,
			submittedAt           = false,
			createdAt             = false,
			overtimeRequestLocation = "",
			overtimeRequestClass	="",
			overtimeRequestClientID	 ="",
			overtimeRequestProjectID = "",
			overtimeRequestProjectStatus =""

		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("overtimeRequestID", overtimeRequestID);
		$("#btnBack").attr("status", overtimeRequestStatus);
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
							${overtimeRequestID ? getFormCode("OTR", createdAt, overtimeRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${overtimeRequestStatus ? getStatusStyle(overtimeRequestStatus) : "---"}
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
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="overtimeRequestDate"
                        name="overtimeRequestDate"
                        value="${overtimeRequestDate && moment(overtimeRequestDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${overtimeRequestID}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestDate"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="time" 
                        class="form-control timeIn" 
                        id="overtimeRequestTimeIn" 
                        name="overtimeRequestTimeIn" 
                        required
                        value="${overtimeRequestTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestTimeIn"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
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
                    <label>Break ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control" 
                        id="overtimeRequestBreak" 
                        name="overtimeRequestBreak" 
                        required
                        value="${formatAmount(overtimeRequestBreak || 0)}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestBreak"></div>
                </div>
            </div>

			<div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Class ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2" name="overtimeRequestClass" id="overtimeRequestClass"  required ${disabled}>
						<option disabled selected>Select Class</option>
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

			<div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Location ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control " 
                        id="overtimeRequestLocation" 
                        name="overtimeRequestLocation" 
                        required
                        value="${overtimeRequestLocation}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestLocation"></div>
                </div>
            </div>


			<div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2" name="overtimeRequestClientID" id="overtimeRequestClientID" ${disabled} required>
						${getClientList(overtimeRequestClientID)}
					</select>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestClientID"></div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2" name="overtimeRequestProjectID" id="overtimeRequestProjectID" required ${disabled}>
							${getprojectList(overtimeRequestProjectID)}
						</select>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestProjectID"></div>
                </div>
            </div>

			<div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Status ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2 autoSaved" name="overtimeRequestProjectStatus"  id="overtimeRequestProjectStatus" ${disabled} required>
						<option disabled selected>Select Status</option>
						<option value="Pending" ${overtimeRequestProjectStatus == "Pending" ? "selected" : ""}>
							Pending
						</option>
						<option value="Done" ${overtimeRequestProjectStatus == "Done" ? "selected" : ""}>
							Done
						</option>
						<option value="Overdue" ${overtimeRequestProjectStatus == "Overdue" ? "selected" : ""}>
							Overdue
						</option>
					</select>
                    <div class="d-block invalid-feedback" id="invalid-overtimeRequestProjectStatus"></div>
                </div>
            </div>

            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
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
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			updateClientOptions();
			updateProjectOptions();
			if (data) {
				initInputmaskTime(false);
				$("#overtimeRequestDate").data("daterangepicker").startDate = moment(overtimeRequestDate, "YYYY-MM-DD");
				$("#overtimeRequestDate").data("daterangepicker").endDate   = moment(overtimeRequestDate, "YYYY-MM-DD");
			} else {
				initInputmaskTime();
				$("#overtimeRequestDate").val(moment(new Date).format("MMMM DD, YYYY"));
			}

			$("#overtimeRequestDate").data("daterangepicker").minDate = moment();
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

			headerButton(true, "Add Overtime Request");
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
		const id         = $(this).attr("overtimeRequestID");
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}
		} else {
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 0, "save", feedback, id);

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


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		// const tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID=" + id);
		// pageContent(true, tableData);
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		// const tableData = getTableData("hris_overtime_request_tbl", "", "overtimeRequestID=" + id);
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
		const id           = $(this).attr("overtimeRequestID");
		const validate     = validateForm("form_overtime_request");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
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
					notificationTitle:       "Overtime Request Form",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

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
					notificationData
				);
			}, 0);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = $(this).attr("overtimeRequestID");
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
	$(document).on("click", "#btnCancel", function () {
		const id       = $(this).attr("overtimeRequestID");
		const feedback = $(this).attr("code") || getFormCode("OTR", dateToday(), id);
		const action   = id && feedback ? "update" : "insert";
		const data     = getData(action, 0, "save", feedback, id);

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
	});
	// ----- END CANCEL DOCUMENT -----

	// ----- UPDATE EMPLOYEE LEAVE -----
	function generateProductionReport(employeeID =0 ,status = 0,overtimeRequestID  = 0) {
		let getDateRange = getTableData(" hris_overtime_request_tbl","*",`overtimeRequestID  =${overtimeRequestID }`);


		let getDate = moment(getDateRange[0].overtimeRequestDate).format("YYYY-MM-DD");
		let overtimeRequestCode = getDateRange[0].overtimeRequestCode;
		let timeIn = getDateRange[0].overtimeRequestTimeIn;
		let timeOut = getDateRange[0].overtimeRequestTimeOut;
		let breakDuration	= getDateRange[0].overtimeRequestBreak;
		let paidStatus = 1;
		let getLocation = getDateRange[0].overtimeRequestLocation;
		let getStatus = getDateRange[0].overtimeRequestProjectStatus;
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
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Overtime Request Form",
					notificationDescription: `${getFormCode("OTR", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                60,
					tableID:                 id,
					notificationTitle:       "Overtime Request Form",
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
					this,
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
					moduleID:                60,
					tableID: 				 id,
					notificationTitle:       "Overtime Request Form",
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
