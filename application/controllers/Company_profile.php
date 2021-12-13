<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company_profile extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        // isAllowed(144);
    }

    public function index()
    {
        $data["title"] = "Company Profile";
        $this->load->view('template/header', $data);
        $this->load->view('gen/company_profile/index', $data);
        $this->load->view('template/footer', $data);
    }


}
