<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Check_writer extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        isAllowed(15);
    }

    public function index()
    {
        $data["title"] = "Check Writer";

        $this->load->view("template/header",$data);
        $this->load->view("fms/check_writer/index");
        $this->load->view("template/footer");
    }

    public function convertnumberintowords(){

        $num = $this->input->post("checkAmountConvert");
        error_reporting(0);
        $data =  convertNumberToWords($num)." Only";
        echo json_encode($data); 
      }
}
?>