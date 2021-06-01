<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fad fa-boxes-alt"></i> &nbsp;Inventory Modules</li>
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
					<div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row">
							<!-- <div class="col-xl-2 col-lg-4 col-md-4 col-sm-12">
                                <div class="form-group">
                                    <label>Storage Code <span class="text-danger font-weight-bold">*</span></label>
                                    <select class=" form-control show-tick select2 validate" name="storageCode" id="input_storageCode" autocomplete="off" required>
                                        <option value="" selected disabled>Select Storage Code</option>
                                        <option value="">STO-21-00001</option>   
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalidInputStorageCode"></div>
                                </div>
							</div> -->
                            <!-- <div id="filterdata">
                            </div> -->
                            
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Classification Name <span class="text-danger font-weight-bold">*</span></label>
                                    <select
                                        class="form-control select2 validate"
                                        id="input_classificationID"
                                        name="classificationID"
                                        required>
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
                                </div>
                            </div>    
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Category Name <span class="text-danger font-weight-bold">*</span></label>
                                    <select
                                        class="form-control select2 validate"
                                        id="input_categoryID"
                                        name="CategoryID"
                                        required>
                                        <option value=""selected disabled>Select Category Name</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-input_input_categoryID"></div>
                                </div>
                            </div> 
                            <div class="col-md-3 p-1">
                                <div class="form-group">
                                <button type="button" class="btn btn-primary w-100 p-2 mt-4 ml-2"  id="btnSearch"><i class="icon-magnifier"></i> &nbsp;Search</button>
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
<script>
  $(document).ready(function() {

    
  function storageContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_storage_tbl", 
        "inventoryStorageID  ,inventoryStorageOfficeName", "inventoryStorageStatus=1", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Storage Code</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.inventoryStorageID}" ${param && item.inventoryStorageID  == param[0].inventoryStorageID  && "selected"}>${item.inventoryStorageOfficeName}</option>`;
            })
            $("#input_inventoryStorageID").html(html);
    }
    storageContent();

// ----- START CLASSIFICATION CONTENT -----
    function classificationContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_classification_tbl", 
        "classificationID ,classificationName", "classificationStatus = 1", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>Select Item Classification</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.classificationID}" ${param && item.classificationID == param[0].classificationID && "selected"}>${item.classificationName}</option>`;
            })
            $("#input_classificationID").html(html);
    }
    classificationContent();
    // ----- END CLASSIFICATION CONTENT -----

    // -----  START CATEGORY CONTENT -----
    function categoryContent(condition = "add", param = false) {
        
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let paramCondition = param == false ? "":" AND classificationID="+param;

    const data = getTableData("ims_inventory_category_tbl", "categoryID ,categoryName", "categoryStatus = '1'"+paramCondition, "");
        
            let html = ` <option value="" disabled ${condition == "add" ? "selected": ""}>Select Item Category</option>`;
            if(param != false){
                    data.map((item, index, array) => {
                    html += `<option value="${item.categoryID}" ${item.classificationID == param && condition != "add" ? "selected":""}>${item.categoryName}</option>`;
                    
                })
            }
            $("#input_categoryID").html(html);
    }
     // -----  END CATEGORY CONTENT -----
    $(document).on("change","#input_classificationID",function(){
        let thisValue   =   $(this).val();
        categoryContent("add", thisValue);
    });

      



   
      

       




  }); 
  </script> 

<script src="<?=base_url()?>assets/custom/js/ims/list-stocks.js"></script>