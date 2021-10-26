<style>

.tooltip-inner {
    max-width: 591px !important;
    white-space: pre-wrap !important;
    text-align: left !important;
}
</style>
<div class="body_area after_bg ">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
                <ul class="breadcrumb pl-0 pb-0 ">
                <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Employee Forms</li>
                        <li class="breadcrumb-item active">Loan Form</li>
                    </ul>
                    <h1 class="mt-3">Loan Forms</h1>
                    <span>This module is used to manage the submission and approval of loan requests.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
                <div class="text-right" id="headerButton"></div>
                    </ul>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content">

                    
                </div>
            </div>
        </div>
	</div>
</div>

<!-- ----- MODAL ----- -->
<div id="modal_loan_form" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">ADD LOAN FORM</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_loan_form_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->

<!-- ----- AMMORTIZATION MODAL ----- -->
<div id="modal_ammortization" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">Loan Amortization Schedule</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_ammortization_content"></div>
        </div>
	</div>
</div>
<!-- ----- END AMMORTIZATION MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/loan-form.js') ?>"></script>