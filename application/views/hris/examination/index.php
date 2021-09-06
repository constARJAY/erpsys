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
    .exam-name-menu:hover, .exam-name-menu td:hover {
        background: #907f7f14 !important;
    }
    .btnEditExam, .examName {
        transition: all 250ms;
    }
    .btnEditExam:hover, .examName:hover {
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
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active">Examination</li>
					</ul>
					<h1 class="mt-3" id="inv_headerID">List of Examinations</h1>
					<span>This module is used to manage the examination details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
						<?php if(isCreateAllowed(32)){ ?>
							<button type="button" class="btn btn-default btn-add" id="btnAddExam"> <i class="icon-plus"></i> &nbsp;Add Examination</button>
						<?php  } ?>
                    </ul>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="card-body" id="page_content"></div>
                </div>
			</div>
		</div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_examination" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">Add Examination</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="modal_examination_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/hris/examination.js"></script>