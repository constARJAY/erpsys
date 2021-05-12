<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryStockIn_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function savestockin($itemID, $receivedID,$itemName, $barcode, $recievedQuantity,$serialnumber,$inventoryStorageID,$manufactureDate,$expirationdate)
    {
    //    $sql = "";
    //    $query = $this->db->query("SELECT itemID,SUM(quantity) AS quantity FROM ims_stock_in_total_tbl WHERE itemID =$itemID GROUP BY itemID, inventoryStorageID");
	// 	if($query->num_rows() == 0){

        $barcodesample = implode(",", $barcode);
            $record  = array();
            if(is_array($barcode)){ 
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
                 $record[$count] = array(
                            'inventoryReceivingID'		=> $receivedID,
                            'itemID'		            => $itemID,
                            'itemName'		            => $itemName,
                            'barcode'		            => $barcode[$count],
                            'stockInSerialNumber'		=>$serialnumber[$count],
                            'stockInQuantity'           =>$recievedQuantity[$count],
                            'stockInLocationID'         =>$inventoryStorageID[$count],
                            'manufacturedDate'          =>$manufactureDate[$count],
                            'expirationDate'            =>$expirationdate[$count],);

                }      
                $this->db->insert_batch('ims_stock_in_tbl', $record);
            }
        }      
                return "true|Inventory Stock In Successfully";   

    // }else{
    //     $quantity = $query[0]['quantity'];
    //     print_r($quantity);

    //     $barcodesample = implode(",", $barcode);
    //     $record  = array();
    //     if(is_array($barcode)){ 
    //         if(count($barcode)!=0){
    //         for($count = 0; $count<count($barcode); $count++)
    //         {
    //          $record[$count] = array(
    //                     'inventoryReceivingID'		=> $receivedID,
    //                     'itemID'		            => $itemID,
    //                     'itemName'		            => $itemName,
    //                     'barcode'		            => $barcode[$count],
    //                     'stockInSerialNumber'		=>$serialnumber[$count],
    //                     'stockInQuantity'           =>$recievedQuantity[$count],
    //                     'stockInLocationID'         =>$inventoryStorageID[$count],
    //                     'manufacturedDate'          =>$manufactureDate[$count],
    //                     'expirationDate'            =>$expirationdate[$count],);

    //         }      
    //         $this->db->insert_batch('ims_stock_in_tbl', $record);
    //     }
    // }   
    //     $total = array(
    //         'itemID'		=> $receivedID,
    //         'itemName'      =>$itemName,


    
    //      return "true|Inventory Stock In Successfully";   
    // }         
    }
    public function getBarcodes($receivedID,$itemID)
    {
        $sql = "
        SELECT itemID, barcode,stockInSerialNumber,stockInQuantity,stockInLocationID,  manufacturedDate , expirationDate FROM ims_stock_in_tbl WHERE inventoryReceivingID=".$receivedID." AND ItemID = ".$itemID."";
        $query = $this->db->query($sql);
        //return $query->result($query);
        return $query->result_array();

    }
  

    // public function getrecievingreportByPO($purchaseOrderID, $itemID)
    // {
    //     $query = $this->db->query("SELECT 
    //     sw.dateReceived AS dateReceived,
    //     sw.receivedQuantity AS receivedQuantity,
    //     sw.remainingQuantity AS remainingQuantity,
    //     ist.inventoryStorageID AS inventoryStorageID,
    //     ist.inventoryStorageOfficeName
    //     FROM ims_inventory_received_tbl AS sw
    //     LEFT JOIN ims_inventory_storage_tbl AS ist
    //     ON ist.inventoryStorageID = sw.inventoryStorageID
    //     WHERE purchaseOrderID = ".$purchaseOrderID." AND itemID = ".$itemID." AND isDepartment IS NULL AND inventoryReceivingOutID IS NULL");
    //     return $query ? $query->result_array() : [];
    // }
}    