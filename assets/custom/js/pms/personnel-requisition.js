$(document).ready(function() {

	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(50);
	if(!allowedUpdate){
		$("#page_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnSubmit").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(50);
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
				"pms_personnel_requisition_tbl", 
				"reviseRequisitionID", 
				"reviseRequisitionID IS NOT NULL AND requisitionStatus != 4");
			return revisedDocumentsID.map(item => item.reviseRequisitionID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false) => {
			const tableData = getTableData("pms_personnel_requisition_tbl", "", "requisitionID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					requisitionStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (requisitionStatus == 0 || requisitionStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (requisitionStatus == 0) {
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
			let id = decryptString(view_id);
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
			window.history.pushState("", "", `${base_url}pms/personnel_requisition?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}pms/personnel_requisition?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}pms/personnel_requisition?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}pms/personnel_requisition`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
			
		 const employeeList = getTableData(
            "hris_employee_list_tbl", 
			"CONCAT(employeeFirstname,' ',employeeMiddlename,' ',employeeLastname) as fullname,employeeID",
            "employeeStatus = 1 OR employeeStatus = 2 OR employeeStatus = 5");

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
					{ targets: 4,  width: 250 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80  },
					{ targets: 8, width: 250 },
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
					{ targets: 4,  width: 250 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 250 },
					{ targets: 7,  width: 80  },
					{ targets: 8, width: 250 },
				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("pms_personnel_requisition_tbl", "approversID")) {
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
			if(isCreateAllowed(50)){
				html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
				}
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);
		let transferRequestData = getTableData(
			`pms_personnel_requisition_tbl AS mwt 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
			LEFT JOIN hris_department_tbl AS hdt ON hdt.departmentID = mwt.departmentID
			LEFT JOIN hris_designation_tbl AS hd ON hd.designationID = mwt.designationID`,
			`requisitionID,
			requisitionRemarks,
			designationName,
			departmentName,
			CASE 
				WHEN personnelOption = 1 THEN 'Permanent'
				WHEN personnelOption = 2 THEN 'Non-Permanent'
				WHEN personnelOption = 3 THEN 'Other Justifications'
				END as natureRequest, 
			personnelDescription,
			requisitionStatus,
			approversID,
			approversDate,
			mwt.submittedAt,
			CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
			mwt.createdAt,
			mwt.createdAt AS dateCreated`,
			`mwt.employeeID != ${sessionID} AND requisitionStatus != 0 AND requisitionStatus != 4`,
			`FIELD(requisitionStatus, 0, 1, 3, 2, 4, 5), COALESCE(mwt.submittedAt, mwt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead >
                <tr>
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Open Designation</th>
					<th>Nature of Request</th>
					<th>Description</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		transferRequestData.map((item) => {
			let {
				fullname,
				requisitionID,
				departmentName,
				designationName,
				requisitionRemarks,
				personnelDescription,
				natureRequest,
				requisitionStatus,
				approversID,
				approversDate,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = requisitionRemarks ? requisitionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = requisitionStatus == 2 || requisitionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = requisitionStatus != 0 ? "btnView" : "btnEdit";

			let button = requisitionStatus != 0 ? `
			<button class="btn btn-view w-100 btnView" id="${encryptString(requisitionID)}"><i class="fas fa-eye"></i> View</button>` : `
			<button 
				class="btn btn-edit w-100 btnEdit" 
				id="${encryptString(requisitionID)}" 
				code="${getFormCode("PRF", createdAt, requisitionID)}"><i class="fas fa-edit"></i> Edit</button>`;

			if (isImCurrentApprover(approversID, approversDate, requisitionStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="${btnClass}" id="${encryptString(requisitionID)}">
					<td>${getFormCode("PRF", createdAt, requisitionID)}</td>
					<td>${fullname}</td>
					<td>
						<div>
							${designationName || '-'}
						</div>
						<small style="color:#848482;">${departmentName || '-'}</small>
					</td>
					<td>${natureRequest || '-'}</td>
					<td>${personnelDescription || '-'}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, requisitionStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(requisitionStatus)}
					</td>
					<td>${remarks || '-'}</td>
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
		let materialWithdrawalData = getTableData(
			`pms_personnel_requisition_tbl AS mwt 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
			LEFT JOIN hris_department_tbl AS hdt ON hdt.departmentID = mwt.departmentID
			LEFT JOIN hris_designation_tbl AS hd ON hd.designationID = mwt.designationID`,
			`requisitionID,
			requisitionRemarks,
			designationName,
			departmentName, 
			personnelDescription,
			CASE 
				WHEN personnelOption = 1 THEN 'Permanent'
				WHEN personnelOption = 2 THEN 'Non-Permanent'
				WHEN personnelOption = 3 THEN 'Other Justifications'
				END as natureRequest,
			requisitionStatus,
			approversID,
			approversDate,
			mwt.submittedAt,
			CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, 
			mwt.createdAt,
			mwt.createdAt AS dateCreated`,
			`mwt.employeeID = ${sessionID}`,
			`FIELD(requisitionStatus, 0, 1, 3, 2, 4, 5), COALESCE(mwt.submittedAt, mwt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
					<th>Document No.</th>
					<th>Prepared By</th>
					<th>Open Designation</th>
					<th>Nature of Request</th>
					<th>Description</th>
					<th>Current Approver</th>
					<th>Date</th>
					<th>Status</th>
					<th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		materialWithdrawalData.map((item) => {
			let {
				fullname,
				requisitionID,
				departmentName,
				designationName,
				requisitionRemarks,
				personnelDescription,
				natureRequest,
				requisitionStatus,
				approversID,
				approversDate,
				submittedAt,
				createdAt,
			} = item;

			let remarks       = requisitionRemarks ? requisitionRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = requisitionStatus == 2 || requisitionStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = requisitionStatus != 0 ? "btnView" : "btnEdit";
			let button = requisitionStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(requisitionID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(requisitionID)}" 
                code="${getFormCode("PRF", createdAt, requisitionID)}"><i class="fas fa-edit"></i> Edit</button>`;

			html += `
            <tr class="${btnClass}" id="${encryptString(requisitionID)}">
                <td>${getFormCode("PRF", createdAt, requisitionID)}</td>
                <td>${fullname}</td>
				<td>
						<div>
							${designationName || '-'}
						</div>
						<small style="color:#848482;">${departmentName || '-'}</small>
				</td>
				<td>${natureRequest || '-'}</td>
				<td>${personnelDescription || '-'}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, requisitionStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(requisitionStatus)}
                </td>
				<td>${remarks || '-'}</td>
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
				requisitionID     = "",
				requisitionStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (requisitionStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit px-5 p-2" 
						id="btnSubmit" 
						requisitionID="${requisitionID}"
						code="${getFormCode("PRF", createdAt, requisitionID)}"
						revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2" 
							id="btnCancel"
							revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							requisitionID="${requisitionID}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (requisitionStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							requisitionID="${requisitionID}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"
							status="${requisitionStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (requisitionStatus == 2) {
					// DROP
					button = `
					<button type="button" 
						class="btn btn-cancel px-5 p-2"
						id="btnDrop" 
						requisitionID="${encryptString(requisitionID)}"
						code="${getFormCode("PRF", createdAt, requisitionID)}"
						status="${requisitionStatus}"><i class="fas fa-ban"></i> 
						Drop
					</button>`;
					
				} else if (requisitionStatus == 3) {
					
					// DENIED - FOR REVISE
					if (!isDocumentRevised(requisitionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							requisitionID="${encryptString(requisitionID)}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"
							status="${requisitionStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (requisitionStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(requisitionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							requisitionID="${encryptString(requisitionID)}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"
							status="${requisitionStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (requisitionStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 p-2" 
							id="btnApprove" 
							requisitionID="${encryptString(requisitionID)}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 p-2"
							id="btnReject" 
							requisitionID="${encryptString(requisitionID)}"
							code="${getFormCode("PRF", createdAt, requisitionID)}"><i class="fas fa-ban"></i> 
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

    const departmentList = getTableData(
		"hris_department_tbl ", 
		"departmentID,departmentName ",
		"departmentStatus = 1");

    // ----- GET DEPARTMENT LIST -----
    function getDepartmentList(id = null, display = true) {
        let html ='';
      
        html += departmentList.map(dept => {

            return `
            <option 
                value       = "${dept.departmentID}" 
                ${dept.departmentID  == id && "selected"}>
                ${dept.departmentName}
            </option>`;
        })

        return display ? html : departmentList;
    }
    // ----- END GET DEPARTMENT LIST -----

    // -----DESIGNATION CONTENT -----
    function designationList(deptID = false,dsgID = false) {
		
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let paramCondition = deptID == false ? "":"AND departmentID ="+deptID; 
    const data = getTableData("hris_designation_tbl LEFT JOIN hris_department_tbl USING(departmentID)", "designationID,designationName", "designationStatus = '1' AND departmentStatus ='1'"+paramCondition, "");
            let html = ` <option value="" disabled ${dsgID == false ? "selected": ""} >Select Designation</option>`;
            if(deptID != false){
                    data.map((dsg, index, array) => {
                    html += `<option departmentid="${deptID}" value="${dsg.designationID}" ${dsg.designationID == dsgID  ? "selected":""}>${dsg.designationName}</option>`;
                })
            }
            $("#designationID").html(html);
    }
    // ----- END DESIGNATION CONTENT -----

    // -----REPORT EMPLOYEE CONTENT -----
    function reportEmployeeList(deptID =false,empID1 = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let paramCondition = deptID == false ? "":"AND departmentID ="+deptID;

    const data = getTableData("hris_employee_list_tbl", "CONCAT(employeeFirstname ,', ', employeeLastname) as fullname,employeeID ", "employeeStatus = '1' AND employeeRanking = 'Officer' "+paramCondition, "");
            let html = ` <option value="" disabled ${empID1 == false ? "selected": ""} >Select Employee</option>`;
            if(deptID != false){
                    data.map((emp1, index, array) => {
                    html += `<option value="${emp1.employeeID}" ${emp1.employeeID == empID1  ? "selected":""}>${emp1.fullname}</option>`;
                })
            }
            $("#personnelReportByID").html(html);
    }
    // ----- END REPORT EMPLOYEE CONTENT -----


    // -----REPORT EMPLOYEE CONTENT -----
    function reportEmployeeList2(designID = false,deptID =false,empID2 = false) {
        // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
        let paramCondition1 = deptID == false ? "":"AND departmentID ="+deptID;
        let paramCondition2 =designID == false ? "":" AND designationID="+designID; 
        const data = getTableData("hris_employee_list_tbl", "CONCAT(employeeFirstname ,', ', employeeLastname) as fullname,employeeID ", "employeeStatus = '1' "+paramCondition1+" "+paramCondition2, "");
                let html = ` <option value="" disabled ${empID2 == false ? "selected": ""} >Select Employee</option>`;
                if(designID != false){
                 
                    data.map((emp2, index, array) => {
                        html += `<option value="${emp2.employeeID}" ${emp2.employeeID == empID2  ? "selected":""}>${emp2.fullname}</option>`;
                    })
                }
                $("#personnelReplacement").html(html);
        }
        // ----- END REPORT EMPLOYEE CONTENT -----

        $(document).on("change","#departmentID",function(){
            let thisValue   =   $(this).val();
            designationList (thisValue,"");
            reportEmployeeList(thisValue,"");
            // initAll();
        });

        $(document).on("change","#designationID",function(){
            let thisValue   =   $(this).val();
            let departmentID = $(this).find(":selected").attr("departmentid");
            // reportEmployeeList(thisValue,departmentID,"");
            reportEmployeeList2(thisValue,departmentID,"");
            // initAll();
        });
    

    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			requisitionID       	= "",
			reviseRequisitionID 	= "",
			employeeID              = "",
	
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			
			requisitionStatus   = false,
		
			submittedAt             = false,
			createdAt               = false,
			departmentID			= "",
			designationID			= "",
			salaryPackage			= "",
			personnelReportByID		= "",
			radioGroup1				= "",
			radioGroup2				= "",
			personnelOption			= "",
			personnelReplacement	= "",
			personnelDuration		= "",
			personnelOthers			= "",
			requisitionRemarks		= "",
			personnelQualification	= "",
			personnelStatement		= "",
			personnelDescription	= "",
			personnelDateNeeded		= ""


		} = data && data[0];

		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("requisitionID", requisitionID);
		$("#btnBack").attr("status", requisitionStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
	
		let button = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? requisitionID: reviseRequisitionID;
		let documentHeaderClass = isRevise || reviseRequisitionID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseRequisitionID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseRequisitionID ?
		 `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PRF", createdAt, reviseDocumentNo)}
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
							${requisitionID && !isRevise ? getFormCode("PRF", createdAt, requisitionID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${requisitionStatus && !isRevise ? getStatusStyle(requisitionStatus) : "---"}
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
								${getDateApproved(requisitionStatus, approversID, approversDate)}
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
							${requisitionRemarks && !isRevise ? requisitionRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_purchase_request">

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
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                        minlength="2"
                        maxlength="325"
                        id="personnelDescription"
                        name="personnelDescription"
                        required
                        rows="4"
                        style="resize:none;"
                        ${disabled}>${personnelDescription ?? ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-personnelDescription"></div>
                </div>
		    </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department ${!disabled ? "<code>*</code>" : ""}</label>
                    <!-- <input type="text" class="form-control" disabled value=""> -->
                    <select class="form-control validate select2"
                        name="departmentID"
                        id="departmentID"
                        style="width: 100%"
                        required
                        display=${readOnly}
                        ${disabled}>
                        <option selected disabled>Select Department</option> 
						${getDepartmentList(departmentID)}            
                    </select>
                    <div class="d-block invalid-feedback" id="invalid-departmentID"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Designation ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                    name="designationID"
                    id="designationID"
                    style="width: 100%"
                    required
                    ${disabled}>
                    <option selected disabled>Select Designation</option> 
					    
                </select>
                <div class="d-block invalid-feedback" id="invalid-designationID"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Requesting Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Salary Package ${!disabled ? "<code>*</code>" : ""}</label>
                    <!-- <input type="text" class="form-control" disabled value=""> -->
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                        </div>
                        <input type="text" 
                        class="form-control amount salaryPackage"  
                        min=".01" max="99999999" 
                        minlength="1" 
                        maxlength="13" 
                        name="salaryPackage" 
                        id="salaryPackage0" 
                        value="${salaryPackage}" 
                        project="true" 
                        style="text-align: right;"
                        ${disabled}>
                    </div>
                    <div class="invalid-feedback d-block" id="invalid-salaryPackage"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reporting To ${!disabled ? "<code>*</code>" : ""}</label>
                    <select class="form-control validate select2"
                    name="personnelReportByID"
                    id="personnelReportByID"
                    style="width: 100%"
                    required
                    ${disabled}>
                    <option selected disabled>Select Employee</option>      
				                    
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-personnelReportByID"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date Needed ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="personnelDateNeeded"
                        name="personnelDateNeeded"
                        value="${personnelDateNeeded && moment(personnelDateNeeded).format("MMMM DD, YYYY")}"
                        ${disabled}
                        title="Date">
						<div class="invalid-feedback d-block invalid-personnelOption" id="invalid-personnelDateNeeded"></div>
                </div>
            </div>

			<div class="col-md-12 col-sm-12 mb-0">
			<label class="font-weight-bold">NATURE OF REQUEST:</label>
			</div>

            <div class="col-md-4 col-sm-12 mb-3">
                <div class="form-group">
                    <label class="c_checkbox">
                        <input type="radio"  
                        name="personnelOption" 
                        value="1" 
                        class=""
                        id="personnelOption"
						requisitionID =${requisitionID} 
						status =${requisitionStatus}
						radioGroup1 =${radioGroup1}
						isRevise = ${isRevise}
						personnelReplacement = ${personnelReplacement}
						${personnelOption == 1  ? "checked":""}
                        ${disabled}    >
                        <span class="checkmark"></span>
                        <span class="ml-3">Permanent ${!disabled ? "<code>*</code>" : ""}</span>
                    </label>
                    <div class="invalid-feedback d-block invalid-personnelOption" id="invalid-personnelOption1"></div>
                </div>
                    <ul style="list-style-type:none!important;white-space: nowrap;" id="option1" class="">
                    </ul>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
                <div class="form-group">
                    <label class="c_checkbox">
                        <input 
						type="radio"  
						name="personnelOption" 
						value="2"
						requisitionID =${requisitionID}
						status =${requisitionStatus}
						radioGroup2=${radioGroup2}
						isRevise = ${isRevise}
						personnelDuration =${personnelDuration}
						${personnelOption == 2  ? "checked":""}
						${disabled}>
                        <span class="checkmark"></span>
                        <span class="ml-3">Non-Permanent ${!disabled ? "<code>*</code>" : ""}</span>
                    </label>
                    <div class="invalid-feedback d-block invalid-personnelOption" id="invalid-personnelOption2"></div>
                </div>
                    <ul style="list-style-type:none!important;white-space: nowrap;" id="option2"> 
                    </ul>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
                <div class="form-group">
                    <label class="c_checkbox">
                        <input 
						type="radio"  
						name="personnelOption" 
						value="3"
						requisitionID =${requisitionID}
						status =${requisitionStatus}
						isRevise = ${isRevise}
						personnelOthers =${personnelOthers}
						${personnelOption == 3  ? "checked":""}
						${disabled}>
                        <span class="checkmark"></span>
                        <span class="ml-3">Other Justifications ${!disabled ? "<code>*</code>" : ""}</span>
                    </label>
                    <div class="invalid-feedback d-block invalid-personnelOption" id="invalid-personnelOption"></div>
                </div>
                    <ul style="list-style-type:none!important;white-space: nowrap;" id="option3">
                    </ul>
            </div>

            <div class="col-md-12 col-sm-12">          
                <div class="form-group">
                    <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Qualifications Required ${!disabled ? "<code>*</code>" : ""}</div>
                    <textarea 
                    data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                    minlength="2"
                    rows="5" 
                    style="resize: none" 
                    class="form-control validate" 
                    id="personnelQualification" 
                    name="personnelQualification"
                    required
					${disabled}>${personnelQualification}</textarea>
                    <div class="invalid-feedback d-block" id="invalid-personnelQualification"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">          
                <div class="form-group">
                    <div class="text-primary font-weight-bold mt-2 mb-2" style="font-size: 1.5rem;">Brief Statement of
                    Duties ${!disabled ? "<code>*</code>" : ""}</div>
                    <textarea 
                    data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                    minlength="2"
                    rows="5" 
                    style="resize: none" 
                    class="form-control validate" 
                    id="personnelStatement" 
                    name="personnelStatement"
                    required
					${disabled}>${personnelStatement}</textarea>
                    <div class="invalid-feedback d-block" id="invalid-personnelStatement"></div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="w-100">
					<hr class="pb-1">
					<div class="w-100 d-flex justify-content-between align-items-center py-2">
						<div></div>
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
			initAll();
			
			requisitionID && requisitionID != 0 &&  $("#departmentID").trigger("change");
			requisitionID && requisitionID != 0 &&  reportEmployeeList(departmentID,personnelReportByID) ;
			requisitionID && requisitionID != 0 &&  designationList(departmentID,designationID);
			requisitionID && requisitionID != 0 &&  $("[name='personnelOption']:checked").trigger("change");

			!requisitionID && requisitionID == 0 && $("#personnelDateNeeded").val(moment(new Date).format("MMMM DD, YYYY"));
			$("#personnelDateNeeded").data("daterangepicker").minDate = moment();
			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----

	$(document).on("keypress keyup",".setHours",function(){
		if($(this).val()== 0){
			$(this).val("");
		}
	})

    // -------- CHECKBOX REPLICATE RADIO BUTTON----------------
    $(document).on("change","[name='personnelOption']",function(){
        var val = $("[name='personnelOption']:checked").val();

        var id = $(this).attr("requisitionID") || false;
        var status = $(this).attr("status") || false;
		var disabled = status !=0 || status == "false" ? "disabled" : "";

		var radioGroup1 = $(this).attr("radioGroup1") || false;
		var personnelReplacement = $(this).attr("personnelReplacement") || "";

		var radioGroup2 = $(this).attr("radioGroup2") || "";
		var personnelDuration = $(this).attr("personnelDuration") || "";

		var personnelOthers = $(this).attr("personnelOthers") || "";

        var attrDesignationID = $("#designationID").val();
        var attrDepartmentID = $("#designationID").find("option:selected").attr("departmentid");

		isRevise =  $(this).attr("isRevise") || false;
        let html =``;
			
 
        if(val == 1){
            html=` <li>
                    <label class="c_radio mt-2 mb-2">
                        <input type="radio" name="radioGroup1" id="radioGroup1" value="1" ${disabled} ${radioGroup1 == 1  ? "checked":""}>
                        <span class="checkmark"></span>
                        <span class="ml-2">Approved Vacant Position According to Plantilla</span>
                    </label>
                </li>
                <li>
                    <label class="c_radio mt-2 mb-2">
                        <input type="radio" name="radioGroup1" id="radioGroup1" value="2" ${disabled} ${radioGroup1 == 2  ? "checked":""}>
                        <span class="checkmark"></span>
                        <span class="ml-2">Additional Manpower due to Increased volume of works</span>
                    </label>
                </li>
                <li>
                    <label class="c_radio mt-2 mb-2">
                        <input type="radio" name="radioGroup1" id="radioGroup1" value="3" ${disabled} ${radioGroup1 == 3  ? "checked":""}>
                        <span class="checkmark"></span>
                        <span class="ml-2">New Position due to Added Functions/Work Expansion</span>
                    </label>
                </li>
                <li>
                    <label class="c_radio mt-2 mb-2">
                        <input type="radio" name="radioGroup1" id="radioGroup1" value="4" ${disabled} ${radioGroup1 == 4  ? "checked":""}>
                        <span class="checkmark"></span>
                        <span class="ml-2">Replacement of</span>
                    </label>
                    <ul style="list-style-type:none!important">
                        <li class="form-group">
                            <select class="form-control select2"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:][']["][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="325"
                            name="personnelReplacement"
                            id="personnelReplacement"
                            style="width: 100%"
                           ${radioGroup1 == 4 && (status =="0" || isRevise)  ? "" :"disabled"}
                            >
                            <option selected disabled>Select Employee</option>                          
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-personnelReplacement"></div>
                        </li>
                    </ul>
                </li>`;

             
                if($("#option1").children().length == 0){
                    $(html).hide().appendTo("#option1").fadeIn(1000);
                    reportEmployeeList2(attrDesignationID,attrDepartmentID,personnelReplacement)
                }
                $("#option2 li").fadeOut(1000).remove();
                $("#option3 li").fadeOut(1000).remove();

				$("[name=salaryPackage]").addClass("required");
				$("#invalid-salaryPackage").text("");
				// $("[name=salaryPackage]").prop("disabled",false);
				$("[name=salaryPackage]").attr("min",".01");
				
                
        }else if(val ==2 ){
            html=`  <li>
            <label class="c_radio mt-2 mb-2">
                <input type="radio" name="radioGroup2" id="radioGroup2" value="1" ${disabled} ${radioGroup2 == 1  ? "checked":""}>
                <span class="checkmark"></span>
                <span class="ml-2">Project Based</span>
            </label>
                </li>
                <li>
                    <label class="c_radio mt-2 mb-2">
                        <input type="radio" name="radioGroup2" id="radioGroup2" value="2" ${disabled} ${radioGroup2 == 2  ? "checked":""}>
                        <span class="checkmark"></span>
                        <span class="ml-2">On the Job Training</span>
                    </label>
                    <ul style="list-style-type:none!important">
                        <li class="form-group">
                            <label for="">Duration:</label>

							<div>
								<input 
								type="text" 
								data-allowcharacters="[0-9]"
								minlength="1"
								maxlength="3"
								min="1"
								class="form-control text-right w-50 setHours" 
								style="display: inline"; 
								value="${personnelDuration}"

								id="personnelDuration"
								name="personnelDuration"
								${radioGroup2 == 2 && (status =="0" || isRevise) ? "" :"readonly"}>
								<label for="personnelDuration">hours</label>
							</div>
                           
                            <div class="invalid-feedback d-block" id="invalid-personnelDuration"></div>
                        </li>
                    </ul>
                </li>`;

                if($("#option2").children().length == 0){
                    $(html).hide().appendTo("#option2").fadeIn(1000);
                }

				if(radioGroup2 ==2){
					$("[name=salaryPackage]").removeClass("required").removeClass("validated").removeClass("is-invalid");
					$("#invalid-salaryPackage").text("");
					// $("[name=salaryPackage]").prop("disabled",true);
					$("[name=salaryPackage]").attr("min","0");
					$("[name=salaryPackage]").val(0);
				}
                $("#option1 li").fadeOut(1000).remove();
                $("#option3 li").fadeOut(1000).remove();
        }else if(val==3){
            html=`<li class="form-group">
                    <input 
                    type="text" 
                    class="form-control mt-2 mb-2 validate" 
                    data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                    minlength="2"
                    maxlength="325"
                    value="${personnelOthers}" 
                    required
                    id="personnelOthers"
                    name="personnelOthers"
					${disabled}>
                    <div class="invalid-feedback d-block" id="invalid-personnelOthers"></div>
                </li>`;
                if($("#option3").children().length == 0){
                    $(html).hide().appendTo("#option3  ").fadeIn(1000);
                }
                $("#option1 li").fadeOut(1000).remove();
                $("#option2 li").fadeOut(1000).remove();

				$("[name=salaryPackage]").addClass("required");
				$("#invalid-salaryPackage").text("");
				// $("[name=salaryPackage]").prop("disabled",false);
				$("[name=salaryPackage]").attr("min",".01");
			
        }
        initSelect2();

       

        $(".invalid-personnelOption").text("");
    });
    // -------- CHECKBOX REPLICATE RADIO BUTTON----------------

    // -------- RADIO BUTTON #1 ----------------
    $(document).on("click","[name='radioGroup1']",function(){
        var radioVal = $(this).val() || 0;
        if(radioVal == 4){
            $("#personnelReplacement").addClass("validate").removeClass("is-valid");
            $("#personnelReplacement").attr("required","");
            $("#personnelReplacement").prop("disabled",false);

		
        }else{
            $("#personnelReplacement").removeClass("validate").removeClass("is-invalid").removeClass("is-valid");

            $("#personnelReplacement").removeAttr("required");
            $("#personnelReplacement").prop("disabled",true);

			

            // $("#personnelReplacement").val(0).trigger('change.select2');
            // $('#personnelReplacement option:eq(0)').prop('selected',true);
            $('#personnelReplacement').val($('#personnelReplacement option:eq(0)').val()).trigger('change');
            $("#invalid-personnelReplacement").text("");
        }
    
    });
    // -------- RADIO BUTTON #1 ----------------

    // -------- RADIO BUTTON #2 ----------------
    $(document).on("click","[name='radioGroup2']",function(){
	
        var radioVal = $(this).val() || 0;
        if(radioVal == 2){
            $("#personnelDuration").addClass("validate").removeClass("is-valid");
            $("#personnelDuration").attr("required","");
            $("#personnelDuration").prop("readonly",false);

			$("[name=salaryPackage]").removeClass("required").removeClass("validated").removeClass("is-invalid");
            $("#invalid-salaryPackage").text("");

            $("[name=salaryPackage]").attr("min","0");
            $("[name=salaryPackage]").val(0);
        }else{
            $("#personnelDuration").removeClass("validate").removeClass("is-invalid").removeClass("is-valid");

            $("#personnelDuration").removeAttr("required");
            $("#personnelDuration").prop("readonly",true);
            $("#personnelDuration").val("");

            $("#personnelReplacement").val("");
            $("#invalid-personnelDuration").text("");

			
			$("[name=salaryPackage]").addClass("required");
			$("#invalid-salaryPackage").text("");
          
            $("[name=salaryPackage]").attr("min",".01");
            
        }
    
    });
    // -------- RADIO BUTTON #2 ----------------




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

			headerButton(true, "Add Personnel Requisition");
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

		if (id) {
			data["requisitionID"] = id;
			formData.append("requisitionID", id);

			if (status != "2") {
				data["requisitionStatus"] = status;
				formData.append("requisitionStatus", status);
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
			data["departmentID"] = $("[name=departmentID]").val();
			data["designationID"] = $("[name=designationID]").val();
			data["salaryPackage"] = $("[name=salaryPackage]").val();
			data["personnelReportByID"] = $("[name=personnelReportByID]").val();
			data["radioGroup1"] = $("[name=radioGroup1]:checked").val();
			data["radioGroup2"] = $("[name=radioGroup2]:checked").val();
			data["personnelOption"] = $("[name=personnelOption]").val();
			data["personnelReplacement"] = $("[name=personnelReplacement]").val();
			data["personnelDuration"] = $("[name=personnelDuration]").val();
			data["personnelOthers"] = $("[name=personnelOthers]").val();
			data["requisitionRemarks"] = $("[name=requisitionRemarks]").val()?.trim();
			data["personnelQualification"] = $("[name=personnelQualification]").val()?.trim();
			data["personnelStatement"] = $("[name=personnelStatement]").val()?.trim();
			data["personnelDescription"]    = $("[name=personnelDescription]").val()?.trim();
			data["personnelDateNeeded"] = moment($("[name=personnelDateNeeded]").val()?.trim()).format("YYYY-MM-DD");


		
			
	
			formData.append("employeeID", sessionID);
			formData.append("departmentID", $("[name=departmentID]").val() || null);
			formData.append("designationID", $("[name=designationID]").val() || null);
			formData.append("salaryPackage", $("[name=salaryPackage]").val().replaceAll(",","") || null);
			formData.append("personnelReportByID", $("[name=personnelReportByID]").val() || null);
			formData.append("radioGroup1", $("[name=radioGroup1]:checked").val() || null);
			formData.append("radioGroup2", $("[name=radioGroup2]:checked").val() || null);
			formData.append("personnelOption", $("[name=personnelOption]:checked").val() || null);
			formData.append("personnelReplacement", $("[name=personnelReplacement]").val() || null);
			formData.append("personnelDuration", $("[name=personnelDuration]").val() || null);
			formData.append("personnelOthers", $("[name=personnelOthers]").val() || null);
			formData.append("requisitionRemarks", $("[name=requisitionRemarks]").val()?.trim());
			formData.append("personnelQualification", $("[name=personnelQualification]").val()?.trim());
			formData.append("personnelStatement", $("[name=personnelStatement]").val()?.trim());
			formData.append("personnelDescription", $("[name=personnelDescription]").val()?.trim());
			formData.append("personnelDateNeeded", moment($("[name=personnelDateNeeded]").val()?.trim()).format("YYYY-MM-DD"));

			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["requisitionID"] = id;

				formData.append("requisitionID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["requisitionStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("requisitionStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["requisitionStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("requisitionStatus", 2);
				}
			}


		} 

		

		return isObject ? data : formData;
	}
	// ----- END GET PURCHASE REQUEST DATA -----


    // ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
		// $(".title_content").text("This module is used to manage incident form details.");
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
		const id = $(this).attr("requisitionID");
		viewDocument(id, false, true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = $(this).attr("requisitionID");
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				// const action = revise && "insert" || (id && feedback ? "update" : "insert");
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPurchaseRequestData(action, "save", "0", id);
				data.append("requisitionStatus", 0);
				// data.append("reviseRequisitionID", id);
				// data.delete("requisitionID");

				if (!isFromCancelledDocument) {
					data.append("reviseRequisitionID", id);
					data.delete("requisitionID");
				} else {
					data.append("requisitionID", id);
					data.delete("action");
					data.append("action", "update");
				}
	
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
			data.append("requisitionStatus", 0);

			savePurchaseRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {

        let condition = $("[name=quantity]").hasClass("is-invalid");

		if(!condition){
        
            const id       = $(this).attr("requisitionID");
			const isFromCancelledDocument = $(this).attr("cancel") == "true"
            const revise   = $(this).attr("revise") == "true";
            const feedback = $(this).attr("code") || getFormCode("PRF", dateToday(), id);
            const action   = revise && "insert" || (id && feedback ? "update" : "insert");
            const data     = getPurchaseRequestData(action, "save", "0", id);
            data.append("requisitionStatus", 0);

            if (revise) {
                // data.append("reviseRequisitionID", id);
                // data.delete("requisitionID");

				if (!isFromCancelledDocument) {
					data.append("reviseRequisitionID", id);
					data.delete("requisitionID");
				} else {
					data.append("requisitionID", id);
					data.delete("action");
					data.append("action", "update");
				}
            }

            savePurchaseRequest(data, "save", null, pageContent);

        }else{
			$("[name=quantity]").focus();
		}
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

        let condition = $("[name=personnelOption]").is(":checked");
        let group1 = $("[name='radioGroup1']").val();
        let field1 =  $("#invalid-personnelReplacement").text();

        const id           = $(this).attr("requisitionID");
        const revise       = $(this).attr("revise") == "true";
        const validate     = validateForm("form_purchase_request");
        $(".no-error").each(function(){
            var thisParent  = $(this).closest(".form-group");
            var closestFeedback = thisParent.find(".invalid-feedback");
            closestFeedback.text("");
        });

        $("#form_purchase_request .is-valid").each(function(){
            var thisParent  = $(this).closest(".form-group");
            var closestFeedback = thisParent.find(".invalid-feedback");  
            closestFeedback.text(""); 
        });

		if(!condition){
			$(".invalid-personnelOption").text("Please Choose in this option.");
		}
		if(condition == true){
            $(".invalid-personnelOption").text("");
            if(group1 == 4 && field1 !=""){
                $("#invalid-personnelReplacement").text("");
            }
          
			// removeIsValid("#tableProjectRequestItems");
            

            if (validate) {
                
               
                const action = revise && "insert" || (id ? "update" : "insert");
                const data   = getPurchaseRequestData(action, "submit", "1", id);

                if (revise) {
                    data.append("reviseRequisitionID", id);
                    data.delete("requisitionID");
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
                        moduleID:                50,
                        notificationTitle:       "Personnel Requisition",
                        notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
                        notificationType:        2,
                        employeeID,
                    };
                }

                savePurchaseRequest(data, "submit", notificationData, pageContent);
                
            }
        }else{
            
			$("[name=personnelOption]").focus();
		}
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = $(this).attr("requisitionID");
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPurchaseRequestData(action, "cancelform", "4", id, status);

		savePurchaseRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("requisitionID"));
		const feedback = $(this).attr("code") || getFormCode("PRF", dateToday(), id);
		let tableData  = getTableData("pms_personnel_requisition_tbl", "", "requisitionID = " + id);

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
					moduleID:                50,
					tableID:                 id,
					notificationTitle:       "Personnel Requisition",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                50,
					tableID:                 id,
					notificationTitle:       "Personnel Requisition",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("requisitionStatus", status);

			savePurchaseRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = $(this).attr("requisitionID");
		const feedback = $(this).attr("code") || getFormCode("PRF", dateToday(), id);

		$("#modal_personnel_requisition_content").html(preloader);
		$("#modal_personnel_requisition .page-title").text("DENY PERSONNEL REQUISITION");
		$("#modal_personnel_requisition").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="requisitionRemarks"
					name="requisitionRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-requisitionRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			requisitionID="${id}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_personnel_requisition_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("requisitionID"));
		const feedback = $(this).attr("code") || getFormCode(" PRF", dateToday(), id);

		const validate = validateForm("modal_personnel_requisition");
		if (validate) {
			let tableData = getTableData("pms_personnel_requisition_tbl", "", "requisitionID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("requisitionID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("requisitionRemarks", $("[name=requisitionRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                50,
					tableID: 				 id,
					notificationTitle:       "Personnel Requisition",
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

	// ----- DROP DOCUMENT -----
	$(document).on("click", "#btnDrop", function() {
		const requisitionID = decryptString($(this).attr("requisitionID"));
		const feedback          = $(this).attr("code") || getFormCode("TR", dateToday(), id);

		const id = decryptString($(this).attr("requisitionID"));
		let data = new FormData;
		data.append("requisitionID", requisitionID);
		data.append("action", "update");
		data.append("method", "drop");
		data.append("updatedBy", sessionID);

		savePurchaseRequest(data, "drop", null, pageContent);
	})
	// ----- END DROP DOCUMENT -----


    // ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
			$(".title_content").text("This module is used to manage the submission and approval of incident.");
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
			$(".title_content").text("This module is used to manage incident form details.");
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
	const title = "Personnel Requisition";
	let swalText, swalImg;

	$("#modal_personnel_requisition").text().length > 0 && $("#modal_personnel_requisition").modal("hide");

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

function savePurchaseRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `Personnel_requisition/savePersonnelRequisition`,
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
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PRF", dateCreated, insertedID)} dropped successfully!`;
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
					if (method != "deny") {
						callback && callback();
					} else {
						$("#modal_personnel_requisition").text().length > 0 && $("#modal_personnel_requisition").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_personnel_requisition").text().length > 0 && $("#modal_personnel_requisition").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------