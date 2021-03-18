$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableProjectMilestoneTable')){
            $('#tableProjectMilestoneTable').DataTable().destroy();
        }
        
        var table = $("#tableProjectMilestoneTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "120px" },
                { targets: 1, width: "30%" },
                { targets: 2, width: "70%" },
                { targets: 3, width: "80px" },
                { targets: 4, width: "80px" },
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
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "pms_project_milestone_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableProjectMilestoneTable">
                    <thead>
                    <tr>
                        <th>Milestone Code</th>
                        <th>Milestone Name</th>
                        <th>Milestone Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:                   item.projectMilestoneID, // Required
                        projectMilestoneName: item.projectMilestoneName,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    let status =
						item.projectMilestoneStatus == 1
							? `
                    <span class="badge badge-outline-success w-100">Active</span>`
							: `
                    <span class="badge badge-outline-danger w-100">Inactive</span>`;

                    html += `
                    <tr>
                        <td>${item.projectMilestoneCode}</td>
                        <td>${item.projectMilestoneName}</td>
                        <td>${item.projectMilestoneDescription}</td>
                        <td>${status}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.projectMilestoneID}">
                                <i class="fas fa-edit"></i>
                                Edit
                            </button>
                        </td>
                    </tr>`;
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    initDataTables();
                }, 500);
            },
            error: function() {
                let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
                $("#table_content").html(html);
            }
        })
    }
    tableContent();
    // ----- END TABLE CONTENT -----


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {
        let {
            projectMilestoneID          = "",
            projectMilestoneName        = "",
            projectMilestoneDescription = "",
            projectMilestoneStatus      = "1",
        } = data && data[0];
          
        let button = projectMilestoneID ? `
        <button 
            class="btn btn-update " 
            id="btnUpdate" 
            projectMilestoneID="${projectMilestoneID}">
            <i class="fas fa-save"></i>
            Update
        </button>` : `
        <button 
            class="btn btn-save" 
            id="btnSave"><i class="fas fa-save"></i>
            Save
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Milestone Name <code>*</code></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="projectMilestoneName" 
                            id="projectMilestoneName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            value="${projectMilestoneName}"
                            unique="${projectMilestoneID}"
                            title="Milestone Name"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-projectMilestoneName"></div>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Milestone Description <code>*</code></label>
                        <textarea 
                            type="text" 
                            class="form-control validate" 
                            name="projectMilestoneDescription" 
                            id="projectMilestoneDescription" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][()]['][/]" 
                            minlength="2" 
                            maxlength="250" 
                            rows="4"
                            required 
                            autocomplete="off">${projectMilestoneDescription}</textarea>
                        <div class="invalid-feedback d-block" id="invalid-projectMilestoneDescription"></div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Status <code>*</code></label>
                        <select 
                            class="form-control select2 validate" 
                            id="projectMilestoneStatus" 
                            name="projectMilestoneStatus"
                            required>
                            <option value="1" ${projectMilestoneStatus == 1 && "selected"}>Active</option>
                            <option value="0" ${projectMilestoneStatus == 0 && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-projectMilestoneStatus"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT -----


    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modal_project_milestone .page-title").text("ADD MILESTONE");
        $("#modal_project_milestone").modal("show");
        $("#modal_project_milestone_content").html(preloader);
        const content = modalContent();
        $("#modal_project_milestone_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_project_milestone");
        if (validate) {
            let data = getFormData("modal_project_milestone", true);
			data["tableData[projectMilestoneCode]"] = generateCode(
				"MIL",
				false,
				"pms_project_milestone_tbl",
				"projectMilestoneCode"
			);
			data["tableName"] = "pms_project_milestone_tbl";
			data["feedback"] = $("[name=projectMilestoneName]").val();

			sweetAlertConfirmation(
				"add",
				"Project Milestone",
				"modal_project_milestone",
				"",
				data,
				true,
				tableContent
			);
        }
    });
    // ----- END SAVE MODAL -----


    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id = $(this).attr("id");
		$("#modal_project_milestone .page-title").text("EDIT PROJECT MILESTONE");
		$("#modal_project_milestone").modal("show");
		$("#modal_project_milestone_content").html(preloader);

		const tableData = getTableData(
			"pms_project_milestone_tbl",
			"*",
			"projectMilestoneID=" + id
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_project_milestone_content").html(content);
				initAll();
			}, 500);
		}
    });
    // ----- END OPEN EDIT MODAL -----


    // ----- UPDATE MODAL -----
	$(document).on("click", "#btnUpdate", function () {
		const id = $(this).attr("projectMilestoneID");

		const validate = validateForm("modal_project_milestone");
		if (validate) {
			let data = getFormData("modal_project_milestone", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "pms_project_milestone_tbl";
			data["whereFilter"]          = "projectMilestoneID=" + id;
			data["feedback"]             = $("[name=projectMilestoneName]").val();

			sweetAlertConfirmation(
				"update",
				"Project Management",
				"modal_project_milestone",
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
		let formEmpty = isFormEmpty("modal_project_milestone");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Project Milestone",
				"modal_project_milestone"
			);
		} else {
			$("#modal_project_milestone").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------

      
});