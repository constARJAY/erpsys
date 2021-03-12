$(document).ready(function(){
        
    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableSssTable')){
            $('#tableSssTable').DataTable().destroy();
        }
        
        var table = $("#tableSssTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0,  width: 10 },
                { targets: 1,  width: 120 },
                { targets: 2,  width: 150 },
                { targets: 3,  width: 150 },
                { targets: 4,  width: 150 },
                { targets: 5,  width: 150 },
                { targets: 6,  width: 150 },
                { targets: 7,  width: 150 },
                { targets: 8,  width: 150 },
                { targets: 9,  width: 80 },
                { targets: 10, width: 80 },
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
            data:     {tableName: "hris_schedule_setup_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableSssTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Schedule Name</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                            <th>Sunday</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    let status = item.scheduleStatus == 1 ? `
                    <span class="badge badge-outline-success w-100 px-5 py-2">Active</span>` :
                    `<span class="badge badge-outline-danger w-100 px-5 py-2">Inactive</span>`;

                    html += `
                    <tr>
                        <td>${++index}</td>
                        <td>${item.scheduleName}</td>
                        <td>${item.mondayFrom} - ${item.mondayTo}</td>
                        <td>${item.tuesdayFrom} - ${item.tuesdayTo}</td>
                        <td>${item.wednesdayFrom} - ${item.wednesdayTo}</td>
                        <td>${item.thursdayFrom} - ${item.thursdayTo}</td>
                        <td>${item.fridayFrom} - ${item.fridayTo}</td>
                        <td>${item.saturdayFrom} - ${item.saturdayTo}</td>
                        <td>${item.sundayFrom} - ${item.sundayTo}</td>
                        <td>${status}</td>
                        <td>
                            <button class="btn btn-edit w-100 btnEdit" id="${item.scheduleID}"><i class="fas fa-edit"></i> Edit</button>
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


    function initInputmaskTime() {
        $(".timeFrom").inputmask("hh:mm:ss", {
            placeholder:     "08:00:00", 
            value:     "08:00:00", 
            insertMode:      false,
            hourFormat:      "24", 
            clearMaskOnLostFocus: false,
            floatLabelType: 'Always',
            focus: function(args) {
                args.selectionEnd= args.selectionStart;
            }
        })
        $(".timeTo").inputmask("hh:mm:ss", {
            placeholder:     "05:00:00",
            value:     "05:00:00",
            insertMode:      false,
            hourFormat:      "24", 
            clearMaskOnLostFocus: false,
            floatLabelType: 'Always',
            focus: function(args) {
                args.selectionEnd= args.selectionStart;
            }
        })
    }    


    // ----- MODAL CONTENT -----
    function modalContent(data = false) {

        const scheduleID = data ? (data[0].scheduleID ? data[0].scheduleID : "") : "";
        const scheduleName = data ? (data[0].scheduleName ? data[0].scheduleName : "") : "";
        const scheduleStatus = data ? (data[0].scheduleStatus ? data[0].scheduleStatus : "") : "";
        const mondayFrom = data ? (data[0].mondayFrom ? data[0].mondayFrom : "") : "";
        const mondayTo = data ? (data[0].mondayTo ? data[0].mondayTo : "") : "";
        const mondayStatus = data ? (data[0].mondayStatus ? data[0].mondayStatus : "") : "";
        const tuesdayFrom = data ? (data[0].tuesdayFrom ? data[0].tuesdayFrom : "") : "";
        const tuesdayTo = data ? (data[0].tuesdayTo ? data[0].tuesdayTo : "") : "";
        const tuesdayStatus = data ? (data[0].tuesdayStatus ? data[0].tuesdayStatus : "") : "";
        const wednesdayFrom = data ? (data[0].wednesdayFrom ? data[0].wednesdayFrom : "") : "";
        const wednesdayTo = data ? (data[0].wednesdayTo ? data[0].wednesdayTo : "") : "";
        const wednesdayStatus = data ? (data[0].wednesdayStatus ? data[0].wednesdayStatus : "") : "";
        const thursdayFrom = data ? (data[0].thursdayFrom ? data[0].thursdayFrom : "") : "";
        const thursdayTo = data ? (data[0].thursdayTo ? data[0].thursdayTo : "") : "";
        const thursdayStatus = data ? (data[0].thursdayStatus ? data[0].thursdayStatus : "") : "";
        const fridayFrom = data ? (data[0].fridayFrom ? data[0].fridayFrom : "") : "";
        const fridayTo = data ? (data[0].fridayTo ? data[0].fridayTo : "") : "";
        const fridayStatus = data ? (data[0].fridayStatus ? data[0].fridayStatus : "") : "";
        const saturdayFrom = data ? (data[0].saturdayFrom ? data[0].saturdayFrom : "") : "";
        const saturdayTo = data ? (data[0].saturdayTo ? data[0].saturdayTo : "") : ""
        const saturdayStatus = data ? (data[0].saturdayStatus ? data[0].saturdayStatus : "") : "";
        const sundayFrom = data ? (data[0].sundayFrom ? data[0].sundayFrom : "") : "";
        const sundayTo = data ? (data[0].sundayTo ? data[0].sundayTo : "") : "";
        const sundayStatus = data ? (data[0].sundayStatus ? data[0].sundayStatus : "") : "";

        let button = data ? `
        <button 
            class="btn btn-primary px-5 p-2" 
            id="btnUpdate"
            scheduleID="${scheduleID}">
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
                <div class="col-12">
                    <div class="form-group">
                        <label>Schedule Name <code>*</code></label>
                        <input class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][ ][_][-]" minlength="2" maxlength="30" required unique name="scheduleName" id="input_scheduleName" value="${scheduleName}">
                        <div class="d-block invalid-feedback" id="invalid-input_scheduleName"></div>
                    </div>
                </div>
                <div class="col-12">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th>Enabled</th>
                                <th>Day</th>
                                <th>From</th>
                                <th>To</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox" name="mondayStatus" ${mondayStatus ? "checked" : ""}></td>
                                <td class="text-left">Monday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_mondayFrom" name="mondayFrom" required value="${mondayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_mondayTo" name="mondayTo" required value="${mondayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_mondayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="tuesdayStatus" ${tuesdayStatus ? "checked" : ""}></td>
                                <td class="text-left">Tuesday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_tuesdayFrom" name="tuesdayFrom" required value="${tuesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_tuesdayTo" name="tuesdayTo" required value="${tuesdayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_tuesdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="wednesdayStatus" ${wednesdayStatus ? "checked" : ""}></td>
                                <td class="text-left">Wednesday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_wednesdayFrom" name="wednesdayFrom" required value="${wednesdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_wednesdayTo" name="wednesdayTo" required value="${wednesdayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_wednesdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="thursdayStatus" ${thursdayStatus ? "checked" : ""}></td>
                                <td class="text-left">Thursday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_thursdayFrom" name="thursdayFrom" required value="${thursdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_thursdayTo" name="thursdayTo" required value="${thursdayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_thursdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="fridayStatus" ${fridayStatus ? "checked" : ""}></td>
                                <td class="text-left">Friday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_fridayFrom" name="fridayFrom" required value="${fridayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_fridayTo" name="fridayTo" required value="${fridayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_fridayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="saturdayStatus" ${saturdayStatus ? "selected" : ""}></td>
                                <td class="text-left">Saturday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_saturdayFrom" name="saturdayFrom" required value="${saturdayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_saturdayTo" name="saturdayTo" required value="${saturdayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_saturdayTo"></div>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" name="sundayStatus" ${sundayStatus ? "checked" : ""}></td>
                                <td class="text-left">Sunday</td>
                                <td>
                                    <input type="text" class="form-control timeFrom text-center" id="input_sundayFrom" name="sundayFrom" required value="${sundayFrom}">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayFrom"></div>
                                </td>
                                <td>
                                    <input type="text" class="form-control timeTo text-center" id="input_sundayTo" name="sundayTo" required value="${sundayTo}">
                                    <div class="d-block invalid-feedback" id="invalid-input_sundayTo"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control select2" id="scheduleStatus" name="scheduleStatus">
                            <option value="1" ${scheduleStatus && "selected"}>Active</option>
                            <option value="0" ${scheduleStatus && "selected"}>Inactive</option>
                        </select>
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
        $("#modal_schedule_setup").modal("show");
        $("#modal_schedule_setup .page-title").text("ADD SCHEDULE");
        $("#modal_schedule_setup_content").html(preloader);
        const content = modalContent();
        $("#modal_schedule_setup_content").html(content);
        initAll();
        initInputmaskTime();
    });
    // ----- END OPEN ADD MODAL -----


    // ----- KEYUP FOR TIME TO -----
    $(document).on("keyup", ".timeTo", function() {
        const name = $(this).attr("name");
    })
    // ----- END KEYUP FOR TIME TO -----

    
    // ----- OPEN EDIT MODAL -----
    $(document).on("click", ".btnEdit", function() {
        const id = $(this).attr("id");
        $("#modal_schedule_setup").modal("show");
        $("#modal_schedule_setup .page-title").text("EDIT SCHEDULE");

        $("#modal_schedule_setup_content").html(preloader); 

        const tableData = getTableData("hris_schedule_setup_tbl", "*", "scheduleID="+id, "");
        if (tableData) {
            const content = modalContent(tableData);
            setTimeout(() => {
                $("#modal_schedule_setup_content").html(content);
                initAll();
            }, 500);
        }
    });
    // ----- END OPEN EDIT MODAL -----


    // ----- SAVE ADD -----
    async function saveTableData() {

        try {
            let result = await Swal.fire({
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
                    $("#modal_schedule_setup").modal("show");
                }
            });
            return result;
        } catch(e) {
            console.error(e);
        }

    }

    $(document).on("click", "#btnSave", function() {
        const validate = validateForm("modal_schedule_setup");
        if (!validate) {
            $("#modal_schedule_setup").modal("hide");
            let save = saveTableData();
            console.log(save);
            
        }
    });
    // ----- END SAVE ADD -----
    
});