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

        // echo"<pre>";
        // print_r($_POST);
        // exit;
        $action                         = $this->input->post("action");
        $method                         = $this->input->post("method");
        $inventoryValidationID          = $this->input->post("inventoryValidationID") ?? null; 
        $reviseInventoryValidationID    = $this->input->post("reviseInventoryValidationID") ?? null;
        $employeeID                     = $this->input->post("employeeID");
        $approversID                    = $this->input->post("approversID") ?? null;
        $approversStatus                = $this->input->post("approversStatus") ?? null;
        $approversDate                  = $this->input->post("approversDate") ?? null;
        $inventoryValidationStatus      = $this->input->post("inventoryValidationStatus");
        $inventoryValidationRemarks     = $this->input->post("inventoryValidationRemarks") ?? null;
        $submittedAt                    = $this->input->post("submittedAt") ?? null;
        // $createdBy                      = $this->input->post("createdBy");
        $updatedBy                      = $this->input->post("updatedBy");
        $createdAt                      = $this->input->post("createdAt");
        $items                          = $this->input->post("items") ?? null;
        $assets                          = $this->input->post("assets") ?? null;

        $materialWithdrawalCode  = $this->input->post("materialWithdrawalCode") == "null" ? NULL : $this->input->post("materialWithdrawalCode") ; 
        $stockOutCode  = $this->input->post("stockOutCode") == "null" ? NULL : $this->input->post("stockOutCode"); 
        $equipmentBorrowingCode  = $this->input->post("equipmentBorrowingCode") == "null" ? NULL : $this->input->post("equipmentBorrowingCode"); 
        $inventoryValidationID  = $this->input->post("inventoryValidationID") == "null" ? NULL : $this->input->post("inventoryValidationID"); 
        $inventoryValidationCode  = $this->input->post("inventoryValidationCode") == "null" ? NULL : $this->input->post("inventoryValidationCode"); 
        $materialRequestID  = $this->input->post("materialRequestID") == "null" ? NULL : $this->input->post("materialRequestID"); 
        $materialRequestCode  = $this->input->post("materialRequestCode") == "null" ? NULL : $this->input->post("materialRequestCode"); 
        $costEstimateID  = $this->input->post("costEstimateID") == "null" ? NULL : $this->input->post("costEstimateID"); 
        $costEstimateCode  = $this->input->post("costEstimateCode") == "null" ? NULL : $this->input->post("costEstimateCode"); 
        $billMaterialID  = $this->input->post("billMaterialID") == "null" ? NULL : $this->input->post("billMaterialID"); 
        $billMaterialCode  = $this->input->post("billMaterialCode") == "null" ? NULL : $this->input->post("billMaterialCode"); 
        $timelineBuilderID  = $this->input->post("timelineBuilderID") == "null" ? NULL : $this->input->post("timelineBuilderID"); 
        $projectCode  = $this->input->post("projectCode") == "null" ? NULL : $this->input->post("projectCode"); 
        $projectName  = $this->input->post("projectName") == "null" ? NULL : $this->input->post("projectName"); 
        $projectCategory  = $this->input->post("projectCategory") == "null" ? NULL : $this->input->post("projectCategory"); 
        $clientCode  = $this->input->post("clientCode") == "null" ? NULL : $this->input->post("clientCode") == "null"; 
        $clientName  = $this->input->post("clientName") == "null" ? NULL : $this->input->post("clientName"); 
        $clientAddress  = $this->input->post("clientAddress") == "null" ? NULL : $this->input->post("clientAddress"); 
        $dateNeeded  = $this->input->post("dateNeeded") == "null" ? NULL : $this->input->post("dateNeeded");  
        $createdBy  = $this->input->post("createdBy") == "null" ? NULL : $this->input->post("createdBy"); 
        $inventoryValidationReason  = $this->input->post("inventoryValidationReason") == "null" ? NULL : $this->input->post("inventoryValidationReason"); 

        // echo "<pre>";
        // print_r($_POST);
        // echo
        // exit;


        $inventoryValidationData = [
            "reviseInventoryValidationID"   => $reviseInventoryValidationID,
            "employeeID"                    => $employeeID,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "inventoryValidationStatus"     => $inventoryValidationStatus,
            "submittedAt"                   => $submittedAt,
            // "createdBy"                     => $createdBy,
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
                // if ($inventoryValidationStatus == 2) {
                //     $this->inventoryvalidation->updateRequestItemsBrandName($inventoryValidationID, $purchaseRequestID);
                // }
                // ----- END UPDATE BRAND NAME IN REQUEST ITEMS -----
            } 
            // else if ($method == "deny") {
            //     $inventoryValidationData = [
            //         "approversStatus"        => $approversStatus,
            //         "approversDate"          => $approversDate,
            //         "inventoryValidationStatus"  => 3,
            //         "inventoryValidationRemarks" => $inventoryValidationRemarks,
            //         "updatedBy"              => $updatedBy,
            //     ];
            // } else if ($method == "drop") {
            //     $inventoryValidationData = [
            //         "reviseInventoryValidationID" => $reviseInventoryValidationID,
            //         "inventoryValidationStatus"   => 5,
            //         "updatedBy"               => $updatedBy,
            //     ]; 
            // }
        }
        // ----- ADD REQUEST ITEMS -----
        if ($inventoryValidationStatus == 1 && $method == "submit") {
    
            if (!empty($items)) {
                $inventoryValidationItems =[];
                foreach($items as $index => $item) {

                    $costEstimateID  = $item["costEstimateID"]  == "null" ? NULL : $item["costEstimateID"];
                    $billMaterialID  = $item["billMaterialID"]  == "null" ? NULL : $item["billMaterialID"];  
                    $materialRequestID  = $item["materialRequestID"]  == "null" ? NULL : $item["materialRequestID"]; 
                    $inventoryValidationID  = $item["inventoryValidationID"]  == "null" ? NULL : $item["inventoryValidationID"]; 
                    $bidRecapID  = $item["bidRecapID"]  == "null" ? NULL : $item["bidRecapID"];
                    $purchaseRequestID  = $item["purchaseRequestID"]  == "null" ? NULL : $item["purchaseRequestID"];
                    $purchaseOrderID  = $item["purchaseOrderID"]  == "null" ? NULL : $item["purchaseOrderID"]; 
                    $changeRequestID  = $item["changeRequestID"]  == "null" ? NULL : $item["changeRequestID"]; 
                    $inventoryReceivingID  = $item["inventoryReceivingID"]  == "null" ? NULL : $item["inventoryReceivingID"]; 
                    $inventoryVendorID  = $item["inventoryVendorID"]  == "null" ? NULL : $item["inventoryVendorID"];  
                    $inventoryVendorCode  = $item["inventoryVendorCode"]  == "null" ? NULL : $item["inventoryVendorCode"];
                    $inventoryVendorName  = $item["inventoryVendorName"]  == "null" ? NULL : $item["inventoryVendorName"];  
                    $finalQuoteRemarks  = $item["finalQuoteRemarks"]  == "null" ? NULL : $item["finalQuoteRemarks"];
                    $milestoneBuilderID  = $item["milestoneBuilderID"]  == "null" ? NULL : $item["milestoneBuilderID"];  
                    $phaseDescription  = $item["phaseDescription"]   == "null" ? NULL : $item["phaseDescription"];
                    $milestoneListID  = $item["milestoneListID"]  == "null" ? NULL : $item["milestoneListID"];
                    $projectMilestoneID  = $item["projectMilestoneID"]  == "null" ? NULL : $item["projectMilestoneID"];
                    $projectMilestoneName  = $item["projectMilestoneName"]  == "null" ? NULL :  $item["projectMilestoneName"];
                    $itemID  = $item["itemID"]  == "null" ? NULL : $item["itemID"];
                    $itemCode  = $item["itemCode"]   == "null" ? NULL : $item["itemCode"];
                    $itemBrandName  = $item["itemBrandName"]   == "null" ? NULL : $item["itemBrandName"];
                    $itemName  = $item["itemName"]   == "null" ? NULL : $item["itemName"]; 
                    $itemClassification  = $item["itemClassification"]   == "null" ? NULL : $item["itemClassification"]; 
                    $itemCategory  = $item["itemCategory"]  == "null" ? NULL : $item["itemCategory"];
                    $itemUom  = $item["itemUom"]  == "null" ? NULL : $item["itemUom"];
                    $itemDescription  = $item["itemDescription"]  == "null" ? NULL : $item["itemDescription"];
                    $files  = $item["files"]   == "null" ? NULL : $item["files"];
                    $remarks  = $item["remarks"]   == "null" ? NULL : $item["remarks"];
                    $availableStocks  = $item["availableStocks"]   == "null" ? NULL : $item["availableStocks"];
                    $requestQuantity  = $item["requestQuantity"]   == "null" ? NULL : $item["requestQuantity"]; 
                    $reservedItem  = $item["reservedItem"]   == "null" ? NULL : $item["reservedItem"];
                    $forPurchase  = $item["forPurchase"]   == "null" ? NULL : $item["forPurchase"];
                    $availableStocks  = $item["availableStocks"]   == "null" ? NULL : $item["availableStocks"]; 
                    $unitCost  = $item["unitCost"]   == "null" ? NULL : $item["unitCost"];
                    $totalCost  = $item["totalCost"]   == "null" ? NULL : $item["totalCost"];
                    $itemRemarks  = $item["itemRemarks"]   == "null" ? NULL : $item["itemRemarks"];

                  

                    $temp = [
                        'costEstimateID'  => $costEstimateID,
                        'billMaterialID'  => $billMaterialID,  
                        'materialRequestID'  => $materialRequestID, 
                        'inventoryValidationID'  => $inventoryValidationID, 
                        'bidRecapID'  => $bidRecapID,
                        'purchaseRequestID'  => $purchaseRequestID,
                        'purchaseOrderID'  => $purchaseOrderID, 
                        'changeRequestID'  => $changeRequestID, 
                        'inventoryReceivingID'  => $inventoryReceivingID, 
                        'inventoryVendorID'  => $inventoryVendorID,  
                        'inventoryVendorCode'  => $inventoryVendorCode,  
                        'inventoryVendorName'  => $inventoryVendorName,  
                        'finalQuoteRemarks'  => $finalQuoteRemarks,  
                        'milestoneBuilderID'  => $milestoneBuilderID,  
                        'phaseDescription'  => $phaseDescription, 
                        'milestoneListID'  => $milestoneListID,
                        'projectMilestoneID'  => $projectMilestoneID,
                        'projectMilestoneName'  => $projectMilestoneName,
                        'itemID'  => $itemID,
                        'itemCode'  => $itemCode,
                        'itemBrandName'  => $itemBrandName,
                        'itemName'  => $itemName, 
                        'itemClassification'  => $itemClassification, 
                        'itemCategory'  => $itemCategory, 
                        'itemUom'  => $itemUom, 
                        'itemDescription'  => $itemDescription, 
                        'files'  => $files,
                        'remarks'  => $remarks, 
                        'availableStocks'  => $availableStocks,
                        'requestQuantity'  => $requestQuantity, 
                        'reservedItem'  => $reservedItem,
                        'forPurchase'  => $forPurchase,
                        'availableStocks'  => $availableStocks, 
                        'unitCost'  => $unitCost,
                        'itemRemarks'  => $itemRemarks,
                        'totalCost'  => $totalCost, 
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationItems, $temp);
                }
               
                
                $saveInventoryValidationItems = $this->inventoryvalidation->saveInventoryValidationItems($inventoryValidationItems,$materialRequestID,$method);
            }

            if (!empty($assets)) {
                $inventoryValidationAssets =[];
                foreach($assets as $index => $asset) {

                    $costEstimateID  = $asset["costEstimateID"]  == "null" ? NULL : $asset["costEstimateID"];
                    $billMaterialID  = $asset["billMaterialID"]  == "null" ? NULL : $asset["billMaterialID"];  
                    $materialRequestID  = $asset["materialRequestID"]  == "null" ? NULL : $asset["materialRequestID"]; 
                    $inventoryValidationID  = $asset["inventoryValidationID"]  == "null" ? NULL : $asset["inventoryValidationID"]; 
                    $bidRecapID  = $asset["bidRecapID"]  == "null" ? NULL : $asset["bidRecapID"];
                    $purchaseRequestID  = $asset["purchaseRequestID"]  == "null" ? NULL : $asset["purchaseRequestID"];
                    $purchaseOrderID  = $asset["purchaseOrderID"]  == "null" ? NULL : $asset["purchaseOrderID"]; 
                    $changeRequestID  = $asset["changeRequestID"]  == "null" ? NULL : $asset["changeRequestID"]; 
                    $inventoryReceivingID  = $asset["inventoryReceivingID"]  == "null" ? NULL : $asset["inventoryReceivingID"]; 
                    $inventoryVendorID  = $asset["inventoryVendorID"]  == "null" ? NULL : $asset["inventoryVendorID"];  
                    $inventoryVendorCode  = $asset["inventoryVendorCode"]  == "null" ? NULL : $asset["inventoryVendorCode"];
                    $inventoryVendorName  = $asset["inventoryVendorName"]  == "null" ? NULL : $asset["inventoryVendorName"];  
                    $finalQuoteRemarks  = $asset["finalQuoteRemarks"]  == "null" ? NULL : $asset["finalQuoteRemarks"];
                    $milestoneBuilderID  = $asset["milestoneBuilderID"]  == "null" ? NULL : $asset["milestoneBuilderID"];  
                    $phaseDescription  = $asset["phaseDescription"]   == "null" ? NULL : $asset["phaseDescription"];
                    $milestoneListID  = $asset["milestoneListID"]  == "null" ? NULL : $asset["milestoneListID"];
                    $projectMilestoneID  = $asset["projectMilestoneID"]  == "null" ? NULL : $asset["projectMilestoneID"];
                    $projectMilestoneName  = $asset["projectMilestoneName"]  == "null" ? NULL : $asset["projectMilestoneName"];
                    $assetID  = $asset["assetID"]  == "null" ? NULL : $asset["assetID"];
                    $assetCode  = $asset["assetCode"]   == "null" ? NULL : $asset["assetCode"];
                    $assetBrandName  = $asset["assetBrandName"]   == "null" ? NULL : $asset["assetBrandName"];
                    $assetName  = $asset["assetName"]   == "null" ? NULL : $asset["assetName"]; 
                    $assetClassification  = $asset["assetClassification"]   == "null" ? NULL : $asset["assetClassification"]; 
                    $assetCategory  = $asset["assetCategory"]  == "null" ? NULL : $asset["assetCategory"];
                    $assetUom  = $asset["assetUom"]  == "null" ? NULL : $asset["assetUom"];
                    $assetDescription  = $asset["assetDescription"]  == "null" ? NULL : $asset["assetDescription"];
                    $files  = $asset["files"]   == "null" ? NULL : $asset["files"];
                    $remarks  = $asset["remarks"]   == "null" ? NULL : $asset["remarks"];
                    $availableStocks  = $asset["availableStocks"]   == "null" ? NULL : $asset["availableStocks"];
                    $requestQuantity  = $asset["requestQuantity"]   == "null" ? NULL : $asset["requestQuantity"]; 
                    $reservedAsset  = $asset["reservedAsset"]   == "null" ? NULL : $asset["reservedAsset"];
					$requestManHours = $asset["requestManHours"]  == "null" ? NULL : $asset["requestManHours"];
					$dateNeeded = $asset["dateNeeded"]  == "null" ? NULL : $asset["dateNeeded"];
					$dateReturn = $asset["dateReturn"]  == "null" ? NULL : $asset["dateReturn"];
					$actualDateReturn = $asset["actualDateReturn"]  == "null" ? NULL : $asset["actualDateReturn"];
                    $forPurchase  = $asset["forPurchase"]   == "null" ? NULL : $asset["forPurchase"];
                    $availableStocks  = $asset["availableStocks"]   == "null" ? NULL : $asset["availableStocks"]; 
                    $totalCost  = $asset["totalCost"]   == "null" ? NULL : $asset["totalCost"];
                    $assetRemarks  = $asset["assetRemarks"]   == "null" ? NULL : $asset["assetRemarks"];

                  

                    $temp = [
                        'costEstimateID'  => $costEstimateID,
                        'billMaterialID'  => $billMaterialID,  
                        'materialRequestID'  => $materialRequestID, 
                        'inventoryValidationID'  => $inventoryValidationID, 
                        'bidRecapID'  => $bidRecapID,
                        'purchaseRequestID'  => $purchaseRequestID,
                        'purchaseOrderID'  => $purchaseOrderID, 
                        'changeRequestID'  => $changeRequestID, 
                        'inventoryReceivingID'  => $inventoryReceivingID, 
                        'inventoryVendorID'  => $inventoryVendorID,  
                        'inventoryVendorCode'  => $inventoryVendorCode,  
                        'inventoryVendorName'  => $inventoryVendorName,  
                        'finalQuoteRemarks'  => $finalQuoteRemarks,  
                        'milestoneBuilderID'  => $milestoneBuilderID,  
                        'phaseDescription'  => $phaseDescription, 
                        'milestoneListID'  => $milestoneListID,
                        'projectMilestoneID'  => $projectMilestoneID,
                        'projectMilestoneName'  => $projectMilestoneName,
                        'assetID'  => $assetID,
                        'assetCode'  => $assetCode,
                        'assetBrandName'  => $assetBrandName,
                        'assetName'  => $assetName, 
                        'assetClassification'  => $assetClassification, 
                        'assetCategory'  => $assetCategory, 
                        'assetUom'  => $assetUom, 
                        'assetDescription'  => $assetDescription, 
                        'files'  => $files,
                        'remarks'  => $remarks, 
                        'availableStocks'  => $availableStocks,
                        'requestQuantity'  => $requestQuantity, 
                        'reservedAsset'  => $reservedAsset,
                        'requestManHours' => $requestManHours,
                        'dateNeeded' => $dateNeeded,
                        'dateReturn' => $dateReturn,
                        'actualDateReturn' => $actualDateReturn,
                        'forPurchase'  => $forPurchase,
                        'availableStocks'  => $availableStocks, 
                        'totalCost'  => $totalCost, 
                        'assetRemarks'  => $assetRemarks, 
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationAssets, $temp);
                }
               
                
                $saveInventoryValidationAssets = $this->inventoryvalidation->saveInventoryValidationAssets($inventoryValidationAssets,$materialRequestID,$method);
    
            }
        }
        if ($inventoryValidationStatus == 2) {
    
            if (!empty($items)) {
                $inventoryValidationItems =[];
                foreach($items as $index => $item) {

                    $costEstimateID  = $item["costEstimateID"]  == "null" ? NULL : $item["costEstimateID"];
                    $billMaterialID  = $item["billMaterialID"]  == "null" ? NULL : $item["billMaterialID"];  
                    $materialRequestID  = $item["materialRequestID"]  == "null" ? NULL : $item["materialRequestID"]; 
                    $inventoryValidationID  = $item["inventoryValidationID"]  == "null" ? NULL : $item["inventoryValidationID"]; 
                    $bidRecapID  = $item["bidRecapID"]  == "null" ? NULL : $item["bidRecapID"];
                    $purchaseRequestID  = $item["purchaseRequestID"]  == "null" ? NULL : $item["purchaseRequestID"];
                    $purchaseOrderID  = $item["purchaseOrderID"]  == "null" ? NULL : $item["purchaseOrderID"]; 
                    $changeRequestID  = $item["changeRequestID"]  == "null" ? NULL : $item["changeRequestID"]; 
                    $inventoryReceivingID  = $item["inventoryReceivingID"]  == "null" ? NULL : $item["inventoryReceivingID"]; 
                    $inventoryVendorID  = $item["inventoryVendorID"]  == "null" ? NULL : $item["inventoryVendorID"];  
                    $inventoryVendorCode  = $item["inventoryVendorCode"]  == "null" ? NULL : $item["inventoryVendorCode"];
                    $inventoryVendorName  = $item["inventoryVendorName"]  == "null" ? NULL : $item["inventoryVendorName"];  
                    $finalQuoteRemarks  = $item["finalQuoteRemarks"]  == "null" ? NULL : $item["finalQuoteRemarks"];
                    $milestoneBuilderID  = $item["milestoneBuilderID"]  == "null" ? NULL : $item["milestoneBuilderID"];  
                    $phaseDescription  = $item["phaseDescription"]   == "null" ? NULL : $item["phaseDescription"];
                    $milestoneListID  = $item["milestoneListID"]  == "null" ? NULL : $item["milestoneListID"];
                    $projectMilestoneID  = $item["projectMilestoneID"]  == "null" ? NULL : $item["projectMilestoneID"];
                    $projectMilestoneName  = $item["projectMilestoneName"]  == "null" ? NULL :  $item["projectMilestoneName"];
                    $itemID  = $item["itemID"]  == "null" ? NULL : $item["itemID"];
                    $itemCode  = $item["itemCode"]   == "null" ? NULL : $item["itemCode"];
                    $itemBrandName  = $item["itemBrandName"]   == "null" ? NULL : $item["itemBrandName"];
                    $itemName  = $item["itemName"]   == "null" ? NULL : $item["itemName"]; 
                    $itemClassification  = $item["itemClassification"]   == "null" ? NULL : $item["itemClassification"]; 
                    $itemCategory  = $item["itemCategory"]  == "null" ? NULL : $item["itemCategory"];
                    $itemUom  = $item["itemUom"]  == "null" ? NULL : $item["itemUom"];
                    $itemDescription  = $item["itemDescription"]  == "null" ? NULL : $item["itemDescription"];
                    $files  = $item["files"]   == "null" ? NULL : $item["files"];
                    $remarks  = $item["remarks"]   == "null" ? NULL : $item["remarks"];
                    $availableStocks  = $item["availableStocks"]   == "null" ? NULL : $item["availableStocks"];
                    $requestQuantity  = $item["requestQuantity"]   == "null" ? NULL : $item["requestQuantity"]; 
                    $reservedItem  = $item["reservedItem"]   == "null" ? NULL : $item["reservedItem"];
                    $forPurchase  = $item["forPurchase"]   == "null" ? NULL : $item["forPurchase"];
                    $availableStocks  = $item["availableStocks"]   == "null" ? NULL : $item["availableStocks"]; 
                    $unitCost  = $item["unitCost"]   == "null" ? NULL : $item["unitCost"];
                    $totalCost  = $item["totalCost"]   == "null" ? NULL : $item["totalCost"];
                    $itemRemarks  = $item["itemRemarks"]   == "null" ? NULL : $item["itemRemarks"];

                  

                    $temp = [
                        'costEstimateID'  => $costEstimateID,
                        'billMaterialID'  => $billMaterialID,  
                        'materialRequestID'  => $materialRequestID, 
                        'inventoryValidationID'  => $inventoryValidationID, 
                        'bidRecapID'  => $bidRecapID,
                        'purchaseRequestID'  => $purchaseRequestID,
                        'purchaseOrderID'  => $purchaseOrderID, 
                        'changeRequestID'  => $changeRequestID, 
                        'inventoryReceivingID'  => $inventoryReceivingID, 
                        'inventoryVendorID'  => $inventoryVendorID,  
                        'inventoryVendorCode'  => $inventoryVendorCode,  
                        'inventoryVendorName'  => $inventoryVendorName,  
                        'finalQuoteRemarks'  => $finalQuoteRemarks,  
                        'milestoneBuilderID'  => $milestoneBuilderID,  
                        'phaseDescription'  => $phaseDescription, 
                        'milestoneListID'  => $milestoneListID,
                        'projectMilestoneID'  => $projectMilestoneID,
                        'projectMilestoneName'  => $projectMilestoneName,
                        'itemID'  => $itemID,
                        'itemCode'  => $itemCode,
                        'itemBrandName'  => $itemBrandName,
                        'itemName'  => $itemName, 
                        'itemClassification'  => $itemClassification, 
                        'itemCategory'  => $itemCategory, 
                        'itemUom'  => $itemUom, 
                        'itemDescription'  => $itemDescription, 
                        'files'  => $files,
                        'remarks'  => $remarks, 
                        'availableStocks'  => $availableStocks,
                        'requestQuantity'  => $requestQuantity, 
                        'reservedItem'  => $reservedItem,
                        'forPurchase'  => $forPurchase,
                        'availableStocks'  => $availableStocks, 
                        'unitCost'  => $unitCost,
                        'itemRemarks'  => $itemRemarks,
                        'totalCost'  => $totalCost, 
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationItems, $temp);
                }
               
                
                $saveInventoryValidationItems = $this->inventoryvalidation->saveInventoryValidationItems($inventoryValidationItems,$materialRequestID,$method);
            }

            if (!empty($assets)) {
                $inventoryValidationAssets =[];
                foreach($assets as $index => $asset) {

                    $costEstimateID  = $asset["costEstimateID"]  == "null" ? NULL : $asset["costEstimateID"];
                    $billMaterialID  = $asset["billMaterialID"]  == "null" ? NULL : $asset["billMaterialID"];  
                    $materialRequestID  = $asset["materialRequestID"]  == "null" ? NULL : $asset["materialRequestID"]; 
                    $inventoryValidationID  = $asset["inventoryValidationID"]  == "null" ? NULL : $asset["inventoryValidationID"]; 
                    $bidRecapID  = $asset["bidRecapID"]  == "null" ? NULL : $asset["bidRecapID"];
                    $purchaseRequestID  = $asset["purchaseRequestID"]  == "null" ? NULL : $asset["purchaseRequestID"];
                    $purchaseOrderID  = $asset["purchaseOrderID"]  == "null" ? NULL : $asset["purchaseOrderID"]; 
                    $changeRequestID  = $asset["changeRequestID"]  == "null" ? NULL : $asset["changeRequestID"]; 
                    $inventoryReceivingID  = $asset["inventoryReceivingID"]  == "null" ? NULL : $asset["inventoryReceivingID"]; 
                    $inventoryVendorID  = $asset["inventoryVendorID"]  == "null" ? NULL : $asset["inventoryVendorID"];  
                    $inventoryVendorCode  = $asset["inventoryVendorCode"]  == "null" ? NULL : $asset["inventoryVendorCode"];
                    $inventoryVendorName  = $asset["inventoryVendorName"]  == "null" ? NULL : $asset["inventoryVendorName"];  
                    $finalQuoteRemarks  = $asset["finalQuoteRemarks"]  == "null" ? NULL : $asset["finalQuoteRemarks"];
                    $milestoneBuilderID  = $asset["milestoneBuilderID"]  == "null" ? NULL : $asset["milestoneBuilderID"];  
                    $phaseDescription  = $asset["phaseDescription"]   == "null" ? NULL : $asset["phaseDescription"];
                    $milestoneListID  = $asset["milestoneListID"]  == "null" ? NULL : $asset["milestoneListID"];
                    $projectMilestoneID  = $asset["projectMilestoneID"]  == "null" ? NULL : $asset["projectMilestoneID"];
                    $projectMilestoneName  = $asset["projectMilestoneName"]  == "null" ? NULL : $asset["projectMilestoneName"];
                    $assetID  = $asset["assetID"]  == "null" ? NULL : $asset["assetID"];
                    $assetCode  = $asset["assetCode"]   == "null" ? NULL : $asset["assetCode"];
                    $assetBrandName  = $asset["assetBrandName"]   == "null" ? NULL : $asset["assetBrandName"];
                    $assetName  = $asset["assetName"]   == "null" ? NULL : $asset["assetName"]; 
                    $assetClassification  = $asset["assetClassification"]   == "null" ? NULL : $asset["assetClassification"]; 
                    $assetCategory  = $asset["assetCategory"]  == "null" ? NULL : $asset["assetCategory"];
                    $assetUom  = $asset["assetUom"]  == "null" ? NULL : $asset["assetUom"];
                    $assetDescription  = $asset["assetDescription"]  == "null" ? NULL : $asset["assetDescription"];
                    $files  = $asset["files"]   == "null" ? NULL : $asset["files"];
                    $remarks  = $asset["remarks"]   == "null" ? NULL : $asset["remarks"];
                    $availableStocks  = $asset["availableStocks"]   == "null" ? NULL : $asset["availableStocks"];
                    $requestQuantity  = $asset["requestQuantity"]   == "null" ? NULL : $asset["requestQuantity"]; 
                    $reservedAsset  = $asset["reservedAsset"]   == "null" ? NULL : $asset["reservedAsset"];
					$requestManHours = $asset["requestManHours"]  == "null" ? NULL : $asset["requestManHours"];
					$dateNeeded = $asset["dateNeeded"]  == "null" ? NULL : $asset["dateNeeded"];
					$dateReturn = $asset["dateReturn"]  == "null" ? NULL : $asset["dateReturn"];
					$actualDateReturn = $asset["actualDateReturn"]  == "null" ? NULL : $asset["actualDateReturn"];
                    $forPurchase  = $asset["forPurchase"]   == "null" ? NULL : $asset["forPurchase"];
                    $availableStocks  = $asset["availableStocks"]   == "null" ? NULL : $asset["availableStocks"]; 
                    $totalCost  = $asset["totalCost"]   == "null" ? NULL : $asset["totalCost"];
                    $assetRemarks  = $asset["assetRemarks"]   == "null" ? NULL : $asset["assetRemarks"];

                  

                    $temp = [
                        'costEstimateID'  => $costEstimateID,
                        'billMaterialID'  => $billMaterialID,  
                        'materialRequestID'  => $materialRequestID, 
                        'inventoryValidationID'  => $inventoryValidationID, 
                        'bidRecapID'  => $bidRecapID,
                        'purchaseRequestID'  => $purchaseRequestID,
                        'purchaseOrderID'  => $purchaseOrderID, 
                        'changeRequestID'  => $changeRequestID, 
                        'inventoryReceivingID'  => $inventoryReceivingID, 
                        'inventoryVendorID'  => $inventoryVendorID,  
                        'inventoryVendorCode'  => $inventoryVendorCode,  
                        'inventoryVendorName'  => $inventoryVendorName,  
                        'finalQuoteRemarks'  => $finalQuoteRemarks,  
                        'milestoneBuilderID'  => $milestoneBuilderID,  
                        'phaseDescription'  => $phaseDescription, 
                        'milestoneListID'  => $milestoneListID,
                        'projectMilestoneID'  => $projectMilestoneID,
                        'projectMilestoneName'  => $projectMilestoneName,
                        'assetID'  => $assetID,
                        'assetCode'  => $assetCode,
                        'assetBrandName'  => $assetBrandName,
                        'assetName'  => $assetName, 
                        'assetClassification'  => $assetClassification, 
                        'assetCategory'  => $assetCategory, 
                        'assetUom'  => $assetUom, 
                        'assetDescription'  => $assetDescription, 
                        'files'  => $files,
                        'remarks'  => $remarks, 
                        'availableStocks'  => $availableStocks,
                        'requestQuantity'  => $requestQuantity, 
                        'reservedAsset'  => $reservedAsset,
                        'requestManHours' => $requestManHours,
                        'dateNeeded' => $dateNeeded,
                        'dateReturn' => $dateReturn,
                        'actualDateReturn' => $actualDateReturn,
                        'forPurchase'  => $forPurchase,
                        'availableStocks'  => $availableStocks, 
                        'totalCost'  => $totalCost, 
                        'assetRemarks'  => $assetRemarks, 
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationAssets, $temp);
                }
               
                
                $saveInventoryValidationAssets = $this->inventoryvalidation->saveInventoryValidationAssets($inventoryValidationAssets,$materialRequestID,$method);
    
            }

            if(!empty($items) || !empty($assets)){

                $dataMaterialWithdrawalDocument =array(
                    'materialWithdrawalCode' => $materialWithdrawalCode,
                    'inventoryValidationID' => $inventoryValidationID,
                    'inventoryValidationCode' => $inventoryValidationCode,
                    'materialRequestID' => $materialRequestID,
                    'materialRequestCode' => $materialRequestCode,
                    'costEstimateID' => $costEstimateID,
                    'costEstimateCode' => $costEstimateCode,
                    'billMaterialID' => $billMaterialID,
                    'billMaterialCode' => $billMaterialCode,
                    'employeeID' => 0,
                    'timelineBuilderID' => $timelineBuilderID,
                    'projectCode' => $projectCode,
                    'projectName' => $projectName,
                    'projectCategory' => $projectCategory,
                    'clientCode' => $clientCode,
                    'clientName' => $clientName,
                    'clientAddress' => $clientAddress,
                    'dateNeeded' => $dateNeeded,
                    'inventoryItemStatus' => 0,
                    'inventoryAssetStatus' => 0,
                    'materialWithdrawalStatus' => 0,
                    'materialWithdrawalReason	' => $inventoryValidationReason,
                    'createdBy' => $createdBy, 
                );
               
                $saveMaterialWithdrawalDocument = $this->inventoryvalidation->saveMaterialWithdrawalDocument($dataMaterialWithdrawalDocument);
               
                if($saveMaterialWithdrawalDocument){
                    $result = explode("|", $saveMaterialWithdrawalDocument);

                    if ($result[0] == "true") {
        
                        $materialWithdrawalID  = $result[2];

                        if(!empty($items)){
                            $dataStockOutDocument =array(
                                'stockOutCode' => $stockOutCode,
                                'materialWithdrawalID' => $materialWithdrawalID,
                                'materialWithdrawalCode' => $materialWithdrawalCode,
                                'inventoryValidationID' => $inventoryValidationID,
                                'inventoryValidationCode' => $inventoryValidationCode,
                                'materialRequestID' => $materialRequestID,
                                'materialRequestCode' => $materialRequestCode,
                                'costEstimateID' => $costEstimateID,
                                'costEstimateCode' => $costEstimateCode,
                                'billMaterialID' => $billMaterialID,
                                'billMaterialCode' => $billMaterialCode,
                                'employeeID' => 0,
                                'timelineBuilderID' => $timelineBuilderID,
                                'projectCode' => $projectCode,
                                'projectName' => $projectName,
                                'projectCategory' => $projectCategory,
                                'clientCode' => $clientCode,
                                'clientName' => $clientName,
                                'clientAddress' => $clientAddress,
                                'dateNeeded' => $dateNeeded,
                                'inventoryItemStatus' => 0,
                                'stockOutStatus' =>0,
                                'createdBy' => $createdBy, 
                            );
    
                            $saveStockOutDocument = $this->inventoryvalidation->saveStockOutDocument($dataStockOutDocument);
                        }

                        if(!empty($assets)){
                            $dataEquipmentBorrowingDocument =array(
                                'equipmentBorrowingCode' => $equipmentBorrowingCode,
                                'materialWithdrawalID' => $materialWithdrawalID,
                                'materialWithdrawalCode' => $materialWithdrawalCode,
                                'inventoryValidationID' => $inventoryValidationID,
                                'inventoryValidationCode' => $inventoryValidationCode,
                                'materialRequestID' => $materialRequestID,
                                'materialRequestCode' => $materialRequestCode,
                                'costEstimateID' => $costEstimateID,
                                'costEstimateCode' => $costEstimateCode,
                                'billMaterialID' => $billMaterialID,
                                'billMaterialCode' => $billMaterialCode,
                                'employeeID' => 0,
                                'timelineBuilderID' => $timelineBuilderID,
                                'projectCode' => $projectCode,
                                'projectName' => $projectName,
                                'projectCategory' => $projectCategory,
                                'clientCode' => $clientCode,
                                'clientName' => $clientName,
                                'clientAddress' => $clientAddress,
                                'dateNeeded' => $dateNeeded,
                                'inventoryAssetStatus' => 0,
                                'equipmentBorrowingStatus' =>0,
                                'createdBy' => $createdBy, 
                            );
    
                            $saveEquipmentBorrowingDocument = $this->inventoryvalidation->saveEquipmentBorrowingDocument($dataEquipmentBorrowingDocument);
                        }
                    }
                }
            }
        }
        // echo "<pre>";
        // print_r($dataMaterialWithdrawalDocument);
        // exit;
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
        $inventoryValidationID  = $this->input->post("inventoryValidationID");
        $purchaseRequestID      = $this->input->post("purchaseRequestID");
        echo json_encode($this->inventoryvalidation->getPurchaseRequest($inventoryValidationID, $purchaseRequestID));
    }



    
}
?>     