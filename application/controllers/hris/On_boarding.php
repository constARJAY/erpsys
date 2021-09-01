<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class On_boarding extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Onboarding_model", "onboarding");
        isAllowed(107);
        isReadAllowed(107);
    }

    public function index()
    {
        $data["title"] = "Onboarding Module";
       // $this->employeemodule->updateLeaveCredit();
        $this->load->view("template/header", $data);
        $this->load->view("hris/on_boarding/index");
        $this->load->view("template/footer");
    }
   public function updaterecord()
   {
    $employeeID       = $this->input->post("id");
    $approvalEmployeeID   = $this->input->post("OnboardingEmployeeID");
    $onboardingDate   = $this->input->post("onboardingDate");
    $OnboardingStatus   = $this->input->post("OnboardingStatus");
    $designationID   = $this->input->post("designationID");
    $countapprovar   = $this->input->post("countapprovar");
    $onboardingData = $this->onboarding->updateOnboarding($employeeID, $approvalEmployeeID,$onboardingDate, $OnboardingStatus, $designationID, $countapprovar);
    $result = explode("|", $onboardingData);
    if ($result[0] == "true") {
        $this->session->set_flashdata('success', $result[1]);
    }
    echo json_encode($onboardingData);

   }
}
