$(document).ready(function() {
    // ----- CONFIRM PASSWORD -----
    function comparePassword() {
        const password        = $("[name=applicantPassword]").val();
        const confirmPassword = $("[name=applicantConfirmPassword]").val();
        const validated = $("[name=applicantConfirmPassword]").hasClass("validated");
        if (password.length > 0) {
            if (password == confirmPassword) {
                $("#invalid-applicantConfirmPassword").text("");
                if (validated) {
                    $("[name=applicantConfirmPassword]").removeClass("is-invalid").addClass("is-valid");
                    return true;
                } else {
                    $("[name=applicantConfirmPassword]").removeClass("is-valid").removeClass("is-invalid");
                    return false;
                }
            } else {
                $("#applicantConfirmPassword").removeClass("is-valid").addClass("is-invalid");
                $("#invalid-applicantConfirmPassword").text("The password does not match.");
                return false;
            }
        }
    }

    $(document).on("keyup", "[name=applicantPassword], [name=applicantConfirmPassword]", function() {
        comparePassword();
    })
    // ----- END CONFIRM PASSWORD -----

    // ----- TOGGLE PASSWORD -----
    $(document).on("click", ".btnTogglePassword", function() {
        const show = $(this).children().first().hasClass("fas fa-eye");

        if (show) {
            $(this).children().first().removeClass("fas fa-eye").addClass("fas fa-eye-slash");
            $(this).closest(".inner-addon").find("[type=password]").first().attr("type", "text");
        } else {
            $(this).children().first().removeClass("fas fa-eye-slash").addClass("fas fa-eye");
            $(this).closest(".inner-addon").find("[type=text]").first().attr("type", "password");
        }
    })
    // ----- END TOGGLE PASSWORD -----

    // ----- RESET PASSWORD -----
	$(document).on("click", "#btnReset", function () {
        formButtonHTML(this, true);
		const validate = validateForm("page_content");
        const isValid = comparePassword();

		if (validate && isValid) {
            
            let data = new FormData();
            let applicantPassword = $("#applicantPassword").val();

            data.append("applicantID",$("#btnReset").data("applicantid"));
            data.append("applicantPassword",applicantPassword);
            data.append("applicantEncryptedPassword",encryptString(applicantPassword));

            setTimeout(() => {
                formButtonHTML(this, false);
                $("#loader").show();
                $(".loader p").text('Processing...');
                setTimeout(() => {
                    $.ajax({
                        method:      "POST",
                        url:         `${base_url}web/reset_password/password_change`,
                        data,
                        processData: false,
                        contentType: false,
                        global:      false,
                        cache:       false,
                        async:       false,
                        dataType:    "json",
                        beforeSend: function() {
                            $("#loader").show();    
                        },
                        success: function(data) {
                            if (data[0]=="true") {
                                $("#loader").hide();
                                displayNotification("success").then(res => {
                                    if (res.isConfirmed) {
                                        $("#loader").show();
                                        $(".loader p").text('Loading...');
                                        window.location.replace(`${base_url}web/login`);
                                    }
                                });
                            }else{
                                displayNotification("error");
                                $("#loader").hide();
                                $("[name=applicantPassword]").addClass("is-invalid");
                                $("#invalid-applicantPassword").text('Something went wrong!');
                                $("#applicantPassword").focus();
                            }
                        },
                        error: function() {
                            setTimeout(() => {
                                $("#loader").hide();
                                showNotification("danger", "System error: Please contact the system administrator for assistance!");
                            }, 500);
                        }
                    }).done(function() {
                        setTimeout(() => {
                            $("#loader").hide();
                        }, 500);
                    })
                }, 500);
            }, 100);
		} else {
            formButtonHTML(this, false);
        }
	});
	// ----- END SAVE DATA -----

/* ---------------------------------------------------------- */
    // ----- SAVE APPLICANT -----
    function displayNotification(status = "error") {
        let swalTitle, swalText, swalImg, confirm;  
        
        if(status=="success"){
            swalTitle = `Password Updated!`;
            swalText  = `Your password has been change successfully. Use your new password to log in`;
            swalImg   = `${base_url}assets/modal/mail_sent.png`;
            confirm   = `<i class="fas fa-sign-in"></i> Login now`;
        }else{
            swalTitle = `Something went wrong!`;
            swalText  = `There was an issue in changing your password.`;
            swalImg   = `${base_url}assets/modal/mail_unsent.png`;
            confirm   = `OK`;
        }
        
               
        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         240,
            imageHeight:        200,
            imageAlt:           "Custom image",
            confirmButtonColor: "#dc3545",
            allowOutsideClick: false,
            confirmButtonText: confirm,
        })
    }
    // ----- END SAVE APPLICANT -----
})