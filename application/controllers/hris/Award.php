<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class Award extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(27);
    }

    public function index(){
        $data["title"]              = "Award Masterfile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/award/index");
        $this->load->view("template/footer");
    }

}

/* End of file Code_conduct_category.php */

?>