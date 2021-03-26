$(document).ready(function () {
	// ----- GET PHILIPPINE ADDRESSES -----
	const getPhAddresses = () => {
		let result = [];
		$.ajax({
			method: "GET",
			url: `${base_url}assets/json/ph-address.json`,
			async: false,
			dataType: "json",
			success: function (data) {
				result = data;
			},
		});
		return result;
	};
	const address = getPhAddresses();

	const phRegion = [
		{
			key: "01",
			name: "REGION I",
		},
		{
			key: "02",
			name: "REGION II",
		},
		{
			key: "03",
			name: "REGION III",
		},
		{
			key: "4A",
			name: "REGION IV-A",
		},
		{
			key: "4B",
			name: "REGION IV-B",
		},
		{
			key: "05",
			name: "REGION V",
		},
		{
			key: "06",
			name: "REGION VI",
		},
		{
			key: "07",
			name: "REGION VII",
		},
		{
			key: "08",
			name: "REGION VIII",
		},
		{
			key: "09",
			name: "REGION IX",
		},
		{
			key: "10",
			name: "REGION X",
		},
		{
			key: "11",
			name: "REGION XI",
		},
		{
			key: "12",
			name: "REGION XII",
		},
		{
			key: "13",
			name: "REGION XIII",
		},
		{
			key: "BARMM",
			name: "BARMM",
		},
		{
			key: "CAR",
			name: "CAR",
		},
		{
			key: "NCR",
			name: "NCR",
		},
	];

	const getRegionName = (regionKey = "01") => {
		let region = phRegion.filter((item) => {
			if (item.key == regionKey) {
				return item;
			}
		});
		return region.length > 0 ? region[0].name : "";
	};

	function getRegionOptions(regionKey = false) {
		let html = "";
		phRegion.map((item) => {
			html += `<option value="${item.key}" ${
				regionKey == item.key && "selected"
			}>${item.name}</option>`;
		});
		return html;
	}

	function getProvinceOptions(
		provinceKey = false,
		region = "01",
		doEmpty = false
	) {
		let html = `<option value="" selected>Select Province</option>`;
		if (!doEmpty) {
			const provinceList = region && Object.keys(address[region].province_list);
			provinceList &&
				provinceList.map((item) => {
					html += `<option value="${item}" ${
						provinceKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}

	function getMunicipalityOptions(
		municipalityKey = false,
		region = "01",
		province = "ILOCOS NORTE",
		doEmpty = false
	) {
		let html = `<option value="" selected>Select City/Municipality</option>`;
		if (!doEmpty) {
			const municipalityList =
				region &&
				province &&
				Object.keys(address[region].province_list[province].municipality_list);
			municipalityList &&
				municipalityList.map((item) => {
					html += `<option value="${item}" ${
						municipalityKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}

	function getBarangayOptions(
		barangayKey = false,
		region = "01",
		province = "ILOCOS NORTE",
		city = "ADAMS",
		doEmpty = false
	) {
		let html = `<option value="" selected>Select Barangay</option>`;
		if (!doEmpty) {
			const barangayList =
				region &&
				region &&
				province &&
				address[region].province_list[province].municipality_list[city]
					.barangay_list;
			barangayList &&
				barangayList.map((item) => {
					html += `<option value="${item}" ${
						barangayKey == item && "selected"
					}>${item}</option>`;
				});
		}
		return html;
	}

	$(document).on("change", "[name=inventoryStorageRegion]", function () {
		const region = $(this).val();

		if (region) {
			const provinceOptions = getProvinceOptions(false, region);
			$("[name=inventoryStorageProvince]").html(provinceOptions);
		} else {
			const provinceOptions = getProvinceOptions(false, "", true);
			$("[name=inventoryStorageProvince]").html(provinceOptions);
		}

		const municipality = getMunicipalityOptions(false, "", "", true);
		$("[name=inventoryStorageMunicipality]").html(municipality);

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=inventoryStorageBarangay]").html(barangay);
	});

	$(document).on("change", "[name=inventoryStorageProvince]", function () {
		const region = $("[name=inventoryStorageRegion]").val();
		const province = $(this).val();

		if (province) {
			const municipalityOptions = getMunicipalityOptions(
				false,
				region,
				province
			);
			$("[name=inventoryStorageMunicipality]").html(municipalityOptions);
		} else {
			const municipalityOptions = getMunicipalityOptions(false, "", "", true);
			$("[name=inventoryStorageMunicipality]").html(municipalityOptions);
		}

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=inventoryStorageBarangay]").html(barangay);
	});

	$(document).on("change", "[name=inventoryStorageMunicipality]", function () {
		const region = $("[name=inventoryStorageRegion]").val();
		const province = $("[name=inventoryStorageProvince]").val();
		const city = $(this).val();

		if (city) {
			const barangay = getBarangayOptions(false, region, province, city);
			$("[name=inventoryStorageBarangay]").html(barangay);
		} else {
			const barangay = getBarangayOptions(false, "", "", "", true);
			$("[name=inventoryStorageBarangay]").html(barangay);
		}
	});
	// ----- END GET PHILIPPINE ADDRESSES -----

	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableUserAccount")) {
			$("#tableUserAccount").DataTable().destroy();
		}

		var table = $("#tableUserAccount")
			.css({
				"min-width": "100%",
			})
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{
						targets: 0,
						width: 100,
					},
					{
						targets: 1,
						width: 120,
					},
					{
						targets: 2,
						width: 100,
					},
					{
						targets: 3,
						width: 100,
					},
					{
						targets: 4,
						width: 100,
					},
					{
						targets: 5,
						width: 50,
					},
					{
						targets: 6,
						width: 50,
					},
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
			data: {
				tableName: "ims_inventory_storage_tbl",
			},
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                    <table class="table table-bordered table-striped table-hover nowrap" id="tableUserAccount" >
                        <thead>
                            <tr class="text-center">
                                <th>Storage Code</th>
                                <th>Office Name</th>
                                <th>Storage Address</th>
                                <th>Room Type</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >`;
				data.map((item, index, array) => {
					if (item.inventoryStorageStatus == "1") {
						var activestatus = `<span class="badge badge-outline-success w-100">Active</span>`;
					} else {
						var activestatus = `<span class="badge badge-outline-danger w-100">Inactive</span>`;
					}
					// ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
					let unique = {
						id: item.inventoryStorageID, // Required
						multiple: {
							inventoryStorageOfficeName: item.inventoryStorageOfficeName, // Required
							inventoryStorageUnitNumber: item.inventoryStorageUnitNumber,
						},
					};
					uniqueData.push(unique);

					html += `
                        <tr>
                           <td>${item.inventoryStorageCode}</td>
                           <td>${item.inventoryStorageOfficeName}</td>
						   <td>

                        ${item.inventoryStorageUnitNumber && titleCase(item.inventoryStorageUnitNumber)+", "} 
                        ${item.inventoryStorageHouseNumber && item.inventoryStorageHouseNumber +", "} 
                        ${item.inventoryStorageStreetName && titleCase(item.inventoryStorageStreetName)+", "}
                        ${item.inventoryStorageSubdivisionName && titleCase(item.inventoryStorageSubdivisionName)+", "} 
                        ${item.inventoryStorageBarangay && titleCase(item.inventoryStorageBarangay)+", "} 
                        ${item.inventoryStorageMunicipality && titleCase(item.inventoryStorageMunicipality)+", "} 
                        ${item.inventoryStorageProvince && titleCase(item.inventoryStorageProvince)+", "}
						${item.inventoryStorageCountry && titleCase(item.inventoryStorageCountry)+", "}
						${item.inventoryStorageZipCode && titleCase(item.inventoryStorageZipCode)}
						

                           </td>
                           <td>${item.inventoryStorageRoomType}</td>
                           <td>${item.inventoryStorageDepartment}</td>
                           <td>${activestatus}</td>
                           <td>
                           <button 
                                class="btn btn-edit btnEdit w-100" 
                                id="${item.inventoryStorageID}"
                                feedback="${item.inventoryStorageOfficeName}">
                                Edit
                            </button>
                            </td>
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

	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let {
			inventoryStorageID = "",
			inventoryStorageOfficeName = "",
			inventoryStorageUnitNumber = "",
			inventoryStorageHouseNumber = "",
			inventoryStorageStreetName = "",
			inventoryStorageSubdivisionName = "",
			inventoryStorageBarangay = false,
			inventoryStorageMunicipality = false,
			inventoryStorageProvince = false,
			inventoryStorageRegion = false,
			inventoryStorageCountry = "",
			inventoryStorageZipCode = "",
			inventoryStorageRoomType = "",
			inventoryStorageDepartment = "",
			inventoryStorageStatus = "",
		} = data && data[0];

		let button = inventoryStorageID
			? `
            <button 
                class="btn btn-update px-5 p-2" 
                id="btnUpdate" 
                rowID="${inventoryStorageID}">
                <i class="fas fa-save"></i>
                Update
            </button>`
			: `
            <button 
                class="btn btn-save px-5 p-2" 
                id="btnSave">
                <i class="fas fa-save"></i>
                Save
            </button>`;

		let html = `
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-lg-12">
                            <div class="form-group">
                                <label for="">Office Name <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageOfficeName" 
                                    id="input_officename"
                                    minlength="2" 
                                    minlength="50"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                     value="${inventoryStorageOfficeName}"unique="${inventoryStorageID}" 
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_officenamee"></div>
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Region <span class="text-danger">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryStorageRegion" id="input_region" required>
                            <option value="" selected>Select Region</option>
                            ${getRegionOptions(inventoryStorageRegion)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_region"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>State/Province <span class="text-danger">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryStorageProvince"
                            id="input_province" required>
                                ${
																	data &&
																	getProvinceOptions(
																		inventoryStorageProvince,
																		inventoryStorageRegion
																	)
																}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_province"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>City/Municipality <span class="text-danger">*</span></label>
                            <select class=" form-control show-tick select2" id="input_municipality" name="inventoryStorageMunicipality" required>
                                ${
																	data &&
																	getMunicipalityOptions(
																		inventoryStorageMunicipality,
																		inventoryStorageRegion,
																		inventoryStorageProvince
																	)
																}
                            </select> 
                            <div class="invalid-feedback d-block" id="invalid-input_municipality"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Barangay <span class="text-danger">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryStorageBarangay" id="input_barangay" required>
                                ${
																	data &&
																	getBarangayOptions(
																		inventoryStorageBarangay,
																		inventoryStorageRegion,
																		inventoryStorageProvince,
																		inventoryStorageMunicipality
																	)
																}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_barangay"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Unit Number </label>
                            <input class="form-control validate"
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/]"  minlength="2" maxlength="50"  id="input_unitnumber" value="${inventoryStorageUnitNumber}" unique="${inventoryStorageID}"   name="inventoryStorageUnitNumber" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_unitnumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Building/House Number <span class="text-danger">*</span></label>
                            <input class="form-control validate"
                            required
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  minlength="2" maxlength="75" id="input_housenumber" name="inventoryStorageHouseNumber" value="${inventoryStorageHouseNumber}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_house_Number"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Street Name <span class="text-danger">*</span></label>
                            <input class="form-control validate"
                            required
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  minlength="2" maxlength="75" id="input_streetname" name="inventoryStorageStreetName" value="${inventoryStorageStreetName}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_street_Name"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Subdivision Name <span class="text-danger">*</span></label>
                            <input class="form-control validate"
                            required
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  minlength="2" maxlength="75" id="input_subdivisionname" name="inventoryStorageSubdivisionName" value="${inventoryStorageSubdivisionName}" type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_subdivision_Name"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Country <span class="text-danger">*</span></label>
                            <input class="form-control validate"
                            required
                                data-allowcharacters="[a-z][A-Z][ ]" id="input_country" name="inventoryStorageCountry" minlength="2"
                                maxlength="75" value="${inventoryStorageCountry}" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-input_country"></div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Zip Code <span class="text-danger">*</span></label>
                            <input class="form-control validate"
                            required
                                data-allowcharacters="[0-9]" id="input_zipcode" name="inventoryStorageZipCode" minlength="4"
                                maxlength="4" value="${inventoryStorageZipCode}" type="text">
                        </div>
                        <div class="invalid-feedback d-block" id="invalid-input_zipcode"></div>
                    </div>

                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Room Type </label>
                                <input 
                                    type="text" 
                                    class="form-control validate" 
                                    name="inventoryStorageRoomType" 
                                    id="input_roomType"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                    value="${inventoryStorageRoomType}">  
                               
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="form-group">
                                <label for="">Department </label>
                                <input 
                                    type="text" 
                                    class="form-control validate" 
                                    name="inventoryStorageDepartment" 
                                    id="input_department"
                                    minlength="2" 
                                    minlength="75"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
                                     value="${inventoryStorageDepartment}"> 
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                         <label for="">Status <span class="text-danger">*</span></label>
                        <select
                            class="form-control select2 validate" 
                                    name="inventoryStorageStatus" 
                                    id="input_storage_status" 
                                    >
                            
                                <option 
                                    value="1" 
                                    ${
										data &&
										inventoryStorageStatus == "1" &&
										"selected"
									}>Active</option>
                                <option 
                                    value="0" 
                                    ${
										data &&
										inventoryStorageStatus == "0" &&
										"selected"
									}>Inactive</option>
                                </select>
                                <div class="invalid-feedback d-block" id="invalid-input_storage_status"></div>
                             </div>
                           </div>   
                    </div>
                    </div>
                <div class="modal-footer">
                    ${button}
                    <button class="btn btn-cancel btnCancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
                </div>`;
		return html;
	}

	$(document).on("click", "#btnAdd", function () {
		$("#inventory_storage_modalheader").text("ADD INVENTORY STORAGE");
		$("#modal_inventory_storage").modal("show");
		$("#modal_inventory_storage_content").html(preloader);
		const content = modalContent();
		$("#modal_inventory_storage_content").html(content);
		initAll();
	});

	// ----- SAVE ADD -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_inventory_storage");
		if (validate) {
			let data = getFormData("modal_inventory_storage", true);
			data["tableData[inventoryStorageCode]"] = generateCode(
				"ISM",
				false,
				"ims_inventory_storage_tbl",
				"inventoryStorageCode"
			);
			data["tableData[createdBy]"] = sessionID;
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "ims_inventory_storage_tbl";
			data["feedback"] = $("[name=inventoryStorageOfficeName]").val();

			sweetAlertConfirmation(
				"add",
				"Inventory Storage",
				"modal_inventory_storage",
				null,
				data,
				true,
				tableContent
			);

			// $("#modal_inventory_storage").modal("hide");
			// $("#confirmation-modal_add_inventory_storage").modal("show");
		}
	});
	// ----- END SAVE ADD -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		const id = $(this).attr("id");
		const feedback = $(this).attr("feedback");
		$("#modal_inventory_storage").modal("show");
		$("#inventory_storage_modalheader").text("EDIT INVENTORY STORAGE");
		// Display preloader while waiting for the completion of getting the data
		$("#modal_inventory_storage_content").html(preloader);

		const tableData = getTableData(
			"ims_inventory_storage_tbl",
			"*",
			"inventoryStorageID=" + id,
			""
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_inventory_storage_content").html(content);
				$("#btnSaveConfirmationEdit").attr("storageid", id);
				$("#btnSaveConfirmationEdit").attr("feedback", feedback);
				initAll();
			}, 500);
		}
	});
	$(document).on("click", "#btnUpdate", function () {
		const validate = validateForm("modal_inventory_storage");

		const id = $(this).attr("rowID");

		if (validate) {
			let data = getFormData("modal_inventory_storage", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "ims_inventory_storage_tbl";
			data["whereFilter"] = "inventoryStorageID=" + id;
			data["feedback"] = $("[name=inventoryStorageOfficeName]").val();

			sweetAlertConfirmation(
				"update",
				"Inventory Storage",
				"modal_inventory_storage",
				"",
				data,
				true,
				tableContent
			);

			// $("#modal_inventory_storage").modal("hide");
			// $("#confirmation-modal_edit_inventory_storage").modal("show");
		}
	});

	// ------- CANCEl MODAL--------
	$(document).on("click", ".btnCancel", function () {
		let formEmpty = isFormEmpty("modal_inventory_storage");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Inventory Storage",
				"modal_inventory_storage"
			);
		} else {
            preventRefresh(false);
			$("#modal_inventory_storage").modal("hide");
		}
	});

	// -------- END CANCEL MODAL-----------
});
