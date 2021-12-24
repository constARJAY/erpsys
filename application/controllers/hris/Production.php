<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');
class Production extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/Production_model", "production");
        $this->load->model("hris/LeaveRequest_model", "leaverequest");
        // isAllowed(143);
    }

    public function index()
    {
        $data["title"] = "Production Report";
        $this->load->view("template/header",$data);
        $this->load->view("hris/production/index");
        $this->load->view("template/footer");
    }

    public function getProductionContent()
    {
        $productionID = $this->input->post("productionID");
        
        echo json_encode($this->production->getProductionContent($productionID));
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

    public function saveProductionDocument(){
        $employeeID  = $this->input->post("employeeID");
        $dateSchedule  = $this->input->post("getDateSchedule");
        $dateStart  = $this->input->post("dateStart");
        $dateEnd  = $this->input->post("dateEnd");
        $approversID = $this->input->post("apprversID");

        $listDateRange  = $this->input->post("listDateRange");
        $listDayRange  = $this->input->post("listDayRange");

        // echo "<pre>";
        // print_r($_POST);
        // exit;

        
        $action  = $this->input->post("action");

        if($action == "add"){
            $data = [
                'employeeID'            => $employeeID,
                'productionSchedule'    => $dateSchedule,
                'dateStart'             => $dateStart,
                'dateEnd'               => $dateEnd,
                'createdBy'             => $employeeID,
                'createdAt'             => date('Y-m-d h:i:s'),
                'approversID'           => $approversID
            ];
        }

        if($action == "update"){
            $data = [
                'productionSchedule'    => $dateSchedule,
                'dateStart'             => $dateStart,
                'dateEnd'               => $dateEnd,
                'updatedBy'             => $employeeID,
                'updatedAt'             => date('Y-m-d h:i:s')
            ];
        }

        $saveProduction = $this->production->saveProductionDocument($data,$action);

        if($saveProduction){
            $result = explode("|",$saveProduction);

            $productionID  = $result[2];

            if ($result[0] == "true") {

               if($action=="add"){
                  
                $dataEntries =[];

                    for($loop1 =0;$loop1<count($listDateRange);$loop1++){
                        $temp =[
                            'productionID'  => $productionID,
                            'dateCredited'  => 1,
                            'dateEntries'   => $listDateRange[$loop1],
                            'dayEntries'    => $listDayRange[$loop1],
                            'createdBy'     => $employeeID,
                            'createdAt'     => date('Y-m-d h:i:s')
                        ];

                        array_push($dataEntries, $temp);
                    }
                }
                $saveEntries = $this->production->saveProductionEntries($dataEntries,$action,$listDateRange,$employeeID,$productionID);

                if($saveEntries){
                        $result = explode("|",$saveEntries);

                    $getProductionEntriesData  = $this->production->getProductionEntriesID($productionID);


                    foreach($getProductionEntriesData AS $entries) {

                        $dataActivities =[];


                        $getDataLeave = $this->production->getApprovedRequest($employeeID,"leave");
                        $getDataOvertime = $this->production->getApprovedRequest($employeeID,"overtime");




                        //  PROCESS FOR LEAVE REQUEST ///

                        // for($loop2 =0;$loop2<count($listDateRange);$loop2++){

                            // $getDateLeave = $listDateRange[$loop2];
                            $getDateLeave = $entries["dateEntries"];

                            foreach($getDataLeave as $key => $valueLeave){

                                $dateFromLeave = $valueLeave["leaveRequestDateFrom"];
                                $dateToLeave = $valueLeave["leaveRequestDateTo"];
                    
                    
                                // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//
                                $startLeave = new DateTime($dateFromLeave);
                                $endLeave = new DateTime($dateToLeave);
                                $onedayLeave = new DateInterval("P1D");
                    
                                $dateLeave = array();

                                /* Iterate from $start up to $end+1 day, one day in each iteration.
                                We add one day to the $end date, because the DatePeriod only iterates up to,
                                not including, the end date. */
                                foreach(new DatePeriod($startLeave, $onedayLeave, $endLeave->add($onedayLeave)) as $key => $day) {
                                    $day_num = $day->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
                                    if($day_num < 6) { /* weekday */
                                        $dateLeave[$key] =$day->format("Y-m-d");        
                                    } 
                                }
                                // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//

                                // ----- GET SCHEDULE OF EMPLOYEE ----//
                                $getSchedule = $this->leaverequest->getEmployeeScheduleInOut($employeeID, $getDateLeave);

                                $setTimeIn ='';
                                $setTimeOut ='';
                                $setBreak ='';

                                $workType = $valueLeave["leaveWorkingDay"];
                                if($workType == 0){
                                    $setTimeIn = $valueLeave["timeIn"];
                                    $setTimeOut =$valueLeave["timeOut"];
                                    $setBreak =0;

                                }else{
                                    $setTimeIn  =   $getSchedule["scheduleIn"];
                                    $setTimeOut =   $getSchedule["scheduleOut"];
                                    $setBreak   =   $getSchedule["breakDuration"];
                                }
                                // ----- GET SCHEDULE OF EMPLOYEE ----//

                                if(in_array($getDateLeave, $dateLeave)){
                                    $temp =[
                                        "productionID"          =>  $productionID,
                                        "productionEntriesID"   =>  $entries["productionEntriesID"],
                                        // "employeeID"            =>  $employeeID,
                                        "leaveRequestID"        => $valueLeave["leaveRequestID"],
                                        "dateEntries"           =>  $getDateLeave,
                                        "dayEntries"            => date("l",strtotime($getDateLeave)),
                                        "timeStart"             =>  $setTimeIn,
                                        "timeEnd"               =>  $setTimeOut,
                                        // "activityLocation"      =>  "",
                                        // "activityClass"         =>  "",
                                        // "activityClient"        =>  "",
                                        // "activityClientName"    =>  "",
                                        // "activityProject"       =>  "",
                                        // "activityProjectName"   =>  "",
                                        // "activityStatus"        =>  "",
                                        "activityHours"         =>  $this->computeHours($setTimeIn,$setTimeOut,$setBreak),
                                        "activityDescription"   =>  $valueLeave["leaveRequestReason"],
                                        "createdBy"             =>  $employeeID,
                                        "createdAt"             => date('Y-m-d h:i:s')
                                    ];
                    
                                    array_push($dataActivities, $temp);
                                }

                            }
                           
                           
                        // }

                        // PROCESS FOR LEAVE REQUEST //


                       //  PROCESS FOR OVERTIME REQUEST ///

                        // for($loop3 =0;$loop3<count($listDateRange);$loop3++){

                            // $getDateOvertime = $listDateRange[$loop3];
                            $getDateOvertime = $entries["dateEntries"];

                            foreach($getDataOvertime as $key => $valueOvertime){

                                $dateFromOvbertime = $valueOvertime["overtimeRequestDate"];
                                $dateToOvertime = $valueOvertime["overtimeRequestDate"];
                    
                                // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//
                                $startOvertime = new DateTime($dateFromOvbertime);
                                $endOvertime = new DateTime($dateToOvertime);
                                $onedayOverTime = new DateInterval("P1D");

                    
                                $dateOvertime = array();

                                /* Iterate from $start up to $end+1 day, one day in each iteration.
                                We add one day to the $end date, because the DatePeriod only iterates up to,
                                not including, the end date. */
                                foreach(new DatePeriod($startOvertime, $onedayOverTime, $endOvertime->add($onedayOverTime)) as $key => $day) {
                                    $day_num = $day->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
                                    if($day_num < 6) { /* weekday */
                                        $dateOvertime[$key] =$day->format("Y-m-d");    
                                    } 
                                }
                                // ----- FOR EXPANDING DATE RANGE EXCLUDING WEEKENDS --------//

                                // ----- GET SCHEDULE OF EMPLOYEE ----//
                                $getSchedule = $this->leaverequest->getEmployeeScheduleInOut($employeeID, $getDateOvertime);

                                    $setTimeIn ='';
                                    $setTimeOut ='';
                                    $setBreak ='';

                           
                                    $setTimeIn = substr($valueOvertime["overtimeRequestTimeIn"], 0, -3);
                                    $setTimeOut = substr($valueOvertime["overtimeRequestTimeOut"], 0, -3);
                                    $setBreak = $valueOvertime["overtimeRequestBreak"];

                                // ----- GET SCHEDULE OF EMPLOYEE ----//
                     

                                if(in_array($getDateOvertime, $dateOvertime)){
                                    $temp =[
                                        "productionID"          =>  $productionID,
                                        "productionEntriesID"   =>  $entries["productionEntriesID"],
                                        // "employeeID"            =>  $employeeID,
                                        "overtimeRequestID"        => $valueOvertime["overtimeRequestID"],
                                        "dateEntries"           =>  $getDateOvertime,
                                        "dayEntries"            => date("l",strtotime($getDateOvertime)),
                                        "timeStart"             =>  $setTimeIn,
                                        "timeEnd"               =>  $setTimeOut,
                                        "activityLocation"      =>  $valueOvertime["overtimeRequestLocation"],
                                        "activityClass"         =>  $valueOvertime["overtimeRequestClass"],
                                        "activityClient"        =>  $valueOvertime["overtimeRequestClientID"],
                                        "activityClientName"    =>  $valueOvertime["overtimeRequestClientName"],
                                        "activityProject"       =>  $valueOvertime["overtimeRequestProjectName"],
                                        "activityProjectName"   =>  $valueOvertime["overtimeRequestProjectName"],
                                        "activityStatus"        =>  $valueOvertime["overtimeRequestProjectStatus"],
                                        "activityHours"         =>  $this->computeHours($setTimeIn,$setTimeOut,$setBreak),
                                        "activityDescription"   =>  $valueOvertime["overtimeRequestReason"],
                                        "createdBy"             =>  $employeeID,
                                        "createdAt"             =>  date('Y-m-d h:i:s')
                                    ];
                    
                                    array_push($dataActivities, $temp);
                                }

                            }
                           
                           
                        // }

                        // PROCESS FOR OVERTIME REQUEST //
                        

                         $this->production->savedProductionActivities($dataActivities);
                    }
                }
            }
        }

        echo json_encode($saveProduction);

    }

    public function autoSavedProductionActivity(){
        //    echo "<pre>";
        // print_r($_POST);
        // exit;

        $productionActivityID  = $this->input->post("productionActivityID");
        $getTimeStartPeriod = $this->input->post("getTimeStartPeriod");
        $getTimeEndPeriod   = $this->input->post("getTimeEndPeriod");
        $getLocation    = $this->input->post("getLocation");
        $getClass   = $this->input->post("getClass");
        $getClientID    = $this->input->post("getClientID");
        $getClientName  = $this->input->post("getClientName");
        $getProjectID   = $this->input->post("getProjectID");
        $getProjectName = $this->input->post("getProjectName");
        // $getStatus  = $this->input->post("getStatus");
        $getDescription = $this->input->post("getDescription");
        $getManHours    = $this->input->post("getManHours");
        $createdBy  = $this->input->post("createdBy");
        $productionID   = $this->input->post("productionID");
        $productionEntriesID    = $this->input->post("productionEntriesID");
        $getDateEntries = $this->input->post("getDateEntries");
        $getDayEntries  = $this->input->post("getDayEntries");

        if($productionActivityID){
            $data = array(
                'productionActivityID' => $productionActivityID,
                'productionEntriesID' => $productionEntriesID,
                'productionID' => $productionID,
                'dateEntries' => $getDateEntries,
                'dayEntries' => $getDayEntries,
                'timeStart' => $getTimeStartPeriod,
                'timeEnd' => $getTimeEndPeriod,
                'activityLocation' => $getLocation,
                'activityClass' => $getClass,
                'activityProject' => $getProjectID,
                'activityProjectName' => $getProjectName,
                'activityClient' => $getClientID,
                'activityClientName' => $getClientName,
                'activityDescription' => $getDescription,
                // 'activityStatus' => $getStatus,
                'activityHours' => $getManHours,
                'createdBy' => $createdBy,
                'createdAt' => date('Y-m-d h:i:s')
            );
        }else{
            $data = array(
                'productionEntriesID' => $productionEntriesID,
                'productionID' => $productionID,
                'dateEntries' => $getDateEntries,
                'dayEntries' => $getDayEntries,
                'timeStart' => $getTimeStartPeriod,
                'timeEnd' => $getTimeEndPeriod,
                'activityLocation' => $getLocation,
                'activityClass' => $getClass,
                'activityProject' => $getProjectID,
                'activityProjectName' => $getProjectName,
                'activityClient' => $getClientID,
                'activityClientName' => $getClientName,
                'activityDescription' => $getDescription,
                // 'activityStatus' => $getStatus,
                'activityHours' => $getManHours,
                'createdBy' => $createdBy,
                'createdAt' => date('Y-m-d h:i:s')
            );
        }


        $autoSavedProduction = $this->production->autoSavedProductionActivity($data,$productionActivityID);


        echo json_encode($autoSavedProduction);

    }

    public function updateDatabaseRow(){
        
        $productionActivityID  = $this->input->post("getproductionActivityID");
        $productionID  = $this->input->post("productionID");
        $productionEntriesID = $this->input->post("productionEntriesID");
        $getDateEntries   = $this->input->post("getDateEntries");
        $getDayEntries    = $this->input->post("getDayEntries");
        $employeeID    = $this->input->post("employeeID");
        $action    = $this->input->post("action");

            $data = array(
                'productionID' => $productionID,
                'productionEntriesID' => $productionEntriesID,
                'dateEntries' => $getDateEntries,
                'dayEntries' => $getDayEntries,
                'createdBy' => $employeeID,
                'createdAt' => date('Y-m-d h:i:s')
            );
  


        $autoSavedProduction = $this->production->updateDatabaseRow($data,$productionActivityID,$action);


        echo json_encode($autoSavedProduction);
    }

    public function updateDateRangeDocument()
    {
        $employeeID  = $this->input->post("employeeID");
        $productionSchedule     = $this->input->post("productionSchedule");
        $newDateFrom     = $this->input->post("newDateFrom");
        $newDateTo     = $this->input->post("newDateTo");
        $productionID = $this->input->post("productionID");

         // ----- FOR EXPANDING DATE RANGE INCLUDING WEEKENDS --------//
         $startLeave = new DateTime($newDateFrom);
         $endLeave = new DateTime($newDateTo);
         $onedayLeave = new DateInterval("P1D");

         $dateNewEntries = array();

         /* Iterate from $start up to $end+1 day, one day in each iteration.
         We add one day to the $end date, because the DatePeriod only iterates up to,
         not including, the end date. */
         foreach(new DatePeriod($startLeave, $onedayLeave, $endLeave->add($onedayLeave)) as $key => $day) {
             $day_num = $day->format("N"); /* 'N' number days 1 (mon) to 7 (sun) */
             //if($day_num < 6) { /* weekday */
                 $dateNewEntries[$key] =$day->format("Y-m-d");        
            // } 
         }
         // ----- FOR EXPANDING DATE RANGE INCLUDING WEEKENDS --------//

         $data = [
            'employeeID'            => $employeeID,
            'productionSchedule'    => $productionSchedule,
            'dateStart'             => $newDateFrom,
            'dateEnd'               => $newDateTo,
            'updatedBy'             => $employeeID
        ];

        $updateProduction = $this->production->updateDateRangeDocument($data, $productionID);

        if($updateProduction){
          
            $result = explode("|",$updateProduction);

            $getProductionEntriesData  = $this->production->getProductionEntriesID($productionID);


            if ($result[0] == "true") {

                $compareEntriesDate = array();
                foreach($getProductionEntriesData as $key => $value){
                    $compareEntriesDate[$key] = $value["dateEntries"];
                }
            
                $insertNewEntries =[];
                $deleteEntries = array();

                // foreach($getProductionEntriesData as $key => $value){
                for($loop = 0; $loop<count($dateNewEntries);$loop++){
                    if(!in_array($dateNewEntries[$loop],$compareEntriesDate)){
                        $temp =[
                            'productionID'  => $productionID,
                            'dateCredited'  => 1,
                            'dateEntries'   => $dateNewEntries[$loop],
                            'dayEntries'    => date("l",strtotime($dateNewEntries[$loop])),
                            'createdBy'     => $employeeID,
                            'createdAt'     => date('Y-m-d h:i:s')
                        ];
    
                        array_push($insertNewEntries, $temp);
                    }
                    // else{
                    //     if(in_array($value["dateEntries"],$dateNewEntries)){
                    //     }else{
                    //         $deleteEntries[$loop] =$dateNewEntries[$loop];    
                    //     }
                    // }
                }
                $deleteEntries =  array_values(array_diff($compareEntriesDate,$dateNewEntries));
            }
            // echo "<pre>";
            // print_r($insertNewEntries);
            // print_r(array_diff($compareEntriesDate,$dateNewEntries));
            // print_r($deleteEntries);
            // exit;
        
               $returnUpdateEntires = $this->production->updateDateEntries($insertNewEntries, $deleteEntries,$productionID);

        }

        echo json_encode($returnUpdateEntires);

    }



}    