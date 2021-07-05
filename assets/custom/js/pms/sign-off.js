$(document).ready(function() {
    
    // ----- GLOBAL VARIABLE -----
    const allowedUpdate  = isUpdateAllowed(52);
	const moduleApprover = getModuleApprover(52);

	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

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


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"pms_sign_off_tbl", 
				"reviseSignOffID", 
				"reviseSignOffID IS NOT NULL AND signOffStatus != 4");
			return revisedDocumentsID.map(item => item.reviseSignOffID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
    const getSignOffContent = async (signOffID) => {
		let result = [];
        $.ajax({
            method:   "POST",
            url:      "sign_off/getSignOffContent",
            data:     { signOffID },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
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
                        id && isFinite(id) && loadData(id, true);
                } else {
                    const isAllowed = isCreateAllowed(52);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false, isRevise = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}pms/sign_off?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id && isRevise) {
                window.history.pushState("", "", `${base_url}pms/sign_off?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}pms/sign_off?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/sign_off`);
        }
    }
    // ----- END VIEW DOCUMENT -----

	
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

        if ($.fn.DataTable.isDataTable("#tableDeliverables1")) {
			$("#tableDeliverables1").DataTable().destroy();
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
					{ targets: 9,  width: 200 },
					{ targets: 10, width: 80  },
					{ targets: 11, width: 200 },
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
					{ targets: 9,  width: 200 },
					{ targets: 10, width: 80  },
					{ targets: 11, width: 200 },
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

        var table = $("#tableDeliverables1")
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
					{ targets: 0,  width: "100%" }
				],
			});
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
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
				id="btnBack"
				revise="${isRevise}"
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
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
		$("#tableForApprovalParent").html(preloader);
        let signOffData = getTableData(
			`pms_sign_off_tbl AS psot 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"psot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS preparedBy",
			`psot.employeeID != ${sessionID} AND signOffStatus != 0 AND signOffStatus != 4`,
			`FIELD(signOffStatus, 0, 1, 3, 2, 4, 5), COALESCE(psot.submittedAt, psot.createdAt)`
		);

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
						<th>Date Approved</th>
						<th>Status</th>
						<th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        signOffData.map(signOff => {

            const { 
				signOffID,
				preparedBy,
				projectName,
				projectCode,
				projectCategory,
				clientName,
				phaseName,
				approversID,
				approversDate,
				approversStatus,
				createdAt,
				submittedAt,
				signOffStatus,
				signOffRemarks
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
						<div>${projectName || "-"}</div>
						<small style="color:#848482;">${projectCode || "-"}</small>
					</td>
					<td>${projectCategory || "-"}</td>
					<td>${clientName || "-"}</td>
					<td>${phaseName && phaseName != "Select Project Phase" ? phaseName : "-"}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, signOffStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
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
            $("#forApprovalTab").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END FOR APPROVAL CONTENT ------


    // ----- MY FORMS CONTENT ------
    function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let signOffData = getTableData(
			`pms_sign_off_tbl AS psot 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
			"psot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS preparedBy",
			`psot.employeeID = ${sessionID}`,
			`FIELD(signOffStatus, 0, 1, 3, 2, 4, 5), COALESCE(psot.submittedAt, psot.createdAt)`
		);

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
						<th>Date Approved</th>
						<th>Status</th>
						<th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        signOffData.map(signOff => {

            const { 
				signOffID,
				preparedBy,
				projectName,
				projectCode,
				projectCategory,
				clientName,
				phaseName,
				approversID,
				approversDate,
				approversStatus,
				createdAt,
				submittedAt,
				signOffStatus,
				signOffRemarks
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
                    <div>${projectName || "-"}</div>
                    <small style="color:#848482;">${projectCode || "-"}</small>
                </td>
                <td>${projectCategory || "-"}</td>
                <td>${clientName || "-"}</td>
                <td>${phaseName && phaseName != "Select Project Phase" ? phaseName : "-"}</td>
                <td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, signOffStatus, true))}
				</td>
                <td>${dateCreated}</td>
                <td>${dateSubmitted}</td>
                <td>${dateApproved}</td>
				<td class="text-center">
					${getStatusStyle(signOffStatus)}
				</td>
				<td>${remarks}</td>
            </tr>`;
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#myFormsTab").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END MY FORMS CONTENT ------


	// ----- GET CLIENT -----
	function getClientOptions(rClientID = 0, clientName = "", status = 0) {
		let html = '';
		if (status == "1" || status == "2") {
			clientName = clientName ||  "-";
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
		if (status == "1" || status == "2") {
			projectName = projectName || "-";
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
	const getTimelinePhases = (timelineBuilderID = 0) => {
		let result = [];
		$.ajax({
			method: "POST",
			url: "sign_off/getTimelinePhases",
			data: {timelineBuilderID},
			dataType: "json",
			async: false,
			success: function(data) {
				result = data;
			}
		})
		return result;
	}

	function getProjectPhase(rTimelineBuilderID = 0, rMilestoneBuilderID = 0, phaseName = "", status = "0") {
		let html = '';
		if (status != "0") {
			phaseName = phaseName && phaseName != "Select Project Phase" ? phaseName : "-";
			html = `<option selected>${phaseName}</option>`;
		} else {
			html = `<option selected disabled>Select Project Phase</option>`;
			
			let signOffPhases = getTableData(
				`pms_sign_off_tbl`,
				`milestoneBuilderID`,
				`signOffStatus = 1 OR signOffStatus = 2 OR signOffStatus = 5`
			)?.map(signOff => signOff.milestoneBuilderID);
			let phaseList = getTimelinePhases(rTimelineBuilderID);
			phaseList.map(phase => {
			
				const {
					milestoneBuilderID,
					phaseCode,
					phaseDescription
				} = phase;

				if (!signOffPhases.includes(milestoneBuilderID)) {
					html += `
					<option value="${milestoneBuilderID}"
						phaseCode="${phaseCode}"
						phaseDescription="${phaseDescription}"
						${milestoneBuilderID == rMilestoneBuilderID ? "selected" : ""}>${phaseDescription}</option>`;
				}
			})
		}
		return html;
	}
	// ----- END GET PROJECT PHASE -----


	// ---- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				signOffID     = "",
				signOffStatus = "",
				employeeID    = "",
				approversID   = "",
				approversDate = "",
				createdAt     = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (signOffStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						signOffID="${encryptString(signOffID)}"
						code="${getFormCode("SOF", createdAt, signOffID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (signOffStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"
							status="${signOffStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (signOffStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	signOffID="${encryptString(signOffID)}"
					// 	code="${getFormCode("SOF", createdAt, signOffID)}"
					// 	status="${signOffStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (signOffStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(signOffID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"
							status="${signOffStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (signOffStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(signOffID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"
							status="${signOffStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (signOffStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							signOffID="${encryptString(signOffID)}"
							code="${getFormCode("SOF", createdAt, signOffID)}"><i class="fas fa-ban"></i> 
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
	// ---- END FORM BUTTONS -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        $("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            signOffID,
			reviseSignOffID,
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
			phaseName,
			projectAddress,
			signOffStatus = false,
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

		const disabled = readOnly ? "disabled" : "";

		$("#btnBack").attr("signOffID", encryptString(signOffID));
        $("#btnBack").attr("status", signOffStatus);
        $("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let buttonDisplay = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? signOffID : reviseSignOffID;
		let documentHeaderClass = isRevise || reviseSignOffID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseSignOffID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseSignOffID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("SOF", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";
		let buttonAddDeleteRow = !readOnly ? `
		<button class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
		<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>` : "";

        let html = `
        <div class="">
            <div class="row px-2">
				${documentReviseNo}
                <div class="${documentHeaderClass}">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${signOffID && !isRevise ? getFormCode("SOF", createdAt, signOffID) : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="${documentHeaderClass}">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Status</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${signOffStatus && !isRevise ? getStatusStyle(signOffStatus) : "---"}
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
                                ${signOffRemarks && !isRevise ? signOffRemarks : "---"}
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
							name="clientID"
							id="clientID"
							style="width: 100%"
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
							value="${clientAddress || "-"}"
							disabled>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Code</label>
                        <input type="text" 
							class="form-control" 
							name="projectCode" 
							value="${projectCode || "-"}"
							disabled>  
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Project Name ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
							name="timelineBuilderID"
							id="timelineBuilderID"
							style="width: 100%"
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
							value="${projectCategory || "-"}"
							disabled>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Project Phase ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control validate select2"
							name="milestoneBuilderID"
							id="milestoneBuilderID"
							style="width: 100%"
							required
							${disabled}>
							${getProjectPhase(timelineBuilderID, milestoneBuilderID, phaseName, signOffStatus)}
						</select>
						<div class="invalid-feedback d-block"></div>
                    </div>
                </div>
                
				<div class="col-sm-12">
					<div class="w-100">
						<table class="table table-striped" id="${!readOnly ? "tableDeliverables" : "tableDeliverables1"}">
							<thead>
								<tr style="white-space: nowrap">
									${!readOnly ? `
									<th class="text-center">
										<div class="action">
											<input type="checkbox" class="checkboxall">
										</div>
									</th>` : ""}
									<th>Deliverables ${!disabled ? "<code>*</code>" : ""}</th>
								</tr>
							</thead>
							<tbody class="deliverablesTableBody">
								${getDeliverableRow(deliverables, readOnly)}
							</tbody>
						</table>


						<div class="w-100 d-flex justify-content-between align-items-center py-2">
							<div>
								<div class="w-100 text-left my-2">
									${buttonAddDeleteRow}
								</div>
							</div>
							<div class="font-weight-bolder" style="font-size: 1rem;"></div>
						</div>
					</div>
				</div>

				<div class="col-sm-12">
                    <div class="form-group">
                        <label><h5>Notes/Comments from the user: </h5></label>
                        <textarea rows="5" 
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="0"
                            maxlength="999999"
                            class="form-control validate" 
                            name="signOffComment" 
                            id="signOffComment" 
                            style="resize: none"
                            ${disabled}>${signOffComment || ""}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-signOffComment"></div>
                    </div>
                </div>
                
            </div>

            <div class="col-md-12 text-right mt-3 mb-3">
                ${buttonDisplay}
            </div>
        </div>
		
		<div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            initAll();
			updateTableItems();

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
	$(document).on("change", `[name="clientID"]`, function() {
		const clientID      = $(this).val();
		const clientCode    = $(`option:selected`, this).attr("clientCode");
		const clientName    = $(`option:selected`, this).attr("clientName");
		const clientAddress = $(`option:selected`, this).attr("clientAddress");

		$(`[name="clientAddress"]`).val(clientAddress);
		$(`[name="timelineBuilderID"]`).html(getProjectOptions(clientID));
		supplyProjectDetails();
		$(`[name="milestoneBuilderID"]`).html(getProjectPhase());
	})
	// ----- END SELECT CLIENT NAME -----


	// ----- SELECT PROJECT NAME -----
	function supplyProjectDetails(projectCode = "-", projectCategory = "-") {
		$(`[name="projectCode"]`).val(projectCode);
		$(`[name="projectCategory"]`).val(projectCategory);
	}

	$(document).on("change", `[name="timelineBuilderID"]`, function() {
		const timelineBuilderID = $(this).val();
		const projectCode       = $(`option:selected`, this).attr("projectCode");
		const projectName       = $(`option:selected`, this).attr("projectName");
		const projectCategory   = $(`option:selected`, this).attr("projectCategory");

		supplyProjectDetails(projectCode, projectCategory);
		$(`[name="milestoneBuilderID"]`).html(getProjectPhase(timelineBuilderID));
	})
	// ----- END SELECT PROJECT NAME -----
    

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        if ($(`#page_content .loader`).text().length == 0) {
            $("#page_content").html(preloader);
        }
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
            headerButton(true, "Add Sign-Off");
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
			showNotification("danger", "You must have atleast one or more deliverables.");
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
		let checkbox = !disabled ? `
		<td class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxrow">
			</div>
		</td>` : "";
		
		const getDescription = (description = "") => {
			return readOnly ? (description || "-") : `
			<div class="form-group mb-0">
				<input type="text"
					class="form-control validate"
					name="deliverableDescription"
					data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
					minlength="2"
					maxlength="325"
					required
					value="${description}"
					${disabled}>
				<div class="d-block invalid-feedback"></div>
			</div>`;
		}

		if (deliverables && deliverables.length > 0) {
			deliverables.map(deliverable => {
				const { description } = deliverable;
				html += `
				<tr>
					${checkbox}
					<td>
						${getDescription(description)}
					</td>
				</tr>`;
			})
		} else {
			html = `
			<tr>
				${checkbox}
				<td>
					${getDescription()}
				</td>
			</tr>`;
		}
		return html;
	}

    $(document).on("click", ".btnAddRow", function() {
        let row = getDeliverableRow();
		$(".deliverablesTableBody").append(row);
		$(`[name="deliverableDescription"]`).last().focus();
		updateTableItems();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- GET SIGN OFF DATA -----
	function getSignOffData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

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

		let data = { deliverables: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["signOffID"] = id;

			if (status != "2") {
				data["signOffStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"]    = sessionID;
			data["clientID"]      = $(`[name="clientID"]`).val();
			data["clientName"]    = $(`[name="clientID"] option:selected`).attr("clientName");
			data["clientAddress"] = $(`[name="clientID"] option:selected`).attr("clientAddress");

			data["timelineBuilderID"] = $(`[name="timelineBuilderID"]`).val();
			data["projectCode"]       = $(`[name="timelineBuilderID"] option:selected`).attr("projectCode");
			data["projectName"]       = $(`[name="timelineBuilderID"] option:selected`).attr("projectName");
			data["projectCategory"]   = $(`[name="timelineBuilderID"] option:selected`).attr("projectCategory");

			data["milestoneBuilderID"] = $(`[name="milestoneBuilderID"]`).val();
			data["phaseName"]          = $(`[name="milestoneBuilderID"] option:selected`).text();
			
			data["signOffReason"]  = $(`[name="signOffReason"]`).val()?.trim();
			data["signOffComment"] = $(`[name="signOffComment"]`).val()?.trim();

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["signOffID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"] = approversID;
					data["signOffStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["signOffStatus"] = 2;
				}
			}

			$(`.deliverablesTableBody tr`).each(function() {
				const description = $(`[name="deliverableDescription"]`, this).val()?.trim();
				data.deliverables.push({description});
			})
		} 

		return data;
	}
	// ----- END GET SIGN OFF DATA -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("signOffID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("signOffID"));
		const feedback = $(this).attr("code") || getFormCode("SOF", dateToday(), id);

		$("#modal_sign_off_content").html(preloader);
		$("#modal_sign_off .page-title").text("DENY SIGN-OFF FORM");
		$("#modal_sign_off").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="signOffRemarks"
					name="signOffRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			signOffID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_sign_off_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("signOffID"));
		const feedback = $(this).attr("code") || getFormCode("SOF", dateToday(), id);

		const validate = validateForm("modal_sign_off");
		if (validate) {
			let tableData = getTableData("pms_sign_off_tbl", "", "signOffID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"]          = "update";
				data["method"]          = "deny";
				data["signOffID"]       = id;
				data["approversStatus"] = updateApproveStatus(approversStatus, 3);
				data["approversDate"]   = updateApproveDate(approversDate);
				data["signOffRemarks"]  = $("[name=signOffRemarks]").val()?.trim();
				data["updatedBy"]       = sessionID;

				let notificationData = {
					moduleID:                52,
					tableID: 				 id,
					notificationTitle:       "Sign-Off Form",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveSignOff(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("signOffID"));
		const feedback = $(this).attr("code") || getFormCode("SOF", dateToday(), id);
		let tableData  = getTableData("pms_sign_off_tbl", "", "signOffID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getSignOffData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                52,
					tableID:                 id,
					notificationTitle:       "Sign-Off Form",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                52,
					tableID:                 id,
					notificationTitle:       "Sign-Off Form",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["signOffStatus"] = status;

			saveSignOff(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = decryptString($(this).attr("signOffID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const validate = validateForm("page_content");
		removeIsValid("#tableDeliverables");

		if (validate) {
			
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getSignOffData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data["reviseSignOffID"] = id;
					delete data["signOffID"];
				}
			}

			let approversID   = data["approversID"], 
				approversDate = data["approversDate"];

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                52,
					notificationTitle:       "Sign-Off Form",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveSignOff(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END CLICK BUTTON SUBMIT -----


	// ----- CLICK CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("signOffID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getSignOffData(action, "cancelform", "4", id, status);

		saveSignOff(data, "cancelform", null, pageContent);
	});
	// ----- END CLICK CANCEL DOCUMENT -----


	// ----- CLICK BUTTON CANCEL -----
    $(document).on("click", "#btnCancel", function() {
        const id       = decryptString($(this).attr("signOffID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getSignOffData(action, "save", "0", id);
		data["signOffStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data["reviseSignOffID"] = id;
				delete data["signOffID"];
			} else {
				data["signOffID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}

		saveSignOff(data, "save", null, pageContent);
    })
    // ----- END CLICK BUTTON CANCEL -----


	// ----- CLICK BUTTON BACK -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("signOffID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data = getSignOffData(action, "save", "0", id);
				data["signOffStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["reviseSignOffID"] = id;
					delete data["signOffID"];
				} else {
					data["signOffID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
	
				saveSignOff(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id ? "update" : "insert";
			const data   = getSignOffData(action, "save", "0", id);
			data["signOffStatus"] = 0;

			saveSignOff(data, "save", null, pageContent);
		}
	});
	// ----- END CLICK BUTTON BACK -----


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


    // ----- CONFIRMATION -----
    const getConfirmation = method => {
        const title = "Sign-Off";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE DRAFT`;
                swalText  = "Do you want to save your changes for this sign-off form?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()} FORM`;
                swalText  = "Are you sure to submit this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()} FORM`;
                swalText  = "Are you sure to approve this document?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
                break;
            case "deny":
                swalTitle = `DENY ${title.toUpperCase()} FORM`;
                swalText  = "Are you sure to deny this document?";
                swalImg   = `${base_url}assets/modal/reject.svg`;
                break;
            case "cancelform":
                swalTitle = `CANCEL ${title.toUpperCase()} FORM`;
                swalText  = "Are you sure to cancel this document?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
            case "drop":
                swalTitle = `DROP ${title.toUpperCase()} FORM`;
                swalText  = "Are you sure to drop this document?";
                swalImg   = `${base_url}assets/modal/drop.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()} FORM`;
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
    function saveSignOff(data = null, method = "submit", notificationData = null, callback = null) {
		$("#modal_sign_off").modal("hide");
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `sign_off/saveSignOff`,
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
							swalTitle = `${getFormCode("SOF", dateCreated, insertedID)} submitted successfully!`;
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
							if (method == "approve" || method == "deny") {
								$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
							}
						}
					} else {
						$("#modal_sign_off").text().length > 0 && $("#modal_sign_off").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_sign_off").text().length > 0 && $("#modal_sign_off").modal("show");
					}
				}
			}
        });
    }
    // ----- END SAVE PROJECT BUDGET -----

})