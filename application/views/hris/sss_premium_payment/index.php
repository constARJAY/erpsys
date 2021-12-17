<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-sm-12 col-md-10">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i>&nbsp;Reports</li>
                        <li class="breadcrumb-item active">SSS Premium Payment</li>
                    </ul>
                    <h1 class="mt-3">List of SSS Premium Payment</h1>
                    <span>This module is used to generate and monitor the SSS premium payment for each month.</span>
                </div>
                <div class="col-sm-12 col-md-2 d-flex justify-content-end align-items-start">
                   
                    <select id="monthly_report" class="form-control select2">
                        <option disabled selected>Select period</option>
                        <?php foreach ($reportData as $key => $value):?>
                            <?php if(count($value["data"]) > 0):?>
                                <option value="<?= $value["month"]?>"><?= $value["month"]?></option>
                            <?php endif;?>
                        <?php endforeach;?>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix">
            <div class="col-lg-12">
                <div class="card">
                    <div class="header text-right p-0">
						<div class="closeBtn"></div>
					</div>
					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck">
                            <div class="col-12 text-right d-flex justify-content-end" id="printDiv">
                                
                            </div>
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
<div id="modal_hdmf" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_hdmf_header">ADD AWARD</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_hdmf_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url("assets/custom/js/hris/sss-premium-payment.js")?>"></script>