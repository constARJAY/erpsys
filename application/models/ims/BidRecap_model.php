<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BidRecap_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBidRecapData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_bid_recap_tbl", $data);
        } else {
            $where = ["bidRecapID" => $id];
            $query = $this->db->update("ims_bid_recap_tbl", $data, $where);
        }

        if ($query) {
            if($data["bidRecapStatus"] == "2"){
                $this->creatingPO($id);
            }
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;            
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBidRecapItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["bidRecapID" => $id]);
        return $query ? true : false;
    }

    public function saveBidRecapItems($data, $id = null){
        if ($id) {
            $deleteBidRecapItems = $this->deleteBidRecapItems($id);
        }

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function creatingPO($id){
        // WHERE bidRecapID = $id AND inventoryVendorID = $vendorID;
         $sql            = "SELECT * FROM `ims_request_items_tbl` WHERE bidRecapID = '$id' GROUP BY inventoryVendorID";
         $query          = $this->db->query($sql);
         $lastPOQuery    = $this->db->query("SELECT purchaseOrderID FROM ims_request_items_tbl ORDER BY purchaseOrderID  DESC LIMIT 1");
         $lastPOResult   = $lastPOQuery->result_array();
         $lastPO         = $lastPOResult[0]["purchaseOrderID"] ? $lastPOResult[0]["purchaseOrderID"] : 1;
            foreach($query->result_array() as $row){
                $poID               = $lastPO ++;
                $inventoryVendorID  = $row["inventoryVendorID"];
                $itemsQuery         = $this->db->query("UPDATE ims_request_items_tbl SET `purchaseOrderID` = '$poID' WHERE bidRecapID = '$id' AND inventoryVendorID = '$inventoryVendorID'");
            }
    }
    
}
