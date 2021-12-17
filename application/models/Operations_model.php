<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operations_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }    

    public function getFeedbackMessage($feedback, $method) {
        if ($method) {
            switch($method) {
                case "update":
                    return "$feedback updated successfully!";
                case "add":
                    return "$feedback added successfully!";
                case "save":
                    return "$feedback saved successfully!";
                case "submit":
                    return "$feedback submitted successfully!";
                case "approve":
                    return "$feedback approved successfully!";
                case "reject":
                    return "$feedback denied successfully!";
                case "drop":
                    return "$feedback dropped successfully!";
                case "cancelform":
                default:
                    return "$feedback cancelled successfully!";
            }
        }
    }

    public function getTableData($tableName = null, $columnName = "*", $searchFilter = "", $orderBy = "", $groupBy = "", $others = "")
    {
        if ($tableName) {
            $columnName  = $columnName   ? $columnName : "*";
            $whereFilter = $searchFilter ? "WHERE $searchFilter" : "";
            $orderFilter = $orderBy ? "ORDER BY $orderBy" : "";
            $groupFilter = $groupBy ? "GROUP BY $groupBy" : "";
            $sql         = "SELECT $columnName FROM $tableName $whereFilter $orderFilter $groupFilter $others";
            $query       = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getTableDataLength($tableName = null, $columnName = "*", $searchFilter = "", $orderBy = "", $groupBy = "", $others = "")
    {
        if ($tableName) {
            $columnName  = $columnName   ? $columnName : "*";
            $whereFilter = $searchFilter ? "WHERE $searchFilter" : "";
            $orderFilter = $orderBy ? "ORDER BY $orderBy" : "";
            $groupFilter = $groupBy ? "GROUP BY $groupBy" : "";
            $sql         = "SELECT $columnName FROM $tableName $whereFilter $orderFilter $groupFilter $others";
            $query       = $this->db->query($sql);
            return $query ? $query->num_rows() : 0;
        }
        return 0;
    }

    public function database($sql = "")
    {
        if ($sql) {
            $query = $this->db->query($sql);
            if ($query) {
                return $query->result_array();
            }
            return false;
        }
        return false;
    }

    public function insertTableData($tableName = null, $tableData = [], $feedback = "Data", $method = false)
    {
        if ($tableName) {
            $query = $this->db->insert($tableName, $tableData);
            if ($query) {
                $insertID = $this->db->insert_id();
                $method = $method ? $method : "add";
                $feedbackMessage = $this->getFeedbackMessage($feedback, $method);
                insertAudit("insert", $tableName,$feedback);
                return "true|$feedbackMessage|$insertID";
            }
            return "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateTableData($tableName = null, $tableData = [], $whereFilter = "", $feedback = "Data", $method = false)
    {
        if ($tableName) {
            if ($whereFilter) {
                $oldData    = $this->db->get_where($tableName, $whereFilter)->result_array();
                $query      = $this->db->update($tableName, $tableData, $whereFilter);
                $method     = $method ? $method : "update";
                $newData    = $this->db->get_where($tableName, $whereFilter)->result_array();

                insertAudit("update",$tableName, $feedback, $oldData[0], $newData[0]);
              
                $feedbackMessage = $this->getFeedbackMessage($feedback, $method);
                $idArr = explode("=", $whereFilter);
                return $query ? "true|$feedbackMessage|$idArr[1]" : "false|System error: Please contact the system administrator for assistance!";
            } else {
                return "false|Invalid where clause in mysql";
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteTableData($tableName = null, $whereFilter = "", $feedback = "Data")
    {
        if ($tableName) {
            if ($whereFilter) {
                $query = $this->db->delete($tableName, $whereFilter);
                return $query ? "true|$feedback deleted successfully!" : "false|System error: Please contact the system administrator for assistance!";
            } else {
                return "false|Invalid where clause in mysql";
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function unionData($unionData = null)
    {
        if ($unionData) {
            $sql         = "$unionData";
            $query       = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        } 
        return 0;   
    }

    public function premiumPaymentReport(){
        $returnData = [];
        
        $year = ["2021","2022","2023","2024","2025","2026"];

        for ( $i = 0; $i < count($year) ; $i++) { 
            $month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
            $yearString = $year[$i];
            for ($j=1; $j < count($month) ; $j++) { 
                $sql    = "SELECT hpit.*, employeeFirstname, employeeMiddlename, employeeLastname,employeePagibig,employeePhilHealth,employeeSSS FROM hris_payroll_items_tbl AS hpit 
                                LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                                 WHERE MONTH(endDate) = '$j' AND EXTRACT(YEAR FROM endDate) = '$yearString' ";
                $query  = $this->db->query($sql);
                $result = $query->result_array();
                $tempData = [
                    "month" => $month[$j]." ".$year[$i],
                    "data"  => $result
                ];
                array_push($returnData, $tempData);
            }
        }

        return $returnData;

    }
}

