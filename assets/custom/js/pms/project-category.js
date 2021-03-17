$(document).ready(function(){

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
                { targets: 0, width: 100 },
                { targets: 1, width: 300 },
                { targets: 2, width: 300 },
                { targets: 3, width: 50 },
                { targets: 4, width: 50 },
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
            data:     {tableName: "pms_category_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableProjectCategory">
                    <thead>
                    <tr class="text-center">
                        <th>Category Code</th>
                        <th>Category Name</th>
                        <th>Company Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.categoryID, // Required
                        categoryName: item.categoryName,
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
                    html += `
                    <tr>
                        <td>${item.categoryCode}</td>
                        <td>${item.categoryName}</td>
                        <td>${item.companyName}</td>
                        <td>${status}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.categoryID}"
                                feedback="${item.categoryName}">
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
        let categoryID              = data ? (data[0].categoryID            ? data[0].categoryID        : "") : "",
        categoryName             = data ? (data[0].categoryName       ? data[0].categoryName   : "") : "",
        companyName                = data ? (data[0].companyName          ? data[0].companyName      : "") : "",
        categoryStatus      = data ? (data[0].categoryStatus? data[0].categoryStatus         : "") : "";
          
        let button = categoryID ? `
        <button 
            class="btn btn-update " 
            id="btnUpdate" 
            rowID="${categoryID}">
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
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Category Name<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="categoryName" 
                            id="input_categoryName" 
                            data-allowcharacters="[A-Z][a-z][ ][-][(][)][,]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            unique="${categoryID}" 
                            value="${categoryName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_categoryName"></div>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                    <div class="form-group">
                        <label>Company Name<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="companyName" 
                            id="input_companyName" 
                            data-allowcharacters="[A-Z][a-z][ ][-][(][)][,][']"  
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value="${companyName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_companyName"></div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                    <div class="form-group">
                        <label>Status<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_categoryStatus" 
                            name="categoryStatus"
                            autocomplete="off"
                            required>
                            <option 
                                value="1" 
                                ${data && categoryStatus == "1" && "selected"}>Active</option>
                            <option 
                                value="0" 
                                ${data && categoryStatus == "0" && "selected"}>InActive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_categoryStatus"></div>
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
        $("#modalProjectCategoryHeader").text("ADD CATEGORY");
        $("#modalProjectCategory").modal("show");
        $("#modalProjectCategoryContent").html(preloader);
        const content = modalContent();
        $("#modalProjectCategoryContent").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modalProjectCategory");
    if (validate) {

        let tableData           = getTableData("pms_category_tbl","","","categoryCode DESC");
        var currentDate         = new Date();
        let currentYear         = currentDate.getFullYear();
        let currentYearStr      = currentYear.toString();

         // Generate Number
         let tableDataCode       = tableData.length < 1 ? "" : parseInt(tableData[0]["categoryCode"].slice(6)) + 1;

         let genCode  = tableData.length < 1 ? "PCT-"+currentYearStr.slice(2)+"-00001" : "PCT-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

// genCode("RQT",null,"tablename","columnName");
         let data = getFormData("modalProjectCategory",true);
         data["tableData[categoryCode]"]     = genCode;
         data["tableData[createdBy]"]     = "1";
         data["tableData[updatedBy]"]     = "1";
         data["tableName"]                = "pms_category_tbl";
         data["feedback"]                 = genCode;
         sweetAlertConfirmation("add", "Category Masterfile","modalProjectCategory", null, data);

        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#modalProjectCategoryHeader").text("VIEW CATEGORY");
        $("#modalProjectCategory").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modalProjectCategoryContent").html(preloader); 

        const tableData = getTableData("pms_category_tbl", "*", "categoryID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modalProjectCategoryContent").html(content);
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
        let genCode         = getTableData("pms_category_tbl","categoryCode","categoryID="+rowID,"categoryCode DESC");
        if (validate) {

            let data = getFormData("modalProjectCategory", true);
            data["tableData"]["updatedBy"]   =  "2";
            data["whereFilter"]              =  "categoryID="+rowID;
            data["tableName"]                =  "pms_category_tbl";
            data["feedback"]                 =   genCode[0]["categoryCode"];
            sweetAlertConfirmation("update", "Category Masterfile","modalProjectCategory", null , data);
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 

    $(document).on("click",".btnCancel", function(){
        let condition = emptyFormCondition("modalProjectCategory");
        if(condition==true){
            sweetAlertConfirmation("", "Category Masterfile","modalProjectCategory");
        }else{
            $("#modalProjectCategory").modal("hide");
        }
        
    });
    // -------- END CANCEL MODAL-----------


      
});