<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryStockIn_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
     
        $this->load->library('phpqrcode/qrlib');
    }
    public function getStockIn()
    {

    }

    public function savestockin($itemdata, 	$assetdata, $itemID, $itemName, $brand, $classificationName, $categoryName, $barcode, $recievedQuantity,$serialnumber,$inventoryStorageID, $inventoryStorageCode, $inventoryStorageOfficeName, $manufactureDate, $expirationdate, $ReturnItemID, $recordID)
    {
      $folderDir = "assets/upload-files/images/";
      if (!is_dir($folderDir)) {
          
          mkdir($folderDir);
      }
       $folder = $folderDir;
       
        if($recordID =='0'){
           
                   
                //$this->db->insert("ims_stock_in_item_tbl", $data);
                    
           

                $this->db->insert_batch('ims_stock_in_item_tbl', $itemdata);

                if(is_array($barcode)){ 
               
                    if(count($barcode)!=0){
                        foreach ($barcode as $value) 
                    {
                    $barcode = $value;
                   
                    $barcode1 = $value.".png";
                    $file_name = $folder.$barcode1;
                    QRcode::png($barcode,$file_name);
                    }
                    "<center><img src=".base_url().'/assets/upload-files/images/'.$file_name."></center>";
                    }
                }
           

        }else{

            $this->db->insert_batch("ims_stock_in_item_tbl", $assetdata);
               

                if(is_array($barcode)){ 
               
                    if(count($barcode)!=0){
                        foreach ($barcode as $value) 
                    {
                    $barcode = $value;
                   
                    $barcode1 = $value.".png";
                    $file_name = $folder.$barcode1;
                    QRcode::png($barcode,$file_name);
                    }
                    "<center><img src=".base_url().'/assets/upload-files/images/'.$file_name."></center>";
                    }


        }    
      
       
    }
}
  
    //     }
       
    // }
    public function getBarcodes($referenceCode,$itemID)
    {
        $sql = "
                SELECT quantityForStockin, barcode FROM ims_stock_in_item_tbl
                WHERE inventoryCode ='".$referenceCode."' AND itemID = ".$itemID."
                UNION ALL 
                SELECT quantityForStockin, barcode FROM ims_stock_in_assets_tbl
                WHERE inventoryCode = '".$referenceCode."' AND assetID = ".$itemID."";
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