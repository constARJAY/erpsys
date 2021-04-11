$(document).ready(function () {
	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableModuleAccess")) {
			$("#tableModuleAccess").DataTable().destroy();
		}

		var table = $("#tableModuleAccess")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				ordering: false,
				lengthMenu: [
					[50, 100, 150, 200, -1],
					[50, 100, 150, 200, "All"],
				],
				columnDefs: [{ targets: 0, width: "100%" }],
			});
	}
	// ----- END DATATABLES -----

	// ----- PAGE CONTENT -----
	function getUserRoleContent(data) {
		// Reset the unique datas
		uniqueData = [];

		let html = `
        <table class="table table-bordered">
            <thead class="bg-primary text-white">
                <tr>
                    <th>USER DESIGNATION</th>
                </tr>
            </thead>
            <tbody>`;

		data.map((item, index) => {
			let unique = {
				id: item.designationID,
				designationName: item.designationName,
			};
			uniqueData.push(unique);

			let button =
				item.designationID != 1
					? `<i class="icon-pencil btnEdit" roleID="${item.designationID}"></i>`
					: "";
			let activeMenu = index == 0 ? "active-menu" : "";
			let statusClass =
				item.designationStatus == 1
					? "badge-success bg-success"
					: "badge-danger bg-danger";

			html += `
            <tr class="${activeMenu} user-role-menu userRole" style="height: 50px;" roleID="${item.designationID}">
                <td style="cursor: pointer;">
                    <div class="ml-1">
                        <span class="badge ${statusClass} rounded-circle" style="height: 10px; width: 10px;">&nbsp;</span>
                        <span class="ml-2 name">${item.designationName}</span>
                    </div>
                </td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;
		return html;
	}

	function getModuleAccessContent(
		roleID = 1,
		roleName = "Administrator",
		projectName = "All"
	) {
		let data;
		if (projectName == "All") {
			data = getTableData(
				"gen_roles_permission_tbl LEFT JOIN gen_module_list_tbl USING(moduleID)",
				"",
				"designationID=" + roleID
			);
		} else {
			data = getTableData(
				`gen_roles_permission_tbl AS grpt 
                LEFT JOIN gen_module_list_tbl AS gmlt USING(moduleID)`,
				"",
				`grpt.designationID=${roleID} AND FIND_IN_SET('${projectName}', REPLACE(gmlt.projectName, '|', ','))`
			);
		}

		let html = `
        <table class="table table-bordered table-hover" id="tableModuleAccess">
            <thead class="bg-primary text-white">
                <tr>
                    <th>MODULE ACCESS</th>
                </tr>
            </thead>
            <tbody>`;

		if (data.length > 0) {
			data.map((item, index) => {
				let checkbox =
					item.roleID != 1
						? `
                <div class="status-toggle">
                    <label class="switch">
                        <input type="checkbox" class="moduleStatus" roleID=${roleID} moduleID=${
								item.moduleID
						  } ${item.permissionStatus == 1 ? "checked" : ""} moduleName="${
								item.moduleName
						  }" roleName="${roleName}">
                        <span class="slider round"></span>
                    </label>
                </div>`
						: "";

				html += `
                <tr ${!checkbox && "style='height: 50px;'"}>
                    <td>
                        <div class="d-flex justify-content-between align-items-center">
                            <span>${item.moduleName}</span>
                            ${checkbox}
                        </div>
                    </td>
                </tr>`;
			});
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
		const userRoleData = getTableData("hris_designation_tbl");
		let html = "";
		if (userRoleData) {
			html = `
            <div class="col-md-3 col-sm-12">
                <div class="table-responsive" id="user_role_content">
                    ${getUserRoleContent(userRoleData)}
                </div>
            </div>
            <div class="col-md-9 col-sm-12">

                <div class="row">
                    <div class="col-md-6 col-sm-12 mb-4">
                        <select class="form-control select2" id="projectName" roleID="1" roleName="Administrator">
                            <option value="All" selected>All</option>
                            <option value="Inventory Management System">Inventory Management System</option>
                            <option value="Project Management System">Project Management System</option>
                            <option value="Finance Management System">Finance Management System</option>
                            <option value="Human Resource Information System">Human Resource Information System</option>
                        </select>
                    </div>
                </div>
                
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
			initDataTables();
			initAll();
		}, 500);
	}
	pageContent();
	// ----- END PAGE CONTENT -----

	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let modalTitle = data ? "EDIT USER ROLE" : "ADD USER ROLE",
			roleID = data ? (data[0].roleID ? data[0].roleID : "") : "",
			roleName = data ? (data[0].roleName ? data[0].roleName : "") : "",
			roleStatus = data ? (data[0].roleStatus ? data[0].roleStatus : "") : "";

		$("#modalTitle").text(modalTitle);

		let button = roleID
			? `
        <button class="btn btn-update" id="btnUpdate" roleID="${roleID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

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
                                <input type="checkbox" id="input_roleStatus" name="roleStatus" ${
																	data && roleStatus == "1" && "checked"
																}>
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
            <button class="btn btn-cancel btnCancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
		return html;
	}
	// ----- END MODAL CONTENT -----

	// ----- CHANGE PROJECT NAME -----
	$(document).on("change", "#projectName", function () {
		const roleID = $(this).attr("roleID");
		const roleName = $(this).attr("roleName");
		const projectName = $(this).val();

		const moduleData = getModuleAccessContent(roleID, roleName, projectName);
		$("#module_access_content").html(preloader);
		setTimeout(() => {
			$("#module_access_content").html(moduleData);
			initDataTables();
		}, 500);
	});
	// ----- END CHANGE PROJECT NAME -----

	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_roles_permission").modal("show");
		$("#modal_roles_permission_content").html(preloader);
		const content = modalContent();
		$("#modal_roles_permission_content").html(content);
		initAll();
	});
	// ----- END OPEN ADD MODAL -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const roleID = $(this).attr("roleID");
		$("#modal_roles_permission").modal("show");
		$("#modal_roles_permission_content").html(preloader);

		const tableData = getTableData(
			"gen_user_role_tbl",
			"*",
			"roleID=" + roleID
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_roles_permission_content").html(content);
				$("#btnSaveConfirmationEdit").attr("roleID", roleID);
				initAll();
			}, 500);
		}
	});
	// ----- END OPEN EDIT MODAL -----

	// ----- SAVE ADD -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_roles_permission");
		if (validate) {
			// $("#modal_roles_permission").modal("hide");
			// $("#confirmation-modal_add_roles_permission").modal("show");

			let data = getFormData("modal_roles_permission", true);
			data.tableName = "gen_user_role_tbl";
			data.feedback = $("#input_roleName").val();

			sweetAlertConfirmation(
				"add",
				"Role",
				"modal_roles_permission",
				null,
				data,
				true,
				pageContent
			);
		}
	});
	// ----- END SAVE ADD -----

	// ----- SAVE UPDATE -----
	$(document).on("click", "#btnUpdate", function () {
		const validate = validateForm("modal_roles_permission");
		if (validate) {
			// $("#modal_roles_permission").modal("hide");
			// $("#confirmation-modal_edit_roles_permission").modal("show");

			const roleID = $(this).attr("roleID");
			let roleName = $("#input_roleName").val();

			let data = getFormData("modal_roles_permission", true);
			data.tableName = "gen_user_role_tbl";
			data.whereFilter = "designationID = " + roleID;
			data.feedback = roleName;

			sweetAlertConfirmation(
				"update",
				"Role",
				"modal_roles_permission",
				null,
				data,
				true,
				pageContent
			);
		}
	});
	// ----- END SAVE UPDATE -----

	// ----- SAVE CONFIRMATION ADD -----
	$(document).on("click", "#btnSaveConfirmationAdd", function () {
		/**
		 * ----- FORM DATA -----
		 * tableData = {} -> Objects
		 */

		let roleName = $("#input_roleName").val();

		let data = getFormData("modal_roles_permission", true);
		data.tableName = "gen_user_role_tbl";
		data.feedback = roleName;
		/**
		 * ----- DATA -----
		 * 1. tableName
		 * 2. tableData
		 * 3. feedback
		 */

		const saveData = insertTableDatav1(
			data,
			true,
			"success|A new role is already added!"
		);
		if (saveData) {
			pageContent();
		}
	});
	// ----- END SAVE CONFIRMATION ADD -----

	// ----- SAVE CONFIRMATION EDIT -----
	$(document).on("click", "#btnSaveConfirmationEdit", function () {
		const roleID = $(this).attr("roleID");
		let roleName = $("#input_roleName").val();

		let data = getFormData("modal_roles_permission", true);
		data.tableName = "gen_user_role_tbl";
		data.whereFilter = "roleID = " + roleID;
		data.feedback = roleName;

		/**
		 * ----- DATA -----
		 * 1. tableName
		 * 2. tableData
		 * 3. whereFilter
		 * 4. feedback
		 */

		const saveData = updateTableDatav1(
			data,
			true,
			"success|The role is already updated!"
		);
		if (saveData) {
			pageContent();
		}
	});
	// ----- END SAVE CONFIRMATION EDIT -----

	// ----- CHANGE MODULE ACCESS STATUS -----
	$(document).on("click", ".moduleStatus", function () {
		const roleID = $(this).attr("roleID");
		const roleName = $(this).attr("roleName");
		const moduleID = $(this).attr("moduleID");
		const moduleName = $(this).attr("moduleName");
		const status = $(this).prop("checked") ? 1 : 0;
		const data = {
			tableName: "gen_roles_permission_tbl",
			tableData: {
				permissionStatus: status,
			},
			whereFilter: `designationID=${roleID} AND moduleID=${moduleID}`,
			feedback: moduleName,
		};
		const feedback =
			status == 1
				? `success|${roleName} - ${moduleName} has been enabled.`
				: `warning|${roleName} - ${moduleName} has been disabled.`;
		const saveData = updateTableDatav1(data, true, feedback);
		if (saveData) {
			// pageContent();
		}
	});
	// ----- END CHANGE MODULE ACCESS STATUS -----

	// ----- CLOSE CONFIRMATION -----
	$(document).on(
		"click",
		".btnCloseConfirmationAdd, .btnCloseConfirmationEdit",
		function () {
			$(
				"#confirmation-modal_add_roles_permission, #confirmation-modal_edit_roles_permission"
			).modal("hide");
			$("#modal_roles_permission").modal("show");
		}
	);
	// ----- END CLOSE CONFIRMATION -----

	// ----- SELECT USER ROLE -----
	$(document).on("click", ".userRole", function () {
		const roleID = $(this).attr("roleID");
		const roleName = $(`[roleID=${roleID}]`).find(".name").text();
		$("#user_role_content").find(".active-menu").removeClass("active-menu");
		$("#user_role_content").find(`[roleID=${roleID}]`).addClass("active-menu");
		const projectName = $("#projectName").val();
		$("#projectName").attr("roleID", roleID);
		$("#projectName").attr("roleName", roleName);
		const moduleData = getModuleAccessContent(roleID, roleName, projectName);
		$("#module_access_content").html(preloader);
		setTimeout(() => {
			$("#module_access_content").html(moduleData);
			initDataTables();
		}, 500);
	});
	// ----- END SELECT USER ROLE -----

	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_roles_permission");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Role", "modal_roles_permission");
		} else {
			$("#modal_roles_permission").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------
});
