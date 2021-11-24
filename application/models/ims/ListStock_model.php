<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ListStock_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function getListStock($classificationID, $categoryID){
        
       
        if($classificationID =="0"){
            $where ='';
        }else{
            $where = "WHERE iii.classificationID = '$classificationID' AND";
        }
        if($categoryID =="0"){
            $AND = "";
        }else{
            $AND  = "iii.categoryID ='$categoryID'";
        }
        $sqlItem = $this->db->query("SELECT  itemID, itemCode, brand, itemName, classificationName, categoryName, uom, stockIN, stockOut, totalStockOut,
                                    Unused,reservedItem, materiaWithdrawalQuantity, ROUND(reserved,2) AS reserved, IF(ROUND(available,2) <0,0,ROUND(available,2))  AS available,
                                    ROUND(reOrderLevel,2) AS reOrderLevel,ROUND((available  + IFNULL(reOrderLevel,0)),2) AS totalQuantity
                                    FROM
                                    (
                                        SELECT i.itemID, i.itemCode, brand, i.itemName, classificationName, categoryName, uom, ROUND(stockIN,2) AS stockIN,
                                        ROUND(IF((SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID),
                                        IFNULL(
                                        IF((SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID) >  Unused,
                                        (SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID) -  Unused,
                                        Unused - (SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID)),0),Unused - 0) ,2) AS Unused, 
                                        
                                        
                                        ROUND(reservedItem,2) AS reservedItem, ROUND(materiaWithdrawalQuantity - Unused,2)  AS materiaWithdrawalQuantity, 
                                        ROUND(stockOut,2) AS stockOut,(stockOut - materiaWithdrawalQuantity) totalStockOut,
                                        CASE WHEN stockOut <>0 THEN (IF((reservedItem - stockOut)<0, 0,reservedItem - stockOut))
                                        ELSE reservedItem END reserved,
                                        IFNULL(iii.reOrderLevel,0) AS reOrderLevel,
                                        (stockIN  - IFNULL(reOrderLevel,0) -materiaWithdrawalQuantity  - IF((materiaWithdrawalQuantity - Unused)>0,0,IF(stockOut = 0 ,reservedItem, IF(reservedItem = stockOut,stockOut,reservedItem - stockOut))) ) AS available

                                       
                                        FROM
                                        (
                                            SELECT itemID, itemCode, brand, itemName, classificationName, categoryName, uom, IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(stockOut),0) AS stockOut,
                                            IFNULL(SUM(Unused),0) AS Unused,
                                            IFNULL(SUM(reservedItem),0) AS reservedItem, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
                                            FROM
                                            (
                                                SELECT 
                                                sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                sii.classificationName, sii.categoryName,
                                                sii.uom,  SUM(sii.quantityForStockin) AS stockIN, -- Stock In Quantity
                                                0 AS stockOut,
                                                0 AS Unused,
                                                0 AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_stock_in_item_tbl AS sii
                                                WHERE  (sii.inventoryReceivingID <>0 OR sii.materialUsageID <>0) AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL
                                                GROUP BY sii.itemID
                                                -- Get Stock In Quantity in Stock In Item Table
                                                UNION ALL

                                                SELECT 
                                                sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                sii.classificationName, sii.categoryName,
                                                sii.uom,  0 AS stockIN,
                                                SUM(sii.quantity) AS stockOut, -- Stock Out Quantity
                                                0 AS Unused,
                                                0 AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_stock_in_item_tbl AS sii
                                                WHERE sii.stockOutID <>0  AND sii.stockOutDate IS NOT NULL
                                                GROUP BY sii.itemID
                                                -- Get Stock Out Quantity in Stock In Item Table 
                                                UNION ALL

                                                -- SELECT 
                                                -- sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                -- sii.classificationName, sii.categoryName,
                                                -- sii.uom,  0 AS stockIN,
                                                -- 0 AS stockOut,
                                                -- SUM(sii.quantity) AS Unused, -- Unused Quantity
                                                -- 0 AS reservedItem,
                                                -- 0 AS materiaWithdrawalQuantity
                                                -- FROM  ims_stock_in_item_tbl AS sii
                                                -- WHERE sii.materialUsageID <>0 
                                                -- GROUP BY sii.itemID

                                                -- EDITED BY CHARLES Novemeber 19, 2021
                                                -- SELECT 
                                                -- iird.itemID, iird.itemCode, iird.Brand as brand,iird.itemName,
                                                -- iird.classificationName, iird.categoryName,
                                                -- iird.uom,  0 AS stockIN,
                                                -- 0 AS stockOut,
                                                -- SUM(iird.unused) AS Unused, -- Unused Quantity
                                                -- 0 AS reservedItem,
                                                -- 0 AS materiaWithdrawalQuantity
                                                -- FROM  ims_inventory_request_details_tbl AS iird
                                                -- LEFT JOIN ims_material_usage_tbl AS imu 
                                                -- ON  imu.materialUsageID = iird.materialUsageID
                                                -- WHERE iird.materialUsageID <>0 AND
                                                -- materialUsageStatus = 2
                                                -- GROUP BY iird.itemID
                                                
                                                -- -- Get Unused Quantity in Stock In Item Table 
                                                -- UNION ALL

                                                SELECT 
                                                sii.itemID, itemCode AS itemCode, itemBrandName AS brand,  itemName AS itemName,
                                                itemClassification AS classificationName, itemCategory AS categoryName,
                                                itemUom AS uom,  0 AS stockIN,
                                                0 AS stockOut,
                                                0  Unused,
                                                SUM(sii.requestQuantity) AS reservedItem, -- Reserved Item
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_request_items_tbl AS sii
                                                LEFT JOIN ims_inventory_validation_tbl AS iiv ON  sii.inventoryValidationID = iiv.inventoryValidationID
                                                WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedItem IS NOT NULL
                                                GROUP BY sii.itemID
                                                -- Get Reserved Item in Request Item Table 
                                                UNION ALL

                                                SELECT 
                                                mww.itemID, 0 AS itemCode, 0 AS brand, 0 AS itemName,
                                                0 AS classificationName, 0 AS categoryName,
                                                0 AS uom,  0 AS stockIN,
                                                0 AS stockOut,
                                                0 AS Unused,
                                                0 AS reservedItem,
                                                SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
                                                FROM  ims_material_withdrawal_tbl AS mw
                                                LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
                                                WHERE  mw.inventoryItemStatus = 9 AND mww.itemID IS NOT NULL
                                                GROUP BY mww.itemID
                                                -- Get Withdrawn Quantity in Material Withdrawal Table 
                                            )w 
                                            WHERE w.itemCode IS NOT NULL
                                            GROUP BY itemID
                                        )i
                                        LEFT JOIN ims_inventory_item_tbl AS iii ON i.itemID = iii.itemID
                                        $where $AND
                                        GROUP BY itemID
                                    )l GROUP BY itemID");       
       
            $sqlAsset = $this->db->query("SELECT assetID, assetCode, brand, assetName, classificationName, categoryName, uom, totalequipmentBorrowing,
                                    stockIN,equipmentBorrowing, ROUND(Transferred,2) AS Transferred, returnQuantity, ROUND(disposed,2) AS disposed, reservedAsset,reserved,materiaWithdrawalQuantity,IF(ROUND(available,2) <0,0,ROUND(available,2))  AS available,
                                    ROUND(reOrderLevel,2) AS reOrderLevel, ROUND((available+ IFNULL(reOrderLevel,0) + reservedAsset),2) AS totalQuantity
                                    FROM
                                    (
                                    SELECT i.assetID, i.assetCode , brand, i.assetName, classificationName, categoryName, uom,stockIN,
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
                                    SELECT assetID, assetCode, brand, assetName, classificationName,categoryName,uom,
                                    IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(equipmentBorrowing),0) AS equipmentBorrowing,
                                    sum(Transferred) AS Transferred,
                                     SUM(returnQuantity) AS returnQuantity,
                                    IFNULL(SUM(disposed),0) AS disposed,IFNULL(SUM(reservedAsset),0) AS reservedAsset, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
                                    FROM
                                    (
                                        SELECT 
                                        sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        sii.classificationName, sii.categoryName,	sii.uom,  
                                        SUM(sii.quantityForStockin) AS stockIN, -- Stock In Quantity
                                        0 AS equipmentBorrowing,
                                        0 AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        0 AS reservedAsset,
                                        0 AS materiaWithdrawalQuantity
                                        FROM  ims_stock_in_assets_tbl AS sii
                                        WHERE   (sii.inventoryReceivingID <>0 OR sii.materialUsageID <>0)   AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL
                                        GROUP BY sii.assetID
                                        -- Get Stock In Quantity in  Stock In Assets Table
                                        UNION ALL

                                        SELECT 
                                        sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        sii.classificationName, sii.categoryName,	sii.uom,  
                                        0 AS stockIN,
                                        sum(quantity) AS equipmentBorrowing, -- Equipment Borrowing Request Quantity
                                        0 AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        0 AS reservedAsset,
                                        0 AS materiaWithdrawalQuantity
                                        FROM  ims_stock_in_assets_tbl AS sii
                                        WHERE  sii.equipmentBorrowingID <>0  AND  sii.stockOutDate IS NOT NULL
                                        GROUP BY sii.assetID
                                        -- Get Equipment Borrowing Request Quantity in Stock In Assets Table
                                        UNION ALL

                                        -- SELECT 
                                        -- sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        -- sii.classificationName, sii.categoryName,	sii.uom,  
                                        -- 0 AS stockIN,
                                        -- 0 AS equipmentBorrowing,
                                        -- SUM(quantity) AS returnQuantity, -- Return Quantity 
                                        -- 0 AS Transferred,
                                        -- '0.00'  AS disposed,
                                        -- 0 AS reservedAsset,
                                        -- 0 AS materiaWithdrawalQuantity
                                        -- FROM  ims_stock_in_assets_tbl AS sii
                                        -- WHERE  sii.returnItemID <>0  
                                        -- GROUP BY sii.assetID
                                        -- -- Get Return Quantity in Stock In Assets Table
                                        -- UNION ALL

                                        SELECT 
                                        sii.itemID as assetID, 			sii.itemCode as assetCode, 		sii.Brand as brand,		sii.itemName as assetName,
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
                                        idd.assetID, 			idd.assetCode, 		idd.brand,		idd.assetName,
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

                                        SELECT sii.assetID, 		assetCode AS assetCode, 	assetBrandName AS  brand,	assetBrandName AS assetName,
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
                                        mww.assetID, 0 AS assetCode, 0 AS brand, 0 AS assetName,
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
                                    $where $AND
                                    GROUP BY i.assetID
                                    )l GROUP BY assetID");        
            // return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
            return [
                "item"      => $sqlItem->result_array(),
                "assets"    => $sqlAsset->result_array()
            ];
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());

    }

    public function getTableInfo($id, $param = "item" ){
        $table  = $param == "item" ? "ims_inventory_item_tbl" : "ims_inventory_asset_tbl";
        $where  = $param == "item" ? "primaryTable.itemID = '$id'" : "primaryTable.assetID = '$id'";
        $sql    = "SELECT primaryTable.*, classificationName, categoryName   FROM $table AS primaryTable 
                        JOIN ims_inventory_classification_tbl AS iict ON primaryTable.classificationID  = iict.classificationID 
                        LEFT JOIN ims_inventory_category_tbl AS ict ON primaryTable.categoryID = ict.categoryID
        WHERE $where";
        $query  = $this->db->query($sql);

        return $query ? $query->row() : [];
    }

}    