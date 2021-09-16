<div class="body_area">
    <div class="block-header pb-0"></div>
    <div class="container" style="margin-top:50px;">
		<div class="row">
            <div class="col-2"></div>
                <div class="col-8" id="page_content">
                    <div id="table_content" data-pending="<?=$pending;?>" data-jobid="<?=$jobID;?>" data-applicantid="<?=$this->session->userdata('session_applicant_id');?>"></div>
                </div>
            <div class="col-2"></div>
        </div>
	</div>
</div>

<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/web/job.js') ?>"></script>