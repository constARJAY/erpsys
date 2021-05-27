$(document).ready(function(){
    initDataTables();
    tableContent();
});

// OPENING ADD & EDIT MODAL
$(document).on("click",".addQualification", function(){
    $("#modal_qualification").modal("show");
    $(".modal_qualification_header").text("ADD QUALIFICATION");
    $("#modal_qualification_content").html(preloader);
    let modal_qualification_content    =   ` 
                                            <div class="modal-body">  
                                                <form id="modal_qualification_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Qualification <strong class="text-danger">*</strong></label>
                                                                <input 
                                                                    type="text" 
                                                                    class="form-control validate" 
                                                                    name="qualificationName" 
                                                                    id="inputqualification" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9][.][,][-][()]['][/][?][*][!][#][%]" 
                                                                    minlength="2" 
                                                                    maxlength="150" 
                                                                    unique
                                                                    required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputqualification"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status <strong class="text-danger">*</strong></label>
                                                                <select class="form-control select2 validate" name="qualificationStatus" id="inputqualificationStatus">
                                                                    <option value="1">Active</option>
                                                                    <option value="0">Inactive</option>
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputqualificationStatus"></div>
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
        $("#modal_qualification_content").html(modal_qualification_content);
        initAll();
    },500); 
});

$(document).on("click",".editQualification", function(){
    const allowedUpdate = isUpdateAllowed(26);
    let asterisk    =   !allowedUpdate ? `` : `<strong class="text-danger">*</strong>`;
    $(".modal_qualification_header").text("EDIT QUALIFICATION");
    let qualificationID =  $(this).data("qualificationid");
    let tableData       =  getTableData("hris_qualification_tbl","","qualificationID="+qualificationID);

    // console.log(rowContent);
    $("#modal_qualification").modal("show");
    $("#modal_qualification_content").html(preloader);
    let statusOption        = tableData[0]["qualificationStatus"] == "1" ?`<option value="1" selected>Active</option> <option value="0" >Inactive</option>` : `<option value="1" >Active</option> <option value="0" selected>Inactive</option>`;
    let modal_qualification_content    =   `       <div class="modal-body">  
                                                <form id="modal_qualification_form">
                                                    <div class="row"> 
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Qualification ${asterisk}</label>
                                                                <input type="text" class="form-control validate" name="qualificationName" id="inputqualification" 
                                                                    data-allowcharacters="[A-Z][ ][a-z][0-9][.][,][-][()]['][/][?][*][!][#][%]" minlength="2" maxlength="150" unique="${tableData[0]["qualificationID"]}" value="${tableData[0]["qualificationName"]}" required >
                                                                <div class="invalid-feedback d-block" id="invalid-inputqualification"></div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12 col-sm-12">
                                                            <div class="form-group">
                                                                <label for="">Status ${asterisk}</label>
                                                                <select class="form-control select2 validate" name="qualificationStatus" id="inputqualificationStatus">
                                                                    ${statusOption}
                                                                </select>
                                                                <div class="invalid-feedback d-block" id="invalid-inputqualificationStatus"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update px-5 p-2" id="btnUpdate" data-qualificationid="${tableData[0]["qualificationID"]}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel px-5 p-2" ><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>
                                            `;
    setTimeout(function(){
        $("#modal_qualification_content").html(modal_qualification_content);
        initAll();
        if (!allowedUpdate) {
            $("#modal_qualification_content").find("input, select, textarea").each(function() {
                $(this).attr("disabled", true);
            })
            $("#btnUpdate").hide();
        }
    },500);
            
      
});

// ACTION EVENTS BUTTONS
$(document).on("click", "#btnSave", function(){
    let condition = validateForm("modal_qualification_form");
    
    if(condition == true){
        let data = getFormData("modal_qualification_form", true);
        data["tableData[createdBy]"]     = sessionID;
        data["tableData[updatedBy]"]     = sessionID;
        data["tableName"]                = "hris_qualification_tbl";
        data["feedback"]                 = $("#inputqualification").val();
        sweetAlertConfirmation("add", "Qualification","modal_qualification", null, data, true, tableContent);


    }
});

$(document).on("click", "#btnUpdate", function(){
    let condition           = validateForm("modal_qualification_form");
    let qualificationID     = $(this).data("qualificationid");
     if(condition == true){
        let data = getFormData("modal_qualification_form", true);
        data["tableData"]["updatedBy"]   =  sessionID;
        data["whereFilter"]              =  "qualificationID="+qualificationID;
        data["tableName"]                =  "hris_qualification_tbl";
        data["feedback"]                 =  $("#inputqualification").val();
        sweetAlertConfirmation("update", "Qualification","modal_qualification", null , data, true, tableContent);
    }
    
});

$(document).on("click",".btnCancel", function(){
    let condition = isFormEmpty("modal_qualification_form");
    if(!condition){
        sweetAlertConfirmation("cancel", "Qualification","modal_qualification");
    }else{
        $("#modal_qualification").modal("hide");
    }
    
});

// FUNCTIONS

function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableQualification')){
                $('#tableQualification').DataTable().destroy();
            }
            
            var table = $("#tableQualification").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: "11%" },
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
                data:     {tableName: "hris_qualification_tbl"},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableQualification">
                        <thead>
                            <tr class="text-left">
                                <th>Qualification Code</th>
                                <th>Qualification Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                        let unique = {
                            id:                   item.qualificationID, // Required
                            qualificationName:    item.qualificationName
                        }
                        uniqueData.push(unique);
                        // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                        html += `
                        <tr class="btnEdit editQualification" data-qualificationid="${item["qualificationID"]}">
                            <td>${generateCode("QLN",item["qualificationID"] - 1)}</td>
                            <td>${item["qualificationName"]}</td>
                            <td class="text-center">${item["qualificationStatus"] == 0 ? "<span class='badge badge-outline-danger w-100 '>Inactive</span>" : "<span class='badge badge-outline-success w-100 '>Active</span>"} </td>
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
