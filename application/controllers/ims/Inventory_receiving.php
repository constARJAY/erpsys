<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_receiving extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryReceiving_model", "servicerequisition");
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
        $inventoryReceivingID        = $this->input->post("inventoryReceivingID") ?? null;
        $reviseInventoryReceivingID = $this->input->post("reviseInventoryReceivingID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $purchaseOrderID                   = $this->input->post("purchaseOrderID") ?? null;
        $dateReceived                 = $this->input->post("dateReceived");
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

        $lastApproveCondition                  = $this->input->post("lastApproveCondition");

      



        $serviceRequisitionData = [
            "reviseInventoryReceivingID" => $reviseInventoryReceivingID,
            "employeeID"                 => $employeeID,
            "purchaseOrderID"                   => $purchaseOrderID,
            "dateReceived"                 => $dateReceived,
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
            unset($serviceRequisitionData["reviseInventoryReceivingID"]);
            unset($serviceRequisitionData["createdBy"]);
            unset($serviceRequisitionData["createdAt"]);

            if ($method == "cancelform") {
                $serviceRequisitionData = [
                    "inventoryReceivingStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $serviceRequisitionData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "inventoryReceivingStatus" => $inventoryReceivingStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $serviceRequisitionData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "inventoryReceivingStatus"  => 3,
                    "inventoryReceivingRemarks" => $inventoryReceivingRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else {
                // $this->servicerequisition->deleteServicesAndScopes($inventoryReceivingID);
            }
        }

        $saveServiceRequisitionData = $this->servicerequisition->saveServiceRequisitionData($action, $serviceRequisitionData, $inventoryReceivingID);

        if ($saveServiceRequisitionData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $saveServiceRequisitionData);

            if ($result[0] == "true") {
                $inventoryReceivingID = $result[2];

                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "inventoryReceivingID" => $inventoryReceivingID,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "received"          => $item["received"],
                            "remarks"              => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];
                        $scopes = $item["scopes"];
                        
                        // $saveServices = $this->servicerequisition->saveServices($service, $scopes, $inventoryReceivingID);
                        if($lastApproveCondition == "false"){ // check if  lastapprover or not
                            $this->servicerequisition->updateOrderedPending($scopes,$service);
                        }
                    }
                }

            }
            
        }
        echo json_encode($saveServiceRequisitionData);
    }

}
?>