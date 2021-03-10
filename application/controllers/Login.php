<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        // $this->load->model("Login_model", "Login_model");
    }

    public function index(){
        // $data["title"] = "Login | ".$this->db->getTableData("company_setup_tbl", "companyName", "", "");
        $data["title"] = "Login";
        $this->load->view("gen/login/index", $data);
    }

    public function set_session(){
        $userType       =   $this->input->post("userType");
        $sessionID      =   $this->input->post("userAccountID");
        $sessionName    =   $userType == 1 ? "adminSessionID" : "otherSessionID";
        $this->session->set_userdata($sessionName, $sessionID); 
        echo json_encode(true);
    }

    public function sign_out(){
        $condition      =   $this->input->post("userType");
        $sessionName    =   $condition == "1" ? "adminSessionID" : "otherSessionID";
        $this->session->sess_destroy($sessionName);
		echo json_encode(true);
    }

  
    

    

    

}