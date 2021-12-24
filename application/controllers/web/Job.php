<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Job extends CI_Controller {

    public function __construct()
    {
        // STATUS:
        // 0 = PENDING
        // 1 = FOR REVIEW
        // 2 = WAITLISTED
        // 3 = CANCELLED
        // 4 = PASSED
        // 5 = FAILED
        // 6 = RE-EVALUATE

        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function details($jobID)
    {
        if(!$this->session->has_userdata('session_applicant_id')) redirect(base_url("web/login"));

        $applicantID = $this->session->userdata('session_applicant_id');
        $pending = $this->operations->getTableData("web_applicant_job_tbl", "appJobID", "(appJobStatus!= '0' OR appJobStatus != '1' OR appJobStatus != '2' OR appJobStatus != '6') AND applicantID='$applicantID' limit 1");
        
        $data["title"]              = "Job Details";
        $data["jobID"]              = $jobID;
        // $data["pending"]  = "0";

        $data["pending"]  = count($pending);

        $this->load->view("template/header", $data);
        $this->load->view("web/job/index", $data);
        $this->load->view("template/footer");
    }

    public function apply(){
        $data["applicantID"]  = $this->input->post("applicantID");
        $data["jobID"]        = $this->input->post("jobID");
        $applicantID          = $this->input->post("applicantID");
        $designationID        = $this->input->post("designationID");

        $query = $this->db->insert('web_applicant_job_tbl', $data);
        
        if($designationID){
            $this->db->update('web_applicant_list_tbl', ["applicantDesignationID"=> $designationID], ["applicantID" => $applicantID]);
        }

        echo json_encode('success');
        exit;
    }
    
}

?>