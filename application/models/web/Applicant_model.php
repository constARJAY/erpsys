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

    public function getTableData($table = null, $where = null, $isRow = false){
        $sql        = "SELECT * FROM $table WHERE $where";
        $query      = $this->db->query($sql);
        $isArray    = !$isRow ? $query->result_array() : $query->row() ;
        return $query ? $isArray : [];
    }

    public function getProfileData($applicantID){

        $profileData = [
            "dependent"     => $this->getTableData("web_applicant_dependent_tbl",                   "applicantID = $applicantID"),
            "employment"    => $this->getTableData("web_applicant_employment_history_tbl",          "applicantID = $applicantID"),
            "education"     => $this->getTableData("web_application_educational_attainment_tbl",    "applicantID = $applicantID"),
            "organization"  => $this->getTableData("web_applicant_organization_join_tbl",           "applicantID = $applicantID"),
            "exam"          => $this->getTableData("web_application_exam_taken_tbl",                "applicantID = $applicantID"),
            "seminar"       => $this->getTableData("web_application_seminar_taken_tbl",             "applicantID = $applicantID"),
            "characterRef"  => $this->getTableData("web_application_character_reference_tbl",       "applicantID = $applicantID")
        ];

        $temp = $this->getTableData("web_applicant_list_tbl","applicantID = $applicantID", true);
        array_push($profileData, $temp);

        return $profileData ? $profileData : [] ;
    }

    public function insertBatch($table = null, $data = false, $applicantID = null){
        if($data){
            $this->db->delete($table, ["applicantID" => $applicantID]);
        }
        
        $query = $this->db->insert_batch($table, $data);
    }



    // THIS MODELS IS FOR APPLICANT LIST;
    public function updateApplicantInterviewer($data, $applicantInterviewerID){
        $query  = $this->db->update("hris_applicant_interviewer_tbl", $data, ["applicantInterviewerID" => $applicantInterviewerID] );
        $result = $query ? $this->getTableData("hris_applicant_interviewer_tbl","applicantInterviewerID = '$applicantInterviewerID' ", true) : "";   
        return $query ? true : false;
    }

    public function deleteApplicantInterviewer($id){
        $table      = "hris_applicant_interviewer_tbl";
        $whereParam = ["applicantID" => $id ]; 
        $query = $this->db->delete($table, $whereParam);
    }
    public function saveApplicantInterviewer($data = [], $id) {
        $applicantID = $id;
        if($id){
            $this->deleteApplicantInterviewer($id);
        }
        $query          = $this->db->insert_batch("hris_applicant_interviewer_tbl", $data);
        return $query ? "true|Success|$applicantID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
    }

}