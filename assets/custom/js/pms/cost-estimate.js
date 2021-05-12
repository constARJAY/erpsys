$(document).ready(function() {
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("cost estimate");
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


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false) {
		const loadData = (id, isRevise = false) => {
			const tableData = getTableData("pms_cost_estimate_tbl", "", "costEstimateID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					costEstimateStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (costEstimateStatus == 0 || costEstimateStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (costEstimateStatus == 0) {
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
			window.history.pushState("", "", `${base_url}pms/cost_estimate?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/cost_estimate?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/cost_estimate?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/cost_estimate`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, categoryName, itemDescription, unitOfMeasurementID",
		"itemStatus = 1");
	const designationList = getTableData("hris_designation_tbl JOIN hris_employee_list_tbl USING(designationID)","designationID, designationName, MAX(employeeHourlyRate) as designationRate", "designationStatus=1","","designationName");
	
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80  },
					{ targets: 9, width: 250 },
					{ targets: 10, width: 80  },
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
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7,  width: 200 },
					{ targets: 8,  width: 80  },
					{ targets: 9, width: 250 },
					{ targets: 10, width: 80  },
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
					{ targets: 0,  width: "5%"  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 50  }
				],
			});

			var table = $("#tablePersonnelRequest0")
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
					{ targets: 3,  width: 50  }
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
					{ targets: 2,  width: "10%" },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 }
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
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 150 }
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
					{ targets: 2,  width: "10%" },
					{ targets: 3,  width: 50  },
					{ targets: 4,  width: 80  },
					{ targets: 5,  width: 150 }
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
					{ targets: 3,  width: 80  },
					{ targets: 4,  width: 150 }
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
					{ targets: 2,  width: "10%" },
					{ targets: 3,  width: "10%"  }
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
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: "10%" },
					{ targets: 2,  width: "10%"  }
				],
			});


	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_cost_estimate_tbl", "approversID")) {
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
		let costEstimateData = getTableData(
			"pms_cost_estimate_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID != ${sessionID} AND costEstimateStatus != 0 AND costEstimateStatus != 4`,
			`FIELD(costEstimateStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
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

		costEstimateData.map((item) => {
			let {
				fullname,
				costEstimateID,
				projectID,
				projectListCode,
				projectListName,
				approversID,
				approversDate,
				costEstimateStatus,
				costEstimateRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = costEstimateRemarks ? costEstimateRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = costEstimateStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = costEstimateStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(costEstimateID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(costEstimateID )}" 
				code="${getFormCode("CEF", createdAt, costEstimateID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, costEstimateStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr>
					<td>${getFormCode("CEF", createdAt, costEstimateID )}</td>
					<td>${fullname}</td>
					<td>${projectListCode || '-'}</td>
					<td>${projectListName || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, costEstimateStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(costEstimateStatus)}
					</td>
					<td>${remarks}</td>
					<td class="text-center">
						${button}
					</td>
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
		let costEstimateData = getTableData(
			"pms_cost_estimate_tbl AS imrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = imrt.projectID",
			"imrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imrt.createdAt AS dateCreated, projectListCode, projectListName",
			`imrt.employeeID = ${sessionID}`,
			`FIELD(costEstimateStatus, 0, 1, 3, 2, 4), COALESCE(imrt.submittedAt, imrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
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

		costEstimateData.map((item) => {
			let {
				fullname,
				costEstimateID,
                projectID,
                projectListCode,
                projectListName,
				approversID,
				approversDate,
				costEstimateStatus,
				costEstimateRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = costEstimateRemarks ? costEstimateRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = costEstimateStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let button = costEstimateStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(costEstimateID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(costEstimateID )}" 
                code="${getFormCode("CEF", createdAt, costEstimateID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr>
                <td>${getFormCode("CEF", createdAt, costEstimateID )}</td>
                <td>${fullname}</td>
                <td>${projectListCode || '-'}</td>
                <td>${projectListName || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, costEstimateStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(costEstimateStatus)}
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
				costEstimateID     = "",
				costEstimateStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (costEstimateStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						costEstimateID="${costEstimateID}"
						code="${getFormCode("CEF", createdAt, costEstimateID)}"
						revise=${isRevise}><i class="fas fa-paper-plane"></i>
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
							costEstimateID="${costEstimateID}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (costEstimateStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							costEstimateID="${costEstimateID}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"
							status="${costEstimateStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (costEstimateStatus == 3) {
					// DENIED - FOR REVISE

					if(!isRevised(costEstimateID)){
						button = `
						<button
							class="btn btn-cancel"
							id="btnRevise" 
							costEstimateID="${encryptString(costEstimateID)}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"
							status="${costEstimateStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				}
			} else {
				if (costEstimateStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							costEstimateID="${encryptString(costEstimateID)}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							costEstimateID="${encryptString(costEstimateID)}"
							code="${getFormCode("CEF", createdAt, costEstimateID)}"><i class="fas fa-ban"></i> 
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
						// console.log("project"+id+"|"+item.itemID);
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
						// console.log("company"+id);
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
					
					$(`[name=designationID]${attr}`).each(function(i, obj) {
						itemIDArr.push($(this).val());
					}) 
					html += `<option value="none" ${id === "none" && "selected"}>None</option>`;
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
		switch(param){	
			case "project":
					html = getProjectRow(item, readOnly);
				break;
			case "company":
					html = getCompanyRow(item, readOnly);
				break;
			case "personnel":
					html = getPersonnelRow(item, readOnly);
				break;
			default:
					html = getTravelRow(item, readOnly);
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
			$("td .quantity [name=quantity]", this).attr("id", `projectQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("project", `true`);
			
			// UOM
			$("td .uom", this).attr("id", `uom${i}`);

			// FILE
			$("td .file [name=files]", this).attr("id", `projectFiles${i}`);
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
			$("td .quantity [name=quantity]", this).attr("id", `companyQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("company", `true`);
			
			// UOM
			$("td .uom", this).attr("id", `uom${i}`);
			
			// FILE
			$("td .file [name=files]", this).attr("id", `companyFiles${i}`);
		})

		$(".personnelTableBody tr").each(function(i) {
			// ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("personnel", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			// ITEMNAME
			$(this).find("select").each(function(j) {
				const itemID = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("personnel", `true`);
				$(this).attr("id", `personnelid${i}`)
				if (!$(this).attr("data-select2-id")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});

			// QUANTITY
			$("td .quantity [name=quantity]", this).attr("id", `personnelQuantity${i}`);
			$("td .quantity [name=quantity]", this).attr("personnel", `true`);
			$("td .quantity [name=quantity]", this).next().attr("id", `personnelQuantity${i}`);
			
			// TOTAL HOURS
			$("td .totalhours [name=employeeTotalHours]", this).attr("id", `employeeTotalHours${i}`);
			$("td .totalhours [name=employeeTotalHours]", this).attr("personnel", `true`);
			$("td .totalhours [name=employeeTotalHours]", this).next().attr("id", `employeeTotalHours${i}`);
		})

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
			// ITEMNAME
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
		})
	}
	// ----- END UPDATE TABLE ITEMS -----


	// ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let thisArray = ["[project=true]|projectCount","[company=true]|companyCount",
						 "[personnel=true]|personnelCount","[travel=true]|travelCount"	
						];
		thisArray.map(items=>{
			var splitItems = items.split("|");
			 splitItems[1] = 0;
			$(".checkboxrow"+splitItems[0]).each(function() {
				this.checked && splitItems[1]++;
			})
			$(".btnDeleteRow"+splitItems[0]).attr("disabled", splitItems[1] == 0);
		});
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
		// const isProject = $(this).attr("project") == "true";
		let attr;

		if($(this).attr("project") == "true"){
			attr = "[project=true]";
		}else if($(this).attr("company") == "true"){
			attr = "[company=true]";
		}else if($(this).attr("personnel") == "true"){
			attr = "[personnel=true]";
		}else{
			attr = "[travel=true]";
		}
		$(".checkboxrow"+attr).each(function(i, obj) {
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
	function formContent(data = false, readOnly = false, isRevise = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			costEstimateID       = "",
			reviseCostEstimateID = "",
			employeeID           = "",
			projectID            = "",
			costEstimateReason   = "",
			costEstimateRemarks  = "",
			approversID          = "",
			approversStatus      = "",
			approversDate        = "",
			costEstimateStatus   = false,
			submittedAt          = false,
			createdAt            = false,
		} = data && data[0];

		let requestProjectItems = "", requestCompanyItems = "", requestPersonnel="", requestTravel="";
		if (costEstimateID) {
			let requestProjectItemsData = getTableData(
				`ims_request_items_tbl LEFT JOIN ims_inventory_item_tbl USING(itemID)`, 
				`quantity, unitCost, totalCost, files, remarks, itemID, itemCode, ims_inventory_item_tbl.itemName as itemName, unitOfMeasurementID, categoryType`, 
				`costEstimateID = ${costEstimateID} AND categoryType = 'project'`);
			
			requestProjectItemsData.map(item => {
				requestProjectItems += getItemRow("project", item, readOnly);
			})

			let requestCompanyItemsData = getTableData(
				`ims_request_items_tbl LEFT JOIN ims_inventory_item_tbl USING(itemID)`, 
				`quantity, unitCost, totalCost, files, remarks, itemID, itemCode, ims_inventory_item_tbl.itemName as itemName, unitOfMeasurementID, categoryType`, 
				`costEstimateID = '${costEstimateID}' AND categoryType = 'company' `);
			
			requestCompanyItemsData.map(item => {
				requestCompanyItems += getItemRow("company", item, readOnly);
			})

			let requestDesignationData = getTableData(`hris_designation_tbl JOIN hris_personnel_request_tbl USING(designationID)`,
										`hris_personnel_request_tbl.designationID AS designationID ,hris_designation_tbl.designationName AS designationName,designationTotalHours,quantity`,`costEstimateID = ${costEstimateID}`);
			if(requestDesignationData.length < 1){
				requestPersonnel 	+= getItemRow("personnel",requestDesignationData[0],readOnly);
			}
			requestDesignationData.map(item => {
				requestPersonnel += getItemRow("personnel", item, readOnly);
			});

			let requestTravelData = getTableData(`ims_travel_request_tbl`,
										`travelDescription,unitOfMeasure,quantity`,
										`costEstimateID = ${costEstimateID}`)
			requestTravelData.map(item => {
				requestTravel += getItemRow("travel", item, readOnly);
			})
		} else {
			requestProjectItems += getItemRow("project");
			requestCompanyItems += getItemRow("company");
			requestPersonnel 	+= getItemRow("personnel");
			requestTravel 		+= getItemRow("travel");
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("costEstimateID", costEstimateID);
		$("#btnBack").attr("status", costEstimateStatus);
		$("#btnBack").attr("employeeID", employeeID);

		let disabled = readOnly ? "disabled" : "";
		let checkboxPersonnelHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" personnel="true">
			</div>
		</th>` : ``;
		let checkboxProjectHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" project="true">
			</div>
		</th>` : ``;
		let checkboxCompanyHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" company="true">
			</div>
		</th>` : ``;
		let checkboxTravelHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" travel="true">
			</div>
		</th>` : ``;

		let tablePersonnelRequestName 	 = !disabled ? "tablePersonnelRequest" 	  : "tablePersonnelRequest0";
		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		let tableCompanyRequestItemsName = !disabled ? "tableCompanyRequestItems" : "tableCompanyRequestItems0";
		let tableTravelRequestName		 = !disabled ? "tableTravelRequest" 	  : "tableTravelRequest0";
		let buttonPersonnelAddDeleteRow =  !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" personnel="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" personnel="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		
		let buttonProjectAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		let buttonCompanyAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" company="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" company="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
		let buttonTravelAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" travel="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" travel="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";



		let button = formButtons(data, isRevise);

		let reviseDocumentNo    = isRevise ? costEstimateID : reviseCostEstimateID;
		let documentHeaderClass = isRevise || reviseCostEstimateID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseCostEstimateID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseCostEstimateID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("CEF", createdAt, reviseDocumentNo)}
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
							${costEstimateID && !isRevise ? getFormCode("CEF", createdAt, costEstimateID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${costEstimateStatus && !isRevise ? getStatusStyle(costEstimateStatus) : "---"}
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
								${getDateApproved(costEstimateStatus, approversID, approversDate)}
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
							${costEstimateRemarks && !isRevise ? costEstimateRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_cost_estimate">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" class="form-control" name="projectCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                        name="projectID"
                        id="projectID"
                        style="width: 100%"
                        required
						${disabled}>
                        <option selected disabled>Select Project Name</option>
                        ${getProjectList(projectID)}
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-projectID"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Code</label>
                    <input type="text" class="form-control" name="clientCode" disabled value="-">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" class="form-control" name="clientName" disabled value="-">
                </div>
            </div>
            <div class="col-md-8 col-sm-12">
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
                        id="costEstimateReason"
                        name="costEstimateReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${costEstimateReason ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-costEstimateReason"></div>
                </div>
            </div>

            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Personnel And Laborers</div>
                    <table class="table table-striped" id="${tablePersonnelRequestName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxPersonnelHeader}
								<th>Designation Code</th>
                                <th>Designation ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Total Hours ${!disabled ? "<code>*</code>" : ""}</th>
                            </tr>
                        </thead>
                        <tbody class="personnelTableBody" personnel="true">
                            ${requestPersonnel}
                        </tbody>
                    </table>
                    
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonPersonnelAddDeleteRow}</div>
					</div>
                </div>
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
                                <th>UOM</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
                            ${requestProjectItems}
                        </tbody>
                    </table>
                    
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonProjectAddDeleteRow}</div>
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
                                <th>UOM</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody class="itemCompanyTableBody" company="true">
                            ${requestCompanyItems}
                        </tbody>
                    </table>
                    
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonCompanyAddDeleteRow}</div>
					</div>
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
                            </tr>
                        </thead>
                        <tbody class="travelTableBody" travel="true">
                            ${requestTravel}
                        </tbody>
                    </table>
                    
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonTravelAddDeleteRow}</div>
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
			initAmount();
			updateInventoryItemOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
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

			headerButton(true, "Add Cost Estimate");
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


	// ----- GET Cost Estimate DATA -----
	function getcostEstimateData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		if (id) {
			data["costEstimateID"] = id;
			formData.append("costEstimateID", id);

			if (status != "2") {
				data["costEstimateStatus"] = status;
				formData.append("costEstimateStatus", status);
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
			data["projectID"]             = $("[name=projectID]").val() || null;
			data["costEstimateReason"] 	  = $("[name=costEstimateReason]").val()?.trim();
			
			formData.append("employeeID", sessionID);
			formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("costEstimateReason", $("[name=costEstimateReason]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["costEstimateID"] = id;
				formData.append("costEstimateID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["costEstimateStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("costEstimateStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["costEstimateStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("costEstimateStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				var  categoryType,itemID,itemName, itemDescription, itemUom, designationID,designationName,travelDescription,designationTotalHours, travelUom;
				var fileID, file, fileArr, filename ;
				if($(this).closest("tbody").attr("project") == "true"){
					categoryType 	= "project";
					itemID    	 	= $("td [name=itemID]", this).val();
					var inventoryItemListArray = inventoryItemList.filter(items=> items.itemID == itemID);
					itemName	 	= inventoryItemListArray.length > 0 ? inventoryItemListArray[0].itemName : null;
					itemDescription = inventoryItemListArray.length > 0 ?inventoryItemListArray[0].itemDescription : null;
					itemUom			= inventoryItemListArray.length > 0 ?inventoryItemListArray[0].unitOfMeasurementID :null;
					fileID    		= $("td [name=files]", this).attr("id");
					file      		= $(`#${fileID}`)[0].files[0];
					fileArr   		= file?.name.split(".");
					filename  		= file ? file?.name : "";
				}else if($(this).closest("tbody").attr("company") == "true"){
					categoryType 	= "company";
					itemID     	 	= $("td [name=itemID]", this).val();
					var inventoryItemListArray = inventoryItemList.filter(items=> items.itemID == itemID);
					itemName	 	= inventoryItemListArray.length > 0 ? inventoryItemListArray[0].itemName : null;
					itemDescription = inventoryItemListArray.length > 0 ?inventoryItemListArray[0].itemDescription : null;
					itemUom			= inventoryItemListArray.length > 0 ?inventoryItemListArray[0].unitOfMeasurementID :null;
					fileID    	 	= $("td [name=files]", this).attr("id");
					file      	 	= $(`#${fileID}`)[0].files[0];
					fileArr   	 	= file?.name.split(".");
					filename  		= file ? file?.name : "";
				}else{
						if($(this).closest("tbody").attr("personnel") == "true"){
							designationID 			= designationID ? $("td [name=designationID]", this).val() : 0;
							console.log(designationID);
							var designationListData = designationID ? designationList.filter(items=> items.designationID == designationID) : "";
							designationName 		= designationID ? designationListData[0].designationName : "-";
							designationTotalHours	= $("td [name=employeeTotalHours]", this).val();
						}else{
							travelDescription = $("td [name=description]", this).val();
							travelUom 		  = $("td [name=travelUom]", this).val();
						}
				}
				const quantity  = +$("td [name=quantity]", this).val();	
				let temp = {
					itemID, itemName, itemDescription,itemUom,quantity, filename, categoryType,categoryType,
					designationID,designationName,travelDescription,designationTotalHours, travelUom,
				};
				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemName]`, itemName);
				formData.append(`items[${i}][itemDescription]`, itemDescription);
				formData.append(`items[${i}][itemUom]`, itemUom);
				formData.append(`items[${i}][designationID]`, designationID);
				formData.append(`items[${i}][designationName]`, designationName);
				formData.append(`items[${i}][designationTotalHours]`, designationTotalHours);
				formData.append(`items[${i}][travelDescription]`, travelDescription);
				formData.append(`items[${i}][travelUnitOfMeasure]`, travelUom);
				formData.append(`items[${i}][categoryType]`, categoryType);
				formData.append(`items[${i}][quantity]`, quantity);
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
	// ----- END GET Cost Estimate DATA -----


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
		const id = $(this).attr("costEstimateID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("costEstimateID");
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("CEF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getcostEstimateData(action, "save", "0", id);
				data.append("costEstimateStatus", 0);
				data.append("reviseCostEstimateID", id);
				data.delete("costEstimateID");
	
				savecostEstimate(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getcostEstimateData(action, "save", "0", id);
			data.append("costEstimateStatus", 0);

			savecostEstimate(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = $(this).attr("costEstimateID");
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);
		const action   = revise && "insert" || (id && feedback ? "update" : "insert");
		const data     = getcostEstimateData(action, "save", "0", id);
		data.append("costEstimateStatus", 0);

		if (revise) {
			data.append("reviseCostEstimateID", id);
			data.delete("costEstimateID");
		}

		savecostEstimate(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           = $(this).attr("costEstimateID");
		const revise       = $(this).attr("revise") == "true";
		const validate     = validateForm("form_cost_estimate");

		if (validate) {
			const action = revise && "insert" || (id ? "update" : "insert");
			const data   = getcostEstimateData(action, "submit", "1", id);

			if (revise) {
				data.append("reviseCostEstimateID", id);
				data.delete("costEstimateID");
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
					moduleID:                38,
					notificationTitle:       "Cost Estimate",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}
			savecostEstimate(data, "submit", notificationData, pageContent);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("costEstimateID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getcostEstimateData(action, "cancelform", "4", id, status);

		savecostEstimate(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("costEstimateID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("pms_cost_estimate_tbl", "", "costEstimateID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let costEstimateID  = tableData[0].costEstimateID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getcostEstimateData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                38,
					tableID:                 id,
					notificationTitle:       "Cost Estimate",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				thisCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                38,
					tableID:                 id,
					notificationTitle:       "Cost Estimate",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("costEstimateStatus", status);
			savecostEstimate(data, "approve", notificationData, pageContent, costEstimateID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("costEstimateID");
		const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

		$("#modal_cost_estimate_content").html(preloader);
		$("#modal_cost_estimate .page-title").text("DENY COST ESTIMATE");
		$("#modal_cost_estimate").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="costEstimateRemarks"
					name="costEstimateRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-costEstimateRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			costEstimateID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_cost_estimate_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("costEstimateID"));
		const feedback = $(this).attr("code") || getFormCode("CEF", dateToday(), id);

		const validate = validateForm("modal_cost_estimate");
		if (validate) {
			let tableData = getTableData("pms_cost_estimate_tbl", "", "costEstimateID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("costEstimateID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("costEstimateRemarks", $("[name=costEstimateRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                38,
					tableID: 				 id,
					notificationTitle:       "Cost Estimate",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savecostEstimate(data, "deny", notificationData, pageContent);
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


	function getProjectRow(data, readOnly = false){
		let html = "";
		let {
			itemCode     = "",
			itemName     = "",
			itemID       = "",
			quantity     = "",
			unitOfMeasurementID: uom = "",
			files        = ""
		} = data;
		if (readOnly) {
			const itemFIle = files ? `<a href="${base_url+"assets/upload-files/request-items/"+files}" target="_blank">${files}</a>` : `-`;
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="itemcode">
						${itemCode || "-"}
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
					<div class="uom">
						${uom || "-"}
					</div>
				</td>
				<td>
					<div class="file">
						${itemFIle}
					</div>
				</td>
			</tr>`;
		} else {
			const itemFile = files ? `
			<div class="d-flex justify-content-between align-items-center py-2">
				<a class="filename"
				   href="${base_url+"assets/upload-files/request-items/"+files}" 
				   target="_blank">
				   ${files}
				</a>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>` : "";
			html += `
			<tr class="itemTableRow">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
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
								style="width: 400px"
								required
								project="true">
								${getInventoryItem(itemID, "project")}
							</select>
							<div class="invalid-feedback d-block" id="invalid-itemID"></div>
						</div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control text-center amount"
							data-allowcharacters="[0-9][.]" 
							max="999999999" 
							id="projectQuantity" 
							name="quantity" 
							value="${quantity}"
							min="0.00" 
							minlength="1" 
							maxlength="20">
						<div class="invalid-feedback d-block" id="invalid-projectQuantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">-</div>
				</td>
				<td>
					<div class="file">
						<div class="displayfile">
							${itemFile}
						</div>
						<input 
							type="file" 
							class="form-control" 
							name="files" 
							id="projectFiles"
							accept="image/*, .pdf, .doc, .docx">
						<div class="invalid-feedback d-block" id="invalid-projectFiles"></div>
					</div>
				</td>
			</tr>`;
		}
		return html;

	}

	function getCompanyRow(data = {}, readOnly = false){
		let html = "";
		let {
			itemCode     = "",
			itemName     = "",
			itemID       = "",
			quantity     = "",
			unitOfMeasurementID: uom = "",
			files        = ""
		} = data;
		if (readOnly) {
			const itemFIle = files ? `<a href="${base_url+"assets/upload-files/request-items/"+files}" target="_blank">${files}</a>` : `-`;
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="itemcode">
						${itemCode}
					</div>
				</td>
				<td>
					<div class="itemname">
						${itemName}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity}
					</div>
				</td>
				<td>
					<div class="uom">
						${uom}
					</div>
				</td>
				<td>
					<div class="file">
						${itemFIle}
					</div>
				</td>
			</tr>`;
		} else {
			const itemFile = files ? `
			<div class="d-flex justify-content-between align-items-center py-2">
				<a class="filename"
				   href="${base_url+"assets/upload-files/request-items/"+files}" 
				   target="_blank">
				   ${files}
				</a>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>` : "";
			html += `
			<tr class="itemTableRow">
				<td class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxrow">
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
								style="width: 400px"
								required
								company="true">
								${getInventoryItem(itemID, "company")}
							</select>
							<div class="invalid-feedback d-block" id="invalid-itemID"></div>
						</div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control text-center amount"
							data-allowcharacters="[0-9][.]" 
							min="0.00"
							max="999999999" 
							id="companyQuantity" 
							name="quantity" 
							value="${quantity}" 
							minlength="1" 
							maxlength="20" required>
						<div class="invalid-feedback d-block" id="invalid-companyQuantity"></div>
					</div>
				</td>
				<td>
					<div class="uom">-</div>
				</td>
				<td>
					<div class="file">
						<div class="displayfile">
							${itemFile}
						</div>
						<input 
							type="file" 
							class="form-control" 
							name="files" 
							id="companyFiles"
							accept="image/*, .pdf, .doc, .docx">
						<div class="invalid-feedback d-block" id="invalid-companyFiles"></div>
					</div>
				</td>
			</tr>`;
		}
		return html;
	}

	function getPersonnelRow(data={}, readOnly = false){
		console.log(readOnly);
		let html = "";
		let {
			designationID   = null,
			designationName = "",
			quantity     	= "",
			designationTotalHours = ""
		} = data;
		if (readOnly) {
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="itemcode">
						${designationID > 1 ? getFormCode("DSN",moment(),designationID) : "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
						${designationName || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						${quantity || "-"}
					</div>
				</td>
				<td class="text-center">
					<div class="totalhours">
						${designationTotalHours || "-"}
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
					<div class="designationcode">${!designationID ? "-" : getFormCode("DSN",moment(),designationID) }</div>
				</td>
				<td>
					<div class="designationname">
						<div class="form-group mb-0">
							<select
								class="form-control validate select2"
								name="designationID"
								id="designationID"
								style="width: 100%"
								required
								personnel="true">
								${getInventoryItem(designationID, "personnel")}
							</select>
							<div class="invalid-feedback d-block" id="invalid-designationID"></div>
						</div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control text-center amount"
							data-allowcharacters="[0-9][.]" 
							min="0.00"
							max="999999999" 
							id="personnelQuantity" 
							name="quantity" 
							value="${quantity}"
							minlength="1" 
							maxlength="20" required>
						<div class="invalid-feedback d-block" id="invalid-personnelQuantity"></div>
					</div>
				</td>
				<td class="text-center">
					<div class="totalhours">
						<input
							type="text" 
							class="form-control validate text-center" 
							data-allowcharacters="[0-9][.]"
							min="0.0" 
							max="999999999" 
							id="employeeTotalHours" 
							name="employeeTotalHours" 
							placeholder="0.0"
							value="${designationTotalHours}" 
							minlength="1" 
							maxlength="5">
						<div class="invalid-feedback d-block" id="invalid-employeeTotalHours"></div>
					</div>
				</td>
			</tr>`;
		}
		return html;
	}

	function getTravelRow(data={}, readOnly=false){
		let html = "";
		let {
			travelDescription 	= "",
			quantity     		= "",
			unitOfMeasure 		= "",
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
						${unitOfMeasure || "-"}
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
							class="form-control validate" 
							data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
							name="description" 
							id="description" required>${travelDescription || ""}</textarea>
						<div class="invalid-feedback d-block" id="invalid-description"></div>
					</div>
				</td>
				<td class="text-center">
					<div class="quantity">
						<input 
							type="text" 
							class="form-control text-center amount"
							data-allowcharacters="[0-9][.]" 
							max="999999999" 
							id="travelQuantity" 
							name="quantity" 
							value="${quantity}"
							min="0.00" 
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
							${unitOfMeasurementOptions(unitOfMeasure)}
						</select>
						<div class="invalid-feedback d-block" id="invalid-travelUom"></div>
					</div>
				</td>
			</tr>`;
		}
		return html;
	}

	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("pms_cost_estimate_tbl","reviseCostEstimateID",`reviseCostEstimateID=`+id);
		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED







})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Cost Estimate";
	let swalText, swalImg;

	$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("hide");

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

function savecostEstimate(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `cost_estimate/savecostEstimate`,
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
							swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("CEF", dateCreated, insertedID)} denied successfully!`;
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
									// if(lastApproverID != 0){
									// 	$.ajax({
									// 		method: "POST",
									// 		url: `${base_url}pms/cost_estimate/saveCanvassingData`,
									// 		data:{"costEstimateID":lastApproverID},
									// 		dataType: "json",
									// 		async: false,
									// 		success: function (data) {
									// 			console.log("tangina mo ka");
									// 		},
									// 	});
									// }
									



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
					if(method != "submit"){
						if (method != "deny") {
							callback && callback();
						} else {
							$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("show");
						}
					}
							
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("show");
					}
				}
			}
		});
	}
	return thisReturnData;
}

// --------------- END DATABASE RELATION ---------------