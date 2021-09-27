<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    
    public function savePurchaseRequestData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_purchase_request_tbl", $data);
        } else {
            $where = ["purchaseRequestID" => $id];
            $query = $this->db->update("ims_purchase_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;

            // ----- INSERT PURCHASE ORDER IF APPROVE -----
            $purchaseRequestStatus = $data["purchaseRequestStatus"];
            if ($purchaseRequestStatus == "2")
            {
                $insertPurchaseOrderData = $this->insertPurchaseOrderData($insertID);
            }
            // ----- END INSERT PURCHASE ORDER IF APPROVE -----
            
            $purchaseRequestCode = "";
            if ($action == "insert") {
                $purchaseRequestCode = getFormCode("PR", date("Y-m-d"), $insertID);
                $this->db->update("ims_purchase_request_tbl", ["purchaseRequestCode" => $purchaseRequestCode], ["purchaseRequestID" => $insertID]);
            }
            return "true|$purchaseRequestCode|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($purchaseRequestID, $classification) {
        if ($classification) {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $query = $this->db->delete(
                $table, 
                [
                    "materialRequestID"     => NULL,
                    "inventoryValidationID" => NULL,
                    "bidRecapID"            => NULL,
                    "purchaseRequestID"     => $purchaseRequestID,
                    "purchaseOrderID"       => NULL,
                ]);
            return $query ? true : false;
        }
        return true;
    }

    public function savePurchaseRequestItems($action, $data, $id = null, $classification = "")
    {
        $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id, $classification);
        if ($classification) 
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $query = $this->db->insert_batch($table, $data);
            if ($query) 
            {
                return "true|Successfully submitted";
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getPurchaseRequestItemAssetData($classification = "", $requestItemAssetID = 0)
    {
        if ($classification && $requestItemAssetID) 
        {
            $table  = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $column = $classification == "Items" ? "requestItemID" : "requestAssetID";
            $sql = "SELECT * FROM $table WHERE $column = $requestItemAssetID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }



    

    // ----- ***** INSERT PURCHASE ORDER ***** -----
    public function getPurchaseRequestData($purchaseRequestID = 0)
    {
        $sql = "SELECT * FROM ims_purchase_request_tbl WHERE purchaseRequestID = $purchaseRequestID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function insertPurchaseOrderItems($classification = "", $purchaseRequestID = 0, $purchaseOrderID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        if ($classification) 
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $sql = "SELECT * FROM $table WHERE purchaseRequestID = $purchaseRequestID AND purchaseOrderID IS NULL";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];

            if ($result && count($result) > 0) 
            {
                $data = [];
                foreach($result as $dt) 
                {
                    if ($classification == "Items") 
                    {
                        $costEstimateID        = $dt["costEstimateID"];
                        $billMaterialID        = $dt["billMaterialID"];
                        $materialRequestID     = $dt["materialRequestID"];
                        $inventoryValidationID = $dt["inventoryValidationID"];
                        $bidRecapID            = $dt["bidRecapID"];
                        $purchaseRequestID     = $dt["purchaseRequestID"];
                        $changeRequestID       = $dt["changeRequestID"];
                        $inventoryReceivingID  = $dt["inventoryReceivingID"];
                        $inventoryVendorID     = $dt["inventoryVendorID"];
                        $inventoryVendorCode   = $dt["inventoryVendorCode"];
                        $inventoryVendorName   = $dt["inventoryVendorName"];
                        $finalQuoteRemarks     = $dt["finalQuoteRemarks"];
                        $milestoneBuilderID    = $dt["milestoneBuilderID"];
                        $phaseDescription      = $dt["phaseDescription"];
                        $milestoneListID       = $dt["milestoneListID"];
                        $projectMilestoneID    = $dt["projectMilestoneID"];
                        $projectMilestoneName  = $dt["projectMilestoneName"];
                        $itemID                = $dt["itemID"];
                        $itemCode              = $dt["itemCode"];
                        $itemBrandName         = $dt["itemBrandName"];
                        $itemName              = $dt["itemName"];
                        $itemClassification    = $dt["itemClassification"];
                        $itemCategory          = $dt["itemCategory"];
                        $itemUom               = $dt["itemUom"];
                        $itemDescription       = $dt["itemDescription"];
                        $files                 = $dt["files"];
                        $remarks               = $dt["remarks"];
                        $availableStocks       = $dt["availableStocks"];
                        $requestQuantity       = $dt["requestQuantity"];
                        $reservedItem          = $dt["reservedItem"];
                        $forPurchase           = $dt["forPurchase"];
                        $unitCost              = $dt["unitCost"];
                        $totalCost             = $dt["totalCost"];
                        $createdBy             = $sessionID;
                        $updatedBy             = $sessionID;

                        $data[] = [
                            "costEstimateID"        => $costEstimateID       ,
                            "billMaterialID"        => $billMaterialID       ,
                            "materialRequestID"     => $materialRequestID    ,
                            "inventoryValidationID" => $inventoryValidationID,
                            "bidRecapID"            => $bidRecapID           ,
                            "purchaseRequestID"     => $purchaseRequestID    ,
                            "purchaseOrderID"       => $purchaseOrderID      ,
                            "changeRequestID"       => $changeRequestID      ,
                            "inventoryReceivingID"  => $inventoryReceivingID ,
                            "inventoryVendorID"     => $inventoryVendorID    ,
                            "inventoryVendorCode"   => $inventoryVendorCode  ,
                            "inventoryVendorName"   => $inventoryVendorName  ,
                            "finalQuoteRemarks"     => $finalQuoteRemarks    ,
                            "milestoneBuilderID"    => $milestoneBuilderID   ,
                            "phaseDescription"      => $phaseDescription     ,
                            "milestoneListID"       => $milestoneListID      ,
                            "projectMilestoneID"    => $projectMilestoneID   ,
                            "projectMilestoneName"  => $projectMilestoneName ,
                            "itemID"                => $itemID               ,
                            "itemCode"              => $itemCode             ,
                            "itemBrandName"         => $itemBrandName        ,
                            "itemName"              => $itemName             ,
                            "itemClassification"    => $itemClassification   ,
                            "itemCategory"          => $itemCategory         ,
                            "itemUom"               => $itemUom              ,
                            "itemDescription"       => $itemDescription      ,
                            "files"                 => $files                ,
                            "remarks"               => $remarks              ,
                            "availableStocks"       => $availableStocks      ,
                            "requestQuantity"       => $requestQuantity      ,
                            "reservedItem"          => $reservedItem         ,
                            "forPurchase"           => $forPurchase          ,
                            "unitCost"              => $unitCost             ,
                            "totalCost"             => $totalCost            ,
                            "createdBy"             => $createdBy            ,
                            "updatedBy"             => $updatedBy            ,
                        ];
                    }

                    if ($classification == "Assets")
                    {
                        $costEstimateID        = $dt["costEstimateID"];
                        $billMaterialID        = $dt["billMaterialID"];
                        $materialRequestID     = $dt["materialRequestID"];
                        $inventoryValidationID = $dt["inventoryValidationID"];
                        $bidRecapID            = $dt["bidRecapID"];
                        $purchaseRequestID     = $dt["purchaseRequestID"];
                        $changeRequestID       = $dt["changeRequestID"];
                        $inventoryReceivingID  = $dt["inventoryReceivingID"];
                        $inventoryVendorID     = $dt["inventoryVendorID"];
                        $inventoryVendorCode   = $dt["inventoryVendorCode"];
                        $inventoryVendorName   = $dt["inventoryVendorName"];
                        $finalQuoteRemarks     = $dt["finalQuoteRemarks"];
                        $milestoneBuilderID    = $dt["milestoneBuilderID"];
                        $phaseDescription      = $dt["phaseDescription"];
                        $milestoneListID       = $dt["milestoneListID"];
                        $projectMilestoneID    = $dt["projectMilestoneID"];
                        $projectMilestoneName  = $dt["projectMilestoneName"];
                        $assetID               = $dt["assetID"];
                        $assetCode             = $dt["assetCode"];
                        $assetBrandName        = $dt["assetBrandName"];
                        $assetName             = $dt["assetName"];
                        $assetClassification   = $dt["assetClassification"];
                        $assetCategory         = $dt["assetCategory"];
                        $assetUom              = $dt["assetUom"];
                        $assetDescription      = $dt["assetDescription"];
                        $files                 = $dt["files"];
                        $remarks               = $dt["remarks"];
                        $availableStocks       = $dt["availableStocks"];
                        $requestQuantity       = $dt["requestQuantity"];
                        $reservedAsset         = $dt["reservedAsset"];
                        $forPurchase           = $dt["forPurchase"];
                        $requestManHours       = $dt["requestManHours"];
                        $dateNeeded            = $dt["dateNeeded"];
                        $dateReturn            = $dt["dateReturn"];
                        $actualDateReturn      = $dt["actualDateReturn"];
                        $hourlyRate            = $dt["hourlyRate"];
                        $unitCost              = $dt["unitCost"];
                        $totalCost             = $dt["totalCost"];
                        $createdBy             = $sessionID;
                        $updatedBy             = $sessionID;

                        $data[] = [
                            "costEstimateID"        => $costEstimateID       ,
                            "billMaterialID"        => $billMaterialID       ,
                            "materialRequestID"     => $materialRequestID    ,
                            "inventoryValidationID" => $inventoryValidationID,
                            "bidRecapID"            => $bidRecapID           ,
                            "purchaseRequestID"     => $purchaseRequestID    ,
                            "purchaseOrderID"       => $purchaseOrderID      ,
                            "changeRequestID"       => $changeRequestID      ,
                            "inventoryReceivingID"  => $inventoryReceivingID ,
                            "inventoryVendorID"     => $inventoryVendorID    ,
                            "inventoryVendorCode"   => $inventoryVendorCode  ,
                            "inventoryVendorName"   => $inventoryVendorName  ,
                            "finalQuoteRemarks"     => $finalQuoteRemarks    ,
                            "milestoneBuilderID"    => $milestoneBuilderID   ,
                            "phaseDescription"      => $phaseDescription     ,
                            "milestoneListID"       => $milestoneListID      ,
                            "projectMilestoneID"    => $projectMilestoneID   ,
                            "projectMilestoneName"  => $projectMilestoneName ,
                            "assetID"               => $assetID              ,
                            "assetCode"             => $assetCode            ,
                            "assetBrandName"        => $assetBrandName       ,
                            "assetName"             => $assetName            ,
                            "assetClassification"   => $assetClassification  ,
                            "assetCategory"         => $assetCategory        ,
                            "assetUom"              => $assetUom             ,
                            "assetDescription"      => $assetDescription     ,
                            "files"                 => $files                ,
                            "remarks"               => $remarks              ,
                            "availableStocks"       => $availableStocks      ,
                            "requestQuantity"       => $requestQuantity      ,
                            "reservedAsset"         => $reservedAsset        ,
                            "forPurchase"           => $forPurchase          ,
                            "requestManHours"       => $requestManHours      ,
                            "dateNeeded"            => $dateNeeded           ,
                            "dateReturn"            => $dateReturn           ,
                            "actualDateReturn"      => $actualDateReturn     ,
                            "hourlyRate"            => $hourlyRate           ,
                            "unitCost"              => $unitCost             ,
                            "totalCost"             => $totalCost            ,
                            "createdBy"             => $createdBy            ,
                            "updatedBy"             => $updatedBy            ,
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


    public function insertPurchaseOrderData($purchaseRequestID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $purchaseRequestData = $this->getPurchaseRequestData($purchaseRequestID);
        if ($purchaseRequestData) {

            $purchaseRequestID       = $purchaseRequestData->purchaseRequestID;
            $purchaseRequestCode     = $purchaseRequestData->purchaseRequestCode;
            $costEstimateID          = $purchaseRequestData->costEstimateID;
            $costEstimateCode        = $purchaseRequestData->costEstimateCode;
            $billMaterialID          = $purchaseRequestData->billMaterialID;
            $billMaterialCode        = $purchaseRequestData->billMaterialCode;
            $materialRequestID       = $purchaseRequestData->materialRequestID;
            $materialRequestCode     = $purchaseRequestData->materialRequestCode;
            $inventoryValidationID   = $purchaseRequestData->inventoryValidationID;
            $inventoryValidationCode = $purchaseRequestData->inventoryValidationCode;
            $bidRecapID              = $purchaseRequestData->bidRecapID;
            $bidRecapCode            = $purchaseRequestData->bidRecapCode;
            $timelineBuilderID       = $purchaseRequestData->timelineBuilderID;
            $projectCode             = $purchaseRequestData->projectCode;
            $projectName             = $purchaseRequestData->projectName;
            $projectCategory         = $purchaseRequestData->projectCategory;
            $clientCode              = $purchaseRequestData->clientCode;
            $clientName              = $purchaseRequestData->clientName;
            $clientAddress           = $purchaseRequestData->clientAddress;
            $employeeID              = $purchaseRequestData->employeeID;
            $inventoryVendorID       = $purchaseRequestData->inventoryVendorID;
            $vendorCode              = $purchaseRequestData->vendorCode;
            $vendorName              = $purchaseRequestData->vendorName;
            $vendorContactPerson     = $purchaseRequestData->vendorContactPerson;
            $vendorContactDetails    = $purchaseRequestData->vendorContactDetails;
            $vendorAddress           = $purchaseRequestData->vendorAddress;
            $purchaseRequestClassification = $purchaseRequestData->purchaseRequestClassification;
            $paymentTerms            = $purchaseRequestData->paymentTerms;
            $shippingTerm            = $purchaseRequestData->shippingTerm;
            $shippingDate            = $purchaseRequestData->shippingDate;
            $purchaseRequestReason   = $purchaseRequestData->purchaseRequestReason;
            $total                   = $purchaseRequestData->total;
            $discountType            = $purchaseRequestData->discountType;
            $discount                = $purchaseRequestData->discount;
            $totalAmount             = $purchaseRequestData->totalAmount;
            $vatSales                = $purchaseRequestData->vatSales;
            $vat                     = $purchaseRequestData->vat;
            $totalVat                = $purchaseRequestData->totalVat;
            $lessEwt                 = $purchaseRequestData->lessEwt;
            $grandTotalAmount        = $purchaseRequestData->grandTotalAmount;
            $createdAt               = $purchaseRequestData->createdAt;

            /*
            ----- ***** STATUS ***** ------
            0 - Unsign
            2 - Signed
            4 - Cancelled
            ----- ***** END STATUS ***** ------
            */

            $data = [
                'purchaseOrderCode'       => getFormCode("PO", $createdAt, $purchaseRequestID),
                'costEstimateID'          => $costEstimateID,
                'costEstimateCode'        => $costEstimateCode,
                'billMaterialID'          => $billMaterialID,
                'billMaterialCode'        => $billMaterialCode,
                'materialRequestID'       => $materialRequestID,
                'materialRequestCode'     => $materialRequestCode,
                'inventoryValidationID'   => $inventoryValidationID,
                'inventoryValidationCode' => $inventoryValidationCode,
                'bidRecapID'              => $bidRecapID,
                'bidRecapCode'            => $bidRecapCode,
                'purchaseRequestID'       => $purchaseRequestID,
                'purchaseRequestCode'     => $purchaseRequestCode,
                'timelineBuilderID'       => $timelineBuilderID,
                'projectCode'             => $projectCode,
                'projectName'             => $projectName,
                'projectCategory'         => $projectCategory,
                'clientCode'              => $clientCode,
                'clientName'              => $clientName,
                'clientAddress'           => $clientAddress,
                'employeeID'              => 0,
                'inventoryVendorID'       => $inventoryVendorID,
                'vendorCode'              => $vendorCode,
                'vendorName'              => $vendorName,
                'vendorContactPerson'     => $vendorContactPerson,
                'vendorContactDetails'    => $vendorContactDetails,
                'vendorAddress'           => $vendorAddress,
                'purchaseOrderClassification' => $purchaseRequestClassification,
                'paymentTerms'            => $paymentTerms,
                'shippingTerm'            => $shippingTerm,
                'shippingDate'            => $shippingDate,
                'purchaseOrderReason'     => $purchaseRequestReason,
                'total'                   => $total,
                'discountType'            => $discountType,
                'discount'                => $discount,
                'totalAmount'             => $totalAmount,
                'vatSales'                => $vatSales,
                'vat'                     => $vat,
                'totalVat'                => $totalVat,
                'lessEwt'                 => $lessEwt,
                'grandTotalAmount'        => $grandTotalAmount,
                'purchaseOrderStatus'     => 0,
                'createdBy'               => $employeeID,
                'updatedBy'               => $sessionID,
            ];

            $query = $this->db->insert("ims_purchase_order_tbl", $data);
            if ($query) {
                $insertID = $this->db->insert_id();
                $this->insertPurchaseOrderItems($purchaseRequestClassification, $purchaseRequestID, $insertID);
                return true;
            }
            return false;
        }
        
        return false;
    }
}