<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');
class Production_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getProductionDetails($productionID = 0)
    {
        $sql = "SELECT 
            productionID,
            productionCode,
            reviseProductionID,
            dateStart,
            dateEnd,
            employeeID,
            productionSchedule,
            productionStatus,
            productionReason,
            approversID,
            approversDate,
            approversStatus,
            submittedAt,
            createdAt,
            createdBy,
            updatedBy
        FROM 
            hris_production_tbl
        WHERE 
            productionID = $productionID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getProductionEntries($productionID = 0)
    {
        
        $output = [];
   

        $sql    = "SELECT 
            productionEntriesID,
            productionID,
            dateEntries,
            dayEntries,
            dateCredited
        FROM 
            hris_production_entries_tbl
        WHERE 
            productionID = $productionID ORDER BY dateEntries";
        $query = $this->db->query($sql);

        $entries = $query ? $query->result_array() : [];
        foreach ($entries as $entry) {
        
            $temp = [
                "productionEntriesID" => $entry["productionEntriesID"],
                "productionID"          => $entry["productionID"],
                "dateEntries"   => $entry["dateEntries"],
                "dayEntries"   => $entry["dayEntries"],
                "dateCredited"   => $entry["dateCredited"]
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getProductionContent($productionID = 1)
    {   
        

        $output = [];
        $productionDetails = $this->getProductionDetails($productionID);
        if ($productionDetails) {
            $output["productionID"]       = $productionDetails->productionID;
            $output["productionCode"]     = $productionDetails->productionCode;
            $output["reviseProductionID"] = $productionDetails->reviseProductionID;
            $output["employeeID"]         = $productionDetails->employeeID;
            $output["productionSchedule"] = $productionDetails->productionSchedule;
            $output["dateStart"]          = $productionDetails->dateStart;
            $output["dateEnd"]            = $productionDetails->dateEnd;
            $output["productionStatus"]   = $productionDetails->productionStatus;
            $output["productionReason"]   = $productionDetails->productionReason;
            $output["approversID"]        = $productionDetails->approversID;
            $output["approversDate"]      = $productionDetails->approversDate;
            $output["approversStatus"]    = $productionDetails->approversStatus;
            $output["createdAt"]          = $productionDetails->createdAt;
            $output["submittedAt"]        = $productionDetails->submittedAt;
            $output["createdBy"]          = $productionDetails->createdBy;
            $output["updatedBy"]          = $productionDetails->updatedBy;

            $output["entries"] = $this->getProductionEntries($productionID);
        }
        return $output;
    }
    // ----- END GET PRODUCTION CONTENT -----


    public function saveProductionDocument($data,$action ="add"){

        if($action == "add"){
            $query =        $this->db->insert("hris_production_tbl", $data);
            $insertID =    $this->db->insert_id();

            $productionCode = "PDN-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["productionCode"=> $productionCode ];
            $this->db->update("hris_production_tbl", $updateArr, ["productionID" => $insertID]);

            return "true|Successfully created|$insertID|".date("Y-m-d");
        }

        if($action == "update"){
            $query =        $this->db->insert("hris_production_tbl", $data);
            $insertID =    $this->db->insert_id();

            $productionCode = "PDN-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["productionCode"=> $productionCode ];
            $this->db->update("hris_production_tbl", $updateArr, ["productionID" => $insertID]);

            return "true|Successfully updated|$insertID|".date("Y-m-d");
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getApprovedRequest($employeeID = 0, $param ="leave"){

        $tableName = $param == "leave" ? "hris_leave_request_tbl" : "hris_overtime_request_tbl";
        $columnName = $param == "leave" ? "leaveRequestStatus" :"overtimeRequestStatus";  

        $query = $this->db->query("SELECT * FROM $tableName WHERE employeeID = $employeeID AND $columnName = 2");

        return $query->result_array();
        
    }

    public function getProductionEntriesID($productionID){
        $query = $this->db->query("SELECT productionEntriesID,dateEntries FROM hris_production_entries_tbl WHERE productionID = $productionID");
        $result = $query->result_array();

        return $result;
    }

    public function saveProductionEntries($data, $action ="add", $listDateRange = false, $employeeID = 0, $productionID = 0){
        if($data && !empty($data) && $action == "add"){
            $query    = $this->db->insert_batch("hris_production_entries_tbl", $data);
            $insertID = $this->db->insert_id();
            $schedule = getEmployeeSchedule($employeeID);

            if ($listDateRange && !empty($listDateRange) && $schedule) {
                // INSERT PRODUCTION
                foreach ($listDateRange as $date) {
                    $queryDate = $this->db->query("SELECT * FROM hris_leave_request_tbl WHERE employeeID = $employeeID AND leaveRequestStatus = 2 AND '$date' BETWEEN leaveRequestDateFrom AND leaveRequestDateTo");
                    $leaveRequest = $queryDate->result_array() ?? null;
                    if ($leaveRequest) {
                        $dayEntries = date('l', strtotime($date));
                        $day        = strtolower($dayEntries);

                        $startDate = $leaveRequest[0]["leaveRequestDateFrom"];
                        $endDate   = $leaveRequest[0]["leaveRequestDateTo"];
                        $createdAt = $leaveRequest[0]["createdAt"];
                        $leaveRequestCode = getFormCode("LRF", $createdAt, $leaveRequestID);

                        $columnStatus        = $day."Status";
                        $columnFrom          = $day."From";
                        $columnTo            = $day."To";
                        $columnBreakDuration = $day."BreakDuration";

                        $scheduleStatus        = $schedule->{"$columnStatus"};
                        $scheduleFrom          = $schedule->{"$columnFrom"};
                        $scheduleTo            = $schedule->{"$columnTo"};
                        $scheduleBreakDuration = $schedule->{"$columnBreakDuration"} ?? 0;

                        $sql = "
                        SELECT 
                            hpt.productionID,
                            productionEntriesID
                        FROM hris_production_tbl AS hpt
                            LEFT JOIN hris_production_entries_tbl AS hpet ON hpt.productionID = hpet.productionID AND hpet.dateEntries = '$date'
                        WHERE '$date' BETWEEN dateStart AND dateEnd 
                            AND employeeID = $employeeID
                            AND productionStatus = 0 LIMIT 1";
                        $lrQuery = $this->db->query($sql);
                        $result = $lrQuery ? $lrQuery->row() : null;

                        if ($result) {
                            $leaveStatus = $leaveRequest[0]['leaveStatus'] == 1 ? "Billable" : "Non-billable";
                            $leaveBadge  = $leaveRequest[0]['leaveStatus'] == 1 ? '<span class="badge badge-success">Paid</span>' : '<span class="badge badge-danger">Unpaid</span>';
                            $leaveCode   = "<span class='badge badge-info'>$leaveRequestCode</span>";
                            $duration = getDuration("2021-01-01 $scheduleFrom", "2021-01-01 $scheduleTo", $scheduleBreakDuration);

                            $isWholeDay   = $leaveRequest[0]['leaveWorkingDay'] == 1;
                            $scheduleFrom = $isWholeDay ? $scheduleFrom : $leaveRequest[0]['timeIn'];
                            $scheduleTo   = $isWholeDay ? $scheduleTo : $leaveRequest[0]['timeIn'];
        
                            $data = [
                                'productionEntriesID' => $result->productionEntriesID,
                                'productionID'        => $result->productionID,
                                'dateEntries'         => $date,
                                'dayEntries'          => $dayEntries,
                                'timeStart'           => $scheduleFrom,
                                'timeEnd'             => $scheduleTo,
                                'activityLocation'    => '',
                                'activityClass'       => $leaveStatus,
                                'activityDescription' => "$leaveBadge $leaveCode" . $leaveRequest[0]["leaveRequestReason"] ?? '',
                                'activityHours'       => $duration,
                                'leaveRequestID'      => $leaveRequestID ?? 0,
                            ];
                            $this->db->insert("hris_production_activity_tbl", $data);
                        }
                    }
                }
            }

            return "true|Successfully created|$insertID|".date("Y-m-d");
        }

        // if($action == "update"){
        //     $query =        $this->db->insert("hris_production_tbl", $data);
        //     $insertID =    $this->db->insert_id();

        //     $productionCode = "PRD-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
        //     $updateArr = ["productionCode"=> $productionCode ];
        //     $this->db->update("hris_production_tbl", $updateArr, ["productionID" => $insertID]);

        //     return "true|Successfully updated|$insertID|".date("Y-m-d");
        // }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function autoSavedProductionActivity($data,$productionActivityID =0){

        if($productionActivityID){
            
            $query = $this->db;
            $query->where('productionActivityID', $productionActivityID);
            $query->update('hris_production_activity_tbl', $data);

            return "true|Successfully created|$productionActivityID|".date("Y-m-d");

        }else{
            $query =       $this->db->insert("hris_production_activity_tbl", $data);
            $insertID =    $this->db->insert_id();
            return "true|Successfully created|$insertID|".date("Y-m-d");
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateDatabaseRow($data=false,$productionActivityID =0,$action="add"){
 
        if($action == "add"){
            $query = $this->db->insert("hris_production_activity_tbl", $data);
            $insertID =    $this->db->insert_id();
            return "true|Successfully created|$insertID|".date("Y-m-d");
        }else{

            if($productionActivityID>0){
                $this->db->where('productionActivityID', $productionActivityID);
                $this->db->delete('hris_production_activity_tbl');
                return "true|Successfully created|false|".date("Y-m-d");
            }
        }
    }

    public function savedProductionActivities($data = false){
        
        // echo "<pre>";
        // print_r($data);
    

        if($data){
            $query = $this->db->insert_batch("hris_production_activity_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }
        return "false"; 
    }

    public function updateDateRangeDocument($data, $productionID){
   
        $query = $this->db->update("hris_production_tbl", $data, ["productionID" => $productionID]);

        if($query){
            return $query ?"true|Successfully updated|$productionID|".date("Y-m-d") : false;
        }

        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateDateEntries($insertNewEntries, $deleteEntries,$productionID){

        $query = true;
        
        if($deleteEntries){

            // echo $deleteEntries[0];
            // exit;
            for($loop = 0; $loop<count($deleteEntries);$loop++){
                $deleteDate = $deleteEntries[$loop];
                $query =$this->db->query("DELETE FROM hris_production_entries_tbl WHERE productionID = $productionID AND dateEntries = '$deleteDate'");
                $query = $this->db->query("DELETE FROM hris_production_activity_tbl WHERE productionID = $productionID AND dateEntries = '$deleteDate'");

                
            }
        }
        
        if($insertNewEntries){
            $query = $this->db->insert_batch("hris_production_entries_tbl", $insertNewEntries);
            $insertID =    $this->db->insert_id();

            return "true|Successfully created|$insertID|".date("Y-m-d");
        }

        return $query ? true : "false|System error: Please contact the system administrator for assistance!";
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



    public function updateProductionCode($productionID = 0)
    {
        $productionCode = "PDN-".date("y")."-".str_pad($productionID, 5, "0", STR_PAD_LEFT);
        $updateArr = ["productionCode"=> $productionCode ];
        $this->db->update("hris_production_tbl", $updateArr, ["productionID" => $productionID]);
        return true;
    }

}
