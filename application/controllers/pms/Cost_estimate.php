<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cost_estimate extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/CostEstimate_model", "costestimate");
        isAllowed(38);
    }

    public function index()
    {
        $data["title"] = "Cost Estimate Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/cost_estimate/index");
        $this->load->view("template/footer");
    }

    public function saveCostEstimate()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $costEstimateID             = $this->input->post("costEstimateID") ?? null;
        $reviseCostEstimateID       = $this->input->post("reviseCostEstimateID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $timelineBuilderID          = $this->input->post("timelineBuilderID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $projectCategory            = $this->input->post("projectCategory") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;

        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $costEstimateStatus         = $this->input->post("costEstimateStatus");
        $costEstimateReason         = $this->input->post("costEstimateReason") ?? null;
        $costEstimateRemarks        = $this->input->post("costEstimateRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");

        $projectPhase               = $this->input->post("projectPhaseData") ?? null;
        $material                   = $this->input->post("materialData") ?? null;
        $manpower                   = $this->input->post("manpowerData") ?? null;
        $travel                     = $this->input->post("travelData") ?? null;

        $costEstimateData = [
            "reviseCostEstimateID" => $reviseCostEstimateID,
            "employeeID"              => $employeeID,
            "timelineBuilderID"       => $timelineBuilderID,
            "projectCode"             => $projectCode,
            "projectName"             => $projectName,
            "projectCategory"         => $projectCategory,
            "clientName"              => $clientName,
            "clientAddress"           => $clientAddress,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "costEstimateStatus"      => $costEstimateStatus,
            "costEstimateReason"      => $costEstimateReason,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($costEstimateData["reviseCostEstimateID"]);
            unset($costEstimateData["createdBy"]);
            unset($costEstimateData["createdAt"]);

            if ($method == "cancelform") {
                $costEstimateData = [
                    "costEstimateStatus" => 4,
                    "updatedBy"          => $updatedBy,
                ];
            } else if ($method == "approve") {
                $costEstimateData = [
                    "approversStatus"    => $approversStatus,
                    "approversDate"      => $approversDate,
                    "costEstimateStatus" => $costEstimateStatus,
                    "updatedBy"          => $updatedBy,
                ];
            } else if ($method == "deny") {
                $costEstimateData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "costEstimateStatus"  => 3,
                    "costEstimateRemarks" => $costEstimateRemarks,
                    "updatedBy"           => $updatedBy,
                ];
            }   else if ($method == "drop") {
                $costEstimateData = [
                    "reviseCostEstimateID" => $reviseCostEstimateID,
                    "costEstimateStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveCostEstimateData = $this->costestimate->saveCostEstimateData($action, $costEstimateData, $costEstimateID);
        if ($saveCostEstimateData) {
            $result = explode("|", $saveCostEstimateData);

            if ($result[0] == "true") {
                $costEstimateID = $result[2];

                if ($projectPhase) {
                    $projectPhaseData = [];
                    foreach($projectPhase as $index => $item) {
                        $temp = [
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
                            "updatedBy"                     => $updatedBy,
                            "createdBy"                     => $createdBy
                        ];
                        array_push($projectPhaseData, $temp);
                    }
                    $this->costestimate->saveCostEstimateProjectPhase($projectPhaseData, $costEstimateID);
                }

                if ($material) {
                    $materialData = [];
                    foreach($material as $index => $item) {
                        $temp = [
                            "costEstimateID"        => $costEstimateID,
                            "categoryType"          => "Materials and Equipment",
                            "itemCode"              => $item["materialItemCode"],
                            "itemID"	 	        => $item["materialItemID"],
                            "itemName"              => $item["materialItemName"],
                            "itemClassification"    => $item["materialItemClassification"],
                            "quantity"              => $item["materialItemQuantity"],
                            "itemUom"               => $item["materialItemUom"],
                            "updatedBy"             => $updatedBy,
                            "createdBy"             => $createdBy
                        ];
                        array_push($materialData, $temp);
                    }
                    $this->costestimate->saveCostEstimateMaterial($materialData, $costEstimateID);
                }

                if ($manpower) {
                    $manpowerData = [];
                    foreach($manpower as $index => $item) {
                        $temp = [
                            "costEstimateID"            => $costEstimateID,
                            "designationID"             => $item["designationID"],
                            "designationCode"	 	    => $item["designationCode"],
                            "designation"               => $item["designation"],
                            "designationQuantity"       => $item["designationQuantity"],
                            "designationTotalManHours"  => $item["designationTotalManHours"],
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($manpowerData, $temp);
                    }
                    $this->costestimate->saveCostEstimateManpower($manpowerData, $costEstimateID);
                }

                if ($travel) {
                    $travelData = [];
                    foreach($travel as $index => $item) {
                        $temp = [
                            "costEstimateID"            => $costEstimateID,
                            "travelType"                => $item["travelType"],
                            "vehicleID"                 => $item["vehicleID"] ?? null,
                            "vehicleCode"	 	        => $item["vehicleCode"] ?? null,
                            "vehicleName"               => $item["vehicleName"] ?? null,
                            "vehiclePlateNumber"        => $item["vehiclePlateNumber"] ?? null,
                            "vehicleFuelConsumption"    => $item["vehicleFuelConsumption"] ?? null,
                            "vehicleGasType"            => $item["vehicleGasType"] ?? null,
                            "vehicleDistance"           => $item["vehicleDistance"] ?? null,
                            "travelTypeDescription"     => $item["travelTypeDescription"] ?? null,
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($travelData, $temp);
                    }
                    $this->costestimate->saveCostEstimateTravel($travelData, $costEstimateID);
                }
                
                
            }
            
        }
        echo json_encode($saveCostEstimateData);
    }

    public function getDataDivision(){
        $timelineBuilderID       = $this->input->post("timelineBuilderID") ?? null;
        $costEstimateID          = $this->input->post("costEstimateID") ?? null;
        $result                  = $this->costestimate->getDataDivision($timelineBuilderID, $costEstimateID);
        echo json_encode($result);
    }


}
?>