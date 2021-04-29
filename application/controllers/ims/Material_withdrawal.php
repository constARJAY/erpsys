<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Material_withdrawal extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/MaterialWithdrawal_model", "purchaserequest");
        isAllowed(37);
    }

    public function index()
    {
        $data["title"] = "Material Withdrawal";

        $this->load->view("template/header",$data);
        $this->load->view("ims/material_withdrawal/index");
        $this->load->view("template/footer");
    }

    public function saveMaterialWithdrawal()
    {
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $materialWithdrawalID        = $this->input->post("materialWithdrawalID") ?? null;
        $reviseMaterialWithdrawalID = $this->input->post("reviseMaterialWithdrawalID") ?? null;
        $employeeID              = $this->input->post("employeeID");
        $projectID      = $this->input->post("projectID") ?? null;
        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;
        $materialWithdrawaltStatus   = $this->input->post("materialWithdrawaltStatus");
        $materialWithdrawalReason   = $this->input->post("materialWithdrawalReason") ?? null;
        $materialWithdrawalRemarks  = $this->input->post("materialWithdrawalRemarks") ?? null;
        $materialWithdrawalPurpose  = $this->input->post("materialWithdrawalPurpose") ?? null;
        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        $items                   = $this->input->post("items") ?? null;


        $purchaseRequestData = [
            // "revisePurchaseRequestID" => $revisePurchaseRequestID,
            "employeeID"              => $employeeID,
            "projectID"               => $projectID ,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "materialWithdrawaltStatus"   => $materialWithdrawaltStatus,
            "materialWithdrawalReason"   => $materialWithdrawalReason,
            "materialWithdrawalPurpose"   => $materialWithdrawalPurpose,
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
                    "materialWithdrawaltStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "materialWithdrawaltStatus" => $materialWithdrawaltStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "materialWithdrawaltStatus"  => 3,
                    "materialWithdrawalRemarks" => $materialWithdrawalRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $saveTransferData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $materialWithdrawalID);
        if ($saveTransferData) {
            $result = explode("|", $saveTransferData);

            if ($result[0] == "true") {
                $materialWithdrawalID  = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "materialWithdrawalID " => $materialWithdrawalID ,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "inventoryStorageID"            => $item["inventoryStorageID"] != "null" ? $item["inventoryStorageID"] : null,
                            "quantity"          => $item["quantity"],
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($purchaseRequestItems, $temp);

                       
                    }
                    $savePurchTransferstItems = $this->purchaserequest->savePurchaseRequestItems($purchaseRequestItems, $materialWithdrawalID );
                }

            }
            
        }
        echo json_encode($saveTransferData);
    }

    function updateStorage(){

        $saveupdateStorage = $this->purchaserequest->updateStorage();
        echo json_encode($saveupdateStorage);
        
    }

}
?>