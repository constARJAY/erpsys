$(document).ready(function() {
	const allowedUpdate = isUpdateAllowed(76);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("Payment Request");
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
				"fms_payment_request_tbl", 
				"revisePaymentRequestID", 
				"revisePaymentRequestID IS NOT NULL AND paymentRequestStatus != 4");
			return revisedDocumentsID.map(item => item.revisePaymentRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

	// ----- GET PURCHASE ORDER LIST -----
  function getReferenceList(id = null, status = 0, display = true) {

	var queryCondition1 ='';
	var queryCondition2 ='';

	if(status === false){
		
		queryCondition1  =`(ipo.purchaseOrderStatus = 2 AND 
				((fpr.paymentRequestStatus != 1 AND 
				fpr.paymentRequestStatus != 0 AND 
				fpr.paymentRequestStatus != 3 AND 
				fpr.paymentRequestStatus != 4 AND 
				fpr.paymentRequestStatus != 5 AND
				fpr.paymentRequestStatus != 2) OR 
				(fpr.paymentRequestStatus IS NULL))) `;

		queryCondition2  =`(fpc.pettyRepStatus = 2 AND 
			((fpr.paymentRequestStatus != 1 AND 
			fpr.paymentRequestStatus != 0 AND 
			fpr.paymentRequestStatus != 3 AND 
			fpr.paymentRequestStatus != 4 AND 
			fpr.paymentRequestStatus != 5 AND
			fpr.paymentRequestStatus != 2) OR 
			(fpr.paymentRequestStatus IS NULL))) `;

	}
	else{
		
		queryCondition1  =`(ipo.purchaseOrderStatus = 2 AND fpr.referenceCode ='${id}' )`;
		queryCondition2  =`(fpc.pettyRepStatus = 2 AND fpr.referenceCode ='${id}' )`;
	}

	var purchaseOrderList = getTableData(`ims_purchase_order_tbl as ipo 
	LEFT JOIN hris_employee_list_tbl as emp ON emp.employeeID = ipo.employeeID
	LEFT JOIN hris_designation_tbl as dsg ON dsg.designationID  = emp.designationID
	LEFT JOIN hris_department_tbl as dept ON dept.departmentID  = emp.departmentID
	LEFT JOIN fms_payment_request_tbl as fpr ON fpr.purchaseOrderID = ipo.purchaseOrderID
	LEFT JOIN fms_chart_of_accounts_tbl as acct ON acct.chartOfAccountID  = ipo.chartOfAccountID`,
	`ipo.purchaseOrderID,ipo.purchaseOrderID as refID,ipo.employeeID,CONCAT('PO-',SUBSTR(ipo.createdAt,3,2),"-",LPAD(ipo.purchaseOrderID,5,0)) as documentCode,
	grandTotalAmount as Amount,CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,employeeUnit,employeeBuilding,
	employeeBarangay,employeeCity,employeeProvince,employeeCountry,employeeZipCode,departmentName,designationName,acct.chartOfAccountID,acct.accountName`,
	queryCondition1);

	var replenishmentList = getTableData(`fms_petty_cash_replenishment_tbl as fpc
	LEFT JOIN hris_employee_list_tbl as emp ON emp.employeeID = fpc.employeeID
	LEFT JOIN hris_designation_tbl as dsg ON dsg.designationID  = emp.designationID
	LEFT JOIN hris_department_tbl as dept ON dept.departmentID  = emp.departmentID
	LEFT JOIN fms_payment_request_tbl as fpr ON fpr.pettyRepID = fpc.pettyRepID
	LEFT JOIN fms_chart_of_accounts_tbl as acct ON acct.chartOfAccountID  = 2`,
	`fpc.pettyRepID,fpc.pettyRepID as refID,fpc.employeeID,CONCAT("PCR-",SUBSTR(fpc.createdAt,3,2),"-",LPAD(fpc.pettyRepID,5,0)) as documentCode,
	pettyRepTotalBalance as Amount,CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,employeeUnit,employeeBuilding,
	employeeBarangay,employeeCity,employeeProvince,employeeCountry,employeeZipCode,departmentName,designationName,acct.chartOfAccountID,acct.accountName`,
	queryCondition2);

	var condition = purchaseOrderList.length < replenishmentList.length ? replenishmentList  : purchaseOrderList ;
		condition.map(items=>{
			purchaseOrderList.push(items);
		})


	let html = '';
	
	if (!status || status == 0) {
		// html += purchaseOrderList.filter(po => createdIRList.indexOf(po.purchaseOrderID) == -1 || po.purchaseOrderID == id).map(po => {
		
		html += purchaseOrderList.map(po => {
			let address = `${po.employeeUnit && titleCase(po.employeeUnit)+", "}${po.employeeBuilding && po.employeeBuilding +", "}${po.employeeBarangay && titleCase(po.employeeBarangay)+", "}${po.employeeCity && titleCase(po.employeeCity)+", "}${po.employeeProvince && titleCase(po.employeeProvince)+", "}${po.employeeCountry && titleCase(po.employeeCountry)+", "}${po.employeeZipCode && titleCase(po.employeeZipCode)}`;

			return `
			<option 
				value      = "${po.documentCode}" 
				requestorID = "${po.employeeID}"
				requestorName = "${po.fullname}"
				address="${address}"
				department="${po.departmentName}"
				designation="${po.designationName}"
				amount=${po.Amount}
				purchaseOrderID=${po.purchaseOrderID || 0}
				pettyRepID=${po.pettyRepID || 0}
				chartOfAccountID="${po.chartOfAccountID || 0}"
				accountName="${po.accountName }"
			${po.documentCode == id && "selected"}>
			${po.documentCode}
			</option>`;
		})
	} else {
		html += purchaseOrderList.map(po => {
			let address = `${po.employeeUnit && titleCase(po.employeeUnit)+", "}${po.employeeBuilding && po.employeeBuilding +", "}${po.employeeBarangay && titleCase(po.employeeBarangay)+", "}${po.employeeCity && titleCase(po.employeeCity)+", "}${po.employeeProvince && titleCase(po.employeeProvince)+", "}${po.employeeCountry && titleCase(po.employeeCountry)+", "}${po.employeeZipCode && titleCase(po.employeeZipCode)}`;

			return `
			<option 
				value      = "${po.documentCode}"
				requestorID = "${po.employeeID}" 
				requestorName = "${po.fullname}"
				address="${address}"
				department="${po.departmentName}"
				designation="${po.designationName}"	
				amount=${po.Amount}
				purchaseOrderID=${po.purchaseOrderID || 0}
				pettyRepID=${po.pettyRepID || 0}
				chartOfAccountID="${po.chartOfAccountID || 0}"
				accountName="${po.accountName }"
				${po.documentCode == id && "selected"}>
				${po.documentCode}
			</option>`;
		})
	}
	
	return display ? html : purchaseOrderList;
	}
	// ----- END GET PURCHASE ORDER LIST -----

	// ----- SELECT PURCHASE ORDER -----
	$(document).on("change", "[name=referenceCode]", function() {
		const requestorName = $('option:selected', this).attr("requestorName");
		const address = $('option:selected', this).attr("address");
		const department = $('option:selected', this).attr("department");
		const designation = $('option:selected', this).attr("designation");
		const accountName = $('option:selected', this).attr("accountName");
		const amount = $('option:selected', this).attr("amount").replaceAll(",","");
		const id 					= $(this).val();
		// let materialWithdrawalID 	= $(this).attr("materialWithdrawalID");
		// let executeonce 	        = $(this).attr("executeonce") == "true";
		// var readOnly			    = $(this).attr("disabled") == "disabled";
		const status                = $(this).attr("status");
		// materialWithdrawalID        = executeonce ? materialWithdrawalID : null;

		$.ajax({
			url       : `payment_request/convertnumberintowords`,
			method    : "POST",
			data      : {checkAmountConvert:  amount},
			async     : true,
			dataType  : 'json',
			success   : function(data){
			
			
			
			$("[name=amountWords]").text(titleCase(data));
			$("[name=amountFigures]").text(formatAmount(amount,true));
			$("[name=accountName]").val(accountName);
			$("[name=requestorName]").val(requestorName);
			$("[name=requestorPosition]").val(designation);
			$("[name=requestorDepartment]").val(department);
			$("[name=requestorAddress]").val(address);
		

			
			
			}
		});

		

		setTimeout(() => {
			initQuantity();
			// updateSerialNumber();
			$(this).removeAttr("executeonce");
		}, 300);
	})
	// ----- END SELECT PURCHASE ORDER -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getTableData("fms_payment_request_tbl", "", "paymentRequestID=" + id);

			if (tableData.length > 0) {
				let {
					employeeID,
					paymentRequestStatus
				} = tableData[0];

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (paymentRequestStatus == 0 || paymentRequestStatus == 4) {
						isAllowed = false;
					}
				} else if (employeeID == sessionID) {
					if (paymentRequestStatus == 0) {
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
				//totalAmountArray();
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
					const isAllowed = isCreateAllowed(76);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}fms/payment_request?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}fms/payment_request?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}fms/payment_request?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}fms/payment_request`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};

	const inventoryItemList = getTableData(
		"fms_chart_of_accounts_tbl ", "chartOfAccountID , accountCode, accountName, accountDescription, createdAt",
		"accountStatus = 1");

	const inventoryPriceList = getTableData(
		`ims_inventory_price_list_tbl`,
		``,
		`preferred = 1`
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
					{ targets: 2,  width: 150 },
					{ targets: 3,  width: 150 },
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 80 },
					{ targets: 7,  width: 250 },
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
					{ targets: 4,  width: 200 },
					{ targets: 5,  width: 250 },
					{ targets: 6,  width: 80 },
					{ targets: 7,  width: 250 },
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
					{ targets: 0,  width: 350  },
					{ targets: 1,  width: 350 },
					{ targets: 2,  width: 50 },
				
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
				searching: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 350  },
					{ targets: 1,  width: 350 },
					{ targets: 2,  width: 50 },

				],
			});
	}
	// ----- END DATATABLES -----
   

    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("fms_payment_request_tbl", "approversID")) {
				let count = getCountForApproval("fms_payment_request_tbl", "paymentRequestStatus");
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
			if (isCreateAllowed(76)) {
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

		let pettyCashRequest = getTableData(
			`fms_payment_request_tbl AS fmr 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
			LEFT JOIN hris_employee_list_tbl AS requestor ON requestor.employeeID = fmr.requestorID 
			 `,
			`fmr.*, 
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname,
			CONCAT(requestor.employeeFirstname, ' ', requestor.employeeLastname) AS requestorName`,
			`fmr.employeeID != ${sessionID} AND paymentRequestStatus != 0 AND paymentRequestStatus != 4`,
			`FIELD(paymentRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(fmr.submittedAt, fmr.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Payee</th>
					<th>Amount</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

			pettyCashRequest.map((item) => {
				let {
					fullname,
					requestorName,
					amount,
					paymentRequestID,
					approversID,
					approversDate,
					paymentRequestStatus,
					paymentRequestRemarks,
					submittedAt,
					createdAt,
					createdBy
				} = item;
	
				let remarks       = paymentRequestRemarks ? paymentRequestRemarks : "-";
				let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
				let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
				let dateApproved  = paymentRequestStatus == 2 || paymentRequestStatus == 5 ? approversDate.split("|") : "-";
				if (dateApproved !== "-") {
					dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
				}
	
				let btnClass = paymentRequestStatus != 0 ? "btnView" : "btnEdit";
	
			
				html += `
				<tr class="${btnClass}" id="${encryptString(paymentRequestID)}">
				  
					<td>${getFormCode("PYRF", createdAt, paymentRequestID)}</td>
					<td>${fullname}</td>
					<td>${requestorName}</td>
					<td class="text-right">${formatAmount(amount, true)}</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, paymentRequestStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(paymentRequestStatus)}
					</td>
					<td>${remarks}</td>
				</tr>`;
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
		let pettyCashRequest = getTableData(
			`fms_payment_request_tbl AS fmr 
			LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
			LEFT JOIN hris_employee_list_tbl AS requestor ON requestor.employeeID = fmr.requestorID 
			 `,
			`fmr.*, 
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname,
			CONCAT(requestor.employeeFirstname, ' ', requestor.employeeLastname) AS requestorName`,
			`fmr.employeeID = ${sessionID}`,
			`FIELD(paymentRequestStatus, 0, 1, 3, 2, 4, 5), COALESCE(fmr.submittedAt, fmr.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Prepared By</th>
                    <th>Payee</th>
					<th>Amount</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		pettyCashRequest.map((item) => {
			let {
				fullname,
				requestorName,
				amount,
				paymentRequestID,
				approversID,
				approversDate,
				paymentRequestStatus,
				paymentRequestRemarks,
				submittedAt,
				createdAt,
				createdBy
			} = item;

			let remarks       = paymentRequestRemarks ? paymentRequestRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = paymentRequestStatus == 2 || paymentRequestStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			let btnClass = paymentRequestStatus != 0 ? "btnView" : "btnEdit";

		
			html += `
            <tr class="${btnClass}" id="${encryptString(paymentRequestID)}">
              
				<td>${getFormCode("PYRF", createdAt, paymentRequestID)}</td>
                <td>${fullname}</td>
                <td>${requestorName}</td>
				<td class="text-right">${formatAmount(amount, true)}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, paymentRequestStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(paymentRequestStatus)}
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
	// function openWin() {
	// 	myWindow = window.open("${base_url}fms/client_fund_request?add"target="_blank");   // Opens a new window
	//   }

    // ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
	
		if (data) {
			let {
				paymentRequestID     = "",
				paymentRequestStatus = "",
				employeeID            = "",
				approversID           = "",
				approversDate         = "",
				createdAt             = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (paymentRequestStatus == 0 || isRevise) {
					// DRAFT
					button = `
					<button type="button" 
						class="btn btn-submit px-5 p-2"  
						id="btnSubmit" 
						paymentRequestID="${encryptString(paymentRequestID)}"
						code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
						revise="${isRevise}"
						cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>`;

					if (isRevise) {
						button += `
						<button type="button" 
							class="btn btn-cancel btnCancel px-5 p-2" 
							id="btnCancel"
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					} else {
						button += `
						<button type="button" 
							class="btn btn-cancel px-5 p-2"
							id="btnCancelForm" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
							revise=${isRevise}><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}

					
				} else if (paymentRequestStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
							status="${paymentRequestStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (paymentRequestStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	paymentRequestID="${encryptString(paymentRequestID)}"
					// 	code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
					// 	status="${paymentRequestStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (paymentRequestStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(paymentRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
							status="${paymentRequestStatus}"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (paymentRequestStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(paymentRequestID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"
							status="${paymentRequestStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (paymentRequestStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button type="button" 
							class="btn btn-submit px-5 p-2"  
							id="btnApprove" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnReject" 
							paymentRequestID="${encryptString(paymentRequestID)}"
							code="${getFormCode("PYRF", createdAt, paymentRequestID)}"><i class="fas fa-ban"></i> 
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

	// ----- UPDATE INVENTORYT NAME -----
	function updateInventoryItemOptions() {
		let projectItemIDArr = [], companyItemIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [], companyElementID = [];
		

		$("[name=itemID][project=true]").each(function(i, obj) {
			projectItemIDArr.push($(this).val());
			projectElementID.push(`#${this.id}[project=true]`);
			$(this).val() && $(this).trigger("change");
		}) 
		

		projectElementID.map((element, index) => {
			let html = `<option selected disabled>Select Item Name</option>`;
			let itemList = !projectItemIDArr.includes("0") && $(`.itemProjectTableBody tr`).length > 1 ? [...inventoryItemList] : [optionNone, ...inventoryItemList];

			html += itemList.filter(item => !projectItemIDArr.includes(item.itemID) || item.itemID == projectItemIDArr[index]).map(item => {
				return `
				<option 
					value           = "${item.chartOfAccountID}" 
					itemDescription = "${item.accountName}"
					createdAt       = "${item.createdAt}"
					${item.chartOfAccountID == projectItemIDArr[index] && "selected"}>
					${item.accountName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE INVENTORYT NAME -----


	// ----- GET ITEM ROW -----
    function getItemRow(isProject = true, item = {}, readOnly = false, ceID = null) {
		const attr = isProject ? `project="true"` : `company="true"`;
		var inputFile = "";
		let {
			paymentRequestID                       	= "",
			referencePurpose  						= "",
			amount									="",
			amountWords 							=""
		} = item;

		let html = "";
		if (readOnly) {
			html += `
			<tr class="itemTableRow" paymentRequestID="${paymentRequestID}">
				
                <td>
					<div class="referencePurpose">
						${referencePurpose || ""}
					</div>
				</td>
				<td>
					<div class="quantity text-left">
						${amountWords || "-"}
					</div>
				</td>
				<td class="text-right">
                ${formatAmount(amount, true) || "-"}
				</td>
				
			</tr>`;
		} else {
			const disabled  = ceID && ceID != "0" ? "disabled" : "";
			
			html += `
			<tr class="itemTableRow" paymentRequestID="${paymentRequestID}">
                    <td>
					<div>
					 <textarea class="form-control validate"
						data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
						minlength="2"
						id="referencePurpose"
						name="referencePurpose"
						ceID="${ceID ? true : false}"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${referencePurpose ?? ""}</textarea>

                            <div class="invalid-feedback d-block" id="invalid-referencePurpose"></div>
                        </div>
                   </td> 
				   <td>
						<div calss="text-left">
							<span name="amountWords">-</span>
						</div>
                   </td>
				    <td>
						<div class="text-right">
							<span class="text-right" name="amountFigures">-</span>
						</div>
					</td> 
				   
			</tr>`;
		}

        return html;
    }
    // ----- END GET ITEM ROW -----


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			paymentRequestID       = "",
			revisePaymentRequestID = "",
			employeeID              = "",
			paymentRequestRemarks  = "",
			paymentRequestReason 	="",
			approversID             = "",
			approversStatus         = "",
			approversDate           = "",
			referenceCode 			="",
			paymentRequestStatus   = false,
			submittedAt             = false,
			createdAt               = false,
		} = data && data[0];

        let pettyCashRequestItems = "";
        if (paymentRequestID) {
            let pettyCashRequestData = getTableData(
                `fms_payment_request_tbl AS fpr`,
                ``,
                `fpr.paymentRequestID = ${paymentRequestID}`,``);
                pettyCashRequestData.map(item => {
                    pettyCashRequestItems += getItemRow(true, item, readOnly)
            })    
        }else{
            pettyCashRequestItems += getItemRow(true);
        } 

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("paymentRequestID", encryptString(paymentRequestID));
		$("#btnBack").attr("status", paymentRequestStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled          = readOnly ? "disabled" : "";
        let tableProjectRequestItemsName = !disabled ? "tableProjectRequestItems" : "tableProjectRequestItems0";
		
		let button = formButtons(data, isRevise, isFromCancelledDocument);
		console.log(button)

		let reviseDocumentNo    = isRevise ? paymentRequestID : revisePaymentRequestID;
		let documentHeaderClass = isRevise || revisePaymentRequestID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePaymentRequestID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePaymentRequestID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PYRF", createdAt, reviseDocumentNo)}
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
							${paymentRequestID && !isRevise ? getFormCode("PYRF", createdAt, paymentRequestID) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${paymentRequestStatus && !isRevise ? getStatusStyle(paymentRequestStatus) : "---"}
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
								${getDateApproved(paymentRequestStatus, approversID, approversDate)}
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
							${paymentRequestRemarks && !isRevise ? paymentRequestRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>
            <div class="row" id="form_petty_cash_request">
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="text-dark">Prepared By</label>
                        <input type="text" class="form-control" disabled value="${employeeFullname}">
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="text-dark">Position</label>
                        <input type="text" class="form-control" disabled value="${employeeDesignation}">
                    </div>
                </div>
				<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label class="text-dark">Department</label>
					<input type="text" class="form-control" disabled value="${employeeDepartment}">
				</div>
				</div>
				
				<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
					<select class="form-control validate select2"
						name="referenceCode"
						id="referenceCode"
						style="width: 100%"
						required
						${disabled}
					   >
						<option selected disabled>Select Reference No.</option>
						${getReferenceList(referenceCode,paymentRequestStatus)} 
					</select>
					<div class="d-block invalid-feedback" id="invalid-referenceCode"></div>
				</div>
			</div>

			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Account Name</label>
					<input type="text" class="form-control" name="accountName" disabled value="">
				</div>
			</div>
	
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Requestor</label>
					<input type="text" class="form-control" name="requestorName" disabled value="">
				</div>
			</div>
	
			<div class="col-md-3 col-sm-12">
				<div class="form-group">
					<label>Position</label>
					<input type="text" class="form-control" name="requestorPosition" disabled value="">
				</div>
			</div>
	
			<div class="col-md-4 col-sm-12">
				<div class="form-group">
					<label>Department</label>
					<input type="text" class="form-control" name="requestorDepartment" disabled value="">
				</div>
			</div>
	
			<div class="col-md-8 col-sm-12">
				<div class="form-group">
					<label>Address</label>
					<input type="text" class="form-control" name="requestorAddress" disabled value="">
				</div>
			</div>
	
			
	
			<div class="col-md-12 col-sm-12">
				<div class="form-group">
					<label>Description ${!disabled ? "<code>*</code>" : ""}</label>

					<textarea class="form-control validate"
					data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
					minlength="2"
					maxlength="150"
					name="paymentRequestReason" 
					id="paymentRequestReason" 
					required
					rows="4"
					style="resize:none;"
					${disabled}>${paymentRequestReason ?? ""}</textarea>
					<div class="d-block invalid-feedback" id="invalid-paymentRequestReason"></div>
				</div>
			</div>
				
                <div class="w-100">
                <hr class="pb-1">
                <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Payment Request</div>
                <table class="table table-striped" id="${tableProjectRequestItemsName}">
                    <thead>
                        <tr style="white-space: nowrap">
                            <th>Details/Purpose ${!disabled ? "<code>*</code>" : ""}</th>
							<th>Amount(in Words)</th>
                            <th>Amount(in Figures)</th>
                        </tr>
                    </thead>
                    <tbody class="itemProjectTableBody" project="true">
                        ${pettyCashRequestItems}
                    </tbody>
                </table>
                
               
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
			// updateTableItems();
			initAll();
			updateInventoryItemOptions();
			paymentRequestID && paymentRequestID != 0 && $("[name=referenceCode]").trigger("change");
			// if (billMaterialID || projectID) {
			 	//$("[name=files]").val(files).trigger("change");
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

			headerButton(true, "Add Payment Request");
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
	function getPettyCashRequestData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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

		//const ceID = $(`[name="billMaterialID"]`).val();

		if (id) {
			data["paymentRequestID"] = id;
			formData.append("paymentRequestID", id);

			if (status != "2") {
				data["paymentRequestStatus"] = status;
				formData.append("paymentRequestStatus", status);
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
			data["referenceCode"] = $("[name=referenceCode]").val();
			data["paymentRequestReason"] = $("[name=paymentRequestReason]").val()?.trim();
			data["referencePurpose"] = $("[name=referencePurpose]").val()?.trim();


			formData.append("employeeID", sessionID);
			formData.append("referenceCode", $("[name=referenceCode]").val());
			formData.append("requestorID", $("[name=referenceCode]").find(":selected").attr("requestorID"));
			formData.append("chartOfAccountID", $("[name=referenceCode]").find(":selected").attr("chartOfAccountID"));
			formData.append("purchaseOrderID", $("[name=referenceCode]").find(":selected").attr("purchaseOrderID"));
			formData.append("pettyRepID", $("[name=referenceCode]").find(":selected").attr("pettyRepID"));
			formData.append("paymentRequestReason", $("[name=paymentRequestReason]").val()?.trim());
			formData.append("referencePurpose", $("[name=referencePurpose]").val()?.trim());
			formData.append("amount", $("[name=amountFigures]").text()?.trim().replaceAll(",","").replaceAll("₱",""));
			formData.append("amountWords", $("[name=amountWords]").text()?.trim());


			if (action == "insert") {
				data["createdBy"]   = sessionID;
				data["createdAt"]   = dateToday();

				formData.append("createdBy", sessionID);
				formData.append("createdAt", dateToday());
			} else if (action == "update") {
				data["paymentRequestID"] = id;

				formData.append("paymentRequestID", id);
			}

			if (method == "submit") {
				data["submittedAt"] = dateToday();
				formData.append("submittedAt", dateToday());
				if (approversID) {
					data["approversID"]           = approversID;
					data["paymentRequestStatus"] = 1;

					formData.append("approversID", approversID);
					formData.append("paymentRequestStatus", 1);
				} else {  // AUTO APPROVED - IF NO APPROVERS
					data["approversID"]           = sessionID;
					data["approversStatus"]       = 2;
					data["approversDate"]         = dateToday();
					data["paymentRequestStatus"] = 2;

					formData.append("approversID", sessionID);
					formData.append("approversStatus", 2);
					formData.append("approversDate", dateToday());
					formData.append("paymentRequestStatus", 2);
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


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id              = decryptString($(this).attr("paymentRequestID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SAVE CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("paymentRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PYRF", dateToday(), id);
		const status     = $(this).attr("status");

		if (status != "false" && status != 0) {
			
			if (revise) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPettyCashRequestData(action, "save", "0", id);
				data.append("paymentRequestStatus", 0);
				if (!isFromCancelledDocument) {
					data.append("revisePaymentRequestID", id);
					data.delete("paymentRequestID");
				} else {
					data.append("paymentRequestID", id);
					data.delete("action");
					data.append("action", "update");
				}

				//validateItemPrice();
				savePettyCashRequest(data, "save", null, pageContent);
			} else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			}

		} else {
			const action = id && feedback ? "update" : "insert";
			const data   = getPettyCashRequestData(action, "save", "0", id);
			data.append("paymentRequestStatus", 0);

			//validateItemPrice()
			savePettyCashRequest(data, "save", null, pageContent);
		}
	});
	// ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("paymentRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PYRF", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
		const data     = getPettyCashRequestData(action, "save", "0", id);
		data.append("paymentRequestStatus", 0);

		if (revise) {
			if (!isFromCancelledDocument) {
				data.append("revisePaymentRequestID", id);
				data.delete("paymentRequestID");
			} else {
				data.append("paymentRequestID", id);
				data.delete("action");
				data.append("action", "update");
			}
		}

		//validateItemPrice();
		savePettyCashRequest(data, "save", null, pageContent);
	});
	// ----- END SAVE DOCUMENT -----

	
	// ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


	// ----- VALIDATE TABLE -----
	function validateTableItems() {
		let flag = true;
		if ($(`.itemProjectTableBody tr`).length == 1 && $(`.itemCompanyTableBody tr`).length == 1) {
			const projectItemID = $(`[name="itemID"][project="true"]`).val();
			const companyItemID = $(`[name="itemID"][company="true"]`).val();
			flag = !(projectItemID == "0" && companyItemID == "0");
			// flag = !(projectItemID == companyItemID);
		}

		if (!flag) {
			showNotification("warning2", "Cannot submit form, kindly input valid items.");
		}
		return flag;
	}
	// ----- END VALIDATE TABLE -----


    // ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id            = decryptString($(this).attr("paymentRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise        = $(this).attr("revise") == "true";
		const validate      = validateForm("form_petty_cash_request");
	
		removeIsValid("#tableProjectRequestItems");
		//removeIsValid("#tableCompanyRequestItems");
			if (validate) {
				const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
				const data   = getPettyCashRequestData(action, "submit", "1", id);
	
				if (revise) {
					if (!isFromCancelledDocument) {
						data.append("revisePaymentRequestID", id);
						data.delete("paymentRequestID");
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
						moduleID:                76,
						notificationTitle:       "Payment Request",
						notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
						notificationType:        2,
						employeeID,
					};
				}
	
				savePettyCashRequest(data, "submit", notificationData, pageContent);
			}
		
	});
	// ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id     = decryptString($(this).attr("paymentRequestID"));
		const status = $(this).attr("status");
		const action = "update";
		const data   = getPettyCashRequestData(action, "cancelform", "4", id, status);

		savePettyCashRequest(data, "cancelform", null, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id       = decryptString($(this).attr("paymentRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PYRF", dateToday(), id);
		let tableData  = getTableData("fms_payment_request_tbl", "", "paymentRequestID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let employeeID      = tableData[0].employeeID;
			let createdAt       = tableData[0].createdAt;

			let data = getPettyCashRequestData("update", "approve", "2", id);
			data.append("approversStatus", updateApproveStatus(approversStatus, 2));
			let dateApproved = updateApproveDate(approversDate)
			data.append("approversDate", dateApproved);

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                76,
					tableID:                 id,
					notificationTitle:       "Payment Request",
					notificationDescription: `${feedback}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                76,
					tableID:                 id,
					notificationTitle:       "Payment Request",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data.append("paymentRequestStatus", status);

			savePettyCashRequest(data, "approve", notificationData, pageContent);
		}
	});
	// ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("paymentRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PYRF", dateToday(), id);

		$("#modal_petty_cash_request_content").html(preloader);
		$("#modal_petty_cash_request .page-title").text("DENY PAYMENT REQUEST");
		$("#modal_petty_cash_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="paymentRequestRemarks"
					name="paymentRequestRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-paymentRequestRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button type="button" class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
			paymentRequestID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button type="button" class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_petty_cash_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id       = decryptString($(this).attr("paymentRequestID"));
		const feedback = $(this).attr("code") || getFormCode("PYRF", dateToday(), id);

		const validate = validateForm("modal_petty_cash_request_content");
		if (validate) {
			let tableData = getTableData("fms_payment_request_tbl", "", "paymentRequestID = " + id);
			if (tableData) {
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;

				let data = new FormData;
				data.append("action", "update");
				data.append("method", "deny");
				data.append("paymentRequestID", id);
				data.append("approversStatus", updateApproveStatus(approversStatus, 3));
				data.append("approversDate", updateApproveDate(approversDate));
				data.append("paymentRequestRemarks", $("[name=paymentRequestRemarks]").val()?.trim());
				data.append("updatedBy", sessionID);

				let notificationData = {
					moduleID:                76,
					tableID: 				 id,
					notificationTitle:       "Payment Request",
					notificationDescription: `${feedback}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				savePettyCashRequest(data, "deny", notificationData, pageContent);
				$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
			} 
		} 
	});
	// ----- END REJECT DOCUMENT -----


	// ----- DROP DOCUMENT -----
	// $(document).on("click", "#btnDrop", function() {
	// 	const id = decryptString($(this).attr("paymentRequestID"));
	// 	let data = new FormData;
	// 	data.append("paymentRequestID", id);
	// 	data.append("action", "update");
	// 	data.append("method", "drop");
	// 	data.append("updatedBy", sessionID);

	// 	savePettyCashRequest(data, "drop", null, pageContent);
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
})

// --------------- DATABASE RELATION ---------------
function getConfirmation(method = "submit") {
	const title = "Payment Request";
	let swalText, swalImg;

	$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("hide");

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

function savePettyCashRequest(data = null, method = "submit", notificationData = null, callback = null) {
	if (data) {
		const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `payment_request/savePaymentRequest`,
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
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} submitted successfully!`;
						} else if (method == "save") {
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} saved successfully!`;
						} else if (method == "cancelform") {
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} cancelled successfully!`;
						} else if (method == "approve") {
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} approved successfully!`;
						} else if (method == "deny") {
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} denied successfully!`;
						} else if (method == "drop") {
							swalTitle = `${getFormCode("PYRF", dateCreated, insertedID)} dropped successfully!`;
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
						$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("show");
					}
				} else if (res.isDismissed) {
					if (method == "deny") {
						$("#modal_petty_cash_request").text().length > 0 && $("#modal_petty_cash_request").modal("show");
					}
				}
			}
		});

		
	}
	return false;
}

// --------------- END DATABASE RELATION ---------------