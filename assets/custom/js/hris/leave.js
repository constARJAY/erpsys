$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addLeave", function(){
    $("#modal_leave").modal("show");
    $(".modal_leave_header").text("ADD LEAVE");
    $("#modal_leave_content").html(preloader);
    let modal_leave_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_leave_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Name <span class="text-danger">*</span></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="leaveName" 
                                                                    id="inputleaveName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="50" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Status  <span class="text-danger">*</span></label>
                                                                <select class="form-control select2 validate" name="leaveStatus" id="inputleaveStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_leave_content").html(modal_leave_content);
        initAll();
    },500); 
});

$(document).on("click",".editleave", function(){
    $(".modal_leave_header").text("EDIT leave");
    let leaveID       =   $(this).data("leaveid");
    let tableData       =   getTableData("hris_leave_tbl","","leaveID="+leaveID);

    // console.log(rowContent);
    $("#modal_leave").modal("show");
    $("#modal_leave_content").html(preloader);
    let statusOption        = tableData[0]["leaveStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let leaveTypeOption   = tableData[0]["leaveType"] == "Regular leave" ? `<option dissabled>Select leave Type</option><option value="Regular leave" selected>Regular leave</option><option value="Special leave">Special leave</option>` : `<option value="" dissabled>Select leave Type</option><option value="Regular leave">Regular leave</option><option value="Special leave" selected>Special leave</option>`;
    let modal_leave_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_leave_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Name</label>
                                                                <input type="text" class="form-control validate" name="leaveName" id="inputleaveName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" minlength="5" maxlength="20" unique="${tableData[0]["leaveID"]}" value="${tableData[0]["leaveName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Status</label>
                                                                <select class="form-control select2 validate" name="leaveStatus" id="inputleaveStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-primary px-5 p-2" id="btnUpdate" data-leaveid="${tableData[0]["leaveID"]}">UPDATE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_leave_content").html(modal_leave_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_leave_form");
    
    if(condition == true){
        let tableData       = getTableData("hris_leave_tbl");
        let codeCondition   = tableData.length < 1 ? "0" : "";
        let data = getFormData("modal_leave_form", true);
        data["tableData[leaveCode]"]     = generateCode("LVE",codeCondition,"hris_leave_tbl","leaveCode");;
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_leave_tbl";
        data["feedback"]                 = $("#inputleaveName").val();
        sweetAlertConfirmation("add", "Leave Masterfile","modal_leave", null, data, true, tableContent);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_leave_form");
    let leaveID           = $(this).data("leaveid");
    let leaveCode         = getTableData("hris_leave_tbl","leaveCode","leaveID="+leaveID,"leaveCode DESC");
    if(condition == true){
        let data = getFormData("modal_leave_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "leaveID="+leaveID;
        data["tableName"]                =  "hris_leave_tbl";
        data["feedback"]                 =  $("#inputleaveName").val();
        console.log(data);
        sweetAlertConfirmation("update", "leave","modal_leave", null , data, true, tableContent);
    }
    
});

$(document).on("click","#btnCancel", function(){
    let condition = isFormEmpty("modal_leave_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Leave","modal_leave");
    }else{
        $("#modal_leave").modal("hide");
    }
    
});

// FUNCTIONS


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
                    { targets: 0, width: "10%" },
                    { targets: 1, width: "25%" },
                    { targets: 2, width: "5%" },
                    { targets: 3, width: "5%" }
                ],
            });
}

function tableContent(){
        unique = [];

        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: "hris_leave_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableLeave">
                        <thead>
                            <tr class="text-left">
                                <th>Leave Code</th>
                                <th>Leave Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:           item.leaveID, // Required
                            leaveName:    item.leaveName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr>
                            <td>${item["leaveCode"]}</td>
                            <td>${item["leaveName"]}</td>
                            <td>${item["leaveStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editleave" data-leaveid="${item["leaveID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
                        </tr>`;
                    })
                    html += `</tbody>
                    </table>`;
                    initDataTables();
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

