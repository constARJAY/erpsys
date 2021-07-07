$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(41);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("service order");
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
				"ims_service_order_tbl", 
				"reviseServiceOrderID", 
				"reviseServiceOrderID IS NOT NULL AND serviceOrderStatus != 4");

			const data = getTableData(
				`ims_service_order_tbl`,
				`serviceRequisitionID`,
				`serviceOrderID = ${id}`
			);
			const { serviceRequisitionID } = data && data[0];
			const isAllowedForRevise = getTableDataLength(
				`ims_service_order_tbl`,
				`serviceOrderID`,
				`serviceRequisitionID = ${serviceRequisitionID} AND serviceOrderStatus <> 3 AND serviceOrderStatus <> 4`
			);
			return revisedDocumentsID.map(item => item.reviseServiceOrderID).includes(id) || isAllowedForRevise != 0;
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData(
				`ims_service_order_tbl AS isot
					LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
					LEFT JOIN pms_client_tbl AS pct ON isot.clientID = pct.clientID
					LEFT JOIN ims_inventory_vendor_tbl AS iivt ON isot.inventoryVendorID = iivt.inventoryVendorID`, 
				`isot.*, 
				isrt.projectID, 
				isrt.createdAt AS srCreatedAt, 
				pct.createdAt AS pctCreatedAt,
				iivt.createdAt AS iivtCreatedAt`, 
				"serviceOrderID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					serviceOrderStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (serviceOrderStatus == 0 || serviceOrderStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (serviceOrderStatus == 0) {
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
					const isAllowed = isCreateAllowed(41);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/service_order?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/service_order?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/service_order?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/service_order`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const serviceRequisitionList = getTableData(
		`ims_service_requisition_tbl`,
		"",
		`serviceRequisitionStatus = 2`
	)

	const inventoryVendorList = getTableData(
		`ims_inventory_vendor_tbl`,
		``,
		`inventoryVendorStatus = 1`
	)

	const projectList = getTableData(
		"pms_project_list_tbl", 
		"*",
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
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 280 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 300 },
					{ targets: 8,  width: 80  },
					{ targets: 9,  width: 200 },
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
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 280 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 300 },
					{ targets: 8,  width: 80  },
					{ targets: 9,  width: 200 },
				],
			});

        var table = $("#tableProjectOrderItems")
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
					{ targets: 0,  width: 50  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 150 },
					{ targets: 9,  width: 200 },
				],
			});

		var table = $("#tableProjectOrderItems0")
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
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 50  },
					{ targets: 3,  width: 120 },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 200 },
				],
			});

		var table = $("#tableServiceOrderItems")
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

		var table = $("#tableServiceOrderItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                paging: false,
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
			if (isImModuleApprover("ims_service_order_tbl", "approversID")) {
				let count = getCountForApproval("ims_service_order_tbl", "serviceOrderStatus");
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
			if (isCreateAllowed(41)) {
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
		let serviceOrderData = getTableData(
			`ims_service_order_tbl AS isot 
				LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
				LEFT JOIN pms_client_tbl AS pct ON isot.clientID = pct.clientID
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON isot.employeeID = helt.employeeID`,
			`isot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isot.createdAt AS dateCreated, projectListCode, projectListName, pct.clientName, isrt.createdAt AS isrtCreatedAt`,
			`isot.employeeID != ${sessionID} AND isot.serviceOrderStatus != 0 AND isot.serviceOrderStatus != 4`,
			`FIELD(serviceOrderStatus, 0, 1, 3, 2, 4, 5), COALESCE(isot.submittedAt, isot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
				<tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Reference No.</th>
					<th>Client Name</th>
					<th>Project Code</th>
					<th>Project Name</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
				</tr>
            </thead>
            <tbody>`;

		serviceOrderData.map((item) => {
			let {
				fullname,
				serviceOrderID,
				serviceRequisitionID,
				isrtCreatedAt,
				clientName,
				projectID,
				projectListCode,
				projectListName,
				approversID,
				approversDate,
				serviceOrderStatus,
				serviceOrderRemarks,
				serviceOrderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceOrderRemarks ? serviceOrderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceOrderStatus == 2 || serviceOrderStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = serviceOrderStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, serviceOrderStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(serviceOrderID )}">
					<td>${getFormCode("SO", createdAt, serviceOrderID )}</td>
					<td>${fullname}</td>
					<td>${serviceRequisitionID != "0" ? getFormCode("SR", isrtCreatedAt, serviceRequisitionID) : "-"}</td>
					<td>${clientName   || '-'}</td>
					<td>
						<div>
						${projectListCode || '-'}
						</div>
						<small style="color:#848482;">${serviceOrderReason}</small>
					</td>
					<td>${projectListName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, serviceOrderStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(serviceOrderStatus)}
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
		let serviceOrderData = getTableData(
			`ims_service_order_tbl AS isot 
				LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
				LEFT JOIN pms_client_tbl AS pct ON isot.clientID = pct.clientID
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = isrt.projectID
				LEFT JOIN hris_employee_list_tbl AS helt ON isot.employeeID = helt.employeeID`,
			`isot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isot.createdAt AS dateCreated, projectListCode, projectListName, pct.clientName, isrt.createdAt AS isrtCreatedAt`,
			`isot.employeeID = ${sessionID}`,
			`FIELD(serviceOrderStatus, 0, 1, 3, 2, 4, 5), COALESCE(isot.submittedAt, isot.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
				<tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Reference No.</th>
                    <th>Client Name</th>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		serviceOrderData.map((item) => {
			let {
				fullname,
				serviceOrderID,
				serviceRequisitionID,
				isrtCreatedAt,
				clientName,
                projectID,
                projectListCode,
                projectListName,
				approversID,
				approversDate,
				serviceOrderStatus,
				serviceOrderRemarks,
				serviceOrderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceOrderRemarks ? serviceOrderRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceOrderStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = serviceOrderStatus != 0 ? "btnView" : "btnEdit";

			html += `
            <tr class="${btnClass}" id="${encryptString(serviceOrderID )}">
                <td>${getFormCode("SO", createdAt, serviceOrderID )}</td>
                <td>${fullname}</td>
				<td>${serviceRequisitionID != "0" ? getFormCode("SR", isrtCreatedAt, serviceRequisitionID) : "-"}</td>
                <td>${clientName   || '-'}</td>
				<td>
					<div>
					${projectListCode || '-'}
					</div>
					<small style="color:#848482;">${serviceOrderReason}</small>
				</td>
				<td>${projectListName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, serviceOrderStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(serviceOrderStatus)}
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
				serviceOrderID     = "",
				serviceOrderStatus = "",
				employeeID          = "",
				approversID         = "",
				approversDate       = "",
				createdAt           = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (serviceOrderStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						serviceOrderID="${encryptString(serviceOrderID)}"
						code="${getFormCode("S0", createdAt, serviceOrderID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}"
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (serviceOrderStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"
							status="${serviceOrderStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (serviceOrderStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						serviceOrderID="${encryptString(serviceOrderID)}"
						code="${getFormCode("SO", createdAt, serviceOrderID)}"
						status="${serviceOrderStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (serviceOrderStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(serviceOrderID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"
							status="${serviceOrderStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (serviceOrderStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(serviceOrderID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("SO", createdAt, serviceOrderID)}"
							status="${serviceOrderStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (serviceOrderStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							serviceOrderID="${encryptString(serviceOrderID)}"
							code="${getFormCode("S0", createdAt, serviceOrderID)}"><i class="fas fa-ban"></i> 
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


	// ----- GET SERVICE REQUISITION LIST -----
	function getServiceRequisitionList(id = null, status = 0, display = true) {
		const createdSRList = getTableData("ims_service_order_tbl", "serviceRequisitionID", "serviceOrderStatus <> 3 AND serviceOrderStatus <> 4").map(sr => sr.serviceRequisitionID);
		let html = ``;
		if (!status || status == 0) {
			html += serviceRequisitionList.filter(sr => createdSRList.indexOf(sr.serviceRequisitionID) == -1 || sr.serviceRequisitionID == id).map(sr => {
				return `
				<option 
				value     = "${sr.serviceRequisitionID}" 
				srCode    = "${getFormCode("SR", sr.createdAt, sr.serviceRequisitionID)}"
				clientID  = "${sr.clientID}"
				projectID = "${sr.projectID}"
				${sr.serviceRequisitionID == id && "selected"}>
				${getFormCode("SR", sr.createdAt, sr.serviceRequisitionID)}
				</option>`;
			})
		} else {
			html += serviceRequisitionList.map(sr => {
				return `
				<option 
					value     = "${sr.serviceRequisitionID}" 
					srCode    = "${getFormCode("SR", sr.createdAt, sr.serviceRequisitionID)}"
					clientID  = "${sr.clientID}"
					projectID = "${sr.projectID}"
					${sr.serviceRequisitionID == id && "selected"}>
					${getFormCode("SR", sr.createdAt, sr.serviceRequisitionID)}
				</option>`;
			})
		}
        return display ? html : serviceRequisitionList;

	}
	// ----- GET SERVICE REQUISITION LIST -----


	// ----- GET INVENTORY VENDOR LIST -----
	function getInventoryVendorList(id = null, display = true) {
		let html = `
		<option 
			value                 = ""
			companyCode           = "-"
			companyName           = "-"
			companyContactDetails = "-"
			companyContactPerson  = "-"
			companyAddress        = "-"
			companyVatable        = "0"
			selected disabled>Select Company Name</option>`;
        html += inventoryVendorList.map(vendor => {
			const { 
				inventoryVendorID,
				inventoryVendorName, 
				inventoryVendorVAT = 0, 
				inventoryVendorProvince,
				inventoryVendorCity,
				inventoryVendorBarangay,
				inventoryVendorUnit,
				inventoryVendorBuilding,
				inventoryVendorCountry,
				inventoryVendorZipCode,
				inventoryVendorPerson,
				inventoryVendorMobile,
				inventoryVendorTelephone,
				createdAt 
			} = vendor;

			let address = `${inventoryVendorUnit && titleCase(inventoryVendorUnit)+", "}${inventoryVendorBuilding && inventoryVendorBuilding +", "}${inventoryVendorBarangay && titleCase(inventoryVendorBarangay)+", "}${inventoryVendorCity && titleCase(inventoryVendorCity)+", "}${inventoryVendorProvince && titleCase(inventoryVendorProvince)+", "}${inventoryVendorCountry && titleCase(inventoryVendorCountry)+", "}${inventoryVendorZipCode && titleCase(inventoryVendorZipCode)}`;
			let contactDetails = `${inventoryVendorMobile} / ${inventoryVendorTelephone}`;

            return `
            <option 
                value                 = "${inventoryVendorID}" 
                companyCode           = "${getFormCode("VEN", createdAt, inventoryVendorID)}"
				companyName           = "${inventoryVendorName}"
				companyContactDetails = "${contactDetails}"
				companyContactPerson  = "${inventoryVendorPerson}"
				companyAddress        = "${address}"
				companyVatable        = "${inventoryVendorVAT}"
                ${inventoryVendorID == id && "selected"}>
                ${inventoryVendorName}
            </option>`;
        }).join("")
        return display ? html : inventoryVendorList;
	}
	// ----- END GET INVENTORY VENDOR LIST -----


	// ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			${id == "0" && "selected"}>N/A</option>`;
        html += projectList.map(project => {
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
					serviceUom  = "${item.serviceUom}"
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


	// ----- GET UOM LIST -----
	function getUomList(uomName = null) {
		let html = `<option disabled selected>Select UOM</option>`;
		if (uomName) {
			uomList.map(uom => {
				html += `
				<option value="${uom.uomName}"
					${uomName == uom.uomName ? "selected" : ""}>${uom.uomName}</option>`;
			})
		}
		return html;
	}
	// ----- END GET UOM LIST -----


	// ----- GET SERVICE SCOPE -----
	function getServiceScope(scope = {}, readOnly = false) {
		let {
			description = "-",
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
							style="width: 100%"
							name="serviceUom"
							id="serviceUom"
							required>
							${getUomList(uom)}
						</select>
						<!-- <input 
							type="text" 
							class="form-control validate text-center"
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
						${description || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${formatAmount(quantity)}
					</div>
				</td>
				<td>
					<div class="uom">
						${!uom || uom.replaceAll(" ", "").toLowerCase() == `selectuomliterpieceselectuom` ? "-" : uom}
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


	// ----- GET ITEM ROW -----
    function getServiceRow(item = {}, readOnly = false) {
		let {
			requestServiceID = 0,
			serviceID        = "",
			serviceName      = "-",
			remarks          = "",
			createdAt        = ""
		} = item;

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
				return getServiceScope(scope, readOnly);
			}).join("");
		} else {
			if (!readOnly) {
				serviceScopes += getServiceScope();
			}
		}
		serviceScopes += `
				</tbody>
			</table>
		</div>`;

		let serviceCode = serviceID ? getFormCode("SVC", createdAt, serviceID) : "-";

		let html = "";
		if (readOnly) {
			html += `
			<tr class="itemTableRow" serviceID="${serviceID}" serviceName="${serviceName}">
				<td>
					<div class="servicecode">
						${serviceCode}
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
			<tr class="itemTableRow" serviceID="${serviceID}" serviceName="${serviceName}">
				<td>
					<div class="servicecode">
						${serviceCode}
					</div>
				</td>
				<td>
					<div class="servicename">
						${serviceName}
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
							minlength="1"
							maxlength="100"
							name="remarks" 
							id="remarks">${remarks || ""}</textarea>
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
				$(this).attr("id", `serviceUom${i}${j}`)
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
		let projectCount = 0, companyCount = 0;
		$(".checkboxrow[project=true]").each(function() {
			this.checked && projectCount++;
		})
		$(".btnDeleteRow[project=true]").attr("disabled", projectCount == 0);
		$(".checkboxrow[company=true]").each(function() {
			this.checked && companyCount++;
		})
		$(".btnDeleteRow[company=true]").attr("disabled", companyCount == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow(isProject = true) {
		const attr = isProject ? "[project=true]" : "[company=true]";
		if ($(`.checkboxrow${attr}:checked`).length != $(`.checkboxrow${attr}`).length) {
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
					$(`.checkboxrow${attr}:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableItems();
							$(`[name=itemID]${attr}`).each(function(i, obj) {
								let itemID = $(this).val();
								$(this).html(getInventoryItem(itemID, isProject));
							}) 
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


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=projectID]", function() {
        const projectCode = $('option:selected', this).attr("projectCode");

        $("[name=projectCode]").val(projectCode);
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
		return +amount?.replaceAll(",", "").replace("₱", "")?.trim();
	}
	// ----- END GET AMOUNT -----


	// ----- SELECT DISCOUNT TYPE -----
	$(document).on("change", `[name="discountType"]`, function() {
		const discountType = $(this).val();
		const totalAmount  = getNonFormattedAmount($(`#total`).text());
		$(`[name="discount"]`).val("0").trigger("keyup");
		if (discountType == "percent") {
			$(`[name="discount"]`).attr("max", "100");
			$(`[name="discount"]`).attr("maxlength", "6");
		} else {
			$(`[name="discount"]`).attr("max", totalAmount);
			$(`[name="discount"]`).attr("maxlength", formatAmount(totalAmount).length);
		}
		initAmount("#discount");
	})
	// ----- END SELECT DISCOUNT TYPE -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name=quantity]`).map(element => +getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`[name=unitCost]`).map(element => +getNonFormattedAmount(element.value) || "0");
		const total    = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#total`).text(formatAmount(total, true));
		
		const discount = getNonFormattedAmount($("#discount").val());
		let totalAmount = total - discount;
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}

		$(`#totalAmount`).text(formatAmount(totalAmount, true));

		const vat = getNonFormattedAmount($("#vat").val());
		const vatSales = totalAmount - vat;
		$(`#vatSales`).text(formatAmount(vatSales, true));
		
		const totalVat = totalAmount;
		$(`#totalVat`).text(formatAmount(totalVat, true));
		
		const lessEwt = getNonFormattedAmount($("#lessEwt").val());
		const grandTotalAmount = totalVat - lessEwt;
		$(`#grandTotalAmount`).text(formatAmount(grandTotalAmount, true));

		return total;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET CLIENT -----
	function getClient(clientID = null) {
		let clientCode = "-", clientName = "-", clientAddress = "-", clientContactDetails = "-", clientContactPerson = "-";
		if (clientID) {
			clientList.filter(c => c.clientID == clientID).map(c => {
				clientAddress = `${c.clientUnitNumber && titleCase(c.clientUnitNumber)+", "}${c.clientHouseNumber && c.clientHouseNumber +", "}${c.clientBarangay && titleCase(c.clientBarangay)+", "}${c.clientCity && titleCase(c.clientCity)+", "}${c.clientProvince && titleCase(c.clientProvince)+", "}${c.clientCountry && titleCase(c.clientCountry)+", "}${c.clientPostalCode && titleCase(c.clientPostalCode)}`;

				clientCode           = getFormCode("CLT", c.createdAt, c.clientID);
				clientName           = c.clientName,
				clientAddress        = clientAddress.replaceAll("\n", "").trim();
				clientContactDetails = `${c.client_MobileNo} / ${c.clientTelephoneNo}`;
				clientContactPerson  = c.clientContactPerson
			})
		}
		$(`[name="clientCode"]`).val(clientCode);
		$(`[name="clientName"]`).val(clientName);
		$(`[name="clientAddress"]`).val(clientAddress);
		$(`[name="clientContactDetails"]`).val(clientContactDetails);
		$(`[name="clientContactPerson"]`).val(clientContactPerson);
	}
	// ----- END GET CLIENT -----


	// ----- KEYUP DISCOUNT -----
	$(document).on("keyup", "[name=discount]", function() {
		const discount = getNonFormattedAmount($(this).val());
		const total    = getNonFormattedAmount($("#total").text());
		
		let totalAmount = total - discount;
		const discountType = $(`[name="discountType"]`).val();
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}
		$("#totalAmount").html(formatAmount(totalAmount, true));

		const isVatable = $(`[name="inventoryVendorID"] option:selected`).attr("companyVatable") == "1";
		let vat = 0, vatSales = 0;
		if (isVatable) {
			vatSales = totalAmount / 1.12;
			vat      = totalAmount - vatSales;
		}

		$("#vatSales").html(formatAmount(vatSales, true));
		$(`[name="vat"]`).val(vat);

		const totalVat = totalAmount;
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
		const serviceOrderID = decryptString($(this).attr("serviceOrderID"));
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
				formData.append("serviceOrderID", serviceOrderID);
				formData.append("files", files[0]);
				saveServiceOrderContract(formData, filenameArr.join("."));
			}
		}
	})
	// ----- END UPLOAD CONTRACT -----


	// ----- SELECT SERVICE REQUISITION ID -----
	$(document).on("change", `[name="serviceRequisitionID"]`, function() {
		const serviceRequisitionID = $(this).val();
		const clientID  = $("option:selected", this).attr("clientID");
		const projectID = $("option:selected", this).attr("projectID");
		projectID && $(`[name="projectID"]`).val(projectID).trigger("change");
		clientID && getClient(clientID);
		const services = getServicesDisplay([{serviceRequisitionID}]);
		$(`#tableServiceDisplay`).html(preloader);
		setTimeout(() => {
			$(`#tableServiceDisplay`).html(services);
			initDataTables();
			initSelect2("#discountType");
			updateTableItems();
			updateServiceOptions();
			initAmount("#lessEwt", true);
			initAmount("#vat", true);
			removeIsValid("#tableServiceOrderItems0");
			costSummary();

			const discountType = $(`[name="discountType"]`).val();
			const totalAmount  = getNonFormattedAmount($(`#total`).text());
			$(`[name="discount"]`).val("0").trigger("keyup");
			if (discountType == "percent") {
				$(`[name="discount"]`).attr("max", "100");
				$(`[name="discount"]`).attr("maxlength", "6");
			} else {
				$(`[name="discount"]`).attr("max", totalAmount);
				$(`[name="discount"]`).attr("maxlength", formatAmount(totalAmount).length);
			}
			initAmount("#discount", false);
		}, 200);
	})
	// ----- END SELECT SERVICE REQUISITION ID -----


	// ----- SELECT INVENTORY VENDOR -----
	$(document).on("change", `[name="inventoryVendorID"]`, function() {
		const inventoryVendorID     = $(this).val();
		const companyCode           = $(`option:selected`, this).attr("companyCode");
		const companyName           = $(`option:selected`, this).attr("companyName");
		const companyContactDetails = $(`option:selected`, this).attr("companyContactDetails");
		const companyContactPerson  = $(`option:selected`, this).attr("companyContactPerson");
		const companyAddress        = $(`option:selected`, this).attr("companyAddress");
		const companyVatable        = $(`option:selected`, this).attr("companyVatable");

		if (companyVatable == "1") {
			const total = +getNonFormattedAmount($("#total").text());
			const vatSales = total / 1.12;
			const vat      = total - vatSales;
			const lessEwt  = vatSales != 0 ? vatSales * 0.02 : 0;
			const totalVat = getNonFormattedAmount($(`#totalVat`).text());
			const grandTotalAmount = totalVat - lessEwt;
			$(`#vatSales`).text(formatAmount(vatSales, true));
			$(`[name="vat"]`).val(vat);
			$(`[name="lessEwt"]`).val(lessEwt);
			$(`#grandTotalAmount`).text(formatAmount(grandTotalAmount, true))
		}

		$(`[name="companyCode"]`).val(companyCode);
		$(`[name="companyContactDetails"]`).val(companyContactDetails);
		$(`[name="companyContactPerson"]`).val(companyContactPerson || "-");
		$(`[name="companyAddress"]`).val(companyAddress || "-");
	})
	// ----- END SELECT INVENTORY VENDOR -----


	// ----- GET SERVICE ORDER DATA -----
	function getServiceOrderData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isRevise = false) {
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
			data["serviceOrderID"] = id;

			if (status != "2") {
				data["serviceOrderStatus"] = status;
			}
		}

		data["action"]     = action;
		data["method"]     = method;
		data["updatedBy"]  = sessionID;
		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3" || (currentStatus == "4" && isRevise)) && method != "approve") {

			data["serviceRequisitionID"]  = $("[name=serviceRequisitionID]").val() || null;
			data["employeeID"] = sessionID;
			data["projectID"]  = $("[name=serviceRequisitionID] option:selected").attr("projectID") || null;
			data["clientID"]   = $("[name=serviceRequisitionID] option:selected").attr("clientID") || null;
			data["clientName"] = $(`[name="clientName"]`).val()?.trim() || null;
			data["clientContactDetails"] = $(`[name="clientContactDetails"]`).val()?.trim() || null;
			data["clientContactPerson"]  = $(`[name="clientContactPerson"]`).val()?.trim() || null;
			data["clientAddress"]        = $(`[name="clientAddress"]`).val()?.trim() || null;

			data["inventoryVendorID"]     = $("[name=inventoryVendorID]").val() || null;
			data["companyName"]           = $("[name=inventoryVendorID] option:selected").text()?.trim() || null;
			data["companyContactDetails"] = $(`[name="companyContactDetails"]`).val()?.trim() || null;
			data["companyContactPerson"]  = $(`[name="companyContactPerson"]`).val()?.trim() || null;
			data["companyAddress"]        = $(`[name="companyAddress"]`).val()?.trim() || null;

			data["paymentTerms"]     = $("[name=paymentTerms]").val()?.trim();
			data["discountType"]     = $("[name=discountType]").val();
			data["scheduleDate"]     = moment($("[name=scheduleDate]").val()).format("YYYY-MM-DD");
			data["serviceOrderReason"] = $("[name=serviceOrderReason]").val()?.trim();
			data["total"]            = +getNonFormattedAmount($("#total").text());
			data["discount"]         = +getNonFormattedAmount($("#discount").val());
			data["totalAmount"]      = +getNonFormattedAmount($("#totalAmount").text());
			data["vatSales"]         = +getNonFormattedAmount($("#vatSales").text());
			data["vat"]              = +getNonFormattedAmount($("#vat").val());
			data["totalVat"]         = +getNonFormattedAmount($("#totalVat").text());
			data["lessEwt"]          = +getNonFormattedAmount($("#lessEwt").val());
			data["grandTotalAmount"] = +getNonFormattedAmount($("#grandTotalAmount").text());

			if (action == "insert") {
				data["createdBy"] = sessionID;
				data["createdAt"] = dateToday();
			} else if (action == "update") {
				data["serviceOrderID"]  = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]         = approversID;
					data["serviceOrderStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]         = sessionID;
					data["approversStatus"]     = 2;
					data["approversDate"]       = dateToday();
					data["serviceOrderStatus"] = 2;
				}
			}

			// if (isRevise) {
				$(".itemTableRow").each(function(i, obj) {
					const serviceID   = $(this).attr("serviceID");	
					const serviceName = $(this).attr("serviceName");
					const remarks     = $("td [name=remarks]", this).val()?.trim() || $("td .remarks", this).text()?.trim();	
	
					let temp = {
						serviceID, 
						serviceName,
						remarks,
						scopes: []
					};
	
					$(`td .tableScopeBody tr`, this).each(function() {
						const quantity = +getNonFormattedAmount($(`[name="quantity"]`, this).val()) || +getNonFormattedAmount($(`.quantity`, this).text());
						const unitCost = +getNonFormattedAmount($(`[name="unitCost"]`, this).val()) || +getNonFormattedAmount($(`.unitcost`, this).text());
						let scope = {
							description: $('[name="serviceDescription"]', this).val()?.trim() || $(`.servicescope`, this).text().trim(),
							uom: $(`[name="serviceUom"]`, this).val()?.trim() || $(`.uom`, this).text().trim(),
							quantity,
							unitCost,
							totalCost: (quantity * unitCost)
						}
						temp["scopes"].push(scope);
					})
	
					data["items"].push(temp);
				});
			// }
		} 

		return data;
	} 
	// ----- END GET SERVICE ORDER DATA -----


	// ----- GET SERVICES DISPLAY -----
	function getServicesDisplay(data = false, readOnly = false, isFromCancelledDocument = false) {
		let disabled = readOnly ? "disabled" : "";

		let {
			serviceOrderID           = "",
			reviseServiceOrderID     = "",
			employeeID               = "",
			clientID                 = "",
			projectID                = "",
			serviceRequisitionID     = "",
			srCreatedAt              = new Date,
			clientName               = "-",
			clientAddress            = "-",
			clientContactDetails     = "",
			clientContactPerson      = "",
			paymentTerms             = "",
			scheduleDate             = "",
			serviceRequisitionReason = "",
			discountType             = "",
			total                    = 0,
			discount                 = 0,
			totalAmount              = 0,
			vatSales                 = 0,
			vat                      = 0,
			totalVat                 = 0,
			lessEwt                  = 0,
			grandTotalAmount         = 0,
			serviceOrderRemarks      = "",
			approversID              = "",
			approversStatus          = "",
			approversDate            = "",
			contractFile		     = "",
			serviceOrderStatus       = false,
			submittedAt              = false,
			createdAt                = false,
		} = data && data[0];

		let requestServiceItems = "";
		if (serviceRequisitionID) {
			let requestServicesData;
			if (serviceOrderID) {
				requestServicesData = getTableData(
					`ims_request_services_tbl`,
					``,
					`serviceRequisitionID = ${serviceRequisitionID} AND serviceOrderID = ${serviceOrderID} AND serviceCompletionID IS NULL`
				)
			} else {
				requestServicesData = getTableData(
					`ims_request_services_tbl`,
					``,
					`serviceRequisitionID = ${serviceRequisitionID} AND serviceOrderID IS NULL AND serviceCompletionID IS NULL`
				);
			}
			requestServicesData.map(item => {
				requestServiceItems += getServiceRow(item, readOnly || serviceOrderStatus != 3);
			})
		} else {
			requestServiceItems += getServiceRow();
		}

		let discountDisplay = "";
		if (serviceOrderStatus && serviceOrderStatus != "0" && serviceOrderStatus != "4") {
			discountDisplay = discountType == "percent" ? `
			<div class="py-0 text-dark border-bottom">${formatAmount(discount)} %</div>` :
			`<div class="py-0 text-dark border-bottom">${formatAmount(discount, true)}</div>`;
		} else {
			if (serviceOrderStatus == "4" && !isFromCancelledDocument) {
				discountDisplay = discountType == "percent" ? `
				<div class="py-0 text-dark border-bottom">${formatAmount(discount)} %</div>` :
				`<div class="py-0 text-dark border-bottom">${formatAmount(discount, true)}</div>`;
			} else {
				discountDisplay = `
				<div class="input-group">
					<div class="input-group-prepend">
						<select class="select2"
							name="discountType"
							id="discountType"
							style="width: 52px !important;">
							<option value="amount" ${discountType == "amount" ? "selected" : ""}>₱</option>
							<option value="percent" ${discountType == "percent" ? "selected" : ""}>%</option>
						</select>
					</div>
					<input 
						type="text" 
						class="form-control-plaintext amount py-0 text-dark border-bottom"
						min="0" 
						max="${discountType == "percent" ? "100" : total}"
						minlength="1"
						maxlength="${formatAmount(discountType == "percent" ? "100" : total).length}" 
						name="discount" 
						id="discount" 
						style="font-size: 1.02em;"
						value="${discount}"
						${disabled}>
				</div>`;
			}
		}

		let html = `
		<table class="table table-striped" id="tableServiceOrderItems0">
			<thead>
				<tr style="white-space: nowrap">
					<th>Service Code</th>
					<th>Service Name</th>
					<th>Scope of Work</th>
					<th>Remarks</th>
				</tr>
			</thead>
			<tbody class="itemServiceTableBody">
				${requestServiceItems}
			</tbody>
		</table>

		<div class="col-12">
			<div class="row py-2">
				<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pt-3 pb-2">
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Total :</div>
						<div class="col-6 col-lg-5 text-right text-dark"
							style="font-size: 1.05em"
							id="total">
							${formatAmount(total, true)}
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Discount :</div>
						<div class="col-6 col-lg-5 text-right text-dark">
							${discountDisplay}
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Total Amount:</div>
						<div class="col-6 col-lg-5 text-right text-dark"
							id="totalAmount"
							style="font-size: 1.05em">
							${formatAmount(totalAmount, true)}
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Vatable Sales:</div>
						<div class="col-6 col-lg-5 text-right text-dark"
							id="vatSales"
							style="font-size: 1.05em">
							${formatAmount(vatSales, true)}
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Vat 12%:</div>
						<div class="col-6 col-lg-5 text-right text-dark">
							<input 
								type="text" 
								class="form-control-plaintext amount py-0 text-dark border-bottom"
								min="0" 
								max="9999999999"
								minlength="1"
								maxlength="20" 
								name="vat" 
								id="vat" 
								style="font-size: 1.02em;"
								value="${vat}"
								readonly>
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Total:</div>
						<div class="col-6 col-lg-5 text-right text-dark"
							id="totalVat"
							style="font-size: 1.05em">
							${formatAmount(totalVat, true)}
						</div>
					</div>
					<div class="row" style="font-size: 1.1rem">
						<div class="col-6 col-lg-7 text-left">Less EWT:</div>
						<div class="col-6 col-lg-5 text-right text-dark">
							<input 
								type="text" 
								class="form-control-plaintext amount py-0 text-dark border-bottom"
								min="0" 
								max="9999999999"
								minlength="1"
								maxlength="20" 
								name="lessEwt" 
								id="lessEwt" 
								style="font-size: 1.02em;"
								value="${lessEwt}"
								${disabled}>
						</div>
					</div>
					<div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
						<div class="col-6 col-lg-7 text-left font-weight-bolder">Grand Total:</div>
						<div class="col-6 col-lg-5 text-right text-danger font-weight-bolder"
							id="grandTotalAmount"
							style="font-size: 1.3em">
							${formatAmount(grandTotalAmount, true)}
						</div>
					</div>
				</div>
			</div>
		</div>`;
		return html;
	}
	// ----- END GET SERVICES DISPLAY -----


	// ----- COST SUMMARY -----
	function costSummary() {
		let total = +getNonFormattedAmount($("#total").text());
		let totalCost = 0;
		if (total <= 0) {
			$(".totalcost").each(function(i) {
				let tempTotalCost = +getNonFormattedAmount($(this).text().trim());
				totalCost += tempTotalCost;
			})

			$("#total").text(formatAmount(totalCost, true));
			$("#discount").val("0.00");
			$("#totalAmount").text(formatAmount(totalCost, true));

			const isVatable = $(`[name="inventoryVendorID"] option:selected`).attr("companyVatable") == "1";
			let vat = 0, vatSales = 0;
			if (isVatable) {
				vatSales = totalCost / 1.12;
				vat      = totalCost - vatSales;
			}
			$("#vat").val(vat);
			$("#vatSales").text(formatAmount(vatSales, true));
			const totalVat = totalCost;
			$("#totalVat").text(formatAmount(totalVat, true));
			const lessEwt = vatSales != 0 ? vatSales * 0.01 : 0;
			$("#lessEwt").val(lessEwt);
			const grandTotalAmount = totalVat - lessEwt;
			$("#grandTotalAmount").text(formatAmount(grandTotalAmount, true));
		}
	}
	// ----- END COST SUMMARY -----


	// ----- DISPLAY CONTRACT -----
	function displayContract(filename = null, link = false) {
		let result = "";
		if (filename) {
			if (link) {
				result = `<a 
					href="${base_url}assets/upload-files/contracts/${filename}"
					class="pr-3"
					target="_blank"
					id="displayContract">${filename}</a>`;
			} else {
				result = `<div class="pr-3">${filename}<div>`
			}
		}
		return result;
	}
	// ----- END DISPLAY CONTRACT -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly     = isRevise ? false : readOnly;

		let {
			serviceOrderID           = "",
			reviseServiceOrderID     = "",
			employeeID               = "",
			clientID                 = "",
			inventoryVendorID        = "",
			projectID                = "",
			serviceRequisitionID     = "",
			srCreatedAt              = new Date,
			pctCreatedAt             = new Date,
			iivtCreatedAt            = new Date,
			clientCode               = "-",
			clientName               = "-",
			clientAddress            = "-",
			clientContactDetails     = "",
			clientContactPerson      = "",
			companyCode              = "-",
			companyName              = "-",
			companyAddress           = "-",
			companyContactDetails    = "",
			companyContactPerson     = "",
			paymentTerms             = "",
			scheduleDate             = "",
			serviceRequisitionReason = "",
			serviceOrderReason       = "",
			total                    = 0,
			discount                 = 0,
			totalAmount              = 0,
			vatSales                 = 0,
			vat                      = 0,
			totalVat                 = 0,
			lessEwt                  = 0,
			grandTotalAmount         = 0,
			serviceOrderRemarks      = "",
			approversID              = "",
			approversStatus          = "",
			approversDate            = "",
			contractFile		     = "",
			serviceOrderStatus       = false,
			submittedAt              = false,
			createdAt                = false,
		} = data && data[0];
		clientCode = clientID ? getFormCode("CLT", pctCreatedAt, clientID) : "-";

		let requestServiceItems = "";
		if (serviceRequisitionID) {
			let requestServicesData = getTableData(
				`ims_request_services_tbl`,
				``,
				`serviceOrderID = ${serviceOrderID}`
			)
			requestServicesData.map(item => {
				requestServiceItems += getServiceRow(item, readOnly || serviceOrderStatus != 3);
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

		$("#btnBack").attr("serviceOrderID", encryptString(serviceOrderID));
		$("#btnBack").attr("status", serviceOrderStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let disabledReference = serviceRequisitionID && serviceRequisitionID != "0" ? "disabled" : disabled;

		let button = formButtons(data, isRevise, isFromCancelledDocument);

		// ----- PRINT BUTTON -----
		let approvedButton = '';
		if (serviceOrderStatus == 2) {
			approvedButton += `<div class="w-100 text-right pb-4">`;
			if (grandTotalAmount > 0) {
				const file = contractFile || "";
				const path = file ? `${base_url}assets/upload-files/contracts/${file}` : "javascript:void(0)";

				// approvedButton += `
				// <a href="${path}" 
				// 	class="pr-3" 
				// 	target="_blank"
				// 	id="displayContract">${file}</a>`;
				approvedButton += `
				<span id="displayContractParent">
					${displayContract(file, file ? true : false)}
				</span>`;

				if (employeeID == sessionID) {
					approvedButton += `
					<input type="file"
						id="contractFile"
						name="contractFile"
						serviceOrderID="${encryptString(serviceOrderID)}"
						class="d-none"
						accept="image/*, .pdf, .docx, .doc">
					<button 
						class="btn btn-secondary py-2" 
						serviceOrderID="${encryptString(serviceOrderID)}"
						id="btnUploadContract">
						<i class="fas fa-file-upload"></i> Upload Contract
					</button>`;
				}
			}

			if (isPrintAllowed(41)) {
				approvedButton += `
					<button 
						class="btn btn-info py-2" 
						serviceOrderID="${encryptString(serviceOrderID)}"
						id="btnExcel">
						<i class="fas fa-file-excel"></i> Excel
					</button>
				</div>`;
			}
		}
		// ----- END PRINT BUTTON -----

		let reviseDocumentNo    = isRevise ? serviceOrderID : reviseServiceOrderID;
		let documentHeaderClass = isRevise || reviseServiceOrderID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseServiceOrderID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseServiceOrderID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("SO", createdAt, reviseDocumentNo)}
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
							${serviceOrderID && !isRevise ? getFormCode("SO", createdAt, serviceOrderID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${serviceOrderStatus && !isRevise ? getStatusStyle(serviceOrderStatus) : "---"}
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
								${getDateApproved(serviceOrderStatus, approversID, approversDate)}
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
							${serviceOrderRemarks && !isRevise ? serviceOrderRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

		<div class="row" id="form_service_order">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No. ${!disabledReference ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="serviceRequisitionID"
                        id="serviceRequisitionID"
                        style="width: 100%"
                        required
						${disabledReference}>
                        <option selected disabled>Select Reference No.</option>
                        ${getServiceRequisitionList(serviceRequisitionID, serviceOrderStatus)}
                    </select>
					<div class="d-block invalid-feedback" id="invalid-serviceRequisitionID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
						disabled>
                        <option selected disabled>-</option>
                        ${getProjectList(projectID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="${clientCode || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="${clientName || "-"}">
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
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="${clientAddress || "-"}">
                </div>
            </div>
			<hr class="w-100">
			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Code</label>
                    <input type="text" class="form-control" name="companyCode" disabled value="${inventoryVendorID && inventoryVendorID != "0" ? getFormCode("VEN", iivtCreatedAt, inventoryVendorID) : "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
						name="inventoryVendorID"
						id="inventoryVendorID"
						required
						style="width: 100%"
						${disabled}>
						${getInventoryVendorList(inventoryVendorID)}
					</select>
                </div>
            </div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Contact Details</label>
					<input type="text" class="form-control" name="companyContactDetails" disabled value="${companyContactDetails || "-"}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Contact Person</label>
                    <input type="text" class="form-control" name="companyContactPerson" disabled value="${companyContactPerson || "-"}">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="form-group">
                    <label>Company Address</label>
                    <input type="text" class="form-control" name="companyAddress" disabled value="${companyAddress || "-"}">
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Payment Terms ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
						class="form-control validate" 
						name="paymentTerms" 
						id="paymentTerms"
						data-allowcharacters="[0-9][%][ ][a-z][A-Z][-][_][.][,][']"
						minlength="2"
						maxlength="50"
						autocomplete="off"
						required
						value="${paymentTerms || ""}"
						${disabled}>
					<div class="d-block invalid-feedback" id="invalid-paymentTerms"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Schedule ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
						class="form-control validate daterange text-left" 
						name="scheduleDate" 
						id="scheduleDate"
						required
						value="${moment(scheduleDate || dateToday()).format("MMMM DD, YYYY")}"
						${disabled}>
					<div class="d-block invalid-feedback" id="invalid-scheduleDate"></div>
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
                        id="serviceOrderReason"
                        name="serviceOrderReason"
                        required
                        rows="4"
                        style="resize:none;"
						required
						${disabled}>${serviceOrderReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-serviceOrderReason"></div>
                </div>
            </div>
			
			<div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Services </div>
                    <div id="tableServiceDisplay">
						${getServicesDisplay(data, readOnly, isFromCancelledDocument)}
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
			updateServiceOptions();
			initAmount("#discount", false);
			initAmount("#lessEwt", true);
			initAmount("#vat", true);
			removeIsValid("#tableServiceOrderItems0");

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
			costSummary();

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

			headerButton(true, "Add Service Order");
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
		const id                    = decryptString($(this).attr("serviceOrderID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("serviceOrderID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SO", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getServiceOrderData(action, "save", "0", id, status, revise);
				if (!isFromCancelledDocument) {
					delete data["serviceOrderID"];
					data["reviseServiceOrderID"] = id;
				} else {
					delete data["action"];
					data["serviceOrderStatus"] = 0;
					data["action"]             = "update";
				}
	
				saveServiceOrder(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getServiceOrderData(action, "save", "0", id, status, revise);
			data["serviceOrderStatus"] = 0;

			saveServiceOrder(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("serviceOrderID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("SO", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getServiceOrderData(action, "save", "0", id, "0", revise);
		data["serviceOrderStatus"] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data["reviseServiceOrderID"] = id;
				delete data["serviceOrderID"];
			} else {
				data["serviceOrderID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}

		saveServiceOrder(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- CHECK COST SUMMARY -----
	function checkCostSummary() {
		const total       = getNonFormattedAmount($(`#total`).text());
		const discount    = getNonFormattedAmount($(`[name="discount"]`).val());
		const lessEwt     = getNonFormattedAmount($(`[name="lessEwt"]`).val());
		const discountType = $(`[name="discountType"]`).val();
		let totalAmount = total - discount;
		if (discountType == "percent") {
			totalAmount = total - (total * (discount / 100));
		}

		if (totalAmount < 0) {
			showNotification("danger", "Invalid discount value.");
			$(`[name="discount"]`).focus();
			return false;
		} else if (lessEwt > totalAmount) {
			showNotification("danger", "Invalid less ewt value.");
			$(`[name="lessEwt"]`).focus();
			return false;
		}
		return true;
	}
	// ----- END CHECK COST SUMMARY -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id       = decryptString($(this).attr("serviceOrderID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const validate = validateForm("form_service_order");
		removeIsValid("#tableServiceOrderItems0");
		const costSummary = checkCostSummary();

		if (validate && costSummary) {

			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getServiceOrderData(action, "submit", "1", id, "0", revise);

			if (revise) {
				if (!isFromCancelledDocument) {
					delete data["serviceOrderID"];
					data["reviseServiceOrderID"] = id;
				}
			}

			const employeeID = getNotificationEmployeeID(data["approversID"], data["approversDate"], true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                41,
					notificationTitle:       "Service Order",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveServiceOrder(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("serviceOrderID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getServiceOrderData(action, "cancelform", "4", id, status);

		saveServiceOrder(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("serviceOrderID"));
		const feedback = $(this).attr("code") || getFormCode("SO", dateToday(), id);
		let tableData  = getTableData("ims_service_order_tbl", "", "serviceOrderID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getServiceOrderData("update", "approve", "2", id);
			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["approversDate"] = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                41,
					tableID:                 id,
					notificationTitle:       "Service Order",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                41,
					tableID:                 id,
					notificationTitle:       "Service Order",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["serviceOrderStatus"] = status;

			saveServiceOrder(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("serviceOrderID"));
		const feedback = $(this).attr("code") || getFormCode("SO", dateToday(), id);

		$("#modal_service_order_content").html(preloader);
		$("#modal_service_order .page-title").text("DENY SERVICE ORDER");
		$("#modal_service_order").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="serviceOrderRemarks"
					name="serviceOrderRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-serviceOrderRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			serviceOrderID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_service_order_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("serviceOrderID"));
		const feedback = $(this).attr("code") || getFormCode("SO", dateToday(), id);

		const validate = validateForm("modal_service_order");
		if (validate) {
			let tableData = getTableData("ims_service_order_tbl", "", "serviceOrderID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = {
					action:              "update",
					method:              "deny",
					serviceOrderID:      id,
					approversStatus:     updateApproveStatus(approversStatus, 3),
					approversDate:       updateApproveDate(approversDate),
					serviceOrderRemarks: $("[name=serviceOrderRemarks]").val()?.trim(),
					updatedBy:           sessionID
				};

				let notificationData = {
					moduleID:                41,
					tableID: 				 id,
					notificationTitle:       "Service Order",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveServiceOrder(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("serviceOrderID"));
		let data = {};
		data["serviceOrderID"] = id;
		data["action"]         = "update";
		data["method"]         = "drop";
		data["updatedBy"]      = sessionID;

		saveServiceOrder(data, "drop", null, pageContent);
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


	// ----- DOWNLOAD EXCEL -----
	$(document).on("click", "#btnExcel", function() {
		const serviceOrderID = decryptString($(this).attr("serviceorderid"));
		const url = `${base_url}ims/service_order/downloadExcel?id=${serviceOrderID}`;
		window.location.replace(url); 
	})
	// ----- END DOWNLOAD EXCEL -----


	// --------------- DATABASE RELATION ---------------
	function getConfirmation(method = "submit") {
		const title = "Service Order";
		let swalText, swalImg;

		$("#modal_service_order").text().length > 0 && $("#modal_service_order").modal("hide");

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

	function saveServiceOrder(data = null, method = "submit", notificationData = null, callback = null) {
		if (data) {
			const confirmation = getConfirmation(method);
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `service_order/saveServiceOrder`,
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
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} submitted successfully!`;
							} else if (method == "save") {
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} saved successfully!`;
							} else if (method == "cancelform") {
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} cancelled successfully!`;
							} else if (method == "approve") {
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} approved successfully!`;
							} else if (method == "deny") {
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} denied successfully!`;
							} else if (method == "drop") {
								swalTitle = `${getFormCode("SO", dateCreated, insertedID)} dropped successfully!`;
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
							$("#modal_service_order").text().length > 0 && $("#modal_service_order").modal("show");
						}
					} else if (res.isDismissed) {
						if (method == "deny") {
							$("#modal_service_order").text().length > 0 && $("#modal_service_order").modal("show");
						}
					}
				}
			});
		}
		return false;
	}

	function saveServiceOrderContract(data = null, filename = null) {
		if (data) {
			const confirmation = getConfirmation("uploadcontract");
			confirmation.then(res => {
				if (res.isConfirmed) {
					$.ajax({
						method:      "POST",
						url:         `service_order/saveServiceOrderContract`,
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
									$("#displayContractParent").html(displayContract(message, true));
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
})