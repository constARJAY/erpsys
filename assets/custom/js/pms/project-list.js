$(document).ready(function(){
    // $("#container_2").hide();
    // $("#btnCancel").toggle(false);

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#modalTitleAddListHeader").text("ADD PROJECT");
        $("#modalProjectList").modal("show");
        $("#modalProjectListContent").html(preloader);
        const content = modalContent();
        $("#modalProjectListContent").html(content);
        initAll();
    });
    // ----- END OPEN ADD MODAL -----

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let userAccountID = "";   
        let button = userAccountID ? `
        <button 
            class="btn btn-update" 
            id="btnUpdate" 
            accountid="${userAccountID}"><i class="fas fa-save"></i>
            Update
        </button>` : `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

        let html = `
            <div class="modal-body">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Project Code <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                            type="text" 
                            class="form-control validate" 
                            name="projectCode" 
                            id="projectCode" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value=""
                            autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputProjectCode"></div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Project Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="projectName" 
                                id="projectName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="20" 
                                required 
                                value=""
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputProjectName"></div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Project Description<span class="text-danger font-weight-bold">*</span></label>
                            <textarea 
                                type="text" 
                                class="form-control validate" 
                                name="projectDescription" 
                                id="projectDescription" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="20" 
                                rows="4"
                                required 
                                autocomplete="off"></textarea>
                            <div class="invalid-feedback d-block" id="invalidInputProjectDescription"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Start Date<span class="text-danger font-weight-bold">*</span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                    </div>
                                    <input type="button" class="form-control daterange validate text-left" name="projectStartDate" id="projectStartDate" required="" value="">
                                </div>
                            <div class="invalid-feedback d-block" id="invalidInputProjectStartDate"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>End Date<span class="text-danger font-weight-bold">*</span></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                </div>
                                <input type="button" class="form-control daterange validate text-left" name="projectEndDate" id="projectEndDate" required="" value="">
                            </div>
                            <div class="invalid-feedback d-block" id="invalidInputProjectEndDate"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Client <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectClient" id="projectClient" autocomplete="off" required>
                            <optgroup label="Select Client">
                                <option value="">BlackCoders Group Inc.</option>   
                                <option value="">Gatchallan Tangalin Co.&CPA's</option>
                                <option value="">CMTLand Development Inc.</option>   
                                <option value="">CMTBuilders Inc.</option>
                                <option value="">MFOX Computer Services</option>   
                                <option value="">DeltaMike Security</option>
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectClient"></div>
                            </select>
                            <span class="fas fa-plus-square fa-lg form-control-feedback mt-2 pr-1" id="projectAddClient" style="float:right"></span>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Project Manager <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectManager" id="projectManager" autocomplete="off" required>
                            <optgroup label="Select Project Manager">
                                <option value="">Robinjamin Gelilio</option>   
                                <option value="">Nina Geronimo</option>
                                <option value="">Renz Fabian</option>   
                                <option value="">Sheryl Antinero</option>
                                <option value="">Ulysis Ramizares</option>   
                                <option value="">Jill Macalintal</option>
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectManager"></div>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Priority Level <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectPriorityLevel" id="projectPriorityLevel" autocomplete="off" required>
                            <optgroup label="Select Priority Level">
                                <option value="">High</option>   
                                <option value="">Medium</option>
                                <option value="">Low</option>      
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectPriorityLevel"></div>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectStatus" id="projectStatus" autocomplete="off" required>
                            <optgroup label="Select Priority Level">
                                <option value="">Active</option>   
                                <option value="">Inactive</option>
                                <option value="">Cancelled</option>      
                                <option value="">Completed</option>
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectStatus"></div>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Team Leader <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectTeamLeader" id="projectTeamLeader" autocomplete="off" required>
                            <optgroup label="Select Team Leader">
                                <option value="">(All registered users)</option>   
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectTeamLeader"></div>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Team Members <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="projectTeamMembers" id="projectTeamMembers" autocomplete="off" multiple required>
                            <optgroup label="Select Team Members">
                                <option value="">(All registered employee's except officer's)</option>   
                            </optgroup>
                                <div class="invalid-feedback d-block" id="invalidInputProjectTeamMembers"></div>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;
        return html;
    } 
    // ----- END MODAL CONTENT ----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modalProjectList");
    if (validate) {
        $("#modalProjectList").modal("hide");
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
            confirmButtonText: 'Save'
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- FORM DATA -----
            //  * tableData = {} -> Objects
            //  */
            // let data = getFormData("modal_user_account");
            // data.append("tableName", "user_account_tbl");
            // data.append("feedback", "Your choice");
            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. tableData
            //  * 3. feedback
            //  */

            // const saveData = insertTableData(data);
            // if (saveData) {
            //     tableContent();
            // }
                
            Swal.fire({
                icon: 'success',
                title: 'Successfully saved!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modalProjectList").modal("show");
            }
        });
            
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#modalProjectListHeader").text("VIEW PROJECT");
        $("#modalProjectList").modal("show")

        // Display preloader while waiting for the completion of getting the data
        $("#modalProjectListContent").html(preloader); 

        const tableData = getTableData("project_list_tbl", "*", "userAccountID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modalProjectListContent").html(content);
                // $("#btnSaveConfirmationEdit").attr("accountid", id);
                // $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modalProjectList");
        if (validate) {
            $("#modalProjectList").modal("hide");
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
                confirmButtonText: 'Save'
              }).then((result) => {
                if (result.isConfirmed) {
    
                // /**
                //  * ----- FORM DATA -----
                //  * tableData = {} -> Objects
                //  */
                // let data = getFormData("modal_user_account");
                // data.append("tableName", "user_account_tbl");
                // data.append("feedback", "Your choice");
                // /**
                //  * ----- DATA -----
                //  * 1. tableName
                //  * 2. tableData
                //  * 3. feedback
                //  */
    
                // const saveData = insertTableData(data);
                // if (saveData) {
                //     tableContent();
                // }
                    
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                  })
                }else{
                    $("#modalProjectList").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modalProjectList").modal("hide");
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            imageUrl: `${base_url}assets/custom/isometric_image/questions.png`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Yes, discard!'
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- FORM DATA -----
            //  * tableData = {} -> Objects
            //  */
            // let data = getFormData("modal_user_account");
            // data.append("tableName", "user_account_tbl");
            // data.append("feedback", "Your choice");
            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. tableData
            //  * 3. feedback
            //  */

            // const saveData = insertTableData(data);
            // if (saveData) {
            //     tableContent();
            // }
                
            Swal.fire({
                icon: 'success',
                title: 'Changes successfully discard!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modalProjectList").modal("show");
            }
        });


    });
    // -------- END CANCEL MODAL-----------


      // ----- DATATABLES -----
      function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableProjectList')){
            $('#tableProjectList').DataTable().destroy();
        }
        
        var table = $("#tableProjectList").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 150 },
                { targets: 1, width: 300 },
                { targets: 2, width: 500 },
                { targets: 3, width: 100 },
                { targets: 4, width: 100 },
                { targets: 5, width: 200 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 200 },
                { targets: 9, width: 50 },
                { targets: 10, width: 50 },
                { targets: 11, width: 100 }
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
            data:     {tableName: "gen_operations_tbl "},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableProjectList">
                    <thead>
                        <tr class="text-center" style="white-space:nowrap">
                            <th>Project Code</th>
                            <th>Project Name</th>
                            <th>Project Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Client</th>
                            <th>Project Manager</th>
                            <th>Team Leader</th>
                            <th>Team Members</th>
                            <th>Priority Level</th>
                            <th>Status</th>
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
                        <td>PMS-2021-00001</td>
                        <td>Project Management System</td>
                        <td>Used for creating and monitoring projects.</td>
                        <td>March 11, 2021</td>
                        <td>March 31, 2021</td>
                        <td>BlackCoders Group Inc.</td>
                        <td>Robinjamin I. Gelilio</td>
                        <td>Arjay Diangzon</td>
                        <td>User Images</td>
                        <td>High</td>
                        <td><span class="badge badge-outline-success w-100">Active</span></td>
                        <td>
                            <button class="btn btn-edit btn-block btnEdit" 
                            id="${item.userAccountID}"
                            feedback="${item.username}">
                            <i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>`;
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    initDataTables();
                }, 500);
            },
            error: function() {
                let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
                $("#table_content").html(html);
            }
        })
    }
    tableContent();
    // ----- END TABLE CONTENT -----

    // ----- OPEN ADD LEDGER MODAL -----
    $(document).on("click", "#projectAddClient", function() {
        $("#modalProjectList").modal("hide");
        $("#modalProjectClient").modal("show");
        // $("#modalProjectClientContent").html(preloader);

        let html =`
            <div class="modal-body">
                <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Client No. <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                            type="text" 
                            class="form-control validate" 
                            name="clientId" 
                            id="clientId" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                            minlength="2" 
                            maxlength="20" 
                            required 
                            value=""
                            autocomplete="off" readonly>
                            <div class="invalid-feedback d-block" id="invalidInputClientNo"></div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Client Name <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="clientName" 
                                id="clientName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="20" 
                                required 
                                value=""
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputClientName"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Region <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="region" required="" oldRegion=""
                                id="region" readonly=""></select></select>
                                <div class="invalid-feedback d-block" id="invalid-region"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Province <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="province" required="" oldProvince=""
                                id="province" readonly=""></select>
                                <div class="invalid-feedback d-block" id="invalid-province"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>City <span
                                    class="text-danger font-weight-bold validate">*</span></label>
                            <select class=" form-control show-tick select2" required="" id="city" name="city" readonly="" oldCity=""></select> 
                            <div class="invalid-feedback d-block" id="invalid-city"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Barangay</label>
                            <select class=" form-control show-tick select2 validate" name="barangay" required="" oldBarangay=""
                                id="barangay" readonly=""></select>
                                <div class="invalid-feedback d-block" id="invalid-barangay"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Unit Number <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                            data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="1" maxlength="35"  id="unitNumber" name="unitNumber" value="" type="text">
                            <div class="invalid-feedback d-block" id="invalid-unitNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="form-group">
                            <label>Building/House Number <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                            data-allowcharacters="[a-z][A-Z][.][,][-]['][#][0-9][ ]" minlength="1" maxlength="35" id="houseNo" name="houseNumber" value="" type="text">
                            <div class="invalid-feedback d-block" id="invalid-houseNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Country <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[a-z][A-Z][ ]" id="country" name="country" minlength="6"
                                maxlength="50" value="" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-country"></div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div class="form-group">
                            <label>Zip Code <span
                                    class="text-danger font-weight-bold">*</span></label>
                            <input class="form-control validate" required=""
                                data-allowcharacters="[0-9]" id="postalCode" name="postalCode" minlength="4"
                                maxlength="4" value="" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-postalCode"></div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Contact Person <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="contactPerson" 
                                id="contactPerson" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="30" 
                                required 
                                value=""
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputContactPerson"></div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Email Address <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="email" 
                                class="form-control validate" 
                                name="emailAddress" 
                                id="emailAddress" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="50" 
                                value=""
                                autocomplete="off" unique>
                            <div class="invalid-feedback d-block" id="invalidInputEmailAddress"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Tax Identification Number <span class="text-danger font-weight-bold">*</span></label>
                            <input 
                                type="text" 
                                class="form-control validate inputmask" 
                                name="tin" 
                                id="tin" 
                                data-allowcharacters="[0-9][ ]" 
                                minlength="15" 
                                maxlength="15" 
                                value=""
                                mask="999 999 999 999"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputTIN"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Mobile No. <span class="text-danger font-weight-bold">*</span></label>
                                <input 
                                type="text" 
                                class="form-control validate inputmask" 
                                name="mobileNo" 
                                id="mobileNo" 
                                data-allowcharacters="[0-9]" 
                                mask="(+63) 999 9999 999" 
                                minlength="18" 
                                maxlength="18" 
                                required="" value="">
                            <div class="invalid-feedback d-block" id="invalidInputMobileNo"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Telephone No. <span class="text-danger font-weight-bold">*</span></label>
                                <input type="text" 
                                class="form-control validate inputmask" 
                                name="telephoneNo" 
                                id="telephoneNo" 
                                data-allowcharacters="[0-9]" 
                                mask="(99) 9999 9999" 
                                minlength="13" 
                                maxlength="13" 
                                required="" 
                                value="">
                            <div class="invalid-feedback d-block" id="invalidInputTelephoneNo"></div>
                        </div>
                    </div>
                    <div class="col-xl-10 col-lg-8 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Website <small class="text-muted">(Optional)</small></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="brandName" 
                                id="brandName" 
                                data-allowcharacters="[A-Z][a-z][0-9][ ][@]" 
                                minlength="2" 
                                maxlength="30" 
                                required 
                                value=""
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalidInputBrandName"></div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status <span class="text-danger font-weight-bold">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="status" id="status" autocomplete="off" required>
                                <option value="0">Active</option>   
                                <option value="1">Inactive</option>
                                <div class="invalid-feedback d-block" id="invalidInputStatus"></div>
                            </select>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                
                </div>
            </div>
            <div class="modal-footer">
            <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>
                <button class="btn btn-cancel btnCancelClient"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;

        $("#modalProjectClientContent").html(html);
        initAll();       
    });
    // ----- END OPEN ADD LEDGER MODAL -----
        // ----- SAVE MODAL -----
        $(document).on("click", "#btnSaveClient", function() {
            const validate = validateForm("modalProjectClient");
            if (validate) {
                $("#modalProjectClient").modal("hide");
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
                    confirmButtonText: 'Save'
                  }).then((result) => {
                    if (result.isConfirmed) {
        
                    // /**
                    //  * ----- FORM DATA -----
                    //  * tableData = {} -> Objects
                    //  */
                    // let data = getFormData("modal_user_account");
                    // data.append("tableName", "user_account_tbl");
                    // data.append("feedback", "Your choice");
                    // /**
                    //  * ----- DATA -----
                    //  * 1. tableName
                    //  * 2. tableData
                    //  * 3. feedback
                    //  */
        
                    // const saveData = insertTableData(data);
                    // if (saveData) {
                    //     tableContent();
                    // }
                        
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully saved!',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }else{
                        $("#modalProjectClient").modal("show");
                    }
                });
                    
                }
            });
            // ----- END SAVE MODAL -----
   // ------- CANCEl MODAL-------- 
   $(document).on("click",".btnCancelClient",function(){
    $("#modalProjectClient").modal("hide");
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        imageUrl: `${base_url}assets/custom/isometric_image/questions.png`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#1A1A1A',
        confirmButtonText: 'Yes, discard!'
      }).then((result) => {
        if (result.isConfirmed) {

        // /**
        //  * ----- FORM DATA -----
        //  * tableData = {} -> Objects
        //  */
        // let data = getFormData("modal_user_account");
        // data.append("tableName", "user_account_tbl");
        // data.append("feedback", "Your choice");
        // /**
        //  * ----- DATA -----
        //  * 1. tableName
        //  * 2. tableData
        //  * 3. feedback
        //  */

        // const saveData = insertTableData(data);
        // if (saveData) {
        //     tableContent();
        // }
            
        Swal.fire({
            icon: 'success',
            title: 'Changes successfully discard!',
            showConfirmButton: false,
            timer: 2000
          })
        $("#modalProjectList").modal("show");

        }else{
            $("#modalProjectClient").modal("show");
        }
    });


});
// -------- END CANCEL MODAL-----------

});