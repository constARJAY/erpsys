<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseRequest_model extends CI_Model {

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

    public function updateRequestItemsBrandName($purchaseRequestID = null)
    {
        $sql = "
        SELECT 
            * 
        FROM 
            ims_request_items_tbl 
        WHERE 
            purchaseRequestID = $purchaseRequestID AND
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
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($purchaseRequestID, $billMaterialID) {
        $whereBOM = $billMaterialID ?? NULL;
        $query = $this->db->delete(
            "ims_request_items_tbl", 
            [
                "billMaterialID"         => $whereBOM,
                "purchaseRequestID"      => $purchaseRequestID,
                "purchaseOrderID "       => NULL,
                "inventoryValidationID " => NULL,
                "bidRecapID "            => NULL
            ]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($action, $data, $purchaseRequestID = null, $billMaterialID = null)
    {
        $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($purchaseRequestID, $billMaterialID);

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

    public function getPurchaseRequestClassification($purchaseRequestID = 0, $billMaterialID = 0)
    {
        $result = [];
        if ($purchaseRequestID && $purchaseRequestID > 0 || $billMaterialID && $billMaterialID > 0) {
            $wherePR  = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "AND purchaseRequestID IS NULL";
            $whereBOM = $billMaterialID && $billMaterialID > 0 ? "AND billMaterialID = $billMaterialID" : "";
            $sql = "
            SELECT 
                itemClassification
            FROM 
                ims_request_items_tbl 
            WHERE 
                (inventoryValidationID IS NULL OR inventoryValidationID = 0)
                $wherePR
                $whereBOM
            GROUP BY itemClassification";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getPurchaseRequestItems($purchaseRequestID = 0, $billMaterialID = 0, $itemClassification = "")
    {
        $result = [];
        if ($purchaseRequestID && $purchaseRequestID > 0 || $billMaterialID && $billMaterialID > 0) {
            $wherePR  = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "AND purchaseRequestID IS NULL";
            $whereBOM = $billMaterialID && $billMaterialID > 0 ? "AND billMaterialID = $billMaterialID" : "";
            $sql = "
            SELECT 
                *
            FROM 
                ims_request_items_tbl 
            WHERE 
                milestoneBuilderID IS NULL AND
                phaseDescription IS NULL AND
                milestoneListID IS NULL AND
                projectMilestoneID IS NULL AND
                projectMilestoneName IS NULL AND
                (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND
                itemClassification = BINARY('$itemClassification')
                $wherePR 
                $whereBOM";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getMaterialEquipmentRequestItems($purchaseRequestID = 0, $billMaterialID = 0)
    {
        $classifications = $this->getPurchaseRequestClassification($purchaseRequestID, $billMaterialID);
        $result = [];
        foreach($classifications as $classification) {
            $itemClassification = $classification["itemClassification"];
            $temp = [
                "name"  => $itemClassification,
                "items" => $this->getPurchaseRequestItems($purchaseRequestID, $billMaterialID, $itemClassification)
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getPhases($purchaseRequestID = 0, $billMaterialID = 0)
    {
        $wherePR = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "AND purchaseRequestID IS NULL";
        $sql = "
        SELECT 
            milestoneBuilderID, phaseDescription
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            billMaterialID = $billMaterialID AND 
            (inventoryValidationID IS NULL OR inventoryValidationID = 0) 
            $wherePR 
        GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestones($purchaseRequestID = 0, $billMaterialID = 0, $milestoneBuilderID = 0) {
        $wherePR = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "AND purchaseRequestID IS NULL";
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
            billMaterialID = $billMaterialID AND 
            (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND
            milestoneBuilderID = $milestoneBuilderID 
            $wherePR
        GROUP BY projectMilestoneID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestoneItems($purchaseRequestID = 0, $billMaterialID = 0, $milestoneBuilderID = 0, $projectMilestoneID = 0)
    {
        $wherePR = $purchaseRequestID && $purchaseRequestID > 0 ? "AND purchaseRequestID = $purchaseRequestID" : "AND purchaseRequestID IS NULL";
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
            billMaterialID = $billMaterialID AND 
            (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND
            milestoneBuilderID = $milestoneBuilderID AND
            projectMilestoneID = $projectMilestoneID
            $wherePR";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getProjectPhases($purchaseRequestID = 0, $billMaterialID = 0)
    {
        $result = [];
        $phases = $this->getPhases($purchaseRequestID, $billMaterialID);
        foreach($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $phaseDescription   = $phase["phaseDescription"];

            $milestones = $this->getMilestones($purchaseRequestID, $billMaterialID, $milestoneBuilderID);
            $milestoneItems = [];
            foreach($milestones as $milestone) {
                $projectMilestoneID   = $milestone["projectMilestoneID"];
                $projectMilestoneName = $milestone["projectMilestoneName"];

                $temp2 = [
                    "projectMilestoneID" => $projectMilestoneID,
                    "name"  => $projectMilestoneName,
                    "items" => $this->getMilestoneItems($purchaseRequestID, $billMaterialID, $milestoneBuilderID, $projectMilestoneID)
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

    public function getCostEstimateRequest($purchaseRequestID = 0, $billMaterialID = 0) 
    {
        $result = [
            "phases" => $this->getProjectPhases($purchaseRequestID, $billMaterialID),
            "materialsEquipment" => $this->getMaterialEquipmentRequestItems($purchaseRequestID, $billMaterialID)
        ];
        return $result;
    }

}
