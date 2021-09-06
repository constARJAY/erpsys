<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-sm-12 col-md-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i>&nbsp;Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="fas fa-boxes-alt"></i> &nbsp;Inventory Report</li>
                        <li class="breadcrumb-item active">Inventory Report</li>
                    </ul>
                    <h1 class="mt-3">Inventory Report</h1>
                    <span>This module is used to manage the inventory report.</span>
                </div>
                <div class="col-sm-12 col-md-4 d-flex justify-content-end align-items-start" id="select2itemName">
                    <!-- <button class="btn btn-default btn-add d-flex justify-content-center align-items-center ml-2 addClassification"><i class="icon-plus px-2"></i><span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Classification</button> -->
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix">
            <div class="col-lg-12">
                <div class="card">
                    <div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck">
							<div class="col-12">
                                <div class="table-responsive" id="table_content">
                                    <div class="container row">
                                        <div class="col-2"></div>
                                        <div class="col-8 text-center" style='margin:100px 0px;'>
                                            <img class="img-fluid" src="<?=base_url()?>assets/modal/please-select2.gif" alt="" style='max-width:25%; padding:0px;'>
                                            <h6 class="module-header text-primary text-center font-weight-bold">ITEM PRICE LIST</h6>
                                            <p>Select classification to show price list.</p>
                                        </div>
                                        <div class="col-2"></div>
                                    </div>

                                </div>
							</div>
						</div>
					</div>
                </div>
            </div>
        </div>
	</div>



</div>



<script src="<?=base_url("assets/custom/js/ims/inventory-report.js")?>"></script>