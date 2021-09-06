<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_timeline_builder extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/ProjectTimelineBuilder_model", "projecttimeline");
        isAllowed(90);
    }

    public function index()
    {
        $data["title"] = "Project Timeline Builder";

        $this->load->view("template/header",$data);
        $this->load->view("pms/project_timeline/index");
        $this->load->view("template/footer");
    }


    public function savetimelineBuilder(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $timelineBuilderID          = $this->input->post("timelineBuilderID") ?? null;
        $reviseTimelineBuilderID    = $this->input->post("reviseTimelineBuilderID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectID                  = $this->input->post("projectID") ?? null;
        $clientID                   = $this->input->post("clientID") ?? null;
        $timelineStartDate          = $this->input->post("timelineStartDate") ?? null;
        $timelineEndDate            = $this->input->post("timelineEndDate") ?? null;
        $timelinePriorityLevel      = $this->input->post("timelinePriorityLevel") ?? null;
        $timelineIssued             = $this->input->post("timelineIssued") ?? null;
        $timelineProjectManager     = $this->input->post("timelineProjectManager") ?? null;
        $timelineTeamLeader         = $this->input->post("timelineTeamLeader") ?? null;
        $timelineTeamMember         = $this->input->post("timelineTeamMember") ?? null;
        $timelineBuilderReason      = $this->input->post("timelineBuilderReason") ?? null;
        $timelineProposedBudget     = $this->input->post("timelineProposedBudget") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $timelineBuilderStatus      = $this->input->post("timelineBuilderStatus");
        $timelineBuilderReason      = $this->input->post("timelineBuilderReason") ?? null;
        $timelineBuilderRemarks     = $this->input->post("timelineBuilderRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $tasks                      = $this->input->post("tasks") ?? null;

        $projectCode             = $this->projecttimeline->getClientCount($clientID);

        $timelineBuilderData = [
            "reviseTimelineBuilderID" => $reviseTimelineBuilderID,
            "employeeID"              => $employeeID,
            "projectID"               => $projectID,
            "projectCode"             => $projectCode,
            "clientID"                => $clientID,
            "timelineStartDate"       => $timelineStartDate,
            "timelineEndDate"         => $timelineEndDate,
            "timelinePriorityLevel"   => $timelinePriorityLevel,
            "timelineIssued"          => $timelineIssued,
            "timelineProjectManager"  => $timelineProjectManager,
            "timelineTeamLeader"      => $timelineTeamLeader,
            "timelineTeamMember"      => $timelineTeamMember,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "timelineBuilderStatus"   => $timelineBuilderStatus,
            "timelineBuilderReason"   => $timelineBuilderReason,
            "timelineProposedBudget"  => $timelineProposedBudget,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($timelineBuilderData["reviseTimelineBuilderID"]);
            unset($timelineBuilderData["createdBy"]);
            unset($timelineBuilderData["createdAt"]);

            if ($method == "cancelform") {
                $timelineBuilderData = [
                    "timelineBuilderStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $timelineBuilderData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "timelineBuilderStatus" => $timelineBuilderStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $timelineBuilderData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "timelineBuilderStatus"  => 3,
                    "timelineBuilderRemarks" => $timelineBuilderRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }   else if ($method == "drop") {
                $timelineBuilderData = [
                    "reviseTimelineBuilderID" => $reviseTimelineBuilderID,
                    "timelineBuilderStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveTimelineBuilderData = $this->projecttimeline->saveTimelineBuilderData($action, $timelineBuilderData, $timelineBuilderID);
       

        
        if ($saveTimelineBuilderData) {
            
            $result = explode("|", $saveTimelineBuilderData);
           
            if ($result[0] == "true") {
                $timelineBuilderID = $result[2];
                if($_FILES){
                    $fileType                   = substr($_FILES["file"]["type"], strpos($_FILES["file"]["type"], "/") + 1);
                    $timelineDesign             = "PTB-".date("y")."-".str_pad($timelineBuilderID, 5, '0', STR_PAD_LEFT).".".$fileType;
                    $updateTimelineBuilderData  = ["timelineDesign" => $timelineDesign];
                    if(file_exists("assets/upload-files/project-designs/".$timelineDesign)){
                        unlink("assets/upload-files/project-designs/".$timelineDesign);
                    }
                    if(move_uploaded_file($_FILES["file"]["tmp_name"], "assets/upload-files/project-designs/".$timelineDesign)){
                        $this->projecttimeline->updateTimelineBuilder("pms_timeline_builder_tbl", $updateTimelineBuilderData, "timelineBuilderID = ".$timelineBuilderID);
                    }
                }
                

                if ($tasks) {
                    $timelineBuilderITasks = [];
                    foreach($tasks as $index => $task) {
                        $createdByAlt = $createdBy ? $createdBy : $updatedBy;
                        $temp = [
                            "timelineBuilderID"     => $timelineBuilderID,
                            "milestoneBuilderID"    => $task["milestoneBuilderID"],
                            // "milestoneListID"       => $task["milestoneListID"],
                            "taskName"              => $task["taskName"],
                            "allottedHours"         => $task["allottedHours"],
                            "taskStartDate"         => $task["taskStartDate"],
                            "taskEndDate"           => $task["taskEndDate"],
                            "taskRemarks"           => $task["taskRemarks"] ?? null,
                            "createdBy"             => $createdByAlt,
                            "updatedBy"             => $updatedBy,
                        ];
                        array_push($timelineBuilderITasks, $temp);
                    }
                    $saveTimelineBuilderItems = $this->projecttimeline->saveTimelineBuilderItems($timelineBuilderITasks, $timelineBuilderID);
                }

            }
            
        }
        echo json_encode($saveTimelineBuilderData);
    }

    






}
?>