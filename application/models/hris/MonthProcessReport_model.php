

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MonthProcessReport_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveMonthProcessData($action, $data, $id = null,$method ="release") 
    {
      
            if ($action == "insert") {
                $query = $this->db->insert("hris_13month_tbl", $data);
                $insertID = $this->db->insert_id();
                $monthCode = "TMP-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
                $updateArr = ["monthCode"=> $monthCode];
                $this->db->update("hris_13month_tbl", $updateArr, ["monthID" => $insertID]);
                return "true|Successfully submitted|$insertID|".date("Y-m-d");

            } else {
                $where = ["monthID" => $id];
                $query = $this->db->update("hris_13month_tbl", $data, $where);
            }
    
            if ($query) {
                $insertID = $action == "insert" ? $this->db->insert_id() : $id;
                return "true|Successfully submitted|$insertID|".date("Y-m-d");
            }
       
        
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("hris_13month_details_tbl", ["monthID" => $id]);
        return $query ? true : false;
    }

    public function saveMonthProcessList($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("hris_13month_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getHoldMonthProcessData($monthID = 0){
            $query = $this->db->query("SELECT monthheader.monthID,monthDetailsID,monthHoldStatus AS payrollHoldStatus,monthTotalPayAmount as netPay,monthCode,monthdetails.monthEmployeeID 
            FROM hris_13month_tbl as monthheader
            LEFT JOIN hris_13month_details_tbl as monthdetails
            ON monthheader.monthID = monthdetails.monthID
            WHERE
            monthheader.monthID = $monthID AND monthdetails.monthHoldStatus = 0");

            return $query->result_array();
    }

    public function saveSalaryHoldList($data = false){
        if($data){
            $query = $this->db->insert_batch("hris_salary_release_tbl", $data);
        }

        return $query ? true : false;
    }

    // public function changeReleaseStatus($backPayEmployeeID = false,$employeeID = 0){
    //     if($backPayEmployeeID){
    //         $date = new DateTime();
    //         $whereRelease = ["employeeID" => $backPayEmployeeID,
    //                 "payrollHoldStatus" => 0,
    //                 ];
    //         $dataRelease = ['updatedBy' => $employeeID,
    //                         'dateRelease' =>$date->format('Y-m-d H:i:s'),
    //                         'payrollHoldStatus' => 9
    //                         ];
    //         $query = $this->db->update("hris_salary_release_tbl", $dataRelease, $whereRelease);

    //         $whereBackPayRelease = ["backPayEmployeeID" => $backPayEmployeeID];
    //         $dataBackPayRelease = ["releaseStatus" => 9];
    //         $query = $this->db->update("hris_back_pay_tbl", $dataBackPayRelease, $whereBackPayRelease);
    //     }
    // }   

    public function saveGrossList($grossData = null,$monthID = 0,$employeeID = 0)
    {   $this->db->query("DELETE FROM hris_13month_gross_pay_list_tbl WHERE  monthID =  $monthID AND monthEmployeeID = $employeeID");
        $query = $this->db->insert_batch("hris_13month_gross_pay_list_tbl", $grossData);
        return $query ? true : false;
    }


    public function saveGrossData($grossList = null, $monthID)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($grossList) {
                $grossData = [];
                foreach ($grossList as $gross) {

                        $temp = [
                            "payrollID"             => $gross["payrollID"],
                            "payrollCode"           => $gross["payrollCode"],
                            "payrollItemID"         => $gross["payrollItemID"],
                            "monthID"               => $monthID,
                            "monthEmployeeID"       => $gross["monthEmployeeID"],
                            "grossPayAmount"        => $gross["grossPayAmount"],
                            "payrollSubmittedAt"    => $gross["payrollSubmittedAt"],
                            "createdBy"             => $sessionID,
                            "createdAt"             => date('Y-m-d h:i:s')
                        ];

                        $employeeID =  $gross["monthEmployeeID"];
                        array_push($grossData, $temp);
                }
                $saveGrossList = $this->saveGrossList($grossData, $monthID,$employeeID);
                if ($saveGrossList) {
                    return true;
                }
        }
        return false;
    }

    public function getMonthData($monthID = 0)
    {
       
        $sql   = "SELECT 
        emp.employeeCode,
        monthEmployeeID,
        CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
        (SELECT departmentName FROM hris_department_tbl WHERE departmentID = emp.departmentID) AS departmentName,
        (SELECT designationName FROM hris_designation_tbl WHERE designationID  = emp.designationID ) AS designationName,
         basicSalary,
         totalGrossPay,
         monthHoldStatus,
         monthTotalPayAmount	
        FROM hris_13month_details_tbl AS monthdata
        LEFT JOIN hris_employee_list_tbl AS emp
        ON monthdata.monthEmployeeID = emp.employeeID
        WHERE monthID = $monthID";

        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

}
