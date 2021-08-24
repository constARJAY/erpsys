<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PersonnelRequisition_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function savePurchaseRequestData($action, $data, $id = null,$requisitionStatus,$createdBy,$updatedBy,$createdAt) 
    {
      
        if ($action == "insert") {
            $query = $this->db->insert("pms_personnel_requisition_tbl", $data);
        } else {
            $where = ["requisitionID" => $id];
            $query = $this->db->update("pms_personnel_requisition_tbl", $data, $where);

            if($query){
                $getData = $this->db->query("SELECT * FROM pms_personnel_requisition_tbl WHERE requisitionID = '$id'");
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
                        "requisitionID" => $id,
                        "requisitionCode"   =>  'PRF-'.SUBSTR($result[0]["createdAt"],2,2).'-'.str_pad($id,5,"0",STR_PAD_LEFT),
                        "jobSlot"               =>  $result[0]["vacancy"],
                        "jobStatus"               => 0,
                        "createdBy"               => $result[0]["createdBy"],
                        "updatedBy"               => $updatedBy,
                    ]; 

                   $this->db->insert("hris_job_posting_tbl", $createJobList);
                }
                
            }
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

  
}
