<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Return_item extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ReturnItem_model", "returnitem");
        isAllowed(35);
    }

    public function index()
    {
        $data["title"] = "Return Item";

        $this->load->view("template/header",$data);
        $this->load->view("ims/return_item/index");
        $this->load->view("template/footer");
    }

    
    public function savereturnitem()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $returnItemID               = $this->input->post("returnItemID") ?? null;
        $reviseReturnItemID         = $this->input->post("reviseReturnItemID") ?? null;
        $itemID                     = $this->input->post("itemID") ?? null;
        $equipmentBorrowingID       = $this->input->post("equipmentBorrowingID") ?? null;
        $equipmentBorrowingCode     = $this->input->post("equipmentBorrowingCode") ?? null;
        $projectID                  = $this->input->post("projectID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $clientID                   = $this->input->post("clientID") ?? null;
        $clientCode                 = $this->input->post("clientCode") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;
        $dateNeeded                 = $this->input->post("dateNeeded") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $returnItemStatus           = $this->input->post("returnItemStatus");
        $returnItemReason           = $this->input->post("returnItemReason") ?? null;
        $returnItemRemarks          = $this->input->post("returnItemRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;
       // $createatforCode            = $this->input->post("createatforCode");


        // /print_r(returnItemStatus);
       
        // echo "<pre>";
        // print_r($items);
        // echo json_encode($items);
        // exit;

        $lastApproveCondition       = $this->input->post("lastApproveCondition");

           
      

        $returnitemData = [
            "reviseReturnItemID"        => $reviseReturnItemID,
            "equipmentBorrowingID"      => $equipmentBorrowingID,
            "equipmentBorrowingCode"    => $equipmentBorrowingCode,
            "projectID"                 => $projectID,
            "projectCode"               => $projectCode,
            "projectName"               => $projectName,
            "clientID"                  => $clientID,
            "clientCode"                => $clientCode,
            "clientName"                => $clientName,
            "clientAddress"             => $clientAddress,
            "dateNeeded"                => $dateNeeded,
            "employeeID"                => $employeeID,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "returnItemStatus"          => $returnItemStatus,
            "returnItemReason"          => $returnItemReason,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($returnitemData["reviseReturnItemID"]);
            unset($returnitemData["createdBy"]);
            unset($returnitemData["createdAt"]);

            if ($method == "cancelform") {
                $returnitemData = [
                    "returnItemStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $returnitemData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "returnItemStatus"      => $returnItemStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $returnitemData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "returnItemStatus"  => 3,
                    "returnItemRemarks" => $returnItemRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "reviseReturnItemID" => $reviseReturnItemID,
                    "returnItemStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } else {
                $this->returnitem->deleteItemAndSerial($returnItemID );
            }
        }
    

        $savereturnitemData = $this->returnitem->savereturnitemData($action, $returnitemData, $returnItemID );

        if ($savereturnitemData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $savereturnitemData);

            if ($result[0] == "true") {
                $returnItemID  = $result[2];
                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "returnItemID "         => $returnItemID,
                            "inventoryCode"         => getFormCode("RI", $item["created"], $returnItemID),
                            "itemID"                => $item["itemID"],
                            "itemCode"              => $item["itemCode"],
                            "itemName"              => $item["itemName"],
                            "Brand"                 => $item["Brand"],
                            "borrowedQuantity"      => $item["borrowedQuantity"],
                            "quantity"              => $item["quantity"],
                            "receivedQuantity"      => $item["receivedQuantity"],
                            "borrowedDate"          => $item["borrowedDate"],
                            "remarks"               => $item["remarks"],
                            "classificationName"    => $item["classificationName"],
                            "categoryName"          => $item["categoryName"],
                            "uom"                   => $item["uom"],
                            "createdBy"             => $updatedBy,
                            "updatedBy"             => $updatedBy,
                        ];

                       // $scopes = $item["scopes"];
                       if(!empty($item["scopes"])){
                        $scopes = $item["scopes"];
                        
                        $saveServices = $this->returnitem->saveSerial($scopes, $returnItemID); 
                    }  

                      
                        
                        $saveServices = $this->returnitem->saveServices($service, $returnItemID ,$item["itemID"]);
                    }
                    
                    // if ($returnitemData["returnItemStatus"] == "2") {
                    //     $this->returnitem->updateOrderedPending($returnItemID );
                    // }
                }

            }
            
        }
        echo json_encode($savereturnitemData);
    }

}
?>