<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReturnItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_return_item_tbl", $data);
        } else {
            $where = ["returnID" => $id];
            $query = $this->db->update("ims_return_item_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_return_item_details_tbl", ["returnID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_return_item_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
