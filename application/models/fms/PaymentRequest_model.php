<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PaymentRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePaymentRequestData($action, $data, $id = null) 
    {   
        // echo "<pre>";
        // print_r($data);
        // exit;
        if ($action == "insert") {
            $query = $this->db->insert("fms_payment_request_tbl", $data);
        } else {
            $where = ["paymentRequestID" => $id];
            $query = $this->db->update("fms_payment_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
