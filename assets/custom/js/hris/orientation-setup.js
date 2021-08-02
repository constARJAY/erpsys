$(document).ready(function () {
	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableExaminationSetup")) {
			$("#tableExaminationSetup").DataTable().destroy();
		}

		var table = $("#tableExaminationSetup")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
			serverSide: false,
			scrollX: true,
			sorting: [],
			scrollCollapse: true,
			columnDefs: [
				{ targets: 0, width: 10 },
				{ targets: 1, width: 250 },
				{ targets: 2, width: 100 },
				{ targets: 3, width: 80 },
		
			],
			});
	}
	// ----- END DATATABLES -----

	const examiantionListData = getTableData("hris_employee_list_tbl","","employeeStatus =1")

	// ----- PAGE CONTENT -----
	function getUserRoleContent(data) {
		// Reset the unique datas
		uniqueData = [];

		let html = `
        <table class="table table-bordered">
            <thead class="bg-primary text-white">
                <tr>
                    <th>USER DESIGNATION</th>
                </tr>
            </thead>
            <tbody>`;

		data.map((item, index) => {
			let unique = {
				id: item.designationID,
				designationName: item.designationName,
			};
			uniqueData.push(unique);

			let button =
				item.designationID != 1
					? `<i class="icon-pencil btnEdit" roleID="${item.designationID}"></i>`
					: "";
			let activeMenu = index == 0 ? "active-menu" : "";
			let statusClass =
				item.designationStatus == 1
					? "badge-success bg-success"
					: "badge-danger bg-danger";

			html += `
            <tr class="${activeMenu} user-role-menu userRole" style="height: 50px;" roleID="${item.designationID}">
                <td style="cursor: pointer;">
                    <div class="ml-1">
                        <span class="" style="height: 10px; width: 10px;">&nbsp;</span>
                        <span class="ml-2 name">${item.designationName}</span>
                    </div>
                </td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;
		return html;
	}
	
	function getModuleAccessContent(roleID = 1,DesignationName="Administrator") {
       
		let data;
	
			data = getTableData(
				`hris_orientation_setup_tbl AS or1
                LEFT JOIN hris_employee_list_tbl AS empl ON or1.employeeID = empl.employeeID
				LEFT JOIN hris_designation_tbl AS ds ON or1.designationID = ds.designationID
				LEFT JOIN hris_department_tbl AS dt ON empl.departmentID = dt.departmentID`,
				"or1.designationID,or1.employeeID,or1.orientationStatus,concat(empl.employeeFirstname,'' ,empl.employeeLastname) AS fullname,designationName,empl.employeeProfile,dt.departmentName",
				"or1.designationID=" + roleID
			);
			
	
		
		let html = `
        <div class="col-12 col-lg-8 col-xl-12 py-2 text-left">
        <h6 class="bg-primary text-light p-3"><strong>LIST OF APPROVAL</strong></h6>
        <div class="card my-0 p-2 approval-list" style='box-shadow:none;'>`;
        count = 0;
		
		if (data.length > 0) {
		
			data.map((item, index) => {
				++count;
				let approverName            = count > 0 ?  item.fullname : `Level ${index + 1} Approver N / A `;
                //let approverDesignation     = count> 0 ? getTableData("hris_designation_tbl","","designationID="+item.designationID) : "Department";
                var approverProfile         = count > 0 ? item.employeeProfile : "default.jpg";

				html += `
				<div class="row border rounded m-2 py-1">
					<div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center"><img class="rounded-circle" src="${base_url}assets/upload-files/profile-images/${approverProfile || "default.jpg" }" alt="avatar" height="70" width="70"></div>
					<div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
						<span>${approverName} <br> <small class="text-primary">${item.departmentName} | ${item.designationName}</small>    
						</span>
					</div>
					<div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
						<h5><small class="text-primary"> Level ${index + 1} </small></h5>
					</div>
				</div>
				`;

			});
            html += ` <div class="py-2 border-top d-flex justify-content-end align-items-end">
            <button class="btn btn-primary btn-approval-setup" designation="${roleID}" designationName= "${DesignationName}">Update Approval</button>
        </div>`;
		} else {
			
			html += `
            <div class="text-center" style="height: 50px;">
                <td>No data available in table.</td>
            </div>
            <div class="py-2 border-top d-flex justify-content-end align-items-end">
            <button class="btn btn-primary btn-approval-setup" designation="${roleID}" designationName= "${DesignationName}">Create Approval</button>
        </div>`;
          
		}

		html += `
           </div>`;
		return html;
	}

	function pageContent() {
		$("#roles_permission_content").html(preloader);
		const userRoleData = getTableData("hris_designation_tbl","","designationStatus =1");
		let html = "";
		if (userRoleData) {
			html = `
            <div class="col-md-3 col-sm-12">
                <div class="table-responsive" id="user_role_content">
                    ${getUserRoleContent(userRoleData)}
                </div>
            </div>
            <div class="col-md-9 col-sm-12">

                <div class="row">
                    <div class="col-md-6 col-sm-12 mb-4">
                    </div>
                </div>
                
                <div class="table-responsive" id="module_access_content">
                    ${getModuleAccessContent()}
                </div>
            </div>`;
		} else {
			html = `
            <div class="w-100 h5 text-center text-danger>
                There was an error fetching data.
            </div>`;
		}
		setTimeout(() => {
			$("#roles_permission_content").html(html);
			initDataTables();
			initAll();
		}, 500);
	}
	pageContent();
	// ----- END PAGE CONTENT -----

	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
	
		let {
			orientationID   = "",
			designationID 	= "",
			designationName =""
		} = data.length > 0 ? data[0] : false;
		//alert(orientationID);

		let requestExamList = "";
		if (orientationID) {
			let RequestExaminationData = getTableData("hris_orientation_setup_tbl ",""," designationID ="+ designationID);
			RequestExaminationData.map(item => {
				requestExamList += getItemRow(item);
			})
		
		} else {
			requestExamList += getItemRow();
		}

		// $("#modalTitle").text(modalTitle);

		let button = orientationID
			? `
        <button class="btn btn-update" id="btnUpdate" designationID="${designationID}" designationName="${designationName}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
        <div class="modal-body">
		<table class="table table-striped" id="tableExaminationSetup">
			<thead>
				<tr style="white-space: nowrap">
				<th class="text-center">
					<div class="action">
						<input type="checkbox" class="checkboxall" project="true">
					</div>
				</th>
				<th>Approval <code>*</code></th>
				</tr>
			</thead>
			<tbody class="tableExaminationSetupTableBody">
				${requestExamList}
			</tbody>
		</table>
		<div class="w-100 d-flex justify-content-between align-items-center py-2">
			<div>
			<div class="w-100 text-left my-2">
				<button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
				<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
			</div>
			</div>
		</div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel btnCancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
        </div>`;
		return html;
	}
	// ----- END MODAL CONTENT -----

	

// ----- GET INVENTORY ITEM -----
    function getExaminationList(id = null, isProject = true, display = true ,storageID = null) {
        let html   = `<option selected disabled>Select Approval</option>`;
		const attr = isProject ? "[project=true]" : "";

		let examIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=employeeID]`).each(function(i, obj) {
			examIDArr.push($(this).val());
		}) 
		
		let itemList = [...examiantionListData];
		
		html += itemList.filter(item => !examIDArr.includes(item.employeeID) || item.employeeID == id).map(item => {
				return `
				<option 
					value        = "${item.employeeID}" 
					${item.employeeID == id && "selected"}>
					${item.employeeFirstname} ${item.employeeLastname}
				</option>`;
		
		})
        return display ? html : examiantionListData;
    }
    // ----- END GET INVENTORY ITEM -----


// ----- GET ITEM ROW -----
function getItemRow(item = {}) {
	let {
			
		orientationID     = "",
		employeeID 			=""
	} = item;
  
	let html = "";

	
		html += `
		<tr class="itemTableRow">
			<td class="text-center">
				<div class="action">
					<input type="checkbox" class="checkboxrow">
				</div>
			</td>

			<td>
			<div class="form-group mb-0">
					<select
						class="form-control select2 employeeID"
						name="employeeID"
						id="employeeID"
						style="width: 100%"
						required
						>
						${getExaminationList(employeeID)}
					</select>
					<div class="invalid-feedback d-block" id="invalid-itemID"></div>
				</div>
			</td>
		</tr>`;
	return html;
}
// ----- END GET ITEM ROW -----

// ----- UPDATE TABLE ITEMS -----
function updateTableItems() {
	$(".tableExaminationSetupTableBody tr").each(function(i) {
		// ROW ID
		$(this).attr("id", `tableRow${i}`);
		$(this).attr("index", `${i}`);

		// CHECKBOX
		$("td .action .checkboxrow", this).attr("id", `checkboxrow${i}`);
		$("td .action .checkboxrow", this).attr("project", `true`);

		// EXAMNAME
		$(this).find("select").each(function(j) {
			const examID = $(this).val();
			$(this).attr("index", `${i}`);
			$(this).attr("project", `true`);
			$(this).attr("id", `projectitemid${i}`)
			if (!$(this).attr("data-select2-id")) {
				$(this).select2({ theme: "bootstrap" });
			}
		});
		
	})
}
// ----- END UPDATE TABLE ITEMS -----

 // ----- INSERT ROW ITEM -----
 $(document).on("click", ".btnAddRow", function() {
	let row = getItemRow();
		$(".tableExaminationSetupTableBody").append(row);
		updateTableItems();
		// initInputmask();
		// initPercentage();
})
// ----- END INSERT ROW ITEM -----

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
	const isProject = "true";
	
		$(".checkboxrow[project=true]").each(function(i, obj) {
			$(this).prop("checked", isChecked);
		});
	updateDeleteButton();
})
// ----- END CHECK ALL -----

// ----- UPDATE DELETE BUTTON -----
function updateDeleteButton() {
	let projectCount = 0, companyCount = 0;
	$(".checkboxrow[project=true]").each(function() {
		this.checked && projectCount++;
	})
	$(".btnDeleteRow[project=true]").attr("disabled", projectCount == 0);
}
// ----- END UPDATE DELETE BUTTON -----

// ----- DELETE TABLE ROW -----
function deleteTableRow(isProject = true) {
	const attr = "[project=true]";
	if ($(`.checkboxrow${attr}:checked`).length != $(`.checkboxrow${attr}`).length) {
		Swal.fire({
			title:              "DELETE FACILITATOR",
			text:               "Are you sure that you want to delete the facilitator for this setup?",
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
				$(`.checkboxrow${attr}:checked`).each(function(i, obj) {
					var tableRow = $(this).closest('tr');
					tableRow.fadeOut(500, function (){
						$(this).closest("tr").remove();
						updateTableItems();
						$(`[name=examinationID]${attr}`).each(function(i, obj) {
							let itemID = $(this).val();
							// $(this).html(getInventoryItem(itemID, isProject));
						}) 
						updateDeleteButton();
					});
				})
			}
		});
		
	} else {
		showNotification("danger", "You must have atleast one or more items.");
	}
}
// ----- END DELETE TABLE ROW -----

	// ----- SAVE ADD -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_orientation_setup");
		if (validate) {
			let data = getFormData("modal_orientation_setup", true);
			
			data["tableData[designationID]"]     =  $(this).attr("designationID");
			data["tableName"]                	= "hris_orientation_setup_tbl";
			data["feedback"]                 = $("#btnSave").attr("designationName");
			sweetAlertConfirmation(
				"add", "Orientation Setup", "modal_orientation_setup", null, data, true, pageContent
			);
		}
	});
	// ----- END SAVE ADD -----

	// // ----- SAVE UPDATE -----
	$(document).on("click", "#btnUpdate", function () {
		let condition           = validateForm("modal_orientation_setup");
		 if(condition == true){
			var employeeID = [];
			$(".employeeID").each(function () {
				employeeID.push($(this).val());
			});
			let designationID     =  $(this).attr("designationID");
			let designationName     =  $(this).attr("designationName");
			Swal.fire({
				title: 'UPDATE ORIENTATION SETUP',
				text: 'Are you sure that you want to update the orientation setup for this designation?',
				imageUrl: `${base_url}assets/modal/update.svg`,
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
					preventRefresh(false);
					$.ajax({
						url: `${base_url}hris/Orientation_setup/updaterecord`,
						method: "POST",
						data: {
							employeeID: 	employeeID,
							designationID: 	designationID,
						},
						async: true,
						dataType: "json",
						beforeSend: function () {
							$("#loader").show();
						},
						success: function (data) {
							$("#loader").hide();
							$("#modal_orientation_setup").hide();
							setTimeout(() => {
								let swalTitle = `Orientation setup for ${designationName} updated successfully!`;
								Swal.fire({
									icon: "success",
									title: swalTitle,
									showConfirmButton: false,
									timer: 2000,
								}).then(() => {
									$("#loader").show();
									setTimeout(function(){
									window.location.reload(1);
									}, 1);
								})
								// 	setTimeout(() => {
								// }, 1000)

								// window.location.replace(`${base_url}ims/inventory_recieving_report`);
							}, 1);

						},
					});	

				} else {
					preventRefresh(false);
				}	
			})	


			// let data = getFormData("modal_qualification_form", true);
			// data["tableData"]["updatedBy"]   =  sessionID;
			// data["whereFilter"]              =  "qualificationID="+qualificationID;
			// data["tableName"]                =  "hris_qualification_tbl";
			// data["feedback"]                 =  $("#inputqualification").val();
			// sweetAlertConfirmation("update", "Qualification","modal_qualification", null , data, true, tableContent);
		}

		// const validate = validateForm("modal_orientation_setup");
		// if (validate) {
		// 	// $("#modal_roles_permission").modal("hide");
		// 	// $("#confirmation-modal_edit_roles_permission").modal("show");

		// 	const designationID = $(this).attr("designationID");
		// 	let roleName = $("#input_roleName").val();

		// 	let data = getFormData("modal_roles_permission", true);
		// 	data.tableName = "gen_user_role_tbl";
		// 	data.whereFilter = "designationID = " + roleID;
		// 	data.feedback = roleName;

		// 	sweetAlertConfirmation(
		// 		"update",
		// 		"Role",
		// 		"modal_roles_permission",
		// 		null,
		// 		data,
		// 		true,
		// 		pageContent
		// 	);
		// }
	});
	// // ----- END SAVE UPDATE -----

	// // ----- SAVE CONFIRMATION ADD -----
	// $(document).on("click", "#btnSaveConfirmationAdd", function () {
	// 	/**
	// 	 * ----- FORM DATA -----
	// 	 * tableData = {} -> Objects
	// 	 */

	// 	let roleName = $("#input_roleName").val();

	// 	let data = getFormData("modal_roles_permission", true);
	// 	data.tableName = "gen_user_role_tbl";
	// 	data.feedback = roleName;
	// 	/**
	// 	 * ----- DATA -----
	// 	 * 1. tableName
	// 	 * 2. tableData
	// 	 * 3. feedback
	// 	 */

	// 	const saveData = insertTableDatav1(
	// 		data,
	// 		true,
	// 		"success|A new role is already added!"
	// 	);
	// 	if (saveData) {
	// 		pageContent();
	// 	}
	// });
	// // ----- END SAVE CONFIRMATION ADD -----

	// // ----- SAVE CONFIRMATION EDIT -----
	// $(document).on("click", "#btnSaveConfirmationEdit", function () {
	// 	const roleID = $(this).attr("roleID");
	// 	let roleName = $("#input_roleName").val();

	// 	let data = getFormData("modal_roles_permission", true);
	// 	data.tableName = "gen_user_role_tbl";
	// 	data.whereFilter = "roleID = " + roleID;
	// 	data.feedback = roleName;

	// 	/**
	// 	 * ----- DATA -----
	// 	 * 1. tableName
	// 	 * 2. tableData
	// 	 * 3. whereFilter
	// 	 * 4. feedback
	// 	 */

	// 	const saveData = updateTableDatav1(
	// 		data,
	// 		true,
	// 		"success|The role is already updated!"
	// 	);
	// 	if (saveData) {
	// 		pageContent();
	// 	}
	// });
	// // ----- END SAVE CONFIRMATION EDIT -----

	// // ----- CHANGE MODULE ACCESS STATUS -----
	// $(document).on("click", ".moduleStatus", function () {
	// 	const roleID = $(this).attr("roleID");
	// 	const roleName = $(this).attr("roleName");
	// 	const moduleID = $(this).attr("moduleID");
	// 	const moduleName = $(this).attr("moduleName");
	// 	const status = $(this).prop("checked") ? 1 : 0;
	// 	const data = {
	// 		tableName: "gen_roles_permission_tbl",
	// 		tableData: {
	// 			permissionStatus: status,
	// 		},
	// 		whereFilter: `designationID=${roleID} AND moduleID=${moduleID}`,
	// 		feedback: moduleName,
	// 	};
	// 	const feedback =
	// 		status == 1
	// 			? `success|${roleName} - ${moduleName} has been enabled.`
	// 			: `warning|${roleName} - ${moduleName} has been disabled.`;
	// 	const saveData = updateTableDatav1(data, true, feedback);
	// 	if (saveData) {
	// 		// pageContent();
	// 	}
	// });
	// // ----- END CHANGE MODULE ACCESS STATUS -----

	// ----- CLOSE CONFIRMATION -----
	$(document).on(
		"click",
		".btnCloseConfirmationAdd, .btnCloseConfirmationEdit",
		function () {
			$(
				"#confirmation-modal_add_roles_permission, #confirmation-modal_edit_roles_permission"
			).modal("hide");
			$("#modal_roles_permission").modal("show");
		}
	);
	// ----- END CLOSE CONFIRMATION -----

	// ----- SELECT USER ROLE -----
	$(document).on("click", ".userRole", function () {
		const roleID = $(this).attr("roleID");
		const roleName = $(`[roleID=${roleID}]`).find(".name").text();
		$("#user_role_content").find(".active-menu").removeClass("active-menu");
		$("#user_role_content").find(`[roleID=${roleID}]`).addClass("active-menu");
		// const projectName = $("#projectName").val();
		// $("#projectName").attr("roleID", roleID);
		// $("#projectName").attr("roleName", roleName);
		const moduleData = getModuleAccessContent(roleID, roleName);
		$("#module_access_content").html(preloader);
		setTimeout(() => {
			$("#module_access_content").html(moduleData);
			initDataTables();
		}, 500);
	});
	// ----- END SELECT USER ROLE -----

	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_roles_permission");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Orientation Setup", "modal_roles_permission");
		} else {
			$("#modal_roles_permission").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------

    // BTN SETTING UP THE APPROVERS
$(document).on("click", ".btn-approval-setup", function(){
    let designationID    =   $(this).attr("designation");
	let designationName    =   $(this).attr("designationName");
	let designationNameMessage = "Orientation setup for "+designationName;
	//alert(designationNameMessage);
	//alert(designationName);
	
    $("#modal_orientation_setup").modal("show");
    $(".modal_orientation_setup_content").html(preloader);
    // $(modalFooter).html("");
	let ExaminationData = getTableData(`hris_orientation_setup_tbl  AS ost 
										LEFT JOIN hris_designation_tbl AS dt ON ost.designationID = dt.designationID`,"ost.*,dt.designationName"," ost.designationID ="+ designationID);
    setTimeout(function(){
		$(".modal_orientation_setup_content").html(modalContent(ExaminationData));	
		updateTableItems();
		$("#btnSave").attr("designationID",designationID);
		$("#btnSave").attr("designationName",designationNameMessage);
		//$("#btnSave").attr("designationName",designationID);
		//initInputmask();
		//initPercentage();
	 }, 500);
});





});
