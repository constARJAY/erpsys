<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-sm-12 col-md-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i>&nbsp;Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i>&nbsp;Masterfiles</li>
                        <li class="breadcrumb-item active">Branch</li>
                    </ul>
                    <h1 class="mt-3">List of Branches</h1>
                    <span>This module is used to manage the branch details.</span>
                </div>
                <?php if(isCreateAllowed(25)):?>
                    <div class="col-sm-12 col-md-4 d-flex justify-content-end align-items-start">
                        <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addBranch"><i class="icon-plus px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Branch</button>
                    </div>
                <?php endif;?>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix">
            <div class="col-lg-12">
                <div class="card">
                    <div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck">
							<div class="col-12">
                                <div class="table-responsive" id="table_content"></div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
	</div>
</div>



<!-- ----- ADD MODAL ----- -->
<div id="modal_branch" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_branch_header">ADD BRANCH</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_branch_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url("assets/custom/js/hris/branch.js")?>"></script>