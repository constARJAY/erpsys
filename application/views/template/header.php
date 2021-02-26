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
                            <li class="header">MAIN</li>
                            <li class="active open">
                                <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-home"></i><span>Dashboard</span></a>
                                <ul class="ml-menu">
                                    <li class="active"><a href="index.html">Analytics Dashboard</a></li>
                                    <li><a href="hopital/index.html">Hospital Template</a></li>
                                    <li><a href="hr/index.html">HRMS Template</a></li>
                                    <li><a href="university/index.html">University Template</a></li>
                                    <li><a href="realestate/index.html">RealEstate Template</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-apps"></i><span>App</span></a>
                                <ul class="ml-menu">
                                    <li><a href="mail-inbox.html">Inbox</a></li>
                                    <li><a href="chat.html">Chat</a></li>
                                    <li><a href="events.html">Calendar</a></li>
                                    <li><a href="file-dashboard.html">File Manager</a></li>
                                    <li><a href="contact.html">Contact list</a></li>
                                    <li><a href="blog-dashboard.html">Blog</a></li>
                                    <li><a href="app-ticket.html">Support Ticket</a></li>
                                    <li><a href="taskboard.html">Taskboard</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-shopping-basket"></i><span>Ecommerce</span></a>
                                <ul class="ml-menu">
                                    <li><a href="ec-dashboard.html">Dashboard</a></li>
                                    <li><a href="ec-product.html">Products</a></li>
                                    <li><a href="ec-product-detail.html">Product Detail</a></li>
                                    <li><a href="ec-product-List.html">Product List</a></li>
                                    <li><a href="ec-product-order.html">Orders page</a></li>
                                    <li><a href="ec-product-cart.html">Cart page</a></li>
                                    <li><a href="ec-checkout.html">Checkout</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-layers"></i><span>UI Elements</span></a>
                                <ul class="ml-menu mega_menu">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-12">
                                            <li><a href="ui-kit.html">UI KIT</a></li>                    
                                            <li><a href="ui-alerts.html">Alerts</a></li>                    
                                            <li><a href="ui-collapse.html">Collapse</a></li>
                                            <li><a href="ui-colors.html">Colors</a></li>
                                        </div>
                                        <div class="col-md-3 col-sm-12">
                                            <li><a href="ui-dialogs.html">Dialogs</a></li>
                                            <li><a href="ui-icons.html">Icons</a></li>                    
                                            <li><a href="ui-listgroup.html">List Group</a></li>
                                            <li><a href="ui-mediaobject.html">Media Object</a></li>
                                        </div>
                                        <div class="col-md-3 col-sm-12">
                                            <li><a href="ui-modals.html">Modals</a></li>
                                            <li><a href="ui-notifications.html">Notifications</a></li>                    
                                            <li><a href="ui-progressbars.html">Progress Bars</a></li>
                                            <li><a href="ui-rangesliders.html">Range Sliders</a></li>
                                        </div>
                                        <div class="col-md-3 col-sm-12">
                                            <li><a href="ui-sortablenestable.html">Sortable & Nestable</a></li>
                                            <li><a href="ui-tabs.html">Tabs</a></li>
                                            <li><a href="ui-waves.html">Waves</a></li>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li class="header">FORMS, CHARTS, TABLES</li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-file-text"></i><span>Forms</span></a>
                                <ul class="ml-menu">
                                    <li><a href="form-basic.html">Basic Elements</a></li>
                                    <li><a href="form-advanced.html">Advanced Elements</a></li>
                                    <li><a href="form-examples.html">Form Examples</a></li>
                                    <li><a href="form-validation.html">Form Validation</a></li>
                                    <li><a href="form-wizard.html">Form Wizard</a></li>
                                    <li><a href="form-editors.html">Editors</a></li>
                                    <li><a href="form-upload.html">File Upload</a></li>
                                    <li><a href="form-img-cropper.html">Image Cropper</a></li>
                                    <li><a href="form-summernote.html">Summernote</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-format-list-bulleted"></i><span>Tables</span></a>
                                <ul class="ml-menu">                        
                                    <li><a href="table-normal.html">Normal Tables</a></li>
                                    <li><a href="table-jquerydatatable.html">Jquery Datatables</a></li>
                                    <li><a href="table-editable.html">Editable Tables</a></li>                                
                                    <li><a href="table-color.html">Tables Color</a></li>
                                    <li><a href="table-filter.html">Tables Filter</a></li>
                                </ul>
                            </li>            
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-chart"></i><span>Charts</span></a>
                                <ul class="ml-menu">
                                    <li><a href="apex.html">Apex chart</a></li>
                                    <li><a href="c3.html">C3 chart</a></li>
                                    <li><a href="echart.html">eCharts</a></li>
                                    <li><a href="morris.html">Morris chart</a></li>
                                    <li><a href="flot.html">Flot chart</a></li>
                                    <li><a href="chartjs.html">ChartJS</a></li>
                                    <li><a href="jquery-knob.html">Jquery Knob</a></li>
                                    <li><a href="sparkline.html">Sparkline</a></li>
                                </ul>
                            </li>
                            <li class="header">EXTRA COMPONENTS</li>                    
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-widgets"></i><span>Widgets</span></a>
                                <ul class="ml-menu">
                                    <li><a href="widgets-app.html">Apps Widgetse</a></li>
                                    <li><a href="widgets-data.html">Data Widgetse</a></li>
                                    <li><a href="widgets-chart.html">Chart Widgetse</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-lock"></i><span>Auth</span></a>
                                <ul class="ml-menu">
                                    <li><a href="sign-in.html">Sign In</a></li>
                                    <li><a href="sign-up.html">Sign Up</a></li>
                                    <li><a href="forgot-password.html">Forgot Password</a></li>
                                    <li><a href="404.html">Page 404</a></li>
                                    <li><a href="403.html">Page 403</a></li>
                                    <li><a href="500.html">Page 500</a></li>
                                    <li><a href="503.html">Page 503</a></li>
                                    <li><a href="page-offline.html">Page Offline</a></li>
                                    <li><a href="locked.html">Locked Screen</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-folder"></i><span>Pages</span></a>
                                <ul class="ml-menu">
                                    <li><a href="blank.html">Blank Page</a></li>
                                    <li><a href="profile.html">Profile</a></li>
                                    <li><a href="teams-board.html">Teams Board</a></li>
                                    <li><a href="projects.html">Projects List</a></li>
                                    <li><a href="image-gallery.html">Image Gallery</a></li>
                                    <li><a href="timeline.html">Timeline</a></li>
                                    <li><a href="horizontal-timeline.html">Horizontal Timeline</a></li>
                                    <li><a href="pricing.html">Pricing</a></li>
                                    <li><a href="invoices.html">Invoices</a></li>
                                    <li><a href="faqs.html">FAQs</a></li>
                                    <li><a href="search-results.html">Search Results</a></li>
                                    <li><a href="helper-class.html">Helper Classes</a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-map"></i><span>Maps</span></a>
                                <ul class="ml-menu">
                                    <li><a href="map-yandex.html">YandexMap</a></li>
                                    <li><a href="map-jvectormap.html">jVectorMap</a></li>
                                </ul>
                            </li>                
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </aside>