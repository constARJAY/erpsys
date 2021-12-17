<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PersonnelRequisition_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null,$requisitionStatus,$createdBy,$updatedBy,$createdAt) 
    {

        // print_r($_POST);
        // exit;
      
        if ($action == "insert") {
            $query = $this->db->insert("pms_personnel_requisition_tbl", $data);
        } else {
            $where = ["requisitionID" => $id];
            $query = $this->db->update("pms_personnel_requisition_tbl", $data, $where);  
        }




        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;

                // INSERTION AND UPDATING JOB POSTING DATA//
                $getData = $this->db->query("SELECT * FROM pms_personnel_requisition_tbl WHERE requisitionID = '$insertID'");
                $result = $getData->result_array();
    
                
    
                if($requisitionStatus ==5 ){
                    
                    $createJobList = [
                        "jobStatus"               => 2,
                        "updatedBy"               => $updatedBy,
                    ]; 
                    
                    $where = ["requisitionID" => $id];
                    $this->db->update("hris_job_posting_tbl", $createJobList, $where);
                }
    
    
                if($requisitionStatus ==2 ){
                    $createJobList = [
                        "requisitionID"             => $insertID,
                        "requisitionCode"           =>  'PRF-'.SUBSTR($result[0]["createdAt"],2,2).'-'.str_pad($id,5,"0",STR_PAD_LEFT),
                        "jobSlot"                   =>  $result[0]["vacancy"],
                        "jobStatus"                 => 0,
                        "createdBy"                 => $result[0]["createdBy"],
                        "updatedBy"                 => $updatedBy,
                    ]; 
    
                    $this->db->insert("hris_job_posting_tbl", $createJobList);
                }
                    
                
                // INSERTION AND UPDATING JOB POSTING DATA//

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

  
}
