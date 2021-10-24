// ----- GLOBAL VARIABLES -----
let uniqueData = []; // Store unique data here
const base_url             = $(".page-loader-wrapper").attr("base_url");
const sessionID            = $(".page-loader-wrapper").attr("session");
const sessionRoleID        = $(".page-loader-wrapper").attr("role");
const sessionDesignationID = $(".page-loader-wrapper").attr("designation");
const differentInputArr    = ["input", "select", "textarea"];
const differentInputStr    = differentInputArr.join(", ");
// ----- END GLOBAL VARIABLES -----


// ----- PRELOADER -----
const preloader = `
    <div class="loader w-100 p-5 text-center">
        <div class="mt-3">
            <i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
            <br>
            <p class="text-primary">Please wait...</p>
        </div>
    </div>`;
// ----- END PRELOADER -----


// ----- CLOSE MODALS -----
const closeModals = () => {
	$(".modal").modal("hide");
};
// ----- END CLOSE MODALS -----


// ---- GET DOM ELEMENT -----
const getElement = (element = null, defaultElement = null) => {
	let elem = element
		? element.indexOf(".") != "-1"
			? element
			: element.indexOf("#") != "-1"
			? element
			: "#" + element
		: defaultElement;
	return elem;
};
// ---- END GET DOM ELEMENT -----


// ----- REINITIALIZE ALL FUNCTION -----
const initAll = () => {
	initSelect2();
	initDateRangePicker();
	initInputmask();
	initAmount();
	initAmountFuel();
	initQuantity();
	initHours();
	initPoints();
	initPercentage();
};
// ----- END REINITIALIZE ALL FUNCTION -----


// ----- INITIALIZE SELECT2 -----
const initSelect2 = (element = null) => {
	let elem = getElement(element, ".select2");
	$(elem).select2({ theme: "bootstrap" });
};
initSelect2();
// ----- END INITIALIZE SELECT2 -----


// ----- INITIALIZE SINGLE DATERANGEPICKER -----
const initDateRangePicker = (element = null, otherOption = false) => {
	let elem = getElement(element, ".daterange");
	let options = otherOption
		? otherOption
		: {
				autoUpdateInput: false,
				singleDatePicker: true,
				showDropdowns: true,
				autoApply: true,
				locale: {
					format: "MMMM DD, YYYY",
				},
				// maxDate: moment(new Date).format("MMMM DD, YYYY"),
		  };
	$(elem).daterangepicker(options, function (data) {
		if (data) {
			const validated = $(elem).hasClass("validated");
			let invalidFeedback =
				$(elem).parent().find(".invalid-feedback").length > 0
					? $(elem).parent().find(".invalid-feedback")
					: $(elem).parent().parent().find(".invalid-feedback").length > 0
					? $(elem).parent().parent().find(".invalid-feedback")
					: $(elem).parent().parent().parent().find(".invalid-feedback");
			validated
				? $(elem).removeClass("is-invalid").addClass("is-valid")
				: $(elem).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
			$(elem).val(moment(data).format("MMMM DD, YYYY"));
		}
	});
};
initDateRangePicker();
// ----- END INITIALIZE SINGLE DATERANGEPICKER -----


// ----- INITIALIZE INPUTMASK -----
const initInputmask = (element = null) => {
	let elem = getElement(element, ".inputmask");
	$(elem).each(function () {
		let mask        = $(this).attr("mask");
		let placeholder = mask?.replaceAll("9", "0")?.replaceAll("\\", "");
		if (mask) {
			let id = $(this).attr("id");
			$("#" + id).inputmask({
				mask,
				placeholder,
				undoOnEscape: false,
				clearMaskOnLostFocus: false,
			});
		}
	});
};
initInputmask();
// ----- END INITIALIZE INPUTMASK -----


// ----- INITIALIZE AMOUNT FORMAT -----
const initAmount = (element = null, displayPrefix = false) => {
	let elem = getElement(element, ".amount");
	$(elem).inputmask({
		alias: "currency",
		prefix: displayPrefix ? "₱ " : "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initAmount();


const initAmountFuel = (element = null, displayPrefix = false) => {
	let elem = getElement(element, ".input-fuel");
	$(elem).inputmask({
		alias: "currency",
		prefix: displayPrefix ? "₱ " : "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initAmountFuel();
// ----- END INITIALIZE AMOUNT FORMAT -----

const initPercentage = (element = null, displayPrefix = false) => {
	let elem = getElement(element, ".input-percentage");
	$(elem).inputmask({
		alias: "currency",
		prefix: displayPrefix ? " " : "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initPercentage();
// ----- END INITIALIZE AMOUNT FORMAT -----


// ----- INITIALIZE QUANTITY FORMAT -----
const initQuantity = (element = null) => {
	let elem = getElement(element, ".input-quantity");
	$(elem).inputmask({
		alias: "currency",
		prefix: "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initQuantity();
// ----- END INITIALIZE QUANTITY FORMAT -----


// ----- INITIALIZE POINTS -----
const initPoints = (element = null) => {
	let elem = getElement(element, ".input-points");
	$(elem).inputmask({
		alias: "currency",
		prefix: "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initPoints();
// ----- END INITIALIZE POINTS -----


// ----- INITIALIZE HOURSE FORMAT -----
const initHours = (element = null) => {
	let elem = getElement(element, ".input-hours");
	$(elem).inputmask({
		alias: "currency",
		prefix: "",
		allowMinus: false,
		allowPlus:  false,
	});
};
initHours();
// ----- END INITIALIZE HOURSE FORMAT -----


// ----- RESET FORM -----
const resetForm = (formID = null) => {
	if (formID) {
		$("#" + formID)
			.find(differentInputStr)
			.each(function () {
				const elementID = "#" + $(this).attr("id");
				let invalidFeedback =
					$(elementID).parent().find(".invalid-feedback").length > 0
						? $(elementID).parent().find(".invalid-feedback")
						: $(elementID).parent().parent().find(".invalid-feedback").length >
						  0
						? $(elementID).parent().parent().find(".invalid-feedback")
						: $(elementID).parent().parent().parent().find(".invalid-feedback");

				$(elementID)
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("has-error")
					.removeClass("no-error")
					.removeClass("validated");
				$(elementID)
					.parent()
					.children()
					.next()
					.next()
					.children()
					.children()
					.removeClass("has-error")
					.removeClass("no-error");
				$(elementID)
					.parent()
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("has-error")
					.removeClass("no-error");
				$("select" + elementID).length > 0
					? $("select" + elementID)
							.val("")
							.trigger("change")
					: $(elementID).val("");
				$(elementID + "[type=checkbox]").prop("checked", false);
				invalidFeedback.text("");
			});
	}
};
// ----- END RESET FORM -----


// ----- CHECK IF THE FORM IS EMPTY -----
const isFormEmpty = (formID = false) => {
	if (formID) {
		let flag = 0;
		$("#" + formID)
			.find("input[required], select[required], textarea[required]")
			.each(function () {
				if ($(this).val() && $(this).val().length > 0) flag++;
			});
		return flag > 0 ? false : true;
	}
	return true;
};
// ----- END CHECK IF THE FORM IS EMPTY -----


// ----- CLEAR VALIDATION -----
const clearInputValidation = (elementID = null) => {
	if (elementID) {
		let elem = "#" + elementID;
		let invalidFeedback =
			$(elem).parent().find(".invalid-feedback").length > 0
				? $(elem).parent().find(".invalid-feedback")
				: $(elem).parent().parent().find(".invalid-feedback").length > 0
				? $(elem).parent().parent().find(".invalid-feedback")
				: $(elem).parent().parent().parent().find(".invalid-feedback");
		$(elem)
			.parent()
			.find(".selection")
			.children()
			.removeClass("is-invalid")
			.removeClass("is-valid")
			.removeClass("has-error")
			.removeClass("no-error");
		$(elem)
			.removeClass("is-invalid")
			.removeClass("is-valid")
			.removeClass("has-error")
			.removeClass("no-error");
		$(elem).val("").trigger("change");
		invalidFeedback.text("");
	}
};
// ----- END CLEAR VALIDATION -----


// ----- GET FORM DATA -----
const getFormData = (formID = null, object = false) => {
	let result = [],
		output = {
			tableData: {},
		};
	let formData = new FormData();
	if (formID) {
		const inputs = $("#" + formID).find(differentInputStr, (item) => item);
		for (let i = 0; i < inputs.length; i++) {
			let flag = true;
			let countFlag = 0;
			let value = inputs[i].value;
			const id = inputs[i].id;
			const name = inputs[i].name;
			if (id && name) {
				if ($("#" + id).is("select") && inputs[i].hasAttribute("multiple")) {
					let temp = $("#" + id).val();
					value = temp.join("|");
				}
				if (inputs[i].type == "radio") {
					if (inputs[i].checked) {
						value = inputs[i].value;
					} else {
						flag = false;
					}
				}
				if (inputs[i].type == "file") {
					let file = document.getElementById(id);
					let fileLength = file.files.length;
					if (fileLength > 0) {
						for (var j = 0; j < fileLength; j++) {
							let file = $("#" + id)[0].files[j];
							let fileType = file.name.split(".");
							let fileName = `${name}.${fileType[1]}`;
							formData.append(`tableData[${name}][]`, file, fileName);
						}
					}
					countFlag++;
				}
				if (inputs[i].type == "checkbox") {
					if ($(`#${id}[name=${name}]`).length > 1) {
						value = [];
						$(`#${id}:checked`).each(function () {
							value.push(this.value);
						});
					} else {
						value = inputs[i].checked ? 1 : 0;
					}
				}
				if (inputs[i].type == "button") {
					let date = moment(value);
					if (date.isValid()) {
						value = date.format("YYYY-MM-DD");
					}
				}
				if (inputs[i].className.indexOf("amount") != -1) {
					value = value.replace(",", "");
				}
				const data = { id, name, value };
				result.length > 0 &&
					result.map((item) => {
						item.name === name && item.id === id && countFlag++;
					});
				if (flag && countFlag == 0) {
					result.push(data);
					if (Array.isArray(value) && inputs[i].type != "file") {
						value = value.join("|");
					}
					output.tableData[name] = value;
					formData.append(`tableData[${name}]`, value);
				}
			}
		}
	}
	return !object ? formData : output;
};
// ----- END GET FORM DATA -----


// ----- VALIDATE INPUT LENGTH -----
const checkLength = (elementID, invalidFeedback) => {
	const validated = $(elementID).hasClass("validated");
	let minLength = $(elementID).attr("minlength");
	let maxLength = $(elementID).attr("maxlength");
	let value = $(elementID).val().trim();
	let valLength = value.length;

	if (!minLength && !maxLength) {
		// DISREGARD
	} else if (!minLength && maxLength) {
		// DISREGARD
	} else if (minLength && !maxLength) {
		if (valLength < minLength) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(
				"Please enter at least " + minLength + " characters."
			);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (minLength && maxLength) {
		if (valLength < minLength) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(
				"Please enter at least " + minLength + " characters."
			);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else {
		// DISREGARD
	}
};
// ----- END VALIDATE INPUT LENGTH -----


// ----- VALIDATE NUMBER -----
const checkNumber = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let currencyValue = +value.split(",").join("");

	if (!min && !max) {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (!min && max) {
		if (currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input number less than ${max}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (min && !max) {
		if (currencyValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input number greater than ${min - 1}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (min && max) {
		if (currencyValue >= min && currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input number less than ${max}`);
		} else if (currencyValue >= min && currencyValue <= max) {
			// DISREGARD
		} else if (currencyValue < min && currencyValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input number greater than ${min - 1}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE NUMBER -----


// ----- VALIDATE CURRENCY -----
const checkAmount = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let currencyValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input amount less than ${formatAmount(max, true)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (currencyValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input amount greater than ${formatAmount(min, true)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (currencyValue >= min && currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input amount less than ${formatAmount(max, true)}`);
		} else if (currencyValue >= min && currencyValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (currencyValue < min && currencyValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input amount greater than ${formatAmount(min - 0.01, true)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE CURRENCY -----

// ----- VALIDATE FUEL CONSUMPTION -----
const checkFuel = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let currencyValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input  value less than ${formatAmount(max)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (currencyValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value greater than ${formatAmount(min)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (currencyValue >= min && currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value less than ${formatAmount(max)}`);
		} else if (currencyValue >= min && currencyValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (currencyValue < min && currencyValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value greater than ${formatAmount(min - 0.01)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE FUEL CONSUMPTION -----

// ----- VALIDATE PERCENTAGE -----
const checkPercentage = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let currencyValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input  value less than ${formatAmount(max)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (currencyValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value greater than ${formatAmount(min)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (currencyValue >= min && currencyValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value less than ${formatAmount(max)}`);
		} else if (currencyValue >= min && currencyValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (currencyValue < min && currencyValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input value greater than ${formatAmount(min - 0.01)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE PERCENTAGE -----

// ----- VALIDATE QUANTITY -----
const checkQuantity = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let quantityValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (quantityValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input quantity less than ${formatAmount(max)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (quantityValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input quantity greater than ${formatAmount(min)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (quantityValue >= min && quantityValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input quantity less than ${formatAmount(max)}`);
		} else if (quantityValue >= min && quantityValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (quantityValue < min && quantityValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input quantity greater than ${formatAmount(min - 0.01)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE QUANTITY -----


// ----- VALIDATE QUANTITY -----
const checkNumberLength = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let quantityValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (quantityValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input less than ${max}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (quantityValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input greater than ${min}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (quantityValue >= min && quantityValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input less than ${max}`);
		} else if (quantityValue >= min && quantityValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (quantityValue < min && quantityValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input greater than ${min}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE QUANTITY -----


// ----- VALIDATE HOURS -----
const checkHours = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let hourValue = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (hourValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour less than ${formatAmount(max)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (hourValue < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour greater than ${formatAmount(min)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (hourValue >= min && hourValue > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour less than ${formatAmount(max)}`);
		} else if (hourValue >= min && hourValue <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (hourValue < min && hourValue <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour greater than ${formatAmount(min - 0.01)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE HOURS -----

// ----- VALIDATE HOURS LIMIT -----
const checkHoursLimit = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? $(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? $(elementID).attr("max") : false;
	let hourValue = value.split(":");
	let hourMin = min.split(":");
	let hourMax = max.split(":");

	// compute hours value//

		let getValHour   = parseFloat(hourValue[0]) * 3600;
		let getValMinute = parseFloat(hourValue[1]) * 60;
		let totalTime = parseFloat(getValHour) + parseFloat(getValMinute) + parseFloat(hourValue[2]); 

	// end compute hours value//

	// compute hours of min hour set//

		let getMinHour   = parseFloat(hourMin[0]) * 3600;
		let getMinMinute = parseFloat(hourMin[1]) * 60;
		let totalTimeMinLimit = parseFloat(getMinHour) + parseFloat(getMinMinute) + parseFloat(hourMin[2]); 

	// end compute hours of min hour set//

	// compute hours of max hour set//

		let getMaxHour   = parseFloat(hourMax[0]) * 3600;
		let getMaxMinute = parseFloat(hourMax[1]) * 60;
		let totalTimeMaxLimit = parseFloat(getMaxHour) + parseFloat(getMaxMinute) + parseFloat(hourMax[2]); 

	// end compute hours of max hour set//

	if (typeof totalTimeMinLimit != "number" && typeof totalTimeMaxLimit != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof totalTimeMinLimit != "number" && typeof totalTimeMaxLimit == "number") {
		if (totalTime > totalTimeMaxLimit) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour less than ${max}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof totalTimeMinLimit == "number" && typeof totalTimeMaxLimit != "number") {
		if (totalTime < totalTimeMinLimit) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour greater than ${min}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof totalTimeMinLimit == "number" && typeof totalTimeMaxLimit == "number") {
		if (totalTime >= totalTimeMinLimit && totalTime > totalTimeMaxLimit) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour less than ${max}`);
		} else if (totalTime >= totalTimeMinLimit && totalTime <= totalTimeMaxLimit) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (totalTime < totalTimeMinLimit && totalTime <= totalTimeMaxLimit) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input hour greater than ${min}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE HOURS LIMIT -----


// ----- VALIDATE POINTS -----
const checkPoints = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const min = $(elementID).attr("min") ? +$(elementID).attr("min") : false;
	const max = $(elementID).attr("max") ? +$(elementID).attr("max") : false;
	let points = +value.split(",").join("");

	if (typeof min != "number" && typeof max != "number") {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	} else if (typeof min != "number" && typeof max == "number") {
		if (points > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input points less than ${formatAmount(max)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max != "number") {
		if (points < min) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input points greater than ${formatAmount(min)}`);
		} else {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		}
	} else if (typeof min == "number" && typeof max == "number") {
		if (points >= min && points > max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input points less than ${formatAmount(max)}`);
		} else if (points >= min && points <= max) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else if (points < min && points <= max) {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text(`Please input points greater than ${formatAmount(min - 0.01)}`);
		}
	} else {
		validated
			? $(elementID).removeClass("is-invalid").addClass("is-valid")
			: $(elementID).removeClass("is-invalid").removeClass("is-valid");
		invalidFeedback.text("");
	}
};
// ----- END VALIDATE POINTS -----


// ----- VALIDATE IF EXISTS -----
const checkExists = (elementID, invalidFeedback) => {
	let inputs = {};
	let keys = [],
		values = [];
	let flag = false;

	if ($(`${elementID}[unique]`).length > 0) {
		const name     = $(elementID).attr("name");
		const uniqueID = $(elementID).attr("unique");
		const title    = $(elementID).attr("title")
			? $(elementID).attr("title")
			: "Data";

		let isMultiple = 0;
		if (uniqueData.length > 0) {
			Object.keys(uniqueData[0]).map((item) => {
				if (item == "multiple") isMultiple++;
			});
		}

		let multiple = {};
		$("select[unique], input[unique], textarea[unique]").each(function () {
			let key   = $(this).attr("name");
			let value = $(this).val()?.trim();
			keys.push(key);
			values.push(value);
			if (isMultiple > 0) {
				multiple[key] = value;
			} else {
				inputs[key] = value;
			}
		});

		if (isMultiple > 0) {
			inputs["multiple"] = multiple;
			uniqueData.map((data) => {
				if (keys.length > 0) {
					if (data["multiple"].id !== uniqueID && elementID && invalidFeedback) {
						let countKeys = keys.length;
						let countTemp = 0;
						keys.map((item, index) => {
							if (data["multiple"][item] === inputs["multiple"][item]) {
								countTemp++;
							}
						});
						if (countKeys == countTemp) {
							flag = true;
							$(elementID)
								.parent()
								.find(".selection")
								.children()
								.removeClass("is-invalid")
								.removeClass("is-valid")
								.removeClass("no-error")
								.addClass("has-error");
							$(elementID).removeClass("is-valid").addClass("is-invalid");
							invalidFeedback.text(`${title} already exists!`);
						} 
					}
				}
			});
		} else {
			uniqueData.some((data) => {
				if (keys.length > 0) {
					keys.map((item, index) => {
						if (
							data.id    !== uniqueID &&
							item       === name &&
							data[item] === values[index] &&
							elementID  &&
							invalidFeedback
						) {
							flag = true;
							$(elementID)
								.parent()
								.find(".selection")
								.children()
								.removeClass("is-invalid")
								.removeClass("is-valid")
								.removeClass("no-error")
								.addClass("has-error");
							$(elementID).removeClass("is-valid").addClass("is-invalid");
							invalidFeedback.text(`${title} already exists!`);
						}
					});
				}
			});
		}
	}
	return flag;
};
// ----- END VALIDATE IF EXISTS -----


// ----- VALIDATE EMAIL -----
const checkEmail = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	const required = $(elementID).hasClass("required");
	let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if ($(elementID).attr("type") == "email") {
		if (required) {
			if (emailRegex.test(value)) {
				validated
					? $(elementID).removeClass("is-invalid").addClass("is-valid")
					: $(elementID).removeClass("is-invalid").removeClass("is-valid");
				invalidFeedback.text("");
			} else {
				$(elementID).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("Invalid email format.");
			}
		}
		if (value.length > 0) {
			if (emailRegex.test(value)) {
				validated
					? $(elementID).removeClass("is-invalid").addClass("is-valid")
					: $(elementID).removeClass("is-invalid").removeClass("is-valid");
				invalidFeedback.text("");
			} else {
				$(elementID).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("Invalid email format.");
			}
		}
	}
};
// ----- END VALIDATE EMAIL -----


// ----- VALIDATE URL -----
const checkURL = (elementID, invalidFeedback, value) => {
	const validated = $(elementID).hasClass("validated");
	let urlRegex = /(https?:\/\/[^\s]+)/g;
	if ($(elementID).attr("type") == "url") {
		if (urlRegex.test(value)) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-invalid").removeClass("is-valid");
			invalidFeedback.text("");
		} else {
			$(elementID).removeClass("is-valid").addClass("is-invalid");
			invalidFeedback.text("Please enter a valid URL.");
		}
	}
};
// ----- END VALIDATE URL -----


// ----- APPLY CHARACTER FORMAT -----
const characterCasing = (elementID) => {
	const titleCase = $(elementID).hasClass("titlecase");
	const upperCase = $(elementID).hasClass("uppercase");
	const lowerCase = $(elementID).hasClass("lowercase");
	let value = $(elementID).val();
	let newValue = value;
	if (value && value.length > 0) {
		if (titleCase) {
			value = value.split(" ");
			let temp = value.map((item, index) => {
				return item.substr(0, 1).toUpperCase() + item.substr(1).toLowerCase();
			});
			newValue = temp.join(" ");
		}
		if (upperCase) {
			newValue = value.toUpperCase();
		}
		if (lowerCase) {
			newValue = value.toLowerCase();
		}
		$(elementID).val(newValue);
	}
};
// ----- END APPLY CHARACTER FORMAT -----


// ----- VALIDATE INPUTS -----
const validateInput = (elementID) => {
	$(elementID).addClass("validated");
	let fuelConsumption = $(elementID).hasClass("input-fuel");
	let currency = $(elementID).hasClass("amount");
	let percentage = $(elementID).hasClass("input-percentage");
	let number   = $(elementID).hasClass("number");
	let quantity = $(elementID).hasClass("input-quantity");
	let numberLength = $(elementID).hasClass("input-numberLength");
	let hours    = $(elementID).hasClass("input-hours");
	let hoursLimit    = $(elementID).hasClass("input-hoursLimit");
	let required = $(elementID).attr("required");
	let disabled = $(elementID).attr("disabled");
	let value =
		$(`select${elementID}`).length > 0
			? $(elementID).val()
			: $(elementID).val().trim();
	let valLength = value ? value.length : 0;
	let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");

	let isInputSelect = $("select" + elementID).length;
	let isInputButton =
		$("button" + elementID).length > 0
			? $("button" + elementID).length
			: $("[type=button]" + elementID).length;
	if (disabled == "undefined" || disabled == undefined) {
		if (isInputSelect > 0) {
			let value = $("select" + elementID).val();
			let isSelect2 = $("select" + elementID + ".select2").length;
			if (required != undefined && required != "undefined") {
				if (isSelect2) {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						$(elementID).removeClass("is-valid").addClass("is-invalid");
						invalidFeedback.text("This field is required.");
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("has-error")
							.addClass("no-error");
						$(elementID).removeClass("is-invalid").addClass("is-valid");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				} else {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						invalidFeedback.text("This field is required.");
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("has-error")
							.addClass("no-error");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				}
			} else {
				$(elementID)
					.parent()
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("has-error")
					.addClass("no-error");
				$(elementID)
					.parent()
					.find(".selection")
					.children()
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("has-error")
					.addClass("no-error");
				$(elementID).removeClass("is-invalid").addClass("is-valid");
				invalidFeedback.text("");
				checkExists(elementID, invalidFeedback);
			}
		} else if (isInputButton > 0) {
			let value = $("[type=button]" + elementID).val()
				? $("[type=button]" + elementID).val()
				: $("button" + elementID).val();
			if (required != undefined && required != "undefined") {
				if (value != "" && value != undefined && value != null) {
					$(elementID).removeClass("is-invalid").addClass("is-valid");
					invalidFeedback.text("");
					checkExists(elementID, invalidFeedback);
				} else {
					$(elementID).removeClass("is-valid").addClass("is-invalid");
					invalidFeedback.text("This field is required.");
					checkExists(elementID, invalidFeedback);
				}
			} else {
				$(elementID).removeClass("is-invalid").addClass("is-valid");
				invalidFeedback.text("");
			}
		} else {
			if (required != undefined && required != "undefined") {
				if (valLength <= 0) {
					$(elementID).removeClass("is-valid").addClass("is-invalid");
					invalidFeedback.text("This field is required.");
				} else {
					$(elementID).removeClass("is-invalid").addClass("is-valid");
					invalidFeedback.text("");
					checkLength(elementID, invalidFeedback);
					number && checkNumber(elementID, invalidFeedback, value);
					currency && checkAmount(elementID, invalidFeedback, value);
					fuelConsumption && checkFuel(elementID, invalidFeedback, value);
					percentage && checkPercentage(elementID, invalidFeedback, value);
					quantity && checkQuantity(elementID, invalidFeedback, value);
					numberLength && checkNumberLength(elementID, invalidFeedback, value);
					hours && checkHours(elementID, invalidFeedback, value);
					hoursLimit && checkHoursLimit(elementID, invalidFeedback, value);
					checkEmail(elementID, invalidFeedback, value);
					checkURL(elementID, invalidFeedback, value);
					checkExists(elementID, invalidFeedback);
				}
			} else {
				$(elementID).removeClass("is-invalid").addClass("is-valid");
				valLength > 0 && checkLength(elementID, invalidFeedback);
				number && checkNumber(elementID, invalidFeedback, value);
				currency && checkAmount(elementID, invalidFeedback, value);
				fuelConsumption && checkFuel(elementID, invalidFeedback, value);
				percentage && checkPercentage(elementID, invalidFeedback, value);
				quantity && checkQuantity(elementID, invalidFeedback, value);
				numberLength && checkNumberLength(elementID, invalidFeedback, value);
				hours && checkHours(elementID, invalidFeedback, value);
				hoursLimit && checkHoursLimit(elementID, invalidFeedback, value);
				checkEmail(elementID, invalidFeedback, value);
				checkURL(elementID, invalidFeedback, value);
				checkExists(elementID, invalidFeedback);
			}
		}
	}
};
// ----- END VALIDATE INPUTS -----


// ----- VALIDATE FORMS -----
const validateForm = (formID = null) => {
	if (formID) {
		const inputs = $("#" + formID).find(differentInputStr, (item) => item);
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].id) {
				validateInput("#" + inputs[i].id);
			}
		}
		if ($(`#${formID}`).find(".is-invalid").length > 0) {
			$(`#${formID}`).find(".is-invalid")[0].focus();
			return false;
		}
		return true;
	}
};
// ----- END VALIDATE FORMS -----


// ----- FORMAT AMOUNT -----
const formatAmount = (amount = 0, pesoSign = false, parentheses = false) => {
	var currency = new Intl.NumberFormat("tl-PH", {
		style: "currency",
		currency: "PHP",
	}).format(amount);
	currency = currency.replace("₱", "");
	let result = !pesoSign ? currency : `₱ ${currency}`;
		result = parentheses ? `(${result})` : result;
	return result;
};
// ----- END FORMAT AMOUNT -----


// ----- TITLE CASE -----
const titleCase = (string = false) => {
	if (string) {
		let html = [];
		let arr = string.split(" ");
		arr.forEach(function(item) {
			let temp = `${item.substr(0,1).toUpperCase()}${item.substr(1,item.length).toLowerCase()}`;
			html.push(temp);
		})
		html = html.join(" ");
		return html;
	}
	return string;
}
// ----- END TITLE CASE -----


$(function () {
	/**
	 *
	 *  This will ease the production of your validation
	 *  Usage:
	 *      <input
	 *          type = "text"
	 *          class = "validate"
	 *          data-allowedcharacters = "[A-Z][a-z][0-9][/any other special characters/]"
	 *          minlength = "/any number/"
	 *          maxlength = "/any number greater than minlength/"
	 *          required #optional
	 *          unique = "/id/" #optional
	 *          mask = "/999 *** aaa/" #optional>
	 *
	 */

	// ----- PREVENT FROM ENTERING NOT ALLOWED CHARACTERS -----
	$(document).on("keypress", ".validate", function (e) {
		// ----- KEYCODE -----
		/**
		 *   - [A-Z]    = 65-90
		 *   - [a-z]    = 97-122
		 *   - [0-9]    = 48-57
		 *   - [()]     = 40-41
		 */
		// ----- END KEYCODE -----

		let keyCode = e.keyCode;
		let key     = e.key;
		let flag    = 0;

		let allowCharacters = $(this).data("allowcharacters");
		if (allowCharacters) {
			allowCharacters =
				$(this).data("allowcharacters").length > 2
					? $(this).data("allowcharacters").split("")
					: "[ ][ ]";
			allowCharacters.shift();
			allowCharacters.pop();
			allowCharacters = allowCharacters.join("");
			let arrCharacters = allowCharacters.split(/\]\[/);

			arrCharacters.map((item) => {
				item == "0-9" && keyCode >= 48 && keyCode <= 57 && flag++;
				item == "A-Z" && keyCode >= 65 && keyCode <= 90 && flag++;
				item == "a-z" && keyCode >= 97 && keyCode <= 122 && flag++;
				item == "()" && keyCode >= 40 && keyCode <= 41 && flag++;
				item == "''" && keyCode == 34 && flag++;
				item == key && flag++;
			});

			if ($(this)[0].nodeName == "TEXTAREA") {
				keyCode == "13" && flag++; // ALLOWED ENTER
			}

			return flag > 0 ? true : false;
		}
	});
	// ----- END PREVENT FROM ENTERING NOT ALLOWED CHARACTERS -----


	// ----- CHECK IF THE INPUTS IS VALID OR INVALID BASED ON THE LENGTH -----
	$(document).on("keyup", ".validate", function (e) {
		let name      = $(this).attr("name");
		let elementID = $(this).attr("id");
			elementID = `#${$(this).attr("id")}`;
		let required  = $(this).attr("required");
		let minLength = $(this).attr("minlength");
		let maxLength = $(this).attr("maxlength");
		let validated = $(this).hasClass("validated");
		let currency  = $(this).hasClass("amount");
		let quantity  = $(this).hasClass("input-quantity");
		let numberLength  = $(this).hasClass("input-numberLength");
		let hours     = $(this).hasClass("input-hours");
		let hoursLimit     = $(this).hasClass("input-hoursLimit");
		let number    = $(this).hasClass("number");
		let value     = $(this).val()?.trim();
		let valLength = value?.length;
		let invalidFeedback =
			$(elementID).parent().find(".invalid-feedback").length > 0
				? $(elementID).parent().find(".invalid-feedback")
				: $(elementID).parent().parent().find(".invalid-feedback").length > 0
				? $(elementID).parent().parent().find(".invalid-feedback")
				: $(elementID).parent().parent().parent().find(".invalid-feedback");

		if (
			value == "" ||
			value == "undefined" ||
			value == undefined ||
			value == "null" ||
			value == null
		) {
			validated
				? $(elementID).removeClass("is-invalid").addClass("is-valid")
				: $(elementID).removeClass("is-valid").removeClass("is-invalid");
			invalidFeedback.text("");
			valLength > 0 && checkLength(elementID, invalidFeedback);
			number && checkNumber(elementID, invalidFeedback, value);
			currency && checkAmount(elementID, invalidFeedback, value);
			quantity && checkQuantity(elementID, invalidFeedback, value);
			numberLength && checkNumberLength(elementID, invalidFeedback, value);
			hours && checkHours(elementID, invalidFeedback, value);
			hoursLimit && checkHoursLimit(elementID, invalidFeedback, value);
			checkEmail(elementID, invalidFeedback, value);
			checkURL(elementID, invalidFeedback, value);
			checkExists(elementID, invalidFeedback);
			if (required && valLength <= 0) {
				$(elementID).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("This field is required.");
			}
		} else {
			if (required && valLength <= 0) {
				$(elementID).removeClass("is-valid").addClass("is-invalid");
				invalidFeedback.text("This field is required.");
			} else {
				validated
					? $(elementID).removeClass("is-invalid").addClass("is-valid")
					: $(elementID).removeClass("is-valid").removeClass("is-invalid");
				invalidFeedback.text("");
				checkLength(elementID, invalidFeedback);
				number && checkNumber(elementID, invalidFeedback, value);
				currency && checkAmount(elementID, invalidFeedback, value);
				quantity && checkQuantity(elementID, invalidFeedback, value);
				numberLength && checkNumberLength(elementID, invalidFeedback, value);
				hours && checkHours(elementID, invalidFeedback, value);
				hoursLimit && checkHoursLimit(elementID, invalidFeedback, value);
				checkEmail(elementID, invalidFeedback, value);
				checkURL(elementID, invalidFeedback, value);
				checkExists(elementID, invalidFeedback);
				characterCasing(elementID);
			}
		}
	});
	// ----- END CHECK IF THE INPUTS IS VALID OR INVALID BASED ON THE LENGTH -----


	// ----- EVERY TIME THE SELECT CHANGES -----
	$(document).on("change", "select", function () {
		let value = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let validated = $(this).hasClass("validated");
		let required = $(this).attr("required");
		let isSelect2 = $("select" + elementID + ".select2").length;
		let invalidFeedback =
			$(elementID).parent().find(".invalid-feedback").length > 0
				? $(elementID).parent().find(".invalid-feedback")
				: $(elementID).parent().parent().find(".invalid-feedback").length > 0
				? $(elementID).parent().parent().find(".invalid-feedback")
				: $(elementID).parent().parent().parent().find(".invalid-feedback");

		if (validated) {
			if (required != undefined && required != "undefined") {
				if (isSelect2) {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						$(elementID).removeClass("is-valid").addClass("is-invalid");
						invalidFeedback.text("This field is required.");
						checkExists(elementID, invalidFeedback);
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("has-error")
							.addClass("no-error");
						$(elementID).removeClass("is-invalid").addClass("is-valid");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				} else {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						$(elementID).removeClass("is-valid").addClass("is-invalid");
						invalidFeedback.text("This field is required.");
						checkExists(elementID, invalidFeedback);
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("has-error")
							.addClass("no-error");
						$(elementID).removeClass("is-invalid").addClass("is-valid");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				}
			} else {
				$(elementID)
					.parent()
					.find(".selection")
					.children()
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("has-error")
					.addClass("no-error");
				$(elementID).removeClass("is-invalid").addClass("is-valid");
				invalidFeedback.text("");
			}
		} else {
			if (required != undefined && required != "undefined") {
				if (isSelect2) {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						$(elementID).removeClass("is-valid").addClass("is-invalid");
						invalidFeedback.text("This field is required.");
						checkExists(elementID, invalidFeedback);
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.removeClass("has-error");
						$(elementID).removeClass("is-invalid").addClass("is-valid");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				} else {
					if (
						value == "" ||
						value == "undefined" ||
						value == undefined ||
						value == "null" ||
						value == null
					) {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.addClass("has-error");
						$(elementID).removeClass("is-valid").addClass("is-invalid");
						invalidFeedback.text("This field is required.");
						checkExists(elementID, invalidFeedback);
					} else {
						$(elementID)
							.parent()
							.find(".selection")
							.children()
							.removeClass("is-invalid")
							.removeClass("is-valid")
							.removeClass("no-error")
							.removeClass("has-error");
						$(elementID).removeClass("is-invalid").addClass("is-valid");
						invalidFeedback.text("");
						checkExists(elementID, invalidFeedback);
					}
				}
			} else {
				$(elementID)
					.parent()
					.find(".selection")
					.children()
					.removeClass("is-invalid")
					.removeClass("is-valid")
					.removeClass("no-error")
					.removeClass("has-error");
				$(elementID).removeClass("is-invalid").addClass("is-valid");
				invalidFeedback.text("");
			}
		}
	});
	// ----- END EVERY TIME THE SELECT CHANGES -----


	// ----- CHECK AMOUNT KEYUP -----
	$(document).on("keyup", ".amount", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkAmount(elementID, invalidFeedback, value);
	})
	// ----- END CHECK AMOUNT KEYUP -----

	// ----- CHECK INPUT FUEL KEYUP -----
	$(document).on("keyup", ".input-fuel", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkFuel(elementID, invalidFeedback, value);
	})
	// ----- END CHECK INPUT FUEL KEYUP -----


	// ----- CHECK AMOUNT KEYUP -----
	$(document).on("keyup", ".input-quantity", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkQuantity(elementID, invalidFeedback, value);
	})
	// ----- END CHECK AMOUNT KEYUP -----

	// ----- CHECK AMOUNT KEYUP -----
	$(document).on("keyup", ".input-numberLength", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
			checkNumberLength(elementID, invalidFeedback, value);
	})
	// ----- END CHECK AMOUNT KEYUP -----


	// ----- CHECK INPUT HOURS KEYUP -----
	$(document).on("keyup", ".input-hours", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkHours(elementID, invalidFeedback, value);
	})
	// ----- END CHECK INPUT HOURS KEYUP -----

	// ----- CHECK INPUT HOURS LIMIT KEYUP -----
	$(document).on("keyup", ".input-hoursLimit", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkHoursLimit(elementID, invalidFeedback, value);
	})
	// ----- END CHECK INPUT HOURS LIMIT KEYUP -----


	// ----- CHECK POINTS KEYUP -----
	$(document).on("keyup", ".input-points", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkPoints(elementID, invalidFeedback, value);
	})
	// ----- END CHECK POINTS KEYUP -----


	// ----- CHECK INPUTMASK KEYUP -----
	$(document).on("keyup", ".inputmask", function() {
		let value     = $(this).val();
		let elementID = `#${$(this).attr("id")}`;
		let invalidFeedback =
		$(elementID).parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().find(".invalid-feedback")
			: $(elementID).parent().parent().find(".invalid-feedback").length > 0
			? $(elementID).parent().parent().find(".invalid-feedback")
			: $(elementID).parent().parent().parent().find(".invalid-feedback");
		checkLength(elementID, invalidFeedback);
	})
	// ----- END CHECK INPUTMASK KEYUP -----
});
