<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_storage extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(7);
    }

    public function index()
    {
        $data["title"] = "Inventory Storage";
        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_storage/index");
        $this->load->view("template/footer");
    }



}    