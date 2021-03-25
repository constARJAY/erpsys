<div class="body_area">
    <div class="block-header">
        <div class="container">
            <div class="row clearfix">
                <div class="col-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i>&nbsp;Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i>&nbsp;Masterfile</li>
                        <li class="breadcrumb-item active">Code of Conduct Section Masterfile</li>
                    </ul>
                    <h1 class="mb-1 mt-1">List of Code of Code of Conduct Section</h1>
                    <span>This module is used to manage the code of conduct section details.</span>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addCodeConductSection"><i class="icon-plus px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Code Conduct Section</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>
<!-- ----- ADD MODAL ----- -->
<div id="modal_codeConductSection" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_codeConductSection_header">ADD CODE OF CONDUCT SECTION</h5>
				<button type="button" class="close btnCancel" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_codeConductSection_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url("assets/custom/js/hris/code-conduct-section.js")?>"></script>