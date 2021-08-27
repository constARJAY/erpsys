$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(31);

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
		if ($.fn.DataTable.isDataTable("#tabletrainingsetup")) {
			$("#tabletrainingsetup").DataTable().destroy();
		}

		var table = $("#tabletrainingsetup")
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
					{ targets: 3, width: 180 },
					{ targets: 4, width: 80  },
                    { targets: 5, width: 80  },
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
				tableName: `hris_training_development_setup_tbl AS tdst 
                            LEFT JOIN hris_employee_list_tbl AS elt USING(employeeID)`,
				columnName: "tdst.*, CONCAT(elt.employeeFirstname, ' ',elt.employeeLastname) AS fullname"
			},
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="tabletrainingsetup">
                    <thead>
                        <tr style="white-space:nowrap">
                            <th>Training Code</th>
                            <th>Training Name</th>
                            <th>Topic</th>
                            <th>Speaker Name</th>
                            <th>Difficulty</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

				data.map((item, index, array) => {
					// ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
					let unique = {
						id:                           item.trainingDevelopmentSetupID, // Required
						trainingDevelopmentSetupName: item.trainingDevelopmentSetupName,
					};
					uniqueData.push(unique);
					// ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

					if(item.trainingDevelopmentSetupStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.trainingDevelopmentSetupStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

					html += `
                    <tr class="btnEdit" id="${item.trainingDevelopmentSetupID}">
                        <td>${item.trainingDevelopmentSetupCode}</td>
                        <td>${item.trainingDevelopmentSetupName}</td>
                        <td>${item.trainingDevelopmentSetupTopic}</td>
                        <td>${item.fullname}</td>
                        <td>${item.trainingDevelopmentSetupDifficulty}</td>
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
	const employeeFile = getTableData("hris_employee_list_tbl", "employeeID, CONCAT(employeeFirstname,' ',employeeLastname) AS Fullname", "employeeStatus = 1");
	function employeeList(id = null) {
		return employeeFile.map(employee => {
			let { employeeID, Fullname} = employee;
			return `<option value="${employeeID}" ${employeeID == id ? "selected" : ""}>${Fullname}</option>`;
		}).join("");
	}
	// ----- END PROJECT CATEGORY -----


	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let {
			trainingDevelopmentSetupID                       = "",
			trainingDevelopmentSetupName                     = "",
			trainingDevelopmentSetupTopic                    = "",
            trainingDevelopmentSetupType                     = "",
            trainingDevelopmentSetupModuleFile               = "",
            trainingDevelopmentSetupDifficulty               = "",    
			trainingDevelopmentSetupStatus                   = 1,
			employeeID                                       = null
		} = data && data[0];

		let button = trainingDevelopmentSetupID
			? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            trainingDevelopmentSetupID="${trainingDevelopmentSetupID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
            <div class="modal-body">
                <div class="row">
					<div class="col-sm-6">
                        <div class="form-group">
                            <label>Training Name <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="trainingDevelopmentSetupName" 
                                id="trainingDevelopmentSetupName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                                minlength="2" 
                                maxlength="76" 
                                required 
                                value="${trainingDevelopmentSetupName}"
                                unique="${trainingDevelopmentSetupID}"
                                title="Project Name"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-trainingDevelopmentSetupName"></div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Topic <code>*</code></label>
                            <textarea 
                                type="text" 
                                class="form-control validate" 
                                name="trainingDevelopmentSetupTopic" 
                                id="trainingDevelopmentSetupTopic" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                                minlength="2" 
                                maxlength="100" 
                                rows="4"
                                style="resize: none"
								required
                                autocomplete="off">${trainingDevelopmentSetupTopic}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-projectListDescription"></div>
                        </div>
                    </div>
					<div class="col-sm-6">
						<div class="form-group">
						<label>Type of Training <code>*</code></label>
							<select class="form-control select2 validate"
							name="trainingDevelopmentSetupType" 
							id="trainingDevelopmentSetupType">
								<option value="Internal" ${data && trainingDevelopmentSetupType == "Internal" && "selected"}>Internal</option>
								<option value="External" ${data && trainingDevelopmentSetupType == "External" && "selected"}>External</option>
							</select>
						</div>
				  	</div>
					  <div class="col-md-6">
					  <div class="form-group">
						  <label>Training Module </label>
						  <div class="displayfile" id="displaytrainingDevelopmentSetupModuleFile">
							  ${trainingDevelopmentSetupModuleFile ? getFileDisplay(trainingDevelopmentSetupModuleFile) : ""}
						  </div>
						  <input 
							  type="file" 
							  class="form-control file" 
							  name="trainingDevelopmentSetupModuleFile|orientation-development-setup" 
							  id="trainingDevelopmentSetupModuleFile"
							  file="${trainingDevelopmentSetupModuleFile}"
							  autocomplete="off">
					  </div>
				  </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Speaker Name <code>*</code></label>
                            <select class="form-control select2 validate"
								name="employeeID"
								id="employeeID"
								required>
								<option selected disabled>Select Speaker Name</option>
								${employeeList(employeeID)}
							</select>
                            <div class="invalid-feedback d-block" id="invalid-employeeID"></div>
                        </div>
                    </div>
					<div class="col-sm-6">
						<div class="form-group">
						<label>Difficulty <code>*</code></label>
							<select class="form-control select2 validate"
							name="trainingDevelopmentSetupDifficulty" 
							id="trainingDevelopmentSetupDifficulty">
								<option value="Beginner" ${data && trainingDevelopmentSetupDifficulty == "Beginner" && "selected"}>Beginner</option>
								<option value="Intermediate" ${data && trainingDevelopmentSetupDifficulty == "Intermediate" && "selected"}>Intermediate</option>
								<option value="Difficult" ${data && trainingDevelopmentSetupDifficulty == "Difficult" && "selected"}>Difficult</option>
							</select>
							<div class="invalid-feedback d-block" id="invalid-trainingDevelopmentSetupDifficulty"></div>
						</div>
				  	</div>
					<div class="col-sm-6">
                        <div class="form-group">
                            <label>Status <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" 
								name="trainingDevelopmentSetupStatus" 
								id="trainingDevelopmentSetupStatus" 
								trainingDevelopmentSetupID="${trainingDevelopmentSetupID}"
								autocomplete="off">
                                <option value="1" ${trainingDevelopmentSetupStatus == 1 && "selected"}>Active</option>   
                                <option value="0" ${trainingDevelopmentSetupStatus == 0 && "selected"}>Inactive</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-trainingDevelopmentSetupStatus"></div>
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

	 // ----- CHOOSE FILE -----
	 function getFileDisplay(filename = null, link = true) {
        let text = link ? `
        <a class="filename" title="${filename}" style="display: block;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;" href="${base_url}assets/upload-files/orientation-development-setup/${filename}" target="_blank">
            ${filename}
        </a>` : `
        <span class="filename" title="${filename}" style="display: block;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;">
            ${filename}
        </span>`;

        let html = `
        <div class="d-flex justify-content-start align-items-center p-0">
            <span class="btnRemoveFile pr-2" style="cursor: pointer"><i class="fas fa-close"></i></span>
            ${text}
        </div>`;

        return html;
    }

	$(document).on("change", `[type="file"]`, function() {
        $parent = $(this).closest(".form-group");

        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;
            if (filesize > 10) {
                $(this).val("");
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else {
                $parent.find(`[type="file"]`).attr("file", filename);
                $parent.find(".displayfile").html(getFileDisplay(filename, false));
            }
        }
    })
    // ----- END CHOOSE FILE -----
	// ----- REMOVE FILE -----
    $(document).on("click", `.btnRemoveFile`, function() {
        $parent = $(this).closest(".form-group");

        $parent.find(`[type="file"]`).val("");
        $parent.find(`[type="file"]`).removeAttr("file");
        $parent.find(".displayfile").children().remove();
    })
    // ----- END REMOVE FILE -----

	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_training_development_setup .page-title").text("ADD TRAINING AND DEVELOPMENT");
		$("#modal_training_development_setup").modal("show");
		$("#modal_training_development_setup_content").html(preloader);
		const content = modalContent();
		$("#modal_training_development_setup_content").html(content);
		initAll();
	});
	// ----- END OPEN ADD MODAL -----


	// ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_training_development_setup");
		if (validate) {
			//alert(sessionID);
			let data = getFormData("modal_training_development_setup");
            data.append(`tableData[trainingDevelopmentSetupCode]`, generateCode("TRC", false, "hris_training_development_setup_tbl", "trainingDevelopmentSetupCode"));
            data.append(`tableData[createdBy]`, sessionID);
            data.append(`tableName`, `hris_training_development_setup_tbl`);
            data.append(`feedback`, $("[name=trainingDevelopmentSetupName]").val()?.trim());
			const trainingDevelopmentSetupModuleFile = $("#trainingDevelopmentSetupModuleFile").attr("file");
			!trainingDevelopmentSetupModuleFile && data.append(`tableData[trainingDevelopmentSetupModuleFile]`, "");

			sweetAlertConfirmation("add", "Training and Development", "modal_training_development_setup", null, data, false, tableContent);
			// sweetAlertConfirmation(
			// 	"add", "Training and Development", "modal_training_development_setup", null, data, true, tableContent
			// );
			// let data = getFormData("modal_training_development_setup", true);
			// data["tableData[trainingDevelopmentSetupCode]"] = generateCode("TRC", false, "hris_training_development_setup_tbl", "trainingDevelopmentSetupCode");
			// data["tableData[createdBy]"] = sessionID;
			// data["tableName"] = "hris_training_development_setup_tbl";
			// data["feedback"] = $("[name=trainingDevelopmentSetupName]").val();

			// const trainingDevelopmentSetupModuleFile = $("#trainingDevelopmentSetupModuleFile").attr("file");
			// !trainingDevelopmentSetupModuleFile && data["tableData[trainingDevelopmentSetupModuleFile]"], "";
			// sweetAlertConfirmation(
			// 	"add", "Training and Development", "modal_training_development_setup", null, data, true, tableContent
			// );
		}
	});
	// ----- END SAVE MODAL -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		$("#modal_training_development_setup .page-title").text("EDIT TRAINING AND DEVELOPMENT");
		$("#modal_training_development_setup").modal("show");
		$("#modal_training_development_setup_content").html(preloader);

		const tableData = getTableData(
			"hris_training_development_setup_tbl",
			"*",
			"trainingDevelopmentSetupID=" + id
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_training_development_setup_content").html(content);
				initAll();

				if (!allowedUpdate) {
					$("#modal_training_development_setup_content").find("input, select, textarea").each(function() {
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
		const id = $(this).attr("trainingDevelopmentSetupID");
		const validate = validateForm("modal_training_development_setup");
		if (validate) {
			let data = getFormData("modal_training_development_setup");
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableName`, `hris_training_development_setup_tbl`);
            data.append(`whereFilter`, `trainingDevelopmentSetupID=${id}`);
            data.append(`feedback`, $("[name=trainingDevelopmentSetupName]").val()?.trim());

            const trainingDevelopmentSetupModuleFile = $("#trainingDevelopmentSetupModuleFile").attr("file");
            !trainingDevelopmentSetupModuleFile && data.append(`tableData[trainingDevelopmentSetupModuleFile]`, "");
			sweetAlertConfirmation(
				"update",
				"Training and Development",
				"modal_training_development_setup",
				"",
				data,
				false,
				tableContent
			);
			// let data = getFormData("modal_training_development_setup", true);
			// data["tableData[updatedBy]"] = sessionID;
			// data["tableName"] = "hris_training_development_setup_tbl";
			// data["whereFilter"] = "trainingDevelopmentSetupID=" + id;
			// data["feedback"] = $("[name=trainingDevelopmentSetupName]").val();

			// sweetAlertConfirmation(
			// 	"update",
			// 	"Project",
			// 	"modal_training_development_setup",
			// 	"",
			// 	data,
			// 	true,
			// 	tableContent
			// );
		}
	});
	// ----- END UPDATE MODAL -----


	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_training_development_setup");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Project", "modal_training_development_setup");
		} else {
			$("#modal_training_development_setup").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------


	// ----- CHANGE STATUS -----
	$(document).on("change", "#projectListStatus", function() {
		const status    = $(this).val();
		const projectID = $(this).attr("trainingDevelopmentSetupID");
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
