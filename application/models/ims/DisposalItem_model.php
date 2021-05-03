<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisposalItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveDisposalItemData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_item_disposal_tbl", $data);
        } else {
            $where = ["itemDisposalID" => $id];
            $query = $this->db->update("ims_item_disposal_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteDisposalItems($id) {
        $query = $this->db->delete("ims_item_disposal_details_tbl", ["itemDisposalID" => $id]);
        return $query ? true : false;
    }

    public function saveDisposalItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deleteDisposalItems($id);
        }

        $query = $this->db->insert_batch("ims_item_disposal_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
