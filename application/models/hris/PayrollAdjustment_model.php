<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');

class PayrollAdjustment_model extends CI_Model {

    // ----- ********** SAVE PAYROLL ADJUSTMENT DATA ********** -----
    public function savePayrollAdjustmentData($action = "", $payrollAdjustmentData = [], $payrollAdjustmentID = 0)
    {
        if ($action == "insert") 
        {
            $query = $this->db->insert("hris_payroll_adjustment_tbl", $payrollAdjustmentData);
        } 
        else 
        {
            $where = ["payrollAdjustmentID" => $payrollAdjustmentID];
            $query = $this->db->update("hris_payroll_adjustment_tbl", $payrollAdjustmentData, $where);
        }

        if ($query) 
        {
            $insertID = $action == "insert" ? $this->db->insert_id() : $payrollAdjustmentID;
            $payrollAdjustmentCode = "";

            if ($action == "insert")
            {
                $payrollAdjustmentCode = getFormCode("PA", date("Y-m-d"), $insertID);
                $this->db->update("hris_payroll_adjustment_tbl", ["payrollAdjustmentCode" => $payrollAdjustmentCode], ["payrollAdjustmentID" => $insertID]);
            }

            if ($payrollAdjustmentData["payrollAdjustmentStatus"] == 2) // IF APPROVED
            {
                // $this->insertPayrollData($payrollID);
            }

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function revisePayrollAdjustmentItems($revisePayrollAdjustmentID = 0, $payrollAdjustmentID = 0)
    {
        if ($revisePayrollAdjustmentID && $payrollAdjustmentID)
        {
            $data = [];
            $adjustmentItems = $this->getAllPayrollAdjustmentItems($revisePayrollAdjustmentID);
            foreach ($adjustmentItems as $item) 
            {
                $temp = $item;
                unset($temp["payrollAdjustmentItemID"]);
                unset($temp["payrollAdjustmentID"]);
                unset($temp["fullname"]);
                unset($temp["employeeCode"]);
                unset($temp["profile"]);
                $temp["payrollAdjustmentID"] = $payrollAdjustmentID;
                $data[] = $temp;
            }

            if ($data && !empty($data))
            {
                $query = $this->db->insert_batch(
                    "hris_payroll_adjustment_items_tbl",
                    $data
                );
                return $query ? true : false;
            }
        }
        return false;
    }

    public function updateOtherPayrollAdjustmentItems($payrollAdjustmentID = 0, $idStr = "")
    {
        $sql = "
        UPDATE hris_payroll_adjustment_items_tbl
        SET applyAdjustment          = 0,
            basicAdjustment          = 0,
            holidayAdjustment        = 0,
            overtimeAdjustment       = 0,
            nightDifferentialAdjustment = 0,
            allowanceAdjustment      = 0,
            lateUndertimeAdjustment  = 0,
            lwopAdjustment           = 0,
            sssAdjustment            = 0,
            phicAdjustment           = 0,
            hdmfAdjustment           = 0,
            withHoldingAdjustment    = 0,
            loanAdjustment           = 0,
            otherAdjustment          = 0,
            basicRemarks             = null,
            holidayRemarks           = null,
            overtimeRemarks          = null,
            nightDifferentialRemarks = null,
            allowanceRemarks         = null,
            lateUndertimeRemarks     = null,
            lwopRemarks              = null,
            sssRemarks               = null,
            phicRemarks              = null,
            hdmfRemarks              = null,
            withHoldingRemarks       = null,
            loanRemarks              = null,
            otherRemarks             = null
        WHERE payrollAdjustmentItemID NOT IN ($idStr)
            AND payrollAdjustmentID = $payrollAdjustmentID";
        $query = $this->db->query($sql);
        return $query ? true : false;
    }

    public function getPayrollAdjustmentItemID($payrollAdjustmentID = 0, $employeeID = 0)
    {
        $sql    = "SELECT payrollAdjustmentItemID FROM hris_payroll_adjustment_items_tbl WHERE payrollAdjustmentID = $payrollAdjustmentID AND employeeID = $employeeID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->payrollAdjustmentItemID : 0;
    }

    public function updateBatchPayrollAdjustmentItems($payrollAdjustmentID = 0, $data = [], $idStr = "")
    {
        $query = $this->db->update_batch(
            'hris_payroll_adjustment_items_tbl', 
            $data,
            'payrollAdjustmentItemID');
        $this->updateOtherPayrollAdjustmentItems($payrollAdjustmentID, $idStr);
    }

    public function savePayrollAdjustmentItems($action = "", $payrollAdjustmentItems = [], $payrollAdjustmentID = 0, $idStr = "")
    {
        if ($payrollAdjustmentItems && !empty($payrollAdjustmentItems))
        {
            if ($action == "update")
            {
                $this->updateBatchPayrollAdjustmentItems($payrollAdjustmentID, $payrollAdjustmentItems, $idStr);
            }
            else
            {
                $idArr = $data = [];
                foreach ($payrollAdjustmentItems as $item) 
                {
                    unset($item['payrollAdjustmentItemID']);
                    $payrollAdjustmentItemID = $this->getPayrollAdjustmentItemID($item['payrollAdjustmentID'], $item['employeeID']);
                    $item['payrollAdjustmentItemID'] = $payrollAdjustmentItemID;
                    $data[]  = $item;
                    $idArr[] = $payrollAdjustmentItemID;
                }
                $idStr = implode(', ', $idArr);
                $this->updateBatchPayrollAdjustmentItems($payrollAdjustmentID, $data, $idStr);
            }
        }
        return false;
    }
    // ----- ********** END SAVE PAYROLL ADJUSTMENT DATA ********** -----



    // ----- ********** GET PAYROLL ADJUSTMENT DATA ********** -----
    public function getPayrollAdjustmentData($payrollAdjustmentID = 0)
    {
        $sql = "
        SELECT 
            hpat.*, payrollStartDate, payrollEndDate
        FROM hris_payroll_adjustment_tbl AS hpat
            LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)
        WHERE payrollAdjustmentID = $payrollAdjustmentID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getAllPayrollAdjustmentItems($payrollAdjustmentID = 0, $employeeIDStr = '')
    {
        if ($payrollAdjustmentID)
        {
            $others = $employeeIDStr ? "AND hpait.employeeID IN($employeeIDStr)" : "";

            $sql = "
            SELECT 
                hpait.*, 
                employeeID,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                employeeCode,
                IF(employeeProfile IS NOT NULL, employeeProfile, 'default.jpg') AS profile,
                (IF(basicAdjustment,1,0) 
                    + IF(holidayAdjustment,1,0) 
                    + IF(overtimeAdjustment,1,0)
                    + IF(nightDifferentialAdjustment,1,0)
                    + IF(allowanceAdjustment,1,0)
                    + IF(lateUndertimeAdjustment,1,0)
                    + IF(lwopAdjustment,1,0)
                    + IF(sssAdjustment,1,0)
                    + IF(phicAdjustment,1,0)
                    + IF(hdmfAdjustment,1,0)
                    + IF(withHoldingAdjustment,1,0)
                    + IF(loanAdjustment,1,0)
                    + IF(otherAdjustment,1,0)
                ) AS rowCount
            FROM hris_payroll_adjustment_items_tbl AS hpait
                LEFT JOIN hris_employee_list_tbl USING(employeeID)
            WHERE payrollAdjustmentID = $payrollAdjustmentID $others";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getPayrollAdjustmentEmployee($payrollAdjustmentID = 0)
    {
        if ($payrollAdjustmentID)
        {
            $sql = "
            SELECT 
                employeeID,
                CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                employeeCode
            FROM hris_payroll_items_tbl AS hpat
                LEFT JOIN hris_employee_list_tbl USING(employeeID)
            WHERE payrollAdjustmentID = $payrollAdjustmentID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getPayrollAdjustmentItems($payrollAdjustmentID = 0, $employeeIDStr = '')
    {
        $header = "";
        $items  = [];

        $payrollAdjustmentData = $this->getPayrollAdjustmentData($payrollAdjustmentID);
        if ($payrollAdjustmentData)
        {
            $dateFrom  = date("F d, Y", strtotime($payrollAdjustmentData->payrollStartDate));
            $dateTo    = date("F d, Y", strtotime($payrollAdjustmentData->payrollEndDate));
            $header    = strtoupper("$dateFrom - $dateTo");
            $items     = $this->getAllPayrollAdjustmentItems($payrollAdjustmentID, $employeeIDStr);
        }

        return [
            "header" => $header,
            "items"  => $items,
        ];
    }

    public function getAllPayrollAdjustmentData($payrollAdjustmentID = 0, $employeeIDStr = '')
    {
        $data = [
            "header" => $this->getPayrollAdjustmentData($payrollAdjustmentID),
            "body"   => $this->getPayrollAdjustmentItems($payrollAdjustmentID, $employeeIDStr),
        ];
        return $data;
    }
    // ----- ********** END GET PAYROLL ADJUSTMENT DATA ********** -----







    // ----- ********** PAYROLL ADJUSTMENT PENDING DATA ********** -----
    public function getPendingPayrollAdjustment() 
    {
        $sql = "
        SELECT 
            hpat.*, employeeCode, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname
        FROM hris_payroll_adjustment_pending_tbl AS hpat   
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID)
        WHERE payrollAdjustmentID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getAssignTo($employeeID = 0)
    {
        $sql = "
        SELECT 
            hpat.payrollID, hpait.payrollAdjustmentID, payrollAdjustmentCode
        FROM hris_payroll_adjustment_items_tbl AS hpait 
            LEFT JOIN hris_payroll_adjustment_tbl AS hpat USING(payrollAdjustmentID)
        WHERE hpait.employeeID = $employeeID 
            AND hpat.payrollAdjustmentStatus = 0";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getPendingContentData()
    {
        $data = [];

        $pendings = $this->getPendingPayrollAdjustment();
        if ($pendings && !empty($pendings))
        {
            foreach ($pendings as $pending) 
            {
                $data[] = [
                    'payrollAdjustmentPendingID' => $pending['payrollAdjustmentPendingID'],
                    'payrollAdjustmentID' => $pending['payrollAdjustmentID'],
                    'employeeID'          => $pending['employeeID'],
                    'employeeCode'        => $pending['employeeCode'],
                    'fullname'            => $pending['fullname'],
                    'tableName'           => $pending['tableName'],
                    'tablePrimaryID'      => $pending['tablePrimaryID'],
                    'tablePrimaryCode'    => $pending['tablePrimaryCode'],
                    'adjustmentType'      => $pending['adjustmentType'],
                    'controller'          => $pending['controller'],
                    'adjustmentAmount'    => $pending['adjustmentAmount'],
                    'adjustmentRemarks'   => $pending['adjustmentRemarks'],
                    'assignTo'            => $this->getAssignTo($pending['employeeID'])
                ];
            }
        }

        return $data;
    }
    // ----- ********** END PAYROLL ADJUSTMENT PENDING DATA ********** -----


    // ----- ********** ASSIGN PAYROLL ADJUSTMENT ********** ----- 
    public function getPayrollAdjustmentPending($payrollAdjustmentPendingID = 0)
    {
        $sql  = "SELECT * FROM hris_payroll_adjustment_pending_tbl WHERE payrollAdjustmentPendingID = $payrollAdjustmentPendingID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function updatePayrollAdjustmentItem($payrollAdjustmentPendingID = 0, $payrollAdjustmentID = 0, $employeeID = 0)
    {
        $payrollAdjustment = $this->getPayrollAdjustmentPending($payrollAdjustmentPendingID);
        if ($payrollAdjustment && !empty($payrollAdjustment))
        {
            $amount  = $payrollAdjustment->adjustmentAmount ?? 0;
            $remarks = $payrollAdjustment->adjustmentRemarks;
            $adjustmentType = $payrollAdjustment->adjustmentType;

            $ADJUSTMENT_TYPES = [
                "holiday"       => "holidayAdjustment",
                "overtime"      => "overtimeAdjustment",
                "allowance"     => "allowanceAdjustment",
                "lateUndertime" => "lateUndertimeAdjustment",
                "leave"         => "lwopAdjustment",
                "sss"           => "sssAdjustment",
                "phic"          => "phicAdjustment",
                "hdmf"          => "hdmfAdjustment",
                "withHolding"   => "withHoldingAdjustment",
                "loan"          => "loanAdjustment",
            ];

            $REMARKS = [
                "holiday"       => "holidayRemarks",
                "overtime"      => "overtimeRemarks",
                "allowance"     => "allowanceRemarks",
                "lateUndertime" => "lateUndertimeRemarks",
                "leave"         => "lwopRemarks",
                "sss"           => "sssRemarks",
                "phic"          => "phicRemarks",
                "hdmf"          => "hdmfRemarks",
                "withHolding"   => "withHoldingRemarks",
                "loan"          => "loanRemarks",
            ];

            $adjustmentTypeColumn   = $ADJUSTMENT_TYPES[$adjustmentType];
            $adjustmentRemarkColumn = $REMARKS[$adjustmentType];

            $query = $this->db->update(
                "hris_payroll_adjustment_items_tbl",
                [
                    "$adjustmentTypeColumn"   => $amount,
                    "$adjustmentRemarkColumn" => $remarks,
                    "applyAdjustment"         => 1,
                ],
                [
                    "payrollAdjustmentID"         => $payrollAdjustmentID,
                    "employeeID"                  => $employeeID,
                    "payrollAdjustmentItemID <> " => 0
                ]
            );
            return $query ? true : false;
        }
        return false;
    }

    public function assignPayrollAdjustment($payrollAdjustmentPendingID = 0, $payrollAdjustmentID = 0, $payrollID = 0, $employeeID = 0)
    {
        $query = $this->db->update(
            "hris_payroll_adjustment_pending_tbl",
            [
                "payrollAdjustmentID" => $payrollAdjustmentID,
                "payrollID"           => $payrollID
            ],
            ["payrollAdjustmentPendingID" => $payrollAdjustmentPendingID]
        );
        if ($query) {
            $this->updatePayrollAdjustmentItem($payrollAdjustmentPendingID, $payrollAdjustmentID, $employeeID);
            return "true|Submitted successfully!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    // ----- ********** END ASSIGN PAYROLL ADJUSTMENT ********** ----- 





    // ----- ********** UPDATE PAYROLL ITEMS ********** -----
    public function getCheckedPayrollAdjustmentItems($payrollAdjustmentID = 0)
    {
        $sql   = "SELECT * FROM hris_payroll_adjustment_items_tbl WHERE payrollAdjustmentID = $payrollAdjustmentID AND applyAdjustment = 1";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getPayrollItems($payrollID = 0)
    {
        $sql   = "SELECT * FROM hris_payroll_items_tbl WHERE payrollID = $payrollID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function updatePayrollItemsComputation($payrollID = 0, $deduction = 0)
    {
        $data = [];

        $payrollItems = $this->getPayrollItems($payrollID);
        if ($payrollItems && !empty($payrollItems))
        {
            foreach ($payrollItems as $item) {
                $payrollItemID                      = $item['payrollItemID'] ?? 0;
                $payrollID                          = $item['payrollID'] ?? 0;
                $timekeepingID                      = $item['timekeepingID'] ?? 0;
                $payrollAdjustmentID                = $item['payrollAdjustmentID'] ?? 0;
                $onAdjustment                       = $item['onAdjustment'] ?? 0;
                $employeeID                         = $item['employeeID'] ?? 0;
                $hourlyRate                         = $item['hourlyRate'] ?? 0;
                $holdSalary                         = $item['holdSalary'] ?? 0;
                $deductMandates                     = $item['deductMandates'] ?? 0;
                $startDate                          = $item['startDate'];
                $endDate                            = $item['endDate'];
                $workingDays                        = $item['workingDays'] ?? 0;
                $holidays                           = $item['holidays'] ?? 0;
                $lwopDays                           = $item['lwopDays'] ?? 0;
                $paidLeaveDays                      = $item['paidLeaveDays'] ?? 0;
                $restDays                           = $item['restDays'] ?? 0;
                $scheduleHours                      = $item['scheduleHours'] ?? 0;
                $basicHours                         = $item['basicHours'] ?? 0;
                $overtimeHours                      = $item['overtimeHours'] ?? 0;
                $nightDifferentialHours             = $item['nightDifferentialHours'] ?? 0;
                $lateUndertimeHours                 = $item['lateUndertimeHours'] ?? 0;
                $lwopHours                          = $item['lwopHours'] ?? 0;
                $basicSalary                        = $item['basicSalary'] ?? 0;
                $basicPay                           = $item['basicPay'] ?? 0;
                $holidayPay                         = $item['holidayPay'] ?? 0;
                $holidayAdjustment                  = $item['holidayAdjustment'] ?? 0;
                $holidayAdjustmentRemarks           = $item['holidayAdjustmentRemarks'];
                $overtimePay                        = $item['overtimePay'] ?? 0;
                $overtimeAdjustment                 = $item['overtimeAdjustment'] ?? 0;
                $overtimeAdjustmentRemarks          = $item['overtimeAdjustmentRemarks'];
                $nightDifferentialPay               = $item['nightDifferentialPay'] ?? 0;
                $nightDifferentialAdjustment        = $item['nightDifferentialAdjustment'] ?? 0;
                $nightDifferentialAdjustmentRemarks = $item['nightDifferentialAdjustmentRemarks'];
                $allowance                          = $item['allowance'] ?? 0;
                $allowanceAdjustment                = $item['allowanceAdjustment'] ?? 0;
                $allowanceAdjustmentRemarks         = $item['allowanceAdjustmentRemarks'];
                $leavePay                           = $item['leavePay'] ?? 0;
                $lateUndertimeDeduction             = $item['lateUndertimeDeduction'] ?? 0;
                $lateUndertimeAdjustment            = $item['lateUndertimeAdjustment'] ?? 0;
                $lateUndertimeAdjustmentRemarks     = $item['lateUndertimeAdjustmentRemarks'];
                $lwopDeduction                      = $item['lwopDeduction'] ?? 0;
                $lwopAdjustment                     = $item['lwopAdjustment'] ?? 0;
                $lwopAdjustmentRemarks              = $item['lwopAdjustmentRemarks'];
                $prevGrossPay                       = $item['prevGrossPay'] ?? 0;
                $grossPay                           = $item['grossPay'] ?? 0;
                $sssBasis                           = $item['sssBasis'] ?? 0;
                $sssDeduction                       = $item['sssDeduction'] ?? 0;
                $sssAdjustment                      = $item['sssAdjustment'] ?? 0;
                $sssAdjustmentRemarks               = $item['sssAdjustmentRemarks'];
                $sssEmployer                        = $item['sssEmployer'] ?? 0;
                $sssTotal                           = $item['sssTotal'] ?? 0;
                $phicBasis                          = $item['phicBasis'] ?? 0;
                $phicDeduction                      = $item['phicDeduction'] ?? 0;
                $phicAdjustment                     = $item['phicAdjustment'] ?? 0;
                $phicAdjustmentRemarks              = $item['phicAdjustmentRemarks'];
                $phicEmployer                       = $item['phicEmployer'] ?? 0;
                $phicTotal                          = $item['phicTotal'] ?? 0;
                $hdmfBasis                          = $item['hdmfBasis'] ?? 0;
                $hdmfDeduction                      = $item['hdmfDeduction'] ?? 0;
                $hdmfAdjustment                     = $item['hdmfAdjustment'] ?? 0;
                $hdmfAdjustmentRemarks              = $item['hdmfAdjustmentRemarks'];
                $hdmfEmployer                       = $item['hdmfEmployer'] ?? 0;
                $hdmfTotal                          = $item['hdmfTotal'] ?? 0;
                $withHoldingBasis                   = $item['withHoldingBasis'] ?? 0;
                $withHoldingDeduction               = $item['withHoldingDeduction'] ?? 0;
                $withHoldingAdjustment              = $item['withHoldingAdjustment'] ?? 0;
                $withHoldingAdjustmentRemarks       = $item['withHoldingAdjustmentRemarks'];
                $totalDeduction                     = $item['totalDeduction'] ?? 0;
                $loanBasis                          = $item['loanBasis'] ?? 0;
                $loanAdjustment                     = $item['loanAdjustment'] ?? 0;
                $loanAdjustmentRemarks              = $item['loanAdjustmentRemarks'];
                $loanDeduction                      = $item['loanDeduction'] ?? 0;
                $otherAdjustment                    = $item['otherAdjustment'] ?? 0;
                $otherAdjustmentRemarks             = $item['otherAdjustmentRemarks'];
                $prevNetPay                         = $item['prevNetPay'] ?? 0;
                $netPay                             = $item['netPay'] ?? 0;

                $tempGrossPay = $basicSalary + $holidayPay + $holidayAdjustment + $overtimePay + $overtimeAdjustment + $nightDifferentialPay + $nightDifferentialAdjustment + $leavePay;
                $tempGrossDeduction = $lateUndertimeDeduction + $lateUndertimeAdjustment + $lwopDeduction + $lwopAdjustment; 
                
                $grossPay = $tempGrossPay - $tempGrossDeduction;
                $totalGrossPay = $grossPay + $prevGrossPay;

                if ($deduction)
                {
                    $sss = getSssDeduction($totalGrossPay);
                    $sssBasis     = $sss["employee"] ?? 0;
                    $sssDeduction = $sss["employee"] ?? 0;
                    $sssEmployer  = $sss["employer"] ?? 0;
                    $sssTotal     = $sss["total"] ?? 0;

                    $phic = getPhicDeduction($totalGrossPay);
                    $phicBasis     = $phic["employee"] ?? 0;
                    $phicDeduction = $phic["employee"] ?? 0;
                    $phicEmployer  = $phic["employer"] ?? 0;
                    $phicTotal     = $phic["total"] ?? 0;

                    $hdmf = getHdmfDeduction($totalGrossPay);
                    $hdmfBasis     = $hdmf["employee"] ?? 0;
                    $hdmfDeduction = $hdmf["employee"] ?? 0;
                    $hdmfEmployer  = $hdmf["employer"] ?? 0;
                    $hdmfTotal     = $hdmf["total"] ?? 0;
                }


                $totalDeduction  = $sssDeduction + $phicDeduction + $hdmfDeduction;
                if ($withHoldingDeduction > 0)
                {
                    $withHolding = getWithHoldingDeduction($totalGrossPay, $totalDeduction);
                    $withHoldingDeduction = $withHolding->withHoldingDeduction ?? 0;
                }

                $netPay = (($grossPay + $allowance + $allowanceAdjustment) - ($totalDeduction + $loanDeduction + $loanAdjustment)) + $otherAdjustment;

                $data[] = [
                    'payrollItemID'                      => $payrollItemID,
                    'payrollID'                          => $payrollID,
                    'timekeepingID'                      => $timekeepingID,
                    'payrollAdjustmentID'                => $payrollAdjustmentID,
                    'onAdjustment'                       => $onAdjustment,
                    'employeeID'                         => $employeeID,
                    'hourlyRate'                         => $hourlyRate,
                    'holdSalary'                         => $holdSalary,
                    'deductMandates'                     => $deductMandates,
                    'startDate'                          => $startDate,
                    'endDate'                            => $endDate,
                    'workingDays'                        => $workingDays,
                    'holidays'                           => $holidays,
                    'lwopDays'                           => $lwopDays,
                    'paidLeaveDays'                      => $paidLeaveDays,
                    'restDays'                           => $restDays,
                    'scheduleHours'                      => $scheduleHours,
                    'basicHours'                         => $basicHours,
                    'overtimeHours'                      => $overtimeHours,
                    'nightDifferentialHours'             => $nightDifferentialHours,
                    'lateUndertimeHours'                 => $lateUndertimeHours,
                    'lwopHours'                          => $lwopHours,
                    'basicSalary'                        => $basicSalary,
                    'basicPay'                           => $basicPay,
                    'holidayPay'                         => $holidayPay,
                    'holidayAdjustment'                  => $holidayAdjustment,
                    'holidayAdjustmentRemarks'           => $holidayAdjustmentRemarks,
                    'overtimePay'                        => $overtimePay,
                    'overtimeAdjustment'                 => $overtimeAdjustment,
                    'overtimeAdjustmentRemarks'          => $overtimeAdjustmentRemarks,
                    'nightDifferentialPay'               => $nightDifferentialPay,
                    'nightDifferentialAdjustment'        => $nightDifferentialAdjustment,
                    'nightDifferentialAdjustmentRemarks' => $nightDifferentialAdjustmentRemarks,
                    'allowance'                          => $allowance,
                    'allowanceAdjustment'                => $allowanceAdjustment,
                    'allowanceAdjustmentRemarks'         => $allowanceAdjustmentRemarks,
                    'leavePay'                           => $leavePay,
                    'lateUndertimeDeduction'             => $lateUndertimeDeduction,
                    'lateUndertimeAdjustment'            => $lateUndertimeAdjustment,
                    'lateUndertimeAdjustmentRemarks'     => $lateUndertimeAdjustmentRemarks,
                    'lwopDeduction'                      => $lwopDeduction,
                    'lwopAdjustment'                     => $lwopAdjustment,
                    'lwopAdjustmentRemarks'              => $lwopAdjustmentRemarks,
                    'prevGrossPay'                       => $prevGrossPay,
                    'grossPay'                           => $grossPay,
                    'sssBasis'                           => $sssBasis,
                    'sssDeduction'                       => $sssDeduction,
                    'sssAdjustment'                      => $sssAdjustment,
                    'sssAdjustmentRemarks'               => $sssAdjustmentRemarks,
                    'sssEmployer'                        => $sssEmployer,
                    'sssTotal'                           => $sssTotal,
                    'phicBasis'                          => $phicBasis,
                    'phicDeduction'                      => $phicDeduction,
                    'phicAdjustment'                     => $phicAdjustment,
                    'phicAdjustmentRemarks'              => $phicAdjustmentRemarks,
                    'phicEmployer'                       => $phicEmployer,
                    'phicTotal'                          => $phicTotal,
                    'hdmfBasis'                          => $hdmfBasis,
                    'hdmfDeduction'                      => $hdmfDeduction,
                    'hdmfAdjustment'                     => $hdmfAdjustment,
                    'hdmfAdjustmentRemarks'              => $hdmfAdjustmentRemarks,
                    'hdmfEmployer'                       => $hdmfEmployer,
                    'hdmfTotal'                          => $hdmfTotal,
                    'withHoldingBasis'                   => $withHoldingBasis,
                    'withHoldingDeduction'               => $withHoldingDeduction,
                    'withHoldingAdjustment'              => $withHoldingAdjustment,
                    'withHoldingAdjustmentRemarks'       => $withHoldingAdjustmentRemarks,
                    'totalDeduction'                     => $totalDeduction,
                    'loanBasis'                          => $loanBasis,
                    'loanAdjustment'                     => $loanAdjustment,
                    'loanAdjustmentRemarks'              => $loanAdjustmentRemarks,
                    'loanDeduction'                      => $loanDeduction,
                    'otherAdjustment'                    => $otherAdjustment,
                    'otherAdjustmentRemarks'             => $otherAdjustmentRemarks,
                    'prevNetPay'                         => $prevNetPay,
                    'netPay'                             => $netPay,
                ];
            }

            if ($data && !empty($data))
            {
                $query = $this->db->update_batch(
                    'hris_payroll_items_tbl', 
                    $data,
                    'payrollItemID');
                return $query ? true : false;
            }
        }
        return false;
    }

    public function updatePayrollItems($payrollAdjustmentID = 0)
    {
        $adjustment = $this->getPayrollAdjustmentData($payrollAdjustmentID);
        $payrollID  = $adjustment->payrollID ?? 0;
        $deduction  = $adjustment->deduction ?? 0;

        $payrollAdjustmentItems = $this->getCheckedPayrollAdjustmentItems($payrollAdjustmentID);
        if ($payrollAdjustmentItems && !empty($payrollAdjustmentItems))
        {
            $data = [];
            foreach($payrollAdjustmentItems as $item)
            {
                $data[] = [
                    'payrollItemID'                      => $item['payrollItemID'],
                    'holidayAdjustment'                  => $item['holidayAdjustment'],
                    'holidayAdjustmentRemarks'           => $item['holidayRemarks'],
                    'overtimeAdjustment'                 => $item['overtimeAdjustment'],
                    'overtimeAdjustmentRemarks'          => $item['overtimeRemarks'],
                    'nightDifferentialAdjustment'        => $item['nightDifferentialAdjustment'],
                    'nightDifferentialAdjustmentRemarks' => $item['nightDifferentialRemarks'],
                    'allowanceAdjustment'                => $item['allowanceAdjustment'],
                    'allowanceAdjustmentRemarks'         => $item['allowanceRemarks'],
                    'lateUndertimeAdjustment'            => $item['lateUndertimeAdjustment'],
                    'lateUndertimeAdjustmentRemarks'     => $item['lateUndertimeRemarks'],
                    'lwopAdjustment'                     => $item['lwopAdjustment'],
                    'lwopAdjustmentRemarks'              => $item['lwopRemarks'],
                    'sssAdjustmentRemarks'               => $item['sssRemarks'],
                    'phicAdjustment'                     => $item['phicAdjustment'],
                    'phicAdjustmentRemarks'              => $item['phicRemarks'],
                    'hdmfAdjustment'                     => $item['hdmfAdjustment'],
                    'hdmfAdjustmentRemarks'              => $item['hdmfRemarks'],
                    'withHoldingAdjustment'              => $item['withHoldingAdjustment'],
                    'withHoldingAdjustmentRemarks'       => $item['withHoldingRemarks'],
                    'loanAdjustment'                     => $item['loanAdjustment'],
                    'loanAdjustmentRemarks'              => $item['loanRemarks'],
                    'otherAdjustment'                    => $item['otherAdjustment'],
                    'otherAdjustmentRemarks'             => $item['otherRemarks'],
                ];
            }

            if ($data && !empty($data))
            {
                $query = $this->db->update_batch(
                    'hris_payroll_items_tbl', 
                    $data,
                    'payrollItemID');

                $this->updatePayrollItemsComputation($payrollID, $deduction);

                return $query ? true : false;
            }
        }
        return false;
    }
    // ----- ********** END UPDATE PAYROLL ITEMS ********** -----




    // ----- ********** REPORTS ********** -----
    public function getCompanyProfile()
    {
        $sql   = "SELECT * FROM gen_company_profile_tbl LIMIT 1";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }
    // ----- ********** END REPORTS ********** -----
    
}
