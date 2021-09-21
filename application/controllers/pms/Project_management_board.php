<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_management_board extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/ProjectManagementBoard_model", "projectmanagementboard");
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
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        echo json_encode($this->projectmanagementboard->getTimelineContent($timelineBuilderID));
        // echo json_encode($this->projectmanagementboard->getTimelineContent(1));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $timelineBuilderID        = $this->input->post("timelineBuilderID");
        $timelineManagementStatus = $this->input->post("timelineManagementStatus");
        $tasks = $this->input->post("tasks");

        $data = [];
        foreach ($tasks as $task) {
            $temp = [
                "timelineBuilderID"     => $timelineBuilderID,
                "taskID"                => $task["taskID"],
                "projectMilestoneID"    => $task["projectMilestoneID"],
                "manHours"              => $task["manHours"],
                "assignedEmployee"      => $task["assignEmployee"],
                "assignedDesignation"   => $task["assignDesignation"],
                "assignedManHours"      => $task["assignManHours"],
                "assignedStartDate"     => $task["assignStartDate"],
                "assignedEndDate"       => $task["assignEndDate"],
                "assignedDays"          => $task["assignDays"],
                "assignedRegularHours"  => $task["assingRegularHours"],
                "assignedOvertimeHours" => $task["assingOvertimeHours"],
                "createdBy"             => $sessionID,
                "updatedBy"             => $sessionID
            ];
            array_push($data, $temp);
        }
        echo json_encode($this->projectmanagementboard->saveProjectBoard($timelineBuilderID, $timelineManagementStatus, $data));
    }

}