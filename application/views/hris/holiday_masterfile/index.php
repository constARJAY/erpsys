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


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_addholiday" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD HOLIDAY</h2>
				<p class="text-center my-2">Are you sure you want to add this holiday?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationAdd"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationAdd"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_editholiday" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">UPDATE HOLIDAY</h2>
				<p class="text-center my-2">Are you sure you want to update this holiday?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationEdit"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationEdit"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="confirmation-modal_deleteholiday" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationDelete" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">DELETE HOLIDAY</h2>
				<p class="text-center my-2">Are you sure you want to delete this user HOLIDAY?</p>
			</div>
			<div class="modal-footer">
				<div class="w-100 text-right">
					<button type="button" class="btn btn-primary shadow-none" id="btnSaveConfirmationDelete"> YES</button>
					<button type="button" class="btn btn-danger shadow-none btnCloseConfirmationDelete"> NO</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- ----- END CONFIRMATION MODAL ----- -->

<script>
$(document).ready(function(){
    
    function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableHoliday')){
                $('#tableHoliday').DataTable().destroy();
            }
            
            var table = $("#tableHoliday").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "15%" },
                    { targets: 1, width: "25%" },
                    { targets: 5, width: "10%" },
                    { targets: 6, width: "10%" }
                ],
            });
    }
    initDataTables();
    
    
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addHoliday", function(){
    $("#modal_holiday").modal("show");
    $(".modal_holiday_header").text("ADD HOLIDAY");
    $("#modal_holiday_content").html(preloader);
    let modal_holiday_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="holidayName" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control daterange validate" 
                                                                    name="username" 
                                                                    id="inputholidayDate" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type</label>
                                                                <select class="form-control validate" id="inputholidayType">
                                                                    <option dissabled>Select Holiday Type</option>
                                                                    <option>Regular Holiday</option>
                                                                    <option>Special Holiday</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Percentage</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control text-right validate" 
                                                                    name="username" 
                                                                    id="inputholidayPercentage" 
                                                                    data-allowcharacters="[0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Status</label>
                                                                <select class="form-control validate" id="inputholidayName">
                                                                    <option dissabled>Select status</option>
                                                                    <option>Active</option>
                                                                    <option>Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>
                                                <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_holiday_content").html(modal_holiday_content);
        initAll();
    },500);

    
});

$(document).on("click",".editHoliday", function(){
    $(".modal_holiday_header").text("EDIT HOLIDAY");

    let rowParent   = $(this).parent().parent();
    let rowContent  = rowParent.children();
    // console.log(rowContent);
    $("#modal_holiday").modal("show");
    $("#modal_holiday_content").html(preloader);
    let statusOption        = rowContent[5]["outerText"] == "Active" ?`<option selected>Active</option> <option >Inactive</option>` : `<option >Active</option> <option selected>Inactive</option>`;
    let holidayTypeOption   = rowContent[3]["outerText"] == "Regular Holiday" ? `<option dissabled>Select Holiday Type</option><option selected>Regular Holiday</option><option>Special Holiday</option>` : `<option dissabled>Select Holiday Type</option><option>Regular Holiday</option><option selected>Special Holiday</option>`;
    let modal_holiday_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="holidayName" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="${rowContent[1]["outerText"]}">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control daterange validate" 
                                                                    name="username" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="${rowContent[2]["outerText"]}">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type</label>
                                                                <select class="form-control validate" id="inputholidayType">
                                                                    ${holidayTypeOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Percentage</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control text-right validate" 
                                                                    name="username" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="${rowContent[3]["outerText"].replace("%","")}">
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Status</label>
                                                                <select class="form-control validate" id="inputholidayName">
                                                                    ${statusOption}>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnUpdate">UPDATE</button>
                                                <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_holiday_content").html(modal_holiday_content);
    },500);
            
      
});

// OPENING CONFIRMATION MODAL

$(document).on("click","#btnSave", function(){
    $("#modal_holiday").modal("hide");
    $("#confirmation-modal_addholiday").modal("show");
});

$(document).on("click","#btnUpdate", function(){
    $("#modal_holiday").modal("hide");
    $("#confirmation-modal_editholiday").modal("show");
});

// CLOSE CONFIRMATION MODAL
$(document).on("click",".btnCloseConfirmationAdd", function(){
    $("#modal_holiday").modal("show");
    $("#confirmation-modal_addholiday").modal("hide");
});

$(document).on("click",".btnSaveConfirmationEdit", function(){
    $("#modal_holiday").modal("show");
    $("#confirmation-modal_editholiday").modal("hide");
});


$(document).on("click","#confirmation-modal_editholiday",function(){
    $("#modal_holiday").modal("hide");
    $("#confirmation-modal_editholiday").modal("show");
});

$(document).on("click", ".btnCloseConfirmationEdit", function(){
    $("#modal_holiday").modal("show");
    $("#confirmation-modal_editholiday").modal("hide");
});


</script>