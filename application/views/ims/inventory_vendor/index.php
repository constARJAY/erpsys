<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-6">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active"  id="invMainVendorBreadcrumbs"><i class="fa fas-users"></i> &nbsp;Inventory Vendor</li>
                        <li class="breadcrumb-item" id="invVendorBreadcrumbs" style="visibility:hidden;"><i class="fa fas-users" ></i> &nbsp;Add Vendor</li>
					</ul>
					<h1 class="mt-3" id="invVendoHeaderID">List of Inventory Vendor</h1>
					<span>This module is used to manage inventory vendor details.</span>
				</div>
				<?php if (isCreateAllowed(8)) { ?>
				<div class="col-lg-6 col-md-6 text-md-right">
					<button class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> Add Vendor</button>
				</div>
				<?php } ?>
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
<div id="modal_inventory_vendor" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitleAddVendorHeader">ADD VENDOR</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_inventory_vendor_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/ims/inventory-vendor.js"></script>