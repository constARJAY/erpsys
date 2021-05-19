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
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;   
            if($data["bidRecapStatus"] == "2"){
                $this->creatingPO($id);
                $this->insertBidItems($id);
            }         
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
         $sql            = "SELECT * FROM `ims_request_items_tbl` WHERE bidRecapID = '$id' GROUP BY categoryType, inventoryVendorID";
         $query          = $this->db->query($sql);
         $lastPOQuery    = $this->db->query("SELECT referencePurchaseOrderID FROM ims_request_items_tbl ORDER BY referencePurchaseOrderID  DESC LIMIT 1");
         $lastPOResult   = $lastPOQuery->result_array();
         $lastPO         = $lastPOResult[0]["referencePurchaseOrderID"] ? $lastPOResult[0]["referencePurchaseOrderID"] : 0;
         $categoryArr    = array("company","project");
            foreach($categoryArr AS $category){
                $lastPO +=1;
                foreach($query->result_array() as $row){
                    $inventoryVendorID  = $row["inventoryVendorID"];
                    $itemsQuery         = $this->db->query("UPDATE ims_request_items_tbl SET `referencePurchaseOrderID` = '$lastPO' WHERE bidRecapID = '$id' AND inventoryVendorID = '$inventoryVendorID' AND categoryType = '$category' ");
                }
            }

        
    }




    // ----- INSERT BID ITEMS -----
    public function getBidItems($bidRecapID = null)
    {
        if ($bidRecapID) {
            $sql   = "
            SELECT 
                * 
            FROM 
                ims_request_items_tbl 
            WHERE 
                referencePurchaseOrderID IS NOT NULL AND
                bidRecapID = $bidRecapID AND 
                purchaseOrderID IS NULL 
            GROUP BY 
                bidRecapID, inventoryVendorID, categoryType";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function insertBidItems($bidRecapID = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if ($bidRecapID) {
            $bidItems = $this->getBidItems($bidRecapID);
            $data = [];
            foreach ($bidItems as $item) {
                $temp = [
                    "bidRecapID"        => $bidRecapID,
                    "inventoryVendorID" => $item["inventoryVendorID"],
                    "categoryType"      => $item["categoryType"],
                    "bidPoStatus"       => 0,
                    "createdBy"         => $sessionID,
                    "updatedBy"         => $sessionID,
                ];
                array_push($data, $temp);
            }
            if (count($data) > 0) {
                $query = $this->db->insert_batch("ims_bid_po_tbl", $data);
                return $query ? true : false;
            }
        }
        return false;
    }
    // ----- END INSERT BID ITEMS -----
    
}
