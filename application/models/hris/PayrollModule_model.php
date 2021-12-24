<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PayrollModule_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    // ----- ********** SAVE PAYROLL DATA ********** -----
    public function savePayrollData($action = "", $payrollData = [], $payrollID = 0)
    {
        if ($action == "insert") 
        {
            $query = $this->db->insert("hris_payroll_tbl", $payrollData);
        } 
        else 
        {
            $where = ["payrollID" => $payrollID];
            $query = $this->db->update("hris_payroll_tbl", $payrollData, $where);
        }

        if ($query) 
        {
            $insertID = $action == "insert" ? $this->db->insert_id() : $payrollID;
            $payrollCode = "";

            if ($action == "insert")
            {
                $payrollCode = getFormCode("PRL", date("Y-m-d"), $insertID);
                $this->db->update("hris_payroll_tbl", ["payrollCode" => $payrollCode], ["payrollID" => $insertID]);
            }

            if ($payrollData["payrollStatus"] == 2) // IF APPROVED
            {
                // $this->insertPayrollData($payrollID);
            }

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function revisePayrollItems($revisePayrollID = 0, $payrollID = 0)
    {
        if ($revisePayrollID && $payrollID)
        {
            $data = [];
            $payrollItems = $this->getAllPayrollItems($revisePayrollID);
            foreach ($payrollItems as $item) 
            {
                $temp = $item;
                unset($temp["payrollItemID"]);
                unset($temp["payrollID"]);
                unset($temp["fullname"]);
                unset($temp["employeeCode"]);
                unset($temp["profile"]);
                unset($temp["hasBank"]);
                $temp["payrollID"] = $payrollID;
                $data[] = $temp;
            }

            if ($data && !empty($data))
            {
                $query = $this->db->insert_batch(
                    "hris_payroll_items_tbl",
                    $data
                );
                return $query ? true : false;
            }
        }
        return false;
    }

    public function updateOtherPayrollItems($payrollID = 0, $idStr = "")
    {
        // $sql = "
        // UPDATE hris_payroll_items_tbl
        // SET applyAdjustment          = 0,
        //     basicAdjustment          = 0,
        //     holidayAdjustment        = 0,
        //     overtimeAdjustment       = 0,
        //     nightDifferentialAdjustment = 0,
        //     allowanceAdjustment      = 0,
        //     lateUndertimeAdjustment  = 0,
        //     lwopAdjustment           = 0,
        //     sssAdjustment            = 0,
        //     phicAdjustment           = 0,
        //     hdmfAdjustment           = 0,
        //     withHoldingAdjustment    = 0,
        //     loanAdjustment           = 0,
        //     otherAdjustment          = 0,
        //     basicRemarks             = null,
        //     holidayRemarks           = null,
        //     overtimeRemarks          = null,
        //     nightDifferentialRemarks = null,
        //     allowanceRemarks         = null,
        //     lateUndertimeRemarks     = null,
        //     lwopRemarks              = null,
        //     sssRemarks               = null,
        //     phicRemarks              = null,
        //     hdmfRemarks              = null,
        //     withHoldingRemarks       = null,
        //     loanRemarks              = null,
        //     otherRemarks             = null
        // WHERE payrollAdjustmentItemID NOT IN ($idStr)
        //     AND payrollID = $payrollID";
        // $query = $this->db->query($sql);
        // return $query ? true : false;
    }

    public function getPayrollItemID($payrollID = 0, $employeeID = 0)
    {
        $sql    = "SELECT payrollItemID FROM hris_payroll_items_tbl WHERE payrollID = $payrollID AND employeeID = $employeeID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->payrollItemID : 0;
    }

    public function updateBatchPayrollItems($payrollID = 0, $data = [], $idStr = "")
    {
        $query = $this->db->update_batch(
            'hris_payroll_items_tbl', 
            $data,
            'payrollItemID');

        if ($idStr) {
            $this->updateOtherPayrollItems($payrollID, $idStr);
        }
    }

    public function getTotalMandateDeduction($payrollID = 0, $employeeID = 0)
    {
        $sql = "
        SELECT 
            (sssDeduction + (IF(sssAdjustment, sssAdjustment, 0)) 
            + phicDeduction + (IF(phicAdjustment, phicAdjustment, 0)) 
            + hdmfDeduction + (IF(hdmfAdjustment, hdmfAdjustment, 0)) 
            + withHoldingDeduction + (IF(withHoldingAdjustment, withHoldingAdjustment, 0))) AS totalDeduction 
        FROM hris_payroll_items_tbl WHERE payrollID = $payrollID AND employeeID = $employeeID";
        $query = $this->db->query($sql);
        $result = $query ? $query->row() : null;
        return $result ? $result->totalDeduction ?? 0 : 0;
    }

    public function updateTotalDeduction($payrollID = 0)
    {
        $items = $this->getAllPayrollItems($payrollID);
        if ($items && !empty($items))
        {
            $data = [];

            foreach ($items as $item) 
            {
                $employeeID    = $item['employeeID'];
                $payrollItemID = $item['payrollItemID'];

                $totalMandateDeduction = $this->getTotalMandateDeduction($payrollID, $employeeID);
                $data[] = [
                    'payrollItemID'  => $payrollItemID,
                    'totalDeduction' => $totalMandateDeduction
                ];
            }

            if ($data && !empty($data))
            {
                $this->updateBatchPayrollItems($payrollID, $data);
            }
        }
    }

    public function savePayrollItems($action = "", $payrollItems = [], $payrollID = "", $idStr = "")
    {
        if ($payrollItems && !empty($payrollItems))
        {
            if ($action == "update")
            {
                $this->updateBatchPayrollItems($payrollID, $payrollItems, $idStr);
            }
            else
            {
                $idArr = $data = [];
                foreach ($payrollItems as $item) 
                {
                    unset($item['payrollItemID']);
                    $payrollItemID = $this->getPayrollItemID($payrollID, $item['employeeID']);
                    $item['payrollItemID'] = $payrollItemID;
                    $data[]  = $item;
                    $idArr[] = $payrollItemID;
                }
                $idStr = implode(', ', $idArr);
                $this->updateBatchPayrollItems($payrollID, $data, $idStr);
                $this->updateTotalDeduction($payrollID);
            }
        }
        return false;
    }
    // ----- ********** END SAVE PAYROLL DATA ********** -----





    // ----- ********** GET PAYROLL DATA ********** -----
    public function getPayrollData($payrollID = 0)
    {
        $sql = "
        SELECT 
            hpt.*, htt.createdAt AS httCreatedAt,
            htt.approversID AS httApproversID,
            htt.approversDate AS httApproversDate
        FROM hris_payroll_tbl AS hpt
            LEFT JOIN hris_timekeeping_tbl AS htt USING(timekeepingID)
        WHERE payrollID = $payrollID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getAllPayrollItems($payrollID = 0)
    {
        if ($payrollID)
        {
            $sql = "
            SELECT 
                hpit.*, 
                employeeID,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                employeeCode,
                IF(employeeBankAccountNo AND employeeBankAccountNo IS NOT NULL, 1, 0) AS hasBank,
                IF(employeeProfile IS NOT NULL, employeeProfile, 'default.jpg') AS profile
            FROM hris_payroll_items_tbl AS hpit
                LEFT JOIN hris_employee_list_tbl USING(employeeID)
            WHERE payrollID = $payrollID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getPayrollItems($payrollID = 0)
    {
        $header = "";
        $items  = [];

        $payrollData = $this->getPayrollData($payrollID);
        if ($payrollData)
        {
            $dateFrom = date("F d, Y", strtotime($payrollData->payrollStartDate));
            $dateTo   = date("F d, Y", strtotime($payrollData->payrollEndDate));
            $header   = strtoupper("$dateFrom - $dateTo");
            $items    = $this->getAllPayrollItems($payrollID);
        }

        return [
            "header" => $header,
            "items"  => $items
        ];
    }

    public function isPayrollOnAdjustment($payrollID = 0)
    {
        $flag = 0;

        $sql    = "SELECT * FROM hris_payroll_adjustment_tbl WHERE payrollID = $payrollID AND payrollAdjustmentStatus NOT IN(3,4,5)";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : null;

        if ($result && !empty($result)) 
        {
            $status = $result->payrollAdjustmentStatus;
            if ($status == 0 || $status == 1) $flag = 1;
            if ($status == 2) $flag = 2;
        }

        return $flag;
    }

    public function getAllPayrollData($payrollID = 0)
    {
        $data = [
            "header"     => $this->getPayrollData($payrollID),
            "body"       => $this->getPayrollItems($payrollID),
            "adjustment" => $this->isPayrollOnAdjustment($payrollID),
        ];
        return $data;
    }
    // ----- ********** END GET PAYROLL DATA ********** -----





    // ---------- ********** PAYROLL ADJUSTMENT ********** ---------
    public function insertPayrollAdjustmentItems($payrollAdjustmentID = 0, $payrollItems = [])
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $data = [];
        foreach ($payrollItems as $item) 
        {
            $data[] = [
                'payrollAdjustmentID'         => $payrollAdjustmentID,
                'payrollItemID'               => $item['payrollItemID'],
                'employeeID'                  => $item['employeeID'],
                'basicPay'                    => $item['basicPay'],
                'holidayPay'                  => $item['holidayPay'],
                'overtimePay'                 => $item['overtimePay'],
                'nightDifferentialPay'        => $item['nightDifferentialPay'],
                'allowancePay'                => $item['allowance'],
                'lateUndertimePay'            => $item['lateUndertimeDeduction'],
                'lwopPay'                     => $item['lwopDeduction'],
                'sssPay'                      => $item['sssDeduction'],
                'phicPay'                     => $item['phicDeduction'],
                'hdmfPay'                     => $item['hdmfDeduction'],
                'withHoldingPay'              => $item['withHoldingDeduction'],
                'loanPay'                     => $item['loanDeduction'],
                'otherPay'                    => 0,
                'basicAdjustment'             => 0,
                'holidayAdjustment'           => 0,
                'overtimeAdjustment'          => 0,
                'nightDifferentialAdjustment' => 0,
                'allowanceAdjustment'         => 0,
                'lateUndertimeAdjustment'     => 0,
                'lwopAdjustment'              => 0,
                'sssAdjustment'               => 0,
                'phicAdjustment'              => 0,
                'hdmfAdjustment'              => 0,
                'withHoldingAdjustment'       => 0,
                'loanAdjustment'              => 0,
                'otherAdjustment'             => 0,
                'createdBy'                   => $sessionID,
                'updatedBy'                   => $sessionID,
            ];
        }

        if ($data && !empty($data))
        {
            $query = $this->db->insert_batch("hris_payroll_adjustment_items_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function updatePayrollItems($payrollID = 0, $payrollAdjustmentID = 0)
    {
        $query = $this->db->update(
            "hris_payroll_items_tbl",
            ["payrollAdjustmentID" => $payrollAdjustmentID],
            [
                "payrollID"        => $payrollID,
                "payrollItemID <>" => 0,
            ]
        );
        return $query ? true : false;
    }

    public function createPayrollAdjustment($payrollID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        // UPDATE EMPLOYEE ON PAYROLL
        $updatePayroll = $this->db->update(
            "hris_payroll_tbl", 
            ["employeeID" => $sessionID, ], 
            ["payrollID" => $payrollID]);

        $payrollData = $this->getAllPayrollData($payrollID);
        if ($payrollData && !empty($payrollData))
        {
            $payrollHeader = $payrollData["header"];
            $payrollBody   = $payrollData["body"];
            if ($payrollHeader && !empty($payrollHeader))
            {
                $data = [
                    'payrollID'               => $payrollID,
                    'payrollCode'             => $payrollHeader->payrollCode,
                    'employeeID'              => $payrollHeader->employeeID, 
                    'payrollAdjustmentStatus' => 0,
                    'createdBy'               => $sessionID,
                    'updatedBy'               => $sessionID,
                ];
                $query = $this->db->insert("hris_payroll_adjustment_tbl", $data);
                if ($query)
                {
                    $payrollAdjustmentID = $this->db->insert_id();
                    
                    if ($payrollBody && !empty($payrollBody) && !empty($payrollBody["items"]))
                    {
                        $this->insertPayrollAdjustmentItems($payrollAdjustmentID, $payrollBody["items"]);
                        // $this->updatePayrollItems($payrollID, $payrollAdjustmentID);
                    }

                    $payrollAdjustmentCode = getFormCode("PRA", date("Y-m-d"), $payrollAdjustmentID);
                    $this->db->update("hris_payroll_adjustment_tbl", ["payrollAdjustmentCode" => $payrollAdjustmentCode], ["payrollAdjustmentID" => $payrollAdjustmentID]);

                    return "true|Success|$payrollAdjustmentID|".date("Y-m-d");
                }
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    // ---------- ********** END PAYROLL ADJUSTMENT ********** ---------





    // ---------- ********** SALARY RELEASE ********** ----------
    public function insertHoldSalary($payrollID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        if ($payrollID)
        {
            $payrollItems = $this->getAllPayrollItems($payrollID);
            if ($payrollItems && !empty($payrollItems))
            {   
                $data = [];
                foreach ($payrollItems as $item) 
                {
                    $payrollItemID = $item['payrollItemID'];
                    $payrollID     = $item['payrollID'];
                    $holdSalary    = $item['holdSalary'];
                    $employeeID    = $item['employeeID'];
                    $netPay        = $item['netPay'];
                    
                    if ($holdSalary == 1)
                    {
                        $data[] = [
                            'payrollID'         => $payrollID,
                            'payrollItemID'     => $payrollItemID,
                            'employeeID'        => $employeeID,
                            'payrollHoldStatus' => 0,
                            'netPay'            => $netPay,
                            'createdBy'         => $sessionID,
                            'updatedBy'         => $sessionID
                        ];
                    }
                }

                if ($data && !empty($data))
                {
                    $query = $this->db->insert_batch("hris_salary_release_tbl", $data);
                    return $query ? true : false;
                }
            }
        }
        return false;
    }
    // ---------- ********** END SALARY RELEASE ********** ----------





    // ---------- ********** PAYROLL REGISTER ********** ----------
    public function getOtherAdditionalAdjustment($item = null) 
    {
        $additionalAdjustment = $otherDeduction = 0;
        
        if ($item)
        {
            $array = [
                $item['holidayAdjustment'] ?? 0,
                $item['overtimeAdjustment'] ?? 0,
                $item['nightDifferentialAdjustment'] ?? 0,
                $item['allowanceAdjustment'] ?? 0,
                $item['lateUndertimeAdjustment'] ?? 0,
                $item['lwopAdjustment'] ?? 0,
                $item['sssAdjustment'] ?? 0,
                $item['phicAdjustment'] ?? 0,
                $item['hdmfAdjustment'] ?? 0,
                $item['withHoldingAdjustment'] ?? 0,
                $item['loanAdjustment'] ?? 0,
                $item['otherAdjustment'] ?? 0,
            ];
    
            foreach($array as $key => $arr)
            {
                if ($arr < 0) $otherDeduction += $arr;
                else $additionalAdjustment += $arr;
            } 
        }

        return [
            "additionalAdjustment" => $additionalAdjustment,
            "otherDeduction"       => $otherDeduction,
        ];
    }

    public function insertPayrollRegisterItems($payrollID = 0, $payrollRegisterID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $items = $this->getAllPayrollItems($payrollID);
        if ($items && !empty($items))
        {
            $data = [];
            foreach ($items as $item) 
            {
                $adjustment = $this->getOtherAdditionalAdjustment($item);
                $additionalAdjustment = $adjustment['additionalAdjustment'];
                $otherDeduction       = $adjustment['otherDeduction'];

                $data[] = [
                    'payrollRegisterID'      => $payrollRegisterID,
                    'payrollID'              => $payrollID,
                    'employeeID'             => $item['employeeID'],
                    'totalDays'              => $item['workingDays'],
                    'basicSalary'            => $item['basicSalary'],
                    'basicPay'               => $item['basicPay'],
                    'holidayPay'             => $item['holidayPay'],
                    'overtimePay'            => $item['overtimePay'],
                    'nightDifferentialPay'   => $item['nightDifferentialPay'],
                    'allowance'              => $item['allowance'],
                    'paidLeave'              => $item['leavePay'],
                    'additionalAdjustment'   => $additionalAdjustment,
                    'lateUndertimeDeduction' => $item['lateUndertimeDeduction'],
                    'lwopDeduction'          => $item['lwopDeduction'],
                    'grossPay'               => $item['grossPay'] ?? 0,
                    'sssDeduction'           => $item['sssDeduction'],
                    'phicDeduction'          => $item['phicDeduction'],
                    'hdmfDeduction'          => $item['hdmfDeduction'],
                    'withHoldingDeduction'   => $item['withHoldingDeduction'], 
                    'loanDeduction'          => $item['loanDeduction'],
                    'totalMandates'          => $item['totalDeduction'],
                    'otherDeductions'        => $otherDeduction,
                    'netPay'                 => $item['netPay'] ?? 0,
                    'hasBank'                => $item['hasBank'],
                    'salaryWages'            => $item['grossPay'] - $item['allowance'],
                    'onHoldSalary'           => $item['holdSalary'] == 1 ? $item['netPay'] : 0, 
                    'salaryOnBank'           => $item['holdSalary'] == 0 && $item['hasBank'] == 1 ? $item['netPay'] : 0,
                    'salaryOnCheck'          => $item['holdSalary'] == 0 && $item['hasBank'] == 0 ? $item['netPay'] : 0,
                    'totalSalary'            => $item['netPay'],
                    'createdBy'              => $sessionID,
                    'updatedBy'              => $sessionID,
                ];
            }

            if ($data && !empty($data))
            {
                $query = $this->db->insert_batch('hris_payroll_register_items_tbl', $data);
                return $query ? true : false;
            }
        }
        return false;
    }

    public function insertPayrollRegister($payrollID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $payroll = $this->getPayrollData($payrollID);
        if ($payroll && !empty($payroll))
        {
            $data = [
                'payrollID'             => $payrollID,
                'payrollCode'           => $payroll->payrollCode,
                'employeeID'            => 0,
                'payrollRegisterStatus' => 0,
                'createdBy'             => $sessionID,
                'updatedBy'             => $sessionID,
            ];
            $query = $this->db->insert('hris_payroll_register_tbl', $data);
            if ($query)
            {
                $payrollRegisterID   = $this->db->insert_id();
                $payrollRegisterCode = getFormCode("PRR", date("Y-m-d"), $payrollRegisterID);
                $this->db->update("hris_payroll_register_tbl", ["payrollRegisterCode" => $payrollRegisterCode], ["payrollRegisterID" => $payrollRegisterID]);

                $payrollRegisterItems = $this->insertPayrollRegisterItems($payrollID, $payrollRegisterID);
            }
        }
    }
    // ---------- ********** END PAYROLL REGISTER ********** ----------





    // ---------- ********** PAYROLL PAYSLIP ********** ----------
    public function generateEmployeePayslip($payrollID = 0)
    {
        $sql = "
        SELECT
            hpit.payrollID,
            helt.departmentID,
            helt.designationID,
            hpit.employeeID,
            employeeCode,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
            departmentName,
            designationName,
            employeeSSS,
            employeePhilHealth,
            employeePagibig,
            employeeTIN,
            CONCAT(DATE_FORMAT(hpit.startDate, '%M %d, %Y'), ' - ', DATE_FORMAT(hpit.endDate, '%M %d, %Y')) AS payPeriod,
            (SELECT
                (CASE
                    WHEN hpt.cutOff = 1 THEN DATE_FORMAT(CONCAT(DATE_FORMAT(hpit.endDate, '%Y-%m'), '-', IF(firstCutOffPayOut IN (30,31), DAY(LAST_DAY(hpit.endDate)), firstCutOffPayOut)), '%M %d, %Y')
                    WHEN hpt.cutOff = 2 THEN DATE_FORMAT(CONCAT(DATE_FORMAT(hpit.endDate, '%Y-%m'), '-', IF(secondCutOffPayOut IN (30,31), DAY(LAST_DAY(hpit.endDate)), secondCutOffPayOut)), '%M %d, %Y')
                    WHEN hpt.cutOff = 3 THEN DATE_FORMAT(CONCAT(DATE_FORMAT(hpit.endDate, '%Y-%m'), '-', IF(thirdCutOffPayOut IN (30,31), DAY(LAST_DAY(hpit.endDate)), thirdCutOffPayOut)), '%M %d, %Y')
                    ELSE DATE_FORMAT(CONCAT(DATE_FORMAT(hpit.endDate, '%Y-%m'), '-', IF(fourthCutOffPayOut IN (30,31), DAY(LAST_DAY(hpit.endDate)), fourthCutOffPayOut)), '%M %d, %Y') END) AS payOut
            FROM gen_system_setting_tbl) AS payOut,
            workingDays AS totalDays,
            basicSalary,
            basicPay,
            (holidayPay + (IF(holidayAdjustment, holidayAdjustment, 0))) AS holidayPay,
            (overtimePay + (IF(overtimeAdjustment, overtimeAdjustment, 0))) AS overtimePay,
            (nightDifferentialPay + (IF(nightDifferentialAdjustment, nightDifferentialAdjustment, 0))) AS nightDifferentialPay,
            (allowance + (IF(allowanceAdjustment, allowanceAdjustment, 0))) AS allowance,
            leavePay,
            (lateUndertimeDeduction + (IF(lateUndertimeAdjustment, lateUndertimeAdjustment, 0))) AS lateUndertimeDeduction,
            (lwopDeduction + (IF(lwopAdjustment, lwopAdjustment, 0))) AS lwopDeduction,
            grossPay,
            (basicSalary
            + (holidayPay + (IF(holidayAdjustment, holidayAdjustment, 0)))
            + (overtimePay + (IF(overtimeAdjustment, overtimeAdjustment, 0)))
            + (nightDifferentialPay + (IF(nightDifferentialAdjustment, nightDifferentialAdjustment, 0)))
            + (allowance + (IF(allowanceAdjustment, allowanceAdjustment, 0)))
            + (IF(otherAdjustment AND otherAdjustment > 0, otherAdjustment, 0))
            + leavePay) AS totalEarning,
            (sssDeduction + (IF(sssAdjustment, sssAdjustment, 0))) AS sssDeduction,
            (phicDeduction + (IF(phicAdjustment, phicAdjustment, 0))) AS phicDeduction,
            (hdmfDeduction + (IF(hdmfAdjustment, hdmfAdjustment, 0))) AS hdmfDeduction,
            (withHoldingDeduction + (IF(withHoldingAdjustment, withHoldingAdjustment, 0))) AS withHoldingDeduction,
            (loanDeduction + (IF(loanAdjustment, loanAdjustment, 0))) AS loanDeduction,
            ((lateUndertimeDeduction + (IF(lateUndertimeAdjustment, lateUndertimeAdjustment, 0)))
            + (lwopDeduction + (IF(lwopAdjustment, lwopAdjustment, 0)))
            + (sssDeduction + (IF(sssAdjustment, sssAdjustment, 0)))
            + (phicDeduction + (IF(phicAdjustment, phicAdjustment, 0)))
            + (hdmfDeduction + (IF(hdmfAdjustment, hdmfAdjustment, 0)))
            + (withHoldingDeduction + (IF(withHoldingAdjustment, withHoldingAdjustment, 0)))
            + (IF(otherAdjustment AND otherAdjustment < 0, ABS(otherAdjustment), 0))) AS totalDeduction,
            (IF(otherAdjustment AND otherAdjustment < 0, ABS(otherAdjustment), 0)) AS otherDeduction,
            (IF(otherAdjustment AND otherAdjustment > 0, otherAdjustment, 0)) AS otherEarning,
            netPay
        FROM hris_payroll_items_tbl AS hpit
            LEFT JOIN hris_employee_list_tbl AS helt ON hpit.employeeID = helt.employeeID
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID
            LEFT JOIN hris_payroll_tbl AS hpt ON hpit.payrollID = hpt.payrollID
        WHERE hpit.payrollID = $payrollID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getLeaveCredits($payrollID = 0, $employeeID = 0, $leaveID = 0)
    {
        $totalLeave     = 0;
        $usedLeave      = 0;
        $remainingLeave = 0;

        $sql = "
        SELECT 
            (SELECT 
                COUNT(*) 
            FROM hris_payroll_adjustment_pending_tbl AS hpapt2 
                LEFT JOIN hris_leave_request_tbl AS hlrt2 ON hpapt2.tablePrimaryID=hlrt2.leaveRequestID
            WHERE hpapt2.employeeID = $employeeID AND hlrt2.leaveID = $leaveID AND hpapt2.adjustmentType = 'leave') AS pendingLeave,
            SUM(IF(htit.leaveWorkingDay = 1, 1, 0.5)) AS usedLeave,
            (SELECT leaveCredit FROM hris_employee_leave_tbl WHERE employeeID = $employeeID AND leaveID = $leaveID) AS remainingLeave
        FROM hris_payroll_tbl AS hpt 
            LEFT JOIN hris_timekeeping_items_tbl AS htit USING(timekeepingID)
            LEFT JOIN hris_leave_request_tbl AS hlrt ON htit.leaveID = hlrt.leaveRequestID
        WHERE hpt.payrollID = $payrollID
            AND htit.leaveID <> 0 
            AND htit.employeeID = $employeeID
            AND hlrt.leaveID = $leaveID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : null;
        if ($result) {
            $pendingLeave   = $result->pendingLeave ?? 0;
            $usedLeave      = $result->usedLeave ?? 0;
            $remainingLeave = $result->remainingLeave ?? 0;

            $usedLeave  = $usedLeave + $pendingLeave;
            $totalLeave = $usedLeave + $remainingLeave;
        }

        return [
            "totalLeave"     => $totalLeave,
            "usedLeave"      => $usedLeave,
            "remainingLeave" => $remainingLeave,
        ];
    }

    public function insertPayrollPayslip($payrollID = 0)
    {
        $data = $this->generateEmployeePayslip($payrollID);
        if ($data && !empty($data))
        {
            foreach($data as $key => $dt)
            {
                $payrollID  = $dt['payrollID'];
                $employeeID = $dt['employeeID'];

                $sl = $this->getLeaveCredits($payrollID, $employeeID, 1); // SL 
                $slTotal     = $sl['totalLeave'] ?? 0;               
                $slUsed      = $sl['usedLeave'] ?? 0;               
                $slRemaining = $sl['remainingLeave'] ?? 0;               

                $vl = $this->getLeaveCredits($payrollID, $employeeID, 2); // SL 
                $vlTotal     = $vl['totalLeave'] ?? 0;               
                $vlUsed      = $vl['usedLeave'] ?? 0;               
                $vlRemaining = $vl['remainingLeave'] ?? 0;    
                
                $data[$key]['slTotal']     = $slTotal;
                $data[$key]['slUsed']      = $slUsed;
                $data[$key]['slRemaining'] = $slRemaining;
                $data[$key]['vlTotal']     = $vlTotal;
                $data[$key]['vlUsed']      = $vlUsed;
                $data[$key]['vlRemaining'] = $vlRemaining;
            }
            $query = $this->db->insert_batch('hris_payslip_tbl', $data);
            return $query ? true : false;
        }
        return false;
    }
    // ---------- ********** END PAYROLL PAYSLIP ********** ----------





    // ----- ********** REPORTS ********** -----
    public function getCompanyProfile()
    {
        $sql   = "SELECT * FROM gen_company_profile_tbl LIMIT 1";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }
    // ----- ********** END REPORTS ********** -----





    // ---------- ********** LOAN ********** ---------
    public function updateLoanForm($payrollID = 0)
    {
        $data = [];

        $payroll = $this->getPayrollData($payrollID);
        if ($payroll) {
            $payrollCode = $payroll->payrollCode ?? '';

            $items = $this->getAllPayrollItems($payrollID);
            if ($items && !empty($items)) {
                foreach ($items as $item) {
                    $ammortizationID     = $item['ammortizationID'] ?? null;
                    $ammortizationAmount = $item['ammortizationAmount'] ?? null;
    
                    if ($ammortizationID && $ammortizationAmount) {
                        $ammortizationIDArr     = explode("|", $ammortizationID);
                        $ammortizationAmountArr = explode("|", $ammortizationAmount);
                        foreach ($ammortizationIDArr as $i => $arr) {
                            $data[] = [
                                'ammortizationID'     => $arr,
                                'recievedDate'        => date('Y-m-d'),
                                'payrollID'           => $payrollID,
                                'payrollCode'         => $payrollCode,
                                'payrollAmount'       => $ammortizationAmountArr[$i],
                                'ammortizationStatus' => 1,
                            ];
                        }
                    }
                }
            }
        }

        if ($data && !empty($data)) {
            $query = $this->db->update_batch('hris_loan_ammortization_tbl', $data, 'ammortizationID');
            return $query ? true : false;
        }
        return false;
    }
    // ---------- ********** END LOAN ********** ---------

    
}
