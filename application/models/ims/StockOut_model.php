<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class StockOut_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }


    public function getStockOutData($stockOutID = null){
        $sql    = "SELECT * FROM ims_stock_out_tbl WHERE stockOutID = '$stockOutID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function saveStockOutData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("ims_stock_out_tbl", $data);
        } else {
            $where = ["stockOutID" => $id];
            $query = $this->db->update("ims_stock_out_tbl", $data, $where);
        }

        if ($query) {
            $insertID           = $action == "insert" ? $this->db->insert_id() : $id;
            $stockOutData   = $this->getStockOutData($insertID);
            $stockOutCode   = "STO-".date_format(date_create($stockOutData->createdAt),"y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr          = ["stockOutCode"=> $stockOutCode ];
            $this->db->update("ims_stock_out_tbl", $updateArr, ["stockOutID" => $insertID]);
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }



    // ----- GET TIMELINE CONTENT -----
    public function getMaterialWithdrawalDetails($stockOutID = 0)
    {
        $sql = "
        SELECT 
        ims_stock_out_tbl.*,CONCAT(employeeFirstname, ' ', employeeLastname) AS employeeFullname,dept.departmentName as employeeDepartment,design.designationName as employeeDesignation
        FROM 
            ims_stock_out_tbl 
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
            LEFT JOIN hris_department_tbl AS dept ON dept.departmentID = helt.departmentID
            LEFT JOIN hris_designation_tbl as design ON design.designationID  = helt.designationID
        WHERE 
            stockOutID = $stockOutID";
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
                "barcode"     => $itmRecord["barcode"],
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
        $sql    = "SELECT
        ims_request_items_tbl.*,
            (SELECT DISTINCT(withdrawalItemStatus)
            FROM ims_material_withdrawal_item_tbl 
            WHERE materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1  ) AS withdrawalItemStatus 
        FROM ims_request_items_tbl 
        WHERE inventoryValidationID = $inventoryValidationID  AND bidRecapID IS NULL
            -- SELECT 
            --     * ,
            --     (SELECT DISTINCT(materialRequestID), IF(EXISTS(SELECT * FROM ims_material_withdrawal_item_tbl WHERE withdrawalItemStatus =0),0,1)  FROM ims_material_withdrawal_item_tbl WHERE  materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1 ) AS withdrawalItemStatus
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
                "items"              => $this->getItemList($inventoryValidationID)
                
            ];
            array_push($output, $temp);
        // }
        return $output;
    }

    public function getTimelineContent($stockOutID = 1)
    {
        $output = [];
        $details = $this->getMaterialWithdrawalDetails($stockOutID);
        if ($details) {
            $output["stockOutID"]    = $details->stockOutID;
            $output["stockOutCode"]    = $details->stockOutCode;
            $output["materialWithdrawalID"]    = $details->materialWithdrawalID;
            $output["employeeID"]           = $details->employeeID;
            $output["materialWithdrawalCode"] = $details->materialWithdrawalCode;
            $output["inventoryItemStatus"] = $details->inventoryItemStatus;
            $output["inventoryAssetStatus"] = $details->inventoryAssetStatus;
            $output["stockOutStatus"] = $details->stockOutStatus;
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
            $output["stockOutReason"] = $details->stockOutReason;
            $output["stockOutRemarks"] = $details->stockOutRemarks;
            $output["employeeFullname"] = $details->employeeFullname;
            $output["employeeDepartment"] = $details->employeeDepartment;
            $output["employeeDesignation"] = $details->employeeDesignation;

            


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

    public function getInventoryStockInItems($itemID = 0)
    {
        $sql = "SELECT *  FROM ims_stock_in_item_tbl WHERE stockOutDate IS NUll 
        AND stockInDate IS NOT NULL 
        AND itemID = '$itemID'
        GROUP BY itemID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertBidRecapItems($itemID = 0,$insertID =0)
    {
        $requestItems = $this->getInventoryStockInItems($itemID);

       
      
        if ($requestItems && count($requestItems) > 0)
        {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

            $data = [];
            // foreach($requestItems as $item)
            // {
                $data = array(
                    'inventoryCode'       => $requestItems[0]['inventoryCode'],
                    'inventoryStorageID'         => $requestItems[0]['inventoryStorageID'],
                    'inventoryStorageCode'         => $requestItems[0]['inventoryStorageCode'],
                    'inventoryStorageOfficeName'    => $requestItems[0]['inventoryStorageOfficeName'],
                    'itemID'       => $requestItems[0]['itemID'],
                    'itemCode' => $requestItems[0]['itemCode'],
                    'itemName'     => $requestItems[0]['itemName'],
                    'brand'    => $requestItems[0]['brand'],
                    'classificationName'       => $requestItems[0]['classificationName'],
                    'categoryName'     => $requestItems[0]['categoryName'],
                    'serialNumber'     => $requestItems[0]['serialNumber'],
                    'ExpirationDate'      => $requestItems[0]['ExpirationDate'],
                    'ManufactureDate'        => $requestItems[0]['ManufactureDate']
                );
            // }

            $this->db->where('stockInItemID', $insertID);
            $query = $this->db->update('ims_stock_in_item_tbl', $data);

   

            return $query ? true : false;
        }
        return false;
    }


    public function saveProjectBoard($materialWithdrawalID = 0, $dataItem =[],$materialRequestID =0,$serialData = [],$stockOutID =  null )
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

       
        if ($dataItem && count($dataItem) > 0) {

               $query =  $this->db->insert('ims_material_withdrawal_item_tbl', $dataItem);
               
                    
                if($query){
                    $withdrawalItemID = $this->db->insert_id();
                    $item_ID = $dataItem['itemID'];
                    $requestStocks =  $dataItem["stockOut"];

                        // Update the stock in records in imd_stock_in_item_tbl//
                        $getSpecificAvailableStocks = $this->db->query("SELECT stockInItemID,quantity,expirationDate
                        FROM 
                        ims_stock_in_item_tbl 
                        WHERE
                        stockOutDate IS NUll 
                        AND stockInDate IS NOT NULL 
                        AND ( returnItemID IS NOT NULL OR inventoryReceivingID IS NOT NULL )
                        AND itemID = '$item_ID' 
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

                                $this->db->where('stockInItemID', $stockInStocksResult[$loop]['stockInItemID']);
                                $this->db->update('ims_stock_in_item_tbl', $data);
                            }


                        // End update the stock in records in imd_stock_in_item_tbl//
                       

                        // Stock Out Quantity Data in ims_stock_in_item_tbl//
                        $getAvailableStocks = $this->db->query("SELECT returnItemID, stockOutID, quantity as availableStocks
                        FROM 
                        ims_stock_in_item_tbl 
                        WHERE
                        stockOutDate IS NUll 
                        AND stockInDate IS NOT NULL 
                        AND itemID = $item_ID  ");

                        $stockInResult =  $getAvailableStocks->result_array();

                        // $deductionStocks =  $stockInResult[0]["availableStocks"] - $requestStocks;

                        $data = array(
                            'stockOutID' => $stockOutID,
                            'barcode' => $dataItem["barcode"],
                            'quantity' => $dataItem["stockOut"],
                            'stockOutDate' => date("Y-m-d")
                        );

                        $this->db->insert('ims_stock_in_item_tbl', $data);

                        $insertID = $this->db->insert_id();

                        $insertBidRecapItems  = $this->insertBidRecapItems($item_ID,$insertID);
                        // Stock Out Quantity Data in ims_stock_in_item_tbl//
                       
                

                            if(!empty($serialData)){
                                $serials = $serialData;
            
                                $serialDataRecords = [];
                                foreach ($serials as $serial) {
                                        $temp = [
                                        "materialWithdrawalID"  =>  $serial["materialWithdrawalID"] != "null" ? $serial["materialWithdrawalID"] : null,
                                        "materialRequestID"     => $serial["materialRequestID"] != "null" ? $serial["materialRequestID"] : null,
                                        "withdrawalItemID"      => $withdrawalItemID,
                                        "itemID"                => $serial["itemID"] != "null" ? $serial["itemID"] : null,
                                        "serialItemNumber"      => $serial["serialItemNumber"],
                                        "createdBy"             => $sessionID
                                        ];
                                        array_push($serialDataRecords, $temp);
                                }
            
                                if(!empty($serialDataRecords)){
                              
                                    $saveScopes = $this->db->insert_batch("ims_withdrawal_stockout_serial_number_tbl", $serialDataRecords);

                                }
            
                            }
                    }    
        }
     
        if($dataItem && count($dataItem) > 0){


             // START UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
             $query = $this->db->query("UPDATE  ims_stock_out_tbl
             SET employeeID = IF(employeeID = '', $sessionID, (SELECT employeeID FROM ims_stock_out_tbl WHERE stockOutID = $stockOutID ))
             WHERE stockOutID = $stockOutID");
             // END UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//

            return $query ? "true|Successfully updated|$stockOutID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";

        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveSerials($withdrawalItemID = null,$items = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        if ($items) {
         
            $serialData = [];
            foreach($items as $index => $item) {

                if(!empty($item["serials"])){
                    $serials = $item["serials"];

                    $serialData = [];
                    foreach ($serials as $serial) {
                            $temp = [
                            "materialWithdrawalID"  =>  $serial["materialWithdrawalID"] != "null" ? $serial["materialWithdrawalID"] : null,
                            "materialRequestID"     => $serial["materialRequestID"] != "null" ? $serial["materialRequestID"] : null,
                            "withdrawalItemID"      => $withdrawalItemID,
                            "itemID"                => $serial["itemID"] != "null" ? $serial["itemID"] : null,
                            "serialItemNumber"      => $serial["serialItemNumber"],
                            "createdBy"             => $sessionID
                            ];
                            array_push($serialData, $temp);
                    }

                    if(!empty($serialData)){
                  
                        $saveScopes = $this->db->insert_batch("ims_withdrawal_stockout_serial_number_tbl", $serialData);
        
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


