$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(4);
	if(!allowedUpdate){
		$("#modal_inventory_asset_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

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
                { targets: 1, width: 150 },
                { targets: 2, width: 250 },
                { targets: 3, width: 150 },
                { targets: 4, width: 150 },
                { targets: 5, width: 80 },
                { targets: 6, width: 400 },
                { targets: 7, width: 150 },
                { targets: 8, width: 100 },
                { targets: 9, width: 100 },
                { targets: 10, width: 100 },
                { targets: 11, width: 150 },
                { targets: 12, width: 80 },
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
            data:     {tableName: "ims_inventory_asset_tbl as asset INNER JOIN ims_inventory_classification_tbl as classification USING(classificationID) INNER JOIN ims_inventory_category_tbl as category USING(categoryID)",
                        columnName: `CONCAT('AST','-',classification.classificationShortcut,'-',SUBSTR(asset.createdAt,3,2),'-',LPAD(asset.assetID, 5, '0')) as assetCode,
                                    asset.assetID,
                                    asset.assetName,
                                    asset.unitOfMeasurementID,
                                    asset.brandName,
                                    category.categoryName,
                                    classification.classificationName,
                                    asset.assetDescription,
                                    asset.reOrderLevel,
                                    asset.assetCost,
                                    asset.assetSalvageValue,
                                    asset.assetHourRate,
                                    asset.assetUsefulLife,
                                    asset.acquisitionDate,
                                    asset.assetStatus`,
                        tableWhere: "categoryStatus=1"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableInventoryItem">
                    <thead style="white-space:nowrap">
                        <tr>
                            <th>Asset Code</th>
                            <th>Asset Name</th>
                            <th>Asset Classification</th>
                            <th>Asset Category</th>
                            <th>UOM</th>
                            <th>Asset Description</th>
                            <th>Re-Order Level</th>
                            <th>Acquisition Date</th>
                            <th>Cost</th>
                            <th>Salvage Value</th>
                            <th>Hourly Rate</th>
                            <th>Estimated Useful Life (No. of Month)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((asset, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       asset.assetID, // Required
                        assetName: asset.assetName,
                        // email:    asset.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                   
                    if(asset.assetStatus == 1){
                       var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                    }   
                    if(asset.assetStatus == 0){
                       var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                    }
                    var unitOfMeasurementValue =  asset.unitOfMeasurementID; 
                    html += `
                    <tr
                    class="btnEdit" 
                    id="${asset.assetID}"
                    feedback="${asset.assetName}">
                        <td>${asset.assetCode}</td>
                        <td>
                            <div>
                                ${asset.assetName}
                            </div>
                            <small style="color:#848482;">${asset.brandName}</small>
                           
                        </td>
                        <td>${asset.classificationName}</td>
                        <td>${asset.categoryName}</td>
                        <td>${unitOfMeasurementValue.charAt(0).toUpperCase() + unitOfMeasurementValue.slice(1)}</td>
                        <td style="white-space: normal;">${asset.assetDescription}</td>
                        <td>${asset.reOrderLevel}</td>
                        <td>${moment(asset.acquisitionDate).format("MMMM DD, YYYY")}</td>
                        <td class="text-right">${formatAmount(asset.assetCost,true)}</td>
                        <td class="text-right">${formatAmount(asset.assetSalvageValue,true)}</td>
                        <td class="text-right">${formatAmount(asset.assetHourRate,true)}</td>
                        <td>${asset.assetUsefulLife}</td>
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

    // ----- STORAGE CONTENT -----
    function storageContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_storage_tbl", 
        "inventoryStorageID  ,inventoryStorageOfficeName", "inventoryStorageStatus=1", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Storage Code</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.inventoryStorageID}" ${param && item.inventoryStorageID  == param[0].inventoryStorageID  && "selected"}>${item.inventoryStorageOfficeName}</option>`;
            })
            $("#input_inventoryStorageID").html(html);
    }
    storageContent();
    // ----- END STORAGE CONTENT -----

    // ----- CLASSIFICATION CONTENT -----
    function classificationContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_classification_tbl", 
        "classificationID ,classificationName", "classificationStatus = 1", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Asset Classification</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.classificationID}" ${param && item.classificationID == param[0].classificationID && "selected"}>${item.classificationName}</option>`;
            })
            $("#input_classificationID").html(html);
    }
    classificationContent();
    // ----- END CLASSIFICATION CONTENT -----

    // -----CATEGORY CONTENT -----
    function categoryContent(condition = "add", param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let paramCondition = param == false ? "":" AND classificationID="+param;
    const data = getTableData("ims_inventory_category_tbl", "categoryID ,categoryName", "categoryStatus = '1'"+paramCondition, "");
        
            let html = ` <option value="" disabled ${condition == "add" ? "selected": ""}>Select Item Category</option>`;
            if(param != false){
                    data.map((item, index, array) => {
                    html += `<option value="${item.categoryID}" ${item.classificationID == param && condition != "add" ? "selected":""}>${item.categoryName}</option>`;
                })
            }
            $("#input_categoryID").html(html);
    }
    // categoryContent();
    // ----- END CATEGORY CONTENT -----

     // ----- DISPLAY EMPLOYEE SIGNATURE -----
     function displayFile(file = null, link = true) {
        let html = ``;
        if (file && file != null && file != "null") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/asset/"+file}" 
            target="_blank"` : `href="javascript:void(0)"`;
            html = `
            <div class="d-flex justify-content-start align-items-center p-0">
                <span class="btnRemoveFile pr-2" style="cursor: pointer"><i class="fas fa-close"></i></span>
                <a class="filename"
                    title="${file}"
                    style="display: block;
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;"
                    ${otherAttr}>
                    ${file}
                </a>
			</div>`
        }
        return html;
    }
    // ----- END DISPLAY EMPLOYEE SIGNATURE -----


	  // ----- DISPLAY IMAGE -----
      function displayImage(image = null, link = true) {
        let html = ``;
        if (image && image != null && image != "null" && image != "undefined") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/inventory-asset/"+image}" 
            target="_blank"` : `href="javascript:void(0)"`;
            html = `
            <div class="d-flex justify-content-start align-items-center p-0">
                <span class="btnRemoveImage pr-2" style="cursor: pointer"><i class="fas fa-close"></i></span>
                <a class="filename"
                    title="${image}"
                    style="display: block;
                    color: black;
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;"
                    ${otherAttr}>
                    ${image}
                </a>
			</div>`;
        }
        return html;
    }
    // ----- END DISPLAY IMAGE -----


    // ----- REMOVE IMAGE -----
    $(document).on("click", `.btnRemoveImage`, function() {
        $(`#displayImage`).empty();
        $(`[id="assetImage"]`).val("");
        $(`[id="assetImage"]`).removeAttr("file");
        $(`#displayImage`).css('display','none');
    })
    // ----- END REMOVE IMAGE -----


    // ----- SELECT IMAGE -----
    $(document).on("change", "[id=assetImage]", function(e) {
        e.preventDefault();
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;

            console.log(filetype);

            if (filesize > 10) {
                $(`#displayImage`).empty();
                $(`[name="assetImage"]`).val("");
                $(`[name="assetImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("image") == -1 && filetype.indexOf("jpeg") == -1 && filetype.indexOf("jpg") == -1 && filetype.indexOf("png") == -1) {
                $(`#displayImage`).empty();
                $(`[name="assetImage"]`).val("");
                $(`[name="assetImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "Invalid file type");
            } else {
                $("#assetImage").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-assetImage").text("");
                $(`#displayImage`).css('display','block');
                $(`#displayImage`).html(displayImage(filename, false));
                $(this).attr("file", filename);
            }
        }
    })
    // ----- END SELECT IMAGE -----

    // -- START COMPUTE MONTHLY DEPRECIATION AND HOURLY RATE --//
    $(document).on('keyup','#input_assetCost,#input_assetSalvageValue,#input_assetUsefulLife',function(){
        var getAssetCost = +parseFloat($("#input_assetCost").val().replaceAll(",",""));
        var getSalvageValue = +parseFloat($("#input_assetSalvageValue").val().replaceAll(",",""));
        var getEstimatedLife = +parseFloat($("#input_assetUsefulLife").val().replaceAll(",",""));
        var getMonthlyDepreciation = 0;
        var getHourlyRate = 0;

        getMonthlyDepreciation = (getAssetCost - getSalvageValue)/getEstimatedLife;

        getHourlyRate = getMonthlyDepreciation / 720;

        $("#input_assetDepreciation").val(getMonthlyDepreciation);
        $("#input_assetHourRate").val(getHourlyRate);

    })    
    // -- END COMPUTE MONTHLY DEPRECIATION AND HOURLY RATE --//

      // ----- MODAL CONTENT -----
      function modalContent(data = false) {
        let {
        assetCode              = "",
        assetID              = "",
        assetName            = "",
        reOrderLevel        = "",
        brandName           = "",
        assetDescription      = "",
        unitOfMeasurementID = "",
        assetProviderFee ="",
        assetCost = "",
        assetSalvageValue = "",
        assetHourRate = "",
        assetUsefulLife = "",
        acquisitionDate = new Date(),
        assetDepreciation="",
        assetStatus          = "",
        assetImage           = "",
        }= data && data[0];     
        // classificationContent(data);

        let disabled = assetID ? 'disabled ' : '';

        let button = assetID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${assetID}"
            feedback="${assetName}">
            <i class="fas fa-save"></i>
            Update
        </button>` : `
        <button 
            class="btn btn-save px-5 p-2" assetCode="${assetCode}"
            id="btnSave" ><i class="fas fa-save"></i>
            Save
        </button>`;
       
        let html = `
            <div class="modal-body">
                <div class="row">
               
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Brand Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="brandName" 
                                id="input_brandName" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                                minlength="2" 
                                maxlength="325" 
                                required 
                                unique="${assetID}" 
                                value="${brandName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_brandName"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Asset Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="assetName" 
                                id="input_assetName" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                                minlength="2" 
                                maxlength="325" 
                                required 
                                unique="${assetID}" 
                                value="${assetName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_assetName"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Asset Classification <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                id="input_classificationID" 
                                name="classificationID"
                                autocomplete="off"
                                ${disabled}
                                required>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Asset Category <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                            class="form-control select2 validate" 
                            id="input_categoryID" 
                            name="categoryID"
                            autocomplete="off"
                            ${disabled}
                            required>
                        </select>
                            <div class="invalid-feedback d-block" id="invalid-input_categoryID"></div>
                        </div>
                    </div>  

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Unit of Measurement <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                id="input_unitOfMeasurementID" 
                                name="unitOfMeasurementID"
                                autocomplete="off"
                                required>
                                ${unitOfMeasurementOptions(unitOfMeasurementID)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-unitOfMeasurementID"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Re-order Level <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="reOrderLevel" 
                                id="input_reOrderLevel" 
                                data-allowcharacters="[0-9]" 
                                minlength="1" 
                                maxlength="4" 
                                required 
                                value="${reOrderLevel}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_reOrderLevel"></div>
                        </div>
                    </div>

                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Asset Description <span class="text-danger font-weight-bold">*</span></label>
                            <textarea style="resize:none; white-space:wrap;" row="3" class="form-control validate" name="assetDescription" id="assetescription" 
                                    data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" minlength="2" maxlength="250" required >${assetDescription}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-inputAssetDescription"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="">Acquisition Date <strong class="text-danger">*</strong></label>
                            <input 
                                type="button" 
                                class="form-control validate text-left" 
                                name="acquisitionDate" 
                                id="inputacquisitionDate" 
                                data-allowcharacters="[A-Z][ ][,][a-z][0-9]" 
                                minlength="5" 
                                maxlength="20"
                                value="${moment(acquisitionDate).format("MMMM DD, YYYY")}"
                                unique
                                required>
                            <div class="invalid-feedback d-block" id="invalid-inputacquisitionDate"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <label>Rental Fee <span class="text-danger font-weight-bold">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                            class="form-control amount text-right"  
                            min="0" max="999999999"
                            minlength="1" 
                            maxlength="14"  
                            name="assetProviderFee" 
                            id="input_assetProviderFee" 
                            required
                            value="${assetProviderFee}" 
                            >
                            <div class="invalid-feedback d-block" id="invalid-input_assetProviderFee"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <label>Cost <span class="text-danger font-weight-bold">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                            class="form-control amount text-right"  
                            min="0.01" max="999999999"
                            minlength="1" 
                            maxlength="14" 
                            name="assetCost" 
                            id="input_assetCost" 
                            value="${assetCost}" 
                            required>
                            <div class="invalid-feedback d-block" id="invalid-input_assetCost"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <label>Salvage Value <span class="text-danger font-weight-bold">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                            class="form-control amount text-right"  
                            min="0.01" max="999999999"
                            minlength="1" 
                            maxlength="14" 
                            name="assetSalvageValue" 
                            id="input_assetSalvageValue" 
                            value="${assetSalvageValue}" 
                            required>
                            <div class="invalid-feedback d-block" id="invalid-input_assetSalvageValue"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Estimated Useful Life (No. of Month) <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="assetUsefulLife" 
                                id="input_assetUsefulLife" 
                                data-allowcharacters="[0-9]" 
                                minlength="1" 
                                maxlength="3" 
                                required 
                                value="${assetUsefulLife}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_assetUsefulLife"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Reference Image</label>
                            <input type="file"
                                class="form-control validate"
                                name="assetImage|inventory-asset"
                                id="assetImage"
                                file="${assetImage}"
                                accept=".png,.jpg, .jpeg,">
                            <div class="invalid-feedback d-block" id="invalid-assetImage"></div>
                            <div id="displayImage" style="${assetImage?'display:block;':'display:none;'} font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">${displayImage(assetImage)}</div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <label>Monthly Depreciation <span class="text-danger font-weight-bold">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                            class="form-control amount text-right"  
                            min="0.01" max="9999999"
                            minlength="1" 
                            maxlength="20" 
                            name="assetDepreciation" 
                            id="input_assetDepreciation" 
                            value="${assetDepreciation}" 
                            disabled>
                            <div class="invalid-feedback d-block" id="invalid-input_assetDepreciation"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <label>Hourly Rate <span class="text-danger font-weight-bold">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                            </div>
                            <input type="text" 
                            class="form-control amount text-right"  
                            min="0.01" max="9999999"
                            minlength="1" 
                            maxlength="20" 
                            name="assetHourRate" 
                            id="input_assetHourRate" 
                            value="${assetHourRate}" 
                            disabled>
                            <div class="invalid-feedback d-block" id="invalid-input_assetHourRate"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                id="input_assetStatus" 
                                name="assetStatus"
                                autocomplete="off"
                                >
                                <option 
                                    value="1" 
                                    ${data && assetStatus == "1" && "selected"} >Active</option>
                                <option 
                                    value="0" 
                                    ${data && assetStatus == "0" && "selected"}>Inactive</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-assetStatus"></div>
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
    

    // DATE PICKER //

    function datepicker(id = null, setdate = new Date()){
        $(`#${id}`).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: false,
            startDate: setdate,
            maxDate: new Date,
            locale: {
                format: 'MMMM DD, YYYY'
            },
        })
    }
    // DATE PICKER //

    //  FUNCTION FOR CHECK SALVAGE VALUE//
    function validateSalvageValue(){
        var getCost = +$("#input_assetCost").val().replaceAll(",","");
        var getSalvageValue = +$("#input_assetSalvageValue").val().replaceAll(",","");
        
        if(getCost < getSalvageValue ){
            $("#input_assetSalvageValue").removeClass("validated").removeClass("is-valid").addClass("is-invalid");
            $("#invalid-input_assetSalvageValue").text("Input a salvage value less than the cost.");
            $("#input_assetSalvageValue").focus();
            return false;
        }else{
            $("#input_assetSalvageValue").removeClass("validated").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_assetSalvageValue").text("");
            return true;
        }
    }

    //  VALIDATE THE SALVAGE VALUE AND COST
    $(document).on("change","#input_assetSalvageValue", function(){
        validateSalvageValue();
    });

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#inventory_asset_modalheader").text("ADD INVENTORY ASSET");
        $("#modal_inventory_asset").modal("show");
        $("#modal_inventory_asset_content").html(preloader);
        const content = modalContent();
        $("#modal_inventory_asset_content").html(content);
        storageContent();
        classificationContent();
        categoryContent();
        // initAll();
        initAmount();
        initSelect2();
        initDateRangePicker();
        datepicker("inputacquisitionDate");
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
       
         var getValidateSalvageValue = validateSalvageValue();
 

        if(getValidateSalvageValue){
            const validate = validateForm("modal_inventory_asset");
            const getClassificationID = $("#input_classificationID option:selected").val();
            if (validate) {

                let data = getFormData("modal_inventory_asset");
        
                const assetImage = $(`[id="assetImage"]`).val();
                if (!assetImage) {
                    let file = $(`[id="assetImage"]`).attr("file") ?? "";
                    data.append(`tableData[assetImage]`, file);
                }
        
        
                // data["tableData[itemCode]"]  = generateItemCode(data["tableData"]["classificationID"]);
                // data["tableData[createdBy]"] = sessionID;
                // data["tableData[updatedBy]"] = sessionID;
                // data["tableName"]            = "ims_inventory_asset_tbl";
                // data["feedback"]             = $("[name=assetName]").val();
        
                const generateCode = generateItemCode(getClassificationID,"asset");
                data.append("tableData[assetCode]", generateCode);
                data.append("tableData[createdBy]", sessionID);
                data.append("tableData[updatedBy]", sessionID);
        
                data.append("tableData[assetProviderFee]", +$("#input_assetProviderFee").val().replaceAll(",",""));
                data.append("tableData[assetCost]", +$("#input_assetCost").val().replaceAll(",",""));
                data.append("tableData[assetSalvageValue]", +$("#input_assetSalvageValue").val().replaceAll(",",""));
                data.append("tableData[assetHourRate]", +$("#input_assetHourRate").val().replaceAll(",",""));
                data.append("tableData[assetDepreciation]", +$("#input_assetDepreciation").val().replaceAll(",",""));
        
                data.append("tableName", "ims_inventory_asset_tbl");
                data.append("feedback", $("[name=assetName]").val()?.trim());
        
                    if(!generateCode){
                        let classificationName = $("#input_classificationID option:selected").text();
                        $("#modal_inventory_asset").find(".is-valid").removeClass("is-valid");
                        $("#modal_inventory_asset").find(".no-error").removeClass("no-error");
                        showNotification("warning2",`Set the classification (<strong>${classificationName}</strong>) of this asset first`);
                    }else{
                        sweetAlertConfirmation("add", "Company Asset", "modal_inventory_asset", null, data, false, tableContent); 
                    }
                }

        }
    
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#inventory_asset_modalheader").text("EDIT INVENTORY ASSET");
        $("#modal_inventory_asset").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_inventory_asset_content").html(preloader); 

        const tableData = getTableData("ims_inventory_asset_tbl", "*", "assetID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_inventory_asset_content").html(content);
                storageContent(tableData);
                classificationContent(tableData);
                categoryContent("edit",tableData[0].classificationID);
                $("#btnSaveConfirmationEdit").attr("accountid", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
                console.log(tableData[0].acquisitionDate)
                datepicker("inputacquisitionDate",new Date(tableData[0].acquisitionDate));
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {

        var getValidateSalvageValue = validateSalvageValue();
            
        if(getValidateSalvageValue){
        
                const rowID             = $(this).attr("rowID");
                const classificationID  = $(this).attr("classificationID");
                const validate = validateForm("modal_inventory_asset");
                if (validate) {

                    const classification = $(`[name="classificationID"]`).val();
                    const category       = $(`[name="categoryID"]`).val();


                let data = getFormData("modal_inventory_asset");
                // data["tableData[updatedBy]"] = sessionID;
                // data["tableName"]            = "ims_inventory_asset_tbl";
                // data["whereFilter"]          = "assetID=" + rowID;
                // data["feedback"]             = $("[name=assetName]").val();

                data.append("tableData[assetProviderFee]", +$("#input_assetProviderFee").val().replaceAll(",",""));
                data.append("tableData[assetCost]", +$("#input_assetCost").val().replaceAll(",",""));
                data.append("tableData[assetSalvageValue]", +$("#input_assetSalvageValue").val().replaceAll(",",""));
                data.append("tableData[assetHourRate]", +$("#input_assetHourRate").val().replaceAll(",",""));
                data.append("tableData[assetDepreciation]", +$("#input_assetDepreciation").val().replaceAll(",",""));

                data.append("tableData[updatedBy]", sessionID);
                data.append("tableName", "ims_inventory_asset_tbl");
                data.append("whereFilter", `assetID = ${rowID}`);
                data.append("feedback", $("[name=assetName]").val()?.trim());


                const assetImage = $(`[id="assetImage"]`).val();
                if (!assetImage) {
                    let file = $(`[id="assetImage"]`).attr("file") ?? "";
                    data.append(`tableData[assetImage]`, file);
                }



                // if(!classification && !category){
                //     let classificationName = $("#input_classificationID option:selected").text();
                //     $("#modal_inventory_item").find(".is-valid").removeClass("is-valid");
                //     $("#modal_inventory_item").find(".no-error").removeClass("no-error");
                //     showNotification("warning2",`Set the classification (<strong>${classificationName}</strong>) of this asset first`);
                    
                // }else{
                    sweetAlertConfirmation(
                        "update",
                        "Company Asset",
                        "modal_inventory_asset",
                        "",
                        data,
                        false,
                        tableContent
                    ); 
                // }
                
            
                }
        }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 

    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_inventory_asset");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Company Asset",
				"modal_inventory_asset"
			);
		} else {
			$("#modal_inventory_asset").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------
    
    $(document).on("change","#input_classificationID",function(){
        let thisValue   =   $(this).val();
        categoryContent("add", thisValue);
        initAll();
    });


  
});

