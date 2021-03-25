<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Official_business extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(58);
    }

    public function index()
    {
        $data["title"] = "Official Business Form";
        $this->load->view("template/header", $data);
        $this->load->view("hris/official_business/index");
        $this->load->view("template/footer");
    }

}
