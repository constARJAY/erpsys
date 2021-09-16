$(document).ready(function() {
    // ----- SAVE DATA -----
	$(document).on("click", "#btnSend", function () {
        formButtonHTML(this, true);
		const validate = validateForm("page_content");

		if (validate) {
            let data = new FormData();
            data.append("email_to",$("#applicantEmail").val());
            setTimeout(() => {
                formButtonHTML(this, false);
                $("#loader").show();
                $(".loader p").text('Sending...');
                setTimeout(() => {
                    $.ajax({
                        method:      "POST",
                        url:         `${base_url}web/forgot_password/send_reset_link`,
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
                            if (data=="success") {
                                $("#loader").hide();
                                displayNotification("success").then(res => {
                                    if (res.isConfirmed) {
                                        $("#loader").show();
                                        $(".loader p").text('Loading...');
                                        window.location.replace(`${base_url}web/login`);
                                    }
                                }); 
                            }else if(data=="not_exist"){
                                $("#loader").hide();
                                $("[name=applicantEmail]").addClass("is-invalid");
                                $("#invalid-applicantEmail").text('The email address you entered does not exist in our system.');
                                $("#applicantEmail").focus();
                            }else{
                                displayNotification("error");
                                $("#loader").hide();
                                $("[name=applicantEmail]").addClass("is-invalid");
                                $("#invalid-applicantEmail").text('Something went wrong!');
                                $("#applicantEmail").focus();
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
            swalTitle = `Password reset link has been sent!`;
            swalText  = `Please check your inbox and click the link to reset your password`;
            swalImg   = `${base_url}assets/modal/mail_sent.png`;
            confirm   = `<i class="fas fa-sign-in"></i> Back to login`;
        }else{
            swalTitle = `Something went wrong!`;
            swalText  = `There was an issue in sending email.`;
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