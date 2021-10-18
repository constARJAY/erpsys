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
                                    Unused, notreturnUnused, disposed,reservedItem, materiaWithdrawalQuantity, ROUND(reserved,2) AS reserved, ROUND(available,2) AS available,
                                    ROUND((stockIN - totalStockOut),2) AS totalQuantity,ROUND(reOrderLevel,2) AS reOrderLevel
                                    FROM
                                    (
                                        SELECT i.itemID, i.itemCode, brand, i.itemName, classificationName, categoryName, uom, ROUND(stockIN,2) AS stockIN, ROUND(stockOut,2) AS stockOut,(stockOut - Unused) totalStockOut,
                                        ROUND(Unused,2) AS Unused, ROUND(notreturnUnused,2) AS notreturnUnused, ROUND(disposed,2) AS disposed, ROUND(reservedItem,2) AS reservedItem, ROUND(materiaWithdrawalQuantity,2)  AS materiaWithdrawalQuantity, 
                                        CASE WHEN materiaWithdrawalQuantity <>0 THEN (reservedItem - materiaWithdrawalQuantity)
                                        ELSE reservedItem END reserved,(stockIN - stockOut - IFNULL(reOrderLevel,0) - reservedItem + Unused) AS available,
                                        IFNULL(iii.reOrderLevel,0) AS reOrderLevel
                                        FROM
                                        (
                                            SELECT itemID, itemCode, brand, itemName, classificationName, categoryName, uom, IFNULL(SUM(stockIN),0) AS stockIN,IFNULL(SUM(stockOut),0) AS stockOut,
                                            IFNULL(SUM(Unused),0) AS Unused, IFNULL(SUM(notreturnUnused),0) AS notreturnUnused, IFNULL(SUM(disposed),0) AS disposed,
                                            IFNULL(SUM(reservedItem),0) AS reservedItem, IFNULL(SUM(materiaWithdrawalQuantity),0) AS materiaWithdrawalQuantity
                                            FROM
                                            (
                                                SELECT 
                                                sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                sii.classificationName, sii.categoryName,
                                                sii.uom,  SUM(sii.quantityForStockin) AS stockIN,
                                                0 AS stockOut,
                                                0 AS Unused,
                                                0 AS notreturnUnused,
                                                '0.00'  AS disposed,
                                                0 AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_stock_in_item_tbl AS sii
                                                WHERE  sii.inventoryReceivingID <>0  
                                                GROUP BY sii.itemID
                                                UNION ALL
                                                SELECT 
                                                sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                sii.classificationName, sii.categoryName,
                                                sii.uom,  0 AS stockIN,
                                                SUM(sii.quantity) AS stockOut,
                                                0 AS Unused,
                                                0 AS notreturnUnused,
                                                '0.00'  AS disposed,
                                                0 AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_stock_in_item_tbl AS sii
                                                WHERE sii.stockOutID <>0
                                                GROUP BY sii.itemID
                                                UNION ALL
                                                SELECT 
                                                sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                sii.classificationName, sii.categoryName,
                                                sii.uom,  0 AS stockIN,
                                                0 AS stockOut,
                                                SUM(sii.quantity) AS Unused,
                                                0 AS notreturnUnused,
                                                '0.00'  AS disposed,
                                                0 AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_stock_in_item_tbl AS sii
                                                WHERE sii.materialUsageID <>0 
                                                GROUP BY sii.itemID
                                                UNION ALL
                                                SELECT 
                                                sii.itemID, 0 AS itemCode, NULL AS brand,NULL AS itemName,
                                                NULL AS classificationName, NULL AS categoryName,
                                                NULL AS uom,  0 AS stockIN,
                                                0 AS stockOut,
                                                0  Unused,
                                                0 AS notreturnUnused,
                                                '0.00'  AS disposed,
                                                SUM(sii.reservedItem) AS reservedItem,
                                                0 AS materiaWithdrawalQuantity
                                                FROM  ims_request_items_tbl AS sii
                                                LEFT JOIN ims_inventory_validation_tbl AS iiv ON  sii.inventoryValidationID = iiv.inventoryValidationID
                                                WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedItem IS NOT NULL
                                                GROUP BY sii.itemID
                                                UNION ALL
                                                SELECT 
                                                mww.itemID, NULL AS itemCode, 0 AS brand, 0 AS itemName,
                                                0 AS classificationName, 0 AS categoryName,
                                                0 AS uom,  0 AS stockIN,
                                                0 AS stockOut,
                                                0 AS Unused,
                                                0 AS notreturnUnused,
                                                '0.00'  AS disposed,
                                                0 AS reservedItem,
                                                SUM(mww.received) AS materiaWithdrawalQuantity
                                                FROM  ims_material_withdrawal_tbl AS mw
                                                LEFT JOIN ims_material_withdrawal_item_tbl AS mww ON mw.materialWithdrawalID = mww.materialWithdrawalID
                                                WHERE  mw.inventoryItemStatus = 9  AND materialWithdrawalStatus = 9  
                                                GROUP BY mww.itemID
                                            )w 
                                            WHERE w.itemCode IS NOT NULL
                                            GROUP BY itemID
                                        )i
                                        LEFT JOIN ims_inventory_item_tbl AS iii ON i.itemID = iii.itemID
                                        $where $AND
                                        GROUP BY itemID
                                    )l GROUP BY itemID");       
       
        $sqlAsset = $this->db->query("SELECT assetID, assetCode, brand, assetName, classificationName, categoryName, uom, totalequipmentBorrowing,
                                    stockIN,equipmentBorrowing, Transferred, returnQuantity, disposed, reservedAsset,reserved,available,
                                    reOrderLevel, ROUND((stockIN - totalequipmentBorrowing),2) AS totalQuantity
                                    FROM
                                    (
                                    SELECT i.assetID, i.assetCode , brand, i.assetName, classificationName, categoryName, uom,stockIN,equipmentBorrowing,Transferred,returnQuantity,
                                    disposed,reservedAsset, CASE WHEN equipmentBorrowing <>0 THEN (reservedAsset - returnQuantity)
                                    ELSE reservedAsset END reserved,(stockIN - equipmentBorrowing - IFNULL(reOrderLevel,0) - reservedAsset + returnQuantity) AS available,
                                    IFNULL(iii.reOrderLevel,0) AS reOrderLevel,(IFNULL(equipmentBorrowing,2) - IFNULL(returnQuantity,2)) totalequipmentBorrowing
                                    FROM
                                    (
                                    SELECT assetID, assetCode, brand, assetName, classificationName,categoryName,uom,
                                    IFNULL(SUM(stockIN),0) AS stockIN,SUM(equipmentBorrowing) AS equipmentBorrowing,sum(Transferred) AS Transferred, SUM(returnQuantity) AS returnQuantity,
                                    disposed,IFNULL(SUM(reservedAsset),0) AS reservedAsset
                                    FROM
                                    (
                                        SELECT 
                                        sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        sii.classificationName, sii.categoryName,	sii.uom,  
                                        SUM(sii.quantityForStockin) AS stockIN,
                                        0 AS equipmentBorrowing,
                                        0 AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        0 AS reservedAsset
                                        FROM  ims_stock_in_assets_tbl AS sii
                                        WHERE  sii.inventoryReceivingID <>0  
                                        GROUP BY sii.assetID
                                        UNION ALL
                                        SELECT 
                                        sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        sii.classificationName, sii.categoryName,	sii.uom,  
                                        0 AS stockIN,
                                        sum(quantity) AS equipmentBorrowing,
                                        0 AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        0 AS reservedAsset
                                        FROM  ims_stock_in_assets_tbl AS sii
                                        WHERE  sii.equipmentBorrowingID <>0  
                                        GROUP BY sii.assetID
                                        UNION ALL
                                        SELECT 
                                        sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                        sii.classificationName, sii.categoryName,	sii.uom,  
                                        0 AS stockIN,
                                        0 AS equipmentBorrowing,
                                        SUM(quantity) AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        0 AS reservedAsset
                                        FROM  ims_stock_in_assets_tbl AS sii
                                        WHERE  sii.returnItemID <>0  
                                        GROUP BY sii.assetID
                                        UNION ALL
                                        SELECT sii.assetID, 		0 AS assetCode, 	0 AS  brand,	0 AS assetName,
                                        0 AS classificationName, 	0 as categoryName,	0 AS  uom,  
                                        0 AS stockIN,
                                        0 AS equipmentBorrowing,
                                        0 AS returnQuantity,
                                        0 AS Transferred,
                                        '0.00'  AS disposed,
                                        SUM(reservedAsset) AS reservedAsset
                                        FROM  ims_request_assets_tbl AS sii
                                        LEFT JOIN ims_inventory_validation_tbl AS iiv ON sii.inventoryValidationID = iiv.inventoryValidationID
                                        WHERE  sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2 AND reservedAsset IS NOT NULL
                                        GROUP BY sii.assetID
                                    ) w
                                    WHERE w.assetCode IS NOT NULL
                                    GROUP BY assetID
                                    )i
                                    LEFT JOIN ims_inventory_asset_tbl AS iii ON i.assetID = iii.assetID
                                    $where $AND
                                    GROUP BY i.assetID
                                    )l GROUP BY assetID");        
                                    return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());

    }

}    