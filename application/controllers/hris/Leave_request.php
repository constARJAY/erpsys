<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leave_request extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/LeaveRequest_model", "leaverequest");
        isAllowed(55);
    }

    public function index()
    {
        $data["title"] = "Leave Request Form";
        $this->load->view("template/header",$data);
        $this->load->view("hris/leave_request/index");
        $this->load->view("template/footer");
    }

    public function updateEmployeeLeave()
    {
        $employeeID  = $this->input->post("employeeID");
        $leaveID     = $this->input->post("leaveID");
        $leaveCredit = $this->input->post("leaveCredit");
  
        echo $this->leaverequest->updateEmployeeLeave($employeeID, $leaveID, $leaveCredit);
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
        $employeeID  = $this->input->post("employeeID");
        $leaveRequestID  = $this->input->post("leaveRequestID");
        $leaveRequestCode  = $this->input->post("leaveRequestCode");
        $leaveStatus  = $this->input->post("leaveStatus");
        $dateFrom  = $this->input->post("dateFrom");
        $dateTo  = $this->input->post("dateTo");

        $paidStatus =   $this->input->post("paidStatus");
        $leaveType  =   $this->input->post("leaveType");
        $workType   =   $this->input->post("workType");
        $timeIn =   $this->input->post("timeIn");
        $timeOut    =   $this->input->post("timeOut");
        $reason    =   $this->input->post("reason");


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


        $paidStatusBadge ='';
        if($paidStatus == 1 ){
            $paidStatusBadge ='<span class="badge badge-success">Paid</span>';
        }else{
            $paidStatusBadge ='<span class="badge badge-danger">Unpaid</span>';
        }

        $leaveTypeBadge = '';
        if($leaveType == 1 ){
            $leaveTypeBadge ='<span class="badge badge-warning">Sick</span>';
        }
        if($leaveType == 2 ){
            $leaveTypeBadge ='<span class="badge badge-danger">Vacation</span>';
        }
        if($leaveType == 3 ){
            $leaveTypeBadge ='<span class="badge badge-danger">Emergency</span>';
        }
        if($leaveType == 4 ){
            $leaveTypeBadge = '<span class="badge badge-secondary ">maternity</span>';
        }

        $workTypeBadge = '';
        if($workType == 0){
            $workTypeBadge ='<span class="badge badge-danger">Half</span>';
        }else{
            $workTypeBadge ='<span class="badge badge-danger">Whole</span>';
        }

        $leaveBadge ='<span class="badge badge-danger">LRF</span>';
        $overtimeBadge ='<span class="badge badge-info">OTRF</span>';
       
        


        // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//
        $start = new DateTime($dateFrom);
        $end = new DateTime($dateTo);
        $oneday = new DateInterval("P1D");

        $date = array();
        $days = array();
        
        
        
        /* Iterate from $start up to $end+1 day, one day in each iteration.
           We add one day to the $end date, because the DatePeriod only iterates up to,
           not including, the end date. */
        foreach(new DatePeriod($start, $oneday, $end->add($oneday)) as $key => $day) {
            $day_num = $day->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
            if($day_num < 6) { /* weekday */
                $date[$key] =$day->format("Y-m-d");        
                $days[$key] =$day->format("l");        
            } 
        }
        // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//

        $data = array();
        $getProductionRecord = $this->leaverequest->getProductionRecord($employeeID);
        $activityData = [];

        foreach($getProductionRecord as $key => $value){

            // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----//
            $isApprovedTimekeeping = $this->checkTimeKeeping($startDate,$endDate);

            if($isApprovedTimekeeping > 0){
                $dataPayroll = [
                    'payrollAdjustStatus'   =>0,
                    'leaveRequestID'        =>$leaveRequestID,
                    'leaveRequestCode'      =>$leaveRequestCode,
                    'createdBy'             =>$employeeID,
                ];

                $this->leaverequest->generatePayrollAdjustment($dataPayroll);

            }
            // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----//

      
            $getDate = $value["dateEntries"];
            $getDay = $value["dayEntries"];
            $productionID = $value["productionID"];
            $productionEntriesID = $value["productionEntriesID"];

            $getSchedule = $this->leaverequest->getEmployeeScheduleInOut($employeeID, $getDate);

            $setTimeIn ='';
            $setTimeOut ='';
            $setBreak ='';
            if($workType == 0){
                $setTimeIn =$timeIn;
                $setTimeOut =$timeOut;
                $setBreak =0;

            }else{
                $setTimeIn  =   $getSchedule["scheduleIn"];
                $setTimeOut =   $getSchedule["scheduleOut"];
                $setBreak   =   $getSchedule["breakDuration"];
            }

            $leaveDescription = $paidStatusBadge.' '.$workTypeBadge.' '.$leaveTypeBadge.' '.$leaveBadge.'<br>'.$newDescription;
            if(in_array($getDate, $date)){
                $temp = [
                    "productionID"          =>  $productionID,
                    "productionEntriesID"   =>  $productionEntriesID,
                    // "employeeID"            =>  $employeeID,
                    "leaveRequestID"        => $leaveRequestID,
                    "dateEntries"           =>  $getDate,
                    "dayEntries"            =>  $getDay,
                    "timeStart"             =>  $setTimeIn,
                    "timeEnd"               =>  $setTimeOut,
                    "activityHours"         =>  $this->computeHours($setTimeIn,$setTimeOut,$setBreak),
                    "activityDescription"   =>  $leaveDescription,
                    "createdBy"             =>  $employeeID
            ];
            array_push($activityData, $temp);
            }
        }

        $checkActivity = "";
        if($activityData){
            $checkActivity = $this->leaverequest->generateActivity($activityData);
        }

        echo json_encode($checkActivity);


        

            

    }

}    