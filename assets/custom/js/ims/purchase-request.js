$(document).ready(function() {
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("purchase request");
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
				"ims_purchase_request_tbl", 
				"revisePurchaseRequestID", 
				"revisePurchaseRequestID IS NOT NULL AND purchaseRequestStatus != 4");
			return revisedDocumentsID.map(item => item.revisePurchaseRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
			const tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					purchaseRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (purchaseRequestStatus == 0 || purchaseRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (purchaseRequestStatus == 0) {
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
			window.history.pushState("", "", `${base_url}ims/purchase_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/purchase_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/purchase_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/purchase_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, itemDescription, categoryName, unitOfMeasurementID, ims_inventory_item_tbl.createdAt",
		"itemStatus = 1");

	const inventoryPriceList = getTableData(
		`ims_inventory_price_list_tbl`,
		``,
		`preferred = 1`
	);

	const costEstimateList = getTableData(
		`pms_cost_estimate_tbl`,
		"",
		`costEstimateStatus = 2`
	);

	const projectList = getTableData(
		"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
		"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
		"projectListStatus = 1");
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80 },
					{ targets: 9,  width: 250  },
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
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80 },
					{ targets: 9,  width: 250  },
				],
			});

        var table = $("#tableProjectRequestItems")
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
					{ targets: 2,  width: 180 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 120 },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 },
					{ targets: 8,  width: 150 },
					{ targets: 9,  width: 200 },
				],
			});

		var table = $("#tableProjectRequestItems0")
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

		var table = $("#tableCompanyRequestItems")
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

		var table = $("#tableCompanyRequestItems0")
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
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_purchase_request_tbl", "approversID")) {
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
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
		let purchaseRequestData = getTableData(
			`ims_purchase_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID
				LEFT JOIN pms_cost_estimate_tbl AS pcet USING(costEstimateID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName, pcet.createdAt AS ceCreatedAt",
			`imrt.employeeID != ${sessionID} AND purchaseRequestStatus != 0 AND purchaseRequestStatus != 4`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
				projectID,
				projectListCode,
				projectListName,
				costEstimateID,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseRequestStatus != 0 ? "btnView" : "btnEdit";

			let button = purchaseRequestStatus != 0 ? `
			<button type="button" class="btn btn-view w-100 btnView" id="${encryptString(purchaseRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button type="button" 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(purchaseRequestID )}" 
				code="${getFormCode("PR", createdAt, purchaseRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, purchaseRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(purchaseRequestID )}">
					<td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
					<td>${fullname}</td>
					<td>${costEstimateID != 0 ? getFormCode("CE", ceCreatedAt, costEstimateID) : '-'}</td>
					<td>
						<div>
							${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectListCode || '-'}</small>
					</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(purchaseRequestStatus)}
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
		let purchaseRequestData = getTableData(
			`ims_purchase_request_tbl AS imrt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
				LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID
				LEFT JOIN pms_cost_estimate_tbl AS pcet USING(costEstimateID)`,
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName, pcet.createdAt AS ceCreatedAt",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(purchaseRequestStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
					<th>Reference No.</th>
                    <th>Project Name</th>
                    <th>Current Approver</th>
                    <th>Date Created</th>
                    <th>Date Submitted</th>
                    <th>Date Approved</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		purchaseRequestData.map((item) => {
			let {
				fullname,
				purchaseRequestID,
                projectID,
                projectListCode,
                projectListName,
                costEstimateID,
				approversID,
				approversDate,
				purchaseRequestStatus,
				purchaseRequestRemarks,
				submittedAt,
				createdAt,
				ceCreatedAt
			} = item;

			let remarks       = purchaseRequestRemarks ? purchaseRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = purchaseRequestStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = purchaseRequestStatus != 0 ? "btnView" : "btnEdit";

			let button = purchaseRequestStatus != 0 ? `
            <button type="button" class="btn btn-view w-100 btnView" id="${encryptString(purchaseRequestID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button type="button" 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(purchaseRequestID )}" 
                code="${getFormCode("PR", createdAt, purchaseRequestID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(purchaseRequestID )}">
                <td>${getFormCode("PR", createdAt, purchaseRequestID )}</td>
                <td>${fullname}</td>
				<td>${costEstimateID != 0 ? getFormCode("CE", ceCreatedAt, costEstimateID) : '-'}</td>
				<td>
					<div>
						${projectListName || '-'}
					</div>
					<small style="color:#848482;">${projectListCode || '-'}</small>
				</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, purchaseRequestStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(purchaseRequestStatus)}
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
	function formButtons(data = false, isRevise = false) {
		let button = "";
		if (data) {
			let {
				purchaseRequestID     = "",
				purchaseRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (purchaseRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						purchaseRequestID="${purchaseRequestID}"
						code="${getFormCode("PR", createdAt, purchaseRequestID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							purchaseRequestID="${purchaseRequestID}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							purchaseRequestID="${purchaseRequestID}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (purchaseRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							purchaseRequestID="${purchaseRequestID}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							status="${purchaseRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (purchaseRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(purchaseRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"
							status="${purchaseRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (purchaseRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							purchaseRequestID="${encryptString(purchaseRequestID)}"
							code="${getFormCode("PR", createdAt, purchaseRequestID)}"><i class="fas fa-ban"></i> 
							Deny
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
	// ----- END FORM BUTTONS -----


	// ----- GET COST ESTIMATE LIST LIST -----
	function getCostEstimateList(id = null, status = 0, display = true) {
		const createdCEList = getTableData("ims_purchase_request_tbl", "costEstimateID", "purchaseRequestStatus <> 3 AND purchaseRequestStatus <> 4").map(ce => ce.costEstimateID);
		let html = `
		<option 
			value     = "0"
			ceCode    = "-"
			projectID = "0"
			${id == "0" && "selected"}>N/A</option>`;
		if (!status || status == 0) {
			html += costEstimateList.filter(ce => createdCEList.indexOf(ce.costEstimateID) == -1 || ce.costEstimateID == id).map(ce => {
				return `
				<option 
				value     = "${ce.costEstimateID}" 
				ceCode    = "${getFormCode("CE", ce.createdAt, ce.costEstimateID)}"
				projectID = "${ce.projectID}"
				${ce.costEstimateID == id && "selected"}>
				${getFormCode("CE", ce.createdAt, ce.costEstimateID)}
				</option>`;
			})
		} else {
			html += costEstimateList.map(ce => {
				return `
				<option 
					value     = "${ce.costEstimateID}" 
					ceCode    = "${getFormCode("CE", ce.createdAt, ce.costEstimateID)}"
					projectID = "${ce.projectID}"
					${ce.costEstimateID == id && "selected"}>
					${getFormCode("CE", ce.createdAt, ce.costEstimateID)}
				</option>`;
			})
		}
        return display ? html : costEstimateList;
	}
	// ----- END GET COST ESTIMATE LIST LIST -----


    // ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			clientCode  = "-"
			clientName  = "-"
			address     = "-"
			${!id && "selected"}>N/A</option>`;
        html += projectList.map(project => {
			let address = `${project.clientUnitNumber && titleCase(project.clientUnitNumber)+", "}${project.clientHouseNumber && project.clientHouseNumber +", "}${project.clientBarangay && titleCase(project.clientBarangay)+", "}${project.clientCity && titleCase(project.clientCity)+", "}${project.clientProvince && titleCase(project.clientProvince)+", "}${project.clientCountry && titleCase(project.clientCountry)+", "}${project.clientPostalCode && titleCase(project.clientPostalCode)}`;

            return `
            <option 
                value       = "${project.projectListID}" 
                projectCode = "${project.projectListCode}"
                clientCode  = "${project.clientCode}"
                clientName  = "${project.clientName}"
				address     = "${address}"
                ${project.projectListID == id && "selected"}>
                ${project.projectListName}
            </option>`;
        })
        return display ? html : projectList;
    }
    // ----- END GET PROJECT LIST -----


	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		let optionNone = {
			itemID:              "0",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A"
		};

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		$("[name=itemID][company=true]").each(function(i, obj) {
			companyItemIDArr.push($(this).val());
			companyElementID.push(`#${this.id}[company=true]`);
			$(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = projectItemIDArr.includes("0") ? [...inventoryItemList] : [optionNone, ...inventoryItemList];

			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value           = "${item.itemID}" 
					itemCode        = "${item.itemCode}"
					itemDescription = "${item.itemDescription}"
					categoryName    = "${item.categoryName}"
					uom             = "${item.unitOfMeasurementID}"
					createdAt       = "${item.createdAt}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});

		companyElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = companyItemIDArr.includes("0") ? [...inventoryItemList] : [optionNone, ...inventoryItemList];
			html += itemList.filter(item => !companyItemIDArr.includes(item.itemID) || item.itemID == companyItemIDArr[index]).map(item => {
				return `
				<option 
					value           = "${item.itemID}" 
					itemCode        = "${item.itemCode}"
					itemDescription = "${item.itemDescription}"
					categoryName    = "${item.categoryName}"
					uom             = "${item.unitOfMeasurementID}"
					createdAt       = "${item.createdAt}"
					${item.itemID == companyItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


	// ----- GET INVENTORY PREFERRED PRICE -----
	function getInventoryPreferredPrice(id = null, input, executeOnce = false) {
		const errorMsg = `Please set item code <b>${getFormCode("ITM", dateToday(), id)}</b> into item price list module to proceed in this proccess`;
		if (id && id != "0") {
			const price = inventoryPriceList.filter(item => item.itemID == id).map(item => {
				input && $(input).attr("inventoryVendorID", item.inventoryVendorID);
				return item.vendorCurrentPrice;
			});
			if (price.length > 0) {
				return price?.[0];
			}
			input && $(input).removeAttr("inventoryVendorID");
			!executeOnce && showNotification("warning2", errorMsg);
			return false;
		}
		input && $(input).removeAttr("inventoryVendorID");
		id && id != "0" && !executeOnce && showNotification("warning2", errorMsg);
		return id == "0";
	}
	// ----- END GET INVENTORY PREFERRED PRICE -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, isProject = true, display = true) {
        let html   = `<option selected disabled>Select Item Name</option>`;
		const attr = isProject ? "[project=true]" : "[company=true]";

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let optionNone = {
			itemID:              "0",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A",
			itemDescription:     ""
		};
		// let itemList = [optionNone, ...inventoryItemList];
		let itemList = !itemIDArr.includes("0") ? [...inventoryItemList] : [optionNone, ...inventoryItemList];

		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
            return `
            <option 
                value           = "${item.itemID}" 
                itemCode        = "${item.itemCode}"
                itemDescription = "${item.itemDescription}"
                categoryName    = "${item.categoryName}"
                uom             = "${item.unitOfMeasurementID}"
				createdAt       = "${item.createdAt}"
                ${item.itemID == id && "selected"}>
                ${item.itemName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET NON FORMAT AMOUNT -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "");
	}
	// ----- END GET NON FORMAT AMOUNT -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false, ceID = null) {
		const attr = isProject ? `project="true"` : `company="true"`;
		let {
			requestItemID = "",
			itemCode      = "",
			itemName      = "",
			itemID        = null,
			itmCreatedAt,
			quantity      = 0,
			categoryName  = "",
			unitOfMeasurementID: uom = "",
			unitCost      = 0,
			totalCost     = 0,
			files         = "",
			remarks       = ""
		} = item;

		itemName = itemName && itemName != "Select Item Name" ? itemName : "-";
		uom		 = uom && uom != "undefined" ? uom : "-";

		let html = "";
		if (readOnly) {
			const itemFIle = files ? `<a href="${base_url+"assets/upload-files/request-items/"+files}" target="_blank">${files}</a>` : `-`;
			html += `
			<tr class="itemTableRow" requestItemID="${requestItemID}">
				<td>
					<div class="itemcode">
						${itemID && itemID != 0 ? getFormCode("ITM", itmCreatedAt, itemID) : "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity}
					</div>
				</td>
				<td>
					<div class="category">
						${categoryName || "-"}
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
					<div class="totalcost">
						${formatAmount(totalCost, true)}
					</div>
				</td>
				<td>
					<div class="file">
						${itemFIle}
					</div>
				</td>
				<td>
					<div class="remarks">
						${remarks || "-"}
					</div>
				</td>
			</tr>`;
		} else {
			const disabled  = ceID && ceID != "0" ? "disabled" : "";
			const inputFile = ceID && ceID != "0" ? "" : `
			<input 
				type="file" 
				class="form-control" 
				name="files" 
				id="files"
				accept="image/*, .pdf, .doc, .docx">
			<div class="invalid-feedback d-block" id="invalid-files"></div>`;

			let itemFile  = "";
			if (ceID && ceID != "0") {
				if (files) {
					itemFile = `
					<a href="${base_url+"assets/upload-files/request-items/"+files}"
					title="${files}" 
					style="display: block;
						width: 150px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;"
					target="_blank">${files}</a>`;
				} else {
					itemFile = "-";
				}
			} else {
				if (files) {
					itemFile = `
					<div class="d-flex justify-content-between align-items-center py-2">
						<a class="filename"
						title="${files}"
						style="display: block;
							width: 150px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;"
						href="${base_url+"assets/upload-files/request-items/"+files}" 
						target="_blank">
						${files}
						</a>
						<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
					</div>`;
				}
			}

			html += `
			<tr class="itemTableRow" requestItemID="${requestItemID}">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow" ${disabled}>
					</div>
				</td>
				<td>
					<div class="itemcode">-</div>
				</td>
				<td>
					<div class="itemname">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="itemID"
								id="itemID"
								style="width: 180px !important"
								required
								${attr}
								${disabled}>
								${getInventoryItem(itemID, isProject)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-itemID"></div>
						</div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control input-quantity text-center"
							min="0.01" 
							data-allowcharacters="[0-9]" 
							max="999999999" 
							id="quantity" 
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							autocomplete="off"
							required
							ceID="${ceID ? true : false}"
							${disabled}>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="category">-</div>
				</td>
				<td>
					<div class="uom">-</div>
				</td>
				<td class="text-right">
					<div class="unitcost">
						${formatAmount(unitCost, true)}
					</div>
				</td>
				<td class="text-right">
					<div class="totalcost">${formatAmount(totalCost, true)}</div>
				</td>
				<td>
					<div class="file">
						<div class="displayfile">
							${itemFile}
						</div>
						${inputFile}
					</div>
				</td>
				<td>
					<div class="remarks">
						<textarea 
							rows="2" 
							style="resize: none" 
							class="form-control" 
							data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
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
		$(".itemProjectTableBody tr").each(function(i) {
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
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}project`);
			$("td .quantity .invalid-feedback", this).attr("id", `invalid-quantity${i}project`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost", this).attr("id", `unitcost${i}`);
			$("td .unitcost", this).attr("project", `true`);

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
			$("td .quantity [name=quantity]", this).attr("id", `quantity${i}company`);
			$("td .quantity .invalid-feedback", this).attr("id", `invalid-quantity${i}company`);
			$("td .quantity [name=quantity]", this).attr("company", `true`);
			
			// CATEGORY
			$("td .category", this).attr("id", `category${i}`);

			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// UNIT COST
			$("td .unitcost", this).attr("id", `unitcost${i}`);
			$("td .unitcost", this).attr("company", `true`);

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
							updateTotalAmount(isProject);
							updateInventoryItemOptions();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
	}
	// ----- END DELETE TABLE ROW -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=quantity]${attr}`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`.unitcost${attr}`).map(element => getNonFormattedAmount(element.innerText) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount${attr}`).text(formatAmount(totalAmount, true));
		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


	// ----- GET TABLE MATERIALS AND EQUIPMENT -----
	function getTableMaterialsEquipment(ceID = null, data = false, readOnly = false) {
		let {
			purchaseRequestID       = "",
			revisePurchaseRequestID = "",
			employeeID              = "",
			costEstimateID          = "",
			projectID               = "",
			purchaseRequestReason   = "",
			projectTotalAmount      = 0,
			companyTotalAmount      = 0,
			purchaseRequestRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			purchaseRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		let disabled = readOnly ? "disabled" : "";

		let requestItemsData;
		let requestProjectItems = "", requestCompanyItems = "";


		let queryCEID = ceID || costEstimateID;
		let disabledCE = queryCEID != 0 ? "disabled" : "";
		if (!queryCEID && !purchaseRequestID) 
		{
			requestProjectItems += getItemRow(true);
			requestCompanyItems += getItemRow(false);
		} 
		else if (!queryCEID && purchaseRequestID) 
		{
			if (purchaseRequestStatus != 0) {
				requestItemsData = getTableData(
					`ims_request_items_tbl AS irit
						LEFT JOIN ims_inventory_item_tbl AS iitt USING(itemID)`, 
					`irit.requestItemID, quantity, unitCost, totalCost, files, remarks, irit.itemID, irit.itemName, categoryType AS categoryName, itemUom AS unitOfMeasurementID, categoryType, iitt.createdAt AS itmCreatedAt`, 
					`purchaseRequestID = ${purchaseRequestID} AND AND costEstimateID IS NULL AND inventoryValidationID IS NULL`);
			} else {
				requestItemsData = getTableData(
					`ims_request_items_tbl AS irit
						LEFT JOIN ims_inventory_item_tbl AS iitt USING(itemID) 
						LEFT JOIN ims_inventory_category_tbl AS iict USING(categoryID)`, 
					`irit.requestItemID, quantity, unitCost, totalCost, files, remarks, itemID, iitt.itemName, categoryName, unitOfMeasurementID, categoryType, iitt.createdAt AS itmCreatedAt`, 
					`purchaseRequestID = ${purchaseRequestID} AND costEstimateID IS NULL AND inventoryValidationID IS NULL`);
			}

			requestItemsData.filter(item => item.categoryType == "project").map(item => {
				requestProjectItems += getItemRow(true, item, readOnly);

				let quantity = item.quantity;
				let unitCost = getInventoryPreferredPrice(item.itemID, false, true) || 0;
				projectTotalAmount += (quantity * unitCost);
			})
			requestItemsData.filter(item => item.categoryType == "company").map(item => {
				requestCompanyItems += getItemRow(false, item, readOnly);

				let quantity = item.quantity;
				let unitCost = getInventoryPreferredPrice(item.itemID, false, true) || 0;
				companyTotalAmount += (quantity * unitCost);
			})
		} 
		else if (queryCEID && !purchaseRequestID) 
		{
			requestItemsData = getTableData(
				`ims_request_items_tbl AS irit
					LEFT JOIN ims_inventory_item_tbl AS iitt USING(itemID)`, 
				`irit.requestItemID, quantity, unitCost, totalCost, files, remarks, irit.itemID, irit.itemName, categoryType AS categoryName, itemUom AS unitOfMeasurementID, categoryType, iitt.createdAt AS itmCreatedAt`, 
				`costEstimateID = ${queryCEID} AND purchaseRequestID IS NULL AND inventoryValidationID IS NULL`);
			
			requestItemsData.filter(item => item.categoryType == "project").map(item => {
				requestProjectItems += getItemRow(true, item, readOnly, queryCEID);

				let quantity = item.quantity;
				let unitCost = getInventoryPreferredPrice(item.itemID, false, true) || 0;
				projectTotalAmount += (quantity * unitCost);
			})
			requestItemsData.filter(item => item.categoryType == "company").map(item => {
				requestCompanyItems += getItemRow(false, item, readOnly, queryCEID);

				let quantity = item.quantity;
				let unitCost = getInventoryPreferredPrice(item.itemID, false, true) || 0;
				companyTotalAmount += (quantity * unitCost);
			})
		} 
		else if (queryCEID && purchaseRequestID) 
		{
			requestItemsData = getTableData(
				`ims_request_items_tbl AS irit
					LEFT JOIN ims_inventory_item_tbl AS iitt USING(itemID)`, 
				`irit.requestItemID, quantity, unitCost, totalCost, files, remarks, irit.itemID, irit.itemName, categoryType AS categoryName, itemUom AS unitOfMeasurementID, categoryType, iitt.createdAt AS itmCreatedAt`, 
				`purchaseRequestID = ${purchaseRequestID} AND costEstimateID = ${queryCEID} AND inventoryValidationID IS NULL`);
			requestItemsData.filter(item => item.categoryType == "project").map(item => {
				requestProjectItems += getItemRow(true, item, readOnly, queryCEID);
			})
			requestItemsData.filter(item => item.categoryType == "company").map(item => {
				requestCompanyItems += getItemRow(false, item, readOnly, queryCEID);
			})
		}

		let checkboxProjectHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" project="true" ${disabledCE}>
			</div>
		</th>` : ``;
		let checkboxCompanyHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" company="true" ${disabledCE}>
			</div>
		</th>` : ``;
		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let tableCompanyRequestItemsName = !disabled ? "tableCompanyRequestItems" : "tableCompanyRequestItems0";
		let buttonProjectAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" project="true" ${disabledCE}><i class="fas fa-plus-circle"></i> Add Row</button>
			<button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		let buttonCompanyAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" company="true" ${disabledCE}><i class="fas fa-plus-circle"></i> Add Row</button>
			<button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow" company="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";

		let html = `
		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Materials and Equipment</div>
			<table class="table table-striped" id="${tableProjectRequestItemsName}">
				<thead>
					<tr style="white-space: nowrap">
						${checkboxProjectHeader}
						<th>Item Code</th>
						<th>Item Name ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Category</th>
						<th>UOM</th>
						<th>Unit Cost</th>
						<th>Total Cost</th>
						<th>File</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody class="itemProjectTableBody" project="true">
					${requestProjectItems}
				</tbody>
			</table>
			
			<div class="w-100 d-flex justify-content-between align-items-center py-2">
				<div>${buttonProjectAddDeleteRow}</div>
				<div class="font-weight-bolder" style="font-size: 1rem;">
					<span>Total Amount: &nbsp;</span>
					<span class="text-danger" style="font-size: 1.2em" id="totalAmount" project="true">${formatAmount(projectTotalAmount, true)}</span>
				</div>
			</div>
		</div>

		<div class="w-100">
			<hr class="pb-1">
			<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Company Materials and Equipment</div>
			<table class="table table-striped" id="${tableCompanyRequestItemsName}">
				<thead>
					<tr style="white-space: nowrap">
						${checkboxCompanyHeader}
						<th>Item Code</th>
						<th>Item Name ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
						<th>Category</th>
						<th>UOM</th>
						<th>Unit Cost</th>
						<th>Total Cost</th>
						<th>File</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody class="itemCompanyTableBody" company="true">
					${requestCompanyItems}
				</tbody>
			</table>
			
			<div class="w-100 d-flex justify-content-between align-items-center py-2">
				<div>${buttonCompanyAddDeleteRow}</div>
				<div class="font-weight-bolder" style="font-size: 1rem;">
					<span>Total Amount: &nbsp;</span>
					<span class="text-danger" style="font-size: 1.2em" id="totalAmount" company="true">${formatAmount(companyTotalAmount, true)}</span>
				</div>
			</div>
		</div>`;
		return  html;
	}
	// ----- END GET TABLE MATERIALS AND EQUIPMENT -----


	// ----- SELECT INVENTORY VALIDATION -----
	$(document).on("change", `[name="costEstimateID"]`, function() {
		const costEstimateID = $(this).val();
		const projectID      = $('option:selected', this).attr("projectID");
		const viewonly       = $(this).attr("viewonly");
		const status         = $(this).attr("status");

		if (status == "false" || status == "0" || status == "3") {
			if (viewonly != "true") {
				$(`[name="projectID"]`).val(projectID).trigger("change");
				if (costEstimateID && costEstimateID != 0) {
					$(`[name="projectID"]`).attr("disabled", true);
				} else {
					$(`[name="projectID"]`).removeAttr("disabled");
				}
			}
	
			$("#tableMaterialsEquipment").html(preloader);
			let table = "";
			if (costEstimateID && costEstimateID != 0) {
				table = getTableMaterialsEquipment(costEstimateID, false, false);
			} 
			else {
				table = getTableMaterialsEquipment(null, false, false);
			}
			setTimeout(() => {
				table && $("#tableMaterialsEquipment").html(table);
				initDataTables();
				updateTableItems();
				initAll();
				updateInventoryItemOptions();
			}, 200);
		}

	})
	// ----- END SELECT INVENTORY VALIDATION -----


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


    // ----- SELECT ITEM NAME -----
    $(document).on("change", "[name=itemID]", function() {
		const selectedItemID = $(this).val();
        const itemCode       = $('option:selected', this).attr("itemCode");
        const categoryName   = $('option:selected', this).attr("categoryName");
        const uom            = $('option:selected', this).attr("uom");
		const isProject      = $(this).closest("tbody").attr("project") == "true";
		const attr           = isProject ? "[project=true]" : "[company=true]";

		if (selectedItemID != "0") {
			$(`.btnAddRow${attr}`).removeAttr("disabled");

			getInventoryPreferredPrice(selectedItemID, this);

			$(this).closest("tr").find(`.itemcode`).first().text(itemCode);
			$(this).closest("tr").find(`.category`).first().text(categoryName);
			$(this).closest("tr").find(`.uom`).first().text(uom);
	
			$(`[name=itemID]${attr}`).each(function(i, obj) {
				let itemID = $(this).val();
				if (itemID == "0") {
					$(this).closest("tr").find("[name=quantity]").removeAttr("required");
					$(this).closest("tr").find("[name=quantity]").val("0");
					$(this).closest("tr").find(".unitCost").text(formatAmount("0.00", true));
					$(this).closest("tr").find(".totalcost").text(formatAmount("0.00", true));
					$(this).closest("tr").find("[name=files]").val("");
					$(this).closest("tr").find(".displayfile").empty();
					$(this).closest("tr").find("[name=remarks]").val("");
					$(this).closest("tr").find("[name=quantity], [name=files], [name=remarks]").attr("disabled", "true");
				} else {
					let oldQty = $(this).closest("tr").find("[name=quantity]").val();
					oldQty = oldQty != 0 ? oldQty : 0;
					$(this).closest("tr").find("[name=quantity]").val(oldQty);
					
					if ($(this).closest("tr").find("[name=quantity]").attr("ceID") == "true") {
						$(this).closest("tr").find("[name=files], [name=remarks]").removeAttr("disabled");
					} else {
						$(this).closest("tr").find("[name=quantity], [name=files], [name=remarks]").removeAttr("disabled");
					}
	
					const unitCost  = getInventoryPreferredPrice(itemID, this, true) || 0;
					const quantity  = $(this).closest("tr").find("[name=quantity]").val();
					const totalCost = quantity * unitCost;
					$(this).closest("tr").find(`.unitcost`).text(formatAmount(unitCost, true));
					$(this).closest("tr").find(".totalcost").text(formatAmount(totalCost, true));
	
				}
				$(this).html(getInventoryItem(itemID, isProject));
			}) 
			updateTotalAmount(isProject);
		} else {
			$(`.btnAddRow${attr}`).attr("disabled", true);
		}

		
    })
    // ----- END SELECT ITEM NAME -----


	// ----- KEYUP QUANTITY OR UNITCOST -----
	$(document).on("keyup", "[name=quantity]", function() {
		const index     = $(this).closest("tr").first().attr("index");
		const isProject = $(this).closest("tbody").attr("project") == "true";
		const attr      = isProject ? "[project=true]" : "[company=true]";
		const table     = isProject ? "project" : "company";
		const quantity  = +getNonFormattedAmount($(`#quantity${index}${table}${attr}`).val());
		const unitcost  = +getNonFormattedAmount($(`#unitcost${index}${attr}`).text());
		const totalcost = quantity * unitcost;
		$(`#totalcost${index}${attr}`).text(formatAmount(totalcost, true));
		updateTotalAmount(isProject);
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
				<span class="filename"
					style="display: block;
						width: 180px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;">${filename}</span>
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


    // ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {
		let isProject = $(this).attr("project") == "true";
        let row = getItemRow(isProject);
		if (isProject) {
			$(".itemProjectTableBody").append(row);
		} else {
			$(".itemCompanyTableBody").append(row);
		}
		updateTableItems();
		initInputmask();
		initAmount();
		initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			purchaseRequestID       = "",
			revisePurchaseRequestID = "",
			employeeID              = "",
			costEstimateID   = "",
			projectID               = "",
			purchaseRequestReason   = "",
			projectTotalAmount      = "0",
			companyTotalAmount      = "0",
			purchaseRequestRemarks  = "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			purchaseRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("purchaseRequestID", purchaseRequestID);
		$("#btnBack").attr("status", purchaseRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		let disabledReference = costEstimateID && costEstimateID != "0" ? "disabled" : disabled;
		
		let button = formButtons(data, isRevise);

		let reviseDocumentNo    = isRevise ? purchaseRequestID : revisePurchaseRequestID;
		let documentHeaderClass = isRevise || revisePurchaseRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePurchaseRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePurchaseRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PR", createdAt, reviseDocumentNo)}
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
							${purchaseRequestID && !isRevise ? getFormCode("PR", createdAt, purchaseRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${purchaseRequestStatus && !isRevise ? getStatusStyle(purchaseRequestStatus) : "---"}
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
								${getDateApproved(purchaseRequestStatus, approversID, approversDate)}
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
							${purchaseRequestRemarks && !isRevise ? purchaseRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
                        name="costEstimateID"
                        id="costEstimateID"
                        style="width: 100%"
						status="${purchaseRequestStatus}"
                        required
						viewonly="${disabled ? true : false}"
						${disabledReference}>
                        <option selected disabled>Select Reference No.</option>
                        ${getCostEstimateList(costEstimateID, purchaseRequestStatus)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-costEstimateID"></div>
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
                        required
						${costEstimateID && costEstimateID != "0" ? "disabled" : disabled}>
                        ${getProjectList(projectID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="-">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="-">
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
                    <label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="purchaseRequestReason"
                        name="purchaseRequestReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${purchaseRequestReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-purchaseRequestReason"></div>
                </div>
            </div>

            <div class="col-sm-12" id="tableMaterialsEquipment">
                ${getTableMaterialsEquipment(null, data, readOnly)}
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
			updateInventoryItemOptions();
			if (costEstimateID || projectID) {
				// $("[name=costEstimateID]").val(costEstimateID).trigger("change");
				$("[name=projectID]").val(projectID).trigger("change");
			}
			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
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

			headerButton(true, "Add Purchase Request");
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


	// ----- GET PURCHASE REQUEST DATA -----
	function getPurchaseRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { items: [] }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		const ceID = $(`[name="costEstimateID"]`).val();

		if (id) {
			data["purchaseRequestID"] = id;
			formData.append("purchaseRequestID", id);

			if (status != "2") {
				data["purchaseRequestStatus"] = status;
				formData.append("purchaseRequestStatus", status);
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {
			
			data["employeeID"]            = sessionID;
			data["costEstimateID"]        = $("[name=costEstimateID]").val() || null;;
			data["projectID"]             = $("[name=projectID]").val() || null;
			data["purchaseRequestReason"] = $("[name=purchaseRequestReason]").val()?.trim();
			data["projectTotalAmount"]    = updateTotalAmount(true);
			data["companyTotalAmount"]    = updateTotalAmount(false);
			
			formData.append("employeeID", sessionID);
			formData.append("costEstimateID", $("[name=costEstimateID]").val() || null);
			formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("purchaseRequestReason", $("[name=purchaseRequestReason]").val()?.trim());
			formData.append("projectTotalAmount", updateTotalAmount(true));
			formData.append("companyTotalAmount", updateTotalAmount(false));

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["purchaseRequestID"] = id;

				formData.append("purchaseRequestID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["purchaseRequestStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("purchaseRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["purchaseRequestStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("purchaseRequestStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const requestItemID = $(this).attr('requestItemID');

				const categoryType = 
					$(this).closest("tbody").attr("project") == "true" ? "project" : "company";

				const inventoryVendorID = $("td [name=itemID] option:selected", this).attr("inventoryVendorID");	
				const itemID          = $("td [name=itemID]", this).val();	
				const itemName        = $("td [name=itemID] option:selected", this).text();	
				const itemUom         = $("td [name=itemID] option:selected", this).attr("uom");	
				const itemDescription = $("td [name=itemID] option:selected", this).attr("itemDescription");	

				const quantity  = +getNonFormattedAmount($("td [name=quantity]", this).val());	
				const unitcost  = +getNonFormattedAmount($("td .unitcost", this).text());	
				const totalcost = quantity * unitcost;
				const remarks   = $("td [name=remarks]", this).val()?.trim();	

				let fileID   = $("td [name=files]", this).attr("id") || "";
				let file     = fileID ? $(`#${fileID}`)?.[0]?.files?.[0] : "";
				let fileArr  = file?.name?.split(".");
				let filename = file ? file?.name : "";

				let temp = {
					itemID, quantity, unitcost, totalcost: totalcost.toFixed(2),
					filename, categoryType
				};

				formData.append(`items[${i}][requestItemID]`, requestItemID);
				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemName]`, itemName?.trim());
				formData.append(`items[${i}][itemDescription]`, itemDescription);
				formData.append(`items[${i}][itemUom]`, itemUom);
				formData.append(`items[${i}][inventoryVendorID]`, inventoryVendorID);
				formData.append(`items[${i}][categoryType]`, categoryType);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][unitcost]`, unitcost);
				formData.append(`items[${i}][totalcost]`, totalcost);
				formData.append(`items[${i}][remarks]`, remarks);
				formData.append(`items[${i}][filename]`, filename);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);
				if (file) {
					temp["file"] = file;
					formData.append(`items[${i}][file]`, file, `${i}.${fileArr[1]}`);
				} else {
					const isHadExistingFile = $("td .file .displayfile", this).text().trim().length > 0;
					if (isHadExistingFile) {
						const filename = $("td .file .displayfile .filename", this).text().trim();

						temp["existingFile"] = filename;
						formData.append(`items[${i}][existingFile]`, filename);
					}
				}

				data["items"].push(temp);
			});
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


	// ----- VALIDATE INVENTORY ITEM PRICE LIST -----
	function validateItemPrice() {
		let flag = 0;
		$(`[name="itemID"]`).each(function(i) {
			const itemID = $(this).val();
			const price = getInventoryPreferredPrice(itemID, this);
			if (!price) {
				flag++;
			}
		})
		return flag > 0 ? false : true;
	}
	// ----- END VALIDATE INVENTORY ITEM PRICE LIST -----


    // ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


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
		const id = $(this).attr("purchaseRequestID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("purchaseRequestID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "save", "0", id);
				data.append("purchaseRequestStatus", 0);
				data.append("revisePurchaseRequestID", id);
				data.delete("purchaseRequestID");

				validateItemPrice();
				savePurchaseRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPurchaseRequestData(action, "save", "0", id);
			data.append("purchaseRequestStatus", 0);

			validateItemPrice()
			savePurchaseRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = $(this).attr("purchaseRequestID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);
		const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getPurchaseRequestData(action, "save", "0", id);
		data.append("purchaseRequestStatus", 0);

		if (revise) {
			data.append("revisePurchaseRequestID", id);
			data.delete("purchaseRequestID");
		}

		validateItemPrice();
		savePurchaseRequest(data, "save", null, pageContent);
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
		const id            = $(this).attr("purchaseRequestID");
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_purchase_request");
		const validatePrice = validateItemPrice();
		removeIsValid("#tableProjectRequestItems");
		removeIsValid("#tableCompanyRequestItems");

		if (validate && validatePrice) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getPurchaseRequestData(action, "submit", "1", id);

			if (revise) {
				data.append("revisePurchaseRequestID", id);
				data.delete("purchaseRequestID");
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
					moduleID:                46,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			savePurchaseRequest(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("purchaseRequestID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPurchaseRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                46,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                46,
					tableID:                 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("purchaseRequestStatus", status);

			savePurchaseRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("purchaseRequestID");
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		$("#modal_purchase_request_content").html(preloader);
		$("#modal_purchase_request .page-title").text("DENY PURCHASE REQUEST");
		$("#modal_purchase_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="purchaseRequestRemarks"
					name="purchaseRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-purchaseRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger" id="btnRejectConfirmation"
			purchaseRequestID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_purchase_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("purchaseRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PR", dateToday(), id);

		const validate = validateForm("modal_purchase_request");
		if (validate) {
			let tableData = getTableData("ims_purchase_request_tbl", "", "purchaseRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("purchaseRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("purchaseRequestRemarks", $("[name=purchaseRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                46,
					tableID: 				 id,
					notificationTitle:       "Purchase Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePurchaseRequest(data, "deny", notificationData, pageContent);
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
})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Purchase Request";
	let swalText, swalImg;

	$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("hide");

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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `purchase_request/savePurchaseRequest`,
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

						let swalTitle;
						if (method == "submit") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PR", dateCreated, insertedID)} denied successfully!`;
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
				if (res.dismiss == "cancel" && method != "submit") {
					if (method != "deny") {
						callback && callback();
					} else {
						$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------