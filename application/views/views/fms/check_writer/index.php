<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Finance</li>
                        <li class="breadcrumb-item active">Check Writer</li>
                    </ul>
                    <h1 class="mt-3">List of Cheques</h1>
                    <span>This module is used to manage check writer details.</span>
                </div>
                <div class="col-lg-6 col-md-6 text-right" id="headerButton">
				<button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab" href="#addPR"><i class="icon-plus"></i> &nbsp;Add Check</button></div>
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
                                            <th>Check No.</th>
                                            <th>Bank</th>
                                            <th>Paid To</th>
                                            <th>Check Voucher No.</th>
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
                                            <th>Check No.</th>
                                            <th>Bank</th>
                                            <th>Paid To</th>
                                            <th>Check Voucher No.</th>
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
                                            <small class="text-small text-muted font-weight-bold">Document No.</small>
                                            <h6 class="mt-0 text-danger font-weight-bold">
                                            CW-2021-00001
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
                            <hr class="pb-1">
                            <div class="col-md-12 text-right mt-3 mb-3 addReq pr-0">
                                <button class="btn btn-secondary px-5 p-2" id="btnSubmit"><i class="fas fa-print"></i> Print
                                </button>
                            </div>
                            <div class="row px-2">
                                <div class="col-sm-12 px-1">
                                    <div class="card" style="background-color:#ECF5F9">
                                        <div class="body">
                                            <div class="row">
                                                <div class="col-md-2 col-sm-12">
                                                    <h6 class="text-small font-weight-bold">ACCOUNT No.</h6>
                                                    <small class="mt-0 text-small text-muted font-weight-bold">--------------------------------------------</small>
                                                    <h6 class="mt-0 font-weight-bold">
                                                        0 0 0 0 0  -  0 0 0 0 0 0  -  0
                                                    </h6>   
                                                </div>
                                                <div class="col-md-6 col-sm-12">
                                                    <h6 class="text-small font-weight-bold">ACCOUNT NAME</h6>
                                                
                                                    <h6 class="mt-2">
                                                        BLACKCODERS GROUP INCORPORATED
                                                    </h6>   
                                                </div>
                                                <div class="col-md-2 col-sm-12">
                                                    <h6 class="text-small font-weight-bold">CHECK No.</h6>
                                                    <div class="form-group d-flex">
                                                        <label class="mt-2 font-weight-bold">SED&emsp;</label>
                                                        <input type="text" class="form-control text-center" required data-allowcharacters="[0-9][ ][-]" placeholder="0 0 0 0 0 0 0 0 0 0" disabled>   
                                                    </div>                                                                                                                                                                                    
                                                    
                                                </div>
                                                <div class="col-md-2 col-sm-12 text-right">
                                                    <h6 class="text-small text-right font-weight-bold">BRSTN</h6>
                                                    <small class="text-small text-right">01029 <br>0677</small>
                                                </div>
                                                <div class="offset-md-8 col-md-4 col-sm-12 mb-0">
                                                    <div class="form-group d-flex">
                                                        <label class="mt-2 font-weight-bold">DATE&ensp;</label>
                                                        <input type="date" class="form-control text-center" required style="border:0;outline:0;background:transparent;border-bottom: 1px solid black;border-radius:0">   
                                                    </div>  
                                                </div>
                                                <div class="col-md-8 col-sm-12 mt-0">
                                                    <div class="form-group d-flex">
                                                        <h5 class="mt-2 font-weight-bold">PAY TO THE ORDER OF </h5>
                                                        <input type="text" class="form-control text-center mt-3" required data-allowcharacters="[A-Z][a-z][ ][-]" placeholder="" style="border:0;outline:0;background:transparent;border-bottom: 1px solid black;border-radius:0">   
                                                    </div> 
                                                </div>
                                                <div class="col-md-4 col-sm-12 mt-3">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">₱</span>
                                                        </div>
                                                        <input type="text" class="form-control debit" min="0.1" max="999999" minlength="1" maxlength="20" name="debit" id="debit0" value="0" project="true" style="text-align: right;">
                                                    </div>
                                                    <div class="invalid-feedback d-block" id="invalid-debit"></div>
                                                </div>
                                                <div class="col-md-12 col-sm-12">
                                                    <div class="form-group d-flex mb-0">
                                                        <h5 class="mt-2 font-weight-bold">PESOS&emsp;</h5>
                                                        <input type="text" class="form-control text-center" required data-allowcharacters="[A-Z][ ][-]" placeholder="" style="border:0;outline:0;background:transparent;border-bottom: 1px solid black;border-radius:0">  
                                                    </div>
                                                    <small class="mt-0 text-small float-right text-right font-weight-bold"> <i>I / We allow 
                                                    the electronic clearing of this check and hereby waive the presentation for payment of this original to UCPB.</i> </small>  
                                                </div>
                                                <div class="col-md-3 col-sm-12">
                                                    <div class="form-group d-flex">
                                                        <img src="<?=base_url()?>assets/images/ucpb.png" alt="">
                                                        <h3 class="mt-4">Multi-One</h3>
                                                    </div>      
                                                </div>
                                                <div class="col-md-9 col-sm-12 mt-5">
                                                    <div class="form-group d-flex">
                                                        <input type="text" class="form-control text-center" required style="border:0;outline:0;background:transparent;border-bottom: 1px solid black;border-radius:0">&emsp;
                                                        <input type="text" class="form-control text-center" required style="border:0;outline:0;background:transparent;border-bottom: 1px solid black;border-radius:0">      
                                                    </div>  
                                                </div>
                                                <div class="col-md-3 col-sm-12">
                                                    <small class="font-weight-bold">SHAW ESCRIVA DRIVE BRANCH
                                                    GF TUNE HOTEL LOT 5 BLOCK 4 SHAW BLVD
                                                    BRGY SAN ANTONIO PASIG CITY</small>
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