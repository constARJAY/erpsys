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

    public function saveleaveRequest(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $leaveRequestID             = $this->input->post("leaveRequestID") ?? null;
        $reviseLeaveRequestID       = $this->input->post("reviseLeaveRequestID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $leaveRequestReason         = $this->input->post("leaveRequestReason") ?? null; 
        $leaveRequestCode           = $this->input->post("leaveRequestCode") ?? null;
        $leaveRequestDate           = $this->input->post("leaveRequestDate") ?? null;
        $leaveRequestDateFrom       = $this->input->post("leaveRequestDateFrom") ?? null;
        $leaveRequestDateTo         = $this->input->post("leaveRequestDateTo") ?? null;
        $leaveRequestNumberOfDate   = $this->input->post("leaveRequestNumberOfDate") ?? null;
        $leaveID                    = $this->input->post("leaveID") ?? null;
        $leaveName                  = $this->input->post("leaveName") ?? null;
        $leaveRequestRemainingLeave = $this->input->post("leaveRequestRemainingLeave") ?? null;
        $leaveStatus                = $this->input->post("leaveStatus") ?? null;
        $leaveWorkingDay            = $this->input->post("leaveWorkingDay") ?? null;
        $timeIn                     = $this->input->post("timeIn") ?? null;
        $timeOut                    = $this->input->post("timeOut") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $leaveRequestStatus         = $this->input->post("leaveRequestStatus");
        $leaveRequestRemarks        = $this->input->post("leaveRequestRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");

        $leaveRequestData = [
            "reviseLeaveRequestID"          => $reviseLeaveRequestID,
            "employeeID"                    => $employeeID,
            "leaveRequestCode"              => $leaveRequestCode,
            "leaveRequestDate"              => $leaveRequestDate,
            "leaveRequestDateFrom"          => $leaveRequestDateFrom,
            "leaveRequestDateTo"            => $leaveRequestDateTo,
            "leaveRequestNumberOfDate"      => $leaveRequestNumberOfDate,
            "leaveID"                       => $leaveID,
            "leaveName"                     => $leaveName,
            "leaveRequestRemainingLeave"    => $leaveRequestRemainingLeave,
            "leaveStatus"                   => $leaveStatus,
            "leaveWorkingDay"               => $leaveWorkingDay,
            "timeIn"                        => $timeIn,
            "timeOut"                       => $timeOut,
            "leaveRequestRemarks"           => $leaveRequestRemarks,
            "approversID"                   => $approversID,
            "approversStatus"               => $approversStatus,
            "approversDate"                 => $approversDate,
            "leaveRequestStatus"            => $leaveRequestStatus,
            "leaveRequestReason"            => $leaveRequestReason,
            "submittedAt"                   => $submittedAt,
            "createdBy"                     => $createdBy,
            "updatedBy"                     => $updatedBy,
            "createdAt"                     => $createdAt
        ];

        $uploadedMultipleFiles = getUploadedMultipleFiles($_POST, $_FILES);
        if ($uploadedMultipleFiles && !empty($uploadedMultipleFiles)) {
            foreach ($uploadedMultipleFiles as $fileKey => $fileValue) {
                unset($leaveRequestData[$fileKey]);
                $leaveRequestData[$fileKey] = $fileValue;
            }
        }

        if ($action == "update") {
            unset($leaveRequestData["reviseLeaveRequestID"]);
            unset($leaveRequestData["createdBy"]);
            unset($leaveRequestData["createdAt"]);

            if ($method == "cancelform") {
                $leaveRequestData = [
                    "leaveRequestStatus" => 4,
                    "updatedBy"          => $updatedBy,
                ];
            } else if ($method == "approve") {
                $leaveRequestData = [
                    "leaveStatus"        => $leaveStatus,
                    "approversStatus"    => $approversStatus,
                    "approversDate"      => $approversDate,
                    "leaveRequestStatus" => $leaveRequestStatus,
                    "updatedBy"          => $updatedBy,
                ];
            } else if ($method == "deny") {
                $leaveRequestData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "leaveRequestStatus"  => 3,
                    "leaveRequestRemarks" => $leaveRequestRemarks,
                    "updatedBy"           => $updatedBy,
                ];
            }   else if ($method == "drop") {
                $leaveRequestData = [
                    "reviseLeaveRequestID" => $reviseLeaveRequestID,
                    "leaveRequestStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveLeaveRequestData = $this->leaverequest->saveLeaveRequestData($action, $leaveRequestData, $leaveRequestID);
        echo json_encode($saveLeaveRequestData);
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


        // $explode = explode(";", $reason);
        $newDescription =  $reason;
        // $getLength = count($explode) ; 
        // for($loop = 0; $loop<count($explode);$loop++){

        //     if($loop == $getLength -1){
        //         $newDescription .= $explode[$loop];
        //     }else{
        //         $newDescription .= $explode[$loop]."<br>";
        //     }
            
        // }


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

        $leaveBadge ='<span class="badge badge-danger">'.$leaveRequestCode.'</span>';
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
    
        // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----//
        $isApprovedTimekeeping = $this->leaverequest->checkTimeKeeping($dateFrom,$dateTo);
            
          
        if($isApprovedTimekeeping !=0){
           
            // echo "pasok approved timekeeping ";
            // exit;
            $getEmployeeLeaveAmount = $this->leaverequest->getEmployeeLeaveAmount($employeeID,$dateFrom);

            // echo "pasok loan AMount".$getEmployeeLeaveAmount;

            $loanAmount = 0;
            if($getEmployeeLeaveAmount){
                $loanAmount = $getEmployeeLeaveAmount;
            }

            
            $dataPayroll = array(
                "employeeID" =>$employeeID,
                "tableName" =>"hris_leave_request_tbl",
                "tablePrimaryID" =>$leaveRequestID,
                "tablePrimaryCode" =>$leaveRequestCode,
                "adjustmentType"=>"leave",
                "controller"=> base_url("hris/leave_request"),
                "adjustmentAmount" => $loanAmount,
                'createdBy'=>$employeeID,
            );

          

            $this->leaverequest->generatePayrollAdjustment($dataPayroll);

        }
        // ---- CHECK AND SAVED IN PAYROLL ADJUSTMENT -----//

        foreach($getProductionRecord as $key => $value){

      
            $getDate = $value["dateEntries"];
            $getDay = $value["dayEntries"];
            $productionID = $value["productionID"];
            $productionEntriesID = $value["productionEntriesID"];

            $getSchedule = getEmployeeScheduleInOut($employeeID, $getDate);

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