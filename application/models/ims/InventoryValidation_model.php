<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryValidation_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function brandName($itemID = null) 
    {
        $sql   = "SELECT brandName FROM ims_inventory_item_tbl WHERE itemID = $itemID";
        $query = $this->db->query($sql);
        if ($query) {
            $result = $query->row();
            return $result ? $result->brandName : null;
        }
        return null;
    }
    
    public function saveInventoryValidationData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_validation_tbl", $data);
        } else {
            $where = ["inventoryValidationID" => $id];
            $query = $this->db->update("ims_inventory_validation_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;

            $inventoryValidationCode = "IVR-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["inventoryValidationCode"=> $inventoryValidationCode ];
            $this->db->update("ims_inventory_validation_tbl", $updateArr, ["inventoryValidationID" => $insertID]);

            // ---- INSERT BID RECAP IF APPROVE -----
            $inventoryValidationStatus = $data["inventoryValidationStatus"];
            if ($inventoryValidationStatus == "2")
            {
                $insertBidRecapData = $this->insertBidRecapData($insertID);
            }
            // ---- END INSERT BID RECAP IF APPROVE -----

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteInventoryValidationItems($inventoryValidationID, $materialRequestID) {
    
        $query = $this->db->delete(
            "ims_request_items_tbl", 
            [
                "inventoryValidationID"      => $materialRequestID,
                "purchaseOrderID "       => NULL,
                "inventoryValidationID " => NULL,
                "bidRecapID "            => NULL
            ]);
        return $query ? true : false;
    }

    public function saveMaterialWithdrawalDocument($data){
      
        $query = $this->db->insert("ims_material_withdrawal_tbl", $data);
        if ($query) {
            $insertID = $this->db->insert_id();
            return "true|Successfully submitted|$insertID|";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveStockOutDocument($data){
      
        $query = $this->db->insert("ims_stock_out_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveEquipmentBorrowingDocument($data){
      
        $query = $this->db->insert("ims_equipment_borrowing_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveInventoryValidationItems($data, $inventoryValidationID = null, $purchaseRequestID = null,$method = "update"){
        // $deleteInventoryValidationItems = $this->deleteInventoryValidationItems($inventoryValidationID, $purchaseRequestID);

        if($method == 'update'){
            $this->db->where('inventoryValidationID', $inventoryValidationID);
            $this->db->delete('ims_request_items_tbl');
            $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        }else{
            $this->db->where('inventoryValidationID', $inventoryValidationID);
            $this->db->delete('ims_request_items_tbl');
            $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        }
      
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveInventoryValidationAssets($data, $inventoryValidationID = null, $purchaseRequestID = null, $method = "update"){
        // $deleteInventoryValidationItems = $this->deleteInventoryValidationItems($inventoryValidationID, $purchaseRequestID);
        if($method == "update"){
            $this->db->where('inventoryValidationID', $inventoryValidationID);
            $this->db->delete('ims_request_assets_tbl');
            $query = $this->db->insert_batch("ims_request_assets_tbl", $data);
        }else{
            $this->db->where('inventoryValidationID', $inventoryValidationID);
            $this->db->delete('ims_request_assets_tbl');
            $query = $this->db->insert_batch("ims_request_assets_tbl", $data);
        }
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }


    public function getRequestItem($requestItemID = 0)
    {
        $sql   = "SELECT * FROM ims_request_items_tbl WHERE requestItemID = $requestItemID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getInventoryValidationClassification($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $result = [];
        if ($inventoryValidationID > 0 || $purchaseRequestID && $purchaseRequestID > 0) {
            $wherePR  = $inventoryValidationID > 0 ? "inventoryValidationID = '$inventoryValidationID'" : "inventoryValidationID IS NULL";
            $whereBOM = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "";
            $sql = "
            SELECT 
                itemClassification
            FROM 
                ims_request_items_tbl 
            WHERE
                $wherePR
                $whereBOM
            GROUP BY itemClassification";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getInventoryValidationItems($inventoryValidationID = 0, $purchaseRequestID = 0, $itemClassification = "")
    {
        $result = [];
        if ($inventoryValidationID > 0 || $purchaseRequestID && $purchaseRequestID > 0) {   
            $wherePR        = $inventoryValidationID > 0 ? "AND irit.inventoryValidationID = '$inventoryValidationID'" : "AND irit.inventoryValidationID IS NULL";
            $whereBOM       = $purchaseRequestID && $purchaseRequestID > 0 ? "AND irit.purchaseRequestID = $purchaseRequestID" : "";
            $selectQuantity = $inventoryValidationID > 0 ? "" : ", SUM(irit.quantity) AS quantity";     
            $sql = "
            SELECT 
                * $selectQuantity, (SELECT SUM(isitt.quantity) as availableStocks FROM ims_stock_in_total_tbl as isitt WHERE isitt.itemID = irit.itemID) as availableItems,
                    (SELECT SUM(sub_irit.reserveItem) AS reservedStock FROM ims_request_items_tbl AS sub_irit WHERE sub_irit.billMaterialID IS NOT NULL AND sub_irit.itemID = irit.itemID) AS reservedItems
            FROM 
                ims_request_items_tbl AS irit
            WHERE 
                irit.bidRecapID IS NULL AND
                irit.purchaseOrderID IS NULL AND
                irit.materialWithdrawalID IS NULL AND
                irit.itemClassification = BINARY('$itemClassification')
                $wherePR 
                $whereBOM
            GROUP BY itemID    
                ";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getMaterialEquipmentRequestItems($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $classifications = $this->getInventoryValidationClassification($inventoryValidationID, $purchaseRequestID);
        $result = [];
        foreach($classifications as $classification) {
            $itemClassification = $classification["itemClassification"];
            $temp = [
                "name"  => $itemClassification,
                "items" => $this->getInventoryValidationItems($inventoryValidationID, $purchaseRequestID, $itemClassification)
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getPhases($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $whereIVR = $inventoryValidationID > 0 ? " AND inventoryValidationID = '$inventoryValidationID' AND milestoneBuilderID <> 0 " : "AND inventoryValidationID IS NULL AND milestoneBuilderID IS NOT NULL";
        $sql = "
        SELECT 
            milestoneBuilderID, phaseDescription
        FROM 
            ims_request_items_tbl 
        WHERE 
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            purchaseRequestID = '$purchaseRequestID'
            $whereIVR 
        GROUP BY milestoneBuilderID";
        $query  = $this->db->query($sql);
        // print_r($query->result_array());
        return $query ? $query->result_array() : [];
    }

    public function getMilestones($inventoryValidationID = 0, $purchaseRequestID = 0, $milestoneBuilderID = 0) {
        $whereIVR = $inventoryValidationID > 0 ? "AND inventoryValidationID = '$inventoryValidationID'" : "AND inventoryValidationID IS NULL";
        $sql = "
        SELECT 
            projectMilestoneID, projectMilestoneName
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            purchaseRequestID = '$purchaseRequestID' AND
            milestoneBuilderID = '$milestoneBuilderID'
            $whereIVR
        GROUP BY projectMilestoneID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestoneItems($inventoryValidationID = 0, $purchaseRequestID = 0, $milestoneBuilderID = 0, $projectMilestoneID = 0)
    {
        $wherePR = $inventoryValidationID > 0 ? "AND inventoryValidationID = '$inventoryValidationID'" : "AND inventoryValidationID IS NULL";
        $sql = "
        SELECT 
            *
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            purchaseRequestID = $purchaseRequestID AND
            milestoneBuilderID = $milestoneBuilderID AND
            projectMilestoneID = $projectMilestoneID
            $wherePR";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getProjectPhases($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $result = [];
        $phases = $this->getPhases($inventoryValidationID, $purchaseRequestID);
        foreach($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $phaseDescription   = $phase["phaseDescription"];

            $milestones = $this->getMilestones($inventoryValidationID, $purchaseRequestID, $milestoneBuilderID);
            $milestoneItems = [];
            foreach($milestones as $milestone) {
                $projectMilestoneID   = $milestone["projectMilestoneID"];
                $projectMilestoneName = $milestone["projectMilestoneName"];

                $temp2 = [
                    "projectMilestoneID" => $projectMilestoneID,
                    "name"  => $projectMilestoneName,
                    "items" => $this->getMilestoneItems($inventoryValidationID, $purchaseRequestID, $milestoneBuilderID, $projectMilestoneID)
                ];
                array_push($milestoneItems, $temp2);
            }
            $temp = [
                "milestoneBuilderID" => $milestoneBuilderID,
                "phaseDescription"   => $phaseDescription,
                "milestones"         => $milestoneItems,
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getPurchaseRequest($inventoryValidationID = 0, $purchaseRequestID = 0) 
    {
        $result = [
            // "phases" => $this->getProjectPhases($inventoryValidationID, $purchaseRequestID),/
            "phases" => [],
            "materialsEquipment" => $this->getMaterialEquipmentRequestItems($inventoryValidationID, $purchaseRequestID)
        ];
        return $result;
    }




    // ----- ***** BID RECAP ***** -----
    public function getInventoryValidationData($inventoryValidationID = 0)
    {
        $sql = "SELECT * FROM ims_inventory_validation_tbl WHERE inventoryValidationID = $inventoryValidationID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getInventoryValidationRequestItems($inventoryValidationID = 0)
    {
        $sql = "SELECT * FROM ims_request_items_tbl WHERE inventoryValidationID = $inventoryValidationID AND bidRecapID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getInventoryValidationAssets($inventoryValidationID = 0)
    {
        $sql = "SELECT * FROM ims_request_assets_tbl WHERE inventoryValidationID = $inventoryValidationID AND bidRecapID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertBidRecapItems($inventoryValidationID = 0, $bidRecapID = 0)
    {
        $requestItems = $this->getInventoryValidationRequestItems($inventoryValidationID);
        if ($requestItems && count($requestItems) > 0)
        {
            $data = [];
            foreach($requestItems as $item)
            {
                $data[] = [
                    'costEstimateID'          => $item['costEstimateID'],
                    'billMaterialID'          => $item['billMaterialID'],
                    'materialRequestID'       => $item['materialRequestID'],
                    'inventoryValidationID'   => $item['inventoryValidationID'],
                    'bidRecapID'              => $bidRecapID,
                    'finalQuoteID'            => $item['finalQuoteID'],
                    'purchaseRequestID'       => $item['purchaseRequestID'],
                    'purchaseOrderID'         => $item['purchaseOrderID'],
                    'changeRequestID'         => $item['changeRequestID'],
                    'inventoryReceivingID'    => $item['inventoryReceivingID'],
                    'candidateVendorID'       => $item['candidateVendorID'],
                    'candidateSelectedVendor' => $item['candidateSelectedVendor'],
                    'candidateVendorName'     => $item['candidateVendorName'],
                    'candidateVendorPrice'    => $item['candidateVendorPrice'],
                    'inventoryVendorID'       => $item['inventoryVendorID'],
                    'inventoryVendorCode'     => $item['inventoryVendorCode'],
                    'inventoryVendorName'     => $item['inventoryVendorName'],
                    'milestoneBuilderID'      => $item['milestoneBuilderID'],
                    'phaseDescription'        => $item['phaseDescription'],
                    'milestoneListID'         => $item['milestoneListID'],
                    'projectMilestoneID'      => $item['projectMilestoneID'],
                    'projectMilestoneName'    => $item['projectMilestoneName'],
                    'itemID'                  => $item['itemID'],
                    'itemCode'                => $item['itemCode'],
                    'itemBrandName'           => $item['itemBrandName'],
                    'itemName'                => $item['itemName'],
                    'itemClassification'      => $item['itemClassification'],
                    'itemCategory'            => $item['itemCategory'],
                    'itemUom'                 => $item['itemUom'],
                    'itemDescription'         => $item['itemDescription'],
                    'files'                   => $item['files'],
                    'remarks'                 => $item['remarks'],
                    'availableStocks'         => $item['availableStocks'],
                    'requestQuantity'         => $item['requestQuantity'],
                    'reservedItem'            => $item['reservedItem'],
                    'forPurchase'             => $item['forPurchase'],
                    'unitCost'                => $item['unitCost'],
                    'totalCost'               => $item['totalCost'],
                    'createdBy'               => $item['createdBy'],
                    'updatedBy'               => $item['updatedBy'],
                ];
            }
            $query = $this->db->insert_batch("ims_request_items_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function insertBidRecapAssets($inventoryValidationID = 0, $bidRecapID = 0)
    {
        $requestAssets = $this->getInventoryValidationAssets($inventoryValidationID);
        if ($requestAssets && count($requestAssets) > 0)
        {
            $data = [];
            foreach($requestAssets as $asset)
            {
                $data[] = [
                    'costEstimateID'          => $asset['costEstimateID'],
                    'billMaterialID'          => $asset['billMaterialID'],
                    'materialRequestID'       => $asset['materialRequestID'],
                    'inventoryValidationID'   => $asset['inventoryValidationID'],
                    'bidRecapID'              => $bidRecapID,
                    'finalQuoteID'            => $asset['finalQuoteID'],
                    'purchaseRequestID'       => $asset['purchaseRequestID'],
                    'purchaseOrderID'         => $asset['purchaseOrderID'],
                    'changeRequestID'         => $asset['changeRequestID'],
                    'inventoryReceivingID'    => $asset['inventoryReceivingID'],
                    'candidateVendorID'       => $asset['candidateVendorID'],
                    'candidateSelectedVendor' => $asset['candidateSelectedVendor'],
                    'candidateVendorName'     => $asset['candidateVendorName'],
                    'candidateVendorPrice'    => $asset['candidateVendorPrice'],
                    'inventoryVendorID'       => $asset['inventoryVendorID'],
                    'inventoryVendorCode'     => $asset['inventoryVendorCode'],
                    'inventoryVendorName'     => $asset['inventoryVendorName'],
                    'milestoneBuilderID'      => $asset['milestoneBuilderID'],
                    'phaseDescription'        => $asset['phaseDescription'],
                    'milestoneListID'         => $asset['milestoneListID'],
                    'projectMilestoneID'      => $asset['projectMilestoneID'],
                    'projectMilestoneName'    => $asset['projectMilestoneName'],
                    'assetID'                 => $asset['assetID'],
                    'assetCode'               => $asset['assetCode'],
                    'assetBrandName'          => $asset['assetBrandName'],
                    'assetName'               => $asset['assetName'],
                    'assetClassification'     => $asset['assetClassification'],
                    'assetCategory'           => $asset['assetCategory'],
                    'assetUom'                => $asset['assetUom'],
                    'assetDescription'        => $asset['assetDescription'],
                    'files'                   => $asset['files'],
                    'remarks'                 => $asset['remarks'],
                    'availableStocks'         => $asset['availableStocks'],
                    'requestQuantity'         => $asset['requestQuantity'],
                    'reservedAsset'           => $asset['reservedAsset'],
                    'forPurchase'             => $asset['forPurchase'],
                    'requestManHours'         => $asset['requestManHours'],
                    'dateNeeded'              => $asset['dateNeeded'],
                    'dateReturn'              => $asset['dateReturn'],
                    'actualDateReturn'        => $asset['actualDateReturn'],
                    'hourlyRate'              => $asset['hourlyRate'],
                    'unitCost'                => $asset['unitCost'],
                    'totalCost'               => $asset['totalCost'],
                    'createdBy'               => $asset['createdBy'],
                    'updatedBy'               => $asset['updatedBy'],
                ];
            }
            $query = $this->db->insert_batch("ims_request_assets_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function insertBidRecapItemAssetData($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $insertBidRecapItems  = $this->insertBidRecapItems($inventoryValidationID, $purchaseRequestID);
        $insertBidRecapAssets = $this->insertBidRecapAssets($inventoryValidationID, $purchaseRequestID);
    }

    public function insertBidRecapData($inventoryValidationID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $inventoryValidationData = $this->getInventoryValidationData($inventoryValidationID);
        if ($inventoryValidationData)
        {
            $data = [
                'inventoryValidationID'   => $inventoryValidationData->inventoryValidationID,
                'inventoryValidationCode' => $inventoryValidationData->inventoryValidationCode,
                'materialRequestID'       => $inventoryValidationData->materialRequestID,
                'materialRequestCode'     => $inventoryValidationData->materialRequestCode,
                'costEstimateID'          => $inventoryValidationData->costEstimateID,
                'costEstimateCode'        => $inventoryValidationData->costEstimateCode,
                'billMaterialID'          => $inventoryValidationData->billMaterialID,
                'billMaterialCode'        => $inventoryValidationData->billMaterialCode,
                'employeeID'              => 0,
                'timelineBuilderID'       => $inventoryValidationData->timelineBuilderID,
                'projectCode'             => $inventoryValidationData->projectCode,
                'projectName'             => $inventoryValidationData->projectName,
                'projectCategory'         => $inventoryValidationData->projectCategory,
                'clientCode'              => $inventoryValidationData->clientCode,
                'clientName'              => $inventoryValidationData->clientName,
                'clientAddress'           => $inventoryValidationData->clientAddress,
                'bidRecapReason'          => $inventoryValidationData->inventoryValidationReason,
                'dateNeeded'              => $inventoryValidationData->dateNeeded,
                'bidRecapStatus'          => 0,
                'createdBy'               => $inventoryValidationData->employeeID,
                'updatedBy'               => $sessionID,
            ];
            $saveBidRecap = $this->db->insert("ims_bid_recap_tbl", $data);
            if ($saveBidRecap)
            {
                $bidRecapID = $this->db->insert_id();
                $bidRecapCode = getFormCode("BR", date("Y-m-d"), $bidRecapID);
                $this->db->update(
                    "ims_bid_recap_tbl", 
                    ["bidRecapCode" => $bidRecapCode], 
                    ["bidRecapID" => $bidRecapID]);
                $insertBidRecapItemAssetData = $this->insertBidRecapItemAssetData($inventoryValidationID, $bidRecapID);
            }
        }
        return false;
    }
    // ----- ***** END BID RECAP ***** -----

}
