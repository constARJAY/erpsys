<!DOCTYPE html>
<html class="no-js " lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Web Portal Blackcoders">
    <title><?=$title?></title>

    <link rel="icon" href="<?=base_url("assets/images/logo.ico")?>" type="image/x-icon">
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

    <script src="<?=base_url('assets/js/jquery-3.2.1.min.js')?>"></script>
    <script src="<?=base_url('assets/js/popper.min.js')?>"></script>
    <script src="<?=base_url('assets/bundles/libscripts.bundle.js')?>"></script> 
    <script src="<?=base_url('assets/bundles/vendorscripts.bundle.js')?>"></script> 
</head>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dc3545;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #10948b;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}


.slider.round:before {
  border-radius: 50%;
}

.slider.disabled {
    background-color: #757575 !important;
    cursor: no-drop;
}

</style>

<body class="font-nunito fullwidth h_menu">

<input type="hidden" name="base_url" id="base_url" value="<?= base_url() ?>">

<div id="body" class="theme-cyan">
    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
            <div class="mt-3"><img class="zmdi-hc-spin w60" src="<?= base_url() ?>assets/images/loader.svg" alt="Amaze"></div>
            <p>Please wait...</p>        
        </div>
    </div>

    <!-- Save/Update Loader -->
    <div class="page-loader-wrapper" id="loader" style='display: none;'>
        <div class="loader">
            <div class="mt-3"><img class="zmdi-hc-spin w60" src="<?= base_url() ?>assets/images/spinner.svg" alt="Amaze"></div>
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
                            <a class="navbar-brand" href="index.html"><img src="<?= base_url() ?>assets/images/logo.svg" width="30" alt="Amaze"><span class="ml-2">Amaze</span></a>
                        </div>
                        <div class="d-flex justify-content-end justify-content-md-between align-items-center flex-grow-1">
                            <div class="d-flex align-items-center currently_maintain hidden-xs">
                            </div>
                            <ul class="navbar">
                                <li class="dropdown notifications">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="icon-bell"></i><span class="label-count">5</span></a>
                                    <ul class="dropdown-menu">
                                        <li class="header">New Message</li>
                                        <li class="body">
                                            <ul class="menu list-unstyled">
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar5.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Alexander <span class="time">13min ago</span></span>
                                                                <span class="message">Meeting with Shawn at Stark Tower by 8 o'clock.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar6.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Grayson <span class="time">22min ago</span></span>
                                                                <span class="message">You have 5 unread emails in your inbox.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar3.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Sophia <span class="time">31min ago</span></span>
                                                                <span class="message">OrderPlaced: You received a new oder from Tina.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>                
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar4.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Isabella <span class="time">35min ago</span></span>
                                                                <span class="message">Lara added a comment in Blazing Saddles.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar5.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Alexander <span class="time">13min ago</span></span>
                                                                <span class="message">Meeting with Shawn at Stark Tower by 8 o'clock.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar6.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Grayson <span class="time">22min ago</span></span>
                                                                <span class="message">You have 5 unread emails in your inbox.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0);">
                                                        <div class="media">
                                                            <img class="media-object" src="<?= base_url() ?>assets/images/xs/avatar8.jpg" alt="">
                                                            <div class="media-body">
                                                                <span class="name">Sophia <span class="time">48min ago</span></span>
                                                                <span class="message">OrderPlaced: You received a new oder from Tina.</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="footer"> <a href="javascript:void(0);">View All</a> </li>
                                    </ul>
                                </li>                        
                                <li class="dropdown profile">
                                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                        <img class="rounded-circle" src="<?= base_url() ?>assets/images/profile_av.png" alt="User">
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <div class="user-info">
                                                <h5 class="user-name mb-0">Alizee Thomas</h5>
                                                <p class="user-position font-13">Available</p>
                                                <a title="facebook" href="javascript:void(0);"><i class="zmdi zmdi-facebook"></i></a>
                                                <a title="twitter" href="javascript:void(0);"><i class="zmdi zmdi-twitter"></i></a>
                                                <a title="instagram" href="javascript:void(0);"><i class="zmdi zmdi-instagram"></i></a>
                                                <a title="linkedin" href="javascript:void(0);"><i class="zmdi zmdi-linkedin-box"></i></a>
                                                <a title="dribbble" href="javascript:void(0);"><i class="zmdi zmdi-dribbble"></i></a>
                                                <hr>
                                            </div>
                                        </li>                            
                                        <li><a href="profile.html"><i class="icon-user mr-2"></i> <span>My Profile</span> <span class="badge badge-success float-right">80%</span></a></li>
                                        <li><a href="taskboard.html"><i class="icon-notebook mr-2"></i><span>Taskboard</span> <span class="badge badge-info float-right">New</span></a></li>
                                        <li><a href="locked.html"><i class="icon-lock mr-2"></i><span>Locked</span></a></li>
                                        <li><a href="sign-in.html"><i class="icon-power mr-2"></i><span>Sign Out</span></a></li>
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
                <div class="col-12">
                    <div class="menu">
                        <ul class="list">
                            <?php
                                $modules = getModuleContent();
                                $content = "";
                                foreach ($modules as $key1 => $module) {
                                    $html = "";
                                    $flag = false;
                                    $header  = $module["header"];
                                    $modules = $module["modules"];
                                    $html .= '<li class="header">'.$header.'</li>';
                                    foreach ($modules as $key2 => $module2) {
                                        $category  = $module2["category"];
                                        $names     = $module2["names"];
                                        $icon      = $module2["icon"];
                                        $liClass   = $key2 == 0 ? "active open" : "";

                                        $flag = count($names) > 0 ? true : false;

                                        if ($category) {
                                            $html .= '
                                            <li class="">
                                                <a href="javascript:void(0);" class="menu-toggle">
                                                    <img src="'.base_url("assets/upload-files/icons/$icon").'" height="25" width="25">
                                                    <span class="ml-1">'.$category.'</span>
                                                </a>';

                                            if (count($names) > 12) {
                                                $html .= '
                                                <ul class="ml-menu mega_menu">
                                                <div class="row">';
                                                foreach ($names as $key3 => $item) {
                                                    $html .= '
                                                    <div class="col-xl-3 col-md-4 col-sm-12">
                                                    <li class="">
                                                        <a href="'.$item["controller"].'">'.$item["name"].'</a>
                                                    </li>
                                                    </div>';
                                                }
                                                $html .= '</div>';
                                            } else {
                                                $html .= '
                                                <ul class="ml-menu">';
                                                foreach ($names as $key3 => $item) {
                                                    $liClass2 = $key3 == 0 ? "active" : "";
                                                    $html .= '
                                                    <li class="">
                                                        <a href="'.$item["controller"].'">'.$item["name"].'</a>
                                                    </li>';
                                                }
                                            }

                                            $html .= '
                                                </ul>
                                            </li>';
                                        } else {
                                            $html .= '
                                            <li class="">
                                                <a href="'.$names[0]["controller"].'">
                                                    <img src="'.base_url("assets/upload-files/icons/$icon").'" height="25" width="25">
                                                    '.$names[0]["name"].'
                                                </a>
                                            </li>';
                                        }
                                    }
                                    if ($flag) {
                                        $content .= $html;
                                    }
                                }
                                echo $content;
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </aside>