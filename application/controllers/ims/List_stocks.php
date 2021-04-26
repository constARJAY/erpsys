<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class List_stocks extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ListStock_model", "list_stock");
        isAllowed(34);
    }

    public function index()
    {
        $data["title"] = "List of Stocks";

        $this->load->view("template/header",$data);
        $this->load->view("ims/list_stocks/index");
        $this->load->view("template/footer");
    }

    public function getliststocks()
    {
        $classificationID                  = $this->input->post("classificationID");
        $categoryID                        = $this->input->post("categoryID");
        $inventoryStorageID                = $this->input->post("inventoryStorageID");
        echo json_encode($this->list_stock->getListStock($classificationID, $categoryID, $inventoryStorageID));


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