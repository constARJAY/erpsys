<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-sm-12 col-md-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-settings"></i>&nbsp;System Settings</li>
                        <li class="breadcrumb-item active">System Settings</li>
                    </ul>
                    <h1 class="mt-3">System Settings</h1>
                    <span>This module is used to setup the settings for other modules on the system.</span>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix">
            <div class="col-lg-12">
                <div class="card">
                    <div class="body">
                       <div class="row clear-fix">

                           <div class="col-lg-12 col-12">
                                <div class="card" style="box-shadow:none !important">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5>Approval</h5>
                                        
                                        <button type="button" class="btn btn-submit px-5 p-2 btnUpdate" givenaction="approval"><i class="fas fa-save"></i> Update</button>
                                    </div>
                                    <div class="body">
                                        <div class="row clear-fix approval-row">
                                            <div class="col-lg-12 col-12">
                                                <label for="">Minimum Days to Approve</label>
                                                <p> <span>3 Day/s</span> </p>
                                            </div>
                                            <div class="col-lg-12 col-12">
                                                <label for="">Maximum Days to Approve</label>
                                                <p> <span>3 Day/s</span> </p>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                           </div>

                            <div class="col-lg-12 col-12">
                                <div class="card" style="box-shadow:none !important">
                                    <div class="card-header  d-flex justify-content-between align-items-center">
                                        <h5>Cut off</h5>
                                        <button type="button" class="btn btn-submit px-5 p-2 btnUpdate" givenaction="cuttoff"><i class="fas fa-save"></i> Update</button>
                                    </div>
                                    <div class="body">
                                        <div class="row clear-fix cut-off-row">
                                            
                                        </div>
                                    </div>
                                </div>
                           </div>

                           <div class="col-lg-12 col-12">
                                <div class="card" style="box-shadow:none !important">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5>Petty Cash</h5>
                                        <button type="button" class="btn btn-submit px-5 p-2 btnUpdate" givenaction="pettycash"><i class="fas fa-save"></i> Update</button>
                                    </div>
                                    <div class="body">
                                        <div class="row clear-fix petty-cash-replenishment-row">
                                            <div class="col-lg-12 col-12">
                                                <label for="">Replenishment Limit</label>
                                                <p> <span>3 Day/s</span> </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>

                           <div class="col-lg-12 col-12">
                                <div class="card" style="box-shadow:none !important">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5>Client Fund</h5>
                                        
                                        <button type="button" class="btn btn-submit px-5 p-2 btnUpdate" givenaction="clientfund"><i class="fas fa-save"></i> Update</button>
                                    </div>
                                    <div class="body">
                                        <div class="row clear-fix client-fund-replenishment-row">
                                            <div class="col-lg-12 col-12">
                                                <label for="">Replenishment Limit</label>
                                                <p> <span>3 Day/s</span> </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_content" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_content_header">ADD AWARD</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div class="modal-body" id="modal_content_body">

            </div>

            <div class="modal-footer" id="modal_content_footer">

            </div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url("assets/custom/js/gen/system-setting.js")?>"></script>