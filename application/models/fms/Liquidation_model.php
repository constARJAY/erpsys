<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Liquidation_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    public function getLiquidationData($id = 0)
    {
        $sql   = "SELECT * FROM fms_liquidation_tbl WHERE liquidationID = $id";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }


    public function saveLiquidationData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("fms_liquidation_tbl", $data);
        } else {
            $where = ["liquidationID" => $id];
            $query = $this->db->update("fms_liquidation_tbl", $data, $where);
        }

        if ($query) {
            if ($action == "insert") {
                $liquidationID   = $this->db->insert_id();
                $liquidationCode = getFormCode("LF", date('Y-m-d'), $liquidationID);
                $this->db->update("fms_liquidation_tbl", ["liquidationCode" => $liquidationCode], ["liquidationID" => $liquidationID]);
            }
            $insertID = $id ?? $liquidationID;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");   
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }



    public function deleteLiquidationItems($id) {
        $query = $this->db->delete("fms_liquidation_items_tbl", ["liquidationID " => $id, "liquidationItemID <>" => 0]);
        return $query ? true : false;
    }


    public function saveLiquidationItems($action, $data, $id = null)
    {
        if ($id) {
            $deleteLiquidationItems = $this->deleteLiquidationItems($id);
        }
        $query = $this->db->insert_batch("fms_liquidation_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }



    // ----- UPDATE PETTY CASH VOUCHER -----
    public function updatePettyCashVoucher($liquidationID = 0)
    {
        $liquidation = $this->getLiquidationData($liquidationID);
        if ($liquidation) {
            $pettyCashVoucherID        = $liquidation->pettyCashVoucherID ?? 0;
            $liquidationBudget         = $liquidation->liquidationBudget ?? 0;
            $liquidationTotalExpense   = $liquidation->liquidationTotalExpense ?? 0;
            $liquidationExcessShortage = $liquidation->liquidationExcessShortage ?? 0;

            $data = [
                'requestedAmount'  => $liquidationBudget,
                'totalAmount'      => $liquidationTotalExpense,
                'remainingBalance' => $liquidationExcessShortage,
            ];
            $this->db->update('fms_petty_cash_voucher_tbl', $data, ['pettyCashVoucherID' => $pettyCashVoucherID]);
        }
    }
    // ----- END UPDATE PETTY CASH VOUCHER -----

}
