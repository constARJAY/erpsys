<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Item_disposal extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/DisposalItem_model", "disposalitem");
        isAllowed(37);
    }

    public function index()
    {
        $data["title"] = "Item Disposal";

        $this->load->view("template/header",$data);
        $this->load->view("ims/item_disposal/index");
        $this->load->view("template/footer");
    }

        
    public function saveDisposalItem()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $itemDisposalID          = $this->input->post("itemDisposalID") ?? null;
        $reviseitemDisposalID    = $this->input->post("reviseitemDisposalID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $itemDisposalStatus      = $this->input->post("itemDisposalStatus");
        $itemDisposalReason      = $this->input->post("itemDisposalReason") ?? null;
        $itemDisposalRemarks      = $this->input->post("itemDisposalRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $disposalItemData = [
            // "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "itemDisposalStatus"         => $itemDisposalStatus,
            "itemDisposalReason"         => $itemDisposalReason,
            // "projectTotalAmount"      => $projectTotalAmount,
            // "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            // unset($disposalItemData["revisePurchaseRequestID"]);
            unset($disposalItemData["createdBy"]);
            unset($disposalItemData["createdAt"]);

            if ($method == "cancelform") {
                $disposalItemData = [
                    "itemDisposalStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $disposalItemData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "itemDisposalStatus"      => $itemDisposalStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $disposalItemData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "itemDisposalStatus"  => 3,
                    "itemDisposalRemarks" => $itemDisposalRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

    $saveTransferData = $this->disposalitem->saveDisposalItemData($action, $disposalItemData, $itemDisposalID);
        if ($saveTransferData) {
            $result = explode("|", $saveTransferData);

            if ($result[0] == "true") {
                $itemDisposalID  = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "itemDisposalID "          => $itemDisposalID ,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "quantity"          => $item["quantity"],
                            "itemremarks"       => $item["itemremarks"],
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($purchaseRequestItems, $temp);
                    }
                    
                    if (isset($_FILES["items"])) {
                        $length = count($_FILES["items"]["name"]);
                        $keys   = array_keys($_FILES["items"]["name"]);
                        for ($i=0; $i<$length; $i++) {
                            $uploadedFile = explode(".", $_FILES["items"]["name"][$keys[$i]]["file"]);

                            $index     = (int)$uploadedFile[0]; 
                            $extension = $uploadedFile[1];
                            $filename  = $i.time().'.'.$extension;

                            $folderDir = "assets/upload-files/request-items/";
                            if (!is_dir($folderDir)) {
                                mkdir($folderDir);
                            }
                            $targetDir = $folderDir.$filename;

                            if (move_uploaded_file($_FILES["items"]["tmp_name"][$index]["file"], $targetDir)) {
                                $purchaseRequestItems[$index]["files"] = $filename;
                            }
                            
                        } 

                        // ----- UPDATE ITEMS FILE -----
                        foreach ($purchaseRequestItems as $key => $prItem) {
                            if (!array_key_exists("files", $prItem)) {
                                $purchaseRequestItems[$key]["files"] = null;
                            }
                        }
                        // ----- END UPDATE ITEMS FILE -----
                    }

                    $saveDisposarecordltItems = $this->disposalitem->saveDisposalItems($purchaseRequestItems, $itemDisposalID );
                }

            }
            
        }
        echo json_encode($saveTransferData);  
        
    } 
}    