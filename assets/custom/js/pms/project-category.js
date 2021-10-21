$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(13);
	if(!allowedUpdate){
		$("#modalProjectCategoryContent").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableProjectCategory')){
            $('#tableProjectCategory').DataTable().destroy();
        }
        
        var table = $("#tableProjectCategory").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "30%" },
                { targets: 1, width: "65%" },
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
        //    const data = getTableData("pms_category_tbl","*", "", "");
        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "pms_category_tbl as ct LEFT JOIN pms_client_tbl as cl ON ct.companyName = cl.clientID"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableProjectCategory">
                    <thead>
                    <tr class="text-left">
                        <th>Category Code</th>
                        <th>Category Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.categoryID, // Required
                        categoryName: item.categoryName,
                        categoryShortcut: item.categoryShortcut
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    if(item.categoryStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.categoryStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    var theCompanyName;
                    switch(item.companyName) {
                        case "BCGI":
                            theCompanyName = "Blackcoders Group Inc.";
                          break;
                        case "GTC":
                            theCompanyName = "Gatchallan Tangalin and Co., CPA's";
                          break;
                        case "CMTLAND":
                          theCompanyName = "CMT Land";
                          break;
                        default:
                          theCompanyName = "CMT Builders";
                      }
                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.categoryID}"
                    feedback="${item.categoryName}">
                        <td>${item.categoryCode}</td>
                        <td>${item.categoryName}</td>
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

    // ----- company CONTENT -----
    function companyContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("pms_client_tbl", 
        "clientID  ,clientName", "clientStatus =1", "");
        
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Company Name</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.clientID }" ${param && item.companyName  == param[0].clientID  && "selected"}>${item.clientName}</option>`;
            })
            $("#input_companyName").html(html);
    }
    companyContent();
    // ----- END company CONTENT -----

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let categoryID              = data ? (data[0].categoryID     ? data[0].categoryID     : "") : "",
        categoryName                = data ? (data[0].categoryName   ? data[0].categoryName   : "") : "",
        companyName                 = data ? (data[0].companyName    ? data[0].companyName    : "") : "",
        categoryShortcut                 = data ? (data[0].categoryShortcut    ? data[0].categoryShortcut    : "") : "",
        categoryStatus              = data ? (data[0].categoryStatus ? data[0].categoryStatus : "") : "";
          
        let button = categoryID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${categoryID}">
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
                <div class="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                    <div class="form-group">
                        <label>Category Name <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="categoryName" 
                            id="input_categoryName" 
                            data-allowcharacters="[A-Z][a-z][ ][-][(][)][,]" 
                            minlength="2" 
                            maxlength="50" 
                            required 
                            unique="${categoryID}" 
                            value="${categoryName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_categoryName"></div>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5">
                    <div class="form-group">
                        <label>Category Shortcut <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="categoryShortcut" 
                            id="input_categoryShortcut" 
                            data-allowcharacters="[A-Z][a-z]" 
                            minlength="2" 
                            maxlength="3" 
                            required 
                            unique="${categoryID}" 
                            value="${categoryShortcut}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_categoryShortcut"></div>
                    </div>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status <span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_categoryStatus" 
                            name="categoryStatus"
                            autocomplete="off"
                            >
                            <option 
                                value="1" 
                                ${data && categoryStatus == "1" && "selected"}>Active</option>
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
            <button class="btn btn-cancel btnCancel px-5 p-2"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
    return html;
} 
    // ----- END MODAL CONTENT -----

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modalProjectCategoryHeader").text("ADD CATEGORY");
        $("#modalProjectCategory").modal("show");
        $("#modalProjectCategoryContent").html(preloader);
        const content = modalContent();
        $("#modalProjectCategoryContent").html(content);
        initAll();
        companyContent();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modalProjectCategory");
    if (validate) {

        let data = getFormData("modalProjectCategory", true);
            data["tableData[categoryCode]"] = generateCode("PCT", false, "pms_category_tbl", "categoryCode");
            data["tableData[createdBy]"] = sessionID;
            data["tableData[updatedBy]"] = sessionID;
            data["tableName"]            = "pms_category_tbl";
            data["feedback"]             = $("[name=categoryName]").val();

            sweetAlertConfirmation("add", "Project Category", "modalProjectCategory", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#modalProjectCategoryHeader").text("EDIT CATEGORY");
        $("#modalProjectCategory").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modalProjectCategoryContent").html(preloader); 

        const tableData = getTableData("pms_category_tbl", "*", "categoryID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modalProjectCategoryContent").html(content);
                companyContent(tableData);
                $("#btnSaveConfirmationEdit").attr("rowID", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        
        const validate = validateForm("modalProjectCategory");
        let rowID           = $(this).attr("rowID");
        if (validate) {

            let data = getFormData("modalProjectCategory", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "pms_category_tbl";
			data["whereFilter"]          = "categoryID="+rowID;
			data["feedback"]             = $("[name=categoryName]").val();

			sweetAlertConfirmation(
				"update",
				"Project Category",
				"modalProjectCategory",
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
		let formEmpty = isFormEmpty("modalProjectCategory");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Project Category",
				"modalProjectCategory"
			);
		} else {
			$("#modalProjectCategory").modal("hide");
		}
	});
    // -------- END CANCEL MODAL-----------


      
});