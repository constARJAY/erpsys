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
        $action                    = $this->input->post("action");
        $method                    = $this->input->post("method");
        $purchaseRequestID         = $this->input->post("purchaseRequestID") ?? null;
        $purchaseRequestCode       = $this->input->post("purchaseRequestCode") ?? null;
        $revisePurchaseRequestID   = $this->input->post("revisePurchaseRequestID") ?? null;
        $revisePurchaseRequestCode = $this->input->post("revisePurchaseRequestCode") ?? null;
        $employeeID                = $this->input->post("employeeID");
        $inventoryVendorID         = $this->input->post("inventoryVendorID") ?? null;
        $vendorCode                = $this->input->post("vendorCode") ?? null;
        $vendorName                = $this->input->post("vendorName") ?? null;
        $vendorContactPerson       = $this->input->post("vendorContactPerson") ?? null;
        $vendorContactDetails      = $this->input->post("vendorContactDetails") ?? null;
        $vendorAddress             = $this->input->post("vendorAddress") ?? null;
        $paymentTerms              = $this->input->post("paymentTerms") ?? null;
        $shippingTerm              = $this->input->post("shippingTerm") ?? null;
        $shippingDate              = $this->input->post("shippingDate") ?? null;
        $purchaseRequestReason     = $this->input->post("purchaseRequestReason") ?? null;
        $purchaseRequestClassification = $this->input->post("purchaseRequestClassification") ?? null;
        $purchaseRequestStatus     = $this->input->post("purchaseRequestStatus");
        $purchaseRequestRemarks    = $this->input->post("purchaseRequestRemarks") ?? null;
        $approversID               = $this->input->post("approversID") ?? null;
        $approversStatus           = $this->input->post("approversStatus") ?? null;
        $approversDate             = $this->input->post("approversDate") ?? null;
        $total                     = $this->input->post("total") ?? null;
        $discountType              = $this->input->post("discountType") ?? null;
        $discount                  = $this->input->post("discount") ?? null;
        $totalAmount               = $this->input->post("totalAmount") ?? null;
        $vatSales                  = $this->input->post("vatSales") ?? null;
        $vat                       = $this->input->post("vat") ?? null;
        $totalVat                  = $this->input->post("totalVat") ?? null;
        $lessEwt                   = $this->input->post("lessEwt") ?? null;
        $grandTotalAmount          = $this->input->post("grandTotalAmount") ?? null;
        $submittedAt               = $this->input->post("submittedAt") ?? null;
        $createdBy                 = $this->input->post("createdBy");
        $updatedBy                 = $this->input->post("updatedBy");
        $createdAt                 = $this->input->post("createdAt");
        $items                     = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            "revisePurchaseRequestID"       => $revisePurchaseRequestID,
            "revisePurchaseRequestCode"     => $revisePurchaseRequestCode,
            "employeeID"                    => $employeeID,
            "inventoryVendorID"             => $inventoryVendorID,
            "vendorCode"                    => $vendorCode,
            "vendorName"                    => $vendorName,
            "vendorContactPerson"           => $vendorContactPerson,
            "vendorContactDetails"          => $vendorContactDetails,
            "vendorAddress"                 => $vendorAddress,
            "paymentTerms"                  => $paymentTerms,
            "shippingTerm"                  => $shippingTerm,
            "shippingDate"                  => $shippingDate,
            "purchaseRequestReason"         => $purchaseRequestReason,
            "purchaseRequestClassification" => $purchaseRequestClassification,
            "purchaseRequestStatus"         => $purchaseRequestStatus,
            "purchaseRequestRemarks"        => $purchaseRequestRemarks,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "total"                         => $total,
            "discountType"                  => $discountType,
            "discount"                      => $discount,
            "totalAmount"                   => $totalAmount,
            "vatSales"                      => $vatSales,
            "vat"                           => $vat,
            "totalVat"                      => $totalVat,
            "lessEwt"                       => $lessEwt,
            "grandTotalAmount"              => $grandTotalAmount,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt,
        ];

        $bidRecapID = "";
        $prID = $revisePurchaseRequestID ?? $purchaseRequestID;
        if ($prID) {
            $purchaseRequest = $this->purchaserequest->getPurchaseRequestData($prID);
            if ($purchaseRequest) {
                $bidRecapID = $purchaseRequest->bidRecapID;
    
                $temp = [
                    'costEstimateID'          => $purchaseRequest->costEstimateID,
                    'costEstimateCode'        => $purchaseRequest->costEstimateCode,
                    'billMaterialID'          => $purchaseRequest->billMaterialID,
                    'billMaterialCode'        => $purchaseRequest->billMaterialCode,
                    'materialRequestID'       => $purchaseRequest->materialRequestID,
                    'materialRequestCode'     => $purchaseRequest->materialRequestCode,
                    'inventoryValidationID'   => $purchaseRequest->inventoryValidationID,
                    'inventoryValidationCode' => $purchaseRequest->inventoryValidationCode,
                    'bidRecapID'              => $bidRecapID,
                    'bidRecapCode'            => $purchaseRequest->bidRecapCode,
                ];
                $purchaseRequestData = array_merge($purchaseRequestData, $temp);
            }
        }

        if ($action == "update") {
            unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($purchaseRequestData["revisePurchaseRequestCode"]);
            unset($purchaseRequestData["createdBy"]);
            unset($purchaseRequestData["createdAt"]);

            if ($method == "cancelform") {
                if ($total) {
                    $purchaseRequestData = [
                        "employeeID"            => $employeeID,
                        "total"                 => $total,
                        "discount"              => $discount,
                        "totalAmount"           => $totalAmount,
                        "vatSales"              => $vatSales,
                        "vat"                   => $vat,
                        "totalVat"              => $totalVat,
                        "lessEwt"               => $lessEwt,
                        "grandTotalAmount"      => $grandTotalAmount,
                        "purchaseRequestStatus" => 4,
                        "updatedBy"             => $updatedBy,
                    ];
                } else {
                    $purchaseRequestData = [
                        "purchaseRequestStatus" => 4,
                        "updatedBy"             => $updatedBy,
                    ];
                }
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "purchaseRequestStatus" => $purchaseRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
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
                    "revisePurchaseRequestID"   => $revisePurchaseRequestID,
                    "revisePurchaseRequestCode" => $revisePurchaseRequestCode,
                    "purchaseRequestStatus"     => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            }
        }

        $savePurchaseRequestData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $purchaseRequestID);
        if ($savePurchaseRequestData) {
            $result = explode("|", $savePurchaseRequestData);   
            $purchaseRequestID = $result[2];

            if ($items) {
                $purchaseRequestItems = [];
                foreach($items as $item) {
                    $requestItemAssetID = $item["requestItemAssetID"] ?? 0;
                    $itemID             = $item["itemID"] ?? null;
                    $itemName           = $item["itemName"] ?? null;
                    $itemCode           = $item["itemCode"] ?? null;
                    $itemClassification = $item["itemClassification"] ?? null;
                    $itemDescription    = $item["itemDescription"] ?? null;
                    $files              = $item["files"] ?? null;
                    $itemCategory       = $item["itemCategory"] ?? null;
                    $itemBrandName      = $item["itemBrandName"] ?? null;
                    $itemUom            = $item["itemUom"] ?? null;
                    $remarks            = $item["remarks"] ?? null;
                    $forPurchase        = $item["forPurchase"] ?? null;
                    $unitCost           = $item["unitCost"] ?? null;
                    $totalCost          = $item["totalCost"] ?? null;
                    $createdBy          = $updatedBy;

                    $requestData = false;
                    if ($requestItemAssetID && $requestItemAssetID != "undefined") {
                        $requestData = $this->purchaserequest->getPurchaseRequestItemAssetData($purchaseRequestClassification, $requestItemAssetID);
                    }

                    if ($purchaseRequestClassification == "Items") {
                        if ($bidRecapID && $requestData) {
                            $temp = [
                                'costEstimateID'          => $requestData->costEstimateID,
                                'billMaterialID'          => $requestData->billMaterialID,
                                'materialRequestID'       => $requestData->materialRequestID,
                                'inventoryValidationID'   => $requestData->inventoryValidationID,
                                'bidRecapID'              => $requestData->bidRecapID,
                                'finalQuoteID'            => $requestData->finalQuoteID,
                                'purchaseRequestID'       => $purchaseRequestID,
                                'purchaseOrderID'         => $requestData->purchaseOrderID,
                                'changeRequestID'         => $requestData->changeRequestID,
                                'inventoryReceivingID'    => $requestData->inventoryReceivingID,
                                'candidateVendorID'       => $requestData->candidateVendorID,
                                'candidateSelectedVendor' => $requestData->candidateSelectedVendor,
                                'candidateVendorName'     => $requestData->candidateVendorName,
                                'candidateVendorPrice'    => $requestData->candidateVendorPrice,
                                'inventoryVendorID'       => $requestData->inventoryVendorID,
                                'inventoryVendorCode'     => $requestData->inventoryVendorCode,
                                'inventoryVendorName'     => $requestData->inventoryVendorName,
                                'milestoneBuilderID'      => $requestData->milestoneBuilderID,
                                'phaseDescription'        => $requestData->phaseDescription,
                                'milestoneListID'         => $requestData->milestoneListID,
                                'projectMilestoneID'      => $requestData->projectMilestoneID,
                                'projectMilestoneName'    => $requestData->projectMilestoneName,
                                'itemID'                  => $requestData->itemID,
                                'itemCode'                => $requestData->itemCode,
                                'itemBrandName'           => $requestData->itemBrandName,
                                'itemName'                => $requestData->itemName,
                                'itemClassification'      => $requestData->itemClassification,
                                'itemCategory'            => $requestData->itemCategory,
                                'itemUom'                 => $requestData->itemUom,
                                'itemDescription'         => $requestData->itemDescription,
                                'files'                   => $requestData->files,
                                'remarks'                 => $requestData->remarks,
                                'availableStocks'         => $requestData->availableStocks,
                                'requestQuantity'         => $requestData->requestQuantity,
                                'reservedItem'            => $requestData->reservedItem,
                                'forPurchase'             => $requestData->forPurchase,
                                'unitCost'                => $requestData->unitCost,
                                'totalCost'               => $requestData->totalCost,
                                'finalQuoteRemarks'       => $requestData->finalQuoteRemarks,
                                'createdBy'               => $requestData->createdBy,
                                'updatedBy'               => $requestData->updatedBy,
                            ];
                        } else {
                            $temp = [
                                "purchaseRequestID"   => $purchaseRequestID,
                                "inventoryVendorID"   => $inventoryVendorID,
                                "inventoryVendorCode" => $vendorCode,
                                "inventoryVendorName" => $vendorName,
                                "itemID"              => $itemID,
                                "itemName"            => $itemName,
                                "itemCode"            => $itemCode,
                                "itemClassification"  => $itemClassification,
                                "itemDescription"     => $itemDescription,
                                "files"               => $files,
                                "itemCategory"        => $itemCategory,
                                "itemBrandName"       => $itemBrandName,
                                "itemUom"             => $itemUom,
                                "remarks"             => $remarks,
                                "forPurchase"         => $forPurchase,
                                "unitCost"            => $unitCost,
                                "totalCost"           => $totalCost,
                                "createdBy"           => $createdBy,
                                "updatedBy"           => $updatedBy,
                            ];
                        }

                        $purchaseRequestItems[] = $temp;
                    } else if ($purchaseRequestClassification == "Assets") {
                        if ($bidRecapID && $requestData) {
                            $temp = [
                                'costEstimateID'          => $requestData->costEstimateID,
                                'billMaterialID'          => $requestData->billMaterialID,
                                'materialRequestID'       => $requestData->materialRequestID,
                                'inventoryValidationID'   => $requestData->inventoryValidationID,
                                'bidRecapID'              => $requestData->bidRecapID,
                                'finalQuoteID'            => $requestData->finalQuoteID,
                                'purchaseRequestID'       => $purchaseRequestID,
                                'purchaseOrderID'         => $requestData->purchaseOrderID,
                                'changeRequestID'         => $requestData->changeRequestID,
                                'inventoryReceivingID'    => $requestData->inventoryReceivingID,
                                'candidateVendorID'       => $requestData->candidateVendorID,
                                'candidateSelectedVendor' => $requestData->candidateSelectedVendor,
                                'candidateVendorName'     => $requestData->candidateVendorName,
                                'candidateVendorPrice'    => $requestData->candidateVendorPrice,
                                'inventoryVendorID'       => $requestData->inventoryVendorID,
                                'inventoryVendorCode'     => $requestData->inventoryVendorCode,
                                'inventoryVendorName'     => $requestData->inventoryVendorName,
                                'milestoneBuilderID'      => $requestData->milestoneBuilderID,
                                'phaseDescription'        => $requestData->phaseDescription,
                                'milestoneListID'         => $requestData->milestoneListID,
                                'projectMilestoneID'      => $requestData->projectMilestoneID,
                                'projectMilestoneName'    => $requestData->projectMilestoneName,
                                'assetID'                 => $requestData->assetID,
                                'assetCode'               => $requestData->assetCode,
                                'assetBrandName'          => $requestData->assetBrandName,
                                'assetName'               => $requestData->assetName,
                                'assetClassification'     => $requestData->assetClassification,
                                'assetCategory'           => $requestData->assetCategory,
                                'assetUom'                => $requestData->assetUom,
                                'assetDescription'        => $requestData->assetDescription,
                                'files'                   => $requestData->files,
                                'remarks'                 => $requestData->remarks,
                                'availableStocks'         => $requestData->availableStocks,
                                'requestQuantity'         => $requestData->requestQuantity,
                                'reservedAsset'           => $requestData->reservedAsset,
                                'forPurchase'             => $requestData->forPurchase,
                                'requestManHours'         => $requestData->requestManHours,
                                'dateNeeded'              => $requestData->dateNeeded,
                                'dateReturn'              => $requestData->dateReturn,
                                'actualDateReturn'        => $requestData->actualDateReturn,
                                'hourlyRate'              => $requestData->hourlyRate,
                                'unitCost'                => $requestData->unitCost,
                                'totalCost'               => $requestData->totalCost,
                                'finalQuoteRemarks'       => $requestData->finalQuoteRemarks,
                                'createdBy'               => $requestData->createdBy,
                                'updatedBy'               => $requestData->updatedBy,
                            ];
                        } else {
                            $temp = [
                                "purchaseRequestID"   => $purchaseRequestID,
                                "inventoryVendorID"   => $inventoryVendorID,
                                "inventoryVendorCode" => $vendorCode,
                                "inventoryVendorName" => $vendorName,
                                "assetID"             => $itemID,
                                "assetName"           => $itemName,
                                "assetCode"           => $itemCode,
                                "assetClassification" => $itemClassification,
                                "assetDescription"    => $itemDescription,
                                "files"               => $files,
                                "assetCategory"       => $itemCategory,
                                "assetBrandName"      => $itemBrandName,
                                "assetUom"            => $itemUom,
                                "remarks"             => $remarks,
                                "forPurchase"         => $forPurchase,
                                "unitCost"            => $unitCost,
                                "totalCost"           => $totalCost,
                                "createdBy"           => $createdBy,
                                "updatedBy"           => $updatedBy,
                            ];
                        }
                        $purchaseRequestItems[] = $temp;
                    }
                }
                $savePurchaseRequestItems = $this->purchaserequest->savePurchaseRequestItems($action, $purchaseRequestItems, $purchaseRequestID, $purchaseRequestClassification);
            }

            // ----- INSERT PURCHASE ORDER -----
            if ($purchaseRequestStatus == "2") {
                $insertPurchaseOrderData = $this->purchaserequest->insertPurchaseOrderData($purchaseRequestID);
            }
            // ----- END INSERT PURCHASE ORDER -----
        }
        echo json_encode($savePurchaseRequestData);
    }

}
?>