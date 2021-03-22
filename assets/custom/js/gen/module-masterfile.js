$(document).ready(function() {

    // ----- DATATABLES -----
    function moduleHeaderDatatables() {
        if ($.fn.DataTable.isDataTable("#tableModuleHeaderTable")) {
			$("#tableModuleHeaderTable").DataTable().destroy();
		}

		var table = $("#tableModuleHeaderTable")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: "80px" },
					{ targets: 1, width: "100%" },
					{ targets: 2, width: "80px" },
					{ targets: 3, width: "80px" },
				],
			});
    }


    function moduleCategoryDatatables() {
        if ($.fn.DataTable.isDataTable("#tableModuleCategoryTable")) {
			$("#tableModuleCategoryTable").DataTable().destroy();
		}

		var table = $("#tableModuleCategoryTable")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: "80px" },
					{ targets: 1, width: "50%" },
					{ targets: 2, width: "50%" },
					{ targets: 3, width: "80px" },
					{ targets: 4, width: "80px" },
				],
			});
    }


    function moduleListDatatables() {
        if ($.fn.DataTable.isDataTable("#tableModuleListTable")) {
			$("#tableModuleListTable").DataTable().destroy();
		}

		var table = $("#tableModuleListTable")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: "80px" },
					{ targets: 1, width: "150px" },
					{ targets: 2, width: "150px" },
					{ targets: 3, width: "150px" },
					{ targets: 4, width: "200px" },
					{ targets: 5, width: "150px" },
					{ targets: 6, width: "150px" },
					{ targets: 7, width: "80px" },
					{ targets: 8, width: "80px" },
				],
			});
    }


    function initDataTables() {
		moduleHeaderDatatables();
        moduleCategoryDatatables();
        moduleListDatatables();
	}
    // ----- END DATATABLES -----


    // ----- MODULE HEADER CONTENT -----
    function moduleHeader() {
        uniqueData = [];

        const data = getTableData("gen_module_header_tbl");
        let html = "";
        if (data) {
            html += `
            <table class="table table-striped" id="tableModuleHeaderTable">
                <thead class="text-center">
                    <tr>
                        <th>Order</th>
                        <th>Module Header</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

            data.map((item, index) => {
                let unique = {
                    id: item.moduleHeaderID,
                    moduleHeaderName: item.moduleHeaderName
                };
                uniqueData.push(unique);

                let status = item.moduleHeaderStatus == 1 ? `
                <span class="badge badge-success w-100">Active</span>` : `
                <span class="badge badge-danger w-100">Inctive</span>`;

                html += `
                <tr class="text-center">
                    <td>${item.moduleHeaderOrder}</td>
                    <td>${item.moduleHeaderName}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-primary px-5 w-100 btnEdit" id="${item.moduleHeaderID}" moduletype="header">Edit</button>
                    </td>
                </tr>`;
            })

            html += `
                </tbody>
            </table>`;
        }
        return html;
    }
    // ----- END MODULE HEADER CONTENT -----


    // ----- MODULE CATEGORY CONTENT -----
    function moduleCategory() {
        uniqueData = [];

        const data = getTableData("gen_module_category_tbl LEFT JOIN gen_module_header_tbl USING(moduleHeaderID)");
        let html = "";
        if (data) {
            html += `
            <table class="table table-striped" id="tableModuleCategoryTable">
                <thead class="text-center">
                    <tr>
                        <th>Order</th>
                        <th>Module Header</th>
                        <th>Module Category</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

            data.map((item, index) => {
                let unique = {
                    id: item.moduleCategoryID,
                    multiple: {
                        moduleHeaderID:     item.moduleHeaderID,
                        moduleCategoryName: item.moduleCategoryName,
                    }
                }
                uniqueData.push(unique);
                
                let status = item.moduleCategoryStatus == 1 ? `
                <span class="badge badge-success w-100">Active</span>` : `
                <span class="badge badge-danger w-100">Inactive</span>`;

                html += `
                <tr class="text-center">
                    <td>${item.moduleCategoryOrder}</td>
                    <td>${item.moduleHeaderName}</td>
                    <td>${item.moduleCategoryName}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-primary px-5 w-100 btnEdit" id="${item.moduleCategoryID}" moduletype="category">Edit</button>
                    </td>
                </tr>`;
            })

            html += `
                </tbody>
            </table>`;
        }
        return html;
    }
    // ----- END MODULE CATEGORY CONTENT -----


    // ----- MODULE CATEGORY CONTENT -----
    function moduleList() {
        uniqueData = [];

        const data = getTableData("gen_module_list_tbl AS gmlt LEFT JOIN gen_module_header_tbl USING(moduleHeaderID)", "*, (SELECT moduleCategoryName FROM gen_module_category_tbl WHERE moduleCategoryID = gmlt.moduleCategoryID) AS moduleCategoryName");
        let html = "";
        if (data) {
            html += `
            <table class="table table-striped" id="tableModuleListTable">
                <thead class="text-center">
                    <tr>
                        <th>Order</th>
                        <th>Module Header</th>
                        <th>Module Category</th>
                        <th>Module Name</th>
                        <th>Project Name</th>
                        <th>Module Approver</th>
                        <th>Module Controller</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

            data.map((item, index) => {
                let unique = {
                    id: item.moduleID,
                    multiple: {
                        moduleHeaderID:   item.moduleHeaderID,
                        moduleCategoryID: item.moduleCategoryID,
                        moduleName:       item.moduleName,
                    }
                }
                uniqueData.push(unique);

                let projectName = item.projectName.replaceAll("|", "<br>");

                let status = item.moduleStatus == 1 ? `
                <span class="badge badge-success w-100">Active</span>` : `
                <span class="badge badge-danger w-100">Inactive</span>`;

                html += `
                <tr class="text-center">
                    <td>${item.moduleOrder}</td>
                    <td>${item.moduleHeaderName}</td>
                    <td>${item.moduleCategoryName ? item.moduleCategoryName : "-"}</td>
                    <td>${item.moduleName}</td>
                    <td>${projectName}</td>
                    <td>${item.moduleApprover}</td>
                    <td>${item.moduleController}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn btn-primary px-5 w-100 btnEdit" id="${item.moduleID}" moduletype="list">Edit</button>
                    </td>
                </tr>`;
            })

            html += `
                </tbody>
            </table>`;
        }
        return html;
    }
    // ----- END MODULE CATEGORY CONTENT -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        let html = `
        <div class="row w-100">
            <div class="col-md-12 col-sm-12 my-2">
                <div class="border p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="font-weight-bolder align-self-start">MODULE HEADER</span>
                        <button class="btn btn-primary px-5 float-right btnAdd" moduletype="header">Add Header</button>
                    </div>
                    <div class="table-responsive" id="tableModuleHeader">${moduleHeader()}</div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 my-2">
                <div class="border p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="font-weight-bolder align-self-start">MODULE CATEGORY</span>
                        <button class="btn btn-primary px-5 float-right btnAdd" moduletype="category">Add Category</button>
                    </div>
                    <div class="table-responsive" id="tableModuleCategory">${moduleCategory()}</div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 my-2">
                <div class="border p-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="font-weight-bolder align-self-start">MODULE LIST</span>
                        <button class="btn btn-primary px-5 float-right btnAdd" moduletype="list">Add Module</button>
                    </div>
                    <div class="table-responsive" id="tableModuleList">${moduleList()}</div>
                </div>
            </div>
        </div>`;
        $("#page_content").html(html);
        initDataTables();
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalTitle(moduleType = "header", method = "add") {
        switch(moduleType) {
            case "header":   return method == "add" ? "ADD MODULE HEADER" : "EDIT MODULE HEADER";
            case "list":     return method == "add" ? "ADD MODULE" : "EDIT MODULE";
            case "category": return method == "add" ? "ADD MODULE CATEGORY" : "EDIT MODULE CATEGORY";
        }
    }

    function getModuleHeaderOptions(moduleHeaderID = 0) {
        let getModuleHeader = getTableData("gen_module_header_tbl", "*", "moduleHeaderStatus = 1");
        let moduleHeaderOptions = `<option ${moduleHeaderID == 0 && "selected"} disabled>Select Module Header</option>`;
        getModuleHeader.map(item => {
            moduleHeaderOptions += `<option value="${item.moduleHeaderID}" ${item.moduleHeaderID == moduleHeaderID && "selected"}>${item.moduleHeaderName}</option>`;
        })
        return moduleHeaderOptions;
    }

    function getModuleCategoryOptions(moduleHeaderID = 0, moduleCategoryID = false) {
        let moduleCategoryOptions = `<option value="" ${!moduleCategoryID && "selected"}>Select Module Category</option>`;
        if (moduleHeaderID != 0) {
            let getModuleCategory = getTableData("gen_module_category_tbl", "*", "moduleHeaderID="+moduleHeaderID);
            getModuleCategory.map(item => {
                moduleCategoryOptions += `<option value="${item.moduleCategoryID}" ${item.moduleCategoryID == moduleCategoryID && "selected"}>${item.moduleCategoryName}</option>`;
            })
        }
        return moduleCategoryOptions;
    }

    function getContent(moduleType = "header", data) {
        let html = '';

        if (moduleType == "list") {
            const moduleID         = data ? (data[0].moduleID ? data[0].moduleID : "") : "";
            const moduleHeaderID   = data ? (data[0].moduleHeaderID ? data[0].moduleHeaderID : "") : "";
            const moduleCategoryID = data ? (data[0].moduleCategoryID ? data[0].moduleCategoryID : "") : "";
            const projectName      = data ? (data[0].projectName ? data[0].projectName.split("|") : []) : [];
            const moduleName       = data ? (data[0].moduleName ? data[0].moduleName : "") : "";
            const moduleApprover   = data ? (data[0].moduleApprover ? data[0].moduleApprover : "1") : "1";
            const moduleController = data ? (data[0].moduleController ? data[0].moduleController : "") : "";
            const moduleOrder      = data ? (data[0].moduleOrder ? data[0].moduleOrder : "1") : "1";
            const moduleStatus     = data ? (data[0].moduleStatus == 1 ? "checked" : "") : "";

            let button = data ? `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnUpdate"
                moduletype="${moduleType}"
                module="${moduleID}">
                UPDATE
            </button>` : `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnSave"
                moduletype="${moduleType}">
                SAVE
            </button>`;

            html += `
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Header <code>*</code></label>
                            <select 
                                class="form-control validate select2" 
                                id="input_moduleHeader" 
                                name="moduleHeaderID"
                                required
                                unique="${moduleID}">
                                ${getModuleHeaderOptions(moduleHeaderID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleHeader"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Category</label>
                            <select 
                                class="form-control validate select2" 
                                id="input_moduleCategory" 
                                name="moduleCategoryID"
                                unique="${moduleID}">
                                ${getModuleCategoryOptions(moduleHeaderID, moduleCategoryID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleCategory"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Project Name <code>*</code></label>
                            <select class="form-control validate select2" multiple="multiple" name="projectName" id="input_projectName" style="width: 100%;" required>
                                <option disabled>Select Project Name</option>
                                <option value="Human Resources Information System" ${projectName.includes("Human Resources Information System") && "selected"}>Human Resources Information System</option>
                                <option value="Project Management System" ${projectName.includes("Project Management System") && "selected"}>Project Management System</option>
                                <option value="Inventory Management System" ${projectName.includes("Inventory Management System") && "selected"}>Inventory Management System</option>
                                <option value="Finance Management System" ${projectName.includes("Finance Management System") && "selected"}>Finance Management System</option>
                            </select>
                            <div class="d-block invalid-feedback" id="invalid-input_projectName"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Name <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleName"
                                id="input_moduleName"
                                data-allowcharacters="[a-z][A-Z][ ][-]"
                                minlength="2"
                                maxlength="50"
                                unique="${moduleID}"
                                value="${moduleName}"
                                autocomplete="off"
                                title="Module Name"
                                required>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleName"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Approver <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate number" 
                                name="moduleApprover"
                                id="input_moduleApprover"
                                data-allowcharacters="[0-9]"
                                min="0"
                                max="999"
                                minlength="1"
                                maxlength="2"
                                required
                                value="${moduleApprover}">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleApprover"></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Module Controller <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleController"
                                id="input_moduleController"
                                data-allowcharacters="[a-z][A-Z][_][-][/]"
                                minlength="2"
                                maxlength="30"
                                required
                                value="${moduleController}">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleController"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Icon</label>
                            <input 
                                type="file"
                                class="form-control validate" 
                                name="moduleIcon|icons"
                                id="input_moduleIcon">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleIcon"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Module Order <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleOrder"
                                id="input_moduleOrder"
                                data-allowcharacters="[0-9]"
                                minlength="1"
                                maxlength="2"
                                required
                                value="${moduleOrder}">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleOrder"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status</label>
                            <div class="status-toggle d-flex justify-content-start align-items-center">
                                <span>Inactive &nbsp;&nbsp;</span>
                                <label class="switch">
                                    <input 
                                        type="checkbox" 
                                        name="moduleStatus" 
                                        id="input_status" ${moduleStatus}>
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
        } else if (moduleType == "category") {
            moduleCategory();
            
            const moduleCategoryID     = data ? (data[0].moduleCategoryID ? data[0].moduleCategoryID : "") : "";
            const moduleHeaderID       = data ? (data[0].moduleHeaderID ? data[0].moduleHeaderID : "") : "";
            const moduleCategoryName   = data ? (data[0].moduleCategoryName ? data[0].moduleCategoryName : "") : "";
            const moduleCategoryOrder  = data ? (data[0].moduleCategoryOrder ? data[0].moduleCategoryOrder : "1") : "1";
            const moduleCategoryStatus = data ? (data[0].moduleCategoryStatus == 1 ? "checked" : "") : "";

            let button = data ? `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnUpdate"
                moduletype="${moduleType}"
                module="${moduleCategoryID}">
                UPDATE
            </button>` : `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnSave"
                moduletype="${moduleType}">
                SAVE
            </button>`;

            html += `
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Header <code>*</code></label>
                            <select 
                                class="form-control validate select2" 
                                id="input_moduleHeader" 
                                name="moduleHeaderID"
                                required
                                unique="${moduleCategoryID}">
                                ${getModuleHeaderOptions(moduleHeaderID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleHeader"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Category Name <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleCategoryName"
                                id="input_moduleCategory"
                                data-allowcharacters="[a-z][A-Z][ ][-]"
                                minlength="2"
                                maxlength="50"
                                required
                                unique="${moduleCategoryID}"
                                autocomplete="off"
                                title="Module Category"
                                value="${moduleCategoryName}">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleCategory"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Category Icon</label>
                            <input 
                                type="file"
                                class="form-control validate" 
                                name="moduleCategoryIcon|icons"
                                id="input_moduleCategoryIcon">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleCategoryIcon"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Module Category Order <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleCategoryOrder"
                                id="input_moduleCategoryOrder"
                                value="${moduleCategoryOrder}"
                                data-allowcharacters="[0-9]"
                                minlength="0"
                                maxlength="2"
                                required>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleCategoryOrder"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status</label>
                            <div class="status-toggle d-flex justify-content-start align-items-center">
                                <span>Inactive &nbsp;&nbsp;</span>
                                <label class="switch">
                                    <input 
                                        type="checkbox" 
                                        name="moduleCategoryStatus" 
                                        id="input_status" ${moduleCategoryStatus}>
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
        } else {
            moduleHeader();

            const moduleHeaderID     = data ? (data[0].moduleHeaderID ? data[0].moduleHeaderID : "") : "";
            const moduleHeaderName   = data ? (data[0].moduleHeaderName ? data[0].moduleHeaderName : "") : "";
            const moduleHeaderOrder  = data ? (data[0].moduleHeaderOrder ? data[0].moduleHeaderOrder : "1") : "1";
            const moduleHeaderStatus = data ? (data[0].moduleHeaderStatus == 1 ? "checked" : "") : "";

            let button = data ? `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnUpdate"
                moduletype="${moduleType}"
                module="${moduleHeaderID}">
                UPDATE
            </button>` : `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnSave"
                moduletype="${moduleType}">
                SAVE
            </button>`;

            html += `
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Header <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleHeaderName"
                                id="input_moduleHeaderName"
                                data-allowcharacters="[a-z][A-Z][ ][-]"
                                minlength="2"
                                maxlength="20"
                                required
                                unique="${moduleHeaderID}"
                                title="Module Header"
                                autocomplete="off"
                                value="${moduleHeaderName}">
                            <div class="invalid-feedback d-block" id="invalid-input_moduleHeaderName"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Module Header Order <code>*</code></label>
                            <input 
                                type="text"
                                class="form-control validate" 
                                name="moduleHeaderOrder"
                                id="input_moduleHeaderOrder"
                                value="${moduleHeaderOrder}"
                                data-allowcharacters="[0-9]"
                                minlength="0"
                                maxlength="2"
                                required>
                            <div class="invalid-feedback d-block" id="invalid-input_moduleHeaderOrder"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status</label>
                            <div class="status-toggle d-flex justify-content-start align-items-center">
                                <span>Inactive &nbsp;&nbsp;</span>
                                <label class="switch">
                                    <input 
                                        type="checkbox" 
                                        name="moduleHeaderStatus" 
                                        id="input_status" ${moduleHeaderStatus}>
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
        }

        return html;
    }

    function getModalContent(moduleType = "header", method = "add", data = false) {
        $("#modal_module .page-title").text(modalTitle(moduleType, method));
        $("#modal_module_content").html(getContent(moduleType, data));
        initAll();
    }
    // ----- END MODAL CONTENT -----


    // ----- ADD MODAL -----
    $(document).on("click", ".btnAdd", function() {
        $("#modal_module_content").html(preloader);
        $("#modal_module").modal("show");
        const moduleType = $(this).attr("moduletype");

        setTimeout(() => {
            getModalContent(moduleType, "add");
        }, 500);
    })
    // ----- END ADD MODAL -----


    // ----- EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const moduleType = $(this).attr("moduletype");
        const id = $(this).attr("id");

        $("#modal_module_content").html(preloader);
        $("#modal_module").modal("show");

        let data;
        if (moduleType == "header") {
            data = getTableData("gen_module_header_tbl", "*", "moduleHeaderID="+id);
        } else if (moduleType == "category") {
            data = getTableData("gen_module_category_tbl", "*", "moduleCategoryID="+id);
        } else {
            data = getTableData("gen_module_list_tbl", "*", "moduleID="+id);
        }

        setTimeout(() => {
            getModalContent(moduleType, "edit", data);
        }, 500);
    })
    // ----- END EDIT MODAL -----


    // ----- SAVE ADD -----
    $(document).on("click", "#btnSave", function() {
        const moduleType = $(this).attr("moduletype");
        $("#btnSaveConfirmationAdd").attr("moduletype", moduleType);
        const validate = validateForm("modal_module");
        if (validate) {
            $("#modal_module").modal("hide");
            $("#confirmation-modal_add_module_masterfile").modal("show");
        }
    });
    // ----- END SAVE ADD -----

    
    // ----- SAVE UPDATE -----
    $(document).on("click", "#btnUpdate", function() {
        const moduleType = $(this).attr("moduletype");
        const moduleID   = $(this).attr("module");
        $("#btnSaveConfirmationEdit").attr("moduletype", moduleType);
        $("#btnSaveConfirmationEdit").attr("module", moduleID);
        const validate = validateForm("modal_module");
        if (validate) {
            $("#modal_module").modal("hide");
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

        const moduleType = $(this).attr("moduletype");
        let data = getFormData("modal_module");

        if (moduleType == "header") {
            let feedback = $("#input_moduleHeaderName").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_header_tbl");
            data.append("feedback", feedback);

            const saveData = insertTableData(data);
            if (saveData) {
                const moduleHeaderContent = moduleHeader();
                $("#tableModuleHeader").html(moduleHeaderContent);
            }
        } else if (moduleType == "category") {
            let feedback = $("#input_moduleCategory").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_category_tbl");
            data.append("feedback", feedback);

            const saveData = insertTableData(data);
            if (saveData) {
                const moduleCategoryContent = moduleCategory();
                $("#tableModuleCategory").html(moduleCategoryContent);
            }
        } else {
            let feedback = $("#input_moduleName").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_list_tbl");
            data.append("feedback", feedback);

            const saveData = insertTableData(data);
            if (saveData) {
                const moduleListContent = moduleList();
                $("#tableModuleList").html(moduleListContent);

                addModuleRolesPermission();
            }
        }  

        initDataTables();
    })
    // ----- END SAVE CONFIRMATION ADD -----


    // ----- MODULE ROLES PERMISSION -----
    function addModuleRolesPermission() {
        let moduleID = getTableData("gen_module_list_tbl", "", "", "createdAt DESC", "", "LIMIT 1");    
            moduleID = moduleID[0]["moduleID"];

    $.ajax({
        method: "POST",
        url: `${base_url}roles_permission/addModuleRolesPermission`,
        data: {moduleID},
        dataType: "json",
        success: function(data) {}
    })
    }
    // ----- END MODULE ROLES PERMISSION -----


    // ----- SAVE CONFIRMATION ADD -----
    $(document).on("click", "#btnSaveConfirmationEdit", function() {
        /**
         * ----- FORM DATA -----
         * tableData = {} -> Objects
         */

        const moduleType = $(this).attr("moduletype");
        const moduleID   = $(this).attr("module");
        let data = getFormData("modal_module");

        if (moduleType == "header") {
            let feedback = $("#input_moduleHeaderName").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_header_tbl");
            data.append("whereFilter", "moduleHeaderID="+moduleID);
            data.append("feedback", feedback);

            const saveData = updateTableData(data);
            if (saveData) {
                const moduleHeaderContent = moduleHeader();
                $("#tableModuleHeader").html(moduleHeaderContent);
            }
        } else if (moduleType == "category") {
            let feedback = $("#input_moduleCategory").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_category_tbl");
            data.append("whereFilter", "moduleCategoryID="+moduleID);
            data.append("feedback", feedback);

            const saveData = updateTableData(data);
            if (saveData) {
                const moduleCategoryContent = moduleCategory();
                $("#tableModuleCategory").html(moduleCategoryContent);
            }
        } else {
            let feedback = $("#input_moduleName").val();
                feedback = feedback.substr(0,1).toUpperCase() + feedback.substr(1);
            data.append("tableName", "gen_module_list_tbl");
            data.append("whereFilter", "moduleID="+moduleID);
            data.append("feedback", feedback);

            const saveData = updateTableData(data);
            if (saveData) {
                const moduleListContent = moduleList();
                $("#tableModuleList").html(moduleListContent);
            }
        }  

        initDataTables();
    })
    // ----- END SAVE CONFIRMATION ADD -----


    // ----- CHANGE MODULE HEADER -----
    $(document).on("change", "[name=moduleHeaderID]", function() {
        const moduleHeaderID = $(this).val();
        const moduleCategoryOptions = getModuleCategoryOptions(moduleHeaderID);
        $("[name=moduleCategoryID]").html(moduleCategoryOptions);
    })
    // ----- END CHANGE MODULE HEADER -----


    // ----- CLOSE CONFIRMATION -----
    $(document).on("click", ".btnCloseConfirmationAdd, .btnCloseConfirmationEdit", function() {
        $("#confirmation-modal_add_module_masterfile, #confirmation-modal_edit_module_masterfile").modal("hide");
        $("#modal_module").modal("show");
    })

    $(document).on("click", ".btnCloseConfirmationDelete", function() {
        $("#confirmation-modal_delete_module_masterfile").modal("hide");
    })
    // ----- END CLOSE CONFIRMATION -----
    
});