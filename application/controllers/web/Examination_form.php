<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Examination_form extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('web/ExaminationForm_model', "examinationForm");
    }

    public function index()
    {
        $data["title"] = "Examination Form";

        $this->encryption->initialize(
            array(
                    'cipher' => 'aes-256',
                    'mode'   => 'ctr',
                    'key'    => '<a 32-character random string>'
            )
        );

        $this->encryption->initialize(array('driver' => 'mcrypt'));
        
        $code = $this->input->get('id');

        //  generate encrypted url parameter
        // $code = '2|1|2021-11-02'; // applicantID|DesignationID|ExamDate

        // $url = $this->encryption->encrypt(str_replace("slash","/","$code"));

        // echo $url;
        // exit;

        // end  generate encrypted url parameter

        //  decode encrypted url parameter
        // $code ="c90fc36ab1ff5e4db0e9bce71bc4bf44e74a254864b5dc455f0e935b9f3d4778c73da9e9145cf0285d71d9553295cf5039d1c8da7fd13658e7d30c4e9add8b5dlKo9o4rgijZDSgbEvMmGjne2PXpEQa7VpuSeuA==";

        $url = $this->encryption->decrypt(str_replace("slash","/","$code"));
        // end  decode encrypted url parameter

       

        $split =  explode("|",$url);

        $applicantID = $split[0];
        $designationID = $split[1];
        $applicantSchedule = $split[2];
        $data['applicantID']= $applicantID;
        $data['designationID'] = $designationID;
        $data['applicantSchedule'] = $applicantSchedule;
        // $data['applicantSchedule'] = "2021-08-03";
      

        $this->load->view('template/header', $data);
        $this->load->view('web/examination_form/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function saveExam(){
        // echo "<pre>";
        // print_r($_POST);
        // exit;

        $applicantID = $this->input->post("applicantID");
        $applicantAnswer = $this->input->post("applicantAnswer");
        $examinationQAID = $this->input->post("examinationQAID");
        $getPoints = $this->input->post("getPoints");
        $totalPoints = $this->input->post("totalPoints");
        $percent = $this->input->post("percent");

        // print_r($applicantAnswer);
        // exit;

              
        $saveExam = $this->examinationForm->saveExam($applicantID, $applicantAnswer, $examinationQAID,$getPoints,$totalPoints,$percent);
        echo json_encode($saveExam);
    }

    public function updateApplicationExamStatus(){
        $applicantID = $this->input->post("applicantID");
        $examStatus = $this->input->post("examStatus");

         $data = array(
            'examStatus' => $examStatus
        );
    
    
        $updateApplicant = $this->examinationForm->updateApplicationExamStatus($data,$applicantID);
        echo json_encode($updateApplicant);
    }
}
