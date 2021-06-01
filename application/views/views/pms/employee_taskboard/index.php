<style>
    .panel-body{
        background-color: #dee2e6;
    }
</style>


<div class="body_area after_bg ">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
                <ul class="breadcrumb pl-0 pb-0 ">
                <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Employee Taskboard</li>
                    </ul>
                    <h1 class="mt-3">Employee Taskboard</h1>
                    <span>This module is used to manage employee taskboard details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
                <!-- <div class="text-right" id="headerButton"></div> -->
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                            <thead>
                                <tr>
                                    <th>Project Code</th>
                                    <th>Project Name</th>
                                    <th>Project Category</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PRJ-2021-00001</td>
                                    <td>Finance Management System</td>
                                    <td>Software</td>
                                    <td class="text-center">
                                        <span class="badge badge-info w-100">Approved</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-view w-100 btnView" id=""><i class="fas fa-eye"></i> View</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div>            
        </div>
	</div> -->

    <div class="container" id="containerBoard">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body">
                <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Finance Management System
                    <span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">PRJ-2021-00001</span>
                </div>
                    <!-- <div class="card">
                        <div class="card-body">
                            <small><b>PHASE 1</b></small>
                            
                            <div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">FMS Masterfiles </div>

                                <div class="row" style="border-top:1px #eee;">
                                    <div class="col-4"><small><b>TASKS</b></small></div>
                                    <div class="col-2"><small><b>MAN HOURS</b></small></div>
                                    <div class="col-2"><small><b>ASSIGNEE</b></small></div>
                                    <div class="col-2"><small><b>DUE DATE</b></small></div>
                                    <div class="col-2"><small><b>ACTUAL END DATE</b></small></div>
                                </div>
                                <hr class="mt-0 mb-0">
                            <div class="panel-group" id="accordion_1" role="tablist" aria-multiselectable="true">
                                <div class="panel panel-secondary">
                                    <div class="panel-heading" role="tab" id="headingOne_1">         
                                        <div class="panel-title"> 
                                            <div class="row">
                                                <div class="col-md-4 col-sm-12">
                                                    <div class="row">
                                                        <div class="col-md-6 col-sm-12">
                                                        <a data-toggle="collapse" href="#collapseOne_1" role="button" aria-expanded="false" aria-controls="collapseExample">  <i  class="fa fa-angle-down"></i><span>Link with href</span></a>
                                                        </div>
                                                        <div class="col-md-6 col-sm-12">
                                                        <button class="btn btn-light float-right mt-1">Create Subtask</button>
                                                        </div>
                                                    </div>
                                                 </div>   
                                                <div class="col-md-2 col-sm-12">
                                                    <input type="text" class="form-control mt-2" value="26" disabled>
                                                </div>
                                                <div class="col-md-2 col-sm-12">
                                                    <input type="text" class="form-control mt-2" value="Joseph, Errol, Charles" disabled>
                                                </div>
                                                <div class="col-md-2 col-sm-12">
                                                    <input type="text" class="form-control mt-2" value="26" disabled>
                                                </div>
                                                <div class="col-md-2 col-sm-12">
                                                    <input type="text" class="form-control mt-2" value="Joseph, Errol, Charles" disabled>
                                                </div>
                                            </div>
                                        </div>              
                                    </div>
                                    <div id="collapseOne_1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_1">
                                        <div class="row mt-1">
                                            <div class="col-md-4 col-sm-12">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;User Stories" disabled>
                                            </div>
                                            <div class="col-md-2 col-sm-12">
                                            <input type="text" class="form-control" value="4">
                                            </div>
                                            <div class="col-md-2 col-sm-12">
                                            <input type="text" class="form-control" value="Joseph">
                                            </div>
                                            <div class="col-md-2 col-sm-12">
                                            <input type="text" class="form-control" value="4">
                                            </div>
                                            <div class="col-md-2 col-sm-12">
                                            <input type="text" class="form-control" value="Joseph">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;User Interface Design" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="4">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Errol">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Development" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="8">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Charles">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Testing" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="2">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Joseph">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Bug Fixing" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="8">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Charles">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div> -->
                    <div class="card">
                        <div class="card-body">
                            <small><b>PHASE 1</b></small>
                            
                            <div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">PLANNING </div>
                            <!-- <table class="table table-striped" id="pcrDetails">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th class="text-center">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxall" project="true">
                                            </div>
                                        </th>
                                        <th>Milestone</th>
                                        <th>Tasks</th>
                                        <th>Subtask</th>
                                        <th>Assignee</th>
                                        <th>Assignee</th>
                                        <th>Man Hours</th>
                                        <th>Used Hours</th>
                                        <th>Actual End Date</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Severity</th>
                                        <th>Time Left</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody class="itemProjectTableBody" project="true">
                                    <tr>
                                        <td class="text-center">
                                            <div class="action">
                                                <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group mt-2">
                                                <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="empMilestone" id="empMilestone" value="Data Gathering" disabled>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group mt-2">
                                                <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-group mt-2">
                                                <button class="btn btn-light fad fa-plus-square" data-toggle="tooltip" data-placement="top" title="Create subtask"></button>
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
                            </table> -->
                           
    <table class="table table-condensed"  id="myTable">
        <thead>
            <tr style="white-space: nowrap">
                <th class="text-center">
                    <div class="action">
                        <input type="checkbox" class="checkboxall" project="true">
                    </div>
                </th>
                <th>Milestone</th>
                <th>Tasks</th>
                <th>Subtask</th>
                <th>Assignee</th>
                <th>Man Hours</th>
                <th>Used Hours</th>
                <th>Actual End Date</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Severity</th>
                <th>Time Left</th>
                <th>Status</th>
                <th>Notes</th>
            </tr>
        </thead>
    <tbody class="panel">
        <tr data-toggle="collapse" data-target="#demo1" data-parent="#myTable">
            <td class="text-center">
                <div class="action">
                    <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="empMilestone" id="empMilestone" value="Data Gathering" disabled>
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <button class="btn btn-light fad fa-plus-square" data-toggle="tooltip" data-placement="top" title="Create subtask"></button>
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="date" class="form-control" min="" max="" minlength="1" maxlength="250" name="endDate" id="endDate" value="">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="notes">
                    <textarea rows="2" style="resize: none" class="form-control" name="notes" id="notes0"></textarea>
                </div>
            </td>
        </tr>
        <tr id="demo1" class="collapse">
        <td class="text-center">
                <div class="action">
                    <input type="checkbox" class="checkboxrow" id="checkboxrow0" company="true">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="empMilestone" id="empMilestone" value="Data Gathering" disabled>
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <button class="btn btn-light fad fa-plus-square" data-toggle="tooltip" data-placement="top" title="Create subtask"></button>
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="date" class="form-control" min="" max="" minlength="1" maxlength="250" name="endDate" id="endDate" value="">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="form-group mt-2">
                    <input type="text" class="form-control" min="" max="" minlength="1" maxlength="250" name="tasksName" id="tasksName" value="Project Management System">
                </div>
            </td>
            <td>
                <div class="notes">
                    <textarea rows="2" style="resize: none" class="form-control" name="notes" id="notes0"></textarea>
                </div>
            </td>
        </tr>
        <tr data-toggle="collapse" data-target="#demo2" data-parent="#myTable">
            <td>2</td>
            <td>05 May 2013</td>
            <td>Credit Account</td>
            <td class="text-success">$11.00</td>
            <td class="text-error"></td>
            <td class="text-success">$161.00</td>
        </tr>
        <tr id="demo2" class="collapse">
            <td colspan="1" class="hiddenRow"></td>
            <td  class="hiddenRow"><div>Demo2</div></td>
                    <td  class="hiddenRow"><div>Demo2</div></td>
                                <td  class="hiddenRow"><div>Demo2</div></td>
                                            <td  class="hiddenRow"><div>Demo2</div></td>
                                                        <td  class="hiddenRow"><div>Demo2</div></td>
        </tr>
        <tr data-toggle="collapse" data-target="#demo3" data-parent="#myTable">
            <td>3</td>
            <td>05 May 2013</td>
            <td>Credit Account</td>
            <td class="text-success">$500.00</td>
            <td class="text-error"></td>
            <td class="text-success">$661.00</td>
        </tr>
        <tr id="demo3" class="collapse">
            <td colspan="6" class="hiddenRow"><div>Demo3</div></td>
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