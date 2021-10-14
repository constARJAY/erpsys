
$(document).ready(function(){
    

    const projectTableData  =   getTableData(
        `pms_timeline_builder_tbl AS ptbt LEFT JOIN pms_bill_material_tbl AS pbmt USING(timelineBuilderID)`,
        ``,
        `pbmt.billMaterialStatus = 2 AND ptbt.createdBy = ${sessionID}`  
        );
        
    pageContent();

    function clientList(){
        let clientIDArr     = [];
            let clientNameArr   = [];
            projectTableData.map(client=>{
                if(!clientIDArr.includes(client.clientID)){
                    clientIDArr.push(client.clientID);
                    clientNameArr.push(client.clientName);
                }
            });
            return clientNameArr;
    }

    function projectList(clientName = null){
        if(clientName){
            let projectIDArr    = [];
            let projectNameArr  = [];
            // let { employeeID, fullname, designation, department } = data && data[0];
			// return { employeeID, fullname, designation, department };
            projectTableData.filter(x=> x.clientName == clientName).map(project=>{
                if(!projectIDArr.includes(project.projectID)){
                    projectIDArr.push(project.projectID);
                    projectNameArr.push(project.projectName);
                } 
            });
            return projectNameArr;
        }
        return [];
    }

    function pageContent(){
        $("#page_content").html(preloader);
        let projectList     =   `   <div class="col-12 col-lg-4 col-xl-4 py-2 text-left">
                                    <h5 class="bg-primary text-light p-4"><strong>LIST OF PROJECTS</strong></h5>
                                    <div class="card my-0 p-3" style='box-shadow:none;' id="project_list">
                                        ${getClientList()}
                                    </div>
                                </div>`;

        let documentList    =   `   <div class="col-12 col-lg-8 col-xl-8 py-2 text-left">
                                        <h5 class="bg-primary text-light p-3 d-flex justify-content-between">
                                            <strong class="d-flex align-items-center">LIST OF DOCUMENTS</strong>
                                            <div class="text-right">
                                                <button class="btn py-2 btn-download-file btn-info btn-excel" category="cost_estimate">
                                                    <i class="fas fa-file-excel"></i> CE EXCEL
                                                </button>
                                                <button class="btn py-2 btn-download-file btn-info btn-excel" category="bill_material">
                                                    <i class="fas fa-file-excel"></i> BOM EXCEL
                                                </button>
                                            </div>
                                        </h5> 
                                        
                                        <div class="card my-0 p-2" style='box-shadow:none;' id="document_list">
                                            <div class="row">
                                                <div class="col-4"></div>
                                                <div class="col-4 text-center">
                                                    <img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> 
                                                    <h6 class="text-primary text-center font-weight-bold">DOCUMENTS</h6>
                                                    <p>Select project to view documents.</p>
                                                </div>
                                                <div class="col-4"></div>
                                            </div>
                                        </div>
                                    </div>`;
        let html = projectList + documentList;

        setTimeout(() => {
            $("#page_content").html(html);    
            $(".btn-excel").hide();
        }, 1000);
    }

    function getClientList(){
        let html = `<div class="row">
                        <div class="col-2"></div>
                        <div class="col-8 text-center">
                            <img class="img-fluid" src="${base_url}assets/modal/no-data.gif" alt=""> 
                            <h6 class="text-primary text-center font-weight-bold">PROJECTS</h6>
                            <p>No data available.</p>
                        </div>
                        <div class="col-2"></div>
                    </div>`;

        let projectList  = clientList().map(x=>{
                                    return getProjectList(x);
                            }).join();
        if(projectList){
            html = "";
        }
        clientList().map(client=>{
            html += `<div class="list-group panel mb-2">
                        <a class="list-group-item list-group-item-danger project-list" style="cursor:pointer;">
                            <i type="button" class="project-icon fa fa-caret-down" aria-expanded="false"></i>
                            &nbsp; <small>${client}</small>
                        </a>
                        <div class="collapse" style="">
                            ${projectList}
                        </div>
                    </div>`;
            
        });
        return html;  
    }

    function getProjectList(clientName = null){
        let html = "";
        projectList(clientName).map( project =>{
            let documentInfo        =  projectTableData.filter(document => document.projectName == project && document.clientName == clientName);
            let timelineBuilderID   =  [];
            let costEstimateID      =  [];
            let billMaterialID      =  [];

            documentInfo.map(x=>{
                timelineBuilderID.push(x.timelineBuilderID);
                costEstimateID.push(x.costEstimateID);
                billMaterialID.push(x.billMaterialID);
            });

            html += `   <div class="list-group-submenu" style="">
                        <a href="#" class="list-group-item nav-project-list" style="cursor:pointer;"
                            timelinebuilderid="${encryptString(timelineBuilderID.join("|"))}"
                            costestimateid="${encryptString(costEstimateID.join("|"))}"
                            billmaterialid="${encryptString(billMaterialID.join("|"))}"
                        >
                        <i class="nav-project-list-icon fa"></i> &nbsp; 
                            <small>${project}</small>
                        </a>
                    </div>`;
        });
        return html;
    }

    function showDocument(timelineBuilderID = null, costEstimateID = null, billMaterialID = null){
        let timelineBuilderArr  = timelineBuilderID.split("|");
        let costEstimateArr     = costEstimateID.split("|");
        let billMaterialArr     = billMaterialID.split("|");

    }

    function checkButtons(){
        let flag = 0;
        $(".document_checkbox").each(function(){
            if($(this).prop("checked")){
                flag ++;
            }
        });
        
        if(!flag){
            $(".btn-excel").hide(900);
        }else{
            $(".btn-excel").show(900);
        }
    }
    // EVENT CLICK
    $(document).on("click", ".project-list", function(){
        let thisChild  =  $(this).closest(".list-group").find(".collapse");
        let thisIcon   =  $(this).closest(".list-group").find(".project-icon");
        let isShow     =  thisChild.hasClass("showing");
        $(".collapse").removeClass("showing").addClass("hidden");
        $(".collapse").fadeOut(400);
        $(".project-icon").addClass("fa-caret-down").removeClass("fa-caret-up");
        if(!isShow){
            thisChild.addClass("showing").removeClass("hidden");
            thisChild.fadeIn(300);
            thisIcon.removeClass("fa-caret-down").addClass("fa-caret-up");
        }
    });

    $(document).on("click", ".nav-project-list", function(){
        $(".btn-excel").hide(900);
        $("#document_list").html(preloader);
        $(".nav-project-list-icon").removeClass("fa-circle");
        let thisParent      = $(this).closest(".list-group-submenu");
        let thisIcon        = thisParent.find(".nav-project-list-icon");
        thisIcon.addClass("fa-circle");




        let timelineBuilderID   = decryptString($(this).attr("timelinebuilderid"));
        let costEstimateID      = decryptString($(this).attr("costestimateid"));
        let billMaterialID      = decryptString($(this).attr("billMaterialID"));
        let projectTotalCost    = 0;
        let billMaterialRow     = billMaterialID.split("|").map( x => {
                                        return  projectTableData.filter( y => y.billMaterialID == x ).map( y =>{
                                            projectTotalCost += parseFloat(y["billMaterialGrandTotal"] || 0);
                                            return  `<div class="col-12 row document-row ml-4 py-3 border"
                                                        timelinebuilderid="${encryptString(y["timelineBuilderID"])}"
                                                        costestimateid="${encryptString(y["costEstimateID"])}"
                                                        billmaterialid="${encryptString(y["billMaterialID"])}"
                                                     >
                                                            <div  class="col-1"><input type="checkbox" class="document_checkbox"></div>
                                                            <div class="col-5 btn-view-bill-material" style="cursor:pointer" href="pms/bill_material" controller="pms/bill_material" table="${encryptString(y["billMaterialID"])}">${y["billMaterialCode"]}</div>
                                                            <div class="col-6 text-right">${formatAmount(y["billMaterialGrandTotal"], true)}</div>
                                                    </div>`;
                                        }).join();
                                    }).join("");
        
        let html = `<div class="card">
                        <div class="card-body">
                            <div class="w-100 row">
                                   ${billMaterialRow} 
                            </div>
                        </div>
                        
                        <div class="card-footer">
                            <div class="row">
                                <div class="col-md-6 col-sm-12 text-left">
                                    TOTAL
                                </div>
                                <div class="col-md-6 col-sm-12 text-right">
                                    ${formatAmount(projectTotalCost, true)}
                                </div>
                            </div>
                        </div>
                    </div>`;
        setTimeout(() => {
            $("#document_list").html(html);
        }, 500);


    });

    $(document).on("click", ".btn-view-bill-material", function(e) {
        e.preventDefault();
        const notifID    = $(this).attr("id");
        const table      = $(this).attr("table");
        const controller = $(this).attr("controller");
        let url = base_url+controller+"?view_id="+table;
        window.open(url, "_blank")
        
    })

    $(document).on("click", ".btn-excel", function(e){
        let exelType        = $(this).attr("category");
        let documentsID     = [];
        let datacount       = 0;
        let urlExtension    = "";
        $(".document-row").each(function(index){
            let timelineBuilderID   = decryptString($(this).attr("timelinebuilderid"));
            let costEstimateID      = decryptString($(this).attr("costestimateid"));
            let billMaterialID      = decryptString($(this).attr("billmaterialid"));
            urlExtension            += `&bomid${index}=${billMaterialID}&ceid${index}=${costEstimateID}&ptbid${index}=${timelineBuilderID}`;
            
            let tempData = {timelineBuilderID, costEstimateID, billMaterialID};
            documentsID.push(tempData);
            datacount++;
        });
        const url = `${base_url}pms/consolidated_document/getConsolidateArray?datacount=${datacount}&exeltype=${exelType}${urlExtension}`;
		window.open(url, "_blank");
        // $.ajax({
        //     method:      "POST",
        //     url:         `Consolidated_document/getConsolidateArray`,
        //     data:         {excelType, documentsID},
        //     dataType:    "json",
        //     beforeSend: function() {
        //         // $("#loader").show();
        //     },
        //     success: function(data) {
                
        //        console.log(data);
               
        //     },
        //     error: function() {
        //         setTimeout(() => {
        //             $("#loader").hide();
        //             showNotification("danger", "System error: Please contact the system administrator for assistance!");
        //         }, 500);
        //     }
        // }).done(function() {
            
        // });
        // let billMaterialID 		= decryptString($(this).attr("pbrid"));
		// let costEstimateID 		= decryptString($(this).attr("ceid"));
		// let timelineBuilderID 	= decryptString($(this).attr("ptbid"));
		


    });


    $(document).on("click",".document_checkbox", function(){
        checkButtons();
    });
    // END EVENT CLICK





});