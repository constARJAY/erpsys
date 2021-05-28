<?php

class EmployeeModule_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
    }

    public function getAllEmployee()
    {
        $sql = "SELECT * FROM hris_employee_list_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getEmployee($employeeID = null)
    {
        if ($employeeID) {
            $sql = "SELECT * FROM hris_employee_list_tbl WHERE employeeID = $employeeID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getAllModules()
    {
        $sql = "SELECT * FROM gen_module_list_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    // ----- UPDATE LEAVE CREDIT -----
    public function getEmployeeLeave($employeeID = null)
    {
        if ($employeeID) {
            $sql    = "SELECT employeeLeaveID, leaveID, leaveCredit, leaveAccumulated FROM hris_employee_leave_tbl WHERE employeeID = $employeeID";
            $query  = $this->db->query($sql);
            return $query->result_array();
        }
        return [];
    }

    public function resetEmployeeField($column = null)
    {
        if ($column) {
            $query = $this->db->update("hris_employee_list_tbl", [$column => 0], ["employeeID <>" => 0]);
            return $query ? true : false;
        }
        return false;
    } 

    public function updateLeaveCredit($id = null)
    {
        $employeeData = $employeeLeave = [];
        $employees    = $id ? $this->getEmployee($id) : $this->getAllEmployee();
        foreach ($employees as $emp) {
            $employeeID            = $emp["employeeID"];
            $employeeHiredDate     = date("Y-m-d", strtotime("-1 day", strtotime($emp["employeeHiredDate"])));
            $employeeStatus        = $emp["employeeStatus"];
            $employeeLeaveInterval = $emp["employeeLeaveInterval"];
            $employeeRankingCredit = $emp["employeeRankingCredit"];

            $date1    = new DateTime();
            $date2    = new DateTime($employeeHiredDate);
            $interval = $date1->diff($date2);
            $month    = $interval->format("%y") * 12 + $interval->format("%m");

            if ($employeeLeaveInterval <= $month && $month >= 12 && $employeeStatus == 1) {
                $employeeSLID = $employeeVLID = $employeeSLCredit = $employeeVLCredit = $employeeSLAccumulated = $employeeVLAccumulated = 0;
                $leaveData = $this->getEmployeeLeave($employeeID);
                foreach ($leaveData as $leave) {
                    if ($leave["leaveID"] == 1) {
                        $employeeSLID          = $leave["employeeLeaveID"];
                        $employeeSLCredit      = $leave["leaveCredit"] ?? 0;
                        $employeeSLAccumulated = $leave["leaveAccumulated"] ?? 0;
                    }
                    if ($leave["leaveID"] == 2) {
                        $employeeVLID          = $leave["employeeLeaveID"];
                        $employeeVLCredit      = $leave["leaveCredit"] ?? 0;
                        $employeeVLAccumulated = $leave["leaveAccumulated"] ?? 0;
                    }
                }

                $accumulatedLeave     = $employeeRankingCredit / 12;
                $sickLeaveAccumulated = $employeeSLAccumulated > 0 ? $employeeSLAccumulated + $accumulatedLeave : $employeeSLAccumulated + ($accumulatedLeave * ($month % 12));
                // $vacationLeaveAccumulated = $employeeVLAccumulated > 0 ? $employeeVLAccumulated + $accumulatedLeave : $employeeVLAccumulated + ($accumulatedLeave * ($month % 12));

                // ----- ANNIVERSARY -----
                if ($month % 12 == 0) {
                    $employeeSLCredit = $month == 12 ? $employeeRankingCredit : $sickLeaveAccumulated - $accumulatedLeave;
                    $employeeVLCredit = $employeeRankingCredit;
                    
                    // ----- RESET ACCUMULATED LEAVE -----
                    $sickLeaveAccumulated = 0;
                    // ----- END RESET ACCUMULATED LEAVE -----
                }
                // ----- END ANNIVERSARY -----

                $sickLeave = [
                    "employeeLeaveID"  => $employeeSLID,
                    "leaveCredit"      => $employeeSLCredit,
                    "leaveAccumulated" => $sickLeaveAccumulated
                ];
                $vacationLeave = [
                    "employeeLeaveID"  => $employeeVLID,
                    "leaveCredit"      => $employeeVLCredit,
                    // "leaveAccumulated" => $vacationLeaveAccumulated
                ];
                array_push($employeeLeave, $sickLeave);
                array_push($employeeLeave, $vacationLeave);
            }

            $employee = [
                "employeeID"            => $employeeID,
                "employeeLeaveInterval" => $month,
            ];
            array_push($employeeData, $employee);
        }

        $queryEmployeeData  = count($employeeData) > 0 ? $this->db->update_batch("hris_employee_list_tbl", $employeeData, "employeeID") : true;
        $queryEmployeeLeave = count($employeeLeave) > 0 ? $this->db->update_batch("hris_employee_leave_tbl", $employeeLeave, "employeeLeaveID"): true;
        return $queryEmployeeData && $queryEmployeeLeave;
    }
    // ----- UPDATE LEAVE CREDIT -----


    // ----- GENERATE PERMISSION -----
    public function generateEmployeePermission()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $this->db->truncate('hris_employee_permission_tbl');

        $employees = $this->getAllEmployee();
        $data = [];
        foreach($employees as $employee) {
            $modules = $this->getAllModules();
            $status = $employee["designationID"] == 1 ? 1 : 0;
            // $status = 1;
            foreach($modules as $module) {
                $temp = [
                    "employeeID"   => $employee["employeeID"],
                    "moduleID"     => $module["moduleID"],
                    "createStatus" => $status,
                    "readStatus"   => 1,
                    "updateStatus" => $status,
                    "deleteStatus" => $status,
                    "printStatus"  => $status,
                    "createdBy"    => $sessionID,
                    "updatedBy"    => $sessionID,
                ];
                array_push($data, $temp);
            }
        }
        $query = $this->db->insert_batch("hris_employee_permission_tbl", $data);
        return $query ? true : false;
    }

    public function generateFullAccess($id = null) 
    {
        if ($id) {
            $queryDelete = $this->db->delete("hris_employee_permission_tbl", ["employeeID" => $id]);
            if ($queryDelete) {
                $data = [];
                $status = 1;
                $modules = $this->getAllModules();
                foreach($modules as $module) {
                    $temp = [
                        "employeeID"   => $id,
                        "moduleID"     => $module["moduleID"],
                        "createStatus" => $status,
                        "readStatus"   => $status,
                        "updateStatus" => $status,
                        "deleteStatus" => $status,
                        "printStatus"  => $status,
                        "createdBy"    => 1,
                        "updatedBy"    => 1,
                    ];
                    array_push($data, $temp);
                }
                $queryInsert = $this->db->insert_batch("hris_employee_permission_tbl", $data);
                return $queryInsert ? true : false;
            }
            return false;
        }
        return false;
    }
    // ----- END GENERATE PERMISSION -----

    public function saveEmployeeData($data = [], $action = null, $id = null) {
        $employeeID = $id;
        if ($action == "insert") {
            $query      = $this->db->insert("hris_employee_list_tbl", $data);
            $employeeID = $this->db->insert_id();
        } else if ($action == "update") {
            $query = $this->db->update("hris_employee_list_tbl", $data, ["employeeID" => $id]);
        }
        return $query ? "true|Success|$employeeID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveDocument($data = [], $oldDocuments = [], $action = null, $employeeID = null) {
        $whereNotFilename = count($oldDocuments) > 0 ? "filename NOT IN ('". implode("', '", $oldDocuments) ."')" : "1=1";
        $sqlDelete = "
            DELETE FROM 
                hris_employee_documents_tbl 
            WHERE 
                employeeID = $employeeID AND 
                $whereNotFilename AND
                documentID <> 0";
        $queryDelete = $this->db->query($sqlDelete);
        if ($queryDelete) {
            $query = count($data) > 0 ? $this->db->insert_batch("hris_employee_documents_tbl", $data) : true;
            return $query ? true : false;
        } else {
            return false;
        }
    }

    public function saveLeaveCredit($data = [], $action = null, $employeeID = null) {
        $deleteLeaveCredit = $this->db->delete("hris_employee_leave_tbl", ["employeeID" => $employeeID]);
        if ($deleteLeaveCredit) {
            $query = $this->db->insert_batch("hris_employee_leave_tbl", $data);
            if ($query) {
                $this->updateLeaveCredit($employeeID);
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    public function saveAccessibility($data = [], $action = null, $employeeID = null) {
        $deleteAccessibility = $this->db->delete("hris_employee_permission_tbl", ["employeeID" => $employeeID]);
        if ($deleteAccessibility) {
            $query = $this->db->insert_batch("hris_employee_permission_tbl", $data);
            return $query ? true : false;
        } else {
            return false;
        }
    }

}