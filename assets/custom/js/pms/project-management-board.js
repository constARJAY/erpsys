$(document).ready(function() {
    const allowedUpdate = isUpdateAllowed(92);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("project management board");
	// ----- END MODULE APPROVER -----


    // ----- REUSABLE VARIABLE/FUNCTIONS -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}

    const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    let holidayData = getTableData(
        "hris_holiday_tbl",
        `*`,
        `holidayStatus = 1`
    );

    let employeeSchedule = null;
    // ----- END REUSABLE VARIABLE/FUNCTIONS -----


    // ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"pms_management_board_tbl", 
				"reviseManagementBoardID", 
				"reviseManagementBoardID IS NOT NULL AND managementBoardStatus != 4");
			return revisedDocumentsID.map(item => item.reviseManagementBoardID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let empID = id == "0" ? sessionID : id;
			let data = allEmployeeData.filter(employee => employee.employeeID == empID);
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


    // ----- DATATABLES -----
    function initDatatables() {
        if ($("#tableTimelineForApproval").text().trim().length > 0) {
            if ($.fn.DataTable.isDataTable("#tableTimelineForApproval")) {
                $("#tableTimelineForApproval").DataTable().destroy();
            }

            var table = $("#tableTimelineForApproval")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 150 },
					{ targets: 1, width: 180 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 250 },
					{ targets: 4, width: 250 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 300 },
					{ targets: 8, width: 150 },
					{ targets: 9, width: 150 },
				],
			});
        }

        if ($("#tableTimelineMyForms").text().trim().length > 0) {
            if ($.fn.DataTable.isDataTable("#tableTimelineMyForms")) {
                $("#tableTimelineMyForms").DataTable().destroy();
            }

            var table = $("#tableTimelineMyForms")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 150 },
					{ targets: 1, width: 180 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 250 },
					{ targets: 4, width: 250 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 300 },
					{ targets: 8, width: 150 },
					{ targets: 9, width: 150 },
				],
			});
        }

        if ($("#tableManHours").text().trim().length > 0) {
            if ($.fn.DataTable.isDataTable("#tableManHours")) {
                $("#tableManHours").DataTable().destroy();
            }

            var tableManHours = $("#tableManHours")
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
					{ targets: 0, width: 250 },
					{ targets: 1, width: 500 },
				],
			});

            $("#tableManHours").DataTable().columns.adjust().draw();
        }

        if ($(`table.projectTimeline`).text().trim().length > 0) {
            const projectTimelineLength = $(`table.projectTimeline`).length;
            for(var i=0; i<projectTimelineLength; i++) {
    
                if ($.fn.DataTable.isDataTable(`#projectTimeline${i}`)) {
                    $(`#projectTimeline${i}`).DataTable().destroy();
                }
    
                var table = $(`#projectTimeline${i}`)
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
                            { targets: 0, width: 480 },
                            { targets: 1, width: 90  },
                            { targets: 2, width: 400 },
                        ],
                    });
            }
        }
    }
    // ----- END DATATABLES -----


    // ----- VIEW DOCUMENT -----
    const getTimelineContent = async (managementBoardID) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "project_management_board/getTimelineContent",
            data:     { managementBoardID },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
            }
        })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
            const data = getTimelineContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            managementBoardStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            if (employeeID == null || employeeID == 0) {
                                if (managementBoardStatus == 0 || managementBoardStatus == 1) {
                                    isReadOnly = false;
                                } else {
                                    isReadOnly = true;
                                }
                            } else {
                                if (managementBoardStatus == 0 || managementBoardStatus == 4) {
                                    isAllowed = false;
                                }
                            }
                        } else if (employeeID == sessionID) {
                            if (managementBoardStatus == 0) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (isRevise && employeeID && employeeID == sessionID) {
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
                    const isAllowed = isCreateAllowed(92);
                    pageContent(isAllowed);
                }
            }
        }
        
    }
    // ----- END VIEW DOCUMENT -----


    // ----- UPDATE URL -----
    function updateURL(view_id = 0, isAdd = false, isRevise = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}pms/project_management_board?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id && isRevise) {
                window.history.pushState("", "", `${base_url}pms/project_management_board?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}pms/project_management_board?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/project_management_board`);
        }
    }
    // ----- END UPDATE URL -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(92)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light btnBack" 
				id="btnBack"
                revise="${isRevise}" 
				cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_management_board_tbl", "approversID")) {
				let count = getCountForApproval("pms_management_board_tbl", "managementBoardStatus");
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


    // ----- FOR APPROVAL CONTENT -----
    function forApprovalContent() {
        $("#tableForApprovalParent").html(preloader);
        /**
        ----- TIMELINE MANAGEMENT STATUS -----
        0. Draft
        1. For Assessment
        2. Assessed
        ----- END TIMELINE MANAGEMENT STATUS -----
        */

        const timelineData = getTableData(
            `pms_management_board_tbl AS pmbt
                LEFT JOIN pms_timeline_builder_tbl AS ptbt USING(timelineBuilderID)
                LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
                LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
                LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.timelineProjectManager = helt.employeeID
                LEFT JOIN hris_employee_list_tbl AS helt2 ON pmbt.employeeID = helt2.employeeID`,
            `ptbt.timelineBuilderID,
            ptbt.createdAt          ptbtCreatedAt,
            pplt.projectListName AS projectName,
            ptbt.projectCode AS     projectCode,
            pct.categoryName AS     projectCategory,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS   projectManager,
            CONCAT(helt2.employeeFirstname, ' ', helt2.employeeLastname) AS preparedBy,
            ptbt.timelineBuilderStatus,
            timelineManagementBy,
            pmbt.managementBoardID,
            pmbt.managementBoardCode,
            pmbt.managementBoardStatus,
            pmbt.approversID,
            pmbt.approversDate,
            pmbt.submittedAt,
            pmbt.managementBoardRemarks,
            pmbt.createdAt`,
            `pmbt.employeeID != ${sessionID} AND managementBoardStatus != 0 AND managementBoardStatus != 4`,
            `FIELD(managementBoardStatus, 0, 1, 3, 2, 4, 5), COALESCE(pmbt.submittedAt, pmbt.createdAt)`
        )

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimelineForApproval">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Reference No.</th>
                        <th>Project Code</th>
                        <th>Project Category</th>
                        <th>Project Manager</th>
                        <th>Current Approver</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            let { 
                managementBoardID     = 0,
                managementBoardCode   = "",
                timelineBuilderID     = 0,
                ptbtCreatedAt         = "",
                projectName           = "",
                projectCode           = "",
                projectCategory       = "",
                projectManager        = "",
                preparedBy            = "",
                approversID,
                approversDate,
                managementBoardStatus = 0,
                submittedAt,
                managementBoardRemarks,
                createdAt
            } = timeline;

            let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = managementBoardStatus == 2 || managementBoardStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

            let code = managementBoardCode || getFormCode("PMB", createdAt, managementBoardID);
			let btnClass = managementBoardStatus != 0 ? "btnView" : "btnEdit";

            if (isImCurrentApprover(approversID, approversDate, managementBoardStatus) || isAlreadyApproved(approversID, approversDate)) {
            html += `
                <tr class="${btnClass}" id="${encryptString(managementBoardID)}">
                    <td>${code}</td>
                    <td>${preparedBy || "-"}</td>
                    <td>
                        ${getFormCode("PTB", ptbtCreatedAt, timelineBuilderID)}
                    </td>
                    <td>
                        <div>${projectCode}</div>
                        <small>${projectName}</small>
                    </td>
                    <td>${projectCategory}</td>
                    <td>${projectManager}</td>
                    <td>
                        ${employeeFullname(getCurrentApprover(approversID, approversDate, managementBoardStatus, true))}
                    </td>
                    <td>
                        ${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}
                    </td>
                    <td class="text-center">
                        ${getStatusStyle(managementBoardStatus, managementBoardCode)}
                    </td>
                    <td>
                        ${managementBoardRemarks || "-"}
                    </td>
                </tr>`;
            }
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#tableForApprovalParent").html(html);
            initDatatables();
        }, 50);
    }
    // ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT ------
    function myFormsContent() {
        $("#tableMyFormsParent").html(preloader);
        /**
        ----- TIMELINE MANAGEMENT STATUS -----
        0. Draft
        1. For Assessment
        2. Assessed
        ----- END TIMELINE MANAGEMENT STATUS -----
        */

        const timelineData = getTableData(
            `pms_management_board_tbl AS pmbt
                LEFT JOIN pms_timeline_builder_tbl AS ptbt USING(timelineBuilderID)
                LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
                LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
                LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.timelineProjectManager = helt.employeeID
                LEFT JOIN hris_employee_list_tbl AS helt2 ON pmbt.employeeID = helt2.employeeID`,
            `ptbt.timelineBuilderID,
            ptbt.createdAt          ptbtCreatedAt,
            pplt.projectListName AS projectName,
            ptbt.projectCode AS     projectCode,
            pct.categoryName AS     projectCategory,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS   projectManager,
            CONCAT(helt2.employeeFirstname, ' ', helt2.employeeLastname) AS preparedBy,
            ptbt.timelineBuilderStatus,
            timelineManagementBy,
            pmbt.managementBoardID,
            pmbt.managementBoardCode,
            pmbt.managementBoardStatus,
            pmbt.approversID,
            pmbt.approversDate,
            pmbt.submittedAt,
            pmbt.managementBoardRemarks,
            pmbt.createdAt`,
            `pmbt.employeeID = 0 OR pmbt.employeeID IS NULL OR pmbt.employeeID = ${sessionID}`,
            `FIELD(managementBoardStatus, 0, 1, 3, 2, 4, 5), COALESCE(pmbt.submittedAt, pmbt.createdAt)`
        )

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimelineMyForms">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Reference No.</th>
                        <th>Project Code</th>
                        <th>Project Category</th>
                        <th>Project Manager</th>
                        <th>Current Approver</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            let { 
                managementBoardID     = 0,
                managementBoardCode   = "",
                timelineBuilderID     = 0,
                ptbtCreatedAt         = "",
                projectName           = "",
                projectCode           = "",
                projectCategory       = "",
                projectManager        = "",
                preparedBy            = "",
                approversID,
                approversDate,
                managementBoardStatus = 0,
                submittedAt,
                managementBoardRemarks,
                createdAt
            } = timeline;

            let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = managementBoardStatus == 2 || managementBoardStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

            let code = managementBoardCode || getFormCode("PMB", createdAt, managementBoardID);

			let btnClass = managementBoardStatus != 0 ? "btnView" : "btnEdit";

            html += `
            <tr class="${btnClass}" id="${encryptString(managementBoardID)}">
                <td>${code}</td>
                <td>${preparedBy || "-"}</td>
                <td>
                    ${getFormCode("PTB", ptbtCreatedAt, timelineBuilderID)}
                </td>
                <td>
                    <div>${projectCode}</div>
                    <small>${projectName}</small>
                </td>
                <td>${projectCategory}</td>
                <td>${projectManager}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, managementBoardStatus, true))}
                </td>
                <td>
                    ${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}
                </td>
                <td class="text-center">
                    ${getStatusStyle(managementBoardStatus, managementBoardCode)}
                </td>
                <td>
                    ${managementBoardRemarks || "-"}
                </td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#tableMyFormsParent").html(html);
            initDatatables();
        }, 50);
    }
    // ----- END MY FORMS CONTENT ------


    // ----- FORM BUTTON -----
    function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
        let button = "";
        if (data) {
            const {
                managementBoardID        = "",
                managementBoardCode      = "",
                reviseManagementBoardID  = "",
                timelineBuilderID        = "",
                projectCode              = "",
                timelineManagementStatus = false,
                employeeID               = "",
                approversID              = "",
                approversDate            = "",
                approversStatus          = "",
                managementBoardStatus    = "",
                createdAt                = "",
            } = data && data[0];

            let code = managementBoardCode || getFormCode("PMB", createdAt, managementBoardID);

            let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
            if (employeeID == 0 || employeeID == null || employeeID == sessionID) {
				if (managementBoardStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						managementBoardID="${encryptString(managementBoardID)}"
                        timelineBuilderID="${timelineBuilderID}"
						revise="${isRevise}"
                        code="${code}"
						cancel="${isFromCancelledDocument}"
                        status="${managementBoardStatus}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2" 
							id="btnBack"
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"
                            code="${code}"
							employeeID="${employeeID}"
                            status="${managementBoardStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel btnBack px-5 p-2"
							id="btnBack" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
							status="${managementBoardStatus}"
							cancel="${isFromCancelledDocument}"
							employeeID="${employeeID}"
                            code="${code}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}					
				} else if (managementBoardStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
                            code="${code}"
							status="${managementBoardStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (managementBoardStatus == 2) {
					// DROP
				} else if (managementBoardStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(managementBoardID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
                            code="${code}"
							status="${managementBoardStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (managementBoardStatus == 4) {
					// CANCELLED - FOR REVISE
					const data = getTableData(
						`pms_management_board_tbl`,
						`reviseManagementBoardID`,
						`reviseManagementBoardID = ${reviseManagementBoardID}`,
					);
					let isAllowedForRevise = 0;
					if (data && data.length > 0) {
						const { reviseManagementBoardID:reviseID } = data && data[0];
						isAllowedForRevise = getTableDataLength(
							`pms_management_board_tbl`,
							`reviseManagementBoardID`,
							`managementBoardStatus <> 3 AND managementBoardStatus <> 4 AND reviseManagementBoardID = ${reviseID}`
						);
					}

					if (!isDocumentRevised(managementBoardID) && isAllowedForRevise == 0) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
							status="${managementBoardStatus}"
                            code="${code}"
							cancel="true"
                            status="${managementBoardStatus}">
							<i class="fas fa-clone"></i> Revise
						</button>`;
					}
				}
			} else {
				if (managementBoardStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
                            code="${code}"
                            status="${managementBoardStatus}">
							<i class="fas fa-paper-plane"></i> Approve
						</button>
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							managementBoardID="${encryptString(managementBoardID)}"
                            timelineBuilderID="${timelineBuilderID}"
                            code="${code}"
                            status="${managementBoardStatus}">
							<i class="fas fa-ban"></i> Deny
						</button>`;
					}
				}
			}

        } else {
            button = `
			<button type="button" 
				class="btn btn-submit px-5 p-2"  
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
        }

        return button;
    }
    // ----- END FORM BUTTON -----


    // ----- GET MILESTONE DISPLAY -----
    function getMilestoneDisplay(timelineBuilderID = 0, phaseCode = "", taskID = 0, milestones = [], milestoneTask = [], teamMembers = [], columnName = "", disabled = "") {
        let taskHTML = "", manHoursHTML = "", assigneeHTML = "", totalTaskManHours = 0;

        milestones.map(milestone => {
            const { milestoneID, milestoneName } = milestone;

            // ----- TASK/MILESTONE DISPLAY -----
            taskHTML += `
            <div class="form-group my-1">
                <input class    = "form-control"
                    name        = "milestoneName"
                    taskID      = "${taskID}"
                    milestoneID = "${milestoneID}"
                    value       = "&emsp;&emsp;${milestoneName}"
                    disabled>
            </div>`;
            // ----- END TASK/MILESTONE DISPLAY -----


            // ----- MAN HOURS DISPLAY -----
            const taskData = (milestoneID = null) => {
                let data = milestoneTask.filter(mt => mt.milestoneID == milestoneID);
                let manHours              = data[0]?.manHours ?? "";
                let taskStartDate         = data[0]?.taskStartDate ?? "";
                let taskEndDate           = data[0]?.taskEndDate ?? "";
                let assignedEmployee      = data[0]?.assignedEmployee ?? "";
                let assignedDesignation   = data[0]?.assignedDesignation ?? "";
                let assignedManHours      = data[0]?.assignedManHours ?? "";
                let assignedStartDate     = data[0]?.assignedStartDate ?? "";
                let assignedEndDate       = data[0]?.assignedEndDate ?? "";
                let assignedDays          = data[0]?.assignedDays ?? "";
                let assignedRegularHours  = data[0]?.assignedRegularHours ?? "";
                let assignedOvertimeHours = data[0]?.assignedOvertimeHours ?? "";

                return {
                    manHours, 
                    taskStartDate, 
                    taskEndDate, 
                    assignedEmployee, 
                    assignedDesignation, 
                    assignedManHours, 
                    assignedStartDate, 
                    assignedEndDate, 
                    assignedDays, 
                    assignedRegularHours, 
                    assignedOvertimeHours
                };
            }

            let {
                manHours              = "", 
                taskStartDate         = "", 
                taskEndDate           = "", 
                assignedEmployee      = "", 
                assignedDesignation   = "", 
                assignedManHours      = "", 
                assignedStartDate     = "", 
                assignedEndDate       = "", 
                assignedDays          = "", 
                assignedRegularHours  = "", 
                assignedOvertimeHours = "",
            } = taskData(milestoneID);

            totalTaskManHours += (+manHours);

            manHoursHTML += `
            <div class="form-group my-1">
                <input class="form-control input-hours text-center"
                    readonly
                    timelineBuilderID = "${timelineBuilderID}"
                    value         = "${manHours || "0.00"}"
                    name          = "manHours"
                    min           = "0.00"
                    max           = "9999999999"
                    minlength     = "1"
                    maxlength     = "10"
                    taskID        = "${taskID}"
                    phase         = "${phaseCode}"
                    milestoneID   = "${milestoneID}"
                    dates         = "${assignedStartDate}"
                    employees     = "${assignedEmployee}"
                    designations  = "${assignedDesignation}"
                    manHours      = "${assignedManHours}"
                    regularHours  = "${assignedRegularHours}"
                    overtimeHours = "${assignedOvertimeHours}"
                    required>
                <div class="invalid-feedback d-block"></div>
            </div>`;
            // ----- END MAN HOURS DISPLAY -----


            // ----- ASSIGNEE DISPLAY -----
            const teamMemberOptions = teamMembers.map(member => {
                const { 
                    id, 
                    fullname, 
                    image, 
                    designation, 
                    designationName, 
                    departmentName, 
                    employeeCode 
                } = member;
                
                return `
                <option 
                    value             = "${id}"
                    fullname          = "${fullname}"
                    image             = "${image}"
                    designation       = "${designation}"
                    designationName   = "${designationName}"
                    departmentName    = "${departmentName}"
                    employeeCode      = "${employeeCode}"
                    >${fullname} - ${designationName}</option>`;
            }).join("");

            assigneeHTML += `
            <div class="form-group my-1">
                <select class="form-control validate select2"
                    timelineBuilderID   = "${timelineBuilderID}"
                    name                = "assignEmployee"
                    multiple            = "multiple"
                    phase               = "${phaseCode}"
                    taskID              = "${taskID}"
                    milestoneID         = "${milestoneID}"
                    assignedEmployee    = "${assignedEmployee}"
                    assignedDesignation = "${assignedDesignation}"
                    executeonce         = "true"
                    required
                    ${disabled}>
                    <option disabled>${!disabled ? "Select Employee" : "-"}</option>
                    ${teamMemberOptions}
                </select>
                <div class="invalid-feedback d-block"></div>
            </div>`;
            // ----- END ASSIGNEE DISPLAY -----
        })

        if (columnName == "task") {
            return taskHTML;
        } else if (columnName == "man hours") {
            return manHoursHTML;
        } else if (columnName == "assignee") {
            return assigneeHTML;
        } else if (columnName == "total man hours") {
            return totalTaskManHours;
        } else {
            return "";
        }
    }
    // ----- END GET MILESTONE DISPLAY -----


    // ----- GET TASK DISPLAY -----
    function getTaskDisplay(timelineBuilderID = 0, phaseCode = "", milestones = [], task = {}, teamMembers = [], disabled = "") {
        let html = "";
        if (task) { 
            const { taskID, taskName, manHours, taskStartDate, taskEndDate, milestoneTask = [] } = task;

            let taskDisplay       = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "task", disabled);
            let manHoursDisplay   = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "man hours", disabled);
            let assigneeDisplay   = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "assignee", disabled);
            let totalTaskManHours = getMilestoneDisplay(timelineBuilderID, phaseCode, taskID, milestones, milestoneTask, teamMembers, "total man hours", disabled);

            html += `
            <tr class="phase">
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-between btnCaret" 
                        phase   = "${phaseCode}"
                        taskID  = "${taskID}"
                        display = "false"
                        style="cursor: pointer;
                            min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            width:      100%;
                            padding:    1rem;
                            position:   absolute;
                            top:        0">
                        <span class="taskName" taskID="${taskID}">${taskName}</span>
                        &nbsp;&nbsp;<i class="fad fa-caret-down mr-3" caret="true"></i>
                    </div>
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "margin-top: 70px;">
                        ${taskDisplay}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            padding:    1rem;
                            position:   absolute;
                            top:        0">
                        <input type="text" 
                            class         = "form-control input-hours text-center" 
                            name          = "taskManHours"
                            value         = "${totalTaskManHours || "0.00"}"
                            manHours      = "${manHours || "0.00"}" 
                            basis         = "true"
                            phase         = "${phaseCode}"
                            taskID        = "${taskID}"
                            remaining     = "${manHours || 0}"
                            taskStartDate = "${taskStartDate || ""}"
                            taskEndDate   = "${taskEndDate || ""}"
                            disabled>
                    </div>
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "margin-top: 70px;">
                        ${manHoursDisplay}
                    </div>
                </td>
                <td style="position: relative;">
                    <div class="d-flex align-items-center justify-content-start" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}"
                        style  = "min-height: 70px;
                            height:     auto;
                            max-height: 70px;
                            padding:    1rem;
                            top:        0">
                        <div class="assignedMembers" 
                            taskID = "${taskID}" 
                            phase  = "${phaseCode}"
                            style = "position: absolute;
                                top: 0;
                                margin-top: 10px;">
                            <span>No data available yet.</span>
                        </div>
                    </div>
                    
                    <div class="d-none taskContent" 
                        phase  = "${phaseCode}"
                        taskID = "${taskID}">
                        ${assigneeDisplay}
                    </div>
                </td>
            </tr>`;
        }
        return html;
    }
    // ----- END GET TASK DISPLAY -----


    // ----- GET PHASE DISPLAY -----
    function getPhaseDisplay(timelineBuilderID = 0, teamMembers = [], phase = {}, index = 0, disabled = "") {
        const {
            phaseDescription,
            phaseCode,
            milestones = [],
            tasks      = []
        } = phase;

        let taskHTML = "";
        tasks.map(task => {
            taskHTML += getTaskDisplay(timelineBuilderID, phaseCode, milestones, task, teamMembers, disabled);
        })

        let html = `
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                        ${phaseDescription}
                    </div>
                    <small><b>${phaseCode}</b></small>
                </div>

                <div class="w-100">
                    <table class="table projectTimeline" id="projectTimeline${index}">
                        <thead>
                            <tr class="bg-dark">
                                <th class="text-white">Tasks</th>
                                <th class="text-white">Man Hours</th>
                                <th class="text-white">Assignees</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${taskHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END GET PHASE DISPLAY -----


    // ----- UPDATE TABLE -----
    function updateTables() {
        $(`[name="milestoneName"]`).each(function(index) {
            $(this).attr("index", index);
            $(this).attr("id", `milestoneName${index}`);
        })

        $(`[name="manHours"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("index", index);
            $(this).attr("id", `manHours${index}`);
            $parent.find(".invalid-feedback").attr("id", `invalid-manHours${index}`);
        })

        $(`[name="assignEmployee"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("index", index);
            $(this).attr("id", `assignEmployee${index}`);
            $parent.find(".invalid-feedback").attr("id", `invalid-assignEmployee${index}`);
        })
    }
    // ----- END UPDATE TABLE -----


    // ----- SELECT2 MULTIPLE PLACEHOLDER -----
	function multipleSelect2Placeholder() {
        const isDisabled = $(`[name="assignEmployee"]`).attr("disabled");
		$(`.select2[name="assignEmployee"]`).select2({
			placeholder: !isDisabled ? "Select Team Members" : "-",
			theme:       "bootstrap",
			allowClear:  true,
			multiple:    true,
		});
		$(".select2-search__field").css("width", "100%");
	}
	// ----- END SELECT2 MULTIPLE PLACEHOLDER -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        $("#page_content").html(preloader);
        readOnly = isRevise ? false : readOnly;

        const {
            managementBoardID,
            managementBoardCode,
            reviseManagementBoardID,
            reviseManagementBoardCode,
            timelineBuilderID,
            projectName,
            projectCode,
            teamMember,
            employeeID,
            timelineManagementBy,
            timelineManagementStatus,
            approversID,
            approversDate,
            approversStatus,
            managementBoardReason,
            managementBoardStatus,
            managementBoardRemarks,
            submittedAt,
            createdAt,
            phases
        } = data && data[0];

        // ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(employeeID || sessionID);
		// ----- END GET EMPLOYEE DATA -----

        let membersID = teamMember ? teamMember.replaceAll("|", ",") : "0";
        const teamMembers = getTableData(
            `hris_employee_list_tbl`,
            `employeeID, employeeCode, designationID, employeeFirstname, employeeLastname, employeeProfile, createdAt`,
            `FIND_IN_SET(employeeID, "${membersID}")`
        ).map(member => {
            const { 
                employeeID, 
                employeeCode,
                designationID,
                employeeFirstname, 
                employeeLastname, 
                employeeProfile = "default.jpg",
                createdAt
            } = member;

            const { designation:designationName, department:departmentName } = employeeData(employeeID);

            let profile = employeeProfile && employeeProfile != "null" ? employeeProfile : "default.jpg";

            return {
                id:          employeeID,
                fullname:    `${employeeFirstname} ${employeeLastname}`,
                designation: designationID,
                image:       `${base_url}/assets/upload-files/profile-images/${profile}`,
                designationName,
                departmentName,
                employeeCode
            }
        });

        let code = managementBoardCode || getFormCode("PMB", createdAt, managementBoardID);

        $(".btnBack").attr("managementBoardID", encryptString(managementBoardID));
        $(".btnBack").attr("timelineBuilderID", timelineBuilderID);
		$(".btnBack").attr("status", managementBoardStatus);
        $(".btnBack").attr("employeeID", employeeID);
		$(".btnBack").attr("cancel", isFromCancelledDocument);
		$(".btnBack").attr("code", code);

        let disabled = readOnly ? "disabled" : "";
        let button   = formButtons(data, isRevise, isFromCancelledDocument);


        let reviseDocumentNo    = isRevise ? managementBoardID : reviseManagementBoardID;
		let documentHeaderClass = isRevise || reviseManagementBoardID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseManagementBoardID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseManagementBoardID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${(reviseManagementBoardCode || (isRevise && code)) || "---"}
					</h6>      
				</div>
			</div>
		</div>` : "";


        let phaseHTML = "";
        phases.map((phase, index) => {
            phaseHTML += getPhaseDisplay(timelineBuilderID, teamMembers, phase, index, disabled);
        })

        let html = `
        <div class="row px-2">
            ${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
                            ${managementBoardID && !isRevise ? code : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
                            ${managementBoardStatus && !isRevise ? getStatusStyle(managementBoardStatus, employeeID) : "---"}
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
                                ${getDateApproved(managementBoardStatus, approversID, approversDate)}
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
                            ${managementBoardRemarks && !isRevise ? managementBoardRemarks : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" 
                        class="form-control" 
                        disabled 
                        value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" 
                        class="form-control" 
                        disabled 
                        value="${employeeDesignation}">
                </div>
            </div>
            <div class="col-md-12 col-sm-12" id="project_board_header">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="managementBoardReason"
                        name="managementBoardReason"
                        required
                        rows="4"
                        style="resize:none;"
                        ${disabled}>${managementBoardReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-managementBoardReason"></div>
                </div>
            </div>
            <div class="col-12 border-top mt-2 pt-3">
                <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">
                    <span>${projectName}</span>
                    <span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">${projectCode}</span>
                </div>
            </div>
            <div class="col-12">
                ${phaseHTML}
            </div>
            <div class="col-12 text-right mt-3">
                ${button}
            </div>
        </div>
        <div class="approvers">
			${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
		</div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            updateTables();
            initAll();
            multipleSelect2Placeholder();

            $(`[name="assignEmployee"]`).each(function() {
                $assignedEmployee = $(this).attr("assignedEmployee");
                const assignedEmployeeArr = $assignedEmployee?.split("|");
                $assignedEmployee && $(this).val(assignedEmployeeArr).trigger("change");
            })
            $(`[name="assignEmployee"]`).attr("executeonce", "false");  
            if (readOnly) {
                $(`.btnDismissModal`).attr("data-dismiss", "modal");
                $(`.btnDismissModal`).removeClass("btnDismissModal");
            }

            // ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('.btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			// ----- END NOT ALLOWED FOR UPDATE -----

        }, 50);
    }
    // ----- END FORM CONTENT -----


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

            headerButton(true, "");
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


    // ----- GET ASSIGNED EMPLOYEE -----
    function getAssignedEmployee(phase = null, taskID = null) {
        let employees = [];
        if (phase && taskID) {
            $(`[name="assignEmployee"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                const employeeID = $(this).val();
                if (employeeID && employeeID.length > 0) {
                    employeeID.map(tempID => {
                        const fullname        = $(`option:selected[value="${tempID}"]`, this).attr("fullname");
                        const image           = $(`option:selected[value="${tempID}"]`, this).attr("image") || "default.jpg";
                        const designationName = $(`option:selected[value="${tempID}"]`, this).attr("designationName");
                        const departmentName  = $(`option:selected[value="${tempID}"]`, this).attr("departmentName");
                        const employeeCode    = $(`option:selected[value="${tempID}"]`, this).attr("employeeCode");
                        let temp = { id: tempID, fullname, image, designationName, departmentName, employeeCode };
                        const id = employees.map(emp => emp.id);
                        if (!id.includes(tempID)) {
                            employees.push(temp);
                        }
                    })
                }
            })
        }
        return employees;
    }
    // ----- END GET ASSIGNED EMPLOYEE -----


    // ----- DISPLAY ASSIGNED EMPLOYEE -----
    function displayAssignedEmployee(timelineBuilderID = 0, employees = [], phase = null, taskID = null, isDisabled = false) {
        const isReadOnly = isDisabled ? "true" : "false";
        let html = "";
        if (employees.length > 0 && phase && taskID) {
            employees.map((employee, index) => {
                const { 
                    id, 
                    fullname, 
                    image, 
                    departmentName, 
                    designationName, 
                    employeeCode 
                } = employee;

                html += `
                <img src              = "${image}" 
                    timelineBuilderID = "${timelineBuilderID}"
                    class             = "rounded rounded-circle employeeProfile" 
                    style             = "width: 50px; height: 50px; cursor: pointer;"
                    title             = "${fullname}"
                    phase             = "${phase}"
                    taskID            = "${taskID}"
                    employeeID        = "${id}"
                    departmentName    = "${departmentName}"
                    designationName   = "${designationName}"
                    employeeCode      = "${employeeCode}"
                    isReadOnly        = "${isReadOnly}">`;
            })
        } else {
            html += `<span>No data available yet.</span>`;
        }
        $(`.assignedMembers[phase="${phase}"][taskID="${taskID}"]`).html(html);
    }
    // ----- END DISPLAY ASSIGNED EMPLOYEE -----


    // ----- GET ASSIGNED EMPLOYEE -----
    function getAssignedEmployee(phase = null, taskID = null) {
        let employees = [];
        if (phase && taskID) {
            $(`[name="assignEmployee"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                const employeeID = $(this).val();
                if (employeeID && employeeID.length > 0) {
                    employeeID.map(tempID => {
                        const fullname        = $(`option:selected[value="${tempID}"]`, this).attr("fullname");
                        const image           = $(`option:selected[value="${tempID}"]`, this).attr("image") || "default.jpg";
                        const designationName = $(`option:selected[value="${tempID}"]`, this).attr("designationName");
                        const departmentName  = $(`option:selected[value="${tempID}"]`, this).attr("departmentName");
                        const employeeCode    = $(`option:selected[value="${tempID}"]`, this).attr("employeeCode");
                        let temp = { id: tempID, fullname, image, designationName, departmentName, employeeCode };
                        const id = employees.map(emp => emp.id);
                        if (!id.includes(tempID)) {
                            employees.push(temp);
                        }
                    })
                }
            })
        }
        return employees;
    }
    // ----- END GET ASSIGNED EMPLOYEE -----


    // ----- INIT DATE PICKER -----
    function manipulateDatePicker(elem = null, data = null) {
        if (elem && data) {
            const dateValue = moment(data).format("YYYY-MM-DD");

            $parent = $(elem).closest("tr");
            const manHours = $parent.find(`[name="employeeManHours"]`).val();
            let isOvertime = false;
            if (holidayData && holidayData.length > 0) {
                holidayData.map(holiday => {
                    let date = holiday.holidayDate;
                    if (date == dateValue) isOvertime = true;
                })
            }

            let duration = 0;
            if (!isOvertime && employeeSchedule && employeeSchedule.length > 0) {
                const dayName = moment(data, "YYYY-MM-DD").format("dddd").toLowerCase();
                
                const getDuration = (start = "", end = "", breakDuration = 0) => {
                    if (start && end) {
                        let startDate = moment(`2021-01-01 ${start}`);
                        let endDate   = moment(`2021-01-01 ${end}`);
                        breakDuration = +breakDuration;
                        let duration = moment.duration(endDate.diff(startDate));
                        let finalDuration = duration.asHours();
                        if (finalDuration < 0) {
                            // START DATE IS GREATER THAN END DATE
                            finalDuration = moment.duration(startDate.diff(endDate));
                        }

                        let result = 0;
                        if (finalDuration > 0) {
                            result = finalDuration - breakDuration;
                        }
                        return result;
                    }
                    return 0;
                }

                switch (dayName) {
                    case "monday":
                        if (employeeSchedule[0].mondayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].mondayFrom, employeeSchedule[0].mondayTo, employeeSchedule[0].mondayBreakDuration);
                        }
                        break;
                    case "tuesday":
                        if (employeeSchedule[0].tuesdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].tuesdayFrom, employeeSchedule[0].tuesdayTo, employeeSchedule[0].tuesdayBreakDuration);
                        }
                        break;
                    case "wednesday":
                        if (employeeSchedule[0].wednesdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].wednesdayFrom, employeeSchedule[0].wednesdayTo, employeeSchedule[0].wednesdayBreakDuration);
                        }
                        break;
                    case "thursday":
                        if (employeeSchedule[0].thursdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].thursdayFrom, employeeSchedule[0].thursdayTo, employeeSchedule[0].thursdayBreakDuration);
                        }
                        break;
                    case "friday":
                        if (employeeSchedule[0].fridayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].fridayFrom, employeeSchedule[0].fridayTo, employeeSchedule[0].fridayBreakDuration);
                        }
                        break;
                    case "saturday":
                        if (employeeSchedule[0].saturdayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].saturdayFrom, employeeSchedule[0].saturdayTo, employeeSchedule[0].saturdayBreakDuration);
                        }
                        break;
                    case "sunday":
                    default:
                        if (employeeSchedule[0].sundayStatus == 1) {
                            duration = getDuration(employeeSchedule[0].sundayFrom, employeeSchedule[0].sundayTo, employeeSchedule[0].sundayBreakDuration);
                        }
                        break;
                }
            }

            $parent.find(`[name="employeeManHours"]`).attr("date", dateValue);
            $parent.find(`[name="employeeManHours"]`).attr("isOvertime", isOvertime);
            $parent.find(`[name="employeeManHours"]`).attr("duration", duration);
            $parent.find(`[name="employeeManHours"]`).val(manHours);
            
            // ----- COMPUTE REGULAR AND OVERTIME HOURS -----
            let regularHours = 0, overtimeHours = 0;
            if (isOvertime) {
                overtimeHours = manHours;
            } else {
                if (manHours > duration) {
                    regularHours  = duration;
                    overtimeHours = manHours - regularHours;
                } else {
                    regularHours = manHours;
                }
            }
            $parent.find(`[name="regularHours"]`).val(formatAmount(regularHours || 0));
            $parent.find(`[name="overtimeHours"]`).val(formatAmount(overtimeHours || 0));
            // ----- END COMPUTE REGULAR AND OVERTIME HOURS -----

            $(elem).attr("dateValue", dateValue);
            $(elem).val(moment(data).format("MMMM DD, YYYY"));


            // ----- CHECK IF DATE EXISTS -----
            $table = $(elem).closest("table");
            $table.find(`[name="employeeDate"]`).each(function() {
                const dateValue = $(this).attr("dateValue");
                const elementID = "#"+this.id;
                
                const validated = $(elementID).hasClass("validated");
                let invalidFeedback =
                    $(elementID).parent().find(".invalid-feedback").length > 0
                        ? $(elementID).parent().find(".invalid-feedback")
                        : $(elementID).parent().parent().find(".invalid-feedback").length > 0
                        ? $(elementID).parent().parent().find(".invalid-feedback")
                        : $(elementID).parent().parent().parent().find(".invalid-feedback");
                validated
                    ? $(elementID).removeClass("is-invalid").addClass("is-valid")
                    : $(elementID).removeClass("is-invalid").removeClass("is-valid");
                invalidFeedback.text("");

                let uniqueDates = [];
                $table.find(`[name="employeeDate"]:not(${elementID})`).each(function() {
                    const date = $(this).attr("dateValue");
                    uniqueDates.push(date);
                })

                if (uniqueDates.includes(dateValue)) {
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Date already exists!");
                } else {
                    $(elementID).removeClass("is-valid").removeClass("is-invalid");
                    invalidFeedback.text("");
                }
            })
            // ----- END CHECK IF DATE EXISTS -----

            $(`[name="employeeManHours"]`).trigger("keyup");
        }
    }

    function initDatePicker(element = null, dateFrom = "", dateTo = "", dateValue = "") {
        
        let inMinDate   = dateFrom ? moment(dateFrom) : moment(new Date, "MMMM DD, YYYY").add(-365, "days");
        let inMaxDate   = dateTo ? moment(dateTo) : moment(new Date, "MMMM DD, YYYY").add(365, "days");
        let inStartDate = dateValue ? moment(dateValue) : moment(dateFrom ?? new Date);

        let elem = element ?? `[name="employeeDate"]`;
        $(elem).daterangepicker({
            autoUpdateInput:  false,
            singleDatePicker: true,
            showDropdowns:    true,
            autoApply:        true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            minDate:   inMinDate,
            maxDate:   inMaxDate,
            startDate: inStartDate
        }, function(data) {
            manipulateDatePicker(elem, data);
        })
    }
    // ----- END INIT DATE PICKER -----


    // ----- GET TABLE DATE ROW -----
    function getTableDateRow(data = false, remaining = 0, isReadOnly = false) {

        let date          = ""; 
        let manHours      = ""; 
        let regularHours  = ""; 
        let overtimeHours = "";
        if (data) {
            date          = data.date ?? "";
            manHours      = data.manHours ?? "";
            regularHours  = data.regularHours ?? "";
            overtimeHours = data.overtimeHours ?? "";
        }

        let html = "";
        if (isReadOnly) {
            html = `
            <tr class="dates">
                <td>
                    ${moment(date || new Date).format("MMMM DD, YYYY")}
                </td>
                <td class="text-center">
                    ${formatAmount(manHours || 0)}
                </td>
                <td class="text-center">
                    ${formatAmount(regularHours || 0)}
                </td>
                <td class="text-center">
                    ${formatAmount(overtimeHours || 0)}
                </td>
            </tr>`;
        } else {
            html = `
            <tr class="dates">
                <td>
                    <div class="input-group mb-0">
                        <div class="input-group-prepend">
                            <button class="btn btn-sm btn-danger btnDeleteDate">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input type="button"
                            class     = "form-control validate employeeDate"
                            name      = "employeeDate"
                            dateFrom  = ""
                            dateTo    = ""
                            dateValue = "${date || ""}"
                            value     = ""
                            required
                            ${isReadOnly ? "disabled" : ""}>
                        <div class="d-block invalid-feedback mt-0 mb-1"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group my-1">
                        <input class="form-control input-hours text-center employeeManHours"
                            name="employeeManHours"
                            minlength="1"
                            maxlength="5"
                            min="0.01"
                            max="24"
                            remaining="${remaining || 0}"
                            ${isReadOnly ? "disabled" : ""}
                            value="${manHours || "0.00"}"
                            required>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="regularHours"
                        value="${regularHours || "0.00"}"
                        disabled>
                </td>
                <td>
                    <input type="text"
                        class="form-control text-center"
                        name="overtimeHours"
                        value="${overtimeHours || "0.00"}"
                        disabled>
                </td>
            </tr>`;
        }
        
        return html;
    }
    // ----- END GET TABLE DATE ROW -----


    // ----- MODAL CONTENT -----
    function modalContent(timelineBuilderID = "", phase = "", taskID = "", taskStartDate = "", taskEndDate = "", employeeData = false, taskData = [], isReadOnly = false) {

        let html = "";
        if (employeeData && taskData && taskData.length > 0) {

            const remaining = $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("manHours") || 0;
            let employeeTotalManHours = 0;

            const {
                employeeID, fullname, image, employeeCode, departmentName, designationName
            } = employeeData;

            let tbodyHTML = "";
            taskData.map(task => {

                const { employeeID, timelineBuilderID, taskID, milestoneID } = task;

                employeeSchedule = getTableData(
                    `hris_employee_list_tbl as helt
                        LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)`,
                    `hsst.*`,
                    `employeeID = ${employeeID}`
                );

                let data = [];
                $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"][milestoneID="${milestoneID}"]`).each(function() {
                    const employeeArr = $(this).attr("employees")?.split("|") || [];
                    if (employeeArr.includes(employeeID)) {
                        const employeeIndex  = employeeArr.indexOf(employeeID);

                        const datesArr         = $(this).attr("dates")?.split("|") || [];
                        const manHoursArr      = $(this).attr("manHours")?.split("|") || [];
                        const regularHoursArr  = $(this).attr("regularHours")?.split("|") || [];
                        const overtimeHoursArr = $(this).attr("overtimeHours")?.split("|") || [];

                        const datesArr2         = datesArr[employeeIndex] ?? "";
                        const manHoursArr2      = manHoursArr[employeeIndex] ?? "";
                        const regularHoursArr2  = regularHoursArr[employeeIndex] ?? "";
                        const overtimeHoursArr2 = overtimeHoursArr[employeeIndex] ?? "";

                        const datesArr3         = datesArr2?.split("~") ?? [];
                        const manHoursArr3      = manHoursArr2?.split("~") ?? [];
                        const regularHoursArr3  = regularHoursArr2?.split("~") ?? [];
                        const overtimeHoursArr3 = overtimeHoursArr2?.split("~") ?? [];
                        datesArr3.map((arr, index) => {
                            const date          = datesArr3[index] ?? "";
                            const manHours      = manHoursArr3[index] ?? "";
                            const regularHours  = regularHoursArr3[index] ?? "";
                            const overtimeHours = overtimeHoursArr3[index] ?? "";

                            employeeTotalManHours += ((+manHours) || 0);

                            let temp = {
                                date, manHours, regularHours, overtimeHours
                            };
                            data.push(temp);
                        })

                    }
                });

                let remainingManHours = (+remaining) + (+employeeTotalManHours);
                remainingManHours = remainingManHours > 0 ? remainingManHours : 0;
                let tableDateRow = "";
                if (data && data.length > 0) {
                    data.map(item => {
                        tableDateRow += getTableDateRow(item, remaining, isReadOnly);
                    })
                } else {
                    tableDateRow += getTableDateRow(null, remaining, isReadOnly);
                }

                let milestoneName = $(`[name="milestoneName"][taskID="${taskID}"][milestoneID="${milestoneID}"]`).val()?.trim();

                let buttonAddDate = !isReadOnly ? `
                <button class="btn btn-md btn-primary float-left ml-2 my-1 btnAddDate"
                    taskStartDate = "${taskStartDate}"
                    taskEndDate   = "${taskEndDate}"
                    remaining     = "${remainingManHours}">
                    <i class="fas fa-plus"></i>
                </button>` : "";

                tbodyHTML += `
                <tr phase       = "${phase}"
                    taskID      = "${taskID}"
                    milestone   = "true"
                    milestoneID = "${milestoneID}">
                    <td>${milestoneName}</td>
                    <td>
                        <table class="table table-bordered tableDate">
                            <thead>
                                <tr>
                                    <th style="width: 40%">Date ${!isReadOnly ? "<code>*</code>" : ""}</th>
                                    <th style="width: 20%">Man Hours ${!isReadOnly ? "<code>*</code>" : ""}</th>
                                    <th style="width: 20%">Regular Hours</th>
                                    <th style="width: 20%">Overtime Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                               ${tableDateRow}
                            </tbody>
                        </table>
                        ${buttonAddDate}
                    </td>
                </tr>`;
            })

            let totalRemainingManHours = (+remaining) + (+employeeTotalManHours);

            html = `
            <div class="row p-3">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-3 px-2">
                        <div class="d-flex justify-content-start align-items-center">
                            <img src="${image}"
                                class="rounded-circle"
                                style="width: 50px; height: 50px;"
                                alt="${fullname}">
                            <div class="font-weight-bold ml-2">
                                <h5>${fullname}</h5>
                                <small>${employeeCode}</small>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end align-items-end flex-column">
                            <h5>${designationName}</h5>
                            <small>${departmentName}</small>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <table class="table table-striped" id="tableManHours">
                        <thead>
                            <tr>
                                <th>Milestones</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody id="remainingManHours" 
                            remainingManHours="${remaining}">
                            ${tbodyHTML}
                        </tbody>
                    </table>
                </div>
            </div>`;

            html += !isReadOnly ? `
            <div class="modal-footer">
                <div class="w-100 text-right">
                    <button class="btn btn-save px-5 py-2" 
                        id         = "btnSaveManHours"
                        employeeID = "${employeeID}"
                        phase      = "${phase}"
                        taskID     = "${taskID}">
                        <i class="fas fa-save"></i> Save
                    </button>
                    <button class="btn btn-cancel px-5 py-2 btnDismissModal">
                        <i class="fas fa-ban"></i> Cancel
                    </button>
                </div>
            </div>` : "";
        }
        return html;
    }
    // ----- END MODAL CONTENT -----


    // ----- UPDATE TABLE DATE ITEMS -----
    function updateTableDateItems() {
        $(`#modal_project_management_board_content`).find(`input, select, textarea`).each(function(index) {
            const name = this.name ?? "element";
            $(this).attr("id", `${name}${index}`);
        })
    }
    // ----- END UPDATE TABLE DATE ITEMS -----


    // ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


    // ----- CHECK REMAINING MAN HOURS -----
    function checkRemainingManHours($table = "", elementID = "", dateValue = "", remaining = 0) {
        if ($table && elementID) {
            let totalManHours = 0, otherManHours = 0;
            $table.find(`[name="employeeManHours"]`).each(function() {
                const manHours = getNonFormattedAmount($(this).val());
                totalManHours += manHours;
            })

            let flag = true;
            $(`[name="employeeManHours"][date="${dateValue}"]`).each(function() {
                let id = `#`+this.id;
                let manHours = getNonFormattedAmount($(this).val());

                if (id == elementID) flag = false;
                if (flag) otherManHours += manHours;
            })

            if (!$(elementID).hasClass("is-invalid")) {
                if (totalManHours > remaining) {
                    $table.find(`[name="employeeManHours"]`).removeClass("is-valid").addClass("is-invalid");
                    $table.find(`[name="employeeManHours"]`).closest(".form-group").find(`.invalid-feedback`).text("Excessive amount of hours");
                } else {
                    let max = +$(elementID).attr("max");
                    let manHours = getNonFormattedAmount($(elementID).val());
                    if (manHours > max) {
                        $parent = $(elementID).closest(".form-group");
                        $parent.find(`.invalid-feedback`).text(`Please input hours less than ${formatAmount(max)} hours`);
                        $(elementID).removeClass("is-valid").addClass("is-invalid");
                    } else if ($table.find(`[name="employeeManHours"][date="${dateValue}"].is-invalid`).length == 0) {
                        $table.find(`[name="employeeManHours"]`).removeClass("is-valid").removeClass("is-invalid");
                        $table.find(`[name="employeeManHours"]`).closest(".form-group").find(`.invalid-feedback`).text("");
                    }
                }
            } 
        }
    }
    // ----- END CHECK REMAINING MAN HOURS -----


    // ----- GET MAN HOURS -----
    function getManHours(employeeID = 0) {
        let data = [];
        $(`#tableManHours tbody tr[milestone="true"]`).each(function() {
            const phase       = $(this).attr("phase");
            const milestoneID = $(this).attr("milestoneID");
            const taskID      = $(this).attr("taskID");
            
            let totalManHours = 0;
            let dateArr = [], manHoursArr = [], regularHoursArr = [], overtimeHoursArr = [];
            $(`tr.dates`, this).each(function() {
                const date          = $(`[name="employeeDate"]`, this).attr("dateValue");
                const manHours      = $(`[name="employeeManHours"]`, this).val() || "0";
                const regularHours  = $(`[name="regularHours"]`, this).val() || "0";
                const overtimeHours = $(`[name="overtimeHours"]`, this).val() || "0";

                dateArr.push(date);
                manHoursArr.push(manHours);
                regularHoursArr.push(regularHours);
                overtimeHoursArr.push(overtimeHours);

                totalManHours += (+manHours);
            })

            const dates         = dateArr.join("~");
            const manHours      = manHoursArr.join("~");
            const regularHours  = regularHoursArr.join("~");
            const overtimeHours = overtimeHoursArr.join("~");

            let temp = {
                employeeID, phase, milestoneID, taskID, dates, manHours, regularHours, overtimeHours, totalManHours
            }
            data.push(temp);
        });
        return data;
    }
    // ----- GET MAN HOURS -----


    // ----- UPDATE MAN HOURS VALUE -----
    function updateManHoursValue(index = 0, phase = "", taskID = "") {
        let manHours = $(`#manHours${index}`).attr("manHours");
        let manHoursArr = manHours ? manHours.split("|") : [];
        const newManHours = manHoursArr
            .join("|")
            .split(/~/i)
            .map(i => i.split("|"))
            .reduce((a, b) => [...a, ...b])
            .reduce((x, y) => (+x) + (+y), 0);
        $(`#manHours${index}`).val(newManHours);

        // ----- UPDATE REMAINING -----
        const manHoursBasis = getNonFormattedAmount($(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val());
        let totalManHours = 0;
        $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
            const manHours = getNonFormattedAmount($(this).val());
            totalManHours += manHours;
        })
        const newRemaining = manHoursBasis - totalManHours;
        $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("remaining", newRemaining);
        // ----- END UPDATE REMAINING -----
    }
    // ----- END UPDATE MAN HOURS VALUE -----


    // ----- VALIDATE MAN HOURS -----
    function validateManHours() {
        let flag = true;
        $(`[name="taskManHours"][basis="true"]`).each(function() {
            $parent = $(this).closest("tr");
            const manHours = getNonFormattedAmount($(this).val());
            if (manHours == 0) {
                $parent.find(`.btnCaret[display="false"]`).trigger("click");
                flag = false; 
            } 
        })
        if (!flag) {
            showNotification("danger", "Every task must have at least one or more man hours value.");
        }
        return flag;
    }
    // ----- END VALIDATE MAN HOURS -----


    // ----- VALIDATE ASSIGNEE -----
    function validateAssignee() {
        $(`[name="assignEmployee"]`).each(function() {
            $parent = $(this).closest(".form-group");
            const index    = $(this).attr("index");
            const phase    = $(this).attr("phase");
            const taskID   = $(this).attr("taskID");
            const employeeIDArr = $(this).val();

            const manHours = getNonFormattedAmount($(`[name="manHours"][phase="${phase}"][taskID="${taskID}"][index="${index}"]`).val());
            if (manHours > 0 && employeeIDArr.length == 0) {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .addClass("has-error");
                    $parent.find(".invalid-feedback").text("This field is required!");
            } else {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .removeClass("has-error");
                    $parent.find(".invalid-feedback").text("");
            }
        })
    }
    // ----- VALIDATE ASSIGNEE -----


    // ----- FOCUS ON ERROR -----
    async function validateInputs() {
        let flag = true;

        const checkManHours = validateManHours();
        const checkAssignee = validateAssignee();
        
        $(`[name="manHours"]`).each(function() {
            $parent = $(this).closest("tr");
            const hasInvalid = $(this).hasClass("is-invalid");
            if (hasInvalid) {
                const displayed = $parent.find(".btnCaret").attr("display") == "true";
                if (!displayed) {
                    $parent.find(".btnCaret").trigger("click");
                }
            }
        })

        $(`[name="assignEmployee"]`).each(function() {
            $parent = $(this).closest("tr");
            const hasInvalid = $(this).parent().find(".selection").children().hasClass("has-error");
            if (hasInvalid) {
                const displayed = $parent.find(".btnCaret").attr("display") == "true";
                if (!displayed) {
                    $parent.find(".btnCaret").trigger("click");
                }
            }
        })

        if (!checkManHours) {
            flag = false;
        }

        if ($(`.is-invalid, .has-error`).length > 0) {
            $(`.is-invalid, .has-error`).first().focus();
            flag = false;
        }
        return flag;
    }
    // ----- END FOCUS ON ERROR -----


    // ----- CORRECT MAN HOURS -----
    function correctManHours(dateValue = "", isOvertime, duration = 0, remaining = 0, manHours = 0, elementID = "") {
        $parent = $(elementID).closest("tr");

        let otherManHours = 0;
        let totalManHours = 0;
        let flag = true;
        $(`[name="employeeManHours"][date="${dateValue}"]`).each(function() {
            let id = `#`+this.id;
            let manHours = getNonFormattedAmount($(this).val());

            let max = 24 - totalManHours;
                max = max > 0 ? max : 0;
            $(this).attr("max", max);

            totalManHours += manHours;
            if (id == elementID) flag = false;
            if (flag) otherManHours += manHours;
        })

        // ----- COMPUTE REGULAR AND OVERTIME HOURS -----
        let regularHours = 0, overtimeHours = 0;
        if (isOvertime || duration == 0) {
            overtimeHours = manHours;
        } else {
            if (otherManHours >= duration) {
                overtimeHours = manHours;
            } else {
                let consolidatedManHours = otherManHours + manHours;
                if (consolidatedManHours >= duration) {
                    overtimeHours = consolidatedManHours - duration;
                    regularHours  = manHours - overtimeHours;
                } else {
                    regularHours = manHours;
                }
            }
        }

        $parent.find(`[name="regularHours"]`).val(formatAmount(regularHours || 0));
        $parent.find(`[name="overtimeHours"]`).val(formatAmount(overtimeHours || 0));
        // ----- END COMPUTE REGULAR AND OVERTIME HOURS -----
        
        $(elementID).attr("executed", "true");
        $(`[name="employeeManHours"][date="${dateValue}"]:not([executed="true"])`).trigger("keyup");
        $(elementID).attr("executed", "false");

        $table = $(elementID).closest("table#tableManHours");
        setTimeout(() => {
            checkRemainingManHours($table, elementID, dateValue, remaining);
        }, 10);
    }
    // ----- END CORRECT MAN HOURS -----


    // ----- SELECT ASSIGN EMPLOYEE -----
    $(document).on("change", `[name="assignEmployee"]`, function() {
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const index      = $(this).attr("index");
        const phase      = $(this).attr("phase");
        const taskID     = $(this).attr("taskID");
        const employees  = getAssignedEmployee(phase, taskID);
        const employeeID = $(this).val() || [];
        const isDisabled = $(this).attr("disabled");
        const startDate  = $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskStartDate") || "";

        displayAssignedEmployee(timelineBuilderID, employees, phase, taskID, isDisabled);

        const selector = `[phase="${phase}"][taskID="${taskID}"][name="manHours"][index="${index}"]`;

        const getDifferentEmployeeID = (oldEmployeeArr = [], newEmployeeArr = []) => {
            let oldArrCount = oldEmployeeArr.length;
            let newArrCount = newEmployeeArr.length;
            let first  = oldArrCount > newArrCount ? oldEmployeeArr : newEmployeeArr;
            let second = oldArrCount > newArrCount ? newEmployeeArr : oldEmployeeArr;
    
            let index = first.filter(x => second.indexOf(x) === -1);
            return index ? index[0] : 0;
        }

        const executeonce = $(this).attr("executeonce") == "true";
        if (!executeonce) {
            const oldEmployees     = $(selector).attr("employees") || false;
            const oldEmployeesArr  = oldEmployees ? oldEmployees.split("|") : [];
            const isOnAdd          = employeeID.length > oldEmployeesArr.length;
            const diffEmployeeID   = getDifferentEmployeeID(oldEmployeesArr, employeeID);
            const oldManHours      = $(selector).attr("manHours") || "";
            const oldRegularHours  = $(selector).attr("regularHours") || "";
            const oldOvertimeHours = $(selector).attr("overtimeHours") || "";
            const oldDates         = $(selector).attr("dates") || "";

            // ----- SET NEW MAN HOURS -----
            let newManHoursArr      = oldManHours ? oldManHours.split("|") : [];
            let newRegularHoursArr  = oldRegularHours ? oldRegularHours.split("|") : [];
            let newOvertimeHoursArr = oldOvertimeHours ? oldOvertimeHours.split("|") : [];
            let newDates            = oldDates ? oldDates.split("|") : [];
            let tempArr        = isOnAdd ? employeeID : oldEmployeesArr;
            let employeeIndex  = tempArr.indexOf(diffEmployeeID);
                employeeIndex  = employeeIndex != -1 ? employeeIndex : 0;

            if (employeeIndex >= 0 && !isOnAdd) {
                newManHoursArr.splice(employeeIndex, 1);
                newRegularHoursArr.splice(employeeIndex, 1);
                newOvertimeHoursArr.splice(employeeIndex, 1);
                newDates.splice(employeeIndex, 1);
            } else {
                if (isOnAdd) {
                    newManHoursArr.splice(employeeIndex, 0, "0");
                    newRegularHoursArr.splice(employeeIndex, 0, "0");
                    newOvertimeHoursArr.splice(employeeIndex, 0, "0");
                    newDates.splice(employeeIndex, 0, startDate);
                }
                else {
                    newManHoursArr.splice(employeeIndex, 1, "0");
                    newRegularHoursArr.splice(employeeIndex, 1, "0");
                    newOvertimeHoursArr.splice(employeeIndex, 1, "0");
                    newDates.splice(employeeIndex, 1, startDate);
                }
            }
            newManHoursArr      = newManHoursArr.join("|");
            newRegularHoursArr  = newRegularHoursArr.join("|");
            newOvertimeHoursArr = newOvertimeHoursArr.join("|");
            newDates             = newDates.join("|");

            $(selector).attr("manHours", newManHoursArr);
            $(selector).attr("regularHours", newRegularHoursArr);
            $(selector).attr("overtimeHours", newOvertimeHoursArr);
            $(selector).attr("dates", newDates);
            // ----- END SET NEW MAN HOURS -----
        }

        updateManHoursValue(index, phase, taskID);

        let assignDesignation = [];
        employeeID.map((_, i) => {
            const designationID = $(`[name="assignEmployee"][index="${index}"] option:selected`).eq(i).attr("designation");
            assignDesignation.push(designationID);
        })

        $(selector).attr("employees", employeeID.join("|"));
        $(selector).attr("designations", assignDesignation.join("|"));

        $parent = $(this).closest(".form-group");
        $(this).parent()
            .find(".selection")
            .children()
            .removeClass("is-invalid")
            .removeClass("is-valid")
            .removeClass("no-error")
            .removeClass("has-error");
        $parent.find(".invalid-feedback").text("");   

        let totalManHours = 0;
        $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
            const manHours = getNonFormattedAmount($(this).val());
            totalManHours += manHours;
        })
        $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val(totalManHours);
    })
    // ----- END SELECT ASSIGN EMPLOYEE -----


    // ----- CLICK EMPLOYEE PROFILE -----
    $(document).on("click", `.employeeProfile`, function() {
        const isReadOnly        = $(this).attr("isReadOnly") == "true";
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const phase             = $(this).attr("phase");
        const taskID            = $(this).attr("taskID");
        const employeeID        = $(this).attr("employeeID");
        const fullname          = $(this).attr("title");
        const image             = $(this).attr("src");
        const employeeCode      = $(this).attr("employeeCode");
        const departmentName    = $(this).attr("departmentName");
        const designationName   = $(this).attr("designationName");
        let title = isReadOnly ? "ASSIGNED MAN HOURS" : "ASSIGN MAN HOURS";

        $parent = $(this).closest("tr");
        const taskStartDate = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskStartDate");
        const taskEndDate   = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskEndDate");
        $parent.find(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).removeClass("is-invalid").removeClass("is-valid");
        $parent.find(`.invalid-feedback`).text("");

        let employeeData = {
            employeeID, fullname, image, employeeCode, departmentName, designationName
        };

        let taskData = [];
        $(`[name="assignEmployee"][taskID="${taskID}"]`).each(function() {
            const milestoneID = $(this).attr("milestoneID");
            const employeeArr = $(this).val();
            if (employeeArr.includes(employeeID)) {
                taskData.push({
                    employeeID, timelineBuilderID, taskID, milestoneID
                })
            }
        })

        $(`#modal_project_management_board .modal-dialog`).removeClass("modal-md").addClass("modal-xl");
        $(`#modal_project_management_board .page-title`).text(title);
        $(`#modal_project_management_board_content`).html(preloader);
        $(`#modal_project_management_board`).modal("show");
        setTimeout(() => {
            let content = modalContent(timelineBuilderID, phase, taskID, taskStartDate, taskEndDate, employeeData, taskData, isReadOnly);
            $(`#modal_project_management_board_content`).html(content);

            initHours();
            initDatatables();
            updateTables();
            updateTableDateItems();

            $(`[name="employeeDate"]`).each(function() {
                const elementID = "#"+this.id;
                const dateValue = $(this).attr("dateValue") || taskStartDate;
                initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
                manipulateDatePicker(elementID, dateValue);
            });

        }, 500);
    })

    $(document).on('shown.bs.modal', '#modal_project_management_board', function () {
        $("#tableManHours").DataTable().columns.adjust().draw();
    });
    // ----- END CLICK EMPLOYEE PROFILE -----


    // ----- EMPLOYEE MAN HOURS -----
    $(document).on("keyup", `[name="employeeManHours"]`, function() {
        const elementID = "#"+$(this).attr("id");
        let manHours    = getNonFormattedAmount($(this).val());

        let remainingManHours = $(this).closest(`tbody#remainingManHours`).attr("remainingManHours");
        const remaining = getNonFormattedAmount(remainingManHours);

        const dateValue  = $(this).attr("date");
        const isOvertime = $(this).attr("isOvertime") == "true";
        const duration   = +$(this).attr("duration");

        const hasInvalid = $(this).hasClass("is-invalid");
        
        correctManHours(dateValue, isOvertime, duration, remaining, manHours, elementID);
    })
    // ----- END EMPLOYEE MAN HOURS -----


    // ----- SAVE MAN WORDS -----
    $(document).on("click", "#btnSaveManHours", function() {
        const employeeID = $(this).attr("employeeID");
        const phase      = $(this).attr("phase");
        const taskID     = $(this).attr("taskID");

        if ($("#modal_project_management_board").find(".is-invalid").length > 0) {
            $("#modal_project_management_board").find(".is-invalid").first().focus();
        } else {
            const validate = validateForm("modal_project_management_board");
            removeIsValid("#modal_project_management_board");
            if (validate) {
                const manHoursData = getManHours(employeeID);

                manHoursData.map(data => {
                    const { 
                        phase, 
                        milestoneID, 
                        taskID, 
                        dates, 
                        manHours, 
                        regularHours,
                        overtimeHours
                    } = data;

                    const selector = `[name="manHours"][phase="${phase}"][taskID="${taskID}"][milestoneID="${milestoneID}"]`;

                    const assignEmployee = $(selector).attr("employees").split("|");
                    const employeeIndex  = assignEmployee.indexOf(employeeID);

                    let manHoursArr = $(selector).attr("manHours")?.split("|");
                    manHoursArr[employeeIndex]  = manHours;
                    $(selector).attr("manHours", manHoursArr.join("|"));

                    let datesArr = $(selector).attr("dates")?.split("|");
                    datesArr[employeeIndex] = dates;
                    $(selector).attr("dates", datesArr.join("|"));

                    let regularHoursArr = $(selector).attr("regularHours")?.split("|");
                    regularHoursArr[employeeIndex] = regularHours;
                    $(selector).attr("regularHours", regularHoursArr.join("|"));

                    let overtimeHoursArr = $(selector).attr("overtimeHours")?.split("|");
                    overtimeHoursArr[employeeIndex] = overtimeHours;
                    $(selector).attr("overtimeHours", overtimeHoursArr.join("|"));


                    const newManHours = manHoursArr
                        .join("|")
                        .split(/~/i)
                        .map(i => i.split("|"))
                        .reduce((a, b) => [...a, ...b])
                        .reduce((x, y) => (+x) + (+y), 0);
                    $(selector).val(newManHours);
                });

                // ----- UPDATE REMAINING -----
                let totalManHours = 0;
                $(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).each(function() {
                    const manHours = getNonFormattedAmount($(this).val());
                    totalManHours += manHours;
                })
                $(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).val(totalManHours);
                // ----- END UPDATE REMAINING -----

                $(`#modal_project_management_board`).modal("hide");
            }
        }
    })
    // ----- END SAVE MAN HOURS -----


    // ----- DISMISS MODAL -----
    $(document).on("click", ".btnDismissModal", function() {
        $(`#modal_project_management_board`).modal("hide");
        Swal.fire({
            title: "DISCARD CHANGES", 
            text: "Are you sure that you want to cancel this process?",
            imageUrl: `${base_url}assets/modal/cancel.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1a1a1a',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                $(`#modal_project_management_board`).modal("hide");
            } else {
                $(`#modal_project_management_board`).modal("show");
            }
        });
    })
    // ----- END DISMISS MODAL -----


    // ----- ADD TABLE ROW DATE -----
    $(document).on("click", `.btnAddDate`, function() {
        const taskStartDate = $(this).attr("taskStartDate");
        const taskEndDate   = $(this).attr("taskEndDate");
        const remaining     = $(this).attr("remaining") || 0;

        $table = $(this).closest("td");
        let row = getTableDateRow(null, remaining);
        $table.find(`tbody`).append(row);
        initHours();
        updateTableDateItems();

        $(`[name="employeeDate"]`).each(function() {
            const elementID = "#"+this.id;
            const dateValue = $(this).attr("dateValue") || taskStartDate;
            initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
            manipulateDatePicker(elementID, dateValue);
        });
    })
    // ----- END ADD TABLE ROW DATE -----


    // ----- DELETE TABLE ROW DATE -----
	$(document).on("click", ".btnDeleteDate", function() {
		const isCanDelete = $(this).closest("tbody").find("tr").length > 1;
		if (isCanDelete) {

            const taskStartDate = $(this).closest(`tbody#remainingManHours`).find(`.btnAddDate`).first().attr("taskStartDate");
            const taskEndDate   = $(this).closest(`tbody#remainingManHours`).find(`.btnAddDate`).first().attr("taskEndDate");

			const dateElement  = $(this).closest("tr");
            const tableElement = $(this).closest("table");
			dateElement.fadeOut(500, function() {
				$(this).closest("tr").remove();
                updateTableDateItems();
                tableElement.find(`[name="employeeDate"]`).each(function() {
                    const elementID = "#"+this.id;
                    const dateValue = $(this).attr("dateValue");
                    initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
                    manipulateDatePicker(elementID, dateValue);
                });
			});
		} else {
			showNotification("danger", "You must have atleast one working days.");
		}
	})
	// ----- END DELETE TABLE ROW DATE -----


    // ----- CLICK TASK NAME OR CARET -----
    $(document).on("click", ".btnCaret", function() {
        $parent = $(this).closest("tr");
        const taskID  = $(this).attr("taskID");
        const phase   = $(this).attr("phase");
        const display = $(this).attr("display") == "true";
        const myCaret = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.taskContent[taskID="${taskID}"][phase="${phase}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.taskContent[taskID="${taskID}"][phase="${phase}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[caret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
    })
    // ----- END CLICK TASK NAME OR CARET -----


    // ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		$("#page_content").html(preloader);
		const id = decryptString($(this).attr("id"));
		setTimeout(function() {
			viewDocument(id);
		}, 10)
	});
	// ----- END OPEN EDIT FORM -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const id = decryptString($(this).attr("id"));
        setTimeout(() => {
            viewDocument(id, true);
        }, 50);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- CLICK BUTTON BACK -----
	$(document).on("click", ".btnBack", function () {
        const managementBoardID = decryptString($(this).attr("managementBoardID"));
        const timelineBuilderID = $(this).attr("timelineBuilderID");
		const status            = $(this).attr("status");
		const code              = $(this).attr("code");
		const employeeID        = $(this).attr("employeeID");
		const isRevise          = $(this).attr("revise") == "true";
		const isCancel          = $(this).attr("cancel") == "true";
        const createNew         = isRevise && !isCancel;

		if (status == 1 || status == 2 || (!isRevise && status == 3) || (!isCancel && status == 4)) {
            $("#page_content").html(preloader);
            setTimeout(() => {
                pageContent();

                if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
            }, 50);

		} else {
            saveProjectBoard("save", managementBoardID, timelineBuilderID, code, createNew, pageContent);
		}
	});
	// ----- END CLICK BUTTON BACK -----


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
        formButtonHTML(this);
		const managementBoardID = decryptString($(this).attr("managementBoardID"));
		const timelineBuilderID = $(this).attr("timelineBuilderID");
		const code              = $(this).attr("code");
        const isRevise          = $(this).attr("revise") == "true" && $(this).attr("cancel") == "false";

        setTimeout(() => {
            validateForm("project_board_header");
            validateInputs().then(res => {
                if (res) {
                    saveProjectBoard("submit", managementBoardID, timelineBuilderID, code, isRevise, pageContent);
                }
                formButtonHTML(this, false);
            })
        }, 10);
	});
	// ----- END CLICK BUTTON SUBMIT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const managementBoardID = decryptString($(this).attr("managementBoardID"));
		const timelineBuilderID = $(this).attr("timelineBuilderID");
		const code              = $(this).attr("code");
        saveProjectBoard("cancelform", managementBoardID, timelineBuilderID, code, false, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id = decryptString($(this).attr("managementBoardID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, false, true, fromCancelledDocument);
		}, 10);
	});
	// ----- END REVISE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const managementBoardID = decryptString($(this).attr("managementBoardID"));
		const timelineBuilderID = $(this).attr("timelineBuilderID");
		const code = $(this).attr("code");
        $(`#modal_project_management_board .modal-dialog`).removeClass("modal-xl").addClass("modal-md");
		$("#modal_project_management_board_content").html(preloader);
		$("#modal_project_management_board .page-title").text("DENY PROJECT BOARD");
		$("#modal_project_management_board").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="managementBoardRemarks"
					name="managementBoardRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-managementBoardRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" 
				class="btn btn-danger px-5 p-2" 
				id="btnRejectConfirmation"
				managementBoardID="${encryptString(managementBoardID)}"
                timelineBuilderID="${timelineBuilderID}"
				code="${code}">
				<i class="far fa-times-circle"></i> Deny
			</button>
			<button type="button" 
				class="btn btn-cancel btnCancel px-5 p-2"
				data-dismiss="modal">
				<i class="fas fa-ban"></i> Cancel
			</button>
		</div>`;
		$("#modal_project_management_board_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const managementBoardID = decryptString($(this).attr("managementBoardID"));
		const timelineBuilderID = $(this).attr("timelineBuilderID");
		const code = $(this).attr("code");

		const validate = validateForm("modal_project_management_board");
		if (validate) {
			saveProjectBoard("deny", managementBoardID, timelineBuilderID, code, false, () => ($("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")));
		} 
	});
	// ----- END REJECT DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const managementBoardID = decryptString($(this).attr("managementBoardID"));
		const timelineBuilderID = $(this).attr("timelineBuilderID");
		const code = $(this).attr("code");
        saveProjectBoard("approve", managementBoardID, timelineBuilderID, code, false, () => ($("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")));
	});
	// ----- END APPROVE DOCUMENT -----


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


    // ----- BADGE STATUS -----
    function getStatusStyle(status = 1, managementBoardCode = false) {
        switch (status) {
            case "1":
                return `<span class="badge badge-outline-info w-100">For Approval</span>`;
            case "2":
                return `<span class="badge badge-info w-100">Approved</span>`;
            case "3":
                return `<span class="badge badge-danger w-100">Denied</span>`;
            case "4":
                return `<span class="badge badge-primary w-100">Cancelled</span>`;
            case "5":
                return `<span class="badge badge-secondary w-100">Dropped</span>`;
            case "6":
                return `<span class="badge badge-outline-info w-100">For Proposal</span>`;
            case "7":
                return `<span class="badge badge-outline-info w-100">Reassessment</span>`;
            case "8":
                return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Assessed</span>`;
            case "9":
                return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Completed</span>`;
            case "0":
            default:
                if (managementBoardCode) {
                    return `<span class="badge badge-warning w-100">Draft</span>`;
                } else {
                    return `<span class="badge badge-outline-violet w-100">For Proposal</span>`;
                }
        }
    }
    // ----- END BADGE STATUS -----


    // ----- GET PROJECT BOARD DATA -----
    const getProjectBoardData = (managementBoardID = 0, timelineBuilderID = 0, managementBoardCode = "", isRevise = false, method = "save") => {

        const approversID = method != "approve" && moduleApprover || "";

        let data = {
            method,
            isRevise,
            managementBoardID,
            managementBoardCode,
            timelineBuilderID,
            employeeID:            sessionID,
            updatedBy:             sessionID,
            managementBoardStatus: 0,
            managementBoardReason: $(`[name="managementBoardReason"]`).val()?.trim(),
            tasks: [],
        };

        $(`[name="manHours"]`).each(function() {
            const index = $(this).attr("index");

            const taskID              = $(this).attr("taskID") ?? "";
            const projectMilestoneID  = $(this).attr("milestoneID") ?? "";
            const assignEmployee      = $(this).attr("employees") ?? "";
            const assignDesignation   = $(this).attr("designations") ?? "";
            const assignManHours      = $(this).attr("manHours") ?? "";
            const assignStartDate     = $(this).attr("dates");
            const assignEndDate       = $(this).attr("dates");
            const assignRegularHours  = $(this).attr("regularHours");
            const assignOvertimeHours = $(this).attr("overtimeHours");


            const newManHours = assignManHours
                .split(/~/i)
                .map(i => i.split("|"))
                .reduce((a, b) => [...a, ...b])
                .reduce((x, y) => (+x) + (+y), 0);

            const temp = {
                taskID,
                projectMilestoneID,
                manHours:              newManHours,
                assignedEmployee:      assignEmployee,
                assignedManHours:      assignManHours,
                assignedDesignation:   assignDesignation,
                assignedStartDate:     assignStartDate,
                assignedEndDate:       assignEndDate,
                assignedRegularHours:  assignRegularHours,
                assignedOvertimeHours: assignOvertimeHours,
            };
            data.tasks.push(temp);
        })

        if (method == "submit") {
            delete data.managementBoardStatus;

            data.submittedAt = dateToday();
            if (approversID) {
                data.approversID           = approversID;
                data.managementBoardStatus = 1;
            } else {
                data.approversID           = sessionID;
                data.approversStatus       = 2;
                data.approversDate         = dateToday();
                data.managementBoardStatus = 2;
            }
        } else if (method == "cancelform") {
            delete data.managementBoardStatus;
            delete data.managementBoardReason;
            delete data.tasks;

            data.managementBoardStatus = 4;
        } else if (method == "deny") {
            let tableData = getTableData("pms_management_board_tbl", "", "managementBoardID = " + managementBoardID);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let managementBoardCode = tableData[0].managementBoardCode;

                return {
                    method,
                    managementBoardID,
                    timelineBuilderID,
                    employeeID,
                    managementBoardCode,
                    approversStatus: updateApproveStatus(approversStatus, 3),
                    approversDate: updateApproveDate(approversDate),
                    managementBoardRemarks: $(`[name="managementBoardRemarks"]`).val()?.trim(),
                    updatedBy: sessionID
                };
			} 
        } else if (method == "approve") {
            let tableData  = getTableData("pms_management_board_tbl", "", "managementBoardID = " + managementBoardID);
            if (tableData) {
                let approversID     = tableData[0].approversID;
                let approversStatus = tableData[0].approversStatus;
                let approversDate   = tableData[0].approversDate;
                let employeeID      = tableData[0].employeeID;
                let createdAt       = tableData[0].createdAt;

                return {
                    method,
                    managementBoardID,
                    timelineBuilderID,
                    managementBoardCode,
                    managementBoardStatus: isImLastApprover(approversID, approversDate) ? 2 : 1,
                    approversStatus:       updateApproveStatus(approversStatus, 2),
                    approversDate:         updateApproveDate(approversDate),
                    updatedBy: sessionID
                };
            }
        }

        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- GET CONFIRMATION ------
    const getConfirmation = method => {
        const title = "Project Board";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit these tasks with man hours to the next phase?";
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
    // ----- END GET CONFIRMATION ------


    // ----- SAVE PROJECT BOARD -----
    function saveProjectBoard(method = "submit", managementBoardID = 0, timelineBuilderID = 0, managementBoardCode = "", isRevise = false, callback = null) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    }).then(function() {
                        preventRefresh(false);
                        window.location.replace(`${base_url}pms/project_management_board`);
                    });
                } else {

                    let data = getProjectBoardData(managementBoardID, timelineBuilderID, managementBoardCode, isRevise, method)

                    let notificationData = false;
                    if (method == "submit") {
                        let approversID   = data["approversID"], 
                            approversDate = data["approversDate"];

                        const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
                        if (employeeID != sessionID) {
                            notificationData = {
                                moduleID:                92,
                                notificationTitle:       "Project Management Board",
                                notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
                                notificationType:        2,
                                employeeID,
                            };
                        }
                    } else if (method == "deny") {
                        let code       = data["managementBoardCode"];
                        let employeeID = data["employeeID"];

                        notificationData = {
                            moduleID:                92,
                            notificationTitle:       "Project Management Board",
                            notificationDescription: `${code}: Your request has been denied.`,
                            notificationType:        1,
                            employeeID,
                        };

                        delete data["managementBoardCode"];
                        delete data["employeeID"];
                    }

                    $.ajax({
                        method:      "POST",
                        url:         `project_management_board/saveProjectBoard`,
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
                            let code        = result[1];
                            let insertedID  = result[2];
                            let dateCreated = result[3];
    
                            let swalTitle;
                            if (method == "submit") {
                                swalTitle = `${code} submitted successfully!`;
                                if (notificationData) {
                                    notificationData.tableID = insertedID;
                                    insertNotificationData(notificationData);
                                }
                            } else if (method == "save") {
                                swalTitle = `${code} saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${code} cancelled successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${code} denied successfully!`;
                                if (notificationData) {
                                    notificationData.tableID = insertedID;
                                    insertNotificationData(notificationData);
                                }
                            } else if (method == "approve") {
                                swalTitle = `${code} approved successfully!`;
                                if (notificationData) {
                                    notificationData.tableID = insertedID;
                                    insertNotificationData(notificationData);
                                }
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    }).then(function() {
                                        preventRefresh(false);
                                        window.location.replace(`${base_url}pms/project_management_board`);
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
                            Swal.fire({
                                icon:              'success',
                                title:             "Process successfully discarded!",
                                showConfirmButton: false,
                                timer:             2000
                            }).then(function() {
                                preventRefresh(false);
                                window.location.replace(`${base_url}pms/project_management_board`);
                            });
                        }
                    } 
                }
            }
        });
    }
    // ----- END SAVE PROJECT BOARD -----


})