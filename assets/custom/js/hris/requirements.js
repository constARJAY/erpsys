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
                { targets: 1, width: 500 },
                { targets: 2, width: 50 },
                { targets: 3, width: 50 },
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
            data:     {tableName: "user_account_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableHRISRequirements">
                    <thead>
                    <tr class="text-center">
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
                        id:       item.userAccountID, // Required
                        username: item.username,
                        email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    html += `
                    <tr>
                        <td>Passport</td>
                        <td>For Valid ID</td>
                        <td><span class="badge badge-outline-success w-100">Active</span></td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.userAccountID}"
                                feedback="${item.username}">
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
    let userAccountID ="1";
          
        let button = userAccountID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            accountid="${userAccountID}">
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
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value=""
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
                        id="description"
                        name="description"
                        required
                        ></textarea>
                        <div class="invalid-feedback d-block" id="invalid-input_description"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            name="role" 
                            id="input_requirementStatus" 
                            name="requirementStatus"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                            >No Selected</option>
                            <option 
                                value="1" 
                            >Active</option>
                            <option 
                                value="0" 
                            >InActive</option>
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
        $("#modal_hris_requirements").modal("hide");
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You want to save this?",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Save'
        // }).
        
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
            confirmButtonText: 'Save',
            allowOutsideClick: false
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
                $("#modal_hris_requirements").modal("show");
            }
        });
            
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

        const tableData = getTableData("inventory_item_tbl", "*", "userAccountID="+id, "");
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
        if (validate) {
        $("#modal_hris_requirements").modal("hide");
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
                confirmButtonText: 'Yes, save changes',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
    
                    // const accountID = $(this).attr("accountid");
                    // const feedback  = $(this).attr("feedback");
        
                    // let data = getFormData("modal_user_account");
                    // data.append("tableName", "user_account_tbl");
                    // data.append("whereFilter", "userAccountID="+accountID);
                    // data.append("feedback", feedback);
        
                    // /**
                    //  * ----- DATA -----
                    //  * 1. tableName
                    //  * 2. tableData
                    //  * 3. whereFilter
                    //  * 4. feedback
                    // */
        
                    // const saveData = updateTableData(data);
                    // if (saveData) {
                    //    tableContent();
                    // }
                    
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                })
                }else{
                    $("#modal_hris_requirements").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modal_hris_requirements").modal("hide");

        const data = getFormData("modal_hris_requirements");

        var validate = false;
            for(var i of data.entries()) {
                const count =+i[1];
               validate[0] = i[1];
                if(i[1] !=""){
                    validate = true;
                }
            }

            if(validate == true){

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    imageUrl: `${base_url}assets/custom/isometric_image/questions.png`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#1A1A1A',
                    confirmButtonText: 'Yes, discard!',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Changes successfully discard!',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }else{
                        $("#modal_hris_requirements").modal("show");
                    }
                  });
            }else{
                $("#modal_hris_requirements").modal("hide");
            }
       
    });
    // -------- END CANCEL MODAL-----------

    // ---- OPEN DELETE MODAL -----
    $(document).on("click", ".btnDelete", function() {
        const id = $(this).attr("id");
        const feedback = $(this).attr("feedback");

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Discard',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. whereFilter
            //  * 3. feedback
            // */

            // const data = {
            //     tableName:   "user_account_tbl",
            //     whereFilter: "userAccountID="+accountID,
            //     feedback
            // };

            // const saveData = deleteTableData(data);
            // if (saveData) {
            //    tableContent();
            // }

              Swal.fire(
                'Successfully Deleted!',
                '',
                'success'
              )
            }
          });
    });
    // ---- END OPEN DELETE MODAL -----


      
});