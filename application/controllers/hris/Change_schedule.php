<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Change_schedule extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(60);
    }

    public function index($id = "")
    {
        $data["title"] = "Change Schedule Form";
        $this->load->view("template/header", $data);
        $this->load->view("hris/change_schedule/index");
        $this->load->view("template/footer");
    }

}
