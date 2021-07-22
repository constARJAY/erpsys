<style>
    .select2-selection--multiple{
        min-height: 123px!important;
    }
    .select2-selection__rendered{
        width: unset !important;
    }
</style>
<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Project Timeline Builder</li>
                    </ul>
                    <h1 class="mt-3">Project Timeline Builder</h1>
                    <span>This module is used to manage the submission and approval of project timelines.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton"></div>
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



<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/pms/project-timeline.js') ?>"></script>