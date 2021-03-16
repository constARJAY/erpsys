 
 $(document).ready(function() {

   /*  $('.select2').select2({
      theme: "bootstrap"
    });*/

                // ----- DATATABLES -----
        function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableUserAccount')){
                $('#tableUserAccount').DataTable().destroy();
            }
            
            var table = $("#tableUserAccount").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 100 },
                    { targets: 1, width: 200 },
                    { targets: 2, width: 100 },
                    { targets: 3, width: 250 },
                    { targets: 4, width: 100 },
                    { targets: 5, width: 150 }, 
                    { targets: 6, width: 200 },
                    { targets: 7, width: 100 },
                    { targets: 8, width: 100 },
                    { targets: 9, width: 90 },
                    { targets: 10, width: 120 },
                    { targets: 11, width: 100 },
                    { targets: 13, width: 100 },
                    { targets: 14, width: 50 },
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
                data:     {tableName: "ims_inventory_storage_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableUserAccount">
                        <thead>
                            <tr class="text-center">
                                <th>Number</th>
                                <th>Office Name</th>
                                <th>Unit Number</th>
                                <th>Building/House Number</th>
                                <th>Street Name</th>
                                <th>Subdivision Name</th>
                                <th>Barangay</th>
                                <th>City/Municipality</th>
                                <th>State/Province</th>
                                <th>Country</th>
                                <th>Zip Code</th>
                                <th>Room Type</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;
                         data.map((item, index, array) => {
                            if(item.inventoryStorageStatus=="0"){
                                var activestatus ="Active";
                            }else{
                                 var activestatus ="Inactive";
                            }
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:                                 item.inventoryStorageID , // Required
                            multiple: {
                            inventoryStorageOfficeName:         item.inventoryStorageOfficeName, // Required
                            inventoryStorageUnitNumber:         item.inventoryStorageUnitNumber,
                            }
                        }
                        uniqueData.push(unique);


                        html += `
                        <tr>
                           <td>${item.inventoryStorageID }</td>
                           <td>${item.inventoryStorageOfficeName}</td>
                           <td>${item.inventoryStorageUnitNumber}</td>
                           <td>${item.inventoryStorageHouseNumber}</td>
                           <td>${item.inventoryStorageStreetName}</td>
                           <td>${item.inventoryStorageSubdivisionName}</td>
                           <td>${item.inventoryStorageBarangay}</td>
                           <td>${item.inventoryStorageMunicipality}</td>
                           <td>${item.inventoryStorageProvince}</td>
                           <td>${item.inventoryStorageCountry}</td>
                           <td>${item.inventoryStorageZipCode}</td>
                           <td>${item.inventoryStorageRoomType}</td>
                           <td>${item.inventoryStorageDepartment}</td>
                           <td>${activestatus}</td>
                           <td>
                           <button 
                                class="btn btn-primary btnEdit" 
                                id="${item.inventoryStorageID}"
                                feedback="${item.inventoryStorageOfficeName}">
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

                // ----- MODAL CONTENT -----
        function modalContent(data = false) {
            let inventoryStorageID = data ? (data[0].inventoryStorageID ? data[0].inventoryStorageID : "") : "",
                inventoryStorageOfficeName = data ? (data[0].inventoryStorageOfficeName   ? data[0].inventoryStorageOfficeName  : "") : "",
                inventoryStorageUnitNumber  = data ? (data[0].inventoryStorageUnitNumber    ? data[0].inventoryStorageUnitNumber   : "") : "",
                inventoryStorageHouseNumber     = data ? (data[0].inventoryStorageHouseNumber       ? data[0].inventoryStorageHouseNumber      : "") : "",
                inventoryStorageStreetName    = data ? (data[0].inventoryStorageStreetName      ? data[0].inventoryStorageStreetName     : "") : "",
                inventoryStorageSubdivisionName = data ? (data[0].inventoryStorageSubdivisionName   ? data[0].inventoryStorageSubdivisionName  : "") : "",
                inventoryStorageBarangay   = data ? (data[0].inventoryStorageBarangay     ? data[0].inventoryStorageBarangay    : "") : "",
                inventoryStorageMunicipality    = data ? (data[0].inventoryStorageMunicipality      ? data[0].inventoryStorageMunicipality     : "") : "",
                inventoryStorageProvince      = data ? (data[0].inventoryStorageProvince        ? data[0].inventoryStorageProvince       : "") : "",
                inventoryStorageCountry  = data ? (data[0].inventoryStorageCountry    ? data[0].inventoryStorageCountry   : "") : "",
                inventoryStorageZipCode      = data ? (data[0].inventoryStorageZipCode        ? data[0].inventoryStorageZipCode       : "") : "",
                inventoryStorageRoomType  = data ? (data[0].inventoryStorageRoomType    ? data[0].inventoryStorageRoomType   : "") : "",
                inventoryStorageDepartment  = data ? (data[0].inventoryStorageDepartment    ? data[0].inventoryStorageDepartment   : "") : "",
                inventoryStorageStatus  = data ? (data[0].inventoryStorageStatus    ? data[0].inventoryStorageStatus   : "") : "";
                let userAccountID = '';

            let button = inventoryStorageID  ? `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnUpdate" 
                rowID="${inventoryStorageID}">
                UPDATE
            </button>` : `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnSave">
                SAVE
            </button>`;

            let html = `
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Office Name <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageOfficeName" 
                                    id="input_officename"
                                    minlength="2" 
                                    minlength="50"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                     value="${inventoryStorageOfficeName}"unique="${inventoryStorageID}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_officenamee"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Unit Number <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageUnitNumber" 
                                    id="input_unitnumber"
                                    minlength="2" 
                                    minlength="50"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageUnitNumber}"unique="${inventoryStorageID}"  
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_unitnumber"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Building/House Number <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageHouseNumber" 
                                    id="input_housenumber"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageHouseNumber}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_house_Number"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Street Name  <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageStreetName" 
                                    id="input_streetname"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageStreetName}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_street_Name"></div>
                            </div>
                        </div>
                         <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Subdivision Name <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageSubdivisionName" 
                                    id="input_subdivisionname"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageSubdivisionName}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_subdivision_Name"></div>
                            </div>
                        </div>
                         <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Barangay <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageBarangay" 
                                    id="input_barangay"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageBarangay}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_barangay"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">City/Municipality <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageMunicipality" 
                                    id="input_municipality"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][ ]"
                                    value="${inventoryStorageMunicipality}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_municipality"></div>
                            </div>
                        </div>
                         <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">State/Province <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageProvince" 
                                    id="input_province"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][ ]" 
                                    value="${inventoryStorageProvince}"
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_province"></div>
                            </div>
                        </div>
                         <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Country <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageCountry" 
                                    id="input_country"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][ ]"
                                    value="${inventoryStorageCountry}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_country"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Zip Code <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageZipCode" 
                                    id="input_zipcode"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[0-9]" 
                                    value="${inventoryStorageZipCode}"
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_zipcode"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Room Type </label>
                                <input 
                                    type="text" 
                                    class="form-control validate" 
                                    name="inventoryStorageRoomType" 
                                    id="input_roomType"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageRoomType}">  
                               
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Department </label>
                                <input 
                                    type="text" 
                                    class="form-control validate" 
                                    name="inventoryStorageDepartment" 
                                    id="input_department"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                     value="${inventoryStorageDepartment}"> 
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                         <label for="">Status</label>
                        <select
                            class="form-control select2 validate" 
                                    name="inventoryStorageStatus" 
                                    id="input_storage_status" 
                                    required>
                                <option
                                    value="" 
                                    disabled 
                                    ${!data && "selected"}>Select Status</option>
                                <option 
                                    value="0" 
                                    ${data && inventoryStorageStatus == "0" && "selected"}>Active</option>
                                <option 
                                    value="1" 
                                    ${data && inventoryStorageStatus == "1" && "selected"}>Inactive</option>
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_storage_status"></div>
                             </div>
                           </div>   
                    </div>
                    </div>
                <div class="modal-footer">
                    ${button}
                    <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
                </div>`;
            return html;
        } 


     $(document).on("click", "#btnAdd", function() {
            $("#modal_inventory_storage").modal("show");
            $("#modal_inventory_storage_content").html(preloader);
            const content = modalContent();
            $("#modal_inventory_storage_content").html(content);
            initAll();
     });

     // ----- SAVE ADD -----
        $(document).on("click", "#btnSave", function() {
            const validate = validateForm("modal_inventory_storage");
            if (validate) {
                $("#modal_inventory_storage").modal("hide");
                $("#confirmation-modal_add_inventory_storage").modal("show");
            }
        });
        // ----- END SAVE ADD -----

        // ----- SAVE CONFIRMATION ADD -----
        $(document).on("click", "#btnSaveConfirmationAdd", function() {
            /**
             * ----- FORM DATA -----
             * tableData = {} -> Objects
             */
            let data = getFormData("modal_inventory_storage");
            data.append("tableName", "ims_inventory_storage_tbl");
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
        })

           // ----- OPEN EDIT MODAL -----
        $(document).on("click", ".btnEdit", function() {
            const id       = $(this).attr("id");
            const feedback = $(this).attr("feedback");
            $("#modal_inventory_storage").modal("show");

            // Display preloader while waiting for the completion of getting the data
            $("#modal_inventory_storage_content").html(preloader); 

            const tableData = getTableData("ims_inventory_storage_tbl", "*", "inventoryStorageID="+id, "");
            if (tableData) {
                const content = modalContent(tableData);
                setTimeout(() => {
                    $("#modal_inventory_storage_content").html(content);
                    $("#btnSaveConfirmationEdit").attr("storageid", id);
                    $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                    initAll();
                }, 500);
            }
        });
         $(document).on("click", "#btnUpdate", function() {
            const validate = validateForm("modal_inventory_storage");
            if (validate) {
                $("#modal_inventory_storage").modal("hide");
                $("#confirmation-modal_edit_inventory_storage").modal("show");
            }
        }); 

          // ----- SAVE CONFIRMATION EDIT -----
        $(document).on("click", "#btnSaveConfirmationEdit", function() {
            const storageID = $(this).attr("storageid");
            const feedback  = $(this).attr("feedback");

            let data = getFormData("modal_inventory_storage");
            data.append("tableName", "ims_inventory_storage_tbl");
            data.append("whereFilter", "inventoryStorageID="+storageID);
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
        })
       
    });
