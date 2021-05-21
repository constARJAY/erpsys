<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_receiving extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryReceiving_model", "inventoryreceiving");
        isAllowed(46);
    }

    public function index()
    {
        $data["title"] = "Inventory Receiving ";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_receiving/index");
        $this->load->view("template/footer");
    }

    public function saveInventoryReceiving()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $inventoryReceivingID       = $this->input->post("inventoryReceivingID") ?? null;
        $reviseInventoryReceivingID = $this->input->post("reviseInventoryReceivingID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $purchaseOrderID            = $this->input->post("purchaseOrderID") ?? null;
        $dateReceived               = $this->input->post("dateReceived");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $inventoryReceivingStatus   = $this->input->post("inventoryReceivingStatus");
        $inventoryReceivingReason   = $this->input->post("inventoryReceivingReason") ?? null;
        $inventoryReceivingRemarks  = $this->input->post("inventoryReceivingRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        $lastApproveCondition       = $this->input->post("lastApproveCondition");

      



        $inventoryReceivingData = [
            "reviseInventoryReceivingID" => $reviseInventoryReceivingID,
            "employeeID"                 => $employeeID,
            "purchaseOrderID"            => $purchaseOrderID,
            "dateReceived"               => $dateReceived,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "inventoryReceivingStatus"   => $inventoryReceivingStatus,
            "inventoryReceivingReason"   => $inventoryReceivingReason,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($inventoryReceivingData["reviseInventoryReceivingID"]);
            unset($inventoryReceivingData["createdBy"]);
            unset($inventoryReceivingData["createdAt"]);

            if ($method == "cancelform") {
                $inventoryReceivingData = [
                    "inventoryReceivingStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $inventoryReceivingData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "inventoryReceivingStatus" => $inventoryReceivingStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $inventoryReceivingData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "inventoryReceivingStatus"  => 3,
                    "inventoryReceivingRemarks" => $inventoryReceivingRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else {
                // $this->inventoryreceiving->deleteServicesAndScopes($inventoryReceivingID);
            }
        }

        $saveInventoryReceivingData = $this->inventoryreceiving->saveInventoryReceivingData($action, $inventoryReceivingData, $inventoryReceivingID);

        if ($saveInventoryReceivingData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $saveInventoryReceivingData);

            if ($result[0] == "true") {
                $inventoryReceivingID = $result[2];

                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "inventoryReceivingID" => $inventoryReceivingID,
                            "requestItemID"        => $item["requestItemID"] != "null" ? $item["requestItemID"] : null,
                            "itemID"               => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "received"             => $item["received"],
                            "remarks"              => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];
                        $scopes = $item["scopes"];
                        
                        $saveServices = $this->inventoryreceiving->saveServices($service, $scopes, $inventoryReceivingID);
                        // if($lastApproveCondition == "false"){ // check if  lastapprover or not
                        //     $this->inventoryreceiving->updateOrderedPending($scopes,$service);
                        // }
                    }
                }

            }
            
        }
        echo json_encode($saveInventoryReceivingData);
    }

}
?>