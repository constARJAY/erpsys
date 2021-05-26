<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        isAllowed(18);
    }

    public function index()
    {
        $data["title"] = "Service Masterfile";

        $this->load->view("template/header",$data);
        $this->load->view("ims/service/index");
        $this->load->view("template/footer");
    }
}
?>