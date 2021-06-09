<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TransferRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null,$inventoryStorageIDSender = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_transfer_request_tbl", $data);
        } else {
            $where = ["transferRequestID" => $id];
            $query = $this->db->update("ims_transfer_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $query = $this->db->query("SELECT ist.barcode,concat(LEFT(iii.createdAt,2),'-',LPAD(iii.itemId,5,'0'),'00000') AS itemCode, IFNULL(isi.itemID,'0') as itemID, isi.itemName,isit.itemName as totalitemname, (sum(stockInQuantity) - SUM(IFNULL(isi.quantity,0))) AS quantity, stockInLocationID,ist.inventoryReceivingID 
            ,itr.inventoryStorageIDReceiver,itr.inventoryStorageIDSender FROM ims_transfer_request_details_tbl AS isi
            LEFT JOIN  ims_transfer_request_tbl as itr USING(transferRequestID)
            LEFT JOIN ims_inventory_item_tbl AS iii ON isi.itemID = iii.itemID
            LEFT JOIN ims_stock_in_tbl AS ist   ON isi.itemID = ist.itemID AND  itr.inventoryStorageIDSender = ist.stockInLocationID
            LEFT JOIN ims_stock_in_total_tbl AS isit ON isi.itemID = isit.itemID AND  itr.inventoryStorageIDSender = isit.inventoryStorageID 
            WHERE  itr.transferRequestID =$insertID AND transferRequestStatus = 2 GROUP BY isit.itemID, ist.stockInLocationID");

        foreach ($query->result() as $row)
        {
            $totalitemname                  =$row->totalitemname;
            $itemID                        = $row->itemID;
            $itemName                       = $row->itemName;
            $quantity                       =$row->quantity;
            $barcode                        =$row->barcode;
            $inventoryReceivingID           =$row->inventoryReceivingID;
            $itemCode                       =$row->itemCode;
            $inventoryStorageIDReceiver     =$row->inventoryStorageIDReceiver;
            $inventoryStorageIDSender     =$row->inventoryStorageIDSender;


            
            $newBarcode = str_pad($itemID, 5, '0',STR_PAD_LEFT).'-'.str_pad($inventoryStorageIDReceiver, 5, '0',STR_PAD_LEFT).'-'.'00000';

      

            $array = array('itemID' => $itemID, 'inventoryStorageID' => $inventoryStorageIDReceiver);
            // var_dump( $array);
           $array1 = array('itemID' => $row->itemID, 'stockInLocationID' => $inventoryStorageIDSender);
            $datatotal = array(
                    'itemID'            => $itemID,
                    'itemName'          => $itemName,
                    'quantity'          => $quantity,
                    'inventoryStorageID'  =>$inventoryStorageIDReceiver);

            $datain = array(
                'itemID'            => $itemID,
                'itemName'          => $itemName,
                'stockInQuantity'          => $quantity,
                'inventoryReceivingID'=>$inventoryReceivingID,
                'stockInLocationID'  =>$inventoryStorageIDSender,
                'barcode'           =>$newBarcode);   
     
               
                    if($inventoryStorageIDReceiver ==""){
                
               
                        $this->db->insert('ims_stock_in_total_tbl',$datatotal);  // --

                        $this->db->insert('ims_stock_in_tbl',$datain);  
                    }else{
                       // var_dump("34343".$array);
                       $this->db->insert('ims_stock_in_total_tbl',$datatotal); //--   
                        $this->db->where($array);  
                        $this->db->update("ims_stock_in_total_tbl", $datatotal);  

                        $this->db->where($array1);  
                        $this->db->update("ims_stock_in_tbl", $datain); 
                        
                    }            
        }
      //  exit;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_transfer_request_details_tbl", ["transferRequestID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_transfer_request_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    // public function updateStorage() {
    //     $items = $this->input->post("items");

    //     // echo "<pre>";
    //     // print_r($items);

    //     foreach($items as  $values){
       
    //     $getStorageSenderID = $values['inventoryStorageIDSender']; //get the sender storage id
    //     $getStorageReceiverID = $values['inventoryStorageIDReceiver']; //get the reciever storage id
    //     $getItemID = $values['itemID'];         //get the item id of the sender/receiver storage name
    //     $getQuantity = $values['quantity'];   //get the add/deduct quantity for both storage
    //     $getBarcode = $values['barcode'];   //get the add/deduct quantity for both storage
    //     // echo "StorageSender".$getStorageSenderID. "<br>";
    //     // echo "ItemID".$getItemID. "<br>";
    //     // echo "requestQuantity".$getQuantity. "<br>";

    //     $explode_barcode = explode(" ",$getBarcode);

    //     $newLocationBarcodeStorage = $getStorageReceiverID ? strval($id) : "0";
    //     $newLocationBarcodeStorage = strlen($newLocationBarcodeStorage) < 5 ? str_repeat("0", 5 - strlen($newLocationBarcodeStorage)).$newLocationBarcodeStorage : $newLocationBarcodeStorage;
        
    //     $newBarcode = $explode_barcode[0].'-'.newLocationBarcodeStorage.'-'.$explode_barcode[2];


    //     $getStorageSender = $this->db->query("SELECT 
    //     isit.quantity,isit.itemName
    //     FROM ims_stock_in_total_tbl AS isit
	// 			 LEFT JOIN ims_inventory_item_tbl 		AS iii 	ON isit.itemID = iii.itemID
	// 			 LEFT JOIN ims_inventory_storage_tbl 	AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
	// 			 LEFT JOIN ims_stock_in_tbl AS isi 				ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID
    //     WHERE 'barcode' = '$getBarcode' GROUP BY isit.itemID");

    //     $senderQuantity = $getStorageSender->row()->quantity; // get the old quantity of sender storage 
    //     $senderitemName = $getStorageSender->row()->itemName; // get the old itemname of sender storage 


    //     $changeStorageSenderQuantity = $senderQuantity - $getQuantity; // deduct the old quantity of sender storage

       

    //     if($senderitemName =="" || $senderitemName == null){
    //         $this->db->insert('ims_stock_in_total_tbl',$data); 
            
    //         $data = array(
    //             'itemID'            => $getItemID,
    //             'itemName'          => $itemName,
    //             'quantity'          => $changeStorageSenderQuantity,
    //             'inventoryStorageID'  =>$getStorageSenderID);

    //     }else{
    //         $this->db->query("UPDATE ims_stock_in_total_tbl   
    //         SET quantity = $changeStorageSenderQuantity
    //         WHERE inventoryStorageID = '$getStorageSenderID' AND itemID = '$getItemID'"); 
            
    //     }   

    //     $getStorageReceiver = $this->db->query("SELECT 
    //     quantity, itemName
    //     FROM ims_stock_in_total_tbl AS isit
	// 			 LEFT JOIN ims_inventory_item_tbl 		AS iii 	ON isit.itemID = iii.itemID
	// 			 LEFT JOIN ims_inventory_storage_tbl 	AS iis 	ON isit.inventoryStorageID = iis.inventoryStorageID
	// 			 LEFT JOIN ims_stock_in_tbl AS isi 				ON isit.itemID = isi.itemID AND isit.inventoryStorageID = isi.stockInLocationID
    //     WHERE 'barcode' = '$getBarcode' GROUP BY isit.itemID");

    //     $receiverQuantity = $getStorageReceiver->row()->quantity; // get the old quantity of sender storage 
    //     $receiveritemName = $getStorageReceiver->row()->itemName; // get the old itemname of sender storage  

    //     $changeStorageReceiverQuantity = $receiverQuantity + $getQuantity; // add the old quantity of receiver storage

    //     if(receiveritemName =="" || receiveritemName ==NULL){
    //         $this->db->insert('ims_stock_in_total_tbl',$data); 
            
    //         $data = array(
    //             'itemID'            => $getItemID,
    //             'itemName'          => $itemName,
    //             'quantity'          => $changeStorageReceiverQuantity,
    //             'inventoryStorageID'  =>$getStorageReceiverID);

    //     }else{
    //         $this->db->query("UPDATE ims_stock_in_total_tbl   
    //         SET quantity = $changeStorageReceiverQuantity
    //         WHERE inventoryStorageID = '$getStorageReceiverID' AND itemID = '$getItemID'"); 
            
    //     }   

    //     // echo "deduct quantity".$changeStorageSenderQuantity."<br>";

    //     // echo "old Storage Sender Quantity".$senderQuantity."<br>";
    //     }        
      
    //     return true;
    // }

}
