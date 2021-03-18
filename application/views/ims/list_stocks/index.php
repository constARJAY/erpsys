<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Inventory Modules</li>
						<li class="breadcrumb-item active"  id="invMainVendorBreadcrumbs">  List of Stocks</li>
                        <!-- <li class="breadcrumb-item" id="invVendorBreadcrumbs" style="visibility:hidden;"><i class="fa fas-users" ></i> &nbsp;Add Vendor</li> -->
					</ul>
					<h1 class="mt-3" id="invVendoHeaderID">List of Stocks</h1>
					<span>This module is used to monitor list of stocks.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<!-- <button class="btn btn-default hidden-xs ml-2">Download Report</button>
                        <button class="btn btn-secondary hidden-xs ml-2">New Report</button> -->
                        <!-- <button type="button" class="btn btn-danger pr-2" id="btnAdd"> <i class="icon-plus" id="btnIcon"></i> &nbsp;Add Item</button> -->
                        <!-- <button class="btn btn-add" id="btnAdd"><i class="fas fa-plus-square"></i> Add Vendor</button> -->
                        <!-- <button type="button" class="btn btn-light pr-2" id="btnCancel"> <i class="icon-ban"></i> &nbsp;Cancel</button> -->
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

	<div class="container" id="container_1"> <!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="card-header">
                        <h3>Inventory Storage</h3>
                    </div>
					<div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row">
							<div class="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Storage Code <span class="text-danger font-weight-bold">*</span></label>
                                    <select class=" form-control show-tick select2 validate" name="storageCode" id="input_storageCode" autocomplete="off" required>
                                        <option value="" selected disabled>Select Storage Code</option>
                                        <option value="">STO-21-00001</option>   
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalidInputStorageCode"></div>
                                </div>
							</div>
                            <div class="col-xl-5 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Storage Name </label>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="storageName" 
                                        id="input_storageName" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="50" 
                                        required 
                                        value=""
                                        autocomplete="off"
                                        readonly>
                                    <div class="invalid-feedback d-block" id="invalidInputStorageName"></div>
                                </div>
							</div>
                            <div class="col-xl-5 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Office Name </label>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="officeName" 
                                        id="input_officeName" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="50" 
                                        required 
                                        value=""
                                        autocomplete="off"
                                        readonly>
                                    <div class="invalid-feedback d-block" id="invalidInputOfficeName"></div>
                                </div>
							</div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <label>Storage Address </label>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="storageAddress" 
                                        id="input_storageAddress" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="200" 
                                        required 
                                        value=""
                                        autocomplete="off" 
                                        readonly>
                                    <div class="invalid-feedback d-block" id="invalidInputStorageAddress"></div>
                                </div>
							</div>
                            <div class="col-xl-5 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Department </label>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="department" 
                                        id="input_department" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="50" 
                                        required 
                                        value=""
                                        autocomplete="off"
                                        readonly>
                                    <div class="invalid-feedback d-block" id="invalidInputDepartment"></div>
                                </div>
							</div>
                            <div class="col-xl-5 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Room Type </label>
                                    <input 
                                        type="text" 
                                        class="form-control validate" 
                                        name="roomType" 
                                        id="input_roomType" 
                                        data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                        minlength="2" 
                                        maxlength="100" 
                                        required 
                                        value=""
                                        autocomplete="off"
                                        readonly>
                                    <div class="invalid-feedback d-block" id="invalidInputRoomType"></div>
                                </div>
							</div>
                            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Status <span class="text-danger font-weight-bold">*</span></label>
                                    <select class=" form-control show-tick select2 validate" name="storageCode" id="input_storageCode" autocomplete="off" required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="0">Inactive</option>   
                                        <option value="1">Active</option>                                          
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalidInputStatus"></div>
                                </div>
							</div>
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                <div class="card">
                                <div class="card-header">
                                    <h3>List of Items:</h3>
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

    <!-- <div class="container" id="container_2"> 
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck">
							<div class="col-12">
								<div class="table-responsive" id="table_content"></div>
							</div>
						</div>
					</div>
                </div>
			</div>
		</div>
	</div> -->
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modalListStocks" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalListStocksHeader">ADD VENDOR</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modalListStocksContent"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/ims/list-stocks.js"></script>