<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Backpay extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Backpay_model", "backpay");
        isAllowed(95);
    }

    public function index()
    {
        $data["title"] = "Back Pay";

        $this->load->view("template/header",$data);
        $this->load->view("hris/backpay/index");
        $this->load->view("template/footer");
    }

    public function saveBackpay()
    { 

        // echo "<pre>";
        // print_r($_POST);
        // exit;


        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $backPayID                  = $this->input->post("backPayID") ?? null;
        $backPayEmployeeID                  = $this->input->post("backPayEmployeeID") ?? null;
        $reviseBackPayID            = $this->input->post("reviseBackPayID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $backPayDescription               = $this->input->post("backPayDescription");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $backPayStatus              = $this->input->post("backPayStatus");
        $backPayRemarks             = $this->input->post("backPayRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;


        $BackPayData = [
            "reviseBackPayID"           => $reviseBackPayID,
            "employeeID"                 => $employeeID,
            "backPayDescription"               => $backPayDescription,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "backPayStatus"              => $backPayStatus,
            "backPayRemarks"             => $backPayRemarks,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($BackPayData["reviseBackPayID"]);
            unset($BackPayData["createdBy"]);
            unset($BackPayData["createdAt"]);

            if ($method == "cancelform") {
                $BackPayData = [
                    "backPayStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $BackPayData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "backPayStatus" => $backPayStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $BackPayData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "backPayStatus"  => 3,
                    "backPayRemarks" => $backPayRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $BackPayData = [
                    "reviseBackPayID" => $reviseBackPayID,
                    "backPayStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
            else if ($method == "release") {
                // $BackPayData = [
                //     "reviseBackPayID" => $reviseBackPayID,
                //     "backPayStatus"   => 9,
                //     "updatedBy"               => $updatedBy,
                // ]; 
            } 
         
        }
       
            $saveBackPayData = $this->backpay->saveBackPayData($action, $BackPayData, $backPayID,$method);

            if ($saveBackPayData && ($method == "submit" || $method == "save")) {
                $result = explode("|", $saveBackPayData);

                if ($result[0] == "true") {
                    $backPayID = $result[2];

                    if ($items) {
                        $backPayRequestList = [];
                        foreach($items as $index => $item) {

                            $temp = [
                                "backPayID" => $backPayID,
                                "salaryReleaseID"             => $item["salaryReleaseID"],
                                "othersAmountStatus"              => $item["othersAmountStatus"],
                                "otherReference"              => $item["otherReference"],
                                "amount"              => $item["backPayAmount"],
                                // "createdBy"            => $updatedBy,
                                // "updatedBy"            => $updatedBy,
                            ];
                            array_push($backPayRequestList, $temp);

                        }

                        $savePurchTransferstItems = $this->backpay->saveBackPayRequestList($backPayRequestList, $backPayID);
                    }

                }
                
            }


        
        if($method == "release"){

            $changeStatusInRelease = $this->backpay->changeReleaseStatus($backPayEmployeeID,$employeeID);

        }
        echo json_encode($saveBackPayData);
    }

}
?>