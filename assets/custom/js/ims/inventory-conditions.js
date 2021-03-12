$(document).ready(function(){
    // $("#container_2").hide();
    // $("#btnCancel").toggle(false);

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modalTitleAddConditionsHeader").text("ADD CONDITIONS");
        $("#modalInventoryConditions").modal("show");
        $("#modalInventoryConditionsContent").html(preloader);
        const content = modalContent();
        $("#modalInventoryConditionsContent").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let userAccountID = "";   
            // supplierCode = data ? (data[0].supplierCode   ? data[0].supplierCode  : "") : "",
            // supplierName = data ? (data[0].supplierName   ? data[0].supplierName  : "") : "",
            // supplierAddress  = data ? (data[0].supplierAddress    ? data[0].supplierAddress   : "") : "",
            // contactPerson     = data ? (data[0].contactPerson       ? data[0].contactPerson      : "") : "",
            // emailAddress    = data ? (data[0].emailAddress      ? data[0].emailAddress     : "") : "",
            // tin    = data ? (data[0].tin      ? data[0].tin     : "") : "",
            // mobileNo    = data ? (data[0].mobileNo      ? data[0].mobileNo     : "") : "",
            // telephoneNo    = data ? (data[0].telephoneNo      ? data[0].telephoneNo     : "") : "",
            // vat    = data ? (data[0].vat      ? data[0].vat     : "") : "",
            // brandName    = data ? (data[0].brandName      ? data[0].brandName     : "") : "";
        let button = userAccountID ? `
        <button 
            class="btn btn-update" 
            id="btnUpdate" 
            accountid="${userAccountID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

        let html = `
            <div class="modal-body">
                <div class="row">
                    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12">
                        <div class="form-group">
                            <label>No. <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                            type="text" 
                            class="form-control validate" 
                            name="conditionId" 
                            id="conditionId" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value=""
                            autocomplete="off" readonly="">
                            <div class="invalid-feedback d-block" id="invalidInputConditionId"></div>
                        </div>
                    </div>
                    <div class="col-xl-10 col-lg-9 col-md-9 col-sm-12">
                        <div class="form-group">
                            <label>Condition Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                            type="text" 
                            class="form-control validate" 
                            name="conditionName" 
                            id="conditionName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value=""
                            autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputConditionName"></div>
                        </div>
                    </div>
                    <div class="col-xl-10 col-lg-9 col-md-9 col-sm-12">
                        <div class="form-group">
                            <label>Condition Description <span class="text-danger font-weight-bold">*</span></label>
                            <textarea 
                                type="text" 
                                class="form-control validate" 
                                name="conditionDescription" 
                                id="conditionDescription" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="20" 
                                rows="4"
                                required 
                                autocomplete="off"></textarea>
                            <div class="invalid-feedback d-block" id="invalidInputConditionDescription"></div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="vat" id="vat" autocomplete="off" required>
                                <option value="0">Active</option>   
                                <option value="1">Inactive</option>
                                <div class="invalid-feedback d-block" id="invalidInputVAT"></div>
                            </select>
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


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modalInventoryConditions");
    if (validate) {
        $("#modalInventoryConditions").modal("hide");
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this?",
            imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Save'
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- FORM DATA -----
            //  * tableData = {} -> Objects
            //  */
            // let data = getFormData("modal_user_account");
            // data.append("tableName", "user_account_tbl");
            // data.append("feedback", "Your choice");
            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. tableData
            //  * 3. feedback
            //  */

            // const saveData = insertTableData(data);
            // if (saveData) {
            //     tableContent();
            // }
                
            Swal.fire({
                icon: 'success',
                title: 'Successfully saved!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modalInventoryConditions").modal("show");
            }
        });
            
        }
    });
    
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#modalTitleAddConditionsHeader").text("VIEW CONDITIONS");
        $("#modalInventoryConditions").modal("show")

        // Display preloader while waiting for the completion of getting the data
        $("#modalInventoryConditionsContent").html(preloader); 

        const tableData = getTableData("inventory_vendor_tbl", "*", "userAccountID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modalInventoryConditionsContent").html(content);
                // $("#btnSaveConfirmationEdit").attr("accountid", id);
                // $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modalInventoryConditions");
        if (validate) {
            $("#modalInventoryConditions").modal("hide");
            Swal.fire({
                title: 'Are you sure?',
                text: "You want to save this?",
                imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#1A1A1A',
                confirmButtonText: 'Save'
              }).then((result) => {
                if (result.isConfirmed) {
    
                // /**
                //  * ----- FORM DATA -----
                //  * tableData = {} -> Objects
                //  */
                // let data = getFormData("modal_user_account");
                // data.append("tableName", "user_account_tbl");
                // data.append("feedback", "Your choice");
                // /**
                //  * ----- DATA -----
                //  * 1. tableName
                //  * 2. tableData
                //  * 3. feedback
                //  */
    
                // const saveData = insertTableData(data);
                // if (saveData) {
                //     tableContent();
                // }
                    
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                }else{
                    $("#modalInventoryConditions").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modalInventoryConditions").modal("hide");
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this?",
            imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Yes, discard!'
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- FORM DATA -----
            //  * tableData = {} -> Objects
            //  */
            // let data = getFormData("modal_user_account");
            // data.append("tableName", "user_account_tbl");
            // data.append("feedback", "Your choice");
            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. tableData
            //  * 3. feedback
            //  */

            // const saveData = insertTableData(data);
            // if (saveData) {
            //     tableContent();
            // }
                
            Swal.fire({
                icon: 'success',
                title: 'Changes successfully discard!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modalInventoryConditions").modal("show");
            }
        });
    });
    // -------- END CANCEL MODAL-----------


      // ----- DATATABLES -----
      function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableInventoryConditions')){
            $('#tableInventoryConditions').DataTable().destroy();
        }
        
        var table = $("#tableInventoryConditions").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100},
                { targets: 1, width: 250 },
                { targets: 2, width: 400},
                { targets: 3, width: 50 },
                { targets: 4, width: 100 }
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
            data:     {tableName: "gen_operations_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableInventoryConditions" style="white-space:nowrap">
                    <thead>
                        <tr class="text-center">
                            <th>No.</th>
                            <th>Condition Name</th>
                            <th>Condition Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.userAccountID, // Required
                        username: item.username,
                        email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    html += `
                    <tr>
                        <td>00001</td>
                        <td>Good Condition</td>
                        <td>Used for items that is in good condition.</td>
                        <td><span class="badge badge-outline-success w-100">Active</span></td>
                        <td>
                            <button class="btn btn-edit btn-block btnEdit" 
                            id="${item.userAccountID}"
                            feedback="${item.username}">
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
});