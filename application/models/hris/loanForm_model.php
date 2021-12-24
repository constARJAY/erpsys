<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoanForm_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveAmmortizationData($data = false){

        if($data){
            $query = $this->db->insert_batch("hris_loan_ammortization_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
        }
        return "false"; 

    }

}
