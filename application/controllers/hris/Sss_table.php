<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sss_table extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(28);
    }

    public function index()
    {
        $data["title"] = "SSS Table";
        $this->load->view('template/header', $data);
        $this->load->view('hris/sss_table/index', $data);
        $this->load->view('template/footer', $data);
    }

}
