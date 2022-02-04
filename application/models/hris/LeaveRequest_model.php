<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LeaveRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveLeaveRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("hris_leave_request_tbl", $data);
        } else {
            $where = ["leaveRequestID" => $id];
            $query = $this->db->update("hris_leave_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $leaveRequestCode = "LRF-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["leaveRequestCode"=> $leaveRequestCode ];
            $this->db->update("hris_leave_request_tbl", $updateArr, ["leaveRequestID" => $insertID]);

            if ($data['leaveRequestStatus'] == 2 && $data['leaveStatus'] == 1) {
                $this->updateEmployeeLeave($insertID);
            }

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateLeaveRequest($tableName,$data, $reference){
        $query =  $this->db->update($tableName, $data, $reference);  //"id = 4"
        return $query;
    }

    public function generatePayrollAdjustment($data = false){
        if($data){
            $query = $this->db->insert("hris_payroll_adjustment_pending_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }
    }

    public function getLeaveRequestData($leaveRequestID){
        $sql    = "SELECT * FROM  hris_leave_request_tbl WHERE leaveRequestID = '$leaveRequestID'";
        $query  = $this->db->query($sql);
        return $query ? $query->result_array() : false;
    }

    public function updateEmployeeLeave($leaveRequestID){
        $leaveRequestData   = $this->getLeaveRequestData($leaveRequestID);
        if($leaveRequestID){
            $leaveID     = $leaveRequestData[0]["leaveID"];
            $employeeID  = $leaveRequestData[0]["employeeID"];
            $deductLeave = $leaveRequestData[0]["leaveRequestNumberOfDate"] ?? 1;
            $sql         = "SELECT leaveCredit FROM hris_employee_leave_tbl WHERE leaveID = '$leaveID' AND employeeID = '$employeeID' ";
            $query       = $this->db->query($sql);
            if ($query) {
                $result = $query->row();
                $leaveCredit      = $result->leaveCredit ?? 0;
                $leaveAccumulated = $result->leaveAccumulated ?? 0;
                $leaveBalance     = $leaveCredit + $leaveAccumulated;
                if ($leaveBalance > $deductLeave) {
                    $creditBalance      = $leaveCredit - $deductLeave;
                    $accumulatedBalance = $leaveAccumulated;
                    if ($creditBalance < 0) {
                        $deductLeave   = abs($creditBalance);
                        $creditBalance = 0;

                        $accumulatedBalance = $leaveAccumulated - $deductLeave;
                        $accumulatedBalance = $accumulatedBalance < 0 ? 0 : $accumulatedBalance;
                    }

                    $updateSql   = "UPDATE hris_employee_leave_tbl SET leaveCredit = $creditBalance, leaveAccumulated = $accumulatedBalance WHERE leaveID = '$leaveID' AND employeeID = '$employeeID' ";
                    $updateQuery = $this->db->query($updateSql);

                    if ($updateQuery) {
                        $remainingLeave = $creditBalance + $accumulatedBalance;
                        $this->db->query("
                            UPDATE hris_leave_request_tbl 
                            SET leaveRequestRemainingLeave = $remainingLeave
                            WHERE leaveRequestID <> 0 
                                AND employeeID = 1
                                AND leaveRequestStatus IN (0,1);");
                    }

                    return $updateQuery ? true : false;
                }
            }
            return false;
        
        }

    }



}
