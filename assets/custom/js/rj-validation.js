const base_url = $("#base_url").val();

// ---- LOADING ----
const loadingAnimation = function() {
    return `
    <div class="loader w-100 p-5 text-center">
        <div class="mt-3">
            <i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
            <br>
            <p class="text-primary">Please wait...</p>
        </div>
    </div>`;
}();
// ---- END LOADING ----


// ---- CURRENCY ----
function formatCurrency(amount) {
    var currency = new Intl.NumberFormat('tl-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(amount);
    return currency;
}
// ---- END CURRENCY ----


function resetForms(formID) {
    $(formID).find("input, select, textarea").each(function() {
        const elementID = "#"+$(this).attr("id");
        let invalidFeedback = 
            $(elementID).parent().find(".invalid-feedback").length > 0 ? 
                $(elementID).parent().find(".invalid-feedback") : 
                ($(elementID).parent().parent().find(".invalid-feedback").length > 0 ?
                $(elementID).parent().parent().find(".invalid-feedback") : $(elementID).parent().parent().parent().find(".invalid-feedback"));
        
        $(elementID).removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error").removeClass("validated");
        $("select"+elementID).length > 0 ? $("select"+elementID).val("").trigger("change") : $(elementID).val("");
        invalidFeedback.text("");
        $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
    })
}


// ---- VALIDATE INPUTS -----
function rjValidateInputs(elementID) {
    $(elementID).addClass("validated");
    let currency = $(elementID).hasClass("currency");
    let required = $(elementID).attr("required");
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
                if (value != "" || value != undefined || value != null) {
                    $(elementID).parent().next().children().children().removeClass("has-error").addClass("no-error");
                    invalidFeedback.text("");
                } else {
                    $(elementID).parent().next().children().children().removeClass("no-error").addClass("has-error");
                    invalidFeedback.text("This field is required.");
                }
            } else {
                if (value != null) {
                    $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
                    $(elementID).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                } 
                else {
                    $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("no-error").addClass("has-error");
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("This field is required.");
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
        let minLength = $(elementID).attr("minlength");
        let maxLength = $(elementID).attr("maxlength");
        let value     = $(elementID).val().trim();
        let valLength = value.length;

        // let value     = $(elementID).val() ? ($(elementID).val().length > 0 ? $(elementID).val().trim() : $(elementID).val()) : $(elementID).val();
        // let valLength = value ? value.length : 0;

        const checkLength = (minLength, maxLength) => {
            if (!minLength && !maxLength) {
                // DISREGARD
            } else if (!minLength && maxLength) {
                // DISREGARD
            } else if (minLength && !maxLength) {
                if (valLength < minLength) {
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Please enter at least "+minLength+" characters.");
                } else {
                    $(elementID).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                }
            } else if (minLength && maxLength) {
                if (valLength < minLength) {
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Please enter at least "+minLength+" characters.");
                } else {
                    $(elementID).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                }
            } else {
                // DISREGARD
            }
        }

        const checkCurrency = (value) => {
            let currencyValue = +(value.split(',').join(""));
            if (currencyValue > 0) {
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
            } else {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            }
        }

        const checkEmail = (value) => {
            let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ($(elementID).attr("type") == "email") {
                if (emailRegex.test(value)) {
                    $(elementID).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                } else {
                    $(elementID).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Invalid email format.");
                }
            }
        }

        if (required != undefined && required != "undefined") {
            if ((valLength) <= 0) {
                $(elementID).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            } else {
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
                checkLength(minLength, maxLength);
                currency && checkCurrency(value);
                checkEmail(value);
            }
        } else {
            $(elementID).removeClass("is-invalid").addClass("is-valid");
            invalidFeedback.text("");
            valLength > 0 && checkLength(minLength, maxLength);
            currency && checkCurrency(value);
            checkEmail(value);
        }
    }
}


$(function() {

    // ----- HIDE PREVIOUS OR FUTURE DATES -----
    $(".datebefore").attr("max", moment(new Date).format("YYYY-MM-DD"));
    $(".dateafter").attr("min", moment(new Date).format("YYYY-MM-DD"));
    // ----- END HIDE PREVIOUS OR FUTURE DATES -----


    // ----- CURRENCY FORMAT -----
    $(".currency").inputmask({
        alias:           'decimal', 
        groupSeparator:  ',', 
        autoGroup:       true, 
        digits:          2, 
        digitsOptional:  false, 
        prefix:          ' ', 
        placeholder:     '0.00', 
        showMaskOnHover: false, 
        rightAlign:      false, 
        showMaskOnFocus: false
    });
    // ----- END CURRENCY FORMAT -----


    $(document).on("keypress", ".validate", function(e) {
        // ----- KEYCODE -----
        /*
            - [A-Z]    = 65-90
            - [a-z]    = 97-122
            - [0-9]    = 48-57
            - [()]     = 40-41
        */
        // ----- END KEYCODE -----

        let keyCode  = e.keyCode;
        let key      = e.key;
        let which    = e.which;
        let flag     = 0;

        let allowCharacters = $(this).data("allowcharacters").length > 2 ? $(this).data("allowcharacters").split("") : "[ ][ ]";
            allowCharacters.shift();
            allowCharacters.pop();
            allowCharacters = allowCharacters.join("");
        let arrCharacters   = allowCharacters.split(/\]\[/);
    

        arrCharacters.map(item => {
            item == "0-9" && (keyCode >= 48 && keyCode <= 57)  && flag++;
            item == "A-Z" && (keyCode >= 65 && keyCode <= 90)  && flag++;
            item == "a-z" && (keyCode >= 97 && keyCode <= 122) && flag++;
            item == "()"  && (keyCode >= 40 && keyCode <= 41)  && flag++;
            item == key   && flag++;
        })

        return flag > 0 ? true : false; 
    })

    $(document).on("keyup", ".validate", function(e) {
        let required  = $(this).attr("required");
        let minLength = $(this).attr("minlength");
        let maxLength = $(this).attr("maxlength");
        let validated = $(this).hasClass("validated");
        let currency  = $(this).hasClass("currency");
        let value     = $(this).val().trim();
        let valLength = value.length;
        let invalidFeedback = 
            $(this).parent().find(".invalid-feedback").length > 0 ? 
                $(this).parent().find(".invalid-feedback") : 
                ($(this).parent().parent().find(".invalid-feedback").length > 0 ?
                $(this).parent().parent().find(".invalid-feedback") : $(this).parent().parent().parent().find(".invalid-feedback"));

        

        const checkLength = (minLength, maxLength) => {
            if (!minLength && !maxLength) {
                // DISREGARD
            } else if (!minLength && maxLength) {
                // DISREGARD
            } else if (minLength && !maxLength) {
                if (valLength < minLength) {
                    $(this).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Please enter at least "+minLength+" characters.");
                } else {
                    validated ? $(this).removeClass("is-invalid").addClass("is-valid") : $(this).removeClass("is-invalid").removeClass("is-valid");
                    invalidFeedback.text("");
                }
            } else if (minLength && maxLength) {
                if (valLength < minLength) {
                    $(this).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Please enter at least "+minLength+" characters.");
                } else {
                    validated ? $(this).removeClass("is-invalid").addClass("is-valid") : $(this).removeClass("is-invalid").removeClass("is-valid");
                    invalidFeedback.text("");
                }
            } else {
                // DISREGARD
            }
        }

        const checkCurrency = (value) => {
            let currencyValue = +(value.split(',').join(""))
            if (currencyValue > 0) {
                $(this).removeClass("is-valid").removeClass("is-invalid");
                invalidFeedback.text("");
            } else {
                $(this).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            }
        }

        const checkEmail = (value) => {
            let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ($(this).attr("type") == "email") {
                if (emailRegex.test(value)) {
                    $(this).removeClass("is-invalid").addClass("is-valid");
                    invalidFeedback.text("");
                } else {
                    $(this).removeClass("is-valid").addClass("is-invalid");
                    invalidFeedback.text("Invalid email format.");
                }
            }
        }

        if (required != undefined && required != "undefined") {
            if ((valLength) <= 0) {
                $(this).removeClass("is-valid").addClass("is-invalid");
                invalidFeedback.text("This field is required.");
            } else {
                validated ? $(this).removeClass("is-invalid").addClass("is-valid") : $(this).removeClass("is-valid").removeClass("is-invalid");
                invalidFeedback.text("");
                checkLength(minLength, maxLength);
                currency && checkCurrency(value);
                checkEmail(value);
            }
        } else {
            validated ? $(this).removeClass("is-invalid").addClass("is-valid") : $(this).removeClass("is-valid").removeClass("is-invalid");
            invalidFeedback.text("");
            valLength > 0 && checkLength(minLength, maxLength);
            currency && checkCurrency(value);
            checkEmail(value);
        }
    })

    $(document).on("change", "select", function() {
        let value     = $(this).val();
        let elementID = $(this).attr("id");
            elementID = "#"+elementID;
        let validated = $(this).hasClass("validated");
        let required  = $(this).attr("required");
        let isSelect2 = $("select"+elementID+".select2").length;
        let invalidFeedback = 
            $(this).parent().find(".invalid-feedback").length > 0 ? 
                $(this).parent().find(".invalid-feedback") : 
                ($(this).parent().parent().find(".invalid-feedback").length > 0 ?
                $(this).parent().parent().find(".invalid-feedback") : $(this).parent().parent().parent().find(".invalid-feedback"));

        if (validated) {
            if (required != undefined && required != "undefined") {
                if (isSelect2) {
                    if (value != "" || value != undefined || value != null) {
                        $(elementID).parent().next().children().children().removeClass("has-error").addClass("no-error");
                        invalidFeedback.text("");
                    } else {
                        $(elementID).parent().next().children().children().removeClass("no-error").addClass("has-error");
                        invalidFeedback.text("This field is required.");
                    }
                } else {
                    if (value != null) {
                        $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
                        $(elementID).removeClass("is-invalid").addClass("is-valid");
                        invalidFeedback.text("");
                    } 
                    else {
                        $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("no-error").addClass("has-error");
                        $(elementID).removeClass("is-valid").addClass("is-invalid");
                        invalidFeedback.text("This field is required.");
                    }
                }
                
            } else {
                $(elementID).parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").addClass("no-error");
                $(elementID).removeClass("is-invalid").addClass("is-valid");
                invalidFeedback.text("");
            }
        }
    })

    $(document).on("keypress", ".contactnumber", function(e){
        const keyCode = e.which;
        if (!((keyCode >= 48 && keyCode <= 57) ) && keyCode != 8 && keyCode != 13) {
        e.preventDefault();
        } else {
           let val = this.value;
           if (val.length < 2) {
               $(this).val("09");
           }
           if (val.length == 4) {
               $(this).val(val+"-");
           }
           if (val.length == 8) {
               $(this).val(val+"-");
           }
        }
    });
    // ---- VALIDATE INPUTS -----

})