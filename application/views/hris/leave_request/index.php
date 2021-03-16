<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Module</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Leave Request</li>
					</ul>
					<h1 class="mt-3">Leave Request</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="col-12">
                <div class="col-12 header p-0">
                    <ul class="header-dropdown">
                        <button type="button" class="btn btn-primary p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add leave request</button>
                    </ul>
                </div>
            </div>
        </div>

		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_user_account" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD REQUEST LEAVE</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_user_account_content"></div>
        </div>
	</div>
</div>

<div id="confirmation-modal_add_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD REQUEST</h2>
				<p class="text-center my-2">Are you sure you want to add leave?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationAdd"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAdd"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_add_user_account_approver" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">REQUEST LEAVE</h2>
				<p class="text-center my-2">Are you sure you want to approve this leave?</p>
				<div class="form-group my-2"> 
					<select name="classpaid" id="classpaid" class="form-group select2" >
						  <option value=""disabled >Select Class</option>
						  
						  <option value="1">Paid</option>
						  <option value="2">Unpaid</option>
					</select>	  
				</div>	
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationAddapprover"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAddapprover"id="btnCloseConfirmationAddapprover"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_add_user_account_deny" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
			 <div class="form-group" style = "text-align: left;"> 
				<label class="text-danger">Please enter a reason:</label>
					<textarea rows="4" id="reason" type="text" name="reason" class="form-control input validate"placeholder="Please enter a reason" autocomplete="off" required></textarea>
						<div class="invalid-feedback" id="billing-reason"></div>
				</div>		
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationdeny"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAddapprover"id="btnCloseConfirmationAdddeny"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>


	<!-- <div class="modal custom-modal fade" id="confirmation-modal_add_user_account_deny" role="dialog">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body">
					<div class="form-header">
						<img class="isometric confirmationisometric">
						<h3 id="modal_title1"></h3>
						<p id="modal_message1"></p>
						 <div class="form-group" style = "text-align: left;"> 
						<label class="text-danger">Please enter a reason:</label>
						<textarea rows="4" id="reason" type="text" name="reason" class="form-control input alphanumericwithspace"placeholder="Please enter a reason" autocomplete="off" description="city/municipality"></textarea>
						<div class="invalid-feedback" id="billing-reason"></div>
						</div>
					</div>
				
					<div class="modal-btn confirmation-action">
						<div class="row">
							<div class="col-6">
								<button class="btn btn-primary submit-btn"></a>
							</div>
							<div class="col-6">
								<a href="#" data-dismiss="modal" class="btn btn-primary cancel-btn"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->




	<script src="<?= base_url()?>assets/custom/js/hris/leave-request.js"></script>
    
