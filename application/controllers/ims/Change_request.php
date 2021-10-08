<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Change_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ChangeRequest_model", "changerequest");
        isAllowed(138);
    }

    public function index()
    {
        $data["title"] = "Change Request";

        $this->load->view("template/header",$data);
        $this->load->view("ims/change_request/index");
        $this->load->view("template/footer");
    }

    public function saveChangeRequest()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $changeRequestID         = $this->input->post("changeRequestID") ?? null;
        $changeRequestCode       = $this->input->post("changeRequestCode") ?? null;
        $reviseChangeRequestID   = $this->input->post("reviseChangeRequestID") ?? null;
        $reviseChangeRequestCode = $this->input->post("reviseChangeRequestCode") ?? null;
        $employeeID              = $this->input->post("employeeID") ?? null;
        $changeRequestReason     = $this->input->post("changeRequestReason") ?? null;
        $changeRequestStatus     = $this->input->post("changeRequestStatus");
        $changeRequestRemarks    = $this->input->post("changeRequestRemarks") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt") ?? date("Y-m-d H:i:s");

        $changeRequestData = [
            "changeRequestReason"  => $changeRequestReason,
            "changeRequestStatus"  => $changeRequestStatus,
            "changeRequestRemarks" => $changeRequestRemarks,
            "approversID"          => $approversID,
            "approversStatus"      => $approversStatus,
            "approversDate"        => $approversDate,
            "submittedAt"          => $submittedAt,
            "createdBy"            => $createdBy,
            "updatedBy"            => $updatedBy,
            "createdAt"            => $createdAt,
        ];

        $classification = "";
        if ($reviseChangeRequestID) {
            $changeRequest = $this->changerequest->getChangeRequestData($reviseChangeRequestID);
            if ($changeRequest) {
                $classification = $changeRequest->changeRequestClassification;

                $temp = [
                    'reviseChangeRequestID'       => $changeRequest->changeRequestID,
                    'reviseChangeRequestCode'     => $changeRequest->changeRequestCode,
                    'costEstimateID'              => $changeRequest->costEstimateID,
                    'costEstimateCode'            => $changeRequest->costEstimateCode,
                    'billMaterialID'              => $changeRequest->billMaterialID,
                    'billMaterialCode'            => $changeRequest->billMaterialCode,
                    'materialRequestID'           => $changeRequest->materialRequestID,
                    'materialRequestCode'         => $changeRequest->materialRequestCode,
                    'inventoryValidationID'       => $changeRequest->inventoryValidationID,
                    'inventoryValidationCode'     => $changeRequest->inventoryValidationCode,
                    'bidRecapID'                  => $changeRequest->bidRecapID,
                    'bidRecapCode'                => $changeRequest->bidRecapCode,
                    'purchaseRequestID'           => $changeRequest->purchaseRequestID,
                    'purchaseRequestCode'         => $changeRequest->purchaseRequestCode,
                    'purchaseOrderID'             => $changeRequest->purchaseOrderID,
                    'purchaseOrderCode'           => $changeRequest->purchaseOrderCode,
                    'timelineBuilderID'           => $changeRequest->timelineBuilderID,
                    'projectCode'                 => $changeRequest->projectCode,
                    'projectName'                 => $changeRequest->projectName,
                    'projectCategory'             => $changeRequest->projectCategory,
                    'clientCode'                  => $changeRequest->clientCode,
                    'clientName'                  => $changeRequest->clientName,
                    'clientAddress'               => $changeRequest->clientAddress,
                    'employeeID'                  => $employeeID,
                    'inventoryVendorID'           => $changeRequest->inventoryVendorID,
                    'vendorCode'                  => $changeRequest->vendorCode,
                    'vendorName'                  => $changeRequest->vendorName,
                    'vendorContactPerson'         => $changeRequest->vendorContactPerson,
                    'vendorContactDetails'        => $changeRequest->vendorContactDetails,
                    'vendorAddress'               => $changeRequest->vendorAddress,
                    'changeRequestClassification' => $changeRequest->changeRequestClassification,
                    'purchaseOrderReason'         => $changeRequest->purchaseOrderReason,
                    'dateNeeded'                  => $changeRequest->dateNeeded
                ];
                $changeRequestData = array_merge($changeRequestData, $temp);
            }
        }

        if ($action == "update") {
            unset($changeRequestData["reviseChangeRequestID"]);
            unset($changeRequestData["reviseChangeRequestCode"]);
            unset($changeRequestData["createdBy"]);
            unset($changeRequestData["createdAt"]);

            if ($method == "cancelform") {
                $changeRequestData = [
                    "changeRequestStatus" => 4,
                    "updatedBy"           => $updatedBy,
                ];
            } else if ($method == "approve") {
                $changeRequestData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "changeRequestStatus" => $changeRequestStatus,
                    "updatedBy"           => $updatedBy,
                ];
            } else if ($method == "deny") {
                $changeRequestData = [
                    "approversStatus"      => $approversStatus,
                    "approversDate"        => $approversDate,
                    "changeRequestStatus"  => 3,
                    "changeRequestRemarks" => $changeRequestRemarks,
                    "updatedBy"            => $updatedBy,
                ];
            } else if ($method == "drop") {
                $changeRequestData = [
                    "reviseChangeRequestID"   => $reviseChangeRequestID,
                    "reviseChangeRequestCode" => $reviseChangeRequestCode,
                    "changeRequestStatus"     => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveChangeRequestData = $this->changerequest->saveChangeRequestData($action, $changeRequestData, $changeRequestID);
        if ($saveChangeRequestData) {
            $result = explode("|", $saveChangeRequestData);   
            $changeRequestID = $result[2];

            if ($reviseChangeRequestID && $classification) {
                $requestItemAssets = $this->changerequest->getRequestItemAssets($classification, $reviseChangeRequestID);

                if ($requestItemAssets && count($requestItemAssets) > 0) {
                    $requestItemAssetData = [];
                    foreach($requestItemAssets as $itemAsset) {
                        if ($classification == "Items") {
                            $requestItemAssetData[] = [
                                'costEstimateID'          => $itemAsset['costEstimateID'],
                                'billMaterialID'          => $itemAsset['billMaterialID'],
                                'materialRequestID'       => $itemAsset['materialRequestID'],
                                'inventoryValidationID'   => $itemAsset['inventoryValidationID'],
                                'bidRecapID'              => $itemAsset['bidRecapID'],
                                'finalQuoteID'            => $itemAsset['finalQuoteID'],
                                'purchaseRequestID'       => $itemAsset['purchaseRequestID'],
                                'purchaseOrderID'         => $itemAsset['purchaseOrderID'],
                                'changeRequestID'         => $changeRequestID,
                                'inventoryReceivingID'    => $itemAsset['inventoryReceivingID'],
                                'candidateVendorID'       => $itemAsset['candidateVendorID'],
                                'candidateSelectedVendor' => $itemAsset['candidateSelectedVendor'],
                                'candidateVendorName'     => $itemAsset['candidateVendorName'],
                                'candidateVendorPrice'    => $itemAsset['candidateVendorPrice'],
                                'inventoryVendorID'       => $itemAsset['inventoryVendorID'],
                                'inventoryVendorCode'     => $itemAsset['inventoryVendorCode'],
                                'inventoryVendorName'     => $itemAsset['inventoryVendorName'],
                                'milestoneBuilderID'      => $itemAsset['milestoneBuilderID'],
                                'phaseDescription'        => $itemAsset['phaseDescription'],
                                'milestoneListID'         => $itemAsset['milestoneListID'],
                                'projectMilestoneID'      => $itemAsset['projectMilestoneID'],
                                'projectMilestoneName'    => $itemAsset['projectMilestoneName'],
                                'itemID'                  => $itemAsset['itemID'],
                                'itemCode'                => $itemAsset['itemCode'],
                                'itemBrandName'           => $itemAsset['itemBrandName'],
                                'itemName'                => $itemAsset['itemName'],
                                'itemClassification'      => $itemAsset['itemClassification'],
                                'itemCategory'            => $itemAsset['itemCategory'],
                                'itemUom'                 => $itemAsset['itemUom'],
                                'itemDescription'         => $itemAsset['itemDescription'],
                                'files'                   => $itemAsset['files'],
                                'remarks'                 => $itemAsset['remarks'],
                                'availableStocks'         => $itemAsset['availableStocks'],
                                'requestQuantity'         => $itemAsset['requestQuantity'],
                                'reservedItem'            => $itemAsset['reservedItem'],
                                'forPurchase'             => $itemAsset['forPurchase'],
                                'unitCost'                => $itemAsset['unitCost'],
                                'totalCost'               => $itemAsset['totalCost'],
                                'finalQuoteRemarks'       => $itemAsset['finalQuoteRemarks'],
                                'createdBy'               => $itemAsset['createdBy'],
                                'updatedBy'               => $itemAsset['updatedBy'],
                            ];
                        } else if ($classification == "Assets") {
                            $requestItemAssetData[] = [
                                'costEstimateID'          => $itemAsset['costEstimateID'],
                                'billMaterialID'          => $itemAsset['billMaterialID'],
                                'materialRequestID'       => $itemAsset['materialRequestID'],
                                'inventoryValidationID'   => $itemAsset['inventoryValidationID'],
                                'bidRecapID'              => $itemAsset['bidRecapID'],
                                'finalQuoteID'            => $itemAsset['finalQuoteID'],
                                'purchaseRequestID'       => $itemAsset['purchaseRequestID'],
                                'purchaseOrderID'         => $itemAsset['purchaseOrderID'],
                                'changeRequestID'         => $changeRequestID,
                                'inventoryReceivingID'    => $itemAsset['inventoryReceivingID'],
                                'candidateVendorID'       => $itemAsset['candidateVendorID'],
                                'candidateSelectedVendor' => $itemAsset['candidateSelectedVendor'],
                                'candidateVendorName'     => $itemAsset['candidateVendorName'],
                                'candidateVendorPrice'    => $itemAsset['candidateVendorPrice'],
                                'inventoryVendorID'       => $itemAsset['inventoryVendorID'],
                                'inventoryVendorCode'     => $itemAsset['inventoryVendorCode'],
                                'inventoryVendorName'     => $itemAsset['inventoryVendorName'],
                                'milestoneBuilderID'      => $itemAsset['milestoneBuilderID'],
                                'phaseDescription'        => $itemAsset['phaseDescription'],
                                'milestoneListID'         => $itemAsset['milestoneListID'],
                                'projectMilestoneID'      => $itemAsset['projectMilestoneID'],
                                'projectMilestoneName'    => $itemAsset['projectMilestoneName'],
                                'assetID'                 => $itemAsset['assetID'],
                                'assetCode'               => $itemAsset['assetCode'],
                                'assetBrandName'          => $itemAsset['assetBrandName'],
                                'assetName'               => $itemAsset['assetName'],
                                'assetClassification'     => $itemAsset['assetClassification'],
                                'assetCategory'           => $itemAsset['assetCategory'],
                                'assetUom'                => $itemAsset['assetUom'],
                                'assetDescription'        => $itemAsset['assetDescription'],
                                'files'                   => $itemAsset['files'],
                                'remarks'                 => $itemAsset['remarks'],
                                'availableStocks'         => $itemAsset['availableStocks'],
                                'requestQuantity'         => $itemAsset['requestQuantity'],
                                'reservedAsset'           => $itemAsset['reservedAsset'],
                                'forPurchase'             => $itemAsset['forPurchase'],
                                'requestManHours'         => $itemAsset['requestManHours'],
                                'dateNeeded'              => $itemAsset['dateNeeded'],
                                'dateReturn'              => $itemAsset['dateReturn'],
                                'actualDateReturn'        => $itemAsset['actualDateReturn'],
                                'hourlyRate'              => $itemAsset['hourlyRate'],
                                'unitCost'                => $itemAsset['unitCost'],
                                'totalCost'               => $itemAsset['totalCost'],
                                'finalQuoteRemarks'       => $itemAsset['finalQuoteRemarks'],
                                'createdBy'               => $itemAsset['createdBy'],
                                'updatedBy'               => $itemAsset['updatedBy'],
                            ];
                        }
                    }
                    if ($requestItemAssetData && count($requestItemAssetData) > 0) {
                        $saveChangeRequestItemAssets = $this->changerequest->saveChangeRequestItemAssets($classification, $requestItemAssetData, $changeRequestID);
                    }
                }
            }

            // ----- INSERT BID RECAP -----
            if ($changeRequestStatus == "2") {
                $insertBidRecapData = $this->changerequest->insertBidRecapData($changeRequestID);
            }
            // ----- END INSERT BID RECAP -----
        }
        echo json_encode($saveChangeRequestData);
    }

}
?>