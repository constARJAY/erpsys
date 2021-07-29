<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ExaminationSetup_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function updateExaminationSetupData($data, $designationID)
    {

        $this->db->delete('hris_examination_setup_tbl', array('designationID' => $designationID));

        for($loop = 0; $loop<count($data);$loop++){
            $query = $this->db->insert("hris_examination_setup_tbl", $data[$loop]);
        }

       
        return "true|Successfully submitted|".date("Y-m-d");
        
      
        
    }

}
