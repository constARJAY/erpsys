<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');

class Payroll_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollModule_model", "payroll");
        isAllowed(110);
    }


    public function index()
    {
        $data["title"] = "Payroll Process";
        $this->load->view("template/header", $data);
        $this->load->view("hris/payroll_module/index");
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


    public function createPayrollAdjustment()
    {
        $payrollID = $this->input->post("payrollID");
        echo json_encode($this->payroll->createPayrollAdjustment($payrollID));
    }


    public function savePayroll()
    {
        $action           = $this->input->post("action");
        $method           = $this->input->post("method");
        $payrollID        = $this->input->post("payrollID") ?? null;
        $revisePayrollID  = $this->input->post("revisePayrollID") ?? null;
        $employeeID       = $this->input->post("employeeID");
        $payrollReason    = $this->input->post("payrollReason") ?? null;
        $payrollStartDate = $this->input->post("payrollStartDate") ?? null;
        $payrollEndDate   = $this->input->post("payrollEndDate") ?? null;
        $payrollStatus    = $this->input->post("payrollStatus") ?? null;
        $approversID      = $this->input->post("approversID") ?? null;
        $approversStatus  = $this->input->post("approversStatus") ?? null;
        $approversDate    = $this->input->post("approversDate") ?? null;
        $createdBy        = $this->input->post("createdBy") ?? null;
        $updatedBy        = $this->input->post("updatedBy") ?? null;
        $createdAt        = $this->input->post("createdAt") ?? null;
        $submittedAt      = $this->input->post("submittedAt") ?? null;
        $payrollRemarks   = $this->input->post("payrollRemarks") ?? null;
        $items            = $this->input->post("items") ?? null;

        $payrollData = [
            "revisePayrollID"  => $revisePayrollID,
            "employeeID"       => $employeeID,
            "payrollReason"    => $payrollReason,
            "payrollStartDate" => $payrollStartDate,
            "payrollEndDate"   => $payrollEndDate,
            "payrollStatus"    => $payrollStatus,
            "approversID"      => $approversID,
            "approversStatus"  => $approversStatus,
            "approversDate"    => $approversDate,
            "submittedAt"      => $submittedAt,
            "createdBy"        => $createdBy,
            "updatedBy"        => $updatedBy,
            "createdAt"        => $createdAt
        ];

        if ($action == "update") {
            unset($payrollData["revisePayrollID"]);
            unset($payrollData["createdBy"]);
            unset($payrollData["createdAt"]);

            if ($method == "cancelform") {
                $payrollData = [
                    "payrollStatus" => 4,
                    "updatedBy"     => $updatedBy,
                ];
            } else if ($method == "approve") {
                $payrollData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "payrollStatus"   => $payrollStatus,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "deny") {
                $payrollData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "payrollStatus"   => 3,
                    "payrollRemarks"  => $payrollRemarks,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "drop") {
                $payrollData = [
                    "revisePayrollID" => $revisePayrollID,
                    "payrollStatus"   => 5,
                    "updatedBy"       => $updatedBy,
                ]; 
            }
        }

        // ADD REVISE CODE
        if ($revisePayrollID) {
            $payroll = $this->payroll->getPayrollData($revisePayrollID);
            if ($payroll) {
                $payrollData["revisePayrollCode"] = $payroll->payrollCode;
                $payrollData["timekeepingID"]     = $payroll->timekeepingID;
                $payrollData["timekeepingCode"]   = $payroll->timekeepingCode;
                $payrollData["cutOff"]            = $payroll->cutOff;
                $payrollData["payOut"]            = $payroll->payOut;
                $payrollData["deduction"]         = $payroll->deduction;
            }
        }

        $savePayrollData = $this->payroll->savePayrollData($action, $payrollData,$payrollID);

        if ($savePayrollData) {
            $result = explode("|", $savePayrollData);

            if ($result[0] == "true") {
                $payrollID = $result[2];

                // REPLICATE ITEMS
                if ($revisePayrollID) {
                    $this->payroll->revisePayrollItems($revisePayrollID, $payrollID);
                }

                if ($items && !empty($items)) {
                    $payrollItems = $payrollItemIDArr = [];

                    foreach($items as $item) {
                        $payrollItemIDArr[] = $item['payrollItemID'];

                        $payrollItems[] = [
                            'payrollItemID'        => $item['payrollItemID'],
                            'employeeID'           => $item['employeeID'],
                            'holdSalary'           => $item['holdSalary'],
                            'loanDeduction'        => $item['loanDeduction'],
                            'netPay'               => $item['netPay'],
                        ];
                    } 
                    $idArrStr = implode(", ", $payrollItemIDArr);

                    $savePayrollItems = $this->payroll->savePayrollItems($action, $payrollItems, $payrollID, $idArrStr);
                }

                if ($payrollData["payrollStatus"] == 2)
                {
                    $this->payroll->insertHoldSalary($payrollID);
                    $this->payroll->insertPayrollRegister($payrollID);
                    $this->payroll->insertPayrollPayslip($payrollID);
                    $this->payroll->updateLoanForm($payrollID);
                }
            }
        }

        echo json_encode($savePayrollData);
    }

}
