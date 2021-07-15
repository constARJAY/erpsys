<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        $this->load->model("fms/PaymentRequest_model", "paymentRequest");
        isAllowed(76);
    }

    public function index()
    {
        $data["title"] = "Payment Request";

        $this->load->view("template/header",$data);
        $this->load->view("fms/payment_request/index");
        $this->load->view("template/footer");
    }

    public function savePaymentRequest()
    {   
        // echo "<pre>";
        // print_r($_POST);
        // exit;
        $action                             = $this->input->post("action");
        $method                             = $this->input->post("method");
        $paymentRequestID                 = $this->input->post("paymentRequestID") ?? null;
        $revisePaymentRequestID           = $this->input->post("revisePaymentRequestID") ?? null;
        $purchaseOrderID             = $this->input->post("purchaseOrderID") ?? null;
        $pettyRepID               = $this->input->post("pettyRepID") ?? null;
        $paymentRequestReason                   = $this->input->post("paymentRequestReason") ?? null;
        $referenceCode                   = $this->input->post("referenceCode") ?? null;
        $requestorID                    = $this->input->post("requestorID") ?? null;
        $referencePurpose                   = $this->input->post("referencePurpose") ?? null;
        $amount                   = $this->input->post("amount") ?? null;
        $amountWords                   = $this->input->post("amountWords") ?? null;
        $employeeID                         = $this->input->post("employeeID");
        $approversID                        = $this->input->post("approversID") ?? null;
        $approversStatus                    = $this->input->post("approversStatus") ?? null;
        $approversDate                      = $this->input->post("approversDate") ?? null;
        $paymentRequestStatus             = $this->input->post("paymentRequestStatus");
        $paymentRequestRemarks            = $this->input->post("paymentRequestRemarks") ?? null;
        $submittedAt                        = $this->input->post("submittedAt") ?? null;
        $createdBy                          = $this->input->post("createdBy");
        $updatedBy                          = $this->input->post("updatedBy");
        $createdAt                          = $this->input->post("createdAt");
        

        $paymentRequestData = [
            "revisePaymentRequestID"      => $revisePaymentRequestID,
            "employeeID"                    => $employeeID,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "paymentRequestReason"              => $paymentRequestReason,
            "requestorID"          => $requestorID,
            "referenceCode"          => $referenceCode,
            "referencePurpose"          => $referencePurpose,
            "amount"          => $amount,
            "amountWords"          => $amountWords,
            "purchaseOrderID"          => $purchaseOrderID,
            "pettyRepID"          => $pettyRepID,
            "paymentRequestStatus"        => $paymentRequestStatus,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt
        ];

        if ($action == "update") {
            unset($paymentRequestData["revisePaymentRequestID"]);
            unset($paymentRequestData["createdBy"]);
            unset($paymentRequestData["createdAt"]);

            if ($method == "cancelform") {
                $paymentRequestData = [
                    "paymentRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $paymentRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "paymentRequestStatus" => $paymentRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
              
            } else if ($method == "deny") {
                $paymentRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "paymentRequestStatus"  => 3,
                    "paymentRequestRemarks" => $paymentRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
            //  else if ($method == "drop") {
            //     $paymentRequestData = [
            //         "revisePaymentRequestID" => $revisePaymentRequestID,
            //         "paymentRequestStatus"   => 5,
            //         "updatedBy"               => $updatedBy,
            //     ]; 
            
            // }
        }
        
        $savePaymentRequestData = $this->paymentRequest->savePaymentRequestData($action, $paymentRequestData, $paymentRequestID);
        echo json_encode($savePaymentRequestData);
    }


}
?>