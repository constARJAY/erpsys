$(document).ready(function() {
    
    // ----- GLOBAL VARIABLE -----
    const allowedUpdate = isUpdateAllowed(52);

	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}

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
    // ----- END GLOBAL VARIABLE -----


    // ----- VIEW DOCUMENT -----
    const getSignOffContent = async (signOffID) => {
        let result = [
			{
				signOffID:       "1",
				employeeID:      "1",
				createdAt:       moment(new Date).format("MMMM DD, YYYY hh:mm:ss A"),
				submittedAt:     moment(new Date).format("MMMM DD, YYYY hh:mm:ss A"),
				approversID:     "1|2|3",
				approversDate:   "",
				approversStatus: "",
				preparedBy:      "Arjay Diangzon",
				clientCode:      "CLT-21-00001",
				clientName:      "BlackCoders",
				projectCode:     "PRJ-21-00001",
				projectName:     "ERP System",
				projectCategory: "Infrustructure",
				projectPhase:    "Phase 1",
				projectAddress:  "Pasig City",
				signOffStatus:   "0",
				signOffRemarks:  "",
				signOffReason:   "",
				signOffComment:  "",
				deliverables: [
					{
						description: "test 1",
					},
					{
						description: "test 2",
					},
					{
						description: "test 3",
					},
				]
			}
		];
        // $.ajax({
        //     method:   "POST",
        //     url:      "sign_off/getSignOffContent",
        //     data:     { signOffID },
        //     async:    false,
        //     dataType: "json",
        //     success: function(data) {
        //         result = [data];
        //     }
        // })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false) {
        const loadData = (id) => {
            const data = getSignOffContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            signOffStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            if (signOffStatus == 0 || signOffStatus == 4) {
                                isAllowed = false;
                            }
                        } else if (employeeID == sessionID) {
                            if (signOffStatus == 0) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (employeeID == sessionID) {
                                pageContent(true, tableData, isReadOnly);
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
                } else {
                    showNotification("danger", "There was an error fetching the data.");
                    pageContent();
                    updateURL();
                }
            });
        }

        if (view_id) {
            let id = view_id;
                id && isFinite(id) && loadData(id);
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
                        id && isFinite(id) && loadData(id);
                } else {
                    const isAllowed = isCreateAllowed(52);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}pms/sign_off?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}pms/sign_off?view_id=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}pms/sign_off?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/sign_off`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // ----- SIGN-OFF DATA -----
    const getSignOffData = () => {
        const data = [
			{
				signOffID: "1",
				preparedBy: "Arjay Diangzon",
				projectName: "ERP System",
				projectCode: "PRJ-21-00001",
				projectCategory: "Infrustructure",
				clientName: "BlackCoders",
				projectPhase: "Phase 1",
				approversID: "1|2|3",
				approversDate: "",
				approversStatus: "",
				createdAt: new Date,
				submittedAt: new Date,
				signOffStatus: "0",
				signOffRemarks: ""
			},
			{
				signOffID: "2",
				preparedBy: "Mark Diangzon",
				projectName: "ERP System 2",
				projectCode: "PRJ-21-00002",
				projectCategory: "Infrustructure",
				clientName: "BlackCoders",
				projectPhase: "Phase 2",
				approversID: "1|2|3",
				approversDate: "",
				approversStatus: "",
				createdAt: new Date,
				submittedAt: new Date,
				signOffStatus: "1",
				signOffRemarks: ""
			},
			{
				signOffID: "3",
				preparedBy: "Charles Diangzon",
				projectName: "ERP System 3",
				projectCode: "PRJ-21-00003",
				projectCategory: "Infrustructure",
				clientName: "BlackCoders",
				projectPhase: "Phase 3",
				approversID: "1|2|3",
				approversDate: "",
				approversStatus: "",
				createdAt: new Date,
				submittedAt: new Date,
				signOffStatus: "2",
				signOffRemarks: ""
			},
			{
				signOffID: "4",
				preparedBy: "Wilson Diangzon",
				projectName: "ERP System 4",
				projectCode: "PRJ-21-00004",
				projectCategory: "Infrustructure",
				clientName: "BlackCoders",
				projectPhase: "Phase 4",
				approversID: "1|2|3",
				approversDate: "",
				approversStatus: "",
				createdAt: new Date,
				submittedAt: new Date,
				signOffStatus: "3",
				signOffRemarks: ""
			},
			{
				signOffID: "5",
				preparedBy: "Joseph Diangzon",
				projectName: "ERP System 5",
				projectCode: "PRJ-21-00005",
				projectCategory: "Infrustructure",
				clientName: "BlackCoders",
				projectPhase: "Phase 5",
				approversID: "1|2|3",
				approversDate: "",
				approversStatus: "",
				createdAt: new Date,
				submittedAt: new Date,
				signOffStatus: "4",
				signOffRemarks: ""
			},
		];
        return data;
    }
    // ----- END SIGN-OFF DATA -----

	
	// ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

        if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

        if ($.fn.DataTable.isDataTable("#tableDeliverables")) {
			$("#tableDeliverables").DataTable().destroy();
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 200 },
				],
			});

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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 200 },
				],
			});

        var table = $("#tableDeliverables")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
                sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 50     },
					{ targets: 1,  width: "100%" }
				],
			});
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(52)) {
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- HEADER TAB CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_sign_off_tbl", "approversID")) {
				let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval</a></li>
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
	// ----- END HEADER TAB CONTENT -----


    // ----- FOR APPROVAL CONTENT ------
    function forApprovalContent() {
        const signOffData = getSignOffData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableForApprroval">
                <thead>
                    <tr>
						<th>Document No.</th>
						<th>Prepared By</th>
						<th>Project Name</th>
						<th>Project Category</th>
						<th>Client</th>
						<th>Project Phase</th>
						<th>Current Approver</th>
						<th>Date Created</th>
						<th>Date Submitted</th>
						<th>Status</th>
						<th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        signOffData.map(signOff => {

            const { 
				signOffID       = "1",
				preparedBy      = "Arjay Diangzon",
				projectName     = "ERP System",
				projectCode     = "PRJ-21-00001",
				projectCategory = "projectCategory",
				clientName      = "BlackCoders",
				projectPhase    = "Phase 1",
				approversID     = "1|2|3",
				approversDate   = "",
				approversStatus = "",
				createdAt       = new Date,
				submittedAt     = new Date,
				signOffStatus,
				signOffRemarks  = ""
            } = signOff;

			let remarks       = signOffRemarks ? signOffRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = signOffStatus == 2 || signOffStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			if (isImCurrentApprover(approversID, approversDate, signOffStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView" id="${encryptString(signOffID)}">
					<td>${getFormCode("SOF", createdAt, signOffID)}</td>
					<td>${preparedBy}</td>
					<td>
						<div>${projectName}</div>
						<small style="color:#848482;">${projectCode}</small>
					</td>
					<td>${projectCategory}</td>
					<td>${clientName}</td>
					<td>${projectPhase}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, signOffStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td class="text-center">
						${getStatusStyle(signOffStatus)}
					</td>
					<td>${remarks}</td>
				</tr>`;
			}
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END FOR APPROVAL CONTENT ------


    // ----- MY FORMS CONTENT ------
    function myFormsContent() {
        const signOffData = getSignOffData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableMyForms">
                <thead>
                    <tr>
						<th>Document No.</th>
						<th>Prepared By</th>
						<th>Project Name</th>
						<th>Project Category</th>
						<th>Client</th>
						<th>Project Phase</th>
						<th>Current Approver</th>
						<th>Date Created</th>
						<th>Date Submitted</th>
						<th>Status</th>
						<th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        signOffData.map(signOff => {

            const { 
				signOffID       = "1",
				preparedBy      = "Arjay Diangzon",
				projectName     = "ERP System",
				projectCode     = "PRJ-21-00001",
				projectCategory = "projectCategory",
				clientName      = "BlackCoders",
				projectPhase    = "Phase 1",
				approversID     = "1|2|3",
				approversDate   = "",
				approversStatus = "",
				createdAt       = new Date,
				submittedAt     = new Date,
				signOffStatus,
				signOffRemarks  = ""
            } = signOff;

			let remarks       = signOffRemarks ? signOffRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = signOffStatus == 2 || signOffStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

            html += `
            <tr class="btnView" id="${encryptString(signOffID)}">
                <td>${getFormCode("SOF", createdAt, signOffID)}</td>
                <td>${preparedBy}</td>
                <td>
                    <div>${projectName}</div>
                    <small style="color:#848482;">${projectCode}</small>
                </td>
                <td>${projectCategory}</td>
                <td>${clientName}</td>
                <td>${projectPhase}</td>
                <td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, signOffStatus, true))}
				</td>
                <td>${dateCreated}</td>
                <td>${dateSubmitted}</td>
				<td class="text-center">
					${getStatusStyle(signOffStatus)}
				</td>
				<td>${remarks}</td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END MY FORMS CONTENT ------


	// ----- GET CLIENT -----
	function getClientOptions(rClientID = 0, clientName = "", status = 0) {
		let html = '';
		if (status == "2") {
			html = `<option selected>${clientName}</option>`;
		} else {
			html = `<option selected disabled>Select Client Name</option>`;

			let clientList = getTableData(`pms_client_tbl`, `*`, `clientStatus = 1`);
			clientList.map(client => {
				let address = `${client.clientUnitNumber && titleCase(client.clientUnitNumber)+", "}${client.clientHouseNumber && client.clientHouseNumber +", "}${client.clientBarangay && titleCase(client.clientBarangay)+", "}${client.clientCity && titleCase(client.clientCity)+", "}${client.clientProvince && titleCase(client.clientProvince)+", "}${client.clientCountry && titleCase(client.clientCountry)+", "}${client.clientPostalCode && titleCase(client.clientPostalCode)}`;

				const {
					clientID,
					clientCode,
					clientName
				} = client;

				html += `
				<option value="${clientID}"
					clientCode="${clientCode}"
					clientName="${clientName}"
					clientAddress="${address}"
					${clientID == rClientID ? "selected" : ""}>${clientName}</option>`;
			})
		}
		return html;
	}
	// ----- END GET CLIENT -----


	// ----- GET PROJECT OPTIONS -----
	function getProjectOptions(rClientID = 0, rTimelineBuilderID = 0, projectName = "", status = "0") {
		let html = '';
		if (status == "2") {
			html = `<option selected>${projectName}</option>`;
		} else {
			html = `<option selected disabled>Select Project Name</option>`;
			
			let projectList = getTableData(
				`pms_timeline_builder_tbl AS ptbt
					LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
					LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID`, 
				`ptbt.timelineBuilderID,
				ptbt.clientID,
				ptbt.projectID, 
				ptbt.projectCode,
				pplt.projectListName AS projectName,
				pct.categoryName AS projectCategory`, 
				`ptbt.clientID = ${rClientID} AND ptbt.timelineBuilderStatus = 2`);
			projectList.map(project => {
			
				const {
					timelineBuilderID,
					clientID,
					projectID,
					projectCode,
					projectName,
					projectCategory,
				} = project;

				html += `
				<option value="${timelineBuilderID}"
					projectID="${projectID}"
					projectCode="${projectCode}"
					projectName="${projectName}"
					projectCategory="${projectCategory}"
					${timelineBuilderID == rTimelineBuilderID ? "selected" : ""}>${projectName}</option>`;
			})
		}
		return html;
	}
	// ----- END GET PROJECT OPTIONS -----


	// ----- GET PROJECT PHASE -----
	function getProjectPhase(rTimelineBuilderID = 0, rMilestoneBuilderID = 0, projectPhase = "", status = "0") {
		let html = '';
		if (status == "2") {
			html = `<option selected>${projectPhase}</option>`;
		} else {
			html = `<option selected disabled>Select Project Phase</option>`;
			
			let phaseList = getTableData(
				`pms_timeline_task_list_tbl AS pttlt
					LEFT JOIN pms_milestone_builder_tbl AS pmbt USING (milestoneBuilderID)`,
				`pttlt.milestoneBuilderID,
				pmbt.phaseCode,
				pmbt.phaseDescription`,
				`pttlt.timelineBuilderID = ${rTimelineBuilderID}
				GROUP BY pttlt.milestoneBuilderID`
			)
			phaseList.map(phase => {
			
				const {
					milestoneBuilderID,
					phaseCode,
					phaseDescription
				} = phase;

				html += `
				<option value="${milestoneBuilderID}"
					phaseCode="${phaseCode}"
					phaseDescription="${phaseDescription}"
					${milestoneBuilderID == rMilestoneBuilderID ? "selected" : ""}>${phaseDescription}</option>`;
			})
		}
		return html;
	}
	// ----- END GET PROJECT PHASE -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        $("#page_content").html(preloader);
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            signOffID,
			employeeID = sessionID,
			createdAt,
			submittedAt,
			approversID,
			approversDate,
			approversStatus,
			preparedBy,
			clientID,
			clientCode,
			clientName,
			clientAddress = "",
			timelineBuilderID,
			milestoneBuilderID,
			projectID = "",
			projectCode,
			projectName,
			projectCategory,
			projectPhase,
			projectAddress,
			signOffStatus,
			signOffRemarks,
			signOffReason,
			signOffComment,
			deliverables = false
        } = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(employeeID);
		// ----- END GET EMPLOYEE DATA -----

        $("#btnBack").attr("status", signOffStatus);

        const disabled = readOnly ? "disabled" : "";
        const buttonDisplay = !disabled ? `
        <button class="btn btn-submit px-5 p-2" 
            id="btnSubmit"
            signOffID="${signOffID}">
            <i class="fas fa-paper-plane"></i> Submit
        </button>
        <button class="btn btn-cancel px-5 p-2" 
            id="btnCancel"
            status="${signOffStatus}">
            <i class="fas fa-ban"></i> Cancel
        </button>` : "";

        let html = `
        <div class="">
            <div class="row px-2">
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${signOffID ? getFormCode("SOF", createdAt, signOffID) : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Budget Status</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${signOffStatus ? getStatusStyle(signOffStatus) : "---"}
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
                                        ${createdAt || "---"}
                                    </h6>      
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                            <div class="card">
                                <div class="body">
                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                    <h6 class="mt-0 font-weight-bold">
                                        ${submittedAt || "---"}
                                    </h6>      
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                            <div class="card">
                                <div class="body">
                                    <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                    <h6 class="mt-0 font-weight-bold">
                                        ${getDateApproved(signOffStatus, approversID, approversDate)}
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
                                ${signOffRemarks || "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
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
                        <textarea rows="4" 
                            class="form-control validate"
                            data-allowcharacters="[0-9][a-z][A-Z][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="325"
                            style="resize: none" 
                            name="signOffReason" 
                            id="signOffReason"
							required
                            ${disabled}>${signOffReason || ""}</textarea>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </div>
				<div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Client Name ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
							name="clientName"
							id="clientName"
							required
							${disabled}>
							${getClientOptions(clientID, clientName, signOffStatus)}	
						</select>
						<div class="invalid-feedback d-block"></div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" 
							class="form-control"  
							name="clientAddress"
							value="${clientAddress}"
							disabled>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Code</label>
                        <input type="text" 
							class="form-control" 
							name="projectCode" 
							value="${projectCode}"
							disabled>  
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Name ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
							name="projectName"
							id="projectName"
							required
							${disabled}>
							${getProjectOptions(clientID, timelineBuilderID, projectName, signOffStatus)}	
						</select>
						<div class="invalid-feedback d-block"></div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Category</label>
                        <input type="text" 
							class="form-control" 
							name="projectCategory"
							value="${projectCategory}"
							disabled>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Project Phase ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
							name="projectPhase"
							id="projectPhase"
							required
							${disabled}>
							${getProjectPhase(timelineBuilderID, milestoneBuilderID, projectPhase, signOffStatus)}
						</select>
						<div class="invalid-feedback d-block"></div>
                    </div>
                </div>
                
				<div class="col-sm-12">
					<div class="w-100">
						<table class="table table-striped" id="tableDeliverables">
							<thead>
								<tr style="white-space: nowrap">
									<th class="text-center">
										<div class="action">
											<input type="checkbox" class="checkboxall">
										</div>
									</th>
									<th>Deliverables <code>*</code></th>
								</tr>
							</thead>
							<tbody class="deliverablesTableBody">
								${getDeliverableRow(deliverables, readOnly)}
							</tbody>
						</table>


						<div class="w-100 d-flex justify-content-between align-items-center py-2">
							<div>
								<div class="w-100 text-left my-2">
									<button class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
									<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
								</div>
							</div>
							<div class="font-weight-bolder" style="font-size: 1rem;"></div>
						</div>
					</div>
				</div>
                
            </div>

            <div class="col-md-12 text-right mt-3 mb-3">
                ${buttonDisplay}
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
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

        }, 500);
    }
    // ----- END FORM CONTENT -----


	// ----- SELECT CLIENT NAME -----
	$(document).on("change", `[name="clientName"]`, function() {
		const clientID      = $(this).val();
		const clientCode    = $(`option:selected`, this).attr("clientCode");
		const clientName    = $(`option:selected`, this).attr("clientName");
		const clientAddress = $(`option:selected`, this).attr("clientAddress");

		$(`[name="clientAddress"]`).val(clientAddress);
		$(`[name="projectName"]`).html(getProjectOptions(clientID));
		supplyProjectDetails();
		$(`[name="projectPhase"]`).html(getProjectPhase());
	})
	// ----- END SELECT CLIENT NAME -----


	// ----- SELECT PROJECT NAME -----
	function supplyProjectDetails(projectCode = "-", projectCategory = "-") {
		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectCategory"]`).val(projectCategory);
	}

	$(document).on("change", `[name="projectName"]`, function() {
		const timelineBuilderID = $(this).val();
		const projectCode       = $(`option:selected`, this).attr("projectCode");
		const projectName       = $(`option:selected`, this).attr("projectName");
		const projectCategory   = $(`option:selected`, this).attr("projectCategory");

		supplyProjectDetails(projectCode, projectCategory);
		$(`[name="projectPhase"]`).html(getProjectPhase(timelineBuilderID));
	})
	// ----- END SELECT PROJECT NAME -----
    

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        if ($(`#page_content .loader`).text().length == 0) {
            $("#page_content").html(preloader);
        }
        if (!isForm) {
            preventRefresh(false);
            headerButton(true, "Add Sign-Off");
			headerTabContent();
            myFormsContent();
            updateURL();
        } else {
            headerButton(false, "");
			headerTabContent(false);
            formContent(data, readOnly);
        }
    }
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const signOffID = decryptString($(this).attr("id"));
        viewDocument(signOffID);
    })
    // ----- END CLICK TIMELINE ROW -----


	// ----- CLICK ADD BUTTON -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END CLICK ADD BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow() {
		if ($(`.checkboxrow:checked`).length != $(`.checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE ROWS",
				text:               "Are you sure to delete these rows?",
				imageUrl:           `${base_url}assets/modal/delete.svg`,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes"
			}).then((result) => {
				if (result.isConfirmed) {
					$(`.checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateDeleteButton();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----


	// ----- CLICK DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
	})
	// ----- END CLICK DELETE ROW -----


	// ----- CHECKBOX EVENT -----
	$(document).on("click", "[type=checkbox]", function() {
		updateDeleteButton();
	})
	// ----- END CHECKBOX EVENT -----


	// ----- CHECK ALL -----
	$(document).on("change", ".checkboxall", function() {
		const isChecked = $(this).prop("checked");
		$(".checkboxrow").each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let count = 0;
		$(".checkboxrow").each(function() {
			this.checked && count++;
		})
		$(".btnDeleteRow").attr("disabled", count == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(`[name="deliverableDescription"]`).each(function(i) {
			$parent = $(this).closest(".form-group");
			$(this).attr("id", `deliverableDescription${i}`);
			$parent.find(".invalid-feedback").attr("id", `invalid-deliverableDescription${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- INSERT ROW ITEM -----
	function getDeliverableRow(deliverables = false, readOnly = false) {
		let html = "";
		let disabled = readOnly ? "disabled" : "";
		if (deliverables) {

		} else {
			html = `
			<tr>
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
					</div>
				</td>
				<td>
					<div class="form-group mb-0">
						<input type="text"
							class="form-control validate"
							name="deliverableDescription"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
							minlength="2"
							maxlength="325"
							required
							${disabled}>
						<div class="d-block invalid-feedback"></div>
					</div>
				</td>
			</tr>`;
		}
		return html;
	}

    $(document).on("click", ".btnAddRow", function() {
        let row = getDeliverableRow();
		$(".deliverablesTableBody").append(row);
		updateTableItems();
    })
    // ----- END INSERT ROW ITEM -----


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
        const signOffID = $(this).attr("signOffID");
        const validateInputs    = validateForm("page_content");
        if (validateInputs) {
            saveProjectBudget("submit", signOffID, pageContent);
        }
    });


    // ----- CLICK BUTTON CANCEL OR BACK -----
    $(document).on("click", "#btnCancel, #btnBack", function() {
        const status = $(this).attr("status");
        if (status == 0) {
            saveProjectBudget("cancel", null, pageContent);
        } else {
            pageContent();
        }
    })
    // ----- END CLICK BUTTON CANCEL OR BACK -----


    // ----- CONFIRMATION -----
    const getConfirmation = method => {
        const title = "Project Budget";
        let swalText, swalImg;

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
            case "uploadcontract":
                swalTitle = `UPLOAD CONTRACT`;
                swalText  = "Are you sure to upload this contract?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()}`;
                swalText  = "Are you sure to discard this process?";
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
    // ----- END CONFIRMATION -----


    // ----- SAVE PROJECT BUDGET -----
    function saveProjectBudget(method = "submit", id = null, callback = null) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    callback && callback();
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    });
                } else {

                    const data = {
                        signOffID: id,
                        allocatedBudget:   getNonFormattedAmount($(`[name="allocatedBudget"]`).val())
                    };

                    $.ajax({
                        method:      "POST",
                        url:         `sign_off/saveProjectBudget`,
                        data,
                        cache:       false,
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
                                swalTitle = `Project Budget submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} dropped successfully!`;
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    callback && callback();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
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
                }
            } else {
                if (res.dismiss == "cancel" && method != "submit") {
                    if (method != "deny") {
                        if (method != "cancelform") {
                            // callback && callback();
                        }
                    } else {
                        
                    }
                } else if (res.isDismissed) {
                    if (method == "deny") {
                        
                    }
                }
            }
        });
    }
    // ----- END SAVE PROJECT BUDGET -----

})