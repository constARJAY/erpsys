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
        $sqlItem = $this->db->query("SELECT itemID, itemCode, itemName, brand, classificationName, categoryName, uom, SUM(stockIN) AS stockIN, stockOut, SUM(unused) AS unused, disposed, SUM(reservedItem) AS reservedItem
                FROM 
                (
                    SELECT sii.itemID, sii.itemCode, sii.itemName, sii.brand, sii.classificationName, sii.categoryName,sii.uom, 
                        CASE sii.inventoryReceivingID WHEN 0 THEN 0 ELSE quantity END stockIN,
                        '0' AS stockOut,
                        CASE materialUsageID WHEN 0 THEN 0 ELSE quantity END unused,
                        '0'  AS disposed,
                        ifnull(iri.reservedItem,'0') AS reservedItem 
                    FROM  ims_stock_in_item_tbl AS sii
                    LEFT JOIN ims_inventory_item_tbl AS iii ON sii.itemID = iii.itemID
                    LEFT JOIN ims_request_items_tbl AS iri ON sii.itemID = iri.itemID AND iri.inventoryValidationID IS NOT NULL
                    $where $AND
                )a GROUP BY itemID");
        $sqlAsset = $this->db->query("SELECT assetID, itemCode, itemName, brand, classificationName, categoryName, uom, SUM(stockIN) AS stockIN, stockOut, SUM(unused) AS unused, disposed, SUM(reservedItem) AS reservedItem
                    FROM 
                    (
                        SELECT sii.assetID, sii.itemCode, sii.itemName, sii.brand, sii.classificationName, sii.categoryName,sii.uom, 
                            CASE sii.inventoryReceivingID WHEN 0 THEN 0 ELSE sii.quantity END stockIN,
                            '0' AS stockOut,
                            CASE sii.materialUsageID WHEN 0 THEN 0 ELSE sii.quantity END unused,
                            '0'  AS disposed,
                            ifnull(iri.reservedAsset,'0') AS reservedItem 
                        FROM  ims_stock_in_assets_tbl AS sii
                        LEFT JOIN ims_stock_in_assets_tbl AS iii ON sii.assetID = iii.assetID
                        LEFT JOIN ims_request_assets_tbl AS iri ON sii.assetID = iri.assetID AND iri.inventoryValidationID IS NOT NULL
                        $where $AND
                    )a GROUP BY assetID");        
        return array('item' =>$sqlItem->result(),'assets' =>$sqlAsset->result());
        //return array('item',$this->db->query($sqlItem)->result_array(),'assets',$this->db->query($sqlAsset)->result_array());

    }

}    