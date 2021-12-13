$(document).ready(function () {

    const allowedUpdate = isUpdateAllowed(113);


    // ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover("payroll register");
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
				"hris_payroll_register_tbl", 
				"revisePayrollRegisterID", 
				"revisePayrollRegisterID IS NOT NULL AND payrollRegisterStatus != 4");
			return revisedDocumentsID.map(item => item.revisePayrollID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----

	
    // GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
        return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
    
	const getNonFormattedAmount = (amount = "₱0.00") => {
        return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
    // END GLOBAL VARIABLE - REUSABLE 


    // ----- DATATABLES -----
	function initDataTables() {
        $('[data-toggle="tooltip"]').tooltip();

        const manipulateDataTables = (elementID = "") => {
            if (elementID) {
                if ($.fn.DataTable.isDataTable(elementID)) {
                    $(elementID).DataTable().destroy();
                }

                let datatableOption = {
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        [],
                    scrollCollapse: true,
                    columnDefs: [
                        { targets: 0,  width: 100 },
                        { targets: 1,  width: 100 },
                        { targets: 2,  width: 150 },
                        { targets: 3,  width: 300 },
                        { targets: 4,  width: 150 },
                        { targets: 5,  width: 300 },
                        { targets: 6,  width: 80  },
                        { targets: 7,  width: 200 }, 	
                    ],
                };

                if (elementID == "#tablePayroll") {
					const isReadOnly = $("#tablePayroll").attr("isReadOnly") == "true";

                    datatableOption = {
                        proccessing:    false,
                        serverSide:     false,
                        scrollX:        true,
                        scrollY:        500,
                        sorting:        [],
                        scrollCollapse: true,
                        paging:         false,
                        sorting:        false,
                        info:           false,
                        bSort:          false,
                        columnDefs: [
                            { targets: 0,           width: "250px" },
                            { targets: "thPay",     width: "90px"  },
                            { targets: "thPay2",    width: "120px" },
                            { targets: "thMandate", width: "150px" },
                            { targets: "thAdjust",  width: "150px" },	
                            { targets: "thAdjust2", width: "180px" },	
                            { targets: "thAdjust3", width: "210px" },	
                            { targets: "thAdjust4", width: "250px" },	
                            { targets: -1,          width: "150px" },		
                        ],
                        fixedColumns: {
                            leftColumns:  isReadOnly ? 1 : 3,
                            rightColumns: 1,
                        }
                    }
                }

                var table = $(elementID)
                    .css({ "min-width": "100%" })
                    .removeAttr("width")
                    .DataTable(datatableOption);
            }
        }

        ["#tableForApproval", "#tableMyForms", "#tablePayroll"].map(elementID => {
            manipulateDataTables(elementID);
        })
	}
	// ----- END DATATABLES -----


    // ----- GET PAYROLL DATA -----
    function getAllPayrollRegisterData(payrollRegisterID = 0) {
        let result = null;
        if (payrollRegisterID) {
            $.ajax({
                method: "POST",
                url: "payroll_register/getAllPayrollRegisterData",
                data: { payrollRegisterID },
                dataType: "json",
                async: false,
                success: function(data) {
                    result = data;
                },
                error: function() {
                    showNotification("danger", "There was an error fetching the data.<br>Please try again..");
                }
            })
        }
        return result;
    }
    // ----- END GET PAYROLL DATA -----


    // ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
			const tableData = getAllPayrollRegisterData(id);

			if (tableData && tableData?.header && tableData?.body) {
				let {
					employeeID,
					payrollStatus
				} = tableData?.header;

				let isReadOnly = true, isAllowed = true;

				if (employeeID != sessionID) {
					isReadOnly = true;
					if (employeeID == null || employeeID == 0) {
						if (payrollStatus == 0) {
							isReadOnly = false;
						} else {
							isReadOnly = true;
						}
					} else {
						if (payrollStatus == 0 || payrollStatus == 4) {
							isAllowed = false;
						}
					}
				} else if (employeeID == sessionID) {
					if (payrollStatus == 0) {
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
					const isAllowed = isCreateAllowed(110);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}hris/payroll_register?view_id=${view_id}`);
		} else if (isAdd) {
			if (view_id && isRevise) {
				window.history.pushState("", "", `${base_url}hris/payroll_register?add=${view_id}`);
			} else {
				window.history.pushState("", "", `${base_url}hris/payroll_register?add`);
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/payroll_register`);
		}
	}
	// ----- END VIEW DOCUMENT -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
		let html;
		if (isAdd) {
			if (isCreateAllowed(110)) {
				html = ``;
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


    // ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_payroll_register_tbl", "approversID")) {
				let count = getCountForApproval("hris_payroll_register_tbl", "payrollRegisterStatus");
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


    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		uniqueData = [];

		$("#tableMyFormsParent .loader").length == 0 && $("#tableMyFormsParent").html(preloader);
		let payrollData = getTableData(
			`hris_payroll_register_tbl AS hprt 
				LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                LEFT JOIN hris_payroll_tbl AS hpt ON hprt.payrollID = hpt.payrollID`,
			`hprt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hprt.createdAt AS dateCreated,
            payrollStartDate, payrollEndDate`,
			`hprt.employeeID = 0 OR hprt.employeeID IS NULL OR hprt.employeeID = ${sessionID}`,
			`FIELD(payrollRegisterStatus, 0, 1, 3, 2, 4, 5), COALESCE(hprt.submittedAt, hprt.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
					<th>Reference No.</th>
                    <th>Prepared By</th>
                    <th>Payroll Period</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

		payrollData.map((item) => {
			let {
				payrollRegisterID,
				payrollRegisterCode,
				payrollCode,
                employeeID,
                fullname,
                payrollStartDate, 
                payrollEndDate,
                payrollRegisterReason,
                approversID,
                approversStatus,
                approversDate,
                payrollRegisterStatus,
                payrollRegisterRemarks,
                submittedAt,
                createdAt,
			} = item;

			let remarks       = payrollRegisterRemarks ? payrollRegisterRemarks : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = payrollRegisterStatus == 2 || payrollRegisterStatus == 5 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}
            let payrollDate = "-";
            if (payrollStartDate && payrollEndDate) {
                payrollStartDate = moment(payrollStartDate).format("MMMM DD, YYYY");
                payrollEndDate   = moment(payrollEndDate).format("MMMM DD, YYYY");
                payrollDate      = `${payrollStartDate} - ${payrollEndDate}`;
            }

			html += `
			<tr class="btnView" id="${encryptString(payrollRegisterID)}">
                <td>${payrollRegisterCode}</td>
				<td>${payrollCode || "-"}</td>
                <td>${fullname || "-"}</td>
                <td>${payrollDate}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, payrollRegisterStatus, true))}
                </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(payrollRegisterStatus, employeeID != 0)}
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


    // ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			payrollRegisterID         = "",
			payrollRegisterCode       = "",
			revisePayrollRegisterID   = "",
			revisePayrollRegisterCode = "",
			employeeID        = "",
            payrollStartDate  = "",
			payrollEndDate    = "",
			payrollReason     = "",
			payrollRemarks    = "",
			approversID       = "",
			approversStatus   = "",
			approversDate     = "",
			payrollStatus     = 0,
            timekeepingID     = "",
            httApproversID    = "",
            httApproversDate  = "",
            httCreatedAt      = "",
			submittedAt       = false,
			createdAt         = false,
		} = data && data?.header;

		let adjustment = data?.adjustment;

		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("payrollRegisterID", encryptString(payrollRegisterID));
		$("#btnBack").attr("status", payrollStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);
		$("#btnBack").attr("code", payrollRegisterCode);

		let disabled = readOnly ? "disabled" : "";
		let button = adjustment != 1 ? formButtons(data, isRevise, isFromCancelledDocument) : "";

        let timekeepingCode = getFormCode("TK", httCreatedAt, timekeepingID);
        let timekeepingApproved = getDateApproved(2, httApproversID, httApproversDate);

		let startDate   = moment(payrollStartDate).format("MMMM DD, YYYY");
		let endDate     = moment(payrollEndDate).format("MMMM DD, YYYY");
        let payrollDate = `${startDate} - ${endDate}`;

		let reviseDocumentNo    = isRevise ? payrollRegisterID : revisePayrollRegisterID;
		let documentHeaderClass = isRevise || revisePayrollRegisterID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || revisePayrollRegisterID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || revisePayrollRegisterID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PAY", createdAt, reviseDocumentNo)}
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
							${payrollRegisterID && !isRevise ? payrollRegisterCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${payrollStatus && !isRevise ? getStatusStyle(payrollStatus, employeeID != 0) : "---"}
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
								${getDateApproved(payrollStatus, approversID, approversDate)}
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
							${payrollRemarks && !isRevise ? payrollRemarks : "---"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_payroll">

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Reference No.</label>
                    <input type="text" class="form-control" disabled value="${timekeepingCode}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>
						<i class="fal fa-info-circle" 
							style="color:#007bff;" 
							data-toggle="tooltip" 
							title="Timekeeping Date Approved" 
							data-original-title="Timekeeping Date Approved"></i>
							Date Approved
                    </label>
                    <input type="text" class="form-control" disabled value="${timekeepingApproved}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Payroll Period</label>
                    <input type="text" 
						class="form-control" 
						name="payrollPeriod"
						start="${payrollStartDate}"
						end="${payrollEndDate}"
						value="${payrollDate}"
						disabled>
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
                        id="payrollReason"
                        name="payrollReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${payrollReason || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-payrollReason"></div>
                </div>
            </div>

            <div class="col-sm-12 mt-3">
                <div class="w-100" id="tablePayrollParent">
					${payrollTable(payrollID, payrollStatus, adjustment, readOnly)}
				</div>
            </div>

            <div class="col-md-12 text-right mt-3" id="buttonDisplay">
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
		}, 100);
	}
	// ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
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


    // ----- VIEW/EDIT DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		$("#page_content").html(preloader);
		setTimeout(() => {
			viewDocument(id, true);
		}, 10);
	});
	// ----- END VIEW/EDIT DOCUMENT -----


    // ----- BADGE STATUS -----
	function getStatusStyle(status = 1, hasPreparedBy = false) {
		switch (status) {
			case "1":
				return `<span class="badge badge-outline-info w-100">For Approval</span>`;
			case "2":
				return `<span class="badge badge-info w-100">Approved</span>`;
			case "3":
				return `<span class="badge badge-danger w-100">Denied</span>`;
			case "4":
				return `<span class="badge badge-primary w-100">Cancelled</span>`;
			case "5":
				return `<span class="badge badge-secondary w-100">Dropped</span>`;
			case "6":
				return `<span class="badge badge-outline-info w-100">For Proposal</span>`;
			case "7":
				return `<span class="badge badge-outline-info w-100">Reassessment</span>`;
			case "8":
				return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Assessed</span>`;
			case "9":
				return `<span class="badge badge-outline-success w-100" style="width: 100% !important">Completed</span>`;
			case "0":
			default:
				let text = hasPreparedBy ? "Draft" : "Pending";
				return `<span class="badge badge-warning w-100">${text}</span>`;
		}
	}
	// ----- END BADGE STATUS -----


});
