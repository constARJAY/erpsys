<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp; Inventory Modules</li>
						<li class="breadcrumb-item active"  id="inv_mainItem_breadcrumbs"> Return Item List</li>
                        <li class="breadcrumb-item" id="inv_disposal_breadcrumbs" style="visibility:hidden;"> Create New Form</li>
					</ul>
					<h1 class="mt-3" id="inv_headerID">List of Return Item Forms</h1>
					<span>This module is used to manage return form details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<!-- <button class="btn btn-default hidden-xs ml-2">Download Report</button>
                        <button class="btn btn-secondary hidden-xs ml-2">New Report</button> -->
                        <!-- <button type="button" class="btn btn-danger pr-2" id="btnAdd"> <i class="icon-plus" id="btnIcon"></i> &nbsp;Add Item</button> -->
                        <button type="button" class="btn btn-danger pr-2" id="btnAdd"><i class="fas fa-plus-square"></i> Create New Form</button>
                        <!-- <button type="button" class="btn btn-light pr-2" id="btnCancel"> <i class="icon-ban"></i> &nbsp;Cancel</button> -->
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

	<div class="container" id="container_1"> <!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck" id="container1">
							<div class="col-12">
								<div class="table-responsive" id="table_content"></div>
							</div>
						</div>



					</div>

				</div>
			</div>
		</div>
	</div>

    <div class="container" id="container_2" > 
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="col-12 mt-4">

                        <div class="row clearfix row-deck">
                            <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                                <div class="card" style="height:80px">
                                    <div class="body">
                                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                                        <h5 class="m-t-0 text-danger font-weight-bold">ADF-21-00001</h5>                
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                                <div class="card" style="height:80px">
                                    <div class="body">
                                        <small class="text-small text-muted font-weight-bold">Date</small>
                                        <h5 class="m-t-0 font-weight-bold">March 15, 2021</h5>                
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                                <div class="card" style="height:80px">
                                    <div class="body">
                                        <small class="text-small text-muted font-weight-bold">Status</small>
                                        <h5 class="m-t-0 font-weight-bold">Draft</h5>                
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                                <div class="card" style="height:80px">
                                    <div class="body">
                                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                                        <br>
                                        <small class="text-small font-weight-bold">Lorem ipsum dolor emet.</small>                                               
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-4">
                        <div class="row">
                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div class="form-group" style="height: 80px">
                                    <small class="text-small text-muted font-weight-bold">Requestor's Name <span class="text-danger font-weight-bold">*</span></small>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="requestorName" 
                                        id="input_requestorName" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="20" 
                                        required 
                                        value=""
                                        autocomplete="off">
                                    <div class="invalid-feedback d-block" id="invalid-input_requestorName"></div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <small class="text-small text-muted font-weight-bold">Department <span class="text-danger font-weight-bold">*</span></small>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="department" 
                                        id="input_department" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="20" 
                                        required 
                                        value=""
                                        autocomplete="off">
                                    <div class="invalid-feedback d-block" id="invalid-input_department"></div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="dateApproved" 
                                        id="input_dateApproved" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="20" 
                                        required 
                                        value=""
                                        autocomplete="off">
                                    <div class="invalid-feedback d-block" id="invalid-input_dateApproved"></div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="dateSubmitted" 
                                        id="input_dateSubmitted" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="20" 
                                        required 
                                        value=""
                                        autocomplete="off">
                                    <div class="invalid-feedback d-block" id="invalid-input_dateSubmitted"></div>
                                </div>
                            </div>
                            <div class="col-xl-10 col-lg-9 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <small class="text-small text-muted font-weight-bold">Project Code <span class="text-danger font-weight-bold">*</span></small>
                                    <select class=" form-control show-tick select2 validate" name="projectCodeReturn" id="input_projectCodeReturn" autocomplete="off" required>
                                        <option value="0">PRJ-00001</option>   
                                        <option value="1">PRJ-00002</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-input_projectCode"></div>
                                </div>
                            </div>
                            <div class="offset-col-8 col-xl-2 col-lg-3 col-md-6 col-sm-12">
                                <div class="form-group" style="margin-top: 22px">
                                    <button type="button" class="btn btn-add btn-block " id="btnAddReturnItem"> <i class="fad fa-plus-square"></i> &nbsp;Add Item</button>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="table-responsive" id="table_contentForm"></div>
                            </div>
				    </div>
                </div>
			</div>
		</div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modalDisposalList" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalDisposalListHeader">ADD CLIENT</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modalDisposalListContent"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->
<!-- ----- ADD MODAL ----- -->
<div id="modalReturnItemForm" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalReturnItemFormHeader">ADD CLIENT</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modalReturnItemFormContent"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->

<script src="<?=base_url()?>assets/custom/js/ims/return-item.js"></script>