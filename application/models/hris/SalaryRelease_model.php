

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SalaryRelease_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function updateStatus($data = false, $salaryReleaseID){
        if($salaryReleaseID){
            
            $this->db->where('salaryReleaseID', $salaryReleaseID);
            $this->db->update('hris_salary_release_tbl', $data);

            return "true|Successfully submitted|$salaryReleaseID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updatePayrollItem($payrollID = 0, $employeeID = 0, $salaryReleaseID = 0, $netPay = 0)
    {
        $sql    = "SELECT payrollItemID, salaryReleaseID, salaryReleaseAmount FROM hris_payroll_items_tbl WHERE payrollID = $payrollID AND employeeID = $employeeID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        if ($result) 
        {
            $payrollItemID           = $result->payrollItemID ?? 0;
            $prevSalaryReleaseID     = $result->salaryReleaseID ?? null;
            $prevSalaryReleaseAmount = $result->salaryReleaseAmount ?? 0;

            $data = [
                "salaryReleaseID"     => $prevSalaryReleaseID ? $prevSalaryReleaseID.'|'.$salaryReleaseID : $salaryReleaseID,
                "salaryReleaseAmount" => ($prevSalaryReleaseAmount + $netPay)
            ];
            $where = ["payrollItemID" => $payrollItemID];
            $queryUpdate = $this->db->update("hris_payroll_items_tbl", $data, $where);
            return $queryUpdate ? true : false;
        }
        return false;
    }


}
