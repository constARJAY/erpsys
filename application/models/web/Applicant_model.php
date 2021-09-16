<?php

class Applicant_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
    }

    public function saveApplicantData($data = [], $action = null, $id = null) {
        $applicantID = $id;
        if ($action == "insert") {
            $query          = $this->db->insert("web_applicant_list_tbl", $data);
            $applicantID    = $this->db->insert_id();
        } else if ($action == "update") {
            $query = $this->db->update("web_applicant_list_tbl", $data, ["applicantID" => $id]);
        }
        return $query ? "true|Success|$applicantID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
    }

    public function activate($applicantID){
        $data = ["applicantStatus" => 1];

        $querySelect = $this->db->query("SELECT applicantID FROM web_applicant_list_tbl WHERE applicantID=".$applicantID." and applicantStatus=1");

        if($querySelect->num_rows() > 0){
            return "failed";
        }else{
            $query = $this->db->update("web_applicant_list_tbl", $data, ["applicantID" => $applicantID,
                                                                         "applicantStatus" => 0]);

            if($this->db->affected_rows()==1){
                return "success";
            }else{
                return "failed";
            }
        }
    }

    public function checkEmail($applicantEmail) {

        $query = $this->db->query("SELECT applicantID FROM web_applicant_list_tbl WHERE applicantEmail='".$applicantEmail."'");

        if($query->num_rows() > 0){
            return "false|A user with this email address already exists. Please try a different email address to register.";
        }else{
            return "true";
        }
    }
}