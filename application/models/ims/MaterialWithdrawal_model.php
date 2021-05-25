<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MaterialWithdrawal_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_material_withdrawal_tbl", $data);
        } else {
            $where = ["materialWithdrawalID" => $id];
            $query = $this->db->update("ims_material_withdrawal_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_material_withdrawal_details_tbl", ["materialWithdrawalID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_material_withdrawal_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateStorage() {
        $items = $this->input->post("items");

        // foreach($items as  $values){
       
        // $getStorageID = $values['inventoryStorageID']; 
        // $getItemID = $values['itemID'];         
        // $getQuantity = $values['quantity'];  


        // $getStorage = $this->db->query("SELECT 
        // receivingQuantity
        // FROM ims_list_stocks_tbl 
        // LEFT JOIN ims_list_stocks_details_tbl USING(listStocksID) 
        // LEFT JOIN ims_inventory_storage_tbl USING(inventoryStorageID)
        // WHERE inventoryStorageID = '$getStorageID' AND itemID = '$getItemID' ");

        // $senderQuantity = $getStorage->row()->receivingQuantity; // get the old quantity of sender storage 

        // $changeStorageSenderQuantity = $senderQuantity - $getQuantity; // deduct the old quantity of sender storage

        // $this->db->query("UPDATE ims_list_stocks_tbl   
        // LEFT JOIN ims_list_stocks_details_tbl USING(listStocksID) 
        // LEFT JOIN ims_inventory_storage_tbl USING(inventoryStorageID)
        // SET receivingQuantity = $changeStorageSenderQuantity
        // WHERE inventoryStorageID = '$getStorageID' AND itemID = '$getItemID'");

        // }

        $sql = $this->db->query("SELECT iidd.materialWithdrawalID ,iidd.itemID,iidd.inventoryStorageID, (isit.quantity - iidd.quantity) as totalquantity
        FROM ims_material_withdrawal_details_tbl AS iidd
        LEFT JOIN ims_material_withdrawal_tbl AS iid ON iidd.materialWithdrawalID  = iid.materialWithdrawalID 
        LEFT JOIN ims_stock_in_total_tbl AS  isit ON iidd.itemID = isit.itemID AND iidd.inventoryStorageID = isit.inventoryStorageID 
        WHERE iid.materialWithdrawalID = $insertID AND iid.materialWithdrawalStatus =2");
        foreach ($sql->result() as $row)
        {
            $quantity                           =$row->totalquantity;
            $itemID                             = $row->itemID;
            $inventoryStorageID                 =$row->inventoryStorageID;
            $array = array('itemID' => $row->itemID, 'inventoryStorageID' => $row->inventoryStorageID);
           
            $data = array(
                'quantity'            => $quantity);
            $this->db->where($array);  
            $this->db->update("ims_stock_in_total_tbl", $data);  
        }    
        return true;
    }

}
