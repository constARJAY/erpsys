<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loan_type extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
		isAllowed(22);
    }

    public function index(){
        $data["title"]              = "Loan Type Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/loan/index");
        $this->load->view("template/footer");
    }

}
