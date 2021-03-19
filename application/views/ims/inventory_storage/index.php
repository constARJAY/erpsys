<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
							<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfile</li>
						<li class="breadcrumb-item active">Inventory Storage</li>
                        <!-- <li class="breadcrumb-item" id="inv_item_breadcrumbs" style="visibility:hidden;"><i class="icon-social-dropbox" ></i> &nbsp;Add Item</li> -->
					</ul>
					<h1 class="mt-3">List of Inventory Storage</h1>
					<span>This module is used to manage inventory storage details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<!-- <button class="btn btn-default hidden-xs ml-2">Download Report</button>
                        <button class="btn btn-secondary hidden-xs ml-2">New Report</button> -->
                        <!-- <button type="button" class="btn btn-danger pr-2" id="btnAdd"> <i class="icon-plus" id="btnIcon"></i> &nbsp;Add Item</button> -->
						<button type="button" class="btn btn-add p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add inventory storage</button>
                        <!-- <button type="button" class="btn btn-add pr-2" id="btnAdd"> <i class="fas fa-plus-square"></i> Add Item</button> -->
                        <!-- <button type="button" class="btn btn-light pr-2" id="btnCancel"> <i class="icon-ban"></i> &nbsp;Cancel</button> -->
                    </ul>
				</div>
			</div>
		</div>
	</div>

<!-- <div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfile</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Inventory Storage</li>
					</ul>
					<h1 class="mt-3">List of Inventory Storage</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
						<button type="button" class="btn btn-add p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add inventory storage</button>
				</div>
			</div>
		</div>
	</div> -->

	<div class="container" > <!-- table front page -->
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

    <!-- <div class="container"> -->
		<!-- <div class="row clearfix row-deck" style='text-align:right;'>
            <div class="col-12">
                <div class="col-12 header p-0">
                    <ul class="header-dropdown">
                    </ul>
                </div>
            </div>
        </div> -->
<!-- 
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div> -->

<!-- ----- ADD MODAL ----- -->
<div id="modal_inventory_storage" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD INVENTORY STORAGE</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_inventory_storage_content"></div>
        </div>
	</div>
</div>

<div id="confirmation-modal_add_inventory_storage" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD REQUEST</h2>
				<p class="text-center my-2">Are you sure you want to add leave?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationAdd"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAdd"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>


<div id="confirmation-modal_edit_inventory_storage" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">UPDATE INVENTORY STORAGE</h2>
				<p class="text-center my-2">Are you sure you want to update this inventory storage?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationEdit"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationEdit"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

  <script src="<?= base_url()?>assets/custom/js/ims/inventory-storage.js"></script>
