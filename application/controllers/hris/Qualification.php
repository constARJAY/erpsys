<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Qualification extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(26);
    }
    public function index(){
        $data["title"]              = "Qualification Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/qualification/index");
        $this->load->view("template/footer");
    }

}

/* End of file Qualification.php */
?>