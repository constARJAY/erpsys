<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Billing_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(99);
    }

    public function index()
    {
        $data["title"] = "Billing Module";

        $this->load->view("template/header",$data);
        $this->load->view("fms/billing_module/index");
        $this->load->view("template/footer");
    }

}