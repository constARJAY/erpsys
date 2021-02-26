$(document).ready(function () {
    $('.holidaydate').daterangepicker({
        singleDatePicker: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        }
    });

    $('#edit_holiday_modal').on('shown.bs.modal', function(){
        $("#edit_holidayname").focus(); 
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

            $("#"+action+"_holiday_modal").modal("hide");
            $("#confirmation-"+action+"_holiday_modal").modal("show");
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

            $("#"+action+"_holiday_modal").modal("hide");
            $("#confirmation-"+action+"_holiday_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    holidayTable();
    function holidayTable() {
        if ($.fn.DataTable.isDataTable('#holidayTable')){
            $('#holidayTable').DataTable().destroy();
        }
        
        var table = $("#holidayTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '25%' },
                { targets: 2, width: '25%' },
                { "className": "align-right", targets: 3, width: '20%' },
                { targets: 4, width: '10%' },
                { targets: 5, width: '10%' },
            ],
            ajax: {
                url:         "holiday/getHoliday",
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
                todo+"_holidayname",
                todo+"_holidaydate",
                todo+"_holidaypercentage"
            ];
            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

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
        $("#add_holiday_modal").modal("hide");
        $("#edit_holiday_modal").modal("hide");
        $("#confirmation-add_holiday_modal").modal("hide");
        $("#confirmation-edit_holiday_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET HOLIDAY DATA -----
    function getHolidayData(todo) {
        const holidayname       = $("#"+todo+"_holidayname").val();
        const holidaydate       = moment($("#"+todo+"_holidaydate").val()).format("YYYY-MM-DD");
        const holidaypercentage = $("#"+todo+"_holidaypercentage").val();
        const status            = $("#"+todo+"_status").prop("checked") ? 1 : 0;

        const data = {
            holidayname, holidaydate, holidaypercentage, status
        };
        return data;
    }
    // ----- END GET HOLIDAY DATA -----
    
    // ----- SAVE/UPDATE HOLIDAY -----
    function saveHolidayData(data) {
        
        $.ajax({
            url:    "holiday/saveHolidayData",
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
                    holidayTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getHolidayData("add");
        saveHolidayData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_holiday_modal").modal("hide");
        $("#add_holiday_modal").modal("show");
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const holidayID   = $(this).attr("holidayid");
        const holidayCode = $(this).attr("holidaycode");
        
        const data = getHolidayData("edit");
        data.holidayid   = holidayID;
        data.holidaycode = holidayCode;

        saveHolidayData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_holiday_modal").modal("hide");
        $("#edit_holiday_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const holidayID   = $(this).attr("holidayID");
        const holidayCode = $(this).attr("holidayCode");

        $("#btn_save_confirmation_edit").attr("holidayID", holidayID);
        $("#btn_save_confirmation_edit").attr("holidayCode", holidayCode);
    }) 
    // ----- END SAVE/UPDATE HOLIDAY -----

    // ----- EDIT HOLIDAY -----
    $(document).on("click", ".btn_edit_holiday", function() {
        const holidayID         = $(this).attr("holidayid");
        const holidayName       = $(this).attr("holidayname");
        const holidayDate       = moment($(this).attr("holidaydate")).format("MMMM DD, YYYY");
        const holidayPercentage = $(this).attr("holidaypercentage");
        const holidayCode       = $(this).attr("holidaycode");
        const status            = $(this).attr("status") == 1 ? true : false;

        $("#update").attr("holidayID", holidayID);
        $("#update").attr("holidayName", holidayName);
        $("#update").attr("holidayDate", holidayDate);
        $("#update").attr("holidayPercentage", holidayPercentage);
        $("#update").attr("holidayCode", holidayCode);

        $("#edit_holidayname").val(holidayName);
        $("#edit_holidayname").attr('holidayid',holidayID);

        $("#edit_holidaydate").val(holidayDate);
        $("#edit_holidaypercentage").val(holidayPercentage);
        $("#edit_status").prop("checked", status);

        $.ajax({
            url:    "holiday/checkStatus",
            method: "POST",
            data: {holidayID:holidayID},
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

        $("#edit_holiday_modal").modal("show");
    })
    // ----- END EDIT HOLIDAY -----

});