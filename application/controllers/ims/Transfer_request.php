<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Transfer_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/TransferRequest_model", "purchaserequest");
        isAllowed(37);
    }

    public function index()
    {
        $data["title"] = "Transfer Request";

        $this->load->view("template/header",$data);
        $this->load->view("ims/transfer_request/index");
        $this->load->view("template/footer");
    }

    // public function getTableData() 
    // {
    //     $tableName    = $this->input->post("tableName");
    //     $columnName   = $this->input->post("columnName"); 
    //     $searchFilter = $this->input->post("searchFilter");
    //     $orderBy      = $this->input->post("orderBy");
    //     echo json_encode($this->company_setup->getTableData($tableName, $columnName, $searchFilter, $orderBy));
    // }

    // public function updateTableData()
    // {
    //     $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
    //     $tableData   = $this->input->post("tableData") ? $this->input->post("tableData") : false;
    //     $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
    //     $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
    //     $data = array();

    //     // $uploadedFiles = $this->getUploadedFiles();
    //     // if ($uploadedFiles) {
    //     //     foreach ($uploadedFiles as $fileKey => $fileValue) {
    //     //         $data[$fileKey] = $fileValue;
    //     //     }
    //     // }
        
    //     if ($tableName && $tableData && $whereFilter) {
    //         foreach ($tableData as $key => $value) {
    //             $data[$key] = $value;
    //         }
    //         echo json_encode($this->company_setup->updateTableData($tableName, $data, $whereFilter, $feedback));
    //     } else {
    //         echo json_encode("false|Invalid arguments");
    //     }
    // }

    public function saveTransferRequest()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $transferRequestID       = $this->input->post("transferRequestID") ?? null;
        $reviseTransferRequestID = $this->input->post("reviseTransferRequestID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $inventoryStorageIDSender      = $this->input->post("inventoryStorageIDSender") ?? null;
        $inventoryStorageIDReceiver      = $this->input->post("inventoryStorageIDReceiver") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $transferRequestStatus   = $this->input->post("transferRequestStatus");
        $transferRequestReason   = $this->input->post("transferRequestReason") ?? null;
        $transferRequestRemarks  = $this->input->post("transferRequestRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            // "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "inventoryStorageIDSender"     => $inventoryStorageIDSender,
            "inventoryStorageIDReceiver"     => $inventoryStorageIDReceiver,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "transferRequestStatus"   => $transferRequestStatus,
            "transferRequestReason"   => $transferRequestReason,
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
                    "transferRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "transferRequestStatus" => $transferRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "transferRequestStatus"  => 3,
                    "transferRequestRemarks" => $transferRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $saveTransferData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $transferRequestID);
        if ($saveTransferData) {
            $result = explode("|", $saveTransferData);

            if ($result[0] == "true") {
                $transferRequestID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "transferRequestID" => $transferRequestID,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "itemCode"          => $item["itemCode"],
                            "itemName"          => $item["itemName"],
                            "brandName"          => $item["brandName"],
                            "quantity"          => $item["quantity"],
                            "barcode"          => $item["barcode"],
                            "stocks"          => $item["stocks"],
                            "unitOfMeasurement"          => $item["uom"],
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

                    $savePurchTransferstItems = $this->purchaserequest->savePurchaseRequestItems($purchaseRequestItems, $transferRequestID);
                }

            }
            
        }
        echo json_encode($saveTransferData);
    }

    // function updateStorage(){

    //     $saveupdateStorage = $this->purchaserequest->updateStorage();
    //     echo json_encode($saveupdateStorage);
        
    // }

}
?>