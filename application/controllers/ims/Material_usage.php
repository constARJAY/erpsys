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

    public function saveMaterialUsageItem()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $materialUsageID            = $this->input->post("materialUsageID") ?? null;
        $itemID                     = $this->input->post("itemID") ?? null;
        $reviseMaterialUsageID      = $this->input->post("reviseMaterialUsageID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectCode                 = $this->input->post("projectCode");
        $projectName                 = $this->input->post("projectName");
        $projectCategory             = $this->input->post("projectCategory");
        $clientCode                 = $this->input->post("clientCode");
        $clientName                 = $this->input->post("clientName");
        $clientAddress              = $this->input->post("clientAddress");
        $materialUsageDate          = $this->input->post("materialUsageDate");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $materialUsageStatus        = $this->input->post("materialUsageStatus");
        $materialUsageReason        = $this->input->post("materialUsageReason") ?? null;
        $materialWithdrawalCode     = $this->input->post("materialWithdrawalCode") ?? null;
        $materialWithdrawalID     = $this->input->post("materialWithdrawalID") ?? null;
        $inventoryValidationID     = $this->input->post("inventoryValidationID") ?? null;
        $inventoryValidationCode    = $this->input->post("inventoryValidationCode") ?? null;
        $materialRequestID          = $this->input->post("materialRequestID") ?? null;
        $materialRequestCode          = $this->input->post("materialRequestCode") ?? null;
        $stockOutID                 = $this->input->post("stockOutID") ?? null;
        $materialUsageRemarks       = $this->input->post("materialUsageRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        // /print_r(materialUsageStatus);
       
        // echo "<pre>";
        // print_r($items);
        // echo json_encode($items);
        // exit;

     

        $lastApproveCondition       = $this->input->post("lastApproveCondition");

           
      

        $materialUsageData = [
            "reviseMaterialUsageID"      => $reviseMaterialUsageID,
            "employeeID"                 => $employeeID,
            "projectCode"                 => $projectCode,
            "projectName"                 => $projectName,
            "projectCategory"             => $projectCategory,
            "clientCode"                 => $clientCode,
            "clientName"                 => $clientName,
            "clientAddress"              => $clientAddress,
            "materialUsageDate"          => $materialUsageDate,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "materialUsageStatus"        => $materialUsageStatus,
            "materialWithdrawalCode"    =>  $materialWithdrawalCode,
            "materialWithdrawalID"      =>  $materialWithdrawalID,
            "inventoryValidationID"     =>  $inventoryValidationID,
            "inventoryValidationCode"    =>  $inventoryValidationCode,
            "materialRequestID"         =>  $materialRequestID,
            "materialRequestCode"       =>  $materialRequestCode,
            "stockOutID"                =>  $stockOutID,
            "materialUsageReason"        => $materialUsageReason,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($materialUsageData["reviseMaterialUsageID"]);
            unset($materialUsageData["createdBy"]);
            unset($materialUsageData["createdAt"]);

            if ($method == "cancelform") {
                $materialUsageData = [
                    "materialUsageStatus"      => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $materialUsageData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "materialUsageStatus"      => $materialUsageStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $materialUsageData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "materialUsageStatus"       => 3,
                    "materialUsageRemarks"      => $materialUsageRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "reviseMaterialUsageID" => $reviseMaterialUsageID,
                    "materialUsageStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } else {
                $this->materialusage->deleteItemAndSerial($materialUsageID );
            }
        }
    

        $savematerialUsageData = $this->materialusage->saveMaterialUsageData($action, $materialUsageData, $materialUsageID );

        if ($savematerialUsageData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $savematerialUsageData);

            if ($result[0] == "true") {
                $materialUsageID  = $result[2];
                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "materialUsageID "     => $materialUsageID,
                            "inventoryCode"        => getFormCode("MUF", $item["createatforCode"], $materialUsageID),
                            "recordID"             => $item["assetoritem"],
                            "itemID"               => $item["itemID"],
                            "itemCode"             => $item["itemCode"],
                            "itemName"              => $item["itemName"],
                            "uom"                   => $item["uom"],
                            "Brand"                 => $item["brand"],
                            "classificationName"    => $item["classificationName"],
                            "categoryName"          => $item["categoryName"],
                            "quantity"              => $item["quantity"],
                            "used"                  => $item["used"],
                            "unused"                => $item["unused"],
                            "remarks"               => $item["remarks"],
                            "createdBy"             => $updatedBy,
                            "updatedBy"             => $updatedBy,
                        ];
                        if(!empty($item["scopes"])){
                            $scopes = $item["scopes"];
                            
                            $saveServices = $this->materialusage->saveSerial($scopes, $materialUsageID); 
                        }    
                        $saveServices = $this->materialusage->saveServices($service,  $materialUsageID ,$item["itemID"]);
                    }
                    
                                      
                    
                    // if ($materialUsageData["materialUsageStatus"] == "2") {
                    //     $this->materialusage->updateOrderedPending($materialUsageID );
                    // }
                }

            }
            
        }
        echo json_encode($savematerialUsageData);
    }

}
?>