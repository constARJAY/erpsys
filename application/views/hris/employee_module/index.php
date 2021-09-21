<link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/employee-module.css') ?>">

<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users-cog"></i> &nbsp;HR Modules</li>
                        <li class="breadcrumb-item active">Employee Module</li>
                    </ul>
                    <h1 class="mt-3">Employee Module</h1>
                    <span>This module is used to manage employee information and documents.</span>
                </div>
                <?php if(isCreateAllowed(114)) { ?>
                    <div class="col-lg-6 col-md-6 text-right" id="headerButton">
                        <button class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> Add Employee</button>
                    </div>
                <?php } ?>
                <div class="col-lg-6 col-md-6">
                    <div class="bh_divider appendHeader"></div>
                    <div class="row clearfix appendHeader">
                        <div class="col-12">
                            <ul class="nav nav-tabs">
                                <li class="nav-item"><a class="nav-link page-tab active" data-toggle="tab" href="#organicTab" redirect="organicTab">Organic</a></li>
                                <li class="nav-item"><a class="nav-link page-tab" data-toggle="tab" href="#nonOrganicTab" redirect="nonOrganicTab">Non-Organic</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content">
                    <div class="table-responsive" id="table_content"></div>
                </div>
            </div>
        </div>
	</div>


    
</div>


<!-- ----- MODAL ----- -->
<div id="modal_employee_module" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-xl modal-dialog-centered " role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD EMPLOYEE</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_employee_module_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/employee-module.js') ?>"></script>