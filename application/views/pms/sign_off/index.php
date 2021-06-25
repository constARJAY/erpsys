<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Sign-Off</li>
                    </ul>
                    <h1 class="mt-3">List of Sign-Off Forms</h1>
                    <span>This module is used to manage the submission and approval of sign-off forms for project phases that are already done.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton"></div>
            </div>
        </div>
    </div>

    <!-- <div class="container">
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
                                            <th>Prepared By</th>
                                            <th>Project Name</th>
                                            <th>Project Category</th>
                                            <th>Client</th>
                                            <th>Project Phase</th>
                                            <th>Current Approver</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
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
                                            <th>Prepared By</th>
                                            <th>Project Name</th>
                                            <th>Project Category</th>
                                            <th>Client</th>
                                            <th>Project Phase</th>
                                            <th>Current Approver</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
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
                                            <small class="text-small text-muted font-weight-bold">Sign Off No.</small>
                                            <h6 class="mt-0 text-danger font-weight-bold">
                                            SOF-21-00001
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
                                        <label>Employee Name <code>*</code></label>
                                            <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Department <code>*</code></label>
                                            <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Position</label>
                                        <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Reason <code>*</code></label>
                                        <textarea class="form-control validate"
                                            data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                                            minlength="1"
                                            maxlength="200"
                                            id="signoffReason"
                                            name="signoffReason"
                                            required
                                            rows="4"
                                            style="resize:none;"></textarea>
                                        <div class="d-block invalid-feedback" id="invalid-signoffReason"></div>
                                    </div>
                                </div>
                            </div>
                            <hr class="pb-1">

                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Client Name <code>*</code></label>
                                        <select class="form-control select2 validate"
                                            name="clientName"
                                            id="clientName"
                                            required>
                                            <option selected disabled>Select Client Name</option>
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-clientName"></div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Project Code <code>*</code></label>
                                            <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="form-group">
                                        <label>Project Name</label>
                                        <select class="form-control select2 validate"
                                            name="projectName"
                                            id="input_projectName"
                                            required>
                                            <option selected disabled>Select Project Name</option>
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-projectName"></div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Project Phase</label>
                                        <input type="text" class="form-control" disabled value="">  
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                            </div>  
                            <table class="table table-striped table-hover" id="tableForApprroval" role="grid">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th class="text-center" width="50">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxall" project="true">
                                            </div>
                                        </th>
                                        <th>Deliverables</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                                            </div>
                                        </td>
                                        <td><input type="text" class="form-control" data-allowcharacters="[A-Z][ ]"  value=""></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="w-100 d-flex justify-content-between align-items-center py-2 addReq">
                                <div class="w-100 text-left my-2 addReq">
                                        <button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
                                        <button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="padding-left:15px;padding-right:15px;">
                                <div class="col-md-12 col-sm-12">
                                    <h5>Notes / Comments from the User:</h5>
                                    <textarea rows="5" style="resize: none" class="form-control" name="purpose" id="input_Purpose" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"></textarea>
                                </div>
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
	</div> -->
    
    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body" id="page_content"></div>
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
<script src="<?= base_url('assets/custom/js/pms/sign-off.js') ?>"></script>