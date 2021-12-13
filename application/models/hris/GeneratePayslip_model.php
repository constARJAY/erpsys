<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class GeneratePayslip_model extends CI_Model {

    // ---------- ********** FILTERING DISPLAY ********** ---------
    public function getApprovedPayroll()
    {
        $sql   = "SELECT payrollID, payrollCode FROM hris_payroll_tbl WHERE payrollStatus = 2";
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
                    "payrollID"   => $pay["payrollID"],
                    "payrollCode" => $pay["payrollCode"],
                    "department"  => $this->getConsolidatedDepartment(),
                ];
            }
        }

        return $data;
    }
    // ---------- ********** END FILTERING DISPLAY ********** ---------




    // ---------- ********** TABLE DISPLAY ********** ----------
    function getTableDisplayData($payrollID = 0, $departmentID = 0, $designationID = 0)
    {
        $departmentWhere  = $departmentID != 0 ? "helt.departmentID = $departmentID" : "1=1";
        $designationWhere = $designationID != 0 ? "helt.designationID = $designationID" : "1=1";

        $sql = "
        SELECT
            payrollItemID,
            hpit.employeeID,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
            employeeCode,
            helt.departmentID,
            departmentName,
            departmentCode,
            helt.designationID,
            designationName,
            designationCode,
            printedPayslip
        FROM hris_payroll_items_tbl AS hpit
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID
        WHERE hpit.payrollID = $payrollID AND $departmentWhere AND $designationWhere";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }
    // ---------- ********** END TABLE DISPLAY ********** ----------




    // ---------- ********** PAYSLIP ********** ----------
    public function getEmployeePayslip($payrollID = 0, $idStr = "")
    {
        if ($payrollID && $idStr)
        {
            $sql = "
            SELECT
                hpit.employeeID,
                employeeCode,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                helt.employeeStatus,
                CONCAT(DATE_FORMAT(startDate, '%M %d, %Y'), ' - ', DATE_FORMAT(endDate, '%M %d, %Y')) AS payrollPeriod,
                departmentName,
                designationName,
                employeeTIN,
                employeeSSS,
                employeePhilHealth,
                employeePagibig,
                basicPay,
                ((CASE WHEN(holidayPay) THEN holidayPay ELSE 0 END) + (CASE WHEN(holidayAdjustment) THEN holidayAdjustment ELSE 0 END)) AS holidayPay,
                ((CASE WHEN(allowance) THEN allowance ELSE 0 END) + (CASE WHEN(allowanceAdjustment) THEN allowanceAdjustment ELSE 0 END)) AS allowance,
                ((CASE WHEN(nightDifferentialPay) THEN nightDifferentialPay ELSE 0 END) + (CASE WHEN(nightDifferentialAdjustment) THEN nightDifferentialAdjustment ELSE 0 END)) AS nightDifferential,
                leavePay,
                ((CASE WHEN(overtimePay) THEN overtimePay ELSE 0 END) + (CASE WHEN(overtimeAdjustment) THEN overtimeAdjustment ELSE 0 END)) AS overtime,
                ((CASE WHEN(lateUndertimeDeduction) THEN lateUndertimeDeduction ELSE 0 END) + (CASE WHEN(lateUndertimeAdjustment) THEN lateUndertimeAdjustment ELSE 0 END)) AS lateUndertime,
                ((CASE WHEN(lwopDeduction) THEN lwopDeduction ELSE 0 END) + (CASE WHEN(lwopAdjustment) THEN lwopAdjustment ELSE 0 END)) AS absences,
                grossPay,
                ((CASE WHEN(sssDeduction) THEN sssDeduction ELSE 0 END) + (CASE WHEN(sssAdjustment) THEN sssAdjustment ELSE 0 END)) AS sssDeduction,
                ((CASE WHEN(phicDeduction) THEN phicDeduction ELSE 0 END) + (CASE WHEN(phicAdjustment) THEN phicAdjustment ELSE 0 END)) AS phicDeduction,
                ((CASE WHEN(hdmfDeduction) THEN hdmfDeduction ELSE 0 END) + (CASE WHEN(hdmfAdjustment) THEN hdmfAdjustment ELSE 0 END)) AS hdmfDeduction,
                ((CASE WHEN(withHoldingDeduction) THEN withHoldingDeduction ELSE 0 END) + (CASE WHEN(withHoldingAdjustment) THEN withHoldingAdjustment ELSE 0 END)) AS taxDeduction,
                totalDeduction,
                ((CASE WHEN(loanDeduction) THEN loanDeduction ELSE 0 END) + (CASE WHEN(loanAdjustment) THEN loanAdjustment ELSE 0 END)) AS loan,
                basicSalary AS basicRate,
                hourlyRate,
                netPay
            FROM hris_payroll_items_tbl AS hpit
                LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
                LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
                LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID
            WHERE hpit.payrollID = $payrollID AND hpit.employeeID IN ($idStr)";
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
            UPDATE hris_payroll_items_tbl
            SET printedPayslip = 1
            WHERE payrollID = $payrollID AND payrollItemID IN ($payStr)";
            $query = $this->db->query($sql);
            return $query ? true : false;
        }
        return false;
    }
    // ---------- ********** END PAYROLL ITEMS ********** ----------

}

