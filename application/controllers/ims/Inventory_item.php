<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_item extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // $this->load->model("Companysetup_model", "company_setup");
        isAllowed(4);
    }

    public function index()
    {
        $data["title"] = "Inventory Item Mastefile";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_item/index");
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

}
?>