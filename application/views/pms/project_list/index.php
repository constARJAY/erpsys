<style>
	.select2-container--bootstrap .select2-selection--multiple .select2-selection__choice {
		display: grid;
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
						<li class="breadcrumb-item active"  id="inv_mainItem_breadcrumbs">Project List</li>
					</ul>
					<h1 class="mt-3" id="inv_headerID">List of Projects</h1>
					<span>This module is used to manage project details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<button class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> Add Project</button>
				</div>
			</div>
		</div>
	</div>

	<div class="container" id="container_1">
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<div class="table-responsive" id="table_content"></div>
					
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_project_list" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD PROJECT</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_project_list_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/pms/project-list.js"></script>