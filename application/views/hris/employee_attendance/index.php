<style>
    .bg-gray {
        background-color: #f2f2f2;
    }
    .stats-box {
        box-shadow: 0px 0px black !important;
    }
</style>

<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-money-check"></i> &nbsp;Payroll Modules</li>
						<li class="breadcrumb-item active">Employee Attendance</li>
					</ul>
					<h1 class="mt-3" id="inv_headerID">Employee Attendance</h1>
					<span>This module is used to monitor and view the attendance activity for each employee.</span>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="card-body" id="page_content"></div>
                </div>
			</div>
		</div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_examination" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">Add Examination</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="modal_examination_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/hris/employee-attendance.js"></script>