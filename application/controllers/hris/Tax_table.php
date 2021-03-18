<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tax_table extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Tax Table";
        $this->load->view('template/header', $data);
        $this->load->view('hris/tax_table/index', $data);
        $this->load->view('template/footer', $data);
    }

}
