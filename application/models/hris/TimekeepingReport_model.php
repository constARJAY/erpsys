<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TimekeepingReport_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    // ---------- ********** FILTERING DISPLAY ********** ----------
    public function getApprovedMinMaxTimekeeping()
    {
        $sql   = "SELECT MIN(timekeepingStartDate) AS startDate, MAX(timekeepingEndDate) AS endDate FROM hris_timekeeping_tbl WHERE timekeepingStatus = 2";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getActiveDepartment()
    {
        $sql   = "SELECT departmentID, departmentName FROM hris_department_tbl WHERE departmentStatus = 1";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getActiveDesignation($departmentID = 0)
    {
        $sql   = "SELECT designationID, designationName FROM hris_designation_tbl WHERE designationStatus = 1 AND departmentID = $departmentID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getConsolidatedDepartment()
    {
        $data = [];

        $department = $this->getActiveDepartment();
        if ($department && !empty($department))
        {
            foreach ($department as $dept) 
            {
                $departmentID = $dept["departmentID"];

                $data[] = [
                    "departmentID"   => $departmentID,
                    "departmentName" => $dept["departmentName"],
                    "designation"    => $this->getActiveDesignation($departmentID),
                ];
            }
        }

        return $data;
    }

    public function getFilterDisplayData()
    {
        $data = [];

        $timekeeping = $this->getApprovedMinMaxTimekeeping();
        if ($timekeeping && !empty($timekeeping))
        {
            $data = [
                'startDate'  => $timekeeping->startDate,
                'endDate'    => $timekeeping->endDate,
                'department' => $this->getConsolidatedDepartment()
            ];
        }

        return $data;
    }
    // ---------- ********** END FILTERING DISPLAY ********** ----------

    
    // ---------- ********** TIMEKEEPING REPORT DISPLAY ********** ----------
    public function getColumnLabel($startDate = "", $endDate = "")
    {
        $data = [];
        if ($startDate && $endDate) {
            $startDate = $startDate." 00:00:00";
            $endDate   = $endDate." 23:59:59";
            $period = new DatePeriod(
                new DateTime($startDate),
                new DateInterval('P1D'),
                new DateTime($endDate)
            );
            foreach($period as $prd) {
                $temp = [
                    "month"  => $prd->format("M"),
                    "day"    => $prd->format("D"),
                    "date"   => $prd->format("Y-m-d"),
                    "number" => $prd->format("d")
                ];
                $data[] = $temp;
            }
        }
        return $data;
    }

    public function getTimekeepingEmployees($departmentID = 0, $designationID = 0, $startDate = '', $endDate = '', $employeeID = '')
    {
        $whereDepartment  = $departmentID ? "AND helt.departmentID = $departmentID" : "";
        $whereDesignation = $designationID ? "AND helt.designationID = $designationID" : "";
        $whereEmployeeID  = $employeeID ? "AND helt.employeeID IN($employeeID)" : "";

        $sql = "
        SELECT
            htit.employeeID, htit.scheduleDate, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname, employeeCode
        FROM hris_timekeeping_items_tbl AS htit
            LEFT JOIN hris_timekeeping_tbl AS htt USING(timekeepingID)
            LEFT JOIN hris_employee_list_tbl AS helt ON htit.employeeID = helt.employeeID
        WHERE htt.timekeepingStatus = 2
            $whereDepartment
            $whereDesignation
            $whereEmployeeID
            AND htit.scheduleDate BETWEEN '$startDate' AND '$endDate'
        GROUP BY htit.employeeID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTimekeepingItems($departmentID = 0, $designationID = 0, $startDate = '', $endDate = '', $employeeID = '')
    {
        if ($startDate && $endDate) 
        {
            $whereDepartment  = $departmentID ? "AND helt.departmentID = $departmentID" : "";
            $whereDesignation = $designationID ? "AND helt.designationID = $designationID" : "";
            $whereEmployeeID  = $employeeID ? "AND helt.employeeID IN($employeeID)" : "";

            $sql = "
            SELECT
                htit.*,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                employeeCode
            FROM hris_timekeeping_tbl AS htt
                LEFT JOIN hris_timekeeping_items_tbl AS htit USING(timekeepingID)
                LEFT JOIN hris_employee_list_tbl AS helt ON htit.employeeID = helt.employeeID
            WHERE htt.timekeepingStatus = 2
                $whereDepartment
                $whereDesignation
                $whereEmployeeID
                AND htit.scheduleDate BETWEEN '$startDate' AND '$endDate'";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }
    
    public function getTableDisplayData($departmentID = 0, $designationID = 0, $startDate = '', $endDate = '', $employeeID = '')
    {
        $data = [
            'display'   => date('F d, Y', strtotime($startDate)).' - '.date('F d, Y', strtotime($endDate)),
            'columns'   => $this->getColumnLabel($startDate, $endDate),
            'employees' => $this->getTimekeepingEmployees($departmentID, $designationID, $startDate, $endDate, $employeeID),
            'items'     => $this->getTimekeepingItems($departmentID, $designationID, $startDate, $endDate, $employeeID),
        ];
        return $data;
    }
    // ---------- ********** END TIMEKEEPING REPORT DISPLAY ********** ----------

}

/* End of file TimekeepingReport_model.php */
