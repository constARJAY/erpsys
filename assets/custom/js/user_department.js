$(document).ready(function () {
    $('#add_userDepartment_modal').on('shown.bs.modal', function(){
        $("#add_department").focus(); 
    });

    $('#edit_userDepartment_modal').on('shown.bs.modal', function(){
        $("#edit_department").focus(); 
    });
    
    $('#add_validation').validate({
        highlight: function (input) {
            $(input).parents('.input-group').addClass('has-danger');
            $(input).addClass('is-invalid');
        },
        unhighlight: function (input) {
            $(input).parents('.input-group').removeClass('has-danger');
            $(input).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function(form) {
            const action = $($(this)[0].submitButton).data('action');  

            $("#"+action+"_userDepartment_modal").modal("hide");
            $("#confirmation-"+action+"_userDepartment_modal").modal("show");
        }
    });

    $('#edit_validation').validate({
        highlight: function (input) {
            $(input).parents('.input-group').addClass('has-danger');
            $(input).addClass('is-invalid');
        },
        unhighlight: function (input) {
            $(input).parents('.input-group').removeClass('has-danger');
            $(input).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function(form) {
            const action = $($(this)[0].submitButton).data('action');  

            $("#"+action+"_userDepartment_modal").modal("hide");
            $("#confirmation-"+action+"_userDepartment_modal").modal("show");
        }
    });
    // ---- DATATABLES ----
    userDepartmentTable();
    function userDepartmentTable() {
        if ($.fn.DataTable.isDataTable('#userDepartmentTable')){
            $('#userDepartmentTable').DataTable().destroy();
        }
        
        var table = $("#userDepartmentTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '70%' },
                { targets: 2, width: '10%' },
                { targets: 3, width: '10%' },
            ],
            ajax: {
                url:         "user_department/getUserDepartment",
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

    // ----- RESET FORMS -----
    function resetForms() {
        const todos = ["add", "edit"];
        for(var i=0; i<todos.length; i++) {
            const todo = todos[i];
            let arrayElem = [
                todo+"_department"
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("#"+item).val("");
                $("#"+item+'-error').remove();

                (item == todo+"_department") && $("#"+item).parent().removeClass("no-error").removeClass("has-error");

                $("#invalid-"+item).html("");
            })
        }

        $("#edit_status").attr("disabled",false);
        $("#edit_slider_status").removeClass('disabled');
        $("#add_status").prop("checked", 1);
    }
    // ----- END RESET FORMS -----


    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#add_userDepartment_modal").modal("hide");
        $("#edit_userDepartment_modal").modal("hide");
        $("#confirmation-add_userDepartment_modal").modal("hide");
        $("#confirmation-edit_userDepartment_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET USER DEPARTMENT DATA -----
    function getUserDepartmentData(todo) {
        const departmentname  = $("#"+todo+"_department").val();
        // const departmentciode  = $("#"+todo+"_departmentcode").val();
        const status          = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            departmentname, status
        };
        return data;
    }
    // ----- END GET USER DEPARTMENT DATA -----
    $(document).on("click", "#notif", function() {
        
    })
    // ----- SAVE/UPDATE USER DEPARTMENT -----
    function saveUserDepartmentData(data) {
        
        $.ajax({
            url:    "user_department/saveUserDepartmentData",
            method: "POST",
            data,
            dataType: 'json',
            success: function(data) {
                let result = data.split("|");
                console.log(result[0]);
                if (result[0] == "false") {
                    showNotification('danger',result[1]);
                } else {
                    showNotification('success',result[1]);
                    closeModal();
                    resetForms();
                    userDepartmentTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getUserDepartmentData("add");
        saveUserDepartmentData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_userDepartment_modal").modal("hide");
        $("#add_userDepartment_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const departmentID   = $(this).attr("departmentid");
        const departmentCode = $(this).attr("departmentCode");
        
        const data = getUserDepartmentData("edit");
        data.departmentID   = departmentID;
        data.departmentCode = departmentCode;
        saveUserDepartmentData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_userDepartment_modal").modal("hide");
        $("#edit_userDepartment_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const departmentID   = $(this).attr("departmentID");
        const departmentCode = $(this).attr("departmentCode");

        $("#btn_save_confirmation_edit").attr("departmentID", departmentID);
        $("#btn_save_confirmation_edit").attr("departmentCode", departmentCode);
    }) 
    // ----- END SAVE/UPDATE USER DEPARTMENT -----

    // ----- EDIT USER DEPARTMENT -----
    $(document).on("click", ".btn_edit_user", function() {
        const departmentID   = $(this).attr("departmentid");
        const departmentName = $(this).attr("departmentname");
        const departmentCode = $(this).attr("departmentcode");
        const status         = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("departmentID", departmentID);
        $("#update").attr("departmentName", departmentName);
        $("#update").attr("departmentCode", departmentCode);

        $("#edit_department").val(departmentName);
        $("#edit_department").attr('departmentid',departmentID);
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "user_department/checkStatus",
            method: "POST",
            data: {departmentID:departmentID},
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data==1){
                    $("#edit_status").attr("disabled",true);
                    $("#edit_slider_status").addClass('disabled');
                }
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });

        $("#edit_userDepartment_modal").modal("show");
    })
    // ----- END EDIT USER DEPARTMENT -----

});