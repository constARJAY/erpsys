 $(document).ready(function() {

    	        // ----- DATATABLES -----
        function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableUserAccount')){
                $('#tableUserAccount').DataTable().destroy();
            }
            
            var table = $("#tableUserAccount").css({"min-width": "100%"}).removeAttr('width').DataTable({
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
                    { targets: 5, width: 120 },	
                    { targets: 6, width: 290 },
                    { targets: 7, width: 100 },
                    { targets: 8, width: 100 },
                    { targets: 9, width: 100 },
                    { targets: 10, width: 290 },
                    { targets: 11, width: 50 },
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
                    <table class="table table-bordered table-striped table-hover" id="tableUserAccount">
                        <thead>
                            <tr class="text-center">
	                            <th>Leave Number</th>
	                            <th>Employee Name</th>
	                            <th>Leave Type</th>
	                            <th>From</th>
	                            <th>To</th>
	                            <th>No. of Days</th>
	                            <th>Reason</th>
	                            <th>Class</th>
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
                            <td>March 31, 2021</td>
                            <td>3</td>
                            <td>Travel to Alaska </td>
                            <td><span class="badge badge-outline-success w-100">Paid</span></td>
                            <td><span class="badge badge-outline-warning w-100">Pending</span></td>
                            <td>Pio Hindimagiba</td>
                            <td> If no deadline for this day. Please proceed.</td>
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

                // ----- MODAL CONTENT -----
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
                                <label for="">Leave Type <strong class="text-red">*</strong></label>
                                <select class="form-control select2">
                                <option value="" disabled>Select Leave</option>
									<option value="volvo">Vacation Leave</option>
									<option value="saab">Sick Leave</option>
									<option value="mercedes">Paternity Leave</option>
								</select>	
                                 <div class="invalid-feedback d-block" id="invalid-input_leave_type"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">From <strong class="text-red">*</strong></label>
                                 <div class="input-group">
                                 <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input 
                                        type="button" 
                                        class="form-control daterange validate text-left" 
                                        name="leavefrom" 
                                        id="leavefrom" 
                                        required>
                                    </div>    
                                <div class="invalid-feedback d-block" id="invalid-input_leave_from"></div>
                            </div>
                        </div>
                          <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">To <strong class="text-red">*</strong></label>
                                 <div class="input-group">
                                 <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input 
                                        type="button" 
                                        class="form-control daterange validate text-left" 
                                        name="leaveto" 
                                        id="leaveto" 
                                        required>
                                    </div>    
                                <div class="invalid-feedback d-block" id="invalid-input_leave_to"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Number of Days</label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    disabled 
                                    name="numberofday" 
                                    id="input_numberofday"
                                    required 
                                    value="">
                                <div class="invalid-feedback d-block" id="invalid-input_numberofday"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Remaining Leaves</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="remaining_leave" 
                                    id="input_remaining_leave"
                                    value=""disabled>
                                <div class="invalid-back d-block" id="invalid-input_remaining_leave"></div>
                            </div>
                        </div>
                         <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label>Reason </label>
								<textarea id="w3review" class="form-control" name="w3review" rows="2" cols="50">
								</textarea>
                                <div class="invalid-back d-block" id="invalid-input_remaining_leave"></div>
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
            $("#modal_user_account").modal("show");
            $("#modal_user_account_content").html(preloader);
            const content = modalContent();
            $("#modal_user_account_content").html(content);
            initAll();
     });
     // ----- SAVE ADD -----
        $(document).on("click", "#btnSave", function() {
            const validate = validateForm("modal_user_account");
            if (validate) {

           	$("#modal_user_account").modal("hide");
    	    Swal.fire({
            title: 'Are you sure?',
            text: "You want to save this?",
            imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Save',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Successfully saved!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modal_user_account").modal("show");
            }
        });
              
                // $("#confirmation-modal_add_user_account").modal("show");
            }
        });

          // ----- CLOSE CONFIRMATION ADD -----
        $(document).on("click", ".btnCloseConfirmationAdd, .btnCloseConfirmationEdit", function() {
            $("#confirmation-modal_add_user_account, #confirmation-modal_edit_user_account").modal("hide");
            $("#modal_user_account").modal("show");
        }) 

  	$(document).on("click", "#deny", function() {
         Swal.fire({
			  title: 'Please enter a reason',
			  input: 'text',
			  showCancelButton: true,
              imageUrl: 'https://unsplash.it/400/200',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
			  preConfirm: (login) => {
			    return fetch(`//api.github.com/users/${login}`)
			      .then(response => {
			        if (!response.ok) {
			          throw new Error(response.statusText)
			        }
			        return response.json()
			      })
			      .catch(error => {
			        Swal.showValidationMessage(
			          `Request failed: ${error}`
			        )
			      })
			  },
			  allowOutsideClick: () => !Swal.isLoading(),allowOutsideClick: false
			}).then((result) => {
			  if (result.isConfirmed) {
			  	console.log(result.value.login);
			    Swal.fire({
			      icon: 'success',
	                title: 'Successfully saved!',
	                showConfirmButton: false,
	                timer: 2000
			    })
			  }
			}) 
  	});
  	$(document).on("click", "#btnCloseConfirmationAdddeny", function() {
  		$("#confirmation-modal_add_user_account_deny").modal("hide");
  	});		

  	$(document).on("click", "#approve", function() {
  		/*$("#confirmation-modal_add_user_account_approver").modal("show");*/

        (async () => {

        const { value: formValues } = await Swal.fire({
          title: 'Are you sure you want to approve leave?',
          html:
            '<select class="form-control select2" id="classpaid">'+
            '<option value=""disabled>Select class</option>'+
            '<option value="paid">Paid</option>'+
            '<option value="upaid">Upaid</option></select>' +
            '<textarea id="swal-input2" class="swal2-input"></textarea>',
          focusConfirm: false,
          showCancelButton: true,
         /* preConfirm: () => {
            return [
              document.getElementById('swal-input2').value,
              document.getElementById('classpaid').value
            ]
          }*/
          preConfirm: (login) => {
                return fetch(`//api.github.com/users/${login}`)
                  .then(response => {
                    console.log(response)
                    if (!response.ok) {
                      throw new Error(response.statusText)
                    }
                    return response.json()
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
                    )
                  })
              },

               allowOutsideClick: () => !Swal.isLoading(),allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                console.log(result.value.login);
                Swal.fire({
                  icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                })
              }
            }) 



      
         /*.catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
                    )
                  })*/


       /* if (formValues) {
          Swal.fire(JSON.stringify(formValues))

          .catch(error => {
                    Swal.showValidationMessage(
                      `Request failed: ${error}`
            )
          }) 
        }*/



        })()

       /* (async () => {
           const { value: classed } = await Swal.fire({
              title: 'Select field validation',
              input: 'select',
              inputOptions: {
                'class': {
                  paid: 'Paid',
                  unpaid: 'Unpaid'
                },
              },

              inputPlaceholder: 'Select a class',
              showCancelButton: true,
              inputValidator: (value) => {
              console.log(value);

                /*return new Promise((resolve) => {
                  if (value === 'oranges') {
                  
                    resolve()
                  } else {
                    resolve('You need to select oranges :)')
                  }
                })*/
           /*   }
            })*/

          /*  if (classed) {
              Swal.fire(`You selected: ${classed}`)
            }
            })() */

  	});	
  	$(document).on("click", "#btnCloseConfirmationAddapprover","#", function() {
  		$("#confirmation-modal_add_user_account_approver").modal("hide");
  	});	

    });