<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MaterialUsage_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveMaterialUsageData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_material_usage_tbl", $data);
        } else {
            $where = ["materialUsageID" => $id];
            $query = $this->db->update("ims_material_usage_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteMaterialUsageItems($id) {
        $query = $this->db->delete("ims_material_withdrawal_details_tbl", ["materialUsageID" => $id]);
        return $query ? true : false;
    }

    public function saveMaterialUsageItems($data, $id = null){
        if ($id) {
            $deleteMaterialUsageItems = $this->deleteMaterialUsageItems($id);
        }

        $query = $this->db->insert_batch("ims_material_withdrawal_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    
}
