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

    public function savestockin($itemID, $itemName,$brand, $classificationName, $categoryName,$barcode,$serialnumber,$inventoryStorageID, $inventoryStorageCode, $inventoryStorageOfficeName, $manufactureDate, $expirationdate, $ReturnItemID, $MaterialUsageID,  $InventoryReceivingID, $recordID, $quantity, $inventoryCode, $itemCode, $uom)
    {
       // $this->load->helper('file');
       // $recordID       = implode(",", $recordID);
       //$SERVERFILEPATH = "".site_url().'/erpsys/assets/upload-files/images/';
       //$SERVERFILEPATH = base_url().'/erpsys/assets/upload-files/images/';
       //$SERVERFILEPATH = base_url() . '/erpsys/assets/upload-files/images/';


       //$SERVERFILEPATH = fopen("./erpsys/assets/upload-files/images/", "r");
    //    print_r( $SERVERFILEPATH);
    //  exit;
      //plugins_url( '/assets/upload-files/images/', __FILE__ );
      //$SERVERFILEPATH = $_SERVER['DOCUMENT_ROOT'].'/erpsys/assets/upload-files/images/';
      $folderDir = "assets/upload-files/images/";
      if (!is_dir($folderDir)) {
          
          mkdir($folderDir);
      }
     // $targetDir = $folderDir.$filename;
      //$SERVERFILEPATH = '.../erpsys/assets/upload-files/images/';
       $folder = $folderDir;
       
        if($recordID[0] =='0'){
            //$SERVERFILEPATH = $_SERVER['DOCUMENT_ROOT'].'/erpsys/images/';
            $record  = array();
           // $insert_id = "";
            if(is_array($barcode)){ 
               
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
               
                 $record[] = array
                 (
                            
                    
                        'InventoryReceivingID'		=>$InventoryReceivingID[$count],
                        'MaterialUsageID'		    =>$MaterialUsageID[$count],
                        'ReturnItemID'		        =>$ReturnItemID[$count],
                        'itemCode'		            =>$itemCode,
                        'itemID'		            =>$itemID[$count],
                        'itemName'		            =>$itemName[$count],
                        'barcode'		            =>$barcode[$count],
                        'brand'                     =>$brand[$count],
                        'categoryName'              =>$categoryName[$count],
                        'classificationName'        =>$classificationName[$count],
                        'expirationdate'            =>$expirationdate[$count],
                        'inventoryCode'             =>$inventoryCode[$count],
                        'inventoryStorageCode'      =>$inventoryStorageCode[$count],
                        'inventoryStorageID'        =>$inventoryStorageID[$count],
                        'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$count],
                        'manufactureDate'           =>$manufactureDate[$count],
                        'quantity'                  =>$quantity[$count],
                        'quantityForStockin'        =>$quantity[$count],
                        'serialNumber'              =>$serialnumber[$count],
                        'uom'                       =>$uom
                              
                        
                );
                
                
                // $barcode = $barcode[$count].".png";
                // QRcode::png($barcode);
                // echo "<center><img src=".`${base_url}`.$barcode."></center";
            // print_r($barcode);
            // exit;

                } 
                // echo "<pr>";
                // print_r($record);
                // echo "</pr>";
                // exit;
                
                $this->db->insert_batch('ims_stock_in_item_tbl', $record);

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
        }else{

            $record  = array();
           // $insert_id = "";
            if(is_array($barcode)){ 
                //$SERVERFILEPATH = $_SERVER['DOCUMENT_ROOT'].'/erpsys/images/';
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
                
                 $record[$count] = array
                 (
                            'InventoryReceivingID'		=>$InventoryReceivingID[$count],
                            'MaterialUsageID'		    =>$MaterialUsageID[$count],
                            'ReturnItemID'		        =>$ReturnItemID[$count],
                            'assetCode'		            =>$itemCode,
                            'assetID'		            =>$itemID[$count],
                            'assetName'		            =>$itemName[$count],
                            'barcode'		            =>$barcode[$count],
                            'brand'                     =>$brand[$count],
                            'categoryName'              =>$categoryName[$count],
                            'classificationName'        =>$classificationName[$count],
                            'expirationdate'            =>$expirationdate[$count],
                            'inventoryCode'             =>$inventoryCode[$count],
                            'inventoryStorageCode'      =>$inventoryStorageCode[$count],
                            'inventoryStorageID'        =>$inventoryStorageID[$count],
                            'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$count],
                            'manufactureDate'           =>$manufactureDate[$count],
                            'quantity'                  =>$quantity[$count],
                            'quantityForStockin'        =>$quantity[$count],
                            'serialNumber'              =>$serialnumber[$count],
                            'uom'                       =>$uom
                           

                        
                );
                // $barcode = $barcode[$count].".png";
                // QRcode::png($barcode);
                // "<center><img src=".`${base_url}`.$barcode."></center";
                } 
             
                $this->db->insert_batch('ims_stock_in_assets_tbl', $record);
               

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


        }    
      
        // $query = $this->db->query("SELECT IFNULL(isi.itemID,'0') as itemID, isi.itemName,isit.itemName as totalitemname, (sum(stockInQuantity) + SUM(IFNULL(quantity,0))) AS quantity, stockInLocationID, isi.barcode FROM ims_stock_in_tbl AS isi
        // LEFT JOIN ims_stock_in_total_tbl AS isit ON isi.itemID = isit.itemID AND  isi.stockInLocationID = isit.inventoryStorageID WHERE isi.stockinID =$insert_id GROUP BY itemID, stockInLocationID");

        //     foreach ($query->result() as $row)
        //     {
        //         $totalitemname                  =$row->totalitemname;
        //         $itemID                         = $row->itemID;
        //         $barcode                        =$row->barcode;
        //         $itemName                       = $row->itemName;
        //         $quantity                       =$row->quantity;
        //         $stockInLocationID              =$row->stockInLocationID;

        //         $array = array('itemID' => $row->itemID, 'inventoryStorageID' => $row->stockInLocationID);
        //         $data = array(
        //                 'itemID'                => $itemID,
        //                 'barcode'               => $barcode,
        //                 'itemName'              => $itemName,
        //                 'quantity'              => $quantity,
        //                 'inventoryStorageID'    =>$stockInLocationID);
        //                 if($row->totalitemname =="" || $row->totalitemname ==NULL){
        //                     $this->db->insert('ims_stock_in_total_tbl',$data);   
        //                 }else{
        //                     $this->db->where($array);  
        //                     $this->db->update("ims_stock_in_total_tbl", $data);  
                            
        //                 }            
        //     }
        // return "true|Inventory Stock In Successfully";   
        //  }else{
             
        //     //print_r("wilson");
        //     //exit;
        // //kung may serial serial
        // //kung may serial serial
        // $record  = array();
        // $insert_id = "";
        // if(is_array($barcode)){ 
        //     if(count($barcode)!=0){
        //     for($count = 0; $count<count($barcode); $count++)
        //     {
        //      $record[$count] = array(
        //                 'inventoryReceivingID'		=>$receivedID,
        //                 'itemID'		            =>$itemID,
        //                 'itemName'		            =>$itemName,
        //                 'barcode'		            =>$barcode[$count],
        //                 'stockInSerialNumber'		=>$serialnumber[$count],
        //                 'stockInQuantity'           =>$recievedQuantity[$count],
        //                 'stockInLocationID'         =>$inventoryStorageID[$count],
        //                 'manufacturedDate'          =>$manufactureDate[$count],
        //                 'expirationDate'            =>$expirationdate[$count]);
        //     } 
        //     $this->db->insert_batch('ims_stock_in_tbl', $record);
        //     $id = $this->db->insert_id();

        //     $query = $this->db->query("SELECT IFNULL(isi.itemID,'0') as itemID, isi.itemName,isit.itemName as totalitemname, (sum(stockInQuantity) + IFNULL(quantity,0)) AS quantity, stockInLocationID, isi.barcode 
        //     FROM ims_stock_in_tbl AS isi
        //     LEFT JOIN ims_stock_in_total_tbl AS isit ON isi.itemID = isit.itemID AND  isi.stockInLocationID = isit.inventoryStorageID
        //     WHERE isi.inventoryReceivingID =$receivedID  AND isi.barcode IN('$barcode1') GROUP BY isi.barcode");
    
        //         foreach ($query->result() as $row)
        //         {
        //             $totalitemname                  =$row->totalitemname;
        //             $itemID                        = $row->itemID;
        //             $barcode                        =$row->barcode;
        //             $itemName                       = $row->itemName;
        //             $quantity                       =$row->quantity;
        //             $stockInLocationID              =$row->stockInLocationID;
    
        //             $array = array('barcode' => $row->barcode);
        //             $data = array(
        //                     'itemID'                => $itemID,
        //                     'barcode'               => $barcode,
        //                     'itemName'              => $itemName,
        //                     'quantity'              => $quantity,
        //                     'inventoryStorageID'    =>$stockInLocationID);
        //                     if($row->totalitemname =="" || $row->totalitemname ==null){
        //                         $this->db->insert('ims_stock_in_total_tbl',$data);   
        //                     }else{
        //                         $this->db->where($array);  
        //                         $this->db->update("ims_stock_in_total_tbl", $data);  
                                
        //                     }            
        //         }
        //     return "true|Inventory Stock In Successfully";   
        // }
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