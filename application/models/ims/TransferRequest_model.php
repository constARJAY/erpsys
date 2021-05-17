<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TransferRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_transfer_request_tbl", $data);
        } else {
            $where = ["transferRequestID" => $id];
            $query = $this->db->update("ims_transfer_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
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

    public function updateStorage() {
        $items = $this->input->post("items");

        // echo "<pre>";
        // print_r($items);

        foreach($items as  $values){
       
        $getStorageSenderID = $values['inventoryStorageIDSender']; //get the sender storage id
        $getStorageReceiverID = $values['inventoryStorageIDReceiver']; //get the reciever storage id
        $getItemID = $values['itemID'];         //get the item id of the sender/receiver storage name
        $getQuantity = $values['quantity'];   //get the add/deduct quantity for both storage
        $getBarcode = $values['barcode'];   //get the add/deduct quantity for both storage
        // echo "StorageSender".$getStorageSenderID. "<br>";
        // echo "ItemID".$getItemID. "<br>";
        // echo "requestQuantity".$getQuantity. "<br>";

        $getStorageSender = $this->db->query("SELECT 
        quantity,itemName
        FROM ims_stock_in_total_tbl 
        WHERE inventoryStorageID = '$getStorageSenderID' AND itemID = '$getItemID' ");

        $senderQuantity = $getStorageSender->row()->quantity; // get the old quantity of sender storage 
        $senderitemName = $getStorageSender->row()->itemName; // get the old itemname of sender storage 


        $changeStorageSenderQuantity = $senderQuantity - $getQuantity; // deduct the old quantity of sender storage

       

        if(senderitemName =="" || senderitemName == null){
            $this->db->insert('ims_stock_in_total_tbl',$data); 
            
            $data = array(
                'itemID'            => $getItemID,
                'itemName'          => $itemName,
                'quantity'          => $changeStorageSenderQuantity,
                'inventoryStorageID'  =>$getStorageSenderID);

        }else{
            $this->db->query("UPDATE ims_stock_in_total_tbl   
            SET quantity = $changeStorageSenderQuantity
            WHERE inventoryStorageID = '$getStorageSenderID' AND itemID = '$getItemID'"); 
            
        }   

        $getStorageReceiver = $this->db->query("SELECT 
        quantity, itemName
        FROM ims_stock_in_total_tbl 
        WHERE inventoryStorageID = '$getStorageReceiverID' AND itemID = '$getItemID' ");

        $receiverQuantity = $getStorageReceiver->row()->quantity; // get the old quantity of sender storage 
        $receiveritemName = $getStorageReceiver->row()->itemName; // get the old itemname of sender storage  

        $changeStorageReceiverQuantity = $receiverQuantity + $getQuantity; // add the old quantity of receiver storage

        if(senderitemName =="" || senderitemName ==NULL){
            $this->db->insert('ims_stock_in_total_tbl',$data); 
            
            $data = array(
                'itemID'            => $getItemID,
                'itemName'          => $itemName,
                'quantity'          => $changeStorageReceiverQuantity,
                'inventoryStorageID'  =>$getStorageReceiverID);

        }else{
            $this->db->query("UPDATE ims_stock_in_total_tbl   
            SET quantity = $changeStorageReceiverQuantity
            WHERE inventoryStorageID = '$getStorageReceiverID' AND itemID = '$getItemID'"); 
            
        }   

        // echo "deduct quantity".$changeStorageSenderQuantity."<br>";

        // echo "old Storage Sender Quantity".$senderQuantity."<br>";
        }            
        return true;
    }

}
