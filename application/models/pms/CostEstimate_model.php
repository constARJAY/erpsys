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
        $clientAddress = $result->clientUnitNumber." ".ucwords($result->clientHouseNumber).", ".ucwords($result->clientStreetName).", ".ucwords($result->clientSubdivisionName).", ".ucwords($result->clientBarangay).", ".ucwords($result->clientCity).", ".ucwords($result->clientCountry).", ".ucwords($result->clientRegion).", ".ucwords($result->clientProvince).", ".$result->clientPostalCode." ";
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

    public function getCostEstimateData($costEstimateID = null){
        $sql = "SELECT * FROM pms_cost_estimate_tbl WHERE costEstimateID = '$costEstimateID'";
        $query  =   $this->db->query($sql);
        return $query ? $query->row() : [];
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

    public function getVehicleDetails($id){
        $sql    = "SELECT *, IF(vehicleGasType = 0, 'Diesel', 'Gasoline') vehicleFuelType FROM ims_inventory_vehicle_tbl WHERE vehicleID = '$id'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
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
    
    public function deleteCostEstimateDetails($table,$param,$costEstimateID){
        switch ($param) {
            case 'item':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => NULL,
                    "materialRequestID"      => NULL,
                    "purchaseOrderID "       => NULL,
                    "inventoryValidationID " => NULL,
                    "bidRecapID "            => NULL
                ]; 
                break;
            case 'asset':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => NULL,
                    "materialRequestID"      => NULL,
                    "purchaseOrderID "       => NULL,
                    "inventoryValidationID " => NULL,
                    "bidRecapID "            => NULL
                ]; 
                break;
            case 'vehicle':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => NULL,
                    "travelType"            => "Vehicle",
                ]; 
                break;
            default:
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => NULL,
                    "vehicleCode"            => NULL,
                ]; 
                break;
        }
        $query = $this->db->delete($table, $whereParam);
        return $query ? true : false;
    }

    public function saveTravelRequest($param, $data, $costEstimateID){
      if($costEstimateID){
        $this->deleteCostEstimateDetails("ims_travel_request_tbl",$param,$costEstimateID);
      }
      $query = $this->db->insert_batch("ims_travel_request_tbl", $data);
      if ($query) {
          return "true|Successfully submitted";
      }
      return "false";  
    }

    public function saveInventoryRequest($param, $data, $costEstimateID = null){
        
        $table = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl ";
        if($costEstimateID){
            $this->deleteCostEstimateDetails($table,$param,$costEstimateID);
        }
        $query = $this->db->insert_batch($table, $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false";
    }

    public function getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID = null){
        $data   =  [
            "phase"     => $this->projectData($timelineBuilderID, $costEstimateID),
            "asset"     => $this->getInventoryRequestData("asset",  $costEstimateID),
            "vehicle"   => $this->getTravelRequestData("vehicle",   $costEstimateID),
            "other"     => $this->getTravelRequestData("other", $costEstimateID)
        ];
        return $data;
    }

    public function projectData($timelineBuilderID = null, $costEstimateID = null){
        $phaseData  = $this->getPhasedata($timelineBuilderID);
        $result     =  [];
        foreach ($phaseData as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "phaseID"          => $phase["milestoneBuilderID"],
                "phaseDescription" => $phase["phaseDescription"],
                "milestone"        => $this->getMilestoneData($milestoneBuilderID, $timelineBuilderID, $costEstimateID)
            ];
            array_push($result,$temp);
        }
        return $result;
    }

    // GET PHASE FROM TIMELINE BUILDER
    public function getPhaseData($timelineBuilderID){
        $sql = "SELECT milestoneBuilderID, pmbt.phaseDescription AS phaseDescription
                FROM pms_timeline_task_list_tbl AS pttl 
                JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID)
                WHERE pttl.timelineBuilderID =  '$timelineBuilderID'
                GROUP BY milestoneBuilderID ";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    // GET MILESTONE FROM TIMELINE BUILDER
    public function getMilestoneData($milestoneBuilderID = null, $timelineBuilderID = null, $costEstimateID = null){
        $sql        = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = '$milestoneBuilderID' ";
        $query      = $this->db->query($sql);
        $returnData = [];
        foreach ($query->result_array() as $data) {
            $temp = [
                // "milestoneListID"       => $data["milestoneListID"],
                "milestoneListID"       => $data["projectMilestoneID"],
                "milestoneBuilderID"    => $data["milestoneBuilderID"],
                "projectMilestoneName"  => $data["projectMilestoneName"],
                "items"                 => $this->getInventoryRequestData("item", $costEstimateID ,$milestoneBuilderID , $data["projectMilestoneID"]),
                "personnel"             => $this->getRequestPersonnel($timelineBuilderID, $milestoneBuilderID, $data["projectMilestoneID"])
            ];
            array_push($returnData,$temp);
        }
        return $returnData;
    }


    public function getRequestPersonnel($timelineBuilderID = null, $phaseID = null, $milestoneListID = null){
        $returnData = [];
        $sql = "SELECT 
                    ptmt.manHours as manhour, assignedManhours, assignedDesignation, assignedRegularHours, assignedOvertimeHours, assignedStartDate 
                FROM pms_timeline_task_list_tbl as pttlt LEFT JOIN pms_timeline_management_tbl as ptmt USING(taskID)
                WHERE 
                    ptmt.projectMilestoneID = '$milestoneListID'
                AND
                    pttlt.milestoneBuilderID = '$phaseID'
                AND 
                    ptmt.timelineBuilderID = '$timelineBuilderID'";
        $query              = $this->db->query($sql);
        $designationData    = [];
        $designationIDArr   = [];
        
        foreach ($query->result_array() as $designation){ // START FOR EACH LOOP -
            
            $designationArr = explode("|", $designation["assignedDesignation"]);
            $manhourArr     = explode("|", $designation["assignedRegularHours"]);
            $overtimeArr    = explode("|", $designation["assignedOvertimeHours"]);
            $assignDate     = explode("|", $designation["assignedStartDate"]);
            
            for ($x=0; $x < count($designationArr); $x++) {  // START FOR LOOP = 
                // PUSHING VALUE IN $designationIDArr
                    if(count($designationIDArr) < 0){
                        array_push($designationIDArr,  $designationArr[$x]);
                    }else{
                        if(!in_array($designationArr[$x], $designationIDArr)){
                            array_push($designationIDArr,  $designationArr[$x]);
                        }
                    }
                // END PUSHING VALUE IN $designationIDArr
                $designationResult      = $this->getDesignation($designationArr[$x]);
                $projectManhourData     = explode("|", $this->getManhoursData($manhourArr[$x], $designationResult->designationHourlyRate, $assignDate[$x]));
                $projectOvertimeData    = explode("|", $this->getManhoursData($overtimeArr[$x], $designationResult->designationHourlyRate, $assignDate[$x], "overtime") );
                
                

                    $temp = [
                        "designationID"         => $designationResult->designationID,
                        "designationCode"       => $designationResult->designationCode,
                        "designationName"       => $designationResult->designationName,
                        "designationHourlyRate" => ( floatval($projectManhourData[1]) + floatval($projectOvertimeData[1]) ),
                        "regularRate"           => floatval($projectManhourData[1]),
                        "overtimeRate"          => floatval($projectOvertimeData[1]),
                        "projectManhour"        => $projectManhourData[0],
                        "projectOvertime"       => $projectOvertimeData[0]
                    ];
                    array_push($designationData,  $temp);
            } // END FOR LOOP =
        } // END FOR EACH LOOP -

        for ($x=0; $x < count($designationIDArr) ; $x++) {
            $designationID              = $designationIDArr[$x]; 
            $designationResult          = $this->getDesignation($designationID);
            $designationQty             = 0;
            $projectTotalManhour        = 0;
            $projectTotalOvertime       = 0;
            $projectTotalManhourRate    = 0;
            $projectTotalOvertimeRate   = 0;
            $totalCost                  = 0;
            for ($y =0; $y < count($designationData) ; $y++) { 
                $thisObj = $designationData[$y];
                if($thisObj["designationID"] == $designationID){
                    $projectTotalManhour        += floatval($thisObj["projectManhour"]);
                    $projectTotalOvertime       += floatval($thisObj["projectOvertime"]);
                    $projectTotalManhourRate    += floatval($thisObj["regularRate"]);
                    $projectTotalOvertimeRate   += floatval($thisObj["overtimeRate"]);
                    $totalCost                  += floatval($thisObj["designationHourlyRate"]);
                    $designationQty ++;
                }
            }

            // $totalCost = (floatval($projectTotalManhour) * floatval($designationResult->designationHourlyRate) ) * $designationQty;

            $temp = [
                "designationID"              => $designationID,
                "designationCode"            => $designationResult->designationCode,
                "designationName"            => $designationResult->designationName,
                "designationQuantity"        => $designationQty,
                "designationTotalManHours"   => $projectTotalManhour,
                "designationTotalOvertime"   => $projectTotalOvertime,
                "regularRate"                => $projectTotalManhourRate,
                "overtimeRate"               => $projectTotalOvertimeRate,
                "unitCost"                   => $designationResult->designationHourlyRate,
                "totalCost"                  => $totalCost
            ];
            array_push($returnData, $temp);
        }

        return $returnData;
    }

    // GET MAN HOURS
    public function getManhoursData($data = false, $hourlyRate = 0, $assignDate = false , $param = "regular"){
        /**
         * ----- REFERENCE -----
         * Ordinary Day                -> Od   | 100% - 1.0
         * Sunday or Rest Day          -> Rd   | 130% - 1.3
         * Special Day or   
         * Special Working/Non-Working -> Sd   | 130% - 1.3
         * Regular Holiday             -> Rh   | 200% - 2.0
         * Double Holiday              -> Dh   | 300% - 3.0
         * Night Shift                 -> Ns   | 110% - 1.1
         * Overtime                    -> Ot   | 125% - 1.25
         * SD falling on RD            -> SdRd | 150% - 1.50
         * RH falling on RD            -> RhRd | 260% - 2.60
         * DH falling on RD            -> DhRd | 390% - 3.90
         * ----- END REFERENCE -----
         */

        // Regular Holiday
        // Special Working Holiday
        // Special Non-Working Holiday
        $date       = explode("~", $assignDate);
        $hours      = explode("~", $data);
        $isOvertime = $param != "regular" ? 1.25 : 1.0;
        $totalHours = 0;
        $totalRate  = 0;
        
        for ($x =  0; $x < count($date) ; $x++) { 
            $isHoliday  = $this->getHolidayRate($date[$x]);
            $percentage = $isOvertime;
            if($isHoliday){
                $percentage = $isHoliday->holidayType == "Regular Holiday" ? 2.0 : 1.3;
            }

            $totalHours         += floatval($hours[$x]);
            $totalHourlyRate    =  (floatval($isOvertime) * floatval($hourlyRate)) * floatval($hours[$x]);
            $totalRate          += floatval($totalHourlyRate) * floatval($percentage);
        }
        
        return $totalHours."|".$totalRate;
    }

    // GET HOLIDAY RATE
    public function getHolidayRate($date = false){
        $sql    = "SELECT holidayType FROM hris_holiday_tbl WHERE holidayDate = '$date'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    // GET DESIGNATION 
    public function getDesignation($designationID){
        $sql    = "SELECT * FROM hris_designation_tbl WHERE designationID = '$designationID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function getInventoryRequestData($param = "item", $costEstimateID = null, $phaseID = null, $milestoneID = null ){
        $table      = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $wherePhase = $phaseID ? "AND milestoneBuilderID = '$phaseID' AND milestoneListID = '$milestoneID'" : "";
        $sql        = "SELECT $table.* FROM $table 
                        WHERE 
                        costEstimateID          = '$costEstimateID' $wherePhase AND
                        billMaterialID          IS NULL AND
                        inventoryValidationID   IS NULL AND 
                        bidRecapID              IS NULL AND  
                        purchaseRequestID       IS NULL AND
                        purchaseOrderID         IS NULL AND 
                        changeRequestID         IS NULL AND
                        inventoryReceivingID    IS NULL
                      ";
        $query      = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTravelRequestData($param = "vehicle", $costEstimateID = null){
        $whereCategory  = $param == "vehicle"  ? "vehicleID IS NOT NULL" : "vehicleID IS NULL";
        $sql            = "SELECT ims_travel_request_tbl.* FROM ims_travel_request_tbl WHERE costEstimateID = '$costEstimateID' AND $whereCategory AND billMaterialID IS NULL";
        $query          = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }
    

}
?>