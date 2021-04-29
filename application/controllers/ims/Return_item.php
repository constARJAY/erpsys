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
        $returnID                = $this->input->post("returnID") ?? null;
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

        $purchaseRequestData = [
            // "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "projectID "                => $projectID ,
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
            // unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($purchaseRequestData["createdBy"]);
            unset($purchaseRequestData["createdAt"]);

            if ($method == "cancelform") {
                $purchaseRequestData = [
                    "returnItemStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "returnItemStatus"      => $returnItemStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "returnItemStatus"  => 3,
                    "returnItemRemarks" => $returnItemRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

    $saveTransferData = $this->returnitem->savePurchaseRequestData($action, $purchaseRequestData, $returnID);
        if ($saveTransferData) {
            $result = explode("|", $saveTransferData);

            if ($result[0] == "true") {
                $returnID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "returnID"          => $returnID,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "quantity"          => $item["quantity"],
                            "dateBorrowed"      => $item["dateBorrowed"],
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

                    $savePurchTransferstItems = $this->returnitem->savePurchaseRequestItems($purchaseRequestItems, $returnID);
                }

            }
            
        }
        echo json_encode($saveTransferData);  
        
    }    

}
?>