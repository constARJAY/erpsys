$(document).ready(function() {

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

    const allowedUpdate = isUpdateAllowed(96);
    if(!allowedUpdate){
        $("#page_content").find("input, select, textarea").each(function(){
            $(this).attr("disabled",true);
        });
        $("#btnSubmit").hide();
    }

    //------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- MODULE APPROVER -----
    const moduleApprover = getModuleApprover("Salary Release");
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
    function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
            const tableData = getTableData("hris_salary_release_tbl", "", "salaryReleaseID=" + id);

            if (tableData.length > 0) {
                let {
                    employeeID,
                    payrollHoldStatus
                } = tableData[0];

                let isReadOnly = true, isAllowed = true;

                if (employeeID != sessionID) {
                    isReadOnly = true;
                    if (payrollHoldStatus == 0 || payrollHoldStatus == 4) {
                        isAllowed = false;
                    }
                } else if (employeeID == sessionID) {
                    if (payrollHoldStatus == 0) {
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
            window.history.pushState("", "", `${base_url}hris/salary_release?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id && isRevise) {
                window.history.pushState("", "", `${base_url}hris/salary_release?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}hris/salary_release?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}hris/salary_release`);
        }
    }
    // ----- END VIEW DOCUMENT -----

    // ----- DATATABLES -----
    function initDataTables() {

        if ($.fn.DataTable.isDataTable("#tableMyForms")) {
            $("#tableMyForms").DataTable().destroy();
        }

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
                    { targets: 0,  width: 150 },
                    { targets: 1,  width: 180 },
                    { targets: 2,  width: 150 },
                    { targets: 3,  width: 150 },
                    { targets: 4,  width: 180 },
                    { targets: 5,  width: 80  },
                    { targets: 6,  width: 80  },
                ],
            });

    }
    // ----- END DATATABLES -----


    // ----- HEADER CONTENT -----
    function headerTabContent(display = true) {
        if (display) {
            
        } else {
            $("#headerContainer").find(".appendHeader").remove();
        }
    }
    // ----- END HEADER CONTENT -----


    // ----- HEADER BUTTON -----
    function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
        let html;
        if (isAdd) {
            if(isCreateAllowed(96)){
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


    // ----- MY FORMS CONTENT -----
    function myFormsContent() {
        $("#tableMyFormsParent").html(preloader);
        let salaryReleaseData = getTableData(
            `hris_salary_release_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
            LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)`,
            `isrt.employeeID,
            isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,employeeStatus,
            isrt.monthID,
            isrt.monthDetailsID,
            CASE
            WHEN isrt.payrollID = 0 THEN isrt.monthCode
            WHEN isrt.payrollID != 0 THEN (SELECT CONCAT('PRL-',SUBSTR(createdAt,3,2),'-',LPAD(payrollID,5,'0')) FROM hris_payroll_tbl WHERE payrollID = isrt.payrollID)  
            END AS referenceCode,
            concat('SLR-',SUBSTR(isrt.createdAt,3,2),'-',LPAD(isrt.salaryReleaseID,5,'0')) AS salaryReleaseCode,
            (SELECT payrollID FROM hris_payroll_tbl WHERE payOut > hpt.payOut AND payrollStatus = 0 LIMIT 1) AS hasPayrollID`, // DITO NA KO
            ``,
            `FIELD(isrt.payrollHoldStatus, 0, 9)`
        );

        let html = `
        <table class="table table-bordered table-striped " id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Reference No.</th>
                    <th>Salary</th>
                    <th>Date Release</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

        salaryReleaseData.map((item) => {
            let {
            
                salaryReleaseID,
                salaryReleaseCode,
                payrollID,
                referenceCode,
                payrollItemID,
                monthID,
                monthDetailsID,
                employeeID,
                employeeStatus,
                payrollHoldStatus,
                netPay,
                dateRelease,
                hasPayrollID
            } = item;
            let dateReleased   = moment(dateRelease).format("MMMM DD, YYYY hh:mm:ss A");
            // let dateCreated   = moment(dateCreatedVoucher).format("MMMM DD, YYYY hh:mm:ss A");
            // let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
            // let dateApproved  = voucherStatus == 2 || voucherStatus == 5 ? approversDate.split("|") : "-";
            // if (dateApproved !== "-") {
            //     dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
            // }

            // ----- GET EMPLOYEE DATA -----
                let {
                    fullname:    employeeFullname    = "",
                    department:  employeeDepartment  = "",
                    designation: employeeDesignation = "",
                } = employeeData(item ? employeeID : sessionID);
                // ----- END GET EMPLOYEE DATA -----

            let isResigned = employeeStatus == 0 ? `<button class="btn btn-danger  w-100" disabled><i class="fas fa-hand-holding-usd"></i> On Backpay Only</button>`: 
            `<button class="btn btn-danger w-100 ${hasPayrollID != 'null' ? 'btnRelease' : ''}" 
                id="${encryptString(salaryReleaseID)}"  
                payrollID="${encryptString(payrollID)}"  
                payrollItemID="${encryptString(payrollItemID)}"
                monthID="${encryptString(monthID)}" 
                monthDetailsID="${encryptString(monthDetailsID)}" 
                salaryReleasePayrollID="${hasPayrollID}" 
                employeeID="${employeeID}"
                netPay="${netPay}"
                ${hasPayrollID == 'null' ? "disabled" : ""}>
                <i class="fas fa-hand-holding-usd"></i> Release
            </button>` ;


            let button = payrollHoldStatus != 0 ? `<button class="btn btn-view  w-100" disabled><i class="fas fa-hand-holding-usd"></i> Released</button>` : isResigned;

            html += `
            <tr class="" id="${encryptString(salaryReleaseID)}">
                <td>${salaryReleaseCode || "-"}</td>
                <td> <div>${employeeFullname}</div>
                <span><small>${employeeDepartment} | ${employeeDesignation}</small></span></td>
                <td>${referenceCode}</td>
                <td class="text-right">${formatAmount(netPay || "0",true)}</td>
                <td>${dateReleased != "Invalid date" ? dateReleased : "-"}</td>
                <td class="text-center">
                    ${getStatusStyle(payrollHoldStatus)}
                </td>
                <td>
                ${button}`;
                html +=`</td>
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

            headerButton(true, "Add Check Voucher");
            headerTabContent();
            myFormsContent();
            updateURL();
        } else {
            // headerButton(false, "", isRevise, isFromCancelledDocument);
            // headerTabContent(false);
            // formContent(data, readOnly, isRevise, isFromCancelledDocument);
        }
    }
    viewDocument();
    $("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- RELEASE DOCUMENT -----
    $(document).on("click", ".btnRelease", function () {
        const salaryReleaseID       = decryptString($(this).attr("id"));
        const payrollID              = decryptString($(this).attr("payrollID"));
        const payrollItemID          = decryptString($(this).attr("payrollItemID"));
        const monthID                = decryptString($(this).attr("monthID"));
        const monthDetailsID         = decryptString($(this).attr("monthDetailsID"));
        const salaryReleasePayrollID = $(this).attr("salaryReleasePayrollID");
        const employeeID             = $(this).attr("employeeID");
        const netPay =  +$(this).attr("netPay").replaceAll(",", "").replaceAll("₱", "");

        if (salaryReleasePayrollID != 'null')
        {
            let method = "submit";
            let formData = new FormData;
            formData.append("employeeID", employeeID);
            formData.append("salaryReleaseID", salaryReleaseID || null);
            formData.append("payrollID", payrollID || null);
            formData.append("payrollItemID", payrollItemID || null);
            formData.append("monthID", monthID || null);
            formData.append("monthDetailsID", monthDetailsID || null);
            formData.append("salaryReleasePayrollID", salaryReleasePayrollID);
            formData.append("netPay", netPay);
        
        
        
            const confirmation = getConfirmation(method);
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $.ajax({
                        method:      "POST",
                        url:         `salary_release/updateStatus`,
                        data:formData,
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
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} released successfully!`;
                            } else if (method == "save") {
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("SLR", dateCreated, insertedID)} dropped successfully!`;
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
                                    myFormsContent();
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
                }
                //  else {
                //     if (res.dismiss === "cancel" && method != "submit") {
                //         if (method != "deny") {
                //             if (method != "cancelform") {
                //                 true && callback();
                //             }
                //         } else {
                //             $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
                //         }
                //     } else if (res.isDismissed) {
                //         if (method == "deny") {
                //             $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
                //         }
                //     }
                // }
            });
        }
    });
    // ----- END RELEASE DOCUMENT -----


    // --------- MODAL FOR LOGS --------//
    $(document).on("click", "#btnLog", function () {

        const id       = $(this).attr("salaryReleaseID");

        $("#modal_inventory_receiving_content").html(preloader);
        $("#modal_inventory_receiving .page-title").text("SALARY RELEASED LOGS");
        $("#modal_inventory_receiving").modal("show");

        let logData = getTableData(
            `hris_salary_release_log_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
            `isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,employeeStatus,
            CASE
            WHEN isrt.payrollID = 0 THEN monthCode
            WHEN isrt.payrollID =! 0 THEN (SELECT CONCAT('PRL-',SUBSTR(createdAt,3,2),'-',LPAD(payrollID,5,'0')) FROM hris_payroll_tbl WHERE payrollID = isrt.payrollID)  
            END AS referenceCode,
            concat('SLR-',SUBSTR(isrt.createdAt,3,2),'-',LPAD(isrt.salaryReleaseID,5,'0')) AS salaryReleaseCode`,
            ``,
            `salaryReleaseLogID DESC`
        );

        let html =` <div class="card stats-box" style="height: 474px;
        max-height: 405px;
        overflow-y: auto;">

            <div class="card-body" style="height: 400px;
                    overflow-y: auto;">`;

        logData.map((item) => {
            let {
                fullname,
                salaryReleaseID,
                salaryReleaseCode,
                payrollID,
                referenceCode,
                payrollItemID,
                employeeID,
                employeeStatus,
                payrollHoldStatus,
                netPay,
                dateRelease,
                action,
                createdAt
            } = item;
            let dateCreated   = moment(createdAt).format("dddd, MMMM DD, YYYY");
            let dateReleased   = moment(dateRelease).format("dddd MMMM DD, YYYY");
            let timeCreated   = moment(createdAt).format("LT");
            let timeReleased   = moment(dateRelease).format("LT");

            html +=`<div class="timeline-item blue pb-1" date-is="${payrollHoldStatus == 9 ? dateReleased : dateCreated}">
                    <h5>${salaryReleaseCode}</h5>
                    <small>${action == "insert" ? `Inserted document` : `Released Document`} |</small>
                    <small>${payrollHoldStatus == 9 ? timeReleased : timeCreated}</small>
                </div>`;

        });

        if(logData.length <=0){
            html +=`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
            <img src="http://localhost/erpsys/assets/modal/no-data.gif" style="max-width: 300px;
                width: auto;
                min-width: 100px;
                height: auto;" alt="No history yet.">
            <span class="font-weight-bold">No history yet.</span>
        </div>`
        }


        
                
            
        html +=`
            </div>
        </div>`;

        setTimeout(() => {

            
        $("#modal_inventory_receiving_content").html(html);
            initDataTables();
            return html;
        }, 300);
    });
    // --------- MODAL FOR LOGS --------//


    function getConfirmation(method = "submit") {
        const title = "SALARY RELEASE PROCESS";
        const releaseTitle = "EMPLOYEE SALARY";
        let swalText, swalImg;

        $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("hide");

        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `${title.toUpperCase()}`;
                swalText  = "Are you sure to submit this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to approve this processing of salary release?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
                break;
            case "deny":
                swalTitle = `DENY ${title.toUpperCase()}`;
                swalText  = "Are you sure to deny this processing of salary release?";
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
            case "release":
                swalTitle = `RELEASE ${releaseTitle.toUpperCase()}`;
                swalText  = "Are you sure that you want to release this employee's salary?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
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


    function getStatusStyle(status = 1) {
        if (status == 0) {
            return `<span class="badge badge-warning w-100">For Releasing</span>`;
        } else {
            return `<span class="badge badge-success w-100">Released</span>`;
        }
    }


})      


