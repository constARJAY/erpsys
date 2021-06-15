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
                clientPostalCode,
                client_MobileNo,
                createdAt
            } = client;

            const clientAddress = (clientUnitNumber ? titleCase(clientUnitNumber)+", " : "")+(clientHouseNumber ? titleCase(clientHouseNumber)+", " : "")+(clientStreetName ? titleCase(clientStreetName)+", " : "")+(clientSubdivisionName ? titleCase(clientSubdivisionName)+", " : "")+(clientBarangay ? titleCase(clientBarangay)+", " : "")+(clientCity ? titleCase(clientCity)+", " : "")+(clientProvince ? titleCase(clientProvince)+", " : "")+(clientCountry ? titleCase(clientCountry)+", " : "")+(clientPostalCode ? titleCase(clientPostalCode) : "");
            const clientCode = getFormCode("CLT", createdAt, clientID);
            const clientContactNumber = client_MobileNo;

            return { clientID, clientCode, clientName, clientContactNumber, clientAddress };
        })
    // ----- END GLOBAL VARIABLE -----


    // ----- VIEW DOCUMENT -----
    const getCollectionContent = async (collectionID = 0) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "collection_module/getCollectionContent",
            data:     { collectionID },
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
            const data = getCollectionContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            collectionStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            // DRAFT OR CANCEL
                            if (collectionStatus == 0 || collectionStatus == 2) { 
                                isAllowed = false;
                            }
                        } else if (employeeID == sessionID) {
                            if (collectionStatus == 0) {
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
            window.history.pushState("", "", `${base_url}fms/collection_module?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}fms/collection_module?add=${view_id}`);
            } else {
                window.history.pushState("", "", `${base_url}fms/collection_module?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}fms/collection_module`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // ----- COLLECTION DATA -----
    const getCollectionData = () => {
        /**
         * ===== STATUS =====
         * 0 - Draft
         * 1 - Collected
         * 2 - Cancelled
         */

        const data = getTableData(
            `fms_collection_tbl AS fct
            LEFT JOIN hris_employee_list_tbl AS helt ON fct.employeeID = helt.employeeID`,
            `fct.collectionID,
            fct.createdAt,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            fct.clientName AS collectedTo,
            fct.clientAddress AS address,
            fct.collectionGrandTotal AS grandTotal,
            fct.collectionPaymentMethod AS paymentMethod,
            fct.submittedAt AS dateCollected,
            fct.collectionStatus AS status`,
            `fct.collectionStatus = 1 OR fct.employeeID = ${sessionID}`
        );
        return data;
    }
    // ----- END COLLECTION DATA -----


    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableCollection")) {
            $("#tableCollection").DataTable().destroy();
        }

        if ($.fn.DataTable.isDataTable("#tableCollectionContent")) {
            $("#tableCollectionContent").DataTable().destroy();
        }

        if ($.fn.DataTable.isDataTable("#tableCollectionContent0")) {
            $("#tableCollectionContent0").DataTable().destroy();
        }

        var table = $("#tableCollection")
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
                    { targets: 7, width: 140 },
                ],
            });

        var table = $("#tableCollectionContent")
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
                    { targets: 2, width: 150 },
                    { targets: 3, width: 150 },
                    { targets: 4, width: 150 },
                    { targets: 5, width: 150 },
                    { targets: 6, width: 150 },
                    { targets: 7, width: 200 },
                    { targets: 8, width: 250 },
                ],
            });

        var table = $("#tableCollectionContent0")
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
                    { targets: 1, width: 150 },
                    { targets: 2, width: 150 },
                    { targets: 3, width: 150 },
                    { targets: 4, width: 150 },
                    { targets: 5, width: 150 },
                    { targets: 6, width: 200 },
                    { targets: 6, width: 250 },
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


    // ----- COLLECTION CONTENT ------
    function collectionContent() {
        const collectionData = getCollectionData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableCollection">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Collected To</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                        <th>Grand Total</th>
                        <th>Date Collected</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>`;

        collectionData.map(collection => {

            const { 
                collectionID,
                createdAt,
                preparedBy,
                collectedTo,
                address,
                paymentMethod = "",
                grandTotal    = 0,
                dateCollected,
                status
            } = collection;

            html += `
            <tr class="btnView" id="${encryptString(collectionID)}">
                <td>${getFormCode("COL", createdAt, collectionID)}</td>
                <td>${preparedBy}</td>
                <td>${collectedTo || "-"}</td>
                <td>${address || "-"}</td>
                <td>${paymentMethod || "-"}</td>
                <td class="text-right">${formatAmount(grandTotal, true)}</td>
                <td>${dateCollected ? moment(dateCollected).format("MMMM DD, YYYY hh:mm:ss A") : "-"}</td>
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
    // ----- END COLLECTION CONTENT ------


    // ----- GET CLIENT LIST -----
    const getClientList = (id = null, name = "", status = 0) => {
        let html = "";
        if (name && status == 1) {
            html = `<option value="${id}" selected>${name}</option>`
        } else {
            clientList.map(client => {
                const { clientID, clientCode, clientName, clientContactNumber, clientAddress } = client;
                html += `
                <option value           = "${clientID}"
                    clientCode          = "${clientCode}"
                    clientName          = "${clientName}"
                    clientContactNumber = "${clientContactNumber}"
                    clientAddress       = "${clientAddress}"
                    ${clientID == id ? "selected" : ""}>${clientName}</option>`;
            })
        }
        return html;
    }
    // ----- END GET CLIENT LIST -----


    // ----- FORM BUTTONS -----
    function formButtons(data = false, readOnly = false, isRevise = false) {
        const {
            collectionID,
            collectionStatus = false,
        } = data && data[0];

        let button = "";
        if (!collectionStatus || collectionStatus == "0") {
            const btnCancelID = collectionID ? "btnCancelForm" : "btnCancel";
            button = !readOnly ? `
            <button class="btn btn-submit px-5 p-2" 
                id="btnSubmit"
                collectionID="${encryptString(collectionID)}"
                status="${collectionStatus}">
                <i class="fas fa-paper-plane"></i> Submit
            </button>
            <button class="btn btn-cancel px-5 p-2" 
                id="${btnCancelID}"
                collectionID="${encryptString(collectionID)}"
                status="${collectionStatus}">
                <i class="fas fa-ban"></i> Cancel
            </button>` : "";
        } else if (collectionStatus == "2") {
            if (isRevise) {
                const btnCancelID = collectionID && !isRevise ? "btnCancelForm" : "btnCancel";
                button = !readOnly ? `
                <button class="btn btn-submit px-5 p-2" 
                    id="btnSubmit"
                    collectionID="${encryptString(collectionID)}"
                    status="${collectionStatus}"
                    revise="true">
                    <i class="fas fa-paper-plane"></i> Submit
                </button>
                <button class="btn btn-cancel px-5 p-2" 
                    id="${btnCancelID}"
                    collectionID="${encryptString(collectionID)}"
                    status="${collectionStatus}"
                    revise="true">
                    <i class="fas fa-ban"></i> Cancel
                </button>` : "";
            } else {
                // CANCEL
                button = `
                <button
                    class="btn btn-cancel px-5 p-2"
                    id="btnRevise" 
                    collectionID="${encryptString(collectionID)}"
                    status="${collectionStatus}"><i class="fas fa-clone"></i>
                    Revise
                </button>`;
            }
        }
        return button;
    }
    // ----- END FORM BUTTONS -----


    // ----- GET PAYMENT METHOD -----
    function getPaymentMethod(name = "", status = 0) {
        let options = ["Cash", "Cheque", "Card"];
        let html = "";
        if (name && status == 1) {
            html = `<option value="${name}" selected>${name}</option>`
        } else {
            options.map(option => {
                html += `
                <option value = "${option}"
                    ${option == name ? "selected" : ""}>${option}</option>`;
            })
        }
        return html;
    }
    // ----- END GET PAYMENT METHOD -----


    // ----- DATERANGEPICKER -----
    function dateRangePicker(dateFrom = new Date, dateTo = new Date) {
        $("#dateFilter").daterangepicker({
            autoUpdateInput: false,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY",
            },
            maxDate:   moment(),
            startDate: moment(dateFrom),
            endDate:   moment(dateTo)
        }, function(start, end) {
            let dateFilter = `${start.format("MMMM DD, YYYY")} - ${end.format("MMMM DD, YYYY")}`;
            $("#dateFilter").val(dateFilter);
            $("#dateFilter").attr("dateFrom", start.format("YYYY-MM-DD"));
            $("#dateFilter").attr("dateTo", end.format("YYYY-MM-DD"));

            let loading = `<tr class="text-center"><td colspan="9">${preloader}</td></tr>`;
            $("#activityTableBody").html(loading);
            const data = getBillingContentDisplay();
            setTimeout(() => {
                let html = data ? data : `<tr class="text-center"><td colspan="9">No data available in table.</td></tr>`;
                $("#activityTableBody").html(html);
                initSelect2();
            }, 100);
        })
    }
    // ----- END DATERANGEPICKER -----


    // ----- GET BILLING CONTENT -----
    function getBillingContent(argClientID = false, argDateFrom = false, argDateTo = false) {

        const clientID = argClientID || $(`[name="clientID"]`).val();
        const dateFrom = argDateFrom || $(`[name="dateFilter"]`).attr("dateFrom");
        const dateTo   = argDateTo || $(`[name="dateFilter"]`).attr("dateTo");

        let result = false;
        $.ajax({
            method:   "POST",
            url:      "collection_module/getBillingContent",
            data:     { clientID, dateFrom, dateTo },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        })
        return result;
    }
    // ----- END GET BILLING CONTENT -----


    // ----- GET BILLING CONTENT DISPLAY -----
    function getBillingContentDisplay(argClientID = false, argDateFrom = false, argDateTo = false) {
        const billingContent = getBillingContent(argClientID, argDateFrom, argDateTo);

        let html = "";
        if (billingContent && billingContent.length > 0) {
            billingContent.map(bill => {

                const { 
                    billingID,
                    billingActivity = []
                } = bill;

                let activityHTML = "";
                billingActivity.map(act => {
                    const {
                        activity,
                        billingItemID,
                        totalAmount,
                        pendingAmount,
                    } = act;
                    activityHTML += `
                    <tr>
                        <td>
                            <textarea class="form-control"
                                name="activity"
                                id="activity${billingID}${billingItemID}"
                                billingID="${billingID}"
                                billingItemID="${billingItemID}"
                                rows="3"
                                style="resize: none;"
                                disabled>${activity}</textarea>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    data=allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    name="type"
                                    id="type${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    required>
                                <div class="d-block invalid-feedback" id="type${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate text-center"
                                    data=allowcharacters="[0-9][-]"
                                    minlength="4"
                                    maxlength="12"
                                    name="checkNumber"
                                    id="checkNumber${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    required>
                                <div class="d-block invalid-feedback" id="checkNumber${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="button"
                                    class="form-control validate daterange"
                                    data=allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="4"
                                    maxlength="12"
                                    name="checkDate"
                                    id="checkDate${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    required>
                                <div class="d-block invalid-feedback" id="checkDate${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    data=allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    name="depositoryAccount"
                                    id="depositoryAccount${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    required>
                                <div class="d-block invalid-feedback" id="depositoryAccount${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <select class="form-control select2"
                                    name="termPayment"
                                    id="termPayment${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    required>
                                    <option selected disabled>Select Payment Method</option>
                                    <option value="Partial">Partial</option>
                                    <option value="Full">Full</option>
                                </select>
                                <div class="d-block invalid-feedback" id="termPayment${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">₱</span>
                                    </div>
                                    <input type="text"
                                        class="form-control amount"
                                        minlength="2"
                                        maxlength="75"
                                        min="0.01"
                                        max="${pendingAmount}"
                                        name="amount"
                                        id="amount${billingID}${billingItemID}"
                                        billingID="${billingID}"
                                        billingItemID="${billingItemID}"
                                        required>
                                </div>
                                <div class="d-block invalid-feedback" id="amount${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <textarea class="form-control validate"
                                    data=allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="0"
                                    maxlength="9999"
                                    name="remarks"
                                    id="remarks${billingID}${billingItemID}"
                                    billingID="${billingID}"
                                    billingItemID="${billingItemID}"
                                    rows="3"
                                    style="resize: none;"></textarea>
                                <div class="d-block invalid-feedback" id="remarks${billingID}${billingItemID}"></div>
                            </div>
                        </td>
                    </tr>`;
                })

                html += `
                <tr billingID="${billingID}">
                    <td class="text-center" 
                        rowspan="${billingActivity.length + 1}">
                        <div class="action">
                            <input type="checkbox" class="checkboxrow">
                        </div>
                    </td>
                </tr>
                ${activityHTML}`;
            })
        }
        return html;
    }
    // ----- END GET BILLING CONTENT DISPLAY -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false, isRevise = false) {
        $("#page_content").html(preloader);
        readOnly = isRevise ? false : readOnly;
        readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            collectionID,
            createdAt,
            employeeID,
            dateFrom                = new Date,
            dateTo                  = new Date,
            collectionStatus        = false,
            submittedAt             = "",
            collectionReason        = "",
            clientID                = "",
            clientCode              = "",
            clientName              = "",
            clientContactNumber     = "",
            clientAddress           = "",
            collectionPaymentMethod = "",
            collectionComment       = "",
            collectionSubtotal      = 0,
            collectionVatAmount     = 0,
            collectionGrandTotal    = 0,
            activities              = [],
        } = data && data[0];

        let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);

        $("#btnBack").attr("status", collectionStatus);
        $("#btnBack").attr("collectionID", encryptString(collectionID));
        $("#btnBack").attr("revise", isRevise);

        const disabled = readOnly ? "disabled" : "";
        const collectionStatusDisplay = collectionID && !isRevise ? statusStyle(collectionStatus) : "----";
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
        let collectionVat = !readOnly ? `
        <input type="checkbox" 
            id="collectionVat" 
            ${collectionVatAmount > 0 ? "checked" : ""}>` : ""

        let html = `
        <div class="">
            <div class="row px-2">
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                            <h6 class="mt-0 text-danger font-weight-bold">
                                ${collectionID ? getFormCode("COL", createdAt, collectionID) : "----"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Status</small>
                            <h6 class="mt-0 font-weight-bold">
                                ${collectionStatusDisplay}
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
                            <small class="text-small text-muted font-weight-bold">Date Collected</small>
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
                            id="collectionReason" 
                            name="collectionReason" 
                            required 
                            rows="4" 
                            style="resize:none;"
                            ${disabled}>${collectionReason}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-collectionReason"></div>
                    </div>
                </div>

                <div class="col-sm-12 border-top mb-4 mt-2"></div>
                
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Client Code</label>
                        <input type="text" 
                            class="form-control" 
                            name="clientCode"
                            id="clientCode"
                            value="${clientCode || "-"}"
                            disabled>
                        <div class="d-block invalid-feedback" id="invalid-clientCode"></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Client Name ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control select2"
                            name="clientID"
                            id="clientID"
                            style="width: 100% !important"
                            required
                            ${disabled}>
                            <option selected disabled>Select Client Name</option>    
                            ${getClientList(clientID, clientName, collectionStatus)}
                        </select>
                        <div class="d-block invalid-feedback" id="invalid-clientID"></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Contact No.</label>
                        <input type="text" 
                            class="form-control" 
                            name="clientContactNumber"
                            id="clientContactNumber"
                            value="${clientContactNumber || "-"}"
                            disabled>
                        <div class="d-block invalid-feedback" id="invalid-clientContactNumber"></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12">
                    <div class="form-group">
                        <label>Payment Method ${!disabled ? "<code>*</code>" : ""}</label>
                        <select class="form-control select2"
                            name="collectionPaymentMethod"
                            id="collectionPaymentMethod"
                            style="width: 100% !important"
                            required
                            ${disabled}>
                            <option selected disabled>Select Payment Method</option>    
                            ${getPaymentMethod(collectionPaymentMethod, collectionStatus)}
                        </select>
                        <div class="d-block invalid-feedback" id="invalid-collectionPaymentMethod"></div>
                    </div>
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" 
                            class="form-control" 
                            name="clientAddress"
                            id="clientAddress"
                            value="${clientAddress || "-"}"
                            disabled>
                        <div class="d-block invalid-feedback" id="invalid-clientAddress"></div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                        <input type="button" 
                            class="form-control text-left" 
                            name="dateFilter"
                            id="dateFilter"
                            value="${moment(dateFrom).format("MMMM DD, YYYY")} - ${moment(dateTo).format("MMMM DD, YYYY")}"
                            dateFrom="${moment(dateFrom).format("YYYY-MM-DD")}"
                            dateTo="${moment(dateTo).format("YYYY-MM-DD")}"
                            style="width: 100% !important">
                        <div class="d-block invalid-feedback" id="invalid-dateFilter"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 w-100">
                    <table class="table table-striped" id="${!readOnly ? "tableCollectionContent" : "tableCollectionContent0"}">
                        <thead>
                            <tr style="white-space: nowrap">
                                ${tableCheckbox}
                                <th>Activity</th>
                                <th>Type ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Check No. ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Check Date ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Depository Account ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Term of Payment ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Amount ${!disabled ? "<code>*</code>" : ""}</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>
                        <tbody class="activityTableBody" id="activityTableBody">
                            ${getBillingContentDisplay(clientID, dateFrom, dateTo)}
                        </tbody>
                    </table>
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
                            name="collectionComment" 
                            id="collectionComment" 
                            style="resize: none"
                            ${disabled}>${collectionComment}</textarea>
                        <div class="d-block invalid-feedback" id="invalid-collectionComment"></div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12 pt-3 pb-2 align-self-center">
                    <div class="row" style="font-size: 1.1rem">
                        <div class="col-6 col-lg-7 text-left">Subtotal: </div>
                        <div class="col-6 col-lg-5 text-right text-dark"
                            style="font-size: 1.05em"
                            id="collectionSubtotal">
                            ${formatAmount(collectionSubtotal, true)}
                        </div>
                    </div>
                    <div class="row" style="font-size: 1.1rem">
                        <div class="col-6 col-lg-7 text-left">${collectionVat} 12% VAT: </div>
                        <div class="col-6 col-lg-5 text-right text-dark">
                            <span id="collectionVatAmount">${formatAmount(collectionVatAmount, true)}</span>
                        </div>
                    </div>
                    <div class="row pt-1" style="font-size: 1.3rem;; border-bottom: 3px double black; border-top: 1px solid black">
                        <div class="col-6 col-lg-7 text-left font-weight-bolder mt-1">Grand Total:</div>
                        <div class="col-6 col-lg-5 text-right text-danger font-weight-bolder"
                            id="collectionGrandTotal"
                            style="font-size: 1.3em">
                            ${formatAmount(collectionGrandTotal, true)}
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

            let start = dateFrom || new Date;
            let end   = dateTo   || new Date;
            dateRangePicker(start, end); 

        }, 500);
    }
    // ----- END FORM CONTENT -----


    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false, isRevise = false) {
        $("#page_content").html(preloader);
        if (!isForm) {
            preventRefresh(false);
            headerButton(true, "Add Collection");
            collectionContent();
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
            $(`td .collectionActivityParent [name="collectionActivity"]`, this).attr("id", `collectionActivity${i}`);
            $(`td .collectionActivityParent .invalid-feedback`, this).attr("id", `invalid-collectionActivity${i}`);

            // QUANTITY
            $(`td .collectionQuantityParent [name="collectionQuantity"]`, this).attr("id", `collectionQuantity${i}`);
            $(`td .collectionQuantityParent .invalid-feedback`, this).attr("id", `invalid-collectionQuantity${i}`);

            // AMOUNT
            $(`td .collectionAmountParent [name="collectionAmount"]`, this).attr("id", `collectionAmount${i}`);
            $(`td .collectionAmountParent .invalid-feedback`, this).attr("id", `invalid-collectionAmount${i}`);

            // TOTAL AMOUNT
            $(`td .collectionTotalAmount`, this).attr("id", `collectionTotalAmount${i}`);
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
                    <div class="form-group collectionActivityParent mb-0">
                        <textarea rows="2" 
                            class="form-control validate" 
                            name="collectionActivity" 
                            id="collectionActivity" 
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="325"
                            style="resize: none" 
                            required>${activity}</textarea>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </td>
                <td>
                    <div class="form-group collectionQuantityParent mb-0">
                        <input type="text" 
                            class="form-control input-quantity text-center"
                            name="collectionQuantity"
                            id="collectionQuantity"
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
                    <div class="form-group collectionAmountParent mb-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                                class="form-control amount text-right" 
                                name="collectionAmount"
                                id="collectionAmount"
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
                    <div class="collectionTotalAmount">${formatAmount(totalAmount, true)}</div>
                </td>
            </tr>`;
        }
        return html;
    }
    // ----- END GET ITEM ROW -----


    // ----- UPDATE TOTAL AMOUNT -----
	function updateTotalAmount() {
		const quantityArr = $.find(`[name="collectionQuantity"]`).map(element => getNonFormattedAmount(element.value) || "0");
		const unitCostArr = $.find(`[name="collectionAmount"]`).map(element => getNonFormattedAmount(element.value) || "0");
		const totalAmount = quantityArr.map((qty, index) => +qty * +unitCostArr[index]).reduce((a,b) => a + b, 0);
		$(`#collectionSubtotal`).text(formatAmount(totalAmount, true));

        const isChecked = $(`#collectionVat`).prop("checked");
        const vatAmount = isChecked ? (totalAmount * 0.12) : 0;
        $("#collectionVatAmount").text(formatAmount(vatAmount, true));

        const grandTotal = totalAmount - vatAmount;
        $("#collectionGrandTotal").text(formatAmount(grandTotal, true));
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


    // ----- SELECT TERM PAYMENT -----
    $(document).on("change", `[name="termPayment"]`, function() {
        const termPayment   = $(this).val();
        const billingID     = $(this).attr("billingID");
        const billingItemID = $(this).attr("billingItemID");

        $amount = $(`[name="amount"][billingID="${billingID}"][billingItemID="${billingItemID}"]`);
        const pendingTotal = $amount.attr("max");
        if (termPayment == "Full") {
            $amount.attr("min", pendingTotal);
        } else {
            $amount.attr("min", "0.01");
        }
        $amount.trigger("keyup");
        initAmount();
    })
    // ----- END SELECT TERM PAYMENT -----


    // ----- SELECT CLIENT NAME -----
    $(document).on("change", `[name="clientID"]`, function() {
        const code          = $(`option:selected`, this).attr("clientCode");
        const contactNumber = $(`option:selected`, this).attr("clientContactNumber");
        const address       = $(`option:selected`, this).attr("clientAddress");
        $(`[name="clientCode"]`).val(code);
        $(`[name="clientAddress"]`).val(address);
        $(`[name="clientContactNumber"]`).val(contactNumber);

        let loading = `<tr class="text-center"><td colspan="9">${preloader}</td></tr>`;
        $("#activityTableBody").html(loading);
        const data = getBillingContentDisplay();
        setTimeout(() => {
            let html = data ? data : `<tr class="text-center"><td colspan="9">No data available in table.</td></tr>`;
            $("#activityTableBody").html(html);
            initSelect2();
            initAmount();
        }, 100);
    })
    // ----- END SELECT CLIENT NAME -----


    // ----- CLICK VATABLE -----
    $(document).on("change", `#collectionVat`, function() {
        updateTotalAmount();
    })
    // ----- END CLICK VATABLE -----


    // ----- KEYUP QUANTITY OR AMOUNT -----
	$(document).on("keyup", `[name="collectionQuantity"], [name="collectionAmount"]`, function() {
		const index     = $(this).closest("tr").first().attr("index");
		const quantity  = +getNonFormattedAmount($(`#collectionQuantity${index}`).val());
		const unitcost  = +getNonFormattedAmount($(`#collectionAmount${index}`).val());
		const totalcost = quantity * unitcost;
		$(`#collectionTotalAmount${index}`).text(formatAmount(totalcost, true));

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
        $(`[name="collectionActivity"]`).last().focus();
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
        const collectionID = decryptString($(this).attr("id"));
        viewDocument(collectionID);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const collectionID = decryptString($(this).attr("collectionID"));
		viewDocument(collectionID, false, true);
	});
	// ----- END REVISE DOCUMENT -----


    // ----- CLICK BUTTON SUBMIT -----
    $(document).on("click", "#btnSubmit", function () {
        const collectionID      = decryptString($(this).attr("collectionID"));
        const validateInputs = validateForm("page_content");
        if (validateInputs) {
            saveBilling("submit", collectionID, pageContent);
        }
    });


    // ----- CLICK BUTTON CANCEL OR BACK -----
    $(document).on("click", "#btnBack, #btnCancel", function() {
        const collectionID = decryptString($(this).attr("collectionID"));
        const status    = $(this).attr("status");
        const revise    = $(this).attr("revise");
        if (status == "false" || status == "0" || revise == "true") {
            saveBilling("save", collectionID, pageContent);
        } else {
            pageContent();
        }
    })
    // ----- END CLICK BUTTON CANCEL OR BACK -----


    // ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const collectionID = decryptString($(this).attr("collectionID"));
		saveBilling("cancelform", collectionID, pageContent);
	});
	// ----- END CANCEL DOCUMENT -----


    // ----- GET COLLECTION INPUT DATA -----
    function getBillingInputData(id = null, method = null) {
        const getStatus = status => {
            return status == "save" ? 0 : (status == "submit" ? 1 : 2);
        }

        let activities = [];
        $(`.activityTableBody tr`).each(function() {
            const activity = $(`[name="collectionActivity"]`, this).val()?.trim();
            const quantity = getNonFormattedAmount($(`[name="collectionQuantity"]`, this).val());
            const amount   = getNonFormattedAmount($(`[name="collectionAmount"]`, this).val());
            const totalAmount = quantity * amount;
            activities.push({
                activity, quantity, amount, totalAmount
            });
        })

        let data = {
            collectionID:         id,
            collectionStatus:     getStatus(method),
            submittedAt:       method == "submit",
            employeeID:        sessionID,
            collectionReason:     $(`[name="collectionReason"]`).val()?.trim(),
            clientID:          $(`[name="clientID"]`).val(),
            clientName:        $(`[name="clientID"] option:selected`).attr("clientName"),
            clientAddress:     $(`[name="clientID"] option:selected`).attr("clientAddress"),
            collectionComment:    $(`[name="collectionComment"]`).val()?.trim(),
            collectionSubtotal:   getNonFormattedAmount($(`#collectionSubtotal`).text()),
            collectionVatAmount:  getNonFormattedAmount($(`#collectionVatAmount`).text()),
            collectionGrandTotal: getNonFormattedAmount($(`#collectionGrandTotal`).text()),
            activities
        };

        return data;
    }
    // ----- END GET COLLECTION INPUT DATA -----


    // ----- CONFIRMATION -----
    const getConfirmation = method => {
        const title = "Billing";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE DRAFT`;
                swalText  = "Do you want to save your changes for this collection?";
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
                        url:         `collection_module/saveBilling`,
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