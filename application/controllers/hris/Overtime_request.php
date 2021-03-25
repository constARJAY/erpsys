<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Overtime_request extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(56);
    }

    public function index(){
        $data["title"] = "Overtime Request";
        $this->load->view("template/header",$data);
        $this->load->view("hris/overtime_request/index");
        $this->load->view("template/footer");
    }
}    