<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Material_usage extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/MaterialUsage_model", "materialusage");
        isAllowed(45);
    }

    public function index()
    {
        $data["title"] = "Material Usage";

        $this->load->view("template/header",$data);
        $this->load->view("ims/material_usage/index");
        $this->load->view("template/footer");
    }

    public function save_material_usage(){
        $action                   = $this->input->post("action");
        $method                   = $this->input->post("method");
        $materialUsageID          = $this->input->post("materialUsageID") ?? null;
        $referenceCode            = $this->input->post("referenceCode") ?? null;
        $reviseMaterialUsageID    = $this->input->post("reviseMaterialUsageID") ?? null;
        $employeeID               = $this->input->post("employeeID");
        $projectID                = $this->input->post("projectID") ?? null;
        $approversID              = $this->input->post("approversID") ?? null;
        $approversStatus          = $this->input->post("approversStatus") ?? null;
        $approversDate            = $this->input->post("approversDate") ?? null;
        $materialUsageStatus      = $this->input->post("materialUsageStatus");
        $materialUsageReason      = $this->input->post("materialUsageReason") ?? null;
        $materialUsageRemarks     = $this->input->post("materialUsageRemarks") ?? null;
        $submittedAt              = $this->input->post("submittedAt") ?? null;
        $createdBy                = $this->input->post("createdBy");
        $updatedBy                = $this->input->post("updatedBy");
        $createdAt                = $this->input->post("createdAt");
        $items                    = $this->input->post("items") ?? null;

        $materialUsageData = [
            "reviseMaterialUsageID" => $reviseMaterialUsageID,
            "referenceCode"         => $referenceCode,
            "employeeID"            => $employeeID,
            "projectID"             => $projectID,
            "approversID"           => $approversID,
            "approversStatus"       => $approversStatus,
            "approversDate"         => $approversDate,
            "materialUsageStatus"   => $materialUsageStatus,
            "materialUsageReason"   => $materialUsageReason,
            "submittedAt"           => $submittedAt,
            "createdBy"             => $createdBy,
            "updatedBy"             => $updatedBy,
            "createdAt"             => $createdAt
        ];

        if ($action == "update") {
            unset($materialUsageData["reviseMaterialUsageID"]);
            unset($materialUsageData["createdBy"]);
            unset($materialUsageData["createdAt"]);

            if ($method == "cancelform") {
                $materialUsageData = [
                    "materialUsageStatus" => 4,
                    "updatedBy"           => $updatedBy,
                ];
            } else if ($method == "approve") {
                $materialUsageData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "materialUsageStatus" => $materialUsageStatus,
                    "updatedBy"           => $updatedBy,
                ];
            } else if ($method == "deny") {
                $materialUsageData = [
                    "approversStatus"      => $approversStatus,
                    "approversDate"        => $approversDate,
                    "materialUsageStatus"  => 3,
                    "materialUsageRemarks" => $materialUsageRemarks,
                    "updatedBy"            => $updatedBy,
                ];
            }
        }

        $saveMaterialUsageData = $this->materialusage->saveMaterialUsageData($action, $materialUsageData, $materialUsageID);
        if ($saveMaterialUsageData) {
            $result = explode("|", $saveMaterialUsageData);

            if ($result[0] == "true") {
                $materialUsageID = $result[2];
                if ($items) {
                    $materialUsagetems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "materialWithdrawalID"          => $referenceCode,
                            "materialUsageID"               => $materialUsageID,
                            "inventoryStorageID"            => $item["inventoryStorageID"],
                            "inventoryStorageOfficeName"    => $item["inventoryStorageOfficeName"],
                            "itemID"                        => $item["itemID"],
                            "itemname"                      => $item["itemname"],
                            "unitOfMeasurementID"           => $item["unitOfMeasurementID"],
                            "itemDescription"               => $item["itemDescription"],
                            "receivingQuantity"             => $item["receivingQuantity"],
                            "stockInQuantity"               => $item["stockInQuantity"],	
                            "utilized"                      => $item["utilized"],
                            "unused"                        => $item["unused"],
                            "itemUsageRemarks"              => $item["itemUsageRemarks"],
                            "createdBy"                     => $item["createdBy"],
                            "updatedBy"                     => $item["updatedBy"],
                        ];
                        array_push($materialUsagetems, $temp);
                    }
                    
                    $saveMaterialUsageItems = $this->materialusage->saveMaterialUsageItems($materialUsagetems, $materialUsageID);
                }

            }
            
        }
        echo json_encode($saveMaterialUsageData);
    }


}
?>     