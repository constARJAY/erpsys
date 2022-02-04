_base_url = $(`.page-loader-wrapper`).attr("base_url");

// ----- SQL -----
function database(sql) {
	if (sql) {
		const key = prompt(
			"Please enter password:",
			"YOU ARE NOT ALLOWED TO DO THIS!"
		);
		if (key != null || key != "") {
			const encryptKey = encryptString(key);
			if (
				decryptString(encryptKey) ==
				decryptString("U2FsdGVkX1/bAiO4H60pg3oTTlI43QSPzNcbbImFWro=")
			) {
				let result = [];
				$.ajax({
					method: "POST",
					url: `${_base_url}operations/database`,
					data: { sql },
					async: false,
					dataType: "json",
					success: function (data) {
						if (data) {
							data.map((item) => {
								result.push(item);
							});
						}
					},
					error: function (err) {
						showNotification(
							"danger",
							"System error: Please contact the system administrator for assistance!"
						);
					},
				});
				return result;
			} else {
				alert("ERROR! I TOLD YOU");
				console.log("INCORRECT KEY!");
				return false;
			}
		}
		alert("ERROR! I TOLD YOU");
		console.log("INCORRECT KEY!");
		return false;
	}
	return false;
};
// ----- END SQL -----

// ----- GET DATABASE TABLE DATA -----
function getTableData(
	tableName = null,
	columnName = "",
	searchFilter = "",
	orderBy = "",
	groupBy = "",
	others = ""
) {
	let path = `${_base_url}operations/getTableData`;
	let data = {
		tableName,
		columnName,
		searchFilter,
		orderBy,
		groupBy,
		others,
	};
	let result = [];
	if (tableName) {
		$.ajax({
			method: "POST",
			url: path,
			data,
			async: false,
			dataType: "json",
			success: function (data) {
				if (data) {
					data.map((item) => {
						result.push(item);
					});
				}
			},
			error: function (err) {
				showNotification(
					"danger",
					"System error: Please contact the system administrator for assistance!"
				);
			},
		});
	}
	return result;
};
// ----- END GET DATABASE TABLE DATA -----

// ----- GET DATABASE TABLE DATA -----
function getTableDataLength(
	tableName = null,
	columnName = "",
	searchFilter = "",
	orderBy = "",
	groupBy = "",
	others = ""
) {
	let path = `${_base_url}operations/getTableDataLength`;
	let data = {
		tableName,
		columnName,
		searchFilter,
		orderBy,
		groupBy,
		others,
	};
	let result = 0;
	if (tableName) {
		$.ajax({
			method: "POST",
			url: path,
			data,
			async: false,
			success: function (data) {
				if (data) {
					result = data;
				}
			},
			error: function (err) {
				showNotification(
					"danger",
					"System error: Please contact the system administrator for assistance!"
				);
			},
		});
	}
	return result;
};
// ----- END GET DATABASE TABLE DATA -----

// ----- GET LAST CODE -----
function getTableLastCode(
	tableName = false,
	columnName = false,
	whereFilter = ""
) {
	if (tableName && columnName) {
		// let table = getTableDataLength(tableName, "createdAt");
		let result = 0;
		let lastID = getTableData(
			tableName,
			columnName,
			whereFilter,
			`${columnName} DESC`,
			"",
			"LIMIT 1"
		);

		if (lastID.length > 0) {
			if (lastID && lastID.length > 0) {
				const columnValue = lastID[0][columnName];
				const arrValue = columnValue.split("-");
				result = arrValue[2] ?? arrValue[0];
				result = +result;
			} else {
				result = 0;
			}
		}

		return result;
	}
	return "Invalid arguments";
};
// ----- END GET LAST CODE -----

// ----- GENERATE CODE -----
function generateCode(
	firstStr = "STR",
	lastID = false,
	tableName = false,
	columnName = false,
	whereFilter = "",
	minus = false
) {
	let id;
	let value = minus ? 0 : 1;
	if (!lastID && tableName && columnName) {
		id = getTableLastCode(tableName, columnName, whereFilter) + value;
	} else {
		id = lastID ? lastID + value : 1;
	}

	id = id.toString();
	let lastStr = "00001";
	if (id.length <= 0) {
		return `${firstStr}-${moment().format("YY")}-${lastStr}`;
	} else if (id.length > 0 && id.length < 5) {
		lastStr = "0".repeat(5 - id.length) + id;
		return `${firstStr}-${moment().format("YY")}-${lastStr}`;
	} else {
		return `${firstStr}-${moment().format("YY")}-${id}`;
	}
};
// ----- END GENERATE CODE -----

// ----- GENERATE ITEM CODE -----
function generateItemCode(
	classificationID = null,
	type = "item"
) {
	let id;
	let table = type == `item` ? 'ims_inventory_item_tbl'  : 'ims_inventory_asset_tbl' ;
	let tableID = type == `item` ? 'itemID'  : 'assetID' ;
	let code = type == `item` ? 'ITM'  : 'AST' ;
	
	
	let tableData = getTableData(`ims_inventory_classification_tbl AS iict LEFT JOIN ${table} AS iiit USING(classificationID)`,
								`COUNT(${tableID}) AS lastID, classificationShortcut`, `iiit.classificationID ='${classificationID}' `);
	let shortcutCode = tableData[0].classificationShortcut;
	let lastID 		 = tableData[0].lastID < 1 ? 1 : parseInt(tableData[0].lastID) + 1;
	let stringID 	 = lastID.toString();
	let lastStr = "0".repeat(5 - stringID.length) + lastID;
	return shortcutCode ? `${code}-${shortcutCode}-${moment().format("YY")}-${lastStr}` : false;
};
// ----- END GENERATE ITEM CODE -----

// ----- SAVE/UPDATE/DELETE TABLE DATA -----
async function saveUpdateDeleteDatabaseFormData(
	data,
	path,
	feedback = false,
	swalTitle,
	overrideSuccessConfirmation
) {
	let result = await $.ajax({
		method: "POST",
		url: path,
		data,
		processData: false,
		contentType: false,
		global: false,
		cache: false,
		async: false,
		dataType: "json",
		beforeSend: function () {
			$("#loader").show();
		},
		success: function (data) {
			let result = data.split("|");
			let isSuccess = result[0],
				message = result[1],
				id = result[2] ? result[2] : null;

			if (isSuccess == "true") {
				if (feedback) {
					feedback = feedback.split("|");
					feedbackClass = feedback[0];
					feedbackMsg = feedback[1];
					setTimeout(() => {
						$("#loader").hide();
						closeModals();
						if (swalTitle) {
							Swal.fire({
								icon: feedbackClass,
								title: swalTitle,
								text: feedbackMsg,
								showConfirmButton: false,
								timer: 2000,
							});
						} else {
							Swal.fire({
								icon: feedbackClass,
								title: feedbackMsg,
								showConfirmButton: false,
								timer: 2000,
							});
						}
					}, 500);
				} else {
					setTimeout(() => {
						$("#loader").hide();
						closeModals();
						Swal.fire({
							icon: "success",
							title: message,
							showConfirmButton: false,
							timer: 2000,
						});
					}, 500);
				}
			} else {
				$("#loader").hide();
				Swal.fire({
					icon: "danger",
					title: message,
					showConfirmButton: false,
					timer: 2000,
				});
			}
		},
		error: function (err) {
			showNotification(
				"danger",
				"System error: Please contact the system administrator for assistance!"
			);
			$("#loader").hide();
		},
	});
	return (await result) ? result : false;
};

async function saveUpdateDeleteDatabaseFormDatav1(
	data,
	path,
	feedback = false,
	swalTitle
) {
	let flag;
	$.ajax({
		method: "POST",
		url: path,
		data,
		processData: false,
		contentType: false,
		global: false,
		cache: false,
		async: false,
		dataType: "json",
		beforeSend: function () {
			$("#loader").show();
		},
		success: function (data) {
			let result = data.split("|");
			let isSuccess = result[0],
				message = result[1],
				id = result[2] ? result[2] : null;

			if (isSuccess == "true") {
				if (feedback) {
					feedback = feedback.split("|");
					feedbackClass = feedback[0];
					feedbackMsg = feedback[1];
					setTimeout(() => {
						closeModals();
						showNotification(feedbackClass, feedbackMsg);
						flag = true;
						$("#loader").hide();
					}, 500);
				} else {
					setTimeout(() => {
						closeModals();
						showNotification("success", message);
						flag = true;
						$("#loader").hide();
					}, 500);
				}
			} else {
				flag = false;
				showNotification("danger", message);
				$("#loader").hide();
			}
		},
		error: function (err) {
			flag = false;
			showNotification(
				"danger",
				"System error: Please contact the system administrator for assistance!"
			);
			$("#loader").hide();
		},
	});
	return await flag;
};

async function saveUpdateDeleteDatabaseObject(
	data,
	path,
	feedback = false,
	swalTitle,
	overrideSuccessConfirmation = false
) {
	let result = await $.ajax({
		method: "POST",
		url: path,
		data,
		async: false,
		dataType: "json",
		beforeSend: function () {
			$("#loader").show();
		},
		success: function (data) {
			let result = data.split("|");
			let isSuccess = result[0],
				message   = result[1],
				id        = result[2] ? result[2] : null;

			if (isSuccess == "true") {
				if (feedback) {
					feedback      = feedback.split("|");
					feedbackClass = feedback[0];
					feedbackMsg   = feedback[1];
					setTimeout(() => {
						$("#loader").hide();
						closeModals();
						if (swalTitle) {
							Swal.fire({
								icon: feedbackClass,
								title: swalTitle,
								text: feedbackMsg,
								showConfirmButton: false,
								timer: 2000,
							});
						} else {
							Swal.fire({
								icon: feedbackClass,
								title: feedbackMsg,
								showConfirmButton: false,
								timer: 2000,
							});
						}

					}, 500);
				} else {

					if (overrideSuccessConfirmation) {
						let code = overrideSuccessConfirmation.split("-");
							code = getFormCode(code[0], code[1], id);
						let title = message.split(" ");
							title = `${code} ${title[1]} ${title[2]}`;
						
						setTimeout(() => {
							$("#loader").hide();
							closeModals();
							Swal.fire({
								icon: "success",
								title: title,
								showConfirmButton: false,
								timer: 2000,
							});
						}, 500);
					} else {
						setTimeout(() => {
							$("#loader").hide();
							closeModals();
							Swal.fire({
								icon: "success",
								title: message,
								showConfirmButton: false,
								timer: 2000,
							});
						}, 500);
					}
					
				}
			} else {
				$("#loader").hide();
				Swal.fire({
					icon: "danger",
					title: message,
					showConfirmButton: false,
					timer: 2000,
				});
			}
		},
		error: function (err) {
			showNotification(
				"danger",
				"System error: Please contact the system administrator for assistance!"
			);
			$("#loader").hide();
		},
	});
	return (await result) ? result : false;
};

async function saveUpdateDeleteDatabaseObjectv1 (
	data,
	path,
	feedback = false,
	swalTitle
) {
	let flag;
	$.ajax({
		method: "POST",
		url: path,
		data,
		async: false,
		dataType: "json",
		beforeSend: function () {
			$("#loader").show();
		},
		success: function (data) {
			let result = data.split("|");
			let isSuccess = result[0],
				message = result[1],
				id = result[2] ? result[2] : null;

			if (isSuccess == "true") {
				if (feedback) {
					feedback = feedback.split("|");
					feedbackClass = feedback[0];
					feedbackMsg = feedback[1];
					setTimeout(() => {
						closeModals();
						showNotification(feedbackClass, feedbackMsg);
						flag = true;
						$("#loader").hide();
					}, 500);
				} else {
					setTimeout(() => {
						closeModals();
						showNotification("success", message);
						flag = true;
						$("#loader").hide();
					}, 500);
				}
			} else {
				flag = false;
				showNotification(
					"danger",
					"System error: Please contact the system administrator for assistance!"
				);
				$("#loader").hide();
			}
		},
		error: function (err) {
			flag = false;
			showNotification(
				"danger",
				"System error: Please contact the system administrator for assistance!"
			);
			$("#loader").hide();
		},
	});
	return await flag;
};

async function insertTableData(
	data,
	object = false,
	feedback = false,
	swalTitle = false
){
	let path = `${_base_url}operations/insertTableData`;
	return !object
		? await saveUpdateDeleteDatabaseFormData(data, path, feedback, swalTitle)
		: await saveUpdateDeleteDatabaseObject(data, path, feedback, swalTitle);
};

async function insertTableDatav1(
	data,
	object = false,
	feedback = false,
	swalTitle = false
){
	$("#loader").show();
	let path = `${_base_url}operations/insertTableData`;
	return !object
		? await saveUpdateDeleteDatabaseFormDatav1(data, path, feedback, swalTitle)
		: await saveUpdateDeleteDatabaseObjectv1(data, path, feedback, swalTitle);
};

async function updateTableData(
	data,
	object = false,
	feedback = false,
	swalTitle = false
){
	let path = `${_base_url}operations/updateTableData`;
	return !object
		? await saveUpdateDeleteDatabaseFormData(data, path, feedback, swalTitle)
		: await saveUpdateDeleteDatabaseObject(data, path, feedback, swalTitle);
};

async function updateTableDatav1(
	data,
	object = false,
	feedback = false,
	swalTitle = false
){
	$("#loader").show();
	let path = `${_base_url}operations/updateTableData`;
	return !object
		? await saveUpdateDeleteDatabaseFormDatav1(data, path, feedback, swalTitle)
		: await saveUpdateDeleteDatabaseObjectv1(data, path, feedback, swalTitle);
};

async function deleteTableData(
	data,
	object = false,
	feedback = false,
	swalTitle = false
){
	$("#loader").show();
	let path = `${_base_url}operations/deleteTableData`;
	return !object
		? await saveUpdateDeleteDatabaseFormData(data, path, feedback, swalTitle)
		: await saveUpdateDeleteDatabaseObject(data, path, feedback, swalTitle);
};
// ----- END SAVE/UPDATE/DELETE TABLE DATA -----

// ----- INSERT NOTIFICATION -----
function insertNotificationData(data) {
	if (data) {
		$.ajax({
			method: "POST",
			url: `${_base_url}operations/insertNotificationData`,
			data,
			dataType: "json",
			async: false,
			success: function (data) {},
		});
	}
	return false;
};
// ----- END INSERT NOTIFICATION -----

// ----- GET EMPLOYEE DATA -----
function getAllEmployeeData(employeeID = null) {
	const whereEmployee = employeeID ? `employeeID = ${employeeID}` : "1=1";
	const data = getTableData(
		`hris_employee_list_tbl AS helt
			LEFT JOIN hris_department_tbl USING(departmentID)
			LEFT JOIN hris_designation_tbl USING(designationID)`,
		`employeeID,
		CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
		departmentName AS department,
		designationName AS designation, designationID AS designationID`,
		`employeeStatus = 1 OR employeeStatus = 2 OR ${whereEmployee}`
	);
	return data || [];
};

function getEmployeeData(employeeID) {
	if (employeeID) {
		const data = getTableData(
			`
			hris_employee_list_tbl AS helt
				LEFT JOIN hris_department_tbl USING(departmentID)
				LEFT JOIN hris_designation_tbl USING(designationID)`,
			`
			CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
			departmentName,
			designationName`,
			"employeeID=" + employeeID
		);
		return (data && data[0]) || null;
	}
	return null;
};
// ----- END GET EMPLOYEE DATA -----

// ----- EMPLOYEE PERMISSIONS -----
function getEmployeePermission(moduleID, method) {
	if (moduleID && method) {
		let _sessionID = $(`.page-loader-wrapper`).attr("session");
		const data = getTableData(
			"hris_employee_permission_tbl",
			"createStatus, readStatus, updateStatus, deleteStatus, printStatus",
			`employeeID = ${_sessionID} AND moduleID = ${moduleID}`
		);
		if (data.length > 0) {
			switch (method) {
				case "create":
					return data[0].createStatus == 1 ? true : false;
				case "read":
					return data[0].readStatus == 1 ? true : false;
				case "update":
					let result = data[0].updateStatus == 1 ? true : false;
					$("body").attr("update", result);
					return result;
				case "delete":
					return data[0].deleteStatus == 1 ? true : false;
				case "print":
					return data[0].printStatus == 1 ? true : false;
				default:
					return false;
			}
		}
	}
	return false;
};

function isCreateAllowed(moduleID = 60) {
	return getEmployeePermission(moduleID, "create");
};

function isReadAllowed(moduleID = 60) {
	return getEmployeePermission(moduleID, "read");
};

function isUpdateAllowed(moduleID = 60) {
	return getEmployeePermission(moduleID, "update");
};

function isDeleteAllowed(moduleID = 60) {
	return getEmployeePermission(moduleID, "delete");
};

function isPrintAllowed(moduleID = 60) {
	return getEmployeePermission(moduleID, "print");
};

function getUnionTableData(
	unionData = "",
) {
	let path = `${_base_url}operations/getUnionTableData`;
	let data = {
		unionData,
	};
	let result = [];
	if (unionData) {
		$.ajax({
			method: "POST",
			url: path,
			data,
			async: false,
			dataType: "json",
			success: function (data) {
				if (data) {
					data.map((item) => {
						result.push(item);
					});
				}
			},
			error: function (err) {
				showNotification(
					"danger",
					"System error: Please contact the system administrator for assistance!"
				);
			},
		});
	}
	return result;
};

// ----- END EMPLOYEE PERMISSIONS -----
