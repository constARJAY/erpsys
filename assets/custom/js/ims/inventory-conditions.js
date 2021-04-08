$(document).ready(function () {
	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableInventoryConditions")) {
			$("#tableInventoryConditions").DataTable().destroy();
		}

		var table = $("#tableInventoryConditions")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 80 },
					{ targets: 1, width: "30%" },
					{ targets: 2, width: "70%" },
					{ targets: 3, width: 80 },
				],
			});
	}
	initDataTables();
	// ----- END DATATABLES -----

	// ----- TABLE CONTENT -----
	function tableContent() {
		// Reset the unique datas
		uniqueData = [];

		$.ajax({
			url: `${base_url}operations/getTableData`,
			method: "POST",
			async: false,
			dataType: "json",
			data: { tableName: "ims_inventory_condition_tbl" },
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="tableInventoryConditions">
                    <thead>
                        <tr style="white-space:nowrap">
                            <th>Condition Code</th>
                            <th>Condition Name</th>
                            <th>Condition Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

				data.map((item, index, array) => {
					// ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
					let unique = {
						id: item.conditionID, // Required
						conditionName: item.conditionName,
					};
					uniqueData.push(unique);
					// ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

					let status =
						item.conditionStatus == 1
							? `
                    <span class="badge badge-outline-success w-100">Active</span>`
							: `
                    <span class="badge badge-outline-danger w-100">Inactive</span>`;

					html += `
                    <tr class="btnEdit" id="${item.conditionID}">
                        <td>${item.conditionCode}</td>
                        <td>${item.conditionName}</td>
                        <td>${item.conditionDescription}</td>
                        <td>${status}</td>
                    </tr>`;
				});
				html += `</tbody>
                </table>`;

				setTimeout(() => {
					$("#table_content").html(html);
					initDataTables();
				}, 500);
			},
			error: function () {
				let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
				$("#table_content").html(html);
			},
		});
	}
	tableContent();
	// ----- END TABLE CONTENT -----

	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let conditionID = data
			? data[0].conditionID
				? data[0].conditionID
				: ""
			: "";
		let conditionName = data
			? data[0].conditionName
				? data[0].conditionName
				: ""
			: "";
		let conditionDescription = data
			? data[0].conditionDescription
				? data[0].conditionDescription
				: ""
			: "";
		let conditionStatus = data
			? data[0].conditionStatus
				? data[0].conditionStatus
				: ""
			: "";

		let button = conditionID
			? `
        <button 
            class="btn btn-update" 
            id="btnUpdate" 
            conditionid="${conditionID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
            <div class="modal-body">
                <div class="row">
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Condition Name <code>*</code></label>
							<input 
								type="text" 
								class="form-control validate" 
								name="conditionName" 
								id="input_conditionName" 
								data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]" 
								minlength="2" 
								maxlength="75" 
								required 
								value="${conditionName}"
								unique="${conditionID}"
								title="Condition name"
								autocomplete="off">
							<div class="invalid-feedback d-block" id="invalid-input_conditionName"></div>
						</div>
					</div>
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Condition Description <code>*</code></label>
							<textarea 
								class="form-control validate" 
								name="conditionDescription" 
								id="input_conditionDescription" 
								data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"
								minlength="2" 
								maxlength="250" 
								rows="4"
								required 
								autocomplete="off"
								style="resize: none;">${conditionDescription}</textarea>
							<div class="invalid-feedback d-block" id="invalid-input_conditionDescription"></div>
						</div>
					</div>
					<div class="col-md-12 col-sm-12">
						<div class="form-group">
							<label>Status <code>*</code></label>
							<select class=" form-control show-tick select2 validate" name="conditionStatus" id="conditionStatus" autocomplete="off">
								<option value="1" ${data ? conditionStatus == 1 && "selected" : "selected"}>Active</option>   
								<option value="0" ${data && conditionStatus == 0 && "selected"}>Inactive</option>
							</select>
							<div class="invalid-feedback d-block" id="invalid-input_conditionStatus"></div>
						</div>
					</div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;
		return html;
	}
	// ----- END MODAL CONTENT -----

	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		$("#modal_inventory_condition .page-title").text("ADD INVENTORY CONDITION");
		$("#modal_inventory_condition").modal("show");
		$("#modal_inventory_condition_content").html(preloader);
		const content = modalContent();
		$("#modal_inventory_condition_content").html(content);
		initAll();
	});
	// ----- END OPEN ADD MODAL -----

	// ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_inventory_condition");
		if (validate) {
			let data = getFormData("modal_inventory_condition", true);
			data["tableData[conditionCode]"] = generateCode(
				"ICO",
				false,
				"ims_inventory_condition_tbl",
				"conditionCode"
			);
			data["tableName"] = "ims_inventory_condition_tbl";
			data["feedback"] = $("#input_conditionName").val();

			sweetAlertConfirmation(
				"add",
				"Condition",
				"modal_inventory_condition",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END SAVE MODAL -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		$("#modal_inventory_condition .page-title").text("EDIT INVENTORY CONDITION");
		$("#modal_inventory_condition").modal("show");

		// Display preloader while waiting for the completion of getting the data
		$("#modal_inventory_condition_content").html(preloader);

		const tableData = getTableData(
			"ims_inventory_condition_tbl",
			"*",
			"conditionID=" + id
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_inventory_condition_content").html(content);
				initAll();
			}, 500);
		}
	});
	// ----- END OPEN EDIT MODAL -----

	// ----- UPDATE MODAL -----
	$(document).on("click", "#btnUpdate", function () {
		const id = $(this).attr("conditionid");

		const validate = validateForm("modal_inventory_condition");
		if (validate) {
			let data = getFormData("modal_inventory_condition", true);
			data["tableName"] = "ims_inventory_condition_tbl";
			data["whereFilter"] = "conditionID=" + id;
			data["feedback"] = $("#input_conditionName").val();

			sweetAlertConfirmation(
				"update",
				"Condition",
				"modal_inventory_condition",
				"",
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END UPDATE MODAL -----

	// ------- CANCEL MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_inventory_condition");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Condition",
				"modal_inventory_condition"
			);
		} else {
			$("#modal_inventory_condition").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------
});
