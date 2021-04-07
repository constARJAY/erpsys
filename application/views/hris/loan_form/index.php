<div class="body_area after_bg ">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
                <ul class="breadcrumb pl-0 pb-0 ">
                <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Forms</li>
                        <li class="breadcrumb-item active">Loan Form</li>
                    </ul>
                    <h1 class="mt-3">List of Loan Form</h1>
                    <span>This module is used to manage loan form details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
                <div class="text-right" id="headerButton"></div>
                    </ul>
				</div>
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
                            <div class="card-body" id="page_content"></div>
							</div>
						</div>
					</div>

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


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/loan-form.js') ?>"></script>