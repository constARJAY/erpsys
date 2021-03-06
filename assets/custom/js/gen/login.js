$(function() {
    $('form').each(function() {
        $(this).find('input').keypress(function(e) {
            // Enter pressed?
            if(e.which == 10 || e.which == 13) {
                // this.form.submit();
                document.getElementById("login-btn").click();
            }
        });

        $(this).find('input[type=submit]').hide();
    });
});

$(document).on("click", "#login-btn", function(e){
    
    $(".confirmation").show();
    let username            = $("#username").val();
    let password            = $("#password").val();
    let condition           = getTableData("hris_employee_list_tbl", "employeeID, employeeStatus", "employeeUsername = BINARY '"+username+"' AND employeePassword = BINARY '"+password+"'");
    let confirmation;
    
    if(username == ""){
        $("#username").focus();
    }else if(password == ""){
        $("#password").focus();
    }else{
        e.preventDefault();

        if(condition.length < 1){
            $(".validate").val("");
                confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>Incorrect username or password.</span></div>';
                $(".confirmation").html(confirmation);
                    // $("#username").val(username);
                    $("#username").focus();
                    $("#password").val("");

        }else if(!["1", "2", "7"].includes(condition[0]["employeeStatus"])){
                confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>The account that you are trying to access is inactive <br> Please contact the system administrator for more information</span> </div>';
                $(".confirmation").html(confirmation);
                // $("#username").val(username);
                $("#username").focus();
                $("#password").val("");    
        }else{ 
            let data = {"userType"  : "1","userAccountID" : condition[0]["employeeID"]};
            $.ajax({
                url:"login/set_session",
                method:"POST",
                data,
                dataType:"json",
                success:function(data){
                    // ! NOTE: Assume that the base name of the system is erpsys
                    let url = data.replaceAll("index.php/", "").replaceAll("\\", "");
                    window.location.replace(url);
                }
            });
                
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