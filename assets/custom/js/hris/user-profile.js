

$(document).ready(function(){
    var session_id 		   = $(".page-loader-wrapper").attr("session");
    let employeeData = getProfileData(session_id);

    $("#page_content").html(preloader);

    // ----- TOGGLE PASSWORD -----
    $(document).on("click", ".btnTogglePassword", function() {
        const show = $(this).children().first().hasClass("fas fa-eye");
        if (show) {
            $(this).children().first().removeClass("fas fa-eye").addClass("fas fa-eye-slash");
            $(this).closest(".input-group").find("[type=password]").first().attr("type", "text");
        } else {
            $(this).children().first().removeClass("fas fa-eye-slash").addClass("fas fa-eye");
            $(this).closest(".input-group").find("[type=text]").first().attr("type", "password");
        }
    })
    // ----- END TOGGLE PASSWORD -----

    $(document).on("click",".btnUpdate", function(){
        let givenAction = $(this).attr("givenaction");
        let fullname    = $(this).attr("fullname");
        let password    = $("#employeePassword").val();
        let coPassword  = $("#employeeConfirmPassword").val();
        if(givenAction == "account"){
            if(password == coPassword){
                let data = getFormData("accountCredentials", true);
                data["tableData"]["updatedBy"]   =  sessionID;
                data["whereFilter"]              =  "employeeID="+sessionID;
                data["tableName"]                =  "hris_employee_list_tbl";
                data["feedback"]                 =  fullname;
                delete data["tableData"]["employeeConfirmPassword"] ;
                console.log(data);
                sweetAlertConfirmation("update", "Account",null, null , data, true, refreshPage);
            }else{
                showNotification("warning2", "Your Password does not match!");
            }
        }
    });


    function refreshPage(){

    }


    let html = pageContent();
    setTimeout(() => {
        $("#page_content").html(html);
    }, 800);

    function getProfileData(id, param = "basicInfo"){
        let data;
        switch (param) {
            case "leave":
               data =  getTableData(`hris_leave_tbl as hlt  LEFT JOIN hris_employee_leave_tbl as helt USING(leaveID)`,
                             `leaveName, helt.*`,
                             `employeeID = '${id}'`);
                break;
            case "schedule":
                data =     getTableData(`hris_schedule_setup_tbl`,``,`scheduleID = '${id}'`);
                break;
            case "document":
                data =     getTableData(`hris_employee_documents_tbl`,``,`employeeID = '${id}'`);
                break;
            default:
                data = getTableData(`hris_employee_list_tbl as helt 
                                        LEFT JOIN hris_department_tbl as hdt USING(departmentID) 
                                        LEFT JOIN hris_designation_tbl AS hdest ON helt.designationID = hdest.designationID
                                        LEFT JOIN fms_bank_tbl AS fbt ON helt.bankID = fbt.bankID`,
                `helt.*, departmentName, designationName, bankName`,
                `helt.employeeID = '${id}'`
            );
                break;
        }
    
        return data;
    }
    
    function pageContent(){
        let html    =   `
                        <div class="row clearfix mx-0">
                            <div class="col-lg-3 col-md-12">
                                    <div class="card" id="employee_details_summary">
                                        ${detailsSummary()}
                                    </div>                  
                            </div>
                            <div class="col-lg-9 col-md-12">
                                <div class="card" id="employee_details_content">
                                    <div class="body">
                                        ${detailContent()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
        return html;
    }
    
    function detailsSummary(){
        let {
            employeeFirstname   = "",
            employeeMiddlename  = "",
            employeeLastname    = "",
            employeeProfile     =  "",
            departmentName      =  "",
            designationName     =  "",
            employeeHiredDate   =  "",
            employeeMobile      =  "",
            employeeBirthday    =  "",
            employeeSignature   =  ""
        } = employeeData[0];
    
        let html = `    <div class="profile-image mb-0 text-center"> 
                            <img class="img-fluid rounded p-0 mt-3" src="${base_url}assets/upload-files/profile-images/${employeeProfile}" alt=""> 
                        </div>
                        
                        <div class="body">
                            <h5 class="card-title m-0">${employeeLastname}, ${employeeFirstname} ${employeeMiddlename}</h5>
                            <span><label>Department: </label>${departmentName}</span><br>
                            <span><label>Designation: </label>${designationName}</span><br>
                            
                        </div>
    
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <small class="text-muted">Hired Date:</small>
                                <p class="mb-0">${moment(employeeHiredDate).format(`MMMM DD, YYYY`)}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Mobile:</small>
                                <p class="mb-0">${employeeMobile}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Email:</small>
                                <p class="mb-0">sample.email@gmail.com</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Birthdate:</small>
                                <p class="mb-0">${moment(employeeBirthday).format(`MMMM DD, YYYY`)}</p>
                            </li>
                            <li class="list-group-item">
                                <small class="text-muted">Signature:</small>
                                <p class="mb-0">${employeeSignature ? `<a href="${base_url}assets/upload-files/signatures/${employeeSignature}" target="_blank" title="${employeeSignature}">${employeeSignature}</a>` 
                                                :  "-"}</p>
                            </li>
                        </ul>`;
        return html;
    }
    
    function detailContent(){
        let html = `
                        <ul class="nav nav-tabs">                                
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tab-basic-information">Basic Information</a></li>
                            <li class="nav-item"><a class="nav-link px-5" data-toggle="tab" href="#tab-account-information">Account</a></li>
                            <li class="nav-item"><a class="nav-link px-5" data-toggle="tab" href="#tab-pay-roll">Pay Roll</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-leave-balance">Leave Balance</a></li>
                            <li class="nav-item"><a class="nav-link px-5" data-toggle="tab" href="#tab-schedule">Schedule</a></li>
                            <li class="nav-item"><a class="nav-link px-5" data-toggle="tab" href="#tab-documents">Documents</a></li>
                        </ul> 
                        <div class="tab-content mt-3">
                            ${basiInformation()}
                            ${accountInformation()}
                            ${payRollInformation()}
                            ${leaveBalanceInformation()}
                            ${scheduleInformation()}
                            ${documentInformation()}
                        </div>
                `;
    
        return html;
    }
    
    function basiInformation(){
        let {
            employeeFirstname,
            employeeMiddlename,
            employeeLastname,
            employeeBirthday,
            employeeGender,
            employeeCitizenship,
            employeeCivilStatus,
            employeeUnit,
            employeeBuilding,
            employeeStreet,
            employeeSubdivision,
            employeeBarangay,
            employeeCity,
            employeeProvince,
            employeeRegion,
            employeeCountry,
            employeeZipCode,
    
        } = employeeData[0]
        let html = `<div class="tab-pane active" id="tab-basic-information"> <!-- START DIV OF tab-basic-information -->
    
                        <div class="card">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">First Name</label>                                                
                                            <div class="border-bottom w-100" id="firstname">${employeeFirstname}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Middle Name</label>                                              
                                            <div class="border-bottom w-100" id="middlename">${employeeMiddlename||"-"}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">   
                                            <label class="font-weight-bold">Last Name</label>                                             
                                            <div class="border-bottom w-100" id="lastname">${employeeLastname}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Birth Date</label>                                                
                                            <div class="border-bottom w-100">${moment(employeeBirthday).format("MMMM DD, YYYY")}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">     
                                            <label class="font-weight-bold">Gender</label>                                                 
                                            <div class="border-bottom w-100">${employeeGender}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Citizenship</label>                                             
                                            <div class="border-bottom w-100">${employeeCitizenship}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Civil Status</label>                                             
                                            <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Unit No.</label>                                             
                                            <div class="border-bottom w-100">${employeeUnit || "-"}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Building/House No.</label>                                             
                                            <div class="border-bottom w-100">${employeeBuilding != "null" ? (employeeBuilding || "-") : "-"}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Street Name</label>                                             
                                            <div class="border-bottom w-100">${employeeStreet != "null" ? (employeeStreet || "") : "-"}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Subdivision Name</label>                                             
                                            <div class="border-bottom w-100">${employeeSubdivision != "null" ?  (employeeSubdivision || "-") : "-"}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Barangay</label>                                             
                                            <div class="border-bottom w-100">${capitalizeString(employeeBarangay)}</div>
                                        </div>
                                    </div>
    
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">City/Municipality</label>                                             
                                            <div class="border-bottom w-100">${capitalizeString(employeeCity)}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Province</label>                                             
                                            <div class="border-bottom w-100">${capitalizeString(employeeProvince)}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Region</label>                                             
                                            <div class="border-bottom w-100">${capitalizeString(employeeRegion)}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-bold">Zip Code</label>                                             
                                            <div class="border-bottom w-100">${employeeZipCode != "null" ? (employeeZipCode || "-") : "-"}</div>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
    
                    </div>  <!-- END DIV OF tab-basic-information -->`;
        return html;
    }
    
    function accountInformation(){
        let {
            employeeUsername,
            employeePassword,
            employeeFirstname,
            employeeMiddlename,
            employeeLastname,
        } = employeeData[0]
    
        let html =  `
                        <div class="tab-pane" id="tab-account-information"> <!-- START DIV OF tab-account-information -->
    
                            <div class="card">
                                <div class="body" id="accountCredentials">
                                    <div class="row clearfix">
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Username <code>*</code></label>
                                                <div class="input-group">
                                                    <div class="input-group-prepend bg-transparent">
                                                    <span class="input-group-text bg-transparent border-right-0">
                                                        <i class="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text"
                                                        class="form-control validate"
                                                        name="employeeUsername"
                                                        id="employeeUsername"
                                                        data-allowcharacters="[a-z][A-Z][0-9][_][@]['][/] [()][.][ ]"
                                                        minlength="2"
                                                        maxlength="75"
                                                        required
                                                        title="Username"
                                                        value="${employeeUsername}">
                                                </div>
                                                <div class="invalid-feedback d-block" id="invalid-employeeUsername"></div>

                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">  
                                                <label class="font-weight-bold">Password <code>*</code></label>                                              
                                                <div class="input-group">
                                                    <div class="input-group-prepend bg-transparent">
                                                    <span class="input-group-text bg-transparent border-right-0">
                                                        <i class="fas fa-lock"></i></span>
                                                    </div>
                                                    <input type="password"
                                                        class="form-control validate"
                                                        name="employeePassword" 	
                                                        id="employeePassword"
                                                        data-allowcharacters="[a-z][A-Z][0-9][_][@]['][/] [()][.][ ]"
                                                        minlength="2"
                                                        maxlength="75"
                                                        required
                                                        value="${employeePassword}">
                                                    <div class="input-group-prepend bg-transparent">
                                                        <span class="input-group-text bg-transparent border-left-0">
                                                            <a href="javascript: void(0)" class="btnTogglePassword" show="false" tabindex="-1"><i class="text-primary fas fa-eye"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="invalid-feedback d-block" id="invalid-employeePassword"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">   
                                                <label class="font-weight-bold">Confirm Password <code>*</code></label>                                             
                                                <div class="input-group">
                                                    <div class="input-group-prepend bg-transparent">
                                                    <span class="input-group-text bg-transparent border-right-0">
                                                        <i class="fas fa-lock"></i></span>
                                                    </div>
                                                    <input type="password"
                                                        class="form-control validate"
                                                        name="employeeConfirmPassword" 	
                                                        id="employeeConfirmPassword"
                                                        data-allowcharacters="[a-z][A-Z][0-9][_][@]['][/] [()][.][ ]"
                                                        minlength="2"
                                                        maxlength="75"
                                                        required
                                                        value="${employeePassword}">
                                                    <div class="input-group-prepend bg-transparent">
                                                        <span class="input-group-text bg-transparent border-left-0">
                                                            <a href="javascript: void(0)" class="btnTogglePassword" show="false" tabindex="-1"><i class="text-primary fas fa-eye"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="invalid-feedback d-block" id="invalid-employeeConfirmPassword"></div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 d-flex justify-content-end py-4">
                                            <button type="button" class="btn btn-danger px-5 p-2 btnUpdate" fullname="${employeeFirstname} ${employeeLastname}" givenaction="account"><i class="fas fa-save"></i> Update</button>
                                        </div>

                                    </div>  
                                </div>
                            </div>
    
                        </div>  <!-- END DIV OF tab-account-information -->
                    `;
        return html;
    }
    
    function payRollInformation(){
        let {
            employeeBasicSalary,
            employeeDailyRate,
            employeeHourlyRate,
            employeeAllowance,
            bankName,
            employeeBankAccountNo,
            employeeTIN,
            employeeSSS,
            employeePhilHealth,
            employeePagibig,
            employeeBankAccountName
         } = employeeData[0];
    
         let html = `
                                    <div class="tab-pane" id="tab-pay-roll"> <!-- START DIV OF tab-pay-roll -->
    
                                        <div class="card">
                                            <div class="body">
                                                <div class="row clearfix">
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">
                                                            <label class="font-weight-bold">Basic Salary</label>                                                
                                                            <div class="border-bottom w-100 text-right">${formatAmount(employeeBasicSalary, true)}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">  
                                                            <label class="font-weight-bold">Daily Rate</label>                                              
                                                            <div class="border-bottom w-100 text-right">${formatAmount(employeeDailyRate || "0.00", true)}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Hourly Rate</label>                                             
                                                            <div class="border-bottom w-100 text-right">${formatAmount(employeeHourlyRate || "0.00", true)}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Allowance</label>                                             
                                                            <div class="border-bottom w-100 text-right">${formatAmount(employeeAllowance || "0.00", true)}</div>
                                                        </div>
                                                    </div>
    
                                                    <div class="col-lg-4 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Bank Name</label>                                             
                                                            <div class="border-bottom w-100">${bankName}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Account Name</label>                                             
                                                            <div class="border-bottom w-100">${employeeBankAccountName|| "-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Bank Account No.</label>                                             
                                                            <div class="border-bottom w-100">${employeeBankAccountNo || "-"}</div>
                                                        </div>
                                                    </div>
    
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">
                                                            <label class="font-weight-bold">Tax Identification No.</label>                                                
                                                            <div class="border-bottom w-100">${employeeTIN || "-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">  
                                                            <label class="font-weight-bold">SSS No.</label>                                              
                                                            <div class="border-bottom w-100">${employeeSSS || "-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">PhilHealth No.</label>                                             
                                                            <div class="border-bottom w-100">${employeePhilHealth || "-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-bold">Pag-IBIG MID No.</label>                                             
                                                            <div class="border-bottom w-100">${employeePagibig || "-"}</div>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
    
                                    </div>  <!-- END DIV OF tab-pay-roll -->
                    `;
         return html;
    }
    
    function leaveBalanceInformation(){
        let employeeRanking = employeeData[0].employeeRanking;
        let tableData       = getProfileData(session_id, "leave");
        let tableDataRow    = "";
        
        tableData.map((value, index) =>{
            let totalLeave  =   parseFloat(value.leaveCredit) + parseFloat(value.leaveAccumulated);
            tableDataRow += `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${value.leaveName}</td>
                                    <td>${value.leaveAccumulated}</td>
                                    <td>${value.leaveCredit}</td>
                                    <td>${totalLeave}</td>
                                </tr>
                            `;
        });
    
        let html = `
                <div class="tab-pane" id="tab-leave-balance"> <!-- START DIV OF tab-leave-balance -->
                    <div class="card">
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">Job Level</label>                                                
                                        <div class="border-bottom w-100">${employeeRanking}</div>
                                    </div>
                                </div>
                            </div>
    
                            <table class="table table-striped table-bordered" id="tableLeaveBalance">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Leave Type</th>
                                        <th>Accumulated</th>
                                        <th>Leave Count</th>
                                        <th>Total Leave</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableDataRow}
                                </tbody>
                            </table> 
                        </div>
                    </div>
    
                </div>  <!-- END DIV OF tab-leave-balance -->
        
        `;
    
        return html;
    }
    
    function scheduleInformation(){
        let scheduleID      = employeeData[0].scheduleID;
        let tableData       = getProfileData(scheduleID, "schedule");
        let tableDataRow    = "";
        let daysArray       = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        daysArray.map((day, index)=>{
            let scheduleTime    = tableData[0][`${day.toLowerCase()}From`]+" - "+tableData[0][`${day.toLowerCase()}To`];
            tableDataRow += `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${day}</td>
                                <td>${ tableData[0][`${day.toLowerCase()}Status`] == "1" ? scheduleTime : "-"}</td>
                            </tr> 
                        `;
        });
    
        let html = `
                <div class="tab-pane" id="tab-schedule"> <!-- START DIV OF tab-schedule -->
    
                    <div class="card">
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered" id="tableSchedule">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Day</th>
                                            <th>Time-in and Time-out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${tableDataRow}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>  <!-- END DIV OF tab-schedule -->`;
        return html;
    }
    
    function documentInformation(){
       let tableData    = getProfileData(session_id, "document");
       let tableDataRow = tableData.length < 1 ?  `
                                                        <div class="col-lg-4 col-md-0"></div>
                                                        <div class="col-lg-4 col-md-12">
                                                            <img class="img-fluid rounded p-0 mt-3" src="${base_url}assets/modal/no-data.gif" alt=""> 
                                                        </div>    
                                                        <div class="col-lg-4 col-md-0"></div>
                                                    ` : ``;
       tableData.map((value, index)=>{
            tableDataRow += `
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-bold">${value.documentType}</label>                                                
                                        <div class="border-bottom w-100"><a href="${base_url}assets/upload-files/documents/${value.filename}" target="_blank" title="${value.filename}">${value.filename}</a></div>
                                    </div>
                                </div>
                            `;
       });  
        let html = `
                    <div class="tab-pane" id="tab-documents"> <!-- START DIV OF tab-documents -->
    
                        <div class="card">
                            <div class="body">
                                <div class="row clearfix">
                                    ${tableDataRow}
                                </div>  
                            </div>
                        </div>
    
                    </div>  <!-- END DIV OF tab-documents --> `;
        return html;
    }

});


function capitalizeString(string = false){
    let html = "";
    if(string){
        let thisString = string.toLowerCase();
        html = thisString.charAt(0).toUpperCase() + thisString.slice(1);
    }
    return html;
}
