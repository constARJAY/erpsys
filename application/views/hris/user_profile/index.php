<style>
.cross-css{
    background-color: red;
    border-radius: 2px;
    padding-left: 1px;
    padding-right: 1px;
}
</style>
<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<!-- <li class="breadcrumb-item"><i class="fas fa-users-cog"></i>&nbsp;Recruitment Modules</li> -->
                        <li class="breadcrumb-item active">User Profile</li>
                    </ul>
                    <h1 class="mt-3">User Profile</h1>
                    <span>This module is used to manage user profile.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton"></div>
            </div>
            <div class="div-employee-nav">
                
            </div>

        </div>
    </div>

    <div class="container" id="page_content">
		<div class="row clearfix mx-1">
            <div class="col-lg-3 col-md-12">
                <div class="card" id="employee_details_summary">
                    <div class="profile-image mb-0 text-center"> 
                        <img class="img-fluid rounded p-0 mt-3" src="<?=base_url()?>/assets/images/profile-images/default.jpg" alt=""> 
                    </div>
                    
                    <div class="body">
                        <h5 class="card-title m-0">Sample Name, First Name Middle Name</h5>
                        <span><label>Department: </label>Opearation</span><br>
                        <span><label>Designation: </label>Sample Designation</span><br>
                        <span><a href="<?=base_url()?>assets/upload-files/resumes/charles.verdadero@theblackcoders.com_resume.docx" download title="">Download Resume</a></span>
                    </div>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <small class="text-muted">Hired Date:</small>
                            <p class="mb-0">The date Hired</p>
                        </li>
                        <li class="list-group-item">
                            <small class="text-muted">Mobile:</small>
                            <p class="mb-0">0698-654-1236</p>
                        </li>
                        <li class="list-group-item">
                            <small class="text-muted">Email:</small>
                            <p class="mb-0">sample.email@gmail.com</p>
                        </li>
                        <li class="list-group-item">
                            <small class="text-muted">Birthdate:</small>
                            <p class="mb-0">Wala akong Birthdate</p>
                        </li>
                    </ul>
                </div>                  
            </div>
            <div class="col-lg-9 col-md-12">
                <div class="card" id="employee_details_content">
                        <div class="body">
                            <ul class="nav nav-tabs">                                
                                <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#tab-basic-information">Basic Information</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-account-information">Account</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-pay-roll">Pay Roll</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-leave-balance">Leave Balance</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-schedule">Schedule</a></li>
                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#tab-documents">Documents</a></li>
                            </ul>                        
                            <div class="tab-content mt-3">
                                <div class="tab-pane active" id="tab-basic-information"> <!-- START DIV OF tab-basic-information -->

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
                                                        <div class="border-bottom w-100">${employeeBirthday}</div>
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
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Building/House No.</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Street Name</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Subdivision Name</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Barangay</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>


                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">City/Municipality</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Province</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Region</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Zip Code</label>                                             
                                                        <div class="border-bottom w-100">${employeeCivilStatus}</div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-basic-information -->

                                <div class="tab-pane" id="tab-account-information"> <!-- START DIV OF tab-account-information -->

                                    <div class="card">
                                        <div class="header">
                                            <h2>Account Information</h2>
                                        </div>
                                        <div class="body">
                                            <div class="row clearfix">
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">
                                                        <label class="font-weight-normal">Userame</label>                                                
                                                        <div class="border-bottom w-100">${employeeFirstname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Password</label>                                              
                                                        <div class="border-bottom w-100">${employeeMiddlename||"-"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Confirm Password</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-account-information -->

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
                                                        <div class="border-bottom w-100">${employeeFirstname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Daily Rate</label>                                              
                                                        <div class="border-bottom w-100">${employeeMiddlename||"-"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Hourly Rate</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Allowance</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Bank Name</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Bank Account</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">
                                                        <label class="font-weight-normal">Tax Identification No.</label>                                                
                                                        <div class="border-bottom w-100">${employeeFirstname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">SSS No.</label>                                              
                                                        <div class="border-bottom w-100">${employeeMiddlename||"-"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">PhilHealth No.</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Pag-IBIG MID No.</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-pay-roll -->

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
                                                        <div class="border-bottom w-100">${employeeFirstname}</div>
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
                                                    ${leaveBalance()}
                                                </tbody>
                                            </table> 
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-leave-balance -->

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
                                                        ${scheduleData}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-schedule -->

                                <div class="tab-pane" id="tab-documents"> <!-- START DIV OF tab-documents -->

                                    <div class="card">
                                        <div class="header">
                                            <h2>Documents</h2>
                                        </div>
                                        <div class="body">
                                            <div class="row clearfix">
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">
                                                        <label class="font-weight-normal">Contract and Appraisal</label>                                                
                                                        <div class="border-bottom w-100">${employeeFirstname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">  
                                                        <label class="font-weight-normal">Personnel Memoranda</label>                                              
                                                        <div class="border-bottom w-100">${employeeMiddlename||"-"}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Training and Development</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-12">
                                                    <div class="form-group">   
                                                        <label class="font-weight-normal">Others</label>                                             
                                                        <div class="border-bottom w-100">${employeeLastname}</div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>

                                </div>  <!-- END DIV OF tab-documents -->

                            </div>
                        </div>
                </div>
            </div>
        </div>
	</div>


    
</div>

<script src="<?= base_url('assets/custom/js/hris/user-profile.js') ?>"></script>
