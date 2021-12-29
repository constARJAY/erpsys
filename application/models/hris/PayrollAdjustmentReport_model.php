<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PayrollAdjustmentReport_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    // ---------- ********** FILTERING DISPLAY ********** ----------
    public function getApprovedPayrollAdjustment()
    {
        $sql = "
        SELECT 
            payrollAdjustmentID, payrollAdjustmentCode, CONCAT(DATE_FORMAT(payrollStartDate, '%M %d, %Y'), ' - ', DATE_FORMAT(payrollEndDate, '%M %d, %Y')) AS dateRange
        FROM hris_payroll_adjustment_tbl AS hpat
            LEFT JOIN hris_payroll_tbl AS hpt USING(payrollID)
        WHERE hpat.payrollAdjustmentStatus = 2";
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

    public function getActiveEmployee($departmentID = 0, $designationID = 0)
    {
        $sql = "SELECT employeeID, employeeCode, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname FROM hris_employee_list_tbl WHERE departmentID = $departmentID AND designationID = $designationID AND employeeStatus IN (1,2,5,7) AND scheduleID <> 0 AND employeeID <> 1";
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
                $designation = [];
                $departmentID = $dept["departmentID"];
                $designations = $this->getActiveDesignation($departmentID);
                foreach ($designations as $des) {
                    $designationID   = $des["designationID"];
                    $designationName = $des["designationName"];
                    $employees = $this->getActiveEmployee($departmentID, $designationID);
                    $designation[] = [
                        'designationID'   => $designationID,
                        'designationName' => $designationName,
                        'employees'       => $employees,
                    ];
                }

                $data[] = [
                    "departmentID"   => $departmentID,
                    "departmentName" => $dept["departmentName"],
                    "designation"    => $designation,
                ];
            }
        }

        return $data;
    }

    public function getFilterDisplayData()
    {
        $data = [];

        $adjustment = $this->getApprovedPayrollAdjustment();
        if ($adjustment && !empty($adjustment))
        {
            $data = [
                'adjustment' => $adjustment,
                'department' => $this->getConsolidatedDepartment()
            ];
        }

        return $data;
    }
    // ---------- ********** END FILTERING DISPLAY ********** ----------


    // ----------- ********** PAYROLL ADJUSTMENT REPORT DISPLAY ********** ----------
    public function getPayrollAdjustmentItems($adjustmentNo = '', $departmentID = 0, $designationID = 0, $employeeID = 0, $payrollAdjustmentItemID = '')
    {
        $whereDepartment  = $departmentID ? "AND helt.departmentID = $departmentID" : "";
        $whereDesignation = $designationID ? "AND helt.designationID = $designationID" : "";
        $whereEmployee    = $employeeID ? "AND helt.employeeID = $employeeID" : "";
        $whereAdjustment  = $adjustmentNo ? "AND hpait.payrollAdjustmentID IN ($adjustmentNo)" : "";

        $whereAdjustmentID  = $payrollAdjustmentItemID ? "AND hpait.payrollAdjustmentItemID IN ($payrollAdjustmentItemID)" : "";
        $where = $whereAdjustmentID ? $whereAdjustmentID : "$whereDepartment $whereDesignation $whereEmployee $whereAdjustment";

        $sql = "
        SELECT 
            hpait.*,
            helt.employeeCode,
            CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
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
            ) AS rowCount,
            hpat.payrollAdjustmentCode,
            hpt.payrollCode,
            CONCAT(DATE_FORMAT(payrollStartDate, '%M %d, %Y'), ' - ', DATE_FORMAT(payrollEndDate, '%M %d, %Y')) AS payrollPeriod
        FROM hris_payroll_adjustment_items_tbl AS hpait
            LEFT JOIN hris_payroll_adjustment_tbl AS hpat USING(payrollAdjustmentID)
            LEFT JOIN hris_payroll_tbl AS hpt ON hpat.payrollID = hpt.payrollID
            LEFT JOIN hris_employee_list_tbl AS helt ON hpait.employeeID = helt.employeeID
        WHERE hpat.payrollAdjustmentStatus = 2
            $where";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTableDisplayData($adjustmentNo = '', $departmentID = 0, $designationID = 0, $employeeID = 0, $payrollAdjustmentItemID = '')
    {
        $data = [];

        $items = $this->getPayrollAdjustmentItems($adjustmentNo, $departmentID, $designationID, $employeeID, $payrollAdjustmentItemID);
        if ($items && !empty($items))
        {
            $ADJUSTMENTS = [
                'basicAdjustment' => [
                    'title'   => 'Basic',
                    'remarks' => 'basicRemarks',
                ],
                'holidayAdjustment' => [
                    'title'   => 'Holiday',
                    'remarks' => 'holidayRemarks',
                ],
                'overtimeAdjustment' => [
                    'title'   => 'Overtime',
                    'remarks' => 'overtimeRemarks',
                ],
                'nightDifferentialAdjustment' => [
                    'title'   => 'Night Differential',
                    'remarks' => 'nightDifferentialRemarks',
                ],
                'allowanceAdjustment' => [
                    'title'   => 'Allowance',
                    'remarks' => 'allowanceRemarks',
                ],
                'lateUndertimeAdjustment' => [
                    'title'   => 'Late/Undertime',
                    'remarks' => 'lateUndertimeRemarks',
                ],
                'lwopAdjustment' => [
                    'title'   => 'LWOP',
                    'remarks' => 'lwopRemarks',
                ],
                'sssAdjustment' => [
                    'title'   => 'SSS',
                    'remarks' => 'sssRemarks',
                ],
                'phicAdjustment' => [
                    'title'   => 'PHIC',
                    'remarks' => 'phicRemarks',
                ],
                'hdmfAdjustment' => [
                    'title'   => 'HDMF',
                    'remarks' => 'hdmfRemarks',
                ],
                'withHoldingAdjustment' => [
                    'title'   => 'Withholding Tax',
                    'remarks' => 'withHoldingRemarks',
                ],
                'otherAdjustment' => [
                    'title'   => 'Others',
                    'remarks' => 'otherRemarks',
                ],
            ];

            foreach ($items as $item) 
            {
                $rowCount                = $item['rowCount'] ?? 0;
                $employeeID              = $item['employeeID'];
                $employeeCode            = $item['employeeCode'];
                $fullname                = $item['fullname'];
                $payrollAdjustmentItemID = $item['payrollAdjustmentItemID'];
                $payrollAdjustmentCode   = $item['payrollAdjustmentCode'];
                $payrollCode             = $item['payrollCode'];
                $payrollPeriod           = $item['payrollPeriod'];

                if ($rowCount) {
                    $adjustment = [];
                    foreach ($ADJUSTMENTS as $key => $adj) {
                        $title        = $adj["title"] ?? '';
                        $amount       = (float) $item["$key"] ?? 0;
                        $remarkColumn = $adj["remarks"];
                        $remarks      = $item["$remarkColumn"] ?? '';

                        if ($amount && $amount != 0) {
                            $adjustment[] = [
                                'title'   => $title,
                                'amount'  => $amount,
                                'remarks' => $remarks,
                            ];
                        }
                    }

                    $data[] = [
                        'payrollAdjustmentItemID' => $payrollAdjustmentItemID,
                        'payrollAdjustmentCode'   => $payrollAdjustmentCode,
                        'payrollCode'             => $payrollCode,
                        'payrollPeriod'           => $payrollPeriod,
                        'rowCount'                => $rowCount,
                        'employeeID'              => $employeeID,
                        'employeeCode'            => $employeeCode,
                        'fullname'                => $fullname,
                        'adjustment'              => $adjustment
                    ];
                }
            }
        }

        return $data;
    }
    // ----------- ********** END PAYROLL ADJUSTMENT REPORT DISPLAY ********** ----------

}

