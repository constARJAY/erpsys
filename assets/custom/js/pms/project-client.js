
$(document).ready(function(){


    //------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(12);
	if(!allowedUpdate){
		$("#modalProjectClientContent").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----
    // ----- GET PHILIPPINE ADDRESSES -----
 const getPhAddresses = () => {
    let result = [];
    $.ajax({
        method: "GET",
        url: `${base_url}assets/json/ph-address.json`,
        async: false,
        dataType: "json",
        success: function (data) {
            result = data;
        },
    });
    return result;
};
const address = getPhAddresses();

const phRegion = [
    { key: "01",    name: "REGION I" },
    { key: "02",    name: "REGION II" },
    { key: "03",    name: "REGION III" },
    { key: "4A",    name: "REGION IV-A" },
    { key: "4B",    name: "REGION IV-B" },
    { key: "05",    name: "REGION V" },
    { key: "06",    name: "REGION VI" },
    { key: "07",    name: "REGION VII" },
    { key: "08",    name: "REGION VIII" },
    { key: "09",    name: "REGION IX" },
    { key: "10",    name: "REGION X" },
    { key: "11",    name: "REGION XI" },
    { key: "12",    name: "REGION XII" },
    { key: "13",    name: "REGION XIII" },
    { key: "BARMM", name: "BARMM" },
    { key: "CAR",   name: "CAR" },
    { key: "NCR",   name: "NCR" },
];

const getRegionName = (regionKey = "01") => {
    let region = phRegion.filter(item => {
        if (item.key == regionKey) {
            return item;
        }
    });
    return region.length > 0 ? region[0].name : "";
}

function getRegionOptions(regionKey = false) {
    let html = "";
    phRegion.map(item => {
        html += `<option value="${item.key}" ${regionKey == item.key && "selected"}>${item.name}</option>`;
    })
    return html;
}

function getProvinceOptions(provinceKey = false, region = "01", doEmpty = false) {
    let html = `<option value="" selected>Select Province</option>`;
    if (!doEmpty) {
        const provinceList = region && Object.keys(address[region].province_list);
        provinceList && provinceList.map(item => {
            html += `<option value="${item}" ${provinceKey == item && "selected"}>${item}</option>`;
        })
    }
    return html;
}

function getMunicipalityOptions(municipalityKey = false, region = "01", province = "ILOCOS NORTE", doEmpty = false) {
    let html = `<option value="" selected>Select City/Municipality</option>`;
    if (!doEmpty) {
        const municipalityList = region && province && Object.keys(address[region].province_list[province].municipality_list);
        municipalityList && municipalityList.map(item => {
            html += `<option value="${item}" ${municipalityKey == item && "selected"}>${item}</option>`;
        })
    }
    return html;
}

function getBarangayOptions(barangayKey = false, region = "01", province = "ILOCOS NORTE", city = "ADAMS", doEmpty = false) {
    let html = `<option value="" selected>Select Barangay</option>`;
    if (!doEmpty) {
        const barangayList = region && region && province && address[region].province_list[province].municipality_list[city].barangay_list;
        barangayList && barangayList.map(item => {
            html += `<option value="${item}" ${barangayKey == item && "selected"}>${item}</option>`;
        })
    }
    return html;
}

$(document).on("change", "[name=clientRegion]", function() {
    const region = $(this).val();

    if (region) {
        const provinceOptions = getProvinceOptions(false, region);
        $("[name=clientProvince]").html(provinceOptions);
    } else {
        const provinceOptions = getProvinceOptions(false, "", true);
        $("[name=clientProvince]").html(provinceOptions);
    }

    const municipality = getMunicipalityOptions(false, "", "", true);
    $("[name=clientCity]").html(municipality); 

    const barangay = getBarangayOptions(false, "", "", "", true);
    $("[name=clientBarangay]").html(barangay);
})

$(document).on("change", "[name=clientProvince]", function() {
    const region   = $("[name=clientRegion]").val();
    const province = $(this).val();
    
    if (province) {
        const municipalityOptions = getMunicipalityOptions(false, region, province);
        $("[name=clientCity]").html(municipalityOptions);
    } else {
        const municipalityOptions = getMunicipalityOptions(false, "", "", true);
        $("[name=clientCity]").html(municipalityOptions);
    }

    const barangay = getBarangayOptions(false, "", "", "", true);
    $("[name=clientBarangay]").html(barangay);
})

$(document).on("change", "[name=clientCity]", function() {
    const region   = $("[name=clientRegion]").val();
    const province = $("[name=clientProvince]").val();
    const city     = $(this).val();

    if (city) {
        const barangay = getBarangayOptions(false, region, province, city);
        $("[name=clientBarangay]").html(barangay);
    } else {
        const barangay = getBarangayOptions(false, "", "", "", true);
        $("[name=clientBarangay]").html(barangay);
    }
})
// ----- END GET PHILIPPINE ADDRESSES -----




          // ----- DATATABLES -----
      function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableProjectClient')){
            $('#tableProjectClient').DataTable().destroy();
        }
        
        var table = $("#tableProjectClient").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%" },
                { targets: 1, width: "10%" },
                { targets: 2, width: "300" },
                { targets: 3, width: "10%" },
                { targets: 4, width: "10%" },
                { targets: 5, width: "10%" },
                { targets: 6, width: "10%" },
                { targets: 7, width: "10%" },
                { targets: 8, width: "10%" },
                { targets: 9, width: "10%" }
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
                // const data = getTableData("pms_client_tbl", "*", "", "");

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "pms_client_tbl "},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableProjectClient">
                    <thead>
                        <tr>
                            <th>Client Code</th>
                            <th>Client Name</th>
                            <th>Client Address</th>
                            <th>Contact Person</th>
                            <th>Email Address</th>
                            <th>TIN</th>
                            <th>Mobile No.</th>
                            <th>Telephone No.</th>
                            <th>Website</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.clientID, // Required
                        clientName: item.clientName,
                        email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    if(item.clientStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.clientStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }
                    html += `
                    <tr
                    class="btnEdit" 
                    id="${item.clientID}"
                    feedback="${item.clientName}">
                        <td>${item.clientCode}</td>
                        <td>${item.clientName}</td>
                        <td style="white-space: normal">
                            ${item.clientUnitNumber && titleCase(item.clientUnitNumber)+", "} 
                            ${item.clientHouseNumber && item.clientHouseNumber +", "} 
                            ${item.clientBarangay && titleCase(item.clientBarangay)+", "} 
                            ${item.clientCity && titleCase(item.clientCity)+", "} 
                            ${item.clientProvince && titleCase(item.clientProvince)+", "}
                            ${item.clientCountry && titleCase(item.clientCountry)+", "} 
                            ${item.clientPostalCode && titleCase(item.clientPostalCode)}
                        </td>
                        <td>${item.clientContactPerson}</td>
                        <td>${item.clientEmailAddress}</td>
                        <td>${item.clientTin}</td>
                        <td>${item.client_MobileNo}</td>
                        <td>${item.clientTelephoneNo}</td>
                        <td>${item.clientBrandName}</td>
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

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
         
        let {clientID       = "",
        clientName          ="",
        clientRegion        =false,
        clientProvince      =false,
        clientCity          =false,
        clientBarangay      =false,
        clientUnitNumber    ="",
        clientHouseNumber   ="",
        clientCountry       ="",
        clientPostalCode    ="",
        clientContactPerson ="",
        clientEmailAddress  ="",
        clientTin           ="",
        client_MobileNo     ="",
        clientTelephoneNo   ="",
        clientBrandName     = "",
        clientStatus        ="" }= data && data[0];

        let button = clientID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${clientID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

        let html = `

            <div class="modal-body">
                <div class="row" id="pre-loader"></div>
                <div class="row" id="modal_form">
                   
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Client Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="clientName" 
                                id="clientName" 
                                data-allowcharacters="[A-Z][a-z][0-9][-][(][)][,][ ]" 
                                minlength="2" 
                                maxlength="50" 
                                required 
                                unique="${clientID}"
                                value="${clientName}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputClientName"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Region <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="clientRegion" required=""
                                id="input_clientRegion" readonly=""> 
                                <option value="" disabled selected>Select Region</option>
                                ${getRegionOptions(clientRegion)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientRegion"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Province <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="clientProvince" required=""
                                id="input_clientProvince" readonly="">
                                <option value="" disabled selected>Select Province</option>
                                ${data && getProvinceOptions(clientProvince, clientRegion)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientProvince"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>City <span
                                    class="text-danger font-weight-bold validate">*</span></label>
                            <select class=" form-control show-tick select2" required="" id="input_clientCity" name="clientCity" readonly="">
                            <option value="" disabled selected>Select City/Municipality</option>
                            ${data && getMunicipalityOptions(clientCity, clientRegion, clientProvince)}
                            </select> 
                            <div class="invalid-feedback d-block" id="invalid-input_clientCity"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Barangay</label>
                            <select class=" form-control show-tick select2 validate" name="clientBarangay" required=""
                                id="input_clientBarangay" readonly="">
                                <option value="" disabled selected>Select Barangay</option>
                                ${data && getBarangayOptions(clientBarangay, clientRegion, clientProvince, clientCity)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientBarangay"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Unit Number </label>
                            <input class="form-control validate"
                            data-allowcharacters="[0-9]" minlength="1" maxlength="35"  id="input_clientUnitNumber" name="clientUnitNumber" value="${clientUnitNumber}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientUnitNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <label>Building/House Number <span class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][#][0-9][ ]" minlength="1" maxlength="35" id="input_clientHouseNumber" name="clientHouseNumber" value="${clientHouseNumber}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientHouseNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Country <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[a-z][A-Z][ ]" id="input_clientCountry" name="clientCountry" minlength="6"
                                maxlength="50" value="${clientCountry}" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-input_clientCountry"></div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Zip Code <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[0-9]" id="input_clientPostalCode" name="clientPostalCode" minlength="4"
                                maxlength="4" value="${clientPostalCode}" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-input_clientPostalCode"></div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Contact Person <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="clientContactPerson" 
                                id="input_clientContactPerson" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ]" 
                                minlength="2" 
                                maxlength="30" 
                                required 
                                value="${clientContactPerson}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_clientContactPerson"></div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Email Address </label>
                            <input 
                                type="email" 
                                class="form-control validate" 
                                name="clientEmailAddress" 
                                id="input_clientEmailAddress" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@][.][-]" 
                                minlength="2" 
                                maxlength="50" 
                                unique="${clientID}"
                                value="${clientEmailAddress}"
                                autocomplete="off" unique
                                placeholder="sample@email.com">
                            <div class="invalid-feedback d-block" id="invalid-input_clientEmailAddress"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Tax Identification Number <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control inputmask" 
                                name="clientTin" 
                                id="input_clientTin" 
                                data-allowcharacters="[0-9]" 
                                minlength="15" 
                                maxlength="15" 
                                value="${clientTin}"
                                required
                                mask="999-999-999-999"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-input_clientTin"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Mobile No. <span class="text-danger font-weight-bold">*</span></label>
                                <input 
                                type="text" 
                                class="form-control inputmask" 
                                name="client_MobileNo" 
                                id="input_clientMobileNo" 
                                data-allowcharacters="[0-9]" 
                                mask="0\\999-999-9999"  
                                minlength="13" 
                                maxlength="13" 
                                value="${client_MobileNo}"
                                required="">
                            <div class="invalid-feedback d-block" id="invalid-input_clientMobileNo"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Telephone No. <span class="text-danger font-weight-bold">*</span></label>
                                <input type="text" 
                                class="form-control inputmask" 
                                name="clientTelephoneNo" 
                                id="input_clientTelephoneNo" 
                                data-allowcharacters="[0-9]" 
                                mask="(99)-9999-9999" 
                                minlength="13" 
                                maxlength="18" 
                                required="" 
                                value="${clientTelephoneNo}">
                            <div class="invalid-feedback d-block" id="invalid-input_clientTelephoneNo"></div>
                        </div>
                    </div>
                    <div class="col-md-8 col-sm-12">
                        <div class="form-group">
                            <label>Website <small class="text-muted">(Optional)</small></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="clientBrandName" 
                                id="input_clientBrandName" 
                                data-allowcharacters="[A-Z][a-z][0-9][/][.][-][:]" 
                                minlength="2" 
                                maxlength="30" 
                                value="${clientBrandName}"
                                autocomplete="off">
                       
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="clientStatus" id="input_clientStatus" autocomplete="off" >
                                <option ${data && clientStatus == "1" && "selected"} value="1">Active</option>   
                                <option ${data && clientStatus == "0" && "selected"} value="0">Inactive</option>
                                <div class="invalid-feedback d-block" id="invalid-input_clientStatus"></div>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel px-5 p-2"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;

    
        return html;
    } 
    // ----- END MODAL CONTENT ----

        // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modalTitleAddClientHeader").text("ADD PROJECT CLIENT");
        $("#modalProjectClient").modal("show");
        $("#modalProjectClientContent").html(preloader);

        const content = modalContent();
        $("#modalProjectClientContent").html(content);

        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modalProjectClient");
    if (validate) {

        let data = getFormData("modalProjectClient", true);
        data["tableData[clientCode]"] = generateCode("CLT", false, "pms_client_tbl", "clientCode");
        data["tableData[createdBy]"] = sessionID;
        data["tableData[updatedBy]"] = sessionID;
        data["tableName"]            = "pms_client_tbl";
        data["feedback"]             = $("[name=clientName]").val();

        sweetAlertConfirmation("add", "Client", "modalProjectClient", null, data, true, tableContent);
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#modalTitleAddClientHeader").text("VIEW CLIENT");
        $("#modalProjectClient").modal("show")

        // Display preloader while waiting for the completion of getting the data
        $("#modalProjectClientContent").html(preloader); 

        const tableData = getTableData("pms_client_tbl", "*", "clientID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            $("#modalProjectClientContent").html(content);       
            initAll(); 
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modalProjectClient");
        let rowID           = $(this).attr("rowID");
        let genCode         = getTableData("pms_client_tbl","clientCode","clientID="+rowID,"clientCode DESC");

        if (validate) {

            let data = getFormData("modalProjectClient", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"]            = "pms_client_tbl";
			data["whereFilter"]          ="clientID="+rowID;
			data["feedback"]             = $("[name=clientName]").val();

			sweetAlertConfirmation(
				"update",
				"Client Masterfile",
				"modalProjectClient",
				"",
				data,
				true,
				tableContent
			);
        }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modalProjectClient");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Client Masterfile",
				"modalProjectClient"
			);
		} else {
			$("#modalProjectClient").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------

});