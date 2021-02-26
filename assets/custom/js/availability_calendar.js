$(document).ready(function() {

    // ------------- DATE PICKER ----------------
    function cb(start, end) {
        $('#eventdate').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        $('#edit-eventdate').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        const dateFrom = start.format('YYYY-MM-DD 08:00:00');
        const dateTo   = end.format('YYYY-MM-DD 19:00:00');

        $("#btn_submit_event").attr("datefrom", dateFrom);
        $("#btn_submit_event").attr("dateto", dateTo);
        $(".save-event").attr("datefrom", dateFrom);
        $(".save-event").attr("dateto", dateTo);
        $(".update-event").attr("datefrom", dateFrom);
        $(".update-event").attr("dateto", dateTo);
    }
    $('.daterange').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, cb);
    // ------------- END DATE PICKER ----------------

    
    // ---- SAVE NEW EVENT -----
    $(document).on("click", "#btn_submit_event", function(e) {
        e.preventDefault();
        const eventName  = $("#eventname").val().trim();
        const background = $("#eventcolor").val();
        const dateFrom   = $(this).attr("datefrom") ? $(this).attr("datefrom") : moment(new Date).format('YYYY-MM-DD 00:00:00');
        const dateTo     = $(this).attr("dateto") ? $(this).attr("dateto") : moment(new Date).format('YYYY-MM-DD 23:59:59');
        const data = {eventName, background, dateFrom, dateTo};

        $("#add_event").find("input, select").each(function() {
            rjValidateInputs("#"+$(this).attr("id"));
        })

        if ($("#add_event").find(".is-invalid").length > 0) {
            $("#add_event").find(".is-invalid")[0].focus();
        } else {
            $.ajax({
                url: "hotel_calendar/saveAvailabilityCalendar",
                method: "POST",
                data,
                dataType: "json",
                success: function(data) {
                    let result = data.split("|");
                    if (result[0] == "true") {
                        window.location.reload();
                    } else {
                        showNotification("error", result[1]);
                    }
                }
            })
        }

    })
    // ---- END SAVE NEW EVENT -----


    // ---- CLOSING MODAL ----
    $(document).on("click", ".btn-close", function() {
        const id = $(this).parent().parent().parent().parent().attr("id");
        resetForms("#"+id);
        resetForms("#add_event");
    })
    // ---- END CLOSING MODAL ----
    
})