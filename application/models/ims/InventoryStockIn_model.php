<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryStockIn_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function getStockIn()
    {
        $query = $this->db->query("SELECT '1' AS module, iri.returnItemID as ID, '' AS purchaseID, returnItemCode as referenceCode, 
                                CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname,SUM(quantity) AS quantity,
                                DATE_FORMAT(iri.createdAt,'%M% %d%, %Y') AS daterequest 
                                FROM ims_return_item_tbl AS iri
                                LEFT JOIN ims_inventory_request_details_tbl AS ird ON iri.returnItemID = ird.returnItemID
                                LEFT JOIN hris_employee_list_tbl AS empl ON iri.employeeID = empl.employeeID
                                WHERE returnItemStatus = 2
                                GROUP BY iri.returnItemID
                                UNION ALL
                                SELECT '2' AS module, muf.materialUsageID AS ID, '' AS purchaseID, materialUsageCode as referenceCode, 
                                CONCAT(empl.employeeFirstname,' ',empl.employeeLastname) AS fullname, SUM(unused) AS quantity,
                                DATE_FORMAT(muf.createdAt,'%M% %d%, %Y') AS daterequest  
                                FROM ims_material_usage_tbl AS muf
                                LEFT JOIN ims_inventory_request_details_tbl AS ird ON ird.materialUsageID = muf.materialUsageID
                                LEFT JOIN hris_employee_list_tbl AS empl ON muf.employeeID = empl.employeeID
                                WHERE materialUsageStatus = 2
                                GROUP BY muf.materialUsageID");
		return $query->result();

    }

    public function savestockin($itemID, $itemName,$brand, $classificationName, $categoryName,$barcode,$recievedQuantity,$serialnumber,$inventoryStorageID, $inventoryStorageCode, $inventoryStorageOfficeName, $manufactureDate, $expirationdate, $ReturnItemID, $MaterialUsageID,  $InventoryReceivingID, $recordID, $quantity, $inventoryCode)
    {

       // $recordID       = implode(",", $recordID);
       
        if($recordID =='0'){
            $record  = array();
           // $insert_id = "";
            if(is_array($barcode)){ 
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
                 $record[$count] = array
                 (
                            'ReturnItemID'		        =>$ReturnItemID[$count],
                            'MaterialUsageID'		    =>$MaterialUsageID[$count],
                            'InventoryReceivingID'		 =>$InventoryReceivingID[$count],
                            'barcode'		            =>$barcode[$count],
                            'itemID'		            =>$itemID[$count],
                            'itemName'		            =>$itemName[$count],
                            'brand'                     =>$brand[$count],
                            'inventoryStorageID'        =>$inventoryStorageID[$count],
                            'classificationName'        =>$classificationName[$count],
                            'categoryName'              =>$categoryName[$count],
                            'inventoryStorageCode'      =>$inventoryStorageCode[$count],
                            'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$count],
                            "manufactureDate"           =>$manufactureDate[$count],
                            "expirationdate"            =>$expirationdate[$count],
                            "quantity"                  =>$quantity[$count],
                            "serialNumber"              =>$serialnumber[$count],
                            "inventoryCode"             =>$inventoryCode


                        
                );
                } 
                $this->db->insert_batch('ims_stock_in_item_tbl', $record);
               
                }
            }
        }else{

            $record  = array();
           // $insert_id = "";
            if(is_array($barcode)){ 
                if(count($barcode)!=0){
                for($count = 0; $count<count($barcode); $count++)
                {
                 $record[$count] = array
                 (
                            'ReturnItemID'		        =>$ReturnItemID[$count],
                            'MaterialUsageID'		    =>$MaterialUsageID[$count],
                            'InventoryReceivingID'		 =>$InventoryReceivingID[$count],
                            'barcode'		            =>$barcode[$count],
                            'itemID'		            =>$itemID[$count],
                            'itemName'		            =>$itemName[$count],
                            'brand'                     =>$brand[$count],
                            'inventoryStorageID'        =>$inventoryStorageID[$count],
                            'classificationName'        =>$classificationName[$count],
                            'categoryName'              =>$categoryName[$count],
                            'inventoryStorageCode'      =>$inventoryStorageCode[$count],
                            'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$count],
                            "manufactureDate"           =>$manufactureDate[$count],
                            "expirationdate"            =>$expirationdate[$count],
                            "quantity"                  =>$quantity[$count],
                            "serialNumber"              =>$serialnumber[$count],
                            "inventoryCode"             =>$inventoryCode

                        
                );
                } 
                $this->db->insert_batch('ims_stock_in_assets_tbl', $record);
               
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
                SELECT quantity ,barcode FROM ims_stock_in_item_tbl
                WHERE inventoryCode ='".$referenceCode."' AND itemID = ".$itemID."
                UNION ALL 
                SELECT quantity ,barcode FROM ims_stock_in_assets_tbl
                WHERE inventoryCode = '".$referenceCode."' AND itemID = ".$itemID."";
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