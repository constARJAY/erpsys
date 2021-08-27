<style>
.pointer {cursor: pointer;}
 </style>
<link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/employee-module.css') ?>">
   
<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users-cog"></i> &nbsp;HR Modules</li>
                        <li class="breadcrumb-item active">Onboarding Module</li>
                    </ul>
                    <h1 class="mt-3">Onboarding Module</h1>
                    <span>This module is used to manage applicants for onboarding and orientation.</span>
                </div>
                <?php if(isCreateAllowed(107)) { ?>
                    <div class="col-lg-6 col-md-6 text-right" id="headerButton">
                       <div class="hiddenadd"> 
                        <button class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> Add Checklist</button>
                    </div> 
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content">
                    <div class="card-body" id="table_content"></div>
                </div>
            </div>
        </div>
	</div>


    
</div>


<!-- ----- MODAL ----- -->
<div id="modal_checklist_module" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal modal-dialog-centered " role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="checklist_modalheader">ADD Onboarding</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_checklist_module_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/hris/on-boarding.js') ?>"></script>