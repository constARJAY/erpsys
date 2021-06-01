<link rel="stylesheet" href="<?= base_url('assets/dist/bootstrap-treefy.css') ?>">
  <link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<style>
	.card.draggable {
		margin-bottom: 1rem;
		cursor: grab;
	}

	.droppable {
		background-color: var(--success);
		min-height: 120px;
		margin-bottom: 1rem;
	}

</style>
<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-6">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-users"></i> &nbsp;Project Modules</li>
						<li class="breadcrumb-item active">Employee Taskboard</li>
					</ul>
					<h1 class="mt-3">Employee Taskboard</h1>
					<span>This module is used to manage employee taskboard form details.</span>
				</div>
				<div class="col-lg-6 col-md-6 text-right" id="headerButton">
					<button type="button" class="btn btn-default btn-add" id="btnAdd" data-toggle="tab"
						href="#addTask"><i class="icon-plus"></i> &nbsp;Add Task</button></div>
			</div>
			<div class="bh_divider appendHeader"></div>
			<div class="row clearfix appendHeader">
				<div class="col-12">
					<ul class="nav nav-tabs">
						<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#listTab" redirect="listTab"><i
									class="fas fa-th-list"></i> List</a></li>
						<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#boardTab"
								redirect="boardTab"><i class="fas fa-th"></i> Board</a></li>
					</ul>
				</div>
			</div>

		</div>
	</div>

	<div class="container">
		<div class="row clearfix row-deck mx-1">
			<div class="card col-md-12">
				<div class="tab-content mt-3">
					<div role="tabpanel" class="tab-pane" id="listTab">
						<div class="card-body">
							<!-- LIST VIEW -->
							<div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Finance Management System
								<span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">PRJ-2021-00001</span>
							</div>
							<div class="card">
							<div class="card-body">
								<small><b>PHASE 1</b></small>                            
								<div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">FMS Masterfiles </div>
								<table class="table table-striped" id="table">
									<thead>
										<tr>
											<th>Milestone</th>
											<th>Tasks</th>
											<th>Man Hours</th>
											<th>Used Hours</th>
											<th>Assignee</th>
											<th>Due Date</th>
											<th>Actual End Date</th>
											<th>Status</th>
											<th>Notes</th>
										</tr>
									</thead>
									<tbody>
										<tr data-node="treetable-1">
										<td>User Stories</td>
										<td>Bank Masterfile</td>
										<td>4</td>
										<td><input type="text" class="form-control" value="2"></td>
										<td><input type="text" class="form-control" value="Renna"></td>
										<td><input type="text" class="form-control" value="May 14, 2021"></td>
										<td><input type="text" class="form-control" value="---"></td>
										<td><span class="badge badge-success w-100">Completed</span></td>
										<td><input type="text" class="form-control" value="---"></td>
										</tr>
										<tr data-node="treetable-2" data-pnode="treetable-parent-1">
										<td></td>
										<td>Changes</td>
										<td>4</td>
										<td><input type="text" class="form-control" value="2"></td>
										<td><input type="text" class="form-control" value="Renna"></td>
										<td><input type="text" class="form-control" value="May 14, 2021"></td>
										<td><input type="text" class="form-control" value="---"></td>
										<td><span class="badge badge-success w-100">Completed</span></td>
										<td><input type="text" class="form-control" value="---"></td>
										</tr>
										<tr data-node="treetable-3" data-pnode="treetable-parent-1">
										<td></td>
										<td>Additional</td>
										<td>4</td>
										<td><input type="text" class="form-control" value="2"></td>
										<td><input type="text" class="form-control" value="Renna"></td>
										<td><input type="text" class="form-control" value="May 14, 2021"></td>
										<td><input type="text" class="form-control" value="---"></td>
										<td><span class="badge badge-success w-100">Completed</span></td>
										<td><input type="text" class="form-control" value="---"></td>
										</tr>
									</tbody>
								</table>
								</div>
                    </div>
					
						</div>
					</div>
					<div role="tabpanel" class="tab-pane in active" id="boardTab">
						<div class="card-body">
							<!-- BOARD VIEW -->
							<div class="container-fluid pt-3">
								<h3 class="font-weight-light text-white">Kanban Board</h3>
								<div class="small  text-light">Drag and drop between swim lanes</div>
								<div class="row flex-row flex-sm-nowrap py-3">
									<div class="col-sm-6 col-md-4 col-xl-3">
										<div class="card bg-light">
											<div class="card-body">
												<h6 class="card-title text-uppercase text-truncate py-2">To Do</h6>
												<div class="items border border-light">
													<div class="card draggable shadow-sm" id="cd1" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-154</a>
															</div>
															<p>
																This is a description of a item on the board.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<div class="card draggable shadow-sm" id="cd2" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-156</a>
															</div>
															<p>
																This is a description of a item on the board.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
													<div class="card draggable shadow-sm" id="cd3" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-157</a>
															</div>
															<p>
																This is an item on the board. There is some descriptive
																text that explains the item here.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>

												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-6 col-md-4 col-xl-3">
										<div class="card bg-light">
											<div class="card-body">
												<h6 class="card-title text-uppercase text-truncate py-2">In-progess</h6>
												<div class="items border border-light">
													<div class="card draggable shadow-sm" id="cd1" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-152</a>
															</div>
															<p>
																This is a task that is being worked on.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
													<div class="card draggable shadow-sm" id="cd2" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-153</a>
															</div>
															<p>
																Another task here that is in progress.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-6 col-md-4 col-xl-3">
										<div class="card bg-light">
											<div class="card-body">
												<h6 class="card-title text-uppercase text-truncate py-2">Review</h6>
												<div class="items border border-light">
													<div class="card draggable shadow-sm" id="cd9" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-158</a>
															</div>
															<p>
																This is a description of a item on the board.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
												</div>
											</div>
										</div>
									</div>
									<div class="col-sm-6 col-md-4 col-xl-3">
										<div class="card">
											<div class="card-body">
												<h6 class="card-title text-uppercase text-truncate py-2">Complete</h6>
												<div class="items border border-light">
													<div class="card draggable shadow-sm" id="cd11" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-144</a>
															</div>
															<p>
																This is a description of an item.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
													<div class="card draggable shadow-sm" id="cd12" draggable="true"
														ondragstart="drag(event)">
														<div class="card-body p-2">
															<div class="card-title">
																<img src="//placehold.it/30"
																	class="rounded-circle float-right">
																<a href="" class="lead font-weight-light">TSK-146</a>
															</div>
															<p>
																This is a description of a task item.
															</p>
															<button class="btn btn-primary btn-sm">View</button>
														</div>
													</div>
													<!-- <div class="dropzone rounded" ondrop="drop(event)"
														ondragover="allowDrop(event)" ondragleave="clearDrop(event)">
														&nbsp; </div> -->
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- END BOARD VIEW -->
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
												PCR-2021-00001
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
													<small class="text-small text-muted font-weight-bold">Date
														Created</small>
													<h6 class="mt-0 font-weight-bold">
														---
													</h6>
												</div>
											</div>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-12 px-1">
											<div class="card">
												<div class="body">
													<small class="text-small text-muted font-weight-bold">Date
														Submitted</small>
													<h6 class="mt-0 font-weight-bold">
														---
													</h6>
												</div>
											</div>
										</div>
										<div class="col-lg-4 col-md-4 col-sm-12 px-1">
											<div class="card">
												<div class="body">
													<small class="text-small text-muted font-weight-bold">Date
														Approved</small>
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
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Department</label>
										<!-- <input type="text" class="form-control" disabled value=""> -->
										<select class="form-control validate select2" name="department"
											id="input_department" style="width: 100%" required ${disabled}>
											<option selected disabled>Select Department</option>
										</select>
									</div>
								</div>
								<!-- <div class="col-md-3 col-sm-12">
                                    <div class="form-group">
                                        <label>Chart of Account</label>
                                        <select class="form-control validate select2"
                                            name="chartOfAccount"
                                            id="input_chartOfAccount"
                                            style="width: 100%"
                                            required
                                            ${disabled}>
                                            <option selected disabled>Select Chart of Account</option>             
                                        </select>
                                    </div>
                                </div> -->
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Position</label>
										<input type="text" class="form-control" disabled value="">
									</div>
								</div>
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Requesting Department</label>
										<input type="text" class="form-control" disabled value="">
									</div>
								</div>
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Salary Package</label>
										<!-- <input type="text" class="form-control" disabled value=""> -->
										<div class="input-group">
											<div class="input-group-prepend">
												<span class="input-group-text">₱</span>
											</div>
											<input type="text" class="form-control salaryPackage" min="0.1" max="999999"
												minlength="1" maxlength="20" name="salaryPackage" id="salaryPackage0"
												value="0" project="true" style="text-align: right;">
										</div>
										<div class="invalid-feedback d-block" id="invalid-salaryPackage"></div>
									</div>
								</div>
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Reporting To</label>
										<input type="text" class="form-control" value="">
									</div>
								</div>
								<div class="col-md-4 col-sm-12">
									<div class="form-group">
										<label>Date Needed</label>
										<input type="button" class="form-control validate daterange text-left" required
											id="dateNeeded" name="dateNeeded" value="" ${disabled} title="Date">
										<div class="d-block invalid-feedback" id="invalid-dateNeeded"></div>
									</div>
								</div>
							</div>
							<hr class="pb-1">
							<div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Nature of Request
							</div>
							<div class="row mt-2">
								<div class="col-md-4 col-sm-12 mb-3">
									<label class="c_checkbox">
										<input type="checkbox" name="checkbox1" id="checkbox1" value="option1"
											checked="">
										<span class="checkmark"></span>
										<span class="ml-3">Permanent</span>
									</label>
									<ul style="list-style-type:none!important">
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio1" id="radio1" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">Approved Vacant Position According to
													Plantilla</span>
											</label>
										</li>
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio2" id="radio2" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">Additional Manpower due to Increased volume of
													works</span>
											</label>
										</li>
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio3" id="radio3" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">New Position due to Added Functions/Work
													Expansion</span>
											</label>
										</li>
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio4" id="radio4" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">Replacement of</span>
											</label>
											<ul style="list-style-type:none!important">
												<li>
													<input type="text" class="form-control" value="">
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class="col-md-4 col-sm-12 mb-3">
									<label class="c_checkbox">
										<input type="checkbox" name="checkbox2" id="checkbox2" value="option2">
										<span class="checkmark"></span>
										<span class="ml-3">Non-Permanent</span>
									</label>
									<ul style="list-style-type:none!important">
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio5" id="radio5" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">Project Based</span>
											</label>
										</li>
										<li>
											<label class="c_radio mt-2 mb-2">
												<input type="radio" name="radio6" id="radio6" value="option1">
												<span class="checkmark"></span>
												<span class="ml-2">On the Job Training</span>
											</label>
											<ul style="list-style-type:none!important">
												<li>
													<label for="">Duration:</label>
													<input type="text" class="form-control" value="">
												</li>
											</ul>
										</li>
									</ul>
								</div>
								<div class="col-md-4 col-sm-12 mb-3">
									<label class="c_checkbox">
										<input type="checkbox" name="checkbox3" id="checkbox3" value="option3">
										<span class="checkmark"></span>
										<span class="ml-3">Other Justifications</span>
									</label>
									<ul style="list-style-type:none!important">
										<li>
											<input type="text" class="form-control mt-2 mb-2" value="">
										</li>
									</ul>
								</div>
							</div>
							<div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Qualifications
								Required</div>
							<textarea rows="5" style="resize: none" class="form-control" name="remarks"
								id="remarks0"></textarea>
							<div class="text-primary font-weight-bold mt-2 mb-2" style="font-size: 1.5rem;">Brief
								Statement of Duties</div>
							<textarea rows="5" style="resize: none" class="form-control" name="remarks"
								id="remarks0"></textarea>
						</div>
						<div class="col-md-12 text-right mt-3 mb-3 addReq">
							<button class="btn btn-submit" id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
							</button>
							<button class="btn btn-cancel" id="btnCancel"><i class="fas fa-ban"></i>
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
<div id="modal_petty_cash_request" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false"
	role="dialog">
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
<script src="<?= base_url('assets/dist/bootstrap-treefy.js') ?>"></script>
  <script>
    $(function () {
      $("#table").treeFy({
        treeColumn: 1
      });
    });
  </script>
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

<script>
	const drag = (event) => {
		event.dataTransfer.setData("text/plain", event.target.id);
	}

	const allowDrop = (ev) => {
		ev.preventDefault();
		if (hasClass(ev.target, "dropzone")) {
			addClass(ev.target, "droppable");
		}
	}

	const clearDrop = (ev) => {
		removeClass(ev.target, "droppable");
	}

	const drop = (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData("text/plain");
		const element = document.querySelector(`#${data}`);
		try {
			// remove the spacer content from dropzone
			event.target.removeChild(event.target.firstChild);
			// add the draggable content
			event.target.appendChild(element);
			// remove the dropzone parent
			unwrap(event.target);
		} catch (error) {
			console.warn("can't move the item to the same place")
		}
		updateDropzones();
	}

	const updateDropzones = () => {
		/* after dropping, refresh the drop target areas
		  so there is a dropzone after each item
		  using jQuery here for simplicity */

		var dz = $(
			'<div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>'
			);

		// delete old dropzones
		$('.dropzone').remove();

		// insert new dropdzone after each item   
		dz.insertAfter('.card.draggable');

		// insert new dropzone in any empty swimlanes
		$(".items:not(:has(.card.draggable))").append(dz);
	};

	// helpers
	function hasClass(target, className) {
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
	}

	function addClass(ele, cls) {
		if (!hasClass(ele, cls)) ele.className += " " + cls;
	}

	function removeClass(ele, cls) {
		if (hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}

	function unwrap(node) {
		node.replaceWith(...node.childNodes);
	}

</script>
