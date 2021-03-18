<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Inventory Modules</li>
						<li class="breadcrumb-item active"  id="transfer_Request_Breadcrumbs">Transfer Request</li>
                        <!-- <li class="breadcrumb-item" id="transfer_Request_Breadcrumbs" style="visibility:hidden;"> List of Transfer Requests Forms</li> -->
					</ul>
					<h1 class="mt-3" id="transfer_Request_Header">List of Transfer Requests Form</h1>
					<span>This module is used to manage transfer request form details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<!-- <button class="btn btn-default hidden-xs ml-2">Download Report</button>
                        <button class="btn btn-secondary hidden-xs ml-2">New Report</button> -->
                        <!-- <button type="button" class="btn btn-danger pr-2" id="btnAdd"> <i class="icon-plus" id="btnIcon"></i> &nbsp;Add Item</button> -->
                        <button class="btn btn-add px-5 p-2" id="btnAdd"><i class="fas fa-plus-square"></i> Create New Transfer Request</button>
                        <button type="button" class="btn btn-light px-5 p-2" id="btnBack"> <i class="fad fa-arrow-alt-square-left"></i> &nbsp;BACK</button>
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

	<div class="container"> <!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row loading-screen" ></div>
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

    <!-- <div class="container" id="container_2"> 
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
					<div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row loading-screen"></div>
						<div class="row clearfix row-deck">
							<div class="col-12">
								<div id="form_content"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
</div>

<!-- ----- ADD MODAL ----- -->
<!-- <div id="modalInventoryVendor" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitleAddVendorHeader">ADD VENDOR</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modalInventoryVendorContent"></div>
        </div>
	</div>
</div> -->
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/ims/transfer-request.js"></script>