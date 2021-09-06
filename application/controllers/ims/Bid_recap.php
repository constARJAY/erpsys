<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bid_recap extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/BidRecap_model", "bidrecap");
        isAllowed(126);
    }

    public function index()
    {
        $data["title"] = "Bid Recap";

        $this->load->view("template/header",$data);
        $this->load->view("ims/bid_recap/index");
        $this->load->view("template/footer");
    }

    public function saveBidRecap()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $bidRecapID                 = $this->input->post("bidRecapID") ?? null;
        $reviseBidRecapID           = $this->input->post("reviseBidRecapID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $inventoryValidationID      = $this->input->post("inventoryValidationID") ?? null;
        $purchaseRequestID          = $this->input->post("purchaseRequestID") ?? null;
        $timelineBuilderID          = $this->input->post("timelineBuilderID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $projectCategory            = $this->input->post("projectCategory") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $bidRecapStatus             = $this->input->post("bidRecapStatus");
        $bidRecapReason             = $this->input->post("bidRecapReason") ?? null;
        $bidRecapGrandTotal         = $this->input->post("bidRecapGrandTotal") ?? 0;
        $bidRecapRemarks            = $this->input->post("bidRecapRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        $bidRecapData = [
            "reviseBidRecapID"          => $reviseBidRecapID,
            "employeeID"                => $employeeID,
            "inventoryValidationID"     => $inventoryValidationID,
            "purchaseRequestID"         => $purchaseRequestID,
            "timelineBuilderID"         => $timelineBuilderID,
            "projectCode"               => $projectCode,
            "projectName"               => $projectName,
            "projectCategory"           => $projectCategory,
            "clientName"                => $clientName,
            "clientAddress"             => $clientAddress,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "bidRecapStatus"            => $bidRecapStatus,
            "bidRecapReason"            => $bidRecapReason,
            "bidRecapGrandTotal"        => $bidRecapGrandTotal,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($bidRecapData["reviseBidRecapID"]);
            unset($bidRecapData["createdBy"]);
            unset($bidRecapData["createdAt"]);

            if ($method == "cancelform") {
                $bidRecapData = [
                    "bidRecapStatus" => 4,
                    "updatedBy"      => $updatedBy,
                ];
            } else if ($method == "approve") {
                $bidRecapData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "bidRecapStatus"  => $bidRecapStatus,
                    "updatedBy"       => $updatedBy,
                ];
                // ----- UPDATE BRAND NAME IN REQUEST ITEMS -----
                // if ($bidRecapStatus == 2) {
                //    $this->bidrecap->updateRequestItemsBrandName($bidRecapID, $inventoryValidationID);
                // }
                // ----- END UPDATE BRAND NAME IN REQUEST ITEMS -----
            } else if ($method == "deny") {
                $bidRecapData = [
                    "approversStatus"   => $approversStatus,
                    "approversDate"     => $approversDate,
                    "bidRecapStatus"    => 3,
                    "bidRecapRemarks"   => $bidRecapRemarks,
                    "updatedBy"         => $updatedBy,
                ];
            } else if ($method == "drop") {
                $bidRecapData = [
                    "reviseBidRecapID" => $reviseBidRecapID,
                    "bidRecapStatus"   => 5,
                    "updatedBy"        => $updatedBy,
                ]; 
            }
        }

        $saveBidRecapData =$this->bidrecap->saveBidRecapData($action, $bidRecapData, $bidRecapID);
        if ($saveBidRecapData) {
            $result = explode("|", $saveBidRecapData);

            if ($result[0] == "true") {
                $bidRecapID = $result[2];

                if ($items) {
                    $bidRecapItems = [];

                    foreach($items as $index => $item) {
                        $requestItemID  = $item["requestItemID"] ?? null;
                        
                        $vendorID       = $item["vendorID"] ?? null;
                        $vendorName     = $item["vendorName"] ?? null;
                        $unitCost       = $item["unitCost"] ?? null;
                        $totalCost      = $item["totalCost"] ?? null;
                        
                        if ($requestItemID && $bidRecapStatus != "0") {
                            $requestItem = $this->bidrecap->getRequestItem($requestItemID);
                            if ($requestItem) {
                                $inventoryValidationID      = $requestItem->inventoryValidationID;
                                $billMaterialID             = $requestItem->billMaterialID;
                                $purchaseRequestID          = $requestItem->purchaseRequestID;
                                $inventoryVendorID          = $vendorID;
                                $inventoryVendorName        = $vendorName;

                                $categoryType               = $requestItem->milestoneBuilderID ? "Project Phase" : "Materials and Equipment";
                                $milestoneBuilderID         = $requestItem->milestoneBuilderID;
                                $phaseDescription           = $requestItem->phaseDescription;
                                $milestoneListID            = $requestItem->milestoneListID;
                                $projectMilestoneID         = $requestItem->projectMilestoneID;
                                $projectMilestoneName       = $requestItem->projectMilestoneName; 
                                $itemID                     = $requestItem->itemID;
                                $itemCode                   = $requestItem->itemCode;
                                $itemName                   = $requestItem->itemName;
                                $itemDescription            = $requestItem->itemDescription;
                                $itemClassification         = $requestItem->itemClassification;
                                $brandName                  = $requestItem->brandName;
                                $itemUom                    = $requestItem->itemUom;
                                $quantity                   = $requestItem->quantity;
                                $stocks                     = $requestItem->stocks;
                                $forPurchase                = $requestItem->forPurchase;
                                
                                $temp = [
                                    "inventoryValidationID"     => $inventoryValidationID,
                                    "billMaterialID"            => $billMaterialID,
                                    "purchaseRequestID"         => $purchaseRequestID,
                                    "bidRecapID"                => $bidRecapID,
                                    "categoryType"              => $categoryType,
                                    "inventoryVendorID"         => $inventoryVendorID,
                                    "inventoryVendorName"       => $inventoryVendorName,
                                    "milestoneBuilderID"        => $milestoneBuilderID,
                                    "phaseDescription"          => $phaseDescription,
                                    "milestoneListID"           => $milestoneListID,
                                    "projectMilestoneID"        => $projectMilestoneID,
                                    "projectMilestoneName"      => $projectMilestoneName,
                                    "itemID"                    => $itemID,
                                    "itemCode"                  => $itemCode,
                                    "itemName"                  => $itemName,
                                    "itemDescription"           => $itemDescription,
                                    "itemClassification"        => $itemClassification,
                                    "brandName"                 => $brandName,
                                    "itemUom"                   => $itemUom,
                                    "quantity"                  => $quantity,
                                    "stocks"                    => $stocks,
                                    "forPurchase"               => $forPurchase,
                                    "unitCost"                  => $unitCost,
                                    "totalCost"                 => $totalCost,                   
                                ];
                                array_push($bidRecapItems, $temp);

                            }
                        }
                    }
                   
                    if($bidRecapStatus != "0"){
                        $saveBidRecapItems = $this->bidrecap->saveBidRecapItems($bidRecapItems, $bidRecapID);
                    }
                    
                }

            }
            
        }
        echo json_encode($saveBidRecapData);
    }

    public function getMaterialEquipmentRequestItems()
    {
        $bidRecapID = $this->input->post("bidRecapID");
        echo json_encode($this->bidrecap->getMaterialEquipmentRequestItems($bidRecapID));
    }

    public function getCostEstimateRequest(){
        $bidRecapID = $this->input->post("bidRecapID");
        $inventoryValidationID    = $this->input->post("inventoryValidationID");
        echo json_encode($this->bidrecap->getCostEstimateRequest($bidRecapID, $inventoryValidationID));
    }



}
?>     