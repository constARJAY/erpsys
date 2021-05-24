$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(39);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(39);
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
				"pms_bill_material_tbl", 
				"reviseBillMaterialID", 
				"reviseBillMaterialID IS NOT NULL AND billMaterialStatus != 4");
			return revisedDocumentsID.map(item => item.reviseBillMaterialID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("pms_bill_material_tbl", "", "billMaterialID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					billMaterialStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (billMaterialStatus == 0 || billMaterialStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (billMaterialStatus == 0) {
						isReadOnly = false;
					} else {
						isReadOnly = true;
					}
				} else {
					isReadOnly = readOnly;
				}

				if (isAllowed) {
					if (isRevise && employeeID == sessionID) {
						pageContent(true, tableData, isReadOnly, true, isFromCancelledDocument = false);
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
			// let id = decryptString(view_id);
			let id	= view_id;
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
					pageContent(true);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}pms/project_budget_rational?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/project_budget_rational?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/project_budget_rational?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/project_budget_rational`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const priceListCondition = [];

	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	
    const billMaterialList = getTableData("pms_bill_material_tbl", "",""); 

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, categoryName, unitOfMeasurementID",
		"itemStatus = 1");
	const designationList = getTableData("hris_designation_tbl JOIN hris_employee_list_tbl USING(designationID)","designationID, designationName, MAX(employeeHourlyRate) as designationRate", "designationStatus=1","","designationName");
	
	const projectList = getTableData(
		"pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
		"projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
		"projectListStatus = 1");

    const costEstimateList = getTableData("pms_cost_estimate_tbl JOIN pms_project_list_tbl ON pms_cost_estimate_tbl.projectID = pms_project_list_tbl.projectListID LEFT JOIN pms_client_tbl ON pms_project_list_tbl.projectListClientID = pms_client_tbl.clientID",
										"pms_cost_estimate_tbl.*, projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode"
                                            ,"costEstimateStatus='2'");
	   										
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
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
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
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 200 },
					{ targets: 9,  width: 80  },
					{ targets: 10, width: 250 },
				],
			});

			var table = $("#tablePersonnelRequest")
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80  },
					{ targets: 3,  width: 120  },
                    { targets: 4,  width: 120  }
				],
			});


			var table = $("#tablePersonnelRequest0")
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 120  }
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 120  },
                    { targets: 5,  width: 120  }
				],
			});
			var table = $("#tableProjectRequestItems0")
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 120  },
                    { targets: 5,  width: 120  }
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 120  },
                    { targets: 5,  width: 120  }
				],
			});

			var table = $("#tableCompanyRequestItems0")
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
					{ targets: 0,  width: 100},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 100  },
                    { targets: 5,  width: 100  }
				],
			});

			var table = $("#tableTravelRequest")
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
					{ targets: 0,  width: "5%"},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 80  },
					{ targets: 3,  width: 80  },
                    { targets: 4,  width: 120 },
                    { targets: 5,  width: 120 }
				],
			});

			var table = $("#tableTravelRequest0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
                paging: false,
				info: false,
				searching: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 80  },
					{ targets: 2,  width: 80  },
                    { targets: 3,  width: 120 },
                    { targets: 4,  width: 120 }
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_bill_material_tbl", "approversID")) {
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
			if(isCreateAllowed(39)){
				html = `
            	<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" 
			revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let billMaterialData = getTableData(
			"pms_bill_material_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID != ${sessionID} AND billMaterialStatus != 0 AND billMaterialStatus != 4`,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
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

		billMaterialData.map((item) => {
			let {
				fullname,
				billMaterialID,
				projectID,
				referenceCode,
				projectListCode,
				projectListName,
				approversID,
				approversDate,
				billMaterialStatus,
				billMaterialRemarks,
				billMaterialReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";

			let button = billMaterialStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(billMaterialID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(billMaterialID )}" 
				code="${getFormCode("PBR", createdAt, billMaterialID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, billMaterialStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(billMaterialID )}" code="${billMaterialID? getFormCode("PBR", createdAt, billMaterialID ):""}">>
					<td>${getFormCode("PBR", createdAt, billMaterialID )}</td>
					<td>${fullname}</td>
					<td>${referenceCode ? getFormCode("CEF",createdAt,referenceCode) : "-"}</td>
					<td>
						<div>
							${projectListName || '-'}
						</div>
						<small style="color:#848482;">${projectListCode || '-'}</small>
					</td>
					<td>${billMaterialReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(billMaterialStatus)}
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
		let billMaterialData = getTableData(
			"pms_bill_material_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(billMaterialStatus, 0, 1, 3, 2, 4, 5), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
					<th>Reference No.</th>
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

		billMaterialData.map((item) => {
			let {
				fullname,
				billMaterialID,
                projectID,
				referenceCode,
                projectListCode,
                projectListName,
				approversID,
				approversDate,
				billMaterialStatus,
				billMaterialRemarks,
				billMaterialReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = billMaterialRemarks ? billMaterialRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = billMaterialStatus == 2 || billMaterialStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = billMaterialStatus != 0 ? "btnView" : "btnEdit";

			let button = billMaterialStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(billMaterialID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(billMaterialID )}" 
                code="${getFormCode("PBR", createdAt, billMaterialID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(billMaterialID )}">
                <td>${getFormCode("PBR", createdAt, billMaterialID )}</td>
                <td>${fullname}</td>
				<td>${referenceCode ? getFormCode("CEF",createdAt,referenceCode) : "-"}</td>
                <td>
					<div>
						${projectListName || '-'}
					</div>
					<small style="color:#848482;">${projectListCode || '-'}</small>
				</td>
				<td>${billMaterialReason}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, billMaterialStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(billMaterialStatus)}
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
				billMaterialID     = "",
				billMaterialStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (billMaterialStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("PBR", createdAt, billMaterialID)}"
						revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel" 
							id="btnCancel"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("PBR", createdAt, billMaterialID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (billMaterialStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("PBR", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(billMaterialStatus == 2){
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						billMaterialID="${encryptString(billMaterialID)}"
						code="${getFormCode("PBR", createdAt, billMaterialID)}"
						status="${billMaterialStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (billMaterialStatus == 3) {
					// DENIED - FOR REVISE
					if(!isRevised(billMaterialID)){
						button = `
						<button
							class="btn btn-cancel"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("PBR", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}

				} else if (billMaterialStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(billMaterialID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("CEF", createdAt, billMaterialID)}"
							status="${billMaterialStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (billMaterialStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("PBR", createdAt, billMaterialID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							billMaterialID="${encryptString(billMaterialID)}"
							code="${getFormCode("PBR", createdAt, billMaterialID)}"><i class="fas fa-ban"></i> 
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
    function getProjectList(id = null, display = true) {
		let html =``;
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

    //
    // ----- GET PROJECT LIST -----
    function geCostEstimateList(id= null){
        let html 			 = "";
        let existCE 		 = [];
		let billMaterialData = getTableData("pms_bill_material_tbl");
			billMaterialData.map(items=>{existCE.push(items.referenceCode)});
			
            html += costEstimateList.filter(items => !existCE.includes(items.costEstimateID) || items.costEstimateID == id).map(items=>{
                let address = `${items.clientUnitNumber && titleCase(items.clientUnitNumber)+", "}${items.clientHouseNumber && items.clientHouseNumber +", "}${items.clientBarangay && titleCase(items.clientBarangay)+", "}${items.clientCity && titleCase(items.clientCity)+", "}${items.clientProvince && titleCase(items.clientProvince)+", "}${items.clientCountry && titleCase(items.clientCountry)+", "}${items.clientPostalCode && titleCase(items.clientPostalCode)}`;
                let {
                    fullname:    employeeFullname    = "",
                    department:  employeeDepartment  = "",
                    designation: employeeDesignation = "",
                } = employeeData(items.employeeID);
                return `<option 
                            value                = "${items.costEstimateID}" 
                            costestimatecode     = "${getFormCode("CEF",moment(items.createdAt),items.costEstimateID)}"
							projectid 			 = "${items.projectListID}"
                            projectcode          = "${items.projectListCode}"
                            projectname          = "${items.projectListName}"
                            clientcode           = "${items.clientCode}"
                            clientname           = "${items.clientName}"
                            address              = "${address}"
                            requestorname        = "${employeeFullname}"
                            requestordeparment   = "${employeeDepartment}"
                            requestordesignation = "${employeeDesignation}"
							reasons 			 = "${items.costEstimateReason}"
                            ${items.costEstimateID == id && "selected"}>
                            ${getFormCode("CEF",moment(items.createdAt),items.costEstimateID)}
                        </option>`;
			})
        return html;

    }
    // ----- END GET PROJECT LIST -----


	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
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
			html += `<option value="-">None</option>`;
			html += inventoryItemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});

		companyElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			html += `<option value="-">None</option>`;
			html += inventoryItemList.filter(item => !companyItemIDArr.includes(item.itemID) || item.itemID == companyItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == companyItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, param, display = true) {
        let html		= "";
		let itemIDArr 	= []; // 0 IS THE DEFAULT VALUE
		// const attr = isProject ? "[project=true]" : "[company=true]";
		let attr;
		switch(param){	
			case "project":
					attr = "[project=true]";
					html += `<option selected disabled>Select Item Name</option>`;
					html += `<option value="-" ${id == "-" ? "selected":""}>None</option>`;
					 // 0 IS THE DEFAULT VALUE
					$(`[name=itemID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 

					html += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
						return `
						<option 
							value        = "${item.itemID}" 
							itemCode     = "${item.itemCode}"
							categoryName = "${item.categoryName}"
							uom          = "${item.unitOfMeasurementID}"
							${item.itemID == id && "selected"}>
							${item.itemName}
						</option>`;
					});
				break;
			case "company":
					attr = "[company=true]"
					html += `<option selected disabled>Select Item Name</option>`;
					html += `<option value="-" ${id == "-" && "selected"}>None</option>`;
					$(`[name=itemID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 
					html += inventoryItemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
						return `
						<option 
							value        = "${item.itemID}" 
							itemCode     = "${item.itemCode}"
							categoryName = "${item.categoryName}"
							uom          = "${item.unitOfMeasurementID}"
							${item.itemID == id && "selected"}>
							${item.itemName}
						</option>`;
					});
				break;
			case "personnel":
					attr = "[personnel=true]";
					html += `<option selected disabled>Select Designation</option>`;
					html += `<option value="-" ${id == 0 && "selected"}>None</option>`;
					$(`[name=designationID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 
					html += designationList.filter(item => !itemIDArr.includes(item.designationID) || item.designationID == id).map(item => {
						return `
						<option 
							value        	= "${item.designationID}" 
							designationCode	= "${getFormCode("DSN",moment(),item.designationID)}"
							hourlyRate 		= "${item.designationRate}"
							${item.designationID == id && "selected"}>
							${item.designationName}
						</option>`;
					});

				break;
			default:
					attr = "[travel=true]";
		}

		
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
    function getItemRow(param, item = {}, readOnly = false) {
		let html;
			html = getTravelRow(item, readOnly);
        return html;
    }
    // ----- END GET ITEM ROW -----


	// ----- UPDATE TABLE ITEMS -----
	function updateTableItems() {
		$(".travelTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("travel", `true`);

			// DESCRIPTION
			$("td .description [name=description]", this).attr("id", `description${i}`);
			$("td .description [name=description]", this).attr("travel", `true`);
			$("td .description [name=description]", this).next().attr("id", `invalid-description${i}`);
			
			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `travelQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("travel", `true`);
			$("td .quantity [name=quantity]", this).next().attr("id", `invalid-travelQuantity${i}`);
			
			// UOM
			$(this).find("select").each(function(j) {
				// const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("travel", `true`);
				$(this).attr("id", `travelUom${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});
			// $("td .uom [name=travelUom]", this).attr("id", `travelUom${i}`);
			$("td .uom [name=travelUom]", this).next().attr("id", `invalid-travelUom${i}`);

			// UNIT PRICE
			$("td .unitprice [name=unitprice]", this).attr("id", `unitprice${i}`);
			$("td .unitprice [name=unitprice]", this).attr("travel", `true`);
			$("td .unitprice [name=quantity]", this).next().attr("id", `invalid-unitprice${i}`);
		})
		travelTotal();
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		var arr = [];
		$(".checkboxrow").each(function() {
			var temp = this.checked ? true : ""; 
			arr.push(temp);
		})
		var condition = arr.find(items=> items=== true)
		$(".btnDeleteRow").attr("disabled", condition ? false : true);
		travelTotal();
	}
	// ----- END UPDATE DELETE BUTTON -----


	// ----- DELETE TABLE ROW -----
	function deleteTableRow(param) {
		// const attr = isProject ? "[project=true]" : "[company=true]";
		let attr;
		switch(param){	
			case "project":
					attr = "[project=true]";
					
				break;
			case "company":
					attr = "[company=true]";
				break;
			case "personnel":
					attr = "[personnel=true]";
				break;
			default:
					attr = "[travel=true]";
		}
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
								$(this).html(getInventoryItem(itemID, param));
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

	// ----- UPDATING TRAVEL TOTALS
	function travelTotal(){
		
		let totalQty =0, totalUnitPrice=0, grandTotal=0;
		$(".travelTableBody tr").each(function(i) {
			var quantity  = $(this).find("[name=quantity]").val();
			var unitprice = $(this).find("[name=unitprice]").val() ? 
								parseFloat($(this).find("[name=unitprice]").val().replaceAll("₱","").replaceAll(",","")) 
							: 	parseFloat($(this).find("[name=unitprice]").val());
			let totalCost = parseFloat(quantity) * parseFloat(unitprice);
				quantity 	= quantity ? quantity  : $(this).find(".quantity").text();
				unitprice	= isNaN(unitprice) ? $(this).find(".unitprice").text() : unitprice ;
				totalCost	= totalCost? totalCost : $(this).find(".totalcost").text().replaceAll("₱","").replaceAll(",","");
				unitprice = isNaN(unitprice) ? 0 : unitprice;
			$(this).find(".totalCost").text(totalCost ? formatAmount(totalCost,true):"-");
			unitprice	    = isNaN(unitprice) ? 0 : unitprice;
			totalQty 		+= parseFloat(quantity||0);
			totalUnitPrice 	+= parseFloat(unitprice||0);
			grandTotal 		+= parseFloat(totalCost || 0);
		});
	
			$(".travel.totalQty").text(totalQty || "-");
			$(".travel.totalUnitPrice").text(formatAmount(totalUnitPrice,true));
			$(".travel.grandTotal").text(formatAmount(grandTotal,true));
			setTimeout(() => {
				billMaterialGrandTotal();
			}, 150);
	}
	// ----- END UPDATING TRAVEL TOTALS
	
	// ----- UPDATING PERSONNEL TOTALS
	function personnelTotal(){
		let grandTotal=0;
		$(".personnelTableBody tr").each(function(){
			var totalhours 	= $(this).find(".totalhours").text().trim();
			var unitprice	= $(this).find("[name=personnel_unitprice]").val() ? 
									$(this).find("[name=personnel_unitprice]").val().replaceAll(",","") :
									$(this).find(".unitCost").attr("value").trim();
			var totalCost 	= parseFloat(totalhours) * parseFloat(unitprice);
			$(this).find(".totalCost").text(formatAmount(totalCost || 0,true));
			grandTotal += parseFloat(totalCost || 0);
		});

		$(".personnelTotal").text(formatAmount(grandTotal, true));
		setTimeout(() => {
			billMaterialGrandTotal();
		}, 150);
	}
	// ----- END UPDATING PERSONNEL TOTALS





	// ----- UPDATING TABLES TOTALS
	function billMaterialGrandTotal(){
		let grandTotal = 0;
		$(".tableTotal").each(function(i) {
			let thisValue = $(this).text().replaceAll("₱","").replaceAll(",","").trim();
			grandTotal += parseFloat(thisValue);
			console.log(grandTotal);
		});
		$("#grandTotal").text(formatAmount(grandTotal,true));
	}
	// ----- END UPDATING TABLES TOTALS


	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=referenceCode]", function() {
        const thisvalue             = $(this).val();
        // const costestimatecode      = $('option:selected', this).attr("costestimatecode");
		const projectID 			= $('option:selected', this).attr("projectid");
        const projectcode           = $('option:selected', this).attr("projectcode");
        const projectname           = $('option:selected', this).attr("projectname");
        const clientcode            = $('option:selected', this).attr("clientcode");
        const clientname            = $('option:selected', this).attr("clientname");
        const address               = $('option:selected', this).attr("address");
        const requestorname         = $('option:selected', this).attr("requestorname");
        const requestordeparment    = $('option:selected', this).attr("requestordeparment");
        const requestordesignation  = $('option:selected', this).attr("requestordesignation");
		const billMaterialReason	= $('option:selected', this).attr("reasons")
        $("[name=projectname]").attr("projectid",projectID);
        $("[name=projectCode]").val(projectcode);
        $("[name=projectname]").val(projectname);
        $("[name=clientCode]").val(clientcode);
        $("[name=clientName]").val(clientname);
        $("[name=clientAddress]").val(address);
        $("[name=requestorname]").val(requestorname);
        $("[name=requestordepartment]").val(requestordeparment);
        $("[name=requestordesignation]").val(requestordesignation);
		$("[name=billMaterialReason]").val(billMaterialReason);

        $(".personnelTableBody").html('<tr><td colspan="6">'+preloader+'</td></tr>');
        $(".itemProjectTableBody").html('<tr><td colspan="6">'+preloader+'</td></tr>');
        $(".itemCompanyTableBody").html('<tr><td colspan="6">'+preloader+'</td></tr>');
        $(".travelTableBody").html('<tr><td colspan="6">'+preloader+'</td></tr>');

	
        let personnelTableBody   = getRequestRow("personnel",thisvalue);
		let itemProjectTableBody = getRequestRow("project",thisvalue);
        let itemCompanyTableBody = getRequestRow("company",thisvalue);
		let travelTableBody      = getRequestRow("travel",thisvalue);  
		let alertConfirmation 	 = ``;

		$("#alert-confirmation").hide();
		if(priceListCondition.length > 0){
			var priceListConditionData = [...new Set(priceListCondition)]; 
			priceListConditionData.map(items=>{
				showNotification("warning2",
				`Please set item code <strong>${items}</strong> into Item price list module to proceed in this proccess`);
			});
			alertConfirmation 	 = `<div class="alert alert-warning py-1 text-center" role="alert">
																			<small class="font-weight-bold"><i class="fa fa-exclamation-circle text-warning font-weight-bold"></i> Cannot process. Set a price for each item on the item price list first.</small>
																	</div>`;
		}
		
		setTimeout(() => {
			$("#alert-confirmation").html(alertConfirmation);
			$("#alert-confirmation").show(500);
			
			$(".personnelTableBody").html(personnelTableBody);
			$(".itemProjectTableBody").html(itemProjectTableBody);
			$(".itemCompanyTableBody").html(itemCompanyTableBody);
			$(".travelTableBody").html(travelTableBody);
			initAll();
		}, 300);
		
		
			
		
    })
    // ----- END SELECT PROJECT LIST -----

	// -------- TRIGGER TO CHANGE THE TRAVEL TOTALS
	$(document).on("keyup","[name=unitprice],[name=quantity]", function(){
			travelTotal();
	});
	// -------- END TRIGGER TO CHANGE THE TRAVEL TOTALS

	// -------- TRIGGER TO CHANGE THE PERSONNEL TOTALS
	$(document).on("keyup","[name=personnel_unitprice]", function(){
		personnelTotal();
	});
	// -------- END TRIGGER TO CHANGE THE PERSONNEL TOTALS



    // ----- SELECT ITEM NAME -----
    $(document).on("change", "[name=itemID]", function() {
		let thisValue 			= $(this).val();
        const itemCode     		= thisValue=="-"?"-": $('option:selected', this).attr("itemCode");
		const categoryName 		= thisValue=="-"?"-":$('option:selected', this).attr("categoryName");
        const uom          		= thisValue=="-"?"-":$('option:selected', this).attr("uom");
		// const condition    		= $(this).closest("tbody").attr("project");
		let attr;
		let param;
		if($(this).closest("tbody").attr("project")){
			attr 	= "[project=true]";
			param	= "project";
		}else{
			attr 	= "[company=true]";
			param	= "company";
		}
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			let itemID = $(this).val();
			$(this).html(getInventoryItem(itemID, param));
		});
		$(this).closest("tr").find(`.itemcode`).first().text(itemCode);
		$(this).closest("tr").find(`.category`).first().text(categoryName);
		$(this).closest("tr").find(`.uom`).first().text(uom);

		
    })
    // ----- END SELECT ITEM NAME -----

	// SELECT DESIGNATION NAME
	$(document).on("change","[name=designationID]", function(){
		let thisValue	=	$(this).val();
		const designationCode 	= $('option:selected', this).attr('designationCode');
        $(`[name=designationID]`).each(function(i, obj) {
			let itemID = $(this).val();
			$(this).html(getInventoryItem(itemID, "personnel"));
		});
		$(this).closest("tr").find(`.designationcode`).first().text(thisValue!=0?designationCode:"-");
	});
	// END SELECT DESIGNATION NAME

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
		let attr;
		if($(this).attr("project") == "true"){
			attr = "project";
		}else if($(this).attr("company") == "true"){
			attr = "company";
		}else if($(this).attr("personnel") == "true"){
			attr = "personnel";
		}else{
			attr = "travel";
		}
		deleteTableRow(attr);
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
		// let param = $(this).attr("project");
		let row;
		if($(this).attr("project") == "true"){
			row	= getItemRow("project");
			$(".itemProjectTableBody").append(row);
		}else if($(this).attr("company") == "true"){
			row	= getItemRow("company");
			$(".itemCompanyTableBody").append(row);
		}else if($(this).attr("personnel") == "true"){
			row	= getItemRow("personnel");
			$(".personnelTableBody").append(row);
		}else{
			row	= getItemRow("travel");
			$(".travelTableBody").append(row);
		}
		updateTableItems();
		initInputmask();
		initAmount();
		initQuantity();
		travelTotal();
		
		
    })
    // ----- END INSERT ROW ITEM -----


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=quantity]${attr}`).map(element => element.value || "0");
		const unitCostArr = $.find(`[name=unitCost]${attr}`).map(element => element.value.replaceAll(",", "") || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#totalAmount${attr}`).text(formatAmount(totalAmount, true));
		return totalAmount;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			billMaterialID       = "",
			reviseBillMaterialID = "",
            referenceCode        = "",
			employeeID           = "",
			projectID            = "",
			billMaterialReason   = "",
			billMaterialRemarks  = "",
			approversID          = "",
			approversStatus      = "",
			approversDate        = "",
			billMaterialStatus   = false,
			submittedAt          = false,
			createdAt            = false,
		} = data && data[0];

		let requestProjectItems = "", requestCompanyItems = "", requestPersonnel="", requestTravel="";
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("billMaterialID", encryptString(billMaterialID));
		$("#btnBack").attr("status", billMaterialStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let checkboxTravelHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" travel="true">
			</div>
		</th>` : ``;

		let tablePersonnelRequestName 	 = !disabled ? "tablePersonnelRequest" 	  : "tablePersonnelRequest0" ;
		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let tableCompanyRequestItemsName = !disabled ? "tableCompanyRequestItems" : "tableCompanyRequestItems0";
		let tableTravelRequestName		 = !disabled ? "tableTravelRequest" 	  : "tableTravelRequest0";


		if(referenceCode){
			var refProjectID,projectcode,projectname,clientcode,clientname,address,requestorname,requestordeparment,requestordesignation;
			var referenceCodeData = costEstimateList.filter(items=>items.costEstimateID == referenceCode);
			let clientaddress  = `${referenceCodeData[0].clientUnitNumber && titleCase(referenceCodeData[0].clientUnitNumber)+", "}${referenceCodeData[0].clientHouseNumber && referenceCodeData[0].clientHouseNumber +", "}${referenceCodeData[0].clientBarangay && titleCase(referenceCodeData[0].clientBarangay)+", "}${referenceCodeData[0].clientCity && titleCase(referenceCodeData[0].clientCity)+", "}${referenceCodeData[0].clientProvince && titleCase(referenceCodeData[0].clientProvince)+", "}${referenceCodeData[0].clientCountry && titleCase(referenceCodeData[0].clientCountry)+", "}${referenceCodeData[0].clientPostalCode && titleCase(referenceCodeData[0].clientPostalCode)}`;
				
			let {
				fullname:    employeeFullname    = "",
				department:  employeeDepartment  = "",
				designation: employeeDesignation = "",
			} = employeeData(referenceCodeData[0].employeeID);
				refProjectID 		  = referenceCodeData[0].projectListID;
				projectcode           = referenceCodeData[0].projectListCode;
				projectname           = referenceCodeData[0].projectListName;
				clientcode            = referenceCodeData[0].clientCode;
				clientname            = referenceCodeData[0].clientName;
				address               = clientaddress;
				requestorname         = employeeFullname;
				requestordeparment    = employeeDepartment;
				requestordesignation  = employeeDesignation;
			
		}


		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? billMaterialID : reviseBillMaterialID;
		let documentHeaderClass = isRevise || reviseBillMaterialID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBillMaterialID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBillMaterialID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PBR", createdAt, reviseDocumentNo)}
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
							${billMaterialID && !isRevise ? getFormCode("PBR", createdAt, billMaterialID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${billMaterialStatus && !isRevise ? getStatusStyle(billMaterialStatus) : "---"}
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
								${getDateApproved(billMaterialStatus, approversID, approversDate)}
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
							${billMaterialRemarks && !isRevise ? billMaterialRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_bill_material">
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
                        id="billMaterialReason"
                        name="billMaterialReason"
                        required
                        rows="4"
                        style="resize:none;"
						disabled >${billMaterialReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-billMaterialReason"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No.  ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="referenceCode"
                        id="referenceCode"
                        style="width: 100%"
                        required
						${billMaterialID == "" ? ``:`disabled`}>
                        <option selected disabled>Select Reference No.</option>
                        ${geCostEstimateList(referenceCode)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-referenceCode"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="${projectcode||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" class="form-control" name="projectname" id="projectID" projectid="${refProjectID || ""}" disabled value="${projectname||"-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="${clientcode||"-"}">
                </div>
            </div>
            <div class="col-md-3 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="${clientname||"-"}">
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" class="form-control" name="clientAddress" disabled value="${address||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Requestor Name</label>
                    <input type="text" class="form-control" name="requestorname" disabled value="${requestorname||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" name="requestordepartment" disabled value="${requestordeparment||"-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" requestordesignation disabled value="${requestordesignation||"-"}">
                </div>
            </div>
            

            <div class="col-sm-12">
				<div id="alert-confirmation"></div>
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Personnel And Laborers</div>
                    <table class="table table-striped" id="${tablePersonnelRequestName}">
                        <thead>
                            <tr style="white-space: nowrap">
								<th>Designation Code</th>
                                <th>Designation</th>
                                <th>Total Hours</th>
                                <th>Hourly Rate</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="personnelTableBody" personnel="true">
                         
                        </tbody>
                    </table>
                </div>
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Project Materials and Equipment</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Item Code</th>
                                <th>Item Name </th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Unit Price</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
                        
                        </tbody>
                    </table>
                </div>
				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Company Materials and Equipment</div>
                    <table class="table table-striped" id="${tableCompanyRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								<th>Item Code</th>
                                <th>Item Name </th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Unit Price</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="itemCompanyTableBody" company="true"> </tbody>
                    </table>
                </div>

				<div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Travel And Transportation</div>
                    <table class="table table-striped" id="${tableTravelRequestName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxTravelHeader}
                                <th>Description ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>UOM</th>
                                <th>Unit Price</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody class="travelTableBody" travel="true">
                        
                        </tbody>
					</table>
					<div class="w-100 d-flex justify-content-between align-items-center py-2 travelButtons">
						
					</div>
                </div>
				<div class="row py-2">
					<div class="offset-lg-7 offset-xl-8 col-12 col-sm-12 col-lg-5 col-xl-4 col-xl-4 pt-3 pb-2">
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Personnel Total Cost:</div>
							<div class="col-6 col-lg-5 text-right text-danger tableTotal personnelTotal" style="font-size: 1.05em">
								₱ 0.00
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Project Total Cost:</div>
							<div class="col-6 col-lg-5 text-right text-danger tableTotal projectTotal" style="font-size: 1.05em">
								₱ 0.00
							</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Company Total Cost:</div>
							<div class="col-6 col-lg-5 text-right text-danger tableTotal companyTotal" style="font-size: 1.05em">
								₱ 0.00
							</div>
						</div>
						<div class="row pb-2" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Travel Total Cost:</div>
							<div class="col-6 col-lg-5 text-right text-danger tableTotal travel grandTotal " style="font-size: 1.05em">
								₱ 0.00
							</div>
						</div>

						<div class="row pt-1" style="font-size: 1.3rem; font-weight:bold; border-bottom: 3px double black; border-top: 1px solid black">
							<div class="col-6 col-lg-7 text-left">Grand Total:</div>
							<div class="col-6 col-lg-5 text-right text-danger" id="grandTotal" style="font-size: 1.05em">
								₱ 0.00
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
		if (billMaterialID) {
			requestProjectItems += getRequestRow("project",referenceCode,"",billMaterialID);
			requestCompanyItems += getRequestRow("company",referenceCode,"",billMaterialID);
			requestPersonnel 	+= getRequestRow("personnel",referenceCode,readOnly, billMaterialID);
			requestTravel 		+= getRequestRow("travel",referenceCode, readOnly, billMaterialID);   
		}

		setTimeout(() => {
			$("#page_content").html(html);
			initDataTables();
			updateTableItems();
			initAll();
			updateInventoryItemOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			$(".personnelTableBody").html(requestPersonnel);
			$(".itemProjectTableBody").html(requestProjectItems);
			$(".itemCompanyTableBody").html(requestCompanyItems);
			$(".travelTableBody").html(requestTravel);
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

			headerButton(true, "Add Project Budget Rationale");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {
			headerButton(false, "", isRevise, isFromCancelledDocument);
			headerTabContent(false);
			formContent(data, readOnly, isRevise, isFromCancelledDocument);

			setTimeout(() => {
				billMaterialGrandTotal();
			}, 300);

		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----


	// ----- GET Project Budget Rationale DATA -----
	function getbillMaterialData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { items: []};
		const approversID = method != "approve" && moduleApprover;


		if (id) {
			data["billMaterialID"] = id;

			if (status != "2") {
				data["billMaterialStatus"] = status;
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;
		data["costEstimateID"]		  = $("[name=referenceCode]").val();
		if (currentStatus == "0" && method != "approve") {
			
			data["employeeID"]            = sessionID;
			data["projectID"]             = $("[name=projectname]").attr("projectid") || null;
			data["referenceCode"]             = $("[name=referenceCode]").val() || null;
			data["billMaterialReason"] 	  = $("[name=billMaterialReason]").val()?.trim();
		
			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();
			} else if (action == "update") {
				data["billMaterialID"] = id;
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				if (approversID) {
					data["approversID"]           = approversID;
					data["billMaterialStatus"] = 1;
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["billMaterialStatus"] 	  = 2;
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				var itemDescription = null, unitCost, totalCost,travelDescription,unitOfMeasure;
				var itemID 	= $(this).find(".itemcode").attr("value") ?? null;
					if(itemID){
						var itemInfoData = getTableData("ims_inventory_item_tbl","itemDescription", "itemID="+itemID);
						itemDescription  = itemInfoData[0].itemDescription;
					}


					if($(this).find("[name=description]").val() || $(this).find("[name=description]").val() == ""){
						travelDescription = $(this).find("[name=description]").val();
						unitOfMeasure 	  = $("[name=travelUom] option:selected",this).text();
						unitCost 		  = $(this).find("[name=unitprice]").val().replaceAll(",","");
						totalCost 		  = $(this).find(".totalCost").text().replaceAll("₱","").replaceAll(",","");
					}else{
						travelDescription = $(this).find(".description").text().replaceAll("\n","").replaceAll("\t","").trim();
						unitOfMeasure 	  = $(this).find(".uom").text().replaceAll("\n","").replaceAll("\t","").trim();
						if($(this).find("[name=personnel_unitprice]").val()){
							unitCost 		  = $(this).find("[name=personnel_unitprice]").val().replaceAll(",","");
							totalCost 		  = $(this).find(".totalCost").text().replaceAll("₱","").replaceAll(",","").trim();
						}else{
							unitCost 		  = $(this).find(".unitCost").attr("value");
							totalCost 		  = $(this).find(".totalCost").attr("value");
						}
						
					}

				var temp   = {
						// FOR DESIGNATION
							designationID: 	 		$(this).find(".designationcode").attr("value") ?? null,
							designationName: 		$(this).find(".designation").text().replaceAll("\n","").trim() ?? null,
							designationTotalHours : $(this).find(".totalhours").text().replaceAll("\n","").trim() ?? null,
						// FOR ITEMS
							itemID:					itemID,
							itemName:				$(this).find(".itemname").text().replaceAll("\n","").replaceAll("\t","").trim() ?? null,
							itemUom:				unitOfMeasure ?? $(this).find(".uom").text().replaceAll("\n","").replaceAll("\t","").trim(),
							itemDescription:  		itemDescription,
							categoryType: 			$(this).attr("category") ?? null,
						//  FOR TRAVEL
							travelDescription:		travelDescription == "" || !travelDescription ? null : travelDescription,
						// FOR ALL
							quantity:	$(this).find(".quantity").text().replaceAll("\n","").replaceAll("\t","").trim() || ($(this).find("[name=quantity]").val() || "0"),
							unitCost: 	unitCost ?? "0",
							totalCost:  totalCost ?? "0",
							createdBy: sessionID,
							updatedBy: sessionID
					};
				data["items"].push(temp);
			});


		} 
		return data;
	}
	// ----- END GET Project Budget Rationale DATA -----


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
		const id = decryptString($(this).attr("billMaterialID"));
		const fromCancelledDocument = $(this).attr("cancel")== "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise     				= $(this).attr("revise") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("PBR", dateToday(), id);
		const status     				= $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument &&  "insert" || (id && feedback ? "update" : "insert");
				const data   = getbillMaterialData(action, "save", "0", id);
				data["billMaterialStatus"] = 0;
				if(!isFromCancelledDocument){
					data["reviseBillMaterialID"] = id;
					delete data["billMaterialID"];
				}else{
					data["billMaterialID"] = id;
					delete data["action"];
					data["action"] = "update";
				}
				

				// data.append("billMaterialStatus", 0);
				// data.append("reviseBillMaterialID", id);
				// data.delete("billMaterialID");

				savebillMaterial(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getbillMaterialData(action, "save", "0", id);
			data["billMaterialStatus"] = 0;
			// data.append("billMaterialStatus", 0);

			savebillMaterial(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("PBR", dateToday(), id);
		const action   					= revise && "insert" || (id && feedback ? "update" : "insert");
		const data     					= getbillMaterialData(action, "save", "0", id);
		data["billMaterialStatus"] 		= 0;
		// data.append("billMaterialStatus", 0);

		if (revise) {
			if(!isFromCancelledDocument){
				data["reviseBillMaterialID"] = id;
				delete data["billMaterialID"];
			}else{
				data["billMaterialID"] = id;
				delete data["action"];
				data["action"] = "update";
			}
		}
		console.log(data);
		savebillMaterial(data, "save", null, pageContent);
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
		const id           				= decryptString($(this).attr("billMaterialID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_bill_material");
		removeIsValid("#tableTravelRequest");
		removeIsValid("#tablePersonnelRequest");
		if (validate) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getbillMaterialData(action, "submit", "1", id);

			if (revise) {
				if(!isFromCancelledDocument){
					data["reviseBillMaterialID"] = id;
					delete data["billMaterialID"];
				}
			}

			let approversID = "", approversDate = "";
			for (var i of Object.keys(data)) {
				if (i[0] == "approversID")   approversID   = i[1];
				if (i[0] == "approversDate") approversDate = i[1];
			}

			const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                39,
					notificationTitle:       "Project Budget Rationale",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}
			if(priceListCondition.length > 0){
				var priceListConditionData = [...new Set(priceListCondition)]; 
				priceListConditionData.map(items=>{
					showNotification("warning2",
					`Please set item code <strong>${items}</strong> into Item price list module to proceed in this proccess`);
				});
			}else{
				savebillMaterial(data, "submit", notificationData, pageContent);
			}
			
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString( $(this).attr("billMaterialID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getbillMaterialData(action, "cancelform", "4", id, status);

		savebillMaterial(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("billMaterialID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("pms_bill_material_tbl", "", "billMaterialID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let billMaterialID  = tableData[0].billMaterialID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getbillMaterialData("update", "approve", "2", id);
			let dateApproved = updateApproveDate(approversDate)

			data["approversStatus"] = updateApproveStatus(approversStatus, 2);
			data["approversDate"] 	= dateApproved;

			// delete data["billMaterialID"];

			// data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			// data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                39,
					tableID:                 id,
					notificationTitle:       "Project Budget Rationale",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				thisCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                39,
					tableID:                 id,
					notificationTitle:       "Project Budget Rationale",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			// data.append("billMaterialStatus", status);
			data["billMaterialStatus"] 	= status;
			savebillMaterial(data, "approve", notificationData, pageContent, billMaterialID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const feedback = $(this).attr("code") || getFormCode("PBR", dateToday(), id);

		$("#modal_bill_material_content").html(preloader);
		$("#modal_bill_material .page-title").text("DENY PROJECT BUDGET RATIONAL");
		$("#modal_bill_material").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="billMaterialRemarks"
					name="billMaterialRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-billMaterialRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			billMaterialID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_bill_material_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("billMaterialID"));
		const feedback = $(this).attr("code") || getFormCode("PBR", dateToday(), id);

		const validate = validateForm("modal_bill_material");
		if (validate) {
			let tableData = getTableData("pms_bill_material_tbl", "", "billMaterialID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let data = {};
				data["action"]				= "update";
				data["method"]				= "deny";
				data["billMaterialID"]		= id;
				data["approversStatus"]		= updateApproveStatus(approversStatus, 3);
				data["approversDate"]		= updateApproveDate(approversDate);
				data["billMaterialRemarks"]	= $("[name=billMaterialRemarks]").val()?.trim();
				data["updatedBy"]			= sessionID;
				
				let notificationData = {
					moduleID:                39,
					tableID: 				 id,
					notificationTitle:       "Project Budget Rationale",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savebillMaterial(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----



	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const billMaterialID = decryptString($(this).attr("billMaterialID"));
		const feedback       = $(this).attr("code") || getFormCode("PBR", dateToday(), id);

		const id = decryptString($(this).attr("billMaterialID"));
		let data = {
			billMaterialID, action:"update", method:  "drop", updatedBy: sessionID
		};

		savebillMaterial(data, "drop", null, pageContent);
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


	function getTravelRow(data={}, readOnly=false){
		let html = "";
		let {
			travelDescription 	= "",
			quantity     		= "0.00",
			travelUnitOfMeasure = "",
			unitCost 			= "",
		} = data;
		if (readOnly) {
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="description">
						${travelDescription || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity}
					</div>
				</td>
				<td>
					<div class="uom">
						${travelUnitOfMeasure || "-"}
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
					<div class="description">
						<textarea
							minlength="4" 
							maxlength="500"
							rows="2" 
							style="resize: none" 
							class="form-control" 
							name="description" 
							id="description" required>${travelDescription || ""}</textarea>
						<div class="invalid-feedback d-block" id="invalid-description"></div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control text-center input-quantity"
							placeholder="0.00"
							data-allowcharacters="[0-9][.]" 
							min="0.00" 
							max="999999999" 
							id="travelQuantity" 
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" 
							required>
						<div class="invalid-feedback d-block" id="invalid-quantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">
						<select
						class="form-control validate select2"
						name="travelUom"
						id="travelUom"
						style="width: 100%"
						required
						travel="true">
							${unitOfMeasurementOptions(travelUnitOfMeasure)}
						</select>
						<div class="invalid-feedback d-block" id="invalid-travelUom"></div>
					</div>
				</td>
				<td>
					<div class="unitprice">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text">₱</span>
							</div>
							<input type="text" class="form-control amount" min="0.00" max="9999999999" minlength="1" 
										maxlength="20" name="unitprice" id="unitprice" value="${unitCost}" project="true" style="text-align: right;">
						</div>
						<div class="invalid-feedback d-block" id="invalid-unitprice"></div>
					</div>
				</td>
				<td>
					<div class="totalCost text-right">${unitCost || "-"}</div>
				</td>
			</tr>`;
		}
		
		return html;
	}

	function getRequestRow(param = null, referenceCode = null , readOnly = false , id = null){
		/**
		 * Param -> personnel, project, company, travel
		 * ID -> depends on the Cost estimate Id's
		 */
		 let html = "", tableData = "", tableDataReference="",checkboxTravelHeader="";
		 let totalQty = 0, totalHours =0, totalHourlyRate=0, totalCost=0, totalPrice=0, grandTotalPrice=0;
		 var condition  = id ? `AND billMaterialID=${id}` :``;	 
		 switch(param){
			 case "personnel":
				tableDataReference = getTableData("hris_personnel_request_tbl","",`costEstimateID = '${referenceCode}' `);
				if(tableDataReference[0].designationID){
					tableData = getTableData(`hris_personnel_request_tbl AS hprt JOIN hris_designation_tbl AS hdt USING(designationID)`,
						`hprt.designationID AS designationID, hprt.designationName AS designationName, hprt.unitCost AS unitCost,
						designationTotalHours, quantity,
						hdt.createdAt AS createdAt, costEstimateID`,
						`costEstimateID = '${referenceCode}' ${condition}` );

							tableData.map((items,index)=>{
								if(readOnly){
									html += `   <tr class="itemTableRow" requestvalue="${items.requestItemID}">
												<td>
													<div class="designationcode" value="${items.designationID}">
														${items.designationID != "0" ? getFormCode("DSN",moment(items.createdAt),items.designationID) :"-"}
													</div>
												</td>
												<td>
													<div class="designation">
														${items.designationID != "0" ? items.designationName : `-`}
													</div>
												</td>
												<td class="text-center">
													<div class="totalhours">
														${items.designationID != "0" ? items.designationTotalHours : `-`}
													</div>
												</td>
												<td class="text-right">
													<div class="text-right unitCost" value="${items.unitCost}">
														${formatAmount(items.unitCost,true)}
													</div>
												</td>
												<td class="text-right">
													<div class="totalCost text-right" value="${totalCost}">
														${formatAmount(totalCost,true)}
													</div>
												</td>
											</tr>`;
								}else{
									html += `   <tr class="itemTableRow" requestvalue="${items.requestItemID}">
										<td>
											<div class="designationcode" value="${items.designationID}">
												${items.designationID != "0" ? getFormCode("DSN",moment(items.createdAt),items.designationID) :"-"}
											</div>
										</td>
										<td>
											<div class="designation">
												${items.designationID != "0" ? items.designationName : `-`}
											</div>
										</td>
										<td class="text-center">
											<div class="totalhours">
												${items.designationID != "0" ? items.designationTotalHours : `-`}
											</div>
										</td>
										<td class="text-right">
											<div class="unitprice">
												<div class="input-group">
													<div class="input-group-prepend">
														<span class="input-group-text">₱</span>
													</div>
													<input type="text" class="form-control amount" min="0.01" max="9999999999" minlength="1" 
																maxlength="20" name="personnel_unitprice" id="personnel_unitprice${index}" value="${items.unitCost}" personnel=true style="text-align: right;" required>
												</div>
												<div class="invalid-feedback d-block" id="invalid-personnel_unitprice${index}"></div>
											</div>
										</td>
										<td class="text-right">
											<div class="totalCost text-right" value="${items.totalCost}">
												${formatAmount(items.totalCost,true)}
											</div>
										</td>
									</tr>`;
									
								}
								setTimeout(() => {
									initAmount();
									personnelTotal();
								}, 800);
							});
				}else{
					html += `
							<tr class="">
								<td class="text-center" colspan="5">No matching records found</td>
							</tr>`;
				}
				
				
					  setTimeout(() => {
						$(`.tableTotal.personnelTotal`).text(formatAmount(grandTotalPrice,true));
					 }, 500);
				 break;
			 case "project":
					 tableDataReference = getTableData("ims_request_items_tbl","",`costEstimateID = '${referenceCode}' AND categoryType = 'project' `);
					 if(tableDataReference.length > 0){
						tableData = getTableData(`ims_request_items_tbl LEFT JOIN ims_inventory_price_list_tbl USING(itemID)`, 
						`ims_request_items_tbl.*,  MAX(vendorCurrentPrice) AS higherPrice, (SELECT sub_inv.itemCode FROM ims_inventory_item_tbl as sub_inv WHERE sub_inv.itemID = ims_request_items_tbl.itemID ) AS itemCode`, 
						`costEstimateID = '${referenceCode}' AND categoryType = 'project' ${condition}`,``,`itemID`);
					
						tableData.map((items, index)=>{
   
							items.higherPrice ? "" : priceListCondition.push(items.itemCode);
   
							var totalCost   =  parseFloat(items.higherPrice || "0") * parseFloat(items.quantity);
							totalQty        += parseFloat(items.quantity) ; 
							totalPrice      += parseFloat(items.higherPrice || "0"); 
							grandTotalPrice += parseFloat(totalCost);
										html += `
										<tr class="itemTableRow" requestvalue="${items.requestItemID}" category="project">
											<td>
												<div class="itemcode" value="${items.itemID}">
													${items.itemCode}
												</div>
											</td>
											<td>
												<div class="itemname">
													${items.itemName}
												</div>
											</td>
											<td class="text-center">
												<div class="quantity">
													${items.quantity}
												</div>
											</td>
											<td>
												<div class="uom">
													${items.itemUom}
												</div>
											</td>
											<td>
												<div class="unitCost unitprice text-right" value="${items.higherPrice}">
													${formatAmount(items.higherPrice,true)}
												</div>
											</td>
											<td>
												<div class="totalCost text-right" value="${totalCost}">
													${formatAmount(totalCost,true)}
												</div>
											</td>
										</tr>`;
						});
					 }else{
						html += `
								<tr class="">
									<td class="text-center" colspan="6">No matching records found</td>
								</tr>`;
				 	 }
					 
					 setTimeout(() => {
						 $(".tableTotal.projectTotal").text(formatAmount(grandTotalPrice,true));
					 }, 500);
					 
				 break;
			 case "company":
				 tableDataReference = getTableData("ims_request_items_tbl","",`costEstimateID = '${referenceCode}' AND categoryType = 'company' `);
				if(tableDataReference.length > 0){
				 tableData = getTableData(
					 `ims_request_items_tbl LEFT JOIN ims_inventory_price_list_tbl USING(itemID)`, 
					 `ims_request_items_tbl.*,  MAX(vendorCurrentPrice) AS higherPrice, (SELECT sub_inv.itemCode FROM ims_inventory_item_tbl as sub_inv WHERE sub_inv.itemID = ims_request_items_tbl.itemID ) AS itemCode`, 
					 `costEstimateID = '${referenceCode}' AND categoryType = 'company' ${condition}`,``,`itemID`);
						 tableData.map((items, index)=>{
							 items.higherPrice ? "" : priceListCondition.push(items.itemCode);
							 var totalCost   =  parseFloat(items.higherPrice || "0") * parseFloat(items.quantity);
							 totalQty        += parseFloat(items.quantity) ; 
							 totalPrice      += parseFloat(items.higherPrice || "0"); 
							 grandTotalPrice += parseFloat(totalCost);
	
							 html += `
							 <tr class="itemTableRow" requestvalue="${items.requestItemID}" category="company">
								 <td>
									 <div class="itemcode" value="${items.itemID}">
										 ${items.itemCode}
									 </div>
								 </td>
								 <td>
									 <div class="itemname">
										 ${items.itemName}
									 </div>
								 </td>
								 <td class="text-center">
									 <div class="quantity">
										 ${items.quantity}
									 </div>
								 </td>
								 <td>
									 <div class="uom">
										 ${items.itemUom}
									 </div>
								 </td>
								 <td>
									 <div class="unitCost unitprice text-right" value="${items.higherPrice}">
										 ${formatAmount(items.higherPrice,true)}
									 </div>
								 </td>
								 <td>
									 <div class="totalCost text-right" value="${totalCost}">
										 ${formatAmount(totalCost,true)}
									 </div>
								 </td>
							 </tr>`;
						 });
				}else{
					html += `
							<tr class="">
								<td class="text-center" colspan="6">No matching records found</td>
							</tr>`;
				 }
				
					 setTimeout(() => {
						$(`.tableTotal.companyTotal`).text(formatAmount(grandTotalPrice,true));
					 }, 500);

							 
				 break;
			 default:
					 tableData = getTableData(`ims_travel_request_tbl`,
										 `travelRequestID,travelDescription,unitOfMeasure,quantity,unitCost,totalCost`,
										 `costEstimateID = ${referenceCode} ${condition}`);
					var tableDataDescirption = tableData.length > 0 ? tableData[0]["travelDescription"].toLowerCase(): "none";
					if(tableData.length > 0 ){
						tableData.map((items,index)=>{
							if(!readOnly){
								if(index > 0){
									html += `
										<tr class="itemTableRow" requestvalue="${items.travelRequestID}"  index="${index}">
											<td class="text-center">
												<div class="action">
													<input type="checkbox" class="checkboxrow" id="checkboxrow${index}">
												</div>
											</td>
											<td>
												<div class="description">
													<textarea
														minlength="4" 
														maxlength="500"
														rows="2" 
														style="resize: none" 
														class="form-control" 
														name="description" 
														id="description${index}" required>${items.travelDescription}</textarea>
													<div class="invalid-feedback d-block" id="invalid-description${index}"></div>
												</div>
											</td>
											<td class="text-center">
												<div class="quantity">
													<input 
														type="text" 
														class="form-control input-quantity text-center"
														data-allowcharacters="[0-9]"
														min="0.00" 
														max="999999999" 
														id="travelQuantity${index}" 
														name="quantity" 
														value="${items.quantity}" 
														minlength="1" 
														maxlength="20" 
														required>
													<div class="invalid-feedback d-block" id="invalid-travelQuantity${index}"></div>
												</div>
											</td>
											<td>
												<div class="uom">
													<select
													class="form-control validate select2"
													name="travelUom"
													id="travelUom${index}"
													style="width: 100%"
													required
													travel="true">
														${unitOfMeasurementOptions(items["unitOfMeasure"].toLowerCase())}
													</select>
													<div class="invalid-feedback d-block" id="invalid-travelUom${index}"></div>
												</div>
											</td>
											<td>
												<div class="unitprice">
													<div class="input-group">
														<div class="input-group-prepend">
															<span class="input-group-text">₱</span>
														</div>
														<input type="text" class="form-control amount" min="0.00" max="9999999999" minlength="1" 
																	maxlength="20" name="unitprice" id="unitprice${index}" value="${items.unitCost}" style="text-align: right;">
													</div>
													<div class="invalid-feedback d-block" id="invalid-unitprice${index}"></div>
												</div>
											</td>
											<td>
												<div class="totalCost text-right">${formatAmount(items.totalCost,true)}</div>
											</td>
										</tr>`;
								}else{
									html += `
											<tr class="itemTableRow">
												${readOnly?'':'<td></td>'}
												<td>
													<div class="description">
														${items.travelDescription}
													</div>
												</td>
												<td class="text-center">
													<div class="quantity">
														${items.quantity}
													</div>
												</td>
												<td>
													<div class="uom">
														${items.unitOfMeasure}
													</div>
												</td>
												<td>
													<div class="unitprice text-right">-</div>
												</td>
												<td>
													<div class="totalcost text-right">${items.unitCost || "-"}</div>
												</td>
											</tr>`;
								}
							}else{
								html += `
											<tr class="">
												${readOnly?'':'<td></td>'}
												<td>
													<div class="description">
														${items.travelDescription}
													</div>
												</td>
												<td class="text-center">
													<div class="quantity">
														${items.quantity}
													</div>
												</td>
												<td>
													<div class="uom">
														${items.unitOfMeasure}
													</div>
												</td>
												<td>
													<div class="unitprice text-right">${formatAmount(items.unitCost,true)}</div>
												</td>
												<td>
													<div class="totalcost text-right">${formatAmount(items.totalCost,true)}</div>
												</td>
											</tr>`;
							}
							checkboxTravelHeader += !readOnly? ``:``;
						});
		
						if(tableData.length < 2){
							html += `
									<tr class="itemTableRow" index="1">
										<td class="text-center">
											<div class="action">
												<input type="checkbox" class="checkboxrow" id="checkboxrow1">
											</div>
										</td>
										<td>
											<div class="description">
												<textarea
													minlength="4" 
													maxlength="500"
													rows="2" 
													style="resize: none" 
													class="form-control" 
													name="description" 
													id="description1" required></textarea>
												<div class="invalid-feedback d-block" id="invalid-description1"></div>
											</div>
										</td>
										<td class="text-center">
											<div class="quantity">
												<input 
													type="text" 
													class="form-control input-quantity text-center"
													data-allowcharacters="[0-9]" 
													min="0.00" 
													max="999999999" 
													id="travelQuantity1" 
													name="quantity" 
													value="0.00" 
													minlength="1" 
													maxlength="20" 
													required>
												<div class="invalid-feedback d-block" id="invalid-travelQuantity1"></div>
											</div>
										</td>
										<td>
											<div class="uom">
												<select
												class="form-control validate select2"
												name="travelUom"
												id="travelUom1"
												style="width: 100%"
												required
												travel="true">
													${unitOfMeasurementOptions()}
												</select>
												<div class="invalid-feedback d-block" id="invalid-travelUom1"></div>
											</div>
										</td>
										<td>
											<div class="unitprice">
												<div class="input-group">
													<div class="input-group-prepend">
														<span class="input-group-text">₱</span>
													</div>
													<input type="text" class="form-control amount" min="0.00" max="9999999999" minlength="1" 
																maxlength="20" name="unitprice" id="unitprice1" value="${formatAmount(0,true)}" style="text-align: right;">
												</div>
												<div class="invalid-feedback d-block" id="invalid-unitprice1"></div>
											</div>
										</td>
										<td>
											<div class="totalCost text-right">-</div>
										</td>
									</tr>`;
						}
						let travelButtons = !readOnly ? `<div class="text-left my-2">
															<button class="btn btn-primary btnAddRow" id="btnAddRow" travel="true" type="button"><i class="fas fa-plus-circle"></i> Add Row</button>
															<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" travel="true" type="button" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
														</div>`:``;
						setTimeout(() => {
							$(`[name=travelUom]`).select2({ theme: "bootstrap" });
							$(".travelButtons").html(travelButtons);
							travelTotal();
							initQuantity();
						}, 500);
		 			}else{
						//  5 
						html += `
								<tr class="">
									<td class="text-center" colspan="${readOnly?'5':'6'}">No matching records found</td>
								</tr>`;
					 }
				
		 }
	
		 return html;   
	 }




















	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("pms_bill_material_tbl","reviseBillMaterialID",`reviseBillMaterialID=`+id);
		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED










})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Project Budget Rationale";
	let swalText, swalImg;

	$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("hide");

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

function savebillMaterial(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `project_budget_rational/saveBillMaterial`,
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
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PBR", dateCreated, insertedID)} dropped successfully!`;
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
								});
								callback && callback();
								
								if (method == "approve" || method == "deny") {
									$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
								}

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
						if (method != "cancelform") {
							callback && callback();
						}
					} else {
						$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_bill_material").text().length > 0 && $("#modal_bill_material").modal("show");
					}
				}
			}
		});
	}
	return thisReturnData;
}

// --------------- END DATABASE RELATION ---------------