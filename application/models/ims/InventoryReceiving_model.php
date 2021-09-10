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

            // ----- UPDATE ORDERED PENDING -----
            if ($data["inventoryReceivingStatus"] == 2) {
                $updateOrderedPending = $this->updateOrderedPending($insertID);
            }
            // ----- END UPDATE ORDERED PENDING -----

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteItemAndSerial($id = 0)
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

    public function saveServices($service = null, $scopes = null, $id = null, $itemID = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service) {
            $query = $this->db->insert("ims_inventory_receiving_details_tbl", $service);
            if ($query) {
                $insertID  = $this->db->insert_id();
                if($scopes){
                    $scopeData = [];
                    foreach ($scopes as $scope) {
                            $temp = [
                                "inventoryReceivingID"          => $id,
                                "inventoryReceivingDetailsID"   => $insertID,
                                "serialNumber"                  => $scope["serialNumber"],
                                "itemID"                        => $scope["itemID"],
                                "createdBy"                     => $sessionID,
                                "updatedBy"                     => $sessionID,
                            ];
                            array_push($scopeData, $temp);
                    }

                    $saveScopes = $this->saveScopes($scopeData);
                    if ($saveScopes) {
                        return true;
                    }
                }else{
                    $temp = [
                        "inventoryReceivingID"          => $id,
                        "inventoryReceivingDetailsID"   => $insertID,
                        "itemID"                        => $itemID,
                        "createdBy"                     => $sessionID,
                        "updatedBy"                     => $sessionID,
                    ];
                    $this->db->insert("ims_receiving_serial_number_tbl", $temp);
                }
            }
        }
        return false;
    }

    public function saveNonSerial($data = []){
        
    }

    public function updateOrderedPending($inventoryReceivingID = null)
    {
        if ($inventoryReceivingID) {
            $sql = "SELECT * FROM ims_inventory_receiving_details_tbl WHERE inventoryReceivingID = $inventoryReceivingID";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
            foreach ($result as $res) {
                $requestItemID = $res["requestItemID"];
                $received      = $res["received"];
                $sql2    = "SELECT orderedPending, forPurchase FROM ims_request_items_tbl WHERE requestItemID = $requestItemID";
                $query2  = $this->db->query($sql2);
                $result2 = $query2 ? $query2->row() : false;
                if ($result2) {
                    $oldOrderedPending = $result2->orderedPending && $result2->orderedPending != null ? $result2->orderedPending : $result2->forPurchase;
                    $newOrderedPending = $oldOrderedPending - $received;
                    $data   = ["orderedPending" => $newOrderedPending];
                    $query3 = $this->db->update("ims_request_items_tbl", $data, ["requestItemID" => $requestItemID]);
                }
            }
            return true;
        }
        return false;
    }




    public function updateInventoryReceiving($tableName,$data, $reference){
        $query =  $this->db->update($tableName, $data, $reference);  //"id = 4"
        return $query;
    }
    
}