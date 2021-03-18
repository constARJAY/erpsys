<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class Event_calendar extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function index(){
        $data["title"]      =   "Event Calendar";
        $dateToday          =   date("Y-m-d");
        $data["events"]     =   $this->operations->getTableData("hris_event_calendar_tbl", "", "eventCalendarDateFrom >=".$dateToday);
        $this->load->view("template/header", $data);
        $this->load->view("hris/event_calendar/index", $data);
        $this->load->view("template/footer");
    }

}

/* End of file Event_calendar.php */
?>