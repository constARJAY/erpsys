
$(document).ready(function(){
    const allowedUpdate = isUpdateAllowed(12);


    let oldContractFilename = [], newContractFilename = [], newContractFiles = [];
    let oldJobOrderFilename = [], newJobOrderFilename = [], newJobOrderFiles = [];
    let oldLetterFilename = [], newLetterFilename = [], newLetterFiles = [];


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
            lengthMenu: [
                [50, 100, 150, 200, -1],
                [50, 100, 150, 200, "All"],
            ],
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

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "pms_client_tbl "},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
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
                        id:              item.clientID, // Required
                        clientName:      item.clientName,
                        clientBrandName: item.clientBrandName,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let status = `<span class="badge badge-outline-danger w-100">Inactive</span>`;
                    if (item.clientStatus == 1) {
                        status=`<span class="badge badge-outline-success w-100">Active</span>`;
                    } 

                    let clientLink = item.clientBrandName ? `
                        <a href="${item.clientBrandName}"
                            class="client-link"
                            target="_blank">${item.clientBrandName}</a>` : "-";

                    html += `
                    <tr class="btnEdit" 
                        id="${item.clientID}"
                        feedback="${item.clientName}">
                        <td>${item.clientCode}</td>
                        <td>${item.clientName}</td>
                        <td style="white-space: normal">
                            ${item.clientUnitNumber && titleCase(item.clientUnitNumber)+", "} 
                            ${item.clientHouseNumber && item.clientHouseNumber +", "}
                            ${item.clientStreetName && titleCase(item.clientStreetName)+", "}
                            ${item.clientSubdivisionName && titleCase(item.clientSubdivisionName)+", "}  
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
                        <td>${clientLink}</td>
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
        oldContractFilename = [], newContractFilename = [], newContractFiles = [];
        oldJobOrderFilename = [], newJobOrderFilename = [], newJobOrderFiles = [];
        oldLetterFilename = [], newLetterFilename = [], newLetterFiles = [];
            
        let {
            clientID                = "",
            clientName              = "",
            clientRegion            = false,
            clientProvince          = false,
            clientCity              = false,
            clientBarangay          = false,
            clientUnitNumber        = "",
            clientHouseNumber       = "",
            clientStreetName        = "",
            clientSubdivisionName   =  "",
            clientCountry           = "",
            clientPostalCode        = "",
            clientContactPerson     = "",
            clientEmailAddress      = "",
            clientTin               = "",
            client_MobileNo         = "",
            clientTelephoneNo       = "",
            clientBrandName         = "",
            clientShortcut          = "",
            clientContract          = "",
            clientJobOrder          = "",
            clientEngagementLetter  = "",
            clientStatus            = "" 
        } = data && data[0];

        let button = clientID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            clientID="${clientID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

        let html = `

            <div class="modal-body">
                <div class="row" id="modal_form">
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                        <div class="form-group">
                            <label>Client Name <code>*</code></label>
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
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>Client Shortcut <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="clientShortcut" 
                                id="clienShortcut" 
                                data-allowcharacters="[A-Z][a-z]" 
                                minlength="2" 
                                maxlength="3" 
                                required 
                                unique="${clientID}"
                                value="${clientShortcut}"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputClientShortcut"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-2">
                        <div class="form-group">
                            <label>Unit No. </label>
                            <input class="form-control validate"
                            data-allowcharacters="[0-9]" minlength="1" maxlength="35"  id="input_clientUnitNumber" name="clientUnitNumber" value="${clientUnitNumber}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientUnitNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <div class="form-group">
                            <label>Building/House No. <code>*</code></label>
                            <input class="form-control validate" required=""
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][#][0-9][ ]" minlength="1" maxlength="35" id="input_clientHouseNumber" name="clientHouseNumber" value="${clientHouseNumber}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientHouseNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <div class="form-group">
                            <label>Street Name <code>*</code></label>
                            <input class="form-control validate" required
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][ ]" minlength="2" maxlength="75"  id="input_clientStreetName" name="clientStreetName" value="${clientStreetName}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientStreetName"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <div class="form-group">
                            <label>Subdivision Name <code>*</code></label>
                            <input class="form-control validate" required
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][ ]" minlength="2" maxlength="75" id="input_clientSubdivisionName" name="clientSubdivisionName" value="${clientSubdivisionName}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientSubdivisionName"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-5">
                        <div class="form-group">
                            <label>Country <code>*</code></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[a-z][A-Z][ ]" id="input_clientCountry" name="clientCountry" minlength="6"
                                maxlength="50" value="${clientCountry}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientCountry"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-2">
                        <div class="form-group">
                            <label>Zip Code <code>*</code></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[0-9]" id="input_clientPostalCode" name="clientPostalCode" minlength="4"
                                maxlength="4" value="${clientPostalCode}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_clientPostalCode"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label>Region <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="clientRegion" required=""
                                id="input_clientRegion" readonly=""> 
                                <option value="" disabled selected>Select Region</option>
                                ${getRegionOptions(clientRegion)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientRegion"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label>Province <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="clientProvince" required=""
                                id="input_clientProvince" readonly="">
                                <option value="" disabled selected>Select Province</option>
                                ${data && getProvinceOptions(clientProvince, clientRegion)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientProvince"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label>City/Municipality <code>*</code></label>
                            <select class=" form-control show-tick select2" required="" id="input_clientCity" name="clientCity" readonly="">
                            <option value="" disabled selected>Select City/Municipality</option>
                            ${data && getMunicipalityOptions(clientCity, clientRegion, clientProvince)}
                            </select> 
                            <div class="invalid-feedback d-block" id="invalid-input_clientCity"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="form-group">
                            <label>Barangay <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="clientBarangay" required
                                id="input_clientBarangay" >
                                <option value="" disabled selected>Select Barangay</option>
                                ${data && getBarangayOptions(clientBarangay, clientRegion, clientProvince, clientCity)}
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_clientBarangay"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div class="form-group">
                            <label>Contact Person <code>*</code></label>
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
                    <div class="col-sm-12 col-md-4">
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
                                autocomplete="off"
                                placeholder="sample@email.com">
                            <div class="invalid-feedback d-block" id="invalid-input_clientEmailAddress"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                        <div class="form-group">
                            <label>Tax Identification No. <code>*</code></label>
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
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Mobile No. <code>*</code></label>
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
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Telephone No. <code>*</code></label>
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
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Contract</label>
                            <input 
                                type="file" 
                                class="form-control file" 
                                name="clientContract" 
                                id="clientContract"
                                file="${clientContract}"
                                multiple="multiple"
                                fileClassification="contract"
                                autocomplete="off">
                            <div class="row display-image-parent" id="displayFileContract">
                                ${displayFile("contract", clientContract)}
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Job Order</label>
                            <input 
                                type="file" 
                                class="form-control file" 
                                name="clientJobOrder|clients" 
                                id="clientJobOrder"
                                file="${clientJobOrder}"
                                multiple="multiple"
                                fileClassification="jobOrder"
                                autocomplete="off">
                            <div class="row display-image-parent" id="displayFileJobOrder">
                                ${displayFile("jobOrder", clientJobOrder)}
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Engagement Letter</label>
                            <input 
                                type="file" 
                                class="form-control file" 
                                name="clientEngagementLetter|clients" 
                                id="clientEngagementLetter"
                                file="${clientEngagementLetter}"
                                multiple="multiple"
                                fileClassification="letter"
                                autocomplete="off">
                            <div class="row display-image-parent" id="displayFileLetter">
                                ${displayFile("letter", clientEngagementLetter)}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
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
                            <div class="invalid-feedback d-block" id="invalid-input_clientBrandName"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status <code>*</code></label>
                            <select 
                                class="form-control select2 validate" 
                                id="input_clientStatus" 
                                name="clientStatus"
                                autocomplete="off"
                                getclientid = "${clientID}">
                                <option 
                                    value="1" 
                                    ${data && clientStatus == "1" && "selected"}>Active</option>
                                <option 
                                    value="0" 
                                    ${data && clientStatus == "0" && "selected"}>Inactive</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_clientStatus"></div>
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

    
    // ----- CHOOSE FILE -----
    function displayFile(fileClassification = "", file = null, blob = "", link = true, oldFiles = true) {
        let html = ``;
        if (file && file != null && file != "null") {
			let fileArr = file.split("|");
			fileArr.forEach(cliFile => {
                if (oldFiles && fileClassification) {
                    if (fileClassification == "contract") {
                        oldContractFilename.push(cliFile);
                    } else if (fileClassification == "jobOrder") {
                        oldJobOrderFilename.push(cliFile);
                    } else if (fileClassification == "letter") {
                        oldLetterFilename.push(cliFile);
                    }
                }
				
				let fileType = cliFile.split(".");
					fileType = fileType[fileType.length-1].toLowerCase();
				let imageExtensions = ["jpg", "png", "jpeg", "gif"];
                let isFileImage = imageExtensions.includes(fileType);
				let targetAttr = isFileImage ? `display="true" blob="${blob}"` : 
                    (oldFiles ? `target="_blank"` : "");

				let otherAttr = link && oldFiles ? `
				href="${base_url+"assets/upload-files/project-client/"+cliFile}"` : `href="javascript:void(0)"`;
				html += `
				<div class="col-md-4 col-sm-12 display-image-content">
					<div class="display-image">
						<div class="d-flex justify-content-start align-items-center p-0">
							<span class="btnRemoveFile pr-2 display-image-remove"
								filename="${cliFile}"
                                fileClassification="${fileClassification}">
								<i class="fas fa-close"></i>
							</span>
							<a class="filename display-image-filename"
								title="${cliFile}"
								${otherAttr}
                                ${targetAttr}>
								${cliFile}
							</a>
						</div>
					</div>
				</div>`;
			})
        }
        return html;
    }


    $(document).on("change", `[type="file"]`, function() {
        const fileClassification = $(this).attr("fileClassification");
        $parent = $(this).closest(".form-group");

        let countFiles = 0;
        if (fileClassification == "contract") {
            countFiles = oldContractFilename.length + newContractFilename.length;
        } else if (fileClassification == "jobOrder") {
            countFiles = oldJobOrderFilename.length + newJobOrderFilename.length;
        } else if (fileClassification == "letter") {
            countFiles = oldLetterFilename.length + newLetterFilename.length;
        }

		if (this.files && this.files[0]) {
			let files = this.files;
			let filesLength = this.files.length;
			for (var i=0; i<filesLength; i++) {
				countFiles++;

				const filesize = files[i].size/1024/1024; // Size in MB
				const filetype = files[i].type;
				const filename = files[i].name;
                const fileArr  = filename.split(".");
				const name     = fileArr?.[0];
				const type     = fileArr?.[fileArr.length-1]?.toLowerCase();
				const displayName = `${name}${countFiles}.${type}`;
				if (filesize > 10) {
					showNotification("danger", `${filename} - File size must be less than or equal to <b>10mb</b>`);
				} else if (!["png", "jpg", "jpeg", "doc", "docx", "pdf"].includes(type)) {
					showNotification("danger", `${filename} - <b>Invalid file type</b>`);
				} else {
                    let blob = URL.createObjectURL(files[i]);

                    if (fileClassification == "contract") {
                        newContractFilename.push(displayName);
                        newContractFiles.push(files[i]);
                        $(`#displayFileContract`).append(displayFile(fileClassification, displayName, blob, true, false));
                    } else if (fileClassification == "jobOrder") {
                        newJobOrderFilename.push(displayName);
                        newJobOrderFiles.push(files[i]);
                        $(`#displayFileJobOrder`).append(displayFile(fileClassification, displayName, blob, true, false));
                    } else if (fileClassification == "letter") {
                        newLetterFilename.push(displayName);
                        newLetterFiles.push(files[i]);
                        $(`#displayFileLetter`).append(displayFile(fileClassification, displayName, blob, true, false));
                    }
				}
			}
			$(this).val("");
        }
    })
    // ----- END CHOOSE FILE -----


    // ----- MODAL IMAGE -----
	$(document).on("click", `.display-image-filename`, function(e) {
		let display = $(this).attr("display") == "true";
		let source  = $(this).attr("blob") || $(this).attr("href");
		if (display) {
			e.preventDefault();
			$("#display-image-preview").attr("src", source);
			$("#display-image-modal").modal("show");
		}
	})
	// ----- END MODAL IMAGE -----


    // ----- REMOVE FILE -----
    $(document).on("click", `.btnRemoveFile`, function() {
        const filename           = $(this).attr("filename");
        const fileClassification = $(this).attr("fileClassification");
        if (fileClassification == "contract") {
            const newFileIndex = newContractFilename.indexOf(filename);
            const oldFileIndex = oldContractFilename.indexOf(filename);

            newFileIndex != -1 && newContractFilename.splice(newFileIndex, 1);
            newFileIndex != -1 && newContractFiles.splice(newFileIndex, 1);
            oldFileIndex != -1 && oldContractFilename.splice(oldFileIndex, 1);
        } else if (fileClassification == "jobOrder") {
            const newFileIndex = newJobOrderFilename.indexOf(filename);
            const oldFileIndex = oldJobOrderFilename.indexOf(filename);

            newFileIndex != -1 && newJobOrderFilename.splice(newFileIndex, 1);
            newFileIndex != -1 && newJobOrderFiles.splice(newFileIndex, 1);
            oldFileIndex != -1 && oldJobOrderFilename.splice(oldFileIndex, 1);
        } else if (fileClassification == "letter") {
            const newFileIndex = newLetterFilename.indexOf(filename);
            const oldFileIndex = oldLetterFilename.indexOf(filename);

            newFileIndex != -1 && newLetterFilename.splice(newFileIndex, 1);
            newFileIndex != -1 && newLetterFiles.splice(newFileIndex, 1);
            oldFileIndex != -1 && oldLetterFilename.splice(oldFileIndex, 1);
        }

        $display = $(this).closest(".display-image-content");
		$display.fadeOut(500, function() {
			$display.remove();
		})
    })
    // ----- END REMOVE FILE -----


        // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modalTitleAddClientHeader").text("ADD CLIENT");
        $("#modalProjectClient").modal("show");
        $("#modalProjectClientContent").html(preloader);

        const content = modalContent();
        $("#modalProjectClientContent").html(content);

        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- CHECK FILE LENGTH -----
	function checkFileLength() {
        let flag = true;
		let countContract = oldContractFilename.length + newContractFilename.length;
		let countJobOrder = oldJobOrderFilename.length + newJobOrderFilename.length;
		let countLetter   = oldLetterFilename.length + newLetterFilename.length;

		if (countContract > 5) {
			showNotification("danger", "Only 5 files are allowed to upload in Contract");
			flag = false;
		}
		if (countJobOrder > 5) {
			showNotification("danger", "Only 5 files are allowed to upload in Job Order");
			flag = false;
		}
		if (countLetter > 5) {
			showNotification("danger", "Only 5 files are allowed to upload in Engagement Letter");
			flag = false;
		}
		return flag;
	}
	// ----- END CHECK FILE LENGTH -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modalProjectClient");
        const validateFileLength = checkFileLength();

        if (validate && validateFileLength) {
            let data = getFormData("modalProjectClient");
            data.append(`tableData[clientCode]`, generateCode("CLT", false, "pms_client_tbl", "clientCode"));
            data.append(`tableData[createdBy]`, sessionID);
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableName`, `pms_client_tbl`);
            data.append(`feedback`, $("[name=clientName]").val()?.trim());

            // ----- FILES -----
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[0]", "clientContract");
			data.append("uploadFileNewFilename[0]", newContractFilename.join("|"));
			data.append("uploadFileOldFilename[0]", oldContractFilename.join("|"));
			newContractFiles.map((file, index) => {
				data.append(`uploadFiles[0][${index}]`, file);
			})
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[1]", "clientJobOrder");
			data.append("uploadFileNewFilename[1]", newJobOrderFilename.join("|"));
			data.append("uploadFileOldFilename[1]", oldJobOrderFilename.join("|"));
			newJobOrderFiles.map((file, index) => {
				data.append(`uploadFiles[1][${index}]`, file);
			})
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[2]", "clientEngagementLetter");
			data.append("uploadFileNewFilename[2]", newLetterFilename.join("|"));
			data.append("uploadFileOldFilename[2]", oldLetterFilename.join("|"));
			newLetterFiles.map((file, index) => {
				data.append(`uploadFiles[2][${index}]`, file);
			})
			// ----- FILES -----

            sweetAlertConfirmation(
                "add", 
                "Client", 
                "modalProjectClient", 
                null, 
                data, 
                false, 
                tableContent
            );
        }
    });
    // ----- END SAVE MODAL -----


    // ----- OPEN EDIT MODAL -----
    function openEditModal(id = null) {
        $("#modalTitleAddClientHeader").text("EDIT CLIENT");
        $("#modalProjectClient").modal("show");
        $("#modalProjectClientContent").html(preloader); 

        const tableData = getTableData("pms_client_tbl", "*", "clientID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            $("#modalProjectClientContent").html(content);       
            initAll(); 

            if(!allowedUpdate){
                $("#modalProjectClientContent").find("input, select, textarea").each(function(){
                    $(this).attr("disabled",true);
                });
                $("#btnUpdate").hide();
            }
        }
    }
    // ----- END OPEN EDIT MODAL -----


    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function(e) {
        const id   = $(this).attr("id");
        const noShow = $(this).attr("show") == "false";
        if (!noShow) {
            openEditModal(id);
        } else {
            e.preventDefault();
            $(`.btnEdit`).removeAttr("show");
        }
    });
    // ----- END OPEN EDIT MODAL -----


    $(document).on('click', `.client-link`, function() {
        let url = $(this).attr("href");
        window.open(url, "_blank");
        $(`.btnEdit`).attr("show", "false");
    })



    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modalProjectClient");
        const validateFileLength = checkFileLength();
        let clientID = $(this).attr("clientID");

        if (validate && validateFileLength) {

            let data = getFormData("modalProjectClient");
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableName`, `pms_client_tbl`);
            data.append(`whereFilter`, `clientID=${clientID}`);
            data.append(`feedback`, $("[name=clientName]").val()?.trim());

            // ----- FILES -----
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[0]", "clientContract");
			data.append("uploadFileNewFilename[0]", newContractFilename.join("|"));
			data.append("uploadFileOldFilename[0]", oldContractFilename.join("|"));
			newContractFiles.map((file, index) => {
				data.append(`uploadFiles[0][${index}]`, file);
			})
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[1]", "clientJobOrder");
			data.append("uploadFileNewFilename[1]", newJobOrderFilename.join("|"));
			data.append("uploadFileOldFilename[1]", oldJobOrderFilename.join("|"));
			newJobOrderFiles.map((file, index) => {
				data.append(`uploadFiles[1][${index}]`, file);
			})
			data.append("uploadFileFolder", "project-client");
			data.append("uploadFileColumnName[2]", "clientEngagementLetter");
			data.append("uploadFileNewFilename[2]", newLetterFilename.join("|"));
			data.append("uploadFileOldFilename[2]", oldLetterFilename.join("|"));
			newLetterFiles.map((file, index) => {
				data.append(`uploadFiles[2][${index}]`, file);
			})
			// ----- FILES -----

			sweetAlertConfirmation(
				"update",
				"Client",
				"modalProjectClient",
				"",
				data,
				false,
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
				"Client",
				"modalProjectClient"
			);
		} else {
			$("#modalProjectClient").modal("hide");
		}
    });
    // -------- END CANCEL MODAL-----------

    // ------ CHECK CLIENT STATUS -------
    $(document).on("change","#input_clientStatus",function(){
    var tempCategoryStatus = $(this).find("option:selected").val()
    var getclientID = $(this).attr("getclientid") ;
    var itemData = getTableData("pms_category_tbl INNER JOIN pms_client_tbl ON pms_category_tbl.companyName = pms_client_tbl.clientID", 
    "clientStatus", "clientStatus = 1 AND clientID ="+getclientID, "");

    if(itemData.length != 0){
        if(tempCategoryStatus == 0 ){
            setTimeout(function(){
                $(this).removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_clientStatus").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-input_clientStatus").text('This record is currently in use!');
                document.getElementById("btnUpdate").disabled = true;
                
            },200)
                    
                        
        }
        else{
            $(this).removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_clientStatus").removeClass("is-invalid").addClass("is-valid");
            $("#invalid-input_clientStatus").text('');
            document.getElementById("btnUpdate").disabled = false;
        }
    }

});
// ------ END CHECK CLIENT STATUS -------






// CHANGING STATUS;
$(document).on("change", "#input_clientStatus", function(){
    if($(this).attr("getclientid")){    
        let thisClass   =   $(this).parent().children();
        let thisID      =   $(this).attr("getclientid");
        let thisValue   =   $(this).val();
        let tableData   =   getTableData("pms_project_list_tbl","COUNT(projectListID) AS tableDataLength","projectListClientID="+thisID);
        let attrID      =   $(this).attr("id");
        if(tableData[0].tableDataLength > 0 && thisValue == 0){
            setTimeout(function(){
                $("#"+attrID).removeClass("is-valid").removeClass("validated").addClass("is-invalid");
                thisClass.find(".select2-selection").removeClass("no-error").addClass("has-error");
                $("#invalid-input_clientStatus").text(`This record is currently in use!`);
                $("#btnUpdate").prop("disabled", true);
            },180);
        }else{
            $("#btnUpdate").prop("disabled", false);
            $('#'+attrID).removeClass("is-invalid");
            thisClass.find(".select2-selection").addClass("no-error").removeClass("has-error");
        }
    } 
});





});
