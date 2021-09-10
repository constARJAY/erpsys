$(document).ready(function(){
   itemData();
    initAll();
});

// FUNCTIONS
function initDataTables() {
            if ($.fn.DataTable.isDataTable('#tableItemList')){
                $('#tableItemList').DataTable().destroy();
            }
            
            var table = $("#tableItemList").css({"min-width": "100%"}).removeAttr('width').DataTable({
                proccessing:    false,
                serverSide:     false,
                scrollX:        true,
                scrollCollapse: true,
                columnDefs: [
                    { targets: 0, width: 100  },
                    { targets: 1, width: 200  },
                    { targets: 2, width: 70 },
                    { targets: 3, width: 80 },
                    { targets: 4, width: 120 },
                    { targets: 5, width: 150 },
                    { targets: 6, width: 150 },
                    { targets: 7, width: 150 },
                    { targets: 8, width: 100 },
                ],
            });
}

function tableContent(classificationID,categoryID){
    //$('#table_content').DataTable().clear().destroy();
        //$('#table_content').empty();
    let searchFilter  = `iii.classificationID=${classificationID}`;
        if(categoryID=="0"){
            searchFilter  = `iii.classificationID=${classificationID}`;
        }else{
            searchFilter  = `iii.classificationID=${classificationID} AND iii.categoryID=${categoryID}`;
        }
       
        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: `ims_stock_in_tbl AS  ii
                                        LEFT JOIN ims_inventory_item_tbl AS iii ON ii.itemID = iii.itemID
                                        LEFT JOIN ims_stock_in_total_tbl AS isit ON ii.barcode = isit.barcode
                                        LEFT JOIN ims_inventory_storage_tbl AS iis ON isit.inventoryStorageID = iis.inventoryStorageID`,
                                    columnName:`itemCode,CONCAT(iii.itemName,' / ',brandName) as itemAndBrand,isit.quantity,unitofMeasurementID,
                            iis.inventoryStorageOfficeName,isit.barcode,IFNULL(DATE_FORMAT(ii.manufacturedDate,'%M% %d%, %Y'),'') AS manufactureDate, 
                            DATE_FORMAT(ii.expirationDate,'%M% %d%, %Y') AS expirationDate`, searchFilter:searchFilter, groupBy : `isit.barcode`},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    var a = {};
                    let counts = {};
                    let result1 = '';
                    var itemcode = '';
                    var itemBrand = '';
                    var spanrowlenght = '';
                    a = data;
                    //console.log(a);
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableItemList">
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name/Brand</th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Storage Name</th>
                                <th>Barcode</th>
                                <th>Manufactured date</th>
                                <th>Expiration date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>`;
                      
                        for (let i = 0; i < a.length; i++) {
                        	if (counts[a[i]]) {
                        		counts[a[i]] += 1
                        		itemcode = a[i].itemCode;
                        		itemBrand = a[i].itemAndBrand;
                        	} else {
                        		counts[a[i]] = 1
                        		itemcode = a[i].itemCode;
                        		itemBrand = a[i].itemAndBrand;
                        	}
                        }
                        for (let prop in counts) {

                        	if (counts[prop] >= 2) {
                        		spanrowlenght = counts[prop];
                        		result1 += `
                                <td rowspan="${spanrowlenght}">${itemcode}</td>
                                <td rowspan="${spanrowlenght}">${itemBrand}</td>
                                `;
                        	}
                        	//console.log(counts)

                        	//console.log(valuedata);
                        }
                    data.map((item, index, array) => {
                    
                        html +=`<tr>
                                    ${index < 1 ? result1 : ''}
                                    <td>${item.quantity}</td>
                                    <td class="text-lift">${item.unitofMeasurementID}</td>
                                    <td>${item.inventoryStorageOfficeName}</td>
                                    <td>${item.barcode}</td>
                                    <td>${item.manufactureDate}</td>
                                    <td></td>
                                    <td></td>
                                </tr>`;
                    })      
                    html += `</tbody>
                    </table>`;  
                    //initDataTables();
                    if ($.fn.DataTable.isDataTable('#tableItemList')){
                        $('#tableItemList').DataTable().destroy();
                        
                    }
                   
                    //initDataTables();
                   // $('#table_content').DataTable().clear().destroy();
                    setTimeout(() => {
                       
                      // $('#table_content').DataTable().clear().destroy();
                        $("#table_content").html(html);
                        //initDataTables();
                       
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

$(document).on("change","#input_classificationID",function(){
    let thisValue   =   $(this).val();
    categoryContent(thisValue);
});

function itemData(classificationID = false){
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    const data = getTableData("ims_inventory_classification_tbl", 
        "classificationID ,classificationName", "classificationStatus = 1", "");
      
            let html =`<option selected disabled>Select Item Classification</option>`;
            data.map((item, index, array) => {
                html += `<option value="${item.classificationID}" ${classificationID && item.classificationID == classificationID[0].classificationID && "selected"}>${item.classificationName}</option>`;
            })
            $("#input_classificationID").html(html);
}
function categoryContent(classificationID = false) {
    // getTableData(tableName = null, columnName = “”, WHERE = “”, orderBy = “”) 
    let paramCondition = classificationID == false ? "":" AND classificationID="+classificationID;

    const data = getTableData("ims_inventory_category_tbl", "categoryID ,categoryName", "categoryStatus = '1'"+paramCondition, "");

            let html =`<option value="0">All</option>`;
            //let html = ` <option value="" disabled ${condition == "add" ? "selected": ""}>Select Item Category</option>`;
            if(classificationID != false){
                    data.map((item, index, array) => {
                    html += `<option value="${item.categoryID}" ${item.classificationID == classificationID && condition != "add" ? "selected":""}>${item.categoryName}</option>`;
                    
                })
            }
            $("#input_categoryID").html(html);

} 
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
   if (countErrors > 0) {
    //showErrorToast("Please fill in required fields");
    return false;
   }else{
    //initDataTables();
    if ($.fn.DataTable.isDataTable('#tableItemList')){
        $('#tableItemList').DataTable().destroy();
        
    }
   
   // $('#tableItemList').DataTable();

    
    // $('#table_content').DataTable().clear().destroy();
    // $('#table_content').empty();       
    tableContent(classificationID,categoryID);
   } 
});    


// ----- GET FORM CODE -----
function getFormCode(str = null, date = null, id = 0) {
	if (str && date) {
		let codeID = id ? id.toString() : "0";
		codeID =
			codeID.length < 5 ? "0".repeat(5 - codeID.length) + codeID : codeID;
		let codeDate = moment(date);
		codeDate = codeDate.isValid()
			? codeDate.format("YY")
			: moment().format("YY");
		return `${str}-${codeDate}-${codeID}`;
	}
	return null;
}
// ----- END GET FORM CODE -----
