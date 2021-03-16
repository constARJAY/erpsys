<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Branch extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function index(){
        $data["title"]              = "Branch Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/branch/index");
        $this->load->view("template/footer");
    }


}

/* End of file Branch.php */
?>