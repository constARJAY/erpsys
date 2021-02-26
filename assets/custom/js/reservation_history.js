$(document).ready(function() {

    // ----- DATATABLE -----
    $("#reservationHistoryTable").DataTable();
    function reservationHistoryTable(type, dateFrom, dateTo) {
        $("#reservationHistoryTable_parent").html(loadingAnimation);
        const data = {type, dateFrom, dateTo};

        if ($.fn.DataTable.isDataTable('#reservationHistoryTable')){
            $('#reservationHistoryTable').DataTable().destroy();
        }

        // =======
        // 1 - Rooms
        // 2 - Halls
        // =======

        // ---- GETTING TYPE DATA -----
        const getTypeData = function() {
            let typeData = [];
            $.ajax({
                method:   "GET",
                url:      "reservation_history/getTypeData",
                async:    false,
                data,
                dataType: "json",
                success: function(data) {
                    data.map(item => {
                        typeData.push(item);
                    })
                }
            })
            return typeData;
        }();
        // ---- END GETTING TYPE DATA -----


        let html = "";

        let buttons = `
            <button class="btn btn-primary" id="btnExcel" type="${type}">EXCEL</button>
            <button class="btn btn-outline-primary" id="btnPrint" type="${type}">PRINT</button>`;
        $("#buttons").html(buttons);
        let headerType = type == 0 ? "Name" : (type == 1 ? "Accommodation Type" : "Hall Name");

        html += `
            <table class="table table-hover table-striped table-bordered" id="reservationHistoryTable">
                <thead>
                    <tr>
                        <th>Transaction No.</th>
                        <th>Full Name</th>
                        <th>Reservation Date</th>
                        <th>Type</th>
                        <th>${headerType}</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

        getTypeData.map(item => {
            let serviceType = item.roomTypeID ? "1" : "2";

            html += `
            <tr>
                <td>${item.transactionNumber}</td>
                <td>${item.fullname}</td>
                <td>${item.dateReserved}</td>
                <td>${item.type}</td>
                <td>${item.nameType}</td>
                <td>${item.dateCheckIn}</td>
                <td>${item.dateCheckOut}</td>
                <td>${item.paymentStatus}</td>
                <td>
                    <button class="btn btn-primary p-1 w-100 btnView" clientid="${item.clientID}" type="${serviceType}">View</button>
                </td>
            </tr>`;

        })
         
        html += `
        </tbody>
            </table>`;

        setTimeout(() => {
            $("#reservationHistoryTable_parent").html(html);
            $("#reservationHistoryTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
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
                    { targets: 8, width: 50 },
                ],
            });
        }, 500);
    }
    // ----- END DATATABLE -----


    // ----- DATE PICKER ------
    $("#select_type").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#btnPrint").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#btnExcel").attr("dateFrom", moment(new Date).format('YYYY-MM-DD'));
    $("#select_type").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));
    $("#btnPrint").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));
    $("#btnExcel").attr("dateTo", moment(new Date).format('YYYY-MM-DD'));

    $(".daterange").daterangepicker({
        autoUpdateInput: true,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, function(start, end) {
        $('#datePicker').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));

        let dateFrom = start.format("YYYY-MM-DD");
        let dateTo   = end.format("YYYY-MM-DD");
        let type     = $("#select_type").val();
        type && reservationHistoryTable(type, dateFrom, dateTo);

        $("#select_type").attr("dateFrom", dateFrom);
        $("#select_type").attr("dateTo", dateTo);
        $("#btnPrint").attr("dateFrom", dateFrom);
        $("#btnPrint").attr("dateTo", dateTo);
        $("#btnExcel").attr("dateFrom", dateFrom);
        $("#btnExcel").attr("dateTo", dateTo);
    })
    // ----- END DATE PICKER ------


    // ----- TYPE FILTER -----
    $("#select_type").val("").trigger("change");
    $(document).on("change", "#select_type", function() {
        $(this).parent().removeClass("has-error").removeClass("no-error");
        const type     = $(this).val();
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");
        reservationHistoryTable(type, dateFrom, dateTo);

        $("#btnPrint").attr("type", type);
        $("#btnPrint").attr("dateFrom", dateFrom);
        $("#btnPrint").attr("dateTo", dateTo);
        $("#btnExcel").attr("type", type);
        $("#btnExcel").attr("dateFrom", dateFrom);
        $("#btnExcel").attr("dateTo", dateTo);
    })
    // ----- END TYPE FILTER -----
    

    // ----- PRINT -----
    $(document).on("click", "#btnPrint", function() {
        const type     = $(this).attr("type");
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");

        $.ajax({
            method: "GET",
            url: "reservation_history/printAllReservationInvoice",
            data: {type, dateFrom, dateTo},
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
        const type     = $(this).attr("type");
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");

        window.location.replace('reservation_history/downloadExcel?type='+type+'&dateFrom='+dateFrom+'&dateTo='+dateTo); 
    })
    // ----- END SAVE AS EXCEL DOCUMENT --------


    // ----- VIEW RESERVATION INVOICE -----
    $(document).on("click", ".btnView", function() {
        const clientID = $(this).attr("clientid");
        const type     = $(this).attr("type");
        $("#btnPrintInvoice").attr("clientid", clientID);
        $("#btnPrintInvoice").attr("type", type);

        $("#reservationInvoiceModal").modal("show");

        $.ajax({
            method: "POST",
            url: "reservation_history/getSpecificReservationHistory",
            data: {clientID, type},
            dataType: "JSON",
            async: false,
            beforeSend: function() {
                $("#reservationInvoiceModalBody").html(loadingAnimation);
            },
            success: function(data) {
                $("#btnPrintInvoice").attr("disabled", false);

                let html = `
                <div class="header">
                    <div class="row">
                        <div class="col-md-7 col-sm-12 text-left">
                            <h5 class="font-weight-bold text-primary">Guest Information</h5>
                            <h6>${data.fullname}</h6>
                            <div>${data.address ? data.address : "-"}</div>
                            <div>${data.email ? data.email : "-"}</div>
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <div>&nbsp;</div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-primary text-left my-0">Check In:</label>
                                <span class="text-right">${data.checkIn ? data.checkIn : "-"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-primary text-left my-0">Check Out:</label>
                                <span class="text-right">${data.checkOut ? data.checkOut : "-"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <div class="d-flex justify-content-between">
                                    <label for="" class="font-weight-bold text-primary text-left my-0">Adult: </label>
                                    <span class="text-right ml-1">${data.adult ? data.adult : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label for="" class="font-weight-bold text-primary text-left my-0">Children: </label>
                                    <span class="text-right ml-1">${data.children ? data.children : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <label for="" class="font-weight-bold text-primary text-left my-0">Infant: </label>
                                    <span class="text-right ml-1">${data.infant ? data.infant : "0"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>

                <div class="body">
                    <div class="row">

                        <div class="col-md-6 col-sm-12">
                            <h5 class="font-weight-bold text-primary">${type == 1 ? "Room Information" : "Hall Information"}</h5>
                            <div class="ml-2">
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Accommodation Type" : "Hall Name"}</label>
                                    <span>${data.name}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Room Number" : "Hall Number"}</label>
                                    <span>${data.code}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Room Price" : "Hall Price"}</label>
                                </div>
                                <div class="ml-3">`;

                    data["pricing"].map(item => {
                        html += `
                        <div class="d-flex justify-content-between align-items-baseline">
                            <span style="font-size: .92rem" class="text-dark mb-0 text-left">${item.date}</span>
                            <span style="font-size: .92rem">${item.price}</span>
                        </div>
                        `;
                    });

                    html += `      
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                                    <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                                    <span>${data.roomPrice}</span>
                                </div>
                            </div>
                            <br>
                            <h5 class="font-weight-bold text-primary">Additional Service/s</h5>
                            <div class="ml-2">`;

                let services = data["services"];
                if (services.length > 0) {
                    services.forEach(item => {
                        html += `
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">${item.description}</label>
                                <span>${item.price}</span>
                            </div>`;
                    });   
                } else {
                    html += `
                        <div class="d-flex justify-content-between align-items-baseline">
                            <label for="" class="text-dark mb-0">No additional services</label>
                        </div>`;
                }

                html += `
                <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                    <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                    <span>${data.totalAdditionalPrice}</span>
                </div>`;
                       
                            
                html += `   
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-12">`;

                if (data["couponID"] != "-") {
                    html += `
                    <h5 class="font-weight-bold text-primary">Availed Coupon</h5>
                        <div class="ml-2">
                            <div class="d-flex justify-content-between align-items-baseline">
                                <span style="font-size: .92rem" class="font-weight-bold text-dark mb-0 text-left">${data.availCoupon}</span>
                                <span style="font-size: .92rem">${data.couponValue}</span>
                        </div>
                    </div>`;
                } else {
                    html += `
                    <h5 class="font-weight-bold text-primary">Availed Coupon</h5>
                        <div class="ml-2">
                            <div class="d-flex justify-content-between align-items-baseline">
                            <span style="font-size: .92rem" class="text-dark mb-0 text-left">No coupon</span>
                        </div>
                    </div>`;
                }

                html += `
                        <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1 ml-2" style="font-size: 1.04rem; font-weight: bold;">
                            <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                            <span>${data.totalCouponValue}</span>
                        </div>
                        <br>`;

                html += `        
                            <h5 class="font-weight-bold text-primary">Guest Payment</h5>
                            <div class="ml-2">
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Mode of Payment</label>
                                    <span>${data.paymentMode}</span>
                                </div>
                                <!-- ---- FOR ENHANCEMENT VERSION 2 ---- -->
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Reference Number</label>
                                    <span>${data.referenceNumber ? data.referenceNumber : "-"}</span>
                                </div>
                                <!-- ---- END FOR ENHANCEMENT VERSION 2 ---- -->
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Initial Payment</label>
                                    <span>${data.initialPayment ? data.initialPayment : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                                    <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                                    <span>${data.initialPayment}</span>
                                </div>
                            </div>
                            <br>
                            <h5 class="font-weight-bold text-primary">Payment Summary</h5>
                            <div class="ml-2">
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Total Amount</label>
                                    <span>${data.grandTotalPrice ? data.grandTotalPrice : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Total VAT</label>
                                    <span>${data.totalVAT ? data.totalVAT : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Total Coupon Value</label>
                                    <span>${data.totalCouponValue ? data.totalCouponValue : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <label for="" class="font-weight-bold text-dark mb-0">Total Guest Payment</label>
                                    <span>${data.totalGuestPayment ? data.totalGuestPayment : "0"}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.05rem; font-weight: bold">
                                    <label for="" class="font-weight-bold text-dark mb-0">Running Balance</label>
                                    <span>${data.totalToBePaid ? data.totalToBePaid : "0"}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>`;

                setTimeout(() => {
                    $("#reservationInvoiceModalBody").html(html);
                }, 500);
            },
            error: function(err) {
                $("#btnPrintInvoice").attr("disabled", true);

                let html = `
                <div class="w-100 text-danger text-center font-weight-bold">
                    ${err.statusText}
                </div>`;
                setTimeout(() => {
                    $("#reservationInvoiceModalBody").html(html);
                }, 500);
            }
        })
    })
    // ----- END VIEW RESERVATION INVOICE -----


    // ----- PRINT INVOICE -----
    $(document).on("click", "#btnPrintInvoice", function() {
        const clientID     = $(this).attr("clientid");
        const type         = $(this).attr("type");

        $.ajax({
            method: "GET",
            url: "reservation_history/printReservationInvoice",
            data: {type, clientID},
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
    // ----- END PRINT INVOICE -----

})