<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class equipmentBorrowing_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBorrowingData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_borrowing_tbl", $data);
        } else {
            $where = ["borrowingID" => $id];
            $query = $this->db->update("ims_borrowing_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_borrowing_details_tbl", ["borrowingID" => $id]);
        return $query ? true : false;
    }
    public function saveBorrowingItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_borrowing_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}    