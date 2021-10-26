<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MaterialWithdrawal_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getMaterialWithdrawalData($materialWithdrawalID = null){
        $sql    = "SELECT * FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = '$materialWithdrawalID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function saveMaterialWithdrawalData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("ims_material_withdrawal_tbl", $data);
        } else {
            $where = ["materialWithdrawalID" => $id];
            $query = $this->db->update("ims_material_withdrawal_tbl", $data, $where);
        }

        if ($query) {
            $insertID           = $action == "insert" ? $this->db->insert_id() : $id;
            $materialWithdrawalData   = $this->getMaterialWithdrawalData($insertID);
            $materialWithdrawalCode   = "MWF-".date_format(date_create($materialWithdrawalData->createdAt),"y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr          = ["materialWithdrawalCode"=> $materialWithdrawalCode ];
            $this->db->update("ims_material_withdrawal_tbl", $updateArr, ["materialWithdrawalID" => $insertID]);
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
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
                "borrowed"     => $astRecord["borrowed"],
                "received"     => $astRecord["received"],
                "dateReceived"     => $astRecord["dateReceived"],
                "remaining"     => $astRecord["remaining"],
                "borrowedDate"     => $astRecord["borrowedDate"],
                "remarks"     => $astRecord["remarks"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getItemList($inventoryValidationID = 0)
    {
        $output = [];
        $sql    = "SELECT
        ims_request_items_tbl.*,
            (SELECT DISTINCT(withdrawalItemStatus)
            FROM ims_material_withdrawal_item_tbl 
            WHERE materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1  ) AS withdrawalItemStatus 
        FROM ims_request_items_tbl 
        WHERE inventoryValidationID = $inventoryValidationID  AND bidRecapID IS NULL

        -- SELECT 
        --     * ,(SELECT DISTINCT(materialRequestID), IF(EXISTS(SELECT * FROM ims_material_withdrawal_item_tbl WHERE withdrawalItemStatus =0),0,1)  FROM ims_material_withdrawal_item_tbl WHERE  materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1 ) AS withdrawalItemStatus
        -- FROM 
        -- ims_request_items_tbl 
        -- WHERE 
        -- inventoryValidationID = $inventoryValidationID AND
        -- bidRecapID IS NULL
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
        $sql    = "SELECT
        ims_request_assets_tbl.*,
            (SELECT DISTINCT(withdrawalAssetStatus)
            FROM ims_material_withdrawal_asset_tbl 
            WHERE materialRequestID = ims_request_assets_tbl.materialRequestID AND assetID = ims_request_assets_tbl.assetID AND withdrawalAssetStatus = 1  ) AS withdrawalAssetStatus 
        FROM ims_request_assets_tbl 
        WHERE inventoryValidationID = $inventoryValidationID AND bidRecapID IS NULL
        -- SELECT 
        --     * ,(SELECT DISTINCT(materialRequestID), IF(EXISTS(SELECT * FROM ims_material_withdrawal_asset_tbl WHERE withdrawalAssetStatus =0),0,1)  FROM ims_material_withdrawal_asset_tbl WHERE  materialRequestID = ims_request_assets_tbl.materialRequestID AND assetID = ims_request_assets_tbl.assetID AND withdrawalAssetStatus = 1 ) AS withdrawalAssetStatus
        -- FROM 
        -- ims_request_assets_tbl 
        -- WHERE 
        -- inventoryValidationID = $inventoryValidationID AND
        -- bidRecapID IS NULL
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
            $output["materialRequestCode"] = $details->materialRequestCode;
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
            $output["dateNeeded"] = $details->dateNeeded;
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


    public function saveProjectBoard($materialWithdrawalID = 0, $dataItem =[] ,$dataAsset = [],$sessionID,$statusItemFlag = false,$statusAssetFlag = false,$getItemID = 0,$getAssetID = 0,$inventoryValidationID = 0)
    {
        $itemComplete   = false;
        $assetComplete  = false;

        // $delete = $this->deleteProjectBoard($timelineBuilderID);
        // $update = $this->updateProjectBuilder($timelineBuilderID, $timelineManagementStatus);
        if ($dataItem && count($dataItem) > 0) {
            $query = $this->db->update_batch('ims_material_withdrawal_item_tbl', $dataItem, 'withdrawalItemID');
            
            for($itemLoop =0; $itemLoop < count($dataItem); $itemLoop++){
                $itemID = $dataItem[$itemLoop]['itemID'];
               
                $getReservedItem = $this->db->query("SELECT IFNULL(reservedItem,0) as reservedItem FROM ims_request_items_tbl WHERE inventoryValidationID = '$inventoryValidationID' AND itemID =  $itemID");
                $result = ($getReservedItem->row()->reservedItem) - ($dataItem[$itemLoop]['received']);

                if($result < 0){
                    $result = 0;
                }

                // START UPDATE THE INVENTORY VALIDATION RESERVED ITEMS//
                $query = $this->db->query("UPDATE ims_request_items_tbl
                SET reservedItem = $result
                WHERE inventoryValidationID = '$inventoryValidationID' AND itemID =  $itemID");
                // END UPDATE THE INVENTORY VALIDATION RESERVED ITEMS//
            }
        }

        if($dataAsset && count($dataAsset) > 0){
            $query = $this->db->update_batch('ims_material_withdrawal_asset_tbl', $dataAsset, 'withdrawalAssetID');

            for($assetLoop =0; $assetLoop < count($dataAsset); $assetLoop++){
                $assetID = $dataAsset[$assetLoop]['assetID'];
               
                $getReservedAsset = $this->db->query("SELECT IFNULL(reservedAsset,0)  as reservedAsset FROM ims_request_assets_tbl WHERE inventoryValidationID = '$inventoryValidationID' AND assetID =  $assetID");
                $result = ($getReservedAsset->row()->reservedAsset) - ($dataAsset[$assetLoop]['received']);

                if($result < 0){
                    $result = 0;
                }

                // START UPDATE THE INVENTORY VALIDATION RESERVED ASSETS//
                $query = $this->db->query("UPDATE  	ims_request_assets_tbl
                SET reservedAsset = $result
                WHERE inventoryValidationID = '$inventoryValidationID' AND assetID =  $assetID");
                // END UPDATE THE INVENTORY VALIDATION RESERVED ASSETS//
            }
        }

        if(($dataItem && count($dataItem) > 0) || $dataAsset && count($dataAsset) > 0){
        $updateFooterStatus = false;


            if($statusItemFlag == true){
                  // START UPDATE THE STOCK OUT AL ITEM STATUS//
                  for($loop1 =0; $loop1<count($getItemID);$loop1++){
                    $query = $this->db->query("UPDATE  ims_material_withdrawal_item_tbl
                    SET withdrawalItemStatus = 1
                    WHERE materialWithdrawalID = $materialWithdrawalID AND itemID = $getItemID[$loop1]");
                    }
                    // END UPDATE THE STOCK OUT ALL ITEM STATUS//
                    $updateFooterStatus = true;
            }

            if($statusAssetFlag == true){
                // START UPDATE THE STOCK OUT AL ASSET STATUS//
                for($loop2 =0;$loop2<count($getAssetID);$loop2++){
                    $query = $this->db->query("UPDATE  ims_material_withdrawal_asset_tbl
                    SET withdrawalAssetStatus = 1
                    WHERE materialWithdrawalID = $materialWithdrawalID AND assetID = $getAssetID[$loop2]");
                }
                // END UPDATE THE STOCK OUT ALL ASSET STATUS//
                $updateFooterStatus = true;

           }

            // CHECK THE ALL ITEM STATUS IS COMPLETE ITEMS/ASSETS//
            // if($updateFooterStatus){
                
               
            $sqlCountItems = $this->db->query("SELECT COUNT(requestItemID) as totalValidationItems 
            FROM ims_request_items_tbl WHERE inventoryValidationID = $inventoryValidationID AND bidRecapID IS NULL");
                    
                    
               if(floatVal($sqlCountItems->row()->totalValidationItems)){
                    $sqlItems = $this->db->query("SELECT  COUNT(DISTINCT(itemID)) as totalCompletedItems
                    FROM ims_material_withdrawal_item_tbl  WHERE materialWithdrawalID = $materialWithdrawalID AND withdrawalItemStatus =1");

                        if(floatVal($sqlCountItems->row()->totalValidationItems) == floatVal($sqlItems->row()->totalCompletedItems)){

                            // START UPDATE THE INVENTORY ITEMS STATUS//
                            $this->updateMaterialWithdrawalStatus($materialWithdrawalID, "item");
                            // END UPDATE THE INVENTORY ITEMS STATUS//
                         }
               }else{
                    $this->updateMaterialWithdrawalStatus($materialWithdrawalID, "item");
               }



                $sqlCountAssets = $this->db->query("SELECT COUNT(requestAssetID) as totalValidationAssets 
                FROM ims_request_assets_tbl WHERE inventoryValidationID = $inventoryValidationID AND bidRecapID IS NULL");

                if(floatVal($sqlCountAssets->row()->totalValidationAssets)){
                    $sqlAssets = $this->db->query("SELECT COUNT(DISTINCT(assetID)) as totalCompletedAssets
                    FROM ims_material_withdrawal_asset_tbl WHERE materialWithdrawalID =$materialWithdrawalID  AND withdrawalAssetStatus =1");
         
                    if(floatVal($sqlCountAssets->row()->totalValidationAssets) == floatVal($sqlAssets->row()->totalCompletedAssets)){
        
                        $this->updateMaterialWithdrawalStatus($materialWithdrawalID, "asset");
                    }
                }else{
                        $this->updateMaterialWithdrawalStatus($materialWithdrawalID, "asset");
                }
    
               
            // }
            // END CHECK THE ALL ITEM STATUS IS COMPLET ITEMS/ASSETS//            

    

            // START UPDATE THE STATUS OF ITEM AND ASSET IN HEADER OF MATERIAL WITHDRAWAL FORMS//

            // START UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
            $query = $this->db->query("UPDATE  ims_material_withdrawal_tbl
            SET materialWithdrawalStatus = IF(inventoryItemStatus = 9 AND inventoryAssetStatus = 9, 9,0)
            ,employeeID = IF(employeeID = '', $sessionID, (SELECT employeeID FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID ))
            WHERE materialWithdrawalID = $materialWithdrawalID");
            // END UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//

            // START UPDATE THE STOCK OUT DOCUMENT STATUS//
            $query = $this->db->query("UPDATE  ims_stock_out_tbl
            SET inventoryItemStatus = (SELECT inventoryItemStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID),
            stockOutStatus = (SELECT inventoryItemStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID)
            WHERE materialWithdrawalID = $materialWithdrawalID");
            // END UPDATE THE STOCK OUT DOCUMENT STATUS//

             // START UPDATE THE EQUIPMENT BORROWING DOCUMENT STATUS//
             $query = $this->db->query("UPDATE ims_equipment_borrowing_tbl
             SET inventoryAssetStatus = (SELECT inventoryAssetStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID),
             equipmentBorrowingStatus  =(SELECT inventoryAssetStatus FROM ims_material_withdrawal_tbl WHERE materialWithdrawalID = $materialWithdrawalID) 
             WHERE materialWithdrawalID = $materialWithdrawalID");
             // END UPDATE THE EQUIPMENT BORROWING DOCUMENT STATUS//

            $temp =  $this->db->query("SELECT materialWithdrawalID FROM ims_material_usage_tbl WHERE materialWithdrawalID =$materialWithdrawalID");

            if($temp->num_rows() == 0){
                $this->db->query("CALL proc_get_material_withdrawal_approve($materialWithdrawalID)");
            }
                $this->db->query("CALL proc_get_equipment_borrowing_approve($materialWithdrawalID)");
            // Created By: Sir Wilson September 29,2021 11:02AM

            // echo $query;
            // exit;
            return $query ? "true|Successfully updated|$materialWithdrawalID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateMaterialWithdrawalStatus($materialWithdrawalID = null, $param = "item"){

      if($materialWithdrawalID){
         $columnName = $param ==  "item" ? "inventoryItemStatus" : "inventoryAssetStatus";
         $query =  $this->db->query("UPDATE ims_material_withdrawal_tbl
                            SET $columnName = 9
                            WHERE materialWithdrawalID = '$materialWithdrawalID' ");
        return $query ? true : false; 
      }
    }

}


