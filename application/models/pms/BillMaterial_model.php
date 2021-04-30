<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BillMaterial_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBillMaterialData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_bill_material_tbl", $data);
        } else {
            $where = ["billMaterialID" => $id];
            $query = $this->db->update("pms_bill_material_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBillMaterialItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["billMaterialID" => $id]);
        return $query ? true : false;
    }

    public function updateBillMaterialItems($data){
        // if ($id) {
        //     $deleteBillMaterialItems = $this->deleteBillMaterialItems($id);
        // }

        $query = $this->db->update_batch("ims_request_items_tbl", $data, "requestItemID");
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    public function insertBillMaterialItems($data){
        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveCanvassingData($id){
        $sql    = "SELECT * FROM pms_bill_material_tbl WHERE billMaterialID = '$id'";
        $query  = $this->db->query($sql);
        $result = $query->result_array();
        $projectID  =  $result[0]["projectID"];
        $billMaterialID = $id;
        $createdBy      = $result[0]["createdBy"];
        $updatedBy      = $result[0]["updatedBy"];
            $insertSql  = "INSERT INTO ims_inventory_canvassing_tbl SET
                            `projectID`      = '$projectID',
                            `billMaterialID` = '$billMaterialID',
                            `referenceCode`  = '$billMaterialID',
                            `createdBy`      = '$createdBy',
                            `updatedBy`      = '$updatedBy',
                            `inventoryCanvassingStatus` = '5'
                        ";
            $insertQuery =  $this->db->query($insertSql);
            return $insertQuery ? true : false;
         
    }
}
