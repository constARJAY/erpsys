<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Orientation_setup extends CI_Controller {

    public function __construct(){
        parent::__construct();
        //$this->load->model("Operations_model", "operations");
        $this->load->model("hris/OrientationSetup_model", "orientationsetup");
        isAllowed(102);
    }

    public function index(){
        $data["title"]              = "Orientation Setup";
        $this->load->view("template/header", $data);
        $this->load->view("hris/orientation_setup/index");
        $this->load->view("template/footer");
    }
    public function insertrecord()
    {
        $employeeID = $this->input->post("employeeID");
        $designationID = $this->input->post("designationID");
        $orientationName = $this->input->post("OrientationName");
        $employeeDesignationID = $this->input->post("employeeDesignationID");
        $addorientationsetupdata = $this->orientationsetup->addorientationsetup($designationID, $employeeID,$orientationName, $employeeDesignationID);
        $result = explode("|", $addorientationsetupdata);
        if ($result[0] == "true") {
            $this->session->set_flashdata('success', $result[1]);
        }
        echo json_encode($addorientationsetupdata);

    }

    public function updaterecord(){
        $employeeID = $this->input->post("employeeID");
        $designationID = $this->input->post("designationID");
        $orientationName = $this->input->post("OrientationName");
        $employeeDesignationID = $this->input->post("employeeDesignationID");
        $orientationsetupdata = $this->orientationsetup->updateorientationsetup($designationID, $employeeID,$orientationName, $employeeDesignationID);
        $result = explode("|", $orientationsetupdata);
        if ($result[0] == "true") {
            $this->session->set_flashdata('success', $result[1]);
        }
        echo json_encode($orientationsetupdata);
    }
}

/* End of file Branch.php */
?>