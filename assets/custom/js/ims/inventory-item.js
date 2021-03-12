$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableInventoryItem')){
            $('#tableInventoryItem').DataTable().destroy();
        }
        
        var table = $("#tableInventoryItem").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 100 },
                { targets: 2, width: 100 },
                { targets: 3, width: 150 },
                { targets: 4, width: 100 },
                { targets: 5, width: 200 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 100 },
                { targets: 9, width: 100 },
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
        const data = getTableData("ims_inventory_item_tbl", 
            "*, CONCAT('ITM-',SUBSTR(datecreated,3,2),'-',LPAD(itemID, 5, '0')) AS itemCode", "", "");

        // $.ajax({
        //     url:      `${base_url}operations/getTableData`,
        //     method:   'POST',
        //     async:    false,
        //     dataType: 'json',
        //     data:     {tableName: "ims_inventory_item_tbl"},
        //     beforeSend: function() {
        //         $("#table_content").html(preloader);
        //         // $("#inv_headerID").text("List of Inventory Item");
        //     },
            // success: function(data) {
            //     console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableInventoryItem">
                    <thead>
                        <tr class="text-center">
                            <th>Item No.</th>
                            <th>Storage Name</th>
                            <th>Item Name</th>
                            <th>Item Category</th>
                            <th>Item Classification</th>
                            <th>Item Size</th>
                            <th>VAT</th>
                            <th>Re-Order Level</th>
                            <th>Base Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.itemID, // Required
                        username: item.itemName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    html += `
                    <tr>
                        <td>${item.itemCode}</td>
                        <td>${item.storage}</td>
                        <td>${item.itemName}</td>
                        <td>${item.itemClassification}</td>
                        <td>${item.itemCategory}</td>
                        <td>${item.itemSize}</td>
                        <td>${item.vatType}</td>
                        <td>${item.reOrderLevel}</td>
                        <td>${item.basePrice}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.itemID}"
                                feedback="${item.itemName}">
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
            // error: function() {
            //     let html = `
            //         <div class="w-100 h5 text-center text-danger>
            //             There was an error fetching data.
            //         </div>`;
            //     $("#table_content").html(html);
            // }
        // })
    }
    tableContent();
    // ----- END TABLE CONTENT -----

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let itemID              = data ? (data[0].itemID            ? data[0].itemID        : "") : "",
        storage             = data ? (data[0].storage       ? data[0].storage   : "") : "",
        itemName                = data ? (data[0].itemName          ? data[0].itemName      : "") : "",
        itemClassification      = data ? (data[0].itemClassification? data[0].itemClassification         : "") : "",
        itemCategory            = data ? (data[0].itemCategory      ? data[0].itemCategory  : "") : "",
        itemSize                = data ? (data[0].itemSize          ? data[0].itemSize      : "") : "",
        vatType                 = data ? (data[0].vatType           ? data[0].vatType       : "") : "",
        reOrderLevel            = data ? (data[0].reOrderLevel      ? data[0].reOrderLevel  : "") : "",
        basePrice               = data ? (data[0].basePrice         ? data[0].basePrice     : "") : "";
          
        let button = itemID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${itemID}"
            feedback="${itemName}">
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
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Storage Code<span class="text-danger font-weight-bold">*</span></label>
                            <select 
                            class="form-control select2 validate" 
                            id="input_storage" 
                            name="storage"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled
                                selected
                                ${!data && "selected"} >No Selected</option>
                            <option 
                                value="Warehouse1" 
                                ${data && storage == "Warehouse1" && "selected"}>Warehouse1</option>
                            <option 
                                value="Warehouse2" 
                                ${data && storage == "Warehouse2" && "selected"}>Warehouse2</option>
                        </select>
                            <div class="invalid-feedback d-block" id="invalid-input_storage"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Item Name<span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="itemName" 
                                id="input_itemName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="20" 
                                required 
                                value="${itemName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_itemName"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Item Classification<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_itemClassification" 
                            name="itemClassification"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>
                            <option 
                                value="A" 
                                ${data && itemClassification == "A" && "selected"}>A</option>
                            <option 
                                value="B" 
                                ${data && itemClassification == "B" && "selected"} >B</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_itemClassification"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Item Category<span class="text-danger font-weight-bold">*</span></label>
                    <select 
                    class="form-control select2 validate" 
                    id="input_itemCategory" 
                    name="itemCategory"
                    autocomplete="off"
                    required>
                    <option 
                        value="" 
                        disabled 
                    selected
                    ${!data && "selected"} >No Selected</option>
                    <option 
                        value="Office Supplies" 
                        ${data && itemCategory == "Office Supplies" && "selected"} >Office Supplies</option>
                    <option 
                        value="Warehouse Supplies" 
                        ${data && itemCategory == "Warehouse Supplies" && "selected"} >Warehouse Supplies</option>
                </select>
                    <div class="invalid-feedback d-block" id="invalid-input_itemCategory"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
            <div class="form-group">
                <label>Item Size<span class="text-danger font-weight-bold">*</span></label>
                <select 
                    class="form-control select2 validate" 
                    id="input_itemSize" 
                    name="itemSize"
                    autocomplete="off"
                    required>
                    <option 
                        value="" 
                        disabled 
                        selected
                        ${!data && "selected"} >No Selected</option>
                    <option 
                        value="ExtraSmall" 
                        ${data && itemSize == "ExtraSmall" && "selected"} > ExtraSmall</option>
                    <option 
                        value="Small" 
                        ${data && itemSize == "Small" && "selected"} >Small</option>
                    <option 
                        value="Medium" 
                        ${data && itemSize == "Medium" && "selected"}  >Medium</option>
                    <option 
                        value="Large" 
                        ${data && itemSize == "Large" && "selected"} >Large</option>
                    <option 
                        value="Extra Large" 
                        ${data && itemSize == "Extra Large" && "selected"}  >Extra Large</option>
                </select>
                <div class="invalid-feedback d-block" id="invalid-input_itemSize"></div>
            </div>
        </div>

        <div class="col-md-6 col-sm-12">
            <div class="form-group">
                <label>Vat Type<span class="text-danger font-weight-bold">*</span></label>
                <select 
                    class="form-control select2 validate" 
                    id="input_vatType" 
                    name="vatType"
                    autocomplete="off"
                    
                    required>
                    <option 
                        value="" 
                        disabled 
                        selected
                        ${!data && "selected"}>No Selected</option>
                    <option 
                        value="Vatable" 
                        ${data && vatType == "Vatable" && "selected"}  > Vatable</option>
                    <option 
                        value="Non-Vatable" 
                        ${data && vatType == "Non-Vatable" && "selected"}  >Non-Vatable</option>
                   
                </select>
                <div class="invalid-feedback d-block" id="invalid-input_vatType"></div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Re-order Level<span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="reOrderLevel" 
                                id="input_reOrderLevel" 
                                data-allowcharacters="[0-9]" 
                                minlength="1" 
                                maxlength="20" 
                                required 
                                value="${reOrderLevel}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_reOrderLevel"></div>
                        </div>
                    </div>
                   
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                        <label>Unit Price<span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate amount" 
                                name="basePrice" 
                                id="input_basePrice" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ]" 
                                minlength="2" 
                                maxlength="20"  
                                min="-100"
                                max="100000"
                                required
                                value="${basePrice}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_basePrice"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel px-5 p-2 btnCancel"><i class="fas fa-ban"></i> CANCEL</button>
            </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT -----

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#inventory_item_modalheader").text("ADD ITEM");
        $("#modal_inventory_item").modal("show");
        $("#modal_inventory_item_content").html(preloader);
        const content = modalContent();
        $("#modal_inventory_item_content").html(content);
        initAll();
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

            /**
             * ----- FORM DATA -----
             * tableData = {} -> Objects
             */
            let data = getFormData("modal_inventory_item");
            data.append("tableName", "ims_inventory_item_tbl");
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

        const tableData = getTableData("ims_inventory_item_tbl", "*", "itemID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
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
    
                    const rowID = $(this).attr("rowID");
                    const feedback  = $(this).attr("feedback");
        
                    let data = getFormData("modal_inventory_item");
                    data.append("tableName", "ims_inventory_item_tbl");
                    data.append("whereFilter", "itemID="+rowID);
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
            //     whereFilter: "itemID="+accountID,
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