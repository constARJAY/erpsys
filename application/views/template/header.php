<?php

    $sessionID  =   $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : redirect(base_url("login"));
    $sessionUserAccount         = getAdminSessionAccount();
    $sessionRoleID              = $sessionUserAccount->roleID;
    $sessionFullname            = $sessionUserAccount->employeeFirstname." ".$sessionUserAccount->employeeLastname;
    $sessionDesignationID       = $sessionUserAccount->designationID;
    $sessionDesignationName     = $sessionUserAccount->designationName;
    $sessionProfilePicture      = $sessionUserAccount->employeeProfile;

    $company = getCompanyProfile();
    $companyWebsite = $company ? $company->companyWebsite : "";

?>

<!DOCTYPE html>
<html class="no-js " lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Web Portal Blackcoders">
    <title><?= $title ?> | BlackBox ERP System</title>

    <link rel="icon" href="<?=base_url("assets/images/logo_erp.ico")?>" type="image/x-icon">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap/css/bootstrap.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/morrisjs/morris.css')?>" />
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.css')?>" />
    <link rel="stylesheet" href="<?=base_url('assets/plugins/multi-select/css/multi-select.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/jquery-spinner/css/bootstrap-spinner.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap-select/css/bootstrap-select.css')?>" />
    <link rel="stylesheet" href="<?=base_url('assets/plugins/nouislider/nouislider.min.css')?>" />
    <link rel="stylesheet" href="<?=base_url('assets/css/select2.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/select2-bootstrap.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/amaze.style.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/font-awesome/css/font-awesome.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/daterangepicker.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/jquery-datatable/dataTables.bootstrap4.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.css')?>">
    <!-- <link rel="stylesheet" href="<?=base_url('assets/css/amaze.style.min.css')?>"> -->

    <link rel="stylesheet" href="<?=base_url('assets/css/timeline.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/font-awesome/css/fontawesome.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/font-awesome/css/all.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/custom/css/gen/header.css')?>">

    <script src="<?=base_url('assets/js/jquery-3.2.1.min.js')?>"></script>
    <script src="<?=base_url('assets/js/popper.min.js')?>"></script>
    <script src="<?=base_url('assets/bundles/libscripts.bundle.js')?>"></script> 
    <script src="<?=base_url('assets/bundles/vendorscripts.bundle.js')?>"></script> 

    <script src="https://f001.backblazeb2.com/file/buonzz-assets/jquery.ph-locations-v1.0.0.js"></script>
    <script src="<?=base_url('assets/js/dropzone.js')?>"></script>
    <script src="<?=base_url('assets/js/dropzone.min.js')?>"></script>
    <script src="<?=base_url('assets/js/dropzone-amd-module.js')?>"></script>
    <script src="<?=base_url('assets/js/dropzone-amd-module.min.js')?>"></script>
    <link rel="stylesheet" href="<?=base_url('assets/css/dropzone.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/basic.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/dropzone.min.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/basic.min.css')?>">

    <link rel="stylesheet" href="<?=base_url('assets/css/sweetalert2.css')?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/sweetalert2.min.css')?>">

    <script src="<?=base_url('assets/js/sweetalert2.all.min.js')?>"></script>
    <script src="<?=base_url('assets/js/sweetalert2.min.js')?>"></script>

    <link rel="stylesheet" href="<?=base_url('assets/plugins/fullcalendar/fullcalendar.min.css')?>">
	<script src="<?=base_url('assets/bundles/vendorscripts.bundle.js')?>"></script>
    <script src="<?=base_url('assets/plugins/momentjs/moment.js')?>"></script>

    <script src="<?= base_url('assets/js/aes.js') ?>"></script>

</head>

<body class="font-nunito fullwidth h_menu">

<div id="body" class="theme-blackbox">
    <!-- Page Loader -->
    <div class="page-loader-wrapper" base_url="<?= base_url() ?>" session="<?= $sessionID ?>" role="<?= $sessionRoleID ?>" designation="<?= $sessionDesignationID ?>">
        <div class="loader">
            <div class="mt-3"><img class="zmdi-hc-spin w60" src="<?= base_url() ?>assets/images/loader.svg" alt="ERP"></div>
            <p>Please wait...</p>        
        </div>
    </div>

    <!-- Save/Update Loader -->
    <div class="page-loader-wrapper" id="loader" style='display: none;'>
        <div class="loader">
            <div class="mt-3"><img class="zmdi-hc-spin w60" src="<?= base_url() ?>assets/images/spinner.svg" alt="ERP"></div>
            <p>Saving...</p>        
        </div>
    </div>

    <div class="overlay"></div>

    <!-- Top Bar -->
    <nav class="top_navbar">
        <div class="container">
            <div class="row clearfix">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="navbar-logo">
                            <a href="javascript:void(0);" class="bars"></a>
                            <a class="navbar-brand" href="<?= $companyWebsite ? $companyWebsite : "#" ?>" <?= $companyWebsite ? "target='_blank'" : "" ?>><img src="<?= base_url() ?>assets/images/BC-WHITE.png" width="165" alt="ERP"><span class="ml-2"></span></a>
                        </div>
                        <div class="d-flex justify-content-end justify-content-md-between align-items-center flex-grow-1">
                            <div class="d-flex align-items-center currently_maintain hidden-xs">
                            </div>
                            <ul class="navbar">
                                <li class="search_bar hidden-sm">
                                    <div class="input-group">
                                        <i class="icon-magnifier"></i>
                                        <input type="text" class="form-control" placeholder="Search module..." id="searchModule" list="moduleList" autocomplete="off">
                                    </div>
                                    <datalist id="moduleList"></datalist>
                                </li>
                                <li class="dropdown notifications">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="icon-bell"></i><span class="label-count"><?= getCountUnreadNotification() ?></span></a>
                                    <ul class="dropdown-menu">
                                        <li class="header">New Notification</li>

                                        <li class="body" 
                                            style="height: auto;
                                                   max-height: 60vh;
                                                   overflow-y: scroll;">
                                            <ul class="menu list-unstyled">
                                        <?php
                                            $notifications = getNotificationData("all", "0");
                                            if (count($notifications) > 0) {
                                                foreach ($notifications as $notif) {
                                        ?>
                                            <li>
                                                <a href="<?= $notif["controller"] ?>" class="btnViewNotification" controller="<?= $notif["controller"] ?>" 
                                                id="<?= $notif['id'] ?>" 
                                                table="<?= $notif['table'] ?>">
                                                    <div class="media" title="<?= $notif["description"] ?>">
                                                        <img class="media-object" src="<?= base_url() ?>assets/notification/<?= $notif["icon"] ?>" alt="">
                                                        <div class="media-body">
                                                            <span class="name"><?= $notif["title"] ?> <span class="time"><?= $notif["time"] ?></span></span>
                                                            <span class="message"><?= $notif["description"] ?></span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        <?php          
                                                }
                                            } else {
                                        ?>
                                            <li class="text-center">
                                                <a href="javascript:void(0);" class="text-dark py-3">
                                                    <div class="media">
                                                        <span>No notification</span>
                                                    </div>
                                                </a>
                                            </li>
                                        <?php
                                            }
                                        ?>
                                            </ul>
                                        </li>

                                        <li class="footer"> <a href="<?= base_url('system_notification') ?>" class="btnViewAllNotification">View All</a> </li>
                                    </ul>
                                </li>                        
                                <li class="dropdown profile">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                        <img class="rounded-circle" style="height: 35px; width: 35px;" src="<?= base_url() ?>assets/upload-files/profile-images/<?=$sessionProfilePicture?>" alt="<?=$sessionFullname?>">
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <div class="user-info">
                                                <h5 class="user-name mb-0"><?=$sessionFullname ? $sessionFullname :"Alizee Thomas"; ?></h5>
                                                <p class="user-position font-13"><?=$sessionDesignationName?></p>
                                                <hr>
                                            </div>
                                        </li>                            
                                        <li>
                                            <a href="<?=base_url("hris/user_profile")?>">
                                                <i class="text-danger icon-user mr-2"></i> <span>My Profile</span> 
                                            </a>
                                        </li>
                                        <li>
                                                <a href="<?=base_url("pms/employee_taskboard")?>">
                                                    <i class="text-danger icon-notebook mr-2"></i><span>Taskboard</span> 
                                                </a>
                                        </li>
                                        <li><a href="<?= base_url('login/sign_out') ?>"><i class="text-danger icon-power mr-2"></i><span>Sign Out</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    </nav>

    <aside id="leftsidebar" class="sidebar">
        <div class="container">
            <div class="row clearfix">
                <div class="side-search_bar">
                    <li class="search_bar">
                        <div class="input-group">
                            <!-- <i class="icon-magnifier"></i> -->
                            <input type="text" class="form-control" placeholder="Search module..." id="searchModule" list="moduleList" autocomplete="off">
                        </div>
                        <datalist id="moduleList"></datalist>
                    </li>
                </div>
                <div class="col-12">
                    <div class="menu">
                        <ul class="list">
                            
<?php
    $modules = getModuleContent();
    $content = "";
    if ($modules) {
        foreach ($modules as $module) {
            $html = "";

            $moduleHeader = $module["header"];
            $moduleLength = count($module["category"]) + count($module["nocategory"]);

            if ($moduleLength > 0) {
                $html .= '<li class="header">'.$moduleHeader.'</li>';
                $moduleCategory   = $module["category"];
                $moduleNoCategory = $module["nocategory"];
                
                
                if (count($moduleCategory) > 0) {
                    foreach ($moduleCategory as $category) {
                        $icon = $category["icon"] ? $category["icon"] : "default.svg";
                        $moduleLength = count($category["modules"]);

                        if ($moduleLength > 0) {
                            $html .= '
                            <li class="">
                                <a href="javascript:void(0);" class="menu-toggle">
                                    <img src="'.base_url("assets/upload-files/icons/$icon").'" height="20" width="20">
                                    <span class="ml-1">'.$category["categoryName"].'</span>
                                </a>';

                            if ($moduleLength > 12) {
                            $html .= '
                            <ul class="ml-menu mega_menu">
                                <div class="row">';
                                foreach ($category["modules"] as $item) {
                                    $html .= '
                                    <div class="col-xl-3 col-md-12 col-sm-12">
                                    <li class="w-100">
                                        <a href="'.base_url().strtolower($item["controller"]).'">'.$item["name"].'</a>
                                    </li>
                                    </div>';
                                }
                                $html .= '</div>';
                            } else {
                                $html .= '
                                <ul class="ml-menu">';
                                foreach ($category["modules"] as $item) {
                                    $html .= '
                                    <li class="w-100">
                                        <a href="'.base_url().strtolower($item["controller"]).'">'.$item["name"].'</a>
                                    </li>';
                                }
                            }

                            $html .= '
                                </ul>
                            </li>';
                        }
                        
                    }
                }

                if (count($moduleNoCategory) > 0) {
                    foreach ($moduleNoCategory as $category) {
                        $icon = $category["icon"] ? $category["icon"] : "default.svg";
                        $html .= '
                        <li class="">
                            <a href="'.base_url().strtolower($category["controller"]).'">
                                <img src="'.base_url("assets/upload-files/icons/$icon").'" height="20" width="20">
                                '.$category["name"].'
                            </a>
                        </li>';
                    }
                }

            }

            $content .= $html;
        }
    }
    echo $content;
?>                            


                            <!-- ----- TEMPORARY MENU ----- -->
                            <!-- <li class="header"></li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-home"></i><span>Temporary Menu</span></a>
                                <ul class="ml-menu">
                                    <li><a href="<?= base_url('approval_setup') ?>">Approval Setup</a></li>
                                    <li><a href="<?= base_url('roles_permission') ?>">Roles and Permission</a></li>
                                    <li><a href="<?= base_url('system_notification') ?>">System Notification</a></li>
                                    <li><a href="<?= base_url('fms/bank') ?>">Bank</a></li>
                                    <li><a href="<?= base_url('ims/inventory_category') ?>">Inventory Category</a></li>
                                    <li><a href="<?= base_url('ims/inventory_conditions_masterfile') ?>">Inventory Condition Masterfile </a></li>
                                    <li><a href="<?= base_url('ims/inventory_item') ?>">Inventory Item</a></li>
                                    <li><a href="<?= base_url('ims/inventory_vendor_masterfile') ?>">Inventory Vendor</a></li>
                                    <li><a href="<?= base_url('hris/schedule_setup') ?>">Schedule Setup</a></li>
                                    <li><a href="<?= base_url('hris/leaves') ?>">Leave Request</a></li>
                                </ul>
                            </li> -->
                            <!-- ----- END TEMPORARY MENU ----- -->


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </aside>