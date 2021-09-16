<link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/employee-module.css') ?>">

<style>
    .card{
        border:none;
    }

    .sidebar-web{

    }

    .sidebar-web-menu{
        padding: 15px 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
    }

    .sidebar-web-menu.active{
        background: #dc3450;
        color: white;
        border-radius: 5px;
    }

    .sidebar-web-menu.active:hover{
        color: white;
    }

    .sidebar-web-menu:hover{
        color: #dc3450;
    }

    .sidebar-web-menu .fas{
        padding-right:5px;
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

    .view-icon { right: 0px;}

    .left-addon input  { padding-left:  40px; }
    .right-addon input { padding-right: 40px; }

    .jobTitle{
        font-size: 20px;
        font-weight: 700;
        color: #dc3450;
    }

    .appliedBadge{
        font-size: 12px;
        margin: 5px 0px;
    }

    .jobBadge{
        font-size: 12px;
        margin: 5px 0px 15px;
    }
</style>

<div class="body_area">
    <div class="block-header pb-0"></div>
    <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-2 sidebar-web">
                <div class="row p-t-15">
                    <div class="col-12 sidebar-web-menu active" id="profile">
                        <i class="fas fa-address-card"></i>
                        My Profile
                    </div>

                    <div class="col-12 sidebar-web-menu" id="appliedjob">
                        <i class="fas fa-briefcase"></i>
                        Applied Job
                    </div>

                    <div class="col-12 sidebar-web-menu" id="vacant">
                        <i class="fas fa-search"></i>
                        Jobs & Vacancies
                    </div>

                    <div class="col-12 sidebar-web-menu" id="logout">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </div>
                </div>
            </div>
            <div class="card col-10">
                <div class="card-body" id="page_content" style="border-left: solid 1px #e6e6e6;">
                    <div id="table_content" data-applicantid="<?=$this->session->userdata('session_applicant_id');?>"></div>
                </div>
            </div>
        </div>
	</div>
</div>

<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/web/applicant.js') ?>"></script>