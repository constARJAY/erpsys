// ----- GLOBAL VARIABLES -----
let uniqueData          = []; // Store unique data here
const base_url          = $("#base_url").val();
const differentInputArr = ["input", "select", "textarea"];
const differentInputStr = differentInputArr.join(", ");
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
    $('.modal').modal('hide');
}
// ----- END CLOSE MODALS -----


// ---- GET DOM ELEMENT -----
const getElement = (element = null, defaultElement = null) => {
    let elem = element ? (element.indexOf(".") != '-1' ? '.'+element : (element.indexOf("#") != '-1' ? '#'+element : element)) : defaultElement;
    return elem;
}
// ---- END GET DOM ELEMENT -----


// ----- REINITIALIZE ALL FUNCTION -----
const initAll = () => {
    initSelect2();
    initDateRangePicker();
    initInputmask();
}
// ----- END REINITIALIZE ALL FUNCTION -----


// ----- INITIALIZE SELECT2 -----
const initSelect2 = (element = null) => {
    let elem = getElement(element, '.select2');
    $(elem).select2({theme: "bootstrap"});
}
initSelect2();
// ----- END INITIALIZE SELECT2 -----


// ----- INITIALIZE SINGLE DATERANGEPICKER -----
const initDateRangePicker = (element = null) => {
    let elem = getElement(element, '.daterange');
    $(elem).daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        // maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, function(data) {
        if (data) {
            const validated = $(elem).hasClass("validated");
            let invalidFeedback = 
            $(elem).parent().find(".invalid-feedback").length > 0 ? 
                $(elem).parent().find(".invalid-feedback") : 
                ($(elem).parent().parent().find(".invalid-feedback").length > 0 ?
                $(elem).parent().parent().find(".invalid-feedback") : $(elem).parent().parent().parent().find(".invalid-feedback"));
            validated ? $(elem).removeClass("is-invalid").addClass("is-valid") : $(elem).removeClass("is-invalid").removeClass("is-valid");
            invalidFeedback.text("");
            $(elem).val(moment(data).format("MMMM DD, YYYY"));
        }
    });
}
initDateRangePicker();
// ----- END INITIALIZE SINGLE DATERANGEPICKER -----


// ----- INITIALIZE INPUTMASK -----
const initInputmask = (element = null) => {

    let elem = getElement(element, '.inputmask');
    $(elem).each(function() {
        let mask = $(this).attr("mask");
        if (mask) {
            let id = $(this).attr("id");
            $("#"+id).inputmask({
                mask,
                placeholder:  "",
                undoOnEscape: false,
                clearMaskOnLostFocus: false,
            })
        }
    })
}
initInputmask();
// ----- END INITIALIZE INPUTMASK -----


// ----- GET DATABASE TABLE DATA -----
const getTableData = (tableName = null, columnName = "", searchFilter = "", orderBy = "") => {
    let path = `${base_url}operations/getTableData`;
    let data = {
        tableName, columnName, searchFilter, orderBy
    };
    let result = [];
    if (tableName) {
        $.ajax({
            method: "POST",
            url:    path,
            data,
            async: false,
            dataType: "json",
            success: function(data) {
                if (data) {
                    data.map(item => {
                        result.push(item);
                    })
                }
            },
            error: function(err) {
                showNotification("danger", "System error: Please contact the system administrator for assistance!");
            }
        });
    }
    return result;
}
// ----- END GET DATABASE TABLE DATA -----


const resetForm = (formID = null) => {
    if (formID) {
        $("#"+formID).find(differentInputStr).each(function() {
            const elementID = "#"+$(this).attr("id");
            let invalidFeedback = 
                $(elementID).parent().find(".invalid-feedback").length > 0 ? 
                    $(elementID).parent().find(".invalid-feedback") : 
                    ($(elementID).parent().parent().find(".invalid-feedback").length > 0 ?
                    $(elementID).parent().parent().find(".invalid-feedback") : $(elementID).parent().parent().parent().find(".invalid-feedback"));
            
            $(elementID).removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error").removeClass("validated");
            $("select"+elementID).length > 0 ? $("select"+elementID).val("").trigger("change") : $(elementID).val("");
            $(elementID+"[type=checkbox]").prop("checked", false);
            invalidFeedback.text("");
            $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        })
    }
}


// ----- GET MODAL DATA -----
const getModalData = (formID = null) => {
    let result = [], output = {
        tableData: {}
    };
    if (formID) {
        const inputs = $("#"+formID+" .modal-body").find(differentInputStr, item => item);
        for (let i=0; i<inputs.length; i++) {
            let flag   = true;
            let countFlag = 0;
            let value  = inputs[i].value; 
            const id   = inputs[i].id;
            const name = inputs[i].name;
            if (inputs[i].type == "radio") {
                if (inputs[i].checked) {
                    value = inputs[i].value;
                } else {
                    flag = false;
                }
            }
            if (inputs[i].type == "checkbox") {
                if ($(`#${id}[name=${name}]`).length > 1) {
                    value = [];
                    $(`#${id}:checked`).each(function() {
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
            const data = {id, name, value};
            result.length > 0 && result.map(item => {
                item.name === name && item.id === id && countFlag++;
            })
            if (flag && countFlag == 0) {
                result.push(data)
                if (Array.isArray(value)) {
                    value = value.join("|");
                }
                output.tableData[name] = value;
            }
        }
    }
    return output;
}
// ----- END GET MODAL DATA -----


// ----- VALIDATE INPUT LENGTH -----
const checkLength = (elementID, invalidFeedback) => {
    const validated = $(elementID).hasClass("validated");
    let minLength = $(elementID).attr("minlength");
    let maxLength = $(elementID).attr("maxlength");
    let value     = $(elementID).val().trim();
    let valLength = value.length;

    if (!minLength && !maxLength) {
        // DISREGARD
    } else if (!minLength && maxLength) {
        // DISREGARD
    } else if (minLength && !maxLength) {
        if (valLength < minLength) {
            $(elementID).removeClass("is-valid").addClass("is-invalid");
            invalidFeedback.text("Please enter at least "+minLength+" characters.");
        } else {
            validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-invalid").removeClass("is-valid");
            invalidFeedback.text("");
        }
    } else if (minLength && maxLength) {
        if (valLength < minLength) {
            $(elementID).removeClass("is-valid").addClass("is-invalid");
            invalidFeedback.text("Please enter at least "+minLength+" characters.");
        } else {
            validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-invalid").removeClass("is-valid");
            invalidFeedback.text("");
        }
    } else {
        // DISREGARD
    }
}
// ----- END VALIDATE INPUT LENGTH -----


// ----- VALIDATE CURRENCY -----
const checkCurrency = (elementID, invalidFeedback, value) => {
    const validated = $(elementID).hasClass("validated");
    let currencyValue = +(value.split(',').join(""));
    if (currencyValue > 0) {
        validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-invalid").removeClass("is-valid");
        invalidFeedback.text("");
    } else {
        $(elementID).removeClass("is-valid").addClass("is-invalid");
        invalidFeedback.text("This field is required.");
    }
}
// ----- END VALIDATE CURRENCY -----


// ----- VALIDATE IF EXISTS -----
const checkExists = (elementID, invalidFeedback) => {
    let inputs = {};
    let keys   = [], 
        values = [];
    let flag   = false;

    if ($(`${elementID}[unique]`).length > 0) {
        const name     = $(elementID).attr("name");
        const uniqueID = $(elementID).attr("unique");

        $("input[unique]").each(function() {
            let key   = $(this).attr("name");
            let value = $(this).val();
            keys.push(key);
            values.push(value);
            inputs[key] = value;
        })
        uniqueData.some(data => {
            if (keys.length > 0) {
                keys.map((item, index) => {
                    if (data.id !== uniqueID && item === name && data[item] === values[index] && elementID && invalidFeedback) {
                        flag = true;
                        let title = item.substr(0,1).toUpperCase()+item.substr(1).toLowerCase();
                        $(elementID).removeClass("is-valid").addClass("is-invalid");
                        invalidFeedback.text(`${title} already exists!`);
                    }
                })
            }
        })
    }
    return flag;
};
// ----- END VALIDATE IF EXISTS -----


// ----- VALIDATE EMAIL -----
const checkEmail = (elementID, invalidFeedback, value) => {
    const validated = $(elementID).hasClass("validated");
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ($(elementID).attr("type") == "email") {
        if (emailRegex.test(value)) {
            validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-invalid").removeClass("is-valid");
            invalidFeedback.text("");
        } else {
            $(elementID).removeClass("is-valid").addClass("is-invalid");
            invalidFeedback.text("Invalid email format.");
        }
    }
}
// ----- END VALIDATE EMAIL -----


// ----- VALIDATE URL -----
const checkURL = (elementID, invalidFeedback, value) => {
    const validated = $(elementID).hasClass("validated");
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    if ($(elementID).attr("type") == "url") {
        if (urlRegex.test(value)) {
            validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-invalid").removeClass("is-valid");
            invalidFeedback.text("");
        } else {
            $(elementID).removeClass("is-valid").addClass("is-invalid");
            invalidFeedback.text("Please enter a valid URL.");
        }
    }
}
// ----- END VALIDATE URL -----


// ----- VALIDATE INPUTS -----
const validateInput = (elementID) => {
    $(elementID).addClass("validated");
    let currency  = $(elementID).hasClass("currency");
    let required  = $(elementID).attr("required");
    let value     = $(`select${elementID}`).length > 0 ? $(elementID).val() : $(elementID).val().trim();
    let valLength = value ? value.length : 0;
    let invalidFeedback = 
            $(elementID).parent().find(".invalid-feedback").length > 0 ? 
                $(elementID).parent().find(".invalid-feedback") : 
                ($(elementID).parent().parent().find(".invalid-feedback").length > 0 ?
                $(elementID).parent().parent().find(".invalid-feedback") : $(elementID).parent().parent().parent().find(".invalid-feedback"));

    let isInputSelect = $("select"+elementID).length;
    let isInputButton = $("button"+elementID).length > 0 ? $("button"+elementID).length : $("[type=button]"+elementID).length;
    if (isInputSelect > 0) {
        let value = $("select"+elementID).val();
        let isSelect2 = $("select"+elementID+".select2").length;
        if (required != undefined && required != "undefined") {
            if (isSelect2) {
                if (value == "" || value == "undefined" || value == undefined || value == "null" || value == null) {
                    $(elementID).parent().children().next().next().children().children().removeClass("no-error").addClass("has-error");
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("This field is required.");
                } else {
                    $(elementID).parent().children().next().next().children().children().removeClass("has-error").addClass("no-error");
                    $(elementID).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                }
            } else {
                if (value == "" || value == "undefined" || value == undefined || value == "null" || value == null) {
                    $(elementID).parent().children().next().removeClass("no-error").addClass("has-error");
                    invalidFeedback.text("This field is required.");
                } else {
                    $(elementID).parent().children().next().removeClass("has-error").addClass("no-error");
                    invalidFeedback.text("");
                }
            }
            
        } else {
            $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
            $(elementID).removeClass("is-invalid").addClass("is-valid");
            invalidFeedback.text("");
        }
    } else if (isInputButton > 0) {
        let value = $("[type=button]"+elementID).val() ? $("[type=button]"+elementID).val() : $("button"+elementID).val();
        if (required != undefined && required != "undefined") {
            if (value != "" && value != undefined && value != null) {
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
            } else {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            }
            
        } else {
            $(elementID).removeClass("is-invalid").addClass("is-valid");
            invalidFeedback.text("");
        }
    } else {
        if (required != undefined && required != "undefined") {
            if ((valLength) <= 0) {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            } else {
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
                checkLength(elementID, invalidFeedback);
                currency && checkCurrency(elementID, invalidFeedback, value);
                checkEmail(elementID, invalidFeedback, value);
                checkURL(elementID, invalidFeedback, value);
                checkExists(elementID, invalidFeedback);
            }
        } else {
            $(elementID).removeClass("is-invalid").addClass("is-valid");
            valLength > 0 && checkLength(elementID, invalidFeedback);
            currency && checkCurrency(elementID, invalidFeedback, value);
            checkEmail(elementID, invalidFeedback, value);
            checkURL(elementID, invalidFeedback, value);
            checkExists(elementID, invalidFeedback);
        }
    }
}
// ----- END VALIDATE INPUTS -----


// ----- VALIDATE FORMS -----
const validateForm = (formID = null) => {
    if (formID) {
        const inputs = $("#"+formID+" .modal-body").find(differentInputStr, item => item);
        for (let i=0; i<inputs.length; i++) {
            validateInput("#"+inputs[i].id);
        }
        if ($(`#${formID}`).find(".is-invalid").length > 0) {
            $(`#${formID}`).find(".is-invalid")[0].focus();
            return false;
        }
        return true;
    }
}
// ----- END VALIDATE FORMS -----


// ----- SAVE/UPDATE/DELETE TABLE DATA -----
const saveUpdateDeleteTableData = async (data, path) => {
    let flag;
    $.ajax({
        method: "POST",
        url: path,
        data,
        global: false,
        cache: false,
        async: false,
        dataType: "json",
        beforeSend: function() {
            $("#loader").show();
        },
        success: function(data) {
            let result = data.split("|");
            let isSuccess = result[0], 
                message   = result[1], 
                id        = result[2] ? result[2] : null;
            if (isSuccess == "true") {
                setTimeout(() => {
                    closeModals();
                    showNotification("success", message);
                    flag = true;
                    $("#loader").hide();
                }, 500);
            } else {
                flag = false;
                showNotification("danger", message);
                $("#loader").hide();
            }
        },
        error: function(err) {
            flag = false;
            showNotification("danger", "System error: Please contact the system administrator for assistance!");
            $("#loader").hide();
        }
    });
    return await flag;
}

const insertTableData = async (data) => {
    $("#loader").show();
    let path = `${base_url}operations/insertTableData`;
    return await saveUpdateDeleteTableData(data, path);
}

const updateTableData = async (data) => {
    $("#loader").show();
    let path = `${base_url}operations/updateTableData`;
    return await saveUpdateDeleteTableData(data, path);
}

const deleteTableData = async (data) => {
    $("#loader").show();
    let path = `${base_url}operations/deleteTableData`;
    return await saveUpdateDeleteTableData(data, path);
}
// ----- END SAVE/UPDATE/DELETE TABLE DATA -----


$(function() {

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
    $(document).on("keypress", ".validate", function(e) {
        // ----- KEYCODE -----
        /**
         *   - [A-Z]    = 65-90
         *   - [a-z]    = 97-122
         *   - [0-9]    = 48-57
         *   - [()]     = 40-41
         */
        // ----- END KEYCODE -----

        let keyCode  = e.keyCode;
        let key      = e.key;
        let flag     = 0;

        let allowCharacters = $(this).data("allowcharacters");
        if (allowCharacters) {
            allowCharacters = $(this).data("allowcharacters").length > 2 ? $(this).data("allowcharacters").split("") : "[ ][ ]";
            allowCharacters.shift();
            allowCharacters.pop();
            allowCharacters   = allowCharacters.join("");
            let arrCharacters = allowCharacters.split(/\]\[/);

            arrCharacters.map(item => {
                item == "0-9" && (keyCode >= 48 && keyCode <= 57)  && flag++;
                item == "A-Z" && (keyCode >= 65 && keyCode <= 90)  && flag++;
                item == "a-z" && (keyCode >= 97 && keyCode <= 122) && flag++;
                item == "()"  && (keyCode >= 40 && keyCode <= 41)  && flag++;
                item == key   && flag++;
            });

            return flag > 0 ? true : false; 
        }
    })
    // ----- END PREVENT FROM ENTERING NOT ALLOWED CHARACTERS -----


    // ----- CHECK IF THE INPUTS IS VALID OR INVALID BASED ON THE LENGTH -----
    $(document).on("keyup", ".validate", function(e) {
        let name      = $(this).attr("name");
        let elementID = $(this).attr("id");
            elementID = `#${$(this).attr("id")}`;
        let required  = $(this).attr("required");
        let minLength = $(this).attr("minlength");
        let maxLength = $(this).attr("maxlength");
        let validated = $(this).hasClass("validated");
        let currency  = $(this).hasClass("currency");
        let value     = $(this).val().trim();
        let valLength = value.length;
        let invalidFeedback = 
            $(elementID).parent().find(".invalid-feedback").length > 0 ? 
                $(elementID).parent().find(".invalid-feedback") : 
                ($(elementID).parent().parent().find(".invalid-feedback").length > 0 ?
                $(elementID).parent().parent().find(".invalid-feedback") : $(elementID).parent().parent().parent().find(".invalid-feedback"));

        if (value == "" || value == "undefined" || value == undefined || value == "null" || value == null) {
            validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-valid").removeClass("is-invalid");
            invalidFeedback.text("");
            valLength > 0 && checkLength(elementID, invalidFeedback);
            currency && checkCurrency(elementID, invalidFeedback, value);
            checkEmail(elementID, invalidFeedback, value);
            checkURL(elementID, invalidFeedback, value);
            checkExists(elementID, invalidFeedback);
            if ((valLength) <= 0) {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            }
        } else {
            if ((valLength) <= 0) {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            } else {
                validated ? $(elementID).removeClass("is-invalid").addClass("is-valid") : $(elementID).removeClass("is-valid").removeClass("is-invalid");
                invalidFeedback.text("");
                checkLength(elementID, invalidFeedback);
                currency && checkCurrency(elementID, invalidFeedback, value);
                checkEmail(elementID, invalidFeedback, value);
                checkURL(elementID, invalidFeedback, value);
                checkExists(elementID, invalidFeedback);
            }
        }
    })
    // ----- END CHECK IF THE INPUTS IS VALID OR INVALID BASED ON THE LENGTH -----


    // ----- EVERY TIME THE SELECT CHANGES -----
    $(document).on("change", "select", function() {
        let value     = $(this).val();
        let elementID = `#${$(this).attr("id")}`;
        let validated = $(this).hasClass("validated");
        let required  = $(this).attr("required");
        let isSelect2 = $("select"+elementID+".select2").length;
        let invalidFeedback = 
            $(elementID).parent().find(".invalid-feedback").length > 0 ? 
                $(elementID).parent().find(".invalid-feedback") : 
                ($(elementID).parent().parent().find(".invalid-feedback").length > 0 ?
                $(elementID).parent().parent().find(".invalid-feedback") : $(elementID).parent().parent().parent().find(".invalid-feedback"));

        if (validated) {
            if (required != undefined && required != "undefined") {
                if (isSelect2) {
                    if (value == "" || value == "undefined" || value == undefined || value == "null" || value == null) {
                        $(elementID).parent().children().next().next().children().children().removeClass("no-error").addClass("has-error");
                        $(elementID).removeClass("is-valid").addClass("is-invalid");
                        invalidFeedback.text("This field is required.");
                    } else {
                        $(elementID).parent().children().next().next().children().children().removeClass("has-error").addClass("no-error");
                        $(elementID).removeClass("is-invalid").addClass("is-valid");
                        invalidFeedback.text("");
                    }
                } else {
                    if (value == "" || value == "undefined" || value == undefined || value == "null" || value == null) {
                        $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("no-error").addClass("has-error");
                        $(elementID).removeClass("is-valid").addClass("is-invalid");
                        invalidFeedback.text("This field is required.");
                    } 
                    else {
                        $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
                        $(elementID).removeClass("is-invalid").addClass("is-valid");
                        invalidFeedback.text("");
                    }
                }
                
            } else {
                $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
            }
        }
    })
    // ----- END EVERY TIME THE SELECT CHANGES -----

})