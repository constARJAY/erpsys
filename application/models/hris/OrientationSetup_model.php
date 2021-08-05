<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class OrientationSetup_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function updateorientationsetup($designationID, $employeeID,$orientationName){
        $querydelete = $this->db->delete("hris_orientation_setup_tbl", ["designationID" => $designationID]);
        $record  = array();
        if(is_array($employeeID)){ 
            if(count($employeeID)!=0){
            for($count = 0; $count<count($employeeID); $count++)
            {
             $record[$count] = array(
                        'designationID'		        =>$designationID,
                        'employeeID'		        =>$employeeID[$count],
                        'orientationName'           =>$orientationName[$count]);
            } 
            $this->db->insert_batch('hris_orientation_setup_tbl', $record);
            //$insert_id = $this->db->insert_id();
        }
    }



    }
    

}    