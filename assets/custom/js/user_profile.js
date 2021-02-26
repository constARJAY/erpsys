$(document).ready(function () {
    var birthday    =   $("#hiddenBirthday").val();
    // alert(birthday);
    birthdayFunction(birthday);

});

// Showing Modal
$(document).on("click","#edit_basic_details_btn", function(){
    $("#personalInfoForm").find("input").removeClass("validated is-invalid");
    $("#personalInfoForm").find("input").removeClass("validated is-valid");
    $("#edit_basic_details").modal("show");
});

$(document).on("click","#edit_account_details_btn", function(){
    $("#accountInformationForm").find("input").removeClass("validated is-invalid");
    $("#accountInformationForm").find("input").removeClass("validated is-valid");
    $("#edit_account_details").modal("show");
});

$(document).on("click", "#profile_picture_btn", function(){
    $("#edit_profile_picture").modal("show");
})



// START FORMS BUTTON
    //UPDATING PERSONAL INFO
        $(document).on("click", "#personalInfo_btn", function(){
            formValidation("personalInfoForm");
            var theCondition = $("#personalInfoForm").find(".is-invalid").first().focus();

            if(theCondition.length > 0){
                $("#personalInfoForm").find(".is-invalid").first().focus();
            }else{
                var modal_confirmation_footer = `   <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_personal_edit"> YES</button>
                                                    <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_personal_edit"> NO</button>
                                                `;
                $("#edit_basic_details").modal("hide");
                $(".modal_confirmation_footer").html(modal_confirmation_footer);
                $("#confirmation-edit").modal("show");
            }

        });

        $(document).on("click","#btn_save_confirmation_personal_edit", function(){
            var editFirstname       =   $("#editFirstname").val();
            var editLastname        =   $("#editLastname").val();
            var editBirthdate       =   $("#editBirthdate").val();
            var editContactNumber   =   $("#editContactNumber").val()
            var editUnitNumber      =   $("#editUnitNumber").val();
            var editBuilding        =   $("#editBuilding").val();
            var editStreet          =   $("#editStreet").val();
            var editSubdivision     =   $("#editSubdivision").val();
            var editBarangay        =   $("#editBarangay").val();
            var editCity            =   $("#editCity").val();
            var editState           =   $("#editState").val();
            var editZipcode         =   $("#editZipcode").val();
            var editCountry         =   $("#editCountry").val(); 
            var condition           =   "personal";
            var data                =   {
                                            "condition"           :     condition,
                                            "editFirstname"       :     editFirstname,
                                            "editLastname"        :     editLastname,
                                            "editBirthdate"       :     editBirthdate,
                                            "editContactNumber"   :     editContactNumber,
                                            "editUnitNumber"      :     editUnitNumber,
                                            "editBuilding"        :     editBuilding,
                                            "editStreet"          :     editStreet,
                                            "editSubdivision"     :     editSubdivision,
                                            "editBarangay"        :     editBarangay,
                                            "editCity"            :     editCity,
                                            "editState"           :     editState,
                                            "editZipcode"         :     editZipcode,
                                            "editCountry"         :     editCountry
                                        };
            $.ajax({
                url:"user_profile/update_account",
                method:"POST",
                data,
                dataType:"json",
                beforeSend:function(){$("#loader").show()},
                success:function(data){
                    console.log(data);
                    if(data != "FALSE"){
                        $("#loader").hide();
                        $(".modal_confirmation_footer").html("");
                        $("#confirmation-edit").modal("hide");
                        showNotification("success","Update Successfully");
                        $(".accountFullname").text(data[0]["accountFirstname"]+" "+data[0]["accountLastname"]);
                        $(".accountBirthday").text(data[0]["accountBirthday"]);
                        $(".accountEmail").text(data[0]["accountEmail"]);
                        $(".accountContactNumber").text(data[0]["dadasdas"]);
                        var accountAddress = data[0]["accountUnitNumber"]+", "+data[0]["accountBuilding"]+", "+data[0]["accountStreetName"]+", "+data[0]["accountSubdivision"]+", "+data[0]["accountBarangay"]+", "+data[0]["accountCity"]+", "+data[0]["accountProvince"]+", "+data[0]["accountCountry"]+", "+data[0]["accountZipCode"];
                        $(".accountAddress").text(accountAddress);
                    }else{
                        showNotification("danger","System Eror: Please call your IT-Administrator immeadietly");
                    }
                }
            });
        });

    // UPDATING ACCOUNT INFO
        $(document).on("click","#accountInfo_btn", function(){
            // CHARLES
                            formValidation("accountInformationForm");
                            var theCondition = $("#accountInformationForm").find(".is-invalid").first().focus();

                            if(theCondition.length > 0){
                                $("#accountInformationForm").find(".is-invalid").first().focus();
                            }else{
                                var modal_confirmation_footer = `   <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_account_edit"> YES</button>
                                                                    <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_account_edit"> NO</button>
                                                                `;
                                $("#edit_account_details").modal("hide");
                                $(".modal_confirmation_footer").html(modal_confirmation_footer);
                                $("#confirmation-edit").modal("show");
                            }

        });

        $(document).on("click","#btn_save_confirmation_account_edit", function(){
            var username    =   $("#editUsername").val();
            var password    =   $("#editPassword").val();
            var condition   =   "account";
            var data        =   {condition,username,password};

            $.ajax({
                url:"user_profile/update_account",
                method:"POST",
                data,
                dataType:"json",
                beforeSend:function(){$("#loader").show()},
                success:function(data){
                    console.log(data);
                    if(data != "FALSE"){
                        $("#loader").hide();
                        $(".modal_confirmation_footer").html("");
                        $("#confirmation-edit").modal("hide");
                        showNotification("success","Update Successfully");
                        $(".accountUsername").text(data[0]["accountUsername"]);
                    }else{
                        showNotification("danger","System Eror: Please call your IT-Administrator immeadietly");
                    }
                    
                }
            });
        });

    // UPDATING PROFILE PICTURE
        $(document).on("click", "#profilePic_btn", function(){
            var modal_confirmation_footer = `   <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_picture_edit"> YES</button>
                                                <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_picture_edit"> NO</button>
                                            `;
            $("#edit_profile_picture").modal("hide");
            $(".modal_confirmation_footer").html(modal_confirmation_footer);
            $("#confirmation-edit").modal("show");
        });
        
        $(document).on("click","#btn_save_confirmation_picture_edit",function(){
            var userCode    =   $("#editUserCode").val();
            var image       =   document.getElementById("editProfilePic").files[0];
            var imageName   =   image.name;
            var imageSize   =   image.size;
            var extension   =   imageName.split(".").pop().toLowerCase();
            var allowedImage    =   ["jpg", "png", "jpeg"];
            var newImageName    =   userCode+"."+extension;
                if(allowedImage.includes(extension)){
                    if(imageSize < 1000000){
                        var formData = new FormData();
                        formData.append("file", image);
                        formData.append("condition", "picture")
                        formData.append("newImageName", newImageName);
                        $.ajax({
                            url:"user_profile/update_account",
                            method:"POST",
                            data:        formData,
                            processData: false,
                            contentType: false,
                            cache:       false,
                            async:       false,
                            dataType:   'json',
                            beforeSend(){
                                $("#loader").show();
                            },
                            success:function(data){
                                setTimeout(function(){ $("#loader").hide(); }, 1050);
                                
                                if(data != "FALSE"){
                                    $("#confirmation-edit").modal("hide");
                                    var imageHeader = document.getElementById('profilePictureHeader');
                                    imageHeader.src = "pages/admin-assets/images/profile-images/"+data[0]["accountProfilePic"];

                                    var imagePage = document.getElementById('profilePicturePage');
                                    imagePage.src = "pages/admin-assets/images/profile-images/"+data[0]["accountProfilePic"];



                                    showNotification("success", "Update Profile Picture Successfully");
                                }else{
                                    showNotification("danger", "System Eror: Please call your IT-Administrator immeadietly");
                                }
                            }
                        });
                    }else{
                        $("#edit_profile_picture").modal("hide");
                        $(".modal_confirmation_footer").html("");
                        $("#confirmation-edit").modal("hide");
                        showNotification("danger","File size must not greater than 10MB")
                    }
                }else{
                    $("#edit_profile_picture").modal("hide");
                    $(".modal_confirmation_footer").html("");
                    $("#confirmation-edit").modal("hide");
                    showNotification("danger","Invalid image file")
                }                          
        }); 

// END FORMS BUTTON




// btn_close_confirmation_personal_edit
// btn_close_confirmation_account_edit
// btn_close_confirmation_picture_edit

// NO CONFIRMATION BUTTONS
        $(document).on("click", ".btn_close_confirmation_personal_edit", function(){
            $("#personalInfoForm").find("input").removeClass("validated is-valid");
            $("#confirmation-edit").modal("hide");
            $("#edit_basic_details").modal("show");
        });
        $(document).on("click", ".btn_close_confirmation_account_edit", function(){
            $("#accountInformationForm").find("input").removeClass("validated is-valid");
            $("#confirmation-edit").modal("hide");
            $("#edit_account_details").modal("show");

        });
        $(document).on("click", ".btn_close_confirmation_picture_edit", function(){
            $("#confirmation-edit").modal("hide");
            $("#edit_profile_picture").modal("show");
        });














// EXTRA FUNCTIONS
$(document).on("click", ".password_eye", function(){
    if($(this).hasClass("zmdi-eye") ){
        $(this).removeClass("zmdi-eye").addClass("zmdi-eye-off");
        $("#editPassword").attr('type', 'text'); 
    }else{
        $(this).addClass("zmdi-eye").removeClass("zmdi-eye-off");
        $("#editPassword").attr('type', 'password'); 
    }
});

$(document).on("change", "#editProfilePic", function(e) {
    var image = document.getElementById('editProfilePicOutput');
    image.src = URL.createObjectURL(e.target.files[0]);
})


function birthdayFunction(birthday){
    $('.datePicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        startDate: birthday,
        locale: {
            format: 'MMMM D, Y',
            // "format": "MM/DD/YYYY",
          }
    });
}
