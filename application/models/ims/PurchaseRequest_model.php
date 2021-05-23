<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function brandName($itemID = null) 
    {
        $sql   = "SELECT brandName FROM ims_inventory_item_tbl WHERE itemID = $itemID";
        $query = $this->db->query($sql);
        if ($query) {
            $result = $query->row();
            return $result ? $result->brandName : null;
        }
        return null;
    }

    public function updateRequestItemsBrandName($purchaseRequestID = null)
    {
        $sql = "
        SELECT 
            * 
        FROM 
            ims_request_items_tbl 
        WHERE 
            purchaseRequestID = $purchaseRequestID AND
            inventoryValidationID IS NULL AND
            purchaseOrderID IS NULL AND 
            bidRecapID IS NULL AND
            itemID IS NOT NULL";
        $queryGetRequestItems = $this->db->query($sql);
        if ($queryGetRequestItems) {
            $items = $queryGetRequestItems->result_array();
            foreach ($items as $item) {
                $requestItemID = $item["requestItemID"];
                $itemID        = $item["itemID"];
                $brandName     = $this->brandName($itemID);
                $queryQuery    = $this->db->update("ims_request_items_tbl", ["brandName" => $brandName], ["requestItemID" => $requestItemID]);
            }
        }
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

    public function deletePurchaseRequestItems($purchaseRequestID, $billMaterialID) {
        $whereBOM = $billMaterialID ?? NULL;
        $query = $this->db->delete(
            "ims_request_items_tbl", 
            [
                "billMaterialID"         => $whereBOM,
                "purchaseRequestID"      => $purchaseRequestID,
                "purchaseOrderID "       => NULL,
                "inventoryValidationID " => NULL,
                "bidRecapID "            => NULL
            ]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($action, $data, $purchaseRequestID = null, $billMaterialID = null)
    {
        $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($purchaseRequestID, $billMaterialID);

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
