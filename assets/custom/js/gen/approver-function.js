// ----- SAVE FORM/DOCUMENT ----
async function saveFormData(action, method, data, isObject, swalTitle) {
	if (action && method && data && isObject) {
		let path =
			action == "insert"
				? `${base_url}operations/insertTableData`
				: `${base_url}operations/updateTableData`;
		return !isObject
			? await saveUpdateDeleteDatabaseFormData(data, path, false, swalTitle)
			: await saveUpdateDeleteDatabaseObject(data, path, false, swalTitle);
	} else {
		return "Failed to save document!";
	}
}
// ----- END SAVE FORM/DOCUMENT ----


// ----- FORM/DOCUMENT CONFIRMATION -----
function formConfirmation(
	method = "", // save|cancelform|approve|reject|submit|cancel
	action = "",
	title = "",
	modalID = "",
	containerID = "",
	data = null,
	isObject = true,
	callback = false
) {
	if (method && action && title && (modalID || containerID)) {
		method = method.toLowerCase();
		action = action.toLowerCase() == "update" ? "update" : "insert";

		modalID && $("#" + modalID).modal("hide");

		let swalText, swalImg;
		switch (method) {
			case "save":
				swalTitle = `SAVE ${title.toUpperCase()}`;
				swalText = "Are you sure to save this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "submit":
				swalTitle = `SUBMIT ${title.toUpperCase()}`;
				swalText = "Are you sure to submit this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "approve":
				swalTitle = `APPROVE ${title.toUpperCase()}`;
				swalText = "Are you sure to approve this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "reject":
				swalTitle = `REJECT ${title.toUpperCase()}`;
				swalText = "Are you sure to reject this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			case "cancelform":
				swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
				swalText = "Are you sure to cancel this document?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
			default:
				swalTitle = `CANCEL ${title.toUpperCase()}`;
				swalText = "Are you sure that you want to cancel this process?";
				swalImg = `${base_url}assets/modal/add.svg`;
				break;
		}
		Swal.fire({
			title: swalTitle,
			text: swalText,
			imageUrl: swalImg,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: "Custom image",
			showCancelButton: true,
			confirmButtonColor: "#28a745",
			cancelButtonColor: "#1A1A1A",
			cancelButtonText: "No",
			confirmButtonText: "Yes",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				if (method != "cancel") {
					let saveData = saveFormData(
						action,
						method,
						data,
						isObject,
						swalTitle
					);
					saveData.then((res) => {
						if (res) {
							callback && callback();
						} else {
							Swal.fire({
								icon: "danger",
								title: "Failed!",
								text: result[1],
								showConfirmButton: false,
								timer: 2000,
							});
						}
					});
				} else {
					Swal.fire({
						icon: "success",
						title: swalTitle,
						showConfirmButton: false,
						timer: 2000,
					});
				}
			} else {
				containerID && $("#" + containerID).show();
				modalID && $("#" + modalID).modal("show");
			}
		});
	} else {
		showNotification("danger", "Invalid arguments!");
	}
}
// ----- END FORM/DOCUMENT CONFIRMATION -----


// ----- CANCEL FORM -----
function cancelForm(
	method = "",
	action = "",
	title = "",
	modalID = "",
	containerID = "",
	data = null,
	isObject = true,
	callback = false
) {
	if (method && action && title && (modalID || containerID)) {
		modalID && $("#" + modalID).modal("hide");

		Swal.fire({
			title: `SAVE AS DRAFT`,
			text: `Do you want to save your changes for filing this ${title.toLowerCase()}?`,
			imageUrl: `${base_url}assets/modal/add.svg`,
			imageWidth: 200,
			imageHeight: 200,
			imageAlt: "Custom image",
			showCancelButton: true,
			confirmButtonColor: "#28a745",
			cancelButtonColor: "#1A1A1A",
			cancelButtonText: "No",
			confirmButtonText: "Yes",
			allowOutsideClick: false,
		}).then((result) => {
			if (result.isConfirmed) {
				const formID = modalID ? modalID : containerID;
				const validate = validateForm(formID);
				if (validate) {
					let saveData = saveFormData(
						action,
						method,
						data,
						isObject,
						`SAVE ${title.toUpperCase()}`
					);
					saveData.then((res) => {
						if (res) {
							callback && callback();
						} else {
							Swal.fire({
								icon: "danger",
								title: "Failed!",
								text: result[1],
								showConfirmButton: false,
								timer: 2000,
							});
						}
					});
				} else {
					modalID && $("#" + modalID).modal("show");
				}
			} else {
				modalID && $("#" + modalID).modal("hide");
				containerID && $("#" + containerID).hide();
				callback && callback();
			}
		});
	} else {
		showNotification("danger", "Invalid arguments");
	}
}
// ----- END CANCEL FORM -----


// ----- GET MODULE APPROVER -----
function getModuleApprover(moduleID = null) {
	const getData = getTableData("gen_approval_setup_tbl", "", "moduleID = "+moduleID+" AND roleID = "+sessionRoleID);
	if (getData.length > 0) {
		let approverID    = getData[0]["userAccountID"] ? getData[0]["userAccountID"] : "";
		let approverIDArr = approverID ? approverID.split("|") : [];
			approverIDArr = approverIDArr.filter(item => item != '0');
		let index = approverIDArr.indexOf(sessionID);
		if (index === -1) {
			return approverIDArr.join("|");
		} else {
			return approverIDArr.slice(index+1).join("|");
		}
	}
	return "";
}
// ----- GET MODULE APPROVER -----


// ----- IS IM APPROVER -----
function isImApprover(moduleApprover = null) {
	if (moduleApprover) {
		const moduleApproverArr = moduleApprover.split("|");
		return moduleApproverArr.find((id) => id === sessionID) ? true : false;
	}
	return false;
}

function isImModuleApprover(tableName = false, columnName = false) {
	if (tableName && columnName) {
		const dataLength = getTableDataLength(tableName, "", `FIND_IN_SET('${sessionID}', REPLACE(${columnName}, '|', ','))`);
		return dataLength > 0 ? true : false;
	}
	return false;
}
// ----- END IS IM APPROVER -----


// ----- IS IM LAST APPROVER -----
function isImLastApprover(approversID = null, approversDate = null) {
	if (approversID) {
		let idArr = approversID.split("|");
		let idLength = idArr.length;
		let dateArr = approversDate ? approversDate.split("|") : [];
		let dateLength = dateArr.length+1;
		return idLength == dateLength;
	}
	return false;
}
// ----- END IS IM LAST APPROVER -----


// ----- CURRENT APPROVER -----
function isImCurrentApprover(approversID = null, approversDate = null, status = null) {
	if (approversID && status != 3) {
		const index = approversDate ? approversDate.split("|").length + 1 : 1;
		const approversIDArr = approversID.split("|");
		const id = approversIDArr[index - 1];
		return id === sessionID ? true : false;
	}
	return false;
}
// ----- END CURRENT APPROVER -----


// ----- IS DOCUMENT ALREADY APPROVED -----
function isAlreadyApproved(approversID = null, approversDate = null) {
	if (approversID) {
		const approversIDArr = approversID ? approversID.split("|") : [];
		const approversDateArr = approversDate ? approversDate.split("|") : [];
		const index = approversIDArr.indexOf(sessionID);
		return approversDateArr[index] ? true : false;
	}
	return false;
}
// ----- END IS DOCUMENT ALREADY APPROVED -----


// ----- FUNCTION UPDATE DATE -----
function updateApproveDate(date) {
	let dateToday = moment().format("YYYY-MM-DD hh:mm:ss");
	if (date) {
		let dateArr = date.split("|");
		dateArr.push(dateToday);
		return dateArr.join("|");
	}
	return dateToday;
}
// ----- END FUNCTION UPDATE DATE -----


// ----- UPDATE APPROVERS STATUS -----
function updateApproveStatus(approversStatus, status) {
	if (approversStatus) {
		let approversStatusArr = approversStatus.split("|");
		approversStatusArr.push(status);
		return approversStatusArr.join("|");
	}
	return status;
}
// ----- END UPDATE APPROVERS STATUS -----


// ----- DATE APPROVED -----
function getDateApproved(status, approversID = false, approversDate = false) {
	if (status && approversID && approversDate) {
		if (status == 2) {
			const dateArr = approversDate.split("|");
			const index = dateArr.length-1;
			return moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A");
		}
	}
	return "---";
}
// ----- END DATE APPROVED -----


function getApproversStatus(approversID, approversStatus, approversDate) {
	let html = "";
	if (approversID && approversStatus) {
		let idArr     = approversID.split("|");
		let statusArr = approversStatus.split("|");
		let dateArr   = approversDate.split("|");
		html += `<div class="row mt-4">`;
		statusArr && statusArr.map((item, index) => {
			let date = moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A");

			let statusBadge = item == 2 ? `
			<span class="badge badge-outline-success">
				Approved - ${date}</span>` : `
			<span class="badge badge-outline-danger">
				Rejected - ${date}</span>`;

			html += `
			<div class="col-xl-3 col-lg-3 col-md-4 col-sm-12"
				<span>Arjay Diangzon - ${idArr[index]}</span><br>
				${statusBadge}
			</div>`;
		})
		html += `</div>`;
	}
	return html;
}


// ----- BADGE STATUS -----
function getStatusStyle(status = 1) {
	switch (status) {
		case "1":
			return `<span class="badge badge-outline-info w-100">For Approval</span>`;
		case "2":
			return `<span class="badge badge-info w-100">Approved</span>`;
		case "3":
			return `<span class="badge badge-danger w-100">Rejected</span>`;
		case "4":
			return `<span class="badge badge-primary w-100">Cancelled</span>`;
		case "0":
		default:
			return `<span class="badge badge-warning w-100">Draft</span>`;
	}
}
// ----- END BADGE STATUS -----


