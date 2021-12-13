<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Generate_payslip extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/GeneratePayslip_model", "generatepayslip");
        isAllowed(82);
    }

    public function index() 
    {
        $data["title"] = "Generate Payslip";
        $this->load->view("template/header", $data);
        $this->load->view("hris/generate_payslip/index");
        $this->load->view("template/footer");
    }

    
    public function getFilterDisplayData()
    {
        echo json_encode($this->generatepayslip->getFilterDisplayData());
    }

    public function getTableDisplayData()
    {
        $payrollID     = $this->input->post("payrollID");
        $departmentID  = $this->input->post("departmentID");
        $designationID = $this->input->post("designationID");
        echo json_encode($this->generatepayslip->getTableDisplayData($payrollID, $departmentID, $designationID));
    }

    public function printPaySlip()
    {
        $payrollID = $this->input->post("payrollID");
        $idStr     = $this->input->post("idStr");
        $payStr    = $this->input->post("payrollStr");

        $updatePayrollItem = $this->generatepayslip->updatePayrollItems($payrollID, $payStr);

        $data = [
            'title'   => 'PRINT PAYSLIP',
            'payslip' => $this->generatepayslip->getEmployeePayslip($payrollID, $idStr),
        ];

        return $this->load->view('hris/generate_payslip/print', $data);
    }

}
