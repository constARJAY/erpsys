<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Personel_requisition extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/PersonnelRequisition_model", "purchaserequest");

        isAllowed(50);
    }

    public function index()
    {
        $data["title"] = "Personnel Requisition";

        $this->load->view("template/header",$data);
        $this->load->view("pms/personel_requisition/index");
        $this->load->view("template/footer");
    }

    public function savePersonnelRequisition()
    {
        // echo "<pre>";
        // print_r($_POST);
        // exit;
        $action                  = $this->input->post("action");
        $method                  = $this->input->post("method");
        $employeeID              = $this->input->post("employeeID");

        $approversID             = $this->input->post("approversID") ?? null;
        $approversStatus         = $this->input->post("approversStatus") ?? null;
        $approversDate           = $this->input->post("approversDate") ?? null;

        $requisitionID       = $this->input->post("requisitionID") ?? null;
        $reviseRequisitionID = $this->input->post("reviseRequisitionID") ?? null;
      
        $requisitionStatus   = $this->input->post("requisitionStatus");
        $requisitionRemarks  = $this->input->post("requisitionRemarks") ?? null;


        $departmentID  = $this->input->post("departmentID") ?? null;
        $designationID  = $this->input->post("designationID") ?? null;
        $salaryPackage  = $this->input->post("salaryPackage") ?? null;
        $personnelReportByID  = $this->input->post("personnelReportByID") ?? null;
        $radioGroup1  = $this->input->post("radioGroup1") ?? null;
        $radioGroup2  = $this->input->post("radioGroup2") ?? null;
        $personnelOption  = $this->input->post("personnelOption") ?? null;
        $personnelReplacement  = $this->input->post("personnelReplacement") ?? null;
        $personnelDuration  = $this->input->post("personnelDuration") ?? "";
        $personnelOthers  = $this->input->post("personnelOthers") ?? null;
        $personnelQualification  = $this->input->post("personnelQualification") ?? "";
        $personnelStatement  = $this->input->post("personnelStatement") ?? "";
        $personnelDescription  = $this->input->post("personnelDescription") ?? "";
        $personnelDateNeeded  = $this->input->post("personnelDateNeeded") ?? null;


        $submittedAt             = $this->input->post("submittedAt") ?? null;
        $createdBy               = $this->input->post("createdBy");
        $updatedBy               = $this->input->post("updatedBy");
        $createdAt               = $this->input->post("createdAt");
        // $items                   = $this->input->post("items") ?? null;

        $purchaseRequestData = [
            "reviseRequisitionID" => $reviseRequisitionID,
            "employeeID"              => $employeeID,
            // "inventoryStorageID "     => $inventoryStorageID ,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "requisitionStatus"   => $requisitionStatus,
           
            "departmentID"   => $departmentID,
            "designationID"   => $designationID,
            "salaryPackage"   => $salaryPackage,
            "personnelReportByID"   => $personnelReportByID,
            "radioGroup1"   => $radioGroup1,
            "radioGroup2"   => $radioGroup2,
            "personnelOption"   => $personnelOption,
            "personnelReplacement"   => $personnelReplacement,
            "personnelDuration"   => $personnelDuration,
            "personnelOthers"   => $personnelOthers,
            "personnelQualification"   => $personnelQualification,
          
 
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
                    "requisitionStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseRequestData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "requisitionStatus" => $requisitionStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseRequestData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "requisitionStatus"  => 3,
                    "requisitionRemarks" => $requisitionRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $purchaseRequestData = [
                    "reviseRequisitionID" => $reviseRequisitionID,
                    "requisitionStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveTransferData = $this->purchaserequest->savePurchaseRequestData($action, $purchaseRequestData, $requisitionID);
        // if ($saveTransferData) {
        //     $result = explode("|", $saveTransferData);

        //     if ($result[0] == "true") {
        //         $requisitionID = $result[2];

        //         if ($items) {
        //             $purchaseRequestItems = [];
        //             foreach($items as $index => $item) {
        //                 $temp = [
        //                     "requisitionID"                    => $requisitionID,
        //                     "barcode"                       => $item["barcode"],
        //                     "itemCode"                      => $item["itemCode"],
        //                     "itemID"                        => $item["itemID"] != "null" ? $item["itemID"] : null,
        //                     "itemName"                      => $item["itemName"],
        //                     "inventoryStorageID"            => $item["inventoryStorageID"] != "null" ? $item["inventoryStorageID"] : null,
        //                     "inventoryStorageOfficeCode"    => $item["storagecode"],
        //                     "inventoryStorageOfficeName"    => $item["storageName"],
        //                     "quantity"                      => $item["quantity"],
        //                     "unitOfMeasurement"             => $item["uom"],
        //                     "classificationName"          => $item["classificationname"],
        //                     "incidentInformation"          => $item["incidentInformation"],
        //                     "incidentRecommendation"          => $item["incidentRecommendation"],
        //                     "createdBy"         => $item["createdBy"],
        //                     "updatedBy"         => $item["updatedBy"],
        //                 ];
        //                 array_push($purchaseRequestItems, $temp);

        //             }

        //             $savePurchTransferstItems = $this->purchaserequest->savePurchaseRequestItems($purchaseRequestItems, $requisitionID);
        //         }

        //     }
            
        // }
        echo json_encode($saveTransferData);
    }

}
?>