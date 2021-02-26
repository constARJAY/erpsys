$(document).ready(function () {
    $('#edit_amenities_modal').on('shown.bs.modal', function(){
        $("#edit_amenitiesname").focus(); 
    });

    $('#add_amenities_modal').on('hidden.bs.modal', function () {
        $('.bootstrap-select').removeClass('is-invalid');
    });

    $(document).on("click", ".bootstrap-select", function() {
        var select = $(this).prop('className').split(' ')[3];
        
        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');
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

            $("#"+action+"_amenities_modal").modal("hide");
            $("#confirmation-"+action+"_amenities_modal").modal("show");
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

            $("#"+action+"_amenities_modal").modal("hide");
            $("#confirmation-"+action+"_amenities_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    amenitiesTable();
    function amenitiesTable() {
        if ($.fn.DataTable.isDataTable('#amenitiesTable')){
            $('#amenitiesTable').DataTable().destroy();
        }
        
        var table = $("#amenitiesTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '30%' },
                { targets: 2, width: '20%' },
                { "className": "align-right", targets: 3, width: '20%' },
                { targets: 4, width: '10%' },
                { targets: 5, width: '10%' },
            ],
            ajax: {
                url:         "amenities/getAmenities",
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
                todo+"_amenitiesname",
                todo+"_amenitiesprice",
                todo+"_amenitiespricetype",
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

                $("select").selectpicker('refresh');

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
        $("#add_amenities_modal").modal("hide");
        $("#edit_amenities_modal").modal("hide");
        $("#confirmation-add_amenities_modal").modal("hide");
        $("#confirmation-edit_amenities_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----


    // ----- GET USER AMENITIES DATA -----
    function getAmenitiesData(todo) {
        const amenitiesname      = $("#"+todo+"_amenitiesname").val();
        const amenitiesprice     = $("#"+todo+"_amenitiesprice").val().split(",").join("");
        const amenitiespricetype = $("#"+todo+"_amenitiespricetype").val();
        const status             = $("#"+todo+"_status").prop("checked") ? 1 : 0;
        
        const data = {
            amenitiesname, amenitiesprice, amenitiespricetype, status
        };
        return data;
    }
    // ----- END GET AMENITIES DATA -----
    
    // ----- SAVE/UPDATE AMENITIES -----
    function saveAmenitiesData(data) {

        $.ajax({
            url:    "amenities/saveAmenitiesData",
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
                    amenitiesTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getAmenitiesData("add");
        saveAmenitiesData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_amenities_modal").modal("hide");
        $("#add_amenities_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const amenitiesid   = $(this).attr("amenitiesid");
        const amenitiescode = $(this).attr("amenitiescode");
        
        const data = getAmenitiesData("edit");
        data.amenitiesid   = amenitiesid;
        data.amenitiescode = amenitiescode;

        saveAmenitiesData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_amenities_modal").modal("hide");
        $("#edit_amenities_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const amenitiesid    = $(this).attr("amenitiesid");
        const amenitiescode  = $(this).attr("amenitiescode");
        const amenitiesname  = $(this).attr("amenitiesname");
        const amenitiesprice = $(this).attr("amenitiesprice");
        const amenitiespricetype = $(this).attr("amenitiespricetype");

        $("#btn_save_confirmation_edit").attr("amenitiesid", amenitiesid);
        $("#btn_save_confirmation_edit").attr("amenitiescode", amenitiescode);
        $("#btn_save_confirmation_edit").attr("amenitiesname", amenitiesname);
        $("#btn_save_confirmation_edit").attr("amenitiesprice", amenitiesprice);
        $("#btn_save_confirmation_edit").attr("amenitiespricetype", amenitiespricetype);
    }) 
    // ----- END SAVE/UPDATE USER AMENITIES -----

    // ----- EDIT USER AMENITIES -----
    $(document).on("click", ".btn_edit_amenities", function() {
        const amenitiesid    = $(this).attr("amenitiesid");
        const amenitiescode  = $(this).attr("amenitiescode");
        const amenitiesname  = $(this).attr("amenitiesname");
        const amenitiesprice     = $(this).attr("amenitiesprice");
        const amenitiespricetype = $(this).attr("amenitiespricetype");
        const status             = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("amenitiesid", amenitiesid);
        $("#update").attr("amenitiescode", amenitiescode);
        $("#update").attr("amenitiesname", amenitiesname);
        $("#update").attr("amenitiesprice", amenitiesprice);
        $("#update").attr("amenitiespricetype", amenitiespricetype);

        $("#edit_amenitiesname").attr('amenitiesid',amenitiesid);

        $("#edit_amenitiesname").val(amenitiesname);
        $("#edit_amenitiesprice").val(amenitiesprice);
        $("#edit_amenitiespricetype").val(amenitiespricetype).trigger("change");
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "amenities/checkStatus",
            method: "POST",
            data: {amenitiesid:amenitiesid},
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

        $("#edit_amenities_modal").modal("show");
    })
    // ----- END EDIT USER DESIGNATION -----

});