$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(35);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("return item");
	// ----- END MODULE APPROVER -----

	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"ims_return_item_tbl", 
				"reviseReturnItemID", 
				"reviseReturnItemID IS NOT NULL AND returnItemStatus != 4");
			return revisedDocumentsID.map(item => item.reviseReturnItemID).includes(id);
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
			const tableData = getTableData("ims_return_item_tbl", "", "returnItemID=" + id);
			if (tableData.length > 0) {
				let {
					employeeID,
					returnItemStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (returnItemStatus == 0 || returnItemStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (returnItemStatus == 0) {
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
			window.history.pushState("", "", `${base_url}ims/return_item?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}ims/return_item?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}ims/return_item?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}ims/return_item`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

    const borrowingItemList = getTableData(
		`ims_borrowing_tbl AS ib
		LEFT JOIN ims_borrowing_details_tbl AS ibd ON ibd.borrowingID = ib.borrowingID`, `ib.borrowingID,ib.createdAt`,
		"borrowingStatus = 2");

    // const projectList = getTableData(
    //     "pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pct.clientID = pplt.projectListClientID", 
    //     "projectListID, projectListCode, projectListName, clientCode, clientName, clientRegion, clientProvince, clientCity, clientBarangay, clientUnitNumber, clientHouseNumber, clientCountry, clientPostalCode",
    //     "projectListStatus = 1");
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
					{ targets: 2,  width: 250 },
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7, width: 200 },
					{ targets: 8, width: 250 },
					{ targets: 9, width: 80 },
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
					{ targets: 2,  width: 250 },
					{ targets: 3,  width: 350 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 200 },
					{ targets: 6,  width: 200 },
					{ targets: 7, width: 200 },
					{ targets: 8, width: 250 },
					{ targets: 9, width: 80 },
					{ targets: 10, width: 250 },
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
					{ targets: 0,  width: 190  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 200  },
					{ targets: 4,  width: 170 },
                    { targets: 5,  width: 200 },
                    { targets: 6,  width: 80 },
                    { targets: 7,  width: 80 },
					{ targets: 8,  width: 120 },
					{ targets: 9,  width: 120 },
					{ targets: 10,  width: 120 },
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
					{ targets: 0,  width: 190  },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 200  },
					{ targets: 4,  width: 170 },
                    { targets: 5,  width: 200 },
                    { targets: 6,  width: 80 },
                    { targets: 7,  width: 80 },
					{ targets: 8,  width: 120 },
					{ targets: 9,  width: 120 },
					{ targets: 10,  width: 120 },
					// { targets: 8,  width: 200 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("ims_return_item_tbl", "approversID")) {
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
			if (isCreateAllowed(35)) {
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
		let transferRequestData = getTableData(
			`ims_return_item_tbl AS imtrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN pms_project_list_tbl AS imsr ON imsr.projectListID  = imtrt.projectID 
			LEFT JOIN ims_borrowing_tbl AS ib ON imtrt.borrowingID = ib.borrowingID`,
			"imtrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imtrt.createdAt AS dateCreated,imsr.projectListCode,imsr.projectListName,ib.createdAt as createdAtborrowing",
			`imtrt.employeeID != ${sessionID} AND returnItemStatus != 0 AND returnItemStatus != 4`,
			`FIELD(returnItemStatus, 0, 1, 3, 2, 4), COALESCE(imtrt.submittedAt, imtrt.createdAt)`
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

		transferRequestData.map((item) => {
			let {
				fullname,
				returnItemID,
				returnItemReason,
				projectID,
				projectListCode,
				projectListName,
			
				approversID,
				approversDate,
				returnItemStatus,
				transferRequestRemarks,
				submittedAt,
				createdAt,
				borrowingID,
				createdAtborrowing,
			} = item;

			let remarks       = transferRequestRemarks ? transferRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = returnItemStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let btnClass = returnItemStatus != 0 ? "btnView" : "btnEdit";
			let button = returnItemStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(returnItemID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(returnItemID )}" 
				code="${getFormCode("RI", createdAt, returnItemID )}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, returnItemStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(returnItemID )}">
					<td>${getFormCode("RI", createdAt, returnItemID )}</td>
					<td>${fullname}</td>
					<td>${getFormCode("EBF", createdAtborrowing, borrowingID )}</td>
					<td>${projectListName}</td>
					<td>${returnItemReason}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, returnItemStatus, true))}
					</td>
					<td>${dateCreated}</td>
					<td>${dateSubmitted}</td>
					<td>${dateApproved}</td>
					<td class="text-center">
						${getStatusStyle(returnItemStatus)}
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

	function getBorroiwngList(id = null, clientID = 0, display = true) {
		let html ='';
        html += borrowingItemList.map(borrowing => {
            
            return `
            <option 
                value       = "${borrowing.borrowingID}" 
                ${borrowing.borrowingID == id && "selected"}>
                ${getFormCode("EBF",moment(borrowing.createdAt),borrowing.borrowingID)}
            </option>`;
			
        })
        return display ? html : borrowingItemList;
    }

	// ----- SELECT PROJECT LIST -----
    $(document).on("change", "[name=borrowingID]", function() {
        //const vendorname = $('option:selected', this).attr("vendorname");
        const id 					= $(this).val();
        const inventoryborrowingid 	= $(this).attr("inventoryborrowingid");
		var readOnly			= $(this).attr("disabled");
		if(readOnly =="disabled"){
			readOnly = true;
		}else{
			readOnly = false;
		}
        //$("[name=vendorName]").val(vendorname);

        $(".itemProjectTableBody").html('<tr><td colspan="8">'+preloader+'</td></tr>');

        let itemProjectTableBody = getBorrowedRow(id,readOnly,inventoryborrowingid);
        setTimeout(() => {
			$(".itemProjectTableBody").html(itemProjectTableBody);

			// initDateRangePicker(".returnItemDate", {
			// 	autoUpdateInput: false,
			// 	singleDatePicker: true,
			// 	showDropdowns: true,
			// 	autoApply: true,
			// 	locale: {
			// 		format: "MMMM DD, YYYY",
			// 	},
			
			// })
			datevalidated();
		
			// initDataTables();
			// initAll();
			initQuantity();
		}, 300);
    })
    // ----- END SELECT PROJECT LIST -----

    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let transferRequestData = getTableData(
			`ims_return_item_tbl AS imtrt 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
			LEFT JOIN pms_project_list_tbl AS imsr ON imsr.projectListID  = imtrt.projectID
			LEFT JOIN ims_borrowing_tbl AS ib ON imtrt.borrowingID = ib.borrowingID`,
			"imtrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, imtrt.createdAt AS dateCreated,imsr.projectListCode,imsr.projectListName,ib.createdAt as createdAtborrowing",
			`imtrt.employeeID = ${sessionID}`,
			`FIELD(returnItemStatus, 0, 1, 3, 2, 4, 5), COALESCE(imtrt.submittedAt, imtrt.createdAt)`
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

		transferRequestData.map((item) => {
			let {
				fullname,
				returnItemID,
                projectID,
				returnItemReason,
				approversID,
				approversDate,
				returnItemStatus,
				transferRequestRemarks,
				submittedAt,
				createdAt,
				borrowingID,
				createdAtborrowing,
				projectListName,

			} = item;

			let remarks       = transferRequestRemarks ? transferRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = returnItemStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
			let btnClass = returnItemStatus != 0 ? "btnView" : "btnEdit";
			let button = returnItemStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(returnItemID )}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(returnItemID )}" 
                code="${getFormCode("RI", createdAt, returnItemID )}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(returnItemID )}">
                <td>${getFormCode("RI", createdAt, returnItemID )}</td>
                <td>${fullname}</td>
				<td>${getFormCode("EBF", createdAtborrowing, borrowingID )}</td>
				<td>${projectListName}</td>
               <td>${returnItemReason}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, returnItemStatus, true))}
                </td>
				<td>${dateCreated}</td>
				<td>${dateSubmitted}</td>
				<td>${dateApproved}</td>
                <td class="text-center">
                    ${getStatusStyle(returnItemStatus)}
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
				returnItemID     = "",
				returnItemStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (returnItemStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						returnItemID="${encryptString(returnItemID)}"
						code="${getFormCode("RI", createdAt, returnItemID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							returnItemID="${encryptString(returnItemID)}"
							code="${getFormCode("RI", createdAt, returnItemID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							returnItemID="${encryptString(returnItemID)}"
							code="${getFormCode("RI", createdAt, returnItemID)}"
							revise="${isRevise}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (returnItemStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							returnItemID="${encryptString(returnItemID)}"
							code="${getFormCode("RI", createdAt, returnItemID)}"
							status="${returnItemStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (returnItemStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						returnItemID="${encryptString(returnItemID)}"
						code="${getFormCode("RI", createdAt, returnItemID)}"
						status="${returnItemStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (returnItemStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(returnItemID)) {
					button = `
					<button
						class="btn btn-cancel px-5 p-2"
						id="btnRevise" 
						returnItemID="${encryptString(returnItemID)}"
						code="${getFormCode("RI", createdAt, returnItemID)}"
						status="${returnItemStatus}"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			} else if (returnItemStatus == 4) {
				// CANCELLED - FOR REVISE
				if (!isDocumentRevised(returnItemID)) {
					button = `
					<button
						class="btn btn-cancel px-5 p-2"
						id="btnRevise" 
						returnItemID="${encryptString(returnItemID)}"
						code="${getFormCode("RI", createdAt, returnItemID)}"
						status="${returnItemStatus}"
						cancel="true"><i class="fas fa-clone"></i>
						Revise
					</button>`;
				}
			}		
			} else {
				if (returnItemStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							returnItemID="${encryptString(returnItemID)}"
							code="${getFormCode("RI", createdAt, returnItemID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							returnItemID="${encryptString(returnItemID)}"
							code="${getFormCode("RI", createdAt, returnItemID)}"><i class="fas fa-ban"></i> 
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
    // function getProjectList(id = null, display = true) {
	// 	let html = `
	// 	<option 
	// 		value       = "0"
	// 		projectCode = "-"
	// 		clientCode  = "-"
	// 		clientName  = "-"
	// 		address     = "-"
	// 		${id == "0" && "selected"}>N/A</option>`;
    //     html += projectList.map(project => {
	// 		let address = `${project.clientUnitNumber && titleCase(project.clientUnitNumber)+", "}${project.clientHouseNumber && project.clientHouseNumber +", "}${project.clientBarangay && titleCase(project.clientBarangay)+", "}${project.clientCity && titleCase(project.clientCity)+", "}${project.clientProvince && titleCase(project.clientProvince)+", "}${project.clientCountry && titleCase(project.clientCountry)+", "}${project.clientPostalCode && titleCase(project.clientPostalCode)}`;

    //         return `
    //         <option 
    //             value       = "${project.projectListID}" 
    //             projectCode = "${project.projectListCode}"
    //             clientCode  = "${project.clientCode}"
    //             clientName  = "${project.clientName}"
	// 			address     = "${address}"
    //             ${project.projectListID == id && "selected"}>
    //             ${project.projectListName}
    //         </option>`;
    //     })
    //     return display ? html : projectList;
    // }
    // ----- END GET PROJECT LIST -----

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		let optionNone = {
			itemID:              "0",
            model:              "-",
            serial:              "-",
            purpose:              "-",
            dateBorrowed:         "-",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A",
		};

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = [optionNone, ...inventoryItemList];
			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value        = "${item.itemID}" 
					itemCode     = "${item.itemCode}"
                    model        = ""
                    serial        = ""
                    purpose        = ""
                    dateBorrowed = ""
					categoryName = "${item.categoryName}"
					uom          = "${item.unitOfMeasurementID}"
					${item.itemID == projectItemIDArr[index] && "selected"}>
					${item.itemName}
				</option>`;
			})
			$(element).html(html);
		});
	}

	// ----- END UPDATE INVENTORYT NAME -----


    // ----- GET INVENTORY ITEM -----
    function getInventoryItem(id = null, isProject = true, display = true) {
        let html   = `<option selected disabled>Select Item Name</option>`;
		const attr = isProject ? "[project=true]" : "";

		let itemIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=itemID]${attr}`).each(function(i, obj) {
			itemIDArr.push($(this).val());
		}) 

		let optionNone = {
			itemID:              "0",
            model:               "-",
            serial:               "-",
            purpose:               "-",
            dateBorrowed:           "-",
			itemCode:            "-",
			categoryName:        "-",
			unitOfMeasurementID: "-",
			itemName:            "N/A",

		};
		let itemList = [optionNone, ...inventoryItemList];

		html += itemList.filter(item => !itemIDArr.includes(item.itemID) || item.itemID == id).map(item => {
            return `
            <option 
                value        = "${item.itemID}" 
                model        = ""
                serial      = ""
                purpose      = ""
                dateBorrowed     = ""
                itemCode     = "${item.itemCode}"
                categoryName = "${item.categoryName}"
                uom          = "${item.unitOfMeasurementID}"
                ${item.itemID == id && "selected"}>
                ${item.itemName}
            </option>`;
        })
		
        return display ? html : inventoryItemList;
    }
    // ----- END GET INVENTORY ITEM -----


	// ----- GET ITEM ROW -----
	function getBorrowedRow(id, readOnly = false,inventoryborrowingid = "") {
	
		let html = "";
		if(inventoryborrowingid != ""){
			id = `${id}`;
		}
		//alert(inventoryborrowingid);
		datevalidated();
		let BorrowingData = getTableData(`ims_borrowing_details_tbl AS ibd
		LEFT JOIN ims_borrowing_tbl 								AS  ib 	ON ibd.borrowingID = ib.borrowingID
		LEFT JOIN ims_inventory_item_tbl 							AS iii 	ON iii.itemID = ibd.itemID
		LEFT JOIN pms_project_list_tbl 								AS pplt ON ib.projectID = pplt.projectListID
		LEFT JOIN pms_client_tbl									AS pct ON pct.clientID = pplt.projectListClientID
		LEFT JOIN ims_inventory_storage_tbl 						AS iis 	ON ibd.inventoryStorageID = iis.inventoryStorageID
		LEFT JOIN ims_return_item_details_tbl						AS irid ON ibd.borrowingDetailID =irid.borrowingDetailID `,
		`concat('ITM-',LEFT(iii.createdAt,2),'-',LPAD(iii.itemID,5,'0')) AS itemCode,iii.itemName,
		concat('ISM-',LEFT(iis.createdAt,2),'-',LPAD(iis.inventoryStorageID,5,'0')) AS inventoryCode,iis.inventoryStorageOfficeName,
		IFNULL(irid.returnItemQuantity,'0') AS returnItemQuantity,IFNULL(irid.returnItemDate,'') AS returnItemDate,ibd.borrowingDetailID,ibd.itemID,ibd.inventoryStorageID,iii.itemName,ibd.barcode,ibd.serialnumber,ibd.quantity,ibd.borrowedPurpose,ibd.dateBorrowed,
		ib.projectID,pplt.projectListCode, pplt.projectListName, pct.clientCode, pct.clientName,ibd.unitOfMeasurement, pct.clientRegion, pct.clientProvince, pct.clientCity, pct.clientBarangay, pct.clientUnitNumber, pct.clientHouseNumber, pct.clientCountry, pct.clientPostalCode`,
		`ib.borrowingStatus = 2 AND ib.borrowingID = ${id}`,``,`ibd.borrowingDetailID`);
		
		BorrowingData.map((item, index) => {
			let address = `${item.clientUnitNumber && titleCase(item.clientUnitNumber)+", "}${item.clientHouseNumber && item.clientHouseNumber +", "}${item.clientBarangay && titleCase(item.clientBarangay)+", "}${item.clientCity && titleCase(item.clientCity)+", "}${item.clientProvince && titleCase(item.clientProvince)+", "}${item.clientCountry && titleCase(item.clientCountry)+", "}${item.clientPostalCode && titleCase(item.clientPostalCode)}`;
			let clientCode =`${item.clientCode}`;
			let clientName =`${item.clientName}`;
			let projectCode =`${item.projectListCode}`;
			let projectListName =`${item.projectListName}`;
			let projectID =`${item.projectID}`;
			let {	
			borrowingDetailID			="",
			itemID						="",
			inventoryStorageID			="",
			itemCode 					="",
			itemName					="",
			inventoryStorageOfficeName 	="",
			barcode 					="",
			serialnumber 				="",
			quantity 					="",
			borrowedPurpose 			="",
			dateBorrowed 				="",
			inventoryCode				="",
			returnItemQuantity			="",
			returnItemDate				="",
			unitOfMeasurement			=""
		} = item;

		$("#clientAddress").val(address);
		$("#clientCode").val(clientCode);
		$("#clientName").val(clientName);
		$("#projectCode").val(projectCode);
		$("#projectID").val(projectListName);
		//$("#projectID").attr("ID",projectID);
		$("#projectrecordID").val(projectID);
		
		
		if (readOnly) {
			
			html += `
			<tr class="itemTableRow">
			<td>
				<div class="barcode">
				${barcode || "-"}	
				</div>
			</td>
				<td>
					<div class="itemCode">
					${itemCode || "-"}
					</div>
				</td>
				<td>
					<div class="itemName">
					${itemName || "-"}
					</div>
				</td>
				<td>
					<div class="serialnumber">
						${serialnumber || "-"}
					</div>
		   		</td> 
				<td>
					<div class="inventoryCode">
					${inventoryCode || "-"}
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
			<td class="text-center">
			<div class="borrowedquantity">
				${quantity || "-"}
			</div>
		   </td> 
		   <td class="">
			<div class="unitOfMeasurement">
				${unitOfMeasurement || "-"}
			</div>
		   </td> 
			<td>
			<div class="returnItemDate"dateBorrowed="${dateBorrowed}">
				${returnItemDate}
			</div>
		   </td> 

				<td class="text-center">
					<div class="returnItemQuantity">
					${returnItemQuantity}
					</div>
				</td>
			</tr>`;


		} else {
	
		html += `
			<tr class="itemTableRow">
			<td>
				<div class="barcode">
				${barcode || "-"}
				</div>
			</td>
			<td>
				<div class="itemcode" itemID ="${itemID}" inventoryLocationID="${inventoryStorageID}" borrowingDetailID="${borrowingDetailID}">
				${itemCode || "-"}
				</div>
			</td>
			<td>
				<div class="itemName" name="itemName">
				${itemName || "-"}
				</div>
			</td>
			<td>
			<div class="serialnumber">
				${serialnumber || "-"}
			</div>
		   </td> 
			<td>
				<div class="inventoryCode">
				${inventoryCode || "-"}	
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
		<td class="text-center">
		<div class="borrowedquantity" id="borrowedquantity${index}">
			${quantity}
		</div>
	   </td> 
	   <td class="">
		<div class="unitOfMeasurement" id="unitOfMeasurement${index}">
			${unitOfMeasurement}
		</div>
	   </td> 
		<td>
			<input type="button" 
			class="form-control daterange returnItemDate  text-left"
			required
			id="returnItemDate${index}"
			name="returnItemDate"
			value=""
			dateBorrowed="${dateBorrowed}"
			title="Date" required>
			<div class="d-block invalid-feedback" id="invalid-returnItemDate"></div>
	   </td> 
			<td class="text-center">
			<input 
				type="text" 
				class="form-control input-returnItemQuantity returnItemQuantity input-quantity text-center"
				min="0.01" 
				data-allowcharacters="[0-9]" 
				max="${quantity}" 
				id="returnItemQuantity${index}" 
				name="returnItemQuantity"
				count="${index}" 
				value="" 
				minlength="1" 
				maxlength="20" 
				required>
				<div class="invalid-feedback d-block" id="invalid-returnItemQuantity${index}"></div>
			</td>
		</tr>`;	

		}



		});	
		//datevalidated();
	return html;


    }

	function datevalidated() {
		$(".returnItemDate").each(function() {
			const elementID    = $(this).attr("id");
			const dateBorrowed = `#${$(this).attr("dateBorrowed")}`;
			const minDateOptions = {
				autoUpdateInput:  false,
				singleDatePicker: true,
				showDropdowns:    true,
				autoApply:        true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				minDate: moment(dateBorrowed).format("MMMM DD, YYYY"),
			}
			initDateRangePicker(elementID, minDateOptions);
		})
	}	
//	$(document).on("change", "[name=returnItemDate]", function() {
		// const id 	= $(this).attr("id");
		// const borrowedate = $(this).attr("dateBorrowed");
		// $(".returnItemDate").each(function () {
		// 	const id = $(this).attr("id");
		// 	$(`#${id}`).attr('max', borrowedate);
		// 	initDateRangePicker(`#${id}`, {
		// 		autoUpdateInput: false,
		// 		singleDatePicker: true,
		// 		showDropdowns: true,
		// 		autoApply: true,
		// 		locale: {
		// 			format: "MMMM DD, YYYY",
		// 		},
		// 		maxDate: moment()
		// 	})
		// })


	// })	


	$(document).on("change", ".returnItemQuantity", function() {
		var number 	= $(this).attr("count");
		const val = $(this).val();
		var totalval = parseInt(val);
		var borrowedquantity = $(`#borrowedquantity${number}`).text()
		var totalborrowedquantity = parseInt(borrowedquantity);
		if(totalval < totalborrowedquantity || totalval == totalborrowedquantity){
			$(`#returnItemQuantity${number}`).removeClass("is-invalid").addClass("is-valid");
			$(this).closest("tr").find(`#invalid-returnItemQuantity${number}`).removeClass("is-invalid");
			$(this).closest("tr").find(`#invalid-returnItemQuantity${number}`).text('');
			removeIsValid("#tableProjectRequestItems");
		}else{
			$(`#returnItemQuantity${number}`).removeClass("is-valid").addClass("is-invalid");
			$(this).closest("tr").find(`#invalid-returnItemQuantity${number}`).addClass("is-invalid");
			$(`#invalid-returnItemQuantity${number}`).html("Not equal order quantity");
		}

	});	
    // ----- END GET ITEM ROW -----
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
        const clientCode  = $('option:selected', this).attr("clientCode");
        const clientName  = $('option:selected', this).attr("clientName");
        const address     = $('option:selected', this).attr("address");

        $("[name=projectCode]").val(projectCode);
        $("[name=clientCode]").val(clientCode);
        $("[name=clientName]").val(clientName);
        $("[name=clientAddress]").val(address);
		
    })
    // ----- END SELECT PROJECT LIST -----

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
			returnItemID       		= "",
			borrowingID				="",
			reviseReturnItemID 		= "",
			employeeID              = "",
			projectID 				= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			returnItemReason		="",
			returnItemStatus  		= false,
			transferRequestRemarks  = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];
		
		let requestProjectItems = "";
		if (returnItemID) {
			requestServiceItems = getBorrowedRow(returnItemID, readOnly,borrowingID);
		}

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("returnItemID", encryptString(returnItemID));
		$("#btnBack").attr("status", returnItemStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";

		let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
	
	
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? returnItemID : reviseReturnItemID;
		let documentHeaderClass = isRevise || reviseReturnItemID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseReturnItemID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseReturnItemID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("RI", createdAt, reviseDocumentNo)}
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
							${returnItemID && !isRevise ? getFormCode("RI", createdAt, returnItemID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${returnItemStatus && !isRevise ? getStatusStyle(returnItemStatus) : "---"}
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
								${getDateApproved(returnItemStatus, approversID, approversDate)}
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
							${transferRequestRemarks && !isRevise ? transferRequestRemarks : "---"}
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
			name="borrowingID"
			id="borrowingID"
			style="width: 100%"
			required
			${disabled}>
			<option selected disabled>Select Reference No.</option>
			${getBorroiwngList(borrowingID)}
		</select>
	</div>
	</div>

	<div class="col-md-4 col-sm-12">
	<div class="form-group">
		<label>Project Name</label>
		<input type="text" class="form-control" id="projectID" name="projectID" disabled value="-">
		<input type="hidden" class="form-control" id="projectrecordID" name="projectrecordID">
	</div>
	</div>
	<div class="col-md-4 col-sm-12">
	<div class="form-group">
		<label>Project Code</label>
		<input type="text" class="form-control" id="projectCode" name="projectCode" disabled value="-">
	</div>
	</div>
	<div class="col-md-3 col-sm-12">
	<div class="form-group">
		<label>Client Code</label>
		<input type="text" class="form-control" id="clientCode" name="clientCode" disabled value="-">
	</div>
</div>
<div class="col-md-3 col-sm-12">
	<div class="form-group">
		<label>Client Name</label>
		<input type="text" class="form-control" id="clientName" name="clientName" disabled value="-">
	</div>
</div>
<div class="col-md-6 col-sm-12">
	<div class="form-group">
		<label>Client Address</label>
		<input type="text" class="form-control" id="clientAddress" name="clientAddress" disabled value="-">
	</div>
</div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared by</label>
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
					id="returnItemReason"
					name="returnItemReason"
					required
					rows="4"
					style="resize:none;"
					${disabled}>${returnItemReason ?? ""}</textarea>
				<div class="d-block invalid-feedback" id="invalid-returnItemReason"></div>
			</div>
		</div>

            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="text-primary font-weight-bold" style="font-size: 1.5rem;">RETURN ITEM/S</div>
                    <table class="table table-striped" id="${tableProjectRequestItemsName}">
                        <thead>
                            <tr style="white-space: nowrap">
								<th>Barcode</th>
								<th>Item Code</th>
								<th>Item Name </th>
								<th>Serial No.</th>
								<th>Storage Code </th>
								<th>Storage Name</th>
								<th>Date Borrowed</th>
								<th>Quantity</th>
								<th>UOM</th>
								<th>Date Returned <code>*</code></th>
								<th>Quantity <code>*</code></th>
                            </tr>
                        </thead>
                        <tbody class="itemProjectTableBody" project="true">
                            ${requestProjectItems}
                        </tbody>
                    </table>
					<div class="col-md-12 text-right mt-3">
					${button}
					</div>
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
			initAll();
			//getBorrowedRow();
			updateInventoryItemOptions();
			projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			borrowingID && borrowingID != 0 && $("[name=borrowingID]").trigger("change");

			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			
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

			headerButton(true, "Add Return Item");
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
	function getReturnItemData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
			//data["returnItemID"] = id;
			//formData.append("returnItemID", id);
			data["returnItemID"] = id;
			formData.append("returnItemID", id);

			if (status != "2") {
				data["returnItemStatus"] = status;
				formData.append("returnItemStatus", status);
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
			//data["projectID"]    = $("[name=projectID]").val() || null;
			//data["projectID"]	 = $("[name=projectID]", this).attr("ID");projectrecordID
			//alert($("[name=projectID]", this).attr("projectid"));
			data["returnItemReason"] = $("[name=returnItemReason]").val()?.trim();
			data["projectID"] = $("[name=projectrecordID]").val()?.trim();
			//data["borrowingID"]  = $("[name=borrowingID]").val() || null;

			formData.append("employeeID", sessionID);
			//formData.append("projectID", $("[name=projectID]").val() || null);
			formData.append("projectID", $("[name=projectrecordID]").val() || null);
			//formData.append("projectID", $("[name=projectrecordID]", this).attr("ID"));
			formData.append("borrowingID", $("[name=borrowingID]").val() || null);
			formData.append("returnItemReason", $("[name=returnItemReason]").val()?.trim());

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["returnItemID"] = id;
				formData.append("returnItemID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["returnItemStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("returnItemStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["returnItemStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("returnItemStatus", 2);
				}
			}

			$(".itemTableRow").each(function(i, obj) {
				const categoryType = $(this).closest("tbody").attr("project") == "true" ? "project" : "";
				//const itemID    = $("td [name=itemcode]", this).val();
				const borrowingDetailID    	= $("td .itemcode", this).attr("borrowingdetailid");
				const inventoryStorageID    = $("td .itemcode", this).attr("inventorylocationid");
				const itemID    			= $("td .itemcode", this).attr("itemID");
				const itemName    			= $("td .itemName", this).text();
				const barcode   			= $("td .barcode", this).text();	
				const serialnumber    		= $("td .serialnumber", this).text();
				//date borrowed
				const formatdateboorowed   	= $("td .dateBorrowed", this).text();	
				const dateBorrowed 			= moment(formatdateboorowed).format("YYYY-MM-DD HH:mm:ss");
				// end of borrowed
				const quantityBorrowed 		= $("td .borrowedquantity", this).text();	
				const borrowedPurpose   	= $("td .borrowedPurpose", this).text();
				// return date format	
				const formatreturnItemDate  = $("td [name=returnItemDate]", this).val();	
				const returnItemDate 		= moment(formatreturnItemDate).format("YYYY-MM-DD HH:mm:ss");
				// end of date return
				const returnItemQuantity 		= +$("td [name=returnItemQuantity]", this).val().replaceAll(",","");	
				let temp = {
					itemID, returnItemQuantity
				};

				formData.append(`items[${i}][borrowingDetailID]`, borrowingDetailID);
				formData.append(`items[${i}][inventoryStorageID]`, inventoryStorageID);
				formData.append(`items[${i}][itemID]`, itemID);
				formData.append(`items[${i}][itemName]`, itemName);
				formData.append(`items[${i}][barcode]`, barcode);
				formData.append(`items[${i}][serialnumber]`, serialnumber);
				formData.append(`items[${i}][borrowedPurpose]`, borrowedPurpose);
				formData.append(`items[${i}][dateBorrowed]`, dateBorrowed);
				formData.append(`items[${i}][quantityBorrowed]`, quantityBorrowed);
				formData.append(`items[${i}][returnItemDate]`, returnItemDate);
				formData.append(`items[${i}][returnItemQuantity]`, returnItemQuantity);
			
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
		const id = decryptString($(this).attr("returnItemID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("returnItemID"));
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("RI", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const data   = getReturnItemData(action, "save", "0", id);
				data["returnItemStatus"]   = 0;
				data["reviseReturnItemID"] = id;
				delete data["returnItemID"];

				// data.append("returnItemStatus", 0);
				// data.append("revisereturnItemID", id);
				// data.delete("returnItemID");
	
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
			const data   = getReturnItemData(action, "save", "0", id);
			data.append("returnItemStatus", 0);

			saveReturnItem(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("returnItemID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("TR", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getReturnItemData(action, "save", "0", id);
		data.append("returnItemStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
			// data["revisereturnItemID"] = id;
			// delete data["returnItemID"];
			data.append("reviseReturnItemID", id);
			data.delete("returnItemID");
			}else{
			data.append("reviseReturnItemID", id);
			data.delete("action");
			data.append("action", "update");
			}
			// data.append("revisereturnItemID", id);
			// data.delete("returnItemID");
		}
		saveReturnItem(data, "save", null, pageContent);
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
		let condition = $("[name=returnItemQuantity]").hasClass("is-invalid");
		if(!condition){
		const id           = decryptString($(this).attr("returnItemID"));
		const revise       = $(this).attr("revise") == "true";
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const validate     = validateForm("form_purchase_request");
		removeIsValid("#tableProjectRequestItems");
		if (validate) {
			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data   = getReturnItemData(action, "submit", "1", id);

			if (revise) {
				if (!isFromCancelledDocument) {
				// data["revisereturnItemID"] = id;
				// delete data["returnItemID"];
				data.append("reviseReturnItemID", id);
				data.delete("returnItemID");
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
					moduleID:                35,
					notificationTitle:       "Return Item",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

			saveReturnItem(data, "submit", notificationData, pageContent);
		}
		}else{
			$("[name=returnItemQuantity]").focus();

		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("returnItemID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getReturnItemData(action, "cancelform", "4", id, status);

		saveReturnItem(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("returnItemID"));
		const feedback = $(this).attr("code") || getFormCode("RI", dateToday(), id);
		let tableData  = getTableData("ims_return_item_tbl", "", "returnItemID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getReturnItemData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                35,
					tableID:                 id,
					notificationTitle:       "Return Item",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                35,
					tableID:                 id,
					notificationTitle:       "Return Item",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("returnItemStatus", status);

			saveReturnItem(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("returnItemID"));
		const feedback = $(this).attr("code") || getFormCode("RI", dateToday(), id);

		$("#modal_return_item_content").html(preloader);
		$("#modal_return_item .page-title").text("DENY RETURN ITEM");
		$("#modal_return_item").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="transferRequestRemarks"
					name="transferRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-transferRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			returnItemID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_return_item_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("returnItemID"));
		const feedback = $(this).attr("code") || getFormCode(" RI", dateToday(), id);

		const validate = validateForm("modal_return_item");
		if (validate) {
			let tableData = getTableData("ims_return_item_tbl", "", "returnItemID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("returnItemID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("transferRequestRemarks", $("[name=transferRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                35,
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
		const returnItemID = decryptString($(this).attr("returnItemID"));
		const feedback          = $(this).attr("code") || getFormCode("ADF", dateToday(), id);
		const id = decryptString($(this).attr("returnItemID"));
		let data = new FormData;
		data.append("returnItemID", returnItemID);
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
	const title = "Return Item";
	let swalText, swalImg;

	$("#modal_return_item").text().length > 0 && $("#modal_return_item").modal("hide");

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

function saveReturnItem(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `return_item/saveReturnItem`,
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
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("RI", dateCreated, insertedID)} dropped successfully!`;
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
					if(method != "submit"){
						if (method != "deny") {
							callback && callback();
						} else {
							$("#modal_return_item").text().length > 0 && $("#modal_return_item").modal("show");
						}
					}
					// if (method != "deny") {
					// 	if (method != "cancelform") {
					// 		callback && callback();
					// 	}
					// } else {
					// 	$("#modal_return_item").text().length > 0 && $("#modal_return_item").modal("show");
					// }
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_return_item").text().length > 0 && $("#modal_return_item").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}


// --------------- END DATABASE RELATION ---------------