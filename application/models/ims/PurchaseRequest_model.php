<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_purchase_request_tbl", $data);
        } else {
            $where = ["purchaseRequestID" => $id];
            $query = $this->db->update("ims_purchase_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($purchaseRequestID, $costEstimateID) {
        $whereCE = $costEstimateID ?? "IS NULL";
        $query = $this->db->delete(
            "ims_request_items_tbl", 
            [
                "purchaseRequestID" => $purchaseRequestID,
                "costEstimateID" => $whereCE
            ]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($action, $data, $purchaseRequestID = null, $costEstimateID = null)
    {
        // if ($purchaseRequestID && !$costEstimateID) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($purchaseRequestID, $costEstimateID);

            $query = $this->db->insert_batch("ims_request_items_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        // } else {
        //     foreach ($data as $item) {
        //         $requestItemID = $item["requestItemID"];
        //         if ($requestItemID) {
        //             unset($item["requestItemID"]);
        //             $this->db->update(
        //                 "ims_request_items_tbl", 
        //                 $item, 
        //                 ["requestItemID" => $requestItemID]);
        //         } else {
        //             $this->db->insert("ims_request_items_tbl", $item);
        //         }
        //     }
        //     return "true|Successfully submitted";
        // }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    // public function savePurchaseRequestItems($action, $data, $purchaseRequestID = null, $costEstimateID = null)
    // {
    //     if (($purchaseRequestID && !$costEstimateID)) {
    //         $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($purchaseRequestID);
    //     }
    //     $query = $this->db->insert_batch("ims_request_items_tbl", $data);
    //     if ($query) {
    //         return "true|Successfully submitted";
    //     }
    //     return "false|System error: Please contact the system administrator for assistance!";
    // }

}
