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

    <div class="container" id="container_1"> <!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="body" id="main_body">
						<div class="row">
                            
                            <div class="col-sm-12 col-md-4">
                                <div class="form-group">
                                    <label>Classification Name <code>*</code></label>
                                    <select
                                        class="form-control select2 validate input_classificationID"
                                        id="input_classificationID"
                                        name="classificationID"
                                        style="width: 100%"
                                        required>
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
                                </div>
                            </div>    
                            <div class="col-sm-12 col-md-4">
                                <div class="form-group">
                                    <label>Category Name</label>
                                    <select
                                        class="form-control select2 validate"
                                        id="input_categoryID"
                                        name="CategoryID"
                                        style="width: 100%"
                                        required>
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-input_input_categoryID"></div>
                                </div>
                            </div> 
                            <div class="col-sm-12 col-md-4">
                                <div class="form-group">
                                <button type="button" class="btn btn-primary w-100 p-2 mt-4 ml-2"  id="btnSearch"><i class="icon-magnifier"></i> &nbsp;Search</button>
                                </div>
                            </div>         
                            <div class="col-12">
                                <div class="border">
                                    <div class="card-header">
                                        <h3>Inventory Report:</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive" id="table_content"></div>
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