<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Module</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Business Trip</li>
					</ul>
					<h1 class="mt-3">Business trip</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="col-12">
                <div class="col-12 header p-0">
                    <ul class="header-dropdown">
                        <button type="button" class="btn btn-primary p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add business trip</button>
                    </ul>
                </div>
            </div>
        </div>

		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_overtime_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD BUSINESS TRIP</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_overtime_request_content"></div>
        </div>
	</div>
</div>

    <script src="<?= base_url()?>assets/custom/js/hris/business-trip.js"></script>