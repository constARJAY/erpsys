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
        $itemID                     = $this->input->post("itemID ") ?? null;
        $reviseReturnItemID         = $this->input->post("reviseReturnItemID") ?? null;
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
            "employeeID"                 => $employeeID,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "returnItemStatus"          => $returnItemStatus,
            "returnItemReason"          => $returnItemReason,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
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
                            "inventoryCode"         => getFormCode("RI", $item["createatforCode"], $returnItemID),
                            "itemID"                => $item["itemID"],
                            "quantity"             => $item["quantity"],
                            "remarks"              => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];

                        $scopes = $item["scopes"];

                      
                        
                        $saveServices = $this->returnitem->saveServices($service, $scopes, $returnItemID ,$item["itemID"]);
                    }
                    
                    if ($returnitemData["returnItemStatus"] == "2") {
                        $this->returnitem->updateOrderedPending($returnItemID );
                    }
                }

            }
            
        }
        echo json_encode($savereturnitemData);
    }

}
?>