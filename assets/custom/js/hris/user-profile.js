

$(document).ready(function(){
    var session_id 		   = $(".page-loader-wrapper").attr("session");
    let employeeData = getProfileData(session_id);

    $("#page_content").html(preloader);

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
            employeeBirthday    =  ""
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
                        </ul>`;
        return html;
    }
    
    function detailContent(){
        let html = `
                        <ul class="nav nav-tabs">                                
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tab-basic-information">Basic Information</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-account-information">Account</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-pay-roll">Pay Roll</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-leave-balance">Leave Balance</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-schedule">Schedule</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-documents">Documents</a></li>
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
                            <div class="header">
                                <h2>Basic Information</h2>
                            </div>
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-normal">First Name</label>                                                
                                            <div class="border-bottom w-100">${employeeFirstname}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Middle Name</label>                                              
                                            <div class="border-bottom w-100">${employeeMiddlename||"-"}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12">
                                        <div class="form-group">   
                                            <label class="font-weight-normal">Last Name</label>                                             
                                            <div class="border-bottom w-100">${employeeLastname}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-normal">Birth Date</label>                                                
                                            <div class="border-bottom w-100">${moment(employeeBirthday).format("MMMM DD, YYYY")}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">     
                                            <label class="font-weight-normal">Gender</label>                                                 
                                            <div class="border-bottom w-100">${employeeGender}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Citizenship</label>                                             
                                            <div class="border-bottom w-100">${employeeCitizenship}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Civil Status</label>                                             
                                            <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Unit No.</label>                                             
                                            <div class="border-bottom w-100">${employeeUnit || ""}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Building/House No.</label>                                             
                                            <div class="border-bottom w-100">${employeeBuilding || ""}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Street Name</label>                                             
                                            <div class="border-bottom w-100">${employeeStreet || ""}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Subdivision Name</label>                                             
                                            <div class="border-bottom w-100">${employeeSubdivision || ""}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Barangay</label>                                             
                                            <div class="border-bottom w-100">${employeeBarangay}</div>
                                        </div>
                                    </div>
    
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">City/Municipality</label>                                             
                                            <div class="border-bottom w-100">${employeeCity}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Province</label>                                             
                                            <div class="border-bottom w-100">${employeeProvince}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Region</label>                                             
                                            <div class="border-bottom w-100">${employeeRegion}</div>
                                        </div>
                                    </div>
    
                                    <div class="col-lg-3 col-md-12">
                                        <div class="form-group">  
                                            <label class="font-weight-normal">Zip Code</label>                                             
                                            <div class="border-bottom w-100">${employeeZipCode}</div>
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
            employeePassword
        } = employeeData[0]
    
        let html =  `
                        <div class="tab-pane" id="tab-account-information"> <!-- START DIV OF tab-account-information -->
    
                            <div class="card">
                                <div class="header">
                                    <h2>Account Information</h2>
                                </div>
                                <div class="body">
                                    <div class="row clearfix">
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-normal">Username <code>*</code></label>                                                
                                                <input type="text" 
                                                    class="form-control validate" 
                                                    minlength="5"
                                                    maxlength="75"
                                                    name="employeeUsername" 
                                                    id="employeeUsername"
                                                    value="${employeeUsername}"
                                                    required>
                                                <div class="d-block invalid-feedback" id="invalid-employeeUsername"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">  
                                                <label class="font-weight-normal">Password <code>*</code></label>                                              
                                                <input type="password" 
                                                    class="form-control validate" 
                                                    minlength="5"
                                                    maxlength="75"
                                                    name="employeePassword" 
                                                    id="employeePassword"
                                                    value="${employeePassword}"
                                                    required>
                                                <div class="d-block invalid-feedback" id="invalid-employeePassword"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="form-group">   
                                                <label class="font-weight-normal">Confirm Password <code>*</code></label>                                             
                                                <input type="password" 
                                                    class="form-control validate" 
                                                    minlength="5"
                                                    maxlength="75"
                                                    name="employeeConfirmPassword" 
                                                    id="employeeConfirmPassword"
                                                    value="${employeePassword}"
                                                    required>
                                                <div class="d-block invalid-feedback" id="invalid-employeeConfirmPassword"></div>
                                            </div>
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
            employeePagibig
         } = employeeData[0];
    
         let html = `
                                    <div class="tab-pane" id="tab-pay-roll"> <!-- START DIV OF tab-pay-roll -->
    
                                        <div class="card">
                                            <div class="header">
                                                <h2>Pay Roll Information</h2>
                                            </div>
                                            <div class="body">
                                                <div class="row clearfix">
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">
                                                            <label class="font-weight-normal">Basic Salary</label>                                                
                                                            <div class="border-bottom w-100">${employeeBasicSalary}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">  
                                                            <label class="font-weight-normal">Daily Rate</label>                                              
                                                            <div class="border-bottom w-100">${employeeDailyRate||"-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">Hourly Rate</label>                                             
                                                            <div class="border-bottom w-100">${employeeHourlyRate || "-"}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">Allowance</label>                                             
                                                            <div class="border-bottom w-100">${employeeAllowance}</div>
                                                        </div>
                                                    </div>
    
                                                    <div class="col-lg-6 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">Bank Name</label>                                             
                                                            <div class="border-bottom w-100">${bankName}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">Bank Account</label>                                             
                                                            <div class="border-bottom w-100">${employeeBankAccountNo}</div>
                                                        </div>
                                                    </div>
    
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">
                                                            <label class="font-weight-normal">Tax Identification No.</label>                                                
                                                            <div class="border-bottom w-100">${employeeTIN}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">  
                                                            <label class="font-weight-normal">SSS No.</label>                                              
                                                            <div class="border-bottom w-100">${employeeSSS}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">PhilHealth No.</label>                                             
                                                            <div class="border-bottom w-100">${employeePhilHealth}</div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-12">
                                                        <div class="form-group">   
                                                            <label class="font-weight-normal">Pag-IBIG MID No.</label>                                             
                                                            <div class="border-bottom w-100">${employeePagibig}</div>
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
                                    <td>${value.leaveCredit}</td>
                                    <td>${value.leaveAccumulated}</td>
                                    <td>${totalLeave}</td>
                                </tr>
                            `;
        });
    
        let html = `
                <div class="tab-pane" id="tab-leave-balance"> <!-- START DIV OF tab-leave-balance -->
                    <div class="card">
                        <div class="header">
                            <h2>Leave</h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <div class="col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-normal">Job Level</label>                                                
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
                                <td>${ tableData[0][`${day.toLowerCase()}From`]? scheduleTime : "-"}</td>
                            </tr> 
                        `;
        });
    
        let html = `
                <div class="tab-pane" id="tab-schedule"> <!-- START DIV OF tab-schedule -->
    
                    <div class="card">
                        <div class="header">
                            <h2>Schedule</h2>
                        </div>
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
       let tableDataRow = "";
       tableData.map((value, index)=>{
            tableDataRow += `
                                <div class="col-lg-4 col-md-12">
                                    <div class="form-group">
                                        <label class="font-weight-normal">${value.documentType}</label>                                                
                                        <div class="border-bottom w-100"><a href="${base_url}assets/upload-files/documents/${value.filename}" download target="_blank" title="${value.filename}">${value.filename}</a></div>
                                    </div>
                                </div>
                            `;
       });  
        let html = `
                    <div class="tab-pane" id="tab-documents"> <!-- START DIV OF tab-documents -->
    
                        <div class="card">
                            <div class="header">
                                <h2>Documents</h2>
                            </div>
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


