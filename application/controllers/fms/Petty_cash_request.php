<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Petty_cash_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/PettyCashRequest_model", "pettycashrequest");
        isAllowed(53);
    }

    public function index()
    {
        $data["title"] = "Petty Cash Request";

        $this->load->view("template/header",$data);
        $this->load->view("fms/petty_cash_request/index");
        $this->load->view("template/footer");
    }

    public function insertLiquidation()
    {
        $pettyCashRequestID = $this->input->post("pettyCashRequestID") ?? 0;
        echo json_encode($this->pettycashrequest->insertLiquidation($pettyCashRequestID));
    }



    public function savePettyCashRequest()
    {
        $action                             = $this->input->post("action");
        $method                             = $this->input->post("method");
        $pettyCashRequestID                 = $this->input->post("pettyCashRequestID") ?? null;
        $revisePettyCashRequestID           = $this->input->post("revisePettyCashRequestID") ?? null;
        $pettyCashRequestAmount             = $this->input->post("pettyCashRequestAmount") ?? null;
        $pettyCashRequestDate               = $this->input->post("pettyCashRequestDate") ?? null;
        $chartOfAccountID                   = $this->input->post("chartOfAccountID") ?? null;
        $employeeID                         = $this->input->post("employeeID");
        $approversID                        = $this->input->post("approversID") ?? null;
        $approversStatus                    = $this->input->post("approversStatus") ?? null;
        $approversDate                      = $this->input->post("approversDate") ?? null;
        $pettyCashRequestStatus             = $this->input->post("pettyCashRequestStatus");
        $pettyCashRequestRemarks            = $this->input->post("pettyCashRequestRemarks") ?? null;
        $submittedAt                        = $this->input->post("submittedAt") ?? null;
        $createdBy                          = $this->input->post("createdBy");
        $updatedBy                          = $this->input->post("updatedBy");
        $createdAt                          = $this->input->post("createdAt");
        $items                              = $this->input->post("items") ?? null;

        $pettyCashRequestData = [
            "revisePettyCashRequestID"      => $revisePettyCashRequestID,
            "employeeID"                    => $employeeID,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "chartOfAccountID"              => $chartOfAccountID,
            "pettyCashRequestDate"          => $pettyCashRequestDate,
            "pettyCashRequestStatus"        => $pettyCashRequestStatus,
            "pettyCashRequestAmount"        => $pettyCashRequestAmount,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt
        ];

        if ($action == "update") {
            unset($pettyCashRequestData["revisePettyCashRequestID"]);
            unset($pettyCashRequestData["createdBy"]);
            unset($pettyCashRequestData["createdAt"]);

            if ($method == "cancelform") {
                $pettyCashRequestData = [
                    "pettyCashRequestStatus" => 4,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "approve") {
                $pettyCashRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "pettyCashRequestStatus" => $pettyCashRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
              
            } else if ($method == "deny") {
                $pettyCashRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "pettyCashRequestStatus"  => 3,
                    "pettyCashRequestRemarks" => $pettyCashRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $pettyCashRequestData = [
                    "revisePettyCashRequestID" => $revisePettyCashRequestID,
                    "pettyCashRequestStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            
            }
        }

        $savePettyCashRequestData = $this->pettycashrequest->savePettyCashRequestData($action, $pettyCashRequestData, $pettyCashRequestID);
        if ($savePettyCashRequestData) {
            $result = explode("|", $savePettyCashRequestData);

            if ($result[0] == "true") {
                $pettyCashRequestID = $result[2];

                if ($items) {
                    $pettyCashRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            // "requestItemID"     => $item["requestItemID"] != "null" ? $item["requestItemID"] : null,
                            "pettyCashRequestID" => $pettyCashRequestID,
                           // "chartOfAccountID"  => $item["chartOfAccountID"] != "null" ? $item["chartOfAccountID"] : null,
                            "description"       => $item["description"] != "null" ? $item["description"] : null,
                            "quantity"          => $item["quantity"] != "null" ? $item["quantity"] : null,
                            "totalAmount"       => $item["totalAmount"] != "null" ? $item["totalAmount"] : null,
                            "amount"            => $item["amount"] != "null" ? $item["amount"] : null,
                            "files"             => array_key_exists("existingFile", $item) ? $item["existingFile"] : null, 
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
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

                            $folderDir = "assets/upload-files/petty-cash-request/";
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

                    $savePettyCashRequestItems = $this->pettycashrequest->savePettyCashRequestItems($action, $pettyCashRequestItems, $pettyCashRequestID);
                }

            }
            
        }
        echo json_encode($savePettyCashRequestData);
    }

}
?>