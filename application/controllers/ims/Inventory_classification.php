<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_classification extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(6);
    }

    public function index(){
        // $data["title"] = "Login | ".$this->db->getTableData("company_setup_tbl", "companyName", "", "");
        $data["title"]              = "Inventory Classification";
        $this->load->view("template/header", $data);
        $this->load->view("ims/inventory_classification/index");
        $this->load->view("template/footer");
    }

}
