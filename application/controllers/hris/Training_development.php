<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Training_development extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        isAllowed(31);
    }
    public function index()
    {
        $data["title"] = "Training Development";

        $this->load->view("template/header",$data);
        $this->load->view("hris/training_development/index");
        $this->load->view("template/footer");
    }


}    