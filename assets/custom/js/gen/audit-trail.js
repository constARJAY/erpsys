$(document).ready(function(){
    select2_modules();

    $(document).on("change", "#select2-modules", function(){
        let moduleID    = $(`option:selected`, this).val();
		let isForm	    = $(`option:selected`, this).attr("isform");
        pageContent(isForm);
    });
    
    $(document).on("click", ".action-list", function(){
        let action      = $(this).attr("dataaction");
        let moduleID    = $("#select2-modules").val();
        let html        = getDescriptionTable(moduleID, action);
        $("#description_div").html(html);
        $(".action-list").find("h6").removeClass("color-active");
        $(".action-list").removeClass("module-active");
        
        $(this).find("h6").addClass("color-active");
        $(this).addClass("module-active");
        
        initDataTables();
    });
});


// FUNCTION FOR CALLING THE AFTER THE UPDATE
function select2_modules(moduleID = null){
    let tableData       = getTableData("gen_module_list_tbl", "", "moduleApprover = '0' AND moduleID > '3' AND moduleID != '144' ");
    let option          = `<option value="" ${!moduleID ? "selected" : ""} disabled>Select Module</option>`;
    tableData.map((value,index)=>{
        option += `<option value="${value.moduleID}" 
                        isform="${value.moduleApprover != "0" ? "true" : "false"}"
                        ${moduleID == value.moduleID ? "selected": ""}
                        >${value.moduleName}</option>`;
    });
    let moduleHtml = `<select class="form-control w-50 text-center" id="select2-modules">
                        ${option}
                     </select>`;

    $(".list-of-module").html(moduleHtml);
    if($("#select2-modules").select2({theme: "bootstrap"})){
        $("#select2-modules").select2('destroy');
    }

    $("#select2-modules").select2({theme: "bootstrap"});  
    
}

function pageContent(isForm = false){
    $("#description_div").html(preloader);
    $("#action_div").html(preloader);
    let actionDiv       =   getActionDiv(isForm);
    let descriptionDiv  =   getDescriptionDiv(isForm);

    setTimeout(() => {
        $("#description_div").html(descriptionDiv);
        $("#action_div").html(actionDiv);    
    }, 200);
}

function getActionDiv(isForm = "false"){
    let html = "";
    if(isForm == "false"){
        html += `<div class="card my-0 p-2 action-list" dataaction="insert" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">ADD</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list" dataaction="update" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">UPDATE</h6> 
                    </div>
                </div>`;
    }else{
         html += `<div class="card my-0 p-2 action-list action-create" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">CREATE FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-save" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">SAVE FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-submit" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">SUBMIT FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-cancel" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">CANCEL FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-approve" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">APPROVED FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-denied" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">DENIED FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-revise" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">REVISED DENIED FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-revise-cancel" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">REVISED CANCELLED FORM</h6> 
                    </div>
                </div>
                <div class="card my-0 p-2 action-list action-print" style="box-shadow: none !important;">
                    <div class="d-flex justify-content-start align-items-center">
                        <h6 class="mx-3 module-header py-1 text-gray">PRINT DOCUMENT</h6> 
                    </div>
                </div>`;
    }
    return html;
    
}

function getDescriptionDiv(isForm = "false"){
    let html    = `<div class="row">
                        <div class="col-4"></div>
                        <div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">DESCRIPTION</h6>
                        <p class="text-center">Select action to view description.</p></div>
                        <div class="col-4"></div>
                    </div>`;
    return html;
}

function getDescriptionTable(moduleID, action){
    $("#description_div").html(preloader);
    let html = ``;
    let tableID     = "descriptionTable_add";
    let tableData   = getTableData(`gen_audit_tbl`, "", `moduleID ='${moduleID}'`, `createdAt DESC`);
    if(action =="insert" || action == "update"){
        
        let tableRow  = "";
        tableData.filter(value => value.auditType == action).map((value,index)=>{
            let auditColumn = value["auditColumn"] ? value["auditColumn"].split("|") : false;
            tableRow    += `<tr>`;
            tableRow    += `<td>${moment(value.createdAt).format(`MMMM DD, YYYY hh:mm:ss A`)}</td>
                            <td>${value.auditDescription}</td>
                           `;
            // if(auditColumn){
            //     tableID     = "descriptionTable_update";
            //     tableRow += "<td>";
            //             let oldData = value["auditOldData"].split("|")
            //             tableRow += `<table class="table table-bordered table-striped table-hover">
            //                             <thead>
            //                                 <tr>`;
            //                                     auditColumn.map((column,colIndex)=>{
            //                                         tableRow += `
            //                                                         <th>${column}</th>
            //                                                     `;
            //                                     });
            //             tableRow +=         `</tr>
            //                             </thead>
            //                             <tbody>
            //                                 <tr>`;
                                            
            //                                     auditColumn.map((column,colIndex)=>{
            //                                         let columnData = "";
            //                                         switch (oldData[colIndex]) {
            //                                             case "0":
            //                                                     columnData = "Inactive";
            //                                                 break;
            //                                             case "1":
            //                                                     columnData = "Active";
            //                                                 break;  
            //                                             default:
            //                                                     columnData = oldData[colIndex];
            //                                                 break;
            //                                         } 
            //                                         tableRow += `
            //                                                         <td>${columnData}</td>
            //                                                     `;
            //                                     });        
            //             tableRow +=         `</tr>
            //                             </tbody>
            //                         </table>`;
            //     tableRow += "</td>";

            //     tableRow += "<td>";
            //             let newData = value["auditNewData"].split("|");
                        
            //             tableRow += `<table class="table table-bordered table-striped table-hover">
            //                             <thead>
            //                                 <tr>`;
            //                                     auditColumn.map((column,colIndex)=>{
            //                                         tableRow += `
            //                                                         <th>${column}</th>
            //                                                     `;
            //                                     });
            //             tableRow +=         `</tr>
            //                             </thead>
            //                             <tbody>
            //                                 <tr>`;
            //                                     auditColumn.map((column,colIndex)=>{
            //                                         let columnData = "";
            //                                         switch (newData[colIndex]) {
            //                                             case "0":
            //                                                     columnData = "Inactive";
            //                                                 break;
            //                                             case "1":
            //                                                     columnData = "Active";
            //                                                 break;  
            //                                             default:
            //                                                     columnData = newData[colIndex];
            //                                                 break;
            //                                         } 

            //                                         tableRow += `
            //                                                         <td>${columnData}</td>
            //                                                     `;
            //                                     });        
            //             tableRow +=         `</tr>
            //                             </tbody>
            //                         </table>`;
            //     tableRow += "</td>";
            // } 
            tableRow    += `<td>${value.accountablePerson}</td>`;
            tableRow    += `</tr>`;
        });


        html += `<div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover" id="${tableID}">
                            <thead>
                                <tr>
                                    <th>Date and Time</th>
                                    <th>Description</th>
                                    <th>Accountable Person</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRow}
                            </tbody>
                        </table>
                    </div>
                    `;
    }else{
        html += `
        
            `;
    }
    return html;
}

// FUNCTIONS
function initDataTables() {
    if ($.fn.DataTable.isDataTable('#descriptionTable_add')){
        $('#descriptionTable_add').DataTable().destroy();
    }
    
    var table = $("#descriptionTable_add").css({"min-width": "100%"}).removeAttr('width').DataTable(
        {
            // proccessing:    false,
            // serverSide:     false,
            sorting:        false,
            scrollX:        true,
            scrollCollapse: true,
            lengthMenu: [ 50, 75, 100, 150],
            columnDefs: [
                { targets: 0, width:  250 },
                { targets: 2, width:  150 }
            ],
        }
    );

    if ($.fn.DataTable.isDataTable('#descriptionTable_update')){
        $('#descriptionTable_update').DataTable().destroy();
    }
    
    var table = $("#descriptionTable_update").css({"min-width": "100%"}).removeAttr('width').DataTable(
        {
            // proccessing:    false,
            // serverSide:     false,
            scrollX:        true,
            sorting:        false,
            scrollCollapse: true,
            lengthMenu: [ 50, 75, 100, 150],
            columnDefs: [
                { targets: 0, width:  250 },
                { targets: 2, width:  150 }
            ],
        }
    );
}