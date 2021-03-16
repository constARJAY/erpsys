<div class="body_area after_bg sm">
	<div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<!-- <li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li> -->
						<li class="breadcrumb-item active"  id="inv_mainItem_breadcrumbs"> Event Calendar</li>
                        <!-- <li class="breadcrumb-item" id="inv_item_breadcrumbs" style="visibility:hidden;"> Add Event</li> -->
					</ul>
					<h1 class="mt-3" id="inv_headerID">Event Calendar</h1>
					<span>This module is used to manage event details.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right">
					<!-- <button class="btn btn-default hidden-xs ml-2">Download Report</button>
                        <button class="btn btn-secondary hidden-xs ml-2">New Report</button> -->
                        <!-- <button type="button" class="btn btn-danger pr-2" id="btnAdd"> <i class="icon-plus" id="btnIcon"></i> &nbsp;Add Item</button> -->
                        <button type="button" class="btn btn-danger pr-2" id="btnAdd"><i class="fas fa-plus-square"></i> Add Event</button>
                        <!-- <button type="button" class="btn btn-light pr-2" id="btnCancel"> <i class="icon-ban"></i> &nbsp;Cancel</button> -->
                    </ul>
				</div>
			</div>
		</div>
	</div>

    <!-- <div class="container" id="page_loader"></div> -->

	<div class="container" id="container_1"> <!-- table front page -->
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                    <div class="body">
                        <div class="col-lg-12 col-md-8">
                            <div class="card">
                                <div class="card-body">
                                    <div id="calendar"></div>
                                </div>
                            </div>
                        </div>
                    </div>

				</div>
			</div>
		</div>
	</div>

  
</div>

<!-- ----- ADD MODAL ----- -->
<!-- <div id="modalProjectClient" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold" id="modalTitleAddClientHeader">ADD CLIENT</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modalProjectClientContent"></div>
        </div>
	</div>
</div> -->
<!-- ----- END ADD MODAL ----- -->

<!-- /Add Event Modal -->
<div id="add_event" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD EVENT</h5>
				<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div class="modal-body">
                <div class="form-group mb-0 mt-1">
                    <label>Event Name <span class="text-danger">*</span></label>
                    <input class="form-control validate" data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][_][-]" type="text" id="eventname" minlength="2" maxlength="30" required autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-eventname"></div>
                </div>
                <div class="form-group mb-0 mt-3">
                    <label for="">Color <span class="text-danger">*</span></label>
                    <select class="form-control validate" name="category" id="eventcolor" required>
                        <option value="" selected disabled>Select Color</option>
                        <option value="bg-red">Red</option>
                        <option value="bg-yellow">Yellow</option>
                        <option value="bg-green">Green</option>
                        <option value="bg-orange">Orange</option>
                        <option value="bg-blue">Blue</option>
                        <option value="bg-violet">Violet</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-eventcolor"></div>
                </div>
                <div class="form-group mb-0 mt-3">
                    <label>Event Date <span class="text-danger">*</span></label>
                    <input class="form-control daterange validate text-left" type="text" id="eventdate" data-allowcharacters="[A-Z][a-z][0-9][,][ ]" required autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-eventdate"></div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="submit-section">
                    <button class="btn btn-primary" id="btn_submit_event">SAVE</button>
                    <button class="btn btn-danger btn-close" data-dismiss="modal">CLOSE</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Add Event Modal -->
<div class="modal fade none-border" id="my_event">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">EDIT EVENT</h5>
				<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Event Name <span class="text-danger">*</span></label>
                    <input class="form-control validate" data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][_][-]" type="text" id="edit-eventname" minlength="2" maxlength="30" required autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-edit-eventname"></div>
                </div>
                <div class="form-group">
                    <label for="">Color <span class="text-danger">*</span></label>
                    <select class="form-control validate" name="category" id="edit-eventcolor" required>
                        <option value="" selected disabled>Select Color</option>
                        <option value="bg-red">Red</option>
                        <option value="bg-yellow">Yellow</option>
                        <option value="bg-green">Green</option>
                        <option value="bg-orange">Orange</option>
                        <option value="bg-blue">Blue</option>
                        <option value="bg-violet">Violet</option>
                    </select>
                    <div class="invalid-feedback d-block" id="invalid-edit-eventcolor"></div>
                </div>
                <div class="form-group" id="edit-eventdate_parent">
                    <label>Event Date <span class="text-danger">*</span></label>
                    <input class="form-control validate daterange text-left" data-allowcharacters="[A-Z][a-z][0-9][,][ ]" type="text" id="edit-eventdate" required autocomplete="off">
                    <div class="invalid-feedback d-block" id="invalid-edit-eventdate"></div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="w-100 text-right">
                    <button type="button" class="btn btn-primary save-event submit-btn" id="save-event">SAVE</button>
                    <button type="button" class="btn btn-primary update-event submit-btn" id="update-event">UPDATE</button>
                    <button type="button" class="btn btn-danger delete-event submit-btn" data-dismiss="modal" id="delete-event">DELETE</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /Add Event Modal -->


<script src="<?=base_url()?>assets/custom/js/hris/event-calendar.js"></script>