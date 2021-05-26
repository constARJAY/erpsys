$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(49);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("service requisition");
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
				"ims_service_requisition_tbl", 
				"reviseServiceRequisitionID", 
				"reviseServiceRequisitionID IS NOT NULL AND serviceRequisitionStatus != 4");
			return revisedDocumentsID.map(item => item.reviseServiceRequisitionID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("ims_service_requisition_tbl", "", "serviceRequisitionID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					serviceRequisitionStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (serviceRequisitionStatus == 0 || serviceRequisitionStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (serviceRequisitionStatus == 0) {
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
					const isAllowed = isCreateAllowed(49);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/service_requisition?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/service_requisition?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/service_requisition?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/service_requisition`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    const clientList = getTableData(
        "pms_client_tbl",
        "*",
        "clientStatus = 1"
    );

	const projectList = getTableData(
		"pms_project_list_tbl", 
		"projectListID, projectListCode, projectListName, projectListClientID, createdAt",
		"projectListStatus = 1");

    const serviceItemList = getTableData(
        "ims_services_tbl",
        "*",
        "serviceStatus = 1"
    );

	const uomList = getTableData(
		`ims_uom_tbl`,
		``,
		`uomStatus = 1`
	)
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 350 },
					{ targets: 5,  width: 100 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 200 },
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 350 },
					{ targets: 5,  width: 100 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 200 },
				],
			});

        var table = $("#tableServiceRequisitionItems")
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
					{ targets: 2,  width: 150  },
					{ targets: 3,  width: 1000 },
					{ targets: 4,  width: 200  },
				],
			});

			var table = $("#tableServiceRequisitionItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				sorting: false,
                searching: false,
                paging: false,
                info: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150  },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 1000 },
					{ targets: 3,  width: 200  },
				],
			});

	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_service_requisition_tbl", "approversID")) {
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
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(49)) {
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
		let serviceRequisitionData = getTableData(
			`ims_service_requisition_tbl AS isrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN pms_client_tbl AS pct ON isrt.clientID = pct.clientID`,
			"isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isrt.createdAt AS dateCreated, projectListCode, projectListName, clientName",
			`isrt.employeeID != ${sessionID} AND serviceRequisitionStatus != 0 AND serviceRequisitionStatus != 4`,
			`FIELD(serviceRequisitionStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		serviceRequisitionData.map((item) => {
			let {
				fullname,
				serviceRequisitionID,
				clientName,
				projectID,
				projectListCode,
				projectListName,
				referenceCode,
				approversID,
				approversDate,
				serviceRequisitionStatus,
				serviceRequisitionRemarks,
				serviceRequisitionReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceRequisitionRemarks ? serviceRequisitionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceRequisitionStatus == 2 || serviceRequisitionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = serviceRequisitionStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, serviceRequisitionStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(serviceRequisitionID )}">
					<td>${getFormCode("SR", createdAt, serviceRequisitionID )}</td>
					<td>${fullname}</td>
					<td>${clientName || '-'}</td>
					<td>
						<div>
							${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectListCode || '-'}</small>
					</td>
					<td>${serviceRequisitionReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, serviceRequisitionStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(serviceRequisitionStatus)}
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
		let serviceRequisitionData = getTableData(
			`ims_service_requisition_tbl AS isrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN pms_client_tbl AS pct ON isrt.clientID = pct.clientID`,
			"isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isrt.createdAt AS dateCreated, projectListCode, projectListName, clientName",
			`isrt.employeeID = ${sessionID}`,
			`FIELD(serviceRequisitionStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Client Name</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		serviceRequisitionData.map((item) => {
			let {
				fullname,
				serviceRequisitionID,
				clientName,
                projectID,
                projectListCode,
                projectListName,
                referenceCode,
				approversID,
				approversDate,
				serviceRequisitionStatus,
				serviceRequisitionRemarks,
				serviceRequisitionReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceRequisitionRemarks ? serviceRequisitionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceRequisitionStatus == 2 || serviceRequisitionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let btnClass = serviceRequisitionStatus != 0 ? "btnView" : "btnEdit";
			let button = serviceRequisitionStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(serviceRequisitionID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(serviceRequisitionID )}" 
                code="${getFormCode("SR", createdAt, serviceRequisitionID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
			<tr class="${btnClass}" id="${encryptString(serviceRequisitionID )}">
			<td>${getFormCode("SR", createdAt, serviceRequisitionID )}</td>
			<td>${fullname}</td>
			<td>${clientName || '-'}</td>
			<td>
				<div>
					${projectListName || '-'}
				</div>
				<small style="color:#848482;">${projectListCode || '-'}</small>
			</td>
			<td>${serviceRequisitionReason}</td>
			<td>
				${employeeFullname(getCurrentApprover(approversID, approversDate, serviceRequisitionStatus, true))}
			</td>
			<td>${dateCreated}</td>
			<td>${dateSubmitted}</td>
			<td>${dateApproved}</td>
			<td class="text-center">
				${getStatusStyle(serviceRequisitionStatus)}
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


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				serviceRequisitionID     = "",
				serviceRequisitionStatus = "",
				employeeID               = "",
				approversID              = "",
				approversDate            = "",
				createdAt                = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (serviceRequisitionStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						serviceRequisitionID="${encryptString(serviceRequisitionID)}"
						code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (serviceRequisitionStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
							status="${serviceRequisitionStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (serviceRequisitionStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						serviceRequisitionID="${encryptString(serviceRequisitionID)}"
						code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
						status="${serviceRequisitionStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (serviceRequisitionStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(serviceRequisitionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
							status="${serviceRequisitionStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (serviceRequisitionStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(serviceRequisitionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"
							status="${serviceRequisitionStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (serviceRequisitionStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							serviceRequisitionID="${encryptString(serviceRequisitionID)}"
							code="${getFormCode("SR", createdAt, serviceRequisitionID)}"><i class="fas fa-ban"></i> 
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


    // ----- GET CLIENT LIST -----
    function getClientList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			clientCode  = "-"
			clientName  = "-"
			address     = "-"
			${id == "0" && "selected"}>N/A</option>`;
        html += clientList.map(client => {
			let address = `${client.clientUnitNumber && titleCase(client.clientUnitNumber)+", "}${client.clientHouseNumber && client.clientHouseNumber +", "}${client.clientBarangay && titleCase(client.clientBarangay)+", "}${client.clientCity && titleCase(client.clientCity)+", "}${client.clientProvince && titleCase(client.clientProvince)+", "}${client.clientCountry && titleCase(client.clientCountry)+", "}${client.clientPostalCode && titleCase(client.clientPostalCode)}`;

            return `
            <option 
                value       = "${client.clientID}" 
                clientCode  = "${getFormCode("CLT", client.createdAt, client.clientID)}"
                clientName  = "${client.clientName}"
				address     = "${address}"
                ${client.clientID == id && "selected"}>
                ${client.clientName}
            </option>`;
        })
        return display ? html : clientList;
    }
    // ----- END GET CLIENT LIST -----


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
			let html = `<option selected disabled>Select Service Name</option>`;
			let serviceList = [...serviceItemList];
			html += serviceList.filter(item => !serviceIDArr.includes(item.serviceID) || item.serviceID == serviceIDArr[index]).map(item => {
                let serviceCode = item.serviceID != "0" ? 
                `${getFormCode("SVC", item.createdAt, item.serviceID)}` : "-"

				return `
				<option 
					value       = "${item.serviceID}" 
					serviceCode = "${serviceCode}"
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
                ${item.serviceID == id && "selected"}>
                ${item.serviceName}
            </option>`;
        })
		
        return display ? html : serviceItemList;
    }
    // ----- END GET SERVICE ITEM -----


	// ----- GET UOM LIST -----
	function getUomList(uomName = null) {
		let html = `<option disabled selected>Select UOM</option>`;
		// if (uomName) {
			uomList.map(uom => {
				html += `
				<option value="${uom.uomName}"
					${uomName == uom.uomName ? "selected" : ""}>${uom.uomName}</option>`;
			})
		// }
		return html;
	}
	// ----- END GET UOM LIST -----


	// ----- GET SERVICE SCOPE -----
	function getServiceScope(scope = {}, readOnly = false) {
		let {
			description = "",
			quantity    = "0",
			uom         = "pcs",
			unitCost    = "0",
			totalCost   = "0",
		} = scope;

		let html = "";
		if (!readOnly) {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						<div class="input-group mb-0">
							<div class="input-group-prepend">
								<button class="btn btn-sm btn-danger btnDeleteScope">
									<i class="fas fa-minus"></i>
								</button>
							</div>
							<input type="text"
								class="form-control validate"
								name="serviceDescription"
								id="serviceDescription"
								data-allowcharacters="[A-Z][a-z][0-9][ ][@][-][_]['][&][()]"
								minlength="2"
								maxlength="75"
								value="${description}"
								autocomplete="off"
								required>
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serviceDescription"></div>
						</div>
					</div>
				</td>
				<td>
					<div class="quantity">
						<input 
							type="text" 
							class="form-control input-quantity text-center"
							data-allowcharacters="[0-9]" 
							min="0.01" 
							max="999999999" 
							id="quantity" 
							name="quantity" 
							autocomplete="off"
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							required>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">
						<select class="form-control validate select2"
							name="serviceUom"
							id="serviceUom"
							required>
							${getUomList(uom)}
						</select>
						<!-- <input 
							type="text" 
							class="form-control validate text-center serviceUom"
							data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-]['][()]" 
							id="serviceUom" 
							name="serviceUom" 
							autocomplete="off"
							minlength="1" 
							maxlength="20" 
							value="${uom}"
							required> -->
						<div class="invalid-feedback d-block" id="invalid-serviceUom"></div>
					</div>
				</td>
				<td>
					<div class="unitcost">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" >₱</span>
							</div>
							<input 
								type="text" 
								class="form-control amount"
								min="0.01" 
								max="9999999999"
								minlength="1"
								maxlength="20" 
								name="unitCost" 
								id="unitCost" 
								value="${unitCost}">
						</div>
						<div class="invalid-feedback d-block" id="invalid-unitCost"></div>
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
					<div class="servicescope">
						${description}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${formatAmount(quantity)}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom || "-"}
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


	// ----- GET SERVICE ROW -----
    function getServiceRow(item = {}, readOnly = false) {
		let {
			requestServiceID = 0,
			serviceID   = "",
			serviceName = "",
			remarks     = "",
			createdAt   = ""
		} = item;

		const buttonAddRow = !readOnly ? `
		<button class="btn btn-md btn-primary float-left ml-2 my-1 btnAddScope">
			<i class="fas fa-plus"></i>
		</button>` : ""

		const scopeData = getTableData(
			`ims_service_scope_tbl`,
			``,
			`requestServiceID = ${requestServiceID}`
		);
		let serviceScopes = `
		<div class="container-fluid">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th style="width: 40%">Description ${!readOnly ? "<code>*</code>" : ""}</th>
						<th style="width: 12%">Quantity ${!readOnly ? "<code>*</code>" : ""}</th>
						<th style="width: 16%">UOM ${!readOnly ? "<code>*</code>" : ""}</th>
						<th style="width: 16%">Unit Cost ${!readOnly ? "<code>*</code>" : ""}</th>
						<th style="width: 16%">Total Cost</th>
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
			${buttonAddRow}
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
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
					</div>
				</td>
				<td>
					<div class="servicecode">-</div>
				</td>
				<td>
					<div class="servicename">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="serviceID"
								id="serviceID"
								style="width: 150px !important"
								required>
								${getServiceItem(serviceID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-serviceID"></div>
						</div>
					</div>
				</td>
                <td>
					${serviceScopes}
				</td>
				<td>
					<div class="remarks">
						<textarea 
							rows="2" 
							style="resize: none" 
							class="form-control validate" 
							data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
							minlength="0"
							maxlength="250"
							name="remarks" 
							id="remarks">${remarks || ""}</textarea>
					</div>
				</td>
			</tr>`;
		}

        return html;
    }
    // ----- END GET SERVICE ROW -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(".itemServiceTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

			// ITEMCODE
			$("td .servicecode", this).attr("id", `servicecode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const serviceID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("project", `true`);
				$(this).attr("id", `projectitemid${j}${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// SCOPE
			$("td .tableScopeBody tr", this).each(function(x) {

				// DESCRIPTION
				$("td .servicescope [name=serviceDescription]", this).attr("id", `serviceDescription${i}${x}`);
				$("td .servicescope .invalid-feedback", this).attr("id", `invalid-serviceDescription${i}${x}`);

				// QUANTITY
				$("td .quantity [name=quantity]", this).attr("id", `quantity${i}${x}`);
				$("td .quantity .invalid-feedback", this).attr("id", `invalid-quantity${i}${x}`);
	
				// UOM
				$("td .uom .serviceUom", this).attr("id", `serviceUom${i}${x}`);
				$("td .uom .invalid-feedback", this).attr("id", `invalid-serviceUom${i}${x}`);
	
				// UNIT COST
				$("td .unitcost [name=unitCost] ", this).attr("id", `unitcost${i}${x}`);
				$("td .unitcost .invalid-feedback", this).attr("id", `invalid-unitcost${i}${x}`);
	
				// TOTAL COST
				$("td .totalcost", this).attr("id", `totalcost${i}${x}`);
			})


			// FILE
			$("td .file [name=files]", this).attr("id", `files${i}`);

			// REMARKS
			$("td .remarks [name=remarks]", this).attr("id", `remarks${i}`);
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let serviceRowCount = 0;
		$(".checkboxrow").each(function() {
			this.checked && serviceRowCount++;
		})
		$(".btnDeleteRow").attr("disabled", serviceRowCount == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


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
							updateTableItems();
							$(`[name=serviceID]`).each(function(i, obj) {
								let serviceID = $(this).val();
								$(this).html(getServiceItem(serviceID));
							}) 
							updateTotalAmount();
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


	// ----- SELECT CLIENT -----
    $(document).on("change", "[name=clientID]", function() {
        const clientID    = $(this).val();
        const clientCode  = $('option:selected', this).attr("clientCode");
        const clientName  = $('option:selected', this).attr("clientName");
        const address     = $('option:selected', this).attr("address");

        $("[name=clientCode]").val(clientCode);
        $("[name=clientName]").val(clientName);
        $("[name=clientAddress]").val(address);

		const projectID = $(`[name=projectID]`).val() || null;

        $(`[name="projectCode"]`).val("-");
        $("[name=projectID]").html(getProjectList(projectID, clientID));
		if (projectID) {
			$("[name=projectID]").trigger("change");
		}
    })
    // ----- END SELECT CLIENT -----


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=projectID]", function() {
        const projectCode = $('option:selected', this).attr("projectCode");

        $("[name=projectCode]").val(projectCode);
    })
    // ----- END SELECT PROJECT LIST -----


	// ----- ADD SCOPE -----
	$(document).on("click", ".btnAddScope", function() {
		let newScope = getServiceScope();
		$(this).parent().find("table tbody").append(newScope);
		$(this).parent().find("[name=serviceDescription]").last().focus();
		initAmount(".amount");
		initQuantity(".input-quantity");
		// initSelect2();
		updateTableItems();
	})
	// ----- END ADD SCOPE -----


	// ----- DELETE SCOPE -----
	$(document).on("click", ".btnDeleteScope", function() {
		const isCanDelete = $(this).closest(".tableScopeBody").find("tr").length > 1;
		if (isCanDelete) {
			const scopeElement = $(this).closest("tr");
			scopeElement.fadeOut(500, function() {
				$(this).closest("tr").remove();
				updateTableItems();
			})
		} else {
			showNotification("danger", "You must have atleast one scope of work.");
		}
	})
	// ----- END DELETE SCOPE -----


    // ----- SELECT SERVICE NAME -----
    $(document).on("change", "[name=serviceID]", function() {
        const serviceCode = $('option:selected', this).attr("serviceCode");
        $(this).closest("tr").find(`.servicecode`).first().text(serviceCode);

		$(`[name=serviceID]`).each(function(i, obj) {
			let serviceID = $(this).val();
			$(this).html(getServiceItem(serviceID));
		}) 
		updateTotalAmount();
    })
    // ----- END SELECT SERVICE NAME -----


	// ----- GET AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
	// ----- END GET AMOUNT -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity], [name=unitCost]", function() {
		const tableRow  = $(this).closest("tr");
		const quantity  = +getNonFormattedAmount(tableRow.find(`[name="quantity"]`).first().val());
		const unitcost  = +getNonFormattedAmount(tableRow.find(`[name="unitCost"]`).first().val());
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


    // ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {
        let row = getServiceRow();
		$(".itemServiceTableBody").append(row);
		updateTableItems();
		initInputmask();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name=quantity]`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`[name=unitCost]`).map(element => getNonFormattedAmount(element.value) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount`).text(formatAmount(totalAmount, true));
		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			serviceRequisitionID          = "",
			reviseServiceRequisitionID    = "",
			employeeID                    = "",
            clientID                      = "",
			projectID                     = "",
			serviceRequisitionReason      = "",
			serviceRequisitionRemarks     = "",
			serviceRequisitionTotalAmount = "0",
			approversID                   = "",
			approversStatus               = "",
			approversDate                 = "",
			serviceRequisitionStatus      = false,
			submittedAt                   = false,
			createdAt                     = false,
		} = data && data[0];

		let requestServiceItems = "";
		if (serviceRequisitionID) {
			let requestServicesData = getTableData(
				`ims_request_services_tbl`,
				``,
				`serviceRequisitionID = ${serviceRequisitionID}`
			)
			requestServicesData.map(item => {
				requestServiceItems += getServiceRow(item, readOnly);
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

		$("#btnBack").attr("serviceRequisitionID", encryptString(serviceRequisitionID));
		$("#btnBack").attr("status", serviceRequisitionStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let checkboxServiceRequisitionHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall">
			</div>
		</th>` : ``;
		let tableServiceRequisitionItems = !disabled ? "tableServiceRequisitionItems" : "tableServiceRequisitionItems0";
		let buttonServiceAddRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? serviceRequisitionID : reviseServiceRequisitionID;
		let documentHeaderClass = isRevise || reviseServiceRequisitionID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseServiceRequisitionID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseServiceRequisitionID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("SR", createdAt, reviseDocumentNo)}
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
							${serviceRequisitionID && !isRevise ? getFormCode("SR", createdAt, serviceRequisitionID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${serviceRequisitionStatus && !isRevise ? getStatusStyle(serviceRequisitionStatus) : "---"}
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
								${getDateApproved(serviceRequisitionStatus, approversID, approversDate)}
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
							${serviceRequisitionRemarks && !isRevise ? serviceRequisitionRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_service_requisition">

            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2" 
                        name="clientID"
                        id="clientID"
						style="width: 100%"
                        required
						${disabled}>
                            <option selected disabled>Select Client Name</option>
                            ${getClientList(clientID)}
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="-">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Project Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
                        required
						${disabled}>
                        <option selected disabled>Select Project Name</option>
                        ${getProjectList(projectID, clientID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
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
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="serviceRequisitionReason"
                        name="serviceRequisitionReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${serviceRequisitionReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-serviceRequisitionReason"></div>
                </div>
            </div>

            <div class="col-sm-12">

                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Services </div>
                    <table class="table table-striped" id="${tableServiceRequisitionItems}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxServiceRequisitionHeader}
                                <th>Service Code</th>
                                <th>Service Name ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Scope of Work</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="itemServiceTableBody">
                            ${requestServiceItems}
                        </tbody>
                    </table>
                    
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonServiceAddRow}</div>
						<div class="font-weight-bolder" style="font-size: 1rem;">
							<span>Total Amount: &nbsp;</span>
							<span class="text-danger" style="font-size: 1.2em" id="totalAmount">${formatAmount(serviceRequisitionTotalAmount, true)}</span>
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
			updateTableItems();
			initAll();
			updateServiceOptions();
			clientID && clientID != 0 && $("[name=clientID]").trigger("change");

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

			headerButton(true, "Add Service Requisition");
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


	// ----- GET SERVICE REQUISITION DATA -----
	function getServiceRequisitionData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0") {

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

		let data = { items: [] };
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["serviceRequisitionID"] = id;

			if (status != "2") {
				data["serviceRequisitionStatus"] = status;
			}
		}

		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3") && method != "approve") {
			
			data["employeeID"] = sessionID;
			data["projectID"]  = $("[name=projectID]").val() || null;
			data["clientID"]   = $("[name=clientID]").val() || null;
			data["serviceRequisitionReason"] = $("[name=serviceRequisitionReason]").val()?.trim();
			data["serviceRequisitionTotalAmount"] = updateTotalAmount();

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["serviceRequisitionID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"] = approversID;
					data["serviceRequisitionStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["serviceRequisitionStatus"] = 2;
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const serviceID   = $("td [name=serviceID]", this).val();	
				const serviceName = serviceID ? $("td [name=serviceID]", this).find(":selected").text().replaceAll("\n", "").trim() : "";
				const remarks   = $("td [name=remarks]", this).val()?.trim();	

				let temp = {
					serviceID, 
					serviceName,
					remarks,
					scopes: []
				};

				$(`td .tableScopeBody tr`, this).each(function() {
					const quantity = +getNonFormattedAmount($(`[name="quantity"]`, this).val());
					const unitCost = +getNonFormattedAmount($(`[name="unitCost"]`, this).val());
					let scope = {
						description: $('[name="serviceDescription"]', this).val()?.trim(),
						uom:         $(`[name="serviceUom"]`, this).val(),
						quantity,
						unitCost,
						totalCost: (quantity * unitCost)
					}
					temp["scopes"].push(scope);
				})

				data["items"].push(temp);
			});
		} 

		

		return data;
	}
	// ----- END GET SERVICE REQUISITION DATA -----


    // ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


    // ----- OPEN EDIT FORM -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT FORM -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----


    // ----- VIEW DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("serviceRequisitionID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("serviceRequisitionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getServiceRequisitionData(action, "save", "0", id);
				data["serviceRequisitionStatus"] = 0;
				if (!isFromCancelledDocument) {
					data["reviseServiceRequisitionID"] = id;
					delete data["serviceRequisitionID"];
				} else {
					data["serviceRequisitionID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
	
				saveServiceRequisition(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getServiceRequisitionData(action, "save", "0", id);
			data["serviceRequisitionStatus"] = 0;

			saveServiceRequisition(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("serviceRequisitionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("SR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getServiceRequisitionData(action, "save", "0", id);
		data["serviceRequisitionStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data["reviseServiceRequisitionID"] = id;
				delete data["serviceRequisitionID"];
			} else {
				data["serviceRequisitionID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}

		saveServiceRequisition(data, "save", null, pageContent);
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
		const id           = decryptString($(this).attr("serviceRequisitionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_service_requisition");
		removeIsValid("#tableServiceRequisitionItems");

		if (validate) {
			
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getServiceRequisitionData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data["reviseServiceRequisitionID"] = id;
					delete data["serviceRequisitionID"];
				}
			}

			let approversID   = data["approversID"], 
				approversDate = data["approversDate"];

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                49,
					notificationTitle:       "Service Requisition",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveServiceRequisition(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("serviceRequisitionID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getServiceRequisitionData(action, "cancelform", "4", id, status);

		saveServiceRequisition(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("serviceRequisitionID"));
		const feedback = $(this).attr("code") || getFormCode("SR", dateToday(), id);
		let tableData  = getTableData("ims_service_requisition_tbl", "", "serviceRequisitionID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getServiceRequisitionData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                49,
					tableID:                 id,
					notificationTitle:       "Service Requisition",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                49,
					tableID:                 id,
					notificationTitle:       "Service Requisition",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["serviceRequisitionStatus"] = status;

			saveServiceRequisition(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("serviceRequisitionID"));
		const feedback = $(this).attr("code") || getFormCode("SR", dateToday(), id);

		$("#modal_service_requisition_content").html(preloader);
		$("#modal_service_requisition .page-title").text("DENY SERVICE REQUISITION");
		$("#modal_service_requisition").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="serviceRequisitionRemarks"
					name="serviceRequisitionRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-serviceRequisitionRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			serviceRequisitionID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_service_requisition_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("serviceRequisitionID"));
		const feedback = $(this).attr("code") || getFormCode("SR", dateToday(), id);

		const validate = validateForm("modal_service_requisition");
		if (validate) {
			let tableData = getTableData("ims_service_requisition_tbl", "", "serviceRequisitionID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {};
				data["action"]               = "update";
				data["method"]               = "deny";
				data["serviceRequisitionID"] = id;
				data["approversStatus"]      = updateApproveStatus(approversStatus, 3);
				data["approversDate"]        = updateApproveDate(approversDate);
				data["serviceRequisitionRemarks"] = $("[name=serviceRequisitionRemarks]").val()?.trim();
				data["updatedBy"] = sessionID;

				let notificationData = {
					moduleID:                49,
					tableID: 				 id,
					notificationTitle:       "Service Requisition",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveServiceRequisition(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("serviceRequisitionID"));
		let data = {};
		data["serviceRequisitionID"] = id;
		data["action"]               = "update";
		data["method"]               = "drop";
		data["updatedBy"]            = sessionID;

		saveServiceRequisition(data, "drop", null, pageContent);
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
	// ----- END APPROVER STATUS --
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Service Requisition";
	let swalText, swalImg;

	$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("hide");

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

function saveServiceRequisition(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `service_requisition/saveServiceRequisition`,
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
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("SR", dateCreated, insertedID)} dropped successfully!`;
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
						}
					} else {
						$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_service_requisition").text().length > 0 && $("#modal_service_requisition").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------