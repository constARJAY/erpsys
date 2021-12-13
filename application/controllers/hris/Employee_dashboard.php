<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_dashboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(88);
    }

    public function index()
    {
        $data["title"] = "Employee Dashboard";

        $this->load->view("template/header", $data);
        $this->load->view("hris/employee_dashboard/index");
        $this->load->view("template/footer");
    }

}