<?php  

class Employee extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Employee_model", "employee");
    }

    public function generateEmployeePermission() 
    {
        echo json_encode($this->employee->generateEmployeePermission());
    }

}