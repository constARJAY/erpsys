<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Employee Forms</li>
                        <li class="breadcrumb-item active">Inventory Stock In</li>
                    </ul>
                    <h1 class="mt-3">Inventory Stock In</h1>
                    <span>This module is used to manage inventory stock in details.</span>
                </div>
                <!-- <div class="col-lg-6 col-md-6 text-right" id="headerButton"></div> -->
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


<!-- ----- MODAL ----- -->
<div id="modal_product_record" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">VIEW RECORD PRODUCT</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_product_record_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<!-- ----- MODAL ----- -->
<div id="modal_list_barcode" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">LIST OF BARCODES</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div class="modal-body pb-3 text-center">
          <!-- <button type="button" id="barcode_confirmation_no" class="close mb-3" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
        
          <div class="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                  <thead>
                      <tr>
                          <th>Item Code</th>
                          <th>Location</th>
                          <th>Received</th>
                          <th>Date Received</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody id="tbody-barcodes"></tbody>
              </table>
          </div>

        </div>

        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script> 
<script src="<?= base_url('assets/custom/js/ims/inventory-stock-in.js') ?>"></script>