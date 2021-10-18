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
                $designationResult = $this->getDesignation($designationArr[$x]);
                $projectManhourData    = explode("|", $this->getManhoursData($manhourArr[$x], $designationResult->designationHourlyRate, $assignDate[$x]));
                $projectOvertimeData   = explode("|", $this->getManhoursData($overtimeArr[$x], $designationResult->designationHourlyRate, $assignDate[$x], "overtime") );
                
                

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
            $holidayPercentage = 1;
            if($isHoliday){
                $holidayPercentage = $isHoliday->holidayType == "Regular Holiday" ? 2.0 : 1.3;
            }

            $totalHours         += floatval($hours[$x]);
            // $totalHourlyRate    =  (floatval($isOvertime) * floatval($hourlyRate)) * floatval($hours[$x]);
            $totalHourlyRate    =  (floatval($hourlyRate) * floatval($isOvertime)) * floatval($holidayPercentage);
            $totalRate          += floatval($totalHourlyRate) * floatval($hours[$x]);
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

    public function getInventoryRequestData($param = "item", $costEstimateID, $billMaterialID = null, $phaseID = null, $milestoneID = null){
        $table          = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $id             = $param == "item" ? "itemID" : "assetID";
        $wherePhase     = $phaseID ? "AND milestoneBuilderID = '$phaseID' AND milestoneListID = '$milestoneID'" : "";
        $whereBOM       = $billMaterialID ? "costEstimateID = '$costEstimateID' AND billMaterialID = '$billMaterialID' " : "costEstimateID = '$costEstimateID'";
        $joinPriceList  = !$billMaterialID ? ( $param == "item" ? "JOIN ims_inventory_price_list_tbl as iiplt ON iiplt.$id = $table.$id" : "JOIN ims_inventory_asset_tbl as iiat ON iiat.$id = $table.$id") : "";
        $unitCost       = !$billMaterialID ? ( $param == "item" ? ", MAX(vendorCurrentPrice) as unitCost" : ", iiat.assetProviderFee as hourlyRate") : "";
        $groupBy        = !$billMaterialID ? "GROUP BY $id" : "";
        $sql            = "SELECT $table.* $unitCost  FROM $table $joinPriceList WHERE $whereBOM $wherePhase $groupBy ";
        $query          = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTravelRequestData($param = "vehicle", $costEstimateID, $billMaterialID = null){
        $whereCategory  = $param == "vehicle"  ? "ims_travel_request_tbl.vehicleID IS NOT NULL" : "ims_travel_request_tbl.vehicleID IS NULL";
        $whereBOM       = $billMaterialID   ? "costEstimateID = '$costEstimateID' AND billMaterialID = '$billMaterialID' " : "costEstimateID = '$costEstimateID'";
        $joinTable      = !$billMaterialID  ? ($param == "vehicle" ? "JOIN ims_inventory_vehicle_tbl AS iivt ON iivt.vehicleID = ims_travel_request_tbl.vehicleID" : "") : "";
        $joinSelect     = !$billMaterialID  ? ($param == "vehicle" ? ", iivt.vehicleProviderFee as unitCost" : "") : "";
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


    public function getExcelData($timelineBuilderID, $costEstimateID, $billMaterialID, $category = "bill_material"){
        $billMaterialData           = $this->getBillMaterialData($billMaterialID);
        $billMaterialDetails        = $this->billmaterial->getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID, $billMaterialID);
        $projectPhaseData           = [];
        $projectAssetsData          = [];
        $projectVehicleData         = [];
        $projectOtherData           = [];
        $footerItemTotalCost        = 0;
        $footerLaborTotalCost       = 0;
        $footerEquipmentTotalCost   = 0;
        $footerTravelTotalCost      = 0;
        
        
            $phaseArray     = $billMaterialDetails["phase"];
            $assetArray     = $billMaterialDetails["asset"];
            $vehicleArray   = $billMaterialDetails["vehicle"];
            $otherArray     = $billMaterialDetails["other"];
            for ($i=0; $i < count($phaseArray) ; $i++) {
                $projectPhaseName   = $phaseArray[$i]["phaseDescription"];
                $milestoneArray     = $phaseArray[$i]["milestone"];
                $tempMilestoneData  = [];
                $tempPhaseItemTotalCost  = 0;
                $tempPhaseLaborTotalCost = 0;
                for ($j=0; $j < count($milestoneArray) ; $j++) { 
                        $milestoneName                  = $milestoneArray[$j]["projectMilestoneName"];
                        $tempMilestoneItemTotalCost     = 0;
                        $tempMilestoneLaborTotalCost    = 0;
                        $milestoneItemArray             = $milestoneArray[$j]["items"];
                        $milestoneLaborArray            = $milestoneArray[$j]["personnel"];
                        $tempMilestoneItemArray         = [];
                        $tempMilestoneLaborArray        = [];

                        for ($itemIndex=0; $itemIndex < count($milestoneItemArray) ; $itemIndex++) { 

                            $tempMilestoneItemArray[] = [
                                "name"          =>  $milestoneItemArray[$itemIndex]["itemName"],
                                "code"          =>  $milestoneItemArray[$itemIndex]["itemCode"],
                                "description"   =>  $milestoneItemArray[$itemIndex]["itemDescription"],
                                "brand"         =>  $milestoneItemArray[$itemIndex]["itemBrandName"],
                                "size"          =>  $milestoneItemArray[$itemIndex]["itemCategory"], 
                                "quantity"      =>  $milestoneItemArray[$itemIndex]["requestQuantity"],
                                "unit"          =>  $milestoneItemArray[$itemIndex]["itemUom"],
                                "unitPrice"     =>  $category == "cost_estimate" ? "" : $milestoneItemArray[$itemIndex]["unitCost"],
                                "totalCost"     =>  $category == "cost_estimate" ? "" : floatval($milestoneItemArray[$itemIndex]["unitCost"]) * floatval($milestoneItemArray[$itemIndex]["requestQuantity"]),
                            ];
                        }

                        for ($laborIndex=0; $laborIndex < count($milestoneLaborArray) ; $laborIndex++) { 
                            $tempMilestoneLaborArray[] = [
                                "manHours"         => $milestoneLaborArray[$laborIndex]["designationTotalManHours"],
                                "overtimeManHours" => $milestoneLaborArray[$laborIndex]["designationTotalOvertime"],
                                "personnel"        => $milestoneLaborArray[$laborIndex]["designationName"],
                                "totalLabor"       => $category == "cost_estimate" ? "" : $milestoneLaborArray[$laborIndex]["totalCost"]
                            ];
                        }


                        $tempMilestoneData[] = [
                            "name"          =>  $milestoneName,
                            "totalCost"     =>  $tempMilestoneItemTotalCost,
                            "totalLabor"    =>  $tempMilestoneLaborTotalCost,
                            "items"         =>  $tempMilestoneItemArray,
                            "labors"        =>  $tempMilestoneLaborArray,
                        ];

                }

                $projectPhaseData[] = [
                        "name"          => $projectPhaseName,
                        "totalCost"     => $tempPhaseItemTotalCost,
                        "totalLabor"    => $category == "cost_estimate" ? "" : $tempPhaseLaborTotalCost,
                        "milestones"    => $tempMilestoneData
                ];
                $footerItemTotalCost    += floatval($tempPhaseItemTotalCost);
                $footerLaborTotalCost   += floatval($tempPhaseLaborTotalCost);
            }

            for ($i=0; $i < count($assetArray) ; $i++) { 
               $assetDetailsData        =   $assetArray[$i];
               $projectAssetsData[] = [
                    "code"           => $assetDetailsData["assetCode"],
                    "name"           => $assetDetailsData["assetName"],
                    "classification" => $assetDetailsData["assetClassification"],
                    "unit"           => $assetDetailsData["assetUom"],
                    "quantity"       => $assetDetailsData["requestQuantity"],
                    "manHours"       => $assetDetailsData["requestManHours"],
                    "unitCost"       => $category == "cost_estimate" ? "" : $assetDetailsData["unitCost"],
                    "totalCost"      => $category == "cost_estimate" ? "" : $assetDetailsData["totalCost"]
               ];
               $footerEquipmentTotalCost += floatval($assetDetailsData["totalCost"]);
            }

            for ($i=0; $i < count($vehicleArray) ; $i++) { 
                $vehicleDetailsData        =   $vehicleArray[$i];
                $projectVehicleData[] = [
                     "code"             => $vehicleDetailsData["vehicleCode"],
                     "name"             => $vehicleDetailsData["vehicleName"],
                     "averageFuelType"  => $vehicleDetailsData["vehicleFuelConsumption"],
                     "distance"         => $vehicleDetailsData["vehicleDistance"],
                     "manHours"         => $vehicleDetailsData["vehicleManHours"],
                     "fuelRate"         => $vehicleDetailsData["vehicleLiters"],
                     "vehicleRate"      => $category == "cost_estimate" ? "" : $vehicleDetailsData["unitCost"],
                     "totalCost"        => $category == "cost_estimate" ? "" : $vehicleDetailsData["totalCost"]
                ];

                $footerTravelTotalCost += floatval($vehicleDetailsData["totalCost"]);
            }

            for ($i=0; $i < count($otherArray) ; $i++) { 
                $otherDetailsData   =   $otherArray[$i];
                $projectOtherData[] =   [
                                            "category"    => $otherDetailsData["travelType"],
                                            "description" => $otherDetailsData["travelTypeDescription"],
                                            "totalCost"   => $category == "cost_estimate" ? "" : $otherDetailsData["totalCost"]
                                        ]; 
                $footerTravelTotalCost += floatval($otherDetailsData["totalCost"]);
            }
            

            
           
        
        $footerTotalCost            = (floatval($footerItemTotalCost) + floatval($footerLaborTotalCost) + floatval($footerEquipmentTotalCost) + floatval($footerTravelTotalCost));
    
        $data = [
            "filename" => $billMaterialData->billMaterialCode.".xlsx",
            "code"     => $billMaterialData->clientCode,
            "title"    => $billMaterialData->projectName,
            "project"  => [
                "code"          =>  $billMaterialData->projectCode,
                "name"          =>  $billMaterialData->projectName,
                "location"      =>  $billMaterialData->clientAddress,
                "owner"         =>  $billMaterialData->clientName,
                "subject"       =>  "BILL OF MATERIALS - ".$billMaterialData->projectName,
                "costEstimate"  =>  $billMaterialData->costEstimateCode,
                "timeline"      =>  ""
            ],
            "body"      => [
                "phases"    => $projectPhaseData,
                "assets"    => $projectAssetsData,
                "vehicle"   => $projectVehicleData,
                "others"    => $projectOtherData
            ],
            "footer"    => [
                "costSummary"   => [
                    "items"     =>  [
                                        [
                                            "name"      =>  "Material",
                                            "totalCost" =>  $category == "cost_estimate" ? "" : $footerItemTotalCost
                                        ],
                                        [
                                            "name"      =>  "Labor",
                                            "totalCost" =>  $category == "cost_estimate" ? "" : $footerLaborTotalCost
                                        ]
                                    ],
                    "itemTotalCost" =>  (floatval($footerItemTotalCost) + floatval($footerLaborTotalCost)),
                    "overhead"  =>  [
                                        [
                                            "name"      => "Equipment",
                                            "totalCost" => $category == "cost_estimate" ? "" : $footerEquipmentTotalCost
                                        ],
                                        [
                                            "name"      => "Travel",
                                            "totalCost" => $category == "cost_estimate" ? "" : $footerTravelTotalCost
                                        ],  
                                    ], 
                    "contigency"          => "",
                    "subtotal"            => $category == "cost_estimate" ? "" : $footerTotalCost,
                    "markUp"              => "",
                    "contractPriceVATEX"  => "",
                    "vat"                 => "",
                    "contractPriceVATINC" => ""             
                ]
            ]

        ];

        return $data;
    }



}
?>