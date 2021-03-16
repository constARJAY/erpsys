// GLOBALIZE VARIABLE
const modalBody           =   $("#modal_approval_setup .modal-body");
const modalFooter         =   $("#modal_approval_setup .modal-footer");


$(document).ready(function(){
    // initAll();
    // $('.select2').select2({theme: "bootstrap"});
});


$(document).on("click", ".module-list", function(e){
    // Script below is for changing list-approver div
        let moduleID    =   $(this).data("moduleid");
        $(".approval-list").html(preloader);
        setTimeout(function(){ getApproval(moduleID);  }, 500);
    
    // Script bellow is for designing
        $(".card").removeClass('module-active');
        $(".module-header").addClass("text-dark").removeClass("text-primary font-weight-bold");
        
        $(this).parent().addClass('module-active');
        $(this).find(".module-header").removeClass("text-dark").addClass("text-primary font-weight-bold");
});

$(document).on("click", ".btn-approval-setup", function(){
    let moduleID    =   $(this).data("moduleid");
    $("#modal_approval_setup").modal("show");
    $(modalBody).html(preloader);
    $(modalFooter).html("");
    setTimeout(function(){ approvalModalContent(moduleID); }, 500);
    
    // let content = modalContent();
    // $("#modal_approval_setup_content").html(content);

    
});

$(document).on("change", ".select2-approvers", function(){
    let selectApproverID    = $(this).attr('id');
    let selectValue         = $(this).val();  
        $(modalBody).find(".select2-approvers").each(function(){
                let approvers           = getApproversForm(modalBody);
                let optionsApprovers    = userAccountList(approvers);
                if(this.id == selectApproverID){

                }else{
                    // $("#"+this.id).val(this.value).trigger('change');
                    if(this.value == "" || this.value == selectValue){
                        $("#"+this.id).empty();
                        $("#"+this.id).append(optionsApprovers);
                    }
                }
        });
});

// Updating Approval setup
$(document).on("click", "#approvalUpdateBtn", function(){
    let moduleID    =   $(this).data("moduleid");
    let condition   =   validateForm("modal_approval_setup_form");
    
        if(condition){
            $("#modal_approval_setup").modal("hide")
              $("#confirmation-modal_approval_setup").modal("show");             
        }else{

        } 
    
});

// Updating Confirmation
$(document).on("click", "#btnSaveConfirmationAdd", function(){
    let moduleID                        =   $("#approvalUpdateBtn").data("moduleid");
    let condition                       =   getTableData("gen_approval_setup_tbl", "","moduleID = '"+ moduleID +"' ");
    let moduleName                      =   getTableData("gen_module_list_tbl", "moduleName","moduleID = '"+ moduleID +"' ");
    let approverFormValue               =   getApproversForm(modalBody,"1");
    
    let data    =   new FormData();
    data.append("tableData[approvalUserAccounts]", approverFormValue.replaceAll(",","|"));
    data.append("tableData[moduleID]", moduleID);
    data.append("tableData[createdBy]", "1");
    data.append("tableData[updatedBy]", "1");
    data.append("tableName", "gen_approval_setup_tbl");
    data.append("whereFilter", "moduleID="+ moduleID);


    const saveData = condition.length == 0 ? insertTableData(data, false, "success|"+moduleName[0]["moduleName"]+" setup successfully") : updateTableData(data);
        if(saveData){
            $(".approval-list").html(preloader);
            setTimeout(function(){ getApproval(moduleID);  }, 500);
        }
});

// Closing Confirmation
$(document).on("click", ".btnCloseConfirmationAdd", function(){
    $("#confirmation-modal_approval_setup").modal("hide");
    $("#modal_approval_setup").modal("show");
});

function getApproval(moduleID){
    
    let condition       = getTableData("gen_approval_setup_tbl", "", "moduleID = '"+moduleID+"' ");
    let tableData       = condition.length > 0 ? condition : getTableData("gen_module_list_tbl", "", "moduleID = '"+ moduleID +"' ");
    console.log(tableData);
    let approvalList    = "";

    if(condition.length > 0){
        tableData.map((items, index) =>{
            let tableDataArray =    tableData[0]["approvalUserAccounts"].split("|");
            tableDataArray.map((items,index) =>{
                let tableDataItems = getTableData("gen_user_account_tbl", "", "userAccountID = '"+ items +"' ");
                approvalList    +=   ` <div class="row border rounded m-2 py-1">
                                            <div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center"><img class="img-fluid rounded-circle" src="assets/images/profile-images/default.jpg" alt="avatar" height="70" width="70"></div>
                                            <div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
                                                <span>
                                                    ${tableDataItems[0]["firstname"]} ${tableDataItems[0]["lastname"]}<br>
                                                    <small class="text-primary">${tableDataItems[0]["role"]} | Designation</small>    
                                                </span>
                                            </div>
                                            <div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                                <h5><small class="text-primary"> Level ${index + 1} </small></h5>
                                            </div>
                                        </div>
                                    `;
            });
            
        });

    }else{  
        for (var i = 0; i < tableData[0]["moduleApprover"]; i++) {
            approvalList    +=   ` <div class="row border rounded m-2 py-1">
                                        <div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center"><img class="img-fluid rounded-circle" src="assets/images/profile-images/default.jpg" alt="avatar" height="70" width="70"></div>
                                        <div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
                                            <span>
                                                Level ${i + 1} Name approver  <br>
                                                <small class="text-primary">Department | Designation</small>    
                                            </span>
                                        </div>
                                        <div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                            <h5><small class="text-primary"> Level ${i + 1} </small></h5>
                                        </div>
                                    </div>
                                    `;
        }

    }

    approvalList += `   <div class="py-2 border-top d-flex justify-content-end align-items-end">
                            <button class="btn btn-primary btn-approval-setup" data-moduleid="${moduleID}">Update Approver</button>
                        </div>`;
    $(".approval-list").html(approvalList);
}

function approvalModalContent(moduleID){
    

    let moduleName          =   getTableData("gen_module_list_tbl", "moduleName", "moduleID = '"+moduleID+"' ");
    // let modalBody           =   $("#modal_approval_setup .modal-body");
    // let modalFooter         =   $("#modal_approval_setup .modal-footer");
    let modalBodyContent    =   `<h5 class="text-center text-primary">${moduleName[0]["moduleName"]}</h5>`;
    let modalFooterContent  =   "";

    let condition       = getTableData("gen_approval_setup_tbl", "", "moduleID = '"+moduleID+"' ");
    let tableData       = condition.length > 0 ? condition : getTableData("gen_module_list_tbl", "", "moduleID = '"+moduleID+"' ");
    
    if(condition.length > 0){
        let tableDataArray  =  tableData[0]["approvalUserAccounts"].split("|");
        tableDataArray.map((items, index) =>{
            modalBodyContent    +=   ` <div class="col-12">
                                            <div class="form-group form-group-approvers${i + 1}">
                                                <label for="approvers${index + 1}">Level ${index + 1} Approver</label>
                                                <select class="form-control select2 select2-approvers validate" id="approvers${index + 1}" required>
                                                    ${userAccountList(items)}
                                                    ${approvalList(items)}
                                                </select>
                                                <div class="invalid-feedback" id=""></div>
                                            </div>
                                        </div>`;
        });

    }else{  
        for (var i = 0; i < tableData[0]["moduleMaxApprover"]; i++) {
            modalBodyContent    +=   ` <div class="col-12">
                                            <div class="form-group form-group-approvers${i + 1}">
                                                <label for="approvers${i + 1}">Level ${i + 1} Approver</label>
                                                <select class="form-control select2 select2-approvers validate" id="approvers${i + 1}" required>
                                                    <!--<option value="" dissabled>Select Role</option> -->
                                                    ${userAccountList("'0'")}
                                                </select>
                                                <div class="invalid-feedback" id=""></div>
                                            </div>
                                        </div>`;
        }

    }







    modalFooterContent = `  <button class="btn btn-primary px-5 p-2" data-moduleid="${moduleID}" id="approvalUpdateBtn">UPDATE</button>
                            <button class="btn btn-danger px-5 p-2" data-dismiss="modal">CANCEL</button>`;


    $(modalBody).html(modalBodyContent);
    $(modalFooter).html(modalFooterContent);
    initAll();
}

function approvalList(userAccountID){
    let returnData              = "";
    let optionApproverList      = getTableData("gen_user_account_tbl","","userAccountID="+userAccountID);
                 returnData += `<option value="${optionApproverList[0]["userAccountID"]}" selected>${optionApproverList[0]["firstname"]} ${optionApproverList[0]["lastname"]}</option>`;
        
    return returnData;
}

function userAccountList(approvers){
    let tableData       = getTableData("gen_user_account_tbl", "", "userAccountID NOT IN("+approvers+")   "); 
    let returnValue     = `<option value="" dissabled>Select Role</option>`;
    tableData. map((items,index)=>{
        returnValue += `<option value="${items["userAccountID"]}">${items["firstname"]} ${items["lastname"]}</option>`;
    });

    return  returnValue;
}

// getApproversForm(modalBody,"2");
function getApproversForm(formID, condition = null){
    data = [];
    formID.find("select").each(function(){
        var dataValue   =   condition == null ? (this.value == "" ? "'0'" : "'"+ this.value +"'") :  this.value ;
    //    data.push({[this.id] : dataValue});
    data.push(dataValue);
   });

   return data.join(",");
}



// NEED FOR COLLABORATIONS
function getApproverList(moduleID){
    let tableData   = getTableData("gen_approval_setup_tbl", "approvalUserAccounts", "moduleID = '"+moduleID+"' ");
    let result      = tableData.length < 1 ? "undefined" : tableData[0]["approvalUserAccounts"];
    return result;
}