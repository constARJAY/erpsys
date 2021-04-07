<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class ApprovalSetup_model extends CI_Model {

    public function updateAttachDesignation($data){
        // {moduleID: "13", designationID: "1|2|5|7", userAccountID: "0,0,0,0"}
        // $data Variables
        $sessionID      =   $this->session->userdata('adminSessionID');
        $moduleID       =   $data["moduleID"];
        $designationID         =   $data["designationID"];
        $userAccountID  =   $data["userAccountID"];

        // Getting the module Name
        $moduleNameSql      =   "SELECT moduleName FROM `gen_module_list_tbl` WHERE moduleID = '$moduleID'";
        $moduleNameQuery    =   $this->db->query($moduleNameSql);
        $moduleNameResult   =   $moduleNameQuery->result_array();
        $moduleName         =   $moduleNameResult[0]["moduleName"];
        

        // Array Variable
        $designationID_array           =   explode("|", $designationID);
        $userAccountID_array    =   explode(",", $userAccountID);

        // DELETE BEFORE INSERTING NEW DATA
        $deleteSql      = "DELETE FROM `gen_approval_setup_tbl` WHERE moduleID = $moduleID";
        $deleteQuery    = $this->db->query($deleteSql);
        if($deleteQuery){
            // Loop the Roles ID
            $indexRoles =   0;
            foreach($designationID_array as $designations){
                $userAccountID_value = $userAccountID_array[$indexRoles];
                $insertSql      = "INSERT INTO gen_approval_setup_tbl SET 
                                `moduleID`      = '$moduleID',
                                `moduleName`    = '$moduleName',
                                `designationID` = '$designations', 
                                `userAccountID` = '$userAccountID_value', 
                                `createdBy`     = '$sessionID', 
                                `updatedBy`     = '$sessionID'
                             ";
                $insertQuery    = $this->db->query($insertSql);
                if($insertQuery) $indexRoles++;
            }
            $returnData = true;
        }else{
            $returnData = false;
        }
        return $returnData;
    }

}

/* End of file ApprovalSetup_model.php */
?>