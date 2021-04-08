<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
                        <li class="breadcrumb-item active">PhilHealth Table</li>
                    </ul>
                    <h1 class="mt-3">PhilHealth Table</h1>
                    <span>This module is used to manage philhealth details.</span>
                    <span class="d-block text-warning">NOTE: This master file is for viewing purposes and payroll reference only.</span>
                </div>
            </div>
        </div>
    </div>

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


<script src="<?= base_url('assets/custom/js/hris/philhealth-table.js') ?>"></script>