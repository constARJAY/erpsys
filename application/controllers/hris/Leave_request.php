<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leave_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(55);
    }

    public function index()
    {
        $data["title"] = "Leave Request Form";
        $this->load->view("template/header",$data);
        $this->load->view("hris/leave_request/index");
        $this->load->view("template/footer");
    }
}    