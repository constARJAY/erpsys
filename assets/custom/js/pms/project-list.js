$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(11);

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
					{ targets: 3, width: 120 },
					{ targets: 4, width: 120 },
					{ targets: 5, width: 120 },
					{ targets: 6, width: 120 },
					{ targets: 7, width: 120 },
					{ targets: 8, width: 120 },
					{ targets: 9, width: 80  },
					{ targets: 10, width: 80 },
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
				tableName: "pms_project_list_tbl AS pplt LEFT JOIN pms_client_tbl AS pct ON pplt.projectListClientID = pct.clientID",
				columnName: "pplt.*, pct.clientName"
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
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Client</th>
                            <th>Project Manager</th>
                            <th>Team Leader</th>
                            <th>Team Members</th>
                            <th>Priority Level</th>
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

					let projectManager = employeeFullname(item.projectListManagerID) || "-";
					let teamLeader     = employeeFullname(item.projectListLeaderID) || "-";

					let teamMembers = item.projectListMemberID ? item.projectListMemberID.split("|") : [];
						teamMembers = teamMembers.map((employeeID) => {
						return `<div>${employeeFullname(employeeID) || "-"}</div>`;
					}).join("")

					let status;
					if (item.projectListStatus == 1) {
						status = `<span class="badge badge-outline-success w-100">Active</span>`;
					} else if (item.projectListStatus == 0) {
						status = `<span class="badge badge-outline-danger w-100">Inactive</span>`;
					} else if (item.projectListStatus == 2) {
						status = `<span class="badge badge-outline-primary w-100">Cancelled</span>`;
					} else {
						status = `<span class="badge badge-outline-info w-100">Completed</span>`;
					}

					let priorityLevel =
						item.projectListPriorityLevel == 1 ? `High` : item.projectListPriorityLevel == 2 ? `Medium` : `Low`;

					html += `
                    <tr class="btnEdit" id="${item.projectListID}">
                        <td>${item.projectListCode}</td>
                        <td>${item.projectListName}</td>
                        <td>${item.projectListDescription}</td>
                        <td>
							${moment(item.projectListFrom).format("MMMM DD, YYYY")}
						</td>
                        <td>
							${moment(item.projectListTo).format("MMMM DD, YYYY")}
						</td>
                        <td>${item.clientName || "-"}</td>
                        <td>${projectManager}</td>
                        <td>${teamLeader}</td>
                        <td>${teamMembers}</td>
                        <td>${priorityLevel}</td>
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


	// ----- GET PROJECT CLIENT -----
	const clients = getTableData(
		"pms_client_tbl",
		"clientID, clientName",
		`clientStatus = 1`
	);
	function getProjectClient(id = 0) {
		let html = `<option selected disabled>Select Client</option>`;

		clients.map((client) => {
			html += `
			<option value="${client.clientID}" ${id === client.clientID ? "selected" : ""}>
				${client.clientName}
			</option>`;
		});
		return html;
	}
	// ----- END GET PROJECT CLIENT -----

	// ----- GET FORM EMPLOYEE ID -----
	function getFromEmployeeID(employeeType = "pm") {
		if (employeeType) {
			let pmID = $("[name=projectListManagerID]").val();
			pmID = pmID ? pmID : 0;
			let tlID = $("[name=projectListLeaderID]").val();
			tlID = tlID ? tlID : 0;
			let tmID = $("[name=projectListMemberID]").val();
			tmID = tmID ? (tmID.length > 0 ? tmID : [0]) : [0];

			if (employeeType === "pm") {
				return [tlID, ...tmID].join(", ");
			} else if (employeeType === "tl") {
				return [pmID, ...tmID].join(", ");
			} else if (employeeType === "tm") {
				return [tlID, pmID].join(", ");
			}
		}
		return "0";
	}
	// ----- END GET FORM EMPLOYEE ID -----

	// ----- GET PROJECT MANAGER -----
	function getProjectManager(id = 0, display = false) {
		let html = `<option selected disabled>Select Project Manager</option>`;

		const selectedEmployee = getFromEmployeeID("pm");
		const andWhere = id ? `OR employeeID = ${id}` : "";
		const employees = getTableData(
			"hris_employee_list_tbl",
			"employeeID, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeStatus = 1 AND employeeID NOT IN (${selectedEmployee}) ${andWhere}`
		);

		employees &&
			employees.map((employee) => {
				html += `<option value="${employee.employeeID}" ${
					id === employee.employeeID ? "selected" : ""
				}>${employee.fullname}</option>`;
			});

		if (display) {
			$("[name=projectListManagerID]").html(html);
		} else {
			return html;
		}
	}
	// ----- END GET PROJECT MANAGER -----

	// ----- GET TEAM LEADER -----
	function getTeamLeader(id = 0, display = false) {
		let html = `<option selected disabled>Select Team Leader</option>`;

		const selectedEmployee = getFromEmployeeID("tl");
		const andWhere = id ? `OR employeeID = ${id}` : "";
		const employees = getTableData(
			"hris_employee_list_tbl",
			"employeeID, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeStatus = 1 AND employeeID NOT IN (${selectedEmployee}) ${andWhere}`
		);

		employees &&
			employees.map((employee) => {
				html += `<option value="${employee.employeeID}" ${
					id === employee.employeeID ? "selected" : ""
				}>${employee.fullname}</option>`;
			});

		if (display) {
			$("[name=projectListLeaderID]").html(html);
		} else {
			return html;
		}
	}
	// ----- END GET TEAM LEADER -----

	// ----- GET TEAM MEMBERS -----
	function getTeamMembers(id = [], display = false) {
		let html = ``;

		let idArr = id && id.length > 0 ? id.join(", ") : "0";
		const selectedEmployee = getFromEmployeeID("tm");
		const andWhere = idArr ? `OR employeeID IN (${idArr})` : "";
		const employees = getTableData(
			"hris_employee_list_tbl",
			"employeeID, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname",
			`employeeStatus = 1 AND employeeID NOT IN (${selectedEmployee}) ${andWhere}`
		);

		employees &&
			employees.map((employee) => {
				html += `<option value="${employee.employeeID}" ${
					id.includes(employee.employeeID) ? "selected" : ""
				}>${employee.fullname}</option>`;
			});

		if (display) {
			$("[name=projectListMemberID]").html(html);
		} else {
			return html;
		}
	}
	// ----- END GET TEAM MEMBERS -----

	// ----- SELECT PROJECT MANAGER -----
	function selectEmployee(name = "") {
		const pmID = $("[name=projectListManagerID]").val();
		const tlID = $("[name=projectListLeaderID]").val();
		const tmID = $("[name=projectListMemberID]").val();

		if (name === "projectListManagerID") {
			getTeamLeader(tlID, true);
			getTeamMembers(tmID, true);
		} else if (name === "projectListLeaderID") {
			getProjectManager(pmID, true);
			getTeamMembers(tmID, true);
		} else if (name === "projectListMemberID") {
			getProjectManager(pmID, true);
			getTeamLeader(tlID, true);
		} else {
			getProjectManager(pmID, true);
			getTeamLeader(tlID, true);
			getTeamMembers(tmID, true);
		}
	}

	$(document).on(
		"change",
		"[name=projectListManagerID], [name=projectListLeaderID], [name=projectListMemberID]",
		function () {
			selectEmployee(this.name);
		}
	);
	// ----- END SELECT PROJECT MANAGER -----


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
			projectListID            = "",
			projectListName          = "",
			projectListDescription   = "",
			projectListFrom          = "",
			projectListTo            = "",
			projectListClientID      = "",
			projectListManagerID     = "",
			projectListLeaderID      = "",
			projectListPriorityLevel = "",
			projectListMemberID      = "",
			projectListStatus        = 1,
			categoryID               = null
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
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
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
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <label>Start Date <code>*</code></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input 
										type="button" 
										class="form-control daterange validate text-left" 
										name="projectListFrom" 
										id="projectListFrom" 
										value="${projectListFrom && moment(projectListFrom).format("MMMM DD, YYYY")}">
                                </div>
                            <div class="invalid-feedback d-block" id="invalid-projectListFrom"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <label>End Date <code>*</code></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                </div>
                                <input 
									type="button" 
									class="form-control validate text-left" 
									name="projectListTo" 
									id="projectListTo" 
									value="${projectListTo && moment(projectListTo).format("MMMM DD, YYYY")}">
                            </div>
                            <div class="invalid-feedback d-block" id="invalid-projectListTo"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Client <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListClientID" id="projectListClient" autocomplete="off" required>
                                ${getProjectClient(projectListClientID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalidp-rojectListClient"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Project Manager <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListManagerID" id="projectListManagerID" autocomplete="off" required>
                                ${getProjectManager(projectListManagerID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListManagerID"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Team Leader <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListLeaderID" id="projectListLeaderID" autocomplete="off" required>
                                ${getTeamLeader(projectListLeaderID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListLeaderID"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Priority Level <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListPriorityLevel" id="projectListPriorityLevel" autocomplete="off" required>
                                <option selected disabled>Select Priority Level</option>
                                <option value="1" ${projectListPriorityLevel == 1 && "selected"}>High</option>   
                                <option value="2" ${projectListPriorityLevel == 2 && "selected"}>Medium</option>
                                <option value="3" ${projectListPriorityLevel == 3 && "selected"}>Low</option>  
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListPriorityLevel"></div>
                        </div>
                    </div>
					<div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Status <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListStatus" id="projectListStatus" autocomplete="off">
                                <option value="1" ${projectListStatus == 1 && "selected"}>Active</option>   
                                <option value="0" ${projectListStatus == 0 && "selected"}>Inactive</option>
                                <option value="2" ${projectListStatus == 2 && "selected"}>Cancelled</option>      
                                <option value="3" ${projectListStatus == 3 && "selected"}>Completed</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListStatus"></div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Team Members <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListMemberID" id="projectListMemberID" autocomplete="off" multiple="multiple" required>
                            ${getTeamMembers(projectListMemberID && projectListMemberID.split("|"))}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListMemberID"></div>
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
	// ----- END MODAL CONTENT ----

	// ----- SELECT2 MULTIPLE PLACEHOLDER -----
	function multipleSelect2Placeholder() {
		$(".select2[name=projectListMemberID]").select2({
			placeholder: "Select Team Members",
			theme: "bootstrap",
			allowClear: true,
			multiple: true,
		});
		$(".select2-search__field").css("width", "100%");
	}
	// ----- END SELECT2 MULTIPLE PLACEHOLDER -----

	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_project_list .page-title").text("ADD PROJECT");
		$("#modal_project_list").modal("show");
		$("#modal_project_list_content").html(preloader);
		const content = modalContent();
		$("#modal_project_list_content").html(content);
		initAll();
		startDate("add");
		multipleSelect2Placeholder();
	});
	// ----- END OPEN ADD MODAL -----

	// ----- START DATE -----
	function startDate(action = "") {
		$("[name=projectListFrom]").daterangepicker(
			{
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
			},
			function (data) {
				if (data) {
					const validated = $("[name=projectListFrom]").hasClass("validated");
					let invalidFeedback =
						$("[name=projectListFrom]").parent().find(".invalid-feedback")
							.length > 0
							? $("[name=projectListFrom]").parent().find(".invalid-feedback")
							: $("[name=projectListFrom]")
									.parent()
									.parent()
									.find(".invalid-feedback").length > 0
							? $("[name=projectListFrom]")
									.parent()
									.parent()
									.find(".invalid-feedback")
							: $("[name=projectListFrom]")
									.parent()
									.parent()
									.parent()
									.find(".invalid-feedback");
					validated
						? $("[name=projectListFrom]")
								.removeClass("is-invalid")
								.addClass("is-valid")
						: $("[name=projectListFrom]")
								.removeClass("is-invalid")
								.removeClass("is-valid");
					invalidFeedback.text("");
					$("[name=projectListFrom]").val(moment(data).format("MMMM DD, YYYY"));

					endDate(data, data);
				}
			}
		);

		if (action && action == "add") {
			let dateToday = new Date();
			$("[name=projectListFrom]").val(
				moment(dateToday).format("MMMM DD, YYYY")
			);
			const dateTo = $(`[name="projectListTo"]`).val() || new Date;
			endDate(dateTo, dateToday);
		}
	}

	function endDate(dateTo, startDate = new Date) {
		initDateRangePicker("#projectListTo", {
			autoUpdateInput: false,
			singleDatePicker: true,
			showDropdowns: true,
			autoApply: true,
			locale: {
				format: "MMMM DD, YYYY",
			},
			startDate: moment(dateTo).format("MMMM DD, YYYY"),
			minDate: moment(startDate).format("MMMM DD, YYYY"),
		});

		$("#projectListTo").val(moment(dateTo).format("MMMM DD, YYYY"));
	}
	// ----- END START DATE -----

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
				startDate();
				endDate($("[name=projectListTo]").val());
				multipleSelect2Placeholder();
				selectEmployee();

				if (!allowedUpdate) {
					$("#modal_project_list_content").find("input, select, textarea").each(function() {
						$(this).attr("disabled", true);
					})
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
});
