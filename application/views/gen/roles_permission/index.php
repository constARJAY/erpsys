<style>
    thead tr th:hover {
        color: var(--text-white) !important;
    }
    .active-menu, .active-menu td  {
        background: #cccccc38 !important;
        color: var(--secondary-color) !important;
        font-weight: 1000;
        transition: all 500ms;
		border-left: 5px solid var(--secondary-color) !important;
    }
    .user-role-menu:hover, .user-role-menu td:hover {
        background: #907f7f14 !important;
    }
    .btnEdit, .userRole {
        transition: all 250ms;
    }
    .btnEdit:hover, .userRole:hover {
        color: #dc3454 !important;
    }
</style>

<div class="body_area after_bg">
    <div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item d-flex align-items-center"><a href="#"><i class="zmdi zmdi-settings"></i> System Settings</a></li>
						<li class="breadcrumb-item active"> Roles and Permission</li>
					</ul>
					<h1 class="mt-3">Roles and Permission</h1>
					<span>This module is used to manage roles and permission details</span>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container">
		<div class="row clearfix row-deck">
			<div class="col-12 card">
				<div class="row card-body" id="roles_permission_content"></div>
			</div>
		</div>
	</div> -->
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
                                <div class="row card-body" id="roles_permission_content"></div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
	</div>



</div>


<!-- ----- MODAL ----- -->
<div id="modal_roles_permission" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitle">ADD USER ROLE</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_roles_permission_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_add_roles_permission" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD USER ROLE</h2>
				<p class="text-center my-2">Are you sure that you want to add a new role to the system?</p>
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

<div id="confirmation-modal_edit_roles_permission" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationEdit" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/update.png">
				<h2 class="text-primary text-center">UPDATE USER ROLE</h2>
				<p class="text-center my-2">Are you sure that you want to update this role to the system?</p>
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
<!-- ----- END CONFIRMATION MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/roles-permission.js') ?>"></script>
