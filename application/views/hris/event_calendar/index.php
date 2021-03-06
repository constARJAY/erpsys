<!-- Main Content -->
<div class="body_area after_bg">

    <div class="block-header pb-0">
        <div class="container">
            <div class="row clearfix">
                <div class="col-lg-6 col-md-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i>&nbsp;Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="zmdi zmdi-view-module"></i>&nbsp;HR Module</li>
                        <li class="breadcrumb-item active">Event Calendar</li>
                    </ul>
                    <h1 class="mt-3">Event Calendar</h1>
                    <span>This module is used to manage the event calendar</span>
                </div>            
                <div class="col-lg-6 col-md-12 d-flex justify-content-end align-items-start">
                    <button class="btn btn-default btn-add waves-effect d-flex align-items-center" type="button" data-toggle="collapse" id="showEventIcon" aria-expanded="false" aria-controls="collapseExample"><i class="zmdi zmdi-caret-down"></i>&nbsp; <span>Upcoming Event</span></button>
                </div>
            </div>
            <div class="row collapseExampleForIcon collapse">
                <div class="col-12">
                    <div class="bh_divider"></div>
                </div>

                <?php if(count($events) < 1):?>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="d-flex justify-content-start">
                                <h5 class="text-light">No available event for this month</h5>
                            </div>
                        </div>
                <?php else:?>
                    <?php foreach($events as $rowEvents): $eventDate = date_create($rowEvents["eventCalendarDateFrom"]); ?>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="d-flex justify-content-start">
                                <div class="px-3">
                                    <h3 class="mb-0"><?=date_format($eventDate, "d")?></h3>
                                    <span class="font-12"><?= date_format($eventDate, "F")?></span>
                                </div>
                                <div class="px-3 border-left">
                                    <h6><?=$rowEvents["eventCalendarName"]?></h6>
                                    <!-- <span class="font-13">Mobile World Congress 2020</span>
                                    <div class="font-11">71 Pilgrim Avenue Chase, MD 20815</div> -->
                                </div>
                            </div>
                        </div>
                    <?php endforeach;?>
                <?php endif;?>
            </div>
        </div>
    </div>

    <div class="container" id="calendar_container">
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">
                        <div class="header">
                            <div class="d-flex justify-content-end align-items-center px-3">
                            <?php if(isCreateAllowed(124)){ ?>
                                <button class="btn btn-primary p-2 align-self-baseline" data-toggle="modal" id="add_event"><i class="icon-plus"></i>&nbsp;&nbsp;Add Event</button>
                            <?php  } ?>
                            </div>
                        </div>
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

<!-- Add Event Modal -->
<div class="modal fade none-border" id="my_event">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold my_event_header">EDIT EVENT</h5>
				<button type="button" class="close btn-close" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="my_event_content">
                
            </div>
        </div>
    </div>
</div>
<!-- /Add Event Modal -->

    <script src="<?php echo base_url(); ?>assets/custom/js/operations.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/jquery-ui.min.js"></script>
	<script src="<?php echo base_url(); ?>assets/plugins/fullcalendar/fullcalendar.min.js"></script>
	<script src="<?php echo base_url(); ?>assets/custom/js/hris/event-calendar.js"></script>
	<script src="<?php echo base_url(); ?>assets/plugins/fullcalendar/jquery.fullcalendar.js"></script>

