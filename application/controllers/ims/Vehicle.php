<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Vehicle extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        isAllowed(135);
    }

    public function index()
    {
        $data["title"] = "Vehicle Mastefile";

        $this->load->view("template/header",$data);
        $this->load->view("ims/vehicle/index");
        $this->load->view("template/footer");
    }

   
}
?>