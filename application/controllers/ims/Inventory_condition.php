<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_condition extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "Inventory Conditions Masterfile";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_condition/index");
        $this->load->view("template/footer");
    }

}
?>