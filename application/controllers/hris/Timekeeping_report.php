<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timekeeping_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/TimekeepingModule_model", "timekeeping");
        $this->load->model("hris/EmployeeAttendance_model", "employeeattendance");
        isAllowed(109);
    }


    public function index()
    {
        $data["title"] = "Timekeeping Report";
        $this->load->view("template/header", $data);
        $this->load->view("hris/timekeeping_report/index");
        $this->load->view("template/footer");
    }


    public function searchTimesheet()
    {
        $timekeepingID = $this->input->post("timekeepingID");
        $startDate     = $this->input->post("startDate");
        $endDate       = $this->input->post("endDate");
        echo json_encode($this->timekeeping->searchTimesheet($timekeepingID, $startDate, $endDate));
    }


    public function printReport()
    {
        $timekeepingID   = $this->input->post("timekeepingID");
        $timekeepingCode = $this->input->post("timekeepingCode");
        $startDate       = $this->input->post("startDate");
        $endDate         = $this->input->post("endDate");

        $data = [
            'title'       => 'PRINT TIMEKEEPING REPORT',
            'company'     => $this->timekeeping->getCompanyProfile(),
            'timekeeping' => $this->timekeeping->searchTimesheet($timekeepingID, $startDate, $endDate),
            'code'        => $timekeepingCode
        ];
        return $this->load->view('hris/timekeeping_report/print', $data);
    }


}

