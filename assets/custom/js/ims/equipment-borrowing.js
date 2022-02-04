$(document).ready(function() {

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
    const allowedUpdate = isUpdateAllowed(43);


    
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
            url:      "Equipment_borrowing/getTimelineContent",
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
                            equipmentBorrowingStatus,
                            createdBy
                        } = tableData[0];
        
                        employeeID = employeeID == "0" ? createdBy : employeeID;
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            // isAllowed = timelineManagementBy || timelineManagementBy == null ? true : false
                            if (equipmentBorrowingStatus == 0 || equipmentBorrowingStatus == 1) {
                                isReadOnly = false;
                            }
                        } else if (employeeID == sessionID) {
                            if ( equipmentBorrowingStatus == 0) {
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
                    const isAllowed = isCreateAllowed(43);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}ims/equipment_borrowing?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}ims/equipment_borrowing?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}ims/equipment_borrowing?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}ims/equipment_borrowing`);
        }
    }
    // ----- END VIEW DOCUMENT -----
    
    // ----- TIMELINE DATA -----
    const getTimelineData = () => {

		const data  = getTableData(
            `ims_equipment_borrowing_tbl AS borrowing
             LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = borrowing.createdBy
             `,
            `CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
             borrowing.projectCode,
             borrowing.projectName,
             borrowing.inventoryAssetStatus,
             borrowing.equipmentBorrowingID ,
             borrowing.equipmentBorrowingCode,
             borrowing.materialWithdrawalCode,
             borrowing.materialWithdrawalID,
             borrowing.materialRequestID,
             borrowing.clientCode,
             borrowing.clientName,
             borrowing.dateNeeded`,
            ``);

            // const data  = getTableData(
            //     `ims_equipment_borrowing_tbl AS borrowing
            //      LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = borrowing.createdBy
            //      `,
            //     `CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            //      borrowing.projectCode,
            //      borrowing.projectName,
            //      borrowing.inventoryAssetStatus,
            //      borrowing.equipmentBorrowingID ,
            //      borrowing.equipmentBorrowingCode,
            //      borrowing.materialWithdrawalCode,
            //      borrowing.materialWithdrawalID,
            //      borrowing.materialRequestID,
            //      borrowing.clientCode,
            //      borrowing.clientName`,
            //     `IF(borrowing.employeeID = 0 ,borrowing.createdBy = ${sessionID},borrowing.employeeID = ${sessionID})`);
        return data;
    }
    // ----- END TIMELINE DATA -----

        // ----- CHECK ALL -----
        $(document).on("change", ".checkboxall", function() {
            let parentTable  =   $(this).closest(".assetTableRow");
            let checkBoxCount = parentTable.find(".checkboxassetrow").length;
            let getAssetID = $(this).attr("assetID");
            const getIndex = $(this).attr("index");
            const isChecked = $(this).prop("checked");
           
            $(".assetProjectTableBody"+getIndex+""+getAssetID+"  .checkboxassetrow").each(function(i, obj) {
                $(this).prop("checked", isChecked);
            });
            updateDeleteButton(parentTable);
        });
        
        $(document).on("click", "[type=checkbox]", function() {
            let parentTable  =   $(this).closest(".assetTableRow");
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
					{ targets: 2, width: 150 },
					{ targets: 3, width: 250 },
					{ targets: 4, width: 150 },
					{ targets: 5, width: 130 },
					{ targets: 6, width: 150 },
					// { targets: 5, width: 150 },
				],
			});

        const assetTableLength = $(`table.assetTable`).length;
        for(var i=0; i<assetTableLength; i++) {

            if ($.fn.DataTable.isDataTable(`#assetTable${i}`)) {
                $(`#assetTable${i}`).DataTable().destroy();
            }

            var table = $(`#assetTable${i}`)
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
			if (isCreateAllowed(43)) {
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
                        <th>Reference No.</th>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Date Needed</th>
                        <th>Asset Request Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                equipmentBorrowingID =0,
                equipmentBorrowingCode,
                materialWithdrawalCode     = 0,
                materialWithdrawalID     = 0,
                preparedBy     = "",
                projectName           = "",
                projectCode           = "",
                inventoryAssetStatus       = 0,
                clientCode       = "",
                clientName       = "",
                dateNeeded       = "",
            } = timeline;

            html += `
            <tr class="btnView" id="${encryptString(equipmentBorrowingID)}">
                <td>
                    <div>${equipmentBorrowingCode || "-"}</div>
                    <!-- <small style="color:#848482;">put description here</small> -->
                </td>
                <td>${preparedBy || "-"}</td>
                <td>${materialWithdrawalCode || "-"}</td>
                <td>
                    <div>
                        ${projectCode || '-'}
                    </div>
                    <small style="color:#848482;">${projectName || '-'}</small>
                </td>
                <td>
                    <div>
                        ${clientCode || '-'}
                    </div>
                    <small style="color:#848482;">${clientName || '-'}</small>
                </td>
                <td>${dateNeeded ? moment(dateNeeded).format("MMMM DD, YYYY") : "-"}</td>
                <td>${getStatusStyle(inventoryAssetStatus,true)}</td>
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
    $(document).on("click", ".btnShowAssetContent", function() {
        $parent  = $(this).closest("tr");
        const assetID   = $(this).attr("assetID");
        const assetCode    = $(this).attr("assetCode");
        const display  = $(this).attr("display") == "true";
        const myCaret  = display => !display ? "fa-caret-up" : "fa-caret-down";
        $(this).attr("display", !display);
        if (display) {
            $parent.find(`.assetContent[assetID="${assetID}"][assetCode="${assetCode}"]`).slideUp(500, function() {
                $(this).addClass("d-none");
            });
        } else {
            $parent.find(`.assetContent[assetID="${assetID}"][assetCode="${assetCode}"]`).hide().removeClass("d-none").slideDown(500);
        }
        $parent.find(`i[assetcaret="true"]`).removeClass(myCaret(!display)).addClass(myCaret(display));
    })

    // ----- END CLICK SHOW  CONTENT RECORDS -----

    // ----- GET ITEMS SERIAL NUMBER -----
	function getAssetSerialNumber(scope = {}, readOnly = false) {
		let {
			serialAssetNumber = "",
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
								name="serialAssetNumber"
								id="serialAssetNumber"
								data-allowcharacters="[A-Z][a-z][0-9][-]"
								minlength="17"
								maxlength="17"
								value="${serialAssetNumber}"
								autocomplete="off"
								required>
							<div class="d-block invalid-feedback mt-0 mb-1" id="invalid-serialAssetNumber"></div>
						</div>
					</div>
				</td>
			</tr>`;
		} else {
			html = `
			<tr>
				<td>
					<div class="servicescope">
						${serialAssetNumber || "-"}
					</div>
				</td>
			</tr>`;
		}

		
		return html;
	}
	// ----- END GET ITEMS SERIAL NUMBER -----

    // DISPLAY ITEM SERIAL NUMBER //
        function displayAssetSerialNumber(withdrawalAssetID = 0,materialRequestID =0,assetID = 0,readOnly = false){
            
            let assetSerialNumbersContent ='';
            let buttonAddSerialRow = '';
            // INFORMATION FOR SERIAL//
                const scopeData = getTableData(
                    `ims_withdrawal_equipment_borrowing_serial_number_tbl`,
                    ``,
                    `materialRequestID = ${materialRequestID} AND  assetID = ${assetID} AND  withdrawalAssetID = ${withdrawalAssetID}`
                );
                
                
                let serialNumberData  		= 	scopeData.filter(x => x.serialNumber == "" || !x.serialNumber);
                let serialNumberDataLength 	= 	serialNumberData.length;

                // assetSerialNumbersContent += `
                // <div class="table-responsive">
                //     <table class="table table-bordered">
                    
                //         <tbody class="tableSerialAssetBody">
                //         `;
                    
                //         if (scopeData.length > 0 && withdrawalAssetID != "" && serialNumberDataLength > 0) {
                //             assetSerialNumbersContent += scopeData.map(scope => {
                //                 return getAssetSerialNumber(scope, readOnly);
                //             }).join("");
                //         } else {
                //             assetSerialNumbersContent += getAssetSerialNumber({}, readOnly);
                //         }
                    
                // assetSerialNumbersContent += `
                //         </tbody>
                //     </table>
                    
                // </div>`;
                
                if(withdrawalAssetID){
                    assetSerialNumbersContent = `
                        <div class="table-responsive">
                            <table class="table table-bordered serial-number-table">
                            
                                <tbody class="tableSerialAssetBody">
                                `;
                            
                                if (scopeData.length > 0 && withdrawalAssetID != "") {
                                    assetSerialNumbersContent += scopeData.map(scope => {
                                        return getAssetSerialNumber(scope, true);
                                    }).join("");
                                } else {
                                    assetSerialNumbersContent += getAssetSerialNumber({}, true);
                                }
                            
                            assetSerialNumbersContent += `
                                </tbody>
                            </table>
                            
                        </div>`;
                }else{
                    assetSerialNumbersContent = `
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

                return [assetSerialNumbersContent,buttonAddSerialRow]; 
        }
    // END DISPLAY ITEM SERIAL NUMBER//

    // GENERATE ADD NEW ROW IN TABLE //
         function generateAddNewRow(assetID=0,materialRequestID=0){
            let tableStockContent = '';

            const assetSerialContent = displayAssetSerialNumber();
            const withdrawalAssetRemaining = getTableData(`ims_material_withdrawal_asset_tbl`,` ((SELECT DISTINCT(requestQuantity) FROM ims_request_assets_tbl WHERE assetID = ${assetID} AND materialRequestID = ${materialRequestID} AND inventoryValidationID IS NOT NULL AND bidRecapID IS NULL) - IFNULL(SUM(received),0)) as remainingValue`,` assetID = ${assetID} AND materialRequestID = ${materialRequestID}`);
            const getAvailableStocks = getTableData(`ims_stock_in_assets_tbl AS astStock 
            JOIN ims_inventory_asset_tbl AS ast ON ast.assetID = astStock.assetID
            `,
            `CASE
            WHEN IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0) <0 THEN 0
            ELSE IFNULL(SUM(astStock.quantity),0)-IFNULL(reOrderLevel,0)
            END AS availableStocks`,
            ` (astStock.stockOutDate IS NUll  OR astStock.stockOutDate  = '0000-00-00')
            AND (astStock.stockInDate IS NOT NULL OR astStock.stockInDate != '0000-00-00')
            AND astStock.assetID = ${assetID}`);
                tableStockContent +=  `<tr class="assetRecords-list-row" id="tableRow0" modulelistid assetID="${assetID}">
                                           
                                            <td>
                                                <div class="barcode">
                                                    <input class="form-control text-center validate"
                                                id="barcodeAsse${assetID}0"
                                                name="barcodeAsset"
                                                min="18"
                                                max="64"
                                                minlength="18"
                                                maxlength="64"
                                                index="0"
                                                assetID="${assetID}"
                                                withdrawalAssetID="0"
                                                materialRequestID="${materialRequestID}"
                                                
                                                >
                                                    <div class="invalid-feedback d-block" id="invalid-barcodeAsset0"></div>
                                                </div>
                                            </td>
                                            <td class="table-data-serial-number" index="0">
                                                    ${assetSerialContent[0]}
                                                    ${assetSerialContent[1]}
                                                </td>
                                            <td>
                                                <div class="borrowed">
                                                    <input class="form-control input-quantity text-center"
                                                value="0.00"
                                                id="borrowed0"
                                                name="borrowed"
                                                min="0.00"
                                                max="9999999999"
                                                minlength="1"
                                                maxlength="10"
                                                index="0"
                                                assetID="${assetID}"
                                                withdrawalAssetID="0"
                                                availableStocksValue="${getAvailableStocks.length > 0 ?formatAmount(getAvailableStocks[0].availableStocks): "0.00"}"
                                                >
                                                    <div class="invalid-feedback d-block" id="invalid-borrowed0"></div>
                                                </div>
                                            </td>
                                                <td>
                                                    <div class="availablestocks">
                                                        <span  name="availableStocks" assetID="${assetID}" index="0">${getAvailableStocks.length > 0 ?formatAmount(getAvailableStocks[0].availableStocks): "0.00"}</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="received">
                                                        <span>-</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="remaining">
                                                        <span  name="remaining" assetID="${assetID}" index="0">${withdrawalAssetRemaining.length > 0 ? formatAmount(withdrawalAssetRemaining[0].remainingValue) : "0.00"}</span>
                                                    </div>
                                            </td>
                                            <td>
                                                    <div class="borroweddate" >
                                                        <span name="borrowedDate" assetID="${assetID}" index="0">-</span>
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
            return tableStockContent;
    }
    // GENERATE ADD NEW ROW IN TABLE //

    //  ITEM RECORDS LIST //
    const getAssetContent = (milestoneTask = [],assetID = null, materialRequestID =null,withdrawalAssetStatus = 0) => {
        let tableStockContent ="";

     
        if(milestoneTask.length >0){
            console.log(milestoneTask)
            milestoneTask.map((milestone,index) => {
                const { withdrawalAssetID,
                    requestAssetID,
                    materialRequestID,
                    assetID,
                    requestQuantity,
                    borrowed,
                    received,
                    dateReceived ,
                    remaining,
                    borrowedDate,
                    barcode,
                    availableStocks,
                    remarks} = milestone;   
                // const { manHours, assignedEmployee, assignedManHours } = taskData(milestoneID);
            let readOnly  = (received ==0 || received ==null)  ? "" : "disabled";
            let disabled  = (received ==0 || received ==null)  ? "" : "disabled";

            const assetSerialContent = displayAssetSerialNumber(withdrawalAssetID,materialRequestID,assetID,readOnly);
           

            tableStockContent += `<tr class="assetRecords-list-row" id="tableRow${index}" modulelistid assetID="${assetID}">
                                        
                                        <td>
                                            <div class="barcode">
                                                <input class="form-control text-center"
                                            value="${barcode || "-"}"
                                            index="${index}"
                                            assetID="${assetID}"
                                            withdrawalAssetID="${withdrawalAssetID}"
                                            disabled
                                            >
                                                <div class="invalid-feedback d-block" id="invalid-notes0"></div>
                                            </div>
                                        </td>
                                        <td class="table-data-serial-number" index="${index}">
                                            ${assetSerialContent[0]}
                                        </td>
                                         <td>
                                                <div class="borrowed" >
                                                    <span>${ borrowed || "-"}</span>
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
                                                <div class="borroweddate" >
                                                    <span>${ borrowedDate  ? moment(borrowedDate).format("MMMM DD, YYYY") : "-"} </span>
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

            withdrawalAssetStatus == 0 || withdrawalAssetStatus == null ? tableStockContent += generateAddNewRow(assetID,materialRequestID) : "";
        }else{
            tableStockContent += generateAddNewRow(assetID,materialRequestID);
              
        }
        

        return [tableStockContent];
    }

    // END ITEM REDCORD LIST //

    // ----- DISPLAY ITEMS -----
    function displayAssets( phase = {}, index = 0, disabled) {
        const {
            assets       = []
        } = phase;
        console.log(phase)
        
        let taskHTML = "";
        
        assets.map((task,index) => {
            // console.log(task.milestoneTask)
			
            const {assetID,assetCode,assetName,assetBrandName, assetClassification,assetCategory,assetUom,requestQuantity,materialRequestID,withdrawalAssetStatus = 0, milestoneTask = [] } = task;
            const assetStatusRecord = (withdrawalAssetStatus ==  null || withdrawalAssetStatus ==  0 )   ? `<span class="badge badge-warning w-100">Pending</span>` : `<span class="badge badge-success w-100">Completed</span>` ;
            const assetContent = getAssetContent(milestoneTask,assetID,materialRequestID,withdrawalAssetStatus);

            taskHTML += `
            <tr class="assetTableRow" assetID="${assetID}">   
				<td style="position: relative;">    
					<div class="d-flex align-items-center justify-content-between btnShowAssetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;
							        width: 100%;
							        top: 0">
						<span>${assetCode}</span>
						&nbsp;&nbsp;<i class="fad fa-caret-down mr-3" assetcaret="true"></i>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;	
                                    top: 0">
							<span>${assetName}</span><br>
                            <small style="color:#848482;">${assetBrandName}</small>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;
							    	top: 0">
							<span>${assetClassification}</span><br>
							<small style="color:#848482;">${assetCategory}</small>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;	
						        	top: 0">
                        <span>${assetUom}</span><br>
							
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;
							        top: 0">
							<span>${requestQuantity}</span><br>
							
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
						
					</div>
				</td>
                <td style="position: relative;">
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						style       = "margin-top: 70px;">
                        
                        <table class="table" id="pcrDetails">
                            <thead style="line-height:8px; white-space:nowrap;">
                                <tr class="bg-dark">
                                    <th class="text-white">Barcode</th>
                                    <th class="text-white">Serial No.</th>
                                    <th class="text-white">Borrowed Quantity</th>
                                    <th class="text-white">Available Stocks</th>
                                    <th class="text-white">Received</th>
                                    <th class="text-white">Remaining</th>
                                    <th class="text-white">Borrowed Date</th>
                                    <th class="text-white">Received Date</th>
                                    <th class="text-white">Remarks</th>
                                </tr>
                            </thead>
                            
                            <tbody class="assetProjectTableBody${index+""+assetID}" >
                                ${assetContent[0]}
                            </tbody>
                        </table>`;
                        // ${withdrawalAssetStatus == 1? '' :
                        //     `<div class="w-100 text-left my-2">
                        //             <button class="btn btn-primary btnAddRow"  type="button" id="btnAddRow" index="${index}" assetID="${assetID}" materialRequestID="${materialRequestID}"><i class="fas fa-plus-circle"></i> Add Row</button>
                        //             <button class="btn btn-danger btnDeleteRow"  type="button" id="btnDeleteRow" index="${index}" assetID="${assetID}" materialRequestID="${materialRequestID}" disabled><i class="fas fa-minus-circle"></i> Delete Row/s</button>
                        //     </div>
                        // `}
    taskHTML += `
					</div>
				</td>
			
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
						display     ="false"
						style       ="cursor: pointer;
							        top: 0">
                        ${assetStatusRecord}	
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID      ="${assetID}"
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
                       BORROWED (ASSET/S)
                    </div>
                </div>

                <div class="w-100">
                    <table class="table assetTable" id="assetTable${index}">
                        <thead style="line-height:8px; white-space:nowrap;">
                            <tr class="bg-dark">
                                <th class="text-white">Asset Code</th>
                                <th class="text-white">Asset Name </th>
                                <th class="text-white">Asset Classification</th>
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
        $(`[name="serialAssetNumber"]`).each(function(i) {
            $(this).attr("id", `serialAssetNumber${i}`);
            $(this).parent().find(".invalid-feedback").attr("id", `invalid-serialAssetNumber${i}`);
        })
    }
    // ----- END UPDATE SERIAL NUMBER -----

    // ----- ADD SERIAL -----
    $(document).on("click", ".btnAddSerial", function() {
        let thisEvent 		= $(this);
        let thisCheck 		= thisEvent[0].checked;
        let thisTR 	  		= thisEvent.closest(`.assetRecords-list-row`);
        let thisTableData	= thisEvent.closest(`.assetRecords-list-row >.table-data-serial-number`);
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
                                let newSerial = getAssetSerialNumber();
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

        // const parentTable = $(this).closest("tr.assetTableRow");
        // checkSerialRowReceived(parentTable);
    })
    // ----- END ADD SERIAL -----

    function updateTableRows(){
        $(".assetRecords-list-row").each(function(i){
            // CHECKBOX
			$("td .action .checkboxassetrow", this).attr("id", `checkboxassetrow${i}`);

            // INPUTS ID's
            let assetID = 0;
            assetID =  $("td [name=barcodeAsset]", this).attr("assetID");
            
            $("td [name=barcodeAsset]", this).attr("id", `barcodeAsset${assetID}${i}`);
			$("td [name=barcodeAsset]", this).attr("index", i);

			$("td [name=borrowed]", this).attr("id", `borrowed${i}`);
			$("td [name=borrowed]", this).attr("index", i);

            $("td [name=availableStocks]", this).attr("id", `availableStocks${i}`);
			$("td [name=availableStocks]", this).attr("index", i);

            $("td [name=borrowedDate]", this).attr("id", `borrowedDate${i}`);
			$("td [name=borrowedDate]", this).attr("index", i);

            $("td [name=remaining]", this).attr("id", `remainingt${i}`);
			$("td [name=remaining]", this).attr("index", i);
            // $("td [name=notes]", this).attr("id", `notes${i}`);

            // INPUTS ID's INVALID FEEDBACK
            $("td [name=borrowed]", this).next().attr("id", `invalid-borrowed${i}`);
            $("td [name=borrowedDate]", this).next().attr("id", `invalid-borrowedDate${i}`);
            $("td [name=barcodeAsset]", this).next().attr("id", `invalid-barcodeAsset${i}`);
            $("td [name=barcodeAsset]", this).next().attr("id", `invalid-barcodeAsset${i}`);
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
        // let parentTable  =   $(this).closest(".assetTableRow");
        let getBtnDeleteAttribute  =  parentTable.attr("assetID");
        let checkBoxCount = parentTable.find(".checkboxassetrow").length;
        let count = 0;
        
        $(".checkboxassetrow").each(function() {
            $(this).prop("checked") && count++;
        });
        
        $(`.btnDeleteRow[assetID=${getBtnDeleteAttribute}]`).attr("disabled", count == 0);
    }

    function deleteTableRow(parentTable){  
        // console.log($(`.checkboxassetrow:checked`).length +"!="+ $(`.checkboxassetrow`).length )
        if (parentTable.find(".checkboxassetrow:checked").length != parentTable.find(`.checkboxassetrow`).length) {
			Swal.fire({
				title:              "DELETE ASSET RECORD/S",
				text:               "Are you sure to delete the asset record/s?",
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
					$(`.checkboxassetrow:checked`).each(function(i, obj) {
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
     function checkBarcode(parent){
        const assetID        = parent.attr("assetID");
        const index         = parent.attr("index");
        const id            = parent.attr("id");
        const withdrawalAssetID    = parent.attr("withdrawalAssetID");
        const valueLength = parent.val().length;
        const value = parent.val();
        const characterLength = 18;
        let warningCondition = false;
        let isInvalid        = false;
        // $("#"+id).addClass("is-invalid").addClass("validate");
        if(valueLength >= characterLength){
            const validatebarcode = getTableData(`ims_stock_in_assets_tbl`,
            `barcode`,
            `stockOutDate IS NUll 
            AND stockInDate IS NOT NULL 
            AND assetID = ${assetID} AND barcode = '${value}'`);
            if(validatebarcode.length<=0){
               $("#"+id).addClass("is-invalid").removeClass("validate")
               $("#invalid-barcodeAsset"+index).text("Barcode not exist!");
                warningCondition = true;
                isInvalid        = true;
            }else{
                $("#"+id).removeClass("is-invalid").addClass("validate");
                $("#invalid-barcodeAsset"+index).text("")
            }
            
        }
        else{ 
            warningCondition = true;
            isInvalid = true;
            $("#"+id).addClass("is-invalid").addClass("validate");
            $("#invalid-barcodeAsset"+index).text("Please enter at least "+characterLength+" characters.");
        }
        
        if(value == 0){
            parent.closest("tr").find("span").eq(3).text("-");


        }else{
            parent.closest("tr").find("span").eq(3).text(moment().format("MMMM DD, YYYY"));

        }
        
        if(warningCondition && isInvalid){
            setTimeout(() => {  
                if(valueLength >= characterLength){
                    parent.addClass("is-invalid").removeClass("validate")
                    $("#invalid-barcodeAsset"+index).text("Barcode not exist!");
                }else{
                    parent.addClass("is-invalid").addClass("validate");
                    $("#invalid-barcodeAsset"+index).text("Please enter at least "+characterLength+" characters.");
                }     
            }, 1000);    
        }
     }

    $(document).on("change",`[name="barcodeAsset"],[name="borrowed"]`,function(){
    	var getBarcode = $(this).closest("tr").find(`[name="barcodeAsset"]`).val();
    	var getQuantity = +$(this).closest("tr").find(`[name="borrowed"]`).val();
        var getID = $(this).attr("name");
        $parent = $(this);

        var getBarcodeIsInValid = $(this).closest("tr").find(`[name="barcodeAsset"]`).hasClass("is-invalid");
    	var getQuantityIsInValid = +$(this).closest("tr").find(`[name="borrowed"]`).hasClass("is-invalid");

        if(getBarcode == "" && getQuantity != 0){
        	$(this).closest("tr").find(`[name="barcodeAsset"]`).addClass("is-invalid");
        	$(this).closest("tr").find(`td [name="barcodeAsset"]`).closest("div").find(".invalid-feedback").text("Please input barcode.");

        	$(this).closest("tr").find(`[name="borrowed"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="borrowed"]`).closest("div").find(".invalid-feedback").text("");
        }

        if(getBarcode != "" && getQuantity == 0){
        	$(this).closest("tr").find(`[name="borrowed"]`).addClass("is-invalid");
        	$(this).closest("tr").find(`td [name="borrowed"]`).closest("div").find(".invalid-feedback").text("Please input quantity.");

        	$(this).closest("tr").find(`[name="barcodeAsset"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="barcodeAsset"]`).closest("div").find(".invalid-feedback").text("");
        }

        if(getBarcode != "" &&  !getBarcodeIsInValid && getQuantity != 0 && !getQuantityIsInValid ){

            $(this).closest("tr").find(`[name="barcodeAsset"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="barcodeAsset"]`).closest("div").find(".invalid-feedback").text("");

        	$(this).closest("tr").find(`[name="borrowed"]`).removeClass("is-invalid").removeClass("is-valid");
        	$(this).closest("tr").find(`td [name="borrowed"]`).closest("div").find(".invalid-feedback").text("");
        }else{
        	 if(getBarcode == "" && getQuantity == 0 ){
				$(this).closest("tr").find(`[name="barcodeAsset"]`).removeClass("is-invalid").removeClass("is-valid");
				$(this).closest("tr").find(`td [name="barcodeAsset"]`).closest("div").find(".invalid-feedback").text("");

				$(this).closest("tr").find(`[name="borrowed"]`).removeClass("is-invalid").removeClass("is-valid");
				$(this).closest("tr").find(`td [name="borrowed"]`).closest("div").find(".invalid-feedback").text("");
			}
        } 
        if(getID == "barcodeAsset"){
            checkBarcode($parent);
        }   
    })

    // ----- END KEYUP BARCODE -----  

    // CHECK SERIAL DUPLICATES//

    $(document).on("change","[name=serialAssetNumber]",function(){
		const serialval   = $(this).val(); 
		const addressID = $(this).attr("id");
		var $parent = $(this);
		var flag = ["true"];

		if(serialval.length ==17){
			$(`[name="serialAssetNumber"]`).each(function(i) {
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
	
			$(`[name="serialAssetNumber"]`).each(function(i) {
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
    $(document).on("keyup", `[name="borrowed"]`, function() {
        const assetID               = $(this).attr("assetID") || 0;
        const index                 = $(this).attr("index");
        const withdrawalAssetID     = $(this).attr("withdrawalAssetID");
        const value                 = +$(this).val();
        var availableStocksValue    = +$(this).attr("availableStocksValue");
        var requestQuantity         = +$(`div[assetID=${assetID}]`).find("span").eq(4).text().replace(",","") || 0;

        // const getRemainingItem = +$(`[name="remainingAsset"][assetID="${assetID}"]`).attr("remainingValueItem").replaceAll(",","");
        // var computeRemainingItem =0;
        // computeRemainingItem = getRemainingItem - value;
        
        if(value > requestQuantity){
            $(this).val(0);
            showNotification("danger", "Incorrect Quantity Inserted!");
            $(this).closest("tr").find("span").eq(3).text("-");
            return false;
        }

        if(value > availableStocksValue){
            $(this).val(0);
            showNotification("danger", "Incorrect Quantity Inserted!");
            $(this).closest("tr").find("span").eq(3).text("-");
            return false;
        }
        
        if(value == 0){
            $(this).closest("tr").find("span").eq(3).text("-");
            $(`[name="remainingAsset"][withdrawalAssetID="${withdrawalAssetID}"][assetID="${assetID}"]`).text(formatAmount(getRemainingItem));


        }else{
            $(this).closest("tr").find("span").eq(3).text(moment().format("MMMM DD, YYYY"));
            // $(`[name="remainingAsset"][withdrawalAssetID="${withdrawalAssetID}"][assetID="${assetID}"]`).text(formatAmount(computeRemainingItem));

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
                equipmentBorrowingID      = "",
                materialRequestID           ="",
            } = data && data[0];
            console.log("button")
           console.log(data)
            button = `
            <button 
                class="btn btn-submit px-5 p-2"  
                id="btnSubmit"
                materialWithdrawalID="${encryptString(materialWithdrawalID)}"
                materialRequestID="${encryptString(materialRequestID)}"
                equipmentBorrowingID ="${encryptString(equipmentBorrowingID)}"
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
            equipmentBorrowingCode,
            materialWithdrawalID,
            materialWithdrawalCode,
            employeeID,
            inventoryAssetStatus,
            equipmentBorrowingStatus,
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
            equipmentBorrowingReason,
            equipmentBorrowingRemarks,
            createdAt,
            withdrawalDetails ,
            createdBy
        } = data && data[0];

        console.log(data)
		
        // ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? (employeeID == "0" ? createdBy : employeeID) : sessionID);
		// ----- END GET EMPLOYEE DATA -----

        $("#btnBack").attr("materialWithdrawalID", encryptString(materialWithdrawalID));
		$("#btnBack").attr("status", equipmentBorrowingStatus);

        const disabled = readOnly ? "disabled" : "";


        let button = disabled ? "" :  formButtons(data);

        let assetHTML = "";

        withdrawalDetails.map((phase, index) => {
            assetHTML += displayAssets( phase, index, disabled);
        })
    
       

        let html = `

                <div class="row px-2">
			
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${equipmentBorrowingCode || "-"}
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${getStatusStyle(equipmentBorrowingStatus,true)}
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
                        ${equipmentBorrowingRemarks || "----"}
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
						value="${materialWithdrawalCode  || "-"}">
                </div>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						disabled 
						value="${projectCode  || "-"}">
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
						value="${projectCategory  || "-"}">
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

            <div  class="col-sm-12">
                ${assetHTML}
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
            updateTableRows();
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
        $(`[name="barcodeAsset"]`).each(function(i){
            let checkValue =  $(this).val();
            let quantity =  +$(this).closest("tr").find(`.input-quantity[name="borrowed"]`).val();
           
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
        const equipmentBorrowingID = decryptString($(this).attr("id"));
        setTimeout(() => {
            console.log(equipmentBorrowingID)
            viewDocument(equipmentBorrowingID);
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
        
        let getAssetID = $(this).attr("assetID");
        let getmaterialRequestID = $(this).attr("materialRequestID");
        const getIndex = $(this).attr("index");
        let row = getAssetContent(0,getAssetID,getmaterialRequestID);
        $(".assetProjectTableBody"+getIndex+""+getAssetID).append(row);  
        updateTableRows();
        initQuantity();

      
    });

    $(document).on("click", ".btnDeleteRow", function(){
        let parentTable  =   $(this).closest(".assetTableRow");
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
		const id                    = decryptString($(this).attr("materialWithdrawalID"));
		const materialRequestID     = decryptString($(this).attr("materialRequestID"));
		const equipmentBorrowingID  = decryptString($(this).attr("equipmentBorrowingID"));
        const checkValidateData     = checkData();

        if(checkValidateData){
            const validateBarcode       = $("[name=barcodeAsset]").hasClass("is-invalid");
            let serialNumberCondition   = $("[name=serialAssetNumber]").hasClass("is-invalid");
            let validateQuantity        = $("[name=borrowed]").hasClass("is-invalid");
            if( !validateBarcode && !serialNumberCondition && !validateQuantity){
                const validate          = validateForm("pcrDetails");
                if(validate){
                    formButtonHTML(this,true);

                setTimeout(() => {
                    // validateInputs().then(res => {
                    //     if (res) {
                            saveProjectBoard("update", id, pageContent, materialRequestID,equipmentBorrowingID );
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
    const getProjectBoardData = (materialWithdrawalID = 0, method = "save",materialRequestID =0,equipmentBorrowingID  =0) => {
        let data = {
            equipmentBorrowingID,
            materialWithdrawalID,
            timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
            materialRequestID : materialRequestID,
            assets: []
        };

       

        $(`[name="barcodeAsset"]`).each(function(i) {
            $parent = $(this).closest("tr");
            const index = $(this).attr("index");
            const assetID = $(this).attr("assetID");
            const getmaterialRequestID = $(this).attr("materialRequestID");

            const barcode = $(`[name="barcodeAsset"][assetID="${assetID}"][index="${index}"]`).val().replaceAll(",","");
            const borrowed = $(`.input-quantity[name="borrowed"][assetID="${assetID}"][index="${index}"]`).val().replaceAll(",","");
            const availableStocks = $(`[name="availableStocks"][assetID="${assetID}"][index="${index}"]`).val().replaceAll(",","");
            const remainingAsset = $(`[name="remaining"][assetID="${assetID}"][index="${index}"]`).text().replaceAll(",","");;
            var borrowedDate = $(`[name="borrowedDate"][assetID="${assetID}"][index="${index}"]`).text() || "";

            if(borrowedDate != "-"){
                borrowedDate = moment($(`[name="borrowedDate"][assetID="${assetID}"][index="${index}"]`).text()).format("YYYY-MM-DD");
            }else{
                borrowedDate = "";
            }

            if(barcode !=""){
            let requestAssetData			= getTableData("ims_request_assets_tbl", "", `materialRequestID = '${getmaterialRequestID}' AND assetID = '${assetID}'`,`inventoryValidationID IS NOT NULL AND bidRecapID IS NULL`);
            let tableData 				= requestAssetData[0];
            // if(requestAssetData.length !=0){
            let requestAssetID  = tableData.requestAssetID ;
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
            let assetCode = tableData.assetCode;
            let assetBrandName = tableData.assetBrandName;
            let assetName = tableData.assetName;
            let assetClassification = tableData.assetClassification;
            let assetCategory = tableData.assetCategory;
            let assetUom = tableData.assetUom;
            let assetDescription = tableData.assetDescription;
            let files = tableData.files;
            let remarks = tableData.remarks;
            let requestQuantity = tableData.requestQuantity;

    
            let reservedAsset    = tableData.reservedAsset;
            let forPurchase 	=tableData.forPurchase;				


            // }

            const temp = {
                materialWithdrawalID,
                borrowed,
                remainingAsset,
                borrowedDate,
                requestAssetID,
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
                assetID,
                assetCode,
                assetBrandName,
                assetName,
                assetClassification,
                assetCategory,
                assetUom,
                assetDescription,
                files,
                remarks,
                requestQuantity,
                reservedAsset,
                forPurchase,
                barcode,
                availableStocks,
                serials:[]
            };
          
            $(`td .serial-number-table tbody > tr`, $parent).each(function(i) {
               let serialAssetNumber = $(this).find(`[name="serialAssetNumber"]`,this).val()?.trim();

              
                let serial = {
                    equipmentBorrowingID  :equipmentBorrowingID ,
                    materialWithdrawalID : materialWithdrawalID,
                    materialRequestID : getmaterialRequestID,
                    assetID:       assetID,
                    serialAssetNumber
                };

            temp.serials.push(serial);

            })
          
            data.assets.push(temp);
        }
        })

        // console.log(data)
        // return false;
        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- DATABASE RELATION -----
    const getConfirmation = method => {
        const title = "Equipment Borrowing";
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

    function saveProjectBoard(method = "update", id = 0, callback = null,materialRequestID =0,equipmentBorrowingID =0) {
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

                    const data = getProjectBoardData(id, method,materialRequestID,equipmentBorrowingID );
                    // console.log(data)
                    // return false;
                    $.ajax({
                        method:      "POST",
                        url:         `Equipment_borrowing/saveProjectBoard`,
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
                                swalTitle = `Equipment Borrowing Form submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `Equipment Borrowing Form saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} dropped successfully!`;
                            } else if (method == "update") {
                                swalTitle = `${getFormCode("EBF", dateCreated, insertedID)} updated successfully!`;
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