<style>
    .login-input{
        border-radius: 10px;
        height: 50px;
        font-weight: 700;
        padding: 25px;
    }

    .inner-addon { position: relative; }

    .login-icon, .view-icon{ color: #949494; }

    .inner-addon .login-icon, .inner-addon .view-icon {
        position: absolute;
        padding: 18px;
    }

    .left-addon .login-icon  { left:  0px;}
    .right-addon .login-icon { right: 0px;}

    .view-icon { right: 10px;}

    .left-addon input  { padding-left:  40px; }
    .right-addon input { padding-right: 40px; }
</style>

<div class="body_area">
    <div class="block-header pb-0"></div>
    <div class="container">
        <div class="row clearfix row-deck">
            <div class="col-12">
                <div class="container row">
                    <div class="col-4"></div>
                    <div class="col-4 text-center" style="margin:100px 0px;">
                        <!-- <img class="img-fluid" src="http://localhost/erpsys/assets/images/company-logo/company-logo.png" alt="" style="max-width:20%; padding:0px;"> -->
                        <div class="row" id="page_content">
                            <div class='col-12 mb-4 mt-4'>
                                <h3 class="module-header text-primary text-left font-weight-bold">LOGIN PAGE</h3> 
                                <p class='text-left'>Please enter your username and password to login.</p>
                            </div>

                            <div class="col-12 alert-message">
                                
                            </div>

                            <div class="col-12">
                                <div class="form-group inner-addon left-addon">
                                    <i class="fas fa-user login-icon"></i>
                                    <input type="text" tabindex="1" class="form-control login-input validate" data-allowcharacters="[a-z][A-Z][0-9][ ][,][.][@][-][_]" minlength="5" maxlength="50" type="text" id="applicantUsername" autocomplete="off" placeholder="Username" required>
                                    <div class="invalid-feedback text-left d-block" id="invalid-username"></div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-group inner-addon left-addon">
                                    <i class="fas fa-key login-icon"></i>
                                    <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="fas fa-eye view-icon"></i></a>
                                    <input type="password" tabindex="2" class="form-control login-input validate" data-allowcharacters="[a-z][A-Z][0-9][ ][,][.][@][-][_]" minlength="5" maxlength="50" type="password" id="applicantPassword" placeholder="Password" required>
                                    <div class="invalid-feedback text-left d-block" id="invalid-password"></div>
                                </div>
                            </div>

                            <div class="col-6">
                                <p class='text-left'><a href="<?=base_url('web/applicant/registration')?>">Register</a></p>
                            </div>

                            <div class="col-6">
                                <p class='text-right'><a href="<?=base_url('web/forgot_password')?>">Forgot Password?</a></p>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-save w-100" tabindex="3" style="padding:10px;" id="btnLogin"><i class="fas fa-sign-in"></i> LOGIN</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-4"></div>
                </div>
            </div>
        </div>
	</div>
</div>

<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/web/login.js') ?>"></script>