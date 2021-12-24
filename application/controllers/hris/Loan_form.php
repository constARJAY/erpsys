<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loan_form extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/LoanForm_model", "loanform");
        isAllowed(59);
    }

    public function index()
    {
        $data["title"] = "Loan Form";

        $this->load->view("template/header",$data);
        $this->load->view("hris/loan_form/index");
        $this->load->view("template/footer");
    }

    // public function getTableData() 
    // {
    //     $tableName    = $this->input->post("tableName");
    //     $columnName   = $this->input->post("columnName"); 
    //     $searchFilter = $this->input->post("searchFilter");
    //     $orderBy      = $this->input->post("orderBy");
    //     echo json_encode($this->company_setup->getTableData($tableName, $columnName, $searchFilter, $orderBy));
    // }

    // public function updateTableData()
    // {
    //     $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
    //     $tableData   = $this->input->post("tableData") ? $this->input->post("tableData") : false;
    //     $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
    //     $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
    //     $data = array();

    //     // $uploadedFiles = $this->getUploadedFiles();
    //     // if ($uploadedFiles) {
    //     //     foreach ($uploadedFiles as $fileKey => $fileValue) {
    //     //         $data[$fileKey] = $fileValue;
    //     //     }
    //     // }
        
    //     if ($tableName && $tableData && $whereFilter) {
    //         foreach ($tableData as $key => $value) {
    //             $data[$key] = $value;
    //         }
    //         echo json_encode($this->company_setup->updateTableData($tableName, $data, $whereFilter, $feedback));
    //     } else {
    //         echo json_encode("false|Invalid arguments");
    //     }
    // }

    public function generateAmmortization(){

        // echo "<pre>";
        // print_r($_POST);
        // exit;

        $employeeID    = $this->input->post("employeeID");
        $loanFormTermPayment    = $this->input->post("loanFormTermPayment");
        $loanFormDate    = $this->input->post("loanFormDate");
        $loanFormDeductionAmount    = $this->input->post("loanFormDeductionAmount");
        $loanFormID    = $this->input->post("loanFormID");
        $listDate    = $this->input->post("listDate");

        $lisDateArr = (explode(",",$listDate));

        if(!empty($lisDateArr)){
            $ammortizationData = [];
            for($loop = 0; $loop < count($lisDateArr); $loop++){
                $temp = [
                    "loanFormID"            =>  $loanFormID,
                    "dueDate"               =>   $lisDateArr[$loop],
                    "loanAmount"            =>  $loanFormDeductionAmount,
                    "ammortizationStatus"   =>0,
                    "createdBy"             =>  $employeeID
            ];
            array_push($ammortizationData, $temp);
            }

            $saveAmmortizationData = $this->loanform->saveAmmortizationData($ammortizationData);
        }
    }

}
?>