$(document).ready(function(){


        



    // ----- DATATABLES -----
    function initDataTables(data) {
       // data
        if ($.fn.DataTable.isDataTable('#tableListStocks')){
            $('#tableListStocks').DataTable().destroy();
            
        }
        
        var table = $("#tableListStocksItem").css({"min-width": "100%"}).removeAttr('width').DataTable({
            
           data,
            proccessing:    true,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
	        searching: true,
          
	    paging: true,
            columnDefs: [
                { targets: 0, width: 100},
                { targets: 1, width: 200},
                { targets: 2, width: 250},
                { targets: 3, width: 120},
                { targets: 4, width: 200},
                { targets: 5, width: 100},
                { targets: 6, width: 200},
                { targets: 7, width: 100},
                { targets: 8, width: 200},
                { targets: 9, width: 200},
                { targets: 10, width: 150},
                { targets: 11, width: 200},    
            ],
          
        });

        var table = $("#tableListStocksAsset").css({"min-width": "100%"}).removeAttr('width').DataTable({
            
            data,
             proccessing:    true,
             serverSide:     false,
             scrollX:        true,
             scrollCollapse: true,
             searching: true,
           
         paging: true,
             columnDefs: [
                 { targets: 0, width: 100},
                 { targets: 1, width: 200},
                 { targets: 2, width: 250},
                 { targets: 3, width: 120},
                 { targets: 4, width: 200},
                 { targets: 5, width: 100},
                 { targets: 6, width: 200},
                 { targets: 7, width: 100},
                 { targets: 8, width: 200},
                 { targets: 9, width: 200},
                 { targets: 10, width: 150},
                 { targets: 11, width: 200},   
                 { targets: 12, width: 200},    
             ],
           
         });
        
       
    
    }
  
    // ----- END DATATABLES -----

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
            
            $("#table_content").html(preloader);
            },
            success: function(data) {
               

                let item =`
                <div class="card">
                <div class="card-header bg-primary text-white">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 text-left align-self-center">
                            <h5 style="font-weight: bold;
                                letter-spacing: 0.05rem;">List of Stocks (ITEM)</h5>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered table-striped table-hover" id="tableListStocksItem">
                <thead>
                <tr>
                    <th>Item Code</th>
                    <th>Item Name/Brand</th>
                    <th>Item Classification</th>
                    <th>UOM</th>
                    <th>Stock In</th>
                    <th>Stock Out</th>
                    <th>Unused</th>
                    <th>Disposed</th>
                    <th>Reserved</th>
                    <th>Available</th>
                    <th>Total Quantity</th>
                    <th>Re-order</th>
                </tr>
               </thead>
               <tbody>`;
               
              

                           let assets =`
                           <div class="card mt-2">
                            <div class="card-header bg-primary text-white">
                                <div class="row">
                                    <div class="col-md-6 col-sm-12 text-left align-self-center">
                                        <h5 style="font-weight: bold;
                                            letter-spacing: 0.05rem;">List of Stocks (ASSET)</h5>
                                    </div>
                                </div>
                            </div>
                             <table class="table table-bordered table-striped table-hover" id="tableListStocksAsset">
                             <thead>
                             <tr>
                                <th>Asset Code</th>
                                <th>Asset Name</th>
                                <th>Item Classification</th>
                                <th>UOM</th>
                                <th>Stock In</th>
                                <th>Borrowed</th>
                                <th>Returned</th>
                                <th>Transferred</th>
                                <th>Disposed</th>
                                <th>Reserved</th>
                                <th>Available</th>
                                <th>Total Quantity</th>
                                <th>Re-order</th>
                             </tr>
                            </thead>
                            <tbody>`;
                            for(var i=0; i<data["assets"].length; i++){
                                assets +=`  
                                <tr> 
                                    <td>${data["assets"][i].itemCode} </td> 
                                    <td>
                                        <div>
                                        ${data["assets"][i].itemName}
                                        </div>
                                        <small style="color:#848482;">${data["assets"][i].brand}</small>
                                    </td>
                                    <td>
                                        <div>
                                        ${data["assets"][i].classificationName}
                                        </div>
                                        <small style="color:#848482;">${data["assets"][i].categoryName}</small>
                                    </td>
                                    <td>
                                        ${data["assets"][i].uom}
                                    </td>
                                    <td>
                                    ${data["assets"][i].stockIN}
                                    </td> 
                                    <td>
                                    </td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td> 
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>`;
                            };    
                           for(var i=0; i<data["item"].length; i++){
                 
                            item +=`
                            <tr> 
                                <td> 
                                    ${data["item"][i].itemCode}
                                </td> 
                                <td>
                                    <div>
                                    ${data["item"][i].itemName}
                                    </div>
                                    <small style="color:#848482;">${data["item"][i].brand}</small>
                                </td>
                                <td>
                                    <div>
                                    ${data["item"][i].classificationName}
                                    </div>
                                <small style="color:#848482;">${data["item"][i].categoryName}</small>
                                </td>
                                <td>
                                ${data["item"][i].uom}
                                </td>
                                <td>
                                ${data["item"][i].stockIN}
                                </td> 
                                <td>
                                ${data["item"][i].stockOut}
                                </td>
                                <td>
                                ${data["item"][i].unused}
                                </td>
                                <td>
                                ${data["item"][i].disposed}
                                </td>
                                <td>
                                ${data["item"][i].reservedItem}
                                </td> 
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                           </tr>`;
                            };
                          
                                  initDataTables();
                                    setTimeout(() => {
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

