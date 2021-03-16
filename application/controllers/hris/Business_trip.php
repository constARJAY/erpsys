<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Business_trip extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Business Trip Request";
        $this->load->view("template/header",$data);
        $this->load->view("hris/business_trip/index");
        $this->load->view("template/footer");
    }
}    