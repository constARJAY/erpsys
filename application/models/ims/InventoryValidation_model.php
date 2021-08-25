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

    public function updateRequestItemsBrandName($inventoryValidationID = null)
    {
        $sql = "
        SELECT 
            * 
        FROM 
            ims_request_items_tbl 
        WHERE 
            inventoryValidationID = $inventoryValidationID AND
            inventoryValidationID IS NULL AND
            purchaseOrderID IS NULL AND 
            bidRecapID IS NULL AND
            itemID IS NOT NULL";
        $queryGetRequestItems = $this->db->query($sql);
        if ($queryGetRequestItems) {
            $items = $queryGetRequestItems->result_array();
            foreach ($items as $item) {
                $requestItemID = $item["requestItemID"];
                $itemID        = $item["itemID"];
                $brandName     = $this->brandName($itemID);
                $queryQuery    = $this->db->update("ims_request_items_tbl", ["brandName" => $brandName], ["requestItemID" => $requestItemID]);
            }
        }
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
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteInventoryValidationItems($inventoryValidationID, $purchaseRequestID) {
        $whereBOM = $purchaseRequestID ?? NULL;
        $query = $this->db->delete(
            "ims_request_items_tbl", 
            [
                "purchaseRequestID"         => $whereBOM,
                "inventoryValidationID"      => $inventoryValidationID,
                "purchaseOrderID "       => NULL,
                "inventoryValidationID " => NULL,
                "bidRecapID "            => NULL
            ]);
        return $query ? true : false;
    }

    public function saveInventoryValidationItems($data, $inventoryValidationID = null, $purchaseRequestID = null){
        $deleteInventoryValidationItems = $this->deleteInventoryValidationItems($inventoryValidationID, $purchaseRequestID);

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

    public function getInventoryValidationClassification($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $result = [];
        if ($inventoryValidationID > 0 || $purchaseRequestID && $purchaseRequestID > 0) {
            $wherePR  = $inventoryValidationID > 0 ? "inventoryValidationID = '$inventoryValidationID' AND milestoneBuilderID = '0' " : "inventoryValidationID IS NULL";
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
            $wherePR  = $inventoryValidationID > 0 ? "AND irit.inventoryValidationID = '$inventoryValidationID'" : "AND irit.inventoryValidationID IS NULL";
            $whereBOM = $purchaseRequestID && $purchaseRequestID > 0 ? "AND irit.purchaseRequestID = $purchaseRequestID" : "";
            $sql = "
            SELECT 
                *, (SELECT SUM(isitt.quantity) as availableStocks FROM ims_stock_in_total_tbl as isitt WHERE isitt.itemID = irit.itemID) as availableItems,
                    (SELECT SUM(sub_irit.reserveItem) AS reservedStock FROM ims_request_items_tbl AS sub_irit WHERE sub_irit.billMaterialID IS NOT NULL AND sub_irit.itemID = irit.itemID) AS reservedItems
            FROM 
                ims_request_items_tbl AS irit
            WHERE 
                irit.itemClassification = BINARY('$itemClassification')
                $wherePR 
                $whereBOM";
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
            "phases" => $this->getProjectPhases($inventoryValidationID, $purchaseRequestID),
            "materialsEquipment" => $this->getMaterialEquipmentRequestItems($inventoryValidationID, $purchaseRequestID)
        ];
        return $result;
    }

}
