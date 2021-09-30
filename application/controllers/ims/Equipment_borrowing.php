<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Equipment_borrowing extends CI_Controller {
   
    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/EquipmentBorrowing_model", "borrowing");
        isAllowed(43);
    }

    public function index()
    {
        $data["title"] = "Equipment Borrowing";

        $this->load->view("template/header",$data);
        $this->load->view("ims/equipment_borrowing/index");
        $this->load->view("template/footer");
    }

    public function getTimelineContent()
    {
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        echo json_encode($this->borrowing->getTimelineContent($timelineBuilderID));
        // echo json_encode($this->materialWithdrawal->getTimelineContent(1));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $materialWithdrawalID        = $this->input->post("materialWithdrawalID");
        $equipmentBorrowingID         = $this->input->post("equipmentBorrowingID");
        $materialRequestID        = $this->input->post("materialRequestID");
        $assets = $this->input->post("assets");
        // $assets = $this->input->post("assets");

        // $dataAsset = [];
        $dataAsset = [];

        // echo "<pre>";
        // print_r($_POST);
        // exit;

        if($assets){
            foreach ($assets as $asset) {
                $serialData =[];
                $temp = [

                    "costEstimateID"  => $asset["costEstimateID"],
                    "billMaterialID"  => $asset["billMaterialID"],  
                    "materialRequestID"  => $asset["materialRequestID"],
                    "inventoryValidationID"  => $asset["inventoryValidationID"],
                    "bidRecapID"  => $asset["bidRecapID"],
                    "purchaseRequestID"  => $asset["purchaseRequestID"],
                    "purchaseOrderID"  => $asset["purchaseOrderID"], 
                    "changeRequestID"  => $asset["changeRequestID"],
                    "inventoryReceivingID"  => $asset["inventoryReceivingID"],
                    "inventoryVendorID"  => $asset["inventoryVendorID"],
                    "inventoryVendorCode"  => $asset["inventoryVendorCode"],
                    "inventoryVendorName"  => $asset["inventoryVendorName"],  
                    "finalQuoteRemarks"  => $asset["finalQuoteRemarks"],
                    "milestoneBuilderID"  => $asset["milestoneBuilderID"],
                    "phaseDescription"  => $asset["phaseDescription"],
                    "milestoneListID"  => $asset["milestoneListID"],
                    "projectMilestoneID"  => $asset["projectMilestoneID"],
                    "projectMilestoneName"  => $asset["projectMilestoneName"],
                    "assetID"  => $asset["assetID"],
                    "assetCode"  => $asset["assetCode"],
                    "assetBrandName"  => $asset["assetBrandName"],
                    "assetName"  => $asset["assetName"],
                    "assetClassification"  => $asset["assetClassification"],
                    "assetCategory"  => $asset["assetCategory"],
                    "assetUom"  => $asset["assetUom"],
                    "assetDescription"  => $asset["assetDescription"],
                    "files"  => $asset["files"] ,
                    "remarks"  => $asset["remarks"] ,
                    "requestQuantity"  => $asset["requestQuantity"] , 
                    "reservedAsset"  => $asset["reservedAsset"] ,
                    "forPurchase"  => $asset["forPurchase"] ,

                    "materialWithdrawalID"              => $asset["materialWithdrawalID"],
                    "borrowed"            => $asset["borrowed"],
                    "availableStocks"            => $asset["availableStocks"],
                    "remaining"    => $asset["remainingAsset"],
                    "borrowedDate" => $asset["borrowedDate"],
                    "withdrawalAssetStatus" => 0,
                    "barcode" => $asset["barcode"],
                    "createdBy"           => $sessionID,
                    "updatedBy"           => $sessionID
                ];
                // array_push($dataAsset, $temp);

                if(!empty($asset["serials"])){
                    $serialData = $asset["serials"];
                }

            $saveEquipmentBorrowingData = $this->borrowing->saveProjectBoard($materialWithdrawalID, $temp,$materialRequestID,$serialData,$equipmentBorrowingID);

            }
        }


        echo json_encode($saveEquipmentBorrowingData);
    }

}