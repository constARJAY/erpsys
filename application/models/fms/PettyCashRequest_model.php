<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PettyCashRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getPettyCashRequest($pettyCashRequestID = 0)
    {
        $sql   = "SELECT * FROM fms_petty_cash_request_tbl WHERE pettyCashRequestID = $pettyCashRequestID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function insertLiquidation($pettyCashRequestID = 0)
    {
        $pettyCashRequest = $this->getPettyCashRequest($pettyCashRequestID);
        if ($pettyCashRequest) {
            // ----- PETTY CASH VOUCHER -----
            $pettyCashVoucherData = [
                'pettyCashRequestID'     => $pettyCashRequest->pettyCashRequestID,
                'pettyCashRequestCode'   => getFormCode("PCR", $pettyCashRequest->createdAt, $pettyCashRequestID),
                'employeeID'             => $pettyCashRequest->employeeID,
                'requestedAmount'        => $pettyCashRequest->pettyCashRequestAmount,
                'totalAmount'            => 0,
                'remainingBalance'       => 0,
                'pettyCashVoucherReason' => $pettyCashRequest->pettyCashRequestReason,
                'submittedAt'            => $pettyCashRequest->submittedAt,
                'createdBy'              => $pettyCashRequest->employeeID,
                'updatedBy'              => $pettyCashRequest->employeeID,
                'createdAt'              => date('Y-m-d H:i:s'),
                'updatedAt'              => date('Y-m-d H:i:s'),
            ];
            $pettyCashVoucherQuery = $this->db->insert("fms_petty_cash_voucher_tbl", $pettyCashVoucherData);
            if ($pettyCashVoucherQuery) {
                $pettyCashVoucherID   = $this->db->insert_id();
                $pettyCashVoucherCode = getFormCode("PCV", date('Y-m-d'), $pettyCashVoucherID);
                $this->db->update("fms_petty_cash_voucher_tbl", ["pettyCashVoucherCode" => $pettyCashVoucherCode], ["pettyCashVoucherID" => $pettyCashVoucherID]);


                // ----- LIQUIDATION -----
                $liquidationData = [
                    'pettyCashRequestID'   => $pettyCashRequestID,
                    'pettyCashRequestCode' => getFormCode("PCR", $pettyCashRequest->createdAt, $pettyCashRequestID),
                    'pettyCashVoucherID'   => $pettyCashVoucherID,
                    'pettyCashVoucherCode' => $pettyCashVoucherCode,
                    'employeeID'           => $pettyCashRequest->employeeID,
                    'liquidationBudget'    => $pettyCashRequest->pettyCashRequestAmount,
                    'liquidationPurpose'   => $pettyCashRequest->pettyCashRequestReason,
                    'liquidationStatus'    => 0,
                    'createdBy'            => $pettyCashRequest->employeeID,
                    'updatedBy'            => $pettyCashRequest->employeeID,
                    'createdAt'            => date('Y-m-d H:i:s'),
                    'updatedAt'            => date('Y-m-d H:i:s'),
                ];
                $liquidationQuery = $this->db->insert("fms_liquidation_tbl", $liquidationData);
                if ($liquidationQuery) {
                    $liquidationID   = $this->db->insert_id();
                    $liquidationCode = getFormCode("LF", date('Y-m-d'), $liquidationID);
                    $this->db->update("fms_liquidation_tbl", ["liquidationCode" => $liquidationCode], ["liquidationID" => $liquidationID]);
                }
            }
        }
        return true;
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
