<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Client_fund_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/ClientFundRequest_model", "clientfundrequest");
        isAllowed(54);
    }

    public function index()
    {
        $data["title"] = "Client Fund Request";

        $this->load->view("template/header",$data);
        $this->load->view("fms/client_fund_request/index");
        $this->load->view("template/footer");
    }
    public function saveClientFundRequest()
    {
        $action                                 = $this->input->post("action");
        $method                                 = $this->input->post("method");
        $clientFundRequestID                    = $this->input->post("clientFundRequestID") ?? null;
        $reviseClientFundRequestID              = $this->input->post("reviseClientFundRequestID") ?? null;
        $clientFundRequestAmount                = $this->input->post("clientFundRequestAmount") ?? null;
        $clientFundRequestDate                  = $this->input->post("clientFundRequestDate") ?? null;
        $projectID                              = $this->input->post("projectID") ?? null;
        $chartOfAccountID                       = $this->input->post("chartOfAccountID") ?? null;
        $employeeID                             = $this->input->post("employeeID");
        $approversID                            = $this->input->post("approversID") ?? null;
        $approversStatus                        = $this->input->post("approversStatus") ?? null;
        $approversDate                          = $this->input->post("approversDate") ?? null;
        $clientFundRequestStatus                = $this->input->post("clientFundRequestStatus");
        $clientFundRequestRemarks               = $this->input->post("clientFundRequestRemarks") ?? null;
        $submittedAt                            = $this->input->post("submittedAt") ?? null;
        $createdBy                              = $this->input->post("createdBy");
        $updatedBy                              = $this->input->post("updatedBy");
        $createdAt                              = $this->input->post("createdAt");
        $items                                  = $this->input->post("items") ?? null;

        $clientFundRequestData = [
            "reviseClientFundRequestID"         => $reviseClientFundRequestID,
            "employeeID"                        => $employeeID,
            "projectID"                         => $projectID,
            "approversID"                       => $approversID,
            "approversStatus"                   => $approversStatus,
            "approversDate"                     => $approversDate,
            "chartOfAccountID"                  => $chartOfAccountID,
            "clientFundRequestDate"             => $clientFundRequestDate,
            "clientFundRequestStatus"           => $clientFundRequestStatus,
            "clientFundRequestAmount"           => $clientFundRequestAmount,
            "submittedAt"                       => $submittedAt,
            "createdBy"                         => $createdBy,
            "updatedBy"                         => $updatedBy,
            "createdAt"                         => $createdAt
        ];

        if ($action == "update") {
            unset($clientFundRequestData["reviseClientFundRequestID"]);
            unset($clientFundRequestData["createdBy"]);
            unset($clientFundRequestData["createdAt"]);

            if ($method == "cancelform") {
                $clientFundRequestData = [
                    "clientFundRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $clientFundRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "clientFundRequestStatus" => $clientFundRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
              
            } else if ($method == "deny") {
                $clientFundRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "clientFundRequestStatus"  => 3,
                    "clientFundRequestRemarks" => $clientFundRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $clientFundRequestData = [
                    "reviseClientFundRequestID" => $reviseClientFundRequestID,
                    "clientFundRequestStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveClientFundRequestData = $this->clientfundrequest->saveClientFundRequestData($action, $clientFundRequestData, $clientFundRequestID);
        if ($saveClientFundRequestData) {
            $result = explode("|", $saveClientFundRequestData);

            if ($result[0] == "true") {
                $clientFundRequestID = $result[2];

                if ($items) {
                    $pettyCashRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "clientFundRequestID"   => $clientFundRequestID,
                            "description"           => $item["description"] != "null" ? $item["description"] : null,
                            "quantity"              => $item["quantity"] != "null" ? $item["quantity"] : null,
                            "amount"                => $item["amount"] != "null" ? $item["amount"] : null,
                            "totalAmount"           => $item["totalAmount"] != "null" ? $item["totalAmount"] : null,
                            "files"                 => array_key_exists("existingFile", $item) ? $item["existingFile"] : null, 
                            "createdBy"             => $item["createdBy"],
                            "updatedBy"             => $item["updatedBy"],
                        ];
                        array_push($pettyCashRequestItems, $temp);
                    }
                    
                    if (isset($_FILES["items"])) {
                        $length = count($_FILES["items"]["name"]);
                        $keys   = array_keys($_FILES["items"]["name"]);
                        for ($i=0; $i<$length; $i++) {
                            $uploadedFile = explode(".", $_FILES["items"]["name"][$keys[$i]]["file"]);

                            $index     = (int)$uploadedFile[0]; 
                            $extension = $uploadedFile[1];
                            $filename  = $i.time().'.'.$extension;

                            $folderDir = "assets/upload-files/client-fund-request/";
                            if (!is_dir($folderDir)) {
                                mkdir($folderDir);
                            }
                            $targetDir = $folderDir.$filename;

                            if (move_uploaded_file($_FILES["items"]["tmp_name"][$index]["file"], $targetDir)) {
                                $pettyCashRequestItems[$index]["files"] = $filename;
                            }
                            
                        } 

                        // ----- UPDATE ITEMS FILE -----
                        foreach ($pettyCashRequestItems as $key => $prItem) {
                            if (!array_key_exists("files", $prItem)) {
                                $pettyCashRequestItems[$key]["files"] = null;
                            }
                        }
                        // ----- END UPDATE ITEMS FILE -----
                    }

                    $saveClientFundRequestItems = $this->clientfundrequest->saveClientFundRequestItems($action, $pettyCashRequestItems, $clientFundRequestID);
                }

            }
            
        }
        echo json_encode($saveClientFundRequestData);
    }



}    