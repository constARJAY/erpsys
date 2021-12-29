$(document).ready(function () {
	const allowedUpdate = isUpdateAllowed(143);


	// ----- MODULE APPROVER -----
	const moduleApprover = getModuleApprover(143);
	// ----- END MODULE APPROVER -----


	// ---- GET EMPLOYEE DATA -----
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


	const getProductionContent = async (productionID) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "production/getProductionContent",
            data:     {productionID},
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
            }
        })
        return await result;
    }

	// ----- REUSABLE FUNCTIONS -----
	let holidayData = getTableData(
        "hris_holiday_tbl",
        `*`,
        `holidayStatus = 1`
    )?.map(holiday => holiday.holidayDate);

	// let employeeSchedule = getTableData(
	// 	`hris_employee_list_tbl as helt
	// 		LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)`,
	// 	`IF(mondayStatus = 1, 1, 0) AS monday,
	// 	IF(tuesdayStatus = 1, 1, 0) AS tuesday,
	// 	IF(wednesdayStatus = 1, 1, 0) AS wednesday,
	// 	IF(thursdayStatus = 1, 1, 0) AS thursday,
	// 	IF(fridayStatus = 1, 1, 0) AS friday,
	// 	IF(saturdayStatus = 1, 1, 0) AS saturday,
	// 	IF(sundayStatus = 1, 1, 0) AS sunday`,
	// 	`employeeID = ${sessionID}`
	// );

	const projectList = getTableData(
		"pms_project_list_tbl AS project LEFT JOIN pms_timeline_builder_tbl AS timeline ON timeline.projectID = project.projectListID", 
		"projectListID,clientID,projectListName",
		"timelineBuilderStatus = 2");

	const clientList = getTableData(
		"pms_client_tbl", 
		"clientID,clientName",
		"clientStatus = 1");

	const productionList = getTableData(
		`hris_production_tbl as prod 
		 LEFT JOIN hris_production_activity_tbl as prodActivity ON prod.productionID = prodActivity.productionID`, 
		"dayEntries,activityHours",
		`employeeID=${sessionID}`);	
	// ----- END REUSABLE FUNCTIONS -----


	// ----- UPDATE CLIENT -----
	function updateClientOptions() {
		let clientIDArr = []; // 0 IS THE DEFAULT VALUE
		let clientElementID = [];


		$("[name=activityClient]").each(function(i, obj) {
			clientIDArr.push($(this).val());
			clientElementID.push(`#${this.id}`);
			$(this).val() && $(this).trigger("change");
		}) 
		

		clientElementID.map((element, index) => {
			let html = `<option selected disabled>Please select a client</option>`;
			// let tmpClientList = [clientList];
			html += clientList.filter(client => !clientIDArr.includes(client.clientID) || client.clientID == clientIDArr[index]).map(client => {
				return `
				<option 
					value        = "${client.clientID}"
					${client.clientID == clientIDArr[index] && "selected"}>
					${client.clientName}
				</option>`;
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE CLIENT -----

	// ----- UPDATE PROJECT NAME -----
	function updateProjectOptions() {
		let projectIDArr = []; // 0 IS THE DEFAULT VALUE
		let projectElementID = [];
		
		$("[name=activityProject]").each(function(i, obj) {
			projectIDArr.push($(this).val());
			projectElementID.push(`#${this.id}`);
			// $(this).val() && $(this).trigger("change");
		}) 

		projectElementID.map((element, index) => {
			let html = `<option selected >Please select a project</option>`;
			// let itemList = [...inventoryStorageList];
			html += projectList.map(project => {
				return `
				<option 
				value        = "${project.projectListID}" 
				${project.projectListID == projectIDArr[index] && "selected"}>
				${project.projectListName}
			</option>`;
				
			})
			$(element).html(html);
		});
	}
	// ----- END UPDATE PROJECT NAME -----


	// ----- GET CLIENT LIST -----
	function getClientList(id = null, display = true) {
		let html ='';
			html = `
		<option 
			value       = "0"
			${id == "0" && "selected"}>Please select a client</option>`;
		html += clientList.map(client => {

			return `
			<option 
				value       = "${client.clientID}" 
				${client.clientID  == id && "selected"}>
				${client.clientName}
			</option>`;
		})
		return display ? html : clientList;
	}
	// ----- END GET CLIENT LIST -----


	// ---- GET PROJECT LIST ----//
	function getprojectList(id = null, display = true, clientID = null) {
	
		let html   = `<option selected>Please select a project</option>`;

		let projectIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=activityProject]`).each(function(i, obj) {
			projectIDArr.push($(this).val());
		}) 

		const nonProject = ["Admin Works", "Company ID","Event Management","HR Works","Meeting(Department)","Meeting(General)","Meeting(Officer)","On boarding","Orientation","Payroll Run","Performance Report","Web Portal","Weekly Report"];
		const nonProjectID = [1, 2,3,4,5,6,7,8,9,10,11,12,13];

		
		html += projectList.map(project => {
				

				if(project.clientID == clientID ){
					return `
					<option 
						value        = "${project.projectListID}" 
						${project.projectListID == id && "selected"}>
						${project.projectListName}
					</option>`;
				}
			
				
			
		})

		if(clientID == 0){
			for(var loop = 0; loop<nonProjectID.length;loop++){
				
				html += `<option 
					value        = "${nonProjectID[loop]}" 
					${nonProjectID[loop] == id && "selected"}>
					${nonProject[loop]}
				</option>`;
			
			}
		}

		
		return display ? html : inventoryStorageList;
	}
	// ----- END GET PROJECT LIST -----

	// --- GET FUNCITON  SPECIFIC PRODUCTION HOURS ---//
	function getSpecificProductionRecord(productionID = 0){
		const productionRecord = getTableData(
			`hris_production_tbl as prod 
			 LEFT JOIN hris_production_activity_tbl as prodActivity ON prod.productionID = prodActivity.productionID`, 
			"dayEntries,dateEntries,SUM(activityHours) activityHours",
			`employeeID=${sessionID}  AND prod.productionID =${productionID}`,
			'','dateEntries');
		
			return productionRecord;
	}


	function getSpecificProductionEntriesRecord(productionID = 0){
		const productionEntriesRecord = getTableData(
			`hris_production_tbl as prod 
			 LEFT JOIN hris_production_entries_tbl as prodActivity ON prod.productionID = prodActivity.productionID`, 
			"dayEntries,dateEntries",
			`employeeID=${sessionID}  AND prod.productionID =${productionID}`);
		
			return productionEntriesRecord;
	}
		
	// --- GET FUNCITON  SPECIFIC PRODUCTION HOURS ---//


	// ---- function for Employee Schedule ---//

	function employeeSchedule(){
		let getScheduleData = getTableData(`hris_employee_list_tbl AS emp 
		LEFT JOIN hris_schedule_setup_tbl AS sched ON emp.scheduleID = sched.scheduleID`,
		'sched.*'
		,`emp.employeeID = ${sessionID}`);

		return getScheduleData;
	}
	// ---- function for Employee Schedule ---//


	// ----- IS DOCUMENT REVISED -----
	function isDocumentRevised(id = null) {
		if (id) {
			const revisedDocumentsID = getTableData(
				"hris_production_tbl", 
				"reviseProductionID", 
				"reviseProductionID IS NOT NULL AND productionStatus != 4");
			return revisedDocumentsID.map(item => item.reviseLeaveRequestID).includes(id);
		}
		return false;
	}
	// ----- END IS DOCUMENT REVISED -----


	// ----- VIEW DOCUMENT -----
	function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false,isOverView = false) {
		const loadData = (id, isRevise = false, isFromCancelledDocument = false,isOverView = false) => {
			// const tableData = getTableData("hris_production_tbl", "", "productionID=" + id);
			const data = getProductionContent(id);
			
			data.then(res => {
                if (res) {
                    const tableData = res;
					if (tableData.length > 0) {
						let {
							employeeID,
							productionStatus
						} = tableData[0];

						let isReadOnly = true, isAllowed = true;

						if (employeeID != sessionID) {
							isReadOnly = true;
							if (productionStatus == 0 || productionStatus == 4) {
								isAllowed = false;
							}
						} else if (employeeID == sessionID) {
							if (productionStatus == 0) {
								isReadOnly = false;
							} else {
								isReadOnly = true;
							}
						} else {
							isReadOnly = readOnly;
						}

						if (isAllowed) {
							if (isRevise && employeeID == sessionID) {
								pageContent(true, tableData, isReadOnly, true, isFromCancelledDocument,isOverView);
								updateURL(encryptString(id), true, true,isOverView);
							} else {
								pageContent(true, tableData, isReadOnly,false,false,isOverView);
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
				id && isFinite(id) && loadData(id, isRevise, isFromCancelledDocument,isOverView);
		} else {
			let url   = window.document.URL;
			let arr   = url.split("?view_id=");
			let isAdd = url.indexOf("?add");
			let isOverView= url.indexOf("?overview");
			if (arr.length > 1) {
				let id = decryptString(arr[1]);
					id && isFinite(id) && loadData(id);
			} else if (isAdd != -1) {
				arr = url.split("?add=");
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					const isAllowed = isCreateAllowed(143);
					pageContent(isAllowed);
				}
			}else if (isOverView != -1) {
				arr = url.split("?overview=");
				if (arr.length > 1) {
					let id = decryptString(arr[1]);
						id && isFinite(id) && loadData(id, true);
				} else {
					const isAllowed = isCreateAllowed(143);
					pageContent(isAllowed);
				}
			}
		}
		
	}

	function updateURL(view_id = 0, isAdd = false, isRevise = false , isOverView = false) {
		if (view_id && !isAdd) {
			if(isOverView){
				window.history.pushState("", "", `${base_url}hris/production?overview_id=${view_id}`);
			}else{
				window.history.pushState("", "", `${base_url}hris/production?view_id=${view_id}`);
			}
		} else if (isAdd) {
			if (view_id && isRevise) {
				if(isOverView){
					window.history.pushState("", "", `${base_url}hris/production?overview=${view_id}`);
				}else{
					window.history.pushState("", "", `${base_url}hris/production?add=${view_id}`);
				}
				
			} else {
				if(isOverView){
					window.history.pushState("", "", `${base_url}hris/production?overview`);
				}else{
					window.history.pushState("", "", `${base_url}hris/production?add`);
				}
				
			}
		} else {
			window.history.pushState("", "", `${base_url}hris/production`);
		}
	}
	// ----- END VIEW DOCUMENT -----


	// GLOBAL VARIABLE - REUSABLE 
	const dateToday = () => {
		return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
	};
	// END GLOBAL VARIABLE - REUSABLE 


	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableForApprroval")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 150},
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 50  },
					{ targets: 4, width: 200  },
				],
				dom: 'lBfrtip',
				buttons: [
					{
						extend: 'excelHtml5',
						exportOptions: {
							columns: [ 0, 1, 2, 3, 4 ]
						}
					},
					{
						extend: 'pdfHtml5',
						exportOptions: {
							columns: [ 0, 1, 2, 3, 4 ]
						}
					},
					{
						extend: 'print',
						exportOptions: {
							columns: [ 0, 1, 2, 3, 4 ]
						}
					}
				]
			});

		var table = $("#tableMyForms")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				
				proccessing: false,
				serverSide: false,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 180 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 150 },
					{ targets: 3, width: 50  },
					{ targets: 4, width: 50  },
				],
				dom: 'lBfrtip',
				buttons: [
					{
						extend: 'excelHtml5',
						exportOptions: {
							columns: [ 0, 1, 2, 3 ]
						}
					},
					{
						extend: 'pdfHtml5',
						exportOptions: {
							columns: [ 0, 1, 2, 3 ]
						}
					},
					{
						extend: 'print',
						exportOptions: {
							columns: [ 0, 1, 2, 3 ]
						}
					}
				]
				
			
			});
	}

	function initDataTablesForActivity(){
		if ($.fn.DataTable.isDataTable("#tableForActivity")) {
			$("#tableForActivity").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableForActivity0")) {
			$("#tableForActivity0").DataTable().destroy();
		}

		var table = $("#tableForActivity")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 50 },
					{ targets: 1, width: 100 },
					{ targets: 2, width: 100 },
					{ targets: 3, width: 50 },
					{ targets: 4, width: 200 },
					{ targets: 5, width: 150  },
					{ targets: 6, width: 300  },
					{ targets: 7, width: 300  },
					{ targets: 8, width: 300  },
					// { targets: 9, width: 150  },

				],
				// dom: 'Bfrtip',
			
			});

			var table = $("#tableForActivity0")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting:        false,
                searching:      false,
                paging:         false,
                ordering:       false,
                info:           false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 50 },
					{ targets: 1, width: 50 },
					{ targets: 2, width: 50 },
					{ targets: 3, width: 50 },
					{ targets: 4, width: 50  },
					{ targets: 5, width: 250  },
					{ targets: 6, width: 270  },
					{ targets: 7, width: 250  },
					// { targets: 8, width: 50  },

				],
				// dom: 'Bfrtip',
			
			});
	}
	// ----- END DATATABLES -----


	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_production_tbl", "approversID")) {
				let count = getCountForApproval("hris_production_tbl", "productionStatus");
				let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
				let html = `
				<div class="bh_divider appendHeader"></div>
				<div class="row clearfix appendHeader">
					<div class="col-12">
						<ul class="nav nav-tabs">
							<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval ${displayCount}</a></li>
							<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">My Forms</a></li>
						</ul>
					</div>
				</div>`;
				$("#headerContainer").append(html);
			}
		} else {
			$("#headerContainer").find(".appendHeader").remove();
		}
	}
	// ----- END HEADER CONTENT -----


	// ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			// if (isCreateAllowed(143)) {
			// 	html = `
			// 	<button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
			// }

			html=``;
		} else {
			html = `
            <button type="button" class="btn btn-default btn-light" id="btnBack"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


	// ----- FOR APPROVAL CONTENT -----
	function forApprovalContent() {
		$("#tableForApprovalParent").html(preloader);

		let leaveRequestData = getTableData(
			"hris_production_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_production_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_production_tbl.createdAt AS dateCreated",
			`hris_production_tbl.employeeID != ${sessionID} AND productionStatus != 0 AND productionStatus != 4`,
			`FIELD(productionStatus, 0, 1, 3, 2, 4), COALESCE(hris_production_tbl.submittedAt, hris_production_tbl.createdAt)`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
					<tr style="white-space: nowrap">
					<th>Production Dates</th>
					<th>Current Approver</th>
					<th>Current Approver</th>
					<th>Status</th>
					<th>Remarks</th>
					
                </tr>
            </thead>
            <tbody>`;

		leaveRequestData.map((schedule) => {
			let {
				productionID,
				productionCode,
				productionSchedule,
				approversID,
				approversDate,
				productionStatus,
				productionReason,
				submittedAt,
				createdAt,
			} = schedule;
			let remarks       = productionReason ? productionReason : "-";
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt	? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = productionStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			if (isImCurrentApprover(approversID, approversDate, productionStatus) || isAlreadyApproved(approversID, approversDate)) {
				html += `
				<tr class="btnView"  id="${encryptString(productionID)}" code="${productionCode}">
					<td>
						<div>${productionSchedule}</div>
						<small>${productionCode}</small>
					</td>
					<td>
						${employeeFullname(getCurrentApprover(approversID, approversDate, productionStatus, true))}
					</td>
					<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
					<td class="text-center">
						${getStatusStyle(productionStatus)}
					</td>
					<td>${remarks}</td>
				</tr>`;
			}
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableForApprovalParent").html(html);
			initDataTables();
			return html;
		}, 300);
	}
	// ----- END FOR APPROVAL CONTENT -----


	// ----- MY FORMS CONTENT -----
	function myFormsData(productionID = 0) {
		uniqueData = [];
		let productionData = getTableData(
			"hris_production_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
			"hris_production_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_production_tbl.createdAt AS dateCreated",
			`hris_production_tbl.employeeID = ${sessionID} AND productionID <> ${productionID}`,
			`FIELD(productionStatus, 0, 1, 3, 2, 4), COALESCE(hris_production_tbl.submittedAt, hris_production_tbl.createdAt)`
		);
		productionData.map(production => {
			let {
				productionID,
				productionCode,
				productionSchedule,
				productionStatus
			} = production;
			let unique = {
				id: productionID,
				productionCode,
				productionSchedule,
			};
			(productionStatus == 1 || productionStatus == 2) && uniqueData.push(unique);
		})
		return productionData;
	}


	// --- EXPAND THE CUSTOM DATE RANGE ----//
	function expandDaterange(startDate, endDate) {
		var startDate = new Date(startDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3"));
		var endDate = new Date(endDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3"));

		for (var arr = [], d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
		  arr.push(moment(new Date(d)).format("YYYY-MM-DD"));
		}
		return arr;
	  };

	function expandDayrange(startDate, endDate) {
		var startDate = new Date(startDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3"));
		var endDate = new Date(endDate.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1/$2/$3"));

		for (var arr = [], d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
			arr.push(moment(new Date(d)).format("dddd"));
		}
		return arr;
	}; 
	// --- EXPAND THE CUSTOM DATE RANGE ----//

	// --- GET MAN HOURS FOR EVERY DEFAULT PRESENT DAY BASED ON EMPLOYEE SCHEDULE---//
	function getSchedManHours(){
		let getSchedule = employeeSchedule();
		let getDayArr ={};

		getSchedule.map((sched,index)=> {
			let{
				mondayFrom,
				mondayTo,
				mondayBreakDuration,
				mondayStatus,

				tuesdayFrom,
				tuesdayTo,
				tuesdayBreakDuration,
				tuesdayStatus,

				wednesdayFrom,
				wednesdayTo,
				wednesdayBreakDuration,
				wednesdayStatus,

				thursdayFrom,
				thursdayTo,
				thursdayBreakDuration,
				thursdayStatus,

				fridayFrom,
				fridayTo,
				fridayBreakDuration,
				fridayStatus,

				saturdayFrom,
				saturdayTo,
				saturdayBreakDuration,
				saturdayStatus,

				sundayFrom,
				sundayTo,
				sundayBreakDuration,
				sundayStatus
			} = sched;

				let dayArr = [`monday`,`tuesday`,`wednesday`,`thursday`,`friday`,`saturday`,`sunday`];
				let dayFromArr = [mondayFrom,tuesdayFrom,wednesdayFrom,thursdayFrom,fridayFrom,saturdayFrom,sundayFrom];
				let dayToArr = [mondayTo,tuesdayTo,wednesdayTo,thursdayTo,fridayTo,saturdayTo,sundayTo];
				let dayBreakArr = [mondayBreakDuration,tuesdayBreakDuration,wednesdayBreakDuration,thursdayBreakDuration,fridayBreakDuration,saturdayBreakDuration,sundayBreakDuration];
				let dayStatusArr = [mondayStatus,tuesdayStatus,wednesdayStatus,thursdayStatus,fridayStatus,saturdayStatus,sundayStatus];

				getDayArr ={
					dayArr,
					manHours:[]
				};
					
			for(var loop =0;loop<7;loop++){
				
				let tmpStart = dayFromArr[loop].split(":");
				let tmpEnd = dayToArr[loop].split(":");

				let tmpStartDate = new Date(0, 0, 0, tmpStart[0], tmpStart[1], 0);
				let tmpEndDate = new Date(0, 0, 0, tmpEnd[0], tmpEnd[1], 0);
				
				var tmpDiff = tmpEndDate.getTime() - tmpStartDate.getTime();
				var tmpHours = Math.floor(tmpDiff  / 1000 / 60 / 60);
				tmpDiff -= tmpHours * 1000 * 60 * 60;
				var tmpMinutes = Math.floor(tmpDiff / 1000 / 60);
				var tmpComputeHour = parseFloat(tmpHours) +":"+ parseFloat(tmpMinutes/60);
				let getDayManHoursToDecimal = moment.duration(tmpComputeHour).asHours(); 
				let getExactManHours = parseFloat(getDayManHoursToDecimal) - parseFloat(dayBreakArr[loop]);


				// let getDayManHours = moment(dayFromArr[loop], '"HH:mm"').add(moment.duration(dayToArr[loop])).format('HH:mm');
				// let getDayManHoursToDecimal = moment.duration(getDayManHours).asHours(); 
				// let getExactManHours = parseFloat(getDayManHoursToDecimal) - parseFloat(dayBreakArr[loop]);
				
				
				getDayArr.manHours.push(getExactManHours);    
			}
		})


		return getDayArr;
	}

	// --- END GET MAN HOURS FOR EVERY DEFAULT PRESENT DAY BASED ON EMPLOYEE SCHEDULE---//

	// --- GET USED MAN HOURS FOR EVERY MAN HAS SET BY THE EMPLOYEE ---//
	function DocumentValidateManHours(productionID = 1){
		let getEntries = getSpecificProductionEntriesRecord(productionID);
		let getManHours = getSpecificProductionRecord(productionID);
		let getDefaultSched = getSchedManHours();
		let getDay = getDefaultSched.dayArr;
		let getHours = getDefaultSched.manHours;
		let productArr ={};
		let outputFlag = true;
		let html ='';
		let msg ='';

		productArr ={
			prodDayArr:[],
			prodManHours:[]
		};

		getManHours.map((prod,index)=> {
			let{
				dayEntries,
				activityHours
			} = prod;

		productArr.prodDayArr.push(dayEntries);    
		productArr.prodManHours.push(activityHours);    		
		})
		var confirmData =[];
		for(var loop1 =0; loop1<getEntries.length;loop1++){
			
			let getEntriesday = getEntries[loop1].dayEntries.toLowerCase();
			let formatDate = moment(getEntries[loop1].dateEntries).format("MMMM DD, YYYY");
			
			if(getDay.includes(getEntriesday)){
				let index = getDay.indexOf(getEntriesday); 
				let flag = false;

				for(var loop2 =0; loop2 < getManHours.length; loop2++ ){

					let rowProdDay = productArr.prodDayArr[loop2] == null ? "" : productArr.prodDayArr[loop2].toLowerCase();
					
					if(getDay[index] == rowProdDay){
						flag = true;

						confirmData[loop1] = true;
						
						let defaultHours = parseFloat(getHours[index]) || 0;
						let docHours = parseFloat(productArr.prodManHours[loop2] == null ? 0 : productArr.prodManHours[loop2] || 0);
						
						if(defaultHours > docHours){

							 msg += `&bull; <span class="font-weight-bold">${formatDate}</span> Kindly complete the hours.<br>`;

							outputFlag = false;
						}
					}else{

						if(confirmData[loop1] == true){
							flag = true;
						}else{
							flag = false;
						}

					}
				}

				if(!flag){
					msg += `&bull; <span class="font-weight-bold">${formatDate}</span> Kindly set activities.<br>`;

					outputFlag = false;
				}
			}
		}

		if(msg){
			html += `<div class="alert alert-danger alert-dismissible fade show w-100 mb-4" role="alert">
					<div class="pb-2">
						<span class="font-weight-bold text-danger"><i class="fas fa-exclamation-circle"></i> ERROR: A problem has been occured while submitting your data.</span>
					</div>
					<div>
						${msg}
					</div>
					<button type="button" class="close alert-notice" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>`;

		}

		
		$("#notice_content").html(html);
		$(`#notice_content`).fadeIn(500);

		return outputFlag;
	}
	// --- END USED MAN HOURS FOR EVERY MAN HAS SET BY THE EMPLOYEE ---//

	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let leaveRequestData = myFormsData();

		let html = `

    <div id="notice_content" style="display: none;">
        
    </div>
		
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
		<div class="row mt-2">
		<div class="form-group col-sm-12 col-md-8 col-lg-6 col-xl-4">
		<input type="button" 
		class="form-control validate daterange"
		id="setDateSchedule"
		name="setDateSchedule"
		value="${moment().format("MMMM DD, YYYY")}"
		title="Date">
		</div>
		<div class="form-group col-sm-12 col-md-4 col-lg-2 col-xl-1"><button class=" form-control w-100 btn btn-add addProductionDocument" action="add">Add</button></div>
		</div>
		<hr style="width:100%;">
            <thead>
                <tr style="white-space: nowrap">
                    <th>Production Dates</th>
                    <th>Current Approver</th>
                    <th>Date</th>
                    <th>Status</th>
					<th>Action</th>
                </tr>
            </thead>
            <tbody>`;
		var existingDates =[];
		var mergeArray =[];

		leaveRequestData.map((item,index) => {
			let {
				productionID,
				productionCode,
				productionSchedule,
				dateStart,
				dateEnd,
				approversID,
				approversDate,
				productionStatus,
				submittedAt,
				createdAt,
			} = item;

			
			existingDates.push(expandDaterange(dateStart,dateEnd)); // NOTE: this is for a whole document inside of the table

			// let leaveDateSplit= leaveRequestDate.split(" - ");
			// let leaveDate 	  = leaveDateSplit[0] == leaveDateSplit[1] ? leaveDateSplit[0] : leaveDateSplit[0]+" - "+leaveDateSplit[1];
			let dateCreated   = moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A");
			let dateSubmitted = submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "-";
			let dateApproved  = productionStatus == 2 ? approversDate.split("|") : "-";
			if (dateApproved !== "-") {
				dateApproved = moment(dateApproved[dateApproved.length - 1]).format("MMMM DD, YYYY hh:mm:ss A");
			}

			// let unique = {
			// 	id:               productionID,
			// 	leaveRequestDate: leaveRequestDate,
			// };
			// (productionStatus == 1 || productionStatus == 2) && uniqueData.push(unique);

			let btnClass =
				productionStatus != 0 ? `btnView`: `btnEdit`;
			html += `
            <tr class="">
                <td>
					<div class="d-flex"><span id="editExistDate${index}" index="${index}" class="editExistDate d-flex"  productionID="${productionID}">${productionSchedule}</span>${productionStatus == 0 ? `<i class="fas fa-edit btnEditDocumentDate ml-2" id="btnEditDocumentDate${index}" prevDateRange="${productionSchedule}" index=${index} style="cursor:pointer;" title="Edit"></i>`:""} </div>
					<small>${productionCode}</small>
				</td>
                <td>
                    ${employeeFullname(getCurrentApprover(approversID, approversDate, productionStatus, true))}
                </td>
				<td>${getDocumentDates(dateCreated, dateSubmitted, dateApproved)}</td>
                <td class="text-center">
                    ${getStatusStyle(productionStatus)}
                </td>
				<td>
				<!-- Default dropright button -->
					<div class="btn-group w-100">
					<button type="button" class="btn btn-sm btn-default font-weight-800 dropdown-toggle " style="border:1px solid gray; width:100%;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Action 
					</button>
					<div class="dropdown-menu">
					<a class="dropdown-item btnOverView"  id="${encryptString(productionID)}" code="${productionCode}" href="javascript:void(0);"><i class="fas fa-list-ul"></i> Overview</a>
					<a class="dropdown-item ${btnClass}"  id="${encryptString(productionID)}" code="${productionCode}" href="javascript:void(0);"><i class="fas fa-eye"></i> View</a>
					${productionStatus == 0 ? `<a class="dropdown-item"  id="btnSubmit" productionID="${encryptString(productionID)}" code="${productionCode}" revise="${false}" cancel="${false}"  href="javascript:void(0);"><i class="fas fa-paper-plane"></i> Submit</a>` : ""}
					
					
					</div>
					</div>
				</td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;

		for(var loop =0; loop<existingDates.length;loop++){
			for( var loop2 = 0;loop2<existingDates[loop].length;loop2++){
				mergeArray.push(existingDates[loop][loop2]);
			}
		}

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			initAll();
			leaveRequestDateRange(mergeArray);

			// let count = $("#tableMyForms tbody > tr").length;

			// for(var loop = 0; loop<count; loop++){
			// 	changeDefaultDateRange("",loop);
			// }
			return html;
		}, 300);
	}
	// ----- END MY FORMS CONTENT -----

	    // ----- DROPDOWN NOTICE -----
		$(document).on("click", `#dropdown_notice`, function() {
			const show = $(this).attr("show") == "true";
			if (show) {
				$(this).find('i').removeClass("fa-caret-up").addClass("fa-caret-down");
				$(this).attr("show", "false");
			} else {
				$(this).find('i').removeClass("fa-caret-down").addClass("fa-caret-up");
				$(this).attr("show", "true");
			}
			$(`#notice_content`).toggle(500);
		})
		// ----- END DROPDOWN NOTICE -----


	// ------ EVENT IN MY FORMS CONTENTS-------//
	$(document).on("click",".addProductionDocument",function(){
		var getDateSchedule =  $(`[name=setDateSchedule]`).val() || "";
		var explode = getDateSchedule.split('-');
		var getdateStart = moment(explode[0]).format("YYYY-MM-DD") || "";
		var getdateEnd = moment(explode[1]).format("YYYY-MM-DD") || "";
		var action = $(this).attr("action") || "add";
		
		var getInputDateRange =[];
		var getInputDayRange =[];
		var existingDatesAdd =[];
		var mergeArrayAdd =[];

		getInputDateRange = expandDaterange(getdateStart,getdateEnd);
		getInputDayRange = expandDayrange(getdateStart,getdateEnd);

		let getDates = getTableData("hris_production_tbl","dateStart,dateEnd",`employeeID = ${sessionID}`);

		getDates.map((production) =>{
			let{
				dateStart,
				dateEnd
			} = production;

			existingDatesAdd.push(expandDaterange(dateStart,dateEnd));
		})

		for(var loop =0; loop<existingDatesAdd.length;loop++){
			for( var loop2 = 0;loop2<existingDatesAdd[loop].length;loop2++){
				mergeArrayAdd.push(existingDatesAdd[loop][loop2]);
			}
		}

		for( var loop1 = 0;loop1<getInputDateRange.length;loop1++){
			if(mergeArrayAdd.includes(moment(getInputDateRange[loop1]).format("YYYY-MM-DD"))){

				showNotification("danger", "A date on the production already exists!");
				return false;
			}

		}

	
		let data = {
			employeeID :sessionID,
            getDateSchedule:	getDateSchedule,
            dateStart:     		getdateStart,
            dateEnd:       		getdateEnd,
			listDateRange: 		getInputDateRange,
			listDayRange: 		getInputDayRange,
			action: 			action,
			apprversID : 		moduleApprover ? moduleApprover : sessionID
        };

		
		Swal.fire({
            title: 'CREATE PRODUCTION DATES',
        text: "Are you sure that you want to create a production?",
            imageUrl: `${base_url}assets/modal/add.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Add',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
				$.ajax({
					method:      "POST",
					url:         `production/saveProductionDocument`,
					data,
					cache:       false,
					async:       false,
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
						if (action == "add") {
							swalTitle = `${getFormCode("PDN", dateCreated, insertedID)} created successfully!`;
						} else if (action == "update") {
							swalTitle = `${getFormCode("PDN", dateCreated, insertedID)} updated successfully!`;
						}
		
						if (isSuccess == "true") {
							setTimeout(() => {
								$("#loader").hide();
								closeModals();
								// callback && callback();
								Swal.fire({
									icon:              "success",
									title:             swalTitle,
									showConfirmButton: false,
									timer:             2000,
								});
								myFormsContent();
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


            Swal.fire({
                icon: 'success',
                title:  `${getDateSchedule} successfully created!`,
                showConfirmButton: false,
                timer: 800
              })
            }
        });

		
	})

	// ------ EVENT IN MY FORMS CONTENTS-------//

		// ------ EVENT IN MY FORMS CONTENTS-------//
		$(document).on("change",".autoSaved",function(){

			$parent = $(this).closest("tr");

			var getTimeStartPeriod = $parent.find(`[name="timePeriodStart"]`).val();
			var getTimeEndPeriod = $parent.find(`[name="timePeriodEnd"]`).val();
			var getLocation = $parent.find(`[name="activityLocation"]`).val() || "";
			var getClass = $parent.find(`[name="activityClass"] option:selected`).val();
			var getClientID = $parent.find(`[name="activityClient"] option:selected`).val();
			var getClientName = $parent.find(`[name="activityClient"] option:selected`).text();
			var getProjectID = $parent.find(`[name="activityProject"] option:selected`).val();
			var getProjectName = $parent.find(`[name="activityProject"] option:selected`).text();
			// var getStatus = $parent.find(`[name="activityStatus"] option:selected`).val();
			var getDescription = $parent.find(`[name="activityDescription"]`).val()?.trim();
			var getManHours = $parent.find(`[name="activityManHours"]`).text();
			var createdBy = sessionID;
			var productionActivityID  = $parent.find(`[name="timePeriodStart"]`).attr("productionActivityID");
			var productionID = $parent.find(`[name="timePeriodStart"]`).attr("productionID");
			var productionEntriesID = $parent.find(`[name="timePeriodStart"]`).attr("productionentriesiD");
			var getDateEntries = $parent.find(`[name="timePeriodStart"]`).attr("getDateEntries");
			var getDayEntries = $parent.find(`[name="timePeriodStart"]`).attr("getDayEntries");

			let data = {
				getTimeStartPeriod		:	getTimeStartPeriod,
				getTimeEndPeriod		:	getTimeEndPeriod,
				getLocation				:	getLocation,
				getClass				:	(getClass=='Please select a category' ? 'N/A' : getClass),
				getClientID				:	getClientID,
				getClientName			:	(getClientName=='Please select a client' ? 'N/A' : getClientName),
				// getClientName			:	getClientName,
				getProjectID			:	getProjectID,
				// getProjectName			:	(getProjectName=='Select Project' ? '' : getProjectName),
				getProjectName			:	(getProjectName=='Please select a project' ? 'N/A' : getProjectName),
				// getStatus				:	(getStatus=='Select Status' ? '' : getStatus),
				getDescription			:	getDescription,
				getManHours				:	getManHours,
				createdBy				:	createdBy,
				productionActivityID 	: 	productionActivityID ,
				productionID			:	productionID,
				productionEntriesID		:	productionEntriesID,
				getDateEntries			:	getDateEntries,
				getDayEntries			:	getDayEntries,
			};

			setTimeout(() => {
				$.ajax({
					method:      "POST",
					url:         `production/autoSavedProductionActivity`,
					data,
					cache:       false,
					async:       false,
					dataType:    "json",
					beforeSend: function() {
					},
					success: function(data) {
						let result = data.split("|");
		
						let isSuccess   = result[0];
						let message     = result[1];
						let insertedID  = result[2];
						let dateCreated = result[3];
	
						if(isSuccess){
							$parent.find(`[name="timePeriodStart"]`).attr("productionActivityID",insertedID);
						}
					},
					error: function() {
						setTimeout(() => {
							// $("#loader").hide();
							showNotification("danger", "System error: Please contact the system administrator for assistance!");
						}, 500);
					}
				})
			}, 500);
	
			
		})
	
		// ------ EVENT IN MY FORMS CONTENTS-------//


	// -----  EVENT FOR SIDETABLE ENTRIES CONTENT ----- //

	$(document).on("click",".entries",function(){

		var productionID = $(this).attr("productionID");
		var productionEntriesID = $(this).attr("productionEntriesID");
		var getDateEntries = $(this).attr("getDateEntries");
		var getDayEntries = $(this).attr("getDayEntries");
		var productionStatus = $(this).attr("productionStatus");
		var readOnly = $(this).attr("isreadOnly");

		// ---- UPDATE THE DATA IN ADD ROW FOR WEVERY CHANGE OF ENTIES -----//
		$("#btnAddRow").attr("productionEntriesID",productionEntriesID);
		$("#btnAddRow").attr("getDateEntries",getDateEntries);
		$("#btnAddRow").attr("getDayEntries",getDayEntries);

		if(readOnly == "true"){
			readOnly = true;
		}else{
			readOnly = false;
		}
		
		// readOnly =  (readOnly === "true" ? "true" : " false");
		let html ="";

		$("#activityTableBody").html('<tr><td colspan=10>'+preloader+'</td></tr>');

		$(".entries").each(function(){
			$(this).removeClass("bg-secondary");
			$(this).removeClass("text-white");
		})
	
		$(this).addClass("bg-secondary");
		$(this).addClass("text-white");

		let getActivities = getTableData(`hris_production_activity_tbl`,'',`productionEntriesID = ${productionEntriesID}`);
			
		if(getActivities.length >0){
			getActivities.map((entry)=>{
				html +=`${getItemRow(entry,readOnly,productionID,productionEntriesID,getDateEntries,getDayEntries,productionStatus)}`;
			})
		}else{
				html+=`${getItemRow('',false,productionID,productionEntriesID,getDateEntries,getDayEntries,productionStatus)}`;
		}

		setTimeout(() => {
			$("#activityTableBody").html(html);
			$(".activityHeader").text(`VIEW ACTIVITIES: ${getDayEntries}, ${moment(getDateEntries).format("MMMM DD, YYYY")}`)
			updateTableItems();
			initSelect2();
		}, 500);


	})

	// -----  EVENT FOR SIDETABLE ENTRIES CONTENT ----- //

	// ------- CHANGE EXIST DATE ON DOCUMENT SELECTED -----//
	$(document).on("click",".btnEditDocumentDate",function(){
		$parent = $(this).closest("tr");

		let getProductionID = $parent.find(".editExistDate").attr("productionID");
		let index = $parent.find(".editExistDate").attr("index");
		let getPrevDate = $(this).attr("prevDateRange");

		

		// ---- HIDE EDIT BUTTON ----//
		$(this).css("display","none");

		// ---- Remove Old Date -----//
		$parent.find(".editExistDate").text("");
		// ---- Remove Old Date -----//


		// ---- Append Input Field ------//
		$parent.find(".editExistDate").append(`
		<input type="button" 
		class="form-control validate daterange w-80"
		id="setDefaultDateSchedule${index}"
		name="setDefaultDateSchedule"
		value="${moment().format("MMMM DD, YYYY")}"
		title="Date">
		<i class="fas fa-times-square fa-2x mt-1 ml-2 btnCancelDate" title="cancel" prevStartDate="${getPrevDate}" index="${index}" style="cursor:pointer;"></i>
		<i class="fas fa-check-square fa-2x mt-1 ml-2 btnUpdateDate" title="save" index="${index}" productionID="${getProductionID}" style="cursor:pointer;"></i>`);


		let existingDates =[];
		let mergeArray =[];

		let getDateData = getTableData(
			"hris_production_tbl ",
			"",
			`hris_production_tbl.employeeID = ${sessionID} AND productionID != ${getProductionID}`,
			``);

		getDateData.map((date,index) => {
			let {
				dateStart,
				dateEnd,
			} = date;

			existingDates.push(expandDaterange(dateStart,dateEnd));
		})

		for(var loop =0; loop<existingDates.length;loop++){
			for( var loop2 = 0;loop2<existingDates[loop].length;loop2++){
				mergeArray.push(existingDates[loop][loop2]);
			}
		}

		changeDefaultDateRange(mergeArray,index);

		// --- SPLIT DATE RANGE -----//
		let tmpSplit = getPrevDate.split("-");
		let formatDateFrom = tmpSplit[0];
		let formatDateTo = tmpSplit[1];

		// --- SPLIT DATE RANGE -----//

		//change the selected date range of that picker
		$('#setDefaultDateSchedule'+index).data('daterangepicker').setStartDate(formatDateFrom);
		$('#setDefaultDateSchedule'+index).data('daterangepicker').setEndDate(formatDateTo);
	
		// ---- Append Input Field ------//

	})
	// ------- CHANGE EXIST DATE ON DOCUMENT SELECTED -----//

	// ---- CANCEL DATE RANGE-----//
	$(document).on("click",".btnCancelDate",function(){
		let getIndex = $(this).attr("index");
		let getPrevDate = $(this).attr("prevStartDate");

		$("#editExistDate"+getIndex).text(getPrevDate);
		$("#btnEditDocumentDate"+getIndex).removeAttr("style");
		$("#btnEditDocumentDate"+getIndex).css("cursor","pointer");
	});

	// ---- UPDATE DATE RANGE-----//
	$(document).on("click",".btnUpdateDate",function(){
		let getIndex = $(this).attr("index");
		let getProductionID = $(this).attr("productionID");
		let getNewDate = $("#setDefaultDateSchedule"+getIndex).val();
		
		let splitDateRange =  getNewDate.split("-");
		let formatDateFrom = moment(splitDateRange[0]).format("YYYY-MM-DD");
		let formatDateTo = moment(splitDateRange[1]).format("YYYY-MM-DD");




		Swal.fire({
            title: 'UPDATE PRODUCTION DATE',
        html: `Are you sure that you really want to update the date range of the selected production?<br><br><div><b class="text-danger">Note: All entries on the previous dates will be removed if all of the dates are changed into new dates.</div>`,
            imageUrl: `${base_url}assets/modal/update.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#1A1A1A',
            confirmButtonText: 'Update',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {

                var data = new FormData();

                data.append('productionID', getProductionID);
                data.append('productionSchedule', getNewDate);
                data.append('newDateFrom', formatDateFrom);
                data.append('newDateTo', formatDateTo);
                data.append('employeeID', sessionID);

                $.ajax({
                    url           :"production/updateDateRangeDocument",
                    method        : "POST",
                    dataType      : 'text', // what to expect back from the server
                    cache         : false,
                    contentType   : false,
                    processData   : false,
                    data          : data,
                    async         : true,
                    dataType      : 'json',
                    success       : function(data){

						$("#editExistDate"+getIndex).text(getNewDate);
						$("#btnEditDocumentDate"+getIndex).attr("prevDateRange",getNewDate);
						$("#btnEditDocumentDate"+getIndex).removeAttr("style");
						$("#btnEditDocumentDate"+getIndex).css("cursor","pointer");

						myFormsContent();
		
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
                title:  `${getNewDate} successfully updated!`,
                showConfirmButton: false,
                timer: 800
              })
            }
        });
	});

	// ----- EVENT FOR OPEN NEW TAB FOR OVERTIME OR LEAVE REQUEST-----//
	$(document).on("click","#btnOvertime,#btnLeave",function(){
		let param  = $(this).attr("id");

		if(param == "btnOvertime"){
			window.open(`${base_url}hris/overtime_request`);
		}else{
			window.open(`${base_url}hris/leave_request`);
		}


	})
	// ----- EVENT FOR OPEN NEW TAB FOR OVERTIME OR LEAVE REQUEST-----//



	// ----- EVENT FOR TIME PERIOD OF MAN HOURS USED -----//
	$(document).on("change",`[name="timePeriodStart"],[name="timePeriodEnd"]`,function(){
		$parent = $(this).closest("tr");
		var dayEntries = $(".activityHeader").text().split(" ");
		var dayEntriesCheck = dayEntries.length > 0 ? dayEntries[2].slice(0, -1) : "";
		var getTimeStart = $parent.find(`[name="timePeriodStart"]`).val() || "0:00";
		var getTimeEnd = $parent.find(`[name="timePeriodEnd"]`).val() || "0:00";
		let computeHours = 0;

		computeHours = timeDiffer(getTimeStart, getTimeEnd,dayEntriesCheck) || "0:00";

		if(getTimeStart != "0:00" && getTimeEnd != "0:00"){
			$parent.find(`[name="activityManHours"]`).text(computeHours);

		}
		let checkOutputHours = $parent.find(`[name="activityManHours"]`).text();
		if(checkOutputHours != ""){
			$parent.find(`[name="activityLocation"]`).trigger("change");
		}
		
	})



	// ---- EVENT FOR CLIENT OPTION -----//
	$(document).on("change",`[name="activityClient"]`,function(){
		var clientID = $('option:selected', this).val();
		$(`[name=activityID]`).each(function(i, obj) {
			let clientD = $(this).val();
			$(this).html(getClientList(clientD));
		}) 

		
        $(this).closest("tr").find(`[name=activityProject]`).each(function(i, obj) {
			let projectID = $(this).val();
			$(this).html(getprojectList(projectID,true,clientID));
		}) 
	
	})



	// ----- FORM BUTTONS -----
	function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
		let button = "";
		if (data) {
			let {
				productionID     = "",
				productionStatus = "",
				employeeID         = "",
				approversID        = "",
				approversDate      = "",
				createdAt          = new Date
			} = data && data[0];

			let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
			if (employeeID === sessionID) {
				if (productionStatus == 0 || isRevise) {
					// DRAFT
					// button = `
					// <button 
					// 	class="btn px-5 py-2" 
					// 	id="btnSubmit" 
					// 	productionID="${encryptString(productionID)}"
					// 	code="${getFormCode("PDN", createdAt, productionID)}"
					// 	revise="${isRevise}"
					// 	cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
					// 	Submit
					// </button>`;

					if (isRevise) {
						// button += `
						// <button type="button" 
						// 	class="btn btn-cancel btnCancel px-5 p-2" 
						// 	id="btnCancel"
						// 	productionID="${encryptString(productionID)}"
						// 	code="${getFormCode("PDN", createdAt, productionID)}"
						// 	revise="${isRevise}"
						// 	cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
						// 	Cancel
						// </button>`;

						button += `
						<button
						type="button"
							class="btn btn-submit px-5 py-2" 
							id="btnSubmit" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"
							revise="${isRevise}"
							cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
							Submit
						</button>`;
					} else {
						// button += `
						// <button type="button" 
						// 	class="btn btn-cancel px-5 p-2"
						// 	id="btnCancelForm" 
						// 	productionID="${encryptString(productionID)}"
						// 	code="${getFormCode("PDN", createdAt, productionID)}"
						// 	revise=${isRevise}><i class="fas fa-ban"></i> 
						// 	Cancel
						// </button>`;
					}
				} else if (productionStatus == 1) {
					// FOR APPROVAL
					if (!isOngoing) {
						button = `
						<button type="button" 
							class="btn btn-cancel  px-5 p-2"
							id="btnCancelForm" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"
							status="${productionStatus}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				} else if (productionStatus == 2) {
					// DROP
					// button = `
					// <button type="button" 
					// 	class="btn btn-cancel px-5 p-2"
					// 	id="btnDrop" 
					// 	productionID="${encryptString(productionID)}"
					// 	code="${getFormCode("PDN", createdAt, productionID)}"
					// 	status="${productionStatus}"><i class="fas fa-ban"></i> 
					// 	Drop
					// </button>`;
				} else if (productionStatus == 3) {
					// DENIED - FOR REVISE
					if (!isDocumentRevised(productionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"
							status="${productionStatus}"
							cancel ="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				} else if (productionStatus == 4) {
					// CANCELLED - FOR REVISE
					if (!isDocumentRevised(productionID)) {
						button = `
						<button
							class="btn btn-cancel px-5 p-2"
							id="btnRevise" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"
							status="${productionStatus}"
							cancel="true"><i class="fas fa-clone"></i>
							Revise
						</button>`;
					}
				}
			} else {
				if (productionStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit px-5 py-2" 
							id="btnApprove" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel px-5 py-2"
							id="btnReject" 
							productionID="${encryptString(productionID)}"
							code="${getFormCode("PDN", createdAt, productionID)}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}
		} else {
			button = `
			<button 
				class="btn btn-submit px-5 py-2" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel px-5 py-2" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----


	// ----- GET LEAVE CREDIT -----
	function getLeaveCredit(employeeID = 0, leaveID = 0) {
		let data = getTableData(
			`hris_employee_leave_tbl`,
			`*`,
			`employeeID=${employeeID} AND leaveID=${leaveID}`
		);
		let {
			leaveCredit      = 0,
			leaveAccumulated = 0
		} = data && data[0];

		return Math.floor((+leaveCredit) + (+leaveAccumulated));
	}
	// ----- END GET LEAVE CREDIT -----


	// ----- SELECT LEAVE NAME -----
	$(document).on("change", `[name="leaveID"]`, function() {
		const leaveID = $(this).val();
		const leaveCredit = getLeaveCredit(sessionID, leaveID);
		$(`[name="leaveRequestRemainingLeave"]`).val(leaveCredit);
		$("#leaveRequestDate").trigger("change");
	})
	// ----- END SELECT LEAVE NAME -----



	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false,isOverView =false) {
		$("#page_content").html(preloader);
		if (!isForm) {
			// preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                    <div class="" id="tableForApprovalParent">
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="" id="tableMyFormsParent">
                    </div>
                </div>
            </div>`;
			$("#page_content").html(html);

			headerButton(true, "Add Leave Request");
			headerTabContent();
			myFormsContent();
			updateURL();
		} else {

			if(isOverView){
				headerButton(false, "", isRevise, isFromCancelledDocument);
				headerTabContent(false);
				overViewContent(data, readOnly, isRevise, isFromCancelledDocument)
			}else{
				headerButton(false, "", isRevise, isFromCancelledDocument);
				headerTabContent(false);
				formContent(data, readOnly, isRevise, isFromCancelledDocument);
			}
		
		}
	}
	viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
	// ----- END PAGE CONTENT -----

	// ----- UPDATE TABLE  -----
    function updateTableItems() {
        $("#activityTableBody tr").each(function(i) {
            // ROW ID
			$(this).attr("id", `tableRow${i}`);
			$(this).attr("index", `${i}`);

			// CHECKBOX
			$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);

            // TIME START
            $(`td .activityTimeStartPeriodParent [name="timePeriodStart"]`, this).attr("id", `timePeriodStart${i}`);
            $(`td .activityTimeStartPeriodParent .invalid-feedback`, this).attr("id", `invalid-timePeriodStart${i}`);

			// TIME END
            $(`td .activityTimeEndPeriodParent [name="timePeriodEnd"]`, this).attr("id", `timePeriodEnd${i}`);
            $(`td .activityTimeEndPeriodParent .invalid-feedback`, this).attr("id", `invalid-timePeriodEnd${i}`);

            // LOCATION
            $(`td .activityLocationParent [name="activityLocation"]`, this).attr("id", `activityLocation${i}`);
            $(`td .activityLocationParent .invalid-feedback`, this).attr("id", `invalid-activityLocation${i}`);

			// CLASS
            $(`td .activityClassParent [name="activityClass"]`, this).attr("id", `activityClass${i}`);
            $(`td .activityClassParent .invalid-feedback`, this).attr("id", `invalid-activityClass${i}`);

			// PROJECT
            $(`td .activityProjectParent [name="activityProject"]`, this).attr("id", `activityProject${i}`);
            $(`td .activityProjectParent .invalid-feedback`, this).attr("id", `invalid-activityProject${i}`);

			// CLIENT
            $(`td .activityClientParent [name="activityClient"]`, this).attr("id", `activityClient${i}`);
            $(`td .activityClientParent .invalid-feedback`, this).attr("id", `invalid-activityClient${i}`);

			// ACTIVITY DESCRIPTION
            $(`td .activityDescriptionParent [name="activityDescription"]`, this).attr("id", `activityDescription${i}`);
            $(`td .activityDescriptionParent .invalid-feedback`, this).attr("id", `invalid-activityDescription${i}`);

			// ACTIVITY STATUS
            $(`td .activityStatusParent [name="activityStatus"]`, this).attr("id", `activityStatus${i}`);
            $(`td .activityStatusParent .invalid-feedback`, this).attr("id", `invalid-activityStatus${i}`);

			// ACTIVITY MAN HOURS
            $(`td .activityManHoursParent [name="activityManHours"]`, this).attr("id", `activityManHours${i}`);
            $(`td .activityManHoursParent .invalid-feedback`, this).attr("id", `invalid-activityManHours${i}`);
        })
    }
    // ----- END UPDATE TABLE  -----

	// ----- TIME DIFFER COMPUTATION ---//

	function timeDiffer(start, end,dayEntries) {
		start = start.split(":");
		end = end.split(":");
		var startDate = new Date(0, 0, 0, start[0], start[1], 0);
		var endDate = new Date(0, 0, 0, end[0], end[1], 0);
		var getMiddleTime = '';
		var breakDuration = 0;
		var getMiddleDurationTime ="";
		var getSchedTimeFrom="";
		var getSchedTimeTo="";
		let getSchedule = employeeSchedule();

		getSchedule.map((sched)=> {
			let{
				mondayFrom,
				mondayTo,
				mondayBreakDuration,
				mondayStatus,

				tuesdayFrom,
				tuesdayTo,
				tuesdayBreakDuration,
				tuesdayStatus,

				wednesdayFrom,
				wednesdayTo,
				wednesdayBreakDuration,
				wednesdayStatus,

				thursdayFrom,
				thursdayTo,
				thursdayBreakDuration,
				thursdayStatus,

				fridayFrom,
				fridayTo,
				fridayBreakDuration,
				fridayStatus,

				saturdayFrom,
				saturdayTo,
				saturdayBreakDuration,
				saturdayStatus,

				sundayFrom,
				sundayTo,
				sundayBreakDuration,
				sundayStatus
			} = sched;

				let dayArr = [`monday`,`tuesday`,`wednesday`,`thursday`,`friday`,`saturday`,`sunday`];
				let dayFromArr = [mondayFrom,tuesdayFrom,wednesdayFrom,thursdayFrom,fridayFrom,saturdayFrom,sundayFrom];
				let dayToArr = [mondayTo,tuesdayTo,wednesdayTo,thursdayTo,fridayTo,saturdayTo,sundayTo];
				let dayBreakArr = [mondayBreakDuration,tuesdayBreakDuration,wednesdayBreakDuration,thursdayBreakDuration,fridayBreakDuration,saturdayBreakDuration,sundayBreakDuration];
				let dayStatusArr = [mondayStatus,tuesdayStatus,wednesdayStatus,thursdayStatus,fridayStatus,saturdayStatus,sundayStatus];
			
			for(var loop =0;loop<7;loop++){

				// console.log(dayEntries.toLowerCase() +"=="+ dayArr[loop])

				if(dayEntries.toLowerCase() == dayArr[loop]){

					tmpStart = dayFromArr[loop].split(":");
					tmpEnd = dayToArr[loop].split(":");

					let tmpStartDate = new Date(0, 0, 0, tmpStart[0], tmpStart[1], 0);
					let tmpEndDate = new Date(0, 0, 0, tmpEnd[0], tmpEnd[1], 0);
					
					var tmpDiff = tmpEndDate.getTime() - tmpStartDate.getTime();
					var tmpHours = Math.floor(tmpDiff  / 1000 / 60 / 60);
					tmpDiff -= tmpHours * 1000 * 60 * 60;
					var tmpMinutes = Math.floor(tmpDiff / 1000 / 60);
					var tmpComputeHour = ((parseFloat(tmpHours) - parseFloat(dayBreakArr[loop]))/2).toFixed(0) +":"+ (parseFloat((tmpMinutes/60))).toFixed(0);
					var tmpComputeDurationHour = ((parseFloat(tmpHours))/2).toFixed(0) +":"+ (parseFloat((tmpMinutes/60))).toFixed(0);

					getMiddleTime = moment(dayFromArr[loop], '"HH:mm"').add(moment.duration(tmpComputeHour)).format('HH:mm');
					getMiddleDurationTime = moment(dayFromArr[loop], '"HH:mm"').add(moment.duration(tmpComputeDurationHour)).format('HH:mm');
					breakDuration = dayBreakArr[loop];

					 getSchedTimeFrom = dayFromArr[loop];
					 getSchedTimeTo = dayToArr[loop];
				}
			}
		})
	
		

		var diff = endDate.getTime() - startDate.getTime();
		var hours = Math.floor(diff  / 1000 / 60 / 60);
		diff -= hours * 1000 * 60 * 60;
		var minutes = Math.floor(diff / 1000 / 60);

		let splitcheckTime = getMiddleTime.split(":");
		let getNewCheckBrekTime = new Date(0, 0, 0, splitcheckTime[0], splitcheckTime[1], 0);

		let splitDurationTime = getMiddleDurationTime.split(":");
		let getNewBreakDurationTime = new Date(0, 0, 0, splitDurationTime[0], splitDurationTime[1], 0);

		console.log(startDate)
		console.log(endDate)

		console.log("splitcheckTime " +splitcheckTime)
		console.log("splitDurationTime " +splitDurationTime)

	
		// check lunch time // 
		

		let checkDurationTimeStart = moment(startDate).isBetween(getNewCheckBrekTime,getNewBreakDurationTime,null,'[]');
		let checkDurationTimeEnd = moment(endDate).isBetween(getNewCheckBrekTime,getNewBreakDurationTime,null,'[]');

		console.log("checkDurationTimeStart " + checkDurationTimeStart)
		console.log("checkDurationTimeEnd " +checkDurationTimeEnd)

		// var lunchFrom = new Date(0, 0, 0, 12, 0, 0);
		// var lunchTo = new Date(0, 0, 0, 13, 0, 0);
		// let checkDurationTimeStart = moment(startDate).isBetween(lunchFrom,lunchTo,null,'[]');
		// let checkDurationTimeEnd = moment(endDate).isBetween(lunchFrom,lunchTo,null,'[]');
		// end  check lunch time // 

		//check include lunch time//
		let splitschedTimeFrom = getSchedTimeFrom.split(":");
		let splitschedTimeTo = getSchedTimeTo.split(":");
		var schedTimeFrom = new Date(0, 0, 0, splitschedTimeFrom[0], splitschedTimeFrom[1], 0);
		var schedTimeTo = new Date(0, 0, 0, splitschedTimeTo[0], splitschedTimeTo[1], 0);
		let checkIncludeLunchTimeStart = moment(startDate).isBetween(schedTimeFrom,schedTimeTo,null,'[]');
		let checkIncludeLunchTimeEnd = moment(endDate).isBetween(schedTimeFrom,schedTimeTo,null,'[]');

		console.log("checkIncludeLunchTimeStart " + checkIncludeLunchTimeStart)
		console.log("checkIncludeLunchTimeEnd " + checkIncludeLunchTimeEnd)
		//end check include lunch time//
	
		// if(checkDurationTimeStart &&  checkDurationTimeEnd ){
			
		// 	var totalHours = (parseFloat(hours - 1) + parseFloat((minutes/60))).toFixed(2);

		// }else{

		// 	if(checkDurationTimeStart){
		// 		var totalHours =  (parseFloat(hours -1) + parseFloat((minutes/60))).toFixed(2);
		// 	}else{
		// 		if(checkIncludeLunchTimeStart && checkIncludeLunchTimeEnd){
		// 			var totalHours =  (parseFloat(hours-1) + parseFloat((minutes/60))).toFixed(2);
		// 		}else{
		// 			var totalHours =  (parseFloat(hours) + parseFloat((minutes/60))).toFixed(2);
		// 		}
		// 	}
		// }

		if(checkDurationTimeStart &&  checkDurationTimeEnd ){
			
			var totalHours = (parseFloat(hours - 1) + parseFloat((minutes/60))).toFixed(2);

		}else{

			if(checkDurationTimeStart){
				var totalHours =  (parseFloat(hours -1) + parseFloat((minutes/60))).toFixed(2);
			}else{
				if(checkIncludeLunchTimeStart || checkIncludeLunchTimeEnd){
					var totalHours =  (parseFloat(hours-1) + parseFloat((minutes/60))).toFixed(2);
				}else{
					var totalHours =  (parseFloat(hours) + parseFloat((minutes/60))).toFixed(2);
				}
			}
		}

		return  totalHours > 0 ? totalHours : "0.00";
	}

	// ----- TIME DIFFER COMPUTATION ---//


	// ----- GET ITEM ROW -----
    function getItemRow(data = false, readOnly = false,productionID =0,productionEntriesID=0,getDateEntries="",getDayEntries="",productionStatus=0) {
        
		const {
			productionActivityID,
            // productionEntriesID    = "",
            // productionID     = "",
            // dateEntries    = "",
            // dayEntries      = "",
            timeStart   = "",
            timeEnd = "",
            activityLocation = "",
            activityClass = "",
            activityProject = "",
            activityProjectName = "",
            activityClient = "",
            activityClientName = "",
            activityDescription = "",
            activityStatus = "",
            activityHours = 0,
			leaveRequestID = 0,
			overtimeRequestID = 0,
            createdBy = 0,
            updatedBy = 0
        } = data;

			// var newDescription = '';
			// if(activityDescription){
			// 	let explode = activityDescription.split(";");
			// 	var getLength = explode.length || 0;
			// 	for(var loop = 0; loop<explode.length;loop++){
	
			// 		if( loop == getLength-1){
			// 			newDescription += explode[loop];
			// 		}else{
			// 			newDescription += explode[loop]+"<br>";
			// 		}
			// 	}
			// }else{
			// 	newDescription = activityDescription;
			// }

	

		
		let statusBadgeRow = '';

		if(activityStatus == "Pending"){
			statusBadgeRow ='<span class="badge badge-warning w-100">Pending</span>';
		}else if(activityStatus == "Done"){
			statusBadgeRow ='<span class="badge badge-success w-100">Done</span>';
		}else if(activityStatus == "Overdue"){
			statusBadgeRow ='<span class="badge badge-danger w-100">Overdue</span>';

		}else{
			statusBadgeRow ='';
		}

        let html = "";
        if (readOnly) {
            html += `
            <tr>
                <td>
                    <small> ${moment(timeStart, 'HH:mm').format('hh:mm A')  || "-"} </small>
                </td>
				<td>
                    <small> ${moment(timeEnd, 'HH:mm').format('hh:mm A') || "-"} </small>
                </td>
				<td>
                    <small>${formatAmount(activityHours)} </small>
                </td>
				<td>
                    <small> ${activityLocation == null || activityLocation ==""  ?  "-" : activityLocation} </small>
                </td>
				<td>
                    <small> ${activityClass || "-"} </small>
                </td>
				<td>
                    <small> ${activityClientName || "-"} </small>
                </td>
				<td>
                   <small> ${activityProjectName || "-"}</small>
                </td>
				<td>
                    <small>${ activityDescription ||""} </small>
                </td>
				
				
            </tr>`;

			// <td>
            //         <small>${statusBadgeRow || "-"} </small>
            //     </td>
        } else {

			// if(productionStatus != 0){
				// html += `
				// <tr>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
				// 	<td>
				// 		${"-"}
				// 	</td>
					
				  
				// </tr>`;


			// }else{
				html += `
				<tr>
					 <td class="text-center">
						<div class="action">
						${leaveRequestID != 0 || overtimeRequestID != 0 ? `` : `<input type="checkbox" class="checkboxrow">`}
						</div>
					</td>
	
					<td>
						<div class="form-group mb-0 activityTimeStartPeriodParent">
						${leaveRequestID != 0 || overtimeRequestID != 0 ? `${timeStart || "-"}` : `<input type="time" class="form-control text-center " name="timePeriodStart" id="timePeriodStart0"  value="${timeStart}" productionID="${productionID}" productionEntriesID="${productionEntriesID}" productionActivityID="${productionActivityID || 0}" getDateEntries="${getDateEntries}" getDayEntries="${getDayEntries}"  >
						<div class="d-block invalid-feedback"></div>` }
							
						</div>
					</td>
	
					<td>
						<div class="form-group mb-0 activityTimeEndPeriodParent">
							${leaveRequestID != 0 || overtimeRequestID != 0 ? `${timeEnd || "-"}` : `<input type="time" class="form-control text-center " name="timePeriodEnd" id="timePeriodEnd0" value="${timeEnd}" >
							<div class="d-block invalid-feedback"></div>` }
	
						</div>
					</td>

					<td>
						<div class="form-group mb-0 activityManHoursParent text-center">
							<span name="activityManHours"  id="activityManHours0">${activityHours || "0.00"}</span>
						</div>
					</td>
					
	
					<td>
						<div class="form-group mb-0 activityLocationParent">
						${leaveRequestID != 0 || overtimeRequestID != 0 ? `${activityLocation != "null" ? activityLocation  : ""}` 
						: `<input type="text" 
						class="form-control text-center autoSaved validate" 
						name="activityLocation" 
						id="activityLocation0"
						data-allowcharacters="[a-z][A-Z][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][[][]][ ]"
                        minlength="1"
                        maxlength="75"
						value="${activityLocation == null || activityLocation == "" ? "" : activityLocation}" >
						<div class="d-block invalid-feedback"></div>`}
							
						</div>
					</td>
					
					<td>
						<div class="form-group  mb-0 activityClassParent">

						${leaveRequestID != 0 || overtimeRequestID != 0 ? `${activityClass || "-" }` : `<select class="form-control validate select2 autoSaved" name="activityClass" id="activityClass0">
						<option selected>Please select a category</option>
						<option value="Billable" ${activityClass == "Billable" ? "selected" : ""}>
							Billable
						</option>
						<option value="Non-Billable" ${activityClass == "Non-Billable" ? "selected" : ""}>
							Non-billable
						</option>
					</select>
					<div class="d-block invalid-feedback"></div>` }
							
						</div>
					</td>
	
					<td>
						<div class="form-group  mb-0 activityClientParent">

						${leaveRequestID != 0 || overtimeRequestID != 0 ? `${activityClientName || "-"}` : `<select class="form-control validate select2 autoSaved" name="activityClient" id="activityClient0" >
							
						${getClientList(activityClient)}
					</select>
					<div class="d-block invalid-feedback"></div>` }
							
						</div>
					</td>
	
					<td>
						<div class="form-group  mb-0 activityProjectParent">
							${leaveRequestID != 0 || overtimeRequestID != 0 ? `${activityProjectName || "-"}` : `<select class="form-control validate select2 autoSaved" name="activityProject" id="activityProject0">
							${getprojectList(activityProject,true,activityClient)}
						</select>
						<div class="d-block invalid-feedback"></div>`}
							
						</div>
					</td>
	
					<td>
						<div class="form-group mb-0 activityDescriptionParent">
							${leaveRequestID != 0 || overtimeRequestID != 0 ? `<small>${ activityDescription ||""}</small>` : `<textarea rows="2" class="form-control validate autoSaved" name="activityDescription" id="activityDescription0"
							data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][[][]][ ]" minlength="2"
							maxlength="325"  >${ activityDescription ||""}</textarea>`}
							<div class="d-block invalid-feedback"></div>
						</div>
					</td>
	
					
	
					
				</tr>`;
				// <td>
				// 		<div class="form-group  mb-0 activityStatusParent">

				// 		${leaveRequestID != 0 || overtimeRequestID != 0 ? `${activityStatus || "-"}` : `<select class="form-control validate select2 autoSaved" name="activityStatus"  id="activityStatus0">
				// 		<option disabled selected>Select Status</option>
				// 		<option value="Pending" ${activityStatus == "Pending" ? "selected" : ""}>
				// 			Pending
				// 		</option>
				// 		<option value="Done" ${activityStatus == "Done" ? "selected" : ""}>
				// 			Done
				// 		</option>
				// 		<option value="Overdue" ${activityStatus == "Overdue" ? "selected" : ""}>
				// 			Overdue
				// 		</option>
				// 	</select>
				// 	<div class="d-block invalid-feedback"></div>`}
							
				// 		</div>
				// 	</td>
			// }
      
        }
		
        return html;
    }
    // ----- END GET ITEM ROW -----

	// ----- DELETE TABLE ROW -----
	function deleteTableRow() {
		if ($(`.checkboxrow:checked`).length != $(`.checkboxrow`).length) {
			Swal.fire({
				title:              "DELETE ROW",
				text:               "Are you sure that you want to delete the selected row/s?",
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
							updateTableItems();
							updateDeleteButton();
							// updateTotalAmount();
							let getproductionActivityID = tableRow.find(`[name="timePeriodStart"]`).attr("productionActivityID") || 0;
							updateDatabaseRow("delete",getproductionActivityID);
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have at least one or more activity.");
		}
	}
	// ----- END DELETE TABLE ROW -----


    // ----- UPDATE DELETE BUTTON -----
	function updateDeleteButton() {
		let checkedCount = 0;
		$(".checkboxrow").each(function() {
			this.checked && checkedCount++;
		})
		$(".btnDeleteRow").attr("disabled", checkedCount == 0);
	}
	// ----- END UPDATE DELETE BUTTON -----



	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			productionID 				= "",
			reviseProductionID        = "",
			productionCode 			= "",
			employeeID 					= "",

			productionReason			= "",
			approversID 				= "",
			approversStatus 			= "",
			approversDate 				= "",
			productionStatus 			= false,
			submittedAt 				= false,
			createdAt 					= false,
			entries =[]
		} = data && data[0];


		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		// readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("productionID", productionID ? encryptString(productionID) : "");
		$("#btnBack").attr("code", getFormCode("PDN", moment(createdAt), productionID));
		$("#btnBack").attr("status", productionStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);

		let disabled = readOnly ? "disabled" : "";
		let button   = formButtons(data, isRevise, isFromCancelledDocument);

		let reviseDocumentNo    = isRevise ? productionID : reviseProductionID;
		let documentHeaderClass = isRevise || reviseProductionID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseProductionID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseProductionID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PDN", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";

		let tableCheckbox = !readOnly ? `
        <th class="text-center">
            <div class="action">
                <input type="checkbox" class="checkboxall">
            </div>
        </th>` : "";

		let buttonAddDeleteRow = !readOnly ? `
        <div class="w-100 text-left my-2">
            <button type="button" class="btn btn-primary btnAddRow" id="btnAddRow" productionID="${entries[0].productionID}" productionEntriesID="${entries[0].productionEntriesID}" getDateEntries="${entries[0].dateEntries}" getDayEntries="${entries[0].dayEntries}"><i class="fas fa-plus-circle"></i> Add Row</button>
            <button type="button" class="btn btn-danger btnDeleteRow" id="btnDeleteRow" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
        </div>` : "";


		let buttonRequest = !readOnly ? `
        <div class="w-100 text-left my-2">
            <button type="button" class="btn btn-outline-secondary " id="btnOvertime"><i class="fas fa-clock"></i> Overtime Request</button>
            <button type="button" class="btn btn-outline-secondary" id="btnLeave"><i class="fas fa-calendar-times"></i> Leave Request</button>
        </div>` : "";

		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${productionID && !isRevise ? productionCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${productionStatus && !isRevise ? getStatusStyle(productionStatus) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentDateClass}">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(productionStatus, approversID, approversDate)}
							</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">
							${productionReason ? productionReason : "---"}
						</h6>      
                    </div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="${employeeDesignation}">
                </div>
            </div>

        </div>

		 

        <div class="row card-body" id="form_leave_request">
            
				<div class=" card-body col-sm-12 col-md-12 col-lg-2 col-xl-2 p-2 text-left">
					<h6 class="bg-primary text-light p-3"><strong>Production Dates</strong></h6>
					<div style="height: 510px;overflow-y: scroll;">`;

					
					entries.map((entry,index) =>{
						let {
							productionEntriesID,
							productionID,
							dateEntries,
							dayEntries,
							dateCredited
						} = entry;
						
						html +=`
							<div class="card my-0 entries ${index == 0 ? `bg-secondary text-white` : ''}"  style="box-shadow: none !important;cursor:pointer;" productionID ="${productionID}"  productionEntriesID ="${productionEntriesID}" isreadOnly="${readOnly}" getDateEntries="${dateEntries}" getDayEntries="${dayEntries}" productionStatus="${productionStatus}">
								<div class="card-body p-2" style="border: 1px black double;" >
									<div><span class="card-title" style="font-weight:600;">${moment(dateEntries).format("MMMM DD, YYYY")}</span></div>
									<small class="card-text" style="font-weight:800;">${dayEntries}</small>
								</div>
							</div>
						`;
					})

    html += `</div>
		</div>

				
			

			<div class=" card-body col-sm-12 col-md-12 col-lg-10 col-xl-10 p-2 text-left">
					<h6 class="bg-primary text-light p-3 mb-3"><strong class="activityHeader">VIEW ACTIVITIES: ${entries[0].dayEntries}, ${moment(entries[0].dateEntries).format("MMMM DD, YYYY")}</strong></h6>
					<table class="table table-bordered table-striped table-hover" id="${!readOnly ? "tableForActivity" : "tableForActivity0"}">
						<thead>
							<tr style="white-space: nowrap">
								${tableCheckbox}
								<th>Start Time</th>
								<th>End Time</th>
								<th>Hours</th>
								<th>Location</th>
								<th>Category</th>
								<th>Client</th>
								<th>Project</th>
								<th>Activity</th>
								
							</tr>
						</thead>
						<tbody class="activityTableBody" id="activityTableBody">
			`;
			// <th>Status</th>

						let getActivities = getTableData(`hris_production_activity_tbl`,'',`productionEntriesID = ${entries[0].productionEntriesID}`);
						if(getActivities.length >0){
							getActivities.map((entry)=>{
								html +=`${getItemRow(entry,readOnly,entries[0].productionID,entries[0].productionEntriesID,entries[0].dateEntries,entries[0].dayEntries)}`;
							})
						}else{
								html+=`${getItemRow('',false,entries[0].productionID,entries[0].productionEntriesID,entries[0].dateEntries,entries[0].dayEntries)}`;
						}
	html +=`			</tbody>
					</table>

					<div class="d-flex flex-column justify-content-start text-left my-2">
                        ${buttonAddDeleteRow}
                    </div>
					<div>
					<hr class="w-100">
					<div class="row">
						<div class="col-6" style="text-align-last: start;">
						${buttonRequest}
						</div>

						<div class="col-6" style="text-align-last: end;">
							${button}
						</div>
					</div>
					</div>
				</div>
          
        </div>
		<div class="approvers">
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			let leaveRequestData = getTableData(
				"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
				"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_leave_request_tbl.createdAt AS dateCreated",
				`hris_leave_request_tbl.employeeID = ${sessionID}`,
				`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
			);
			leaveRequestData.map(leave => {
				let {
					productionID,
					leaveRequestDate,
					leaveRequestStatus
				} = leave;
				let unique = {
					id: productionID,
					leaveRequestDate,
				};
				(leaveRequestStatus == 1 || leaveRequestStatus == 2) && uniqueData.push(unique);
			})
			$("#page_content").html(html);
		
			initDataTables();
            initDataTablesForActivity();
			updateTableItems();
			// updateClientOptions();
			// updateProjectOptions();
			initAll();
			// $('.js-example-basic-multiple'+date_counter).select2({dropdownAutoWidth : true});
			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			// ----- END NOT ALLOWED FOR UPDATE -----

			return html;
		}, 300);
	}
	// ----- END FORM CONTENT -----

	// ----- OVERVIEW CONTENT -----
	function overViewContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
		$("#page_content").html(preloader);
		readOnly = isRevise ? false : readOnly;

		let {
			productionID 				= "",
			reviseProductionID        = "",
			productionCode 			= "",
			employeeID 					= "",
			productionSchedule			="",
			productionReason			= "",
			approversID 				= "",
			approversStatus 			= "",
			approversDate 				= "",
			productionStatus 			= false,
			submittedAt 				= false,
			createdAt 					= false,
			entries =[]
		} = data && data[0];


		// ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? employeeID : sessionID);
		// ----- END GET EMPLOYEE DATA -----

		// readOnly ? preventRefresh(false) : preventRefresh(true);

		$("#btnBack").attr("productionID", productionID ? encryptString(productionID) : "");
		$("#btnBack").attr("code", getFormCode("PDN", moment(createdAt), productionID));
		$("#btnBack").attr("status", productionStatus);
		$("#btnBack").attr("employeeID", employeeID);
		$("#btnBack").attr("cancel", isFromCancelledDocument);


		let reviseDocumentNo    = isRevise ? productionID : reviseProductionID;
		let documentHeaderClass = isRevise || reviseProductionID ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
		let documentDateClass   = isRevise || reviseProductionID ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
		let documentReviseNo    = isRevise || reviseProductionID ? `
		<div class="col-lg-4 col-md-4 col-sm-12 px-1">
			<div class="card">
				<div class="body">
					<small class="text-small text-muted font-weight-bold">Revised Document No.</small>
					<h6 class="mt-0 text-danger font-weight-bold">
						${getFormCode("PDN", createdAt, reviseDocumentNo)}
					</h6>      
				</div>
			</div>
		</div>` : "";


		let html = `
        <div class="row px-2">
			${documentReviseNo}
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${productionID && !isRevise ? productionCode : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentHeaderClass}">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${productionStatus && !isRevise ? getStatusStyle(productionStatus) : "---"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="${documentDateClass}">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${submittedAt && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
								${getDateApproved(productionStatus, approversID, approversDate)}
							</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">
							${productionReason ? productionReason : "---"}
						</h6>      
                    </div>
                </div>
            </div>

			<div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" class="form-control" disabled value="${employeeFullname}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" class="form-control" disabled value="${employeeDepartment}">
                </div>
            </div>

            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" class="form-control" disabled value="${employeeDesignation}">
                </div>
            </div>
        </div>

    
            
		<div class=" card-body col-sm-12 col-md-12 col-lg-12 col-xl-12 p-2 text-left">
					<hr class="w-100">
					<h6 class="bg-primary text-light p-3 mb-3"><strong class="activityHeader">Covered Dates:  ${productionSchedule}</strong></h6>
					<div class="table-responsive">
						<table class="table table-bordered table-striped" id="tableListActivity">
							<thead>
								<tr style="white-space: nowrap">
								
									<th>Start Time</th>
									<th>End Time</th>
									<th>Location</th>
									<th>Category</th>
									<th>Client/Project</th>
									<th>Activity</th>
									
									<th>Hours</th>
								</tr>
							</thead>
							<tbody class="" id="">`;
							// <th>Status</th>

						
							var manHoursTotal = 0;	
							entries.map((entry)=>{
								const {
									productionEntriesID,
									dateEntries,
									dayEntries
								} = entry;
								
								let manHoursSubtotal = 0; 
								let getActivities = getTableData(`hris_production_activity_tbl`,'',`productionEntriesID = ${productionEntriesID}`);
								getActivities.filter(activity => activity.dateEntries == dateEntries).map((activity)=>{
								
									const {
										dateEntries   = "",
										timeStart   = "",
										timeEnd = "",
										activityLocation = "",
										activityClass = "",
										activityProject = "",
										activityProjectName = "",
										activityClient = "",
										activityClientName = "",
										activityDescription = "",
										activityStatus = "",
										activityHours = 0,
										leaveRequestID = 0,
										overtimeRequestID = 0,
									} = activity;

									// var newDescription = '';
									// if(activityDescription){
									// 	let explode = activityDescription.split(";");
									// var getLength = explode.length || 0;
									// for(var loop = 0; loop<explode.length;loop++){
						
									// 	if( loop == getLength-1){
									// 		newDescription += explode[loop];
									// 	}else{
									// 		newDescription += explode[loop]+"<br>";
									// 	}
									// }
									// }else{
									// 	newDescription = activityDescription;
									// }
									

									let statusBadgeRow = '';

									if(activityStatus == "Pending"){
										statusBadgeRow ='<span class="badge badge-warning w-100">Pending</span>';
									}else if(activityStatus == "Done"){
										statusBadgeRow ='<span class="badge badge-success w-100">Done</span>';
									}else if(activityStatus == "Overdue"){
										statusBadgeRow ='<span class="badge badge-danger w-100">Overdue</span>';

									}else{
										statusBadgeRow ='';
									}

									html += `
									<tr>
										<td>
											<small> ${ timeStart ? moment(timeStart, 'HH:mm').format('hh:mm A')  : "-"} </small>
										</td>
										<td>
											<small> ${ timeEnd ? moment(timeEnd, 'HH:mm').format('hh:mm A') : "-"} </small>
										</td>
										<td>
											<small> ${activityLocation || "-"} </small>
										</td>
										<td>
											<small> ${activityClass || "-"} </small>
										</td>
										<td>
											<div> ${activityClientName || "-"} </div>
											<small> ${activityProjectName || "-"}</small>
										</td>
										<td>
											<small>${ activityDescription ||""} </small>
										</td>
										
										<td class="text-center">
											<small>${formatAmount(activityHours)} </small>
										</td>
									
									</tr>`;
									// <td>
									// 		<small>${statusBadgeRow || "-"} </small>
									// 	</td>

									manHoursSubtotal += parseFloat(activityHours) || 0;
									manHoursTotal += manHoursSubtotal || 0;
								})


								
								html += `
								<tr class="bg-success">
									<td colspan="6">
										<small class=" text-light p-3 mb-3"><strong class="activityHeader">${dayEntries}, ${moment(dateEntries).format("MMMM DD, YYYY")}</strong> </small>
									</td>
									<td class="text-center text-white">
										<small><strong>${formatAmount(manHoursSubtotal)}</strong></small>
									</td>
								
								</tr>`;
							})
		html +=`			</tbody>
						</table>
					</div>	
						<small class="float-right"><strong>Total Hours: ${formatAmount(manHoursTotal)}</strong></small>
					<div>
					</div>
				</div>
          

		<div class="approvers">
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			let leaveRequestData = getTableData(
				"hris_leave_request_tbl LEFT JOIN hris_employee_list_tbl USING(employeeID)",
				"hris_leave_request_tbl.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, hris_leave_request_tbl.createdAt AS dateCreated",
				`hris_leave_request_tbl.employeeID = ${sessionID}`,
				`FIELD(leaveRequestStatus, 0, 1, 3, 2, 4), COALESCE(hris_leave_request_tbl.submittedAt, hris_leave_request_tbl.createdAt)`
			);
			leaveRequestData.map(leave => {
				let {
					productionID,
					leaveRequestDate,
					leaveRequestStatus
				} = leave;
				let unique = {
					id: productionID,
					leaveRequestDate,
				};
				(leaveRequestStatus == 1 || leaveRequestStatus == 2) && uniqueData.push(unique);
			})
			$("#page_content").html(html);
		
			initDataTables();
            initDataTablesForActivity();
			updateClientOptions();
			// updateProjectOptions();
			initAll();
			// $('.js-example-basic-multiple'+date_counter).select2({dropdownAutoWidth : true});
			// ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				// $('#btnBack').attr("status", "2");
				// $(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			// ----- END NOT ALLOWED FOR UPDATE -----

			return html;
		}, 300);
	}
	// ----- END OVERVIEW CONTENT -----

	// $(document).on("change", "#leaveWorkingDay", function() {
	// 	var workDay = $("#leaveWorkingDay option:selected").val();
	// 	var numberOfDays = $("#leaveRequestNumberOfDate").attr("numberofdays");
	// 	if(workDay =="0"){
	// 		var countnumber = (parseInt(numberOfDays) - 0.5);
	// 		$("#leaveRequestNumberOfDate").val(countnumber);
	// 	}else{
	// 		$("#leaveRequestNumberOfDate").val(numberOfDays);
	// 	}
	// });	

	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_leave_request", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const approversID = method != "approve" && moduleApprover;

		if (action && method != "" && feedback != "") {
			data["tableData[productionStatus]"] = status;
			delete data["tableData"].activityClass;
			delete data["tableData"].activityClient;
			delete data["tableData"].activityDescription;
			delete data["tableData"].activityLocation;
			delete data["tableData"].activityProject;
			// delete data["tableData"].activityStatus;
			delete data["tableData"].timePeriodEnd;
			delete data["tableData"].timePeriodStart;
			
			data["tableData[updatedBy]"]          = sessionID;
			data["feedback"]                      = feedback;
			data["method"]                        = method;
			data["tableName"]                     = "hris_production_tbl";

			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"]  = sessionID;
				data["tableData[createdAt]"]  = dateToday();

				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"]        = sessionID;
					data["tableData[approversStatus]"]    = 2;
					data["tableData[approversDate]"]      = dateToday();
					data["tableData[productionStatus]"] = 2;
				}
			} else {
				if (status == 1) {
					data["tableData[approversID]"] = approversID;

					if (!approversID && method == "submit") {
						data["tableData[approversID]"]        = sessionID;
						data["tableData[approversStatus]"]    = 2;
						data["tableData[approversDate]"]      = dateToday();
						data["tableData[productionStatus]"] = 2;
					}
				}
				data["whereFilter"] = "productionID=" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----

	// ---- SAVED NEW ROW IN DATABASE ----//
	function updateDatabaseRow(action ="add",getproductionActivityID = 0){

		let productionID = 	$('#activityTableBody tr:last').find(`[name="timePeriodStart"]`).attr('productionID');
		let productionEntriesID = 	$('#activityTableBody tr:last').find(`[name="timePeriodStart"]`).attr('productionEntriesID');
		let getDateEntries = 	$('#activityTableBody tr:last').find(`[name="timePeriodStart"]`).attr('getDateEntries');
		let getDayEntries = 	$('#activityTableBody tr:last').find(`[name="timePeriodStart"]`).attr('getDayEntries');
		let data = {
			productionID 				: productionID,
            productionEntriesID			: productionEntriesID,
			getproductionActivityID	 	: getproductionActivityID,
            getDateEntries				: getDateEntries,
            getDayEntries				: getDayEntries,
			employeeID					: sessionID,
			action 						: action,
        };

		$.ajax({
			method:      "POST",
			url:         `production/updateDatabaseRow`,
			data,
			cache:       false,
			async:       false,
			dataType:    "json",
			beforeSend: function() {
				// $("#loader").show();
			},
			success: function(data) {
			
				let result = data.split("|");

				let isSuccess   = result[0];
				let message     = result[1];
				let insertedID  = result[2];
				let dateCreated = result[3];

				if(insertedID !="false"){
					$('#activityTableBody tr:last').find(`[name="timePeriodStart"]`).attr('productionActivityID',insertedID);
				}


				// let swalTitle;
				// if (action == "add") {
				// 	swalTitle = `${getFormCode("PDN", dateCreated, insertedID)} created successfully!`;
				// } else if (action == "update") {
				// 	swalTitle = `${getFormCode("PDN", dateCreated, insertedID)} updated successfully!`;
				// }

				// if (isSuccess == "true") {
				// 	setTimeout(() => {
				// 		$("#loader").hide();
				// 		closeModals();
				// 		// callback && callback();
				// 		Swal.fire({
				// 			icon:              "success",
				// 			title:             swalTitle,
				// 			showConfirmButton: false,
				// 			timer:             2000,
				// 		});
				// 		myFormsContent();
				// 	}, 500);
				// } else {
				// 	setTimeout(() => {
				// 		$("#loader").hide();
				// 		Swal.fire({
				// 			icon:              "danger",
				// 			title:             message,
				// 			showConfirmButton: false,
				// 			timer:             2000,
				// 		});
				// 	}, 500);
				// }
			},
			error: function() {
				setTimeout(() => {
					$("#loader").hide();
					showNotification("danger", "System error: Please contact the system administrator for assistance!");
				}, 500);
			}
		})
	}
	// ---- SAVED NEW ROW IN DATABASE ----//

	// ----- CLICK DELETE ROW -----
	$(document).on("click", ".btnDeleteRow", function(){
		deleteTableRow();
	})
	// ----- END CLICK DELETE ROW -----


	// ----- CHECKBOX EVENT -----
	$(document).on("click", "[type=checkbox]", function() {
		updateDeleteButton();
	})
	// ----- END CHECKBOX EVENT -----


	// ----- CHECK ALL -----
	$(document).on("change", ".checkboxall", function() {
		const isChecked = $(this).prop("checked");
        $(".checkboxrow").each(function(i, obj) {
            $(this).prop("checked", isChecked);
        });
		updateDeleteButton();
	})
	// ----- END CHECK ALL -----

	// ----- INSERT ROW ITEM -----
    $(document).on("click", ".btnAddRow", function() {

		var productionID = $("#btnAddRow").attr("productionID");
		var productionEntriesID = $("#btnAddRow").attr("productionEntriesID");
		var getDateEntries = $("#btnAddRow").attr("getDateEntries");
		var getDayEntries = $("#btnAddRow").attr("getDayEntries");


        let row = getItemRow('','',productionID,productionEntriesID,getDateEntries,getDayEntries);
        $("#activityTableBody").append(row);
        $(`[name="timePeriod"]`).last().focus();
		updateTableItems();
			// initAmount();
			// initQuantity();
        initSelect2();
		updateDatabaseRow("add");
    })
    // ----- END INSERT ROW ITEM ----
	
	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
		updateURL(null, true);
	});
	// ----- END OPEN ADD FORM -----


	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnOverView", function () {
		const id = decryptString($(this).attr("id"));
		viewDocument(id, true,false,false,true);
	});
	// ----- END VIEW DOCUMENT -----


	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id         = decryptString($(this).attr("leaveRequestID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise     = $(this).attr("revise") == "true";
		const employeeID = $(this).attr("employeeID");
		const feedback   = $(this).attr("code") || getFormCode("PDN", dateToday(), id);
		const status     = $(this).attr("status");

		// if (status != "false" && status != 0) {

			// if (revise) {
			// 	const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			// 	const data   = getData(action, 0, "save", feedback, id);
			// 	data["leaveRequestStatus"] = 0;
			// 	if (!isFromCancelledDocument) {
			// 		data["reviseLeaveRequestID"] = id;
			// 		data[`feedback`] = getFormCode("PDN", new Date);
			// 		delete data["leaveRequestID"];
			// 	} else {
			// 		delete data["action"];
			// 		data["leaveRequestID"] = id;
			// 		data["action"] = "update";
			// 	}

			// 	setTimeout(() => {
			// 		cancelForm(
			// 			"save", 
			// 			action,
			// 			"PRODUCTION REPORT",
			// 			"",
			// 			"form_leave_request",
			// 			data,
			// 			true,
			// 			pageContent
			// 		);
			// 	}, 0);
			// } else {
				$("#page_content").html(preloader);
				pageContent();
	
				if (employeeID != sessionID) {
					$("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
				}
			// }
		// } else {
		// 	const action   = id && feedback ? "update" : "insert";
		// 	const data     = getData(action, 0, "save", feedback, id);
		// 	data["leaveRequestStatus"] = 0;

		// 	setTimeout(() => {
		// 		cancelForm(
		// 			"save", 
		// 			action,
		// 			"PRODUCTION REPORT",
		// 			"",
		// 			"form_leave_request",
		// 			data,
		// 			true,
		// 			pageContent
		// 		);
		// 	}, 0);
		// }
	});
	// ----- END CLOSE FORM -----


	// ----- REVISE DOCUMENT -----
	$(document).on("click", "#btnRevise", function () {
		const id                    = decryptString($(this).attr("productionID"));
		const fromCancelledDocument = $(this).attr("cancel") == "true";
		viewDocument(id, false, true, fromCancelledDocument);
	});
	// ----- END REVISE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		formButtonHTML(this);
		const id           = decryptString($(this).attr("productionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise       = $(this).attr("revise") == "true";
		// const validate     = validateForm("activityTableBody");

		const validate = DocumentValidateManHours(id);
		

		if (validate) {
			const feedback = $(this).attr("code") || getFormCode("PDN", dateToday(), id);
			const action   = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
			const data     = getData(action, 1, "submit", feedback, id);

			if (revise) {
				if (!isFromCancelledDocument) {
					data[`tableData[reviseProductionID]`] = id;
					delete data[`tableData[productionID]`];
					data["feedback"] = getFormCode("PDN", new Date);
				} else {
					data[`whereFilter`] = `productionID = ${id}`;
				}
			}

			const employeeID = getNotificationEmployeeID(
				data["tableData[approversID]"],
				data["tableData[approversDate]"],
				true
			);

			let notificationData = false;
			if (employeeID != sessionID) {
				notificationData = {
					moduleID:                143,
					notificationTitle:       "Production",
					notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
					notificationType:        2,
					employeeID,
				};
			}

		
			setTimeout(() => {
				formConfirmation(
					"submit",
					action,
					"PRODUCTION",
					"",
					"form_leave_request",
					data,
					true,
					pageContent,
					notificationData,
					this
				);
			}, 300);
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END SUBMIT DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id       = decryptString($(this).attr("productionID"));
		const feedback = $(this).attr("code") || getFormCode("PDN", dateToday(), id);
		const action   = "update";
		const data     = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"PRODUCTION",
			"",
			"form_leave_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnSave, #btnCancel", function () {
		const id       = decryptString($(this).attr("productionID"));
		const isFromCancelledDocument = $(this).attr("cancel") == "true";
		const revise   = $(this).attr("revise") == "true";
		const feedback = $(this).attr("code") || getFormCode("PDN", dateToday(), id);
		const action   = revise && !isFromCancelledDocument && "insert" || (id && feedback ? "update" : "insert");
		const data     = getData(action, 0, "save", feedback);
		data[`tableData[productionStatus]`] = 0;

		if (revise) {
			if (!isFromCancelledDocument) {
				data[`feedback`] = getFormCode("PDN", new Date);
				data[`tableData[reviseProductionStatus]`] = id;
				data[`whereFilter`] = `productionID = ${id}`;
				delete data[`tableData[productionID]`];
			} else {
				data[`tableData[productionID]`] = id;
				data[`whereFilter`] = `productionID = ${id}`;
				delete data[`action`];
				data[`action`] = "update";
			}
		}

		formConfirmation(
			"save",
			action,
			"PRODUCTION",
			"",
			"form_leave_request",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----


	// ----- UPDATE EMPLOYEE LEAVE -----
	function updateEmployeeLeave(employeeID = 0, leaveID = 0, leaveCredit = 0) {
		const data = { employeeID, leaveID, leaveCredit };
		$.ajax({
			method: "POST",
			url: `leave_request/updateEmployeeLeave`,
			data,
			dataType: "json",
			success: function(data) {}
		})
	}
	// ----- END UPDATE EMPLOYEE LEAVE -----


	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		formButtonHTML(this);
		const id       = decryptString($(this).attr("productionID"));
		const feedback = $(this).attr("code") || getFormCode("PDN", dateCreated, id);
		let tableData  = getTableData("hris_production_tbl", "", "productionID = " + id);

		if (tableData) {
			let approversID     = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate   = tableData[0].approversDate;
			let createdAt       = tableData[0].createdAt;
			let employeeID      = tableData[0].employeeID;
			let productionID         = tableData[0].productionID;
			let leaveCredit     = tableData[0].leaveRequestNumberOfDate;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			let dateApproved = updateApproveDate(approversDate)
			data["tableData[approversDate]"]   = dateApproved;

			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID:                143,
					tableID:                 id,
					notificationTitle:       "Production",
					notificationDescription: `${getFormCode("PDN", createdAt, id)}: Your request has been approved.`,
					notificationType:        7,
					employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID:                143,
					tableID:                 id,
					notificationTitle:       "Production",
					notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
					notificationType:         2,
					employeeID:               getNotificationEmployeeID(approversID, dateApproved),
				};
			}

			data["tableData[productionStatus]"] = status;

			setTimeout(() => {
				formConfirmation(
					"approve",
					"update",
					"PRODUCTION",
					"",
					"form_leave_request",
					data,
					true,
					pageContent,
					notificationData,
					this,
					// status == 2 ? updateEmployeeLeave : false,
					// status == 2 ? [employeeID, productionID, leaveCredit] : []
				);
				// updateEmployeeLeave(employeeID, leaveID, leaveCredit);
			}, 300);
		}
	});
	// ----- END APPROVE DOCUMENT -----


	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id       = decryptString($(this).attr("productionID"));
		const feedback = $(this).attr("code") || getFormCode("PDN", dateToday(), id);

		$("#modal_leave_request_content").html(preloader);
		$("#modal_leave_request .page-title").text("DENY PRODUCTION");
		$("#modal_leave_request").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
					minlength="2"
					maxlength="250"
					id="productionReason"
					name="productionReason"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-productionReason"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger px-5 py-2" id="btnRejectConfirmation"
			productionID="${encryptString(id)}"
			code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel px-5 py-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_leave_request_content").html(html);
	});

	$(document).on("click", "#btnRejectConfirmation", function () {
		formButtonHTML(this);
		const id       = decryptString($(this).attr("productionID"));
		const feedback = $(this).attr("code") || getFormCode("PDN", dateToday(), id);

		const validate = validateForm("modal_leave_request");
		if (validate) {
			let tableData = getTableData("hris_production_tbl", "", "productionID = " + id);
			if (tableData) {
				let approversID     = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate   = tableData[0].approversDate;
				let employeeID      = tableData[0].employeeID;
				let createdAt       = tableData[0].createdAt;

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[productionReason]"] = $("[name=productionReason]").val().trim();
				data["tableData[approversStatus]"]       = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"]         = updateApproveDate(approversDate);

				let notificationData = {
					moduleID:                143,
					tableID: 				 id,
					notificationTitle:       "Production",
					notificationDescription: `${getFormCode("PDN", createdAt, id)}: Your request has been denied.`,
					notificationType:        1,
					employeeID,
				};

				setTimeout(() => {
					formConfirmation(
						"reject",
						"update",
						"PRODUCTION",
						"modal_leave_request",
						"",
						data,
						true,
						pageContent,
						notificationData,
						this
					);
					$(`[redirect=forApprovalTab]`).trigger("click");
				}, 300);
			} else {
				formButtonHTML(this, false);
			}
		} else {
			formButtonHTML(this, false);
		}
	});
	// ----- END REJECT DOCUMENT -----


	// ----- NAV LINK -----
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END NAV LINK -----


	// ----- APPROVER STATUS -----
	function getApproversStatus(approversID, approversStatus, approversDate) {
		let html = "";
		if (approversID) {
			let idArr = approversID.split("|");
			let statusArr = approversStatus ? approversStatus.split("|") : [];
			let dateArr = approversDate ? approversDate.split("|") : [];
			html += `<div class="row mt-4">`;
	
			idArr && idArr.map((item, index) => {
				let date   = dateArr[index] ? moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A") : "";
				let status = statusArr[index] ? statusArr[index] : "";
				let statusBadge = "";
				if (date && status) {
					if (status == 2) {
						statusBadge = `<span class="badge badge-info">Approved - ${date}</span>`;
					} else if (status == 3) {
						statusBadge = `<span class="badge badge-danger">Denied - ${date}</span>`;
					}
				}
	
				html += `
				<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12">
					<div class="d-flex justify-content-start align-items-center">
						<span class="font-weight-bold">
							${employeeFullname(item)}
						</span>
						<small>&nbsp;- Level ${index + 1} Approver</small>
					</div>
					${statusBadge}
				</div>`;
			});
			html += `</div>`;
		}
		return html;
	}
	// ----- END APPROVER STATUS -----
	
});




function leaveRequestDateRange(disabledDays){
    $('#setDateSchedule').daterangepicker({
        "showDropdowns": true,
        autoApply: true,
		isInvalidDate: function(date) {
			if (disabledDays.includes(date.format('YYYY-MM-DD'))) {
				return true; 
			}
		},
		locale: {
			format: 'MMMM DD, YYYY'
		  },
    });
}


function changeDefaultDateRange(disabledDays = false,index = 0){
    $('#setDefaultDateSchedule'+index).daterangepicker({
        "showDropdowns": true,
        autoApply: true,
		isInvalidDate: function(date) {
			if (disabledDays.includes(date.format('YYYY-MM-DD'))) {
				return true; 
			}
		},
		locale: {
			format: 'MMMM DD, YYYY'
		  },
    });
}

$(document).on("change","#leaveRequestDate", function(){
    let thisValue           = $(this).val();
    let splitingValue       = thisValue.split("-");
    let fromDate            = new Date(splitingValue[0]); 	
    let toDate              = new Date(splitingValue[1]);
    let numberOfDays        = Math.round((toDate-fromDate)/(1000*60*60*24)) + 1;
    var remaining_of_days   = $("#leaveRequestRemainingLeave").val();

    $("#leaveRequestNumberOfDate").val(numberOfDays);
    $("#leaveRequestNumberOfDate").attr("numberOfDays",numberOfDays);
    if(numberOfDays > remaining_of_days){
        $("#leaveRequestNumberOfDate").addClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").addClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").text("Not enough number of leave!");
    }else{
        $("#leaveRequestNumberOfDate").removeClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").removeClass("is-invalid");
        $("#invalid-leaveRequestNumberOfDate").text("");
    }
});