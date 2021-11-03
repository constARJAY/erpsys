<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Item_disposal extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/DisposalItem_model", "disposalitem");
        isAllowed(36);
    }

    public function index()
    {
        $data["title"] = "Asset Disposal";

        $this->load->view("template/header",$data);
        $this->load->view("ims/item_disposal/index");
        $this->load->view("template/footer");
    }

    public function saveDisposalItem()
    {
        $action                      = $this->input->post("action");
        $method                      = $this->input->post("method");
        $disposalID                  = $this->input->post("disposalID") ?? null;
        $reviseDisposalID            = $this->input->post("reviseDisposalID") ?? null;
        $employeeID                  = $this->input->post("employeeID");
        $approversID                 = $this->input->post("approversID") ?? null;
        $approversStatus             = $this->input->post("approversStatus") ?? null;
        $approversDate               = $this->input->post("approversDate") ?? null;
        $disposalStatus              = $this->input->post("disposalStatus");
        $disposalReason              = $this->input->post("disposalReason") ?? null;
        $disposalRemarks             = $this->input->post("disposalRemarks") ?? null;
        $submittedAt                 = $this->input->post("submittedAt") ?? null;
        $createdBy                   = $this->input->post("createdBy");
        $updatedBy                   = $this->input->post("updatedBy");
        $createdAt                   = $this->input->post("createdAt");
        $items                       = $this->input->post("items") ?? null;

        $disposalItemData = [
            "reviseDisposalID"        => $reviseDisposalID,
            "employeeID"              => $employeeID,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "disposalStatus"         => $disposalStatus,
            "disposalReason"         => $disposalReason,
            // "projectTotalAmount"      => $projectTotalAmount,
            // "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($disposalItemData["reviseDisposalID"]);
            unset($disposalItemData["createdBy"]);
            unset($disposalItemData["createdAt"]);

            if ($method == "cancelform") {
                $disposalItemData = [
                    "disposalStatus"        => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $disposalItemData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "disposalStatus"      => $disposalStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $disposalItemData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "disposalStatus"        => 3,
                    "disposalRemarks"       => $disposalRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $disposalItemData = [
                    "reviseDisposalID"        => $reviseDisposalID,
                    "disposalStatus"          => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
            
        }

    $saveTransferData = $this->disposalitem->saveDisposalItemData($action, $disposalItemData, $disposalID,$disposalStatus);
        if ($saveTransferData) {
            
            $result = explode("|", $saveTransferData);
            //var_dump("try sample".$approversStatus);
         

            if ($result[0] == "true") {
                $disposalID  = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                                    "DisposalID"                       => $disposalID,
                                    "stockInAssetID"                   => $item["stockInAssetID"],
                                    "inventoryStorageID"               => $item["inventoryStorageID"],
                                    "inventoryStorageCode"             => $item["inventoryStorageCode"],
                                    "inventoryStorageOfficeName"       => $item["inventoryStorageOfficeName"],
                                    "assetID"                          => $item["assetID"],
                                    "assetCode"                        => $item["assetCode"],
                                    "assetName"                        => $item["assetName"],
                                    "barcode"                          => $item["barcode"],
                                    "brand"                            => $item["brand"],
                                    "assetClassification"              => $item["assetClassification"],
                                    "assetCategory"                    => $item["assetCategory"],
                                    "serialnumber"                     => $item["serialnumber"],
                                    "quantity"                         => $item["quantity"],
                                    "availableStock"                   => $item["availableStock"],
                                    "unitofmeasurement"                => $item["unitofmeasurement"],
                                    "disposalDetailRemarks"            => $item["disposalDetailRemarks"],
                                    "createdBy"                        => $item["createdBy"],
                                    "updatedBy"                        => $item["updatedBy"],
                        ];
                        array_push($purchaseRequestItems, $temp);
                    }
                    $saveDisposarecordltItems = $this->disposalitem->saveDisposalItems($purchaseRequestItems, $disposalID,$approversStatus );
                }

            }
            
        }
        echo json_encode($saveTransferData);  
        
    } 
}    