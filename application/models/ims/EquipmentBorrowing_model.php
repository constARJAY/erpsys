<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class equipmentBorrowing_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getEquipmentBorrowingData($equipmentBorrowingID = null){
        $sql    = "SELECT * FROM ims_equipment_borrowing_tbl WHERE equipmentBorrowingID = '$equipmentBorrowingID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function saveEquipmentBorrowingData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("ims_equipment_borrowing_tbl", $data);
        } else {
            $where = ["equipmentBorrowingID" => $id];
            $query = $this->db->update("ims_equipment_borrowing_tbl", $data, $where);
        }

        if ($query) {
            $insertID           = $action == "insert" ? $this->db->insert_id() : $id;
            $equipmentBorrowingData   = $this->getEquipmentBorrowingData($insertID);
            $equipmentBorrowingCode   = "EBF-".date_format(date_create($equipmentBorrowingData->createdAt),"y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr          = ["equipmentBorrowingCode"=> $equipmentBorrowingCode ];
            $this->db->update("ims_equipment_borrowing_tbl", $updateArr, ["equipmentBorrowingID" => $insertID]);
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }


    // ----- GET TIMELINE CONTENT -----
    public function getMaterialWithdrawalDetails($equipmentBorrowingID  = 0)
    {
        $sql = "
        SELECT 
         ims_equipment_borrowing_tbl.*,CONCAT(employeeFirstname, ' ', employeeLastname) AS employeeFullname,dept.departmentName as employeeDepartment,design.designationName as employeeDesignation
        FROM 
             ims_equipment_borrowing_tbl 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN hris_department_tbl AS dept ON dept.departmentID = helt.departmentID
            LEFT JOIN hris_designation_tbl as design ON design.designationID  = helt.designationID
        WHERE 
            equipmentBorrowingID  = $equipmentBorrowingID ";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
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
                "barcode"  => $astRecord["barcode"],
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
                "assets"              => $this->getAssetList($inventoryValidationID)
                
            ];
            array_push($output, $temp);
        // }
        return $output;
    }

    public function getTimelineContent($equipmentBorrowingID = 1)
    {
        $output = [];
        $details = $this->getMaterialWithdrawalDetails($equipmentBorrowingID);
        if ($details) {
            $output["equipmentBorrowingID"]    = $details->equipmentBorrowingID;
            $output["equipmentBorrowingCode"]    = $details->equipmentBorrowingCode;
            $output["materialWithdrawalID"]    = $details->materialWithdrawalID;
            $output["employeeID"]           = $details->employeeID;
            $output["materialWithdrawalCode"] = $details->materialWithdrawalCode;
            $output["inventoryAssetStatus"] = $details->inventoryAssetStatus;
            $output["equipmentBorrowingStatus"] = $details->equipmentBorrowingStatus;
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
            $output["equipmentBorrowingReason"] = $details->equipmentBorrowingReason;
            $output["equipmentBorrowingRemarks"] = $details->equipmentBorrowingRemarks;
            $output["employeeFullname"] = $details->employeeFullname;
            $output["employeeDepartment"] = $details->employeeDepartment;
            $output["employeeDesignation"] = $details->employeeDesignation;
            $output["dateNeeded"] = $details->dateNeeded;
            $output["createdBy"] = $details->createdBy;


            


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

    public function getInventoryStockInAssets($assetID = 0)
    {
        $sql = "SELECT *  FROM ims_stock_in_assets_tbl WHERE stockOutDate IS NUll 
        AND stockInDate IS NOT NULL 
        AND assetID = '$assetID'
        GROUP BY assetID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertBidRecapItems($assetID = 0,$insertID =0)
    {
        $requestAssets = $this->getInventoryStockInAssets($assetID);

       
      
        if ($requestAssets && count($requestAssets) > 0)
        {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

            $data = [];
            // foreach($requestAssets as $item)
            // {
                $data = array(
                    'inventoryCode'       => $requestAssets[0]['inventoryCode'],
                    'inventoryStorageID'         => $requestAssets[0]['inventoryStorageID'],
                    'inventoryStorageCode'         => $requestAssets[0]['inventoryStorageCode'],
                    'inventoryStorageOfficeName'    => $requestAssets[0]['inventoryStorageOfficeName'],
                    'assetID'       => $requestAssets[0]['assetID'],
                    'assetCode' => $requestAssets[0]['assetCode'],
                    'assetName'     => $requestAssets[0]['assetName'],
                    'brand'    => $requestAssets[0]['brand'],
                    'classificationName'       => $requestAssets[0]['classificationName'],
                    'categoryName'     => $requestAssets[0]['categoryName'],
                    'serialNumber'     => $requestAssets[0]['serialNumber'],
                    'ExpirationDate'      => $requestAssets[0]['ExpirationDate'],
                    'ManufactureDate'        => $requestAssets[0]['ManufactureDate']
                );
            // }

            $this->db->where('stockInAssetID', $insertID);
            $query = $this->db->update('ims_stock_in_assets_tbl', $data);

   

            return $query ? true : false;
        }
        return false;
    }


    public function saveProjectBoard($materialWithdrawalID = 0, $dataAsset =[],$materialRequestID =0,$serialData = [],$equipmentBorrowingID =  null )
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

       
        if ($dataAsset && count($dataAsset) > 0) {

               $query =  $this->db->insert('ims_material_withdrawal_asset_tbl', $dataAsset);
               
                    
                if($query){
                    $withdrawalAssetID = $this->db->insert_id();
                    $asset_ID = $dataAsset['assetID'];
                    $requestStocks =  $dataAsset["borrowed"];

                        // Update the stock in records in imd_stock_in_item_tbl//
                        $getSpecificAvailableStocks = $this->db->query("SELECT stockInAssetID,quantity,expirationDate
                        FROM 
                        ims_stock_in_assets_tbl 
                        WHERE
                        stockOutDate IS NUll 
                        AND stockInDate IS NOT NULL 
                        AND ( returnItemID IS NOT NULL OR inventoryReceivingID IS NOT NULL )
                        AND assetID = '$asset_ID' 
                        ORDER BY expirationDate asc");

                        $stockInStocksResult =  $getSpecificAvailableStocks->result_array();

                            $tmpRequestStocks = $requestStocks;
                            // $tmpRequestStocks = 5;
                            for($loop=0;$loop<count($stockInStocksResult);$loop++){

                                $oldQuantity =  $stockInStocksResult[$loop]['quantity'];

                                $computeDiff = $oldQuantity - $tmpRequestStocks ;

                                
                                if($computeDiff <0){
                                    $tmpRequestStocks = abs($computeDiff);
                                    $newQuantity =  0;

                                }
                                
                                if($tmpRequestStocks != 0){

                                    if($computeDiff >0){
                                        $tmpRequestStocks = 0;
                                        $newQuantity =$computeDiff;
                                        }

                                } else{
                                    $tmpRequestStocks = 0;
                                    $newQuantity =$oldQuantity;
                                }

                                if($computeDiff == 0){
                                    $tmpRequestStocks = 0;
                                    $newQuantity =  0;

                                }


                                $data = array(
                                    'quantity'       => $newQuantity,
                                );

                                $this->db->where('stockInAssetID', $stockInStocksResult[$loop]['stockInAssetID']);
                                $this->db->update('ims_stock_in_assets_tbl', $data);
                            }


                        // End update the stock in records in imd_stock_in_item_tbl//
                       

                        // Stock Out Quantity Data in ims_stock_in_assets_tbl//
                        $getAvailableStocks = $this->db->query("SELECT returnItemID, equipmentBorrowingID, quantity as availableStocks
                        FROM 
                        ims_stock_in_assets_tbl 
                        WHERE
                        stockOutDate IS NUll 
                        AND stockInDate IS NOT NULL 
                        AND assetID = $asset_ID");

                        $stockInResult =  $getAvailableStocks->result_array();

                        // $deductionStocks =  $stockInResult[0]["availableStocks"] - $requestStocks;

                        $data = array(
                            'equipmentBorrowingID' => $equipmentBorrowingID,
                            'barcode' => $dataAsset["barcode"],
                            'quantity' => $dataAsset["borrowed"],
                            'stockOutDate' => date("Y-m-d")
                        );

                        $this->db->insert('ims_stock_in_assets_tbl', $data);

                        $insertID = $this->db->insert_id();

                        $insertBidRecapItems  = $this->insertBidRecapItems($asset_ID,$insertID);
                        // Stock Out Quantity Data in ims_stock_in_assets_tbl//
                       
                

                            if(!empty($serialData)){
                                $serials = $serialData;
            
                                $serialDataRecords = [];
                                foreach ($serials as $serial) {
                                        $temp = [
                                        "materialWithdrawalID"  =>  $serial["materialWithdrawalID"] != "null" ? $serial["materialWithdrawalID"] : null,
                                        "materialRequestID"     => $serial["materialRequestID"] != "null" ? $serial["materialRequestID"] : null,
                                        "withdrawalAssetID"      => $withdrawalAssetID,
                                        "assetID"                => $serial["assetID"] != "null" ? $serial["assetID"] : null,
                                        "serialAssetNumber"      => $serial["serialAssetNumber"],
                                        "createdBy"             => $sessionID
                                        ];
                                        array_push($serialDataRecords, $temp);
                                }
            
                                if(!empty($serialDataRecords)){
                              
                                    $saveScopes = $this->db->insert_batch("ims_withdrawal_equipment_borrowing_serial_number_tbl", $serialDataRecords);

                                }
            
                            }
                    }    
        }
     
        if($dataAsset && count($dataAsset) > 0){


             // START UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
             $query = $this->db->query("UPDATE  ims_equipment_borrowing_tbl
             SET employeeID = IF(employeeID = 0, $sessionID, (SELECT employeeID FROM ims_equipment_borrowing_tbl WHERE equipmentBorrowingID = $equipmentBorrowingID ))
             WHERE equipmentBorrowingID = $equipmentBorrowingID");
             // END UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//

            return $query ? "true|Successfully updated|$equipmentBorrowingID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";

        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveSerials($withdrawalAssetID = null,$assets = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        if ($assets) {
         
            $serialData = [];
            foreach($assets as $index => $asset) {

                if(!empty($asset["serials"])){
                    $serials = $asset["serials"];

                    $serialData = [];
                    foreach ($serials as $serial) {
                            $temp = [
                            "materialWithdrawalID"  =>  $serial["materialWithdrawalID"] != "null" ? $serial["materialWithdrawalID"] : null,
                            "materialRequestID"     => $serial["materialRequestID"] != "null" ? $serial["materialRequestID"] : null,
                            "withdrawalAssetID"      => $withdrawalAssetID,
                            "assetID"                => $serial["assetID"] != "null" ? $serial["assetID"] : null,
                            "serialAssetNumber"      => $serial["serialAssetNumber"],
                            "createdBy"             => $sessionID
                            ];
                            array_push($serialData, $temp);
                    }

                    if(!empty($serialData)){
                  
                        $saveScopes = $this->db->insert_batch("ims_withdrawal_equipment_borrowing_serial_number_tbl", $serialData);
        
                        if ($saveScopes) {
                            return true;
                        }
                        return false;
                    }

                }
            }
        }        
    }

}


