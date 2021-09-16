$(document).ready(function() {
    // GLOBAL VARIABLES
        let applicantID = $("#table_content").data('applicantid') ? $("#table_content").data('applicantid') : 0;
    // END OF GLOBAL VARIABLES

	// ----- TABLE CONTENT -----
	function tableContent() {
		preventRefresh(false);

        $("#table_content").html(preloader);
        setTimeout(() => {
            const applicantData = getTableData(
                `web_applicant_list_tbl`,
                `*`,
                `applicantID = ${applicantID}`
            );

            $("#table_content").html(applicantInformationTab(applicantData[0]));
            initAll();
            const disabledFutureDates = {
                autoUpdateInput:  false,
                singleDatePicker: true,
                showDropdowns:    true,
                autoApply:        true,
                locale: {
                    format: "MMMM DD, YYYY",
                },
                maxDate: moment(new Date).format("MMMM DD, YYYY"),
            }
            initDateRangePicker("#applicantBirthday", disabledFutureDates);
        }, 500);
	}   

	tableContent();
	// ----- END TABLE CONTENT -----

    // ----- DATATABLES -----
    function initJobDataTables() {
        if ($.fn.DataTable.isDataTable('#tableJobPosting')){
            $('#tableJobPosting').DataTable().destroy();
        }
        
        var table = $("#tableJobPosting").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
            { targets: 0}
            ],
        });
    }

    function initAppliedDataTables() {
        if ($.fn.DataTable.isDataTable('#tableAppliedJob')){
            $('#tableAppliedJob').DataTable().destroy();
        }
        
        var table = $("#tableAppliedJob").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
            { targets: 0}
            ],
        });
    }

    // SELECT SIDEBAR
    $(document).on("click", `.sidebar-web-menu`, function() {
        preventRefresh(false);

        let sidebarID = $(this).attr('id');

        if(sidebarID=="logout") return;

        $("#table_content").html(preloader);

        $(".sidebar-web-menu").removeClass("active")
        $(this).addClass("active");

        setTimeout(() => {
            if(sidebarID=="profile"){
                const applicantData = getTableData(
                    `web_applicant_list_tbl`,
                    `*`,
                    `applicantID = ${applicantID}`
                );
                
                $("#table_content").html(applicantInformationTab(applicantData[0]));
            }else if(sidebarID=="appliedjob"){
                const appliedJobsData = getTableData( `web_applicant_job_tbl AS appJob
                                                       INNER JOIN hris_job_posting_tbl as postJob ON postJob.jobID = appJob.jobID
                                                      `, `*, DATE_FORMAT(dateApplied, "%M %d, %Y %H:%i:%S") AS 'dateApplied'`, `applicantID = ${applicantID}` );
              
                $("#table_content").html(appliedJobsTab(appliedJobsData));
                initAppliedDataTables();
            }else if(sidebarID=="vacant"){
                const jobData = getTableData( `hris_job_posting_tbl`, `*` );

                $("#table_content").html(vacantTab(jobData));
                initJobDataTables();
            }
            
            initAll();
            const disabledFutureDates = {
                autoUpdateInput:  false,
                singleDatePicker: true,
                showDropdowns:    true,
                autoApply:        true,
                locale: {
                    format: "MMMM DD, YYYY",
                },
                maxDate: moment(new Date).format("MMMM DD, YYYY"),
            }
            initDateRangePicker("#applicantBirthday", disabledFutureDates);
        }, 500);
    });
    // END OF SELECT SIDEBAR

    // ----- CIVIL STATUS OPTIONS -----
    function civilStatusOptions(civilstatus = null) {
        let options = ["Single", "Married", "Widowed", "Divorced", "Separated"];
        return options.map(option => {
            return `
            <option 
                value="${option}"
                ${option == civilstatus.trim() ? "selected" : ""}>
                ${option}
            </option>`;
        }).join("");
    }
    // ----- END CIVIL STATUS OPTIONS -----


    // ----- CITIZENSHIP OPTIONS -----
    const citizenshipList = function() {
		let result = [];
		$.ajax({
			method: "GET",
			url: `${base_url}assets/json/countries.json`,
			async: false,
			dataType: "json",
			success: function (data) {
				result = data;
			},
		});
		return result;
	}();

    function citizenshipOptions(nationality = null) {
        return citizenshipList.map(citizenship => {
            return `
            <option 
                value="${citizenship.nationality}" 
                ${citizenship.nationality == nationality ? "selected" : ""}>
                ${citizenship.nationality}
            </option>`
        })
    }
    // ----- END CITIZENSHIP OPTIONS -----

    // ----- CHANGE GENDER -----
    $(document).on("change", "[name=applicantGender]", function() {
        const gender = $(this).val();
        if (gender != "Male" && gender != "Female") {
            $("[name=applicantOtherGender]").removeAttr("disabled");
            $("[name=applicantOtherGender]").attr("required", "true");
            $("[name=applicantOtherGender]").focus();
        } else {
            $("[name=applicantOtherGender]").removeClass("is-invalid").removeClass("is-valid");
            $("[name=applicantOtherGender]").parent().find(".invalid-feedback").text("");
            $("[name=applicantOtherGender]").attr("disabled", "true");
            $("[name=applicantOtherGender]").removeAttr("required");
            $("[name=applicantOtherGender]").val('');
        }
    })
    // ----- END CHANGE GENDER -----

    // ----- PHILIPPINE ADDRESSES -----
    const address = function() {
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
	}();
    // ----- END PHILIPPINE ADDRESSES -----

    // ----- REGION OPTIONS -----
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

    function regionOptions(regionKey = null) {
		let html = phRegion.map((region) => {
			return `
            <option 
                value="${region.key}" 
                ${regionKey == region.key ? "selected" : ""}>
                ${region.name}
            </option>`;
		});
        return html.join("");
    }

    $(document).on("change", "[name=applicantRegion]", function () {
		const region = $(this).val();

		if (region) {
			const provinceOptionsHTML = provinceOptions(false, region);
			$("[name=applicantProvince]").html(provinceOptionsHTML);
		} else {
			const provinceOptionsHTML = provinceOptions(false, "", true);
			$("[name=applicantProvince]").html(provinceOptionsHTML);
		}

		const cityOptionsHTML = cityOptions(false, "", "", true);
		$("[name=applicantCity]").html(cityOptionsHTML);

		const barangayOptionsHTML = barangayOptions(false, "", "", "", true);
		$("[name=applicantBarangay]").html(barangayOptionsHTML);
	});
    // ----- END REGION OPTIONS -----


    // ----- PROVINCE OPTIONS -----
    function provinceOptions(provinceKey = false, regionKey = null, doEmpty = false) {
		let html = !provinceKey && `<option value="" selected>Select Province</option>`;
		if (!doEmpty) {
			const provinceList = regionKey && Object.keys(address[regionKey].province_list);
			provinceList &&
				provinceList.map((item) => {
					html += `
                    <option 
                        value="${item}" 
                        ${provinceKey == item && "selected"}>
                        ${item}
                    </option>`;
				});
		}
		return html;
    }

    $(document).on("change", "[name=applicantProvince]", function () {
		const regionKey   = $("[name=applicantRegion]").val();
		const provinceKey = $(this).val();

		if (provinceKey) {
			const cityOptionsHTML = cityOptions(false, regionKey, provinceKey);
			$("[name=applicantCity]").html(cityOptionsHTML);
		} else {
			const cityOptionsHTML = cityOptions(false, "", "", true);
			$("[name=applicantCity]").html(cityOptionsHTML);
		}

		const barangayOptionsHTML = barangayOptions(false, "", "", "", true);
		$("[name=applicantBarangay]").html(barangayOptionsHTML);
	});
    // ----- END PROVINCE OPTIONS -----


    // ----- CITY OPTIONS -----
    function cityOptions(municipalityKey = false, regionKey = null, provinceKey = null, doEmpty = false) {
		let html = !municipalityKey && `<option value="" selected>Select City/Municipality</option>`;
		if (!doEmpty) {
			const municipalityList = regionKey && provinceKey && Object.keys(address[regionKey].province_list[provinceKey].municipality_list);
			municipalityList &&
				municipalityList.map((item) => {
					html += 
                    `<option 
                        value="${item}" 
                        ${municipalityKey == item && "selected"}>
                        ${item}
                    </option>`;
				});
		}
		return html;
    }

    $(document).on("change", "[name=applicantCity]", function () {
		const regionKey   = $("[name=applicantRegion]").val();
		const provinceKey = $("[name=applicantProvince]").val();
		const cityKey     = $(this).val();

		if (cityKey) {
			const barangayOptionsHTML = barangayOptions(false, regionKey, provinceKey, cityKey);
			$("[name=applicantBarangay]").html(barangayOptionsHTML);
		} else {
			const barangayOptionsHTML = barangayOptions(false, "", "", "", true);
			$("[name=applicantBarangay]").html(barangayOptionsHTML);
		}
	});
    // ----- END CITY OPTIONS -----

    // ----- CITY OPTIONS -----
    function barangayOptions(barangayKey = false, regionKey = null, provinceKey = null, cityKey = null, doEmpty = false) {
		let html = !barangayKey && `<option value="" selected>Select Barangay</option>`;
		if (!doEmpty) {
			const barangayList = regionKey && provinceKey && cityKey && address[regionKey].province_list[provinceKey].municipality_list[cityKey].barangay_list;
			barangayList &&
				barangayList.map((item) => {
					html += 
                    `<option 
                        value="${item}" 
                        ${barangayKey == item && "selected"}>
                        ${item}
                    </option>`;
				});
		}
		return html;
    }
    // ----- END CITY OPTIONS -----

    // ----- SELECT PROFILE IMAGE -----
    function previewImage(input, defaultImage = "default.jpg") {
        if (input.files && input.files[0]) {
            const filesize = input.files[0].size/1024/1024; // Size in MB
            const filetype = input.files[0].type;
            if (filesize > 10) {
                $(input).val("");
                $('#previewImage').attr('src', `${base_url}assets/upload-files/profile-images/${defaultImage}`);
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("image") == -1) {
                $(input).val("");
                $('#previewImage').attr('src', `${base_url}assets/upload-files/profile-images/${defaultImage}`);
                showNotification("danger", "Invalid file type");
            } else {
                let reader = new FileReader();
                reader.onload = function(e) {
                    $('#previewImage').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]); 
            }
        }

        if ($("[name=applicantProfile]").val()) {
            $("#removeProfile").removeClass("d-none").addClass("d-block");
        } else {
            $("#removeProfile").removeClass("d-block").addClass("d-none");
        }
    }

    $(document).on("change", "[name=applicantProfile]", function() {
        const defaultImage = $(this).attr("default");
        previewImage(this, defaultImage);
    })
    // ----- END SELECT PROFILE IMAGE -----

    // ----- REMOVE E-SIGNATURE -----
    $(document).on("click", `.btnRemoveResume`, function() {
        $(`#displayResume`).empty();
        $(`[name="applicantResume"]`).val("");
        $(`[name="applicantResume"]`).removeAttr("resume");
        $(`#displayResume`).css('display','none');
        $("#applicantResume").removeClass("is-valid").addClass("is-invalid");
        $("#invalid-applicantResume").text("This field is required.");
    })
    // ----- END REMOVE E-SIGNATURE -----

    // ----- SELECT E-SIGNATURE -----
    $(document).on("change", "[name=applicantResume]", function() {
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;

            if (filesize > 10) {
                $(this).val("");
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("msword") == -1 && filetype.indexOf("openxmlformats") == -1 && filetype.indexOf("ms-excel") == -1 && filetype.indexOf("ms-powerpoint") == -1 && filetype.indexOf("pdf") == -1) {
                $(this).val("");
                showNotification("danger", "Invalid file type");
            } else {
                $("#applicantResume").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-applicantResume").text("");
                $(`#displayResume`).css('display','block');
                $(`#displayResume`).html(displayApplicantResume(filename, false));
            }
        }
    })
    // ----- END SELECT E-SIGNATURE -----

    // ----- REMOVE PROFILE IMAGE -----
    $(document).on("click", "#removeProfile", function() {
        $("[name=applicantProfile]").val("");
        $(`[name="applicantProfile"]`).attr("default", "default.jpg");
        $('#previewImage').attr('src', `${base_url}assets/upload-files/profile-images/default.jpg`);

        if ($("[name=applicantProfile]").val()) {
            $("#removeProfile").removeClass("d-none").addClass("d-block");
        } else {
            $("#removeProfile").removeClass("d-block").addClass("d-none");
        }
    })
    // ----- END REMOVE PROFILE IMAGE -----

    // ----- DISPLAY APPLICANT SIGNATURE -----
    function displayApplicantResume(applicantResume = null, link = true) {
        let html = ``;
        if (applicantResume && applicantResume != null && applicantResume != "null" && applicantResume != "undefined") {
            let otherAttr = link ? `
            href="${base_url+"assets/upload-files/resumes/"+applicantResume}" 
            target="_blank"` : `href="javascript:void(0)"`;
            html = `
            <div class="d-flex justify-content-start align-items-center p-0">
                <span class="btnRemoveResume pr-2" style="cursor: pointer"><i class="fas fa-close"></i></span>
                <a class="filename"
                    title="${applicantResume}"
                    style="display: block;
                    color: black;
                    width: 90%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;"
                    ${otherAttr}>
                    ${applicantResume}
                </a>
			</div>`
        }
        return html;
    }
    // ----- END DISPLAY APPLICANT SIGNATURE -----

    // ----- APPLICANT INFORMATION TAB -----
    function applicantInformationTab(data = false) {   
        
        let {
            applicantID          = "",
            applicantProfile     = "default.jpg",
            applicantFirstname   = "",
            applicantMiddlename  = "",
            applicantLastname    = "",
            applicantBirthday    = "",
            applicantGender      = "",
            applicantCitizenship = "",
            applicantCivilStatus = "",
            applicantTIN         = "",
            applicantSSS         = "",
            applicantPhilHealth  = "",
            applicantPagibig     = "",
            applicantUsername    = "",
            applicantPassword    = "",
            applicantRegion      = "",
            applicantProvince    = "",
            applicantCity        = "",
            applicantBarangay    = "",
            applicantUnit        = "",
            applicantBuilding    = "",
            applicantStreet      = "",
            applicantSubdivision = "",
            applicantCountry     = "",
            applicantZipCode     = "",
            applicantEmail       = "",
            applicantMobile      = "",
            applicantResume      = "",
            applicantStatus      = "",
        } = data;
        
        let profile = applicantProfile != null ? applicantProfile : "default.jpg";

        let html = `
        <div class="forms-group">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="body p-0">
                        <div class='row'>
                            <div class="form-group col-2">
                                <div class="d-flex justify-content-center flex-column">
                                    <div class="img-fluid" style='border: 1px dashed #e6e6e6; padding: 20px; margin-bottom:0px; max-width:100%;' id="previewImageParent">
                                        <span class="${profile != "default.jpg" ? "d-block" : "d-none"}" id="removeProfile">x</span>
                                        <img class="rounded w-100 h-100" id="previewImage"   src="${base_url}assets/upload-files/profile-images/${profile}">
                                    </div>
                                    <div>
                                        <input 
                                            type="file"
                                            class="form-control validate"
                                            name="applicantProfile"
                                            id="applicantProfile"
                                            default="${profile}"
                                            accept=".png, .svg, .jpg, .jpeg, .gif">
                                    </div>
                                </div>

                                <div class="form-group pt-3">
                                    <label>Resume</label>
                                    <input type="file"
                                        class="form-control validate"
                                        name="applicantResume"
                                        id="applicantResume"
                                        resume="${applicantResume}"
                                        accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document , application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*">
                                    <div class="invalid-feedback d-block" id="invalid-applicantResume"></div>
                                    <div class="resume" id="displayResume" style="${applicantResume?'display:block;':'display:none;'} font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">
                                        ${displayApplicantResume(applicantResume)}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group col-10">
                                <div class="header pl-0">
                                    <h3><strong class="text-secondary">Basic Information</strong></h3>
                                </div>

                                <div class='row'>
                                    <div class="form-group col-4">
                                        <label>First Name <code>*</code></label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantFirstname"
                                            id="applicantFirstname"
                                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                            minlength="2"
                                            maxlength="50"
                                            autocomplete="off"
                                            required
                                            value="${applicantFirstname}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantFirstname"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Middle Name</label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantMiddlename"
                                            id="applicantMiddlename"
                                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                            minlength="2"
                                            maxlength="50"
                                            autocomplete="off"
                                            value="${applicantMiddlename}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantMiddlename"></div>
                                    </div>
                                    
                                    <div class="form-group col-4">
                                        <label>Last Name <code>*</code></label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantLastname"
                                            id="applicantLastname"
                                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                            minlength="2"
                                            maxlength="50"
                                            autocomplete="off"
                                            required
                                            value="${applicantLastname}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantLastname"></div>
                                    </div>
                                    
                                    <div class="form-group col-4">
                                        <label>Birthdate <code>*</code></label>
                                        <input type="button"
                                            class="form-control validate daterange text-left"
                                            name="applicantBirthday"
                                            id="applicantBirthday"
                                            autocomplete="off"
                                            required
                                            value="${applicantBirthday ? moment(applicantBirthday).format("MMMM DD, YYYY") : ""}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantBirthday"></div>
                                    </div>
                                    
                                    <div class="form-group col-2">
                                        <label>Citizenship <code>*</code></label>
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantCitizenship"
                                            id="applicantCitizenship"
                                            required>
                                            <option value="" selected disabled>Select Citizenship</option>
                                            ${citizenshipOptions(applicantCitizenship)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantCitizenship"></div>
                                    </div>

                                    <div class="form-group col-2">
                                        <label>Civil Status <code>*</code></label>
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantCivilStatus"
                                            id="applicantCivilStatus"
                                            required>
                                            <option value="" selected disabled>Select Civil Status</option>
                                            ${civilStatusOptions(applicantCivilStatus)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantLastname"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Gender <code>*</code></label>
                                        <div class="d-flex align-items-center">
                                            <div style="flex: 1">
                                                <input type="radio" value="Female" name="applicantGender" ${applicantGender ? (applicantGender == "Female" ? "checked" : "") : "checked"}> <span>Female</span>
                                            </div>
                                            <div class="px-2" style="flex: 1">
                                                <input type="radio" value="Male" name="applicantGender" ${applicantGender == "Male" ? "checked" : ""}> <span>Male</span>
                                            </div>
                                            <div class="d-flex" style="flex: 3">
                                                <div class="d-flex align-items-center pr-2">
                                                    <input type="radio" value="Others" name="applicantGender" ${applicantGender ? (applicantGender != "Male" && applicantGender != "Female" ? "checked" : "") : ""}> <span class="ml-2">Others</span>
                                                </div>
                                                <div class="form-group mb-0">
                                                    <input 
                                                        type="text" 
                                                        class="form-control validate ml-2" 
                                                        placeholder="Please Specify" name="applicantOtherGender"
                                                        id="applicantOtherGender"
                                                        data-allowcharacters="[a-z][A-Z][ ]"
                                                        minlength="2"
                                                        maxlength="50"
                                                        ${applicantGender ? (applicantGender == "Male" || applicantGender == "Female" ? "disabled" : "") : "disabled"}
                                                        value="${applicantGender == "Male" || applicantGender == "Female" ? "" : applicantGender}">
                                                    <div class="invalid-feedback" id="invalid-applicantOtherGender"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-applicantGender"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Mobile No. <code>*</code></label>
                                        <input type="text"
                                            class="form-control inputmask"
                                            placeholder="Mobile No. *"
                                            mask="0\\999-999-9999"
                                            data-allowcharacters="[0-9]"
                                            minlength="13"
                                            maxlength="13"
                                            name="applicantMobile"
                                            id="applicantMobile"
                                            autocomplete="off"
                                            required
                                            value="${applicantMobile}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantMobile"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Email Addres <code>*</code></label>
                                        <input type="email"
                                            class="form-control validate"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_]"
                                            minlength="2"
                                            maxlength="100"
                                            name="applicantEmail"
                                            id="applicantEmail"
                                            autocomplete="off"
                                            placeholder="sample@email.com"
                                            required
                                            value="${applicantEmail}"
                                            ${applicantEmail? 'disabled' : ''}
                                            title="Email">
                                        <div class="invalid-feedback d-block" id="invalid-applicantEmail"></div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group col-3">
                                        <label>Tax Identification No.</label>
                                        <input type="text"
                                            class="form-control inputmask"
                                            mask="999-999-999"
                                            name="applicantTIN"
                                            id="applicantTIN"
                                            data-allowcharacters="[0-9]"
                                            minlength="11"
                                            maxlength="11"
                                            placeholder="000-000-000"
                                            value="${applicantTIN}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantTIN"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>SSS No.</label>
                                        <input type="text"
                                            class="form-control inputmask"
                                            mask="99-9999999-9"
                                            name="applicantSSS"
                                            id="applicantSSS"
                                            data-allowcharacters="[0-9]"
                                            minlength="12"
                                            maxlength="12"
                                            placeholder="00-0000000-0"
                                            value="${applicantSSS}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantSSS"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>PhilHealth No.</label>
                                        <input type="text"
                                            class="form-control inputmask"
                                            mask="99-999999999-9"
                                            name="applicantPhilHealth"
                                            id="applicantPhilHealth"
                                            data-allowcharacters="[0-9]"
                                            minlength="14"
                                            maxlength="14"
                                            placeholder="00-000000000-0"
                                            value="${applicantPhilHealth}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantPhilHealth"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Pag-IBIG MID No.</label>
                                        <input type="text"
                                            class="form-control inputmask"
                                            mask="9999-9999-9999"
                                            name="applicantPagibig"
                                            id="applicantPagibig"
                                            data-allowcharacters="[0-9]"
                                            minlength="14"
                                            maxlength="14"
                                            placeholder="0000-0000-0000"
                                            value="${applicantPagibig}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantPagibig"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Username <code>*</code></label>
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                            <span class="input-group-text bg-transparent border-right-0">
                                                <i class="fas fa-user"></i></span>
                                            </div>
                                            <input type="text"
                                                class="form-control validate"
                                                name="applicantUsername"
                                                id="applicantUsername"
                                                data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                                minlength="2"
                                                maxlength="75"
                                                required
                                                title="Username"
                                                value="${applicantUsername}">
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-applicantUsername"></div>
                                    </div>
                                    
                                    <div class="form-group col-4">
                                        <label>Password <code>*</code></label>
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                            <span class="input-group-text bg-transparent border-right-0">
                                                <i class="fas fa-lock"></i></span>
                                            </div>
                                            <input type="password"
                                                class="form-control validate"
                                                name="applicantPassword"
                                                id="applicantPassword"
                                                data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                                minlength="2"
                                                maxlength="75"
                                                required
                                                value="${applicantPassword}">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-left-0">
                                                    <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="text-primary fas fa-eye"></i></a>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-applicantPassword"></div>
                                    </div>

                                    <div class="form-group col-4">
                                        <label>Confirm Password <code>*</code></label>
                                        <div class="input-group">
                                            <div class="input-group-prepend bg-transparent">
                                            <span class="input-group-text bg-transparent border-right-0">
                                                <i class="fas fa-lock"></i></span>
                                            </div>
                                            <input type="password"
                                                class="form-control"
                                                name="applicantConfirmPassword"
                                                id="applicantConfirmPassword"
                                                data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                                minlength="2"
                                                maxlength="75"
                                                required
                                                value="${applicantPassword}">
                                            <div class="input-group-prepend bg-transparent">
                                                <span class="input-group-text bg-transparent border-left-0">
                                                    <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="text-primary fas fa-eye"></i></a>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-applicantConfirmPassword"></div>
                                    </div>
                                </div>

                                <div class="header pl-0">
                                    <h3><strong class="text-secondary">Address Information</strong></h3>
                                </div>
                                

                                <div class='row'>
                                    <div class="form-group col-3">
                                        <label>Region <code>*</code></label>
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantRegion"
                                            id="applicantRegion"
                                            required>
                                            <option value="" selected disabled>Select Region</option>
                                            ${regionOptions(applicantRegion)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantRegion"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Province <code>*</code></label>
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantProvince"
                                            id="applicantProvince"
                                            required>
                                            ${provinceOptions(applicantProvince, applicantRegion)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantProvince"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>City/Municipality <code>*</code></label> 
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantCity"
                                            id="applicantCity"
                                            required>
                                            ${cityOptions(applicantCity, applicantRegion, applicantProvince)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantCity"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Barangay <code>*</code></label>    
                                        <select class="form-control validate select2"
                                            style="width: 100%"
                                            name="applicantBarangay"
                                            id="applicantBarangay"
                                            required>
                                            ${barangayOptions(applicantBarangay, applicantRegion, applicantProvince, applicantCity)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-applicantBarangay"></div>
                                    </div>
                                
                                    <div class="form-group col-3">
                                        <label>Unit No.</label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantUnit"
                                            id="applicantUnit"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][ ]"
                                            minlength="1"
                                            maxlength="10"
                                            autocomplete="off"
                                            value="${applicantUnit ?? ""}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantUnit"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Building/House No. <code>*</code></label> 
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantBuilding"
                                            id="applicantBuilding"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            autocomplete="off"
                                            required
                                            value="${applicantBuilding}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantBuilding"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Street Name <code>*</code></label> 
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantStreet"
                                            id="applicantStreet"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            autocomplete="off"
                                            required
                                            value="${applicantStreet}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantStreet"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Subdivision Name <code>*</code></label> 
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantSubdivision"
                                            id="applicantSubdivision"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            autocomplete="off"
                                            required
                                            value="${applicantSubdivision}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantSubdivision"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Country <code>*</code></label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantCountry"
                                            id="applicantCountry"
                                            data-allowcharacters="[a-z][A-Z][.][,][-][()]['][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            autocomplete="off"
                                            required
                                            value="${applicantCountry}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantCountry"></div>
                                    </div>
                                    
                                    <div class="form-group col-3">
                                        <label>Zip Code <code>*</code></label>
                                        <input type="text"
                                            class="form-control validate"
                                            name="applicantZipCode"
                                            id="applicantZipCode"
                                            data-allowcharacters="[0-9]"
                                            minlength="4"
                                            maxlength="4"
                                            autocomplete="off"
                                            required
                                            value="${applicantZipCode}">
                                        <div class="invalid-feedback d-block" id="invalid-applicantZipCode"></div>
                                    </div>
                                </div>
                            </div>
                            ${applicantID 
                                ? '<button class="btn btn-save px-5 p-2" id="btnUpdate" style="margin:auto; width:250px;"><i class="fas fa-save"></i> Save Changes</button>'
                                : '<button class="btn btn-save px-5 p-2" id="btnSave"   style="margin:auto; width:250px;"><i class="fas fa-upload"></i> Submit</button>'
                            }
                        </div>
                    </div>
                </div>
            </div>`;
        return html;
    }
    // ----- END APPLICANT INFORMATION TAB -----

    // ----- APPLIED JOBS TAB -----
    function appliedJobsTab(data = false) { 
        let html = ` <table class="table table-hover" id="tableAppliedJob">
                                <thead>
                                <tr>
                                    <th>MANAGE JOBS</th>
                                </tr>
                                </thead>
                                <tbody>`;

        data.map((applied, index) => {
            var statusText = '', statusBadge = '';
            // 0 = PENDING
        // 1 = FOR REVIEW
        // 2 = WAITLISTED
        // 3 = CANCELLED
        // 4 = PASSED
        // 5 = FAILED
        // 6 = RE-EVALUATE

                 if(applied.appJobStatus==0){ statusText='PENDING'; statusBadge='warning'}
            else if(applied.appJobStatus==1){ statusText='FOR REVIEW'; statusBadge='info'}
            else if(applied.appJobStatus==2){ statusText='WAITLISTED'; statusBadge='info'}
            else if(applied.appJobStatus==3){ statusText='CANCELLED'; statusBadge='primary'}
            else if(applied.appJobStatus==4){ statusText='PASSED'; statusBadge='success'}
            else if(applied.appJobStatus==5){ statusText='FAILED'; statusBadge='danger'}
            else if(applied.appJobStatus==6){ statusText='RE-EVALUATE'; statusBadge='info'}                

            html += `
                    <tr
                        onclick="window.open('${base_url}web/job/details/${applied.jobID}','_blank')"
                        class="btnView" 
                        id="${applied.jobID}">
                        <td>
                            <span class='jobTitle displayblock'>${applied.jobTitle}</span>
                            <span class='appliedBadge badge badge-outline-info'>${applied.jobType}</span>
                            <span class='appliedBadge badge badge-outline-info'>${formatAmount(applied.salaryRange, true)}</span>
                            <span class='appliedBadge badge badge-${statusBadge}'>${statusText}</span>
                            <span class='appliedBadge w-50 displayblock'><strong>Date applied:</strong> ${applied.dateApplied}</span>
                        </td>
                    </tr>`;
        });
        html += `</tbody>
            </table>`;
            
        return html;
    }
    // ----- END OF APPLIED JOBS TAB -----

    // ----- VACANT TAB -----
    function vacantTab(data = false) { 
        let html = ` <table class="table table-hover" id="tableJobPosting">
                        <thead>
                        <tr>
                            <th>${data.length} JOBS & VACANCIES</th>
                        </tr>
                        </thead>
                        <tbody>`;

        data.map((job, index) => {
            html += `
                    <tr
                        onclick="window.open('${base_url}web/job/details/${job.jobID}','_blank')"
                        class="btnView" 
                        id="${job.jobID}">
                        <td>
                            <span class='jobTitle displayblock'>${job.jobTitle}</span>
                            <span class='jobBadge badge badge-outline-info'>${job.jobType}</span>
                            <span class='jobBadge badge badge-outline-info'>${formatAmount(job.salaryRange, true)}</span>
                            <span class='displayblock'>${job.jobDescription}</span>
                        </td>
                    </tr>`;
        });
        html += `</tbody>
            </table>`;

        return html;
    }
    // ----- END OF VACANT TAB -----

    // ----- CONFIRM PASSWORD -----
    function comparePassword() {
        const password        = $("[name=applicantPassword]").val();
        const confirmPassword = $("[name=applicantConfirmPassword]").val();
        const validated = $("[name=applicantConfirmPassword]").hasClass("validated");
        if (password.length > 0) {
            if (password == confirmPassword) {
                $("#invalid-applicantConfirmPassword").text("");
                if (validated) {
                    $("[name=applicantConfirmPassword]").removeClass("is-invalid").addClass("is-valid");
                    return true;
                } else {
                    $("[name=applicantConfirmPassword]").removeClass("is-valid").removeClass("is-invalid");
                    return false;
                }
            } else {
                $("#applicantConfirmPassword").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-applicantConfirmPassword").text("The password does not match.");
                return false;
            }
        }
    }

    $(document).on("keyup", "[name=applicantPassword], [name=applicantConfirmPassword]", function() {
        comparePassword();
    })
    // ----- END CONFIRM PASSWORD -----

    // ----- TOGGLE PASSWORD -----
    $(document).on("click", ".btnTogglePassword", function() {  
        const show = $(this).children().first().hasClass("fas fa-eye");
        if (show) {
            $(this).children().first().removeClass("fas fa-eye").addClass("fas fa-eye-slash");
            $(this).closest(".inner-addon").find("[type=password]").first().attr("type", "text");
            $(this).closest(".input-group").find("[type=password]").first().attr("type", "text");
        } else {
            $(this).children().first().removeClass("fas fa-eye-slash").addClass("fas fa-eye");
            $(this).closest(".inner-addon").find("[type=text]").first().attr("type", "password");
            $(this).closest(".input-group").find("[type=text]").first().attr("type", "password");
        }
    })
    // ----- END TOGGLE PASSWORD -----

    // ----- GET DATA -----
    function getApplicantInformationData() {
        let applicantProfile       = $("[name=applicantProfile]").val();
        const applicantFirstname   = $("[name=applicantFirstname]").val()?.trim();
        const applicantMiddlename  = $("[name=applicantMiddlename]").val()?.trim();
        const applicantLastname    = $("[name=applicantLastname]").val()?.trim();
        let applicantBirthday      = $("[name=applicantBirthday]").val()?.trim();
        let applicantGender        = $("[name=applicantGender]:checked").val();
        const applicantCitizenship = $("[name=applicantCitizenship]").val();
        const applicantCivilStatus = $("[name=applicantCivilStatus]").val();
        const applicantRegion      = $("[name=applicantRegion]").val();
        const applicantProvince    = $("[name=applicantProvince]").val();
        const applicantCity        = $("[name=applicantCity]").val();
        const applicantBarangay    = $("[name=applicantBarangay]").val();
        const applicantUnit        = $("[name=applicantUnit]").val()?.trim();
        const applicantBuilding    = $("[name=applicantBuilding]").val()?.trim();
        const applicantStreet      = $("[name=applicantStreet]").val()?.trim();
        const applicantSubdivision = $("[name=applicantSubdivision]").val()?.trim();
        const applicantCountry     = $("[name=applicantCountry]").val()?.trim();
        const applicantZipCode     = $("[name=applicantZipCode]").val()?.trim();
        const applicantEmail       = $("[name=applicantEmail]").val()?.trim();
        const applicantMobile      = $("[name=applicantMobile]").val()?.trim();
        const applicantStatus      = $("[name=applicantStatus]").val();
        let applicantResume        = $("[name=applicantResume]").val();

        const applicantTIN             = $("[name=applicantTIN]").val();
        const applicantSSS             = $("[name=applicantSSS]").val();
        const applicantPhilHealth      = $("[name=applicantPhilHealth]").val();
        const applicantPagibig         = $("[name=applicantPagibig]").val();

        const applicantUsername = $("[name=applicantUsername]").val()?.trim();
        const applicantPassword = $("[name=applicantPassword]").val()?.trim();
        const applicantEncryptedPassword = encryptString(applicantPassword);

       
        applicantProfile   = applicantProfile ? $("[name=applicantProfile]")[0].files[0].name : $("[name=applicantProfile]").attr("default");
        applicantResume    = applicantResume ? $("[name=applicantResume]")[0].files[0].name : $("[name=applicantResume]").attr("resume");
        applicantBirthday  = moment(applicantBirthday).format("YYYY-MM-DD");
        applicantGender    = applicantGender == "Others" ? $("[name=applicantOtherGender]").val()?.trim() : applicantGender;

        const file          = applicantProfile   ? $("[name=applicantProfile]")[0].files[0]   : null;
        const resumeFile = applicantResume ? $("[name=applicantResume]")[0].files[0] : null;
        
        return {
            applicantProfile, applicantFirstname, applicantMiddlename, applicantLastname, applicantBirthday, applicantGender, applicantCitizenship, applicantCivilStatus, applicantRegion, applicantProvince, applicantCity, applicantBarangay, applicantUnit, applicantBuilding, applicantStreet, applicantSubdivision, applicantCountry, applicantZipCode, applicantEmail, applicantMobile, applicantStatus, file, applicantResume, resumeFile
            , applicantTIN, applicantSSS, applicantPhilHealth, applicantPagibig, applicantUsername, applicantPassword, applicantEncryptedPassword
        };
    }

    async function getApplicantData() {
        let formData = new FormData();
        const informationData = getApplicantInformationData();
        Object.keys(informationData).map(informationKey => {
            formData.append(informationKey, informationData[informationKey]);
        })
        return await formData;
    }

    // ----- SAVE DATA -----
	$(document).on("click", "#btnSave", function () {
        formButtonHTML(this, true);
		const validate = validateForm("page_content");
        const isValid = comparePassword();

		if (validate && isValid) {
            setTimeout(() => {
                getApplicantData()
                .then(data => {
                    formButtonHTML(this, false);
                    if (data) {
                        data.append("action", "insert");
                        saveApplicantData(data, "add", tableContent);
                    } else {
                        showNotification("danger", "There was an error getting applicant data");
                    }
                })
            }, 100);
		} else {
            formButtonHTML(this, false);
        }
	});
	// ----- END SAVE DATA -----

    // ----- UPDATE DATA -----
	$(document).on("click", "#btnUpdate", function () {
        formButtonHTML(this, true);
		const validate = validateForm("page_content");
        const isValid = comparePassword();

		if (validate && isValid) {
            setTimeout(() => {
                getApplicantData()
                .then(data => {
                    formButtonHTML(this, false);
                    if (data) {
                        data.append("action", "update");
                        data.append("applicantID",applicantID)
                        saveApplicantData(data, "edit", tableContent);
                    } else {
                        showNotification("danger", "There was an error getting applicant data");
                    }
                })
            }, 100);
		} else {
            formButtonHTML(this, false);
        }
	});
	// ----- END UPDATE DATA -----

/* ---------------------------------------------------------- */
    // ----- SAVE APPLICANT -----
    function getConfirmation(action = "insert") {
        const title = "Applicant";
        let swalText, swalImg, confirm, cancel, width, height;
    
        if(action=="add"){
            swalTitle = `Submit Form`;
            swalText  = `Are you sure that you want to submit your information?`;
            swalImg   = `${base_url}assets/modal/add.svg`;    
            confirm   = `Yes`;
            cancel    = `No`;
            width     = 200;
            height    = 200;
        }else if(action=="edit"){
            swalTitle = `Update Information`;
            swalText  = `Are you sure that you want to update your information?`;
            swalImg   = `${base_url}assets/modal/update.svg`;
            confirm   = `Yes`;
            cancel    = `No`;
            width     = 200;
            height    = 200;
        }else if(action=="logout"){
            swalTitle = `Are you leaving?`;
            swalText  = `Are you sure want to logout?`;
            swalImg   = `${base_url}assets/modal/question.png`;   
            confirm   = `Logout`;
            cancel   = `Cancel`;
            width     = 250;
            height    = 180;
        }
       
        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         width,
            imageHeight:        height,
            imageAlt:           "Custom image",
            showCancelButton:   true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   cancel,
            confirmButtonText:  confirm
        })
    }
    
    function saveApplicantData(data, method = "add", callback = false) {
        if (data) {
            const confirmation = getConfirmation(method);
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $("#loader").show();
                    if(method=="edit") $(".loader p").text('Updating...');
                    setTimeout(() => {
                        $.ajax({
                            method:      "POST",
                            url:         `${base_url}web/applicant/saveApplicantData`,
                            data,
                            processData: false,
                            contentType: false,
                            global:      false,
                            cache:       false,
                            async:       false,
                            dataType:    "json",
                            beforeSend: function() {
                                $("#loader").show();
                            },
                            success: function(data) {
                                let isSuccess   = data[0];

                                if (isSuccess=="true" && method=="add") {
                                    window.location.replace(`${base_url}web/applicant/registration_success`);
                                }else if(isSuccess=="true" && method=="edit"){
                                    $("#profile").click();
                                }else{
                                    $("#loader").hide();
                                    $("[name=applicantEmail]").addClass("is-invalid");
                                    $("#invalid-applicantEmail").text(data[1]);
                                    $("#applicantEmail").focus();
                                }
                            },
                            error: function() {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                                }, 500);
                            }
                        }).done(function() {
                            setTimeout(() => {
                                $("#loader").hide();
                            }, 500);
                        })
                    }, 500);
                }
            });
        }
    } 
    // ----- END SAVE APPLICANT -----

    // LOGOUT
    $(document).on("click", `#logout`, function() {
        getConfirmation("logout").then(res => {
                if (res.isConfirmed) {
                    $("#loader").show();
                    $(".loader p").text('Loading...');
                    setTimeout(() => {
                        $.ajax({
                            method:      "POST",
                            url:         `${base_url}web/login/logout`,
                            processData: false,
                            contentType: false,
                            global:      false,
                            cache:       false,
                            async:       false,
                            dataType:    "json",
                            beforeSend: function() {
                                $("#loader").show();
                            },
                            success: function(data) {
                                if (data=="success") {
                                    window.location.replace(`${base_url}web/login`);
                                }
                            },  
                            error: function() {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                                }, 500);
                            }
                        }).done(function() {
                            setTimeout(() => {
                                $("#loader").hide();
                            }, 500);
                        })
                    }, 500);
                }
            });
    });
    // END OF LOGOUT
})