<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Material_withdrawal extends CI_Controller {
   
    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/MaterialWithdrawal_model", "materialWithdrawal");
        isAllowed(42);
    }

    public function index()
    {
        $data["title"] = "Material Withdrawal";

        $this->load->view("template/header",$data);
        $this->load->view("ims/material_withdrawal/index");
        $this->load->view("template/footer");
    }

    public function getTimelineContent()
    {
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        echo json_encode($this->materialWithdrawal->getTimelineContent($timelineBuilderID));
        // echo json_encode($this->materialWithdrawal->getTimelineContent(1));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $materialWithdrawalID        = $this->input->post("materialWithdrawalID");
        // $timelineManagementStatus = $this->input->post("timelineManagementStatus");
        $items = $this->input->post("items");
        $assets = $this->input->post("assets");

        $dataAsset = [];
        $dataItem = [];
        $statusItemFlag = false;
        $statusAssetFlag = false;
        $getItemID = [];
        $getAssetID = [];

        if($items){
            foreach ($items as $key=> $item) {
                $status = "0";
                $getReceived = $item["received"];
                $getRemaining = $item["remainingItem"];
                if($getRemaining <= 0 && $getReceived !=0   ){
                    $status = "1";
                    $statusItemFlag = true;
                    $getItemID[$key] = $item["itemID"];

                }
                $temp = [
                    "materialWithdrawalID"              => $item["materialWithdrawalID"],
                    "withdrawalItemID"  => $item["withdrawalItemID"],
                    "received"            => $item["received"],
                    "remaining"    => $item["remainingItem"],
                    "dateReceived" => $item["receivedDateItem"],
                    "remarks"    => $item["itemRemarks"],
                    "withdrawalItemStatus"    =>$status,
                    "createdBy"           => $sessionID,
                    "updatedBy"           => $sessionID
                ];
                array_push($dataItem, $temp);
            }
        }

        if($assets){
            foreach ($assets as $key=>$asset) {
                $status = "0";
                $getReceived = $asset["received"];
                $getRemaining = $asset["remainingAsset"];
                if($getRemaining == 0 && $getReceived !=0   ){
                    $status = "1";
                    $statusAssetFlag = false;
                    $getAssetID[$key] =  $asset["assetID"];

                }
                $temp = [
                    "materialWithdrawalID"              => $asset["materialWithdrawalID"],
                    "withdrawalAssetID"  => $asset["withdrawalAssetID"],
                    "received"            => $asset["received"],
                    "remaining"    => $asset["remainingAsset"],
                    "dateReceived" => $asset["receivedDateAsset"],
                    "remarks"    => $asset["assetRemarks"],
                    "withdrawalAssetStatus"    =>$status,
                    "createdBy"           => $sessionID,
                    "updatedBy"           => $sessionID
                ];
                array_push($dataAsset, $temp);
            }
        }
      
        // echo "<pre>";
        // print_r($dataItem);
        // print_r($dataAsset);
        // exit;

         
        // echo "<pre>";
        // print_r($getItemID[0]);
        // print_r($this->materialWithdrawal->saveProjectBoard($materialWithdrawalID, $dataItem,$dataAsset,$sessionID));
        // exit;
        echo json_encode( $this->materialWithdrawal->saveProjectBoard($materialWithdrawalID, $dataItem,$dataAsset,$sessionID,$statusItemFlag,$statusAssetFlag,$getItemID,$getAssetID));
    }

}