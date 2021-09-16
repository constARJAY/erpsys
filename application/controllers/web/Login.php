<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("web/Applicant_model", "applicant");
    }

    public function index()
    {
        if($this->session->has_userdata('session_applicant_id')) {
            redirect(base_url("web/applicant"));
        }else{
            $data["title"] = "Login";
            $this->load->view('template/header', $data);
            $this->load->view('web/login/index', $data);
            $this->load->view('template/footer', $data);
        }
    }

    public function set_session(){
        $session_applicant_id = $this->input->post("applicantID");
        $this->session->set_userdata('session_applicant_id', $session_applicant_id);
    }

    public function logout(){
        $this->session->unset_userdata('session_applicant_id');
        echo json_encode("success");
    }
}

?>