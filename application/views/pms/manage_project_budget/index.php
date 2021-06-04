<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Manage Project Budget</li>
                    </ul>
                    <h1 class="mt-3">Manage Project Budget</h1>
                    <span>This module is used to manage manage project budget details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton">
                    <!-- <button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab" href="#addPhaseForm"><i class="icon-plus"></i> &nbsp;Show Budget</button> -->
                </div>
            </div>
            <div class="bh_divider appendHeader"></div>
           
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body" id="page_content">
                    <!-- <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                            <thead>
                                <tr>
                                    <th>Executive Name</th>
                                    <th>Project Name</th>
                                    <th>Project Category</th>
                                    <th>Compare with</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Kay-cee Allen Y. Tangalin</td>
                                    <td>
                                        <div>
                                            Hotel Management System
                                        </div>
                                        <small style="color:#848482;">HMS-21-00001</small>
                                    </td>
                                    <td>Software</td>
                                    <td>Quotation</td>
                                    <td><span class="badge badge-outline-info w-100">For Approval</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
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
<script src="<?= base_url('assets/custom/js/pms/manage-project-budget.js') ?>"></script>
<!-- <script>
    $(document).ready(function () {
        $("#milestoneList").show();
        $("#addPhaseForm").hide();

        $(document).on("click", "#btnAdd", function () {
            $("#addPhaseForm").show();
            $("#milestoneList").hide();
        });


	});
</script> -->