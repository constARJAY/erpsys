<?php

class Onboarding_model extends CI_Model {

    public function __construct() 
    {
        parent::__construct();
    }

   public function updateOnboarding($employeeID, $approvalEmployeeID,$onboardingDate, $OnboardingStatus, $designationID, $countapprovar){

        $querydelete = $this->db->delete("hris_onboarding_tbl", ["employeeID" => $employeeID]);
        $record  = array();
        if(is_array($approvalEmployeeID)){ 
            if(count($approvalEmployeeID)!=0){
                for($count = 0; $count<count($approvalEmployeeID); $count++)
                {   
                    $record[$count] = array(
                        'employeeID'		        =>$employeeID,
                        'designationID'             =>$designationID[$count],
                        'approvalEmployeeID'		=>$approvalEmployeeID[$count],
                        'onboardingDate'		    =>$onboardingDate[$count],
                        'onboardingStatus'		    =>$OnboardingStatus[$count]);

                }
                $this->db->insert_batch('hris_onboarding_tbl', $record);
            }   
        }
        $querydelete = $this->db->delete("hris_onboarding_progress_tbl", ["employeeID" => $employeeID]);
        $sqlnextapprover = $this->db->query("SELECT approvalEmployeeID FROM hris_onboarding_tbl WHERE employeeID='$employeeID'  AND onboardingStatus IN(1,2) order by onboardingID ASC LIMIT 1");
        //$rownextapproval   = $sqlnextapprover->getRowArray();
        //echo $sqlnextapprover->num_rows();

        if ($sqlnextapprover->num_rows() > 0)
            {
            foreach ($sqlnextapprover->result() as $approver)
            {
                $nextapproval = $approver->approvalEmployeeID;
               
            }
            }else{
                $nextapproval = '';

            }
        
      
        $sql = $this->db->query("SELECT count(*) as progression FROM hris_onboarding_tbl WHERE employeeID='$employeeID' AND onboardingStatus=3 GROUP BY employeeID"); 
        foreach ($sql->result() as $row)
        {
            $totalprogression                       =$row->progression;

            $dataprogress = array(
                'employeeID'                        => $employeeID,
                'approvalCount'                     => $countapprovar,
                'onboardingProgressCount'           => $totalprogression,
                'approvalEmployee'                  =>$nextapproval);

                $this->db->insert('hris_onboarding_progress_tbl', $dataprogress);

        }   

       
   } 
}