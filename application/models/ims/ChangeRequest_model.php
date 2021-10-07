<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');

class ChangeRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveChangeRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_change_request_tbl", $data);
        } else {
            $where = ["changeRequestID" => $id];
            $query = $this->db->update("ims_change_request_tbl", $data, $where);
        }

        if ($query) {
            $changeRequestID = $action == "insert" ? $this->db->insert_id() : $id;

            // ----- INSERT BID RECAP IF APPROVE -----
            // $changeRequestStatus = $data["changeRequestStatus"];
            // if ($changeRequestStatus == "2")
            // {
            //     $insertBidRecapData = $this->insertBidRecapData($changeRequestID);
            // }
            // ----- END INSERT BID RECAP IF APPROVE -----

            $changeRequestCode = "";
            if ($action == "insert") {
                $changeRequestCode = getFormCode("CRF", date("Y-m-d"), $changeRequestID);
                $this->db->update("ims_change_request_tbl", ["changeRequestCode" => $changeRequestCode], ["changeRequestID" => $changeRequestID]);
            }

            return "true|$changeRequestCode|$changeRequestID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteChangeRequestItemAssets($classification = "", $changeRequestID = 0)
    {
        $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $query = $this->db->delete(
            $table,
            [
                "changeRequestID" => $changeRequestID,
                "bidRecapID"      => null
            ]);
        return $query ? true : false;
    }

    public function saveChangeRequestItemAssets($classification = "", $requestItemAssets = [], $changeRequestID = 0)
    {
        if ($classification && $changeRequestID)
        {
            $deleteChangeRequestItemAssets = $this->deleteChangeRequestItemAssets($classification, $changeRequestID);


            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $query = $this->db->insert_batch($table, $requestItemAssets);
            return $query ? true : false;
        }
        return false;
    }





    // ----- ***** INSERT BID RECAP ***** ----- 
    public function getChangeRequestData($changeRequestID = 0)
    {
        $sql = "SELECT * FROM ims_change_request_tbl WHERE changeRequestID = $changeRequestID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getRequestItemAssets($classification = "", $changeRequestID = 0)
    {
        if ($classification && $changeRequestID)
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $sql = "SELECT * FROM $table WHERE changeRequestID = $changeRequestID AND bidRecapID IS NULL";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function insertBidRecapItemAssets($classification = "", $changeRequestID = 0, $bidRecapID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        if ($classification && $changeRequestID) 
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $requestItemAssets = $this->getRequestItemAssets($classification, $changeRequestID);

            if ($requestItemAssets && count($requestItemAssets) > 0) 
            {
                $data = [];
                foreach($requestItemAssets as $dt) 
                {
                    if ($classification == "Items") 
                    {

                        $data[] = [
                            'costEstimateID'          => $dt['costEstimateID'],
                            'billMaterialID'          => $dt['billMaterialID'],
                            'materialRequestID'       => $dt['materialRequestID'],
                            'inventoryValidationID'   => $dt['inventoryValidationID'],
                            'bidRecapID'              => $bidRecapID,
                            'finalQuoteID'            => $dt['finalQuoteID'],
                            'purchaseRequestID'       => $dt['purchaseRequestID'],
                            'purchaseOrderID'         => $dt['purchaseOrderID'],
                            'changeRequestID'         => $dt['changeRequestID'],
                            'inventoryReceivingID'    => $dt['inventoryReceivingID'],
                            'candidateVendorID'       => $dt['candidateVendorID'],
                            'candidateSelectedVendor' => $dt['candidateSelectedVendor'],
                            'candidateVendorName'     => $dt['candidateVendorName'],
                            'candidateVendorPrice'    => $dt['candidateVendorPrice'],
                            'inventoryVendorID'       => $dt['inventoryVendorID'],
                            'inventoryVendorCode'     => $dt['inventoryVendorCode'],
                            'inventoryVendorName'     => $dt['inventoryVendorName'],
                            'milestoneBuilderID'      => $dt['milestoneBuilderID'],
                            'phaseDescription'        => $dt['phaseDescription'],
                            'milestoneListID'         => $dt['milestoneListID'],
                            'projectMilestoneID'      => $dt['projectMilestoneID'],
                            'projectMilestoneName'    => $dt['projectMilestoneName'],
                            'itemID'                  => $dt['itemID'],
                            'itemCode'                => $dt['itemCode'],
                            'itemBrandName'           => $dt['itemBrandName'],
                            'itemName'                => $dt['itemName'],
                            'itemClassification'      => $dt['itemClassification'],
                            'itemCategory'            => $dt['itemCategory'],
                            'itemUom'                 => $dt['itemUom'],
                            'itemDescription'         => $dt['itemDescription'],
                            'files'                   => $dt['files'],
                            'remarks'                 => $dt['remarks'],
                            'availableStocks'         => $dt['availableStocks'],
                            'requestQuantity'         => $dt['requestQuantity'],
                            'reservedItem'            => $dt['reservedItem'],
                            'forPurchase'             => $dt['forPurchase'],
                            'unitCost'                => $dt['unitCost'],
                            'totalCost'               => $dt['totalCost'],
                            'finalQuoteRemarks'       => $dt['finalQuoteRemarks'],
                            'createdBy'               => $sessionID,
                            'updatedBy'               => $sessionID,
                        ];
                    }

                    if ($classification == "Assets")
                    {
                        $data[] = [
                            'costEstimateID'          => $dt['costEstimateID'],
                            'billMaterialID'          => $dt['billMaterialID'],
                            'materialRequestID'       => $dt['materialRequestID'],
                            'inventoryValidationID'   => $dt['inventoryValidationID'],
                            'bidRecapID'              => $bidRecapID,
                            'finalQuoteID'            => $dt['finalQuoteID'],
                            'purchaseRequestID'       => $dt['purchaseRequestID'],
                            'purchaseOrderID'         => $dt['purchaseOrderID'],
                            'changeRequestID'         => $dt['changeRequestID'],
                            'inventoryReceivingID'    => $dt['inventoryReceivingID'],
                            'candidateVendorID'       => $dt['candidateVendorID'],
                            'candidateSelectedVendor' => $dt['candidateSelectedVendor'],
                            'candidateVendorName'     => $dt['candidateVendorName'],
                            'candidateVendorPrice'    => $dt['candidateVendorPrice'],
                            'inventoryVendorID'       => $dt['inventoryVendorID'],
                            'inventoryVendorCode'     => $dt['inventoryVendorCode'],
                            'inventoryVendorName'     => $dt['inventoryVendorName'],
                            'milestoneBuilderID'      => $dt['milestoneBuilderID'],
                            'phaseDescription'        => $dt['phaseDescription'],
                            'milestoneListID'         => $dt['milestoneListID'],
                            'projectMilestoneID'      => $dt['projectMilestoneID'],
                            'projectMilestoneName'    => $dt['projectMilestoneName'],
                            'assetID'                 => $dt['assetID'],
                            'assetCode'               => $dt['assetCode'],
                            'assetBrandName'          => $dt['assetBrandName'],
                            'assetName'               => $dt['assetName'],
                            'assetClassification'     => $dt['assetClassification'],
                            'assetCategory'           => $dt['assetCategory'],
                            'assetUom'                => $dt['assetUom'],
                            'assetDescription'        => $dt['assetDescription'],
                            'files'                   => $dt['files'],
                            'remarks'                 => $dt['remarks'],
                            'availableStocks'         => $dt['availableStocks'],
                            'requestQuantity'         => $dt['requestQuantity'],
                            'reservedAsset'           => $dt['reservedAsset'],
                            'forPurchase'             => $dt['forPurchase'],
                            'requestManHours'         => $dt['requestManHours'],
                            'dateNeeded'              => $dt['dateNeeded'],
                            'dateReturn'              => $dt['dateReturn'],
                            'actualDateReturn'        => $dt['actualDateReturn'],
                            'hourlyRate'              => $dt['hourlyRate'],
                            'unitCost'                => $dt['unitCost'],
                            'totalCost'               => $dt['totalCost'],
                            'finalQuoteRemarks'       => $dt['finalQuoteRemarks'],
                            'createdBy'               => $sessionID,
                            'updatedBy'               => $sessionID,
                        ];
                    }
                }

                if ($data && count($data) > 0) {
                    $query2 = $this->db->insert_batch($table, $data);
                    return $query2 ? true : false;
                }
            }
        } 
        return true;
    }

    public function insertBidRecapData($changeRequestID = 0)
    {
        $changeRequestData = $this->getChangeRequestData($changeRequestID);
        if ($changeRequestData)
        {
            $classification = $changeRequestData->changeRequestClassification;

            $data = [
                'costEstimateID'          => $changeRequestData->costEstimateID,
                'costEstimateCode'        => $changeRequestData->costEstimateCode,
                'billMaterialID'          => $changeRequestData->billMaterialID,
                'billMaterialCode'        => $changeRequestData->billMaterialCode,
                'materialRequestID'       => $changeRequestData->materialRequestID,
                'materialRequestCode'     => $changeRequestData->materialRequestCode,
                'inventoryValidationID'   => $changeRequestData->inventoryValidationID,
                'inventoryValidationCode' => $changeRequestData->inventoryValidationCode,
                'changeRequestID'         => $changeRequestData->changeRequestID,
                'changeRequestCode'       => $changeRequestData->changeRequestCode,
                'timelineBuilderID'       => $changeRequestData->timelineBuilderID,
                'projectCode'             => $changeRequestData->projectCode,
                'projectName'             => $changeRequestData->projectName,
                'projectCategory'         => $changeRequestData->projectCategory,
                'clientCode'              => $changeRequestData->clientCode,
                'clientName'              => $changeRequestData->clientName,
                'clientAddress'           => $changeRequestData->clientAddress,
                'employeeID'              => 0,
                'bidRecapReason'          => $changeRequestData->changeRequestReason,
                'dateNeeded'              => $changeRequestData->dateNeeded,
                'bidRecapStatus'          => 0,
                'createdBy'               => $changeRequestData->employeeID,
                'updatedBy'               => $changeRequestData->updatedBy,
            ];

            $query = $this->db->insert("ims_bid_recap_tbl", $data);
            if ($query) {
                $bidRecapID = $this->db->insert_id();
                $bidRecapCode = getFormCode("BR", date("Y-m-d"), $bidRecapID);
                $updateCode = $this->db->update(
                    "ims_bid_recap_tbl", 
                    ["bidRecapCode" => $bidRecapCode], 
                    ["bidRecapID" => $bidRecapID]);

                $this->insertBidRecapItemAssets($classification, $changeRequestID, $bidRecapID);
                return true;
            }
            return false;
        }
        return false;
    }
    // ----- ***** END INSERT BID RECAP ***** ----- 


}
