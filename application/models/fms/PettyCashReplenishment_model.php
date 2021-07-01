<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PettyCashReplenishment_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveClientRepData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("fms_petty_cash_replenishment_tbl", $data);
        } else {
            $where = ["pettyRepID" => $id];
            $query = $this->db->update("fms_petty_cash_replenishment_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteClientRepItems($id) {
        $query = $this->db->delete("fms_finance_request_details_tbl", ["pettyRepID" => $id]) ? true : "";
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
    
    // public function updateClientRep($tableName,$data, $reference) {
    //     $query =  $this->db->update($tableName, $data, $reference);  //"id = 4"
    //     return $query;
    // }

    // public function getClientCount($clientID) {
    //     $sql            = "SELECT COUNT(clientID) AS clientCount , clientShortcut FROM fms_petty_cash_replenishment_tbl JOIN pms_client_tbl USING(clientID) WHERE  clientID = '$clientID'";
    //     $query          = $this->db->query($sql);
    //     $result         = $query->result_array();
    //     $countClient    = ($result[0]["clientCount"] ? $result[0]["clientCount"] : 0) + 1 ;
    //     $clientShortcut = $result[0]["clientShortcut"] ? $result[0]["clientShortcut"] : "TST";
    //     $projetCode     = strlen($countClient) < 5  ? $clientShortcut."-".str_repeat("0", 5 - strlen($countClient)).$countClient : $clientShortcut."-".$countClient;
    //     return date("Y")."-".$projetCode;
    // }


}
