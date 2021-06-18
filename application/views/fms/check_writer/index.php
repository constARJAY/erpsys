
<style type="text/css">
  .peso{
  display:inline-block;
  position: relative;
  }
.peso input{
  padding-left:15px;
  }
.peso:before {
  position: absolute;
    content:"₱";
    left:-10px;
  top:0px;
  }

  @print { 
    @page :footer { 
        display: none
    } 
  
    @page :header { 
        display: none
    } 
    #cheque{
      display:none;
    }
} 

        .verticaltext1{
      position: absolute;
        transform: rotate(90deg);
    transform-origin: 180px 180px;
    
        }
        .verticaltext2{
      position: absolute;
        transform: rotate(90deg);
    transform-origin: 204px 204px;
    width:65%;
      word-wrap: break-word; 
      
        }
        .verticaltext3{
      position: absolute;
        transform: rotate(90deg);
    transform-origin: 196px 196px;
    
        }
        .verticaltext4{
      position: absolute;
        transform: rotate(90deg);
    transform-origin: 212px 212px;
      
        }

        .btn-blue {
    color: #fff;
    background-color: #2a4d69;
    border-color: #2a4d69;
}
.btn-view {
    width: 66%;
    padding: .10rem;
}
</style>


<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
            <li class="breadcrumb-item"><i class="fas fa-file-invoice-dollar"></i> &nbsp;Finance Modules</li>
						<li class="breadcrumb-item active"  id="inv_mainItem_breadcrumbs">Check writer</li>
                        <!-- <li class="breadcrumb-item" id="inv_item_breadcrumbs" style="visibility:hidden;"><i class="icon-social-dropbox" ></i> &nbsp;Add Category</li> -->
					</ul>
                  
					<h1 class="mt-3" id="inv_headerID">List of Cheques</h1>
					<span>This module is used to manage check writer details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
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
						<div class="row clearfix row-deck">
							<div class="col-12">
								<div class="table-responsive" id="table_content"></div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_inventory_category" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="inventory_category_modalheader">ADD CATEGORY</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_inventory_category_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->

<!-- START OF PRINT CHECK -->
<div class="cheque" id="cheque" style="display:none;">
  
  <div class="verticaltext1" style="position: absolute;transform: rotate(90deg);transform-origin: 212px 212px;width:95%;word-wrap: break-word;">
    <div style="margin-left: 100px;"><span id="word"></span></div>
    <!-- Amount Word -->
  </div>
  <div clas="row">
    <div class="verticaltext2" style="position: absolute;transform: rotate(90deg);transform-origin: 230px 230px;width:68%;word-wrap: break-word; ">
      <div class="col" style="margin-left: 120px;"><span id="cheque_name"></span></div>
      <!-- Requestor Name -->
    </div>
    <div class="verticaltext3" style="position: absolute;transform: rotate(90deg);transform-origin: 225px 225px;">
      <div class="col" style="margin-left: 595px;" ><span id="cheque_amount"></span></div>
      <!-- Amount Numeric  -->
    </div>
  </div>
  <div class="verticaltext4" style="position: absolute;transform: rotate(90deg);transform-origin: 236px 236px;">
    <div style="margin-left: 620px;"><span id="today"></span></div> 
    <!-- Date -->
  </div>
</div>
<!-- END OF PRINT CHECK -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/fms/check-writer.js') ?>"></script>
<script>
    $(document).ready(function () {
        $("#addRequest").show();
        $("#pcrDetails").show();
        $(".addReq").show();

        $(document).on("click", "#btnAdd", function () {
            $("#addRequest").show();
            $("#pcrDetails").show();
            $(".addReq").show();
            $("#pcrDatatable").hide();
        });


	});
</script>