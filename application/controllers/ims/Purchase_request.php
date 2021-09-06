<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/PurchaseRequest_model", "purchaserequest");
        isAllowed(46);
    }

    public function index()
    {
        $data["title"] = "Purchase Request";

        $this->load->view("template/header",$data);
        $this->load->view("ims/purchase_request/index");
        $this->load->view("template/footer");
    }

    public function savePurchaseRequest()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $purchaseRequestID       = $this->input->post("purchaseRequestID") ?? null;
        $revisePurchaseRequestID = $this->input->post("revisePurchaseRequestID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $billMaterialID          = $this->input->post("billMaterialID") ?? null;
        $timelineBuilderID       = $this->input->post("timelineBuilderID") ?? null;
        $projectCode             = $this->input->post("projectCode") ?? null;
        $projectName             = $this->input->post("projectName") ?? null;
        $projectCategory         = $this->input->post("projectCategory") ?? null;
        $clientName              = $this->input->post("clientName") ?? null;
        $clientAddress           = $this->input->post("clientAddress") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $purchaseRequestStatus   = $this->input->post("purchaseRequestStatus");
        $purchaseRequestReason   = $this->input->post("purchaseRequestReason") ?? null;
        $purchaseRequestGrandTotal = $this->input->post("purchaseRequestGrandTotal") ?? 0;
        $purchaseRequestRemarks  = $this->input->post("purchaseRequestRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "billMaterialID"          => $billMaterialID,
            "timelineBuilderID"       => $timelineBuilderID,
            "projectCode"             => $projectCode,
            "projectName"             => $projectName,
            "projectCategory"         => $projectCategory,
            "clientName"              => $clientName,
            "clientAddress"           => $clientAddress,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "purchaseRequestStatus"   => $purchaseRequestStatus,
            "purchaseRequestReason"   => $purchaseRequestReason,
            "purchaseRequestGrandTotal" => $purchaseRequestGrandTotal,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($purchaseRequestData["createdBy"]);
            unset($purchaseRequestData["createdAt"]);

            if ($method == "cancelform") {
                $purchaseRequestData = [
                    "purchaseRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "purchaseRequestStatus" => $purchaseRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
                // ----- UPDATE BRAND NAME IN REQUEST ITEMS -----
                if ($purchaseRequestStatus == 2) {
                    $this->purchaserequest->updateRequestItemsBrandName($purchaseRequestID, $billMaterialID);
                }
                // ----- END UPDATE BRAND NAME IN REQUEST ITEMS -----
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "purchaseRequestStatus"  => 3,
                    "purchaseRequestRemarks" => $purchaseRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "revisePurchaseRequestID" => $revisePurchaseRequestID,
                    "purchaseRequestStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $savePurchaseRequestData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $purchaseRequestID);
        if ($savePurchaseRequestData) {
            $result = explode("|", $savePurchaseRequestData);

            if ($result[0] == "true") {
                $purchaseRequestID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $requestItemID        = $item["requestItemID"] ?? null;
                        $billMaterialID       = $billMaterialID;
                        $purchaseRequestID    = $purchaseRequestID;
                        $milestoneBuilderID   = null;
                        $phaseDescription     = null;
                        $milestoneListID      = null;
                        $projectMilestoneID   = null;
                        $projectMilestoneName = null;
                        $inventoryVendorID    = $item["inventoryVendorID"] ?? null;
                        $itemID               = $item["itemID"] ?? null;
                        $itemCode             = $item["itemCode"] ?? null;
                        $itemName             = $item["itemName"] ?? null;
                        $itemDescription      = $item["itemDescription"] ?? null;
                        $itemClassification   = $item["itemClassification"] ?? null;
                        $brandName            = $item["brandName"] ?? null;
                        $itemUom              = $item["itemUom"] ?? null;
                        $categoryType         = $item["categoryType"] ?? null;
                        $quantity             = $item["quantity"] ?? null;
                        $unitCost             = $item["unitcost"] ?? null;
                        $totalCost            = $item["totalcost"] ?? null;
                        $files                = array_key_exists("existingFile", $item) ? $item["existingFile"] : null;
                        $remarks              = $item["remarks"] ?? null;
                        $createdBy            = $item["createdBy"] ?? null;
                        $updatedBy            = $item["updatedBy"] ?? null;

                        if ($requestItemID && $purchaseRequestStatus != "0") {
                            $requestItem = $this->purchaserequest->getRequestItem($requestItemID);
                            if ($requestItem) {
                                $milestoneBuilderID   = $requestItem->milestoneBuilderID;
                                $phaseDescription     = $requestItem->phaseDescription;
                                $milestoneListID      = $requestItem->milestoneListID;
                                $projectMilestoneID   = $requestItem->projectMilestoneID;
                                $projectMilestoneName = $requestItem->projectMilestoneName;
                                $inventoryVendorID    = $requestItem->inventoryVendorID;
                                $itemID               = $requestItem->itemID;
                                $itemCode             = $requestItem->itemCode;
                                $itemName             = $requestItem->itemName;
                                $itemDescription      = $requestItem->itemDescription;
                                $itemClassification   = $requestItem->itemClassification;
                                $brandName            = $requestItem->brandName;
                                $itemUom              = $requestItem->itemUom;
                                $categoryType         = $requestItem->categoryType;
                                $quantity             = $requestItem->quantity;
                                $unitCost             = $requestItem->unitCost;
                                $totalCost            = $requestItem->totalCost;
                                $files                = $requestItem->files;
                                $remarks              = $requestItem->remarks;
                            }
                        }

                        $temp = [
                            "billMaterialID"       => $billMaterialID,
                            "purchaseRequestID"    => $purchaseRequestID,
                            "milestoneBuilderID"   => $milestoneBuilderID,
                            "phaseDescription"     => $phaseDescription,
                            "milestoneListID"      => $milestoneListID,
                            "projectMilestoneID"   => $projectMilestoneID,
                            "projectMilestoneName" => $projectMilestoneName,
                            "inventoryVendorID"    => $inventoryVendorID,
                            "itemID"               => $itemID,
                            "itemCode"             => $itemCode,
                            "itemName"             => $itemName,
                            "itemDescription"      => $itemDescription,
                            "itemClassification"   => $itemClassification,
                            "brandName"            => $brandName,
                            "itemUom"              => $itemUom,
                            "categoryType"         => $categoryType,
                            "quantity"             => $quantity,
                            "unitCost"             => $unitCost,
                            "totalCost"            => $totalCost,
                            "files"                => $files,
                            "remarks"              => $remarks,
                            "createdBy"            => $createdBy,
                            "updatedBy"            => $updatedBy,
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

                    $savePurchaseRequestItems = $this->purchaserequest->savePurchaseRequestItems($action, $purchaseRequestItems, $purchaseRequestID, $billMaterialID);
                }

            }
            
        }
        echo json_encode($savePurchaseRequestData);
    }

    public function getMaterialEquipmentRequestItems()
    {
        $purchaseRequestID = $this->input->post("purchaseRequestID");
        echo json_encode($this->purchaserequest->getMaterialEquipmentRequestItems($purchaseRequestID));
    }

    public function getCostEstimateRequest(){
        $purchaseRequestID = $this->input->post("purchaseRequestID");
        $billMaterialID    = $this->input->post("billMaterialID");
        echo json_encode($this->purchaserequest->getCostEstimateRequest($purchaseRequestID, $billMaterialID));
    }

}
?>