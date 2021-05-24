<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReturnItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveReturnApprovalData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_return_item_tbl", $data);
        } else {
            $where = ["returnItemID" => $id];
            $query = $this->db->update("ims_return_item_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteReturnItems($id) 
    {
        $query = $this->db->delete("ims_return_item_details_tbl", ["returnItemID" => $id]);
        return $query ? true : false;
    }

    public function saveReturnItemsData($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deleteReturnItems($id);
        }

        $query = $this->db->insert_batch("ims_return_item_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
