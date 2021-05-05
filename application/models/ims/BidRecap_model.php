<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BidRecap_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBidRecapData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_bid_recap_tbl", $data);
        } else {
            $where = ["bidRecapID" => $id];
            $query = $this->db->update("ims_bid_recap_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBidRecapItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["bidRecapID" => $id]);
        return $query ? true : false;
    }

    public function saveBidRecapItems($data, $id = null){
        if ($id) {
            $deleteBidRecapItems = $this->deleteBidRecapItems($id);
        }

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    
}
