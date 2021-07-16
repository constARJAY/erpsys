$(document).ready(function() {

    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable(`#tableReservationReport`)) {
            $(`#tableReservationReport`).DataTable().destroy();
        }

        var table = $(`#tableReservationReport`)
            .css({ "min-width": "100%" })
            .removeAttr("width")
            .DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                sorting:        [],
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0,  width: 100 },
                    { targets: 1,  width: 200 },
                    { targets: 2,  width: 100 },
                    { targets: 3,  width: 80  },
                    { targets: 4,  width: 100 },
                    { targets: 5,  width: 150 },
                    { targets: 6,  width: 150 },
                ],
            });
    }
    // ----- END DATATABLES -----


    // ----- GET RESERVATION DATA -----
    function getReservationData(timelineBuilderID = 0, dateFrom = moment(new Date).format("YYYY-MM-DD"), dateTo = moment(new Date).format("YYYY-MM-DD")) {
        const data = { timelineBuilderID, dateFrom, dateTo };
        let result = [];
        $.ajax({
            method: "POST",
            url: "reservation_report/getReservationData",
            data,
            async: false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
    // ----- END GET RESERVATION DATA -----


    // ----- TABLE CONTENT -----
    function tableContent(data = false) {  
        $("#tableContent").html(preloader);   
        let tbodyHTML = "";
        if (data && data.length > 0) {
            data.map(item => {
                const {
                    id,
                    projectCode,
                    projectName,
                    itemName,
                    itemUom,
                    reservedQuantity,
                    dateReserved,
                    materialUsageCode
                } = item;

                tbodyHTML += `
                <tr itemID="${id}">
                    <td>${projectCode}</td>
                    <td>${projectName}</td>
                    <td>${itemName}</td>
                    <td>${titleCase(itemUom)}</td>
                    <td class="text-center">${formatAmount(reservedQuantity)}</td>
                    <td>${moment(dateReserved).format("MMMM DD, YYYY")}</td>
                    <td class="text-center">${materialUsageCode}</td>
                </tr>`;
            });
        }

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover" id="tableReservationReport">
                <thead>
                    <tr>
                        <th>Project Code</th>
                        <th>Project Name</th>
                        <th>Item Name</th>
                        <th>UOM</th>
                        <th>Reserved Quantity</th>
                        <th>Date Reserved</th>
                        <th>Material Usage Code</th>
                    </tr>
                </thead>
                <tbody>${tbodyHTML}</tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#tableContent").html(html);
            initDatatables();
        }, 500);

        return html;
    }
    // ----- END TABLE CONTENT -----


    // ----- REFRESH TABLE -----
    function refreshTableContent() {
        const timelineBuilderID = $(`[name="timelineBuilderID"]`).val();
        const startDate = $(`[name="filterDate"]`).attr("start");
        const endDate   = $(`[name="filterDate"]`).attr("end");

        const data = getReservationData(timelineBuilderID, startDate, endDate);
        tableContent(data);
    }
    // ----- END REFRESH TABLE -----


    // ----- DATERANGEPICKER -----
    function initDaterangepicker(inStart = new Date, inEnd = new Date) {
        $(`[name="filterDate"]`).daterangepicker({
            autoUpdateInput: false,
            showDropdowns:   true,
            autoApply:       true,
            startDate: moment(inStart),
            endDate:   moment(inEnd),
            maxDate:   moment(),
            locale: {
                format: "MMMM DD, YYYY",
            },
        }, function(start, end) {
            $(`[name="filterDate"]`).attr("start", moment(start).format("YYYY-MM-DD"));
            $(`[name="filterDate"]`).attr("end", moment(end).format("YYYY-MM-DD"));
            $(`[name="filterDate"]`).val(`${moment(start).format("MMMM DD, YYYY")} - ${moment(end).format("MMMM DD, YYYY")}`);
            refreshTableContent();
        })
    }
    // ----- END DATERANGEPICKER -----


    // ----- SELECT PROJECT NAME -----
    $(document).on("change", `[name="timelineBuilderID"]`, function() {
        refreshTableContent();
    })
    // ----- END SELECT PROJECT NAME -----


    // ----- FILTERING OPTIONS -----
    function filteringOptions() {
        let html = `
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <select class="form-control select2"
                        name="timelineBuilderID"
                        style="width: 100%">
                        <option disabled>Select Project Name</option>
                        <option value="0" selected>All</option>
                        <option value="1">BlackBox Accounting</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date</label>
                    <input type="button"
                        class="form-control filterDate"
                        name="filterDate"
                        value="${moment(new Date).format("MMMM DD, YYYY")} - ${moment(new Date).format("MMMM DD, YYYY")}"
                        start="${moment(new Date).format("YYYY-MM-DD")}"
                        end="${moment(new Date).format("YYYY-MM-DD")}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="text-right pt-2">
                    <button class="btn btn-info px-5 py-2"
                        id="btnExcel">
                        <i class="fas fa-file-excel"></i> Excel
                    </button>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END FILTERING OPTIONS -----

    
    // ----- PAGE CONTENT -----
    function pageContent() {
        $("#page_content").html(preloader);
        let data = getReservationData();

        let html = `
        <div id="filterContent">
            ${filteringOptions()}
        </div>
        <div id="tableContent">
            ${tableContent(data)}
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initAll();
            initDaterangepicker();
        }, 200);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- CLICK BUTTON EXCEL -----
    $(document).on("click", "#btnExcel", function() {
        const timelineBuilderID = $(`[name="timelineBuilderID"]`).val();
        const startDate = $(`[name="filterDate"]`).attr("start");
        const endDate   = $(`[name="filterDate"]`).attr("end");

        const url = `${base_url}ims/reservation_report/downloadExcel?timelineBuilderID=${timelineBuilderID}&dateFrom=${startDate}&dateTo=${endDate}`;
		window.location.replace(url); 
    })
    // ----- END CLICK BUTTON EXCEL -----

})