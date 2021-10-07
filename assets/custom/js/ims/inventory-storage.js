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
						width: "10%",
					},
					{
						targets: 1,
						width: "25%",
					},
					{
						targets: 2,
						width: "25%",
					},
					{
						targets: 3,
						width: "15%",
					},
					{
						targets: 4,
						width: "10%",
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
				columnName: `*, CASE 
								WHEN inventoryStorageRoom IS  NULL THEN 'R0'
							ELSE CONCAT('R',inventoryStorageRoom) END inventoryStorageRoomFormat,
							CASE 
								WHEN inventoryStorageFloor IS  NULL THEN 'F0'
							ELSE CONCAT('F',inventoryStorageFloor) END inventoryStorageFloorFormat,
							CASE 
								WHEN inventoryStorageBay IS  NULL THEN 'B0'
							ELSE CONCAT('B',inventoryStorageBay) END inventoryStorageBayFormat,
							CASE 
								WHEN inventoryStorageLevel IS  NULL THEN 'L0'
							ELSE CONCAT('L',inventoryStorageLevel) END inventoryStorageLevelFormat,
							CASE 
								WHEN inventoryStorageShelves IS  NULL THEN 'S0'
							ELSE CONCAT('S',inventoryStorageShelves) END inventoryStorageShelvesFormat`,
			},
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableUserAccount">
                        <thead>
                            <tr style="white-space:nowrap">
                                <th>Storage Code</th>
                                <th>Storage Name</th>
                                <th>Storage Address</th>
                                <th>Room</th>
                                <th>Status</th>
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
						
						multiple: {
							id: item.inventoryStorageID, // Required
							inventoryStorageOfficeName: item.inventoryStorageOfficeName // Required
							
						},
					};
					uniqueData.push(unique);
					//var storageDepartmentName = getTableData("hris_department_tbl","departmentName", "departmentID="+item.inventoryStorageDepartment)
					html += `
						<tr
						class="btnEdit" 
						id="${item.inventoryStorageID}"
						feedback="${item.inventoryStorageOfficeName}">
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
                           <td>${item.inventoryStorageRoomFormat}-${item.inventoryStorageFloorFormat}-${item.inventoryStorageBayFormat}-${item.inventoryStorageLevelFormat}-${item.inventoryStorageShelvesFormat}</td>
                           <td class="text-center">${activestatus}</td>
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
			inventoryStorageID 				= "",
			inventoryStorageOfficeName 		= "",
			inventoryStorageUnitNumber 		= "",
			inventoryStorageHouseNumber 	= "",
			inventoryStorageStreetName 		= "",
			inventoryStorageSubdivisionName = "",
			inventoryStorageBarangay 		= false,
			inventoryStorageMunicipality 	= false,
			inventoryStorageProvince 		= false,
			inventoryStorageRegion 			= false,
			inventoryStorageCountry 		= "",
			inventoryStorageZipCode 		= "",
			inventoryStorageNumber			= "",
			inventoryStorageFloor			="",
			inventoryStorageBay				="",
			inventoryStorageLevel 			="",
			inventoryStorageShelves			="",
			inventoryStorageRoom 			= "",
			inventoryStorageStatus 			= "",
			Floor							=	"",
			Bay								= "",
			Level							= "",
			Shelves							= "",
			Room							= "",
			Number							= "",
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
                                <label for="">Storage Name <span class="text-danger">*</span></label>
                                <input 
                                    type="text" 
                                    class="form-control validate " 
                                    name="inventoryStorageOfficeName" 
                                    id="input_officename"
                                    minlength="2" 
                                    minlength="50"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][-][(][)]['][/][ ]"
									 unique="${inventoryStorageID}" 
                                     value="${inventoryStorageOfficeName}"
                                    required>  
                                 <div class="invalid-feedback d-block" id="invalid-input_officename"></div>
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Region <span class="text-danger">*</span></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryStorageRegion" id="input_region" required>
                            <option value="" disabled selected>Select Region</option>
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
							<option value="" disabled selected>Select Province</option>
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
							<option value="" disabled selected>Select City/Municipality</option>
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
							<option value="" disabled selected>Select Barangay</option>
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
                            data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/]"  minlength="2" maxlength="50"  id="input_unitnumber" value="${inventoryStorageUnitNumber}" name="inventoryStorageUnitNumber" type="text">
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
					<div class="col-md-4 col-lg-4">
						<div class="form-group">
							<label for="">Storage Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageNumber" 
								id="input_number"
								minlength="1" 
								maxlength="4"
								data-allowcharacters="[0-9]"
								value="${Number}">  
							<div class="invalid-feedback d-block" id="invalid-input_number"></div>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="form-group">
							<label for="">Room Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageRoom" 
								id="input_room"
								minlength="1" 
								maxlength="4"
								data-allowcharacters="[0-9]"
								value="${inventoryStorageRoom}">  
							<div class="invalid-feedback d-block" id="invalid-input_room"></div>
						</div>
                    </div>
					<div class="col-md-4 col-lg-4">
						<div class="form-group">
							<label for="">Floor Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageFloor" 
								id="input_floor"
								minlength="1" 
								maxlength="4"
								data-allowcharacters="[0-9]"
								value="${Floor}">  
							<div class="invalid-feedback d-block" id="invalid-input_floor"></div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="form-group">
							<label for="">Bay Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageBay" 
								id="input_bay"
								minlength="1" 
								maxlength="4"
								data-allowcharacters="[0-9]"
								value="${Bay}">  
							<div class="invalid-feedback d-block" id="invalid-input_bay"></div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="form-group">
							<label for="">Level Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageLevel" 
								id="input_level"
								minlength="1" 
								maxlength="4"
								data-allowcharacters="[0-9]"
								value="${Level}">  
							<div class="invalid-feedback d-block" id="invalid-input_level"></div>
						</div>
					</div>
					<div class="col-md-6 col-lg-6">
						<div class="form-group">
							<label for="">Shelf Number</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryStorageShelves" 
								id="inventoryStorageShelves"
								minlength="1" 
								maxlength="7"
								data-allowcharacters="[0-9]"
								value="${Shelves}">  
							<div class="invalid-feedback d-block" id="invalid-input_shelves"></div>
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
	$(document).on("keyup", "#inventoryStorageShelves", function (event) {
		// skip for arrow keys
		if(event.which >= 37 && event.which <= 40){
			event.preventDefault();
		}
		var $this = $(this);
		var num = $this.val().replace(/,/gi, "").split("").reverse().join("");
		var num2 = RemoveRougeChar(num.replace(/(.{3})/g,"$1,").split("").reverse().join(""));
		console.log(num2);
		// the following line has been simplified. Revision history contains original.
		$this.val(num2);
	});

  
  function RemoveRougeChar(convertString){
	  if(convertString.substring(0,1) == ","){
		  return convertString.substring(1, convertString.length)              
	  }
	  return convertString;
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

		var tempUniqueData = [];
		uniqueData.filter(items => items["multiple"].id != id).map(items=>{
			tempUniqueData.push(items);
		});
		uniqueData = tempUniqueData;
		$("#inventory_storage_modalheader").text("EDIT INVENTORY STORAGE");
		// Display preloader while waiting for the completion of getting the data
		$("#modal_inventory_storage_content").html(preloader);

		const tableData = getTableData(
			"ims_inventory_storage_tbl",
			`*,IFNULL(inventoryStorageNumber,'') AS Number,IFNULL(inventoryStorageRoom,'') AS Room, IFNULL(inventoryStorageFloor,'') AS Floor, IFNULL(inventoryStorageBay,'') AS Bay, IFNULL(inventoryStorageLevel,'')AS Level, IFNULL(inventoryStorageShelves,'') AS Shelves`,
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



// function departmentOptions(departmentID = 0) {
// 	let getDepartment = getTableData("hris_department_tbl", "*", "departmentStatus = 1");
//         let departmentOptions = `<option ${departmentID == 0 && "selected"} disabled>Select Department</option>`;
// 		departmentOptions += `<option value="">N/A</option>`;
        
// 		getDepartment.map(item => {
//             departmentOptions += `<option value="${item.departmentID}" ${item.departmentID == departmentID && "selected"}>${item.departmentName}</option>`;
//         })
	
// 	return departmentOptions;
// }