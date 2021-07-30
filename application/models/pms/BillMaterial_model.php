<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BillMaterial_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBillMaterial($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_bill_material_tbl", $data);
        } else {
            $where = ["billMaterialID" => $id];
            $query = $this->db->update("pms_bill_material_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBIllMaterialItems($id) {
        $queryPersonnel = $this->db->delete("hris_personnel_request_tbl", ["billMaterialID" => $id]) ? true : "";
        $queryTravel    = $this->db->delete("ims_travel_request_tbl",     ["billMaterialID" => $id]) ? true : "";
        $queryItems     = $this->db->delete("ims_request_items_tbl",      ["billMaterialID" => $id]) ? true : "";
        $query          = false;
        if($queryPersonnel && $queryTravel && $queryItems){
            $query = true;
        }
        return $query;
    }

    public function saveBillMaterialProjectPhase($data, $billMaterialID){
        $this->db->delete("ims_request_items_tbl", ["billMaterialID" => $billMaterialID, "categoryType" => "Project Phase"]);
        $projectPhaseQuery    = $this->db->insert_batch("ims_request_items_tbl", $data);
    }

    public function saveBillMaterialMaterial($data, $billMaterialID){
        $this->db->delete("ims_request_items_tbl", ["billMaterialID" => $billMaterialID, "categoryType" => "Materials and Equipment"]);
        $materialQuery    = $this->db->insert_batch("ims_request_items_tbl", $data);
    }

    public function saveBillMaterialManpower($data, $billMaterialID){
        $this->db->delete("hris_personnel_request_tbl", ["billMaterialID" => $billMaterialID]);
        $manpowerQuery    = $this->db->insert_batch("hris_personnel_request_tbl", $data);
    }

    public function saveBillMaterialTravel($data, $billMaterialID){
        $this->db->delete("ims_travel_request_tbl", ["billMaterialID" => $billMaterialID]);
        $travelQuery    = $this->db->insert_batch("ims_travel_request_tbl", $data);
    }

    public function getDataDivision($costEstimateID, $billMaterialID){

        // Variable;
        // GETTING THE ITEMS
            $projectPhaseDataResult = array();
            $materialDataResult     = array();

            $projectPhaseData = array();
            $tempProjectPhase = array();
            

            $sqlCondition = $billMaterialID == null ? "billMaterialID IS NULL" : "billMaterialID = '$billMaterialID'";
            $itemSql      = "SELECT irit.*, (SELECT MAX(vendorCurrentPrice) FROM ims_inventory_price_list_tbl AS iiplt WHERE iiplt.itemID = irit.itemID) AS unitCost, iiit.brandName AS brandName 
                                FROM ims_request_items_tbl AS irit  LEFT JOIN  ims_inventory_item_tbl AS iiit ON irit.itemID = iiit.itemID
                            WHERE costEstimateID = '$costEstimateID' AND $sqlCondition AND inventoryValidationID IS NULL AND purchaseRequestID IS NULL AND bidRecapID IS NULL AND referencePurchaseOrderID IS NULL AND purchaseOrderID IS NULL AND inventoryReceivingID IS NULL";
            $itemQuery    = $this->db->query($itemSql);

            foreach($itemQuery->result_array() as $itemRow){
                $catergoryType      = $itemRow["categoryType"];	
                $milestoneBuilderID = $itemRow["milestoneBuilderID"];
                if($milestoneBuilderID && $catergoryType == "Project Phase"){   
                    if(count($tempProjectPhase) < 1){
                        array_push($tempProjectPhase,  $milestoneBuilderID);
                    }else{
                        if(!in_array($milestoneBuilderID, $tempProjectPhase)){
                            array_push($tempProjectPhase,  $milestoneBuilderID);
                        }
                    }
                }else{
                    $itemTotalCost = floatval($itemRow["quantity"]) * floatval($itemRow["unitCost"]);
                    $temp = [
                        "requestItemID"      => $itemRow["requestItemID"],
                        "itemID"             => $itemRow["itemID"],
                        "itemCode"           => $itemRow["itemCode"],
                        "itemName"           => $itemRow["itemName"],
                        "itemUom"            => $itemRow["itemUom"],
                        "itemClassification" => $itemRow["itemClassification"],
                        "itemBrandName"      => $itemRow["brandName"],
                        "itemQuantity"       => $itemRow["quantity"],
                        "itemUnitCost"       => $itemRow["unitCost"],
                        "itemTotalCost"      => $itemTotalCost,
                    ];
                    array_push($materialDataResult,  $temp);
                }
            }

            for($x = 0; $x < count($tempProjectPhase); $x++){
                $thisValue = $tempProjectPhase[$x];
                $filteredProjectPhase = array();

                foreach($itemQuery->result_array() as $itemListRow){
                    if($itemListRow["milestoneBuilderID"] == $thisValue){
                        array_push($filteredProjectPhase,  $itemListRow);
                    }
                }
                
                // array_push($hakdog,  $filteredProjectPhase);
                $tempMilestonePhase = array();
                        foreach($filteredProjectPhase as $milestoneList){
                            $milestoneListID    = $milestoneList["milestoneListID"];
                            if(count($tempMilestonePhase) < 0){
                                array_push($tempMilestonePhase,  $milestoneListID);
                            }else{
                                if(!in_array($milestoneListID, $tempMilestonePhase)){
                                    array_push($tempMilestonePhase,  $milestoneListID);
                                }
                            }
                        }

                        for($z = 0; $z <  count($tempMilestonePhase) ; $z++){
                            $temp = [
                                "phaseID" => $tempProjectPhase[$x],
                                "milestoneID" => $tempMilestonePhase[$z]
                            ];
                            array_push($projectPhaseData, $temp);
                        }
            } 

            for($w = 0; $w < count($tempProjectPhase); $w++){
                $milestoneTempData = array();
                for($x=0; $x < count($projectPhaseData); $x++){
                    $dataList       = $projectPhaseData[$x];
                    $filteredData   = array();
                    $itemListData   = array();
                    foreach($itemQuery->result_array() as $itemList){
                        if($itemList["milestoneBuilderID"] == $dataList["phaseID"] && $itemList["milestoneListID"] ==  $dataList["milestoneID"]){
                            $itemTotalCost = floatval($itemList["quantity"]) * floatval($itemList["unitCost"]);
                            $temp = [
                                "requestItemID"      => $itemList["requestItemID"],
                                "itemID"             => $itemList["itemID"],
                                "itemCode"           => $itemList["itemCode"],
                                "itemName"           => $itemList["itemName"],
                                "itemUom"            => $itemList["itemUom"],
                                "itemClassification" => $itemList["itemClassification"],
                                "itemBrandName"      => $itemList["brandName"],
                                "itemQuantity"       => $itemList["quantity"],
                                "itemUnitCost"       => $itemList["unitCost"],
                                "itemTotalCost"      => $itemTotalCost
                            ];
                            array_push($itemListData, $temp);
                        }
                    }

                    $milestoneTemp = [
                        "milestoneID"   => $dataList["milestoneID"],
                        "items"         => $itemListData
                    ];
                    array_push($milestoneTempData, $milestoneTemp);
                }

                $projectPhaseTemp = [
                    "phaseID"       => $tempProjectPhase[$w],
                    "milestone"     => $milestoneTempData
                ];

                array_push($projectPhaseDataResult, $projectPhaseTemp);
            }
            
        
        // END GETTING THE ITEMS;

        // GETTING THE MANPOWER 
            $manpowerSql        = "SELECT hprt.*, hdt.designationHourlyRate AS hourlyRate FROM hris_personnel_request_tbl AS hprt LEFT JOIN hris_designation_tbl AS hdt USING(designationID) 
                                    WHERE hprt.costEstimateID = '$costEstimateID' AND $sqlCondition ";
            $manpowerQuery      = $this->db->query($manpowerSql);
            $manpowerDataResult = $manpowerQuery->result_array();
        // END GETTING THE MANPOWER 

        // GETTING THE TRANSPORTATION
            $travelSql              = "SELECT * FROM ims_travel_request_tbl WHERE costEstimateID = '$costEstimateID' AND $sqlCondition ";
            $travelQuery            = $this->db->query($travelSql);
            $travelCategoryTypeArr  = array();
            $travelDataResult       = array();
            $tempTravelData         = array();
            foreach($travelQuery->result_array() as $travelList){
                if(count($travelCategoryTypeArr) < 0){
                    array_push($travelCategoryTypeArr,  $travelList["travelType"]);
                }else{
                    if(!in_array($travelList["travelType"], $travelCategoryTypeArr)){
                        array_push($travelCategoryTypeArr,  $travelList["travelType"]);
                    }
                }
            }

            for($x = 0; $x < count($travelCategoryTypeArr); $x++){
                $tempTravelDetail = array();
                foreach($travelQuery->result_array() as $travelList){
                   if($travelList["travelType"] == $travelCategoryTypeArr[$x]){
                       if($travelCategoryTypeArr[$x] == "vehicle" || $travelCategoryTypeArr[$x] == "Vehicle"){
                            if($billMaterialID){
                                $vehicleLiters = $travelList["vehicleLiters"];
                            }else{
                                $vehicleLiters = floatval($travelList["vehicleDistance"]) / floatval($travelList["vehicleFuelConsumption"]);
                            }
                            $vehicleTemp = [
                                "travelRequestID"       => $travelList["travelRequestID"],
                                "vehicleID"             => $travelList["vehicleID"],
                                "vehicleCode"           => $travelList["vehicleCode"],
                                "vehicleName"           => $travelList["vehicleName"],
                                "vehiclePlateNumber"    => $travelList["vehiclePlateNumber"],
                                "vehicleGasType"        => $travelList["vehicleGasType"],
                                "vehicleDistance"       => $travelList["vehicleDistance"],
                                "vehicleFuelConsumption"=> $travelList["vehicleFuelConsumption"],
                                "vehicleLiters"         => round(floatval($vehicleLiters),2),
                                "unitCost"              => $travelList["unitCost"],
                                "totalCost"             => $travelList["totalCost"]
                            ];
                            array_push($tempTravelDetail,  $vehicleTemp);
                       }else{
                            $vehicleTemp = [
                                "travelRequestID"       => $travelList["travelRequestID"],
                                "travelTypeDescription" => $travelList["travelTypeDescription"],
                                "unitCost"              => $travelList["unitCost"],
                                "totalCost"             => $travelList["totalCost"]
                            ];
                            array_push($tempTravelDetail,  $vehicleTemp);
                       }
                        
                   }
                }

                $tempVehicleData=[
                    "vehicleCategoryType" => $travelCategoryTypeArr[$x],
                    "details"             => $tempTravelDetail
                ];

                array_push($travelDataResult,  $tempVehicleData);
            }
        // END GETTING THE TRANSPORTATION
        




        return [$projectPhaseDataResult,$materialDataResult,$manpowerDataResult,$travelDataResult];

    }
}
