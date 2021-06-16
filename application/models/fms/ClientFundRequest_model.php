<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ClientFundRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function saveClientFundRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("fms_client_fund_request_tbl", $data);
        } else {
            $where = ["clientFundRequestID" => $id];
            $query = $this->db->update("fms_client_fund_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteClientFundRequestItems($id) {
        $query = $this->db->delete("fms_client_fund_request_details_tbl", ["clientFundRequestID" => $id]);
        return $query ? true : false;
    }

    public function saveClientFundRequestItems($action, $data, $id = null)
    {
            if ($id) {
                $deletePettyCashRequestItems = $this->deleteClientFundRequestItems($id);
            }
            $query = $this->db->insert_batch("fms_client_fund_request_details_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
            return "false|System error: Please contact the system administrator for assistance!";
       
    }

}    
