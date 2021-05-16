$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addHoliday", function(){
    $(".modal_holiday_header").text("ADD HOLIDAY")
    $("#modal_holiday").modal("show");
    $("#modal_holiday_content").html(preloader);
    let modal_holiday_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name <strong class="text-danger">*</strong></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="holidayName" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" 
                                                                    minlength="2" 
                                                                    maxlength="150" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date <strong class="text-danger">*</strong></label>
                                                                <input 
                                                                    type="button" 
                                                                    class="form-control daterange validate text-left" 
                                                                    name="holidayDate" 
                                                                    id="inputholidayDate" 
                                                                    data-allowcharacters="[A-Z][ ][,][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20"
                                                                    value="${moment().format("MMMM DD, YYYY")}"
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayDate"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="holidayType" id="inputholidayType" required>
                                                                    <option value="" dissabled>No selected</option>
                                                                    <option value="Regular Holiday">Regular Holiday</option>
                                                                    <option value="Special Non-Working Holiday">Special Non-Working Holiday</option>
                                                                    <option value="Special Working Holiday">Special Working Holiday</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="holidayStatus" id="inputholidayStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayStatus"></div>
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
        $("#modal_holiday_content").html(modal_holiday_content);
        initAll();
        $("#inputholidayDate").data("daterangepicker").startDate = moment();
        $("#inputholidayDate").data("daterangepicker").endDate 	= moment();
    },500); 
});

$(document).on("click",".editHoliday", function(){
    $(".modal_holiday_header").text("EDIT HOLIDAY");
    let holidayID       =   $(this).data("holidayid");
    let tableData       =   getTableData("hris_holiday_tbl","","holidayID="+holidayID);

    // console.log(rowContent);
    $("#modal_holiday").modal("show");
    $("#modal_holiday_content").html(preloader);
    let statusOption        = tableData[0]["holidayStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let holidayTypeOption   = `<option value="" dissabled>No selected</option>`;
    switch(tableData[0]["holidayType"]){
        case "Regular Holiday":
            holidayTypeOption += `  <option value="Regular Holiday" selected>Regular Holiday</option>
                                    <option value="Special Non-Working Holiday">Special Non-Working Holiday</option>
                                    <option value="Special Working Holiday">Special Working Holiday</option>`;
        break;
        case"Special Non-Working Holiday":
        holidayTypeOption += `  <option value="Regular Holiday">Regular Holiday</option>
                                    <option value="Special Non-Working Holiday" selected>Special Non-Working Holiday</option>
                                    <option value="Special Working Holiday">Special Working Holiday</option>`;
        break;
        default:
            holidayTypeOption += `  <option value="Regular Holiday">Regular Holiday</option>
                                    <option value="Special Non-Working Holiday">Special Non-Working Holiday</option>
                                    <option value="Special Working Holiday" selected>Special Working Holiday</option>`;
        break;
    }
    let modal_holiday_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name <strong class="text-danger">*</strong></label>
                                                                <input type="text" class="form-control validate" name="holidayName" id="inputholidayName" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["holidayID"]}" value="${tableData[0]["holidayName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date <strong class="text-danger">*</strong></label>
                                                                <input type="button" class="form-control text-left daterange validate" name="holidayDate" id="inputholidayDate" data-allowcharacters="[A-Z][ ][,][a-z][0-9]" 
                                                                    minlength="5"  maxlength="20" unique="${tableData[0]["holidayID"]}" value="${moment(tableData[0]["holidayDate"]).format("MMMM DD, YYYY")}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayDate"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="holidayType" id="inputholidayType" required>
                                                                    ${holidayTypeOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="holidayStatus" id="inputholidayStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-holidayid="${tableData[0]["holidayID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;
                                                Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_holiday_content").html(modal_holiday_content);
        initAll();
        $("#inputholidayDate").data("daterangepicker").startDate = moment(tableData[0]["holidayDate"],"YYYY-MM-DD");
        $("#inputholidayDate").data("daterangepicker").endDate 	= moment(tableData[0]["holidayDate"],"YYYY-MM-DD");
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_holiday_form");
    
    if(condition == true){
        let tableData       = getTableData("hris_holiday_tbl");
        let codeCondition   = tableData.length < 1 ? "0" : "";
        let data = getFormData("modal_holiday_form", true);
        // console.log(data);
        data["tableData"]["holidayDate"] = moment(data["tableData"]["holidayDate"]).format("YYYY-MM-DD");
        data["tableData[holidayCode]"]   = generateCode("HLD",codeCondition,"hris_holiday_tbl","holidayCode");
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_holiday_tbl";
        data["feedback"]                 = $("#inputholidayName").val();
        sweetAlertConfirmation("add", "Holiday","modal_holiday", null, data, true, tableContent);
    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_holiday_form");
    let holidayID           = $(this).data("holidayid");
    if(condition == true){
        let data = getFormData("modal_holiday_form", true);
        data["tableData"]["holidayDate"] =  moment(data["tableData"]["holidayDate"]).format("YYYY-MM-DD");
        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "holidayID="+holidayID;
        data["tableName"]                =  "hris_holiday_tbl";
        data["feedback"]                 =  $("#inputholidayName").val();
        console.log(data);
        sweetAlertConfirmation("update", "Holiday","modal_holiday", null , data, true, tableContent);
    }
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_holiday_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Holiday","modal_holiday");
    }else{
        $("#modal_holiday").modal("hide");
    }
    
});





// FUNCTIONS
function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableHoliday')){
                $('#tableHoliday').DataTable().destroy();
            }
            
            var table = $("#tableHoliday").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "10%" },
                    { targets: 4, width: 80 }
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
                data:     {tableName: "hris_holiday_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableHoliday">
                        <thead>
                            <tr class="text-left">
                                <th>Holiday Code</th>
                                <th>Holiday Name</th>
                                <th>Holiday Date</th>
                                <th>Holiday Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.holidayID, // Required
                            holidayName:    item.holidayName, 
                            holidayDate:    moment(item.holidayDate).format("MMMM DD, YYYY")
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr class="btnEdit editHoliday" data-holidayid="${item["holidayID"]}">
                            <td>${item["holidayCode"]}</td>
                            <td>${item["holidayName"]}</td>
                            <td>${moment(item["holidayDate"]).format("MMMM DD, YYYY")}</td>
                            <td>${item["holidayType"]}</td>
                            <td class="text-center">${item["holidayStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 '>Inactive</span>" : "<span class='badge badge-outline-success w-100 '>Active</span>"} </td>
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
