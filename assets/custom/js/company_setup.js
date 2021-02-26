$(document).ready(function(){
    datePicker();
})
$(".companyForm input").prop("readonly", true);

$(document).on("click", ".companySubUpdateBtn", function(){
    $("#companySubUpdateBtn").addClass("companyUpdateBtn").removeClass("companySubUpdateBtn");
    $(".companyForm input").prop("readonly", false);
    var closeBtn = `<button type="button" class="btn btn-light mt-2 mr-2 font-weight-bold" id="closeBtn">X</button>`;
    $(".closeBtn").html(closeBtn);
})

$(document).on("click", ".companyUpdateBtn", function(){
    console.log("asdasd");
    var theForm = $("#companyForm").find("input:empty");
        theForm.each(function () {
            rjValidateInputs("#"+this.id);
            if ( (this.value== "" || $("#" + this.id).hasClass("is-invalid")) && this.id != "unitNo" && this.id != "subName") {
                console.log(this.id);
                $("#" + this.id).addClass("is-invalid").removeClass("is-valid");
                $("#"+this.id).next().text("This field is Required");
            } else {
                $("#" + this.id).addClass("is-valid").removeClass("is-invalid");
            }
        });
    var theCondition = $("#companyForm").find(".is-invalid").first().focus();
            if(theCondition.length > 0){
                $("#companyForm").find(".is-invalid").first().focus();
            }else{
                    $("#confirmationUpdate").modal("show");
            }
})

$(document).on("click", "#updateCompanyBtn", function(){
   
    var companyName       =   $("#companyName").val();
    var contactPerson     =   $("#contactPerson").val();
    var unitNo            =   $("#unitNo").val();
    var houseNo           =   $("#houseNo").val();
    var streetName        =   $("#streetName").val();
    var subName           =   $("#subName").val();
    var barangay          =   $("#barangay").val();
    var city              =   $("#city").val();
    var state             =   $("#state").val();
    var country           =   $("#country").val();
    var postalCode        =   $("#postalCode").val();
    var email             =   $("#email").val();
    var telephoneNumber   =   $("#telephoneNumber").val();
    var mobileNumber      =   $("#mobileNumber").val();
    var website           =   $("#website").val();
    var tiNumber          =   $("#tiNumber").val();



    $.ajax({
        url:"company_setup/update_company",
        method:"POST",
        data:{
                companyName,
                contactPerson,
                unitNo,
                houseNo,
                streetName,
                subName,
                barangay,
                city,
                state,
                country,
                postalCode,
                email,
                telephoneNumber,
                mobileNumber,
                website,
                tiNumber    
            },
        dataType:"JSON",
        beforeSend:function(){
            $("#companyForm").find("input").removeClass("validated is-valid");
        },
        success:function(data){
            $("#companyForm").find("input").removeClass("validated is-valid");
            // console.log(data); 
            var condition   =   data.split("|");
            if(condition.shift() == "TRUE"){
                $("#companySubUpdateBtn").removeClass("companyUpdateBtn").addClass("companySubUpdateBtn");
                $(".companyForm input").prop("readonly", true);
                $(".closeBtn").html("");
                $("#companyName").val(companyName);
                $("#contactPerson").val(contactPerson);
                $("#unitNo").val(unitNo);
                $("#houseNo").val(houseNo);
                $("#streetName").val(streetName);
                $("#subName").val(subName);
                $("#barangay").val(barangay);
                $("#city").val(city);
                $("#state").val(state);
                $("#country").val(country);
                $("#postalCode").val(postalCode);
                $("#email").val(email);
                $("#telephoneNumber").val(telephoneNumber);
                $("#mobileNumber").val(mobileNumber);
                $("#website").val(website);
                $("#tiNumber").val(tiNumber);

                $("#confirmationUpdate").modal("hide");
                showNotification("success", condition.pop());
            }else{
                showNotification("danger", condition.pop());
            }
        }
    });
    
    // $("#confirmationUpdate").modal("hide");
    // $("#companySubUpdateBtn").addClass("companySubUpdateBtn").removeClass("companyUpdateBtn");
    // $(".companyForm input").prop("readonly", true);
})

$(document).on("click", "#closeBtn", function(){
    $.ajax({
        url:"company_setup/get_company_profile",
        method:"POST",
        dataType:"JSON",
        beforeSend:function(){
            $("#companyForm").find("input").removeClass("validated is-valid");
        },
        success:function(data){
            console.log(data); 
                $("#companyForm").find("input").removeClass("validated is-valid");
                $("#companySubUpdateBtn").removeClass("companyUpdateBtn").addClass("companySubUpdateBtn");
                $(".companyForm input").prop("readonly", true);
                $(".closeBtn").html("");


                $("#companyName").val(data[0]["profileName"]);
                $("#contactPerson").val(data[0]["profileContactPerson"]);
                $("#unitNo").val(data[0]["profileUnitNumber"]);
                $("#houseNo").val(data[0]["profileBuilding"]);
                $("#streetName").val(data[0]["profileStreet"]);
                $("#subName").val(data[0]["profileSubdivision"]);
                $("#barangay").val(data[0]["profileBarangay"]);
                $("#city").val(data[0]["profileMunicipality"]);
                $("#state").val(data[0]["profileProvince"]);
                $("#country").val(data[0]["accountCountry"]);
                $("#postalCode").val(data[0]["profileZipcode"]);
                $("#email").val(data[0]["profileEmail"]);
                $("#telephoneNumber").val(data[0]["profileTelNumber"]);
                $("#mobileNumber").val(data[0]["profileContactNumber"]);
                $("#website").val(data[0]["profileWebsite"]);
                $("#tiNumber").val(data[0]["profileTin"]);
        }
    });
    
    
});


// DATE SCRIPT
function datePicker(){
    $('#checkIn').daterangepicker({
        singleDatePicker: true,
        autoApply: true,
        minDate: new Date(),
        locale: {
          format: 'MMMM D, YYYY'
        }
      },function(start){
          $('#checkOut').daterangepicker({
              singleDatePicker: true,
              autoApply: true,
              minDate: start.add(1,'days'),
              locale: {
                format: 'MMMM D, YYYY'
              }
            });
      });
}