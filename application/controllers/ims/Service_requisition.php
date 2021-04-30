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
        $projectID                  = $this->input->post("projectID") ?? null;
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
            "projectID"                  => $projectID,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "serviceRequisitionStatus"   => $serviceRequisitionStatus,
            "serviceRequisitionReason"   => $serviceRequisitionReason,
            "serviceRequisitionTotalAmount"   => $serviceRequisitionTotalAmount,
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
            }
        }

        $saveServiceRequisitionData = $this->servicerequisition->saveServiceRequisitionData($action, $serviceRequisitionData, $serviceRequisitionID);
        if ($saveServiceRequisitionData) {
            $result = explode("|", $saveServiceRequisitionData);

            if ($result[0] == "true") {
                $serviceRequisitionID = $result[2];

                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "serviceRequisitionID" => $serviceRequisitionID,
                            "serviceID"            => $item["serviceID"] != "null" ? $item["serviceID"] : null,
                            "serviceName"          => $item["serviceName"],
                            "serviceUom"           => $item["serviceUom"],
                            "quantity"             => $item["quantity"],
                            "unitCost"             => $item["unitcost"],
                            "totalCost"            => $item["totalcost"],
                            "remarks"             => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];
                        $scopes = $item["scopes"];

                        $saveServices = $this->servicerequisition->saveServices($service, $scopes, $serviceRequisitionID);
                    }
                }

            }
            
        }
        echo json_encode($saveServiceRequisitionData);
    }

}
?>