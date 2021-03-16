$(document).ready(function(){

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
                { targets: 0, width: 100 },
                { targets: 1, width: 100 },
                { targets: 2, width: 500 },
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
        const data = getTableData("hris_requirement_tbl", "*", "", "");
    

        // $.ajax({
        //     url:      `${base_url}operations/getTableData`,
        //     method:   'POST',
        //     async:    false,
        //     dataType: 'json',
        //     data:     {tableName: "user_account_tbl"},
        //     beforeSend: function() {
        //         $("#table_content").html(preloader);
        //         // $("#inv_headerID").text("List of Inventory Item");
        //     },
        //     success: function(data) {
        //         console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableHRISRequirements">
                    <thead>
                    <tr class="text-center">
                        <th>Requirement Code</th>
                        <th>Requirement Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
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

                    html += `
                    <tr>
                    <td>${item.requirementCode}</td>
                    <td>${item.requirementName}</td>
                    <td>${item.requirementDescription}</td>
                    <td><span class="badge badge-outline-success w-100">Active</span></td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.requirementID}"
                                feedback="${item.requirementName}">
                                <i class="fas fa-edit"></i>
                                EDIT
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
        //     },
        //     error: function() {
        //         let html = `
        //             <div class="w-100 h5 text-center text-danger>
        //                 There was an error fetching data.
        //             </div>`;
        //         $("#table_content").html(html);
        //     }
        // })
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
            UPDATE
        </button>` : `
        <button 
            class="btn btn-save px-5 p-2" 
            id="btnSave"><i class="fas fa-save"></i>
            SAVE
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Requirement Name<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="requirementName" 
                            id="input_requirementName" 
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            unique="${requirementID}" 
                            value="${requirementName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_requirementName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Description<span class="text-danger font-weight-bold">*</span></label>
                        <textarea rows="4" 
                        class="form-control validate no-resize" 
                        placeholder="Please type description..."
                        id="input_requirementDescription"
                        data-allowcharacters="[A-Z][a-z][0-9][.][,][-][(][)]['][/]" 
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
                        <label>Status<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_requirementStatus" 
                            name="requirementStatus"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>
                            <option 
                                value="1" 
                                ${data && requirementStatus == "1" && "selected"} >Active</option>
                            <option 
                                value="0" 
                                ${data && requirementStatus == "0" && "selected"}>InActive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_requirementStatus"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-danger px-5 p-2 btnCancel">CANCEL</button>
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

        let tableData           = getTableData("hris_requirement_tbl","","","requirementCode DESC");
        var currentDate         = new Date();
        let currentYear         = currentDate.getFullYear();
        let currentYearStr      = currentYear.toString();

         // Generate Number
         let tableDataCode       = tableData.length < 1 ? "" : parseInt(tableData[0]["requirementCode"].slice(6)) + 1;

         let genCode  = tableData.length < 1 ? "RQT-"+currentYearStr.slice(2)+"-00001" : "RQT-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

// genCode("RQT",null,"tablename","columnName");
         let data = getFormData("modal_hris_requirements",true);
         data["tableData[requirementCode]"]     = genCode;
         data["tableData[createdBy]"]     = "1";
         data["tableData[updatedBy]"]     = "1";
         data["tableName"]                = "hris_requirement_tbl";
         data["feedback"]                 = genCode;
         sweetAlertConfirmation("add", "Requirements Masterfile","modal_hris_requirements", null, data);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#hris_requirements_modalheader").text("VIEW REQUIREMENTS");
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
        let genCode         = getTableData("hris_requirement_tbl","requirementCode","requirementID="+rowID,"requirementCode DESC");
        if (validate) {

            let data = getFormData("modal_hris_requirements", true);
            data["tableData"]["updatedBy"]   =  "2";
            data["whereFilter"]              =  "requirementID="+rowID;
            data["tableName"]                =  "hris_requirement_tbl";
            data["feedback"]                 =   genCode[0]["requirementCode"];
            console.log(data);
            sweetAlertConfirmation("update", "Requirements Masterfile","modal_hris_requirements", null , data);

      
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 

    $(document).on("click",".btnCancel", function(){
        let condition = emptyFormCondition("modal_hris_requirements");
        if(condition==true){
            sweetAlertConfirmation("", "Requirement Masterfile","modal_hris_requirements");
        }else{
            $("#modal_hris_requirements").modal("hide");
        }
        
    });
  
    // -------- END CANCEL MODAL-----------
 
});