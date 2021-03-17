$(document).ready(function(){
        
    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableSssTable')){
            $('#tableSssTable').DataTable().destroy();
        }
        
        var table = $("#tableSssTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 10 },
                { targets: 1, width: 50 },
                { targets: 2, width: 50 },
                { targets: 3, width: 50 },
                { targets: 4, width: 50 },
                { targets: 5, width: 50 },
                { targets: 6, width: 50 },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----


    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: "hris_sss_table_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableSssTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Minimum Range</th>
                            <th>Maximum Range</th>
                            <th>Employer Contribution</th>
                            <th>Employee Contribution</th>
                            <th>EC Contribution</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    html += `
                    <tr>
                        <td>${++index}</td>
                        <td class="text-right">${formatAmount(item.sssMinimumRange, true)}</td>
                        <td class="text-right">${formatAmount(item.sssMaximumRange, true)}</td>
                        <td class="text-right">${formatAmount(item.sssEmployerContribution, true)}</td>
                        <td class="text-right">${formatAmount(item.sssEmployeeContribution, true)}</td>
                        <td class="text-right">${formatAmount(item.sssECContribution, true)}</td>
                        <td class="text-right">${formatAmount(item.sssTotal, true)}</td>
                    </tr>`;
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    initDataTables();
                }, 500);
            },
            error: function() {
                let html = `
                    <div class="w-100 h5 text-center text-danger>
                        There was an error fetching data.
                    </div>`;
                $("#table_content").html(html);
            }
        })
    }
    tableContent();
    // ----- END TABLE CONTENT -----
    
});