<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_storage extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Leave Request";
        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_storage/index");
        $this->load->view("template/footer");
    }



}    