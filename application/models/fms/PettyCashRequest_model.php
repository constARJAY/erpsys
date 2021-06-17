<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PettyCashRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePettyCashRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("fms_petty_cash_request_tbl", $data);
        } else {
            $where = ["pettyCashRequestID" => $id];
            $query = $this->db->update("fms_petty_cash_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePettyCashRequestItems($id) {
        $query = $this->db->delete("fms_finance_request_details_tbl", ["pettyCashRequestID" => $id]);
        return $query ? true : false;
    }

    public function savePettyCashRequestItems($action, $data, $id = null)
    {
            if ($id) {
                $deletePettyCashRequestItems = $this->deletePettyCashRequestItems($id);
            }
            $query = $this->db->insert_batch("fms_finance_request_details_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
            return "false|System error: Please contact the system administrator for assistance!";
       
    }

}
