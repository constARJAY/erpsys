$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(4);
	if(!allowedUpdate){
		$("#modal_inventory_item_content").find("input, select, textarea").each(function(){
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
                { targets: 4, width: 80  },
                { targets: 5, width: 400 },
                { targets: 6, width: 150 },
                { targets: 7, width: 80  },
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
            data:     {tableName: "ims_inventory_item_tbl as item INNER JOIN ims_inventory_classification_tbl as classification USING(classificationID) INNER JOIN ims_inventory_category_tbl as category USING(categoryID)",
                        columnName: `CONCAT('ITM','-',classification.classificationShortcut,'-',SUBSTR(item.createdAt,3,2),'-',LPAD(item.itemID, 5, '0')) as itemCode,
                                    item.itemID,
                                    item.itemName,
                                    item.unitOfMeasurementID,
                                    item.brandName,
                                    category.categoryName,
                                    classification.classificationName,
                                    item.itemSize,
                                    item.itemDescription,
                                    item.reOrderLevel,
                                    item.itemStatus`,
                        tableWhere: "categoryStatus=1"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableInventoryItem">
                    <thead style="white-space:nowrap">
                        <tr>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Item Classification</th>
                            <th>Item Category</th>
                            <th>UOM</th>
                            <th>Item Description</th>
                            <th>Re-Order Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.itemID, // Required
                        itemName: item.itemName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                   
                    if(item.itemStatus == 1){
                       var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                    }   
                    if(item.itemStatus == 0){
                       var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                    }
                    var unitOfMeasurementValue =  item.unitOfMeasurementID; 
                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.itemID}"
                    feedback="${item.itemName}">
                        <td>${item.itemCode}</td>
                        <td>
                            <div>
                                ${item.itemName}
                            </div>
                            <small style="color:#848482;">${item.brandName}</small>
                           
                        </td>
                        <td>${item.classificationName}</td>
                        <td>${item.categoryName}</td>
                        <td>${unitOfMeasurementValue.charAt(0).toUpperCase() + unitOfMeasurementValue.slice(1)}</td>
                        <td style="white-space: normal;">${item.itemDescription}</td>
                        <td>${item.reOrderLevel}</td>
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
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Item Classification</option>`;
            let disabled = false;
            data.map((item, index, array) => {
                let isEqual = param && item.classificationID == param[0].classificationID;
                if (isEqual) disabled = true;
                html += `<option value="${item.classificationID}" ${isEqual && "selected"}>${item.classificationName}</option>`;
            })
            if (disabled) {
                $("#input_classificationID").attr("disabled", true);
                $("#input_classificationID").parent().find(`span.text-danger`).remove();
            }
            $("#input_classificationID").html(html);
    }
    classificationContent();
    // ----- END CLASSIFICATION CONTENT -----


    // -----CATEGORY CONTENT -----
    function categoryContent(condition = "add", inClassificationID = false, inCategoryID = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let classificationCondition = inClassificationID == false ? "":" AND classificationID="+inClassificationID;
    let categoryCondition = inCategoryID == false ? "":" AND categoryID="+inCategoryID;
    const data = getTableData("ims_inventory_category_tbl", "categoryID ,categoryName", "categoryStatus = '1'"+classificationCondition+categoryCondition);
        
            let html = ` <option value="" disabled ${condition == "add" ? "selected": ""}>Select Item Category</option>`;
            let disabled = false;
            if(inClassificationID != false){
                    data.map((item, index, array) => {
                    let isEqual = item.categoryID == inCategoryID && condition != "add";
                    if (isEqual) disabled = true;
                    html += `<option value="${item.categoryID}" ${isEqual ? "selected":""}>${item.categoryName}</option>`;
                })
            }
            if (disabled) {
                $("#input_categoryID").attr("disabled", true);
                $("#input_categoryID").parent().find(`span.text-danger`).remove();
            }
            $("#input_categoryID").html(html);
    }
    // categoryContent();
    // ----- END CATEGORY CONTENT -----


    // ----- DISPLAY IMAGE -----
    function displayImage(image = null, link = true) {
        let html = ``;
        if (image && image != null && image != "null" && image != "undefined") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/inventory-items/"+image}" 
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
        $(`[id="itemImage"]`).val("");
        $(`[id="itemImage"]`).removeAttr("file");
        $(`#displayImage`).css('display','none');
    })
    // ----- END REMOVE IMAGE -----


    // ----- SELECT IMAGE -----
    $(document).on("change", "[id=itemImage]", function(e) {
        e.preventDefault();
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;

            console.log(filetype);

            if (filesize > 10) {
                $(`#displayImage`).empty();
                $(`[name="itemImage"]`).val("");
                $(`[name="itemImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("image") == -1 && filetype.indexOf("jpeg") == -1 && filetype.indexOf("jpg") == -1 && filetype.indexOf("png") == -1) {
                $(`#displayImage`).empty();
                $(`[name="itemImage"]`).val("");
                $(`[name="itemImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "Invalid file type");
            } else {
                $("#itemImage").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-itemImage").text("");
                $(`#displayImage`).css('display','block');
                $(`#displayImage`).html(displayImage(filename, false));
                $(this).attr("file", filename);
            }
        }
    })
    // ----- END SELECT IMAGE -----


     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let {
            itemID              = "",
            inventoryStorageID  = "",
            itemName            = "",
            classificationID    = "",
            categoryID          = "",
            itemSize            = "",
            vatType             = "",
            reOrderLevel        = "",
            basePrice           = "",
            brandName           = "",
            itemDescription     = "",
            itemImage           = "",
            unitOfMeasurementID = "",
            itemStatus          = ""
        }= data && data[0];     
        // classificationContent(data);
        let button = itemID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${itemID}"
            classificationID="${classificationID}"
            feedback="${itemName}">
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
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Brand Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="brandName" 
                                id="input_brandName" 
                                data-allowcharacters="[.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                                minlength="2" 
                                maxlength="100" 
                                required 
                                unique="${itemID}" 
                                value="${brandName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_brandName"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Item Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="itemName" 
                                id="input_itemName" 
                                data-allowcharacters="[.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                                minlength="2" 
                                maxlength="100" 
                                required 
                                unique="${itemID}" 
                                value="${itemName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_itemName"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Item Classification <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                style="width: 100%"
                                id="input_classificationID" 
                                name="classificationID"
                                autocomplete="off"
                                required>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Item Category <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                            class="form-control select2 validate" 
                            style="width: 100%"
                            id="input_categoryID" 
                            name="categoryID"
                            autocomplete="off"
                            required>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_categoryID"></div>
                        </div>
                    </div>
                    <!--
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label>Item Size <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                style="width: 100%"
                                id="input_itemSize" 
                                name="itemSize"
                                autocomplete="off"
                                required>
                                <option 
                                    value="" 
                                    disabled 
                                    selected
                                    ${!data && "selected"} >Select Item Size</option>
                                <option 
                                    value="" 
                                    ${data && itemSize == "N/A" && "selected"} > N/A</option>
                                <option 
                                    value="Extra Small" 
                                    ${data && itemSize == "Extra Small" && "selected"} > Extra Small</option>
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
                    -->
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Unit of Measurement <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                style="width: 100%"
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
                                maxlength="20" 
                                required 
                                value="${reOrderLevel}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_reOrderLevel"></div>
                        </div>
                    </div>
                    
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Item Description <span class="text-danger font-weight-bold">*</span></label>
                            <textarea style="resize:none; white-space:wrap;" row="3" class="form-control validate" name="itemDescription" id="inputItemDescription" 
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][?][*][!][#][%][&][ ]" minlength="2" maxlength="250" required >${itemDescription}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-inputItemDescription"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Reference Image</label>
                            <input type="file"
                                class="form-control validate"
                                name="itemImage|inventory-items"
                                id="itemImage"
                                file="${itemImage}">
                            <div class="invalid-feedback d-block" id="invalid-itemImage"></div>
                            <div id="displayImage" style="${itemImage?'display:block;':'display:none;'} font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">${displayImage(itemImage)}</div>
                        </div>
                    </div>
                    
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select 
                                class="form-control select2 validate" 
                                id="input_itemStatus" 
                                name="itemStatus"
                                autocomplete="off"
                                style="width: 100%"
                                >
                                <option 
                                    value="1" 
                                    ${data && itemStatus == "1" && "selected"} >Active</option>
                                <option 
                                    value="0" 
                                    ${data && itemStatus == "0" && "selected"}>Inactive</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-itemStatus"></div>
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

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#inventory_item_modalheader").text("ADD INVENTORY ITEM");
        $("#modal_inventory_item").modal("show");
        $("#modal_inventory_item_content").html(preloader);
        const content = modalContent();
        $("#modal_inventory_item_content").html(content);
        storageContent();
        classificationContent();
        categoryContent();
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_inventory_item");
        if (validate) {
        
            const classificationID = $(`[name="classificationID"]`).val();
            const itemCode = generateItemCode(classificationID);

            let data = getFormData("modal_inventory_item");
            data.append(`tableData[createdBy]`, sessionID);
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableData[itemCode]`, itemCode);
            data.append(`tableName`, `ims_inventory_item_tbl`);
            data.append(`feedback`, $("[name=itemName]").val()?.trim());
            
            const itemImage = $(`[id="itemImage"]`).val();
            if (!itemImage) {
                let file = $(`[id="itemImage"]`).attr("file") ?? "";
                data.append(`tableData[itemImage]`, file);
            }

            if(!itemCode) {
                let classificationName = $("#input_classificationID option:selected").text();
                $("#modal_inventory_item").find(".is-valid").removeClass("is-valid");
                $("#modal_inventory_item").find(".no-error").removeClass("no-error");
                showNotification("warning2",`Set the classification (<strong>${classificationName}</strong>) of this item first`);
            } else {
                sweetAlertConfirmation("add", "Inventory Item", "modal_inventory_item", null, data, false, tableContent); 
            }
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#inventory_item_modalheader").text("EDIT INVENTORY ITEM");
        $("#modal_inventory_item").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_inventory_item_content").html(preloader); 

        const tableData = getTableData("ims_inventory_item_tbl", "*", "itemID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_inventory_item_content").html(content);
                storageContent(tableData);
                classificationContent(tableData);
                categoryContent("edit",tableData[0].classificationID, tableData[0].categoryID);
                $("#btnSaveConfirmationEdit").attr("accountid", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const rowID             = $(this).attr("rowID");
        const classificationID  = $(this).attr("classificationID");
        const validate = validateForm("modal_inventory_item");
        if (validate) {

            // if(data["tableData[classificationID]"] != classificationID){
            //     data["tableData[itemCode]"]  = generateItemCode(data["tableData[classificationID]"]);
            // }

            const classification = $(`[name="classificationID"]`).val();
            const category       = $(`[name="categoryID"]`).val();

            let data = getFormData("modal_inventory_item");
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableName`, `ims_inventory_item_tbl`);
            data.append(`whereFilter`, `itemID = ${rowID}`);
            data.append(`feedback`, $("[name=itemName]").val()?.trim());

            // let file = $(`[id="itemImage"]`).attr("file") ?? "";
            // data.append(`tableData[itemImage]`, file);

            const itemImage = $(`[id="itemImage"]`).val();
            if (!itemImage) {
                let file = $(`[id="itemImage"]`).attr("file") ?? "";
                data.append(`tableData[itemImage]`, file);
            }

            if(!classification && !category){
                let classificationName = $("#input_classificationID option:selected").text();
                $("#modal_inventory_item").find(".is-valid").removeClass("is-valid");
                $("#modal_inventory_item").find(".no-error").removeClass("no-error");
                showNotification("warning2",`Set the classification (<strong>${classificationName}</strong>) of this item first`);
                
            }else{
                sweetAlertConfirmation(
                    "update",
                    "Inventory Item",
                    "modal_inventory_item",
                    "",
                    data,
                    false,
                    tableContent
                ); 
            }
			
        
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 

    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_inventory_item");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Inventory Item",
				"modal_inventory_item"
			);
		} else {
			$("#modal_inventory_item").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------
    
    $(document).on("change","#input_classificationID",function(){
        let thisValue   =   $(this).val();
        categoryContent("add", thisValue);
        initAll();
    });


  
});

