<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class StockOut_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
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
        $sql    = "
            SELECT 
                * ,
                (SELECT withdrawalItemStatus  
                    FROM ims_material_withdrawal_item_tbl 
                    WHERE  materialRequestID = ims_request_items_tbl.materialRequestID AND itemID = ims_request_items_tbl.itemID AND withdrawalItemStatus = 1 ) AS withdrawalItemStatus
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
                    'stockInItemID'          => $requestItems[0]['stockInItemID'],
                    'returnItemID'          => $requestItems[0]['returnItemID'],
                    'materialUsageID'       => $requestItems[0]['materialUsageID'],
                    'inventoryReceivingID'   => $requestItems[0]['inventoryReceivingID'],
                    'stockOutID'            => $requestItems[0]['stockOutID'],
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
                    'ManufactureDate'        => $requestItems[0]['ManufactureDate'],
                    'barcode'         => $requestItems[0]['barcode'],
                    'quantity'      => $requestItems[0]['quantity'],
                    'createAt'    => $sessionID,
                );
            // }

            $this->db->where('stockInItemID', $insertID);
            $this->db->update('ims_stock_in_item_tbl', $data);
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
                //     $withdrawalItemID = $this->db->insert_id();
                //     $item_ID = $dataItem['itemID'];
                //     $getAvailableStocks = $this->db->query("SELECT CASE
                //         WHEN IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0) <0 THEN 0
                //         ELSE IFNULL(SUM(itmStock.quantity),0)-IFNULL(reOrderLevel,0)
                //         END AS availableStocks

                //         FROM 

                //         ims_stock_in_item_tbl AS itmStock 
                //         JOIN ims_inventory_item_tbl AS itm ON itm.itemID = itmStock.itemID

                //         WHERE
                //         itmStock.stockOutDate IS NUll 
                //         AND itmStock.stockInDate IS NOT NULL 
                //         AND itmStock.itemID = $item_ID  ");

                //         $stockInResult =  $getAvailableStocks->result_array();

                //     $deductionStocks =  $stockInResult[0]["availableStocks"] - $dataItem["stockOut"];
                //     echo $stockInResult[0]["availableStocks"]; 
                //     $data = array(
                //         'stockOutID' => $stockOutID,
                //         'quantity' => $deductionStocks,
                //         'stockOutDate' => date("Y-m-d")
                // );

                
                // $this->db->insert('ims_stock_in_item_tbl', $data);
                
                $insertID = $this->db->insert_id();

                // $insertBidRecapItems  = $this->insertBidRecapItems($item_ID,$insertID);


            
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
                    
                                    // if ($saveScopes) {
                                    //     return true;
                                    // }
                                    // return false;
                                    
                                }
            
                            }
                        
            
                        
                        
                        // if ($inventoryReceivingData["inventoryReceivingStatus"] == "2") {
                        //     $this->inventoryreceiving->updateOrderedPending($inventoryReceivingID);
                        // }
                    }    
        }
     
        if($dataItem && count($dataItem) > 0){

            return $query ? "true|Successfully updated|$materialWithdrawalID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";

             // START UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
             $query = $this->db->query("UPDATE  ims_stock_out_tbl
             SET employeeID = IF(employeeID = '', $sessionID, (SELECT employeeID FROM ims_stock_out_tbl WHERE stockOutID = $stockOutID ))
             WHERE stockOutID = $stockOutID");
             // END UPDATE THE MATERIAL WITHDRAWAL DOCUMENT STATUS AND EMPLOYEE ID//
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

            
            
            // if ($inventoryReceivingData["inventoryReceivingStatus"] == "2") {
            //     $this->inventoryreceiving->updateOrderedPending($inventoryReceivingID);
            // }
        }        
    }

}


