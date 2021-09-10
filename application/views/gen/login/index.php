<?php if($this->session->has_userdata('adminSessionID')) redirect(base_url("dashboard")); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title><?=$title?></title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="<?=base_url('assets/login-assets/')?>images/icons/logo_bcgi.png"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>vendor/select2/select2.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>css/util.css">
	<link rel="stylesheet" type="text/css" href="<?=base_url('assets/login-assets/')?>css/main.css">

	  <!-- Font Awesome -->
	  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
	  <!-- Bootstrap core CSS -->
	  <link href="<?=base_url('assets/login-assets/')?>css/bootstrap.min.css" rel="stylesheet">
	  <!-- Material Design Bootstrap -->
      <!-- <link href="<?=base_url('assets/login-assets/')?>css/mdb.min.css" rel="stylesheet"> -->
      <!-- loader css -->
	  <link href="<?=base_url('assets/login-assets/')?>css/loading.min.css" rel="stylesheet">

<!--===============================================================================================-->
</head>
<style>
	#password-field:hover{
		cursor:pointer;
}

</style>
<body>
	<!-- <input type="hidden" name="base_url" id="base_url" value="<?= base_url() ?>"> -->
	<!-- <div>
        <img src="images/bb-loader-md.png" class="ld ld-dim" alt="" style="animation-duration:1.0s">
    </div> -->

	<div class="page-loader-wrapper" base_url="<?= base_url() ?>"></div>

	<div class="limiter">
		<div class="container-loginTACS">
			<div class="wrap-login100">

				<div class="login100-pic js-tilt" data-tilt>
					<script src="<?=base_url()?>assets/login-assets/animizer_downloads/canvas.js"></script>
					<!-- <img src="<?=base_url("assets/")?>images/project-logo.gif" alt=""> -->
					<img src="<?=base_url("assets/")?>images/project-logo.svg" alt="">
				</div>
					
					<form action="" method="POST" class="login100-form validate-form">

						<img src="<?=base_url("assets/")?>images/company-logo/company-logo.png" class="img-fluid" alt="">	
						<br>
						<br>
					<div class="login-form" id="login-form">
                        <div class="confirmation"></div>
						<div class="wrap-input100 validate-input mb-2" data-validate="Please provide a username.">
							<input class="input100 login-input validate" data-allowcharacters="[a-z][A-Z][0-9][ ][,][.][@][-][_]" minlength="5" maxlength="50" type="text" id="username" autocomplete="off" placeholder="Username">
							
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-user" aria-hidden="true"></i>
							</span>
						</div>
						<br>
						<div class="wrap-input100 validate-input mb-4" data-validate="Please provide a password.">
							<input class="input100 login-input validate" data-allowcharacters="[a-z][A-Z][0-9][ ][,][.][@][-][_]" minlength="5" maxlength="50" type="password" id="password" placeholder="Password">
							
							<span class="focus-input100"></span>
							
							<span class="symbol-input100">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</span>
							<span id="password-field" class="field-icon show-password fa fa-fw fa-eye">
							</span> 
							
						</div>
	
						<!-- <div class="container-login100-form-btn" > -->
							<button class="container-login100-form-btn" id="login-btn">
								<i class="fas fa-sign-in-alt"></i>&thinsp; Log in
							</button>
						<!-- </div> -->
					</div>
					</form>
			</div>

		</div>
	</div>
	
	

	
<!--===============================================================================================-->	
	<script src="<?=base_url('assets/login-assets/')?>vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="<?=base_url('assets/login-assets/')?>vendor/bootstrap/js/popper.js"></script>
	<script src="<?=base_url('assets/login-assets/')?>vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="<?=base_url('assets/login-assets/')?>vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
    <script src="<?=base_url('assets/login-assets/')?>vendor/tilt/tilt.jquery.min.js"></script>
    <script src="<?=base_url('assets/login-assets/')?>js/main.js"></script>
    <script type="text/javascript" src="<?=base_url('assets/login-assets/')?>js/mdb.min.js"></script>
	<script src="<?=base_url();?>assets/plugins/momentjs/moment.js"></script>
	<script src="<?=base_url('assets/plugins/momentjs/moment.js')?>"></script>
	<script src="<?=base_url('assets/js/daterangepicker.min.js')?>"></script>
	<script src="<?=base_url('assets/plugins/jquery-inputmask/jquery.inputmask.bundle.js')?>"></script>
<!--===================================CUSTOM=========================================================-->
	
    <script type="text/javascript" src="<?=base_url('assets/custom/js/gen/')?>login.js"></script>
    <script type="text/javascript" src="<?=base_url('assets/custom/js/')?>custom-validation.js"></script>
    <script type="text/javascript" src="<?=base_url('assets/custom/js/')?>operations.js"></script>
<!--===============================================================================================-->

</body>
</html>