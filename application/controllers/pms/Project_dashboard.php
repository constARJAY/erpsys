<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_dashboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(68);
    }

    public function index()
    {
        $data["title"] = "Project Dashboard";

        $this->load->view("template/header", $data);
        $this->load->view("pms/project_dashboard/index");
        $this->load->view("template/footer");
    }

}