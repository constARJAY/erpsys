<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timekeeping_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/TimekeepingModule_model", "timekeeping");
        isAllowed(109);
    }

    public function index()
    {
        $data["title"] = "Timekeeping Module";
        $this->load->view("template/header", $data);
        $this->load->view("hris/timekeeping_module/index");
        $this->load->view("template/footer");
    }

    public function searchTimesheet()
    {
        $startDate = $this->input->post("startDate");
        $endDate   = $this->input->post("endDate");
        echo json_encode($this->timekeeping->searchTimesheet($startDate, $endDate));
    }




    // ----- UPLOAD TIMESHEET -----
    public function getUploadedTimesheet() 
    {
        $result = [];
        if (isset($_FILES["files"])) {
            $file_array = explode(".", $_FILES["files"]["name"]);
            $file_name = $file_array[0];
            $file_ext  = end($file_array);

            $column_name = [];
            $final_data  = [];

            $file_data  = file_get_contents($_FILES["files"]["tmp_name"]);
            $data_array = array_map("str_getcsv", explode("\n", $file_data));
            
            $labels = array_shift($data_array);
            foreach($labels as $label) $column_name[] = strtolower($label);

            $count = count($data_array) - 1;
            for($j = 0; $j < $count; $j++) {
                $data = array_combine($column_name, $data_array[$j]);
                $final_data[$j] = $data;
            }

            $result = $final_data;
        }
        return $result;
    }

    public function uploadTimesheet()
    {
        $file = $this->getUploadedTimesheet();
        // echo json_encode($file);
        echo json_encode($this->timekeeping->uploadTimesheet($file));
    }
    // ----- END UPLOAD TIMESHEET -----

}
