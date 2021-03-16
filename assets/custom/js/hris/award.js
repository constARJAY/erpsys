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
                        <label for="">Award Title</label>
                        <input type="text" class="form-control validate" name="awardTitle" id="inputawardTitle" 
                            data-allowcharacters="[A-Z][ ][a-z][0-9]" minlength="5" maxlength="100" unique="" value="" required >
                        <div class="invalid-feedback d-block" id="invalid-inputawardTitle"></div>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Award Description</label>
                        <textarea style="resize:none" row="3" class="form-control validate" name="awardDescription" id="inputawardDescription" 
                            data-allowcharacters="[A-Z][ ][,][.]['][a-z][0-9]" minlength="5" maxlength="200" value="" required ></textarea>

                        <div class="invalid-feedback d-block" id="invalid-inputawardDescription"></div>
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Signatories</label>
                        <select class="form-control select2 validate" multiple="multiple" name="awardSignatories" id="awardSignatories">
                            ${userAccountOption()}
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-awardSignatories"></div>
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Award Status</label>
                        <select class="form-control select2 validate" name="awardStatus" id="awardStatus">
                            <option value="" dissabled>No selected</option>
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
        <button class="btn btn-primary px-5 p-2" id="btnSave" data-awardid="">SAVE</button>
        <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
    </div>`;
    setTimeout(function(){
        $("#modal_award_content").html(modal_award_content);
        initAll();
    },500); 
});

$(document).on("click",".editAward", function(){
    $(".modal_award_header").text("EDIT AWARD");
    let awardID       =   $(this).data("awardid");
    let tableData       =   getTableData("hris_award_tbl","","awardID="+awardID);

    // console.log(rowContent);
    $("#modal_award").modal("show");
    $("#modal_award_content").html(preloader);
    let statusOption        = tableData[0]["awardStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_award_content    =   ` 
    <div class="modal-body">  
        <form id="modal_award_form">
            <div class="row"> 
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Award Title</label>
                        <input type="text" class="form-control validate" name="awardTitle" id="inputawardTitle" 
                            data-allowcharacters="[A-Z][ ][a-z][0-9]" minlength="5" maxlength="100" unique="${tableData[0]["awardID"]}" value="${tableData[0]["awardTitle"]}" required >
                        <div class="invalid-feedback d-block" id="invalid-inputawardTitle"></div>
                    </div>
                </div>
                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Award Description</label>
                        <textarea style="resize:none" row="3" class="form-control validate" name="awardDescription" id="inputawardDescription" 
                            data-allowcharacters="[A-Z][ ][,][.]['][a-z][0-9]" minlength="5" maxlength="200" required >${tableData[0]["awardDescription"]}</textarea>

                        <div class="invalid-feedback d-block" id="invalid-inputawardDescription"></div>
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Signatories</label>
                        <select class="form-control select2 validate" multiple="multiple" name="awardSignatories" id="awardSignatories">
                            ${userAccountOption(tableData[0]["awardSignatories"])}
                        </select>
                        <div class="invalid-feedback d-block" id="invalid-awardSignatories"></div>
                    </div>
                </div>

                <div class="col-md-12 col-sm-12">
                    <div class="form-group">
                        <label for="">Award Status</label>
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
        <button class="btn btn-primary px-5 p-2" id="btnUpdate" data-awardid="${tableData[0]["awardID"]}">UPDATE</button>
        <button class="btn btn-danger px-5 p-2" id="btnCancel">CANCEL</button>
    </div>`;
    setTimeout(function(){
        $("#modal_award_content").html(modal_award_content);
        initAll();
    },500);
            
      
});



// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_award_form");
    
    if(condition == true){
        let data = getFormData("modal_award_form", true);
        data["tableData[createdBy]"]     = "1";
        data["tableData[updatedBy]"]     = "1";
        data["tableName"]                = "hris_award_tbl";
        data["feedback"]                 = $("#inputawardTitle").val();
        sweetAlertConfirmation("add", "Award Masterfile","modal_award", null, data);
    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_award_form");
    let awardID           = $(this).data("awardid");
    if(condition == true){
        let data = getFormData("modal_award_form", true);
        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "awardID="+awardID;
        data["tableName"]                =  "hris_award_tbl";
        data["feedback"]                 =  $("#inputawardTitle").val();
        sweetAlertConfirmation("update", "Award","modal_award", null , data);
    }
    
});

$(document).on("click","#btnCancel", function(){
    let condition = emptyFormCondition("modal_award_form");
    if(condition == true){
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
                columnDefs: [
                    { targets: 0, width: "5%" },
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:             item.awardID, // Required
                            awardName:    item.awardName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                       let signatories          = item["awardSignatories"].split("|");
                       let listOfSignatories    = "";
                       signatories.map(signatoriesItems=>{
                           let tableDataSignatories =   getTableData("gen_user_account_tbl","","userAccountID="+signatoriesItems);
                            listOfSignatories       +=  tableDataSignatories[0]["firstname"]+" "+ tableDataSignatories[0]["lastname"]+",";  
                       });

                        html += `
                        <tr>
                            <td>${item["awardID"]}</td>
                            <td>${item["awardTitle"]}</td>
                            <td>${item["awardDescription"]}</td>
                            <td>${listOfSignatories}</td>
                            <td>${item["awardStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 p-2'>Inactive</span>" : "<span class='badge badge-outline-success w-100 p-2'>Active</span>"} </td>
                            <td class="text-center"> <button class="btn w-100 btn-primary d-flex justify-content-center align-items-center editAward" data-awardid="${item["awardID"]}"><i class="icon-pencil px-2"></i> <span class="d-none d-sm-none d-md-block d-lg-block d-xl-block">Edit&nbsp;</span> </button></td>
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
    let returnData          =  "";
    let selectedSplit       =   selected == null ? "0" : selected.split("|");
    let tableData           =   getTableData("gen_user_account_tbl","","userAccountID NOT IN("+selectedSplit+") AND status != 0");    
    if(selected != null){
           
            selectedSplit.map(selectedItems =>{
                let tableDataSelected   =   getTableData("gen_user_account_tbl","","userAccountID='"+selectedItems+"'");
                returnData              += `<option value='${tableDataSelected[0]["userAccountID"]}' selected> ${tableDataSelected[0]["firstname"]} ${tableDataSelected[0]["lastname"]}</option>`;
            });
        }
    
    tableData.map(items=>{
        returnData += `<option value="${items["userAccountID"]}">${items["firstname"]} ${items["lastname"]}</option>`;
    });
    return returnData;
}
