$(document).ready(function() {
    $(document).on("click", "#btnLogin", function(e){
        formButtonHTML(this, true);
		const validate = validateForm("page_content");

		if (validate) {
            let applicantUsername = $("#applicantUsername").val();
            let applicantPassword = $("#applicantPassword").val();
            let messageAlert      = `
                                        <div class="alert alert-danger ">
                                                <strong>ERROR: </strong> The username or password you entered is incorrect.
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                        </div>`;
            setTimeout(() => {
                formButtonHTML(this, false);
                $("#loader").show();
                $(".loader p").text('Loading...');
                setTimeout(() => {
                    var result = getTableData("web_applicant_list_tbl",
                                              "applicantID,applicantStatus",
                                              "applicantUsername = BINARY '"+applicantUsername+"' AND applicantPassword = BINARY '"+applicantPassword+"'");

                    if(result.length != 0){
                        messageAlert      = `
                                        <div class="alert alert-danger ">
                                                <strong>ERROR: </strong> The email of this user is unverified." - for unverfied users.
                                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                        </div>`;
                        if(result[0].applicantStatus == "0"){
                            $("#loader").hide();    
                            $(".alert-message").html(messageAlert);
                            $("#applicantUsername").removeClass("is-valid").addClass("is-invalid");
                            $("#applicantPassword").removeClass("is-valid").addClass("is-invalid");
                            $("#applicantUsername").focus();
                        }else{
                            let data = {"applicantID"  : result[0]["applicantID"]};
                            $.ajax({
                                url:`${base_url}web/login/set_session`,
                                method:"POST",
                                data,
                                success:function(){
                                    window.location.replace(`${base_url}web/applicant`);
                                }
                            });
                        }
                    }else{
                        $("#loader").hide();    
                        $(".alert-message").html(messageAlert);
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