<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leaves extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Leave_model", "leave_model");
    }

    public function index()
    {
        $data["title"] = "Leave Request";

        $this->load->view("template/header",$data);
        $this->load->view("hris/leaves/index");
        $this->load->view("template/footer");
    }
}    