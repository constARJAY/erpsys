<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;System Notification</li>
					</ul>
					<h1 class="mt-3">System Notification</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
            <div class="bh_divider"></div>
            <div class="row clearfix">
                <div class="col-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#allTab">All</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#hrisTab">Human Resource Information System</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#pmsTab">Project Management System</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#fmsTab">Finance Management System</a></li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#imsTab">Inventory Management System</a></li>
                    </ul>
                </div>
            </div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="card">
                    <div class="body">
                        <div class="tab-content">
                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                        </div>
                                        <input type="button" class="form-control daterange2 text-left" id="daterange2" placeholder="Please choose a date..." data-dtp="dtp_6ITRg" autocomplete="off">
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel" class="tab-pane active" id="allTab" aria-expanded="false">
                                <div class="header">
                                    <div class="row">
                                        <h5 class="mt-2">LIST OF ALL NOTIFICATIONS</h5>
                                    </div>
                                </div>

                                <div class="row clearfix row-deck" id="allTabContent">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="body">
                                                <?php
                                                    $notification = getNotificationData("all");
                                                    if (count($notification) > 0) {
                                                        foreach ($notification as $notif) {
                                                ?>
                                                    <div class="timeline-item <?= $notif['color'] ?> border-bottom pb-2" date-is="<?= $notif['date'] ?>">
                                                        <div class="d-flex align-items-center">
                                                            <div>
                                                                <img src="<?= base_url('assets/notification/').$notif["icon"] ?>" width="50" height="50">
                                                            </div>
                                                            <div class="ml-3">
                                                                <h6 class="font-weight-bold"><?= $notif["title"] ?></h6>
                                                                <div><?= $notif["description"] ?></div>
                                                                <a href="<?= base_url().$notif['controller'] ?>">Details</a>  
                                                            </div>
                                                        </div>
                                                    </div>   
                                                <?php
                                                        }
                                                    } else {
                                                ?>
                                                    <div class="w-100 text-center">
                                                        <img src="<?= base_url('assets/modal/notification.png') ?>" alt="No notification" width="300" height="200">
                                                        <h4>No notification found.</h4>
                                                    </div>
                                                <?php
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="hrisTab" aria-expanded="false">
                                <div class="header">
                                    <div class="row">
                                        <h5 class="mt-2">LIST OF ALL NOTIFICATIONS</h5>
                                    </div>
                                </div>

                                <div class="row clearfix row-deck" id="hrisTabContent">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="body">
                                                <?php
                                                    $notification = getNotificationData("Human Resource Information System");
                                                    if (count($notification) > 0) {
                                                        foreach ($notification as $notif) {
                                                ?>
                                                    <div class="timeline-item <?= $notif['color'] ?> border-bottom pb-2" date-is="<?= $notif['date'] ?>">
                                                        <div class="d-flex align-items-center">
                                                            <div>
                                                                <img src="<?= base_url('assets/notification/').$notif["icon"] ?>" width="50" height="50">
                                                            </div>
                                                            <div class="ml-3">
                                                                <h6 class="font-weight-bold"><?= $notif["title"] ?></h6>
                                                                <div><?= $notif["description"] ?></div>
                                                                <a href="<?= base_url().$notif['controller'] ?>">Details</a>  
                                                            </div>
                                                        </div>
                                                    </div>   
                                                <?php
                                                        }
                                                    } else {
                                                ?>
                                                    <div class="w-100 text-center">
                                                        <img src="<?= base_url('assets/modal/notification.png') ?>" alt="No notification" width="300" height="200">
                                                        <h4>No notification found.</h4>
                                                    </div>
                                                <?php
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="pmsTab" aria-expanded="false">
                                <div class="header">
                                    <div class="row">
                                        <h5 class="mt-2">LIST OF ALL NOTIFICATIONS</h5>
                                    </div>
                                </div>

                                <div class="row clearfix row-deck" id="pmsTabContent">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="body">
                                                <?php
                                                    $notification = getNotificationData("Project Management System");
                                                    if (count($notification) > 0) {
                                                        foreach ($notification as $notif) {
                                                ?>
                                                    <div class="timeline-item <?= $notif['color'] ?> border-bottom pb-2" date-is="<?= $notif['date'] ?>">
                                                        <div class="d-flex align-items-center">
                                                            <div>
                                                                <img src="<?= base_url('assets/notification/').$notif["icon"] ?>" width="50" height="50">
                                                            </div>
                                                            <div class="ml-3">
                                                                <h6 class="font-weight-bold"><?= $notif["title"] ?></h6>
                                                                <div><?= $notif["description"] ?></div>
                                                                <a href="<?= base_url().$notif['controller'] ?>">Details</a>  
                                                            </div>
                                                        </div>
                                                    </div>   
                                                <?php
                                                        }
                                                    } else {
                                                ?>
                                                    <div class="w-100 text-center">
                                                        <img src="<?= base_url('assets/modal/notification.png') ?>" alt="No notification" width="300" height="200">
                                                        <h4>No notification found.</h4>
                                                    </div>
                                                <?php
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="fmsTab" aria-expanded="false">
                                <div class="header">
                                    <div class="row">
                                        <h5 class="mt-2">LIST OF ALL NOTIFICATIONS</h5>
                                    </div>
                                </div>

                                <div class="row clearfix row-deck" id="fmsTabContent">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="body">
                                                <?php
                                                    $notification = getNotificationData("Finance Management System");
                                                    if (count($notification) > 0) {
                                                        foreach ($notification as $notif) {
                                                ?>
                                                    <div class="timeline-item <?= $notif['color'] ?> border-bottom pb-2" date-is="<?= $notif['date'] ?>">
                                                        <div class="d-flex align-items-center">
                                                            <div>
                                                                <img src="<?= base_url('assets/notification/').$notif["icon"] ?>" width="50" height="50">
                                                            </div>
                                                            <div class="ml-3">
                                                                <h6 class="font-weight-bold"><?= $notif["title"] ?></h6>
                                                                <div><?= $notif["description"] ?></div>
                                                                <a href="<?= base_url().$notif['controller'] ?>">Details</a>  
                                                            </div>
                                                        </div>
                                                    </div>   
                                                <?php
                                                        }
                                                    } else {
                                                ?>
                                                    <div class="w-100 text-center">
                                                        <img src="<?= base_url('assets/modal/notification.png') ?>" alt="No notification" width="300" height="200">
                                                        <h4>No notification found.</h4>
                                                    </div>
                                                <?php
                                                    }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="imsTab" aria-expanded="false">
                                <div class="header">
                                    <div class="row">
                                        <h5 class="mt-2">LIST OF ALL NOTIFICATIONS</h5>
                                    </div>
                                </div>

                                <div class="row clearfix row-deck" id="imsTabContent">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="body">
                                                <?php
                                                    $notification = getNotificationData("Inventory Management System");
                                                    if (count($notification) > 0) {
                                                        foreach ($notification as $notif) {
                                                ?>
                                                    <div class="timeline-item <?= $notif['color'] ?> border-bottom pb-2" date-is="<?= $notif['date'] ?>">
                                                        <div class="d-flex align-items-center">
                                                            <div>
                                                                <img src="<?= base_url('assets/notification/').$notif["icon"] ?>" width="50" height="50">
                                                            </div>
                                                            <div class="ml-3">
                                                                <h6 class="font-weight-bold"><?= $notif["title"] ?></h6>
                                                                <div><?= $notif["description"] ?></div>
                                                                <a href="<?= base_url().$notif['controller'] ?>">Details</a>  
                                                            </div>
                                                        </div>
                                                    </div>   
                                                <?php
                                                        }
                                                    } else {
                                                ?>
                                                    <div class="w-100 text-center">
                                                        <img src="<?= base_url('assets/modal/notification.png') ?>" alt="No notification" width="300" height="200">
                                                        <h4>No notification found.</h4>
                                                    </div>
                                                <?php
                                                    }
                                                ?>
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

<script src="<?= base_url('assets/custom/js/gen/system-notification.js') ?>"></script>