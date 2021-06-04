<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ListStock_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function getListStock($classificationID, $categoryID){

        $sql = "
        SELECT itemID, inventoryStorageID, itemCode,itemName,itemClassification,UOM,barcode,storageCode,StorageName,
        FORMAT(sum(stockIN) + SUM(unusedQuantity),2) AS stockIN,FORMAT(SUM(widhdrawn),2) AS widhdrawn,FORMAT(SUM(unusedQuantity),2) AS unusedQuantity,FORMAT(sum(borrowedQuantity),2) AS borrowedQuantity,FORMAT(SUM(returnQuantity),2) AS returnQuantity,FORMAT(SUM(transferredQuantity),2) AS transferredQuantity,
        FORMAT(SUM(disposalQuantity),2) AS disposalQuantity,FORMAT(SUM(endQuantity),2) AS endQuantity,
        FORMAT(reorderpoint,2) AS reorderpoint, format(stockInQuantity,2) AS stockInQuantity FROM
        (
            select isit.itemID,isit.inventoryStorageID,concat('ITM-',LEFT(iii.createdAt,2),'-',LPAD(isit.itemID,5,'0')) AS itemCode, iii.itemName, 
            iic.classificationName AS itemClassification , iii.unitOfMeasurementID AS UOM, isi.barcode,
            concat('ISM-',LEFT(iis.createdAt,2),'-',LPAD(iis.inventoryStorageID,5,'0')) AS storageCode, iis.inventoryStorageOfficeName AS StorageName,
            ROUND(isit.quantity,2) AS stockIN, '' AS widhdrawn, '' AS unusedQuantity,
            '' AS borrowedQuantity, '' AS returnQuantity, '' AS transferredQuantity, '' AS disposalQuantity, '' As endQuantity,
            iii.reOrderLevel AS reorderpoint, SUM(stockInQuantity) as stockInQuantity
            FROM ims_stock_in_total_tbl AS isit
            LEFT JOIN ims_stock_in_tbl	AS isi ON isit.itemID = isi.itemID AND isi.stockInLocationID = isit.inventoryStorageID
            LEFT JOIN ims_inventory_item_tbl AS iii ON isit.itemID =iii.itemID 
            LEFT JOIN ims_inventory_classification_tbl AS iic ON iii.classificationID =iic.classificationID 
            LEFT JOIN ims_inventory_storage_tbl AS iis ON isit.inventoryStorageID = iis.inventoryStorageID 
            WHERE iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID'
            GROUP BY stockInTotalID,isit.itemID 
            /* stock_in end */
            UNION  ALL 
            /*  Start material_usage*/
            select imwd.itemID,imwd.inventoryStorageID,'' AS itemCode, '' AS itemName, '' AS itemClassification , '' AS UOM, '' AS barcode,
            '' AS storageCode, '' AS StorageName, '' AS stockIN, '' AS widhdrawn, ROUND(sum(imwd.Unused),2)  AS unusedQuantity,
            '' AS borrowedQuantity, '' AS returnQuantity, '' AS transferredQuantity, '' AS disposalQuantity, '' As endQuantity,
            '' AS reorderpoint, '' as stockInQuantity
            FROM ims_material_usage_tbl AS  imu
            LEFT JOIN ims_material_withdrawal_details_tbl AS imwd ON imwd.materialUsageID = imu.materialUsageID
            LEFT JOIN ims_inventory_item_tbl AS iii ON imwd.itemID =iii.itemID 
            WHERE  imu.materialUsageStatus = 2  and iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID'
            GROUP BY imwd.itemID AND imwd.inventoryStorageID
            /* End material_usage */
            UNION ALL
            /*  Start material withdrawal*/
            select imwd.itemID,imwd.inventoryStorageID,'' AS itemCode, '' AS itemName, '' AS itemClassification , '' AS UOM, '' AS barcode,
            '' AS storageCode, '' AS StorageName, '' AS stockIN, ROUND(sum(imwd.quantity),2) AS widhdrawn, ROUND(sum(imwd.Unused),2)  AS unusedQuantity,
            '' AS borrowedQuantity, '' AS returnQuantity, '' AS transferredQuantity, '' AS disposalQuantity, '' As endQuantity,
            '' AS reorderpoint, '' as stockInQuantity
            FROM ims_material_withdrawal_tbl AS  imu
            LEFT JOIN ims_material_withdrawal_details_tbl AS imwd ON imwd.materialWithdrawalID = imu.materialWithdrawalID
            LEFT JOIN ims_inventory_item_tbl AS iii ON imwd.itemID =iii.itemID 
            WHERE  imu.materialWithdrawalStatus = 2  and iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID' AND materialUsageID is null
            GROUP BY imwd.itemID AND imwd.inventoryStorageID
            /* End material Withdrawal */
            UNION ALL
            /*Start borrowing query */
            select ibd.itemID,ibd.inventoryStorageID, '' AS itemCode, '' AS itemName, '' AS itemClassification , '' AS UOM, '' AS barcode,
            '' AS storageCode, '' AS StorageName, '' AS stockIN, '' AS widhdrawn, '' AS unusedQuantity,
            ROUND(sum(ibd.quantity),2) AS borrowedQuantity, '' AS returnQuantity, '' AS transferredQuantity, '' AS disposalQuantity, '' As endQuantity,
            '' AS reorderpoint, '' as stockInQuantity
            from ims_borrowing_tbl AS ib
            LEFT JOIN ims_borrowing_details_tbl AS ibd ON ibd.borrowingID = ib.borrowingID
            LEFT JOIN ims_inventory_item_tbl AS iii ON ibd.itemID =iii.itemID 
            WHERE borrowingStatus = 2 and iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID'
            GROUP BY ibd.itemID AND ibd.inventoryStorageID
            /*End borrowing query */
            UNION ALL
            /* Start return query */
            select irid.itemID,irid.inventoryStorageID, '' AS itemCode, '' AS itemName, '' AS itemClassification , '' AS UOM, '' AS barcode,
            '' AS storageCode, '' AS StorageName, '' AS stockIN, '' AS widhdrawn, '' AS unusedQuantity,
            '' AS borrowedQuantity, ROUND(sum(irid.returnItemQuantity),2) AS returnQuantity, '' AS transferredQuantity, '' AS disposalQuantity, '' As endQuantity,
            '' AS reorderpoint, '' as stockInQuantity
            from ims_return_item_tbl AS iri
            LEFT JOIN ims_return_item_details_tbl AS irid ON iri.returnItemID = irid.returnItemID
            LEFT JOIN ims_inventory_item_tbl AS iii ON irid.itemID =iii.itemID 
            WHERE iri.returnItemStatus = 2 and iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID'
            GROUP BY irid.itemID AND irid.inventoryStorageID
            /* End return query*/
            UNION ALL
            /* start of disposal query*/
            select iidd.itemID, iidd.inventoryStorageID,'' AS itemCode, '' AS itemName, '' AS itemClassification , '' AS UOM, '' AS barcode,
            '' AS storageCode, '' AS StorageName, '' AS stockIN, '' AS widhdrawn, '' AS unusedQuantity,
            '' AS borrowedQuantity, '' AS returnQuantity, '' AS transferredQuantity, SUM(quantity) AS disposalQuantity, '' As endQuantity,
            '' AS reorderpoint, '' as stockInQuantity
            FROM ims_inventory_disposal_tbl AS iid
            LEFT JOIN ims_inventory_disposal_details_tbl AS iidd ON iid.disposalID = iid.disposalID
            LEFT JOIN ims_inventory_item_tbl AS iii ON iidd.itemID =iii.itemID 
            WHERE iid.disposalStatus = 2 and iii.classificationID = '$classificationID' AND iii.categoryID = '$categoryID'
            GROUP BY iidd.itemID AND iidd.inventoryStorageID
        )a GROUP BY itemID,inventoryStorageID";
        return $this->db->query($sql)->result_array();

    }

}    