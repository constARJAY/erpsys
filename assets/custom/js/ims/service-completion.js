$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(128);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("service completion");
	// ----- END MODULE APPROVER -----


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


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"ims_service_completion_tbl", 
				"reviseServiceCompletionID", 
				"reviseServiceCompletionID IS NOT NULL AND serviceCompletionStatus != 4");

			const data = getTableData(
				`ims_service_completion_tbl`,
				`serviceOrderID`,
				`serviceCompletionID = ${id}`
			);
			const { serviceOrderID } = data && data[0];
			const isAllowedForRevise = getTableDataLength(
				`ims_service_completion_tbl`,
				`serviceOrderID`,
				`serviceOrderID = ${serviceOrderID} AND serviceCompletionStatus <> 3 AND serviceCompletionStatus <> 4`
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
				`ims_service_completion_tbl AS isct
					LEFT JOIN ims_service_order_tbl AS isot USING(serviceOrderID)
					LEFT JOIN ims_inventory_vendor_tbl AS iivt ON isot.inventoryVendorID = iivt.inventoryVendorID`,
                `isct.*, 
				isot.projectID,
				isot.projectCode,
				isot.projectName,
				isot.projectCategory,
				isot.clientID,
				isot.clientCode,
				isot.clientName,
				isot.clientAddress,
				isot.clientContactDetails,
				isot.clientContactPerson,
				iivt.inventoryVendorID,
				isot.companyName,
				isot.companyContactDetails,
				isot.companyContactPerson,
				isot.companyAddress,
				isot.paymentTerms,
				isot.discountType,
				isot.scheduleDate,
				isot.total,
				isot.discount,
				isot.totalAmount,
				isot.vatSales,
				isot.vat,
				isot.totalVat,
				isot.lessEwt,
				isot.grandTotalAmount,
				isot.serviceOrderReason,
				isot.contractFile,
				isot.createdAt AS isotCreatedAt,
				iivt.createdAt AS iivtCreatedAt`,
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
					if (employeeID == null || employeeID == 0) {
						if (serviceCompletionStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (serviceCompletionStatus == 0 || serviceCompletionStatus == 4) {
							isAllowed = false;
						}
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
					const isAllowed = isCreateAllowed(128);
					pageContent(isAllowed);
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

	const serviceOrderList = getTableData(
		`ims_service_order_tbl AS isot
			LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
			LEFT JOIN ims_inventory_vendor_tbl AS iivt USING(inventoryVendorID)`,
		`isot.*,
		isrt.serviceRequisitionReason, iivt.createdAt AS iivtCreatedAt`,
		`serviceOrderStatus = 2`
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
					{ targets: 4,  width: 250 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 150 },
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
					{ targets: 4,  width: 250 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 300 },
					{ targets: 8,  width: 80  },
					{ targets: 9,  width: 200 },
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
					{ targets: 3,  width: 1300 },
					{ targets: 4,  width: 200  },
				],
			});

		var table = $("#tableServiceCompletionItems0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                sorting: false,
                searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150  },
					{ targets: 1,  width: 150  },
					{ targets: 2,  width: 280  },
					{ targets: 3,  width: 1300 },
					{ targets: 4,  width: 200  },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_service_completion_tbl", "approversID")) {
				let count = getCountForApproval("ims_service_completion_tbl", "serviceCompletionStatus");
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
			if (isCreateAllowed(128)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light btnBack" 
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
		let serviceCompletionData = getTableData(
			`ims_service_completion_tbl AS isct
				LEFT JOIN ims_service_order_tbl AS isot USING(serviceOrderID)
				LEFT JOIN hris_employee_list_tbl AS helt ON isct.employeeID = helt.employeeID`,
			`isct.*,  
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isot.createdAt AS isotCreatedAt,
			isot.projectID,
			isot.projectCode,
			isot.projectName,
			isot.projectCategory,
			isot.clientID,
			isot.clientCode,
			isot.clientName,
			isot.clientAddress,
			isot.clientContactDetails,
			isot.clientContactPerson,
			isot.inventoryVendorID,
			isot.companyName,
			isot.companyContactDetails,
			isot.companyContactPerson,
			isot.companyAddress,
			isot.paymentTerms,
			isot.discountType,
			isot.scheduleDate,
			isot.total,
			isot.discount,
			isot.totalAmount,
			isot.vatSales,
			isot.vat,
			isot.totalVat,
			isot.lessEwt,
			isot.grandTotalAmount,
			isot.serviceOrderReason,
			isot.contractFile`,
			`isct.employeeID != ${sessionID} AND isct.serviceCompletionStatus != 0 AND isct.serviceCompletionStatus != 4`,
			`FIELD(serviceCompletionStatus, 0, 1, 3, 2, 4, 5), COALESCE(isct.submittedAt, isct.createdAt)`
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

		serviceCompletionData.map((item) => {
			let {
				fullname,
				serviceCompletionID,
				serviceOrderID,
				isotCreatedAt,
				clientName,
				projectID,
				projectCode,
				projectName,
				approversID,
				approversDate,
				serviceCompletionStatus,
				serviceCompletionRemarks,
				serviceOrderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceCompletionRemarks ? serviceCompletionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceCompletionStatus == 2 || serviceCompletionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = serviceCompletionStatus != 0 ? "btnView" : "btnEdit";
			if (isImCurrentApprover(approversID, approversDate, serviceCompletionStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(serviceCompletionID)}">
					<td>${getFormCode("SC", createdAt, serviceCompletionID)}</td>
					<td>${fullname || "-"}</td>
					<td>${serviceOrderID != "0" ? getFormCode("SO", isotCreatedAt, serviceOrderID) : "-"}</td>
					<td>${clientName   || '-'}</td>
					<td>
						<div>
							${projectCode || '-'}
						</div>
						<small style="color:#848482;">${serviceOrderReason || ""}</small>
					</td>
					<td>${projectName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, serviceCompletionStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(serviceCompletionStatus, true)}
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
		let serviceCompletionData = getTableData(
			`ims_service_completion_tbl AS isct
				LEFT JOIN ims_service_order_tbl AS isot USING(serviceOrderID)
				LEFT JOIN hris_employee_list_tbl AS helt ON isct.employeeID = helt.employeeID`,
			`isct.*,  
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, isot.createdAt AS isotCreatedAt,
			isot.projectID,
			isot.projectCode,
			isot.projectName,
			isot.projectCategory,
			isot.clientID,
			isot.clientCode,
			isot.clientName,
			isot.clientAddress,
			isot.clientContactDetails,
			isot.clientContactPerson,
			isot.inventoryVendorID,
			isot.companyName,
			isot.companyContactDetails,
			isot.companyContactPerson,
			isot.companyAddress,
			isot.paymentTerms,
			isot.discountType,
			isot.scheduleDate,
			isot.total,
			isot.discount,
			isot.totalAmount,
			isot.vatSales,
			isot.vat,
			isot.totalVat,
			isot.lessEwt,
			isot.grandTotalAmount,
			isot.serviceOrderReason,
			isot.contractFile`,
			`isct.employeeID = 0 OR isct.employeeID IS NULL OR isct.employeeID = ${sessionID}`,
			`FIELD(serviceCompletionStatus, 0, 1, 3, 2, 4, 5), COALESCE(isct.submittedAt, isct.createdAt)`
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

		serviceCompletionData.map((item) => {
			let {
				fullname,
				serviceCompletionID,
				serviceOrderID,
				isotCreatedAt,
				clientName,
                projectID,
                projectCode,
                projectName,
				approversID,
				approversDate,
				serviceCompletionStatus,
				serviceCompletionRemarks,
				serviceOrderReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = serviceCompletionRemarks ? serviceCompletionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = serviceCompletionStatus == 2 || serviceCompletionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = serviceCompletionStatus != 0 ? "btnView" : "btnEdit";

			html += `
            <tr class="${btnClass}" id="${encryptString(serviceCompletionID)}">
                <td>${getFormCode("SC", createdAt, serviceCompletionID)}</td>
                <td>${fullname || "-"}</td>
                <td>${serviceOrderID != "0" ? getFormCode("SO", isotCreatedAt, serviceOrderID) : "-"}</td>
                <td>${clientName   || '-'}</td>
				<td>
					<div>
						${projectCode || '-'}
					</div>
					<small style="color:#848482;">${serviceOrderReason || ""}</small>
				</td>
				<td>${projectName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, serviceCompletionStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(serviceCompletionStatus, true)}
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
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----


    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				serviceCompletionID     = "",
				serviceCompletionStatus = "",
				employeeID              = "",
				approversID             = "",
				approversDate           = "",
				createdAt               = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID == 0 || employeeID == null ||  employeeID === sessionID) {
				if (serviceCompletionStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						serviceCompletionID="${encryptString(serviceCompletionID)}"
						code="${getFormCode("SC", createdAt, serviceCompletionID)}"
						revise="${isRevise}"
						status="${serviceCompletionStatus}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}"
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2 btnBack"
							id="btnBack" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (serviceCompletionStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (serviceCompletionStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	serviceCompletionID="${encryptString(serviceCompletionID)}"
					// 	code="${getFormCode("SC", createdAt, serviceCompletionID)}"
					// 	status="${serviceCompletionStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (serviceCompletionStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(serviceCompletionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (serviceCompletionStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(serviceCompletionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"
							status="${serviceCompletionStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (serviceCompletionStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							status="${serviceCompletionStatus}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							serviceCompletionID="${encryptString(serviceCompletionID)}"
							status="${serviceCompletionStatus}"
							code="${getFormCode("SC", createdAt, serviceCompletionID)}"><i class="fas fa-ban"></i> 
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
	function getServiceOrderList(id = null, status = 0, display = true) {
		const createdORList = getTableData("ims_service_completion_tbl", "serviceOrderID", "serviceCompletionStatus <> 3 AND serviceCompletionStatus <> 4").map(so => so.serviceOrderID);
		let html = ``;
		if (!status || status == "0") {
			html += serviceOrderList.filter(so => createdORList.indexOf(so.serviceOrderID) == -1 || so.serviceOrderID == id).map(so => {
				return `
				<option 
				value        = "${so.serviceOrderID}" 
				serviceRequisitionID = "${so.serviceRequisitionID}"
				soCode       = "${getFormCode("SO", so.createdAt, so.serviceOrderID)}"
				paymentTerms = "${so.paymentTerms}"
				scheduleDate = "${moment(so.scheduleDate).format("MMM DD, YYYY")}"
				clientID     = "${so.clientID}"
				projectID    = "${so.projectID}"
				reason       = "${so.serviceOrderReason}"
				companyCode  = "${so.inventoryVendorID ? getFormCode("VEN", so.iivtCreatedAt, so.inventoryVendorID) : "-"}"
				companyName  = "${so.companyName}"
				companyContactDetails = "${so.companyContactDetails}"
				companyContactPerson  = "${so.companyContactPerson}"
				companyAddress        = "${so.companyAddress}"
				${so.serviceOrderID == id && "selected"}>
				${getFormCode("SO", so.createdAt, so.serviceOrderID)}
				</option>`;
			})
		} else {
			html += serviceOrderList.map(so => {
				return `
				<option 
					value        = "${so.serviceOrderID}" 
					serviceRequisitionID = "${so.serviceRequisitionID}"
					soCode       = "${getFormCode("SO", so.createdAt, so.serviceOrderID)}"
					paymentTerms = "${so.paymentTerms}"
					scheduleDate = "${moment(so.scheduleDate).format("MMM DD, YYYY")}"
					clientID     = "${so.clientID}"
					projectID    = "${so.projectID}"
					reason       = "${so.serviceRequisitionReason}"
					companyCode  = "${so.inventoryVendorID ? getFormCode("VEN", so.iivtCreatedAt, so.inventoryVendorID) : "-"}"
					companyName  = "${so.companyName}"
					companyContactDetails = "${so.companyContactDetails}"
					companContactPerson   = "${so.companContactPerson}"
					companyAddress        = "${so.companyAddress}"
					${so.serviceOrderID == id && "selected"}>
					${getFormCode("SO", so.createdAt, so.serviceOrderID)}
				</option>`;
			})
		}
        return display ? html : serviceOrderList;

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
			let contactDetails = `${inventoryVendorMobile} - ${inventoryVendorTelephone}`;

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
                ${project.projectName}
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


    // ----- GET SERVICE FILE -----
    function getServiceScopeFile(scopeID, file, link = true, readOnly = false) {
		let href = link ? `${base_url}assets/upload-files/request-services/${file}` : "javascript:void(0)";
		let btnDelete = !readOnly ? `
		<span class="pr-1 btnDeleteServiceFile display-image-remove"
			scopeID="${scopeID}">x</span>` : "";
		const target = link ? `target="_blank"` : "";
        let html = `
        <div class="d-flex justify-content-start align-items-center">
            ${btnDelete}
            <a class="ml-1 display-image-filename"
                href="${href}"
                ${target}
				title="${file}">
                ${file}
            </a>
        </div>`;
        return html;
    }
    // ----- END GET SERVICE FILE -----


	// ----- GET SERVICE SCOPE -----
	function getServiceScope(scope = {}, readOnly = false) {
		let {
            requestServiceID = "",
            scopeID          = "",
			description      = "-",
			quantity         = "1",
			uom              = "pcs",
			unitCost         = "0",
			totalCost        = "0",
			file             = "",
		} = scope;

		let html = "";
		if (!readOnly) {
            const serviceFile = file ? getServiceScopeFile(scopeID, file) : "";
			const service = {
				requestServiceID, scopeID, filename: file, files: "", description, quantity, uom, unitCost, totalCost
			}
			requestServiceID && serviceFiles.push(service);

			html = `
			<tr>
				<td>
					<div class="servicefile">
						<div class="input-group mb-0">
							<input type="file"
								class="form-control validate"
								name="serviceFile"
								id="serviceFile"
								autocomplete="off"
                                requestServiceID="${requestServiceID}"
                                scopeID="${scopeID}"
								filename="${file != null ? file : ""}"
                                accept=".png, .jpeg, .jpg, .svg"
								required>
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serviceFile"></div>
						</div>
						<div class="display-image displayservicefile" 
							style="display: ${serviceFile ? "block" : "none"}">
                            ${serviceFile}
                        </div>
					</div>
				</td>
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
			const serviceFile = file ? getServiceScopeFile(scopeID, file, true, true) : "";

			html = `
			<tr>
				<td>
					<div class="servicefile">
						${serviceFile || "-"}
					</div>
				</td>
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
		<div class="container-fluid">
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
			serviceScopes += getServiceScope({}, readOnly);
		}
		serviceScopes += `
				</tbody>
			</table>
		</div>`;

		let html = "";
		if (readOnly) {
			let serviceDate = serviceDateFrom && serviceDateTo ? moment(serviceDateFrom).format("MMM DD, YYYY")+" - "+moment(serviceDateTo).format("MMM DD, YYYY") : "-";
			html += `
			<tr class="itemTableRow" 
				serviceID        = "${serviceID}" 
				serviceName      = "${serviceName}" 
				remarks          = "${remarks}" 
				requestServiceID = "${requestServiceID}">
				<td>
					<div class="servicecode">
						${serviceID ? getFormCode("SVC", createdAt, serviceID) : "-"}
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
			<tr class="itemTableRow" 
				serviceID        = "${serviceID}" 
				serviceName      = "${serviceName}" 
				remarks          = "${remarks}" 
				requestServiceID = "${requestServiceID}">
				<td>
					<div class="servicecode">
						${serviceID ? getFormCode("SVC", createdAt, serviceID) : "-"}
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
				$(this).attr("id", `serviceUom${i}${j}`)
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
	}
	// ----- END UPDATE TABLE ITEMS -----


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
			$(this).parent().parent().find(".displayfile").css("display", "none");
			showNotification("danger", "File size must be less than or equal to 10mb");
		} else {
			let html = `
			<div class="d-flex justify-content-between align-items-center py-2 display-image">
				<span class="filename display-image-filename">${filename}</span>
				<span class="btnRemoveFile display-image-remove" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>`;
			$(this).parent().find(".displayfile").first().html(html);
			$(this).parent().find(".displayfile").css("display", "block");
		}
	})
	// ----- END SELECT FILE -----


	// ----- REMOVE FILE -----
	$(document).on("click", ".btnRemoveFile", function() {
		$(this).parent().parent().parent().find("[name=files]").first().val("");
		$(this).closest(".displayfile").empty();
		$(this).closest(".displayfile").css("display", "none");
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
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
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


	// ----- GET CLIENT -----
	function getClient(clientID = null) {
		let clientCode = "-", clientName = "-", clientAddress = "-", clientContactDetails = "-", clientContactPerson = "-";
		if (clientID) {
			clientList.filter(c => c.clientID == clientID).map(c => {
				clientAddress = `${c.clientUnitNumber && titleCase(c.clientUnitNumber)+", "}${c.clientHouseNumber && c.clientHouseNumber +", "}${c.clientBarangay && titleCase(c.clientBarangay)+", "}${c.clientCity && titleCase(c.clientCity)+", "}${c.clientProvince && titleCase(c.clientProvince)+", "}${c.clientCountry && titleCase(c.clientCountry)+", "}${c.clientPostalCode && titleCase(c.clientPostalCode)}`;

				clientCode           = getFormCode("CLT", c.createdAt, c.clientID);
				clientName           = c.clientName,
				clientAddress        = clientAddress.replaceAll("\n", "").trim();
				clientContactDetails = `${c.client_MobileNo} - ${c.clientTelephoneNo}`;
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
        const requestServiceID = $(this).attr("requestServiceID");
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
				serviceFiles = serviceFiles.map(item => {
					if (item.scopeID == scopeID) {
						// return service;
						item["files"] = files[0];
						item["filename"] = filenameArr.join(".");
					}
					return item;
				})

				$(this).attr("filename", filenameArr.join("."));
				$(this).removeClass("is-invalid");
				$(this).parent().find(".invalid-feedback").first().text("");
                let html = getServiceScopeFile(scopeID, filenameArr.join("."), false);
                $(this).closest(".servicefile").find(".displayservicefile").first().html(html);
                $(this).closest(".servicefile").find(".displayservicefile").first().css("display", "block");
			}
		}
    })
    // ----- END UPLOAD SERVICE FILE -----


    // ----- DELETE SERVICE FILE -----
    $(document).on("click", ".btnDeleteServiceFile", function() {
        const scopeID = $(this).attr("scopeID");
        let div = $(this).closest('div');
		let fileElement = $(this).closest("tr").find(".displayservicefile");
        div.fadeOut(500, function (){
            serviceFiles = serviceFiles.map(files => {
				if (files.scopeID == scopeID) {
					files["filename"] = "";
					files["files"]     = "";
				}
				return files;
			});
            $(this).closest("td").find("[name=serviceFile]").val("");
			$(this).closest("td").find("[name=serviceFile]").attr("filename", "");

            $(this).closest("div").remove();
			fileElement.css("display", "none");
        });
    })
    // ----- END DELETE SERVICE FILE -----


	// ----- SELECT SERVICE ORDER ID -----
	$(document).on("change", `[name="serviceOrderID"]`, function() {
		const serviceOrderID = $(this).val();
		const serviceRequisitionID  = $("option:selected", this).attr("serviceRequisitionID");
		const clientID     = $("option:selected", this).attr("clientID");
		const projectID    = $("option:selected", this).attr("projectID");
		const reason       = $("option:selected", this).attr("reason");
		const companyCode  = $("option:selected", this).attr("companyCode");
		const companyName  = $("option:selected", this).attr("companyName");
		const companyContactDetails = $("option:selected", this).attr("companyContactDetails");
		const companyContactPerson  = $("option:selected", this).attr("companyContactPerson");
		const companyAddress        = $("option:selected", this).attr("companyAddress");
		const paymentTerms = $("option:selected", this).attr("paymentTerms");
		const scheduleDate = $("option:selected", this).attr("scheduleDate");
		projectID && $(`[name="projectID"]`).val(projectID).trigger("change");
		clientID && getClient(clientID);
		reason && $(`[name="serviceOrderReason"]`).val(reason);
		paymentTerms && $(`[name="paymentTerms"]`).val(paymentTerms);
		scheduleDate && $(`[name="scheduleDate"]`).val(scheduleDate);
		companyCode && $(`[name="companyCode"]`).val(companyCode);
		companyName && $(`[name="companyName"]`).val(companyName);
		companyContactDetails && $(`[name="companyContactDetails"]`).val(companyContactDetails);
		companyContactPerson && $(`[name="companyContactPerson"]`).val(companyContactPerson);
		companyAddress && $(`[name="companyAddress"]`).val(companyAddress);

		const where = serviceOrderID ? `serviceOrderID=${serviceOrderID}` : "";
		const data = getTableData(
			`ims_service_order_tbl`,
			`serviceRequisitionID, 
			serviceOrderID,
			discountType,
			total, 
			discount, 
			totalAmount, 
			vatSales, 
			vat, 
			totalVat,
			lessEwt, 
			grandTotalAmount`,
			where
		)

		const services = getServicesDisplay(data);
		$(`#tableServiceDisplay`).html(preloader);
		setTimeout(() => {
			$(`#tableServiceDisplay`).html(services);
			initDataTables();
			initAll();
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
				startDate: moment(scheduleDate || new Date),
			}
			initDateRangePicker("#scheduleDate", disablePreviousDateOptions);

            $("[name=serviceDate]").each(function(i) {
                $(this).attr("id", `serviceDate${i}`);
                serviceDate(this);
            })
		}, 200);
	})
	// ----- END SELECT SERVICE ORDER ID -----


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
		const serviceCompletionID = decryptString($(this).attr("serviceCompletionID"));
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


	function getServicesDisplay(data = false, readOnly = false, isFromCancelledDocument = false) {
		let disabled = readOnly ? "disabled" : "";
		let {
			serviceCompletionID       = "",
			reviseServiceCompletionID = "",
			employeeID                = "",
			clientID                  = "",
			projectID                 = "",
			serviceOrderID            = "",
			serviceRequisitionID      = "",
			srCreatedAt               = new Date,
			clientName                = "-",
			clientAddress             = "-",
			clientContactDetails      = "",
			clientContactPerson       = "",
			paymentTerms              = "",
			discountType              = "",
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
		if (serviceRequisitionID && serviceOrderID) {
			let requestServicesData;
			if (serviceCompletionID) {
				requestServicesData = getTableData(
					`ims_request_services_tbl`,
					``,
					`serviceRequisitionID = ${serviceRequisitionID} AND serviceOrderID = ${serviceOrderID} AND serviceCompletionID = ${serviceCompletionID}`
				)
			} else {
				requestServicesData = getTableData(
					`ims_request_services_tbl`,
					``,
					`serviceRequisitionID = ${serviceRequisitionID} AND serviceOrderID = ${serviceOrderID} AND serviceCompletionID IS NULL`
				);
			}
			requestServicesData.map(item => {
				requestServiceItems += getServiceRow(item, readOnly);
			})
		} else {
			requestServiceItems += getServiceRow({}, serviceCompletionStatus == 4);
		}

		let html = `
		<div class="card">
			<div class="card-header bg-primary text-white">
				<div class="row align-items-center">
					<div class="col-md-6 col-sm-12 text-left align-self-center">
						<h5 style="font-weight: bold;
							letter-spacing: 0.05rem;">SERVICES</h5>
					</div>
					<div class="col-md-6 col-sm-12 text-right"></div>
				</div>
			</div>
			<div class="card-body">
				<table class="table table-striped" id="tableServiceCompletionItems0">
					<thead>
						<tr style="white-space: nowrap">
							<th>Service Code</th>
							<th>Service Name</th>
							<th>Service Date ${!readOnly ? "<code>*</code>" : ""}</th>
							<th>Scope of Work</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody class="itemServiceTableBody">
						${requestServiceItems}
					</tbody>
				</table>
			</div>
		</div>`;

		return html;
	}


	// ----- GET SERVICE COMPLETION DATA -----
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
            formData.append(`scopes[${i}][requestServiceID]`, file.requestServiceID);
            formData.append(`scopes[${i}][scopeID]`, file.scopeID);
            formData.append(`scopes[${i}][filename]`, file.filename);
            formData.append(`scopes[${i}][description]`, file.description);
            formData.append(`scopes[${i}][quantity]`, file.quantity);
            formData.append(`scopes[${i}][uom]`, file.uom);
            formData.append(`scopes[${i}][unitCost]`, file.unitCost);
            formData.append(`scopes[${i}][totalCost]`, file.totalCost);
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

		if ((currentStatus == "false" || currentStatus == "0" || currentStatus == "3" || (currentStatus == "4" && isRevise)) && method != "approve") {

			data["serviceRequisitionID"]  = $("[name=referenceNo]").attr("serviceRequisitionID") || null;
			data["serviceOrderID"]  = $("[name=referenceNo]").attr("serviceOrderID") || null;
			data["employeeID"] = sessionID;

			formData.append("employeeID", sessionID);
			formData.append("serviceOrderID", $("[name=referenceNo]").attr("serviceOrderID") || null);
			formData.append("serviceRequisitionID", $("[name=referenceNo]").attr("serviceRequisitionID") || null);

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

			$(".itemTableRow").each(function(i, obj) {
				const requestServiceID = $(this).attr("requestServiceID");
				if (requestServiceID && requestServiceID != "0") {
					const serviceID        = $(this).attr("serviceID");
					const serviceName      = $(this).attr("serviceName");
					const remarks          = $(this).attr("remarks");
					const serviceDate      = $("td [name=serviceDate]", this).val();	
					const serviceDateArr   = serviceDate.split(" - ");
					const serviceDateFrom  = moment(serviceDateArr[0]).format("YYYY-MM-DD");
					const serviceDateTo    = moment(serviceDateArr[1]).format("YYYY-MM-DD");
	
					formData.append(`services[${i}][requestServiceID]`, requestServiceID);
					formData.append(`services[${i}][serviceID]`, serviceID);
					formData.append(`services[${i}][serviceName]`, serviceName);
					formData.append(`services[${i}][remarks]`, remarks);
					formData.append(`services[${i}][serviceDateFrom]`, serviceDateFrom);
					formData.append(`services[${i}][serviceDateTo]`, serviceDateTo);
	
					let temp = {
						requestServiceID,
						serviceDateFrom, 
						serviceDateTo
					};
	
					data["items"].push(temp);
				}
			});

		} 
		return formData;
	} 
	// ----- END GET SERVICE COMPLETION DATA -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			serviceCompletionID,
			reviseServiceCompletionID,
			serviceRequisitionID,
			serviceOrderID,
			employeeID,
			approversID,
			approversStatus,
			approversDate,
			serviceCompletionStatus,
			serviceCompletionRemarks,
			submittedAt,
			createdAt,
			projectID,
			projectCode,
			projectName,
			projectCategory,
			clientID,
			clientCode,
			clientName,
			clientAddress,
			clientContactDetails,
			clientContactPerson,
			inventoryVendorID,
			companyName,
			companyContactDetails,
			companyContactPerson,
			companyAddress,
			paymentTerms,
			discountType,
			scheduleDate,
			total,
			discount,
			totalAmount,
			vatSales,
			vat,
			totalVat,
			lessEwt,
			grandTotalAmount,
			serviceOrderReason,
			contractFile,
			isotCreatedAt,
			iivtCreatedAt,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$(".btnBack").attr("serviceCompletionID", encryptString(serviceCompletionID));
		$(".btnBack").attr("status", serviceCompletionStatus);
		$(".btnBack").attr("employeeID", employeeID);
		$(".btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

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
							${serviceCompletionStatus && !isRevise ? getStatusStyle(serviceCompletionStatus, true) : "---"}
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
            <div class="col-md-3 col-sm-12">
                <div class="form-group" id="formReferenceNo">
                    <label>Reference No.</label>
					<input type="text" class="form-control" name="referenceNo" disabled 
						value="${getFormCode("SO", isotCreatedAt, serviceOrderID)}"
						serviceRequisitionID="${serviceRequisitionID}"
						serviceOrderID="${serviceOrderID}">
					<div class="d-block invalid-feedback" id="invalid-serviceOrderID"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled 
						value="${projectCode}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
					<input type="text" class="form-control" name="projectName" disabled 
						value="${projectName}">
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Project Category</label>
					<input type="text" class="form-control" name="projectCategory" disabled 
						value="${projectCategory}">
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
                    <input type="text" class="form-control" name="companyCode" disabled value="${getFormCode("VEN", iivtCreatedAt, inventoryVendorID)}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control" name="companyName" disabled value="${companyName || "-"}">
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
                    <label>Payment Terms</label>
                    <input type="text" 
						class="form-control validate" 
						name="paymentTerms" 
						id="paymentTerms"
						data-allowcharacters="[0-9][%][ ][a-z][A-Z][-][_][.][,][']"
						minlength="2"
						maxlength="50"
						autocomplete="off"
						value="${paymentTerms || "-"}"
						disabled>
					<div class="d-block invalid-feedback" id="invalid-paymentTerms"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Schedule</label>
                    <input type="button" 
						class="form-control validate daterange text-left" 
						name="scheduleDate" 
						id="scheduleDate"
						value="${scheduleDate ? moment(scheduleDate || dateToday()).format("MMMM DD, YYYY") : "-"}"
						disabled>
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
                    <label>Description</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="serviceOrderReason"
                        name="serviceOrderReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled>${serviceOrderReason || "-"}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-serviceOrderReason"></div>
                </div>
            </div>
			
			<div class="col-sm-12">
				${getServicesDisplay(data, readOnly, isFromCancelledDocument)}
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
			updateTableItems();
			updateServiceScope();
			updateServiceOptions();
			removeIsValid("#tableServiceCompletionItems0");

			const disablePreviousDateOptions = {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				startDate: moment(scheduleDate || new Date),
			}
			initDateRangePicker("#scheduleDate", disablePreviousDateOptions);

            $("[name=serviceDate]").each(function(i) {
                $(this).attr("id", `serviceDate${i}`);
                serviceDate(this);
            })

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

			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
        serviceFiles = [];
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
		const id                    = decryptString($(this).attr("serviceCompletionID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", ".btnBack", function () {
		const id         = decryptString($(this).attr("serviceCompletionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("SC", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getServiceCompletionData(action, "save", "0", id, status, revise);
				if (!isFromCancelledDocument) {
					data.delete("serviceCompletionID");
					data.append("reviseServiceCompletionID",  id);
				} else {
					data.delete("action");
					data.append("serviceCompletionStatus", 0);
					data.append("action", "update");
				}
	
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
			data.append("serviceCompletionStatus", 0);

			saveServiceCompletion(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("serviceCompletionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getServiceCompletionData(action, "save", "0", id, "0", revise);
		data.append("serviceCompletionStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("reviseServiceCompletionID", id);
				data.delete("serviceCompletionID");
			} else {
				// data.append("serviceOrderID", id);
				data.delete("action");
				data.append("action", "update");
			}
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


	// ----- VALIDATE SERVICE FILE ----- 
	function validateServiceFile() {
		let flag = 0;
		$(`[name="serviceFile"]`).each(function(i) {
			const filename = $(this).attr("filename");
			if (!filename || filename == "null") {
				$(this).addClass("is-invalid");
				$(this).parent().find(".invalid-feedback").first().text("File is required.");
				flag++;
			} else {
				$(this).removeClass("is-invalid");
				$(this).parent().find(".invalid-feedback").first().text("");
			}
		})
		$("#form_service_completion").find(".is-invalid").first().focus();
		return flag > 0 ? false : true;
	}
	// ----- END VALIDATE SERVICE FILE ----- 


	// ----- VALIDATE SERVICE FILE ----- 
	function validateServiceDate() {
		let flag = 0;
		$(`[name="serviceDate"]`).each(function(i) {
			if (!$(this).val()) {
				flag++;
			}
		})
		return flag > 0 ? false : true;
	}
	// ----- END VALIDATE SERVICE FILE ----- 


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = decryptString($(this).attr("serviceCompletionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("formReferenceNo");
		const validateFile = validateServiceFile();
		const validateDate = validateServiceDate();
		removeIsValid("#tableServiceCompletionItems0");

		if (validate && validateFile && validateDate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getServiceCompletionData(action, "submit", "1", id, "0", revise);

			if (revise) {
				if (!isFromCancelledDocument) {
					data.delete("serviceCompletionID");
					data.append("reviseServiceCompletionID", id);
				} 
			}

			let approversID = "", approversDate = "";
			for (var i of data) {
				if (i[0] == "approversID")   approversID   = i[1];
				if (i[0] == "approversDate") approversDate = i[1];
			}

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                128,
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
		const id     = decryptString($(this).attr("serviceCompletionID"));
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
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                128,
					tableID:                 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                128,
					tableID:                 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("serviceCompletionStatus", status);

			saveServiceCompletion(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("serviceCompletionID"));
		const feedback = $(this).attr("code") || getFormCode("SC", dateToday(), id);

		$("#modal_service_completion_content").html(preloader);
		$("#modal_service_completion .page-title").text("DENY SERVICE COMPLETION");
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
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			serviceCompletionID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
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

				let formData = new FormData();
				formData.append("action", "update");
				formData.append("method", "deny");
				formData.append("serviceCompletionID", id);
				formData.append("approversStatus", updateApproveStatus(approversStatus, 3));
				formData.append("approversDate", updateApproveDate(approversDate));
				formData.append("serviceCompletionRemarks", $("[name=serviceCompletionRemarks]").val()?.trim());
				formData.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                128,
					tableID: 				 id,
					notificationTitle:       "Service Completion",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveServiceCompletion(formData, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const id = decryptString($(this).attr("serviceCompletionID"));
		let data = new FormData();
		data.append("serviceCompletionID", id);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveServiceCompletion(data, "drop", null, pageContent);
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
		const serviceCompletionID = decryptString($(this).attr("serviceorderid"));
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
						} else if (method == "drop") {
							swalTitle = `${getFormCode("SC", dateCreated, insertedID)} dropped successfully!`;
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