let FILE_ARRAY 			= [];
let EXIST_FILE_ARRAY 	= [];

$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(55);
    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(55);
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
				"hris_leave_request_tbl", 
				"reviseLeaveRequestID", 
				"reviseLeaveRequestID IS NOT NULL AND leaveRequestStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLeaveRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----




    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					leaveRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (leaveRequestStatus == 0 || leaveRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (leaveRequestStatus == 0) {
						isReadOnly = false;
					}else if(leaveRequestStatus == 7){
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
			window.history.pushState("", "", `${base_url}hris/leave_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/leave_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/leave_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/leave_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const employeeList = getTableData("hris_employee_list_tbl LEFT JOIN hris_designation_tbl USING (designationID)", 
										`employeeLastname, employeeFirstname, employeeMiddlename, employeeID, employeeRanking,
										 hris_designation_tbl.designationName AS designationName, employeeRankingCredit,
											CASE employeeLastname WHEN "" THEN employeeFirstname
											ELSE CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) 
											END  "employeeFullname" `,
										`employeeID != "1" AND employeeStatus != 0 AND employeeStatus != 3 AND employeeStatus != 4 AND employeeStatus != 5 AND employeeStatus != 6`);
	
	const leaveType		= getTableData(`hris_leave_tbl AS hlt LEFT JOIN hris_employee_leave_tbl AS helt USING(leaveID)`, 
										`hlt.*, leaveCredit`, `leaveStatus = '1' AND employeeID = '${sessionID}' `);

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
					{ targets: 3,  width: 100 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 220 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 350 }
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
					{ targets: 3,  width: 100 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 220 },
					{ targets: 6,  width: 100 },
					{ targets: 7,  width: 350 }
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_leave_request_tbl", "approversID")) {
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
			if(isCreateAllowed(55)){
				html = `
           	 	<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			}
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
		let leaveRequestData = getTableData(
			"hris_leave_request_tbl AS hlrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"hlrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hlrt.createdAt AS dateCreated",
			`hlrt.employeeID != ${sessionID} AND leaveRequestStatus != 0 AND leaveRequestStatus != 4`,
			`FIELD(leaveRequestStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(hlrt.submittedAt, hlrt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Leave Type</th>
					<th>Leave Date/s</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		leaveRequestData.map((item) => {
			let {
				fullname,
				leaveRequestID,
				reviseLeaveRequestID,
				leaveRequestCode,
				leaveRequestDate,
				leaveRequestDateFrom,
				leaveRequestDateTo,
				leaveRequestNumberOfDate,
				leaveID,
				leaveName,
				leaveRequestRemainingLeave,
				leaveStatus,
				leaveWorkingDay,
				timeIn,
				timeOut,
				leaveDocuments,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				leaveRequestReason,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "";
			let dateApproved  = leaveRequestStatus == 2 || leaveRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = leaveRequestStatus != 0 ? "btnView" : "btnEdit";


			if (isImCurrentApprover(approversID, approversDate, leaveRequestStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
							<tr class="${btnClass}" id="${encryptString(leaveRequestID )}">
								<td>${getFormCode("LRF", createdAt, leaveRequestID )}</td>
								<td>${fullname}</td>
								<td>${leaveName}</td>
								<td>${leaveRequestDate}</td>
								<td>
									${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}
								</td>
								<td>
									${dateCreated ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
															<b>Created: </b><span style="color:#000;">${dateCreated}</span>
														</div>` : ``}
										${dateSubmitted ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
															<b>Submitted: </b><span style="color:#000;">${dateSubmitted}</span>
														</div>` : ``}
										${dateApproved != "-" ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
															<b>Approved: </b><span style="color:#000;">${dateApproved}</span>
														</div>` : ``}
								</td>
								<td class="text-center">
									${getStatusStyle(leaveRequestStatus)}
								</td>
								<td>${remarks}</td>
							</tr>
						`;
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
		let leaveRequestData = getTableData(
			"hris_leave_request_tbl AS hlrt LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)",
			"hlrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hlrt.createdAt AS dateCreated",
			`hlrt.employeeID = ${sessionID}`,
			`FIELD(leaveRequestStatus, 0, 6, 1, 2, 3, 4, 5, 7), COALESCE(hlrt.submittedAt, hlrt.createdAt)`
		);
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Employee Name</th>
					<th>Leave Type</th>
					<th>Leave Date/s</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		leaveRequestData.map((data) => {
			let {
				fullname,
				leaveRequestID,
				reviseLeaveRequestID,
				leaveRequestCode,
				leaveRequestDate,
				leaveRequestDateFrom,
				leaveRequestDateTo,
				leaveRequestNumberOfDate,
				leaveID,
				leaveName,
				leaveRequestRemainingLeave,
				leaveStatus,
				leaveWorkingDay,
				timeIn,
				timeOut,
				leaveDocuments,
				approversID,
				approversDate,
				leaveRequestStatus,
				leaveRequestRemarks,
				leaveRequestReason,
				submittedAt,
				createdAt,
			} = data;

			let remarks       = leaveRequestRemarks ? leaveRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "";
			let dateApproved  = leaveRequestStatus == 2 || leaveRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = leaveRequestStatus != 0 ? "btnView" : "btnEdit";
		
				
			html += `
			<tr class="${btnClass}" id="${encryptString(leaveRequestID )}">
				<td>${getFormCode("LRF", createdAt, leaveRequestID )}</td>
				<td>${fullname}</td>
				<td>${leaveName}</td>
				<td>${leaveRequestDate}</td>
				<td>
					${employeeFullname(getCurrentApprover(approversID, approversDate, leaveRequestStatus, true))}
				</td>
				<td>
					${dateCreated ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Created: </b><span style="color:#000;">${dateCreated}</span>
										</div>` : ``}
						${dateSubmitted ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Submitted: </b><span style="color:#000;">${dateSubmitted}</span>
										</div>` : ``}
						${dateApproved != "-" ? `<div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
											<b>Approved: </b><span style="color:#000;">${dateApproved}</span>
										</div>` : ``}
				</td>
				<td class="text-center">
					${getStatusStyle(leaveRequestStatus)}
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
				leaveRequestID     = "",
				leaveRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (leaveRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						leaveRequestID="${encryptString(leaveRequestID)}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF",createdAt, leaveRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (leaveRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if(leaveRequestStatus == 2){
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						leaveRequestID="${encryptString(leaveRequestID)}"
						code="${getFormCode("LRF", createdAt, leaveRequestID)}"
						status="${leaveRequestStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
				} else if (leaveRequestStatus == 3) {
					// DENIED - FOR REVISE
					if(!isDocumentRevised(leaveRequestID)){
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
							
				} else if (leaveRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(leaveRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"
							status="${leaveRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (leaveRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							leaveRequestID="${encryptString(leaveRequestID)}"
							code="${getFormCode("LRF", createdAt, leaveRequestID)}"><i class="fas fa-ban"></i> 
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


	$(document).on("change",`[name=leaveWorkingDay]`, function(){
		let thisValue 		= $(this).val();
		let numberOfDays	= thisValue == "0" ? "0.5" : "1";
		$(`[name=timeIn]`).prop("disabled",thisValue != "0" ? true:false);
		$(`[name=timeOut]`).prop("disabled",thisValue != "0" ? true:false);  

		$(`[name=leaveRequestNumberOfDate]`).val(numberOfDays);
	});

	$(document).on("change",`[name=leaveID]`, function(){
		let thisValue 		= $(this).val();
		let leaveCredit 	= $(`option:selected`, this).attr("leaveCredit");
		$("[name=leaveCredit]").val(leaveCredit);
		initLeaveDate(thisValue == "1");
	});



	function getLeaveType(leaveID = null){
		let html = `<option disabled ${!leaveID && "selected"} >Select Leave Type</option>`;
		
		leaveType.map((value, index)=>{
			html += `<option
						value			= "${value.leaveID}"
						leavename 		= "${value.leaveName}"
						leavecredit	= "${value.leaveCredit}"
						${value.leaveID == leaveID ? "selected" : "" }
						>${value.leaveName}</option>`;
		});

		return html;
	}

	function initLeaveDate(isSickLeave = false, value = "", isDisabled = false ){
		let minDate = moment(isDisabled ? value : "").subtract(10, "d").format("MMMM DD, YYYY");
		
		$(`[name=leaveRequestDate]`).daterangepicker({
			datesDisabled:["January 24, 2022", "January 25, 2022"],
			// startDate: moment(value).format("MMMM DD, YYYY"),
			minDate,
			maxDate: isSickLeave ? moment().format("MMMM DD, YYYY") : false,
			singleDatePicker: true,
			showDropdowns: true,
			autoApply: true,
			locale: {
				format: 'MMMM DD, YYYY'
			},
			isInvalidDate: function(date) {
				if (moment(date).format("MMMM DD, YYYY") == 'January 24, 2022') {
					 return true; 
				}
			 }
		});	


	}



    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;
		let {
			leaveRequestID       		= "",
			reviseLeaveRequestID 		= "",
			employeeID              	= "",
			leaveRequestCode			= "",
			leaveRequestDate			= "",
			leaveRequestDateFrom		= "",
			leaveRequestDateTo			= "",
			leaveRequestNumberOfDate	= "",
			leaveID						= "",
			leaveName					= "",
			leaveRequestRemainingLeave	= "",
			leaveStatus					= "",
			leaveWorkingDay				= "",
			timeIn						= "",
			timeOut						= "",
			leaveDocument				= "",
			approversID					= "",
			approversStatus				= "",
			approversDate				= "",
			leaveRequestStatus			= "",
			leaveRequestRemarks			= "",
			leaveRequestReason			= "",
			submittedAt					= "",
			createdAt					= "",
		} = data && data[0];
	
		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----


		if(leaveDocument){
			let leaveDocumentsArr = leaveDocument.split("|");
			leaveDocumentsArr.map(file=>{
					EXIST_FILE_ARRAY.push(file);
			});
		}

		let disabledFileLeave = "disabled";
		if(leaveRequestStatus=="1" || leaveRequestStatus=="0" ){
			let approversArray  = approversID.split("|");
			let lastlength 		= approversArray.length;
			let lastApproverID 	= approversArray[parseInt(lastlength) - 1];
			disabledFileLeave 	= lastApproverID == sessionID ? "" : "disabled";
		}


		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("leaveRequestID", encryptString(leaveRequestID));
		$("#btnBack").attr("status", leaveRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : ``;
		
		let button = formButtons(data, isRevise, isFromCancelledDocument);



		let reviseDocumentNo    = isRevise ? leaveRequestID : reviseLeaveRequestID;
		let documentHeaderClass = isRevise || reviseLeaveRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseLeaveRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseLeaveRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("LRF", createdAt, reviseDocumentNo)}
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
							${leaveRequestID && !isRevise ? getFormCode("LRF", createdAt, leaveRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${leaveRequestStatus && !isRevise ? getStatusStyle(leaveRequestStatus) : "---"}
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
								${getDateApproved(leaveRequestStatus, approversID, approversDate)}
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
							${leaveRequestRemarks && !isRevise ? leaveRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_leave_request">
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

			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Leave Type <code>*</code> </label>
					<select class="form-control validate select2 w-100" name="leaveID" required ${disabled}>
						${getLeaveType(leaveID)}
					</select>
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Leave Credit/s</label>
					<input type="text" class="form-control" name="leaveCredit" disabled value="${leaveRequestRemainingLeave}">
				</div>
			</div>
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Status</label>
					<select class="form-control validate select2 w-100" name="leaveStatus" ${disabledFileLeave}>
							<option value="0" ${leaveStatus == "0" ? "selected" : ""}>Unpaid</option>
							<option value="1" ${leaveStatus == "1" ? "selected" : ""}>Paid</option>
					</select>
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Date <code>*</code> </label>
					<input type="button" class="form-control text-left" name="leaveRequestDate" value="" required ${disabled}>
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Working Day <code>*</code> </label>
					<select class="form-control validate select2 w-100" name="leaveWorkingDay" required ${disabled}>
							<option value="1" ${leaveWorkingDay == "1" ? "selected" : ""}>Whole-day</option>
							<option value="0" ${leaveWorkingDay == "0" ? "selected" : ""}>Half-day</option>
					</select>
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Time In <code>*</code></label>
					<input type="time" class="form-control" name="timeIn" ${disabled} value="${timeIn}">
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Time Out <code>*</code></label>
					<input type="time" class="form-control" name="timeOut" ${disabled} value="${timeOut}">
				</div>
			</div>

			<div class="col-md-2 col-sm-12">
				<div class="form-group">
					<label>Number of Day/s </label>
					<input type="text" class="form-control" name="leaveRequestNumberOfDate" disabled value="${leaveRequestNumberOfDate || "1" }">
				</div>
			</div>

			<div class="col-md-12 col-sm-12">
				<div class="form-group">
					<label>Reason ${!disabled ? "<code>*</code>" : ""}</label>
					<div class="remarks">
						<textarea rows="4" style="resize: none" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/]['][''][;][:][-][_][()][%][&][*][ ]" name="leaveRequestReason" required id="remarks" ${disabled} >${leaveRequestReason}</textarea>
					</div>
				</div>
			</div>
			
			<div class="col-12">
				<div class="row">
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Support Documents </label>
						 	<input  type="file" 
								class="form-control" 
								name="leaveDocuments" 
								id="leaveDocuments"
								accept="image/*, .pdf, .doc, .docx"  multiple ${disabled}>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12">
				<div class="row row-display-image">
					${displayImage(false , readOnly, "assets/upload-files/leave-documents")}
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
			initHours();
			initLeaveDate( leaveID== "1", leaveRequestDateFrom, disabled == "disabled");
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
			
			if($(`[name=leaveWorkingDay]`).val() != "0.5"){
				$(`[name=timeIn]`).prop("disabled",true);
				$(`[name=timeOut]`).prop("disabled",true); 
			}

			$(`[name=leaveStatus]`).prop("disabled", leaveRequestStatus == "2");

			return html;
		}, 200);
	}
	// ----- END FORM CONTENT -----

    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		FILE_ARRAY 		 = [];
		EXIST_FILE_ARRAY = [];
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

			headerButton(true, "Add Leave Request");
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


	// ----- GET Leave Request DATA -----
	function getleaveRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		let data = { tasks: [], files: [], }, formData = new FormData;
		const approversID = method != "approve" && moduleApprover;

		if (id) {
			data["leaveRequestID"] = id;
			formData.append("leaveRequestID", id);

			if (status != "2") {
				data["leaveRequestStatus"] = status;
				formData.append("leaveRequestStatus", status);
			}
		}

		data["action"]                = action;
		data["method"]                = method;
		data["updatedBy"]             = sessionID;

		formData.append("action", action);
		formData.append("method", method);
		formData.append("updatedBy", sessionID);

		if (currentStatus == "0" && method != "approve") {

			var existLeaveDocuments 			= EXIST_FILE_ARRAY.join("|");

			let leaveRequestCode			= $(`[name=leaveRequestCode]`).val();
			let leaveRequestDate			= $(`[name=leaveRequestDate]`).val();
			let leaveRequestDateFrom		= moment($(`[name=leaveRequestDate]`).val()).format("YYYY-MM-DD");
			let leaveRequestDateTo			= moment($(`[name=leaveRequestDate]`).val()).format("YYYY-MM-DD");
			let leaveRequestNumberOfDate	= $(`[name=leaveRequestNumberOfDate]`).val();
			let leaveID						= $(`[name=leaveID]`).val();
			let leaveName					= $(`[name=leaveID] option:selected`).attr("leavename");
			let leaveRequestRemainingLeave	= $(`[name=leaveCredit]`).val();
			let leaveStatus					= $(`[name=leaveStatus]`).val();
			let leaveWorkingDay				= $(`[name=leaveWorkingDay]`).val();
			let timeIn						= $(`[name=timeIn]`).val();
			let timeOut						= $(`[name=timeOut]`).val();



			data["leaveRequestCode"]			= leaveRequestCode;
			data["leaveRequestDate"]			= leaveRequestDate;
			data["leaveRequestDateFrom"]		= leaveRequestDateFrom;
			data["leaveRequestDateTo"]			= leaveRequestDateTo;
			data["leaveRequestNumberOfDate"]	= leaveRequestNumberOfDate;
			data["leaveID"]						= leaveID;
			data["leaveName"]					= leaveName;
			data["leaveRequestRemainingLeave"]	= leaveRequestRemainingLeave;
			data["leaveStatus"]					= leaveStatus;
			data["leaveWorkingDay"]				= leaveWorkingDay;
			data["timeIn"]						= timeIn;
			data["timeOut"]						= timeOut;


			formData.append("leaveRequestCode", 			leaveRequestCode);
			formData.append("leaveRequestDate", 			leaveRequestDate);
			formData.append("leaveRequestDateFrom", 		leaveRequestDateFrom);
			formData.append("leaveRequestDateTo", 			leaveRequestDateTo);
			formData.append("leaveRequestNumberOfDate", 	leaveRequestNumberOfDate);
			formData.append("leaveID", 						leaveID);
			formData.append("leaveName", 					leaveName);
			formData.append("leaveRequestRemainingLeave", 	leaveRequestRemainingLeave);
			formData.append("leaveStatus", 					leaveStatus);
			formData.append("leaveWorkingDay", 				leaveWorkingDay);
			formData.append("timeIn", 						timeIn);
			formData.append("timeOut", 						timeOut);





			data["employeeID"]            		= sessionID;
			data["leaveRequestReason"]       	= $("[name=leaveRequestReason]").val() || null;
			data["existLeaveDocuments"] 		= existLeaveDocuments;
		

			formData.append("employeeID", sessionID);
			formData.append("leaveRequestReason", $("[name=leaveRequestReason]").val() || null);
			formData.append("existLeaveDocuments", existLeaveDocuments);
			
			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["leaveRequestID"] = id;
				formData.append("leaveRequestID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           	=  approversID;
					data["leaveRequestStatus"] 		=  1;

					formData.append("approversID",  		approversID);
					formData.append("leaveRequestStatus",  	1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
				
					data["approversID"]           	=  sessionID;
					data["approversStatus"]       	=  2;
					data["approversDate"]         	=  dateToday();
					data["leaveRequestStatus"] 		=  2;

					formData.append("approversID",  		sessionID);
					formData.append("approversStatus",  	2);
					formData.append("approversDate",  		dateToday());
					formData.append("leaveRequestStatus",  	2);
				}
			}

			for (let index = 0; index < FILE_ARRAY.length; index++){
				formData.append(`files[${index}]`, FILE_ARRAY[index]);
				data["files"].push(FILE_ARRAY[index]);
				
				formData.append(`files${index}`, FILE_ARRAY[index]);
			}
		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET Leave Request DATA -----


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
		const id 					= decryptString($(this).attr("leaveRequestID"));
		const fromCancelledDocument = $(this).attr("cancel" ) == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         				= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const employeeID 				= $(this).attr("employeeID");
		const feedback   				= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const status     				= $(this).attr("status");
		const revise     				= $(this).attr("revise");

		if (status != "false" && status != 0) {
			
			if (revise != "false" && status != "7") {
				const action = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
				const data   = getleaveRequestData(action, "save", "0", id);
				data.append("leaveRequestStatus", 0);
				if(!isFromCancelledDocument){
					data.append("reviseLeaveRequestID", id);
					data.delete("leaveRequestID");
				}else{
					data.append("leaveRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}
				
				saveleaveRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getleaveRequestData(action, "save", "0", id);
			data.append("leaveRequestStatus", 0);

			saveleaveRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       					= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise   					= $(this).attr("revise") == "true";
		const feedback 					= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		const action   					= revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     					= getleaveRequestData(action, "save", "0", id);

		data.append("leaveRequestStatus", 0);

		if (revise) {
			if(!isFromCancelledDocument){
				data.append("reviseLeaveRequestID", id);
				data.delete("leaveRequestID");
			}else{
				data.append("leaveRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		} 

		let btnBackCondition = $("#btnBack").attr("status");

		if(btnBackCondition != "7"){
			saveleaveRequest(data, "save", null, pageContent);
		}else{ 
			$("#page_content").html(preloader);
			pageContent();
		}
		
	});
	// ----- END SAVE DOCUMENT -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id           				= decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument 	= $(this).attr("cancel") == "true";
		const revise       				= $(this).attr("revise") == "true";
		const validate     				= validateForm("form_leave_request");
			if (validate) {
					const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
					const data   = getleaveRequestData(action, "submit", "1", id);
		
					if (revise) {
						if(!isFromCancelledDocument){
							data.append("reviseLeaveRequestID", id);
							data.delete("leaveRequestID");
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
							moduleID:                55,
							notificationTitle:       "Leave Request",
							notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
							notificationType:        2,
							employeeID,
						};
					}
					saveleaveRequest(data, "submit", notificationData, pageContent);
				
			}
		
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("leaveRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getleaveRequestData(action, "cancelform", "4", id, status);

		saveleaveRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       		= decryptString($(this).attr("leaveRequestID"));
		const feedback 		= $(this).attr("code") || getFormCode("LRF", dateToday(), id);
		let tableData  		= getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
		
			let leaveRequestID  = tableData[0].leaveRequestID;
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;
			let leaveStatus 	= $(`[name=leaveStatus]`).val();

			let data 						= getleaveRequestData("update", "approve", "2", id);
			data.append("approversStatus", 	updateApproveStatus(approversStatus, 2));
			let dateApproved 				= updateApproveDate(approversDate)
			data.append("approversDate", 	dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                55,
					tableID:                 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                55,
					tableID:                 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("leaveRequestStatus", status);
			data.append("leaveStatus", leaveStatus);
			saveleaveRequest(data, "approve", notificationData, pageContent, leaveRequestID);
		
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		$("#modal_leave_request_content").html(preloader);
		$("#modal_leave_request .page-title").text("DENY Leave Request");
		$("#modal_leave_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="leaveRequestRemarks"
					name="leaveRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-leaveRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			leaveRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_leave_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("leaveRequestID"));
		const feedback = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		const validate = validateForm("modal_leave_request");
		if (validate) {
			let tableData = getTableData("hris_leave_request_tbl", "", "leaveRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", 				"update");
				data.append("method", 				"deny");
				data.append("leaveRequestID", 		id);
				data.append("approversStatus", 		updateApproveStatus(approversStatus, 3));
				data.append("approversDate", 		updateApproveDate(approversDate));
				data.append("leaveRequestRemarks", 	$("[name=leaveRequestRemarks]").val()?.trim());
				data.append("updatedBy", 			sessionID);

				let notificationData = {
					moduleID:                55,
					tableID: 				 id,
					notificationTitle:       "Leave Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				saveleaveRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const leaveRequestID = decryptString($(this).attr("leaveRequestID"));
		const feedback       = $(this).attr("code") || getFormCode("LRF", dateToday(), id);

		const id = decryptString($(this).attr("leaveRequestID"));
		let data = new FormData;
		data.append("leaveRequestID", 	leaveRequestID);
		data.append("action", 			"update");
		data.append("method", 			"drop");
		data.append("updatedBy", 		sessionID);

		saveleaveRequest(data, "drop", null, pageContent);
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


	// CHECK IF THE DOCUMENT IS ALREADY REVISED
	function isRevised(id = null){
		let revised = false;
		var tableData = getTableData("hris_leave_request_tbl","reviseLeaveRequestID",`reviseLeaveRequestID=`+id);

		revised = tableData.length > 0 ? true : false;
		return revised; 
	}
	// END CHECK IF THE DOCUMENT IS ALREADY REVISED


})


// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Leave Request";
	let swalText, swalImg;

	$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("hide");

	switch (method) {
		case "save":
			swalTitle = `SAVE DRAFT`;
			swalText  = "Are you sure to save this document?";
			swalImg   = `${base_url}assets/modal/draft.svg`;
			break;
		case "submit":
			var condition = $("[name=timelineProposedBudget]").attr("timelineBudgetStatus");
			console.log(condition);
			if(condition != 0){
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalText  = "Are you sure to submit this document?";
				swalImg   = `${base_url}assets/modal/add.svg`;
			}else{
				swalTitle = `PROPOSE ${title.toUpperCase()}`;
				swalText  = "Are you sure to submit the project timeline for proposal";
				swalImg   = `${base_url}assets/modal/add.svg`;
			}
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

function saveleaveRequest(data = null, method = "submit", notificationData = null, callback = null, lastApproverID = 0) {
	let thisReturnData = false;
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `leave_request/saveleaveRequest`,
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
							swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `Leave Request saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("LRF", dateCreated, insertedID)} dropped successfully!`;
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
							$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("show");
						}
					}
							
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_leave_request").text().length > 0 && $("#modal_leave_request").modal("show");
					}
				}
			}
		});
	}
	return thisReturnData;
}

// --------------- END DATABASE RELATION ---------------


function triggerItemQty(){
	$("[name=quantity]").each(function(i, obj) {
		$("#"+this.id).val($("#"+this.id).attr("value"));
	}) 
}


function displayImage(fileList = false, readOnly = false, path = "assets/upload-files/leave-documents"){
	let html 		= ``;
	
	let link 		= true;
	if(EXIST_FILE_ARRAY || fileList){
		let existFile 		= EXIST_FILE_ARRAY || [] ;
		let parameterArray 	= fileList ? fileList.split("|") : [];
		
		let array		= [...existFile, ...parameterArray];
		array.map(list =>{
			let otherAttr = link ? `
				href="${base_url+path+"/"+list}" 
				target="_blank"` : `href="javascript:void(0)"`;
			html += `	<div class="col-md-2 col-sm-2 image-column">
							<div class="form-group">
								<div class="d-flex justify-content align-items-center" style="font-size: 12px; border: 1px solid black; border-radius: 5px; color:black;background: #d1ffe0; padding: 2px 10px;">
										${!readOnly ? `<span class="btnRemoveImage pr-2" style="cursor: pointer" filename="${list}"><i class="fas fa-close"></i></span>` : ""}
										<a class="filename"
											title="${list}"
											style="display: block;
											color:black !important;
											width: 90%;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;"
											${readOnly ? otherAttr : ""}>
											${list}
										</a>
								</div>
							</div>
						</div>`;
		});
		$("#leaveDocuments").val("");
	}
	setTimeout(() => {
		$(".row-display-image").html(html);
	}, 800);
}


    // // ----- REMOVE IMAGE -----
    $(document).on("click", `.btnRemoveImage`, function() {
		let thisDivision 	= $(this).closest(".image-column");
		let filename 		= $(this).attr("filename");
		// FOR INPUT VALUE
		let fileDataArray 	= FILE_ARRAY.filter(data => data.name != filename);
		let tempFileData 	= [];
		fileDataArray.map(x =>{
			tempFileData.push(x);
		});
		FILE_ARRAY = tempFileData;

		// FOR EXIST VALUE
		let existFileDataArray 	= EXIST_FILE_ARRAY.filter(data => data == filename);
		let tempExistFileData 	= [];
			if(existFileDataArray){
				EXIST_FILE_ARRAY.filter(data => data != filename).map(file=>{
					tempExistFileData.push(file);
				});
			}
			EXIST_FILE_ARRAY = tempExistFileData;
		// REMOVING DIVISION
        thisDivision.fadeOut(500, function(){
			thisDivision.remove();
		});

    })
    // ----- END REMOVE IMAGE -----


	    // ----- SELECT IMAGE -----
		$(document).on("change", "[id=leaveDocuments]", function(e) {
			e.preventDefault();
			let filesArray = [];
			let data 	   = [];
			let thisArray  = this.files;

			for (let index = 0; index < thisArray.length; index++) {
				let filesize 		= this.files[index].size/1024/1024; // Size in MB
				let filename 		= this.files[index].name;
				let filenameSplit 	= filename.split(".");
				let filetype		= filenameSplit.pop();
				if (filesize > 10) {
					showNotification("danger", `${filename} <br> File size must be less than or equal to 10mb`);
				} else if (filetype	== "image" || filetype	== "jpeg" || filetype	== "jpg" || filetype	== "png" || filetype	== "docx" || filetype	== "pdf") {
					FILE_ARRAY.push(this.files[index]);
				} else {
					showNotification("danger", `${filename} <br>  Invalid file type`);
				}	
			}

			FILE_ARRAY.map(files=>{
				let filename = files.name;
				filesArray.push(filename);
			});
			console.log(FILE_ARRAY);
			displayImage(filesArray.join("|"), false);
		})
		// ----- END SELECT IMAGE -----

