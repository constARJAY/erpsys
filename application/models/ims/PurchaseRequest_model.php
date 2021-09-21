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
            $purchaseRequestCode = "";
            if ($action == "insert") {
                $purchaseRequestCode = getFormCode("PR", date("Y-m-d"), $insertID);
                $this->db->update("ims_purchase_request_tbl", ["purchaseRequestCode" => $purchaseRequestCode], ["purchaseRequestID" => $insertID]);
            }
            return "true|$purchaseRequestCode|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($purchaseRequestID, $classification) {
        if ($classification) {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $query = $this->db->delete(
                $table, 
                [
                    "materialRequestID"     => NULL,
                    "inventoryValidationID" => NULL,
                    "bidRecapID"            => NULL,
                    "purchaseRequestID"     => $purchaseRequestID,
                    "purchaseOrderID"       => NULL,
                ]);
            return $query ? true : false;
        }
        return true;
    }

    public function savePurchaseRequestItems($action, $data, $id = null, $classification = "")
    {
        $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id, $classification);
        if ($classification) {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $query = $this->db->insert_batch($table, $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

}
