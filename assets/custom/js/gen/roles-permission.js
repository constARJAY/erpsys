$(document).ready(function() {

    // ----- PAGE CONTENT -----
    function getUserRoleContent(data) {
        // Reset the unique datas
        uniqueData = []; 

        let html = `
        <table class="table table-bordered">
            <thead class="bg-primary text-white">
                <tr>
                    <th>USER ROLE</th>
                </tr>
            </thead>
            <tbody>`;

        data.map((item, index) => {
            let unique = {
                id:       item.roleID,
                roleName: item.roleName
            };
            uniqueData.push(unique);  

            let button = item.roleID != 1 ? `<i class="icon-pencil btnEdit" roleID="${item.roleID}"></i>` : "";
            let activeMenu = index == 0 ? "active-menu" : "";
            let statusClass = item.roleStatus == 1 ? "badge-success bg-success" : "badge-danger bg-danger";

            html += `
            <tr class="${activeMenu} user-role-menu" style="height: 50px;">
                <td>
                    <div class="d-flex justify-content-between align-items-center">
                        <div style="cursor: pointer;" class="userRole" roleID="${item.roleID}">
                            <span class="badge ${statusClass} rounded-circle" style="height: 10px; width: 10px;">&nbsp;</span>
                            <span class="ml-2">${item.roleName}</span>
                        </div>
                        <div style="cursor: pointer;">
                            ${button}
                        </div>
                    </div>
                </td>
            </tr>`;
        })

        html += `
            </tbody>
        </table>`;
        return html;
    }

    function getModuleAccessContent(roleID = 1) { // Administrator
        let data = getTableData("gen_roles_permission_tbl LEFT JOIN gen_module_list_tbl USING(moduleID)", "", "roleID="+roleID);

        let html = `
        <table class="table table-bordered">
            <thead class="bg-primary text-white">
                <tr>
                    <th>MODULE ACCESS</th>
                </tr>
            </thead>
            <tbody>`;
                
        if (data.length > 0) {
            data.map((item, index) => {
                let checkbox = item.roleID != 1 ? `
                <div class="status-toggle">
                    <label class="switch">
                        <input type="checkbox" class="moduleStatus" roleID=${roleID} moduleID=${item.moduleID} ${item.permissionStatus == 1 ? "checked" : ""} moduleName="${item.moduleName}" roleName="${item.roleName}">
                        <span class="slider round"></span>
                    </label>
                </div>` : "";

                html += `
                <tr ${!checkbox && "style='height: 50px;'"}>
                    <td>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>${item.moduleName}</span>
                            ${checkbox}
                        </div>
                    </td>
                </tr>`;
            })
        } else {
            html += `
            <tr class="text-center" style="height: 50px;">
                <td>No data available in table.</td>
            </tr>`;
        }

        html += `
            </tbody>
        </table>`;
        return html;
    }

    function pageContent() {
        $("#roles_permission_content").html(preloader);
        const userRoleData = getTableData("gen_user_role_tbl");
        let html = "";
        if (userRoleData) {
            html = `
            <div class="col-md-3 col-sm-12">
                <div class="table-responsive" id="user_role_content">
                    ${getUserRoleContent(userRoleData)}
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                <div class="table-responsive" id="module_access_content">
                    ${getModuleAccessContent()}
                </div>
            </div>`;
        } else {
            html = `
            <div class="w-100 h5 text-center text-danger>
                There was an error fetching data.
            </div>`;
        }
        setTimeout(() => {
            $("#roles_permission_content").html(html);
        }, 500);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {
        let modalTitle = data ? "EDIT USER ROLE" : "ADD USER ROLE",
            roleID     = data ? (data[0].roleID     ? data[0].roleID     : "") : "",
            roleName   = data ? (data[0].roleName   ? data[0].roleName   : "") : "",
            roleStatus = data ? (data[0].roleStatus ? data[0].roleStatus : "") : "";

        $("#modalTitle").text(modalTitle);

        let button = roleID ? `
        <button 
            class="btn btn-primary px-5 p-2" 
            id="btnUpdate" 
            roleID="${roleID}">
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
                <div class="col-12">
                    <div class="form-group">
                        <label>Role Name <code>*</code></label>
                        <input type="text" class="form-control validate" data-allowcharacters="[a-z][A-Z][ ]" minlength="5" maxlength="50" required unique="${roleID}" id="input_roleName" name="roleName" value="${roleName}" autocomplete="off" title="The role">
                        <div class="invalid-feedback d-block" id="invalid-input_roleName"></div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Status</label>
                        <div class="status-toggle d-flex align-items-center">
                            <span class="mb-2">Inactive</span> &nbsp;&nbsp;
                            <label class="switch">
                                <input type="checkbox" id="input_roleStatus" name="roleStatus" ${data && roleStatus == "1" && "checked"}>
                                <span class="slider round"></span>
                            </label>
                            &nbsp;&nbsp; <span class="mb-2">Active</span>
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


    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modal_roles_permission").modal("show");
        $("#modal_roles_permission_content").html(preloader);
        const content = modalContent();
        $("#modal_roles_permission_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const roleID = $(this).attr("roleID");
        $("#modal_roles_permission").modal("show");
        $("#modal_roles_permission_content").html(preloader);

        const tableData = getTableData("gen_user_role_tbl", "*", "roleID="+roleID);
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_roles_permission_content").html(content);
                $("#btnSaveConfirmationEdit").attr("roleID", roleID);
                initAll();
            }, 500);
        }
    })
    // ----- END OPEN EDIT MODAL -----


    // ----- SAVE ADD -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_roles_permission");
        if (validate) {
            $("#modal_roles_permission").modal("hide");
            $("#confirmation-modal_add_roles_permission").modal("show");
        }
    });
    // ----- END SAVE ADD -----


    // ----- SAVE UPDATE -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_roles_permission");
        if (validate) {
            $("#modal_roles_permission").modal("hide");
            $("#confirmation-modal_edit_roles_permission").modal("show");
        }
    });
    // ----- END SAVE UPDATE -----


    // ----- SAVE CONFIRMATION ADD -----
    $(document).on("click", "#btnSaveConfirmationAdd", function() {
        /**
         * ----- FORM DATA -----
         * tableData = {} -> Objects
         */

        let roleName = $("#input_roleName").val();

        let data = getFormData("modal_roles_permission", true);
        data.tableName = "gen_user_role_tbl";
        data.feedback  = roleName;
        /**
         * ----- DATA -----
         * 1. tableName
         * 2. tableData
         * 3. feedback
         */

        const saveData = insertTableData(data, true, "success|A new role is already added!");
        if (saveData) {
            pageContent();
        }
    })
    // ----- END SAVE CONFIRMATION ADD -----


    // ----- SAVE CONFIRMATION EDIT -----
    $(document).on("click", "#btnSaveConfirmationEdit", function() {
        const roleID = $(this).attr("roleID");
        let roleName = $("#input_roleName").val();

        let data = getFormData("modal_roles_permission", true);
        data.tableName   = "gen_user_role_tbl";
        data.whereFilter = "roleID = "+roleID;
        data.feedback    = roleName;

        /**
         * ----- DATA -----
         * 1. tableName
         * 2. tableData
         * 3. whereFilter
         * 4. feedback
        */

        const saveData = updateTableData(data, true, "success|The role is already updated!");
        if (saveData) {
           pageContent();
        }
    })
    // ----- END SAVE CONFIRMATION EDIT -----


    // ----- CHANGE MODULE ACCESS STATUS -----
    $(document).on("click", ".moduleStatus", function() {
        const roleID     = $(this).attr("roleID");
        const roleName   = $(this).attr("roleName");
        const moduleID   = $(this).attr("moduleID");
        const moduleName = $(this).attr("moduleName");
        const status     = $(this).prop("checked") ? 1 : 0;
        const data = {
            tableName: "gen_roles_permission_tbl",
            tableData: {
                permissionStatus: status
            },
            whereFilter: `roleID=${roleID} AND moduleID=${moduleID}`,
            feedback: moduleName
        }
        const feedback = status == 1 ? `success|${roleName} - ${moduleName} has been enabled.` : `warning|${roleName} - ${moduleName} has been disabled.`;
        const saveData = updateTableData(data, true, feedback);
        if (saveData) {
            // pageContent();
        }
    })
    // ----- END CHANGE MODULE ACCESS STATUS -----


    // ----- CLOSE CONFIRMATION -----
    $(document).on("click", ".btnCloseConfirmationAdd, .btnCloseConfirmationEdit", function() {
        $("#confirmation-modal_add_roles_permission, #confirmation-modal_edit_roles_permission").modal("hide");
        $("#modal_roles_permission").modal("show");
    })
    // ----- END CLOSE CONFIRMATION -----


    // ----- SELECT USER ROLE -----
    $(document).on("click", ".userRole", function() {
        const roleID = $(this).attr("roleID");
        $("#user_role_content").find(".active-menu").removeClass("active-menu");
        $("#user_role_content").find(`[roleid=${roleID}]`).parent().parent().parent().addClass("active-menu");
        const moduleData = getModuleAccessContent(roleID);
        $("#module_access_content").html(preloader);
        setTimeout(() => {
            $("#module_access_content").html(moduleData);
        }, 500);
    })
    // ----- END SELECT USER ROLE -----

})