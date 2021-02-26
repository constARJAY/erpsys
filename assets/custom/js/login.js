$(document).ready(function(){
    $('.js-tilt').tilt({
        scale: 1.1
    });

    new WOW().init();

    $(document).on("click", ".show-password", function(){
		$("#password-field").addClass("hide-password").removeClass("show-password");
		$(this).removeClass("fa fa-fw fa-eye").addClass("fas fa-eye-slash");

        $("#password").attr('type', 'text'); 
    });
    $(document).on("click", ".hide-password", function(){
		 $("#password-field").addClass("show-password").removeClass("hide-password");

		 $(this).addClass("fa fa-fw fa-eye").removeClass("fas fa-eye-slash");
         $("#password").attr('type', 'password'); 
    });

    $(document).on("click", "#login-btn", function (e) {
    	const username = $("#username").val();
    	const password = $("#password").val();
    	if (username == "" | password == "") {

    	} else {
    		e.preventDefault();
    		$.ajax({
    			method: "POST",
				url: "admin/validate_login",
				data: {username, password},
				async:"true",
    			dataType: "JSON",
    			success: function (data) {
    				if (data == "FALSE") {
    					var confirmation = '<div class="alert alert-danger text-center" role="alert"> <p>Incorrect username or password.</p></div>';
    					$(".confirmation").html(confirmation);
    				} else {
    					window.location.replace('dashboard');
					}
					
    			}
    		});
    	}
    });


});
