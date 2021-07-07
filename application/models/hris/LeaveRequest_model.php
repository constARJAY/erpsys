<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LeaveRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getEmployeeLeave($employeeID, $leaveID)
    {
        if ($employeeID && $leaveID) {
            $sql = "SELECT * FROM hris_employee_leave_tbl WHERE employeeID = $employeeID AND leaveID = $leaveID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function updateEmployeeLeaveData($employeeLeaveID = 0, $leaveCredit = 0, $leaveAccumulated = 0, $requestLeave = 0)
    {
        $reLeaveAccumulated = $leaveAccumulated;
        $reLeaveCredit      = $leaveCredit - $requestLeave;
        if ($reLeaveCredit <= 0) {
            $reRequestLeave     = abs($reLeaveCredit);
            $reLeaveCredit      = 0;
            $reLeaveAccumulated = $leaveAccumulated - $reRequestLeave;
        }
        $data = [
            "leaveCredit"      => $reLeaveCredit,
            "leaveAccumulated" => $reLeaveAccumulated
        ];
        $query = $this->db->update("hris_employee_leave_tbl", $data, ["employeeLeaveID" => $employeeLeaveID]);
        return $query ? true : false;
    }

    public function updateEmployeeLeave($employeeID, $leaveID, $leaveCredit)
    {
        if ($employeeID && $leaveID && $leaveCredit) {
            $employeeLeave = $this->getEmployeeLeave($employeeID, $leaveID);
            if ($employeeLeave) {
                $employeeLeaveID          = $employeeLeave->employeeLeaveID;
                $employeeLeaveCredit      = $employeeLeave->leaveCredit;
                $employeeLeaveAccumulated = $employeeLeave->leaveAccumulated;
                $leaveData = $this->updateEmployeeLeaveData($employeeLeaveID, $employeeLeaveCredit, $employeeLeaveAccumulated, $leaveCredit);
                return $leaveData;
            }
        }
        return false;
    }

}
