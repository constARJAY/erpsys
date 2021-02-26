<div class="body_area">
    <div class="block-header">
		<div class="container">
			<div class="row clearfix">
				<div class="col-lg-6 col-md-12">
					<ul class="breadcrumb pl-0 pb-0 ">
						<li class="breadcrumb-item"><a href="#"><i class="zmdi zmdi-home"></i> Dashboard</a></li>
						<li class="breadcrumb-item"><i class="zmdi zmdi-folder"></i> &nbsp;Masterfiles</li>
						<li class="breadcrumb-item active"><i class="zmdi zmdi-hotel"></i> &nbsp;Crud Operations</li>
					</ul>
					<h1 class="mt-3">CRUD Operations</h1>
					<span>This module is used to manage Lorem ipsum dolor sit amet..</span>
				</div>
			</div>
		</div>
	</div>

    <div class="container">
		<div class="row clearfix row-deck" style='text-align:right;'>
            <div class="col-12">
                <div class="col-12 header p-0">
                    <ul class="header-dropdown">
                        <button type="button" class="btn btn-primary p-2 px-3" id="btnAdd"> <i class="icon-plus"></i> &nbsp;Add User Account</button>
                    </ul>
                </div>
            </div>
        </div>

		<div class="row clearfix row-deck">
            <div class="col-12">
                <div class="table-responsive" id="table_content"></div>
            </div>
        </div>
	</div>
</div>


<!-- ----- ADD MODAL ----- -->
<div id="modal_user_account" class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-light">
				<h5 class="page-title font-weight-bold">ADD USER ACCOUNT</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span class="text-light" aria-hidden="true">&times;</span>
				</button>
			</div>

            <div id="modal_user_account_content"></div>
        </div>
	</div>
</div>
<!-- ----- END ADD MODAL ----- -->


<!-- ----- CONFIRMATION MODAL ----- -->
<div id="confirmation-modal_add_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">ADD USER ACCOUNT</h2>
				<p class="text-center my-2">Are you sure you want to add this user account?</p>
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

<div id="confirmation-modal_edit_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">UPDATE USER ACCOUNT</h2>
				<p class="text-center my-2">Are you sure you want to update this user account?</p>
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

<div id="confirmation-modal_delete_user_account" class="modal custom-modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-dialog-centered modal-min" role="document">
		<div class="modal-content">
			<div class="modal-body pb-3 text-center">
			<button type="button" class="close btnCloseConfirmationAdd" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			<img class="isometric confirmationisometric" width="230px" height="200px" style="text-align: center" src="<?=base_url(); ?>assets/modal/add.png">
				<h2 class="text-primary text-center">DELETE USER ACCOUNT</h2>
				<p class="text-center my-2">Are you sure you want to delete this user account?</p>
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

    $(document).ready(function() {

        // ----- DATATABLES -----
        function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableUserAccount')){
                $('#tableUserAccount').DataTable().destroy();
            }
            
            var table = $("#tableUserAccount").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 100 },
                    { targets: 1, width: 100 },
                    { targets: 2, width: 100 },
                    { targets: 3, width: 150 },
                    { targets: 4, width: 100 },
                    { targets: 5, width: 200 },
                    { targets: 6, width: 100 },
                    { targets: 7, width: 100 },
                    { targets: 8, width: 100 },
                    { targets: 9, width: 100 },
                ],
            });
        }
        initDataTables();
        // ----- END DATATABLES -----

        
        // ----- TABLE CONTENT -----
        function tableContent() {
            // Reset the unique datas
            uniqueData = []; 

            $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: "user_account_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableUserAccount">
                        <thead>
                            <tr class="text-center">
                                <th>Role</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Telephone</th>
                                <th>Address</th>
                                <th>Gender</th>
                                <th>Birthday</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:       item.userAccountID, // Required
                            username: item.username,
                            email:    item.email,
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr>
                            <td>${item.role}</td>
                            <td>${item.firstname} ${item.lastname}</td>
                            <td>${item.email}</td>
                            <td>${item.mobile}</td>
                            <td>${item.telephone}</td>
                            <td>${item.address}</td>
                            <td>${item.gender}</td>
                            <td>${moment(item.birthday).format("MMM DD, YYYY")}</td>
                            <td>${item.link}</td>
                            <td>
                                <button class="btn btn-primary btnEdit" id="${item.userAccountID}">Edit</button>
                                <button class="btn btn-danger btnDelete" id="${item.userAccountID}" feedback="${item.username}">Delete</button>
                            </td>
                        </tr>`;
                    })
                    html += `</tbody>
                    </table>`;

                    $("#table_content").html(html);
                    initDataTables();
                },
                error: function() {
                    let html = `<div class="w-100 h5 text-center text-danger>There was an error fetching data.</div>`;
                    $("#table_content").html(html);
                }
            })
        }
        tableContent();
        // ----- END TABLE CONTENT -----


        // ----- MODAL CONTENT -----
        function modalContent(data = false) {
            let userAccountID = data ? (data[0].userAccountID ? data[0].userAccountID : "") : "",
                firstname = data ? (data[0].firstname ? data[0].firstname : "") : "",
                lastname  = data ? (data[0].lastname  ? data[0].lastname : "") : "",
                email     = data ? (data[0].email     ? data[0].email : "") : "",
                mobile    = data ? (data[0].mobile    ? data[0].mobile : "") : "",
                telephone = data ? (data[0].telephone ? data[0].telephone : "") : "",
                address   = data ? (data[0].address   ? data[0].address : "") : "",
                gender    = data ? (data[0].gender    ? data[0].gender : "") : "",
                role      = data ? (data[0].role      ? data[0].role : "") : "",
                birthday  = data ? (data[0].birthday  ? data[0].birthday : "") : "",
                link      = data ? (data[0].link      ? data[0].link : "") : "",
                username  = data ? (data[0].username  ? data[0].username : "") : "",
                password  = data ? (data[0].password  ? data[0].password : "") : "",
                skills    = data ? (data[0].skills    ? data[0]["skills"].split("|") : []) : [],
                status    = data ? (data[0].status == 1 ? "checked" : "") : "";

            let button = userAccountID ? 
            `<button class="btn btn-primary px-5 p-2" id="btnUpdate" accountid="${userAccountID}">UPDATE</button>` : `<button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>`;

            let html = `
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Firstname</label>
                                <input type="text" class="form-control validate" name="firstname" id="firstname" data-allowcharacters="[A-Z][a-z][0-9][ ]" minlength="2" maxlength="20"  value="${firstname}">
                                <div class="invalid-feedback d-block" id="invalid-firstname"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Lastname</label>
                                <input type="text" class="form-control validate" name="lastname" id="lastname" data-allowcharacters="[A-Z][a-z][0-9][ ]" minlength="2" maxlength="20" required value="${lastname}">
                                <div class="invalid-feedback d-block" id="invalid-lastname"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Email</label>
                                <input type="email" class="form-control validate" name="email" id="email" data-allowcharacters="[A-Z][a-z][0-9][ ][@][.]" minlength="2" maxlength="50" required unique="${userAccountID}" value="${email}">
                                <div class="invalid-feedback d-block" id="invalid-email"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Mobile No.</label>
                                <input type="text" class="form-control validate inputmask" name="mobile" id="mobile" data-allowcharacters="[0-9]" mask="(+63) 999 9999 999" minlength="18" maxlength="18" required value="${mobile}">
                                <div class="invalid-feedback d-block" id="invalid-mobile"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Telephone No.</label>
                                <input type="text" class="form-control validate inputmask" name="telephone" id="telephone" data-allowcharacters="[0-9]" mask="(99) 9999 9999" minlength="13" maxlength="13" required value="${telephone}">
                                <div class="invalid-feedback d-block" id="invalid-telephone"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Address</label>
                                <input type="text" class="form-control validate" name="address" id="address" data-allowcharacters="[0-9][A-Z][a-z][ ]" minlength="5" maxlength="30" required value="${address}">
                                <div class="invalid-feedback d-block" id="invalid-address"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label for="">Gender</label><br>
                                <input type="radio" class="" name="gender" id="add_gender" value="Male" ${data ? (gender == "Male" ? "checked" : "") : "checked"}> Male <input type="radio" class="" name="gender" id="add_gender" value="Female" ${data && gender == "Female" ? "checked" : ""}> Female
                                <div class="invalid-feedback d-block" id="invalid-add_gender"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label for="">Role</label>
                                <select class="form-control select2 validate" name="role" id="add_role" required>
                                    <option value="" disabled ${!data && "selected"}>Select Role</option>
                                    <option value="Admin" ${data && role == "Admin" && "selected"}>Admin</option>
                                    <option value="Operations" ${data && role == "Operations" && "selected"}>Operations</option>
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-add_role"></div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label for="">Birthday</label>
                                <input type="button" class="form-control daterange validate text-left" name="birthday" id="add_birthday" required value="${data && birthday ? moment(birthday).format("MMM DD, YYYY") : ""}">
                                <div class="invalid-feedback d-block" id="invalid-add_birthday"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Link</label>
                                <input type="url" class="form-control validate" name="link" id="add_link" minlength="10" maxlength="50" required value="${link}">
                                <div class="invalid-feedback d-block" id="invalid-add_link"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Username</label>
                                <input type="text" class="form-control validate" name="username" id="add_username" data-allowcharacters="[A-Z][a-z][0-9]" minlength="5" maxlength="20" required unique="${userAccountID}" value="${username}">
                                <div class="invalid-feedback d-block" id="invalid-add_username"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="">Password</label>
                                <input type="password" class="form-control validate" name="password" id="add_password" data-allowcharacters="[A-Z][a-z][0-9]" minlength="5" maxlength="20" required value="${password}">
                                <div class="invalid-feedback d-block" id="invalid-add_password"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Skills</label><br>
                                <input type="checkbox" name="skills" id="add_skill" value="CSS" ${data && skills && skills.some(x => x == "CSS") ? "checked" : ""}> CSS 
                                <input type="checkbox" name="skills" id="add_skill" value="HTML" ${data && skills && skills.some(x => x == "HTML") ? "checked" : ""}> HTML 
                                <input type="checkbox" name="skills" id="add_skill" value="JS" ${data && skills && skills.some(x => x == "JS") ? "checked" : ""}> JS 
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label>Status <code>*</code></label>
                                <div class="status-toggle d-flex justify-content-start align-items-center">
                                    <span>Inactive &nbsp;&nbsp;</span>
                                    <label class="switch">
                                        <input type="checkbox" name="status" id="status" ${status}>
                                        <span class="slider round"></span>
                                    </label>
                                    <span>&nbsp;&nbsp;Active</span>
                                </div>
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
        // ----- END MODAL CONTENT -----


        // ----- OPEN ADD MODAL -----
        $(document).on("click", "#btnAdd", function() {
            $("#modal_user_account").modal("show");
            $("#modal_user_account_content").html(preloader);
            const content = modalContent();
            $("#modal_user_account_content").html(content);
            initAll();
        });
        // ----- END OPEN ADD MODAL -----


        // ----- OPEN EDIT MODAL -----
        $(document).on("click", ".btnEdit", function() {
            const id = $(this).attr("id");
            $("#modal_user_account").modal("show");

            // Display preloader while waiting for the completion of getting the data
            $("#modal_user_account_content").html(preloader); 

            const tableData = getTableData("user_account_tbl", "*", "userAccountID="+id, "");
            if (tableData) {
                const content = modalContent(tableData);
                setTimeout(() => {
                    $("#modal_user_account_content").html(content);
                    $("#btnSaveConfirmationEdit").attr("accountid", id);
                    initAll();
                }, 500);
            }
        });
        // ----- END OPEN EDIT MODAL -----


        // ---- OPEN DELETE MODAL -----
        $(document).on("click", ".btnDelete", function() {
            const id = $(this).attr("id");
            const feedback = $(this).attr("feedback");
            $("#btnSaveConfirmationDelete").attr("accountid", id);
            $("#btnSaveConfirmationDelete").attr("feedback", feedback);
            $("#confirmation-modal_delete_user_account").modal("show");
        });
        // ---- END OPEN DELETE MODAL -----


        // ----- SAVE ADD -----
        $(document).on("click", "#btnSave", function() {
            const validate = validateForm("modal_user_account");
            if (validate) {
                $("#modal_user_account").modal("hide");
                $("#confirmation-modal_add_user_account").modal("show");
            }
        });
        // ----- END SAVE ADD -----


        // ----- SAVE UPDATE -----
        $(document).on("click", "#btnUpdate", function() {
            const validate = validateForm("modal_user_account");
            if (validate) {
                $("#modal_user_account").modal("hide");
                $("#confirmation-modal_edit_user_account").modal("show");
            }
        });
        // ----- END SAVE UPDATE -----


        // ----- SAVE CONFIRMATION ADD -----
        $(document).on("click", "#btnSaveConfirmationAdd", function() {
            let data = getModalData("modal_user_account");
            data["tableName"] = "user_account_tbl";
            data["feedback"]  = data.tableData["username"];

            /**
             * ----- DATA -----
             * 1. tableName
             * 2. tableData
             * 3. feedback
             */

            const saveData = insertTableData(data);
            if (saveData) {
               tableContent();
            }
        })
        // ----- END SAVE CONFIRMATION ADD -----


        // ----- SAVE CONFIRMATION EDIT -----
        $(document).on("click", "#btnSaveConfirmationEdit", function() {
            const accountID = $(this).attr("accountid");
            let data = getModalData("modal_user_account");
            data["tableName"]   = "user_account_tbl";
            data["whereFilter"] = "userAccountID="+accountID;
            data["feedback"]    = data.tableData["username"];

            /**
             * ----- DATA -----
             * 1. tableName
             * 2. tableData
             * 3. whereFilter
             * 4. feedback
            */

            const saveData = updateTableData(data);
            if (saveData) {
               tableContent();
            }
        })
        // ----- END SAVE CONFIRMATION EDIT -----


        // ----- SAVE CONFIRMATION DELETE -----
        $(document).on("click", "#btnSaveConfirmationDelete", function() {
            const accountID = $(this).attr("accountid");
            const feedback  = $(this).attr("feedback");

            /**
             * ----- DATA -----
             * 1. tableName
             * 2. whereFilter
             * 3. feedback
            */

            const data = {
                tableName:   "user_account_tbl",
                whereFilter: "userAccountID="+accountID,
                feedback
            };

            const saveData = deleteTableData(data);
            if (saveData) {
               tableContent();
            }
        })
        // ----- END SAVE CONFIRMATION DELETE -----


        // ----- CLOSE CONFIRMATION ADD -----
        $(document).on("click", ".btnCloseConfirmationAdd, .btnCloseConfirmationEdit", function() {
            $("#confirmation-modal_add_user_account").modal("hide");
            $("#confirmation-modal_edit_user_account").modal("hide");
            $("#modal_user_account").modal("show");
        })
        // ----- END CLOSE CONFIRMATION ADD -----
        

    })

</script>