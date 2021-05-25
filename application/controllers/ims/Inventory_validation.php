<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_validation extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryValidation_model", "inventoryvalidation");
        isAllowed(126);
    }

    public function index()
    {
        $data["title"] = "Inventory Validation";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_validation/index");
        $this->load->view("template/footer");
    }

    public function save_inventory_validation(){
        $action                         = $this->input->post("action");
        $method                         = $this->input->post("method");
        $inventoryValidationID          = $this->input->post("inventoryValidationID") ?? null;
        $reviseInventoryValidationID    = $this->input->post("reviseInventoryValidationID") ?? null;
        $employeeID                     = $this->input->post("employeeID");
        $projectID                      = $this->input->post("projectID") ?? null;
        $purchaseRequestID              = $this->input->post("documentID") ?? null;
        $approversID                    = $this->input->post("approversID") ?? null;
        $approversStatus                = $this->input->post("approversStatus") ?? null;
        $approversDate                  = $this->input->post("approversDate") ?? null;
        $inventoryValidationStatus      = $this->input->post("inventoryValidationStatus");
        $inventoryValidationReason      = $this->input->post("inventoryValidationReason") ?? null;
        $inventoryValidationRemarks     = $this->input->post("inventoryValidationRemarks") ?? null;
        $submittedAt                    = $this->input->post("submittedAt") ?? null;
        $createdBy                      = $this->input->post("createdBy");
        $updatedBy                      = $this->input->post("updatedBy");
        $createdAt                      = $this->input->post("createdAt");
        $items                          = $this->input->post("items") ?? null;

        $inventoryValidationData = [
            "reviseInventoryValidationID"   => $reviseInventoryValidationID,
            "purchaseRequestID"             => $purchaseRequestID,
            "employeeID"                    => $employeeID,
            "projectID"                     => $projectID,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "inventoryValidationStatus"     => $inventoryValidationStatus,
            "inventoryValidationReason"     => $inventoryValidationReason,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt
        ];

        if ($action == "update") {
            unset($inventoryValidationData["reviseInventoryValidationID"]);
            unset($inventoryValidationData["createdBy"]);
            unset($inventoryValidationData["createdAt"]);

            if ($method == "cancelform") {
                $inventoryValidationData = [
                    "inventoryValidationStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $inventoryValidationData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "inventoryValidationStatus" => $inventoryValidationStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $inventoryValidationData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "inventoryValidationStatus"  => 3,
                    "inventoryValidationRemarks" => $inventoryValidationRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $inventoryValidationData = [
                    "reviseInventoryValidationID" => $reviseInventoryValidationID,
                    "inventoryValidationStatus"   => 5,
                    "updatedBy"                   => $updatedBy,
                ]; 
            }
        }

        $saveInventoryValidationData = $this->inventoryvalidation->saveInventoryValidationData($action, $inventoryValidationData, $inventoryValidationID);
        if ($saveInventoryValidationData) {
            $result = explode("|", $saveInventoryValidationData);

            if ($result[0] == "true") {
                $inventoryValidationID = $result[2];
                if ($items) {
                    $inventoryValidationtems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "inventoryValidationID" => $inventoryValidationID,
                            "costEstimateID"        => $item["costEstimateID"],
                            "purchaseRequestID"     => $purchaseRequestID,
                            "categoryType"          => $item["category"],
                            "itemID"                => $item["itemID"],
                            "itemname"              => $item["itemname"],
                            "itemUom"               => $item["itemUom"],
                            "itemDescription"       => $item["itemDescription"],
                            "quantity"              => $item["quantity"],
                            "stocks"                => $item["stocks"],
                            "files"                 => $item["files"],
                            "forPurchase"           => $item["forPurchase"],
                            "createdBy"             => $createdBy,
                            "updatedBy"             => $item["updatedBy"],
                        ];
                        array_push($inventoryValidationtems, $temp);
                    }
                    
                    $saveInventoryValidationItems = $this->inventoryvalidation->saveInventoryValidationItems($inventoryValidationtems, $inventoryValidationID);
                }

            }
            
        }
        echo json_encode($saveInventoryValidationData);
    }

    public function saveCanvassingData(){
        $id     = $this->input->post("inventoryValidationID");
        $result = $this->inventoryvalidation->saveCanvassingData($id);
        echo json_encode($result);
    }


}
?>     