<style>

	.panel-title {
	position: relative;
	}
	
	.panel-title::after {
	content: "\f107";
	color: #fff;
	top: 15px;
	right: 10px;
	position: absolute;
	font-family: "FontAwesome"
	}

	.panel-title[aria-expanded="true"]::after {
	content: "\f106";
	}

	table thead tr.theadheader th:hover {
		background-color: var(--bg-primary);
		color: white !important;
	}
	table thead tr.theadlabel th:hover {
		color: black !important;
	}

</style>

<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-money-check"></i> &nbsp;Payroll Modules</li>
						<li class="breadcrumb-item active">Timekeeping Module</li>
					</ul>
					<h1 class="mt-3">Timekeeping Module</h1>
					<span>This module is used to monitor and view the attendance activity for each employee.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton">
						<?php if(isCreateAllowed(109)){ ?>
							<button type="button" class="btn btn-default btn-add" id="btnAddExam"> <i class="icon-plus"></i> &nbsp;Add Timekeeping</button>
						<?php  } ?>
                    </ul>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-12">
                <div class="card-body" id="page_content"></div>
            </div>
        </div>
	</div>
</div>

<!-- ----- ADD MODAL ----- -->
<div id="modal_timekeeping_module" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">Add Timekeeping</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="modal_timekeeping_module_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<script src="<?=base_url()?>assets/custom/js/gen/approver-function.js"></script>
<script src="<?=base_url()?>assets/custom/js/hris/timekeeping-module.js"></script>