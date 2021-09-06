<?php 
defined('BASEPATH') OR exit('No direct script access allowed');
class Inventory_report extends CI_Controller{
 
    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryReport_model", "bidrecap");
        isAllowed(66);

    }
    public function index()
    {
        $data["title"] = "Inventory Report";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_report/index");
        $this->load->view("template/footer");

    }
    

}