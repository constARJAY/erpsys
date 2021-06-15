$(document).ready(function() {

    // ----- GLOBAL VARIABLE -----
    const allowedUpdate = isUpdateAllowed(99);


    const getNonFormattedAmount = (amount = "₱0.00") => {
        return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
    }

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

    // ASSUME THAT ALL CLIENT HAD PASSED ALL DOCUMENTS
    const clientList = getTableData(
        `pms_client_tbl`, 
        `*`,
        `clientStatus = 1`).map(client => {
            const {
                clientID,
                clientName,
                clientUnitNumber,
                clientHouseNumber,
                clientStreetName,
                clientSubdivisionName,
                clientBarangay,
                clientCity,
                clientProvince,
                clientCountry,
                clientPostalCode
            } = client;

            const clientAddress = (clientUnitNumber ? titleCase(clientUnitNumber)+", " : "")+(clientHouseNumber ? titleCase(clientHouseNumber)+", " : "")+(clientStreetName ? titleCase(clientStreetName)+", " : "")+(clientSubdivisionName ? titleCase(clientSubdivisionName)+", " : "")+(clientBarangay ? titleCase(clientBarangay)+", " : "")+(clientCity ? titleCase(clientCity)+", " : "")+(clientProvince ? titleCase(clientProvince)+", " : "")+(clientCountry ? titleCase(clientCountry)+", " : "")+(clientPostalCode ? titleCase(clientPostalCode) : "");
            return { clientID, clientName, clientAddress };
        })
    // ----- END GLOBAL VARIABLE -----


    // ----- VIEW DOCUMENT -----
    const getBillingContent = async (billingID = 0) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "billing_module/getBillingContent",
            data:     { billingID },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
            }
        })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false, isRevise = false) {
        const loadData = (id, isRevise = false) => {
            const data = getBillingContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            billingStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            // DRAFT OR CANCEL
                            if (billingStatus == 0 || billingStatus == 2) { 
                                isAllowed = false;
                            }
                        } else if (employeeID == sessionID) {
                            if (billingStatus == 0) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (isRevise && employeeID == sessionID) {
                                pageContent(true, tableData, isReadOnly, true);
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
                } else {
                    showNotification("danger", "There was an error fetching the data.");
                    pageContent();
                    updateURL();
                }
            });
        }

        if (view_id) {
            let id = view_id;
                id && isFinite(id) && loadData(id, isRevise);
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
                        id && isFinite(id) && loadData(id);
                } else {
                    const isAllowed = isCreateAllowed(99);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}fms/billing_module?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}fms/billing_module?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}fms/billing_module?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}fms/billing_module`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // ----- BILLING DATA -----
    const getBillingData = () => {
        /**
         * ===== STATUS =====
         * 0 - Draft
         * 1 - Saved
         * 2 - Cancelled
         */

        const data = getTableData(
            `fms_billing_tbl AS fbt
            LEFT JOIN hris_employee_list_tbl AS helt ON fbt.employeeID = helt.employeeID`,
            `fbt.billingID,
            fbt.createdAt,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            fbt.clientName AS billedTo,
            fbt.clientAddress AS address,
            fbt.billingGrandTotal AS grandTotal,
            fbt.submittedAt AS dateBilled,
            fbt.billingStatus AS status`,
            `fbt.billingStatus = 1 OR fbt.employeeID = ${sessionID}`
        );
        return data;
    }
    // ----- END BILLING DATA -----


    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableBilling")) {
            $("#tableBilling").DataTable().destroy();
        }

        if ($.fn.DataTable.isDataTable("#tableBillingContent")) {
            $("#tableBillingContent").DataTable().destroy();
        }

        if ($.fn.DataTable.isDataTable("#tableBillingContent0")) {
            $("#tableBillingContent0").DataTable().destroy();
        }

        var table = $("#tableBilling")
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                sorting:        [],
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 100 },
                    { targets: 1, width: 150 },
                    { targets: 2, width: 200 },
                    { targets: 3, width: 250 },
                    { targets: 4, width: 150 },
                    { targets: 5, width: 150 },
                    { targets: 6, width: 150 },
                ],
            });

        var table = $("#tableBillingContent")
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 50  },
                    { targets: 1, width: 350 },
                    { targets: 2, width: 100 },
                    { targets: 3, width: 100 },
                    { targets: 4, width: 100 },
                ],
            });

        var table = $("#tableBillingContent0")
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 350 },
                    { targets: 1, width: 100 },
                    { targets: 2, width: 100 },
                    { targets: 3, width: 100 },
                ],
            });
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
    function headerButton(isAdd = true, text = "Add") {
        let html;
        if (isAdd) {
            if (isCreateAllowed(99)) {
                html = `
				<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
            }
        } else {
            html = `
            <button type="button" 
                class="btn btn-default btn-light" 
                id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
        }
        $("#headerButton").html(html);
    }
    // ----- END HEADER BUTTON -----


    // ----- STATUS STYLE -----
    function statusStyle(status) {
        let html = "";
        if (status == 0) {
            html = `<span class="badge badge-warning w-100">Draft</span>`;
        } else if (status == 1) {
            html = `<span class="badge badge-outline-success w-100" style="width: 100% !important">Saved</span>`;
        } else if (status == 2) {
            html = `<span class="badge badge-primary w-100">Cancelled</span>`;
        }
        return html;
    }
    // ----- END STATUS STYLE -----


    // ----- BILLING CONTENT ------
    function billingContent() {
        const billingData = getBillingData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableBilling">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Billed To</th>
                        <th>Address</th>
                        <th>Grand Total</th>
                        <th>Date Billed</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>`;

        billingData.map(timeline => {

            const { 
                billingID,
                createdAt,
                preparedBy,
                billedTo,
                address,
                grandTotal = 0,
                dateBilled,
                status
            } = timeline;

            html += `
            <tr class="btnView" id="${encryptString(billingID)}">
                <td>${getFormCode("BIL", createdAt, billingID)}</td>
                <td>${preparedBy}</td>
                <td>${billedTo || "-"}</td>
                <td>${address || "-"}</td>
                <td class="text-right">${formatAmount(grandTotal, true)}</td>
                <td>${dateBilled ? moment(dateBilled).format("MMMM DD, YYYY hh:mm:ss A") : "-"}</td>
                <td>${statusStyle(status)}</td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END BILLING CONTENT ------


    // ----- GET CLIENT LIST -----
    const getClientList = (id = null, name = "", status = 0) => {
        let html = "";
        if (name && status == 1) {
            html = `<option value="${id}" selected>${name}</option>`
        } else {
            clientList.map(client => {
                const { clientID, clientName, clientAddress } = client;
                html += `
                <option value     = "${clientID}"
                    clientName    = "${clientName}"
                    clientAddress = "${clientAddress}"
                    ${clientID == id ? "selected" : ""}>${clientName}</option>`;
            })
        }
        return html;
    }
    // ----- END GET CLIENT LIST -----


    // ----- FORM BUTTONS -----
    function formButtons(data = false, readOnly = false, isRevise = false) {
        const {
            billingID,
            billingStatus = false,
        } = data && data[0];

        let button = "";
        if (!billingStatus || billingStatus == "0") {
            const btnCancelID = billingID ? "btnCancelForm" : "btnCancel";
            button = !readOnly ? `
            <button class="btn btn-submit px-5 p-2" 
                id="btnSubmit"
                billingID="${encryptString(billingID)}"
                status="${billingStatus}">
                <i class="fas fa-paper-plane"></i> Submit
            </button>
            <button class="btn btn-cancel px-5 p-2" 
                id="${btnCancelID}"
                billingID="${encryptString(billingID)}"
                status="${billingStatus}">
                <i class="fas fa-ban"></i> Cancel
            </button>` : "";
        } else if (billingStatus == "2") {
            if (isRevise) {
                const btnCancelID = billingID && !isRevise ? "btnCancelForm" : "btnCancel";
                button = !readOnly ? `
                <button class="btn btn-submit px-5 p-2" 
                    id="btnSubmit"
                    billingID="${encryptString(billingID)}"
                    status="${billingStatus}"
                    revise="true">
                    <i class="fas fa-paper-plane"></i> Submit
                </button>
                <button class="btn btn-cancel px-5 p-2" 
                    id="${btnCancelID}"
                    billingID="${encryptString(billingID)}"
                    status="${billingStatus}"
                    revise="true">
                    <i class="fas fa-ban"></i> Cancel
                </button>` : "";
            } else {
                // CANCEL
                button = `
                <button
                    class="btn btn-cancel px-5 p-2"
                    id="btnRevise" 
                    billingID="${encryptString(billingID)}"
                    status="${billingStatus}"><i class="fas fa-clone"></i>
                    Revise
                </button>`;
            }
        }
        return button;
    }
    // ----- END FORM BUTTONS -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false, isRevise = false) {
        $("#page_content").html(preloader);
        readOnly = isRevise ? false : readOnly;
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            billingID,
            createdAt,
            employeeID,
            billingStatus     = false,
            submittedAt       = "",
            billingReason     = "",
            clientID          = "",
            clientName        = "",
            clientAddress     = "",
            billingComment    = "",
            billingSubtotal   = 0,
            billingVatAmount  = 0,
            billingGrandTotal = 0,
            activities        = [],
        } = data && data[0];

        let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);

        $("#btnBack").attr("status", billingStatus);
        $("#btnBack").attr("billingID", encryptString(billingID));
        $("#btnBack").attr("revise", isRevise);

        const disabled = readOnly ? "disabled" : "";
        const billingStatusDisplay = billingID && !isRevise ? statusStyle(billingStatus) : "----";
        const buttonDisplay = formButtons(data, readOnly, isRevise);

        let activityContent = "";
        if (activities.length > 0) {
            activities.map(activity => {
                activityContent += getItemRow(activity, readOnly);
            })
        } else {
            activityContent += getItemRow();
        }

        let tableCheckbox = !readOnly ? `
        <th class="text-center">
            <div class="action">
                <input type="checkbox" class="checkboxall">
            </div>
        </th>` : "";
        let buttonAddDeleteRow = !readOnly ? `
        <div>
            <button type="button" class="btn btn-primary btnAddRow" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
            <button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
        </div>` : "";
        let billingVat = !readOnly ? `
        <input type="checkbox" 
            id="billingVat" 
            ${billingVatAmount > 0 ? "checked" : ""}>` : ""

        let html = `
        <div class="">
            <div class="row px-2">
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${billingID ? getFormCode("BIL", createdAt, billingID) : "----"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Status</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${billingStatusDisplay}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "----"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Billed</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "----"}
                            </h6>      
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
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
                            id="billingReason" 
                            name="billingReason" 
                            required 
                            rows="4" 
                            style="resize:none;"
                            ${disabled}>${billingReason}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-billingReason"></div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Bill To ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control select2"
                            name="clientID"
                            id="clientID"
                            required
                            ${disabled}>
                            <option selected disabled>Select Bill To</option>    
                            ${getClientList(clientID, clientName, billingStatus)}
                        </select>
                        <div class="d-block invalid-feedback" id="invalid-clientID"></div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Address</label>
                        <input class="form-control"
                            id="clientAddress"
                            name="clientAddress"
                            value="${clientAddress || "-"}"
                            disabled>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 w-100">
                    <table class="table table-striped" id="${!readOnly ? "tableBillingContent" : "tableBillingContent0"}">
                        <thead>
                            <tr style="white-space: nowrap">
                                ${tableCheckbox}
                                <th>Activity ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Quantity ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Amount ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody class="activityTableBody" id="activityTableBody">
                            ${activityContent}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        ${buttonAddDeleteRow}
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label><h5>Other Comments: </h5></label>
                        <textarea rows="5" 
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="0"
                            maxlength="99999"
                            class="form-control validate" 
                            name="billingComment" 
                            id="billingComment" 
                            style="resize: none"
                            ${disabled}>${billingComment}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-billingComment"></div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 pt-3 pb-2 align-self-center">
                    <div class="row" style="font-size: 1.1rem">
                        <div class="col-6 col-lg-7 text-left">Subtotal: </div>
                        <div class="col-6 col-lg-5 text-right text-dark"
                            style="font-size: 1.05em"
                            id="billingSubtotal">
                            ${formatAmount(billingSubtotal, true)}
                        </div>
                    </div>
                    <div class="row" style="font-size: 1.1rem">
                        <div class="col-6 col-lg-7 text-left">12% VAT: </div>
                        <div class="col-6 col-lg-5 text-right text-dark">
                            ${billingVat}
                            <span id="billingVatAmount">${formatAmount(billingVatAmount, true)}</span>
                        </div>
                    </div>
                    <div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
                        <div class="col-6 col-lg-7 text-left font-weight-bolder mt-1">Grand Total:</div>
                        <div class="col-6 col-lg-5 text-right text-danger font-weight-bolder"
                            id="billingGrandTotal"
                            style="font-size: 1.3em">
                            ${formatAmount(billingGrandTotal, true)}
                        </div>
                    </div>
                </div>

                <div class="col-md-12 text-right mt-3">
                    ${buttonDisplay}
                </div>
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            initAll();
            updateTableItems();
        }, 500);
    }
    // ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
        $("#page_content").html(preloader);
        if (!isForm) {
            preventRefresh(false);
            headerButton(true, "Add Billing");
            billingContent();
            updateURL();
        } else {
            headerButton(false, "");
            formContent(data, readOnly, isRevise);
        }
    }
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- UPDATE TABLE ITEMS -----
    function updateTableItems() {
        $("#activityTableBody tr").each(function(i) {
            // ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

            // ACTIVITY
            $(`td .billingActivityParent [name="billingActivity"]`, this).attr("id", `billingActivity${i}`);
            $(`td .billingActivityParent .invalid-feedback`, this).attr("id", `invalid-billingActivity${i}`);

            // QUANTITY
            $(`td .billingQuantityParent [name="billingQuantity"]`, this).attr("id", `billingQuantity${i}`);
            $(`td .billingQuantityParent .invalid-feedback`, this).attr("id", `invalid-billingQuantity${i}`);

            // AMOUNT
            $(`td .billingAmountParent [name="billingAmount"]`, this).attr("id", `billingAmount${i}`);
            $(`td .billingAmountParent .invalid-feedback`, this).attr("id", `invalid-billingAmount${i}`);

            // TOTAL AMOUNT
            $(`td .billingTotalAmount`, this).attr("id", `billingTotalAmount${i}`);
        })
    }
    // ----- END UPDATE TABLE ITEMS -----


    // ----- GET ITEM ROW -----
    function getItemRow(data = false, readOnly = false) {
        const {
            activity    = "",
            quantity    = 0.00,
            amount      = 0.00,
            totalAmount = 0.00
        } = data;

        let html = "";
        if (readOnly) {
            html += `
            <tr>
                <td>
                    ${activity}
                </td>
                <td class="text-center">
                    ${formatAmount(quantity)} 
                </td>
                <td class="text-right">
                    ${formatAmount(amount, true)}
                </td>
                <td class="text-right">
                    ${formatAmount(totalAmount, true)}
                </td>
            </tr>`;
        } else {
            html += `
            <tr>
                <td class="text-center">
                    <div class="action">
                        <input type="checkbox" class="checkboxrow">
                    </div>
                </td>
                <td>
                    <div class="form-group billingActivityParent mb-0">
                        <textarea rows="2" 
                            class="form-control validate" 
                            name="billingActivity" 
                            id="billingActivity" 
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="325"
                            style="resize: none" 
                            required>${activity}</textarea>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group billingQuantityParent mb-0">
                        <input type="text" 
                            class="form-control input-quantity text-center"
                            name="billingQuantity"
                            id="billingQuantity"
                            min="0.01"
                            max="999999"
                            minlength="1"
                            maxlength="20"
                            value="${quantity}"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group billingAmountParent mb-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control amount text-right" 
                                name="billingAmount"
                                id="billingAmount"
                                min="0.01" 
                                max="999999" 
                                minlength="1" 
                                maxlength="20"
                                value="${amount}"
                                required>
                        </div>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </td>
                <td class="text-right">
                    <div class="billingTotalAmount">${formatAmount(totalAmount, true)}</div>
                </td>
            </tr>`;
        }
        return html;
    }
    // ----- END GET ITEM ROW -----


    // ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name="billingQuantity"]`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`[name="billingAmount"]`).map(element => getNonFormattedAmount(element.value) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#billingSubtotal`).text(formatAmount(totalAmount, true));

        const isChecked = $(`#billingVat`).prop("checked");
        const vatAmount = isChecked ? (totalAmount * 0.12) : 0;
        $("#billingVatAmount").text(formatAmount(vatAmount, true));

        const grandTotal = totalAmount - vatAmount;
        $("#billingGrandTotal").text(formatAmount(grandTotal, true));
		return grandTotal;
	}
	// ----- END UPDATE TOTAL AMOUNT -----


    // ----- DELETE TABLE ROW -----
	function deleteTableRow() {
		if ($(`.checkboxrow:checked`).length != $(`.checkboxrow`).length) {
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
					$(`.checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableItems();
							updateDeleteButton();
							updateTotalAmount();
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more services.");
		}
	}
	// ----- END DELETE TABLE ROW -----


    // ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let checkedCount = 0;
		$(".checkboxrow").each(function() {
			this.checked && checkedCount++;
		})
		$(".btnDeleteRow").attr("disabled", checkedCount == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----


    // ----- SELECT CLIENT NAME -----
    $(document).on("change", `[name="clientID"]`, function() {
        const address = $(`option:selected`, this).attr("clientAddress");
        $(`[name="clientAddress"]`).val(address);
    })
    // ----- END SELECT CLIENT NAME -----


    // ----- CLICK VATABLE -----
    $(document).on("change", `#billingVat`, function() {
        updateTotalAmount();
    })
    // ----- END CLICK VATABLE -----


    // ----- KEYUP QUANTITY OR AMOUNT -----
	$(document).on("keyup", `[name="billingQuantity"], [name="billingAmount"]`, function() {
		const index     = $(this).closest("tr").first().attr("index");
		const quantity  = +getNonFormattedAmount($(`#billingQuantity${index}`).val());
		const unitcost  = +getNonFormattedAmount($(`#billingAmount${index}`).val());
		const totalcost = quantity * unitcost;
		$(`#billingTotalAmount${index}`).text(formatAmount(totalcost, true));

		updateTotalAmount();
	})
	// ----- END KEYUP QUANTITY OR AMOUNT -----


    // ----- CLICK DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
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
        $(".checkboxrow").each(function(i, obj) {
            $(this).prop("checked", isChecked);
        });
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----


    // ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {
        let row = getItemRow();
        $("#activityTableBody").append(row);
        $(`[name="billingActivity"]`).last().focus();
		updateTableItems();
		initAmount();
        initQuantity();
    })
    // ----- END INSERT ROW ITEM -----


    // ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
        $("#page_content").html(preloader);
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const billingID = decryptString($(this).attr("id"));
        viewDocument(billingID);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const billingID = decryptString($(this).attr("billingID"));
		viewDocument(billingID, false, true);
	});
	// ----- END REVISE DOCUMENT -----


    // ----- CLICK BUTTON SUBMIT -----
    $(document).on("click", "#btnSubmit", function () {
        const billingID      = decryptString($(this).attr("billingID"));
        const validateInputs = validateForm("page_content");
        if (validateInputs) {
            saveBilling("submit", billingID, pageContent);
        }
    });


    // ----- CLICK BUTTON CANCEL OR BACK -----
    $(document).on("click", "#btnBack, #btnCancel", function() {
        const billingID = decryptString($(this).attr("billingID"));
        const status    = $(this).attr("status");
        const revise    = $(this).attr("revise");
        if (status == "false" || status == "0" || revise == "true") {
            saveBilling("save", billingID, pageContent);
        } else {
            pageContent();
        }
    })
    // ----- END CLICK BUTTON CANCEL OR BACK -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const billingID = decryptString($(this).attr("billingID"));
		saveBilling("cancelform", billingID, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- GET BILLING INPUT DATA -----
    function getBillingInputData(id = null, method = null) {
        const getStatus = status => {
            return status == "save" ? 0 : (status == "submit" ? 1 : 2);
        }

        let activities = [];
        $(`.activityTableBody tr`).each(function() {
            const activity = $(`[name="billingActivity"]`, this).val()?.trim();
            const quantity = getNonFormattedAmount($(`[name="billingQuantity"]`, this).val());
            const amount   = getNonFormattedAmount($(`[name="billingAmount"]`, this).val());
            const totalAmount = quantity * amount;
            activities.push({
                activity, quantity, amount, totalAmount
            });
        })

        let data = {
            billingID:         id,
            billingStatus:     getStatus(method),
            submittedAt:       method == "submit",
            employeeID:        sessionID,
            billingReason:     $(`[name="billingReason"]`).val()?.trim(),
            clientID:          $(`[name="clientID"]`).val(),
            clientName:        $(`[name="clientID"] option:selected`).attr("clientName"),
            clientAddress:     $(`[name="clientID"] option:selected`).attr("clientAddress"),
            billingComment:    $(`[name="billingComment"]`).val()?.trim(),
            billingSubtotal:   getNonFormattedAmount($(`#billingSubtotal`).text()),
            billingVatAmount:  getNonFormattedAmount($(`#billingVatAmount`).text()),
            billingGrandTotal: getNonFormattedAmount($(`#billingGrandTotal`).text()),
            activities
        };

        return data;
    }
    // ----- END GET BILLING INPUT DATA -----


    // ----- CONFIRMATION -----
    const getConfirmation = method => {
        const title = "Billing";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE DRAFT`;
                swalText  = "Do you want to save your changes for this billing?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
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
            case "uploadcontract":
                swalTitle = `UPLOAD CONTRACT`;
                swalText  = "Are you sure to upload this contract?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()}`;
                swalText  = "Are you sure to discard this process?";
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
    // ----- END CONFIRMATION -----


    // ----- SAVE PROJECT BUDGET -----
    function saveBilling(method = "submit", id = null, callback = null) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    callback && callback();
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    });
                } else {

                    const data = getBillingInputData(id, method);
                    $.ajax({
                        method:      "POST",
                        url:         `billing_module/saveBilling`,
                        data,
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
                                swalTitle = `Billing saved successfully!`;
                            } else if (method == "save") {
                                swalTitle = `Billing saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `Billing cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("PTB", dateCreated, insertedID)} dropped successfully!`;
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    callback && callback();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
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
            } else {
                if (res.dismiss == "cancel" && method != "submit") {
                    if (method != "deny") {
                        if (method != "cancelform") {
                            callback && callback();
                        }
                    } else {
                        
                    }
                } else if (res.isDismissed) {
                    if (method == "deny") {
                        
                    }
                }
            }
        });
    }
    // ----- END SAVE PROJECT BUDGET -----

})