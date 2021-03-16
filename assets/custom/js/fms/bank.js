$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableFinanceBank')){
            $('#tableFinanceBank').DataTable().destroy();
        }
        
        var table = $("#tableFinanceBank").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 300 },
                { targets: 1, width: 300 },
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
          // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
          const data = getTableData("fms_bank_tbl","*", "", ""); 

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
                <table class="table table-bordered table-striped table-hover" id="tableFinanceBank">
                    <thead>
                    <tr class="text-center">
                        <th>Bank Name</th>
                        <th>Account Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.bankID, // Required
                        bankName: item.bankName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    if(item.bankStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.bankStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr>
                        <td>${item.bankName}</td>
                        <td>${item.bankNumber}</td>
                        <td>${status}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.bankID}"
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
            // },
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
        let bankID              = data ? (data[0].bankID            ? data[0].bankID        : "") : "",
        bankName                = data ? (data[0].bankName          ? data[0].bankName      : "") : "",
        bankNumber      = data ? (data[0].bankNumber? data[0].bankNumber         : "") : "";
        bankStatus      = data ? (data[0].bankStatus? data[0].bankStatus         : "") : "";
          
        let button = bankID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${bankID}">
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
                        <label>Bank Name<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="bankName" 
                            id="input_bankName" 
                            data-allowcharacters="[A-Z][a-z][0-9][-]" 
                            minlength="2" 
                            maxlength="20" 
                            required
                            unique="${bankID}"  
                            value="${bankName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_bankName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Bank Number<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="bankNumber" 
                            id="input_bankNumber" 
                            data-allowcharacters="[0-9][-]" 
                            minlength="10" 
                            maxlength="20" 
                            required 
                            value="${bankNumber}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_bankNumber"></div>
                    </div>
                </div>
            </div>
            <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Status<span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_bankStatus" 
                        name="bankStatus"
                        autocomplete="off"
                        required>
                        <option 
                            value="" 
                            disabled 
                            selected
                            ${!data && "selected"} >No Selected</option>
                        <option 
                            value="1" 
                            ${data && bankStatus == "1" && "selected"} >Active</option>
                        <option 
                            value="0" 
                            ${data && bankStatus == "0" && "selected"}>InActive</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-input_bankStatus"></div>
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
        $("#finance_bank_modalheader").text("ADD BANK");
        $("#modal_finance_bank").modal("show");
        $("#modal_finance_bank_content").html(preloader);
        const content = modalContent();
        $("#modal_finance_bank_content").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_finance_bank");
    if (validate) {
        $("#modal_finance_bank").modal("hide");
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

            /**
             * ----- FORM DATA -----
             * tableData = {} -> Objects
             */
            let data = getFormData("modal_finance_bank");
            data.append("tableName", "fms_bank_tbl");
            data.append("feedback", "Your choice");
            /**
             * ----- DATA -----
             * 1. tableName
             * 2. tableData
             * 3. feedback
             */

            const saveData = insertTableData(data);
            if (saveData) {
                tableContent();
            }
                
            Swal.fire({
                icon: 'success',
                title: 'Successfully saved!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modal_finance_bank").modal("show");
            }
        });
            
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#finance_bank_modalheader").text("VIEW BANK");
        $("#modal_finance_bank").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_finance_bank_content").html(preloader); 

        const tableData = getTableData("fms_bank_tbl", "*", "bankID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_finance_bank_content").html(content);
                // $("#btnSaveConfirmationEdit").attr("rowID", id);
                // $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_finance_bank");
        if (validate) {
        $("#modal_finance_bank").modal("hide");
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
    
                    const rowID = $(this).attr("rowID");
                    const feedback  = $(this).attr("feedback");
        
                    let data = getFormData("modal_finance_bank");
                    data.append("tableName", "fms_bank_tbl");
                    data.append("whereFilter", "bankID="+rowID);
                    data.append("feedback", feedback);
        
                    /**
                     * ----- DATA -----
                     * 1. tableName
                     * 2. tableData
                     * 3. whereFilter
                     * 4. feedback
                    */
        
                    const saveData = updateTableData(data);
                    if (saveData) {
                       tableContent();
                    }
                    
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                })
                }else{
                    $("#modal_finance_bank").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modal_finance_bank").modal("hide");

        const data = getFormData("modal_finance_bank");

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
                        $("#modal_finance_bank").modal("show");
                    }
                  });
            }else{
                $("#modal_finance_bank").modal("hide");
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
            //     whereFilter: "bankID="+rowID,
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