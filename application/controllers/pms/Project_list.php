<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_list extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Project List Masterfile";

        $this->load->view("template/header",$data);
        $this->load->view("pms/project_list/index");
        $this->load->view("template/footer");
    }

}
?>