<div class="body_area after_bg">
    <div class="block-header pb-0">
        <div class="container" id="headerContainer">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-6">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Milestone Builder</li>
                    </ul>
                    <h1 class="mt-3">Milestone Builder</h1>
                    <span>This module is used to manage  milestone builder details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
                <!-- <div class="text-right" id="headerButton"></div> -->
                <button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab" href="#addPhaseForm"><i class="icon-plus"></i> &nbsp;Add Phase</button>
                </div>
            </div>
            <div class="bh_divider appendHeader"></div>
           
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="tab-content mt-3">
                    <div role="tabpanel" class="tab-pane" id="milestoneList">                   
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                    <thead>
                                        <tr>
                                            <th>Phase Code</th>
                                            <th>Project Category</th>
                                            <th>Phase Description</th>                  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>S - I</th>
                                            <td>Software</td>
                                            <th>Requirement Analysis Phase</th>
                                            
                                        </tr>
                                        <tr>
                                            <th>S - II</th>
                                            <td>Software</td>
                                            <th>Design Phase</th>
                                            
                                        </tr>
                                        <tr>
                                            <th>S - III</th>
                                            <td>Software</td>
                                            <th>Development Phase</th>
                                            
                                        </tr>
                                        <tr>
                                            <th>H - I</th>
                                            <td>Hardware</td>
                                            <th>Occular Phase</th>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="addPhaseForm"> 
                        <div class="card-body">
                            <div class="text-primary font-weight-bold mb-2" >
                                <div class="row">
                                    <div class="col-md-10 col-sm-12">
                                        <div class="form-group">
                                            <label>Phase Description <code>*</code></label>
                                                <input type="text" class="form-control text-primary font-weight-bold mb-2" style="font-size: 1.5rem;" value="">
                                        </div>
                                    </div>
                                    <div class="col-md-2 col-sm-12">
                                        <div class="form-group">
                                            <label>Phase Code <code>*</code></label>
                                                <input type="text" class="form-control text-danger text-right font-weight-bold mb-2" style="font-size: 1.5rem;" value="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="col-md-2 col-sm-12" style="padding-left:0;padding-right:0;">
                                        <label>Phase Category <code>*</code></label>
                                        <select class="form-control form-control-sm select2 validate"
                                            name="projectCategory"
                                            id="projectCategory"
                                            required>
                                            <option selected disabled>Select Project Category</option>
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-projectCategory"></div>
                                    </div>
                                    <!-- <small><b>SOFTWARE</b></small> -->
                                    
                                    <div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">ADD MILESTONE/S </div>
                                    <table class="table table-striped" id="pcrDetails">
                                        <thead>
                                            <tr style="white-space: nowrap">
                                                <th class="text-center">
                                                    <div class="action">
                                                        <input type="checkbox" class="checkboxall" project="true">
                                                    </div>
                                                </th>
                                                <th>Milestone Name <code>*</code></th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody class="itemProjectTableBody" project="true">
                                            <!-- ${requestProjectItems} -->
                                            <tr>
                                                <td class="text-center">
                                                    <div class="action">
                                                        <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-group mt-2">
                                                        <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-group mt-2">
                                                        <input type="date" class="form-control" min="" max="" minlength="1" maxlength="250" name="startDate" id="startDate" value="">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="form-group mt-2">
                                                        <input type="date" class="form-control" min="" max="" minlength="1" maxlength="250" name="endDate" id="endDate" value="">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="notes">
                                                        <textarea rows="2" style="resize: none" class="form-control" name="notes" id="notes0"></textarea>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="w-100 d-flex justify-content-between align-items-center py-2 addReq">
                                    <!-- <div>${buttonProjectAddDeleteRow}</div> -->
                                    <div>
                                        <div class="w-100 text-left my-2 addReq">
                                                <button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
                                                <button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                                            </div>
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
        $("#milestoneList").show();
        $("#addPhaseForm").hide();

        $(document).on("click", "#btnAdd", function () {
            $("#addPhaseForm").show();
            $("#milestoneList").hide();
        });


	});
</script>