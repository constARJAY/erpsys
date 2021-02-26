$(document).ready(function () {

    // ------------- DATE PICKER ----------------
    $('#add_birthday').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, (data) => {
        const date = moment(data).format("MMMM DD, YYYY");
        $('#add_birthday').val(date);
    });
    $('#add_hireddate').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, (data) => {
        const date = moment(data).format("MMMM DD, YYYY");
        $('#add_hireddate').val(date);
    });
    $('#edit_birthday').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, (data) => {
        const date = moment(data).format("MMMM DD, YYYY");
        $('#edit_birthday').val(date);
    });
    $('#edit_hireddate').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, (data) => {
        const date = moment(data).format("MMMM DD, YYYY");
        $('#edit_hireddate').val(date);
    });
    // ------------- END DATE PICKER ----------------

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
                { targets: 7, width: 120 },
                { targets: 8, width: 120 },
                { targets: 9, width: 50 },
                { targets: 10, width: 50 },
            ],
            ajax: {
                url:         "user_account/getUserAccount",
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


    // ---- TOGGLE PASSWORD ----
    $(document).on("click", ".field-icon", function(e) {
        e.preventDefault();
        const todo = $(this).attr("todo");
        const type = $("#"+todo+"_password").attr("type");
        const changeType = type == "password" ? "text" : "password";
        const changeIcon = type == "password" ? "fa fa-fw fa-eye-slash field-icon" : "fa fa-fw fa-eye field-icon";
        $("#"+todo+"_password").attr("type", changeType);
        $("#"+todo+"-eye").attr("class", changeIcon);
    })
    // ---- END TOGGLE PASSWORD ----


    // ----- RESET FORMS -----
    function resetForms() {
        const todos = ["add", "edit"];
        for(var i=0; i<todos.length; i++) {
            const todo = todos[i];
            let arrayElem = [
                todo+"_firstname", 
                todo+"_lastname", 
                todo+"_department",
                todo+"_designation",
                todo+"_unitno",
                todo+"_building", 
                todo+"_street", 
                todo+"_subdivision", 
                todo+"_barangay", 
                todo+"_city", 
                todo+"_province", 
                todo+"_country", 
                todo+"_zipcode", 
                todo+"_email",
                todo+"_password", 
                todo+"_username", 
                todo+"_mobileno", 
                todo+"_birthday",
                // todo+"_role", 
                todo+"_hireddate"
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid").removeClass("has-error").removeClass("no-error").removeClass("validated");
                $("#"+item).val("");

                item == todo+"_department" && $("#"+item).val("").trigger("change");
                item == todo+"_designation" && $("#"+item).val("").trigger("change");
                // item == todo+"_role" && $("#"+item).val("").trigger("change");
                $("#"+todo+"_designation").val("");

                $("#invalid-"+item).html("");
            })
        }
        $(".btn-group.bootstrap-select").removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        $("#edit_department").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        $("#edit_designation").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        // $("#edit_role").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        $("#add_department").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        $("#add_designation").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
        // $("#add_role").parent().removeClass("is-invalid").removeClass("is-valid").removeClass("has-error").removeClass("no-error");
    }
    // ----- END RESET FORMS -----


    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#add_userAccount_modal").modal("hide");
        $("#edit_userAccount_modal").modal("hide");
        $("#confirmation-add_userAccount_modal").modal("hide");
        $("#confirmation-edit_userAccount_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----


    // ----- CHECK INPUTS -----
    function checkInputs(todo) {
        let arrayElem = [
            "#"+todo+"_firstname", 
            "#"+todo+"_lastname", 
            "#"+todo+"_department",
            "#"+todo+"_designation",
            "#"+todo+"_unitno",
            "#"+todo+"_building", 
            "#"+todo+"_street", 
            "#"+todo+"_subdivision", 
            "#"+todo+"_barangay", 
            "#"+todo+"_city", 
            "#"+todo+"_province", 
            "#"+todo+"_country", 
            "#"+todo+"_zipcode", 
            "#"+todo+"_email",
            "#"+todo+"_password", 
            "#"+todo+"_username", 
            "#"+todo+"_mobileno", 
            "#"+todo+"_birthday",
            // "#"+todo+"_role", 
            "#"+todo+"_hireddate"
        ];
        let countErrors = 0;
        let focusElem   = [];

        arrayElem.map(item => {
            rjValidateInputs(item);
        })

        if ($("#"+todo+"_userAccount_modal").find(".is-invalid").length > 0) {
            $("#"+todo+"_userAccount_modal").find(".is-invalid")[0].focus();
            return false;
        } else {
            return true;
        }
        
    }
    // ----- END CHECK INPUTS -----


    // ----- GET USER ACCOUNT DATA -----
    function getUserAccountData(todo) {
        const firstname   = $("#"+todo+"_firstname").val().trim();
        const lastname    = $("#"+todo+"_lastname").val().trim();
        const department  = $("#"+todo+"_department").val();
        const designation = $("#"+todo+"_designation").val();
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
        // const role        = $("#"+todo+"_role").val();
        const hireddate   = moment($("#"+todo+"_hireddate").val()).format("YYYY/MM/DD");
        const status      = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            firstname, lastname, department, designation, unitno, building, street, subdivision, barangay, city, province, country, zipcode, email, password, username, mobileno, birthday, hireddate, status
        };
        return data;
    }
    // ----- END GET USER ACCOUNT DATA -----


    // ----- SAVE/UPDATE USER ACCOUNT -----
    function saveUserAccountData(data) {
        $.ajax({
            url:    "user_account/saveUserAccountData",
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
                    resetForms();
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

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getUserAccountData("add");
        saveUserAccountData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_userAccount_modal").modal("hide");
        $("#add_userAccount_modal").modal("show");
    })

    $(document).on("click", "#save", function() {
        const myInputs = checkInputs("add");
        if (myInputs) {
            $("#add_userAccount_modal").modal("hide");
            $("#confirmation-add_userAccount_modal").modal("show");
        }
    }) 

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
        const myInputs    = checkInputs("edit");
        const accountID   = $(this).attr("accountid");
        const accountCode = $(this).attr("accountcode");
        if (myInputs) {
            $("#edit_userAccount_modal").modal("hide");
            $("#btn_save_confirmation_edit").attr("accountid", accountID);
            $("#btn_save_confirmation_edit").attr("accountcode", accountCode);
            $("#confirmation-edit_userAccount_modal").modal("show");
        }
    }) 
    // ----- END SAVE/UPDATE USER ACCOUNT -----


    // ----- SELECT USER DEPARTMENT -----
    function getUserDesignation(departmentID, todo, designationID) {
        const data = {departmentID};
        $.ajax({
            url:    "user_account/getUserDesignation",
            method: "POST",
            data,
            dataType: 'json',
            success: function(data) {
                let html = `<option value="" disabled selected>Select Designation</option>`;
                data.map(item => {
                    let selected = item.designationID == designationID ? "selected" : "";
                    html += `<option value="${item.designationID}" ${selected}>${item.designationName}</option>`;
                })
                $("#"+todo+"_designation").html(html);
            }
        }).done(function() {
            $("select").selectpicker('refresh');
        })
    }

    $(document).on("change", "#add_department", function() {
        const departmentID = $(this).val();
        const todo         = $(this).attr("todo");
        getUserDesignation(departmentID, todo, "");
    })

    $(document).on("change", "#edit_department", function() {
        const departmentID  = $(this).val();
        const todo          = $(this).attr("todo");
        const designationid = $(this).attr("designationid");
        getUserDesignation(departmentID, todo, designationid);
    })
    // ----- END SELECT USER DEPARTMENT -----


    // ----- EDIT USER ACCOUNT -----
    $(document).on("click", ".btn_edit_user", function() {
        const accountid = $(this).attr("accountid");
        const accountcode = $(this).attr("accountcode");
        $("#update").attr("accountid", accountid);
        $("#update").attr("accountcode", accountcode);

        const firstname     = $(this).attr("firstname");
        const lastname      = $(this).attr("lastname");
        // const roleid        = $(this).attr("roleid");
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

        getUserDesignation(departmentid, "edit", designationid);

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
        // $("#edit_role").val(roleid).trigger("change");
        $("#edit_mobileno").val(contactnumber);
        $("#edit_birthday").val(birthday);
        $("#edit_hireddate").val(hireddate);
        $("#edit_status").prop("checked", status);

        $("#edit_userAccount_modal").modal("show");
    })
    // ----- END EDIT USER ACCOUNT -----

});