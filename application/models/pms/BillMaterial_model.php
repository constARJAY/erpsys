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

    public function getDesignation($designationID = null){
        $sql    = "SELECT * FROM hris_designation_tbl WHERE designationID = '$designationID' ";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
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
                if($milestoneBuilderID || $catergoryType == "Project Phase"){   
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
            // print_r($tempProjectPhase);
            // echo "<br>";
            // print_r($projectPhaseData);
            // echo "<br>";
            
            for($w = 0; $w < count($tempProjectPhase); $w++){ // 4 OBJECT ARRAY(PHASEID, MILESTONEID)
                $milestoneTempData = array();
                for($x=0; $x < count($projectPhaseData); $x++){ //2 ARRAY WITH VALUE OF PHASEID
                    if($tempProjectPhase[$w] == $projectPhaseData[$x]["phaseID"] ){
                        $dataList       = $projectPhaseData[$x];
                        $filteredData   = array();
                        $itemListData   = array();
                        foreach($itemQuery->result_array() as $itemList){ 
                            // echo $dataList["phaseID"]." = ".$dataList["milestoneID"];
                            // echo "<br>";
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
        


        // $tempProjectPhase
            // return [$filteredProjectPhase,$materialDataResult,$manpowerDataResult,$travelDataResult];
        return [$projectPhaseDataResult,$materialDataResult,$manpowerDataResult,$travelDataResult];

    }

    public function getBillMaterial($id = null) {
        if ($id) {
            $sql = "SELECT * FROM  pms_bill_material_tbl
                     WHERE billMaterialID = '$id' ";
            $query = $this->db->query($sql);
            return $query ? $query->row() : false;
        }
        return false;
    }

    public function getEmployeeInformation($id = null) {
        if ($id) {
            $sql = "
            SELECT 
                CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname,
                designationName
            FROM 
                hris_employee_list_tbl AS helt 
                LEFT JOIN hris_designation_tbl USING(designationID)
            WHERE employeeID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function getPhaseData($phaseID = null){
        if ($phaseID) {
            $sql = "SELECT * FROM  pms_milestone_builder_tbl
                     WHERE milestoneBuilderID = $phaseID ";
            $query = $this->db->query($sql);
            return $query ? $query->row() : false;
        }
        return false;
    }
    
    public function getPhaseArr($timelineBuilderID = null){
        $data = [];
        // AND inventoryValidationID IS NULL AND purchaseRequestID IS NULL AND bidRecapID IS NULL AND referencePurchaseOrderID IS NULL AND purchaseOrderID IS NULL AND inventoryReceivingID IS NULL
        if($timelineBuilderID){
            $sql    = "SELECT milestoneBuilderID FROM pms_timeline_task_list_tbl";
            $query  = $this->db->query($sql);
            foreach($query->result_array() as $row){
                    if(count($data) < 1){
                            array_push($data, $row["milestoneBuilderID"]);
                    }else{
                        if(!in_array($row["milestoneBuilderID"], $data)){
                            array_push($data, $row["milestoneBuilderID"]);
                        }
                    }
            }
        }
        return $data;
    }

    public function getMilestoneData($phaseID = null){
        $sql    = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = '$phaseID' ";
        $query  = $this->db->query($sql);
        return $query;
    }



    public function getBillMaterialData($billMaterialID){
        $data = ["phase"=> [], "material" => [], "travel" => [],"employees" => []];
        if($billMaterialID){
            $billMaterialData = $this->getBillMaterial($billMaterialID);
            if($billMaterialData){
                $timelineBuilderID             = $billMaterialData->timelineBuilderID ?? "-";
                $grandTotal                    = 0;
                $data["billMaterialCode"]      = getFormCode("PBR", $billMaterialData->createdAt , $billMaterialID);
                $data["clientName"]            = $billMaterialData->clientName ?? "-";
                $data["dateAproved"]           = date("F d, Y", strtotime($billMaterialData->updatedAt)) ?? "-"; 

                $data["clientAddress"]         = $billMaterialData->clientAddress ?? "-";
                $data["costEstimateCode"]      = $billMaterialData->costEstimateCode ?? "-";
                $data["projectCode"]           = $billMaterialData->projectCode ?? "-";
                $data["projectName"]           = $billMaterialData->projectName ?? "-";
                $data["billMaterialReason"]    = $billMaterialData->billMaterialReason ?? "-";

                $phaseArray = $this->getPhaseArr($timelineBuilderID);
                $divisor    = count($phaseArray);
                for($x = 0; $x < count($phaseArray); $x++){
                    // MILESTONEBUILDERID = PHASEID;
                    $phaseData   = $this->getPhaseData($phaseArray[$x]);
                    if($phaseData){
                            $phaseID                = $phaseData->milestoneBuilderID;
                            $phaseName              = $phaseData->phaseDescription;
                            $materialTotalCost      = 0; 
                            $laborTotalCost         = 0; 
                            $totalCost              = 0;
                            $milestoneTemp          = [];
                            $milestoneData          = $this->getMilestoneData($phaseID);
                                foreach($milestoneData->result_array() as $milestoneRow){
                                    $materialTotal = 0; $laborTotal = 0;
                                    // $total = floatval($materialTotal) + floatval($laborTotal);
                                    $milestoneID    = $milestoneRow["projectMilestoneID"];
                                    // MATERIALS 
                                    
                                    $materialSql    = "SELECT totalCost FROM ims_request_items_tbl WHERE milestoneBuilderID = '$phaseID' AND projectMilestoneID = '$milestoneID' ";
                                    $materialQuery  = $this->db->query($materialSql);
                                        foreach($materialQuery->result_array() as $row){
                                            $total          = $row["totalCost"] ?? 0;
                                            $materialTotal += floatval($total);
                                        } 
                                        



                                    // LABORERS 
                                    $laborersSql = "SELECT * FROM pms_timeline_management_tbl AS ptmt LEFT JOIN pms_timeline_task_list_tbl AS ppmt USING(taskID)  
                                                    WHERE ptmt.timelineBuilderID = '$timelineBuilderID' AND milestoneBuilderID = '$phaseID' AND projectMilestoneID = '$milestoneID' ";
                                    $laborersQuery = $this->db->query($laborersSql);

                                    foreach($laborersQuery->result_array() as $row){
                                        $explodeLaborer     = explode("|", $row["assignedDesignation"]);
                                        $explodeManHours    = explode("|", $row["manHours"]);
                                        for($y = 0; $y < count($explodeLaborer); $y++){
                                            $desingationData        = $this->getDesignation($explodeLaborer[$y]);
                                            $designationHourlyRate  = $desingationData->designationHourlyRate ?? 0;
                                            $designationManHour     = $explodeManHours[$y] ?? 0;
                                            $laborTotal     += floatval($designationHourlyRate) * floatval($designationManHour);
                                            $laborTotalCost += floatval($designationHourlyRate) * floatval($designationManHour);
                                        }   
                                    }            

                                    $tempTotalCost  = floatval($materialTotal / $divisor ) + floatval($laborTotal);
                                    $temp = [
                                        "milestoneName" => $milestoneRow["projectMilestoneName"],
                                        "materialTotal" => floatval($materialTotal / $divisor),
                                        "laborTotal"    => $laborTotal,
                                        "totalCost"     => $tempTotalCost
                                    ];

                                    array_push($milestoneTemp, $temp);
                                    $materialTotalCost += floatval($materialTotal / $divisor);
                                }

                            $totalCost = floatval($materialTotalCost) + floatval($laborTotalCost);
                            $phaseTemp = [
                                "phaseID"               => $phaseID,
                                "phaseName"             => $phaseName,
                                "materialTotalCost"     => $materialTotalCost,
                                "laborTotalCost"        => $laborTotalCost,
                                "totalCost"             => $totalCost,
                                "milestone"             => $milestoneTemp,
                            ];
                            array_push($data["phase"], $phaseTemp);
                            $grandTotal += floatval($totalCost ?? 0);
                    }
                }

                $materialSql    = "SELECT * FROM ims_request_items_tbl WHERE billMaterialID = '$billMaterialID' AND categoryType = 'Materials and Equipment' AND inventoryValidationID IS NULL AND purchaseRequestID IS NULL AND bidRecapID IS NULL AND referencePurchaseOrderID IS NULL AND purchaseOrderID IS NULL AND inventoryReceivingID IS NULL";
                $materialQuery  = $this->db->query($materialSql);
                $classificationArr = [];
                foreach($materialQuery->result_array() as $materialRow){
                    if(count($classificationArr) < 1){
                        array_push($classificationArr, $materialRow["itemClassification"]);
                    }else{
                        if(!in_array($materialRow["itemClassification"], $classificationArr)){
                            array_push($classificationArr, $materialRow["itemClassification"]);
                        }
                    }
                }
                
                for ($i=0; $i < count($classificationArr) ; $i++) { 
                    $total = 0;
                    $classification = $classificationArr[$i];
                    foreach ($materialQuery->result_array() as $index => $row) {
                        if($classification == $row["itemClassification"]){
                            $total += floatval($row["totalCost"]);
                        }
                    }
                    $materialTemp = [
                                        "materialName" => $classification,
                                        "totalCost"    => $total
                                    ];
                    array_push($data["material"], $materialTemp);
                    $grandTotal += floatval($total ?? 0);
                }

                $travelType     = [];
                $travelSql      = "SELECT * FROM `ims_travel_request_tbl`WHERE billMaterialID = '$billMaterialID'";
                $travelQuery    = $this->db->query($travelSql);
                foreach ($travelQuery->result_array() as $index => $row) {
                    if(count($travelType) < 1){
                        array_push($travelType, $row["travelType"]);
                    }else{
                        if(!in_array($row["travelType"], $travelType)){
                            array_push($travelType, $row["travelType"]);
                        }
                    }
                }

                for ($i=0; $i < count($travelType) ; $i++) { 
                    $travelTotalCost = 0;
                    foreach($travelQuery->result_array() as $row){
                        if($row["travelType"] == $travelType[$i]){
                            $travelTotalCost += floatval($row["totalCost"]);
                        }
                    }
                    $travelTemp = [
                        "travelType" => $travelType[$i],
                        "travelTotalCost" => $travelTotalCost
                    ];
                    array_push($data["travel"], $travelTemp);
                    $grandTotal += floatval($travelTotalCost ?? 0);
                }
                



                $data["totalCost"]          = $grandTotal;
                $overheadAndContingency     = floatval($grandTotal) * 0.05;
                $data["overhead"]           = $overheadAndContingency;
                $data["contingency"]        = $overheadAndContingency;
                $subTotal                   = (floatval($overheadAndContingency) * 2) + floatval($grandTotal);
                $data["subTotal"]           = $subTotal;
                $markUp                     = floatval($subTotal) * 0.30;
                $data["markup"]             = $markUp;
                $contractPriceVATex         = floatval($subTotal) + floatval($markUp);
                $data["contractPriceVATex"] = $contractPriceVATex;
                $VAT                        = floatval($contractPriceVATex) * 0.12;
                $data["vat"]                = $VAT;
                $contractPriceVATinc         = floatval($contractPriceVATex) + floatval($VAT);
                $data["contractPriceVATinc"] = $contractPriceVATinc;




                // GETTING EMPLOYEES
                $preparedID     = $billMaterialData->employeeID;
                $approversID    = $billMaterialData->approversID;
                $approversID    = explode("|", $approversID);
                $employeesID    = array_merge([$preparedID], $approversID);

                foreach($employeesID as $index => $employeeID){
                        $employeeData = $this->getEmployeeInformation($employeeID);
                        if($index== 0){
                            $title = "Prepared By";
                        }else if(($index+1) == count($employeesID)){
                            $title = "Approved By";
                        }else{
                            $title = "Checked By";
                        }
                        $employee = [
                            "title"     => $title,
                            "name"      => $employeeData->fullname,
                            "position"  => $employeeData->designationName
                        ];
                        array_push($data["employees"], $employee);
                }  
            }
        }
        return $data;

    }




}
