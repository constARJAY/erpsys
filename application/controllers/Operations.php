<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operations extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function index()
    {
        $data["title"] = "Operations";

        $this->load->view("template/header", $data);
        $this->load->view("operations/index", $data);
        $this->load->view("template/footer", $data);
    }

    public function getTableData() 
    {
        $tableName    = $this->input->post("tableName");
        $columnName   = $this->input->post("columnName"); 
        $searchFilter = $this->input->post("searchFilter");
        $orderBy      = $this->input->post("orderBy");
        echo json_encode($this->operations->getTableData($tableName, $columnName, $searchFilter, $orderBy));
    }

    public function insertTableData() 
    {
        $tableName = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $tableData = $this->input->post("tableData") ? $this->input->post("tableData") : false;
        $feedback  = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
        $data = array();

        if ($tableData) {
            foreach ($tableData as $key => $value) {
                // $output = is_array($value) ? implode("|", $value) : $value;
                $data[$key] = $value;
            }
            echo json_encode($this->operations->insertTableData($tableName, $tableData, $feedback));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

    public function updateTableData()
    {
        $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $tableData   = $this->input->post("tableData") ? $this->input->post("tableData") : false;
        $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
        $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
        $data = array();

        if ($tableName && $tableData && $whereFilter) {
            foreach ($tableData as $key => $value) {
                $data[$key] = $value;
            }
            echo json_encode($this->operations->updateTableData($tableName, $tableData, $whereFilter, $feedback));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

    public function deleteTableData()
    {
        $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
        $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;

        if ($tableName && $whereFilter) {
            echo json_encode($this->operations->deleteTableData($tableName, $whereFilter, $feedback));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

}
