<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryReceiving_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }



    public function saveInventoryReceivingData($action, $data, $id = null) 
    {
        //    echo "<pre>";
    //     print_r($data);
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_receiving_tbl", $data);
        } else {
            $where = ["inventoryReceivingID" => $id];
            $query = $this->db->update("ims_inventory_receiving_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $sql = "SELECT * FROM ims_inventory_receiving_tbl WHERE inventoryReceivingID   = $insertID";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
            foreach ($result as $res) {
                $createdAt      = $res["createdAt"];
              //$data   = ["materialUsageCode" => getFormCode("MUF", $createdAt, $id)];
              $data = array(
                'inventoryReceivingCode' => getFormCode("INR", $createdAt, $id));
              $this->db->where('inventoryReceivingID', $id);
              $this->db->update('ims_inventory_receiving_tbl', $data);
            } 
            // ----- UPDATE ORDERED PENDING -----
            // if ($data["inventoryReceivingStatus"] == 2) {
            //     $updateOrderedPending = $this->updateOrderedPending($insertID);
            // }
            // ----- END UPDATE ORDERED PENDING -----

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteItemAndSerial($id = 0)
    {
        $query1 = $this->db->delete("ims_inventory_request_details_tbl", ["inventoryReceivingID" => $id]);
        $query2 = $this->db->delete("ims_inventory_request_serial_tbl", ["inventoryReceivingID" => $id]);
        return $query1 && $query2 ? true : false;
    }

    public function saveScopes($scopes = null)
    {
        $query = $this->db->insert_batch("ims_inventory_request_serial_tbl", $scopes);
        return $query ? true : false;
    }

    public function saveServices($service = null, $scopes = null, $id = null,$itemID=null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service) {
            $query = $this->db->insert("ims_inventory_request_details_tbl", $service);
        }
        return false;
    }
    public function updateInventoryReceiving($tableName,$data, $reference){
        $query =  $this->db->update($tableName, $data, $reference);  //"id = 4"
        return $query;
    }

    public function saveSerial( $scopes = null, $inventoryReceivingID)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($scopes) {
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {

                    // if($itemID == $scope["itemID"]){
                        $temp = [
                            "inventoryReceivingID"  => $inventoryReceivingID,
                            "serialNumber"          => $scope["serialNumber"],
                            "itemID"                => $scope["serialitemID"] != "null" ? $scope["serialitemID"] : null,
                            "createdBy"             => $sessionID,
                            "updatedBy"             => $sessionID,
                        ];
                        array_push($scopeData, $temp);
                }
                $saveScopes = $this->saveScopes($scopeData);
                if ($saveScopes) {
                    return true;
                }
        }
        return false;
    }


    // public function updateOrderedPending($inventoryReceivingID = null)
    // {
    //     if ($inventoryReceivingID) {
    //         $sql = "SELECT * FROM ims_inventory_request_details_tbl WHERE inventoryReceivingID = $inventoryReceivingID";
    //         $query = $this->db->query($sql);
    //         $result = $query ? $query->result_array() : [];
    //         foreach ($result as $res) {
    //             $requestItemID = $res["requestItemID"];
    //             $received      = $res["received"];
    //             $sql2    = "SELECT orderedPending, forPurchase FROM ims_request_items_tbl WHERE requestItemID = $requestItemID";
    //             $query2  = $this->db->query($sql2);
    //             $result2 = $query2 ? $query2->row() : false;
    //             if ($result2) {
    //                 $oldOrderedPending = $result2->orderedPending && $result2->orderedPending != null ? $result2->orderedPending : $result2->forPurchase;
    //                 $newOrderedPending = $oldOrderedPending - $received;
    //                 $data   = ["orderedPending" => $newOrderedPending];
    //                 $query3 = $this->db->update("ims_request_items_tbl", $data, ["requestItemID" => $requestItemID]);
    //             }
    //         }
    //         return true;
    //     }
    //     return false;
    // }
    
}