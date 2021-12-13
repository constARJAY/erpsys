<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_dashboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(67);
    }

    public function index()
    {
        $data["title"] = "Inventory Dashboard";

        $this->load->view("template/header", $data);
        $this->load->view("ims/inventory_dashboard/index");
        $this->load->view("template/footer");
    }

}