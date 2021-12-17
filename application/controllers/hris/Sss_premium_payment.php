<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sss_premium_payment extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        isAllowed(85);
    }

    public function index(){
        $data["title"]      = "SSS Premium Payment";
        $data["reportData"] =  $this->operations->premiumPaymentReport();
        $this->load->view("template/header", $data);
        $this->load->view("hris/sss_premium_payment/index");
        $this->load->view("template/footer");
        // $this->load->view('hris/sss_premium_payment/print', $data);       
    }

    public function printReport(){ 
        $period             = $this->input->post("period");
        // $period             = "November 2021";
        $arrayData          = $this->operations->premiumPaymentReport();
        $returnPeriod       = "";
        $returnData         = [];
        $companyData        = $this->operations->getTableData("gen_company_profile_tbl");
        foreach ($arrayData as $key => $value) {
            if($value["month"] == $period){
                $returnPeriod = $value["month"];
                $returnData   = $value["data"];
            }
        }

        $data = [
                    'title'             => 'PRINT REPORT',
                    'period'            => $returnPeriod,
                    'reportData'        => $returnData,
                    'companyProfile'    => $companyData[0]
                ];

        return $this->load->view('hris/sss_premium_payment/print', $data);       
    }
}
