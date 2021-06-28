<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sign_off extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/SignOff_model", "signoff");
        isAllowed(52);
    }

    public function index()
    {
        $data["title"] = "Sign-Off Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/sign_off/index");
        $this->load->view("template/footer");
    }

    public function getSignOffContent()
    {
        $signOffID = $this->input->post("signOffID");
        echo json_encode($this->signoff->getSignOffContent($signOffID));
    }

    public function saveSignOff()
    {
        $action             = $this->input->post("action");
        $method             = $this->input->post("method");
        $signOffID          = $this->input->post("signOffID") ?? null;
        $reviseSignOffID    = $this->input->post("reviseSignOffID") ?? null;
        $employeeID         = $this->input->post("employeeID");
        $clientID           = $this->input->post("clientID") ?? null;
        $clientName         = $this->input->post("clientName") ?? null;
        $clientAddress      = $this->input->post("clientAddress") ?? null;
        $timelineBuilderID  = $this->input->post("timelineBuilderID") ?? null;
        $projectCode        = $this->input->post("projectCode") ?? null;
        $projectName        = $this->input->post("projectName") ?? null;
        $projectCategory    = $this->input->post("projectCategory") ?? null;
        $milestoneBuilderID = $this->input->post("milestoneBuilderID") ?? null;
        $phaseName          = $this->input->post("phaseName") ?? null;
        $signOffReason      = $this->input->post("signOffReason") ?? null;
        $signOffComment     = $this->input->post("signOffComment") ?? null;
        $signOffRemarks     = $this->input->post("signOffRemarks") ?? null;
        $approversID        = $this->input->post("approversID") ?? null;
        $approversStatus    = $this->input->post("approversStatus") ?? null;
        $approversDate      = $this->input->post("approversDate") ?? null;
        $signOffStatus      = $this->input->post("signOffStatus");
        $submittedAt        = $this->input->post("submittedAt") ?? null;
        $createdBy          = $this->input->post("createdBy");
        $updatedBy          = $this->input->post("updatedBy");
        $createdAt          = $this->input->post("createdAt");
        $deliverables       = $this->input->post("deliverables") ?? [];

        $signOffData = [
            "reviseSignOffID"    => $reviseSignOffID,
            "employeeID"         => $employeeID,
            "clientID"           => $clientID,
            "clientName"         => $clientName,
            "clientAddress"      => $clientAddress,
            "timelineBuilderID"  => $timelineBuilderID,
            "projectCode"        => $projectCode,
            "projectName"        => $projectName,
            "projectCategory"    => $projectCategory,
            "milestoneBuilderID" => $milestoneBuilderID,
            "phaseName"          => $phaseName,
            "signOffReason"      => $signOffReason,
            "signOffComment"     => $signOffComment,
            "signOffRemarks"     => $signOffRemarks,
            "approversID"        => $approversID,
            "approversStatus"    => $approversStatus,
            "approversDate"      => $approversDate,
            "signOffStatus"      => $signOffStatus,
            "submittedAt"        => $submittedAt,
            "createdBy"          => $createdBy,
            "updatedBy"          => $createdBy,
            "createdAt"          => $createdAt
        ];

        if ($action == "update") {
            unset($signOffData["reviseSignOffID"]);
            unset($signOffData["createdBy"]);
            unset($signOffData["createdAt"]);

            if ($method == "cancelform") {
                $signOffData = [
                    "signOffStatus" => 4,
                    "updatedBy"     => $updatedBy,
                ];
            } else if ($method == "approve") {
                $signOffData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "signOffStatus"   => $signOffStatus,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "deny") {
                $signOffData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "signOffStatus"   => 3,
                    "signOffRemarks"  => $signOffRemarks,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "drop") {
                $signOffData = [
                    "reviseSignOffID" => $reviseSignOffID,
                    "signOffStatus"   => 5,
                    "updatedBy"       => $updatedBy,
                ]; 
            } else {
                $this->signoff->deleteDeliverables($signOffID);
            }
        }

        $saveSignOffData = $this->signoff->saveSignOffData($action, $signOffData, $signOffID);

        if ($saveSignOffData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $saveSignOffData);

            if ($result[0] == "true") {
                $signOffID = $result[2];

                if ($deliverables && count($deliverables) > 0) {
                    $items = [];
                    foreach($deliverables as $index => $item) {
                        $temp = [
                            "signOffID"   => $signOffID,
                            "description" => $item["description"],
                            "createdBy"   => $updatedBy,
                            "updatedBy"   => $updatedBy,
                        ];
                        array_push($items, $temp);
                    }
                    $saveDeliverables = $this->signoff->saveDeliverables($items);
                }

            }
            
        }
        echo json_encode($saveSignOffData);
    }

}