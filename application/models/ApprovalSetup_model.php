<?php 
defined('BASEPATH') OR exit('No direct script access allowed');

class ApprovalSetup_model extends CI_Model {

    public function updateAttachRole($data){
        // {moduleID: "13", roleID: "1|2|5|7", userAccountID: "0,0,0,0"}
        // $data Variables
        $sessionID      =   $this->session->userdata('adminSessionID');
        $moduleID       =   $data["moduleID"];
        $roleID         =   $data["roleID"];
        $userAccountID  =   $data["userAccountID"];
        // Array Variable
        $roleID_array           =   explode("|", $roleID);
        $userAccountID_array    =   explode(",", $userAccountID);

        // DELETE BEFORE INSERTING NEW DATA
        $deleteSql      = "DELETE FROM `gen_approval_setup_tbl` WHERE moduleID = 1";
        $deleteQuery    = $this->db->query($deleteSql);
        if($deleteQuery){
            // Loop the Roles ID
            $indexRoles =   0;
            foreach($roleID_array as $roles){
                $userAccountID_value = $userAccountID_array[$indexRoles];
                $insertSql      = "INSERT INTO gen_approval_setup_tbl SET 
                                `moduleID`      = '$moduleID', 
                                `roleID`        = '$roles', 
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