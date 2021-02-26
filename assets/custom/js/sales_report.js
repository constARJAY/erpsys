$(document).ready(function() {


    // ----- FILTERING -----
    function filtering(type) {
        let roomTypes = function() {
            let result = [];
            $.ajax({
                method: "POST",
                url: "sales_report/getAllRoomType",
                async: false,
                data: true,
                dataType: "json",
                success: function(data) {
                    if (data) {
                        data.map(item => {
                            let temp = {
                                id:   item.roomTypeID,
                                name: item.roomTypeName
                            };
                            result.push(temp);
                        })
                    }
                }
            })
            return result;
        }();

        let filterType = `
            <div class="row">`;
            if (type == 1) {
                filterType += `
                <div class="col-md-6 col-sm-12 mb-3">
                    <select name="select_roomtype" id="select_roomtype" class="form-control">
                        <option value="0" selected>All Rooms</option>
                    `;
                roomTypes.map(item => {
                    filterType += `
                    <option value="${item.id}">${item.name}</option>`;
                })
                filterType += `
                    </select>
                </div>`;
            }
            filterType += `
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                            </div>
                            <input type="button" class="form-control text-left daterange" id="datePicker" placeholder="Please choose a date..." data-dtp="dtp_6ITRg" autocomplete="off">
                        </div>
                    </div>
                </div>
            </div>`;
        $("#filterType").html(filterType);
    }
    // ----- END FILTERING -----


    // ----- DATATABLE -----
    $("#salesReportTable").DataTable();
    function salesReportTable(type, dateFrom, dateTo, roomTypeID = 0) {
        const data = {type, dateFrom, dateTo, roomTypeID};

        let buttons = `
            <button class="btn btn-primary" id="btnExcel" type="${type}">EXCEL</button>
            <button class="btn btn-outline-primary" id="btnPrint" type="${type}">PRINT</button>`;
        $("#buttons").html(buttons);

        if ($.fn.DataTable.isDataTable('#salesReportTable')){
            $('#salesReportTable').DataTable().destroy();
        }

        // =======
        // 1 - Rooms
        // 2 - Halls
        // =======

        // ---- GETTING TYPE DATA -----
        $.ajax({
            method: "GET",
            url: "sales_report/getTypeData",
            async: false,
            data,
            dataType: "json",
            beforeSend: function() {
                $("#salesReportTableParent").html(loadingAnimation);
                $("#costSummary").html("");
            },
            success: function(data) {
                // console.log(data);

                if (data) {

                    let headerTypeTitle  = type == 0 ? "Type" : (type == 1 ? "Accommodation Type" : "Hall Name");
                    let headerFloorTitle = type == 0 ? "Floor" : (type == 1 ? "Room Floor" : "Hall Floor");

                    let htmlCostSummary = `
                    <div class="row mt-4">
                        <div class="offset-md-7 col-md-5 col-sm-12 text-right">
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Payment (Tax Included):</span>
                                <span>${formatCurrency(data.grandTotalPayment)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Expense:</span>
                                <span>${formatCurrency(data.grandTotalExpense)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Amenities:</span> 
                                <span>${formatCurrency(data.grandTotalAmenities)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Services:</span>
                                <span>${formatCurrency(data.grandTotalService)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Penalty:</span>
                                <span>${formatCurrency(data.grandTotalPenalty)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1">
                                <span class="font-weight-bold">Total Coupon:</span>
                                <span>${formatCurrency(data.grandTotalCoupon)}<span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-1 border-top pt-2">
                                <span class="font-weight-bold">Total Profit:</span>
                                <span>${formatCurrency(data.grandTotalProfit)}<span>
                            </div>
                        </div>
                    </div>`;

                    let htmlTable = `
                        <table class="table table-hover table-striped table-bordered" id="salesReportTable">
                            <thead>
                                <tr>
                                    <th>Transaction No.</th>
                                    <th>No.</th>
                                    <th>${headerTypeTitle}</th>
                                    <th>${headerFloorTitle}</th>
                                    <th>Date and Time</th>
                                    <th>Payment</th>
                                    <th>Expense</th>
                                    <th>Amenities</th>
                                    <th>Service</th>
                                    <th>Penalty</th>
                                    <th>Coupon</th>
                                    <th>Profit</th>
                                </tr>
                            </thead>
                            <tbody>`;

                    data["transactions"].map(item => {

                        htmlTable += `
                        <tr>
                            <td>${item.transaction}</td>
                            <td>${item.code}</td>
                            <td>${item.name}</td>
                            <td>${item.floor}</td>
                            <td>${item.dateTime}</td>
                            <td class="text-right">${item.payment ? item.payment : formatCurrency(0)}</td>
                            <td class="text-right">${item.expense ? item.expense : formatCurrency(0)}</td>
                            <td class="text-right">${item.amenities ? item.amenities : formatCurrency(0)}</td>
                            <td class="text-right">${item.service ? item.service : formatCurrency(0)}</td>
                            <td class="text-right">${item.penalty ? item.penalty : formatCurrency(0)}</td>
                            <td class="text-right">${item.coupon ? item.coupon : formatCurrency(0)}</td>
                            <td class="text-right">${item.profit ? item.profit : formatCurrency(0)}</td>
                        </tr>`;
                    })

                    setTimeout(() => {
                        $("#salesReportTableParent").html(htmlTable);
                        $("#salesReportTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
                            scrollX:        true,
                            scrollCollapse: true,
                            columnDefs: [
                                { targets: 0, width: 100 },
                                { targets: 1, width: 150 },
                                { targets: 2, width: 120 },
                                { targets: 3, width: 120 },
                                { targets: 4, width: 120 },
                                { targets: 5, width: 120 },
                                { targets: 6, width: 120 },
                                { targets: 7, width: 120 },
                                { targets: 8, width: 120 },
                                { targets: 9, width: 120 },
                                { targets: 10, width: 120 },
                            ],
                        });
                        $("#costSummary").html(htmlCostSummary);

                        reinitializeDaterangepicker(dateFrom, dateTo);
                    }, 500);

                }
            }
        }).done(function() {
            $("select").selectpicker('refresh');
        })
        // ---- END GETTING TYPE DATA -----
    }
    // ----- END DATATABLE -----


    // ----- DATE PICKER ------
    $("#select_type").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#btnPrint").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#btnExcel").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#select_type").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));
    $("#btnPrint").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));
    $("#btnExcel").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));

    reinitializeDaterangepicker("", "");
    function reinitializeDaterangepicker(dateFrom, dateTo) {
        $(".daterange").daterangepicker("destroy");

        let option;
        if (dateFrom != "") {
            option = {
                autoUpdateInput: true,
                showDropdowns: true,
                autoApply: true,
                startDate: moment(dateFrom),
                endDate: moment(dateTo),
                locale: {
                    format: "MMMM DD, YYYY"
                },
            }
        } else {
            option = {
                autoUpdateInput: true,
                showDropdowns: true,
                autoApply: true,
                locale: {
                    format: "MMMM DD, YYYY"
                },
            }
        }
        $(".daterange").daterangepicker(option, function(start, end) {
            $('#datePicker').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));

            let dateFrom   = start.format("YYYY-MM-DD");
            let dateTo     = end.format("YYYY-MM-DD");
            let type       = $("#select_type").val();
            let roomTypeID = $("#select_roomtype").val();
            type && salesReportTable(type, dateFrom, dateTo, roomTypeID);

            $("#select_type").attr("dateFrom", dateFrom);
            $("#select_type").attr("dateTo", dateTo);
            $("#select_roomtype").attr("dateFrom", dateFrom);
            $("#select_roomtype").attr("dateTo", dateTo);
            $("#btnPrint").attr("dateFrom", dateFrom);
            $("#btnPrint").attr("dateTo", dateTo);
            $("#btnExcel").attr("dateFrom", dateFrom);
            $("#btnExcel").attr("dateTo", dateTo);
        })
    }
    // ----- END DATE PICKER ------


    // ----- TYPE FILTER -----
    $("#select_type").val("").trigger("change");
    $(document).on("change", "#select_type", function() {
        $(this).parent().removeClass("has-error").removeClass("no-error");
        const type       = $(this).val();
        const dateFrom   = $(this).attr("dateFrom");
        const dateTo     = $(this).attr("dateTo");
        filtering(type);
        salesReportTable(type, dateFrom, dateTo);

        $("#select_roomtype").attr("type", type);
        $("#select_roomtype").attr("dateFrom", dateFrom);
        $("#select_roomtype").attr("dateTo", dateTo);
        $("#btnPrint").attr("type", type);
        $("#btnPrint").attr("dateFrom", dateFrom);
        $("#btnPrint").attr("dateTo", dateTo);
        $("#btnExcel").attr("type", type);
        $("#btnExcel").attr("dateFrom", dateFrom);
        $("#btnExcel").attr("dateTo", dateTo);
    })

    $(document).on("change", "#select_roomtype", function() {
        $(this).parent().removeClass("has-error").removeClass("no-error");
        const roomTypeID = $(this).val();
        const type       = $("#select_type").val();
        const dateFrom   = $(this).attr("dateFrom");
        const dateTo     = $(this).attr("dateTo");
        salesReportTable(type, dateFrom, dateTo, roomTypeID);

        $("#btnPrint").attr("type", type);
        $("#btnPrint").attr("roomtypeid", roomTypeID);
        $("#btnPrint").attr("dateFrom", dateFrom);
        $("#btnPrint").attr("dateTo", dateTo);
        $("#btnExcel").attr("type", type);
        $("#btnExcel").attr("roomtypeid", roomTypeID);
        $("#btnExcel").attr("dateFrom", dateFrom);
        $("#btnExcel").attr("dateTo", dateTo);
    })
    // ----- END TYPE FILTER -----


    // ----- PRINT -----
    $(document).on("click", "#btnPrint", function() {
        const type       = $(this).attr("type");
        const roomTypeID = $(this).attr("roomtypeid");
        const dateFrom   = $(this).attr("dateFrom");
        const dateTo     = $(this).attr("dateTo");

        $.ajax({
            method: "GET",
            url: "sales_report/printSalesReport",
            data: {type, roomTypeID, dateFrom, dateTo},
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
    // ----- END PRINT -----

    
    // ----- SAVE AS EXCEL DOCUMENT --------
    $(document).on("click", "#btnExcel", function() {
        const type       = $(this).attr("type");
        const roomTypeID = $(this).attr("roomtypeid");
        const dateFrom   = $(this).attr("dateFrom");
        const dateTo     = $(this).attr("dateTo");

        window.location.replace('sales_report/downloadExcel?type='+type+'&dateFrom='+dateFrom+'&dateTo='+dateTo+"&roomTypeID="+roomTypeID); 
    })
    // ----- END SAVE AS EXCEL DOCUMENT --------


})