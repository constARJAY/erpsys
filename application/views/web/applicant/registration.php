
<link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/employee-module.css') ?>">

<style>
    h3{
        font-size: 1.2rem;
    }

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

<div class="body_area after_bg">
     <div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<h1 class="mt-3">Applicant Registration Form</h1>
					<span>Complete the form below to sign up</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content">
                    <div id="table_content"></div>
                </div>
            </div>
        </div>
	</div>
</div>

<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/web/applicant.js') ?>"></script>