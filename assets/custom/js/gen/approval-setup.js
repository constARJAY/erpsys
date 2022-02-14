$(document).ready(function () {
	select2_modules();
});
// GLOBALIZE VARIABLE
const modalBody = $("#modal_approval_setup .modal-body");
const modalFooter = $("#modal_approval_setup .modal-footer");
const modalForm = $("#modal_approval_setup_form");
// Modules/Positions/Setup Approval

// FIRST FILTER
$(document).on("change", "#select2-modules", function () {
	let thisValue = $(this).val();
	$(".position-list").html(preloader);
	$(".approval-list").html(preloader);
	let position_list = `   <div class="row">
                                    <div class="col-3"></div>
                                    <div class="col-6 text-center">
                                        <img class="img-fluid" src="${base_url}assets/modal/please-select2.gif" alt="">
                                        <h6 class="module-header text-primary text-center font-weight-bold">DESIGNATION</h6>
                                        <p><small> Click <strong>Select Designation/s</strong> to setup approvers.</small></p>
                                    </div>
                                    <div class="col-3"></div>
                                </div>`;

	let approvalDesignation = getTableData(
		"gen_approval_setup_tbl",
		"",
		"moduleID=" + thisValue
	);
	if (approvalDesignation.length > 0) {
		position_list = viewAttachDesignation(thisValue);
	}
	let buttonName =
		approvalDesignation.length > 0
			? "Update Selected Designation/s"
			: "Select Designation/s";
	position_list += `  <div class="card my-0 p-1" style="box-shadow: none !important;">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-primary" module="${thisValue}" id="btn-approval_designation">${buttonName}</button>
                                </div>
                            </div>`;
	setTimeout(function () {
		$(".position-list").html(position_list);
		$(".approval-list").html(`<div class="row">
                                    <div class="col-4"></div>
                                    <div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">APPROVERS</h6>
                                    <p class="text-center">Select designation to view approvers.</p></div>
                                    <div class="col-4"></div>
                                </div>`);
	}, 500);
});

// CLICKING THE UPDATE ATTACT ROLES
$(document).on("click", "#btn-approval_designation", function () {
	let thisModuleID = $(this).attr("module");
	$(".position-list").html(preloader);
	let position_list = "";
	let approvalDesignation = getTableData(
		"gen_approval_setup_tbl",
		"",
		"moduleID=" + thisModuleID,
		"designationID ASC"
	);
	if (approvalDesignation.length > 0) {
		position_list = listOfAttachDesignation(thisModuleID);
	} else {
		let tableDataDesignation = getTableData(
			"hris_designation_tbl",
			"",
			"designationStatus != 0 AND designationName NOT LIKE '%non organic%'",
			"designationID ASC"
		);
		tableDataDesignation.map((itemDesignation, index) => {
			position_list += `<div class="card my-0 p-2" style="box-shadow: none !important;">
                                    <div class="d-flex justify-content-start align-items-center" >
                                        <input class="list-designation" type="checkbox" approvers="0" value="${itemDesignation["designationID"]}">
                                        <h6 class="mx-3 module-header text-gray">${itemDesignation["designationName"]}</h6> 
                                    </div>
                                  </div>`;
		});
	}
	position_list += `  <div class="card my-0 p-1" style="box-shadow: none !important;">
                                <div class="d-flex justify-content-center align-items-center py-2">
                                    <button class="btn btn-update px-5 p-2 mx-2" module="${thisModuleID}" id="update_attach-designation"><i class="fas fa-save"></i>&nbsp;Update</button>
                                    <button class="btn btn-cancel px-5 p-2 mx-2" module="${thisModuleID}" id="cancel_attach-designation"><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                </div>
                            </div>`;
	setTimeout(function () {
		$(".position-list").html(position_list);
	}, 500);
});

// BTN UPDATING ATTACH ROLES
$(document).on("click", "#update_attach-designation", function () {
	let moduleID = $(this).attr("module");
	let designationIDList = [];
	let approvalUsers = [];
	$(".position-list")
		.find("input[type=checkbox]:checked")
		.each(function () {
			designationIDList.push(this.value);
			approvalUsers.push($(this).attr("approvers") ?? '0');
		});

	let data = {
		moduleID: moduleID,
		designationID: designationIDList.join("|"),
		approvalUsers: approvalUsers.join(",") || 0,
	};
	let url = base_url + "approval_setup/update_attach_designation";
	$.ajax({
		url,
		method: "POST",
		data,
		dataType: "json",
		beforeSend: function () {
			$(".position-list").html(preloader);
			$(".approval-list").html(preloader);
		},
		success: function (data) {
			if (data) {
				let position_list = viewAttachDesignation(moduleID);
				// let buttonName  =   approvalDesignation.length > 0  ? "Update Selected Designation/s" : "Select Designation/s"
				position_list += `  <div class="card my-0 p-1" style="box-shadow: none !important;">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <button class="btn btn-primary" module="${moduleID}" id="btn-approval_designation">Update Attach Designation</button>
                                            </div>
                                        </div>`;
				setTimeout(function () {
					$(".position-list").html(position_list);
					$(".approval-list").html(`<div class="row">
                                            <div class="col-4"></div>
                                            <div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">APPROVERS</h6>
                                            <p class="text-center">Select designation to view approvers.</p></div>
                                            <div class="col-4"></div>
                                        </div>`);
				}, 500);
			}
		},
	});
});

// BTN CANCELLING ATTACH ROLES
$(document).on("click", "#cancel_attach-designation", function () {
	let thisValue = $(this).attr("module");
	$(".position-list").html(preloader);
	$(".approval-list").html(preloader);
	let position_list = viewAttachDesignation(thisValue);
	let approvalDesignation = getTableData(
		"gen_approval_setup_tbl",
		"",
		"moduleID=" + thisValue,
		"designationID ASC"
	);
	if (approvalDesignation.length < 1) {
		position_list += `<div class="row">
                                        <div class="col-3"></div>
                                        <div class="col-6 text-center">
                                            <img class="img-fluid" src="${base_url}assets/modal/please-select2.gif" alt="">
                                            <h6 class="module-header text-primary text-center font-weight-bold">DESIGNATION</h6>
                                            <p><small>Click <strong>Select Designation/s</strong> to setup approvers.</small></p>
                                        </div>
                                        <div class="col-3"></div>
                                    </div>`;
	}
	let buttonName =
		approvalDesignation.length > 0
			? "Update Selected Designation/s"
			: "Select Designation/s";
	position_list += `  <div class="card my-0 p-1"  style="box-shadow: none !important;">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-primary" module="${thisValue}" id="btn-approval_designation">${buttonName}</button>
                                </div>
                            </div>`;
	setTimeout(function () {
		$(".position-list").html(position_list);
		$(".approval-list").html(`<div class="row">
                                    <div class="col-4"></div>
                                    <div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/please-select.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">APPROVERS</h6><p class="text-center">Select designation to view approvers.</p></div>
                                    <div class="col-4"></div>
                                </div>`);
	}, 500);
});

// CLICKIN ROLES LIST
$(document).on("click", ".designation-list", function () {
	let moduleID = $(this).attr("module");
	let designationID = $(this).attr("designation");
	$(".approval-list").html(preloader);
	setTimeout(function () {
		getApproval(moduleID, designationID);
	}, 500);
	// Script bellow is for designing
	$(".card").removeClass("module-active");
	$(".module-header")
		.addClass("text-dark")
		.removeClass("text-primary color-active font-weight-bold");

	$(this).addClass("module-active");
	$(this)
		.find(".module-header")
		.removeClass("text-dark")
		.addClass("text-primary color-active font-weight-bold");
});

// BTN SETTING UP THE APPROVERS
$(document).on("click", ".btn-approval-setup", function () {
	let approvalID = $(this).attr("approval");
	$("#modal_approval_setup").modal("show");
	$(modalBody).html(preloader);
	$(modalFooter).html("");
	setTimeout(function () {
		approvalModalContent(approvalID);
	}, 500);
});

// CHANGING APPROVERS
$(document).on("change", ".select2-approvers", function () {
	let selectApproverID = $(this).attr("id");
	let selectValue = $(this).val();
	$(modalBody)
		.find(".select2-approvers")
		.each(function () {
			let approvers = getApproversForm(modalBody);
			let optionsApprovers = userAccountList(approvers);
			if (this.id == selectApproverID || this.value == "0") {
			} else {
				// $("#"+this.id).val(this.value).trigger('change');
				if (this.value == "" || this.value == selectValue) {
					$("#" + this.id).empty();
					$("#" + this.id).append(optionsApprovers);
				}
			}
		});
});

// UPDATING CHAGING APPROVERS;
$(document).on("click", "#approvalUpdateBtn", function () {
	let approvalID = $(this).attr("approval");
	let moduleID = $(this).attr("module");
	let designationID = $(this).attr("designation");
	let moduleApprover = +$(this).attr("moduleApprover");
	let formName = modalBody.children("h5").text();
	let condition = validateForm("modal_approval_setup_form");
	let approvalUsers = [];

	if (condition) {
		$("#hidden_module_designation").attr("module", moduleID);
		$("#hidden_module_designation").attr("designation", designationID);

		modalBody.find("select").each(function () {
			approvalUsers.push(this.value);
		});
		let approvalLength = approvalUsers.filter((i) => i == 0).length;
		let noApprover =
			approvalLength == approvalUsers.length ||
			approvalLength >= moduleApprover;
		let data = getFormData("modal_approval_setup_form", true);
		data["tableData"]["userAccountID"] = noApprover
			? "0"
			: approvalUsers.join("|");
		data["tableData"]["updatedBy"] = sessionID;
		data["whereFilter"] = "approvalID=" + approvalID;
		data["tableName"] = "gen_approval_setup_tbl";
		data["feedback"] = formName + " Approvers";
		sweetAlertConfirmation(
			"update",
			"Approval Setup",
			"modal_approval_setup",
			null,
			data,
			true,
			getApproval
		);
	}
});

// CLICKING CANCEL ON THE MODAL
$(document).on("click", "#approvalCancelBtn", function () {
	let condition = isFormEmpty("modal_approval_setup_form");
	if (!condition) {
		sweetAlertConfirmation("cancel", "Approval Setup", "modal_approval_setup");
	} else {
		$("#modal_approval_setup").modal("hide");
	}
});

function viewAttachDesignation(moduleID = null) {
	if (moduleID == null) {
		alert("Error: Please insert Parameter");
	} else {
		let returnData = "";
		let approvalDesignation = getTableData(
			"gen_approval_setup_tbl",
			"",
			"moduleID=" + moduleID,
			"designationID ASC"
		);
		let approvalDesignationID = [];
		let approvalUsers = [];
		approvalDesignation.map((item_designationID) => {
			approvalDesignationID.push(item_designationID["designationID"]);
			approvalUsers.push(item_designationID["userAccountID"]);
		});

		let tableDataDesignation = getTableData(
			"hris_designation_tbl",
			"",
			"designationStatus != 0 AND designationName NOT LIKE '%non organic%'",
			"designationID ASC"
		);
		tableDataDesignation.map((item_designation, index) => {
			let checkedCondition = approvalDesignationID.indexOf(
				item_designation["designationID"]
			);
			if (checkedCondition >= 0) {
				returnData += `<div class="card my-0 p-2 designation-list" module="${moduleID}" designation="${item_designation["designationID"]}" style="box-shadow: none !important;">
                                                <div class="d-flex justify-content-start align-items-center">
                                                    <h6 class="mx-3 module-header py-1 text-gray">${item_designation["designationName"]}</h6> 
                                                </div>
                                            </div>`;
			}
		});

		return returnData;
	}
}

function listOfAttachDesignation(moduleID = null) {
	if (moduleID == null) {
		alert("Error: Please insert Parameter");
	} else {
		let returnData = "";
		let approvalDesignation = getTableData(
			"gen_approval_setup_tbl",
			"",
			"moduleID=" + moduleID,
			"designationID ASC"
		);
		let approvalDesignationID = [];
		let approvalUsers = [];
		approvalDesignation.map((item_designationID) => {
			approvalDesignationID.push(item_designationID["designationID"]);
			approvalUsers.push(item_designationID["userAccountID"]);
		});
		let tableDataDesignation = getTableData(
			`hris_designation_tbl AS hdt`,
			`hdt.*, (SELECT userAccountID FROM gen_approval_setup_tbl WHERE designationID = hdt.designationID AND moduleID = ${moduleID}) AS userAccountID`,
			"designationStatus != 0 AND designationName NOT LIKE '%non organic%'",
			"designationID ASC"
		);
        
		tableDataDesignation.map((item_designation, index) => {
			let checkedCondition = approvalDesignationID.indexOf(
				item_designation["designationID"]
			);
			let checked = checkedCondition >= 0 ? "checked" : "";
			let approvers = checked == "" ? "0" : (item_designation.userAccountID || "0");
			returnData += `<div class="card my-0 p-2" style="box-shadow: none !important">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <input class="list-designation" type="checkbox" approvers="${approvers}" value="${item_designation["designationID"]}" ${checked}>
                                                <h6 class="mx-3 module-header text-gray">${item_designation["designationName"]}</h6> 
                                            </div>
                                        </div>`;
		});

		return returnData;
	}
}

function getApproval(moduleID = null, designationID = null) {
	if (moduleID == null || designationID == null) {
		moduleID = $("#hidden_module_designation").attr("module");
		designationID = $("#hidden_module_designation").attr("designation");
	}

	let approval = getTableData(
		"gen_approval_setup_tbl",
		"",
		"moduleID = '" + moduleID + "' AND designationID = '" + designationID + "' "
	); // RESULT 0/ 1|2|3;
	let tableData = getTableData(
		"gen_module_list_tbl",
		"",
		"moduleID = '" + moduleID + "'"
	);
	let approvalList = "";
	if (approval[0]["userAccountID"] != "0") {
		let approvalArray = approval[0]["userAccountID"].split("|");
		approvalArray.map((items, index) => {
			let approvalItems = getTableData(
				"hris_employee_list_tbl",
				"employeeID, employeeFirstname, employeeLastname, employeeProfile, departmentID, designationID",
				"employeeID = '" + items + "' AND isNonOrganic = 0"
			);

			let approverName =
				approvalItems.length > 0
					? approvalItems[0]["employeeFirstname"] +
					  " " +
					  approvalItems[0]["employeeLastname"]
					: `Level ${index + 1} Approver N / A `;
			let approverDesignation =
				approvalItems.length > 0
					? getTableData(
							"hris_designation_tbl",
							"",
							"designationID=" + approvalItems[0].designationID
					  )
					: "Department";
			var approverProfile =
				approvalItems.length > 0
					? approvalItems[0]["employeeProfile"]
					: "default.jpg";
			approvalList += ` <div class="row border rounded m-2 py-1">
                                            <div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center"><img class=" rounded-circle" src="${base_url}assets/upload-files/profile-images/${
				approverProfile || "default.jpg"
			}" alt="avatar" height="70" width="70"></div>
                                            <div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
                                                <span>${approverName} <br> <small class="text-primary">${
				approverDesignation != "Department"
					? approverDesignation[0].designationName
					: approverDesignation
			}</small>    
                                                </span>
                                            </div>
                                            <div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                                <h5><small class="text-primary"> Level ${
																									index + 1
																								} </small></h5>
                                            </div>
                                        </div>
                                    `;
		});
	} else {
		for (var i = 0; i < tableData[0]["moduleApprover"]; i++) {
			approvalList += ` <div class="row border rounded m-2 py-1">
                                        <div class="col-3 col-lg-3 col-xl-1 d-flex align-items-center">
                                            <img class="img-fluid rounded-circle" src="${base_url}assets/upload-files/profile-images/default.jpg" alt="avatar" height="70" width="70"></div>
                                        <div class="col-5 col-lg-6 col-xl-9 d-flex justify-content-start align-items-center">
                                            <span>
                                                Name of Approver  <br>
                                                <small class="text-primary">Department | Designation</small>    
                                            </span>
                                        </div>
                                        <div class="col-4 col-lg-3 col-xl-2 d-flex justify-content-center align-items-center">
                                            <h5><small class="text-primary"> Level ${
																							i + 1
																						} </small></h5>
                                        </div>
                                    </div>
                                    `;
		}
	}

	approvalList += `   <div class="py-2 border-top d-flex justify-content-end align-items-end">
                            <button class="btn btn-primary btn-approval-setup" approval="${approval[0]["approvalID"]}">Update Approver</button>
                        </div>`;
	$(".approval-list").html(approvalList);
}

function approvalModalContent(approvalID) {
	let approvalTableData = getTableData(
		"gen_approval_setup_tbl",
		"",
		"approvalID=" + approvalID
	);

	let moduleTableData = getTableData(
		"gen_module_list_tbl",
		"",
		"moduleID = '" + approvalTableData[0]["moduleID"] + "' "
	);
	let modalBodyContent = `<h5 class="text-center text-primary">${moduleTableData[0]["moduleName"]}</h5>`;
	let modalFooterContent = "";
	// let condition       = getTableData("gen_approval_setup_tbl", "", "moduleID = '"+moduleID+"' ");
	// let tableData       = condition.length > 0 ? condition : getTableData("gen_module_list_tbl", "", "moduleID = '"+moduleID+"' ");

	if (approvalTableData[0]["userAccountID"] != "0") {
		let tableDataArray = approvalTableData[0]["userAccountID"].split("|");
		tableDataArray.map((items, index) => {
			modalBodyContent += ` <div class="col-12">
                                            <div class="form-group form-group-approvers${
																							i + 1
																						}">
                                                <label for="approvers${
																									index + 1
																								}">Level ${
				index + 1
			} Approver</label>
                                                <select class="form-control select2 select2-approvers validate" id="approvers${
																									index + 1
																								}" required>
                                                    ${userAccountList(items)}
                                                    ${approvalList(items)}
                                                </select>
                                                <div class="invalid-feedback" id=""></div>
                                            </div>
                                        </div>`;
		});
	} else {
		for (var i = 0; i < moduleTableData[0]["moduleApprover"]; i++) {
			modalBodyContent += ` <div class="col-12">
                                            <div class="form-group form-group-approvers${
																							i + 1
																						}">
                                                <label for="approvers${
																									i + 1
																								}">Level ${
				i + 1
			} Approver</label>
                                                <select class="form-control select2 select2-approvers validate" name="userAccountID" id="approvers${
																									i + 1
																								}" required>
                                                    ${userAccountList("'0'")}
                                                </select>
                                                <div class="invalid-feedback" id=""></div>
                                            </div>
                                        </div>`;
		}
	}

	modalFooterContent = `  <button class="btn btn-update px-5 p-2" approval="${
		approvalTableData[0]["approvalID"]
	}" module="${approvalTableData[0]["moduleID"]}" designation="${
		approvalTableData[0]["designationID"]
	}" moduleApprover="${
		moduleTableData[0]["moduleApprover"] ?? 0
	}" id="approvalUpdateBtn"><i class="fas fa-save"></i>&nbsp;Update</button>
                            <button class="btn btn-cancel px-5 p-2" data-dismiss="modal" id="approvalCancelBtn"><i class="fas fa-ban"></i>&nbsp;Cancel</button>`;

	$(modalBody).html(modalBodyContent);
	$(modalFooter).html(modalFooterContent);
	if ($(".select2-approvers").select2({ theme: "bootstrap" })) {
		$(".select2-approvers").select2("destroy");
	}
	$(".select2-approvers").select2({ theme: "bootstrap" });
	// initAll();
	// select2_modules(approvalTableData[0]["moduleID"]);
}

function userAccountList(approvers) {
	let tableData = getTableData(
		"hris_employee_list_tbl",
		"",
		"employeeID NOT IN(" +
			approvers +
			") AND employeeStatus='1' AND isNonOrganic = 0"
	);
	let returnValue = `<option value="" disabled>Select Designation</option><option value="0">N/A</option>`;
	tableData.map((items, index) => {
		returnValue += `<option value="${items["employeeID"]}">${items["employeeFirstname"]} ${items["employeeLastname"]}</option>`;
	});

	return returnValue;
}

function approvalList(userAccountID) {
	let returnData = "";
	let optionApproverList = getTableData(
		"hris_employee_list_tbl",
		"",
		"employeeID='" +
			userAccountID +
			"' AND employeeStatus='1' AND isNonOrganic = 0"
	);
	optionApproverList.length > 0
		? (returnData += `<option value="${optionApproverList[0]["employeeID"]}" selected>${optionApproverList[0]["employeeFirstname"]} ${optionApproverList[0]["employeeLastname"]}</option>`)
		: `<option value="0" selected>N/A</option>`;

	return returnData;
}

// getApproversForm(modalBody,"2");
function getApproversForm(formID, condition = null) {
	data = [];
	formID.find("select").each(function () {
		var dataValue =
			condition == null
				? this.value == ""
					? "'0'"
					: "'" + this.value + "'"
				: this.value;
		//    data.push({[this.id] : dataValue});
		data.push(dataValue);
	});

	return data.join(",");
}

// FUNCTION FOR CALLING THE AFTER THE UPDATE
function select2_modules(moduleID = null) {
	if (moduleID != null) {
		let tableData = getTableData(
			"gen_module_list_tbl",
			"",
			"moduleApprover != '0'"
		);
		let list_of_module = `  <select class="form-control w-50 text-center" id="select2-modules">
                                    <option value="" selected disabled>Select Module</option>`;
		tableData.map((items) => {
			list_of_module += `<option value="${items["moduleID"]}">${items["moduleName"]}</option>`;
		});
		list_of_module += `</select>`;
		$(".list-of-module").html(list_of_module);

		$("#select2-modules").val(moduleID).trigger("change");
	}

	if ($("#select2-modules").select2({ theme: "bootstrap" })) {
		$("#select2-modules").select2("destroy");
	}
	$("#select2-modules").select2({ theme: "bootstrap" });
}
