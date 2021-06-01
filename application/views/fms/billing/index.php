<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Finance Modules</li>
                        <li class="breadcrumb-item active">Billing</li>
                    </ul>
                    <h1 class="mt-3">List of Billings</h1>
                    <span>This module is used to manage billing details.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
				<button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab" href="#addPR"><i class="icon-plus"></i> &nbsp;Add Billing</button></div>
            </div>
            <div class="bh_divider appendHeader"></div>
            <div class="row clearfix appendHeader">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval</a></li>
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Forms</a></li>
                    </ul>
                </div>
            </div>
           
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="tab-content mt-3">
                    <div role="tabpanel" class="tab-pane" id="forApprovalTab">                   
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Bill No.</th>
                                            <th>Bill To</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>                
                    <div role="tabpanel" class="tab-pane in active" id="myFormsTab"> 
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Bill No.</th>
                                            <th>Bill To</th>
                                            <th>Date Created</th>
                                            <th>Date Submitted</th>
                                            <th>Date Approved</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="addPR"> 
                        <div class="card-body">
                            <div class="row px-2">
                                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Bill No.</small>
                                            <h6 class="mt-0 text-danger font-weight-bold">
                                            CV-2021-00001
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Status</small>
                                            <h6 class="mt-0 font-weight-bold">
                                                <span class="badge badge-info w-100">Approved</span>
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                                    <div class="row m-0">
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Created</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                                            <div class="card">
                                                <div class="body">
                                                    <small class="text-small text-muted font-weight-bold">Date Approved</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        ---
                                                    </h6>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 px-1">
                                    <div class="card">
                                        <div class="body">
                                            <small class="text-small text-muted font-weight-bold">Remarks</small>
                                            <h6 class="mt-0 font-weight-bold">
                                                ---
                                            </h6>      
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Preparer Name <code>*</code></label>
                                            <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Bill To <code>*</code></label>
                                            <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" disabled value="">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <br>    
                            <table class="table table-striped table-hover" id="tableForApprroval" role="grid">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th class="text-center" width="50">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxall" project="true">
                                            </div>
                                        </th>
                                        <th>Desciption</th>
                                        <th>Unit</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                                            </div>
                                        </td>
                                        <td>
                                            <textarea rows="2" style="resize: none" class="form-control" name="purpose" id="input_Purpose" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"></textarea>
                                        </td>
                                        <td><input type="text" class="form-control" data-allowcharacters="[A-Z][ ]"  value=""></td>
                                        <td>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">₱</span>
                                                </div>
                                                <input type="text" class="form-control amount" min="0.1" max="999999" minlength="1" maxlength="20" name="amount" id="amount0" value="0" project="true" style="text-align: right;">
                                            </div>
                                            <div class="invalid-feedback d-block" id="invalid-amount"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="w-100 d-flex justify-content-between align-items-center py-2 addReq">
                            <!-- <div>${buttonProjectAddDeleteRow}</div> -->
                                <div class="w-100 text-left my-2 addReq">
                                        <button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
                                        <button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="padding-left:15px;padding-right:15px;">
                                <div class="col-md-8 col-sm-12">
                                    <h5>Other Comments:</h5>
                                    <textarea rows="5" style="resize: none" class="form-control" name="purpose" id="input_Purpose" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"></textarea>
                                </div>
                                <div class="col-md-4 col-sm-12 pt-3 pb-2 mt-4">
                                    <div class="row" style="font-size: 1.1rem; font-weight:bold">
                                        <div class="col-6 text-right">Subtotal:</div>
                                        <div class="col-6 text-right">
                                            <input type="text" class="form-control-plaintext amount py-0 text-danger font-weight-bold" min="0" max="9999999999" minlength="1" maxlength="20" name="vat" id="vat" style="font-size: 1.02em; text-align: right;" value="0.00" disabled="">
                                        </div>
                                    </div>
                                    <div class="row" style="font-size: 1.1rem; font-weight:bold">
                                        <div class="col-6 text-right">Vat 12%:</div>
                                        <div class="col-6 text-right">
                                            <input type="text" class="form-control-plaintext amount py-0 text-danger border-bottom font-weight-bold" min="0" max="9999999999" minlength="1" maxlength="20" name="vat" id="vat" style="font-size: 1.02em; text-align: right;" value="0.00" disabled="">
                                        </div>
                                    </div>
                                    <div class="row" style="font-size: 1.1rem; font-weight:bold">
                                        <div class="col-6 text-right">Total:</div>
                                        <div class="col-6 text-right text-danger" id="grandTotalAmount" style="font-size: 1.3em">
                                            ₱0.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 text-right mt-3 mb-3 addReq">
                                <button class="btn btn-submit px-5 p-2" id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
                                </button>
                                <button class="btn btn-cancel px-5 p-2" id="btnCancel"><i class="fas fa-ban"></i> 
                                    Cancel
                                </button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>

            
        </div>
	</div>
</div>
    

    
</div>


<!-- ----- MODAL ----- -->
<div id="modal_petty_cash_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h6 class="page-title font-weight-bold">ADD PETTY CASH REQUEST</h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_petty_cash_request_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->


<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<!-- <script src="<?= base_url('assets/custom/js/fms/petty-cash-request.js') ?>"></script> -->
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