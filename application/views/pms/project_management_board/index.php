<style>
	.select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {
		display: grid;
	}
	.select2-container--bootstrap.select2-container--disabled .select2-selection--multiple .select2-selection__choice {
		padding: 0 2px 0 0px;
	}
	.select2-container--bootstrap.select2-container--disabled .select2-selection {
		padding: 0 3.5px;
	}
	.badge.badge-outline-violet {
		color: rgb(112 103 182);
		border: 1px solid rgb(112 103 182);
		background-color: rgb(255 255 255);
		height: 25px;
	}
</style>

<div class="body_area after_bg ">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Project Management Board</li>
                    </ul>
                    <h1 class="mt-3">Project Management Board</h1>
                    <span>This module is used to manage the submission of project timelines and milestones with man hours.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton">
				</div>
                <div class="bh_divider appendHeader"></div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content"></div>
            </div>
        </div>
	</div>
</div>


<!-- ----- MODAL ----- -->
<div id="modal_project_management_board" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ASSIGN MAN HOURS</h5>
				<button type="button" class="close btnDismissModal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_project_management_board_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/pms/project-management-board.js') ?>"></script>