<style>
.custom-table td, .custom-table th{
    border: 2px solid black !important;
}
</style>

<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-file-invoice-dollar"></i> &nbsp;Finance Modules</li>
                        <li class="breadcrumb-item active">Petty Cash Voucher</li>
                    </ul>
                    <h1 class="mt-3">Petty Cash Voucher</h1>
                    <span>This module is used to manage petty cash voucher form details.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
                    <?php if(isCreateAllowed(93)):?>
                        <button type="button" class="btn btn-default btn-add" id="replenishBtn" data-toggle="tab"><i class="fas fa-sync-alt"></i> &nbsp;Replenish</button>
                    <?php endif;?>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content"></div>
            </div>
        </div>
	</div>

</div>
    


<!-- ----- MODAL ----- -->
<div id="modal_petty_cash_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">VIEW PETTY CASH VOUCHER</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="modal_petty_cash_request_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/fms/petty-cash-voucher.js') ?>"></script>
