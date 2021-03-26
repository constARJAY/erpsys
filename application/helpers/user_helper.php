<?php
    function getAdminSessionAccount() {
        $CI=&get_instance();
        $adminSessionID = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : 1;
        $sql = "SELECT * FROM hris_employee_list_tbl WHERE employeeID = $adminSessionID";
        $query = $CI->db->query($sql);

        return $query->row();
    }

    function getOtherSessionAccount() {
        $CI             =    &get_instance();
        $otherSessionID =   $CI->session->has_userdata("otherSessionID") ? $CI->session->userdata("otherSessionID") : 1;
        $sql            =   "SELECT * FROM hris_employee_list_tbl WHERE employeeID = $otherSessionID";
        $query          =   $CI->db->query($sql);
        return $query->row();
    }


?>