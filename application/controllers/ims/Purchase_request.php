<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/PurchaseRequest_model", "purchaserequest");
        isAllowed(46);
    }

    public function index()
    {
        $data["title"] = "Purchase Request";

        $this->load->view("template/header",$data);
        $this->load->view("ims/purchase_request/index");
        $this->load->view("template/footer");
    }

    public function savePurchaseRequest()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $purchaseRequestID       = $this->input->post("purchaseRequestID") ?? null;
        $revisePurchaseRequestID = $this->input->post("revisePurchaseRequestID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $costEstimateID          = $this->input->post("costEstimateID") ?? null;
        $projectID               = $this->input->post("projectID") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $purchaseRequestStatus   = $this->input->post("purchaseRequestStatus");
        $purchaseRequestReason   = $this->input->post("purchaseRequestReason") ?? null;
        $projectTotalAmount      = $this->input->post("projectTotalAmount") ?? null;
        $companyTotalAmount      = $this->input->post("companyTotalAmount") ?? null;
        $purchaseRequestRemarks  = $this->input->post("purchaseRequestRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "costEstimateID"          => $costEstimateID,
            "projectID"               => $projectID,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "purchaseRequestStatus"   => $purchaseRequestStatus,
            "purchaseRequestReason"   => $purchaseRequestReason,
            "projectTotalAmount"      => $projectTotalAmount,
            "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($purchaseRequestData["createdBy"]);
            unset($purchaseRequestData["createdAt"]);

            if ($method == "cancelform") {
                $purchaseRequestData = [
                    "purchaseRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "purchaseRequestStatus" => $purchaseRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "purchaseRequestStatus"  => 3,
                    "purchaseRequestRemarks" => $purchaseRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $savePurchaseRequestData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $purchaseRequestID);
        if ($savePurchaseRequestData) {
            $result = explode("|", $savePurchaseRequestData);

            if ($result[0] == "true") {
                $purchaseRequestID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            // "requestItemID"     => $item["requestItemID"] != "null" ? $item["requestItemID"] : null,
                            "costEstimateID"    => $costEstimateID,
                            "purchaseRequestID" => $purchaseRequestID,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "itemName"          => $item["itemName"] != "null" ? $item["itemName"] : null,
                            "itemDescription"   => $item["itemDescription"] != "null" ? $item["itemDescription"] : null,
                            "itemUom"           => $item["itemUom"] != "null" ? $item["itemUom"] : null,
                            "inventoryVendorID" => $item["inventoryVendorID"] != "null" ? $item["inventoryVendorID"] : null,
                            "categoryType"      => $item["categoryType"],
                            "quantity"          => $item["quantity"],
                            "unitCost"          => $item["unitcost"],
                            "totalCost"         => $item["totalcost"],
                            "files"             => array_key_exists("existingFile", $item) ? $item["existingFile"] : null, 
                            "remarks"           => $item["remarks"] ? $item["remarks"] : null, 
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($purchaseRequestItems, $temp);
                    }
                    
                    if (isset($_FILES["items"])) {
                        $length = count($_FILES["items"]["name"]);
                        $keys   = array_keys($_FILES["items"]["name"]);
                        for ($i=0; $i<$length; $i++) {
                            $uploadedFile = explode(".", $_FILES["items"]["name"][$keys[$i]]["file"]);

                            $index     = (int)$uploadedFile[0]; 
                            $extension = $uploadedFile[1];
                            $filename  = $i.time().'.'.$extension;

                            $folderDir = "assets/upload-files/request-items/";
                            if (!is_dir($folderDir)) {
                                mkdir($folderDir);
                            }
                            $targetDir = $folderDir.$filename;

                            if (move_uploaded_file($_FILES["items"]["tmp_name"][$index]["file"], $targetDir)) {
                                $purchaseRequestItems[$index]["files"] = $filename;
                            }
                            
                        } 

                        // ----- UPDATE ITEMS FILE -----
                        foreach ($purchaseRequestItems as $key => $prItem) {
                            if (!array_key_exists("files", $prItem)) {
                                $purchaseRequestItems[$key]["files"] = null;
                            }
                        }
                        // ----- END UPDATE ITEMS FILE -----
                    }

                    $savePurchaseRequestItems = $this->purchaserequest->savePurchaseRequestItems($action, $purchaseRequestItems, $purchaseRequestID, $costEstimateID);
                }

            }
            
        }
        echo json_encode($savePurchaseRequestData);
    }

}
?>