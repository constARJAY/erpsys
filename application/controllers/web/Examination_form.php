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
        
        // $code = $this->input->get('id');

        $code ="bf2fc628644267ec4a51a3956514f384227636a9c100db345f7979bb4ea0f86668cc025a32b52af3d565dde7e4f3f59600936dd80aef234d4c066630d4784616fqahFKXJVsTHmgNNnSYS+3lH8XmCGOyNGJurhg==";

        $url = $this->encryption->decrypt(str_replace("slash","/","$code"));

       

        $split =  explode("|",$url);

        $applicantID = $split[0];
        $applicantSchedule = $split[1];
        $data['applicantID']= $applicantID;
        // $data['applicantSchedule'] = $applicantSchedule;
        $data['applicantSchedule'] = "2021-08-03";
      

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
