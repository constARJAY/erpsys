$(document).ready(function(){
    initDataTables();
    tableContent();
    
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addAward", function(){
    $("#modal_award").modal("show");
    $(".modal_award_header").text("ADD AWARD");
    $("#modal_award_content").html(preloader);
    let modal_award_content    =   ` 
    <div class="modal-body">  
                                                <form id="modal_award_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Award Title <strong class="text-danger">*</strong></label>
                                                                <input type="text" class="form-control validate" name="awardTitle" id="inputawardTitle" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="" value="" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputawardTitle"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Award Description <strong class="text-danger">*</strong></label>
                                                                <textarea style="resize:none" row="3" class="form-control validate" name="awardDescription" id="inputawardDescription" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][?][*][!][#][%][&][ ]" minlength="2" maxlength="500" value="" required ></textarea>
                                                                <div class="invalid-feedback d-block" id="invalid-inputawardDescription"></div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Signatories <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" multiple="multiple" name="awardSignatories" id="awardSignatories" required>
                                                                    ${userAccountOption()}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-awardSignatories"></div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status</label>
                                                                <select class="form-control select2 validate" name="awardStatus" id="awardStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-awardStatus"></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-save px-5 p-2" id="btnSave" data-awardid=""><i class="fas fa-save"></i>&nbsp;Save</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_award_content").html(modal_award_content);
        $("#awardSignatories").select2({ placeholder: "Select Signatories", theme: "bootstrap" });
        initAll();
    },500); 
});

$(document).on("click",".editAward", function(){
    const allowedUpdate = isUpdateAllowed(27);
    $(".modal_award_header").text("EDIT AWARD");
    let awardID       =   $(this).data("awardid");
    let tableData     =   getTableData("hris_award_tbl","","awardID="+awardID);
    let asterisk      =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
    // console.log(rowContent);
    $("#modal_award").modal("show");
    $("#modal_award_content").html(preloader);
    let statusOption        = tableData[0]["awardStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_award_content    =    `       <div class="modal-body">  
                                                <form id="modal_award_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Award Title ${asterisk}</label>
                                                                <input type="text" class="form-control validate" name="awardTitle" id="inputawardTitle" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/]" minlength="2" maxlength="150" unique="${tableData[0]["awardID"]}" value="${tableData[0]["awardTitle"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputawardTitle"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Award Description ${asterisk}</label>
                                                                <textarea style="resize:none" row="3" class="form-control validate" name="awardDescription" id="inputawardDescription" 
                                                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][()]['][/][?][*][!][#][%][&][ ]" minlength="2" maxlength="500" required >${tableData[0]["awardDescription"]}</textarea>
                                                                <div class="invalid-feedback d-block" id="invalid-inputawardDescription"></div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Signatories ${asterisk}</label>
                                                                <select class="form-control select2 validate" multiple="multiple" name="awardSignatories" id="awardSignatories" required>
                                                                    ${userAccountOption(tableData[0]["awardSignatories"])}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-awardSignatories"></div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status</label>
                                                                <select class="form-control select2 validate" name="awardStatus" id="awardStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-awardStatus"></div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-awardid="${tableData[0]["awardID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>   
                                    `;
    setTimeout(function(){
        $("#modal_award_content").html(modal_award_content);
        initAll();
        $("#awardSignatories").select2({ placeholder: "Select Signatories", theme: "bootstrap" });
        if (!allowedUpdate){
            $("#modal_award_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            });
            $("#btnUpdate").hide();
        }
    },500);
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_award_form");
    
    if(condition == true){
        let data = getFormData("modal_award_form", true);
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_award_tbl";
        data["feedback"]                 = $("#inputawardTitle").val();
        sweetAlertConfirmation("add", "Award","modal_award", null, data, true, tableContent);
    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_award_form");
    let awardID           = $(this).data("awardid");
    if(condition == true){
        let data = getFormData("modal_award_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "awardID="+awardID;
        data["tableName"]                =  "hris_award_tbl";
        data["feedback"]                 =  $("#inputawardTitle").val();
        sweetAlertConfirmation("update", "Award","modal_award", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_award_form");
    if(!condition){ 
        sweetAlertConfirmation("cancel", "Award Masterfile","modal_award");
    }else{
        $("#modal_award").modal("hide");
    }
    
});

// FUNCTIONS
function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableCodeConductCategory')){
                $('#tableCodeConductCategory').DataTable().destroy();
            }
            
            var table = $("#tableCodeConductCategory").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                lengthMenu: [ 50, 75, 100, 150],
                columnDefs: [
                    { targets: 0, width:  80 },
                    { targets: 1, width: "25%" },
                    { targets: 3, width: "15%" },
                    { targets: 4, width:  80 }
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
                data:     {tableName: "hris_award_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },

                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableCodeConductCategory">
                        <thead>
                            <tr class="text-left">
                                <th>Award No.</th>
                                <th>Award Title</th>
                                <th>Award Description</th>
                                <th>Signatories</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.awardID, // Required
                            awardTitle:    item.awardTitle
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                       let signatories          = item["awardSignatories"].split("|");
                       let listOfSignatories    = "";
                       
                       signatories.map((signatoriesItems, index)=>{
                           let tableDataSignatories =   getTableData("hris_employee_list_tbl","","employeeID="+signatoriesItems);
                           let comma                =   signatories.length == (index + 1) ? "": ", ";
                            listOfSignatories       +=  tableDataSignatories[0]["employeeFirstname"]+" "+ tableDataSignatories[0]["employeeLastname"]+comma;  
                       });

                        html += `
                        <tr class="btnEdit editAward" data-awardid="${item["awardID"]}">
                            <td>${item["awardID"]}</td> 
                            <td>${item["awardTitle"]}</td>
                            <td>${item["awardDescription"]}</td>
                            <td>${listOfSignatories}</td>
                            <td class="text-center">${item["awardStatus"] == 0 ? "<span class='badge badge-outline-danger w-100'>Inactive</span>" : "<span class='badge badge-outline-success w-100'>Active</span>"} </td>
                        </tr>`;
                    });

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

function userAccountOption(selected = null){
    let selectedSplit           =   selected == null ? "0" : selected.split("|");
    let tableData               =   getTableData("hris_employee_list_tbl","","employeeID NOT IN("+selectedSplit+") AND employeeStatus != 0");
    let returnData              =   "";
    if(selected != null){
            selectedSplit.map(selectedItems =>{
                let tableDataSelected   =   getTableData("hris_employee_list_tbl","","employeeID='"+selectedItems+"'");
                returnData              += `<option value='${tableDataSelected[0]["employeeID"]}' selected> ${tableDataSelected[0]["employeeFirstname"]} ${tableDataSelected[0]["employeeLastname"]}</option>`;
            });
        }
    
    tableData.map(items=>{
        returnData += `<option value="${items["employeeID"]}">${items["employeeFirstname"]} ${items["employeeLastname"]}</option>`;
    });
    return returnData;
}