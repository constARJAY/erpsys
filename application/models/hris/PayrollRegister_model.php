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

        $payrollRegisterData = $this->getPayrollRegisterData($payrollRegisterID);
        if ($payrollRegisterData)
        {
            $dateFrom = date("F d, Y", strtotime($payrollRegisterData->payrollStartDate));
            $dateTo   = date("F d, Y", strtotime($payrollRegisterData->payrollEndDate));
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
    




    // ----- ********** SAVE PAYROLL REGISTER DATA ********** -----
    public function savePayrollRegisterData($action = "", $payrollRegisterData = [], $payrollRegisterID = 0)
    {
        if ($action == "insert") 
        {
            $query = $this->db->insert("hris_payroll_register_tbl", $payrollRegisterData);
        } 
        else 
        {
            $where = ["payrollRegisterID" => $payrollRegisterID];
            $query = $this->db->update("hris_payroll_register_tbl", $payrollRegisterData, $where);
        }

        if ($query) 
        {
            $insertID = $action == "insert" ? $this->db->insert_id() : $payrollRegisterID;
            $payrollRegisterCode = "";

            if ($action == "insert")
            {
                $payrollRegisterCode = getFormCode("PRR", date("Y-m-d"), $insertID);
                $this->db->update("hris_payroll_register_tbl", ["payrollRegisterCode" => $payrollRegisterCode], ["payrollRegisterID" => $insertID]);
            }

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }


    public function revisePayrollRegisterItems($revisePayrollRegisterID = 0, $payrollRegisterID = 0)
    {
        if ($revisePayrollRegisterID && $payrollRegisterID)
        {
            $data = [];
            $payrollRegisterItems = $this->getAllPayrollRegisterItems($revisePayrollRegisterID);
            foreach ($payrollRegisterItems as $item) 
            {
                $temp = $item;
                unset($temp["payrollRegisterItemID"]);
                unset($temp["payrollRegisterID"]);
                unset($temp["fullname"]);
                unset($temp["employeeCode"]);
                unset($temp["profile"]);
                $temp["payrollRegisterID"] = $payrollRegisterID;
                $data[] = $temp;
            }

            if ($data && !empty($data))
            {
                $query = $this->db->insert_batch(
                    "hris_payroll_register_items_tbl",
                    $data
                );
                return $query ? true : false;
            }
        }
        return false;
    }

    public function updateBatchPayrollRegisterItems($payrollRegisterID = 0, $data = [], $idStr = "")
    {
        $query = $this->db->update_batch(
            'hris_payroll_register_items_tbl', 
            $data,
            'payrollRegisterItemID');
        return $query ? true : false;
    }

    public function getPayrollRegisterItemID($payrollRegisterID = 0, $employeeID = 0)
    {
        $sql    = "SELECT payrollRegisterItemID FROM hris_payroll_register_items_tbl WHERE payrollRegisterID = $payrollRegisterID AND employeeID = $employeeID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->payrollRegisterItemID : 0;
    }
    
    public function savePayrollRegisterItems($action = "", $payrollRegisterItems = [], $payrollRegisterID = "", $idStr = "")
    {
        if ($payrollRegisterItems && !empty($payrollRegisterItems))
        {
            if ($action == "update")
            {
                $this->updateBatchPayrollRegisterItems($payrollRegisterID, $payrollRegisterItems, $idStr);
            }
            else
            {
                $idArr = $data = [];
                foreach ($payrollRegisterItems as $item) 
                {
                    unset($item['payrollRegisterItemID']);
                    $payrollRegisterItemID = $this->getPayrollRegisterItemID($payrollRegisterID, $item['employeeID']);
                    $item['payrollRegisterItemID'] = $payrollRegisterItemID;
                    $data[]  = $item;
                    $idArr[] = $payrollRegisterItemID;
                }
                $idStr = implode(', ', $idArr);
                $this->updateBatchPayrollRegisterItems($payrollRegisterID, $data, $idStr);
                // $this->updateEmployeeSummary($payrollRegisterID);
            }
        }
        return false;
    }
    // ----- ********** END SAVE PAYROLL REGISTER DATA ********** -----

}

