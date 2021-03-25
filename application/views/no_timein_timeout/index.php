<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-8 col-sm-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Forms</li>
                        <li class="breadcrumb-item active">No Time-in / Time-out Request Form</li>
                    </ul>
                    <h1 class="mb-1 mt-1">On Time-in / Time-out Request Form</h1>
                    <span>This form  is used  to manage  the No Time-in/Time-out.</span>
                </div>
                <div class="col-lg-4 col-sm-12 text-right" id="headerButton"></div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="card col-12">
                <div class="card-body" id="page_content">

                    
                </div>
            </div>
        </div>
	</div>
</div>


<!-- ----- MODAL ----- -->
<div id="modal_change_schedule" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">ADD TIME-IN / TIME-OUT</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_change_schedule_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/no-timein-timeout.js') ?>"></script>
