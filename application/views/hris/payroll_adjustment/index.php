<style>

	/* tr.odd td.dtfc-fixed-left, tr.odd td.dtfc-fixed-right {
		background: #f2f2f2;
		border-left: 1px solid rgb(222 226 230);
		border-right: 1px solid rgb(222 226 230);
	}

	tr th.dtfc-fixed-left, tr th.dtfc-fixed-right,
	tr.even td.dtfc-fixed-left, tr.even td.dtfc-fixed-right {
		background: #fff;
		border-left: 1px solid rgb(222 226 230);
		border-right: 1px solid rgb(222 226 230);
	}

	table thead tr.theadheader th:hover {
		background-color: var(--bg-primary);
		color: white !important;
	}
	
	table thead tr.theadlabel th:hover {
		color: black !important;
	}

	table.dataTable thead th, table.dataTable thead td {
		border-bottom: none;
	} */

	.tooltip-inner {
		max-width: 591px !important;
		white-space: pre-wrap !important;
		text-align: left !important;
	}

</style>

<div class="body_area after_bg">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="fas fa-money-check"></i> &nbsp;Payroll Modules</li>
						<li class="breadcrumb-item active">Payroll Adjustment</li>
					</ul>
					<h1 class="mt-3">Payroll Adjustment</h1>
					<span>This module is used to monitor and view the attendance activity for each employee.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton">
						<?php if(isCreateAllowed(111)){ ?>
							<button type="button" class="btn btn-default btn-add" id="btnAddExam"> <i class="icon-plus"></i> &nbsp;Add Payroll</button>
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
<div id="modal_payroll_adjustment" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">Add Payroll Adjustment</h5>
				<button type="button" class="close btnCancel" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>
            <div id="modal_payroll_adjustment_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.11.3/fc-4.0.1/datatables.min.css"/> -->
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.11.3/fc-4.0.1/datatables.min.js"></script>

<script src="<?=base_url()?>assets/custom/js/gen/approver-function.js"></script>
<script src="<?=base_url()?>assets/custom/js/hris/payroll-adjustment.js"></script>