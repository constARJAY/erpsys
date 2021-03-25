<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_vendor extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        isAllowed(8);
    }

    public function index()
    {
        $data["title"] = "Inventory Vendor Masterfile";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_vendor/index");
        $this->load->view("template/footer");
    }

}
?>