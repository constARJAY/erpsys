<style>
.cross-css{
    background-color: red;
    border-radius: 2px;
    padding-left: 1px;
    padding-right: 1px;
}
.btn-view:hover{
    cursor: pointer;
}
</style>
<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users-cog"></i>&nbsp;Recruitment Modules</li>
                        <li class="breadcrumb-item active">Applicant List</li>
                    </ul>
                    <h1 class="mt-3">Applicant List</h1>
                    <span>This module is used for monitoring applicants.</span>
                </div>
                <div class="col-lg-6 col-md-6 d-flex justify-content-end align-items-center" id="headerButton">
                    
                </div>
            </div>
            <div class="div-applicant-nav">
                
            </div>

        </div>
    </div>

    <div class="container">
		<div class="row clearfix mx-1" id="page_content">
        
            

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

<script src="<?= base_url('assets/custom/js/hris/applicant-list.js') ?>"></script>