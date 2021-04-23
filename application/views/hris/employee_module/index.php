<style>
    #previewImageParent {
        position: relative;
    }
    #previewImageParent span, .removeDocument {
        position: absolute;
        top: 2%;
        right: 2%;
        width: 20px;
        border: 1px solid #eeeeee69;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        transition: all 250ms;
    }
    #previewImageParent span:hover, .removeDocument:hover {
        background: #eeeeee69;
        transform: scale(1.05);
    }

    #previewImageParent #previewImage {
        max-width: 100%; 
        width: 200px; 
        height: 200px;
    }
    .removeDocument {
        top: -15%;
        right: 10%;
    }
    .fileLink {
        font-size: .8rem;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; 
    }
</style>

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
                    <span>This module is used to manage employee details.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
                    <button class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> Add Employee</button>
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