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
                    <h1 class="mb-1 mt-1">Leave Masterfile</h1>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button class="btn btn-default btn-add ml-2 d-flex justify-content-center align-items-center addleave"><i class="icon-plus px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Add&nbsp;</span> Leave</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content">
                <table class="table table-bordered table-striped table-hover" id="tableLeave">
                        <thead>
                            <tr class="text-left">
                                <th>Leave Code</th>
                                <th>Leave Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>LVE-20-00001</td>
                            <td>VACATION LEAVE</td>
                            <td> <span class="badge badge-outline-success w-100 p-2">Active</span></td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editleave" id=""><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>
                        <tr>
                            <td>LVE-20-00002</td>
                            <td>SICK LEAVE</td>
                            <td> <span class="badge badge-outline-danger w-100 p-2">Inactive</span></td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editleave" id=""><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>
                    </tbody>
                </table>

                </div>
            </div>
        </div>
	</div>
</div>
<!-- ----- ADD MODAL ----- -->
<div id="modal_leave" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold modal_leave_header">ADD leave</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_leave_content">

            </div>

        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_addleave" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD LEAVE</h2>
				<p class="text-center my-2">Are you sure you want to add this leave?</p>
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

<div id="confirmation-modal_editleave" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">UPDATE LEAVE</h2>
				<p class="text-center my-2">Are you sure you want to update this leave?</p>
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
<!-- ----- END CONFIRMATION MODAL ----- -->

<script>
$(document).ready(function(){
    
    function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableLeave')){
                $('#tableLeave').DataTable().destroy();
            }
            
            var table = $("#tableLeave").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "40%" },
                    { targets: 1, width: "40%" },
                    { targets: 2, width: "10%" },
                    { targets: 3, width: "10%" }
                ],
            });
    }
    initDataTables();
    
    
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addleave", function(){
    $("#modal_leave").modal("show");
    $(".modal_leave_header").text("ADD LEAVE");
    $("#modal_leave_content").html(preloader);
    let modal_leave_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_leave_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="leaveName" 
                                                                    id="input_leaveName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="">
                                                                <div class="invalid-feedback d-block" id="invalid-input_leaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">leave Status</label>
                                                                <select class="form-control validate" id="input_leaveName">
                                                                    <option dissabled>Select status</option>
                                                                    <option>Active</option>
                                                                    <option>Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-input_leaveName"></div>
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
        $("#modal_leave_content").html(modal_leave_content);
        initAll();
    },500);

    
});

$(document).on("click",".editleave", function(){
    $(".modal_leave_header").text("EDIT leave");

    let rowParent   = $(this).parent().parent();
    let rowContent  = rowParent.children();
    console.log(rowContent);
    $("#modal_leave").modal("show");
    $("#modal_leave_content").html(preloader);
    let statusOption = rowContent[2]["outerText"] == "Active" ?`<option selected>Active</option> <option >Inactive</option>` : `<option >Active</option> <option selected>Inactive</option>`;
    let modal_leave_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_leave_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">leave Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="leaveName" 
                                                                    id="input_leaveName" 
                                                                    data-allowcharacters="[A-Z][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    required  
                                                                    value="${rowContent[1]["outerText"]}">
                                                                <div class="invalid-feedback d-block" id="invalid-input_leaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">leave Status</label>
                                                                <select class="form-control validate" id="input_leaveName">
                                                                    ${statusOption}>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-input_leaveName"></div>
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
        $("#modal_leave_content").html(modal_leave_content);
    },500);
            
      
});

// OPENING CONFIRMATION MODAL

$(document).on("click","#btnSave", function(){
    $("#modal_leave").modal("hide");
    $("#confirmation-modal_addleave").modal("show");
});

$(document).on("click","#btnUpdate", function(){
    $("#modal_leave").modal("hide");
    $("#confirmation-modal_editleave").modal("show");
});

// CLOSE CONFIRMATION MODAL
$(document).on("click",".btnCloseConfirmationAdd", function(){
    $("#modal_leave").modal("show");
    $("#confirmation-modal_addleave").modal("hide");
});

$(document).on("click",".btnSaveConfirmationEdit", function(){
    $("#modal_leave").modal("show");
    $("#confirmation-modal_editleave").modal("hide");
});


$(document).on("click","#confirmation-modal_editleave",function(){
    $("#modal_leave").modal("hide");
    $("#confirmation-modal_editleave").modal("show");
});

$(document).on("click", ".btnCloseConfirmationEdit", function(){
    $("#modal_leave").modal("show");
    $("#confirmation-modal_editleave").modal("hide");
});


</script>