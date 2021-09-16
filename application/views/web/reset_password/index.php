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

    .view-icon { right: 0px;}

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
                        <img class="img-fluid" src="http://localhost/erpsys/assets/modal/activate_success.png" alt="" style="max-width:40%; padding:0px;">
                        <div class="row" id="page_content">
                            <div class='col-12 mb-4 mt-4'>     
                                <h3 class="module-header text-primary font-weight-bold">CREATE A NEW PASSWORD</h3> 
                                <p>Your identity has been verified! Set your new password</p>
                            </div>

                            <div class="col-12">
                                <div class="form-group inner-addon left-addon">
                                    <i class="fas fa-key login-icon"></i>
                                    <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="fas fa-eye view-icon"></i></a>
                                    <input type="password"
                                            class="form-control validate login-input"
                                            name="applicantPassword"
                                            id="applicantPassword"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            required
                                            tabindex="1"
                                            style="background-image: none;">
                                    <div class="invalid-feedback text-left d-block" id="invalid-applicantPassword"></div>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="form-group inner-addon left-addon">
                                    <i class="fas fa-key login-icon"></i>
                                    <a href="javascript: void(0)" class="btnTogglePassword" show="false"><i class="fas fa-eye view-icon"></i></a>
                                    <input type="password"
                                            class="form-control login-input"
                                            name="applicantConfirmPassword"
                                            id="applicantConfirmPassword"
                                            data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_][ ]"
                                            minlength="2"
                                            maxlength="75"
                                            required
                                            tabindex="2"
                                            style="background-image: none;">
                                    <div class="invalid-feedback text-left d-block" id="invalid-applicantConfirmPassword"></div>
                                </div>
                            </div>

                            <div class="col-12">
                                <button class="btn btn-save w-100" style="padding:10px;" id="btnReset" data-applicantID="<?=$applicantID?>"><i class="fas fa-refresh"></i> RESET PASSWORD</button>
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
<script src="<?= base_url('assets/custom/js/web/reset_password.js') ?>"></script>
