$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(43);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("equipment borrowing");
	// ----- END MODULE APPROVER -----

		
	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"ims_borrowing_tbl", 
				"reviseBorrowingID", 
				"reviseBorrowingID IS NOT NULL AND borrowingStatus != 4");
			return revisedDocumentsID.map(item => item.reviseBorrowingID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

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
		function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
			const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			//const loadData = (id, isRevise = false) => {
				const tableData = getTableData("ims_borrowing_tbl", "", "borrowingID=" + id);
				if (tableData.length > 0) {
					let {
						employeeID,
						borrowingStatus
					} = tableData[0];
	
					let isReadOnly = true, isAllowed = true;
	
					if (employeeID != sessionID) {
						isReadOnly = true;
						if (borrowingStatus == 0 || borrowingStatus == 4) {
							isAllowed = false;
						}
					} else if (employeeID == sessionID) {
						if (borrowingStatus == 0) {
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
				//console.log(view_id);
				// let id = decryptString(view_id);
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
						const isAllowed = isCreateAllowed(36);
						pageContent(isAllowed);
					}
				}
			}
			
		}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}ims/equipment_borrowing?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/equipment_borrowing?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/equipment_borrowing?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/equipment_borrowing`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    const inventoryItemList = getTableData(
		"ims_inventory_item_tbl LEFT JOIN ims_inventory_category_tbl USING(categoryID)", "itemID, itemCode, itemName, categoryName, unitOfMeasurementID",
		"itemStatus = 1");

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
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7, width: 200 },
					{ targets: 8, width: 80 },
					{ targets: 9, width: 250 },


					
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
					{ targets: 2,  width: 350 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7, width: 200 },
					{ targets: 8, width: 80 },
					{ targets: 9, width: 250 },

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
					{ targets: 0,  width: 100  },
					{ targets: 1,  width: 200 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 220  },
					{ targets: 4,  width: 190 },
					{ targets: 5,  width: 200 },
                    { targets: 6,  width: 150 },
                    { targets: 7,  width: 150 },
					{ targets: 8,  width: 100 },
					{ targets: 9,  width: 100 },
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
					{ targets: 0,  width: 200  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 200  },
					{ targets: 4,  width: 180 },
					{ targets: 5,  width: 190 },
                    { targets: 6,  width: 150 },
                    { targets: 7,  width: 150 },
					{ targets: 8,  width: 100 },
					{ targets: 9,  width: 100 },
					// { targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_borrowing_tbl", "approversID")) {
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
			if (isCreateAllowed(43)) {
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
		let borrowingData = getTableData(
			`ims_borrowing_tbl AS ieb
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN pms_project_list_tbl AS imsr ON imsr.projectListID  = ieb.projectID `,
			`ieb.borrowingID,ieb.borrowingStatus,ieb.approversDate,ieb.borrowingRemarks,ieb.borrowingReason,ieb.submittedAt,ieb.createdBy,ieb.updatedBy,ieb.createdAt,ieb.updatedAt,ieb.approversID,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ieb.createdAt AS dateCreated,imsr.projectListCode,imsr.projectListName,approversID`,
			`ieb.employeeID != ${sessionID} AND ieb.borrowingStatus != 0 AND ieb.borrowingStatus != 4`,
			`FIELD(ieb.borrowingStatus, 0, 1, 3, 2, 4), COALESCE(ieb.submittedAt, ieb.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
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

		borrowingData.map((item) => {
			let {
				fullname,
				borrowingID,
				projectListName,
				borrowingReason,
				approversID,
				approversDate,
				borrowingStatus,
				borrowingRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = borrowingRemarks ? borrowingRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = borrowingStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let btnClass = borrowingStatus != 0 ? "btnView" : "btnEdit";
			let button = borrowingStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(borrowingID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(borrowingID)}" 
				code="${getFormCode("EBF", createdAt, borrowingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, borrowingStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(borrowingID )}">
					<td>${getFormCode("EBF", createdAt, borrowingID)}</td>
					<td>${fullname}</td>
					<td>${projectListName || "-"}</td>
					<td>${borrowingReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, borrowingStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(borrowingStatus)}
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
		let borrowingData = getTableData(
			`ims_borrowing_tbl AS ieb
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN pms_project_list_tbl AS imsr ON imsr.projectListID  = ieb.projectID`,
			`ieb.borrowingID,ieb.borrowingStatus,ieb.approversDate,ieb.borrowingRemarks,ieb.borrowingReason,ieb.submittedAt,ieb.createdBy,ieb.updatedBy,ieb.createdAt,ieb.updatedAt,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, ieb.createdAt AS dateCreated,imsr.projectListCode,imsr.projectListName,approversID`,
			`ieb.employeeID = ${sessionID}`,
			`FIELD(borrowingStatus, 0, 1, 3, 2, 4), COALESCE(ieb.submittedAt, ieb.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
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

		borrowingData.map((item) => {
			let {
				fullname,
				borrowingID,
				borrowingReason,
                projectID,
				approversID,
				approversDate,
				borrowingStatus,
				borrowingRemarks,
				submittedAt,
				createdAt,
				projectListName,
			} = item;

			let remarks       = borrowingRemarks ? borrowingRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = borrowingStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let btnClass = borrowingStatus != 0 ? "btnView" : "btnEdit";
			let button = borrowingStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(borrowingID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(borrowingID)}" 
                code="${getFormCode("EBF", createdAt, borrowingID)}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(borrowingID )}">
                <td>${getFormCode("EBF", createdAt, borrowingID)}</td>
                <td>${fullname}</td>
				<td>${projectListName || "-"}</td>
				<td>${borrowingReason}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, borrowingStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(borrowingStatus)}
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
				borrowingID        = "",
				borrowingStatus    = "",
				employeeID                  = "",
				approversID                 = "",
				approversDate               = "",
				createdAt                   = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (borrowingStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button"
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						borrowingID="${encryptString(borrowingID)}"
						code="${getFormCode("EBF", createdAt, borrowingID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button"
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							borrowingID="${encryptString(borrowingID)}"
							code="${getFormCode("EBF", createdAt, borrowingID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button"
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							borrowingID="${encryptString(borrowingID)}"
							code="${getFormCode("EBF", createdAt, borrowingID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (borrowingStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button"
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							borrowingID="${encryptString(borrowingID)}"
							code="${getFormCode("EBF", createdAt, borrowingID)}"
							status="${borrowingStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (borrowingStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						borrowingID="${encryptString(borrowingID)}"
						code="${getFormCode("EBF", createdAt, borrowingID)}"
						status="${borrowingStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;	
				} else if (borrowingStatus == 3) {
					if (!isDocumentRevised(borrowingID)) {
					// DENIED - FOR REVISE
					button = `
					<button
						class="btn btn-cancel px-5 p-2"
						id="btnRevise" 
						borrowingID="${encryptString(borrowingID)}"
						code="${getFormCode("EBF", createdAt, borrowingID)}"
						status="${borrowingStatus}"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			} else if (borrowingStatus == 4) {
				// CANCELLED - FOR REVISE
				if (!isDocumentRevised(borrowingID)) {
					button = `
					<button
						class="btn btn-cancel px-5 p-2"
						id="btnRevise" 
						borrowingID="${encryptString(borrowingID)}"
						code="${getFormCode("EBF", createdAt, borrowingID)}"
						status="${borrowingStatus}"
						cancel="true"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			}	
			} else {
				if (borrowingStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							borrowingID="${encryptString(borrowingID)}"
							code="${getFormCode("EBF", createdAt, borrowingID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							borrowingID="${encryptString(borrowingID)}"
							code="${getFormCode("EBF", createdAt, borrowingID)}"><i class="fas fa-ban"></i> 
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
				class="btn btn-cancel px-5 p-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


    
    // ----- GET PROJECT LIST -----
    function getProjectList(id = null, display = true) {
		let html = `
		<option 
			value       = "0"
			projectCode = "-"
			clientCode  = "-"
			clientName  = "-"
			address     = "-"
			${id == "0" && "selected"}>N/A</option>`;
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
		//let projectElementID = [], companyElementID = [];
		let optionNone = {
			itemID:              		"0",
            inventoryStorageCode:		"-",
			inventoryStorageOfficeName:	"-",
			barcode:					"-",
            serial:              		"-",
            dateBorrowed:        		"-",
			itemCode:            		"-",
			categoryName:        		"-",
			unitOfMeasurementID: 		"-",
			itemName:            		"N/A",
		};

		
	}
	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false) {
		const attr = isProject ? `project="true"` : ``;
		let {
			itemID              		= "",
			itemName     		  		= "",
            barcode  					="",
			serialnumber				="",
			dateBorrowed				="",
            quantity      				= "",
			inventoryStorageID			="",
			inventoryCode				="",
			createdAt					="",
			inventoryStorageOfficeName	="",
			datereturn      			= "",
			quantityreturn      		= "",
			unitOfMeasurement			=""
		} = item;

		

		let html = "";
		if (readOnly) {
			html += `
			<tr class="itemTableRow">
				<td>
					<div class="barcode">
						${barcode || "-"}
					</div>
				</td>
				<td>
					<div class="itemcode">
					${getFormCode("ITM", createdAt, itemID) || "-"}
					</div>
				</td>
				<td>
					<div class="itemname">
					${itemName || "-"}
					</div>
				</td>
				<td>
				<div class="serialnumber">
					${serialnumber || "-"}
				</div>
			   </td> 
                <td>
					<div class="inventoryStorageCode">
					${getFormCode("ISM", inventoryCode, inventoryStorageID) || "-"}
					</div>
				</td>
				<td>
					<div class="inventoryStorageOfficeName">
					${inventoryStorageOfficeName || "-"}
					</div>
				</td>
               <td>
                <div class="dateBorrowed">
				${dateBorrowed && moment(dateBorrowed).format("MMMM DD, YYYY") || "-"}
                 </div>
            </td>
			 <td>
                <div class="quantity text-center">
                    ${quantity || "-"}
                </div>
               </td> 
			  <td>
			  <div class="unitOfMeasurement" name="unitOfMeasurement">
			 	 ${unitOfMeasurement || "-"}
			  </td>
			<td>
			<div class="datereturn">
				${datereturn || "-"}
			</div>
		   </td> 

				<td class="text-center">
					<div class="quantityreturn">
					${quantityreturn || "-"}
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
				<div class="">
						<input 
							type="text" 
							class="form-control  barcode text-center"
							id="barcode" 
							name="barcode" 
							minlength="17" 
							maxlength="17"
							value="${barcode}"
							itemID="${itemID}"
							itemName="${itemName}" 
							inventoryStorageID="${inventoryStorageID}"
							serialnumber="${serialnumber}"
							required>
						<div class="invalid-feedback d-block" id="invalid-barcode"></div>
					</div>
				</td>
				<td>
					<div class="itemcode">${getFormCode("ITM", createdAt, itemID) || "-"}</div>
				</td>
				<td>
					<div class="itemName">${itemName || "-"}</div>
				</td>
				<td>
					<div class="serialnumber">${serialnumber || "-"}</div>
				</td>
                <td>
					<div class="StorageCode">${getFormCode("ISM", inventoryCode, inventoryStorageID) || "-"}</div>
				</td>
                <td>
					<div class="StorageName">${inventoryStorageOfficeName || "-"}</div>
                 </td>
			<td>
			<div class="">
			<input 
					   type="button" 
					   class="form-control  daterange dateBorrowed text-center"
					   id="dateBorrowed" 
					   name="dateBorrowed"
					   value="${dateBorrowed && moment(dateBorrowed).format("MMMM DD, YYYY")}">
					   </div>
					   <div class="invalid-feedback d-block" id="invalid-dateBorrowed"></div>
			</div>
        </td>
			<td>
			<div class="">
			<input 
				type="text" 
				class="form-control  number quantity  input-quantity text-center"
				min="1" 
				data-allowcharacters="[0-9]" 
				max="999999999" 
				id="quantity" 
				name="quantity" 
				minlength="1" 
				maxlength="20"
				value="${quantity}" 
				required>
			<div class="invalid-feedback d-block" id="invalid-quantity"></div>
		</div>
		</td>
		<td>
			<div class="unitOfMeasurement" name="unitOfMeasurement">${unitOfMeasurement || "-"}</div>
		</td>
		<td>
				<div class="datereturn">${datereturn || "-"}</div>	
		</td>
				<td>
					<div class="quantityreturn">${quantityreturn || "-"}</div>	
				</td>
			</tr>`;
		}

        return html;
    }
    // ----- END GET ITEM ROW -----

	// ----- UPDATE TABLE ITEMS -----
	//var i  = [0];
	function updateTableItems() {
		$(".itemProjectTableBody tr").each(function(i) {
			var rowCount = $('.itemProjectTableBody tr').length;
			var rowcountminus = rowCount - 1;
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);
			$("td .barcode", this).attr("id", `barcode${i}`);
			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
			$("td .action .checkboxrow", this).attr("project", `true`);

			// ITEMCODE
			$("td .itemcode", this).attr("id", `itemcode${i}`);

			$("td .itemName", this).attr("id", `itemName${i}`);

			$("td .StorageCode", this).attr("id", `StorageCode${i}`);

			$("td .StorageName", this).attr("id", `StorageName${i}`);

			$("td .serialnumber", this).attr("id", `serialnumber${i}`);

			$("td .quantity", this).attr("id", `quantity${i}`);
			$("td .unitOfMeasurement", this).attr("id", `unitOfMeasurement${i}`);

			$("td .dateBorrowed", this).attr("id", `dateBorrowed${i}`);

			$("td .datereturn", this).attr("id", `datereturn${i}`);

			$("td .quantityreturn", this).attr("id", `quantityreturn${i}`);
			
			$(".dateBorrowed").each(function () {
				const id = $(this).attr("id");
				const value = $(this).val() || new Date;
				//$(`#dateBorrowed${id}`).val(moment(new Date).format("MMMM DD, YYYY"));
				initDateRangePicker(`#${id}`, {
					autoUpdateInput: false,
					singleDatePicker: true,
					showDropdowns: true,
					autoApply: true,
					locale: {
						format: "MMMM DD, YYYY",
					},
				})	
			})
			// }
			$(`#dateBorrowed${rowcountminus}`).val(moment(new Date).format("MMMM DD, YYYY"));
			//initDateRangePicker(`#dateBorrowed${i}`);

			// initDateRangePicker(`#dateBorrowed${i}`, {
			// 	autoUpdateInput: false,
			// 	singleDatePicker: true,
			// 	showDropdowns: true,
			// 	autoApply: true,
			// 	locale: {
			// 		format: "MMMM DD, YYYY",
			// 	},
			// })	

			// $(".dateBorrowed").each(function () {
			// 	const id = $(this).attr("id");
			// 	const value = $(this).val() || new Date;
			// 	//$(`#dateBorrowed${id}`).val(moment(new Date).format("MMMM DD, YYYY"));
			// 	initDateRangePicker(`#${id}`, {
			// 		autoUpdateInput: false,
			// 		singleDatePicker: true,
			// 		showDropdowns: true,
			// 		autoApply: true,
			// 		locale: {
			// 			format: "MMMM DD, YYYY",
			// 		},
			// 		minDate: moment(value)
			// 	})	
			// })
			//$(`#dateBorrowed${i}`).val(moment(new Date).format("MMMM DD, YYYY"));
			// $(`#dateBorrowed${i}`).val(moment(new Date).format("MMMM DD, YYYY"));
		
			
			//initDateRangePicker(`#datereturn${i}`);
			//$(`#dateBorrowed${i}`).data("daterangepicker").minDate = moment();
			
		})

	
	}
	// ----- END UPDATE TABLE ITEMS -----
	var barcodeArray =[];
	var barcodeLocationArray =[];
	$(document).on("keyup change", "[name=barcode]", function() {
		const barcode   = $(this).val(); 
		const barcodeID   = $(this).attr("id");
		const data = getTableData
		(`ims_stock_in_total_tbl AS isit
		LEFT JOIN ims_inventory_item_tbl 		AS iii 	ON isit.itemID = iii.itemID
		LEFT JOIN ims_inventory_storage_tbl 	AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
		LEFT JOIN ims_stock_in_tbl AS isi 				ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID`, 
		`isit.itemID,iii.createdAt,iii.itemCode,isit.itemName,iii.unitOfMeasurementID ,isit.inventoryStorageID,iis.inventoryStorageCode,iis.inventoryStorageOfficeName,isi.barcode,isi.stockInSerialNumber`, `barcode = '${barcode}'`, ``,`itemID`); 
		if(data.length != 0){
		data.map((item) => {
			let {
				itemID ,
				itemName,
				inventoryStorageCode,
				inventoryStorageOfficeName,
				stockInSerialNumber,
				createdAt,
				inventoryStorageID,
				unitOfMeasurementID,
			} = item;

			let item_ID       							= itemID ? itemID : "";
			let item_Name       						= itemName ? itemName : "";
			let inventory_Storage_Code       			= inventoryStorageCode ? inventoryStorageCode : "";
			let inventory_Storage_Office_Name       	= inventoryStorageOfficeName ? inventoryStorageOfficeName : "";
			let unit_of_measurement       				= unitOfMeasurementID ? unitOfMeasurementID : "";
			//let barcode       							= barcode ? barcode : "";
			let created_At       	= createdAt ? createdAt : "";
			let stock_In_Serial_Number       			= stockInSerialNumber ? stockInSerialNumber : "";
			let inventory_Storage_ID       			= inventoryStorageID ? inventoryStorageID : "";

	
			let	barcodeArrayLength = barcodeArray.length || 0;
			if(barcode.length  ==17){

				
				if(itemName != null){

					
					let counter =1;
					if(barcodeArrayLength !=0){
						for(var loop1 =0;loop1<barcodeArrayLength; loop1++ ){
							

							if(barcodeArray[loop1] == barcode && barcodeLocationArray[loop1] != barcodeID){
								// barcodeArray[loop1] = barcodeval;
								$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-barcode").text('Data already exists!');
								return false;
							}else{

								if(counter == barcodeArrayLength){
									barcodeArray[barcodeArrayLength -1] = barcode;
									barcodeLocationArray[barcodeArrayLength -1] = barcodeID;
								}
								
							}
							counter++;
						}
					}else{
						barcodeArray[0] = barcode;
						barcodeLocationArray[0] = barcodeID;
					}

					$(this).closest("tr").find(`.itemcode`).first().text(getFormCode("ITM",created_At,item_ID));
					$(this).closest("tr").find(`.itemName`).first().text(item_Name);
					$(this).closest("tr").find(`[name=barcode]`).first().attr("itemID",item_ID);
					$(this).closest("tr").find(`[name=barcode]`).first().attr("inventoryStorageID",inventoryStorageID);
					$(this).closest("tr").find(`[name=barcode]`).first().attr("serialnumber",stock_In_Serial_Number);
					$(this).closest("tr").find(`[name=barcode]`).first().attr("unitOfMeasurement",unit_of_measurement);
					$(this).closest("tr").find(`[name=unitOfMeasurement]`).first().text(unit_of_measurement);
					$(this).closest("tr").find(`.StorageCode`).first().text(inventory_Storage_Code);
					$(this).closest("tr").find(`.StorageName`).first().text(inventory_Storage_Office_Name);
					$(this).closest("tr").find(`.serialnumber`).first().text(stock_In_Serial_Number);
					// $(this).closest("tr").find(`[name=quantity]`).first().val(1);
	
					$(this).closest("tr").find("[name=barcode]").removeClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").removeClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").text('');
	
				}else{
					$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-barcode").text('No item available!');
				}
			}else{
				$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").text('Please Input exact 17 Characters!');
			}
			
			
			})
		}
		else if(data.length == 0){
			$(this).closest("tr").find(`.itemcode`).first().text("-");
				$(this).closest("tr").find(`[name=barcode]`).first().attr('itemID',"-");
				$(this).closest("tr").find(`[name=barcode]`).first().attr('inventoryStorageID',"-");
				$(this).closest("tr").find(`[name=barcode]`).first().attr('serialnumber',"-");
				$(this).closest("tr").find(`[name=barcode]`).first().attr('unitOfMeasurement',"-");
				$(this).closest("tr").find(`.itemName`).first().text("-");
				$(this).closest("tr").find(`[name=unitOfMeasurement]`).first().text("-");
				$(this).closest("tr").find(`.StorageCode`).first().text("-");
				$(this).closest("tr").find(`.StorageName`).first().text("-");
				$(this).closest("tr").find(`.serialnumber`).first().text("-");

				$(this).closest("tr").find("[name=barcode]").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").removeClass("is-valid").addClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").text('No item available!');
		}else{
				$(this).closest("tr").find("[name=barcode]").removeClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").removeClass("is-invalid");
				$(this).closest("tr").find("#invalid-barcode").text('');
				
		}

	})	
		
	  $(document).on("change", "[name=quantity]", function() {
		const index     		= $(this).closest("tr").first().attr("index");
		const quantity  			= parseInt($(`#quantity${index}`).val().replaceAll(",","")) || 0;
        const barcodeval  	= $(this).closest("tr").find('[name=barcode]').val();
		const data = getTableData
				 (`ims_stock_in_total_tbl AS isit
				 LEFT JOIN ims_inventory_item_tbl 		AS iii 	ON isit.itemID = iii.itemID
				 LEFT JOIN ims_inventory_storage_tbl 	AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
				 LEFT JOIN ims_stock_in_tbl AS isi 				ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID`, 
				 `isit.itemID,iii.itemCode,isit.itemName,iis.inventoryStorageCode,iis.inventoryStorageOfficeName,isi.barcode,isi.stockInSerialNumber,isit.quantity as stocks`, `barcode = '${barcodeval}'`, ``,`itemID`);
				 
				 if(data.length >0){

					data.map((item) => {
						let {
					
							stocks
						} = item;
			
					
						//let stock  = stocks ? stocks : "0";
						let stock  = stocks ? parseInt(stocks) || 0 : "0";
					
						if(barcodeval !="" ){
								if(stock > quantity || stock == quantity ){
									$(`#quantity${index}`).removeClass("is-invalid").addClass("is-valid");
									$(this).closest("tr").find("#invalid-quantity").removeClass("is-invalid").addClass("is-valid");
									$(this).closest("tr").find("#invalid-quantity").text('');
									removeIsValid("#tableProjectRequestItems");
								}else{
									$(`#quantity${index}`).removeClass("is-valid").addClass("is-invalid");
									$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
									$(this).closest("tr").find("#invalid-quantity").text('Not enough quantity!');
								}
							}else{
								$(`#quantity${index}`).removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
								$(this).closest("tr").find("#invalid-quantity").text('Not enough quantity or no stocks available!');
						}
					

						})
				}else{
					$(`#quantity${index}`).removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-quantity").removeClass("is-valid").addClass("is-invalid");
					$(this).closest("tr").find("#invalid-quantity").text('No Item Selected');
				}	
	  })





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
		
		//$(`.dateBorrowed`).val(moment(new Date).format("MMMM DD, YYYY"));
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


	// ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount(isProject = true) {
		const attr        = isProject ? "[project=true]" : "[company=true]";
		const quantityArr = $.find(`[name=quantity]${attr}`).map(element => element.value || "0");
		const unitCostArr = $.find(`#unitcost ${attr}`).map(element => element.value.replaceAll(",", "") || "0");
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
			borrowingID       		= "",
			reviseBorrowingID 		= "",
			employeeID              = "",
			projectID 				= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			borrowingReason			="",
			borrowingStatus   		= false,
			borrowingRemarks   		= false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];
		
		let requestProjectItems = "";
		if (borrowingID) {
			let requestItemsData = getTableData(
				`ims_borrowing_details_tbl 				AS ibd
				LEFT JOIN ims_borrowing_tbl 			AS ibt ON ibd.borrowingID = ibt.borrowingID
				LEFT JOIN ims_stock_in_total_tbl 		AS isn ON ibd.itemID = isn.itemID AND ibd.inventoryStorageID = isn.inventoryStorageID
				LEFT JOIN ims_inventory_storage_tbl 	AS iis ON ibd.inventoryStorageID = iis.inventoryStorageID 
				LEFT JOIN ims_inventory_item_tbl 		AS iii ON ibd.itemID = iii.itemID`, 
				`isn.itemID,isn.itemName,ibd.barcode,ibd.serialnumber,ibd.unitOfMeasurement ,ibd.dateBorrowed,ibd.quantity,ibd.borrowedPurpose,iis.inventoryStorageID,iis.createdAt AS inventoryCode,iis.inventoryStorageCode,iis.inventoryStorageOfficeName,iii.createdAt`, 
				`ibd.borrowingID = ${borrowingID}`);
			requestItemsData.map(item => {
				requestProjectItems += getItemRow(true, item, readOnly);
			})
			// requestProjectItems += getItemRow(true);
		} else {
			requestProjectItems += getItemRow(true);
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("borrowingID", encryptString(borrowingID));
		$("#btnBack").attr("status", borrowingStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let checkboxProjectHeader = !disabled ? `
		<th class="text-center">
			<div class="action">
				<input type="checkbox" class="checkboxall" project="true">
			</div>
		</th>` : ``;
	
		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
	
		let buttonProjectAddDeleteRow = !disabled ? `
		<div class="w-100 text-left my-2">
			<button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
			<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
		</div>` : "";
	
			
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? borrowingID : reviseBorrowingID;
		let documentHeaderClass = isRevise || reviseBorrowingID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseBorrowingID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseBorrowingID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("EBF", createdAt, reviseDocumentNo)}
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
							${borrowingID && !isRevise ? getFormCode("EBF", createdAt, borrowingID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${borrowingStatus && !isRevise ? getStatusStyle(borrowingStatus) : "---"}
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
								${getDateApproved(borrowingStatus, approversID, approversDate)}
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
							${borrowingRemarks && !isRevise ? borrowingRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">
		<div class="col-md-4 col-sm-12">
		<div class="form-group">
				<label>Project Code</label>
				<input type="text" class="form-control" name="projectCode" disabled value="-">
	</div>
	</div>

	<div class="col-md-8 col-sm-12">
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
					id="borrowingReason"
					name="borrowingReason"
					required
					rows="4"
					style="resize:none;"
					${disabled}>${borrowingReason ?? ""}</textarea>
				<div class="d-block invalid-feedback" id="invalid-disposalReason"></div>
			</div>
		</div>


            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Materials and Equipment Borrowing</div>
                    <table class="table table-bordered table-striped table-hover" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								${checkboxProjectHeader}
								<th>Barcode ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Item Code</th>
                                <th>Item Name </th>
								<th>Serial No.</th>
                                <th>Storage Code </th>
								<th>Storage Name</th>
                                <th>Date Borrowed ${!disabled ? "<code>*</code>" : ""}</th>
								<th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
								<th>UOM</th>
                                <th>Date Returned</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
                            ${requestProjectItems}
                        </tbody>
                    </table>
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div>${buttonProjectAddDeleteRow}</div>
						<div>
						${button}
						</div>
					</div>
                </div>
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
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");

			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				//$(".dateBorrowed").val(moment(new Date).format("MMMM DD, YYYY"));
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			//$(".dateBorrowed").data("daterangepicker").minDate = moment();

			// if(data){

			// }else{
				$(".dateBorrowed").val(moment(new Date).format("MMMM DD, YYYY"));
			// }
			// 	$(".dateBorrowed").data("daterangepicker").minDate = moment();
			
			
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
			headerButton(true, "Add Equipment Borrowing");
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


	// ----- GET PURCHASE REQUEST DATA -----
	function getBorrowingData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			data["borrowingID"] = id;
			formData.append("borrowingID", id);

			if (status != "2") {
				data["borrowingStatus"] = status;
				formData.append("borrowingStatus", status);
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
			data["projectID"]    = $("[name=projectID]").val() || null;
			data["borrowingReason"] = $("[name=borrowingReason]").val()?.trim();
			data["projectTotalAmount"]    = updateTotalAmount(true);
			data["companyTotalAmount"]    = updateTotalAmount(false);
			
			formData.append("employeeID", sessionID);
			formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("borrowingReason", $("[name=borrowingReason]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["borrowingID"] = id;
				formData.append("borrowingID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["borrowingStatus"] 		= 1;
					//data["approversStatus"]       = 1;
					//formData.append("approversStatus", 1);
					formData.append("approversID", approversID);
					formData.append("borrowingStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["borrowingStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("borrowingStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "";

				const itemID    			= $("td [name=barcode]", this).attr("itemID");
				const itemName    			= $("td [name=itemName]", this).text();	
				const inventoryStorageID 	 = $("td [name=barcode]", this).attr("inventoryStorageID");
				const serialnumber   		= $("td [name=barcode]", this).attr("serialnumber");

				const formatdate   			= $("td [name=dateBorrowed]", this).val();	
				const barcode 				= $("td [name=barcode]", this).val();	
				const quantity 				= +$("td [name=quantity]", this).val();	
				const unitofmeasurement 	= $("td [name=barcode]", this).attr("unitofmeasurement");
				//const serialnumber 	= $("td [name=serialnumber]", this).val();	
				//const borrowedquantity = formatdate.format('YYYY-MM-DD');

				const dateBorrowed = moment(formatdate).format("YYYY-MM-DD HH:mm:ss");
			

				let temp = {
					itemID, quantity
					
				};

				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemName]`, itemName);
				formData.append(`items[${i}][inventoryStorageID]`, inventoryStorageID);
				formData.append(`items[${i}][barcode]`, barcode);
				formData.append(`items[${i}][dateBorrowed]`, dateBorrowed);
				formData.append(`items[${i}][quantity]`, quantity);
				formData.append(`items[${i}][serialnumber]`, serialnumber);
				formData.append(`items[${i}][unitofmeasurement]`, unitofmeasurement);
				formData.append(`items[${i}][createdBy]`, sessionID);
				formData.append(`items[${i}][updatedBy]`, sessionID);
			

				data["items"].push(temp);
			});
		} 
		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


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
		const id = decryptString($(this).attr("borrowingID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("borrowingID"));
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("EBF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getBorrowingData(action, "save", "0", id);
				data["borrowingStatus"]   = 0;
				data["reviseBorrowingID"] = id;
				delete data["borrowingID"];
				// data.append("borrowingStatus", 0);
				// data.append("reviseborrowingID", id);
				// data.delete("borrowingID");
	
				saveReturnItem(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getBorrowingData(action, "save", "0", id);
			//data.append("borrowingStatus", 0);
			data["borrowingStatus"] = 0;

			saveReturnItem(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----
    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("borrowingID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("EBF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getBorrowingData(action, "save", "0", id);
		data.append("borrowingStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
			data.append("reviseBorrowingID", id);
			data.delete("borrowingID");
		}else{
			data.append("reviseBorrowingID", id);
			data.delete("action");
			data.append("action", "update");

		}
		}	

		saveReturnItem(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {

		//let condition = $("[name=borrowedPurpose]").hasClass("is-invalid");
		let condition2 = $("[name=barcode]").hasClass("is-invalid");

		if(!condition2){

			const id           = decryptString($(this).attr("borrowingID"));
			const revise       = $(this).attr("revise") == "true";
			const isFromCancelledDocument = $(this).attr("cancel") == "true";
			const validate     = validateForm("form_purchase_request");
			
			removeIsValid("#tableProjectRequestItems");

			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getBorrowingData(action, "submit", "1", id);
	
				if (revise) {
					if (!isFromCancelledDocument) {
					data.append("reviseBorrowingID", id);
					data.delete("borrowingID");
					}
				}
	
				let approversID = "", approversDate = "";
				for (var i of data) {
					if (i[0] == "approversID")   approversID   = i[1];
					if (i[0] == "approversDate") approversDate = i[1];
				}
	
				const employeeID = getNotificationEmployeeID(data["approversID"], data["approversDate"], true);
				console.log(employeeID);
				let notificationData = false;
				if (employeeID != sessionID) {
					notificationData = {
						moduleID:                43,
						notificationTitle:       "Borrowing Item",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
				saveReturnItem(data, "submit", notificationData, pageContent);
			}

		}else{
			$("[name=quantity]").focus();
		}
		

	
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("borrowingID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getBorrowingData(action, "cancelform", "4", id, status);

		saveReturnItem(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("borrowingID"));
		const feedback = $(this).attr("code") || getFormCode("EBF", dateToday(), id);
		let tableData  = getTableData("ims_borrowing_tbl", "", "borrowingID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getBorrowingData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                43,
					tableID:                 id,
					notificationTitle:       "Borrowing Item",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                43,
					tableID:                 id,
					notificationTitle:       "Borrowing Item",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}
			data.append("borrowingStatus", status);

			saveReturnItem(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("borrowingID"));
		const feedback = $(this).attr("code") || getFormCode("EBF", dateToday(), id);

		$("#modal_equipment_borrowing_content").html(preloader);
		$("#modal_equipment_borrowing .page-title").text("DENY EQUIPMENT BORROWING");
		$("#modal_equipment_borrowing").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="borrowingRemarks"
					name="borrowingRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-borrowingRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			borrowingID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_equipment_borrowing_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("borrowingID"));
		const feedback = $(this).attr("code") || getFormCode(" EBF", dateToday(), id);

		const validate = validateForm("modal_equipment_borrowing");
		if (validate) {
			let tableData = getTableData("ims_borrowing_tbl", "", "borrowingID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("borrowingID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("borrowingRemarks", $("[name=borrowingRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                43,
					tableID: 				 id,
					notificationTitle:       "Return Item",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveReturnItem(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	
	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const borrowingID = decryptString($(this).attr("borrowingID"));
		const feedback          = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		//const id = decryptString($(this).attr("borrowingID"));
		let data = new FormData;
		data.append("borrowingID", borrowingID);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		saveReturnItem(data, "drop", null, pageContent);
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
	const title = "EQUIPMENT BORROWING";
	let swalText, swalImg;

	$("#modal_equipment_borrowing").text().length > 0 && $("#modal_equipment_borrowing").modal("hide");

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

function saveReturnItem(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `equipment_borrowing/saveEquipmentBorrowing`,
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
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} dropped successfully!`;
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
						if (method != "cancelform") {
							callback && callback();
						}
					} else {
						$("#modal_equipment_borrowing").text().length > 0 && $("#modal_equipment_borrowing").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_equipment_borrowing").text().length > 0 && $("#modal_equipment_borrowing").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}


// --------------- END DATABASE RELATION ---------------//