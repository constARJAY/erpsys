$(document).ready(function () {
    const thisURL       = window.document.URL;
    const isEdit        = thisURL.split("?edit_id=");
    const isAdd         = thisURL.split("?");
    const projectCatergotyData = getTableData(`pms_category_tbl`,``,`categoryStatus = '1'`);
    const milestoneBuilderData = getTableData("pms_milestone_builder_tbl JOIN pms_category_tbl USING(categoryID)","pms_milestone_builder_tbl.*, pms_category_tbl.categoryName AS categoryName, pms_category_tbl.categoryShortcut AS categoryShortcut");
    const projectMilestoneData = getTableData("pms_project_milestone_tbl", "projectMilestoneID,projectMilestoneName", "projectMilestoneStatus = 1" );
                

    if(isEdit.length >= 2){
        var thisID = decryptString(isEdit[1]);
        pageContent(true, thisID);
    }else if(isAdd[1] == "add"){
        pageContent(true);
    }else{
        pageContent();
    }

    /** BUTTONS */
        // OPENING ADD PHASE DIV
        $(document).on("click", "#btnAdd", function(){
            pageContent(true);
        });

        $(document).on("click",".editMilestoneBuilder", function(){
            let thisDataID = $(this).attr("milestonebuilderid");
            pageContent(true,thisDataID);
        });

        $(document).on("click", "#btnBack", function(){
            let condition = isFormEmpty("milestonebuilder_form");
            if(!condition){ 
                sweetAlertConfirmation("cancel", "Milestone","isNotModal","","","", pageContent);
            }else{
                pageContent();
                updateURL();
            }
        });
        
        $(document).on("click", "#btnAddRow", function(){
            let row = listOfMilestone();
            $(".itemProjectTableBody").append(row);  
            updateTableRows();

          
        });

        $(document).on("click", ".btnDeleteRow", function(){
            deleteTableRow();
        });

        $(document).on("click","#btnSave", function(){
            preventRefresh(false);
            let condition = validateForm("milestonebuilder_form");
            if(condition == true){
                let data = getMilestoneBuilder();
                saveMilestoneBuilder(data, pageContent); 
            }
            preventRefresh(true);
        });

        $(document).on("click","#btnEdit", function(){
            preventRefresh(false);
            let thisValueID = $(this).attr("milestonebuiledid");
            let condition   = validateForm("milestonebuilder_form");
            if(condition == true){
                let data = getMilestoneBuilder(thisValueID);
                saveMilestoneBuilder(data, pageContent,"update"); 
            }
            preventRefresh(true);
        });
    /** END OF BUTTONS */

    /** CHECKBOX */
    
    // ----- CHECK ALL -----
        $(document).on("change", ".checkboxall", function() {
            const isChecked = $(this).prop("checked");
            $(".checkboxrow").each(function(i, obj) {
                $(this).prop("checked", isChecked);
            });
            updateDeleteButton();
        });
        
        $(document).on("click", "[type=checkbox]", function() {
            updateDeleteButton();
        });
    /** END OF CHECKBOX */

        $(document).on("change", "[name=tasksName]", function(){
            updateProjectMilestoneOptions();
        });

    // DATATABLES
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableMilestoneBuilder')){
            $('#tableMilestoneBuilder').DataTable().destroy();
        }

        var table = $("#tableMilestoneBuilder").css({"min-width": "100%"}).removeAttr('width').DataTable({
                        proccessing:    false,
                        serverSide:     false,
                        scrollX:        true,
                        scrollCollapse: true,
                        columnDefs: [
                            { targets: 0, width:  80 },
                            { targets: 1, width: 100 },
                            { targets: 2, width: 150 }
                        ],
        });
    }
    
    function updateURL(view_id = 0, isAdd = false, isRevise = false) {
		if (view_id && !isAdd) {
			window.history.pushState("", "", `${base_url}pms/milestone_builder?edit_id=${encryptString(view_id)}`);
		} else if (isAdd) {
			window.history.pushState("", "", `${base_url}pms/milestone_builder?add`);
		} else {
			window.history.pushState("", "", `${base_url}pms/milestone_builder`);
		}
	}
	// ----- END VIEW DOCUMENT -----

    function pageContent(isForm = false, id = 0, readOnly = false, isBack = false){
        let data = false;
        let isAdd = false;
        var thisURL       = window.document.URL;
        var isEdit        = thisURL.split("?edit_id=");

        if(isForm){
            isAdd = true;
            uniqueData = [];
           milestoneBuilderData.map(items=>{
                let unique = {  
                    multiple: {
                        id: items.milestoneBuilderID, // Required
                        categoryID: items.categoryID, 
                        phaseDescription: items.phaseDescription,
                    }  
                }
                uniqueData.push(unique);
            });

            if(id){
                 data =  getTableData("pms_milestone_builder_tbl JOIN pms_category_tbl USING(categoryID)","pms_milestone_builder_tbl.*, pms_category_tbl.categoryName AS categoryName",`milestoneBuilderID = ${id}` );
                // data  = milestoneBuilderData.filter(items => items.milestoneBuilderID == id);
                isAdd = false;
            }
            let headerButton = `
                <button type="button" class="btn btn-default btn-light" id="btnBack">
                <i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
            $("#headerButton").html(headerButton);
            formContent(data, readOnly);
            updateURL(id,isAdd);
        }else{
            let headerButton = `
                <button type="button" class="btn btn-default btn-add" id="btnAdd" 
                data-toggle="tab"><i class="icon-plus"></i> &nbsp;Add Phase</button>`;
            $("#headerButton").html(headerButton);
            tableContent();
            updateURL(0,false);
        }
    }

    function tableContent(){
        
        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     { tableName: "pms_milestone_builder_tbl JOIN pms_category_tbl USING(categoryID)",
                            columnName: "pms_milestone_builder_tbl.*, pms_category_tbl.categoryName AS categoryName" },

                beforeSend: function() {
                    $("#page_content").html(preloader);
                },

                success: function(data) {
                    let html = `
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-hover" id="tableMilestoneBuilder">
                            <thead>
                                <tr class="text-left">
                                    <th>Phase Code</th>
                                    <th>Phase Name</th>
                                    <th>Project Category</th>
                                </tr>
                            </thead>
                            <tbody>`;

                    data.map((item, index, array) => {
                        html += `
                                <tr class="editMilestoneBuilder" milestonebuilderid="${item["milestoneBuilderID"]}">
                                    <td>${item["phaseCode"]}</td> 
                                    <td>${item["phaseDescription"]}</td>
                                    <td>${item["categoryName"]}</td>
                                    
                                </tr>`;
                    });

                    html += `</tbody>
                        </table>
                    </div>`;

                    setTimeout(() => {
                        $("#page_content").html(html);
                        initDataTables();
                    }, 500);
                },

                error: function() {
                    let html = `
                        <div class="w-100 h5 text-center text-danger>
                            There was an error fetching data.
                        </div>`;
                    $("#page_content").html(html);
                }
        })
    }

    function formContent(data = false, readOnly = false){
        let {
            milestoneBuilderID  = "",
            phaseCode           = "",
            phaseDescription    = "",
            categoryID          = "",  
            createdAt            = false,
        } = data && data[0];
        $("#page_content").html(preloader);
        readOnly ? preventRefresh(false) : preventRefresh(true);

        var tempUniqueData = [];
		uniqueData.filter(items => items["multiple"].id != milestoneBuilderID).map(items=>{
			tempUniqueData.push(items);
		});
		uniqueData = tempUniqueData;

        let html = `<form id="milestonebuilder_form">
                        <div class="text-primary font-weight-bold mb-2" >
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <label>Phase Category <code>*</code></label>
                                    <select class="form-control form-control-sm select2 validate" unique="${milestoneBuilderID}"
                                        name="categoryID"
                                        id="projectCategory"
                                        required title="Project Phase">
                                        ${listOfProjectCategory(categoryID)}
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-projectCategory"></div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="form-group">
                                        <label>Phase Name <code>*</code></label>
                                            <input type="text" class="form-control text-primary 
                                            font-weight-bold mb-2 validate"  id="phaseDescription"
                                            data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]" 
                                            minlength="2" maxlength="150" name="phaseDescription" title="Project Milestone" unique="${milestoneBuilderID}" value="${phaseDescription}" required>
                                            <div class="invalid-feedback d-block" id="invalid-phaseDescription"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="text-primary font-weight-bold mb-1" style="font-size: 1.2rem;">ADD MILESTONE/S </div>
                                        <table class="table table-striped" id="pcrDetails">
                                            <thead>
                                                <tr style="white-space: nowrap">
                                                    <th class="text-center" style="width:50px">
                                                        <div class="action">
                                                            <input type="checkbox" class="checkboxall" >
                                                        </div>
                                                    </th>
                                                    <th style="width:50px"></th>
                                                    <th>Milestone Name <code>*</code></th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody class="itemProjectTableBody" >
                                                ${listOfMilestone(milestoneBuilderID)}
                                            </tbody>
                                        </table>
                                        <div class="w-100 text-left my-2">
                                                <button class="btn btn-primary btnAddRow" type="button" id="btnAddRow"><i class="fas fa-plus-circle"></i> Add Row</button>
                                                <button class="btn btn-danger btnDeleteRow" type="button" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 text-right mt-3 mb-3 addReq">
                            <button type="button" class="btn btn-submit px-5 p-2" id="${milestoneBuilderID ? "btnEdit" : "btnSave" }" milestonebuiledid="${milestoneBuilderID}"><i class="fas fa-save"></i> ${milestoneBuilderID ?"Update" : "Save" }
                            </button>
                        </div>
                    </form>`;


        setTimeout(() => {
            $("#page_content").html(html);
            initAll();
            updateProjectMilestoneOptions();
        }, 500);

    }

    function listOfProjectCategory(value){
        let returnData           = `<option ${value ? "": "selected" } disabled>Please select a project category</option>`;
        let existProjectCategory = [];
        let existCategoryData    = getTableData("pms_milestone_builder_tbl");
            existCategoryData.map(items =>{
                if(value != items.categoryID){
                    existProjectCategory.push(items.categoryID);
                }
            });
        let tableData            = getTableData("pms_category_tbl","","categoryStatus = '1' ");
        returnData += tableData.filter(items => !existProjectCategory.includes(items.itemID)).map((items,index)=>{
            return `<option value="${items.categoryID}">${items.categoryName}</option>`;
        });

        return returnData;
    }

    function listOfMilestone(milestoneBuilderID = null){
        let html = "";
        let tableData = getTableData ("pms_milestone_list_tbl","",`milestoneBuilderID = '${milestoneBuilderID}'`);
            if(tableData.length > 0 ){
                
                tableData.map((items,index)=>{
                    html += `<tr class="milestone-list-row" id="tableRow${index}" modulelistid="${items.moduleListID}">
                                <td class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxrow" id="checkboxrow${index}">
                                    </div>
                                </td>
                                <td class="rowLetter text-center">${lettersCode(parseFloat(index)+1)}</td>
                                <td>
                                    <div class="form-group mt-2">
                                        <select class="form-control validate select2"
                                            name="tasksName" id="tasksName${index}"
                                            style="width: 100%" required>
                                            ${getProjectMilestone(items.projectMilestoneID)}
                                        </select>
                                        <div class="invalid-feedback d-block" id="invalid-tasksName${index}"></div>
                                    </div>
                                </td>
                                <td>
                                    <div class="notes">
                                        <textarea rows="3" style="resize: none" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]" 
                                        minlength="2" maxlength="325" name="notes" id="notes${index}">${items.milestoneNotes}</textarea>
                                        <div class="invalid-feedback d-block" id="invalid-notes${index}"></div>
                                    </div>
                                </td>
                            </tr>`;
                });
            }else{
                    html += `<tr class="milestone-list-row" id="tableRow0" modulelistid>
                                <td class="text-center">
                                    <div class="action">
                                        <input type="checkbox" class="checkboxrow" id="checkboxrow0">
                                    </div>
                                </td>
                                <td class="rowLetter text-center">${lettersCode(1)}</td>
                                <td>
                                    <div class="form-group mt-2">
                                        <select class="form-control validate select2"
                                            name="tasksName" id="tasksName0"
                                            style="width: 100%" required >
                                            ${getProjectMilestone()}
                                        </select>

                                        <div class="invalid-feedback d-block" id="invalid-tasksName0"></div>
                                    </div>
                                </td>
                                <td>
                                    <div class="notes">
                                        <textarea rows="3" style="resize: none" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]" 
                                        minlength="2" maxlength="325" name="notes" id="notes0"></textarea>
                                        <div class="invalid-feedback d-block" id="invalid-notes0"></div>
                                    </div>
                                </td>
                            </tr>`;
            }
            return html;
    }

    function updateTableRows(){
        $(".milestone-list-row").each(function(i){
            // CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

            // INPUTS ID's
			$("td [name=tasksName]", this).attr("id", `tasksName${i}`);
            $("td [name=notes]", this).attr("id", `notes${i}`);

            // INPUTS ID's INVALID FEEDBACK
            $("td [name=tasksName]", this).next().attr("id", `invalid-tasksName${i}`);
            $("td [name=notes]", this).next().attr("id", `invalid-notes${i}`);

            // LETTERSCODE
            var rowLetter = lettersCode(i+1);
            $(".rowLetter", this).text(rowLetter);

            // INITIALIZE SELECT 2
			$(this).find("select").each(function(x) {
				if ($(this).hasClass("select2-hidden-accessible")) {
					$(this).select2("destroy");
				}
			})

			$(this).find("select").each(function(j) {
				var thisValue = $(this).val();
				$(this).attr("index", `${i}`);
				$(this).attr("id", `tasksName${i}`);
				$(this).attr("data-select2-id", `tasksName${i}`);
				if (!$(this).hasClass("select2-hidden-accessible")) {
					$(this).select2({ theme: "bootstrap" });
				}
			});


        });
    }   

    function updateDeleteButton(){
        let count = 0;
        $(".checkboxrow").each(function() {
            $(this).prop("checked") && count++;
        });
        $(".btnDeleteRow").attr("disabled", count == 0);
    }

    function deleteTableRow(){
        if ($(`.checkboxrow:checked`).length != $(`.checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE MILESTONE/S",
				text:               "Are you sure to delete the milestone/s?",
				imageUrl:           `${base_url}assets/modal/delete.svg`,
				imageWidth:         200,
				imageHeight:        200,
				imageAlt:           "Custom image",
				showCancelButton:   true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor:  "#1a1a1a",
				cancelButtonText:   "No",
				confirmButtonText:  "Yes"
			}).then((result) => {
				if (result.isConfirmed) {
					$(`.checkboxrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableRows();
							updateDeleteButton();
                            $(`[name=tasksName]`).each(function(i, obj) {
                                let thisValue = this.value;
                                $(this).html(getProjectMilestone(thisValue));
                            });
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have atleast one or more items.");
		}
    }

    function getMilestoneBuilder(id = null){
        let data = { list: [] };

		if (id) {
			data["milestoneBuilderID"] = id;
		}
        var categoryID            = $("#projectCategory").val();
        var phaseTableData        = projectCatergotyData.filter(items => items.categoryID == categoryID)
        var categoryShortcut      = phaseTableData[0].categoryShortcut;
        var categoryLength        = phaseTableData.length > 0 ? parseFloat(phaseTableData.length) + 1 : 1;
        var phaseCode             = getPhaseCode(categoryShortcut,categoryLength);
        data["categoryID"]        = categoryID;
        data["phaseDescription"]  = $("#phaseDescription").val();
        data["createdBy"]         = sessionID;
		data["updatedBy"]         = sessionID;
        data["phaseCode"]         = phaseCode;
			$(".milestone-list-row").each(function(i, obj) {
                var thisTaskName = $(this).find("[name=tasksName]");
				var temp = {
                    projectMilestoneID:     thisTaskName.val(),
					projectMilestoneName:	$('option:selected', thisTaskName).attr("projectMilestoneName"),
                    milestoneNotes:			$(this).find("[name=notes]").val()
				};
				data[`list`].push(temp);
			});
		
		return data;
    }

    function getConfirmation(method = "save") {
        const title = "Milestone Builder";
        let swalText, swalImg;
    
        $("#modal_cost_estimate").text().length > 0 && $("#modal_cost_estimate").modal("hide");
    
        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this milestone?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            default:
                swalTitle = `UPDATE ${title.toUpperCase()}`;
                swalText  = "Are you sure to update this milestone?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
        }
        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         200,
            imageHeight:        200,
            imageAlt:           "Custom image",
            showCancelButton:   true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   "No",
            confirmButtonText:  "Yes"
        })
    }

    function saveMilestoneBuilder(data = null, callback = null, method = "save"){
        let thisReturnData = false;
        if (data) {
            const confirmation = getConfirmation(method);
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $.ajax({
                        method:      "POST",
                        url:         `milestone_builder/saveMilestoneBuilder`,
                        data,
                        dataType:    "json",
                        beforeSend: function() {
                            $("#loader").show();
                        },
                        success: function(data) {
                            let result = data.split("|");
            
                            let isSuccess   = result[0];
                            let message     = result[1];
                            let insertedID  = result[2];
                            let dateCreated = result[3];
    
                            let swalTitle;
                           if (method == "save") {
                                swalTitle = `Milestone saved successfully!`;
                            } else if (method == "update") {
                                swalTitle = `Milestone updated successfully!`;
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
                                    callback && callback();
                                    
                                 

                                }, 500);
                            } else {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    Swal.fire({
                                        icon:              "danger",
                                        title:             message,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
                                }, 500);
                            }
                        },
                        error: function() {
                            setTimeout(() => {
                                $("#loader").hide();
                                showNotification("danger", "System error: Please contact the system administrator for assistance!");
                            }, 500);
                        }
                    }).done(function() {
                        setTimeout(() => {
                            $("#loader").hide();
                        }, 500);
                    })
                }
            });
        }
        return thisReturnData;
    }

    // OTHERS FUNCTIONS
    function lettersCode(num){
        var returnData = '', x;
      
        while (num > 0) {
          x = (num - 1) % 26;
          returnData = String.fromCharCode(65 + x) + returnData;
          num = (num - x)/26 | 0;
        }
        return returnData || undefined;
    }

    function getPhaseCode(code, number){
        if(number){
            var roman = {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1
            };
            var str = '';
            
            for (var i of Object.keys(roman)) {
                var q = Math.floor(number / roman[i]);
                number -= q * roman[i];
                str += i.repeat(q);
            }
            
            return code+"-"+str; 
        }
    }

    function getProjectMilestone(id = null){
        
        let taskValueArr = [], html = ``;
        $("[name=tasksName]").each(function(){
            taskValueArr.push(this.value);
        });
        
        if(projectMilestoneData.length > 0){
                html = `<option value="" disabled ${!id?"selected":''}>Please select a milestone</option>`;
                html +=  projectMilestoneData.filter(items => !taskValueArr.includes(items.projectMilestoneID) || items.projectMilestoneID == id ).map((items,index)=>{
                    return `
                    <option 
                        value       		= "${items.projectMilestoneID }"
                        projectMilestoneName = "${items.projectMilestoneName}"
                        ${items.projectMilestoneID  == id && "selected"}>
                        ${items.projectMilestoneName}
                    </option>`;
                });
        }
        
        return html;
    }

    function updateProjectMilestoneOptions(){
        $(`[name=tasksName]`).each(function(i, obj) {
            let thisValue = this.value;
            $(this).html(getProjectMilestone(thisValue));
        });

    }
});

