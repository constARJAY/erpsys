<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Client_fund_replenishment extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/ClientFundReplenishment_model", "clientrep");
        isAllowed(133);
    }

    public function index()
    {
        $data["title"] = "Client Fund Replenishment Form";

        $this->load->view("template/header",$data);
        $this->load->view("fms/client_fund_replenishment/index");
        $this->load->view("template/footer");
    }

    public function saveClientRep()
    {
        $action                 = $this->input->post("action");
        $method                 = $this->input->post("method");
        $clientRepID             = $this->input->post("clientRepID") ?? null;
        $clientRepTotalBalance   = $this->input->post("clientRepTotalBalance") ?? null;           
        $reviseClientRepID       = $this->input->post("reviseClientRepID") ?? null;
        $employeeID             = $this->input->post("employeeID");
        $approversID            = $this->input->post("approversID") ?? null;
        $approversStatus        = $this->input->post("approversStatus") ?? null;
        $approversDate          = $this->input->post("approversDate") ?? null;
        $clientRepStatus         = $this->input->post("clientRepStatus");
        $clientRepRemarks        = $this->input->post("clientRepRemarks") ?? NULL;
        $submittedAt            = $this->input->post("submittedAt") ?? NULL;
        $createdBy              = $this->input->post("createdBy");
        $updatedBy              = $this->input->post("updatedBy");
        $createdAt              = $this->input->post("createdAt");
        $request                = $this->input->post("request") ?? null;

        $clientRepData = [
            "reviseClientRepID"         => $reviseClientRepID,
            "employeeID"                => $employeeID,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "clientRepTotalBalance"     => $clientRepTotalBalance,
            "approversDate"             => $approversDate,
            "clientRepStatus"           => $clientRepStatus,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($clientRepData["reviseClientRepID"]);
            unset($clientRepData["createdBy"]);
            unset($clientRepData["createdAt"]);

            if ($method == "cancelform") {
                $clientRepData = [
                    "clientRepStatus" => 4,
                    "updatedBy"      => $updatedBy,
                ];
            } else if ($method == "approve") {
                $clientRepData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "clientRepStatus"  => $clientRepStatus,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "deny") {
                $clientRepData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "clientRepStatus"      => 3,
                    "clientRepRemarks"     => $clientRepRemarks,
                    "updatedBy"           => $updatedBy,
                ];
            }   else if ($method == "drop") {
                $clientRepData = [
                    "reviseClientRepID" => $reviseClientRepID,
                    "clientRepStatus"   => 5,
                    "updatedBy"        => $updatedBy,
                ]; 
            }
        }

        $saveClientRepData = $this->clientrep->saveClientRepData($action, $clientRepData, $clientRepID);
        if ($saveClientRepData) {
            $result = explode("|", $saveClientRepData);
            
            if ($result[0] == "true") {
                if($method == "save" && $method == "drop" && $method == "cancelform"){
                    $clientRepID = NULL;
                }else if($method == "approve" && $method == "deny"){
                    $clientRepID = $result[2];
                }else{
                    $clientRepID = $result[2];
                }
                

                if ($request) {
                    $clientRepItems = [];
                    foreach($request as $index => $item) {
                        $temp = [
                            "financeRequestID" => $item["financeRequestID"],
                            "clientRepID"       => $clientRepID,
                        ];
                        array_push($clientRepItems, $temp);
                    }
                    $saveClientRepIRequest = $this->clientrep->saveClientRepIRequest($clientRepItems, $clientRepID);
                }

            }
            
        }
        echo json_encode($saveClientRepData);
    }




}
?>