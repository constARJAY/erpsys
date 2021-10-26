$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(18);
	if(!allowedUpdate){
		$("#modal_hris_department_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableHRISDepartment')){
            $('#tableHRISDepartment').DataTable().destroy();
        }
        
        var table = $("#tableHRISDepartment").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            lengthMenu: [ 50, 75, 100, 150],
            columnDefs: [
                { targets: 0, width: "10%" },
                // { targets: 1, width: "80%" },
                { targets: 2, width: 80 },
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
        //  const data = getTableData("hris_department_tbl", 
        //  "*, CONCAT('DEP-',SUBSTR(datecreated,3,2),'-',LPAD(departmentID, 5, '0')) AS departmentCode", "", "");


        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "hris_department_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableHRISDepartment">
                    <thead>
                    <tr class="text-left">
                        <th>Department Code</th>
                        <th>Department Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.departmentID, // Required
                        departmentName: item.departmentName,
                        email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    if(item.departmentStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.departmentStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr 
                    class="btnEdit" 
                    id="${item.departmentID}"
                    feedback="${item.departmentName}">
                        <td>${item.departmentCode}</td>
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
        let asterisk                   =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
        let departmentID              = data ? (data[0].departmentID            ? data[0].departmentID        : "") : "",
        departmentName                = data ? (data[0].departmentName          ? data[0].departmentName      : "") : "",
        departmentStatus      = data ? (data[0].departmentStatus? data[0].departmentStatus         : "") : "";
          
        let button = departmentID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${departmentID}">
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
                        <label>Department Name ${asterisk}</label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="departmentName" 
                            id="input_departmentName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-]['][/]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            unique="${departmentID}"  
                            value="${departmentName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_departmentName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status</label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_departmentStatus" 
                            name="departmentStatus"
                            autocomplete="off"
                            getdepartmentid = "${departmentID}"
                            >
                            <option 
                                value="1" 
                                ${data && departmentStatus == "1" && "selected"}>Active</option>
                            <option 
                                value="0" 
                                ${data && departmentStatus == "0" && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_departmentStatus"></div>
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


    // ------ CHECK INVENTORY ITEM STATUS -------
    $(document).on("change","#input_departmentStatus",function(){
        var tempCategoryStatus = $(this).find("option:selected").val()
        var getdepartmentID = $(this).attr("getdepartmentid") ;
        var itemData = getTableData("hris_designation_tbl INNER JOIN hris_department_tbl USING(departmentID)", 
        "departmentStatus", "departmentStatus = 1 AND departmentID ="+getdepartmentID, "");
        var storageData = getTableData("ims_inventory_storage_tbl INNER JOIN hris_department_tbl ON ims_inventory_storage_tbl.inventoryStorageDepartment = hris_department_tbl.departmentID", 
        "departmentStatus", "departmentStatus = 1 AND departmentID ="+getdepartmentID, "");
        var employeeData = getTableData("hris_employee_list_tbl INNER JOIN hris_department_tbl USING(departmentID)", 
        "departmentStatus", "departmentStatus = 1 AND departmentID ="+getdepartmentID, "");

        if(itemData.length != 0 || storageData.length != 0 || employeeData.length != 0 ){
            if(tempCategoryStatus == 0 ){
                setTimeout(function(){
                    $(this).removeClass("is-valid").addClass("is-invalid");
                    $("#invalid-input_departmentStatus").removeClass("is-valid").addClass("is-invalid");
                    $("#invalid-input_departmentStatus").text('This record is currently in use!');
                    document.getElementById("btnUpdate").disabled = true;
                    
                },200)
                        
                            
            }
            else{
                $(this).removeClass("is-invalid").addClass("is-valid");
                $("#invalid-input_departmentStatus").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-input_departmentStatus").text('');
                document.getElementById("btnUpdate").disabled = false;
            }
        }

    });
    // ------ END CHECK INVENTORY ITEM STATUS -------

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#hris_department_modalheader").text("ADD DEPARTMENT");
        $("#modal_hris_department").modal("show");
        $("#modal_hris_department_content").html(preloader);
        const content = modalContent();
        $("#modal_hris_department_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_hris_department");
    if (validate) {

        let data = getFormData("modal_hris_department", true);
        data["tableData[departmentCode]"] = generateCode("DPT", false, "hris_department_tbl", "departmentCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "hris_department_tbl";
        data["feedback"]             = $("[name=departmentName]").val();

        sweetAlertConfirmation("add", "Department", "modal_hris_department", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#hris_department_modalheader").text("EDIT DEPARTMENT");
        $("#modal_hris_department").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_hris_department_content").html(preloader); 

        const tableData = getTableData("hris_department_tbl", "*", "departmentID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_hris_department_content").html(content);
                $("#btnSaveConfirmationEdit").attr("rowID", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
            let condition = $("#input_departmentStatus").hasClass("is-invalid");
        
            const rowID = $(this).attr("rowID");
            if(!condition){
                const validate = validateForm("modal_hris_department");
                if (validate) {

                    let data = getFormData("modal_hris_department", true);
                    data["tableData[updatedBy]"] = sessionID;
                    data["tableName"]            = "hris_department_tbl";
                    data["whereFilter"]          ="departmentID="+rowID;
                    data["feedback"]             = $("[name=departmentName]").val();
        
                    sweetAlertConfirmation(
                        "update",
                        "Department",
                        "modal_hris_department",
                        "",
                        data,
                        true,
                        tableContent
                    );
                    }
                
            }else{
                $("#input_departmentStatus").select2('focus');
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_hris_department");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Department",
				"modal_hris_department"
			);
		} else {
			$("#modal_hris_department").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------

   
});