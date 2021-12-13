<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payroll_register extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollRegister_model", "payrollregister");
        isAllowed(82);
    }

    public function index() 
    {
        $data["title"] = "Payroll Register";
        $this->load->view("template/header", $data);
        $this->load->view("hris/payroll_register/index");
        $this->load->view("template/footer");
    }


    public function getAllPayrollRegisterData()
    {
        $payrollRegisterID = $this->input->post("payrollRegisterID");
        echo json_encode($this->payroll->getAllPayrollRegisterData($payrollRegisterID));
    }

}
