<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ProjectManagementBoard_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveProjectBudget($timelineBuilderID = null, $allocatedBudget = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if ($timelineBuilderID && $allocatedBudget) {
            $data = [
                "timelineAllocatedBudget" => $allocatedBudget,
                "timelineBudgetStatus"    => 1, // ALLOCATED
                "timelineBuilderStatus"   => 7, // REASSESSMENT
                "allocatedBudgetBy"       => $sessionID,
                "updatedBy"               => $sessionID
            ];
            $query = $this->db->update("pms_timeline_builder_tbl", $data, ["timelineBuilderID" => $timelineBuilderID]);
            return $query ? "true|Successfully submitted|$timelineBuilderID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    // ----- GET TIMELINE CONTENT -----
    public function getProjectDetails($timelineBuilderID = 0)
    {
        $sql = "
        SELECT 
            ptbt.timelineBuilderID,
            ptbt.employeeID,
            ptbt.timelineManagementBy,
            ptbt.timelineTeamMember AS teamMember,
            ptbt.timelineBuilderStatus,
            ptbt.timelineManagementStatus,
            ptbt.projectCode AS projectCode,
            pplt.projectListName AS projectName
        FROM 
            pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
        WHERE 
            ptbt.timelineBuilderID = $timelineBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getMilestoneList($milestoneBuilderID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
        $query  = $this->db->query($sql);
        $milestones = $query ? $query->result_array() : [];
        foreach ($milestones as $milestone) {
            $projectMilestoneID   = $milestone["projectMilestoneID"];
            $projectMilestoneName = $milestone["projectMilestoneName"];
            $temp = [
                "milestoneID"   => $projectMilestoneID,
                "milestoneName" => $projectMilestoneName,
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelineBoard($timelineBuilderID = 0, $taskID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_timeline_management_tbl WHERE timelineBuilderID = $timelineBuilderID AND taskID = $taskID";
        $query  = $this->db->query($sql);
        $milestones = $query ? $query->result_array() : [];
        foreach ($milestones as $milestone) {
            $temp = [
                "timelineManagementID" => $milestone["timelineManagementID"],
                "milestoneID"          => $milestone["projectMilestoneID"],
                "manHours"             => $milestone["manHours"],
                "assignedDesignation"  => $milestone["assignedDesignation"],
                "assignedManHours"     => $milestone["assignedManHours"],
                "assignedEmployee"     => $milestone["assignedEmployee"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTaskList($timelineBuilderID = 0, $milestoneBuilderID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_timeline_task_list_tbl WHERE timelineBuilderID = $timelineBuilderID AND milestoneBuilderID = $milestoneBuilderID";
        $query  = $this->db->query($sql);
        $tasks  = $query ? $query->result_array() : [];
        foreach ($tasks as $task) {
            $temp = [
                "taskID"        => $task["taskID"],
                "taskName"      => $task["taskName"],
                "manHours"      => $task["allottedHours"],
                "taskStartDate" => date("M d, Y", strtotime($task["taskStartDate"])),
                "taskEndDate"   => date("M d, Y", strtotime($task["taskEndDate"])),
                "milestoneTask" => $this->getTimelineBoard($timelineBuilderID, $task["taskID"])
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelinePhases($timelineBuilderID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            pttlt.milestoneBuilderID,
            phaseCode,
            phaseDescription
        FROM 
            pms_timeline_task_list_tbl AS pttlt
            LEFT JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID) 
        WHERE 
            timelineBuilderID = $timelineBuilderID 
            GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);

        $phases = $query ? $query->result_array() : [];
        foreach ($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "milestoneBuilderID" => $milestoneBuilderID,
                "phaseCode"          => $phase["phaseCode"],
                "phaseDescription"   => $phase["phaseDescription"],
                "milestones"         => $this->getMilestoneList($milestoneBuilderID),
                "tasks"              => $this->getTaskList($timelineBuilderID, $milestoneBuilderID),
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelineContent($timelineBuilderID = 1)
    {
        $output = [];
        $projectDetails = $this->getProjectDetails($timelineBuilderID);
        if ($projectDetails) {
            $output["timelineBuilderID"]    = $projectDetails->timelineBuilderID;
            $output["employeeID"]           = $projectDetails->employeeID;
            $output["timelineManagementBy"] = $projectDetails->timelineManagementBy;
            $output["teamMember"]           = $projectDetails->teamMember;
            $output["projectName"]          = $projectDetails->projectName;
            $output["projectCode"]          = $projectDetails->projectCode;
            $output["timelineManagementStatus"] = $projectDetails->timelineManagementStatus;

            $output["phases"] = $this->getTimelinePhases($timelineBuilderID);
        }
        return $output;
    }
    // ----- END GET TIMELINE CONTENT -----


    public function deleteProjectBoard($timelineBuilderID = 0)
    {
        $query = $this->db->delete("pms_timeline_management_tbl", ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function updateProjectBuilder($timelineBuilderID, $timelineManagementStatus)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $query = $this->db->update(
            "pms_timeline_builder_tbl", 
            [
                "timelineManagementBy"     => $sessionID,
                "timelineManagementStatus" => $timelineManagementStatus
            ], 
            ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function saveProjectBoard($timelineBuilderID = 0, $timelineManagementStatus = 0, $data = [])
    {
        $delete = $this->deleteProjectBoard($timelineBuilderID);
        $update = $this->updateProjectBuilder($timelineBuilderID, $timelineManagementStatus);
        if ($data && count($data) > 0) {
            $query = $this->db->insert_batch("pms_timeline_management_tbl", $data);
            return $query ? "true|Successfully submitted|$timelineBuilderID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}


