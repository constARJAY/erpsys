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
                { targets: 1, width: 120 },
                { targets: 2, width: 120 },
                { targets: 3, width: 150 },
                { targets: 4, width: 120 },
                { targets: 5, width: 200 },
                { targets: 6, width: 100 },
                { targets: 7, width: 100 },
                { targets: 8, width: 100 },
                { targets: 9, width: 100 },
                { targets: 10, width: 100 },
                { targets: 11, width: 100 },
                { targets: 12, width: 100 },
                { targets: 13, width: 100 },
                { targets: 14, width: 100 },
                { targets: 15, width: 100 },
                { targets: 16, width: 100 }
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----

    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
       
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
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Item Category</th>
                            <th>Item Classification</th>
                            <th>Storage Name</th>
                            <th>Department</th>
                            <th>UOM</th>
                            <th>Beginning Qty</th>
                            <th>Purchased</th>
                            <th>Used</th>
                            <th>Borrowed Item</th>
                            <th>Returned Item</th>
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
                   
                    // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                    html += ``
                   
                })
                html += `</tbody>
                </table>`;

                setTimeout(() => {
                    $("#table_content").html(html);
                    //initAll();
                    initDataTables();
                    //initAll();
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
    
    $(document).on("click", "#btnSearch", function() {

        const validate = validateForm("main_body");
        if (validate) {
        var classificationID =$("#input_classificationID").val();
        var categoryID = $("#input_categoryID").val();
        var inventoryStorageID = $("#input_inventoryStorageID").val();
            $.ajax({
                url: `${base_url}ims/list_stocks/getliststocks`,
                method: "POST",
                data: {
                    classificationID:           classificationID,
                    categoryID:                 categoryID,
                    inventoryStorageID:         inventoryStorageID
                },
                async: true,
                dataType: "json",
                beforeSend: function () {
                    $("#loader").show();
                },
                success: function (data) {
                    let html =`
                    <table class="table table-bordered table-striped table-hover" id="tableListStocks">
                    <thead>
                        <tr class="text-center" style="white-space:nowrap">
                            <th>Item Code</th>
                            <th>Item Name</th>
                            <th>Item Category</th>
                            <th>Item Classification</th>
                            <th>Storage Name</th>
                            <th>Department</th>
                            <th>UOM</th>
                            <th>Beginning Qty</th>
                            <th>Purchased</th>
                            <th>Used</th>
                            <th>Borrowed Item</th>
                            <th>Returned Item</th>
                            <th>Transferred Item</th>
                            <th>Disposed Item</th>
                            <th>End Qty</th>
                            <th>Unit Cost</th>
                            <th>Reorder Point</th>
                        </tr>
                    </thead>
                    <tbody>
                    `
                    if (data.length > 0) {
                        data.map((item, index) => {
                            html += `
                            <td class="text-center">${++index}</td>
                            <td class="text-center">${item.itemCode}</td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td> 
                            <td class="text-center"></td>
                            </tr>`;    

                        });     

                    }    
                    html += `
                        </tbody>
                     </table>`; 
                    
                    setTimeout(() => {
                        $("#loader").hide();
                        $("#table_content").html(html);
                        initDataTables();
                 }, 500);            

                }
            })  
        }      
        
    });
    
      
});