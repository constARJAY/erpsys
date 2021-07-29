<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Examination_setup extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("hris/ExaminationSetup_model", "examinationsetup");
        isAllowed(105);
    }

    public function index(){
        $data["title"]              = "Examination Setup";
        $this->load->view("template/header", $data);
        $this->load->view("hris/examination_setup/index");
        $this->load->view("template/footer");
    }

    public function updaterecord(){
        

        $exams                   = $this->input->post("exams") ?? null;
        $designationID                  = "";
       

        if ($exams) {
            $examinationSetupData = [];
           
            foreach($exams as $index => $exam) {
               
                $temp = [

                    "examinationID"            => $exam["examinationID"] != "null" ? $exam["examinationID"] : null,
                    "designationID"            => $exam["designationID"] != "null" ? $exam["designationID"] : null,
                    "timeLimit"          => $exam["timeLimit"],
                    "percentage"          => $exam["percentage"],
                ];
                array_push($examinationSetupData, $temp);
                $designationID   = $exam["designationID"];
            }

            $updateExaminationSetupData = $this->examinationsetup->updateExaminationSetupData($examinationSetupData, $designationID);
        }
        echo json_encode($updateExaminationSetupData);
    }

   
}

/* End of file Branch.php */
?>