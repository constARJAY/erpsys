<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class Code_conduct_category extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(23);
    }

    public function index(){
        $data["title"]              = "Code of Conduct Category Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/code_conduct_category/index");
        $this->load->view("template/footer");
    }

}

/* End of file Code_conduct_category.php */

?>