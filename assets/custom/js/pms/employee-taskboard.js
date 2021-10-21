$(document).ready(function() {

    const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
			let { employeeID, fullname, designation, department } = data && data[0];
			return { employeeID, fullname, designation, department };
		}
		return {};
	}
	const employeeFullname = (id) => {
		if (id != "-") {
			let data = employeeData(id);
			return data.fullname || "-";
		}
		return "-";
	}
	// ---- END GET EMPLOYEE DATA -----

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
	const getNonFormattedAmount = (amount = "₱0.00") => {
		return +amount.replaceAll(",", "").replace("₱", "")?.trim();
	}

    // const dateToday = () => {
	// 	return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	// };
    // ----- END REUSABLE VARIABLE/FUNCTIONS -----


    // ----- VIEW DOCUMENT -----
    const getTimelineContent = async (timelineBuilderID,phaseCode,projectMilestoneName) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "Employee_taskboard/getTimelineContent",
            data:     { timelineBuilderID,phaseCode,projectMilestoneName },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
                // console.log(data)
            }
        })
        return await result;
    }

    //------------ PENDING NOTIFICATION-----------------//
    function pendingNotification(){
        const task = getTableData(`pms_employeetaskoard_tbl as pet
		LEFT JOIN pms_timeline_task_list_tbl as ptt ON ptt.taskID = pet.taskID AND ptt.timelineBuilderID = pet.timelineBuilderID
		LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ptt.taskID
		LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = pet.projectMilestoneID 
		LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = pet.milestoneBuilderID OR pmb.milestoneBuilderID = ptt.milestoneBuilderID `, 
		`DISTINCT taskboardID,ptt.taskID,assignedEmployee,ptt.taskName,pet.taskStatus,pml.projectMilestoneName,CASE 
		WHEN pet.taskStartDates = "" THEN ptt.taskEndDate
		WHEN pet.taskStartDates !="" THEN pet.taskStartDates
		END taskStartDate,
		phaseCode `, 
		"assignedEmployee = "+sessionID);
		// "assignedEmployee = "+sessionID+" AND (taskStatus !=7 AND taskStatus != 1 )");

		const subTask = getTableData(`pms_employeetaskoard_details_tbl as ped
		LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ped.taskID
		LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = ped.projectMilestoneID
		LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = ped.milestoneBuilderID`, 
		`DISTINCT subtaskboardID,ped.taskID,subTaskAssignee,ped.subTaskName,ped.subTaskStatus,pml.projectMilestoneName,ped.subTaskStartDates,phaseCode`, 
		` FIND_IN_SET(${sessionID},replace(ped.subTaskAssignee,'|',','))`);
		// ` FIND_IN_SET(${sessionID},replace(ped.subTaskAssignee,'|',',')) AND (subTaskStatus !=7 AND subTaskStatus != 1 )`);
	
			for(var loop =0; loop<task.length;loop++){
				
				(function(index) {
				
						var dueDate = task[index].taskStartDate;
						var phaseCode = task[index].phaseCode;
						var taskName = task[index].taskName;
						var status = task[index].taskStatus;
						var milestoneName = task[index].projectMilestoneName;
				
						var now = moment();
						var then = moment(dueDate);
						var beforeDueDate = moment().diff(dueDate, 'days');

					setTimeout(function() {
                            if (now > then && (status == 0 || status == 8 || status == 9)) {
                                showTaskBoardNotification("info",phaseCode,milestoneName,taskName);
                            }
						}, loop * 600);
				})(loop);
			}	
			
			for(var loop2 =0; loop2<subTask.length;loop2++){
				
				(function(index2) {
				
						var dueDate = subTask[index2].subTaskStartDates;
						var phaseCode = subTask[index2].phaseCode;
						var subTaskName = subTask[index2].subTaskName;
						var status = subTask[index2].subTaskStatus;
						var milestoneName = subTask[index2].projectMilestoneName;
				
						var now = moment();
						var then = moment(dueDate);
						var beforeDueDate = moment().diff(dueDate, 'days');

					setTimeout(function() {
                            if (now > then && (status == 0 || status == 8 || status == 9)) {
                                showTaskBoardNotification("info",phaseCode,milestoneName,subTaskName);
                            }
						}, loop2 * 600);
				})(loop2);
				
			}	
    }
    pendingNotification();
    //------------ PENDING NOTIFICATION-----------------//

    function viewDocument(view_id = false, readOnly = false,phaseCode = false,projectMilestoneName = false) {

      
        const loadData = (id) => {
            // console.log("view_id "+ view_id)
            const data = getTimelineContent(id,phaseCode,projectMilestoneName);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            timelineManagementStatus
                        } = tableData[0];
        
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            if (timelineManagementStatus == 0 || timelineManagementStatus == 4) {
                                isAllowed = false;
                            }
                        } else if (employeeID == sessionID) {
                            if (timelineManagementStatus == 0 || timelineManagementStatus == 1) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (employeeID == sessionID) {
                                pageContent(true, tableData, isReadOnly);
                                updateURL(encryptString(id), true, true);
                            } else {
                                pageContent(true, tableData, isReadOnly);
                                updateURL(encryptString(id));
                            }
                        } else {
                            pageContent();
                            updateURL();
                        }
                        
                    } else {
                        pageContent();
                        updateURL();
                    }
                } else {
                    showNotification("danger", "There was an error fetching the data.");
                    pageContent();
                    updateURL();
                }
            });
        }

        if (view_id) {
            let id = view_id;
                id && isFinite(id) && loadData(id);
        } else {
            let url   = window.document.URL;
            let arr   = url.split("?view_id=");
            let isAdd = url.indexOf("?add");
            if (arr.length > 1) {
                let id = decryptString(arr[1]);
                    id && isFinite(id) && loadData(id);
            } else if (isAdd != -1) {
                arr = url.split("?add=");
                if (arr.length > 1) {
                    let id = decryptString(arr[1]);
                        id && isFinite(id) && loadData(id);
                } else {
                    const isAllowed = isCreateAllowed(46);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}pms/employee_taskboard?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}pms/employee_taskboard?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}pms/employee_taskboard?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}pms/employee_taskboard`);
        }
    }
    // ----- END VIEW DOCUMENT -----


    // ----- TIMELINE DATA -----
    // const getTimelineData = () => {
    //     const data = getTableData(
    //         `pms_timeline_builder_tbl AS ptbt
    //         LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
    //         LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
    //         LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.timelineProjectManager = helt.employeeID
    //         LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
    //         LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID`,
    //         `ptbt.timelineBuilderID,
    //         pplt.projectListName AS projectName,
    //         pplt.projectListCode AS projectCode,
    //         pct.categoryName AS projectCategory,
    //         CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS projectManager,
    //         hdt.departmentName,
    //         hdt2.designationName,
    //         ptbt.timelineBudgetStatus AS budgetStatus,
    //         ptbt.timelineManagementStatus,
    //         ptbt.timelineBuilderStatus`,
    //         `ptbt.timelineBuilderStatus = 2`);
    //     return data;
    // }

	
    // ----- END TIMELINE DATA -----
    

    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableTimeline")) {
			$("#tableTimeline").DataTable().destroy();
		}

        var table = $("#tableTimeline")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 250 },
					{ targets: 1, width: 250 },
					{ targets: 2, width: 250 },
					{ targets: 3, width: 150 },
				],
			});

        const projectTimelineLength = $(`table.projectTimeline`).length;
        for(var i=0; i<projectTimelineLength; i++) {

            if ($.fn.DataTable.isDataTable(`#projectTimeline${i}`)) {
                $(`#projectTimeline${i}`).DataTable().destroy();
            }

            var table = $(`#projectTimeline${i}`)
                .css({ "min-width": "100%" })
                .removeAttr("width")
                .DataTable({
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        false,
                    searching:      false,
                    paging:         false,
                    ordering:       false,
                    info:           false,
                    scrollCollapse: true,
                    columnDefs: [
                        // { targets: 0, width: 150 },
                        // { targets: 1, width: 150  },
                        // { targets: 2, width: 250 },
                        // { targets: 3, width: 80 },
                        // { targets: 4, width: 80 },
                        // { targets: 5, width: 80 },
                        // { targets: 6, width: 80 },
                        // { targets: 7, width: 80 },
                        // { targets: 8, width: 150 },
                    ],
                });
        }

        const projectTaskLength = $(`table.projectTask`).length;
        for(var i=0; i<projectTaskLength; i++) {

            if ($.fn.DataTable.isDataTable(`#projectTask${i}`)) {
                $(`#projectTask${i}`).DataTable().destroy();
            }

            var table = $(`#projectTask${i}`)
                .css({ "min-width": "100%" })
                .removeAttr("width")
                .DataTable({
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        false,
                    searching:      false,
                    paging:         false,
                    ordering:       false,
                    info:           false,
                    scrollCollapse: true,
                    columnDefs: [
                        // { targets: 0, width: 100 },
                        // { targets: 1, width: 100 },
                        // { targets: 2, width: 100 },
                        // { targets: 3, width: 100 },
                        // { targets: 4, width: 100 },
                        // { targets: 5, width: 100 },
                        // { targets: 6, width: 100 },
                        // { targets: 7, width: 100 },
                        // { targets: 8, width: 100 },
                        // { targets: 9, width: 100 },
                        // { targets: 10, width: 100 },
                    ],
                });
        }
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	// function headerButton(isAdd = true, text = "Add") {
	// 	let html;
	// 	if (isAdd) {
	// 		if (isCreateAllowed(92)) {
	// 			html = ``;
	// 		}
	// 	} else {
	// 		html = `
    //         <button type="button" 
	// 			class="btn btn-default btn-light" 
	// 			id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
	// 	}
	// 	$("#headerButton").html(html);
	// }
	// ----- END HEADER BUTTON -----

    // ----- THIS IS FOR THE MILESTONE CONTENT -----
    $(document).on("click", ".btnCaret", function() {
        $parent  = $(this).closest("tr");
        const taskName = $(this).attr("taskName");
        const phase    = $(this).attr("phase");
        const display  = $(this).attr("display") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.taskMainList[taskName="${taskName}"][phase="${phase}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.taskMainList[taskName="${taskName}"][phase="${phase}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[caret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));

         
    

        $parent.find("tr").each(function(){
            var dueDate = $(this).closest("tr").find("td [name=TaskStartDates]").val();
            var status = $(this).closest("tr").find("td [name=taskStatus]").val();
     
            var now = moment();
            var then = moment(dueDate);

            var beforeDueDate = moment().diff(dueDate, 'days');

            if (now > then && (status != 7 && status != 1)) {

               $(this).closest("tr").find("td [name=TaskStartDates]").css('background-color',"#dc3545");
               $(this).closest("tr").find("td [name=TaskStartDates]").css('color',"#fff");
              
              } else {
                if( beforeDueDate == 5 || (beforeDueDate <5 && beforeDueDate !=1) ){
                   $(this).closest("tr").find("td [name=TaskStartDates]").css('background-color',"#ffc107");
                   $(this).closest("tr").find("td [name=TaskStartDates]").css('color',"#fff");
                }else{
                    if(status != 7 ){
                        $(this).closest("tr").find("td [name=TaskStartDates]").css('background-color',"#dc3545");
                        $(this).closest("tr").find("td [name=TaskStartDates]").css('color',"#fff");
                    }
                }
              }
        })

      
      
     
    })
    // ----- END THIS IS FOR THE MILESTONE CONTENT -----


    // ----- CLICK TASK NAME OR CARET -----
    $(document).on("click", ".btnTask", function() {
        $parent  = $(this).closest("tr").next();
   
        const taskName = $parent.attr("taskName");
        const taskID    = $parent.attr("taskID");
        const display  = $parent.attr("taskDisplay") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
       
        $parent.attr("taskDisplay", !display);
        if (display) {
            $parent.find(`.taskContent`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            
            $parent.find(`.taskContent`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[taskCaret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
     
        $parent.find("tr").each(function(){
            var dueDate = $(this).closest("tr").find("td [name=subTaskStartDates]").val();
            var status = $(this).closest("tr").find("td [name=taskStatus]").val();
     
            var now = moment();
            var then = moment(dueDate);

            var beforeDueDate = moment().diff(dueDate, 'days');

            if (now > then && (status != 7 && status != 1)) {

               $(this).closest("tr").find("td [name=subTaskStartDates]").css('background-color',"#dc3545");
               $(this).closest("tr").find("td [name=subTaskStartDates]").css('color',"#fff");
              
              } else {
                if( beforeDueDate == 5 || (beforeDueDate <5 && beforeDueDate !=1) ){
                   $(this).closest("tr").find("td [name=subTaskStartDates]").css('background-color',"#ffc107");
                   $(this).closest("tr").find("td [name=subTaskStartDates]").css('color',"#fff");
                }else{
                    if(status != 7 ){
                        $(this).closest("tr").find("td [name=subTaskStartDates]").css('background-color',"#dc3545");
                        $(this).closest("tr").find("td [name=subTaskStartDates]").css('color',"#fff");
                    }
                }
              }
        })
       
    })
    // ----- END CLICK TASK NAME OR CARET -----


    // ----- DISPLAY ASSIGNED EMPLOYEE -----
    const displayAssignedEmployee = (employees = [],taskBoardID=0,subtaskboardID=0,taskID=0,taskName,timelineBuilderID=0,projectMilestoneID=0,milestoneID=0,milestoneName,phase) => {
        let html = "";
        // if (employees.length > 0 && taskBoardID) {
            if (employees.length > 0 ) {
            html +=`<span class="avatar">`;
            employees.map((employee, index) => {
                const { id, fullname, image, departmentName, designationName, employeeCode} = employee;

                var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                if(lastIndex.toLowerCase() == "null"){
                    image = image.replace("null","default.png");
                }

                // EMPLOYEE STATUS:
                // PASSED = 7
                // FAILED = 6
                // PENDING = 9
                let getSubStatus = '9';
                let getcolorSubStatus = '#ffc107';
                getSubStatus = getTableData("pms_employee_taskboard_status_tbl",
                `employeeTaskStatus`,
                `taskBoardID=${taskBoardID || 0} AND subtaskboardID=${subtaskboardID} AND employeeID=${id} AND timelineBuilderID =${timelineBuilderID} AND projectMilestoneID=${projectMilestoneID} AND taskID =${taskID}`);

                if(getSubStatus.length > 0){
                    if(getSubStatus[0].employeeTaskStatus == "7"){
                        getcolorSubStatus = '#99CC00';
                    }

                    else if(getSubStatus[0].employeeTaskStatus == "6"){
                        getcolorSubStatus = '#dc3545';
                    }
                    else{
                        getcolorSubStatus = '#ffc107';
                    }
                }else{
                    getcolorSubStatus = '#ffc107';
                }

                if (index <= 5) {
                    html += `
                    <span class="avatar">
                    <span class='c-avatar__status btnAssignee' 
                    style="background:${getcolorSubStatus}"
                    name="assignEmployeeTask"
                    condition = "employeeProfile"
                    taskBoardID="${taskBoardID}"
                    index = "${index}"
                    subtaskboardID="${subtaskboardID}"
                    employeeID        = "${id}"
                    departmentName    = "${departmentName}"
                    designationName   = "${designationName}"
                    employeeCode      = "${employeeCode}"
                    taskID = "${taskID}"
                    taskName = "${taskName}"
                    timelineBuilderID = "${timelineBuilderID}"
                    projectMilestoneID = "${projectMilestoneID}"
                    milestoneID = "${milestoneID}"
                    milestoneName = "${milestoneName}"
                    phase             = "${phase}"
                    image             = "${image}"
                    fullname             = "${fullname}"
                    ></span>
                    <img src="${image}" 
                    width="45" height="45"
                    title="${fullname}"></span>`;

                    // src="${image}" 
                    // width="45" 
                    // height="45"
                    // style="cursor: pointer;"
                    // taskBoardID="${taskBoardID}"
                    // phase             = "${phaseCode}"
                    // taskID            = "${taskID}"
                    // taskName = "${taskName}"
                    // timelineBuilderID="${timelineBuilderID}"
                    // projectMilestoneID="${projectMilestoneID}"
                    // milestoneID = "${milestoneID}"
                    // milestoneName = "${milestoneName}"
                    // employeeID        = "${id}"
                    // departmentName    = "${departmentName}"
                    // designationName   = "${designationName}"
                    // employeeCode      = "${employeeCode}"
                    // title="${fullname}"
                    
                }
                // if (index == 6) {
                //     html += `
                //     <span class="font-weight-bolder"
                //     style="position: absolute;
                //         top: 0;
                //         margin-left: 7px;
                //         margin-top: 25px;
                //         font-size: 1.5rem;">+${members.length - 6}<span>`;
                // }
            })
            html +=`</span>`;
        } else {
            html += `<i class="fas fa-user-plus fa-lg" title="Set Assignee" style=" border: 1px dashed black;
                            border-radius: 55px;
                            padding: 15px 10px;"></i>`;
        }
         
        // $(`.assignedMembers[taskBoardID="${taskBoardID}"][subtaskboardID="${subtaskboardID}"]`).html(html);
        // console.log(subtaskboardID);
        $(`.assignedMembers[subtaskboardID="${subtaskboardID}"]`).html(html);
    }
    // ----- END DISPLAY ASSIGNED EMPLOYEE -----

    
    // ----- SELECT ASSIGNED EMPLOYEE -----
    const getSubAssignedEmployee = (taskBoardID = null, subtaskboardID = null) => {
        let employees = [];
        // if (taskBoardID && subtaskboardID) {
            if (subtaskboardID) {
            // $(`[name="assignEmployee"][taskBoardID="${taskBoardID}"][subtaskboardID="${subtaskboardID}"]`).each(function() {
                $(`[name="assignEmployee"][subtaskboardID="${subtaskboardID}"]`).each(function() {
                const employeeID = $(this).val();
            
                if (employeeID && employeeID.length > 0) {
                    employeeID.map(tempID => {
                        const fullname = $(`option:selected[value="${tempID}"]`, this).attr("fullname");
                        const image    = $(`option:selected[value="${tempID}"]`, this).attr("image");
                        const designationName    = $(`option:selected[value="${tempID}"]`, this).attr("designationName");
                        const departmentName    = $(`option:selected[value="${tempID}"]`, this).attr("departmentName");
                        const employeeCode    = $(`option:selected[value="${tempID}"]`, this).attr("employeeCode");
                        let temp = { id: tempID, fullname, image,designationName,departmentName,employeeCode };
                     
                        const id = employees.map(emp => emp.id);
                        if (!id.includes(tempID)) {
                            employees.push(temp);
                        }
                    })
                }
            })
        }
        return employees;
    }

    $(document).on("change", `[name="assignEmployee"]`, function() {
        const taskBoardID     = $(this).attr("taskBoardID");
        const subtaskboardID  = $(this).attr("subtaskboardID");
        const subTaskAssignee  = $(this).attr("subTaskAssignee");

        const taskID  = $(this).find("option:selected").attr("taskID");
        const taskName  = $(this).find("option:selected").attr("taskName");
        const timelineBuilderID  = $(this).find("option:selected").attr("timelineBuilderID");
        const projectMilestoneID  = $(this).find("option:selected").attr("projectMilestoneID");
        const milestoneID  = $(this).find("option:selected").attr("milestoneID");
        const milestoneName  = $(this).find("option:selected").attr("milestoneName");
        const phase  = $(this).find("option:selected").attr("phase");

        const employees = getSubAssignedEmployee(taskBoardID, subtaskboardID);
   
        displayAssignedEmployee(employees, taskBoardID,subtaskboardID,taskID,taskName,timelineBuilderID,projectMilestoneID,milestoneID,milestoneName,phase);
        $parent = $(this).closest(".form-group");
        $(this).parent()
            .find(".selection")
            .children()
            .removeClass("is-invalid")
            .removeClass("is-valid")
            .removeClass("no-error")
            .removeClass("has-error");
            $parent.find(".invalid-feedback").text("");
    })


    // ----- SELECT ASSIGNED EMPLOYEE -----
    const getAssignedEmployee = (phase = null, taskName = null,assignedEmployee = [], teamMembers ={}) => {
       
        let employees = [];
      
        if (phase && taskName) {
                if (assignedEmployee && assignedEmployee.length > 0) {
                    assignedEmployee.map((employee,index)=>{
                        teamMembers.filter(tempID => tempID["id"] == employee.assignedEmployee).map(tempID=>{
                            let temp = { id:tempID.id, fullname:tempID.fullname, image:tempID.image,employeeCode:tempID.employeeCode,designationName:tempID.designationName,departmentName:tempID.departmentName };
                                employees.push(temp);
                              
                        })
                    })
                    
                }
        }
       
        return employees;
    }
    // ----- END SELECT ASSIGNED EMPLOYEE -----


    $(document).on("change", `.priorityBadge,.modalPriorityBadge`, function() {
        var value = $(this).val();
      
        if(value ==""){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");

        }
        if(value ==1){
            $(this).addClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
        }
        if(value ==2){
            $(this).removeClass("badge-danger");
            $(this).addClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
        }
        if(value ==3){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).addClass("badge-info");
            $(this).removeClass("badge-primary");

        }
        if(value ==4){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).addClass("badge-primary");
        }
    })


    $(document).on("change", `.criticalBadge,.modalCriticalBadge`, function() {
        var value = $(this).val();
      
        if(value ==""){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");

        }
        if(value ==1){
            $(this).addClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
        }
        if(value ==2){
            $(this).removeClass("badge-danger");
            $(this).addClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
        }
        if(value ==3){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).addClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");

        }
        if(value ==4){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).addClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
        }
        if(value ==5){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).addClass("badge-success");
            $(this).removeClass("badge-outline-primary");
        }
        if(value ==6){
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-success");
            $(this).addClass("badge-outline-primary");
        }
    })

    $(document).on("change", `.statusBadge,.modalStatusBadge`, function() {
        var value = $(this).val();
        
        if(value ==""){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");

        }
        if(value ==1){
            $(this).addClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==2){
            $(this).removeClass("badge-primary");
            $(this).addClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==3){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).addClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");

        }
        if(value ==4){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).addClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==5){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).addClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==6){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).addClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==7){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).addClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }

        if(value ==8){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).addClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");
        }
        if(value ==9){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).addClass("badge-outline-info");
        }
    })

    $(document).on("change", `.assignedEmployeeStatusBadge`, function() {
        var value = $(this).val();
        var taskboardID = $(this).attr("taskboardID");
        var subtaskboardID = $(this).attr("subtaskboardID") || "";
        var employeeID = $(this).attr("employeeID");
        var condition = ``;

        if(subtaskboardID){
            condition=`span[taskBoardID=${taskboardID}][subtaskboardID=${subtaskboardID}]`;
        }else{
            condition=`span[taskBoardID=${taskboardID}]`;

        }
        
        
        if(value ==6){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).addClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");

            $(`${condition}[employeeID=${employeeID}]`).css('background','#dc3545');
        }
        if(value ==7){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).addClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).removeClass("badge-outline-info");

            $(`${condition}[employeeID=${employeeID}]`).css('background','#99CC00');

        }
        if(value ==9){
            $(this).removeClass("badge-primary");
            $(this).removeClass("badge-info");
            $(this).removeClass("badge-warning");
            $(this).removeClass("badge-outline-secondary");
            $(this).removeClass("badge-outline-warning");
            $(this).removeClass("badge-danger");
            $(this).removeClass("badge-success");
            $(this).removeClass("badge-outline-primary");
            $(this).addClass("badge-outline-info");

            $(`span ${condition}[employeeID=${employeeID}]`).css('background','#ffc107');

        }

    })
    // ----- END SELECT ASSIGNED EMPLOYEE -----


    // ----- SELECT2 MULTIPLE PLACEHOLDER -----
	function multipleSelect2Placeholder() {
        const isDisabled = $(`[name="assignEmployee"]`).attr("disabled");
		$(`.select2[name="assignEmployee"]`).select2({
			placeholder: !isDisabled ? "Select Team Members" : "-",
			theme:       "bootstrap",
			allowClear:  true,
			multiple:    true,
		});
		$(".select2-search__field").css("width", "100%");
	}
	// ----- END SELECT2 MULTIPLE PLACEHOLDER -----


// ----- DISPLAY PHASE -----
function displayPhase(teamMembers = {}, phase = {}, index = 0 ) {
    const {
        phaseDescription,
        phaseCode,
        milestones = []
    } = phase;

    

//   console.log(phase)
        const getAssigneeList = (subtaskboardID = null, subTask=[],teamMembers = {},taskID,subTaskName,timelineBuilderID,projectMilestoneID,milestoneID,milestoneName,phaseCode ) => { 
            let taskAssignedByContent = "";
            let taskAssigneeContent = "";
          
            const subTaskData = (subtaskboardID = null) => {
                let data = subTask.filter(st => st.subtaskboardID == subtaskboardID);
                let taskBoardID="",subTaskAssignee = "",createdBy ="";
                if (data && data.length > 0) {
                   
                    taskBoardID = data[0]?.taskBoardID;
                    subTaskAssignee = data[0]?.subTaskAssignee;
                    createdBy = data[0]?.createdBy;
                   
                }
                return {taskBoardID,subTaskAssignee,createdBy};
            };
            

            // milestones.map(milestone => {
                // const { milestoneID, milestoneName } = milestone;
                const {taskBoardID,subTaskAssignee,createdBy } = subTaskData(subtaskboardID);
               

 
                const teamMemberOptions = teamMembers.map(member => {
                    const { id, fullname, image ,designationName, departmentName, employeeCode } = member;

                    var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                    if(lastIndex.toLowerCase() == "null"){
                        image = image.replace("null","default.png");
                    }
                    
                    return `
                    <option 
                        value    = "${id}"
                        fullname = "${fullname}"
                        designationName = "${designationName}"
                        departmentName = "${departmentName}"
                        employeeCode = "${employeeCode}"
                        taskID = "${taskID}"
                        taskName = "${subTaskName}"
                        timelineBuilderID = "${timelineBuilderID}"
                        projectMilestoneID = "${projectMilestoneID}"
                        milestoneID = "${milestoneID}"
                        milestoneName = "${milestoneName}"
                        employeeID = "${id}"
                        phase = "${phaseCode}"
                        image    = "${image}">${fullname}</option>`;
                }).join("");

                taskAssigneeContent += `
                <div class="form-group my-1">
                    <select class="form-control validate select2"
                        name="assignEmployee"
                        multiple="multiple"
                        taskBoardID="${taskBoardID}"
                        subtaskboardID="${subtaskboardID}"
                        subTaskAssignee="${subTaskAssignee}"
                        label="assigned"
                        >
                        <option disabled>Select Employee</option>
                        ${teamMemberOptions}
                    </select>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
            // })



            taskAssignedByContent += `<span class="avatar">`;
                                        
            teamMembers.filter(employee => employee.id == createdBy).map((employee, index) => {
                const { id, fullname, image ,designationName, departmentName, employeeCode } = employee;

                var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                if(lastIndex.toLowerCase() == "null"){
                    image = image.replace("null","default.png");
                }


                if (index <= 5) {
                    taskAssignedByContent += `
                    
                    <span class="avatar">
                    <img 
                    class=""
                    src="${image}" 
                    width="45" 
                    height="45"
                    title="${fullname}"
                    style="margin: auto;">
                   
                    </span>`;
                }
               
              
            })
                
            taskAssignedByContent += `</span>`;

            return [taskAssignedByContent,taskAssigneeContent];
        }

    // ------------------------ START OF SUB TASK LIST------------------------------------------------- //
    const getSubTaskList = (subTask=[],attachedUniqueID,taskBoardID,teamMembers,milestoneName,milestoneID,phaseCode) => {
        var subTaskContent     = "";
            // console.log(teamMembers.length)
        subTask.map((subtasks,index) => {
          
           
            const { taskID, 
                subTaskName, 
                timelineBuilderID,
                projectMilestoneID,
                milestoneBuilderID,
                subTaskEndDates,
                subTaskStartDates,
                subTaskDescription,
                subTaskManHours,
                subTaskUsedHours,
                subTaskPriority,
                subTaskSeverity,
                subTaskTimeLeft,
                subTaskStatus,
                subTaskNotes,
                taskBoardID,
                subtaskboardID,
                extension,
                createdAt,
                createdBy
                } = subtasks;

                // console.log(createdBy)

            const getAssignee = getAssigneeList(subtaskboardID,subTask,teamMembers,taskID,subTaskName,timelineBuilderID,projectMilestoneID,milestoneID,milestoneName,phaseCode);
    

                // console.log(subtasks)
               
        subTaskContent += `<tr>
            <td class="text-nowrap">
                <div class="form-group my-1">
                <button type="button" class="btn btn-danger btn-sm delete_subtask" title="Delete"><i class="fas fa-trash-alt" ></i></button>
                &nbsp;
                    <span
                    class="btnModal"
                    taskID="${taskID}"
                    timelineBuilderID="${timelineBuilderID}"
                    projectMilestoneID="${projectMilestoneID}"
                    milestoneBuilderID="${milestoneBuilderID}"
                    milestoneID="${milestoneID}"
                    milestoneName="${milestoneName}"
                    phaseCode="${phaseCode}"
                    taskBoardID="${taskBoardID ? taskBoardID:taskBoardIDTask}"
                    subtaskboardID="${subtaskboardID}"
                    createdAt="${createdAt}"
                    extension="${extension}"
                    employees='${JSON.stringify(teamMembers)}'
                    label="assigned"
                     name="subtaskName"><small>${subTaskName}</small></span>
                </div>
            </td>


            <td>
            <div class="d-flex align-items-center justify-content-start " 
                taskID="${taskID}"
                    taskName = "${subTaskName}"
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <div class="" 
                        taskName="${subTaskName}" 
                        taskID="${taskID}"
                        taskBoardID="${taskBoardID ? taskBoardID:taskBoardIDTask}"
                        subtaskboardID="${subtaskboardID}"
                        createdBy="${createdBy}"
                        display="false"
                        style="position: relative;
                            top: 0;
                            white-space: nowrap;
                        ">
                        ${getAssignee[0]}`;

    subTaskContent += `</div>
                </div>
            </td>


            <td>
            <div class="d-flex align-items-center justify-content-start " 
                taskID="${taskID}"
                    taskName = "${subTaskName}"
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <div class="btnAssignee assignedMembers" 
                        taskName="${subTaskName}" 
                        taskID="${taskID}"
                        taskBoardID="${taskBoardID ? taskBoardID:taskBoardIDTask}"
                        subtaskboardID="${subtaskboardID}"
                        display="false"
                        style="position: relative;
                            top: 0;
                            white-space: nowrap;
                            cursor:pointer;
                            ">
                            <i class="fas fa-user-plus fa-lg" title="Set Assignee" style="border: 1px dashed black;
                            border-radius: 55px;
                            padding: 15px 10px;"></i>
                    </div>
                        <div class=" d-none dropdown-content  assigneeContent"
                        taskBoardID="${taskBoardID ? taskBoardID:taskBoardIDTask}"
                        subtaskboardID="${subtaskboardID}"
                        >
                        ${getAssignee[1]}
                        </div>
                </div>
            </td>
            <td style="width:25%;">
                <div class="form-group my-1">
                    <textarea 
                        class="form-control description validate btnSubTaskSubmit" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="subTaskDescription" 
                        label="description" 
                        id="subTaskDescription" 
                        required="" 
                        rows="2" 
                        style="width: 100%;">${subTaskDescription || ""}</textarea>
                </div>
            </td>
            <td class="text-center"
                <div class="form-group my-1">
                    <input class="form-control manHours input-hours text-center subTaskManHours btnSubTaskSubmit"
                        name="subTaskManHours"
                        id="subTaskManHours"
                        value="${subTaskManHours || "0.00"}"
                        label="man hours"
                        >
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control input-hours text-center subTaskUsedHours btnSubTaskSubmit"
                        name="subTaskUsedHours"
                        id="subTaskUsedHours"
                        value="${subTaskUsedHours || "0.00"}"
                        label="used hours"
                        >
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control dueDate text-center"
                        name="subTaskStartDates"
                        id="subTaskStartDates${attachedUniqueID+""+index}"
                        value="${subTaskStartDates}" 
                        basis    = "true"
                        taskID="${taskID}"
                        disabled>
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control actualEndDate  text-center subTaskEndDates"
                        name="subTaskEndDates"
                        id="subTaskEndDates${attachedUniqueID+""+index}"
                        value="${subTaskEndDates}" 
                        basis    = "true"
                        taskID="${taskID}"
                        label="actual end date">
                </div>
            </td>
            <td style="width:8%;">
                <div class="row clearfix">
                    <div class="form-group my-1 mr-1" style="width:100%;">
                        <small><select class="badge  priorityBadge form-control show-thin text-center " name="subTaskPriority" label="priority">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1" ${subTaskPriority == 1 ? "selected" : ""}><span class="text-center">Urgent</span></option>
                            <option class="badge badge-warning" value="2" ${subTaskPriority == 2 ? "selected" : ""}><span class="text-center">High</span></option>
                            <option class="badge badge-info" value="3" ${subTaskPriority == 3 ? "selected" : ""}><span class="text-center">Normal</span></option>
                            <option class="badge badge-primary" value="4" ${subTaskPriority == 4 ? "selected" : ""}><span class="text-center">Low</span></option>
                        </select></small>
                    </div>
                </div>
            </td>
            <td style="width:13%;">
                <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                        <select class="badge  criticalBadge form-control show-tick text-center" name="subTaskSeverity" label="severity">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1" ${subTaskSeverity == 1 ? "selected" : ""}><span class="text-center">CRITICAL</span></option>
                            <option class="badge badge-warning" value="2" ${subTaskSeverity == 2 ? "selected" : ""}><span class="text-center">MAJOR</span></option>
                            <option class="badge badge-info" value="3" ${subTaskSeverity == 3 ? "selected" : ""}><span class="text-center">MINOR</span></option>
                            <option class="badge badge-primary" value="4" ${subTaskSeverity == 4 ? "selected" : ""}><span class="text-center">TRIVIAL</span></option>
                            <option class="badge badge-success" value="5" ${subTaskSeverity == 5 ? "selected" : ""}><span class="text-center">SUGGESTION</span></option>
                            <option class="badge badge-outline-primary" value="6" ${subTaskSeverity == 6 ? "selected" : ""}><span class="text-center">WITHDRAWN</span></option>
                        </select>
                    </div>
                </div>
            </td>
            <td class="text-center"
            <div class="form-group my-1">
                <input class="form-control text-center"
                    name="subTaskTimeLeft"
                    id="subTaskTimeLeft"
                        value="${subTaskTimeLeft || "0.00"}"
                        basis    = "true"
                        taskID="${taskID}"
                        disabled>
            </div>
            </td>
            <td style="width:25%;">
                <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                        <select class="badge  statusBadge form-control show-tick text-center"  name="subTaskStatus" label="status">
                            <option value="">---</option>
                            <option class="badge badge-primary" value="1" ${subTaskStatus == 1 ? "selected" : ""}><span class="text-center">ON HOLD DEVELOPMENT</span></option>
                            <option class="badge badge-info" value="2" ${subTaskStatus == 2 ? "selected" : ""}><span class="text-center">ON DEVELOPMENT</span></option>
                            <option class="badge badge-warning" value="3" ${subTaskStatus == 3 ? "selected" : ""}><span class="text-center">FOR TESTING</span></option>
                            <option class="badge badge-outline-secondary" value="4" ${subTaskStatus == 4 ? "selected" : ""}><span class="text-center">ON HOLD TESTING</span></option>
                            <option class="badge badge-outline-warning" value="5" ${subTaskStatus == 5 ? "selected" : ""}><span class="text-center">ON TESTING</span></option>
                            <option class="badge badge badge-danger" value="6" ${subTaskStatus == 6 ? "selected" : ""}><span class="text-center">FAILED</span></option>
                            <option class="badge badge-success" value="7" ${subTaskStatus == 7 ? "selected" : ""}><span class="text-center">PASSED</span></option>
                            <option class="badge badge-outline-primary" value="8" ${subTaskStatus == 8 ? "selected" : ""}>TODO</option>
                            <option class="badge badge-outline-info" value="9" ${subTaskStatus == 9 ? "selected" : ""}>PENDING</option>
                        </select>
                    </div>
                </div>
            </td>
            <td style="width:25%;">
                <div class="form-group my-1">
                    <textarea 
                        class="form-control notes validate btnSubTaskSubmit" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="subTaskNotes" 
                        label="notes" 
                        id="subTaskNotes" 
                        required="" 
                        rows="2" 
                        style="width: 100%;">${subTaskNotes || ""}</textarea>
                </div>
            </td>`;
          

        })

        
        
        return [subTaskContent];
    }

    // ------------------------ END OF SUB TASK LIST------------------------------------------------- //


    // ------------------------ START OF  TASK LIST-------------------------------------------------- //

    const getTaskList = (milestoneID = null, milestoneName = null,tasks =[] , phaseCode = null) => {
        let taskNameContent     = ""; 
    
     
    //    console.log(tasks)
        tasks.map((task,index) => {

           
            const { taskID, 
                taskName, 
                timelineBuilderID,
                projectMilestoneID,
                milestoneBuilderID,
                taskEndDate,
                taskStartDate,
                manHours,
                usedHours,
                taskPriority,
                taskSeverity,
                taskTimeLeft,
                taskStatus,
                taskNotes,
                taskBoardID,
                taskDescription,
                extension,
                assignedEmployee = [],
                subTask =[] } = task;
          
            const employees = getAssignedEmployee(phaseCode, taskName,assignedEmployee,teamMembers);

            // console.log(employees)

            let changemilestoneName = milestoneName.replaceAll("/","slash").replaceAll(' ','');

            attachedUniqueID = milestoneBuilderID+''+changemilestoneName+''+index;
            const subTaskList = getSubTaskList(subTask,attachedUniqueID,taskBoardID,teamMembers,milestoneName,milestoneID,phaseCode);


            taskNameContent += `

           
            <tr>
                <td style="position: relative;" > 

                <div class="d-flex align-items-left " 
                    name="taskName"
                    taskID="${taskID}"
                    taskName = "${taskName}"
                    timelineBuilderID="${timelineBuilderID}"
                    projectMilestoneID="${projectMilestoneID}"
                    milestoneBuilderID="${milestoneBuilderID}"
                    taskBoardID="${taskBoardID}"
                    employees='${JSON.stringify(employees)}'
                    taskDisplay="false"
                   
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <i class=" btnTask fad fa-caret-down mr-3" taskCaret="true"></i><span
                     class="btnModal milestonePerTask"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        timelineBuilderID="${timelineBuilderID}"
                        projectMilestoneID="${projectMilestoneID}"
                        milestoneBuilderID="${milestoneBuilderID}"
                        taskBoardID="${taskBoardID}"
                        taskHeaderID="${taskBoardID}"
                        extension="${extension}"
                     >${taskName}</span>
                    </div>
                </td>

                <td style="position: relative;">
                <div class="d-flex align-items-center justify-content-start" 
                    name="assignEmployeeTask"
                    taskBoardID="${taskBoardID}"
                    taskID="${taskID}"
                    taskName = "${taskName}"
                    milestoneID = "${milestoneID}"
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <div class="" 
                        taskName="${taskName}" 
                        taskID="${taskID}"
                       
                        style="position: absolute;
                            top: 0;
                            margin-top: 10px;">`;
                        

                            if (employees.length > 0 && taskName) {
                                taskNameContent +=`<span class="avatar">`;
                               
                                employees.map((employee, index) => {
                                    const { id, fullname, image ,designationName, departmentName, employeeCode } = employee;

                                    var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                                    if(lastIndex.toLowerCase() == "null"){
                                        image = image.replace("null","default.png");
                                    }

                                    // EMPLOYEE STATUS:
                                    // PASSED = 7
                                    // FAILED = 6
                                    // PENDING = 9
                                    let getStatus = '9';
                                    let getcolorStatus = '#ffc107';
                                    getStatus = getTableData("pms_employee_taskboard_status_tbl",
                                    `employeeTaskStatus`,
                                    `taskBoardID=${taskBoardID || 0} AND subtaskboardID =0 AND employeeID=${id} AND timelineBuilderID =${timelineBuilderID} AND projectMilestoneID=${projectMilestoneID} AND taskID =${taskID}`);

                                    if(getStatus.length > 0){
                                        if(getStatus[0].employeeTaskStatus == "7"){
                                            getcolorStatus = '#99CC00';
                                        }
    
                                        else if(getStatus[0].employeeTaskStatus == "6"){
                                            getcolorStatus = '#dc3545';
                                        }
                                        else{
                                            getcolorStatus = '#ffc107';
                                        }
                                    }else{
                                        getcolorStatus = '#ffc107';
                                    }
                                    
                                   
                                    if (index <= 5) {
                                        taskNameContent += `
                                        
                                        <span class="avatar">
                                        <span class='c-avatar__status' 
                                        style="background:${getcolorStatus}"
                                        taskBoardID="${taskBoardID}";'
                                        employeeID        = "${id}"
                                        ></span>
                                        
                                        <img 
                                        class="employeeProfile"
                                        src="${image}" 
                                        width="45" 
                                        height="45"
                                        style="cursor: pointer;"
                                        taskBoardID="${taskBoardID}"
                                        phase             = "${phaseCode}"
                                        taskID            = "${taskID}"
                                        taskName = "${taskName}"
                                        timelineBuilderID="${timelineBuilderID}"
                                        projectMilestoneID="${projectMilestoneID}"
                                        milestoneID = "${milestoneID}"
                                        milestoneName = "${milestoneName}"
                                        employeeID        = "${id}"
                                        departmentName    = "${departmentName}"
                                        designationName   = "${designationName}"
                                        employeeCode      = "${employeeCode}"
                                        title="${fullname}">
                                       
                                        </span>`;
                                    }
                                    // if (index == 6) {
                                    //     taskNameContent += `
                                    //     <span class="font-weight-bolder"
                                    //         style="position: absolute;
                                    //             top: 0;
                                    //             margin-left: 7px;
                                    //             margin-top: 25px;
                                    //             font-size: 1.5rem;">+${members.length - 6}<span>`;
                                    // }
                                  
                                })

                                taskNameContent +=`</span>`;
                            } else {
                                taskNameContent += `<span>No data available yet.</span>`;
                            }
    taskNameContent += `     
                    </div>
                </div>

            </td>

            <td style="width:15%;">
            <div class="form-group my-1">
                    <textarea 
                    class="form-control description validate btnSubmit" 
                    data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                    minlength="2" 
                    maxlength="325" 
                    name="TaskDescription" 
                    label="description" 
                    id="TaskDescription" 
                    required="" 
                    rows="2" 
                    style="width: 80%;">${taskDescription || ""}</textarea>
                </div>
            </td>

                <td class="text-center"
                <div class="form-group my-1">
                    <input class="form-control manHours input-hours text-center TaskManHours btnSubmit"
                        name="TaskManHours"
                        id="TaskManHours"
                        value="${manHours}" 
                            basis    = "true"
                            taskID="${taskID}"
                            taskName = "${taskName}"
                            disabled>
                </div>
            </td>

            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control input-hours text-center TaskUsedHours btnSubmit"
                        name="TaskUsedHours"
                        id="TaskUsedHours"
                        value="${usedHours}" 
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        label="used hours">
                </div>
            </td>

            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control dueDate  text-center"
                        name="TaskStartDates"
                        id="TaskStartDates"
                        value="${taskStartDate}" 
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        disabled>
                </div>
            </td>

            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control  text-center actualEndDate TaskEndDates"
                        name="TaskEndDates"
                        id="TaskEndDates${attachedUniqueID+""+index}"
                        value="${taskEndDate}" 
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        label="actual end date"
                        >
                </div>
            </td>

            <td style="width:8%;">
                <div class="row clearfix">
                    <div class="form-group my-1 mr-1" style="width:100%;">
                        <small><select class="badge  priorityBadge form-control show-thin text-center" name="taskPriority" label="priority">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1" ${taskPriority == 1 ? "selected" : ""}><span class="text-center">Urgent</span></option>
                            <option class="badge badge-warning" value="2" ${taskPriority == 2 ? "selected" : ""}><span class="text-center">High</span></option>
                            <option class="badge badge-info" value="3" ${taskPriority == 3 ? "selected" : ""}><span class="text-center">Normal</span></option>
                            <option class="badge badge-primary" value="4" ${taskPriority == 4 ? "selected" : ""}><span class="text-center">Low</span></option>
                        </select></small>
                    </div>
                </div>
            </td>

            <td style="width:10%;">
                <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                        <select class="badge  criticalBadge form-control show-tick text-center" name="taskSeverity" label="severity">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1" ${taskSeverity == 1 ? "selected" : ""}><span class="text-center">CRITICAL</span></option>
                            <option class="badge badge-warning" value="2" ${taskSeverity == 2 ? "selected" : ""}><span class="text-center">MAJOR</span></option>
                            <option class="badge badge-info" value="3" ${taskSeverity == 3 ? "selected" : ""}><span class="text-center">MINOR</span></option>
                            <option class="badge badge-primary" value="4" ${taskSeverity == 4 ? "selected" : ""}><span class="text-center">TRIVIAL</span></option>
                            <option class="badge badge-success" value="5" ${taskSeverity == 5 ? "selected" : ""}><span class="text-center">SUGGESTION</span></option>
                            <option class="badge badge-outline-primary" value="6" ${taskSeverity == 6 ? "selected" : ""}><span class="text-center">WITHDRAWN</span></option>
                        </select>
                    </div>
                </div>
            </td>

            <td class="text-center"
                <div class="form-group my-1">
                    <input class="form-control text-center"
                        name="TaskTimeLeft"
                        id="TaskTimeLeft"
                            value="${taskTimeLeft || "0.00"}"
                            basis    = "true"
                            taskID="${taskID}"
                            taskName = "${taskName}"
                            disabled>
                </div>
            </td>

            <td style="width:10%;">
            <div class="row clearfix">
                <div class="form-group my-1 ml-1" style="width:100%;">
                <select class="badge  statusBadge form-control " name="taskStatus" label="status">
                    <option value="">---</option>
                    <option class="badge badge-primary" value="1" ${taskStatus == 1 ? "selected" : ""}>ON HOLD DEVELOPMENT</option>
                    <option class="badge badge-info" value="2" ${taskStatus == 2 ? "selected" : ""}>ON DEVELOPMENT</option>
                    <option class="badge badge-warning" value="3" ${taskStatus == 3 ? "selected" : ""}>FOR TESTING</option>
                    <option class="badge badge-outline-secondary" value="4" ${taskStatus == 4 ? "selected" : ""}>ON HOLD TESTING</option>
                    <option class="badge badge-outline-warning" value="5" ${taskStatus == 5 ? "selected" : ""}>ON TESTING</option>
                    <option class="badge badge badge-danger" value="6" ${taskStatus == 6 ? "selected" : ""}>FAILED</option>
                    <option class="badge badge-success" value="7" ${taskStatus == 7 ? "selected" : ""}>PASSED</option>
                    <option class="badge badge-outline-primary" value="8" ${taskStatus == 8 ? "selected" : ""}>TODO</option>
                    <option class="badge badge-outline-info" value="9" ${taskStatus == 9 ? "selected" : ""}>PENDING</option>
                </select>
                </div>
            </div>
        </td>
            
            <td style="width:15%;">
                <div class="form-group my-1">
                    <textarea 
                        class="form-control notes validate btnSubmit" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="taskNotes" 
                        label="notes" 
                        id="taskNotes" 
                        required="" 
                        rows="2" 
                        style="width: 100%;">${taskNotes || ""}</textarea>
                </div>
            </td>
            
            
            </tr>

            <tr style="position:relative;">
                <td colspan="11">
                <div class="d-none align-items-center right-content-start taskContent"
                taskName = "${taskName}"    
                taskID="${taskID}">
                <table class="table projectSubTask" style="margin-left:55px;width:116% !important;" id="projectSubTask${attachedUniqueID}">
                    <thead class="text-nowrap">
                        <tr class="bg-dark nowrap">
                        <th class="text-white"  style="min-width: 150px;">Subtasks</th>
                        <th class="text-white"  style="min-width: 100px;">Assigned By</th>
                        <th class="text-white"  style="min-width: 150px;">Assignees</th>
                        <th class="text-white"  style="min-width: 100px;">Description</th>
                        <th class="text-white"  style="min-width: 100px;">Man Hours</th>
                        <th class="text-white"  style="min-width: 100px;">Used Hours</th>
                        <th class="text-white"  style="min-width: 150px;">Due Date</th>
                        <th class="text-white"  style="min-width: 150px;">Actual End Date</th>
                        <th class="text-white"  style="min-width: 50px;">Priority</th>
                        <th class="text-white"  style="min-width: 50px;">Severity</th>
                        <th class="text-white"  style="min-width: 100px;">Time Left</th>
                        <th class="text-white"  style="min-width: 50px;">Status</th>
                        <th class="text-white"  style="min-width: 100px;">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subTaskList[0]}
                    </tbody>
                    </table>
                    <hr style="margin-left:50px;" class="w-100">
                    <div class="w-100 text-left my-1 mt-1 ml-4">
                            <button class="btn btn-primary btn-sm ml-4 btnAddRow" type="button" id="btnAddRow"  
                            taskID="${taskID}"
                            taskName = "${taskName}"
                            timelineBuilderID="${timelineBuilderID}"
                            projectMilestoneID="${projectMilestoneID}"
                            milestoneBuilderID="${milestoneBuilderID}"
                            milestoneID="${milestoneID}"
                            milestoneName="${milestoneName}"
                            phaseCode="${phaseCode}"
                            taskBoardID="${taskBoardID}"
                            startDate = "${taskStartDate}"
                            endDate="${taskEndDate}"
                            attachedUniqueID ="${attachedUniqueID}"
                            employees='${JSON.stringify(employees)}'
                            subtask='${JSON.stringify(subTask)}'
                            teamMembers='${JSON.stringify(teamMembers)}'
                            manHours='${manHours}'
                            subTableID = "projectSubTask${attachedUniqueID}" ><i class="fas fa-plus-circle"></i> Add Subtask</button>
                    </div>
                    </div>
                </td>
            </tr>
            `;
        })
 
        return [taskNameContent];
    }
    // ----------------------------------- END OF  TASK LIST-------------------------------------------------- //

    // ------------------------ START OF  MILESTONE LIST-------------------------------------------------- //

    let taskHTML = "";
    // console.log(milestones)
    milestones.map(milestone => {

        const { milestoneID, milestoneName ,tasks =[] } = milestone;


        const taskList = getTaskList(milestoneID, milestoneName,tasks, phaseCode);
       
        taskHTML += `
        <tr>   
            <td style="position: relative;">    
                <div class="d-flex align-items-center left-content-between btnCaret" 
                    phase="${phaseCode}"
                    taskName = "${milestoneName}"
                    display="false"
                    style="cursor: pointer;
                        min-height: 50px;
                        height: auto;
                        max-height: 50px;
                        width: 100%;
                        padding: 1rem;
                       
                        top: 0">
                        <i class="fad fa-caret-down mr-3" caret="true"></i><span>${milestoneName}</span>
                   
                </div>
                <div class="d-none align-items-center right-content-start taskMainList" 
                    phase="${phaseCode}"
                    taskName = "${milestoneName}"
                    style    = "margin-top: 0px;
                    min-height: 50px;
                     position: relative;">

                     <div class="w-100">
                        <table class="table projectTask" id="projectTask${milestoneName+""+index}" style="margin-left:10px;width:160% !important;">
                            <thead class="text-nowrap">
                                <tr class="bg-dark">
                                    <th class="text-white"  style="min-width: 150px;">Tasks</th>
                                    <th class="text-white"  style="min-width: 150px;">Assignees</th>
                                    <th class="text-white"  style="min-width: 20px;">Description</th>
                                    <th class="text-white"  style="min-width: 20px;">Man Hours</th>
                                    <th class="text-white"  style="min-width: 20px;">Used Hours</th>
                                    <th class="text-white"  style="min-width: 150px;" >Due Date</th>
                                    <th class="text-white"  style="min-width: 150px;">Actual End Date</th>
                                    <th class="text-white"  style="min-width: 20px;">Priority</th>
                                    <th class="text-white"  style="min-width: 20px;">Severity</th>
                                    <th class="text-white"  style="min-width: 20px;">Time Left</th>
                                    <th class="text-white"  style="min-width: 20px;">Status</th>
                                    <th class="text-white"  style="min-width: 20px;">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${taskList[0]}
                            </tbody>
                        </table>
                    </div>
                </div>
            </td>

           
               
           
           
           
        </tr>`;
    })

    // ------------------------ END OF  MILESTONE LIST-------------------------------------------------- //

    // --------------------------- START OF PHASE LIST-------------------------------------------------- //

    let html = `
    <div class="card">
        <div class="card-body">
            <div class="mb-2">
                <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                </div>
               
            </div>

            <div class="w-100">
                <table class="table projectTimeline" id="projectTimeline${index}">
                    <thead>
                        <tr class="bg-dark">
                            <th class="text-white">Milestone</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${taskHTML}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
    return html;
    // --------------------------- START OF PHASE LIST-------------------------------------------------- //

}
// ----- END DISPLAY PHASE -----


    // ----- UPDATE TABLE -----
    function updateTables() {
        // $(`[name="milestoneName"]`).each(function(index) {
        //     $(this).attr("index", index);
        //     $(this).attr("id", `milestoneName${index}`);
        // })

        // $(`[name="manHours"]`).each(function(index) {
        //     $parent = $(this).closest(".form-group");
        //     $(this).attr("index", index);
        //     $(this).attr("id", `manHours${index}`);
        //     $parent.find(".invalid-feedback").attr("id", `invalid-manHours${index}`);
        // })

        $(`[name="assignEmployee"]`).each(function(index) {
            $parent = $(this).closest(".form-group");
            $(this).attr("index", index);
            $(this).attr("id", `assignEmployee${index}`);
            // $parent.find(".invalid-feedback").attr("id", `invalid-assignEmployee${index}`);
        })
    }
    // ----- END UPDATE TABLE -----


        // ----- ASSIGN EMPLOYEE STATUS ----//
        function assignEmployeeStatus(taskBoardID=0,subtaskboardID=0,employeeID=0,timelineBuilderID=0,projectMilestoneID=0,taskID=0){
            let html ='';
            let taskStatus  =1;
            let condition = "";

                if(subtaskboardID){
                    condition = `taskBoardID=${taskBoardID || 0} AND subtaskboardID=${subtaskboardID}`;
                }else{
                    condition = `taskBoardID=${taskBoardID || 0} AND subtaskboardID= 0`;
                }

                getStatus = getTableData("pms_employee_taskboard_status_tbl",
                `employeeTaskStatus`,
                ` ${condition} AND employeeID=${employeeID} AND timelineBuilderID =${timelineBuilderID} AND projectMilestoneID=${projectMilestoneID} AND taskID =${taskID}`);

            if(getStatus.length >0){
                html =` <option value="">---</option>
                <option class="badge badge badge-danger" value="6" ${getStatus[0].employeeTaskStatus == 6 ? "selected" : ""}>FAILED</option>
                <option class="badge badge-success" value="7" ${getStatus[0].employeeTaskStatus == 7 ? "selected" : ""}>PASSED</option>
                <option class="badge badge-outline-info" value="9" ${getStatus[0].employeeTaskStatus == 9 ? "selected" : ""}>PENDING</option>`;
            }else{
                html =`  
                <option class="badge badge badge-danger" value="6">FAILED</option>
                <option class="badge badge-success" value="7">PASSED</option>
                <option class="badge badge-outline-info" selected value="9">PENDING</option>`;
            }
            

            return html;
        }
        // ----- END ASSIGN EMPLOYEE STATUS ----//

        // ----- GET TABLE DATE ROW -----
        function getTableDateRow(data = false, isReadOnly = false) {

            let startDate          = ""; 
            let endDate          = ""; 
            let manHours      = ""; 
            let regularHours  = ""; 
            let overtimeHours = "";
            if (data) {
                employeeID          = data.employeeID ?? 0;
                startDate          = data.startDate ?? "";
                endDate          = data.endDate ?? "";
                manHours      = data.manHours ?? "";
                regularHours  = data.regularHours ?? "";
                overtimeHours = data.overtimeHours ?? "";
                taskBoardID = data.taskBoardID ?? 0;
                subtaskboardID = data.subtaskboardID ?? 0;
                timelineBuilderID = data.timelineBuilderID ?? 0;
                projectMilestoneID = data.projectMilestoneID ?? 0;
                taskID = data.taskID ?? "";
            }
            
    
            let html = "";
            if (isReadOnly) {
                html = `
                <tr class="dates">
                <td>
                    <div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
                        <b>Start Date: </b><span style="color:#000;">${moment(startDate || new Date).format("MMMM DD, YYYY")}</span>
                    </div>

                    <div style="color:#dc3450; display: block; font-size: 14px; padding: 2px">
                        <b>End Date: </b><span style="color:#000;">${moment(endDate || new Date).format("MMMM DD, YYYY")}</span>
                    </div>
                
                </td>
              
                    <td class="text-center">
                        ${formatAmount(manHours || 0)}
                    </td>
                    <td class="text-center">
                        ${formatAmount(regularHours || 0)}
                    </td>
                    <td class="text-center">
                        ${formatAmount(overtimeHours || 0)}
                    </td>
                    <td class="text-center">
                    <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                    <select class="badge  assignedEmployeeStatusBadge form-control" 
                    name="employeeTaskStatus" 
                    label="status" 
                    style=" width: 80%;" 
                    taskBoardID ="${taskBoardID}"
                    subtaskboardID ="${subtaskboardID}"
                    timelineBuilderID ="${timelineBuilderID}"
                    projectMilestoneID = "${projectMilestoneID}"
                    taskID = "${taskID}"
                    employeeID = "${employeeID}"
                    >
                       ${assignEmployeeStatus(taskBoardID,subtaskboardID,employeeID,timelineBuilderID,projectMilestoneID,taskID)}
                    </select>
                    </div>
                </div>
                    </td>
                </tr>`;
            } else {
                html = `
                <tr class="dates">
                    <td colspan="5" class="text-center"> 
                    <h6> No Records Found.</h6>
                    </td>
                </tr>`;
            }
            
            return html;
        }
        // ----- END GET TABLE DATE ROW -----

        // ----- EMPLOYEE MODAL CONTENT -----
        function employeeModalContent(taskBoardID ="",subtaskboardID="",timelineBuilderID = "",projectMilestoneID ="", phase = "", taskID = "", taskName ="", milestoneName ="", employeeData = false, taskData = [], isReadOnly = false) {

            let html = "";
            if (employeeData && taskData && taskData.length > 0) {

                const {
                    employeeID, fullname, image, employeeCode, departmentName, designationName
                } = employeeData;
    
                let tbodyHTML = "";
                taskData.map(task => {
    
                    const { employeeID, timelineBuilderID, taskID, milestoneID } = task;
                let employeeTimelineManagement = "";
                employeeTimelineManagement = getTableData("pms_timeline_management_tbl",
                    "",
                    `timelineBuilderID = ${timelineBuilderID} AND 
                    projectMilestoneID = ${projectMilestoneID} AND 
                    taskID = ${taskID} `);
    
                    let data = [];
                    employeeTimelineManagement.map((empTime, index) => {
                        const { timelineManagementID, timelineBuilderID, taskID,projectMilestoneID,assignedEmployee,assignedManHours,assignedStartDate,assignedRegularHours,assignedOvertimeHours } = empTime;

                        if (assignedEmployee.includes(employeeID)) {
                            const getAssignEmployee = assignedEmployee.split("|");
                            const employeeIndex  = getAssignEmployee.indexOf(employeeID);
    
                            const datesArr         = assignedStartDate?.split("|") || [];
                            const manHoursArr      = assignedManHours?.split("|") || [];
                            const regularHoursArr  = assignedRegularHours?.split("|") || [];
                            const overtimeHoursArr = assignedOvertimeHours?.split("|") || [];
    
                            const datesArr2         = datesArr[employeeIndex] ?? "";
                            const manHoursArr2      = manHoursArr[employeeIndex] ?? "";
                            const regularHoursArr2  = regularHoursArr[employeeIndex] ?? "";
                            const overtimeHoursArr2 = overtimeHoursArr[employeeIndex] ?? "";
    
                            const datesArr3         = datesArr2?.split("~") ?? [];
                            const manHoursArr3      = manHoursArr2?.split("~") ?? [];
                            const regularHoursArr3  = regularHoursArr2?.split("~") ?? [];
                            const overtimeHoursArr3 = overtimeHoursArr2?.split("~") ?? [];

                            let employeeTotalManHours = 0;
                            let employeeTotalRegularHours = 0;
                            let employeeTotalOvertimeHours = 0;
                            datesArr3.map((arr, index) => {
                                const date          = datesArr3[index] ?? "";
                                const manHours      = manHoursArr3[index] ?? "";
                                const regularHours  = regularHoursArr3[index] ?? "";
                                const overtimeHours = overtimeHoursArr3[index] ?? "";
    
                                employeeTotalManHours += ((+manHours) || 0);
                                employeeTotalRegularHours += ((+regularHours) || 0);
                                employeeTotalOvertimeHours += ((+overtimeHours) || 0);

                                
    
                                
                            })
                            // console.log(datesArr3)
                            const max = moment.max(datesArr3.map(d => moment(d)))
                            const min = moment.min(datesArr3.map(d => moment(d)))
                            const startDate = min.format('MMMM DD, YYYY')
                            const endDate = max.format('MMMM DD, YYYY')
                        


                            let temp = {
                                employeeID,
                               startDate,
                               endDate, 
                               manHours:employeeTotalManHours, 
                               regularHours:employeeTotalRegularHours, 
                               overtimeHours:employeeTotalOvertimeHours,
                               taskBoardID,
                               subtaskboardID,
                               timelineBuilderID,
                               projectMilestoneID,
                               taskID
                            };
                            data.push(temp);
    
                        }
                    })
    
                    let tableDateRow = "";
                    if (data && data.length > 0) {
                        data.map(item => {
                            tableDateRow += getTableDateRow(item, true);
                        })
                    } else {
                        tableDateRow += getTableDateRow(null, false);
                    }
    
                    
    
                  
    
                    tbodyHTML += `
                    <tr phase       = "${phase}"
                        taskID      = "${taskID}"
                        milestone   = "true"
                        milestoneID = "${milestoneID}">
                        <td>
                            <div>    
                            ${milestoneName}
                            </div>
                            <small style="color:#848482;">${taskName}</small>
                        </td>
                        <td>
                            <table class="table table-bordered tableDate">
                                <thead>
                                    <tr>
                                        <th style="width: 30%">Date</th>
                                        <th style="width: 15%">Man Hours</th>
                                        <th style="width: 15%">Regular Hours</th>
                                        <th style="width: 15%">Overtime Hours</th>
                                        <th style="width: 25%">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   ${tableDateRow}
                                </tbody>
                            </table>
                     
                        </td>
                    </tr>`;
                })
    
                // let totalRemainingManHours = (+remaining) + (+employeeTotalManHours);
    
                html = `
                <div class="row p-3">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center mb-3 px-2">
                            <div class="d-flex justify-content-start align-items-center">
                                <img src="${image}"
                                    class="rounded-circle"
                                    style="width: 50px; height: 50px;"
                                    alt="${fullname}">
                                <div class="font-weight-bold ml-2">
                                    <h5>${fullname}</h5>
                                    <small>${employeeCode}</small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end align-items-end flex-column">
                                <h5>${designationName}</h5>
                                <small>${departmentName}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <table class="table table-striped" id="tableManHours">
                            <thead>
                                <tr>
                                    <th>Milestones</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody id="remainingManHours"> 
                                ${tbodyHTML}
                            </tbody>
                        </table>
                    </div>
                </div>`;
    
                // html += !isReadOnly ? `
                // <div class="modal-footer">
                //     <div class="w-100 text-right">
                //         <button class="btn btn-save px-5 py-2" 
                //             id         = "btnSaveManHours"
                //             employeeID = "${employeeID}"
                //             phase      = "${phase}"
                //             taskID     = "${taskID}">
                //             <i class="fas fa-save"></i> Save
                //         </button>
                //         <button class="btn btn-cancel px-5 py-2 btnDismissModal">
                //             <i class="fas fa-ban"></i> Cancel
                //         </button>
                //     </div>
                // </div>` : "";
            }
            return html;
        }
        // ----- END EMPLOYEE MODAL CONTENT -----

        function getEmployeeProfile(data = null,subtaskboardID="", index =false){
            let = {
                isReadOnly,
                taskBoardID,
                timelineBuilderID,
                projectMilestoneID,
                milestoneID, 
                milestoneName   ,
                phase,
                taskID ,
                taskName ,
                employeeID,
                fullname,
                image ,
                employeeCode ,
                departmentName,
                designationName ,
                title
            } = data;
            let employeeData = {
                employeeID, fullname, image, employeeCode, departmentName, designationName
            };
            let nameCondition;
            if(subtaskboardID){
                 nameCondition =`[subtaskboardID="${subtaskboardID}"][index="${index}"]`;
            }else{
                 nameCondition =`[taskBoardID="${taskBoardID}"]`;
            }
    
            let taskData = [];
            $(`[name="assignEmployeeTask"]${nameCondition}[taskID="${taskID}"][taskName="${taskName}"][milestoneID="${milestoneID}"]`).each(function() {
                const milestoneID = $(this).attr("milestoneID");
                const employeeArr = $(this).val();
                // if (employeeArr.includes(employeeID)) {
                    taskData.push({
                        employeeID, timelineBuilderID, taskID, milestoneID
                    })
                // }
            })
            
            $(`#modal_project_management_board .page-title`).text(title);
            $(`#modal_project_management_board_content`).html(preloader);
            $(`#modal_project_management_board`).modal("show");
            setTimeout(() => {
                    let content = employeeModalContent(taskBoardID,subtaskboardID,timelineBuilderID, projectMilestoneID, phase, taskID, taskName , milestoneName, employeeData, taskData, isReadOnly);
                    $(`#modal_project_management_board_content`).html(content);
        
                    initHours();
                    // initDatatables();
                    // updateTables();
                    // updateTableDateItems();
        
                    $(".assignedEmployeeStatusBadge").each(function() {
                        $(this).trigger("change");
                    })
        
                    $(`[name="employeeDate"]`).each(function() {
                        const elementID = "#"+this.id;
                        const dateValue = $(this).attr("dateValue") || taskStartDate;
                        initDatePicker(elementID, taskStartDate, taskEndDate, dateValue);
                        manipulateDatePicker(elementID, dateValue);
                    });
                    $(".assigneeContent").hide();
                }, 500);
        }   


    // ----- CLICK EMPLOYEE PROFILE -----
    $(document).on("click", `.employeeProfile`, function() {
        const isReadOnly        = $(this).attr("isReadOnly") == "true";
        const taskBoardID = $(this).attr("taskBoardID");
        const timelineBuilderID = $(this).attr("timelineBuilderID");
        const projectMilestoneID = $(this).attr("projectMilestoneID");
        const milestoneID = $(this).attr("milestoneID");
        const milestoneName = $(this).attr("milestoneName");
        const phase             = $(this).attr("phase");
        const taskID            = $(this).attr("taskID");
        const taskName            = $(this).attr("taskName");
        const employeeID        = $(this).attr("employeeID");
        const fullname          = $(this).attr("title");
        const image             = $(this).attr("src");
        const employeeCode      = $(this).attr("employeeCode");
        const departmentName    = $(this).attr("departmentName");
        const designationName   = $(this).attr("designationName");
        let title =  "ASSIGNED MAN HOURS";
        let data = {
            isReadOnly,
            taskBoardID,
            timelineBuilderID,
            projectMilestoneID,
            milestoneID, 
            milestoneName   ,
            phase,
            taskID ,
            taskName ,
            employeeID,
            fullname,
            image ,
            employeeCode ,
            departmentName,
            designationName ,
            title
        }
        getEmployeeProfile(data);
        // $parent = $(this).closest("tr");
        // const taskStartDate = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskStartDate");
        // const taskEndDate   = $parent.find(`[phase="${phase}"][taskID="${taskID}"][basis="true"]`).attr("taskEndDate");
        // $parent.find(`[name="manHours"][phase="${phase}"][taskID="${taskID}"]`).removeClass("is-invalid").removeClass("is-valid");
        // $parent.find(`.invalid-feedback`).text("");

        
    })

    $(document).on('shown.bs.modal', '#modal_project_management_board', function () {
        $("#tableManHours").DataTable().columns.adjust().draw();
    });
    // ----- END CLICK EMPLOYEE PROFILE -----


    // ----- KEYUP MAN HOURS -----
    $(document).on("keyup", `[name="manHours"]`, function() {
        const phase     = $(this).attr("phase");
        const taskName  = $(this).attr("taskName");
        const elementID = "#"+$(this).attr("id");

        validateManHours(phase, taskName, elementID);
    })
    // ----- END KEYUP MAN HOURS -----


    // // ----- FORM BUTTON -----
    // function formButtons(data = false) {
    //     let button = "";
    //     if (data) {
    //         const {
    //             timelineBuilderID     = "",
    //             timelineManagementStatus = "",
    //             employeeID            = "",
    //             approversID           = "",
    //             approversDate         = "",
    //             createdAt              = new Date
    //         } = data && data[0];

    //         if (timelineManagementStatus == 0 || timelineManagementStatus == 1) { // DRAFT OR FOR ASSESSMENT
    //             button = `
    //             <button 
    //                 class="btn btn-submit px-5 p-2"  
    //                 id="btnSubmit" 
    //                 timelineBuilderID="${encryptString(timelineBuilderID)}"
    //                 code="${getFormCode("TL", createdAt, timelineBuilderID)}">
    //                 <i class="fas fa-paper-plane"></i> Submit
    //             </button>
    //             <button 
    //                 class="btn btn-cancel px-5 p-2"
    //                 id="btnCancel" 
    //                 timelineBuilderID="${encryptString(timelineBuilderID)}"
    //                 code="${getFormCode("TL", createdAt, timelineBuilderID)}">
    //                 <i class="fas fa-ban"></i> Cancel
    //             </button>`;

    //         } 
    //     }

    //     return button;
    // }
    // // ----- END FORM BUTTON -----


    // ----- INPUTMASK HOURS -----
    function inputmaskHours() {
        $(".custom-input-hours").inputmask({
            alias: "currency",
            prefix: "",
            allowMinus: false,
            allowPlus:  false,
        });
    }
    // ----- END INPUTMASK HOURS -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
		
	
        $("#page_content").html(preloader);
		let html = ``;
		if(data){
			const {
				timelineBuilderID,
				projectName,
				projectCode,
                projectCategory,
				teamMember,
				employeeID,
				projectCreatedAt,
				teamMembersID,
				timelineManagementStatus,
				phases
			} = data && data[0];

            // console.log(data)
	
			let membersID = teamMember ? teamMember.replaceAll("|", ",") : "0";
			const teamMembers = getTableData(
				`hris_employee_list_tbl 
                LEFT JOIN hris_department_tbl USING(departmentID)
                LEFT JOIN hris_designation_tbl USING(designationID)`,
				`employeeID, employeeFirstname, employeeLastname,employeeCode, employeeProfile,designationName,departmentName`,
				`FIND_IN_SET(employeeID, "${membersID}")`
			).map(member => {
				const { 
					employeeID, 
                    employeeCode,
					employeeFirstname, 
					employeeLastname, 
					employeeProfile = "default.jpg",
                    designationName,
                    departmentName
				} = member;
				return {
					id: employeeID,
                    employeeCode: `${employeeCode}`,
                    designationName: `${designationName}`,
                    departmentName: `${departmentName}`,
					fullname: `${employeeFirstname} ${employeeLastname}`,
					image:    `${base_url}/assets/upload-files/profile-images/${employeeProfile}`
				}
			});
            
	
			$("#btnBack").attr("timelineBuilderID", encryptString(timelineBuilderID));
			$("#btnBack").attr("status", timelineManagementStatus);
	
			const disabled = readOnly ? "disabled" : "";
	
			// let button = !disabled ? formButtons(data) : "";

            // console.log(phases)
	
			let phaseHTML = "";
			phases.map((phase, index) => {
				phaseHTML += displayPhase(teamMembers, phase, index, disabled,data);
			})
	
			html += `
			<div class="">
				<div class="text-primary font-weight-bold mb-2" style="font-size: 1.5rem;">
					<span>${projectName}
                    <br>
                    <small>${projectCategory}</small>
                    </span>
					<span class="text-danger font-weight-bold mb-1 float-right" style="font-size: 1.5rem;">${projectCode}</span>
				</div>
				<div>
					${phaseHTML}
				</div>
			
			</div>`;

		}else{
            html = `
			<div class="w-100 text-center mb-5 mt-4">
				<img src="${base_url}assets/modal/please-select.gif"
					style="max-width: 300px;
					width: auto;
					min-width: 100px;
					height: auto;"
					alt="No Asset Records Found.">
				<div class="h4">Please Select Project.</div>
			</div>`

			// html += `<div class="row text-center mt-4 p-4">
			//  			<div class="col"><h2 class="font-weight-bold">Please Select Project...</h2>
			//  			</div>
			//  			</div>`;
		}

        

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            updateTables();
            initAll();
            multipleSelect2Placeholder();
            inputmaskHours();

            $(".priorityBadge").each(function() {
             $(this).trigger("change");
            })

            $(".criticalBadge").each(function() {
               $(this).trigger("change");
            })

            $(".statusBadge").each(function() {
                $(this).trigger("change");
            })

            $(".subTaskEndDates, .TaskEndDates").each(function() {
                var id = $(this).attr("id");
                // var dateVal = $(this).attr("id");
                var dateVal = $(this).val();
                subTaskDateFormat(id,moment(dateVal).format("YYYY-MM-DD"));
            })
            $(`[name=TaskEndDates]`).addClass("btnSubmit");
          
         
            $(`[name=taskPriority]`).addClass("btnSubmit");
            $(`[name=taskSeverity]`).addClass("btnSubmit");
            $(`[name=taskStatus]`).addClass("btnSubmit");

            $(`[name=subTaskEndDates]`).addClass("btnSubTaskSubmit");

            $(`[name=subTaskPriority]`).addClass("btnSubTaskSubmit");
            $(`[name=subTaskSeverity]`).addClass("btnSubTaskSubmit");
            $(`[name=subTaskStatus]`).addClass("btnSubTaskSubmit");

            $(`[name="assignEmployee"]`).each(function() {
                $assignedEmployee = $(this).attr("subTaskAssignee");
                const assignedEmployeeArr = $assignedEmployee?.split("|");
                $assignedEmployee && $(this).val(assignedEmployeeArr).trigger("change");
            })

            generateProjectData();
        }, 200);
      
    }
    // ----- END FORM CONTENT -----

    // ----- MODAL CONTENT -----
    function modalContent(data = false) {

        const {
            modalHeader,
            subtaskboardID,
            taskHeaderID,
            taskAssignee,
            subtaskAssignee,
            modalTeamMembers,
            modalSeverity,
            modalDescription,
            modalStatus,
            modalPriority,
            modalManHours,
            modaldueDate,
            modalActualEndDate,
            modalNotes,
            extension,
            modalCreatedAt,
            employees

          
        } = data && data[0];


        var condition = "";
        if(taskHeaderID != 0 ){
            condition = "taskBoardID="+taskHeaderID;
        }else{
            condition = "subtaskboardID="+subtaskboardID;
        }

        const modalListImage = getTableData("pms_image_taskboard_tbl",'',condition);
        const logData = getTableData("pms_employeetaskboard_log_tbl",'',condition);
     
            let html = `
            <div class="modal-header">
               
                    <div class="col-6">
                        <div class="row">
                            <div class="col-4">
                                <small>PRIORITY STATUS: </small>
                                <select class="badge modalPriorityBadge form-control show-thin text-center" style="height: auto !important;-webkit-appearance: none;
                                margin-top:10px;-moz-appearance: none;" disabled>
                                    <option value="">---</option>
                                    <option class="badge badge-danger" value="1" ${modalPriority == 1 ? "selected" : ""}><span class="text-center">Urgent</span></option>
                                    <option class="badge badge-warning" value="2" ${modalPriority == 2 ? "selected" : ""}><span class="text-center">High</span></option>
                                    <option class="badge badge-info" value="3" ${modalPriority == 3 ? "selected" : ""}><span class="text-center">Normal</span></option>
                                    <option class="badge badge-primary" value="4" ${modalPriority == 4 ? "selected" : ""}><span class="text-center">Low</span></option>
                                </select>
                            </div>
                            <div class="col-8 border-left">
                            <small>ASSIGNEE: </small><br>`;

                            if(taskHeaderID != 0 ){
                                
                            }
                            if(subtaskboardID !=0){
                                html +=`<span class="avatar" style="margin-left: 25px;">`;
                              
                                var loop =0;
                                    modalTeamMembers.map((employee,index) => {
 
                                        const { id, fullname, image } = employee;

                                        var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                                        if(lastIndex.toLowerCase() == "null"){
                                            image = image.replace("null","default.png");
                                        }
                                       
                                        if(id == subtaskAssignee[loop] ){
                                            if (index <= 5) {
                                                html += `
                                                <span class="avatar"><img src="${image}" 
                                                width="45" height="45"
                                                title="${fullname}"></span>`;
                                            }
                                            // if (index == 6) {
                                            //     html += `
                                            //     <span class="font-weight-bolder"
                                            //     style="position: absolute;
                                            //         top: 0;
                                            //         margin-left: 15px;
                                            //         margin-top: 25px;
                                            //         font-size: 1.5rem;">+${members.length - 6}<span>`;
                                            // }
                                            loop++;
                                        }
        
                                    })

                                
                                
                                    html +=`</span>`;
                               
                            }else{
                                html +=`<span class="avatar" style="margin-left: 25px;">`;

                                taskAssignee.map((employee, index) => {
                                    const { id, fullname, image } = employee;

                                    var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                                    if(lastIndex.toLowerCase() == "null"){
                                        image = image.replace("null","default.png");
                                    }

                                    if (index <= 5) {
                                        html += `
                                        <span class="avatar"><img src="${image}" 
                                        width="45" height="45"
                                        title="${fullname}"></span>`;
                                    }
                                    if (index == 6) {
                                        html += `
                                        <span class="font-weight-bolder"
                                        style="position: absolute;
                                            top: 0;
                                            margin-left: 15px;
                                            margin-top: 25px;
                                            font-size: 1.5rem;">+${members.length - 6}<span>`;
                                    }
                                })

                                html +=`</span>`;
                            }

                           

                    html +=`</div>
                        </div>
                    </div>
                    <div class="col-6 border-left">
                        <div class="row">
                            <div class="col-4">
                                <div class="form-group">
                                <small> CREATED: </small><br>
                                <span class="ml-1 mt-3">${modalCreatedAt}</span>                                
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-group">
                                <small> TIME TRACKED: </small><br>
                                <span class="ml-1">${modaldueDate}</span>                                
                                </div>
                                    
                            </div> 
                            <div class="col-4">
                                <div class="form-group">
                                <small> DUE DATE: </small><br>
                                <span class="ml-1">${modaldueDate}</span>                                
                                </div>
                                 
                            </div>
                        </div> 
                    </div>
              
            </div>
            <div class="modal-body">
                
                <div class="row">
                    <div class="col-6 modalContentLeft" id="modalContentLeft">
                      

                        <div class="form-group my-1 mb-3">
                        <span>Description:</span>
                            <textarea rows="5"  class="form-control"
                                style="width: 100%;background-color:#F8F8F8;" 
                                disabled>${modalDescription}
                            </textarea>
                        </div>

                        <table class="table table-bordered ">
                            <tbody>
                                <tr>
                                    <td style="width:40%;"> <i class="far ml-4 fa-bookmark"></i>&nbsp;<span class=" ml-4 font-weight-bold">SEVERITY</span></td>
                                    <td><select class="badge  modalCriticalBadge form-control show-tick text-left" style="width:50%;height: auto !important;-webkit-appearance: none;
                                    -moz-appearance: none;" disabled>
                                    <option value="">---</option>
                                    <option class="badge badge-danger" value="1" ${modalSeverity == 1 ? "selected" : ""}><span class="text-center">CRITICAL</span></option>
                                    <option class="badge badge-warning" value="2" ${modalSeverity == 2 ? "selected" : ""}><span class="text-center">MAJOR</span></option>
                                    <option class="badge badge-info" value="3" ${modalSeverity == 3 ? "selected" : ""}><span class="text-center">MINOR</span></option>
                                    <option class="badge badge-primary" value="4" ${modalSeverity == 4 ? "selected" : ""}><span class="text-center">TRIVIAL</span></option>
                                    <option class="badge badge-success" value="5" ${modalSeverity == 5 ? "selected" : ""}><span class="text-center">SUGGESTION</span></option>
                                    <option class="badge badge-outline-primary" value="6" ${modalSeverity == 6 ? "selected" : ""}><span class="text-center">WITHDRAWN</span></option>
                                </select></td>
                                </tr>

                                <tr>
                                    <td style="width:40%;"><i class="far ml-4 fa-bookmark"></i>&nbsp; <span class="ml-4 font-weight-bold">STATUS</span></td>
                                    <td> <select class="badge  modalStatusBadge form-control show-tick text-center"  style="width:50%;height: auto !important;-webkit-appearance: none;
                                    -moz-appearance: none;" disabled>
                                    <option value="">---</option>
                                    <option class="badge badge-primary" value="1" ${modalStatus == 1 ? "selected" : ""}><span class="text-center">ON HOLD DEVELOPMENT</span></option>
                                    <option class="badge badge-info" value="2" ${modalStatus == 2 ? "selected" : ""}><span class="text-center">ON DEVELOPMENT</span></option>
                                    <option class="badge badge-warning" value="3" ${modalStatus == 3 ? "selected" : ""}><span class="text-center">FOR TESTING</span></option>
                                    <option class="badge badge-outline-secondary" value="4" ${modalStatus == 4 ? "selected" : ""}><span class="text-center">ON HOLD TESTING</span></option>
                                    <option class="badge badge-outline-warning" value="5" ${modalStatus == 5 ? "selected" : ""}><span class="text-center">ON TESTING</span></option>
                                    <option class="badge badge badge-danger" value="6" ${modalStatus == 6 ? "selected" : ""}><span class="text-center">FAILED</span></option>
                                    <option class="badge badge-success" value="7" ${modalStatus == 7 ? "selected" : ""}><span class="text-center">PASSED</span></option>
                                </select></td>
                                </tr>

                                <tr>
                                    <td style="width:40%;"><i class="far ml-4 fa-calendar-alt"></i>&nbsp; <span class="ml-4 font-weight-bold">Actual End Date</span></td>
                                    <td>${modalActualEndDate}</td>
                                </tr>

                                <tr>
                                    <td style="width:40%;"><i class="far ml-4 fa-calendar-alt"></i>&nbsp; <span class="ml-4 font-weight-bold">Extension</span></td>
                                    <td>
                                        <div class="form-group my-1">
                                            <input type="text" class="form-control text-left updateExtension"
                                            name="modalExtension"
                                            id="modalExtension"
                                            taskBoardID="${taskHeaderID}"
                                            subtaskboardID="${subtaskboardID}"
                                            value="${extension}"  >
                                        </div>
                                        </td>
                                </tr>

                                <tr>
                                    <td style="width:40%;"><i class="fas ml-4 fa-hourglass"></i>&nbsp; <span class="ml-4 font-weight-bold">Man Hours</span></td>
                                    <td>${modalManHours}</td>
                                </tr>

                                <tr>
                                    <td style="width:40%;"><i class="far ml-4 fa-sticky-note"></i>&nbsp;  <span class="ml-4 font-weight-bold">Notes</span></td>
                                    <td>${modalNotes}</td>
                                </tr>
                                
                            </tbody>
                        </table>

                        <table class="table table-bordered ">
                            <thead>
                                <tr>
                                    <td>Attachement</td>
                                    <td>Comment</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody id="imgContent">`;
                            modalListImage.map((image,index) => {
                                const { 
                                    imageID , 
                                    imageName, 
                                    imageComment, 
                                    subtaskboardID 
                                } = image;

                                html +=`
                                <tr>
                                    <td>
                                        <div class="container pop_modal">
                                            <img src="../assets/upload-files/taskboard-images/${imageName}" id="img${index}" imageSrc="${imageName}" class="img image img-responsive" height="120px" width="120px">
                                            <div class="overlay">
                                                <a href="#" class="icon" title="User Profile">
                                                <i class="fa fa-eye"></i>
                                                </a>
                                            </div>
                                        </div>               
                                    </td>
                                    <td>
                                     <textarea 
                                        class="form-control mt-3 validate updateImgComment" 
                                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                                        minlength="2" 
                                        maxlength="325" 
                                        name="imgDescription"
                                        id="imgDescripiton${index}"
                                        imageID ="${imageID}"
                                        rows="3" 
                                        style="width: 100%;">${imageComment || "Comment for this picture..."}</textarea>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn btn-danger delete_image" title="Delete"><i class="fas fa-trash-alt" ></i></button>
                                    </td>
                                </tr>`;
                               
                            });

                        html +=`</tbody>
                        </table>
                    
                    </div>

                    <div class="col-6 log-content border-left overflow-auto" style="background-color:#F8F8F8;max-height: 500px;-ms-overflow-style: none;scrollbar-width: none;">`;
                        
                        logData.map((logs,index) => {
                        const { 
                            object_label, 
                            object_value, 
                            action, 
                            createdBy,
                            createdAt 
                        } = logs;

                            var priority = ['URGENT','HIGH','NORMAL','LOW'];
                            var severity = ['CRITICAL','MAJOR','MINOR','TRIVIAL','SUGGESTION','WITHDRAWN'];
                            var status = ['ON HOLD DEVELOPMENT','ON DEVELOPMENT','FOR TESTING','ON HOLD TESTING','ON TESTING','FAILED','PASSED'];
                            var value= '';
                            if(object_label === 'priority'){
                              value =  priority[object_value-1];
                            }
                            if(object_label === 'severity'){
                                value =  severity[object_value-1];
                            }
                            if(object_label === 'status'){
                                value =  status[object_value-1];
                            }if(object_label ==='actual end date'){
                                value = moment(object_value).format('MMMM DD, YYYY');
                            }   
                            if(object_label ==='assigned'){
                                var extract = object_value.split("|");

                                for(var loop =0;loop<extract.length;loop++){
                                    if(loop == extract.length-1){
                                        if(extract.length == 1){
                                            value += employeeFullname(extract[loop]);
                                        }else{
                                            value += "and "+employeeFullname(extract[loop]);
                                        }
                                    }else{
                                        value += employeeFullname(extract[loop])+", ";
                                    }
                                }
                            }   

                            if(object_label === 'description' || 
                                object_label === 'man hours' ||  
                                object_label === 'used hours' ||
                                object_label === 'notes'||
                                object_label === 'comment'){
                                value= object_value;
                            }
                            var attchedLog = "";

                            if(object_label ==="attachment"){
                                    attchedLog = action +" new "+object_label;
                            }if(object_label ==="attachment row"){
                                attchedLog = action +" "+object_label;
                            }
                            else{
                                attchedLog = action +" the "+object_label +" to "+ value;
                            }

                            html+=`
                            <div class="row mt-3">
                                <div class="col-8">
                                    <small><span><b>${employeeFullname(createdBy)+":</b> "+ attchedLog}</span></small>
                                </div>
                                <div class="col-4 text-right">
                                    <small><span>${moment(createdAt).format('MMMM DD, YYYY')} at ${moment(createdAt).format('h:mm:ss a')}</span></small>
                                </div>
                            </div>`;
                        })
                           
                   html +=`
                    </div>
                </div>
              
            </div>
    
        <div class="modal-footer">
            <div id="drop_file" subtaskboardID="${subtaskboardID}" taskBoardID="${taskHeaderID}" style="display:flex;margin:auto;">
            <i class="fas fa-cloud-upload-alt fa-2x "></i>&nbsp;<span class="mt-1">Drop files here to attach or </span> 
            &nbsp;
            <label id="proxy_label" for="file_input_id" class="mt-1 font-italic">browse</label>
            <input type="file" id="file_input_id" subtaskboardID="${subtaskboardID}" taskBoardID="${taskHeaderID}"  accept="image/png, image/jpg, image/jpeg" multiple >
            </div>
           
        </div>`;
        
            
        setTimeout(() => {
            $("#modal_employee_taskboard_board_content").html(html);      
            
            $(".modalPriorityBadge").each(function() {
                $(this).trigger("change");
            })

            $(".modalCriticalBadge").each(function() {
                $(this).trigger("change");
            })

            $(".modalStatusBadge").each(function() {
                $(this).trigger("change");
            })
            subTaskDateFormat("modalExtension",moment(extension).format("YYYY-MM-DD")); // sme as trigger change in date
        }, 100);
    } 
        // ----- END MODAL CONTENT -----
    

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        if ($(`#page_content .loader`).text().length == 0) {
            $("#page_content").html(preloader);
        }
        if (!isForm) {
            preventRefresh(false);
            // timelineContent();
            formContent(data, readOnly);
            updateURL();
        } else {
            formContent(data, readOnly);
        }
    }
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----

		 // ----- TIMELINE SIDEBAR CONTENT ------
		 function timelineSidebarContent() {
            var sidebarhtml = '';
            var counter1 =0,counter2=0;
			const getProjectData  = getTableData(
				`
                pms_timeline_builder_tbl AS ptbt
				LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
                LEFT JOIN pms_management_board_tbl AS pmb ON pmb.timelineBuilderID = ptbt.timelineBuilderID `,
				`DISTINCT pplt.projectListName AS projectName,ptbt.timelineBuilderID,ptbt.timelineTeamMember`,
				`ptbt.timelineBuilderStatus =2  AND pmb.managementBoardStatus = 2 AND FIND_IN_SET(${sessionID},replace(ptbt.timelineTeamMember,'|',','))`);
	
                // console.log(sessionID)
	
				getProjectData.map((project,index1) => {
	
				const { 
					timelineBuilderID     = 0,
					projectName           = "",
				} = project;
	
				const getProjectPhaseData  = getTableData(
					`pms_timeline_task_list_tbl as pttl
					LEFT JOIN pms_milestone_builder_tbl AS pmb ON pmb.milestoneBuilderID  = pttl.milestoneBuilderID `,
					`
					DISTINCT pmb.phaseDescription AS phaseName,
                    pmb.phaseCode,
					pttl.timelineBuilderID,
					pmb.milestoneBuilderID
					`,`pttl.timelineBuilderID = ${timelineBuilderID}`,
					`pmb.phaseDescription`);
	
				sidebarhtml += `<div class="row">
									<div class="col-md-12">
										<div id="MainMenu">
											<div class="list-group panel mb-2 ">
												<a class="list-group-item list-group-item-danger " style="cursor:pointer;"  
													><i type="button" href="#project${counter1}" data-toggle="collapse" data-parent="#MainMenu" class="fa fa-caret-down"></i>
													&nbsp; <small class="btnSelectedProject" timelineBuilderID="${encryptString(timelineBuilderID)}">${projectName}</small></a>`;
	
													getProjectPhaseData.map((phase,index2) => {
	
														const { 
															timelineBuilderID     = 0,
															milestoneBuilderID = 0,
															phaseName           = "",
                                                            phaseCode=""
														} = phase;
	
	
												sidebarhtml +=`<div class="collapse" id="project${counter1}">
															
																			<a class="list-group-item" style="cursor:pointer;" >
																				<i type="button" href="#phaseProject${counter2}" data-toggle="collapse"
																				data-parent="#phaseProject${counter2}" class="fa fa-caret-down"></i> &nbsp; <small class="btnSelectedProject" timelineBuilderID="${encryptString(timelineBuilderID)}" phaseCode="${phaseCode}">${phaseName}</small> 
																				</a> 
																	
																		<div class="collapse list-group-submenu" id="phaseProject${counter2}">`;
	
																		const getProjectMilestoneData  = getTableData(
																			`pms_timeline_task_list_tbl as pttl
																			 LEFT JOIN pms_milestone_list_tbl AS pml ON pml.milestoneBuilderID = pttl.milestoneBuilderID  `,
																			`DISTINCT projectMilestoneName,
																			pttl.milestoneBuilderID
																			`,`pttl.milestoneBuilderID = ${milestoneBuilderID} `,
																			``);
	
																			getProjectMilestoneData.map((milestone,index3) => {
	
																			const { 
																				milestoneBuilderID = 0,
																				projectMilestoneName           = "",
																			} = milestone;

                                                                            // console.log(getProjectMilestoneData)
	
														sidebarhtml +=`<a href="#" class="list-group-item" data-parent="#phaseProject${counter2}" style="cursor:pointer;"><i
																					class="fa fa-circle"></i> &nbsp; <small class="btnSelectedProject" timelineBuilderID="${encryptString(timelineBuilderID)}" phaseCode="${phaseCode}" projectMilestoneName="${projectMilestoneName}">${projectMilestoneName} </small></a>`;
																		})
														sidebarhtml +=`</div>
																</div>`;
                                                                counter2++;
													})
                                                    counter1++;
							sidebarhtml +=`</div>
										</div>
									</div>
								</div>`;
			})

			setTimeout(() => {
				$("#page_sidebar").html(sidebarhtml);
				// initDatatables();
			}, 250);
	
			return sidebarhtml;
		}
		// ----- END SIDEBAR CONTENT ------
		timelineSidebarContent();

    $(document).on("click", "#btnAddRow", function(){
        var taskID = $(this).attr("taskID");
        var attachedUniqueID = $(this).attr("attachedUniqueID");
        var taskName = $(this).attr("taskName");
        var timelineBuilderID = $(this).attr("timelineBuilderID");
        var projectMilestoneID = $(this).attr("projectMilestoneID");
        var milestoneBuilderID = $(this).attr("milestoneBuilderID");
        var milestoneID = $(this).attr("milestoneID");
        var milestoneName = $(this).attr("milestoneName");
        var phaseCode = $(this).attr("phaseCode");
        var taskBoardID = $(this).attr("taskBoardID");
        var taskStartDate = $(this).attr("startDate");
        var taskEndDate = $(this).attr("endDate");
        var manHours = $(this).attr("manHours");
        var subTableID = $(this).attr("subTableID");
        var employees=$(this).attr("employees");
        var subTask = JSON.parse($(this).attr("subtask"));
        var teamMembers = JSON.parse($(this).attr("teamMembers"));
        // console.log(teamMembers)
        
        var subTableLength = $("#"+subTableID).find("tbody tr").length +1;

        // ----------------------------GET ASSIGNEE---------------------//
        const getLastSubtask = getTableData("information_schema.TABLES"," AUTO_INCREMENT","TABLE_SCHEMA = 'erpdb' AND TABLE_NAME = 'pms_employeetaskoard_details_tbl'");
        var subtaskboardID ="";
        //  NOTE : THERE IS A PROBLEM IN THE LAST WHEN IT IS NOT ARRANGED BY NUMBER//
        if(getLastSubtask.length != 0){
        	subtaskboardID = parseFloat(getLastSubtask[0].AUTO_INCREMENT);
        }else{
        	subtaskboardID = 1;
        	
        }
        // subtaskboardID = parseFloat(getLastSubtask[0].subtaskboardID) +1;
        // console.log(subtaskboardID)
        const getAssigneeList = (subtaskboardID = null, subTask=[],teamMembers = {},taskID,taskName,timelineBuilderID,projectMilestoneID,milestoneID,milestoneName,phaseCode ) => { 
            let taskAssignedByContent = "";
            let taskAssigneeContent = "";
          
            const subTaskData = (subtaskboardID = null) => {
                let data = subTask.filter(st => st.subtaskboardID == subtaskboardID);
                let subTaskAssignee = "",createdBy="";
                if (data && data.length > 0) {
                   
                    // taskBoardID = data[0]?.taskBoardID;
                    subTaskAssignee = data[0]?.subTaskAssignee;
                    createdBy = data[0]?.createdBy;
                   
                }
                return {/*taskBoardID,*/subTaskAssignee,createdBy};
            };
            

            // milestones.map(milestone => {
                // const { milestoneID, milestoneName } = milestone;
                const {subTaskAssignee,createdBy } = subTaskData(subtaskboardID);
               

    
                const teamMemberOptions = teamMembers.map(member => {
                    const { id, fullname, image ,designationName, departmentName, employeeCode } = member;
                    
                    return `
                    <option 
                        value    = "${id}"
                        fullname = "${fullname}"
                        designationName = "${designationName}"
                        departmentName = "${departmentName}"
                        employeeCode = "${employeeCode}"
                        taskID = "${taskID}"
                        taskName = "${taskName}"
                        timelineBuilderID = "${timelineBuilderID}"
                        projectMilestoneID = "${projectMilestoneID}"
                        milestoneID = "${milestoneID}"
                        milestoneName = "${milestoneName}"
                        employeeID = "${id}"
                        phase = "${phaseCode}"
                        image    = "${image}">${fullname}</option>`;
                }).join("");

                taskAssigneeContent += `
                <div class="form-group my-1">
                    <select class="form-control validate select2"
                        name="assignEmployee"
                        multiple="multiple"
                        asd
                        taskBoardID="${taskBoardID}"
                        subtaskboardID="${subtaskboardID}"
                        subTaskAssignee="${subTaskAssignee}"
                        label="assigned"
                        >
                        <option disabled>Select Employee</option>
                        ${teamMemberOptions}
                    </select>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
            // })


            taskAssignedByContent += `<span class="avatar">`;
                                        
            teamMembers.filter(employee => employee.id == sessionID).map((employee, index) => {
                const { id, fullname, image ,designationName, departmentName, employeeCode } = employee;

                var lastIndex  = image.substring(image.lastIndexOf("/") + 1, image.length);
                if(lastIndex.toLowerCase() == "null"){
                    image = image.replace("null","default.png");
                }


                if (index <= 5) {
                    taskAssignedByContent += `
                    
                    <span class="avatar">
                    <img 
                    class=""
                    src="${image}" 
                    width="45" 
                    height="45"
                    title="${fullname}"
                    style="margin: auto;">
                   
                    </span>`;
                }
               
              
            })
                
            taskAssignedByContent += `</span>`;

            return [taskAssignedByContent,taskAssigneeContent];
        }
        // ----------------------------GET ASSIGNEE---------------------//
     
        const getAssignee = getAssigneeList(subtaskboardID,subTask,teamMembers,taskID,taskName,timelineBuilderID,projectMilestoneID,milestoneID,milestoneName,phaseCode);

        let html = `<tr>
            <td class="text-nowrap">
                <div class="form-group my-1">
                <button type="button" class="btn btn-danger btn-sm delete_subtask" title="Delete"><i class="fas fa-trash-alt" ></i></button>
                &nbsp;
                    <span
                    class="btnModal"
                    taskID="${taskID}"
                    timelineBuilderID="${timelineBuilderID}"
                    projectMilestoneID="${projectMilestoneID}"
                    milestoneBuilderID="${milestoneBuilderID}"
                    taskBoardID="${taskBoardID}"
                    subtaskboardID=""
                    label="assigned"
                    employees='${JSON.stringify(teamMembers)}'
                     name="subtaskName"><small>TSK-${generateSubtaskCode(taskName.toUpperCase().replaceAll(" ",""),subTableLength ) }</small></span>
                </div>
            </td>

            <td>
            <div class="d-flex align-items-center justify-content-start " 
                taskID="${taskID}"
                    taskName = ""
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <div class="" 
                        taskName="" 
                        taskID="${taskID}"
                        taskBoardID="${taskBoardID}"
                        subtaskboardID=""
                        createdBy=""
                        display="false"
                        style="position: relative;
                            top: 0;
                            white-space: nowrap;
                        ">
                        ${getAssignee[0]}
                    </div>
                </div>
            </td>

           
            <td>
            <div class="d-flex align-items-center justify-content-start " 
                taskID="${taskID}"
                    taskName = ""
                    style="
                        min-height: 70px;
                        height: auto;
                        max-height: 70px;
                        padding: 1rem;
                        top: 0">
                    <div class="btnAssignee assignedMembers" 
                        taskName="" 
                        taskID="${taskID}"
                        taskBoardID="${taskBoardID}"
                        subtaskboardID=""
                        display="false"
                        style="position: relative;
                            top: 0;
                            white-space: nowrap;
                            cursor:pointer;
                           ">
                            <i class="fas fa-user-plus fa-lg" title="Set Assignee" style=" border: 1px dashed black;
                            border-radius: 55px;
                            padding: 15px 10px;"></i>
                    </div>
                        <div class=" d-none dropdown-content  assigneeContent"
                        taskBoardID="${taskBoardID}"
                        subtaskboardID=""
                        >
                        ${getAssignee[1]}
                        </div>
                </div>
            </td>

            <td style="width:25%;">
                <div class="form-group my-1">
                    <textarea 
                        class="form-control description validate btnSubTaskSubmit" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="subTaskDescription" 
                        label="description" 
                        id="subTaskDescription" 
                        required="" 
                        rows="2" 
                        style="width: 100%;"></textarea>
                </div>
            </td>
            <td class="text-center"
                <div class="form-group my-1">
                    <input class="form-control manHours input-hours text-center subTaskManHours btnSubTaskSubmit"
                        name="subTaskManHours"
                        id="subTaskManHours"
                        value="${manHours}"
                        >
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control input-hours text-center subTaskUsedHours btnSubTaskSubmit"
                        name="subTaskUsedHours"
                        id="subTaskUsedHours"
                        >
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control  text-center"
                        name="subTaskStartDates"
                        id="subTaskStartDates${attachedUniqueID+""+subTableLength}"
                        value="${taskStartDate}" 
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        disabled>
                </div>
            </td>
            <td class="text-center">
                <div class="form-group my-1">
                    <input class="form-control  text-center subTaskEndDates"
                        name="subTaskEndDates"
                        id="subTaskEndDates${attachedUniqueID+""+subTableLength}"
                        value="${taskEndDate}" 
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}">
                </div>
            </td>
            <td style="width:8%;">
                <div class="row clearfix">
                    <div class="form-group my-1 mr-1" style="width:100%;">
                        <small><select class="badge  priorityBadge form-control show-thin text-center" name="subTaskPriority">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1"><span class="text-center">Urgent</span></option>
                            <option class="badge badge-warning" value="2"><span class="text-center">High</span></option>
                            <option class="badge badge-info" value="3"><span class="text-center">Normal</span></option>
                            <option class="badge badge-primary" value="4"><span class="text-center">Low</span></option>
                        </select></small>
                    </div>
                </div>
            </td>
            <td style="width:13%;">
                <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                        <select class="badge  criticalBadge form-control show-tick text-center" name="subTaskSeverity">
                            <option value="">---</option>
                            <option class="badge badge-danger" value="1"><span class="text-center">CRITICAL</span></option>
                            <option class="badge badge-warning" value="2"><span class="text-center">MAJOR</span></option>
                            <option class="badge badge-info" value="3"><span class="text-center">MINOR</span></option>
                            <option class="badge badge-primary" value="4"><span class="text-center">TRIVIAL</span></option>
                            <option class="badge badge-success" value="5"><span class="text-center">SUGGESTION</span></option>
                            <option class="badge badge-outline-primary" value="6"><span class="text-center">WITHDRAWN</span></option>
                        </select>
                    </div>
                </div>
            </td>
            <td class="text-center"
            <div class="form-group my-1">
                <input class="form-control text-center"
                    name="subTaskTimeLeft"
                    id="subTaskTimeLeft"
                
                        basis    = "true"
                        taskID="${taskID}"
                        taskName = "${taskName}"
                        disabled>
            </div>
            </td>
            <td style="width:25%;">
                <div class="row clearfix">
                    <div class="form-group my-1 ml-1" style="width:100%;">
                        <select class="badge  statusBadge form-control show-tick text-center"  name="subTaskStatus">
                            <option value="">---</option>
                            <option class="badge badge-primary" value="1"><span class="text-center">ON HOLD DEVELOPMENT</span></option>
                            <option class="badge badge-info" value="2"><span class="text-center">ON DEVELOPMENT</span></option>
                            <option class="badge badge-warning" value="3"><span class="text-center">FOR TESTING</span></option>
                            <option class="badge badge-outline-secondary" value="4"><span class="text-center">ON HOLD TESTING</span></option>
                            <option class="badge badge-outline-warning" value="5"><span class="text-center">ON TESTING</span></option>
                            <option class="badge badge badge-danger" value="6"><span class="text-center">FAILED</span></option>
                            <option class="badge badge-success" value="7"><span class="text-center">PASSED</span></option>
                            <option class="badge badge-outline-primary" value="8">TODO</option>
                            <option class="badge badge-outline-info" value="9">PENDING</option>
                        </select>
                    </div>
                </div>
            </td>
            <td style="width:25%;">
                <div class="form-group my-1">
                    <textarea 
                        class="form-control notes validate btnSubTaskSubmit" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="subTaskNotes" 
                        label="notes" 
                        id="subTaskNotes" 
                        required="" 
                        rows="2" 
                        style="width: 100%;"></textarea>
                </div>
            </td>`;

            Swal.fire({
                title: 'ADD SUBTASK',
            text: "Are you sure to add this subtask?",
                imageUrl: `${base_url}assets/modal/add.svg`,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#1A1A1A',
                confirmButtonText: 'Add',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
    
                    $("#"+subTableID).append(html);  
                    // updateTableRows();
                    initAll();
                    inputmaskHours();
                    subTaskDateFormat("subTaskEndDates"+attachedUniqueID+""+subTableLength); // sme as trigger change in date
                    $("#"+subTableID+" > tbody").find("tr:last-child").addClass("btnSubTaskSubmit").trigger("change");
                    // $("#subTaskStartDates"+attachedUniqueID+""+subTableLength).addClass("btnSubTaskSubmit");
                    $("#subTaskEndDates"+attachedUniqueID+""+subTableLength).addClass("btnSubTaskSubmit");

                    $parent =   $("#"+subTableID+" > tbody tr:last-child");

                        var dueDate = $parent.find("td [name=subTaskStartDates]").val();
                        var status = $parent.find("td [name=taskStatus]").val();
                 
                        var now = moment();
                        var then = moment(dueDate);
            
                        var beforeDueDate = moment().diff(dueDate, 'days');
            
                        if (now > then && (status != 7 && status != 1)) {
            
                           $parent.find("td [name=subTaskStartDates]").css('background-color',"#dc3545");
                           $parent.find("td [name=subTaskStartDates]").css('color',"#fff");
                          
                          } else {
                            if( beforeDueDate == 5 || (beforeDueDate <5 && beforeDueDate !=1) ){
                               $parent.find("td [name=subTaskStartDates]").css('background-color',"#ffc107");
                               $parent.find("td [name=subTaskStartDates]").css('color',"#fff");
                            }else{
                                if(status != 7 ){
                                    $parent.find("td [name=subTaskStartDates]").css('background-color',"#dc3545");
                                    $parent.find("td [name=subTaskStartDates]").css('color',"#fff");
                                }
                            }
                          }
                   



                Swal.fire({
                    icon: 'success',
                    title: 'Subtask successfully added!',
                    showConfirmButton: false,
                    timer: 800
                  })
                }
            });
      
        
    });

    // -------------------INIZIALIZED DATE-----------------------//

    function subTaskDateFormat(endDate="",selectedDate=""){
        $('#'+endDate).daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoApply: true,
            setDate: selectedDate,
            // startDate: dateRangePickerStartDate,
            // endDate: dateRangePickerEndDate,
            locale: {
                format: 'MMMM DD, YYYY'
            },
        
        });
    }

    // -------------------INIZIALIZED DATE-----------------------//

     // ------------------SUBTASK ASSIGNEE-------------//
     $(document).on("click", ".btnAssignee", function() {
       let thisCondition = $(this).attr("condition");

       if(thisCondition == "employeeProfile"){
            // $(".employeeProfile",this).click();
            let isReadOnly        = $(this).attr("isReadOnly") == "true";
            let index             = $(this).attr("index");
            let taskBoardID = $(this).attr("taskBoardID");
            let subtaskboardID = $(this).attr("subtaskboardID");
            let timelineBuilderID = $(this).attr("timelineBuilderID");
            let projectMilestoneID = $(this).attr("projectMilestoneID");
            let milestoneID = $(this).attr("milestoneID");
            let milestoneName = $(this).attr("milestoneName");
            let phase             = $(this).attr("phase");
            let taskID            = $(this).attr("taskID");
            let taskName            = $(this).attr("taskName");
            let employeeID        = $(this).attr("employeeID");
            let fullname          = $(this).attr("fullname");
            let image             = $(this).attr("image");
            let employeeCode      = $(this).attr("employeeCode");
            let departmentName    = $(this).attr("departmentName");
            let designationName   = $(this).attr("designationName");
            let title =  "ASSIGNED MAN HOURS";
            let data = {
                isReadOnly,
                taskBoardID,
                subtaskboardID,
                timelineBuilderID,
                projectMilestoneID,
                milestoneID, 
                milestoneName   ,
                phase,
                taskID ,
                taskName ,
                employeeID,
                fullname,
                image ,
                employeeCode ,
                departmentName,
                designationName ,
                title
            }
            getEmployeeProfile(data,subtaskboardID, index);
       }else{
                $parent  = $(this).closest("tr");
                const listAssignee = $parent.find("[name=assignEmployee]").val();
                const label = $parent.find("[name=assignEmployee]").attr("label");
                // console.log($parent.find("[name=assignEmployee]").val())
                const taskBoardID = $(this).attr("taskBoardID");
                const subtaskboardID    = $(this).attr("subtaskboardID");
                const display  = $(this).attr("display") == "true";
                $(this).attr("display", !display);
                if (display) {
                    $parent.find(`.assigneeContent[taskBoardID="${taskBoardID}"][subtaskboardID="${subtaskboardID}"]`).slideUp(500, function() {
                        $(this).addClass("d-none");

                        if(listAssignee.length > 0){

                            var data = new FormData();

                        
                            data.append('listAssignee', listAssignee);
                            data.append('label', label);
                            data.append('subtaskboardID', subtaskboardID);

                            $.ajax({
                                url           :"Employee_taskboard/updateAssignee",
                                method        : "POST",
                                dataType      : 'text', // what to expect back from the server
                                cache         : false,
                                contentType   : false,
                                processData   : false,
                                data          : data,
                                async         : true,
                                dataType      : 'json',
                                success       : function(data){
            
                                },
                                error: function() {
                                    setTimeout(() => {
                                        // $("#loader").hide();
                                        showNotification("danger", "System error: Please contact the system administrator for assistance!");
                                    }, 500);
                                }
                                
                            });

                        }

                    });
                } else {
                    $parent.find(`.assigneeContent[taskBoardID="${taskBoardID}"][subtaskboardID="${subtaskboardID}"]`).hide().removeClass("d-none").slideDown(500);
                } 
       }
    })
     // ------------------END SUBTASK ASSIGNEE-------------//


    //  ------------------- ASSIGNEE EMPLOYEE STATUS ----------------------//
    $(document).on("change", "[name='employeeTaskStatus']", function() {
        var taskBoardID = +$(this).attr("taskBoardID") || 0;
        var subtaskboardID = +$(this).attr("subtaskboardID") || 0;
        var timelineBuilderID = $(this).attr("timelineBuilderID");
        var projectMilestoneID = $(this).attr("projectMilestoneID");
        var taskID = $(this).attr("taskID");
        var employeeID = $(this).attr("employeeID");
        var employeeTaskStatus = +$(this).val();


            var data = new FormData();

            data.append('taskBoardID', taskBoardID);
            data.append('subtaskboardID', subtaskboardID);
            data.append('timelineBuilderID', timelineBuilderID);
            data.append('projectMilestoneID', projectMilestoneID);
            data.append('taskID', taskID);
            data.append('employeeID', employeeID);
            data.append('employeeTaskStatus', employeeTaskStatus);
            data.append('sessionID', sessionID);

            $.ajax({
                url           :"Employee_taskboard/updateEmployeeTaskStatus",
                method        : "POST",
                dataType      : 'text', // what to expect back from the server
                cache         : false,
                contentType   : false,
                processData   : false,
                data          : data,
                async         : true,
                dataType      : 'json',
                success       : function(data){

                },
                error: function() {
                    setTimeout(() => {
                        // $("#loader").hide();
                        showNotification("danger", "System error: Please contact the system administrator for assistance!");
                    }, 500);
                }
                
            });
    })
    //  ----------------- END ASSIGNEE EMPLOYEE STATUS --------------------//

    // ------------------COMPUTE DIFFERENCE OF HOURS-------------//

    $(document).on("keyup", ".TaskManHours, .TaskUsedHours", function() {
        var manHours = parseFloat($(this).closest("tr").find("[name=TaskManHours]").val()) || 0;
        var usedHours = parseFloat($(this).closest("tr").find("[name=TaskUsedHours]").val()) || 0;
        var compute = 0;

        compute = manHours - usedHours ;
        

        $(this).closest("tr").find("[name=TaskTimeLeft]").val(compute.toFixed(2) || "0.00");
    })

    $(document).on("keyup", ".subTaskManHours, .subTaskUsedHours", function() {
        var manHours = parseFloat($(this).closest("tr").find("[name=subTaskManHours]").val()) || 0;
        var usedHours = parseFloat($(this).closest("tr").find("[name=subTaskUsedHours]").val()) || 0;
        var compute = 0;

        compute = manHours - usedHours ;
      

        $(this).closest("tr").find("[name=subTaskTimeLeft]").val(compute.toFixed(2) || "0.00");
    })
    // ------------------COMPUTE DIFFERENCE OF HOURS-------------//

    // ------------------ DELETE SUBTASK IN A ROW-----------------------------------// 
    $(document).on('click','.delete_subtask',function() {

        var subtaskboardID = $(this).closest("tr").find("td span").attr("subtaskboardID");
  

        Swal.fire({
            title: 'Delete',
        text: "Are you sure want to delete this row?",
            imageUrl: `${base_url}assets/modal/delete.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Delete',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {

                $(this).closest("tr").remove();

                var data = new FormData();

                data.append('subtaskboardID', subtaskboardID);

                $.ajax({
                    url           :"Employee_taskboard/deleteSubtaskContent",
                    method        : "POST",
                    dataType      : 'text', // what to expect back from the server
                    cache         : false,
                    contentType   : false,
                    processData   : false,
                    data          : data,
                    async         : true,
                    dataType      : 'json',
                    success       : function(data){
 
                    },
                    error: function() {
                        setTimeout(() => {
                            // $("#loader").hide();
                            showNotification("danger", "System error: Please contact the system administrator for assistance!");
                        }, 500);
                    }
                      
                  });

            Swal.fire({
                icon: 'success',
                title: 'Subtask successfully delete!',
                showConfirmButton: false,
                timer: 800
              })
            }
        });

        
    }
    )
    // ------------------ DELETE SUBTASK IN A ROW-----------------------------------// 


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const timelineBuilderID = decryptString($(this).attr("id"));
        setTimeout(() => {
            viewDocument(timelineBuilderID);
        }, 50);
    })

    $(document).on("click", ".btnModal", function() {
        var data =[];
        var taskAssignee ="";
        var modalTeamMembers ="";
        var modalHeader = $(this).text();
        var extension = moment($(this).attr("extension")).format("MMMM DD, YYYY");
        var taskHeaderID = $(this).attr("taskHeaderID") || 0;
        var subtaskboardID = $(this).attr("subtaskboardID") || 0;
        var modalCreatedAt = moment($(this).attr("createdAt")).format("MMMM DD, YYYY");
        var modalStatus = $(this).closest("tr").find("td .statusBadge").val();
        var modalSeverity = $(this).closest("tr").find("td .criticalBadge").val();
        var modalPriority = $(this).closest("tr").find("td .priorityBadge").val();
        var modalDescription = $(this).closest("tr").find("td .description").val();
        var modalManHours = $(this).closest("tr").find("td .manHours").val();
        var modaldueDate =  moment($(this).closest("tr").find("td .dueDate").val()).format("MMMM DD, YYYY");
        var modalActualEndDate = $(this).closest("tr").find("td .actualEndDate").val();
        var modalNotes = $(this).closest("tr").find("td .notes").val();
       
        //    console.log("taskHeaderID "+taskHeaderID)
        //    console.log("subtaskboardID "+subtaskboardID)
       

        if(taskHeaderID != 0){
           
        }
        if(subtaskboardID !=0){
            var subtaskAssignee = $(this).closest("tr").find("[name=assignEmployee]").val();
            modalTeamMembers = JSON.parse($(this).closest("tr").find("[name=subtaskName]").attr("employees"));
            // console.log(JSON.parse($(this).closest("tr").find("[name=subtaskName]").attr("employees")))
        }else{
            taskAssignee = JSON.parse($(this).closest("tr").find("[name=taskName]").attr("employees"));
        }

        let temp ={
            modalHeader,
            subtaskboardID,
            taskAssignee,
            subtaskAssignee,
            modalTeamMembers,
            taskHeaderID,
            modalStatus,
            modalSeverity,
            modalPriority,
            modalDescription,
            modalManHours,
            modaldueDate,
            modalActualEndDate,
            modalNotes,
            extension,
            modalCreatedAt
        };
        data.push(temp);

        
        $("#modal_employee_taskboard_board").modal("show");
        $("#modal_title").text(modalHeader);
        $("#modal_employee_taskboard_board_content").html(preloader);
        // const timelineBuilderID = decryptString($(this).attr("id"));
        setTimeout(() => {
            modalContent(data);
        }, 150);
    })

    $(document).on('change','.updateExtension',function() {
        var taskBoardID = $(this).attr("taskboardID")
        var subtaskboardID = $(this).attr("subtaskboardID")
        var extension =moment($(this).val()?.trim()).format("YYYY-MM-DD");
        // console.log(extension)

                var data = new FormData();

                data.append('extension', extension);
                data.append('taskBoardID', taskBoardID);
                data.append('subtaskboardID', subtaskboardID);

                $.ajax({
                    url           :"Employee_taskboard/updateExtension",
                    method        : "POST",
                    dataType      : 'text', // what to expect back from the server
                    cache         : false,
                    contentType   : false,
                    processData   : false,
                    data          : data,
                    async         : true,
                    dataType      : 'json',
                    success       : function(data){
 
                    },
                    error: function() {
                        setTimeout(() => {
                            // $("#loader").hide();
                            showNotification("danger", "System error: Please contact the system administrator for assistance!");
                        }, 500);
                    }
                      
                  });

          

        
    }
    )

    $(document).on('change','.updateImgComment',function() {
        var imageID = $(this).attr("imageID")
      
        var imageComment =$(this).val()?.trim();
    

                var data = new FormData();

                data.append('imageID', imageID);
                data.append('imageComment', imageComment);

                $.ajax({
                    url           :"Employee_taskboard/updateImgComment",
                    method        : "POST",
                    dataType      : 'text', // what to expect back from the server
                    cache         : false,
                    contentType   : false,
                    processData   : false,
                    data          : data,
                    async         : true,
                    dataType      : 'json',
                    success       : function(data){
 
                    },
                    error: function() {
                        setTimeout(() => {
                            // $("#loader").hide();
                            showNotification("danger", "System error: Please contact the system administrator for assistance!");
                        }, 500);
                    }
                      
                  });

          

        
    }
    )
    // ----- END CLICK TIMELINE ROW -----
    $(document).on('click','.pop_modal',function(e) {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    }
)

    $(document).on('click','.delete_image',function() {

        var imageSrc = $(this).closest("tr").find("img").attr("imageSrc");

        Swal.fire({
            title: 'Delete',
        text: "Are you sure want to delete?",
            imageUrl: `${base_url}assets/modal/delete.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Delete',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {

                $(this).closest("tr").remove();

                var data = new FormData();

                data.append('imageSrc', imageSrc);

                $.ajax({
                    url           :"Employee_taskboard/deleteImageContent",
                    method        : "POST",
                    dataType      : 'text', // what to expect back from the server
                    cache         : false,
                    contentType   : false,
                    processData   : false,
                    data          : data,
                    async         : true,
                    dataType      : 'json',
                    success       : function(data){
 
                    },
                    error: function() {
                        setTimeout(() => {
                            // $("#loader").hide();
                            showNotification("danger", "System error: Please contact the system administrator for assistance!");
                        }, 500);
                    }
                      
                  });

            Swal.fire({
                icon: 'success',
                title: 'Subtask successfully added!',
                showConfirmButton: false,
                timer: 800
              })
            }
        });

        
    }
    )

    $(document).on('dragover','#drop_file',function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    )
    $(document).on('dragenter','#drop_file',function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    )
    $(document).on('drop','#drop_file',function(e){
        var taskBoardID = $(this).attr("taskBoardID");
        var subtaskboardID = $(this).attr("subtaskboardID");
            if(e.originalEvent.dataTransfer){
                if(e.originalEvent.dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    /*UPLOAD FILES HERE*/
                    upload(e.originalEvent.dataTransfer.files,subtaskboardID,taskBoardID);
                }   
            }
        }
    );

    $(document).on('change','#file_input_id',function(e){
        var taskBoardID = $(this).attr("taskBoardID");
        var subtaskboardID = $(this).attr("subtaskboardID");
        upload(this.files,subtaskboardID,taskBoardID);        
    }
);

    function upload(files,subtaskboardID="",taskBoardID=""){
       
        var html ='';
        var fileLength = files.length;
        var unique = Date.now();
        var uploadImg =[];
        var uniqueArray =[];
        for(var loop=0; loop <fileLength;loop++){
            html +=`
            <tr>
                <td>
                <div class="container pop_modal">
                <img src="" id="img${loop+''+unique}" class="img image img-responsive" height="120px" width="120px">
                <div class="overlay">
                    <a href="#" class="icon" title="User Profile">
                    <i class="fa fa-eye"></i>
                    </a>
                </div>
                </div>
                                
                                
                </td>
                <td>
                    <textarea 
                        class="form-control mt-3  validate updateImgComment" 
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][?][!][/][;][:][-][_][()][%][&][*]"
                        minlength="2" 
                        maxlength="325" 
                        name="imgDescription"
                        label="comment"
                        id="imgDescripiton${loop+''+unique}"
                        rows="3" 
                        style="width: 100%;"
                        placeholder="Comment for this picture...">Comment for this picture...</textarea>
                </td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger delete_image" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
            uniqueArray[loop] = loop+''+unique;
        }
        $("#imgContent").append(html);

        for(var loop=0; loop <fileLength;loop++){
            var tmppath = URL.createObjectURL(files[loop]);
            $("#img"+uniqueArray[loop]).attr('src',tmppath);

            uploadImg[loop] = files[loop]; 
        }
        

        var form_data = new FormData();

            form_data.append('subtaskboardID', subtaskboardID);
            form_data.append('taskBoardID', taskBoardID);

        for( var count = 0; count<fileLength; count++){
            form_data.append('uploadImgArray['+count+']', uploadImg[count]);
         }
         
         $.ajax({
            url           :"Employee_taskboard/saveImageContent",
            method        : "POST",
            dataType      : 'text', // what to expect back from the server
            cache         : false,
            contentType   : false,
            processData   : false,
            data          : form_data,
            async         : true,
            dataType      : 'json',
            success       : function(data){

                for(var setnewName=0; setnewName <data.newImageName.length;setnewName++){
                  
                    $("#img"+uniqueArray[setnewName]).attr('imageSrc',data.newImageName[setnewName]);
                    $("#imgDescripiton"+uniqueArray[setnewName]).attr('imageID',data.data[setnewName]);
                }

            },
            error: function() {
                setTimeout(() => {
                    // $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
              
          });
       

       
    }


    // ----- CLICK BUTTON BACK -----
	// $(document).on("click", "#btnBack", function () {
    //     const id     = decryptString($(this).attr("timelineBuilderID"));
	// 	const status = $(this).attr("status");

	// 	if (status != "false" && status != 0 && status != 1) {
    //         $("#page_content").html(preloader);
    //         setTimeout(() => {
    //             pageContent();
    //         }, 50);

	// 	} else {
    //         saveProjectBoard("save", id, pageContent);
	// 	}
	// });
	// ----- END CLICK BUTTON BACK -----


    // ----- VALIDATE MAN HOURS -----
    function validateManHours(phase = "", taskName = "", elementID = null) {
        const checkManHours = (phase, taskName, elementID, all = false) => {
            const $parent = $(elementID).closest(".form-group");
            const basisManHours = getNonFormattedAmount($(`[phase="${phase}"][taskName="${taskName}"][basis="true"]`).val());

            let totalManHours = 0;
            $(`[name="manHours"][phase="${phase}"][taskName="${taskName}"]`).each(function() {
                const manHours = getNonFormattedAmount($(this).val()) || 0;
                totalManHours += manHours;
            })

            let condition = all ? 
                totalManHours != basisManHours : totalManHours > basisManHours;
            if (condition) {
                let msg = all ? "Insufficient amount of hours." : "Excessive amount of hours.";
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                $parent.find(".invalid-feedback").text(msg);
            } else {
                $(`[name="manHours"][phase="${phase}"][taskName="${taskName}"]`).each(function() {
                    const $myParent = $(this).closest(".form-group");
                    const id = "#"+$(this).attr("id");
                    $(id).removeClass("is-valid").removeClass("is-invalid");
                    $myParent.find(".invalid-feedback").text("");
                });
            }
        }

        if (phase && taskName && elementID) {
            checkManHours(phase, taskName, elementID)
        } else {
            $(`[name="manHours"]`).each(function() {
                const id       = "#"+$(this).attr("id");
                const phase    = $(this).attr("phase");
                const taskName = $(this).attr("taskName");
                checkManHours(phase, taskName, id, true);
            })
        }
    }
    // ----- END VALIDATE MAN HOURS -----


    // ----- VALIDATE ASSIGNEE -----
    function validateAssignee() {
        $(`[name="assignEmployee"]`).each(function() {
            $parent = $(this).closest(".form-group");
            const index    = $(this).attr("index");
            const phase    = $(this).attr("phase");
            const taskName = $(this).attr("taskName");
            const employeeIDArr = $(this).val();

            const manHours = getNonFormattedAmount($(`[name="manHours"][phase="${phase}"][taskName="${taskName}"][index="${index}"]`).val());
            if (manHours > 0 && employeeIDArr.length == 0) {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .addClass("has-error");
                    $parent.find(".invalid-feedback").text("This field is required!");
            } else {
                $(this).parent()
                    .find(".selection")
                    .children()
                    .removeClass("is-invalid")
                    .removeClass("is-valid")
                    .removeClass("no-error")
                    .removeClass("has-error");
                    $parent.find(".invalid-feedback").text("");
            }
        })
    }
    // ----- VALIDATE ASSIGNEE -----

    // ========= AUTO SAVED PROJECT ==================//
    function generateProjectData(){

        $parent = $(this).closest("tr");

       
        let data = { task: [] }, formData = new FormData;

        // var label = $(this).attr("label");
        // formData.append(`label`,label);
        formData.append(`generateProejctData`,'save');
        var checkData = [];
        var getIndexofmilestonePerTask =[];
        var counter=0;
        $('.milestonePerTask').closest("tr").each(function(i, obj) {
            const taskID  = $("td [name=taskName]", this).attr("taskID");
            const projectMilestoneID  = $("td [name=taskName]", this).attr("projectMilestoneID");
            const timelineBuilderID  = $("td [name=taskName]", this).attr("timelineBuilderID");
            const milestoneBuilderID  = $("td [name=taskName]", this).attr("milestoneBuilderID");
            const taskName  = $("td [name=taskName]", this).attr("taskName");
            const taskUsedHours  = $("td [name=TaskUsedHours]", this).val();
            const taskStartDates = moment($("[name=TaskStartDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const taskEndDates = moment($("[name=TaskEndDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const taskPriority  = $("td [name=taskPriority]", this).val();
            const taskSeverity  = $("td [name=taskSeverity]", this).val();
            const taskTimeLeft  = $("td [name=TaskTimeLeft]", this).val();
            const taskStatus  = $("td [name=taskStatus]", this).val();
            const taskNotes  = $("td [name=taskNotes]", this).val()?.trim();
            const taskDescription  = $("td [name=TaskDescription]", this).val()?.trim();
            
            const checkUnsavedData = getTableData(`pms_employeetaskoard_tbl`,
            `taskboardID`,
            `timelineBuilderID = ${timelineBuilderID} AND
            projectMilestoneID = ${projectMilestoneID} AND
            milestoneBuilderID = ${milestoneBuilderID} AND 
            taskID = ${taskID}`);
            
            if(checkUnsavedData.length == 0){
                let temp = {
                    taskID,
                    projectMilestoneID,
                    timelineBuilderID,
                    milestoneBuilderID,
                    taskName,
                    taskUsedHours,
                    taskStartDates,
                    taskEndDates,
                    taskPriority,
                    taskSeverity,
                    taskTimeLeft,
                    taskStatus,
                    taskNotes,
                    taskDescription
                    };
    
                    formData.append(`task[${i}][taskID]`,           taskID);
                    formData.append(`task[${i}][projectMilestoneID]`,           projectMilestoneID);
                    formData.append(`task[${i}][timelineBuilderID]`,           timelineBuilderID);
                    formData.append(`task[${i}][milestoneBuilderID]`,           milestoneBuilderID);
                    formData.append(`task[${i}][taskName]`,         taskName);
                    formData.append(`task[${i}][taskUsedHours]`,    taskUsedHours);
                    formData.append(`task[${i}][taskStartDates]`,   taskStartDates);
                    formData.append(`task[${i}][taskEndDates]`,     taskEndDates);
                    formData.append(`task[${i}][taskPriority]`,     taskPriority);
                    formData.append(`task[${i}][taskSeverity]`,     taskSeverity);
                    formData.append(`task[${i}][taskTimeLeft]`,     taskTimeLeft);
                    formData.append(`task[${i}][taskStatus]`,       taskStatus);
                    formData.append(`task[${i}][taskNotes]`,        taskNotes);
                    formData.append(`task[${i}][taskDescription]`,        taskDescription);
    
                    data["task"].push(temp);

                    checkData[i] = checkUnsavedData.length;
                    getIndexofmilestonePerTask[counter] = i;
                    counter ++;
            }    
        });

        if(checkData.length > 0){
            $.ajax({
                method:      "POST",
                url:         `Employee_taskboard/autoSavedHeader`,
                data: formData,
                processData: false,
                contentType: false,
                global:      false,
                cache:       false,
                async:       false,
                dataType:    "json",
                beforeSend: function() {
                    // $("#loader").show();
                },
                success: function(data) {

                    setTimeout(() => {
                             counter = 0;
                            $('.milestonePerTask').closest("tr").each(function(i, obj) {

                                if(i == getIndexofmilestonePerTask[counter]){
                                    $("td [name=taskName]", this).attr("taskBoardID", data[counter]);
                                    $(".milestonePerTask", this).attr("taskBoardID", data[counter]);
                                    $(".milestonePerTask", this).attr("taskHeaderID", data[counter]);
                                    counter++;
                                }
                            });
                        // $("#loader").hide();
                    }, 500);
                },
                error: function() {
                    setTimeout(() => {
                        $("#loader").hide();
                        showNotification("danger", "System error: Please contact the system administrator for assistance!");
                    }, 500);
                }
            })
        }
	}
    // ========= END AUTO SAVED PROJECT ==================//

    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("change", ".btnSubmit", function () {

        $parent = $(this).closest("tr");

       
        let data = { task: [] }, formData = new FormData;

        var label = $(this).attr("label");
        formData.append(`label`,label);
        
        $(this).closest("tr").each(function(i, obj) {
            const taskID  = $("td [name=taskName]", this).attr("taskID");
            const taskBoardID  = $("td [name=taskName]", this).attr("taskBoardID");
            const projectMilestoneID  = $("td [name=taskName]", this).attr("projectMilestoneID");
            const timelineBuilderID  = $("td [name=taskName]", this).attr("timelineBuilderID");
            const milestoneBuilderID  = $("td [name=taskName]", this).attr("milestoneBuilderID");
            const taskName  = $("td [name=taskName]", this).attr("taskName");
            const taskUsedHours  = $("td [name=TaskUsedHours]", this).val();
            const taskStartDates = moment($("[name=TaskStartDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const taskEndDates = moment($("[name=TaskEndDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const taskPriority  = $("td [name=taskPriority]", this).val();
            const taskSeverity  = $("td [name=taskSeverity]", this).val();
            const taskTimeLeft  = $("td [name=TaskTimeLeft]", this).val();
            const taskStatus  = $("td [name=taskStatus]", this).val();
            const taskNotes  = $("td [name=taskNotes]", this).val()?.trim();
            const taskDescription  = $("td [name=TaskDescription]", this).val()?.trim();
            
         

           let temp = {
                taskID,
                taskBoardID,
                projectMilestoneID,
                timelineBuilderID,
                milestoneBuilderID,
                taskName,
                taskUsedHours,
                taskStartDates,
                taskEndDates,
                taskPriority,
                taskSeverity,
                taskTimeLeft,
                taskStatus,
                taskNotes,
                taskDescription
                };
                formData.append(`task[${i}][taskID]`,           taskID);
                formData.append(`task[${i}][taskBoardID]`,           taskBoardID);
                formData.append(`task[${i}][projectMilestoneID]`,           projectMilestoneID);
                formData.append(`task[${i}][timelineBuilderID]`,           timelineBuilderID);
                formData.append(`task[${i}][milestoneBuilderID]`,           milestoneBuilderID);
                formData.append(`task[${i}][taskName]`,         taskName);
                formData.append(`task[${i}][taskUsedHours]`,    taskUsedHours);
                formData.append(`task[${i}][taskStartDates]`,   taskStartDates);
                formData.append(`task[${i}][taskEndDates]`,     taskEndDates);
                formData.append(`task[${i}][taskPriority]`,     taskPriority);
                formData.append(`task[${i}][taskSeverity]`,     taskSeverity);
                formData.append(`task[${i}][taskTimeLeft]`,     taskTimeLeft);
                formData.append(`task[${i}][taskStatus]`,       taskStatus);
                formData.append(`task[${i}][taskNotes]`,        taskNotes);
                formData.append(`task[${i}][taskDescription]`,        taskDescription);

                data["task"].push(temp);
        });
  
        $.ajax({
            method:      "POST",
            url:         `Employee_taskboard/autoSavedHeader`,
            data: formData,
            processData: false,
            contentType: false,
            global:      false,
            cache:       false,
            async:       false,
            dataType:    "json",
            beforeSend: function() {
                // $("#loader").show();
            },
            success: function(data) {
                

                setTimeout(() => {
                    $parent.find("td div").attr("taskBoardID",data);
                    $parent.find("td span").eq(0).attr("taskBoardID",data);
                    $parent.find("td span").eq(0).attr("taskHeaderID",data);
                    // $("#loader").hide();
                }, 500);
            },
            error: function() {
                setTimeout(() => {
                    $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
        })
	});

    $(document).on("change", ".btnSubTaskSubmit", function () {

        $parent = $(this).closest("tr");
        
       
        let data = { subtask: [] }, formData = new FormData;

        var label = $(this).attr("label") ||"";
        formData.append(`label`,label);
        
        $(this).closest("tr").each(function(i, obj) {
            const taskID  = $("td [name=subtaskName]", this).attr("taskID");
            const taskBoardID  = $("td [name=subtaskName]", this).attr("taskBoardID");
             $taskBoardID  = $("td [name=subtaskName]", this).attr("taskBoardID");
             $subtaskName  = $("td [name=subtaskName]", this).text();
            const subtaskboardID  = $("td [name=subtaskName]", this).attr("subtaskboardID");
            const projectMilestoneID  = $("td [name=subtaskName]", this).attr("projectMilestoneID");
            const timelineBuilderID  = $("td [name=subtaskName]", this).attr("timelineBuilderID");
            const milestoneBuilderID  = $("td [name=subtaskName]", this).attr("milestoneBuilderID");
            const subtaskName  = $("td [name=subtaskName]", this).text();
            const subTaskDescription  = $("td [name=subTaskDescription]", this).val()?.trim();
            const subTaskManHours  = $("td [name=subTaskManHours]", this).val();
            const subTaskUsedHours  = $("td [name=subTaskUsedHours]", this).val();
            const subTaskStartDates = moment($("[name=subTaskStartDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const subTaskEndDates = moment($("[name=subTaskEndDates]", this).val()?.trim()).format("YYYY-MM-DD");
            const subTaskPriority  = $("td [name=subTaskPriority]", this).val();
            const subTaskSeverity  = $("td [name=subTaskSeverity]", this).val();
            const subTaskTimeLeft  = $("td [name=subTaskTimeLeft]", this).val();
            const subTaskStatus  = $("td [name=subTaskStatus]", this).val();
            const subTaskNotes  = $("td [name=subTaskNotes]", this).val()?.trim();

            let temp = {
                taskID,
                taskBoardID,
                subtaskboardID,
                projectMilestoneID,
                timelineBuilderID,
                milestoneBuilderID,
                subtaskName,
                subTaskDescription,
                subTaskManHours,
                subTaskUsedHours,
                subTaskStartDates,
                subTaskEndDates,
                subTaskPriority,
                subTaskSeverity,
                subTaskTimeLeft,
                subTaskStatus,
                subTaskNotes
                };
                formData.append(`subtask[${i}][taskID]`,           taskID);
                formData.append(`subtask[${i}][taskBoardID]`,           taskBoardID);
                formData.append(`subtask[${i}][subtaskboardID]`,           subtaskboardID);
                formData.append(`subtask[${i}][projectMilestoneID]`,           projectMilestoneID);
                formData.append(`subtask[${i}][timelineBuilderID]`,           timelineBuilderID);
                formData.append(`subtask[${i}][milestoneBuilderID]`,         milestoneBuilderID);
                formData.append(`subtask[${i}][subtaskName]`,    subtaskName);
                formData.append(`subtask[${i}][subTaskDescription]`,   subTaskDescription);
                formData.append(`subtask[${i}][subTaskManHours]`,   subTaskManHours);
                formData.append(`subtask[${i}][subTaskUsedHours]`,     subTaskUsedHours);
                formData.append(`subtask[${i}][subTaskStartDates]`,     subTaskStartDates);
                formData.append(`subtask[${i}][subTaskEndDates]`,     subTaskEndDates);
                formData.append(`subtask[${i}][subTaskPriority]`,     subTaskPriority);
                formData.append(`subtask[${i}][subTaskSeverity]`,       subTaskSeverity);
                formData.append(`subtask[${i}][subTaskTimeLeft]`,        subTaskTimeLeft);
                formData.append(`subtask[${i}][subTaskStatus]`,        subTaskStatus);
                formData.append(`subtask[${i}][subTaskNotes]`,        subTaskNotes);
                formData.append(`subtask[${i}][createdBy]`,        sessionID);

                data["subtask"].push(temp);

                
        });
 
        $.ajax({
            method:      "POST",
            url:         `Employee_taskboard/autoSavedSubtask`,
            data: formData,
            processData: false,
            contentType: false,
            global:      false,
            cache:       false,
            async:       false,
            dataType:    "json",
            beforeSend: function() {
                // $("#loader").show();
            },
            success: function(data) {
              
                setTimeout(() => {
                   $parent.find("td span").eq(0).attr("subtaskboardID",data);
                   $parent.find("td div").attr("taskboardID", $taskBoardID);
                   $parent.find("td div").attr("subtaskboardID",data);
                   $parent.find("td div").attr("taskName", $subtaskName);
                    // $("#loader").hide();
                }, 500);
            },
            error: function() {
                setTimeout(() => {
                    $("#loader").hide();
                    showNotification("danger", "System error: Please contact the system administrator for assistance!");
                }, 500);
            }
        })
	});
	// ----- END CLICK BUTTON SUBMIT -----
    

    // ----- CLICK BUTTON CANCEL -----
    // $(document).on("click", "#btnCancel", function() {
    //     saveProjectBoard("cancel", null, pageContent);
    // })
    // ----- END CLICK BUTTON CANCEL -----


    // ----- GET PROJECT BOARD DATA -----
    // const getProjectBoardData = (timelineBuilderID = 0, method = "save") => {
    //     let data = {
    //         timelineBuilderID,
    //         timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
    //         tasks: []
    //     };

    //     $(`[name="milestoneName"]`).each(function(i) {
    //         const index = $(this).attr("index");

    //         const taskID = $(`[name="milestoneName"][index="${index}"]`).attr("taskID");
    //         const projectMilestoneID = $(`[name="milestoneName"][index="${index}"]`).attr("projectMilestoneID");
    //         const manHours       = $(`[name="manHours"][index="${index}"]`).val();
    //         const assignEmployee = $(`[name="assignEmployee"][index="${index}"]`).val()?.join("|");
    //         const temp = {
    //             taskID, projectMilestoneID, manHours, assignEmployee
    //         };
    //         data.tasks.push(temp);
    //     })
    //     return data;
    // }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- DATABASE RELATION -----
    const getConfirmation = method => {
        const title = "Project Board";
        let swalText, swalImg;

        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit these tasks with man hours to employee taskboard?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to approve this document?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
                break;
            case "deny":
                swalTitle = `DENY ${title.toUpperCase()}`;
                swalText  = "Are you sure to deny this document?";
                swalImg   = `${base_url}assets/modal/reject.svg`;
                break;
            case "cancelform":
                swalTitle = `CANCEL ${title.toUpperCase()}`;
                swalText  = "Are you sure to cancel this document?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
            case "drop":
                swalTitle = `DROP ${title.toUpperCase()}`;
                swalText  = "Are you sure to drop this document?";
                swalImg   = `${base_url}assets/modal/drop.svg`;
                break;
            case "uploadcontract":
                swalTitle = `UPLOAD CONTRACT`;
                swalText  = "Are you sure to upload this contract?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()}`;
                swalText  = "Are you sure to discard this process?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
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

    // function saveProjectBoard(method = "submit", id = 0, callback = null) {
    //     const confirmation = getConfirmation(method);
    //     confirmation.then(res => {
    //         if (res.isConfirmed) {

    //             if (method == "cancel") {
    //                 callback && callback();
    //                 Swal.fire({
    //                     icon:              'success',
    //                     title:             "Process successfully discarded!",
    //                     showConfirmButton: false,
    //                     timer:             2000
    //                 });
    //             } else {

    //                 const data = getProjectBoardData(id, method);
    //                 $.ajax({
    //                     method:      "POST",
    //                     url:         `project_management_board/saveProjectBoard`,
    //                     data,
    //                     cache:       false,
    //                     async:       false,
    //                     dataType:    "json",
    //                     beforeSend: function() {
    //                         $("#loader").show();
    //                     },
    //                     success: function(data) {
    //                         let result = data.split("|");
            
    //                         let isSuccess   = result[0];
    //                         let message     = result[1];
    //                         let insertedID  = result[2];
    //                         let dateCreated = result[3];
    
    //                         let swalTitle;
    //                         if (method == "submit") {
    //                             swalTitle = `Project Board submitted successfully!`;
    //                         } else if (method == "save") {
    //                             swalTitle = `Project Board saved successfully!`;
    //                         } else if (method == "cancelform") {
    //                             swalTitle = `${getFormCode("PO", dateCreated, insertedID)} cancelled successfully!`;
    //                         } else if (method == "approve") {
    //                             swalTitle = `${getFormCode("PO", dateCreated, insertedID)} approved successfully!`;
    //                         } else if (method == "deny") {
    //                             swalTitle = `${getFormCode("PO", dateCreated, insertedID)} denied successfully!`;
    //                         } else if (method == "drop") {
    //                             swalTitle = `${getFormCode("PO", dateCreated, insertedID)} dropped successfully!`;
    //                         }
            
    //                         if (isSuccess == "true") {
    //                             setTimeout(() => {
    //                                 $("#loader").hide();
    //                                 closeModals();
    //                                 callback && callback();
    //                                 Swal.fire({
    //                                     icon:              "success",
    //                                     title:             swalTitle,
    //                                     showConfirmButton: false,
    //                                     timer:             2000,
    //                                 });
    //                             }, 500);
    //                         } else {
    //                             setTimeout(() => {
    //                                 $("#loader").hide();
    //                                 Swal.fire({
    //                                     icon:              "danger",
    //                                     title:             message,
    //                                     showConfirmButton: false,
    //                                     timer:             2000,
    //                                 });
    //                             }, 500);
    //                         }
    //                     },
    //                     error: function() {
    //                         setTimeout(() => {
    //                             $("#loader").hide();
    //                             showNotification("danger", "System error: Please contact the system administrator for assistance!");
    //                         }, 500);
    //                     }
    //                 }).done(function() {
    //                     setTimeout(() => {
    //                         $("#loader").hide();
    //                     }, 500);
    //                 })
    //             }
    //         } else {
    //             if (res.dismiss == "cancel" && method != "submit") {
    //                 if (method != "deny") {
    //                     if (method != "cancelform") {
    //                         callback && callback();
    //                     }
    //                 } else {
                        
    //                 }
    //             } else if (res.isDismissed) {
    //                 if (method == "deny") {
                        
    //                 }
    //             }
    //         }
    //     });
    // }
    // ----- END DATABASE RELATION -----

	$(document).on("click",".btnSelectedProject",function(){
		$("#page_content").html(preloader);
		var timelineBuilderID = decryptString($(this).attr("timelineBuilderID") || 0);
		var phaseCode = $(this).attr("phaseCode") || 0;
		var projectMilestoneName = $(this).attr("projectMilestoneName") || 0;
     

        setTimeout(() => {
            viewDocument(timelineBuilderID,false,phaseCode,projectMilestoneName);
        }, 50);
	});
})