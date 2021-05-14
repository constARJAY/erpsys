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
		{ key: "01",    name: "REGION I" },
		{ key: "02",    name: "REGION II" },
		{ key: "03",    name: "REGION III" },
		{ key: "4A",    name: "REGION IV-A" },
		{ key: "4B",    name: "REGION IV-B" },
		{ key: "05",    name: "REGION V" },
		{ key: "06",    name: "REGION VI" },
		{ key: "07",    name: "REGION VII" },
		{ key: "08",    name: "REGION VIII" },
		{ key: "09",    name: "REGION IX" },
		{ key: "10",    name: "REGION X" },
		{ key: "11",    name: "REGION XI" },
		{ key: "12",    name: "REGION XII" },
		{ key: "13",    name: "REGION XIII" },
		{ key: "BARMM", name: "BARMM" },
		{ key: "CAR",   name: "CAR" },
		{ key: "NCR",   name: "NCR" },
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
		let html =
			!provinceKey && `<option value="" selected>Select Province</option>`;
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
		let html =
			!municipalityKey &&
			`<option value="" selected>Select City/Municipality</option>`;
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
		let html =
			!barangayKey && `<option value="" selected>Select Barangay</option>`;
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

	const inventoryPriceList = getTableData(`ims_inventory_price_list_tbl`, `inventoryVendorID`, `preferred = 1`)?.map(vendor => vendor.inventoryVendorID);

	$(document).on("change", "[name=inventoryVendorRegion]", function () {
		const region = $(this).val();

		if (region) {
			const provinceOptions = getProvinceOptions(false, region);
			$("[name=inventoryVendorProvince]").html(provinceOptions);
		} else {
			const provinceOptions = getProvinceOptions(false, "", true);
			$("[name=inventoryVendorProvince]").html(provinceOptions);
		}

		const municipality = getMunicipalityOptions(false, "", "", true);
		$("[name=inventoryVendorCity]").html(municipality);

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=inventoryVendorBarangay]").html(barangay);
	});

	$(document).on("change", "[name=inventoryVendorProvince]", function () {
		const region = $("[name=inventoryVendorRegion]").val();
		const province = $(this).val();

		if (province) {
			const municipalityOptions = getMunicipalityOptions(
				false,
				region,
				province
			);
			$("[name=inventoryVendorCity]").html(municipalityOptions);
		} else {
			const municipalityOptions = getMunicipalityOptions(false, "", "", true);
			$("[name=inventoryVendorCity]").html(municipalityOptions);
		}

		const barangay = getBarangayOptions(false, "", "", "", true);
		$("[name=inventoryVendorBarangay]").html(barangay);
	});

	$(document).on("change", "[name=inventoryVendorCity]", function () {
		const region = $("[name=inventoryVendorRegion]").val();
		const province = $("[name=inventoryVendorProvince]").val();
		const city = $(this).val();

		if (city) {
			const barangay = getBarangayOptions(false, region, province, city);
			$("[name=inventoryVendorBarangay]").html(barangay);
		} else {
			const barangay = getBarangayOptions(false, "", "", "", true);
			$("[name=inventoryVendorBarangay]").html(barangay);
		}
	});
	// ----- END GET PHILIPPINE ADDRESSES -----

	
	// ----- SELECT STATUS -----
	$(document).on("change", `[name="inventoryVendorStatus"]`, function() {
		const status            = $(this).val();
		const inventoryVendorID = $(this).attr("inventoryVendorID");
		if (status == 0) {
			if (inventoryPriceList.includes(inventoryVendorID)) {
				showNotification("danger", "Cannot deactivate inventory vendor. Item price list is currently in use.")
				$(this).val(1).trigger("change");
			} 
		}
	})
	// ----- END SELECT STATUS -----
	

	// ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableInventoryVendor")) {
			$("#tableInventoryVendor").DataTable().destroy();
		}

		var table = $("#tableInventoryVendor")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 50  },
					{ targets: 1, width: 150 },
					{ targets: 2, width: 300 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 100 },
					{ targets: 5, width: 110 },
					{ targets: 6, width: 100 },
					{ targets: 7, width: 100 },
					{ targets: 8, width: 100 },
					{ targets: 9, width: 150 },
					{ targets: 10, width: 80 },
				],
			});
	}
	initDataTables();
	// ----- END DATATABLES -----

	// ----- TABLE CONTENT -----
	function tableContent() {
		preventRefresh(false);

		// Reset the unique datas
		uniqueData = [];

		$.ajax({
			url: `${base_url}operations/getTableData`,
			method: "POST",
			async: false,
			dataType: "json",
			data: { tableName: "ims_inventory_vendor_tbl" },
			beforeSend: function () {
				$("#table_content").html(preloader);
			},
			success: function (data) {
				let html = `
                <table class="table table-bordered table-striped table-hover" id="tableInventoryVendor">
                    <thead>
                        <tr style="white-space:nowrap">
                            <th>Vendor Code</th>
                            <th>Vendor Name</th>
                            <th>Vendor Address</th>
                            <th>Contact Person</th>
                            <th>Email Address</th>
                            <th>TIN</th>
                            <th>Mobile No.</th>
                            <th>Telephone No.</th>
                            <th>VAT</th>
                            <th>Brand Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

				data.map((item, index, array) => {

					let {
						inventoryVendorID,
						inventoryVendorName,
						inventoryVendorStatus,
						inventoryVendorCode,
						inventoryVendorUnit,
						inventoryVendorBuilding,
						inventoryVendorStreet,
						inventoryVendorSubdivision,
						inventoryVendorBarangay,
						inventoryVendorCity,
						inventoryVendorProvince,
						inventoryVendorCountry,
						inventoryVendorZipCode,
						inventoryVendorPerson,
						inventoryVendorEmail,
						inventoryVendorTIN,
						inventoryVendorMobile,
						inventoryVendorTelephone,
						inventoryVendorVAT,
						inventoryVendorBrand
					} = item;

					// ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
					let unique = {
						id: inventoryVendorID, // Required
						inventoryVendorName: inventoryVendorName,
					};
					uniqueData.push(unique);
					// ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

					let status =
						inventoryVendorStatus == 1
							? `
                    <span class="badge badge-outline-success w-100">Active</span>`
							: `
                    <span class="badge badge-outline-danger w-100">Inactive</span>`;

					html += `
                    <tr class="btnEdit" id="${inventoryVendorID}">
                        <td>${inventoryVendorCode}</td>
                        <td>${inventoryVendorName}</td>
                        <td>
                            ${inventoryVendorUnit && inventoryVendorUnit + ", "} 
                            ${inventoryVendorBuilding && titleCase(inventoryVendorBuilding) + ", "} 
                            ${inventoryVendorStreet && titleCase(inventoryVendorStreet) + ", "}
                            ${inventoryVendorSubdivision && titleCase(inventoryVendorSubdivision) + ", "} 
                            ${inventoryVendorBarangay && titleCase(inventoryVendorBarangay) + ", "} 
                            ${inventoryVendorCity && titleCase(inventoryVendorCity) + ", "} 
                            ${inventoryVendorProvince && titleCase(inventoryVendorProvince) + ", "}
                            ${inventoryVendorCountry && titleCase(inventoryVendorCountry) + ", "} 
                            ${inventoryVendorZipCode && titleCase(inventoryVendorZipCode)}
                        </td>
                        <td>${inventoryVendorPerson || "-"}</td>
                        <td>${inventoryVendorEmail || "-"}</td>
                        <td>${inventoryVendorTIN || "-"}</td>
                        <td>${inventoryVendorMobile || "-"}</td>
                        <td>${inventoryVendorTelephone || "-"}</td>
                        <td>
							${inventoryVendorVAT == 1 ? "Vatable" : "Non Vatable"}
						</td>
                        <td>${inventoryVendorBrand || "-"}</td>
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


	// ----- GET BANK MASTERFILE -----
	function getBank(id = null, display = true) {
		let tableData = getTableData("fms_bank_tbl", "bankID, bankName, bankNumber", "bankStatus = 1");
		let html = tableData.map(bank => {
			return `<option value="${bank.bankID}" ${bank.bankID == id && "selected"} format="${bank.bankNumber}">${bank.bankName}</option>`;
		})
		return display ? html : tableData;
	}
	// ----- GET BANK MASTERFILE -----


	// ----- GET BANK NUMBER FORMAT -----
	function applyBankFormat(format = null) {
		if (format) {
			let numbers   = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
			let formatArr = format.split("");
			let newFormat = formatArr.map(char => {
				return numbers.includes(String(char)) ? "9" : char;
			})
			return newFormat.join("");
		}
		return "";
	}
	// ----- END GET BANK NUMBER FORMAT -----


	// ----- SELECT BANK -----
	$(document).on("change", "[name=bankID]", function() {
		$("[name=inventoryVendorBankAccNo]").val("");
		const format = $('option:selected', this).attr("format");
		const newFormat = applyBankFormat(format);
		$("[name=inventoryVendorBankAccNo]").attr("mask", newFormat);
		$("[name=inventoryVendorBankAccNo]").attr("minlength", newFormat.length);
		$("[name=inventoryVendorBankAccNo]").attr("maxlength", newFormat.length);
		$(`[name="inventoryVendorBankAccName"], [name="inventoryVendorBankAccNo"]`).removeAttr("disabled");
		initInputmask("inventoryVendorBankAccNo");
	})
	// ----- END SELECT BANK -----


	// ----- GET ENTERPRISE -----
	function getEnterprise(enterpriseStr = "", display = true) {
		let enterpriseArr = [
			"Sole Proprietorship",
			"Business Corporation",
			"General Partnership",
			"Limited Partnership",
			"Joint Venture",
			"Non-profit Legal Person",
			"Association",
			"Cooperative",
			"Group of Person" ];
		let html = enterpriseArr.map(enterprise => {
			return `<option value="${enterprise}" ${enterpriseStr == enterprise && "selected"}>${enterprise}</option>`;
		})
		return display ? html : enterpriseArr;
	}
	// ----- END GET ENTERPRISE -----


	// ---- GET INDUSTRY -----
	function getIndustry(industryStr = "", display = true) {
		let industryArr = [
			"Printing Services",
			"Electronics",
			"Aircon repair & maintenace",
			"Alcohol",
			"Car Dealer",
			"Furnitures",
			"Indoor Slippers",
			"Hardware, Electrical Supplies, Construction, Plumbing, Paints",
			"Hikvision Camera",
			"Fire Extinguisher",
			"Computer Electronics",
			"Electrical",
			"Handbook, manuals",
			"ZKTeco",
			"Office supplies",
			"Office supplies & Equipments",
			"Dept. Store",
			"ID lace",
			"Appliances, Hardware and Construction supplies, Industrial, Lightning",
			"Printing and Clothing",
			"Car Insurance",
			"Cabinets",
			"Clothing",
			"PPE's",
			"Power tools"
		];
		let html = industryArr.map(industry => {
			return `<option value="${industry}" ${industryStr == industry && "selected"}>${industry}</option>`;
		})
		return display ? html : industryArr;
	}
	// ---- END GET INDUSTRY -----


	// ----- CUSTOM INPUTMASK -----
	function initInputmaskTime(isMethodAdd = true) {
		if (isMethodAdd) {
			$(".openingHours").val("08:00");
			$(".closingHours").val("17:00");
		}

		$(".openingHours").inputmask({
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
		$(".closingHours").inputmask({
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
	// ----- END CUSTOM INPUTMASK ------


	// ----- MODAL CONTENT -----
	function modalContent(data = false) {
		let {
			inventoryVendorID           = "",
			inventoryVendorName         = "",
			inventoryVendorRegion       = false,
			inventoryVendorProvince     = false,
			inventoryVendorCity         = false,
			inventoryVendorBarangay     = false,
			inventoryVendorUnit         = "",
			inventoryVendorBuilding     = "",
			inventoryVendorStreet       = "",
			inventoryVendorSubdivision  = "",
			inventoryVendorCountry      = "",
			inventoryVendorZipCode      = "",
			inventoryVendorPerson       = "",
			inventoryVendorEmail        = "",
			inventoryVendorTIN          = "",
			inventoryVendorMobile       = "",
			inventoryVendorTelephone    = "",
			inventoryVendorBrand        = "",
			inventoryVendorVAT          = "1",
			inventoryVendorStatus       = "1",

			inventoryVendorFaxNumber    = "",
			inventoryVendorEnterprise   = "",
			inventoryVendorIndustry     = "",
			bankID                      = "",
			inventoryVendorBankAccName  = "",
			inventoryVendorBankAccNo    = "",
			inventoryVendorOpeningHours = "",
			inventoryVendorClosingHours = "",
		} = data && data[0];

		let button = data
			? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdate" 
            vendorID="${inventoryVendorID}"><i class="fas fa-save"></i>
            Update
        </button>`
			: `
        <button class="btn btn-save px-5 p-2" id="btnSave"><i class="fas fa-save"></i> Save</button>`;

		let html = `
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Supplier Name <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="inventoryVendorName" 
                                id="supplierName" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]" 
                                minlength="2" 
                                maxlength="75" 
                                required 
                                value="${inventoryVendorName}"
                                unique="${inventoryVendorID}"
                                title="Supplier Name"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-supplierName"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Region <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryVendorRegion" id="input_inventoryVendorRegion" style="width: 100%" required>
								<option value="" selected>Select Region</option>
								${getRegionOptions(inventoryVendorRegion)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-input_inventoryVendorRegion"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Province <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryVendorProvince" id="inventoryVendorProvince" style="width: 100%" required>
                                <option value="" selected>Select Province</option>
                                ${getProvinceOptions(inventoryVendorProvince, inventoryVendorRegion)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorProvince"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>City/Municipality <code>*</code></label>
                            <select class=" form-control show-tick select2" id="inventoryVendorCity" name="inventoryVendorCity" style="width: 100%" required>
                                <option value="" selected>Select City/Municipality</option>
                                ${getMunicipalityOptions(inventoryVendorCity, inventoryVendorRegion, inventoryVendorProvince)}
                            </select> 
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorCity"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form-group">
                            <label>Barangay <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryVendorBarangay" id="inventoryVendorBarangay" style="width: 100%" required>
                                <option value="" selected>Select Barangay</option>
                                ${getBarangayOptions(inventoryVendorBarangay, inventoryVendorRegion, inventoryVendorProvince, inventoryVendorCity)}
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorBarangay"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Unit Number </label>
                            <input class="form-control validate"
								data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/]"  
								minlength="2"
								maxlength="50"  
								id="unitNumber" 
								value="${inventoryVendorUnit}"
								name="inventoryVendorUnit" 
								autocomplete="off"
								type="text">
                            <div class="invalid-feedback d-block" id="invalid-unitNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Building/House Number <code>*</code></label>
                            <input class="form-control validate"
                            	data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
								minlength="2" 
								maxlength="75" 
								id="input_houseNumber" 
								name="inventoryVendorBuilding" 
								value="${inventoryVendorBuilding}" 
								type="text"
								autocomplete="off"
								required>
                            <div class="invalid-feedback d-block" id="invalid-input_houseNumber"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Street Name <code>*</code></label>
                            <input class="form-control validate"
                            	data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
								minlength="2" 
								maxlength="75" 
								id="input_street" 
								name="inventoryVendorStreet" 
								value="${inventoryVendorStreet}" 
								type="text"
								autocomplete="off"
								required>
                            <div class="invalid-feedback d-block" id="invalid-input_street"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Subdivision Name </label>
                            <input class="form-control validate"
								data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"  
								minlength="2" 
								maxlength="75" 
								id="input_subdivision" 
								name="inventoryVendorSubdivision" 
								value="${inventoryVendorSubdivision}" 
								autocomplete="off"
								type="text">
                            <div class="invalid-feedback d-block" id="invalid-input_subdivision"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                        <div class="form-group">
                            <label>Country <code>*</code></label>
                            <input class="form-control validate"
                                data-allowcharacters="[a-z][A-Z][ ]" 
								id="inventoryVendorCountry" 
								name="inventoryVendorCountry" 
								minlength="2"
                                maxlength="75" 
								value="${inventoryVendorCountry}" 
								type="text"
								autocomplete="off"
								required>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorCountry"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-2 col-xl-2">
                        <div class="form-group">
                            <label>Zip Code </label>
                            <input class="form-control validate"
                                data-allowcharacters="[0-9]" id="inventoryVendorZipCode" name="inventoryVendorZipCode" minlength="4" autocomplete="off"
                                maxlength="4" value="${inventoryVendorZipCode}" type="text">
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorZipCode"></div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Contact Person <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="inventoryVendorPerson" 
                                id="inventoryVendorPerson" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"
                                minlength="2" 
                                maxlength="75" 
                                value="${inventoryVendorPerson}"
                                autocomplete="off"
								required>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorPerson"></div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Email Address </label>
                            <input 
                                type="email" 
                                class="form-control validate" 
                                name="inventoryVendorEmail" 
                                id="inventoryVendorEmail" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][_][@]"
                                minlength="2" 
                                maxlength="50" 
                                value="${inventoryVendorEmail}"
								placeholder="sample@email.com"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorEmail"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Tax Identification Number </label>
                            <input 
                                type="text" 
                                class="form-control inputmask" 
                                name="inventoryVendorTIN" 
                                id="inventoryVendorTIN" 
                                data-allowcharacters="[0-9]" 
                                minlength="15" 
                                maxlength="15" 
                                value="${inventoryVendorTIN}"
                                mask="999-999-999-999"
                                autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorTIN"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Mobile No. <code>*</code></label>
                                <input 
                                type="text" 
                                class="form-control inputmask" 
                                name="inventoryVendorMobile" 
                                id="inventoryVendorMobile" 
                                data-allowcharacters="[0-9]" 
                                mask="0\\999-9999-999" 
                                minlength="13" 
                                maxlength="13"
                                value="${inventoryVendorMobile}"
								autocomplete="off"
								required>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorMobile"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Telephone No. </label>
                                <input type="text" 
                                class="form-control inputmask" 
                                name="inventoryVendorTelephone" 
                                id="inventoryVendorTelephone" 
                                data-allowcharacters="[0-9]" 
                                mask="(99)-9999-9999" 
                                minlength="14" 
                                maxlength="14"  
                                value="${inventoryVendorTelephone}"
								autocomplete="off">
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorTelephone"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Brand Name <code>*</code></label>
                            <input 
                                type="text" 
                                class="form-control validate" 
                                name="inventoryVendorBrand" 
                                id="inventoryVendorBrand" 
                                data-allowcharacters="[A-Z][a-z][0-9][.][,][-][()]['][/][ ]"
                                minlength="2" 
                                maxlength="50" 
                                value="${inventoryVendorBrand}"
                                autocomplete="off"
                                required>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorBrand"></div>
                        </div>
                    </div>

					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Fax Number <code>*</code></label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryVendorFaxNumber" 
								id="inventoryVendorFaxNumber" 
								data-allowcharacters="[0-9]"
								minlength="11" 
								maxlength="11" 
								value="${inventoryVendorFaxNumber}"
								autocomplete="off"
								mask="99-999-9999"
								required>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorFaxNumber"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Industry <code>*</code></label>
							<select
								class="form-control validate select2" 
								name="inventoryVendorIndustry" 
								id="inventoryVendorIndustry"
								style="width: 100%"
								required>
								<option disabled selected>Select Enterprise</option>
								${getIndustry(inventoryVendorIndustry)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorIndustry"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Enterprise <code>*</code></label>
							<select
								class="form-control validate select2" 
								name="inventoryVendorEnterprise" 
								id="inventoryVendorEnterprise"
								style="width: 100%"
								required>
								<option disabled selected>Select Enterprise</option>
								${getEnterprise(inventoryVendorEnterprise)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorEnterprise"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-3 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Opening Hours</label>
							<input type="text" 
								class="form-control openingHours" 
								id="inventoryVendorOpeningHours" 
								name="inventoryVendorOpeningHours" 
								value="${inventoryVendorOpeningHours}"
								autocomplete="off">
							<div class="d-block invalid-feedback" id="invalid-inventoryVendorOpeningHours"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-3 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Closing Hours</label>
							<input type="text" 
								class="form-control closingHours" 
								id="inventoryVendorClosingHours" 
								name="inventoryVendorClosingHours" 
								value="${inventoryVendorClosingHours}"
								autocomplete="off">
							<div class="d-block invalid-feedback" id="invalid-inventoryVendorClosingHours"></div>
						</div>
					</div>


					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Bank</label>
							<select
								class="form-control validate select2" 
								name="bankID" 
								style="width: 100%"
								id="bankID">
								<option disabled selected>Select Bank</option>
								${getBank(bankID)}
							</select>
							<div class="invalid-feedback d-block" id="invalid-bankID"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Bank Account Name</label>
							<input 
								type="text" 
								class="form-control validate" 
								name="inventoryVendorBankAccName" 
								id="inventoryVendorBankAccName" 
								data-allowcharacters="[A-Z][a-z][ ][.][-]['][0-9]"
								minlength="2" 
								maxlength="50" 
								value="${inventoryVendorBankAccName}"
								autocomplete="off"
								disabled>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorBankAccName"></div>
						</div>
					</div>
					<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
						<div class="form-group">
							<label>Bank Account No.</label>
							<input 
								type="text" 
								class="form-control inputmask" 
								name="inventoryVendorBankAccNo" 
								id="inventoryVendorBankAccNo" 
								data-allowcharacters="[0-9]"
								minlength="2" 
								maxlength="50" 
								value="${inventoryVendorBankAccNo}"
								autocomplete="off"
								disabled>
							<div class="invalid-feedback d-block" id="invalid-inventoryVendorBankAccNo"></div>
						</div>
					</div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>File</label>
                            <input type="file"
								name="file|vendor"
								class="form-control validate"
								id="inventoryVendorFile">
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorFile"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>VAT <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" name="inventoryVendorVAT" id="inventoryVendorVAT" autocomplete="off" style="width: 100%">
                                <option value="1" ${inventoryVendorVAT == 1 && "selected"}>Vatable</option>   
                                <option value="0" ${inventoryVendorVAT == 0 && "selected"}>Non-Vatable</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorVAT"></div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Status <code>*</code></label>
                            <select class=" form-control show-tick select2 validate" 
								name="inventoryVendorStatus" 
								id="inventoryVendorStatus" 
								autocomplete="off" 
								title="Select Status"
								style="width: 100%"
								inventoryVendorID="${inventoryVendorID}">
                                <option value="1" ${inventoryVendorStatus == 1 && "selected"}>Active</option>   
                                <option value="0" ${inventoryVendorStatus == 0 && "selected"}>Inactive</option>
                            </select>
                            <div class="invalid-feedback d-block" id="invalid-inventoryVendorStatus"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                ${button}
                <button class="btn btn-cancel btnCancel px-5 p-2"><i class="fas fa-ban"></i> Cancel</button>
            </div>`;
		return html;
	}
	// ----- END MODAL CONTENT -----

	
	// ----- OPEN ADD MODAL -----
	$(document).on("click", "#btnAdd", function () {
		preventRefresh(true);

		$("#modal_inventory_vendor .page-title").text("ADD INVENTORY VENDOR");
		$("#modal_inventory_vendor").modal("show");
		$("#modal_inventory_vendor_content").html(preloader);
		const content = modalContent();
		$("#modal_inventory_vendor_content").html(content);
		initAll();
		initInputmaskTime();
	});
	// ----- END OPEN ADD MODAL -----

	// ----- SAVE MODAL -----
	$(document).on("click", "#btnSave", function () {
		const validate = validateForm("modal_inventory_vendor");
		if (validate) {
			let data = getFormData("modal_inventory_vendor", true);
			data["tableData[inventoryVendorCode]"] = generateCode(
				"VEN",
				false,
				"ims_inventory_vendor_tbl",
				"inventoryVendorCode"
			);
			data["tableData[createdBy]"] = sessionID;
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "ims_inventory_vendor_tbl";
			data["feedback"] = $("[name=inventoryVendorName]").val();

			sweetAlertConfirmation(
				"add",
				"Vendor",
				"modal_inventory_vendor",
				null,
				data,
				true,
				tableContent
			);
		}
	});
	// ----- END SAVE MODAL -----

	// ----- OPEN EDIT MODAL -----
	$(document).on("click", ".btnEdit", function () {
		preventRefresh(true);

		const id = $(this).attr("id");
		$("#modal_inventory_vendor .page-title").text("EDIT INVENTORY VENDOR");
		$("#modal_inventory_vendor").modal("show");

		// Display preloader while waiting for the completion of getting the data
		$("#modal_inventory_vendor_content").html(preloader);

		const tableData = getTableData(
			"ims_inventory_vendor_tbl",
			"*",
			"inventoryVendorID=" + id,
			""
		);
		if (tableData) {
			const content = modalContent(tableData);
			setTimeout(() => {
				$("#modal_inventory_vendor_content").html(content);
				initAll();
				initInputmaskTime(false);
			}, 500);
		}
	});
	// ----- END OPEN EDIT MODAL -----

	// ----- UPDATE MODAL -----
	$(document).on("click", "#btnUpdate", function () {
		const id = $(this).attr("vendorID");

		const validate = validateForm("modal_inventory_vendor");
		if (validate) {
			let data = getFormData("modal_inventory_vendor", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableName"] = "ims_inventory_vendor_tbl";
			data["whereFilter"] = "inventoryVendorID=" + id;
			data["feedback"] = $("[name=inventoryVendorName]").val();

			sweetAlertConfirmation(
				"update",
				"Vendor",
				"modal_inventory_vendor",
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
		let formEmpty = isFormEmpty("modal_inventory_vendor");
		if (!formEmpty) {
			sweetAlertConfirmation("cancel", "Vendor", "modal_inventory_vendor");
		} else {
			preventRefresh(false);
			$("#modal_inventory_vendor").modal("hide");
		}
	});
	// -------- END CANCEL MODAL-----------
});
