<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryStockIn_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function savestockin($itemID, $receivedID,$itemName, $barcode, $recievedQuantity,$serialnumber,$inventoryStorageID,$manufactureDate,$expirationdate)
    {

        $serialnumber1       = implode(",", $serialnumber);
        $inventoryStorageID1 = implode(",", $inventoryStorageID);
        $insert_id = "";
        if($serialnumber1 ==""){
            $record  = array();
            $insert_id = "";
            if(is_array($barcode)){ 
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
                 $record[$count] = array(
                            'inventoryReceivingID'		=>$receivedID,
                            'itemID'		            =>$itemID,
                            'itemName'		            =>$itemName,
                            'barcode'		            =>$barcode[$count],
                            'stockInSerialNumber'		=>"",
                            'stockInQuantity'           =>$recievedQuantity[$count],
                            'stockInLocationID'         =>$inventoryStorageID[$count],
                            'manufacturedDate'          =>$manufactureDate[$count],
                            'expirationDate'            =>$expirationdate[$count]);
                } 
                $this->db->insert_batch('ims_stock_in_tbl', $record);
                $insert_id = $this->db->insert_id();
            }
        }
      
        $query = $this->db->query("SELECT IFNULL(isi.itemID,'0') as itemID, isi.itemName,isit.itemName as totalitemname, (sum(stockInQuantity) + SUM(IFNULL(quantity,0))) AS quantity, stockInLocationID FROM ims_stock_in_tbl AS isi
        LEFT JOIN ims_stock_in_total_tbl AS isit ON isi.itemID = isit.itemID AND  isi.stockInLocationID = isit.inventoryStorageID WHERE isi.itemID =$itemID AND isi.stockInLocationID IN($inventoryStorageID1) AND isi.stockinID =$insert_id GROUP BY itemID, stockInLocationID");

            foreach ($query->result() as $row)
            {
                $totalitemname                  =$row->totalitemname;
                $itemID                        = $row->itemID;
                $itemName                       = $row->itemName;
                $quantity                       =$row->quantity;
                $stockInLocationID              =$row->stockInLocationID;

                $array = array('itemID' => $row->itemID, 'inventoryStorageID' => $row->stockInLocationID);
                $data = array(
                        'itemID'            => $itemID,
                        'itemName'          => $itemName,
                        'quantity'          => $quantity,
                        'inventoryStorageID'  =>$stockInLocationID);
                        if($row->totalitemname =="" || $row->totalitemname ==NULL){
                            $this->db->insert('ims_stock_in_total_tbl',$data);   
                        }else{
                            $this->db->where($array);  
                            $this->db->update("ims_stock_in_total_tbl", $data);  
                            
                        }            
            }
        return "true|Inventory Stock In Successfully";   
         }else{
        //kung may serial serial
        $record  = array();
        $insert_id = "";
        if(is_array($barcode)){ 
            if(count($barcode)!=0){
            for($count = 0; $count<count($barcode); $count++)
            {
             $record[$count] = array(
                        'inventoryReceivingID'		=>$receivedID,
                        'itemID'		            =>$itemID,
                        'itemName'		            =>$itemName,
                        'barcode'		            =>$barcode[$count],
                        'stockInSerialNumber'		=>$serialnumber[$count],
                        'stockInQuantity'           =>$recievedQuantity[$count],
                        'stockInLocationID'         =>$inventoryStorageID[$count],
                        'manufacturedDate'          =>$manufactureDate[$count],
                        'expirationDate'            =>$expirationdate[$count]);
            } 
            $this->db->insert_batch('ims_stock_in_tbl', $record);
           
        }
    }
    $id = $this->db->insert_id();
    $query = $this->db->query("SELECT IFNULL(isi.itemID,'0') as itemID, isi.itemName,isit.itemName as totalitemname, (sum(stockInQuantity) + SUM(IFNULL(quantity,0))) AS quantity, stockInLocationID FROM ims_stock_in_tbl AS isi
        LEFT JOIN ims_stock_in_total_tbl AS isit ON isi.itemID = isit.itemID AND  isi.stockInLocationID = isit.inventoryStorageID WHERE isi.stockinID =$id GROUP BY itemID, stockInLocationID");

            foreach ($query->result() as $row)
            {
                $totalitemname                  =$row->totalitemname;
                $itemID                        = $row->itemID;
                $itemName                       = $row->itemName;
                $quantity                       =$row->quantity;
                $stockInLocationID              =$row->stockInLocationID;

                $array = array('itemID' => $row->itemID, 'inventoryStorageID' => $row->stockInLocationID);
                $data = array(
                        'itemID'            => $itemID,
                        'itemName'          => $itemName,
                        'quantity'          => $quantity,
                        'inventoryStorageID'  =>$stockInLocationID);
                        if($row->totalitemname =="" || $row->totalitemname ==NULL){
                            $this->db->insert('ims_stock_in_total_tbl',$data);   
                        }else{
                            $this->db->where($array);  
                            $this->db->update("ims_stock_in_total_tbl", $data);  
                            
                        }            
            }
        return "true|Inventory Stock In Successfully";   
 
        }
       
    }
    public function getBarcodes($receivedID,$itemID)
    {
        $sql = "
        SELECT itemID, barcode,stockInSerialNumber,stockInQuantity,stockInLocationID,  manufacturedDate , expirationDate FROM ims_stock_in_tbl WHERE inventoryReceivingID=".$receivedID." AND ItemID = ".$itemID."";
        $query = $this->db->query($sql);
        //return $query->result($query);
        return $query->result_array();

    }

    public function  getvalueData($inventoryReceivingID)
    {
        $sql = " select sum(quantity) as quantity ,sum(received) as received, employeeID, inventoryReceivingID from 
        (
        SELECT '' as quantity ,SUM(received) as received,iir.employeeID,iir.inventoryReceivingID
        FROM ims_inventory_receiving_details_tbl  as  iird
        LEFT JOIN ims_inventory_receiving_tbl AS iir ON iird.inventoryReceivingID  = iir.inventoryReceivingID
         where iir.inventoryReceivingID  =9
          union all
         SELECT sum(stockInQuantity) AS quantity , '' as received, '' AS employeeID, '' inventoryReceivingID
        FROM ims_stock_in_tbl
        where  inventoryReceivingID =9
         )a
        
        ";
        $query = $this->db->query($sql);
        //return $query->result($query);
        return $query->result_array();
    }
}    