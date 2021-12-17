<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(143);
    }


    public function index(){
        // $data["title"] = "Login | ".$this->db->getTableData("company_setup_tbl", "companyName", "", "");
        $data["title"]              = "System Settings";
        // $data["module_list"]        = $this->operations->getTableData("gen_module_list_tbl", "", "moduleApprover != 0");
        $this->load->view("template/header", $data);
        $this->load->view("gen/system_setting/index", $data);
        $this->load->view("template/footer");
    }


  

    

    

}
?>

