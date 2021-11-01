<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_requisition extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ServiceRequisition_model", "servicerequisition");
        isAllowed(46);
    }

    public function index()
    {
        $data["title"] = "Service Requisition";

        $this->load->view("template/header",$data);
        $this->load->view("ims/service_requisition/index");
        $this->load->view("template/footer");
    }

    public function saveServiceRequisition()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $serviceRequisitionID       = $this->input->post("serviceRequisitionID") ?? null;
        $reviseServiceRequisitionID = $this->input->post("reviseServiceRequisitionID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $clientID                   = $this->input->post("clientID") ?? null;
        $clientCode                 = $this->input->post("clientCode") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;
        $clientContactDetails       = $this->input->post("clientContactDetails") ?? null;
        $clientContactPerson        = $this->input->post("clientContactPerson") ?? null;
        $projectID                  = $this->input->post("projectID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $projectCategory            = $this->input->post("projectCategory") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $serviceRequisitionStatus   = $this->input->post("serviceRequisitionStatus");
        $serviceRequisitionReason   = $this->input->post("serviceRequisitionReason") ?? null;
        $serviceRequisitionRemarks  = $this->input->post("serviceRequisitionRemarks") ?? null;
        $serviceRequisitionTotalAmount  = $this->input->post("serviceRequisitionTotalAmount") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        $serviceRequisitionData = [
            "reviseServiceRequisitionID" => $reviseServiceRequisitionID,
            "employeeID"                 => $employeeID,
            "clientID"                   => $clientID,
            "clientCode"                 => $clientCode,
            "clientName"                 => $clientName,
            "clientAddress"              => $clientAddress,
            "clientContactDetails"       => $clientContactDetails,
            "clientContactPerson"        => $clientContactPerson,
            "projectID"                  => $projectID,
            "projectCode"                => $projectCode,
            "projectName"                => $projectName,
            "projectCategory"            => $projectCategory,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "serviceRequisitionStatus"   => $serviceRequisitionStatus,
            "serviceRequisitionReason"   => $serviceRequisitionReason,
            "serviceRequisitionTotalAmount" => $serviceRequisitionTotalAmount,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($serviceRequisitionData["reviseServiceRequisitionID"]);
            unset($serviceRequisitionData["createdBy"]);
            unset($serviceRequisitionData["createdAt"]);

            if ($method == "cancelform") {
                $serviceRequisitionData = [
                    "serviceRequisitionStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $serviceRequisitionData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "serviceRequisitionStatus" => $serviceRequisitionStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $serviceRequisitionData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "serviceRequisitionStatus"  => 3,
                    "serviceRequisitionRemarks" => $serviceRequisitionRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $serviceRequisitionData = [
                    "reviseServiceRequisitionID" => $reviseServiceRequisitionID,
                    "serviceRequisitionStatus"   => 5,
                    "updatedBy"                  => $updatedBy,
                ]; 
            } else {
                $this->servicerequisition->deleteServicesAndScopes($serviceRequisitionID);
            }
        }

        $saveServiceRequisitionData = $this->servicerequisition->saveServiceRequisitionData($action, $serviceRequisitionData, $serviceRequisitionID);

        if ($saveServiceRequisitionData) {
            $result = explode("|", $saveServiceRequisitionData);
            $serviceRequisitionID = $result[2];

            if ($method == "submit" || $method == "save") {
                if ($result[0] == "true") {
    
                    if ($items && count($items) > 0) {
                        foreach($items as $index => $item) {
                            $service = [
                                "serviceRequisitionID" => $serviceRequisitionID,
                                "serviceID"            => $item["serviceID"] != "null" ? $item["serviceID"] : null,
                                "serviceName"          => $item["serviceName"],
                                "remarks"              => $item["remarks"],
                                "createdBy"            => $updatedBy,
                                "updatedBy"            => $updatedBy,
                            ];
                            $scopes = $item["scopes"];
    
                            $saveServices = $this->servicerequisition->saveServices($service, $scopes, $serviceRequisitionID);
                        }
                    }
                }
            } else if ($method == "drop") {
                $dropServices = $this->servicerequisition->dropServices($serviceRequisitionID);
            }
            
            
            // ----- INSERT SERVICE ORDER -----
            if ($serviceRequisitionStatus == "2") {
                $insertServiceOrderData = $this->servicerequisition->insertServiceOrderData($serviceRequisitionID);
            }
            // ----- END INSERT SERVICE ORDER -----
        }
        echo json_encode($saveServiceRequisitionData);
    }

}
?>