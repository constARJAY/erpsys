$(document).ready(function() {

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

    const allowedUpdate = isUpdateAllowed(112);
    if(!allowedUpdate){
        $("#page_content").find("input, select, textarea").each(function(){
            $(this).attr("disabled",true);
        });
        $("#btnSubmit").hide();
    }

    //------ END MODULE FUNCTION IS ALLOWED UPDATE-----

// ----- MODULE APPROVER -----
const moduleApprover = getModuleApprover("13th Month");
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
        const revisedDocumentsID = getTableData("hris_13month_tbl", "revisemonthID", "revisemonthID IS NOT NULL");
        return revisedDocumentsID.map(item => item.revisemonthID).includes(id);
    }
    return false;
}
// ----- END IS DOCUMENT REVISED -----


// ----- VIEW DOCUMENT -----
function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
    const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
        const tableData = getTableData("hris_13month_tbl", "", "monthID=" + id);

        if (tableData.length > 0) {
            let {
                employeeID,
                monthStatus
            } = tableData[0];

            let isReadOnly = true, isAllowed = true;

            if (employeeID != sessionID) {
                isReadOnly = true;
                if (monthStatus == 0 || monthStatus == 4) {
                    isAllowed = false;
                }
            } else if (employeeID == sessionID) {
                if (monthStatus == 0) {
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
        window.history.pushState("", "", `${base_url}hris/month_process?view_id=${view_id}`);
    } else if (isAdd) {
        if (view_id && isRevise) {
            window.history.pushState("", "", `${base_url}hris/month_process?add=${view_id}`);
        } else {
            window.history.pushState("", "", `${base_url}hris/month_process?add`);
        }
    } else {
        window.history.pushState("", "", `${base_url}hris/month_process`);
    }
}
// ----- END VIEW DOCUMENT -----

// const bankList = getTableData(
//     "fms_bank_tbl", 
//     "bankName,bankID",
//     "bankStatus = 1");


// GLOBAL VARIABLE - REUSABLE 
const dateToday = () => {
    return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
};

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
                { targets: 1,  width: 250 },
                { targets: 2,  width: 120 },
                { targets: 3,  width: 150 },
                { targets: 4,  width: 300 },
                { targets: 5,  width: 80  },
                { targets: 6,  width: 80  },
                { targets: 7,  width: 220 },
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
                { targets: 1,  width: 250 },
                { targets: 2,  width: 120 },
                { targets: 3,  width: 150 },
                { targets: 4,  width: 300 },
                { targets: 5,  width: 80  },
                { targets: 6,  width: 80  },
                { targets: 7,  width: 220 },
            ],
        });

    var table = $("#tableInventoryReceivingItems")
        .css({ "min-width": "100%" })
        .removeAttr("width")
        .DataTable({
            proccessing: false,
            serverSide: false,
            scrollX: false,
            sorting: false,
            searching: false,
            paging: false,
            ordering: false,
            info: false,
            scrollCollapse: true,
            columnDefs: [
               
                { targets: 0,  width: 50 },
                { targets: 1,  width: 200 },
                { targets: 2,  width: 150 },
                { targets: 3,  width: 150 },
                { targets: 4,  width: 150 },
                { targets: 5,  width: 10 },

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
            scrollX: false,
            scrollCollapse: true,
            sorting: false,
            columnDefs: [
               
                { targets: 0,  width: 50 },
                { targets: 1,  width: 200 },
                { targets: 2,  width: 150 },
                { targets: 3,  width: 150 },
                { targets: 4,  width: 150 },
                { targets: 5,  width: 10 },
                
              
    
            ],
        });

}
// ----- END DATATABLES -----


// ----- HEADER CONTENT -----
function headerTabContent(display = true) {
    if (display) {
        if (isImModuleApprover("hris_13month_tbl", "approversID")) {
            let count = getCountForApproval("hris_13month_tbl", "monthStatus");
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
        if(isCreateAllowed(112)){
            html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;

            // html ='';
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

    let monthApprovalData = getTableData(
        `hris_13month_tbl AS isrt 
        LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
        `isrt.*, CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname`,
        `isrt.employeeID != ${sessionID} AND monthStatus != 0 AND monthStatus != 4`,
        `FIELD(monthStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
    );

    let html = `
    <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
        <thead>
            <tr style="white-space: nowrap">
                <th>Document No.</th>
                <th>13th Month Pay Range</th>
                <th>Prepared By</th>
               
                <th>Current Approver</th>
                <th>Date</th>
                <th>Status</th>
                <th>Release Status</th>
                <th>Remarks</th>
            </tr>
        </thead>
        <tbody>`;

        monthApprovalData.map((item) => {
        let {
            fullname,
            employeeID,
            monthID ,
            monthCode,
            monthDescription,
            monthStatus,
            monthReleaseStatus,
            monthDateStart,
            monthDateEnd,
            approversID,
            approversDate,
            approversStatus,
            monthRemarks,
            submittedAt,
            createdAt
        } = item;

        let remarks       = monthRemarks ? monthRemarks : "-";
        let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
        let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
        let dateRange  = monthDateStart ? moment(monthDateStart).format("MMMM DD, YYYY")+" - "+moment(monthDateEnd).format("MMMM DD, YYYY") : "-";
        let dateApproved  = approversStatus == 2 || approversStatus == 5 ? approversDate.split("|") : "-";
        if (dateApproved !== "-") {
            dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
        }

        let button = monthStatus != 0 ? `
        <button class="btn btn-view w-100 btnView" id="${encryptString(monthID)}"><i class="fas fa-eye"></i> View</button>` : `
        <button 
            class="btn btn-edit w-100 btnEdit" 
            id="${encryptString(monthID)}" 
            code="${monthCode}"><i class="fas fa-edit"></i> Edit</button>`;

        let btnClass =  monthStatus != 0 ? `btnView` : `btnEdit`;

        if (isImCurrentApprover(approversID, approversDate, monthStatus) || isAlreadyApproved(approversID, approversDate)) {
            html += `
            <tr class="${btnClass}" id="${encryptString(monthID)}">
            <td>${monthCode || "-"}</td>
            <td>${dateRange}</td>
            <td>${fullname}</td>
            <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, monthStatus, true))}
                </td>
            <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
            <td class="text-center">
                ${getStatusStyle(monthStatus)}
            </td>
            <td class="text-center">
            ${ monthReleaseStatus == 0 && monthStatus == 2 ? `<span class="badge badge-warning w-100">For Releasing</span>` : getStatusStyle(monthReleaseStatus,false,true)} 
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
    let monthData = getTableData(
        `hris_13month_tbl AS isrt 
        LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
        `isrt.*, CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname`,
        `isrt.employeeID = ${sessionID}`,
        `FIELD(monthStatus, 0, 1, 3, 2, 4, 5), COALESCE(isrt.submittedAt, isrt.createdAt)`
    );

    
    let html = `
    <table class="table table-bordered table-striped table-hover" id="tableMyForms">
        <thead>
            <tr style="white-space: nowrap">
                <th>Document No.</th>
                <th>13th Month Pay Range</th>
                <th>Prepared By</th>
                <th>Current Approver</th>
                <th>Date</th>
                <th>Status</th>
                <th>Release Status</th>
                <th>Remarks</th>
            </tr>
        </thead>
        <tbody>`;

        monthData.map((item) => {
        let {
            fullname,
            employeeID,
            monthID ,
            monthCode,
            monthDescription,
            monthStatus,
            monthReleaseStatus,
            monthDateStart,
            monthDateEnd,
            approversID,
            approversDate,
            approversStatus,
            monthRemarks,
            submittedAt,
            createdAt
        } = item;
        let remarks       = monthRemarks ? monthRemarks : "-";
        let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
        let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
        let dateRange  = monthDateStart ? moment(monthDateStart).format("MMMM DD, YYYY")+" - "+moment(monthDateEnd).format("MMMM DD, YYYY") : "-";
        let dateApproved  = approversStatus == 2 || approversStatus == 5 ? approversDate.split("|") : "-";
        if (dateApproved !== "-") {
            dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
        }

        let button = monthStatus != 0 ? `
        <button class="btn btn-view w-100 btnView" id="${encryptString(monthID)}"><i class="fas fa-eye"></i> View</button>` : `
        <button 
            class="btn btn-edit w-100 btnEdit" 
            id="${encryptString(monthID)}" 
            code="${monthCode}"><i class="fas fa-edit"></i> Edit</button>`;
     
            let btnClass =  monthStatus != 0 ? `btnView` : `btnEdit`;

        html += `
        <tr class="${btnClass}" id="${encryptString(monthID)}">
            <td>${monthCode || "-"}</td>
            <td>${dateRange}</td>
            <td>${fullname}</td>
            <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, monthStatus, true))}
                </td>
            <td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
            <td class="text-center">
                ${getStatusStyle(monthStatus)}
            </td>
            <td class="text-center">
            ${ monthReleaseStatus == 0 && monthStatus == 2 ? `<span class="badge badge-warning w-100">For Releasing</span>` : getStatusStyle(monthReleaseStatus,false,true)} 
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
            monthID     = "",
            monthCode ="",
            monthStatus = "",
            monthReleaseStatus = "",
            employeeID               = "",
            approversID              = "",
            approversDate            = "",
            createdAt                = new Date
        } = data && data[0];


        console.log(data)

        let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
        if (employeeID === sessionID) {
            if (monthStatus == 0 || isRevise) {
                // DRAFT
                button = `
                <button 
                    class="btn btn-submit px-5 p-2" 
                    id="btnSubmit" 
                    monthID="${monthID}"
                    code="${monthCode}"
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
                        monthID="${monthID}"
                        code="${monthCode}"
                        revise=${isRevise}><i class="fas fa-ban"></i> 
                        Cancel
                    </button>`;
                }

                
            } else if (monthStatus == 1) {
                // FOR APPROVAL
                if (!isOngoing) {
                    button = `
                    <button 
                        class="btn btn-cancel px-5 p-2"
                        id="btnCancelForm" 
                        monthID="${monthID}"
                        code="${monthCode}"
                        status="${monthStatus}"><i class="fas fa-ban"></i> 
                        Cancel
                    </button>`;
                }
            } else if (monthStatus == 2) {
                // FOR RELEASE // DEFAULT IS DROP

                if(monthReleaseStatus == 0 ){
                    button = `
                        <button type="button" 
                            class="btn btn-success px-5 p-2"
                            id="btnRelease" 
                            monthID="${encryptString(monthID)}"
                            code="${monthCode}"
                            status="${monthStatus}"><i class="fas fa-hand-holding-usd"></i>
                            Release
                        </button>`;
                }
                
            } else if (monthStatus == 3) {
                // DENIED - FOR REVISE
                if (!isDocumentRevised(monthID)) {
                    button = `
                    <button
                        class="btn btn-cancel px-5 p-2"
                        id="btnRevise" 
                        monthID="${encryptString(monthID)}"
                        code="${monthCode}"
                        status="${monthStatus}"><i class="fas fa-clone"></i>
                        Revise
                    </button>`;
                }
            } else if (monthStatus == 4) {
                // CANCELLED - FOR REVISE
                if (!isDocumentRevised(monthID)) {
                    button = `
                    <button
                        class="btn btn-cancel px-5 p-2"
                        id="btnRevise" 
                        monthID="${encryptString(monthID)}"
                        code="${monthCode}"
                        status="${monthStatus}"
                        cancel="true"><i class="fas fa-clone"></i>
                        Revise
                    </button>`;
                }
            }
        } else {
            if (monthStatus == 1) {
                if (isImCurrentApprover(approversID, approversDate)) {
                    button = `
                    <button 
                        class="btn btn-submit px-5 p-2" 
                        id="btnApprove" 
                        monthID="${encryptString(monthID)}"
                        code="${monthCode}"><i class="fas fa-paper-plane"></i>
                        Approve
                    </button>
                    <button 
                        class="btn btn-cancel px-5 p-2"
                        id="btnReject" 
                        monthID="${encryptString(monthID)}"
                        code="${monthCode}"><i class="fas fa-ban"></i> 
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


// ----- UPDATE TABLE ROWS -----
function updateTableRows(){
    $(".itemTableRow").each(function(i){
        // CHECKBOX
        $("td .action .checkboxrow ", this).attr("id", `checkboxholdrow${i}`);

        // INPUTS ID's
        let monthID = 0;
        monthID =  $(this).attr("monthID");
        
        $("td [name=monthemployeeID]", this).attr("id", `monthemployeeID${monthID}${i}`);
        $("td [name=monthemployeeID]", this).attr("index", i);

        $("td [name=monthbasicSalary]", this).attr("id", `monthbasicSalary${monthID}${i}`);
        $("td [name=monthbasicSalary]", this).attr("index", i);

        $("td [name=monthTotalPayAmount]", this).attr("id", `monthTotalPayAmount${monthID}${i}`);
        $("td [name=monthTotalPayAmount]", this).attr("index", i);

        $("td [name=monthHoldStatus]", this).attr("id", `monthHoldStatus${monthID}${i}`);
        $("td [name=monthHoldStatus]", this).attr("index", i);
    });

    getTotalSummary();
}   
// ----- END UPDATE TABLE ROWS -----

// ----- GET GROSS PAY DATA -----
function getSerialNumber(scope = {}, readOnly = false, monthID = 0) {
	let {
		payrollID = "",
        payrollCode = "",
        payrollItemID = "",
        employeeID = "",
        basicSalary = "",
        lateUndertimeDeduction = "",
        lwopDeduction = "",
        grossPay="",
        submittedAt = "",
	} = scope;

    // console.log(scope);

    let netPay = 0;

    if(monthID){
        netPay = grossPay;

    }else{
        netPay = parseFloat(basicSalary) - (parseFloat(lateUndertimeDeduction) +  parseFloat(lwopDeduction));

    }


	let html = "";


		html = `
        <div class=" dropdown-item disabled" payrollID="${payrollID}" payrollCode="${payrollCode}" payrollItemID=${payrollItemID} submittedAt="${submittedAt}" grossPay="${netPay}"> 
            <small class=" p-1 mb-0">${payrollCode} : ${formatAmount(netPay,true)}</small>
            <footer class="blockquote-footer">13th Month Pay Period: ${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY") : " - "}</cite></footer>
            <hr class="w-100">
        </div>`;
	

	
	return html;
}
// ----- END GET GROSS PAY DATA -----


// ----- GET SERVICE ROW -----
function getItemsRow(monthID = "", readOnly = false,numOfMonths = 0, startDate = 0 , endDate = 0) {
    let html = "";
    let requestData ='';

    if (monthID) {
        requestData = getTableData(
            `hris_13month_tbl AS month
            LEFT JOIN hris_13month_details_tbl AS monthDetails
            ON month.monthID = monthDetails.monthID
            LEFT JOIN hris_employee_list_tbl AS employee
            ON employee.employeeID = monthDetails.monthEmployeeID`,
            `DISTINCT(monthDetails.monthEmployeeID) AS employeeID,
            employee.employeeCode,
            CONCAT(employee.employeeFirstname, ' ', employee.employeeLastname) AS fullname,
            (SELECT designationName FROM hris_designation_tbl WHERE  designationID = employee.designationID) as designationName,
            (SELECT departmentName FROM hris_department_tbl WHERE  departmentID  = employee.departmentID ) as departmentName,
            month.monthID,
            monthDetails.monthDetailsID,
            monthDetails.basicSalary,
            monthDetails.monthTotalPayAmount,
            monthDetails.monthHoldStatus`,
            `month.monthID = ${monthID}`);
    }else{
        requestData = getTableData(
            `hris_payroll_tbl AS payroll
            LEFT JOIN hris_payroll_items_tbl AS payrolldetails
            ON payroll.payrollID = payrolldetails.payrollID
            LEFT JOIN hris_employee_list_tbl AS employee
            ON employee.employeeID = payrolldetails.employeeID`,
            `DISTINCT(payrolldetails.employeeID),
            employee.employeeCode,
            CONCAT(employee.employeeFirstname, ' ', employee.employeeLastname) AS fullname,
            (SELECT designationName FROM hris_designation_tbl WHERE  designationID = employee.designationID) as designationName,
            (SELECT departmentName FROM hris_department_tbl WHERE  departmentID  = employee.departmentID ) as departmentName,
            payrolldetails.basicSalary,
            0 as monthTotalPayAmount`,
            `payrollStatus =2  AND ((payroll.payrollStartDate >= '${startDate}' AND payroll.payrollStartDate <= '${endDate}') OR (payroll.payrollEndDate >= '${startDate}' AND  payroll.payrollEndDate <= '${endDate}'))`);
    }


            
    if(requestData.length > 0){

        requestData.map((item, index) => {
       
            let {
                monthID="",
                monthDetailsID="",
                employeeID ="",
                employeeCode= "",
                fullname="",
                designationName ="",
                departmentName="",
                basicSalary="",
                monthTotalPayAmount =0,
                monthHoldStatus=1,
            } = item;


            var scopeData ="";

        if(monthID ==""){
            payrollData = getTableData(`hris_payroll_tbl AS payroll
            LEFT JOIN hris_payroll_items_tbl AS payrolldetails
            ON payroll.payrollID = payrolldetails.payrollID`,
            `payroll.payrollID,
            payroll.payrollCode,
            payrolldetails.payrollItemID,
            payrolldetails.employeeID,
            payrolldetails.basicSalary,
            payrolldetails.lateUndertimeDeduction,
            payrolldetails.lwopDeduction,
            payroll.submittedAt`,
            `payrollStatus =2 AND payrolldetails.employeeID = ${employeeID} AND ((payroll.payrollStartDate >= '${startDate}' AND payroll.payrollStartDate <= '${endDate}') OR (payroll.payrollEndDate >= '${startDate}' AND  payroll.payrollEndDate <= '${endDate}'))`
        );
        }else{
             scopeData = getTableData(
                `hris_13month_gross_pay_list_tbl`,
                `payrollID,
                payrollCode,
                payrollItemID,
                monthEmployeeID AS employeeID,
                grossPayAmount AS grossPay ,
                payrollSubmittedAt AS submittedAt `,
                `monthID  = ${monthID} AND  monthEmployeeID = ${employeeID}`
            );

        }

		let grossPayListData ='';
        let totalGrossPayAmount = 0;

			if(monthID){
			
                if (scopeData.length > 0 && monthID != "") {
                
                    grossPayListData += scopeData.map(scope => {
                        totalGrossPayAmount += parseFloat(scope.grossPay) || 0;
                        return getSerialNumber(scope, readOnly,monthID);
                    }).join("");
                }
                //  else {
                    
                //     grossPayListData += payrollData.map(payroll => {
                //         totalGrossPayAmount += payroll.grossPay || 0;
                //         return getSerialNumber(payroll, readOnly,monthID,totalGrossPayAmount);
                //     }).join("");
                // }
					
			}else{
                grossPayListData += payrollData.map(payroll => {
                    let netPay = 0;
                    netPay = parseFloat(payroll.basicSalary) - (parseFloat(payroll.lateUndertimeDeduction) +  parseFloat(payroll.lwopDeduction));
                    totalGrossPayAmount += parseFloat(netPay) || 0;
                    return getSerialNumber(payroll, readOnly,monthID);
                }).join("");
			}

            grossPayListData += `<div class=" dropdown-item font-weight-bolder text-center disabled"> 
                                    <div class="p-1">TOTAL :  ${formatAmount(totalGrossPayAmount,true)}</div>
                                    <hr class="w-100">
                                </div>`;

            if( monthTotalPayAmount =="" || monthTotalPayAmount ==0){
                monthTotalPayAmount = totalGrossPayAmount ? (parseFloat(totalGrossPayAmount) / ( parseFloat(numOfMonths))) || 0 : 0;
                // monthTotalPayAmount = 100;
            }
            

         
            if (readOnly) {

                let statusRowBadge ="";

                if(monthHoldStatus == 0){
                    statusRowBadge =`<span class="badge badge-secondary w-100">OnHold</span>`;
                }

                else if(monthHoldStatus == 9){
                    statusRowBadge =`<span class="badge badge-success w-100">Released</span>`;
                }
                else{
                    statusRowBadge =`<span class="badge badge-warning w-100">Pending</span>`;
                }

              
                html +=` <tr class="text-center itemTableRow" monthID="${monthID}">
               
                <td> <div name="monthemployeeID">${employeeCode || "-"}</div> </td>
                <td class="text-left">
                    <div>${fullname || "-"}</div>
                    <span><small>${departmentName} | ${designationName}</small></span>
                </td>
                <td class="text-right" name="monthbasicSalary" totalGrossPay ="${totalGrossPayAmount || 0}">${formatAmount(basicSalary,true)}</td>
                <td>
                    <div class="btn-group w-100">
                        <button type="button" class="btn btn-none dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        ${formatAmount(totalGrossPayAmount,true)} 
                        </button>
                        <div class="dropdown-menu dropdown-menu-right grossPayData">
                        ${grossPayListData} 
                        </div>
                    </div>
                </td>
                <td class="text-right" name="monthTotalPayAmount">${formatAmount(monthTotalPayAmount || 0,true)}</td> 
                <td>
                    <div>
                    ${statusRowBadge}
                    </div>
                </td> 
            </tr>`;

                
                
            } else {
   
        html +=` <tr class="text-center itemTableRow" monthID="${monthID}" employeeID="${employeeID}">
                   
                    <td> <div name="monthemployeeID">${employeeCode || "-"}</div> </td>

                    <td class="text-left">
                        <div>${fullname || "-"}</div>
                        <span><small>${departmentName} | ${designationName}</small></span>
                    </td>
                    <td class="text-right" name="monthbasicSalary">${formatAmount(basicSalary,true)}</td>
                    <td>
                        <div class="btn-group w-100">
                            <button type="button" class="btn btn-none dropdown-toggle gross-pay" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${formatAmount(totalGrossPayAmount,true)}
                            </button>
                            <div class="dropdown-menu dropdown-menu-right grossPayData">
                            ${grossPayListData} 
                            </div>
                        </div>
                    </td>
                    <td class="text-right" name="monthTotalPayAmount">${formatAmount(monthTotalPayAmount,true)}</td> 
                    <td class="text-center">
                        <div class="action">
                            <input type="checkbox" class="checkboxrow monthHoldStatus" name="monthHoldStatus" ${ monthHoldStatus == 0 ? "checked" : ""}>
                        </div>
                    </td> 
                </tr>`;

                }
            })
       
    }else{
        html += `
		<tr class="text-center">
			<td colspan="6">No data available in table</td>
		</tr>`
    }
 

    return html;
    
}
// ----- END GET SERVICE ROW -----

// ---- GET ALL EMPLOYEE HAS PAYROLL IN RANGE OF DECLARED ----//
$(document).on("click","#generatePeriod",function(){

    Swal.fire({
        title: 'GENERATE 13TH MONTH REPORT',
    text: "Are you sure that you want to generate the 13th month report?",
        imageUrl: `${base_url}assets/modal/add.svg`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#1A1A1A',
        confirmButtonText: 'Generate',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
           
            $(".purchaseOrderItemsBody").html(preloader);
            let dateFrom = $("#setDateFrom").val();
            let dateTo = $("#setDateTo").val();
      

            let getDateFrom = moment(dateFrom).format("YYYY-MM-DD");
            let getDateFromYear = moment(dateFrom).format("YYYY");
            let getDateFromMonth = moment(dateFrom).format("MM");
            let getDateFromDay = moment(dateFrom).format("DD");

            let getDateTo = moment(dateTo).endOf("month").format("YYYY-MM-DD");
            let getDateToYear = moment(dateTo).format("YYYY");
            let getDateToMonth = moment(dateTo).format("MM");
            let getDateToDay = moment(dateTo).endOf("month").format("DD");

            let start = moment([getDateFromYear, getDateFromMonth, getDateFromDay]);
            let end = moment([getDateToYear, getDateToMonth, getDateToDay]);
            let numOfMonths =  Math.abs(start.diff(end-1, 'months'));

            let generateData =  getItemsRow("", false,numOfMonths,getDateFrom,getDateTo);

            $(".displayDateRange").text(moment(dateFrom).format("MMMM YYYY") +" - "+moment(dateTo).endOf("month").format("MMMM YYYY"));
            
            setTimeout(() => {
                $(".purchaseOrderItemsBody").html(generateData); 
                updateTableRows();
                
            }, 300);

        Swal.fire({
            icon: 'success',
            title:  `13th Month report generated successfully!`,
            showConfirmButton: false,
            timer: 800
          })
        }
    });

    

})
// ---- GET ALL EMPLOYEE HAS PAYROLL IN RANGE OF DECLARED ----//

    //  ----- DATE RANGE PERIOD ----//

    function LastDayOfMonth(Year, Month)
    {
        return moment(Month +"/"+ Year).endOf('month').format("MMMM/DD/YYYY");
        // return(new Date((new Date(Year, Month+1,1))-1)).getDate();
    }

    function FirstDayOfMonth(Year, Month)
    {
        return moment(Month +"/"+ Year).startOf('month').format("MMMM/DD/YYYY");
        // return(new Date((new Date(Year, Month+1,1))-1)).getDate();
    }



    // function monthProcessDateRange(disabledDays){
    //     $('#setDateFrom').daterangepicker({
    //         "showDropdowns": true,
    //         autoApply: true,

    //         isInvalidDate: function(date) {
    //             //getDate() returns the day (0-31)
    //             if (moment(date).format("MMMM/DD/YYYY") == LastDayOfMonth(moment(date).format("YYYY"),moment(date).format("MMMM")) || moment(date).format("MMMM/DD/YYYY") == FirstDayOfMonth(moment(date).format("YYYY"),moment(date).format("MMMM"))) {
    //                 return false;
    //             }
    //             return true;
    //         },

    //         locale: {
    //             format: 'MMMM DD, YYYY'
    //           },
    //     });
    // }
    
    
    //  ----- DATE RANGE PERIOD ----//

    // ----- CHECK ALL -----
    $(document).on("change", ".checkboxall", function() {

        const isChecked = $(this).prop("checked");
    

        $(".purchaseOrderItemsBody > tr").each(function(i, obj) {
            $(".checkboxrow ",this).prop("checked", isChecked);
        });

        getTotalSummary();
    });

    $(document).on("change","[name=monthHoldStatus]", function(){
        getTotalSummary();
    });

    function getTotalSummary(){
        let html = "";
        let hasTableRow = $(".itemTableRow").length > 0 ? true : false;
        if(hasTableRow){
            let totalOnHold = 0, totalRelease = 0, grandTotal = 0;
            
            $(".itemTableRow").each(function(){
                let grossPay = $(this).find(`[name="monthTotalPayAmount"]`).text().replace("₱ ","").replaceAll(",","");
                if($(this).find(".monthHoldStatus").prop("checked")){
                    totalOnHold += parseFloat(grossPay);
                }else{
                    totalRelease += parseFloat(grossPay);
                }
                grandTotal += parseFloat(grossPay);
            });
            

            $(".totalOnHold").text(formatAmount(totalOnHold, true));
            $(".totalRelease").text(formatAmount(totalRelease, true));
            $(".grandTotal").text(formatAmount(grandTotal, true));
                            

        }
    }

// ----- FORM CONTENT -----
function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
    $("#page_content").html(preloader);
    readOnly = isRevise ? false : readOnly;

    let {
        monthID             = "",
        revisemonthID       = "",
        monthCode           = "",
        employeeID          = "",
        monthRemarks	    = "",
        monthDescription    = "",
        monthDateStart      = "",
        monthDateEnd        = "",
        approversID         = "",
        approversStatus     = "",
        approversDate       = "",
        monthStatus         = false,
        submittedAt         = false,
        createdAt           = false,
    } = data && data[0];

    let purchaseOrderItems = "";
    if (monthID) {
        purchaseOrderItems = getItemsRow(monthID, readOnly);
    } 

    // ----- GET EMPLOYEE DATA -----
    let {
        fullname:    employeeFullname    = "",
        department:  employeeDepartment  = "",
        designation: employeeDesignation = "",
    } = employeeData(data ? employeeID : sessionID);

    // ----- END GET EMPLOYEE DATA -----

    readOnly ? preventRefresh(false) : preventRefresh(true);

    $("#btnBack").attr("monthID", monthID);
    $("#btnBack").attr("status", monthStatus);
    $("#btnBack").attr("employeeID", employeeID);
    $("#btnBack").attr("cancel", isFromCancelledDocument);

    let disabled = readOnly ? "disabled" : "";
    let addBtn = readOnly ? "" : `<small><button class="btn btn-secondary btn-sm btnAddRow" monthID="${monthID}"><i class="fas fa-plus"></i></button></small>`;

	let checkboxHoldStatus = !disabled ? `<th class="text-center"><div class="action">
					<input type="checkbox" class="checkboxall" project="true"> Hold
				</div></th>` : `<th>Status</th>`;

    // let disabledReference = purchaseOrderID && purchaseOrderID != "0" ? "disabled" : disabled;

    let tableInventoryReceivingItems = !disabled ? "tableInventoryReceivingItems" : "tableInventoryReceivingItems0";

    let button = formButtons(data, isRevise, isFromCancelledDocument);
    let reviseDocumentNo    = isRevise ? monthID  : revisemonthID ;
    let documentHeaderClass = isRevise || revisemonthID  ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
    let documentDateClass   = isRevise || revisemonthID  ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
    let documentReviseNo    = isRevise || revisemonthID  ? `
    <div class="col-lg-4 col-md-4 col-sm-12 px-1">
        <div class="card">
            <div class="body">
                <small class="text-small text-muted font-weight-bold">Revised Document No.</small>
                <h6 class="mt-0 text-danger font-weight-bold">
                    ${getFormCode("TMP", createdAt, reviseDocumentNo)}
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
                        ${monthID  && !isRevise ? monthCode : "---"}
                    </h6>      
                </div>
            </div>
        </div>
        <div class="${documentHeaderClass}">
            <div class="card">
                <div class="body">
                    <small class="text-small text-muted font-weight-bold">Status</small>
                    <h6 class="mt-0 font-weight-bold">
                        ${monthStatus && !isRevise ? getStatusStyle(monthStatus) : "---"}
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
                            ${getDateApproved(monthStatus, approversID, approversDate)}
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
                        ${monthRemarks	 && !isRevise ? monthRemarks	 : "---"}
                    </h6>      
                </div>
            </div>
        </div>
    </div>
    
    

    <div class="row" id="form_inventory_receiving">

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
                <textarea 
                rows="4" 
                style="resize: none" 
                class="form-control validate" 
                name="monthDescription" 
                id="monthDescription" 
                data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                minlength="2"
                maxlength="150"
                required
                ${disabled}>${ monthDescription || ""}</textarea>
                <div class="d-block invalid-feedback" id="invalid-monthDescription"></div>
            </div>
        </div>

   
        <div class="col-sm-12">
            <div class="w-100">
                <hr class="pb-1">

                <div class="row">
                    <div class="${!disabled ? `col-md-4 col-sm-12` : `col-md-6 col-sm-6`}">
                        <div class="form-group">
                            <label>Date from:  ${!disabled ? "<code>*</code>" : ""}</label>
                            <input type="month" 
                            name="setDateFrom" 
                            id="setDateFrom" 
                            class="form-control  validate" 
                            required
                            
                            ${disabled}>
                            <div class="d-block invalid-feedback" id="invalid-setDateFrom"></div>
                        </div>
                    </div>

                    <div class="${!disabled ? `col-md-4 col-sm-12` : `col-md-6 col-sm-6`}">

                        <div class="form-group">
                            <label>Date To:  ${!disabled ? "<code>*</code>" : ""}</label>
                            <input type="month" 
                            name="setDateTo" 
                            id="setDateTo" 
                            class="form-control  validate" 
                            required
                            
                            ${disabled}>
                            <div class="d-block invalid-feedback" id="invalid-setDateTo"></div>
                        </div>
                    </div>

                    ${!disabled ? `<div class="col-md-4 col-sm-12 text-left align-self-end">
                    <div class="form-group">
                        <button class="btn btn-primary w-100 py-2" 
                        id="generatePeriod"><i class="fas fa-cloud-upload-alt"></i> Generate Date Period</button>
                    </div>
                </div>` : ``}
                    
                </div>

                <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Details: </div>

                <div class"card">
                    <div class="card-header bg-primary text-white text-center">
                        <h6 class="font-weight-bold displayDateRange">${moment(monthDateStart).format("MMMM YYYY")+" - "+ moment(monthDateEnd).format("MMMM YYYY")}</h6>
                    </div>

                    <div class="card-body">
                        <table class="table table-striped" id="${tableInventoryReceivingItems}">
                            <thead>
                                <tr style="white-space: nowrap">
                                    
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Basic Salary</th>
                                    <th>Gross Pay</th>
                                    <th>Total 13th Month 
                                            <i class="fal fa-info-circle" style="cursor:pointer;color:#007bff;" data-toggle="tooltip" title="13th MONTH COMPUTATION:\n13th Month   =  Every CutOff( Basic Salary - Late - Absent(LWOP) ) ÷ No. of months for date period. "></i>
                                    </th>
                                    ${checkboxHoldStatus}
                                </tr>
                            </thead>
                            <tbody class="purchaseOrderItemsBody">
                                    ${purchaseOrderItems}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-12 row">
            <div class="offset-md-7 col-md-5 col-sm-12">
                <div class="row" style="font-size: 1.1rem;" id="totalSummary">

                    <div class="col-6 text-left font-weight-bold">Total On Hold 13th month</div>
                    <div class="col-6 text-right font-weight-bold totalOnHold">₱ 0.00</div>

                    <div class="col-6 text-left font-weight-bold">Total On Release 13month</div>
                    <div class="col-6 text-right font-weight-bold totalRelease">₱ 0.00</div>

                    <div class="col-6 text-left font-weight-bold">
                        <div style="font-size: 1.4rem;">Grand Total</div>
                    </div>
                    <div class="col-6 text-right font-weight-bold grandTotal">
                        <div style="font-size: 1.4rem;" class="grandTotal">₱ 0.00</div>
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
        getTotalSummary();
        
        // monthProcessDateRange();
        $('[data-toggle="tooltip"]').tooltip();
        monthDateStart ? $('#setDateFrom').val( moment(monthDateStart).format("YYYY-MM")) : '';
        monthDateEnd ? $('#setDateTo').val( moment(monthDateEnd).format("YYYY-MM")) : '';
        // monthDateStart && monthDateEnd ?  $('#setDateFrom').daterangepicker({ startDate: moment(monthDateStart).format("MM/DD/YYYY"), endDate: moment(monthDateEnd).format("MM/DD/YY") }): ""; 
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

        headerButton(true, "Add 13th Month");
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
        data["monthID"] = id;
        formData.append("monthID", id);

        if (status != "2") {
            data["monthStatus"] = status;
            formData.append("monthStatus", status);
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
        
        data["monthDescription"]  = $("[name=monthDescription]").val()?.trim() || null;

        let dateFrom = $("#setDateFrom").val();
        let dateTo = $("#setDateTo").val();
       
    
        let getDateFrom = moment(dateFrom).format("YYYY-MM-DD");
        let getDateTo = moment(dateTo).endOf("month").format("YYYY-MM-DD");

        data["monthDateStart"]  = getDateFrom || null;
        data["monthDateEnd"]  = getDateTo || null;


        formData.append("employeeID", sessionID);
        formData.append("monthDescription", $("[name=monthDescription]").val()?.trim());
        formData.append("monthDateStart",getDateFrom);
        formData.append("monthDateEnd",getDateTo);

        if (action == "insert") {
            data["createdBy"] = sessionID;
            data["createdAt"] = dateToday();

            formData.append("createdBy", sessionID);
            formData.append("createdAt", dateToday());
        } else if (action == "update") {
            data["monthID"] = id;

            formData.append("monthID", id);
        }

        if (method == "submit") {
            data["submittedAt"] = dateToday();
            formData.append("submittedAt", dateToday());
            if (approversID) {
                data["approversID"] = approversID;
                data["monthStatus"] = 1;

                formData.append("approversID", approversID);
                formData.append("monthStatus", 1);
            } else {  // AUTO APPROVED - IF NO APPROVERS
                data["approversID"]     = sessionID;
                data["approversStatus"] = 2;
                data["approversDate"]   = dateToday();
                data["monthStatus"] = 2;

                formData.append("approversID", sessionID);
                formData.append("approversStatus", 2);
                formData.append("approversDate", dateToday());
                formData.append("monthStatus", 2);
            }
        }
        
        $(".itemTableRow").each(function(i, obj) {
            const monthID             = $(this).attr("monthID");
            const employeeID       = $(this).attr("employeeID");
            const monthbasicSalary     = $(`[name=monthbasicSalary]`,this).text()?.trim().replaceAll(",","").replaceAll("₱","");
            const totalGrossPay     = $(`[name=monthbasicSalary]`,this).attr("totalGrossPay");
            const monthTotalPayAmount     = $(`[name=monthTotalPayAmount]`,this).text()?.trim().replaceAll(",","").replaceAll("₱","");
            const monthHoldStatus = $(`[name=monthHoldStatus]`,this).is(":checked");
            let monthStatus = 1;
            if(monthHoldStatus){
                monthStatus = 0;
            }

            let temp = {
                monthID,
                monthEmployeeID : employeeID,
                monthbasicSalary,
                monthTotalPayAmount,
                monthHoldStatus : monthStatus,
                grossPayData:[],
            };

            formData.append(`items[${i}][monthID]`, monthID);
            formData.append(`items[${i}][monthEmployeeID]`, employeeID);
            formData.append(`items[${i}][monthbasicSalary]`, monthbasicSalary);
            formData.append(`items[${i}][totalGrossPay]`, totalGrossPay);
            formData.append(`items[${i}][monthTotalPayAmount]`, monthTotalPayAmount);
            formData.append(`items[${i}][monthHoldStatus]`, monthStatus);
           
            let total = $(`td .grossPayData > .dropdown-item`, this).length -1;

            $(`td .grossPayData > .dropdown-item`, this).each(function(index,obj) {

                if(index < total ){
                    const payrollID = $(this).attr("payrollID");
                    const payrollCode = $(this).attr("payrollCode");
                    const payrollItemID = $(this).attr("payrollItemID");
                    const grossPay = $(this).attr("grossPay");
                    const submittedAt = $(this).attr("submittedAt");
                    let gross = {
                        payrollID,
                        payrollCode,
                        payrollItemID,
                        monthID : monthID,
                        monthEmployeeID : employeeID,
                        grossPayAmount : grossPay,
                        payrollSubmittedAt : submittedAt
                    };
                    temp["grossPayData"].push(gross);

                    formData.append(`items[${i}][gross][${index}][payrollID]`, payrollID);
                    formData.append(`items[${i}][gross][${index}][payrollCode]`, payrollCode);
                    formData.append(`items[${i}][gross][${index}][payrollItemID]`, payrollItemID);
                    formData.append(`items[${i}][gross][${index}][monthID]`, monthID);
                    formData.append(`items[${i}][gross][${index}][monthEmployeeID]`, employeeID);
                    formData.append(`items[${i}][gross][${index}][grossPayAmount]`, grossPay);
                    formData.append(`items[${i}][gross][${index}][payrollSubmittedAt]`, submittedAt);
                }
			})

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
    $("#page_content").html(preloader);
    const id = $(this).attr("id");
    setTimeout(function() {
        viewDocument(id);
    }, 100)
});
// ----- END OPEN EDIT FORM -----


// ----- VIEW DOCUMENT -----
$(document).on("click", ".btnView", function () {
    $("#page_content").html(preloader);
    const id = $(this).attr("id");
    setTimeout(function() {
        viewDocument(id, true);
    }, 100)
});
// ----- END VIEW DOCUMENT -----


// ----- VIEW DOCUMENT -----
$(document).on("click", "#btnRevise", function () {
    const id = $(this).attr("monthID");
    viewDocument(id, false, true);
});
// ----- END VIEW DOCUMENT -----


// ----- SAVE CLOSE FORM -----
$(document).on("click", "#btnBack", function () {
    const id         = $(this).attr("monthID");
    const isFromCancelledDocument = $(this).attr("cancel") == "true";
    const revise     = $(this).attr("revise") == "true";
    const employeeID = $(this).attr("employeeID");
    const feedback   = $(this).attr("code") || getFormCode("TMP", dateToday(), id);
    const status     = $(this).attr("status");

    if (status != "false" && status != 0) {
        
        if (revise) {
            // const action = revise && "insert" || (id && feedback ? "update" : "insert");
            const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
            const data   = getInventoryReceivingData(action, "save", "0", id);
            data["monthStatus"]   = 0;
            data.append("monthStatus", 0);
            // data["revisemonthID"] = id;
            // delete data["monthID"];

            if (!isFromCancelledDocument) {
                data.append("revisemonthID", id);
                data.delete("monthID");
            } else {
                data.append("monthID", id);
                data.delete("action");
                data.append("action", "update");
            }

            saveInventoryReceiving(data, "save", null, pageContent);
        } else {
            $("#page_content").html(preloader);
            pageContent();

            if (employeeID != sessionID) {
                $("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
            }
        }

    } else {
        const action = id && feedback ? "update" : "insert";
        const data   = getInventoryReceivingData(action, "save", "0", id);
        data["monthStatus"] = 0;
        data.append("monthStatus", 0);

        saveInventoryReceiving(data, "save", null, pageContent);
    }
});
// ----- END SAVE CLOSE FORM -----


// ----- SAVE DOCUMENT -----
$(document).on("click", "#btnSave, #btnCancel", function () {
    // let receivedCondition = $("[name=received]").hasClass("is-invalid");
    // let serialNumberCondition = $("[name=serialNumber]").hasClass("is-invalid");
    // if(!receivedCondition && !serialNumberCondition){

        const id       = $(this).attr("monthID");
        const isFromCancelledDocument = $(this).attr("cancel") == "true";
        const revise   = $(this).attr("revise") == "true";
        const feedback = $(this).attr("code") || getFormCode("TMP", dateToday(), id);
        const action   = revise && "insert" || (id && feedback ? "update" : "insert");
        const data     = getInventoryReceivingData(action, "save", "0", id);
        // data["monthStatus"] = 0;
        data.append("monthStatus", 0);
        
        if (revise) {
            // data["revisemonthID"] = id;
            // delete data["monthID"];

            // if (!isFromCancelledDocument) {
            //     data["revisemonthID"] = id;
            //     delete data["monthID"];
            // } else {
            //     delete data["monthID"];
            //     delete data["action"];
            //     data["action"] = update;
            // }

            if (!isFromCancelledDocument) {
                data.append("revisemonthID", id);
                data.delete("monthID");
            } else {
                data.append("monthID", id);
                data.delete("action");
                data.append("action", "update");
            }
        }

        saveInventoryReceiving(data, "save", null, pageContent);
    // }
    // else{
    //     $("[name=received]").focus();
    //     $("[name=serialNumber]").focus();
    // }
    
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

            // var debitValidate = $("[name=debit]").hasClass("is-invalid");
            // var creditValidate = $("[name=credit]").hasClass("is-invalid");

            // if(!debitValidate && !creditValidate){

                const validate       = validateForm("page_content");
                removeIsValid("#tableInventoryReceivingItems");
               if(validate){
                   
                   
   
                   const id             = $(this).attr("monthID");
                   const revise         = $(this).attr("revise") == "true";
                   const action = revise && "insert" || (id ? "update" : "insert");
                   const data   = getInventoryReceivingData(action, "submit", "1", id);
       

                   if (revise) {
                    data.append("revisemonthID", id);
                    data.delete("monthID");
                    }

                    let approversID = "", approversDate = "";
                    for (var i of data) {
                        if (i[0] == "approversID")   approversID   = i[1];
                        if (i[0] == "approversDate") approversDate = i[1];
                    }

                //    if (revise) {
                //        data["revisemonthID"] = id;
                //        delete data["monthID"];
                //    }
                   
       
                //    let approversID   = data["approversID"], 
                //        approversDate = data["approversDate"];
       
                   const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
                   let notificationData = false;
                   if (employeeID != sessionID) {
                       notificationData = {
                           moduleID:                112,
                           notificationTitle:       "13th Month",
                           notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
                           notificationType:        2,
                           employeeID,
                       };
                   }
       
                   saveInventoryReceiving(data, "submit", notificationData, pageContent);
               }
                
            // }else{
            //     $(".is-invalid").focus(); 
            // }
});
// ----- END SUBMIT DOCUMENT -----


// ----- CANCEL DOCUMENT -----
$(document).on("click", "#btnCancelForm", function () {
    const id     = $(this).attr("monthID");
    const status = $(this).attr("status");
    const action = "update";
    const data   = getInventoryReceivingData(action, "cancelform", "4", id, status);

    saveInventoryReceiving(data, "cancelform", null, pageContent);
});
// ----- END CANCEL DOCUMENT -----


// ----- APPROVE DOCUMENT -----
$(document).on("click", "#btnApprove", function () {
    const id       = decryptString($(this).attr("monthID"));
    const feedback = $(this).attr("code") || getFormCode("TMP", dateToday(), id);
    let tableData  = getTableData("hris_13month_tbl", "", "monthID = " + id);

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
                moduleID:                112,
                tableID:                 id,
                notificationTitle:       "13th Month",
                notificationDescription: `${feedback}: Your request has been approved.`,
                notificationType:        7,
                employeeID,
            };

            lastApproveCondition = true;
        } else {
            status = 1;
            notificationData = {
                moduleID:                112,
                tableID:                 id,
                notificationTitle:       "13th Month",
                notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
                notificationType:         2,
                employeeID:               getNotificationEmployeeID(approversID, dateApproved),
            };
        }

        data["monthStatus"] = status;
        data.append("monthStatus", status);
        saveInventoryReceiving(data, "approve", notificationData, pageContent,lastApproveCondition);
    }
});
// ----- END APPROVE DOCUMENT -----


// ----- REJECT DOCUMENT -----
$(document).on("click", "#btnReject", function () {

    const id       = $(this).attr("monthID");
    const feedback = $(this).attr("code") || getFormCode("TMP", dateToday(), id);

    $("#modal_inventory_receiving_content").html(preloader);
    $("#modal_inventory_receiving .page-title").text("DENY 13th Month");
    $("#modal_inventory_receiving").modal("show");
    let html = `
    <div class="modal-body">
        <div class="form-group">
            <label>Remarks <code>*</code></label>
            <textarea class="form-control validate"
                data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
                minlength="2"
                maxlength="250"
                id="monthRemarks"
                name="monthRemarks"
                rows="4"
                style="resize: none"
                required></textarea>
            <div class="d-block invalid-feedback" id="invalid-monthRemarks"></div>
        </div>
    </div>
    <div class="modal-footer text-right">
        <button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
        monthID="${id}"
        code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
        <button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
    </div>`;
    $("#modal_inventory_receiving_content").html(html);
});

$(document).on("click", "#btnRejectConfirmation", function () {
    const id       = decryptString($(this).attr("monthID"));
    const feedback = $(this).attr("code") || getFormCode("TMP", dateToday(), id);

    const validate = validateForm("modal_inventory_receiving");
    if (validate) {
        let tableData = getTableData("hris_13month_tbl", "", "monthID = " + id);
        if (tableData) {
            let approversStatus = tableData[0].approversStatus;
            let approversDate   = tableData[0].approversDate;
            let employeeID      = tableData[0].employeeID;

            // let data = {};
            // data["action"] = "update";
            // data["method"] = "deny";
            // data["monthID"] = id;
            // data["approversStatus"] = updateApproveStatus(approversStatus, 3);
            // data["approversDate"]   = updateApproveDate(approversDate);
            // data["monthID"] = $("[name=monthID]").val()?.trim();
            // data["updatedBy"] = sessionID;

            let data = new FormData;
            data.append("action", "update");
            data.append("method", "deny");
            data.append("monthID", id);
            data.append("approversStatus", updateApproveStatus(approversStatus, 3));
            data.append("approversDate", updateApproveDate(approversDate));
            data.append("monthRemarks", $("[name=monthRemarks]").val()?.trim());
            data.append("updatedBy", sessionID);

            let notificationData = {
                moduleID:                112,
                tableID: 				 id,
                notificationTitle:       "13th Month",
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
    const monthID = decryptString($(this).attr("monthID"));
    const feedback          = $(this).attr("code") || getFormCode("TMP", dateToday(), id);

    const id = decryptString($(this).attr("monthID"));
    let data = new FormData;
    data.append("monthID", monthID);
    data.append("action", "update");
    data.append("method", "drop");
    data.append("updatedBy", sessionID);

    saveInventoryReceiving(data, "drop", null, pageContent);
})

$(document).on("click", "#btnRelease", function() {
    const monthID = decryptString($(this).attr("monthID"));
   
    const feedback          = $(this).attr("code") || getFormCode("TMP", dateToday(), id);

    const id = decryptString($(this).attr("monthID"));
    let data = new FormData;
    
    data.append("monthID", monthID);
    data.append("action", "update");
    data.append("method", "release");
    data.append("updatedBy", sessionID);
    data.append("monthStatus", 2);
   
    saveInventoryReceiving(data, "release", null, pageContent);
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
const title = "13TH MONTH PROCESS";
let swalText, swalImg;

$("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("hide");

switch (method) {
    case "save":
        swalTitle = `SAVE ${title.toUpperCase()}`;
        swalText  = "Are you sure to save this 13th month process?";
        swalImg   = `${base_url}assets/modal/draft.svg`;
        break;
    case "submit":
        swalTitle = `SUBMIT ${title.toUpperCase()}`;
        swalText  = "Are you sure to submit this 13th month process?";
        swalImg   = `${base_url}assets/modal/add.svg`;
        break;
    case "approve":
        swalTitle = `APPROVE ${title.toUpperCase()}`;
        swalText  = "Are you sure to approve this processing of 13th month?";
        swalImg   = `${base_url}assets/modal/approve.svg`;
        break;
    case "deny":
        swalTitle = `DENY ${title.toUpperCase()}`;
        swalText  = "Are you sure to deny this processing of 13th month?";
        swalImg   = `${base_url}assets/modal/reject.svg`;
        break;
    case "cancelform":
        swalTitle = `CANCEL ${title.toUpperCase()}`;
        swalText  = "Are you sure to cancel this 13th month process?";
        swalImg   = `${base_url}assets/modal/cancel.svg`;
        break;
    case "drop":
        swalTitle = `DROP ${title.toUpperCase()}`;
        swalText  = "Are you sure to drop this 13th month process?";
        swalImg   = `${base_url}assets/modal/drop.svg`;
        break;
    case "release":
        swalTitle = `RELEASE ${title.toUpperCase()}`;
        swalText  = "Are you sure to release this 13th month process?";
        swalImg   = `${base_url}assets/modal/approve.svg`;
        break;
    default:
        swalTitle = `CANCEL ${title.toUpperCase()}`;
        swalText  = "Are you sure that you want to cancel this 13th month process?";
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
                url:         `month_process/saveMonthProcess`,
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
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} submitted successfully!`;
                    } else if (method == "save") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} saved successfully!`;
                    } else if (method == "cancelform") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} cancelled successfully!`;
                    } else if (method == "approve") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} approved successfully!`;
                    } else if (method == "deny") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} denied successfully!`;
                    } else if (method == "drop") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} dropped successfully!`;
                    }	else if (method == "release") {
                        swalTitle = `${getFormCode("TMP", dateCreated, insertedID)} release successfully!`;
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