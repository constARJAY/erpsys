<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CostEstimate_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveCostEstimateData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_cost_estimate_tbl", $data);
        } else {
            $where = ["costEstimateID" => $id];
            $query = $this->db->update("pms_cost_estimate_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteCostEstimateItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["costEstimateID" => $id]);
        return $query ? true : false;
    }

    public function saveCostEstimateItems($data, $id = null)
    {
        if ($id) {
            $deleteCostEstimateItems = $this->deleteCostEstimateItems($id);
        }

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
