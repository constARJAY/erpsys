<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Liquidation_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveliquidationData($action, $data, $id = null, $pettyCashRequestID) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("fms_liquidation_tbl", $data);
        } else {
            $where = ["liquidationID" => $id];
            $query = $this->db->update("fms_liquidation_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $updateDate = array(
                'pettyCashLiquidationStatus'  =>'1');
                $where1 = ["pettyCashRequestID " => $pettyCashRequestID];
                $query = $this->db->update("fms_petty_cash_request_tbl", $updateDate, $where1);

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    public function deleteLiquidationItems($id) {
        $query = $this->db->delete("fms_finance_request_details_tbl", ["liquidationID " => $id]);
        return $query ? true : false;
    }

    public function saveLiquidationItems($action, $data, $id = null)
    {
            if ($id) {
                $deleteLiquidationItems = $this->deleteLiquidationItems($id);
            }
            $query = $this->db->insert_batch("fms_finance_request_details_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
            return "false|System error: Please contact the system administrator for assistance!";
       
    }

}
