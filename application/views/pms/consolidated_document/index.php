<style>
    .btn-view-bill-material:hover{
        color:#dc3545;
        font-weight:bold;
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
                        <li class="breadcrumb-item active">Consolidated Documents</li>
                    </ul>
                    <h1 class="mt-3">Consolidated Documents</h1>
                    <span>This module is used to manage the submission and approval of consolidated documents.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton"></div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body row" id="page_content">
                    <!-- <div class="col-12 col-lg-4 col-xl-4 py-2 text-left">
                        <h5 class="bg-primary text-light p-4"><strong>LIST OF PROJECTS</strong></h5>
                        <div class="card my-0 p-3" style='box-shadow:none;' id="project_list">
                            <div class="list-group panel mb-2">
                                <a class="list-group-item list-group-item-danger project-list" style="cursor:pointer;">
                                    <i type="button" class="project-icon fa fa-caret-down" aria-expanded="false"></i>
                                    &nbsp; <small>BlackBox - Enterprise Resource Planning System</small>
                                </a>
                                <div class="collapse" style="">
                                    <div class="list-group-submenu" style="">
                                        <a href="#" class="list-group-item" style="cursor:pointer;">
                                        <i class="fa fa-circle"></i> &nbsp; 
                                            <small>User Acceptance Testing </small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-8 col-xl-8 py-2 text-left">
                        <h5 class="bg-primary text-light p-3 d-flex justify-content-between">
                            <strong class="d-flex align-items-center">LIST OF DOCUMENTS</strong>
                            <div class="text-right">
                                <button class="btn py-2 btn-download-file btn-info btn-excel" category="cost_estimate">
                                    <i class="fas fa-file-excel"></i> CE EXCEL
                                </button>
                                <button class="btn py-2 btn-download-file btn-info btn-excel" category="bill_material">
                                    <i class="fas fa-file-excel"></i> BOM EXCEL
                                </button>
                            </div>
                        </h5> 
                        
                        <div class="card my-0 p-2" style='box-shadow:none;' id="document_list">
                            <div class="row">
                                <div class="col-4"></div>
                                <div class="col-4 text-center">
                                    <img class="img-fluid" src="<?=base_url("assets/modal/please-select.gif")?>" alt=""> 
                                    <h6 class="text-primary text-center font-weight-bold">DOCUMENTS</h6>
                                    <p>Select project to view documents.</p>
                                </div>
                                <div class="col-4"></div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
	</div>


    
</div>


<script src="<?= base_url('assets/custom/js/pms/consolidated-document.js') ?>"></script>
