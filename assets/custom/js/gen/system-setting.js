let lastDate    =  31;
let dateArray   =  [];

for (let index = 1; index <= lastDate; index++) {
    dateArray.push(index);
}

// let systemSettingData;
let placing;
$(document).ready(function(){
    // systemSettingData   = getTableData(`gen_system_setting_tbl`);
    placing             = ["First", "Second","Third","Fourth"];
    pageContent();

    $(document).on("click", ".btnUpdate", function(){
        let modalBodyContent    = "", modalHeader = "";
        let thisAction          = $(this).attr("givenaction");
            switch (thisAction) {
                case "cuttoff":
                        modalHeader      = "CUT OFF";
                        modalBodyContent += getCutOffModal();
                    break;
                case "pettycash":
                        modalHeader = "PETTY CASH";
                        modalBodyContent += getPettyCash();
                    break;
                case "clientfund":
                        modalHeader = "CLIENT FUND";
                        modalBodyContent  += getClientFundModal();
                    break;    
                default:
                        modalHeader = "APPROVAL";
                        modalBodyContent  += getApprovalModal();
                    break;
            }
        
        let modalBody           =   `<form id="system_setting_form">${modalBodyContent}</form>`;
        let modalFooterContent  =   `<button class="btn btn-save px-5 p-2" id="btnUpdate" givenaction="${thisAction}" settingid="${encryptString("1")}"><i class="fas fa-save"></i>&nbsp; Update</button>
                                    <button class="btn btn-cancel btnCancel px-5 p-2" givenaction="${thisAction}"><i class="fas fa-ban"></i>&nbsp;Cancel</button>`;
        $(".modal_content_header").text(`UPDATE ${modalHeader}`);
        $("#modal_content_body").html(modalBody);
        $("#modal_content_footer").html(modalFooterContent);
        setTimeout(() => {
            $("#modal_content").modal("show");
            initAll();
            $('[data-toggle="tooltip"]').tooltip();
        }, 500);
    });
    
    $(document).on("click", "#btnUpdate", function(){
        let condition          = validateForm("system_setting_form");
        let systemSettingID    = decryptString($(this).attr("settingid"));
        let feedback;
        switch ($(this).attr("givenaction")) {
            case "cuttoff":
                    feedback = "Cut-off";
                break;
            case "pettycash":
                feedback = "Petty Cash";
                break;
            case "clientfund":
                feedback = "Client Fund";
                break;    
            default:
                feedback = "Approval";
                break;
        }

        if(condition == true){
                
            let data = getFormData("system_setting_form", true);

            if(feedback == "Cutoff"){
                $(".mandates-checkbox").each(function(){
                    let columnName  = $(this).attr("name");
                    let thisValue   = $(this).prop("checked") ? 1 : 0;
                    data["tableData"][columnName] = thisValue;
                });
            }

            data["tableData"]["updatedBy"]   =  sessionID;
            data["whereFilter"]              =  "systemSettingID ="+systemSettingID;
            data["tableName"]                =  "gen_system_setting_tbl";
            data["feedback"]                 =  feedback;
            thisAlertConfirmation("update", feedback,"modal_content", null , data, true);
        }
        
    });
    
    $(document).on("click",".btnCancel", function(){
        let feedback;
        switch ($(this).attr("givenaction")) {
            case "cuttoff":
                    feedback = "Cut-off";
                break;
            case "pettycash":
                feedback = "Petty Cash";
                break;
            case "clientfund":
                feedback = "Client Fund";
                break;    
            default:
                feedback = "Approval";
                break;
        }
        let condition = isFormEmpty("system_setting_form");
        if(!condition){ 
            thisAlertConfirmation("cancel", feedback,"modal_content");
        }else{
            $("#modal_content").modal("hide");
        }
        
    });
    
    $(document).on("keyup","[name=firstCutOffDateStart], [name=firstCutOffDateEnd] ",function(){
        let remainingDate   = [];
        let startCutoff     =  $("[name=firstCutOffDateStart]").val();
        let endCutoff       =  $("[name=firstCutOffDateEnd]").val();

        if(startCutoff && endCutoff){
           dateArray.filter(x=> x > endCutoff).map(x=>{
                remainingDate.push(x);
           });
           dateArray.filter(x=> x < startCutoff).map(x=>{
                remainingDate.push(x);
           });  
           let start = remainingDate.shift();
           let end   = remainingDate.pop();
           $("[name=secondCutOffDateStart]").val(start);
           $("[name=secondCutOffDateEnd]").val(end);

           
        }else{
            $("[name=secondCutOffDateStart]").val("");
            $("[name=secondCutOffDateEnd]").val("");
        }
        
    });

    $(document).on("click",".mandates-checkbox",function(){
        $(".mandates-checkbox").prop("checked", false);
        let thisEvent   = $(this);
        thisEvent.prop("checked",true);

    });

    function getApprovalModal(isEdit = false){
        let  systemSettingData   = getTableData(`gen_system_setting_tbl`);
        let {   minimumToApprove = "",
                maximumToApprove = ""
            } = systemSettingData[0];

        let html = `
                    <div class="row"> 
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="minimumToApprove" >Minimum Days to Approve <code>*</code></label>
                                <input type="text" class="form-control number validate" min="1" max="10" maxlength="2" name="minimumToApprove" id="minimumToApprove" 
                                    data-allowcharacters="[0-9]" value="${minimumToApprove}" required>
                                <div class="invalid-feedback d-block" id="invalid-minimumToApprove"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="">Maximum Days to Approve <code>*</code></label>
                                <input type="text" class="form-control number validate" min="0" max="10"  maxlength="2" name="maximumToApprove" id="maximumToApprove" 
                                    data-allowcharacters="[0-9]" value="${maximumToApprove}" required >
                                <div class="invalid-feedback d-block" id="invalid-maximumToApprove"></div>
                            </div>
                        </div>
                    </div>`;
        return html;
    }
    
    function getCutOffModal(isEdit = false){
        let  systemSettingData   = getTableData(`gen_system_setting_tbl`);
        let html = "";
        let payrollTable = getTableData("hris_payroll_tbl","","payrollStatus = '2'");
        placing.map((value,index)=>{
            let startDate    = `${value.toLowerCase()}CutOffDateStart`;
            let endDate      = `${value.toLowerCase()}CutOffDateEnd`;
            let payout       = `${value.toLowerCase()}CutOffPayOut`;
            let mandates     = `${value.toLowerCase()}CutOffDeduction`;
            
            if(index < 2){
                html += `
                <div class="row px-3 py-2"> 
                    <div class="col-md-12 col-sm-12 bg-black py-2 ${index == 0 ? "mb-3" : "my-3"} d-flex justify-content-between align-items-center">
                        <h5>${index == 0 ? "First" : "Second"} Cut-off</h5>
                        <div class="d-flex align-items-center">
                            <div>Mandates </div>
                            <input type="checkbox" name="${mandates}" class="mandates-checkbox ml-2" ${systemSettingData[0][mandates] == "1" ? "checked" : ""}>
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="${startDate}" >Start of Cut-off ${index == 1 ? "<code>*</code>" : ""} </label>
                            <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${startDate}" id="${startDate}" 
                                ${payrollTable.length > 0 ? "disabled" : ""}
                                data-allowcharacters="[0-9]" value="${systemSettingData[0][startDate] || "" }" ${index < 2 ? "required" : ""} ${index == 1 ? "disabled" : ""}>
                            <div class="invalid-feedback d-block" id="invalid-${startDate}"></div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="form-group">
                            <label for="${endDate}" >End of Cut-off ${index == 1 ? "<code>*</code>" : ""} </label>
                            <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${endDate}" id="${endDate}" 
                                ${payrollTable.length > 0 ? "disabled" : ""}
                                data-allowcharacters="[0-9]" value="${systemSettingData[0][endDate] || "" }" ${index < 2 ? "required" : ""} ${index == 1 ? "disabled" : ""}>
                            <div class="invalid-feedback d-block" id="invalid-${endDate}"></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <label for="${payout}">Payout Date <code>*</code></label>
                            <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${payout}" id="${payout}" 
                                data-allowcharacters="[0-9]"  ${payrollTable.length > 0 ? "disabled" : ""} value="${systemSettingData[0][payout] || ""}" ${index < 2 ? "required" : ""} >
                            <div class="invalid-feedback d-block" id="invalid-${payout}"></div>
                        </div>
                    </div>
                </div>`;
            }
        });

        html += `
        <div class="form-group">
            <label>
                No. of Working Days  
                <i class="fal fa-info-circle" style="color:#007bff;" data-toggle="tooltip" title="" data-original-title="Per week"></i>
                <code>*</code>
            </label>
            <input type="text"
                class="form-control validate number"
                data-allowcharacters="[0-9]"
                min="1"
                max="7"
                minlength="1"
                maxlength="2"
                id="workingDays"
                name="workingDays"
                value="${systemSettingData[0]['workingDays'] || 0}"
                required>
            <div class="d-block invalid-feedback" id="invalid-workingDays"></div>
        </div>`;

        return html;
    }
    
    function getPettyCash(isEdit = false){
        let  systemSettingData   = getTableData(`gen_system_setting_tbl`);
        let html = `
                    <div class="row"> 
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="pettyCashReplenishmentLimit" >Replenishment Limit <code>*</code></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">₱</span>
                                    </div>
                                    <input type="text" class="form-control text-right input-quantity" min="1" max="999999" maxlength="10" name="pettyCashReplenishmentLimit" id="pettyCashReplenishmentLimit" 
                                        data-allowcharacters="[0-9]" value="${systemSettingData[0]["pettyCashReplenishmentLimit"]||"0.00"}" required>
                                    <div class="invalid-feedback d-block" id="invalid-pettyCashReplenishmentLimit"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        return html;
    }
    
    function getClientFundModal(isEdit = false){
          let html = `
                    <div class="row"> 
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="clientFundReplenishmentLimit" >Replenishment Limit <code>*</code></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">₱</span>
                                    </div>
                                    <input type="text" class="form-control input-quantity" min="1" max="999999" maxlength="10" name="clientFundReplenishmentLimit" id="clientFundReplenishmentLimit" 
                                        data-allowcharacters="[0-9]" value="${systemSettingData[0]["clientFundReplenishmentLimit"]||"0.00"}" required>
                                    <div class="invalid-feedback d-block" id="invalid-clientFundReplenishmentLimit"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        return html;
    }

    function pageContent(argument = false){
        let  systemSettingData   = getTableData(`gen_system_setting_tbl`); 
        let tableData   = systemSettingData[0];
        let approvalRow = `
                            <div class="col-lg-12 col-12">
                                <label for="">Minimum Days to Approve</label>
                                <p> <span>${tableData.minimumToApprove} Day/s</span> </p>
                            </div>
                            <div class="col-lg-12 col-12">
                                <label for="">Maximum Days to Approve</label>
                                <p> <span>${tableData.maximumToApprove} Day/s</span> </p>
                            </div>`;
        $(".approval-row").html(approvalRow);

        let cutOffRow = "";
        placing.map(value=>{
            let startDate   = tableData[`${value.toLowerCase()}CutOffDateStart`];
            let endDate     = tableData[`${value.toLowerCase()}CutOffDateEnd`];
            let payout      = tableData[`${value.toLowerCase()}CutOffPayOut`]; 
            let mandates    = tableData[`${value.toLowerCase()}CutOffDeduction`];
            cutOffRow += startDate ? 
            `<div class="col-lg-3 col-12">
                <label for="">Cut-off Number	</label>
                <p> <span>${value} Cut off</span> </p>
            </div>
            <div class="col-lg-3 col-12">
                <label for="">Cut-off Date</label>
                <p> <span>${placingNumber(parseInt(startDate))} - ${placingNumber(parseInt(endDate))} day of the month</span> </p>
            </div>
            <div class="col-lg-3 col-12">
                <label for="">Payout Date</label>
                <p> <span>${placingNumber(parseInt(payout))} day of the month</span> </p>
            </div>
            <div class="col-lg-3 col-12">
                <label for="">Mandates</label>
                <p> <span>${mandates == "1" ? "Yes" : "No"}</span> </p>
            </div>
            ` : ``;
        });
        cutOffRow += `<div class="col-12"><label>No. of Working Days</label><p>${tableData[`workingDays`] ?? 0}</p></div>`;

        $(".cut-off-row").html(cutOffRow);

        let pettyCash                   = tableData.pettyCashReplenishmentLimit ? (tableData.pettyCashReplenishmentLimit.replaceAll(",","") || tableData.pettyCashReplenishmentLimit) : 0;
        let pettyCashReplenishmentRow   = `
                                            <div class="col-lg-12 col-12">
                                                <label for="">Replenishment Limit</label>
                                                <p> <span>${formatAmount(parseFloat(pettyCash||0), true)}</span> </p>
                                            </div>`;
        $(".petty-cash-replenishment-row").html(pettyCashReplenishmentRow);

        let clientFund                  = tableData.clientFundReplenishmentLimit ? (tableData.clientFundReplenishmentLimit.replaceAll(",","")|| tableData.clientFundReplenishmentLimit) : 0;
        let clientFundReplenishmentRow  = `
                                            <div class="col-lg-12 col-12">
                                                <label for="">Replenishment Limit</label>
                                                <p> <span>${formatAmount(parseFloat( clientFund), true)}</span> </p>
                                            </div>`;
        $(".client-fund-replenishment-row").html(clientFundReplenishmentRow);

    }

    function placingNumber(number){
        let stringNumber    =   number.toString();
        let stringLength    =   stringNumber.length;
        let lastNumber      =   stringNumber.charAt(stringLength - 1);
        let extension       =   "th";
        if(lastNumber == "3"){
            extension = "rd";
        }else if(lastNumber == "2"){
            extension = "nd";
        }else if(lastNumber == "1"){
            extension = "st";
        }
        
        if(number > 10 && number < 20){
            extension = "th";
        }
    
        return `${number}${extension}`;
    }



    // ----- SWEET ALERT CONFIRMATION -----
    const thisAlertConfirmation = (
        condition   = "add",            // add|update|cancel
        moduleName  = "Another Data",   // Title
        modalID     = null,             // Modal ID 
        containerID = null,             // ContainerID - if not modal
        data        = null,             // data - object or formData
        isObject    = true,             // if the data is object or not
    ) => {

    if (checkIfUpdateNotAllowed()) {
        const isUpdate = $(`#${modalID}`).find(".page-title").text().trim().toLowerCase().indexOf("edit");
        if (isUpdate != -1) {
            return false;
        } 
    }

    $("#"+modalID).modal("hide");

    let lowerCase 	= moduleName.toLowerCase();
    let upperCase	= moduleName.toUpperCase();
    let capitalCase = moduleName;
    let title 		      =  "";
    let text 		      =  ""
    let success_title     =  "";
    let swalImg           =  "";
    let argument          =  "";
    switch(condition) {
        case "add":
            title 					+=  "ADD " + upperCase;
            text 					+=  "Are you sure that you want to add a new "+ lowerCase +" to the system?"
            success_title        	+=  "Add new "+capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/add.svg`;
            break;
        case "update":
            title 					+=  "UPDATE " + upperCase;
            text 					+=  "Are you sure that you want to update the "+ lowerCase +" to the system?"
            success_title        	+=  "Update "+ capitalCase + " successfully saved!";
            swalImg                 +=  `${base_url}assets/modal/update.svg`;
            break;
        default:
            title 					+=  "DISCARD CHANGES";
            text 					+=  "Are you sure that you want to cancel this process?"
            success_title        	+=  "Process successfully discarded!";
            swalImg                 +=  `${base_url}assets/modal/cancel.svg`;
        }
    switch (moduleName) {
            case "Cutoff":
                argument = "cutoff";
                break;
            case "Petty Cash":
                argument = "pettycash";
                break;
            case "Client Fund":
                argument = "clientfund";
                break;    
            default:
                argument = "approval";
                break;
        }
        Swal.fire({
            title, 
            text,
            imageUrl: swalImg,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1a1a1a',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                let swalTitle = success_title.toUpperCase();

                if (condition != "cancel") {
                    let saveData = condition.toLowerCase() == "add" ? insertTableData(data, isObject, false, swalTitle) : updateTableData(data, isObject, false, swalTitle);
                    saveData.then(res => {  
                        if (res) {
                            
                            if (condition.toLowerCase() == "add" && (moduleName.toLowerCase() === "role" || moduleName.toLowerCase() === "designation")) {
                                generateNewRolesPermission();
                            }   

                            pageContent(argument);

                        } else {
                            Swal.fire({
                                icon: 'danger',
                                title: "Failed!",
                                text: result[1],
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
                } else {
                    preventRefresh(false);
                    Swal.fire({
                        icon:  'success',
                        title: swalTitle,
                        showConfirmButton: false,
                        timer: 2000
                    });
                        if(modalID == "isNotModal" ){
                            pageContent(argument);
                        }
                }
            } else {
                preventRefresh(false);
                containerID && $("#"+containerID).show();
                $("#"+modalID).modal("show");
            }
        });
    }
    // ----- END SWEET ALERT CONFIRMATION -----






});







