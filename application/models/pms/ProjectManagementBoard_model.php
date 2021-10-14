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

    public function getTimelineBoard($managementBoardID = 0, $timelineBuilderID = 0, $taskID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            ptmt.*,
            pttlt.taskStartDate,
            pttlt.taskEndDate 
        FROM pms_timeline_management_tbl AS ptmt 
            LEFT JOIN pms_timeline_task_list_tbl AS pttlt USING(taskID)
        WHERE ptmt.timelineBuilderID = $timelineBuilderID 
            AND ptmt.managementBoardID = $managementBoardID
            AND ptmt.taskID = $taskID";
        $query  = $this->db->query($sql);
        $milestones = $query ? $query->result_array() : [];
        foreach ($milestones as $milestone) {
            $temp = [
                "timelineManagementID"  => $milestone["timelineManagementID"],
                "milestoneID"           => $milestone["projectMilestoneID"],
                "manHours"              => $milestone["manHours"],
                "taskStartDate"         => $milestone["taskStartDate"],
                "taskEndDate"           => $milestone["taskEndDate"],
                "assignedDesignation"   => $milestone["assignedDesignation"],
                "assignedManHours"      => $milestone["assignedManHours"],
                "assignedEmployee"      => $milestone["assignedEmployee"],
                "assignedStartDate"     => $milestone["assignedStartDate"],
                "assignedEndDate"       => $milestone["assignedEndDate"],
                "assignedDays"          => $milestone["assignedDays"],
                "assignedRegularHours"  => $milestone["assignedRegularHours"],
                "assignedOvertimeHours" => $milestone["assignedOvertimeHours"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTaskList($managementBoardID = 0, $timelineBuilderID = 0, $milestoneBuilderID = 0)
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
                "taskStartDate" => $task["taskStartDate"],
                "taskEndDate"   => $task["taskEndDate"],
                "milestoneTask" => $this->getTimelineBoard($managementBoardID, $timelineBuilderID, $task["taskID"])
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelinePhases($managementBoardID = 0, $timelineBuilderID = 0)
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
                "tasks"              => $this->getTaskList($managementBoardID, $timelineBuilderID, $milestoneBuilderID),
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getManagementBoardData($managementBoardID = 0)
    {
        $sql = "SELECT * FROM pms_management_board_tbl WHERE managementBoardID = $managementBoardID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getTimelineContent($managementBoardID = 1)
    {
        $output = [];
        $managementBoardData = $this->getManagementBoardData($managementBoardID);
        if ($managementBoardData) {
            $output["managementBoardID"]         = $managementBoardID;
            $output["managementBoardCode"]       = $managementBoardData->managementBoardCode;
            $output["reviseManagementBoardID"]   = $managementBoardData->reviseManagementBoardID;
            $output["reviseManagementBoardCode"] = $managementBoardData->reviseManagementBoardCode;
            $output["employeeID"]                = $managementBoardData->employeeID;
            $output["approversID"]               = $managementBoardData->approversID;
            $output["approversDate"]             = $managementBoardData->approversDate;
            $output["approversStatus"]           = $managementBoardData->approversStatus;
            $output["managementBoardStatus"]     = $managementBoardData->managementBoardStatus;
            $output["createdAt"]                 = $managementBoardData->createdAt;
            $output["submittedAt"]               = $managementBoardData->submittedAt;
            $output["managementBoardReason"]     = $managementBoardData->managementBoardReason;
            $output["managementBoardRemarks"]    = $managementBoardData->managementBoardRemarks;
            $output["reviseManagementBoardID"]   = $managementBoardData->reviseManagementBoardID;

            $timelineBuilderID = $managementBoardData->timelineBuilderID;
            $projectDetails = $this->getProjectDetails($timelineBuilderID);
            if ($projectDetails) {
                $output["timelineBuilderID"]        = $projectDetails->timelineBuilderID;
                $output["teamMember"]               = $projectDetails->teamMember;
                $output["projectName"]              = $projectDetails->projectName;
                $output["projectCode"]              = $projectDetails->projectCode;
                $output["timelineManagementStatus"] = $projectDetails->timelineManagementStatus;
    
                $output["phases"] = $this->getTimelinePhases($managementBoardID, $timelineBuilderID);
            }
        }
        return $output;
    }
    // ----- END GET TIMELINE CONTENT -----


    public function updateProjectBuilder($timelineBuilderID = 0, $timelineBuilderData = [])
    {
        $query = $this->db->update(
            "pms_timeline_builder_tbl", 
            $timelineBuilderData,
            ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function deleteTimelineManagementData($managementBoardID = 0)
    {
        $query = $this->db->delete("pms_timeline_management_tbl", [ "managementBoardID" => $managementBoardID]);
        return $query ? true : false;
    }

    public function insertTimelineManagementData($managementBoardID = 0, $taskData = [])
    {
        if ($taskData && count($taskData) > 0)
        {
            $deleteTimelineManagementData = $this->deleteTimelineManagementData($managementBoardID);
            $query = $this->db->insert_batch("pms_timeline_management_tbl", $taskData);
            return $query ? true : false;
        }
        return true;
    }

    public function saveProjectBoard($isRevise = false, $managementBoardID = 0, $managementBoardCode = "", $managementBoardData = [])
    {
        if ($isRevise) {
            $managementBoardData["reviseManagementBoardID"]   = $managementBoardID;
            $managementBoardData["reviseManagementBoardCode"] = $managementBoardCode;
            $query = $this->db->insert("pms_management_board_tbl", $managementBoardData);
            $managementBoardID = $this->db->insert_id();
        } else {
            $query = $this->db->update("pms_management_board_tbl", $managementBoardData, ["managementBoardID" => $managementBoardID]);
        }
        
        if ($query) {
            $data = $this->getManagementBoardData($managementBoardID);
            if ($data) {
                $createdAt = $data->createdAt ?? date("Y-m-d");
                $managementBoardCode   = $data->managementBoardCode ?? "";
                $managementBoardStatus = $data->managementBoardStatus ?? 0;
                $timelineBuilderID     = $data->timelineBuilderID ?? 0;
                $employeeID            = $data->employeeID ?? 0;

                if (!$managementBoardCode) {
                    $managementBoardCode = getFormCode("PMB", $createdAt, $managementBoardID);
                    $this->db->update("pms_management_board_tbl", ["managementBoardCode" => $managementBoardCode], ["managementBoardID" => $managementBoardID]);
                } 

                if ($managementBoardStatus == 2) {
                    $timelineBuilderData = [
                        "timelineManagementBy"     => $employeeID,
                        "timelineManagementStatus" => 2
                    ];
                    $this->updateProjectBuilder($timelineBuilderID, $timelineBuilderData);
                } else {
                    $timelineBuilderData = [
                        "timelineManagementBy"     => $employeeID,
                        "timelineManagementStatus" => 1
                    ];
                    $this->updateProjectBuilder($timelineBuilderID, $timelineBuilderData);
                }
            }
            return "true|$managementBoardCode|$managementBoardID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";

    }

}


