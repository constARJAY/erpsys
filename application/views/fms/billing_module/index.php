<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-file-invoice-dollar"></i>&nbsp;Finance Modules</li>
                        <li class="breadcrumb-item active">Billing Module</li>
                    </ul>
                    <h1 class="mt-3">Billing Module</h1>
                    <span>This module is used to manage the creation and monitoring of billing for every clients.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton"></div>
            </div>
            <div class="bh_divider appendHeader"></div>
           
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body" id="page_content"></div>
            </div>
        </div>
	</div>

</div>


<!-- ----- MODAL ----- -->
<div id="modal_billing" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">ADD BILLING</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_billing_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/fms/billing-module.js') ?>"></script>