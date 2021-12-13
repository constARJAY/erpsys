<?php 
    $sessionID              = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : redirect(base_url("login"));
    $sessionUserAccount     = getAdminSessionAccount();
    $sessionRoleID          = $sessionUserAccount->roleID;
    $sessionFullname        = $sessionUserAccount->employeeFirstname." ".$sessionUserAccount->employeeLastname;
    $sessionDesignationID   = $sessionUserAccount->designationID;
    $sessionDesignationName = $sessionUserAccount->designationName;
?>

<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-6">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item active">HR Dashboard</li>
					</ul>
					<h1 class="mt-3">HR Dashboard</h1>
					<span>This module is used to monitor human resource dashboard.</span>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row clearfix row-deck mx-1">
				<div class="card col-12">
					<div class="card-body" id="page_content">	<!--- start --->
					

						
					</div> 	<!--- end --->
				</div>
			</div>
		</div>
	</div>


</div>
<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/hr-dashboard.js') ?>"></script>
