<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leave extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(21);
    }

    public function index(){
        $data["title"]              = "Leave Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/leave/index");
        $this->load->view("template/footer");
    }

}
