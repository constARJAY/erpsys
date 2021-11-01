<style>
.list-group.panel > .list-group-item {
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px
}
.list-group-submenu {
  margin-left:20px;
}

.avatar img {
  border-radius: 50%;
  border: 2px solid #ffff;
  position: relative;
  left: -5px;
  margin-left: -25px;
  z-index: 1;
}

.avatars {
  direction: rtl;  /* This is to get the stack with left on top */
  text-align: left;  /* Now need to explitly align left */
  padding-left: 25px;  /* Same value as the negative margin */
}

#proxy_label{
  color: black;
  cursor: pointer;
}

#proxy_label:hover{
  text-decoration: underline;
 
}

#file_input_id{
  display:none;
}

div.modalContentLeft {
  /* background-color: lightblue;
  width: 110px; */
  height: 500px;
  overflow: auto;
}

#modalContentLeft::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#modalContentLeft::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

#modalContentLeft::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #D62929;
}

/* .container {
  position: relative;
  width: 100%;
  max-width: 400px;
} */

.image {
  display: block;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .3s ease;
  background-color: red;
}

.container:hover .overlay {
  opacity: 1;
}

.icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.fa-eye:hover {
  color: #eee;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  /* display: none; */
  position: relative;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: auto;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}


.log-content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.log-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
select{
  text-align-last: center;
}

.c-avatar__status {
    z-index: 9999;
    width: 15px;
    height: 15px;
    background:  #ffc107;
    border: 2px solid white;
    position: absolute;
    bottom: 3%;
    border-radius: 100%;
    margin-left: -7px;
}

</style>
<div class="body_area after_bg ">
	<div class="block-header pb-0">
		<div class="container" id="headerContainer">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
                    <ul class="breadcrumb pl-0 pb-0 ">
                        <li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
                        <li class="breadcrumb-item"><i class="fas fa-folder-open"></i>&nbsp;Project Modules</li>
                        <li class="breadcrumb-item active">Employee Taskboard</li>
                    </ul>
                    <h1 class="mt-3">Employee Taskboard</h1>
                    <span>This module is used to manage and monitor the project progress and status.</span>
				</div>
				<div class="col-lg-6 col-md-12 text-md-right" id="headerButton">
				</div>
                <div class="bh_divider appendHeader"></div>
			</div>
		</div>
	</div>

    <div class="container">
    	<div class="row clearfix row-deck mx-1">
    		<div class="card col-2 ">

    			<div class="text-primary font-weight-bold mb-2 mt-4 ml-2" style="font-size: 1.5rem;">
    				<span>List of projects</span>
    				<hr>
    			</div>

    			<div class="card-body" id="page_sidebar">
    				
    			</div>

    		</div>


    		<div class="card col-10 ">
    			<div class="card-body" id="page_content"></div>
    		</div>
			
    	</div>
    </div>


    <!-- <div class="container">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project Category</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            Finance Management System
                                        </div>
                                        <small style="color:#848482;">PRJ-21-00001</small>
                                    </td>
                                    <td>Software</td>
                                    <td class="text-center">
                                        <span class="badge badge-info w-100">Approved</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div>            
        </div>
	</div>

    <div class="container" id="containerBoard">
		<div class="row clearfix row-deck mx-1">
            <div class="card col-md-12">
                <div class="card-body">
                <div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">Finance Management System
                    <span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">PRJ-2021-00001</span>
                </div>
                    <div class="card">
                        <div class="card-body">
                            <small><b>PHASE 1</b></small>
                            
                            <div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">FMS Masterfiles </div>

                                <div class="row" style="border-top:1px #eee;">
                                    <div class="col-6"><small><b>TASKS</b></small></div>
                                    <div class="col-3"><small><b>MAN HOURS</b></small></div>
                                    <div class="col-3"><small><b>ASSIGNEE</b></small></div>
                                </div>
                                <hr class="mt-0 mb-0">
                            <div class="panel-group" id="accordion_1" role="tablist" aria-multiselectable="true">
                                <div class="panel panel-secondary">
                                    <div class="panel-heading" role="tab" id="headingOne_1">         
                                        <div class="panel-title"> 
                                            <div class="row">
                                                <div class="col-6">
                                                    <a role="button" data-toggle="collapse" data-parent="#accordion_1" href="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1"> Bank Masterfile </a> 
                                                </div>
                                                <div class="col-3 mt-2">
                                                    <input type="text" class="form-control" value="26" disabled>
                                                </div>
                                                <div class="col-3 mt-2">
                                                    <input type="text" class="form-control" value="Joseph, Errol, Charles" disabled>
                                                </div>
                                            </div>
                                        </div>              
                                    </div>
                                    <div id="collapseOne_1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_1">
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;User Stories" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="4">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Joseph">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;User Interface Design" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="4">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Errol">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Development" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="8">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Charles">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Testing" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="2">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Joseph">
                                            </div>
                                        </div>
                                        <div class="row mt-1">
                                            <div class="col-6">                                                
                                                <input type="text" class="form-control" value="&emsp;&emsp;Bug Fixing" disabled>
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="8">
                                            </div>
                                            <div class="col-3">
                                            <input type="text" class="form-control" value="Charles">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>

                </div>        
            </div>            
        </div>
	</div> -->
</div>
    

    
</div>


<!-- ----- MODAL ----- -->
<div id="modal_employee_taskboard_board" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" style="max-width: 1500px !important;" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-balck">
				<h6 class="page-title font-weight-bold " id="modal_title"></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-black" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_employee_taskboard_board_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ----- -->

<!-- ----- MODAL IMAGE ----- -->

<div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">              
      <div class="modal-body">
      	<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>

        <img src="" class="imagepreview" style="width: 100%;height:100%; " >
      </div>
    </div>
  </div>
</div>

<!-- ----- END MODAL ----- -->

<!-- ----- MODAL VIDEO ----- -->

<div class="modal fade" id="videomodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">              
      <div class="modal-body">
        <div class="row">
          <!-- <div class="col-8"><label class="title"></label> <button class="ml-2 btn btn-success"><a href="" class="text-white" target="_blank"  style="cursor:pointer;">Download</a></button></div> -->
          <div class="col-8"><label class="title"></label></div>
          <div class="col-4">
            <button type="button" class="close mr-2" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          </div>
        </div>
        
        <hr class="w-100">
        <!-- 16:9 aspect ratio -->
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class=" videopreview embed-responsive-item" src=""></iframe>
        </div>
        <!-- <img src="" class="videopreview" style="width: 100%;height:100%; " > -->
      </div>
    </div>
  </div>
</div>

<!-- ----- END VIDEO ----- -->

<!-- ----- MODAL ASSIGNEE ----- -->
<div id="modal_employee_assignee" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-black">
				<h6 class="page-title font-weight-bold " id="modal_title"></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-black" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_employee_assignee_content"></div>
        </div>
	</div>
</div>
<!-- ----- END MODAL ASSIGNEE ----- -->


<!-- ----- EMPLOYEE MODAL ----- -->
<div id="modal_project_management_board" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-black">
				<h6 class="page-title font-weight-bold " id="modal_title"></h6>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-black" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_project_management_board_content"></div>
        </div>
	</div>
</div>

<!-- ----- END EMPLOYEE MODAL ----- -->




<script src="<?= base_url('assets/custom/js/gen/approver-function.js') ?>"></script>
<script src="<?= base_url('assets/custom/js/pms/employee-taskboard.js') ?>"></script>

<script>
    // $(document).ready(function () {
    //     $("#addRequest").show();
    //     $("#pcrDetails").show();
    //     $(".addReq").show();

    //     $(document).on("click", "#btnAdd", function () {
    //         $("#addRequest").show();
    //         $("#pcrDetails").show();
    //         $(".addReq").show();
    //         $("#pcrDatatable").hide();
    //     });


	// });
</script>