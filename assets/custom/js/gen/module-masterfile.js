$(document).ready(function() {

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableModuleMasterfile')){
            $('#tableModuleMasterfile').DataTable().destroy();
        }
        
        var table = $("#tableModuleMasterfile").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 200 },
                { targets: 1, width: 150 },
                { targets: 2, width: 150 },
                { targets: 3, width: 150 },
                { targets: 4, width: 100 },
                { targets: 5, width: 100 },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----


    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 

        $("#table_content").html(preloader);
        const tableData = getTableData("gen_module_list_tbl");
        if (tableData) {
            let html = `
            <table class="table table-bordered table-striped table-hover" id="tableModuleMasterfile">
                <thead>
                    <tr class="">
                        <th>Project Name</th>
                        <th>Module Header</th>
                        <th>Module Category</th>
                        <th>Module Name</th>
                        <th>Module Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

            tableData.map((item, index, array) => {
                // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                let unique = {
                    id:         item.moduleID, // Required
                    multiple: { // Optional
                        projectName:    item.projectName,
                        moduleName:     item.moduleName,
                        moduleCategory: item.moduleCategory,
                        moduleName:     item.moduleName,
                    }
                }
                uniqueData.push(unique);
                // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                let projectNames = item["projectName"].split("|").join("<br>");

                let status = item.moduleStatus == 1 ? 
                `<span class="badge badge-outline-success w-100 p-1">Active</span>` :
                `<span class="badge badge-outline-danger w-100 p-1">Inactive</span>`;

                html += `
                <tr>
                    <td>${projectNames}</td>
                    <td>${item.moduleHeader}</td>
                    <td>${item.moduleCategory ?? '-'}</td>
                    <td>${item.moduleName}</td>
                    <td>${status}</td>
                    <td class="text-center">
                        <button 
                            class="btn btn-primary btnEdit" 
                            id="${item.moduleID}">
                            EDIT
                        </button>
                        <button 
                            class="btn btn-danger btnDelete" 
                            id="${item.moduleID}" 
                            feedback="${item.moduleName}">
                            DELETE
                        </button>
                    </td>
                </tr>`;
            })
            html += `</tbody>
            </table>`;
            setTimeout(() => {
                $("#table_content").html(html);
                initDataTables();
                initAll();
            }, 500);
        } else {
            let html = `
            <div class="w-100 h5 text-center text-danger>
                There was an error fetching data.
            </div>`;
            $("#table_content").html(html);
        }
    }
    tableContent();
    // ----- END TABLE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {

        let modalTitle        = data ? "EDIT MODULE" : "ADD MODULE",
            moduleID          = data ? (data[0].moduleID          ? data[0].moduleID          : "") : "",
            projectName       = data ? (data[0].projectName       ? data[0].projectName.split("|")  : "") : "",
            moduleHeader      = data ? (data[0].moduleHeader      ? data[0].moduleHeader      : "") : "",
            moduleCategory    = data ? (data[0].moduleCategory    ? data[0].moduleCategory    : "") : "",
            moduleName        = data ? (data[0].moduleName        ? data[0].moduleName        : "") : "",
            moduleIcon        = data ? (data[0].moduleIcon        ? data[0].moduleIcon        : "") : "",
            moduleApprover    = data ? (data[0].moduleApprover    ? data[0].moduleApprover    : "") : "",
            moduleMaxApprover = data ? (data[0].moduleMaxApprover ? data[0].moduleMaxApprover : "") : "",
            maxApproverAttr   = data ? (moduleApprover != "" && moduleApprover != 0 ? "" : "disabled") : "disabled";
            moduleController  = data ? (data[0].moduleController  ? data[0].moduleController  : "") : "",
            moduleStatus      = data ? (data[0].moduleStatus      ? data[0].moduleStatus      : "") : "";

        $("#modalTitle").text(modalTitle);

        const moduleHeaderList = getTableData("gen_module_list_tbl", "", "moduleStatus = 1", "", "moduleHeader");
        let moduleHeaderOptions = "";
        moduleHeaderList.map(item => {
            let moduleHeader = item.moduleHeader;
            moduleHeaderOptions += `<option value="${moduleHeader}">`;
        })

        let button = moduleID ? `
        <button 
            class="btn btn-primary px-5 p-2" 
            id="btnUpdate" 
            moduleID="${moduleID}">
            UPDATE
        </button>` : `
        <button 
            class="btn btn-primary px-5 p-2" 
            id="btnSave">
            SAVE
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Project Name <code>*</code></label>
                        <select class="form-control validate select2" multiple="multiple" name="projectName" id="input_projectName" style="width: 100%;" required unique="${moduleID}">
                            <option disabled>Select Project Name</option>
                            <option value="Human Resources Information System" ${data && projectName.includes("Human Resources Information System") && "selected"}>Human Resources Information System</option>
                            <option value="Project Management System" ${data && projectName.includes("Project Management System") && "selected"}>Project Management System</option>
                            <option value="Inventory Management System" ${data && projectName.includes("Inventory Management System") && "selected"}>Inventory Management System</option>
                            <option value="Finance Management System" ${data && projectName.includes("Finance Management System") && "selected"}>Finance Management System</option>
                        </select>
                        <div class="d-block invalid-feedback" id="invalid-input_projectName"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Header <code>*</code></label>
                        <input type="text" class="form-control validate titlecase" name="moduleHeader" id="input_moduleHeader" data-allowcharacters="[a-z][A-Z][-][ ][,]" minlength="2" minlength="12" list="list_moduleHeader" autocomplete="off" required unique="${moduleID}" value="${moduleHeader}">
                        <datalist id="list_moduleHeader">
                            ${moduleHeaderOptions}
                        </datalist>
                        <div class="d-block invalid-feedback" id="invalid-input_moduleHeader"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Category</label>
                        <input type="text" class="form-control validate titlecase" name="moduleCategory" id="input_moduleCategory" data-allowcharacters="[a-z][A-Z][-][ ]" minlength="2" minlength="12" list="list_moduleCategory" autocomplete="off" unique="${moduleID}" value="${moduleCategory}">
                        <datalist id="list_moduleCategory"></datalist>
                        <div class="d-block invalid-feedback" id="invalid-input_moduleCategory"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Name <code>*</code></label>
                        <input type="text" class="form-control validate" name="moduleName" id="input_moduleName" data-allowcharacters="[a-z][A-Z][-][ ]" minlength="2" minlength="12" required title="Module Name" autocomplete="off" unique="${moduleID}" value="${moduleName}">
                        <div class="d-block invalid-feedback" id="invalid-input_moduleName"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Icon</label>
                        <input type="file" class="form-control validate" name="moduleIcon|icons" id="input_moduleIcon" accept=".svg,.ico,.ics,.png">
                        <div class="d-block invalid-feedback" id="invalid-input_moduleIcon"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Approver</label>
                        <div class="row">
                            <div class="col-2">
                                <input type="checkbox" class="form-control" name="moduleApprover" id="input_moduleApprover" ${data && moduleApprover == "1" && "checked"}>
                            </div>
                            <div class="col-10 pl-0">
                                <input type="text" name="moduleMaxApprover" id="input_moduleMaxApprover" placeholder="Number of Approvers" class="form-control validate number" data-allowcharacters="[0-9]" min="1" max="10" autocomplete="off" ${maxApproverAttr} value="${moduleMaxApprover}">
                            </div>
                        </div>
                        <div class="d-block invalid-feedback" id="invalid-input_moduleMaxApprover"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Module Controller <code>*</code></label>
                        <input type="text" class="form-control validate titlecase" name="moduleController" id="input_moduleController" data-allowcharacters="[A-Z][a-z][_]" autocomplete="off" required value="${moduleController}">
                        <div class="d-block invalid-feedback" id="invalid-input_moduleController"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label>Status <code>*</code></label>
                        <div class="status-toggle d-flex justify-content-start align-items-center">
                            <span>Inactive &nbsp;&nbsp;</span>
                            <label class="switch">
                                <input 
                                    type="checkbox" 
                                    name="moduleStatus" 
                                    id="input_status"
                                    ${data && moduleStatus == "1" && "checked"}>
                                <span class="slider round"></span>
                            </label>
                            <span>&nbsp;&nbsp;Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
        </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT -----


    // ----- MODULE CATEGORY SUGGESTION -----
    $(document).on("focus", "#input_moduleCategory", function() {
        const moduleHeader = $("#input_moduleHeader").val();
        if (moduleHeader) {
            const moduleCategoryList = getTableData("gen_module_list_tbl", "", "moduleHeader = '"+moduleHeader+"' AND moduleStatus = 1", "", "moduleCategory");
            let html = "";
            moduleCategoryList.map(item => {
                let moduleCategory = item.moduleCategory;
                html += `<option value="${moduleCategory}">`;
            })
            $("#list_moduleCategory").html(html);
        }
    })
    // ----- END MODULE CATEGORY SUGGESTION -----


    // ----- CHECK MODULE APPROVER -----
    $(document).on("click", "#input_moduleApprover", function(e) {
        if (this.checked) {
            $('#input_moduleMaxApprover').prop('disabled', false);
            $("#input_moduleMaxApprover").prop("required", true);
        } else {
            $('#input_moduleMaxApprover').prop('disabled', true);
            $("#input_moduleMaxApprover").prop("required", false);
            clearInputValidation("input_moduleMaxApprover");
        }
    })
    // ----- END CHECK MODULE APPROVER -----


    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modal_module_masterfile").modal("show");
        $("#modal_module_masterfile_content").html(preloader);
        const content = modalContent();
        $("#modal_module_masterfile_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id = $(this).attr("id");
        $("#modal_module_masterfile").modal("show");
        $("#modal_module_masterfile_content").html(preloader);

        const tableData = getTableData("gen_module_list_tbl", "*", "moduleID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_module_masterfile_content").html(content);
                $("#btnSaveConfirmationEdit").attr("moduleid", id);
                initAll();
            }, 500);
        }
    })
    // ----- END OPEN EDIT MODAL -----


    // ----- SAVE ADD -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_module_masterfile");
        if (validate) {
            $("#modal_module_masterfile").modal("hide");
            $("#confirmation-modal_add_module_masterfile").modal("show");
        }
    });
    // ----- END SAVE ADD -----


    // ---- OPEN DELETE MODAL -----
    $(document).on("click", ".btnDelete", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#btnSaveConfirmationDelete").attr("moduleid", id);
        $("#btnSaveConfirmationDelete").attr("feedback", feedback);
        $("#confirmation-modal_delete_module_masterfile").modal("show");
    });
    // ---- END OPEN DELETE MODAL -----


    // ----- SAVE UPDATE -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_module_masterfile");
        if (validate) {
            $("#modal_module_masterfile").modal("hide");
            $("#confirmation-modal_edit_module_masterfile").modal("show");
        }
    });
    // ----- END SAVE UPDATE -----


    // ----- SAVE CONFIRMATION ADD -----
    $(document).on("click", "#btnSaveConfirmationAdd", function() {
        /**
         * ----- FORM DATA -----
         * tableData = {} -> Objects
         */

        let moduleName = $("#input_moduleName").val();
            moduleName = moduleName.substr(0,1).toUpperCase() + moduleName.substr(1);

        let data = getFormData("modal_module_masterfile");
        data.append("tableName", "gen_module_list_tbl");
        data.append("feedback", moduleName);
        /**
         * ----- DATA -----
         * 1. tableName
         * 2. tableData
         * 3. feedback
         */

        const saveData = insertTableData(data);
        if (saveData) {
        //    tableContent();
            window.location.reload();
        }
    })
    // ----- END SAVE CONFIRMATION ADD -----


    // ----- SAVE CONFIRMATION EDIT -----
    $(document).on("click", "#btnSaveConfirmationEdit", function() {
        const moduleID = $(this).attr("moduleid");
        let moduleName = $("#input_moduleName").val();
            moduleName = moduleName.substr(0,1).toUpperCase() + moduleName.substr(1);

        let data = getFormData("modal_module_masterfile_content");
        data.append("tableName", "gen_module_list_tbl");
        data.append("whereFilter", "moduleID="+moduleID);
        data.append("feedback", moduleName);

        /**
         * ----- DATA -----
         * 1. tableName
         * 2. tableData
         * 3. whereFilter
         * 4. feedback
        */

        const saveData = updateTableData(data);
        if (saveData) {
        //    tableContent();
            window.location.reload();
        }
    })
    // ----- END SAVE CONFIRMATION EDIT -----


    // ----- SAVE CONFIRMATION DELETE -----
    $(document).on("click", "#btnSaveConfirmationDelete", function() {
        const moduleID = $(this).attr("moduleid");
        const feedback = $(this).attr("feedback");

        /**
         * ----- DATA -----
         * 1. tableName
         * 2. whereFilter
         * 3. feedback
        */

        // const data = {
        //     tableName:   "gen_module_list_tbl",
        //     whereFilter: "moduleID="+moduleID,
        //     feedback
        // };
        let data = new FormData();
        data.append("tableName", "gen_module_list_tbl");
        data.append("whereFilter", "moduleID="+moduleID);
        data.append("feedback", feedback);

        const saveData = deleteTableData(data);
        if (saveData) {
        //    tableContent();
            window.location.reload();
        }
    })
    // ----- END SAVE CONFIRMATION DELETE -----


    // ----- CLOSE CONFIRMATION -----
    $(document).on("click", ".btnCloseConfirmationAdd, .btnCloseConfirmationEdit", function() {
        $("#confirmation-modal_add_module_masterfile, #confirmation-modal_edit_module_masterfile").modal("hide");
        $("#modal_module_masterfile").modal("show");
    })

    $(document).on("click", ".btnCloseConfirmationDelete", function() {
        $("#confirmation-modal_delete_module_masterfile").modal("hide");
    })
    // ----- END CLOSE CONFIRMATION -----

});