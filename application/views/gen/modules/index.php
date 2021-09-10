<div class="body_area after_bg">
    <div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Modules</li>
					</ul>
					<h1 class="mt-3">Modules</h1>
					<span>This module is used to manage system modules.</span>
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


<!-- ----- MODAL ----- -->
<div id="modal_module" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitle">ADD MODULE</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_module_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_add_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD MODULE</h2>
				<p class="text-center my-2">Are you sure you want to add this module?</p>
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

<div id="confirmation-modal_edit_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationEdit" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/update.png">
				<h2 class="text-primary text-center">UPDATE MODULE</h2>
				<p class="text-center my-2">Are you sure you want to update this module?</p>
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

<div id="confirmation-modal_delete_module_masterfile" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationDelete" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/delete.png">
				<h2 class="text-primary text-center">DELETE MODULE</h2>
				<p class="text-center my-2">Are you sure you want to delete this module?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationDelete"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationDelete"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- ----- END CONFIRMATION MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/module-masterfile.js') ?>"></script>