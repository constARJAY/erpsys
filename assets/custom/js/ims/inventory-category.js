$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(5);
	if(!allowedUpdate){
		$("#modal_inventory_category_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableInventoryCategory')){
            $('#tableInventoryCategory').DataTable().destroy();
        }
        
        var table = $("#tableInventoryCategory").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%" },
                { targets: 1, width: "40%" },
                { targets: 2, width: "40%" },
                { targets: 3, width: "10%" },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----

    // ----- DEPARTMENT CONTENT -----
    function departmentContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_classification_tbl", 
        "classificationID   ,classificationName", "classificationStatus = 1", "");
        
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Classification Name</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.classificationID }" ${param && item.classificationID  == param[0].classificationID  && "selected"}>${item.classificationName}</option>`;
            })
            $("#input_classificationID").html(html);
    }
    departmentContent();
    // ----- END DEPARTMENT CONTENT -----

    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 

         // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
        //  const data = getTableData("ims_inventory_category_tbl", 
        //  "*, LPAD(categoryID, 5, '0') AS categoryNo", "", "");

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "ims_inventory_category_tbl INNER JOIN ims_inventory_classification_tbl USING(classificationID)"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableInventoryCategory">
                    <thead>
                    <tr>
                        <th>Item Category Code</th>
                        <th>Category Name</th>
                        <th>Classification Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        multiple: {
                            id:               item.categoryID, // Required
                            categoryName:     item.categoryName,
                            classificationID: item.classificationID
                        }
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    if(item.categoryStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.categoryStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.categoryID}"
                    feedback="${item.categoryName}">
                        <td>${item.categoryCode}</td>
                        <td>${item.categoryName}</td>
                        <td>${item.classificationName}</td>
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
        let categoryID              = data ? (data[0].categoryID            ? data[0].categoryID        : "") : "",
        categoryName                = data ? (data[0].categoryName          ? data[0].categoryName      : "") : "",
        categoryStatus      = data ? (data[0].categoryStatus? data[0].categoryStatus         : "") : "";
          
        let button = categoryID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${categoryID}"
            feedback="${categoryName}">
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
                        <label>Category Name <span class="text-danger font-weight-bold">*</span></label>
                        <select
                            class="form-control validate select2" 
                            name="categoryName" 
                            id="input_categoryName" 
                            required 
                            unique="${categoryID}" >
                            <option selected disabled>Select Category Name</option>
                            <option value="Project" ${categoryName == "Project" && "selected"}>Project</option>
                            <option value="Equipment" ${categoryName == "Equipment" && "selected"}>Equipment</option>
                            <option value="Purchase" ${categoryName == "Purchase" && "selected"}>Purchase</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_categoryName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Classification Name <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_classificationID" 
                            name="classificationID"
                            autocomplete="off"
                            required
                            unique="${categoryID}" >
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_categoryStatus" 
                            name="categoryStatus"
                            autocomplete="off"
                            getcategoryid = "${categoryID}">
                            <option 
                                value="1" 
                                ${data && categoryStatus == "1" && "selected"} >Active</option>
                            <option 
                                value="0" 
                                ${data && categoryStatus == "0" && "selected"}>Inactive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_categoryStatus"></div>
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
        $(document).on("change","#input_categoryStatus",function(){
            var tempCategoryStatus = $(this).find("option:selected").val()
           var getCategoryID = $(this).attr("getcategoryid") ;
            var itemData = getTableData("ims_inventory_item_tbl INNER JOIN ims_inventory_category_tbl USING(categoryID)", 
            "itemStatus", "itemStatus = 1 AND categoryID ="+getCategoryID, "");
    
            if(itemData.length != 0 ){
                if(tempCategoryStatus == 0 ){
                    $(this).removeClass("is-valid").addClass("is-invalid");
                    $("#invalid-input_categoryStatus").removeClass("is-valid").addClass("is-invalid");
                                $("#invalid-input_categoryStatus").text('There is active inventory item in this category! ');
                               
                            
                              
                }
                else{
                    $(this).removeClass("is-invalid").addClass("is-valid");
                    $("#invalid-input_categoryStatus").removeClass("is-invalid").addClass("is-valid");
                    $("#invalid-input_categoryStatus").text('');
                }
            }
    
        });
        // ------ END CHECK INVENTORY ITEM STATUS -------

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#inventory_category_modalheader").text("ADD INVENTORY CATEGORY");
        $("#modal_inventory_category").modal("show");
        $("#modal_inventory_category_content").html(preloader);
        const content = modalContent();
        $("#modal_inventory_category_content").html(content);
        departmentContent();
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_inventory_category");
    if (validate) {

        let data = getFormData("modal_inventory_category", true);
        data["tableData[categoryCode]"] = generateCode("CTY", false, "ims_inventory_category_tbl", "categoryCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "ims_inventory_category_tbl";
        data["feedback"]             = $("[name=categoryName]").val();
        sweetAlertConfirmation("add", "Inventory Category", "modal_inventory_category", null, data, true, tableContent);
            
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#inventory_category_modalheader").text("EDIT INVENTORY CATEGORY");
        $("#modal_inventory_category").modal("show");
        var tempUniqueData = [];
		uniqueData.filter(items => items["multiple"].id != id).map(items=>{
			tempUniqueData.push(items);
		});
		uniqueData = tempUniqueData;
        // Display preloader while waiting for the completion of getting the data
        $("#modal_inventory_category_content").html(preloader); 

        const tableData = getTableData("ims_inventory_category_tbl", "*", "categoryID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_inventory_category_content").html(content);
                departmentContent(tableData);
                $("#btnSaveConfirmationEdit").attr("accountid", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        let condition = $("#input_categoryStatus").hasClass("is-invalid");
        
        const rowID = $(this).attr("rowID");
        if(!condition){
            const validate = validateForm("modal_inventory_category");
            if (validate) {

                let data = getFormData("modal_inventory_category", true);
                data["tableData[updatedBy]"] = sessionID;
                data["tableName"]            = "ims_inventory_category_tbl";
                data["whereFilter"]          = "categoryID=" + rowID;
                data["feedback"]             = $("[name=categoryName]").val();

                sweetAlertConfirmation(
                    "update",
                    "Inventory Category",
                    "modal_inventory_category",
                    "",
                    data,
                    true,
                    tableContent
                );
                
        
                    
                }
            
        }else{
            $("#input_categoryStatus").select2('focus');
        }
    });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_inventory_category");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Inventory Category",
				"modal_inventory_category"
			);
		} else {
			$("#modal_inventory_category").modal("hide");
		}
    });
    
    // -------- END CANCEL MODAL-----------
      
});