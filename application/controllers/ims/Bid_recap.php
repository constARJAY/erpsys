<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bid_recap extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/BidRecap_model", "bidrecap");
        isAllowed(126);
    }

    public function index()
    {
        $data["title"] = "Bid Recap";

        $this->load->view("template/header",$data);
        $this->load->view("ims/bid_recap/index");
        $this->load->view("template/footer");
    }

    public function save_bid_recap(){
        $action           = $this->input->post("action");
        $method           = $this->input->post("method");
        $bidRecapID       = $this->input->post("bidRecapID") ?? null;
        $reviseBidRecapID = $this->input->post("reviseBidRecapID") ?? null;
        $employeeID       = $this->input->post("employeeID");
        $projectID        = $this->input->post("projectID") ?? null;
        $documentType     = $projectID == null ? "pr":"ce";
        $documentID       = $this->input->post("documentID") ?? null;
        $referenceCode    = $this->input->post("referenceCode") ?? null;
        $approversID      = $this->input->post("approversID") ?? null;
        $approversStatus  = $this->input->post("approversStatus") ?? null;
        $approversDate    = $this->input->post("approversDate") ?? null;
        $bidRecapStatus   = $this->input->post("bidRecapStatus");
        $bidRecapReason   = $this->input->post("bidRecapReason") ?? null;
        $bidRecapRemarks  = $this->input->post("bidRecapRemarks") ?? null;
        $bidRecapGrandTotal = $this->input->post("bidRecapGrandTotal") ?? null;
        $submittedAt      = $this->input->post("submittedAt") ?? null;
        $createdBy        = $this->input->post("createdBy");
        $updatedBy        = $this->input->post("updatedBy");
        $createdAt        = $this->input->post("createdAt");
        $items            = $this->input->post("items") ?? null;

        $bidRecapData = [
            "reviseBidRecapID"   => $reviseBidRecapID,
            "documentType"       => $documentType,
            "documentID"         => $documentID,
            "referenceCode"      => $referenceCode,
            "employeeID"         => $employeeID,
            "projectID"          => $projectID,
            "approversID"        => $approversID,
            "approversStatus"    => $approversStatus,
            "approversDate"      => $approversDate,
            "bidRecapStatus"     => $bidRecapStatus,
            "bidRecapReason"     => $bidRecapReason,
            "bidRecapGrandTotal" => $bidRecapGrandTotal,
            "submittedAt"        => $submittedAt,
            "createdBy"          => $createdBy,
            "updatedBy"          => $updatedBy,
            "createdAt"          => $createdAt
        ];

        if ($action == "update") {
            unset($bidRecapData["reviseBidRecapID"]);
            unset($bidRecapData["createdBy"]);
            unset($bidRecapData["createdAt"]);

            if ($method == "cancelform") {
                $bidRecapData = [
                    "bidRecapStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $bidRecapData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "bidRecapStatus" => $bidRecapStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $bidRecapData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "bidRecapStatus"  => 3,
                    "bidRecapRemarks" => $bidRecapRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $saveBidRecapData = $this->bidrecap->saveBidRecapData($action, $bidRecapData, $bidRecapID);
        if ($saveBidRecapData) {
            $result = explode("|", $saveBidRecapData);

            if ($result[0] == "true") {
                $bidRecapID = $result[2];
                if ($items) {
                    $bidRecapItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "bidRecapID"            => $bidRecapID,
                            "costEstimateID"        => $item["costEstimateID"],
                            "inventoryValidationID" => $item["inventoryValidationID"],
                            "categoryType"          => $item["category"],
                            "itemID"                => $item["itemID"],
                            "itemname"              => $item["itemname"],
                            "itemUom"               => $item["itemUom"],
                            "itemDescription"       => $item["itemDescription"],
                            "quantity"              => $item["quantity"],
                            "stocks"                => $item["stocks"],
                            "forPurchase"           => $item["forPurchase"],
                            "files"                 => $item["file"],
                            "unitCost"              => $item["unitCost"],
                            "totalCost"             => $item["totalCost"],
                            "createdBy"             => $createdBy,
                            "updatedBy"             => $item["updatedBy"],
                        ];
                        array_push($bidRecapItems, $temp);
                    }
                    
                    $saveBidRecapItems = $this->bidrecap->saveBidRecapItems($bidRecapItems, $bidRecapID);
                }

            }
            
        }
        echo json_encode($saveBidRecapData);
    }

    public function saveCanvassingData(){
        $id     = $this->input->post("bidRecapID");
        $result = $this->bidrecap->saveCanvassingData($id);
        echo json_encode($result);
    }


}
?>     