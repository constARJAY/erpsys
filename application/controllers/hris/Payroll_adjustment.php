<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payroll_adjustment extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/PayrollAdjustment_model", "payrolladjustment");
        isAllowed(111);
    }


    public function index()
    {
        $data["title"] = "Payroll Adjustment";
        $this->load->view("template/header", $data);
        $this->load->view("hris/payroll_adjustment/index");
        $this->load->view("template/footer");
    }


    public function getAllPayrollAdjustmentData()
    {
        $payrollAdjustmentID = $this->input->post("payrollAdjustmentID");
        echo json_encode($this->payrolladjustment->getAllPayrollAdjustmentData($payrollAdjustmentID));
    }


    public function getPendingContentData()
    {
        echo json_encode($this->payrolladjustment->getPendingContentData());
    }


    public function assignPayrollAdjustment()
    {
        $payrollAdjustmentPendingID = $this->input->post("payrollAdjustmentPendingID");
        $payrollAdjustmentID        = $this->input->post("payrollAdjustmentID");
        $payrollID                  = $this->input->post("payrollID");
        $employeeID                 = $this->input->post("employeeID");
        echo json_encode($this->payrolladjustment->assignPayrollAdjustment($payrollAdjustmentPendingID, $payrollAdjustmentID, $payrollID, $employeeID));
    }


    public function savePayrollAdjustment()
    {
        $action                    = $this->input->post("action");
        $method                    = $this->input->post("method");
        $payrollAdjustmentID       = $this->input->post("payrollAdjustmentID") ?? null;
        $revisePayrollAdjustmentID = $this->input->post("revisePayrollAdjustmentID") ?? null;
        $employeeID                = $this->input->post("employeeID");
        $payrollAdjustmentReason   = $this->input->post("payrollAdjustmentReason") ?? null;
        $payrollAdjustmentStatus   = $this->input->post("payrollAdjustmentStatus") ?? null;
        $approversID               = $this->input->post("approversID") ?? null;
        $approversStatus           = $this->input->post("approversStatus") ?? null;
        $approversDate             = $this->input->post("approversDate") ?? null;
        $createdBy                 = $this->input->post("createdBy") ?? null;
        $updatedBy                 = $this->input->post("updatedBy") ?? null;
        $createdAt                 = $this->input->post("createdAt") ?? null;
        $submittedAt               = $this->input->post("submittedAt") ?? null;
        $payrollAdjustmentRemarks  = $this->input->post("payrollAdjustmentRemarks") ?? null;
        $items                     = $this->input->post("items") ?? null;

        $payrollAdjustmentData = [
            "revisePayrollAdjustmentID"  => $revisePayrollAdjustmentID,
            "employeeID"                 => $employeeID,
            "payrollAdjustmentReason"    => $payrollAdjustmentReason,
            "payrollAdjustmentStatus"    => $payrollAdjustmentStatus,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($payrollAdjustmentData["revisePayrollAdjustmentID"]);
            unset($payrollAdjustmentData["createdBy"]);
            unset($payrollAdjustmentData["createdAt"]);

            if ($method == "cancelform") {
                $payrollAdjustmentData = [
                    "payrollAdjustmentStatus" => 4,
                    "updatedBy"               => $updatedBy,
                ];
            } else if ($method == "approve") {
                $payrollAdjustmentData = [
                    "approversStatus"         => $approversStatus,
                    "approversDate"           => $approversDate,
                    "payrollAdjustmentStatus" => $payrollAdjustmentStatus,
                    "updatedBy"               => $updatedBy,
                ];
            } else if ($method == "deny") {
                $payrollAdjustmentData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "payrollAdjustmentStatus"  => 3,
                    "payrollAdjustmentRemarks" => $payrollAdjustmentRemarks,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "drop") {
                $payrollAdjustmentData = [
                    "revisePayrollAdjustmentID" => $revisePayrollAdjustmentID,
                    "payrollAdjustmentStatus"   => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            }
        }

        // ADD REVISE CODE
        if ($revisePayrollAdjustmentID) {
            $payrollAdjustment = $this->payrolladjustment->getPayrollAdjustmentData($revisePayrollAdjustmentID);
            if ($payrollAdjustment) {
                $payrollAdjustmentData["revisePayrollAdjustmentCode"] = $payrollAdjustment->payrollAdjustmentCode;
                $payrollAdjustmentData["payrollID"]   = $payrollAdjustment->payrollID;
                $payrollAdjustmentData["payrollCode"] = $payrollAdjustment->payrollCode;
            }
        }

        $savePayrollAdjustmentData = $this->payrolladjustment->savePayrollAdjustmentData($action, $payrollAdjustmentData,$payrollAdjustmentID);

        if ($savePayrollAdjustmentData) {
            $result = explode("|", $savePayrollAdjustmentData);

            if ($result[0] == "true") {
                $payrollAdjustmentID = $result[2];

                // REPLICATE ITEMS
                if ($revisePayrollAdjustmentID) {
                    $this->payrolladjustment->revisePayrollAdjustmentItems($revisePayrollAdjustmentID, $payrollAdjustmentID);
                }

                if ($items && !empty($items)) {
                    // $deletePayrollAdjustment = $this->payrolladjustment->deletePayrollAdjustmentItems($payrollAdjustmentID);

                    $payrollAdjustmentItems = $payrollAdjustmentItemIDArr = [];
                    foreach($items as $item) {
                        $payrollAdjustmentItemIDArr[] = $item['payrollAdjustmentItemID'];

                        $payrollAdjustmentItems[] = [
                            'payrollAdjustmentItemID'     => $item['payrollAdjustmentItemID'],
                            'payrollAdjustmentID'         => $payrollAdjustmentID,
                            'applyAdjustment'             => 1,
                            'employeeID'                  => $item['employeeID'],
                            'holidayAdjustment'           => $item['holidayAdjustment'],
                            'overtimeAdjustment'          => $item['overtimeAdjustment'],
                            'nightDifferentialAdjustment' => $item['nightDifferentialAdjustment'],
                            'allowanceAdjustment'         => $item['allowanceAdjustment'],
                            'lateUndertimeAdjustment'     => $item['lateUndertimeAdjustment'],
                            'lwopAdjustment'              => $item['lwopAdjustment'],
                            'sssAdjustment'               => $item['sssAdjustment'],
                            'phicAdjustment'              => $item['phicAdjustment'],
                            'hdmfAdjustment'              => $item['hdmfAdjustment'],
                            'withHoldingAdjustment'       => $item['withHoldingAdjustment'],
                            'loanAdjustment'              => $item['loanAdjustment'],
                            'otherAdjustment'             => $item['otherAdjustment'],
                            'holidayRemarks'              => $item['holidayRemarks'],
                            'overtimeRemarks'             => $item['overtimeRemarks'],
                            'nightDifferentialRemarks'    => $item['nightDifferentialRemarks'],
                            'allowanceRemarks'            => $item['allowanceRemarks'],
                            'lateUndertimeRemarks'        => $item['lateUndertimeRemarks'],
                            'lwopRemarks'                 => $item['lwopRemarks'],
                            'sssRemarks'                  => $item['sssRemarks'],
                            'phicRemarks'                 => $item['phicRemarks'],
                            'hdmfRemarks'                 => $item['hdmfRemarks'],
                            'withHoldingRemarks'          => $item['withHoldingRemarks'],
                            'loanRemarks'                 => $item['loanRemarks'],
                            'otherRemarks'                => $item['otherRemarks'],
                        ];
                    } 
                    $idArrStr = implode(", ", $payrollAdjustmentItemIDArr);

                    $savePayrollAdjustmentItems = $this->payrolladjustment->savePayrollAdjustmentItems($action, $payrollAdjustmentItems, $payrollAdjustmentID, $idArrStr);
                }

                // APPROVE PAYROLL ADJUSTMENT
                if ($payrollAdjustmentData["payrollAdjustmentStatus"] == 2) {
                    $updatePayroll = $this->payrolladjustment->updatePayrollItems($payrollAdjustmentID);
                }
            }
        }

        echo json_encode($savePayrollAdjustmentData);
    }

}
