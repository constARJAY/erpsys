<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CostEstimate_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveCostEstimateData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("pms_cost_estimate_tbl", $data);
        } else {
            $where = ["costEstimateID" => $id];
            $query = $this->db->update("pms_cost_estimate_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteCostEstimateItems($id){
        $queryPersonnel = $this->db->delete("hris_personnel_request_tbl", ["costEstimateID" => $id]) ? true : "";
        $queryTravel    = $this->db->delete("ims_travel_request_tbl",     ["costEstimateID" => $id]) ? true : "";
        $queryItems     = $this->db->delete("ims_request_items_tbl",      ["costEstimateID" => $id]) ? true : "";
        $query          = false;
        if($queryPersonnel && $queryTravel && $queryItems){
            $query = true;
        }
        return $query;
    }

    

    public function saveCostEstimateItems($data, $id = null){
        $personnelData  = [];
        $travelData     = [];
        $itemsData      = [];

        if ($id) {
            $deleteCostEstimateItems = $this->deleteCostEstimateItems($id);
        }


        foreach($data as $index => $item) {
            if($item["designationID"] != 'undefined' && $item["designationID"] != 0 ){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "designationID"         => $item["designationID"],
                    "designationName"       => $item["designationName"],
                    "designationTotalHours" => $item["designationTotalHours"],
                    "quantity"              => $item["quantity"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($personnelData, $temp);
            }else if($item["travelDescription"] != 'undefined' && $item["travelDescription"] != ''){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "travelDescription"     => $item["travelDescription"],
                    "unitOfMeasure"         => $item["travelUnitOfMeasure"],
                    "quantity"              => $item["quantity"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($travelData, $temp);
            }else if($item['itemID'] != "null" && $item['itemID'] != 'undefined' ){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "itemID"                => $item["itemID"],
                    "itemName"	 	        => $item["itemName"],
                    "itemDescription"       => $item["itemDescription"],
                    "itemUom"	            => $item["itemUom"],
                    "brandName"             => $item["brandName"],
                    "categoryType"          => $item["categoryType"],
                    "quantity"              => $item["quantity"],
                    "files"                 => $item["files"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($itemsData, $temp);
            }
        } 
        // echo count($personnelData)."+".count($travelData)."+".count($itemsData);
        $perssonelQuery = count($personnelData)   > 0 ? $this->savePersonnel($personnelData) : true; 
        $travelQuery    = count($travelData)      > 0 ? $this->db->insert_batch("ims_travel_request_tbl", $travelData) : true;
        $itemsQuery     = count($itemsData)       > 0 ? $this->db->insert_batch("ims_request_items_tbl", $itemsData)   : true;
        
        if ($perssonelQuery && $travelQuery && $itemsQuery) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance 2nd part!";
    }


    public function saveCostEstimateProjectPhase($data, $costEstimateID){
        $this->db->delete("ims_request_items_tbl", ["costEstimateID" => $costEstimateID, "categoryType" => "Project Phase"]);
        $projectPhaseQuery    = $this->db->insert_batch("ims_request_items_tbl", $data);
    }

    public function saveCostEstimateMaterial($data, $costEstimateID){
        $this->db->delete("ims_request_items_tbl", ["costEstimateID" => $costEstimateID, "categoryType" => "Materials and Equipment"]);
        $materialQuery    = $this->db->insert_batch("ims_request_items_tbl", $data);
    }

    public function saveCostEstimateManpower($data, $costEstimateID){
        $this->db->delete("hris_personnel_request_tbl", ["costEstimateID" => $costEstimateID]);
        $manpowerQuery    = $this->db->insert_batch("hris_personnel_request_tbl", $data);
    }

    public function saveCostEstimateTravel($data, $costEstimateID){
        $this->db->delete("ims_travel_request_tbl", ["costEstimateID" => $costEstimateID]);
        $travelQuery    = $this->db->insert_batch("ims_travel_request_tbl", $data);
    }


    public function savePersonnel($personnelData){
        
        if(count($personnelData) > 0 ){
            $data       = [];
            foreach($personnelData AS $item){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "designationID"         => $item["designationID"],
                    "designationName"       => $item["designationName"],
                    "designationTotalHours" => $item["designationTotalHours"],
                    "quantity"              => $item["quantity"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                for($x = 0; $x < $item["quantity"]; $x++){
                    array_push($data, $temp);
                }
            }
            $query = $this->db->insert_batch("hris_personnel_request_tbl", $data);
            return $query ? true : false;
        }else{
            return true;
        }
    }

    public function getDataDivision($timelineBuilderID, $costEstimateID){

        // // Variable;
        $phaseDataResult            = array();
        $milestoneDataResult        = array();
        $manpowerPhaseResult        = array();
        $materialEquipmentData      = [];
        $travelTransportationData   = [];

        

        // GETTING TIMELINE;
        $phaseSql    = "SELECT phaseDescription, milestoneBuilderID FROM pms_timeline_task_list_tbl AS pttlt JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID) WHERE timelineBuilderID = $timelineBuilderID GROUP BY phaseDescription";
        $phaseQuery  = $this->db->query($phaseSql);

        foreach($phaseQuery->result_array() as $phaseData){
            $phaseDescription   = $phaseData["phaseDescription"];
            $milestoneBuilderID = $phaseData["milestoneBuilderID"];
            $phaseManpower      = array();
            
            // GETTING THE MILESTONE
                $milestoneSql       = "SELECT milestoneListID, projectMilestoneID, projectMilestoneName FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
                $milestoneQuery     = $this->db->query($milestoneSql);

            // GETTING ASSIGNED EMPLOYEE IN SPECIFIC PHASE
            $manpowerPhaseSql   = "SELECT milestoneBuilderID, projectMilestoneID, assignedEmployee, assignedManHours FROM `pms_timeline_management_tbl` JOIN pms_timeline_task_list_tbl USING(taskID)
                                            WHERE pms_timeline_management_tbl.timelineBuilderID = $timelineBuilderID AND milestoneBuilderID = $milestoneBuilderID";
            $manpowerPhaseQuery = $this->db->query($manpowerPhaseSql);
            // $manpowerPhaseQuery->result_array();
            array_push($phaseManpower, $manpowerPhaseQuery->result_array());
                
                foreach($milestoneQuery->result_array() as $milestoneData){
                    $temp = [
                        "milestoneBuilderID"        => $milestoneBuilderID,
                        "phaseDescription"          => $phaseDescription,
                        "milestoneListID"           => $milestoneData["milestoneListID"],
                        "projectMilestoneID"        => $milestoneData["projectMilestoneID"],
                        "projectMilestoneName"      => $milestoneData["projectMilestoneName"],
                    ];
                    array_push($milestoneDataResult, $temp);
                }

                // Grouping by the Phasemanpower;
                    $phaseManpowerArray         = $phaseManpower;
                    $countPhaseManpowerArray    = count($phaseManpowerArray);
                    $groupByPhaseManpowerArray  = array();
                    for($x = 0; $x < $countPhaseManpowerArray; $x++){
                        $condition = array_search($phaseManpowerArray[$x], $groupByPhaseManpowerArray);
                        if(!$condition) array_push($groupByPhaseManpowerArray, $phaseManpowerArray[$x]);
                    } 
                    
            // END GETTING THE MILESTONE
            $tempPhaseData = [
                "milestoneBuilderID"    => $milestoneBuilderID,
                "phaseDescription"      => $phaseDescription,
                "phaseManpower"        => $phaseManpower
            ];
            array_push($phaseDataResult, $tempPhaseData);
        }

        $data = [$phaseDataResult , $milestoneDataResult];
        // $data = [$manpowerPhaseResult];
        return $data;

    }
}
