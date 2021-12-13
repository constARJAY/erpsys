<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Audit_trail extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        // isAllowed(144);
    }


    public function index(){
        $data["title"]          = "Audit Trail";
        $data["module_list"]    = $this->operations->getTableData("gen_module_list_tbl");
        $this->load->view("template/header", $data);
        $this->load->view("gen/audit_trail/index", $data);
        $this->load->view("template/footer");
    }


  

    

    

}
?>

