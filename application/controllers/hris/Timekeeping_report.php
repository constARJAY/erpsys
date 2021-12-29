<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timekeeping_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/TimekeepingModule_model", "timekeeping");
        $this->load->model("hris/EmployeeAttendance_model", "employeeattendance");
        $this->load->model("hris/TimekeepingReport_model", "timekeepingreport");
        isAllowed(109);
    }


    public function index()
    {
        $data["title"] = "Timekeeping Report";
        $this->load->view("template/header", $data);
        $this->load->view("hris/timekeeping_report/index");
        $this->load->view("template/footer");
    }


    public function getFilterDisplayData()
    {
        echo json_encode($this->timekeepingreport->getFilterDisplayData());
    }


    public function getTableDisplayData()
    {
        $departmentID  = $this->input->post('departmentID');
        $designationID = $this->input->post('designationID');
        $startDate     = $this->input->post('startDate');
        $endDate       = $this->input->post('endDate');
        
        echo json_encode($this->timekeepingreport->getTableDisplayData($departmentID, $designationID, $startDate, $endDate));
    }

    






    public function getTimekeepingReportDisplay()
    {
        echo json_encode($this->timekeepingreport->getTimekeepingReportDisplay());
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


    // ----- EXCEL -----
    public function downloadExcel()
    {
        $startDate  = $this->input->get("startDate");
        $endDate    = $this->input->get("endDate");
        $employeeID = $this->input->get("employeeID");
        
        $data = $this->timekeepingreport->getTableDisplayData(0, 0, $startDate, $endDate, $employeeID);
        getTimekeepingReportExcel($data);
    }
    // ----- END EXCEL -----


}

