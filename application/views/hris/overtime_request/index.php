<div class="body_area after_bg">
    <div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-8">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Module</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Overtime Request</li>
					</ul>
					<h1 class="mt-3">Overtime Request</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
				<div class="col-4 d-flex justify-content-end align-items-center" id="headerButton">
                    <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addOvertimeRequest">
                        <i class="icon-plus px-2"></i> 
                        <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Overtime Request
                    </button>
                </div>
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

<!-- ----- ADD MODAL ----- -->
<div id="modal_overtime_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD OVERTIME REQUEST</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_overtime_request_content"></div>
        </div>
	</div>
</div>

   

<script src="<?= base_url()?>assets/custom/js/hris/overtime-request.js"></script>