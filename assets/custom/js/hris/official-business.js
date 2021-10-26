$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(58);


	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("official business");
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
				"hris_official_business_tbl", 
				"reviseOfficialBusinessID", 
				"reviseOfficialBusinessID IS NOT NULL AND officialBusinessID != 4");
			return revisedDocumentsID.map(item => item.reviseOfficialBusinessID).includes(id);
		}
		return false;
	}
	
	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_official_business_tbl", "", "officialBusinessID=" + id);

					if (tableData.length > 0) {
				let {
					employeeID,
					officialBusinessStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (officialBusinessStatus == 0 || officialBusinessStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (officialBusinessStatus == 0) {
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
			window.history.pushState("", "", `${base_url}hris/official_business?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/official_business?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/official_business?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/official_business`);
		}
	}
	// ----- END VIEW DOCUMENT -----

	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableForApprroval")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				sorting: [],
				columnDefs: [
					{ targets: 0,  width: 110 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 300 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 200 },
				],
			});

		var table = $("#tableMyForms")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				sorting: [],
				columnDefs: [
					{ targets: 0,  width: 110 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 300 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 200 },
				],
			});
	}

	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_official_business_tbl", "approversID")) {
				let count = getCountForApproval("hris_official_business_tbl", "officialBusinessStatus");
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
			if (isCreateAllowed(58)) {
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
		let officialBusinessData = getTableData(
			`hris_official_business_tbl AS ob 
					LEFT JOIN pms_client_tbl AS cl ON ob.officialBusinessCompanyID=cl.clientID 
					LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`ob.officialBusinessID,ob.officialBusinessCode,ob.employeeID,officialBusinessCompanyID,ob.officialBusinessDate,
					ob.officialBusinessTimeIn,ob.officialBusinessTimeOut,ob.officialBusinessReason,ob.approversID,ob.approversStatus,ob.approversDate,
					ob.officialBusinessStatus,ob.officialBusinessRemarks,ob.submittedAt,ob.createdBy,ob.updatedBy,ob.createdAt,ob.updatedAt,IFNULL(cl.clientName,'') AS clientName,
					CONCAT(hris_employee_list_tbl.employeeFirstname,' ',hris_employee_list_tbl.employeeLastname) AS  fullname, 
					IFNULL(concat(
						UPPER(SUBSTRING(cl.clientPostalCode,1,1)),
						' ',UPPER(SUBSTRING(cl.clientHouseNumber,1,1)),LOWER(SUBSTRING(cl.clientHouseNumber,2)),
						' ',UPPER(SUBSTRING(cl.clientBarangay,1,1)),LOWER(SUBSTRING(cl.clientBarangay,2)),
						' ',UPPER(SUBSTRING(cl.clientCity,1,1)),LOWER(SUBSTRING(cl.clientCity,2)),
						' ',UPPER(SUBSTRING(cl.clientProvince,1,1)),LOWER(SUBSTRING(cl.clientProvince,2)),
						' ',UPPER(SUBSTRING(cl.clientCountry,1,1)),LOWER(SUBSTRING(cl.clientCountry,2)),
						' ',UPPER(SUBSTRING(cl.clientPostalCode,1,1)),LOWER(SUBSTRING(cl.clientPostalCode,2))),'') AS officialBusinessAddress`,
			`employeeID != ${sessionID} AND officialBusinessStatus != 0 AND officialBusinessStatus != 4`,
			`FIELD(officialBusinessStatus, 0, 1, 3, 2, 4), COALESCE(ob.submittedAt, ob.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Current Approver</th>
					
					<th>Date</th>

					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		officialBusinessData.map((item) => {
			let {
				officialBusinessID,
				fullname,
				clientName,
				officialBusinessAddress,
				officialBusinessReason,
				officialBusinessDate,
				officialBusinessTimeIn,
				officialBusinessTimeOut,
				approversID,
				approversDate,
				officialBusinessStatus,
				officialBusinessRemarks,
				submittedAt,
				createdAt,
			} = item;	

			let remarks       = officialBusinessRemarks ? officialBusinessRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = officialBusinessStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${encryptString(item.officialBusinessID)}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(approversID, approversDate, officialBusinessStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView btnEdit" id="${encryptString(item.officialBusinessID)}">
					<td>${getFormCode("OBF", dateCreated, officialBusinessID)}</td>
					<td>${fullname}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, officialBusinessStatus, true))}
					</td>

					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>

					<td class="text-center">${getStatusStyle(officialBusinessStatus)}</td>
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
		}, 500);
	}
	// ----- END FOR APPROVAL CONTENT -----

	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let officialBusinessData = getTableData(
			`hris_official_business_tbl AS ob 
			LEFT JOIN pms_client_tbl AS cl ON ob.officialBusinessCompanyID=cl.clientID 
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`ob.officialBusinessID,ob.officialBusinessCode,ob.employeeID,officialBusinessCompanyID,ob.officialBusinessDate,
			ob.officialBusinessTimeIn,ob.officialBusinessTimeOut,ob.officialBusinessReason,ob.approversID,ob.approversStatus,ob.approversDate,
			ob.officialBusinessStatus,ob.officialBusinessRemarks,ob.submittedAt,ob.createdBy,ob.updatedBy,ob.createdAt,ob.updatedAt,IFNULL(cl.clientName,'') AS clientName,
			CONCAT(hris_employee_list_tbl.employeeFirstname,' ',hris_employee_list_tbl.employeeLastname) AS  fullname, 
			IFNULL(concat(
				UPPER(SUBSTRING(cl.clientPostalCode,1,1)),
				' ',UPPER(SUBSTRING(cl.clientHouseNumber,1,1)),LOWER(SUBSTRING(cl.clientHouseNumber,2)),
				' ',UPPER(SUBSTRING(cl.clientBarangay,1,1)),LOWER(SUBSTRING(cl.clientBarangay,2)),
				' ',UPPER(SUBSTRING(cl.clientCity,1,1)),LOWER(SUBSTRING(cl.clientCity,2)),
				' ',UPPER(SUBSTRING(cl.clientProvince,1,1)),LOWER(SUBSTRING(cl.clientProvince,2)),
				' ',UPPER(SUBSTRING(cl.clientCountry,1,1)),LOWER(SUBSTRING(cl.clientCountry,2)),
				' ',UPPER(SUBSTRING(cl.clientPostalCode,1,1)),LOWER(SUBSTRING(cl.clientPostalCode,2))),'') AS officialBusinessAddress`,
			`employeeID = ${sessionID}`,
			`FIELD(officialBusinessStatus, 0, 1, 3, 2, 4), COALESCE(ob.submittedAt, ob.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Current Approver</th>
					
					<th>Date</th>

                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		officialBusinessData.map((item) => {
			
			let {
				officialBusinessID,
				fullname,
				clientName,
				officialBusinessAddress,
				officialBusinessReason,
				officialBusinessDate,
				officialBusinessTimeIn,
				officialBusinessTimeOut,
				approversID,
				approversDate,
				officialBusinessStatus,
				officialBusinessRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = officialBusinessRemarks ? officialBusinessRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = officialBusinessStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let unique = {
				multiple:{	id:                 		officialBusinessID,
					officialBusinessTimeIn:             moment("2021-01-01 "+officialBusinessTimeIn).format("HH:mm"),
					officialBusinessTimeOut:            moment("2021-01-01 "+officialBusinessTimeOut).format("HH:mm"),
					officialBusinessDate: 				moment(officialBusinessDate).format("MMMM DD, YYYY")}
			
			};
			(officialBusinessStatus == 1 || officialBusinessStatus == 2) && uniqueData.push(unique);
			
			let btnClass = officialBusinessStatus != 0 ? "btnView" : "btnEdit";

			let button =
				officialBusinessStatus != 0 ?
				`
            <button class="btn btn-view w-100 btnView" id="${encryptString(officialBusinessID)}"><i class="fas fa-eye"></i> View</button>` :
				`
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(officialBusinessID)}" 
                code="${getFormCode("OBF", dateCreated, officialBusinessID)}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr class="btnEdit btnView" id="${encryptString(officialBusinessID)}">
                <td>${getFormCode("OBF", dateCreated, officialBusinessID)}</td>
                <td>${fullname}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, officialBusinessStatus, true))}
				</td>

				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>

                <td class="text-center">${getStatusStyle(officialBusinessStatus)}</td>
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
		}, 500);
	}

	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {

			let {
					officialBusinessID 		= "",
					officialBusinessStatus 	= "",
					employeeID				= "",
					approversID 			= "",
					approversDate 			= "",
					createdAt           	= new Date
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (officialBusinessStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						officialBusinessID="${encryptString(officialBusinessID)}"
						code="${getFormCode("OBF", createdAt, officialBusinessID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"
						><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;
					if (isRevise) {
					button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancel" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					} else if (officialBusinessStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"
							status="${officialBusinessStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (officialBusinessStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						officialBusinessID="${encryptString(officialBusinessID)}"
						code="${getFormCode("OBF", createdAt, officialBusinessID)}"
						status="${officialBusinessStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (officialBusinessStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(officialBusinessID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"
							status="${officialBusinessStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (officialBusinessStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(officialBusinessID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"
							status="${officialBusinessStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (officialBusinessStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							officialBusinessID="${encryptString(officialBusinessID)}"
							code="${getFormCode("OBF", createdAt, officialBusinessID)}"><i class="fas fa-ban"></i> 
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
				officialBusinessID 			= "",
				reviseOfficialBusinessID    = "",
				employeeID 					= "",
				officialBusinessCompanyID 	= "",
				officialBusinessAddress 	= "",
				officialBusinessDate 		= "",
				officialBusinessTimeIn 		= "",
				officialBusinessTimeOut 	= "",
				officialBusinessReason 		= "",
				officialBusinessRemarks 	= "",
				approversID 				= "",
				approversStatus 			= "",
				approversDate 				= "",
				officialBusinessStatus 		= false,
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


		$("#btnBack").attr("officialBusinessID", officialBusinessID);
		$("#btnBack").attr("code", getFormCode("OBF", moment(createdAt), officialBusinessID));
		$("#btnBack").attr("status", officialBusinessStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? officialBusinessID : reviseOfficialBusinessID;
		let documentHeaderClass = isRevise || reviseOfficialBusinessID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseOfficialBusinessID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseOfficialBusinessID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("OBF", createdAt, reviseDocumentNo)}
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
                        ${officialBusinessID && !isRevise ? getFormCode("OBF", createdAt, officialBusinessID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
                        ${officialBusinessStatus && !isRevise ? getStatusStyle(officialBusinessStatus) : "---"}
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
                            ${submittedAt && !isRevise && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(officialBusinessStatus, approversID, approversDate)}</h6>      
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
                        ${officialBusinessRemarks && !isRevise ? officialBusinessRemarks : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_official_business">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Department</label>
					<input type="text" class="form-control" disabled value="${employeeDepartment}">
				</div>
				</div>
			 <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="text-dark">Position</label>
                        <input type="text" class="form-control" disabled value="${employeeDesignation}">
                    </div>
                </div>	
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company ${!disabled ? "<code>*</code>" : ""}</label>
                    <select 
                    class="form-control validate select2" 
                    id="officialBusinessCompanyID" 
                    name="officialBusinessCompanyID"
					style="width: 100%"
                    ${disabled} required>
                    ${getCompanyContent(officialBusinessCompanyID)}
                    </select>
            <div class="invalid-feedback d-block" id="invalid-officialBusinessCompanyID"></div>
                </div>
             </div>
            <div class="col-md-8 col-sm-12">
             <div class="form-group">
                 <label>Address ${!disabled ? "<code>*</code>" : ""}</label>
                 <input type="text"
                    class="form-control"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
                    id="officialBusinessAddress"
                    name="officialBusinessAddress"
                    value="${officialBusinessAddress}"
                    disabled>
                <div class="d-block invalid-feedback" id="invalid-officialBusinessAddress"></div>
             </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="officialBusinessDate"
                        name="officialBusinessDate"
                        value="${officialBusinessDate && moment(officialBusinessDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${officialBusinessDate}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="officialBusinessTimeIn" 
                        name="officialBusinessTimeIn" 
                        required
                        value="${officialBusinessTimeIn}"
						${disabled}
						unique="${officialBusinessTimeIn}"
						title="Date"
						>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessTimeIn"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="officialBusinessTimeOut" 
                        name="officialBusinessTimeOut" 
                        required
                        value="${officialBusinessTimeOut}"
						unique="${officialBusinessTimeOut}"
						title="Date"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessTimeOut"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Work Performed ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="officialBusinessReason"
                        name="officialBusinessReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${officialBusinessReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessReason"></div>
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
			
			if(data){
				initInputmaskTime(false) 
			}else{
				initInputmaskTime();
			$("#officialBusinessDate").val(moment(new Date).format("MMMM DD, YYYY"));
			}
			var totalminDate = moment().subtract(7,'d').format('YYYY-MM-DD');
			$("#officialBusinessDate").data("daterangepicker").minDate = moment(totalminDate);
			//data ? initInputmaskTime(false) : initInputmaskTime();

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

			headerButton(true, "Add Official Business");
			headerTabContent();
			//forApprovalContent();
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

	// ----- END PAGE CONTENT ----

	// function getModuleHeaderOptions(clientID = 0) {
	// 	let getModuleHeader = getTableData("pms_client_tbl", "*", "	clientStatus = 1");
	// 	let moduleHeaderOptions = `<option ${clientID == 0 && "selected"} disabled>Select Company Name</option>`;
	// 	getModuleHeader.map(item => {
	// 		moduleHeaderOptions += `<option value="${item.clientID}" ${item.clientID == clientID && "selected"}>${item.clientName}</option>`;
	// 	})

	// 	return moduleHeaderOptions;

	// }

	// ----- COMPANY CONTENT ----
	function getCompanyContent(clientID = false) {
		let getModuleHeader = getTableData("pms_client_tbl", "*", "	clientStatus = 1");

		let moduleHeaderOptions = `<option selected disabled>Select Company Name</option>`;
		let address = "";

		getModuleHeader.map(item => {

			address = `${item.clientUnitNumber && titleCase(item.clientUnitNumber)+", "}${item.clientHouseNumber && item.clientHouseNumber +", "}${item.clientBarangay && titleCase(item.clientBarangay)+", "}${item.clientCity && titleCase(item.clientCity)+", "}${item.clientProvince && titleCase(item.clientProvince)+", "}${item.clientCountry && titleCase(item.clientCountry)+", "}${item.clientPostalCode && titleCase(item.clientPostalCode)}`;

			moduleHeaderOptions += `<option value="${item.clientID}" ${item.clientID == clientID && "selected"} companyAddress="${address}">${item.clientName}</option>`;

			if (clientID && item.clientID == clientID[0].clientID) {
				$("#officialBusinessAddress").val(address);
			}

		})

		return moduleHeaderOptions;

	}
	getCompanyContent();

	 // ----- CHANGE CLIENT ADDRESS -----
	 $(document).on("change", "#officialBusinessCompanyID", function() {
        var companyAddress = $(this).find("option:selected").attr("companyAddress");
        $("#officialBusinessAddress").val(companyAddress);
    });
    // ----- END CHANGE CLIENT ADDRESS -----




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
			const fromValue = $("#officialBusinessTimeIn").val() + ":00";
			const validated = $(this).hasClass("validated");
			const toValue = $(this).val() + ":00";

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
				isReturnable || validated ?
					$(this).removeClass("is-invalid").addClass("is-valid") :
					$(this).removeClass("is-invalid").removeClass("is-valid");
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
		let data = getFormData("form_official_business", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
			const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[officialBusinessStatus]"] 	= status;
			data["tableData[updatedBy]"] 				= sessionID;
			data["feedback"] 							= feedback;
			data["method"] 								= method;
			data["tableName"] 							= "hris_official_business_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				// data["tableData[officialBusinessCode]"] = generateCode(
				// 	"OBF",
				// 	false,
				// 	"hris_official_business_tbl",
				// 	"officialBusinessCode",
				// );
				data["tableData[employeeID]"] 			= sessionID;
				data["tableData[createdBy]"] 			= sessionID;
				data["tableData[createdAt]"] 			= dateToday();

				//const approversID = getModuleApprover(58);
				if (approversID && method == "submit") {
					data["tableData[approversID]"] 		= approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"] 				= sessionID;
					data["tableData[approversStatus]"] 			= 2;
					data["tableData[approversDate]"] 			= dateToday();
					data["tableData[officialBusinessStatus]"] 	= 2;
				}

			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]          = sessionID;
						data["tableData[approversStatus]"]      = 2;
						data["tableData[approversDate]"]        = dateToday();
						data["tableData[officialBusinessStatus]"] = 2;
					}
				}
				data["whereFilter"] = "officialBusinessID =" + id;
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

		// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("officialBusinessID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----
	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("officialBusinessID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {

			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getData(action, 0, "save", feedback, id);
				data[`tableData[officialBusinessStatus]`] = 0;
				if (!isFromCancelledDocument) {
					delete data[`officialBusinessID`];
					data[`feedback`] = getFormCode("OBF", new Date);
					data[`tableData[reviseOfficialBusinessID]`] = id;
				} else {
					delete data[`action`];
					data[`tableData[officialBusinessID]`] = id;
					data[`action`] = "update";
				}

				setTimeout(() => {
					cancelForm(
						"save",
						action,
						"OFFICIAL BUSINESS",
						"",
						"form_official_business",
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
			data[`tableData[officialBusinessStatus]`] = 0;

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"OFFICIAL BUSINESS",
					"",
					"form_official_business",
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

	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("officialBusinessID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("OBF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[officialBusinessStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("OBF", new Date);
				data[`tableData[reviseOfficialBusinessID]`] = id;
				data[`whereFilter`] = `officialBusinessID = ${id}`;
				delete data[`tableData[officialBusinessID]`];
			} else {
				data[`tableData[officialBusinessID]`] = id;
				data[`whereFilter`] = `officialBusinessID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		formConfirmation(
			"save",
			action,
			"OFFICIAL BUSINESS",
			"",
			"form_official_business",
			data,
			true,
			pageContent
		);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
	const id           = decryptString($(this).attr("officialBusinessID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_official_business");

		if (validate && flag) {
			const feedback = $(this).attr("code") || getFormCode("OBF", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[reviseOfficialBusinessID]`] = id;
					delete data[`tableData[officialBusinessID]`];
					data["feedback"] = getFormCode("OBF", new Date);
				} else {
					data[`whereFilter`] = `officialBusinessID = ${id}`;
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
					moduleID:                58,
					notificationTitle:       "OFFICIAL BUSINESS",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"OFFICIAL BUSINESS",
					"",
					"form_official_business",
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
		const id       = decryptString($(this).attr("officialBusinessID"));
		const feedback = $(this).attr("code") || getFormCode("OBF", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"OFFICIAL BUSINESS",
			"",
			"form_official_business",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----
	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id 				= decryptString($(this).attr("officialBusinessID"));
		const feedback 			= $(this).attr("code") || getFormCode("OBF", dateCreated, id);
		let tableData 			= getTableData(" hris_official_business_tbl", "", "officialBusinessID = " + id);
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
					moduleID:                58,
					tableID:                 id,
					notificationTitle:       "Official Business",
					notificationDescription: `${getFormCode("OBF", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                58,
					tableID:                 id,
					notificationTitle:       "Official Business",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[officialBusinessStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"OFFICIAL BUSINESS",
					"",
					"form_official_business",
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

	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id = decryptString($(this).attr("officialBusinessID"));
		const feedback =  $(this).attr("code") || getFormCode("OBF", dateToday(), id);

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY OFFICIAL BUSINESS DOCUMENT");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="officialBusinessRemarks"
					name="officialBusinessRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-officialBusinessRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			officialBusinessID="${encryptString(id)}"
			officialBusinessCode="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	})

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id = decryptString($(this).attr("officialBusinessID"));
		const feedback = $(this).attr("code") || getFormCode("OBF",dateToday(), id);

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_official_business_tbl", "", "officialBusinessID = " + id);
			if (tableData) {
				let approversID 			= tableData[0].approversID;
				let approversStatus 		= tableData[0].approversStatus;
				let approversDate 			= tableData[0].approversDate;
				let employeeID 				= tableData[0].employeeID;
				let createdAt       		= tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[officialBusinessRemarks]"] = $("[name=officialBusinessRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"] = updateApproveDate(approversDate);

				let notificationData = {
					moduleID: 					58,
					tableID: 				 	id,
					notificationTitle: 			"Oficial Business Form",
					notificationDescription: 	`${getFormCode("OBF", createdAt, id)}: Your request has been denied.`,
					notificationType: 			1,
					employeeID,
				};

				setTimeout(() => {
				formConfirmation(
					"reject",
					"update",
					"OFFICIAL BUSINESS",
					"form_official_business",
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
	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const officialBusinessID = decryptString($(this).attr("officialBusinessID"));
		const feedback         = $(this).attr("code") || getFormCode("OBF", dateToday(), id);

		const id = decryptString($(this).attr("officialBusinessID"));
		let data = {};
		data["tableName"]                       = "hris_official_business_tbl";
		data["whereFilter"]                     = `officialBusinessID = ${officialBusinessID}`;
		data["tableData[officialBusinessStatus]"] = 5;
		data["action"]                          = "update";
		data["method"]                          = "drop";
		data["feedback"]                        = feedback;
		data["tableData[updatedBy]"]            = sessionID;

		setTimeout(() => {
			formConfirmation(
				"drop",
				"update",
				"Oficial Business Form",
				"",
				"form_official_business",
				data,
				true,
				pageContent
			);
		}, 300);
	})
	// ----- END DROP DOCUMENT -----

	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END REJECT DOCUMENT -----

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

