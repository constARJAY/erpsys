<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Project Modules</li>
                    </ul>
                    <h1 class="mt-3">Milestone Builder</h1>
                    <span>This module is used to create and manage milestone per project category.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
                    <?php if(isCreateAllowed(89)):?>    
                    <button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab">
                        <i class="icon-plus"></i> &nbsp;Add Phase
                    </button>
                    <?php endif;?>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content">
                
                </div>
            </div>
        </div>
	</div>
</div>   



<script src="<?= base_url('assets/custom/js/pms/milestone-builder.js') ?>"></script>