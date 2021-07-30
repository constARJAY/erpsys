<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_budget_rationale extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        isAllowed(39);
    }

    public function index(){
        $data["title"] = "Project Budget Rationale Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $billMaterialID             = $this->input->post("billMaterialID") ?? null;
        $costEstimateID             = $this->input->post("costEstimateID") ?? null;

        $costEstimateID             = $this->input->post("costEstimateID") ?? null;
        $costEstimateCode           = $this->input->post("costEstimateCode") ?? null;
        $timelineBuilderID          = $this->input->post("timelineBuilderID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $projectCategory            = $this->input->post("projectCategory") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;

        $reviseBillMaterialID       = $this->input->post("reviseBillMaterialID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectID                  = $this->input->post("projectID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $billMaterialStatus         = $this->input->post("billMaterialStatus");
        $billMaterialReason         = $this->input->post("billMaterialReason") ?? null;
        $billMaterialRemarks        = $this->input->post("billMaterialRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");

        $projectPhase               = $this->input->post("projectPhaseData") ?? null;
        $material                   = $this->input->post("materialData") ?? null;
        $manpower                   = $this->input->post("manpowerData") ?? null;
        $travel                     = $this->input->post("travelData") ?? null;

        $billMaterialData = [
            "reviseBillMaterialID"    => $reviseBillMaterialID,
            "employeeID"              => $employeeID,
            "costEstimateID"          => $costEstimateID,
            "costEstimateCode"        => $costEstimateCode,
            "timelineBuilderID"       => $timelineBuilderID,
            "projectCode"             => $projectCode,
            "projectName"             => $projectName,
            "projectCategory"         => $projectCategory,
            "clientName"              => $clientName,
            "clientAddress"           => $clientAddress,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "billMaterialStatus"      => $billMaterialStatus,
            "billMaterialReason"      => $billMaterialReason,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($billMaterialData["reviseBillMaterialID"]);
            unset($billMaterialData["createdBy"]);
            unset($billMaterialData["createdAt"]);

            if ($method == "cancelform") {
                $billMaterialData = [
                    "billMaterialStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $billMaterialData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "billMaterialStatus" => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"  => 3,
                    "billMaterialRemarks" => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $billMaterialData = [
                    "reviseBillMaterialID" => $reviseBillMaterialID,
                    "billMaterialStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterial($action, $billMaterialData, $billMaterialID);
        if ($saveBillMaterialData) {
            $result = explode("|", $saveBillMaterialData);

            if ($result[0] == "true") {
                $billMaterialID= $result[2];

                if ($projectPhase) {
                    $projectPhaseData = [];
                    foreach($projectPhase as $index => $item) {
                        $temp = [
                            "billMaterialID"                => $billMaterialID,
                            "costEstimateID"                => $costEstimateID,
                            "categoryType"                  => "Project Phase",
                            "milestoneBuilderID"            => $item["projectPhaseID"],
                            "phaseDescription"	            => $item["projectPhaseDescription"],
                            "milestoneListID"               => $item["milestoneID"],
                            "projectMilestoneID"            => $item["milestoneID"],
                            "projectMilestoneName"	        => $item["milestoneName"],
                            "itemID"                        => $item["milestoneItemID"],
                            "itemCode"                      => $item["milestoneItemCode"],
                            "itemName"                      => $item["milestoneItemName"],
                            "itemClassification"            => $item["milestoneItemClassification"],
                            "quantity"                      => $item["milestoneItemQuantity"],
                            "itemUom"                       => $item["milestoneItemUom"],
                            "brandName"                     => $item["milestoneItemBrandName"],
                            "unitCost"                      => $item["milestoneItemUnitCost"],
                            "totalCost"                     => $item["milestoneItemTotalCost"],
                            "updatedBy"                     => $updatedBy,
                            "createdBy"                     => $createdBy
                        ];
                        array_push($projectPhaseData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialProjectPhase($projectPhaseData, $billMaterialID);
                }

                if ($material) {
                    $materialData = [];
                    foreach($material as $index => $item) {
                        $temp = [
                            "billMaterialID"        => $billMaterialID,
                            "costEstimateID"        => $costEstimateID,
                            "categoryType"          => "Materials and Equipment",
                            "itemCode"              => $item["materialItemCode"],
                            "itemID"	 	        => $item["materialItemID"],
                            "itemName"              => $item["materialItemName"],
                            "itemClassification"    => $item["materialItemClassification"],
                            "quantity"              => $item["materialItemQuantity"],
                            "itemUom"               => $item["materialItemUom"],
                            "brandName"             => $item["materialItemBrandName"],
                            "unitCost"              => $item["materialItemUnitCost"],
                            "totalCost"             => $item["materialItemTotalCost"],
                            "updatedBy"             => $updatedBy,
                            "createdBy"             => $createdBy
                        ];
                        array_push($materialData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialMaterial($materialData, $billMaterialID);
                }

                if ($manpower) {
                    $manpowerData = [];
                    foreach($manpower as $index => $item) {
                        $temp = [
                            "billMaterialID"            => $billMaterialID,
                            "costEstimateID"            => $costEstimateID,
                            "designationID"             => $item["designationID"],
                            "designationCode"	 	    => $item["designationCode"],
                            "designation"               => $item["designation"],
                            "designationQuantity"       => $item["designationQuantity"],
                            "designationTotalManHours"  => $item["designationTotalManHours"],
                            "unitCost"                  => $item["designationUnitCost"],
                            "totalCost"                 => $item["designationTotalCost"],
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($manpowerData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialManpower($manpowerData, $billMaterialID);
                }

                if ($travel) {
                    $travelData = [];
                    foreach($travel as $index => $item) {
                        if($item["travelType"] == "vehicle" || $item["travelType"] == "Vehicle" ){
                            $travelTypeTotalCost = floatval($item["travelTypeUnitCost"]) * floatval($item["vehicleLiters"]);
                        }else{
                            $travelTypeTotalCost = $item["travelTypeTotalCost"];
                        }
                        
                        $temp = [
                            "billMaterialID"            => $billMaterialID,
                            "costEstimateID"            => $costEstimateID,
                            "travelType"                => $item["travelType"],
                            "vehicleID"                 => $item["vehicleID"] ?? null,
                            "vehicleCode"	 	        => $item["vehicleCode"] ?? null,
                            "vehicleName"               => $item["vehicleName"] ?? null,
                            "vehiclePlateNumber"        => $item["vehiclePlateNumber"] ?? null,
                            "vehicleFuelConsumption"    => $item["vehicleFuelConsumption"] ?? null,
                            "vehicleGasType"            => $item["vehicleGasType"] ?? null,
                            "vehicleDistance"           => $item["vehicleDistance"] ?? null,
                            "vehicleLiters"             => $item["vehicleLiters"] ?? null,
                            "travelTypeDescription"     => $item["travelTypeDescription"] ?? null,
                            "unitCost"                  => $item["travelTypeUnitCost"] ?? null,
                            "totalCost"                 => $travelTypeTotalCost ?? null,
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($travelData, $temp);
                    }
                    
                    $this->billmaterial->saveBillMaterialTravel($travelData, $billMaterialID);
                }
            }
            
        }
        echo json_encode($saveBillMaterialData);
    }

    public function getDataDivision(){
        $billMaterialID       = $this->input->post("billMaterialID") ?? null;
        $costEstimateID       = $this->input->post("costEstimateID") ?? null;
        $result               = $this->billmaterial->getDataDivision($costEstimateID, $billMaterialID);
        echo json_encode($result);
    }


}
?>