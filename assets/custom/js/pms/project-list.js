$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(11);

	// ---- GET EMPLOYEE DATA -----
	const employeeData = (id) => {
		const allEmployeeData = getAllEmployeeData(id);
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


	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableProjectList")) {
			$("#tableProjectList").DataTable().destroy();
		}

		var table = $("#tableProjectList")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 100 },
					{ targets: 1, width: 200 },
					{ targets: 2, width: 350 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 80  },
				],
			});
	}
	initDataTables();
	// ----- END DATATABLES -----


	// ----- TABLE CONTENT -----
	function tableContent() {
		// Reset the unique datas
		uniqueData = [];

		$.ajax({
			url: `${base_url}operations/getTableData`,
			method: "POST",
			async: false,
			dataType: "json",
			data: { 
				tableName: "pms_project_list_tbl AS pplt LEFT JOIN pms_category_tbl AS pct USING(categoryID)",
				columnName: "pplt.*, pct.categoryName"
			},
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="tableProjectList">
                    <thead>
                        <tr style="white-space:nowrap">
                            <th>Project Code</th>
                            <th>Project Name</th>
                            <th>Project Description</th>
                            <th>Project Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

				data.map((item, index, array) => {
					// ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
					let unique = {
						id:              item.projectListID, // Required
						projectListName: item.projectListName,
					};
					uniqueData.push(unique);
					// ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

					let status;
					if (item.projectListStatus == 1) {
						status = `<span class="badge badge-outline-success w-100" style="width: 100% !important;">Active</span>`;
					} else if (item.projectListStatus == 0) {
						status = `<span class="badge badge-outline-danger w-100" style="width: 100% !important;">Inactive</span>`;
					} else if (item.projectListStatus == 2) {
						status = `<span class="badge badge-outline-primary w-100" style="width: 100% !important;">Cancelled</span>`;
					} else {
						status = `<span class="badge badge-outline-info w-100" style="width: 100% !important;">Completed</span>`;
					}

					html += `
                    <tr class="btnEdit" id="${item.projectListID}">
                        <td>${item.projectListCode}</td>
                        <td>${item.projectListName}</td>
                        <td>${item.projectListDescription}</td>
                        <td>${item.categoryName}</td>
                        <td>${status}</td>
                    </tr>`;
				});
				html += `</tbody>
                </table>`;

				setTimeout(() => {
					$("#table_content").html(html);
					initDataTables();
				}, 500);
			},
			error: function () {
				let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
				$("#table_content").html(html);
			},
		});
	}
	tableContent();
	// ----- END TABLE CONTENT -----


	// ----- PROJECT CATEGORY -----
	const projectCategory = getTableData("pms_category_tbl", "categoryID, categoryName", "categoryStatus = 1");
	function projectCategoryOptions(id = null) {
		return projectCategory.map(category => {
			let { categoryID, categoryName } = category;
			return `<option value="${categoryID}" ${categoryID == id ? "selected" : ""}>${categoryName}</option>`;
		}).join("");
	}
	// ----- END PROJECT CATEGORY -----


	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let {
			projectListID          = "",
			projectListName        = "",
			projectListDescription = "",
			projectListStatus      = 1,
			categoryID             = null
		} = data && data[0];

		let button = projectListID
			? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            projectListID="${projectListID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Project Name <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="projectListName" 
                                id="projectListName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                                minlength="2" 
                                maxlength="76" 
                                required 
                                value="${projectListName}"
                                unique="${projectListID}"
                                title="Project Name"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-projectListName"></div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Project Description <code>*</code></label>
                            <textarea 
                                type="text" 
                                class="form-control validate" 
                                name="projectListDescription" 
                                id="projectListDescription" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                                minlength="2" 
                                maxlength="100" 
                                rows="4"
                                style="resize: none"
								required
                                autocomplete="off">${projectListDescription}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-projectListDescription"></div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Project Category <code>*</code></label>
                            <select class="form-control select2 validate"
								name="categoryID"
								id="categoryID"
								required>
								<option selected disabled>Select Project Category</option>
								${projectCategoryOptions(categoryID)}
							</select>
                            <div class="invalid-feedback d-block" id="invalid-projectListFrom"></div>
                        </div>
                    </div>
					<div class="col-sm-12">
                        <div class="form-group">
                            <label>Status <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" 
								name="projectListStatus" 
								id="projectListStatus" 
								projectListID="${projectListID}"
								autocomplete="off">
                                <option value="1" ${projectListStatus == 1 && "selected"}>Active</option>   
                                <option value="0" ${projectListStatus == 0 && "selected"}>Inactive</option>
                                <!-- <option value="2" ${projectListStatus == 2 && "selected"}>Cancelled</option>      
                                <option value="3" ${projectListStatus == 3 && "selected"}>Completed</option> -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListStatus"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i> Cancel</button>
            </div>`;
		return html;
	}
	// ----- END MODAL CONTENT -----


	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_project_list .page-title").text("ADD PROJECT");
		$("#modal_project_list").modal("show");
		$("#modal_project_list_content").html(preloader);
		const content = modalContent();
		$("#modal_project_list_content").html(content);
		initAll();
	});
	// ----- END OPEN ADD MODAL -----


	// ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_project_list");
		if (validate) {
			let data = getFormData("modal_project_list", true);
			data["tableData[projectListCode]"] = generateCode(
				"PRJ",
				false,
				"pms_project_list_tbl",
				"projectListCode"
			);
			data["tableName"] = "pms_project_list_tbl";
			data["feedback"] = $("[name=projectListName]").val();

			sweetAlertConfirmation(
				"add",
				"Project",
				"modal_project_list",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END SAVE MODAL -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		$("#modal_project_list .page-title").text("EDIT PROJECT");
		$("#modal_project_list").modal("show");
		$("#modal_project_list_content").html(preloader);

		const tableData = getTableData(
			"pms_project_list_tbl",
			"*",
			"projectListID=" + id
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_project_list_content").html(content);
				initAll();

				if (!allowedUpdate) {
					$("#modal_project_list_content").find("input, select, textarea").each(function() {
						$(this).attr("disabled", true);
					})
					$("code").hide();
					$("#btnUpdate").hide();
				}
			}, 500);
		}
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- UPDATE MODAL -----
	$(document).on("click", "#btnUpdate", function () {
		const id = $(this).attr("projectListID");

		const validate = validateForm("modal_project_list");
		if (validate) {
			let data = getFormData("modal_project_list", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "pms_project_list_tbl";
			data["whereFilter"] = "projectListID=" + id;
			data["feedback"] = $("[name=projectListName]").val();

			sweetAlertConfirmation(
				"update",
				"Project",
				"modal_project_list",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END UPDATE MODAL -----


	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_project_list");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Project", "modal_project_list");
		} else {
			$("#modal_project_list").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------


	// ----- CHANGE STATUS -----
	$(document).on("change", "#projectListStatus", function() {
		const status    = $(this).val();
		const projectID = $(this).attr("projectListID");
		if (projectID) {
			if (status == "0") {
				const usedData = getTableData(`pms_timeline_builder_tbl`, `projectID`, `projectID = ${projectID} AND timelineBuilderStatus <> 0 AND timelineBuilderStatus <> 4`);
				if (usedData && usedData.length > 0) {
					setTimeout(() => {
						$(this).closest(".form-group").find(".selection").removeClass("no-error is-valid").addClass("has-error is-invalid");
						$("#invalid-projectListStatus").text('This record is currently in use!');
						document.getElementById("btnUpdate").disabled = true;
					}, 0);
				}
			} else {
				setTimeout(() => {
					$(this).closest(".form-group").find(".selection").removeClass("has-error is-invalid").addClass("no-error is-valid");
					$("#invalid-projectListStatus").text('');
					document.getElementById("btnUpdate").disabled = false;
				}, 0);
			}

		}
	})
	// ----- END CHANGE STATUS -----
});
