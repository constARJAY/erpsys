
<style>
	thead tr th:hover {
		color: var(--text-white) !important;
	}

	.active-menu,
	.active-menu td {
		background: #cccccc38 !important;
		color: var(--secondary-color) !important;
		font-weight: 1000;
		transition: all 500ms;
		border-left: 5px solid var(--secondary-color) !important;
	}

	.user-role-menu:hover,
	.user-role-menu td:hover {
		background: #907f7f14 !important;
	}

	.btnEdit,
	.userRole {
		transition: all 250ms;
	}

	.btnEdit:hover,
	.userRole:hover {
		color: #dc3454 !important;
	}

	/*float layout*/
	/* 
    .item {
    width: 2vw;
    height: 2vw;
    background: #f2f2f2;
    margin: 1vw;
    border-radius:2px;
    font-size: 15px;
    font-weight:bold;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .float {
    max-width: 1200px;
    margin: 0 auto;
    }
    .float:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    }
    .float-item {
    float: left;
    } */

	.container_choices {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.item {
		background: #f2f2f2;
		padding: 5px;
		width: 45px;
		height: 38px;
		margin: 10px;

		line-height: 29px;
		font-weight: bold;
		font-size: 17px;
		text-align: center;
		border-radius: 8px;
	}

	/*float layout*/
	.float {
		max-width: 1200px;
		margin: 0 auto;
	}

	.float:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.float-item {
		float: left;
	}
</style>

<script>
 $(document).ready(function(){
	$(".body_area").attr('applicantID',encryptString(String("<?= $applicantID ?>")));
	 $(".body_area").attr('applicantSchedule',encryptString(String("<?= $applicantSchedule ?>")));
 })

</script>

<div class="body_area after_bg">
	<div class="block-header pb-0">
	</div>


	<div class="container">
		<div class="row clearfix">
			<div class="col-lg-12">
				<div class="card">

					<div class="body" id="main_body">
						<div class="row" id="loading-screen" style="visibility:hidden;"></div>
						<div class="row clearfix row-deck">
							<div class="col-12">
								<div class="row card-body" id="roles_permission_content">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<script src="<?= base_url('assets/custom/js/web/examination-form.js') ?>"></script>
