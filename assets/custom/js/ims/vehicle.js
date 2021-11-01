$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

const allowedUpdate = isUpdateAllowed(135);
if(!allowedUpdate){
    $("#modal_vehicle_content").find("input, select, textarea").each(function(){
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
        lengthMenu: [ 50, 75, 100, 150],
        columnDefs: [
            { targets: 0, width: 100 },
            { targets: 1, width: 150 },
            { targets: 2, width: 250 },
            { targets: 3, width: 150 },
            { targets: 4, width: 150 },
            { targets: 5, width: 150 },
            { targets: 6, width: 80 },
           
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
        data:     {tableName: "ims_inventory_vehicle_tbl ",
                    columnName: `CONCAT('VHL','-',SUBSTR(createdAt,3,2),'-',LPAD(vehicleID, 5, '0')) as vehicleCode,
                    vehicleID,
                    vehicleName,
                    vehiclePlateNumber,
                    vehicleGasType,
                    vehicleFuelConsumption,
                    vehicleStatus,
                    vehicleHourRate,
                    vehicleProviderFee,
                    createdAt
                    `,
                    tableWhere: "vehicleStatus=1"},
        beforeSend: function() {
            $("#table_content").html(preloader);
            // $("#inv_headerID").text("List of Vehicle");
        },
        success: function(data) {
            console.log(data);
            let html = `
            <table class="table table-bordered table-striped table-hover nowrap" id="tableInventoryItem">
                <thead style="white-space:nowrap">
                    <tr>
                        <th>Vehicle Code</th>
                        <th>Vehicle</th>
                        <th>Plate Number/Conduction Number</th>
                        <th>Fuel Type</th>
                        <th>Hourly Rate</th>
                        <th>Rental Fee</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>`;

            data.map((item, index, array) => {
                // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                let unique = {
                    id:       item.vehicleID, // Required
                    vehiclePlateNumber: item.vehiclePlateNumber,
                    // email:    item.email,
                }
                uniqueData.push(unique);
                // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
               
                if(item.vehicleStatus == 1){
                   var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                }   
                if(item.vehicleStatus == 0){
                   var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                }

                if(item.vehicleGasType == 1){
                    var gasType=`<label>Gasoline</label>`;
                 }   
                 if(item.vehicleGasType == 2){
                    var gasType=`<label>Diesel</label>`;
                 }
             
                html += `
                <tr
                class="btnEdit" 
                id="${item.vehicleID}"
                feedback="${item.vehicleName}">
                    <td>${item.vehicleCode}</td>
                    <td>${item.vehicleName}</td>
                    <td class="text-center">${item.vehiclePlateNumber}</td>
                    <td>
					<div>
						${item.vehicleFuelConsumption} km/L
					</div>
					<small style="color:#848482;">${gasType}</small>
				</td>
                <td class="text-right">${formatAmount(item.vehicleHourRate,true)}</td>
                <td class="text-right">${formatAmount(item.vehicleProviderFee,true)}</td>
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

  // ----- DISPLAY IMAGE -----
      function displayImage(image = null, link = true) {
        let html = ``;
        if (image && image != null && image != "null" && image != "undefined") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/inventory-vehicle/"+image}" 
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
        $(`[id="vehicleImage"]`).val("");
        $(`[id="vehicleImage"]`).removeAttr("file");
        $(`#displayImage`).css('display','none');
    })
    // ----- END REMOVE IMAGE -----


    // ----- SELECT IMAGE -----
    $(document).on("change", "[id=vehicleImage]", function(e) {
        e.preventDefault();
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;


            if (filesize > 10) {
                $(`#displayImage`).empty();
                $(`[name="vehicleImage"]`).val("");
                $(`[name="vehicleImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("image") == -1 && filetype.indexOf("jpeg") == -1 && filetype.indexOf("jpg") == -1 && filetype.indexOf("png") == -1) {
                $(`#displayImage`).empty();
                $(`[name="vehicleImage"]`).val("");
                $(`[name="vehicleImage"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "Invalid file type");
            } else {
                $("#vehicleImage").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-vehicleImage").text("");
                $(`#displayImage`).css('display','block');
                $(`#displayImage`).html(displayImage(filename, false));
                $(this).attr("file", filename);
            }
        }
    })
    // ----- END SELECT IMAGE -----

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

    // -- START COMPUTE MONTHLY DEPRECIATION AND HOURLY RATE --//
    $(document).on('keyup','#input_vehicleCost,#input_vehicleSalvageValue,#input_vehicleUsefulLife',function(){
        var getAssetCost            = +parseFloat($("#input_vehicleCost").val().replaceAll(",",""));
        var getSalvageValue         = +parseFloat($("#input_vehicleSalvageValue").val().replaceAll(",",""));
        var getEstimatedLife        = +parseFloat($("#input_vehicleUsefulLife").val().replaceAll(",",""));
        var getMonthlyDepreciation  = 0;
        var getHourlyRate           = 0;

        getMonthlyDepreciation = ((getAssetCost - getSalvageValue)/getEstimatedLife)/12;

        getHourlyRate = getMonthlyDepreciation / 720;

        $("#input_vehicleDepreciation").val(getMonthlyDepreciation);
        $("#input_vehicleHourRate").val(getHourlyRate);

    })    
    // -- END COMPUTE MONTHLY DEPRECIATION AND HOURLY RATE --//

     //  FUNCTION FOR CHECK SALVAGE VALUE//
     function validateSalvageValue(){
        var getCost = +$("#input_vehicleCost").val().replaceAll(",","");
        var getSalvageValue = +$("#input_vehicleSalvageValue").val().replaceAll(",","");
        
        if(getCost < getSalvageValue ){
            $("#input_vehicleSalvageValue").removeClass("validated").removeClass("is-valid").addClass("is-invalid");
            $("#invalid-input_vehicleSalvageValue").text("Input a salvage value less than the cost.");
            $("#input_vehicleSalvageValue").focus();
            return false;
        }else{
            $("#input_vehicleSalvageValue").removeClass("validated").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_vehicleSalvageValue").text("");
            return true;
        }
    }

    //  VALIDATE THE SALVAGE VALUE AND COST
    $(document).on("change","#input_vehicleSalvageValue", function(){
        validateSalvageValue();
    });


 // ----- MODAL CONTENT -----
 function modalContent(data = false) {
    let {
    vehicleID               = "",
    vehicleName             = "",
    vehiclePlateNumber      = "",
    vehicleFuelConsumption  = "",
    vehicleStatus           = "",
    vehicleGasType          = "",
    acquisitionDate         = new Date(),
    vehicleCost             = "",
    vehicleSalvageValue     = "",
    vehicleUsefulLife       = "",
    vehicleImage            = "",
    vehicleDepreciation     = "",
    vehicleHourRate         = "",
    vehicleProviderFee      = ""
    }= data && data[0];     
    // classificationContent(data);
    let button = vehicleID ? `
    <button 
        class="btn btn-update px-5 p-2" 
        id="btnUpdate" 
        rowID="${vehicleID}"
        feedback="${vehicleName}">
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
                        <label>Vehicle <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="vehicleName" 
                            id="input_vehicleName" 
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][:]['][-][(][)][ ]" 
                            minlength="3" 
                            maxlength="75" 
                            required 
                          
                            value="${vehicleName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_vehicleName"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Plate Number/Conduction Number <span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="vehiclePlateNumber" 
                            id="input_vehiclePlateNumber" 
                            data-allowcharacters="[A-Z][0-9][-][ ]" 
                            placeholder="AAA 0000"
                            minlength="1" 
                            maxlength="8" 
                            required 
                            unique="${vehicleID}" 
                            value="${vehiclePlateNumber}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_vehiclePlateNumber"></div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label>Average Fuel Consumption<span class="text-danger font-weight-bold">*</span></label>
                       

                            <div>
                                <input 
                                type="text" 
                                class="form-control input-fuel text-right" 
                                name="vehicleFuelConsumption" 
                                id="input_vehicleFuelConsumption" 
                                data-allowcharacters="[0-9][.]" 
                                minlength="1" 
                                maxlength="9"
                                min="1" 
                                required 
                                style="display: inline;width:75%;" 
                                value="${vehicleFuelConsumption}"
                                autocomplete="off">
								<label for="input_vehicleFuelConsumption">km/L</label>
							</div>
                        <div class="invalid-feedback d-block" id="invalid-input_vehicleFuelConsumption"></div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Fuel Type <span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_vehicleGasType" 
                        name="vehicleGasType"
                        autocomplete="off"
                        required>
                        <option value="" selected>Select Fuel Type</option>
                        <option value="1" ${data && vehicleGasType == "1" && "selected"}>Gasoline</option>
                        <option value="2" ${data && vehicleGasType == "2" && "selected"}>Diesel</option>

                    </select>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleGasType"></div>
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
                    name="vehicleCost" 
                    id="input_vehicleCost" 
                    value="${vehicleCost}" 
                    required>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleCost"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
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
                    name="vehicleSalvageValue" 
                    id="input_vehicleSalvageValue" 
                    value="${vehicleSalvageValue}" 
                    required>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleSalvageValue"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label style="font-size:90%;">Estimated Useful Life (No. of Years) <span class="text-danger font-weight-bold">*</span></label>
                    <input 
                        type="text" 
                        class="form-control validate" 
                        name="vehicleUsefulLife" 
                        id="input_vehicleUsefulLife" 
                        data-allowcharacters="[0-9]" 
                        minlength="1" 
                        maxlength="2" 
                        required 
                        value="${vehicleUsefulLife}"
                        autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleUsefulLife"></div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <label>Rental Fee <span class="text-danger font-weight-bold">*</span></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">₱</span>
                    </div>
                    <input type="text" 
                    class="form-control amount text-right"  
                    min="0.01" max="999999999"
                    minlength="1" 
                    maxlength="17" 
                    name="vehicleProviderFee" 
                    id="input_vehicleProviderFee" 
                    value="${vehicleProviderFee}" 
                    required>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleProviderFee"></div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <label>
                    <i class="fal fa-info-circle" style="cursor:pointer;color:#007bff;" data-toggle="tooltip" title="MONTHLY DEPRECIATION FORMULA:
            ( (Cost - Salvage Value) ÷ Estimated Useful Life ) ÷ 12 months "></i>
                
                
                Monthly Depreciation <span class="text-danger font-weight-bold">*</span></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">₱</span>
                    </div>
                    <input type="text" 
                    class="form-control amount text-right"  
                    min="0.01" max="9999999"
                    minlength="1" 
                    maxlength="20" 
                    name="vehicleDepreciation" 
                    id="input_vehicleDepreciation" 
                    value="${vehicleDepreciation}" 
                    disabled>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleDepreciation"></div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <label>
                <i class="fal fa-info-circle" style="cursor:pointer;color:#007bff;" data-toggle="tooltip" title="HOURLY RATE FORMULA:
                Monthly Depreciation ÷ (30 days x 24 hours)"></i>
        Hourly Rate <span class="text-danger font-weight-bold">*</span></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">₱</span>
                    </div>
                    <input type="text" 
                    class="form-control amount text-right"  
                    min="0.01" max="9999999"
                    minlength="1" 
                    maxlength="20" 
                    name="vehicleHourRate" 
                    id="input_vehicleHourRate" 
                    value="${vehicleHourRate}" 
                    disabled>
                    <div class="invalid-feedback d-block" id="invalid-input_vehicleHourRate"></div>
                </div>
            </div>

            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Reference Image</label>
                    <input type="file"
                        class="form-control validate"
                        name="vehicleImage|inventory-vehicle"
                        id="vehicleImage"
                        file="${vehicleImage}">
                    <div class="invalid-feedback d-block" id="invalid-vehicleImage"></div>
                    <div id="displayImage" style="${vehicleImage?'display:block;':'display:none;'} font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">${displayImage(vehicleImage)}</div>
                </div>
            </div>
            
            <div class="col-md-6 col-sm-12">
                <div class="form-group">
                    <label>Status <span class="text-danger font-weight-bold">*</span></label>
                    <select 
                        class="form-control select2 validate" 
                        id="input_vehicleStatus" 
                        name="vehicleStatus"
                        autocomplete="off"
                        >
                        <option 
                            value="1" 
                            ${data && vehicleStatus == "1" && "selected"} >Active</option>
                        <option 
                            value="0" 
                            ${data && vehicleStatus == "0" && "selected"}>Inactive</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-vehicleStatus"></div>
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

$(document).on("change", "#input_classificationStatus", function(){
    if($(this).data("classificationid")){
        let thisID              =   $(this).data("classificationid");
        let thisValue           =   $(this).val();
        let attrID              =   $(this).attr("id");
        let categoryCondition   =   getTableData("ims_inventory_category_tbl",`COUNT(categoryID) AS categoryLength`,`classificationID='${thisID}' AND categoryStatus = '1' `);
        let itemCondition       =   getTableData("ims_inventory_item_tbl", `COUNT(itemID) AS itemLength`, `classificationID='${thisID}' AND itemStatus = '1' `)
        console.log(categoryCondition[0].categoryLength+" | "+ itemCondition[0].itemLength);
        if((categoryCondition[0].categoryLength > 0 || itemCondition[0].itemLength > 0) && thisValue == 0 ){
            setTimeout(function(){
                $("#"+attrID).removeClass("is-valid").removeClass("validated").addClass("is-invalid");
                $(".select2-selection").removeClass("no-error").addClass("has-error");
                $("#invalid-input_classificationStatus").text(`This record is currently in use!`);
            },180);
            $("#btnUpdate").prop("disabled", true);
        }else{
            $("#"+attrID).removeClass("is-invalid");
            $("#invalid-input_classificationStatus").text(``);
            $("#btnUpdate").prop("disabled", false);
            $(".select2-selection").addClass("no-error").removeClass("has-error");
        }
    }

});

// ----- OPEN ADD MODAL -----
$(document).on("click", "#btnAdd", function() {
    $("#inventory_item_modalheader").text("ADD VEHICLE");
    $("#modal_vehicle").modal("show");
    $("#modal_vehicle_content").html(preloader);
    const content = modalContent();
    $("#modal_vehicle_content").html(content);
    initAll();
    //  TOOLTIP //
    $('[data-toggle="tooltip"]').tooltip()
    // TOOLTIP //
    datepicker("inputacquisitionDate");
});
// ----- END OPEN ADD MODAL -----


// ----- SAVE MODAL -----
$(document).on("click", "#btnSave", function() {

    var getValidateSalvageValue = validateSalvageValue();
    if(getValidateSalvageValue){

        const validate = validateForm("modal_vehicle");
        if (validate) {

        let data = getFormData("modal_vehicle");
        // data["tableData[createdBy]"] = sessionID;
        // data["tableData[updatedBy]"] = sessionID;
        // data["tableName"]            = "ims_inventory_vehicle_tbl";
        // data["feedback"]             = $("[name=vehicleName]").val();

        data.append("tableData[vehicleCost]",           +$("#input_vehicleCost").val().replaceAll(",",""));
        data.append("tableData[vehicleSalvageValue]",   +$("#input_vehicleSalvageValue").val().replaceAll(",",""));
        data.append("tableData[vehicleHourRate]",       +$("#input_vehicleHourRate").val().replaceAll(",",""));
        data.append("tableData[vehicleDepreciation]",   +$("#input_vehicleDepreciation").val().replaceAll(",",""));
        data.append("tableData[vehicleProviderFee]",    +$("#input_vehicleProviderFee").val().replaceAll(",",""));

        data.append("tableData[createdBy]", sessionID);
        data.append("tableData[updatedBy]", sessionID);
        data.append("tableName", "ims_inventory_vehicle_tbl");
        data.append("feedback", $("[name=vehicleName]").val()?.trim());

        sweetAlertConfirmation("add", "Vehicle", "modal_vehicle", null, data, false, tableContent); 
        }
    }
});
// ----- END SAVE MODAL -----

// ----- OPEN EDIT MODAL -----
$(document).on("click", ".btnEdit", function() {
    const id       = $(this).attr("id");
    const feedback = $(this).attr("feedback");
    $("#inventory_item_modalheader").text("EDIT VEHICLE");
    $("#modal_vehicle").modal("show");

    // Display preloader while waiting for the completion of getting the data
    $("#modal_vehicle_content").html(preloader); 

    const tableData = getTableData("ims_inventory_vehicle_tbl", "*", "vehicleID="+id, "");
    if (tableData) {
        const content = modalContent(tableData);
        setTimeout(() => {
            $("#modal_vehicle_content").html(content);
            $("#btnSaveConfirmationEdit").attr("accountid", id);
            $("#btnSaveConfirmationEdit").attr("feedback", feedback);
            datepicker("inputacquisitionDate",new Date(tableData[0].acquisitionDate));
            initAll();
            //  TOOLTIP //
            $('[data-toggle="tooltip"]').tooltip()
            // TOOLTIP //
        }, 500);
    }
});
// ----- END OPEN EDIT MODAL -----

// ----- UPDATE MODAL -----
$(document).on("click", "#btnUpdate", function() {
    var getValidateSalvageValue = validateSalvageValue();
            
    if(getValidateSalvageValue){
        const rowID = $(this).attr("rowID");
        const validate = validateForm("modal_vehicle");
        if (validate) {

            let data = getFormData("modal_vehicle");
            // data["tableData[updatedBy]"] = sessionID;
            // data["tableName"]            = "ims_inventory_vehicle_tbl";
            // data["whereFilter"]          = "vehicleID=" + rowID;
            // data["feedback"]             = $("[name=vehicleName]").val();

            data.append("tableData[vehicleCost]", +$("#input_vehicleCost").val().replaceAll(",",""));
            data.append("tableData[vehicleSalvageValue]", +$("#input_vehicleSalvageValue").val().replaceAll(",",""));
            data.append("tableData[vehicleHourRate]", +$("#input_vehicleHourRate").val().replaceAll(",",""));
            data.append("tableData[vehicleDepreciation]", +$("#input_vehicleDepreciation").val().replaceAll(",",""));

            data.append("tableData[updatedBy]", sessionID);
            data.append("tableName",            "ims_inventory_vehicle_tbl");
            data.append("whereFilter",          `vehicleID = ${rowID}`);
            data.append("feedback",             $("[name=vehicleName]").val()?.trim());

            sweetAlertConfirmation(
                "update",
                "Vehicle",
                "modal_vehicle",
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
    let formEmpty = isFormEmpty("modal_vehicle");
    if (!formEmpty) {
        sweetAlertConfirmation(
            "cancel",
            "Vehicle",
            "modal_vehicle"
        );
    } else {
        $("#modal_vehicle").modal("hide");
    }
});
// -------- END CANCEL MODAL-----------

$(document).on("change","#input_classificationID",function(){
    let thisValue   =   $(this).val();
    categoryContent("add", thisValue);
    initAll();
});




});

