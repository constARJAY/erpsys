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
	    searching: true,
	    paging: true,
            columnDefs: [
                { targets: 0, width: 100},
                { targets: 1, width: 200},
                { targets: 2, width: 150},
                { targets: 3, width: 120},
                { targets: 4, width: 200},
                { targets: 5, width: 100},
                { targets: 6, width: 200},
                { targets: 7, width: 100},
                { targets: 8, width: 200},
                { targets: 9, width: 200},
                { targets: 10, width: 150},
                { targets: 11, width: 200},
                { targets: 12, width: 150},
                { targets: 13, width: 150},
                { targets: 14, width: 100},
                { targets: 15, width: 40},
                { targets: 16, width: 150},
                
            ],
        });
    }
  
    // ----- END DATATABLES -----


    
    $(document).on("click", "#btnSearch", function() {
        var classificationID    =$("#input_classificationID").val();
        var categoryID          = $("#input_categoryID").val();
       // var inventoryStorageID  = $("#input_inventoryStorageID").val();
        initDataTables();
        tableContent(classificationID,categoryID);          
    });
    $(document).on("click",".priceListRow-show-more",function(){
        let target = $(this).attr("target");
        if($(target).hasClass("hide")){
            $(this).find("i").addClass("zmdi-caret-up").removeClass("zmdi-caret-down");
            $(this).find("span").text("Hide");
            $(target).show(550);
            $(target).addClass("show").removeClass("hide");
        }else{
            $(this).find("i").addClass("zmdi-caret-down").removeClass("zmdi-caret-up");;
            $(this).find("span").text("Show More");
            $(target).hide(550);
            $(target).addClass("hide").removeClass("show");
        }
    });

    
    function tableContent(classificationID,categoryID){

        $.ajax({
            url: `${base_url}ims/list_stocks/getliststocks`,
            method: "POST",
            data: {
                classificationID: classificationID,
                categoryID:       categoryID,
            },
            async: true,
            dataType: "json",
            beforeSend: function() {
            $("#table_content").html(preloader);
            },
            success: function(data) {
                          let html = `
                             <table class="table table-bordered table-striped table-hover" id="tableListStocks">
                                 <thead>
                                     <tr>
                                        <th>Item Code</th>
                                        <th>Item Name</th>
                                        <th>Item Classification</th>
                                        <th>UOM</th>
                                        <th>Barcode</th>
                                        <th>Strorage Code</th>
                                        <th>Storage Name</th>
                                        <th>Stock In</th>
                                        <th>Withdrawn Quantity</th>
                                        <th>Unused Quantity</th>
                                        <th>Borrowed Quantity</th>
                                        <th>Returned Quantity</th>
                                        <th>Transferred Quantity</th>
                                        <th>Disposed Quantity</th>
                                        <th>End Quantity</th>
                                        <th>Total</th>
                                        <th>Reorder Point</th>
                                     </tr>
                                </thead>
                                    <tbody>`;

                                    data.map((item, index, array) => { 
                                        html += `
                                        <tr> 
                                         <td>${item["itemCode"]}</td> 
                                         <td>${item["itemName"]}</td> 
                                         <td>${item["itemClassification"]}</td>
                                         <td>${item["UOM"]}</td>
                                         <td>${item["barcode"]}</td>
                                         <td>${item["storageCode"]}</td>
                                         <td>${item["StorageName"]}</td>
                                         <td class="text-center">${item["stockInQuantity"]}</td>
                                         <td class="text-center">${item["widhdrawn"]}</td>
                                         <td class="text-center">${item["unusedQuantity"]}</td>
                                         <td class="text-center">${item["borrowedQuantity"]}</td>
                                         <td class="text-center">${item["returnQuantity"]}</td>
                                         <td class="text-center">${item["transferredQuantity"]}</td>
                                         <td class="text-center">${item["disposalQuantity"]}</td>
                                         <td class="text-center">${item["stockIN"]}</td>    
                                         <td class="text-center">${item["stockIN"]}</td>
                                         <td class="text-center">${item["reorderpoint"]}</td>

                                         </tr>`;
                                    })
                                    html += `</tbody>
                                    </table>`;
                                    initDataTables();
                                    setTimeout(() => {
                                        $("#table_content").html(html);
                                        initDataTables();
                                        $(".price-list-description-row").hide();
                                    }, 500);   
                    
                            },
                            error: function() {
                                let html = `
                                    <div class="w-100 h5 text-center text-danger>
                                        There was an error fetching data.
                                    </div>`;
                                $("#table_content").html(html);
                                

         } 
    
        }); 
    }
})

