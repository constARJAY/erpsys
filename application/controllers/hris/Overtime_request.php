<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Overtime_request extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        $this->load->model("hris/OvertimeRequest_model", "overtime");
        isAllowed(56);
    }

    public function index(){
        $data["title"] = "Overtime Request";
        $this->load->view("template/header",$data);
        $this->load->view("hris/overtime_request/index");
        $this->load->view("template/footer");
    }


    function decimal_to_time($decimal) {
        $minutes = floor($decimal % 60);
        $seconds = $decimal - (int)$decimal;
        $seconds = round($seconds * 60);
    
        return str_pad($minutes, 2, "0", STR_PAD_LEFT) . ":" . str_pad($seconds, 2, "0", STR_PAD_LEFT);
    }

    function computeHours($timeIn ="00:00",$timeOut ="00:00",$duration ="0")
    {
        $start = $timeIn; //started at 7 after midnight
        $break = $this->decimal_to_time($duration); //1 hour and 30 minutes of brake
        $finish = $timeOut; //finished at 3 afternoon
        
        //create the start and end date objects
        $startDate = \DateTime::createFromFormat('H:i', $start);
        $endDate =  \DateTime::createFromFormat('H:i', $finish);
        
        if ($endDate < $startDate) {
            //end date is in the past, adjust to the next day
            //this is only needed since the day the time was worked is not known
            $endDate->add(new \DateInterval('PT24H'));
        }
        
        //determine the number of hours and minutes during the break
        $breakPeriod = new \DateInterval(vsprintf('PT%sH%sM', explode(':', $break)));
        
        //increase the start date by the amount of time taken during the break period
        $startDate->add($breakPeriod);
        
        //determine how many minutes are between the start and end dates
        $minutes = new \DateInterval('PT1M');
        $datePeriods = new \DatePeriod($startDate, $minutes, $endDate);
        
        //count the number of minute date periods
        $minutesWorked = iterator_count($datePeriods);
        
        //divide the number of minutes worked by 60 to display the fractional hours
        return ($minutesWorked / 60); //6.5
    }
        
    
    

    public function generateProduction(){

        // echo "<pre>";
        //     print_r($_POST);
        //     exit;
        // $employeeID  = $this->input->post("employeeID");
        // $overtime  = $this->input->post("leaveRequestID");
        // $leaveStatus  = $this->input->post("leaveStatus");
        // $dateFrom  = $this->input->post("dateFrom");
        // $dateTo  = $this->input->post("dateTo");

        // $paidStatus =   $this->input->post("paidStatus");
        // $leaveType  =   $this->input->post("leaveType");
        // $workType   =   $this->input->post("workType");
        // $timeIn =   $this->input->post("timeIn");
        // $timeOut    =   $this->input->post("timeOut");
        // $reason    =   $this->input->post("reason");

        $employeeID = $this->input->post("employeeID");
        $overtimeRequestID = $this->input->post("overtimeRequestID");
        $overtimeRequestCode = $this->input->post("overtimeRequestCode");
        $requestDate    = $this->input->post("getDate");
        $timeIn = substr($this->input->post("timeIn"), 0, -3);
        $timeOut    = substr($this->input->post("timeOut"), 0, -3);;
        $breakDuration = $this->input->post("breakDuration");
        $paidStatus = $this->input->post("paidStatus");
        $getLocation    = $this->input->post("getLocation");
        $getStatus  = $this->input->post("getStatus");
        $getClass   = $this->input->post("getClass");
        $getClientID  = $this->input->post("getClientID");
        $getClientName  = $this->input->post("getClientName");
        $getProjectID = $this->input->post("getProjectID");
        $getProjectName = $this->input->post("getProjectName");
        $reason = $this->input->post("reason");


        $explode = explode(";", $reason);
        $newDescription = '';
        $getLength = count($explode) ; 
        for($loop = 0; $loop<count($explode);$loop++){

            if($loop == $getLength -1){
                $newDescription .= $explode[$loop];
            }else{
                $newDescription .= $explode[$loop]."<br>";
            }
            
        }


        // $paidStatusBadge ='';
        // if($paidStatus == 1 ){
            $paidStatusBadge ='<span class="badge badge-success">Paid</span>';
        // }else{
        //     $paidStatusBadge ='<span class="badge badge-danger">Unpaid</span>';
        // }

        // $leaveTypeBadge = '';
        // if($leaveType == 1 ){
        //     $leaveTypeBadge ='<span class="badge badge-warning">Sick</span>';
        // }
        // if($leaveType == 2 ){
        //     $leaveTypeBadge ='<span class="badge badge-danger">Vacation</span>';
        // }
        // if($leaveType == 3 ){
        //     $leaveTypeBadge ='<span class="badge badge-danger">Emergency</span>';
        // }
        // if($leaveType == 4 ){
        //     $leaveTypeBadge = '<span class="badge badge-secondary ">maternity</span>';
        // }

        // $workTypeBadge = '';
        // if($workType == 0){
        //     $workTypeBadge ='<span class="badge badge-danger">Half</span>';
        // }else{
        //     $workTypeBadge ='<span class="badge badge-danger">Whole</span>';
        // }

        // $leaveBadge ='<span class="badge badge-danger">LRF</span>';
        $overtimeBadge ='<span class="badge badge-info">OTRF</span>';
       
        


        // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//
        // $start = new DateTime($dateFrom);
        // $end = new DateTime($dateTo);
        // $oneday = new DateInterval("P1D");

        // $date = array();
        // $days = array();
        
        
        
        // /* Iterate from $start up to $end+1 day, one day in each iteration.
        //    We add one day to the $end date, because the DatePeriod only iterates up to,
        //    not including, the end date. */
        // foreach(new DatePeriod($start, $oneday, $end->add($oneday)) as $key => $day) {
        //     $day_num = $day->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
        //     if($day_num < 6) { /* weekday */
        //         $date[$key] =$day->format("Y-m-d");        
        //         $days[$key] =$day->format("l");        
        //     } 
        // }
        // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//

        $data = array();
        $getProductionRecord = $this->overtime->getProductionRecord($employeeID);
        $activityData = [];

        foreach($getProductionRecord as $key => $value){

            
            // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----//
            $isApprovedTimekeeping = $this->checkTimeKeeping($startDate,$endDate);

            if($isApprovedTimekeeping > 0){
                $dataPayroll = [
                    'payrollAdjustStatus'   =>0,
                    'overtimeRequestID'        =>$overtimeRequestID,
                    'overtimeRequestCode'      =>$overtimeRequestCode,
                    'createdBy'             =>$employeeID,
                ];

                $this->leaverequest->generatePayrollAdjustment($dataPayroll);

            }
            // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----/

      
            $getDate = $value["dateEntries"];
            $getDay = $value["dayEntries"];
            $productionID = $value["productionID"];
            $productionEntriesID = $value["productionEntriesID"];

            $getSchedule = $this->overtime->getEmployeeScheduleInOut($employeeID, $getDate);

            $getRequestTimeIn = strtotime($timeIn);
            $getRequestTimeOut = strtotime($timeOut);
            $getScheduleTimeIn = strtotime($getSchedule["scheduleIn"]);
            $getScheduleTimeOut = strtotime($getSchedule["scheduleOut"]);
          
            if($getScheduleTimeOut < $getRequestTimeIn){
                $setTimeIn =$timeIn;
                $setTimeOut =$timeOut;
                $setBreak =$breakDuration;

            }else{
                if(($getRequestTimeIn == $getScheduleTimeIn) && ($getScheduleTimeIn == $getScheduleTimeOut)){
                    $setTimeIn  =   $getSchedule["scheduleIn"];
                    $setTimeOut =   $getSchedule["scheduleOut"];
                    $setBreak   =   $getSchedule["breakDuration"];
                }else{

                    $setTimeIn =$timeIn;
                    $setTimeOut =$timeOut;
                    $setBreak =$breakDuration;
                    // NOT YET SATISFIED FOR THE  RANGE OF BREAK TIME DEDUCTION BETWEEN REGULAR SCHEDULE //
                }
               
            }
    

            $overtimeDescription = $paidStatusBadge.' '.$overtimeBadge.'<br>'.$newDescription;
           

            if($getDate == $requestDate){
                $temp = [
                    "productionID"          =>  $productionID,
                    "productionEntriesID"   =>  $productionEntriesID,
                    // "employeeID"            =>  $employeeID,
                    "overtimeRequestID"        => $overtimeRequestID,
                    "dateEntries"           =>  $getDate,
                    "dayEntries"            =>  $getDay,
                    "timeStart"             =>  $setTimeIn,
                    "timeEnd"               =>  $setTimeOut,
                    "activityLocation"      =>  $getLocation,
                    "activityClass"         =>  $getClass,
                    "activityClient"        =>  $getClientID,
                    "activityClientName"    =>  $getClientName,
                    "activityProject"       =>  $getProjectID,
                    "activityProjectName"   =>  $getProjectName,
                    "activityStatus"        =>  $getStatus,
                    "activityHours"         =>  $this->computeHours($setTimeIn,$setTimeOut,$setBreak),
                    "activityDescription"   =>  $overtimeDescription,
                    "createdBy"             =>  $employeeID
            ];
            array_push($activityData, $temp);
            }
        }

        $checkActivity = "";

        // echo "<pre>";
        // print_r($getProductionRecord);
        // exit;

        if($activityData){
            $checkActivity = $this->overtime->generateActivity($activityData);
        }

        echo json_encode($checkActivity);

    }
}    