$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(114);

	function initDataTables() {

		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}
		if ($.fn.DataTable.isDataTable("#onboardingTable")) {
			$("#onboardingTable").DataTable().destroy();
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
				columnDefs: [{
						targets: 0,
						width: 50
					},
					{
						targets: 1,
						width: 200
					},
					{
						targets: 2,
						width: 250
					},
					{
						targets: 3,
						width: 300
					},
					{
						targets: 4,
						width: 120
					},
					{
						targets: 5,
						width: 150
					},
					{
						targets: 6,
						width: 120
					},
					{
						targets: 7,
						width: 200
					},
					{
						targets: 8,
						width: 120
					},
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
				columnDefs: [{
						targets: 0,
						width: 50
					},
					{
						targets: 1,
						width: 200
					},
					{
						targets: 2,
						width: 200
					},
				],
			});

		var table = $("#onboardingTable")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [{
						targets: 0,
						width: 50
					},
					{
						targets: 1,
						width: 200
					},
					{
						targets: 2,
						width: 200
					},
					{
						targets: 3,
						width: 200
					},
				],
			});
		$("#onboardingTable").DataTable().columns.adjust().draw();


	}
	initDataTables();

	function headerTabContent(display = true) {
		if (display) {
			let html = `
            <div class="bh_divider appendHeader"></div>
            <div class="row clearfix appendHeader">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Orientation </a></li>
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Checklist</a></li>
                    </ul>
                </div>
            </div>`;
			$("#headerContainer").append(html);
		} else {
			$("#headerContainer").find(".appendHeader").remove();
		}
	}

	// ----- PAGE CONTENT -----
	function pageContent(isForm = false) {
		$("#page_content").html(preloader);
		let html = `
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                <div class="table-responsive" id="tableForApprovalParent">
                </div>
            </div>
            <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                <div class="" id="tableMyFormsParent">
                </div>
            </div>
        </div>`;
		$("#page_content").html(html);
		headerTabContent();
		myChecklist();
		//headerButton(false);
	}
	//$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	pageContent();

	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;Add Onboarding</button>`;

		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);

	}
	// ----- HEADER CONTENT -----


	// ----- TABLE CONTENT -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");

		if (tab == "#forApprovalTab") {
			OrientationContent();
			//headerButton(isAdd = false);
			$(".btn-add").hide();
			$(".hiddenadd").hide();
		}
		if (tab == "#myFormsTab") {
			myChecklist();
			$(".hiddenadd").show();
			headerButton(isAdd = true);
		}
	});

	function OrientationContent() {
		//preventRefresh(false);
		$("#tableForApprovalParent").html(preloader);
		// Reset the unique datas
		uniqueData = [];

		$("#table_content").html(preloader);

		const employeeListData = getTableData(
			`hris_employee_list_tbl AS empl
            LEFT JOIN hris_department_tbl  AS dp ON empl.departmentID = dp.departmentID
            LEFT JOIN hris_designation_tbl AS dg ON empl.designationID = dg.designationID
            LEFT JOIN hris_orientation_setup_tbl AS ost ON empl.designationID = ost.designationID
            LEFT JOIN  hris_employee_list_tbl AS emplprogress ON ost.employeeID = emplprogress.employeeID
            LEFT JOIN hris_onboarding_progress_tbl AS ob ON empl.employeeID = ob.employeeID
            LEFT JOIN  hris_employee_list_tbl AS emplob ON ob.employeeID = emplob.employeeID`,
			`empl.employeeID, 
            empl.employeeProfile,
            empl.employeeUsername,
            empl.employeeEmail,
            CONCAT(empl.employeeFirstname, ' ', empl.employeeLastname) AS fullname,
            empl.employeeUnit, empl.employeeBuilding, empl.employeeStreet, empl.employeeSubdivision, empl.employeeBarangay, empl.employeeProvince, empl.employeeCity, 
            empl.employeeRegion, empl.employeeCountry, empl.employeeZipCode,empl.employeeMobile,empl.employeeEmail,
            empl.employeeHiredDate,
            dp.departmentName,
            dg.designationName,
            empl.employeeHourlyRate,
            empl.employeeStatus,
            CASE 
                WHEN ob.employeeID IS NULL THEN IFNULL(CONCAT(emplprogress.employeeFirstname,' ',emplprogress.employeeLastname),'')
	            WHEN ob.approvalCount = ob.onboardingProgressCount THEN ''
            ELSE IFNULL(CONCAT(emplob.employeeFirstname,' ',emplob.employeeLastname),'') end approval,
            CASE 
                WHEN ob.employeeID IS NOT NULL THEN ROUND((onboardingProgressCount/approvalCount)*100,0)
            else '0' END progressbar`,``,``,`ost.designationID,empl.employeeID ORDER BY ost.orientationID `
		);

		const statusStyle = (status) => {
			if (status == "0") {
				return `<span class="badge badge-outline-danger w-100">Resigned</span>`;
			} else if (status == "1") {
				return `<span class="badge badge-outline-success w-100">Active</span>`;
			} else if (status == "2") {
				return `<span class="badge badge-outline-primary w-100">Probationary</span>`;
			} else if (status == "3") {
				return `<span class="badge badge-outline-danger w-100">AWOL</span>`;
			} else if (status == "4") {
				return `<span class="badge badge-outline-info w-100">Retired</span>`;
			} else if (status == "5") {
				return `<span class="badge badge-outline-warning w-100">Suspended</span>`;
			} else {
				return `<span class="badge badge-outline-danger w-100">Terminated</span>`;
			}
		}

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space:nowrap">
                    <th>Application Code</th>
                    <th>Full Name</th>
                    <th>Designation - Department</th>
                    <th>Address</th>
                    <th>Contact No.</th>
                    <th>Email Address</th>
                    <th>Progression</th>
                    <th>Person In-Charge</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>`;

		employeeListData.map((employee, index) => {

			let {
				employeeID,
				fullname,
				employeeUnit,
				employeeBuilding,
				employeeStreet,
				employeeSubdivision,
				employeeBarangay,
				employeeProvince,
				employeeCity,
				employeeRegion,
				employeeCountry,
				employeeZipCode,
				employeeMobile,
				employeeUsername,
				employeeEmail,
				// employeeHiredDate,
				employeeProfile = "default.jpg",
				departmentName = "-",
				designationName = "-",
				employeeHourlyRate = 0,
				employeeStatus = 0,
                progressbar,
                approval,
			} = employee;

			let unique = {
				id: employeeID,
				employeeUsername,
				employeeEmail
			}
			uniqueData.push(unique);

			let profile = employeeProfile != null ? employeeProfile : "default.jpg";
			let profilePath = `${base_url}assets/upload-files/profile-images/${profile}`;
			let profileImg = `<img 
                src="${profilePath}"
                class="rounded rounded-circle"
                style="width: 50px;
                    height: 50px">`;
			let address = `${employeeUnit ? titleCase(employeeUnit)+", " : ""}${titleCase(employeeBuilding) +" "}${titleCase(employeeStreet)+", "}${titleCase(employeeSubdivision)+", "}${titleCase(employeeBarangay)+", "}${titleCase(employeeCity)+", "}${titleCase(employeeProvince)+", "}${titleCase(employeeCountry)+", "}${titleCase(employeeZipCode)}`;

			html += `
            <tr class="btnEdit" id="${encryptString(employeeID)}">
                <td>${getFormCode("EMP", "2021-04-12", employeeID)}</td>
                <td>${profileImg} <span class="ml-2">${fullname}<span></td>
                <td>
                    <div>
                        ${designationName || '-'}
                    </div>
                    <small style="color:#848482;">${departmentName || '-'}</small>
                </td>
                <td>${address}</td>
                <td>${employeeMobile}</td>
                <td>${employeeEmail}</td>
                <td>
                <div class="progress w-100" style="width:100px;height:20px;">
                <div class="progress-bar" role="progressbar" style="width: ${progressbar}%;" aria-valuenow="${progressbar}" aria-valuemin="0" aria-valuemax="100">${progressbar}%</div>
                </div>
                </td>
                <td>${approval}</td>
                <td>${statusStyle(employeeStatus)}</td>
           </tr>`;
		})
		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForApprovalParent").html(html);
			initDataTables();
			return html;
		}, 500);

	}

	function myChecklist() {
		$("#tableMyFormsParent").html(preloader);
        uniqueData = [];
		const checklistdata = getTableData("hris_checklist_tbl",
			"", "", "");
		let html = '';
		if (checklistdata.length > 0) {
		checklistdata.map((checklist, index) => {
			console.log(checklist);
			let {
				checklistID,
				checklistTitle,
				checklistDescription,
			} = checklist;

            let unique = {
                id:             checklist.checklistID, // Required
                checklistTitle: checklist.checklistTitle,
            }
            uniqueData.push(unique);

			html += `
                    <div class="card text-white mb-3 btnEditChecklist pointer"id="${checklistID}" style="max-width: 36.5rem; background-color: #5D6161;">
                        <div class="card-body pointer"style="min-height: 20rem;max-height: 20rem;">
                            <h3 class="card-title">#${checklistID}: ${checklistTitle}</h3>
                            <div class="overflow-auto mb-3"style="min-height: 15rem;max-height: 15rem;text-align:justify">
                            <p class="card-text">${checklistDescription}</p>
                            </div>
                        </div>
                    </div>
                `;
            })
        }else{
            html += `
            <div class="text-center">
				<div class="row">
				<div class="col-4"></div>
				<div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">No data available</h6>
                <p class="text-center">Click "Add Checklist" to add a new checklist.</p>
				</div>
				<div class="col-4"></div>
			</div>
            </div>`;
        }       
		html += `
            </tbody>
        </table>`;
		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			return html;
		}, 500);
	}
	//OrientationContent();
	// ----- END TABLE CONTENT -----
	// edit function 
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));;
		headerTabContent(display = false);
		headerButton(isAdd = false);
		$("#btnBack").attr("checklistID", id);
		$("#btnBack").attr("status", 2);
		//headerButton();
		$("#page_content").html(preloader);
		setTimeout(() => {
			const employeeData = getTableData(
				`hris_employee_list_tbl`,
				`*`,
				`employeeID = ${id}`
			);
			// console.log(employeeData[0].designationID);
			if (employeeData) {
				try {
					const content = formContent(employeeData[0]);


				} catch (error) {
					showNotification("danger", `${error}`);
					let html = `
                        <div class="w-100 text-center text-danger py-5">
                            <h5 style="font-weight: bold; font-size: 1.2rem;">${error}</h5>
                        </div>`;
					//$("#modal_employee_module_content").html(html);
				}
			} else {
				showNotification("danger", "There was an error fetching employee data.");
			}


		}, 500);
		//alert(id);

	})

	function formContent(data = false) {

		$("#page_content").html(preloader);
		var designationID = data.designationID;
		var employeeID = data.employeeID;

		let button = data ?
			`
    <button 
        class="btn btn-update px-5 p-2" 
        id="btnUpdate" 
        employeeID="${encryptString(data.employeeID)}"><i class="fas fa-save"></i>
        Update
    </button>` :
			`
    <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
        <div class="modal-body">
            <ul class="nav nav-tabs nav-tabs-bottom nav-justified border" id="addtabs">
                <li class="nav-item">
                    <a class="nav-link border active" href="#information-tab" data-toggle="tab" style="border-bottom: none;">Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#account-tab" data-toggle="tab" style="border-bottom: none;min-width:165px;">Family Background</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#dependent-tab" data-toggle="tab" style="border-bottom: none;min-width:205px;">Dependent's Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#gov-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Government ID Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#employeeHistory-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Employee History</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#educationalattent-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Educational Attainment</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#organization-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Organizations Joined </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#exam-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Exam Taken </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#seminar-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Seminars </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#characterReference-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Character Reference </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link border" href="#onboarding-tab" data-toggle="tab" style="border-bottom: none;min-width: 220px;">Onboarding Module</a>
                </li>
            </ul>
            <div class="tab-content pt-4" style="min-height: 28vh;">
                <div class="tab-pane show active" id="information-tab">
                    ${employeeInformationTab(data)}
                </div>
                <div class="tab-pane" id="account-tab">
                    ${employeeAccountTab(data)}
                </div>
                <div class="tab-pane" id="dependent-tab">
                    ${dependentInformation(data)}
                </div>
                <div class="tab-pane" id="gov-tab">
                    ${govTab(data)}
                </div>
                <div class="tab-pane" id="employeeHistory-tab">
                    ${employeeHistoryTab(data)}
                </div>
                <div class="tab-pane" id="educationalattent-tab">
                    ${educationalAttainment(data)}
                </div>
                <div class="tab-pane" id="organization-tab">
                    ${organizationJoined(data)}
                </div>
                <div class="tab-pane" id="exam-tab">
                    ${examTaken(data)}
                </div>
                <div class="tab-pane" id="seminar-tab">
                    ${seminar(data)}
                </div>
                <div class="tab-pane" id="characterReference-tab">
                    ${characterReference(data)}
                </div>
                <div class="tab-pane" id="onboarding-tab">
                <div class="col-sm-12">
                <div class="w-100">
                <table class="table table-bordered table-striped table-hover" id="onboardingTable">
                 <thead>
                     <tr style="white-space:nowrap">
                         <th>Orientation Name</th>
                         <th>Accountable Person</th>
                         <th>Date</th>
                         <th>Status</th>
                     </tr>
                 </thead>
                 <tbody>
                    ${onboardingTab(designationID,employeeID)}
                    </tbody>
                </table>  
                </div> 
                </div>
                </div>
                </div>    
                </div>
            </div>
           
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel btnCancel px-5 p-2" id="btnOnboardingCancel" ><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			datevalidated();
			return html;
		}, 300);

		// ----- END REMOVE PROFILE IMAGE -----

		// ----- EMPLOYEE INFORMATION TAB  first tab-----
		function employeeInformationTab(data = false) {

			let {
				employeeID = "",
					employeeProfile = "default.jpg",
					employeeFirstname = "",
					employeeMiddlename = "",
					employeeLastname = "",
					employeeBirthday = "",
					employeeGender = "",
					employeeCitizenship = "",
					employeeCivilStatus = "",
					employeeHiredDate = "",
					employeeRegion = "",
					employeeProvince = "",
					employeeCity = "",
					employeeBarangay = "",
					employeeUnit = "",
					employeeBuilding = "",
					employeeStreet = "",
					employeeSubdivision = "",
					employeeCountry = "",
					employeeZipCode = "",
					departmentID = "",
					designationID = "",
					employeeEmail = "",
					employeeMobile = "",
					employeeStatus = "",
			} = data;

			let profile = employeeProfile != null ? employeeProfile : "default.jpg";
			//const disabledHiredDate = employeeHiredDate ? "disabled" : "";
			// const disabledHiredDate = "";

			let html = `
        <div class="forms-group">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 pb-4">

                            <div class="d-flex justify-content-center flex-column align-items-center">
                                <div class="img-fluid" id="previewImageParent">
                                    <span class="${profile != "default.jpg" && allowedUpdate ? "d-block" : "d-none"}" id="removeProfile">x</span>
                                    <img class="rounded" id="previewImage" src="${base_url}assets/upload-files/profile-images/${profile}">
                                </div>
                                <div>
                                    <input 
                                        type="file"
                                        class="form-control"
                                        disabled
                                        name="employeeProfile"
                                        id="employeeProfile"
                                        default="${profile}"
                                        accept=".png, .svg, .jpg, .jpeg, .gif">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>First Name </label>
                                        <input type="text"
                                            class="form-control"
                                            disabled
                                            name="employeeFirstname"
                                            id="employeeFirstname"
                                            autocomplete="off"
                                            value="${employeeFirstname}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Middle Name</label>
                                        <input type="text"
                                            class="form-control"
                                            disabled
                                            name="employeeMiddlename"
                                            id="employeeMiddlename"
                                            autocomplete="off"
                                            value="${employeeMiddlename ?? ""}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeMiddlename"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Last Name </label>
                                        <input type="text"
                                            class="form-control"
                                            disabled
                                            name="employeeLastname"
                                            id="employeeLastname"
                                            autocomplete="off"
            
                                            value="${employeeLastname}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeLastname"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Birthdate </label>
                                        <input type="button"
                                            class="form-control daterange text-left"
                                            disabled
                                            name="employeeBirthday"
                                            id="employeeBirthday"
                                            autocomplete="off"
            
                                            value="${employeeBirthday ? moment(employeeBirthday).format("MMMM DD, YYYY") : ""}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeBirthday"></div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Birth Place </label>
                                        <input type="text"
                                            class="form-control text-left"
                                            disabled
                                            name=""
                                            id=""
                                            autocomplete="off"
                                            value="">
                                        <div class="invalid-feedback d-block" id="invalid-"></div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Age </label>
                                        <input type="text"
                                            class="form-control text-left"
                                            disabled
                                            name="age"
                                            id="age"
                                            autocomplete="off"
                                            value="">
                                        <div class="invalid-feedback d-block" id="invalid-"></div>
                                    </div>
                                </div>

                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Gender </label>
                                        <div class="d-flex align-items-center">
                                            <div style="flex: 1">
                                                <input type="radio" value="Female" disabled name="employeeGender" ${employeeGender ? (employeeGender == "Female" ? "checked" : "") : "checked"}> <span>Female</span>
                                            </div>
                                            <div class="px-2" style="flex: 1">
                                                <input type="radio" value="Male" disabled name="employeeGender" ${employeeGender == "Male" ? "checked" : ""}> <span>Male</span>
                                            </div>
                                            <div class="d-flex" style="flex: 3">
                                                <div class="d-flex align-items-center pr-2">
                                                    <input type="radio" value="Others" name="employeeGender" ${employeeGender ? (employeeGender != "Male" && employeeGender != "Female" ? "checked" : "") : ""}> <span class="ml-2">Others</span>
                                                </div>
                                                <div class="form-group mb-0">
                                                    <input 
                                                        type="text" 
                                                        class="form-control ml-2"
                                                        disabled 
                                                        placeholder="Please Specify" name="employeeOtherGender"
                                                        id="employeeOtherGender"
                                                        ${employeeGender ? (employeeGender == "Male" || employeeGender == "Female" ? "disabled" : "") : "disabled"}
                                                        value="${employeeGender == "Male" || employeeGender == "Female" ? "" : employeeGender}">
                                                    <div class="invalid-feedback" id="invalid-employeeOtherGender"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-employeeGender"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Department </label>
                                        <select class="form-control select2"
                                            disabled
                                            style="width: 100%"
                                            name="departmentID"
                                            id="departmentID">
                                            <option value="" selected disabled>Select Department</option>
                                           
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-departmentID"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Designation </label>
                                        <select class="form-control select2"
                                            disabled
                                            style="width: 100%"
                                            name="designationID"
                                            id="designationID">
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-designationID"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Citizenship </label>
                                        <input type="text"
                                            class="form-control"
                                            disabled
                                            name="employeeCitizenship"
                                            id="employeeCitizenship"
                                            minlength="1"
                                            maxlength="10"
                                            autocomplete="off"
                                            value="${employeeCitizenship}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeCitizenship"></div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Civil Status </label>
                                        <input type="text"
                                        class="form-control"
                                        disabled
                                        name="employeeCivilStatus"
                                        id="employeeCivilStatus"
                                        minlength="1"
                                        maxlength="10"
                                        autocomplete="off"
                                        value="${employeeCivilStatus}">
                                        <div class="invalid-feedback d-block" id="invalid-employeeLastname"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Region </label>
                        <input type="text"
                        class="form-control"
                        disabled
                        name="employeeRegion"
                        id="employeeRegion"
                        autocomplete="off"
                        value="${employeeRegion}">
                        <div class="invalid-feedback d-block" id="invalid-employeeRegion"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Province </label>
                        <input type="text"
                        class="form-control"
                        disabled
                        name="employeeProvince"
                        id="employeeProvince"
                        autocomplete="off"
                        value="${employeeProvince}">
                        <div class="invalid-feedback d-block" id="invalid-employeeProvince"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>City/Municipality </label>
                        <input type="text"
                        class="form-control"
                        disabled
                        name="employeeCity"
                        id="employeeCity"
                        autocomplete="off"
                        value="${employeeCity}">
                        <div class="invalid-feedback d-block" id="invalid-employeeCity"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Barangay </label>
                        <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBarangay"
                        id="employeeBarangay"
                        autocomplete="off"
                        value="${employeeBarangay}">
                        <div class="invalid-feedback d-block" id="invalid-employeeBarangay"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Unit No.</label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeUnit"
                            id="employeeUnit"
                            autocomplete="off"
                            value="${employeeUnit ?? ""}">
                        <div class="invalid-feedback d-block" id="invalid-employeeUnit"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Building/House No. </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeBuilding"
                            id="employeeBuilding"
                            autocomplete="off"
                            value="${employeeBuilding}">
                        <div class="invalid-feedback d-block" id="invalid-employeeBuilding"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Street Name </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeStreet"
                            id="employeeStreet"
                            autocomplete="off"
                            value="${employeeStreet}">
                        <div class="invalid-feedback d-block" id="invalid-employeeStreet"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Subdivision Name </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeSubdivision"
                            id="employeeSubdivision"
                            autocomplete="off"
                            value="${employeeSubdivision}">
                        <div class="invalid-feedback d-block" id="invalid-employeeSubdivision"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Country </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeCountry"
                            id="employeeCountry"
                            autocomplete="off"
                            value="${employeeCountry}">
                        <div class="invalid-feedback d-block" id="invalid-employeeCountry"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Zip Code </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeZipCode"
                            id="employeeZipCode"
                            autocomplete="off"
                            value="${employeeZipCode}">
                        <div class="invalid-feedback d-block" id="invalid-employeeZipCode"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Telephone Number </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeZipCode"
                        id="employeeZipCode"
                        autocomplete="off
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeZipCode"></div>
                </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Email Address </label>
                        <input type="email"
                            class="form-control"
                            disabled
                            name="employeeEmail"
                            id="employeeEmail"
                            autocomplete="off"
                            placeholder="sample@email.com"
                            unique="${employeeID}"
                            title="Email"
                            value="${employeeEmail}">
                        <div class="invalid-feedback d-block" id="invalid-employeeEmail"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Mobile No. </label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="0\\999-999-9999"
                            name="employeeMobile"
                            id="employeeMobile"
                            autocomplete="off"
                            value="${employeeMobile}">
                        <div class="invalid-feedback d-block" id="invalid-employeeMobile"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Religion </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeCountry"
                        id="employeeCountry"
                        autocomplete="off"
                        value="${employeeCountry}">
                    <div class="invalid-feedback d-block" id="invalid-employeeCountry"></div>
                </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Contact Person </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeCountry"
                        id="employeeCountry"
                        autocomplete="off
                        value="${employeeCountry}">
                    <div class="invalid-feedback d-block" id="invalid-employeeCountry"></div>
                </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="form-group">
                        <label>Contact No. </label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="0\\999-999-9999"
                            name="employeeMobile"
                            id="employeeMobile"
                            autocomplete="off"
                            value="${employeeMobile}">
                        <div class="invalid-feedback d-block" id="invalid-employeeMobile"></div>
                </div>        
                </div>
            </div>
        </div>`;
			return html;
		}
        
		// End of first tab

		// 2nd Tab

		// ----- EMPLOYEE ACCOUNT TAB -----
		function employeeAccountTab(data = false) {

			let {
				employeeID = "",
					employeeUsername = "",
					employeePassword = "",
			} = data;

			let html = `
            <div class="forms-group">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Father's Name </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Age </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Mother's Name </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Age </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Spouse Name </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Age </label>
                        <input type="text"
                            class="form-control text-left"
                            disabled
                            name=""
                            id=""
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-"></div>
                    </div>
                    </div>
                </div>
            </div>`;
			return html;
		}
		// ----- END EMPLOYEE ACCOUNT TAB  End 2nd Tab-----
		// -----Start of dependent Information ----
		function dependentInformation(data = false) {

			let {
				dependentName = "",
					dependentRelationship = "",
					dependentBirthday = "",
					employeeBirthday = "",
			} = data;
			let html = `
            <div class="forms-group">
                <div class="row">
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Relationship</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
                <div class="col-lg-12 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Birthday</label>
                        <input type="button"
                            class="form-control daterange text-left"
                            disabled
                            name="employeeBirthday"
                            id="employeeBirthday"
                            autocomplete="off"
                            value="${employeeBirthday ? moment(employeeBirthday).format("MMMM DD, YYYY") : ""}">
                        <div class="invalid-feedback d-block" id="invalid-employeeBirthday"></div>
                    </div>
                </div>
                </div>
            </div>`;
			return html;
		}


		// ----- EMPLOYEE PAYROLL TAB -----
		function govTab(data = false) {

			let {
				employeeBasicSalary = "",
					employeeDailyRate = "",
					employeeHourlyRate = "",
					employeeAllowance = "",
					bankID = "",
					employeeBankAccountName = "",
					employeeBankAccountNo = "",
					employeeTIN = "",
					employeeSSS = "",
					employeePhilHealth = "",
					employeePagibig = "",
			} = data;

			let html = `
        <div class="forms-group">
            <div class="row">
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                    <label>PRC ID</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name=""
                        id=""
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeePagibig"></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                    <label>Expiration Date</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name=""
                        id=""
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeePagibig"></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>SSS No.</label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="99-9999999-9"
                            name="employeeSSS"
                            id="employeeSSS"
                            placeholder="00-0000000-0"
                            value="${employeeSSS}">
                        <div class="invalid-feedback d-block" id="invalid-employeeSSS"></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Tax Identification No.</label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="999-999-999"
                            name="employeeTIN"
                            id="employeeTIN"
                            placeholder="000-000-000"
                            value="${employeeTIN}">
                        <div class="invalid-feedback d-block" id="invalid-employeeTIN"></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>PhilHealth No.</label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="99-999999999-9"
                            name="employeePhilHealth"
                            id="employeePhilHealth"
                            placeholder="00-000000000-0"
                            value="${employeePhilHealth}">
                        <div class="invalid-feedback d-block" id="invalid-employeePhilHealth"></div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Pag-IBIG MID No.</label>
                        <input type="text"
                            class="form-control inputmask"
                            disabled
                            mask="9999-9999-9999"
                            name="employeePagibig"
                            id="employeePagibig"
                            placeholder="0000-0000-0000"
                            value="${employeePagibig}">
                        <div class="invalid-feedback d-block" id="invalid-employeePagibig"></div>
                    </div>
                </div>
            </div>
        </div>`;
			return html;
		}

		function employeeHistoryTab(data = false) {

			let {
				employeeID = "",
					employeeBirthday = "",

			} = data;

			let html = `
        <div class="forms-group">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>To</label>
                <input type="button"
                    class="form-control daterange text-left"
                    disabled
                    name="employeeBirthday"
                    id="employeeBirthday"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBirthday"></div>
            </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>From</label>
                <input type="button"
                    class="form-control daterange text-left"
                    disabled
                    name="employeeBirthday"
                    id="employeeBirthday"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBirthday"></div>
            </div>
            </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Name of Employee</label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeFirstname"
                            id="employeeFirstname"
                            autocomplete="off"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
                    </div>
                </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Address</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeFirstname"
                        id="employeeFirstname"
                        autocomplete="off"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeFirstname"
                        id="employeeFirstname"
                        autocomplete="off"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Reason of Leaving</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeFirstname"
                        id="employeeFirstname"
                        autocomplete="off"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
                </div>
            </div>
            <div class="col-lg-4 col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Last Salary</label>
                    <div class="input-group">
                        <div class="input-group-prepend bg-transparent">
                        <span class="input-group-text bg-transparent border-right-0">₱</span>
                        </div>
                        <input type="text"
                            class="form-control amount"
                            disabled
                            name="employeeBasicSalary"
                            id="employeeBasicSalary"
                            value="">
                    </div>
                    <div class="invalid-feedback d-block" id="invalid-employeeBasicSalary"></div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>How Did You Hear About This Position?</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Desired Start Date</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Desired Salary</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Have you ever been dismissed from any job?</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Reason/s</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Have you even been convicted/involved in any crime?</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Reason/s </label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Are you willing to relocate? </label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Can you drive? </label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Driver's License No? </label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="form-group">
                <label>Expiration</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeFirstname"
                    id="employeeFirstname"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeFirstname"></div>
            </div>
        </div> 
        </div>  
        </div>`;
			return html;
		}

		function educationalAttainment(data = false) {

			let {
				employeeID = "",
			} = data;

			let html = `
        <div class="forms-group">
            <div class="row">
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>School Year</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Name of School</label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Course </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Extracurricular Activities </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
                </div>
            </div>
        </div>
        `;
			return html;
		}

		function organizationJoined(data = false) {

			let {
				employeeID = "",
			} = data;

			let html = `
        <div class="forms-group">
            <div class="row">
            <div class="col-lg-12 col-md-4 col-sm-12">
            <div class="form-group">
                <label>From</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeBankAccountName"
                    id="employeeBankAccountName"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
            </div>
            </div>
            <div class="col-lg-12 col-md-4 col-sm-12">
            <div class="form-group">
                <label>To</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeBankAccountName"
                    id="employeeBankAccountName"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
            </div>
            </div>
            <div class="col-lg-12 col-md-4 col-sm-12">
            <div class="form-group">
                <label>Name of Organization	</label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeBankAccountName"
                    id="employeeBankAccountName"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
            </div>
            </div>
            <div class="col-lg-12 col-md-4 col-sm-12">
            <div class="form-group">
                <label>Position </label>
                <input type="text"
                    class="form-control"
                    disabled
                    name="employeeBankAccountName"
                    id="employeeBankAccountName"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
            </div>
            </div>
            </div>
        </div>
        `;
			return html;
		}

		function examTaken(data = false) {

			let {
				employeeID = "",

			} = data;

			let html = `
                    <div class="forms-group">
                    <div class="row">
                        <div class="col-lg-12 col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Date</label>
                                <input type="text"
                                    class="form-control"
                                    disabled
                                    name="employeeBankAccountName"
                                    id="employeeBankAccountName"
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Exam Taken</label>
                                <input type="text"
                                    class="form-control"
                                    disabled
                                    name="employeeBankAccountName"
                                    id="employeeBankAccountName"
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Result </label>
                                <input type="text"
                                    class="form-control"
                                    disabled
                                    name="employeeBankAccountName"
                                    id="employeeBankAccountName"
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
			return html;
		}

		function seminar(data = false) {
			let {
				employeeID = "",
			} = data;
			let html = `
                <div class="forms-group">
                <div class="row">
                    <div class="col-lg-12 col-md-4 col-sm-12">
                        <div class="form-group">
                            <label>Date</label>
                            <input type="text"
                                class="form-control"
                                disabled
                                name="employeeBankAccountName"
                                id="employeeBankAccountName"
                                value="">
                            <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-4 col-sm-12">
                        <div class="form-group">
                            <label>Seminar</label>
                            <input type="text"
                                class="form-control"
                                disabled
                                name="employeeBankAccountName"
                                id="employeeBankAccountName"
                                value="">
                            <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-4 col-sm-12">
                        <div class="form-group">
                            <label>Position </label>
                            <input type="text"
                                class="form-control"
                                disabled
                                name="employeeBankAccountName"
                                id="employeeBankAccountName"
                                value="">
                            <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
			return html;
		}

		function characterReference(data = false) {
			let {
				employee = "",
			} = data;
			let html = `
            <div class="forms-group">
            <div class="row">
                <div class="col-lg-12 col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeBankAccountName"
                            id="employeeBankAccountName"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                    </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Position</label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeBankAccountName"
                            id="employeeBankAccountName"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                    </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Company </label>
                        <input type="text"
                            class="form-control"
                            disabled
                            name="employeeBankAccountName"
                            id="employeeBankAccountName"
                            value="">
                        <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                    </div>
                </div>
                <div class="col-lg-12 col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Number </label>
                    <input type="text"
                        class="form-control"
                        disabled
                        name="employeeBankAccountName"
                        id="employeeBankAccountName"
                        value="">
                    <div class="invalid-feedback d-block" id="invalid-employeeBankAccountName"></div>
                </div>
            </div>
            </div>
        </div>
        `;
			return html;
		}

		function onboardingTab(designationID, employeeID) {
			let html = "";
			let onBoarding = getTableData(`hris_onboarding_tbl`, `employeeID AS employeeIDDATA`, `employeeID=${employeeID}`, ``, `designationID`);
			if (onBoarding.length != 0) {
              
				//alert("with conditon of employee");
				let checkOrientation = getTableData(
					`hris_orientation_setup_tbl AS ost
                     LEFT JOIN hris_employee_list_tbl AS empl ON ost.employeeID = empl.employeeID
                     LEFT JOIN hris_onboarding_tbl AS ob ON ost.employeeID = ob.approvalEmployeeID`,
					`ost.designationID,concat(employeeFirstName,' ',employeeLastname) AS fullname
                     ,ost.orientationName,onboardingDate AS onboardingDate,onboardingStatus, ost.employeeID,ost.designationID`, `ost.designationID = ${designationID} AND  ob.employeeID=${employeeID}`, ``);
                     var countnumber = checkOrientation.map(a=> a.designationID).length
                     checkOrientation.map((item, index) => {
					let {
						orientationName = "",
							fullname = "",
							employeeID = "",
							designationID = "",
							onboardingDate = "",
							onboardingStatus = ""
					} = item;
					datevalidated();

					let disableInput = "";
					if (onboardingStatus == "3") {
						disableInput = "disabled";
					} else {

					}
                    //console.log(index);
					//checkOrientation.map(item => {
					html += `
                    <tr class="white-space: nowrap itemtablecount">
                    <td>
                       <div class="">
                        ${orientationName}
                       </div>
                    </td>
                    <td>
                    <div class="">
                        ${fullname}
                        </div>
                    </td>`;
					if (employeeID == sessionID) {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                        <div class="form-group">  
                            <input type="button" 
                            class="form-control daterange returnItemDate validate text-left"
                            countnumber="${countnumber}"
                            id="returnItemDate${index}"
                            employeeID="${employeeID}"
                            designationID="${designationID}"
                            name="returnItemDate"
                            value="${onboardingDate && moment(onboardingDate).format("MMMM DD, YYYY") || moment().format("MMMM DD, YYYY")} "
                            title="Date"
                            ${disableInput}>
                            <div class="d-block invalid-feedback" id="invalid-returnItemDate"></div>
                        </div>
                        </div>
                        </td>`;
					} else {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">  
                                <input type="button" 
                                class="form-control daterange returnItemDate validate text-left"
                                id="returnItemDate${index}"
                                countnumber="${countnumber}"
                                required
                                employeeID="${employeeID}"
                                designationID="${designationID}"
                                name="returnItemDate"
                                value="${onboardingDate && moment(onboardingDate).format("MMMM DD, YYYY") || moment().format("MMMM DD, YYYY")} "
                                disabled
                                title="Date">
                                <div class="d-block invalid-feedback" id="invalid-returnItemDate"></div>
                            </div>
                            </div>
                        </td>`;
					}
					if (employeeID == sessionID) {
						html += `<td>
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <select 
                                class="form-control select2 validate OrientationStatus" 
                                id="OrientationStatus${index}" 
                                name="OrientationStatus"
                                autocomplete="off"
                                getdepartmentid= ""${disableInput}>
                              
                                <option 
                                value="1" 
                                ${onboardingStatus && onboardingStatus == "1" && "selected"}>Pending</option>
                                <option 
                                value="2" 
                                ${onboardingStatus && onboardingStatus == "2" && "selected"}>Ongoing</option>
                                <option 
                                value="3" 
                                ${onboardingStatus && onboardingStatus == "3" && "selected"}>Accomplished</option>
                            </select>
                       </div> 
                    </div>   
                    </td>`;
					} else {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <select 
                                class="form-control select2 validate OrientationStatus" 
                                id="OrientationStatus${index}" 
                                name="departmentStatus"
                                autocomplete="off"
                                getdepartmentid= ""
                                disabled>
                                <option 
                                value="1" 
                                ${onboardingStatus && onboardingStatus == "1" && "selected"}>Pending</option>
                                <option 
                                value="2" 
                                ${onboardingStatus && onboardingStatus == "2" && "selected"}>Ongoing</option>
                                <option 
                                value="3" 
                                ${onboardingStatus && onboardingStatus == "3" && "selected"}>Accomplished</option>
                            </select>
                       </div> 
                    </div>   
                    </td>`;
					}
					html += `
                </tr>`;
				});
                //console.log(count);
			} else {
				//alert("with out conditon of employee");
				let checkOrientation = getTableData(
					`hris_orientation_setup_tbl AS ost
                     LEFT JOIN hris_employee_list_tbl AS empl ON ost.employeeID = empl.employeeID`,
					`ost.designationID,concat(employeeFirstName,' ',employeeLastname) AS fullname
                     ,ost.orientationName,'' AS onboardingDate,ost.employeeID,ost.designationID`, `ost.designationID = ${designationID}`, ``);
                     var countnumber = checkOrientation.map(a=> a.designationID).length
                     checkOrientation.map((item, index) => {

					let {
						orientationName = "",
							fullname = "",
							employeeID = "",
							designationID = "",
							onboardingDate = ""
					} = item;
					datevalidated();
					//checkOrientation.map(item => {
                       
					html += `
                    <tr class="white-space: nowrap itemtablecount">
                    <td>
                       <div class="">
                        ${orientationName}
                       </div>
                    </td>
                    <td>
                    <div class="">
                        ${fullname}
                        </div>
                    </td>`;
					if (employeeID == sessionID) {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                        <div class="form-group">  
                            <input type="button" 
                            class="form-control daterange returnItemDate validate text-left"
                            
                            id="returnItemDate${index}"
                            employeeID="${employeeID}"
                            designationID="${designationID}"
                            name="returnItemDate"
                            countnumber="${countnumber}"
                            value="${onboardingDate && moment(onboardingDate).format("MMMM DD, YYYY") || moment().format("MMMM DD, YYYY")} "
                            title="Date">
                            <div class="d-block invalid-feedback" id="invalid-returnItemDate"></div>
                        </div>
                        </div>
                        </td>`;
					} else {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">  
                                <input type="button" 
                                class="form-control daterange returnItemDate validate text-left"
                                id="returnItemDate${index}"
                                required
                                countnumber="${countnumber}"
                                employeeID="${employeeID}"
                                designationID="${designationID}"
                                name="returnItemDate"
                                value="${onboardingDate && moment(onboardingDate).format("MMMM DD, YYYY") || moment().format("MMMM DD, YYYY")}"
                                disabled
                                title="Date">
                                <div class="d-block invalid-feedback" id="invalid-returnItemDate"></div>
                            </div>
                            </div>
                        </td>`;
					}
					if (employeeID == sessionID) {
						html += `<td>
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <select 
                                class="form-control select2 validate OrientationStatus" 
                                id="OrientationStatus${index}" 
                                name="OrientationStatus"
                                autocomplete="off"
                                getdepartmentid= "">
                                <option 
                                    value="1">Pending</option>
                                <option 
                                    value="2">Ongoing</option>
                                <option 
                                value="3">Accomplished</option>
                            </select>
                       </div> 
                    </div>   
                    </td>`;
					} else {
						html += `<td>
                        <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <select 
                                class="form-control select2 validate OrientationStatus" 
                                id="OrientationStatus${index}" 
                                name="departmentStatus"
                                autocomplete="off"
                                getdepartmentid= ""
                                disabled>
                                <option 
                                    value="1">Pending</option>
                                <option 
                                    value="2">Ongoing</option>
                                <option 
                                value="3">Accomplished</option>
                            </select>
                       </div> 
                    </div>   
                    </td>`;
					}
					html += `
                </tr>`;
				});

			}
           
			return html;
		}

		// ----- OPEN ADD MODAL -----

		// ----- END OPEN ADD MODAL -----
	}
	$(document).on("click", "#btnAdd", function () {
		$("#checklist_modalheader").text("ADD CHECKLIST");
		$("#modal_checklist_module").modal("show");
		$("#modal_checklist_module_content").html(preloader);
		const content = modalContent();
		$("#modal_checklist_module_content").html(content);
		initAll();
	});



	function modalContent(data = false) {
		//console.log(data);
		let checklistID = data ? (data[0].checklistID ? data[0].checklistID : "") : "",
			checklistTitle = data ? (data[0].checklistTitle ? data[0].checklistTitle : "") : "",
			checklistDescription = data ? (data[0] ? data[0].checklistDescription : "") : "";
		let button = checklistID ? `
    <button 
        class="btn btn-update px-5 p-2" 
        id="btnChecklistUpdate" 
        rowID="${checklistID}">
        <i class="fas fa-save"></i>
        Update
    </button>` : `
    <button 
        class="btn btn-save px-5 p-2" 
        id="btnSave"><i class="fas fa-save"></i>
        Save
    </button>`;
		let html = `
    <div class="modal-body">
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Checklist Title <code>*</code></label>
                    <input 
                    type="text" 
                    class="form-control validate" 
                    name="checklistTitle" 
                    id="checklistTitle" 
                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][']["][-][_][(][)][%][&][*]" 
                    minlength="2" 
                    maxlength="100" 
                    required 
                    unique="${checklistID}"  
                    value="${checklistTitle}"
                    autocomplete="off">
                <div class="invalid-feedback d-block" id="invalid-input_checklistTitle"></div>
                </div>
            </div>
        </div>
        </div class="row">    
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Checklist Description <code>*</code></label>
                    <textarea class="form-control validate"
					minlength="1"
                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][']["][-][_][(][)][%][&][*]"
					id="checklistDescription"
					name="checklistDescription"
					required
					rows="4"
					style="resize:none;"
                    required
					>${checklistDescription}</textarea>
                <div class="invalid-feedback d-block" id="invalid-input_checklistDescription"></div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div class="modal-footer">
    ${button}
    <button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> Cancel</button>
    </div>`;
		return html;
	}

	$(document).on("click", "#btnSave", function () {

		const validate = validateForm("modal_checklist_module");
		if (validate) {
			let data = getFormData("modal_checklist_module", true);
			//data["tableData[departmentCode]"] = generateCode("DPT", false, "hris_department_tbl", "departmentCode");
			data["tableData[createdBy]"] = sessionID;
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "hris_checklist_tbl";
			data["feedback"] = $("[name=checklistTitle]").val();

			sweetAlertConfirmation("add", "Checklist", "modal_checklist_module", null, data, true, myChecklist);
		}
	});
	// ----- END SAVE MODAL -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEditChecklist", function () {
		const id = $(this).attr("id");
		const feedback = $(this).attr("feedback");
		$("#checklist_modalheader").text("EDIT CHECKLIST");
		$("#modal_checklist_module").modal("show");

		// Display preloader while waiting for the completion of getting the data
		$("#modal_checklist_module_content").html(preloader);

		const tableData = getTableData("hris_checklist_tbl", "*", "checklistID =" + id, "");
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_checklist_module_content").html(content);
				// departmentContent(tableData);
				$("#btnSaveConfirmationEdit").attr("rowID", id);
				$("#btnSaveConfirmationEdit").attr("feedback", feedback);
				initAll();
			}, 500);
		}
	});
	// ----- END OPEN EDIT MODAL -----
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_checklist_module");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Checklist",
				"modal_checklist_module"
			);
		} else {
			$("#modal_checklist_module").modal("hide");
		}
	});

	// ----- UPDATE MODAL -----
	$(document).on("click", "#btnChecklistUpdate", function () {
		const validate = validateForm("modal_checklist_module");
		const id = $(this).attr("rowID");
		if (validate) {

			let data = getFormData("modal_checklist_module", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "hris_checklist_tbl";   
			data["whereFilter"] = "checklistID =" + id;
			data["feedback"] = $("[name=checklistTitle]").val();

			sweetAlertConfirmation(
				"update",
				"Checklist",
				"modal_checklist_module",
				"",
				data,
				true,
				myChecklist

			);
		}

	});
	// ----- END UPDATE MODAL --

	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id = $(this).attr("checklistID");
		// /const feedback = $(this).attr("code") || getFormCode("INRR", dateToday(), id);
		const status = $(this).attr("status");

		if (status != "false" && status != 0) {
			//alert("1");
			$("#page_content").html(preloader);
			$("#btnBack").hide();

			pageContent();
			$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");

		}

	});
	// ----- END CLOSE FORM -----

	function datevalidated() {
		$(".returnItemDate").each(function () {
			const elementID = $(this).attr("id");
			const dateBorrowed = `#${$(this).attr("dateBorrowed")}`;
			const minDateOptions = {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				minDate: moment(dateBorrowed).format("MMMM DD, YYYY"),
			}
			initDateRangePicker(elementID, minDateOptions);
		})
	}


	$(document).on("click", "#btnUpdate", function () {
		let validate = validateForm("modal_checklist_module");
		const id = decryptString($(this).attr("employeeid"));
        var countapprovar = $(".returnItemDate").attr("countnumber");
		var onboardingDate = [];
		var OnboardingStatus = [];
		var OnboardingEmployeeID = [];
		var designationID = [];

		$(".returnItemDate").each(function () {
			onboardingDate.push(moment($(this).val()).format("YYYY-MM-DD HH:mm:ss"));
		});
		//onboardingDate = moment(onboardingDate).format("YYYY-MM-DD HH:mm:ss");
		$(".OrientationStatus").each(function () {
			OnboardingStatus.push($(this).val());
		});
		$(".returnItemDate").each(function () {
			OnboardingEmployeeID.push($(this).attr("employeeID"));
		});
		$(".returnItemDate").each(function () {
			designationID.push($(this).attr("designationID"));
		});
		// const dateBorrowed = moment(formatdate).format("YYYY-MM-DD HH:mm:ss");
		Swal.fire({
			title: 'ORIENTATION',
			text: 'Are you sure that you want to update the status of the orientation for this employee?',
			imageUrl: `${base_url}assets/modal/update.svg`,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: 'Custom image',
			showCancelButton: true,
			confirmButtonColor: '#dc3545',
			cancelButtonColor: '#1a1a1a',
			cancelButtonText: 'No',
			confirmButtonText: 'Yes',
			allowOutsideClick: false
		}).then((result) => {
			if (result.isConfirmed) {
				preventRefresh(false);
				$.ajax({
					url: `${base_url}hris/On_boarding/updaterecord`,
					method: "POST",
					data: {
						id: id,
						designationID:          designationID,
						onboardingDate:         onboardingDate,
						OnboardingStatus:       OnboardingStatus,
						OnboardingEmployeeID:   OnboardingEmployeeID,
                        countapprovar:          countapprovar,
					},
					async: true,
					dataType: "json",
					beforeSend: function () {
						$("#loader").show();
					},
					success: function (data) {
						$("#loader").hide();

						setTimeout(() => {
							let swalTitle = `Orientation status updated successfully!`;
							Swal.fire({
								icon: "success",
								title: swalTitle,
								showConfirmButton: false,
								timer: 2000,
							}).then(() => {
								$("#loader").show();
								setTimeout(function () {
									pageContent();
									$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
									$("#loader").hide();
									//window.location.reload(1);
									//window.location.href = window.location.href + 'redirect=forApprovalTab]';
								}, 1);
							})


						}, 1);
					}
				})
			} else {
				preventRefresh(false);
			}

		});
		//console.log(OnboardingEmployeeID);

	});
	$(document).on("click", "#btnOnboardingCancel", function () {
		$("#page_content").html(preloader);
		$("#btnBack").hide();

		pageContent();
		$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");

		// }

	});
	// ----- END CLOSE FORM -----







});