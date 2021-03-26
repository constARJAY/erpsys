<?php
// $approval = getApprover("1");
?>
<style>
    .module-active{border-left: 5px solid #dc3454;}
    .role-list:hover{cursor:pointer}
	.color-active{color:#dc3454 !important;}
</style>
<div class="body_area after_bg">
    <div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-6">
					<ul class="breadcrumb pl-0 pb-0">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item d-flex align-items-center"><i class="zmdi zmdi-settings d-flex align-items-center"></i>&nbsp;System Settings</li>
						<li class="breadcrumb-item active d-flex align-items-center"><i class="fas fa-toggle-on d-flex align-items-center"></i>&nbsp;Approval Setup</li>
						<!-- <li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Crud Operatio  -->
					</ul>
					<h1 class="mb-1 mt-1">List of Approvers</h1>
					<span class="font-weight-light">This module is to manage approval setup</span>
				</div>
				<div class="col-lg-6 col-md-6 d-flex justify-content-end align-items-center list-of-module">
					<select class="form-control w-50 text-center" id="select2-modules">
						<option value="" selected disabled>Select Module</option>
						<?php foreach($module_list as $moduleRow):?>
							<option value="<?=$moduleRow["moduleID"]?>"><?=$moduleRow["moduleName"]?></option>
						<?php endforeach;?>
					</select>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="card py-3 px-3">
                <div class="col-12 row">
                    <div class="col-12 col-lg-4 col-xl-4 py-2 text-left">
						<h6 class="bg-primary text-light p-3"><strong>POSITIONS</strong></h6>
						<div class="position-list" id="position_form">
							<div class="card my-0 p-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h6 class="module-header text-gray">No position found</h6> 
                                </div>
                            </div>
						</div>
                    </div>

                    <div class="col-12 col-lg-8 col-xl-8 py-2 text-left">
                            <h6 class="bg-primary text-light p-3"><strong>APPROVERS</strong></h6>

                            <div class="card my-0 p-2 approval-list">
								<div class="row">
									<div class="col-4"></div>
									<div class="col-4"><img class="img-fluid" src="<?=base_url("assets/modal/please-select.gif")?>" alt=""> <h6 class="text-primary text-center font-weight-bold">SELECT APPROVALS</h6></div>
									<div class="col-4"></div>
								</div>
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
			<div class="modal_approval_setup_content">
				<input type="hidden" id="hidden_module_role" module="" role="">
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
						<div class="col-12 text-center">
							<button class="btn btn-primary px-5 p-2 w-50" id="add-role">ADD ROLE</button>
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
</div>
<!-- ----- END ADD MODAL ----- -->

<!-- ----- END CONFIRMATION MODAL ----- -->

<script src="<?=base_url('assets/custom/js/gen/approval-setup.js')?>"></script>
