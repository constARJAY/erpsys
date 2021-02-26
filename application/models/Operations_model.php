<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operations_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }    

    public function getTableData($tableName = null, $columnName = "*", $searchFilter = "", $orderBy = "")
    {
        if ($tableName) {
            $columnName  = $columnName   ? $columnName : "*";
            $whereFilter = $searchFilter ? "WHERE $searchFilter" : "";
            $orderFilter = $orderBy ? "ORDER BY $orderBy" : "";
            $sql         = "SELECT $columnName FROM $tableName $whereFilter $orderFilter";
            $query       = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function insertTableData($tableName = null, $tableData = [], $feedback = "Data")
    {
        if ($tableName) {
            $query = $this->db->insert($tableName, $tableData);
            if ($query) {
                $insertID = $this->db->insert_id();
                return "true|$feedback added successfully!|$insertID";
            }
            return "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateTableData($tableName = null, $tableData = [], $whereFilter = "", $feedback = "Data")
    {
        if ($tableName) {
            if ($whereFilter) {
                $query = $this->db->update($tableName, $tableData, $whereFilter);
                return $query ? "true|$feedback updated successfully!" : "false|System error: Please contact the system administrator for assistance!";
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

}

