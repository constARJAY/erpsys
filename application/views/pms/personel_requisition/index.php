<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Employee Forms</li>
                        <li class="breadcrumb-item active">Personnel Requisition</li>
                    </ul>
                    <h1 class="mt-3">Personnel Requisition</h1>
                    <span>This module is used to manage personnel requisition form details.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
				<button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab" href="#addPR"><i class="icon-plus"></i> &nbsp;Add Personnel Requisition</button></div>
            </div>
            <div class="bh_divider appendHeader"></div>
            <div class="row clearfix appendHeader">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval</a></li>
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Forms</a></li>
                    </ul>
                </div>
            </div>
           
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="tab-content mt-3">
                    <div role="tabpanel" class="tab-pane" id="forApprovalTab">                   
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Document No.</th>
                                            <th>Employee Name</th>
                                            <th>Requested Designation</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>                
                    <div role="tabpanel" class="tab-pane in active" id="myFormsTab"> 
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Document No.</th>
                                            <th>Employee Name</th>
                                            <th>Requested Designation</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="addPR"> 
                        <div class="card-body">
                            <div class="row px-2">
                                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                                            <h6 class="mt-0 text-danger font-weight-bold">
                                            PCR-2021-00001
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Status</small>
                                            <h6 class="mt-0 font-weight-bold">
                                                <span class="badge badge-info w-100">Approved</span>
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                                    <div class="row m-0">
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Created</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Remarks</small>
                                            <h6 class="mt-0 font-weight-bold">
                                                ---
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Department</label>
                                        <!-- <input type="text" class="form-control" disabled value=""> -->
                                        <select class="form-control validate select2"
                                            name="department"
                                            id="input_department"
                                            style="width: 100%"
                                            required
                                            ${disabled}>
                                            <option selected disabled>Select Department</option>             
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="col-md-3 col-sm-12">
                                    <div class="form-group">
                                        <label>Chart of Account</label>
                                        <select class="form-control validate select2"
                                            name="chartOfAccount"
                                            id="input_chartOfAccount"
                                            style="width: 100%"
                                            required
                                            ${disabled}>
                                            <option selected disabled>Select Chart of Account</option>             
                                        </select>
                                    </div>
                                </div> -->
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Position</label>
                                        <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Requesting Department</label>
                                        <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Salary Package</label>
                                        <!-- <input type="text" class="form-control" disabled value=""> -->
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">₱</span>
                                            </div>
                                            <input type="text" class="form-control salaryPackage" min="0.1" max="999999" minlength="1" maxlength="20" name="salaryPackage" id="salaryPackage0" value="0" project="true" style="text-align: right;">
                                        </div>
                                        <div class="invalid-feedback d-block" id="invalid-salaryPackage"></div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Reporting To</label>
                                        <input type="text" class="form-control" value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Date Needed</label>
                                        <input type="button" 
                                            class="form-control validate daterange text-left"
                                            required
                                            id="dateNeeded"
                                            name="dateNeeded"
                                            value=""
                                            ${disabled}
                                            title="Date">
                                        <div class="d-block invalid-feedback" id="invalid-dateNeeded"></div>
                                    </div>
                                </div>
                            </div>    
                            <hr class="pb-1">
                                <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Nature of Request</div>
                                <div class="row mt-2">
                                    <div class="col-md-4 col-sm-12 mb-3">                            
                                        <label class="c_checkbox">
                                            <input type="checkbox" name="checkbox1" id="checkbox1" value="option1" checked="">
                                            <span class="checkmark"></span>
                                            <span class="ml-3">Permanent</span>
                                        </label>
                                        <ul style="list-style-type:none!important">
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio1" id="radio1" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">Approved Vacant Position According to Plantilla</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio2" id="radio2" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">Additional Manpower due to Increased volume of works</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio3" id="radio3" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">New Position due to Added Functions/Work Expansion</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio4" id="radio4" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">Replacement of</span>
                                                </label>
                                                <ul style="list-style-type:none!important">
                                                    <li>
                                                        <input type="text" class="form-control" value="">
                                                    </li>
                                                </ul> 
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4 col-sm-12 mb-3">   
                                        <label class="c_checkbox">
                                            <input type="checkbox" name="checkbox2" id="checkbox2" value="option2">
                                            <span class="checkmark"></span>
                                            <span class="ml-3">Non-Permanent</span>
                                        </label>
                                        <ul style="list-style-type:none!important">
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio5" id="radio5" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">Project Based</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label class="c_radio mt-2 mb-2">
                                                    <input type="radio" name="radio6" id="radio6" value="option1">
                                                    <span class="checkmark"></span>
                                                    <span class="ml-2">On the Job Training</span>
                                                </label>
                                                <ul style="list-style-type:none!important">
                                                    <li>
                                                        <label for="">Duration:</label>
                                                        <input type="text" class="form-control" value="">
                                                    </li>
                                                </ul>   
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-md-4 col-sm-12 mb-3">
                                        <label class="c_checkbox">
                                            <input type="checkbox" name="checkbox3" id="checkbox3" value="option3">
                                            <span class="checkmark"></span>
                                            <span class="ml-3">Other Justifications</span>
                                        </label>
                                        <ul style="list-style-type:none!important">
                                            <li>
                                                <input type="text" class="form-control mt-2 mb-2" value="">
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Qualifications Required</div>
                                    <textarea rows="5" style="resize: none" class="form-control" name="remarks" id="remarks0"></textarea>
                                <div class="text-primary font-weight-bold mt-2 mb-2" style="font-size: 1.5rem;">Brief Statement of Duties</div>
                                    <textarea rows="5" style="resize: none" class="form-control" name="remarks" id="remarks0"></textarea>
                            </div>
                            <div class="col-md-12 text-right mt-3 mb-3 addReq">
                                <button class="btn btn-submit px-5 p-2" id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
                                </button>
                                <button class="btn btn-cancel px-5 p-2" id="btnCancel"><i class="fas fa-ban"></i> 
                                    Cancel
                                </button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>

            
        </div>
	</div>
</div>
    

    
</div>


<!-- ----- MODAL ----- -->
<div id="modal_petty_cash_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">ADD PETTY CASH REQUEST</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_petty_cash_request_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<!-- <script src="<?= base_url('assets/custom/js/fms/petty-cash-request.js') ?>"></script> -->
<script>
    $(document).ready(function () {
        $("#addRequest").show();
        $("#pcrDetails").show();
        $(".addReq").show();

        $(document).on("click", "#btnAdd", function () {
            $("#addRequest").show();
            $("#pcrDetails").show();
            $(".addReq").show();
            $("#pcrDatatable").hide();
        });


	});
</script>