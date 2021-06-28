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

}


