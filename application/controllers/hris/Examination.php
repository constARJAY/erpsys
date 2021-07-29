<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Examination extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Examination_model", "examination");
        isAllowed(27);
    }

    public function index()
    {
        $data["title"] = "Examination Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/examination/index");
        $this->load->view("template/footer");
    }

    public function getExamQuestionsData()
    {
        $examinationID   = $this->input->post("examinationID");
        $examinationType = $this->input->post("examinationType");
        echo json_encode($this->examination->getExamQuestionsData($examinationID, $examinationType));
    }

    public function saveExamination()
    {
        $examinationID   = $this->input->post("examinationID");
        $examinationType = $this->input->post("examinationType");
        $examinationName = $this->input->post("examinationName");
        $totalPoints     = $this->input->post("totalPoints");
        $questions       = $this->input->post("questions");
        echo json_encode($this->examination->saveExamination($examinationID, $examinationName, $examinationType, $totalPoints, $questions));
    }

}

