<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Holiday extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(20);
    }

    public function index(){
        $data["title"]              = "Holiday Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/holiday/index");
        $this->load->view("template/footer");
    }

}
