<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LeaveRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getEmployeeLeave($employeeID, $leaveID)
    {
        if ($employeeID && $leaveID) {
            $sql = "SELECT * FROM hris_employee_leave_tbl WHERE employeeID = $employeeID AND leaveID = $leaveID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function updateEmployeeLeaveData($employeeLeaveID = 0, $leaveCredit = 0, $leaveAccumulated = 0, $requestLeave = 0)
    {
        $reLeaveAccumulated = $leaveAccumulated;
        $reLeaveCredit      = $leaveCredit - $requestLeave;
        if ($reLeaveCredit <= 0) {
            $reRequestLeave     = abs($reLeaveCredit);
            $reLeaveCredit      = 0;
            $reLeaveAccumulated = $leaveAccumulated - $reRequestLeave;
        }
        $data = [
            "leaveCredit"      => $reLeaveCredit,
            "leaveAccumulated" => $reLeaveAccumulated
        ];
        $query = $this->db->update("hris_employee_leave_tbl", $data, ["employeeLeaveID" => $employeeLeaveID]);
        return $query ? true : false;
    }

    public function updateEmployeeLeave($employeeID, $leaveID, $leaveCredit)
    {
        if ($employeeID && $leaveID && $leaveCredit) {
            $employeeLeave = $this->getEmployeeLeave($employeeID, $leaveID);
            if ($employeeLeave) {
                $employeeLeaveID          = $employeeLeave->employeeLeaveID;
                $employeeLeaveCredit      = $employeeLeave->leaveCredit;
                $employeeLeaveAccumulated = $employeeLeave->leaveAccumulated;
                $leaveData = $this->updateEmployeeLeaveData($employeeLeaveID, $employeeLeaveCredit, $employeeLeaveAccumulated, $leaveCredit);
                return $leaveData;
            }
        }
        return false;
    }


    public function getProductionRecord($employeeID){
        $query = $this->db->query("SELECT 
        prod.employeeID,
        entries.*
        FROM hris_production_tbl AS prod 
        LEFT JOIN
        hris_production_entries_tbl AS entries
        ON prod.productionID = entries.productionID
        WHERE
        prod.employeeID = $employeeID");

        $result = $query->result_array();

        return $result;
    }

    public function getscheduleSetup($employeeID =0){
        $query = $this->db->query("SELECT * FROM erpdb.hris_employee_list_tbl AS emp
        LEFT JOIN hris_schedule_setup_tbl AS sched ON emp.scheduleID = sched.scheduleID
        WHERE emp.employeeID = $mployeeID");

        $result = $query->row();

        return $result;
    }

    function getEmployeeSchedule($employeeID = 0)
    {
        $CI =& get_instance();

        $sql = "
        SELECT 
            hsst.* 
        FROM hris_employee_list_tbl AS helt
            LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)
        WHERE employeeID = $employeeID";
        $query = $CI->db->query($sql);
        $result = $query ? $query->row() : null;
        return $result;
    }

    public function isTimeInGreaterTimeOut($date = "", $scheduleIn = "", $scheduleOut = "")
    {
        if ($scheduleIn && $scheduleOut) {
            $in  = $date ? strtotime($date." ".$scheduleIn) : strtotime($scheduleIn);
            $out = $date ? strtotime($date." ".$scheduleOut) : strtotime($scheduleOut);
            $diff = $in - $out;
            return $diff >= 0;
        }
        return false;
    }


    function getEmployeeScheduleInOut($employeeID = 0, $date = "")
    {
        $scheduleIn    = "";
        $scheduleOut   = "";
        $breakDuration = 0;

        if ($employeeID && $date)
        {
            $day  = strtolower(date("l", strtotime($date)));
            $data = $this->getEmployeeSchedule($employeeID);

            if ($data) {
                if ($day == "monday" && $data->mondayStatus == 1) {
                    $scheduleIn    = $data->mondayFrom;
                    $scheduleOut   = $data->mondayTo;
                    $breakDuration = $data->mondayBreakDuration;
                } else if ($day == "tuesday" && $data->tuesdayStatus == 1) {
                    $scheduleIn    = $data->tuesdayFrom;
                    $scheduleOut   = $data->tuesdayTo;
                    $breakDuration = $data->tuesdayBreakDuration;
                } else if ($day == "wednesday" && $data->wednesdayStatus == 1) {
                    $scheduleIn    = $data->wednesdayFrom;
                    $scheduleOut   = $data->wednesdayTo;
                    $breakDuration = $data->wednesdayBreakDuration;
                } else if ($day == "thursday" && $data->thursdayStatus == 1) {
                    $scheduleIn    = $data->thursdayFrom;
                    $scheduleOut   = $data->thursdayTo;
                    $breakDuration = $data->thursdayBreakDuration;
                } else if ($day == "friday" && $data->fridayStatus == 1) {
                    $scheduleIn    = $data->fridayFrom;
                    $scheduleOut   = $data->fridayTo;
                    $breakDuration = $data->fridayBreakDuration;
                } else if ($day == "saturday" && $data->saturdayStatus == 1) {
                    $scheduleIn    = $data->saturdayFrom;
                    $scheduleOut   = $data->saturdayTo;
                    $breakDuration = $data->saturdayBreakDuration;
                } else if ($day == "sunday" && $data->sundayStatus == 1) {
                    $scheduleIn    = $data->sundayFrom;
                    $scheduleOut   = $data->sundayTo;
                    $breakDuration = $data->sundayBreakDuration;
                } 
    
                $isGreater = $this->isTimeInGreaterTimeOut($date, $scheduleIn, $scheduleOut);
                if ($isGreater) {
                    $scheduleIn  = $scheduleIn;
                    $scheduleOut = $scheduleOut;
                } else {
                    $scheduleIn  = $scheduleIn;
                    $scheduleOut = $scheduleOut;
                }
            }
        }

        return [
            "scheduleIn"    => substr($scheduleIn, 0, -3),
            "scheduleOut"   => substr($scheduleOut, 0, -3),
            "breakDuration" => substr($breakDuration, 0, -3)
        ];
    }


    public function generateActivity($data = false){

        if($data){
            $query = $this->db->insert_batch("hris_production_activity_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }
        return "false"; 

    }

    public function checkTimeKeeping($startDate,$endDate){
        if($startDate && $endDate){
            $query = $this->db->query("SELECT timekeepingID,timekeepingStartDate,timekeepingEndDate from hris_timekeeping_tbl where timekeepingStatus = 2
        and timekeepingStartDate <= '$startDate' and timekeepingEndDate >= '$endDate'");
    
    return $query->num_rows();
      
    }
     return false;

    }


    public function getEmployeeLeaveAmount($employeeID,$schedule){
        $getHourlyRate = $this->db->query("SELECT IFNULL(footer.workingDays,0) AS workingDays FROM hris_timekeeping_items_tbl as footer
        LEFT JOIN hris_timekeeping_tbl AS header
        ON footer.timekeepingID = header.timekeepingID
        WHERE header.timekeepingStatus =2 AND footer.employeeID = $employeeID AND footer.scheduleDate = '$schedule'");


        $hourlyRate =  $getHourlyRate->num_rows() > 0 ? $getHourlyRate->row()->workingDays : 0;
        $basicSalary = getEmployeeBasicSalary($employeeID);
        $getCutOff = getCutOffCount();

        $loanAmount = 0;

        $loanAmount = ($basicSalary/$getCutOff)/$hourlyRate;

        

        return $loanAmount ? $loanAmount : 0;
    }

    public function generatePayrollAdjustment($data = false){

        if($data){
            $query = $this->db->insert("hris_payroll_adjustment_pending_tbl", $data);
            if ($query) {
           
                return "true|Successfully submitted";
            }
        }
    }



}
