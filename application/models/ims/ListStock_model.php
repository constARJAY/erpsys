<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ListStock_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function getListStock($classificationID, $categoryID){
        
       
        // if($classificationID =="0"){
        //     $where ='';
        // }else{
        //     $where = "WHERE iii.classificationID = '$classificationID' AND";
        // }
        // if($categoryID =="0"){
        //     $AND = "";
        // }else{
        //     $AND  = "iii.categoryID ='$categoryID'";
        // }
            // $sqlItem = $this->db->query("SELECT itemID, itemCode, brand, itemName, classificationName, categoryName, uom, stockIN, stockOut, totalStockOut,
            //                         Unused,reservedItem,reservedQTY , materiaWithdrawalQuantity, IF((materiaWithdrawalQuantity - reserved) < 0, 0, (materiaWithdrawalQuantity - reserved) ) AS reserved, 
            //                         ROUND(reOrderLevel,2) AS reOrderLevel,
            //                           ((stockIN - (stockOut + materiaWithdrawalQuantity)) - (reOrderLevel + reserved )) AS available,
                                        
            //                         ROUND( stockIN - (stockOut + materiaWithdrawalQuantity), 2) AS totalQuantity
                                    
            //                         FROM
            //                         (
            //                             SELECT i.itemID, i.itemCode, brand, i.itemName, classificationName, categoryName, uom, ROUND(stockIN,2) AS stockIN,
            //                             ROUND(IF((SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID),
            //                             IFNULL(
            //                             IF((SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID) >  Unused,
            //                             (SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID) -  Unused,
            //                             Unused - (SELECT SUM(stockUsedIn.quantity) AS UnusedStockIn  FROM ims_stock_in_item_tbl as stockUsedIn WHERE stockUsedIn.materialUsageID <>0 AND  stockUsedIn.stockOutDate = '0000-00-00' AND stockUsedIn.stockInDate IS NOT NULL AND itemID = i.itemID)),0),Unused - 0) ,2) AS Unused, 
                                        
                                        
            //                             ROUND(reservedItem,2) AS reservedItem, ROUND(materiaWithdrawalQuantity - Unused,2)  AS materiaWithdrawalQuantity, 

            //                             ROUND(stockOut,2) AS stockOut,  (stockOut - materiaWithdrawalQuantity) totalStockOut,
            //                             CASE WHEN stockOut <> 0 THEN (IF((reservedItem - stockOut)< 0, 0,reservedItem - stockOut))
            //                             ELSE reservedItem END reserved,
            //                             ROUND(reservedItem - stockOut, 2) AS reservedQTY, 
            //                             IFNULL(iii.reOrderLevel,0) AS reOrderLevel

                                       
            //                             FROM
            //                             (
            //                                 SELECT itemID, itemCode, brand, itemName, classificationName, categoryName, uom, IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(stockOut),0) AS stockOut,
            //                                 IFNULL(SUM(Unused),0) AS Unused,
            //                                 IFNULL(SUM(reservedItem),0) AS reservedItem, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
            //                                 FROM
            //                                 (
            //                                     SELECT 
            //                                     sii.itemID, sii.itemCode, sii.brand, sii.itemName,
            //                                     sii.classificationName, sii.categoryName,
            //                                     sii.uom,  SUM(sii.quantityForStockin) AS stockIN, -- Stock In Quantity
            //                                         0 AS stockOut,
            //                                         0 AS Unused,
            //                                         0 AS reservedItem,
            //                                         0 AS materiaWithdrawalQuantity
            //                                     FROM  ims_stock_in_item_tbl AS sii
            //                                     WHERE  (sii.inventoryReceivingID <> 0 OR sii.materialUsageID <> 0) AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL
            //                                     GROUP BY sii.itemID
            //                                     -- Get Stock In Quantity in Stock In Item Table
            //                                     UNION ALL

            //                                     SELECT 
            //                                     sii.itemID, sii.itemCode, sii.brand,sii.itemName,
            //                                     sii.classificationName, sii.categoryName,
            //                                     sii.uom,  0 AS stockIN,
            //                                     (
            //                                         IF(SUM(sii.quantity) 
            //                                                         - (
            //                                                              SELECT 
            //                                                                 SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            //                                                                 FROM  ims_material_withdrawal_tbl AS mw
            //                                                                 LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
            //                                                                 WHERE  mw.inventoryItemStatus = 9 AND mww.itemID = sii.itemID
            //                                                                 GROUP BY mww.itemID
            //                                                          ) < 0, 
            //                                                          (
            //                                                              SELECT 
            //                                                                 SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            //                                                                 FROM  ims_material_withdrawal_tbl AS mw
            //                                                                 LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
            //                                                                 WHERE  mw.inventoryItemStatus = 9 AND mww.itemID = sii.itemID
            //                                                                 GROUP BY mww.itemID
            //                                                          ) - SUM(sii.quantity) ,
            //                                                 (SUM(sii.quantity) 
            //                                                         - (
            //                                                              SELECT 
            //                                                                 SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            //                                                                 FROM  ims_material_withdrawal_tbl AS mw
            //                                                                 LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
            //                                                                 WHERE  mw.inventoryItemStatus = 9 AND mww.itemID = sii.itemID
            //                                                                 GROUP BY mww.itemID
            //                                                          ))
                                                    
            //                                     )
                                                    
            //                                         ) AS stockOut, -- Stock Out Quantity
            //                                     0 AS Unused,
            //                                     0 AS reservedItem,
            //                                     0 AS materiaWithdrawalQuantity
            //                                     FROM  ims_stock_in_item_tbl AS sii
            //                                     WHERE sii.stockOutID <> 0  AND sii.stockOutDate != '0000-00-00'
            //                                     GROUP BY sii.itemID
            //                                     -- Get Stock Out Quantity in Stock In Item Table 
            //                                     UNION ALL

            //                                     -- SELECT 
            //                                     -- sii.itemID, sii.itemCode, sii.brand,sii.itemName,
            //                                     -- sii.classificationName, sii.categoryName,
            //                                     -- sii.uom,  0 AS stockIN,
            //                                     -- 0 AS stockOut,
            //                                     -- SUM(sii.quantity) AS Unused, -- Unused Quantity
            //                                     -- 0 AS reservedItem,
            //                                     -- 0 AS materiaWithdrawalQuantity
            //                                     -- FROM  ims_stock_in_item_tbl AS sii
            //                                     -- WHERE sii.materialUsageID <>0 
            //                                     -- GROUP BY sii.itemID

            //                                     -- EDITED BY CHARLES Novemeber 19, 2021
            //                                     -- SELECT 
            //                                     -- iird.itemID, iird.itemCode, iird.Brand as brand,iird.itemName,
            //                                     -- iird.classificationName, iird.categoryName,
            //                                     -- iird.uom,  0 AS stockIN,
            //                                     -- 0 AS stockOut,
            //                                     -- SUM(iird.unused) AS Unused, -- Unused Quantity
            //                                     -- 0 AS reservedItem,
            //                                     -- 0 AS materiaWithdrawalQuantity
            //                                     -- FROM  ims_inventory_request_details_tbl AS iird
            //                                     -- LEFT JOIN ims_material_usage_tbl AS imu 
            //                                     -- ON  imu.materialUsageID = iird.materialUsageID
            //                                     -- WHERE iird.materialUsageID <>0 AND
            //                                     -- materialUsageStatus = 2
            //                                     -- GROUP BY iird.itemID
                                                
            //                                     -- -- Get Unused Quantity in Stock In Item Table 
            //                                     -- UNION ALL


            //                                     -- START RESERVE QTY BASED ON THE REQUEST --
            //                                         SELECT 
            //                                         sii.itemID, itemCode AS itemCode, itemBrandName AS brand,  itemName AS itemName,
            //                                         itemClassification AS classificationName, itemCategory AS categoryName,
            //                                         itemUom AS uom,  0 AS stockIN,
            //                                         0 AS stockOut,
            //                                         0  Unused,
            //                                         SUM(sii.requestQuantity) AS reservedItem, -- Reserved Item
            //                                         0 AS materiaWithdrawalQuantity
            //                                         FROM  ims_request_items_tbl AS sii
            //                                         LEFT JOIN ims_inventory_validation_tbl AS iiv ON  sii.inventoryValidationID = iiv.inventoryValidationID
            //                                         WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedItem IS NOT NULL
            //                                         GROUP BY sii.itemID
            //                                     -- END RESERVE QTY BASED ON THE REQUEST --

            //                                     -- Get Reserved Item in Request Item Table 
            //                                     UNION ALL

            //                                     SELECT 
            //                                     mww.itemID, 0 AS itemCode, 0 AS brand, 0 AS itemName,
            //                                     0 AS classificationName, 0 AS categoryName,
            //                                     0 AS uom,  0 AS stockIN,
            //                                     0 AS stockOut,
            //                                     0 AS Unused,
            //                                     0 AS reservedItem,
            //                                     SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            //                                     FROM  ims_material_withdrawal_tbl AS mw
            //                                     LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
            //                                     WHERE  mw.inventoryItemStatus = 9 AND mww.itemID IS NOT NULL
            //                                     GROUP BY mww.itemID
            //                                     -- Get Withdrawn Quantity in Material Withdrawal Table 
            //                                 )w 
            //                                 WHERE w.itemCode IS NOT NULL
            //                                 GROUP BY itemID
            //                             )i
            //                             LEFT JOIN ims_inventory_item_tbl AS iii ON i.itemID = iii.itemID
            //                             $where $AND
            //                             GROUP BY itemID
            //                         )l GROUP BY itemID");       
       
            // $sqlAsset = $this->db->query("SELECT assetID, assetCode, brand, assetName, classificationName, categoryName, uom, totalequipmentBorrowing,
            //                         stockIN,equipmentBorrowing, ROUND(Transferred,2) AS Transferred, returnQuantity, ROUND(disposed,2) AS disposed, reservedAsset,reserved,materiaWithdrawalQuantity,IF(ROUND(available,2) <0,0,ROUND(available,2))  AS available,
            //                         ROUND(reOrderLevel,2) AS reOrderLevel, ROUND((available+ IFNULL(reOrderLevel,0) + reservedAsset),2) AS totalQuantity
            //                         FROM
            //                         (
            //                         SELECT i.assetID, i.assetCode , brand, i.assetName, classificationName, categoryName, uom,stockIN,
            //                         ROUND(equipmentBorrowing,2) AS equipmentBorrowing,Transferred,

            //                         -- ROUND(IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),
            //                         --     (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),0) -  returnQuantity,2) AS returnQuantity, 
                                    

            //                         ROUND(IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID),
            //                             IFNULL(
            //                             IF((SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID) >  returnQuantity,
            //                             (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID) -  returnQuantity,
            //                             returnQuantity - (SELECT SUM(stockreturnedIn.quantity) AS reservedAssetStockIn  FROM ims_stock_in_assets_tbl as stockreturnedIn WHERE stockreturnedIn.materialUsageID <>0 AND  stockreturnedIn.stockOutDate = '0000-00-00' AND stockreturnedIn.stockInDate IS NOT NULL AND assetID = i.assetID)),0),returnQuantity - 0) ,2) AS returnQuantity, 
                                        
            //                         ROUND(disposed,2) as disposed,
            //                         reservedAsset, 
                                    
            //                         CASE WHEN equipmentBorrowing <>0 THEN (IF((reservedAsset - equipmentBorrowing)<0,0,reservedAsset - equipmentBorrowing))
            //                         ELSE reservedAsset END reserved,
                                    
            //                         ROUND(materiaWithdrawalQuantity  - returnQuantity,2)  AS materiaWithdrawalQuantity,
                                    

            //                         IFNULL(iii.reOrderLevel,0) AS reOrderLevel,
                                    
            //                         (IFNULL(equipmentBorrowing,2) - IFNULL(materiaWithdrawalQuantity,2)) totalequipmentBorrowing,

            //                         (stockIN - IFNULL(reOrderLevel,0) - materiaWithdrawalQuantity - returnQuantity - disposed - IF(equipmentBorrowing = 0,reservedAsset, IF(equipmentBorrowing = reservedAsset,equipmentBorrowing,reservedAsset - equipmentBorrowing))) AS available

            //                         FROM
            //                         (
            //                         SELECT assetID, assetCode, brand, assetName, classificationName,categoryName,uom,
            //                         IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(equipmentBorrowing),0) AS equipmentBorrowing,
            //                         sum(Transferred) AS Transferred,
            //                          SUM(returnQuantity) AS returnQuantity,
            //                         IFNULL(SUM(disposed),0) AS disposed,IFNULL(SUM(reservedAsset),0) AS reservedAsset, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
            //                         FROM
            //                         (
            //                             SELECT 
            //                                 sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
            //                                 sii.classificationName, sii.categoryName,	sii.uom,  
            //                                 SUM(sii.quantityForStockin) AS stockIN, -- Stock In Quantity
            //                                 0 AS equipmentBorrowing,
            //                                 0 AS returnQuantity,
            //                                 0 AS Transferred,
            //                                 '0.00'  AS disposed,
            //                                 0 AS reservedAsset,
            //                                 0 AS materiaWithdrawalQuantity
            //                             FROM  ims_stock_in_assets_tbl AS sii
            //                                 WHERE   (sii.inventoryReceivingID <> 0 OR sii.materialUsageID <>0)   AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL
            //                             GROUP BY sii.assetID
            //                             -- Get Stock In Quantity in  Stock In Assets Table
            //                             UNION ALL

            //                             SELECT 
            //                             sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
            //                             sii.classificationName, sii.categoryName,	sii.uom,  
            //                             0 AS stockIN,
            //                             sum(quantity) AS equipmentBorrowing, -- Equipment Borrowing Request Quantity
            //                             0 AS returnQuantity,
            //                             0 AS Transferred,
            //                             '0.00'  AS disposed,
            //                             0 AS reservedAsset,
            //                             0 AS materiaWithdrawalQuantity
            //                             FROM  ims_stock_in_assets_tbl AS sii
            //                             WHERE  sii.equipmentBorrowingID <>0  AND  sii.stockOutDate IS NOT NULL
            //                             GROUP BY sii.assetID
            //                             -- Get Equipment Borrowing Request Quantity in Stock In Assets Table
            //                             UNION ALL

            //                             -- SELECT 
            //                             -- sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
            //                             -- sii.classificationName, sii.categoryName,	sii.uom,  
            //                             -- 0 AS stockIN,
            //                             -- 0 AS equipmentBorrowing,
            //                             -- SUM(quantity) AS returnQuantity, -- Return Quantity 
            //                             -- 0 AS Transferred,
            //                             -- '0.00'  AS disposed,
            //                             -- 0 AS reservedAsset,
            //                             -- 0 AS materiaWithdrawalQuantity
            //                             -- FROM  ims_stock_in_assets_tbl AS sii
            //                             -- WHERE  sii.returnItemID <>0  
            //                             -- GROUP BY sii.assetID
            //                             -- -- Get Return Quantity in Stock In Assets Table
            //                             -- UNION ALL

            //                             SELECT 
            //                             sii.itemID as assetID, 			sii.itemCode as assetCode, 		sii.Brand as brand,		sii.itemName as assetName,
            //                             sii.classificationName, sii.categoryName,	sii.uom,  
            //                             0 AS stockIN,
            //                             0 AS equipmentBorrowing,
            //                             SUM(borrowedQuantity) AS equipmentBorrowing, -- Return Quantity 
            //                             0 AS Transferred,
            //                             '0.00'  AS disposed,
            //                             0 AS reservedAsset,
            //                             0 AS materiaWithdrawalQuantity
            //                             FROM  ims_inventory_request_details_tbl AS sii
            //                             LEFT JOIN ims_return_item_tbl AS returnHeader 
            //                             ON  returnHeader.returnItemID = sii.returnItemID
            //                             WHERE sii.returnItemID <>0   AND
            //                             returnHeader.returnItemStatus = 2
            //                             GROUP BY sii.returnItemID
            //                             -- Get Return Quantity in Stock In Assets Table
            //                             UNION ALL

            //                             SELECT 
            //                             idd.assetID, 			idd.assetCode, 		idd.brand,		idd.assetName,
            //                             idd.assetClassification as classificationName, idd.assetCategory as categoryName,	idd.unitOfMeasurement AS uom,  
            //                             0 AS stockIN,
            //                             0 AS equipmentBorrowing,
            //                             0 returnQuantity,
            //                             0 AS Transferred,
            //                             SUM(quantity)  AS disposed, -- Disposed Quantity
            //                             0 AS reservedAsset,
            //                             0 AS materiaWithdrawalQuantity
            //                             FROM  ims_inventory_disposal_details_tbl AS idd
            //                             LEFT JOIN ims_inventory_disposal_tbl AS  id ON idd.disposalID = id.disposalID
            //                             WHERE  id.disposalStatus =2  
            //                             GROUP BY idd.assetID
            //                             -- Get Disposed Quantity in  Inventory Disposal Details Table
            //                             UNION ALL

            //                             SELECT sii.assetID, 		assetCode AS assetCode, 	assetBrandName AS  brand,	assetBrandName AS assetName,
            //                             assetClassification AS classificationName, 	assetCategory as categoryName,	assetCategory AS  uom,  
            //                             0 AS stockIN,
            //                             0 AS equipmentBorrowing,
            //                             0 AS returnQuantity,
            //                             0 AS Transferred,
            //                             '0.00'  AS disposed,
            //                             SUM(sii.requestQuantity) AS reservedAsset, -- Reserved Asset
            //                             0 AS materiaWithdrawalQuantity
            //                             FROM  ims_request_assets_tbl AS sii
            //                             LEFT JOIN ims_inventory_validation_tbl AS iiv ON sii.inventoryValidationID = iiv.inventoryValidationID
            //                             WHERE  sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedAsset IS NOT NULL
            //                             GROUP BY sii.assetID
            //                             -- Get Reserved Asset in Request Asset Table 
            //                             UNION ALL

            //                             SELECT 
            //                             mww.assetID, 0 AS assetCode, 0 AS brand, 0 AS assetName,
            //                             0 AS classificationName, 0 AS categoryName,
            //                             0 AS uom,  0 AS stockIN,
            //                             0 AS equipmentBorrowing,
            //                             0 AS returnQuantity,
            //                             0 AS Transferred,
            //                             '0.00'  AS disposed,
            //                             0 AS reservedAsset,
            //                             SUM(mww.received) AS materiaWithdrawalQuantity  -- Withdrawn Quantity
            //                             FROM  ims_material_withdrawal_tbl AS mw
            //                             LEFT JOIN ims_material_withdrawal_asset_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID 
            //                             WHERE  mw.inventoryAssetStatus = 9 AND mww.assetID IS NOT NULL
            //                             GROUP BY mww.assetID
            //                             -- Get Withdrawn Quantity in Material Withdrawal Table 
            //                         ) w
            //                         WHERE w.assetCode IS NOT NULL
            //                         GROUP BY assetID
            //                         )i
            //                         LEFT JOIN ims_inventory_asset_tbl AS iii ON i.assetID = iii.assetID
            //                         $where $AND
            //                         GROUP BY i.assetID
            //                         )l GROUP BY assetID");        
            // return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
            
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());
        return [
            "item"      => $this->getListStockItems($classificationID, $categoryID),
            "assets"    => $this->getListStockAsset($classificationID, $categoryID)
        ];

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





    // GETTING LIST STOCKS ITEMS

    public function getListStockItems($classificationID, $categoryID){
        $operand                = $classificationID && $categoryID  ? "" : "AND";
        $validateOperand        = !$classificationID && !$categoryID ? "" : $operand;
        $whereClassification    = $classificationID ? "iiat.classificationID = '$classificationID'" : "" ;
        $whereCategory          = $categoryID ? "iiat.categoryID = '$categoryID'" : "";
        $where                  = $classificationID && $categoryID  ? "AND ".$operand.$whereClassification." AND ".$whereCategory : ($classificationID ? $whereClassification : $whereCategory);
        $sql    = "SELECT iiat.*, classificationName, categoryName FROM ims_inventory_item_tbl AS iiat LEFT JOIN ims_inventory_classification_tbl AS iict USING(classificationID) 
                    LEFT JOIN ims_inventory_category_tbl AS iicat ON iiat.categoryID = iicat.categoryID WHERE iiat.itemStatus = '1' $validateOperand $where";
        $query  = $this->db->query($sql);
        $returnData = [];
        foreach ($query->result_array() as $key => $value) {
            $itemID         = $value["itemID"];
            $reOrderLevel   = $value["reOrderLevel"];
            
            $tempStockIn    = floatval($this->getStockIn($itemID, "items"));
            $tempStockOut   = floatval($this->getStockOut($itemID, "items"));
            $tempReserved   = floatval($this->getReservedQuantity($itemID, "items"));
            $tempWithdrawn  = floatval($this->getWithdrawnQuantity($itemID, "items"));
            $tempUnused     = floatval($this->getUnusedQuantity($itemID));
            $tempReserved   = floatval($this->getReservedQuantity($itemID,"items"));
            
            $stockIn        = ($tempStockIn + $tempUnused) - $tempUnused;   
            $stockOut       = ($tempStockOut - $tempWithdrawn) < 0 ? 0 : ($tempStockOut - $tempWithdrawn);

            $reserved       = ($tempReserved - $tempWithdrawn) < 0 ? 0 : ($tempReserved - $tempWithdrawn); 
            $totalQTY       = $stockIn - $tempWithdrawn;
            $available      = $totalQTY - ($reserved +  $reOrderLevel);


            $temp = [
                "itemID"                    => $itemID,
                "itemCode"                  => $value["itemCode"],
                "itemName"                  => $value["itemName"],
                "uom"                       => $value["unitOfMeasurementID"],
                "classificationName"        => $value["classificationName"],
                "categoryName"              => $value["categoryName"],
                "brand"                     => $value["brandName"],
                "stockIN"                   => $stockIn,
                "stockOut"                  => $stockOut,
                "totalStockOut"             => $stockOut,
                "Unused"                    => $tempUnused,
                "materiaWithdrawalQuantity" => $tempWithdrawn,
                "reserved"                  => $reserved,
                "reservedItem"              => $reserved,
                "reOrderLevel"              => $reOrderLevel,
                "available"                 => $available,
                "totalQuantity"             => $available
            ];
            array_push($returnData, $temp);
        }

        return $returnData;
    }

    // GETTING LIST STOCKS ASSETS

    public function getListStockAsset($classificationID, $categoryID){
        $operand                = $classificationID && $categoryID  ? "" : "AND";
        $validateOperand        = !$classificationID && !$categoryID ? "" : $operand;
        $whereClassification    = $classificationID ? "iiat.classificationID = '$classificationID'" : "" ;
        $whereCategory          = $categoryID ? "iiat.categoryID = '$categoryID'" : "";
        $where                  = $classificationID && $categoryID  ? "AND ".$operand.$whereClassification." AND ".$whereCategory : ($classificationID ? $whereClassification : $whereCategory);
        $sql    = "SELECT iiat.*, classificationName, categoryName  FROM ims_inventory_asset_tbl AS iiat LEFT JOIN ims_inventory_classification_tbl AS iict USING(classificationID) 
                    LEFT JOIN ims_inventory_category_tbl AS iicat ON iiat.categoryID = iicat.categoryID WHERE iiat.assetStatus = '1' $validateOperand $where";
        $query  = $this->db->query($sql);
        $returnData = [];
        
        foreach ($query->result_array() as $key => $value) {
            $assetID                = $value["assetID"];
            $reOrderLevel           = floatval($value["reOrderLevel"]);
            $tempStockIn            = floatval($this->getStockIn($assetID));
            $tempBorrow             = floatval($this->getEquipmentBorrow($assetID));
            $tempReturn             = floatval($this->getReturnQuantity($assetID));
            $tempDisposed           = floatval($this->getDisposedQuantity($assetID));
            $tempReserved           = floatval($this->getReservedQuantity($assetID));
            $tempWithdrawn          = floatval($this->getWithdrawnQuantity($assetID));

            $borrowed               = ($tempBorrow    - $tempWithdrawn)  < 0 ? 0 : ($tempBorrow - $tempWithdrawn);
            $reserved               = ($tempReserved  - $tempWithdrawn)  < 0 ? 0 : ($tempReserved  - $tempWithdrawn);
            $stockIn                = ($tempStockIn  - $tempReturn);
            $withdrawn              = ($tempWithdrawn - $tempReturn);

            
            $totalQTY               = $stockIn + $tempReturn;
            $available              = $totalQTY - ($tempDisposed + $reOrderLevel + $tempWithdrawn +  $reserved ) + $tempReturn;

            $temp = [
                "assetID"                   => $assetID,
                "assetCode"                 => $value["assetCode"],
                "assetName"                 => $value["assetName"],
                "classificationName"        => $value["classificationName"],
                "categoryName"              => $value["categoryName"],
                "brand"                     => $value["brandName"],
                "reOrderLevel"              => $reOrderLevel,
                "uom"                       => $value["unitOfMeasurementID"],
                "stockIN"                   => $tempStockIn,
                "totalequipmentBorrowing"   => $borrowed,
                "materiaWithdrawalQuantity" => $withdrawn,
                "disposed"                  => $tempDisposed,
                "equipmentBorrowing"        => $borrowed,
                "reserved"                  => $reserved,
                "reservedAsset"             => $reserved,
                "returnQuantity"            => $tempReturn,
                "totalQuantity"             => $totalQTY,
                "available"                 => $available,
                "Transferred"               => "0.00",
            ];
            array_push($returnData, $temp);
        }



        

        return $returnData;
    }

    public function getStockIn($id = false, $param = "asset"){
        $stockIn = $id ? "" : 0 ;
        if($id){
            if($param == "param"){
                $sql        = "SELECT SUM(quantityForStockIn) AS stockIn FROM ims_stock_in_assets_tbl AS isiat
                                WHERE (isiat.inventoryReceivingID <> 0 OR isiat.materialUsageID <> 0) AND isiat.stockOutDate = '0000-00-00' 
                                    AND isiat.stockInDate IS NOT NULL AND isiat.assetID = $id";
                
            }else{
                $sql        = "SELECT SUM(sii.quantityForStockin) AS stockIn FROM ims_stock_in_item_tbl AS sii
                                WHERE  (sii.inventoryReceivingID <> 0 OR sii.materialUsageID <> 0) AND  sii.stockOutDate = '0000-00-00' AND sii.stockInDate IS NOT NULL AND sii.itemID = '$id' ";
            }

            $query      = $this->db->query($sql);
            $result     = $query->row();
            $stockIn    = $result ? $result->stockIn : 0;
        }
        return $stockIn;
    }

    public function getStockOut($id = false, $param = "items"){
        $stockOut = $id ? "" : false;
        if($id){
            $sql        = "SELECT SUM(sii.quantity) AS stockOut FROM ims_stock_in_item_tbl AS sii 
                            WHERE sii.stockOutID <> 0  AND sii.stockOutDate != '0000-00-00' AND sii.itemID = '$id' ";
            $query      = $this->db->query($sql);
            $result     = $query->row();
            $stockOut   = $result ? $result->stockOut : 0;
        }  
        return $stockOut;
    }

    public function getReservedQuantity($id = false, $param = "asset"){
        $reservedQTY = $id ? "" : 0;
        if($id){
            if($param == "asset"){
                $sql            = "SELECT SUM(sii.requestQuantity) AS reserved FROM ims_request_assets_tbl AS sii 
                                     LEFT JOIN ims_inventory_validation_tbl AS iiv ON sii.inventoryValidationID = iiv.inventoryValidationID
                                WHERE  sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedAsset IS NOT NULL AND sii.assetID = '$id'";
            }else{
                $sql            = "SELECT SUM(sii.requestQuantity) AS reserved FROM  ims_request_items_tbl AS sii
                                        LEFT JOIN ims_inventory_validation_tbl AS iiv ON  sii.inventoryValidationID = iiv.inventoryValidationID
                                    WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedItem IS NOT NULL AND sii.itemID = '$id' ";
            }

            $query          = $this->db->query($sql);
            $result         = $query->row();
            $reservedQTY    = $result ? $result->reserved : 0;
        }
        return $reservedQTY;
    }

    public function getWithdrawnQuantity($id = false, $param = "asset"){
        $withdrawnQTY =  $id ? "" : 0;
        if($id){
            if($param == "asset"){
                $sql        = "SELECT SUM(mww.received) AS withdrawal  FROM  ims_material_withdrawal_tbl AS mw  
                                LEFT JOIN ims_material_withdrawal_asset_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID 
                           WHERE mww.assetID = '$id' AND  mw.inventoryAssetStatus = 9 ";
            }else{
                $sql        = "SELECT SUM(mww.received) AS withdrawal FROM  ims_material_withdrawal_tbl AS mw
                                    LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
                                 WHERE mww.itemID IS NOT NULL AND mww.itemID = '$id' ";
            }
            $query          = $this->db->query($sql);
            $result         = $query->row();
            $withdrawnQTY   = $result ? $result->withdrawal : 0;
        }
        return $withdrawnQTY;
    }

    public function getUnusedQuantity($itemID = false){
        $unused     = $itemID ? "" : 0;
        if($itemID){
            $sql    = "SELECT SUM(iird.unused) AS unused FROM  ims_inventory_request_details_tbl AS iird
                            LEFT JOIN ims_material_usage_tbl AS imu ON  imu.materialUsageID = iird.materialUsageID
                        WHERE iird.materialUsageID <>0 AND materialUsageStatus = 2 AND iird.itemID = '$itemID' ";
            $query      = $this->db->query($sql);
            $result     = $query->row();
            $unused     = $result ? $result->unused : 0;
        }   
        return $unused;
    }

    public function getEquipmentBorrow($assetID = false){
        $borrowed = $assetID ? "" : 0;
        if($assetID){
            $sql        = "SELECT SUM(quantity) AS equipmentBorrowing FROM ims_stock_in_assets_tbl AS isiat WHERE isiat.assetID = '$assetID' AND isiat.equipmentBorrowingID <> 0  AND  isiat.stockOutDate IS NOT NULL ";
            $query      = $this->db->query($sql);
            $result     = $query->row();
            $borrowed   = $result ? $result->equipmentBorrowing : 0;
        }
        return $borrowed;
    }

    public function getReturnQuantity($assetID = false){
        $returnQTY = $assetID ? "" : 0;
        if($assetID){
            $sql        = "SELECT SUM(borrowedQuantity) AS equipmentBorrowing FROM ims_inventory_request_details_tbl AS sii 
                                LEFT JOIN ims_return_item_tbl AS returnHeader ON returnHeader.returnItemID = sii.returnItemID
                            WHERE sii.returnItemID <> 0 AND returnHeader.returnItemStatus = 2 AND sii.itemID = '$assetID' ";
            $query      = $this->db->query($sql);
            $result     = $query->row();
            $returnQTY  = $result ? $result->equipmentBorrowing : 0;
        }
        return $returnQTY;
    }

    public function getDisposedQuantity($assetID = false){
        $disposedQTY = $assetID ? "" : 0;
        if($assetID){
            $sql            = "SELECT SUM(quantity)  AS disposed FROM ims_inventory_disposal_details_tbl AS idd 
                                LEFT JOIN ims_inventory_disposal_tbl AS id ON idd.disposalID = id.disposalID WHERE id.disposalStatus = 2 AND idd.assetID = '$assetID'";
            $query          = $this->db->query($sql);
            $result         = $query->row();
            $disposedQTY    = $result ? $result->disposed : 0;
        }
        return $disposedQTY;
    }

   

    

}    