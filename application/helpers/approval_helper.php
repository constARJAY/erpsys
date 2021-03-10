<?php 
    function getApprover($moduleID){
        $CI=&get_instance();
		$query      = $CI->db->query("SELECT approvalUserAccounts FROM `gen_approval_tbl` WHERE moduleID = '$moduleID' "); 
        $result     = $query->num_rows() < 1 ? "undefined" : $query->result_array();
        $returnData = $result == "undefined" ? "undefined" : $result[0]["approvalUserAccounts"];
		return $returnData;     
    }
?>