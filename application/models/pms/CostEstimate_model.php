<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CostEstimate_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function saveCE($timelineBuilderID = null){
        $sql =  "   SELECT pptb.*, clientCode,clientName, clientUnitNumber, clientHouseNumber,clientHouseNumber,clientStreetName,clientSubdivisionName,clientBarangay,clientCity,clientCountry,clientRegion,clientProvince,clientPostalCode, 
                    pptb.createdAt AS dateCreated, projectListCode, projectListName, categoryName
                    FROM   pms_timeline_builder_tbl AS pptb 
                    JOIN pms_client_tbl AS pct USING(clientID)
                    LEFT JOIN pms_project_list_tbl AS pplt ON pplt.projectListID = pptb.projectID
                    JOIN pms_category_tbl AS pcct ON pcct.categoryID = pplt.categoryID

                    WHERE pptb.timelineBuilderID = '$timelineBuilderID'
                ";
        $query  = $this->db->query($sql);
        $result = $query->row();
        $clientAddress = $result->clientUnitNumber." ".$result->clientHouseNumber.", ".$result->clientStreetName.", ".$result->clientSubdivisionName.", ".$result->clientBarangay.", ".$result->clientCity.", ".$result->clientCountry.", ".$result->clientRegion.", ".$result->clientProvince.", ".$result->clientPostalCode." ";
        $costEstimateData = [
            "timelineBuilderID" 		=> $timelineBuilderID,
            "timelineDesign"            => $result->timelineDesign,
            "projectCode"   			=> $result->projectCode,
            "projectName"   			=> $result->projectListName,
            "projectCategory" 			=> $result->categoryName,
            "clientCode"    		    => $result->clientCode,
            "clientName"    		    => $result->clientName,
            "clientAddress" 		    => $clientAddress,
            "costEstimateStatus"        => "0",
            "employeeID"                => $result->createdBy,
            "createdBy"                 => $result->createdBy,
            "updatedBy"                 => $result->updatedBy
        ];
        $this->saveCostEstimateData("insert", $costEstimateData);
    
    }
    public function saveCostEstimateData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_cost_estimate_tbl", $data);
        } else {
            $where = ["costEstimateID" => $id];
            $query = $this->db->update("pms_cost_estimate_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $costEstimateCode = "CEF-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["costEstimateCode"=> $costEstimateCode ];
            $this->db->update("pms_cost_estimate_tbl", $updateArr, ["costEstimateID" => $insertID]);

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getTableRowDetails($param, $id){
        $column = $param == "item" ? "itemID, itemCode, itemName, itemDescription, itemImage," : "assetID, assetCode, assetName, assetDescription, assetImage,";
        $table  = $param == "item" ? "ims_inventory_item_tbl" : "ims_inventory_asset_tbl";
        $where  = $param == "item" ? "itemID" : "assetID";
        $sql   = "  SELECT $column brandName, categoryName, classificationName ,unitOfMeasurementID
                    FROM $table 
                        LEFT JOIN ims_inventory_category_tbl USING(categoryID) 
                        LEFT JOIN ims_inventory_classification_tbl ON ($table.classificationID = ims_inventory_classification_tbl.classificationID)  
                    WHERE $where = $id";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function saveInventoryRequest($param, $data, $costEstimateID = null, $billMaterialID = null){
        // $deleteCostEstimateItems = $this->deleteCostEstimateItems($costEstimateID, $billMaterialID);
        $table = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl ";
        $query = $this->db->insert_batch($table, $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false";
    }


    public function getInventoryRequest($param = "item", $costEstimateID = null, $billMaterialID = null){
        $column     = $param == "item" ? "SUM(requestQuantity) AS sumRequestQuantity" : "SUM(requestQuantity) AS sumRequestQuantity, SUM(requestManHours) AS sumRequestManHours" ;
        $table      = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $groupBy    = $param == "item" ? "itemID" : "assetID"; 
        $whereBOM   = $billMaterialID ? "AND billMaterialID = '$billMaterialID'" : "";
        $sql        = "SELECT $table.* , $column FROM $table WHERE costEstimateID = '$costEstimateID' $whereBOM GROUP BY $groupBy";
        $query      = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }


    public function getInventoryRequestData($costEstimateID = null, $billMaterialID = null){
        $result = [
            "project"   => $this->getInventoryRequest("item", $costEstimateID, $billMaterialID),
            "assets"    => $this->getInventoryRequest("asset", $costEstimateID, $billMaterialID),
            "travel"    => [] 
        ];
        return $result;
    }

    // public function getTaskListData($timelineBuilderID = null){
    //     $sql    = "SELECT * FROM pms_timeline_task_list_tbl WHERE timelineBuilderID = '$timelineBuilderID' ";
    //     $query  = $this->db->query($sql);
    //     return $query ? $query->result_array() : [];
    // }

    // public function getTimelineManagement($timelineBuilderID = null, $taskID = null){
    //     $sql    = "SELECT  * FROM pms_timeline_management_tbl WHERE timelineBuilderID = '$timelineBuilderID' AND taskID = '$taskID'";
    //     $query  = $this->db->query($sql);
    //     return $query ? $query->result_array() : [];
    // }

    
    public function getPhaseAndMilestoneData($timelineBuilderID){
        $data   =  [
            "phase" => $this->projectData($timelineBuilderID),
        ];
        return $data;
    }

    public function projectData($timelineBuilderID = null){
        $phaseData  = $this->getPhasedata($timelineBuilderID);
        $result     =  [];
        foreach ($phaseData as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "phaseID"          => $phase["milestoneBuilderID"],
                "phaseDescription" => $phase["phaseDescription"],
                "milestone"        => $this->getMilestoneData($milestoneBuilderID)
            ];
            array_push($result,$temp);
        }
        return $result;
    }

    public function getPhaseData($timelineBuilderID){
        $sql = "SELECT milestoneBuilderID, pmbt.phaseDescription AS phaseDescription
                FROM pms_timeline_task_list_tbl AS pttl 
                JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID)
                WHERE pttl.timelineBuilderID =  '$timelineBuilderID'
                GROUP BY milestoneBuilderID ";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestoneData($milestoneBuilderID = null){
        $sql        = " SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = '$milestoneBuilderID' ";
        $query      = $this->db->query($sql);
        $returnData = [];
        foreach ($query->result_array() as $data) {
            $temp = [
                "milestoneListID"       => $data["milestoneListID"],
                "milestoneBuilderID"    => $data["milestoneBuilderID"],
                "projectMilestoneName"  => $data["projectMilestoneName"]
            ];
            array_push($returnData,$temp);
        }
        return $returnData;
    }






}
?>