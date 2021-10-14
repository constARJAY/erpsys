<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_management_board extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/ProjectManagementBoard_model", "projectmanagementboard");
        $this->load->model("pms/CostEstimate_model", "costestimate");
        isAllowed(92);
    }

    public function index()
    {
        $data["title"] = "Project Management Board";

        $this->load->view("template/header",$data);
        $this->load->view("pms/project_management_board/index");
        $this->load->view("template/footer");
    }

    public function getTimelineContent()
    {
        $managementBoardID = $this->input->post("managementBoardID");
        echo json_encode($this->projectmanagementboard->getTimelineContent($managementBoardID));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $method                 = $this->input->post("method");
        $isRevise               = $this->input->post("isRevise") ? $this->input->post("isRevise") == "true" : false;
        $managementBoardID      = $this->input->post("managementBoardID");
        $managementBoardCode    = $this->input->post("managementBoardCode");
        $timelineBuilderID      = $this->input->post("timelineBuilderID");
        $employeeID             = $this->input->post("employeeID") ?? null;
        $submittedAt            = $this->input->post("submittedAt") ?? null;
        $approversID            = $this->input->post("approversID") ?? null;
        $approversDate          = $this->input->post("approversDate") ?? null;
        $approversStatus        = $this->input->post("approversStatus") ?? null;
        $managementBoardReason  = $this->input->post("managementBoardReason") ?? null;
        $managementBoardRemarks = $this->input->post("managementBoardRemarks") ?? null;
        $managementBoardStatus  = $this->input->post("managementBoardStatus") ?? null;
        $tasks                  = $this->input->post("tasks");

        $managementBoardData = [
            "timelineBuilderID"     => $timelineBuilderID,
            "employeeID"            => $employeeID,
            "managementBoardReason" => $managementBoardReason,
            "managementBoardStatus" => $managementBoardStatus,
        ];

        if ($method == "cancelform") {
            $managementBoardData = [
                "managementBoardStatus" => 4,
            ];
        } else if ($method == "deny") {
            $managementBoardData = [
                "approversDate"          => $approversDate,
                "approversStatus"        => $approversStatus,
                "managementBoardStatus"  => 3,
                "managementBoardRemarks" => $managementBoardRemarks,
            ];
        } else if ($method == "approve") {
            $managementBoardData = [
                "approversDate"         => $approversDate,
                "approversStatus"       => $approversStatus,
                "managementBoardStatus" => $managementBoardStatus,
            ];
        } else if ($method == "submit") {
            $managementBoardData = [
                "timelineBuilderID"     => $timelineBuilderID,
                "employeeID"            => $employeeID,
                "submittedAt"           => $submittedAt,
                "managementBoardReason" => $managementBoardReason,
                "approversID"           => $approversID,
                "approversDate"         => $approversDate,
                "approversStatus"       => $approversStatus,
                "managementBoardStatus" => $managementBoardStatus,
            ];
        }
        
        $saveProjectBoard = $this->projectmanagementboard->saveProjectBoard($isRevise, $managementBoardID, $managementBoardCode, $managementBoardData);
        $result = explode("|", $saveProjectBoard);
        if ($result[0] == "true") {
            $managementBoardID = $result[2];

            $taskData = [];
            if ($tasks && count($tasks) > 0) {
                foreach ($tasks as $task) {
                    $temp = [
                        "timelineBuilderID"     => $timelineBuilderID,
                        "managementBoardID"     => $managementBoardID,
                        "taskID"                => $task["taskID"],
                        "projectMilestoneID"    => $task["projectMilestoneID"],
                        "manHours"              => $task["manHours"],
                        "assignedEmployee"      => $task["assignedEmployee"],
                        "assignedDesignation"   => $task["assignedDesignation"],
                        "assignedManHours"      => $task["assignedManHours"],
                        "assignedStartDate"     => $task["assignedStartDate"],
                        "assignedEndDate"       => $task["assignedEndDate"],
                        "assignedRegularHours"  => $task["assignedRegularHours"],
                        "assignedOvertimeHours" => $task["assignedOvertimeHours"],
                        "createdBy"             => $sessionID,
                        "updatedBy"             => $sessionID
                    ];
                    array_push($taskData, $temp);
                }
                $insertTimelineManagementData = $this->projectmanagementboard->insertTimelineManagementData($managementBoardID, $taskData);
            }

            if ($managementBoardStatus == 2) {
                $saveCEResult = $this->costestimate->saveCE($timelineBuilderID);
                $CEResult     = explode("|", $saveCEResult);
                if($CEResult[0] == "false"){
                    $result = $CEResult;
                }
            }
        }
        echo json_encode($saveProjectBoard);
    }

}