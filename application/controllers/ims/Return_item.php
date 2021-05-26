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

    
    public function saveTransferRequest()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $returnItemID            = $this->input->post("returnItemID") ?? null;
        $borrowingID            = $this->input->post("borrowingID") ?? null;
        $reviseReturnItemID      = $this->input->post("reviseReturnItemID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $projectID              = $this->input->post("projectID") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $returnItemStatus          = $this->input->post("returnItemStatus");
        $returnItemReason        = $this->input->post("returnItemReason") ?? null;
        $returnItemRemarks      = $this->input->post("returnItemRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $returnItemData = [
            "reviseReturnItemID"      => $reviseReturnItemID,
            "employeeID"              => $employeeID,
            "projectID "                => $projectID ,
            "borrowingID "             => $borrowingID ,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "returnItemStatus"         => $returnItemStatus,
            "returnItemReason"         => $returnItemReason,
            // "projectTotalAmount"      => $projectTotalAmount,
            // "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($returnItemData["reviseReturnItemID"]);
            unset($returnItemData["createdBy"]);
            unset($returnItemData["createdAt"]);

            if ($method == "cancelform") {
                $returnItemData = [
                    "returnItemStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $returnItemData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "returnItemStatus"      => $returnItemStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $returnItemData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "returnItemStatus"  => 3,
                    "returnItemRemarks" => $returnItemRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $disposalItemData = [
                    "reviseReturnItemID"        => $reviseReturnItemID,
                    "returnItemStatus"          => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

    $saveReturnData = $this->returnitem->saveReturnApprovalData($action, $returnItemData, $returnItemID);
        if ($saveReturnData) {
            $result = explode("|", $saveReturnData);

            if ($result[0] == "true") {
                $returnItemID = $result[2];

                if ($items) {
                    $returnItems = [];
                    foreach($items as $index => $item) {
                        
                        $temp = [
                            "returnItemID"          => $returnItemID,
                            "borrowingDetailID"     => $item["borrowingDetailID"],
                            "inventoryStorageID"    => $item["inventoryStorageID"],
                            "itemID"                => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "itemName"              => $item["itemName"],
                            "barcode"               => $item["barcode"],
                            "serialnumber"          => $item["serialnumber"],
                            "dateBorrowed"          => $item["dateBorrowed"],
                            "borrowedPurpose"       => $item["borrowedPurpose"],
                            "quantityBorrowed"      => $item["quantityBorrowed"],
                            "returnItemDate"        => $item["returnItemDate"],
                            "returnItemQuantity"    => $item["returnItemQuantity"],
                        ];
                        array_push($returnItems, $temp);
                    }
                    
                    $saveReturnItems = $this->returnitem->saveReturnItemsData($returnItems, $returnItemID);
                }

            }
            
        }
        echo json_encode($saveReturnData);  
        
    }    

}
?>