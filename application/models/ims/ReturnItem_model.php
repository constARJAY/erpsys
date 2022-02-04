<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReturnItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savereturnitemData($action, $data, $id = null) 
    {
        //    echo "<pre>";
    //     print_r($data);
        if ($action == "insert") {
            $query = $this->db->insert(" ims_return_item_tbl", $data);
        } else {
            $where = ["returnItemID " => $id];
            $query = $this->db->update(" ims_return_item_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $sql = "SELECT * FROM ims_return_item_tbl WHERE returnItemID   = $insertID";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
            foreach ($result as $res) {
                $createdAt      = $res["createdAt"];
              $data = array(
                'returnItemCode' => getFormCode("RI", $createdAt, $id));
                // $dataRecord = array(
                //     'inventoryCode' => getFormCode("RI", $createdAt, $id));
              $this->db->where('returnItemID', $id);
              $this->db->update('ims_return_item_tbl', $data);
            //   $this->db->where('returnItemID', $id);
            //   $this->db->update('ims_inventory_request_details_tbl', $dataRecord);
            } 
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteItemAndSerial($id = 0)
    {
        $query1 = $this->db->delete("ims_inventory_request_details_tbl", ["returnItemID " => $id]);
        $query2 = $this->db->delete("ims_inventory_request_serial_tbl", ["returnItemID " => $id]);
        return $query1 && $query2 ? true : false;
    }

    public function saveScopes($scopes = null)
    {
        $query = $this->db->insert_batch("ims_inventory_request_serial_tbl", $scopes);
        return $query ? true : false;
    }

    public function saveServices($service = null, $id = null,$itemID=null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service) {
            $query = $this->db->insert("ims_inventory_request_details_tbl", $service);
        }
        return false;
    }
    public function saveSerial( $scopes = null, $returnItemID) {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($scopes) {
         
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {

                    // if($itemID == $scope["itemID"]){
                        $temp = [
                            "returnItemID"          => $returnItemID,
                            "serialNumber"          => $scope["serialNumber"],
                            "itemID"                => $scope["serialitemID"] != "null" ? $scope["serialitemID"] : null,
                            "createdBy"            => $sessionID,
                            "updatedBy"            => $sessionID,
                        ];
                        array_push($scopeData, $temp);
                    // }

                        //  echo "<pre>";
                        //     print_r($$scopes);
                }
                $saveScopes = $this->saveScopes($scopeData);
                if ($saveScopes) {
                    return true;
                }
        }
        return false;
    }


    // public function updateOrderedPending($returnItemID  = null)
    // {
    //     if ($returnItemID ) {
    //         $sql = "SELECT * FROM ims_inventory_request_details_tbl WHERE returnItemID  = $returnItemID ";
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
