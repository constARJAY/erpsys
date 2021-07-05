<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class SignOff_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getDeliverables($signOffID = 0)
    {
        $sql   = "SELECT * FROM pms_sign_off_details_tbl WHERE signOffID = $signOffID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getSignOffContent($signOffID = 0)
    {
        $sql   = "SELECT * FROM pms_sign_off_tbl WHERE signOffID = $signOffID";
        $query = $this->db->query($sql);
        $result  = $query ? $query->result_array() : [];
        $result[0]["deliverables"] = $this->getDeliverables($signOffID);
        return $result;
    }

    public function deleteDeliverables($signOffID = 0)
    {
        $query = $this->db->delete("pms_sign_off_details_tbl", ["signOffID" => $signOffID]);
        return $query ? true : false;
    }

    public function saveSignOffData($action = "save", $data = [], $id = 0)
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_sign_off_tbl", $data);
        } else {
            $where = ["signOffID" => $id];
            $query = $this->db->update("pms_sign_off_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveDeliverables($data = [])
    {
        $query = $this->db->insert_batch("pms_sign_off_details_tbl", $data);
        return $query ? true : false;
    }

    public function getCountPhases($timelineBuilderID = 0, $milestoneBuilderID = 0)
    {
        $sql   = "SELECT COUNT(*) AS count FROM pms_employeetaskoard_tbl WHERE timelineBuilderID = $timelineBuilderID AND milestoneBuilderID = $milestoneBuilderID AND taskStatus = 7";
        $query = $this->db->query($sql);
        return $query ? $query->row() ? $query->row()->count : 0 : 0;
    }

    public function getCountMilestones($milestoneBuilderID = 0)
    {
        $sql   = "SELECT COUNT(*) AS count FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() ? $query->row()->count : 0 : 0;
    }

    public function getTimelinePhases($timelineBuilderID = 0)
    {
        $sql = "
        SELECT
            pttlt.milestoneBuilderID,
            pmbt.phaseDescription,
            pmbt.phaseCode,
            COUNT(pttlt.taskID) AS count
        FROM
            pms_timeline_task_list_tbl AS pttlt
            LEFT JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID)
        WHERE timelineBuilderID = $timelineBuilderID
        GROUP BY pttlt.milestoneBuilderID";
        $query  = $this->db->query($sql);
        $phases = $query ? $query->result_array() : [];

        $output = [];
        foreach ($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $phaseDescription   = $phase["phaseDescription"];
            $phaseCode          = $phase["phaseCode"];
            $count              = $phase["count"] ?? 0;

            $countMilestones = $this->getCountMilestones($milestoneBuilderID) * $count;
            $countPhases     = $this->getCountPhases($timelineBuilderID, $milestoneBuilderID);

            if ($countMilestones > 0 && $countPhases >  0 && $countMilestones == $countPhases) {
                $temp = [
                    "milestoneBuilderID" => $milestoneBuilderID,
                    "phaseCode"          => $phaseCode,
                    "phaseDescription"   => $phaseDescription,
                ];
                array_push($output, $temp);
            }
        }
        return $output;
    }

}


