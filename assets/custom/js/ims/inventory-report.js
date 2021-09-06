$(document).ready(function(){
    itemData();
    initAll();
});

$(document).on("change","#itemSelect", function(){
    let classificationID = $(this).val();
    initDataTables();
    tableContent(classificationID);
    
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
                    { targets: 0, width: 150  },
                    { targets: 1, width: 150  },
                    { targets: 2, width: 200 },
                    { targets: 3, width: 200 },
                ],
            });
}

function tableContent(classificationID){
        unique = [];
        let searchFilter = `ii.classificationID=${classificationID} AND materialUsageStatus = 2`;
        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: `ims_stock_in_tbl AS si 
                                        LEFT JOIN ims_inventory_item_tbl AS  ii ON si.itemID = ii.itemID
                                        LEFT JOIN ims_stock_in_total_tbl AS sit ON si.itemID = sit.itemID
                                        LEFT JOIN ims_material_withdrawal_details_tbl AS mwd ON  si.itemID = mwd.itemID
                                        LEFT JOIN ims_material_usage_tbl AS imu ON  mwd.materialUsageID = imu.materialUsageID`,
                            columnName:`si.barcode,si.itemID,ii.itemName,SUM(mwd.quantity) as quantity,
                                        DATE_FORMAT(si.expirationDate,'%M% %d%, %Y') AS expirationDate,
                                        IFNULL(DATE_FORMAT(si.manufacturedDate,'%M% %d%, %Y'),'') AS manufactureDate`, searchFilter:searchFilter, groupBy : `si.barcode`},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableItemList">
                        <thead>
                            <tr>
                                <th>Barcode</th>
                                <th>Usage Quantity</th>
                                <th>Manufacture Date</th>
                                <th>Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        html +=`<tr>
                                    <td>${item.barcode}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.manufactureDate}</td>
                                    <td class="text-lift">${item.expirationDate}</td>
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

function itemData(classificationID = false){
    let html = `<select class="form-control select2 validate" id="itemSelect">`;
            html += `<option ${classificationID == false && "selected"} disabled>Select Classification</option>`;
            let tableData = getTableData(`ims_inventory_classification_tbl`, "classificationID,classificationName", "classificationName LIKE'%Equipment%'");
            tableData.map(items => { 
                    html +=  `<option  value    = "${items.classificationID}" 
                                        ${items.classificationID == classificationID && "selected"}>
                                        ${items.classificationName}
                              </option>`;
            });
    html += `</select>`; 
    
    $("#select2itemName").html(html);

}


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
