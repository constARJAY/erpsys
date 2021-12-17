$(document).ready(function() {
    // GLOBAL VARIABLES
        let applicantID = $("#table_content").data('applicantid') ? $("#table_content").data('applicantid') : 0;
        let jobID       = $("#table_content").data('jobid') ? $("#table_content").data('jobid') : 0;
        let pending     = $("#table_content").data('pending') ? $("#table_content").data('pending') : 0;
        // let jobID = 1;
    // END OF GLOBAL VARIABLES

	// ----- TABLE CONTENT -----
	function tableContent() {
		preventRefresh(false);

        $("#table_content").html(preloader);
        setTimeout(() => {
            // const jobData = getTableData(
            //     `hris_job_posting_tbl`,
            //     `*`,
            //     `jobID = ${jobID}`
            // );
            const jobData = getTableData( `
                hris_job_posting_tbl as jpt
                LEFT JOIN  pms_personnel_requisition_tbl AS ppr USING(requisitionID)
                LEFT JOIN  hris_designation_tbl AS dsg ON dsg.designationID  = ppr.designationID 
                LEFT JOIN  hris_department_tbl AS dept ON dept.departmentID  = ppr.departmentID`, 
                `jobID,
                CONCAT('JPG-',SUBSTR(jpt.createdAt,3,2),"-",LPAD(jpt.jobID,5,0)) as jobCode,
                requisitionCode,
                designationName as jobTitle,
                jobDescription,
                personnelStatement,
          
                CASE
                WHEN personnelOption = '1' THEN 'Permanent'
                WHEN personnelOption = '2' THEN 'Non-Permanent'
                WHEN personnelOption = '3' THEN 'Other Justifications'
                END as jobType,
          
                departmentName,
                personnelQualification,
                jobBenefits,
                jobSlot,
                salaryPackage as salaryRange,
                jobStatus,
                jpt.createdAt,
                ppr.designationID as designationID`,
                `jobID=${jobID}`
                );
            $("#table_content").html(jobInformation(jobData[0]));
            // initAll();
        }, 500);
	}   

	tableContent();
	// ----- END TABLE CONTENT -----
    
    jQuery.nl2br = function(value){
        return value.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
    };

    // ----- APPLICANT INFORMATION TAB -----
    function jobInformation(data = false) {   
        
        let {
            jobID                   = "",
            jobCode                 = "",
            designationID           = "",
            jobCompany              = "",
            jobTitle                = "",
            jobDescription          = "",
            jobResponsibilities     = "",
            jobType                 = "",
            jobCategory             = "",
            techSkillsQualification = "",
            jobBenefits             = "",
            jobLanguage             = "",
            jobSlot                 = "",
            salaryRangeSelect       = "",
            salaryRange             = "",
            jobStatus               = "",
        } = data;
        
        let language = jobLanguage.split("|");
        let langHtml = "";

        language.map(info => {
            langHtml += "<span class='m-r-5 badge badge-outline-primary'>"+info+"</span>";
        });

        // console.log(langHtml);

        let html = `
        <div class="form-group">
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="body p-0">
                        <div class='row'>
                            <div class="col-12">
                                <span class='displayblock' style="font-size:24px;">${jobTitle}</span>
                                <span class='badge badge-outline-info' style="margin-bottom:10px;">${jobCompany}</span>
                                <span class='badge badge-outline-info' style="margin-bottom:10px;">${formatAmount(salaryRange,true)}</span>
                                <span class='badge badge-outline-info' style="margin-bottom:10px;">${jobType}</span>
                                    <div class="sub-header" style="">
                                        <span class='p-r-20'  style="font-size:13px; color:#888888;"><i class="fas fa-globe"></i> www.theblackcoders.com</span>
                                        <span class='p-r-20'  style="font-size:13px; color:#888888;"><i class="fas fa-phone"></i> 09279475792</span>
                                        <span class='p-r-20'  style="font-size:13px; color:#888888;"><i class="fas fa-envelope"></i> hr@theblackcoders.com</span>
                                        ${pending=="0" ? `<button class="btn btn-save pull-right" style="width:160px; line-height:1;" designationid="${designationID||""}" id="btnApply"><i class="fas fa-send"></i> Apply for job</button>` : ''}
                                    </div>
                                <hr>
                            </div>
                            <div class="form-group col-12">
                                <span class='displayblock' style="font-size:20px;">Job Descriptions</span>
                                <span class='displayblock' style="font-size:13px; color:#888888;">
                                    ${$.nl2br(jobDescription)}
                                </span>
                            </div>

                            <div class="form-group col-12">
                                <span class='displayblock' style="font-size:20px;">Job Responsibilities</span>
                                <span class='displayblock' style="font-size:13px; color:#888888;">
                                    ${$.nl2br(jobResponsibilities)}
                                </span>
                            </div>

                            <div class="form-group col-12">
                                <span class='displayblock' style="font-size:20px;">Technical Skills & Qualifications</span>
                                <span class='displayblock' style="font-size:13px; color:#888888;">
                                    ${$.nl2br(techSkillsQualification)}
                                </span>
                            </div>

                            <div class="form-group col-12">
                                <span class='displayblock' style="font-size:20px;">Benefits</span>
                                <span class='displayblock' style="font-size:13px; color:#888888;">
                                    ${$.nl2br(jobBenefits)}
                                </span>
                            </div>

                            <div class="form-group col-12">
                                <span class='displayblock' style="font-size:20px;">Language</span>
                                <span class='displayblock' style="font-size:13px; color:#888888;">
                                    ${langHtml}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        return html;
    }
    // ----- END APPLICANT INFORMATION TAB -----

/* ---------------------------------------------------------- */
    // ----- SAVE APPLICANT -----
    function getConfirmation(action="") {
        let swalText, swalImg, confirm, cancel, width, height, isCancel;
        
        if(action=="apply"){
            swalTitle = `Job Application`;
            swalText  = `Are you sure that you want to apply for this job?`;
            swalImg   = `${base_url}assets/modal/appy_job.png`;    
            confirm   = `Yes`;
            cancel    = `No`;
            width     = 250;
            height    = 180;
            isCancel  = true;
        }else{
            swalTitle = `Application successfully submitted`;
            swalText  = `HR Team will get back to you soon!`;
            swalImg   = `${base_url}assets/modal/success_applied.png`;    
            confirm   = `Ok`;
            cancel    = ``;
            width     = 230;
            height    = 180;
            isCancel  = false;
        }

        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         width,
            imageHeight:        height,
            imageAlt:           "Custom image",
            showCancelButton:   isCancel,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   cancel,
            allowOutsideClick:  false,
            confirmButtonText:  confirm
        });
    }
    
    $(document).on("click", "#btnApply", function () {
        const confirmation = getConfirmation("apply");
        let designationID  = $(this).attr("designationid");
        confirmation.then(res => {
            if (res.isConfirmed) {
                let data = new FormData();
                data.append("applicantID",applicantID);
                data.append("jobID",jobID);
                data.append("designationID", designationID);

                $("#loader").show();
                $(".loader p").text('Loading...');
                setTimeout(() => {
                    $.ajax({
                        method:      "POST",
                        url:         `${base_url}web/job/apply`,
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

                            if (data=="success") {
                                $("#btnApply").hide();
                                getConfirmation("success");
                                $("#loader").hide();
                            }else{
                                showNotification("danger", "System error: Please contact the system administrator for assistance!");
                                $("#loader").hide();
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
    // ----- END SAVE APPLICANT -----
})