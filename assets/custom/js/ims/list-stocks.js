$(document).ready(function(){
    const ASSETDATA = getTableData(`ims_inventory_asset_tbl`,`assetID, assetImage`);
    const ITEMDATA  = getTableData(`ims_inventory_item_tbl`,`itemID, itemImage`);

   let html = `
            <div class="text-center">
				<div class="row">
				<div class="col-4"></div>
				<div class="col-4"><img class="img-fluid" src="${base_url}assets/modal/no-data.gif" alt=""> <h6 class="text-primary text-center font-weight-bold">No data available</h6>
				</div>
				<div class="col-4"></div>
			</div>
            </div>`;

    $(".imageboarder").html(html);


        



    // ----- DATATABLES -----
    function initDataTables(data) {
       // data
        if ($.fn.DataTable.isDataTable('#tableListStocksItem')){
            $('#tableListStocksItem').DataTable().destroy();
            
        }
        if ($.fn.DataTable.isDataTable('#tableListStocksAsset')){
            $('#tableListStocksAsset').DataTable().destroy();
            
        }
        
        var table = $("#tableListStocksItem").css({"min-width": "100%"}).removeAttr('width').DataTable({
            
           data,
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            sorting: [],
	        searching: true,
            info: true,
	        paging: true,
            lengthMenu: [[50, -1], [50, "All"]],
            columnDefs: [
                { targets: 0, width: 170},
                { targets: 1, width: 250},
                { targets: 2, width: 250},
                { targets: 3, width: 120},
                { targets: 4, width: 200},
                { targets: 5, width: 150},
                { targets: 6, width: 200},
                { targets: 7, width: 150},
                { targets: 8, width: 200},
                { targets: 9, width: 200},
                { targets: 10, width: 150},
                { targets: 11, width: 200},  
                // { targets: 12, width: 200},   
            ],
          
        });

        var table = $("#tableListStocksAsset").css({"min-width": "100%"}).removeAttr('width').DataTable({
            
            
             proccessing:    false,
             serverSide:     false,
             scrollX:        true,
             scrollCollapse: true,
             sorting: [],
             searching: true,
             info: true,
            paging: true,
            lengthMenu: [[50, -1], [50, "All"]],
             columnDefs: [
                 { targets: 0, width: 170},
                 { targets: 1, width: 250},
                 { targets: 2, width: 250},
                 { targets: 3, width: 120},
                 { targets: 4, width: 200},
                 { targets: 5, width: 100},
                 { targets: 6, width: 200},
                 { targets: 7, width: 100},
                 { targets: 8, width: 200},
                 { targets: 9, width: 200},
                 { targets: 10, width: 150},
                 { targets: 11, width: 150},   
                 { targets: 12, width: 200},    
                 { targets: 13, width: 200},    
             ],
           
         });
        
       
    
    }
  
    // ----- END DATATABLES -----


    //  tab toggle function//
    $(document).on("click", ".tabBtn", function() {
        setTimeout(() => {                         
            initDataTables();
        }, 200);
    })
    //  tab toggle function//

    $(document).on("click", "#btnSearch", function() {
        var classificationID    =$("#input_classificationID").val();
        var categoryID          = $("#input_categoryID").val();
        var countErrors   = 0;
       if(classificationID ===null){
        $("[aria-labelledby='select2-input_classificationID-container']").removeClass("no-error").addClass('has-error');
        $("#invalid-input_classificationID").html("Please select data");
        countErrors++;
       }else{
        $("[aria-labelledby='select2-input_classificationID-container']").removeClass("has-error").addClass("no-error");
        $("#invalid-input_classificationID").html("");
        //tableContent(classificationID,categoryID);  
       }
       if(categoryID ===null){
        $("[aria-labelledby='select2-input_categoryID-container']").removeClass("no-error").addClass('has-error');
        $("#invalid-input_input_categoryID").html("Please select data");
        countErrors++;
       }else{
        $("[aria-labelledby='select2-input_categoryID-container']").removeClass("has-error").addClass("no-error");
        $("#invalid-input_input_categoryID").html("");
       }
       if (countErrors > 0) {
        //showErrorToast("Please fill in required fields");
        return false;
       }else{
          // tab1();
        //   let  html =` <div class="row clearfix appendHeader">
        //             <div class="col-12">
        //                 <ul class="nav nav-tabs">
        //                     <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#listofStocks" redirect="listofStocks">List of Stocks (ITEM) </a></li>
        //                     <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#listofAssets" id="listofAssets" redirect="listofAssets">List of Stocks (ASSET)</a></li>
        //                 </ul>
        //             </div>
        //         </div>`;
        tableContent(classificationID,categoryID);
       // tab1();
        ///$("#table_content").html(html);
       } 

    });
     function tableContent(classificationID,categoryID){
        
       
    var id = [];
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
            $('.imageboarder').show();
            $(".imageboarder").html(preloader);
            $("#tabButton").html('');
            $("#table_content").html('');
            $("#table_content1").html('');
            },
            success: function(data) {
                          let tabs =`<ul class="nav nav-tabs" style="padding:15px;">
                          <li class="active"><a data-toggle="tab" href="#itemPage" class="btn btn-primary ml-2 mr-2 active tabBtn">Items</a></li>
                          <li><a data-toggle="tab" href="#assetPage" class="btn btn-primary tabBtn">Assets</a></li>
                        </ul>`;

                          let assets =`
                           <div class="col-sm-12">
                            <div class="w-100">
                            
                           <div class="card mt-2 bg-white rounded shadow-sm">
                            <div class="card-header bg-primary text-white">
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 text-left align-self-center">
                                        <h5 style="font-weight: bold;
                                            letter-spacing: 0.05rem;">List of Stocks (ASSET)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            <div class="w-100">
                                <div class="text-left"></div>
                             <table class="table table-bordered table-striped table-hover" id="tableListStocksAsset">
                             <thead>
                             <tr>
                                <th>Asset Code</th>
                                <th>Asset Name</th>
                                <th>Asset Classification</th>
                                <th>UOM</th>
                                <th>Stock In</th>
                                <th>Borrowed</th>
                                <th>Withdrawn</th>
                                <th>Returned</th>
                                <th>Transferred</th>
                                <th>Disposed</th>
                                <th>Reserved</th>
                                <th>Re-order</th>
                                <th>Available</th>
                                <th>Total Quantity</th>
                             </tr>
                            </thead>
                            <tbody>`;
                            for(var i=0; i<data["assets"].length; i++){
                                var assetTotalQty = parseFloat( data["assets"][i].stockIN) - (parseFloat(data["assets"][i].totalequipmentBorrowing) + parseFloat(data["assets"][i].materiaWithdrawalQuantity) + parseFloat(data["assets"][i].disposed) );
                                var assetAvailableStocks  = parseFloat(assetTotalQty) - (parseFloat(data["assets"][i].reservedAsset) + parseFloat(data["assets"][i].reOrderLevel) );
                                let getAssetData          = ASSETDATA.filter(x=> x.assetID == data["assets"][i].assetID);
                                assets +=`  
                                <tr> 
                                    <td>${data["assets"][i].assetCode} </td> 
                                    <td>

                                        <div class="d-flex justify-content-start align-items-center">
                                            <img src="${base_url}assets/upload-files/inventory-assets/${getAssetData[0].assetImage || "noimage.jpg"}" alt="${data["assets"][i].assetName}" title="${data["assets"][i].assetName}" class="rounded rounded-circle" style="width: 50px; height: 50px">
                                            <div class="ml-2">
                                                <div> ${data["assets"][i].assetName} </div>
                                                <small style="color:#848482;">${data["assets"][i].brand}</small>
                                            </div>   
                                        </div>    


                                       
                                    </td>
                                    <td>
                                        <div>
                                        ${data["assets"][i].classificationName}
                                        </div>
                                        <small style="color:#848482;">${data["assets"][i].categoryName}</small>
                                    </td>
                                    <td>${data["assets"][i].uom}</td>
                                    <td class="text-center">${data["assets"][i].stockIN}</td> 
                                    <td class="text-center">${data["assets"][i].totalequipmentBorrowing}</td>
                                    <td class="text-center">${data["assets"][i].materiaWithdrawalQuantity}</td>
                                    <td class="text-center">${data["assets"][i].returnQuantity}</td>
                                    <td class="text-center">${data["assets"][i].Transferred}</td>
                                    <td class="text-center">${data["assets"][i].disposed}</td> 
                                    <td class="text-center">${data["assets"][i].reserved}</td> 
                                    <td class="text-center">${formatAmount(data["assets"][i].reOrderLevel)}</td>
                                    <td class="text-center">${formatAmount(data["assets"][i].available) }</td>
                                    <td class="text-center">${formatAmount(data["assets"][i].totalQuantity)}</td>
                                </tr>`;
                            }
                            assets +=`</tbody>
                            </table>`;

                            let item =`
                             
                            <div class="col-sm-12">
                            <div class="w-100">
                            
                            <div class="card mt-2 shadow-sm bg-white rounded">
                            <div class="card-header bg-primary text-white">
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 text-left align-self-center">
                                        <h5 style="font-weight: bold;
                                            letter-spacing: 0.05rem;">List of Stocks (ITEM)</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            <div class="w-100">
                                <div class="text-left"></div>
                            <table class="table table-bordered table-striped table-hover" id="tableListStocksItem">
                            <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Item Classification</th>
                                <th>UOM</th>
                                <th>Stock In</th>
                                <th>Stock Out</th>
                                <th>Withdrawn</th>
                                <th>Unused</th>
                                <th>Reserved</th>
                                <th>Re-order</th>
                                <th>Available</th>
                                <th>Total Quantity</th>
                            </tr>
                           </thead>
                           <tbody>`;
                               
                           for(var i=0; i<data["item"].length; i++){
                            
                            // var itemTotalQuantity    =  parseFloat(data["item"][i].stockIN) - (parseFloat(data["item"][i].materiaWithdrawalQuantity + data["item"][i].totalStockOut));
                            // var itemAvailableStocks  = parseFloat(itemTotalQuantity) - (parseFloat(data["item"][i].reOrderLevel) + parseFloat(data["item"][i].reservedItem) );

                            var itemTotalQuantity    = data["item"][i].totalQuantity;
                            var itemAvailableStocks  = data["item"][i].available;
                            let getItemData          = ITEMDATA.filter(x=> x.itemID == data["item"][i].itemID);
                            item +=`
                            <tr> 
                                <td> 
                                    ${data["item"][i].itemCode}
                                </td> 
                                <td>
                                    <div class="d-flex justify-content-start align-items-center">
                                        <img src="${base_url}assets/upload-files/inventory-items/${getItemData[0].itemImage || "noimage.jpg"}" alt="${data["item"][i].itemName}" title="${data["item"][i].itemName}" class="rounded rounded-circle" style="width: 50px; height: 50px">
                                        <div class="ml-2">
                                            <div> ${data["item"][i].itemName} </div>
                                            <small style="color:#848482;">${data["item"][i].brand}</small>
                                        </div>   
                                    </div>                                 
                                </td>
                                <td>
                                    <div>
                                    ${data["item"][i].classificationName}
                                    </div>
                                    <small style="color:#848482;">${data["item"][i].categoryName}</small>
                                </td>
                                <td class="text-center">${data["item"][i].uom}</td>
                                <td class="text-center">${data["item"][i].stockIN}</td> 
                                <td class="text-center">${data["item"][i].stockOut}</td>
                                <td class="text-center">${data["item"][i].materiaWithdrawalQuantity}</td>
                                <td class="text-center">${data["item"][i].Unused}</td>
                                <td class="text-center">${ /*data["item"][i].reservedItem*/ data["item"][i].reserved }</td> 
                                <td class="text-center">${formatAmount(data["item"][i].reOrderLevel)}</td>
                                <td class="text-center">${itemAvailableStocks <= "0" ? "0.00" : formatAmount(itemAvailableStocks)}</td>
                                <td class="text-center">${itemTotalQuantity <= "0" ? "0.00" : formatAmount(itemTotalQuantity)}</td>
                           </tr>`;
                            }
                            item +=`</tbody>
                            </table>
                            `;
        
        
                                 
                          

                                  initDataTables();
                                  
                                    setTimeout(() => {
                                        
                                        $('.imageboarder').hide();
                                        $("#tabButton").html(tabs);
                                        $("#table_content").html(item);
                                       $("#table_content1").html(assets);
                                     
                                       initDataTables();
                                    }, 500);   
                    
                            },
                            
                            error: function() {
                                let html = `
                                    <div class="w-100 h5 text-center text-danger>
                                        There was an error fetching data.
                                    </div>`;
                                $("#table_content1").html(assets);
                                $("#table_content").html(item);
            
        }

        
    
        }); 
    }
    
  
       
    

})

