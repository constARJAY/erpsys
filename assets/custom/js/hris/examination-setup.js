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

	const examiantionListData = getTableData("hris_examination_tbl","","examinationStatus =1")

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
	
	function getModuleAccessContent(roleID = 1) {
       
		let data;
	
			data = getTableData(
				`hris_examination_setup_tbl as hest
				LEFT JOIN hris_examination_tbl AS het ON het.examinationID  = hest.examinationID
				LEFT JOIN hris_designation_tbl as dsg ON dsg.designationID = hest.designationID`,
				"",
				"hest.designationID=" + roleID
			);
			
	
		
		let html = `
        <div class="col-12 col-lg-8 col-xl-12 text-left">
        <h6 class="bg-primary text-light p-3"><strong>LIST OF EXAMINATIONS</strong></h6>
        <div class="card my-0 p-2 approval-list" style='box-shadow:none;'>`;
        count = 0;
		
		if (data.length > 0) {
		
			data.map((item, index) => {

				html += `

                <div class="row border rounded m-2 py-1">
				
					<div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
						<span class="mt-1 mb-1"><h5 class="font-weight-bolder">${item.examinationName}</span></h5> 
						
						<span class="ml-2">Time Limit: ${item.timeLimit}</span> | <span class="ml-2">Percentage: ${item.percentage} %    
						</span>

					</div>
					<div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
						<h5><small class="text-primary"> Part ${index + 1} </small></h5>
					</div>
				</div>`;

			});
            html += ` <div class="py-2 border-top d-flex justify-content-end align-items-end">
            <button class="btn btn-primary btn-approval-setup" designation="${roleID}" designationName="${data[0].designationName}" >Update Examination Setup</button>
        </div>`;
		} else {
			
			html += `
            <div class="text-center" style="height: 500px;">
			<td>
               <div class="row">
					<div class="col-4"></div>
					<div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">No data available</h6>
					<p class="text-center">Click "Add Examination Setup" to view the lists of examinations that can be assigned</p>
					</div>
					<div class="col-4"></div>
				</div>
				</td>
            </div>
				<div class="py-2 border-top d-flex justify-content-end align-items-end">
					<button class="btn btn-primary btn-approval-setup" designation="${roleID}" >Add Examination Setup</button>
				</div>`;
          
		}

		html += `
           </div>`;
		return html;
	}

	function pageContent() {
		$("#roles_permission_content").html(preloader);
		const userRoleData = getTableData("hris_designation_tbl","","designationStatus = 1");
		let html = "";
		if (userRoleData) {
			html = `
            <div class="col-md-3 col-sm-12">
                <div class="table-responsive overflow-auto" id="user_role_content" style="
				height: 620px;
			">
                    ${getUserRoleContent(userRoleData)}
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                
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
			examSetupID   = "",
			designationID = ""
		} = data.length > 0 ? data[0] : false;

		let requestExamList = "";
		if (examSetupID) {
			let RequestExaminationData = getTableData("hris_examination_setup_tbl ",""," designationID ="+ designationID);
			RequestExaminationData.map(item => {
				requestExamList += getItemRow(item);
			})
		
		} else {
			requestExamList += getItemRow();
		}

		// $("#modalTitle").text(modalTitle);

		let button = examSetupID
			? `
        <button class="btn btn-update" id="btnUpdate" roleID="${designationID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save" id="btnSave" disabled><i class="fas fa-save"></i> Save</button>`;

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
				<th>Exam Title <code>*</code></th>
				<th>Time Limit <code>*</code></th>
				<th>Percentage <code>*</code></th>
				</tr>
			</thead>
			<tbody class="tableExaminationSetupTableBody">
				${requestExamList}
			</tbody>
		</table>
		<div class="w-100 d-flex justify-content-between align-items-center py-2">
			
			<div class="w-100 text-left my-2">
				<button class="btn btn-primary btnAddRow" id="btnAddRow" project="true"><i class="fas fa-plus-circle"></i> Add Row</button>
				<button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" project="true" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
			</div>

			<div class="w-100 text-right my-2">
				<h5 class="font-weight-bolder" id="percent">0.00%</h5>
				<div class="note-feedback text-warning">
							<strong>Note: </strong> Must equate the total percentage to 100%
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
        let html   = `<option selected disabled>Select Examination Name</option>`;
		const attr = isProject ? "[project=true]" : "";

		let examIDArr = []; // 0 IS THE DEFAULT VALUE
		$(`[name=examinationID]`).each(function(i, obj) {
			examIDArr.push($(this).val());
		}) 
		
		let itemList = [...examiantionListData];
		
		html += itemList.filter(item => !examIDArr.includes(item.examinationID) || item.examinationID == id).map(item => {
				return `
				<option 
					value        = "${item.examinationID}" 
					${item.examinationID == id && "selected"}>
					${item.examinationName}
				</option>`;
		
		})
        return display ? html : examiantionListData;
    }
    // ----- END GET INVENTORY ITEM -----


// ----- GET ITEM ROW -----

function getItemRow(exam = {}) {

	let {
			
		examinationID     = "",
		timeLimit ="",
		percentage =""
	} = exam;

  
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
						class="form-control select2"
						name="examinationID"
						id="examinationID"
						style="width: 100%"
						required
						>
						${getExaminationList(examinationID)}
					</select>
					<div class="invalid-feedback d-block" id="invalid-itemID"></div>
				</div>
			</td>

			<td class="text-center">
				<div class="timeLimit">
					<input 
						type="text" 
						class="form-control text-right input-hoursLimit"
						id="timeLimit"
						min="00:10:00"
						max="05:00:00"
						name="timeLimit"
						mask="99:99:99"
						value="${timeLimit}" 
						required>
					<div class="invalid-feedback d-block text-left" id="invalid-timeLimit"></div>
				</div>
			</td>
			

			<td class="text-center">
		
				<div class="input-group">
                        <input type="text" 
                        class="form-control validate input-percentage text-right percentage"  
						data-allowcharacters="[0-9][.]"
                        minlength="1" 
                        maxlength="5" 
                        id="percentage" 
						name="percentage" 
						value="${percentage}"
						required>
						<div class="input-group-prepend">
                            <span class="input-group-text">%</span>
                        </div>
						<div class="invalid-feedback d-block invalid-percentage text-left" id="invalid_percentage"></div>
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

		// BARCODE
		$("td .timeLimit [name=timeLimit]", this).attr("id", `timeLimit${i}`);
		$("td .timeLimit [name=timeLimit]", this).attr("project", `true`);
		$("td .timeLimit [name=timeLimit]", this).addClass("inputmask");
		
		// PERCENTAGE
		$("td [name=percentage]", this).attr("id", `percentage${i}`);
		$("td [name=percentage]", this).attr("project", `true`);

		$("td [name=percentage]", this).closest("tr").find("td .invalid-percentage").attr("id",`invalid_percentage${i}`);

		// $("td .disposalDetailRemarks", this).attr("id", `disposalDetailRemarks${i}`);
		
	})
}
// ----- END UPDATE TABLE ITEMS -----

// ----- COMPUTE PERCENTAGE-----
function computePercent() {
	var getLength= 0;
	var totalPercent= 0;
	var rate= parseFloat(100);
	
	getLength =$("[name=percentage]").length-1;
	

	$("[name=percentage]").each(function(i) {
		totalPercent += parseFloat($(this).val().replaceAll(",","")) ||0;
	})

	$("[name=percentage]").each(function(i) {
	
		// console.log(getLength);
	
	if( getLength == i ){
		// if(totalPercent != 0){
			// console.log( totalPercent+ " > "+ rate)
			if(totalPercent > rate || totalPercent < rate){
				// console.log("pasok "+i )
					// $("#invalid_percentage"+i).html("Must equate the total percentage to 100%");
					$('#percentage'+i).addClass("has-error").removeClass("no-error");
					$("#btnSave").prop('disabled','true');
					$("#btnUpdate").prop('disabled','true');
				
				// return false;
			}else{
			
				$("#invalid_percentage"+i).html("");
				$('#percentage'+i).addClass("no-error").removeClass("has-error");
				$("#btnSave").removeAttr('disabled');
				$("#btnUpdate").removeAttr('disabled');
				
				return true;
			}
		// }			
	}else{
		$("#invalid_percentage"+i).html("");
		$('#percentage'+i).addClass("no-error").removeClass("has-error");

		// return true;

	}
	})

	

	$("#percent").text(formatAmount(totalPercent)+"%");
	// return true;
}
// ----- END COMPUTE PERCENTAGE-----

// ----- CHECKBOX EVENT -----
$(document).on("keyup", "[name=percentage]", function() {
	computePercent();
})

 // ----- INSERT ROW ITEM -----
 $(document).on("click", ".btnAddRow", function() {
	let row = getItemRow();
		$(".tableExaminationSetupTableBody").append(row);
		updateTableItems();
		initInputmask();
		computePercent();
})
// ----- END INSERT ROW ITEM -----

// ----- CLICK DELETE ROW -----
$(document).on("click", ".btnDeleteRow", function(){
	deleteTableRow();
	computePercent();
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
			title:              "DELETE ROWS",
			text:               "Are you sure to delete these rows?",
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
		const validate = validateForm("modal_examination_setup");
		var designationID = $(this).attr("designationID");
		var designationName = $(this).attr("designationName");
		
		if (validate) {
			// $("#modal_roles_permission").modal("hide");
			// $("#confirmation-modal_add_roles_permission").modal("show");

			let data = getFormData("modal_examination_setup", true);
			data.tableName = "hris_examination_setup_tbl";
			data["tableData"]["designationID"] = designationID;
			data.feedback = designationName+" Exams ";

			sweetAlertConfirmation(
				"add",
				"Examination Setup",
				"modal_examination_setup",
				null,
				data,
				true,
				pageContent
			);
		}
	});
	// ----- END SAVE ADD -----

	// ----- SAVE UPDATE -----
	$(document).on("click", "#btnUpdate", function () {
		// const percentValidate = computePercent();
		// console.log(percentValidate)

		// if(percentValidate){
		
			const validate = validateForm("modal_examination_setup");
			var designationID = $(this).attr("designationID");
			var designationName = $(this).attr("designationName");
			if (validate) {
				// $("#modal_examination_setup").modal("hide");
				// $("#confirmation-modal_edit_roles_permission").modal("show");
	
				// let data = getFormData("modal_examination_setup", true);
				// data.tableName = "hris_examination_setup_tbl";
				// data.whereFilter = "designationID = " + designationID;
				// data.feedback = designationName+" Exams ";
	
				// sweetAlertConfirmation(
				// 	"update",
				// 	"Examination Setup",
				// 	"modal_examination_setup",
				// 	null,
				// 	"",
				// 	true,
				// 	pageContent
				// );
	
				let data = { exams: [] }, formData = new FormData;
	
				$(".tableExaminationSetupTableBody tr").each(function(i, obj) {
			
	
					const examinationID    = $("td [name=examinationID]", this).val();	
					const timeLimit    = $("td [name=timeLimit]", this).val();	
					const percentage    = $("td [name=percentage]", this).val();	
					
				
	
					let temp = {
						examinationID,timeLimit,percentage,designationID
						
					};
	
					formData.append(`exams[${i}][examinationID]`, examinationID);
					formData.append(`exams[${i}][timeLimit]`, timeLimit);
					formData.append(`exams[${i}][percentage]`, percentage);
					formData.append(`exams[${i}][designationID]`, designationID);
				
					data["exams"].push(temp);
				});
	
				let condition           = validateForm("modal_examination_setup");
				if(condition == true){
				   var employeeID = [];
				
				   Swal.fire({
					   title: 'UPDATE EXAMINATION SETUP',
					   text: 'Are you sure that you want to update the examination setup for this designation?',
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
							   url: `${base_url}hris/Examination_setup/updaterecord`,
							   method: "POST",
							   data:formData,
							   processData: false,
							   contentType: false,
							   global:      false,
							   cache:       false,
							   async:       false,
							   dataType:    "json",
							   beforeSend: function () {
								   $("#loader").show();
							   },
							   success: function (data) {
								   $("#loader").hide();
								   $("#modal_examination_setup").hide();
								//    setTimeout(() => {
									   let swalTitle = "Examination setup for "+designationName+" updated successfully!";
									   Swal.fire({
										   icon: "success",
										   title: swalTitle,
										   showConfirmButton: false,
										   timer: 200,
									   }).then(() => {
										   $("#loader").show();
										   window.location.reload();
									   })
									   // 	setTimeout(() => {
									   // }, 1000)
	   
									   // window.location.replace(`${base_url}ims/inventory_recieving_report`);
								//    }, 100);
	   
							   },
						   });	
	   
					   } else {
						   preventRefresh(false);
					   }	
				   })
				}
				
			}
		// }
	
	});
	// ----- END SAVE UPDATE -----

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
			$(".btn-approval-setup").attr("designationName",$(this).text().trim());
			initDataTables();
			
		}, 500);
	});
	// ----- END SELECT USER ROLE -----
	

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



	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {

		let formEmpty = isFormEmpty("modal_examination_setup");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Examination Setup", "modal_roles_permission");
		} else {
			$("#modal_roles_permission").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------

    // BTN SETTING UP THE APPROVERS
$(document).on("click", ".btn-approval-setup", function(){
    let designationID    =   $(this).attr("designation");
    let designationName    =   $(this).attr("designationName");
    $("#modal_examination_setup").modal("show");
    $(".modal_examination_setup_content").html(preloader);
    // $(modalFooter).html("");
	let ExaminationData = getTableData("hris_examination_setup_tbl ",""," designationID ="+ designationID);
    setTimeout(function(){
		$(".modal_examination_setup_content").html(modalContent(ExaminationData));
		
		updateTableItems();
		initInputmask();
		// initPercentage();
		computePercent();
		$("#btnSave").attr("designationID",designationID);	
		$("#btnUpdate").attr("designationID",designationID);
		$("#btnSave").attr("designationName",designationName);	
		$("#btnUpdate").attr("designationName",designationName);		
	 }, 500);
});





});
