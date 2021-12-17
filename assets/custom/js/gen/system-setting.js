let systemSettingData;
let placing;
$(document).ready(function(){
    systemSettingData   = getTableData(`gen_system_setting_tbl`);
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
        }, 500);
    });
    
    $(document).on("click", "#btnUpdate", function(){
        let condition          = validateForm("system_setting_form");
        let systemSettingID    = decryptString($(this).attr("settingid"));
        let feedback;
        switch ($(this).attr("givenaction")) {
            case "cuttoff":
                    feedback = "Cutoff";
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
            data["tableData"]["updatedBy"]   =  sessionID;
            data["whereFilter"]              =  "systemSettingID ="+systemSettingID;
            data["tableName"]                =  "gen_system_setting_tbl";
            data["feedback"]                 =  feedback;
            sweetAlertConfirmation("update", feedback,"modal_content", null , data, true, pageContent);
        }
        
    });
    
    $(document).on("click",".btnCancel", function(){
        let feedback;
        switch ($(this).attr("givenaction")) {
            case "cuttoff":
                    feedback = "Cutoff";
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
            sweetAlertConfirmation("cancel", feedback,"modal_content");
        }else{
            $("#modal_content").modal("hide");
        }
        
    });
    
    

    function getApprovalModal(isEdit = false){
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
        let html = "";
        placing.map((value,index)=>{
            let startDate    = `${value.toLowerCase()}CutOffDateStart`;
            let endDate      = `${value.toLowerCase()}CutOffDateEnd`;
            let payout       = `${value.toLowerCase()}CutOffPayOut`;
            
            if(index < 2){
                html += `
                    <div class="row"> 
                        <div class="col-md-12 col-sm-12 bg-black py-2 ${index == 0 ? "mb-3" : "my-3"}">
                            <h5>${index == 0 ? "First" : "Second"} Cutoff</h5>
                        </div>

                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="${startDate}" >Start of Cutoff <code>*</code></label>
                                <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${startDate}" id="${startDate}" 
                                    data-allowcharacters="[0-9]" value="${systemSettingData[0][startDate] || "" }" ${index < 2 ? "required" : ""}>
                                <div class="invalid-feedback d-block" id="invalid-${startDate}"></div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <div class="form-group">
                                <label for="${endDate}" >End of Cutoff <code>*</code></label>
                                <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${endDate}" id="${endDate}" 
                                    data-allowcharacters="[0-9]" value="${systemSettingData[0][endDate] || "" }" ${index < 2 ? "required" : ""}>
                                <div class="invalid-feedback d-block" id="invalid-${endDate}"></div>
                            </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                                <label for="${payout}">Payout Date <code>*</code></label>
                                <input type="text" class="form-control validate number" min="1" max="31" maxlength="2" name="${payout}" id="${payout}" 
                                    data-allowcharacters="[0-9]" value="${systemSettingData[0][payout] || ""}" ${index < 2 ? "required" : ""} >
                                <div class="invalid-feedback d-block" id="invalid-${payout}"></div>
                            </div>
                        </div>
                    </div>`;
            }
        });
        return html;
    }
    
    function getPettyCash(isEdit = false){

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

    function pageContent(){
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
            cutOffRow += startDate ? 
                                `   <div class="col-lg-4 col-12">
                                        <label for="">Cutoff Number	</label>
                                        <p> <span>${value} Cut off</span> </p>
                                    </div>
                                    <div class="col-lg-4 col-12">
                                        <label for="">Cutoff Date</label>
                                        <p> <span>${placingNumber(parseInt(startDate))} - ${placingNumber(parseInt(endDate))} day of the month</span> </p>
                                    </div>
                                    <div class="col-lg-4 col-12">
                                        <label for="">Payout Date</label>
                                        <p> <span>${placingNumber(parseInt(payout))} day of the month</span> </p>
                                    </div>` : ``;
        });

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


});







