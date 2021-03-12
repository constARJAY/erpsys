<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loan extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function index(){
        $data["title"]              = "Loan Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/loan/index");
        $this->load->view("template/footer");
    }

}
