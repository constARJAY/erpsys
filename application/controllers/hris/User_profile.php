<?php 

defined('BASEPATH') OR exit('No direct script access allowed');

class User_profile extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("web/Applicant_model", "applicant");
        isAllowed(144);
    }

    public function index(){
        $data["title"] = "User Profile";
        $this->load->view("template/header", $data);
        $this->load->view("hris/user_profile/index");
        $this->load->view("template/footer");
    }


}


/* End of file Code_conduct_category.php */
?>