<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BillMaterial_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    
    public function getBillMaterialData($billMaterialID = null){
        $sql    = "SELECT * FROM pms_bill_material_tbl WHERE billMaterialID = '$billMaterialID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function saveBillMaterialData($action, $data, $id = null){
        if ($action == "insert") {
            $query = $this->db->insert("pms_bill_material_tbl", $data);
        } else {
            $where = ["billMaterialID" => $id];
            $query = $this->db->update("pms_bill_material_tbl", $data, $where);
        }

        if ($query) {
            $insertID           = $action == "insert" ? $this->db->insert_id() : $id;
            $billMaterialData   = $this->getBillMaterialData($insertID);
            $billMaterialCode   = "BOM-".date_format(date_create($billMaterialData->createdAt),"y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr          = ["billMaterialCode"=> $billMaterialCode ];
            $this->db->update("pms_bill_material_tbl", $updateArr, ["billMaterialID" => $insertID]);
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getTravelRequestRow($id){
        $sql    = "SELECT * FROM ims_travel_request_tbl WHERE travelRequestID  = '$id'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getTableRowDetails($param, $id){

        // $column = $param == "item" ? "itemID, itemCode, itemName, itemDescription, itemImage," : "assetID, assetCode, assetName, assetDescription, assetImage, MAX(iiplt.vendorCurrentPrice) as unitCost";
        $table  = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $where  = $param == "item" ? "requestItemID" : "requestAssetID ";
        // $onPriceList    =   $param == "item" ? 
        $sql   = "  SELECT  * FROM $table WHERE $where = $id";
        $query = $this->db->query($sql);

        return $query ? $query->row() : false;

    }
    
    public function deleteBillMaterialDetails($table,$param,$costEstimateID, $billMaterialID = null){
        switch ($param) {
            case 'item':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => $billMaterialID ,
                    "materialRequestID"      => NULL,
                    "purchaseOrderID "       => NULL,
                    "inventoryValidationID " => NULL,
                    "bidRecapID "            => NULL
                ]; 
                break;
            case 'asset':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => $billMaterialID ,
                    "materialRequestID"      => NULL,
                    "purchaseOrderID "       => NULL,
                    "inventoryValidationID " => NULL,
                    "bidRecapID "            => NULL
                ]; 
                break;
            case 'vehicle':
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => $billMaterialID ,
                    "travelType"            => "Vehicle",
                ]; 
                break;
            default:
                $whereParam = [
                    "costEstimateID"         => $costEstimateID,
                    "billMaterialID"         => $billMaterialID,
                    "vehicleCode"            => NULL,
                ]; 
                break;
        }
        $query = $this->db->delete($table, $whereParam);
        return $query ? true : false;
    }

    public function saveTravelRequest($param, $data, $costEstimateID, $billMaterialID = null){
      if($billMaterialID){
        $this->deleteBillMaterialDetails("ims_travel_request_tbl",$param,$costEstimateID, $billMaterialID);
      }
      $query = $this->db->insert_batch("ims_travel_request_tbl", $data);
      if ($query) {
          return "true|Successfully submitted";
      }
      return "false";  
    }

    public function saveInventoryRequest($param, $data, $costEstimateID, $billMaterialID = null){
        
        $table = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl ";
        if($billMaterialID){
            $this->deleteBillMaterialDetails($table,$param,$costEstimateID, $billMaterialID);
        }
        $query = $this->db->insert_batch($table, $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false";
    }

    public function getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID, $billMaterialID = null){
        $data   =  [
            "phase"     => $this->projectData($timelineBuilderID, $costEstimateID, $billMaterialID),
            "asset"     => $this->getInventoryRequestData("asset",  $costEstimateID, $billMaterialID),
            "vehicle"   => $this->getTravelRequestData("vehicle",   $costEstimateID, $billMaterialID),
            "other"     => $this->getTravelRequestData("other", $costEstimateID, $billMaterialID)
        ];
        return $data;
    }

    public function projectData($timelineBuilderID = null, $costEstimateID, $billMaterialID = null){
        $phaseData  = $this->getPhasedata($timelineBuilderID);
        $result     =  [];
        foreach ($phaseData as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "phaseID"          => $phase["milestoneBuilderID"],
                "phaseDescription" => $phase["phaseDescription"],
                "milestone"        => $this->getMilestoneData($milestoneBuilderID, $timelineBuilderID, $costEstimateID, $billMaterialID)
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
    public function getMilestoneData($milestoneBuilderID = null, $timelineBuilderID = null, $costEstimateID, $billMaterialID = null){
        $sql        = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = '$milestoneBuilderID' ";
        $query      = $this->db->query($sql);
        $returnData = [];
        foreach ($query->result_array() as $data) {
            $temp = [
                // "milestoneListID"       => $data["milestoneListID"],
                "milestoneListID"       => $data["projectMilestoneID"],
                "milestoneBuilderID"    => $data["milestoneBuilderID"],
                "projectMilestoneName"  => $data["projectMilestoneName"],
                "items"                 => $this->getInventoryRequestData("item", $costEstimateID, $billMaterialID, $milestoneBuilderID , $data["projectMilestoneID"]),
                "personnel"             => $this->getRequestPersonnel($timelineBuilderID, $milestoneBuilderID, $data["projectMilestoneID"])
            ];
            array_push($returnData,$temp);
        }
        return $returnData;
    }



    public function getRequestPersonnel($timelineBuilderID = null, $phaseID = null, $milestoneListID = null){
        $returnData = [];
        $sql = "SELECT 
                    ptmt.manHours as manhour, assignedManhours, assignedDesignation
                FROM pms_timeline_task_list_tbl as pttlt LEFT JOIN pms_timeline_management_tbl as ptmt USING(taskID)
                WHERE 
                    ptmt.projectMilestoneID = '$milestoneListID'
                AND
                    pttlt.milestoneBuilderID = '$phaseID'
                AND 
                    ptmt.timelineBuilderID = '$timelineBuilderID'";
        $query = $this->db->query($sql);
        $designationData = [];
        $designationIDArr = [];
        
        foreach ($query->result_array() as $designation){ // START FOR EACH LOOP -
            
            $designationArr = explode("|", $designation["assignedDesignation"]);
            $manhourArr     = explode("|", $designation["assignedManhours"]);
            
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
                $designationResult = $this->getDesignation($designationArr[$x]);
                    $temp = [
                        "designationID"         => $designationResult->designationID,
                        "designationCode"       => $designationResult->designationCode,
                        "designationName"       => $designationResult->designationName,
                        "designationHourlyRate" => $designationResult->designationHourlyRate,
                        "projectManhour"        => $manhourArr[$x]
                    ];
                    array_push($designationData,  $temp);
            } // END FOR LOOP =
        } // END FOR EACH LOOP -
        // print_r($designationIDArr);
        for ($x=0; $x < count($designationIDArr) ; $x++) {
            $designationID          = $designationIDArr[$x]; 
            $designationResult      = $this->getDesignation($designationID);
            $designationQty         = 0;
            $projectTotalManhour    = 0;
            
            for ($y =0; $y < count($designationData) ; $y++) { 
                $thisObj = $designationData[$y];
                if($thisObj["designationID"] == $designationID){
                    $projectTotalManhour += floatval($thisObj["projectManhour"]);
                    $designationQty ++;
                }
            }
            $totalCost = (floatval($projectTotalManhour) * floatval($designationResult->designationHourlyRate) ) * $designationQty;
            $temp = [
                "designationID"              => $designationID,
                "designationCode"            => $designationResult->designationCode,
                "designationName"            => $designationResult->designationName,
                "designationQuantity"        => $designationQty,
                "designationTotalManHours"   => $projectTotalManhour,
                "unitCost"                   => $designationResult->designationHourlyRate,
                "totalCost"                  => $totalCost
            ];
            array_push($returnData, $temp);
        }

        return $returnData;
    }
    
    // GET DESIGNATION 
    public function getDesignation($designationID){
        $sql    = "SELECT * FROM hris_designation_tbl WHERE designationID = '$designationID'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function getInventoryRequestData($param = "item", $costEstimateID, $billMaterialID = null, $phaseID = null, $milestoneID = null){
        $table          = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $id             = $param == "item" ? "itemID" : "assetID";
        $wherePhase     = $phaseID ? "AND milestoneBuilderID = '$phaseID' AND milestoneListID = '$milestoneID'" : "";
        $whereBOM       = $billMaterialID ? "costEstimateID = '$costEstimateID' AND billMaterialID = '$billMaterialID' " : "costEstimateID = '$costEstimateID'";
        $joinPriceList  = !$billMaterialID ? ( $param == "item" ? "JOIN ims_inventory_price_list_tbl as iiplt ON iiplt.$id = $table.$id" : "JOIN ims_inventory_asset_tbl as iiat ON iiat.$id = $table.$id") : "";
        $unitCost       = !$billMaterialID ? ( $param == "item" ? ", MAX(vendorCurrentPrice) as unitCost" : ", iiat.assetHourRate as hourlyRate") : "";
        $groupBy        = !$billMaterialID ? "GROUP BY $id" : "";
        $sql            = "SELECT $table.* $unitCost  FROM $table $joinPriceList WHERE $whereBOM $wherePhase $groupBy ";
        $query          = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTravelRequestData($param = "vehicle", $costEstimateID, $billMaterialID = null){
        $whereCategory  = $param == "vehicle"  ? "ims_travel_request_tbl.vehicleID IS NOT NULL" : "ims_travel_request_tbl.vehicleID IS NULL";
        $whereBOM       = $billMaterialID   ? "costEstimateID = '$costEstimateID' AND billMaterialID = '$billMaterialID' " : "costEstimateID = '$costEstimateID'";
        $joinTable      = !$billMaterialID  ? ($param == "vehicle" ? "JOIN ims_inventory_vehicle_tbl AS iivt ON iivt.vehicleID = ims_travel_request_tbl.vehicleID" : "") : "";
        $joinSelect     = !$billMaterialID  ? ($param == "vehicle" ? ", iivt.vehicleHourRate as unitCost" : "") : "";
        $sql            = "SELECT ims_travel_request_tbl.* $joinSelect FROM ims_travel_request_tbl $joinTable WHERE $whereBOM  AND $whereCategory";
        $query          = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function existBillMaterial($costEstimateID, $billMaterialID = null){
        $result = 0;
        $itemsResultArray       = $this->getInventoryRequestData(   "item",    $costEstimateID,   $billMaterialID);
        $assetsResultArray      = $this->getInventoryRequestData(   "asset",   $costEstimateID,   $billMaterialID);
        $vehiclesResultArray    = $this->getTravelRequestData(      "vehicle", $costEstimateID,   $billMaterialID);
        $othersResultArray      = $this->getTravelRequestData(      "other",   $costEstimateID,   $billMaterialID);
        
        if(count($itemsResultArray)){
            $result ++;
        }

        if(count($assetsResultArray)){
            $result ++;
        }

        if(count($vehiclesResultArray)){
            $result ++;
        }

        if(count($othersResultArray)){
            $result ++;
        }

        // echo $result;
        return $result != 0 ? true : false;
    }
}
?>