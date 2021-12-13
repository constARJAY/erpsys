<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PayrollRegister_model extends CI_Model {

    // ----- ********** GET PAYROLL REGISTER DATA ********** -----
    public function getPayrollRegisterData($payrollRegisterID = 0)
    {
        $sql = "
        SELECT 
            hprt.*,
            CONCAT(DATE_FORMAT('%M %d, %Y', hpt.payrollStartDate), ' - ', DATE_FORMAT('%M %d, %Y', hpt.payrollEndDate)) AS payrollPeriod,
            payrollStartDate,
            payrollEndDate
        FROM hris_payroll_register_tbl AS hprt
            LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)
        WHERE payrollRegisterID = $payrollRegisterID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getAllPayrollRegisterItems($payrollRegisterID = 0)
    {
        if ($payrollRegisterID)
        {
            $sql = "
            SELECT 
                hprit.*, 
                employeeID,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                employeeCode,
                IF(employeeBankAccountNo AND employeeBankAccountNo IS NOT NULL, 1, 0) AS hasBank,
                IF(employeeProfile IS NOT NULL, employeeProfile, 'default.jpg') AS profile
            FROM hris_payroll_register_items_tbl AS hprit
                LEFT JOIN hris_employee_list_tbl USING(employeeID)
            WHERE payrollRegisterID = $payrollRegisterID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getPayrollRegisterItems($payrollRegisterID = 0)
    {
        $header = "";
        $items  = [];

        $payrollData = $this->getPayrollRegisterData($payrollRegisterID);
        if ($payrollData)
        {
            $dateFrom = date("F d, Y", strtotime($payrollData->payrollStartDate));
            $dateTo   = date("F d, Y", strtotime($payrollData->payrollEndDate));
            $header   = strtoupper("$dateFrom - $dateTo");
            $items    = $this->getAllPayrollRegisterItems($payrollRegisterID);
        }

        return [
            "header" => $header,
            "items"  => $items
        ];
    }

    public function getAllPayrollRegisterData($payrollRegisterID = 0)
    {
        $data = [
            "header" => $this->getPayrollRegisterData($payrollRegisterID),
            "body"   => $this->getPayrollRegisterItems($payrollRegisterID),
        ];
        return $data;
    }
    // ----- ********** END GET PAYROLL REGISTER DATA ********** -----

}

