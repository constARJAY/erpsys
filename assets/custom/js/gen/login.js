$(document).on("click", "#login-btn", function(e){
    e.preventDefault();
    $(".confirmation").show();
    let username = $("#username").val();
    let password = $("#password").val();
    let condition   = getTableData("gen_user_account_tbl","", "username = BINARY '"+username+"' AND password = BINARY '"+password+"' AND status != 0 ");
    
    if(condition.length < 1){
       
            let confirmation = '<div class="alert alert-danger text-center d-flex justify-content-center" role="alert"> <span>Incorrect username or password.</span></div>';
    		$(".confirmation").html(confirmation);
            
    }else{
        
        $.ajax({
            url:"login/set_session",
            method:"POST",
            data: condition,
            dataType:"json",
            success:function(data){
                if(data == true) window.location.replace('operations');
                console.log(data);
            }
        });
    }
    setTimeout(function(){  $("form").submit(); }, 550);
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

$(document).on("click", "#sign-out", function(e){
    let userType    =   $(this).data("usertype");
        $.ajax({
            url:"login/sign_out",
            method:"POST",
            data:{userType},
            dataType:"json",
            success:function(data){
                if(data == true) window.location.replace('login');
            }
        });
});

$(document).on("click","#username, #password", function(){
    $(".confirmation").hide(950);$(".confirmation").html("");
    
    
    
});