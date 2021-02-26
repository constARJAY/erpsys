$(document).ready(function () {
    $('#edit_room_modal').on('shown.bs.modal', function(){
        $("#edit_roomtype").focus(); 
    });

    $('#add_room_modal').on('hidden.bs.modal', function () {
        $('.bootstrap-select').removeClass('is-invalid');
    });

    $(document).on("click", ".bootstrap-select", function() {
        var select = $(this).prop('className').split(' ')[3];
        
        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');

       $("#update").attr('roomtype',$("#"+select).val());
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

            $("#"+action+"_room_modal").modal("hide");
            $("#confirmation-"+action+"_room_modal").modal("show");
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

            $("#"+action+"_room_modal").modal("hide");
            $("#confirmation-"+action+"_room_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    roomTable();
    function roomTable() {
        if ($.fn.DataTable.isDataTable('#roomTable')){
            $('#roomTable').DataTable().destroy();
        }
        
        var table = $("#roomTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '30%' },
                { targets: 2, width: '30%' },
                { targets: 3, width: '10%' },
                { targets: 4, width: '10%' },
            ],
            ajax: {
                url:         "room/getRoom",
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
                todo+"_roomtype",
                todo+"_floor"
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

                $("select").selectpicker('refresh');

                // item == todo+"_roomtype" && $("#"+item).val("").trigger("change");

                // (item == todo+"_floor") && $("#"+item).parent().removeClass("no-error").removeClass("has-error");

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
        $("#add_room_modal").modal("hide");
        $("#edit_room_modal").modal("hide");
        $("#confirmation-add_room_modal").modal("hide");
        $("#confirmation-edit_room_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----


    // ----- GET USER ROOM DATA -----
    function getRoomData(todo) {
        const roomtype = $("#"+todo+"_roomtype").val();
        const floor    = $("#"+todo+"_floor").val();
        const status   = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            roomtype, floor, status
        };
        return data;
    }
    // ----- END GET ROOM DATA -----
    
    // ----- SAVE/UPDATE ROOM -----
    function saveRoomData(data) {
        
        $.ajax({
            url:    "room/saveRoomData",
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
                    roomTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getRoomData("add");
        saveRoomData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_room_modal").modal("hide");
        $("#add_room_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const roomid   = $(this).attr("roomid");
        const roomcode = $(this).attr("roomcode");
        const roomtype = $(this).attr("roomtype");
        const floor    = $(this).attr("floor");
        
        const data = getRoomData("edit");
        data.roomid   = roomid;
        data.roomcode = roomcode;
        data.roomtype = roomtype;
        data.floor    = floor;

        saveRoomData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_room_modal").modal("hide");
        $("#edit_room_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const roomid   = $(this).attr("roomid");
        const roomcode = $(this).attr("roomcode");
        const roomtype = $(this).attr("roomtype");
        const floor    = $(this).attr("floor");

        $("#btn_save_confirmation_edit").attr("roomid", roomid);
        $("#btn_save_confirmation_edit").attr("roomcode", roomcode);
        $("#btn_save_confirmation_edit").attr("roomtype", roomtype);
        $("#btn_save_confirmation_edit").attr("floor", floor);
    }) 
    // ----- END SAVE/UPDATE USER ROOM -----

    // ----- EDIT USER ROOM -----
    $(document).on("click", ".btn_edit_room", function() {
        const roomid   = $(this).attr("roomid");
        const roomcode = $(this).attr("roomcode");
        const roomtype = $(this).attr("roomtype");
        const floor    = $(this).attr("floor");
        const status   = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("roomid", roomid);
        $("#update").attr("roomcode", roomcode);
        $("#update").attr("roomtype", roomtype);
        $("#update").attr("floor", floor);

        $("#edit_roomtype").val(roomtype).trigger("change");
        $("#edit_roomtype").attr('roomid',roomid);
        $("#edit_floor").val(floor).trigger("change");
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "room/checkStatus",
            method: "POST",
            data: {roomid:roomid},
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

        $("#edit_room_modal").modal("show");
    })
    // ----- END EDIT USER DESIGNATION -----

});