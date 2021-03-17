$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableProjectList')){
            $('#tableProjectList').DataTable().destroy();
        }
        
        var table = $("#tableProjectList").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 150 },
                { targets: 1, width: 300 },
                { targets: 2, width: 500 },
                { targets: 3, width: 100 },
                { targets: 4, width: 100 },
                { targets: 5, width: 200 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 200 },
                { targets: 9, width: 50 },
                { targets: 10, width: 50 },
                { targets: 11, width: 100 }
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
            data:     {tableName: "pms_project_list_tbl "},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:              item.projectListID, // Required
                        projectListName: item.projectListName,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    let status =
						item.projectListStatus == 1
							? `
                    <span class="badge badge-outline-success w-100">Active</span>`
							: `
                    <span class="badge badge-outline-danger w-100">Inactive</span>`;

                    let priorityLevel =
                        item.projectListPriorityLevel == 1 ? 
                        `High` : (item.projectListPriorityLevel == 2 ? 
                            `Medium` : `Low`);

                    html += `
                    <tr>
                        <td>${item.projectListCode}</td>
                        <td>${item.projectListName}</td>
                        <td>${item.projectListDescription}</td>
                        <td>${moment(item.projectListFrom).format("MMMM DD, YYYY")}</td>
                        <td>${moment(item.projectListTo).format("MMMM DD, YYYY")}</td>
                        <td>${item.projectListClientID}</td>
                        <td>${item.projectListManagerID}</td>
                        <td>${item.projectListLeaderID}</td>
                        <td>${item.projectListMemberID}</td>
                        <td>${priorityLevel}</td>

                        <td>${status}</td>
                        <td>
                            <button class="btn btn-edit btn-block btnEdit" 
                            id="${item.projectListID}">
                            <i class="fas fa-edit"></i> Edit</button>
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
            projectListStatus        = "",
        } = data && data[0];

        let button = projectListID ? `
        <button 
            class="btn btn-update" 
            id="btnUpdate" 
            projectListID="${projectListID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

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
                            <label>Project Description </label>
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
                                autocomplete="off">${projectListDescription}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-projectListDescription"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Start Date <code>*</code></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input type="button" class="form-control daterange validate text-left" name="projectListFrom" id="projectListFrom" required value="${projectListFrom && moment(projectListFrom).format("MMMM DD, YYYY")}">
                                </div>
                            <div class="invalid-feedback d-block" id="invalid-projectListFrom"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>End Date <code>*</code></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                </div>
                                <input type="button" class="form-control validate text-left" name="projectListTo" id="projectListTo" required value="${projectListTo && moment(projectListTo).format("MMMM DD, YYYY")}">
                            </div>
                            <div class="invalid-feedback d-block" id="invalid-projectListTo"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Client <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListClientID" id="projectListClient" autocomplete="off" required>
                            <!-- TEMPORARY OPTIONS -->
                                <option value="" selected>Select Client</option>   
                                <option value="1" ${projectListClientID == 1 && "selected"}>BlackCoders Group Inc.</option>   
                                <option value="2" ${projectListClientID == 2 && "selected"}>Gatchallan Tangalin Co.&CPA's</option>
                                <option value="3" ${projectListClientID == 3 && "selected"}>CMTLand Development Inc.</option>   
                                <option value="4" ${projectListClientID == 4 && "selected"}>CMTBuilders Inc.</option>
                                <option value="5" ${projectListClientID == 5 && "selected"}>MFOX Computer Services</option>   
                                <option value="6" ${projectListClientID == 6 && "selected"}>DeltaMike Security</option>
                            <!-- END TEMPORARY OPTIONS -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalidp-rojectListClient"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Project Manager <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListManagerID" id="projectListManagerID" autocomplete="off" required>
                            <!-- TEMPORARY OPTIONS -->
                                <option value="" selected>Select Manager</option> 
                                <option value="1" ${projectListManagerID == 1 && "selected"}>Robinjamin Gelilio</option>   
                                <option value="2" ${projectListManagerID == 2 && "selected"}>Nina Geronimo</option>
                                <option value="3" ${projectListManagerID == 3 && "selected"}>Renz Fabian</option>   
                                <option value="4" ${projectListManagerID == 4 && "selected"}>Sheryl Antinero</option>
                                <option value="5" ${projectListManagerID == 5 && "selected"}>Ulysis Ramizares</option>   
                                <option value="6" ${projectListManagerID == 6 && "selected"}>Jill Macalintal</option>
                            <!-- END TEMPORARY OPTIONS -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListManagerID"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Team Leader</label>
                            <select class=" form-control show-tick select2 validate" name="projectListLeaderID" id="projectListLeaderID" autocomplete="off">
                            <!-- TEMPORARY OPTIONS -->
                                <option value="" selected>Select Leader</option> 
                                <option value="1" ${projectListLeaderID == 1 && "selected"}>Robinjamin Gelilio</option>   
                                <option value="2" ${projectListLeaderID == 2 && "selected"}>Nina Geronimo</option>
                                <option value="3" ${projectListLeaderID == 3 && "selected"}>Renz Fabian</option>   
                                <option value="4" ${projectListLeaderID == 4 && "selected"}>Sheryl Antinero</option>
                                <option value="5" ${projectListLeaderID == 5 && "selected"}>Ulysis Ramizares</option>   
                                <option value="6" ${projectListLeaderID == 6 && "selected"}>Jill Macalintal</option>
                            <!-- END TEMPORARY OPTIONS -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListLeaderID"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Priority Level <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="projectListPriorityLevel" id="projectListPriorityLevel" autocomplete="off" required>
                            <!-- TEMPORARY OPTIONS -->
                                <option value="" selected>Select Prioriry Level</option>
                                <option value="3" ${projectListPriorityLevel == 1 && "selected"}>High</option>   
                                <option value="2" ${projectListPriorityLevel == 2 && "selected"}>Medium</option>
                                <option value="1" ${projectListPriorityLevel == 3 && "selected"}>Low</option>  
                            <!-- END TEMPORARY OPTIONS -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListPriorityLevel"></div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Team Members</label>
                            <select class=" form-control show-tick select2 validate" name="projectListMemberID" id="projectListMemberID" autocomplete="off" multiple="multiple">
                            <!-- TEMPORARY OPTIONS -->
                                <option disabled>Select Team Member</option> 
                                <option value="1" ${projectListMemberID && projectListMemberID.split("|").includes("1") && "selected"}>Robinjamin Gelilio</option>   
                                <option value="2" ${projectListMemberID && projectListMemberID.split("|").includes("2") && "selected"}>Nina Geronimo</option>
                                <option value="3" ${projectListMemberID && projectListMemberID.split("|").includes("3") && "selected"}>Renz Fabian</option>   
                                <option value="4" ${projectListMemberID && projectListMemberID.split("|").includes("4") && "selected"}>Sheryl Antinero</option>
                                <option value="5" ${projectListMemberID && projectListMemberID.split("|").includes("5") && "selected"}>Ulysis Ramizares</option>   
                                <option value="6" ${projectListMemberID && projectListMemberID.split("|").includes("6") && "selected"}>Jill Macalintal</option>
                            <!-- END TEMPORARY OPTIONS -->
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-projectListMemberID"></div>
                        </div>
                    </div>
                    <div class="col-sm-12">
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
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT ----


    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modal_project_list .page-title").text("ADD PROJECT");
        $("#modal_project_list").modal("show");
        $("#modal_project_list_content").html(preloader);
        const content = modalContent();
        $("#modal_project_list_content").html(content);
        initAll();
        startDate();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- START DATE -----
    function startDate() {
        $("[name=projectListFrom]").daterangepicker({
            autoUpdateInput: false,
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY"
            },
        }, function(data) {
            if (data) {
                const validated = $("[name=projectListFrom]").hasClass("validated");
                let invalidFeedback = 
                $("[name=projectListFrom]").parent().find(".invalid-feedback").length > 0 ? 
                    $("[name=projectListFrom]").parent().find(".invalid-feedback") : 
                    ($("[name=projectListFrom]").parent().parent().find(".invalid-feedback").length > 0 ?
                    $("[name=projectListFrom]").parent().parent().find(".invalid-feedback") : $("[name=projectListFrom]").parent().parent().parent().find(".invalid-feedback"));
                validated ? $("[name=projectListFrom]").removeClass("is-invalid").addClass("is-valid") : $("[name=projectListFrom]").removeClass("is-invalid").removeClass("is-valid");
                invalidFeedback.text("");
                $("[name=projectListFrom]").val(moment(data).format("MMMM DD, YYYY"));

                endDate(data);
            }
        })
    }

    function endDate(data) {
        initDateRangePicker("#projectListTo", {
            autoUpdateInput: false,
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: "MMMM DD, YYYY"
            },
            startDate: moment(data).format("MMMM DD, YYYY"),
            minDate: moment(data).format("MMMM DD, YYYY")
        })
        
        $("#projectListTo").val(moment(data).format("MMMM DD, YYYY"));
    }
    // ----- END START DATE -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_project_list");
        if (validate) {
            let data = getFormData("modal_project_list", true);
			data["tableData[projectListCode]"] = generateCode(
				"PRO",
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
    $(document).on("click", ".btnEdit", function() {
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
			data["tableName"]            = "pms_project_list_tbl";
			data["whereFilter"]          = "projectListID=" + id;
			data["feedback"]             = $("[name=projectListName]").val();

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
			sweetAlertConfirmation(
				"cancel",
				"Project",
				"modal_project_list"
			);
		} else {
			$("#modal_project_list").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------


});