$(document).ready(function () {
    $(".select2").select2({
        theme: "bootstrap"
    });
    $('#edit_userDesignation_modal').on('shown.bs.modal', function(){
        $("#edit_department").focus(); 
    });

    $(document).on("click", ".bootstrap-select", function() {
        var select = $(this).prop('className').split(' ')[3];
        
        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');

       $(".designationname").attr('departmentid',$("#"+select).val());
    })
    
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

            $("#"+action+"_userDesignation_modal").modal("hide");
            $("#confirmation-"+action+"_userDesignation_modal").modal("show");
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

            $("#"+action+"_userDesignation_modal").modal("hide");
            $("#confirmation-"+action+"_userDesignation_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    userDesignationTable();
    function userDesignationTable() {
        if ($.fn.DataTable.isDataTable('#userDesignationTable')){
            $('#userDesignationTable').DataTable().destroy();
        }
        
        var table = $("#userDesignationTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '35%' },
                { targets: 2, width: '35%' },
                { targets: 3, width: '10%' },
                { targets: 4, width: '10%' },
            ],
            ajax: {
                url:         "user_designation/getUserDesignation",
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
                todo+"_department",
                todo+"_designation"
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

                // $("#"+item).val("").trigger("change");

                item == todo+"_department" && $("#"+item).val("").trigger("change");

                (item == todo+"_designation") && $("#"+item).parent().removeClass("no-error").removeClass("has-error");

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
        $("#add_userDesignation_modal").modal("hide");
        $("#edit_userDesignation_modal").modal("hide");
        $("#confirmation-add_userDesignation_modal").modal("hide");
        $("#confirmation-edit_userDesignation_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----


    // ----- GET USER DESIGNATION DATA -----
    function getUserDesignationData(todo) {
        const departmentid    = $("#"+todo+"_department").val();
        const designationname = $("#"+todo+"_designation").val();
        const status          = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            departmentid, designationname, status
        };
        return data;
    }
    // ----- END GET USER DESIGNATION DATA -----
    
    // ----- SAVE/UPDATE USER DESIGNATION -----
    function saveUserDesignationData(data) {
        
        $.ajax({
            url:    "user_designation/saveUserDesignationData",
            method: "POST",
            data,
            dataType: 'json',
            success: function(data) {
                let result = data.split("|");
                
                if (result[0] == "false") {
                    showNotification('danger',result[1]);
                } else {
                    showNotification('success',result[1]);
                    closeModal();
                    resetForms();
                    userDesignationTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getUserDesignationData("add");
        saveUserDesignationData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_userDesignation_modal").modal("hide");
        $("#add_userDesignation_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const departmentID    = $(this).attr("departmentid");
        const designationID   = $(this).attr("designationid");
        const designationCode = $(this).attr("designationCode");
        
        const data = getUserDesignationData("edit");
        data.departmentID    = departmentID;
        data.designationID   = designationID;
        data.designationCode = designationCode;

        saveUserDesignationData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_userDesignation_modal").modal("hide");
        $("#edit_userDesignation_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const departmentID   = $(this).attr("departmentID");
        const designationID   = $(this).attr("designationID");
        const designationCode = $(this).attr("designationCode");

        $("#btn_save_confirmation_edit").attr("departmentID", departmentID);
        $("#btn_save_confirmation_edit").attr("designationID", designationID);
        $("#btn_save_confirmation_edit").attr("designationCode", designationCode);
    }) 
    // ----- END SAVE/UPDATE USER DESIGNATION -----

    // ----- EDIT USER DESIGNATION -----
    $(document).on("click", ".btn_edit_user", function() {
        const designationID   = $(this).attr("designationid");
        const departmentID    = $(this).attr("departmentid");
        const designationName = $(this).attr("designationname");
        const designationCode = $(this).attr("designationcode");
        const status          = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("designationID", designationID);
        $("#update").attr("departmentID", departmentID);
        $("#update").attr("designationName", designationName);
        $("#update").attr("designationCode", designationCode);

        $("#edit_designation").val(designationName);
        $("#edit_department").val(departmentID).trigger("change");
        $("#edit_designation").attr('designationid',designationID);
        $("#edit_designation").attr('departmentid',departmentID);
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "user_designation/checkStatus",
            method: "POST",
            data: {designationID:designationID},
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

        $("#edit_userDesignation_modal").modal("show");
    })
    // ----- END EDIT USER DESIGNATION -----

});