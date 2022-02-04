<?php

   
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

<style>
.body_area{
    margin:auto !important;
}

</style>
<body class="font-nunito fullwidth h_menu">

<div id="body" class="theme-blackbox">
    <!-- Page Loader -->
    <div class="page-loader-wrapper" base_url="<?= base_url() ?>">
        <div class="loader d-none">
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
