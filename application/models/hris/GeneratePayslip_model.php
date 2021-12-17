<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class GeneratePayslip_model extends CI_Model {

    // ---------- ********** FILTERING DISPLAY ********** ---------
    public function getApprovedPayroll()
    {
        $sql   = "SELECT payrollID, payrollCode, CONCAT(DATE_FORMAT(payrollStartDate, '%M %d, %Y'), ' - ', DATE_FORMAT(payrollEndDate, '%M %d, %Y')) AS payrollPeriod FROM hris_payroll_tbl WHERE payrollStatus = 2";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
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

        $payroll = $this->getApprovedPayroll();
        if ($payroll && !empty($payroll))
        {
            foreach ($payroll as $pay) 
            {
                $data[] = [
                    "payrollID"     => $pay["payrollID"],
                    "payrollCode"   => $pay["payrollCode"],
                    "payrollPeriod" => $pay["payrollPeriod"],
                    "department"    => $this->getConsolidatedDepartment(),
                ];
            }
        }

        return $data;
    }
    // ---------- ********** END FILTERING DISPLAY ********** ---------




    // ---------- ********** TABLE DISPLAY ********** ----------
    function getTableDisplayData($payrollID = 0, $departmentID = 0, $designationID = 0)
    {
        $departmentWhere  = $departmentID != 0 ? "departmentID = $departmentID" : "1=1";
        $designationWhere = $designationID != 0 ? "designationID = $designationID" : "1=1";

        $sql   = "SELECT * FROM hris_payslip_tbl WHERE payrollID = $payrollID AND $departmentWhere AND $designationWhere";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }
    // ---------- ********** END TABLE DISPLAY ********** ----------




    // ---------- ********** PAYSLIP ********** ----------
    public function getCompanyProfile()
    {
        $sql   = "SELECT * FROM gen_company_profile_tbl LIMIT 1";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }
    
    public function getEmployeePayslip($payrollID = 0, $idStr = "")
    {
        if ($payrollID && $idStr)
        {
            $sql = "
            SELECT *
            FROM hris_payslip_tbl
            WHERE payrollID = $payrollID AND employeeID IN ($idStr)";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }
    // ---------- ********** END PAYSLIP ********** ----------





    // ---------- ********** PAYROLL ITEMS ********** ----------
    public function updatePayrollItems($payrollID = 0, $payStr = "")
    {
        if ($payrollID && $payStr)
        {
            $sql = "
            UPDATE hris_payslip_tbl
            SET printedPayslip = 1
            WHERE payrollID = $payrollID AND payslipID IN ($payStr)";
            $query = $this->db->query($sql);
            return $query ? true : false;
        }
        return false;
    }
    // ---------- ********** END PAYROLL ITEMS ********** ----------

}

