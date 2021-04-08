$(document).ready(function(){
        
    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableTaxTable')){
            $('#tableTaxTable').DataTable().destroy();
        }
        
        var table = $("#tableTaxTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%"}
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
            data:     {tableName: "hris_tax_table_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableTaxTable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Minimum Range</th>
                            <th>Maximum Range</th>
                            <th>Additional Tax</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    html += `
                    <tr>
                        <td>${++index}</td>
                        <td class="text-right">${formatAmount(item.taxMinimumRange, true)}</td>
                        <td class="text-right">${formatAmount(item.taxMaximumRange, true)}</td>
                        <td class="text-right">${formatAmount(item.taxAdditionalTax, true)}</td>
                        <td class="text-right">${item.taxPercentage}%</td>
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