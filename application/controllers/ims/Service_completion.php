<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_completion extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ServiceCompletion_model", "servicecompletion");
        isAllowed(46);
    }

    public function index()
    {
        $data["title"] = "Service Completion";

        $this->load->view("template/header",$data);
        $this->load->view("ims/service_completion/index");
        $this->load->view("template/footer");
    }

    public function saveServiceCompletion()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $serviceCompletionID       = $this->input->post("serviceCompletionID") ?? null;
        $reviseServiceCompletionID = $this->input->post("reviseServiceCompletionID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $clientID                   = $this->input->post("clientID") ?? null;
        $projectID                  = $this->input->post("projectID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $serviceCompletionStatus   = $this->input->post("serviceCompletionStatus");
        $serviceCompletionReason   = $this->input->post("serviceCompletionReason") ?? null;
        $serviceCompletionRemarks  = $this->input->post("serviceCompletionRemarks") ?? null;
        $serviceCompletionTotalAmount  = $this->input->post("serviceCompletionTotalAmount") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        $serviceCompletionData = [
            "reviseServiceCompletionID" => $reviseServiceCompletionID,
            "employeeID"                 => $employeeID,
            "clientID"                   => $clientID,
            "projectID"                  => $projectID,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "serviceCompletionStatus"   => $serviceCompletionStatus,
            "serviceCompletionReason"   => $serviceCompletionReason,
            "serviceCompletionTotalAmount"   => $serviceCompletionTotalAmount,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($serviceCompletionData["reviseServiceCompletionID"]);
            unset($serviceCompletionData["createdBy"]);
            unset($serviceCompletionData["createdAt"]);

            if ($method == "cancelform") {
                $serviceCompletionData = [
                    "serviceCompletionStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $serviceCompletionData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "serviceCompletionStatus" => $serviceCompletionStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $serviceCompletionData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "serviceCompletionStatus"  => 3,
                    "serviceCompletionRemarks" => $serviceCompletionRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else {
                $this->servicecompletion->deleteServicesAndScopes($serviceCompletionID);
            }
        }

        $saveServiceCompletionData = $this->servicecompletion->saveServiceCompletionData($action, $serviceCompletionData, $serviceCompletionID);

        if ($saveServiceCompletionData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $saveServiceCompletionData);

            if ($result[0] == "true") {
                $serviceCompletionID = $result[2];

                if ($items) {
                    foreach($items as $index => $item) {
                        $service = [
                            "serviceCompletionID" => $serviceCompletionID,
                            "serviceID"            => $item["serviceID"] != "null" ? $item["serviceID"] : null,
                            "serviceName"          => $item["serviceName"],
                            "remarks"              => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];
                        $scopes = $item["scopes"];

                        $saveServices = $this->servicecompletion->saveServices($service, $scopes, $serviceCompletionID);
                    }
                }

            }
            
        }
        echo json_encode($saveServiceCompletionData);
    }

}
?>