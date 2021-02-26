$(document).on("paste","input, textarea", function(e){
    e.preventDefault();
});

$(document).on("keypress", ".name", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9.,']*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("is-valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 2){
            if(val.length > 125){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 2 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".unit-number", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9.#]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
    }else{
        let val = this.value;
        if(val.length < 1){
            if(val.length > 35){
                e.preventDefault();
            }else{
                // $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 1 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            // $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".street-name", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9.',-]*$/;
    const regex 		= new RegExp(expression);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 2){
            if(val.length > 50){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 2 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".subdivision-name", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9.',-]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 5){
            if(val.length > 50){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 6 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".barangay", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9.#',-]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 5){
            if(val.length > 50){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 6 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".state", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z0-9-]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 5){
            if(val.length > 50){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 6 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".country", function(e){
    const inputValue 	= e.key;
    const expression	= /^[a-z A-Z]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("valid").addClass("invalid");
    }else{
        let val = this.value;
        if(val.length < 5){
            if(val.length > 50){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 6 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("keypress", ".postal-code", function(e){
    const inputValue 	= e.key;
    const expression	= /^[0-9]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
        $(this).removeClass("is-valid").addClass("is-invalid");
    }else{
        let val = this.value;
        if(val.length < 3){
            if(val.length > 4){
                e.preventDefault();
            }else{
                $(this).removeClass("valid").addClass("invalid");
                $(this).next().text("Please input atleast 4 character").addClass("d-block");
            }
        }else{
            $(this).next().removeClass("d-block");
            $(this).addClass("valid").removeClass("invalid");
        }
    }
});

$(document).on("click", ".show-password", function(){
    $("#password-field").addClass("hide-password").removeClass("show-password");
    $(this).removeClass("fa-fw fa-eye").addClass("fa-eye-slash");

    $("#add_password").attr('type', 'text'); 
});

$(document).on("click", ".hide-password", function(){
    $("#password-field").removeClass("hide-password").addClass("show-password");
    $(this).addClass("fa-fw fa-eye").removeClass("fa-eye-slash");

    $("#add_password").attr('type', 'password'); 
});
// PASSWORD VALIDATION

$(document).on("keypress", ".mobile-number", function(e){
        let val = this.value;
        if (val.length < 2) {
        $(this).val("09");
        }
        if (val.length == 4) {
            $(this).val(val + "-");
        }
        if (val.length == 8) {
            $(this).val(val + "-");
        }
});

$(document).on("keypress", ".tel-number", function(e){
    let val = this.value;
    if (val.length < 2) {
    $(this).val("(");
    }
    if (val.length == 3) {
        $(this).val(val + ") ");
    }
    
    if (val.length == 9) {
        $(this).val(val + "-");
    }
});

$(document).on("keypress", ".ti-number", function(e){
    let val = this.value;
    if (val.length == 3) {
        $(this).val(val + "-");
    }
    if (val.length == 7) {
        $(this).val(val + "-");
    }
    if (val.length == 11) {
        $(this).val(val + "-");
    }
});




$(document).on("keypress", ".numbers-only", function(e){
    const inputValue 	= e.key;
    const expression	= /^[0-9]*$/;
    const regex 		= new RegExp(expression);
    //console.log(message);
    if (!regex.test(inputValue)) {
        e.preventDefault();
    }else{
       
    }
});





// LOADER
function divLoader(divisionID, message){
    var loader =    `    <!-- Main Content -->
                            <div class="w-100 d-flex justify-content-center align-items-center py-5" style="background-color: #10948b;">
                                <div class="loader">
                                    <div class="mt-3"><img class="zmdi-hc-spin w60" src="pages/admin-assets/images/spinner.svg" alt="Amaze"></div>
                                    <p class="text-white font-weight-bold">${message}</p>
                                </div>
                            </div>
                    `
    $("#"+divisionID).html(loader);
}





function standardCheckInCheckOut(){
    var  returnData    =   "";
    $.ajax({
        url:"admin/check_in_check_out",
        dataType:"json",
        async:false,
        success:function(data){
            returnData = data == "FALSE" ? "" : data[0]["check_in"]+"|"+data[0]["check_out"];
        }
    });
    return returnData
}

function inputPriceFormat(idName){
    $("#"+idName).val(function(index, value) {
        return value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
      });
}

function getValueForm(formID){
    data = [];
   $("#"+formID).find("input[type=text], input[type=password], textarea, select, input[type=checkbox]:checked, #add_initialAmount-ext_services").each(function(){
       var dataValue   =   this.value;
       data.push({[this.id] : dataValue});
   });
   return data;
}

function arraySum(input){         
if (toString.call(input) !== "[object Array]")
    return false;
     var total =  0;
      for(var i=0;i<input.length;i++){                  
        if(isNaN(input[i])){ continue; }
        total += Number(input[i]);
      }
        return total; 
}

function reverseFormatCurrency(input){
    var first_filter    = input.replace("₱","");
    var second_filter   = first_filter.replace(",","");
    return parseFloat(second_filter);
}

function formValidation(formID){
    var theForm = $("#"+formID).find("input:empty");
    theForm.each(function () {
        rjValidateInputs("#"+this.id);
        if (( this.value== "" || $("#" + this.id).hasClass("is-invalid") ) && this.id != "unitNumber" && this.id != "rev_unitNumber" && this.id != "editUnitNumber" && this.id != "profile_unitNumber") {
            // console.log(this.id);
            $("#" + this.id).addClass("is-invalid").removeClass("is-valid");
            $("#"+this.id).next().text("This field is Required");
        } else {
            $("#" + this.id).addClass("is-valid").removeClass("is-invalid");
        }
    });
}

function  currency(){
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
}
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
