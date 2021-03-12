<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Schedule_setup extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Schedule Setup";
        $this->load->view('template/header', $data);
        $this->load->view('hris/schedule_setup/index', $data);
        $this->load->view('template/footer', $data);
    }

}
