<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stock_out extends CI_Controller {
   
    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/StockOut_model", "stockOut");
        isAllowed(92);
    }

    public function index()
    {
        $data["title"] = "Stock Out";

        $this->load->view("template/header",$data);
        $this->load->view("ims/stock_out/index");
        $this->load->view("template/footer");
    }

    public function getTimelineContent()
    {
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        echo json_encode($this->stockOut->getTimelineContent($timelineBuilderID));
        // echo json_encode($this->materialWithdrawal->getTimelineContent(1));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $materialWithdrawalID        = $this->input->post("materialWithdrawalID");
        $stockOutID        = $this->input->post("stockOutID");
        $materialRequestID        = $this->input->post("materialRequestID");
        $items = $this->input->post("items");
        // $assets = $this->input->post("assets");

        // $dataAsset = [];
        $dataItem = [];

        // echo "<pre>";
        // print_r($_POST);
        // exit;

        if($items){
            foreach ($items as $item) {
                $serialData =[];
                $temp = [

                    "costEstimateID"  => $item["costEstimateID"],
                    "billMaterialID"  => $item["billMaterialID"],  
                    "materialRequestID"  => $item["materialRequestID"],
                    "inventoryValidationID"  => $item["inventoryValidationID"],
                    "bidRecapID"  => $item["bidRecapID"],
                    "purchaseRequestID"  => $item["purchaseRequestID"],
                    "purchaseOrderID"  => $item["purchaseOrderID"], 
                    "changeRequestID"  => $item["changeRequestID"],
                    "inventoryReceivingID"  => $item["inventoryReceivingID"],
                    "inventoryVendorID"  => $item["inventoryVendorID"],
                    "inventoryVendorCode"  => $item["inventoryVendorCode"],
                    "inventoryVendorName"  => $item["inventoryVendorName"],  
                    "finalQuoteRemarks"  => $item["finalQuoteRemarks"],
                    "milestoneBuilderID"  => $item["milestoneBuilderID"],
                    "phaseDescription"  => $item["phaseDescription"],
                    "milestoneListID"  => $item["milestoneListID"],
                    "projectMilestoneID"  => $item["projectMilestoneID"],
                    "projectMilestoneName"  => $item["projectMilestoneName"],
                    "itemID"  => $item["itemID"],
                    "itemCode"  => $item["itemCode"],
                    "itemBrandName"  => $item["itemBrandName"],
                    "itemName"  => $item["itemName"],
                    "itemClassification"  => $item["itemClassification"],
                    "itemCategory"  => $item["itemCategory"],
                    "itemUom"  => $item["itemUom"],
                    "itemDescription"  => $item["itemDescription"],
                    "files"  => $item["files"] ,
                    "remarks"  => $item["remarks"] ,
                    "requestQuantity"  => $item["requestQuantity"] , 
                    "reservedItem"  => $item["reservedItem"] ,
                    "forPurchase"  => $item["forPurchase"] ,

                    "materialWithdrawalID"              => $item["materialWithdrawalID"],
                    "stockOut"            => $item["stockOut"],
                    "availableStocks"            => $item["availableStocks"],
                    "remaining"    => $item["remainingItem"],
                    "stockOutDate" => $item["stockOutDate"],
                    "withdrawalItemStatus" => 0,
                    "barcode" => $item["barcode"],
                    "createdBy"           => $sessionID,
                    "updatedBy"           => $sessionID
                ];
                // array_push($dataItem, $temp);

                if(!empty($item["serials"])){
                    $serialData = $item["serials"];
                }

            $saveStockOutData = $this->stockOut->saveProjectBoard($materialWithdrawalID, $temp,$materialRequestID,$serialData,$stockOutID );

            }
        }


        echo json_encode($saveStockOutData);
    }

}