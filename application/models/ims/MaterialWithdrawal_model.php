<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MaterialWithdrawal_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    // ----- GET TIMELINE CONTENT -----
    public function getMaterialWithdrawalDetails($materialWithdrawalID = 0)
    {
        $sql = "
        SELECT 
        *
        FROM 
            ims_material_withdrawal_tbl 
        WHERE 
            materialWithdrawalID = $materialWithdrawalID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getItemRecords($materialRequestID = 0, $itemID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            *
        FROM 
        ims_material_withdrawal_item_tbl 
        WHERE 
        materialRequestID = $materialRequestID AND itemID = $itemID 
           ";
        $query  = $this->db->query($sql);
        $itemRecords = $query ? $query->result_array() : [];
        foreach ($itemRecords as $itmRecord) {
            $temp = [
                "withdrawalItemID" => $itmRecord["withdrawalItemID"],
                "requestItemID"          => $itmRecord["requestItemID"],
                "materialRequestID"             => $itmRecord["materialRequestID"],
                "itemID"  => $itmRecord["itemID"],
                "requestQuantity"     => $itmRecord["requestQuantity"],
                "stockOut"     => $itmRecord["stockOut"],
                "received"     => $itmRecord["received"],
                "dateReceived"     => $itmRecord["dateReceived"],
                "remaining"     => $itmRecord["remaining"],
                "stockOutDate"     => $itmRecord["stockOutDate"],
                "remarks"     => $itmRecord["remarks"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getAssetRecords($materialRequestID = 0, $assetID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            *
        FROM 
        ims_material_withdrawal_asset_tbl 
        WHERE 
        materialRequestID = $materialRequestID AND assetID = $assetID 
           ";
        $query  = $this->db->query($sql);
        $assetRecords = $query ? $query->result_array() : [];
        foreach ($assetRecords as $astRecord) {
            $temp = [
                "withdrawalAssetID" => $astRecord["withdrawalAssetID"],
                "requestAssetID"          => $astRecord["requestAssetID"],
                "materialRequestID"             => $astRecord["materialRequestID"],
                "assetID"  => $astRecord["assetID"],
                "requestQuantity"     => $astRecord["requestQuantity"],
                "stockOut"     => $astRecord["stockOut"],
                "received"     => $astRecord["received"],
                "dateReceived"     => $astRecord["dateReceived"],
                "remaining"     => $astRecord["remaining"],
                "stockOutDate"     => $astRecord["stockOutDate"],
                "remarks"     => $astRecord["remarks"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getItemList($inventoryValidationID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            * ,(SELECT withdrawalItemStatus  FROM ims_material_withdrawal_item_tbl WHERE  materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1 ) AS withdrawalItemStatus
        FROM 
        ims_request_items_tbl 
        WHERE 
        inventoryValidationID = $inventoryValidationID AND
        bidRecapID IS NULL
           ";
        $query  = $this->db->query($sql);
        $items  = $query ? $query->result_array() : [];
        foreach ($items as $item) {
            $materialRequestID = $item["materialRequestID"];
            $inventoryValidationID = $item["inventoryValidationID"];
            $itemID = $item["itemID"];
            $itemCode = $item["itemCode"];
            $itemBrandName = $item["itemBrandName"];
            $itemName = $item["itemName"];   
            $requestQuantity = $item["requestQuantity"];   
            $itemClassification = $item["itemClassification"];   
            $itemCategory = $item["itemCategory"];   
            $itemUom = $item["itemUom"];   
            $withdrawalItemStatus = $item["withdrawalItemStatus"];   
            $temp = [
                "materialRequestID" => $materialRequestID,
                "inventoryValidationID" => $inventoryValidationID,
                "itemID"          => $itemID,
                "itemCode"   => $itemCode,
                "itemBrandName"          =>  $itemBrandName,
                "itemName"   => $itemName ,
                "requestQuantity"          => $requestQuantity,
                "itemClassification"          => $itemClassification,
                "itemCategory"          => $itemCategory,
                "itemUom"          => $itemUom,
                "withdrawalItemStatus"          => $withdrawalItemStatus,
                "milestoneTask" => $this->getItemRecords($materialRequestID,$itemID)
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getAssetList($inventoryValidationID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            * ,(SELECT withdrawalAssetStatus  FROM ims_material_withdrawal_asset_tbl WHERE  materialRequestID = ims_request_assets_tbl.materialRequestID AND assetID = ims_request_assets_tbl.assetID AND withdrawalAssetStatus = 1 ) AS withdrawalAssetStatus
        FROM 
        ims_request_assets_tbl 
        WHERE 
        inventoryValidationID = $inventoryValidationID AND
        bidRecapID IS NULL
           ";
        $query  = $this->db->query($sql);
        $assets  = $query ? $query->result_array() : [];
        foreach ($assets as $asset) {
            $materialRequestID = $asset["materialRequestID"];
            $inventoryValidationID = $asset["inventoryValidationID"];
            $assetID = $asset["assetID"];
            $assetCode = $asset["assetCode"];
            $assetBrandName = $asset["assetBrandName"];
            $assetName = $asset["assetName"];   
            $requestQuantity = $asset["requestQuantity"];   
            $assetClassification = $asset["assetClassification"];   
            $assetCategory = $asset["assetCategory"];   
            $assetUom = $asset["assetUom"];   
            $withdrawalAssetStatus = $asset["withdrawalAssetStatus"];   
            $temp = [
                "materialRequestID" => $materialRequestID,
                "inventoryValidationID" => $inventoryValidationID,
                "assetID"          => $assetID,
                "assetCode"   => $assetCode,
                "assetBrandName"          =>  $assetBrandName,
                "assetName"   => $assetName ,
                "requestQuantity"          => $requestQuantity,
                "assetClassification"          => $assetClassification,
                "assetCategory"          => $assetCategory,
                "assetUom"          => $assetUom,
                "withdrawalAssetStatus"          => $withdrawalAssetStatus,
                "milestoneTask" => $this->getAssetRecords($materialRequestID,$assetID)
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getMaterialWithdrawalLowerDetails($inventoryValidationID = 0)
    {   
        $output = [];
        
            $temp = [
                "items"              => $this->getItemList($inventoryValidationID),
                "assets"              => $this->getAssetList($inventoryValidationID),
                
            ];
            array_push($output, $temp);
        // }
        return $output;
    }

    public function getTimelineContent($materialWithdrawalID = 1)
    {
        $output = [];
        $details = $this->getMaterialWithdrawalDetails($materialWithdrawalID);
        if ($details) {
            $output["materialWithdrawalID"]    = $details->materialWithdrawalID;
            $output["employeeID"]           = $details->employeeID;
            $output["materialWithdrawalCode"] = $details->materialWithdrawalCode;
            $output["inventoryItemStatus"] = $details->inventoryItemStatus;
            $output["inventoryAssetStatus"] = $details->inventoryAssetStatus;
            $output["materialWithdrawalStatus"] = $details->materialWithdrawalStatus;
            $output["materialRequestID"] = $details->materialRequestID;
            $output["inventoryValidationID"] = $details->inventoryValidationID;

            $output["projectCode"] = $details->projectCode;
            $output["projectName"] = $details->projectName;
            $output["projectCategory"] = $details->projectCategory;
            $output["clientCode"] = $details->clientCode;
            $output["clientName"] = $details->clientName;
            $output["clientAddress"] = $details->clientAddress;
            $output["submittedAt"] = $details->submittedAt;
            $output["createdAt"] = $details->createdAt;
            $output["createdBy"] = $details->createdBy;
            $output["materialWithdrawalReason"] = $details->materialWithdrawalReason;
            $output["materialWithdrawalRemarks"] = $details->materialWithdrawalRemarks;

            


            $output["withdrawalDetails"] = $this->getMaterialWithdrawalLowerDetails($details->inventoryValidationID);
        }
        return $output;
    }
    // ----- END GET TIMELINE CONTENT -----


    public function deleteProjectBoard($timelineBuilderID = 0)
    {
        $query = $this->db->delete("pms_timeline_management_tbl", ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function updateProjectBuilder($timelineBuilderID, $timelineManagementStatus)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $query = $this->db->update(
            "pms_timeline_builder_tbl", 
            [
                "timelineManagementBy"     => $sessionID,
                "timelineManagementStatus" => $timelineManagementStatus
            ], 
            ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function saveProjectBoard($materialWithdrawalID = 0, $dataItem =[] ,$dataAsset = [],$sessionID)
    {
        // $delete = $this->deleteProjectBoard($timelineBuilderID);
        // $update = $this->updateProjectBuilder($timelineBuilderID, $timelineManagementStatus);
        if ($dataItem && count($dataItem) > 0) {
            $query = $this->db->update_batch('ims_material_withdrawal_item_tbl', $dataItem, 'withdrawalItemID');
        }
        if($dataAsset && count($dataAsset) > 0){
            $query = $this->db->update_batch('ims_material_withdrawal_asset_tbl', $dataAsset, 'withdrawalAssetID');
        }
        if(($dataItem && count($dataItem) > 0) || $dataAsset && count($dataAsset) > 0){
            
           

            // START UPDATE THE STATUS OF ITEM AND ASSET IN HEADER OF MATERIAL WITHDRAWAL FORMS//
             $this->db->query("UPDATE  ims_material_withdrawal_tbl
             SET inventoryItemStatus = (SELECT 
             CASE 
                 WHEN (remaining = 0 AND received !=0) AND (remaining is not null AND received is not  null)  THEN IF(SUM(remaining) >0 ,0,8)
                 WHEN (received = 0 AND remaining = 0) OR (received is null  OR remaining is null) THEN 0
             END as itemStatus FROM ims_material_withdrawal_item_tbl WHERE materialWithdrawalID =ims_material_withdrawal_tbl.materialWithdrawalID),
             
             inventoryAssetStatus =(SELECT 
             CASE 
                 WHEN (remaining = 0 AND received !=0) AND (remaining is not null AND received is not  null)  THEN IF(SUM(remaining) >0 ,0,8)
                 WHEN (received = 0 AND remaining = 0) OR (received is null  OR remaining is null) THEN 0
             END as itemStatus FROM ims_material_withdrawal_asset_tbl WHERE materialWithdrawalID =ims_material_withdrawal_tbl.materialWithdrawalID)
             
             WHERE materialWithdrawalID = $materialWithdrawalID");
            // START UPDATE THE STATUS OF ITEM AND ASSET IN HEADER OF MATERIAL WITHDRAWAL FORMS//

            // START UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
            $query = $this->db->query("UPDATE  ims_material_withdrawal_tbl
            SET materialWithdrawalStatus = IF(inventoryItemStatus = 8 AND inventoryAssetStatus = 8, 8,0)
            ,employeeID = IF(employeeID = '', $sessionID, (SELECT employeeID FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID ))
            WHERE materialWithdrawalID = $materialWithdrawalID");
            // END UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//

            // START UPDATE THE STOCK OUT DOCUMENT STATUS//
            $query = $this->db->query("UPDATE  ims_stock_out_tbl
            SET inventoryItemStatus = IF((SELECT inventoryItemStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID ) = 8, 8,0 ),
            stockOutStatus = IF((SELECT inventoryItemStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID ) = 8, 8,0 )
            WHERE materialWithdrawalID = $materialWithdrawalID");
            // END UPDATE THE STOCK OUT DOCUMENT STATUS//

            // $this->db->query("CALL proc_get_material_withdrawal_approve($materialWithdrawalID)"); // Created By: Sir Wilson September 29,2021 11:02AM

            // echo $query;
            // exit;
            return $query ? "true|Successfully updated|$materialWithdrawalID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}


