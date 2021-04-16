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
        $action                = $this->input->post("action");
        $purchaseRequestID     = $this->input->post("purchaseRequestID");
        $employeeID            = $this->input->post("employeeID");
        $projectID             = $this->input->post("projectID");
        $approversID           = $this->input->post("approversID");
        $purchaseRequestStatus = $this->input->post("purchaseRequestStatus");
        $purchaseRequestReason = $this->input->post("purchaseRequestReason");
        $submittedAt           = $this->input->post("submittedAt");
        $createdBy             = $this->input->post("createdBy");
        $updatedBy             = $this->input->post("updatedBy");
        $createdAt             = $this->input->post("createdAt");
        $updatedAt             = $this->input->post("updatedAt");
        $items                 = $this->input->post("items");

        $purchaseRequestData = [
            "employeeID"            => $employeeID,
            "projectID"             => $projectID,
            "approversID"           => $approversID,
            "purchaseRequestStatus" => $purchaseRequestStatus,
            "purchaseRequestReason" => $purchaseRequestReason,
            "submittedAt"           => $submittedAt,
            "createdBy"             => $createdBy,
            "updatedBy"             => $updatedBy,
            "createdAt"             => $createdAt,
            "updatedAt"             => $updatedAt
        ];

        $savePurchaseRequestData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $purchaseRequestID);
        if ($savePurchaseRequestData) {
            $result = explode("|", $savePurchaseRequestData);

            if ($result[0] == "true") {
                $purchaseRequestID = $result[2];

                $purchaseRequestItems = [];
                foreach($items as $index => $item) {
                    $temp = [
                        "purchaseRequestID" => $purchaseRequestID,
                        "itemID"            => $item["itemID"],
                        "quantity"          => $item["quantity"],
                        "unitCost"          => $item["unitcost"],
                        "totalCost"         => $item["totalcost"],
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

                $savePurchaseRequestItems = $this->purchaserequest->savePurchaseRequestItems($purchaseRequestItems, $purchaseRequestID);

            }
            
        }
        echo json_encode($savePurchaseRequestData);
    }

}
?>