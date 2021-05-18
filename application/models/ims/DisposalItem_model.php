<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisposalItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveDisposalItemData($action, $data, $id = null,$disposalStatus) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_disposal_tbl", $data);
        } else {
            $where = ["disposalID" => $id];
            $query = $this->db->update("ims_inventory_disposal_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $sql = $this->db->query("SELECT iidd.disposalID,iidd.itemID,iidd.inventoryStorageID, (isit.quantity - iidd.quantity) as totalquantity
            FROM ims_inventory_disposal_details_tbl AS iidd
            LEFT JOIN ims_inventory_disposal_tbl AS iid ON iidd.disposalID = iid.disposalID
            LEFT JOIN ims_stock_in_total_tbl AS  isit ON iidd.itemID = isit.itemID AND iidd.inventoryStorageID = isit.inventoryStorageID 
            WHERE iid.disposalID= $insertID AND iid.disposalStatus =2");
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
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteDisposalItems($id) {
        $query = $this->db->delete("ims_inventory_disposal_details_tbl", ["disposalID" => $id]);
        return $query ? true : false;
    }

    public function saveDisposalItems($data, $id = null, $approversStatus)
    {
            if ($id) {
                $deletePurchaseRequestItems = $this->deleteDisposalItems($id);
            }
            $query = $this->db->insert_batch("ims_inventory_disposal_details_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
            return "false|System error: Please contact the system administrator for assistance!";
       
    }

}
