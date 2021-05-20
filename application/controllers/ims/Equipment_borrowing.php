<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Equipment_borrowing extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/equipmentBorrowing_model", "equipmentborrowing");
        isAllowed(43);
    }

    public function index()
    {
        $data["title"] = "Equipment Borrowing";

        $this->load->view("template/header",$data);
        $this->load->view("ims/equipment_borrowing/index");
        $this->load->view("template/footer");
    }
    public function saveEquipmentBorrowing()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $borrowingID                = $this->input->post("borrowingID") ?? null;
        $reviseBorrowingID      = $this->input->post("reviseBorrowingID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $projectID              = $this->input->post("projectID") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $borrowingStatus          = $this->input->post("borrowingStatus");
        $borrowingReason        = $this->input->post("borrowingReason") ?? null;
        $borrowingRemarks      = $this->input->post("borrowingRemarks") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;

        $borrowingData = [
            // "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "projectID "                => $projectID ,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "borrowingStatus"         => $borrowingStatus,
            "borrowingReason"         => $borrowingReason,
            // "projectTotalAmount"      => $projectTotalAmount,
            // "companyTotalAmount"      => $companyTotalAmount,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];
        if ($action == "update") {
            // unset($purchaseRequestData["revisePurchaseRequestID"]);
            unset($borrowingData["createdBy"]);
            unset($borrowingData["createdAt"]);

            if ($method == "cancelform") {
                $borrowingData = [
                    "borrowingStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $borrowingData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "borrowingStatus"      => $borrowingStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $borrowingData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "borrowingStatus"        =>3,
                    "borrowingRemarks"      =>$borrowingRemarks,
                    "updatedBy"              =>$updatedBy,
                ];
            }
        }     

                $saveEquipmentBorrowingData = $this->equipmentborrowing->saveBorrowingData($action, $borrowingData, $borrowingID);
                if ($saveEquipmentBorrowingData) {
                    $result = explode("|", $saveEquipmentBorrowingData);
        
                    if ($result[0] == "true") {
                        $borrowingID = $result[2];
        
                        if ($items) {
                            $borrowingItems = [];
                            foreach($items as $index => $item) {
                                $temp = [
                                    "borrowingID"                       => $borrowingID,
                                    "barcode"                           => $item["barcode"],
                                    "itemID"                            => $item["itemID"] != "null" ? $item["itemID"] : null,
                                    "inventoryStorageID"                => $item["inventoryStorageID"],
                                    "serialnumber"                      => $item["serialnumber"],
                                    "dateBorrowed"                      => $item["dateBorrowed"],
                                    "quantity"                          => $item["quantity"],
                                    "createdBy"                         => $item["createdBy"],
                                    "updatedBy"                         => $item["updatedBy"],
                                ];
                                array_push($borrowingItems, $temp);
                            }
                            $savePurchTransferstItems = $this->equipmentborrowing->saveBorrowingItems($borrowingItems, $borrowingID);
                        }
        
                    }
                    
                }
                echo json_encode($saveEquipmentBorrowingData); 
                
            }    

}    
?>