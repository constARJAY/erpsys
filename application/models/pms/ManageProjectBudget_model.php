<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class ManageProjectBudget_model extends CI_Model {

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
    public function getTimelineData($timelineBuilderID = 0)
    {
        $sql = "
        SELECT 
            ptbt.timelineBuilderID,
            ptbt.createdAt AS ptbtCreatedAt,
            ptbt.timelineBudgetStatus AS budgetStatus,
            ptbt.submittedAt,
            ptbt.timelineBuilderReason,
            ptbt.projectCode AS projectCode,
            pplt.projectListName AS projectName,
            pct.categoryName AS projectCategory,
            pct2.clientName,
            clientUnitNumber,
            clientHouseNumber,
            clientBarangay,
            clientCity,
            clientProvince,
            clientCountry,
            clientPostalCode,
            ptbt.timelineStartDate,
            ptbt.timelineEndDate,
            ptbt.timelineProposedBudget AS proposedBudget,
            ptbt.timelineAllocatedBudget AS allocatedBudget,
            (CASE
                WHEN ptbt.timelinePriorityLevel = 1 THEN 'Medium'
                WHEN ptbt.timelinePriorityLevel = 2 THEN 'High'
                WHEN ptbt.timelinePriorityLevel = 3 THEN 'Urgent'
                ELSE 'Low'
            END) AS timelinePriority,
            (CASE
                WHEN ptbt.timelineIssued = 1 THEN 'For Purchasing'
                ELSE 'For Development'
            END) AS timelineIssued,
            ptbt.timelineProjectManager AS projectManager,
            ptbt.timelineTeamLeader AS teamLeader,
            ptbt.timelineTeamMember AS teamMember,
            ptbt.approversID,
            ptbt.approversDate,
            ptbt.approversStatus,
            ptbt.timelineBuilderStatus,
            ptbt.timelineBuilderRemarks,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            departmentName,
            designationName
        FROM 
            pms_timeline_builder_tbl AS ptbt
            LEFT JOIN hris_employee_list_tbl AS helt ON ptbt.employeeID = helt.employeeID
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
            LEFT JOIN pms_category_tbl AS pct ON pplt.categoryID = pct.categoryID
            LEFT JOIN pms_client_tbl AS pct2 ON ptbt.clientID = pct2.clientID
        WHERE 
            ptbt.timelineBuilderID = $timelineBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getEmployeeInformation($employeeID = 0)
    {
        $sql   = "SELECT * FROM hris_employee_list_tbl WHERE employeeID = $employeeID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function titleCase($str) {
        $result  = "";
        $str     = str_replace("Ñ", "", $str);
        $arr     = array();
        $pattern = '/([;:,-.\/ X])/';
        $array   = preg_split($pattern, $str, -1, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);

        foreach($array as $k => $v)
            $result .= ucwords(strtolower($v));
        return $result;
	}

    public function getMilestoneBuilder($milestoneBuilderID = 0)
    {
        $sql = "SELECT phaseDescription FROM pms_milestone_builder_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row()->phaseDescription : "";
    }

    public function getMilestoneList($milestoneBuilderID = 0)
    {
        $sql = "SELECT projectMilestoneName AS milestoneName FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTask($timelineBuilderID = 0, $milestoneBuilderID = 0)
    {
        $sql = "
        SELECT 
            taskName,
            allottedHours,
            taskStartDate,
            taskEndDate,
            taskRemarks
        FROM 
            pms_timeline_task_list_tbl 
        WHERE 
            timelineBuilderID = $timelineBuilderID AND 
            milestoneBuilderID = $milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getTimelineTasks($timelineBuilderID = 0)
    {
        $sql = "SELECT * FROM pms_timeline_task_list_tbl WHERE timelineBuilderID = $timelineBuilderID GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];
        $data = [];
        foreach ($result as $res) {
            $milestoneBuilderID = $res["milestoneBuilderID"];
            $temp = [
                "phaseName"  => $this->getMilestoneBuilder($milestoneBuilderID),
                "milestones" => $this->getMilestoneList($milestoneBuilderID),
                "tasks"      => $this->getTask($timelineBuilderID, $milestoneBuilderID)
            ];
            array_push($data, $temp);
        }
        return $data;
    }

    public function getTimelineContent($timelineBuilderID = 1)
    {
        $output = [];
        $timelineHeader = $this->getTimelineData($timelineBuilderID);
        if ($timelineHeader) {
            $clientUnitNumber  = $timelineHeader->clientUnitNumber ?? "";
            $clientHouseNumber = $timelineHeader->clientHouseNumber ?? "";
            $clientBarangay    = $timelineHeader->clientBarangay ?? "";
            $clientCity        = $timelineHeader->clientCity ?? "";
            $clientProvince    = $timelineHeader->clientProvince ?? "";
            $clientCountry     = $timelineHeader->clientCountry ?? "";
            $clientPostalCode  = $timelineHeader->clientPostalCode ?? "";
            $address = $this->titleCase($clientUnitNumber).", ".$this->titleCase($clientHouseNumber).", ".$this->titleCase($clientCity).", ".$this->titleCase($clientBarangay).", ".$this->titleCase($clientProvince).", ".$this->titleCase($clientCountry)." ".$clientPostalCode;

            $pmData = $this->getEmployeeInformation($timelineHeader->projectManager);
            $projectManager = $pmData ? $pmData->employeeFirstname." ".$pmData->employeeLastname : "";

            $tlData = $this->getEmployeeInformation($timelineHeader->teamLeader);
            $teamLeader = $tlData ? $tlData->employeeFirstname." ".$tlData->employeeLastname : "";

            $teamMember = "";
            $tempTeamMember = explode("|", $timelineHeader->teamMember);
            foreach ($tempTeamMember as $key => $member) {
                $tmData = $this->getEmployeeInformation($member);
                $comma = $key == count($tempTeamMember) - 1 ? "" : ", &nbsp;";
                $teamMember .= $tmData ? $tmData->employeeFirstname." ".$tmData->employeeLastname.$comma : "";
            }

            $output["timelineBuilderID"]   = $timelineHeader->timelineBuilderID;
            $output["budgetStatus"]        = $timelineHeader->budgetStatus;
            $output["createdAt"]           = date("M d, Y h:i:s A", strtotime($timelineHeader->ptbtCreatedAt));
            $output["submittedAt"]         = date("M d, Y h:i:s A", strtotime($timelineHeader->submittedAt));
            $output["approversID"]         = $timelineHeader->approversID;
            $output["approversDate"]       = $timelineHeader->approversDate;
            $output["approversStatus"]     = $timelineHeader->approversStatus;
            $output["timelineBuilderStatus"]  = $timelineHeader->timelineBuilderStatus;
            $output["timelineBuilderRemarks"] = $timelineHeader->timelineBuilderRemarks;
            $output["preparedBy"]          = $timelineHeader->preparedBy;
            $output["departmentName"]      = $timelineHeader->departmentName;
            $output["designationName"]     = $timelineHeader->designationName;
            $output["timelineDescription"] = $timelineHeader->timelineBuilderReason;
            $output["projectCode"]         = $timelineHeader->projectCode;
            $output["projectName"]         = $timelineHeader->projectName;
            $output["projectCategory"]     = $timelineHeader->projectCategory;
            $output["clientName"]          = $timelineHeader->clientName;
            $output["clientAddress"]       = $address;
            $output["timelineDate"]        = date("M d, Y", strtotime($timelineHeader->timelineStartDate))." - ".date("M d, Y", strtotime($timelineHeader->timelineEndDate));
            $output["timelinePriority"]    = $timelineHeader->timelinePriority;
            $output["timelineIssued"]      = $timelineHeader->timelineIssued;
            $output["proposedBudget"]      = $timelineHeader->proposedBudget;
            $output["allocatedBudget"]     = $timelineHeader->allocatedBudget;
            $output["projectManager"]      = $projectManager;
            $output["teamLeader"]          = $teamLeader;
            $output["teamMember"]          = $teamMember;
            $output["phases"] = $this->getTimelineTasks($timelineBuilderID);
        }
        return $output;
    }
    // ----- END GET TIMELINE CONTENT -----

}


