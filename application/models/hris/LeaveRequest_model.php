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
            $leaveID    = $leaveRequestData[0]["leaveID"];
            $employeeID = $leaveRequestData[0]["employeeID"];
            $sql        = "SELECT leaveCredit FROM hris_employee_leave_tbl WHERE leaveID = '$leaveID' AND employeeID = '$employeeID' ";
            $query      = $this->db->query($sql);
            $result     = $query->result_array();
            
            $leaveCredit    = $result[0]["leaveCredit"]; 
            $leaveDiff      = floatval($leaveCredit) - floatval(1);      

            $updateSql = "UPDATE hris_employee_leave_tbl SET leaveCredit = '$leaveDiff'WHERE leaveID = '$leaveID' AND employeeID = '$employeeID' ";
            $this->db->query($updateSql);
        
        }

    }



}
