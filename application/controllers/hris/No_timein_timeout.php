<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class No_timein_timeout extends CI_Controller {

    public function __construct() {
        parent::__construct();
        isAllowed(57);
    }

    public function index()
    {
        $data["title"] = "No Time-In/Time-out Reqeust";
        $this->load->view("template/header", $data);
        $this->load->view("hris/no_timein_timeout/index");
        $this->load->view("template/footer");
    }

}
