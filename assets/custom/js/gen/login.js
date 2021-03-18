$(document).on("click", "#login-btn", function(e){
    
    $(".confirmation").show();
    let username            = $("#username").val();
    let password            = $("#password").val();
    let condition           = getTableData("gen_user_account_tbl","", "username = BINARY '"+username+"' AND password = BINARY '"+password+"' ");
    let usernameCondition   = getTableData("gen_user_account_tbl","username, status", "username = BINARY '"+username+"' ");
    let confirmation;
    
    if(username == "" || password == ""){
        
    }else{
        e.preventDefault();

        if(condition.length < 1){
            $(".validate").val("");
                confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>Incorrect username or password.</span></div>';
                $(".confirmation").html(confirmation);
                    // $("#username").val(username);
                    $("#username").focus();
                    $("#password").val("");

        }else if(condition[0]["status"] == "0"){
                confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>The account that you are trying to access is inactive <br> Please contact the system administrator for more information</span> </div>';
                $(".confirmation").html(confirmation);
                // $("#username").val(username);
                $("#username").focus();
                $("#password").val("");    
        }else{
            
                if(condition[0]["userType"] != "1"){
                    confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>The account that you are trying to access is inactive <br> Please contact the system administrator for more information</span> </div>';
                    $(".confirmation").html(confirmation);
                    // $("#username").val(username);
                    $("#username").focus();
                    $("#password").val(""); 
                }else{
                    let data = {"userType"  : condition[0]["userType"],"userAccountID" : condition[0]["userAccountID"]};
                    $.ajax({
                        url:"login/set_session",
                        method:"POST",
                        data,
                        dataType:"json",
                        success:function(data){
                            // if(data == true) window.location.replace('operations');
                            if(data == true) window.location.replace('approval_setup');
                        }
                    });
                }
                
        }

        

    }
});

$(document).on("click", "#password-field", function(){
    let condition   = $(this).hasClass("fas fa-eye-slash");
    if(condition){  
        $("#password").attr('type', 'password');
        $(this).removeClass("fas fa-eye-slash").addClass("fa-fw fa-eye");
    }else{
        $("#password").attr('type', 'text');
        $(this).removeClass("fa-fw fa-eye").addClass("fas fa-eye-slash");
    }

});

$(document).on("click","#username, #password", function(){
    $(".confirmation").hide(950);$(".confirmation").html("");
});