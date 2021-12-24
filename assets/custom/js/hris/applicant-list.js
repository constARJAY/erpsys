let getProfileTableData, getExamData, getProgressionData, getApplicantStatus, getPersonInCharge, getApplicantID, designationID;
let getApplicantInterviewerData;
$(document).ready(function(){

    pageContent();

    $(document).on("click",".btn-view", function(){
        let thisDesignationID   = $(this).attr("designationid"); 
        let thisApplicantID     = $(this).attr("applicantid");
        designationID           = thisDesignationID;
        getApplicantID          = thisApplicantID;
        pageContent(false);
    });

    $(document).on("click", "#btnBack", function(){
        pageContent();
    });

    $(document).on("click", ".main-tab", function(){
        let thisEvent   = $(this);
        let thisParent  = thisEvent.closest(".parent-main-tab");
        let redirectTo  = thisEvent.attr("redirect");
        let html;
        // FIND ACTIVE CLASS THEN REMOVE.;
        thisParent.find(".nav-link").each(function(){
            $(this).removeClass("active");
        });
        thisEvent.addClass("active");
        $("#applicant_details_content").html(preloader);
        switch (redirectTo) {
            case "application":
                    html = getCardApplication(getApplicantInterviewerData || false);
                break;
            case "examination":
                   html = getCardExamination();
                break;
            case "interview":
                   html = getCardInterview();
                break;
            default:
                html = getDetailsContent(getProfileTableData);
                break;
        }
        setTimeout(() => {
            $("#applicant_details_content").html(html);
            updateAttr();
            initDataTables();
            initAll();
        }, 500);    
    });

    $(document).on("click", ".btnAddRow", function(){
        let thisEvent   = $(this);
        let tabType     = thisEvent.attr("tabtype");
        let thisTable   = thisEvent.attr("parenttable");
        let html;
        switch (tabType) {
            case "application":
                        html = getApplicationRow();
                break;
            case "sample1":
                break;
            case "sample2":
                break;
            default:
                break;
        }

        $(thisTable).find("tbody").append(html);
        setTimeout(() => {
            updateAttr();
            initAll();
            updateSelect();
        }, 50);
    });

    $(document).on("click",".check_all", function(){
        let thisEvent   = $(this);
        let tabType     = thisEvent.attr("tabtype");
        let thisTable   = thisEvent.closest("table").attr("id");
        let condition   = thisEvent.prop("checked");
        $(`.check_row[tabtype=${tabType}]`).each(function(){
            $(this).prop("checked", condition);
        });
        updateDeleteButton(tabType);
    });

    $(document).on("click",".check_row", function(){
        let thisEvent   = $(this);
        let tabType     = thisEvent.attr("tabtype");;
        updateDeleteButton(tabType);
    });

    $(document).on("click", ".btnDeleteRow", function(){
        let thisEvent   = $(this);
        let tabType     = thisEvent.attr("tabtype");
        deleteTableRow(tabType);
    });

    $(document).on("click", ".btnUpdate", function(){
        let thisEvent       = $(this);
        let givenAction     = thisEvent.attr("givenaction");
        let action          = givenAction == "application" ? false : true;
        let data            = getApplicantListFormData(givenAction,thisEvent);
        let condition       = givenAction == "application" || givenAction == "interview"   
                                ? validateForm(givenAction == "application" ? "tableApplication" : "tableInterviewer") : true ;
        if(condition){
            let argData         = { 
                condition:  "update",            // add|update|cancel
                moduleName: "Applicant List",   // Title
                msgExt: "",                    // Message Extension,
                thisEvent,                    // clickButton
                thisCard: givenAction,       // card content
                data,                       // REQUIRED TO BE OBJECT   
            };
            updateConfirmation(argData,action);
        }
    });
    
    $(document).on("click","#generateExam", function(){
        $("#showUrl").html(preloader);

        let applicantID     = $(this).attr("applicantid");
        let designationID   = $(this).attr("designationid");
        let examDate        = moment($("#examDate").val()).format("YYYY-MM-DD");

        let data = {applicantID, designationID, examDate};
        let link = generateExamURL(data);
        let html =   `<label>Exam URL:</label>
                            <textarea class="form-control" style="resize:none; height: 90px" readonly>${link}</textarea>`;
        setTimeout(() => {
            $("#showUrl").html(html);
        }, 500);

    });

    
    // CHANGES
    $(document).on("change", "[name=progression]", function(){
        updateSelect();
    });

    

});

// DATATABLES
function initDataTables() {
		
    const activateDatatable = (elementID = null, options = {}, param = "id") => {
        let thisElement = param == "id" ? `#${elementID}` : `.${elementID}`; 
        if ($.fn.DataTable.isDataTable(thisElement)) {
            $(thisElement).DataTable().destroy();
        }
        var table = $(thisElement)
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable(options);
    }

    const headerOptions = {
        proccessing:    false,
        serverSide:     false,
        scrollX:        true,
        sorting:        [],
        scrollCollapse: true,
        columnDefs: [
            { targets: 0,  width: 100 },
            { targets: 1,  width: 150 },
            { targets: 2,  width: 100 },
            { targets: 3,  width: 350 },
            { targets: 4,  width: 100 },
            { targets: 5,  width: 150 },
            { targets: 6,  width: 280 },
            { targets: 7,  width: 80  },
            { targets: 8,  width: 130 },
            { targets: 9,  width: 130 },
            { targets: 10,  width: 100 },
        ],
    };

    const bodyOptionApplication = () => {
        let option = {
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        false,
                    searching:      false,
                    paging:         false,
                    ordering:       false,
                    info:           false,
                    scrollCollapse: true,
                    columnDefs: []
                }
        let column =    [
                            { targets: 0,  width: 50 },
                            { targets: 1,  width: 150 },
                            { targets: 2,  width: 200 },
                            { targets: 3,  width: 150 },
                            { targets: 4,  width: 150 }
                        ];
        
        option["columnDefs"] = column;
        return option;
    };


    ["tableMyForms"].map(id => activateDatatable(id, headerOptions));

    $(`.table-details`).each(function() {
        let elementID 	= $(this).attr("id");
        let option;
        switch (elementID) {
            case "tableApplication":
                option 	= bodyOptionApplication();
                break;
            case "tableExamination":
                // option 	= bodyOptionAsset(readOnly);
                break;
            case "tableInterview":
                // option 	= bodyOptionAsset(readOnly);
                break;
            default:
                // option 	= bodyOptionItems(readOnly);
                break;
        }
        activateDatatable(elementID, option);
    });

}
// END DATATABLES


function pageContent(isDetails = true){
    $("#page_content").html(`   <div class="col-lg-12 p-0">
                                    <div class="card">
                                        <div class="body">
                                            <div class="row clearfix row-deck">
                                                <div class="col-12">
                                                    <div class="table-responsive">
                                                        ${preloader}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
    let pageContentHtml = ``;
    let applicantNav    = ``;
    let headerButton    = ``;
    if(!isDetails){
        headerButton    =  `<button type="button" class="btn btn-default btn-light" id="btnBack">
        <i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
        applicantNav    =   `
                                <div class="bh_divider appendHeader"></div>
                                <div class="row clearfix appendHeader">
                                    <div class="col-12">
                                        <ul class="nav nav-tabs parent-main-tab">
                                            <li class="nav-item "><a class="nav-link main-tab active" data-toggle="tab" href="#" redirect="information">Information</a></li>
                                            <li class="nav-item "><a class="nav-link main-tab" data-toggle="tab" href="#" redirect="application">Application</a></li>
                                            <li class="nav-item "><a class="nav-link main-tab" data-toggle="tab" href="#" redirect="examination">Examination</a></li>
                                            <li class="nav-item "><a class="nav-link main-tab" data-toggle="tab" href="#" redirect="interview">Interview</a></li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            `;
        pageContentHtml = `
                            <div class="col-lg-3 col-md-12">
                                    <div class="card" id="applicant_details_summary">
                                
                                    </div>                  
                            </div>
                            <div class="col-lg-9 col-md-12">
                                <div class="card" id="applicant_details_content">
                                    
                                </div>
                            </div>
                            `;
        getProgressionData          = [
                                            { type : "For Review" },
                                            { type : "Initial Interview" },
                                            { type : "Technical Exam" },
                                            { type : "Technical Interview" },
                                            { type : "Exam" },
                                            { type : "Final Interview" },
                                            { type : "Job Order" }
                                        ];
        getExamData                 = getTableData("hris_examination_tbl", "", "");
        getPersonInCharge           = getTableData("hris_employee_list_tbl", 
                                                `employeeID, CONCAT(employeeLastname,", ",employeeFirstname," ",employeeMiddlename) AS fullName`, 
                                                `(employeeRanking = 'Managerial' OR employeeRanking = 'Officer') AND employeeStatus = '1' `);
        getApplicantStatus          =  [
                                            { type : "Pending" },
                                            { type : "For Review" },
                                            { type : "Waitlisted" },
                                            { type : "Cancelled" },
                                            { type : "Passed" },
                                            { type : "Failed" },
                                            { type : "Re-evaluate" }
                                        ];
        getApplicantInterviewerData = getTableData("hris_applicant_interviewer_tbl","",`applicantID = '${getApplicantID}'`);
        getProfileTableData         = getProfileData(getApplicantID);
        
        setTimeout(() => {
            preventRefresh(true);
            $("#headerButton").html(headerButton);
            $(".div-applicant-nav").html(applicantNav);
            $("#page_content").html(pageContentHtml);
            $("#applicant_details_summary").html(getSummaryContent(getProfileTableData)); 
            $("#applicant_details_content").html(getDetailsContent(getProfileTableData)); 
        }, 500);
    }else{
        let tableData   = getTableData(`web_applicant_list_tbl AS wall LEFT JOIN hris_designation_tbl AS hdt ON hdt.designationID = wall.applicantDesignationID`,
                                        `wall.*, designationName, CONCAT(wall.applicantLastname,', ',wall.applicantFirstname,' ',wall.applicantMiddlename) as fullname`,
                                        `applicantDesignationID != '0' `);
        pageContentHtml = ` 
                            <div class="col-lg-12 p-0">
                                <div class="card">
                                    <div class="body">
                                        <div class="row clearfix row-deck">
                                            <div class="col-12">
                                                <div class="table-responsive">
                                                    ${tableContent(tableData)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        setTimeout(() => {
            preventRefresh(false);
            $("#headerButton").html(headerButton);
            $(".div-applicant-nav").html(applicantNav);
            $("#page_content").html(pageContentHtml);
            initDataTables();
        }, 1000);
    }
}


function tableContent(data = false){
    let tableDataRow = ``;
    data.map(value=>{
        let applicantAddress    = `${capitalizeString(value.applicantUnit)} ${capitalizeString(value.applicantBuilding)}, 
                                        ${capitalizeString(value.applicantStreet)}, ${capitalizeString(value.applicantSubdivision)},
                                        ${capitalizeString(value.applicantBarangay)}, ${capitalizeString(value.applicantCity)},
                                        ${capitalizeString(value.applicantRegion)}, ${value.applicantZipCode}
                                    `;
        let progressionFlag      = 0;
        let progressionTableData = getTableData(`hris_applicant_interviewer_tbl`,``,`applicantID = '${value.applicantID}'`);
        progressionTableData.map(x=>{
            if(x.applicantInterviewerNote){
                progressionFlag++;
            }
        });
        let applicantInterviewerProgression="", personInCharge="", applicantUpdatedAt="", applicantInterviewerStatus="";
        if(progressionFlag){
            applicantInterviewerProgression = progressionTableData[parseInt(progressionFlag) - 1].applicantInterviewerProgression;
            personInCharge                  = progressionTableData[parseInt(progressionFlag) - 1].personInCharge;
            applicantUpdatedAt              = progressionTableData[parseInt(progressionFlag) - 1].updatedAt;
            applicantInterviewerStatus      = progressionTableData[parseInt(progressionFlag) - 1].applicantInterviewerStatus;
        }

        tableDataRow += `
                        <tr class="btn-view" style="cursor:pointer" applicantid="${value.applicantID}"  designationid="${value.applicantDesignationID}" id="${encryptString(value.applicantID)}">
                            <td>${getFormCode("APPL", value.createdAt, value.applicantID )}</td>
                            <td>${value.fullname}</td>
                            <td>${value.designationName}</td>
                            <td>${applicantAddress}</td>
                            <td> ${value.applicantMobile}</td>
                            <td>${value.applicantEmail} </td>
                            <td>${value.applicantResume}</td>
                            <td class="text-center">${applicantInterviewerProgression || "-"}</td>
                            <td class="text-center">${personInCharge || "-"}</td>
                            <td class="text-left">${applicantUpdatedAt ? moment(applicantUpdatedAt).format("MMMM DD, YYYY") : "-"}</td>
                            <td class="text-center">${getStatusStyle(applicantInterviewerStatus)}</td>
                        </tr>`;
    }); 
    let html =  `   
                <table class="table table-bordered table-striped table-hover" id="tableMyForms">
                    <thead>
                        <tr style="white-space: nowrap">
                            <th>Applicant Code</th>
                            <th>Full Name </th>
                            <th>Applied Position</th>
                            <th>Address</th>
                            <th>Contact No.</th>
                            <th>Email Address</th>
                            <th>CV/Resume</th>
                            <th>Progression	</th>
                            <th>Person In-Charge</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                            ${tableDataRow}
                    <tbody>
                    
                    </tbody>
                </table>
                `;
    return html;
}

function getProgressionOption(id = false, arrayData = false){
    let progressionIDArr;
    let html = `<option disabled ${id ? "" : "selected"}>Select Progression</option>`;
    if(!arrayData){
        progressionIDArr 	= [];
        $(`[name=progression]`).each(function(i, obj){
            if($(this).val()){
                progressionIDArr.push($(this).val());
            }
        });
    }else{
        progressionIDArr = arrayData;
    }

    getProgressionData.filter(value=> !progressionIDArr.includes(value.type) || value.type == id).map(value =>{
        html += `<option value="${value.type}" ${value.type === id ? "selected" : ""}>${value.type}</option>`;
    });
    return html;
}

function getExamOption(id = false){
    let html = `<option disabled ${id ? "" : "selected"}>Select Exam</option>`;
    getExamData.map(value=>{
        html += `<option value="${value.examinationID}" ${value.examinationID == id ? "selected" : ""}>${value.examinationName}</option>`;
    });
    return html;
}

function getPersonInChargeOption(id = false){
    let html = `<option disabled ${id? "":"selected"}>Select Person in Charge</option>`;
    getPersonInCharge.map(value=>{
        html += `<option 
                    value="${value.employeeID}"
                    fullname="${value.fullName}" 
                    ${value.employeeID == id ? "selected" : ""}>${value.fullName}</option>`;
    });
    return html;
}

function getApplicationStatusOption(id, isLastOption = false){
    let html = `<option value="Pending" disabled ${id? "": "selected"}>Pending</option>`;
    // let html;
    getApplicantStatus.map((value, index)=>{
        index > 0 ?
        html += `<option value="${value.type}" ${value.type == id ? "selected" : ""}>${value.type}</option>` : "";
    });

    if(isLastOption){
        html += `<option value="Job Order" ${id == "Job Order" ? "selected" : ""}>Job Order</option>`;
    }
    
    return html;
}


function deleteTableRow(tabType){
    if ($(`.check_row[tabtype=${tabType}]:checked`).length != $(`.check_row[tabtype=${tabType}]`).length) {
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
                $(`.check_row[tabtype=${tabType}]:checked`).each(function(i, obj) {
                    var tableRow = $(this).closest('tr');
                    tableRow.fadeOut(500, function (){
                        $(this).closest("tr").remove();
                        updateAttr();
                        updateDeleteButton(tabType);
                        updateSelect();
                    });
                })
            }
        });
    } else {
        showNotification("danger", "You must have atleast one or more items.");
    }
}

function updateDeleteButton(tabType = false){
    let flag = 0, disabled ; 
    $(`.check_row[tabtype=${tabType}]:checked`).each(function(){
        flag++;
    });
    disabled = flag > 0 ? false : true;
    $(`.btnDeleteRow[tabtype=${tabType}]`).prop("disabled", disabled);
    // updateAttr();
}

function updateAttr(){
    $(".table-row-application").each(function(i){
        $(this).find("[name=progression]").attr("id", `progression${i}`);
        // $(this).find("[name=progression]").attr("value", $(this).find("[name=progression]").val());
        $(this).find("[name=exam]").attr("id", `exam${i}`);
        $(this).find("[name=personInCharge]").attr("id", `personInCharge${i}`);
        $(this).find("[name=dateTime]").attr("id", `dateTime${i}`);
        $(this).find("[name=applicationStatus]").attr("id", `applicationStatus${i}`);
        let thisDateTime = $(`#dateTime${i}`).val();
            $(`#dateTime${i}`).daterangepicker({
                singleDatePicker: true,
                timePicker: true,
                showDropdowns: true,
                autoApply: true,
                locale: {
                    format: 'MMMM DD, YYYY hh:mm:ss A'
                },
            });
        $(`#dateTime${i}`).val(thisDateTime);
    });

    

    $(".table-row-interview").each(function(i){
        $(this).find("[name=interviewerNote]").attr("id",`interviewerNote${i}`);
        $(this).find("[name=applicationStatus]").attr("id",`applicationStatus${i}`);
    });
    // initAll();
    // updateSelect();

}

function updateSelect(){
    // FOR PROGRESSION
		let progressionValueArr 	= [];
		let progressionElementID 	= [];

		$(`[name=progression]`).each(function(i, obj){
			progressionValueArr.push($(this).val());
			progressionElementID.push(this.id);
		});

		progressionElementID.map((valueID, valueIDIndex)=>{
			$(`#${valueID}`).html("");
			let html = getProgressionOption(progressionValueArr[valueIDIndex], progressionValueArr);
			$(`#${valueID}`).html(html);
		});
    // END FOR PROGRESSION
}


// GETTING THE INFORMATION OF APPLICANT
    function getSummaryContent(data = false){
        let {
            applicantFirstname      = "",
            applicantMiddlename     = "",
            applicantLastname       = "",
            applicantBirthday       = "",
            applicantEmail          = "",
            applicantMobile         = "",
            applicantTelephone      = "",
            applicantProfile        = "",
            applicantResume         = "",
        } = data[0];
        let educationTableData      = data ? data["education"] : false;
        let educationTableDataRow   = "";

        if(educationTableData){
            educationTableData.map(value=>{
                educationTableDataRow +=    `
                                         <div class="timeline-item info" date-is="${value.schoolYear}"> 
                                            <h5>${value.schoolName}</h5>
                                            <span>${value.applicantCourse}</span>
                                            <div class="msg">
                                                <p>${value.applicantActivities}</p>
                                            </div>
                                        </div> 
                                        `;
            });
        }

        let html = `
                         <div class="profile-image mb-0 text-center"> 
                            <img class="img-fluid rounded p-0 mt-3" src="${base_url}/assets/upload-files/profile-images/${applicantProfile}" alt=""> 
                        </div>
                        
                        <div class="body">
                        
                            <h5 class="card-title m-0">${applicantLastname}, ${applicantFirstname} ${applicantMiddlename}</h5>
                            
                            <div class="resume my-2" id="displayResume" style="display:block; font-size: 12px; border: 1px solid black; border-radius: 5px; background: #d1ffe0; padding: 2px 10px;">
                                <div class="d-flex justify-content-start align-items-center p-0">
                                    <a class="filename" title="${applicantResume}" style="display: block;
                                        color: black;
                                        width: 90%;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;" href="${base_url}assets/upload-files/resumes/${applicantResume}" target="_blank">
                                        ${applicantResume}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <small class="text-muted">Mobile:</small>
                                <p class="mb-0">${applicantMobile}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Telephone:</small>
                                <p class="mb-0">${applicantTelephone}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Email:</small>
                                <p class="mb-0">${applicantEmail}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Birthdate:</small>
                                <p class="mb-0">${moment(applicantBirthday).format("MMMM DD, YYYY")}</p>
                            </li>
                        </ul>

                        <div class="body">
                            <h5 class="text-muted">Educational Attainment</h5>
                                <div class="tab-pane active" id="tab-activity">
                                    ${educationTableDataRow}
                                </div>  
                        </div>

                    `;
        return html;
    }

    function getDetailsContent(data = false){
        
        let html = `
        <div class="body">
            <ul class="nav nav-tabs">                                
                <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tab-basic-information">Basic Information</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-ph-id-information">PH ID Information</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-employment-history">Employment History</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-organization-joined">Organization Joined</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-exam-taken">Exam Taken</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-seminars">Seminars</a></li>
                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-character-reference">Character Reference</a></li>
            </ul>                        
            <div class="tab-content mt-3">
                ${getInformationTab(data)}
                ${getPhIDInformation(data)}
                ${getEmploymentHistory(data)}
                ${getOrganizationJoined(data)}
                ${getExamTaken(data)}
                ${getSeminars(data)}
                ${getCharacterReference(data)}
            </div>
        </div>`;
        return html;
    }

    function getInformationTab(data = false){
        let {
            applicantFirstname      = "-",
            applicantMiddlename     = "-",
            applicantLastname       = "-",
            applicantBirthday       = "-",
            applicantBirthPlace     = "-",
            applicantGender         = "-",
            applicantUnit           = "-",
            applicantBuilding       = "-",
            applicantStreet         = "-",
            applicantSubdivision    = "-",
            applicantBarangay       = "-",
            applicantCity           = "-",
            applicantRegion         = "-",
            applicantZipCode        = "-",
            applicantCitizenship    = "-",
            applicantCivilStatus    = "-",
            applicantReligion       = "-",
            applicantContactNumber  = "-",
            applicantContactPerson  = "-",
            applicantFathersName    = "-",
            applicantFathersAge     = "-",
            applicantMothersName    = "-",
            applicantMothersAge     = "-",
            applicantSpouseAge      = "-",
            applicantSpouseName     = "-",
            applicantDesignationID  = "",
        } = data[0];
        let designationName        = getTableData("hris_designation_tbl","designationName", `designationID = '${applicantDesignationID}' `);
        let applicantAddress = `${capitalizeString(applicantUnit)} ${capitalizeString(applicantBuilding)}, 
                                ${capitalizeString(applicantStreet)}, ${capitalizeString(applicantSubdivision)},
                                ${capitalizeString(applicantBarangay)}, ${capitalizeString(applicantCity)},
                                ${capitalizeString(applicantRegion)}, ${applicantZipCode}
                              `;
        let applicantBirthdaySplit  = applicantBirthday.split("-");
        let birthYear               = applicantBirthdaySplit[0];
        let thisYear                = moment().format("YYYY");
        let age                     = parseInt(thisYear) - parseInt(birthYear);

        let html = `
            <div class="tab-pane active" id="tab-basic-information"> <!-- START DIV OF tab-basic-information -->

                <div class="card">
                    <div class="body">
                        <div class="row clearfix">
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">First Name</label>                                                
                                    <div class="border-bottom w-100">${applicantFirstname}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">  
                                    <label class="font-weight-bold">Middle Name</label>                                              
                                    <div class="border-bottom w-100">${applicantMiddlename||"-"}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">   
                                    <label class="font-weight-bold">Last Name</label>                                             
                                    <div class="border-bottom w-100">${applicantLastname}</div>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Birth Date</label>                                                
                                    <div class="border-bottom w-100">${moment(applicantBirthday).format("MMMM DD, YYYY")}</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">     
                                    <label class="font-weight-bold">Birth Place</label>                                                 
                                    <div class="border-bottom w-100">${applicantBirthPlace}</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">    
                                    <label class="font-weight-bold">Age</label>                                                 
                                    <div class="border-bottom w-100">${age}</div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-12">
                                <div class="form-group">     
                                    <label class="font-weight-bold">Gender</label>                                                 
                                    <div class="border-bottom w-100">${applicantGender}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">     
                                    <label class="font-weight-bold">Applied Position</label>                                                 
                                    <div class="border-bottom w-100">${designationName ? designationName[0].designationName : "-"}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">  
                                    <label class="font-weight-bold">Citizenship</label>                                             
                                    <div class="border-bottom w-100">${applicantCitizenship}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">  
                                    <label class="font-weight-bold">Civil Status</label>                                             
                                    <div class="border-bottom w-100">${applicantCivilStatus}</div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12">
                                <div class="form-group">  
                                    <label class="font-weight-bold">Address</label>                                             
                                    <div class="border-bottom w-100">${applicantAddress}</div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Religion</label>                                                
                                    <div class="border-bottom w-100">${applicantReligion}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">  
                                    <label class="font-weight-bold">Contact Person</label>                                              
                                    <div class="border-bottom w-100">${applicantContactPerson}</div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="form-group">   
                                    <label class="font-weight-bold">Contact No.</label>                                             
                                    <div class="border-bottom w-100">${applicantContactNumber}</div>
                                </div>
                            </div>

                        </div>  
                    </div>
                </div>

                <div class="card">
                    <div class="header">
                        <h2>Family Background</h2>
                    </div>
                    <div class="body">
                        <div class="row clearfix">
                            <div class="col-lg-10 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Father's Name</label>                                                
                                    <div class="border-bottom w-100">${applicantFathersName || "-"}</div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Age</label>                                                
                                    <div class="border-bottom w-100">${applicantFathersAge == "0" ? "-" : applicantFathersAge}</div>
                                </div>
                            </div>
                            <div class="col-lg-10 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Mother's Name</label>                                                
                                    <div class="border-bottom w-100">${applicantMothersName || "-"}</div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Age</label>                                                
                                    <div class="border-bottom w-100">${applicantMothersAge == "0" ? "-" : applicantMothersAge}</div>
                                </div>
                            </div>
                            <div class="col-lg-10 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Spouse Name</label>                                                
                                    <div class="border-bottom w-100">${applicantSpouseName || "-"}</div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">Age</label>                                                
                                    <div class="border-bottom w-100">${applicantSpouseName ? applicantSpouseAge : "-"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="header">
                        <h2>Dependent's Information</h2>
                    </div>
                    <div class="body">
                        <div class="row clearfix">
                           ${getDependentInformation(data)}
                        </div>
                    </div>
                </div>
            </div>  <!-- END DIV OF tab-basic-information -->`;
        return html;
    }

    function getDependentInformation(data = false){
        let html = `
                         <div class="col-lg-4 col-md-12">
                           
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <img src="${base_url}/assets/modal/no-data.gif">
                        </div>
                        <div class="col-lg-4 col-md-12">
                         
                        </div>
                `;
        if(data["dependent"]){
            html = "";
            data["dependent"].map(value=>{
                html += `
                    <div class="col-lg-6 col-md-12">
                        <div class="form-group">
                            <label class="font-weight-bold">Name</label>                                                
                            <div class="border-bottom w-100">${value.dependentName}</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-12">
                        <div class="form-group">
                            <label class="font-weight-bold">Relationship</label>                                                
                            <div class="border-bottom w-100">${value.relationship}</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-12">
                        <div class="form-group">
                            <label class="font-weight-bold">Birthday</label>                                                
                            <div class="border-bottom w-100">${value.birthday}</div>
                        </div>
                    </div>`;
            });
        }
        return html;
    }

    function getPhIDInformation(data = false){
        let {
            applicantTIN            =   "",
            applicantSSS            =   "",
            applicantPhilHealth     =   "",
            applicantPagibig        =   "",
            applicationPRC          =   "",
            applicationPRCExpDate   =   "",
            applicantNHNF           =   "",
            applicantPHIL           =   "",
        } = data[0];
        let html = `
            <div class="tab-pane" id="tab-ph-id-information"> <!-- START DIV OF tab-ph-id-information -->
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-lg-10 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Professional Regulation Commission ID (PRC ID)</label>                                                
                                <div class="border-bottom w-100">${applicationPRC || "-"}</div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Expiration Date</label>                                                
                                <div class="border-bottom w-100">${applicationPRCExpDate || "-"}</div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">SSS No.</label>                                                
                                <div class="border-bottom w-100">${applicantSSS || "-"}</div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Tax Identification No. (TIN)</label>                                                
                                <div class="border-bottom w-100">${applicantTIN || "-"}</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Philippine Identification Card</label>                                                
                                <div class="border-bottom w-100">${applicantPHIL || "-"}</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">NHMF</label>                                                
                                <div class="border-bottom w-100">${applicantNHNF || "-"}</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Pag-IBIG ID</label>                                                
                                <div class="border-bottom w-100">${applicantPagibig || "-"}</div>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-12">
                            <div class="form-group">
                                <label class="font-weight-bold">PhilHealth ID</label>                                                
                                <div class="border-bottom w-100">${applicantPhilHealth || "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> <!-- END DIV OF tab-ph-id-information -->
        `;
        return html;
    }

    function getEmploymentHistory(data = false){
        let tabActivity            = ``;
        let employmentTableDataRow = "<h2>No employment history...</h2>";
        tabActivity = employmentTableDataRow;
        if(data["employment"]){
            employmentTableDataRow = "";
            data["employment"].map(value=>{
                employmentTableDataRow +=   `
                                            <div class="timeline-item red" date-is="${value.historyDaterange}"> 
                                                <h5>${value.historyEmployerName}</h5>
                                                <span>${value.position}</span>
                                                <div class="msg">
                                                    <div class="for-address">
                                                        <label>Address:</label>
                                                        <p>${value.historyEmployerAddress}</p>
                                                    </div>
                                                    <div class="for-reason-of-leaving">
                                                        <label>Reason of Leaving:</label>
                                                        <p>${value.reasonLeaving}</p>
                                                    </div>
                                                    <div class="for-salary">
                                                        <label>Last Salary:</label>
                                                        <p>${formatAmount(value.historySalary)}</p>
                                                    </div>
                                                </div>
                                            </div>`;
            });
            tabActivity =   `
                            <div class="tab-pane active" id="tab-activity">
                                ${employmentTableDataRow}
                            </div>
                            `;
        }
        let html = `
            <div class="tab-pane" id="tab-employment-history"> <!-- START DIV OF tab-employment-history -->
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-lg-6 col-md-12">
                            ${tabActivity}
                        </div>

                        ${questionaire(false)}
                    </div>
                </div>
            </div> <!-- END DIV OF tab-employment-history -->

        `;
        return html;
    }

    function getOrganizationJoined(data = false){
        let orgTableDataRow = `
                                <div class="col-lg-4 col-md-0">
                           
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <img src="${base_url}/assets/modal/no-data.gif">
                                </div>
                                <div class="col-lg-4 col-md-0">
                                
                                </div>
                                `;
        if(data["organization"].length > 0){
            orgTableDataRow = ``;
            data["organization"].map(value=>{
                orgTableDataRow += `
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Date</label>                                                
                                            <div class="border-bottom w-100">${value.organizationJoinDate || "-" }</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Name of Organization</label>                                                
                                            <div class="border-bottom w-100">${value.organizationName || "-" }</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Position</label>                                                
                                            <div class="border-bottom w-100">${value.organizationPosition || "-" }</div>
                                        </div>
                                    </div>`;
            });
        }
        let html = `
            <div class="tab-pane" id="tab-organization-joined"> <!-- START DIV OF tab-organization-joined -->
                <div class="body">
                    <div class="row clearfix">
                       ${orgTableDataRow}
                    </div>
                </div>
            </div> <!-- END DIV OF tab-organization-joined -->
        `;
        return html;
    }

    function getExamTaken(data = false){
        let examTableDataRow =  `
                                <div class="col-lg-4 col-md-0">
                           
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <img src="${base_url}/assets/modal/no-data.gif">
                                </div>
                                <div class="col-lg-4 col-md-0">
                                
                                </div>
                                `;
        if(data["exam"].length > 0){
            examTableDataRow = ``;
            data["exam"].map(value=>{
                examTableDataRow += `
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Date</label>                                                
                                                <div class="border-bottom w-100">${value.examTakenDate}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Exam Taken</label>                                                
                                                <div class="border-bottom w-100">${value.examTakenDescription}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Result</label>                                                
                                                <div class="border-bottom w-100">${value.examTakenResult}</div>
                                            </div>
                                        </div>
                                    `;
            });
        }
        let html = `
            <div class="tab-pane" id="tab-exam-taken"> <!-- START DIV OF tab-exam-taken -->
                <div class="body">
                    <div class="row clearfix">
                        ${examTableDataRow}
                    </div>
                </div>
            </div> <!-- END DIV OF tab-exam-taken -->
        `;
        return html;
    }

    function getSeminars(data = false){
        let seminarTableDataRow = ` <div class="col-lg-4 col-md-0">
                           
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <img src="${base_url}/assets/modal/no-data.gif">
                                    </div>
                                    <div class="col-lg-4 col-md-0">
                                    
                                    </div>`;
        if(data["seminar"].length > 0){
            seminarTableDataRow = ``;
            data["seminar"].map(value=>{
                seminarTableDataRow += `
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Date</label>                                                
                                                <div class="border-bottom w-100">${value.seminarTakenDate}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Seminar</label>                                                
                                                <div class="border-bottom w-100">${value.seminarTakenDescription}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Position</label>                                                
                                                <div class="border-bottom w-100">${value.seminarTakenPosition}</div>
                                            </div>
                                        </div>`;
            });
        }
        let html = `
            <div class="tab-pane" id="tab-seminars"> <!-- START DIV OF tab-seminars -->
                <div class="body">
                    <div class="row clearfix">
                        ${seminarTableDataRow}
                    </div>
                </div>
            </div>  <!-- END DIV OF tab-seminars -->
        `;
        return html;
    }

    function getCharacterReference(data = false){
        let charRefTableDataRow = ` <div class="col-lg-12 col-md-12">
                                        <h2>No character reference found.</h2>
                                    </div>`;
        if(data["characterRef"]){
            charRefTableDataRow = ``;
            data["characterRef"].map(value=>{
                charRefTableDataRow += `
                                        <div class="col-lg-3 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Name</label>                                                
                                                <div class="border-bottom w-100">${value.characterReferenceName}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Position</label>                                                
                                                <div class="border-bottom w-100">${value.characterReferencePosition}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Company</label>                                                
                                                <div class="border-bottom w-100">${value.characterReferenceCompany}</div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Contact Number</label>                                                
                                                <div class="border-bottom w-100">${value.characterReferenceNumber}</div>
                                            </div>
                                        </div> `;
            });
        }

        let html = `
            <div class="tab-pane" id="tab-character-reference"> <!-- START DIV OF tab-character-reference -->
                    <div class="body">
                        <div class="row clearfix">
                            ${charRefTableDataRow}
                        </div>
                    </div>
                </div>  <!-- END DIV OF tab-character-reference -->
        `;
        return html;
    }

// END GETTING THE INFORMATION OF APPLICANT

// GETTING THE APPLICATION OF APPLICANT
    function getCardApplication(data = false){
        let tableBodyData =  getApplicationRow();
        if(data){
            if(data.length > 0){
                tableBodyData = "";
                data.map(value=>{
                    tableBodyData +=  getApplicationRow(value);
                });
            }
        }

        let html = `
                <div class="body">
                    <div class="row clearfix">
                        <div class="col-12">
                                <table class="table table-bordered table-striped table-hover table-details" id="tableApplication">
                                    <thead>
                                        <tr style="white-space: nowrap">
                                            <th class="text-center"><input type="checkbox" class="check_all" tabtype="application"></th>
                                            <th>Progression</th>
                                            <th>Person In-Charge</th>
                                            <th>Target Date and Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-body" tabtype="application">
                                    ${tableBodyData}
                                    </tbody>
                                </table>
                                <div class="mt-3">
                                    <button type="button" class="btn btn-primary btnAddRow" tabtype="application" parenttable="#tableApplication"><i class="fas fa-plus-circle"></i> Add Row</button>
                                    <button type="button" class="btn btn-danger btnDeleteRow" tabtype="application" parenttable="#tableApplication" disabled=""><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                                </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <button type="button" class="btn btn-submit px-5 p-2 btnUpdate" givenaction="application"><i class="fas fa-save"></i> Update</button>
                        <!-- <button type="button" class="btn btn-default">Cancel</button> -->
                    </div>
                
                </div>
            `;
        return html;
    }

    function getApplicationRow(data = false){
        let {
            applicantID                     =   "",
            applicantInterviewerProgression =   "",
            employeeID                      =   "",
            personInCharge                  =   "",
            applicantInterviewerDateTime    =   "",
            applicantInterviewerNote        =   "",
            applicantInterviewerStatus      =   ""
        } = data;
        let html = `
                <tr class="table-row-application" style="white-space: nowrap">
                    <td class="text-center"><input type="checkbox" class="check_row" tabtype="application"></td>
                    <td>
                        <select class="form-control validate select2 w-100" tabtype="application" required
                            name="progression">
                            ${getProgressionOption(applicantInterviewerProgression)}
                        </select>
                    </td>
                    <td>
                        <select class="form-control validate select2 w-100" tabtype="application" required
                            name="personInCharge">
                            ${getPersonInChargeOption(employeeID)}
                        </select>
                    </td>
                    <td>
                        <input
                            type="button" 
                            class = "form-control daterange-target-date-time text-center"
                            name = "dateTime"
                            id="dateTime" 
                            required
                            value = "${applicantInterviewerDateTime || moment().format("MMMM DD, YYYY hh:mm:ss A")}">
                    </td>
                    <td>
                        <select class="form-control validate select2 w-100" tabtype="application"
                            name="applicationStatus" disabled>
                            ${getApplicationStatusOption(applicantInterviewerStatus)}
                        </select>
                    </td>
                </tr>
        `;
        return html;
    }
// END GETTING THE APPLICATION OF APPLICANT
 
function getCardExamination(){
    let tableData = getTableData( `web_applicant_job_tbl AS appJob
                                                       INNER JOIN hris_job_posting_tbl as postJob ON postJob.jobID = appJob.jobID
                                                       LEFT JOIN pms_personnel_requisition_tbl AS pprt ON postJob.requisitionID = pprt.requisitionID
                                                       LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = pprt.personnelReportByID`, 
                                    `	pprt.requisitionID AS requisitionID , CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) as reportBy, 
                                        personnelDateNeeded, pprt.createdAt AS createdAt, pprt.designationID as designationID`, 
                                    `applicantID = ${getApplicantID}` );
    let examinationData = getExaminationResult();
    let showUrl         = examinationData.length > 0 ? true : false;
    let html = `
        <div class="body">                        
            <div class="tab-content mt-3">
                    <div class="card">
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-6 col-md-12"></div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="input-group mb-3">
                                        

                                            ${showUrl ? `` : `
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                                </div>
                                                <input type="button" class="form-control daterange text-left" name = "examDate" id="examDate" value="${moment().format("MMMM DD, YYYY")}">
                                                <div class="input-group-prepend">
                                                    <button type="button" class="btn p-2 btn-submit" id="generateExam" 
                                                title="Generate Examination URL" applicantid="${getApplicantID}" 
                                                    designationid="${tableData[0].designationID}"> <i class="fa fa-link" aria-hidden="true"></i></button>`
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-lg-12 col-md-12">
                                    <div id="showUrl">${showUrl ? getExamination() : ""}</div>
                                </div>
                            </div>  

                            <div id="tableExamination"> </div>    
                        </div>
                    </div> 
            </div>
        </div>`;
    return html;
}


function getExamination(){
    let html = "";
    let tableData   = getExaminationResult();
    let tableRow    = ""; 
    let percentage  = 0;
            tableData.map((value,index)=>{
               tableRow +=  `   
                                <tr>
                                    <td>
                                        ${value.examinationName}<br>
                                        <small>${value.examinationType}</small>
                                    </td>
                                    <td class="text-right">${value.percent} %</td>
                                </tr>
                            `; 
                percentage += parseFloat(value.percent);
            });

            tableRow += `
                            <tr>
                                <td>
                                   Total Pecentage :
                                </td>
                                <td class="text-right"><strong>${percentage} %</strong></td>
                            </tr>
                        `;

        html    +=  `
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover" id="tableExamResult">
                                <thead>
                                    <tr>
                                        <th>Examination Name</th>
                                        <th style="width:10%">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        ${tableRow}
                                </tbody>    
                            </table>
                        </div>
                    `;
        return html ;
        // setTimeout(() => {
        //     $("#showUrl").html(html);
        // }, 500);
}

function getExaminationResult(){
    let applicantID  =   getApplicantID;
    let result       =  [];
        $.ajax({
            method:  "POST",
            url:     `${base_url}web/applicant/getExamResult`,
            data:	 {applicantID},
            async: false,
            dataType: "json",
            beforeSend: function() {
                // $("#loader").show();
            },

            success: function(data) {
                result = data;
            },

            error: function() {
                setTimeout(() => {
                    // $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
        });
    return result;
}



function getCardInterview(){
    let html = `
        <div class="body">                        
            <div class="tab-content mt-3">
                ${getInfo_InterviewTab()}
            </div>
        </div>`;
        return html;
}

function getInfo_InterviewTab(){
    let tableData = getTableData( `web_applicant_job_tbl AS appJob
                                                       INNER JOIN hris_job_posting_tbl as postJob ON postJob.jobID = appJob.jobID
                                                       LEFT JOIN pms_personnel_requisition_tbl AS pprt ON postJob.requisitionID = pprt.requisitionID
                                                       LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = pprt.personnelReportByID`, 
                                    `	pprt.requisitionID AS requisitionID , CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) as reportBy, personnelDateNeeded, pprt.createdAt AS createdAt`, 
                                    `applicantID = ${getApplicantID}` );
            
      let html = `
                    <div class="card">
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">PRF Number</label>                                                
                                        <div class="border-bottom w-100">${getFormCode("PRF",tableData[0].createdAt,tableData[0].requisitionID)}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group">  
                                        <label class="font-weight-bold">Date Required</label>                                              
                                        <div class="border-bottom w-100">${moment(tableData[0].personnelDateNeeded).format("MMMM DD, YYYY")}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group">   
                                        <label class="font-weight-bold">Requesting Manager</label>                                             
                                        <div class="border-bottom w-100">${tableData[0].reportBy}</div>
                                    </div>
                                </div>
                            </div>  

                            <div id="tableInterviewer">
                                ${getLevelInterviewer()}
                            </div>    
                        </div>
                    </div> `;
        return html;
}

function getLevelInterviewer(){
    let html      = "";
    let lastIndex = parseInt(getApplicantInterviewerData.length) - 1;
    getApplicantInterviewerData.map((value,index)=>{
        let row         = value;
        let isDisabled  = sessionID == row.employeeID ? "required" : "disabled";   
        let hasUpdate   = sessionID == row.employeeID ? `<button type="button" class="btn btn-danger px-5 p-2 btnUpdate" givenaction="interview" tableid="${row.applicantInterviewerID}">
                                                            <i class="fas fa-save"></i> Update</button>`:``;
        html += `
                    <div class="card" >
                        <h2 class="text-danger font-weight-bold p-2">${row.applicantInterviewerProgression}</h2>
                        <div class="body">
                            <div class="row clearfix table-row-interview" tableid="${row.applicantInterviewerID}">
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Interviewer</label>   
                                        <input type="text" class="form-control" disabled value="${row.personInCharge}" placeholder="Username">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Status ${row.applicantInterviewerNote ? `` : `<code>*</code>`} </label>                                                
                                        <select class="form-control validate select2 w-100" tabtype="interview"
                                            name="applicationStatus"  ${row.applicantInterviewerNote ? "disabled" : isDisabled}>
                                            ${getApplicationStatusOption(row.applicantInterviewerStatus, lastIndex == index)}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Notes ${row.applicantInterviewerNote ? `` : `<code>*</code>`} </label>                                                
                                        <textarea rows="2" class="form-control no-resize validate" 
                                            tabtype="interview" name="interviewerNote" placeholder="Please type what you want..." 
                                            ${row.applicantInterviewerNote ? "disabled" : isDisabled}>${row.applicantInterviewerNote || ""}</textarea>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="text-right">
                                ${row.applicantInterviewerNote ? "":hasUpdate}
                            </div>
                        </div>
                    </div>
            `;
    });
    return html;
}

function updateApplicantInterviewer(){

}

function getApplicantListFormData(tabType = false, btnEvent = false){
    let formData    = new FormData;
    // let data     = {applicantInterviewerData:[]}
    // name="progression"
    // name="personInCharge"
    // name="dateTime"
    // name="applicationStatus"
    if(tabType == "application"){
        $(`.table-row-${tabType}`).each(function(i){
            let	applicantInterviewerID          =   "";
            let applicantInterviewerProgression =   $(this).find(`[name=progression]`).val()                                || "";	
            let employeeID                      =   $(this).find(`[name=personInCharge]`).val()                             || "";
            let personInCharge                  =   $(this).find(`[name=personInCharge] option:selected`).attr("fullname")  || "";
            let applicantInterviewerDateTime    =   $(this).find(`[name=dateTime]`).val()                                   || "";
            let applicantInterviewerStatus      =   $(this).find(`[name=applicationStatus]`).val()                          || "";
            formData.append(`applicantInterviewerData[${i}][applicantInterviewerID]`, 		        applicantInterviewerID);
            formData.append(`applicantInterviewerData[${i}][applicantID]`, 		                    getApplicantID);
            formData.append(`applicantInterviewerData[${i}][applicantInterviewerProgression]`, 		applicantInterviewerProgression);
            formData.append(`applicantInterviewerData[${i}][employeeID]`, 		                    employeeID);
            formData.append(`applicantInterviewerData[${i}][personInCharge]`, 		                personInCharge);
            formData.append(`applicantInterviewerData[${i}][applicantInterviewerDateTime]`, 		applicantInterviewerDateTime);
            formData.append(`applicantInterviewerData[${i}][applicantInterviewerStatus]`, 		    applicantInterviewerStatus);
            // let temp = {
            //     applicantInterviewerProgression,	
            //     employeeID                      ,
            //     personInCharge                  ,
            //     applicantInterviewerDateTime    ,
            //     applicantInterviewerStatus      ,
            // }
            // data["applicantInterviewerData"].push(temp);
        });
    }else if(tabType){
        let applicantInterviewerID      = btnEvent.attr("tableid");
        let cardBody                    = btnEvent.closest("body");
        let tableRow                    = cardBody.find(`.table-row-${tabType}[tableid=${applicantInterviewerID}]`);
        let applicantInterviewerStatus  = tableRow.find("[name=applicationStatus]").val();
        let interviewerNote             = tableRow.find("[name=interviewerNote]").val();

        formData.append(`applicantInterviewerID`,       applicantInterviewerID);
        formData.append(`applicantInterviewerStatus`, 	applicantInterviewerStatus);
        formData.append(`interviewerNote`, 		        interviewerNote);
            

    }

    return tabType ? formData : tabType;
}

// ----- SWEET ALERT CONFIRMATION -----
const updateConfirmation = ( argData = false, isUpdate = false) => {

    let {
        condition   = "add",                // add|update|cancel
        moduleName  = "Applicant List",     // Title
        msgExt      = "Sample",             // Message Extension,
        thisEvent   = false,                // clickButton
        thisCard    = false,                // card content
        data        = false,                 // REQUIRED TO BE OBJECT
    } = argData;

    let url =   !isUpdate ? `applicant_list/applicantInterviewer` : `applicant_list/updateApplicantInterviewer`;
    let returnCardArray,returnCondition;
    let lowerCase 	      = moduleName.toLowerCase();
    let upperCase	      = moduleName.toUpperCase();
    let capitalCase       = moduleName;
    let title 		      =  "";
    let text 		      =  ""
    let success_title     =  "";
    let swalImg           =  "";
    let buttonIcon        = thisEvent ? thisEvent.find("i") :  "";

    switch(condition) {
        case "add":
            title 					+=  "ADD " + upperCase;
            text 					+=  "Are you sure that you want to add a new "+ lowerCase;
            success_title        	+=  "Add new "+capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/add.svg`;
            break;
        case "update":
            title 					+=  "UPDATE " + upperCase;
            text 					+=  "Are you sure that you want to update the "+ lowerCase;
            success_title        	+=  "Update "+ capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/update.svg`;
            break;
        default:
            title 					+=  "DISCARD CHANGES";
            text 					+=  "Are you sure that you want to cancel this process?"
            success_title        	+=  "Process successfully discarded!";
            swalImg                 +=  `${base_url}assets/modal/cancel.svg`;
        }
        Swal.fire({
            title, 
            text,
            imageUrl: swalImg,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1a1a1a',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                let swalTitle   = success_title.toUpperCase();
                let resultAjax;
                $.ajax({
					method:      "POST",
					url,
					data,
                    processData: false,
					contentType: false,
					global:      false,
					cache:       false,
					async:       false,
					dataType:    "json",
					beforeSend: function() {
                        if(!thisEvent){
                            $("#applicant_details_content").html(preloader);
                        }else{
                            thisEvent.prop("disabled", true);
                            buttonIcon.addClass("zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-lg").removeClass("fas fa-save");
                        }
					},
					success: function(data) {
                        if(data){
                            returnCondition = true;
                            if(!thisEvent){
                                returnCardArray = data;
                            }
                        }else{
                            setTimeout(() => {
                                $("#loader").hide();
                                showNotification("danger", "System error: Please contact the system administrator for assistance!");
                            }, 500);
                        }
					},
					error: function() {
						setTimeout(() => {
							$("#loader").hide();
							showNotification("danger", "System error: Please contact the system administrator for assistance!");
						}, 500);
					}
				}).done(function() {
                    let html;
					if(returnCondition){
                        // if(thisCard == "application"){  
                        //     getApplicantInterviewerData = returnCardArray;
                        //     html = getCardApplication(returnCardArray);
                        // }else{
                        //     html = "";
                        // }

                        if(thisEvent){
                            thisEvent.prop("disabled", false);
                            buttonIcon.removeClass("zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-lg").addClass("fas fa-save");
                        }else{
                            // $("#applicant_details_content").html(html);
                        }
                        $("#tableApplication").find(".no-error").each(function(){
                            $(this).removeClass("no-error");
                        });

                        $("#tableApplication").find(".validated").each(function(){
                            $(this).removeClass("is-valid");
                        });
                        
                        setTimeout(() => {
                            // updateAttr();
                            // initDataTables();
                            // initAll();
                        }, 500);   
                    }  
				});
                Swal.fire({
                    icon:  'success',
                    title: swalTitle,
                    showConfirmButton: false,
                    timer: 2000
                });
                
            } else {
                // preventRefresh(false);
            
            }
        });
}
// ----- END SWEET ALERT CONFIRMATION -----


function getProfileData(applicantID = null){
    let result;

    if(applicantID){
        $.ajax({
            method:  "POST",
            url:     `${base_url}web/applicant/getProfileData`,
            data:	 {applicantID},
            async: false,
            dataType: "json",
            beforeSend: function() {
                // $("#loader").show();
            },

            success: function(data) {
                result = data;
            },

            error: function() {
                setTimeout(() => {
                    // $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
        });
    }
    
    return result;
}	

// ----- GET FORM CODE -----
function getFormCode(str = null, date = null, id = 0) {
	if (str && date) {
		let codeID = id ? id.toString() : "0";
		codeID =
			codeID.length < 5 ? "0".repeat(5 - codeID.length) + codeID : codeID;
		let codeDate = moment(date);
		codeDate = codeDate.isValid()
			? codeDate.format("YY")
			: moment().format("YY");
		return `${str}-${codeDate}-${codeID}`;
	}
	return null;
}
// ----- END GET FORM CODE -----


function capitalizeString(string = false){
    let html = "";
    if(string){
        let thisString = string.toLowerCase();
        html = thisString.charAt(0).toUpperCase() + thisString.slice(1);
    }
    return html;
}

function questionaire(param = false){
    let html = ``
    if(param){
            html += `<div class="col-lg-6 col-md-12 row">
            <div class="col-lg-12 col-md-12">
                <div class="form-group">
                    <label class="font-weight-bold">How Did You Hear About This Position?</label>                                                
                    <div class="border-bottom w-100">Sample text here....</div>
                </div>
                <div class="d-flex justify-content align-items">
                    <div class="form-group pr-1 w-50">
                        <label class="font-weight-bold">Desired start date</label>                                                
                        <div class="border-bottom w-100">Sample text here....</div>
                    </div>
                    <div class="form-group pl-1 w-50">
                        <label class="font-weight-bold">Desired salary</label>                                                
                        <div class="border-bottom w-100 text-right">Sample text here....</div>
                    </div>
                </div>
                <!-- 
                Have you ever been dismissed from any Job?
                Reason/s

                Have you ever been convicted/ involved in any crime?
                Reason/s

                Are you willing to relocate? 

                Can you drive?
                Drivers license No
                Expiration -->
                <div class="other-employment-information">
                    <div class="form-group">
                        <label class="font-weight-bold"><i class="fa fa-check text-success" aria-hidden="true"></i> Have you ever been dismissed from any Job?</label>                                                
                        <div class="border-bottom w-100">Sample text here....</div>
                    </div>

                    <div class="form-group">
                        <label class="font-weight-bold"><i class="fa fa-times text-danger" aria-hidden="true"></i> Have you ever been convicted/ involved in any crime?</label>                                                
                        <div class="border-bottom w-100">Sample text here....</div>
                    </div>

                    <div class="form-group m-0">
                        <label class="font-weight-bold"><i class="fa fa-times text-danger" aria-hidden="true"></i> Are you willing to relocate?</label>
                    </div>

                    <div class="form-group m-0">
                        <label class="font-weight-bold"><i class="fa fa-check text-success" aria-hidden="true"></i> Can you drive?</label>
                    </div>
                    <div class="d-flex justify-content align-items">
                        <div class="form-group pr-1 w-75">
                            <label class="font-weight-bold">Driver’s license No.</label>                                                
                            <div class="border-bottom w-100">Sample text here....</div>
                        </div>
                        <div class="form-group pl-1 w-25">
                            <label class="font-weight-bold">Expiration</label>                                                
                            <div class="border-bottom w-100">Sample text here....</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
    }
    return html;
}




// ----- BADGE STATUS -----
function getStatusStyle(status = "Pending") {
	switch (status) {
		case "Failed":
			return `<span class="badge badge-danger w-100">${status}</span>`;
		case "Cancelled":
			return `<span class="badge badge-dark w-100">${status}</span>`;
		case "Job Order":
			return `<span class="badge badge-outline-success w-100" style="width: 100% !important">${status}</span>`;
		case "Passed":
			return `<span class="badge badge-outline-success w-100" style="width: 100% !important">${status}</span>`;
		case "":
            return  `<span class="badge badge-warning w-100">Pending</span>`;
		default:
            return  `<span class="badge badge-warning w-100">Pending</span>`;
	}
}
// ----- END BADGE STATUS -----


function generateExamURL(data){
    let result;

    if(data){
        $.ajax({
            method:  "POST",
            url:     `${base_url}hris/applicant_list/generateExamUrl`,
            data,
            async: false,
            dataType: "json",
            beforeSend: function() {
                // $("#loader").show();
            },

            success: function(data) {
                // result = data;base_url()."/web/examination_form?id=".
                result = `${base_url}/web/examination_form?id=${data}`;
            },

            error: function() {
                setTimeout(() => {
                    // $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
        });
    }
    
    return result;
}