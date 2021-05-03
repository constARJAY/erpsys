$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(19);
	if(!allowedUpdate){
		$("#modal_hris_requirements_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableHRISRequirements')){
            $('#tableHRISRequirements').DataTable().destroy();
        }
        
        var table = $("#tableHRISRequirements").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%" },
                { targets: 3, width: 80 },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----

    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 

        // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
        // const data = getTableData("hris_requirement_tbl", "*", "", "");
    

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "hris_requirement_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableHRISRequirements">
                    <thead>
                    <tr class="text-left">
                        <th>Requirement Code</th>
                        <th>Requirement Name</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.requirementID, // Required
                        requirementName: item.requirementName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    if(item.requirementStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.requirementStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }
                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.requirementID}"
                    feedback="${item.requirementName}">
                    <td>${item.requirementCode}</td>
                    <td>${item.requirementName}</td>
                    <td>${item.requirementDescription}</td>
                    <td class="text-center">${status}</td>
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
        let requirementID              = data ? (data[0].requirementID            ? data[0].requirementID        : "") : "",
        requirementName                = data ? (data[0].requirementName          ? data[0].requirementName      : "") : "",
        requirementDescription      = data ? (data[0].requirementDescription? data[0].requirementDescription         : "") : "",
        requirementStatus      = data ? (data[0].requirementStatus? data[0].requirementStatus         : "") : "";
          
        let button = requirementID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${requirementID}">
            <i class="fas fa-save"></i>
            Update
        </button>` : `
        <button 
            class="btn btn-save px-5 p-2" 
            id="btnSave"><i class="fas fa-save"></i>
            Save
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Requirement Name <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="requirementName" 
                            id="input_requirementName" 
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][ ]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            unique="${requirementID}" 
                            value="${requirementName}"
                            autocomplete="off"
                            title="Requirement Name">
                        <div class="invalid-feedback d-block" id="invalid-input_requirementName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Description <span class="text-danger font-weight-bold">*</span></label>
                        <textarea rows="4" 
                        class="form-control validate no-resize" 
                        placeholder="Please type description..."
                        id="input_requirementDescription"
                        data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/][ ]" 
                        name="requirementDescription"
                        required
                        >${requirementDescription}</textarea>
                        <div class="invalid-feedback d-block" id="invalid-input_requirementDescription"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_requirementStatus" 
                            name="requirementStatus"
                            autocomplete="off"
                            >
                            <option 
                                value="1" 
                                ${data && requirementStatus == "1" && "selected"} >Active</option>
                            <option 
                                value="0" 
                                ${data && requirementStatus == "0" && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_requirementStatus"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
    return html;
} 
    // ----- END MODAL CONTENT -----

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#hris_requirements_modalheader").text("ADD REQUIREMENTS");
        $("#modal_hris_requirements").modal("show");
        $("#modal_hris_requirements_content").html(preloader);
        const content = modalContent();
        $("#modal_hris_requirements_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_hris_requirements");
    if (validate) {

        let data = getFormData("modal_hris_requirements", true);
        data["tableData[requirementCode]"] = generateCode("RQT", false, "hris_requirement_tbl", "requirementCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "hris_requirement_tbl";
        data["feedback"]             = $("[name=requirementName]").val();

        sweetAlertConfirmation("add", "Requirement", "modal_hris_requirements", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#hris_requirements_modalheader").text("EDIT REQUIREMENTS");
        $("#modal_hris_requirements").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_hris_requirements_content").html(preloader); 

        const tableData = getTableData("hris_requirement_tbl", "*", "requirementID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_hris_requirements_content").html(content);
                $("#btnSaveConfirmationEdit").attr("accountid", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_hris_requirements");
        let rowID           = $(this).attr("rowID");
        if (validate) {

            let data = getFormData("modal_hris_requirements", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "hris_requirement_tbl";
			data["whereFilter"]          =  "requirementID="+rowID;
			data["feedback"]             = $("[name=requirementName]").val();

			sweetAlertConfirmation(
				"update",
				"Requirement",
				"modal_hris_requirements",
				"",
				data,
				true,
				tableContent
			);
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_hris_requirements");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Requirement",
				"modal_hris_requirements"
			);
		} else {
			$("#modal_hris_requirements").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------
 
});