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

        // echo "<pre>";
        // print_r($_POST);
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
                    $inventoryVendorCode  = $item["inventoryVendorCode"] ?? NULL;
                    $inventoryVendorName  = $item["inventoryVendorName"] ?? NULL;  
                    $finalQuoteRemarks  = $item["finalQuoteRemarks"] ?? NULL;
                    $milestoneBuilderID  = $item["milestoneBuilderID"]  == "null" ? NULL : $item["milestoneBuilderID"];  
                    $phaseDescription  = $item["phaseDescription"]  ?? NULL;
                    $milestoneListID  = $item["milestoneListID"]  == "null" ? NULL : $item["milestoneListID"];
                    $projectMilestoneID  = $item["projectMilestoneID"]  == "null" ? NULL : $item["projectMilestoneID"];
                    $projectMilestoneName  = $item["projectMilestoneName"] ?? NULL;
                    $itemID  = $item["itemID"]  == "null" ? NULL : $item["itemID"];
                    $itemCode  = $item["itemCode"]  ?? NULL;
                    $itemBrandName  = $item["itemBrandName"]  ?? NULL;
                    $itemName  = $item["itemName"]  ?? NULL; 
                    $itemClassification  = $item["itemClassification"]  ?? NULL; 
                    $itemCategory  = $item["itemCategory"] ?? NULL;
                    $itemUom  = $item["itemUom"] ?? NULL;
                    $itemDescription  = $item["itemDescription"] ?? NULL;
                    $files  = $item["files"]  ?? NULL;
                    $remarks  = $item["remarks"]  ?? NULL;
                    $availableStocks  = $item["availableStocks"]  ?? NULL;
                    $requestQuantity  = $item["requestQuantity"]  ?? NULL; 
                    $reservedItem  = $item["reservedItem"]  ?? NULL;
                    $forPurchase  = $item["forPurchase"]  ?? NULL;
                    $availableStocks  = $item["availableStocks"]  ?? NULL; 
                    $unitCost  = $item["unitCost"]  ?? NULL;
                    $totalCost  = $item["totalCost"]  ?? NULL;

                  

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
                        'totalCost'  => $totalCost, 
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationItems, $temp);
                }
               
                
                $saveInventoryValidationItems = $this->inventoryvalidation->saveInventoryValidationItems($inventoryValidationItems,$materialRequestID);
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
                    $inventoryVendorCode  = $asset["inventoryVendorCode"] ?? NULL;
                    $inventoryVendorName  = $asset["inventoryVendorName"] ?? NULL;  
                    $finalQuoteRemarks  = $asset["finalQuoteRemarks"] ?? NULL;
                    $milestoneBuilderID  = $asset["milestoneBuilderID"]  == "null" ? NULL : $asset["milestoneBuilderID"];  
                    $phaseDescription  = $asset["phaseDescription"]  ?? NULL;
                    $milestoneListID  = $asset["milestoneListID"]  == "null" ? NULL : $asset["milestoneListID"];
                    $projectMilestoneID  = $asset["projectMilestoneID"]  == "null" ? NULL : $asset["projectMilestoneID"];
                    $projectMilestoneName  = $asset["projectMilestoneName"] ?? NULL;
                    $assetID  = $asset["assetID"]  == "null" ? NULL : $asset["assetID"];
                    $assetCode  = $asset["assetCode"]  ?? NULL;
                    $assetBrandName  = $asset["assetBrandName"]  ?? NULL;
                    $assetName  = $asset["assetName"]  ?? NULL; 
                    $assetClassification  = $asset["assetClassification"]  ?? NULL; 
                    $assetCategory  = $asset["assetCategory"] ?? NULL;
                    $assetUom  = $asset["assetUom"] ?? NULL;
                    $assetDescription  = $asset["assetDescription"] ?? NULL;
                    $files  = $asset["files"]  ?? NULL;
                    $remarks  = $asset["remarks"]  ?? NULL;
                    $availableStocks  = $asset["availableStocks"]  ?? NULL;
                    $requestQuantity  = $asset["requestQuantity"]  ?? NULL; 
                    $reservedAsset  = $asset["reservedAsset"]  ?? NULL;
					$requestManHours = $asset["requestManHours"] ?? NULL;
					$dateNeeded = $asset["dateNeeded"] ?? NULL;
					$dateReturn = $asset["dateReturn"] ?? NULL;
					$actualDateReturn = $asset["actualDateReturn"] ?? NULL;
                    $forPurchase  = $asset["forPurchase"]  ?? NULL;
                    $availableStocks  = $asset["availableStocks"]  ?? NULL; 
                    $totalCost  = $asset["totalCost"]  ?? NULL;

                  

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
                        'updatedBy' => $updatedBy, 
                       
                    ];

                

                   
                    array_push($inventoryValidationAssets, $temp);
                }
               
                
                $saveInventoryValidationAssets = $this->inventoryvalidation->saveInventoryValidationAssets($inventoryValidationAssets,$materialRequestID);
    

         

                $materialWithdrawalCode  = $this->input->post("materialWithdrawalCode") ?? null; 
                $stockOutCode  = $this->input->post("stockOutCode") ?? null; 
                $equipmentBorrowingCode  = $this->input->post("equipmentBorrowingCode") ?? null; 
                $inventoryValidationID  = $this->input->post("inventoryValidationID") ?? null; 
                $inventoryValidationCode  = $this->input->post("inventoryValidationCode") ?? null; 
                $materialRequestID  = $this->input->post("materialRequestID") ?? null; 
                $materialRequestCode  = $this->input->post("materialRequestCode") ?? null; 
                $costEstimateID  = $this->input->post("costEstimateID") ?? null; 
                $costEstimateCode  = $this->input->post("costEstimateCode") ?? null; 
                $billMaterialID  = $this->input->post("billMaterialID") ?? null; 
                $billMaterialCode  = $this->input->post("billMaterialCode") ?? null; 
                $timelineBuilderID  = $this->input->post("timelineBuilderID") ?? null; 
                $projectCode  = $this->input->post("projectCode") ?? null; 
                $projectName  = $this->input->post("projectName") ?? null; 
                $projectCategory  = $this->input->post("projectCategory") ?? null; 
                $clientCode  = $this->input->post("clientCode") ?? null; 
                $clientName  = $this->input->post("clientName") ?? null; 
                $clientAddress  = $this->input->post("clientAddress") ?? null; 
                $dateNeeded  = $this->input->post("dateNeeded") ?? null;  
                $createdBy  = $this->input->post("createdBy") ?? null; 

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
                    'employeeID' => $employeeID,
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
                    'createdBy' => $createdBy, 
                );
               
                $saveMaterialWithdrawalDocument = $this->inventoryvalidation->saveMaterialWithdrawalDocument($dataMaterialWithdrawalDocument);

                if($saveMaterialWithdrawalDocument){
                    $result = explode("|", $saveMaterialWithdrawalDocument);

                    if ($result[0] == "true") {
        
                        $materialWithdrawalID  = $result[2];

                        $dataStockOutDocument =array(
                            'stockOutCode' => $stockOutCode,
                            'materialWithdrawalID' => $materialWithdrawalID,
                            'materialWithdrawalCode' => $stockOutCode,
                            'inventoryValidationID' => $inventoryValidationID,
                            'inventoryValidationCode' => $inventoryValidationCode,
                            'materialRequestID' => $materialRequestID,
                            'materialRequestCode' => $materialRequestCode,
                            'costEstimateID' => $costEstimateID,
                            'costEstimateCode' => $costEstimateCode,
                            'billMaterialID' => $billMaterialID,
                            'billMaterialCode' => $billMaterialCode,
                            'employeeID' => $employeeID,
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

                        $dataEquipmentBorrowingDocument =array(
                            'equipmentBorrowingCode' => $equipmentBorrowingCode,
                            'materialWithdrawalID' => $materialWithdrawalID,
                            'materialWithdrawalCode' => $stockOutCode,
                            'inventoryValidationID' => $inventoryValidationID,
                            'inventoryValidationCode' => $inventoryValidationCode,
                            'materialRequestID' => $materialRequestID,
                            'materialRequestCode' => $materialRequestCode,
                            'costEstimateID' => $costEstimateID,
                            'costEstimateCode' => $costEstimateCode,
                            'billMaterialID' => $billMaterialID,
                            'billMaterialCode' => $billMaterialCode,
                            'employeeID' => $employeeID,
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