<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class Applicant_list extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("web/Applicant_model", "applicant");
        isAllowed(106);
    }

    public function index(){
        $data["title"] = "Applicant List";
        $this->load->view("template/header", $data);
        $this->load->view("hris/applicant_list/index");
        $this->load->view("template/footer");
    }

    public function applicantInterviewer(){
        // print_r($_POST);
        $applicantInterviewerData   = $this->input->post("applicantInterviewerData");
        $parentApplicantID;
        if($applicantInterviewerData){
            $applicantInterviewer = [];

            foreach ($applicantInterviewerData as $index => $applicantInterviewerData) {
                $applicantID            = $applicantInterviewerData["applicantID"];
                $applicantInterviewerID = $applicantInterviewerData["applicantInterviewerID"];
                $parentApplicantID      = $applicantID;

                $temp = [
                    "applicantID"                       =>  $applicantID,
                    "applicantInterviewerProgression"   =>  $applicantInterviewerData["applicantInterviewerProgression"],
                    "employeeID"                        =>  $applicantInterviewerData["employeeID"],
                    "personInCharge"                    =>  $applicantInterviewerData["personInCharge"],
                    "applicantInterviewerDateTime"      =>  $applicantInterviewerData["applicantInterviewerDateTime"],
                    "applicantInterviewerStatus"        =>  $applicantInterviewerData["applicantInterviewerStatus"],
                ];

                array_push($applicantInterviewer, $temp);
            }
            $saveApplicantInterviewer  = $this->applicant->saveApplicantInterviewer($applicantInterviewer, $applicantID);
            $result                    = $saveApplicantInterviewer ? $this->applicant->getTableData("hris_applicant_interviewer_tbl","applicantID = '$parentApplicantID' ") : false;
            echo json_encode($result);
        }

    }

    public function updateApplicantInterviewer(){
        $applicantInterviewerID     = $this->input->post("applicantInterviewerID");
        $interviewerNote            = $this->input->post("interviewerNote");
        $applicantInterviewerStatus = $this->input->post("applicantInterviewerStatus");
        
        $data   = [ "applicantInterviewerNote"     =>  $interviewerNote,
                    "applicantInterviewerStatus"   =>  $applicantInterviewerStatus];
        $saveApplicantInterviewer  = $this->applicant->updateApplicantInterviewer($data, $applicantInterviewerID);
        $result                    = $saveApplicantInterviewer ? $this->applicant->getTableData("hris_applicant_interviewer_tbl","applicantInterviewerID = '$applicantInterviewerID' ") : false;
        echo json_encode($result);
    }

    public function generateExamUrl(){
        //  generate encrypted url parameter
        // $code = '2|1|2021-11-02';

        // $url = $this->encryption->encrypt(str_replace("slash","/","$code"));

        // echo $url;
        // exit;

        // end  generate encrypted url parameter

        //  decode encrypted url parameter
        // $code ="c90fc36ab1ff5e4db0e9bce71bc4bf44e74a254864b5dc455f0e935b9f3d4778c73da9e9145cf0285d71d9553295cf5039d1c8da7fd13658e7d30c4e9add8b5dlKo9o4rgijZDSgbEvMmGjne2PXpEQa7VpuSeuA==";
        //"web/examination_form?id=$code"; 
    }

}


/* End of file Code_conduct_category.php */

?>