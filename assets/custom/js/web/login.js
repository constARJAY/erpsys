$(document).ready(function() {
    $(document).on("click", "#btnLogin", function(e){
        formButtonHTML(this, true);
		const validate = validateForm("page_content");

		if (validate) {
            let applicantUsername = $("#applicantUsername").val();
            let applicantPassword = $("#applicantPassword").val();

            setTimeout(() => {
                formButtonHTML(this, false);
                $("#loader").show();
                $(".loader p").text('Loading...');
                setTimeout(() => {
                    var result = getTableData("web_applicant_list_tbl",
                                              "applicantID",
                                              "applicantUsername = BINARY '"+applicantUsername+"' AND applicantPassword = BINARY '"+applicantPassword+"' AND applicantStatus <> 0");

                    if(result.length != 0){
                        let data = {"applicantID"  : result[0]["applicantID"]};

                        $.ajax({
                            url:`${base_url}web/login/set_session`,
                            method:"POST",
                            data,
                            success:function(){
                                window.location.replace(`${base_url}web/applicant`);
                            }
                        });
                    }else{
                        $("#loader").hide();    
                        $(".alert").removeClass("displaynone").addClass("displayblock");
                        $("#applicantUsername").removeClass("is-valid").addClass("is-invalid");
                        $("#applicantPassword").removeClass("is-valid").addClass("is-invalid");
                        $("#applicantUsername").focus();
                    }
                }, 500);
            }, 100);
		} else {
            formButtonHTML(this, false);
        }
    });

    $(document).on("keyup", `[type="password"]`, function(e) {
        e.preventDefault();
        if (e.which == 13) {
            $("#btnLogin").trigger("click");
        }
    })

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
})