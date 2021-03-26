<style>
#ledgerClassAdd:hover {
    cursor: pointer;
}
</style>
<div class="body_area after_bg ">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active"  id="inv_mainItem_breadcrumbs">Chart of Accounts</li>
                        <!-- <li class="breadcrumb-item" id="inv_item_breadcrumbs" style="visibility:hidden;"><i class="icon-social-dropbox" ></i> &nbsp;Add Category</li> -->
					</ul>
					<h1 class="mt-3" id="inv_headerID">List of Accounts</h1>
					<span>This module is used to manage chart of accounts details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
                        <button type="button" class="btn btn-default btn-add" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add Account</button>
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

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

<!-- ----- ADD MODAL ----- -->
<div id="modal_fms_chartofaccts" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="fms_chartofaccts_modalheader">ADD ACCOUNT</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_fms_chartofaccts_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->

<!-- ADD LDGER MODAL -->
<div id="modal_fms_ledgerClassification" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false"
	role="dialog">
	<div class="modal-dialog modal-dialog-centered modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="fms_chartofaccts_modalheader">ADD SPECIFIC LEDGER
					CLASSIFICATION</h5>
				<button type="button" class="close btnCancelLedger" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
			<div id="modal_fms_ledgerClassification_content"></div>
		</div>
	</div>
</div>
<!-- END LEDGER MODAL -->


<script src="<?=base_url()?>assets/custom/js/fms/chart-of-accounts.js"></script>