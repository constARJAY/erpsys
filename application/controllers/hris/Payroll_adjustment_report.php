<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payroll_adjustment_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollAdjustment_model", "payrolladjustment");
        isAllowed(81);
    }


    public function index()
    {
        $data["title"] = "Payroll Adjustment Report";
        $this->load->view("template/header", $data);
        $this->load->view("hris/payroll_adjustment_report/index");
        $this->load->view("template/footer");
    }


    public function getAllPayrollAdjustmentData()
    {
        $payrollAdjustmentID = $this->input->post("payrollAdjustmentID");
        echo json_encode($this->payrolladjustment->getAllPayrollAdjustmentData($payrollAdjustmentID));
    }


    public function printReport()
    {
        $payrollAdjustmentID   = $this->input->post("payrollAdjustmentID") ?? 0;
        $payrollAdjustmentCode = $this->input->post("payrollAdjustmentCode") ?? "";
        $employeeIDStr         = $this->input->post('employeeIDStr') ?? '';

        $data = [
            'title'             => 'PRINT PAYROLL ADJUSTMENT REPORT',
            'company'           => $this->payrolladjustment->getCompanyProfile(),
            'payrolladjustment' => $this->payrolladjustment->getAllPayrollAdjustmentData($payrollAdjustmentID, $employeeIDStr),
            'code'              => $payrollAdjustmentCode
        ];
        return $this->load->view('hris/payroll_adjustment_report/print', $data);
    }

}
