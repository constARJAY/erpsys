$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addHoliday", function(){
    $("#modal_holiday").modal("show");
    $(".modal_holiday_header").text("ADD HOLIDAY");
    $("#modal_holiday_content").html(preloader);
    let modal_holiday_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name</label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="holidayName" 
                                                                    id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="50" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date</label>
                                                                <input 
                                                                    type="button" 
                                                                    class="form-control daterange validate text-left" 
                                                                    name="holidayDate" 
                                                                    id="inputholidayDate" 
                                                                    data-allowcharacters="[A-Z][ ][,][a-z][0-9]" 
                                                                    minlength="5" 
                                                                    maxlength="20" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayDate"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type</label>
                                                                <select class="form-control select2 validate" name="holidayType" id="inputholidayType" required>
                                                                    <option value="" dissabled>No selected</option>
                                                                    <option value="Regular Holiday">Regular Holiday</option>
                                                                    <option value="Special Holiday">Special Holiday</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Status</label>
                                                                <select class="form-control select2 validate" name="holidayStatus" id="inputholidayStatus" required>
                                                                    <option value="" dissabled>No selected</option>
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
                                                <button class="btn btn-primary px-5 p-2" id="btnSave">SAVE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_holiday_content").html(modal_holiday_content);
        initAll();
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
    let holidayTypeOption   = tableData[0]["holidayType"] == "Regular Holiday" ? `<option dissabled>Select Holiday Type</option><option value="Regular Holiday" selected>Regular Holiday</option><option value="Special Holiday">Special Holiday</option>` : `<option value="" dissabled>Select Holiday Type</option><option value="Regular Holiday">Regular Holiday</option><option value="Special Holiday" selected>Special Holiday</option>`;
    let modal_holiday_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_holiday_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Name</label>
                                                                <input type="text" class="form-control validate" name="holidayName" id="inputholidayName" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9]" minlength="5" maxlength="20" unique="${tableData[0]["holidayID"]}" value="${tableData[0]["holidayName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayName"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Holiday Date</label>
                                                                <input type="button" class="form-control daterange validate" name="holidayDate" id="inputholidayDate" data-allowcharacters="[A-Z][ ][,][a-z][0-9]" 
                                                                    minlength="5"  maxlength="20" unique="${tableData[0]["holidayID"]}" value="${moment(tableData[0]["holidayDate"]).format("MMMM DD, YYYY")}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayDate"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Type</label>
                                                                <select class="form-control select2 validate" name="holidayType" id="inputholidayType">
                                                                    ${holidayTypeOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputholidayType"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6">
                                                            <div class="form-group">
                                                                <label for="">Holiday Status</label>
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
                                                <button class="btn btn-primary px-5 p-2" id="btnUpdate" data-holidayid="${tableData[0]["holidayID"]}">UPDATE</button>
                                                <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_holiday_content").html(modal_holiday_content);
        initAll();
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_holiday_form");
    
    if(condition == true){
        let tableData           = getTableData("hris_holiday_tbl","","","holidayCode DESC");
        var currentDate         = new Date();
        let currentYear         = currentDate.getFullYear();
        let currentYearStr      = currentYear.toString();

        // Generate Number
        let tableDataCode       = tableData.length < 1 ? "" : parseInt(tableData[0]["holidayCode"].slice(6)) + 1;

        let holidayCode  = tableData.length < 1 ? "HLD-"+currentYearStr.slice(2)+"-00001" : "HLD-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

        let data = getFormData("modal_holiday_form", true);
        // console.log(data);
        data["tableData"]["holidayDate"] = moment(data["tableData"]["holidayDate"]).format("YYYY-MM-DD");
        data["tableData[holidayCode]"]   = holidayCode;
        data["tableData[createdBy]"]     = "1";
        data["tableData[updatedBy]"]     = "1";
        data["tableName"]                = "hris_holiday_tbl";
        data["feedback"]                 = holidayCode;
        sweetAlertConfirmation("add", "Holiday","modal_holiday", null, data);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_holiday_form");
    let holidayID           = $(this).data("holidayid");
    let holidayCode         = getTableData("hris_holiday_tbl","holidayCode","holidayID="+holidayID,"holidayCode DESC");
    if(condition == true){
        let data = getFormData("modal_holiday_form", true);
        data["tableData"]["holidayDate"] =  moment(data["tableData"]["holidayDate"]).format("YYYY-MM-DD");
        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "holidayID="+holidayID;
        data["tableName"]                =  "hris_holiday_tbl";
        data["feedback"]                 =   holidayCode[0]["holidayCode"];
        console.log(data);
        sweetAlertConfirmation("update", "Holiday","modal_holiday", null , data);
    }
    
});

$(document).on("click","#btnCancel", function(){
    let condition = emptyFormCondition("modal_holiday_form");
    if(condition == true){
        sweetAlertConfirmation("", "Holiday","modal_holiday");
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
                    { targets: 0, width: "15%" },
                    { targets: 1, width: "25%" },
                    { targets: 4, width: "10%" },
                    { targets: 5, width: "10%" }
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.holidayID, // Required
                            holidayName:    item.holidayName, 
                            holidayDate:    moment(item.holidayDate).format("MMMM DD YYYY")
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr>
                            <td>${item["holidayCode"]}</td>
                            <td>${item["holidayName"]}</td>
                            <td>${moment(item["holidayDate"]).format("MMMM DD YYYY")}</td>
                            <td>${item["holidayType"]}</td>
                            <td>${item["holidayStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editHoliday" data-holidayid="${item["holidayID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
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
