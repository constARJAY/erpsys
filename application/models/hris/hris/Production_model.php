<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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
        productionID = $productionID";
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
            $output["productionID"] = $productionDetails->productionID;
            $output["productionCode"]        = $productionDetails->productionCode;
            $output["reviseProductionID"]        = $productionDetails->reviseProductionID;
            $output["employeeID"]       = $productionDetails->employeeID;
            $output["productionSchedule"]       = $productionDetails->productionSchedule;
            $output["productionStatus"]       = $productionDetails->productionStatus;
            $output["productionReason"]       = $productionDetails->productionReason;
            $output["approversID"] = $productionDetails->approversID;
            $output["approversDate"] = $productionDetails->approversDate;
            $output["approversStatus"] = $productionDetails->approversStatus;
            $output["createdAt"] = $productionDetails->createdAt;
            $output["submittedAt"] = $productionDetails->submittedAt;
            $output["createdBy"] = $productionDetails->createdBy;
            $output["updatedBy"] = $productionDetails->updatedBy;

            $output["entries"] = $this->getProductionEntries($productionID);
        }
        return $output;
    }
    // ----- END GET PRODUCTION CONTENT -----


    public function saveProductionDocument($data,$action ="add"){

        if($action == "add"){
            $query =        $this->db->insert("hris_production_tbl", $data);
            $insertID =    $this->db->insert_id();

            $productionCode = "PRD-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["productionCode"=> $productionCode ];
            $this->db->update("hris_production_tbl", $updateArr, ["productionID" => $insertID]);

            return "true|Successfully created|$insertID|".date("Y-m-d");
        }

        if($action == "update"){
            $query =        $this->db->insert("hris_production_tbl", $data);
            $insertID =    $this->db->insert_id();

            $productionCode = "PRD-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
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

    public function saveProductionEntries($data,$action ="add",$listDateRange = false, $employeeID =0,$productionID = 0){


        if($action == "add"){
            $query = $this->db->insert_batch("hris_production_entries_tbl", $data);
            $insertID =    $this->db->insert_id();

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

        if($data){
            $query = $this->db->insert_batch("hris_production_activity_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }
        return "false"; 
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

}
