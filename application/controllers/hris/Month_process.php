<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Month_process extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/MonthProcess_model", "monthprocess");
        isAllowed(95);
    }

    public function index()
    {
        $data["title"] = "13th Month Process";

        $this->load->view("template/header",$data);
        $this->load->view("hris/monthprocess/index");
        $this->load->view("template/footer");
    }

    public function saveMonthProcess()
    { 

        // echo "<pre>";
        // print_r($_POST);
        // exit;


        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $monthID                  = $this->input->post("monthID") ?? null;
        $revisemonthID            = $this->input->post("revisemonthID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $monthDescription               = $this->input->post("monthDescription");
        $monthDateStart               = $this->input->post("monthDateStart");
        $monthDateEnd               = $this->input->post("monthDateEnd");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $monthStatus              = $this->input->post("monthStatus");
        $monthRemarks             = $this->input->post("monthRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;


        $MonthProcessData = [
            "revisemonthID"             => $revisemonthID,
            "employeeID"                 => $employeeID,
            "monthDescription"           => $monthDescription,
            "monthDateStart"             => $monthDateStart,
            "monthDateEnd"               => $monthDateEnd,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "monthStatus"              => $monthStatus,
            "monthRemarks"             => $monthRemarks,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($MonthProcessData["revisemonthID"]);
            unset($MonthProcessData["createdBy"]);
            unset($MonthProcessData["createdAt"]);

            if ($method == "cancelform") {
                $MonthProcessData = [
                    "monthStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $MonthProcessData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "monthStatus" => $monthStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $MonthProcessData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "monthStatus"  => 3,
                    "monthRemarks" => $monthRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $MonthProcessData = [
                    "revisemonthID" => $revisemonthID,
                    "monthStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
            else if ($method == "release") {
                $MonthProcessData = [
                    "revisemonthID" => $revisemonthID,
                    "monthStatus"   => 2,
                    "monthReleaseStatus"   => 9,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
         
        }
       
            $saveMonthProcessData = $this->monthprocess->saveMonthProcessData($action, $MonthProcessData, $monthID,$method);

            if ($saveMonthProcessData && ($method == "submit" || $method == "save")) {
                $result = explode("|", $saveMonthProcessData);

                if ($result[0] == "true") {
                    $monthID = $result[2];

                    $gross = '';
                    if ($items) {
                        $monthProcessList = [];
                        foreach($items as $index => $item) {

                            $temp = [
                                "monthID" => $monthID,
                                "monthEmployeeID"             => $item["monthEmployeeID"],
                                "basicSalary"              => $item["monthbasicSalary"],
                                "totalGrossPay"              => $item["totalGrossPay"],
                                "monthHoldStatus"              => $item["monthHoldStatus"],
                                "monthTotalPayAmount"              => $item["monthTotalPayAmount"],
                                "createdBy"            => $employeeID,
                                "createdAt"             => date('Y-m-d h:i:s')
                            ];
                            array_push($monthProcessList, $temp);

                            if(!empty($item["gross"])){
                                $gross = $item["gross"];
    
                                $saveServices = $this->monthprocess->saveGrossData($gross, $monthID); 
                                }    

                        }

                        $savePurchTransferstItems = $this->monthprocess->saveMonthProcessList($monthProcessList, $monthID);
                    }

                }
                
            }

        if($monthStatus == 2 ){
            // if ($result[0] == "true") {
            //     $monthID = $result[2];

                $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
            
                $getHoldMonthProcessData = $this->monthprocess->getHoldMonthProcessData($monthID);

                $holdData = [];
                foreach($getHoldMonthProcessData as $key => $value){
                    $temphold = [
                        "monthID" => $value["monthID"],
                        "monthCode" => $value["monthCode"],
                        "monthDetailsID" => $value["monthDetailsID"],
                        "payrollHoldStatus" => $value["payrollHoldStatus"],
                        "employeeID"    => $value["monthEmployeeID"],
                        "netPay" => $value["netPay"],
                        "createdAt" => date('Y-m-d h:i:s'),
                        "createdBy" =>  $sessionID,
                    ];

                    array_push($holdData, $temphold);
                }
                $saveSalaryHoldList = $this->monthprocess->saveSalaryHoldList($holdData);
            // }
        }


        
        // if($method == "release"){

        //     $changeStatusInRelease = $this->monthprocess->changeReleaseStatus($monthprocessEmployeeID,$employeeID);

        // }
        echo json_encode($saveMonthProcessData);
    }

}
?>