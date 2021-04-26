$(document).ready(function(){
    classificationData();
    initAll();
});

$(document).on("change","#classificationSelect", function(){
    let classificationID = $(this).val();
    initDataTables();
    tableContent(classificationID);
    
});

$(document).on("click", "#btnAddRow",function(){
    let html            = "";
    let lastTableRow    = parseInt($('#tablePriceList tr:last').attr("row")) + 1;
    html += `<tr class="price-list-row" row=${lastTableRow}>
                <td class="text-center align-items-center"><input type="checkbox" name="checklist-delete"></td>
                <td><div class="vendorcode">-</div></td>
                <td>
                    <select class="form-control select2 validate w-100" style="width:100%;" id="selectVendorID${lastTableRow}" name="inventoryVendorID" required></select>
                    <div class="invalid-feedback d-block" id="invalid-selectVendorID${lastTableRow}"></div>
                </td>
                <td>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                        </div>
                        <input type="text" class="form-control validate amount" min="1" max="99999999" data-allowcharacters="[0-9][.]" placeholder="0.00" required="" value="" autocomplete="off"  name="vendorCurrentPrice" id="currentPrice${lastTableRow}" value="0" style="text-align: right;">
                        <div class="invalid-feedback d-block" id="invalid-currentPrice${lastTableRow}"></div>
                    </div>
                </td>
                <td><div class="dateupdated">-</div></td>
                <td class="text-center align-items-center"><input type="checkbox" name="preferred" id="preferred${lastTableRow}"></td>
            </tr>`;
    $("#tablePriceList-body").append(html);
    getVendorOptions();
    priceListSelect2();
});

$(document).on("change","[name=inventoryVendorID]",function(){
    let vendorcode  = $('option:selected', this).attr("vendorcode");
    console.log(vendorcode);
    console.log(this);
    let datetoday   = moment(new Date()).format("MMMM DD, YYYY hh:mm:ss A");
    $(this).closest("tr").find(".vendorcode").text(vendorcode);
    $(this).closest("tr").find(".dateupdated").text(datetoday);
    $(this).closest("tr").find("[name=vendorCurrentPrice").val("");
    $(this).closest("tr").find("[name=preffered]").prop("checked", false);
   getVendorOptions(); 
});

$(document).on("click","[name=preferred]", function(){
    let thisID = $(this).attr("id");
    $("[name=preferred]").prop("checked", false);
    $("#"+thisID).prop("checked", true);
});

// THIS IS FOR THE CHECKBOX DELETING ROWS
    // CHECKBOXES
        $(document).on("click", "#checkAll", function(){
            let condition = $(this).prop("checked") ? true : false;
            $("[name=checklist-delete]").prop("checked",condition);
            $("#btnDeleteRow").prop("disabled",!condition);
        });

        $(document).on("click", "[name=checklist-delete]", function(){
            if($("[name=checklist-delete]:checked").length > 0){
                $("#btnDeleteRow").prop("disabled", false);
            }else{
                $("#btnDeleteRow").prop("disabled", true);
            }
        });
    // END CHECKBOXES
        $(document).on("click","#btnDeleteRow", function(){
            if($("[name=checklist-delete]:checked").length != $("[name=checklist-delete]").length){
                Swal.fire({
                    title:              "DELETE ROWS",
                    text:               "Are you sure to delete these rows?",
                    imageUrl:           `${base_url}assets/modal/delete.svg`,
                    imageWidth:         200,
                    imageHeight:        200,
                    imageAlt:           "Custom image",
                    showCancelButton:   true,
                    confirmButtonColor: "#dc3545",
                    cancelButtonColor:  "#1a1a1a",
                    cancelButtonText:   "No",
                    confirmButtonText:  "Yes"
                }).then((result) => {
                    if (result.isConfirmed) {
                        $(`[name=checklist-delete]:checked`).each(function(i, obj) {
                            var tableRow = $(this).closest('tr');
                            tableRow.fadeOut(500, function (){
                                $(this).closest("tr").remove();
                            });
                            $("#btnDeleteRow").prop("disabled",true);
                        })
                    }
                });
            }else{
                showNotification("danger", "You must have atleast one or more items.");
            }
        });

// END THIS IS FOR THE CHECKBOX DELETING ROWS


// OPENING MODAL
$(document).on("click",".editPriceList", function(){
    $(".modal_price_list_header").text("EDIT PRICE LIST");
    let itemID    =   $(this).data("itemid");
    let tableData   = getTableData("ims_inventory_item_tbl","","itemID="+itemID);

    $("#modal_price_list").modal("show");
    $("#modal_price_list_content").html(preloader);
    let modal_price_list_content    =   `   
                                            <div class="modal-body">  
                                                <form id="modal_price_list_form"> 
                                                    ${getItemPriceList(itemID)}
                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-update" id="btnUpdate" data-itemid="${itemID}"><i class="fas fa-save"></i>&nbsp;Update</button>
                                                <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i>&nbsp;Cancel</button>
                                            </div>  
                                            `;
        // if(){
        //     $("#btnUpdate").html(`<i class="fas fa-save"></i>&nbsp;Save`);
        // }else{
        //     $("#btnUpdate").html(`<i class="fas fa-save"></i>&nbsp;Save`);
        // }                                 
    setTimeout(function(){
        $("#modal_price_list_content").html(modal_price_list_content);
        getVendorOptions();
        initDataTables();
        priceListSelect2();
    },500);
            
      
});
// END OPENING MODAL

$(document).on("click",".priceListRow-show-more",function(){
    let target = $(this).attr("target");
    if($(target).hasClass("hide")){
        $(this).find("i").addClass("zmdi-caret-up").removeClass("zmdi-caret-down");
        $(target).show(550);
        $(target).addClass("show").removeClass("hide");
    }else{
        $(this).find("i").addClass("zmdi-caret-down").removeClass("zmdi-caret-up");;
        $(target).hide(550);
        $(target).addClass("hide").removeClass("show");
    }
});

// ACTION EVENTS BUTTONS
    $(document).on("click", "#btnUpdate", function(){
        let itemID      = $(this).data("itemid");
        let condition   = $("#input_classificationStatus").hasClass("is-invalid");
        if(!condition){   
            let validation  = validateForm("modal_price_list_form");
            if(validation){
                    var arrData = {id:itemID,items:[]};
                    $("#modal_price_list_form")
                        .find("select[required]")
                        .each(function (i) {
                            var vendorName    = this.value;
                            var currentPrice  = $(this).closest("tr").find("input[name=vendorCurrentPrice]").val();
                            var preffered     = $(this).closest("tr").find("input[name=preferred]").prop("checked");
                            var dateUpdated   = $(this).closest("tr").find(".dateupdated").text();
                                arrData[`items[${i}][itemID]`]              = itemID;
                                arrData[`items[${i}][inventoryVendorID]`]   = vendorName;
                                arrData[`items[${i}][vendorCurrentPrice]`]  = currentPrice;
                                arrData[`items[${i}][preferred]`]           = preffered ? "1" : "0";
                                arrData[`items[${i}][updatedAt]`]           = moment(dateUpdated).format("YYYY-MM-DD hh:mm:ss");;
                                arrData[`items[${i}][createdBy]`]           = sessionID;
                                arrData[`items[${i}][updatedBy]`]           = sessionID;
                    });
                Swal.fire({
                    title:  "ADD PRICE LIST", 
                    text:   "Are you sure that you want to add a new price list to the system?",
                    imageUrl: `${base_url}assets/modal/add.svg`,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonColor: '#1a1a1a',
                    cancelButtonText: 'No',
                    confirmButtonText: 'Yes',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url:      `${base_url}ims/inventory_price_list/add_price_list`,
                            method:   'POST',
                            async:    false,
                            dataType: 'json',
                            data:     arrData,
                            success:function(data){
                                let condition = data.split("|");
                                if(condition[0]){
                                    Swal.fire({
                                        icon:  'success',
                                        title: "Add new price list successfully saved!",
                                        showConfirmButton: false,
                                        timer: 2000
                                    }).then(reInit(itemID));
                                }else{
                                    showNotification("danger", condition[1]);
                                }
                            }
                        });
                    } else {
                        $("#modal_price_list").modal("show");
                    }
                });
            }
        }
    });

    $(document).on("click",".btnCancel", function(){
        let condition = isFormEmpty("modal_price_list_form");
        if(!condition){
            sweetAlertConfirmation("cancel", "Classification","modal_price_list");
        }else{
            $("#modal_price_list").modal("hide");
        }
    });
// END ACTION EVENTS BUTTONS





function reInit(id){
    let classificationID = $("#classificationSelect").val();
    initDataTables();
    tableContent(classificationID);
    $("#modal_price_list").modal("hide");
    console.log(id);
    setTimeout(() => {
        $(".price-list-description-row").hide();
        $("#priceListRow"+id).addClass("show").removeClass("hide");
        $("#priceListRow"+id).next().find("button i").addClass("zmdi zmdi-caret-up");
        $("#priceListRow"+id).show(750);
    }, 500);
}

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
                    { targets: 2, width: 1200 },
                    { targets: 3, width: 80}
                ],
            });

            if ($.fn.DataTable.isDataTable('#tablePriceList')){
                $('#tablePriceList').DataTable().destroy();
            }
            var table = $("#tablePriceList")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: false,
                searching: false,
                paging: false,
                ordering: false,
                info: false,
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: "5%"},
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 100 },
                    { targets: 4,  width: 100 },
                    { targets: 5,  width: "7%" },
				],
			});
}

function tableContent(classificationID){
        unique = [];
        let searchFilter = "classificationID="+classificationID;
        $.ajax({
                url:      `${base_url}operations/getTableData`,
                method:   'POST',
                async:    false,
                dataType: 'json',
                data:     {tableName: "ims_inventory_item_tbl", searchFilter:searchFilter},
                beforeSend: function() {
                    $("#table_content").html(preloader);
                },
                success: function(data) {
                    let html = `
                    <table class="table table-bordered table-striped table-hover" id="tableItemList">
                        <thead>
                            <tr>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Price List Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>`;

                    data.map((item, index, array) => {
                        var isEven = (index % 2) == 0 ? false : true;
                        // FETCHING DATA FROM PRICE LIST TABLE
                        var priceListDescription = "";
                        var priceListData = getTableData("ims_inventory_price_list_tbl LEFT JOIN ims_inventory_vendor_tbl USING(inventoryVendorID)",
                                                         "ims_inventory_price_list_tbl.*,inventoryVendorCode,inventoryVendorName","itemID="+item.itemID);
                            if(priceListData.length < 1){
                                priceListDescription += "<div class='w-100 text-left'>-</div>";
                            }else{
                                priceListDescription += `   <div class="container-fluid">
                                                                <div class="row">
                                                                    <div class="col-3 text-left border rounded-left py-2 font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important">Vendor Code</div>
                                                                    <div class="col-3 text-left border py-2 font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important">Vendor Name</div>
                                                                    <div class="col-3 text-left border py-2 font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important">Current Price</div>
                                                                    <div class="col-3 text-left border rounded-right py-2 font-weight-bold" style="border-color:${isEven?"#f2f2f2":"white"} !important">Date Updated</div>
                                                                </div>
                                                                <div class="row price-list-description-row hide" id="priceListRow${item.itemID}">
                                                                       `;
                                                priceListData.map(priceListItems=>{
                                                    priceListDescription += `   <div class="col-3 py-2 text-left">${priceListItems["inventoryVendorCode"]}</div>
                                                                                <div class="col-3 py-2 text-left">${priceListItems["inventoryVendorName"]}</div>
                                                                                <div class="col-3 py-2 text-right">${formatAmount(priceListItems["vendorCurrentPrice"], true)}</div>
                                                                                <div class="col-3 py-2 text-left">${moment(priceListItems["updatedAt"]).format("MMMM DD, YYYY hh:mm:ss A")}</div>`;
                                                                });
                                priceListDescription +=`        </div>   
                                                                <div class="w-100 d-flex justify-content-end">
                                                                    <button class="btn btn-default btn-add waves-effect d-flex align-items-center priceListRow-show-more" id="showMore${item.itemID}" target="#priceListRow${item.itemID}" type="button">
                                                                        <i class="zmdi zmdi-caret-down"></i>&nbsp; <span>Show More</span>
                                                                    </button>
                                                                </div>    
                                                            </div>`;  
                            }
                        // END FETCHING DATA FROM PRICE LIST TABLE
                        
                        html += `
                        <tr>
                            <td>${item["itemCode"]}</td>
                            <td>${item["itemName"]}</td>
                            <td class="text-center">${priceListDescription}</td>
                            <td>
                                <button class="btn btn-view w-100 btnView btnEdit editPriceList" data-itemid="${item["itemID"]}"><i class="fas fa-eye"></i> View</button>
                            </td>
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

function classificationData(classificationID = false){
    let html = `<select class="form-control select2 validate" id="classificationSelect">`;
            html += `<option ${classificationID == false && "selected"} disabled>Select Classification</option>`;
            let tableData = getTableData("ims_inventory_classification_tbl", "", "classificationStatus=1");
            tableData.map(items => { 
                    html +=  `<option  value    = "${items.classificationID}" 
                                        ${items.classificationID == classificationID && "selected"}>
                                        ${items.classificationName}
                              </option>`;
            });
    html += `</select>`; 
    
    $("#select2Classification").html(html);

}

function getVendorOptions(){
    let vendorListData = getTableData("ims_inventory_vendor_tbl","","inventoryVendorStatus='1'");
    let vendorListArr = [], vendorElementID = [];
    $(".select2[name=inventoryVendorID]").each(function(){
        vendorListArr.push($(this).val());
        vendorElementID.push(`#${this.id}[name=inventoryVendorID]`);
        // $(this).val() && $(this).trigger("change");
    });
    vendorElementID.map((element,index)=>{
            let html  =  `<option ${vendorListArr[index] || "selected"} disabled>Select Vendor</option>`;
                html += vendorListData.filter(item => vendorListArr[index] || !vendorListArr.includes(item.inventoryVendorID)).map(item =>{
                return `
                    <option 
                        value        = "${item.inventoryVendorID}" 
                        vendorcode   = "${item.inventoryVendorCode}"
                        ${item.inventoryVendorID == vendorListArr[index] && "selected"}>
                        ${item.inventoryVendorName} 
                    </option>`;
            })
            $(element).html(html);
    })
    
}

function getItemPriceList(itemID){
    let returnData = `<div class="col-md-12 col-sm-12">
                        <div class="w-100">
                            <table class="table table-bordered table-striped table-hover" id="tablePriceList">
                                <thead>
                                    <tr>
                                        <th class="text-center align-items-center"><input type="checkbox" id="checkAll"></th>
                                        <th>Vendor Code</th>
                                        <th>Vendor Name</th>
                                        <th>Current Price</th>
                                        <th>Date Updated</th>
                                        <th class="text-center">Preffered</th>
                                    </tr>
                                </thead>
                                <tbody id="tablePriceList-body" >`;
    let tableData  = getTableData("ims_inventory_price_list_tbl LEFT JOIN ims_inventory_vendor_tbl USING(inventoryVendorID)","","itemID="+itemID);
    if(tableData.length < 1){
        returnData += `<tr class="price-list-row" row="0">
                            <td class="text-center align-items-center"><input type="checkbox" name="checklist-delete"></td>
                            <td><div class="vendorcode">-</div></td>
                            <td>
                                <select class="form-control select2 validate w-100" style="width:100%;" id="selectVendorID0" name="inventoryVendorID" required></select>
                                <div class="invalid-feedback d-block" id="invalid-selectVendorID0"></div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">₱</span>
                                    </div>
                                    <input type="text" class="form-control validate amount" min="1" max="99999999" data-allowcharacters="[0-9][.]" placeholder="0.00" required="" value="" autocomplete="off"  name="vendorCurrentPrice" id="currentPrice0" value="0" style="text-align: right;">
                                    <div class="invalid-feedback d-block" id="invalid-currentPrice0"></div>
                                </div>
                            </td>
                            <td><div class="dateupdated">-</div></td>
                            <td class="text-center align-items-center"><input type="checkbox" name="preferred" id="preferred0"></td>
                       </tr>`;
    }else{
        tableData.map((items,index)=>{
            let vendorData = getTableData("ims_inventory_vendor_tbl","inventoryVendorID,inventoryVendorCode,inventoryVendorName","inventoryVendorStatus=1");
                    var vendorOptions ="";
                    vendorData.map(vendorItems=>{
                            vendorOptions += `  <option 
                                                    value        = "${vendorItems.inventoryVendorID}" 
                                                    vendorcode   = "${vendorItems.inventoryVendorCode}"
                                                    ${vendorItems.inventoryVendorID == items.inventoryVendorID && "selected"}>
                                                    ${vendorItems.inventoryVendorName} 
                                                </option>
                                            `;
                    });
            returnData += `<tr class="price-list-row" row="${index}">
                                <td class="text-center align-items-center"><input type="checkbox" name="checklist-delete"></td>
                                <td><div class="vendorcode">${items.inventoryVendorCode}</div></td>
                                <td>
                                    <select class="form-control select2 validate w-100" style="width:100%;" id="selectVendorID${index}" name="inventoryVendorID" required>
                                            ${vendorOptions}
                                    </select>
                                    <div class="invalid-feedback d-block" id="invalid-selectVendorID0"></div>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">₱</span>
                                        </div>
                                        <input type="text" class="form-control validate amount" min="1" max="99999999" data-allowcharacters="[0-9][.]" placeholder="0.00" required="" value="${items.vendorCurrentPrice}" autocomplete="off"  name="vendorCurrentPrice" id="currentPrice${index}" value="0" style="text-align: right;">
                                        <div class="invalid-feedback d-block" id="invalid-currentPrice${index}"></div>
                                    </div>
                                </td>
                                <td><div class="dateupdated">${moment(items.updatedAt).format("MMMM DD, YYYY hh:mm:ss A")}</div></td>
                                <td class="text-center align-items-center"><input type="checkbox" name="preferred" id="preferred${index}" ${items.preferred=="1"?"checked":""}></td>
                        </tr>`;
        })
    }
    returnData += `             </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="w-100 text-left my-2">
                            <button class="btn btn-primary btnAddRow" id="btnAddRow" type="button"><i class="fas fa-plus-circle"></i> Add Row</button>
                            <button class="btn btn-danger btnDeleteRow" id="btnDeleteRow" type="button" type="button" disabled=""><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                        </div>
                    </div>`;
    
    return returnData;
}

function priceListSelect2(){
	$(".select2[name=inventoryVendorID]").select2({ theme: "bootstrap" });
}