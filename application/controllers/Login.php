<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        $this->load->model("hris/EmployeeAttendance_model", "employeeattendance");
    }

    public function index(){
        
        $syncEmployee   = $this->employeeattendance->syncEmployeeToBiotime();
        $syncAttendance = $this->employeeattendance->syncEmployeeAttendance();

        $data["title"] = "Login";
        $this->load->view("gen/login/index", $data);
    }

    public function set_session(){
        $userType       =   $this->input->post("userType");
        $sessionID      =   $this->input->post("userAccountID");
        $sessionName    =   $userType == 1 ? "adminSessionID" : "otherSessionID";
        $url            = base_url("hris/employee_dashboard");
        if ($this->session->set_userdata($sessionName, $sessionID)) {
            insertAudit("login");
            $url = $this->session->has_userdata("request_url") ? $this->session->userdata("request_url") : $url;
        }
        insertAudit("login");
        echo json_encode($url);
    }

    public function sign_out(){
        insertAudit("logout");
        $condition      = $this->input->post("userType") == "" ? "1" : "2";
        $sessionName    = $condition == "1" ? "adminSessionID" : "otherSessionID";
        $this->session->sess_destroy($sessionName);
        redirect(base_url("login"));
    }

}