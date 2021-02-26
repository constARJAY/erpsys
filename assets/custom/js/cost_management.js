$(document).ready(function() {

    // ---- DATATABLES -----
    $("#costManagementTable").DataTable();
    function costManagementTable(type, dateFrom, dateTo) {
        const data = {type, dateFrom, dateTo};

        if ($.fn.DataTable.isDataTable('#costManagementTable')){
            $('#costManagementTable').DataTable().destroy();
        }

        // =======
        // 1 - Rooms
        // 2 - Halls
        // 3 - Ammenities
        // =======

        
        // ---- GETTING TYPE DATA -----
        $.ajax({
            method:   "get",
            url:      "cost_management/getTypeData",
            async:    false,
            data,
            dataType: "json",
            beforeSend: function() {
                $("#costManagementTable_parent").html(loadingAnimation);
            },
            success: function(data) {
                let html = "";
                if (data.length > 0) {
                    let html = "";
                    if (type == "1") {
                        html += `
                        <table class="table table-hover table-striped table-bordered" id="costManagementTable">
                            <thead>
                                <tr>
                                    <th>Room No.</th>
                                    <th>Accommodation Type</th>
                                    <th>Room Floor</th>
                                    <th>Expense</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>`;
                        data.map(item => {
                            let status = item.roomStatus == "1" ? `<span class="badge badge-success w-100 p-2">Active<span>` : `<span class="badge badge-danger w-100 p-2">Inactive<span>`
                            // let button = `<a href="cost_management/rooms?view_id=${btoa(item.roomID)}" class="btn btn-primary w-100 p-1">View</a>`;
                            let button = `<button class="btn btn-primary w-100 p-1 btnView" service="room" id="${item.roomID}">View</button>`;

                            html += `
                            <tr>
                                <td>${item.roomNo}</td>
                                <td>${item.roomType}</td>
                                <td>${item.roomFloor}</td>
                                <td class="text-right">${formatCurrency(item.totalExpense)}</td>
                                <td>${status}</td>
                                <td>${button}</td>
                            </tr>`;
                        })

                    } else if (type == "2") {
                        html += `
                        <table class="table table-hover table-striped table-bordered" id="costManagementTable">
                            <thead>
                                <tr>
                                    <th>Hall No.</th>
                                    <th>Hall Name</th>
                                    <th>Hall Floor</th>
                                    <th>Expense</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>`;

                            data.map(item => {
                            let status = item.hallStatus == "1" ? `<span class="badge badge-success w-100 p-2">Active<span>` : `<span class="badge badge-danger w-100 p-2">Inactive<span>`
                            // let button = `<a href="cost_management/halls?view_id=${btoa(item.hallID)}" class="btn btn-primary w-100 p-1">View</a>`;
                            let button = `<button class="btn btn-primary w-100 p-1 btnView" service="hall" id="${item.hallID}">View</button>`;

                            html += `
                            <tr>
                                <td>${item.hallNo}</td>
                                <td>${item.hallName}</td>
                                <td>${item.hallFloor}</td>
                                <td class="text-right">${formatCurrency(item.totalExpense)}</td>
                                <td>${status}</td>
                                <td>${button}</td>
                            </tr>`;
                        })
                    } else if (type == "3") {
                        html += `
                        <table class="table table-hover table-striped table-bordered" id="costManagementTable">
                            <thead>
                                <tr>
                                    <th>Amenities No.</th>
                                    <th>Amenities Title</th>
                                    <th>Price Type</th>
                                    <th>Price</th>
                                    <th>Expense</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>`;
                            

                        data.map(item => {
                            let status = item.amenitiesStatus == "1" ? `<span class="badge badge-success w-100 p-2">Active<span>` : `<span class="badge badge-danger w-100 p-2">Inactive<span>`
                            // let button = `<a href="cost_management/amenities?view_id=${btoa(item.amenitiesID)}" class="btn btn-primary w-100 p-1">View</a>`;
                            let button = `<button class="btn btn-primary w-100 p-1 btnView" service="amenities" id="${item.amenitiesID}">View</button>`;

                            html += `
                            <tr>
                                <td>${item.amenitiesNo}</td>
                                <td>${item.amenitiesTitle}</td>
                                <td>${item.amenitiesPriceType}</td>
                                <td class="text-right">${formatCurrency(item.amenitiesPrice)}</td>
                                <td class="text-right">${formatCurrency(item.totalExpense)}</td>
                                <td>${status}</td>
                                <td>${button}</td>
                            </tr>`;
                        })
                    }

                    html += `
                    </tbody>
                        </table>`;

                    setTimeout(() => {
                        $("#costManagementTable_parent").html(html);
                    }, 500);
                    $("#costManagementTable").DataTable();
                }
            }
        })
        // ---- END GETTING TYPE DATA -----
    }
    // ----- DATATABLES -----


    // ----- VIEW ROOM/HALL/AMENITIES -----
    $(document).on("click", ".btnView", function() {
        const service = $(this).attr("service");
        const id      = $(this).attr("id");
        if (service == "room") {
            $.redirect('cost_management/rooms', {view_id: id});
        } else if (service == "hall") {
            $.redirect('cost_management/halls', {view_id: id});
        } else {
            $.redirect('cost_management/amenities', {view_id: id});
        }
    })
    // ----- END VIEW ROOM/HALL/AMENITIES -----


    // ----- DATE RANGE FILTERING -----
    $('.daterange').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, (start, end) => {
        const type = $("#select_type").val();
        const date = start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY');
        $("#dateRange").val(date);
        if (type) {
            $("#select_type").attr("dateFrom", start.format("YYYY-MM-DD"));
            $("#select_type").attr("dateTo", end.format("YYYY-MM-DD"));
            $("#select_type").parent().removeClass("has-error").addClass("no-error")
        } else {
            $("#select_type").focus();
            $("#select_type").parent().removeClass("no-error").addClass("has-error")
        }
    });
    // ----- END DATE RANGE FILTERING -----


    // ----- TYPE FILTER -----
    $("#select_type").val("").trigger("change");
    $(document).on("change", "#select_type", function() {
        $(this).parent().removeClass("has-error").removeClass("no-error");
        const type     = $(this).val();
        const dateFrom = $(this).attr("dateFrom");
        const dateTo   = $(this).attr("dateTo");
        costManagementTable(type, dateFrom, dateTo);
    })
    // ----- END TYPE FILTER -----


})