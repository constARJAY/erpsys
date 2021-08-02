$(document).ready(function () {

	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("Training and Development");
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
			const tableData = getTableData("hris_training_development_module", "", "trainingDevelopmentModuleID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					trainingDevelopmentModuleStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (trainingDevelopmentModuleStatus == 0 || trainingDevelopmentModuleStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (trainingDevelopmentModuleStatus == 0) {
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
			window.history.pushState("", "", `${base_url}hris/training_development?view_id=${view_id}`);
		} else if (!view_id && isAdd) {
			window.history.pushState("", "", `${base_url}hris/training_development?add`);
		} else {
			window.history.pushState("", "", `${base_url}hris/training_development`);
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
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 300 },
					{ targets: 4,  width: 130  },
					{ targets: 5,  width: 90 },
                    { targets: 6,  width: 150 },
                    { targets: 7,  width: 240 },
                    { targets: 8,  width: 80 },
                    { targets: 9,  width: 200 },
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
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 300 },
					{ targets: 4,  width: 130  },
					{ targets: 5,  width: 90  },
                    { targets: 6,  width: 150 },
                    { targets: 7,  width: 240 },
                    { targets: 8,  width: 80 },
                    { targets: 9,  width: 200 },
				],
			});
	}

	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_training_development_module", "approversID")) {
				let count = getCountForApproval("hris_training_development_module", "trainingDevelopmentModuleStatus");
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
			html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
		let trainingDevelopmentData = getTableData(
			`hris_training_development_module AS tdm 
                LEFT JOIN hris_training_development_setup_tbl AS tdst USING(trainingDevelopmentSetupID)
				LEFT JOIN hris_employee_list_tbl AS empl ON tdm.employeeID = empl.employeeID
				LEFT JOIN hris_employee_list_tbl AS empltrainee ON tdst.employeeID =empltrainee.employeeID`,
			`tdm.*, CONCAT(empl.employeeFirstname,' ',empl.employeeLastname)  AS fullname,
            CONCAT(empltrainee.employeeFirstname,' ',empltrainee.employeeLastname) AS trainor,
            tdst.trainingDevelopmentSetupName, tdst.trainingDevelopmentSetupDifficulty`,
			`tdm.employeeID != ${sessionID} AND trainingDevelopmentModuleStatus != 0 AND trainingDevelopmentModuleStatus != 4`,
			`FIELD(trainingDevelopmentModuleStatus, 0, 1, 3, 2, 4), COALESCE(tdm.submittedAt, tdm.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Training Name</th>
					<th>Trainees</th>
                    <th>Trainor</th>
                    <th>Difficulty</th>
                    <th>Current Approver</th>
                    <th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

            trainingDevelopmentData.map((item) => {
			let {
				trainingDevelopmentModuleID ,
				fullname,
				trainor,
				trainingDevelopmentSetupName,
                trainingDevelopmentModuleTrainee,
				trainingDevelopmentModuleStatus,
				trainingDevelopmentModuleRemarks,
				trainingDevelopmentModuleDifficulty,
				approversID,
				approversDate,
				submittedAt,
				createdAt,
			} = item;	
            
            let trainees = 	trainingDevelopmentModuleTrainee.split("|");
            let listOfTrainees    = "";

            trainees.map((traineeItems, index)=>{
                let tableDataTrainee =   getTableData("hris_employee_list_tbl","","employeeID="+traineeItems);
                let comma                =   trainees.length == (index + 1) ? "": ", ";
                listOfTrainees          +=  tableDataTrainee[0]["employeeFirstname"]+" "+ tableDataTrainee[0]["employeeLastname"]+comma;  
            });

			let remarks       = trainingDevelopmentModuleRemarks ? trainingDevelopmentModuleRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = trainingDevelopmentModuleStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = `
			<button class="btn btn-view w-100 btnView" id="${encryptString(item.trainingDevelopmentModuleID)}"><i class="fas fa-eye"></i> View</button>`;
			if (isImCurrentApprover(approversID, approversDate, trainingDevelopmentModuleStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView btnEdit" id="${encryptString(item.trainingDevelopmentModuleID)}">
					<td>${getFormCode("TRN", dateCreated, trainingDevelopmentModuleID)}</td>
					<td>${fullname}</td>
                    <td>${trainingDevelopmentSetupName}</td>
                    <td>${listOfTrainees}</td>
                    <td>${trainor}</td>
					<td>${trainingDevelopmentModuleDifficulty}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, trainingDevelopmentModuleStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">${getStatusStyle(trainingDevelopmentModuleStatus)}</td>
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
		let trainingDevelopmentData = getTableData(
			`hris_training_development_module AS tdm 
                LEFT JOIN hris_training_development_setup_tbl AS tdst USING(trainingDevelopmentSetupID)
				LEFT JOIN hris_employee_list_tbl AS empl ON tdm.employeeID = empl.employeeID
				LEFT JOIN hris_employee_list_tbl AS empltrainee ON tdst.employeeID =empltrainee.employeeID`,
                `tdm.*, CONCAT(empl.employeeFirstname,' ',empl.employeeLastname)  AS fullname,
                CONCAT(empltrainee.employeeFirstname,' ',empltrainee.employeeLastname) AS trainor,
                tdst.trainingDevelopmentSetupName, tdst.trainingDevelopmentSetupDifficulty`,
			`tdm.employeeID = ${sessionID}`,
			`FIELD(trainingDevelopmentModuleStatus, 0, 1, 3, 2, 4), COALESCE(tdm.submittedAt, tdm.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Training Name</th>
                    <th>Trainees</th>
                    <th>Trainor</th>
                    <th>Difficulty</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

            trainingDevelopmentData.map((item) => {
                let {
                    trainingDevelopmentModuleID ,
                    fullname,
                    trainor,
                    trainingDevelopmentSetupName,
                    trainingDevelopmentModuleTrainee,
                    trainingDevelopmentModuleStatus,
                    trainingDevelopmentModuleRemarks,
					trainingDevelopmentModuleDifficulty,
                    approversID,
                    approversDate,
                    submittedAt,
                    createdAt,
                } = item;	
                
                let trainees = 	trainingDevelopmentModuleTrainee.split("|");
                let listOfTrainees    = "";
    
                trainees.map((traineeItems, index)=>{
                    let tableDataTrainee =   getTableData("hris_employee_list_tbl","","employeeID="+traineeItems);
                    let comma                =   trainees.length == (index + 1) ? "": ", ";
                    listOfTrainees          +=  tableDataTrainee[0]["employeeFirstname"]+" "+ tableDataTrainee[0]["employeeLastname"]+comma;  
                });
    
                let remarks       = trainingDevelopmentModuleRemarks ? trainingDevelopmentModuleRemarks : "-";
                let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
                let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
                let dateApproved  = trainingDevelopmentModuleStatus == 2 ? approversDate.split("|") : "-";
                if (dateApproved !== "-") {
                    dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
                }
    
                let button = `
                <button class="btn btn-view w-100 btnView" id="${encryptString(item.trainingDevelopmentModuleID)}"><i class="fas fa-eye"></i> View</button>`;
               
                    html += `
                    <tr class="btnView btnEdit" id="${encryptString(item.trainingDevelopmentModuleID)}">
                        <td>${getFormCode("TRN", dateCreated, trainingDevelopmentModuleID)}</td>
                        <td>${fullname}</td>
                        <td>${trainingDevelopmentSetupName}</td>
                        <td>${listOfTrainees}</td>
                        <td>${trainor}</td>
						<td>${trainingDevelopmentModuleDifficulty}</td>
                        <td>
                            ${employeeFullname(getCurrentApprover(approversID, approversDate, trainingDevelopmentModuleStatus, true))}
                        </td>
                        <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                        <td class="text-center">${getStatusStyle(trainingDevelopmentModuleStatus)}</td>
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
	function formButtons(data = false) {
		let button = "";
		if (data) {

			let {
					trainingDevelopmentModuleID 		= "",
					trainingDevelopmentModuleStatus 	= "",
					employeeID				            = "",
					approversID 			            = "",
					approversDate 			            = "",
					createdAt           	            = new Date
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (trainingDevelopmentModuleStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						trainingDevelopmentModuleID="${trainingDevelopmentModuleID}"
						code="${getFormCode("TRN", createdAt, trainingDevelopmentModuleID)}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel px-5 p-2"
						id="btnCancelForm" 
						trainingDevelopmentModuleID="${trainingDevelopmentModuleID}"
						code="${getFormCode("TRN", createdAt, trainingDevelopmentModuleID)}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (trainingDevelopmentModuleStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							trainingDevelopmentModuleID="${trainingDevelopmentModuleID}"
							code="${getFormCode("TRN", createdAt, trainingDevelopmentModuleID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (trainingDevelopmentModuleStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							trainingDevelopmentModuleID="${encryptString(trainingDevelopmentModuleID)}"
							code="${getFormCode("TRN", createdAt, trainingDevelopmentModuleID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							trainingDevelopmentModuleID="${encryptString(trainingDevelopmentModuleID)}"
							code="${getFormCode("TRN", createdAt, trainingDevelopmentModuleID)}"><i class="fas fa-ban"></i> 
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
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);

		let {
				trainingDevelopmentModuleID 				= "",
				trainingDevelopmentSetupID 					= "",
				revisetrainingDevelopmentModuleID 			= "",
				trainingDevelopmentModuleTrainee			="",
				trainingDevelopmentModuleTopic 				= "",
				trainingDevelopmentModuleTrainor			="",
				trainingDevelopmentModuleType 				= "",
				trainingDevelopmentModuleBudget 			= "",
				trainingDevelopmentModuleFile 				= "",
				trainingDevelopmentModuleDifficulty 		= "",
				trainingDevelopmentModuleDate 				= "",
				trainingDevelopmentModuleDescription		="",
				trainingDevelopmentModuleRemarks			="",
				employeeID 									="",
				approversID 								= "",
				approversStatus 							= "",
				approversDate 								= "",
				trainingDevelopmentModuleStatus 			= false,
				submittedAt 								= false,
				createdAt 									= false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			 department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);
		//let readOnlyMulti = "";
		


		$("#btnBack").attr("trainingDevelopmentModuleID", trainingDevelopmentModuleID);
		$("#btnBack").attr("status", trainingDevelopmentModuleStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		//let disabledmulti = trainingDevelopmentModuleTrainee ? "disabled" :"";
		// /let disabled
		let button = formButtons(data);

		let html = `
        <div class="row px-2">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
						${trainingDevelopmentModuleID ? getFormCode("TRN", createdAt, trainingDevelopmentModuleID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${trainingDevelopmentModuleStatus ? getStatusStyle(trainingDevelopmentModuleStatus) : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(trainingDevelopmentModuleStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${trainingDevelopmentModuleRemarks ? trainingDevelopmentModuleRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_training_module">
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
			<div class="col-md-12 col-sm-12">
			<div class="form-group">
				<label>Description ${!disabled ? "<code>*</code>" : ""}</label>
				<textarea class="form-control validate"
					data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
					minlength="1"
					maxlength="200"
					id="trainingDevelopmentModuleDescription"
					name="trainingDevelopmentModuleDescription"
					required
					rows="4"
					style="resize:none;"
					${disabled}>${trainingDevelopmentModuleDescription}</textarea>
				<div class="d-block invalid-feedback" id="invalid-rainingDevelopmentModuleDescription"></div>
			</div>
		</div>

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label for="">Trainees ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control select2 validate" multiple="multiple" name="trainingDevelopmentModuleTrainee" id="trainingDevelopmentModuleTrainee" ${disabled} required>
						 ${userAccountOption(trainingDevelopmentModuleTrainee)}
					</select>
					<div class="invalid-feedback d-block" id="invalid-trainingDevelopmentModuleTrainee"></div>
				</div>
			</div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Training Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select 
                    class="form-control validate select2" 
                    id="trainingDevelopmentSetupID" 
                    name="trainingDevelopmentSetupID"
					style="width: 100%"
                    ${disabled} required>
                    ${getTrainingSetupContent(trainingDevelopmentSetupID)}
                    </select>
            <div class="invalid-feedback d-block" id="invalid-trainingDevelopmentSetupID"></div>
                </div>
             </div>
            <div class="col-md-4 col-sm-12">
             <div class="form-group">
                 <label>Topic/s</label>
                 <input type="text"
                    class="form-control"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
                    id="trainingDevelopmentModuleTopic"
                    name="trainingDevelopmentModuleTopic"
                    value="${trainingDevelopmentModuleTopic}"
                    disabled>
                <div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleTopic"></div>
             </div>
            </div>
			<div class="col-md-4 col-sm-12">
             <div class="form-group">
                 <label>Trainor/Speaker</label>
                 <input type="text"
                    class="form-control"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
                    id="trainingDevelopmentModuleTrainor"
                    name="trainingDevelopmentModuleTrainor"
                    value="${trainingDevelopmentModuleTrainor}"
                    disabled>
                <div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleTrainor"></div>
             </div>
            </div>
			<div class="col-md-4 col-sm-12">
             <div class="form-group">
                 <label>Type of training</label>
                 <input type="text"
                    class="form-control"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
                    id="trainingDevelopmentModuleType"
                    name="trainingDevelopmentModuleType"
                    value="${trainingDevelopmentModuleType}"
                    disabled>
                <div class="d-block invalid-feedback" id="invalid-employeeID"></div>
             </div>
            </div>
			<div class="col-md-4 col-sm-12">
			<div class="form-group">
                        <label>Set budget <code>*</code></label>
                        <div class="input-group">
                            <div class="input-group-prepend bg-transparent">
                            <span class="input-group-text bg-transparent border-right-0">₱</span>
                            </div>
                            <input type="text"
                                class="form-control amount"
                                name="trainingDevelopmentModuleBudget"
                                id="trainingDevelopmentModuleBudget"
                                min="0"
                                max="9999999999"
                                required
                                value="${trainingDevelopmentModuleBudget}">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-trainingDevelopmentModuleBudget"></div>
                </div>
				</div>
				<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Training module</label>
					<input type="text"
					   class="form-control"
					   data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
					   id="trainingDevelopmentModuleFile"
					   name="trainingDevelopmentModuleFile"
					   value="${trainingDevelopmentModuleFile}"
					   disabled>
				   <div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleFile"></div>
				</div>
			   </div>
			   <div class="col-md-4 col-sm-12">
			   <div class="form-group">
				   <label>Difficulty</label>
				   <input type="text"
					  class="form-control"
					  data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
					  id="trainingDevelopmentModuleDifficulty"
					  name="trainingDevelopmentModuleDifficulty"
					  value="${trainingDevelopmentModuleDifficulty}"
					  disabled>
				  <div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleDifficulty"></div>
			   </div>
			  </div>		
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="trainingDevelopmentModuleDate"
                        name="trainingDevelopmentModuleDate"
                        value="${trainingDevelopmentModuleDate && moment(trainingDevelopmentModuleDate).format("MMMM DD, YYYY")}"
						${disabled}
						unique="${trainingDevelopmentModuleDate}"
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleDate"></div>
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
			
			$("#trainingDevelopmentModuleDate").data("daterangepicker").minDate = moment();
			//data ? initInputmaskTime(false) : initInputmaskTime();
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

			headerButton(true, "Add Training Development");
			headerTabContent();
			//forApprovalContent();
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

	// ----- END PAGE CONTENT ----

	// ----- COMPANY CONTENT ----
	function getTrainingSetupContent(trainingDevelopmentSetupID = false) {
		let getModuleHeader = getTableData(`hris_training_development_setup_tbl AS tdst 
											LEFT JOIN hris_employee_list_tbl AS empl ON tdst.employeeID = empl.employeeID`, "tdst.*,CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname ", "	trainingDevelopmentSetupStatus = 1");

		let moduleHeaderOptions = `<option selected disabled>Select Training Name</option>`;
		let TrainingTopic 		= "";
		let TrainingSpeaker 	="";
		let TrainingType 		="";
		let TrainingModule 		="";
		let TrainingDifficulty 	="";

		getModuleHeader.map(item => {

			TrainingName 		= `${item.trainingDevelopmentSetupName}`;
			TrainingTopic 		= `${item.trainingDevelopmentSetupTopic}`;
			//console.log(TrainingTopic);
			//TrainingTopic 		= `${item.trainingDevelopmentSetupTopic}`;
			TrainingSpeaker 	= `${item.fullname}`;
			TrainingType 		= `${item.trainingDevelopmentSetupType}`;
			TrainingModule 		= `${item.trainingDevelopmentSetupModuleFile}`;
			TrainingDifficulty 	= `${item.trainingDevelopmentSetupDifficulty}`;

			moduleHeaderOptions += `<option value="${item.trainingDevelopmentSetupID }" ${item.trainingDevelopmentSetupID  == trainingDevelopmentSetupID  && "selected"} TrainingTopic="${TrainingTopic}" TrainingSpeaker="${TrainingSpeaker}" TrainingType="${TrainingType}" TrainingModule="${TrainingModule}" TrainingDifficulty="${TrainingDifficulty}">${TrainingName}</option>`;

			if (trainingDevelopmentSetupID && item.trainingDevelopmentSetupID == trainingDevelopmentSetupID[0].trainingDevelopmentSetupID) {
				$("#trainingDevelopmentModuleTopic").val(TrainingTopic);
				$("#trainingDevelopmentModuleTrainor").val(TrainingSpeaker);
				$("#trainingDevelopmentModuleType").val(TrainingType);
				$("#trainingDevelopmentModuleFile").val(TrainingModule);
				$("#trainingDevelopmentModuleDifficulty").val(TrainingDiffulty);
			}

		})

		return moduleHeaderOptions;

	}
	getTrainingSetupContent();

	 // ----- CHANGE CLIENT ADDRESS -----
	 $(document).on("change", "#trainingDevelopmentSetupID", function() {
        var TrainingTopic = $(this).find("option:selected").attr("TrainingTopic");
		var TrainingSpeaker = $(this).find("option:selected").attr("TrainingSpeaker");
		var TrainingType = $(this).find("option:selected").attr("TrainingType");
		var TrainingModule = $(this).find("option:selected").attr("TrainingModule");
		var TrainingDifficulty = $(this).find("option:selected").attr("TrainingDifficulty");
        $("#trainingDevelopmentModuleTopic").val(TrainingTopic);
		$("#trainingDevelopmentModuleTrainor").val(TrainingSpeaker);
		$("#trainingDevelopmentModuleType").val(TrainingType);
		$("#trainingDevelopmentModuleFile").val(TrainingModule);
		$("#trainingDevelopmentModuleDifficulty").val(TrainingDifficulty);
    });
    // ----- END CHANGE CLIENT ADDRESS -----

	//get multiple employee
	function userAccountOption(selected = ""){
		let selectedSplit           =   selected == "" ? "0" : selected.split("|");
		let tableData               =   getTableData("hris_employee_list_tbl","","employeeID NOT IN("+selectedSplit+") AND employeeStatus != 0");
		let returnData              =   "";
		if(selected != ""){
				selectedSplit.map(selectedItems =>{
					let tableDataSelected   =   getTableData("hris_employee_list_tbl","","employeeID='"+selectedItems+"'");
					returnData              += `<option value='${tableDataSelected[0]["employeeID"]}' selected> ${tableDataSelected[0]["employeeFirstname"]} ${tableDataSelected[0]["employeeLastname"]}</option>`;
				});
			}
		
		tableData.map(items=>{
			returnData += `<option value="${items["employeeID"]}">${items["employeeFirstname"]} ${items["employeeLastname"]}</option>`;
		});
		return returnData;
	}
	//end get multiple employee

	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_training_module", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
			const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[trainingDevelopmentModuleStatus]"] 	= status;
			data["tableData[updatedBy]"] 				= sessionID;
			data["feedback"] 							= feedback;
			data["method"] 								= method;
			data["tableName"] 							= "hris_training_development_module";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				// data["tableData[officialBusinessCode]"] = generateCode(
				// 	"TRN",
				// 	false,
				// 	"hris_training_development_module",
				// 	"officialBusinessCode",
				// );
				data["tableData[employeeID]"] 			= sessionID;
				data["tableData[createdBy]"] 			= sessionID;
				data["tableData[createdAt]"] 			= dateToday();

				//const approversID = getModuleApprover(123);
				if (approversID && method == "submit") {
					data["tableData[approversID]"] 		= approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"] 				= sessionID;
					data["tableData[approversStatus]"] 			= 2;
					data["tableData[approversDate]"] 			= dateToday();
					data["tableData[trainingDevelopmentModuleStatus]"] 	= 2;
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
				data["whereFilter"] = "trainingDevelopmentModuleID =" + id;
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

	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id 			= $(this).attr("trainingDevelopmentModuleID");
		const employeeID 	= $(this).attr("employeeID");
		const feedback   	= $(this).attr("code") || getFormCode("TRN", dateToday(), id);
		const status 		= $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();

			if (employeeID != sessionID) {
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			}	
		} else {
			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			setTimeout(() => {
				cancelForm(
					"save",
					action,
					"OFFICIAL BUSINESS",
					"",
					"form_training_module",
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
		viewDocument(id);
		// const code = $(this).attr("code");

		// const tableData = getTableData(
		// 	"hris_training_development_module",
		// 	"*",
		// 	"trainingDevelopmentModuleID=" + id,
		// 	""
		// );

		// pageContent(true, tableData);
		// getTrainingSetupContent(tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
		// const tableData = getTableData(
		// 	"hris_training_development_module",
		// 	"*",
		// 	"trainingDevelopmentModuleID=" + id,
		// 	""
		// );
		// pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const action   = "insert"; 
		const feedback = getFormCode("TRN", dateToday()); 
		const data     = getData(action, 0, "save", feedback);
		
			//const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"OFFICIAL BUSINESS",
				"",
				"form_training_module",
				data,
				true,
				myFormsContent
			);
		// }
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = $(this).attr("trainingDevelopmentModuleID");
		const amountvalue = $("#employeeBasicSalary").val();
		const validate = validateForm("form_training_module");
		// const validateTime = checkTimeRange(false, true);

		if (validate) {
			const feedback = $(this).attr("code") || getFormCode("TRN", dateToday(), id);
			const action   = id && feedback ? "update" : "insert";
			const data     = getData(action, 1, "submit", feedback, id);

			
			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);
			
			//let notificationData = false;
			// const employeeID = getNotificationEmployeeID(
			// 	data["tableData[approversID]"],
			// 	data["tableData[approversDate]"],
			// 	true
			// );

			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                123,
					// tableID:                 1, // AUTO FILL
					notificationTitle:       "Training Development",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			// let notificationData = {
			// 	moduleID: 123,
			// 	notificationTitle: "Official Business Form",
			// 	notificationDescription: `${sessionID} asked for your approval.`,
			// 	notificationType: 2,
			// 	employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			// };
			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"TRAINING DEVELOPMENT",
					"",
					"form_training_module",
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
		const id = $(this).attr("trainingDevelopmentModuleID");
		const feedback = $(this).attr("code") || getFormCode("TRN", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);


		//const feedback = $(this).attr("officialBusinessCode");

		// const validate = validateForm("form_change_schedule");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {

		// const action = "update";
		// const data = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"TRAINING MODULE",
			"",
			"form_training_module",
			data,
			true,
			pageContent
		);
		// const action = "update";

		// const data = getData(action, 4, "cancelform", feedback, id);

		// formConfirmation(
		// 	"cancelform",
		// 	action,
		// 	"OFFICIAL BUSINESS",
		// 	"",
		// 	"form_training_module",
		// 	data,
		// 	true,
		// 	pageContent
		// );
		// }
	});
	// ----- END CANCEL DOCUMENT -----

	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id = $(this).attr("trainingDevelopmentModuleID");
		const feedback = $(this).attr("code") || getFormCode("TRN", dateToday(), id);
		const action   = id && feedback ? "update" : "insert";
		const data     = getData(action, 0, "save", feedback, id);

		// const feedback = $(this).attr("officialBusinessCode") ?
		// 	$(this).attr("officialBusinessCode") :
		// 	generateCode(
		// 		"TRN",
		// 		false,
		// 		" hris_training_development_module",
		// 		"officialBusinessCode",
		// 	);

		// const action = id && feedback ? "update" : "insert";

		// const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"TRAINING DEVELOPMENT",
			"",
			"form_training_module",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----
	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id 				= decryptString($(this).attr("trainingDevelopmentModuleID"));
		const feedback 			= $(this).attr("code") || getFormCode("TRN", dateCreated, id);
		let tableData 			= getTableData(" hris_training_development_module", "", "trainingDevelopmentModuleID = " + id);
		if (tableData) {
			let approversID 	= tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate 	= tableData[0].approversDate;
			let employeeID 		= tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data 							= getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] 	= updateApproveStatus(approversStatus, 2);
			let dateApproved 					= updateApproveDate(approversDate)
			data["tableData[approversDate]"] 	= dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID: 					123,
					tableID:                 	id,
					notificationTitle: 			"Training Development",
					notificationDescription: 	`${getFormCode("TRN", createdAt, id)}: Your request has been approved.`,
					notificationType: 			7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID: 					123,
					tableID:                 	id,
					notificationTitle: 			"Training Development",
					notificationDescription: 	`${employeeFullname(employeeID)} asked for your approval.`,
					notificationType: 			2,
					employeeID: 				getNotificationEmployeeID(approversID, approversDate),
				};
			}
			data["tableData[trainingDevelopmentModuleStatus]"] = status;

			// let data = getData("update", 2, "approve", feedback, id);
			// data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			// data["tableData[approversDate]"] = updateApproveDate(approversDate);

			// let status = isImLastApprover(approversID, approversDate) ? 2 : 1;
			// data["tableData[trainingDevelopmentModuleStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"TRAINING MODULE",
					"",
					"form_training_module",
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
		const id = $(this).attr("trainingDevelopmentModuleID");
		const feedback =  $(this).attr("code") || getFormCode("TRN", dateToday(), id);

		$("#modal_training_module_content").html(preloader);
		$("#modal_training_module .page-title").text("DENY OFFICIAL BUSINESS DOCUMENT");
		$("#modal_training_module").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="trainingDevelopmentModuleRemarks"
					name="trainingDevelopmentModuleRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-trainingDevelopmentModuleRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			trainingDevelopmentModuleID="${id}"
			officialBusinessCode="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_training_module_content").html(html);
	})

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id = decryptString($(this).attr("trainingDevelopmentModuleID"));
		const feedback = $(this).attr("code") || getFormCode("TRN",dateToday(), id);

		const validate = validateForm("modal_training_module");
		if (validate) {
			let tableData = getTableData("hris_training_development_module", "", "trainingDevelopmentModuleID = " + id);
			if (tableData) {
				let approversID 			= tableData[0].approversID;
				let approversStatus 		= tableData[0].approversStatus;
				let approversDate 			= tableData[0].approversDate;
				let employeeID 				= tableData[0].employeeID;
				let createdAt       		= tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[trainingDevelopmentModuleRemarks]"] = $("[name=trainingDevelopmentModuleRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"] = updateApproveDate(approversDate);

				let notificationData = {
					moduleID: 					123,
					tableID: 				 	id,
					notificationTitle: 			"Training Development",
					notificationDescription: 	`${getFormCode("TRN", createdAt, id)}: Your request has been denied.`,
					notificationType: 			1,
					employeeID,
				};

				setTimeout(() => {
				formConfirmation(
					"reject",
					"update",
					"TRAINING MODULE",
					"modal_training_module",
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


	// $(document).on("change", ".officialBusinessDate" ,function(){
	// 	let thisValue       =   $(this).val();
	// 	let thisValueSplit  =   thisValue.split(" - ");
	
	// 	// from = start.format('YYYY-MM-DD 00:00:00');
	// 	//               to = end.format('YYYY-MM-DD 23:59:59');
	
	// 	let fromDate        =  new Date(thisValueSplit[0]); 	
	// 	let toDate          =  new Date(thisValueSplit[1]);
	// 	let numberOfDays    =  Math.round((toDate-fromDate)/(1000*123*123*24));
	// 	$("#loanFormNoOfDays").val(numberOfDays);
	// })

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
