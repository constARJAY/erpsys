$(document).ready(function() {

    // ---- DATATABLES ----
    couponTable("", "");
    function couponTable(dateFrom, dateTo) {
        if ($.fn.DataTable.isDataTable('#couponTable')){
            $('#couponTable').DataTable().destroy();
        }
        
        var table = $("#couponTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "15%" },
                { targets: 1, width: "20%" },
                { targets: 2, width: "35%" },
                { targets: 3, width: "15%" },
                { targets: 4, width: "15%" },
            ],
            ajax: {
                url:         "coupon_report/getCouponReport?dateFrom="+dateFrom+"&dateTo="+dateTo,
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

    // ----- DATE PICKER -----
    $('.daterange').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, function(start, end) {
        $('#datePicker').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        let dateFrom = start.format("YYYY-MM-DD");
        let dateTo   = end.format("YYYY-MM-DD");
        couponTable(dateFrom, dateTo);

        $("#btnExcel").attr("dateFrom", dateFrom);
        $("#btnExcel").attr("dateTo", dateTo);
        $("#btnPrint").attr("dateFrom", dateFrom);
        $("#btnPrint").attr("dateTo", dateTo);
    });
    // ----- END DATE PICKER -----


    // ----- SAVE AS EXCEL DOCUMENT --------
    $(document).on("click", "#btnExcel", function() {
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");

        window.location.replace('coupon_report/downloadExcel?dateFrom='+dateFrom+'&dateTo='+dateTo); 
    })
    // ----- END SAVE AS EXCEL DOCUMENT --------


    // ----- PRINT DOCUMENT ------
    $(document).on("click", "#btnPrint", function() {
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");

        $.ajax({
            method: "POST",
            url: "coupon_report/printCouponReport",
            data: {dateFrom, dateTo},
            success: function(data) {
                var left  = ($(window).width()/2)-(900/2),
                    top   = ($(window).height()/2)-(600/2),
                    mywindow = window.open ("", "PRINT", "width=900, height=600, top="+top+", left="+left);

                mywindow.document.write(data);

                mywindow.document.close(); 
                mywindow.focus();
            }
        })
    })
    // ----- END PRINT DOCUMENT ------
})