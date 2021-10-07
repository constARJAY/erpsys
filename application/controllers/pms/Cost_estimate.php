
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cost_estimate extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        
        $this->load->model("pms/CostEstimate_model", "costestimate");
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        isAllowed(38);
    }

    public function index()
    {
        $data["title"] = "Cost Estimate";
        $this->load->view("template/header",$data);
        $this->load->view("pms/cost_estimate/index");
        $this->load->view("template/footer");
    }

    public function saveCostEstimate()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");

        $costEstimateID             = $this->input->post("costEstimateID");
        $costEstimateCode 			= $this->input->post("costEstimateCode")            == "null" ?  NULL : $this->input->post("costEstimateCode");
        $reviseCostEstimateID 	    = $this->input->post("reviseCostEstimateID")        == "null" ?  NULL : $this->input->post("reviseCostEstimateID");
        $reviseCostEstimateCode 	= $this->input->post("reviseCostEstimateCode")      == "null" ?  NULL : $this->input->post("reviseCostEstimateCode");
        $timelineBuilderID 			= $this->input->post("timelineBuilderID")           == "null" ?  NULL : $this->input->post("timelineBuilderID");
        $projectCode   				= $this->input->post("projectCode")                 == "null" ?  NULL : $this->input->post("projectCode");
        $projectName   				= $this->input->post("projectName")                 == "null" ?  NULL : $this->input->post("projectName");
        $projectCategory 			= $this->input->post("projectCategory")             == "null" ?  NULL : $this->input->post("projectCategory");
        $clientCode    				= $this->input->post("clientCode")                  == "null" ?  NULL : $this->input->post("clientCode");
        $clientName    				= $this->input->post("clientName")                  == "null" ?  NULL : $this->input->post("clientName");
        $clientAddress 				= $this->input->post("clientAddress")               == "null" ?  NULL : $this->input->post("clientAddress");
        $dateNeeded 				= $this->input->post("dateNeeded");

        $approversID                = $this->input->post("approversID")     ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate")   ?? null;

        $costEstimateStatus         = $this->input->post("costEstimateStatus");
        $costEstimateReason         = $this->input->post("costEstimateReason")   ?? null;
        $costEstimateRemarks        = $this->input->post("costEstimateRemarks")  ?? null;

        $employeeID 		        = $this->input->post("employeeID")  ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy")   ?? null;
        $updatedBy                  = $this->input->post("updatedBy")   ?? null;
        $createdAt                  = $this->input->post("createdAt")   ?? null;
        $items                      = $this->input->post("items")       ?? null;
        $assets                     = $this->input->post("assets")      ?? null;
        $vehicles                   = $this->input->post("vehicles")    ?? null;
        $others                     = $this->input->post("others")      ?? null;
        $costEstimateData = [
            "employeeID"                => $employeeID,
            "costEstimateID"            => $costEstimateID,
            "costEstimateCode" 			=> $costEstimateCode,
            "reviseCostEstimateID"      => $reviseCostEstimateID,
            "reviseCostEstimateCode"    => $reviseCostEstimateCode,
            "timelineBuilderID" 		=> $timelineBuilderID,
            "projectCode"   			=> $projectCode,
            "projectName"   			=> $projectName,
            "projectCategory" 			=> $projectCategory,
            "clientCode"    		    => $clientCode,
            "clientName"    		    => $clientName,
            "clientAddress" 		    => $clientAddress,
            "dateNeeded" 				=> $dateNeeded,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "costEstimateStatus"        => $costEstimateStatus,
            "costEstimateReason"        => $costEstimateReason,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($costEstimateData["reviseCostEstimateID"]);
             unset($costEstimateData["reviseCostEstimateCode"]);
            unset($costEstimateData["createdBy"]);
            unset($costEstimateData["createdAt"]);

            if ($method == "cancelform") {
                $costEstimateData = [
                    "costEstimateStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $costEstimateData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "costEstimateStatus" => $costEstimateStatus,
                    "updatedBy"             => $updatedBy,
                ];
                
            } else if ($method == "deny") {
                $costEstimateData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "costEstimateStatus"  => 3,
                    "costEstimateRemarks" => $costEstimateRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $costEstimateData = [
                    "reviseCostEstimateID" => $reviseCostEstimateID,
                    "costEstimateStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveCostEstimateData = $this->costestimate->saveCostEstimateData($action, $costEstimateData, $costEstimateID);
            if($costEstimateStatus == "2"){
                $costEstimateResultData = $this->costestimate->getCostEstimateData($costEstimateID);
                $insertBOMData = [
                    "costEstimateID"            => $costEstimateResultData->costEstimateID,
                    "costEstimateCode"          => $costEstimateResultData->costEstimateCode,
                    "employeeID"                => "0",
                    "timelineBuilderID"         => $costEstimateResultData->timelineBuilderID,
                    "timelineDesign"            => $costEstimateResultData->timelineDesign,
                    "projectCode"               => $costEstimateResultData->projectCode,
                    "projectName"               => $costEstimateResultData->projectName,
                    "projectCategory"           => $costEstimateResultData->projectCategory,
                    "clientCode"                => $costEstimateResultData->clientCode,
                    "clientName"                => $costEstimateResultData->clientName,
                    "clientAddress"             => $costEstimateResultData->clientAddress,
                    "billMaterialStatus"        => "0",
                    "billMaterialReason"        => $costEstimateResultData->costEstimateReason,
                    "dateNeeded"                => $costEstimateResultData->dateNeeded,
                    "createdBy"                 => $costEstimateResultData->createdBy,
                ];
                $this->billmaterial->saveBillMaterialData("insert", $insertBOMData);
            }
        if($saveCostEstimateData){
            $error      = 0;
            $errorMsg   = "false|System error: Please contact the system administrator for assistance!";
            $result = explode("|", $saveCostEstimateData);
            if($result[0]== "true"){
                $costEstimateID = $result[2];

                // if($costEstimateStatus == "2"){
                //     $this->costestimate->insertToIVR($costEstimateID);
                // }
                
                if($items){
                    $costEstimateItems = [];
                    for ($i=0; $i < count($items) ; $i++) { 
                        foreach ($items[$i] as $index => $item) {
                            $itemInfo   =   $this->costestimate->getTableRowDetails("item",$item["itemID"]);
                            $temp = [
                                    "costEstimateID"            =>  $costEstimateID,
                                    "milestoneBuilderID"        =>  $item["milestoneBuilderID"],
                                    "phaseDescription"          =>  $item["phaseDescription"],
                                    "milestoneListID"           =>  $item["milestoneListID"],
                                    "projectMilestoneID"        =>  $item["projectMilestoneID"],
                                    "projectMilestoneName"      =>  $item["projectMilestoneName"],
                                    "itemID"                    =>  $itemInfo->itemID ,
                                    "itemCode"                  =>  $itemInfo->itemCode,
                                    "itemBrandName"             =>  $itemInfo->brandName,
                                    "itemName"                  =>  $itemInfo->itemName,
                                    "itemClassification"        =>  $itemInfo->classificationName,
                                    "itemCategory"              =>  $itemInfo->categoryName,
                                    "itemUom"                   =>  $itemInfo->unitOfMeasurementID,
                                    "itemDescription"           =>  $itemInfo->itemDescription,
                                    "files"                     =>  $itemInfo->itemImage,
                                    "remarks"                   =>  $item["itemRemarks"],
                                    "requestQuantity"           =>  $item["itemQuantity"],
                                    "createdBy"                 =>  $updatedBy,
                                    "updatedBy"                 =>  $updatedBy
                            ];
                            array_push($costEstimateItems, $temp);
                        }
                    }
                    $saveCostEstimateItems = $this->costestimate->saveInventoryRequest("item", $costEstimateItems, $costEstimateID);
                    
                    $error += intval(!$saveCostEstimateItems ? 1 : 0);
                }

                if($assets){
                    $costEstimateAssets = [];
                    foreach ($assets as $index => $asset) {
                        $assetInfo   =   $this->costestimate->getTableRowDetails("asset",$asset["assetID"]);
                        $temp = [
                                "costEstimateID"         =>  $costEstimateID,
                                "assetID"                   =>  $assetInfo->assetID ,
                                "assetCode"                 =>  $assetInfo->assetCode,
                                "assetBrandName"            =>  $assetInfo->brandName,
                                "assetName"                 =>  $assetInfo->assetName,
                                "assetClassification"       =>  $assetInfo->classificationName,
                                "assetCategory"             =>  $assetInfo->categoryName,
                                "assetUom"                  =>  $assetInfo->unitOfMeasurementID,
                                "assetDescription"          =>  $assetInfo->assetDescription,
                                "files"                     =>  $assetInfo->assetImage,
                                "remarks"                   =>  $asset["assetRemarks"],
                                "requestQuantity"           =>  $asset["assetQuantity"],
                                "requestManHours"           =>  $asset["assetManhours"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy
                        ];
                        array_push($costEstimateAssets, $temp);
                    }
                    $saveCostEstimateAssets = $this->costestimate->saveInventoryRequest("asset", $costEstimateAssets, $costEstimateID);
                    $error += intval(!$saveCostEstimateAssets ? 1 : 0);
                }

                if($vehicles){
                    $costEstimateVehicle = [];
                    foreach ($vehicles as $index => $vehicle) {
                        $vehicleInfo   =   $this->costestimate->getVehicleDetails($vehicle["vehicleID"]);
                        $temp = [
                                "costEstimateID"            =>  $costEstimateID,
                                "costEstimateCode"          =>  "CEF-".date_format(date_create($createdAt),"y")."-".str_pad($costEstimateID, 5, "0", STR_PAD_LEFT),
                                "vehicleID"                 =>  $vehicleInfo->vehicleID,
                                "travelType"                =>  "Vehicle",
                                "vehicleCode"               =>  "VHL-".date_format(date_create($vehicleInfo->createdAt),"y")."-".str_pad($vehicleInfo->vehicleID, 5, "0", STR_PAD_LEFT),
                                "vehiclePlateNumber"        =>  $vehicleInfo->vehiclePlateNumber,
                                "vehicleName"               =>  $vehicleInfo->vehicleName,
                                "vehicleFuelType"           =>  $vehicleInfo->vehicleFuelType,
                                "vehicleDistance"           =>  $vehicle["vehicleQuantity"],
                                "vehicleFuelConsumption"    =>  $vehicleInfo->vehicleFuelConsumption,
                                "vehicleManHours"           =>  $vehicle["vehicleManhours"],
                                "vehicleStartDate"          =>  $vehicle["vehicleStartDate"],
                                "vehicleEndDate"            =>  $vehicle["vehicleEndDate"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($costEstimateVehicle, $temp);
                    }
                    $saveCostEstimateVehicle = $this->costestimate->saveTravelRequest("vehicle", $costEstimateVehicle, $costEstimateID);
                    $error += intval(!$saveCostEstimateVehicle ? 1 : 0);
                }

                if($others){
                    $costEstimateOther = [];
                    foreach ($others as $index => $other) {
                        $temp = [
                                "costEstimateID"            =>  $costEstimateID,
                                "costEstimateCode"          =>  "CEF-".date_format(date_create($createdAt),"y")."-".str_pad($costEstimateID, 5, "0", STR_PAD_LEFT),
                                "travelType"                =>  $other["travelType"],
                                "travelTypeDescription"     =>  $other["otherDescription"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($costEstimateOther, $temp);
                    }
                    $saveCostEstimateOther = $this->costestimate->saveTravelRequest("other", $costEstimateOther, $costEstimateID);
                    $error += intval(!$saveCostEstimateOther ? 1 : 0);
                }
                


                
            }
        }

        echo json_encode($error < 1 ? $saveCostEstimateData : $errorMsg);
    }


    public function getPhaseAndMilestoneData(){
       $timelineBuilderID = $this->input->post("timelineBuilderID");
       $costEstimateID    = $this->input->post("costEstimateID");
       $result            = "false|System error: Please contact the system administrator for assistance!";

       if($timelineBuilderID){
            $result = $this->costestimate->getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID);
       }
       echo json_encode($result);
    }

    public function getInventoryRequestData(){
        $costEstimateID  = $this->input->post("costEstimateID");
        echo json_encode($this->costestimate->getInventoryRequestData($costEstimateID));
    }

    // public function insertToIVR(){
    //    $costEstimateID = $this->input->post("costEstimateID");
    //     $this->costestimate->insertToIVR($costEstimateID);
    // }

}
?>