$(document).ready(function(){
    

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
		let region = phRegion.filter((item) => {
			if (item.key == regionKey) {
				return item;
			}
		});
		return region.length > 0 ? region[0].name : "";
	};

	function getRegionOptions(regionKey = false) {
		let html = "";
		phRegion.map((item) => {
			html += `<option value="${item.key}" ${
				regionKey == item.key && "selected"
			}>${item.name}</option>`;
		});
		return html;
	}

	function getProvinceOptions(
		provinceKey = false,
		region = "01",
		doEmpty = false
	) {
		let html =
			!provinceKey && `<option value="" selected>Select Province</option>`;
		if (!doEmpty) {
			const provinceList = region && Object.keys(address[region].province_list);
			provinceList &&
				provinceList.map((item) => {
					html += `<option value="${item}" ${
						provinceKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}

	function getMunicipalityOptions(
		municipalityKey = false,
		region = "01",
		province = "ILOCOS NORTE",
		doEmpty = false
	) {
		let html =
			!municipalityKey &&
			`<option value="" selected>Select City/Municipality</option>`;
		if (!doEmpty) {
			const municipalityList =
				region &&
				province &&
				Object.keys(address[region].province_list[province].municipality_list);
			municipalityList &&
				municipalityList.map((item) => {
					html += `<option value="${item}" ${
						municipalityKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}

	function getBarangayOptions(
		barangayKey = false,
		region = "01",
		province = "ILOCOS NORTE",
		city = "ADAMS",
		doEmpty = false
	) {
		let html =
			!barangayKey && `<option value="" selected>Select Barangay</option>`;
		if (!doEmpty) {
			const barangayList =
				region &&
				region &&
				province &&
				address[region].province_list[province].municipality_list[city]
					.barangay_list;
			barangayList &&
				barangayList.map((item) => {
					html += `<option value="${item}" ${
						barangayKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}


	$(document).on("change", "[name=companyRegion]", function () {
		const region = $(this).val();

		if (region) {
			const provinceOptions = getProvinceOptions(false, region);
			$("[name=companyProvince]").html(provinceOptions);
		} else {
			const provinceOptions = getProvinceOptions(false, "", true);
			$("[name=companyProvince]").html(provinceOptions);
		}

		const municipality = getMunicipalityOptions(false, "", "", true);
		$("[name=companyCity]").html(municipality);

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=companyBarangay]").html(barangay);
	});

	$(document).on("change", "[name=companyProvince]", function () {
		const region = $("[name=companyRegion]").val();
		const province = $(this).val();

		if (province) {
			const municipalityOptions = getMunicipalityOptions(
				false,
				region,
				province
			);
			$("[name=companyCity]").html(municipalityOptions);
		} else {
			const municipalityOptions = getMunicipalityOptions(false, "", "", true);
			$("[name=companyCity]").html(municipalityOptions);
		}

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=companyBarangay]").html(barangay);
	});

	$(document).on("change", "[name=companyCity]", function () {
		const region = $("[name=companyRegion]").val();
		const province = $("[name=companyProvince]").val();
		const city = $(this).val();

		if (city) {
			const barangay = getBarangayOptions(false, region, province, city);
			$("[name=companyBarangay]").html(barangay);
		} else {
			const barangay = getBarangayOptions(false, "", "", "", true);
			$("[name=companyBarangay]").html(barangay);
		}
	});
	// ----- END GET PHILIPPINE ADDRESSES -----

    // ----- DISPLAY EMPLOYEE SIGNATURE -----
    function displayImage(file = null, link = true) {
        let html = ``;
        if (file && file != null && file != "null") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/company-logo/"+file}" 
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
                    text-overflow: ellipsis;
					color: black;"
                    ${otherAttr}>
                    ${file}
                </a>
			</div>`
        }
        return html;
    }
    // ----- END DISPLAY EMPLOYEE SIGNATURE -----



    pageContent();


    function pageContent(isSave = false){
        $("#page_content").html(preloader);
        let tableData = getTableData("gen_company_profile_tbl","","");
        let {
            companyProfileID        =   "",
            companyName             =   "Blackcoders Group Incorporated",
            companyIncorpation      =   new Date(),
            companyBusinessType     =   "",
            companyTIN              =   "",
            companyUnitNo           =   "",
            companyBuildingNo       =   "",
            companyStreetName       =   "",
            companySubdivisionName  =   "",
            companyBarangay         =   "",
            companyCity             =   "",
            companyProvince         =   "",
            companyRegion           =   "",
            companyZipcode          =   "",
            companyCountry          =   "",
            companyEmail            =   "", 
            companyTelephone        =   "",
            companyMobile           =   "",
            companyWebsite          =   "",
            companyLogo             =   "", 
            createdBy               =   "",
            createdAt               =   "",
            updatedBy               =   "",
            updatedAt               =   "",
        } = tableData[0] || false;              
        
        let button  =  isSave ?  ` <button  class="btn btn-save px-5 p-2 w-100" id="btnSave" companyid="${companyProfileID ? encryptString(companyProfileID) : `false`}" type="button"><i class="fas fa-save"></i> Save </button>` 
                            : ` <button class="btn btn-save px-5 p-2 w-100 btnUpdate"  type="button"><i class="fas fa-save"></i> Update </button>`; 
        let html    = `
        
        <form id="company_profile_form">
            <div class="row">
                
                <div class="col-lg-12">
                    <div class="form-group">
                        <label for="">Company Name</label>
                        <input type="text" class="form-control validate" name="companyName" id="companyName" value="${companyName || ""}"
                            data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150"  required >
                        <div class="invalid-feedback d-block" id="invalid-companyName"></div>
                    </div>
                </div>

                <div class="col-lg-4 col-">
                    <div class="form-group">
                        <label>Date of Incorporation</label>
                        <input
                            type="button"
                            class = "form-control daterange text-left"
                            name = "companyIncorpation"
                            id="companyIncorpation"  
                            value = "${moment().format("MMMM DD, YYYY")}"  required>
                        <div class="invalid-feedback d-block" id="invalid-companyIncorpation"></div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="form-group">
                        <label for="companyBusinessType">Business Type</label>
                        <select class="form-control validate select2 w-100" name="companyBusinessType" id="companyBusinessType" required>
                            ${getBusinessType(companyBusinessType)}
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-companyBusinessType"></div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Tax Identification Number (TIN) </label>
                            <input 
                                type="text" 
                                class="form-control inputmask" 
                                name="companyTIN" 
                                id="companyTIN" 
                                data-allowcharacters="[0-9]" 
                                minlength="15" 
                                maxlength="15" 
                                value="${companyTIN||""}"
                                mask="999-999-999-999"
                                required
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-companyTIN"></div>
                    </div>
                </div>
                
                <div class="col-lg-1">
                    <div class="form-group">
                        <label>Unit Number </label>
                            <input class="form-control validate"
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/]"  
                                minlength="2"
                                maxlength="50"  
                                id="companyUnitNo" 
                                value="${companyUnitNo || ""}"
                                name="companyUnitNo" 
                                autocomplete="off"
                                type="text">
                            <div class="invalid-feedback d-block" id="invalid-companyUnitNo"></div>
                    </div>
                </div>
                
                <div class="col-lg-2">
                    <div class="form-group">
                        <label>Building/House Number <code>*</code></label>
                        <input class="form-control validate"
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
                            minlength="2" 
                            maxlength="75" 
                            id="companyBuildingNo" 
                            name="companyBuildingNo" 
                            value="${companyBuildingNo||""}" 
                            type="text"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-companyBuildingNo"></div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="form-group">
                        <label>Street Name </label>
                        <input class="form-control validate"
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
                            minlength="2" 
                            maxlength="75" 
                            id="companyStreetName" 
                            name="companyStreetName" 
                            value="${companyStreetName||""}" 
                            type="text"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-companyStreetName"></div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="form-group">
                        <label>Subdivision Name </label>
                        <input class="form-control validate"
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
                            minlength="2" 
                            maxlength="75" 
                            id="input_subdivision" 
                            name="companySubdivisionName" 
                            value="${companySubdivisionName||""}" 
                            autocomplete="off"
                            type="text">
                        <div class="invalid-feedback d-block" id="invalid-input_subdivision"></div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="form-group">
                        <label>Country <code>*</code></label>
                        <input class="form-control validate"
                            data-allowcharacters="[a-z][A-Z][ ]" 
                            id="companyCountry" 
                            name="companyCountry" 
                            minlength="2"
                            maxlength="75" 
                            value="${companyCountry||""}" 
                            type="text"
                            autocomplete="off"
                            required>
                        <div class="invalid-feedback d-block" id="invalid-companyCountry"></div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="form-group">
                        <label>Region <code>*</code></label>
                        <select class="form-control show-tick select2 validate" name="companyRegion" id="companyRegion" style="width: 100%">
                            <option value="" selected>Select Region</option>
                            ${getRegionOptions(companyRegion)} 
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-companyRegion"></div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="form-group">
                        <label>Province <code>*</code></label>
                        <select class=" form-control show-tick select2 validate" name="companyProvince" id="companyProvince" style="width: 100%">
                            <option value="" selected>Select Province</option>
                            ${getProvinceOptions(companyProvince, companyRegion)} 
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-companyProvince"></div>
                    </div>
                </div>

                <div class="col-3">
                    <div class="form-group">
                        <label>City/Municipality <code>*</code></label>
                        <select class=" form-control show-tick select2" id="companyCity" name="companyCity" style="width: 100%">
                            <option value="" selected>Select City/Municipality</option>
                            ${getMunicipalityOptions(companyCity, companyRegion, companyProvince)} 
                        </select> 
                        <div class="invalid-feedback d-block" id="invalid-companyCity"></div>
                    </div>
                </div>

                <div class="col-lg-2">
                    <div class="form-group">
                        <label>Barangay <code>*</code></label>
                        <select class=" form-control show-tick select2 validate" name="companyBarangay" id="companyBarangay" style="width: 100%">
                            <option value="" selected>Select Barangay</option>
                            ${getBarangayOptions(companyBarangay, companyRegion, companyProvince, companyCity)} 
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-companyBarangay"></div>
                    </div>
                </div>

                <div class="col-lg-1">
                    <div class="form-group">
                        <label>Zip Code </label>
                        <input class="form-control validate"
                            data-allowcharacters="[0-9]" id="companyZipcode" name="companyZipcode" minlength="4" autocomplete="off"
                            maxlength="4" value="${companyZipcode}" type="text">
                        <div class="invalid-feedback d-block" id="invalid-companyZipcode"></div>
                    </div>
                </div>
                

                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Email Address </label>
                        <input 
                            type="email" 
                            class="form-control validate" 
                            name="companyEmail" 
                            id="companyEmail" 
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][_][@]"
                            minlength="2" 
                            maxlength="50" 
                            value="${companyEmail||""}"
                            placeholder="sample@email.com"
                            autocomplete="off" required>
                        <div class="invalid-feedback d-block" id="invalid-companyEmail"></div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Telephone No. </label>
                            <input type="text" 
                            class="form-control inputmask" 
                            name="companyTelephone" 
                            id="companyTelephone" 
                            data-allowcharacters="[0-9]" 
                            mask="(99)-9999-9999" 
                            minlength="14" 
                            maxlength="14"  
                            value="${companyTelephone||""}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-companyTelephone"></div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="form-group">
                        <label>Mobile No. <code>*</code></label>
                            <input 
                            type="text" 
                            class="form-control inputmask" 
                            name="companyMobile" 
                            id="companyMobile" 
                            data-allowcharacters="[0-9]" 
                            mask="0\\999-999-9999" 
                            minlength="14" 
                            maxlength="14"
                            value="${companyMobile||""}"
                            autocomplete="off"
                            >
                        <div class="invalid-feedback d-block" id="invalid-companyMobile"></div>
                    </div>
                </div>
               
                

                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="">Company Website</label>
                        <input type="text" class="form-control validate" name="companyWebsite" id="companyWebsite" 
                            data-allowcharacters="[a-z][A-Z][0-9][_][.][/][:]" minlength="2" maxlength="150" value="${companyWebsite||""}" >
                        <div class="invalid-feedback d-block" id="invalid-companyWebsite"></div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-group">
                        <label>Comapany Logo</label>
                        <input type="file"
                            class="form-control validate"
                            name="companyLogo|company-logo"
                            id="companyLogo" required
                            file="${companyLogo}">
                        <div class="invalid-feedback d-block" id="invalid-companyLogo"></div>
                        <div id="displayImage" style="${companyLogo?'display:block;':'display:none;'} font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">${displayImage(companyLogo)}</div>
                    </div>

                </div>


                <div class="col-lg-4 col-0"></div>
                <div class="col-lg-4 col-12">
                   ${button}
                </div>
                <div class="col-lg-4 col-0"></div>

            </div>
        </form> 
        `;

        setTimeout(() => {
                $("#page_content").html(html);
                disabledForm("page_content", !isSave); 
                initAll();
        }, 500);
    }

    
    $(document).on("click",".btnUpdate", function(){
        pageContent(true);
    });

    $(document).on("click","#btnSave",function(){
        let companyProfileID    = $(this).attr("companyid");
        let condition           = validateForm("company_profile_form");
        if(condition)
        {   let data            = getFormData("company_profile_form", false);
            let action;   
            if(companyProfileID != "false"){
                action = "update";
                data.append(`whereFilter`, "companyProfileID="+decryptString(companyProfileID));
            }else{
                action = "add";
                data.append(`tableData[createdBy]`, sessionID);
            }
            data.append(`feedback`,  $("#companyName").val());
            data.append(`tableData[updatedBy]`, sessionID);
            data.append(`tableName`, "gen_company_profile_tbl");
            sweetAlertConfirmation(action, "Company Profile","isNotModal", "page_content" , data, false, pageContent);
        }
        // pageContent(false);
    });

    // ----- SELECT IMAGE -----
    $(document).on("change", "[id=companyLogo]", function(e) {
        e.preventDefault();
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;

            console.log(filetype);

            if (filesize > 10) {
                $(`#displayImage`).empty();
                $(`[name="companyLogo"]`).val("");
                $(`[name="companyLogo"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("image") == -1 && filetype.indexOf("jpeg") == -1 && filetype.indexOf("jpg") == -1 && filetype.indexOf("png") == -1) {
                $(`#displayImage`).empty();
                $(`[name="companyLogo"]`).val("");
                $(`[name="companyLogo"]`).removeAttr("file");
                $(`#displayImage`).css('display','none');
                showNotification("danger", "Invalid file type");
            } else {
                $("#companyLogo").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-companyLogo").text("");
                $(`#displayImage`).css('display','block');
                $(`#displayImage`).html(displayImage(filename, false));
                $(this).attr("file", filename);
            }
        }
    })
    // ----- END SELECT IMAGE -----

    // ----- REMOVE FILE -----
    $(document).on("click", `.btnRemoveFile`, function() {
        $parent = $(this).closest(".form-group");

        $parent.find(`[type="file"]`).val("");
        $parent.find(`[type="file"]`).removeAttr("file");
        $parent.find(".displayfile").children().remove();
    })
    // ----- END REMOVE FILE -----
    
    function disabledForm(formID, isDisabled = true){
        $(`#${formID}`).find(`select, input`).each(function(){
            $(this).prop("disabled", isDisabled);
            preventRefresh(isDisabled ? false: true);
        });
    }



    function getBusinessType(companyBusinessType = false){
        // -------- Business Type	
        //  0 Sole Proprietorship	
        //  1 Business Corporation	
        //  2 General Partnership	
        //  3 Limited Partnership	
        //  4 Joint Venture	
        //  5 Non-profit Legal Person	
        //  6 Association	
        //  7 Cooperative	
        //  8 Group of Person
        let array = [
             "Sole Proprietorship"	
              ,"Business Corporation"	
              ,"General Partnership"	
              ,"Limited Partnership"	
              ,"Joint Venture"	
              ,"Non-profit Legal Person"	
              ,"Association"	
              ,"Cooperative"	
              ,"Group of Person"
                    ];
        let html = `<option disabled ${!companyBusinessType && "selected"}>Select business type</option>`;
        array.map((value,index)=>{
            html += `<option ${index === companyBusinessType && "selected"} value="${index}">${value}</option>`;
        });
        return html;
    }

});