$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(133);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(133);
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
				"fms_petty_cash_replenishment_tbl", 
				"revisePettyRepID", 
				"revisePettyRepID IS NOT NULL AND pettyRepStatus != 4");
			return revisedDocumentsID.map(item => item.revisePettyRepID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----




    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("fms_petty_cash_replenishment_tbl", "", "pettyRepID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					pettyRepStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (pettyRepStatus == 0 || pettyRepStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (pettyRepStatus == 0) {
						isReadOnly = false;
					}else if(pettyRepStatus == 7){
						isReadOnly = false;
						isRevise = true;
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
			// let id = decryptString(view_id);
			let id = view_id;
				id && isFinite(id) && loadData(id, isRevise,isFromCancelledDocument);
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
			window.history.pushState("", "", `${base_url}fms/petty_cash_replenishment?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/petty_cash_replenishment?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/petty_cash_replenishment?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/petty_cash_replenishment`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	const setPettyCashBudget  = 10000.00;
	
	// const employeeList = getTableData("hris_employee_list_tbl", "CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) AS employeeFullname, employeeID");
	
	// const projectList = getTableData("pms_project_list_tbl JOIN pms_category_tbl USING(categoryID) JOIN pms_milestone_builder_tbl USING(categoryID)", 
	// 						"pms_project_list_tbl.*, pms_category_tbl.categoryName AS projectCategory ",
	// 						"projectListStatus = 1","","projectListID");
	// const milestoneList = getTableData("pms_milestone_list_tbl")
	// const clientList = getTableData("pms_client_tbl", "*", "clientStatus = 1");

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
					{ targets: 4,  width: 250  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 350  }
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
					{ targets: 3,  width: 180 },
					{ targets: 4,  width: 250  },
					{ targets: 5,  width: 80  },
					{ targets: 6,  width: 350  }
				],
			});

			var table = $("#tablePettyCash")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: false,
                // searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 100  },
					{ targets: 1,  width: 100 },
					{ targets: 2,  width: 80 },
					{ targets: 3,  width: 150  },
					{ targets: 4,  width: 150  },
					{ targets: 5,  width: 100  },
					{ targets: 6,  width: 100  },
					{ targets: 7,  width: 100  },
				],
			});
			var table = $("#tablePettyCashSummary")
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
					{ targets: 0,  width: 150 },
					{ targets: 1,  width: 100 },
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 100 }
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("fms_petty_cash_replenishment_tbl", "approversID")) {
				let count = getCountForApproval("fms_petty_cash_replenishment_tbl", "pettyRepStatus");
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
			html = ``;
			// if(isCreateAllowed(133)){
			// 	html = `
           	//  	<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			// }
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" 
					id="btnBack" 
					revise="${isRevise}" cancel="${isFromCancelledDocument}">
				<i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let pettyRepData = getTableData(
			"fms_petty_cash_replenishment_tbl AS fpcrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"fpcrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, fpcrt.createdAt AS dateCreated",
			`fpcrt.employeeID != ${sessionID} AND pettyRepStatus != 0 AND pettyRepStatus != 4`,
			`FIELD(pettyRepStatus, 0, 1, 3, 2, 4), COALESCE(fpcrt.submittedAt, fpcrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Total Balance</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyRepData.map((item) => {
			let {
				fullname,
				pettyRepID,
				approversID,
				pettyRepTotalBalance,
				approversDate,
				pettyRepStatus,
				pettyRepRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = pettyRepRemarks ? pettyRepRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyRepStatus == 2 || pettyRepStatus == 5 ? approversDate.split("|") : "-";
			
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyRepStatus != 0 ? "btnView" : "btnEdit";

			let button = pettyRepStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(pettyRepID )}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(pettyRepID)}" 
				code="${getFormCode("PCRF", createdAt, pettyRepID )}"><i class="fas fa-edit"></i> Edit</button>`;
			if (isImCurrentApprover(approversID, approversDate, pettyRepStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
					<tr class="${btnClass}" id="${encryptString(pettyRepID)}">
						<td>${getFormCode("PCRF", createdAt, pettyRepID )}</td>
						<td>${fullname}</td>
						<td class="text-right">${pettyRepTotalBalance ? formatAmount(pettyRepTotalBalance,true) : "-"}</td>
						<td>
							${employeeFullname(getCurrentApprover(approversID, approversDate, pettyRepStatus, true))}
						</td>
						<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
						<td class="text-center">
							${getStatusStyle(pettyRepStatus)}
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
		let pettyRepData = getTableData(
			"fms_petty_cash_replenishment_tbl AS fpcrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"fpcrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, fpcrt.createdAt AS dateCreated",
			`fpcrt.employeeID = ${sessionID}`,
			`FIELD(pettyRepStatus, 0, 1, 3, 2, 4), COALESCE(fpcrt.submittedAt, fpcrt.createdAt)`
		);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Total Balance</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyRepData.map((item) => {
			let {
				fullname,
				pettyRepID,
				approversID,
				pettyRepTotalBalance,
				approversDate,
				pettyRepStatus,
				pettyRepRemarks,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = pettyRepRemarks ? pettyRepRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = pettyRepStatus == 2 || pettyRepStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = pettyRepStatus != 0 ? "btnEdit" : "btnView";
			html += `
				<tr class="${btnClass}" id="${encryptString(pettyRepID)}">
					<td>${getFormCode("PCRF", createdAt, pettyRepID )}</td>
					<td>${fullname}</td>
					<td class="text-right">${pettyRepTotalBalance ? formatAmount(pettyRepTotalBalance,true) : "-"}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, pettyRepStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(pettyRepStatus)}
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
				pettyRepID     = "",
				pettyRepStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (pettyRepStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						pettyRepID="${encryptString(pettyRepID)}"
						code="${getFormCode("PCRF", createdAt, pettyRepID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF",createdAt, pettyRepID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (pettyRepStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"
							status="${pettyRepStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(pettyRepStatus == 2){
					// DROP
					button = ``;
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	pettyRepID="${encryptString(pettyRepID)}"
					// 	code="${getFormCode("PCRF", createdAt, pettyRepID)}"
					// 	status="${pettyRepStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (pettyRepStatus == 3) {
					// DENIED - FOR REVISE
					if(!isDocumentRevised(pettyRepID)){
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"
							status="${pettyRepStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				} else if (pettyRepStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(pettyRepID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"
							status="${pettyRepStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (pettyRepStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							pettyRepID="${encryptString(pettyRepID)}"
							code="${getFormCode("PCRF", createdAt, pettyRepID)}"><i class="fas fa-ban"></i> 
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

	// ----- GET EMPLOYEE LIST -----
	function getEmployeeList(id = null , typeEmployee = "default"){
		// TYPE EMPLOYEE ;
			// PROJECT MANAGER 	= PM; 
			// TEAM LEADER 		= TL
			// TEAM MEMBERS 	= default
		let html = ``, members = [];
		let projectManager 	= $("[name=timelineProjectManager]").val(); 
		let teamLeader 		= $("[name=timelineTeamLeader]").val();

		switch(typeEmployee) {
			case "PM":	html += `<option disabled ${!id?"selected":''}>Please select a project manager</option>`;
				employeeList.map((items,index) =>{
					html += `			
						<option 
							value        = "${items.employeeID}" 
							${items.employeeID == id && "selected"}>
							${items.employeeFullname}
						</option>
						`;
				});
				break;
			case "TL": html += `<option disabled ${!id?"selected":''}>Please select a team leader</option>`;
				employeeList.map((items,index) =>{
					html += `			
						<option 
							value        = "${items.employeeID}" 
							${items.employeeID == id && "selected"}>
							${items.employeeFullname}
						</option>
						`;
				});
				break;
			default: 
				var employeeIDs = id.split("|");

				employeeList.map((items,index) =>{
					html += `			
							<option 
								value        = "${items.employeeID}" 
								${employeeIDs.includes(items.employeeID) && "selected"}>
								${items.employeeFullname}
							</option>
							`;
				});
		}
		return html;	

	}	
	// ----- END GET EMPLOYEE LIST -----

	// ----- UPDATE MILESTONE SELECT -----
	function milestoneSelect(projectID  = null, milestoneBuilderID = null){
		let html = `<option disabled ${!milestoneBuilderID ? "selected":''}>Please select a phase</option>`;
		if(projectID){
			let categoryID 	= projectList.filter(items=> items.projectListID == projectID ).map(items=>{ return items.categoryID });
			let tableData 	= getTableData("pms_milestone_builder_tbl",`*`,`categoryID = '${categoryID}'`);
			
			tableData.map((items,index) =>{
				html += `			
					<option value = "${items.milestoneBuilderID}"
					${items.milestoneBuilderID == milestoneBuilderID && "selected"}>
						${items.phaseDescription}
					</option>
					`;
			});
		}
		return html;
	}
	// ----- END UPDATE MILESTONE SELECT -----



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

	$(document).on("change","[name=phaseDescription]", function(){	
		let milestoneBuilderID 	= $(this).val();
		let thisParent 			= $(this).parent().parent();
		thisParent.find(".milestone-list").html(preloader);
		let tableData = getTableData("pms_milestone_list_tbl","*",`milestoneBuilderID = '${milestoneBuilderID}'`);
		let html = ``, tableDataLength = tableData.length;
		if(tableDataLength > 0){
			var breakReference = parseInt(tableDataLength) - 1;
			tableData.map((items, index)=>{
				html += `<span class="text-left font-weight-bold">${items.projectMilestoneName}</span>`;
				if(breakReference > index){
					html += `<br>`;
				}
			});
		}
		setTimeout(() => {
			thisParent.find(".milestone-list").html(html);
		}, 120);

	});

	$(document).on("click", "#btnSubAddRow", function(){
		var thisElement = $(this).parent().parent().find(`tbody`);
		let row = listOfProjectTask();
		$(thisElement).append(row);  
		
		updateTableTaskList()
		initHours();
		updateDeleteButton();
	});

	/** CHECKBOX */
		$(document).on("change", ".main_checkboxall", function() {
			const isChecked = $(this).prop("checked");
			$(".main_checkboxrow").each(function(i, obj) {
				$(this).prop("checked", isChecked);
			});
			updateDeleteButton();
		});
	
		$(document).on("click", ".main_checkboxrow", function() {
			updateDeleteButton();
		});
	/** END OF CHECKBOX */

	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
	});

	$(document).on("click", ".btnSubDeleteRow", function(){
		let thisCondition = $(this).closest("table").find(".btnSubDeleteRow");
		if( thisCondition.length > 1 ){
			setTimeout(() => {
				$(this).closest("tr").remove();
			}, 120);
		}else{
			showNotification("danger", "You must have atleast one or more items.");
		}
	});

	$(document).on("change","[name=taskEndDate]", function(){
		var dates = [];
		$(".task-list-sub-row").each(function(){
			var startDateValue 	= $(this).find("[name=taskStartDate]").val();
			var endDateValue 	= $(this).find("[name=taskEndDate]").val();
			dates.push(startDateValue); 
			dates.push(endDateValue); 
		});	
		var dateSortOf = dates.sort(function(a,b){ return new Date(a) - new Date(b) });
		$("[name=timelineDate]").val(dateSortOf[0]+" - "+dateSortOf.pop());
	});

	$(document).on("change","[name=clientID]", function(){
		var clientAddress 		= $('option:selected', this).attr("address");
		$("[name=clientAddress]").val(clientAddress);
	});


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			pettyRepID       		= "",
			revisePettyRepID 		= "",
			employeeID              = "",
			pettyRepRemarks  		= "",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			pettyRepStatus   		= false,
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

		$("#btnBack").attr("pettyRepID", encryptString(pettyRepID));
		$("#btnBack").attr("status", pettyRepStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : ``;
		let tablePettyCashID = readOnly ? "tablePettyCash0" : "tablePettyCash";
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? pettyRepID : revisePettyRepID;
		let documentHeaderClass = isRevise || revisePettyRepID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePettyRepID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePettyRepID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PCRF", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		// let clientAddress = clientID && clientList.filter(items=> items.clientID == clientID).map((items, index)=>{
		// 	return `${items.clientUnitNumber && titleCase(items.clientUnitNumber)+" "}${items.clientHouseNumber && items.clientHouseNumber +" "}${items.clientBarangay && titleCase(items.clientBarangay)+", "}${items.clientCity && titleCase(items.clientCity)+", "}${items.clientProvince && titleCase(items.clientProvince)+", "}${items.clientCountry && titleCase(items.clientCountry)+", "}${items.clientPostalCode && titleCase(items.clientPostalCode)}`
		// });	

		
		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${pettyRepID && !isRevise ? getFormCode("PCRF", createdAt, pettyRepID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${pettyRepStatus && !isRevise ? getStatusStyle(pettyRepStatus) : "---"}
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
								${getDateApproved(pettyRepStatus, approversID, approversDate)}
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
							${pettyRepRemarks && !isRevise ? pettyRepRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_replenishment">
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
			<div class="col-12">
				<div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Petty Cash Summary</div>
				<hr class="pb-1">
				<div class="w-100">
					<table class="table table-striped" id="tablePettyCash">
						<thead>
							<tr style="white-space: nowrap">
								<th>Date</th>
								<th>Liquidation No.</th>
								<th>Account Name</th>
								<th>Description</th>
								<th>Amount</th>
								<th>VAT Sales</th>
								<th>VAT</th>
							</tr>
						</thead>
						<tbody class="pettyRepTableBody">
							${listOfLiquidation(pettyRepID)}
						</tbody>
					</table>
				</div>
				<div class="row py-2">
					<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pt-3 pb-2">
						<div class="row pb-2" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Total Budget:</div>
							<div class="col-6 col-lg-5 text-right" id="totalBudget" style="font-size: 1.05em">-</div>
						</div>
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Total Expense:</div>
							<div class="col-6 col-lg-5 text-right" id="totalExpense" style="font-size: 1.05em">-</div>
						</div>
						<div class="row pt-1" style="font-size: 1.3rem; font-weight:bold; border-bottom: 3px double black; border-top: 1px solid black">
							<div class="col-6 col-lg-7 text-left">Total Balance:</div>
							<div class="col-6 col-lg-5 text-right text-danger" id="totalBalance" style="font-size: 1.05em">-</div>
						</div>
					</div>
				</div>
				<div class="w-100">
					<table class="table table-striped" id="tablePettyCashSummary">
						<thead>
							<tr style="white-space: nowrap">
								<th>Account Name</th>
								<th>Amount</th>
								<th>Less VAT</th>
								<th>Final Amount</th>
							</tr>
						</thead>
						<tbody class="pettyRepTableBody">
							${listOfLiquidationSummary(pettyRepID)}
						</tbody>
					</table>
				</div>
				<div class="row py-2">
					<div class="offset-lg-6 col-lg-6 offset-md-3 col-md-9 col-sm-12 pt-3 pb-2">
						<div class="row" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Total Amount:</div>
							<div class="col-6 col-lg-5 text-right" id="totalAmount" style="font-size: 1.05em">-</div>
						</div>
						<div class="row pb-2" style="font-size: 1.1rem; font-weight:bold">
							<div class="col-6 col-lg-7 text-left">Total VAT:</div>
							<div class="col-6 col-lg-5 text-right" id="totalVat" style="font-size: 1.05em">-</div>
						</div>
						<div class="row pt-1" style="font-size: 1.3rem; font-weight:bold; border-bottom: 3px double black; border-top: 1px solid black">
							<div class="col-6 col-lg-7 text-left">Grand Total:</div>
							<div class="col-6 col-lg-5 text-right text-danger" id="grandTotal" style="font-size: 1.05em">-</div>
						</div>
					</div>
				</div>


			</div>
			
			<div class="w-100 row mt-4">
                
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
			initHours();
			$("#awardSignatories").select2({ placeholder: "Please select a team members", theme: "bootstrap" });
			// projectID && projectID != 0 && $("[name=projectID]").trigger("change");
			// if(isRevise){
			// 	changingOptions();
			// }
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
			updateTableRows();
			updateTableTaskList();
			return html;
		}, 500);
	}
	// ----- END FORM CONTENT -----

	function listOfLiquidation(id = null, readOnly = false){
		let html = ``, projectTaskButtons = false, totalExpense = 0, totalBalance = 0;
		let condition = id ? `pettyRepID = '${id}'` : `pettyRepID IS NULL`;
		let tableData = getTableData(`fms_finance_request_details_tbl as ffrd LEFT JOIN fms_liquidation_tbl USING(liquidationID) JOIN fms_chart_of_accounts_tbl ON fms_liquidation_tbl.chartOfAccountID = fms_chart_of_accounts_tbl.chartOfAccountID`, 
									` SUM(ffrd.amount * ffrd.quantity) as amount,fms_liquidation_tbl.*,fms_chart_of_accounts_tbl.accountName as accountName `, 
									condition,``,` ffrd.liquidationID`);
		console.log(tableData)
			tableData.map((items, index)=>{
				var totalAmount =  parseFloat(items.amount);
				var vatSales=0,vatAmount=0;
				totalExpense += parseFloat(totalAmount);

				if(items.liquidationVatAmount != 0){
					vatSales =  parseFloat(totalAmount) / 1.12;
					vatAmount = parseFloat(totalAmount) - parseFloat(vatSales) 
				}
				html += `
						<tr class="list-finance-request" financerequest="${items.financeRequestID}">
						 	<td>${moment(items.createdAt).format("MMMM DD, YYYY")}</td>
							<td>${getFormCode("LF", items.createdAt, items.liquidationID)}</td>
							<td>${items.accountName}</td>
							<td>${items.liquidationPurpose}</td>
							<td class="text-right">${formatAmount(totalAmount, true)}</td>
							<td class="text-right">${formatAmount(vatSales, true)}</td>
							<td class="text-right">${formatAmount(vatAmount, true)}</td>
						</tr>
					`;
			});
		totalBalance = parseFloat(setPettyCashBudget) - parseFloat(totalExpense);
		setTimeout(() => {
			$("#totalExpense").text(`(${formatAmount(totalExpense, true)})`);
			$("#totalBudget").text(formatAmount(setPettyCashBudget, true));
			$("#totalBalance").text(formatAmount(totalBalance, true));
		}, 800);
		return html;
	}
	
	function listOfLiquidationSummary(id = null){
		let html = ``, totalAmount = 0, totalVat = 0, grandTotal = 0;
		let condition = id ? `pettyRepID = '${id}'` : `pettyRepID IS NULL`;
		let tableData = getTableData(`fms_finance_request_details_tbl LEFT JOIN fms_liquidation_tbl USING(liquidationID) 
									LEFT JOIN fms_chart_of_accounts_tbl ON fms_liquidation_tbl.chartOfAccountID = fms_chart_of_accounts_tbl.chartOfAccountID`, 
									`fms_finance_request_details_tbl.*,fms_liquidation_tbl.*,fms_chart_of_accounts_tbl.accountName as accountName, SUM(fms_finance_request_details_tbl.amount * fms_finance_request_details_tbl.quantity) as summaryTotal `, 
									condition,``,`accountName`);
		console.log(tableData);
			tableData.map((items, index)=>{
				var liquidationVatAmount =0;
				
				if(items.liquidationVatAmount != null){
					liquidationVatAmount  =items.liquidationVatAmount;
				}

				var finalAmount = parseFloat(items.summaryTotal  || 0) - parseFloat(liquidationVatAmount);
				totalAmount += parseFloat(items.summaryTotal  || 0);
				totalVat += parseFloat(liquidationVatAmount || 0) ;
				grandTotal += parseFloat(finalAmount || 0) ;
				html += `<tr style="white-space: nowrap">
						<td>${items.accountName}</td>
						<td class="text-right">${formatAmount(items.summaryTotal || 0, true)}</td>
						<td class="text-right">${formatAmount(liquidationVatAmount || 0, true)}</td>
						<td class="text-right">${formatAmount(finalAmount || 0, true)}</td>
					</tr>`;
			});
		setTimeout(() => {
			$("#totalAmount").text(formatAmount(totalAmount, true));
			$("#totalVat").text(`(${formatAmount(totalVat, true)})`);
			$("#grandTotal").text(formatAmount(grandTotal, true));
		}, 800);

		return html;
	}



	function updateTableRows(){
        $(".task-list-row").each(function(i){
            // CHECKBOX
			$("td .action .main_checkboxrow", this).attr("id", `main_checkboxrow${i}`);



            // INPUTS ID's
			$("td [name=phaseDescription]", this).attr("id", `phaseDescription${i}`);
			$("td [name=projectMilestoneName]", this).attr("id", `projectMilestoneName${i}`);
			

            // INPUTS ID's INVALID FEEDBACK
			$("td [name=phaseDescription]", this).next().attr("id", `invalid-phaseDescription${i}`);
			$("td [name=projectMilestoneName]", this).next().attr("id", `invalid-projectMilestoneName${i}`);
			
			// INITIALIZE SELECT 2
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			})

			$(this).find("select").each(function(j) {
				var thisValue = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("id", `phaseDescription${i}`);
				$(this).attr("data-select2-id", `phaseDescription${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});
				


        });
    }  



	function updateTableTaskList(){
		$(".task-list-row").each(function(i){
            // CHECKBOX
			var rowID 	=	$("td .action .main_checkboxrow", this).attr("id").replaceAll("main_checkboxrow","");
				$(".task-list-sub-row").each(function(x){
					var newID 	= rowID+"_"+x;
					// CHECKBOX
					$("td .action .sub_checkboxrow", this).attr("id", `sub_checkboxrow0${newID}`);

					$("td [name=taskName]", this).attr("id", `taskName${newID}`);
					$("td [name=allottedHours]", this).attr("id", `allottedHours${newID}`);
					$("td [name=taskStartDate]", this).attr("id", `taskStartDate${newID}`);
					$("td [name=taskEndDate]", this).attr("id", `taskEndDate${newID}`);
					$("td [name=taskRemarks]", this).attr("id", `taskRemarks${newID}`);


					$("td [name=taskName]", this).next().attr("id", `invalid-taskName${newID}`);
					$("td [name=allottedHours]", this).next().attr("id", `invalid-allottedHours${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);
					$("td [name=taskEndDate]", this).next().attr("id", `invalid-taskEndDate${newID}`);
					$("td [name=taskRemarks]", this).next().attr("id", `invalid-taskRemarks${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);
					$("td [name=taskStartDate]", this).next().attr("id", `invalid-taskStartDate${newID}`);

					var startDateValue 	=	$(`#taskStartDate${newID}`).val();
					var endDateValue 	=	$(`#taskEndDate${newID}`).val();

					var dateRangePickerStartDate 	= startDateValue != moment() ? startDateValue : moment();
					var dateRangePickerEndDate		= endDateValue 	!= moment() ? endDateValue : moment();

					// INIALIZE DATERANGE 
								$(`#taskStartDate${newID}`).daterangepicker({
									singleDatePicker: true,
									showDropdowns: true,
									autoApply: true,
									startDate: dateRangePickerStartDate,
									endDate: dateRangePickerEndDate,
									locale: {
										format: 'MMMM DD, YYYY'
									},
								}, function(start, end, label) {
										$(`#taskEndDate${newID}`).daterangepicker({
											singleDatePicker: true,
											showDropdowns: true,
											autoApply: true,
											minDate: start,
											startDate: start,
											endDate: end,
											locale: {
												format: 'MMMM DD, YYYY'
											},
										})
								});
				});
        });
	}

	function updateDeleteButton(){
        let count = 0;
        $(".main_checkboxrow").each(function() {
            $(this).prop("checked") && count++;
        });
        $(".btnDeleteRow").attr("disabled", count == 0);
    }

	function deleteTableRow(){
        if ($(`.main_checkboxrow:checked`).length != $(`.main_checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE PROJECT TASK",
				text:               "Are you sure to delete the selected project task?",
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
					$(`.main_checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						Swal.fire({
							icon:              "success",
							title:             "Project task deleted successfully!",
							showConfirmButton: false,
							timer:             2000,
						});
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableRows();
							updateTableTaskList();
							updateDeleteButton();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
    }

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

			headerButton(true);
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


	// ----- GET Project Timeline DATA -----
	function getpettyRepData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {
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

		let data = { request: [] }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["pettyRepID"] = id;
			formData.append("pettyRepID", id);

			if (status != "2") {
				data["pettyRepStatus"] = status;
				formData.append("pettyRepStatus", status);
			}
		}
		// ₱
		var totalBalance = $("#totalBalance").text().replaceAll(",",""); 
		data["action"]    = action;
		data["method"]    = method;
		data["updatedBy"] = sessionID;
		data["pettyRepTotalBalance"] = totalBalance.replaceAll("₱","");

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);
		formData.append("pettyRepTotalBalance", totalBalance.replaceAll("₱",""));

		if (currentStatus == "0" && method != "approve") {
			data["employeeID"]            		= sessionID;
			data["pettyRepReason"]       		= $("[name=pettyRepReason]").val() || null;
			
			formData.append("employeeID", sessionID);
			formData.append("pettyRepReason", $("[name=pettyRepReason]").val() || null);
			
			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["pettyRepID"] = id;
				formData.append("pettyRepID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]    = approversID;
					data["pettyRepStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("pettyRepStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
				
					data["approversID"]     = sessionID;
					data["approversStatus"] = 2;
					data["approversDate"]   = dateToday();
					data["pettyRepStatus"] 	= 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate",dateToday());
					formData.append("pettyRepStatus", 2);
				}
			}


			$(".list-finance-request").each(function(i, obj) {

				var  financeRequestID = $(this).attr("financerequest");

				let temp = {
					financeRequestID,	
				};

				formData.append(`request[${i}][financeRequestID]`, financeRequestID);

				data["request"].push(temp);
			});

		} 

		
		console.log(data);
		
		return isObject ? data : formData;
	}
	// ----- END GET Project Timeline DATA -----

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
		const id 					= decryptString($(this).attr("pettyRepID"));
		const fromCancelledDocument = $(this).attr("cancel" ) == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("pettyRepID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise     				= $(this).attr("revise") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("PCRF", dateToday(), id);
		const status     				= $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data   = getpettyRepData(action, "save", "0", id);
				data.append("pettyRepStatus", 0);
				
				if(!isFromCancelledDocument){
					data.append("revisePettyRepID", id);
					data.delete("pettyRepID");
				}else{
					data.append("pettyRepID", id);
					data.delete("action");
					data.append("action", "update");
				}
				savepettyRep(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getpettyRepData(action, "save", "0", id);
			data.append("pettyRepStatus", 0);
			savepettyRep(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("pettyRepID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("PCRF", dateToday(), id);
		const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     					= getpettyRepData(action, "save", "0", id);
		data.append("pettyRepStatus", 0);

		if (revise) {
			if(!isFromCancelledDocument){
				data.append("revisePettyRepID", id);
				data.delete("pettyRepID");
			}else{
				data.append("pettyRepID", id);
				data.delete("action");
				data.append("action", "update");
			}
			
		}

		savepettyRep(data, "save", null, pageContent);
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
		const id           				= decryptString($(this).attr("pettyRepID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_replenishment");
		// const validateForms 			= validateNoneForm();
		
		removeIsValid("#tablePettyCash");

		if (validate) {

			const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getpettyRepData(action, "submit", "1", id);
	
				if (revise) {
					if(!isFromCancelledDocument){
						data.append("revisePettyRepID", id);
						data.delete("pettyRepID");
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
						moduleID:                133,
						notificationTitle:       "Petty Cash Replenishment",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
				savepettyRep(data, "submit", notificationData, pageContent);
			// if(validateForms){
				
			// }else{
			// 	showNotification("warning2","Cannot submit form, kindly input valid items")
			// }
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("pettyRepID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getpettyRepData(action, "cancelform", "4", id, status);

		savepettyRep(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("pettyRepID"));
		const feedback 		= $(this).attr("code") || getFormCode("SCH", dateToday(), id);
		let tableData  		= getTableData("fms_petty_cash_replenishment_tbl", "", "pettyRepID = " + id);
		let thisCondition 	= false;
		
			


		if (tableData) {
			let pettyRepID  = tableData[0].pettyRepID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getpettyRepData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                133,
					tableID:                 id,
					notificationTitle:       "Petty Cash Replenishment",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
				thisCondition = true;
			} else {
				status = 1;
				notificationData = {
					moduleID:                133,
					tableID:                 id,
					notificationTitle:       "Petty Cash Replenishment",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("pettyRepStatus", status);
			savepettyRep(data, "approve", notificationData, pageContent, pettyRepID);
		
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("pettyRepID"));
		const feedback = $(this).attr("code") || getFormCode("PCRF", dateToday(), id);

		$("#modal_cost_estimate_content").html(preloader);
		$("#modal_cost_estimate .page-title").text("DENY PETTY CASH REPLENISHMENT");
		$("#modal_cost_estimate").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="pettyRepRemarks"
					name="pettyRepRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-pettyRepRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			pettyRepID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_cost_estimate_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("pettyRepID"));
		const feedback = $(this).attr("code") || getFormCode("PCRF", dateToday(), id);

		const validate = validateForm("modal_cost_estimate");
		if (validate) {
			let tableData = getTableData("fms_petty_cash_replenishment_tbl", "", "pettyRepID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("pettyRepID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("pettyRepRemarks", $("[name=pettyRepRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                133,
					tableID: 				 id,
					notificationTitle:       "Petty Cash Replenishment",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savepettyRep(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	// $(document).on("click", "#btnDrop", function() {
	// 	const pettyRepID = decryptString($(this).attr("pettyRepID"));
	// 	const feedback       = $(this).attr("code") || getFormCode("PCRF", dateToday(), id);

	// 	const id = decryptString($(this).attr("pettyRepID"));
	// 	let data = new FormData;
	// 	data.append("pettyRepID", pettyRepID);
	// 	data.append("action", "update");
	// 	data.append("method", "drop");
	// 	data.append("updatedBy", sessionID);

	// 	savepettyRep(data, "drop", null, pageContent);
	// })
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


	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("fms_petty_cash_replenishment_tbl","revisePettyRepID",`revisePettyRepID=`+id);
		// console.log(tableData);
		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED


})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "PETTY CASH REPLENISHMENT";
	let swalText, swalImg;

	// $("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("hide");

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

function savepettyRep(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `petty_cash_replenishment/savepettyRep`,
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
                            swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PCRF", dateCreated, insertedID)} dropped successfully!`;
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
