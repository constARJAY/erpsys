$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableHRISDesignation')){
            $('#tableHRISDesignation').DataTable().destroy();
        }
        
        var table = $("#tableHRISDesignation").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 250 },
                { targets: 2, width: 250 },
                { targets: 3, width: 50 },
                { targets: 4, width: 50 },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----

    // ----- DEPARTMENT CONTENT -----
    function departmentContent(param = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("hris_department_tbl", 
        "departmentID  ,departmentName", "", "");
      
            let html = ` <option value="" disabled selected ${!param && "selected"}>No Selected</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.departmentID }" ${param && item.departmentID  == param[0].departmentID  && "selected"}>${item.departmentName}</option>`;
            })
            $("#input_departmentID").html(html);
    }
    departmentContent();
    // ----- END DEPARTMENT CONTENT -----

    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 
        // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
        const data = getTableData("hris_designation_tbl as designation INNER JOIN hris_department_tbl as department USING(departmentID)  ", 
            "*, CONCAT('DES-',SUBSTR(designation.datecreated,3,2),'-',LPAD(designation.designationID, 5, '0')) AS designationCode,department.departmentName", "", "");

        // $.ajax({
        //     url:      `${base_url}operations/getTableData`,
        //     method:   'POST',
        //     async:    false,
        //     dataType: 'json',
        //     data:     {tableName: "user_account_tbl"},
        //     beforeSend: function() {
                $("#table_content").html(preloader);
        //         // $("#inv_headerID").text("List of Inventory Item");
        //     },
        //     success: function(data) {
        //         console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableHRISDesignation">
                    <thead>
                    <tr class="text-center">
                        <th>Designation No.</th>
                        <th>Designation Name</th>
                        <th>Department Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.designationID, // Required
                        designationName: item.designationName,
                        // email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    
                    if(item.designationStatus == 1){
                        var status=`<span class="badge badge-outline-success w-100">Active</span>`;
                     }   
                     if(item.designationStatus == 0){
                        var status=`<span class="badge badge-outline-danger w-100">Inactive</span>`;
                     }

                    html += `
                    <tr>
                        <td>${item.designationCode}</td>
                        <td>${item.designationName}</td>
                        <td>${item.departmentName}</td>
                        <td>${status}</td>
                        <td>
                            <button 
                                class="btn btn-edit btn-block btnEdit" 
                                id="${item.designationID}"
                                feedback="${item.designationName}">
                                <i class="fas fa-edit"></i>
                                EDIT
                            </button>
                        </td>
                    </tr>`;
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    initDataTables();
                }, 500);
        //     },
        //     error: function() {
        //         let html = `
        //             <div class="w-100 h5 text-center text-danger>
        //                 There was an error fetching data.
        //             </div>`;
        //         $("#table_content").html(html);
        //     }
        // })
    }
    tableContent();
    // ----- END TABLE CONTENT -----

     // ----- MODAL CONTENT -----
     function modalContent(data = false) {
        let designationID              = data ? (data[0].designationID            ? data[0].designationID        : "") : "",
        departmentID             = data ? (data[0].departmentID       ? data[0].departmentID   : "") : "",
        designationName                = data ? (data[0].designationName          ? data[0].designationName      : "") : "",
        designationStatus      = data ? (data[0].designationStatus? data[0].designationStatus         : "") : "";
        let button = designationID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            rowID="${designationID}">
            <i class="fas fa-save"></i>
            UPDATE
        </button>` : `
        <button 
            class="btn btn-save px-5 p-2" 
            id="btnSave"><i class="fas fa-save"></i>
            SAVE
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Department Name<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_departmentID" 
                            name="departmentID"
                            autocomplete="off"
                            required>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_departmentID"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Designation Name<span class="text-danger font-weight-bold">*</span></label>
                        <input 
                            type="text" 
                            class="form-control validate" 
                            name="designationName" 
                            id="input_designationName" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][-][(][)]['][/]" 
                            minlength="2" 
                            maxlength="75" 
                            required 
                            unique="${designationID}" 
                            value="${designationName}"
                            autocomplete="off">
                        <div class="invalid-feedback d-block" id="invalid-input_designationName"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label>Status<span class="text-danger font-weight-bold">*</span></label>
                        <select 
                            class="form-control select2 validate" 
                            id="input_designationStatus" 
                            name="designationStatus"
                            autocomplete="off"
                            required>
                            <option 
                                value="" 
                                disabled 
                                selected
                                ${!data && "selected"}>No Selected</option>
                            <option 
                                value="1" 
                                ${data && designationStatus == "1" && "selected"}>Active</option>
                            <option 
                                value="0" 
                                ${data && designationStatus == "0" && "selected"}>InActive</option>
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-input_designationStatus"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-danger px-5 p-2 btnCancel">CANCEL</button>
        </div>`;
    return html;
} 
    // ----- END MODAL CONTENT -----

    // ----- OPEN ADD MODAL -----
    $(document).on("click", "#btnAdd", function() {
        $("#hris_designation_modalheader").text("ADD DESIGNATION");
        $("#modal_hris_designation").modal("show");
        $("#modal_hris_designation_content").html(preloader);
        const content = modalContent();
        $("#modal_hris_designation_content").html(content);
        departmentContent();
        initAll();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- SAVE MODAL -----
    $(document).on("click", "#btnSave", function() {
    const validate = validateForm("modal_hris_designation");
    if (validate) {
        $("#modal_hris_designation").modal("hide");
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You want to save this?",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Save'
        // }).
        
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

            /**
             * ----- FORM DATA -----
             * tableData = {} -> Objects
             */
            let data = getFormData("modal_hris_designation");
            data.append("tableName", "hris_designation_tbl");
            data.append("feedback", "Your choice");
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
                
            Swal.fire({
                icon: 'success',
                title: 'Successfully saved!',
                showConfirmButton: false,
                timer: 2000
              })
            }else{
                $("#modal_hris_designation").modal("show");
            }
        });
            
        }
    });
    // ----- END SAVE MODAL -----

    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id       = $(this).attr("id");
        const feedback = $(this).attr("feedback");
        $("#hris_designation_modalheader").text("VIEW DESIGNATION");
        $("#modal_hris_designation").modal("show");

        // Display preloader while waiting for the completion of getting the data
        $("#modal_hris_designation_content").html(preloader); 

        const tableData = getTableData("hris_designation_tbl", "*", "designationID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_hris_designation_content").html(content);
                departmentContent(tableData);
                $("#btnSaveConfirmationEdit").attr("rowID", id);
                $("#btnSaveConfirmationEdit").attr("feedback", feedback);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----

    // ----- UPDATE MODAL -----
    $(document).on("click", "#btnUpdate", function() {
        const validate = validateForm("modal_hris_designation");
        if (validate) {
        $("#modal_hris_designation").modal("hide");
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
                confirmButtonText: 'Yes, save changes',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
    
                    const rowID = $(this).attr("rowID");
                    const feedback  = $(this).attr("feedback");
        
                    let data = getFormData("modal_hris_designation");
                    data.append("tableName", "hris_designation_tbl");
                    data.append("whereFilter", "designationID="+rowID);
                    // data.append("feedback", feedback);
        
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
                    
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully saved!',
                    showConfirmButton: false,
                    timer: 2000
                })
                }else{
                    $("#modal_hris_designation").modal("show");
                }
            });
                
            }
        });
        // ----- END UPDATE MODAL -----

    // ------- CANCEl MODAL-------- 
    $(document).on("click",".btnCancel",function(){
        $("#modal_hris_designation").modal("hide");

        const data = getFormData("modal_hris_designation");

        var validate = false;
            for(var i of data.entries()) {
                const count =+i[1];
               validate[0] = i[1];
                if(i[1] !=""){
                    validate = true;
                }
            }

            if(validate == true){

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
                    confirmButtonText: 'Yes, discard!',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Changes successfully discard!',
                        showConfirmButton: false,
                        timer: 2000
                      })
                    }else{
                        $("#modal_hris_designation").modal("show");
                    }
                  });
            }else{
                $("#modal_hris_designation").modal("hide");
            }
       
    });
    // -------- END CANCEL MODAL-----------

    // ---- OPEN DELETE MODAL -----
    $(document).on("click", ".btnDelete", function() {
        const id = $(this).attr("id");
        const feedback = $(this).attr("feedback");

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Discard',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {

            // /**
            //  * ----- DATA -----
            //  * 1. tableName
            //  * 2. whereFilter
            //  * 3. feedback
            // */

            // const data = {
            //     tableName:   "user_account_tbl",
            //     whereFilter: "userrowID="+rowID,
            //     feedback
            // };

            // const saveData = deleteTableData(data);
            // if (saveData) {
            //    tableContent();
            // }

              Swal.fire(
                'Successfully Deleted!',
                '',
                'success'
              )
            }
          });
    });
    // ---- END OPEN DELETE MODAL -----


      
});