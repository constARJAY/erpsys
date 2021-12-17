<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payroll_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollModule_model", "payroll");
        isAllowed(88);
    }


    public function index()
    {
        $data["title"] = "Payroll Report";
        $this->load->view("template/header", $data);
        $this->load->view("hris/payroll_report/index");
        $this->load->view("template/footer");
    }


    public function getAllPayrollData()
    {
        $payrollID = $this->input->post("payrollID");
        echo json_encode($this->payroll->getAllPayrollData($payrollID));
    }


    public function getPayrollItems()
    {
        $payrollID = $this->input->post("payrollID");
        echo json_encode($this->payroll->getPayrollItems($payrollID));
    }

    public function printReport()
    {
        $payrollID   = $this->input->post("payrollID");
        $payrollCode = $this->input->post("payrollCode");

        $data = [
            'title'   => 'PRINT PAYROLL REPORT',
            'company' => $this->payroll->getCompanyProfile(),
            'payroll' => $this->payroll->getAllPayrollData($payrollID),
            'code'    => $payrollCode
        ];
        return $this->load->view('hris/payroll_report/print', $data);
    }

}
