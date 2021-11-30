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
                $payrollCode = getFormCode("PAY", date("Y-m-d"), $insertID);
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
        $this->updateOtherPayrollItems($payrollID, $idStr);
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

                    $payrollAdjustmentCode = getFormCode("PA", date("Y-m-d"), $payrollAdjustmentID);
                    $this->db->update("hris_payroll_adjustment_tbl", ["payrollAdjustmentCode" => $payrollAdjustmentCode], ["payrollAdjustmentID" => $payrollAdjustmentID]);

                    return "true|Success|$payrollAdjustmentID|".date("Y-m-d");
                }
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
    // ---------- ********** END PAYROLL ADJUSTMENT ********** ---------

}
