 $(document).ready(function() {

    // ----- REUSABLE VARIABLE/FUNCTIONS -----
    const allowedUpdate = isUpdateAllowed(42);


    
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
            url:      "material_withdrawal/getTimelineContent",
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
                            materialWithdrawalStatus,
                            createdBy
                        } = tableData[0];
        
                        employeeID = employeeID == "0" ? createdBy : employeeID;
                        let isReadOnly = true, isAllowed = true;
        
                        if (employeeID != sessionID) {
                            isReadOnly = true;
                            // isAllowed = timelineManagementBy || timelineManagementBy == null ? true : false
                            if (materialWithdrawalStatus == 0 || materialWithdrawalStatus == 1) {
                                isReadOnly = false;
                            }
                        } else if (employeeID == sessionID) {
                            if ( materialWithdrawalStatus == 0) {
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
                    const isAllowed = isCreateAllowed(42);
                    pageContent(isAllowed);
                }
            }
        }
        
    }

    function updateURL(view_id = 0, isAdd = false) { 
        if (view_id && !isAdd) {
            window.history.pushState("", "", `${base_url}ims/material_withdrawal?view_id=${view_id}`);
        } else if (isAdd) {
            if (view_id) {
                window.history.pushState("", "", `${base_url}ims/material_withdrawal?view_id=${view_id}`);
            } else {
                // window.history.pushState("", "", `${base_url}ims/material_withdrawal?add`);
            }
        } else {
            window.history.pushState("", "", `${base_url}ims/material_withdrawal`);
        }
    }
    // ----- END VIEW DOCUMENT -----
    
    // ----- TIMELINE DATA -----
    const getTimelineData = () => {

		const data  = getTableData(
            `ims_material_withdrawal_tbl AS imw
             LEFT JOIN hris_employee_list_tbl AS helt ON helt.employeeID = imw.createdBy
             `,
            `CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
             imw.materialWithdrawalID,imw.materialWithdrawalCode,imw.projectCode,imw.projectName,imw.inventoryItemStatus,inventoryAssetStatus,imw.materialRequestID,imw.clientCode,imw.clientName`,
            `IF(imw.employeeID = 0 ,imw.createdBy = ${sessionID},imw.employeeID = ${sessionID})`);
        return data;
    }
    // ----- END TIMELINE DATA -----
    

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
					{ targets: 5, width: 150 },
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
						{ targets: 3, width: 50 },
                        { targets: 4, width: 80  },
                        { targets: 5, width: 80 },
						{ targets: 6, width: 80 },
                        { targets: 7, width: 80  },
                        { targets: 8, width: 170 },
                        { targets: 9, width: 170 },
                        { targets: 10, width: 250 },
                        { targets: 11, width: 100 },
                    ],
                });
        }

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
						{ targets: 3, width: 50 },
                        { targets: 4, width: 80  },
                        { targets: 5, width: 80 },
						{ targets: 6, width: 80 },
                        { targets: 7, width: 80  },
                        { targets: 8, width: 170 },
                        { targets: 9, width: 170 },
                        { targets: 10, width: 250 },
                        { targets: 11, width: 100 },
                    ],
                });
        }
    }
    // ----- END DATATABLES -----


    // ----- HEADER BUTTON -----
	function headerButton(isAdd = true, text = "Add") {
		let html;
		if (isAdd) {
			if (isCreateAllowed(42)) {
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
                        <th>Project</th>
                        <th>Client</th>
                        <th>Item Request Status</th>
                        <th>Asset Request Status</th>
                    </tr>
                </thead>
                <tbody>`;

        timelineData.map(timeline => {

            const { 
                materialWithdrawalCode     = 0,
                materialWithdrawalID     = 0,
                preparedBy     = "",
                projectName           = "",
                projectCode           = "",
                inventoryAssetStatus       = 0,
                inventoryItemStatus       = 0,
                clientCode       = "",
                clientName       = "",
            } = timeline;

            html += `
            <tr class="btnView" id="${encryptString(materialWithdrawalID)}">
                <td>
                    <div>${materialWithdrawalCode !="null" ? materialWithdrawalCode : "-"}</div>
                    <!-- <small style="color:#848482;">put description here</small> -->
                </td>
                <td>${preparedBy || "-"}</td>
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
                <td>${getStatusStyle(inventoryItemStatus,true)}</td>
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

    // ----- DISPLAY ITEMS -----
    function displayItems( phase = {}, index = 0, disabled) {
        const {
            items      = [],
            assets      = [],
        } = phase;

    

        const getItemContent = (milestoneTask = [],itemID = null,) => {
            let stockOutContent     = ""; 
            let receivedContent = ""; 
            let remainingContent = "";
			let stockOutDateContent  ="";
            let remarksContent = "";
            let receivedDateContent ="";

         
			// console.log(milestoneTask)
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
					remarks} = milestone;
                // const { manHours, assignedEmployee, assignedManHours } = taskData(milestoneID);
            let disabled  = (received ==0 || received ==null)  ? "" : "disabled";
            let tagName  = (received ==0 || received ==null)  ? `name="withdrawalItemID"` : "disabled";
                stockOutContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                       ${tagName}
                        index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        >${formatAmount(stockOut)} </span>
                </div>`;

				

				receivedContent += `
                <div class="form-group my-1 text-center">
                    <input class="form-control input-quantity text-center"
                        value="${formatAmount(received)}"
                        stockOutValue="${formatAmount(stockOut)}"
                        name="receivedItems"
                        min="0.00"
                        max="9999999999"
                        minlength="1"
                        maxlength="10"
                        index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        ${disabled}>
                    <div class="invalid-feedback d-block"></div>
                </div>`;

                remainingContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                        name="remainingItem"
                        index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        remainingValueItem="${formatAmount(requestQuantity)}"
                        >${formatAmount(remaining)} </span>
                </div>`;

				stockOutDateContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                    index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        >${ stockOutDate  ? moment(stockOutDate).format("MMMM DD, YYYY") : "-"} </span>
                </div>`;

                receivedDateContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                        name="receivedDateItem"
                        index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        >${ (dateReceived == "0000-00-00" || dateReceived == null)  ?  "-" : moment(dateReceived ).format("MMMM DD, YYYY")} </span>
                </div>`;

                remarksContent += `
                <div class="form-group my-1 text-center">
                    <textarea class="form-control validate" 
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                        minlength="2" 
                        maxlength="325" 
                        id="itemRemarks" 
                        name="itemRemarks" 
                        index="${index}"
                        itemID="${itemID}"
                        withdrawalItemID="${withdrawalItemID}"
                        rows="2" 
                        style="resize:none;"
                        ${disabled}>${remarks || ""}</textarea>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
            })

            return [stockOutContent, receivedContent, remainingContent,stockOutDateContent,receivedDateContent,remarksContent];
        }
        
        let taskHTML = "";
        items.map((task,index) => {
			
            const {itemID,itemCode,itemName,itemBrandName, itemClassification,itemCategory,itemUom,requestQuantity,materialRequestID,withdrawalItemStatus = 0, milestoneTask = [] } = task;
            const itemContent = getItemContent(milestoneTask,itemID);
            const itemStatusRecord = (withdrawalItemStatus ==  null || withdrawalItemStatus ==  0 )   ? `<span class="badge badge-warning w-100">Pending</span>` : `<span class="badge badge-success w-100">Completed</span>` ;

            taskHTML += `
            <tr>   
				<td style="position: relative;">    
					<div class="d-flex align-items-center justify-content-between btnShowItemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							width: 100%;
							top: 0">
						<span>${itemCode}</span>
						&nbsp;&nbsp;<i class="fad fa-caret-down mr-3" itemcaret="true"></i>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${itemName}</span><br>
							 <small style="color:#848482;">${itemBrandName}</small>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${itemClassification}</span><br>
							 <small style="color:#848482;">${itemCategory}</small>
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${itemUom}</span><br>
							
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${requestQuantity}</span><br>
							
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[0]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[1]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[2]}
					</div>
				</td>
				
				<td style="position: relative;">
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[3]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[4]}
					</div>
				</td>
                <td style="position: relative;">    
					
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
						${itemContent[5]}
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
                            ${itemStatusRecord}
							
					</div>
					<div class="d-none itemContent" 
						itemCode    = "${itemCode}"
						itemID="${itemID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
            </tr>`;
			
        })

        let html = `
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                       WITHDRAWN (ITEM/S)
                    </div>
                </div>

                <div class="w-100">
                    <table class="table itemTable" id="itemTable${index}">
                        <thead style="line-height:8px; white-space:nowrap;">
                            <tr class="bg-dark">
                                <th class="text-white">Item Code</th>
                                <th class="text-white">Item Name</th>
                                <th class="text-white">Item Classification</th>
                                <th class="text-white">UOM</th>
                                <th class="text-white">Quantity</th>
                                <th class="text-white">Stock Out</th>
                                <th class="text-white">Received</th>
                                <th class="text-white">Remaining</th>
                                <th class="text-white">Stock Out Date</th>
                                <th class="text-white">Received Date</th>
                                <th class="text-white">Remarks</th>
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


      // ----- DISPLAY ASSETS -----
      function displayAssets( phase = {}, index = 0, disabled) {
        const {
            items      = [],
            assets      = [],
        } = phase;

       

        const getAssetContent = (milestoneTask = [],assetID = null,) => {
            let stockOutContent     = ""; 
            let receivedContent = ""; 
            let remainingContent = "";
			let borrowedDateContent  ="";
            let remarksContent = "";
            let receivedDateContent ="";

         
			
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
					remarks} = milestone;
                // const { manHours, assignedEmployee, assignedManHours } = taskData(milestoneID);
            let disabled  = (received ==0 || received ==null)  ? "" : "disabled";
               
                stockOutContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                        name="withdrawalAssetID"
                        index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        >${formatAmount(borrowed)} </span>
                </div>`;

				

				receivedContent += `
                <div class="form-group my-1 text-center">
                    <input class="form-control input-quantity text-center"
                        value="${formatAmount(received)}"
                        borrowedValue="${formatAmount(borrowed)}"
                        name="receivedAssets"
                        min="0.00"
                        max="9999999999"
                        minlength="1"
                        maxlength="10"
                        index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        ${disabled}>
                    <div class="invalid-feedback d-block"></div>
                </div>`;

                remainingContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                        name="remainingAsset"
                        index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        remainingValueAsset ="${formatAmount(requestQuantity)}"
                        >${formatAmount(remaining)} </span>
                </div>`;

				borrowedDateContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                    index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        >${ borrowedDate  ? moment(borrowedDate).format("MMMM DD, YYYY") : "-"} </span>
                </div>`;

                receivedDateContent += `
                <div class="form-group my-1 text-center">
                    <span class=""
                        name="receivedDateAsset"
                        index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        >${ (dateReceived == "0000-00-00" || dateReceived == null)  ?  "-" : moment(dateReceived ).format("MMMM DD, YYYY")} </span>
                </div>`;

                remarksContent += `
                <div class="form-group my-1 text-center">
                    <textarea class="form-control validate" 
                        data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]" 
                        minlength="2" 
                        maxlength="325" 
                        id="assetRemarks" 
                        name="assetRemarks" 
                        index="${index}"
                        assetID="${assetID}"
                        withdrawalAssetID="${withdrawalAssetID}"
                        rows="2" 
                        style="resize:none;"
                        ${disabled}>${remarks || ""}</textarea>
                    <div class="invalid-feedback d-block"></div>
                </div>`;
            })

            return [stockOutContent, receivedContent, remainingContent,borrowedDateContent,receivedDateContent,remarksContent];
        }
        
        let taskHTML = "";
        assets.map((asset,index) => {
			
            const {assetID,assetCode,assetName,assetBrandName, assetClassification,assetCategory,assetUom,requestQuantity,materialRequestID,withdrawalAssetStatus = 0, milestoneTask = [] } = asset;
            const assetContent = getAssetContent(milestoneTask,assetID);
            const assetStatusRecord = (withdrawalAssetStatus ==  null || withdrawalAssetStatus ==  0 )   ? `<span class="badge badge-warning w-100">Pending</span>` : `<span class="badge badge-success w-100">Completed</span>` ;

            taskHTML += `
            <tr>   
				<td style="position: relative;">    
					<div class="d-flex align-items-center justify-content-between btnShowAssetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							width: 100%;
							top: 0">
						<span>${assetCode}</span>
						&nbsp;&nbsp;<i class="fad fa-caret-down mr-3" assetcaret="true"></i>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${assetName}</span><br>
							 <small style="color:#848482;">${assetBrandName}</small>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${assetClassification}</span><br>
							 <small style="color:#848482;">${assetCategory}</small>
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${assetUom}</span><br>
							
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
							<span>${requestQuantity}</span><br>
							
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						
					</div>
				</td>
				<td style="position: relative;">
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[0]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[1]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[2]}
					</div>
				</td>
				
				<td style="position: relative;">
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[3]}
					</div>
				</td>
				<td style="position: relative;">    
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[4]}
					</div>
				</td>
                <td style="position: relative;">    
					
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
						${assetContent[5]}
					</div>
				</td>
				<td style="position: relative;">    
					<div class="" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						display="false"
						style="cursor: pointer;
							
							top: 0">
                            ${assetStatusRecord}
							
					</div>
					<div class="d-none assetContent" 
						assetCode    = "${assetCode}"
						assetID="${assetID}"
						style    = "margin-top: 70px;">
					
					</div>
				</td>
            </tr>`;
			
        })

        let html = `
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <div class="text-primary font-weight-bold" style="font-size: 1.2rem;">
                     WITHDRAWN (ASSET/S)
                    </div>
                </div>

                <div class="w-100">
                    <table class="table assetTable" id="assetTable${index}">
                        <thead style="line-height:8px; white-space:nowrap;">
                            <tr class="bg-dark">
                                <th class="text-white">Asset Code</th>
                                <th class="text-white">Asset Name</th>
                                <th class="text-white">Asset Classification</th>
                                <th class="text-white">UOM</th>
                                <th class="text-white">Quantity</th>
                                <th class="text-white">Borrowed Quantity</th>
                                <th class="text-white">Received</th>
                                <th class="text-white">Remaining</th>
                                <th class="text-white">Date Borrowed</th>
                                <th class="text-white">Received Date</th>
                                <th class="text-white">Remarks</th>
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
    // ----- END DISPLAY ASSETS -----


   


    // ----- KEYUP QUANTITY -----
    $(document).on("keyup", `[name="receivedItems"]`, function() {
        const itemID    = $(this).attr("itemID");
        const withdrawalItemID    = $(this).attr("withdrawalItemID");
        const index = $(this).attr("index");
        const value = +$(this).val();
        var stockOutValue = +$(this).attr("stockOutValue");
        const getRemainingItemDefault = +$(`[name="remainingItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"]`).attr("remainingValueItem").replaceAll(",","");
        var computeRemainingItem =0;
      

        $getAllReceivedItems =0;
        $(`[name="receivedItems"][itemID="${itemID}"]`).each(function(){
        
            $getAllReceivedItems += +$(this).val().replaceAll(",","") || 0;

        })

        computeRemainingItem = getRemainingItemDefault - $getAllReceivedItems;


        if(value > stockOutValue){
            $(this).val(0);
            showNotification("danger", "Incorrect Quantity Inserted!");
            
        }

        if(value == 0){
            $(`[name="receivedDateItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"][index=${index}]`).text("-");
            $(`[name="remainingItem"][itemID="${itemID}"]`).text(formatAmount(computeRemainingItem));


        }else{
            $(`[name="receivedDateItem"][withdrawalItemID="${withdrawalItemID}"][itemID="${itemID}"][index=${index}]`).text(moment().format("MMMM DD, YYYY"));
            
            if(computeRemainingItem <0){
                $(`[name="remainingItem"][itemID="${itemID}"]`).text(formatAmount(0));

            }else{
                $(`[name="remainingItem"][itemID="${itemID}"]`).text(formatAmount(computeRemainingItem));

            }

        }

    });

    $(document).on("keyup", `[name="receivedAssets"]`, function() {
        const assetID    = $(this).attr("assetID");
        const withdrawalAssetID    = $(this).attr("withdrawalAssetID");
        const index = $(this).attr("index");
        const value = +$(this).val();
        var borrowedValue = +$(this).attr("borrowedValue");
        const getRemainingAssetDefault = +$(`[name="remainingAsset"][withdrawalAssetID="${withdrawalAssetID}"][assetID="${assetID}"]`).attr("remainingValueAsset").replaceAll(",","");
        var computeRemainingAsset =0;
      

        $getAllReceivedAssets =0;
        $(`[name="receivedAssets"][assetID="${assetID}"]`).each(function(){
        
            $getAllReceivedAssets += +$(this).val().replaceAll(",","") || 0;

        })

        computeRemainingAsset = getRemainingAssetDefault - $getAllReceivedAssets;


        if(value > borrowedValue){
            $(this).val(0);
            showNotification("danger", "Incorrect Quantity Inserted!");
            
        }

        if(value == 0){
            $(`[name="receivedDateAsset"][withdrawalAssetID="${withdrawalAssetID}"][assetID="${assetID}"][index=${index}]`).text("-");
            $(`[name="remainingAsset"][assetID="${assetID}"]`).text(formatAmount(computeRemainingAsset));


        }else{
            $(`[name="receivedDateAsset"][withdrawalAssetID="${withdrawalAssetID}"][assetID="${assetID}"][index=${index}]`).text(moment().format("MMMM DD, YYYY"));
            
            if(computeRemainingAsset <0){
                $(`[name="remainingAsset"][assetID="${assetID}"]`).text(formatAmount(0));

            }else{
                $(`[name="remainingAsset"][assetID="${assetID}"]`).text(formatAmount(computeRemainingAsset));

            }

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
                inventoryValidationID = "",
            } = data && data[0];

        //    console.log(data)
            button = `
            <button 
                class="btn btn-submit px-5 p-2"  
                id="btnSubmit"
                materialWithdrawalID="${encryptString(materialWithdrawalID)}"
                inventoryValidationID="${encryptString(inventoryValidationID)}"
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
            materialWithdrawalID,
            materialWithdrawalCode,
            employeeID,
            inventoryItemStatus,
            inventoryAssetStatus,
            materialWithdrawalStatus,
            materialRequestID,
            materialRequestCode,
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
            materialWithdrawalRemarks,
            createdAt,
            withdrawalDetails,
            createdBy
        } = data && data[0];
		
        // ----- GET EMPLOYEE DATA -----
		let {
			fullname:    employeeFullname    = "",
			department:  employeeDepartment  = "",
			designation: employeeDesignation = "",
		} = employeeData(data ? (employeeID == "0" ? createdBy : employeeID) : sessionID);
		// ----- END GET EMPLOYEE DATA -----

        $("#btnBack").attr("materialWithdrawalID", encryptString(materialWithdrawalID));
		$("#btnBack").attr("status", materialWithdrawalStatus);

        const disabled = readOnly ? "disabled" : "";


        let button = disabled ? "" :  formButtons(data);

        let itemHTML = "";
        let assetHTML = "";
        withdrawalDetails.map((phase, index) => {
            itemHTML += displayItems( phase, index, disabled);
            assetHTML += displayAssets( phase, index, disabled);
        })

        let html = `

                <div class="row px-2">
			
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Document No.</small>
                        <h6 class="mt-0 text-danger font-weight-bold">
							${materialWithdrawalCode || "-" }
						</h6>      
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12 px-1">
                <div class="card">
                    <div class="body">
                        <small class="text-small text-muted font-weight-bold">Status</small>
                        <h6 class="mt-0 font-weight-bold">
							${getStatusStyle(materialWithdrawalStatus,true)}
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
                        ${materialWithdrawalRemarks || "----"}
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
						value="${materialRequestCode  || "-" }">
                </div>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="form-group">
                    <label>Project Code</label>
                    <input type="text" 
						class="form-control" 
						name="projectCode" 
						disabled 
						value="${projectCode  || "-" }">
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
        const timelineBuilderID = decryptString($(this).attr("id"));
        setTimeout(() => {
            viewDocument(timelineBuilderID);
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


    // ----- CLICK BUTTON SUBMIT -----
	$(document).on("click", "#btnSubmit", function () {
		const id = decryptString($(this).attr("materialWithdrawalID"));
		const inventoryValidationID = decryptString($(this).attr("inventoryValidationID"));
        const getItemLength = $(`[name="withdrawalItemID"]`).length;
        const getAssetLength = $(`[name="withdrawalAssetID"]`).length;

        if(getItemLength >0 || getAssetLength > 0 ){
            formButtonHTML(this,true);
            setTimeout(() => {
                // validateInputs().then(res => {
                //     if (res) {
                        saveProjectBoard("update", id, pageContent,inventoryValidationID);
                    // }
                    formButtonHTML(this, false);
                // });
            }, 500);
        }else{
            showNotification("danger", "You must have at least one or more row input data.");
        }


	});
	// ----- END CLICK BUTTON SUBMIT -----


    // ----- GET PROJECT BOARD DATA -----
    const getProjectBoardData = (materialWithdrawalID = 0, method = "save", inventoryValidationID = 0) => {
        let data = {
            inventoryValidationID,
            materialWithdrawalID,
            timelineManagementStatus: method == "save" ? 0 : (method == "submit" ? 2 : 1),
            items: [],
            assets: []
        };
        if($(`[name="withdrawalItemID"]`).length >0 || $(`[name="withdrawalAssetID"]`).length >0){
            if($(`[name="withdrawalItemID"]`).length >0){
                $(`[name="withdrawalItemID"]`).each(function(i) {
                    const index = $(this).attr("index");
        
                    const withdrawalItemID = $(this).attr("withdrawalItemID");
                    const itemID = $(this).attr("itemid");
                    const received = $(`[name="receivedItems"][itemID="${itemID}"][index="${index}"]`).val().replaceAll(",","");
                    const remainingItem = $(`[name="remainingItem"][itemID="${itemID}"][index="${index}"]`).text().trim().replaceAll(",","");
                    var receivedDateItem = $(`[name="receivedDateItem"][itemID="${itemID}"][index="${index}"]`).text() || "";
                    if(receivedDateItem != "-"){
                        receivedDateItem = moment($(`[name="receivedDateItem"][itemID="${itemID}"][index="${index}"]`).text()).format("YYYY-MM-DD");
                    }else{
                        receivedDateItem = "";
                    }
                    const itemRemarks = $(`[name="itemRemarks"][itemID="${itemID}"][index="${index}"]`).val().trim() || "";
                    if(received != 0){
                        const temp = {
                            materialWithdrawalID,withdrawalItemID,itemID,received, remainingItem, receivedDateItem, itemRemarks
                        };
                        data.items.push(temp);    
                    }
                    
                })
            }

            if($(`[name="withdrawalAssetID"]`).length >0){
                $(`[name="withdrawalAssetID"]`).each(function(i) {
                    const index = $(this).attr("index");
        
                    const withdrawalAssetID = $(this).attr("withdrawalAssetID");
                    const assetID = $(this).attr("assetid");
                    const received = $(`[name="receivedAssets"][assetID="${assetID}"][index="${index}"]`).val().replaceAll(",","");
                    const remainingAsset = $(`[name="remainingAsset"][assetID="${assetID}"][index="${index}"]`).text().trim().replaceAll(",","");
                    var receivedDateAsset = $(`[name="receivedDateAsset"][assetID="${assetID}"][index="${index}"]`).text() || "";
                    if(receivedDateAsset != "-"){
                        receivedDateAsset = moment($(`[name="receivedDateAsset"][assetID="${assetID}"][index="${index}"]`).text()).format("YYYY-MM-DD");
                    }else{
                        receivedDateItem = "";
                    }
                    const assetRemarks = $(`[name="assetRemarks"][assetID="${assetID}"][index="${index}"]`).val().trim() || "";
                    if(received != 0){
                        const temp = {
                            materialWithdrawalID,withdrawalAssetID,assetID,received, remainingAsset, receivedDateAsset, assetRemarks
                        };
                        data.assets.push(temp);
                    }
                })
            }

        }else{
            showNotification("danger", "You must have at least one or more row input data.");
        }
        

        
        // console.log(data)
        // return false;
        return data;
    }
    // ----- END GET PROJECT BOARD DATA -----


    // ----- DATABASE RELATION -----
    const getConfirmation = method => {
        const title = "Material Withdrawal";
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

    function saveProjectBoard(method = "update", id = 0, callback = null, inventoryValidationID = null) {
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

                    const data = getProjectBoardData(id, method, inventoryValidationID);
                    // console.log(data)
                    // return false;
                    $.ajax({
                        method:      "POST",
                        url:         `material_withdrawal/saveProjectBoard`,
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
                                swalTitle = `Material Withdrawal Form submitted successfully!`;
                            } else if (method == "save") {
                                swalTitle = `Material Withdrawal Form saved successfully!`;
                            } else if (method == "cancelform") {
                                swalTitle = `${getFormCode("MWF", dateCreated, insertedID)} cancelled successfully!`;
                            } else if (method == "approve") {
                                swalTitle = `${getFormCode("MWF", dateCreated, insertedID)} approved successfully!`;
                            } else if (method == "deny") {
                                swalTitle = `${getFormCode("MWF", dateCreated, insertedID)} denied successfully!`;
                            } else if (method == "drop") {
                                swalTitle = `${getFormCode("MWF", dateCreated, insertedID)} dropped successfully!`;
                            }else if (method == "update") {
                                swalTitle = `${getFormCode("MWF", dateCreated, insertedID)} updated successfully!`;
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