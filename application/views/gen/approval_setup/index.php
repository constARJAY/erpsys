<style>
    .module-active{border-left: 5px solid #10948b;}
    .module-list:hover{cursor:pointer}
    .select2{
        width: 100%;
    }
</style>
<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Approval Setup</li>
						<!-- <li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Crud Operatio  -->
					</ul>
					<h1 class="mt-3">Approval Setup</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="card py-4">
                <div class="col-12 row">
                    <div class="col-12 col-lg-4 col-xl-4 py-2 text-left">
						<h6 class="bg-primary text-light p-3"><strong>APPROVALS</strong></h6>
                        <?php foreach($module_list as $row): ?>
                            <div class="card my-0 p-3">
                                <div class="d-flex justify-content-between align-items-center module-list" data-moduleid="<?=$row["moduleID"]?>" id="moduleList<?=$row["moduleID"]?>">
                                    <h6 class="module-header text-dark"><?=$row["moduleName"]?></h6> 
                                </div>
                            </div> 
                        <?php endforeach; ?>    

                    </div>

                    <div class="col-12 col-lg-8 col-xl-8 py-2 text-left">
                            <h6 class="bg-primary text-light p-3"><strong>APPROVERS</strong></h6>

                            <div class="card my-0 p-2 approval-list">
                                
                                <div class="row py-2">
                                    <div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center"><img class="img-fluid rounded-circle" src="assets/images/profile-images/default.jpg" alt="avatar" height="70" width="70"></div>
                                    <div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
                                        <span>
                                            Level 1 Name approver  <br>
                                            <small class="text-primary">Department | Designation</small>    
                                        </span>
                                    </div>
                                    <div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                        <h5><small class="text-primary">Level 1</small></h5>
                                    </div>
                                </div>

                                <!-- <div class="row py-2">
                                    <div class="col-1"><img class="img-fluid rounded-circle" src="assets/images/profile-images/default.jpg" alt="avatar" height="70" width="70"></div>
                                    <div class="col-9  d-flex justify-content-start align-items-center">
                                        <span>
                                            Level 1 Name approver  <br>
                                            <small class="text-primary">Department | Designation</small>    
                                        </span>
                                    </div>
                                    <div class="col-2 col-2 d-flex justify-content-center align-items-center">
                                        <p>Level 1</p>
                                    </div>
                                </div>

                                <div class="py-2 border-top d-flex justify-content-end align-items-end">
                                        <button class="btn btn-primary" data-approvalid="2" >Update Approver</button>
                                </div> -->

                            </div>
                    </div>
                </div>
            </div>
        </div>

	</div>
</div>


<!-- ----- ADD MODAL ----- -->
<div id="modal_approval_setup" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false"
	role="dialog">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">SETUP APPROVAL</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <form id="modal_approval_setup_form">
				<div class="modal-body">
                    <div class="col-12">
                        <div class="form-group">
                            <label for="">Level 1 Approver</label>
                            <select class="form-control select2 validate" name="" id="" required>
                                <option >Select Role</option>
                                <option >Admin</option>
                                <option>Operations</option>
                            </select>
                            <div class="invalid-feedback" id=""></div>
                        </div>
                    </div>
				</div>
            </form>
				<div class="modal-footer">
					<button class="btn btn-primary px-5 p-2" data-moduleid="0" id="btnUpdate">UPDATE</button>
					<button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
				</div>
		</div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_approval_setup" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">SETUP APPROVAL</h2>
				<p class="text-center my-2">Are you sure you want to setup this approval?</p>
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

<div id="confirmation-modal_edit_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">UPDATE USER ACCOUNT</h2>
				<p class="text-center my-2">Are you sure you want to update this user account?</p>
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

<div id="confirmation-modal_delete_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationDelete" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">DELETE USER ACCOUNT</h2>
				<p class="text-center my-2">Are you sure you want to delete this user account?</p>
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

<script src="<?=base_url('assets/custom/js/approval-setup.js')?>"></script>
