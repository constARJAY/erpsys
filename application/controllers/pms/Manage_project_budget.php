<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Manage_project_budget extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/ManageProjectBudget_model", "manageprojectbudget");
        isAllowed(91);
    }

    public function index()
    {
        $data["title"] = "Manage Project Budget";

        $this->load->view("template/header",$data);
        $this->load->view("pms/manage_project_budget/index");
        $this->load->view("template/footer");
    }

    public function getTimelineData() 
    {
        echo json_encode($this->manageprojectbudget->getTimelineData(1));
    }

    public function getTimelineContent()
    {
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        echo json_encode($this->manageprojectbudget->getTimelineContent($timelineBuilderID));
    }

    public function saveProjectBudget()
    {
        // echo "<pre>";
        // print_r($_POST);
        // exit;

        $timelineBuilderID = $this->input->post("timelineBuilderID");
        $proposedBudget   = $this->input->post("proposedBudget");
        $allocatedBudget   = $this->input->post("allocatedBudget");

        if($proposedBudget <= $allocatedBudget){
            $budgetStatus = 1;
        }else{
            $budgetStatus =2;
        }
        echo json_encode($this->manageprojectbudget->saveProjectBudget($timelineBuilderID, $allocatedBudget,$budgetStatus));
    }

}