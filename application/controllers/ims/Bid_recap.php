<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bid_recap extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/BidRecap_model", "bidrecap");
        isAllowed(40);
    }

    public function index()
    {
        $data["title"] = "Bid Recap";

        $this->load->view("template/header",$data);
        $this->load->view("ims/bid_recap/index");
        $this->load->view("template/footer");
    }

    public function saveBidRecap()
    {
        $sessionID = $this->session->has_userdata("otherSessionID") ?  $this->session->userdata("otherSessionID") : 1;

        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $bidRecapID                 = $this->input->post("bidRecapID") ?? null;
        $reviseBidRecapID           = $this->input->post("reviseBidRecapID") ?? null;
        $employeeID                 = $this->input->post("employeeID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $bidRecapStatus             = $this->input->post("bidRecapStatus");
        $bidRecapRemarks            = $this->input->post("bidRecapRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy") ?? $sessionID;
        $updatedBy                  = $this->input->post("updatedBy") ?? $sessionID;
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? [];
        $assets                     = $this->input->post("assets") ?? [];
        $finalquote                 = $this->input->post("finalquote") ?? [];

        $bidRecapData = [
            "employeeID"       => $employeeID,
            "reviseBidRecapID" => $reviseBidRecapID,
            "approversID"      => $approversID,
            "approversStatus"  => $approversStatus,
            "approversDate"    => $approversDate,
            "bidRecapStatus"   => $bidRecapStatus,
            "submittedAt"      => $submittedAt,
            "createdBy"        => $createdBy,
            "updatedBy"        => $updatedBy,
            "createdAt"        => $createdAt
        ];

        if ($action == "update") {
            unset($bidRecapData["reviseBidRecapID"]);
            unset($bidRecapData["reviseBidRecapCode"]);
            unset($bidRecapData["createdBy"]);
            unset($bidRecapData["createdAt"]);

            if ($method == "cancelform") {
                $bidRecapData = [
                    "bidRecapStatus" => 4,
                    "updatedBy"      => $updatedBy,
                ];
            } else if ($method == "approve") {
                $bidRecapData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "bidRecapStatus"  => $bidRecapStatus,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "deny") {
                $bidRecapData = [
                    "approversStatus"   => $approversStatus,
                    "approversDate"     => $approversDate,
                    "bidRecapStatus"    => 3,
                    "bidRecapRemarks"   => $bidRecapRemarks,
                    "updatedBy"         => $updatedBy,
                ];
            } else if ($method == "drop") {
                $bidRecapData = [
                    "reviseBidRecapID" => $reviseBidRecapID,
                    "bidRecapStatus"   => 5,
                    "updatedBy"        => $updatedBy,
                ]; 
            }
        }

        $saveBidRecapData =$this->bidrecap->saveBidRecapData($action, $bidRecapData, $bidRecapID);
        if ($saveBidRecapData) {
            $result = explode("|", $saveBidRecapData);
            $bidRecapID = $result[2];

            if ($result[0] == "true") {
                
                if ($bidRecapStatus == "0" || $bidRecapStatus == "1") {
                    if ($items && count($items) > 0) {
                        $itemsData = [];
                        foreach($items as $item) {
                            $requestItemAssetID      = $item["requestItemAssetID"];
                            $candidateVendorID       = $item["candidateVendorID"];
                            $candidateSelectedVendor = $item["candidateSelectedVendor"];
                            $candidateVendorName     = $item["candidateVendorName"];
                            $candidateVendorPrice    = $item["candidateVendorPrice"];
                            $inventoryVendorID       = $item["inventoryVendorID"];
                            $inventoryVendorCode     = $item["inventoryVendorCode"];
                            $inventoryVendorName     = $item["inventoryVendorName"];
                            $forPurchase             = $item["forPurchase"];
                            $unitCost                = $item["unitCost"];
                            $totalCost               = $item["totalCost"];
    
                            $temp = [
                                "requestItemID"           => $requestItemAssetID,
                                "candidateVendorID"       => $candidateVendorID,
                                "candidateSelectedVendor" => $candidateSelectedVendor,
                                "candidateVendorName"     => $candidateVendorName,
                                "candidateVendorPrice"    => $candidateVendorPrice,
                                "inventoryVendorID"       => $inventoryVendorID,
                                "inventoryVendorCode"     => $inventoryVendorCode,
                                "inventoryVendorName"     => $inventoryVendorName,
                                "forPurchase"             => $forPurchase,
                                "unitCost"                => $unitCost,
                                "totalCost"               => $totalCost,
                            ];
                            $itemsData[] = $temp;
                        }
                        if ($itemsData && count($itemsData) > 0) {
                            $saveBidRecapItems = $this->bidrecap->saveBidRecapItems($itemsData);
                        }
                    }
    
                    if ($assets && count($assets) > 0) {
                        $assetsData = [];
                        foreach($assets as $item) {
                            $requestItemAssetID      = $item["requestItemAssetID"];
                            $candidateVendorID       = $item["candidateVendorID"];
                            $candidateSelectedVendor = $item["candidateSelectedVendor"];
                            $candidateVendorName     = $item["candidateVendorName"];
                            $candidateVendorPrice    = $item["candidateVendorPrice"];
                            $inventoryVendorID       = $item["inventoryVendorID"];
                            $inventoryVendorCode     = $item["inventoryVendorCode"];
                            $inventoryVendorName     = $item["inventoryVendorName"];
                            $forPurchase             = $item["forPurchase"];
                            $unitCost                = $item["unitCost"];
                            $totalCost               = $item["totalCost"];
    
                            $temp = [
                                "requestAssetID"          => $requestItemAssetID,
                                "candidateVendorID"       => $candidateVendorID,
                                "candidateSelectedVendor" => $candidateSelectedVendor,
                                "candidateVendorName"     => $candidateVendorName,
                                "candidateVendorPrice"    => $candidateVendorPrice,
                                "inventoryVendorID"       => $inventoryVendorID,
                                "inventoryVendorCode"     => $inventoryVendorCode,
                                "inventoryVendorName"     => $inventoryVendorName,
                                "forPurchase"             => $forPurchase,
                                "unitCost"                => $unitCost,
                                "totalCost"               => $totalCost,
                            ];
                            $assetsData[] = $temp;
                        }
                        if ($assetsData && count($assetsData) > 0) {
                            $saveBidRecapAsset = $this->bidrecap->saveBidRecapAsset($assetsData, $action, $bidRecapID);
                        }
                    }
    
                    if ($finalquote && count($finalquote) > 0) {
                        if ($action == "update") {
                            $deleteFinalQuote = $this->bidrecap->deleteBidRecapFinalQuote($bidRecapID);
                        }
    
                        foreach($finalquote as $item) {
                            $classification       = $item["classification"];
                            $inventoryVendorID    = $item["inventoryVendorID"];
                            $vendorCode           = $item["vendorCode"];
                            $vendorName           = $item["vendorName"];
                            $vendorAddress        = $item["vendorAddress"];
                            $vendorContactDetails = $item["vendorContactDetails"];
                            $vendorContactPerson  = $item["vendorContactPerson"];
                            $finalQuoteRemarks    = $item["finalQuoteRemarks"];
                            $finalQuoteTotal      = $item["finalQuoteTotal"];
    
                            $finalQuoteData = [
                                "bidRecapID"           => $bidRecapID,
                                "classification"       => $classification,
                                "inventoryVendorID"    => $inventoryVendorID,
                                "vendorCode"           => $vendorCode,
                                "vendorName"           => $vendorName,
                                "vendorAddress"        => $vendorAddress,
                                "vendorContactDetails" => $vendorContactDetails,
                                "vendorContactPerson"  => $vendorContactPerson,
                                "finalQuoteRemarks"    => $finalQuoteRemarks,
                                "finalQuoteTotal"      => $finalQuoteTotal,
                                "createdBy"            => $sessionID,
                                "updatedBy"            => $sessionID,
                            ];
                            $saveBidRecapFinalQuote = $this->bidrecap->saveBidRecapFinalQuote($finalQuoteData, $bidRecapID, $inventoryVendorID, $classification);
                        }
                    }
                }
            } 
        }

        // ----- INSERT PURCHASE REQUEST -----
        if ($bidRecapStatus == "2" || $bidRecapStatus == 2)
        {
            $insertPurchaseRequestData = $this->bidrecap->insertPurchaseRequestData($bidRecapID);
        }
        // ----- END INSERT PURCHASE REQUEST -----

        echo json_encode($saveBidRecapData);
    }

    public function reviseBidRecap()
    {
        $bidRecapID = $this->input->post("bidRecapID");
        echo json_encode($this->bidrecap->reviseBidRecap($bidRecapID));
    }

    public function generateFinalQuote()
    {
        $bidRecapID     = $this->input->post("bidRecapID");
        $classification = $this->input->post("classification");
        $action         = $this->input->post("action");
        $data           = $this->input->post("items");

        $flag = false;
        if ($classification == "Items") {
            if ($data && count($data) > 0) {
                $itemsData = [];
                foreach($data as $item) {
                    $requestItemAssetID      = $item["requestItemAssetID"];
                    $candidateVendorID       = $item["candidateVendorID"];
                    $candidateSelectedVendor = $item["candidateSelectedVendor"];
                    $candidateVendorName     = $item["candidateVendorName"];
                    $candidateVendorPrice    = $item["candidateVendorPrice"];
                    $inventoryVendorID       = $item["inventoryVendorID"];
                    $inventoryVendorCode     = $item["inventoryVendorCode"];
                    $inventoryVendorName     = $item["inventoryVendorName"];
                    $forPurchase             = $item["forPurchase"];
                    $unitCost                = $item["unitCost"];
                    $totalCost               = $item["totalCost"];
    
                    $temp = [
                        "requestItemID"           => $requestItemAssetID,
                        "candidateVendorID"       => $candidateVendorID,
                        "candidateSelectedVendor" => $candidateSelectedVendor,
                        "candidateVendorName"     => $candidateVendorName,
                        "candidateVendorPrice"    => $candidateVendorPrice,
                        "inventoryVendorID"       => $inventoryVendorID,
                        "inventoryVendorCode"     => $inventoryVendorCode,
                        "inventoryVendorName"     => $inventoryVendorName,
                        "forPurchase"             => $forPurchase,
                        "unitCost"                => $unitCost,
                        "totalCost"               => $totalCost,
                    ];
                    $itemsData[] = $temp;
                }
                if ($itemsData && count($itemsData) > 0) {
                    $saveBidRecapItems  = $this->bidrecap->saveBidRecapItems($itemsData);
                    $updateBidRecapData = $this->bidrecap->updateBidRecapData($bidRecapID, $classification);
                    $flag = $saveBidRecapItems && $updateBidRecapData;
                }
            }
        } else if ($classification == "Assets") {
            if ($data && count($data) > 0) {
                $assetsData = [];
                foreach($data as $item) {
                    $requestItemAssetID      = $item["requestItemAssetID"];
                    $candidateVendorID       = $item["candidateVendorID"];
                    $candidateSelectedVendor = $item["candidateSelectedVendor"];
                    $candidateVendorName     = $item["candidateVendorName"];
                    $candidateVendorPrice    = $item["candidateVendorPrice"];
                    $inventoryVendorID       = $item["inventoryVendorID"];
                    $inventoryVendorCode     = $item["inventoryVendorCode"];
                    $inventoryVendorName     = $item["inventoryVendorName"];
                    $forPurchase             = $item["forPurchase"];
                    $unitCost                = $item["unitCost"];
                    $totalCost               = $item["totalCost"];

                    $temp = [
                        "requestAssetID"          => $requestItemAssetID,
                        "candidateVendorID"       => $candidateVendorID,
                        "candidateSelectedVendor" => $candidateSelectedVendor,
                        "candidateVendorName"     => $candidateVendorName,
                        "candidateVendorPrice"    => $candidateVendorPrice,
                        "inventoryVendorID"       => $inventoryVendorID,
                        "inventoryVendorCode"     => $inventoryVendorCode,
                        "inventoryVendorName"     => $inventoryVendorName,
                        "forPurchase"             => $forPurchase,
                        "unitCost"                => $unitCost,
                        "totalCost"               => $totalCost,
                    ];
                    $assetsData[] = $temp;
                }
                if ($assetsData && count($assetsData) > 0) {
                    $saveBidRecapAsset  = $this->bidrecap->saveBidRecapAsset($assetsData);
                    $updateBidRecapData = $this->bidrecap->updateBidRecapData($bidRecapID, $classification);
                    $flag = $saveBidRecapAsset && $updateBidRecapData;
                }
            }
        }
        echo json_encode($flag);
    }

    public function getFinalQuote()
    {
        $bidRecapID     = $this->input->post("bidRecapID");
        $classification = $this->input->post("classification");
        echo json_encode($this->bidrecap->getFinalQuote($classification, $bidRecapID));
    }


}  