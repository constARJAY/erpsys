<?php

class Employee_model extends CI_Model {

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

    public function getAllModules()
    {
        $sql = "SELECT * FROM gen_module_list_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function generateEmployeePermission()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $this->db->truncate('hris_employee_permission_tbl');

        $employees = $this->getAllEmployee();
        $data = [];
        foreach($employees as $employee) {
            $modules = $this->getAllModules();
            // $status = $employee["roleID"] == 1 ? 1 : 0;
            $status = 1;
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

}