<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_receiving extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryReceiving_model", "inventoryreceiving");
        isAllowed(33);
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
        $receiptNo                 = $this->input->post("receiptNo");
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
       
        // echo "<pre>";
        // print_r($items);
        // echo json_encode($items);
        // exit;

        $lastApproveCondition       = $this->input->post("lastApproveCondition");
        $inventoryReceivingData = [
            "reviseInventoryReceivingID" => $reviseInventoryReceivingID,
            "employeeID"                 => $employeeID,
            "receiptNo"                 => $receiptNo,
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
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "reviseInventoryReceivingID" => $reviseInventoryReceivingID,
                    "inventoryReceivingStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } else {
                $this->inventoryreceiving->deleteItemAndSerial($inventoryReceivingID);
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
                            "itemCode"             => $item["itemCode"],
                            "recordID"             => $item["recordID"],
                            "inventoryCode"        => getFormCode("INNR", $item["created"], $inventoryReceivingID),
                            "itemID"               => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "itemName"             => $item["itemName"],
                            "Brand"                 => $item["Brand"],
                            "classificationName"   => $item["classificationName"],
                            "categoryName"          => $item["categoryName"],
                            "quantity"              => $item["quantity"],
                            "receivedQuantity"      => $item["receivedQuantity"],
                            "remainingQuantity"     => $item["remainings"],
                            "remarks"               => $item["remarks"],
                            "createdBy"             => $updatedBy,
                            "updatedBy"             => $updatedBy,
                        ];

                        $scopes = $item["scopes"];

                      
                        
                        $saveServices = $this->inventoryreceiving->saveServices($service, $scopes, $inventoryReceivingID,$item["itemID"]);
                    }
                    
                    if ($inventoryReceivingData["inventoryReceivingStatus"] == "2") {
                        $this->inventoryreceiving->updateOrderedPending($inventoryReceivingID);
                    }
                }

            }
            
        }
        echo json_encode($saveInventoryReceivingData);
    }

}
?>