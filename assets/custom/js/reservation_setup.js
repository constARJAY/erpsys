$(document).ready(function () {
    $('#edit_general_modal').on('shown.bs.modal', function(){
        $("#edit_downpayment_percentage").focus(); 
    });

    $('#edit_reschedule_modal').on('shown.bs.modal', function(){
        $("#edit_reschedule_days").focus(); 
    });

    $('#edit_cancellation_modal').on('shown.bs.modal', function(){
        $("#edit_refundable_period").focus(); 
    });

    $('#edit_general_validation').validate({
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

            $("#"+action+"_general_modal").modal("hide");
            $("#confirmation-"+action+"_general_modal").modal("show");
        }
    });
    
    $('#edit_reschedule_validation').validate({
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

            $("#"+action+"_reschedule_modal").modal("hide");
            $("#confirmation-"+action+"_reschedule_modal").modal("show");
        }
    });

    $('#edit_cancellation_validation').validate({
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

            $("#"+action+"_cancellation_modal").modal("hide");
            $("#confirmation-"+action+"_cancellation_modal").modal("show");
        }
    });
    // ---- DATATABLES ----
    reservationSetupTable();
    function reservationSetupTable() {
        $.ajax({
            url:    "reservation_setup/getData",
            method: "POST",
            dataType: 'json',
            success: function(data) {
                $("#show_general_downpayment").html(data[0]["downpayment_percentage"]+'% in the total amount');
                $("#show_general_time").html(data[0]["check_in"]+' - '+data[0]["check_out"]);
                $("#show_schedule_days").html(data[0]["reschedule_days"]+' days before the given schedule');
                $("#show_schedule_amount").html('+'+data[0]["reschedule_fee"]+'% in the total amount of the given schedule');
                $("#show_refundable_period").html(data[0]["refundable_period"]+' days before the given schedule');
                $("#show_refundable_amount").html(data[0]["refundable_amount"]+'% in the total amount of the given schedule');
            }
        });
    }
    // ---- END DATATABLES ----

    // ----- RESET FORMS -----
    function resetForms() {
        const todos = ["edit"];
        for(var i=0; i<todos.length; i++) {
            const todo = todos[i];
            let arrayElem = [
                todo+"_downpayment_percentage",
                todo+"_check_in",
                todo+"_check_out",
                todo+"_reschedule_days",
                todo+"_reschedule_fee",
                todo+"_refundable_period",
                todo+"_refundable_amount"
            ];
            
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("#"+item).val("");
                $("#"+item+'-error').remove();

                $("#invalid-"+item).html("");
            })
        }
    }
    // ----- END RESET FORMS -----

    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#edit_general_modal").modal("hide");
        $("#edit_reschedule_modal").modal("hide");
        $("#edit_cancellation_modal").modal("hide");
        $("#confirmation-edit_general_modal").modal("hide");
        $("#confirmation-edit_reschedule_modal").modal("hide");
        $("#confirmation-edit_cancellation_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET GENERAL DATA -----
    function getGeneralData(todo) {
        const downpaymentpercentage = $("#"+todo+"_downpayment_percentage").val();
        const checkin   = $("#"+todo+"_check_in").val();
        const checkout  = $("#"+todo+"_check_out").val();

        const data = {
            downpaymentpercentage, checkin, checkout
        };
        return data;
    }
    // ----- END GET RESCHEDULING DATA -----

    // ----- GET RESCHEDULING DATA -----
    function getReschedulingData(todo) {
        const rescheduledays = $("#"+todo+"_reschedule_days").val();
        const reschedulefee  = $("#"+todo+"_reschedule_fee").val();

        const data = {
            rescheduledays, reschedulefee
        };
        return data;
    }
    // ----- END GET RESCHEDULING DATA -----

    // ----- GET CANCELLATION DATA -----
    function getCancellationData(todo) {
        const refundableperiod = $("#"+todo+"_refundable_period").val();
        const refundableamount = $("#"+todo+"_refundable_amount").val();

        const data = {
            refundableperiod, refundableamount
        };
        return data;
    }
    // ----- END GET CANCELLATION DATA -----

    // ----- SAVE/UPDATE GENERAL -----
    function saveGeneralData(data) {
        
        $.ajax({
            url:    "reservation_setup/saveGeneralData",
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
                    reservationSetupTable();
                }
            }
        })
    }
    
    // ----- SAVE/UPDATE RESCHEDULING -----
    function saveReschedulingData(data) {
        
        $.ajax({
            url:    "reservation_setup/saveReschedulingData",
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
                    reservationSetupTable();
                }
            }
        })
    }

    // ----- SAVE/UPDATE CANCELLATION -----
    function saveCancellationData(data) {
        
        $.ajax({
            url:    "reservation_setup/saveCancellationData",
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
                    reservationSetupTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_general_edit", function() {        
        const data = getGeneralData("edit");
        saveGeneralData(data);
    })

    $(document).on("click", "#btn_save_confirmation_reschedule_edit", function() {        
        const data = getReschedulingData("edit");
        saveReschedulingData(data);
    })

    $(document).on("click", "#btn_save_confirmation_cancellation_edit", function() {        
        const data = getCancellationData("edit");
        saveCancellationData(data);
    })

    $(document).on("click", ".btn_close_confirmation_general_edit", function() {
        $("#confirmation-edit_general_modal").modal("hide");
        $("#edit_general_modal").modal("show");
    })

    $(document).on("click", ".btn_close_confirmation_reschedule_edit", function() {
        $("#confirmation-edit_reschedule_modal").modal("hide");
        $("#edit_reschedule_modal").modal("show");
    })

    $(document).on("click", ".btn_close_confirmation_cancellation_edit", function() {
        $("#confirmation-edit_cancellation_modal").modal("hide");
        $("#edit_cancellation_modal").modal("show");
    })

    // ----- EDIT GENERAL -----
    $(document).on("click", "#edit_general", function() {
        $.ajax({
            url:    "reservation_setup/getData",
            method: "POST",
            dataType: 'json',
            async:false,
            success: function(data) {
                $("#edit_downpayment_percentage").val(data[0]["downpayment_percentage"]);
                $("#edit_check_in").val(data[0]["check_in"]);
                $("#edit_check_out").val(data[0]["check_out"]);

                $("#edit_general_modal").modal("show");
            },
            error: function(request, textStatus, error) {
                
            }
        });
    })
    // ----- END EDIT GENERAL -----

    // ----- EDIT RESCHEDULE -----
    $(document).on("click", "#edit_reschedule", function() {
        $.ajax({
            url:    "reservation_setup/getData",
            method: "POST",
            dataType: 'json',
            async:false,
            success: function(data) {
                $("#edit_reschedule_days").val(data[0]["reschedule_days"]);
                $("#edit_reschedule_fee").val(data[0]["reschedule_fee"]);

                $("#edit_reschedule_modal").modal("show");
            },
            error: function(request, textStatus, error) {
                
            }
        });
    })
    // ----- END EDIT RESCHEDULE -----

    // ----- EDIT CANCELLATION -----
    $(document).on("click", "#edit_cancellation", function() {
        $.ajax({
            url:    "reservation_setup/getData",
            method: "POST",
            dataType: 'json',
            async:false,
            success: function(data) {
                $("#edit_refundable_period").val(data[0]["refundable_period"]);
                $("#edit_refundable_amount").val(data[0]["refundable_amount"]);

                $("#edit_cancellation_modal").modal("show");
            },
            error: function(request, textStatus, error) {
                
            }
        });
    })
    // ----- END EDIT CANCELLATION -----
});