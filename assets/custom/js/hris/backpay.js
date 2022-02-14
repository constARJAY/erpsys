$(document).ready(function() {

    const MODULE_ID     = 95;
    const allowedUpdate = isUpdateAllowed(MODULE_ID);
    const allowedShow   = isShowAllowed(MODULE_ID);
    let isForViewing    = false;


    // ----- MODULE APPROVER -----
    const moduleApprover = getModuleApprover(MODULE_ID);
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
            const revisedDocumentsID = getTableData("hris_back_pay_tbl", "reviseBackPayID", "reviseBackPayID IS NOT NULL");
            return revisedDocumentsID.map(item => item.reviseBackPayID).includes(id);
        }
        return false;
    }
    // ----- END IS DOCUMENT REVISED -----


    // ----- VIEW DOCUMENT -----
    function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
            const tableData = getTableData("hris_back_pay_tbl", "", "backPayID=" + id);

            if (tableData.length > 0) {
                let {
                    employeeID,
                    backPayStatus
                } = tableData[0];

                let isReadOnly = true, isAllowed = true;

                if (employeeID != sessionID) {
                    isReadOnly = true;
                    if (backPayStatus == 0 || backPayStatus == 4) {
                        isAllowed = false;
                    }
                } else if (employeeID == sessionID) {
                    if (backPayStatus == 0) {
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
            window.history.pushState("", "", `${base_url}hris/backpay?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id && isRevise) {
                window.history.pushState("", "", `${base_url}hris/backpay?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}hris/backpay?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}hris/backpay`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // GLOBAL VARIABLE - REUSABLE 
    const dateToday = () => {
        return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
    };

    // ----- DATATABLES -----
    function initDataTables() {
        ["#tableMyForms", "#tableForApproval", "#tableForViewing"].map(element => {
            if ($.fn.DataTable.isDataTable(element)) {
               $(element).DataTable().destroy();
            }

            var table = $(element)
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
                        { targets: 1,  width: 300 },
                        { targets: 2,  width: 300 },
                        { targets: 3,  width: 300 },
                        { targets: 4,  width: 200 },
                        { targets: 5,  width: 300 },
                        { targets: 6,  width: 80  },
                        { targets: 7,  width: 80  },
                        { targets: 8,  width: 300 },
                    ],
                });
        })

        if ($.fn.DataTable.isDataTable("#tableInventoryReceivingItems")) {
            $("#tableForApproval").DataTable().destroy();
        }

        if ($.fn.DataTable.isDataTable("#tableInventoryReceivingItems0")) {
            $("#tableMyForms").DataTable().destroy();
        }

        var table = $("#tableInventoryReceivingItems")
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
                    { targets: 0,  width: 100 },
                    { targets: 1,  width: 150 },
                    { targets: 2,  width: 120 },
                ],
            });

        var table = $("#tableInventoryReceivingItems0")
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable({
                proccessing: false,
                serverSide: false,
                paging: false,
                info: false,
                scrollX: true,
                scrollCollapse: true,
                sorting: false,
                columnDefs: [
                    { targets: 0,  width: 100 },
                    { targets: 1,  width: 150 },
                    { targets: 2,  width: 120 }
                ],
            });

    }
    // ----- END DATATABLES -----


    // ----- HEADER CONTENT -----
    function headerTabContent(display = true) {
        if (display) {
            if (isImModuleApprover("hris_back_pay_tbl", "approversID") || allowedShow) {
                let count = getCountForApproval("hris_back_pay_tbl", "backPayStatus");
                let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
                let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            ${allowedShow ? `<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forViewingTab" redirect="forViewingTab">For Viewing</a></li>` : ""}  
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
            if(isCreateAllowed(MODULE_ID)){
                html ='';
            }
        } else {
            html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
        }
        $("#headerButton").html(html);
    }
    // ----- END HEADER BUTTON -----


    // ----- FOR VIEWING CONTENT -----
    function forViewingContent() {
        $("#tableForViewingParent").html(preloader);

        let backPayViewingData = getTableData(
            `hris_back_pay_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN hris_employee_list_tbl AS backhelt ON backhelt.employeeID = isrt.backPayEmployeeID`,
            `isrt.*, CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname, 
            CONCAT(backhelt.employeeFirstname, ' ', backhelt.employeeLastname) AS backpayfullname`,
            `isrt.employeeID != ${sessionID} AND backPayStatus != 0 AND backPayStatus != 4 AND backPayStatus = 2`,
            `FIELD(backPayStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
        );

        let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForViewing">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Prepared By</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Release Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

            backPayViewingData.map((item) => {
            let {
                backpayfullname,
                backPayID,
                backPayCode,
                backPayDescription,
                backPayStatus,
                releaseStatus,
                approversID,
                approversDate,
                approversStatus,
                backPayRemarks,
                submittedAt,
                createdAt,
                employeeID,
                backPayEmployeeID
            } = item;

            let {
                fullname:    employeePerparedFullname    = "",
                department:  employeeDepartment  = "",
                designation: employeeDesignation = "",
            } = employeeData(item ? employeeID : sessionID);

            let {
                fullname:    employeeBackPayFullname    = "",
                department:  employeeBackPayDepartment  = "",
                designation: employeeBackPayDesignation = "",
            } = employeeData(item ? backPayEmployeeID : 0);

            let remarks       = backPayRemarks ? backPayRemarks : "-";
            let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
            let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
            let dateApproved  = approversStatus == 2 || approversStatus == 5 ? approversDate.split("|") : "-";
            if (dateApproved !== "-") {
                dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
            }

            let btnClass =  backPayStatus != 0 ? `btnView` : `btnEdit`;
            html += `
            <tr class="${btnClass}" id="${encryptString(backPayID)}" isForViewing="true">
                <td>${backPayCode}</td>
                <td><div>${employeeBackPayFullname}</div>
                <small>${employeeBackPayDepartment || "-"} | ${employeeBackPayDesignation}</small>
                </td>
                <td><div>${employeePerparedFullname}</div>
                <small>${employeeDepartment} | ${employeeDesignation}</small>
                </td>
                <td>${backPayDescription || "-"}</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, backPayStatus, true))}
                </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(backPayStatus)}
                </td>
                <td class="text-center">
                    ${getStatusStyle(releaseStatus,false,true)}
                </td>
                <td>${remarks}</td>
            </tr>`;
        });

        html += `
            </tbody>
        </table>`;

        setTimeout(() => {
            $("#tableForViewingParent").html(html);
            initDataTables();
        }, 300);
    }
    // ----- END FOR VIEWING CONTENT -----


    // ----- FOR APPROVAL CONTENT -----
    function forApprovalContent() {
        $("#tableForApprovalParent").html(preloader);

        let backPayApprovalData = getTableData(
            `hris_back_pay_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN hris_employee_list_tbl AS backhelt ON backhelt.employeeID = isrt.backPayEmployeeID`,
            `isrt.*, CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname, 
            CONCAT(backhelt.employeeFirstname, ' ', backhelt.employeeLastname) AS backpayfullname`,
            `isrt.employeeID != ${sessionID} AND backPayStatus != 0 AND backPayStatus != 4`,
            `FIELD(backPayStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
        );

        let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApproval">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Prepared By</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Release Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

            backPayApprovalData.map((item) => {
            let {
                backpayfullname,
                backPayID,
                backPayCode,
                backPayDescription,
                backPayStatus,
                releaseStatus,
                approversID,
                approversDate,
                approversStatus,
                backPayRemarks,
                submittedAt,
                createdAt,
                employeeID,
                backPayEmployeeID
            } = item;

            let {
                fullname:    employeePerparedFullname    = "",
                department:  employeeDepartment  = "",
                designation: employeeDesignation = "",
            } = employeeData(item ? employeeID : sessionID);


            let {
                fullname:    employeeBackPayFullname    = "",
                department:  employeeBackPayDepartment  = "",
                designation: employeeBackPayDesignation = "",
            } = employeeData(item ? backPayEmployeeID : 0);

            let remarks       = backPayRemarks ? backPayRemarks : "-";
            let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
            let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
            let dateApproved  = approversStatus == 2 || approversStatus == 5 ? approversDate.split("|") : "-";
            if (dateApproved !== "-") {
                dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
            }

            let button = backPayStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(backPayID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(backPayID)}" 
                code="${backPayCode}"><i class="fas fa-edit"></i> Edit</button>`;

            let btnClass =  backPayStatus != 0 ? `btnView` : `btnEdit`;

            if (isImCurrentApprover(approversID, approversDate, backPayStatus) || isAlreadyApproved(approversID, approversDate)) {
                html += `
                <tr class="${btnClass}" id="${encryptString(backPayID)}">
                    <td>${backPayCode}</td>
                    <td><div>${employeeBackPayFullname}</div>
                    <small>${employeeBackPayDepartment || "-"} | ${employeeBackPayDesignation}</small>
                    </td>
                    <td><div>${employeePerparedFullname}</div>
                    <small>${employeeDepartment} | ${employeeDesignation}</small>
                    </td>
                    <td>${backPayDescription || "-"}</td>
                    <td>
                        ${employeeFullname(getCurrentApprover(approversID, approversDate, backPayStatus, true))}
                    </td>
                    <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                    <td class="text-center">
                        ${getStatusStyle(backPayStatus)}
                    </td>
                    <td class="text-center">
                    ${getStatusStyle(releaseStatus,false,true)}
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
        }, 300);
    }
    // ----- END FOR APPROVAL CONTENT -----


    // ----- MY FORMS CONTENT -----
    function myFormsContent() {
        $("#tableMyFormsParent").html(preloader);
        let backPayData = getTableData(
            `hris_back_pay_tbl AS isrt 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN hris_employee_list_tbl AS backhelt ON backhelt.employeeID = isrt.backPayEmployeeID`,
            `isrt.*, CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname, 
            CONCAT(backhelt.employeeFirstname, ' ', backhelt.employeeLastname) AS backpayfullname`,
            `isrt.employeeID = ${sessionID}`,
            `FIELD(backPayStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
        );

        
        let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Document No.</th>
                    <th>Employee Name</th>
                    <th>Prepared By</th>
                    <th>Description</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Release Status</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>`;

        backPayData.map((item) => {
            let {
                
                backpayfullname,
                backPayID,
                backPayCode,
                backPayDescription,
                backPayStatus,
                releaseStatus,
                approversID,
                approversDate,
                approversStatus,
                backPayRemarks,
                submittedAt,
                createdAt,
                employeeID,
                backPayEmployeeID
            } = item;
            let remarks       = backPayRemarks ? backPayRemarks : "-";
            let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
            let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
            let dateApproved  = approversStatus == 2 || approversStatus == 5 ? approversDate.split("|") : "-";
            if (dateApproved !== "-") {
                dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
            }

                // ----- GET EMPLOYEE DATA -----
                let {
                    fullname:    employeePerparedFullname    = "",
                    department:  employeeDepartment  = "",
                    designation: employeeDesignation = "",
                } = employeeData(item ? employeeID : sessionID);


                let {
                    fullname:    employeeBackPayFullname    = "",
                    department:  employeeBackPayDepartment  = "",
                    designation: employeeBackPayDesignation = "",
                } = employeeData(item ? backPayEmployeeID : 0);


            let button = backPayStatus != 0 ? `
            <button class="btn btn-view w-100 btnView" id="${encryptString(backPayID)}"><i class="fas fa-eye"></i> View</button>` : `
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${encryptString(backPayID)}" 
                code="${backPayCode}"><i class="fas fa-edit"></i> Edit</button>`;
        
                let btnClass =  backPayStatus != 0 ? `btnView` : `btnEdit`;

            html += `
            <tr class="${btnClass}" id="${encryptString(backPayID)}">
                <td>${backPayCode || "-"}</td>
                <td><div>${employeeBackPayFullname}</div>
                <small>${employeeBackPayDepartment || ""} | ${employeeBackPayDesignation}</small>
                </td>
                <td><div>${employeePerparedFullname}</div>
                <small>${employeeDepartment} | ${employeeDesignation}</small>
                </td>
                <td>${backPayDescription || "-"}</td>
                <td>
                        ${employeeFullname(getCurrentApprover(approversID, approversDate, backPayStatus, true))}
                    </td>
                <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(backPayStatus)}
                </td>
                <td class="text-center">
                ${getStatusStyle(releaseStatus,false,true)}
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

    // ---- FUNCTION COMPUTE TOTAL AMOUNT -----//
    function computeTotalAmount(){
        var tmpTotalAmount = 0;

        $(`[name="backPayAmount"]`).each(function(){
            var tmpAmountRow = $(this).text() ? $(this).text().replaceAll("₱","").replaceAll(",","") : $(this).val().replaceAll("₱","").replaceAll(",","");
            tmpTotalAmount += parseFloat(tmpAmountRow) || 0;

            $(".computecredit").text(formatAmount(tmpTotalAmount,true));
        })
    }
    // ---- FUNCTION COMPUTE TOTAL AMOUNT -----//


    // ----- FORM BUTTONS -----
    function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
        let button = "";
        if (data) {
            let {
                backPayEmployeeID ="",
                backPayID     = "",
                backPayCode ="",
                backPayStatus = "",
                releaseStatus = "",
                employeeID               = "",
                approversID              = "",
                approversDate            = "",
                createdAt                = new Date
            } = data && data[0];

            let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
            if (employeeID === sessionID) {
                if (backPayStatus == 0 || isRevise) {
                    // DRAFT
                    button = `
                    <button 
                        class="btn btn-submit px-5 p-2" 
                        id="btnSubmit" 
                        backPayID="${backPayID}"
                        code="${backPayCode}"
                        revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
                        Submit
                    </button>`;

                    if (isRevise) {
                        button += `
                        <button 
                            class="btn btn-cancel  px-5 p-2" 
                            id="btnCancel"
                            revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
                            Cancel
                        </button>`;
                    } else {
                        button += `
                        <button 
                            class="btn btn-cancel px-5 p-2"
                            id="btnCancelForm" 
                            backPayID="${backPayID}"
                            code="${backPayCode}"
                            revise=${isRevise}><i class="fas fa-ban"></i> 
                            Cancel
                        </button>`;
                    }

                    
                } else if (backPayStatus == 1) {
                    // FOR APPROVAL
                    if (!isOngoing) {
                        button = `
                        <button 
                            class="btn btn-cancel px-5 p-2"
                            id="btnCancelForm" 
                            backPayID="${backPayID}"
                            code="${backPayCode}"
                            status="${backPayStatus}"><i class="fas fa-ban"></i> 
                            Cancel
                        </button>`;
                    }
                } else if (backPayStatus == 2) {
                    // FOR RELEASE // DEFAULT IS DROP

                    if(releaseStatus == 0 ){
                        button = `
                            <button type="button" 
                                class="btn btn-success px-5 p-2"
                                id="btnRelease" 
                                backPayID="${encryptString(backPayID)}"
                                backPayEmployeeID="${encryptString(backPayEmployeeID)}"
                                code="${backPayCode}"
                                status="${backPayStatus}"><i class="fas fa-hand-holding-usd"></i>
                                Release
                            </button>`;
                    }
                    
                } else if (backPayStatus == 3) {
                    // DENIED - FOR REVISE
                    if (!isDocumentRevised(backPayID)) {
                        button = `
                        <button
                            class="btn btn-cancel px-5 p-2"
                            id="btnRevise" 
                            backPayID="${encryptString(backPayID)}"
                            code="${backPayCode}"
                            status="${backPayStatus}"><i class="fas fa-clone"></i>
                            Revise
                        </button>`;
                    }
                } else if (backPayStatus == 4) {
                    // CANCELLED - FOR REVISE
                    if (!isDocumentRevised(backPayID)) {
                        button = `
                        <button
                            class="btn btn-cancel px-5 p-2"
                            id="btnRevise" 
                            backPayID="${encryptString(backPayID)}"
                            code="${backPayCode}"
                            status="${backPayStatus}"
                            cancel="true"><i class="fas fa-clone"></i>
                            Revise
                        </button>`;
                    }
                }
            } else {
                if (backPayStatus == 1) {
                    if (isImCurrentApprover(approversID, approversDate)) {
                        button = `
                        <button 
                            class="btn btn-submit px-5 p-2" 
                            id="btnApprove" 
                            backPayID="${encryptString(backPayID)}"
                            code="${backPayCode}"><i class="fas fa-paper-plane"></i>
                            Approve
                        </button>
                        <button 
                            class="btn btn-cancel px-5 p-2"
                            id="btnReject" 
                            backPayID="${encryptString(backPayID)}"
                            code="${backPayCode}"><i class="fas fa-ban"></i> 
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


    // ----- GET SERVICE ROW -----
    function getItemsRow(backPayID = "", readOnly = false,backPayEmployeeID = 0) {
        let html = "";
        let requestData;	
        let salaryContent = "";
        let monthProcessContent ="";
        let othersContent="";

        if (backPayID) {
            requestData = getTableData(
                `hris_back_pay_details_tbl AS backDetails
                LEFT JOIN hris_salary_release_tbl AS released ON released.salaryReleaseID =backDetails.salaryReleaseID
                LEFT JOIN hris_13month_tbl AS process ON process.monthID =backDetails.monthID`,
                `backDetails.backPayDetailsID ,
                backDetails.backPayID,
                backDetails.salaryReleaseID,
                otherReference AS salaryReleaseCode,
                backDetails.monthID AS monthID,
                otherReference AS monthCode,
                backDetails.amount,
                backDetails.othersAmountStatus,
                backDetails.otherReference`,
                `backDetails.backPayID = ${backPayID}`
            )
        }

        if(requestData.length <= 0){
            requestData = getTableData(
                `hris_salary_release_tbl AS releasetable
                    LEFT JOIN hris_13month_tbl AS process ON process.monthID = releasetable.monthID`,
                `${backPayID} as backPayID,
                releasetable.salaryReleaseID,
                concat('SRL-',SUBSTR(releasetable.createdAt,3,2),'-',LPAD(releasetable.salaryReleaseID,5,'0')) AS salaryReleaseCode,
                releasetable.monthID as monthID,
                concat('13MP-',SUBSTR(process.createdAt,3,2),'-',LPAD(process.monthID,5,'0')) AS monthCode,
                releasetable.netPay as amount,
                0 AS othersAmountStatus`,
                `releasetable.employeeID = ${backPayEmployeeID}`);
        }

                
        
        if (requestData.length > 0) {
            requestData.map((item, index) => {
        
                let {
                    backPayDetailsID = "",
                    backPayID = "",
                    salaryReleaseID = "",
                    salaryReleaseCode = "",
                    monthID = "",
                    monthCode = "",
                    amount = "",
                    othersAmountStatus ="",
                    otherReference="",
                } = item;

            
                if (readOnly) {

                    if(salaryReleaseID && (monthID == 0 || monthID == null) && othersAmountStatus == 0 ){
                        salaryContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="0">
                                <td></td>
                                <td>
                                    <div name="otherReference">${salaryReleaseCode || "-"}</div>
                                </td>
                                <td>
                                <div class=" text-right" name="backPayAmount">${formatAmount(amount,true)}</div>
                                </td>
                            </tr>`;
                    }

                    if(salaryReleaseID && (monthID > 0 && monthID != null)  && othersAmountStatus == 0  ){
                        monthProcessContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="0">
                                <td></td>
                                <td>
                                    <div name="otherReference">${monthCode || "-"}</div>
                                </td>
                                <td>
                                <div class=" text-right" name="backPayAmount">${formatAmount(amount,true)}</div>
                                </td>
                            </tr>`;
                    }

                    if(othersAmountStatus != 0 && othersAmountStatus != null){
                        othersContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="${othersAmountStatus}">
                                <td></td>
                                <td>
                                    <div name="otherReference">${ otherReference || "-"}</div>
                                </td>
                                <td>
                                <div class=" text-right" name="backPayAmount">${formatAmount(amount,true)}</div>
                                </td>
                            </tr>`;
                    }
                    
                    
                } else {

                    if(salaryReleaseID &&  (monthID == 0 || monthID == null) && othersAmountStatus == 0){
                        salaryContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="0">
                                <td></td>
                                <td>
                                    <div name="otherReference">${salaryReleaseCode || "-"}</div>
                                </td>
                                <td>
                                <div class=" text-right" name="backPayAmount">${formatAmount(amount,true)}</div>
                                </td>
                            </tr>`;
                    }

                    if(salaryReleaseID && (monthID > 0 && monthID != null) && othersAmountStatus == 0){
                        monthProcessContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="0">
                                <td></td>
                                <td>
                                    <div name="otherReference">${monthCode || "-"}</div>
                                </td>
                                <td>
                                <div class=" text-right" name="backPayAmount">${formatAmount(amount,true)}</div>
                                </td>
                            </tr>`;
                    }

                    if(othersAmountStatus != 0 && othersAmountStatus != null){
                        othersContent += `
                            <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="${salaryReleaseID}" monthID="${monthID || 0}" othersAmountStatus="${othersAmountStatus}">
                                <td><small><button class="btn btn-primary btn-sm btnDeleteRow"><i class="fas fa-minus"></i></button></small></td>
                                <td>
                                <div class="form-group mb-0">
                                        <input 
                                        class="form-control validate" 
                                        name="otherReference" 
                                        id="otherReference" 
                                        data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][_][(][)][%][&][*][ ]"
                                        required
                                        value="${ otherReference || "-"}">
                                        <div class="d-block invalid-feedback" id="invalid-otherReference"></div>
                                    </div>
                                </td>
                                <td>
                                <div class="form-group  mb-0">
                                    <input type="text" 
                                        class="form-control amount text-right" 
                                        name="backPayAmount"
                                        id="backPayAmount"
                                        min="-999999" 
                                        max="999999" 
                                        minlength="1" 
                                        maxlength="20"
                                        value="${formatAmount(amount,true)}"
                                        required>
                                </div>
                                <div class="d-block invalid-feedback" id="invalid-backPayAmount"></div>
                            </div>
                                </td>
                            </tr>`;
                    }

                

                }
            })
        
            
        } else {
            if (!readOnly) {
                othersContent += `
                <tr class="itemTableRow" backPayID="${backPayID}" salaryReleaseID="0" monthID="0" othersAmountStatus="1">
                    <td><small><button class="btn btn-primary btn-sm btnDeleteRow"><i class="fas fa-minus"></i></button></small></td>
                    <td>
                    <div class="form-group mb-0">
                            <input 
                            class="form-control validate" 
                            name="otherReference" 
                            id="otherReference" 
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][_][(][)][%][&][*][ ]"
                            required>
                            <div class="d-block invalid-feedback" id="invalid-otherReference"></div>
                        </div>
                    </td>
                    <td>
                    <div class="form-group  mb-0">
                        <input type="text" 
                            class="form-control amount text-right" 
                            name="backPayAmount"
                            id="backPayAmount"
                            min="-999999" 
                            max="999999" 
                            minlength="1" 
                            maxlength="20"
                            required>
                    </div>
                    <div class="d-block invalid-feedback" id="invalid-backPayAmount"></div>
                </div>
                    </td>
                </tr>`;
            }
        }

        return [salaryContent,monthProcessContent,othersContent];
        
    }
    // ----- END GET SERVICE ROW -----

    // ----- UPDATE TABLE ROWS -----
    function updateTableRows(){
        $(".itemTableRow").each(function(i){
            // $("td .action .checkboxassetrow", this).attr("id", `checkboxassetrow${i}`);

            // INPUTS ID's
            let backPayID = 0;
            backPayID =  $(this).attr("backPayID");
            
            $("td [name=otherReference]", this).attr("id", `otherReference${backPayID}${i}`);
            $("td [name=otherReference]", this).attr("index", i);
            $("td #invalid-otherReference",this).attr("id", `invalid-otherReference${i}`);

            $("td [name=backPayAmount]", this).attr("id", `backPayAmount${backPayID}${i}`);
            $("td [name=backPayAmount]", this).attr("index", i);
            $("td #invalid-backPayAmount", this).attr("id", `invalid-backPayAmount${i}`);



        });
    }   
    // ----- END UPDATE TABLE ROWS -----


    // ---- UPDATE DELETE TABLE ROW ----//
    function deleteTableRow(parentTable){  
        if (parentTable) {
            Swal.fire({
                title:              "DELETE THIS ROW",
                text:               "Are you sure to delete the row?",
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
                    parentTable.remove();
                    updateTableRows();
                    computeTotalAmount();
                }
            });
            
        } else {
            showNotification("danger", "You must have at least one or more row.");
        }
    }
    // ---- END UPDATE DELETE TABLE ROW ----//


    // ---- BUTTON FOR ADD ROW ------//
    $(document).on("click", ".btnAddRow", function(){
            
        let backPayID = $(this).attr("backPayID");
        let row = getItemsRow(backPayID,false);
        $(".purchaseOrderItemsBody").append(row[2]);  
        updateTableRows();
        initAmount("",false,true);
        computeTotalAmount();
    });
    // ---- BUTTON FOR ADD ROW ------//


    // ---- BUTTON FOR DELETE ROW -----//
    $(document).on("click", ".btnDeleteRow", function(){
        let parentTable  =   $(this).closest(".itemTableRow");
        deleteTableRow(parentTable);

    });
    // ---- BUTTON FOR DELETE ROW -----//


    // ---- KEY UP FOR TOTAL AMOUNT ---//
    $(document).on("keyup",`[name="backPayAmount"]`,function(){
        
        computeTotalAmount();
    })
    // ---- KEY UP FOR TOTAL AMOUNT ---//



    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
        $("#page_content").html(preloader);
        readOnly = isRevise ? false : readOnly;

        let {
            backPayID        = "",
            reviseBackPayID  = "",
            backPayCode ="",
            employeeID              = "",
            backPayEmployeeID   ="",
            backPayRemarks  = "",
            backPayDescription  = "",
            approversID             = "",
            approversStatus         = "",
            approversDate           = "",
            backPayStatus   = false,
            submittedAt             = false,
            createdAt               = false,
        } = data && data[0];


        let purchaseOrderItems = "";
        if (backPayID) {
            purchaseOrderItems = getItemsRow(backPayID, readOnly,backPayEmployeeID);
        } 

        // ----- GET EMPLOYEE DATA -----
        let {
            fullname:    employeeFullname    = "",
            department:  employeeDepartment  = "",
            designation: employeeDesignation = "",
        } = employeeData(data ? employeeID : sessionID);

        const requestEmployeeData = getTableData(
            `
            hris_employee_list_tbl AS helt
                LEFT JOIN hris_department_tbl USING(departmentID)
                LEFT JOIN hris_designation_tbl USING(designationID)`,
            `
            employeeCode as requestemployeeCode,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS requestemployeeFullname,
            departmentName as requestemployeeDepartment,
            designationName as requestemployeeDesignation,
            employeeStatus as requestemployeeStatus`,
            "employeeStatus = 7 && employeeID=" + backPayEmployeeID 
        );

        let {
            requestemployeeCode    = "",
            requestemployeeFullname    = "",
            requestemployeeStatus    = "",
            requestemployeeDepartment  = "",
            requestemployeeDesignation = "",
        } = requestEmployeeData[0];
        // ----- END GET EMPLOYEE DATA -----

        readOnly ? preventRefresh(false) : preventRefresh(true);

        $("#btnBack").attr("backPayID", backPayID);
        $("#btnBack").attr("status", backPayStatus);
        $("#btnBack").attr("employeeID", employeeID);
        $("#btnBack").attr("cancel", isFromCancelledDocument);

        let disabled = readOnly ? "disabled" : "";
        let addBtn = readOnly ? "" : `<small><button class="btn btn-secondary btn-sm btnAddRow" backPayID="${backPayID}"><i class="fas fa-plus"></i></button></small>`;

        

        // let disabledReference = purchaseOrderID && purchaseOrderID != "0" ? "disabled" : disabled;

        let tableInventoryReceivingItems = !disabled ? "tableInventoryReceivingItems" : "tableInventoryReceivingItems0";

        let button = formButtons(data, isRevise, isFromCancelledDocument);
        let reviseDocumentNo    = isRevise ? backPayID  : reviseBackPayID ;
        let documentHeaderClass = isRevise || reviseBackPayID  ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
        let documentDateClass   = isRevise || reviseBackPayID  ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
        let documentReviseNo    = isRevise || reviseBackPayID  ? `
        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
            <div class="card">
                <div class="body">
                    <small class="text-small text-muted font-weight-bold">Revised Document No.</small>
                    <h6 class="mt-0 text-danger font-weight-bold">
                        ${getFormCode("BPY", createdAt, reviseDocumentNo)}
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
                            ${backPayID  && !isRevise ? backPayCode : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
                            ${backPayStatus && !isRevise ? getStatusStyle(backPayStatus) : "---"}
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
                                ${getDateApproved(backPayStatus, approversID, approversDate)}
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
                            ${backPayRemarks && !isRevise ? backPayRemarks : "---"}
                        </h6>      
                    </div>
                </div>
            </div>
        </div>
        
        

        <div class="row" id="form_inventory_receiving">

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
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea 
                    rows="2" 
                    style="resize: none" 
                    class="form-control validate" 
                    name="backPayDescription" 
                    id="backPayDescription" 
                    data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                    minlength="2"
                    maxlength="150"
                    required
                    ${disabled}>${ backPayDescription || ""}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-backPayDescription"></div>
                </div>
            </div>

            <div class="col-sm-12">
                <div class="w-100">
                    <hr class="pb-1">
                    <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Details: </div>
                        <div class="row mt-4">
                            <div class="col-sm-0 col-md-0 col-lg-6">

                                <div class="position-list" id="">
                                    <div class="card my-0 p-2 mt-2" style="box-shadow: none !important;">

                                    <div class="card-body">

                                    <div class="form-group">
                                        <label>Employee No.:</label>
                                        <span class="form-control">${requestemployeeCode || "-"}</span>
                                    </div>

                                    <div class="form-group">
                                        <label>Employee Name:</label>
                                        <span class="form-control">${requestemployeeFullname || "-"}</span>
                                    </div>

                                    <div class="form-group">
                                        <label>Employee Status:</label><br>
                                    ${requestemployeeStatus == 4 ? `<span class="badge badge-secondary w-25">RETIRED</span>`: `<span class="badge badge-danger w-25">RENDERING</span>`}
                                    </div>

                                    <div class="form-group">
                                        <label>Department:</label>
                                        <span class="form-control">${requestemployeeDepartment || "-"}</span>
                                    </div>

                                    <div class="form-group">
                                        <label>Designation:</label>
                                        <span class="form-control">${requestemployeeDesignation || "-"}</span>
                                    </div>
                                </div>        
                            </div>   
                        </div>            
                    </div>

                        <div class="col-sm-12 col-md-12 col-lg-6">
                        <table class="table table-striped" id="${tableInventoryReceivingItems}">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>Category</th>
                                <th>Reference No.</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody class="purchaseOrderItemsBody">
                            <tr class="text-center">
                                <td  style="font-size: 1.1rem; font-weight:bold" class="text-left">Salary: </td>
                                <td></td>
                                <td></td> 
                            </tr>
                            ${purchaseOrderItems[0]}
                            <tr class="text-center">
                                <td  style="font-size: 1.1rem; font-weight:bold" class="text-left">13 Month: </td>
                                <td></td>
                                <td></td> 
                            </tr>
                            ${purchaseOrderItems[1]}
                            <tr class="text-center">
                                <td  style="font-size: 1.1rem; font-weight:bold" class="text-left"> ${addBtn} Others:</td>
                                <td></td>
                                <td></td> 
                            </tr>
                            ${purchaseOrderItems[2]}
                        </tbody>
                        
                        <tbody>
                        <tr class="text-center">
                            <td  style="font-size: 1.1rem; font-weight:bold" class="text-left">Total:</td>
                            <td></td>
                            <td class="text-right text-danger" style="font-size: 1.0rem; font-weight:bold"><span class="computecredit">${formatAmount(0,true)}</span> 

                        </tr>
                        </tbody>
                    </table>
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

        setTimeout(() => {
            $("#page_content").html(html);
            initDataTables();
            initAll();
            initAmount("",false,true);
            computeTotalAmount();

            // ----- NOT ALLOWED FOR UPDATE -----
            if (!allowedUpdate) {
                $("#page_content").find(`input, select, textarea`).each(function() {
                if (this.type != "search") {
                $(this).attr("disabled", true);                    }
                })
                $('#btnBack').attr("status", "2");
                $(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
            }
            // ----- END NOT ALLOWED FOR UPDATE -----
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
                <div role="tabpanel" class="tab-pane" id="forViewingTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForViewingParent">
                    </div>
                </div>
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

            headerButton(true, "Add Back Pay");
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


    // ----- GET INVENTORY RECEIVING DATA -----
    function getInventoryReceivingData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

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
            data["backPayID"] = id;
            formData.append("backPayID", id);

            if (status != "2") {
                data["backPayStatus"] = status;
                formData.append("backPayStatus", status);
            }
        }

        data["action"]    = action;
        data["method"]    = method;
        data["updatedBy"] = sessionID;

        formData.append("action", action);
        formData.append("method", method);
        formData.append("updatedBy", sessionID);

        if (currentStatus == "0" && method != "approve") {
            
            data["employeeID"] = sessionID;
            
            data["backPayDescription"]  = $("[name=backPayDescription]").val()?.trim() || null;


            formData.append("employeeID", sessionID);
            formData.append("backPayDescription", $("[name=backPayDescription]").val()?.trim());

            if (action == "insert") {
                data["createdBy"] = sessionID;
                data["createdAt"] = dateToday();

                formData.append("createdBy", sessionID);
                formData.append("createdAt", dateToday());
            } else if (action == "update") {
                data["backPayID"] = id;

                formData.append("backPayID", id);
            }

            if (method == "submit") {
                data["submittedAt"] = dateToday();
                formData.append("submittedAt", dateToday());
                if (approversID) {
                    data["approversID"] = approversID;
                    data["backPayStatus"] = 1;

                    formData.append("approversID", approversID);
                    formData.append("backPayStatus", 1);
                } else {  // AUTO APPROVED - IF NO APPROVERS
                    data["approversID"]     = sessionID;
                    data["approversStatus"] = 2;
                    data["approversDate"]   = dateToday();
                    data["backPayStatus"] = 2;

                    formData.append("approversID", sessionID);
                    formData.append("approversStatus", 2);
                    formData.append("approversDate", dateToday());
                    formData.append("backPayStatus", 2);
                }
            }

            $(".itemTableRow").each(function(i, obj) {
                const backPayID             = $(this).attr("backPayID");
                const salaryReleaseID       = $(this).attr("salaryReleaseID");
                const monthID               = $(this).attr("monthID");
                const othersAmountStatus    = $(this).attr("othersAmountStatus");

                const otherReference     = $("td [name=otherReference]", this).val() !='' ? $("td [name=otherReference]", this).val() : $("td [name=otherReference]", this).text()?.trim();	
                const backPayAmount     = $("td [name=backPayAmount]", this).val().replaceAll(",","");	

            
                let temp = {
                    backPayID,
                    salaryReleaseID,
                    monthID,
                    othersAmountStatus,
                    otherReference,
                    backPayAmount,
                };

                formData.append(`items[${i}][backPayID]`, backPayID);
                formData.append(`items[${i}][salaryReleaseID]`, salaryReleaseID);
                formData.append(`items[${i}][monthID]`, monthID);
                formData.append(`items[${i}][othersAmountStatus]`, othersAmountStatus);
                formData.append(`items[${i}][otherReference]`, otherReference);
                formData.append(`items[${i}][backPayAmount]`, backPayAmount);
            

                data["items"].push(temp);
            });
        } 

        

        return isObject ? data : formData;
    }
    // ----- END GET INVENTORY RECEIVING DATA -----


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
        isForViewing = $(this).attr("isForViewing") == "true";
        viewDocument(id, true);
    });
    // ----- END VIEW DOCUMENT -----


    // ----- VIEW DOCUMENT -----
    $(document).on("click", "#btnRevise", function () {
        const id = $(this).attr("backPayID");
        viewDocument(id, false, true);
    });
    // ----- END VIEW DOCUMENT -----


    // ----- SAVE CLOSE FORM -----
    $(document).on("click", "#btnBack", function () {
        const id         = $(this).attr("backPayID");
        const isFromCancelledDocument = $(this).attr("cancel") == "true";
        const revise     = $(this).attr("revise") == "true";
        const employeeID = $(this).attr("employeeID");
        const feedback   = $(this).attr("code") || getFormCode("BPY", dateToday(), id);
        const status     = $(this).attr("status");

        if (status != "false" && status != 0) {
            
            if (revise) {
                const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
                const data   = getInventoryReceivingData(action, "save", "0", id);
                data["backPayStatus"]   = 0;
                data.append("backPayStatus", 0);

                if (!isFromCancelledDocument) {
                    data.append("reviseBackPayID", id);
                    data.delete("backPayID");
                } else {
                    data.append("backPayID", id);
                    data.delete("action");
                    data.append("action", "update");
                }

                saveInventoryReceiving(data, "save", null, pageContent);
            } else {
                $("#page_content").html(preloader);
                pageContent();

                if (employeeID != sessionID) {
                    $("[redirect=forApprovalTab]").length && (isForViewing ? $("[redirect=forViewingTab]").trigger("click") : $("[redirect=forApprovalTab]").trigger("click"));
                }
            }

        } else {
            const action = id && feedback ? "update" : "insert";
            const data   = getInventoryReceivingData(action, "save", "0", id);
            data["backPayStatus"] = 0;
            data.append("backPayStatus", 0);

            saveInventoryReceiving(data, "save", null, pageContent);
        }
    });
    // ----- END SAVE CLOSE FORM -----


    // ----- SAVE DOCUMENT -----
    $(document).on("click", "#btnSave, #btnCancel", function () {
        const id       = $(this).attr("backPayID");
        const isFromCancelledDocument = $(this).attr("cancel") == "true";
        const revise   = $(this).attr("revise") == "true";
        const feedback = $(this).attr("code") || getFormCode("BPY", dateToday(), id);
        const action   = revise && "insert" || (id && feedback ? "update" : "insert");
        const data     = getInventoryReceivingData(action, "save", "0", id);
        data.append("backPayStatus", 0);
        
        if (revise) {
            if (!isFromCancelledDocument) {
                data.append("reviseBackPayID", id);
                data.delete("backPayID");
            } else {
                data.append("backPayID", id);
                data.delete("action");
                data.append("action", "update");
            }
        }

        saveInventoryReceiving(data, "save", null, pageContent);
        
    });
    // ----- END SAVE DOCUMENT -----


    // ----- REMOVE IS-VALID IN TABLE -----
    function removeIsValid(element = "table") {
        $(element).find(".validated,.is-valid, .no-error").removeClass("validated")
        .removeClass("is-valid").removeClass("no-error");
    }
    // ----- END REMOVE IS-VALID IN TABLE -----




    // ----- SUBMIT DOCUMENT -----
    $(document).on("click", "#btnSubmit", function () {
        const validate       = validateForm("page_content");
        removeIsValid("#tableInventoryReceivingItems");
        if(validate){
            const id             = $(this).attr("backPayID");
            const revise         = $(this).attr("revise") == "true";
            const action = revise && "insert" || (id ? "update" : "insert");
            const data   = getInventoryReceivingData(action, "submit", "1", id);

            if (revise) {
                data.append("reviseBackPayID", id);
                data.delete("backPayID");
            }

            let approversID = "", approversDate = "";
            for (var i of data) {
                if (i[0] == "approversID")   approversID   = i[1];
                if (i[0] == "approversDate") approversDate = i[1];
            }     approversDate = data["approversDate"];

            const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
            let notificationData = false;
            if (employeeID != sessionID) {
                notificationData = {
                    moduleID:                MODULE_ID,
                    notificationTitle:       "Back Pay",
                    notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
                    notificationType:        2,
                    employeeID,
                };
            }

            saveInventoryReceiving(data, "submit", notificationData, pageContent);
        }
    });
    // ----- END SUBMIT DOCUMENT -----


    // ----- CANCEL DOCUMENT -----
    $(document).on("click", "#btnCancelForm", function () {
        const id     = $(this).attr("backPayID");
        const status = $(this).attr("status");
        const action = "update";
        const data   = getInventoryReceivingData(action, "cancelform", "4", id, status);

        saveInventoryReceiving(data, "cancelform", null, pageContent);
    });
    // ----- END CANCEL DOCUMENT -----


    // ----- APPROVE DOCUMENT -----
    $(document).on("click", "#btnApprove", function () {
        const id       = decryptString($(this).attr("backPayID"));
        const feedback = $(this).attr("code") || getFormCode("BPY", dateToday(), id);
        let tableData  = getTableData("hris_back_pay_tbl", "", "backPayID = " + id);

        if (tableData) {
            let approversID     = tableData[0].approversID;
            let approversStatus = tableData[0].approversStatus;
            let approversDate   = tableData[0].approversDate;
            let employeeID      = tableData[0].employeeID;
            let createdAt       = tableData[0].createdAt;

            let data = getInventoryReceivingData("update", "approve", "2", id);
            data["approversStatus"] = updateApproveStatus(approversStatus, 2);
            data.append("approversStatus", updateApproveStatus(approversStatus, 2));
            let dateApproved = updateApproveDate(approversDate)
            data["approversDate"] = dateApproved;
            data.append("approversDate", dateApproved);
            let status, notificationData,lastApproveCondition = false;
            if (isImLastApprover(approversID, approversDate)) {
                status = 2;
                notificationData = {
                    moduleID:                MODULE_ID,
                    tableID:                 id,
                    notificationTitle:       "Back Pay",
                    notificationDescription: `${feedback}: Your request has been approved.`,
                    notificationType:        7,
                    employeeID,
                };

                lastApproveCondition = true;
            } else {
                status = 1;
                notificationData = {
                    moduleID:                MODULE_ID,
                    tableID:                 id,
                    notificationTitle:       "Back Pay",
                    notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
                    notificationType:         2,
                    employeeID:               getNotificationEmployeeID(approversID, dateApproved),
                };
            }

            data["backPayStatus"] = status;
            data.append("backPayStatus", status);
            saveInventoryReceiving(data, "approve", notificationData, pageContent,lastApproveCondition);
        }
    });
    // ----- END APPROVE DOCUMENT -----


    // ----- REJECT DOCUMENT -----
    $(document).on("click", "#btnReject", function () {

        const id       = $(this).attr("backPayID");
        const feedback = $(this).attr("code") || getFormCode("BPY", dateToday(), id);

        $("#modal_inventory_receiving_content").html(preloader);
        $("#modal_inventory_receiving .page-title").text("DENY BACK PAY");
        $("#modal_inventory_receiving").modal("show");
        let html = `
        <div class="modal-body">
            <div class="form-group">
                <label>Remarks <code>*</code></label>
                <textarea class="form-control validate"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
                    minlength="2"
                    maxlength="250"
                    id="backPayRemarks"
                    name="backPayRemarks"
                    rows="4"
                    style="resize: none"
                    required></textarea>
                <div class="d-block invalid-feedback" id="invalid-backPayRemarks"></div>
            </div>
        </div>
        <div class="modal-footer text-right">
            <button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
            backPayID="${id}"
            code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
            <button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
        $("#modal_inventory_receiving_content").html(html);
    });

    $(document).on("click", "#btnRejectConfirmation", function () {
        const id       = decryptString($(this).attr("backPayID"));
        const feedback = $(this).attr("code") || getFormCode("BPY", dateToday(), id);

        const validate = validateForm("modal_inventory_receiving");
        if (validate) {
            let tableData = getTableData("hris_back_pay_tbl", "", "backPayID = " + id);
            if (tableData) {
                let approversStatus = tableData[0].approversStatus;
                let approversDate   = tableData[0].approversDate;
                let employeeID      = tableData[0].employeeID;

                let data = new FormData;
                data.append("action", "update");
                data.append("method", "deny");
                data.append("backPayID", id);
                data.append("approversStatus", updateApproveStatus(approversStatus, 3));
                data.append("approversDate", updateApproveDate(approversDate));
                data.append("backPayRemarks", $("[name=backPayRemarks]").val()?.trim());
                data.append("updatedBy", sessionID);

                let notificationData = {
                    moduleID:                MODULE_ID,
                    tableID: 				 id,
                    notificationTitle:       "Back Pay",
                    notificationDescription: `${feedback}: Your request has been denied.`,
                    notificationType:        1,
                    employeeID,
                };

                saveInventoryReceiving(data, "deny", notificationData, pageContent);
                $("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
            } 
        } 
    });
    // ----- END REJECT DOCUMENT -----

    // ----- DROP DOCUMENT -----
    $(document).on("click", "#btnDrop", function() {
        const backPayID = decryptString($(this).attr("backPayID"));
        const feedback          = $(this).attr("code") || getFormCode("BPY", dateToday(), id);

        const id = decryptString($(this).attr("backPayID"));
        let data = new FormData;
        data.append("backPayID", backPayID);
        data.append("action", "update");
        data.append("method", "drop");
        data.append("updatedBy", sessionID);

        saveInventoryReceiving(data, "drop", null, pageContent);
    })

    $(document).on("click", "#btnRelease", function() {
        const backPayID = decryptString($(this).attr("backPayID"));
        const backPayEmployeeID = decryptString($(this).attr("backPayEmployeeID"));
        const feedback          = $(this).attr("code") || getFormCode("BPY", dateToday(), id);

        const id = decryptString($(this).attr("backPayID"));
        let data = new FormData;
        
        data.append("backPayID", backPayID);
        data.append("action", "update");
        data.append("method", "release");
        data.append("updatedBy", sessionID);
        data.append("backPayEmployeeID", backPayEmployeeID);
        saveInventoryReceiving(data, "release", null, pageContent);
    })
    // ----- END DROP DOCUMENT -----


    // ----- NAV LINK -----
    $(document).on("click", ".nav-link", function () {
        const tab = $(this).attr("href");
        if (tab == "#forViewingTab") {
            forViewingContent();
        }
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
    const title = "BACKPAY PROCESS";
    const releaseTitle = "EMPLOYEE BACKPAY";
    let swalText, swalImg;

    $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("hide");

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
            swalText  = "Are you sure to approve this processing of backpay?";
            swalImg   = `${base_url}assets/modal/approve.svg`;
            break;
        case "deny":
            swalTitle = `DENY ${title.toUpperCase()}`;
            swalText  = "Are you sure to deny this processing of backpay?";
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
            swalText  = "Are you sure that you want to release this employee's backpay?";
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

    function saveInventoryReceiving(data = null, method = "submit", notificationData = null, callback = null,lastApproveCondition =false) {

    // data.lastApproveCondition = lastApproveCondition; // inserting object in data object parameter
        // console.log(data);
        // return false;
    if (data) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {
                $.ajax({
                    method:      "POST",
                    url:         `Backpay/saveBackpay`,
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
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} submitted successfully!`;
                        } else if (method == "save") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} saved successfully!`;
                        } else if (method == "cancelform") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} cancelled successfully!`;
                        } else if (method == "approve") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} approved successfully!`;
                        } else if (method == "deny") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} denied successfully!`;
                        } else if (method == "drop") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} dropped successfully!`;
                        }	else if (method == "release") {
                            swalTitle = `${getFormCode("BPY", dateCreated, insertedID)} release successfully!`;
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
                if (res.dismiss === "cancel" && method != "submit") {
                    if (method != "deny") {
                        if (method != "cancelform") {
                            callback && callback();
                        }
                    } else {
                        $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
                    }
                } else if (res.isDismissed) {
                    if (method == "deny") {
                        $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
                    }
                }
            }
        });

        
    }
    return false;
}

    // --------------- END DATABASE RELATION ---------------