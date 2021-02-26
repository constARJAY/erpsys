$(document).ready(function () {
    $('#add_floor_modal').on('shown.bs.modal', function(){
        $("#add_floorNum").focus(); 
    });

    $('#edit_floor_modal').on('shown.bs.modal', function(){
        $("#edit_floorNum").focus(); 
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

            $("#"+action+"_floor_modal").modal("hide");
            $("#confirmation-"+action+"_floor_modal").modal("show");
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

            $("#"+action+"_floor_modal").modal("hide");
            $("#confirmation-"+action+"_floor_modal").modal("show");
        }
    });
    // ---- DATATABLES ----
    floorTable();
    function floorTable() {
        if ($.fn.DataTable.isDataTable('#floorTable')){
            $('#floorTable').DataTable().destroy();
        }
        
        var table = $("#floorTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
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
                url:         "floor/getFloor",
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
                todo+"_floorNum",
                todo+"_floorDesc",
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("#"+item).val("");
                $("#"+item+'-error').remove();

                (item == todo+"_floorNum") && $("#"+item).parent().removeClass("no-error").removeClass("has-error");

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
        $("#add_floor_modal").modal("hide");
        $("#edit_floor_modal").modal("hide");
        $("#confirmation-add_floor_modal").modal("hide");
        $("#confirmation-edit_floor_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----


    // ----- GET USER FLOOR DATA -----
    function getFloorData(todo) {
        const floornum  = $("#"+todo+"_floorNum").val();
        const floordesc = $("#"+todo+"_floorDesc").val();
        const status    = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            floornum, floordesc , status
        };
        return data;
    }
    // ----- END GET USER FLOOR DATA -----
    $(document).on("click", "#notif", function() {
        
    })
    // ----- SAVE/UPDATE USER FLOOR -----
    function saveFloorData(data) {
        
        $.ajax({
            url:    "floor/saveFloorData",
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
                    floorTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getFloorData("add");
        saveFloorData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_floor_modal").modal("hide");
        $("#add_floor_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const floorID   = $(this).attr("floorid");
        const floorCode = $(this).attr("floorCode");
        
        const data = getFloorData("edit");
        data.floorid   = floorID;
        data.floorcode = floorCode;
        saveFloorData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_floor_modal").modal("hide");
        $("#edit_floor_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const floorID   = $(this).attr("floorID");
        const floorCode = $(this).attr("floorCode");

        $("#btn_save_confirmation_edit").attr("floorID", floorID);
        $("#btn_save_confirmation_edit").attr("floorCode", floorCode);
    }) 
    // ----- END SAVE/UPDATE USER FLOOR -----

    // ----- EDIT USER FLOOR -----
    $(document).on("click", ".btn_edit_user", function() {
        const floorID    = $(this).attr("floorid");
        const floorCode  = $(this).attr("floorcode");
        const floorNum   = $(this).attr("floornum");
        const floorDesc  = $(this).attr("floordesc");
        const status     = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("floorID", floorID);
        $("#update").attr("floorNum", floorNum);
        $("#update").attr("floorDesc", floorDesc);
        $("#update").attr("floorCode", floorCode);

        $("#edit_floorNum").attr('floorid',floorID);
        $("#edit_floorNum").val(floorNum);
        $("#edit_floorDesc").val(floorDesc);
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "floor/checkStatus",
            method: "POST",
            data: {floorID:floorID},
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

        $("#edit_floor_modal").modal("show");
    })
    // ----- END EDIT USER FLOOR -----

});