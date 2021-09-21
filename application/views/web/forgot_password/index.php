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
        pointer-events: none;
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
                    <div class="offset-md-4 col-md-4 col-sm-12 text-center my-5">
                        <!-- <img class="img-fluid" src="http://localhost/erpsys/assets/images/company-logo/company-logo.png" alt="" style="max-width:20%; padding:0px;"> -->
                        <div class="row">
                            <div class='col-12 mb-4 mt-4'>
                                <h3 class="module-header text-primary text-center font-weight-bold">Forgot Password?</h3> 
                                <p class='text-center'>Enter the email address associated with your account.</p>
                            </div>
                            <div class="col-12">
                                <div class="form-group inner-addon left-addon" id="page_content">
                                    <i class="fas fa-envelope login-icon"></i>
                                    <input type="email"
                                        class="form-control validate login-input"
                                        data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][@][_]"
                                        minlength="2"
                                        maxlength="100"
                                        name="applicantEmail"
                                        id="applicantEmail"
                                        autocomplete="off"
                                        placeholder="Email address"
                                        required
                                        value=""
                                        title="Email">
                                    <div class="invalid-feedback d-block text-left" id="invalid-applicantEmail"></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-save w-100" style="padding:10px;" id="btnSend"><i class="fas fa-send"></i> Send</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>

<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/web/forgot_password.js') ?>"></script>