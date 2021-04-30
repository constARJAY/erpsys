<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryValidation_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveInventoryValidationData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_validation_tbl", $data);
        } else {
            $where = ["inventoryValidationID" => $id];
            $query = $this->db->update("ims_inventory_validation_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteInventoryValidationItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["inventoryValidationID" => $id]);
        return $query ? true : false;
    }

    public function saveInventoryValidationItems($data, $id = null){
        // if ($id) {
        //     $deleteInventoryValidationItems = $this->deleteInventoryValidationItems($id);
        // }

        $query = $this->db->update_batch("ims_request_items_tbl", $data, "requestItemID");
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveCanvassingData($id){
        $sql    = "SELECT * FROM ims_inventory_validation_tbl WHERE inventoryValidationID = '$id'";
        $query  = $this->db->query($sql);
        $result = $query->result_array();
        $projectID  =  $result[0]["projectID"];
        $inventoryValidationID = $id;
        $createdBy      = $result[0]["createdBy"];
        $updatedBy      = $result[0]["updatedBy"];
            $insertSql  = "INSERT INTO ims_inventory_canvassing_tbl SET
                            `projectID`      = '$projectID',
                            `inventoryValidationID` = '$inventoryValidationID',
                            `referenceCode`  = '$inventoryValidationID',
                            `createdBy`      = '$createdBy',
                            `updatedBy`      = '$updatedBy',
                            `inventoryCanvassingStatus` = '5'
                        ";
            $insertQuery =  $this->db->query($insertSql);
            return $insertQuery ? true : false;
         
    }
}
