<div class="body_area after_bg">
    <div class="block-header">
        <div class="container">
            <div class="row clearfix">
                <div class="col-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i>&nbsp;Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i>&nbsp;Masterfile</li>
                        <li class="breadcrumb-item active">Code of Conduct Category Masterfile</li>
                    </ul>
                    <h1 class="mb-1 mt-1">List of Code of Conduct</h1>
                    <span>This module is used to manage the code of conduct category details.</span>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addCodeConductCategory"><i class="icon-plus px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Code of Conduct Category</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="card p-3">
                <div class="col-12">
                    <div class="table-responsive" id="table_content"></div>
                </div>
            </div>
        </div>
	</div>
</div>
<!-- ----- ADD MODAL ----- -->
<div id="modal_codeConductCategory" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_codeConductCategory_header">ADD Code of Conduct Category</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_codeConductCategory_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url("assets/custom/js/hris/code-conduct-category.js")?>"></script>