<div class="body_area">
    <div class="block-header">
        <div class="container">
            <div class="row clearfix">
                <div class="col-8">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li class="breadcrumb-item">HRIS</li>
                        <li class="breadcrumb-item active">Masterfile</li>
                    </ul>
                    <h1 class="mb-1 mt-1">Holiday Masterfile</h1>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addHoliday"><i class="icon-plus px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Holiday</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content">
                <table class="table table-bordered table-striped table-hover" id="tableHoliday">
                        <thead>
                            <tr class="text-left">
                                <th>Holiday Code</th>
                                <th>Holiday Name</th>
                                <th>Holiday Date</th>
                                <th>Holiday Type</th>
                                <th>Holiday Percentage</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>HLD-20-00001</td>
                            <td>PEOPLE POWER</td>
                            <td>March 25, 2021</td>
                            <td>Regular Holiday</td>
                            <td class="text-right">20.00%</td>
                            <td> <span class="badge badge-outline-success w-100 p-2">Active</span></td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editHoliday" id=""><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>
                        <tr>
                            <td>HLD-20-00002</td>
                            <td>CHINESE NEW YEAR</td>
                            <td>February 12, 2021</td>
                            <td>Special Holiday</td>
                            <td class="text-right">20.00%</td>
                            <td> <span class="badge badge-outline-danger w-100 p-2">Inactive</span></td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editHoliday" id=""><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>
                    </tbody>
                </table>

                </div>
            </div>
        </div>
	</div>
</div>
<!-- ----- ADD MODAL ----- -->
<div id="modal_holiday" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_holiday_header">ADD HOLIDAY</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_holiday_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->

<script src="<?=base_url("assets/custom/js/hris/holiday.js")?>"></script>