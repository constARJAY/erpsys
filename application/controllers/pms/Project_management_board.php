<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_management_board extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(92);
    }

    public function index()
    {
        $data["title"] = "Project Management Board";

        $this->load->view("template/header",$data);
        $this->load->view("pms/project_management_board/index");
        $this->load->view("template/footer");
    }

}