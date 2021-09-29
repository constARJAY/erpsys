<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BidRecap_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getBidRecapRequestItems($bidRecapID = 0, $finalQuoteID = 0)
    {
        $where = $finalQuoteID ? "finalQuoteID = $finalQuoteID" : "1=1";
        $sql = "SELECT * FROM ims_request_items_tbl WHERE bidRecapID = $bidRecapID AND purchaseRequestID IS NULL AND $where";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getBidRecapRequestAssets($bidRecapID = 0, $finalQuoteID = 0)
    {
        $where = $finalQuoteID ? "finalQuoteID = $finalQuoteID" : "1=1";
        $sql = "SELECT * FROM ims_request_assets_tbl WHERE bidRecapID = $bidRecapID AND purchaseRequestID IS NULL AND $where";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getBidRecapFinalQuotes($bidRecapID = 0)
    {
        $sql = "SELECT * FROM ims_final_quote_tbl WHERE bidRecapID = $bidRecapID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function saveBidRecapDetails(
        $bidRecapRequestItems  = [], 
        $bidRecapRequestAssets = [], 
        $bidRecapFinalQuotes   = [],
        $bidRecapID            = 0)
    {
        if ($bidRecapRequestItems && count($bidRecapRequestItems) > 0)
        {
            $itemsData = [];
            foreach($bidRecapRequestItems as $item)
            {
                $itemsData[] = [
                    "costEstimateID"          => $item["costEstimateID"],
                    "billMaterialID"          => $item["billMaterialID"],
                    "materialRequestID"       => $item["materialRequestID"],
                    "inventoryValidationID"   => $item["inventoryValidationID"],
                    "bidRecapID"              => $bidRecapID,
                    "finalQuoteID"            => $item["finalQuoteID"],
                    "purchaseRequestID"       => $item["purchaseRequestID"],
                    "purchaseOrderID"         => $item["purchaseOrderID"],
                    "changeRequestID"         => $item["changeRequestID"],
                    "inventoryReceivingID"    => $item["inventoryReceivingID"],
                    "candidateVendorID"       => $item["candidateVendorID"],
                    "candidateSelectedVendor" => $item["candidateSelectedVendor"],
                    "candidateVendorName"     => $item["candidateVendorName"],
                    "candidateVendorPrice"    => $item["candidateVendorPrice"],
                    "inventoryVendorID"       => $item["inventoryVendorID"],
                    "inventoryVendorCode"     => $item["inventoryVendorCode"],
                    "inventoryVendorName"     => $item["inventoryVendorName"],
                    "milestoneBuilderID"      => $item["milestoneBuilderID"],
                    "phaseDescription"        => $item["phaseDescription"],
                    "milestoneListID"         => $item["milestoneListID"],
                    "projectMilestoneID"      => $item["projectMilestoneID"],
                    "projectMilestoneName"    => $item["projectMilestoneName"],
                    "itemID"                  => $item["itemID"],
                    "itemCode"                => $item["itemCode"],
                    "itemBrandName"           => $item["itemBrandName"],
                    "itemName"                => $item["itemName"],
                    "itemClassification"      => $item["itemClassification"],
                    "itemCategory"            => $item["itemCategory"],
                    "itemUom"                 => $item["itemUom"],
                    "itemDescription"         => $item["itemDescription"],
                    "files"                   => $item["files"],
                    "remarks"                 => $item["remarks"],
                    "availableStocks"         => $item["availableStocks"],
                    "requestQuantity"         => $item["requestQuantity"],
                    "reservedItem"            => $item["reservedItem"],
                    "forPurchase"             => $item["forPurchase"],
                    "unitCost"                => $item["unitCost"],
                    "totalCost"               => $item["totalCost"],
                    "createdBy"               => $item["createdBy"],
                    "updatedBy"               => $item["updatedBy"],
                ];
            }
            if ($itemsData && count($itemsData) > 0)
            {
                $query = $this->db->insert_batch("ims_request_items_tbl", $itemsData);
            }
        }

        if ($bidRecapRequestAssets && count($bidRecapRequestAssets) > 0)
        {
            $assetsData = [];
            foreach($bidRecapRequestAssets as $asset)
            {
                $assetsData[] = [
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
            if ($assetsData && count($assetsData) > 0)
            {
                $query = $this->db->insert_batch("ims_request_assets_tbl", $assetsData);
            }
        }

        if ($bidRecapFinalQuotes && count($bidRecapFinalQuotes) > 0)
        {
            $finalQuoteData = [];
            foreach($bidRecapFinalQuotes as $quote)
            {
                $finalQuoteData[] = [
                    'bidRecapID'           => $bidRecapID,
                    'classification'       =>  $quote['classification'],
                    'inventoryVendorID'    => $quote['inventoryVendorID'],
                    'vendorCode'           => $quote['vendorCode'],
                    'vendorName'           => $quote['vendorName'],
                    'vendorAddress'        => $quote['vendorAddress'],
                    'vendorContactDetails' => $quote['vendorContactDetails'],
                    'vendorContactPerson'  => $quote['vendorContactPerson'],
                    'finalQuoteRemarks'    => $quote['finalQuoteRemarks'],
                    'finalQuoteTotal'      => $quote['finalQuoteTotal'],
                    'createdBy'            => $quote['createdBy'],
                    'updatedBy'            => $quote['updatedBy'],

                ];
            }
            if ($finalQuoteData && count($finalQuoteData) > 0)
            {
                $query = $this->db->insert_batch("ims_final_quote_tbl", $finalQuoteData);
            }
        }

        return true;
    }

    public function saveBidRecapData($action, $data, $id = null, $revise = false) 
    {
        if ($action == "insert")
        {
            $query = $this->db->insert("ims_bid_recap_tbl", $data);
        } 
        else 
        {
            $where = ["bidRecapID" => $id];
            $query = $this->db->update("ims_bid_recap_tbl", $data, $where);
        }

        if ($query) {
            $bidRecapID = $action == "insert" ? $this->db->insert_id() : $id;
            $bidRecapCode = "";
            if ($action == "insert") 
            {
                $bidRecapCode = getFormCode("BR", date("Y-m-d"), $bidRecapID);
                $this->db->update("ims_bid_recap_tbl", ["bidRecapCode" => $bidRecapCode], ["bidRecapID" => $bidRecapID]);

                if ($revise)
                {
                    $bidRecapRequestItems  = $this->getBidRecapRequestItems($id);
                    $bidRecapRequestAssets = $this->getBidRecapRequestAssets($id);
                    $bidRecapFinalQuotes   = $this->getBidRecapFinalQuotes($id);
                    $saveBidRecapDetails   = $this->saveBidRecapDetails($bidRecapRequestItems, $bidRecapRequestAssets, $bidRecapFinalQuotes, $bidRecapID);
                }
            }
            return "true|$bidRecapCode|$bidRecapID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getBidRecapData($bidRecapID = 0)
    {
        $sql = "SELECT * FROM ims_bid_recap_tbl WHERE bidRecapID = $bidRecapID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function reviseBidRecap($bidRecapID = 0)
    {
        $bidRecapData = $this->getBidRecapData($bidRecapID);
        $data = [];
        if ($bidRecapData)
        {
            $data = [
                'reviseBidRecapID'        => $bidRecapData->bidRecapID,
                'reviseBidRecapCode'      => $bidRecapData->bidRecapCode,
                'costEstimateID'          => $bidRecapData->costEstimateID,
                'costEstimateCode'        => $bidRecapData->costEstimateCode,
                'billMaterialID'          => $bidRecapData->billMaterialID,
                'billMaterialCode'        => $bidRecapData->billMaterialCode,
                'materialRequestID'       => $bidRecapData->materialRequestID,
                'materialRequestCode'     => $bidRecapData->materialRequestCode,
                'inventoryValidationID'   => $bidRecapData->inventoryValidationID,
                'inventoryValidationCode' => $bidRecapData->inventoryValidationCode,
                'timelineBuilderID'       => $bidRecapData->timelineBuilderID,
                'projectCode'             => $bidRecapData->projectCode,
                'projectName'             => $bidRecapData->projectName,
                'projectCategory'         => $bidRecapData->projectCategory,
                'clientCode'              => $bidRecapData->clientCode,
                'clientName'              => $bidRecapData->clientName,
                'clientAddress'           => $bidRecapData->clientAddress,
                'employeeID'              => $bidRecapData->employeeID,
                'bidRecapReason'          => $bidRecapData->bidRecapReason,
                'approversID'             => null,
                'approversDate'           => null,
                'approversStatus'         => null,
                'bidRecapStatus'          => 0,
                'bidRecapRemarks'         => null,
                'assetFinalQuoteStatus'   => 0,
                'itemFinalQuoteStatus'    => 0,
                'submittedAt'             => null,
                'createdBy'               => $bidRecapData->createdBy,
                'updatedBy'               => $bidRecapData->updatedBy,
            ];
        }
        return $this->saveBidRecapData("insert", $data, $bidRecapID, true);
    }

    public function updateBidRecapData($bidRecapID = 0, $classification)
    {
        $column = $classification == "Items" ? "itemFinalQuoteStatus" : "assetFinalQuoteStatus";
        $data   = [$column => 1];
        $where  = ["bidRecapID" => $bidRecapID];
        $query  = $this->db->update("ims_bid_recap_tbl", $data, $where);
        return $query ? true : false;
    }

    public function getRequestItems($requestItemID = 0)
    {
        $sql = "SELECT * FROM ims_request_items_tbl WHERE requestItemID = $requestItemID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function saveBidRecapItems($itemsData = [])
    {
        if ($itemsData && count($itemsData) > 0) 
        {
            $query = $this->db->update_batch("ims_request_items_tbl", $itemsData, "requestItemID");
            return true;
        }
        return false;
    }

    public function getRequestAssets($requestAssetID = 0)
    {
        $sql = "SELECT * FROM ims_request_assets_tbl WHERE requestAssetID = $requestAssetID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function saveBidRecapAsset($assetsData = [])
    {
        if ($assetsData && count($assetsData) > 0) {
            $query = $this->db->update_batch("ims_request_assets_tbl", $assetsData, "requestAssetID");
            return true;
        }
        return false;
    }

    public function deleteBidRecapFinalQuote($bidRecapID = 0)
    {
        $where = ["bidRecapID" => $bidRecapID];
        $query = $this->db->delete("ims_final_quote_tbl", $where);

        $whereItemAsset = [
            "bidRecapID"        => $bidRecapID,
            "purchaseRequestID" => NULL
        ];
        $queryItems  = $this->db->update("ims_request_items_tbl", ["finalQuoteID" => NULL], $whereItemAsset);
        $queryAssets = $this->db->update("ims_request_assets_tbl", ["finalQuoteID" => NULL], $whereItemAsset);

        return $query ? true : false;
    }

    public function updateRequestItemAsset($bidRecapID = 0, $inventoryVendorID = 0, $finalQuoteID = 0, $table)
    {
        $where = [
            "bidRecapID"        => $bidRecapID,
            "inventoryVendorID" => $inventoryVendorID,
            "purchaseRequestID" => NULL
        ];
        $query = $this->db->update($table, ["finalQuoteID" => $finalQuoteID], $where);
        return $query ? true : false;
    }

    public function saveBidRecapFinalQuote($finalQuoteData = [], $bidRecapID = 0, $inventoryVendorID = 0, $classification = "")
    {
        $query = $this->db->insert("ims_final_quote_tbl", $finalQuoteData);
        if ($query) 
        {
            $finalQuoteID = $this->db->insert_id();
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $updateRequestItemAsset = $this->updateRequestItemAsset($bidRecapID, $inventoryVendorID, $finalQuoteID, $table);
            return $updateRequestItemAsset ? true : false;
        }
        return false;
    }





    // ----- ***** FINAL QUOTE ***** -----
    public function getFinalQuoteVendor($classification = "", $bidRecapID = 0) 
    {
        if ($classification && $bidRecapID)
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $sql = "
            SELECT 
                iivt.*,
                CONCAT(
                    (IF (inventoryVendorUnit <> NULL OR inventoryVendorUnit <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorUnit, 1)), LCASE(SUBSTRING(inventoryVendorUnit, 2)),', '),
                        '')),
                    (IF (inventoryVendorBuilding <> NULL OR inventoryVendorBuilding <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorBuilding, 1)), LCASE(SUBSTRING(inventoryVendorBuilding, 2)),', '),
                        '')),
                    (IF (inventoryVendorStreet <> NULL OR inventoryVendorStreet <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorStreet, 1)), LCASE(SUBSTRING(inventoryVendorStreet, 2)),', '),
                        '')),
                    (IF (inventoryVendorSubdivision <> NULL OR inventoryVendorSubdivision <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorSubdivision, 1)), LCASE(SUBSTRING(inventoryVendorSubdivision, 2)),', '),
                        '')),
                    (IF (inventoryVendorCity <> NULL OR inventoryVendorCity <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorCity, 1)), LCASE(SUBSTRING(inventoryVendorCity, 2)),', '),
                        '')),
                    (IF (inventoryVendorProvince <> NULL OR inventoryVendorProvince <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorProvince, 1)), LCASE(SUBSTRING(inventoryVendorProvince, 2)),', '),
                        '')),
                    (IF (inventoryVendorCountry <> NULL OR inventoryVendorCountry <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorCountry, 1)), LCASE(SUBSTRING(inventoryVendorCountry, 2)),', '),
                        '')),
                    (IF (inventoryVendorZipCode <> NULL OR inventoryVendorZipCode <> '', 
                        CONCAT(UCASE(LEFT(inventoryVendorZipCode, 1)), LCASE(SUBSTRING(inventoryVendorZipCode, 2)),''),
                        ''))
                ) AS vendorAddress,
                CONCAT(
                    IF(inventoryVendorMobile, inventoryVendorMobile, '-'), ' / ', IF(inventoryVendorTelephone, inventoryVendorTelephone, '-')) AS vendorContactDetails,
                inventoryVendorPerson AS vendorContactPerson
            FROM 
                $table AS tbl 
                LEFT JOIN ims_inventory_vendor_tbl AS iivt USING(inventoryVendorID)
            WHERE 
                tbl.bidRecapID = $bidRecapID 
                AND tbl.purchaseRequestID IS NULL 
            GROUP BY tbl.inventoryVendorID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getFinalQuoteItemAssets($classification = "", $bidRecapID = 0, $inventoryVendorID = 0)
    {
        if ($classification && $bidRecapID && $inventoryVendorID)
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $sql = "
            SELECT
                *
            FROM
                $table
            WHERE 
                bidRecapID = $bidRecapID
                AND purchaseRequestID IS NULL
                AND inventoryVendorID = $inventoryVendorID";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getFinalQuoteData($bidRecapID = 0, $classification = "")
    {
        $where = $classification ? "classification = '$classification'" : "1=1";
        $sql = "
        SELECT 
            ims_final_quote_tbl.*, 
            costEstimateID,
            costEstimateCode,
            billMaterialID,
            billMaterialCode,
            materialRequestID,
            materialRequestCode,
            inventoryValidationID,
            inventoryValidationCode,
            bidRecapID,
            bidRecapCode,
            bidRecapStatus,
            timelineBuilderID,
            projectCode,
            projectName,
            projectCategory,
            clientCode,
            clientName,
            clientAddress,
            employeeID,
            dateNeeded
        FROM 
            ims_final_quote_tbl
            LEFT JOIN ims_bid_recap_tbl USING(bidRecapID)
        WHERE bidRecapID = $bidRecapID AND $where";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getFinalQuoteRemarks($bidRecapID = 0, $classification = "", $inventoryVendorID = 0)
    {
        $sql = "SELECT finalQuoteRemarks FROM ims_final_quote_tbl WHERE bidRecapID = $bidRecapID AND classification = '$classification' AND inventoryVendorID = $inventoryVendorID";
        $query = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->finalQuoteRemarks : "";
    }

    public function getGeneratedFinalQuote($bidRecapID = 0, $classification = "")
    {
        $result = [];
        $finalQuote = $this->getFinalQuoteData($bidRecapID, $classification);
        if ($finalQuote && count($finalQuote) > 0 && ($finalQuote[0]["bidRecapStatus"] != 0 && $finalQuote[0]["bidRecapStatus"] != 4)) 
        {
            foreach($finalQuote as $quote)
            {
                $inventoryVendorID    = $quote["inventoryVendorID"];
                $vendorCode           = $quote["vendorCode"];
                $vendorName           = $quote["vendorName"];
                $vendorAddress        = $quote["vendorAddress"];
                $vendorContactDetails = $quote["vendorContactDetails"];
                $vendorContactPerson  = $quote["vendorContactPerson"];
                $finalQuoteRemarks    = $quote["finalQuoteRemarks"];
                $finalQuoteTotal      = $quote["finalQuoteTotal"];

                $data = $this->getFinalQuoteItemAssets($classification, $bidRecapID, $inventoryVendorID);

                $result[] = [
                    "bidRecapID"           => $bidRecapID,
                    "inventoryVendorID"    => $inventoryVendorID,
                    "vendorCode"           => $vendorCode,
                    "vendorName"           => $vendorName,
                    "vendorAddress"        => $vendorAddress,
                    "vendorContactDetails" => $vendorContactDetails,
                    "vendorContactPerson"  => $vendorContactPerson,
                    "finalQuoteRemarks"    => $finalQuoteRemarks,
                    "finalQuoteTotal"      => $finalQuoteTotal,
                    "data" => $data
                ];
            }
        } else {
            $vendors = $this->getFinalQuoteVendor($classification, $bidRecapID);
            foreach($vendors as $vendor)
            {
                $inventoryVendorID    = $vendor["inventoryVendorID"] ?? 0;
                $vendorCode           = $vendor["inventoryVendorCode"];
                $vendorName           = $vendor["inventoryVendorName"];
                $vendorAddress        = $vendor["vendorAddress"];
                $vendorContactDetails = $vendor["vendorContactDetails"];
                $vendorContactPerson  = $vendor["vendorContactPerson"];

                $data = $this->getFinalQuoteItemAssets($classification, $bidRecapID, $inventoryVendorID);
                $finalQuoteRemarks = $this->getFinalQuoteRemarks($bidRecapID, $classification, $inventoryVendorID);

                $result[] = [
                    "bidRecapID"           => $bidRecapID,
                    "inventoryVendorID"    => $inventoryVendorID,
                    "vendorCode"           => $vendorCode,
                    "vendorName"           => $vendorName,
                    "vendorAddress"        => $vendorAddress,
                    "vendorContactDetails" => $vendorContactDetails,
                    "vendorContactPerson"  => $vendorContactPerson,
                    "finalQuoteRemarks"    => $finalQuoteRemarks,
                    "finalQuoteTotal"      => 0,
                    "data" => $data
                ];
            }
        }

        return $result;
    }

    public function getFinalQuote($classification = "", $bidRecapID = 0)
    {
        if ($classification && $bidRecapID) 
        {
            $bidRecapData = $this->getBidRecapData($bidRecapID);
            $itemFinalQuote = $assetFinalQuote = false;
            if ($bidRecapData) 
            {
                $itemFinalQuote  = $bidRecapData->itemFinalQuoteStatus != 0 && $bidRecapData->itemFinalQuoteStatus != null; 
                $assetFinalQuote = $bidRecapData->assetFinalQuoteStatus != 0 && $bidRecapData->assetFinalQuoteStatus != null; 
            }

            if (($classification == "Items" && $itemFinalQuote) || ($classification == "Assets" && $assetFinalQuote)) 
            {
                return $this->getGeneratedFinalQuote($bidRecapID, $classification);
            } 
            
        }
        return [];
    }
    // ----- ***** END FINAL QUOTE ***** -----





    // ----- ***** PURCHASE REQUEST ***** -----
    public function insertPurchaseRequestItems($bidRecapID = 0, $finalQuoteID = 0, $purchaseRequestID = 0)
    {
        $requestItems = $this->getBidRecapRequestItems($bidRecapID, $finalQuoteID);
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
                    'bidRecapID'              => $item['bidRecapID'],
                    'finalQuoteID'            => $item['finalQuoteID'],
                    'purchaseRequestID'       => $purchaseRequestID,
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

    public function insertPurchaseRequestAssets($bidRecapID = 0, $finalQuoteID = 0, $purchaseRequestID = 0)
    {
        $requestAssets = $this->getBidRecapRequestAssets($bidRecapID, $finalQuoteID);
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
                    'bidRecapID'              => $asset['bidRecapID'],
                    'finalQuoteID'            => $asset['finalQuoteID'],
                    'purchaseRequestID'       => $purchaseRequestID,
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

    public function insertPurchaseRequestItemAssetData($bidRecapID = 0, $finalQuoteID = 0, $classification = "", $purchaseRequestID = 0)
    {
        if ($classification == "Items")
        {
            $insertPurchaseRequestItems = $this->insertPurchaseRequestItems($bidRecapID, $finalQuoteID, $purchaseRequestID);
        }
        if ($classification == "Assets")
        {
            $insertPurchaseRequestAssets = $this->insertPurchaseRequestAssets($bidRecapID, $finalQuoteID, $purchaseRequestID);
        }
    }

    public function insertPurchaseRequestData($bidRecapID = 0)
    {
        $finalQuoteData = $this->getFinalQuoteData($bidRecapID);
        if ($finalQuoteData)
        {
            foreach($finalQuoteData as $quote)
            {
                $finalQuoteID   = $quote["finalQuoteID"];
                $classification = $quote['classification'];

                $data = [
                    'costEstimateID'          => $quote['costEstimateID'],
                    'costEstimateCode'        => $quote['costEstimateCode'],
                    'billMaterialID'          => $quote['billMaterialID'],
                    'billMaterialCode'        => $quote['billMaterialCode'],
                    'materialRequestID'       => $quote['materialRequestID'],
                    'materialRequestCode'     => $quote['materialRequestCode'],
                    'inventoryValidationID'   => $quote['inventoryValidationID'],
                    'inventoryValidationCode' => $quote['inventoryValidationCode'],
                    'bidRecapID'              => $quote['bidRecapID'],
                    'bidRecapCode'            => $quote['bidRecapCode'],
                    'timelineBuilderID'       => $quote['timelineBuilderID'],
                    'projectCode'             => $quote['projectCode'],
                    'projectName'             => $quote['projectName'],
                    'projectCategory'         => $quote['projectCategory'],
                    'clientCode'              => $quote['clientCode'],
                    'clientName'              => $quote['clientName'],
                    'clientAddress'           => $quote['clientAddress'],
                    'employeeID'              => 0,
                    'inventoryVendorID'       => $quote['inventoryVendorID'],
                    'vendorCode'              => $quote['vendorCode'],
                    'vendorName'              => $quote['vendorName'],
                    'vendorAddress'           => $quote['vendorAddress'],
                    'vendorContactDetails'    => $quote['vendorContactDetails'],
                    'vendorContactPerson'     => $quote['vendorContactPerson'],
                    'purchaseRequestClassification' => $classification,
                    'dateNeeded'              => $quote['dateNeeded'],
                    'purchaseRequestReason'   => $quote['finalQuoteRemarks'],
                    'total'                   => $quote['finalQuoteTotal'],
                    'purchaseRequestStatus'   => 0,
                    'createdBy'               => $quote['employeeID'],
                    'updatedBy'               => $quote['updatedBy'],
                ];
                $savePurchaseRequest = $this->db->insert("ims_purchase_request_tbl", $data);
                if ($savePurchaseRequest) 
                {
                    $purchaseRequestID = $this->db->insert_id();
                    $purchaseRequestCode = getFormCode("PR", date("Y-m-d"), $purchaseRequestID);
                    $this->db->update(
                        "ims_purchase_request_tbl", 
                        ["purchaseRequestCode" => $purchaseRequestCode], 
                        ["purchaseRequestID" => $purchaseRequestID]);
                    $insertPurchaseRequestItemAssetData = $this->insertPurchaseRequestItemAssetData($bidRecapID, $finalQuoteID, $classification, $purchaseRequestID);
                }
            }
        }
    }
    // ----- ***** END PURCHASE REQUEST ***** -----

}
