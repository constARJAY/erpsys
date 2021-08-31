<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BidRecap_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBidRecapData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_bid_recap_tbl", $data);
        } else {
            $where = ["bidRecapID" => $id];
            $query = $this->db->update("ims_bid_recap_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;   
            if($data["bidRecapStatus"] == "2"){
                // $this->creatingPO($id);
                $this->insertBidItems($id);
            }         
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBidRecapItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["bidRecapID" => $id]);
        return $query ? true : false;
    }




    public function saveBidRecapItems($data, $bidRecapID = null)
    {
        $deleteBidRecapItems = $this->deleteBidRecapItems($bidRecapID);

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
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

    public function getBidRecapClassification($bidRecapID = 0, $inventoryValidationID = 0)
    {
        $result = [];
        if ($bidRecapID && $bidRecapID > 0 || $inventoryValidationID && $inventoryValidationID > 0) {
            $whereBRF  = $bidRecapID && $bidRecapID > 0 ? "bidRecapID = $bidRecapID" : "bidRecapID IS NULL";
            $whereIVR = $inventoryValidationID && $inventoryValidationID > 0 ? "AND inventoryValidationID = $inventoryValidationID" : "";
            $sql = "
            SELECT 
                itemClassification
            FROM 
                ims_request_items_tbl 
            WHERE 
                $whereBRF
                $whereIVR
            GROUP BY itemClassification";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getBidRecapItems($bidRecapID = 0, $inventoryValidationID = 0, $itemClassification = "")
    {
        $result = [];
        if ($bidRecapID && $bidRecapID > 0 || $inventoryValidationID && $inventoryValidationID > 0) {
            $whereBRF  = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "AND bidRecapID IS NULL";
            $whereIVR = $inventoryValidationID && $inventoryValidationID > 0 ? "AND inventoryValidationID = $inventoryValidationID" : "";
            $selectPriceList    = $bidRecapID < 1 ? 
                                ", ( SELECT iiplt.inventoryVendorID FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorID, 
                                ( SELECT iiplt.inventoryVendorName FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorName,
                                ( SELECT iiplt.vendorCurrentPrice FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorPrice" : "";
            $sql = "
            SELECT 
                irit.* $selectPriceList
            FROM 
                ims_request_items_tbl AS irit 
            WHERE 
                milestoneBuilderID IS NULL AND 
                phaseDescription IS NULL AND
                milestoneListID IS NULL AND
                projectMilestoneID IS NULL AND
                projectMilestoneName IS NULL AND
                itemClassification = BINARY('$itemClassification')
                $whereBRF 
                $whereIVR";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getMaterialEquipmentRequestItems($bidRecapID = 0, $inventoryValidationID = 0)
    {
        $classifications = $this->getBidRecapClassification($bidRecapID, $inventoryValidationID);
        $result = [];
        foreach($classifications as $classification) {
            $itemClassification = $classification["itemClassification"];
            $temp = [
                "name"  => $itemClassification,
                "items" => $this->getBidRecapItems($bidRecapID, $inventoryValidationID, $itemClassification)
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getPhases($bidRecapID = 0, $inventoryValidationID = 0)
    {
        $whereBRF = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "AND bidRecapID IS NULL";
        $sql = "
        SELECT 
            milestoneBuilderID, phaseDescription
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND milestoneBuilderID != '0' AND 
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            inventoryValidationID = $inventoryValidationID 
            $whereBRF 
        GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestones($bidRecapID = 0, $inventoryValidationID = 0, $milestoneBuilderID = 0) {
        $whereBRF = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "AND bidRecapID IS NULL";
        $sql = "
        SELECT 
            projectMilestoneID, projectMilestoneName
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND milestoneBuilderID != '0' AND  
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            inventoryValidationID = $inventoryValidationID AND 
            milestoneBuilderID = $milestoneBuilderID 
            $whereBRF
        GROUP BY projectMilestoneID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestoneItems($bidRecapID = 0, $inventoryValidationID = 0, $milestoneBuilderID = 0, $projectMilestoneID = 0)
    {
        $whereBRF           = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "AND bidRecapID IS NULL";
        $selectPriceList    = $bidRecapID < 1 ? 
                                ", ( SELECT iiplt.inventoryVendorID FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorID, 
                                ( SELECT iiplt.inventoryVendorName FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorName,
                                ( SELECT iiplt.vendorCurrentPrice FROM ims_inventory_price_list_tbl AS iiplt WHERE preferred = '1' AND iiplt.itemID = irit.itemID) AS preferredInventoryVendorPrice" : "";
        $sql = "
        SELECT 
            irit.* $selectPriceList
        FROM 
            ims_request_items_tbl AS irit
        WHERE 
            milestoneBuilderID IS NOT NULL AND milestoneBuilderID != '0' AND   
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            inventoryValidationID = $inventoryValidationID AND
            milestoneBuilderID = $milestoneBuilderID AND
            projectMilestoneID = $projectMilestoneID
            $whereBRF";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getProjectPhases($bidRecapID = 0, $inventoryValidationID = 0)
    {
        $result = [];
        $phases = $this->getPhases($bidRecapID, $inventoryValidationID);
        foreach($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $phaseDescription   = $phase["phaseDescription"];

            $milestones = $this->getMilestones($bidRecapID, $inventoryValidationID, $milestoneBuilderID);
            $milestoneItems = [];
            foreach($milestones as $milestone) {
                $projectMilestoneID   = $milestone["projectMilestoneID"];
                $projectMilestoneName = $milestone["projectMilestoneName"];
                // $vendor               = $this->getVendor();
                $temp2 = [
                    "projectMilestoneID" => $projectMilestoneID,
                    "name"               => $projectMilestoneName,
                    "items" => $this->getMilestoneItems($bidRecapID, $inventoryValidationID, $milestoneBuilderID, $projectMilestoneID)
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


    public function getCostEstimateRequest($bidRecapID = 0, $inventoryValidationID = 0) 
    {
        $result = [
            "phases" => $this->getProjectPhases($bidRecapID, $inventoryValidationID),
            "materialsEquipment" => $this->getMaterialEquipmentRequestItems($bidRecapID, $inventoryValidationID)
        ];
        return $result;
    }



    public function creatingPO($id){
        // WHERE bidRecapID = $id AND inventoryVendorID = $vendorID;
         $sql            = "SELECT * FROM `ims_request_items_tbl` WHERE bidRecapID = '$id' GROUP BY categoryType, inventoryVendorID";
         $query          = $this->db->query($sql);
         $lastPOQuery    = $this->db->query("SELECT referencePurchaseOrderID FROM ims_request_items_tbl ORDER BY referencePurchaseOrderID  DESC LIMIT 1");
         $lastPOResult   = $lastPOQuery->result_array();
         $lastPO         = $lastPOResult[0]["referencePurchaseOrderID"] ? $lastPOResult[0]["referencePurchaseOrderID"] : 0;
         $categoryArr    = array("company","project");
            foreach($categoryArr AS $category){
                $lastPO +=1;
                foreach($query->result_array() as $row){
                    $inventoryVendorID  = $row["inventoryVendorID"];
                    $itemsQuery         = $this->db->query("UPDATE ims_request_items_tbl SET `referencePurchaseOrderID` = '$lastPO' WHERE bidRecapID = '$id' AND inventoryVendorID = '$inventoryVendorID' AND categoryType = '$category' ");
                }
            }

        
    }


    // ----- INSERT BID ITEMS -----
    public function getBidItems($bidRecapID = null)
    {
        if ($bidRecapID) {
            $sql   = "
            SELECT 
                * 
            FROM 
                ims_request_items_tbl 
            WHERE 
                bidRecapID = $bidRecapID AND 
                purchaseOrderID IS NULL 
            GROUP BY 
                bidRecapID, inventoryVendorID, categoryType";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function insertBidItems($bidRecapID = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if ($bidRecapID) {
            $bidItems = $this->getBidItems($bidRecapID);
            $data = [];
            foreach ($bidItems as $item) {
                $temp = [
                    "bidRecapID"        => $bidRecapID,
                    "inventoryVendorID" => $item["inventoryVendorID"],
                    "categoryType"      => $item["categoryType"],
                    "bidPoStatus"       => 0,
                    "createdBy"         => $sessionID,
                    "updatedBy"         => $sessionID,
                ];
                array_push($data, $temp);
            }
            if (count($data) > 0) {
                $query = $this->db->insert_batch("ims_bid_po_tbl", $data);
                return $query ? true : false;
            }
        }
        return false;
    }
    // ----- END INSERT BID ITEMS -----


}
