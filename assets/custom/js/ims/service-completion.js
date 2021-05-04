$(document).ready(function() {
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("service completion");
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
				"ims_service_completion_tbl", 
				"reviseServiceCompletionID", 
				"reviseServiceCompletionID IS NOT NULL AND serviceCompletionStatus != 4");
			return revisedDocumentsID.map(item => item.reviseServiceCompletionID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
            const tableData = getTableData(
                `ims_service_completion_tbl AS isct 
                    LEFT JOIN ims_service_requisition_tbl AS isrt ON isct.serviceRequisitionID = isrt.serviceRequisitionID 
                    LEFT JOIN ims_service_order_tbl AS isot ON isct.serviceOrderID = isot.serviceOrderID`,
                `isct.*, 
                isot.employeeID, 
                isot.clientID, 
                isot.clientName, 
                isot.clientAddress, 
                isot.clientContactDetails, 
                isot.clientContactPerson, 
                isot.paymentTerms, 
                isot.scheduleDate, 
                isot.total, 
                isot.discount, 
                isot.totalAmount, 
                isot.vatSales, 
                isot.vat, 
                isot.totalVat,
                isot.lessEwt, 
                isot.grandTotalAmount,
                isot.contractFile,
                isot.projectID, 
                isot.createdAt AS soCreatedAt, 
                isrt.serviceRequisitionReason, 
                isrt.createdAt AS srCreatedAt`,
                `serviceCompletionID=${id}`
            )
			if (tableData.length > 0) {
				let {
					employeeID,
					serviceCompletionStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (serviceCompletionStatus == 0 || serviceCompletionStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (serviceCompletionStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly, true);
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
			let id = decryptString(view_id);
				id && isFinite(id) && loadData(id, isRevise);
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
					pageContent(true);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/service_completion?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/service_completion?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/service_completion?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/service_completion`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
    let serviceFiles = [];

	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const projectList = getTableData(
		"pms_project_list_tbl", 
		"projectListID, projectListCode, projectListName, projectListClientID, createdAt",
		"projectListStatus = 1");

	const clientList = getTableData(
		"pms_client_tbl",
		"*",
		"clientStatus = 1"
	);

	const serviceItemList = getTableData(
		"ims_services_tbl",
		"*",
		"serviceStatus = 1"
	);
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
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
					{ targets: 11, width: 80  },
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 100 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
					{ targets: 11, width: 80  },
				],
			});

		var table = $("#tableServiceCompletionItems")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: false,
                searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 50   },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 280  },
					{ targets: 3,  width: 1100 },
					{ targets: 4,  width: 200  },
				],
			});

		var table = $("#tableServiceCompletionItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                paging: false,
                info: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150  },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 280  },
					{ targets: 3,  width: 1100 },
					{ targets: 4,  width: 200  },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_service_completion_tbl", "approversID")) {
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
	// ----- END HEADER CONTENT -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false) {
		let html;
		if (isAdd) {
            html = "";
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let serviceCompletionData = getTableData(
			`ims_service_completion_tbl AS isct 
				LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
				LEFT JOIN pms_client_tbl AS pct ON isct.clientID = pct.clientID
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON isrt.employeeID = helt.employeeID`,
			`isct.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isct.createdAt AS dateCreated, projectListCode, projectListName, pct.clientName`,
			`isct.employeeID != ${sessionID} AND isct.serviceCompletionStatus != 0 AND isct.serviceCompletionStatus != 4`,
			`FIELD(serviceCompletionStatus, 0, 1, 3, 2, 4), COALESCE(isct.submittedAt, isct.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Client Name</th>
					<th>Project Code</th>
					<th>Project Name</th>
					<th>Current Approver</th>
					<th>Date Created</th>
					<th>Date Submitted</th>
					<th>Date Approved</th>
					<th>Status</th>
					<th>Remarks</th>
					<th>Action</th>
				</tr>
            </thead>
            <tbody>`;

		serviceCompletionData.map((item) => {
			let {
				fullname,
				serviceCompletionID,
				clientName,
				projectID,
				projectListCode,
				projectListName,
				approversID,
				approversDate,
				serviceCompletionStatus,
				serviceCompletionRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceCompletionRemarks ? serviceCompletionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceCompletionStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = serviceCompletionStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(serviceCompletionID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(serviceCompletionID )}" 
                code="${getFormCode("SC", createdAt, serviceCompletionID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
			<tr>
				<td>${getFormCode("SC", createdAt, serviceCompletionID )}</td>
				<td>${fullname}</td>
				<td>${clientName   || '-'}</td>
				<td>${projectListCode || '-'}</td>
				<td>${projectListName || '-'}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, serviceCompletionStatus, true))}
				</td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
				<td class="text-center">
					${getStatusStyle(serviceCompletionStatus)}
				</td>
				<td>${remarks}</td>
				<td class="text-center">
					${button}
				</td>
			</tr>`;
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
		let serviceCompletionData = getTableData(
			`ims_service_completion_tbl AS isct 
                LEFT JOIN ims_service_requisition_tbl AS isrt ON isct.serviceRequisitionID = isrt.serviceRequisitionID
				LEFT JOIN ims_service_order_tbl AS isot ON isct.serviceOrderID = isot.serviceOrderID
				LEFT JOIN pms_client_tbl AS pct ON isot.clientID = pct.clientID
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON isrt.employeeID = helt.employeeID`,
			`isct.*,  
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
            isct.createdAt AS dateCreated, projectListCode, projectListName, pct.clientName`,
			`isot.employeeID = ${sessionID}`,
			`FIELD(serviceCompletionStatus, 0, 1, 3, 2, 4), COALESCE(isct.submittedAt, isct.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
				<tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Client Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		serviceCompletionData.map((item) => {
			let {
				fullname,
				serviceCompletionID,
				clientName,
                projectID,
                projectListCode,
                projectListName,
				approversID,
				approversDate,
				serviceCompletionStatus,
				serviceCompletionRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceCompletionRemarks ? serviceCompletionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceCompletionStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = serviceCompletionStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" 
                id="${encryptString(serviceCompletionID )}">
                <i class="fas fa-eye"></i> View
            </button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(serviceCompletionID)}" 
                code="${getFormCode("SC", createdAt, serviceCompletionID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("SC", createdAt, serviceCompletionID )}</td>
                <td>${fullname}</td>
                <td>${clientName   || '-'}</td>
                <td>${projectListCode || '-'}</td>
                <td>${projectListName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, serviceCompletionStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(serviceCompletionStatus)}
                </td>
				<td>${remarks}</td>
                <td class="text-center">
                    ${button}
                </td>
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


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false) {
		let button = "";
		if (data) {
			let {
				serviceCompletionID     = "",
				serviceCompletionStatus = "",
				employeeID          = "",
				approversID         = "",
				approversDate       = "",
				createdAt           = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (serviceCompletionStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						serviceCompletionID="${serviceCompletionID}"
						code="${getFormCode("P0", createdAt, serviceCompletionID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel" 
							id="btnCancel"
							revise="${isRevise}"
							serviceCompletionID="${serviceCompletionID}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							serviceCompletionID="${serviceCompletionID}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (serviceCompletionStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							serviceCompletionID="${serviceCompletionID}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (serviceCompletionStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(serviceCompletionID)) {
						button = `
						<button
							class="btn btn-cancel"
							id="btnRevise" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (serviceCompletionStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("P0", createdAt, serviceCompletionID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- GET PROJECT LIST -----
    function getProjectList(id = null, clientID = 0, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			${id == "0" && "selected"}>N/A</option>`;
        html += projectList.filter(project => project.projectListClientID == clientID).map(project => {
            return `
            <option 
                value       = "${project.projectListID}" 
                projectCode = "${getFormCode("PRJ", project.createdAt, project.projectListID)}"
                ${project.projectListID == id && "selected"}>
                ${project.projectListName}
            </option>`;
        }).join("")
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----


	// ----- UPDATE SERVICE OPTIONS -----
	function updateServiceOptions() {
		let serviceIDArr = []; // 0 IS THE DEFAULT VALUE
		let serviceElementID = [];

		$("[name=serviceID]").each(function(i, obj) {
			serviceIDArr.push($(this).val());
			serviceElementID.push(`#${this.id}`);
			$(this).val() && $(this).trigger("change");
		})

		serviceElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let serviceList = [...serviceItemList];
			html += serviceList.filter(item => !serviceIDArr.includes(item.serviceID) || item.serviceID == serviceIDArr[index]).map(item => {
                let serviceCode = item.serviceID != "0" ? 
                `${getFormCode("SVC", item.createdAt, item.serviceID)}` : "-"

				return `
				<option 
					value        = "${item.serviceID}" 
					serviceCode     = "${serviceCode}"
					serviceUom          = "${item.serviceUom}"
					${item.serviceID == serviceIDArr[index] && "selected"}>
					${item.serviceName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE SERVICE OPTIONS -----


    // ----- GET SERVICE ITEM -----
    function getServiceItem(id = null, display = true) {
        let html   = `<option selected disabled>Select Service Name</option>`;

		let serviceIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=serviceID]`).each(function(i, obj) {
			serviceIDArr.push($(this).val());
		}) 
		let serviceList = [...serviceItemList];

		html += serviceList.filter(item => !serviceIDArr.includes(item.serviceID) || item.serviceID == id).map(item => {
            let serviceCode = item.serviceID != "0" ? 
                `${getFormCode("SVC", item.createdAt, item.serviceID)}` : "-"
            return `
            <option 
                value       = "${item.serviceID}" 
                serviceCode = "${serviceCode}"
                serviceUom  = "${item.serviceUom}"
                ${item.serviceID == id && "selected"}>
                ${item.serviceName}
            </option>`;
        })
		
        return display ? html : serviceItemList;
    }
    // ----- END GET SERVICE ITEM -----


    // ----- GET SERVICE FILE -----
    function getServiceScopeFile(scopeID, file, link = true) {
        let href = link ? `${base_url}assets/upload-files/request-services/${file}` : "";
        let html = `
        <div>
            <span class="pr-1 btnDeleteServiceFile"
                scopeID="${scopeID}"
                style="cursor: pointer;">x</span>
            <a class="ml-1"
                href="${href}"
                target="_blank">
                ${file}
            </a>
        </div>`;
        return html;
    }
    // ----- END GET SERVICE FILE -----


	// ----- GET SERVICE SCOPE -----
	function getServiceScope(scope = {}, readOnly = false) {
		let {
            scopeID     = "",
			description = "",
			quantity    = "1",
			uom         = "pcs",
			unitCost    = "0",
			totalCost   = "0",
			file        = "",
		} = scope;

		let html = "";
		if (!readOnly) {
            const serviceFile = file ? getServiceScopeFile(scopeID, file) : "";

			html = `
			<tr>
				<td>
					<div class="servicefile">
                        <div class="displayservicefile">
                            ${serviceFile}
                        </div>
						<div class="input-group mb-0">
							<input type="file"
								class="form-control validate"
								name="serviceFile"
								id="serviceFile"
								autocomplete="off"
                                scopeID="${scopeID}"
                                accept=".png, .jpeg, .jpg, .svg">
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serviceFile"></div>
						</div>
					</div>
				</td>
				<td>
					<div class="servicescope">
						${description}
					</div>
				</td>
				<td>
					<div class="quantity">
						${quantity}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom}
					</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">${formatAmount(totalCost, true)}</div>
				</td>
			</tr>`;
		} else {
			html = `
			<tr>
				<td>
					<div class="servicefile">
						${description}
					</div>
				</td>
				<td>
					<div class="servicescope">
						${description}
					</div>
				</td>
				<td>
					<div class="quantity">
						${quantity}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom}
					</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">${formatAmount(totalCost, true)}</div>
				</td>
			</tr>`;
		}

		
		return html;
	}
	// ----- END GET SERVICE SCOPE -----


	// ----- UPDATE SERVICE SCOPE -----
	function updateServiceScope() {
		$(`[name="serviceDescription"]`).each(function(i) {
			$(this).attr("id", `serviceDescription${i}`);
			$(this).parent().find(".invalid-feedback").attr("id", `invalid-serviceDescription${i}`);
		})
	}
	// ----- END UPDATE SERVICE SCOPE -----


	// ----- GET ITEM ROW -----
    function getServiceRow(item = {}, readOnly = false) {
		let {
			requestServiceID = 0,
			serviceID        = "",
			serviceName      = "",
			serviceDateFrom  = "",
			serviceDateTo    = "",
			remarks          = "",
			createdAt        = ""
		} = item;

		const scopeData = getTableData(
			`ims_service_scope_tbl`,
			``,
			`requestServiceID = ${requestServiceID}`
		);
		let serviceScopes = `
		<div class="table-responsive">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th style="width: 18%">File ${!readOnly ? "<code>*</code>" : ""}</th>
						<th style="width: 32%">Description</th>
						<th style="width: 10%">Quantity</th>
						<th style="width: 10%">UOM</th>
						<th style="width: 15%">Unit Cost</th>
						<th style="width: 15%">Total Cost</th>
					</tr>
				</thead>
				<tbody class="tableScopeBody">`;
		if (scopeData.length > 0) {
			serviceScopes += scopeData.map(scope => {
				return getServiceScope(scope, readOnly);;
			}).join("");
		} else {
			serviceScopes += getServiceScope();
		}
		serviceScopes += `
				</tbody>
			</table>
		</div>`;

		let html = "";
		if (readOnly) {
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="servicecode">
						${getFormCode("SVC", createdAt, serviceID)}
					</div>
				</td>
				<td>
					<div class="servicename">
						${serviceName || "-"}
					</div>
				</td>
				<td>
					<div class="servicedate">
						${serviceDate || "-"}
					</div>
				</td>
				<td>
					<div class="servicescope">
						${serviceScopes}
					</div>
				</td>
				<td>
					<div class="remarks">
						${remarks || "-"}
					</div>
				</td>
			</tr>`;
		} else {
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="servicecode">
                        ${getFormCode("SVC", createdAt, serviceID)}
                    </div>
				</td>
				<td>
					<div class="servicename">
                        ${serviceName || "-"}
					</div>
				</td>
				<td>
					<div class="servicedate">
						<div class="form-group mb-0">
                        <input type="button" 
                            class="form-control validate text-center serviceDate" 
                            name="serviceDate" 
                            id="serviceDate"
                            serviceID="${serviceID}"
                            required
                            value="${moment(serviceDateFrom || dateToday()).format("MMMM DD, YYYY")} - ${moment(serviceDateTo || dateToday()).format("MMMM DD, YYYY")}">
                        <div class="d-block invalid-feedback" id="invalid-serviceDate"></div>
						</div>
					</div>
				</td>
                <td>
					${serviceScopes}
				</td>
				<td>
					<div class="remarks">
                        ${remarks || ""}
					</div>
				</td>
			</tr>`;
		}

        return html;
    }
    // ----- END GET ITEM ROW -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(".itemServiceTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("project", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `projectitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}`);
			$("td .unitcost [name=unitCost] ", this).attr("project", `true`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);
			$("td .totalcost", this).attr("project", `true`);

			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})

		$(".itemCompanyTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("company", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("company", `true`);
				$(this).attr("id", `companycompanyitemid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}`);
			$("td .quantity [name=quantity]", this).attr("company", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}`);
			$("td .unitcost [name=unitCost] ", this).attr("company", `true`);

			// TOTAL COST
			$("td .totalcost", this).attr("id", `totalcost${i}`);
			$("td .totalcost", this).attr("company", `true`);

			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=projectID]", function() {
        const projectCode = $('option:selected', this).attr("projectCode");
        const clientCode  = $('option:selected', this).attr("clientCode");
        const clientName  = $('option:selected', this).attr("clientName");
        const address     = $('option:selected', this).attr("address");

        $("[name=projectCode]").val(projectCode);
        $("[name=clientCode]").val(clientCode);
        $("[name=clientName]").val(clientName);
        $("[name=clientAddress]").val(address);
    })
    // ----- END SELECT PROJECT LIST -----


    // ----- SELECT SERVICE NAME -----
    $(document).on("change", "[name=serviceID]", function() {
        const serviceCode = $('option:selected', this).attr("serviceCode");
        const serviceUom  = $('option:selected', this).attr("serviceUom");

        $(this).closest("tr").find(`.servicecode`).first().text(serviceCode);
        $(this).closest("tr").find(`.serviceUom`).first().text(serviceUom);

		$(`[name=serviceID]`).each(function(i, obj) {
			let serviceID = $(this).val();
			$(this).html(getServiceItem(serviceID));
		}) 
		updateTotalAmount();
    })
    // ----- END SELECT SERVICE NAME -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity], [name=unitCost]", function() {
		const tableRow  = $(this).closest("tr");
		const quantity  = +tableRow.find(`[name="quantity"]`).first().val();
		const unitcost  = +tableRow.find(`[name="unitCost"]`).first().val().replaceAll(",", "");
		const totalcost = quantity * unitcost;
		tableRow.find(`.totalcost`).first().text(formatAmount(totalcost, true));
		updateTotalAmount();
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- SELECT FILE -----
	$(document).on("change", "[name=files]", function(e) {
		const filename = this.files[0].name;
		const filesize = this.files[0].size/1024/1024; // Size in MB
		if (filesize > 10) {
			$(this).val("");
			$(this).parent().parent().find(".displayfile").empty();
			showNotification("danger", "File size must be less than or equal to 10mb");
		} else {
			let html = `
			<div class="d-flex justify-content-between align-items-center py-2">
				<span class="filename">${filename}</span>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>`;
			$(this).parent().find(".displayfile").first().html(html);
		}
	})
	// ----- END SELECT FILE -----


	// ----- REMOVE FILE -----
	$(document).on("click", ".btnRemoveFile", function() {
		$(this).parent().parent().parent().find("[name=files]").first().val("");
		$(this).closest(".displayfile").empty();
	})
	// ----- END REMOVE FILE -----


	// ----- CLICK DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		const isProject = $(this).attr("project") == "true";
		deleteTableRow(isProject);
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
		const isProject = $(this).attr("project") == "true";
		if (isProject) {
			$(".checkboxrow[project=true]").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
		} else {
			$(".checkboxrow[company=true]").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
		}
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----
	

	// ----- GET AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "");
	}
	// ----- END GET AMOUNT -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name=quantity]`).map(element => element.value || "0");
		const unitCostArr = $.find(`[name=unitCost]`).map(element => element.value.replaceAll(",", "") || "0");
		const total    = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#total`).text(formatAmount(total, true));
		
		const discount = getNonFormattedAmount($("#discount").val());
		const totalAmount = total - discount;
		$(`#totalAmount`).text(formatAmount(totalAmount, true));

		const vat = getNonFormattedAmount($("#vat").val());
		const vatSales = totalAmount - vat;
		$(`#vatSales`).text(formatAmount(vatSales, true));
		
		const totalVat = vatSales + vat;
		$(`#totalVat`).text(formatAmount(totalVat, true));
		
		const lessEwt = getNonFormattedAmount($("#lessEwt").val());
		const grandTotalAmount = totalVat - lessEwt;
		$(`#grandTotalAmount`).text(formatAmount(grandTotalAmount, true));

		return total;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


    // ----- SERVICE DATE -----
    function serviceDate(input) {
        let serviceDate    = input.value;
        let serviceDateArr = serviceDate.split(" - ");
        const elementID    = `#${input.id}` || "[name=serviceDate]";

        const serviceDateFrom = serviceDateArr[0] || new Date;
        const serviceDateTo   = serviceDateArr[1] || new Date;

        const options = {
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            minDate:   moment(new Date).format("MMMM DD, YYYY"),
            startDate: moment(serviceDateFrom || new Date),
            endDate:   moment(serviceDateTo || new Date),
        }
        $(elementID).daterangepicker(options, function (start, end) {
            if (start && end) {
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
                const displayDate = `${moment(start).format("MMMM DD, YYYY")} - ${moment(end).format("MMMM DD, YYYY")}`;
                $(elementID).val(displayDate);
            }
        });
    }
    // ----- END SERVICE DATE -----


    // ----- UPLOAD SERVICE FILE -----
    $(document).on('change', `[name="serviceFile"]`, function() {
        const scopeID = $(this).attr("scopeID");
		const files   = this.files || false;
		if (files) {
			const filesize    = files[0].size/1024/1024;
			const filenameArr = files[0].name.split(".");
			const filename    = filenameArr[0];
			const extension   = filenameArr[1];
			const filetypeArr = files[0].type.split("/");
			const filetype    = filetypeArr[0];
			if (filesize > 10) {
				showNotification("danger", `${filenameArr.join(".")} size must be less than or equal to 10mb`);
			} else {
                let service = {
                    scopeID,
                    files: files[0]
                };
				serviceFiles.push(service);

                let html = getServiceScopeFile(scopeID, filenameArr.join("."), false);
                $(this).closest(".servicefile").find(".displayservicefile").first().html(html);
			}
		}
    })
    // ----- END UPLOAD SERVICE FILE -----


    // ----- DELETE SERVICE FILE -----
    $(document).on("click", ".btnDeleteServiceFile", function() {
        const scopeID = $(this).attr("scopeID");
        let div = $(this).closest('div');
        div.fadeOut(500, function (){
            serviceFiles = serviceFiles.filter(file => file.scopeID != scopeID);
            $(this).closest("td").find("[name=serviceFile]").val("");

            $(this).closest("div").remove();
        });
    })
    // ----- END DELETE SERVICE FILE -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity], [name=unitCost]", function() {
		const tableRow  = $(this).closest("tr");
		const quantity  = +tableRow.find(`[name="quantity"]`).first().val();
		const unitcost  = +tableRow.find(`[name="unitCost"]`).first().val().replaceAll(",", "");
		const totalcost = quantity * unitcost;
		tableRow.find(`.totalcost`).first().text(formatAmount(totalcost, true));
		updateTotalAmount();
	})
	// ----- END KEYUP QUANTITY OR UNITCOST -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=discount]", function() {
		const discount = getNonFormattedAmount($(this).val());
		const total    = getNonFormattedAmount($("#total").text());
		
		const totalAmount = total - discount;
		$("#totalAmount").html(formatAmount(totalAmount, true));

		const vat      = getNonFormattedAmount($("[name=vat]").val())
		const vatSales = totalAmount - vat;
		$("#vatSales").html(formatAmount(vatSales, true));

		const totalVat = vatSales + vat;
		$("#totalVat").html(formatAmount(totalVat, true));

		const lessEwt          = getNonFormattedAmount($("[name=lessEwt]").val());
		const grandTotalAmount = totalVat - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=vat]", function() {
		const vat         = getNonFormattedAmount($(this).val());
		const totalAmount = getNonFormattedAmount($("#totalAmount").text());

		const vatSales = totalAmount - vat;
		$("#vatSales").html(formatAmount(vatSales, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=lessEwt]", function() {
		const lessEwt     = getNonFormattedAmount($(this).val());
		const totalAmount = getNonFormattedAmount($("#totalAmount").text());

		const grandTotalAmount = totalAmount - lessEwt;
		$("#grandTotalAmount").html(formatAmount(grandTotalAmount, true));
	})	
	// ----- END KEYUP DISCOUNT -----


	// ----- UPLOAD CONTRACT -----
	$(document).on("click", "[id=btnUploadContract]", function() {
		$(`[type=file][name=contractFile]`).trigger("click");
	})

	$(document).on("change", "[name=contractFile]", function(e) {
		const serviceCompletionID = $(this).attr("serviceCompletionID");
		const files        = this.files || false;
		if (files) {
			const filesize    = files[0].size/1024/1024;
			const filenameArr = files[0].name.split(".");
			const filename    = filenameArr[0];
			const extension   = filenameArr[1];
			const filetypeArr = files[0].type.split("/");
			const filetype    = filetypeArr[0];
			if (filesize > 10) {
				showNotification("danger", `${filenameArr.join(".")} size must be less than or equal to 10mb`);
			} else {
				let formData = new FormData();
				formData.append("serviceCompletionID", serviceCompletionID);
				formData.append("files", files[0]);
				saveServiceCompletionContract(formData, filenameArr.join("."));
			}
		}
	})
	// ----- END UPLOAD CONTRACT -----


	// ----- GET SERVICE ORDER DATA -----
	function getServiceCompletionData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isRevise = false) {
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

        let data     = { items: [], files: serviceFiles };
        let formData = new FormData();

        serviceFiles.map((file, i) => {
            formData.append(`scopeID[${i}]`, file.scopeID);
            formData.append(`scopeFile[${i}]`, file.files);
        })

        const approversID = method != "approve" && moduleApprover;

        if (id) {
            data["serviceCompletionID"] = id;

            formData.append("serviceCompletionID", id);

            if (status != "2") {
                data["serviceCompletionStatus"] = status;

                formData.append("serviceCompletionStatus", status);
            }
        }

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["serviceCompletionID"]  = id;

				formData.append("serviceCompletionID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();

				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"] = approversID;
					data["serviceCompletionStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("serviceCompletionStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["serviceCompletionStatus"] = 2;

					formData.append("approversID",     sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate",   dateToday());
					formData.append("serviceCompletionStatus", 2);
				}
			}

			// if (isRevise) {
				$(".itemTableRow").each(function(i, obj) {
					const serviceDate     = $("td [name=serviceDate]", this).val();	
					const serviceID       = $("td [name=serviceDate]", this).attr("serviceID");	
                    const serviceDateArr  = serviceDate.split(" - ");
                    const serviceDateFrom = moment(serviceDateArr[0]).format("YYYY-MM-DD");
                    const serviceDateTo   = moment(serviceDateArr[1]).format("YYYY-MM-DD");
	
                    formData.append(`services[${i}][serviceID]`, serviceID);
                    formData.append(`services[${i}][serviceDateFrom]`, serviceDateFrom);
                    formData.append(`services[${i}][serviceDateTo]`, serviceDateTo);

					let temp = {
                        serviceID,
						serviceDateFrom, 
						serviceDateTo
					};
	
					data["items"].push(temp);
				});
			// }

		} 

		return formData;
	} 
	// ----- END GET SERVICE ORDER DATA -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly     = isRevise ? false : readOnly;
		let disabled = readOnly ? "disabled" : "";

		let {
			serviceCompletionID       = "",
			reviseServiceCompletionID = "",
			employeeID                = "",
			clientID                  = "",
			projectID                 = "",
			serviceRequisitionID      = "",
			srCreatedAt               = new Date,
			clientName                = "-",
			clientAddress             = "-",
			clientContactDetails      = "",
			clientContactPerson       = "",
			paymentTerms              = "",
			scheduleDate              = "",
			serviceRequisitionReason  = "",
			total                     = 0,
			discount                  = 0,
			totalAmount               = 0,
			vatSales                  = 0,
			vat                       = 0,
			totalVat                  = 0,
			lessEwt                   = 0,
			grandTotalAmount          = 0,
			serviceCompletionRemarks  = "",
			approversID               = "",
			approversStatus           = "",
			approversDate             = "",
			contractFile		      = "",
			serviceCompletionStatus   = false,
			submittedAt               = false,
			createdAt                 = false,
		} = data && data[0];

		let requestServiceItems = "";
		if (serviceRequisitionID) {
			let requestServicesData = getTableData(
				`ims_request_services_tbl`,
				``,
				`serviceCompletionID = ${serviceCompletionID}`
			)
			requestServicesData.map(item => {
				requestServiceItems += getServiceRow(item, !isRevise && serviceCompletionStatus != 0);
			})
		} else {
			requestServiceItems += getServiceRow();
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("serviceCompletionID", serviceCompletionID);
		$("#btnBack").attr("status", serviceCompletionStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let button = formButtons(data, isRevise);

		// ----- PRINT BUTTON -----
		let approvedButton = '';
		if (serviceCompletionStatus == 2) {
			approvedButton += `<div class="w-100 text-right pb-4">`;
			if (grandTotalAmount > 0) {
				approvedButton += contractFile ? `
				<a href="${base_url}assets/upload-files/contracts/${contractFile}" 
					class="pr-3" 
					id="displayContract">${contractFile}</a>` : "";
				if (employeeID == sessionID) {
					approvedButton += `
					<input type="file"
						id="contractFile"
						name="contractFile"
						serviceCompletionID="${serviceCompletionID}"
						class="d-none"
						accept="image/*, .pdf, .docx, .doc">
					<button 
						class="btn btn-secondary py-2" 
						serviceCompletionID="${serviceCompletionID}"
						id="btnUploadContract">
						<i class="fas fa-file-upload"></i> Upload Contract
					</button>`;
				}
			}

			approvedButton += `
				<button 
					class="btn btn-info py-2" 
					serviceCompletionID="${serviceCompletionID}"
					id="btnExcel">
					<i class="fas fa-file-excel"></i> Excel
				</button>
			</div>`;
		}
		// ----- END PRINT BUTTON -----

		let reviseDocumentNo    = isRevise ? serviceCompletionID : reviseServiceCompletionID;
		let documentHeaderClass = isRevise || reviseServiceCompletionID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseServiceCompletionID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseServiceCompletionID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("SC", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let html = `
		${approvedButton}
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${serviceCompletionID && !isRevise ? getFormCode("SC", createdAt, serviceCompletionID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${serviceCompletionStatus && !isRevise ? getStatusStyle(serviceCompletionStatus) : "---"}
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
								${getDateApproved(serviceCompletionStatus, approversID, approversDate)}
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
							${serviceCompletionRemarks && !isRevise ? serviceCompletionRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

		<div class="row" id="form_service_completion">
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
                        required
						disabled>
                        <option selected disabled>Select Project Name</option>
                        ${getProjectList(projectID, clientID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="${clientName || "-"}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Company Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="${clientAddress || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Details</label>
                    <input type="text" class="form-control" name="clientContactDetails" disabled value="${clientContactDetails || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Person</label>
                    <input type="text" class="form-control" name="clientContactPerson" disabled value="${clientContactPerson || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Request No.</label>
                    <input type="text" class="form-control" name="serviceRequisitionID" disabled value="${serviceRequisitionID ? getFormCode("SR", srCreatedAt, serviceRequisitionID) : "-"}">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Payment Terms <code>*</code></label>
                    <input type="text" 
						class="form-control validate" 
						name="paymentTerms" 
						id="paymentTerms"
						data-allowcharacters="[0-9][%][ ][a-z][A-Z][-][_][.][,][']"
						minlength="2"
						maxlength="50"
						required
						value="${paymentTerms || ""}"
						disabled>
					<div class="d-block invalid-feedback" id="invalid-paymentTerms"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Schedule <code>*</code></label>
                    <input type="button" 
						class="form-control validate daterange text-left" 
						name="scheduleDate" 
						id="scheduleDate"
						required
						value="${moment(scheduleDate || dateToday()).format("MMMM DD, YYYY")}"
						disabled>
					<div class="d-block invalid-feedback" id="invalid-scheduleDate"></div>
                </div>
            </div>
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
                    <label>Reason</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="serviceCompletionReason"
                        name="serviceCompletionReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled>${serviceRequisitionReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-serviceCompletionReason"></div>
                </div>
            </div>
			
			<div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Services: </div>
                    <table class="table table-striped" id="tableServiceCompletionItems0">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Service Code</th>
                                <th>Service Name</th>
                                <th>Service Date</th>
                                <th>Scope of Work</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="itemServiceTableBody">
                            ${requestServiceItems}
                        </tbody>
                    </table>

					<div class="row py-2">
						<div class="offset-md-8 col-md-4 col-sm-12 pt-3 pb-2">
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Total :</div>
								<div class="col-6 text-right text-danger"
									style="font-size: 1.05em"
									id="total">
									${formatAmount(total, true)}
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Discount :</div>
								<div class="col-6 text-right">
									<input 
										type="text" 
										class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
										min="0" 
										max="9999999999"
										minlength="1"
										maxlength="20" 
										name="discount" 
										id="discount" 
										style="font-size: 1.02em;"
										value="${discount}"
										disabled>
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Total Amount:</div>
								<div class="col-6 text-right text-danger"
									id="totalAmount"
									style="font-size: 1.05em">
									${formatAmount(totalAmount, true)}
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Vatable Sales:</div>
								<div class="col-6 text-right text-danger"
									id="vatSales"
									style="font-size: 1.05em">
									${formatAmount(vatSales, true)}
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Vat 12%:</div>
								<div class="col-6 text-right">
									<input 
										type="text" 
										class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
										min="0" 
										max="9999999999"
										minlength="1"
										maxlength="20" 
										name="vat" 
										id="vat" 
										style="font-size: 1.02em;"
										value="${vat}"
										disabled>
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Total:</div>
								<div class="col-6 text-right text-danger"
									id="totalVat"
									style="font-size: 1.05em">
									${formatAmount(totalVat, true)}
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Less EWT:</div>
								<div class="col-6 text-right">
									<input 
										type="text" 
										class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold"
										min="0" 
										max="9999999999"
										minlength="1"
										maxlength="20" 
										name="lessEwt" 
										id="lessEwt" 
										style="font-size: 1.02em;"
										value="${lessEwt}"
										disabled>
								</div>
							</div>
							<div class="row" style="font-size: 1.1rem; font-weight:bold">
								<div class="col-6 text-right">Grand Total:</div>
								<div class="col-6 text-right text-danger"
									id="grandTotalAmount"
									style="font-size: 1.3em">
									${formatAmount(grandTotalAmount, true)}
								</div>
							</div>
						</div>
					</div>
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
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			updateTableItems();
			updateServiceScope();
			updateServiceOptions();
			initAmount("#discount", true);
			initAmount("#lessEwt", true);
			initAmount("#vat", true);
			removeIsValid("#tableServiceCompletionItems0");

			const disablePreviousDateOptions = {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				minDate: moment(new Date).format("MMMM DD, YYYY"),
				startDate: moment(scheduleDate || new Date),
			}
			initDateRangePicker("#scheduleDate", disablePreviousDateOptions);

            $("[name=serviceDate]").each(function(i) {
                $(this).attr("id", `serviceDate${i}`);
                serviceDate(this);
            })

			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
        console.log(data);
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

			headerButton(true, "Add Service Completion");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise);
			headerTabContent(false);
			formContent(data, readOnly, isRevise);
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id = $(this).attr("serviceCompletionID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("serviceCompletionID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SC", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getServiceCompletionData(action, "save", "0", id, status, revise);
				data["serviceCompletionStatus"]   = 0;
				data["reviseServiceCompletionID"] = id;
				delete data["serviceCompletionID"];
	
				saveServiceCompletion(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getServiceCompletionData(action, "save", "0", id, status, revise);
			data["serviceCompletionStatus"] = 0;

			saveServiceCompletion(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = $(this).attr("serviceCompletionID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);
		const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getServiceCompletionData(action, "save", "0", id, "0", revise);
		data["serviceCompletionStatus"] = 0;

		if (revise) {
			data["reviseServiceCompletionID"] = id;
			delete data["serviceCompletionID"];
		}

		saveServiceCompletion(data, "save", null, pageContent);
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
		const id       = $(this).attr("serviceCompletionID");
		const revise   = $(this).attr("revise") == "true";
		const validate = validateForm("form_service_completion");
		removeIsValid("#tableServiceCompletionItems0");

		if (validate) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getServiceCompletionData(action, "submit", "1", id, "0", revise);

			if (revise) {
				data["reviseServiceCompletionID"] = id;
				delete data["serviceCompletionID"];
			}

			const employeeID = getNotificationEmployeeID(data["approversID"], data["approversDate"], true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                41,
					notificationTitle:       "Service Completion",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveServiceCompletion(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("serviceCompletionID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getServiceCompletionData(action, "cancelform", "4", id, status);

		saveServiceCompletion(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("serviceCompletionID"));
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);
		let tableData  = getTableData("ims_service_completion_tbl", "", "serviceCompletionID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getServiceCompletionData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                41,
					tableID:                 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                41,
					tableID:                 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["serviceCompletionStatus"] = status;

			saveServiceCompletion(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("serviceCompletionID");
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);

		$("#modal_service_completion_content").html(preloader);
		$("#modal_service_completion .page-title").text("DENY SERVICE ORDER");
		$("#modal_service_completion").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="serviceCompletionRemarks"
					name="serviceCompletionRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-serviceCompletionRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			serviceCompletionID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_service_completion_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("serviceCompletionID"));
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);

		const validate = validateForm("modal_service_completion");
		if (validate) {
			let tableData = getTableData("ims_service_completion_tbl", "", "serviceCompletionID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {
					action:               "update",
					method:               "deny",
					serviceCompletionID:      id,
					approversStatus:      updateApproveStatus(approversStatus, 3),
					approversDate:        updateApproveDate(approversDate),
					serviceCompletionRemarks: $("[name=serviceCompletionRemarks]").val()?.trim(),
					updatedBy:            sessionID
				};

				let notificationData = {
					moduleID:                41,
					tableID: 				 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveServiceCompletion(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
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
	// ----- END APPROVER STATUS --


	// ----- DOWNLOAD EXCEL -----
	$(document).on("click", "#btnExcel", function() {
		const serviceCompletionID = $(this).attr("serviceorderid");
		const url = `${base_url}ims/service_completion/downloadExcel?id=${serviceCompletionID}`;
		window.location.replace(url); 
	})
	// ----- END DOWNLOAD EXCEL -----


})



// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Service Completion";
	let swalText, swalImg;

	$("#modal_service_completion").text().length > 0 && $("#modal_service_completion").modal("hide");

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
			swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
			swalText  = "Are you sure to cancel this document?";
			swalImg   = `${base_url}assets/modal/cancel.svg`;
			break;
		case "uploadcontract":
			swalTitle = `UPLOAD CONTRACT`;
			swalText  = "Are you sure to upload this contract?";
			swalImg   = `${base_url}assets/modal/add.svg`;
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

function saveServiceCompletion(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `service_completion/saveServiceCompletion`,
					data,
                    processData: false,
                    contentType: false,
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
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} denied successfully!`;
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
				if (res.dismiss === "cancel") {
					if (method != "deny") {
						callback && callback();
					} else {
						$("#modal_service_completion").text().length > 0 && $("#modal_service_completion").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_service_completion").text().length > 0 && $("#modal_service_completion").modal("show");
					}
				}
			}
		});
	}
	return false;
}

function saveServiceCompletionContract(data = null, filename = null) {
	if (data) {
		const confirmation = getConfirmation("uploadcontract");
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `service_completion/saveServiceCompletionContract`,
					data,
					processData: false,
					contentType: false,
					global:      false,
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
		
						if (isSuccess == "true") {
							setTimeout(() => {
								$("#loader").hide();
								closeModals();
								Swal.fire({
									icon:              "success",
									title:             "CONTRACT UPLOADED SUCCESSFULLY!",
									showConfirmButton: false,
									timer:             2000,
								});
								$("#displayContract").text(filename);
							}, 500);
						} else {
							setTimeout(() => {
								$("#loader").hide();
								Swal.fire({
									icon:              "danger",
									title:             "CONTRACT FAILED TO UPLOAD",
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
						$("[type=file][name=contractFile]").val("");
					}, 500);
				})
			} else {
				$("[type=file][name=contractFile]").val("");
			}
		});
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------