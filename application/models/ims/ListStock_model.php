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
                                        stockIN, stockOut, Unused, reservedItem,disposed, ROUND(reOrderLevel,2) AS reOrderLevel,
                                        stockIN, (stockOut - recordUnused) AS stockOut,recordUnused AS Unused,disposed, reservedItem ,   
                                        (stockIN - reOrderLevel - reservedItem + Unused) AS Available,
                                        (stockIN + Unused - disposed) AS Total_Quantity
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
                                                        WHERE sii.inventoryValidationID IS NOT NULL AND bidRecapID IS NULL
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
                                )i GROUP BY itemID;");       
       
        $sqlAsset = $this->db->query("SELECT assetID, assetCode,assetName,brand, classificationName,categoryName,   uom,stockIN, borrowedQuantity,returned,reOrderLevel,
                                    reservedItem, disposed, transferquantity, ROUND((stockIN -  borrowedQuantity + returned - transferquantity - disposed - reservedItem - reOrderLevel),2) AS Available,
                                    ROUND((stockIN -  borrowedQuantity + returned - transferquantity - disposed + reservedItem),2) AS Total_Quantity
                                    FROM 
                                    (
                                        SELECT IFNULL(w.assetID,'') AS assetID, IFNULL(w.assetCode,'') AS assetCode, IFNULL(w.assetName,'') AS assetName, IFNULL(w.brand,'') AS brand, IFNULL(classificationName,'') AS classificationName, 
                                        IFNULL(categoryName,'') AS categoryName, IFNULL(uom,'') AS uom, IFNULL(stockIN,0) AS stockIN,
                                        IFNULL(borrowedQuantity,0) AS borrowedQuantity, IFNULL(returned,0) AS returned, IFNULL(iri.reservedAsset,0) AS   reservedItem,
                                        IFNULL(disposed,0) AS disposed, IFNULL(transferquantity,0) AS transferquantity,IFNULL(ia.reOrderLevel,0) AS reOrderLevel
                                        FROM
                                        ( 
                                            SELECT sii.assetID, sii.assetCode, sii.assetName, sii.brand, sii.classificationName, sii.categoryName, sii.uom,
                                            SUM(sii.quantity) AS stockIN , 0 AS borrowedQuantity, 0 AS returned,
                                            '0.00' AS disposed, 0 AS transferquantity
                                            FROM  ims_stock_in_assets_tbl AS sii
                                            WHERE sii.inventoryReceivingID <>0 
                                            GROUP BY sii.assetID
                                            UNION ALL
                                            SELECT sii.assetID, sii.assetCode, sii.assetName, sii.brand, sii.classificationName, sii.categoryName, sii.uom,
                                            0 AS stockIN , SUM(borrowedQuantity) AS borrowedQuantity, SUM(sii.quantity) AS returned,
                                            '0.00' AS disposed,0 AS transferquantity
                                            FROM  ims_stock_in_assets_tbl AS sii
                                            LEFT JOIN ims_inventory_request_details_tbl AS ird ON sii.assetID = ird.itemID AND sii.returnItemID = ird.returnItemID
                                            WHERE sii.returnItemID <>0 
                                            GROUP BY sii.assetID
                                        )w 
                                        LEFT JOIN ims_inventory_asset_tbl AS ia ON w.assetID = ia.assetID
                                        LEFT JOIN ims_request_assets_tbl AS iri ON w.assetID = iri.assetID AND iri.inventoryValidationID IS NOT NULL
                                        $where $AND
                                        GROUP BY w.assetID
                                    )i GROUP BY assetID");        
                                    return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());

    }

}    