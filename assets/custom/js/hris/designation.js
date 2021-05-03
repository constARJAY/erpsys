$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(17);
	if(!allowedUpdate){
		$("#modal_hris_designation_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableHRISDesignation')){
            $('#tableHRISDesignation').DataTable().destroy();
        }
        
        var table = $("#tableHRISDesignation").css({"min-width": "100%"}).removeAttr('width').DataTable({
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

    // ----- DEPARTMENT CONTENT -----
    function departmentContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("hris_department_tbl", 
        "departmentID  ,departmentName", "departmentStatus =1", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Department Name</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.departmentID }" ${param && item.departmentID  == param[0].departmentID  && "selected"}>${item.departmentName}</option>`;
            })
            $("#input_departmentID").html(html);
    }
    departmentContent();
    // ----- END DEPARTMENT CONTENT -----

    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 
        // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
        // const data = getTableData("hris_designation_tbl as designation INNER JOIN hris_department_tbl as department USING(departmentID)  ", 
        //     "*, CONCAT('DES-',SUBSTR(designation.datecreated,3,2),'-',LPAD(designation.designationID, 5, '0')) AS designationCode,department.departmentName", "", "");

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "hris_designation_tbl as designation INNER JOIN hris_department_tbl as department USING(departmentID)"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableHRISDesignation">
                    <thead>
                    <tr class="text-left">
                        <th>Designation Code</th>
                        <th>Designation Name</th>
                        <th>Department Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.designationID, // Required
                        designationName: item.designationName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    
                    if(item.designationStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.designationStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.designationID}"
                    feedback="${item.designationName}"
                    >
                        <td>${item.designationCode}</td>
                        <td>${item.designationName}</td>
                        <td>${item.departmentName}</td>
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
        let designationID              = data ? (data[0].designationID            ? data[0].designationID        : "") : "",
        departmentID             = data ? (data[0].departmentID       ? data[0].departmentID   : "") : "",
        designationName                = data ? (data[0].designationName          ? data[0].designationName      : "") : "",
        designationStatus      = data ? (data[0].designationStatus? data[0].designationStatus         : "") : "";
        let button = designationID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${designationID}">
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
                        <label>Department Name <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_departmentID" 
                            name="departmentID"
                            autocomplete="off"
                            required>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_departmentID"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Designation Name <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="designationName" 
                            id="input_designationName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][(][)]['][/]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            unique="${designationID}" 
                            value="${designationName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_designationName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_designationStatus" 
                            name="designationStatus"
                            autocomplete="off"
                            >
                            <option 
                                value="1" 
                                ${data && designationStatus == "1" && "selected"}>Active</option>
                            <option 
                                value="0" 
                                ${data && designationStatus == "0" && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_designationStatus"></div>
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
        $("#hris_designation_modalheader").text("ADD DESIGNATION");
        $("#modal_hris_designation").modal("show");
        $("#modal_hris_designation_content").html(preloader);
        const content = modalContent();
        $("#modal_hris_designation_content").html(content);
        departmentContent();
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_hris_designation");
    if (validate) {
        let data = getFormData("modal_hris_designation", true);
        data["tableData[designationCode]"] = generateCode("DSN", false, "hris_designation_tbl", "designationCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "hris_designation_tbl";
        data["feedback"]             = $("[name=designationName]").val();

        sweetAlertConfirmation("add", "Designation Masterfile", "modal_hris_designation", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#hris_designation_modalheader").text("EDIT DESIGNATION");
        $("#modal_hris_designation").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_hris_designation_content").html(preloader); 

        const tableData = getTableData("hris_designation_tbl", "*", "designationID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_hris_designation_content").html(content);
                departmentContent(tableData);
                $("#btnSaveConfirmationEdit").attr("rowID", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const rowID = $(this).attr("rowID");
        const validate = validateForm("modal_hris_designation");
        if (validate) {

            let data = getFormData("modal_hris_designation", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "hris_designation_tbl";
			data["whereFilter"]          = "designationID="+rowID;
			data["feedback"]             = $("[name=designationName]").val();

			sweetAlertConfirmation(
				"update",
				"Designation",
				"modal_hris_designation",
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
		let formEmpty = isFormEmpty("modal_hris_designation");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Designation",
				"modal_hris_designation"
			);
		} else {
			$("#modal_hris_designation").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------

});