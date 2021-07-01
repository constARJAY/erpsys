<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClientFundReplenishment_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveClientRepData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("fms_client_fund_replenishment_tbl", $data);
        } else {
            $where = ["clientRepID" => $id];
            $query = $this->db->update("fms_client_fund_replenishment_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteClientRepItems($id) {
        $query = $this->db->delete("fms_finance_request_details_tbl", ["clientRepID" => $id]) ? true : "";
        return $query;
    }

    public function saveClientRepIRequest($data, $id = null) {
        // if ($id) {
        //     $deleteClientRepItems = $this->deleteClientRepItems($id);
        // }
        $query  = $this->db->update_batch("fms_finance_request_details_tbl", $data, "financeRequestID");
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance 2nd part!";
    }
}
