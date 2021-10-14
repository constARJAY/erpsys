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
        $sqlItem = $this->db->query("SELECT itemID, itemCode, brand, classificationName , categoryName, uom,itemName,
                                    stockIN,  Unused, reservedItem,disposed, ROUND(reOrderLevel,2) AS reOrderLevel,
                                     (stockOut - notreturnUnused) AS stockOut,recordUnused AS Unused,disposed, reservedItem ,   
                                    ROUND(stockIN - stockOut - reservedItem + Unused,2) AS Available,
                                    ROUND(stockIN - stockOut - Unused - disposed,2) AS Total_Quantity
                                    FROM
                                    (
                                        SELECT w.itemID,w.itemCode,w.brand, w.classificationName, w.categoryName, w.uom, (stockIN + stockOut) AS stockIN, IFNULL(w.stockOut,0) AS  stockOut,w.itemName,
                                        (notreturnUnused - Unused) AS recordUnused, Unused, IFNULL(notreturnUnused,0) AS notreturnUnused,  IFNULL(reservedItem,0) AS  reservedItem, IFNULL(disposed,0) AS disposed, IFNULL(iii.reOrderLevel,0) AS reOrderLevel FROM
                                        (
                                            SELECT itemID, itemCode, brand, classificationName, categoryName, uom, SUM(stockIN) AS stockIN, 
                                                SUM(stockOut) AS stockOut, itemName, IFNULL(SUM(Unused),0) AS Unused, IFNULL(SUM(notreturnUnused),0) AS notreturnUnused, IFNULL(disposed,0) AS disposed,SUM(reservedItem) AS reservedItem
                                                FROM
                                                (
                                                    SELECT 
                                                    sii.itemID, sii.itemCode, sii.brand,sii.itemName,
                                                    sii.classificationName, sii.categoryName,
                                                    sii.uom,  SUM(sii.quantity) AS stockIN,
                                                    0 AS stockOut,
                                                    0 AS Unused,
                                                    0 AS notreturnUnused,
                                                    '0.00'  AS disposed,
                                                    0 AS reservedItem
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
                                                    0 AS reservedItem
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
                                                    0 AS reservedItem
                                                    FROM  ims_stock_in_item_tbl AS sii
                                                    WHERE sii.materialUsageID <>0 
                                                    GROUP BY sii.itemID
                                                    UNION ALL
                                                    SELECT 
                                                    sii.itemID, NULL AS itemCode, NULL AS brand,NULL AS itemName,
                                                    NULL AS classificationName, NULL AS categoryName,
                                                    NULL AS uom,  0 AS stockIN,
                                                    0 AS stockOut,
                                                    0  Unused,
                                                    0 AS notreturnUnused,
                                                    '0.00'  AS disposed,
                                                    SUM(sii.reservedItem) AS reservedItem
                                                    FROM  ims_request_items_tbl AS sii
                                                    LEFT JOIN ims_inventory_validation_tbl AS iiv ON  sii.inventoryValidationID = iiv.inventoryValidationID
                                                    WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2
                                                    GROUP BY sii.itemID
                                                    UNION ALL 
                                                    SELECT 
                                                    ivrd.itemID, ivrd.itemCode, ivrd.Brand as brand,ivrd.itemName,
                                                    ivrd.classificationName, ivrd.categoryName,
                                                    ivrd.uom,  0 AS stockIN,
                                                    0 AS stockOut,
                                                    0 AS unused,
                                                    SUM(ivrd.unused) AS notreturnUnused,
                                                    '0.00'  AS disposed,
                                                    0 AS reservedItem
                                                    FROM  ims_material_usage_tbl AS mu
                                                    LEFT JOIN ims_inventory_request_details_tbl AS ivrd ON mu.materialUsageID = ivrd.materialUsageID
                                                    WHERE mu.materialUsageStatus =2 
                                                    GROUP BY ivrd.itemID
                                            )a group by itemID   
                                        )w 
                                        LEFT JOIN ims_inventory_item_tbl AS iii ON w.itemID = iii.itemID
                                        $where $AND
                                        GROUP BY  iii.itemID
                            )i 
                            WHERE itemCode IS NOT NULL
                            GROUP BY itemID");       
       
        $sqlAsset = $this->db->query("SELECT assetID,assetCode, assetName , brand, classificationName, categoryName, uom, ROUND(stockIN,2) AS stockIN,stockOut,returnQuantity,disposed,
                                    reservedAsset,reOrderLevel, '0.00' AS transferquantity, ROUND(stockIN - stockOut - reservedAsset - disposed + returnQuantity,2) AS available,
                                    ROUND((stockIN - stockOut + returnQuantity - disposed + reservedAsset),2)  AS Total_Quantity
                                    FROM
                                    (
                                        SELECT i.assetID, i.assetCode, i.assetName, i.brand, classificationName,categoryName,  uom, (stockIN + stockOut) AS stockIN,stockOut,
                                        returnQuantity, disposed,reservedAsset,IFNULL(reOrderLevel,'0.00') AS reOrderLevel
                                        FROM
                                        (
                                            SELECT assetID,assetCode, assetName, brand, classificationName, categoryName, uom, IFNULL(stockIN,0) AS stockIN,
                                            IFNULL(stockOut,'0.00') AS stockOut, IFNULL(returnQuantity,'0.00') AS returnQuantity,disposed,reservedAsset
                                            FROM
                                            (
                                                /* stock in quantity without stockout*/
                                                SELECT 
                                                sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                                sii.classificationName, sii.categoryName,	sii.uom,  
                                                SUM(sii.quantity) AS stockIN,
                                                0 AS stockOut,
                                                0 AS returnQuantity,
                                                '0.00'  AS disposed,
                                                0 AS reservedAsset
                                                FROM  ims_stock_in_assets_tbl AS sii
                                                WHERE  sii.inventoryReceivingID <>0  
                                                GROUP BY sii.assetID
                                                /*End stock in quantity without stockout*/
                                                UNION ALL
                                                /*stock Out quantity */
                                                SELECT 
                                                sii.assetID, 			sii.assetCode, 		sii.brand,	sii.assetName,
                                                sii.classificationName, sii.categoryName,	sii.uom,  
                                                0 AS stockIN,
                                                sum(quantity) AS stockOut,
                                                0 AS returnQuantity,
                                                '0.00'  AS disposed,
                                                0 AS reservedAsset
                                                FROM  ims_stock_in_assets_tbl AS sii
                                                WHERE  sii.stockOutID <>0  
                                                GROUP BY sii.assetID
                                                /*END stock Out quantity */
                                                UNION ALL
                                                /* return quantity */
                                                SELECT 
                                                sii.assetID, 			sii.assetCode, 		sii.brand,		sii.assetName,
                                                sii.classificationName, sii.categoryName,	sii.uom,  
                                                0 AS stockIN,
                                                0 AS stockOut,
                                                sum(sii.quantity) AS returnQuantity,
                                                '0.00'  AS disposed,
                                                0 AS reservedAsset
                                                FROM  ims_stock_in_assets_tbl AS sii
                                                WHERE  sii.returnItemID <>0  
                                                GROUP BY sii.assetID
                                                /* End return quantity */
                                                UNION ALL
                                    
                                                SELECT sii.assetID, 		0 AS assetCode, 	0 AS  brand,	0 AS assetName,
                                                0 AS classificationName, 	0 as categoryName,	0 AS  uom,  
                                                0 AS stockIN,
                                                0 AS stockOut,
                                                0 AS returnQuantity,
                                                '0.00'  AS disposed,
                                                SUM(reservedAsset) AS reservedAsset
                                                FROM  ims_request_assets_tbl AS sii
                                                LEFT JOIN ims_inventory_validation_tbl AS iiv ON sii.inventoryValidationID = iiv.inventoryValidationID
                                                WHERE  sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL AND iiv.inventoryValidationStatus = 2
                                                GROUP BY sii.assetID
                                            )w 
                                            GROUP BY assetID
                                        )i
                                        LEFT JOIN ims_inventory_asset_tbl AS iii ON i.assetID = iii.assetID
                                        $where $AND
                                        GROUP BY  i.assetID
                                    )l 
                                    WHERE assetCode IS NOT NULL
                                    GROUP BY assetID");        
                                    return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());

    }

}    