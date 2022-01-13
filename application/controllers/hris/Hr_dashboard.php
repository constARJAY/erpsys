<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hr_dashboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(70);
    }

    public function index()
    {
        $data["title"] = "HR Dashboard";
        $this->load->view("template/header", $data);
        $this->load->view("hris/hr_dashboard/index");
        $this->load->view("template/footer");
    }

    public function getOverbreakData(){
        $getOverBreakData = getBreakOpposeData();
        echo json_encode($getOverBreakData);
    }
}