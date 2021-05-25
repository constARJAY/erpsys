<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_incident extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryIncident_model", "purchaserequest");
        isAllowed(44);
    }

    public function index()
    {
        $data["title"] = "Inventory Incident";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_incident/index");
        $this->load->view("template/footer");
    }

    public function saveInventoryIncident()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $incidentID       = $this->input->post("incidentID") ?? null;
        $reviseIncidentID = $this->input->post("reviseIncidentID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        // $inventoryStorageID      = $this->input->post("inventoryStorageID") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $incidentStatus   = $this->input->post("incidentStatus");
        $incidentReason   = $this->input->post("incidentReason") ?? null;
        $incidentRemarks  = $this->input->post("incidentRemarks") ?? null;
        $incidentActionPlan  = $this->input->post("incidentActionPlan") ?? null;
        $incidentAccountablePerson  = $this->input->post("incidentAccountablePerson") ?? null;
        $incidentTargetCompletion  = $this->input->post("incidentTargetCompletion") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            "reviseIncidentID" => $reviseIncidentID,
            "employeeID"              => $employeeID,
            // "inventoryStorageID "     => $inventoryStorageID ,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "incidentStatus"   => $incidentStatus,
            "incidentReason"   => $incidentReason,
            "incidentActionPlan"   => $incidentActionPlan,
            "incidentAccountablePerson"   => $incidentAccountablePerson,
            "incidentTargetCompletion"   => $incidentTargetCompletion,
            // "projectTotalAmount"      => $projectTotalAmount,
            // "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            // unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($purchaseRequestData["createdBy"]);
            unset($purchaseRequestData["createdAt"]);

            if ($method == "cancelform") {
                $purchaseRequestData = [
                    "incidentStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "incidentStatus" => $incidentStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "incidentStatus"  => 3,
                    "incidentRemarks" => $incidentRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "reviseIncidentID" => $reviseIncidentID,
                    "incidentStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveTransferData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $incidentID);
        if ($saveTransferData) {
            $result = explode("|", $saveTransferData);

            if ($result[0] == "true") {
                $incidentID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "incidentID"                    => $incidentID,
                            "barcode"                       => $item["barcode"],
                            "itemCode"                      => $item["itemCode"],
                            "itemID"                        => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "itemName"                      => $item["itemName"],
                            "inventoryStorageID"            => $item["inventoryStorageID"] != "null" ? $item["inventoryStorageID"] : null,
                            "inventoryStorageOfficeCode"    => $item["storagecode"],
                            "inventoryStorageOfficeName"    => $item["storageName"],
                            "quantity"                      => $item["quantity"],
                            "unitOfMeasurement"             => $item["uom"],
                            "classificationName"          => $item["classificationname"],
                            "incidentInformation"          => $item["incidentInformation"],
                            "incidentRecommendation"          => $item["incidentRecommendation"],
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($purchaseRequestItems, $temp);

                    }

                    $savePurchTransferstItems = $this->purchaserequest->savePurchaseRequestItems($purchaseRequestItems, $incidentID);
                }

            }
            
        }
        echo json_encode($saveTransferData);
    }

}
?>