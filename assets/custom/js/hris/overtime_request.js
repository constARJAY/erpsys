 $(document).ready(function() {
    	        // ----- DATATABLES -----
        function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableOvertimerequest')){
                $('#tableOvertimerequest').DataTable().destroy();
            }
            
            var table = $("#tableOvertimerequest").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        false,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 120 },
                    { targets: 1, width: 150 },
                    { targets: 2, width: 100 },
                    { targets: 3, width: 150 },
                    { targets: 4, width: 100 },
                    { targets: 5, width: 290 },	
                    { targets: 6, width: 290 },
                    { targets: 7, width: 100 },
                    { targets: 8, width: 100 },
                    { targets: 9, width: 50 },
                ],
            });
        }
        initDataTables();
        // ----- END DATATABLES -----

        
        // ----- TABLE CONTENT -----
        function tableContent() {
            // Reset the unique datas
            uniqueData = []; 

          
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableOvertimerequest">
                        <thead>
                            <tr class="text-center">
	                            <th>Overtime Number</th>
	                            <th>Employee Name</th>
	                            <th>Date</th>
	                            <th>Start Time</th>
	                            <th>End Time</th>
                                <th>Reason</th>
	                            <th>Status</th>
	                            <th>Approver</th>
	                            <th>Remarks</th>
	                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                        html += `
                        <tr>
                            <td>00001</td>
                            <td>Juan Dela Cruz</td>
                            <td>Vacation Leave</td>
                            <td>March 29, 2021</td>
                            <td>3</td>
                            <td>Travel to Alaska </td>
                            <td><span class="badge badge-outline-success w-100">Paid</span></td>
                            <td><span class="badge badge-outline-warning w-100">Pending</span></td>
                            <td></td>
                            <td class="text-center">
                                <div class="dropdown"> <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a href="javascript:void(0);"id="approve"name="approve">Approve</a></li>
                                        <li><a href="javascript:void(0);"id="deny"name="deny">Deny</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>`;
                   
                    html += `</tbody>
                    </table>`;

                    setTimeout(() => {
                        $("#table_content").html(html);
                        initDataTables();
                    }, 500);
              
        }
        tableContent();

          function modalContent(data = false) {
          /*  let userAccountID = data ? (data[0].userAccountID ? data[0].userAccountID : "") : "",
                skills    = data ? (data[0].skills ? data[0]["skills"].split("|") : []) : [],
                firstname = data ? (data[0].firstname   ? data[0].firstname  : "") : "",
                lastname  = data ? (data[0].lastname    ? data[0].lastname   : "") : "",
                email     = data ? (data[0].email       ? data[0].email      : "") : "",
                mobile    = data ? (data[0].mobile      ? data[0].mobile     : "") : "",
                telephone = data ? (data[0].telephone   ? data[0].telephone  : "") : "",
                address   = data ? (data[0].address     ? data[0].address    : "") : "",
                gender    = data ? (data[0].gender      ? data[0].gender     : "") : "",
                role      = data ? (data[0].role        ? data[0].role       : "") : "",
                birthday  = data ? (data[0].birthday    ? data[0].birthday   : "") : "",
                link      = data ? (data[0].link        ? data[0].link       : "") : "",
                username  = data ? (data[0].username    ? data[0].username   : "") : "",
                password  = data ? (data[0].password    ? data[0].password   : "") : "",
                currency  = data ? (data[0].currency    ? data[0].currency   : "") : "",
                status    = data ? (data[0].status == 1 ? "checked"          : "") : "";*/
                let userAccountID = '';

            let button = userAccountID ? `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnUpdate" 
                accountid="">
                UPDATE
            </button>` : `
            <button 
                class="btn btn-primary px-5 p-2" 
                id="btnSave">
                SAVE
            </button>`;

            let html = `
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Date <strong class="text-danger">*</strong></label>
                                 <input 
                                    type="button" 
                                    class="form-control daterange validate text-left" 
                                    name="overtime_Date" 
                                    id="input_date_overtime" 
                                    required 
                                    value="">
                                 <div class="invalid-feedback d-block" id="invalid-input_date_overtime"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                 <label for="" class="bold">Start Time: </label>&nbsp;
                                  <input 
                                    type="time" 
                                    class="form-control validate text-left" 
                                    name="overtime_Datetimein" 
                                    id="input_overtime_Datetimein" 
                                    required 
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-input_overtime_Datetimein"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">End Time</label>
                                <input 
                                    type="time" 
                                    class="form-control validate text-left" 
                                    name="overtime_Endtime" 
                                    id="input_overtime_Endtime" 
                                    required 
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-input_overtime_Endtime"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Total Time</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="overtime_TotalTime" 
                                    id="input_overtime_TotalTime"
                                    value=""disabled>
                                <div class="invalid-back d-block" id="invalid-input_overtime_TotalTime"></div>
                            </div>
                        </div>
                         <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Reason </label>
                                <textarea class="form-control validate text-left" 
                                 name="overtime_Reason"
                                 id="input_overtime_Reason"
                                 rows="3"></textarea class="form-control"required>
                                </textarea>
                                <div class="invalid-back d-block" id="invalid-input_overtime_Reason"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    ${button}
                    <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>
                </div>`;
            return html;
        } 
         $(document).on("click", "#btnAdd", function() {
            $("#modal_overtime_request").modal("show");
            $("#modal_overtime_request_content").html(preloader);
            const content = modalContent();
            $("#modal_overtime_request_content").html(content);
            initAll();
     });

     

});
