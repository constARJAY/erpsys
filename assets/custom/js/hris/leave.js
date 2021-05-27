$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addLeave", function(){
    $(".modal_leave_header").text("ADD LEAVE TYPE");
    $("#modal_leave").modal("show");
    $("#modal_leave_content").html(preloader);
    let modal_leave_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_leave_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Leave Type Name <strong class="text-danger">*</strong></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="leaveName" 
                                                                    id="inputleaveName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                    minlength="2" 
                                                                    maxlength="150" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
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
                                                <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i>&nbsp;Save</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_leave_content").html(modal_leave_content);
        initAll();
    },500); 
});

$(document).on("click",".editleave", function(){
    const allowedUpdate = isUpdateAllowed(21);
    $(".modal_leave_header").text("EDIT LEAVE TYPE");
    let leaveID     =   $(this).data("leaveid");
    let tableData   =   getTableData("hris_leave_tbl","","leaveID="+leaveID);
    let asterisk    =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
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
                                                                <label for="">Leave Type Name ${asterisk}</label>
                                                                <input type="text" class="form-control validate" name="leaveName" id="inputleaveName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["leaveID"]}" value="${tableData[0]["leaveName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status ${asterisk}</label>
                                                                <select class="form-control select2 validate" name="leaveStatus" id="inputleaveStatus" leaveid="${leaveID}">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputleaveStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-leaveid="${tableData[0]["leaveID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_leave_content").html(modal_leave_content);
        initAll();
        if (!allowedUpdate) {
            $("#modal_leave_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            })
            $("#btnUpdate").hide();
        }
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
        sweetAlertConfirmation("add", "Leave Type","modal_leave", null, data, true, tableContent);


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
        sweetAlertConfirmation("update", "Leave Type","modal_leave", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_leave_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Leave Type","modal_leave");
    }else{
        $("#modal_leave").modal("hide");
    }
});

$(document).on("change", "[name=leaveStatus]", function(){
    if($(this).attr("leaveid")){
        let leaveID = $(this).attr("leaveid");
        let attrID  = $(this).attr("id");
        let thisValue = $(this).val();
        let employeeCondition  = getTableData("hris_employee_leave_tbl", "COUNT(employeeLeaveID) AS employeeLength", `leaveID = '${leaveID}' AND leaveCredit != '0'`);
        let leaveFormCondition = getTableData("hris_leave_request_tbl", "COUNT(leaveRequestID) AS formLength", `leaveID = '${leaveID}'`);

        if((employeeCondition[0].employeeLength > 0 || leaveFormCondition[0].formLength > 0 ) && thisValue == 0){
            setTimeout(function(){
                $("#"+attrID).removeClass("is-valid").removeClass("validated").addClass("is-invalid");
                $(".select2-selection").removeClass("no-error").addClass("has-error");
                $("#invalid-inputleaveStatus").text(`This record is currently in use!`);
            },180);
            $("#btnUpdate").prop("disabled", true);
        }else{
            $("#"+attrID).removeClass("is-invalid");
            $("#invalid-inputleaveStatus").text(``);
            $("#btnUpdate").prop("disabled", false);
            $(".select2-selection").addClass("no-error").removeClass("has-error");
        }  
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
                    { targets: 2, width: 80 }
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
                                <th>Leave Type Code</th>
                                <th>Leave Type Name</th>
                                <th>Status</th>
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
                        <tr class="btnEdit editleave" data-leaveid="${item["leaveID"]}">
                            <td>${item["leaveCode"]}</td>
                            <td>${item["leaveName"]}</td>
                            <td class="text-center">${item["leaveStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100 '>Active</span>"} </td>
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

