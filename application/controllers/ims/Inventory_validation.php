<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_validation extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryValidation_model", "inventoryvalidation");
        isAllowed(126);
    }

    public function index()
    {
        $data["title"] = "Inventory Validation";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_validation/index");
        $this->load->view("template/footer");
    }

    public function saveInventoryValidation()
    {
        $action                         = $this->input->post("action");
        $method                         = $this->input->post("method");
        $inventoryValidationID          = $this->input->post("inventoryValidationID") ?? null; 
        $reviseInventoryValidationID    = $this->input->post("reviseInventoryValidationID") ?? null;
        $employeeID                     = $this->input->post("employeeID");
        $purchaseRequestID              = $this->input->post("purchaseRequestID") ?? null;
        $timelineBuilderID              = $this->input->post("timelineBuilderID") ?? null;
        $projectCode                    = $this->input->post("projectCode") ?? null;
        $projectName                    = $this->input->post("projectName") ?? null;
        $projectCategory                = $this->input->post("projectCategory") ?? null;
        $clientName                     = $this->input->post("clientName") ?? null;
        $clientAddress                  = $this->input->post("clientAddress") ?? null;
        $approversID                    = $this->input->post("approversID") ?? null;
        $approversStatus                = $this->input->post("approversStatus") ?? null;
        $approversDate                  = $this->input->post("approversDate") ?? null;
        $inventoryValidationStatus      = $this->input->post("inventoryValidationStatus");
        $inventoryValidationReason      = $this->input->post("inventoryValidationReason") ?? null;
        $inventoryValidationGrandTotal  = $this->input->post("inventoryValidationGrandTotal") ?? 0;
        $inventoryValidationRemarks     = $this->input->post("inventoryValidationRemarks") ?? null;
        $submittedAt                    = $this->input->post("submittedAt") ?? null;
        $createdBy                      = $this->input->post("createdBy");
        $updatedBy                      = $this->input->post("updatedBy");
        $createdAt                      = $this->input->post("createdAt");
        $items                          = $this->input->post("items") ?? null;

        $inventoryValidationData = [
            "reviseInventoryValidationID"   => $reviseInventoryValidationID,
            "employeeID"                    => $employeeID,
            "purchaseRequestID"             => $purchaseRequestID,
            "timelineBuilderID"             => $timelineBuilderID,
            "projectCode"                   => $projectCode,
            "projectName"                   => $projectName,
            "projectCategory"               => $projectCategory,
            "clientName"                    => $clientName,
            "clientAddress"                 => $clientAddress,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "inventoryValidationStatus"     => $inventoryValidationStatus,
            "inventoryValidationReason"     => $inventoryValidationReason,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt
        ];

        if ($action == "update") {
            unset($inventoryValidationData["reviseInventoryValidationID"]);
            unset($inventoryValidationData["createdBy"]);
            unset($inventoryValidationData["createdAt"]);

            if ($method == "cancelform") {
                $inventoryValidationData = [
                    "inventoryValidationStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $inventoryValidationData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "inventoryValidationStatus" => $inventoryValidationStatus,
                    "updatedBy"             => $updatedBy,
                ];
                // ----- UPDATE BRAND NAME IN REQUEST ITEMS -----
                if ($inventoryValidationStatus == 2) {
                    $this->inventoryvalidation->updateRequestItemsBrandName($inventoryValidationID, $purchaseRequestID);
                }
                // ----- END UPDATE BRAND NAME IN REQUEST ITEMS -----
            } else if ($method == "deny") {
                $inventoryValidationData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "inventoryValidationStatus"  => 3,
                    "inventoryValidationRemarks" => $inventoryValidationRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $inventoryValidationData = [
                    "reviseInventoryValidationID" => $reviseInventoryValidationID,
                    "inventoryValidationStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }
        // ----- ADD REQUEST ITEMS -----
        if ($inventoryValidationStatus == 2) {
            if ($items) {
                $inventoryValidationItems = [];
                foreach($items as $index => $item) {
                    $billMaterialID 			= $item["billMaterialID"] ?? null;
				    $purchaseRequestID		    = $item["purchaseRequestID"] ?? null;
                    $inventoryValidationID      = $inventoryValidationID;
                    $categoryType 			    = $item["categoryType"] ?? null;
                    $milestoneBuilderID 		= $item["milestoneBuilderID"] ?? NULL;
                    $phaseDescription 		    = $item["phaseDescription"] ?? NULL;
                    $milestoneListID 		    = $item["milestoneListID"] ?? NULL;
                    $projectMilestoneName	    = $item["projectMilestoneName"] ?? NULL;
                    $itemID 					= $item["itemID"] ?? null;
                    $itemCode				    = $item["itemCode"] ?? null;
                    $itemName 				    = $item["itemName"] ?? null;
                    $itemDescription 		    = $item["itemDescription"] ?? null;
                    $itemClassification 		= $item["itemClassification"] ?? null;
                    $brandName 				    = $item["brandName"] ?? null;
                    $itemUom 				    = $item["itemUom"] ?? null;
                    $quantity 				    = $item["quantity"] ?? null;
                    $stocks					    = $item["stocks"] ?? null;
                    $forPurchase 			    = $item["forPurchase"] ?? null;
                    $reservedItem 			    = $item["reservedItem"] ?? null;

                    $temp = [
                        "billMaterialID" 			=> $billMaterialID,
                        "purchaseRequestID"		    => $purchaseRequestID,
                        "inventoryValidationID"     => $inventoryValidationID,
                        "categoryType" 			    => $categoryType,
                        "milestoneBuilderID" 		=> $milestoneBuilderID,
                        "phaseDescription" 		    => $phaseDescription,
                        "milestoneListID" 		    => $milestoneListID,
                        "projectMilestoneID" 		=> $milestoneListID,
                        "projectMilestoneName"	    => $projectMilestoneName,
                        "itemID" 					=> $itemID,
                        "itemCode"				    => $itemCode,
                        "itemName" 				    => $itemName,
                        "itemDescription" 		    => $itemDescription,
                        "itemClassification" 		=> $itemClassification,
                        "brandName" 			    => $brandName,
                        "itemUom" 				    => $itemUom,
                        "quantity" 				    => $quantity,
                        "stocks"					=> $stocks,
                        "forPurchase" 			    => $forPurchase,
                        "reserveItem" 			    => $reservedItem,
                        "createdBy"                 => $createdBy,
                        "updatedBy"                 => $createdBy,
                    ];
                    array_push($inventoryValidationItems, $temp);
                }
                
                $saveInventoryValidationItems = $this->inventoryvalidation->saveInventoryValidationItems($inventoryValidationItems, $inventoryValidationID, $purchaseRequestID);
            }
        }
        // ----- END ADD REQUEST ITEMS -----

        $saveInventoryValidationData = $this->inventoryvalidation->saveInventoryValidationData($action, $inventoryValidationData, $inventoryValidationID);


        echo json_encode($saveInventoryValidationData);
    }

    public function getMaterialEquipmentRequestItems()
    {
        $inventoryValidationID = $this->input->post("inventoryValidationID");
        echo json_encode($this->inventoryvalidation->getMaterialEquipmentRequestItems($inventoryValidationID));
    }

    public function getPurchaseRequest(){
        $inventoryValidationID = $this->input->post("inventoryValidationID");
        $purchaseRequestID    = $this->input->post("purchaseRequestID");
        echo json_encode($this->inventoryvalidation->getPurchaseRequest($inventoryValidationID, $purchaseRequestID));
    }



    
}
?>     