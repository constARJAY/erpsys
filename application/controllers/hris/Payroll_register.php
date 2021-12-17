<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payroll_register extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollRegister_model", "payrollregister");
        isAllowed(113);
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
        echo json_encode($this->payrollregister->getAllPayrollRegisterData($payrollRegisterID));
    }


    public function savePayrollRegister()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $payrollRegisterID       = $this->input->post("payrollRegisterID") ?? null;
        $revisePayrollRegisterID = $this->input->post("revisePayrollRegisterID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $payrollRegisterReason   = $this->input->post("payrollRegisterReason") ?? null;
        $totalOnHoldSalary       = $this->input->post("totalOnHoldSalary") ?? null;
        $totalSalaryOnCheck      = $this->input->post("totalSalaryOnCheck") ?? null;
        $totalSalaryOnBank       = $this->input->post("totalSalaryOnBank") ?? null;
        $totalNetPay             = $this->input->post("totalNetPay") ?? null;
        $totalPayroll            = $this->input->post("totalPayroll") ?? null;
        $payrollRegisterStatus   = $this->input->post("payrollRegisterStatus") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $createdBy               = $this->input->post("createdBy") ?? null;
        $updatedBy               = $this->input->post("updatedBy") ?? null;
        $createdAt               = $this->input->post("createdAt") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $payrollRegisterRemarks  = $this->input->post("payrollRegisterRemarks") ?? null;
        $items                   = $this->input->post("items") ?? null;

        $payrollRegisterData = [
            "revisePayrollRegisterID" => $revisePayrollRegisterID,
            "employeeID"              => $employeeID,
            "payrollRegisterReason"   => $payrollRegisterReason,
            "payrollRegisterStatus"   => $payrollRegisterStatus,
            "approversID"             => $approversID,
            "totalOnHoldSalary"       => $totalOnHoldSalary,
            "totalSalaryOnCheck"      => $totalSalaryOnCheck,
            "totalSalaryOnBank"       => $totalSalaryOnBank,
            "totalNetPay"             => $totalNetPay,
            "totalPayroll"            => $totalPayroll,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($payrollRegisterData["revisePayrollRegisterID"]);
            unset($payrollRegisterData["createdBy"]);
            unset($payrollRegisterData["createdAt"]);

            if ($method == "cancelform") {
                $payrollRegisterData = [
                    "payrollRegisterStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $payrollRegisterData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "payrollRegisterStatus" => $payrollRegisterStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $payrollRegisterData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "payrollRegisterStatus"  => 3,
                    "payrollRegisterRemarks" => $payrollRegisterRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $payrollRegisterData = [
                    "revisePayrollRegisterID" => $revisePayrollRegisterID,
                    "payrollRegisterStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        // ADD REVISE CODE
        if ($revisePayrollRegisterID) {
            $payroll = $this->payrollregister->getPayrollRegisterData($revisePayrollRegisterID);
            if ($payroll) {
                $payrollRegisterData["revisePayrollRegisterCode"] = $payroll->payrollRegisterCode;
                $payrollRegisterData["payrollID"]                 = $payroll->payrollID;
                $payrollRegisterData["payrollCode"]               = $payroll->payrollCode;
            }
        }

        $savePayrollRegisterData = $this->payrollregister->savePayrollRegisterData($action, $payrollRegisterData, $payrollRegisterID);

        if ($savePayrollRegisterData) {
            $result = explode("|", $savePayrollRegisterData);

            if ($result[0] == "true") {
                $payrollRegisterID = $result[2];

                // REPLICATE ITEMS
                if ($revisePayrollRegisterID) {
                    $this->payrollregister->revisePayrollRegisterItems($revisePayrollRegisterID, $payrollRegisterID);
                }

                if ($items && !empty($items)) {
                    $payrollRegisterItems = $payrollRegisterItemIDArr = [];

                    foreach($items as $item) {
                        $payrollRegisterItemIDArr[] = $item['payrollRegisterItemID'];

                        $payrollRegisterItems[] = [
                            'payrollRegisterItemID' => $item['payrollRegisterItemID'],
                            'employeeID'            => $item['employeeID'],
                            'otherDeductions'       => $item['otherDeductions'],
                            'netPay'                => $item['netPay'],
                        ];
                    } 
                    $idArrStr = implode(", ", $payrollRegisterItemIDArr);

                    // echo json_encode($payrollRegisterItems);
                    // echo json_encode($idArrStr);
                    // exit;
                    $savePayrollRegisterItems = $this->payrollregister->savePayrollRegisterItems($action, $payrollRegisterItems, $payrollRegisterID, $idArrStr);
                }
            }
        }

        echo json_encode($savePayrollRegisterData);
    }

}
