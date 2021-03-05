<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Modules</li>
					</ul>
					<h1 class="mt-3">Modules</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="col-12">
                <div class="col-12 header p-0">
                    <ul class="header-dropdown">
                        <button type="button" class="btn btn-primary p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add Module</button>
                    </ul>
                </div>
            </div>
        </div>

		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>


<!-- ----- MODAL ----- -->
<div id="modal_module_masterfile" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitle">ADD MODULE</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_module_masterfile_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_add_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD MODULE</h2>
				<p class="text-center my-2">Are you sure you want to add this module?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationAdd"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAdd"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_edit_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationEdit" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/update.png">
				<h2 class="text-primary text-center">UPDATE MODULE</h2>
				<p class="text-center my-2">Are you sure you want to update this module?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationEdit"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationEdit"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_delete_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationDelete" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/delete.png">
				<h2 class="text-primary text-center">DELETE MODULE</h2>
				<p class="text-center my-2">Are you sure you want to delete this module?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationDelete"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationDelete"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- ----- END CONFIRMATION MODAL ----- -->


<script>

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
            const tableData = getTableData("module_list_tbl");
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

                    let status = item.moduleStatus == 1 ? 
                    `<span class="badge badge-success w-100 p-1">Active</span>` :
                    `<span class="badge badge-danger w-100 p-1">Inactive</span>`;

                    html += `
                    <tr>
                        <td>${item.projectName}</td>
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
                projectName       = data ? (data[0].projectName       ? data[0].projectName       : "") : "",
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
                            <select class="form-control validate select2" name="projectName" id="input_projectName" style="width: 100%;" required unique="${moduleID}">
                                <option selected disabled ${!data && "selected"}>Select Project Name</option>
                                <option value="Human Resources Information System" ${data && projectName == "Human Resources Information System" && "selected"}>Human Resources Information System</option>
                                <option value="Project Management System" ${data && projectName == "Project Management System" && "selected"}>Project Management System</option>
                                <option value="Inventory Management System" ${data && projectName == "Inventory Management System" && "selected"}>Inventory Management System</option>
                                <option value="Finance Management System" ${data && projectName == "Finance Management System" && "selected"}>Finance Management System</option>
                            </select>
                            <div class="d-block invalid-feedback" id="invalid-input_projectName"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Module Header <code>*</code></label>
                            <input type="text" class="form-control validate titlecase" name="moduleHeader" id="input_moduleHeader" data-allowcharacters="[a-z][A-Z][-][ ]" minlength="2" minlength="12" list="list_moduleHeader" autocomplete="off" required unique="${moduleID}" value="${moduleHeader}">
                            <datalist id="list_moduleHeader"></datalist>
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


        // ----- MODULE HEADER SUGGESTION -----
        $(document).on("focus", "#input_moduleHeader", function() {
            const projectName = $("#input_projectName").val();
            if (projectName) {
                const moduleHeaderList = getTableData("module_list_tbl", "", "projectName = '"+projectName+"' AND moduleStatus = 1", "", "moduleHeader");
                let html = "";
                moduleHeaderList.map(item => {
                    let moduleHeader = item.moduleHeader;
                    html += `<option value="${moduleHeader}">`;
                })
                $("#list_moduleHeader").html(html);
            }
        })
        // ----- END MODULE HEADER SUGGESTION -----


        // ----- MODULE HEADER SUGGESTION -----
        $(document).on("focus", "#input_moduleCategory", function() {
            const projectName  = $("#input_projectName").val();
            const moduleHeader = $("#input_moduleHeader").val();
            if (projectName && moduleHeader) {
                const moduleCategoryList = getTableData("module_list_tbl", "", "projectName = '"+projectName+"' AND moduleHeader = '"+moduleHeader+"' AND moduleStatus = 1", "", "moduleCategory");
                let html = "";
                moduleCategoryList.map(item => {
                    let moduleCategory = item.moduleCategory;
                    html += `<option value="${moduleCategory}">`;
                })
                $("#list_moduleCategory").html(html);
            }
        })
        // ----- END MODULE HEADER SUGGESTION -----


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

            const tableData = getTableData("module_list_tbl", "*", "moduleID="+id, "");
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
            data.append("tableName", "module_list_tbl");
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
            data.append("tableName", "module_list_tbl");
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
            //     tableName:   "module_list_tbl",
            //     whereFilter: "moduleID="+moduleID,
            //     feedback
            // };
            let data = new FormData();
            data.append("tableName", "module_list_tbl");
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

</script>