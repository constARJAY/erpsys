<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MilestoneBuilder_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveMilestoneBuilderData($data, $id = null){
        if (!$id) {
            $query = $this->db->insert("pms_milestone_builder_tbl", $data);
            $insertID = $this->db->insert_id();
        } else {
            $where = ["milestoneBuilderID" => $id];
            $query = $this->db->update("pms_milestone_builder_tbl", $data, $where);
            $insertID = $id;
        }
        if ($query) {
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteCostEstimateItems($id) {
        $query = $this->db->delete("pms_milestone_list_tbl", ["milestoneBuilderID" => $id]) ? true : false;
        return $query;
    }

    public function saveMilestoneBuilderList($data, $id = null){
        if ($id) {
            $deleteMilestoneData = $this->deleteCostEstimateItems($id);
        }
        $query    = $this->db->insert_batch("pms_milestone_list_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance 2nd part!";
    }
}
