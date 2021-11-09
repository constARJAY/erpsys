<style>
.has-error {
    border-color: #db3c36 !important;
}
.no-error {
    border-color: #09a561 !important;
}
#tableListStocksAsset_info{
    color:#7e8183;
}
#tableListStocksItem_info{
    color:#7e8183;
}
#tableListStocksItem_filter{
    color:#7e8183;
}
#tableListStocksAsset_filter{
    color:#7e8183;
}
#tableListStocksItem_length{
    color:#7e8183;
}
#tableListStocksAsset_length{
    color:#7e8183;
}
</style>

<div class="body_area after_bg">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fad fa-boxes-alt"></i> &nbsp;Inventory Modules</li>
						<li class="breadcrumb-item active"  id="invMainVendorBreadcrumbs">  List of Stocks</li>
					</ul>
					<h1 class="mt-3" id="invVendoHeaderID">List of Stocks</h1>
					<span>This module is used to monitor list of stocks.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

	<div class="container" id="container_1">
		<!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="body" id="main_body">
						<div class="row">

							<div class="col-sm-12 col-md-4">
								<div class="form-group">
									<label>Classification Name <code>*</code></label>
									<select class="form-control select2 validate input_classificationID"
										id="input_classificationID" name="classificationID" style="width: 100%" required>
									</select>
									<div class="invalid-feedback d-block" id="invalid-input_classificationID"></div>
								</div>
							</div>
							<div class="col-sm-12 col-md-4">
								<div class="form-group">
									<label>Category Name <code>*</code></label>
									<select class="form-control select2 validate" id="input_categoryID" name="CategoryID"
										style="width: 100%" required>
										<option value="" selected disabled>Select Category Name</option>
									</select>
									<div class="invalid-feedback d-block" id="invalid-input_input_categoryID"></div>
								</div>
							</div>
							<div class="col-sm-12 col-md-4">
								<div class="form-group">
									<button type="button" class="btn btn-primary w-100 p-2 mt-4 ml-2" id="btnSearch"><i
											class="icon-magnifier"></i> &nbsp;Search</button>
								</div>
							</div>
							<div class="col-12">
								<div class="border">
									<div class="imageboarder"></div>
									<div id="tabButton"></div>
									<div class="tab-content">
										<div id="itemPage" class="tab-pane fade in active">
											<div class="card-body">
												<div class="table-responsive" id="table_content"></div>
											</div>
										</div>
										<div id="assetPage" class="tab-pane fade">
											<div class="card-body">
												<div class="table-responsive" id="table_content1"></div>
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
	</div>
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
      
            let html =`<option selected disabled>Select Item Classification</option>
                       <option value="0">All</option>`;
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

            let html =`<option selected disabled>Select Category Name</option>
                     <option value="0">All</option>`;
            //let html = ` <option value="" disabled ${condition == "add" ? "selected": ""}>Select Item Category</option>`;
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