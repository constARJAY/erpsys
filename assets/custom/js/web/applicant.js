$(document).ready(function() {

    // GLOBAL VARIABLES
    let applicantID = $("#table_content").data('applicantid') ? $("#table_content").data('applicantid') : 0;
    // END OF GLOBAL VARIABLES


	// ----- PAGE CONTENT -----
	function pageContent() {
		preventRefresh(false);

        $("#table_content").html(preloader);
        setTimeout(() => {
            const applicantData = getTableData(
                `web_applicant_list_tbl`,
                `*`,
                `applicantID = ${applicantID}`
            );

            $("#table_content").html(applicantDisplay(applicantData[0], applicantID));
            updateTableItems();
            initDashboardDataTables();
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

	pageContent();
	// ----- END PAGE CONTENT -----


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

    function initDashboardDataTables() {
        if ($.fn.DataTable.isDataTable('#tableDependentInformationTab')){
            $('#tableDependentInformationTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableEmploymentHistoryTab')){
            $('#tableEmploymentHistoryTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableEducationalAttainmentTab')){
            $('#tableEducationalAttainmentTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableOrganizationJoinedTab')){
            $('#tableOrganizationJoinedTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableExamTakenTab')){
            $('#tableExamTakenTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableSeminarTakenTab')){
            $('#tableSeminarTakenTab').DataTable().destroy();
        }
        
        if ($.fn.DataTable.isDataTable('#tableCharacterReferenceTab')){
            $('#tableCharacterReferenceTab').DataTable().destroy();
        }
        
        var table = $("#tableDependentInformationTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
            ],
        });
        
        var table = $("#tableEmploymentHistoryTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
                { targets: 4, width: 150 },
                { targets: 5, width: 350 },
                { targets: 6, width: 150 },
            ],
        });

        var table = $("#tableEducationalAttainmentTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
                { targets: 4, width: 250 },
            ],
        });

        var table = $("#tableOrganizationJoinedTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
            ],
        });

        var table = $("#tableExamTakenTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
            ],
        });

        var table = $("#tableSeminarTakenTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
            ],
        });

        var table = $("#tableCharacterReferenceTab").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
			serverSide:     false,
			scrollX:        true,
			sorting:        false,
			searching:      false,
			paging:         false,
			ordering:       false,
			info:           false,
			scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50  },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 250 },
                { targets: 4, width: 250 },
            ],
        });
    }

    function drawDatatables(table = "") {
        if (table) {
            const visited = $(`#${table}`).attr("visited");
            if (visited == "false") {
                $(`#${table}`).DataTable().columns.adjust().draw();
                $(`#${table}`).attr("visited", "true");
            } 
        }
    }

    $(document).on('click', 'a[data-toggle=tab]', function (e) {
        const href = $(this).attr("href");

        let table = "";
        if (href == "#dependent-information-tab") {
            table = "tableDependentInformationTab";
        } else if (href == "#employment-history-tab") {
            table = "tableEmploymentHistoryTab";
        } else if (href == "#educational-attainment-tab") {
            table = "tableEducationalAttainmentTab";
        } else if (href == "#organization-joined-tab") {
            table = "tableOrganizationJoinedTab";
        } else if (href == "#exam-taken-tab") {
            table = "tableExamTakenTab";
        } else if (href == "#seminars-taken-tab") {
            table = "tableSeminarTakenTab";
        } else if (href == "#character-reference-tab") {
            table = "tableCharacterReferenceTab";
        }
        drawDatatables(table);
    } );
    // ----- END DATATABLES -----


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
                
                $("#table_content").html(applicantDisplay(applicantData[0], applicantID));
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
                ${option == civilstatus?.trim() ? "selected" : ""}>
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
        }).join("");
        return html;
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
		if (!doEmpty && regionKey && regionKey != "undefined") {
			const provinceList = regionKey && Object.keys(address[regionKey]?.province_list);
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
		if (!doEmpty && regionKey && regionKey != "undefined" && provinceKey && provinceKey != "undefined") {
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
		if (!doEmpty && regionKey && regionKey != "undefined" && provinceKey && provinceKey != "undefined" && cityKey && cityKey != "undefined") {
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

    $(document).on("click", `#previewImage`, function() {
        $(`[name="applicantProfile"]`).trigger("click");
    })

    $(document).on("change", "[name=applicantProfile]", function() {
        const defaultImage = $(this).attr("default");
        previewImage(this, defaultImage);
    })
    // ----- END SELECT PROFILE IMAGE -----


    // ----- REMOVE RESUME -----
    $(document).on("click", `.btnRemoveResume`, function() {
        $(`#displayResume`).empty();
        $(`[name="applicantResume"]`).val("");
        $(`[name="applicantResume"]`).removeAttr("resume");
        $(`#displayResume`).css('display','none');
        $("#applicantResume").removeClass("is-valid").addClass("is-invalid");
        $("#invalid-applicantResume").text("This field is required.");
    })
    // ----- END REMOVE RESUME -----


    // ----- SELECT RESUME -----
    let fileApplicantResume = null;
    $(document).on("change", "[name=applicantResume]", function(e) {
        e.preventDefault();
        if (this.files && this.files[0]) {
            const filesize = this.files[0].size/1024/1024; // Size in MB
            const filetype = this.files[0].type;
            const filename = this.files[0].name;

            if (filesize > 10) {
                $(`#displayResume`).empty();
                $(`[name="applicantResume"]`).val("");
                $(`[name="applicantResume"]`).removeAttr("resume");
                $(`#displayResume`).css('display','none');
                $("#applicantResume").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-applicantResume").text("This field is required.");
                showNotification("danger", "File size must be less than or equal to 10mb");
            } else if (filetype.indexOf("msword") == -1 && filetype.indexOf("openxmlformats") == -1 && filetype.indexOf("ms-excel") == -1 && filetype.indexOf("ms-powerpoint") == -1 && filetype.indexOf("pdf") == -1) {
                $(`#displayResume`).empty();
                $(`[name="applicantResume"]`).val("");
                $(`[name="applicantResume"]`).removeAttr("resume");
                $(`#displayResume`).css('display','none');
                $("#applicantResume").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-applicantResume").text("This field is required.");
                showNotification("danger", "Invalid file type");
            } else {
                $("#applicantResume").removeClass("is-invalid").addClass("is-valid");
                $("#invalid-applicantResume").text("");
                $(`#displayResume`).css('display','block');
                $(`#displayResume`).html(displayApplicantResume(filename, false));
                $(this).attr("resume", filename);
                fileApplicantResume = this.files[0];
            }
        }
    })
    // ----- END SELECT RESUME -----


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


    // ----- APPLICANT BASIC INFORMATION ----- 
    function applicantBasicInformation(data = false) {

        let {
            applicantID            = "",
            applicantProfile       = "default.jpg",
            applicantFirstname     = "",
            applicantMiddlename    = "",
            applicantLastname      = "",
            applicantBirthday      = "",
            applicantGender        = "",
            applicantCitizenship   = "",
            applicantCivilStatus   = "",
            applicantEmail         = "",
            applicantMobile        = "",
            applicantResume        = "",
            applicantBirthPlace    = "",
            applicantTelephone     = "",
            applicantReligion      = "",
            applicantContactPerson = "",
            applicantContactNumber = "",
            applicantTIN           = "",
            applicantSSS           = "",
            applicantPhilHealth    = "",
            applicantPagibig       = "",
            applicantUsername      = "",
            applicantPassword      = "",
            applicantRegion        = "",
            applicantProvince      = "",
            applicantCity          = "",
            applicantBarangay      = "",
            applicantUnit          = "",
            applicantBuilding      = "",
            applicantStreet        = "",
            applicantSubdivision   = "",
            applicantCountry       = "",
            applicantZipCode       = "",
            applicantStatus        = "",
        } = data;

        let profile = applicantProfile != null ? applicantProfile : "default.jpg";

        let html = `
        <div class='row'>
            <div class="form-group col-md-3 col-sm-12">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <div class="img-fluid" style='border: 1px dashed #e6e6e6; padding: 20px; margin-bottom:0px; max-width:100%;' id="previewImageParent">
                        <span class="${profile != "default.jpg" ? "d-block" : "d-none"}" id="removeProfile">x</span>
                        <img class="rounded" 
                            id="previewImage"
                            style="width: 200px; height: 200px; cursor: pointer;"   
                            src="${base_url}assets/upload-files/profile-images/${profile}">
                    </div>
                    <div>
                        <input 
                            type="file"
                            class="form-control validate d-none"
                            name="applicantProfile"
                            id="applicantProfile"
                            default="${profile}"
                            accept=".png, .svg, .jpg, .jpeg, .gif">
                    </div>
                </div>
            </div>

            <div class="form-group col-md-9 col-sm-12">
                <div class="header pl-0">
                    <h3><strong class="text-secondary">BASIC INFORMATION</strong></h3>
                </div>

                <div class='row'>
                    <div class="form-group col-md-4 col-sm-12">
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

                    <div class="form-group col-md-4 col-sm-12">
                        <label>Middle Name</label>
                        <input type="text"
                            class="form-control validate"
                            name="applicantMiddlename"
                            id="applicantMiddlename"
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                            minlength="2"
                            maxlength="50"
                            autocomplete="off"
                            value="${applicantMiddlename || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantMiddlename"></div>
                    </div>
                    
                    <div class="form-group col-md-4 col-sm-12">
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
                    
                    <div class="form-group col-md-4 col-sm-12">
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

                    <div class="form-group col-md-8 col-sm-12">
                        <label>Gender <code>*</code></label>
                        <div class="d-flex align-items-center">
                            <div style="flex: 1">
                                <input type="radio" value="Female" name="applicantGender" ${applicantGender ? (applicantGender == "Female" || applicantGender == "null" ? "checked" : "") : "checked"}> <span>Female</span>
                            </div>
                            <div class="px-2" style="flex: 1">
                                <input type="radio" value="Male" name="applicantGender" ${applicantGender == "Male" && applicantGender != "null" ? "checked" : ""}> <span>Male</span>
                            </div>
                            <div class="d-flex" style="flex: 3">
                                <div class="d-flex align-items-center pr-2">
                                    <input type="radio" value="Others" name="applicantGender" ${applicantGender ? (applicantGender != "Male" && applicantGender != "Female" && applicantGender != "null" ? "checked" : "") : ""}> <span class="ml-2">Others</span>
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
                                        value="${applicantGender == "Male" || applicantGender == "Female" || applicantGender == null ? "" : applicantGender}">
                                    <div class="invalid-feedback" id="invalid-applicantOtherGender"></div>
                                </div>
                            </div>
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-applicantGender"></div>
                    </div>

                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div class="form-group col-md-3">
                        <label>Resume <code>*</code></label>
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
                    <div class="form-group col-md-3 col-sm-12">
                        <label>Birth Place <code>*</code></label>
                        <input type="text"
                            class="form-control validate"
                            name="applicantBirthPlace"
                            id="applicantBirthPlace"
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                            minlength="2"
                            maxlength="50"
                            autocomplete="off"
                            required
                            value="${applicantBirthPlace || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantBirthPlace"></div>
                    </div>
                    
                    <div class="form-group col-md-3 col-sm-12">
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
        
                    <div class="form-group col-md-3 col-sm-12">
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
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Telephone No. <code>*</code></label>
                        <input type="text"
                            class="form-control inputmask"
                            placeholder="000-000-000-000"
                            mask="999-999-999-999"
                            data-allowcharacters="[0-9]"
                            minlength="15"
                            maxlength="15"
                            name="applicantTelephone"
                            id="applicantTelephone"
                            autocomplete="off"
                            required
                            value="${applicantTelephone || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantTelephone"></div>
                    </div>
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Mobile No. <code>*</code></label>
                        <input type="text"
                            class="form-control inputmask"
                            placeholder="0900-000-0000"
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
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Email Address <code>*</code></label>
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
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Religion <code>*</code></label>
                        <input type="text"
                            class="form-control validate"
                            name="applicantReligion"
                            id="applicantReligion"
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                            minlength="2"
                            maxlength="50"
                            autocomplete="off"
                            required
                            value="${applicantReligion || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantReligion"></div>
                    </div>
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Contact Person</label>
                        <input type="text"
                            class="form-control validate"
                            name="applicantContactPerson"
                            id="applicantContactPerson"
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                            minlength="2"
                            maxlength="50"
                            autocomplete="off"
                            value="${applicantContactPerson || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantContactPerson"></div>
                    </div>
        
                    <div class="form-group col-md-4 col-sm-12">
                        <label>Contact No. </label>
                        <input type="text"
                            class="form-control inputmask"
                            placeholder="0900-000-0000"
                            mask="0\\999-999-9999"
                            data-allowcharacters="[0-9]"
                            minlength="13"
                            maxlength="13"
                            name="applicantContactNumber"
                            id="applicantContactNumber"
                            autocomplete="off"
                            value="${applicantContactNumber || ""}">
                        <div class="invalid-feedback d-block" id="invalid-applicantContactNumber"></div>
                    </div>
                </div>
            </div>

        </div>`;
        return html;
    }
    // ----- END APPLICANT BASIC INFORMATION ----- 


    // ----- APPLICANT ADDRESS INFORMATION TAB -----
    function applicantAddressInformationTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">ADDRESS INFORMATION</strong></h4>
                </div>
            </div>

            <div class="form-group col-md-3 col-sm-12">
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
            
            <div class="form-group col-md-3 col-sm-12">
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
            
            <div class="form-group col-md-3 col-sm-12">
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
            
            <div class="form-group col-md-3 col-sm-12">
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
        
            <div class="form-group col-md-4 col-sm-12">
                <label>Unit No.</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantUnit"
                    id="applicantUnit"
                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][ ]"
                    minlength="1"
                    maxlength="10"
                    autocomplete="off"
                    value="${applicantUnit || ""}">
                <div class="invalid-feedback d-block" id="invalid-applicantUnit"></div>
            </div>
            
            <div class="form-group col-md-4 col-sm-12">
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
                    value="${applicantBuilding || ""}">
                <div class="invalid-feedback d-block" id="invalid-applicantBuilding"></div>
            </div>
            
            <div class="form-group col-md-4 col-sm-12">
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
                    value="${applicantStreet || ""}">
                <div class="invalid-feedback d-block" id="invalid-applicantStreet"></div>
            </div>
            
            <div class="form-group col-md-4 col-sm-12">
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
                    value="${applicantSubdivision || ""}">
                <div class="invalid-feedback d-block" id="invalid-applicantSubdivision"></div>
            </div>
            
            <div class="form-group col-md-4 col-sm-12">
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
                    value="${applicantCountry || "Philippines"}">
                <div class="invalid-feedback d-block" id="invalid-applicantCountry"></div>
            </div>
            
            <div class="form-group col-md-4 col-sm-12">
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
                    value="${applicantZipCode || ""}">
                <div class="invalid-feedback d-block" id="invalid-applicantZipCode"></div>
            </div>
        </div>`;
        return html;
    }
    // ----- END APPLICANT ADDRESS INFORMATION TAB -----


    // ----- APPLICANT FAMILY BACKGROUND TAB -----
    function applicantFamilyBackgroundTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">FAMILY BACKGROUND</strong></h4>
                </div>
            </div>

            <div class="form-group col-md-9 col-sm-9">
                <label>Father's Name</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantFathersName"
                    id="applicantFathersName"
                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                    minlength="2"
                    maxlength="50"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantFathersName"></div>
            </div>
            <div class="form-group col-md-3 col-sm-3">
                <label>Age</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantFathersAge"
                    id="applicantFathersAge"
                    data-allowcharacters="[0-9]"
                    minlength="1"
                    maxlength="3"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantFathersAge"></div>
            </div>

            <div class="form-group col-md-9 col-sm-9">
                <label>Mother's Name</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantMothersName"
                    id="applicantMothersName"
                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                    minlength="2"
                    maxlength="50"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantMothersName"></div>
            </div>
            <div class="form-group col-md-3 col-sm-3">
                <label>Age</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantMothersAge"
                    id="applicantMothersAge"
                    data-allowcharacters="[0-9]"
                    minlength="1"
                    maxlength="3"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantMothersAge"></div>
            </div>

            <div class="form-group col-md-9 col-sm-9">
                <label>Spouse Name</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantSpouseName"
                    id="applicantSpouseName"
                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                    minlength="2"
                    maxlength="50"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantSpouseName"></div>
            </div>
            <div class="form-group col-md-3 col-sm-3">
                <label>Age</label>
                <input type="text"
                    class="form-control validate"
                    name="applicantSpouseAge"
                    id="applicantSpouseAge"
                    data-allowcharacters="[0-9]"
                    minlength="1"
                    maxlength="3"
                    autocomplete="off"
                    value="">
                <div class="invalid-feedback d-block" id="invalid-applicantSpouseAge"></div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT FAMILY BACKGROUND TAB -----


    // ----- APPLICANT DEPENDENT INFORMATION TAB -----
    function applicantDependentInformationTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">DEPENDENT'S INFORMATION</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableDependentInformationTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableDependentInformationTab">
                                    </div>
                                </th>
                                <th>Name</th>
                                <th>Relationship</th>
                                <th>Birthday</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableDependentInformationTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableDependentInformationTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableDependentInformationTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT DEPENDENT INFORMATION TAB -----


    // ----- APPLICANT PH ID INFORMATION TAB -----
    function applicantPhIdInformationTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">Ph ID INFORMATION</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="row">
                    <div class="col-md-6 col-sm-12 form-group">
                        <label>Professional Regulation Commission ID (PRC ID)</label>
                        <input type="text"
                            class="form-control validate"
                            mask="999-999-9"
                            data-allowcharacters="[0-9]"
                            minlength="9"
                            maxlength="9"
                            name="applicantPRC"
                            id="applicantPRC"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                    <div class="col-md-6 col-sm-12 form-group">
                        <label>Expiration Date</label>
                        <input type="text"
                            class="form-control validate"
                            data-allowcharacters="[0-9]"
                            minlength="9"
                            maxlength="9"
                            name="applicantPRCExpiration"
                            id="applicantPRCExpiration"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                    <div class="col-sm-12 form-group">
                        <label>Social Security System ID (SSS ID)</label>
                        <input type="text"
                            class="form-control validate"
                            mask="99-9999999-9"
                            data-allowcharacters="[0-9]"
                            minlength="12"
                            maxlength="12"
                            name="applicantSSS"
                            id="applicantSSS"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                    <div class="col-sm-12 form-group">
                        <label>Tax Identification No. (TIN)</label>
                        <input type="text"
                            class="form-control validate"
                            mask="999-999-999"
                            data-allowcharacters="[0-9]"
                            minlength="12"
                            maxlength="12"
                            name="applicantSSS"
                            id="applicantSSS"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                    <div class="col-sm-12 form-group">
                        <label>Philippine Identification Card</label>
                        <input type="text"
                            class="form-control validate"
                            mask="999-999-999"
                            data-allowcharacters="[0-9]"
                            minlength="12"
                            maxlength="12"
                            name="applicantPHIL"
                            id="applicantPHIL"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                    <div class="col-sm-12 form-group">
                        <label>NHMF</label>
                        <input type="text"
                            class="form-control validate"
                            mask="999-999-999"
                            data-allowcharacters="[0-9]"
                            minlength="12"
                            maxlength="12"
                            name="applicantNHNF"
                            id="applicantNHNF"
                            autocomplete="off">
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT PH ID INFORMATION TAB -----


    // ----- APPLICANT EMPLOYMENT HISTORY TAB -----
    function applicantEmploymentHistoryTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">EMPLOYMENT HISTORY</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableEmploymentHistoryTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableEmploymentHistoryTab">
                                    </div>
                                </th>
                                <th>To-From</th>
                                <th>Name of Employer</th>
                                <th>Address</th>
                                <th>Position</th>
                                <th>Reason of Leaving</th>
                                <th>Last Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableEmploymentHistoryTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableEmploymentHistoryTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableEmploymentHistoryTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT EMPLOYMENT HISTORY TAB -----


    // ----- APPLICANT ACCOUNT INFORMATION TAB -----
    function applicantAccountInformationTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">ACCOUNT INFORMATION</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
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
                
                <div class="form-group">
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
                                <a href="javascript: void(0)" class="btnTogglePassword" show="false" tabindex="-1"><i class="text-primary fas fa-eye"></i></a>
                            </span>
                        </div>
                    </div>
                    <div class="invalid-feedback d-block" id="invalid-applicantPassword"></div>
                </div>

                <div class="form-group">
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
                                <a href="javascript: void(0)" class="btnTogglePassword" show="false" tabindex="-1"><i class="text-primary fas fa-eye"></i></a>
                            </span>
                        </div>
                    </div>
                    <div class="invalid-feedback d-block" id="invalid-applicantConfirmPassword"></div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT ACCOUNT INFORMATION TAB -----


    // ----- APPLICANT EDUCATIONAL ATTAINMENT TAB -----
    function applicantEducationalAttainmentTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">EDUCATIONAL ATTAINMENT</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableEducationalAttainmentTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableEducationalAttainmentTab">
                                    </div>
                                </th>
                                <th>School Year <code>*</code></th>
                                <th>Name of School <code>*</code></th>
                                <th>Course <code>*</code></th>
                                <th>Extracurricular Activities <code>*</code></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableEducationalAttainmentTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableEducationalAttainmentTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableEducationalAttainmentTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT EDUCATIONAL ATTAINMENT TAB -----


    // ----- APPLICANT ORGANIZATIONS JOINED TAB -----
    function applicantOrganizationJoinedTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">ORGANIZATIONS JOINED</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableOrganizationJoinedTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableOrganizationJoinedTab">
                                    </div>
                                </th>
                                <th>To-From</th>
                                <th>Name of Organization</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableOrganizationJoinedTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableOrganizationJoinedTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableOrganizationJoinedTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT ORGANIZATIONS JOINED TAB -----


    // ----- APPLICANT EXAM TAKEN TAB -----
    function applicantExamTakenTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">EXAM TAKEN</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableExamTakenTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableExamTakenTab">
                                    </div>
                                </th>
                                <th>Date</th>
                                <th>Exam Taken</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableExamTakenTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableExamTakenTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableExamTakenTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT EXAM TAKEN TAB -----


    // ----- APPLICANT SEMINARS TAKEN TAB -----
    function applicantSeminarsTakenTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">SEMINARS TAKEN</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableSeminarTakenTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableSeminarTakenTab">
                                    </div>
                                </th>
                                <th>Date</th>
                                <th>Seminar</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableSeminarTakenTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableSeminarTakenTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableSeminarTakenTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT SEMINARS TAKEN TAB -----


    // ----- APPLICANT CHARACTER REFERENCE TAB -----
    function applicantCharacterReferenceTab(data = false) {

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

        let html = `
        <div class='row'>

            <div class="col-12">
                <div class="header pl-0 pt-0">
                    <h4><strong class="text-secondary">CHARACTER REFERENCE</strong></h4>
                </div>
            </div>

            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped" id="tableCharacterReferenceTab" visited="false">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxall" table="tableCharacterReferenceTab">
                                    </div>
                                </th>
                                <th>Name <code>*</code></th>
                                <th>Position <code>*</code></th>
                                <th>Company <code>*</code></th>
                                <th>Contact Number <code>*</code></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${getTableRow("tableCharacterReferenceTab")}
                        </tbody>
                    </table>

                    <div class="d-flex flex-column justify-content-start text-left my-2">
                        <div>
                            <button type="button" 
                                class="btn btn-primary btnAddRow"
                                table="tableCharacterReferenceTab">
                                <i class="fas fa-plus-circle"></i> Add Row
                            </button>
                            <button type="button" 
                                class="btn btn-danger btnDeleteRow"
                                table="tableCharacterReferenceTab"
                                disabled>
                                <i class="fas fa-minus-circle"></i> Delete Row/s
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>`;
        return html;
    }
    // ----- END APPLICANT CHARACTER REFERENCE TAB -----


    // ----- APPLICANT TAB CONTENT -----
    function applicantTabContent(data = false) {
        let html = `
        <div class="border">
            <ul class="nav nav-tabs nav-tabs-bottom nav-justified border" id="addtabs">
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center active" href="#address-information-tab" data-toggle="tab" style="border-bottom: none;">Address Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#family-background-tab" data-toggle="tab" style="border-bottom: none;">Family Background</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#dependent-information-tab" data-toggle="tab" style="border-bottom: none;">Dependent's Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#ph-id-information-tab" data-toggle="tab" style="border-bottom: none;">Ph ID Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#employment-history-tab" data-toggle="tab" style="border-bottom: none;">Employment History</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#account-information-tab" data-toggle="tab" style="border-bottom: none;">Account Information</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#educational-attainment-tab" data-toggle="tab" style="border-bottom: none;">Educational Attainment</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#organization-joined-tab" data-toggle="tab" style="border-bottom: none;">Organizations Joined</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#exam-taken-tab" data-toggle="tab" style="border-bottom: none;">Exam Taken</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#seminars-taken-tab" data-toggle="tab" style="border-bottom: none;">Seminars Taken</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link modal-tab border h-100 d-flex justify-content-center align-items-center" href="#character-reference-tab" data-toggle="tab" style="border-bottom: none;">Character Reference</a>
                </li>
            </ul>
            <div class="tab-content pt-4 border p-3" style="min-height: 41vh;">
                <div class="tab-pane show active" id="address-information-tab">
                    ${applicantAddressInformationTab(data)}
                </div>
                <div class="tab-pane" id="family-background-tab">
                    ${applicantFamilyBackgroundTab(data)}
                </div>
                <div class="tab-pane" id="dependent-information-tab">
                    ${applicantDependentInformationTab(data)}
                </div>
                <div class="tab-pane" id="ph-id-information-tab">
                    ${applicantPhIdInformationTab(data)}
                </div>
                <div class="tab-pane" id="employment-history-tab">
                    ${applicantEmploymentHistoryTab(data)}
                </div>
                <div class="tab-pane" id="account-information-tab">
                    ${applicantAccountInformationTab(data)}
                </div>
                <div class="tab-pane" id="educational-attainment-tab">
                    ${applicantEducationalAttainmentTab(data)}
                </div>
                <div class="tab-pane" id="organization-joined-tab">
                    ${applicantOrganizationJoinedTab(data)}
                </div>
                <div class="tab-pane" id="exam-taken-tab">
                    ${applicantExamTakenTab(data)}
                </div>
                <div class="tab-pane" id="seminars-taken-tab">
                    ${applicantSeminarsTakenTab(data)}
                </div>
                <div class="tab-pane" id="character-reference-tab">
                    ${applicantCharacterReferenceTab(data)}
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END APPLICANT TAB CONTENT -----


    // ----- APPLICANT DISPLAY -----
    function applicantDisplay(data = false, isHasApplicant = 0) {   
        
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

        let html = "";
        if (isHasApplicant) 
        {
            let button = applicantID ? `
            <button class="btn btn-save px-5 p-2" 
                id="btnUpdate" 
                style="margin:auto; width:250px;">
                <i class="fas fa-save"></i> Save Changes
            </button>` : `
            <button class="btn btn-save px-5 p-2" 
                id="btnSave"   
                style="margin:auto; width:250px;">
                <i class="fas fa-upload"></i> Submit
            </button>`;

            html = `
            <div class="forms-group">
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="body p-0">

                            <div id="applicantBasicInformation">${applicantBasicInformation(data)}</div>

                            <div id="applicantTabContent" class="mt-3">${applicantTabContent(data)}</div>

                            <div class="mt-4 text-right">${button}</div>
                        </div>
                    </div>
                </div>
            </div>`;
        } 
        else 
        {
            html = `
            <div class="row my-5">
                <div class="offset-md-3 col-md-6 col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="d-flex justify-content-center align-items-center flex-column mb-4">
                                <div class="img-fluid" style='border: 1px dashed #e6e6e6; padding: 20px; margin-bottom:0px; max-width:100%;' id="previewImageParent">
                                    <span class="${profile != "default.jpg" ? "d-block" : "d-none"}" id="removeProfile">x</span>
                                    <img class="rounded" 
                                        style="width: 200px; height: 200px; cursor: pointer;" 
                                        id="previewImage"   
                                        src="${base_url}assets/upload-files/profile-images/${profile}">
                                </div>
                                <div>
                                    <input 
                                        type="file"
                                        class="form-control d-none"
                                        name="applicantProfile"
                                        id="applicantProfile"
                                        default="${profile}"
                                        accept=".png, .svg, .jpg, .jpeg, .gif">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-user login-icon"></i>
                                <input type="text" 
                                    tabindex="1" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="150"
                                    id="applicantFirstname" 
                                    name="applicantFirstname"
                                    autocomplete="off" 
                                    placeholder="First Name *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantFirstname"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-user login-icon"></i>
                                <input type="text" 
                                    tabindex="1" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="150"
                                    id="applicantLastname" 
                                    name="applicantLastname"
                                    autocomplete="off" 
                                    placeholder="Last Name *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantLastname"></div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-user-tie login-icon"></i>
                                <input type="text" 
                                    tabindex="1" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    id="applicantUsername" 
                                    name="applicantUsername"
                                    autocomplete="off" 
                                    placeholder="Username *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantUsername"></div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-envelope login-icon"></i>
                                <input type="text" 
                                    tabindex="1" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_]"
                                    minlength="2"
                                    maxlength="100"
                                    id="applicantEmail"
                                    name="applicantEmail"
                                    autocomplete="off" 
                                    placeholder="Email *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantEmail"></div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-key login-icon"></i>
                                <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="fas fa-eye view-icon"></i></a>
                                <input type="password" 
                                    tabindex="2" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    id="applicantPassword"
                                    name="applicantPassword"
                                    placeholder="Password *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantPassword"></div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group inner-addon left-addon">
                                <i class="fas fa-key login-icon"></i>
                                <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="fas fa-eye view-icon"></i></a>
                                <input type="password" 
                                    tabindex="2" 
                                    class="form-control login-input validate" 
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    id="applicantConfirmPassword"
                                    name="applicantConfirmPassword"
                                    placeholder="Confirm Password *" 
                                    required>
                                <div class="invalid-feedback text-left d-block" id="invalid-applicantConfirmPassword"></div>
                            </div>
                        </div>
                        <div class="col-sm-12 mt-3 text-center">
                            <button class="btn btn-save px-5 p-2" 
                                id="btnSave"   
                                style="margin:auto; width:250px;"><i class="fas fa-upload"></i> Submit</button>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        return html;
    }
    // ----- END APPLICANT DISPLAY -----


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


    // ----- UPDATE DELETE BUTTON -----
    function updateDeleteButton(table = "") {
        if (table) {
            let flag = 0;
            $(`#${table} .checkboxrow`).each(function() {
                this.checked && flag++;
            })
            $(`.btnDeleteRow[table="${table}"]`).attr("disabled", flag == 0);
        }
    }
    // ----- END UPDATE DELETE BUTTON -----


    // ----- GET TABLE ROW -----
    function getTableRow(table = "", data = false) {
        let html = "";
        if (table) {
            switch(table) {
                case "tableDependentInformationTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="applicantDependentName"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="applicantDependentRelationship"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="applicantDependentBirthday"
                                    id="applicantDependentBirthday"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableEmploymentHistoryTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="employmentHistoryFromTo"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="employmentHistoryEmployerName"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="employmentHistoryAddress"
                                    data-allowcharacters="[a-z][A-Z][0-9][#][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="75"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="employmentHistoryPosition"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <textarea class="form-control validate"
                                    name="employmentHistoryReason"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;][:][']["][-][(][)][&][ ]"
                                    minlength="2"
                                    maxlength="250"
                                    rows="3"
                                    style="resize: none"
                                    autocomplete="off"></textarea>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="employmentHistorySalary"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableEducationalAttainmentTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="educationalAttainmentSchoolYear"
                                    data-allowcharacters="[0-9]"
                                    minlength="4"
                                    maxlength="4"
                                    autocomplete="off"
                                    value=""
                                    required>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="educationalAttainmentSchoolName"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value=""
                                    required>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="educationalAttainmentCourse"
                                    data-allowcharacters="[a-z][A-Z][0-9][-]['][,][ ][()]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value=""
                                    required>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="educationalAttainmentActivities"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][_][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableOrganizationJoinedTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="organizationJoinedFromTo"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="organizationJoinedName"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="organizationJoinedPosition"
                                    data-allowcharacters="[a-z][A-Z][0-9][_][-]['][,][()][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableExamTakenTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="examTakenDate"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="examTakenName"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="examTakenResult"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="0"
                                    maxlength="250"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableSeminarTakenTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="seminarTakenDate"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="seminarTakenName"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="seminarTakenResult"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                case "tableCharacterReferenceTab":
                    html = `
                    <tr>
                        <td class="text-center">
                            <div class="action">
                                <input type="checkbox" class="checkboxrow">
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="characterReferenceName"
                                    data-allowcharacters="[a-z][A-Z][.][,][-]['][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="characterReferencePosition"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control validate"
                                    name="characterReferenceCompany"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][;]['][''][-][(][)][ ]"
                                    minlength="2"
                                    maxlength="50"
                                    autocomplete="off"
                                    value="">
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                        <td>
                            <div class="form-group mb-0">
                                <input type="text"
                                    class="form-control inputmask"
                                    placeholder="0900-000-0000"
                                    mask="0\\999-999-9999"
                                    data-allowcharacters="[0-9]"
                                    minlength="13"
                                    maxlength="13"
                                    name="characterReferenceContactNo"
                                    autocomplete="off"
                                    required>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </td>
                    </tr>`;
                    break;
                default:
                    break;
            }
        }
        return html;
    }
    // ----- END GET TABLE ROW -----


    // ----- DISPLAY NO DATA -----
    function displayNoData(table = "") {
        if (table) {
            let count = $(`#${table} .checkboxrow`).length || 0;
            if (count == 0) {
                $(`.checkboxall[table="${table}"]`).prop("checked", false);
                let thCount = $(`#${table} thead th`).length || 0;
                let html = `
                <tr class="no-data" style="background: transparent;">
                    <td colspan="${thCount}">
                        <div class="row"">
                            <div class="col-12 text-center">
                                <img src="${base_url}assets/modal/no-data.gif" width="200" height="200">
                                <p style="
                                    font-size: 1.1rem;
                                    margin-top: 10px;
                                    color: black;">
                                No available data.
                                </p>
                            </div>
                        </div>
                    </td>
                </tr>`;
                $(`#${table} tbody`).append(html);
            }
        }

    }
    // ----- END DISPLAY NO DATA -----


    // ----- DELETE TABLE ROW -----
	function deleteTableRow(table = "") {
        if (table) {
            Swal.fire({
                title:              "DELETE ROWS",
                text:               "Are you sure to delete these rows?",
                imageUrl:           `${base_url}assets/modal/delete.svg`,
                imageWidth:         200,
                imageHeight:        200,
                imageAlt:           "Custom image",
                showCancelButton:   true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor:  "#1a1a1a",
                cancelButtonText:   "No",
                confirmButtonText:  "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    $(`#${table} .checkboxrow:checked`).each(function(i, obj) {
                        var tableRow = $(this).closest('tr');
                        tableRow.fadeOut(500, function (){
                            $(this).closest("tr").remove();
                            updateDeleteButton(table);
                            displayNoData(table);
                        });
                    })
                }
            });

            // if ($(`#${table} .checkboxrow:checked`).length != $(`.checkboxrow`).length) {
                
            // } else {
            //     showNotification("danger", "You must have atleast one or more items.");
            // }
        }
	}
	// ----- END DELETE TABLE ROW -----


    // ----- UPDATE TABLE ITEMS -----
    function updateTableItems(table = "") {
        if (table) {
            $(`#${table} tbody tr`).each(function(i) {
                // if (table == "tableDependentInformationTab") {}

                $(`input, textarea, select`, this).each(function(j) {
                    const name = $(this).attr("name") || "";
                    $(this).attr("id", `${name}${i}`);
                    $parent = $(this).parent();
                    $parent.find(".invalid-feedback").attr("id", `invalid-${name}${i}`);
                })
            })
        } else {
            const tableArr = [
                "tableDependentInformationTab", 
                "tableEmploymentHistoryTab", 
                "tableEducationalAttainmentTab", 
                "tableOrganizationJoinedTab",
                "tableExamTakenTab",
                "tableSeminarTakenTab",
                "tableCharacterReferenceTab"
            ];
            tableArr.map(tbl => updateTableItems(tbl));
        }
    }
    // ----- END UPDATE TABLE ITEMS -----


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


    // ----- CHECKBOX EVENT -----
    $(document).on("click", "[type=checkbox]", function() {
		const table = $(this).closest("table").attr("id");
        updateDeleteButton(table);
	})

    $(document).on("change", ".checkboxall", function() {
        const table = $(this).attr("table");
        if (table) {
            const isChecked = $(this).prop("checked");
            $(`#${table} .checkboxrow`).each(function(i, obj) {
                $(this).prop("checked", isChecked);
            });
            updateDeleteButton(table);
        }
	})
    // ----- END CHECKBOX EVENT -----


    // ----- ADD ROW -----
    $(document).on("click", ".btnAddRow", function() {
        const table = $(this).attr("table");
        let row = getTableRow(table);
        if (row) {
            $(`#${table} tr.no-data`).remove();
            $(`#${table} tbody`).append(row);
            updateTableItems(table);
        }
        // initDashboardDataTables();
    })
    // ----- END ADD ROW -----


    // ----- DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
        const table = $(this).attr("table");
		deleteTableRow(table);
        updateTableItems(table);
	})
    // ----- END DELETE ROW -----


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

        const file       = applicantProfile   ? $("[name=applicantProfile]")[0].files[0]   : null;
        const resumeFile = applicantResume ? $("[name=applicantResume]")[0].files[0] : fileApplicantResume;
        
        if (applicantID) {
            return {
                applicantProfile, applicantFirstname, applicantMiddlename, applicantLastname, applicantBirthday, applicantGender, applicantCitizenship, applicantCivilStatus, applicantRegion, applicantProvince, applicantCity, applicantBarangay, applicantUnit, applicantBuilding, applicantStreet, applicantSubdivision, applicantCountry, applicantZipCode, applicantEmail, applicantMobile, applicantStatus, file, applicantResume, resumeFile
                , applicantTIN, applicantSSS, applicantPhilHealth, applicantPagibig, applicantUsername, applicantPassword, applicantEncryptedPassword
            };
        } else {
            return {
                applicantProfile, applicantFirstname, applicantLastname, applicantEmail, applicantStatus, file, applicantUsername, applicantPassword, applicantEncryptedPassword
            };
        }
        
    }

    async function getApplicantData() {
        let formData = new FormData();
        const informationData = getApplicantInformationData();
        Object.keys(informationData).map(informationKey => {
            formData.append(informationKey, informationData[informationKey]);
        })
        return await formData;
    }
    // ----- END GET DATA -----


    // ----- VALIDATE RESUME -----
    function validateResume() {
        const resume = $(`[name="applicantResume"]`).attr("resume");
        if (!resume || resume == "null") {
            $("#applicantResume").removeClass("is-valid").addClass("is-invalid");
            $("#invalid-applicantResume").text("This field is required.");
            $("#page_content").find(".is-invalid").first().focus();
            return false;
        }
        return true;
	}
    // ----- END VALIDATE RESUME -----


    // ----- SAVE DATA -----
	$(document).on("click", "#btnSave", function () {
        formButtonHTML(this, true);
		const validate  = validateForm("page_content");
        const isValid   = comparePassword();
        // const hasResume = validateResume();

		if (validate && isValid) {
            setTimeout(() => {
                getApplicantData()
                .then(data => {
                    formButtonHTML(this, false);
                    if (data) {
                        data.append("action", "insert");
                        saveApplicantData(data, "add", pageContent);
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
		const validate  = validateForm("page_content");
        const isValid   = comparePassword();
        const hasResume = validateResume();

		if (validate && isValid && hasResume) {
            setTimeout(() => {
                getApplicantData()
                .then(data => {
                    formButtonHTML(this, false);
                    if (data) {
                        data.append("action", "update");
                        data.append("applicantID",applicantID)
                        saveApplicantData(data, "edit", pageContent);
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
            swalTitle = `SUBMIT FORM`;
            swalText  = `Are you sure that you want to submit your information?`;
            swalImg   = `${base_url}assets/modal/add.svg`;    
            confirm   = `Yes`;
            cancel    = `No`;
            width     = 200;
            height    = 200;
        }else if(action=="edit"){
            swalTitle = `UPDATE INFORMATION`;
            swalText  = `Are you sure that you want to update your information?`;
            swalImg   = `${base_url}assets/modal/update.svg`;
            confirm   = `Yes`;
            cancel    = `No`;
            width     = 200;
            height    = 200;
        }else if(action=="logout"){
            swalTitle = `LOG OUT`;
            swalText  = `Are you sure want to log out?`;
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