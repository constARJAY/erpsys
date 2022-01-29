<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class Applicant_list extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("web/Applicant_model", "applicant");
        isAllowed(106);
        $this->encryption->initialize(
            array(
                    'cipher' => 'aes-256',
                    'mode'   => 'ctr',
                    'key'    => '<a 3-character A-Z a-z string>'
            )
        );

        $this->encryption->initialize(array('driver' => 'mcrypt'));
        
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
        // applicantID|DesignationID|ExamDate
        $applicantID    = $this->input->post("applicantID");
        $designationID  = $this->input->post("designationID");    
        $examDate       = $this->input->post("examDate");
        
        $code   =   $applicantID."|".$designationID."|".$examDate;

        $url = $this->encryption->encrypt(str_replace("slash","/",$code));
        while (strpos($url, "+")) {
            $url = $this->encryption->encrypt(str_replace("slash","/",$code));
        }

        echo json_encode($url);
    }

    public function saveOnBoarding(){
        $hasProgress        = $this->input->post("hasProgress");
        $orientationData    = $this->input->post("orientationData");
        $applicantID        = $this->input->post("applicantID");
        $progressionID      = $this->input->post("progressionID") ?? false;
        if($orientationData){
            $progressionData = [];
            foreach ($orientationData as $key => $row) {
                $employeeID         = $row["employeeID"];
                $employeeName       = $row["employeeName"];
                $applicantID        = $row["applicantID"];
                $orientationName    = $row["orientationName"];
                $orientationDate    = $row["orientationDate"];
                $orientationStatus  = $row["orientationStatus"];

                $temp = [
                    "employeeID"         => $employeeID,
                    "employeeName"       => $employeeName,
                    "applicantID"        => $applicantID,
                    "orientationName"    => $orientationName,
                    "orientationDate"    => $orientationDate,
                    "orientationStatus"  => $orientationStatus
                ];
                array_push($progressionData, $temp);
            }

            $result = $this->applicant->saveOnBoarding($applicantID, $progressionData, $progressionID);
            echo json_encode($result);
        }
    }
}


/* End of file Code_conduct_category.php */

?>