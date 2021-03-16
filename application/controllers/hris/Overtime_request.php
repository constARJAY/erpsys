<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Overtime_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Leave Request";
        $this->load->view("template/header",$data);
        $this->load->view("hris/overtime_request/index");
        $this->load->view("template/footer");
    }
}    