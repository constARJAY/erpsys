<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_attendance extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/EmployeeAttendance_model", "employeeattendance");
        isAllowed(108);
    }

    public function index()
    {
        $syncEmployee   = $this->employeeattendance->syncEmployeeToBiotime();
        $syncAttendance = $this->employeeattendance->syncEmployeeAttendance();

        $data["title"] = "Employee Attendance";
        $this->load->view("template/header", $data);
        $this->load->view("hris/employee_attendance/index");
        $this->load->view("template/footer");
    }

    public function getEmployeeAttendanceModuleData()
    {
        $employeeID = $this->input->post("employeeID");
        echo json_encode($this->employeeattendance->getEmployeeAttendanceModuleData($employeeID));
    }

    public function getTimesheetData()
    {
        $employeeID = $this->input->post("employeeID");
        echo json_encode($this->employeeattendance->getTimesheetData($employeeID));
    }

    public function getEmployeeAttendanceData()
    {
        $employeeID = $this->input->post("employeeID");
        $startDate  = $this->input->post("startDate");
        $endDate    = $this->input->post("endDate");
        echo json_encode($this->employeeattendance->getEmployeeAttendanceData($employeeID, $startDate, $endDate));
    }

    

    

    public function getEmployeeNotInDevice()
    {
        echo json_encode($this->employeeattendance->getEmployeeNotInDevice());
    }


}

