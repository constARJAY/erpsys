$(document).ready(function () {

	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
			$("#tableForApprroval").DataTable().destroy();
		}

		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableForApprroval")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [{
					 targets: 0, width: 150 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 180 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 290 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 150 },
					{ targets: 8, width: 80 },
					{ targets: 9, width: 80 },
				],
			});

		var table = $("#tableMyForms")
			.css({
				"min-width": "100%"
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [{
					 targets: 0, width: 150 },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 180 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 290 },
					{ targets: 5, width: 150 },
					{ targets: 6, width: 150 },
					{ targets: 7, width: 150 },
					{ targets: 8, width: 80 },
					{ targets: 9, width: 80 },
				],
			});
	}

	// ----- HEADER CONTENT -----
	function headerTabContent(display = true) {
		if (display) {
			if (isImModuleApprover("hris_official_business_tbl", "approversID")) {
				let html = `
                <div class="bh_divider appendHeader"></div>
                <div class="row clearfix appendHeader">
                    <div class="col-12">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab">For Approval</a></li>
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab">My Forms</a></li>
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
			html = `
            <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
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
		let scheduleData = getTableData(
			`hris_official_business_tbl AS ob 
					LEFT JOIN pms_client_tbl AS cl ON ob.officialBusinessCompanyID=cl.clientID 
					LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`ob.officialBusinessID,ob.officialBusinessCode,ob.employeeID,officialBusinessCompanyID,ob.officialBusinessAddress,ob.officialBusinessDate,
					ob.officialBusinessTimeIn,ob.officialBusinessTimeOut,ob.officialBusinessReason,ob.approversID,ob.approversStatus,ob.approversDate,
					ob.officialBusinessStatus,ob.officialBusinessRemarks,ob.submittedAt,ob.createdBy,ob.updatedBy,ob.createdAt,ob.updatedAt,cl.clientName,
					hris_employee_list_tbl.employeeFirstname, hris_employee_list_tbl.employeeLastname`,
			`employeeID != ${sessionID} AND officialBusinessStatus != 0 AND officialBusinessStatus != 4`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableForApprroval">
            <thead>
                <tr>
                    <th>Document Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			console.log(item.submittedAt);
			let button = `
			<button class="btn btn-view w-100 btnView" id="${item.officialBusinessID}"><i class="fas fa-eye"></i> View</button>`;

			if (isImCurrentApprover(item.approversID, item.approversDate, item.officialBusinessStatus) || isAlreadyApproved(item.approversID, item.approversDate)) {
				html += `
				<tr>
					<td>${item.officialBusinessCode}</td>
					<td>${item.employeeFirstname + ' ' + item.employeeLastname}</td>
					<td>${moment(item.createdAt).format("MMMM DD, YYYY hh:mm:ss A")}</td>
                    <td>${item.clientName}</td>
                    <td>${item.officialBusinessAddress}</td>
					<td>${moment(item.officialBusinessDate).format("MMMM DD, YYYY")}</td>
					<td>${item.officialBusinessTimeIn} - ${item.officialBusinessTimeOut}</td>
					<td>${item.officialBusinessRemarks}</td>
					<td class="text-center">${getStatusStyle(item.officialBusinessStatus)}</td>
					<td class="text-center">
						${button}
					</td>
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
		}, 500);
	}
	// ----- END FOR APPROVAL CONTENT -----

	// ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
		let scheduleData = getTableData(
			`hris_official_business_tbl AS ob 
			LEFT JOIN pms_client_tbl AS cl ON ob.officialBusinessCompanyID=cl.clientID 
			LEFT JOIN hris_employee_list_tbl USING(employeeID)`,
			`ob.officialBusinessID,ob.officialBusinessCode,ob.employeeID,officialBusinessCompanyID,ob.officialBusinessAddress,ob.officialBusinessDate,
			ob.officialBusinessTimeIn,ob.officialBusinessTimeOut,ob.officialBusinessReason,ob.approversID,ob.approversStatus,ob.approversDate,
			ob.officialBusinessStatus,ob.officialBusinessRemarks,ob.submittedAt,ob.createdBy,ob.updatedBy,ob.createdAt,ob.updatedAt,cl.clientName,
			hris_employee_list_tbl.employeeFirstname, hris_employee_list_tbl.employeeLastname`,
			`employeeID = ${sessionID}`
		);

		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr>
                    <th>Document Code</th>
                    <th>Employee Name</th>
					<th>Date Created</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Time In/Time Out</th>
                    <th>Remarks</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

		scheduleData.map((item) => {
			let unique = {
				id: item.officialBusinessID,
				officialBusinessDate: moment(item.officialBusinessDate).format("MMMM DD, YYYY")
			};
			uniqueData.push(unique);

			let button =
				item.officialBusinessStatus != 0 ?
				`
            <button class="btn btn-view w-100 btnView" id="${item.officialBusinessID}"><i class="fas fa-eye"></i> View</button>` :
				`
            <button 
                class="btn btn-edit w-100 btnEdit" 
                id="${item.officialBusinessID}" 
                code="${item.officialBusinessCode}"><i class="fas fa-edit"></i> Edit</button>`;
			html += `
            <tr>
                <td>${item.officialBusinessCode}</td>
                <td>${item.employeeFirstname + ' ' + item.employeeLastname}</td>
				<td>${moment(item.createdAt).format("MMMM DD, YYYY hh:mm:ss A")}</td>
                <td>${item.clientName}</td>
                <td>${item.officialBusinessAddress}</td>
                <td>${moment(item.officialBusinessDate).format("MMMM DD, YYYY")}</td>
                <td>${item.officialBusinessTimeIn} - ${item.officialBusinessTimeOut}</td>
                <td>${item.officialBusinessRemarks}</td>
                <td class="text-center">${getStatusStyle(item.officialBusinessStatus)}</td>
                <td class="text-center">
                    ${button}
                </td>
            </tr>`;
		});

		html += `
            </tbody>
        </table>`;

		setTimeout(() => {
			$("#tableMyFormsParent").html(html);
			initDataTables();
			return html;
		}, 500);
	}

	// ----- FORM BUTTONS -----
	function formButtons(data = false) {
		let button = "";
		if (data) {

			let {
				officialBusinessID = "",
					officialBusinessCode = "",
					officialBusinessStatus = "",
					employeeID = "",
					approversID = "",
					approversDate = "",
			} = data && data[0];

			let isOngoing = approversDate ? (approversDate.split("|").length > 0 ? true : false) : false;
			if (employeeID === sessionID) {
				if (officialBusinessStatus == 0) {
					// DRAFT
					button = `
					<button 
						class="btn btn-submit" 
						id="btnSubmit" 
						officialBusinessID="${officialBusinessID}"
						officialBusinessCode="${officialBusinessCode}"><i class="fas fa-paper-plane"></i>
						Submit
					</button>
					<button 
						class="btn btn-cancel"
						id="btnCancelForm" 
						officialBusinessID="${officialBusinessID}"
						officialBusinessCode="${officialBusinessCode}"><i class="fas fa-ban"></i> 
						Cancel
					</button>`;
				} else if (officialBusinessStatus == 1) {
					if (!isOngoing) {
						button = `
						<button 
							class="btn btn-cancel"
							id="btnCancelForm" 
							officialBusinessID="${officialBusinessID}"
							officialBusinessCode="${officialBusinessCode}"><i class="fas fa-ban"></i> 
							Cancel
						</button>`;
					}
				}
			} else {
				if (officialBusinessStatus == 1) {
					if (isImCurrentApprover(approversID, approversDate)) {
						button = `
						<button 
							class="btn btn-submit" 
							id="btnApprove" 
							officialBusinessID="${officialBusinessID}"
							officialBusinessCode="${officialBusinessCode}"><i class="fas fa-paper-plane"></i>
							Approve
						</button>
						<button 
							class="btn btn-cancel"
							id="btnReject" 
							officialBusinessID="${officialBusinessID}"
							officialBusinessCode="${officialBusinessCode}"><i class="fas fa-ban"></i> 
							Deny
						</button>`;
					}
				}
			}

		} else {
			button = `
			<button 
				class="btn btn-submit" 
				id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
			</button>
			<button 
				class="btn btn-cancel" 
				id="btnCancel"><i class="fas fa-ban"></i> 
				Cancel
			</button>`;
		}
		return button;
	}
	// ----- END FORM BUTTONS -----
	// ----- FORM CONTENT -----
	function formContent(data = false, readOnly = false) {
		$("#page_content").html(preloader);

		let {
			officialBusinessID = "",
				officialBusinessCode = "",
				employeeID = "",
				officialBusinessCompanyID = "",
				officialBusinessAddress = "",
				officialBusinessDate = "",
				officialBusinessTimeIn = "",
				officialBusinessTimeOut = "",
				officialBusinessReason = "",
				officialBusinessRemarks = "",
				approversID = "",
				approversStatus = "",
				approversDate = "",
				officialBusinessStatus = false,
				submittedAt = false,
				createdAt = false,
		} = data && data[0];

		if (readOnly) {
			preventRefresh(false);
		} else {
			preventRefresh(true);
		}

		$("#btnBack").attr("officialBusinessID", officialBusinessID);
		$("#btnBack").attr("officialBusinessCode", officialBusinessCode);
		$("#btnBack").attr("status", officialBusinessStatus);

		let disabled = readOnly && "disabled";
		let button = formButtons(data);

		let html = `
        <div class="row">
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">${officialBusinessCode ? officialBusinessCode : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">${officialBusinessStatus ? getStatusStyle(officialBusinessStatus) : "---"}</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">${createdAt ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">${submittedAt ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">${getDateApproved(officialBusinessStatus, approversID, approversDate)}</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">${officialBusinessRemarks ? officialBusinessRemarks : "---"}</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_official_business">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" class="form-control" disabled value="Arjay Diangzon">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Company ${!disabled ? "<code>*</code>" : ""}</label>
                    <select 
                    class="form-control validate select2" 
                    id="officialBusinessCompanyID" 
                    name="officialBusinessCompanyID"
                    ${disabled} required>
                    ${getCompanyContent(officialBusinessCompanyID)}
                    </select>
            <div class="invalid-feedback d-block" id="invalid-officialBusinessCompanyID"></div>
                </div>
             </div>
            <div class="col-md-4 col-sm-12">
             <div class="form-group">
                 <label>Address ${!disabled ? "<code>*</code>" : ""}</label>
                 <input type="text"
                    class="form-control"
                    data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][-][<]"
                    id="officialBusinessAddress"
                    name="officialBusinessAddress"
                    value="${officialBusinessAddress}"
                    ${disabled} readonly required>
                <div class="d-block invalid-feedback" id="invalid-officialBusinessAddress"></div>
             </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="button" 
                        class="form-control validate daterange text-left"
                        required
                        id="officialBusinessDate"
                        name="officialBusinessDate"
                        value="${officialBusinessDate && moment(officialBusinessDate).format("MMMM DD, YYYY")}"
						${disabled}
						title="Date">
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessDate"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time In ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeIn" 
                        id="officialBusinessTimeIn" 
                        name="officialBusinessTimeIn" 
                        required
                        value="${officialBusinessTimeIn}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessTimeIn"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Time Out ${!disabled ? "<code>*</code>" : ""}</label>
                    <input type="text" 
                        class="form-control timeOut" 
                        id="officialBusinessTimeOut" 
                        name="officialBusinessTimeOut" 
                        required
                        value="${officialBusinessTimeOut}"
						${disabled}>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessTimeOut"></div>
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Work Performed ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control validate"
                        data-allowcharacters="[a-z][A-Z][0-9][ ][.][,][-][()]['][/][&]"
                        minlength="1"
                        maxlength="200"
                        id="officialBusinessReason"
                        name="officialBusinessReason"
                        required
                        rows="4"
                        style="resize:none;"
						${disabled}>${officialBusinessReason}</textarea>
                    <div class="d-block invalid-feedback" id="invalid-officialBusinessReason"></div>
                </div>
            </div>
            <div class="col-md-12 text-right">
                ${button}
            </div>
        </div>
		<div class="approvers">
			${getApproversStatus(approversID, approversStatus, approversDate)}
		</div>`;

		setTimeout(() => {
			$("#page_content").html(html);
			initAll();
			initDataTables();
			
			if(data){
				initInputmaskTime(false) 
			}else{
				initInputmaskTime();
			$("#officialBusinessDate").val(moment(new Date).format("MMMM DD, YYYY"));
			}
			
			$("#officialBusinessDate").data("daterangepicker").minDate = moment();
			//data ? initInputmaskTime(false) : initInputmaskTime();
			return html;
		}, 500);
	}
	// ----- END FORM CONTENT -----

	// ----- PAGE CONTENT -----
	function pageContent(isForm = false, data = false, readOnly = false) {
		$("#page_content").html(preloader);
		if (!isForm) {
			preventRefresh(false);
			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                    <div class="table-responsive" id="tableForApprovalParent">
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="table-responsive" id="tableMyFormsParent">
                    </div>
                </div>
            </div>`;
			$("#page_content").html(html);

			headerButton(true, "Add Official Business");
			headerTabContent();
			forApprovalContent();
			myFormsContent();
		} else {
			headerButton(false);
			headerTabContent(false);
			formContent(data, readOnly);
		}
	}
	pageContent();
	// ----- END PAGE CONTENT ----

	// function getModuleHeaderOptions(clientID = 0) {
	// 	let getModuleHeader = getTableData("pms_client_tbl", "*", "	clientStatus = 1");
	// 	let moduleHeaderOptions = `<option ${clientID == 0 && "selected"} disabled>Select Company Name</option>`;
	// 	getModuleHeader.map(item => {
	// 		moduleHeaderOptions += `<option value="${item.clientID}" ${item.clientID == clientID && "selected"}>${item.clientName}</option>`;
	// 	})

	// 	return moduleHeaderOptions;

	// }

	// ----- COMPANY CONTENT ----
	function getCompanyContent(clientID = false) {
		let getModuleHeader = getTableData("pms_client_tbl", "*", "	clientStatus = 1");

		let moduleHeaderOptions = `<option ${!clientID && "selected"} disabled>Select Company Name</option>`;
		getModuleHeader.map(item => {

			let address = `${item.clientUnitNumber && titleCase(item.clientUnitNumber)+", "}${item.clientHouseNumber && item.clientHouseNumber +", "}${item.clientBarangay && titleCase(item.clientBarangay)+", "}${item.clientCity && titleCase(item.clientCity)+", "}${item.clientProvince && titleCase(item.clientProvince)+", "}${item.clientCountry && titleCase(item.clientCountry)+", "}${item.clientPostalCode && titleCase(item.clientPostalCode)}`;

			moduleHeaderOptions += `<option value="${item.clientID}" ${item.clientID == clientID && "selected"} companyAddress="${address}">${item.clientName}</option>`;

			if (clientID && item.clientID == clientID[0].clientID) {
				$("#officialBusinessAddress").val(address);

			}

		})

		return moduleHeaderOptions;

	}
	getCompanyContent();

	 // ----- CHANGE CLIENT ADDRESS -----
	 $(document).on("change", "#officialBusinessCompanyID", function() {
        var companyAddress = $(this).find("option:selected").attr("companyAddress");
        $("#officialBusinessAddress").val(companyAddress);
    });
    // ----- END CHANGE CLIENT ADDRESS -----




	// ----- CUSTOM INPUTMASK -----
	function initInputmaskTime(isMethodAdd = true) {
		if (isMethodAdd) {
			$(".timeIn").val("08:00");
			$(".timeOut").val("17:00");
		}

		$(".timeIn").inputmask({
			mask: "h:s",
			placeholder: "08:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
		$(".timeOut").inputmask({
			mask: "h:s",
			placeholder: "17:00",
			insertMode: false,
			hourFormat: "24",
			clearMaskOnLostFocus: false,
			floatLabelType: "Always",
			focus: function (args) {
				args.selectionEnd = args.selectionStart;
			},
		});
	}
	// ----- END CUSTOM INPUTMASK -----

	// ----- CHECK TIME RANGE -----
	function checkTimeRange(elementID = false, isReturnable = false) {
		let element = elementID ? `#${elementID}` : ".timeOut";
		let flag = 0;
		$(element).each(function () {
			const fromValue = $("#officialBusinessTimeIn").val() + ":00";
			const validated = $(this).hasClass("validated");
			const toValue = $(this).val() + ":00";

			const timeIn = moment(`2021-01-01 ${fromValue}`);
			const timeOut = moment(`2021-01-01 ${toValue}`);

			let diff = moment.duration(timeOut.diff(timeIn));
			diff = diff.asSeconds();

			const invalidFeedback = $(this).parent().find(".invalid-feedback");

			if (diff <= 0) {
				$(this).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("Invalid time range");
				flag++;
			} else {
				isReturnable || validated ?
					$(this).removeClass("is-invalid").addClass("is-valid") :
					$(this).removeClass("is-invalid").removeClass("is-valid");
				invalidFeedback.text("");
			}
		});
		if (isReturnable) {
			$(".modal").find(".is-invalid").first().focus();
			return flag > 0 ? false : true;
		}
	}
	// ----- END CHECK TIME RANGE -----

	// ----- GET DATA -----
	function getData(action = "insert", status, method, feedback, id = null) {
		let data = getFormData("form_official_business", true);

		const submittedAt =
			(status == 1 && moment().format("YYYY-MM-DD HH:mm:ss")) ||
			(status == 4 && null);
		const dateToday = moment().format("YYYY-MM-DD HH:mm:ss");

		if (action && method != "" && feedback != "") {
			data["tableData[officialBusinessStatus]"] = status;
			data["tableData[updatedBy]"] = sessionID;
			data["feedback"] = feedback;
			data["method"] = method;
			data["tableName"] = "hris_official_business_tbl";
			if (submittedAt) data["tableData[submittedAt]"] = submittedAt;

			if (action == "insert") {
				data["tableData[officialBusinessCode]"] = generateCode(
					"OBF",
					false,
					"hris_official_business_tbl",
					"officialBusinessCode",
				);
				data["tableData[employeeID]"] = sessionID;
				data["tableData[createdBy]"] = sessionID;
				data["tableData[createdAt]"] = dateToday;

				const approversID = getModuleApprover(58);
				if (approversID && method == "submit") {
					data["tableData[approversID]"] = approversID;
				}
				if (!approversID && method == "submit") {
					data["tableData[approversID]"] = sessionID;
					data["tableData[approversStatus]"] = 2;
					data["tableData[approversDate]"] = dateToday;
					data["tableData[officialBusinessStatus]"] = 2;
				}

			} else {
				data["whereFilter"] = "officialBusinessID =" + id;
			}
		}
		return data;
	}
	// ----- END GET DATA -----

	// ----- CHANGE TIME TO -----
	$(document).on("keyup", ".timeOut", function () {
		checkTimeRange($(this).attr("id"));
	});
	// ----- END CHANGE TIME TO -----


	// ----- OPEN ADD FORM -----
	$(document).on("click", "#btnAdd", function () {
		pageContent(true);
	});
	// ----- END OPEN ADD FORM -----

	// ----- CLOSE FORM -----
	$(document).on("click", "#btnBack", function () {
		const id = $(this).attr("officialBusinessID");
		const status = $(this).attr("status");

		if (status != "false" && status != 0) {
			$("#page_content").html(preloader);
			pageContent();
		} else {
			const feedback = $(this).attr("officialBusinessCode") ?
				$(this).attr("officialBusinessCode") :
				generateCode(
					"OBF",
					false,
					"hris_official_business_tbl",
					"officialBusinessCode",
				);

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 0, "save", feedback, id);

			cancelForm(
				"save",
				action,
				"OFFICIAL BUSINESS",
				"",
				"form_official_business",
				data,
				true,
				pageContent
			);
		}

	});
	// ----- END CLOSE FORM -----



	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		const code = $(this).attr("code");

		const tableData = getTableData(
			"hris_official_business_tbl",
			"*",
			"officialBusinessID=" + id,
			""
		);

		pageContent(true, tableData);
		getCompanyContent(tableData);
	});
	// ----- END OPEN EDIT MODAL -----


	// ----- VIEW DOCUMENT -----
	$(document).on("click", ".btnView", function () {
		const id = $(this).attr("id");
		const tableData = getTableData(
			"hris_official_business_tbl",
			"*",
			"officialBusinessID=" + id,
			""
		);
		pageContent(true, tableData, true);
	});
	// ----- END VIEW DOCUMENT -----

	// ----- SAVE DOCUMENT -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("form_official_business");
		const validateTime = checkTimeRange(false, true);
		if (validate && validateTime) {
			const action = "insert"; // CHANGE
			const feedback = generateCode(
				"OBF",
				false,
				"hris_official_business_tbl",
				"officialBusinessCode",
			);

			const data = getData(action, 0, "save", feedback);

			formConfirmation(
				"save",
				"insert",
				"OFFICIAL BUSINESS",
				"",
				"form_official_business",
				data,
				true,
				myFormsContent
			);
		}
	});
	// ----- END SAVE DOCUMENT -----


	// ----- SUBMIT DOCUMENT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = $(this).attr("officialBusinessID");

		const validate = validateForm("form_official_business");
		const validateTime = checkTimeRange(false, true);

		if (validate && validateTime) {
			const feedback = $(this).attr("officialBusinessCode") ?
				$(this).attr("officialBusinessCode") :
				generateCode(
					"OBF",
					false,
					"hris_official_business_tbl",
					"officialBusinessCode",
				);

			const action = id && feedback ? "update" : "insert";

			const data = getData(action, 1, "submit", feedback, id);

			let notificationData = {
				moduleID: 58,
				notificationTitle: "Official Business Form",
				notificationDescription: `${sessionID} asked for your approval.`,
				notificationType: 2,
				employeeID: getNotificationEmployeeID(data["tableData[approversID]"], data["tableData[approversDate]"]),
			};

			formConfirmation(
				"submit",
				action,
				"OFFICIAL BUSINESS",
				"",
				"form_official_business",
				data,
				true,
				pageContent,
				notificationData
			);
		}
	});
	// ----- END SUBMIT DOCUMENT -----

	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancelForm", function () {
		const id = $(this).attr("officialBusinessID");
		const feedback = $(this).attr("officialBusinessCode");

		// const validate = validateForm("form_change_schedule");
		// const validateTime = checkTimeRange(false, true);

		// if (validate && validateTime) {

		const action = "update";
		const data = getData(action, 4, "cancelform", feedback, id);

		formConfirmation(
			"cancelform",
			action,
			"OFFICIAL BUSINESS",
			"",
			"form_official_business",
			data,
			true,
			pageContent
		);
		// const action = "update";

		// const data = getData(action, 4, "cancelform", feedback, id);

		// formConfirmation(
		// 	"cancelform",
		// 	action,
		// 	"OFFICIAL BUSINESS",
		// 	"",
		// 	"form_official_business",
		// 	data,
		// 	true,
		// 	pageContent
		// );
		// }
	});
	// ----- END CANCEL DOCUMENT -----

	// ----- CANCEL DOCUMENT -----
	$(document).on("click", "#btnCancel", function () {
		const id = $(this).attr("officialBusinessID");
		const feedback = $(this).attr("officialBusinessCode") ?
			$(this).attr("officialBusinessCode") :
			generateCode(
				"OBF",
				false,
				" hris_official_business_tbl",
				"officialBusinessCode",
			);

		const action = id && feedback ? "update" : "insert";

		const data = getData(action, 0, "save", feedback, id);

		cancelForm(
			"save",
			action,
			"OFFICIAL BUSINESS",
			"",
			"form_official_business",
			data,
			true,
			pageContent
		);
	});
	// ----- END CANCEL DOCUMENT -----
	// ----- APPROVE DOCUMENT -----
	$(document).on("click", "#btnApprove", function () {
		const id = $(this).attr("officialBusinessID");
		const feedback = $(this).attr("officialBusinessCode");
		let tableData = getTableData(" hris_official_business_tbl", "", "officialBusinessID = " + id);
		if (tableData) {
			let approversID = tableData[0].approversID;
			let approversStatus = tableData[0].approversStatus;
			let approversDate = tableData[0].approversDate;
			let employeeID = tableData[0].employeeID;

			let data = getData("update", 2, "approve", feedback, id);
			data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			data["tableData[approversDate]"] = updateApproveDate(approversDate);
			let status, notificationData;
			if (isImLastApprover(approversID, approversDate)) {
				status = 2;
				notificationData = {
					moduleID: 58,
					notificationTitle: "Official Business",
					notificationDescription: `${tableData[0].officialBusinessCode}: Your request has been approved.`,
					notificationType: 2,
					employeeID: employeeID,
				};
			} else {
				status = 1;
				notificationData = {
					moduleID: 58,
					notificationTitle: "Official Business",
					notificationDescription: `${employeeID} asked for your approval.`,
					notificationType: 2,
					employeeID: getNotificationEmployeeID(approversID, approversDate),
				};
			}
			data["tableData[officialBusinessStatus]"] = status;

			// let data = getData("update", 2, "approve", feedback, id);
			// data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 2);
			// data["tableData[approversDate]"] = updateApproveDate(approversDate);

			// let status = isImLastApprover(approversID, approversDate) ? 2 : 1;
			// data["tableData[officialBusinessStatus]"] = status;

			formConfirmation(
				"approve",
				"update",
				"OFFICIAL BUSINESS",
				"",
				"form_official_business",
				data,
				true,
				pageContent,
				notificationData
			);
		}
	})
	// ----- END APPROVE DOCUMENT -----

	// ----- REJECT DOCUMENT -----
	$(document).on("click", "#btnReject", function () {
		const id = $(this).attr("officialBusinessID");
		const feedback = $(this).attr("officialBusinessCode");

		$("#modal_change_schedule_content").html(preloader);
		$("#modal_change_schedule .page-title").text("DENY OFFICIAL BUSINESS DOCUMENT");
		$("#modal_change_schedule").modal("show");
		let html = `
		<div class="modal-body">
			<div class="form-group">
				<label>Remarks <code>*</code></label>
				<textarea class="form-control validate"
					data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?]"
					minlength="2"
					maxlength="250"
					id="officialBusinessRemarks"
					name="officialBusinessRemarks"
					rows="4"
					style="resize: none"
					required></textarea>
				<div class="d-block invalid-feedback" id="invalid-officialBusinessRemarks"></div>
			</div>
		</div>
		<div class="modal-footer text-right">
			<button class="btn btn-danger" id="btnRejectConfirmation"
			officialBusinessID="${id}"
			officialBusinessCode="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
			<button class="btn btn-cancel" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
		</div>`;
		$("#modal_change_schedule_content").html(html);
	})

	$(document).on("click", "#btnRejectConfirmation", function () {
		const id = $(this).attr("officialBusinessID");
		const feedback = $(this).attr("officialBusinessCode");

		const validate = validateForm("modal_change_schedule");
		if (validate) {
			let tableData = getTableData("hris_official_business_tbl", "", "officialBusinessID = " + id);
			if (tableData) {
				let approversID = tableData[0].approversID;
				let approversStatus = tableData[0].approversStatus;
				let approversDate = tableData[0].approversDate;
				let employeeID = tableData[0].employeeID;

				let notificationData = {
					moduleID: 58,
					notificationTitle: "Oficial Business Form",
					notificationDescription: `${tableData[0].officialBusinessCode}: Your request has been denied.`,
					notificationType: 2,
					employeeID: employeeID,
				};

				let data = getData("update", 3, "reject", feedback, id);
				data["tableData[officialBusinessRemarks]"] = $("[name=officialBusinessRemarks]").val().trim();
				data["tableData[approversStatus]"] = updateApproveStatus(approversStatus, 3);
				data["tableData[approversDate]"] = updateApproveDate(approversDate);

				formConfirmation(
					"reject",
					"update",
					"OFFICIAL BUSINESS",
					"modal_change_schedule",
					"",
					data,
					true,
					pageContent,
					notificationData
				);
			}
		}
	})
	$(document).on("click", ".nav-link", function () {
		const tab = $(this).attr("href");
		if (tab == "#forApprovalTab") {
			forApprovalContent();
		}
		if (tab == "#myFormsTab") {
			myFormsContent();
		}
	});
	// ----- END REJECT DOCUMENT -----


	// $(document).on("change", ".officialBusinessDate" ,function(){
	// 	let thisValue       =   $(this).val();
	// 	let thisValueSplit  =   thisValue.split(" - ");
	
	// 	// from = start.format('YYYY-MM-DD 00:00:00');
	// 	//               to = end.format('YYYY-MM-DD 23:59:59');
	
	// 	let fromDate        =  new Date(thisValueSplit[0]); 	
	// 	let toDate          =  new Date(thisValueSplit[1]);
	// 	let numberOfDays    =  Math.round((toDate-fromDate)/(1000*60*60*24));
	// 	$("#loanFormNoOfDays").val(numberOfDays);
	// 	// alert(thisValue);
	// })

});
function viewNotification() {
	let url = window.document.URL;
	url = url.split("?view_id=");
	if (url.length > 1) {
		let id = url[1];
		$(`.btnView[id=${id}]`).trigger("click");
	}
}
