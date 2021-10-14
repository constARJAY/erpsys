<?php
class Bill_material extends CI_Controller{
 
    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        $this->load->model("ims/MaterialRequest_model", "materialrequest");
        // isAllowed(39);
    }
    
    public function index()
    {
        $data["title"] = "Bill Material";
        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");

        $billMaterialID             = $this->input->post("billMaterialID");
        $reviseBillMaterialID 	    = $this->input->post("reviseBillMaterialID")        == "null" ?  NULL : $this->input->post("reviseBillMaterialID");
        $reviseBillMaterialCode 	= $this->input->post("reviseBillMaterialCode")      == "null" ?  NULL : $this->input->post("reviseBillMaterialCode");
        $billMaterialGrandTotal 	= $this->input->post("billMaterialGrandTotal")      == "null" ?  NULL : $this->input->post("billMaterialGrandTotal");

        $approversID                = $this->input->post("approversID")     ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate")   ?? null;

        $billMaterialStatus         = $this->input->post("billMaterialStatus");
        $billMaterialReason         = $this->input->post("billMaterialReason")   ?? null;
        $billMaterialRemarks        = $this->input->post("billMaterialRemarks")  ?? null;

        $employeeID 		        = $this->input->post("employeeID")  ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy")   ?? null;
        $updatedBy                  = $this->input->post("updatedBy")   ?? null;
        $createdAt                  = $this->input->post("createdAt")   ?? null;
        $items                      = $this->input->post("items")       ?? null;
        $assets                     = $this->input->post("assets")      ?? null;
        $vehicles                   = $this->input->post("vehicles")    ?? null;
        $others                     = $this->input->post("others")      ?? null;
        $billMaterialData = [
            "employeeID"                => $employeeID,
            "billMaterialID"            => $billMaterialID,
            "reviseBillMaterialID"      => $reviseBillMaterialID,
            "reviseBillMaterialCode"    => $reviseBillMaterialCode,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "billMaterialStatus"        => $billMaterialStatus,
            "billMaterialReason"        => $billMaterialReason,
            "billMaterialGrandTotal"    => $billMaterialGrandTotal,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($billMaterialData["reviseBillMaterialID"]);
             unset($billMaterialData["reviseBillMaterialCode"]);
            unset($billMaterialData["createdBy"]);
            unset($billMaterialData["createdAt"]);

            if ($method == "cancelform") {
                $billMaterialData = [
                    "billMaterialStatus"    => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $billMaterialData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "billMaterialStatus"    => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
                
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"     => 3,
                    "billMaterialRemarks"    => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $billMaterialData = [
                    "reviseBillMaterialID"      => $reviseBillMaterialID,
                    "billMaterialStatus"        => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterialData($action, $billMaterialData, $billMaterialID);
            if($billMaterialStatus == "2"){
                $billMaterialResultData = $this->billmaterial->getBillMaterialData($billMaterialID);
                    $materialRequestData = [
                        "employeeID"                => $billMaterialResultData->createdBy,
                        "costEstimateID" 		    => $billMaterialResultData->costEstimateID,
                        "costEstimateCode" 			=> $billMaterialResultData->costEstimateCode,
                        "billMaterialID" 			=> $billMaterialResultData->billMaterialID,
                        "billMaterialCode"			=> $billMaterialResultData->billMaterialCode,
                        "timelineBuilderID" 		=> $billMaterialResultData->timelineBuilderID,
                        "projectCode"   			=> $billMaterialResultData->projectCode,
                        "projectName"   			=> $billMaterialResultData->projectName,
                        "projectCategory" 			=> $billMaterialResultData->projectCategory,
                        "clientCode"    		    => $billMaterialResultData->clientCode,
                        "clientName"    		    => $billMaterialResultData->clientName,
                        "clientAddress" 		    => $billMaterialResultData->clientAddress,
                        "dateNeeded" 				=> $billMaterialResultData->dateNeeded,
                        "materialRequestReason"     => $billMaterialResultData->billMaterialReason,
                        "submittedAt"               => $billMaterialResultData->submittedAt,
                        "createdBy"                 => $billMaterialResultData->createdBy,
                        "updatedBy"                 => $billMaterialResultData->createdBy
                    ];
                $this->materialrequest->saveMaterialRequestData("insert", $materialRequestData);
            }
        if($saveBillMaterialData){
            $error      = 0;
            $errorMsg   = "false|System error: Please contact the system administrator for assistance!";
            $result = explode("|", $saveBillMaterialData);
            if($result[0]== "true"){
                $billMaterialID = $result[2];

                // if($billMaterialStatus == "2"){
                //     $this->billmaterial->insertToIVR($billMaterialID);
                // }
                
                if($items){
                    $bilMaterialItems = [];
                    for ($i=0; $i < count($items) ; $i++) { 
                        foreach ($items[$i] as $index => $item) {
                            $itemInfo   =   $this->billmaterial->getTableRowDetails("item",$item["requestItemID"]);
                            $temp = [
                                    "billMaterialID"            =>  $billMaterialID,
                                    "costEstimateID"            =>  $itemInfo->costEstimateID,
                                    "milestoneBuilderID"        =>  $itemInfo->milestoneBuilderID,
                                    "phaseDescription"          =>  $itemInfo->phaseDescription,
                                    "milestoneListID"           =>  $itemInfo->milestoneListID,
                                    "projectMilestoneID"        =>  $itemInfo->projectMilestoneID,
                                    "projectMilestoneName"      =>  $itemInfo->projectMilestoneName,
                                    "itemID"                    =>  $itemInfo->itemID ,
                                    "itemCode"                  =>  $itemInfo->itemCode,
                                    "itemBrandName"             =>  $itemInfo->itemBrandName,
                                    "itemName"                  =>  $itemInfo->itemName,
                                    "itemClassification"        =>  $itemInfo->itemClassification,
                                    "itemCategory"              =>  $itemInfo->itemCategory,
                                    "itemUom"                   =>  $itemInfo->itemUom,
                                    "itemDescription"           =>  $itemInfo->itemDescription,
                                    "files"                     =>  $itemInfo->files,
                                    "remarks"                   =>  $itemInfo->remarks,
                                    "requestQuantity"           =>  $itemInfo->requestQuantity,
                                    "unitCost"                  =>  $item["unitCost"],
                                    "totalCost"                 =>  $item["totalCost"],
                                    "createdBy"                 =>  $updatedBy,
                                    "updatedBy"                 =>  $updatedBy
                            ];
                            array_push($bilMaterialItems, $temp);
                        }
                    }
                    $saveCostEstimateItems = $this->billmaterial->saveInventoryRequest("item", $bilMaterialItems, $itemInfo->costEstimateID, $billMaterialID);
                    
                    $error += intval(!$saveCostEstimateItems ? 1 : 0);
                }

                if($assets){
                    $billMaterialAssets = [];
                    foreach ($assets as $index => $asset) {
                        $assetInfo   =   $this->billmaterial->getTableRowDetails("asset",$asset["requestAssetID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $assetInfo->costEstimateID,
                                "assetID"                   =>  $assetInfo->assetID ,
                                "assetCode"                 =>  $assetInfo->assetCode,
                                "assetBrandName"            =>  $assetInfo->assetBrandName,
                                "assetName"                 =>  $assetInfo->assetName,
                                "assetClassification"       =>  $assetInfo->assetClassification,
                                "assetCategory"             =>  $assetInfo->assetCategory,
                                "assetUom"                  =>  $assetInfo->assetUom,
                                "assetDescription"          =>  $assetInfo->assetDescription,
                                "files"                     =>  $assetInfo->files,
                                "remarks"                   =>  $assetInfo->remarks,
                                "requestQuantity"           =>  $assetInfo->requestQuantity,
                                "requestManHours"           =>  $assetInfo->requestManHours,
                                "hourlyRate"                =>  $asset["hourlyRate"],
                                "unitCost"                  =>  $asset["unitCost"],
                                "totalCost"                 =>  $asset["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy
                        ];
                        array_push($billMaterialAssets, $temp);
                    }
                    $saveCostEstimateAssets = $this->billmaterial->saveInventoryRequest("asset", $billMaterialAssets, $assetInfo->costEstimateID, $billMaterialID);
                    $error += intval(!$saveCostEstimateAssets ? 1 : 0);
                }

                if($vehicles){
                    $billMaterialVehicle = [];
                    foreach ($vehicles as $index => $vehicle) {
                        $vehicleInfo   =   $this->billmaterial->getTravelRequestRow($vehicle["travelRequestID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $vehicleInfo->costEstimateID,
                                "billMaterialCode"          =>  "BOM-".date_format(date_create($createdAt),"y")."-".str_pad($billMaterialID, 5, "0", STR_PAD_LEFT),
                                "costEstimateCode"          =>  $vehicleInfo->costEstimateCode,
                                "vehicleID"                 =>  $vehicleInfo->vehicleID,
                                "travelType"                =>  $vehicleInfo->travelType,
                                "vehicleCode"               =>  $vehicleInfo->vehicleCode,
                                "vehiclePlateNumber"        =>  $vehicleInfo->vehiclePlateNumber,
                                "vehicleName"               =>  $vehicleInfo->vehicleName,
                                "vehicleFuelType"           =>  $vehicleInfo->vehicleFuelType,
                                "vehicleDistance"           =>  $vehicleInfo->vehicleDistance,
                                "vehicleFuelConsumption"    =>  $vehicleInfo->vehicleFuelConsumption,
                                "vehicleManHours"           =>  $vehicleInfo->vehicleManHours,
                                "vehicleStartDate"          =>  $vehicleInfo->vehicleStartDate,
                                "vehicleEndDate"            =>  $vehicleInfo->vehicleEndDate,
                                "vehicleLiters"             => $vehicle["vehicleLiters"],
                                "unitCost"                  => $vehicle["unitCost"],
                                "totalCost"                 => $vehicle["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($billMaterialVehicle, $temp);
                    }
                    $saveCostEstimateVehicle = $this->billmaterial->saveTravelRequest("vehicle", $billMaterialVehicle, $vehicleInfo->costEstimateID, $billMaterialID);
                    $error += intval(!$saveCostEstimateVehicle ? 1 : 0);
                }

                if($others){
                    $billMaterialOther = [];
                    foreach ($others as $index => $other) {
                        $otherInfo   =   $this->billmaterial->getTravelRequestRow($other["travelRequestID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $otherInfo->costEstimateID,
                                "billMaterialCode"          =>  "BOM-".date_format(date_create($createdAt),"y")."-".str_pad($billMaterialID, 5, "0", STR_PAD_LEFT),
                                "costEstimateCode"          =>  $otherInfo->costEstimateCode,
                                "travelType"                =>  $otherInfo->travelType,
                                "travelTypeDescription"     =>  $otherInfo->travelTypeDescription,
                                "totalCost"                 =>  $other["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($billMaterialOther, $temp);
                    }
                    $saveCostEstimateOther = $this->billmaterial->saveTravelRequest("other", $billMaterialOther, $otherInfo->costEstimateID);
                    $error += intval(!$saveCostEstimateOther ? 1 : 0);
                }
                


                
            }
        }

        echo json_encode($error < 1 ? $saveBillMaterialData : $errorMsg);
    }

    public function getPhaseAndMilestoneData(){
        $timelineBuilderID       = $this->input->post("timelineBuilderID");
        $costEstimateID          = $this->input->post("costEstimateID");
        $billMaterialID          = $this->input->post("billMaterialID");
        $billMaterialCondition   = $this->billmaterial->existBillMaterial($costEstimateID, $billMaterialID) ? $billMaterialID : "";
        $result                  = "false|System error: Please contact the system administrator for assistance!";
      
         if($timelineBuilderID){
                 $result = $this->billmaterial->getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID, $billMaterialCondition);
         }
         echo json_encode($result);
     }

     public function downloadExcel(){
        $timelineBuilderID       = $this->input->get("ptbid");
        $costEstimateID          = $this->input->get("ceid");
        $billMaterialID          = $this->input->get("bomid");
        $data                    = $this->billmaterial->getExcelData($timelineBuilderID, $costEstimateID, $billMaterialID);
        downloadExcel("Bill of Materials", $data);
    }

}
?>