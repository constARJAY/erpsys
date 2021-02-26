$(document).ready(function() {

    // ---- DATATABLES ----
    userAccountTable();
    function userAccountTable() {
        if ($.fn.DataTable.isDataTable('#userAccountTable')){
            $('#userAccountTable').DataTable().destroy();
        }
        
        var table = $("#userAccountTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 150 },
                { targets: 2, width: 150 },
                { targets: 3, width: 200 },
                { targets: 4, width: 120 },
                { targets: 5, width: 100 },
                { targets: 6, width: 100 },
                { targets: 7, width: 50 },
                { targets: 8, width: 50 },
            ],
            ajax: {
                url:         "guests/getUserAccount",
                cache:       false,
                method:      "POST",
                contentType: "application/json; charset=utf-8",
                dataType:    "json",
                dataSrc: function (response) {
                    return response;
                },
            },
        });
    }
    // ---- END DATATABLES ----


     // ----- GET USER ACCOUNT DATA -----
    function getUserAccountData(todo) {
        const firstname   = $("#"+todo+"_firstname").val().trim();
        const lastname    = $("#"+todo+"_lastname").val().trim();
        const unitno      = $("#"+todo+"_unitno").val().trim();
        const building    = $("#"+todo+"_building").val().trim();
        const street      = $("#"+todo+"_street").val().trim();
        const subdivision = $("#"+todo+"_subdivision").val().trim();
        const barangay    = $("#"+todo+"_barangay").val().trim();
        const city        = $("#"+todo+"_city").val().trim();
        const province    = $("#"+todo+"_province").val().trim();
        const country     = $("#"+todo+"_country").val().trim();
        const zipcode     = $("#"+todo+"_zipcode").val().trim();
        const email       = $("#"+todo+"_email").val().trim();
        const password    = $("#"+todo+"_password").val().trim();
        const username    = $("#"+todo+"_username").val().trim();
        const mobileno    = $("#"+todo+"_mobileno").val().trim();
        const birthday    = moment($("#"+todo+"_birthday").val()).format("YYYY/MM/DD");
        const status      = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            firstname, lastname, unitno, building, street, subdivision, barangay, city, province, country, zipcode, email, password, username, mobileno, birthday, status
        };
        return data;
    }
    // ----- END GET USER ACCOUNT DATA -----


    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#edit_userAccount_modal").modal("hide");
        $("#confirmation-edit_userAccount_modal").modal("hide");
    }
    // ---- END CLOSE MODAL -----


    // ----- SAVE/UPDATE USER ACCOUNT -----
    function saveUserAccountData(data) {
        $.ajax({
            url:    "guests/saveUserAccountData",
            method: "POST",
            data,
            dataType: 'json',
            beforeSend: function() {
                $("#loader").show();
            },
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "false") {
                    showNotification('danger',result[1]);
                } else {
                    closeModal();
                    userAccountTable();
                    showNotification('success',result[1]);
                }
            }
        }).done(function() {
            setTimeout(() => {
                $("#loader").hide();
            }, 500);
        })
    }
    // ----- END SAVE/UPDATE USER ACCOUNT -----


    // ----- EDIT USER ACCOUNT -----
    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const accountID   = $(this).attr("accountid");
        const accountCode = $(this).attr("accountcode");

        const data = getUserAccountData("edit");
        data.accountid   = accountID;
        data.accountcode = accountCode;
        saveUserAccountData(data);
    })
    
    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_userAccount_modal").modal("hide");
        $("#edit_userAccount_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const accountID   = $(this).attr("accountid");
        const accountCode = $(this).attr("accountcode");
        $("#edit_userAccount_modal").modal("hide");
        $("#btn_save_confirmation_edit").attr("accountid", accountID);
        $("#btn_save_confirmation_edit").attr("accountcode", accountCode);
        $("#confirmation-edit_userAccount_modal").modal("show");
    }) 

    $(document).on("click", ".btn_edit_user", function() {
        const accountid = $(this).attr("accountid");
        const accountcode = $(this).attr("accountcode");
        $("#update").attr("accountid", accountid);
        $("#update").attr("accountcode", accountcode);

        const firstname     = $(this).attr("firstname");
        const lastname      = $(this).attr("lastname");
        const departmentid  = $(this).attr("departmentid");
        const designationid = $(this).attr("designationid");
        const username      = $(this).attr("username");
        const email         = $(this).attr("email");
        const password      = $(this).attr("password");
        const contactnumber = $(this).attr("contactnumber");
        const unitnumber    = $(this).attr("unitnumber");
        const building      = $(this).attr("building");
        const streetname    = $(this).attr("streetname");
        const subdivision   = $(this).attr("subdivision");
        const barangay      = $(this).attr("barangay");
        const city          = $(this).attr("city");
        const province      = $(this).attr("province");
        const country       = $(this).attr("country");
        const zipcode       = $(this).attr("zipcode");
        const birthday      = moment($(this).attr("birthday")).format("MMMM DD, YYYY");
        const hireddate     = moment($(this).attr("hireddate")).format("MMMM DD, YYYY");
        const status        = $(this).attr("status") == 1 ? true : false;


        $("#edit_firstname").val(firstname);
        $("#edit_lastname").val(lastname);
        $("#edit_department").attr("designationid", designationid);
        $("#edit_department").val(departmentid).trigger("change");
        $("#edit_designation").val(designationid).trigger("change");
        $("#edit_unitno").val(unitnumber);
        $("#edit_building").val(building);
        $("#edit_street").val(streetname);
        $("#edit_subdivision").val(subdivision);
        $("#edit_barangay").val(barangay);
        $("#edit_city").val(city);
        $("#edit_province").val(province);
        $("#edit_country").val(country);
        $("#edit_zipcode").val(zipcode);
        $("#edit_email").val(email);
        $("#edit_password").val(password);
        $("#edit_username").val(username);
        $("#edit_mobileno").val(contactnumber);
        $("#edit_birthday").val(birthday);
        $("#edit_hireddate").val(hireddate);
        $("#edit_status").prop("checked", status);

        $("#edit_userAccount_modal").modal("show");
    })
    // ----- END EDIT USER ACCOUNT -----

})