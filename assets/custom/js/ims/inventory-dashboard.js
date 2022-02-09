$(document).ready(function() {

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----

    const allowedUpdate = isUpdateAllowed(67);
    if(!allowedUpdate){
        $("#page_content").find("input, select, textarea").each(function(){
            $(this).attr("disabled",true);
        });
        $("#btnSubmit").hide();
    }

    //------ END MODULE FUNCTION IS ALLOWED UPDATE-----

// ----- MODULE APPROVER -----
const moduleApprover = getModuleApprover("Project Dashboard");
// ----- END MODULE APPROVER -----


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


// // ----- IS DOCUMENT REVISED -----
// function isDocumentRevised(id = null) {
//     if (id) {
//         const revisedDocumentsID = getTableData("fms_check_voucher_tbl", "revisevoucherID", "revisevoucherID IS NOT NULL");
//         return revisedDocumentsID.map(item => item.revisevoucherID).includes(id);
//     }
//     return false;
// }
// // ----- END IS DOCUMENT REVISED -----


// ----- VIEW DOCUMENT -----
function viewDocument(view_id = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
    const loadData = (id, isRevise = false, isFromCancelledDocument = false) => {
        const tableData = getTableData("hris_salary_release_tbl", "", "salaryReleaseID=" + id);

        if (tableData.length > 0) {
            let {
                employeeID,
                payrollHoldStatus
            } = tableData[0];

            let isReadOnly = true, isAllowed = true;

            if (employeeID != sessionID) {
                isReadOnly = true;
                if (payrollHoldStatus == 0 || payrollHoldStatus == 4) {
                    isAllowed = false;
                }
            } else if (employeeID == sessionID) {
                if (payrollHoldStatus == 0) {
                    isReadOnly = false;
                } else {
                    isReadOnly = true;
                }
            } else {
                isReadOnly = readOnly;
            }

            if (isAllowed) {
                if (isRevise && employeeID == sessionID) {
                    pageContent(true, tableData, isReadOnly, true, isFromCancelledDocument);
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
    }

    if (view_id) {
        let id = decryptString(view_id);
            id && isFinite(id) && loadData(id, isRevise, isFromCancelledDocument);
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
                    id && isFinite(id) && loadData(id, true);
            } else {
                pageContent(true);
            }
        }
    }
    
}

function updateURL(view_id = 0, isAdd = false, isRevise = false) {
    if (view_id && !isAdd) {
        window.history.pushState("", "", `${base_url}ims/inventory_dashboard?view_id=${view_id}`);
    } else if (isAdd) {
        if (view_id && isRevise) {
            window.history.pushState("", "", `${base_url}ims/inventory_dashboard?add=${view_id}`);
        } else {
            window.history.pushState("", "", `${base_url}ims/inventory_dashboard?add`);
        }
    } else {
        window.history.pushState("", "", `${base_url}ims/inventory_dashboard`);
    }
}
// ----- END VIEW DOCUMENT -----

// const bankList = getTableData(
//     "fms_bank_tbl", 
//     "bankName,bankID",
//     "bankStatus = 1");


// GLOBAL VARIABLE - REUSABLE 
const dateToday = () => {
    return moment(new Date).format("YYYY-MM-DD HH:mm:ss");
};

// ----- DATATABLES -----
function initDataTables() {
    // if ($.fn.DataTable.isDataTable("#tableForApprroval")) {
    //     $("#tableForApprroval").DataTable().destroy();
    // }

    if ($.fn.DataTable.isDataTable("#tableReservedItems")) {
        $("#tableReservedItems").DataTable().destroy();
    }

    if ($.fn.DataTable.isDataTable("#tableWarehouse")) {
        $("#tableWarehouse").DataTable().destroy();
    }

    // var table = $("#tableForApprroval")
    //     .css({ "min-width": "100%" })
    //     .removeAttr("width")
    //     .DataTable({
    //         proccessing: false,
    //         serverSide: false,
    //         scrollX: true,
    //         sorting: [],
    //         scrollCollapse: true,
    //         columnDefs: [
    //             { targets: 0,  width: 100 },
    //             { targets: 1,  width: 150 },
    //             { targets: 2,  width: 120 },
    //             { targets: 3,  width: 250 },
    //             { targets: 4,  width: 150 },
    //             { targets: 5,  width: 250 },
    //             { targets: 6,  width: 80  },
    //             { targets: 7,  width: 220 },
    //         ],
    //     });


    var table = $("#item-table")
        .css({ "min-width": "100%" })
        .removeAttr("width")
        .DataTable({
            proccessing: false,
            serverSide: false,
            scrollX: true,
            sorting: [],
            scrollCollapse: true,
            columnDefs: [
                { targets: 0,  width: 200 },
                { targets: 1,  width: 200 },
                { targets: 2,  width: 200 },
                { targets: 3,  width: 200 },
                { targets: 4,  width: 200 }
            ],
        });
    
    var table = $("#asset-table")
        .css({ "min-width": "100%" })
        .removeAttr("width")
        .DataTable({
            proccessing: false,
            serverSide: false,
            scrollX: true,
            sorting: [],
            scrollCollapse: true,
            columnDefs: [
                { targets: 0,  width: 200 },
                { targets: 1,  width: 200 },
                { targets: 2,  width: 200 },
                { targets: 3,  width: 200 },
                { targets: 4,  width: 200 }
            ],
        });

    var table = $("#tableReservedItems")
        .css({ "min-width": "100%" })
        .removeAttr("width")
        .DataTable({
            proccessing: false,
            serverSide: false,
            scrollX: true,
            sorting: [],
            scrollCollapse: true,
            columnDefs: [
                { targets: 0,  width: 200 },
                { targets: 1,  width: 200 },
                { targets: 2,  width: 200 },
                { targets: 3,  width: 200 },
                { targets: 4,  width: 200 }
            ],
        });

    var table = $("#tableWarehouse")
    .css({ "min-width": "100%" })
    .removeAttr("width")
    .DataTable({
        proccessing: false,
        serverSide: false,
        scrollX: true,
        sorting: [],
        scrollCollapse: true,
        columnDefs: [
            { targets: 0,  width: 200 },
            { targets: 1,  width: 200 },
            { targets: 2,  width: 200 },
            { targets: 3,  width: 80 },
            { targets: 4,  width: 80 },
            { targets: 5,  width: 300 },
        ],
    });

    // var table = $("#tableInventoryReceivingItems")
    //     .css({ "min-width": "100%" })
    //     .removeAttr("width")
    //     .DataTable({
    //         proccessing: false,
    //         serverSide: false,
    //         scrollX: true,
    //         sorting: false,
    //         searching: false,
    //         paging: false,
    //         ordering: false,
    //         info: false,
    //         scrollCollapse: true,
    //         columnDefs: [
    //             { targets: 0,  width: 100 },
    //             { targets: 1,  width: 150 },
    //             { targets: 2,  width: 120 },
    //             { targets: 3,  width: 120 },
    //             { targets: 4,  width: 120  }
                
    //         ],
    //     });

    //     var table = $("#tableInventoryReceivingItems0")
    //     .css({ "min-width": "100%" })
    //     .removeAttr("width")
    //     .DataTable({
    //         proccessing: false,
    //         serverSide: false,
    //         paging: false,
    //         info: false,
    //         scrollX: true,
    //         scrollCollapse: true,
    //         columnDefs: [
    //             { targets: 0,  width: 100 },
    //             { targets: 1,  width: 150 },
    //             { targets: 2,  width: 120 },
    //             { targets: 3,  width: 120 },
    //             { targets: 4,  width: 120  }
              
    
    //         ],
    //     });

}
// ----- END DATATABLES -----


// ----- HEADER CONTENT -----
function headerTabContent(display = true) {
    if (display) {
        // if (isImModuleApprover("hris_salary_release_tbl", "approversID")) {
        //     let count = getCountForApproval("hris_salary_release_tbl", "payrollHoldStatus");
        //     let displayCount = count ? `<span class="ml-1 badge badge-danger rounded-circle">${count}</span>` : "";
            // <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">For Approval ${displayCount}</a></li>
            // let html = `
            // <div class="bh_divider appendHeader"></div>
            // <div class="row clearfix appendHeader">
            //     <div class="col-12">
            //         <ul class="nav nav-tabs">
            //             <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#forApprovalTab" redirect="forApprovalTab">Employee Management</a></li>
            //             <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#myFormsTab" redirect="myFormsTab">Recruitment Dashboard</a></li>
            //         </ul>
            //     </div>
            // </div>`;
            // $("#headerContainer").append(html);
        // }
    } else {
        $("#headerContainer").find(".appendHeader").remove();
    }
}
// ----- END HEADER CONTENT -----

// ----- TABLE CONTENT -----
function tableContent(data = false) {  
    // $("#tbodyProject").html('<tr><td colspan=4>'+preloader+'</td></tr>');
    $("#tableWarehouse").html(preloader);

    let tbodyHTML = "";
    let html = "";
    if (data && data.length > 0) {
        data.map(stock => {
            const {
                assetID,
                barcode,
                assetCode,
                assetName,
                brand,
                classificationName,
                categoryName,
                uom,
                stockIN,
                borrowedQuantity,
                returned,
                reOrderLevel,
                reservedItem,
                disposed,
                transferquantity,
                Available,
                Total_Quantity,
                totalequipmentBorrowing,
                materiaWithdrawalQuantity,

            } = stock;
            // var itemTotalQuantity    =  parseFloat(data["item"][i].stockIN) - (parseFloat(data["item"][i].materiaWithdrawalQuantity + data["item"][i].totalStockOut));
             var assetTotalQty = parseFloat(stockIN) - (parseFloat(totalequipmentBorrowing) + parseFloat(materiaWithdrawalQuantity) + parseFloat(disposed) );
            if(assetTotalQty > 0){
                tbodyHTML += `
                <tr assetID="${assetID}">
                    <td>${assetCode || "-"}</td>
                    <td>${assetName || "-"}</td>
                    <td>${classificationName || "-"}</td>
                    <td>${uom || "-"}</td>
                    <td>${formatAmount(assetTotalQty || 0)}</td>
                    <td>${barcode || "-"}</td>
                    
                </tr>`;
            }

           
    
        });
    }

    html +=`
    <table class="table table-bordered table-striped" id="tableWarehouse">
    <thead>
        <tr style="white-space: nowrap">
            <th>Asset Code</th>
            <th>Asset Name</th>
            <th>Asset Classification</th>
            <th>UOM</th>
            <th>Quantity</th>
            <th>Barcode</th>
        </tr>
    </thead>
    <tbody id="tbodyProject">
        ${tbodyHTML}
    </tbody>
</table>
    `;

   

    setTimeout(() => {
        // $("#tbodyProject").html(tbodyHTML);
        $("#tableWarehouse").html(html);
        initDataTables();   
    }, 500);

}
// ----- END TABLE CONTENT -----

 // ----- GET RESERVATION DATA -----
 function getReservationData(inventoryStorageID = 0) {

    const result = getTableData(`(
        SELECT i.barcode, i.assetID, i.assetCode , brand, i.assetName, classificationName, categoryName, uom,stockIN,
        ROUND(equipmentBorrowing,2) AS equipmentBorrowing,Transferred,

        -- ROUND(IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),
        --     (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),0) -  returnQuantity,2) AS returnQuantity, 
        

        ROUND(IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),
            IFNULL(
            IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID) >  returnQuantity,
            (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID) -  returnQuantity,
            returnQuantity - (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID)),0),returnQuantity - 0) ,2) AS returnQuantity, 
            
        ROUND(disposed,2) as disposed,
        reservedAsset, 
        
        CASE WHEN equipmentBorrowing <>0 THEN (IF((reservedAsset - equipmentBorrowing)<0,0,reservedAsset - equipmentBorrowing))
        ELSE reservedAsset END reserved,
        
        ROUND(materiaWithdrawalQuantity  - returnQuantity,2)  AS materiaWithdrawalQuantity,
        

        IFNULL(iii.reOrderLevel,0) AS reOrderLevel,
        
        (IFNULL(equipmentBorrowing,2) - IFNULL(materiaWithdrawalQuantity,2)) totalequipmentBorrowing,

        (stockIN - IFNULL(reOrderLevel,0) - materiaWithdrawalQuantity - returnQuantity - disposed - IF(equipmentBorrowing = 0,reservedAsset, IF(equipmentBorrowing = reservedAsset,equipmentBorrowing,reservedAsset - equipmentBorrowing))) AS available

        FROM
        (
        SELECT barcode, assetID, assetCode, brand, assetName, classificationName,categoryName,uom,
        IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(equipmentBorrowing),0) AS equipmentBorrowing,
        sum(Transferred) AS Transferred,
         SUM(returnQuantity) AS returnQuantity,
        IFNULL(SUM(disposed),0) AS disposed,IFNULL(SUM(reservedAsset),0) AS reservedAsset, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
        FROM
        (
            SELECT 
            sii.barcode,sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
            sii.classificationName, sii.categoryName,	sii.uom,  
            SUM(sii.quantityForStockin) AS stockIN, -- Stock In Quantity
            0 AS equipmentBorrowing,
            0 AS returnQuantity,
            0 AS Transferred,
            '0.00'  AS disposed,
            0 AS reservedAsset,
            0 AS materiaWithdrawalQuantity
            FROM  ims_stock_in_assets_tbl AS sii
            WHERE (sii.inventoryReceivingID <>0 OR sii.materialUsageID <>0)   AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL AND sii.inventoryStorageID = ${inventoryStorageID}
            GROUP BY sii.assetID
            -- Get Stock In Quantity in  Stock In Assets Table
            UNION ALL

            SELECT 
            sii.barcode, sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
            sii.classificationName, sii.categoryName,	sii.uom,  
            0 AS stockIN,
            sum(quantity) AS equipmentBorrowing, -- Equipment Borrowing Request Quantity
            0 AS returnQuantity,
            0 AS Transferred,
            '0.00'  AS disposed,
            0 AS reservedAsset,
            0 AS materiaWithdrawalQuantity
            FROM  ims_stock_in_assets_tbl AS sii
            WHERE sii.equipmentBorrowingID <>0  AND  sii.stockOutDate IS NOT NULL AND sii.inventoryStorageID = ${inventoryStorageID}
            GROUP BY sii.assetID
            -- Get Equipment Borrowing Request Quantity in Stock In Assets Table
            UNION ALL


            SELECT 
            "" AS barcode,sii.itemID as assetID, 			sii.itemCode as assetCode, 		sii.Brand as brand,		sii.itemName as assetName,
            sii.classificationName, sii.categoryName,	sii.uom,  
            0 AS stockIN,
            0 AS equipmentBorrowing,
            SUM(borrowedQuantity) AS returnQuantity, -- Return Quantity 
            0 AS Transferred,
            '0.00'  AS disposed,
            0 AS reservedAsset,
            0 AS materiaWithdrawalQuantity
            FROM  ims_inventory_request_details_tbl AS sii
            LEFT JOIN ims_return_item_tbl AS returnHeader 
            ON  returnHeader.returnItemID = sii.returnItemID
            WHERE sii.returnItemID <>0   AND
            returnHeader.returnItemStatus = 2
            GROUP BY sii.returnItemID
            -- Get Return Quantity in Stock In Assets Table
            UNION ALL

            SELECT 
            "" AS barcode,idd.assetID, 			idd.assetCode, 		idd.brand,		idd.assetName,
            idd.assetClassification as classificationName, idd.assetCategory as categoryName,	idd.unitOfMeasurement AS uom,  
            0 AS stockIN,
            0 AS equipmentBorrowing,
            0 returnQuantity,
            0 AS Transferred,
            SUM(quantity)  AS disposed, -- Disposed Quantity
            0 AS reservedAsset,
            0 AS materiaWithdrawalQuantity
            FROM  ims_inventory_disposal_details_tbl AS idd
            LEFT JOIN ims_inventory_disposal_tbl AS  id ON idd.disposalID = id.disposalID
            WHERE  id.disposalStatus =2  
            GROUP BY idd.assetID
            -- Get Disposed Quantity in  Inventory Disposal Details Table
            UNION ALL

            SELECT "" AS barcode, sii.assetID, 		assetCode AS assetCode, 	assetBrandName AS  brand,	assetBrandName AS assetName,
            assetClassification AS classificationName, 	assetCategory as categoryName,	assetCategory AS  uom,  
            0 AS stockIN,
            0 AS equipmentBorrowing,
            0 AS returnQuantity,
            0 AS Transferred,
            '0.00'  AS disposed,
            SUM(sii.requestQuantity) AS reservedAsset, -- Reserved Asset
            0 AS materiaWithdrawalQuantity
            FROM  ims_request_assets_tbl AS sii
            LEFT JOIN ims_inventory_validation_tbl AS iiv ON sii.inventoryValidationID = iiv.inventoryValidationID
            WHERE  sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedAsset IS NOT NULL
            GROUP BY sii.assetID
            -- Get Reserved Asset in Request Asset Table 
            UNION ALL

            SELECT 
            "" AS barcode, mww.assetID, 0 AS assetCode, 0 AS brand, 0 AS assetName,
            0 AS classificationName, 0 AS categoryName,
            0 AS uom,  0 AS stockIN,
            0 AS equipmentBorrowing,
            0 AS returnQuantity,
            0 AS Transferred,
            '0.00'  AS disposed,
            0 AS reservedAsset,
            SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            FROM  ims_material_withdrawal_tbl AS mw
            LEFT JOIN ims_material_withdrawal_asset_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID 
            WHERE  mw.inventoryAssetStatus = 9 AND mww.assetID IS NOT NULL
            GROUP BY mww.assetID
            -- Get Withdrawn Quantity in Material Withdrawal Table 
        ) w
        WHERE w.assetCode IS NOT NULL
        GROUP BY assetID
        )i
        LEFT JOIN ims_inventory_asset_tbl AS iii ON i.assetID = iii.assetID
       
        GROUP BY i.assetID
        )l GROUP BY assetID`,

        `barcode,assetID, assetCode, brand, assetName, classificationName, categoryName, uom, totalequipmentBorrowing,
        stockIN,equipmentBorrowing, ROUND(Transferred,2) AS Transferred, returnQuantity, ROUND(disposed,2) AS disposed, reservedAsset,reserved,materiaWithdrawalQuantity,IF(ROUND(available,2) <0,0,ROUND(available,2))  AS available,
        ROUND(reOrderLevel,2) AS reOrderLevel, ROUND((available+ IFNULL(reOrderLevel,0) + reservedAsset),2) AS totalQuantity`
        );


    return result;
}
// ----- END GET RESERVATION DATA -----


// // ----- HEADER BUTTON -----
// function headerButton(isAdd = true, text = "Add", isRevise = false, isFromCancelledDocument = false) {
//     let html;
//     if (isAdd) {
//         if(isCreateAllowed(67)){

//             html =``;
//             // html = `
//             // <button type="button" class="btn btn-default btn-add" id="btnAdd"><i class="icon-plus"></i> &nbsp;${text}</button>`;
//         }
//     } else {
//         html = `
//         <button type="button" class="btn btn-default btn-light" id="btnBack" revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-arrow-left"></i> &nbsp;Back</button>`;
//     }
//     $("#headerButton").html(html);
// }
// // ----- END HEADER BUTTON -----


// ----- FOR APPROVAL CONTENT -----
function forApprovalContent() {
    $("#tableForApprovalParent").html(preloader);

    const countActiveEmployee = getTableData(`hris_employee_list_tbl`,
    `COUNT(employeeID) AS employeeActive`,
    `employeeStatus = 1 OR employeeStatus = 2`);

    const countPendingLeave = getTableData(`hris_leave_request_tbl`,
    `COUNT(leaveRequestStatus) AS pendingleaves`,
    `leaveRequestStatus = 2 AND (day(leaveRequestDateFrom)=day(now()) OR day(leaveRequestDateTo)=day(now()))`);

    const countPendingOvertmine = getTableData(`hris_overtime_request_tbl`,
    `COUNT(overtimeRequestStatus) AS pendingovertime`,
    `overtimeRequestStatus = 2 AND day(overtimeRequestDate)=day(now())`);

    const getEvents = getTableData(`hris_event_calendar_tbl`,
    `eventCalendarName,
    CASE 
    WHEN year(eventCalendarDateFrom)=year(now()) THEN eventCalendarDateFrom
    WHEN year(eventCalendarDateTo)=year(now()) THEN eventCalendarDateTo
    END AS eventDate`,
    `year(eventCalendarDateFrom)=year(now()) OR year(eventCalendarDateTo)=year(now())`);


    const task = getTableData(`pms_employeetaskoard_tbl as pet
    LEFT JOIN pms_timeline_task_list_tbl as ptt ON ptt.taskID = pet.taskID AND ptt.timelineBuilderID = pet.timelineBuilderID
    LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ptt.taskID
    LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = pet.projectMilestoneID 
    LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = pet.milestoneBuilderID OR pmb.milestoneBuilderID = ptt.milestoneBuilderID `, 
    `DISTINCT taskboardID,ptt.taskID,assignedEmployee,ptt.taskName,pet.taskStatus,pml.projectMilestoneName,CASE 
    WHEN pet.taskStartDates = "" THEN ptt.taskEndDate
    WHEN pet.taskStartDates !="" THEN pet.taskStartDates
    END taskStartDate,
    phaseCode `, 
    "assignedEmployee = "+sessionID);

    const subTask = getTableData(`pms_employeetaskoard_details_tbl as ped
    LEFT JOIN pms_timeline_management_tbl as ptm  ON ptm.taskID = ped.taskID
    LEFT JOIN pms_milestone_list_tbl as pml ON pml.projectMilestoneID = ped.projectMilestoneID
    LEFT JOIN pms_milestone_builder_tbl as pmb ON pmb.milestoneBuilderID = ped.milestoneBuilderID`, 
    `DISTINCT subtaskboardID,ped.taskID,subTaskAssignee,ped.subTaskName,ped.subTaskStatus,pml.projectMilestoneName,ped.subTaskStartDates,phaseCode`, 
    ` FIND_IN_SET(${sessionID},replace(ped.subTaskAssignee,'|',','))`);




let html = `        <div class="row clearfix row-deck">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-users"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">Head Count</div>
                                        <h4 class="number mb-0">${countActiveEmployee[0].employeeActive || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-user-clock"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">Leave</div>
                                        <h4 class="number mb-0">${countPendingLeave[0].pendingleaves || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-stopwatch"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">Overtime</div>
                                        <h4 class="number mb-0">${countPendingOvertmine[0].pendingovertime || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div class="row clearfix row-deck">
                        <div class="col-xl-6 col-lg-12">
                            <div class="card">
                                <div class="header bg-primary">
                                    <h2 class="font-weight-bold text-white">NO OF EMPLOYEE (DEPARTMENT)</h2>
                                </div>
                                <div class="body">
                                    <div id="apex-basic-employee"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-6">
                            <div class="card">
                                <div class="header bg-primary">
                                    <h2 class="font-weight-bold text-white">NO OF EMPLOYEE (GENDER)</h2>
                                </div>
                                <div class="body">
                                    <div id="apex-employee-gender"></div>
                                </div>      
                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-6">
                            <div class="card">
                                <div class="header bg-primary">
                                    <h2 class="font-weight-bold text-white">EVENTS</h2>
                                </div>

                                <div class="card-body" style="color:black;height: 400px; overflow-y: auto;"> `;

                                if(getEvents.length > 0){
                                    getEvents.map((event)=>{

                                        let{
                                            eventCalendarName,
                                            eventDate
                                        } = event;
                                        html+=`<div class="row mt-1">
                                                    <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                        <div class="square rounded bg-secondary" style="
                                                                                padding: 10px;
                                                                                width: min-content;
                                                                            "><small class="text-white font-weight-bolder m-0">${(moment(eventDate).format('MMM')).toUpperCase()}<h1
                                                                    class="text-white font-weight-bolder">${moment(eventDate).format('DD')}</h1></small></div>
                                                    </div>
                                                    <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                        <h6 class="font-weight-bolder ">${eventCalendarName}</h6>
                                                    </div>
                                                </div>`;
                                    })
                                }else{
                                    html +=`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                                    <img src="${base_url}assets/modal/no-data.gif" style="max-width: 300px;
                                        width: auto;
                                        min-width: 100px;
                                        height: auto;" alt="No event yet.">
                                    <span class="font-weight-bold">No event yet.</span>
                                </div>`
                                }
                                
                                    

                        html +=`</div>
                            </div>
                        </div>

                    </div>
                    
                    <div class="row clearfix row-deck">
                        <div class="col-xl-6 col-lg-12">
                            <div class="card">
                                <div class="header bg-primary">
                                    <h2 class="font-weight-bold text-white">NO OF RESIGN EMPLOYEE</h2>
                                </div>
                                <div class="body">
                                    <div id="apex-basic-employeeResign"></div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-12">
                            <div class="card">
                                <div class="header bg-primary">
                                    <h2 class="font-weight-bold text-white">NO OF EMPLOYEE (HIRED VS LEFT)</h2>
                                </div>
                                <div class="body">
                                    <div id="apex-employee-HiredAndLeft"></div>
                                </div>
                            </div>    
                        </div>
                    </div>`;


    setTimeout(() => {
        $("#tableForApprovalParent").html(html);
        noOfEmployeeHiredLeftChart();
        // noOfEmployeeGenderChart();
        // noOfEmployeeChart();
        noOfEmployeeResignChart();

        return html;
    }, 300);

}
// ----- END FOR APPROVAL CONTENT -----




// ---- FUNCIRON FOR RESIGN EMPLOYEE CHART ------//
function noOfEmployeeResignChart(){

    const getListEmployeeData = getTableData(`hris_employee_list_tbl as employee`,
    ` COUNT(employeeID) AS employee, 
    (SELECT departmentName FROM hris_department_tbl WHERE departmentID = employee.departmentID)  AS departmentName`,
    ` employeeStatus = 0`,
    ``,
    `departmentID`);

    var listEmployee =[];
    var listDepartment =[];
    var listColorDepartment =[];

    var seriesData = [];
    
    getListEmployeeData.map((employeeList,index)=>{
        let obj ={};
        var randomColor = Math.floor(Math.random()*16777215).toString(16);

        let{
            employee,
            departmentName
        }= employeeList;
        
        listColorDepartment[index] = ("#"+randomColor);
        listDepartment[index] =departmentName; 

        obj["name"] = departmentName;
        obj["data"] = [employee];

        seriesData.push(obj);
    

    })


    var options = {
        chart: {
            height: 300,
            type: 'bar',
        },
        colors: listColorDepartment,
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
                endingShape: 'flat'	
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series:seriesData,
        xaxis: {
            categories: listDepartment,
        },
        yaxis: {
            title: {
                text: 'Department Record/s'
            }
        },
        fill: {
            opacity: 1

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return  val + " employee/s"
                }
            }
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#apex-basic-employeeResign"),
        options
    );

    setTimeout(() => {
    chart.render();
     
    }, 300);
    
}



// --- NO OF EMPLOYEE HIRED AND LEFT ----//
function noOfEmployeeHiredLeftChart (){

    const getCountEmployeeHired = getTableData(`hris_employee_list_tbl`,
    `COUNT(employeeID) AS employeeHired`,
    `employeeStatus = 1 OR employeeStatus = 2`);

    const getCountEmployeeLeft = getTableData(`hris_employee_list_tbl`,
    `COUNT(employeeID) AS employeeLeft`,
    `employeeStatus = 0 OR employeeStatus = 3 OR employeeStatus = 4  OR employeeStatus = 6`);





    if(getCountEmployeeHired.length > 0 || getCountEmployeeLeft.length > 0){
 
        var options = {
            chart: {
                height: 300,
                type: 'donut',
            },
            labels: ["Hired","Left"],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                show: true,
            },
            colors: ["#28a745","#dc3450"],
            series: [parseFloat(getCountEmployeeHired[0].employeeHired),parseFloat(getCountEmployeeLeft[0].employeeLeft)],
    
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    
       var chart = new ApexCharts(
            document.querySelector("#apex-employee-HiredAndLeft"),
            options
        );
        
        chart.render();
    }else{
        let html =`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/no-data.gif" style="max-width: 300px;
                    width: auto;
                    min-width: 100px;
                    height: auto;" alt="No event yet.">
                <span class="font-weight-bold">No employee available.</span>
            </div>`

            $("#apex-employee-HiredAndLeft").html(html);
    }

    
}

    // ----- SELECT PROJECT NAME -----
    $(document).on("change", `[name="inventoryStorageID"]`, function() {
        refreshTableContent();
    })
    // ----- END SELECT PROJECT NAME -----

    // ----- GET PROJECT LIST -----
    function getStorageList() {

        const storageList = getTableData(`ims_inventory_storage_tbl`,
        `inventoryStorageID,
        inventoryStorageOfficeName`,
        `inventoryStorageStatus =1`);

        
        // const projectList = getTableData(
        //     `pms_project_list_tbl`, 
        //     `projectListID AS projectID, projectListName AS projectName`, 
        //     `projectListStatus = 1`);
        
        let html = "";
        storageList.map(storage => {
            const {inventoryStorageID, inventoryStorageOfficeName } = storage;
            html += `<option value="${inventoryStorageID}">${inventoryStorageOfficeName}</option>`
        });
        return html;
    }
    // ----- END GET PROJECT LIST -----

    // ----- FILTERING OPTIONS -----
    function filteringOptions() {
        let html = `
        <div class="row">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <select class="form-control select2"
                        name="inventoryStorageID"
                        style="width: 100%">
                        <option disabled selected>Select Warehouse Name</option>
                        ${getStorageList()}
                    </select>
                </div>
            </div>
        
        </div>`;
        return html;
    }

    $(document).on("change","[name=inventory-type]", function(){
        let thisValue   =   $(this).val();
        // console.log(thisValue);/
        filteringInventoryType(thisValue);
    });

    function filteringInventoryType(type){
        let html = "";
        $(".nearly-expire-table").html(preloader);
        let inventoryTable  = type=="items" ? 'ims_inventory_item_tbl' : 'ims_invetory_asset_tbl';
        let inventoryStock  = type=="items" ? 'ims_stock_in_item_tbl' : 'ims_stock_in_assets_tbl';
        let inventoryColumn = type=="items" ? 'itemID' : 'assetID'; 
        let inventorySelect = type=="items" ? 'itemCode AS code, itemName AS name, brandName AS brand, unitOfMeasurementID AS uom, classificationName, categoryName,'  
                                            : 'assetCode AS code, assetName AS name, brandName AS brand, unitOfMeasurementID AS uom, classificationName, categoryName,';
        let inventoryWhere   = type=="items" ? "itemStatus = '1'" : "assetStatus = '1'";
        let inventoryQuery  = getTableData(`${inventoryTable} AS mainTable 
                                                LEFT JOIN ims_inventory_classification_tbl AS iict USING(classificationID) 
                                                LEFT JOIN ims_inventory_category_tbl AS iicat ON mainTable.categoryID = iicat.categoryID
                                            `,
                                            ` ${inventorySelect}
                                             (SELECT SUM(quantity) FROM ${inventoryStock} AS subTable WHERE subTable.stockOutDate != '0000-00-00' AND subTable.${inventoryColumn} = mainTable.${inventoryColumn} AND subTable.ExpirationDate >= DATE_ADD(${moment().format("YYYY-MM-DD")}, INTERVAL 14 DAY) ) AS used,
                                             (SELECT SUM(quantity) FROM ${inventoryStock} AS subTable WHERE subTable.stockOutDate = '0000-00-00' AND subTable.${inventoryColumn} = mainTable.${inventoryColumn} AND subTable.ExpirationDate >= DATE_ADD(${moment().format("YYYY-MM-DD")}, INTERVAL 14 DAY) ) AS unused
                                            `,
                                            inventoryWhere
                                          );
        tableData = ``;
        inventoryQuery.map((value,index)=>{
            let quantity    = parseFloat(value.unused) - parseFloat(value.used);
            if(quantity > 0){
                tableData += `
                            <tr style="white-space: nowrap">
                                <td>${value.code}</td>
                                <td>${value.name}</td>
                                <td>${value.classifcationName}</td>
                                <td>${value.uom}</td>
                                <td>${formatAmount(quantity)}</td>
                            </tr>
                        `;
            }
            
        });
        
            html += `
                    <table class="table table-bordered table-striped" id="${type=="items" ? 'item' : 'asset'}-table">
                        <thead>
                            <tr style="white-space: nowrap">
                                <th>${type=="items" ? 'Item' : 'Asset'} Code</th>
                                <th>${type=="items" ? 'Item' : 'Asset'} Name</th>
                                <th>${type=="items" ? 'Item' : 'Asset'} Classification</th>
                                <th>UOM</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                            <tbody id="">
                                ${tableData}
                            </tbody>
                    </table>
                `;

        setTimeout(() => {
            $(".nearly-expire-table").html(html);
            initDataTables();
        }, 200);
        
    }
    // ----- END FILTERING OPTIONS -----

// // ---- EVENT FOR CHANGE DEPARTMENT-----//
$(document).on("change",".btnDepartment",function(){
    let getDepartmentID = $(this).val(); 


    // $("#apex-department-list").html(preloader); 

    
    noOfEmployeeChart(getDepartmentID);
})

// // ---- EVENT FOR CHANGE DEPARTMENT-----//
$(document).on("change",".btnProject",function(){
    let getTimelineBuilderID = $(this).val(); 


    // $("#apex-employee-workLoad").html(preloader); 

    
    noOfEmployeeWorkloadChart(getTimelineBuilderID);
})


// ---- FUNCIRON FOR EMPLOYEE PER DEPARTMENT CHART ------//
function noOfEmployeeChart(getDepartmentID = 0){

    const countEmployeePerDesignation = getTableData(`hris_employee_list_tbl as employee`,
    ` COUNT(employeeID) as listEmployee, 
    (SELECT designationName FROM hris_designation_tbl WHERE designationID = employee.designationID) AS designationName`,
    `employee.departmentID = ${getDepartmentID}`,
    ``,
    `designationID`);

    var listEmployee =[];
    var listDepartment =[];
    var listColorDepartment =[];

    var seriesData = [];

    if(countEmployeePerDesignation.length > 0){
        
        countEmployeePerDesignation.map((employeeList,index)=>{
            let obj ={};
            var randomColor = Math.floor(Math.random()*16777215).toString(16);

            let{
                listEmployee,
                designationName
            }= employeeList;
            
            listColorDepartment[index] = ("#"+randomColor);
            listDepartment[index] =designationName; 

            obj["name"] = designationName;
            obj["data"] = [listEmployee];

            seriesData.push(obj);
        

        })


        var options = {
            chart: {
                height: 300,
                type: 'bar',
            },
            colors: listColorDepartment,
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20%',
                    endingShape: 'flat'	
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            series:seriesData,
            xaxis: {
                categories: listDepartment,
            },
            yaxis: {
                title: {
                    text: 'Designation Record/s'
                }
            },
            fill: {
                opacity: 1

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return  val + " employee/s"
                    }
                }
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#apex-department-list"),
            options
        );

        setTimeout(() => {
        chart.render();
        
        }, 300);
        chart.destroy();

    }else{
        let html =`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/no-data.gif" style="max-width: 300px;
                    width: auto;
                    min-width: 100px;
                    height: auto;" alt="No event yet.">
                <span class="font-weight-bold">No employee available.</span>
            </div>`

            $("#apex-department-list").html(html);
    }
    
}

// --- NO OF EMPLOYEE WORK LOAD ----//
function noOfEmployeeWorkloadChart(timelineBuilderID = 0){

    const getAssignedEmployee = getTableData(`pms_timeline_builder_tbl`,
    `timelineTeamMember`,
    `timelineBuilderID = ${timelineBuilderID}`);


    const getEmployeeTimelineManagement = getTableData(`pms_timeline_management_tbl`,
    ``,
    `timelineBuilderID = ${timelineBuilderID}`);

    if(getAssignedEmployee.length > 0 || getEmployeeTimelineManagement.length > 0){

            let assignedEmployeeData = getAssignedEmployee[0]?.timelineTeamMember;
            let assignedSplit = assignedEmployeeData?.split("|") || [];
            let getAssignedEmployeeName = [];

            var listColorAssignedEmployee =[];

            var employeeTotalManHours = 0;   
            var employeeTotalManHoursArray =[];   

            for(var loop =0; loop< assignedSplit.length;loop++){
                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                let totalManhours = 0;

                getEmployeeTimelineManagement.map((empTime, index) => {
                    const {assignedManHours,assignedEmployee,assignedStartDate } = empTime;
            
                    if(assignedEmployee.includes(assignedSplit[loop])){
            
                        const getAssignEmployee = assignedEmployee.split("|");
                        const employeeIndex  = getAssignEmployee.indexOf(assignedSplit[loop]);
            
                        const datesArr         = assignedStartDate?.split("|") || [];
                        const manHoursArr      = assignedManHours?.split("|") || [];
            
                        const manHoursArr2      = manHoursArr[employeeIndex] ?? "";
                        const datesArr2         = datesArr[employeeIndex] ?? "";
            
                        const datesArr3         = datesArr2?.split("~") ?? [];
                        const manHoursArr3      = manHoursArr2?.split("~") ?? [];
            
                    
                        
                        
                        datesArr3.map((arr, index) => {
            
                            const manHours      = manHoursArr3[index] ?? "";
            
                            employeeTotalManHours += ((+manHours) || 0);
                            // console.log(assignedSplit[loop]+" |"+employeeTotalManHours);
            
                            totalManhours += parseFloat(employeeTotalManHoursArray[loop] || 0) + employeeTotalManHours;
                        

                        })
                    
                        employeeTotalManHours = 0;
                    }
                })
                employeeTotalManHoursArray.push(totalManhours);
                listColorAssignedEmployee[loop] = ("#"+randomColor);
                getAssignedEmployeeName[loop] = employeeFullname(assignedSplit[loop]);
            }
            
            // console.log(employeeTotalManHoursArray)
            // console.log(assignedSplit)
            // console.log(getAssignedEmployeeName)

    
 
        var options = {
            chart: {
                height: 300,
                type: 'pie',
            },
            labels: getAssignedEmployeeName,
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                show: true,
            },
            colors: listColorAssignedEmployee,
            // series: [getMaleCount[0].maleCount,getFemaleCount[0].femaleCount],
            series: employeeTotalManHoursArray,
    
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    
       var chart = new ApexCharts(
            document.querySelector("#apex-employee-workLoad"),
            options
        );
        
        setTimeout(() => {
            chart.render();
            
            }, 300);
            chart.destroy();
    }else{
        let html =`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                <img src="${base_url}assets/modal/no-data.gif" style="max-width: 300px;
                    width: auto;
                    min-width: 100px;
                    height: auto;" alt="No event yet.">
                <span class="font-weight-bold">No employee available.</span>
            </div>`

            $("#apex-employee-workLoad").html(html);
    }

    
}

// ----- MY FORMS CONTENT -----
function myFormsContent() {
    $("#tableMyFormsParent").html(preloader);

    const countActiveVendor = getTableData(`ims_inventory_vendor_tbl`,
    ` COUNT(inventoryVendorID) AS activeVendor`,
    `inventoryVendorStatus =1`);

    const countActiveItems = getTableData(`ims_inventory_item_tbl`,
    ` COUNT(itemID) AS activeItem`,
    `itemStatus =1`);

    const countActiveAssets = getTableData(`ims_inventory_asset_tbl`,
    ` COUNT(assetID) AS activeAsset`,
    `assetStatus =1`);

    const countStockOutItems= getTableData(`ims_material_withdrawal_item_tbl`,
    ` IFNULL(SUM(stockOut),0) AS countStockOut`);

    const countDisposedAssets= getTableData(`ims_inventory_disposal_details_tbl AS details
    LEFT JOIN ims_inventory_disposal_tbl AS header
    ON header.disposalID = details.disposalID`,
    `IFNULL(SUM(details.quantity),0) as countDisposed`,
    `disposalStatus = 2`);

    const getStockInData = getUnionTableData(`
                        SELECT module,ID,referenceCode,purchaseID, fullname, SUM(quantity) AS  quantity, daterequest, inventoryStatus,IFNULL(SUM(RECORD),0) AS stockQuantity
                        FROM (
                        SELECT 
                        '1' AS module, 
                        iri.returnItemID as ID,
                        '' AS purchaseID, 
                        returnItemCode as referenceCode, 
                        CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
                        ird.receivedQuantity AS quantity,
                        DATE_FORMAT(iri.createdAt,'%M% %d%, %Y') AS daterequest,
                        returnItemStatus AS inventoryStatus,
                        CASE WHEN sii.quantityForStockin IS NOT NULL  THEN IFNULL(SUM(sii.quantityForStockin),0)
                        ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD
                        FROM ims_return_item_tbl AS iri
                        LEFT JOIN ims_inventory_request_details_tbl AS ird ON iri.returnItemID = ird.returnItemID
                        LEFT JOIN hris_employee_list_tbl AS empl ON iri.employeeID = empl.employeeID
                        LEFT JOIN ims_stock_in_item_tbl AS sii ON iri.returnItemID = sii.returnItemID AND ird.itemid = sii.itemID
                        LEFT JOIN ims_stock_in_assets_tbl AS sia ON iri.returnItemID = sia.returnItemID AND ird.itemID = sia.assetID
                        WHERE returnItemStatus = 2  GROUP BY iri.returnItemID,sii.returnItemID,sia.returnItemID,ird.itemID,sii.itemID,sia.assetID
                        UNION ALL
                        SELECT '2' AS module,
                        muf.materialUsageID AS ID,
                        '' AS purchaseID,
                        materialUsageCode as referenceCode,
                        CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
                        unused AS quantity,
                        DATE_FORMAT(muf.createdAt,'%M% %d%, %Y') AS daterequest,
                        materialUsageStatus as inventoryStatus,
                        CASE WHEN sii.quantityForStockin IS NOT NULL THEN IFNULL(SUM(sii.quantityForStockin),0)
                        ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD  
                        FROM ims_material_usage_tbl AS muf
                        LEFT JOIN ims_inventory_request_details_tbl AS ird ON ird.materialUsageID = muf.materialUsageID
                        LEFT JOIN hris_employee_list_tbl AS empl ON muf.employeeID = empl.employeeID
                        LEFT JOIN ims_stock_in_item_tbl AS sii ON muf.materialUsageID = sii.materialUsageID AND ird.itemID = sii.itemID 
                        LEFT JOIN ims_stock_in_assets_tbl AS sia ON muf.materialUsageID = sia.materialUsageID AND ird.itemID = sia.assetID
                        WHERE materialUsageStatus = 2 GROUP BY muf.materialUsageID,sii.materialUsageID, sia.materialUsageID,ird.itemID,sii.itemID,sia.assetID
                        UNION ALL
                        SELECT '3' AS module,
                        iir.inventoryReceivingID AS ID,
                        purchaseOrderCode AS purchaseID,
                        inventoryReceivingCode as referenceCode, 
                        CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,
                        receivedQuantity AS quantity,
                        DATE_FORMAT(iir.createdAt,'%M% %d%, %Y') AS daterequest,
                        inventoryReceivingStatus as inventoryStatus,
                        CASE WHEN sii.quantityForStockin IS NOT NULL  THEN SUM(sii.quantityForStockin)
                        ELSE IFNULL(SUM(sia.quantityForStockin),0) END RECORD    
                        FROM ims_inventory_receiving_tbl AS iir
                        LEFT JOIN ims_inventory_request_details_tbl AS ird ON iir.inventoryReceivingID = ird.inventoryReceivingID
                        LEFT JOIN hris_employee_list_tbl AS empl ON iir.employeeID = empl.employeeID
                        LEFT JOIN ims_stock_in_item_tbl AS sii ON iir.inventoryReceivingID = sii.inventoryReceivingID AND ird.itemID = sii.itemID
                        LEFT JOIN ims_stock_in_assets_tbl AS sia ON iir.inventoryReceivingID = sia.inventoryReceivingID AND ird.itemID = sia.assetID
                        WHERE inventoryReceivingStatus = 2 GROUP BY iir.inventoryReceivingID,sia.inventoryReceivingID,sii.inventoryReceivingID,ird.itemID,sii.itemID,sia.assetID
                        )a GROUP BY referenceCode`);

                        var countStockIn = 0;

                        getStockInData.map((item) => {
                            let {
                                ID,
                                purchaseID,
                                referenceCode,
                                fullname,
                                quantity,
                                daterequest,
                                inventoryStatus,
                                stockQuantity,
                            } = item;
                         
                            if(quantity != stockQuantity) {
                                countStockIn++;
                            }
                           
                    });

    const countPendingCostEstimate = getTableData(`pms_cost_estimate_tbl`,
    ` COUNT(costEstimateID ) AS costEstimateList`,
    `employeeID = ${sessionID} AND costEstimateStatus =0`);

    const countPendingMaterialRequest = getTableData(`ims_material_request_tbl`,
    ` COUNT(materialRequestID) AS materialRequestList`,
    `employeeID = ${sessionID} AND materialRequestStatus =0`);

    const countPendingMaterialWithdrawal = getTableData(`ims_material_withdrawal_tbl`,
    ` COUNT(materialWithdrawalID ) AS materialWithdrawalList`,
    `employeeID = ${sessionID} AND (inventoryItemStatus =0 OR inventoryAssetStatus = 0 )`);


    const getDepartment = getTableData(`hris_department_tbl`,
    `departmentName,departmentID`,
    `departmentStatus = 1 `);

    const getProject = getTableData(`pms_timeline_builder_tbl as timelineBuilderID`,
    `(SELECT projectListName FROM pms_project_list_tbl WHERE projectListID = timelineBuilderID.projectID) AS projectName,
    timelineBuilderID`,
    `timelineBuilderStatus = 2 `);

    const getReservedItems = getTableData(`ims_inventory_validation_tbl`,
    `inventoryValidationID,materialRequestCode,employeeID,projectName,projectCategory,dateNeeded,createdBy`,
    `week(dateNeeded)=week(now())  AND inventoryValidationStatus =2`);

    const listApplicants = getTableData(`web_applicant_list_tbl AS applicant
    LEFT JOIN hris_applicant_interviewer_tbl AS interviewer
    ON applicant.applicantID = interviewer.applicantID`, 
    `DISTINCT(applicant.applicantID),
    CONCAT('APPL-',SUBSTR(applicant.createdAt,3,2),'-',LPAD(applicant.applicantID, 5, '0')) AS applicantCode,
    CONCAT(applicant.applicantFirstname,' ', applicant.applicantLastname) AS fullname,
    interviewer.applicantInterviewerProgression,
    (SELECT designationName FROM hris_designation_tbl WHERE designationID = applicantDesignationID ) AS designationName,
    IFNULL(interviewer.applicantInterviewerStatus,"Pending") as applicantStatus`, 
    ` interviewer.applicantInterviewerStatus !="" OR interviewer.applicantInterviewerStatus  IS NULL`,
    `interviewer.createdAt OR interviewer.updatedAt ASC`);




let html = `        <div class="row clearfix row-deck">
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-truck"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">VENDOR</div>
                                        <h4 class="number mb-0">${countActiveVendor[0].activeVendor || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-scanner"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">ITEMS</div>
                                        <h4 class="number mb-0">${countActiveItems[0].activeItem || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fad fa-hammer"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">ASSETS</div>
                                        <h4 class="number mb-0">${countActiveAssets[0].activeAsset || 0 }</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fad fa-dolly-empty"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">STOCK OUT ITEMS</div>
                                        <h4 class="number mb-0">${formatAmount(countStockOutItems[0].countStockOut ||  0)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row clearfix row-deck">
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-trash-alt"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">DISPOSED ASSETS</div>
                                        <h4 class="number mb-0">${formatAmount(countDisposedAssets[0].countDisposed || 0)}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-inventory"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">PENDING STOCK IN</div>
                                        <h4 class="number mb-0">${countStockIn || 0}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="far fa-person-dolly-empty"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">UNAVAILABLE ITEMS</div>
                                        <h4 class="number mb-0">${countPendingMaterialWithdrawal[0].materialWithdrawalList || 0 }</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="card top_widget">
                                <div class="body">
                                    <div class="icon"><i class="fas fa-truck-ramp"></i> </div>
                                    <div class="content">
                                        <div class="text mb-2 text-uppercase">UNAVAILABLE ASSETS</div>
                                        <h4 class="number mb-0">${countPendingMaterialWithdrawal[0].materialWithdrawalList || 0 }</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>`;

                    html += `
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <div class="card">
                                
                                    <div class="card-header w-100 bg-primary text-white text-left">
                                        <h6 class="font-weight-bold">RESERVED ITEMS</h6>
                                    </div>
                                
                                    
                                
                                <div class="card-body table">
                                    <table class="table table-bordered table-striped" id="tableReservedItems">
                                        <thead>
                                            <tr style="white-space: nowrap">
                                                <th>Reference No.</th>
                                                <th>Requestor Name</th>
                                                <th>Project Name</th>
                                                <th>Project Category</th>
                                                <th>Date Needed</th>
                                            </tr>
                                        </thead>
                                        <tbody >`;
                                
                                        getReservedItems.map((reserve) => {
                                            let {
                                                inventoryValidationID,
                                                materialRequestCode,
                                                employeeID,
                                                projectName,
                                                projectCategory,
                                                dateNeeded,
                                                createdBy
                                            } = reserve;

                                            let getDateNeeded = moment(dateNeeded).format("MMMM DD, YYYY");

                                            html += `
                                            <tr class="btnView" id="${encryptString(inventoryValidationID)}">
                                                <td>${materialRequestCode || "-"}</td>
                                                <td>${employeeFullname(employeeID != "0" ? employeeID : createdBy ) || "-"}</td>
                                                <td>${projectName || "-"}</td>
                                                <td>${projectCategory || "-"}</td>
                                                <td>${getDateNeeded || "-"}</td>
                                            </tr>`;
                                        });
                                
                                    html += `
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                      `;

                   
                    html += `
                            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <div class="card">
                                    <div class="card-header w-100 bg-primary text-white text-left">
                                        <h6 class="font-weight-bold">TOTAL NO. OF ASSET</h6>
                                    </div>

                                
                                    <div class="card-body table">

                                        <div id="filterContent">
                                            ${filteringOptions()}
                                        </div>
                                        <table class="table table-bordered table-striped" id="tableWarehouse">
                                            <thead>
                                                <tr style="white-space: nowrap">
                                                    <th>Asset Code</th>
                                                    <th>Asset Name</th>
                                                    <th>Asset Classification</th>
                                                    <th>UOM</th>
                                                    <th>Quantity</th>
                                                    <th>Barcode</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyProject">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        
                        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div class="card">
                                <div class="card-header w-100 bg-primary text-white text-left">
                                    <h6 class="font-weight-bold">NEARLY EXPIRE</h6>
                                </div>

                            
                                <div class="card-body table">

                                    <div class="d-flex justify-content-end">
                                            <div>
                                            <select class="form-control select2 w-50"
                                                name="inventory-type"
                                                style="width: 100%">
                                                    <option disabled selected>Select Inventory Type</option>
                                                    <option value="items">Item</option>
                                                    <option value="assets">Assets</option>
                                                </select>
                                            </div>
                                    </div>
                                    <div class="nearly-expire-table">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>
                      `;


    setTimeout(() => {
        $("#tableMyFormsParent").html(html);
        initDataTables();
        noOfEmployeeWorkloadChart();
        noOfEmployeeChart();
        initAll();
        return html;
    }, 300);
}
// ----- END MY FORMS CONTENT -----

// ----- REFRESH TABLE -----
function refreshTableContent() {
    const inventoryStorageID = $(`[name="inventoryStorageID"]`).val();

    const data = getReservationData(inventoryStorageID);
    tableContent(data);
}
// ----- END REFRESH TABLE -----


// // ----- FORM BUTTONS -----
// function formButtons(data = false, isRevise = false, isFromCancelledDocument = false) {
//     let button = "";
//     if (data) {
//         let {
//             voucherID     = "",
//             voucherStatus = "",
//             employeeID               = "",
//             approversID              = "",
//             approversDate            = "",
//             createdAt                = new Date
//         } = data && data[0];

//         let isOngoing = approversDate ? approversDate.split("|").length > 0 ? true : false : false;
//         if (employeeID === sessionID) {
//             if (voucherStatus == 0 || isRevise) {
//                 // DRAFT
//                 button = `
//                 <button 
//                     class="btn btn-submit px-5 p-2" 
//                     id="btnSubmit" 
//                     voucherID="${voucherID}"
//                     code="${getFormCode("CV", createdAt, voucherID)}"
//                     revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-paper-plane"></i>
//                     Submit
//                 </button>`;

//                 if (isRevise) {
//                     button += `
//                     <button 
//                         class="btn btn-cancel  px-5 p-2" 
//                         id="btnCancel"
//                         revise="${isRevise}" cancel="${isFromCancelledDocument}"><i class="fas fa-ban"></i> 
//                         Cancel
//                     </button>`;
//                 } else {
//                     button += `
//                     <button 
//                         class="btn btn-cancel px-5 p-2"
//                         id="btnCancelForm" 
//                         voucherID="${voucherID}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"
//                         revise=${isRevise}><i class="fas fa-ban"></i> 
//                         Cancel
//                     </button>`;
//                 }

                
//             } else if (voucherStatus == 1) {
//                 // FOR APPROVAL
//                 if (!isOngoing) {
//                     button = `
//                     <button 
//                         class="btn btn-cancel px-5 p-2"
//                         id="btnCancelForm" 
//                         voucherID="${voucherID}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"
//                         status="${voucherStatus}"><i class="fas fa-ban"></i> 
//                         Cancel
//                     </button>`;
//                 }
//             } else if (voucherStatus == 2) {
//                 // DROP
//                 // button = `
//                 // <button type="button" 
//                 //     class="btn btn-cancel px-5 p-2"
//                 //     id="btnDrop" 
//                 //     voucherID="${encryptString(voucherID)}"
//                 //     code="${getFormCode("CV", createdAt, voucherID)}"
//                 //     status="${voucherStatus}"><i class="fas fa-ban"></i> 
//                 //     Drop
//                 // </button>`;
                
//             } else if (voucherStatus == 3) {
//                 // DENIED - FOR REVISE
//                 if (!isDocumentRevised(voucherID)) {
//                     button = `
//                     <button
//                         class="btn btn-cancel px-5 p-2"
//                         id="btnRevise" 
//                         voucherID="${encryptString(voucherID)}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"
//                         status="${voucherStatus}"><i class="fas fa-clone"></i>
//                         Revise
//                     </button>`;
//                 }
//             } else if (voucherStatus == 4) {
//                 // CANCELLED - FOR REVISE
//                 if (!isDocumentRevised(voucherID)) {
//                     button = `
//                     <button
//                         class="btn btn-cancel px-5 p-2"
//                         id="btnRevise" 
//                         voucherID="${encryptString(voucherID)}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"
//                         status="${voucherStatus}"
//                         cancel="true"><i class="fas fa-clone"></i>
//                         Revise
//                     </button>`;
//                 }
//             }
//         } else {
//             if (voucherStatus == 1) {
//                 if (isImCurrentApprover(approversID, approversDate)) {
//                     button = `
//                     <button 
//                         class="btn btn-submit px-5 p-2" 
//                         id="btnApprove" 
//                         voucherID="${encryptString(voucherID)}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"><i class="fas fa-paper-plane"></i>
//                         Approve
//                     </button>
//                     <button 
//                         class="btn btn-cancel px-5 p-2"
//                         id="btnReject" 
//                         voucherID="${encryptString(voucherID)}"
//                         code="${getFormCode("CV", createdAt, voucherID)}"><i class="fas fa-ban"></i> 
//                         Deny
//                     </button>`;
//                 }
//             }
//         }
//     } else {
//         button = `
//         <button 
//             class="btn btn-submit px-5 p-2" 
//             id="btnSubmit"><i class="fas fa-paper-plane"></i> Submit
//         </button>
//         <button 
//             class="btn btn-cancel px-5 p-2" 
//             id="btnCancel"><i class="fas fa-ban"></i> 
//             Cancel
//         </button>`;
//     }
//     return button;
// }
// // ----- END FORM BUTTONS -----




// // ----- GET PURCHASE ORDER LIST -----
// function getPaymentRequestList(id = null, status = 0, display = true , voucherid= null) {
//     var exist = [];
//     var condition  ="";
    
//     // const paymentList = getTableData(
//     //     `fms_payment_request_tbl`,
//     //     "paymentRequestID ",`paymentStatus = 2`
//     // );
//     // paymentList.map(items=>{
//     //     exist.push(items.paymentRequestID);
//     // })

//     if(status === false){
        
//          condition  =`(ipot.paymentRequestStatus = 2 AND 
//             ((iir.voucherStatus != 1 AND 
//                 iir.voucherStatus != 0 AND 
//                 iir.voucherStatus != 3 AND 
//                 iir.voucherStatus != 4 AND 
//                 iir.voucherStatus != 5 AND 
//                 iir.voucherStatus != 2) OR 
//                 (iir.voucherStatus IS NULL)))`;
//     }
//     else{
        
//         condition  =`(ipot.paymentRequestStatus = 2 AND iir.paymentRequestID =${id} ) GROUP BY  ipot.paymentRequestID`;
//     }

//     const paymentRequestList = getTableData(
//         `fms_payment_request_tbl AS ipot
//             LEFT JOIN hris_employee_list_tbl AS helt  ON helt.employeeID = ipot.requestorID
//             LEFT JOIN hris_department_tbl AS dept ON dept.departmentID = helt.departmentID
//             LEFT JOIN hris_designation_tbl AS dsg ON dsg.designationID = helt.designationID
//             LEFT JOIN fms_check_voucher_tbl AS iir ON iir.paymentRequestID = ipot.paymentRequestID`,
//         `ipot.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, dept.departmentName, dsg.designationName, 
//         helt.employeeUnit,
//         helt.employeeBuilding,
//         helt.employeeBarangay,
//         helt.employeeCity,
//         helt.employeeProvince,
//         helt.employeeCountry,
//         helt.employeeZipCode,
//         DATE_FORMAT(ipot.createdAt, '%M% %d, %Y') as requestorDate`,
//         `${condition}`
//     )

  
//     let html = '';
//     if (!status || status == 0) {
//         // html += paymentRequestList.filter(po => createdIRList.indexOf(po.purchaseOrderID) == -1 || po.purchaseOrderID == id).map(po => {
        
//         html += paymentRequestList.filter(payment => !exist.includes(payment.paymentRequestID) || payment.paymentRequestID == id).map(payment => {
// 			let address = `${payment.employeeUnit && titleCase(payment.employeeUnit)+" "}${payment.employeeBuilding && payment.employeeBuilding +" "}${payment.employeeBarangay && titleCase(payment.employeeBarangay)+", "}${payment.employeeCity && titleCase(payment.employeeCity)+", "}${payment.employeeProvince && titleCase(payment.employeeProvince)+", "}${payment.employeeCountry && titleCase(payment.employeeCountry)+", "}${payment.employeeZipCode && titleCase(payment.employeeZipCode)}`;

//             return `
//             <option 
//                 value      = "${payment.paymentRequestID}" 
//                 requestorname = "${payment.fullname}"
//                 department = "${payment.departmentName}"
//                 designation = "${payment.designationName}"
//                 address     = "${address}"
//                 checkvoucherid     = "${voucherid}"
//                 requestordate     = "${payment.requestorDate}"
//             ${payment.paymentRequestID == id && "selected"}>
//             ${getFormCode("PYRF", payment.createdAt, payment.paymentRequestID)}
//             </option>`;
//         })
//     } else {
//         html += paymentRequestList.map(payment => {
// 			let address = `${payment.employeeUnit && titleCase(payment.employeeUnit)+" "}${payment.employeeBuilding && payment.employeeBuilding +" "}${payment.employeeBarangay && titleCase(payment.employeeBarangay)+", "}${payment.employeeCity && titleCase(payment.employeeCity)+", "}${payment.employeeProvince && titleCase(payment.employeeProvince)+", "}${payment.employeeCountry && titleCase(payment.employeeCountry)+", "}${payment.employeeZipCode && titleCase(payment.employeeZipCode)}`;

//             return `
//             <option 
//             value      = "${payment.paymentRequestID}" 
//             requestorname = "${payment.fullname}"
//             department = "${payment.departmentName}"
//             designation = "${payment.designationName}"
//             address     = "${address}"
//             checkvoucherid     = "${voucherid}"
//             requestordate     = "${payment.requestorDate}"
//             ${payment.paymentRequestID == id && "selected"}>
//             ${getFormCode("PYRF", payment.createdAt, payment.paymentRequestID)}
//             </option>`;
//         })
//     }
//     return display ? html : paymentRequestList;
// }
// // ----- END GET PURCHASE ORDER LIST -----


// // ----- GET BUDGET SOURCE LIST -----
// function getBudgetSourceList(id = null, status = 0, display = true , voucherid= null) {
  
//     const budgetSourceList = getTableData(
//         `fms_chart_of_accounts_tbl AS chart 
//         LEFT JOIN fms_check_voucher_tbl AS fcv ON fcv.voucherBudgetSource = chart.chartOfAccountID `,
//         `chart.chartOfAccountID ,chart.accountName,chart.accountCode`,
//         `accountBudgetSource = 1 AND accountStatus =1`
//     )

//     let html = '';
   
//         html += budgetSourceList.map(budget => {

//             return `
//             <option 
//             value      = "${budget.chartOfAccountID}" 
//             accountname = "${budget.accountName}"
//             accountcode = "${budget.accountCode}"
//             checkvoucherid     = "${voucherid}"
//             ${budget.chartOfAccountID == id && "selected"}>
//             ${budget.accountName}
//             </option>`;
//         })
    
//     return display ? html : budgetSourceList;
// }
// // ----- END GET BUDGET SOURCE LIST -----

    // // ----- GET BANK LIST -----
    // function getBankList(id = null, display = true) {
    //     let html = `
	// 	<option 
	// 		value       = "0"
	// 		${id == "0" && "selected"}>Cash</option>`;
    //     html += bankList.map(employee => {
	// 		let bankName = `${employee.bankName}`;
	// 		let bankID = `${employee.bankID}`;

    //         return `
    //         <option 
    //             value       = "${employee.bankID}" 
    //             ${employee.bankID == id && "selected"}>
    //             ${employee.bankName}
    //         </option>`;
    //     })
    //     return display ? html : bankList;
    // }
    // // ----- END GET BANK LIST -----





// // ----- GET SERVICE ROW -----
// function getItemsRow(id, readOnly = false, voucherID = "") {
//     let html = "";
//     let requestItemsData;	
//     let purchaseOrder;	
//     let replenishmentList;	
//     if (voucherID) {
//         requestItemsData = getTableData(
//             `fms_check_voucher_details_tbl AS voucherdet
//             LEFT JOIN fms_check_voucher_tbl AS voucher USING(voucherID)`,
//             `voucher.paymentRequestID,
//             voucherdet.accountCode,
//             voucherdet.accountName,
//             voucherdet.debit,
//             voucherdet.credit,
//             voucher.voucherBudgetSource as chartOfAccountID,
//             voucherdet.balance`,
//             `voucherdet.voucherID = ${voucherID}`
//         )
//     } else {
//         replenishmentList = getTableData(
//             `fms_payment_request_tbl as  payment
//                 LEFT JOIN fms_finance_request_details_tbl AS  ffr ON ffr.pettyRepID = payment.pettyRepID
//                 LEFT JOIN fms_liquidation_tbl AS  flt ON flt.liquidationID  = ffr.liquidationID 
//                 LEFT JOIN fms_chart_of_accounts_tbl as chart ON chart.chartOfAccountID  = flt.chartOfAccountID `, 
//             "payment.paymentRequestID,chart.accountCode, chart.accountName,chart.chartOfAccountID,ffr.quantity * ffr.amount as amount", 
//             `payment.paymentRequestID = ${id} AND payment.paymentRequestStatus=2 AND payment.pettyRepID !=0 `
//         )

//         purchaseOrderList = getTableData(
//             `fms_payment_request_tbl as  payment
//             LEFT JOIN ims_purchase_order_tbl AS  ipo ON ipo.purchaseOrderID  = payment.purchaseOrderID 
//             LEFT JOIN fms_chart_of_accounts_tbl as chart ON chart.chartOfAccountID  = ipo.chartOfAccountID`, 
//             "payment.paymentRequestID,chart.accountCode, chart.accountName,chart.chartOfAccountID,ipo.grandTotalAmount as amount", 
//             `payment.paymentRequestID = ${id} AND payment.paymentRequestStatus=2 AND payment.purchaseOrderID !=0 `
//         )

//         if(purchaseOrderList.length){
//             requestItemsData = purchaseOrderList;
//         }else{
//             requestItemsData = replenishmentList;
//         }

            
//     }
//     if (requestItemsData.length > 0) {
//         requestItemsData.map((item, index) => {
       
//             let {
//                 paymentRequestID               = "",
//                 chartOfAccountID = "",
//                 accountCode                      = "",
//                 accountName                    = "",
//                 balance = "",
//                 debit="",
//                 credit="",
//                 amount = 0
//             } = item;

         
//             if (readOnly) {
//                 html += `
//                 <tr class="itemTableRow" paymentRequestID="${paymentRequestID}">
//                     <td>
//                         <div class="accountcode" accountid="${chartOfAccountID}"> ${accountCode || "-"}</div>
//                     </td>

//                     <td>
//                         <div class="accountname">${accountName || "-"}</div>
//                     </td>

//                     <td>
//                         <div class="debit  text-right">₱ ${debit || "-"}</div>
//                         <input type="hidden" name="debit" value="${debit || 0}">
//                     </td>

//                     <td>
//                         <div class="credit text-right" name="credit">₱ ${credit || "-"}</div>
//                         <input type="hidden" name="credit" value="${credit || 0}">
//                     </td>

//                     <td>
//                     <div class="balance text-right">₱ ${balance || "-"}</div>
//                     </td>
                   

//                 </tr>`;
//             } else {
//                 html += `
//                 <tr class="itemTableRow" paymentRequestID="${paymentRequestID}" >
			
//                 <td>
//                     <div class="accountcode" name="accountcode" accountid="${chartOfAccountID}" ${voucherID ? prevbudgetsource="${chartOfAccountID}" : ""} >${ accountCode || "-"}</div>
//                 </td>

//                 <td>
//                     <div class="accountname" name="accountname">${ accountName || "-"}</div>
//                 </td>
               
// 				<td>
//                  <div class="input-group">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text">₱</span>
//                     </div>
//                     <input type="text" 
//                     class="form-control amount"  
//                     data-allowcharacters="[0-9]" 
//                     min="0" max="${voucherID ? debit : amount}"
//                     minlength="1" 
//                     maxlength="13" 
//                     id="debit${index}" 
//                     name="debit" 
//                     value="${voucherID ? debit : amount}" 
//                     ${credit !=0 ? "" : "disabled"} 
//                     style="text-align: right;">
//                     <div class="invalid-feedback d-block" id="invalid-debit${index}"></div>
//                 </div>
//                 </td>

//                 <td>
//                 <div class="input-group">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text">₱</span>
//                     </div>
//                     <input type="text" 
//                     class="form-control amount"  
//                     min="0" max="${voucherID ? credit :"" }"
//                     minlength="1" 
//                     maxlength="13" 
//                     name="credit" 
//                     id="credit${index}" 
//                     value="${voucherID ? credit : ""}" 
//                     style="text-align: right;">
//                 </div>
//                 </td>

//                 <td>
//                     <div class="input-group">
//                         <div class="input-group-prepend">
//                             <span class="input-group-text">₱</span>
//                         </div>
//                         <input type="text" 
//                         class="form-control amount"  
//                         min="0" max="${voucherID ? credit :"" }"
//                         minlength="1" 
//                         maxlength="13" 
//                         id="balance${index}" 
//                         name="balance"
//                         value="${voucherID ? balance : ""}" 
//                         style="text-align: right;">
//                         <div class="invalid-feedback d-block" id="invalid-balance${index}"></div>
//                     </div>
//                 </td>

// 			</tr>`;

//             }
//         })
       
        
//     } else {
//         html += `
//         <tr class="text-center">
//             <td colspan="9">No data available in table</td>
//         </tr>`
//     }

//     return html;
    
// }
// // ----- END GET SERVICE ROW -----

// // ----- GET SERVICE ROW CREDIT -----
// function getItemsRowCredit(id, readOnly = false, voucherID = "") {
//     let html = "";
//     let chartOfAcccts;	
//     // if (voucherID) {


//         // chartOfAcccts = getTableData(
//         //     `fms_check_voucher_details_tbl AS voucherdet
//         //     LEFT JOIN fms_check_voucher_tbl AS voucher USING(voucherID)`,
//         //     `voucher.paymentRequestID,
//         //     voucherdet.accountCode,
//         //     voucherdet.accountName,
//         //     voucherdet.debit,
//         //     voucherdet.credit,
//         //     voucherdet.balance`,
//         //     `voucherdet.voucherID = ${voucherID}`
//         // )
//     // } else {
//         chartOfAcccts = getTableData(  
//             `fms_chart_of_accounts_tbl `, 
//             "accountCode, accountName,chartOfAccountID", 
//             `chartOfAccountID  = ${id} AND accountStatus=1 AND accountBudgetSource =1 `
//         )
//     // }
    
//         chartOfAcccts.map((item, index) => {
       
//             let {
              
//                 chartOfAccountID = "",
//                 accountCode                      = "",
//                 accountName                    = "",
//                 balance = "",
//                 debit="",
//                 credit=""
//             } = item;

//             if (readOnly) {
//                 html += `
//                 <tr class="itemTableRow">
//                     <td>
//                         <div class="accountcode" accountid="${chartOfAccountID}" prevbudgetsource="${chartOfAccountID}"> ${accountCode || "-"}</div>
//                     </td>

//                     <td>
//                         <div class="accountname">${accountName || "-"}</div>
//                     </td>

//                     <td>
//                         <div class="debit  text-right">₱ ${debit || "-"}</div>
//                         <input type="hidden" name="debit" value="${debit || 0}">
//                     </td>

//                     <td>
//                         <div class="credit text-right" name="credit">₱ ${credit || "-"}</div>
//                         <input type="hidden" name="credit" value="${credit || 0}">
//                     </td>

//                     <td>
//                     <div class="balance text-right">₱ ${balance || "-"}</div>
//                     </td>
                   

//                 </tr>`;
//             } else {
//                 html += `
//                 <tr class="itemTableRow">
			
//                 <td>
//                     <div class="accountcode" name="accountcode" accountid="${chartOfAccountID}" prevbudgetsource="${chartOfAccountID}">${ accountCode || "-"}</div>
//                 </td>

//                 <td>
//                     <div class="accountname" name="accountname">${ accountName || "-"}</div>
//                 </td>
               
// 				<td>
//                 <div class="input-group">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text">₱</span>
//                     </div>
//                     <input type="text" 
//                     class="form-control amount text-right"  
//                     data-allowcharacters="[0-9]" 
//                     min="0" max="${voucherID ? debit : ""}"
//                     minlength="1" 
//                     maxlength="13" 
//                     id="debits${index}" 
//                     name="debit" 
//                     value="${voucherID ? debit : ""}" >
//                     <div class="invalid-feedback d-block" id="invalid-debits${index}"></div>
//                 </div>
//                 </td>

//                 <td>
//                  <div class="input-group">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text">₱</span>
//                     </div>
//                     <input type="text" 
//                     class="form-control amount text-right"  
//                     data-allowcharacters="[0-9]" 
//                     min="0" max="${voucherID ? credit : ""}"
//                     minlength="1" 
//                     maxlength="13" 
//                     id="credits${index}" 
//                     name="credit" 
//                     value="${voucherID ? credit : ""}"  >
//                     <div class="invalid-feedback d-block" id="invalid-credits${index}"></div>
//                 </div>
//                 </td>

//                 <td>
//                   <div class="input-group">
//                     <div class="input-group-prepend">
//                         <span class="input-group-text">₱</span>
//                     </div>
//                     <input type="text" 
//                     class="form-control amount text-right"  
//                     data-allowcharacters="[0-9]" 
//                     min="0" max="${voucherID ? balance : ""}"
//                     minlength="1" 
//                     maxlength="13" 
//                     id="balances${index}" 
//                     name="balance" 
//                     value="${voucherID ? balance : ""}"   >
//                     <div class="invalid-feedback d-block" id="invalid-balances${index}"></div>
//                 </div>
//                 </td>

// 			</tr>`;

//             }
//         })
        
    
//     return html;
    
// }
// // ----- END GET SERVICE ROW CREDIT -----

// // ----- SELECT PURCHASE ORDER -----
// $(document).on("change", "[name=voucherBudgetSource]", function() {
//     const accountname = $('option:selected', this).attr("accountname");
//     const accountcode = $('option:selected', this).attr("accountcode");
//     const id 					= $(this).val();
//     let checkvoucherid 	= $('option:selected', this).attr("checkvoucherid");
//     let executeonce 	        = $(this).attr("executeonce") == "true";
//     var readOnly			    = $(this).attr("disabled") == "disabled";
//     const status                = $(this).attr("status");
//     checkvoucherid        = executeonce ? checkvoucherid : null;

//     var prevBudgetSource = $(".purchaseOrderItemsBody").find("tr:last").find("td [name=accountcode]").attr("prevbudgetsource") || 0;
//     if(prevBudgetSource != id && prevBudgetSource != 0 ){
//         $(".purchaseOrderItemsBody").find("tr:last").remove(); // remove last child in table
//     }

//     if(id ==1){
//         $("[name=checkNo]").prop("disabled",true);
//         $("[name=checkNo]").val("");
//         $("[name=checkNo]").removeAttr("required");
//         $("[name=checkNo]").removeClass("is-invalid").removeClass("is-valid");
//         $("#invalid-checkNo").text("");
//     }else{
//         $("[name=checkNo]").prop("disabled",false);
//         $("[name=checkNo]").val("");
//         $("[name=checkNo]").attr("required",true);
//         $("#invalid-checkNo").text("");



//     }

  
    

//     // $("[name=requestorName]").val(requestorname);
//     // $("[name=requestorPosition]").val(designation);
//     // $("[name=requestorDepartment]").val(department);
//     // $("[name=requestorAddress]").val(address);
//     // $("[name=requestorDate]").val(requestordate);
//     // $(".purchaseOrderItemsBody").html('<tr><td colspan="8">'+preloader+'</td></tr>');

//     let purchaseOrderItemsBody = getItemsRowCredit(id, readOnly, checkvoucherid);
//     setTimeout(() => {
//         $(".purchaseOrderItemsBody").append(purchaseOrderItemsBody);
//         initAll();
//         updateTotalDebit();
//         updateTotalCredit();
//         $(this).removeAttr("executeonce");
//     }, 300);
// })
// // ----- END SELECT PURCHASE ORDER -----


// // ----- SELECT PURCHASE ORDER -----
// $(document).on("change", "[name=paymentRequestID]", function() {
//     const department = $('option:selected', this).attr("department");
//     const designation = $('option:selected', this).attr("designation");
//     const address = $('option:selected', this).attr("address");
//     const requestorname = $('option:selected', this).attr("requestorname");
//     const requestordate = $('option:selected', this).attr("requestordate");
//     const id 					= $(this).val();
//     let checkvoucherid 	= $('option:selected', this).attr("checkvoucherid");
//     let executeonce 	        = $(this).attr("executeonce") == "true";
//     var readOnly			    = $(this).attr("disabled") == "disabled";
//     const status                = $(this).attr("status");
//     checkvoucherid        = executeonce ? checkvoucherid : null;
//     var prevPaymentID = $(this).attr("prevPaymentID") ||0;
//     console.log(prevPaymentID)
//     if(prevPaymentID != 0){
//         $('#voucherBudgetSource').val($('#voucherBudgetSource option:first-child').val()).trigger('change');
//     }
//     $(this).attr("prevPaymentID",id);

//     $("#invalid-voucherBudgetSource").text("");
//     $("[name=requestorName]").val(requestorname);
//     $("[name=requestorPosition]").val(designation);
//     $("[name=requestorDepartment]").val(department);
//     $("[name=requestorAddress]").val(address);
//     $("[name=requestorDate]").val(requestordate);
//     $(".purchaseOrderItemsBody").html('<tr><td colspan="8">'+preloader+'</td></tr>');

//     let purchaseOrderItemsBody = getItemsRow(id, readOnly, checkvoucherid);
//     setTimeout(() => {
//         $(".purchaseOrderItemsBody").html(purchaseOrderItemsBody);
//         initAll();
//         updateTotalDebit();
//         updateTotalCredit();
//         $(this).removeAttr("executeonce");
//     }, 300);
// })
// // ----- END SELECT PURCHASE ORDER -----

	// // ----- GET AMOUNT -----
	// const getNonFormattedAmount = (amount = "₱0.00") => {
	// 	return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	// }
	// // ----- END GET AMOUNT -----


	// // ----- KEYUP QUANTITY OR UNITCOST -----
	// $(document).on("keyup", "[name=debit]", function() {
	// 	// const tableRow  = $(this).closest("tr");
	// 	// const quantity  = +getNonFormattedAmount(tableRow.find(`[name="quantity"]`).first().val());
	// 	// const unitcost  = +getNonFormattedAmount(tableRow.find(`[name="unitCost"]`).first().val());
	// 	// const totalcost = quantity * unitcost;
	// 	// tableRow.find(`.totalcost`).first().text(formatAmount(totalcost, true));
    //     updateTotalDebit();
    //     updateTotalCredit();
	// })
	// // ----- END KEYUP QUANTITY OR UNITCOST -----

    //     // ----- UPDATE TOTAL DEBIT -----
	// function updateTotalDebit() {
	// 	const debitArr = $.find(`[name=debit]`).map(element => getNonFormattedAmount(element.value) || "0");
	// 	const creditArr = $.find(`[name=credit]`).map(element => getNonFormattedAmount(element.value) || "0");
	// 	const totalDebit = debitArr.map((dbt) => +dbt ).reduce((a,b) => a + b, 0);
	// 	const totalCredit = creditArr.map((cdt) => +cdt ).reduce((a,b) => a + b, 0);
	// 	// $(`#totalAmount`).text(formatAmount(totalAmount, true));
    //     console.log(debitArr)
    //     $(".computedebit").text(formatAmount(totalDebit, true));

    //     if(parseFloat(totalDebit) != parseFloat(totalCredit) ){
    //           // $("[name=debit] :last").each(function(){
    //         //     if($(this).val() != 0){
    //             $("[name=debit] :last").addClass("is-invalid");
    //             //     }
    //             // });
    
    //             // $("[name=credit] :last").each(function(){
    //             //     if($(this).val() != 0){
    //                     $("[name=credit] :last").addClass("is-invalid");
    //             //     }
    //             // });
    //         $("#invalid-totalDebit").text("Should be equal to credit!");
    //     }else{
    //         $("[name=debit]").each(function(){
              
    //             $(this).removeClass("is-invalid");
            
    //     });

    //     $("[name=credit]").each(function(){
          
    //             $(this).removeClass("is-invalid");
            
    //     });

    //         $("#invalid-totalDebit").text("");
    //     }
      
	// 	return totalDebit;

       
	// }
	// // ----- END UPDATE TOTAL DEBIT -----

    // 	// ----- KEYUP QUANTITY OR UNITCOST -----
	// $(document).on("keyup", "[name=credit]", function() {
	// 	// const tableRow  = $(this).closest("tr");
	// 	// const quantity  = +getNonFormattedAmount(tableRow.find(`[name="quantity"]`).first().val());
	// 	// const unitcost  = +getNonFormattedAmount(tableRow.find(`[name="unitCost"]`).first().val());
	// 	// const totalcost = quantity * unitcost;
	// 	// tableRow.find(`.totalcost`).first().text(formatAmount(totalcost, true));
	// 	updateTotalDebit();
    //     updateTotalCredit();
	// })
	// // ----- END KEYUP QUANTITY OR UNITCOST -----

    //     // ----- UPDATE TOTAL DEBIT -----
	// function updateTotalCredit() {
	// 	const debitArr = $.find(`[name=debit]`).map(element => getNonFormattedAmount(element.value) || "0");
	// 	const creditArr = $.find(`[name=credit]`).map(element => getNonFormattedAmount(element.value) || "0");
	// 	const totalDebit = debitArr.map((dbt) => +dbt ).reduce((a,b) => a + b, 0);
	// 	const totalCredit = creditArr.map((cdt) => +cdt ).reduce((a,b) => a + b, 0);
	// 	// $(`#totalAmount`).text(formatAmount(totalAmount, true));
    //     $(".computecredit").text(formatAmount(totalCredit, true));

    //     if(parseFloat(totalDebit) != parseFloat(totalCredit) ){
    //         // $("[name=debit] :last").each(function(){
    //         //     if($(this).val() != 0){
    //                 $("[name=debit]:last").addClass("is-invalid");
    //         //     }
    //         // });

    //         // $("[name=credit] :last").each(function(){
    //         //     if($(this).val() != 0){
    //                 $("[name=credit]:last").addClass("is-invalid");
    //         //     }
    //         // });
    //         $("#invalid-totalCredit").text("Should be equal to debit!");
    //     }else{
    //         $("[name=debit]").each(function(){
              
    //                 $(this).removeClass("is-invalid");
                
    //         });

    //         $("[name=credit]").each(function(){
              
    //                 $(this).removeClass("is-invalid");
                
    //         });
    //         $("#invalid-totalCredit").text("");
    //     }
      
	// 	return totalCredit;

       
	// }
	// // ----- END UPDATE TOTAL DEBIT -----




// // ----- FORM CONTENT -----
// function formContent(data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
//     $("#page_content").html(preloader);
//     readOnly = isRevise ? false : readOnly;

//     let {
//         voucherID        = "",
//         reviseVoucherID  = "",
//         employeeID              = "",
//         paymentRequestID               = "",
//         voucherBudgetSource	 ="",
//         voucherRemarks  = "",
//         checkNo  = "",
//         voucherTinPayee ="",
//         voucherDescription  = "",
//         approversID             = "",
//         approversStatus         = "",
//         approversDate           = "",
//         voucherStatus   = false,
//         submittedAt             = false,
//         createdAt               = false,
//     } = data && data[0];


//     let purchaseOrderItems = "";
//     if (voucherID) {
//         purchaseOrderItems = getItemsRow(paymentRequestID, readOnly, voucherID);
//     } 

//     // ----- GET EMPLOYEE DATA -----
//     let {
//         fullname:    employeeFullname    = "",
//         department:  employeeDepartment  = "",
//         designation: employeeDesignation = "",
//     } = employeeData(data ? employeeID : sessionID);
//     // ----- END GET EMPLOYEE DATA -----

//     readOnly ? preventRefresh(false) : preventRefresh(true);

//     $("#btnBack").attr("voucherID", voucherID);
//     $("#btnBack").attr("status", voucherStatus);
//     $("#btnBack").attr("employeeID", employeeID);
//     $("#btnBack").attr("cancel", isFromCancelledDocument);

//     let disabled = readOnly ? "disabled" : "";
	

//     // let disabledReference = purchaseOrderID && purchaseOrderID != "0" ? "disabled" : disabled;

//     let tableInventoryReceivingItems = !disabled ? "tableInventoryReceivingItems" : "tableInventoryReceivingItems0";

//     let button = formButtons(data, isRevise, isFromCancelledDocument);
//     let reviseDocumentNo    = isRevise ? voucherID  : reviseVoucherID ;
//     let documentHeaderClass = isRevise || reviseVoucherID  ? "col-lg-4 col-md-4 col-sm-12 px-1" : "col-lg-2 col-md-6 col-sm-12 px-1";
//     let documentDateClass   = isRevise || reviseVoucherID  ? "col-md-12 col-sm-12 px-0" : "col-lg-8 col-md-12 col-sm-12 px-1";
//     let documentReviseNo    = isRevise || reviseVoucherID  ? `
//     <div class="col-lg-4 col-md-4 col-sm-12 px-1">
//         <div class="card">
//             <div class="body">
//                 <small class="text-small text-muted font-weight-bold">Revised Document No.</small>
//                 <h6 class="mt-0 text-danger font-weight-bold">
//                     ${getFormCode("CV", createdAt, reviseDocumentNo)}
//                 </h6>      
//             </div>
//         </div>
//     </div>` : "";

//     let html = `
//     <div class="row px-2">
//         ${documentReviseNo}
//         <div class="${documentHeaderClass}">
//             <div class="card">
//                 <div class="body">
//                     <small class="text-small text-muted font-weight-bold">Document No.</small>
//                     <h6 class="mt-0 text-danger font-weight-bold">
//                         ${voucherID  && !isRevise ? getFormCode("CV", createdAt, voucherID) : "---"}
//                     </h6>      
//                 </div>
//             </div>
//         </div>
//         <div class="${documentHeaderClass}">
//             <div class="card">
//                 <div class="body">
//                     <small class="text-small text-muted font-weight-bold">Status</small>
//                     <h6 class="mt-0 font-weight-bold">
//                         ${voucherStatus && !isRevise ? getStatusStyle(voucherStatus) : "---"}
//                     </h6>      
//                 </div>
//             </div>
//         </div>
//         <div class="${documentDateClass}">
//             <div class="row m-0">
//             <div class="col-lg-4 col-md-4 col-sm-12 px-1">
//                 <div class="card">
//                     <div class="body">
//                         <small class="text-small text-muted font-weight-bold">Date Created</small>
//                         <h6 class="mt-0 font-weight-bold">
//                             ${createdAt && !isRevise ? moment(createdAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
//                         </h6>      
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-4 col-md-4 col-sm-12 px-1">
//                 <div class="card">
//                     <div class="body">
//                         <small class="text-small text-muted font-weight-bold">Date Submitted</small>
//                         <h6 class="mt-0 font-weight-bold">
//                             ${submittedAt && !isRevise ? moment(submittedAt).format("MMMM DD, YYYY hh:mm:ss A") : "---"}
//                         </h6>      
//                     </div>
//                 </div>
//             </div>
//             <div class="col-lg-4 col-md-4 col-sm-12 px-1">
//                 <div class="card">
//                     <div class="body">
//                         <small class="text-small text-muted font-weight-bold">Date Approved</small>
//                         <h6 class="mt-0 font-weight-bold">
//                             ${getDateApproved(voucherStatus, approversID, approversDate)}
//                         </h6>      
//                     </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//         <div class="col-sm-12 px-1">
//             <div class="card">
//                 <div class="body">
//                     <small class="text-small text-muted font-weight-bold">Remarks</small>
//                     <h6 class="mt-0 font-weight-bold">
//                         ${voucherRemarks && !isRevise ? voucherRemarks : "---"}
//                     </h6>      
//                 </div>
//             </div>
//         </div>
//     </div>
    
    

//     <div class="row" id="form_inventory_receiving">

//         <div class="col-md-4 col-sm-12">
//             <div class="form-group">
//                 <label>Employee Name</label>
//                 <input type="text" class="form-control" disabled value="${employeeFullname}">
//             </div>
//         </div>
//         <div class="col-md-4 col-sm-12">
//             <div class="form-group">
//                 <label>Department</label>
//                 <input type="text" class="form-control" disabled value="${employeeDepartment}">
//             </div>
//         </div>
//         <div class="col-md-4 col-sm-12">
//             <div class="form-group">
//                 <label>Position</label>
//                 <input type="text" class="form-control" disabled value="${employeeDesignation}">
//             </div>
//         </div>

//         <div class="col-md-3 col-sm-12">
//             <div class="form-group">
//                 <label>Reference No. ${!disabled ? "<code>*</code>" : ""}</label>
//                 <select class="form-control validate select2"
//                     name="paymentRequestID"
//                     id="paymentRequestID"
//                     style="width: 100%"
//                     required
//                     ${disabled}
//                     voucherID ="${voucherID}"
//                     readonly="${disabled}"
//                     status="${voucherStatus}"
//                     executeonce="${voucherStatus ? true : false}"
//                    >
//                     <option selected disabled>Select Reference No.</option>
//                     ${getPaymentRequestList(paymentRequestID, voucherStatus,true,voucherID)}           
//                 </select>
//                 <div class="d-block invalid-feedback" id="invalid-paymentRequestID"></div>
//             </div>
//         </div>

//         <div class="col-md-3 col-sm-12">
//             <div class="form-group">
//                 <label>Requestor</label>
//                 <input type="text" class="form-control" name="requestorName" disabled value="">
//             </div>
//         </div>

//         <div class="col-md-3 col-sm-12">
//             <div class="form-group">
//                 <label>Position</label>
//                 <input type="text" class="form-control" name="requestorPosition" disabled value="">
//             </div>
//         </div>

//         <div class="col-md-3 col-sm-12">
//             <div class="form-group">
//                 <label>Department</label>
//                 <input type="text" class="form-control" name="requestorDepartment" disabled value="">
//             </div>
//         </div>

//         <div class="col-md-4 col-sm-12">
//             <div class="form-group">
//                 <label>Address</label>
//                 <input type="text" class="form-control" name="requestorAddress" disabled value="">
//             </div>
//         </div>

//         <div class="col-md-4 col-sm-12">
//             <div class="form-group">
//                 <label>TIN of Payee</label>
//                 <input 
//                 type="text" 
//                 class="form-control inputmask" 
//                 id="voucherTinPayee"
//                 name="voucherTinPayee"
//                 value="${voucherTinPayee}"
//                 data-allowcharacters="[0-9]" 
//                 minlength="15" 
//                 maxlength="15" 
//                 mask="999-999-999-999"
//                 ${disabled}>
             
//             </div>
//         </div>

//         <div class="col-md-4 col-sm-12">
//                 <div class="form-group">
//                 <label>Date</label>
//                 <input type="text" class="form-control" name="requestorDate" disabled value="">
//             </div>
//         </div>

        

//         <div class="col-md-12 col-sm-12">
//             <div class="form-group">
//                 <label>Description ${!disabled ? "<code>*</code>" : ""}</label>
//                 <textarea 
//                 rows="2" 
//                 style="resize: none" 
//                 class="form-control validate" 
//                 name="voucherDescription" 
//                 id="voucherDescription" 
//                 data-allowcharacters="[A-Z][a-z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
//                 minlength="2"
//                 maxlength="150"
//                 required
//                 ${disabled}>${ voucherDescription || ""}</textarea>
//                 <div class="d-block invalid-feedback" id="invalid-voucherDescription"></div>
//             </div>
//         </div>

//         <div class="col-md-6 col-sm-12">
//             <div class="form-group">
//                 <label>Budget Source ${!disabled ? "<code>*</code>" : ""}</label>
//                 <select class="form-control validate select2"
//                     name="voucherBudgetSource"
//                     id="voucherBudgetSource"
//                     style="width: 100%"
//                     required
//                     voucherID ="${voucherID}"
//                     readonly="${disabled}"
//                     status="${voucherStatus}"
//                     executeonce="${voucherStatus ? true : false}"
//                     ${disabled}
//                     >
//                     <option selected disabled>Select Budget Source</option>
//                     ${getBudgetSourceList(voucherBudgetSource,voucherStatus,true,voucherID)}     
//                 </select>
//                 <div class="d-block invalid-feedback" id="invalid-voucherBudgetSource"></div> 
//             </div>
//         </div>

//         <div class="col-md-6 col-sm-12">
//             <div class="form-group">
//                 <label>Check No.</label>
//                 <input 
//                 type="text" 
//                 class="form-control validate" 
//                 id="checkNo"
//                 name="checkNo"
//                 data-allowcharacters="[0-9][-]"
//                 minlength="7"
//                 maxlength="10"
//                 value="${checkNo || ""}"
//                 ${voucherBudgetSource == 1 ? "disabled" :"required"}
//                 ${disabled}
//                >
//                 <div class="d-block invalid-feedback" id="invalid-checkNo"></div>
//             </div>
//         </div>

//         <div class="col-sm-12">
//             <div class="w-100">
//                 <hr class="pb-1">
//                 <div class="text-primary font-weight-bold" style="font-size: 1.5rem;">Detail/s: </div>
//                 <table class="table table-striped" id="${tableInventoryReceivingItems}">
//                     <thead>
//                         <tr style="white-space: nowrap">
//                             <th>Account No.</th>
//                             <th>Account Name</th>
//                             <th>Debit</th>
//                             <th>Credit</th>
//                             <th>Balance</th>
//                         </tr>
//                     </thead>
//                     <tbody class="purchaseOrderItemsBody">
//                         ${purchaseOrderItems}
//                     </tbody>
//                     <tbody>
//                     <tr class="text-center">
//                         <td  style="font-size: 1.1rem; font-weight:bold" class="text-left">Total:</td>
//                         <td></td>
                        
//                         <td class="text-right text-danger" style="font-size: 1.0rem; font-weight:bold"><span class="computedebit">₱0.00</span> 
//                         <div class=" d-block" id="invalid-totalDebit"></div></td>
                        
//                         <td class="text-right text-danger" style="font-size: 1.0rem; font-weight:bold"><span class="computecredit">₱0.00</span> 
//                         <div class=" d-block" id="invalid-totalCredit"></div></td>
                    
//                         <td></td>
//                     </tr>
//                     </tbody>
//                 </table>
                
                
//             </div>
//         </div>
        
        
//     </div>    
        
//         <div class="col-md-12 text-right mt-3">
//             ${button}
//         </div>
//     </div>
//     <div class="approvers">
//         ${!isRevise  ? getApproversStatus(approversID, approversStatus, approversDate) : ""}
//     </div>`;

//     setTimeout(() => {
//         $("#page_content").html(html);
//         initDataTables();
//         initAll();
//         // updateSerialNumber();
//         paymentRequestID && paymentRequestID != 0 && $("[name=paymentRequestID]").trigger("change");
        
//         // !purchaseOrderID && purchaseOrderID == 0 && $("#dateReceived").val(moment(new Date).format("MMMM DD, YYYY"));
//         // $("#dateReceived").data("daterangepicker").maxDate = moment();
//         return html;
//     }, 300);
// }
// // ----- END FORM CONTENT -----


// ----- PAGE CONTENT -----
function pageContent(isForm = false, data = false, readOnly = false, isRevise = false, isFromCancelledDocument = false) {
    $("#page_content").html(preloader);
    if (!isForm) {
        preventRefresh(false);
        let html = `
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane" id="forApprovalTab" aria-expanded="false">
                <div class="" id="tableForApprovalParent">
                </div>
            </div>
            <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                <div class="" id="tableMyFormsParent">
                </div>
            </div>
        </div>`;
        
        $("#page_content").html(html);

        // headerButton(true, "Add Check Voucher");
        headerTabContent();
        myFormsContent();
        updateURL();
    } else {
        // headerButton(false, "", isRevise, isFromCancelledDocument);
        // headerTabContent(false);
        // formContent(data, readOnly, isRevise, isFromCancelledDocument);
    }
}
viewDocument();
$("#page_content").text().trim().length == 0 && pageContent(); // CHECK IF THERE IS ALREADY LOADED ONE
// ----- END PAGE CONTENT -----


// // ----- GET INVENTORY RECEIVING DATA -----
// function getInventoryReceivingData(action = "insert", method = "submit", status = "1", id = null, currentStatus = "0", isObject = false) {

//     /**
//      * ----- ACTION ---------
//      *    > insert
//      *    > update
//      * ----- END ACTION -----
//      * 
//      * ----- STATUS ---------
//      *    0. Draft
//      *    1. For Approval
//      *    2. Approved
//      *    3. Denied
//      *    4. Cancelled
//      * ----- END STATUS -----
//      * 
//      * ----- METHOD ---------
//      *    > submit
//      *    > save
//      *    > deny
//      *    > approve
//      * ----- END METHOD -----
//      */
// console.log("id "+ id)
// console.log("status "+ status)
//      let data = { items: [] }, formData = new FormData;
//     const approversID = method != "approve" && moduleApprover;

//     if (id) {
//         data["voucherID"] = id;
//         formData.append("voucherID", id);

//         if (status != "2") {
//             data["voucherStatus"] = status;
//             formData.append("voucherStatus", status);
//         }
//     }

//     data["action"]    = action;
//     data["method"]    = method;
//     data["updatedBy"] = sessionID;

//     formData.append("action", action);
//     formData.append("method", method);
//     formData.append("updatedBy", sessionID);

//     if (currentStatus == "0" && method != "approve") {
        
//         data["employeeID"] = sessionID;
//         data["paymentRequestID"]  = $("[name=paymentRequestID]").val() || null;
//         data["voucherTinPayee"]  = $("[name=voucherTinPayee]").val() || null;
//         data["voucherDescription"]  = $("[name=voucherDescription]").val()?.trim() || null;
//         data["voucherBudgetSource"]  = $("[name=voucherBudgetSource]").val() || null;
//         data["checkNo"]  = $("[name=checkNo]").val() || null;
//         data["voucherAmount"]  = $(".computecredit").text().replaceAll(",","").replaceAll("₱","")?.trim() || null;

//         formData.append("employeeID", sessionID);
//         formData.append("paymentRequestID", $("[name=paymentRequestID]").val() || null);
//         formData.append("voucherTinPayee", $("[name=voucherTinPayee]").val() || null);
//         formData.append("voucherDescription", $("[name=voucherDescription]").val()?.trim());
//         formData.append("voucherBudgetSource", $("[name=voucherBudgetSource]").val()?.trim());
//         formData.append("checkNo", $("[name=checkNo]").val()?.trim());
//         formData.append("voucherAmount", $(".computecredit").text().replaceAll(",","").replaceAll("₱","")?.trim());

//         if (action == "insert") {
//             data["createdBy"] = sessionID;
//             data["createdAt"] = dateToday();

//             formData.append("createdBy", sessionID);
//             formData.append("createdAt", dateToday());
//         } else if (action == "update") {
//             data["voucherID"] = id;

//             formData.append("voucherID", id);
//         }

//         if (method == "submit") {
//             data["submittedAt"] = dateToday();
//             formData.append("submittedAt", dateToday());
//             if (approversID) {
//                 data["approversID"] = approversID;
//                 data["voucherStatus"] = 1;

//                 formData.append("approversID", approversID);
//                 formData.append("voucherStatus", 1);
//             } else {  // AUTO APPROVED - IF NO APPROVERS
//                 data["approversID"]     = sessionID;
//                 data["approversStatus"] = 2;
//                 data["approversDate"]   = dateToday();
//                 data["voucherStatus"] = 2;

//                 formData.append("approversID", sessionID);
//                 formData.append("approversStatus", 2);
//                 formData.append("approversDate", dateToday());
//                 formData.append("voucherStatus", 2);
//             }
//         }

//         $(".itemTableRow").each(function(i, obj) {
//             const paymentRequestID = $(this).attr("paymentRequestID");
//             const chartOfAccountID     = $("td [name=accountcode]", this).attr("accountid");	
//             const accountCode  = $("td [name=accountcode]", this).text().trim();	
//             const accountName  = $("td [name=accountname]", this).text().trim();	
//             const debit  = $("td [name=debit]", this).val().replaceAll(",","");	
//             const credit  = $("td [name=credit]", this).val().replaceAll(",","");	
//             const balance  = $("td [name=balance]", this).val().replaceAll(",","");	
           
//             let temp = {
//                 paymentRequestID,
//                 chartOfAccountID,
//                 accountCode,
//                 accountName,
//                 debit,
//                 credit,
//                 balance
//             };

//             formData.append(`items[${i}][paymentRequestID]`, paymentRequestID);
//             formData.append(`items[${i}][chartOfAccountID]`, chartOfAccountID);
//             formData.append(`items[${i}][accountCode]`, accountCode);
//             formData.append(`items[${i}][accountName]`, accountName);
//             formData.append(`items[${i}][debit]`, debit);
//             formData.append(`items[${i}][credit]`, credit);
//             formData.append(`items[${i}][balance]`, balance);
           

//             data["items"].push(temp);
//         });
//     } 

    

//     return isObject ? data : formData;
// }
// // ----- END GET INVENTORY RECEIVING DATA -----


// // ----- OPEN ADD FORM -----
// $(document).on("click", "#btnAdd", function () {
//     pageContent(true);
//     updateURL(null, true);
// });
// // ----- END OPEN ADD FORM -----


// // ----- OPEN EDIT FORM -----
// $(document).on("click", ".btnEdit", function () {
//     const id = $(this).attr("id");
//     viewDocument(id);
// });
// // ----- END OPEN EDIT FORM -----


// ----- VIEW DOCUMENT -----
$(document).on("click", ".btnView", function () {
    const id = $(this).attr("id");
    window.open(`${base_url}ims/inventory_validation?view_id=${id}`);
});
// ----- END VIEW DOCUMENT -----


// // ----- VIEW DOCUMENT -----
// $(document).on("click", "#btnRevise", function () {
//     const id = $(this).attr("voucherID");
//     viewDocument(id, false, true);
// });
// // ----- END VIEW DOCUMENT -----

// // ----- SUBMIT DOCUMENT -----
// $(document).on("click", ".btnRelease", function () {
//     const salaryReleaseID       = decryptString($(this).attr("id"));
//     const payrollID       = decryptString($(this).attr("payrollID"));
//     const payrollItemID       = decryptString($(this).attr("payrollItemID"));
//     const monthID   = decryptString($(this).attr("monthID"));
//     const monthDetailsID    = decryptString($(this).attr("monthDetailsID"));
//     let method = "submit";
//     let formData = new FormData;
//     formData.append("employeeID", sessionID);
//     formData.append("salaryReleaseID", salaryReleaseID || null);
//     formData.append("payrollID", payrollID || null);
//     formData.append("payrollItemID", payrollItemID || null);
//     formData.append("monthID", monthID || null);
//     formData.append("monthDetailsID", monthDetailsID || null);
   

   
//         const confirmation = getConfirmation(method);
//         confirmation.then(res => {
//             if (res.isConfirmed) {
//                 $.ajax({
//                     method:      "POST",
//                     url:         `salary_release/updateStatus`,
//                     data:formData,
//                     processData: false,
//                     contentType: false,
//                     global:      false,
//                     cache:       false,
//                     async:       false,
//                     dataType:    "json",
//                     beforeSend: function() {
//                         $("#loader").show();
//                     },
//                     success: function(data) {
//                         let result = data.split("|");
        
//                         let isSuccess   = result[0];
//                         let message     = result[1];
//                         let insertedID  = result[2];
//                         let dateCreated = result[3];
    
//                         let swalTitle;
//                         if (method == "submit") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} released successfully!`;
//                         } else if (method == "save") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} saved successfully!`;
//                         } else if (method == "cancelform") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} cancelled successfully!`;
//                         } else if (method == "approve") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} approved successfully!`;
//                         } else if (method == "deny") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} denied successfully!`;
//                         } else if (method == "drop") {
//                             swalTitle = `${getFormCode("SRL", dateCreated, insertedID)} dropped successfully!`;
//                         }	
        
//                         if (isSuccess == "true") {
//                             setTimeout(() => {
//                                 $("#loader").hide();
//                                 closeModals();
//                                 Swal.fire({
//                                     icon:              "success",
//                                     title:             swalTitle,
//                                     showConfirmButton: false,
//                                     timer:             2000,
//                                 });
//                                 myFormsContent();
//                             }, 500);
    
    
//                         } else {
//                             setTimeout(() => {
//                                 $("#loader").hide();
//                                 Swal.fire({
//                                     icon:              "danger",
//                                     title:             message,
//                                     showConfirmButton: false,
//                                     timer:             2000,
//                                 });
//                             }, 500);
//                         }
    
                        
//                     },
//                     error: function() {
//                         setTimeout(() => {
//                             $("#loader").hide();
//                             showNotification("danger", "System error: Please contact the system administrator for assistance!");
//                         }, 500);
//                     }
//                 }).done(function() {
//                     setTimeout(() => {
//                         $("#loader").hide();
//                     }, 500);
//                 })
//             }
//             //  else {
//             //     if (res.dismiss === "cancel" && method != "submit") {
//             //         if (method != "deny") {
//             //             if (method != "cancelform") {
//             //                 true && callback();
//             //             }
//             //         } else {
//             //             $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
//             //         }
//             //     } else if (res.isDismissed) {
//             //         if (method == "deny") {
//             //             $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
//             //         }
//             //     }
//             // }
//         });
    
        
    
// });
// // ----- END SUBMIT DOCUMENT -----

// --------- MODAL FOR LOGS --------//
// $(document).on("click", "#btnLog", function () {

//     const id       = $(this).attr("salaryReleaseID");
//     const feedback = $(this).attr("code") || getFormCode("CV", dateToday(), id);

//     $("#modal_inventory_receiving_content").html(preloader);
//     $("#modal_inventory_receiving .page-title").text("SALARY RELEASED LOGS");
//     $("#modal_inventory_receiving").modal("show");

//     let logData = getTableData(
//         `hris_salary_release_log_tbl AS isrt 
//         LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)`,
//         `isrt.*, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,employeeStatus,
//         CASE
//         WHEN isrt.payrollID = 0 THEN monthCode
//         WHEN isrt.payrollID =! 0 THEN CONCAT('PAY-',LPAD(isrt.payrollID,3,'0')) 
//         END AS referenceCode,
//         concat('SRL-',SUBSTR(isrt.createdAt,3,2),'-',LPAD(isrt.salaryReleaseID,5,'0')) AS salaryReleaseCode`,
//         ``,
//         `salaryReleaseLogID DESC`
//     );

//     let html =` <div class="card stats-box" style="height: 474px;
//     max-height: 405px;
//     overflow-y: auto;">

//         <div class="card-body" style="height: 400px;
//                 overflow-y: auto;">`;

//     logData.map((item) => {
//         let {
//             fullname,
//             salaryReleaseID,
//             salaryReleaseCode,
//             payrollID,
//             referenceCode,
//             payrollItemID,
//             employeeID,
//             employeeStatus,
//             payrollHoldStatus,
//             netPay,
//             dateRelease,
//             action,
//             createdAt
//         } = item;
//         let dateCreated   = moment(createdAt).format("dddd, MMMM DD, YYYY");
//         let dateReleased   = moment(dateRelease).format("dddd MMMM DD, YYYY");
//         let timeCreated   = moment(createdAt).format("LT");
//         let timeReleased   = moment(dateRelease).format("LT");

//         html +=`<div class="timeline-item blue pb-1" date-is="${payrollHoldStatus == 9 ? dateReleased : dateCreated}">
//                 <h5>${salaryReleaseCode}</h5>
//                 <small>${action == "insert" ? `Inserted document` : `Released Document`} |</small>
//                 <small>${payrollHoldStatus == 9 ? timeReleased : timeCreated}</small>
//             </div>`;

//     });

//     if(logData.length <=0){
//         html +=`<div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column">
//         <img src="http://localhost/erpsys/assets/modal/no-data.gif" style="max-width: 300px;
//             width: auto;
//             min-width: 100px;
//             height: auto;" alt="No history yet.">
//         <span class="font-weight-bold">No history yet.</span>
//     </div>`
//     }


    
            
        
//     html +=`
//         </div>
//     </div>`;

//     setTimeout(() => {

        
//     $("#modal_inventory_receiving_content").html(html);
//         initDataTables();
//         return html;
//     }, 300);
// });
// --------- MODAL FOR LOGS --------//


// // ----- SAVE CLOSE FORM -----
// $(document).on("click", "#btnBack", function () {
//     const id         = $(this).attr("voucherID");
//     const isFromCancelledDocument = $(this).attr("cancel") == "true";
//     const revise     = $(this).attr("revise") == "true";
//     const employeeID = $(this).attr("employeeID");
//     const feedback   = $(this).attr("code") || getFormCode("CV", dateToday(), id);
//     const status     = $(this).attr("status");

//     if (status != "false" && status != 0) {
        
//         if (revise) {
//             // const action = revise && "insert" || (id && feedback ? "update" : "insert");
//             const action = revise && !isFromCancelledDocument && "insert" || (id ? "update" : "insert");
//             const data   = getInventoryReceivingData(action, "save", "0", id);
//             data["voucherStatus"]   = 0;
//             data.append("voucherStatus", 0);
//             // data["revisevoucherID"] = id;
//             // delete data["voucherID"];

//             if (!isFromCancelledDocument) {
//                 data.append("revisevoucherID", id);
//                 data.delete("voucherID");
//             } else {
//                 data.append("voucherID", id);
//                 data.delete("action");
//                 data.append("action", "update");
//             }

//             saveInventoryReceiving(data, "save", null, pageContent);
//         } else {
//             $("#page_content").html(preloader);
//             pageContent();

//             if (employeeID != sessionID) {
//                 $("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
//             }
//         }

//     } else {
//         const action = id && feedback ? "update" : "insert";
//         const data   = getInventoryReceivingData(action, "save", "0", id);
//         data["voucherStatus"] = 0;
//         data.append("voucherStatus", 0);

//         saveInventoryReceiving(data, "save", null, pageContent);
//     }
// });
// // ----- END SAVE CLOSE FORM -----


// // ----- SAVE DOCUMENT -----
// $(document).on("click", "#btnSave, #btnCancel", function () {
//     let receivedCondition = $("[name=received]").hasClass("is-invalid");
//     let serialNumberCondition = $("[name=serialNumber]").hasClass("is-invalid");
//     if(!receivedCondition && !serialNumberCondition){

//         const id       = $(this).attr("voucherID");
//         const isFromCancelledDocument = $(this).attr("cancel") == "true";
//         const revise   = $(this).attr("revise") == "true";
//         const feedback = $(this).attr("code") || getFormCode("CV", dateToday(), id);
//         const action   = revise && "insert" || (id && feedback ? "update" : "insert");
//         const data     = getInventoryReceivingData(action, "save", "0", id);
//         // data["voucherStatus"] = 0;
//         data.append("voucherStatus", 0);
        
//         if (revise) {
//             // data["revisevoucherID"] = id;
//             // delete data["voucherID"];

//             // if (!isFromCancelledDocument) {
//             //     data["revisevoucherID"] = id;
//             //     delete data["voucherID"];
//             // } else {
//             //     delete data["voucherID"];
//             //     delete data["action"];
//             //     data["action"] = update;
//             // }

//             if (!isFromCancelledDocument) {
//                 data.append("revisevoucherID", id);
//                 data.delete("voucherID");
//             } else {
//                 data.append("voucherID", id);
//                 data.delete("action");
//                 data.append("action", "update");
//             }
//         }

//         saveInventoryReceiving(data, "save", null, pageContent);
//     }else{
//         $("[name=received]").focus();
//         $("[name=serialNumber]").focus();
//     }
    
// });
// // ----- END SAVE DOCUMENT -----


// // ----- REMOVE IS-VALID IN TABLE -----
// function removeIsValid(element = "table") {
//     $(element).find(".validated,.is-valid, .no-error").removeClass("validated")
//     .removeClass("is-valid").removeClass("no-error");
// }
// // ----- END REMOVE IS-VALID IN TABLE -----




// // ----- SUBMIT DOCUMENT -----
// $(document).on("click", "#btnSubmit", function () {

//             var debitValidate = $("[name=debit]").hasClass("is-invalid");
//             var creditValidate = $("[name=credit]").hasClass("is-invalid");

//             if(!debitValidate && !creditValidate){

//                 const validate       = validateForm("page_content");
//                 removeIsValid("#tableInventoryReceivingItems");
//                if(validate){
                   
                   
   
//                    const id             = $(this).attr("voucherID");
//                    const revise         = $(this).attr("revise") == "true";
//                    const action = revise && "insert" || (id ? "update" : "insert");
//                    const data   = getInventoryReceivingData(action, "submit", "1", id);
       

//                    if (revise) {
//                     data.append("revisevoucherID", id);
//                     data.delete("voucherID");
//                     }

//                     let approversID = "", approversDate = "";
//                     for (var i of data) {
//                         if (i[0] == "approversID")   approversID   = i[1];
//                         if (i[0] == "approversDate") approversDate = i[1];
//                     }

//                 //    if (revise) {
//                 //        data["revisevoucherID"] = id;
//                 //        delete data["voucherID"];
//                 //    }
                   
       
//                 //    let approversID   = data["approversID"], 
//                 //        approversDate = data["approversDate"];
       
//                    const employeeID = getNotificationEmployeeID(approversID, approversDate, true);
//                    let notificationData = false;
//                    if (employeeID != sessionID) {
//                        notificationData = {
//                            moduleID:                67,
//                            notificationTitle:       "Check Voucher",
//                            notificationDescription: `${employeeFullname(sessionID)} asked for your approval.`,
//                            notificationType:        2,
//                            employeeID,
//                        };
//                    }
       
//                    saveInventoryReceiving(data, "submit", notificationData, pageContent);
//                }
                
//             }else{
//                 $(".is-invalid").focus(); 
//             }
// });
// // ----- END SUBMIT DOCUMENT -----


// // ----- CANCEL DOCUMENT -----
// $(document).on("click", "#btnCancelForm", function () {
//     const id     = $(this).attr("voucherID");
//     const status = $(this).attr("status");
//     const action = "update";
//     const data   = getInventoryReceivingData(action, "cancelform", "4", id, status);

//     saveInventoryReceiving(data, "cancelform", null, pageContent);
// });
// // ----- END CANCEL DOCUMENT -----


// // ----- APPROVE DOCUMENT -----
// $(document).on("click", "#btnApprove", function () {
//     const id       = decryptString($(this).attr("voucherID"));
//     const feedback = $(this).attr("code") || getFormCode("CV", dateToday(), id);
//     let tableData  = getTableData("fms_check_voucher_tbl", "", "voucherID = " + id);

//     if (tableData) {
//         let approversID     = tableData[0].approversID;
//         let approversStatus = tableData[0].approversStatus;
//         let approversDate   = tableData[0].approversDate;
//         let employeeID      = tableData[0].employeeID;
//         let createdAt       = tableData[0].createdAt;

//         let data = getInventoryReceivingData("update", "approve", "2", id);
//         data["approversStatus"] = updateApproveStatus(approversStatus, 2);
//         data.append("approversStatus", updateApproveStatus(approversStatus, 2));
//         let dateApproved = updateApproveDate(approversDate)
//         data["approversDate"] = dateApproved;
//         data.append("approversDate", dateApproved);
//         let status, notificationData,lastApproveCondition = false;
//         if (isImLastApprover(approversID, approversDate)) {
//             status = 2;
//             notificationData = {
//                 moduleID:                67,
//                 tableID:                 id,
//                 notificationTitle:       "Check Voucher",
//                 notificationDescription: `${feedback}: Your request has been approved.`,
//                 notificationType:        7,
//                 employeeID,
//             };

//             lastApproveCondition = true;
//         } else {
//             status = 1;
//             notificationData = {
//                 moduleID:                67,
//                 tableID:                 id,
//                 notificationTitle:       "Check Voucher",
//                 notificationDescription: `${employeeFullname(employeeID)} asked for your approval.`,
//                 notificationType:         2,
//                 employeeID:               getNotificationEmployeeID(approversID, dateApproved),
//             };
//         }

//         data["voucherStatus"] = status;
//         data.append("voucherStatus", status);
//         saveInventoryReceiving(data, "approve", notificationData, pageContent,lastApproveCondition);
//     }
// });
// // ----- END APPROVE DOCUMENT -----


// // ----- REJECT DOCUMENT -----
// $(document).on("click", "#btnReject", function () {

//     const id       = $(this).attr("voucherID");
//     const feedback = $(this).attr("code") || getFormCode("CV", dateToday(), id);

//     $("#modal_inventory_receiving_content").html(preloader);
//     $("#modal_inventory_receiving .page-title").text("DENY CHECK VOUCHER");
//     $("#modal_inventory_receiving").modal("show");
//     let html = `
//     <div class="modal-body">
//         <div class="form-group">
//             <label>Remarks <code>*</code></label>
//             <textarea class="form-control validate"
//                 data-allowcharacters="[0-9][a-z][A-Z][ ][.][,][_]['][()][?][-][/]"
//                 minlength="2"
//                 maxlength="250"
//                 id="voucherRemarks"
//                 name="voucherRemarks"
//                 rows="4"
//                 style="resize: none"
//                 required></textarea>
//             <div class="d-block invalid-feedback" id="invalid-voucherRemarks"></div>
//         </div>
//     </div>
//     <div class="modal-footer text-right">
//         <button class="btn btn-danger px-5 p-2" id="btnRejectConfirmation"
//         voucherID="${id}"
//         code="${feedback}"><i class="far fa-times-circle"></i> Deny</button>
//         <button class="btn btn-cancel px-5 p-2" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel</button>
//     </div>`;
//     $("#modal_inventory_receiving_content").html(html);
// });

// $(document).on("click", "#btnRejectConfirmation", function () {
//     const id       = decryptString($(this).attr("voucherID"));
//     const feedback = $(this).attr("code") || getFormCode("CV", dateToday(), id);

//     const validate = validateForm("modal_inventory_receiving");
//     if (validate) {
//         let tableData = getTableData("fms_check_voucher_tbl", "", "voucherID = " + id);
//         if (tableData) {
//             let approversStatus = tableData[0].approversStatus;
//             let approversDate   = tableData[0].approversDate;
//             let employeeID      = tableData[0].employeeID;

//             // let data = {};
//             // data["action"] = "update";
//             // data["method"] = "deny";
//             // data["voucherID"] = id;
//             // data["approversStatus"] = updateApproveStatus(approversStatus, 3);
//             // data["approversDate"]   = updateApproveDate(approversDate);
//             // data["voucherRemarks"] = $("[name=voucherRemarks]").val()?.trim();
//             // data["updatedBy"] = sessionID;

//             let data = new FormData;
//             data.append("action", "update");
//             data.append("method", "deny");
//             data.append("voucherID", id);
//             data.append("approversStatus", updateApproveStatus(approversStatus, 3));
//             data.append("approversDate", updateApproveDate(approversDate));
//             data.append("voucherRemarks", $("[name=voucherRemarks]").val()?.trim());
//             data.append("updatedBy", sessionID);

//             let notificationData = {
//                 moduleID:                67,
//                 tableID: 				 id,
//                 notificationTitle:       "Check Voucher",
//                 notificationDescription: `${feedback}: Your request has been denied.`,
//                 notificationType:        1,
//                 employeeID,
//             };

//             saveInventoryReceiving(data, "deny", notificationData, pageContent);
//             $("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click");
//         } 
//     } 
// });
// // ----- END REJECT DOCUMENT -----

// // ----- DROP DOCUMENT -----
// $(document).on("click", "#btnDrop", function() {
//     const voucherID = decryptString($(this).attr("voucherID"));
//     const feedback          = $(this).attr("code") || getFormCode("TR", dateToday(), id);

//     const id = decryptString($(this).attr("voucherID"));
//     let data = new FormData;
//     data.append("voucherID", voucherID);
//     data.append("action", "update");
//     data.append("method", "drop");
//     data.append("updatedBy", sessionID);

//     saveInventoryReceiving(data, "drop", null, pageContent);
// })
// // ----- END DROP DOCUMENT -----


// ----- NAV LINK -----
$(document).on("click", ".nav-link", function () {
    const tab = $(this).attr("href");
    if (tab == "#forApprovalTab") {
        forApprovalContent();
    }
    if (tab == "#myFormsTab") {
        myFormsContent();
    }
});
// ----- END NAV LINK -----


// // ----- APPROVER STATUS -----
// function getApproversStatus(approversID, approversStatus, approversDate) {
//     let html = "";
//     if (approversID) {
//         let idArr = approversID.split("|");
//         let statusArr = approversStatus ? approversStatus.split("|") : [];
//         let dateArr = approversDate ? approversDate.split("|") : [];
//         html += `<div class="row mt-4">`;

//         idArr && idArr.map((item, index) => {
//             let date   = dateArr[index] ? moment(dateArr[index]).format("MMMM DD, YYYY hh:mm:ss A") : "";
//             let status = statusArr[index] ? statusArr[index] : "";
//             let statusBadge = "";
//             if (date && status) {
//                 if (status == 2) {
//                     statusBadge = `<span class="badge badge-info">Approved - ${date}</span>`;
//                 } else if (status == 3) {
//                     statusBadge = `<span class="badge badge-danger">Denied - ${date}</span>`;
//                 }
//             }

//             html += `
//             <div class="col-xl-3 col-lg-3 col-md-4 col-sm-12">
//                 <div class="d-flex justify-content-start align-items-center">
//                     <span class="font-weight-bold">
//                         ${employeeFullname(item)}
//                     </span>
//                     <small>&nbsp;- Level ${index + 1} Approver</small>
//                 </div>
//                 ${statusBadge}
//             </div>`;
//         });
//         html += `</div>`;
//     }
//     return html;
// }
// // ----- END APPROVER STATUS --
})      


// // --------------- DATABASE RELATION ---------------
// function getConfirmation(method = "submit") {
// const title = "Salary Release";
// let swalText, swalImg;

// $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("hide");

// switch (method) {
//     case "save":
//         swalTitle = `SAVE ${title.toUpperCase()}`;
//         swalText  = "Are you sure to save this document?";
//         swalImg   = `${base_url}assets/modal/draft.svg`;
//         break;
//     case "submit":
//         swalTitle = `${title.toUpperCase()}`;
//         swalText  = "Are you sure to release this document?";
//         swalImg   = `${base_url}assets/modal/add.svg`;
//         break;
//     case "approve":
//         swalTitle = `APPROVE ${title.toUpperCase()}`;
//         swalText  = "Are you sure to approve this document?";
//         swalImg   = `${base_url}assets/modal/approve.svg`;
//         break;
//     case "deny":
//         swalTitle = `DENY ${title.toUpperCase()}`;
//         swalText  = "Are you sure to deny this document?";
//         swalImg   = `${base_url}assets/modal/reject.svg`;
//         break;
//     case "cancelform":
//         swalTitle = `CANCEL ${title.toUpperCase()}`;
//         swalText  = "Are you sure to cancel this document?";
//         swalImg   = `${base_url}assets/modal/cancel.svg`;
//         break;
//     case "drop":
//         swalTitle = `DROP ${title.toUpperCase()}`;
//         swalText  = "Are you sure to drop this document?";
//         swalImg   = `${base_url}assets/modal/drop.svg`;
//         break;
//     default:
//         swalTitle = `CANCEL ${title.toUpperCase()}`;
//         swalText  = "Are you sure that you want to cancel this process?";
//         swalImg   = `${base_url}assets/modal/cancel.svg`;
//         break;
// }
// return Swal.fire({
//     title:              swalTitle,
//     text:               swalText,
//     imageUrl:           swalImg,
//     imageWidth:         200,
//     imageHeight:        200,
//     imageAlt:           "Custom image",
//     showCancelButton:   true,
//     confirmButtonColor: "#dc3545",
//     cancelButtonColor:  "#1a1a1a",
//     cancelButtonText:   "No",
//     confirmButtonText:  "Yes"
// })
// }

// function saveInventoryReceiving(data = null, method = "submit", notificationData = null, callback = null,lastApproveCondition =false) {

// // data.lastApproveCondition = lastApproveCondition; // inserting object in data object parameter
//     // console.log(data);
//     // return false;
// if (data) {
//     const confirmation = getConfirmation(method);
//     confirmation.then(res => {
//         if (res.isConfirmed) {
//             $.ajax({
//                 method:      "POST",
//                 url:         `Check_voucher/saveCheckVoucher`,
//                 data,
//                 processData: false,
//                 contentType: false,
//                 global:      false,
//                 cache:       false,
//                 async:       false,
//                 dataType:    "json",
//                 beforeSend: function() {
//                     $("#loader").show();
//                 },
//                 success: function(data) {
//                     let result = data.split("|");
    
//                     let isSuccess   = result[0];
//                     let message     = result[1];
//                     let insertedID  = result[2];
//                     let dateCreated = result[3];

//                     let swalTitle;
//                     if (method == "submit") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} submitted successfully!`;
//                     } else if (method == "save") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} saved successfully!`;
//                     } else if (method == "cancelform") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} cancelled successfully!`;
//                     } else if (method == "approve") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} approved successfully!`;
//                     } else if (method == "deny") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} denied successfully!`;
//                     } else if (method == "drop") {
//                         swalTitle = `${getFormCode("CV", dateCreated, insertedID)} dropped successfully!`;
//                     }	
    
//                     if (isSuccess == "true") {
//                         setTimeout(() => {
//                             $("#loader").hide();
//                             closeModals();
//                             Swal.fire({
//                                 icon:              "success",
//                                 title:             swalTitle,
//                                 showConfirmButton: false,
//                                 timer:             2000,
//                             });
//                             callback && callback();

//                             if (method == "approve" || method == "deny") {
//                                 $("[redirect=forApprovalTab]").length > 0 && $("[redirect=forApprovalTab]").trigger("click")
//                             }

//                             // ----- SAVE NOTIFICATION -----
//                             if (notificationData) {
//                                 if (Object.keys(notificationData).includes("tableID")) {
//                                     insertNotificationData(notificationData);
//                                 } else {
//                                     notificationData["tableID"] = insertedID;
//                                     insertNotificationData(notificationData);
//                                 }
//                             }
//                             // ----- END SAVE NOTIFICATION -----
//                         }, 500);


//                     } else {
//                         setTimeout(() => {
//                             $("#loader").hide();
//                             Swal.fire({
//                                 icon:              "danger",
//                                 title:             message,
//                                 showConfirmButton: false,
//                                 timer:             2000,
//                             });
//                         }, 500);
//                     }

                    
//                 },
//                 error: function() {
//                     setTimeout(() => {
//                         $("#loader").hide();
//                         showNotification("danger", "System error: Please contact the system administrator for assistance!");
//                     }, 500);
//                 }
//             }).done(function() {
//                 setTimeout(() => {
//                     $("#loader").hide();
//                 }, 500);
//             })
//         } else {
//             if (res.dismiss === "cancel" && method != "submit") {
//                 if (method != "deny") {
//                     if (method != "cancelform") {
//                         callback && callback();
//                     }
//                 } else {
//                     $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
//                 }
//             } else if (res.isDismissed) {
//                 if (method == "deny") {
//                     $("#modal_inventory_receiving").text().length > 0 && $("#modal_inventory_receiving").modal("show");
//                 }
//             }
//         }
//     });

    
// }
// return false;
// }

// --------------- END DATABASE RELATION ---------------//