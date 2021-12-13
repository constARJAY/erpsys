<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Finance_dashboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(69);
    }

    public function index()
    {
        $data["title"] = "Finance Dashboard";

        $this->load->view("template/header", $data);
        $this->load->view("fms/finance_dashboard/index");
        $this->load->view("template/footer");
    }

}