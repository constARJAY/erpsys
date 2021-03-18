$(document).ready(function(){

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableListStocks')){
            $('#tableListStocks').DataTable().destroy();
        }
        
        var table = $("#tableListStocks").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 100 },
                { targets: 1, width: 100 },
                { targets: 2, width: 100 },
                { targets: 3, width: 150 },
                { targets: 4, width: 100 },
                { targets: 5, width: 200 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 100 },
                { targets: 9, width: 100 },
                { targets: 10, width: 100 },
                { targets: 11, width: 100 },
                { targets: 12, width: 100 },
                { targets: 13, width: 100 }
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
            data:     {tableName: "gen_operations_tbl"},
            beforeSend: function() {
                $("#table_content").html(preloader);
                // $("#inv_headerID").text("List of Inventory Item");
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover" id="tableListStocks">
                    <thead>
                        <tr class="text-center" style="white-space:nowrap">
                            <th>Item Category</th>
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>UOM</th>
                            <th>Beginning Qty</th>
                            <th>Purchased</th>
                            <th>Used</th>
                            <th>Borrowed Item</th>
                            <th>Return Item</th>
                            <th>Transferred Item</th>
                            <th>Disposed Item</th>
                            <th>End Qty</th>
                            <th>Unit Cost</th>
                            <th>Reorder Point</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {
                    // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                    let unique = {
                        id:       item.userAccountID, // Required
                        username: item.username,
                        email:    item.email,
                    }
                    uniqueData.push(unique);
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    html += `
                    <tr style="white-space:nowrap">
                        <td>Condiments</td>
                        <td>ITM-21-00001</td>
                        <td>Salt</td>
                        <td>grams</td>
                        <td>20.3</td>
                        <td>32.5</td>
                        <td>16.9</td>
                        <td>3.5</td>
                        <td>15</td>
                        <td>12</td>
                        <td>10</td>
                        <td>30.8</td>
                        <td class="text-right">₱ 6,500.00</td>
                        <td>5.3</td>
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