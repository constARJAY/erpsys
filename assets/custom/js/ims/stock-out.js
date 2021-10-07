$(document).ready(function() {

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
    const allowedUpdate = isUpdateAllowed(139);


    
	// ---- GET EMPLOYEE DATA -----
	const allEmployeeData = getAllEmployeeData();
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
			let { employeeID, fullname, designation, department } = data && data[0];
			return { employeeID, fullname, designation, department };
		}
		return {};
	}
	const employeeFullname = (id) => {
		if (id != "-") {
			let data = employeeData(id);
			return data.fullname || "-";
		}
		return "-";
	}
	// ---- END GET EMPLOYEE DATA -----

    // ----- VIEW DOCUMENT -----
    const getTimelineContent = async (timelineBuilderID) => {
        let result = false;
        $.ajax({
            method:   "POST",
            url:      "Stock_out/getTimelineContent",
            data:     { timelineBuilderID },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = [data];
				// console.log(data)
            }
        })
        return await result;
    }

    function viewDocument(view_id = false, readOnly = false) {
        const loadData = (id) => {
            const data = getTimelineContent(id);
            data.then(res => {
                if (res) {
                    const tableData = res;
        
                    if (tableData.length > 0) {
                        let {
                            employeeID,
                            stockOutStatus,
                            createdBy
                        } = tableData[0];
        
                        employeeID = employeeID == "0" ? createdBy : employeeID;
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            // isAllowed = timelineManagementBy || timelineManagementBy == null ? true : false
                            if (stockOutStatus == 0 || stockOutStatus == 1) {
                                isReadOnly = false;
                            }
                        } else if (employeeID == sessionID) {
                            if ( stockOutStatus == 0) {
                                isReadOnly = false;
                            } else {
                                isReadOnly = true;
                            }
                        } else {
                            isReadOnly = readOnly;
                        }
        
                        if (isAllowed) {
                            if (employeeID == sessionID) {
                                pageContent(true, tableData, isReadOnly);
                                updateURL(encryptString(id), true, true);
                            } else {
                                pageContent(true, tableData, isReadOnly);
                                updateURL(encryptString(id));
                            }
                        } else {
                            pageContent();
                            updateURL();
                        }
                        
                    } else {
                        pageContent();
                        updateURL();
                    }
                } else {
                    showNotification("danger", "There was an error fetching the data.");
                    pageContent();
                    updateURL();
                }
            });
        }

        if (view_id) {
            let id = view_id;
                id && isFinite(id) && loadData(id);
        } else {
            let url   = window.document.URL;
            let arr   = url.split("?view_id=");
            let isAdd = url.indexOf("?add");
            if (arr.length > 1) {
                let id = decryptString(arr[1]);
                    id && isFinite(id) && loadData(id);
            } else if (isAdd != -1) {
                arr = url.split("?add=");
                if (arr.length > 1) {
                    let id = decryptString(arr[1]);
                        id && isFinite(id) && loadData(id);
                } else {
                    const isAllowed = isCreateAllowed(139);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}ims/stock_out?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}ims/stock_out?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}ims/stock_out?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}ims/stock_out`);
        }
    }
    // ----- END VIEW DOCUMENT -----
    
    // ----- TIMELINE DATA -----
    const getTimelineData = () => {

		const data  = getTableData(
            `ims_stock_out_tbl AS stockout
             LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = stockout.createdBy
             `,
            `CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
             stockout.projectCode,
             stockout.projectName,
             stockout.inventoryItemStatus,
             stockout.stockOutID,
             stockout.stockOutCode,
             stockout.materialWithdrawalCode,
             stockout.materialWithdrawalID,
             stockout.materialRequestID`,
            `IF(stockout.employeeID = 0 ,stockout.createdBy = ${sessionID},stockout.employeeID = ${sessionID})`);
        return data;
    }
    // ----- END TIMELINE DATA -----

        // ----- CHECK ALL -----
        $(document).on("change", ".checkboxall", function() {
            let parentTable  =   $(this).closest(".itemTableRow");
            let checkBoxCount = parentTable.find(".checkboxitemrow").length;
            let getItemID = $(this).attr("itemID");
            const getIndex = $(this).attr("index");
            const isChecked = $(this).prop("checked");
           
            $(".itemProjectTableBody"+getIndex+""+getItemID+"  .checkboxitemrow").each(function(i, obj) {
                $(this).prop("checked", isChecked);
            });
            updateDeleteButton(parentTable);
        });
        
        $(document).on("click", "[type=checkbox]", function() {
            let parentTable  =   $(this).closest(".itemTableRow");
            updateDeleteButton(parentTable);
        });
    /** END OF CHECKBOX */
    

    // ----- DATATABLES -----
    function initDatatables() {
        if ($.fn.DataTable.isDataTable("#tableTimeline")) {
			$("#tableTimeline").DataTable().destroy();
		}

        var table = $("#tableTimeline")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing:    false,
				serverSide:     false,
				scrollX:        true,
				sorting:        [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0, width: 250 },
					{ targets: 1, width: 250 },
					{ targets: 2, width: 250 },
					{ targets: 3, width: 150 },
					{ targets: 4, width: 150 },
					// { targets: 5, width: 150 },
				],
			});

        const itemTableLength = $(`table.itemTable`).length;
        for(var i=0; i<itemTableLength; i++) {

            if ($.fn.DataTable.isDataTable(`#itemTable${i}`)) {
                $(`#itemTable${i}`).DataTable().destroy();
            }

            var table = $(`#itemTable${i}`)
                .css({ "min-width": "100%" })
                .removeAttr("width")
                .DataTable({
                    proccessing:    false,
                    serverSide:     false,
                    scrollX:        true,
                    sorting:        false,
                    searching:      false,
                    paging:         false,
                    ordering:       false,
                    info:           false,
                    scrollCollapse: true,
                    columnDefs: [
                        { targets: 0, width: 180 },
                        { targets: 1, width: 150  },
                        { targets: 2, width: 150 },
                        { targets: 3, width: 150 },
						{ targets: 4, width: 50 },
                        { targets: 5, width: 2000  },
                        { targets: 6, width: 80 },
                    ],
                });
        }
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(139)) {
				html = ``;
			}
		} else {
			html = `
            <button type="button" 
				class="btn btn-default btn-light" 
				id="btnBack"><i class="fas fa-arrow-left"></i>&nbsp;Back</button>`;
		}
		$("#headerButton").html(html);
	}
	// ----- END HEADER BUTTON -----


    // ----- TIMELINE CONTENT ------
    function timelineContent() {

        /**
        ----- TIMELINE MANAGEMENT STATUS -----
        0. Draft
        1. For Assessment
        2. Assessed
        ----- END TIMELINE MANAGEMENT STATUS -----
        */

        const timelineData = getTimelineData();

        let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable" id="tableTimeline">
                <thead>
                    <tr>
                        <th>Document No.</th>
                        <th>Prepared By</th>
                        <th>Project Code</th>
                        <th>Project Name</th>
                        <th>Item Request Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                stockOutID,
                stockOutCode,
                materialWithdrawalCode     = 0,
                materialWithdrawalID     = 0,
                preparedBy     = "",
                projectName           = "",
                projectCode           = "",
                inventoryItemStatus       = 0,
            } = timeline;

            html += `
            <tr class="btnView" id="${encryptString(stockOutID)}">
                <td>
                    <div>${stockOutCode || "-"}</div>
                    <!-- <small style="color:#848482;">put description here</small> -->
                </td>
                <td>${preparedBy || "-"}</td>
                <td>${projectCode || "-"}</td>
                <td>${projectName || "-" }</td>
                <td>${getStatusStyle(inventoryItemStatus,true)}</td>
            </tr>`
        });


        html += `
                </tbody>
            </table>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
        }, 50);

        return html;
    }
    // ----- END TIMELINE CONTENT ------


    // ----- CLICK SHOW CONTENT RECORDS -----
    $(document).on("click", ".btnShowItemContent", function() {
        $parent  = $(this).closest("tr");
        const itemID   = $(this).attr("itemID");
        const itemCode    = $(this).attr("itemCode");
        const display  = $(this).attr("display") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.itemContent[itemID="${itemID}"][itemCode="${itemCode}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.itemContent[itemID="${itemID}"][itemCode="${itemCode}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[itemcaret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
    })

    // ----- END CLICK SHOW  CONTENT RECORDS -----

    // ----- GET ITEMS SERIAL NUMBER -----
	function getItemSerialNumber(scope = {}, readOnly = false) {
		let {
			serialItemNumber = "",
		} = scope;

		let html = "";
		if (!readOnly) {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						<div class="input-group mb-0">
							<input type="text"
								class="form-control validate"
								name="serialItemNumber"
								id="serialItemNumber"
								data-allowcharacters="[A-Z][a-z][0-9][-]"
								minlength="17"
								maxlength="17"
								value="${serialItemNumber}"
								autocomplete="off"
								required>
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serialItemNumber"></div>
						</div>
					</div>
				</td>
			</tr>`;
		} else {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						${serialItemNumber || "-"}
					</div>
				</td>
			</tr>`;
		}

		
		return html;
	}
	// ----- END GET ITEMS SERIAL NUMBER -----

    // DISPLAY ITEM SERIAL NUMBER //
        function displayItemSerialNumber(withdrawalItemID = 0,materialRequestID =0,itemID = 0,readOnly = false){
            
            let itemSerialNumbersContent ='';
            let buttonAddSerialRow = '';
            // INFORMATION FOR SERIAL//
                const scopeData = getTableData(
                    `ims_withdrawal_stockout_serial_number_tbl`,
                    ``,
                    `materialRequestID = ${materialRequestID} AND  itemID = ${itemID} AND  withdrawalItemID = ${withdrawalItemID}`
                );
                
                
                let serialNumberData  		= 	scopeData.filter(x => x.serialNumber == "" || !x.serialNumber);
                let serialNumberDataLength 	= 	serialNumberData.length;

                // itemSerialNumbersContent += `
                // <div class="table-responsive">
                //     <table class="table table-bordered">
                    
                //         <tbody class="tableSerialItemBody">
                //         `;
                    
                //         if (scopeData.length > 0 && withdrawalItemID != "" && serialNumberDataLength > 0) {
                //             itemSerialNumbersContent += scopeData.map(scope => {
                //                 return getItemSerialNumber(scope, readOnly);
                //             }).join("");
                //         } else {
                //             itemSerialNumbersContent += getItemSerialNumber({}, readOnly);
                //         }
                    
                // itemSerialNumbersContent += `
                //         </tbody>
                //     </table>
                    
                // </div>`;
                
                if(withdrawalItemID){
                    itemSerialNumbersContent = `
                        <div class="table-responsive">
                            <table class="table table-bordered serial-number-table">
                            
                                <tbody class="tableSerialItemBody">
                                `;
                            
                                if (scopeData.length > 0 && withdrawalItemID != "") {
                                    itemSerialNumbersContent += scopeData.map(scope => {
                                        return getItemSerialNumber(scope, true);
                                    }).join("");
                                } else {
                                    itemSerialNumbersContent += getItemSerialNumber({}, true);
                                }
                            
                            itemSerialNumbersContent += `
                                </tbody>
                            </table>
                            
                        </div>`;
                }else{
                    itemSerialNumbersContent = `
                <div class="table-responsive">
                    <table class="table table-bordered serial-number-table">

                    </table>
                </div>`;
                }	
            // END INFORMATION FOR SERIAL //

             buttonAddSerialRow = !readOnly ? `
					<div class="w-100 text-center">
						<input type="checkbox" class="form-check-label btnAddSerial" > Add Serial Number</input>
					</div>
				` : "";

                return [itemSerialNumbersContent,buttonAddSerialRow]; 
        }
    // END DISPLAY ITEM SERIAL NUMBER//

    //  ITEM RECORDS LIST //
    const getItemContent = (milestoneTask = [],itemID = null, materialRequestID =null) => {
        let stockOutContent     = ""; 
        let receivedContent = ""; 
        let remainingContent = "";
        let stockOutDateContent  ="";
        let remarksContent = "";
        let receivedDateContent ="";
        let tableStockContent ="";

     
        if(milestoneTask.length >0){
            milestoneTask.map((milestone,index) => {
                const { withdrawalItemID,
                    requestItemID,
                    materialRequestID,
                    itemID,
                    requestQuantity,
                    stockOut,
                    received,
                    dateReceived ,
                    remaining,
                    stockOutDate,
                    barcode,
                    availableStocks,
                    remarks} = milestone;   
                // const { manHours, assignedEmployee, assignedManHours } = taskData(milestoneID);
            let readOnly  = (received ==0 || received ==null)  ? "" : "disabled";
            let disabled  = (received ==0 || received ==null)  ? "" : "disabled";

            const itemSerialContent = displayItemSerialNumber(withdrawalItemID,materialRequestID,itemID,readOnly);
           

            tableStockContent += `<tr class="itemRecords-list-row" id="tableRow${index}" modulelistid itemID="${itemID}">
                                        <td class="text-center">
                                           
                                        </td>
                                        <td>
                                            <div class="barcode">
                                                <input class="form-control text-center"
                                            value="${barcode || "-"}"
                                            index="${index}"
                                            itemID="${itemID}"
                                            withdrawalItemID="${withdrawalItemID}"
                                            disabled
                                            >
                                                <div class="invalid-feedback d-block" id="invalid-notes0"></div>
                                            </div>
                                        </td>
                                        <td class="table-data-serial-number" index="${index}">
                                            ${itemSerialContent[0]}
                                        </td>
                                         <td>
                                                <div class="stockout" >
                                                    <span>${ stockOut || "-"}</span>
                                                </div>
                                        </td>
                                        <td>
                                                <div class="availablestocks" >
                                                    <span>${formatAmount(availableStocks) || "-"}</span>
                                                </div>
                                        </td>
                                        <td>
                                                <div class="received" >
                                                    <span>${ received || "-"}</span>
                                                </div>
                                        </td>
                                        <td>
                                                <div class="remaining" >
                                                    <span>${ remaining || "-"}</span>
                                                </div>
                                        </td>
                                        <td>
                                                <div class="stockoutdate" >
                                                    <span>${ stockOutDate  ? moment(stockOutDate).format("MMMM DD, YYYY") : "-"} </span>
                                                </div>
                                        </td>
                                        <td>
                                                <div class="datereceived" index="${index}">
                                                    <span>${ (dateReceived == "0000-00-00" || dateReceived == null)  ?  "-" : moment(dateReceived ).format("MMMM DD, YYYY")}</span>
                                                </div>
                                        </td>
                                        <td>
                                            <textarea rows="2" style="resize: none" class="form-control" index="${index}" disabled>${remarks || ""}</textarea>
                                        </td>
                                    </tr>`;
   
            })
        }else{
            const itemSerialContent = displayItemSerialNumber();
            const withdrawalItemRemaining = getTableData(`ims_material_withdrawal_item_tbl`,` ((SELECT requestQuantity FROM ims_request_items_tbl WHERE itemID = ${itemID} AND materialRequestID = ${materialRequestID} AND inventoryValidationID IS NOT NULL AND bidRecapID IS NULL) - IFNULL(SUM(received),0)) as remainingValue`,` itemID = ${itemID} AND materialRequestID = ${materialRequestID}`);
            const getAvailableStocks = getTableData(`ims_stock_in_item_tbl AS itmStock 
			JOIN ims_inventory_item_tbl AS itm ON itm.itemID = itmStock.itemID
			`,
            `CASE
            WHEN IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0) <0 THEN 0
            ELSE IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)
            END AS availableStocks`,
            ` itmStock.stockOutDate IS NUll 
			AND itmStock.stockInDate IS NOT NULL 
			AND itmStock.itemID = ${itemID}`);
               tableStockContent +=  `<tr class="itemRecords-list-row" id="tableRow0" modulelistid itemID="${itemID}">
                                            <td class="text-center">
                                                <div class="action">
                                                    <input type="checkbox" class="checkboxitemrow" id="checkboxitemrow0" index ="0" itemID = "${itemID}">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="barcode">
                                                    <input class="form-control text-center validate"
                                                id="barcodeItem0"
                                                name="barcodeItem"
                                                min="36"
                                                max="64"
                                                minlength="36"
                                                maxlength="64"
                                                index="0"
                                                itemID="${itemID}"
                                                withdrawalItemID="0"
                                                materialRequestID="${materialRequestID}"
                                                
                                                >
                                                    <div class="invalid-feedback d-block" id="invalid-barcodeItem0"></div>
                                                </div>
                                            </td>
                                            <td class="table-data-serial-number" index="0">
                                                    ${itemSerialContent[0]}
                                                    ${itemSerialContent[1]}
                                                </td>
                                            <td>
                                                <div class="stockout">
                                                    <input class="form-control input-quantity text-center"
                                                value="0.00"
                                                id="StockOut0"
                                                name="StockOut"
                                                min="0.00"
                                                max="9999999999"
                                                minlength="1"
                                                maxlength="10"
                                                index="0"
                                                itemID="${itemID}"
                                                withdrawalItemID="0"
                                                >
                                                    <div class="invalid-feedback d-block" id="invalid-StockOut0"></div>
                                                </div>
                                            </td>
                                             <td>
                                                    <div class="availablestocks">
                                                        <span  name="availableStocks" itemID="${itemID}" index="0">${formatAmount(getAvailableStocks[0].availableStocks)}</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="received">
                                                        <span>-</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="remaining">
                                                        <span  name="remaining" itemID="${itemID}" index="0">${withdrawalItemRemaining[0].remainingValue}</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="stockoutdate" >
                                                        <span name="stockOutDate" index="0">-</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="datereceived">
                                                        <span>-</span>
                                                    </div>
                                            </td>
                                            <td>
                                                <textarea rows="2" style="resize: none" class="form-control" index="0" disabled></textarea>
                                            </td>
                                        </tr>`;
              
        }
        

        return [tableStockContent];
    }

    // END ITEM REDCORD LIST //

    // ----- DISPLAY ITEMS -----
    function displayItems( phase = {}, index = 0, disabled) {
        const {
            items       = []
        } = phase;
        // console.log(phase)
        
        let taskHTML = "";
        
        items.map((task,index) => {
            // console.log(task.milestoneTask)
			
            const {itemID,itemCode,itemName,itemBrandName, itemClassification,itemCategory,itemUom,requestQuantity,materialRequestID,withdrawalItemStatus = 0, milestoneTask = [] } = task;
            const itemContent = getItemContent(milestoneTask,itemID,materialRequestID);
            const itemStatusRecord = (withdrawalItemStatus ==  null || withdrawalItemStatus ==  0 )   ? `<span class="badge badge-warning w-100">Pending</span>` : `<span class="badge badge-success w-100">Completed</span>` ;

            taskHTML += `
            <tr class="itemTableRow" itemID="${itemID}">   
				<td style="position: relative;">    
					<div class="d-flex align-items-center justify-content-between btnShowItemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;
							        width: 100%;
							        top: 0">
						<span>${itemCode}</span>
						&nbsp;&nbsp;<i class="fad fa-caret-down mr-3" itemcaret="true"></i>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;	
                                    top: 0">
							<span>${itemName}</span><br>
                            <small style="color:#848482;">${itemBrandName}</small>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;
							    	top: 0">
							<span>${itemClassification}</span><br>
							<small style="color:#848482;">${itemCategory}</small>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;	
						        	top: 0">
                        <span>${itemUom}</span><br>
							
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;
							        top: 0">
							<span>${requestQuantity}</span><br>
							
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
						
					</div>
				</td>
                <td style="position: relative;">
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
                        
                        <table class="table" id="pcrDetails">
                            <thead style="line-height:8px; white-space:nowrap;">
                                <tr class="bg-dark">
                                    <th class="text-center" style="width:50px">
                                        <div class="action">
                                            <input type="checkbox" class="checkboxall" index ="${index}" itemID = "${itemID}" >
                                        </div>
                                    </th>
                                    <th class="text-white">Barcode</th>
                                    <th class="text-white">Serial No.</th>
                                    <th class="text-white">Stock Out</th>
                                    <th class="text-white">Available Stocks</th>
                                    <th class="text-white">Received</th>
                                    <th class="text-white">Remaining</th>
                                    <th class="text-white">Stock Out Date</th>
                                    <th class="text-white">Received Date</th>
                                    <th class="text-white">Remarks</th>
                                </tr>
                            </thead>
                            
                            <tbody class="itemProjectTableBody${index+""+itemID}" >
                                ${itemContent[0]}
                            </tbody>
                        </table>
                        ${withdrawalItemStatus == 1? '' :
                            `<div class="w-100 text-left my-2">
                                    <button class="btn btn-primary btnAddRow"  type="button" id="btnAddRow" index="${index}" itemID="${itemID}" materialRequestID="${materialRequestID}"><i class="fas fa-plus-circle"></i> Add Row</button>
                                    <button class="btn btn-danger btnDeleteRow"  type="button" id="btnDeleteRow" index="${index}" itemID="${itemID}" materialRequestID="${materialRequestID}" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                            </div>
                        `}
					</div>
				</td>
			
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						display     ="false"
						style       ="cursor: pointer;
							        top: 0">
                        ${itemStatusRecord}	
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID      ="${itemID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
            </tr>`;
			
        })

        let html = `
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                       Item/s Request
                    </div>
                </div>

                <div class="w-100">
                    <table class="table itemTable" id="itemTable${index}">
                        <thead style="line-height:8px; white-space:nowrap;">
                            <tr class="bg-dark">
                                <th class="text-white">Item Code</th>
                                <th class="text-white">Item Name/Brand Name</th>
                                <th class="text-white">Item Classification/Item Category</th>
                                <th class="text-white">UOM</th>
                                <th class="text-white">Quantity</th>
                                <th class="text-white"></th>
								<th class="text-white">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${taskHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return html;
    }
    // ----- END DISPLAY ITEMS -----



    // ----- UPDATE SERIAL NUMBER -----
    function updateSerialNumber() {
        $(`[name="serialItemNumber"]`).each(function(i) {
            $(this).attr("id", `serialItemNumber${i}`);
            $(this).parent().find(".invalid-feedback").attr("id", `invalid-serialItemNumber${i}`);
        })
    }
    // ----- END UPDATE SERIAL NUMBER -----

    // ----- ADD SERIAL -----
    $(document).on("click", ".btnAddSerial", function() {
        let thisEvent 		= $(this);
        let thisCheck 		= thisEvent[0].checked;
        let thisTR 	  		= thisEvent.closest(`.itemRecords-list-row`);
        let thisTableData	= thisEvent.closest(`.itemRecords-list-row >.table-data-serial-number`);
        thisTableData.find("table").html(`<tbody><tr><td>${preloader}</td></tr></tbody>`);

                    if(thisCheck){
                        let thisReceived	= thisTR.find(`.input-quantity`).val();
                        let arrayCount		= thisReceived ? parseInt(thisReceived) : 0;
                        let subTable  		= thisTableData.find("table");
                        if(arrayCount == 0){
                            thisTableData.find("table").html(``);
                        }else{
                            thisTableData.find("table").html(`<tbody></tbody>`);
                            for (let index = 0; index < arrayCount; index++) {
                                let newSerial = getItemSerialNumber();
                                subTable.find("tbody").append(newSerial);
                                updateSerialNumber();
                                // checkSerialRowReceived(thisTR);
                            }
                        }
                    }else{
                        thisTableData.find("table").html(``);
                    }
        // let newSerial = getSerialNumber();
        // $(this).parent().find("table tbody").append(newSerial);
        // $(this).parent().find("[name=serialNumber]").last().focus();
        // updateSerialNumber();

        // const parentTable = $(this).closest("tr.itemTableRow");
        // checkSerialRowReceived(parentTable);
    })
    // ----- END ADD SERIAL -----

    function updateTableRows(){
        $(".itemRecords-list-row").each(function(i){
            // CHECKBOX
			$("td .action .checkboxitemrow", this).attr("id", `checkboxitemrow${i}`);

            // INPUTS ID's

            $("td [name=barcodeItem]", this).attr("id", `barcodeItem${i}`);
			$("td [name=barcodeItem]", this).attr("index", i);

			$("td [name=StockOut]", this).attr("id", `StockOut${i}`);
			$("td [name=StockOut]", this).attr("index", i);

            $("td [name=availableStocks]", this).attr("id", `availableStocks${i}`);
			$("td [name=availableStocks]", this).attr("index", i);

            $("td [name=stockOutDate]", this).attr("id", `stockOutDatet${i}`);
			$("td [name=stockOutDate]", this).attr("index", i);

            $("td [name=remaining]", this).attr("id", `remainingt${i}`);
			$("td [name=remaining]", this).attr("index", i);
            // $("td [name=notes]", this).attr("id", `notes${i}`);

            // INPUTS ID's INVALID FEEDBACK
            $("td [name=StockOut]", this).next().attr("id", `invalid-StockOut${i}`);
            $("td [name=stockOutDate]", this).next().attr("id", `invalid-stockOutDate${i}`);
            $("td [name=barcodeItem]", this).next().attr("id", `invalid-barcodeItem${i}`);
            $("td [name=barcodeItem]", this).next().attr("id", `invalid-barcodeItem${i}`);
            // $("td [name=notes]", this).next().attr("id", `invalid-notes${i}`);

         
			// $(this).find("select").each(function(j) {
			// 	var thisValue = $(this).val();
			// 	$(this).attr("index", `${i}`);
			// 	$(this).attr("id", `tasksName${i}`);
			// 	$(this).attr("data-select2-id", `tasksName${i}`);
			// 	if (!$(this).hasClass("select2-hidden-accessible")) {
			// 		$(this).select2({ theme: "bootstrap" });
			// 	}
			// });


        });
    }   

    function updateDeleteButton(parentTable){
        // let parentTable  =   $(this).closest(".itemTableRow");
        let getBtnDeleteAttribute  =  parentTable.attr("itemID");
        let checkBoxCount = parentTable.find(".checkboxitemrow").length;
        let count = 0;
        
        $(".checkboxitemrow").each(function() {
            $(this).prop("checked") && count++;
        });
        
        $(`.btnDeleteRow[itemID=${getBtnDeleteAttribute}]`).attr("disabled", count == 0);
    }

    function deleteTableRow(parentTable){  
        // console.log($(`.checkboxitemrow:checked`).length +"!="+ $(`.checkboxitemrow`).length )
        if (parentTable.find(".checkboxitemrow:checked").length != parentTable.find(`.checkboxitemrow`).length) {
			Swal.fire({
				title:              "DELETE ITEM RECORD/S",
				text:               "Are you sure to delete the item record/s?",
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
					$(`.checkboxitemrow:checked`).each(function(i, obj) {
						var tableRow = $(this).closest('tr');
						tableRow.fadeOut(500, function (){
							$(this).closest("tr").remove();
							updateTableRows();
							updateDeleteButton(parentTable);
                            // $(`[name=tasksName]`).each(function(i, obj) {
                            //     let thisValue = this.value;
                            //     $(this).html(getProjectMilestone(thisValue));
                            // });
						});
					})
				}
			});
			
		} else {
			showNotification("danger", "You must have at least one or more row.");
		}
    }


     // ----- KEYUP BARCODE -----
     $(document).on("change", `[name="barcodeItem"]`, function() {
        const itemID    = $(this).attr("itemID");
        const index    = $(this).attr("index");
        const id    = $(this).attr("id");
        const withdrawalItemID    = $(this).attr("withdrawalItemID");
        const valueLength = $(this).val().length +1;
        const value = $(this).val();
        const characterLength = 37;

        if(valueLength >= characterLength){

            const validatebarcode = getTableData(`ims_stock_in_item_tbl`,
            `barcode`,
            `stockOutDate IS NUll 
            AND stockInDate IS NOT NULL 
            AND itemID = ${itemID} AND barcode = '${value}'`);
            if(validatebarcode.length<=0){
               $("#"+id).addClass("is-invalid").removeClass("validate")
               $("#invalid-barcodeItem"+index).text("Barcode not exist!")
            }else{
                $("#"+id).removeClass("is-invalid").addClass("validate")
                $("#invalid-barcodeItem"+index).text("")
            }
            
        }
        // else{
        //     $("#"+id).addClass("is-invalid").removeClass("validate")
        //     $("#invalid-barcodeItem"+index).text("Please enter at least "+characterLength+" characters.")
        // }

        // const getRemainingItem = +$(`[name="remainingItem"][itemID="${itemID}"]`).attr("remainingValueItem").replaceAll(",","");
        // var computeRemainingItem =0;
        // computeRemainingItem = getRemainingItem - value;
        
        
        if(value == 0){
            $(this).closest("tr").find("span").eq(3).text("-");
            // $(`[name="remainingItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"]`).text(formatAmount(getRemainingItem));


        }else{
            $(this).closest("tr").find("span").eq(3).text(moment().format("MMMM DD, YYYY"));
            // $(`[name="remainingItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"]`).text(formatAmount(computeRemainingItem));

        }

    });

    // ----- END KEYUP BARCODE -----  

    // CHECK SERIAL DUPLICATES//

    $(document).on("change","[name=serialItemNumber]",function(){
		const serialval   = $(this).val(); 
		const addressID = $(this).attr("id");
		var $parent = $(this);
		var flag = ["true"];

		if(serialval.length ==17){
			$(`[name="serialItemNumber"]`).each(function(i) {
				var tmp_Checkserial = $(this).val();
				var tmp_addressID = $(this).attr("id");
					if(addressID !=  tmp_addressID){
						if(tmp_Checkserial == serialval){
							$parent.removeClass("is-valid").addClass("is-invalid");
							$parent.closest("tr").find(".invalid-feedback").text('Data already exist!');
							flag[0]= false;
						}
					}
			})
	
			if(flag[0] == "true"){
	
			$(`[name="serialItemNumber"]`).each(function(i) {
				var tmp_Checkserial = $(this).val();
				var tmp_addressID = $(this).attr("id");
				// console.log(addressID +" != "+  tmp_addressID)
					if(addressID !=  tmp_addressID){
						if(tmp_Checkserial == serialval){
							$parent.removeClass("is-valid").addClass("is-invalid");
							$parent.closest("tr").find(".invalid-feedback").text('Data already exist!');
						
						}
					}
				
			})
			}
		}
	});
    //END CHECK SERIAL DULICATES //


    // ----- KEYUP QUANTITY -----
    $(document).on("keyup", `[name="StockOut"]`, function() {
        const itemID    = $(this).attr("itemID");
        const index    = $(this).attr("index");
        const withdrawalItemID    = $(this).attr("withdrawalItemID");
        const value = +$(this).val();
        // const getRemainingItem = +$(`[name="remainingItem"][itemID="${itemID}"]`).attr("remainingValueItem").replaceAll(",","");
        // var computeRemainingItem =0;
        // computeRemainingItem = getRemainingItem - value;
        
        
        if(value == 0){
            $(this).closest("tr").find("span").eq(3).text("-");
            // $(`[name="remainingItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"]`).text(formatAmount(getRemainingItem));


        }else{
            $(this).closest("tr").find("span").eq(3).text(moment().format("MMMM DD, YYYY"));
            // $(`[name="remainingItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"]`).text(formatAmount(computeRemainingItem));

        }

    });

    // ----- END KEYUP QUANTITY -----


    // ----- FORM BUTTON -----
    function formButtons(data = false) {
        let button = "";
        if (data) {
            const {
                materialWithdrawalID     = "",
                materialWithdrawalCode     = "",
                stockOutID     = "",
                materialRequestID           ="",
            } = data && data[0];
            // console.log("button")
        //    console.log(data)
            button = `
            <button 
                class="btn btn-submit px-5 p-2"  
                id="btnSubmit"
                materialWithdrawalID="${encryptString(materialWithdrawalID)}"
                materialRequestID="${encryptString(materialRequestID)}"
                stockOutID="${encryptString(stockOutID)}"
                code="${materialWithdrawalCode}">
                <i class="fas fa-paper-plane"></i> Update
            </button>`;

            
        }

        return button;
    }
    // ----- END FORM BUTTON -----


    // ----- FORM CONTENT -----
    function formContent(data = false, readOnly = false) {
        $("#page_content").html(preloader);
        // readOnly ? preventRefresh(false) : preventRefresh(true);

        const {
            stockOutCode,
            materialWithdrawalID,
            materialWithdrawalCode,
            employeeID,
            inventoryItemStatus,
            inventoryAssetStatus,
            stockOutStatus,
            materialRequestID,
            inventoryValidationID,
            projectCode,
            projectName,
            projectCategory,
            clientCode,
            clientName,
            clientAddress,
            dateNeeded,
            submittedAt,
            materialWithdrawalReason,
            stockOutRemarks,
            createdAt,
            withdrawalDetails ,
            createdBy
        } = data && data[0];

        // console.log(data)
		
        // ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? (employeeID == "0" ? createdBy : employeeID) : sessionID);
		// ----- END GET EMPLOYEE DATA -----

        $("#btnBack").attr("materialWithdrawalID", encryptString(materialWithdrawalID));
		$("#btnBack").attr("status", stockOutStatus);

        const disabled = readOnly ? "disabled" : "";


        let button = disabled ? "" :  formButtons(data);

        let itemHTML = "";

        withdrawalDetails.map((phase, index) => {
            itemHTML += displayItems( phase, index, disabled);
        })
    
       

        let html = `

                <div class="row px-2">
			
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${stockOutCode || "-"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${getStatusStyle(stockOutStatus,true)}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12 px-1">
                <div class="row m-0">
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Created</small>
                            <h6 class="mt-0 font-weight-bold">
								${moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A")}
                            </h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Submitted</small>
                            <h6 class="mt-0 font-weight-bold">
								${moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A")}
							</h6>      
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 px-1">
                    <div class="card">
                        <div class="body">
                            <small class="text-small text-muted font-weight-bold">Date Approved</small>
                            <h6 class="mt-0 font-weight-bold">
							${ "----"}
							</h6>      
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Remarks</small>
                        <h6 class="mt-0 font-weight-bold">
                        ${stockOutRemarks || "----"}
						</h6>      
                    </div>
                </div>
            </div>
        </div>

        <div class="row" id="form_inventory_validation">

            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Reference No</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${materialWithdrawalCode || "-"}">
                </div>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						disabled 
						value="${projectCode || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" 
						class="form-control" 
						name="projectName" 
						disabled 
						value="${projectName || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectName"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Project Category</label>
                    <input type="text" 
						class="form-control" 
						name="projectCategory" 
						disabled 
						value="${projectCategory || "-"}">
                    <div class="d-block invalid-feedback" id="invalid-projectCategory"></div>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Name</label>
                    <input type="text" 
						class="form-control" 
						name="clientName" 
						disabled 
						value="${clientName || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Client Address</label>
                    <input type="text" 
						class="form-control" 
						name="clientAddress" 
						disabled 
						value="${clientAddress || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Date Needed</label>
                    <input type="text" 
						class="form-control" 
						name="dateNeeded" 
						disabled 
						value="${moment(dateNeeded).format("MMMM DD, YYYY") || "-"}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Prepared By</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeFullname}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDepartment}">
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" 
						class="form-control" 
						disabled 
						value="${employeeDesignation}">
                </div>
            </div>
            <div class="col-md-12 col-sm-12">
                <div class="form-group">
                    <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
                    <textarea class="form-control"
                        rows="4"
                        style="resize:none;"
						disabled>${materialWithdrawalReason ?? ""}</textarea>
                   
                </div>
            </div>

            <div  class="col-sm-12">
                ${itemHTML}
            </div>

            <div class="col-md-12 text-right mt-3">
                ${button}
            </div>
        </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDatatables();
            // updateTables();
            initAll();
            // multipleSelect2Placeholder();
            // inputmaskHours();
            initQuantity();

            $(`[name="assignEmployee"]`).each(function() {
                $assignedEmployee = $(this).attr("assignedEmployee");
                const assignedEmployeeArr = $assignedEmployee?.split("|");
                $assignedEmployee && $(this).val(assignedEmployeeArr).trigger("change");
            })
            $(`[name="assignEmployee"]`).attr("executeonce", "false");  

            // ----- NOT ALLOWED FOR UPDATE -----
			if (!allowedUpdate) {
				$("#page_content").find(`input, select, textarea`).each(function() {
					if (this.type != "search") {
						$(this).attr("disabled", true);
					}
				})
				$('#btnBack').attr("status", "2");
				$(`#btnSubmit, #btnRevise, #btnCancel, #btnCancelForm, .btnAddRow, .btnDeleteRow`).hide();
			}
			// ----- END NOT ALLOWED FOR UPDATE -----

        }, 50);
    }
    // ----- END FORM CONTENT -----

    // CHECK IF THERE IS EXIST DATA //
      function checkData(){

        var flag = ['false']; 
        var getData =[];
        $(`[name="barcodeItem"]`).each(function(i){
            let checkValue =  $(this).val();
            let quantity =  +$(this).closest("tr").find(`.input-quantity[name="StockOut"]`).val();
           
            if(checkValue != "" && quantity != 0 ){
                getData[i] = checkValue;
            }

        });

        if(getData.length >0){
              flag[0]= true;
        }else{
        	flag[0] = false;
        }
        return flag[0];
    }
    // END CHECK IF THERE IS EXIST DATA //

    // KEYUP CHECK COMPLETE DATA EACH ROW //

    $(document).on("keyup",`[name="barcodeItem"],[name="StockOut"]`,function(){
    	var getBarcode = $(this).closest("tr").find(`[name="barcodeItem"]`).val();
    	var getQuantity = +$(this).closest("tr").find(`[name="StockOut"]`).val();

        if(getBarcode == "" && getQuantity != 0){
        	$(this).closest("tr").find(`[name="barcodeItem"]`).addClass("is-invalid");
        	$(this).closest("tr").find(`td [name="barcodeItem"]`).closest("div").find(".invalid-feedback").text("Please input barcode.");

        	$(this).closest("tr").find(`[name="StockOut"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="StockOut"]`).closest("div").find(".invalid-feedback").text("");
        }

        if(getBarcode != "" && getQuantity == 0){
        	$(this).closest("tr").find(`[name="StockOut"]`).addClass("is-invalid");
        	$(this).closest("tr").find(`td [name="StockOut"]`).closest("div").find(".invalid-feedback").text("Please input quantity.");

        	$(this).closest("tr").find(`[name="barcodeItem"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="barcodeItem"]`).closest("div").find(".invalid-feedback").text("");
        }

        if(getBarcode != "" && getQuantity != 0 ){
            $(this).closest("tr").find(`[name="barcodeItem"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="barcodeItem"]`).closest("div").find(".invalid-feedback").text("");

        	$(this).closest("tr").find(`[name="StockOut"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="StockOut"]`).closest("div").find(".invalid-feedback").text("");
        }else{
        	 if(getBarcode == "" && getQuantity == 0 ){
				$(this).closest("tr").find(`[name="barcodeItem"]`).removeClass("is-invalid").removeClass("is-valid");
				$(this).closest("tr").find(`td [name="barcodeItem"]`).closest("div").find(".invalid-feedback").text("");

				$(this).closest("tr").find(`[name="StockOut"]`).removeClass("is-invalid").removeClass("is-valid");
				$(this).closest("tr").find(`td [name="StockOut"]`).closest("div").find(".invalid-feedback").text("");
			}
        }    
    })
    
    // END KEYUP CHECK COMPLETE DATA EACH ROW //

    // ----- PAGE CONTENT -----
    function pageContent(isForm = false, data = false, readOnly = false) {
        if ($(`#page_content .loader`).text().length == 0) {
            $("#page_content").html(preloader);
        }
        if (!isForm) {
            // preventRefresh(false);
            headerButton(true, "");
            timelineContent();
            updateURL();
        } else {
            headerButton(false, "");
            formContent(data, readOnly);
        }
    }
    viewDocument();
	$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
    // ----- END PAGE CONTENT -----


    // ----- CLICK TIMELINE ROW -----
    $(document).on("click", ".btnView", function() {
        $("#page_content").html(preloader);
        const stockOutID = decryptString($(this).attr("id"));
        setTimeout(() => {
            // console.log(stockOutID)
            viewDocument(stockOutID);
        }, 50);
    })
    // ----- END CLICK TIMELINE ROW -----


    // ----- CLICK BUTTON BACK -----
	$(document).on("click", "#btnBack, #btnCancel", function () {
        const id     = decryptString($(this).attr("timelineBuilderID"));
		const status = $(this).attr("status");

		// if (status != "false" && status != 0 && status != 1) {
            $("#page_content").html(preloader);
            setTimeout(() => {
                pageContent();
            }, 50);

		// } else {
        //     saveProjectBoard("save", id, pageContent);
		// }
	});
	// ----- END CLICK BUTTON BACK -----

    $(document).on("click", "#btnAddRow", function(){
        
        let getItemID = $(this).attr("itemID");
        let getmaterialRequestID = $(this).attr("materialRequestID");
        const getIndex = $(this).attr("index");
        let row = getItemContent(0,getItemID,getmaterialRequestID);
        $(".itemProjectTableBody"+getIndex+""+getItemID).append(row);  
        updateTableRows();
        initQuantity();

      
    });

    $(document).on("click", ".btnDeleteRow", function(){
        let parentTable  =   $(this).closest(".itemTableRow");
        deleteTableRow(parentTable);
    });

    $(document).on("click","#btnSave", function(){
        preventRefresh(false);
        let condition = validateForm("milestonebuilder_form");
        if(condition == true){
            let data = getMilestoneBuilder();
            saveMilestoneBuilder(data, pageContent); 
        }
        preventRefresh(true);
    });


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = decryptString($(this).attr("materialWithdrawalID"));
		const materialRequestID = decryptString($(this).attr("materialRequestID"));
		const stockOutID = decryptString($(this).attr("stockOutID"));
        const checkValidateData = checkData();

            if(checkValidateData){

                const validateBarcode = $("[name=barcodeItem]").hasClass("is-invalid");
                let serialNumberCondition = $("[name=serialItemNumber]").hasClass("is-invalid");
                let validateQuantity = $("[name=stockOutID]").hasClass("is-invalid");
                if( !validateBarcode && !serialNumberCondition && !validateQuantity){
                    const validate     = validateForm("pcrDetails");
                    if(validate){
                        formButtonHTML(this);

                    setTimeout(() => {
                        // validateInputs().then(res => {
                        //     if (res) {
                                saveProjectBoard("update", id, pageContent,materialRequestID,stockOutID);
                            // }
                            formButtonHTML(this, false);
                        // });
                    }, 500);
                    }
                }
            }else{
                showNotification("danger", "You must have at least one or more row input data.");
            }
	});
	// ----- END CLICK BUTTON SUBMIT -----


    // ----- GET PROJECT BOARD DATA -----
    const getProjectBoardData = (materialWithdrawalID = 0, method = "save",materialRequestID =0,stockOutID =0) => {
        let data = {
            stockOutID,
            materialWithdrawalID,
            timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
            materialRequestID : materialRequestID,
            items: []
        };

       

        $(`[name="barcodeItem"]`).each(function(i) {
            $parent = $(this).closest("tr");
            const index = $(this).attr("index");
            const itemID = $(this).attr("itemID");
            const getmaterialRequestID = $(this).attr("materialRequestID");

            const barcode = $(`[name="barcodeItem"][itemID="${itemID}"][index="${index}"]`).val().replaceAll(",","");
            const stockOut = $(`.input-quantity[name="StockOut"][itemID="${itemID}"][index="${index}"]`).val().replaceAll(",","");
            const availableStocks = $(`[name="availableStocks"][itemID="${itemID}"][index="${index}"]`).val().replaceAll(",","");
            const remainingItem = $(`[name="remaining"][itemID="${itemID}"][index="${index}"]`).text().replaceAll(",","");;
            var stockOutDate = $(`[name="stockOutDate"][index="${index}"]`).text() || "";

            if(stockOutDate != "-"){
                stockOutDate = moment($(`[name="stockOutDate"][index="${index}"]`).text()).format("YYYY-MM-DD");
            }else{
                stockOutDate = "";
            }

            if(barcode !=""){
                let requestItemData			= getTableData("ims_request_items_tbl", "", `materialRequestID = '${getmaterialRequestID}' AND itemID = '${itemID}'`,`inventoryValidationID IS NOT NULL AND bidRecapID IS NULL`);
                let tableData 				= requestItemData[0];
                // if(requestItemData.length !=0){
                let requestItemID  = tableData.requestItemID ;
                let costEstimateID = tableData.costEstimateID;
                let billMaterialID = tableData.billMaterialID;
                let materialRequestID = tableData.materialRequestID;
                let inventoryValidationID = tableData.inventoryValidationID;
                let bidRecapID = tableData.bidRecapID;
                let purchaseRequestID = tableData.purchaseRequestID;
                let purchaseOrderID = tableData.purchaseOrderID;
                let changeRequestID = tableData.changeRequestID;
                let inventoryReceivingID = tableData.inventoryReceivingID;
                let inventoryVendorID = tableData.inventoryVendorID;
                let inventoryVendorCode = tableData.inventoryVendorCode;
                let inventoryVendorName = tableData.inventoryVendorName;
                let finalQuoteRemarks = tableData.finalQuoteRemarks;
                let milestoneBuilderID = tableData.milestoneBuilderID;
                let phaseDescription = tableData.phaseDescription;
                let milestoneListID = tableData.milestoneListID;
                let projectMilestoneID = tableData.projectMilestoneID;
                let projectMilestoneName = tableData.projectMilestoneName;
                let itemCode = tableData.itemCode;
                let itemBrandName = tableData.itemBrandName;
                let itemName = tableData.itemName;
                let itemClassification = tableData.itemClassification;
                let itemCategory = tableData.itemCategory;
                let itemUom = tableData.itemUom;
                let itemDescription = tableData.itemDescription;
                let files = tableData.files;
                let remarks = tableData.remarks;
                let requestQuantity = tableData.requestQuantity;
    
        
                let reservedItem    = tableData.reservedItem;
                let forPurchase 	=tableData.forPurchase;				
    
    
                // }
    
                const temp = {
                    materialWithdrawalID,
                    stockOut,
                    remainingItem,
                    stockOutDate,
                    requestItemID,
                    costEstimateID,
                    billMaterialID,
                    materialRequestID,
                    inventoryValidationID,
                    bidRecapID,
                    purchaseRequestID,
                    purchaseOrderID,
                    changeRequestID,
                    inventoryReceivingID,
                    inventoryVendorID,
                    inventoryVendorCode,
                    inventoryVendorName,
                    finalQuoteRemarks,
                    milestoneBuilderID,
                    phaseDescription,
                    milestoneListID,
                    projectMilestoneID,
                    projectMilestoneName,
                    itemID,
                    itemCode,
                    itemBrandName,
                    itemName,
                    itemClassification,
                    itemCategory,
                    itemUom,
                    itemDescription,
                    files,
                    remarks,
                    requestQuantity,
                    reservedItem,
                    forPurchase,
                    barcode,
                    availableStocks,
                    serials:[]
                };
    
                $(`td .serial-number-table tbody > tr`, $parent).each(function(i) {
                   let serialItemNumber = $(this).find(`[name="serialItemNumber"]`,this).val()?.trim();
    
                  
                    let serial = {
                        stockOutID :stockOutID,
                        materialWithdrawalID : materialWithdrawalID,
                        materialRequestID : getmaterialRequestID,
                        itemID:       itemID,
                        serialItemNumber
                    };
    
                temp.serials.push(serial);
    
                })
              
                data.items.push(temp);
            }

       
        })

        // console.log(data)
        // return false;
        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- DATABASE RELATION -----
    const getConfirmation = method => {
        const title = "Stock Out";
        let swalText, swalImg;

        switch (method) {
            case "update":
                swalTitle = `UPDATE ${title.toUpperCase()}`;
                swalText  = "Are you sure to update this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit these tasks with man hours to the next phase?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to approve this document?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
                break;
            case "deny":
                swalTitle = `DENY ${title.toUpperCase()}`;
                swalText  = "Are you sure to deny this document?";
                swalImg   = `${base_url}assets/modal/reject.svg`;
                break;
            case "cancelform":
                swalTitle = `CANCEL ${title.toUpperCase()}`;
                swalText  = "Are you sure to cancel this document?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
            case "drop":
                swalTitle = `DROP ${title.toUpperCase()}`;
                swalText  = "Are you sure to drop this document?";
                swalImg   = `${base_url}assets/modal/drop.svg`;
                break;
            case "uploadcontract":
                swalTitle = `UPLOAD CONTRACT`;
                swalText  = "Are you sure to upload this contract?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `DISCARD ${title.toUpperCase()}`;
                swalText  = "Are you sure to discard this process?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
        }
        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         200,
            imageHeight:        200,
            imageAlt:           "Custom image",
            showCancelButton:   true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   "No",
            confirmButtonText:  "Yes"
        })
    }

    function saveProjectBoard(method = "update", id = 0, callback = null,materialRequestID =0,stockOutID=0) {
        const confirmation = getConfirmation(method);
        confirmation.then(res => {
            if (res.isConfirmed) {

                if (method == "cancel") {
                    callback && callback();
                    Swal.fire({
                        icon:              'success',
                        title:             "Process successfully discarded!",
                        showConfirmButton: false,
                        timer:             2000
                    });
                } else {

                    const data = getProjectBoardData(id, method,materialRequestID,stockOutID);
                    // console.log(data)
                    // return false;
                    $.ajax({
                        method:      "POST",
                        url:         `Stock_out/saveProjectBoard`,
                        data,
                        cache:       false,
                        async:       false,
                        dataType:    "json",
                        beforeSend: function() {
                            $("#loader").show();
                        },
                        success: function(data) {
                            let result = data.split("|");
            
                            let isSuccess   = result[0];
                            let message     = result[1];
                            let insertedID  = result[2];
                            let dateCreated = result[3];
    
                            let swalTitle;
                            if (method == "submit") {
                                swalTitle = `Stock Out Form submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `Stock Out Form saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("STO", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("STO", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("STO", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("STO", dateCreated, insertedID)} dropped successfully!`;
                            } else if (method == "update") {
                                swalTitle = `${getFormCode("STO", dateCreated, insertedID)} updated successfully!`;
                            }
            
                            if (isSuccess == "true") {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    closeModals();
                                    callback && callback();
                                    Swal.fire({
                                        icon:              "success",
                                        title:             swalTitle,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
                                }, 500);
                            } else {
                                setTimeout(() => {
                                    $("#loader").hide();
                                    Swal.fire({
                                        icon:              "danger",
                                        title:             message,
                                        showConfirmButton: false,
                                        timer:             2000,
                                    });
                                }, 500);
                            }
                        },
                        error: function() {
                            setTimeout(() => {
                                $("#loader").hide();
                                showNotification("danger", "System error: Please contact the system administrator for assistance!");
                            }, 500);
                        }
                    }).done(function() {
                        setTimeout(() => {
                            $("#loader").hide();
                        }, 500);
                    })
                }
            } else {
                if (res.dismiss == "cancel" && method != "submit") {
                    if (method != "deny") {
                        if (method != "cancelform") {
                            callback && callback();
                            Swal.fire({
                                icon:              'success',
                                title:             "Process successfully discarded!",
                                showConfirmButton: false,
                                timer:             2000
                            });
                        }
                    } else {
                        
                    }
                } else if (res.isDismissed) {
                    if (method == "deny") {
                        
                    }
                }
            }
        });
    }
    // ----- END DATABASE RELATION -----

})