<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryReceiving_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }



    public function saveInventoryReceivingData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_receiving_tbl", $data);
        } else {
            $where = ["inventoryReceivingID" => $id];
            $query = $this->db->update("ims_inventory_receiving_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;

            // ----- UPDATE ORDERED PENDING -----
            // if ($data["inventoryReceivingStatus"] == 2) {
            //     $insertToServiceOrder = $this->saveServiceOrder($insertID);
            // }
            // ----- END UPDATE ORDERED PENDING -----

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteServicesAndScopes($id = 0)
    {
        $query1 = $this->db->delete("ims_inventory_receiving_details_tbl", ["inventoryReceivingID" => $id]);
        $query2 = $this->db->delete("ims_receiving_serial_number_tbl", ["inventoryReceivingID" => $id]);
        return $query1 && $query2 ? true : false;
    }

    public function saveScopes($scopes = null)
    {
        $query = $this->db->insert_batch("ims_receiving_serial_number_tbl", $scopes);
        return $query ? true : false;
    }

    public function saveServices($service = null, $scopes = null, $id = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service && $scopes) {
            $query = $this->db->insert("ims_inventory_receiving_details_tbl", $service);
            if ($query) {
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {
                    $temp = [
                        "inventoryReceivingID" => $id,
                        "inventoryReceivingDetailsID"=> $insertID,
                        "serialNumber"          => $scope["serialNumber"],
                        "itemID"             => $scope["itemID"],
                        "createdBy"            => $sessionID,
                        "updatedBy"            => $sessionID,
                    ];
                    array_push($scopeData, $temp);
                }
                $saveScopes = $this->saveScopes($scopeData);
                if ($saveScopes) {
                    return true;
                }
            }
        }
        return false;
    }

    public function updateOrderedPending($scopes,$service){

        $itemID =  $service[0]["itemID"];
        $purchaseOrderID =   $service[0]["purchaseOrderID"];

        
        $query = $this->db->query("SELECT orderedPending
        FROM ims_request_items_tbl as irit  
        LEFT JOIN  ims_purchase_request_tbl as iprt ON iprt.purchaseRequestID  = irit.purchaseRequestID
        LEFT JOIN  ims_purchase_order_tbl as ipot ON ipot.purchaseRequestID =  iprt.purchaseRequestID 
        WHERE
        ipot.purchaseOrderID = $purchaseOrderID AND irit.itemID = $itemID;
        ");

        $getOrderedPendingOld = $query->row()->orderedPending; // get the old orderedPending

        $passedRemainingOrdered = $getOrderedPendingOld - $service[0]['itemID'];

        $query = $this->db->query("UPDATE ims_request_items_tbl as irit  
        LEFT JOIN  ims_purchase_request_tbl as iprt ON iprt.purchaseRequestID  = irit.purchaseRequestID
        LEFT JOIN  ims_purchase_order_tbl as ipot ON ipot.purchaseRequestID =  iprt.purchaseRequestID 
        SET orderedPending = $passedRemainingOrdered;
        WHERE ipot.purchaseOrderID = $purchaseOrderID AND irit.itemID= $itemID;
        ");
    }
    
}
