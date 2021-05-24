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
	    searching: false,
	    paging: false,
            columnDefs: [
                { targets: 0, width: 100},
                { targets: 1, width: 100},
                { targets: 2, width: 150},
                { targets: 3, width: 40},
                { targets: 4, width: 1300},
                { targets: 5, width: 100},
                { targets: 6, width: 100},
                { targets: 7, width: 100}
                
            ],
        });
    }
  
    // ----- END DATATABLES -----


    
    $(document).on("click", "#btnSearch", function() {
        var classificationID    =$("#input_classificationID").val();
        var categoryID          = $("#input_categoryID").val();
        var inventoryStorageID  = $("#input_inventoryStorageID").val();
        initDataTables();
        tableContent(classificationID,categoryID,inventoryStorageID);          
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

    
    function tableContent(classificationID,categoryID,inventoryStorageID){
        let searchFilter = `iii.classificationID=${classificationID} AND iii.categoryID=${categoryID} AND isit.inventoryStorageID=${inventoryStorageID}`;
        //alert(searchFilter);
        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: 
            `ims_stock_in_total_tbl                     AS isit
            LEFT JOIN ims_inventory_item_tbl            AS iii  ON isit.itemID = iii.itemID 
            LEFT JOIN  ims_inventory_classification_tbl	AS iiic ON iii.classificationID = iiic.classificationID`,columnName: `isit.inventoryStorageID,isit.itemID,isit.itemName,isit.quantity,
            concat('ITM-',LEFT(iii.createdAt,2),'-',LPAD(iii.itemID,5,'0')) AS itemCode
            ,iii.unitOfMeasurementID,iiic.classificationName,iii.reOrderLevel`, searchFilter:searchFilter},
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
                            <th class="text-center">Item List Description</th>
                            <th>End Quantity</th>
                            <th>Total</th>
                            <th>Reorder Point</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.map((item, index, array) => {  
                    var isEven = (index % 2) == 0 ? false : true;
                    //alert(isEven);
                    var Discription = "";
                    var DiscriptionListData = getTableData(`ims_stock_in_tbl 						    AS isi  
                                                            LEFT JOIN ims_inventory_storage_tbl 		AS iis ON isi.stockInLocationID = iis.inventoryStorageID
                                                            LEFT JOIN ims_borrowing_details_tbl 		AS ibd ON isi.barcode = ibd.barcode
                                                            LEFT JOIN ims_inventory_disposal_details_tbl AS iidd ON isi.barcode =iidd.barcode`,
                                                         `isi.itemID,isi.stockInLocationID AS inventoryStorageID,isi.barcode,
                                                         concat('ISM-',LEFT(iis.createdAt,2),'-',LPAD(iis.inventoryStorageID,5,'0')) AS storageCode, iis.inventoryStorageOfficeName,
                                                         isi.stockInQuantity,'' AS Withdrawn,'' AS Unused, isi.itemName AS borrowedItem,'' AS returnItem,'' AS  TransferredItem,
                                                         IFNULL(iidd.itemName,'') AS disposalName`,`isi.itemID=${item.itemID} AND isi.stockInLocationID =${inventoryStorageID}`);
                    if(DiscriptionListData.length < 1){
                        Discription += "<div class='w-100 text-left'>-</div>";
                }else{  
                    Discription += `<div class="container-fluid">
                    <div class="row">
                        <div class="  text-center border rounded-left  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:12%;">Barcode</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:10%;">Storage Code</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:19%;">Storage Name</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:7%;">Stock In</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:7%;">Withdrawn</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:5%;">Unused</div>
                        <div class=" text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:10%;">Borrowed Item</div>
                        <div class="  text-center border font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:10%;">Returned Item</div>
                        <div class="  text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:10%;">Transferred Item</div>
                        <div class=" text-center border  font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important;width:10%;">Disposed Item</div>
                    </div>
                    <div class="row price-list-description-row hide" id="priceListRow${item.itemID}">`;
                    DiscriptionListData.map(barcodeItems=>{
                        //alert( `${barcodeItems["stockInLocationID"]}`);
                    Discription += `<div class="  text-left"style="width:12%;">${barcodeItems["barcode"]}</div>
                    <div class="text-left" style="width:10%;">${barcodeItems["storageCode"]}</div>
                    <div class="  text-left"style="width:19%;">${barcodeItems["inventoryStorageOfficeName"]}</div>
                    <div class=" text-center"style="width:7%;">${barcodeItems["stockInQuantity"]}</div>
                    <div class="  text-left"style="width:7%;">${barcodeItems["Withdrawn"]}</div>
                    <div class="  text-center"style="width:5%;">${barcodeItems["Unused"]}</div>
                    <div class="  text-left"style="width:10%;">${barcodeItems["borrowedItem"]}</div>
                    <div class=" text-left"style="width:10%;">${barcodeItems["returnItem"]}</div>
                    <div class="  text-left"style="width:10%;">${barcodeItems["TransferredItem"]}</div>
                    <div class=" text-left"style="width:10%;">${barcodeItems["disposalName"]}</div>`;
                    });
        Discription +=` </div>   
                            <div class="w-100 d-flex justify-content-end">
                                <button class="btn btn-default btn-add waves-effect d-flex align-items-center priceListRow-show-more" id="showMore${item.itemID}" target="#priceListRow${item.itemID}" type="button">
                                    <i class="zmdi zmdi-caret-down"></i>&nbsp; <span>Show More</span>
                                </button>
                            </div>    
                         </div>
                         </div>`;   
                    
                }   
                html += `
                <tr>
                    <td>${item["itemCode"]}</td>
                    <td>${item["itemName"]}</td>
                    <td>${item["classificationName"]}</td>
                    <td>${item["unitOfMeasurementID"]}</td>
                    <td class="text-center">${Discription}</td>
                    <td class="text-center">${item["quantity"]}</td>
                    <td class="text-center">${item["reOrderLevel"]}</td>
                    <td class="text-center">${item["reOrderLevel"]}</td>
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

    })
    }     
    
      
}); 