<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-lg-8 col-sm-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-settings"></i>&nbsp;System Setup</li>
                        <li class="breadcrumb-item active">Schedule Setup</li>
                    </ul>
                    <h1 class="mt-3">List of Schedule</h1>
                    <span>This module is used to manage the schedule details.</span>
                </div>
                <div class="col-lg-4 col-sm-12 text-right">
                    <button type="button" class="btn btn-default btn-add" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add Schedule</button>
                </div>
            </div>
        </div>
    </div>

	<div class="container" id="container_1"> <!-- table front page -->
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


<!-- ----- MODAL ----- -->
<div id="modal_schedule_setup" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD SCHEDULE</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_schedule_setup_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/hris/schedule-setup.js') ?>"></script>