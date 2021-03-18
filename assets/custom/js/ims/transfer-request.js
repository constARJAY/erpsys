$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableTransferRequest')){
            $('#tableTransferRequest').DataTable().destroy();
        }
        
        var table = $("#tableTransferRequest").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 100 },
                { targets: 2, width: 100 },
                { targets: 3, width: 150 },
                { targets: 4, width: 50 },
                { targets: 5, width: 50 }
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
                <table class="table table-bordered table-striped table-hover" id="tableTransferRequest">
                    <thead>
                        <tr class="text-center">
                            <th>Document No.</th>
                            <th>Date Created</th>
                            <th>Date Category</th>
                            <th>Date Approved</th>
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
                        <td>Document No.</td>
                        <td>Date Created</td>
                        <td>Date Category</td>
                        <td>Date Approved</td>
                        <td>Status</td>
                        <td>
                            <button 
                                class="btn btn-view btn-sm btn-block btnView" 
                                id="${item.userAccountID}"
                                feedback="${item.username}">
                                <i class="fad fa-eye"></i>
                                View
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
     function formContent(data = false) {
    let userAccountID ="";
          
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
                    <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Document No.</small>
                                <h5 class="m-t-0 text-danger font-weight-bold">---</h5>                
                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Date</small>
                                <h5 class="m-t-0 font-weight-bold">---</h5>                
                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Status</small>
                                <h5 class="m-t-0 font-weight-bold">---</h5>                
                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                <h5 class="m-t-0 font-weight-bold">---</h5>                                                
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                <h5 class="m-t-0 font-weight-bold">---</h5>                                                
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="card" style="height:80px">
                            <div class="body">
                                <small class="text-small text-muted font-weight-bold">Remarks</small>
                                <br>
                                <small class="text-small font-weight-bold">---</small>                                               
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <small class="text-small text-muted font-weight-bold">Storage Code <span class="text-danger font-weight-bold">*</span></small>
                            <select class=" form-control show-tick select2 validate" name="storageCode" id="input_storageCode" autocomplete="off" required>
                                <option value="" selected disabled>Select Storage Code</option>
                                <option value="">STO-21-00001</option>   
                            </select>
                            <div class="invalid-feedback d-block" id="invalidInputStorageCode"></div>
                        </div>                                 
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <small class="text-small text-muted font-weight-bold">Storage Name </small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="storageName" 
                                id="input_storageName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                value=""
                                autocomplete="off"
                                readonly>
                            <div class="invalid-feedback d-block" id="invalidInputStorageName"></div>
                        </div>                                   
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group" style="height: 80px">
                            <small class="text-small text-muted font-weight-bold">Asignee Name <span class="text-danger font-weight-bold">*</span></small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="assigneeName" 
                                id="input_assigneeName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                value=""
                                autocomplete="off" readonly>
                            <div class="invalid-feedback d-block" id="invalid-input_assigneeName"></div>
                        </div>                                    
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group" style="height: 80px">
                            <small class="text-small text-muted font-weight-bold">Department <span class="text-danger font-weight-bold">*</span></small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="department" 
                                id="input_department" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                value=""
                                autocomplete="off" readonly>
                            <div class="invalid-feedback d-block" id="invalid-input_department"></div>
                        </div>                                    
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-group">
                            <small class="text-small text-muted font-weight-bold">Storage Address </small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="storageAddress" 
                                id="input_storageAddress" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="200" 
                                required 
                                value=""
                                autocomplete="off" 
                                readonly>
                            <div class="invalid-feedback d-block" id="invalidInputStorageAddress"></div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group" style="height: 80px">
                            <small class="text-small text-muted font-weight-bold">Office Name <span class="text-danger font-weight-bold">*</span></small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="officeName" 
                                id="input_officeName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                value=""
                                autocomplete="off" readonly>
                            <div class="invalid-feedback d-block" id="invalid-input_officeName"></div>
                        </div>                                    
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group" style="height: 80px">
                            <small class="text-small text-muted font-weight-bold">Room Type </small>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="roomType" 
                                id="input_roomType" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                value=""
                                autocomplete="off" readonly>
                            <div class="invalid-feedback d-block" id="invalid-input_roomType"></div>
                        </div>                                    
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
                        <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr class="text-center" style="white-space:nowrap">
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Qty</th>
                                <th>UOM</th>
                                <th>Unit Cost</th>
                                <th>Subtotal</th>
                                <th>VAT Type</th>
                                <th>VAT Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                    </div>  
                    <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 mt-3 offset-xl-8 offset-lg-8 offset-md-6 text-right">
                        <label><strong>Subtotal:&nbsp; ₱ </strong></label>
                        <br>
                        <label><strong>VAT Amount:&nbsp; ₱ </strong></label>
                        <br>
                        <label><strong>Total Cost:&nbsp; ₱ </strong></label>
                    </div>  
                    <div class="col-xl-2 col-lg-2 col-md-6 col-sm-12 mt-3 text-right">
                        <label>000000</label>
                        <br>
                        <label>000000</label>
                        <br>
                        <label>000000</label>
                    </div>  
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> CANCEL</button>
                <button class="btn btn-submit px-5 p-2 btnSubmit"><i class="fas fa-paper-plane"></i> SUBMIT</button>
            </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT -----

    // ----- ADD ROW -----
    // $(document).on('click','.btnAddRow',function(){
    //     var counter = 1;
    //     // console.log($('#table-achievements tr').length);
  
    //     if($('tbody').children().last().children('.tdd').html() == undefined){
    //        $('tbody').append('<tr><td class="tdd tbl-td-'+counter+'">'+counter+'</td><td><div class="input-group mt-3"><select class="form-control js-example-basic-multiple" style=" background-color: #fff;"><option selected="selected">No Selected</option><option>Itm-001</option><option>Itm-002</option><option>Serv-001</option><option>Serv-002</option></select><div class="input-group-append"><button class="ms-btn-icon btn-primary btn-sm" data-toggle="modal" data-target="#add_item_service"><i class="fa fa-plus"></i></button></div></div></td><td><input type="text" class="form-control" disabled="" style="background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="background-color: #f0f0fa;"></td><td><input type="number" class="form-control text-right" style="background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="background-color: #f0f0fa;"></td><td><input type="text" class="form-control" style="width: 100px; background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><label class="ms-switch"><input type="checkbox" checked=""><span class="ms-switch-slider ms-switch-success round text-center"></span></label></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><select class="form-control" style="width: 150px; background-color: #fff;"><option selected="selected">No Selected</option><option>Professional Fees</option><option>Director Fees</option><option>Contractors</option><option>Seller of Goods (Top 20k)</option><option>Commissions</option><option>Rentals</option><option>Cash dividends to individual</option></select></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><select class="form-control" style="width: 150px; background-color: #fff;"><option selected="selected">No Selected</option><option>Acc-001</option><option>Acc-002</option><option>Acc-003</option><option>Acc-004</option></select></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><button type="button" class="ms-btn-icon btn-danger" id="remove"><i class="fa fa-trash"></i></button></td></tr>');
  
           
    //     }else{
    //       counter = $('#table-achievements tr').length;
    //          $('tbody').append('<tr><td class="tdd tbl-td-'+counter+'">'+counter+'</td><td><div class="input-group mt-3"><select class="form-control js-example-basic-multiple" style=" background-color: #fff;"><option selected="selected">No Selected</option><option>Itm-001</option><option>Itm-002</option><option>Serv-001</option><option>Serv-002</option></select><div class="input-group-append"><button class="ms-btn-icon btn-primary btn-sm" data-toggle="modal" data-target="#add_item_service"><i class="fa fa-plus"></i></button></div></div></td><td><input type="text" class="form-control" disabled="" style="background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="background-color: #f0f0fa;"></td><td><input type="number" class="form-control text-right" style="background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="background-color: #f0f0fa;"></td><td><input type="text" class="form-control" style="width: 100px; background-color: #fff;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><label class="ms-switch"><input type="checkbox" checked=""><span class="ms-switch-slider ms-switch-success round text-center"></span></label></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><select class="form-control" style="width: 150px; background-color: #fff;"><option selected="selected">No Selected</option><option>Professional Fees</option><option>Director Fees</option><option>Contractors</option><option>Seller of Goods (Top 20k)</option><option>Commissions</option><option>Rentals</option><option>Cash dividends to individual</option></select></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><select class="form-control" style="width: 150px; background-color: #fff;"><option selected="selected">No Selected</option><option>Acc-001</option><option>Acc-002</option><option>Acc-003</option><option>Acc-004</option></select></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><input type="text" class="form-control" disabled="" style="width: 100px; background-color: #f0f0fa;"></td><td><button type="button" class="ms-btn-icon btn-danger" id="remove"><i class="fa fa-trash"></i></button></td></tr>');
    //     }
          
    //   });
    // ----- END ADD ROW -----

    // ----- OPEN ADD MODAL -----
    $("#btnBack").hide();
    $(document).on("click", "#btnAdd", function() {
        $("#transfer_Request_Breadcrumbs").text("Create New Transfer Request");
        $("#transfer_Request_Header").text("Create New Transfer Request");
        $("#btnAdd").hide();
        $("#btnBack").show();

        $("#table_content").html(preloader);
        setTimeout(() => {
            const content = formContent();
            $("#table_content").html(content);
            initAll();
        }, 500);
      
        
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_inventory_item");
    if (validate) {
        $("#modal_inventory_item").modal("hide");
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
                $("#modal_inventory_item").modal("show");
            }
        });
            
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#inventory_item_modalheader").text("VIEW ITEM");
        $("#modal_inventory_item").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_inventory_item_content").html(preloader); 

        const tableData = getTableData("inventory_item_tbl", "*", "userAccountID="+id, "");
        if (tableData) {
            const content = formContent(tableData);
            setTimeout(() => {
                $("#modal_inventory_item_content").html(content);
                $("#btnSaveConfirmationEdit").attr("accountid", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_inventory_item");
        if (validate) {
            $("#modal_inventory_item").modal("hide");
            
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
                    $("#modal_inventory_item").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modal_inventory_item").modal("hide");

        const data = getFormData("modal_inventory_item");

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
                        $("#modal_inventory_item").modal("show");
                    }
                  });
            }else{
                $("#modal_inventory_item").modal("hide");
            }
       
    });
    // -------- END CANCEL MODAL-----------

    // ------- BACK MODAL-------- 
    // $(document).on("click","#btnBack",function(){


    //     const data = getFormData("modal_inventory_item");

    //     var validate = false;
    //         for(var i of data.entries()) {
    //             const count =+i[1];
    //            validate[0] = i[1];
    //             if(i[1] !=""){
    //                 validate = true;
    //             }
    //         }

    //         if(validate == true){

    //             Swal.fire({
    //                 title: 'Are you sure?',
    //                 text: "You won't be able to revert this!",
    //                 imageUrl: `${base_url}assets/custom/isometric_image/questions.png`,
    //                 imageWidth: 200,
    //                 imageHeight: 200,
    //                 imageAlt: 'Custom image',
    //                 showCancelButton: true,
    //                 confirmButtonColor: '#28a745',
    //                 cancelButtonColor: '#1A1A1A',
    //                 confirmButtonText: 'Yes, discard!',
    //                 allowOutsideClick: false
    //               }).then((result) => {
    //                 if (result.isConfirmed) {

    //                 Swal.fire({
    //                     icon: 'success',
    //                     title: 'Changes successfully discard!',
    //                     showConfirmButton: false,
    //                     timer: 2000
    //                   })
    //                 }else{
    //                     $("#table_content").html(preloader);
    //                     setTimeout(() => {
    //                         const content = tableContent();
    //                         $("#table_content").html(content);
    //                         initAll();
    //                     }, 500);
    //                 }
    //               });
    //         }else{
    //             $("#table_content").html(preloader);
    //             setTimeout(() => {
    //                 const content = formContent();
    //                 $("#table_content").html(content);
    //                 initAll();
    //             }, 500);
    //         }
       
    // });
    // -------- END BACK MODAL-----------

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