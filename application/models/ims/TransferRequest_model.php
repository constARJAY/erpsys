<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TransferRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_transfer_request_tbl", $data);
        } else {
            $where = ["transferRequestID" => $id];
            $query = $this->db->update("ims_transfer_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_transfer_request_details_tbl", ["transferRequestID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_transfer_request_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
