<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Salary_release extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/SalaryRelease_model", "salaryrelease");
        // isAllowed(96);
    }

    public function index()
    {
        $data["title"] = "Salary Release Process";

        $this->load->view("template/header",$data);
        $this->load->view("hris/salary_release/index");
        $this->load->view("template/footer");
    }

    public function updateStatus()
    {
            $employeeID              = $this->input->post("employeeID");
            $salaryReleaseID         = $this->input->post("salaryReleaseID");
            $payrollID               = $this->input->post("payrollID");
            $payrollItemID           = $this->input->post("payrollItemID");
            $monthID                 = $this->input->post("monthID");
            $monthDetailsID          = $this->input->post("monthDetailsID");
            $monthDetailsID          = $this->input->post("monthDetailsID");
            $salaryReleasePayrollID  = $this->input->post("salaryReleasePayrollID");
            $netPay                  = $this->input->post("netPay");
            $date = new DateTime();
          
            $data = array(
                'updatedBy'              => $employeeID,
                'dateRelease'            => $date->format('Y-m-d H:i:s'),
                'payrollHoldStatus'      => 1,
                'salaryReleasePayrollID' => $salaryReleasePayrollID
            );
        

            $isSalaryRelease = $this->salaryrelease->updateStatus($data,$salaryReleaseID);

            if($isSalaryRelease){
                $result = explode("|",$isSalaryRelease);

                if($result[0] == "true"){
                    $updatePayroll = $this->salaryrelease->updatePayrollItem($salaryReleasePayrollID, $employeeID, $salaryReleaseID, $netPay);
                }
            }

      
        echo json_encode($isSalaryRelease);
    }

}
?>