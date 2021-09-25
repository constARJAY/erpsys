<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Material_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/MaterialRequest_model", "materialrequest");
        isAllowed(137);
    }

    public function index()
    {
        $data["title"] = "Material Request";
        $this->load->view("template/header",$data);
        $this->load->view("ims/material_request/index");
        $this->load->view("template/footer");
    }

    public function saveMaterialRequest()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");

        $materialRequestID          = $this->input->post("materialRequestID");
        $costEstimateID 		    = $this->input->post("costEstimateID")              == "null" ?  NULL : $this->input->post("costEstimateID");
        $costEstimateCode 			= $this->input->post("costEstimateCode")            == "null" ?  NULL : $this->input->post("costEstimateCode");
        $reviseMaterialRequestID 	= $this->input->post("reviseMaterialRequestID")     == "null" ?  NULL : $this->input->post("reviseMaterialRequestID");
        $reviseMaterialRequestCode 	= $this->input->post("reviseMaterialRequestCode")   == "null" ?  NULL : $this->input->post("reviseMaterialRequestCode");
        $billMaterialID 			= $this->input->post("billMaterialID")              == "null" ?  NULL : $this->input->post("billMaterialID");
        $billMaterialCode 			= $this->input->post("billMaterialCode")            == "null" ?  NULL : $this->input->post("billMaterialCode");
        $timelineBuilderID 			= $this->input->post("timelineBuilderID")           == "null" ?  NULL : $this->input->post("timelineBuilderID");
        $projectCode   				= $this->input->post("projectCode")                 == "null" ?  NULL : $this->input->post("projectCode");
        $projectName   				= $this->input->post("projectName")                 == "null" ?  NULL : $this->input->post("projectName");
        $projectCategory 			= $this->input->post("projectCategory")             == "null" ?  NULL : $this->input->post("projectCategory");
        $clientName    				= $this->input->post("clientName")                  == "null" ?  NULL : $this->input->post("clientName");
        $clientAddress 				= $this->input->post("clientAddress")               == "null" ?  NULL : $this->input->post("clientAddress");
        $dateNeeded 				= $this->input->post("dateNeeded");

        $approversID                = $this->input->post("approversID")     ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate")   ?? null;

        $materialRequestStatus      = $this->input->post("materialRequestStatus");
        $materialRequestReason      = $this->input->post("materialRequestReason")   ?? null;
        $materialRequestRemarks     = $this->input->post("materialRequestRemarks")  ?? null;

        $employeeID 		        = $this->input->post("employeeID")  ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy")   ?? null;
        $updatedBy                  = $this->input->post("updatedBy")   ?? null;
        $createdAt                  = $this->input->post("createdAt")   ?? null;
        $items                      = $this->input->post("items")       ?? null;
        $assets                     = $this->input->post("assets")      ?? null;
        $materialRequestData = [
            "reviseMaterialRequestID"   => $reviseMaterialRequestID,
            "reviseMaterialRequestCode" => $reviseMaterialRequestCode,
            "employeeID"                => $employeeID,
            "materialRequestID"         => $materialRequestID,
            "costEstimateID" 		    => $costEstimateID,
            "costEstimateCode" 			=> $costEstimateCode,

            
            "billMaterialID" 			=> $billMaterialID,
            "billMaterialCode"			=> $billMaterialCode,
            "timelineBuilderID" 		=> $timelineBuilderID,
            "projectCode"   			=> $projectCode,
            "projectName"   			=> $projectName,
            "projectCategory" 			=> $projectCategory,
            "clientName"    		    => $clientName,
            "clientAddress" 		    => $clientAddress,
            "dateNeeded" 				=> $dateNeeded,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "materialRequestStatus"     => $materialRequestStatus,
            "materialRequestReason"     => $materialRequestReason,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($materialRequestData["reviseMaterialRequestID"]);
             unset($materialRequestData["reviseMaterialRequestCode"]);
            unset($materialRequestData["createdBy"]);
            unset($materialRequestData["createdAt"]);

            if ($method == "cancelform") {
                $materialRequestData = [
                    "materialRequestStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $materialRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "materialRequestStatus" => $materialRequestStatus,
                    "updatedBy"             => $updatedBy,
                ];
                
            } else if ($method == "deny") {
                $materialRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "materialRequestStatus"  => 3,
                    "materialRequestRemarks" => $materialRequestRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $materialRequestData = [
                    "reviseMaterialRequestID" => $reviseMaterialRequestID,
                    "materialRequestStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveMaterialRequestData = $this->materialrequest->saveMaterialRequestData($action, $materialRequestData, $materialRequestID);
        if($saveMaterialRequestData){
            $error      = 0;
            $errorMsg   = "false|System error: Please contact the system administrator for assistance!";
            $result = explode("|", $saveMaterialRequestData);
            if($result[0]== "true"){
                $materialRequestID = $result[2];

                if($materialRequestStatus == "2"){
                    $this->materialrequest->insertToIVR($materialRequestID);
                }
                
                if($items){
                    $materialRequestItems = [];
                    foreach ($items as $index => $item) {
                        $itemInfo   =   $this->materialrequest->getTableRowDetails("item",$item["itemID"]);
                        $temp = [
                                "costEstimateID"            =>  $costEstimateID,
                                "billMaterialID"            =>  $billMaterialID,
                                "materialRequestID"         =>  $materialRequestID,
                                "itemID"                    =>  $itemInfo->itemID ,
                                "itemCode"                  =>  $itemInfo->itemCode,
                                "itemBrandName"             =>  $itemInfo->brandName,
                                "itemName"                  =>  $itemInfo->itemName,
                                "itemClassification"        =>  $itemInfo->classificationName,
                                "itemCategory"              =>  $itemInfo->categoryName,
                                "itemUom"                   =>  $itemInfo->unitOfMeasurementID,
                                "itemDescription"           =>  $itemInfo->itemDescription,
                                "files"                     =>  $itemInfo->itemImage,
                                "remarks"                   =>  $item["itemRemarks"],
                                "requestQuantity"           =>  $item["itemQuantity"],
                                "createdBy"                 =>  $createdBy,
                                "updatedBy"                 =>  $updatedBy,
                                "createdAt"                 =>  $createdAt,
                                "updatedAt"                 =>  $createdAt
                        ];
                        array_push($materialRequestItems, $temp);
                    }
                    $saveMaterialRequestItems = $this->materialrequest->saveInventoryRequest("item", $materialRequestItems, $materialRequestID, $billMaterialID);
                    
                    $error += intval(!$saveMaterialRequestItems ? 1 : 0);
                }

                if($assets){
                    $materialRequestAssets = [];
                    foreach ($assets as $index => $asset) {
                        $assetInfo   =   $this->materialrequest->getTableRowDetails("asset",$asset["assetID"]);
                        $temp = [
                                "costEstimateID"            =>  $costEstimateID,
                                "billMaterialID"            =>  $billMaterialID,
                                "materialRequestID"         =>  $materialRequestID,
                                "assetID"                   =>  $assetInfo->assetID ,
                                "assetCode"                 =>  $assetInfo->assetCode,
                                "assetBrandName"            =>  $assetInfo->brandName,
                                "assetName"                 =>  $assetInfo->assetName,
                                "assetClassification"       =>  $assetInfo->classificationName,
                                "assetCategory"             =>  $assetInfo->categoryName,
                                "assetUom"                  =>  $assetInfo->unitOfMeasurementID,
                                "assetDescription"          =>  $assetInfo->assetDescription,
                                "files"                     =>  $assetInfo->assetImage,
                                "remarks"                   =>  $asset["assetRemarks"],
                                "requestQuantity"           =>  $asset["assetQuantity"],
                                "requestManHours"           =>  $asset["assetManhours"],
                                "createdBy"                 =>  $createdBy,
                                "updatedBy"                 =>  $updatedBy,
                                "createdAt"                 =>  $createdAt,
                                "updatedAt"                 =>  $createdAt
                        ];
                        array_push($materialRequestAssets, $temp);
                    }
                    $saveMaterialRequestAssets = $this->materialrequest->saveInventoryRequest("asset", $materialRequestAssets, $materialRequestID, $billMaterialID);
                    $error += intval(!$saveMaterialRequestAssets ? 1 : 0);
                }



                
            }
        }

        echo json_encode($error < 1 ? $saveMaterialRequestData : $errorMsg);
    }

    public function getInventoryRequestData(){
        $materialRequestID  = $this->input->post("materialRequestID");
        $billMaterialID     = $this->input->post("billMaterialID");

        echo json_encode($this->materialrequest->getInventoryRequestdata($materialRequestID, $billMaterialID));
    }

    public function insertToIVR(){
       $materialRequestID = $this->input->post("materialRequestID");
        $this->materialrequest->insertToIVR($materialRequestID);
    }
    // public function getEquipmentRequestItems()
    // {
    //     $materialRequestID = $this->input->post("materialRequestID");
    //     echo json_encode($this->materialrequest->getEquipmentRequestItems($materialRequestID));
    // }

    // public function getCostEstimateRequest(){
    //     $materialRequestID = $this->input->post("materialRequestID");
    //     $billID    = $this->input->post("billID");
    //     echo json_encode($this->materialrequest->getCostEstimateRequest($materialRequestID, $billID));
    // }

}
?>